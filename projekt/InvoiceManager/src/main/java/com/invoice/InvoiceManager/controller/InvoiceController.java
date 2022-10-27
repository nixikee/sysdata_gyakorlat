package com.invoice.InvoiceManager.controller;

import com.invoice.InvoiceManager.domain.Invoice;
import com.invoice.InvoiceManager.domain.Pdf;
import com.invoice.InvoiceManager.domain.UpdateInvoice;
import com.invoice.InvoiceManager.domain.auth.User;
import com.invoice.InvoiceManager.payload.request.UpdateStatus;
import com.invoice.InvoiceManager.security.service.InvoiceService;
import com.invoice.InvoiceManager.security.service.PdfService;
import com.invoice.InvoiceManager.security.service.UpdateInvoiceService;
import com.invoice.InvoiceManager.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private PdfService pdfService;
    @Autowired
    private UserService userService;
    @Autowired
    private UpdateInvoiceService updateInvoiceService;

    //Számlák listázása
    @GetMapping("/list_invoice")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER') or hasRole('ROLE_FINANCIAL_CONTROLLER') or hasRole('ROLE_FINANCIAL_CLERK')")
    public List<Invoice> list() {
        return invoiceService.list();
    }

    //Számla keresése id alapján
    @GetMapping("/find/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER') or hasRole('ROLE_FINANCIAL_CONTROLLER') or hasRole('ROLE_FINANCIAL_CLERK')")
    public ResponseEntity<Invoice> findInternalInvoiceById(@PathVariable("id") int id) {
        Invoice invoice = invoiceService.getInternalInvoiceById(id);

        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    //Új számla hozzáadása
    @PostMapping("/add_invoice")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_FINANCIAL_CLERK')")
    public ResponseEntity<Invoice> addInvoice(@RequestBody Invoice invoice) throws SQLException {

        //A 'pdf' adatbázisból a feltöltött számla (blob) lista lekérése
        List<Pdf> pdf = pdfService.listPdf();

        //Ellenőrzés, hogy a lekért számla lista üres-e
        //Ha igen, akkor újra lekérjük
        /*while (pdf.size() == 0) {
            pdf = pdfService.listPdf();
        }*/

        //Ha nem üres a számla lista, akkor az első elemét átvesszük blobként és a
        // paraméterben érkező invoice-nak apdfBlob változóját inicializáljuk vele
        // végül töröljük a pdf-et a 'pdf' adatbázisból (mivel ez csak egy ideiglenes adatbázis)
        if (pdf.size() == 1) {
            Blob blob = pdfService.createBlobFromByteArray(pdf.get(0).getData());
            invoice.setPdfBlob(blob);
            pdfService.deletePdf(pdf.get(0));
        }

        //A számla alapstátuszának beállítása
        invoice.setStatus("New");
        //A számla feltöltésének ideje
        invoice.setUploadDate(new Date());
        //Az új számla kimentése adatbázisba
        Invoice newInvoice = invoiceService.addInvoice(invoice);
        return new ResponseEntity<>(newInvoice, HttpStatus.CREATED);
    }

    //Számla módosítása
    @PutMapping("/update_invoice/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_FINANCIAL_CLERK')")
    public ResponseEntity<Map<String, Boolean>> updateInvoice(@PathVariable int id, @RequestBody Invoice invoiceDetails){
        //A módosítani kívánt számla lekérése az 'invoice' adatbázisból paraméter alapján
        Invoice invoice = invoiceService.getInternalInvoiceById(id);
        //Ideiglenes: A felhasználók listájának lekérése és az első elem kiválasztása
        List<User> users = userService.list();
        User user = users.get(0);

        //Számla adattagjainak beállítása a paraméterben érkező invoiceDetails alapján
        invoice.setCostCenter(invoiceDetails.getCostCenter());
        invoice.setBusinessPartner(invoiceDetails.getBusinessPartner());
        invoice.setContractor(invoiceDetails.getContractor());
        invoice.setCurrency(invoiceDetails.getCurrency());
        invoice.setAmount(invoiceDetails.getAmount());
        invoice.setOrderNumber(invoiceDetails.getOrderNumber());
        invoice.setSupplierInvoiceId(invoiceDetails.getSupplierInvoiceId());

        //Módosításhoz kapcsolódó adatok kimentése 'updated_invoice' adatbázisba: módosítás dátuma, módosító felhasználó, módosított számla
        UpdateInvoice updateInvoice = new UpdateInvoice(new Date(), user, invoice);
        updateInvoiceService.update(updateInvoice);

        //Módosított számla kimentése
        invoiceService.addInvoice(invoice);

        Map<String, Boolean> response = new HashMap<>();
        response.put("updated", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    //Számla státuszának módosítása
    @PutMapping("/update_status/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER') or hasRole('ROLE_FINANCIAL_CONTROLLER') or hasRole('ROLE_FINANCIAL_CLERK')")
    public ResponseEntity<Map<String, Boolean>> updateStatus(@PathVariable int id, @RequestBody UpdateStatus updateStatus){
        String status = "";
        //A módosítani kívánt számla lekérése az 'invoice' adatbázisból paraméter alapján
        Invoice invoice = invoiceService.getInternalInvoiceById(id);

        //Státuszok állítása ellenőrzésekkel
        if (Objects.equals(updateStatus.getClick(), "acceptance")) {
            if ((Objects.equals(invoice.getStatus(), "New") || Objects.equals(invoice.getStatus(), "Updated"))
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_FINANCIAL_CONTROLLER")) {
                status = "Accepted by financial controller";
            } else if (Objects.equals(invoice.getStatus(), "Accepted by financial controller")
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_MANAGER")) {
                status = "Accepted by manager";
            } else if ((Objects.equals(invoice.getStatus(), "New") || Objects.equals(invoice.getStatus(), "Updated"))
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_ADMIN")) {
                status = "Accepted by administrator on the first level";
            } else if (Objects.equals(invoice.getStatus(), "Accepted by financial controller")
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_ADMIN")) {
                status = "Accepted by administrator on the second level";
            } else {
                status = "todo";
            }
        } else if (Objects.equals(updateStatus.getClick(), "rejection")) {
            if (Objects.equals(invoice.getStatus(), "New") || Objects.equals(invoice.getStatus(), "Updated")
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_FINANCIAL_CONTROLLER")) {
                status = "Rejected by financial controller";
            } else if (Objects.equals(invoice.getStatus(), "Accepted by financial controller")
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_MANAGER")) {
                status = "Rejected by manager";
            } else if ((Objects.equals(invoice.getStatus(), "New") || Objects.equals(invoice.getStatus(), "Updated") || Objects.equals(invoice.getStatus(), "Accepted by financial controller"))
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_ADMIN")) {
                status = "Rejected by administrator";
            } else {
                status = "todo";
            }
        } else if (Objects.equals(updateStatus.getClick(), "return")) {
            if ((Objects.equals(invoice.getStatus(), "New") || Objects.equals(invoice.getStatus(), "Updated"))
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_FINANCIAL_CONTROLLER")) {
                status = "Returned by financial controller";
            } else if (Objects.equals(invoice.getStatus(), "Accepted by financial controller")
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_MANAGER")) {
                status = "Returned by manager";
            } else if ((Objects.equals(invoice.getStatus(), "New") || Objects.equals(invoice.getStatus(), "Updated") || Objects.equals(invoice.getStatus(), "Accepted by financial controller"))
                    && Objects.equals(updateStatus.getUser().getRole(), "ROLE_ADMIN")) {
                status = "Returned by administrator";
            } else {
                status = "todo";
            }
        } else if (Objects.equals(updateStatus.getClick(), "updated")) {
            if ((Objects.equals(invoice.getStatus(), "Returned by financial controller") || Objects.equals(invoice.getStatus(), "Returned by manager") || Objects.equals(invoice.getStatus(), "Returned by administrator"))
                    && (Objects.equals(updateStatus.getUser().getRole(), "ROLE_FINANCIAL_CLERK") || Objects.equals(updateStatus.getUser().getRole(), "ROLE_ADMIN"))) {
                status = "Updated";
            } else {
                status = "todo";
            }
        }

        invoice.setStatus(status);

        UpdateInvoice updateInvoice = new UpdateInvoice(new Date(), invoice.getStatus(), updateStatus.getUser(), invoice);

        updateInvoiceService.update(updateInvoice);
        invoiceService.addInvoice(invoice);

        Map<String, Boolean> response = new HashMap<>();
        response.put("status updated", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    //Számla törlése id alapján
    @DeleteMapping("find/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteInvoice(@PathVariable int id){
        //A törölni kívánt számla lekérése az 'invoice' adatbázisból paraméter alapján
        Invoice invoice = invoiceService.getInternalInvoiceById(id);

        //Számla törlése az adatbázisból
        invoiceService.deleteInvoice(invoice);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}

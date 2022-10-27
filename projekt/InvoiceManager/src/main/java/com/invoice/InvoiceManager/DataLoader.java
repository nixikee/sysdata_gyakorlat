package com.invoice.InvoiceManager;

import com.invoice.InvoiceManager.controller.AuthController;
import com.invoice.InvoiceManager.domain.Invoice;
import com.invoice.InvoiceManager.domain.Pdf;
import com.invoice.InvoiceManager.domain.auth.Role;
import com.invoice.InvoiceManager.domain.auth.User;
import com.invoice.InvoiceManager.repository.auth.RoleRepository;
import com.invoice.InvoiceManager.security.service.InvoiceService;
import com.invoice.InvoiceManager.security.service.PdfService;
import com.invoice.InvoiceManager.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

import static com.invoice.InvoiceManager.domain.auth.ERole.*;

@Component
public class DataLoader {
    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private UserService userService;

    @Autowired
    private AuthController authController;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PdfService pdfService;


    /*@PostConstruct
    private void loadData() throws SQLException, IOException {

        Role role1 = new Role(ROLE_ADMIN);
        roleRepository.save(role1);
        Role role2 = new Role(ROLE_MANAGER);
        roleRepository.save(role2);
        Role role3 = new Role(ROLE_FINANCIAL_CONTROLLER);
        roleRepository.save(role3);
        Role role4 = new Role(ROLE_FINANCIAL_CLERK);
        roleRepository.save(role4);

        User user1 = new User( "MWR344EO", "erik.horváth@gmail.com", "Erik", "Horváth", "Valami12", "ROLE_ADMIN");
        userService.addUser(user1);

        User user2 = new User( "MWR761GH", "lilien.németh@gmail.com", "Lilien", "Németh", "hellobello", "ROLE_ADMIN");
        userService.addUser(user2);

        User user3 = new User( "FC3487DF", "olívia.bagó@gmail.com", "Olívia", "Bagó", "helloka", "ROLE_MANAGER");
        userService.addUser(user3);

        User user4 = new User( "FC9812GG", "antal.gödő@gmail.com", "Antal", "Gödő", "helloka", "ROLE_MANAGER");
        userService.addUser(user4);

        User user5 = new User( "FCK4298R", "veronika.veger@gmail.com", "Veronika", "Veger", "helloka", "ROLE_FINANCIAL_CONTROLLER");
        userService.addUser(user5);

        User user6 = new User( "FCK2905Q", "dániel.vétó@gmail.com", "Dániel", "Vétó", "helloka", "ROLE_FINANCIAL_CONTROLLER");
        userService.addUser(user6);

        User user7 = new User( "ADMHZR45", "máté.lázár@gmail.com", "Máté", "Lázár", "helloka", "ROLE_FINANCIAL_CLERK");
        userService.addUser(user7);

        User user8 = new User( "ADMEJZ91", "eszter.éles@gmail.com", "Eszter", "Éles", "helloka", "ROLE_FINANCIAL_CLERK");
        userService.addUser(user8);

        Blob blob = pdfService.createBlob("D:/projekt/invoice/invoice.pdf");
        byte[] bytes = blob.getBytes(1L, (int) blob.length());
        Pdf pdf = new Pdf(bytes);
        pdfService.addPdf(pdf);
        Invoice invoice = new Invoice("communication", "Yettel Magyarország Zrt.", "Yettel Magyarország Zrt.", "HUF", 20121, "Yettel/2022/34", "2022/0", blob, user1);
        invoiceService.addInvoice(invoice);

        Invoice invoice1 = new Invoice("communication","Telekom Kft.","Telekom Kft.","HUF", 72699,"TeleKom/KJE2344","2022/1", blob, user2);
        invoiceService.addInvoice(invoice1);

        Invoice invoice2 = new Invoice("informatica","Exicom Informatika Kereskedőház Kft.","GLS Hungary Kft.","HUF", 37199,"Exicom1997/FRE3423","2022/2", blob, user3);
        invoiceService.addInvoice(invoice2);

        Invoice invoice3 = new Invoice("engineering","Fujitsu Technology Solutions Kft.","GLS Hungary Kft.","HUF", 237999,"Fujitsu1925/2034545","2022/3", blob, user4);
        invoiceService.addInvoice(invoice3);

        Invoice invoice4 = new Invoice("management","Fujitsu Technology Solutions Kft.","GLS Hungary Kft.","HUF", 365209,"Fujitsu1925/2036345","2022/4", blob, user5);
        invoiceService.addInvoice(invoice4);

        Invoice invoice5 = new Invoice("communication","Yettel Magyarország Zrt.","Yettel Magyarország Zrt.","HUF", 79999,"Yettel/2022/201","2022/5", blob, user6);
        invoiceService.addInvoice(invoice5);

        Invoice invoice6 = new Invoice("informatica", "Exicom Informatika Kereskedőház Kft.", "GLS Hungary Kft.", "HUF", 32010, "Exicom1997/ROS4365", "2022/6", blob, user7);
        invoiceService.addInvoice(invoice6);

        Invoice invoice7 = new Invoice("engineering", "Fujitsu Technology Solutions Kft.", "GLS Hungary Kft.", "HUF", 65432, "Fujitsu1925/2034543", "2022/7",  blob, user8);
        invoiceService.addInvoice(invoice7);
        pdfService.deletePdf(pdf);
    }*/

}

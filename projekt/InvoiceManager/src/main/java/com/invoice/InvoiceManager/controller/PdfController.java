package com.invoice.InvoiceManager.controller;

import com.invoice.InvoiceManager.domain.Pdf;
import com.invoice.InvoiceManager.security.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    //pdf kimentése a 'pdf' adatbázisba
    @PostMapping(value="/upload", consumes = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_FINANCIAL_CLERK')")
    public ResponseEntity uploadFile(@RequestBody byte[] uploadedPdf) {

        String message = "";
        Pdf pdf = new Pdf(uploadedPdf);

        try {
            pdfService.addPdf(pdf);
            message = "Uploaded the file successfully.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            message = "Could not upload the file!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }
}

package com.invoice.InvoiceManager.security.service;

import com.invoice.InvoiceManager.domain.Invoice;
import com.invoice.InvoiceManager.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    //Számlák listázása
    public List<Invoice> list() {
        return invoiceRepository.findAllByOrderByUploadDateDesc();
    }

    //Számla lekérése id alapján
    public Invoice getInternalInvoiceById(int id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not exist with id :" + id));
    }

    //Új számla hozzáadása
    public Invoice addInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    //Számla törlése
    public void deleteInvoice(Invoice invoice) {
        invoiceRepository.delete(invoice);
    }
}

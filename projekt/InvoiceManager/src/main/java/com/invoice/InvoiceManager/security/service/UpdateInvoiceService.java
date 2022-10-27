package com.invoice.InvoiceManager.security.service;

import com.invoice.InvoiceManager.domain.UpdateInvoice;
import com.invoice.InvoiceManager.repository.UpdateInvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateInvoiceService {

    @Autowired
    private UpdateInvoiceRepository updateInvoiceRepository;

    //Számla módosításának kimentése az 'update_invoice' adatbázisba
    public UpdateInvoice update(UpdateInvoice updateInvoice) {
        return updateInvoiceRepository.save(updateInvoice);
    }
}

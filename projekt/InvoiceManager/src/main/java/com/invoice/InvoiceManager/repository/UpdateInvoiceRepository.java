package com.invoice.InvoiceManager.repository;

import com.invoice.InvoiceManager.domain.UpdateInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateInvoiceRepository extends JpaRepository<UpdateInvoice, Integer>  {
}

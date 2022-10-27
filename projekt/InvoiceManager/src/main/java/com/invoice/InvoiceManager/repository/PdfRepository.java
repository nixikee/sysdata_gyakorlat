package com.invoice.InvoiceManager.repository;

import com.invoice.InvoiceManager.domain.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PdfRepository  extends JpaRepository<Pdf, Integer> {

    //A pdf-ek lekérése a 'pdf' adatbázisból
    List<Pdf> findAll();
}

package com.invoice.InvoiceManager.repository;

import com.invoice.InvoiceManager.domain.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    //Az 'invoice' adatbázis elemeinek lekérése és rendezés a feltöltés dátuma szerint visszafelé
    List<Invoice> findAllByOrderByUploadDateDesc();
}

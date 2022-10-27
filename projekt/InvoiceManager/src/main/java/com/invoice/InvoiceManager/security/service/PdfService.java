package com.invoice.InvoiceManager.security.service;

import com.invoice.InvoiceManager.domain.Pdf;
import com.invoice.InvoiceManager.repository.PdfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Service
public class PdfService {

    @Autowired
    private PdfRepository pdfRepository;

    //pdf-ek listázása
    public List<Pdf> listPdf() {
        return pdfRepository.findAll();
    }

    //Új pdf hozzáadása
    public Pdf addPdf(Pdf pdf) {
        return pdfRepository.save(pdf);
    }

    //Pdf törlés
    public void deletePdf(Pdf pdf) {
        pdfRepository.delete(pdf);
    }

    //byte array blob-á alakítása
    public Blob createBlobFromByteArray(byte[] array) throws SQLException {

        Blob blob = new SerialBlob(array);

        return blob;
    }

    /*public Blob createBlob(String path) throws SQLException, IOException {

        Blob blob;

        File file = new File(path);

        byte[] fileContent = new byte[(int) file.length()];
        FileInputStream inputStream = null;
        try {

            inputStream = new FileInputStream(file);

            inputStream.read(fileContent);
            blob = new SerialBlob(fileContent);
        } catch (IOException e) {
            throw new IOException("Unable to convert file to byte array. " +
                    e.getMessage());
        } finally {

            if (inputStream != null) {
                inputStream.close();
            }
        }
        return blob;
    }*/
}

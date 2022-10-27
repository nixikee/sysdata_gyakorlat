package com.invoice.InvoiceManager.domain;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "pdf")
public class Pdf {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "data")
    @Lob
    private byte[] data;

    private Pdf() {
    }
    public Pdf(byte[] data) {
        this.data = data;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Pdf{" +
                "id=" + id +
                ", data=" + Arrays.toString(data) +
                '}';
    }
}

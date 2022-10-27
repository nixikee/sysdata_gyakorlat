package com.invoice.InvoiceManager.domain;

import com.invoice.InvoiceManager.domain.auth.User;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "updatedInvoice")
public class UpdateInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private int id;

    private Date updateDate;

    private String status;

    //Külsőkulcs a módosító felhasználóhoz
    @ManyToOne
    private User updater;

    //Külsőkulcs a módisított számlához
    @ManyToOne
    private Invoice invoice;

    private UpdateInvoice() {}

    public UpdateInvoice(Date updateDate, String status, User updater, Invoice invoice) {
        this.updateDate = updateDate;
        this.status = status;
        this.updater = updater;
        this.invoice = invoice;
    }

    public UpdateInvoice(Date updateDate, User updater, Invoice invoice) {
        this.updateDate = updateDate;
        this.updater = updater;
        this.invoice = invoice;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUpdater() {
        return updater;
    }

    public void setUpdater(User updater) {
        this.updater = updater;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
}

package com.invoice.InvoiceManager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.invoice.InvoiceManager.domain.auth.User;
import com.invoice.InvoiceManager.json.BlobSerializer;
import com.invoice.InvoiceManager.json.DateSerializer;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "invoice")
public class Invoice implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "internalInvoiceId", nullable = false)
    private int internalInvoiceId;
    @JsonSerialize(using=DateSerializer.class)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date uploadDate;
    @Column(nullable = false)
    @NotEmpty(message = "Cost center may not be empty")
    private String costCenter;
    @Column(nullable = false)
    @NotEmpty(message = "Business partner may not be empty")
    private String businessPartner;
    @Column(nullable = false)
    @NotEmpty(message = "Contractor may not be empty")
    private String contractor;

    @Column(nullable = false)
    @NotEmpty(message = "Currency may not be empty")
    private String currency;
    @Column(nullable = false)
    private int amount;
    @Column(nullable = false)
    @NotEmpty(message = "Order number may not be empty")
    private String orderNumber;
    @Column(nullable = false)
    @NotEmpty(message = "Supplier invoice ID may not be empty")
    private String supplierInvoiceId;
    @Column(nullable = false)
    private String status;
    @JsonSerialize(using = BlobSerializer.class)
    //@Column(nullable = false)
    private Blob pdfBlob;

    //Külsőkulcs a feltöltő felhasználóhoz
    @CreatedBy
    @ManyToOne
    private User user;

    //Külsőkulcs a módosításokat tartalmazó adatbázishoz
    @JsonIgnore
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<UpdateInvoice> updatedInvoiceList;

    public Invoice() {}

    public Invoice(String costCenter, String businessPartner, String contractor, String currency, int amount, String orderNumber,
                   String supplierInvoiceId, Blob pdfBlob, User user) {
        this.uploadDate = new Date();
        this.costCenter = costCenter;
        this.businessPartner = businessPartner;
        this.contractor = contractor;
        this.currency = currency;
        this.amount = amount;
        this.orderNumber = orderNumber;
        this.supplierInvoiceId = supplierInvoiceId;
        this.status = "New";
        this.pdfBlob = pdfBlob;
        this.user = user;
    }

    public int getInternalInvoiceId() {
        return internalInvoiceId;
    }

    public void setInternalInvoiceId(int internalInvoiceId) {
        this.internalInvoiceId = internalInvoiceId;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getBusinessPartner() {
        return businessPartner;
    }

    public void setBusinessPartner(String businessPartner) {
        this.businessPartner = businessPartner;
    }

    public String getContractor() {
        return contractor;
    }

    public void setContractor(String contractor) {
        this.contractor = contractor;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getSupplierInvoiceId() {
        return supplierInvoiceId;
    }

    public void setSupplierInvoiceId(String supplierInvoiceId) {
        this.supplierInvoiceId = supplierInvoiceId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Blob getPdfBlob() {
        return pdfBlob;
    }

    public void setPdfBlob(Blob pdfBlob) {
        this.pdfBlob = pdfBlob;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<UpdateInvoice> getUpdatedInvoiceList() {
        return updatedInvoiceList;
    }

    public void setUpdatedInvoiceList(List<UpdateInvoice> updatedInvoiceList) {
        this.updatedInvoiceList = updatedInvoiceList;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "internalInvoiceId=" + internalInvoiceId +
                ", uploadDate=" + uploadDate +
                ", costCenter='" + costCenter + '\'' +
                ", businessPartner='" + businessPartner + '\'' +
                ", contractor='" + contractor + '\'' +
                ", currency='" + currency + '\'' +
                ", amount=" + amount +
                ", orderNumber='" + orderNumber + '\'' +
                ", supplierInvoiceId='" + supplierInvoiceId + '\'' +
                ", status='" + status + '\'' +
                ", pdfBlob=" + pdfBlob +
                ", user=" + user +
                ", updatedInvoiceList=" + updatedInvoiceList +
                '}';
    }
}
package com.invoice.InvoiceManager.domain.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.invoice.InvoiceManager.domain.Invoice;
import com.invoice.InvoiceManager.domain.UpdateInvoice;
import net.bytebuddy.utility.RandomString;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;
import java.util.random.RandomGenerator;

@Entity
@Table(name = "employee",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "companyId"),
            @UniqueConstraint(columnNames = "email")
})
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private int userId;
    @Column(nullable = false)
    @NotEmpty(message = "Company ID may not be empty")
    @Length(min = 8, max = 8, message = "Company ID should be 8 characters long")
    private String companyId;

    @Column(nullable = false)
    @NotEmpty(message = "Email may not be empty")
    private String email;
    @Column(nullable = false)
    @NotEmpty(message = "Firstname may not be empty")
    private String firstName;
    @Column(nullable = false)
    @NotEmpty(message = "Lastname may not be empty")
    private String lastName;
    @Column(nullable = false)
    @NotEmpty(message = "Password may not be empty")
    @Length(min = 6, message = "Password should be minimum 6 characters long")
    private String password;
    @Column(nullable = false)
    @NotEmpty(message = "Role may not be empty")
    private String role;

    //Külsőkulcs a feltöltött számlákhoz
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Invoice> invoiceList;

    //Külsőkulcs a módosításokat tartalmazó adatbázishoz
    @JsonIgnore
    @OneToMany(mappedBy = "updater")
    private List<UpdateInvoice> updatedInvoiceList;

    public User () {}

    public User(String companyId, String email, String firstName, String lastName,
                String password) {
        this.companyId = companyId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public User(String companyId, String email, String firstName, String lastName,
                String password, String role) {
        this.companyId = companyId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Invoice> getInvoiceList() {
        return invoiceList;
    }

    public void setInvoiceList(List<Invoice> invoiceList) {
        this.invoiceList = invoiceList;
    }

    public List<UpdateInvoice> getUpdatedInvoiceList() {
        return updatedInvoiceList;
    }

    public void setUpdatedInvoiceList(List<UpdateInvoice> updatedInvoiceList) {
        this.updatedInvoiceList = updatedInvoiceList;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", companyId='" + companyId + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", invoiceList=" + invoiceList +
                ", updatedInvoiceList=" + updatedInvoiceList +
                '}';
    }
}
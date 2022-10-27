package com.invoice.InvoiceManager.payload.request;

import com.invoice.InvoiceManager.domain.auth.User;

public class UpdateStatus {

    private String click;
    private User user;

    public UpdateStatus(String click, User user) {
        this.click = click;
        this.user = user;
    }

    public String getClick() {
        return click;
    }

    public void setClick(String click) {
        this.click = click;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

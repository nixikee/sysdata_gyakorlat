package com.invoice.InvoiceManager.security.service;

import com.invoice.InvoiceManager.domain.auth.User;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserDetailsImpl implements UserDetails {

    private int userId;

    private String companyId;

    private String email;

    private String firstName;

    private String lastName;

    @JsonIgnore
    private String password;

    private Collection<GrantedAuthority> authorities;

    public UserDetailsImpl(int userId, String companyId, String email, String firstName, String lastName,
                           String password, Collection<GrantedAuthority> authorities) {
        this.userId = userId;
        this.companyId = companyId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.authorities = authorities;
    }

    // A user-ből Userdetails készítése
    public static UserDetailsImpl build(User user) {

        // A user role-j GrantedAuthority-hez adása az ellenőrzéshez
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);

        return new UserDetailsImpl(
                user.getUserId(),
                user.getCompanyId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public int getUserId() {
        return userId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(userId, user.getUserId());
    }
}

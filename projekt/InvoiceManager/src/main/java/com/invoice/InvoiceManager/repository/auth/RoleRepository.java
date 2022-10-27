package com.invoice.InvoiceManager.repository.auth;

import com.invoice.InvoiceManager.domain.auth.ERole;
import com.invoice.InvoiceManager.domain.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

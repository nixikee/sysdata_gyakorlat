package com.invoice.InvoiceManager.repository.auth;

import com.invoice.InvoiceManager.domain.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //Felhasználók lekérése az 'employee' adatbázisból userId alapján rendezve
    List<User> findAllByOrderByUserId();

    //Felhasználók lekérése az 'employee' adatbázisból email alapján
    Optional<User> findByEmail(String email);

    //Létezik-e az adatbázisban a megadott e-mail cím
    Boolean existsByEmail(String email);

    //Létezik-e az adatbázisban a megadott companyId
    Boolean existsByCompanyId(String companyId);

}

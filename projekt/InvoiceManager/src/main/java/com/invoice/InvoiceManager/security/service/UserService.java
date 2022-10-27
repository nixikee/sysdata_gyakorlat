package com.invoice.InvoiceManager.security.service;

import com.invoice.InvoiceManager.domain.auth.User;
import com.invoice.InvoiceManager.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    //Felhasználók listázása
    public List<User> list() {
        List<User> users = userRepository.findAllByOrderByUserId();

        return users;
    }

    //Felhasználó lekérése id alapján
    public User getUserByUserId(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + userId));
    }

    //Felhasználó lekérése email alapján
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));
    }

    //Létezik-e az e-mail cím az adatbázisban
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    //Létezik-e az companyID az adatbázisban
    public boolean existsByCompanyId(String companyId) {
        return userRepository.existsByCompanyId(companyId);
    }


    //Új felhasználó hozzáadása
    public User addUser(User user) {

        String password = encoder.encode(user.getPassword());
        user.setPassword(password);
        return userRepository.save(user);
    }

    //Felhasználó törlése
    public void deleteUser(User user) {
        userRepository.delete(user);
    }
}

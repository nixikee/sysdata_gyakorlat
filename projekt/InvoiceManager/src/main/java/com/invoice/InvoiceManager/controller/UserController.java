package com.invoice.InvoiceManager.controller;

import com.invoice.InvoiceManager.domain.Invoice;
import com.invoice.InvoiceManager.domain.UpdateInvoice;
import com.invoice.InvoiceManager.domain.auth.User;
import com.invoice.InvoiceManager.security.service.InvoiceService;
import com.invoice.InvoiceManager.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private InvoiceService invoiceService;

    //Felhasználók listázása
    @GetMapping("/list_user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> list() {
        return new ResponseEntity<>(userService.list(), HttpStatus.OK);
    }

    //Felhasználó keresése id alapján
    @GetMapping("/find/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> findInvoiceByUserId(@PathVariable("id") int id) {
        User user = userService.getUserByUserId(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //Új felhasználó hozzáadása
    @PostMapping("/add_user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    //Felhasználó módosítása
    @PutMapping("/update_user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> updateUser(@PathVariable int id, @RequestBody User userDetails){
        //A módosítani kívánt felhasználó lekérése az 'employee' adatbázisból paraméter alapján
        User user = userService.getUserByUserId(id);

        //Felhasználó adattagjainak beállítása a paraméterben érkező userDetails alapján
        user.setCompanyId(userDetails.getCompanyId());
        user.setEmail(userDetails.getEmail());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());

        //Módosított felhasználó kimentése
        userService.addUser(user);

        Map<String, Boolean> response = new HashMap<>();
        response.put("updated", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    //A felhasználó jelszavának módosítása
    @PutMapping("/update_password/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER') or hasRole('ROLE_FINANCIAL_CONTROLLER') or hasRole('ROLE_FINANCIAL_CLERK')")
    public ResponseEntity<Map<String, Boolean>> updatePassword(@PathVariable int id, @RequestBody String password){
        //A módosítani kívánt felhasználó lekérése az 'employee' adatbázisból paraméter alapján
        User user = userService.getUserByUserId(id);

        //A felhasználó jelszavának beállítása paraméter alapján
        user.setPassword(password);

        //Módosított felhasználó kimentése
        userService.addUser(user);

        Map<String, Boolean> response = new HashMap<>();
        response.put("updated password", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    //A felhasználó törlése
    @DeleteMapping("find/delete/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable int userId){
        //A törölni kívánt felhasználó lekérése az 'employee' adatbázisból paraméter alapján
        User user = userService.getUserByUserId(userId);

        //A felhasználó külső kulcsainak törlése az 'employee' adatbázisból
        for(Invoice invoice : user.getInvoiceList()) {
            invoice.setUser(null);
        }

        //A felhasználó külső kulcsainak törlése az 'update_invoice' adatbázisból
        for(UpdateInvoice updateInvoice : user.getUpdatedInvoiceList()) {
            updateInvoice.setUpdater(null);
        }

        user.setRole(null);

        //A felhasználó törlése az adatbázisból
        userService.deleteUser(user);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

}

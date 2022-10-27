package com.invoice.InvoiceManager.controller;

import com.invoice.InvoiceManager.domain.auth.ERole;
import com.invoice.InvoiceManager.domain.auth.Role;
import com.invoice.InvoiceManager.domain.auth.User;
import com.invoice.InvoiceManager.payload.request.LoginRequest;
import com.invoice.InvoiceManager.payload.request.SignupRequest;
import com.invoice.InvoiceManager.payload.response.JwtResponse;
import com.invoice.InvoiceManager.payload.response.MessageResponse;
import com.invoice.InvoiceManager.repository.auth.RoleRepository;
import com.invoice.InvoiceManager.security.jwt.JwtUtils;
import com.invoice.InvoiceManager.security.service.UserDetailsImpl;
import com.invoice.InvoiceManager.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    // Bejelentkezés
    // Paraméterben megkapja a Frontend-től a bejelentkezési adatokat
    // Ezután kezdődik a hitelesítés az AuthenticationManager authenticate() függvényével
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest login) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));

        // Beállítjuk a security contex-et
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Hitelesített user adatainak lekérése
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Létrehozzuk a JWT-t tartalmazó Cookie-t
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        // Lekérjük a user jogosultsági körét
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        String role = roles.get(0);

        // Visszaküldjük válaszként a beállított Cookie-t és a user adatait
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new JwtResponse(
                        userDetails.getUserId(),
                        userDetails.getCompanyId(),
                        userDetails.getUsername(),
                        userDetails.getFirstName(),
                        userDetails.getLastName(),
                        role));
    }

    // új felhasználó hozzáadása
    @PostMapping("/signup")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addUser(@Valid @RequestBody SignupRequest signUpRequest) {

        // Létezik-e már az adatbázisban a létrehozni kívánt companyId
        if (userService.existsByCompanyId(signUpRequest.getCompanyId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Company id is already taken!"));
        }

        // Létezik-e már az adatbázisban a létrehozni kívánt e-mail cím
        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Új user létrehozása
        User user = new User(signUpRequest.getCompanyId(),
                signUpRequest.getEmail(),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                encoder.encode(signUpRequest.getPassword()));

        String strRole;
        Role role;

        // Ha nincs megadva role, akkor alapbeállítás legyen a financial clerk
        // Egyébként a megadott role
        if(signUpRequest.getRole() == null) {
            strRole = "financial clerk";
        } else {
            strRole = signUpRequest.getRole();
        }

        // A megadott string típusú
        switch (strRole) {
            case "admin" -> role = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            case "manager" -> role = roleRepository.findByName(ERole.ROLE_MANAGER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            case "financial controller" -> role = roleRepository.findByName(ERole.ROLE_FINANCIAL_CONTROLLER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            default -> role = roleRepository.findByName(ERole.ROLE_FINANCIAL_CLERK)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        }

        user.setRole(role.getName().name());
        userService.addUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    // Kijelentkezés
    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        // A beállított Cookie törlése
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }

}
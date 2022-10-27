package com.invoice.InvoiceManager.security.jwt;

import com.invoice.InvoiceManager.security.service.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    // Szűrés, ami kérésenként egyszer fut le
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // JWT kinyerése a kérésból
            String jwt = parseJwt(request);
            // Ha a kérésben van JWT, akkor validáljuk
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                // Felhasználó lekérése a JWT token-ből (itt email)
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                // UserDetails lekérése a username-ből (itt email)
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                // UserDetails felhasználása az authentication-hoz
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Security kontextusának beállítása az authentication-ból
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    // JWT kinyerése a kérés Cookie-jából
    private String parseJwt(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);

        return jwt;
    }
}

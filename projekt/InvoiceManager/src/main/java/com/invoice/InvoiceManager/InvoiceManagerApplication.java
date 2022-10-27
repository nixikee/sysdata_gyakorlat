package com.invoice.InvoiceManager;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// Az api dokumentációhoz információk beállítása
@OpenAPIDefinition(info = @Info(title = "InvoiceManager API", version = "3.0.1", description = "Invoice and User Information"))
public class InvoiceManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvoiceManagerApplication.class, args);
	}

}

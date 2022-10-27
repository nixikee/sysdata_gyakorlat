package com.invoice.InvoiceManager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("Access-Control-Allow-Origin",
                        "*",
                        "Access-Control-Allow-Methods",
                        "POST, GET, OPTIONS, PUT, DELETE",
                        "Access-Control-Allow-Headers",
                        "Origin, X-Requested-With, Content-Type, Accept")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        WebMvcConfigurer.super.addViewControllers(registry);
        registry.addViewController("/login").setViewName("api/auth/login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}

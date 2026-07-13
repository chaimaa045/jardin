package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

/**
 * Point d'entrée de l'application Souss Garden Backend.
 * @EnableMethodSecurity active @PreAuthorize sur les controllers admin.
 */
@SpringBootApplication
@EnableMethodSecurity
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
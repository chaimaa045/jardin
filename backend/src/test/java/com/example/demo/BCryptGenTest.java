package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenTest {

    @Test
    public void generateHash() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("====== NEW HASH ======");
        System.out.println(encoder.encode("Admin2026!"));
        System.out.println("======================");
    }
}

package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.AuthResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request, HttpServletResponse response);
    void logout(HttpServletResponse response);
    AuthResponse checkAuth(String username);
}

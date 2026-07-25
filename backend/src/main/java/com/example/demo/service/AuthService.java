package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.AuthResponse;
import jakarta.servlet.http.HttpServletResponse;

import com.example.demo.dto.request.ChangePasswordRequest;
import com.example.demo.dto.request.UpdateProfileRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request, HttpServletResponse response);
    void logout(HttpServletResponse response);
    AuthResponse checkAuth(String username);
    void changePassword(String username, ChangePasswordRequest request);
    AuthResponse updateProfile(String currentUsername, UpdateProfileRequest request, HttpServletResponse response);
}

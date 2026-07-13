package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.security.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

/**
 * Service d'authentification — gère login, logout et refresh token.
 * Les tokens JWT sont envoyés via Cookies HttpOnly pour la sécurité XSS.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    /**
     * Authentifie l'administrateur et envoie les tokens via cookies HttpOnly.
     */
    public AuthResponse login(LoginRequest request, HttpServletResponse response) {
        try {
            // 1. Authentification via Spring Security (vérifie username + BCrypt password)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            String username = authentication.getName();

            // 2. Génération des tokens
            String accessToken = jwtUtils.generateAccessToken(username);
            String refreshToken = jwtUtils.generateRefreshToken(username);

            // 3. Envoi des tokens via Cookies HttpOnly (sécurisé contre XSS)
            addAccessTokenCookie(response, accessToken);
            addRefreshTokenCookie(response, refreshToken);

            return new AuthResponse("Connexion réussie", username, true);

        } catch (AuthenticationException e) {
            throw new RuntimeException("Identifiants incorrects");
        }
    }

    /**
     * Déconnexion — supprime les cookies en les remettant à maxAge=0.
     */
    public void logout(HttpServletResponse response) {
        clearCookie(response, "access_token");
        clearCookie(response, "refresh_token");
    }

    /**
     * Vérifie si l'admin est authentifié (utilisé par le frontend au démarrage).
     */
    public AuthResponse checkAuth(String username) {
        return new AuthResponse("Authentifié", username, true);
    }

    // ============================================================
    // Méthodes utilitaires pour les cookies
    // ============================================================

    private void addAccessTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);            // Inaccessible au JavaScript
        cookie.setSecure(false);             // true en production (HTTPS)
        cookie.setPath("/");                 // Accessible sur toutes les routes
        cookie.setMaxAge(jwtUtils.getJwtExpirationMs() / 1000); // En secondes
        response.addCookie(cookie);
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("refresh_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);             // true en production
        cookie.setPath("/api/admin/auth");   // Accessible uniquement sur le chemin de refresh
        cookie.setMaxAge(jwtUtils.getRefreshExpirationMs() / 1000);
        response.addCookie(cookie);
    }

    private void clearCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Supprime immédiatement le cookie
        response.addCookie(cookie);
    }
}

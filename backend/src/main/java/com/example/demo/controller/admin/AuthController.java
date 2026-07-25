package com.example.demo.controller.admin;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.ChangePasswordRequest;
import com.example.demo.dto.request.UpdateProfileRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Controller d'authentification administrateur.
 * Base URL : /api/admin/auth
 */
@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/admin/auth/login
     * Corps : { "username": "...", "password": "..." }
     * Retourne les cookies HttpOnly access_token + refresh_token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.login(request, response);
        return ResponseEntity.ok(authResponse);
    }

    /**
     * POST /api/admin/auth/logout
     * Supprime les cookies d'authentification.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/admin/auth/me
     * Vérifie si l'admin est bien authentifié (utilisé par Next.js au démarrage).
     * Protégé par Spring Security — retourne 401 si pas de token valide.
     */
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(Authentication authentication) {
        AuthResponse authResponse = authService.checkAuth(authentication.getName());
        return ResponseEntity.ok(authResponse);
    }

    /**
     * PUT /api/admin/auth/password
     * Met à jour le mot de passe de l'administrateur.
     */
    @PutMapping("/password")
    public ResponseEntity<AuthResponse> updatePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {
        authService.changePassword(authentication.getName(), request);
        return ResponseEntity.ok(new AuthResponse("Mot de passe mis à jour", authentication.getName(), true));
    }

    /**
     * PUT /api/admin/auth/profile
     * Met à jour l'identifiant (username) de l'administrateur.
     */
    @PutMapping("/profile")
    public ResponseEntity<AuthResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.updateProfile(authentication.getName(), request, response);
        return ResponseEntity.ok(authResponse);
    }
}

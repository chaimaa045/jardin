package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO de réponse après authentification réussie.
 * Le token JWT est envoyé via Cookie HttpOnly (plus sécurisé),
 * ce DTO sert uniquement à confirmer la connexion.
 */
@Data
@AllArgsConstructor
public class AuthResponse {

    private String message;
    private String username;
    private boolean authenticated;
}

package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utilitaire JWT — Génération, validation et extraction des tokens.
 * Les tokens sont envoyés via Cookie HttpOnly (protection XSS).
 */
@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration.ms}")
    private int jwtExpirationMs;

    @Value("${jwt.refresh.expiration.ms}")
    private int refreshExpirationMs;

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Génère un Access Token JWT (courte durée : 15 minutes).
     */
    public String generateAccessToken(String username) {
        return Jwts.builder()
                .subject(username)
                .claim("type", "access")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Génère un Refresh Token JWT (longue durée : 7 jours).
     */
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .claim("type", "refresh")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extrait le nom d'utilisateur depuis un token JWT.
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /**
     * Valide un token JWT (signature + expiration).
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException e) {
            logger.error("JWT: Signature invalide → {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("JWT: Token malformé → {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT: Token expiré → {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT: Token non supporté → {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT: Claims vides → {}", e.getMessage());
        }
        return false;
    }

    public int getRefreshExpirationMs() {
        return refreshExpirationMs;
    }

    public int getJwtExpirationMs() {
        return jwtExpirationMs;
    }
}

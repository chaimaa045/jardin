package com.example.demo.config;

import com.example.demo.security.AdminUserDetails;
import com.example.demo.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Configuration principale de Spring Security.
 * Architecture JWT Stateless avec Cookie HttpOnly.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AdminUserDetails adminUserDetails;

    @Value("${allowed.origins}")
    private String allowedOriginsStr;

    /**
     * Chaîne de filtres de sécurité — règles d'accès aux endpoints.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Désactiver CSRF (on utilise JWT Stateless — CSRF non applicable)
                .csrf(AbstractHttpConfigurer::disable)

                // Configurer CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Politique de session : STATELESS (pas de session serveur)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Règles d'autorisation
                .authorizeHttpRequests(auth -> auth
                        // Routes publiques — lecture seule
                        .requestMatchers(HttpMethod.GET, "/api/products", "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categories", "/api/categories/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
                        // Autoriser les requêtes OPTIONS (CORS preflight)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Création de commande — public
                        .requestMatchers(HttpMethod.POST, "/api/orders").permitAll()
                        // Route de connexion — publique
                        .requestMatchers(HttpMethod.POST, "/api/admin/auth/login").permitAll()
                        // Toutes les autres routes /api/admin/** — ADMIN uniquement
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // Autoriser l'endpoint /error pour ne pas masquer les erreurs 500 en 403
                        .requestMatchers("/error").permitAll()
                        // Tout le reste — authentifié
                        .anyRequest().authenticated()
                )

                // Ajouter le filtre JWT avant le filtre d'authentification standard
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuration CORS — autorise uniquement les origines du frontend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Origines autorisées depuis les variables d'environnement
        List<String> origins = Arrays.asList(allowedOriginsStr.split(","));
        configuration.setAllowedOrigins(origins);

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true); // Nécessaire pour les cookies
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Encodeur de mot de passe BCrypt (cost factor 12).
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    /**
     * Provider d'authentification utilisant AdminUserDetails + BCrypt.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(adminUserDetails);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * AuthenticationManager — nécessaire pour le login dans AuthController.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

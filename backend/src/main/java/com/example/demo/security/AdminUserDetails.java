package com.example.demo.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Fournisseur des informations de l'administrateur unique.
 * Les credentials sont chargés depuis les variables d'environnement
 * (pas depuis une table BDD — pattern YAGNI pour 1 seul admin).
 */
@Component
public class AdminUserDetails implements UserDetailsService {

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password.hash}")
    private String adminPasswordHash;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!adminUsername.equals(username)) {
            throw new UsernameNotFoundException("Utilisateur non trouvé : " + username);
        }

        return User.builder()
                .username(adminUsername)
                .password(adminPasswordHash) // Hash BCrypt — Spring Security compare automatiquement
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}

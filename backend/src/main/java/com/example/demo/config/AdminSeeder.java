package com.example.demo.config;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Value("${admin.username}")
    private String defaultUsername;

    @Value("${admin.password.hash}")
    private String defaultPasswordHash;

    @Override
    public void run(String... args) throws Exception {
        // Si la table users est vide, on crée l'administrateur par défaut
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username(defaultUsername)
                    .passwordHash(defaultPasswordHash)
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Administrateur par défaut créé à partir des variables d'environnement.");
        }
    }
}

package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "site_settings")
public class SiteSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String email;
    private String phone;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private String facebookUrl;
    private String instagramUrl;
    private String whatsappNumber;

    @Column(columnDefinition = "TEXT")
    private String aboutText;
}

package com.example.demo.service;

import com.example.demo.model.SiteSettings;
import com.example.demo.repository.SiteSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SiteSettingsService {

    private final SiteSettingsRepository repository;

    public SiteSettings getSettings() {
        List<SiteSettings> all = repository.findAll();
        if (all.isEmpty()) {
            SiteSettings defaultSettings = SiteSettings.builder()
                    .companyName("Jardin Souss")
                    .email("contact@jardinsouss.com")
                    .build();
            return repository.save(defaultSettings);
        }
        return all.get(0);
    }

    public SiteSettings updateSettings(SiteSettings newSettings) {
        SiteSettings current = getSettings();
        current.setCompanyName(newSettings.getCompanyName());
        current.setEmail(newSettings.getEmail());
        current.setPhone(newSettings.getPhone());
        current.setAddress(newSettings.getAddress());
        current.setFacebookUrl(newSettings.getFacebookUrl());
        current.setInstagramUrl(newSettings.getInstagramUrl());
        current.setWhatsappNumber(newSettings.getWhatsappNumber());
        current.setAboutText(newSettings.getAboutText());
        return repository.save(current);
    }
}

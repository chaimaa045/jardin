package com.example.demo.controller;

import com.example.demo.model.SiteSettings;
import com.example.demo.service.SiteSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SiteSettingsController {

    private final SiteSettingsService siteSettingsService;

    @GetMapping
    public ResponseEntity<SiteSettings> getSettings() {
        return ResponseEntity.ok(siteSettingsService.getSettings());
    }

    @PutMapping
    public ResponseEntity<SiteSettings> updateSettings(@RequestBody SiteSettings settings) {
        return ResponseEntity.ok(siteSettingsService.updateSettings(settings));
    }
}

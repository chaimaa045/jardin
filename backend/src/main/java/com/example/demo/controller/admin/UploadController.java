package com.example.demo.controller.admin;

import com.example.demo.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
public class UploadController {

    private final FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        // Construire l'URL pour accéder au fichier
        // On n'utilise pas ServletUriComponentsBuilder pour éviter les problèmes de proxy/port
        // On retourne juste le chemin relatif, le frontend le complétera
        String fileDownloadUri = "/uploads/" + fileName;

        Map<String, String> response = new HashMap<>();
        response.put("url", fileDownloadUri);
        response.put("fileName", fileName);

        return ResponseEntity.ok(response);
    }
}

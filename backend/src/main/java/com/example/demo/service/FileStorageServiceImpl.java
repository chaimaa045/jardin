package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Cloudinary cloudinary;

    public FileStorageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String storeFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (originalFileName.contains("..")) {
                throw new RuntimeException("Le nom du fichier contient une séquence de chemin invalide " + originalFileName);
            }

            // Générer un public_id unique pour l'image
            String fileExtension = "";
            int dotIndex = originalFileName.lastIndexOf('.');
            if (dotIndex >= 0) {
                fileExtension = originalFileName.substring(dotIndex);
            }
            String newFileName = UUID.randomUUID().toString() + fileExtension;

            // Upload de l'image sur Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "public_id", UUID.randomUUID().toString(),
                    "folder", "souss-garden" // Dossier optionnel dans Cloudinary
            ));

            // Retourner l'URL sécurisée
            return uploadResult.get("secure_url").toString();
        } catch (IOException ex) {
            throw new RuntimeException("Impossible de stocker le fichier " + originalFileName + " sur Cloudinary. Veuillez réessayer!", ex);
        }
    }
}

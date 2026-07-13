package com.example.demo.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * DTO pour la création et modification d'un produit.
 * L'entité JPA Product n'est jamais exposée directement à l'API.
 */
@Data
public class ProductRequest {

    @NotBlank(message = "Le nom du produit est obligatoire")
    @Size(max = 255, message = "Le nom ne peut pas dépasser 255 caractères")
    private String name;

    @NotNull(message = "Le prix est obligatoire")
    @Positive(message = "Le prix doit être positif")
    private Double price;

    @NotNull(message = "Le stock est obligatoire")
    @PositiveOrZero(message = "Le stock ne peut pas être négatif")
    private Integer stock;

    private String imageUrl;

    @NotNull(message = "L'ID de la catégorie est obligatoire")
    private Long categoryId;

    private String description;

    private Boolean featured = false;
}

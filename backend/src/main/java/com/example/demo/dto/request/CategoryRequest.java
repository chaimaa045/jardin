package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Le nom de la catégorie est requis")
    private String name;

    @NotBlank(message = "Le slug est requis")
    private String slug;

    private String description;
}

package com.example.demo.dto.response;

import com.example.demo.model.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO de réponse pour l'exposition des produits via l'API REST.
 * Découple la structure de la BDD de la représentation JSON publique.
 */
@Data
@NoArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private Double price;
    private Integer stock;
    private String imageUrl;
    private CategoryResponse category;
    private String description;
    private Boolean featured;

    /**
     * Factory method : convertit une entité Product en ProductResponse.
     */
    public static ProductResponse from(Product product) {
        ProductResponse dto = new ProductResponse();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImageUrl(product.getImageUrl());
        
        if (product.getCategory() != null) {
            CategoryResponse catDto = new CategoryResponse();
            catDto.setId(product.getCategory().getId());
            catDto.setName(product.getCategory().getName());
            catDto.setSlug(product.getCategory().getSlug());
            catDto.setDescription(product.getCategory().getDescription());
            dto.setCategory(catDto);
        }
        dto.setDescription(product.getDescription());
        dto.setFeatured(product.getFeatured());
        return dto;
    }
}

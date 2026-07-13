package com.example.demo.service;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service métier pour la gestion des produits.
 * Couche intermédiaire entre Controller et Repository (Clean Architecture).
 * Toute la logique métier est ici, jamais dans le Controller.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // Lecture seule par défaut (optimisation)
public class ProductService {

    private final ProductRepository productRepository;
    private final com.example.demo.repository.CategoryRepository categoryRepository;

    /**
     * Récupère tous les produits (endpoint public /api/products).
     */
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * Récupère uniquement les produits mis en avant.
     */
    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue()
                .stream()
                .map(ProductResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * Récupère un produit par son ID.
     */
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        return ProductResponse.from(product);
    }

    /**
     * Crée un nouveau produit (réservé à l'admin).
     */
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        com.example.demo.model.Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .stock(request.getStock())
                .imageUrl(request.getImageUrl())
                .category(category)
                .description(request.getDescription())
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .build();

        Product saved = productRepository.save(product);
        return ProductResponse.from(saved);
    }

    /**
     * Met à jour un produit existant (réservé à l'admin).
     */
    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));

        com.example.demo.model.Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);
        product.setDescription(request.getDescription());
        product.setFeatured(request.getFeatured() != null ? request.getFeatured() : false);

        Product updated = productRepository.save(product);
        return ProductResponse.from(updated);
    }

    /**
     * Supprime un produit (réservé à l'admin).
     */
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", id);
        }
        productRepository.deleteById(id);
    }
}

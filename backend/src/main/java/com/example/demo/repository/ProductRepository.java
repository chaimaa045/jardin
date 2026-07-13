package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring Data JPA génère automatiquement la requête : SELECT * FROM products WHERE featured = true
    List<Product> findByFeaturedTrue();

    // Recherche par catégorie
    List<Product> findByCategoryIgnoreCase(String category);
}
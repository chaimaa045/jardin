package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring Data JPA génère automatiquement la requête : SELECT * FROM products WHERE featured = true
    List<Product> findByFeaturedTrue();

    // Recherche par nom de catégorie (navigation vers le champ 'name' de l'entité Category)
    List<Product> findByCategory_NameIgnoreCase(String categoryName);
}
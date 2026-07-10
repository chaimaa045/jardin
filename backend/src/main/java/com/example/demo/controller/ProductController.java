package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Permet à Next.js de se connecter sans blocage CORS
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // 1. Route publique pour afficher le catalogue sur le site
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. Route privée (Dashboard) pour ajouter un produit
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}
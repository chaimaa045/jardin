package com.example.demo.service;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    List<ProductResponse> getFeaturedProducts();
    ProductResponse getProductById(Long id);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
}

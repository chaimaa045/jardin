package com.example.demo.controller;

import com.example.demo.dto.request.PortfolioCategoryRequest;
import com.example.demo.dto.request.PortfolioProjectRequest;
import com.example.demo.model.PortfolioCategory;
import com.example.demo.model.PortfolioProject;
import com.example.demo.service.PortfolioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/portfolio")
@RequiredArgsConstructor
public class PortfolioAdminController {

    private final PortfolioService portfolioService;

    // Categories
    @GetMapping("/categories")
    public ResponseEntity<List<PortfolioCategory>> getAllCategories() {
        return ResponseEntity.ok(portfolioService.getAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<PortfolioCategory> createCategory(@Valid @RequestBody PortfolioCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(portfolioService.createCategory(request));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<PortfolioCategory> updateCategory(@PathVariable Long id, @Valid @RequestBody PortfolioCategoryRequest request) {
        return ResponseEntity.ok(portfolioService.updateCategory(id, request));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        portfolioService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // Projects
    @GetMapping("/projects")
    public ResponseEntity<List<PortfolioProject>> getAllProjects() {
        return ResponseEntity.ok(portfolioService.getAllProjects());
    }

    @PostMapping("/projects")
    public ResponseEntity<PortfolioProject> createProject(@Valid @RequestBody PortfolioProjectRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(portfolioService.createProject(request));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<PortfolioProject> updateProject(@PathVariable Long id, @Valid @RequestBody PortfolioProjectRequest request) {
        return ResponseEntity.ok(portfolioService.updateProject(id, request));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        portfolioService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}

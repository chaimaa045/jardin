package com.example.demo.controller;

import com.example.demo.model.PortfolioCategory;
import com.example.demo.model.PortfolioProject;
import com.example.demo.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioPublicController {

    private final PortfolioService portfolioService;

    @GetMapping("/categories")
    public ResponseEntity<List<PortfolioCategory>> getCategories() {
        return ResponseEntity.ok(portfolioService.getAllCategories());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<PortfolioProject>> getProjects() {
        return ResponseEntity.ok(portfolioService.getAllProjects());
    }

    @GetMapping("/projects/category/{categoryId}")
    public ResponseEntity<List<PortfolioProject>> getProjectsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(portfolioService.getProjectsByCategory(categoryId));
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<PortfolioProject> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(portfolioService.getProjectById(id));
    }
}

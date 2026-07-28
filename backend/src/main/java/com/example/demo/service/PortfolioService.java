package com.example.demo.service;

import com.example.demo.dto.request.PortfolioCategoryRequest;
import com.example.demo.dto.request.PortfolioProjectRequest;
import com.example.demo.model.PortfolioCategory;
import com.example.demo.model.PortfolioProject;

import java.util.List;

public interface PortfolioService {
    List<PortfolioCategory> getAllCategories();
    PortfolioCategory createCategory(PortfolioCategoryRequest request);
    PortfolioCategory updateCategory(Long id, PortfolioCategoryRequest request);
    void deleteCategory(Long id);

    List<PortfolioProject> getAllProjects();
    List<PortfolioProject> getProjectsByCategory(Long categoryId);
    PortfolioProject getProjectById(Long id);
    PortfolioProject createProject(PortfolioProjectRequest request);
    PortfolioProject updateProject(Long id, PortfolioProjectRequest request);
    void deleteProject(Long id);
}

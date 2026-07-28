package com.example.demo.service;

import com.example.demo.dto.request.PortfolioCategoryRequest;
import com.example.demo.dto.request.PortfolioProjectRequest;
import com.example.demo.model.PortfolioCategory;
import com.example.demo.model.PortfolioProject;
import com.example.demo.repository.PortfolioCategoryRepository;
import com.example.demo.repository.PortfolioProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioCategoryRepository categoryRepository;
    private final PortfolioProjectRepository projectRepository;

    @Override
    public List<PortfolioCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public PortfolioCategory createCategory(PortfolioCategoryRequest request) {
        if (categoryRepository.findBySlug(request.getSlug()).isPresent()) {
            throw new RuntimeException("Category slug already exists");
        }
        PortfolioCategory category = PortfolioCategory.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .build();
        return categoryRepository.save(category);
    }

    @Override
    public PortfolioCategory updateCategory(Long id, PortfolioCategoryRequest request) {
        PortfolioCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        category.setName(request.getName());
        category.setSlug(request.getSlug());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public List<PortfolioProject> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<PortfolioProject> getProjectsByCategory(Long categoryId) {
        return projectRepository.findByCategoryId(categoryId);
    }

    @Override
    public PortfolioProject getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Override
    public PortfolioProject createProject(PortfolioProjectRequest request) {
        PortfolioCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        PortfolioProject project = PortfolioProject.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .coverImage(request.getCoverImage())
                .gallery(request.getGallery())
                .category(category)
                .build();

        return projectRepository.save(project);
    }

    @Override
    public PortfolioProject updateProject(Long id, PortfolioProjectRequest request) {
        PortfolioProject project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        PortfolioCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setCoverImage(request.getCoverImage());
        project.setGallery(request.getGallery());
        project.setCategory(category);

        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }
        projectRepository.deleteById(id);
    }
}

package com.example.demo.repository;

import com.example.demo.model.PortfolioCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortfolioCategoryRepository extends JpaRepository<PortfolioCategory, Long> {
    Optional<PortfolioCategory> findBySlug(String slug);
}

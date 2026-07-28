package com.example.demo.dto.request;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Data
public class PortfolioProjectRequest {
    @NotBlank
    private String title;
    
    private String description;
    
    @NotBlank
    private String coverImage;
    
    private List<String> gallery;
    
    @NotNull
    private Long categoryId;
}

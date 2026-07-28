package com.example.demo.dto.request;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class PortfolioCategoryRequest {
    @NotBlank
    private String name;
    
    @NotBlank
    private String slug;
}

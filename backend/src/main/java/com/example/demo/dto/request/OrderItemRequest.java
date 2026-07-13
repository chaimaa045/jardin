package com.example.demo.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class OrderItemRequest {
    @NotNull(message = "L'ID du produit est requis")
    private Long productId;

    @NotNull(message = "La quantité est requise")
    @Positive(message = "La quantité doit être positive")
    private Integer quantity;
}

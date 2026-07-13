package com.example.demo.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    @NotBlank(message = "Le nom du client est requis")
    private String customerName;

    @NotBlank(message = "Le téléphone du client est requis")
    private String customerPhone;

    @NotBlank(message = "L'adresse du client est requise")
    private String customerAddress;

    @NotEmpty(message = "La commande doit contenir au moins un produit")
    private List<@Valid OrderItemRequest> items;
}

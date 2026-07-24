package com.example.demo.service;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> getAllOrders();
    OrderResponse getOrderById(Long id);
    OrderResponse updateOrderStatus(Long id, String status);
}

package com.example.demo.service;

import com.example.demo.model.Order;

public interface EmailService {
    void sendNewOrderEmail(Order order);
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AdminProduct } from '@/types/admin'; // On peut réutiliser ce type ou en créer un spécifique au shop

interface CartItem {
  product: AdminProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: AdminProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('souss_garden_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('souss_garden_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: AdminProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } 
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.min(Math.max(1, quantity), item.product.stock) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('souss_garden_cart');
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

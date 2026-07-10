// src/types/shop.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
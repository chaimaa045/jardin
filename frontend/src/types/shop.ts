export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: Category;
  description?: string;
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
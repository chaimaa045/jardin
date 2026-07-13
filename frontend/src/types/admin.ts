// Types pour l'espace d'administration

export interface AdminUser {
  username: string;
  authenticated: boolean;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  details?: Record<string, string>;
}

export interface AdminProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category?: Category;
  description?: string;
  featured: boolean;
}

export interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number | '';
  description: string;
  featured: boolean;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

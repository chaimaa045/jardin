/**
 * Client API centralisé pour le frontend.
 * Toutes les requêtes vers Spring Boot passent par ici.
 * - URL configurée par variable d'environnement
 * - Cookies envoyés automatiquement (credentials: 'include')
 * - Gestion centralisée des erreurs
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface FetchOptions extends RequestInit {
  data?: unknown;
}

/**
 * Fonction de fetch améliorée — gère JSON, credentials et erreurs.
 */
async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { data, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    credentials: 'include', // Envoie les cookies automatiquement (JWT HttpOnly)
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    // Essaie de parser l'erreur JSON du backend
    const errorData = await response.json().catch(() => ({
      message: `Erreur HTTP ${response.status}`,
    }));
    throw new Error(errorData.message || `Erreur ${response.status}`);
  }

  // Pour les réponses 204 No Content (DELETE, logout)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ============================================================
// API Publique — Produits
// ============================================================

export const publicApi = {
  getProducts: () => apiFetch<unknown[]>('/api/products'),
  getProductById: (id: number) => apiFetch<unknown>(`/api/products/${id}`),
  getFeaturedProducts: () => apiFetch<unknown[]>('/api/products/featured'),
};

// ============================================================
// API Admin — Authentification
// ============================================================

export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    apiFetch<{ message: string; username: string; authenticated: boolean }>(
      '/api/admin/auth/login',
      { method: 'POST', data: credentials }
    ),

  logout: () =>
    apiFetch<void>('/api/admin/auth/logout', { method: 'POST' }),

  me: () =>
    apiFetch<{ message: string; username: string; authenticated: boolean }>(
      '/api/admin/auth/me'
    ),
};

// ============================================================
// API Admin — Produits (CRUD)
// ============================================================

export const adminProductApi = {
  getAll: () => apiFetch<unknown[]>('/api/admin/products'),
  getById: (id: number) => apiFetch<unknown>(`/api/admin/products/${id}`),
  create: (data: unknown) =>
    apiFetch<unknown>('/api/admin/products', { method: 'POST', data }),
  update: (id: number, data: unknown) =>
    apiFetch<unknown>(`/api/admin/products/${id}`, { method: 'PUT', data }),
  delete: (id: number) =>
    apiFetch<void>(`/api/admin/products/${id}`, { method: 'DELETE' }),
};

// ============================================================
// API Admin & Publique — Catégories
// ============================================================

export const categoryApi = {
  getAll: () => apiFetch<unknown[]>('/api/categories'),
  getAdminAll: () => apiFetch<unknown[]>('/api/admin/categories'),
  create: (data: unknown) =>
    apiFetch<unknown>('/api/admin/categories', { method: 'POST', data }),
  update: (id: number, data: unknown) =>
    apiFetch<unknown>(`/api/admin/categories/${id}`, { method: 'PUT', data }),
  delete: (id: number) =>
    apiFetch<void>(`/api/admin/categories/${id}`, { method: 'DELETE' }),
};

// ============================================================
// API Publique & Admin — Commandes
// ============================================================

export const orderApi = {
  create: (data: unknown) =>
    apiFetch<unknown>('/api/orders', { method: 'POST', data }),
  getAdminAll: () => apiFetch<unknown[]>('/api/admin/orders'),
  getAdminById: (id: number) => apiFetch<unknown>(`/api/admin/orders/${id}`),
  updateStatus: (id: number, status: string) =>
    apiFetch<unknown>(`/api/admin/orders/${id}/status`, { method: 'PUT', data: { status } }),
};

// ============================================================
// API Admin — Upload
// ============================================================

export const uploadApi = {
  uploadFile: async (file: File): Promise<{ url: string; fileName: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/api/admin/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include', // Nécessaire pour l'auth admin
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return response.json();
  },
};

export default apiFetch;

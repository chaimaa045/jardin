'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';
import type { AdminUser } from '@/types/admin';

/**
 * Hook d'authentification pour l'espace admin.
 * Vérifie l'état de connexion au démarrage via GET /api/admin/auth/me.
 * Gère login, logout et l'état de chargement.
 */
export function useAuth(requireAuth: boolean = false) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await authApi.me();
      setUser({ username: data.username, authenticated: true });
    } catch {
      setUser(null);
      if (requireAuth) {
        router.push('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [requireAuth, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Connexion avec username + password.
   * Redirige vers le dashboard en cas de succès.
   */
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login({ username, password });
      setUser({ username: data.username, authenticated: true });
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Identifiants incorrects');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Déconnexion — supprime les cookies côté serveur et redirige.
   */
  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      router.push('/admin/login');
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user?.authenticated,
    error,
    login,
    logout,
  };
}

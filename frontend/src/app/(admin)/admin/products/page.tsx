'use client';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { adminProductApi } from '@/services/api';
import type { AdminProduct } from '@/types/admin';
import Link from 'next/link';
import { Plus, Edit2, Trash2, AlertCircle, Loader2, Star, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  // Helper pour corriger les URLs doublement préfixées par erreur (ex: http://localhost:8080https://...)
  const getCleanImageUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.includes('http') && url.lastIndexOf('http') > 0) {
      return url.substring(url.lastIndexOf('http'));
    }
    return url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await adminProductApi.getAll();
      setProducts(data as AdminProduct[]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await adminProductApi.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Produit supprimé avec succès.');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Erreur lors de la suppression.');
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary font-serif">Produits</h1>
            <p className="text-primary/60 mt-2">{products.length} produit(s) dans le catalogue</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white
                       font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nouveau produit
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5dfd5] rounded-2xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-primary/60">
              <Loader2 className="w-8 h-8 animate-spin mr-3 text-secondary" />
              Chargement des produits…
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e5dfd5]">
                <AlertCircle className="w-8 h-8 text-primary/30" />
              </div>
              <p className="text-primary/60 text-lg">Aucun produit pour l'instant.</p>
              <Link href="/admin/products/new"
                className="text-secondary hover:text-secondary/80 font-medium mt-3 inline-flex items-center gap-2">
                Ajouter votre premier produit <Plus className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface text-primary/70 text-xs uppercase font-semibold border-b border-[#e5dfd5]">
                  <tr>
                    <th className="px-4 lg:px-6 py-4">Produit</th>
                    <th className="px-4 lg:px-6 py-4 hidden md:table-cell">Catégorie</th>
                    <th className="px-4 lg:px-6 py-4">Prix</th>
                    <th className="px-4 lg:px-6 py-4 hidden sm:table-cell">Stock</th>
                    <th className="px-4 lg:px-6 py-4 text-center hidden lg:table-cell">Vedette</th>
                    <th className="px-4 lg:px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5dfd5]">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-surface/50 transition-colors group">
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3 md:gap-4">
                          {product.imageUrl ? (
                            <img 
                              src={getCleanImageUrl(product.imageUrl)} 
                              alt={product.name} 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border border-[#e5dfd5] shrink-0" 
                            />
                          ) : (
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface flex items-center justify-center border border-[#e5dfd5] shrink-0">
                              <span className="text-primary/30 text-[10px] md:text-xs">Img</span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-primary text-sm line-clamp-1">{product.name}</p>
                            {product.description && (
                              <p className="text-xs text-primary/50 mt-0.5 truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">{product.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                        <span className="bg-surface border border-[#e5dfd5] text-primary/80 text-[10px] md:text-xs font-medium px-2 py-1 md:px-3 rounded-full whitespace-nowrap">
                          {product.category?.name || 'Non classé'}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-secondary font-bold whitespace-nowrap">{product.price.toFixed(2)} DH</td>
                      <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap ${
                          product.stock <= 5 
                            ? 'bg-accent/10 text-accent border border-accent/20' 
                            : 'bg-primary/5 text-primary border border-primary/10'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-center hidden lg:table-cell">
                        {product.featured ? (
                          <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308] mx-auto" />
                        ) : (
                          <span className="text-primary/30">—</span>
                        )}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-end gap-2 transition-opacity">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2 text-primary hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          {confirmId === product.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                className="text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                              >
                                {deletingId === product.id ? '...' : 'Confirmer'}
                              </button>
                              <button
                                onClick={() => setConfirmId(null)}
                                className="text-xs text-primary bg-surface hover:bg-[#e5dfd5] border border-[#e5dfd5] px-3 py-1.5 rounded-lg font-medium transition-colors"
                              >
                                Annuler
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmId(product.id)}
                              className="p-2 text-primary/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

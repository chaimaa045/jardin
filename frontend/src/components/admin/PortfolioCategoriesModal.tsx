'use client';
import { useState, useEffect } from 'react';
import { portfolioApi, adminPortfolioApi } from '@/services/api';
import type { PortfolioCategory } from '@/types/portfolio';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PortfolioCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesChange: () => void;
}

export function PortfolioCategoriesModal({ isOpen, onClose, onCategoriesChange }: PortfolioCategoriesModalProps) {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await portfolioApi.getCategories();
      setCategories(data as PortfolioCategory[]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsAdding(true);
    const toastId = toast.loading('Ajout en cours...');
    try {
      await adminPortfolioApi.createCategory({
        name: newCategoryName.trim(),
        slug: generateSlug(newCategoryName.trim())
      });
      toast.success('Catégorie ajoutée', { id: toastId });
      setNewCategoryName('');
      loadCategories();
      onCategoriesChange(); // notify parent
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erreur lors de l\'ajout', { id: toastId });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Es-tu sûr de vouloir supprimer cette catégorie ?')) return;
    
    setDeletingId(id);
    const toastId = toast.loading('Suppression en cours...');
    try {
      await adminPortfolioApi.deleteCategory(id);
      toast.success('Catégorie supprimée', { id: toastId });
      setCategories(prev => prev.filter(c => c.id !== id));
      onCategoriesChange(); // notify parent
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erreur lors de la suppression', { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5dfd5]">
          <h2 className="text-xl font-bold text-primary font-serif">Gérer les catégories</h2>
          <button onClick={onClose} className="p-2 text-primary/50 hover:text-primary hover:bg-surface rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Add form */}
          <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nouvelle catégorie (ex: Jardins)"
              className="flex-1 px-4 py-2 rounded-xl border border-[#e5dfd5] bg-surface focus:bg-white focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isAdding || !newCategoryName.trim()}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-xl transition-all shadow-sm disabled:opacity-50"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            </button>
          </form>

          {/* List */}
          <div className="space-y-2">
            {isLoading ? (
              <div className="flex justify-center py-8 text-secondary">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-center text-primary/50 py-8 text-sm">Aucune catégorie existante</p>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-surface border border-[#e5dfd5] rounded-xl group hover:border-secondary/30 transition-colors">
                  <div>
                    <p className="font-medium text-primary text-sm">{cat.name}</p>
                    <p className="text-xs text-primary/50">{cat.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    disabled={deletingId === cat.id}
                    className="p-2 text-primary/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Supprimer"
                  >
                    {deletingId === cat.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e5dfd5] bg-surface flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-[#e5dfd5] text-primary hover:bg-[#e5dfd5]/50 rounded-xl font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

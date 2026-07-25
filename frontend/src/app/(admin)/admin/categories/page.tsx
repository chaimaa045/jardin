'use client';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { categoryApi } from '@/services/api';
import type { Category } from '@/types/admin';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // States pour la création/édition
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryApi.getAdminAll();
      setCategories(data as Category[]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await categoryApi.update(isEditing, formData);
      } else {
        await categoryApi.create(formData);
      }
      setIsEditing(null);
      setFormData({ name: '', slug: '', description: '' });
      toast.success(isEditing ? 'Catégorie mise à jour avec succès' : 'Catégorie créée avec succès');
      await loadCategories();
    } catch (err) {
      toast.error('Erreur lors de la sauvegarde de la catégorie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (cat: Category) => {
    setIsEditing(cat.id);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || '' });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setFormData({ name: '', slug: '', description: '' });
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await categoryApi.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success('Catégorie supprimée avec succès.');
    } catch (e) {
      toast.error('Impossible de supprimer cette catégorie. Elle est peut-être utilisée par des produits.');
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  // Auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!isEditing) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, name, slug }));
    } else {
      setFormData(prev => ({ ...prev, name }));
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-serif">Catégories</h1>
          <p className="text-primary/60 mt-2">Gérez les catégories de vos produits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire (Création/Édition) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e5dfd5] shadow-sm rounded-2xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-primary font-serif mb-6 flex items-center gap-2">
                {isEditing ? <Edit2 className="w-5 h-5 text-secondary" /> : <Plus className="w-5 h-5 text-secondary" />}
                {isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
              
              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">Nom <span className="text-red-500">*</span></label>
                  <input
                    type="text" required value={formData.name} onChange={handleNameChange}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">Slug (URL) <span className="text-red-500">*</span></label>
                  <input
                    type="text" required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary/70 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">Description</label>
                  <textarea
                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="submit" disabled={isSubmitting}
                    className="flex-1 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    {isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  {isEditing && (
                    <button
                      type="button" onClick={cancelEdit}
                      className="px-4 py-3 bg-white border border-[#e5dfd5] hover:bg-surface text-primary font-semibold rounded-xl transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Liste des catégories */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#e5dfd5] shadow-sm rounded-2xl overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-20 text-primary/60">
                  <Loader2 className="w-8 h-8 animate-spin mr-3 text-secondary" />
                  Chargement…
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-20">
                  <AlertCircle className="w-8 h-8 text-primary/30 mx-auto mb-3" />
                  <p className="text-primary/60">Aucune catégorie existante.</p>
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface text-primary/70 text-xs uppercase font-semibold border-b border-[#e5dfd5]">
                    <tr>
                      <th className="px-6 py-4">Nom & Slug</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5dfd5]">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-surface/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-primary">{cat.name}</p>
                          <p className="text-xs text-primary/50 font-mono mt-1">/{cat.slug}</p>
                        </td>
                        <td className="px-6 py-4 text-primary/70">
                          {cat.description || <span className="italic opacity-50">Aucune description</span>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 transition-opacity">
                            <button
                              onClick={() => startEdit(cat)}
                              className="p-2 text-primary hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {confirmId === cat.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(cat.id)}
                                  disabled={deletingId === cat.id}
                                  className="text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg font-medium"
                                >
                                  {deletingId === cat.id ? '...' : 'Confirmer'}
                                </button>
                                <button
                                  onClick={() => setConfirmId(null)}
                                  className="text-xs text-primary bg-surface hover:bg-[#e5dfd5] border border-[#e5dfd5] px-3 py-1.5 rounded-lg font-medium"
                                >
                                  Annuler
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmId(cat.id)}
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
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

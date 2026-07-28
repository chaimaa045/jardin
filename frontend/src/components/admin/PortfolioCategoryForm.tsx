'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminPortfolioApi } from '@/services/api';
import type { PortfolioCategory, PortfolioCategoryFormData } from '@/types/portfolio';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface PortfolioCategoryFormProps {
  initialData?: PortfolioCategory;
  isEdit?: boolean;
}

export function PortfolioCategoryForm({ initialData, isEdit }: PortfolioCategoryFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<PortfolioCategoryFormData>({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug === generateSlug(prev.name) || prev.slug === '' ? generateSlug(name) : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    setIsSaving(true);
    const toastId = toast.loading(isEdit ? 'Modification en cours...' : 'Création en cours...');

    try {
      if (isEdit && initialData) {
        await adminPortfolioApi.updateCategory(initialData.id, formData);
        toast.success('Catégorie modifiée avec succès', { id: toastId });
      } else {
        await adminPortfolioApi.createCategory(formData);
        toast.success('Catégorie créée avec succès', { id: toastId });
      }
      router.push('/admin/portfolio-categories');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erreur lors de l\'enregistrement', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/portfolio-categories"
            className="p-2 hover:bg-white rounded-xl transition-colors text-primary/60 hover:text-primary"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-primary font-serif">
            {isEdit ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h1>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Enregistrer
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#e5dfd5] shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Nom de la catégorie *</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            className="w-full px-4 py-3 rounded-xl border border-[#e5dfd5] bg-surface focus:bg-white focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            placeholder="Ex: Jardins"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Identifiant URL (Slug) *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e5dfd5] bg-surface focus:bg-white focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            placeholder="Ex: jardins"
            required
          />
          <p className="text-xs text-primary/50 mt-2">Sera utilisé dans l'URL. Lettres minuscules, chiffres et tirets uniquement.</p>
        </div>
      </div>
    </form>
  );
}

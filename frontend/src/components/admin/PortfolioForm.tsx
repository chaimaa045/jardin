'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminPortfolioApi, portfolioApi } from '@/services/api';
import type { PortfolioProject, PortfolioCategory, PortfolioProjectFormData } from '@/types/portfolio';
import { Save, ArrowLeft, Loader2, UploadCloud, X, Settings } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { PortfolioCategoriesModal } from './PortfolioCategoriesModal';

interface PortfolioFormProps {
  initialData?: PortfolioProject;
  isEdit?: boolean;
}

export function PortfolioForm({ initialData, isEdit }: PortfolioFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<PortfolioProjectFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    coverImage: initialData?.coverImage || '',
    gallery: initialData?.gallery || [],
    categoryId: initialData?.category?.id || 0,
  });

  const loadCategories = async () => {
    try {
      const cats = await portfolioApi.getCategories();
      setCategories(cats as PortfolioCategory[]);
      if (!isEdit && cats.length > 0 && formData.categoryId === 0) {
        setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [isEdit]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const toastId = toast.loading('Upload en cours...');
    
    try {
      if (!isGallery) {
        // Upload cover image
        const file = files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataUpload,
        });
        
        if (!res.ok) throw new Error('Erreur lors de l\'upload');
        const data = await res.json();
        
        setFormData(prev => ({ ...prev, coverImage: data.url }));
        toast.success('Image ajoutée', { id: toastId });
      } else {
        // Upload gallery images
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const formDataUpload = new FormData();
          formDataUpload.append('file', file);
          
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formDataUpload,
          });
          
          if (!res.ok) throw new Error('Erreur lors de l\'upload');
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
        
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...uploadedUrls] }));
        toast.success(`${uploadedUrls.length} images ajoutées`, { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error('Échec de l\'upload', { id: toastId });
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.categoryId || !formData.coverImage) {
      toast.error('Veuillez remplir tous les champs obligatoires (Titre, Catégorie, Image principale)');
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading(isEdit ? 'Modification en cours...' : 'Création en cours...');

    try {
      if (isEdit && initialData) {
        await adminPortfolioApi.updateProject(initialData.id, formData);
        toast.success('Projet modifié avec succès', { id: toastId });
      } else {
        await adminPortfolioApi.createProject(formData);
        toast.success('Projet créé avec succès', { id: toastId });
      }
      router.push('/admin/portfolio');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Une erreur est survenue', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/portfolio"
            className="p-2 hover:bg-white rounded-xl transition-colors text-primary/60 hover:text-primary"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary font-serif">
              {isEdit ? 'Modifier le projet' : 'Nouveau projet'}
            </h1>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne Principale */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-[#e5dfd5] shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-primary font-serif">Informations générales</h2>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Titre du projet *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5dfd5] bg-surface focus:bg-white focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                placeholder="Ex: Aménagement Villa Marina"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5dfd5] bg-surface focus:bg-white focus:ring-2 focus:ring-secondary/50 outline-none transition-all min-h-[150px]"
                placeholder="Description du projet..."
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e5dfd5] shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-primary font-serif">Galerie d'images</h2>
            <div className="flex items-center gap-4 mb-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-secondary/10 text-secondary border border-secondary/20 rounded-lg transition-colors text-sm font-medium">
                <UploadCloud className="w-4 h-4" />
                Ajouter des images
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, true)} />
              </label>
            </div>
            
            {formData.gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.gallery.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#e5dfd5] aspect-square">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-primary/40 border-2 border-dashed border-[#e5dfd5] rounded-xl">
                Aucune image dans la galerie
              </div>
            )}
          </div>
        </div>

        {/* Colonne Latérale */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-[#e5dfd5] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary font-serif">Catégorie *</h2>
              <button
                type="button"
                onClick={() => setIsCategoriesModalOpen(true)}
                className="text-xs flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium px-2 py-1 bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-colors"
              >
                <Settings className="w-3 h-3" />
                Gérer
              </button>
            </div>
            <div>
              {categories.length === 0 ? (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  Aucune catégorie n'existe. Veuillez en créer une en cliquant sur "Gérer".
                </div>
              ) : (
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5dfd5] bg-surface focus:bg-white focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                  required
                >
                  <option value={0} disabled>Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e5dfd5] shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-primary font-serif">Image Principale *</h2>
            <div className="space-y-4">
              {formData.coverImage ? (
                <div className="relative rounded-xl overflow-hidden border border-[#e5dfd5] aspect-video group">
                  <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white font-medium flex items-center gap-2">
                      <UploadCloud className="w-5 h-5" />
                      Changer
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-[#e5dfd5] rounded-xl bg-surface hover:bg-[#e5dfd5]/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-primary">Ajouter une image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
                </label>
              )}
            </div>
          </div>
        </div>
      </form>

      <PortfolioCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        onCategoriesChange={loadCategories}
      />
    </>
  );
}

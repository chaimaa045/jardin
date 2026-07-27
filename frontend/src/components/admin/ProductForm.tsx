'use client';
import { useEffect, useState, useRef } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { adminProductApi, categoryApi, uploadApi } from '@/services/api';
import type { AdminProduct, ProductFormData, Category } from '@/types/admin';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UploadCloud, CheckCircle, AlertCircle, Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ProductFormPageProps {
  productId?: number;
}

function ProductFormContent({ productId }: ProductFormPageProps) {
  const router = useRouter();
  const isEditing = productId !== undefined;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProductFormData>({
    name: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    categoryId: '',
    description: '',
    featured: false,
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const cats = await categoryApi.getAdminAll() as Category[];
        setCategories(cats);
        
        if (isEditing) {
          const data = await adminProductApi.getById(productId) as AdminProduct;
          setForm({
            name: data.name,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl || '',
            categoryId: data.category?.id || '',
            description: data.description || '',
            featured: data.featured,
          });
        } else if (cats.length > 0) {
          setForm(prev => ({ ...prev, categoryId: cats[0].id }));
        }
      } catch {
        setError('Impossible de charger les données.');
      } finally {
        setIsFetching(false);
      }
    };
    init();
  }, [isEditing, productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    try {
      const response = await uploadApi.uploadFile(file);
      // L'API renvoie { url: "/uploads/xyz.jpg" }, on l'ajoute au chemin absolu si besoin,
      // ou on utilise juste le chemin relatif car le backend le sert sur /uploads/
      const fileUrl = response.url.startsWith('http') 
        ? response.url 
        : (process.env.NEXT_PUBLIC_API_URL 
            ? `${process.env.NEXT_PUBLIC_API_URL}${response.url}`
            : `http://localhost:8080${response.url}`);
        
      setForm(prev => ({ ...prev, imageUrl: fileUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload de l'image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      setError('Veuillez sélectionner une catégorie.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await adminProductApi.update(productId, form);
      } else {
        await adminProductApi.create(form);
      }
      setSuccess(true);
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20 text-primary/60">
        <Loader2 className="w-8 h-8 animate-spin mr-3" />
        Chargement…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5" />
          {isEditing ? 'Produit mis à jour avec succès !' : 'Produit créé avec succès !'} Redirection…
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colonne 1 : Infos de base */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Nom du produit <span className="text-red-500">*</span>
            </label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              placeholder="Ex: Ficus Benjamina"
              className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3
                         placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Prix (DH) <span className="text-red-500">*</span>
              </label>
              <input
                name="price" type="number" value={form.price} onChange={handleChange}
                required min={0} step={0.01}
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                name="stock" type="number" value={form.stock} onChange={handleChange}
                required min={0}
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Catégorie <span className="text-red-500">*</span>
            </label>
            {categories.length === 0 ? (
              <div className="text-sm text-accent bg-accent/10 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Veuillez d'abord créer une catégorie.
              </div>
            ) : (
              <select
                name="categoryId" value={form.categoryId} onChange={handleChange} required
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
              >
                <option value="" disabled>Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="flex items-center gap-3 bg-surface border border-[#e5dfd5] rounded-xl px-4 py-3">
            <input
              id="featured" name="featured" type="checkbox"
              checked={form.featured} onChange={handleChange}
              className="w-5 h-5 accent-secondary rounded"
            />
            <label htmlFor="featured" className="text-sm text-primary font-medium cursor-pointer">
              Mettre ce produit en vedette (Accueil)
            </label>
          </div>
        </div>

        {/* Colonne 2 : Image & Description */}
        <div className="space-y-6">
          {/* Upload Image */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Photo du produit
            </label>
            
            <div className="bg-surface border-2 border-dashed border-[#e5dfd5] rounded-2xl p-6 text-center hover:border-secondary/50 transition-colors">
              {form.imageUrl ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 group">
                  {/* Utilisation de img standard pour éviter les problèmes de host Next.js avec des URLs dynamiques */}
                  <img src={form.imageUrl} alt="Aperçu" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                    >
                      <UploadCloud className="w-4 h-4" /> Changer l'image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ImageIcon className="w-8 h-8 text-primary/30" />
                  </div>
                  <p className="text-sm text-primary/60">Aucune image sélectionnée</p>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-secondary text-white px-5 py-2 rounded-xl text-sm font-medium mt-2 hover:bg-secondary/90 transition-colors flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" /> Parcourir...
                  </button>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              
              {isUploading && (
                <p className="text-sm text-secondary mt-3 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...
                </p>
              )}
            </div>
            
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              rows={4} placeholder="Décrivez le produit, ses besoins en eau, lumière…"
              className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3
                         placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-[#e5dfd5]">
        <button
          type="submit" disabled={isLoading || isUploading || categories.length === 0}
          className="flex-1 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white
                     font-semibold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
          {isLoading ? 'Sauvegarde…' : isEditing ? 'Enregistrer les modifications' : 'Créer le produit'}
        </button>
        <Link
          href="/admin/products"
          className="px-8 py-4 bg-white border border-[#e5dfd5] hover:bg-surface text-primary font-semibold
                     rounded-xl transition-colors duration-200 text-center"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}

export function NewProductPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <Link href="/admin/products" className="text-primary/50 hover:text-primary font-medium text-sm flex items-center gap-2 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au catalogue
          </Link>
          <h1 className="text-3xl font-bold text-primary font-serif">Nouveau produit</h1>
          <p className="text-primary/60 mt-1">Ajoutez un nouvel article à votre boutique</p>
        </div>
        <div className="bg-white border border-[#e5dfd5] shadow-sm rounded-2xl p-8">
          <ProductFormContent />
        </div>
      </main>
    </div>
  );
}

export function EditProductPage({ id }: { id: number }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <Link href="/admin/products" className="text-primary/50 hover:text-primary font-medium text-sm flex items-center gap-2 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au catalogue
          </Link>
          <h1 className="text-3xl font-bold text-primary font-serif">Modifier le produit</h1>
        </div>
        <div className="bg-white border border-[#e5dfd5] shadow-sm rounded-2xl p-8">
          <ProductFormContent productId={id} />
        </div>
      </main>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { publicApi } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/shop';
import { ArrowLeft, ShoppingBag, Leaf, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { cart, addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const data = await publicApi.getProductById(Number(id)) as Product;
        setProduct(data);
      } catch (err) {
        setError('Produit introuvable.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <Leaf className="w-12 h-12 text-secondary/30 mb-4 animate-bounce" />
          <div className="text-xl text-primary/40 font-serif">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary mb-4 font-serif">Produit introuvable</h1>
        <p className="text-primary/60 mb-8">Ce produit n'existe pas ou n'est plus disponible.</p>
        <Link href="/shop" className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!cart.some(item => item.id === product.id)) {
      addToCart(product, quantity);
    }
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl">
      <Link href="/shop" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-medium mb-8 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Colonne Image */}
        <div className="bg-white border border-[#e5dfd5] rounded-3xl p-6 lg:p-8 shadow-sm flex items-center justify-center aspect-square lg:aspect-[4/3] max-h-[500px] relative group overflow-hidden">
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl.startsWith('http') || product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl}`} 
              alt={product.name} 
              fill 
              className="object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
              priority
            />
          ) : (
            <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-700">🪴</div>
          )}
        </div>

        {/* Colonne Infos */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="bg-surface border border-[#e5dfd5] text-primary/80 text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              {product.category?.name || 'Général'}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-primary font-serif mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="text-2xl font-bold text-secondary mb-6">
            {product.price.toFixed(2)} DH
          </div>

          <div className="prose prose-base prose-p:text-primary/70 mb-8">
            <h3 className="text-lg font-bold text-primary mb-3">Description</h3>
            <p className="leading-relaxed whitespace-pre-wrap">
              {product.description || 'Aucune description disponible pour ce produit. Il s\'agit d\'une magnifique plante de qualité sélectionnée par nos paysagistes experts.'}
            </p>
          </div>

          <div className="bg-surface border border-[#e5dfd5] rounded-2xl p-5 mb-8 flex gap-4 text-primary/80">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider mb-1 font-bold opacity-60">Disponibilité</p>
              <p className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
                {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
              </p>
            </div>
            <div className="w-px bg-[#e5dfd5]"></div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider mb-1 font-bold opacity-60">Livraison</p>
              <p className="font-semibold">Rapide à domicile</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Sélecteur de quantité */}
            <div className="flex items-center justify-between border-2 border-[#e5dfd5] rounded-2xl p-2 w-full sm:w-auto min-w-[120px] bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-primary font-bold hover:bg-[#e5dfd5] transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="font-bold text-lg text-primary w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-primary font-bold hover:bg-[#e5dfd5] transition-colors disabled:opacity-50"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdded || product.stock === 0}
              className={`flex-1 w-full py-4 px-6 rounded-2xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                isAdded 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                  : 'bg-white border-[#e5dfd5] text-primary hover:border-secondary hover:text-secondary shadow-sm hover:shadow-md'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAdded ? (
                <><CheckCircle2 className="w-5 h-5" /> Ajouté !</>
              ) : (
                <><ShoppingBag className="w-5 h-5" /> Ajouter</>
              )}
            </button>
            <button 
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 w-full bg-secondary text-white py-4 px-6 rounded-2xl font-bold hover:bg-secondary/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Acheter maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/shop';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Helper pour corriger les URLs doublement préfixées par erreur (ex: http://localhost:8080https://...)
  const getCleanImageUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.includes('http') && url.lastIndexOf('http') > 0) {
      return url.substring(url.lastIndexOf('http'));
    }
    return url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
  };

  const handleAddToCart = () => {
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (!isAlreadyInCart) {
      addToCart(product);
      toast.success(`${product.name} ajouté au panier !`, {
        duration: 3000,
        position: 'bottom-center',
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="border border-[#e5dfd5] rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full group">
      <Link href={`/shop/${product.id}`} className="block relative h-56 w-full mb-4 rounded-2xl overflow-hidden bg-surface flex items-center justify-center p-4 group-hover:bg-[#efece5] transition-colors">
        {product.imageUrl ? (
          <Image 
            src={getCleanImageUrl(product.imageUrl)} 
            alt={product.name} 
            fill 
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30 group-hover:scale-110 transition-transform duration-500">🪴</div>
        )}
      </Link>
      
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-primary/50 text-[10px] font-bold uppercase tracking-wider">
            {product.category?.name || 'Général'}
          </span>
        </div>
        
        <Link href={`/shop/${product.id}`}>
          <h2 className="text-lg font-bold text-primary font-serif group-hover:text-accent transition-colors line-clamp-1 mb-1">
            {product.name}
          </h2>
        </Link>
        
        {product.description && (
          <p className="text-xs text-primary/60 mb-3 line-clamp-2 flex-grow">{product.description}</p>
        )}
        
        <div className="mt-auto pt-3 border-t border-[#e5dfd5]/50 flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-secondary">{product.price.toFixed(2)} DH</p>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdded || product.stock === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isAdded 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Ajouter au panier"
          >
            {isAdded ? <CheckCircle2 className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
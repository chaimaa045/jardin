"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/shop';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart } = useCart();
  const router = useRouter();

  const handleBuy = () => {
    // Si le produit n'est pas déjà dans le panier, on l'ajoute
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (!isAlreadyInCart) {
      addToCart(product);
    }
    router.push('/checkout');
  };

  return (
    <div className="border border-[#e5dfd5] rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full group">
      <Link href={`/shop/${product.id}`} className="block relative h-80 w-full mb-4 rounded-2xl overflow-hidden bg-surface flex items-center justify-center p-2 group-hover:bg-[#efece5] transition-colors">
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl.startsWith('http') || product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl}`} 
            alt={product.name} 
            fill 
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">🪴</div>
        )}
      </Link>
      
      <div className="flex justify-between items-start mb-2">
        <Link href={`/shop/${product.id}`}>
          <h2 className="text-xl font-bold text-primary font-serif group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h2>
        </Link>
        <span className="bg-surface border border-[#e5dfd5] text-primary/80 text-xs font-semibold px-3 py-1 rounded-full">
          {product.category?.name || 'Général'}
        </span>
      </div>
      
      {product.description && (
        <p className="text-sm text-primary/60 mb-4 line-clamp-2 flex-grow">{product.description}</p>
      )}
      
      <div className="mt-auto pt-4 border-t border-[#e5dfd5]">
        <p className="text-2xl font-bold text-secondary mb-4">{product.price.toFixed(2)} DH</p>
        
        <button 
          onClick={handleBuy}
          className="w-full bg-surface text-primary border border-[#e5dfd5] py-3 rounded-xl font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          Acheter maintenant
        </button>
      </div>
    </div>
  );
}
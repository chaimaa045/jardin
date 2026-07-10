"use client";
import Image from 'next/image';
import { Product } from '@/types/shop';
import { useCart } from '@/hooks/useCart'; // Ou le chemin vers votre CartContext

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow bg-white">
      <div className="relative h-56 w-full mb-4 rounded-lg overflow-hidden bg-gray-50 border">
        {/* Remplacer par l'image réelle si disponible */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🪴</div>
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          {product.category}
        </span>
      </div>
      
      <p className="text-2xl font-extrabold text-green-600 mb-4">{product.price} DH</p>
      
      <button 
        onClick={() => addToCart(product)}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
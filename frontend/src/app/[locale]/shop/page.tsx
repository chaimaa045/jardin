"use client";
import React, { useState, useEffect } from 'react';
import { Product } from '@/types/shop';
import ProductCard from '@/components/shop/ProductCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MotionStaggerGrid } from '@/components/layout/EditorialLayout';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");

  // 1. Récupération des données depuis Spring Boot
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Assurez-vous que l'URL de l'API est correctement configurée dans vos variables d'environnement
        const res = await fetch(`http://localhost:8080/api/products`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur de chargement des produits:", error);
      }
    };
    fetchProducts();
  }, []);

  // 2. Extraction des catégories uniques pour générer les boutons
  const categories = ["Toutes", ...Array.from(new Set(products.map(p => p.category)))];

  // 3. Application du filtre
  const filteredProducts = activeCategory === "Toutes"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <SectionTitle 
        title="Notre Boutique" 
        subtitle="Catalogue"
        description="Découvrez notre sélection de plantes, outils et accessoires pour sublimer votre jardin."
        centered 
      />
      
      {/* Menu des filtres */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 ${
              activeCategory === category
                ? "bg-primary text-white shadow-md"
                // ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grille des produits filtrés */}
      <MotionStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MotionStaggerGrid>
    </div>
  );
}

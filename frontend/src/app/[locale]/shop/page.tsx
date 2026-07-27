"use client";
import React, { useState, useEffect } from 'react';
import { Product, Category } from '@/types/shop';
import ProductCard from '@/components/shop/ProductCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MotionStaggerGrid } from '@/components/layout/EditorialLayout';
import { publicApi, categoryApi } from '@/services/api';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Récupération des données depuis Spring Boot
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          publicApi.getProducts(),
          categoryApi.getAll()
        ]);
        setProducts(productsData as Product[]);
        setCategories(categoriesData as Category[]);
      } catch (error) {
        console.error("Erreur de chargement de la boutique:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. Application du filtre
  const filteredProducts = activeCategoryId === 'ALL'
    ? products
    : products.filter(p => p.category?.id === activeCategoryId);

  return (
    <div className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <SectionTitle
        title="Notre Boutique"
        subtitle=""
        description="Découvrez notre sélection de plantes, outils et accessoires pour sublimer votre jardin."
        centered
        variant="light"
      />

      {/* Menu des filtres */}
      {!isLoading && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategoryId('ALL')}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none ${activeCategoryId === 'ALL'
              ? "bg-secondary text-white shadow-md shadow-secondary/20 border border-secondary"
              : "bg-white text-primary hover:bg-surface border border-[#e5dfd5]"
              }`}
          >
            Toutes les catégories
          </button>

          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none ${activeCategoryId === category.id
                ? "bg-secondary text-white shadow-md shadow-secondary/20 border border-secondary"
                : "bg-white text-primary hover:bg-surface border border-[#e5dfd5]"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Chargement */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#e5dfd5] rounded-3xl max-w-2xl mx-auto shadow-sm">
          <p className="text-primary/60 text-lg">Aucun produit disponible dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        /* Grille des produits filtrés */
        <MotionStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </MotionStaggerGrid>
      )}
    </div>
  );
}

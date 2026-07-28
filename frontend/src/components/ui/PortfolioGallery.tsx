"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioApi } from '@/services/api';
import type { PortfolioProject, PortfolioCategory } from '@/types/portfolio';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Lightbox } from '@/components/ui/Lightbox';
import { Loader2 } from 'lucide-react';

export function PortfolioGallery() {
  const t = useTranslations();

  const [portfolioCategories, setPortfolioCategories] = useState<PortfolioCategory[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioProject[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, items] = await Promise.all([
          portfolioApi.getCategories(),
          portfolioApi.getProjects()
        ]);
        setPortfolioCategories(cats as PortfolioCategory[]);
        setPortfolioItems(items as PortfolioProject[]);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category?.id === activeCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center pb-4 mb-8 md:mb-12 gap-2 md:gap-3">
        <Button
          variant={activeCategory === 'all' ? "default" : "outline"}
          onClick={() => setActiveCategory('all')}
          className="rounded-full text-xs sm:text-sm px-4 md:px-6 whitespace-nowrap"
          size="sm"
        >
          {t('Portfolio.categories.all')}
        </Button>
        {portfolioCategories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.id)}
            className="rounded-full text-xs sm:text-sm px-4 md:px-6 whitespace-nowrap"
            size="sm"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* On passe le clic à la carte */}
              <ProjectCard 
                project={item as any} 
                onClick={() => setSelectedProject(item)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Intégration de la Lightbox */}
      <Lightbox 
        project={selectedProject as any} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
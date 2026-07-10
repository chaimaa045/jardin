"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolioCategories, getPortfolioItems } from '@/data/gallerie';
import { useTranslations } from 'next-intl';
import { CategoryId, PortfolioItem } from '@/data/gallerie';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Lightbox } from '@/components/ui/Lightbox'; 

export function PortfolioGallery() {
  const t = useTranslations();

  const portfolioCategories = getPortfolioCategories(t);
  const portfolioItems = getPortfolioItems(t);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.categoryId === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center pb-4 mb-8 md:mb-12 gap-2 md:gap-3">
        {portfolioCategories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.id)}
            className="rounded-full text-xs sm:text-sm px-4 md:px-6 whitespace-nowrap"
            size="sm"
          >
            {cat.label}
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
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
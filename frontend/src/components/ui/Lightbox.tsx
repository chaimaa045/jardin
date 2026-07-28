"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioProject } from "@/types/portfolio";

interface LightboxProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export function Lightbox({ project, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Remet l'index à 0 à chaque fois qu'un nouveau projet est ouvert
  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  // Bloque le scroll du site quand la lightbox est ouverte
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // NOUVEAU : Écouteur d'événements pour le clavier
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const imgCount = (project.gallery?.length > 0 ? project.gallery : (project.coverImage ? [project.coverImage] : [])).length;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && imgCount > 1) {
        setCurrentIndex((prev) => (prev === imgCount - 1 ? 0 : prev + 1));
      } else if (e.key === "ArrowLeft" && imgCount > 1) {
        setCurrentIndex((prev) => (prev === 0 ? imgCount - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Nettoyage de l'écouteur quand la lightbox se ferme
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const images = project.gallery?.length > 0 ? project.gallery : (project.coverImage ? [project.coverImage] : []);
  
  if (images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la fermeture au clic
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
      >
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Contenu principal */}
        <div 
          className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/9]"
          onClick={(e) => e.stopPropagation()} // Clic sur l'image ne ferme pas la lightbox
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }} // Échelle réduite pour un effet plus sec
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeOut" }} // MODIFIÉ : Durée plus courte (0.12s au lieu de 0.2s)
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`${project.title} - Photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Contrôles (Flèches) - Uniquement s'il y a plus d'une image */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Légende en bas */}
          <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 text-center text-white">
            <h3 className="text-xl font-serif font-bold">{project.title}</h3>
            <p className="text-white/60 text-sm mt-1">
              Photo {currentIndex + 1} sur {images.length}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
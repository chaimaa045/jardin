"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { TestimonialCard } from "../ui/TestimonialCard";
import { getTestimonialsData } from "@/data/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const testimonialsData = getTestimonialsData(t);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Initialisation de la traduction

  const scroll = (direction: "left" | "right") => {
  if (scrollRef.current) {
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    const isRtl = document.dir === 'rtl';
    
    // Si RTL, on inverse la logique de défilement
    const modifier = isRtl ? -1 : 1;
    const scrollAmount = (clientWidth - 24) * modifier;
    
    const scrollTo = direction === "left" 
      ? scrollLeft - scrollAmount 
      : scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  }
};
  return (
    <section className="py-16 md:py-20 bg-primary/5 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            description={t("description")}
            variant="mixed"
          />
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
              aria-label={t("prev")}
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
              aria-label={t("next")}
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative -mx-4 md:mx-0 px-4 md:px-0"
        >
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Si `testimonialsData` contient aussi du texte à traduire, n'oublie pas de gérer sa traduction dans le fichier des données ou via la carte */}
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="min-w-[300px] md:min-w-[400px] snap-center">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
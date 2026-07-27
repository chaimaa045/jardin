"use client";

import { Leaf, Droplets, Box, Sun, Sprout, Wrench, Hammer, Scissors, Store } from 'lucide-react';
import { SectionTitle } from "../ui/SectionTitle";
import { MotionSection, MotionStaggerGrid } from '@/components/layout/EditorialLayout';
import { useTranslations } from "next-intl";

export function ServicesSection() {
  const t = useTranslations("Services");
  
  const icons = [Leaf, Droplets, Box, Sun, Sprout, Wrench, Hammer, Scissors, Store];

  return (
    <MotionSection className="py-32" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          description={t("desc")}
          centered
          variant="mixed"
        />

        <MotionStaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {icons.map((Icon, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-350 transform-gpu hover:-translate-y-[4px] hover:shadow-xl border border-transparent hover:border-secondary/20 flex flex-col h-full overflow-hidden">
              <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
                <Icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-serif text-primary font-bold mb-3 group-hover:text-secondary transition-colors">
  {t(`list.${index}.title`)} {/* Remplacez 'items' par 'list' */}
</h3>

<p className="text-zinc-600 mb-6 flex-grow leading-relaxed">
  {t(`list.${index}.desc`)} {/* Remplacez 'items' par 'list' */}
</p>
            </div>
          ))}
        </MotionStaggerGrid>
      </div>
    </MotionSection>
  );
}
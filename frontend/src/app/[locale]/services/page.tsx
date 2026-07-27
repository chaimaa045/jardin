import { Metadata } from 'next';
import { clientProfile } from '@/data/profile';
import { Leaf, Droplets, Box, Sun, Sprout, Wrench, Hammer, Scissors, Store } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// 1. Métadonnées dynamiques (Next.js 15 + next-intl)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });
  
  return {
    title: `${t('metadata.title')} | ${clientProfile.company.businessName || 'Jardin Souss'}`,
    description: `${t('metadata.desc')} ${clientProfile.company.businessName} à ${clientProfile.company.city}.`,
  };
}

export default function ServicesPage() {
  const t = useTranslations('Services');

  // 2. On garde uniquement les composants d'icônes dans un tableau simple
  const serviceIcons = [
    Leaf,       // 0
    Droplets,   // 1
    Box,        // 2
    Sun,        // 3
    Sprout,     // 4
    Wrench,     // 5
    Hammer,     // 6
    Scissors,   // 7
    Store       // 8
  ];

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white drop-shadow-lg mb-4 md:mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md font-medium leading-relaxed">
              {t('hero.desc')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* 3. On boucle sur le tableau d'icônes et on utilise l'index pour la traduction */}
            {serviceIcons.map((Icon, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-350 transform-gpu hover:-translate-y-[4px] hover:shadow-xl border border-transparent hover:border-secondary/20 flex flex-col h-full overflow-hidden"
              >
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-serif text-primary font-bold mb-3 group-hover:text-secondary transition-colors">
                  {t(`list.${index}.title`)}
                </h3>
                
                <p className="text-zinc-600 flex-grow leading-relaxed text-sm">
                  {t(`list.${index}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
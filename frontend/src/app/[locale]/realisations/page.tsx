import { Metadata } from 'next';
import { clientProfile } from '@/data/profile';
import { PortfolioGallery } from '@/components/ui/PortfolioGallery';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale }); // <-- Retire le namespace ici
  
  return {
    title: `${t('Portfolio.metadata.title')} | ${clientProfile.company.businessName || 'Jardin Souss'}`,
    description: t('Portfolio.metadata.desc'),
  };
}

export default function RealisationsPage() {
  const t = useTranslations(); // <-- Retire le namespace ici

  return (
    <>
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 md:mb-6">
            {/* Ajoute Portfolio. devant */}
            {t('Portfolio.hero.title')}
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto px-2">
             {/* Ajoute Portfolio. devant */}
            {t('Portfolio.hero.desc')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <PortfolioGallery />
        </div>
      </section>
    </>
  );
}
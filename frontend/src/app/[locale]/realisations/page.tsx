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
  const t = useTranslations('Portfolio');

  return (
    <>
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center relative z-10">
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

      <section className="py-16 md:py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <PortfolioGallery />
        </div>
      </section>
    </>
  );
}
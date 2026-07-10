import React from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Métadonnées dynamiques (Next.js 15 + next-intl)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  
  return {
    title: `${t('metadata.title')} | Souss Garden`,
    description: t('metadata.desc'),
  };
}

export default function PolitiqueConfidentialitePage() {
  const t = useTranslations('Privacy');
  const boldText = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

  return (
    <>
      <section className="pt-28 md:pt-32 pb-8 md:pb-12 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 md:mb-6">
            {t('hero.title')}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-neutral-700 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
            
            <p className="text-lg mb-8 italic text-neutral-500">
              {t.rich('intro', { bold: boldText })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">
              {t('section1.title')}
            </h2>
            <p className="mb-6">
              {t('section1.desc')}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">
              {t('section2.title')}
            </h2>
            <p className="mb-6">
              {t('section2.desc')}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">
              {t('section3.title')}
            </h2>
            <p className="mb-6">
              {t('section3.desc')}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">
              {t('section4.title')}
            </h2>
            <p className="mb-6">
              {t('section4.desc')}
            </p>
            
          </div>
        </div>
      </section>
    </>
  );
}
import React from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Métadonnées dynamiques (Next.js 15 + next-intl)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });
  
  return {
    title: `${t('metadata.title')} | Souss Garden`,
    description: t('metadata.desc'),
  };
}

export default function MentionsLegalesPage() {
  const t = useTranslations('Legal');
  const boldText = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

  return (
    <>
      <section className="pt-28 md:pt-32 pb-8 md:pb-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white drop-shadow-lg mb-4 md:mb-6">
              {t('hero.title')}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-neutral-700 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
            
            <h2 className="text-2xl font-serif font-bold text-primary mt-4 mb-4">{t('section1.title')}</h2>
            <p className="mb-2"><strong>{t('section1.raison')}</strong> FLORA DECOR (FIKRI S.A.R.L)</p>
            <p className="mb-2"><strong>{t('section1.siege')}</strong> JNANE ELHAJRAT, BOUTARIALT TAROUDANT</p>
            <p className="mb-2">
              <strong>{t('section1.tel')}</strong> <span dir="ltr">0528850723</span>
            </p>
            <p className="mb-2">
              <strong>{t('section1.gsm')}</strong> <span dir="ltr">0661843714</span>
            </p>
            
            <ul className="mb-6 list-disc list-inside space-y-1 mt-4 text-neutral-600">
              <li><strong>ICE :</strong> <span dir="ltr">000091807000046</span></li>
              <li><strong>R.C :</strong> <span dir="ltr">703</span></li>
              <li><strong>Patente (PAT) :</strong> <span dir="ltr">49459510</span></li>
              <li><strong>T.V.A :</strong> <span dir="ltr">40271798</span></li>
              <li><strong>CNSS :</strong> <span dir="ltr">6643812</span></li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">{t('section2.title')}</h2>
            <p className="mb-6">{t.rich('section2.desc', { bold: boldText })}</p>

            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">{t('section3.title')}</h2>
            <p className="mb-6">{t('section3.desc')}</p>
            
          </div>
        </div>
      </section>
    </>
  );
}
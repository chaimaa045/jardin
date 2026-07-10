import { Metadata } from 'next';
import Image from 'next/image';
import { Leaf, Award, Sun, MapPin, Lightbulb } from 'lucide-react';
import { clientProfile } from '@/data/profile';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// 1. Métadonnées dynamiques (Next.js 15 + next-intl)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  
  return {
    title: `${t('hero.title')} | ${clientProfile.company.businessName || 'Jardin Souss'}`,
    description: `Découvrez l'histoire de ${clientProfile.personal.name}, ${clientProfile.personal.title} à ${clientProfile.company.city}.`,
  };
}

export default function AboutPage() {
  // 2. Initialisation du traducteur pour cette page
  const t = useTranslations('About');

  // Composant utilitaire pour le texte en gras dans les JSON
  const boldText = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

  return (
    <>
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 md:mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto px-2">
                  {t('hero.shortBio')}          
            </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-dark">
               <div className="absolute inset-0 bg-primary/20"></div>
              <Image
                src="/images/hero/abd.png"
                alt={`${clientProfile.personal.name} - ${clientProfile.personal.title}`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 md:mb-6">
                {t('whoAmI.title')}
              </h2>
              <div className="text-muted space-y-4 leading-relaxed text-sm md:text-base">
                <p>{t.rich('whoAmI.p1', { bold: boldText })}</p>
                <p>{t.rich('whoAmI.p2', { bold: boldText })}</p>
                <p>{t.rich('whoAmI.p3', { bold: boldText })}</p>
                <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
                  {t.rich('whoAmI.p4', { bold: boldText })}
                </p>
              </div>
            </div>
          </div>

          {/* Activités et Missions */}
          <div className="mb-20 md:mb-24">
             <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
               <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 md:mb-6">
                 {t('activities.title')}
               </h2>
               <p className="text-muted text-base md:text-lg leading-relaxed px-2">
                 {t('activities.subtitle')}
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Activités Principales */}
                <div className="bg-surface-raised p-6 md:p-8 rounded-2xl shadow-card border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">{t('activities.main.title')}</h3>
                  <ul className="space-y-3 text-muted text-sm md:text-base">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <li key={`main-${i}`} className="flex items-start gap-2">
                        <span className="text-secondary mt-1 shrink-0">•</span> 
                        <span>{t(`activities.main.items.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Activité Secondaire */}
                <div className="bg-surface-raised p-6 md:p-8 rounded-2xl shadow-card border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">{t('activities.secondary.title')}</h3>
                  <p className="text-muted text-sm md:text-base mb-4">
                    {t.rich('activities.secondary.desc', { bold: boldText })}
                  </p>
                  <ul className="space-y-3 text-muted text-sm md:text-base">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <li key={`sec-${i}`} className="flex items-start gap-2">
                        <span className="text-secondary mt-1 shrink-0">•</span> 
                        <span>{t(`activities.secondary.items.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missions Principales */}
                <div className="bg-surface-raised p-6 md:p-8 rounded-2xl shadow-card border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">{t('activities.missions.title')}</h3>
                  <p className="text-muted text-sm md:text-base mb-4">
                    {t('activities.missions.desc')}
                  </p>
                  <ul className="space-y-3 text-muted text-sm md:text-base">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <li key={`miss-${i}`} className="flex items-start gap-2">
                        <span className="text-secondary mt-1 shrink-0">•</span> 
                        <span>{t(`activities.missions.items.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </div>

          <div className="mb-20 md:mb-24">
             <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
               <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 md:mb-6">{t('qualities.title')}</h2>
               <p className="text-muted text-base md:text-lg leading-relaxed px-2">
                 {t('qualities.desc')}
               </p>
             </div>
          </div>

          <div className="bg-surface-raised rounded-3xl p-8 md:p-10 lg:p-16 shadow-dark relative overflow-hidden border border-border">
             <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 md:mb-6">{t('skills.title')}</h2>
                <p className="text-muted text-base md:text-lg leading-relaxed px-2">
                  {t('skills.subtitle')}
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-transparent hover:border-secondary/20 hover:shadow-md transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                      <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{t('skills.items.plants.title')}</h3>
                    <p className="text-muted text-sm leading-relaxed">{t('skills.items.plants.desc')}</p>
                  </div>
                  
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-transparent hover:border-secondary/20 hover:shadow-md transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                      <Sun className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{t('skills.items.methods.title')}</h3>
                    <p className="text-muted text-sm leading-relaxed">{t('skills.items.methods.desc')}</p>
                  </div>
                  
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-transparent hover:border-secondary/20 hover:shadow-md transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{t('skills.items.adaptation.title')}</h3>
                    <p className="text-muted text-sm leading-relaxed">{t('skills.items.adaptation.desc')}</p>
                  </div>
                  
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-transparent hover:border-secondary/20 hover:shadow-md transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                      <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{t('skills.items.initiative.title')}</h3>
                    <p className="text-muted text-sm leading-relaxed">{t('skills.items.initiative.desc')}</p>
                  </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
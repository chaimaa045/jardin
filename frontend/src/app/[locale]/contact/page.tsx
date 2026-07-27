import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { clientProfile } from '@/data/profile';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  
  return {
    title: `Contact | ${clientProfile.company.businessName || 'Jardin Souss'}`,
    description: `Contactez ${clientProfile.company.businessName} à ${clientProfile.company.city} pour un devis gratuit.`,
  };
}

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg mb-6">{t('hero.title')}</h1>
            <p className="text-lg text-white/90 drop-shadow-md font-medium max-w-2xl mx-auto">
              {t('hero.desc')}
            </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <div className="space-y-10">
              <ContactInfo />
              <div className="h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative shadow-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109282.88771146313!2d-8.966952824795324!3d30.468233777265215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdbb075e818b82e1%3A0x6bba8d234a9b69b5!2sTaroudant!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">{t('form.title')}</h3>
              <p className="text-zinc-600 mb-8">{t('form.desc')}</p>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
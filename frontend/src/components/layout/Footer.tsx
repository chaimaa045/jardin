import Link from "next/link";
import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { clientProfile } from '@/data/profile';
import { useTranslations } from 'next-intl';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');

  return (
    <footer className="bg-accent text-white pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="bg-white text-primary p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none tracking-tight text-white">FLORA DECOR</span>
                <span className="text-white/90 text-sm font-medium leading-none tracking-widest uppercase mt-1">FIKRI S.A.R.L</span>
              </div>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6 text-white">{t('quickLinksTitle')}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">{t('quickLinks.home')}</Link>
              </li>
              <li>
                <Link href="/shop" className="text-white/80 hover:text-white transition-colors">{t('quickLinks.shop')}</Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors">{t('quickLinks.services')}</Link>
              </li>
              <li>
                <Link href="/realisations" className="text-white/80 hover:text-white transition-colors">{t('quickLinks.portfolio')}</Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-white/80 hover:text-white transition-colors">{t('quickLinks.about')}</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">{t('quickLinks.contact')}</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6 text-white">{t('servicesTitle')}</h3>
            <ul className="space-y-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <li key={index} className="text-white/80">
                  {t(`servicesList.${index}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6 text-white">{t('contactTitle')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-white/90 shrink-0 mt-0.5" />
                <span>
                  {clientProfile?.company?.address ? (
                    <>
                      {clientProfile.company.address}<br />
                      {clientProfile.company.postalCode ? `${clientProfile.company.postalCode} — ` : ''}{clientProfile.company.region || clientProfile.company.city}
                    </>
                  ) : (
                    t('contactInfo.noAddress')
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-white/90 shrink-0" />
                {(() => {
                  const phone = clientProfile?.company?.gsm || clientProfile?.company?.telFax;
                  const formatPhone = (n?: string) => {
                    if (!n) return null;
                    const trimmed = n.trim();
                    if (trimmed.startsWith('+')) return trimmed;
                    if (trimmed.startsWith('0')) return `+212${trimmed.slice(1)}`;
                    return trimmed;
                  };
                  const href = formatPhone(phone);
                  return href ? (
                    <a href={`tel:${href.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{href}</a>
                  ) : (
                    <span className="text-white/80">{t('contactInfo.noPhone')}</span>
                  );
                })()}
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-white/90 shrink-0" />
                {clientProfile?.company?.email ? (
                  <a href={`mailto:${clientProfile.company.email}`} className="hover:text-white transition-colors">{clientProfile.company.email}</a>
                ) : (
                  <span className="text-white/80">{t('contactInfo.noEmail')}</span>
                )}
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <Clock className="w-5 h-5 text-white/90 shrink-0 mt-0.5" />
                <span>
                  {t('contactInfo.scheduleWeek')}<br />
                  {t('contactInfo.scheduleWeekend')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p className="text-center md:text-left">
            &copy; {currentYear} {clientProfile.company.businessName} - {t('bottom.landscaper')} {clientProfile.company.city}. {t('bottom.rights')}
            <a href="/admin/login" className="ml-2 text-white/10 hover:text-white/80 transition-colors" title="Espace Administration">
              •
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">{t('bottom.legal')}</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">{t('bottom.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
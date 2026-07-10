"use client";

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clientProfile as profile } from '@/data/profile';
import { useTranslations } from 'next-intl';

export function ContactInfo() {
  const t = useTranslations('Contact.info');
  const company = profile.company || {} as any;
  const telHref = company.gsm?.replace(/^0/, '+212') || company.gsm || '';

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-2xl font-serif font-bold text-primary mb-6">{t('title')}</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900">{t('address')}</h4>
              <p className="text-zinc-600">{company.address}<br/>{company.postalCode} — {company.region}, {company.city}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900">{t('phone')}</h4>
              <p className="text-zinc-600" dir="ltr">{company.gsm} <br/> T/F: {company.telFax}</p>
            </div>
          </div>

          {company.email && (
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
              <div>
                <h4 className="font-bold text-zinc-900">{t('email')}</h4>
                <p className="text-zinc-600">{company.email}</p>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <Clock className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900">{t('hours')}</h4>
              <p className="text-zinc-600">
                {t('hours_desc_1')}<br/>
                {t('hours_desc_2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
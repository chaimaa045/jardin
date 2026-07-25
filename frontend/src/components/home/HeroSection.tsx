"use client";

import { Button } from "../ui/Button";
import Link from "next/link";
import { MessageCircle, Leaf } from "lucide-react";
import Image from "next/image";
import { clientProfile as profile } from '@/data/profile';
import { MotionSection } from '@/components/layout/EditorialLayout';
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  return (
    <MotionSection className="relative overflow-hidden py-24 md:py-32 lg:py-40 bg-background/50">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 order-1 lg:order-1 relative flex justify-center lg:justify-start">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[350px] sm:h-[450px] lg:h-[550px] w-full max-w-lg lg:max-w-none backdrop-blur-sm">
              <Image 
                src="/images/hero/abd.png" 
                alt={`${profile.personal.name} - Paysagiste`} 
                fill 
                className="object-cover object-center hover:scale-105 transition-transform duration-700" 
              />
              
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-fade-in-up">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-3xl font-bold text-primary flex items-center gap-1">
                    <span className="text-xl">+</span>15
                  </span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-center">
                    {t('badge1')}
                  </span>
                </div>
              </div>

              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 hidden sm:flex items-center gap-3 animate-fade-in-down delay-150">
                <div className="bg-secondary/20 p-2 rounded-lg text-secondary">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-800">{t('badge2_title')}</p>
                  <p className="text-[10px] text-zinc-500 font-medium">{t('badge2_subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl -z-10"></div>
          </div>

          <div className="w-full lg:w-1/2 order-2 lg:order-2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] text-zinc-900 font-bold tracking-tight">
              {locale === 'ar' ? (
                 <span className="text-primary">{profile.personal.name}</span>
              ) : (
                <>
                  {profile.personal.name.split(' ')[0]} <br className="hidden sm:block lg:hidden" />
                  <span className="text-primary">{profile.personal.name.split(' ').slice(1).join(' ')}</span>
                </>
              )}
            </h1>
            
            <h2 className="font-sans font-medium text-xl sm:text-2xl md:text-3xl text-zinc-600 mt-4 sm:mt-6">
  {t('title')}
</h2>
            
           <p className="mt-6 sm:mt-8 text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
  {t('short_desc')}
</p>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-2xl px-8 py-6 w-full sm:w-auto text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                  {t('buttons.quote')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
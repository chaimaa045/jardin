"use client";

import { SectionTitle } from "../ui/SectionTitle";
import { FaqItem as FaqComponent } from "../ui/FaqItem";
import { getFaqData } from "@/data/faq";
import { useTranslations } from "next-intl";

export function FaqSection() {
  const t = useTranslations("Faq");
  const faqData = getFaqData(t);

  return (
    <section className="py-16 md:py-20 bg-background" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('desc')}
          centered
        />

        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-sm p-2 md:p-6">
          {faqData.map((faq, index) => (
            <FaqComponent 
              key={index}
              item={faq} 
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
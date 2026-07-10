"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { CheckCircle2, Sprout, Droplets, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function WhyUsSection() {
  const t = useTranslations("WhyUs");
  
  // Tableau des icônes correspondant aux index du JSON
  const icons = [MapPin, Droplets, CheckCircle2, Sprout];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl z-10">
              <Image
                src="/images/chantiers/prq.jpeg"
                alt="Équipe paysagiste Taroudant"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-48 sm:h-48 bg-accent rounded-2xl z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle
              title={t("title")}
              subtitle={t("subtitle")}
              description={t("description")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {icons.map((Icon, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 mb-1">
                      {t(`items.${index}.title`)}
                    </h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {t(`items.${index}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
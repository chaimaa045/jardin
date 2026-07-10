"use client";

import { motion } from "framer-motion";
import { getZonesData } from "@/data/zones";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ZonesSection() {
  const t = useTranslations("Zones");
  const zonesData = getZonesData(t);

  return (
    <section className="py-16 md:py-20 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 blur-[2px]">
         <Image 
          src="/images/chantiers/eq14.jpeg"
          alt="Texture fond"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-white/80"
          >
            {t('desc')}
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {zonesData.map((zone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              {/* Utilisation de rtl:ml-2 pour bien positionner l'icône */}
              <MapPin className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-accent" />
              <span className="font-medium">{zone}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
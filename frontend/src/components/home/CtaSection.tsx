"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-24 bg-accent relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-10 rounded-full blur-[40px]"></div>
       <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary opacity-20 rounded-full blur-[60px]"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            {t('desc')}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 border-transparent">
              {t('button')}
              <ArrowRight className="ml-2 rtl:mr-2 w-5 h-5" /> 
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
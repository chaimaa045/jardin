"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { Leaf, Award, Users } from "lucide-react";
import { useClientProfile } from '@/hooks/useClientProfile';
import { useTranslations } from "next-intl";

export function StatsSection() {
  const profile = useClientProfile();
  const t = useTranslations("Stats");

  const stats = [
    {
      value: 50,
      suffix: "+",
      icon: Leaf,
    },
    {
      value: profile?.stats?.totalYears || 15,
      suffix: "+",
      icon: Award,
    },
    {
      value: 98,
      suffix: "%",
      icon: Users,
    },
  ];

  return (
    <section className="py-16 bg-background relative z-30 -mt-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 flex items-center justify-center">
                <AnimatedCounter value={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              {/* Le label traduit dynamiquement grâce à l'index */}
              <p className="text-zinc-600 font-medium">{t(`items.${index}`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
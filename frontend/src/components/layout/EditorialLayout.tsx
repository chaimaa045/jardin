"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Default section animation props
export const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface MotionSectionProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function MotionSection({ children, className, id, style }: MotionSectionProps) {
  return (
    <motion.section
      {...sectionMotionProps}
      className={cn(String(className))}
      id={id}
      style={style}
    >
      {children}
    </motion.section>
  );
}

interface MotionStaggerGridProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function MotionStaggerGrid({ children, className, id, style }: MotionStaggerGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(String(className))}
      id={id}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div key={child.key} variants={itemVariants} className="will-change-transform">
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[#1A1A1A] antialiased">
      {children}
    </div>
  );
}

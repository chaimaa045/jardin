"use client";

import { useState } from "react";
import { FaqItem as FaqItemType } from "@/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItemProps {
  item: FaqItemType;       // 1. Changé de 'faq' à 'item' pour correspondre à FaqSection
  defaultOpen?: boolean;   // 2. Remplacement de isOpen et onClick par defaultOpen
}

export function FaqItem({ item, defaultOpen = false }: FaqItemProps) {
  // 3. Utilisation de useState pour gérer l'ouverture localement
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white mb-4 transition-all duration-300 hover:border-secondary/30">
      <button
        onClick={() => setIsOpen(!isOpen)} // 4. Le bouton inverse l'état local
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className={cn(
          "font-serif font-semibold text-lg transition-colors duration-300 pr-8",
          isOpen ? "text-secondary" : "text-primary hover:text-secondary"
        )}>
          {item.question} {/* 5. On utilise 'item.question' au lieu de 'faq.question' */}
        </span>
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full bg-background flex items-center justify-center transition-transform duration-300",
          isOpen ? "rotate-180 bg-secondary text-white" : "text-secondary"
        )}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="p-6 pt-0 text-zinc-600 leading-relaxed border-t border-zinc-50 mt-4">
            {item.answer} {/* 6. On utilise 'item.answer' au lieu de 'faq.answer' */}
          </p>
        </div>
      </div>
    </div>
  );
}
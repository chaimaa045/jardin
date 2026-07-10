import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
  description?: string;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  className, 
  centered = false,
  description // 1. Ajout de la prop ici
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
        {title}
      </h2>
      
      {/* 2. Affichage de la description si elle existe */}
      {description && (
        <p className="mt-4 text-gray-600 text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
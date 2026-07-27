import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
  description?: string;
  variant?: 'default' | 'light' | 'mixed';
}

export function SectionTitle({ 
  title, 
  subtitle, 
  className, 
  centered = false,
  description,
  variant = 'default'
}: SectionTitleProps) {
  const isLight = variant === 'light';
  const isMixed = variant === 'mixed';
  
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <span className={cn("font-semibold tracking-wider uppercase text-sm mb-3 block", isLight ? "text-accent drop-shadow" : "text-secondary")}>
          {subtitle}
        </span>
      )}
      <h2 className={cn("text-3xl md:text-4xl font-serif font-bold", isLight ? "text-white drop-shadow-lg" : "text-primary")}>
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          "mt-4 text-lg", 
          isLight || isMixed ? "text-white/90 drop-shadow-md font-medium" : "text-zinc-600"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
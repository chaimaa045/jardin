import { Testimonial } from "@/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div className={cn("bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col h-full", className)}>
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-5 h-5", 
              i < testimonial.rating ? "fill-accent text-accent" : "text-zinc-200"
            )} 
          />
        ))}
      </div>
      
      <p className="text-zinc-600 text-lg leading-relaxed flex-grow italic mb-6">
        &quot;{testimonial.content}&quot;
      </p>
      
      <div className="mt-auto">
        <p className="font-bold text-primary font-serif">
          {testimonial.name}
        </p>
        <p className="text-sm text-secondary">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Service } from "@/types";
import { ArrowRight, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <div className={cn(
      "group bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-350 transform-gpu hover:-translate-y-[4px] hover:shadow-xl border border-transparent hover:border-secondary/20 flex flex-col h-full overflow-hidden",
      className,
    )}>
      <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
        <Leaf className="w-7 h-7" />
      </div>
      
      <h3 className="text-xl font-serif text-primary font-bold mb-3 group-hover:text-secondary transition-colors">
        {service.title}
      </h3>
      
      <p className="text-zinc-600 mb-6 flex-grow leading-relaxed">
        {service.description}
      </p>
      
      <Link
        href={`/services#${service.slug}`}
        className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors mt-auto group/link"
      >
        <span className="mr-2">En savoir plus</span>
        <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

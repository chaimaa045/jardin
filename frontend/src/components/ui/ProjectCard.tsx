import Image from "next/image";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: () => void;
}

export function ProjectCard({ project, className, onClick }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl cursor-pointer aspect-square transform-gpu transition-all duration-500 hover:-translate-y-[4px] hover:shadow-2xl",
        className,
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-zinc-200 overflow-hidden">
        <Image
          src={project.coverImage} /* CHANGEMENT ICI */
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Overlay gradient : On le rend un peu plus sombre de base sur mobile pour garantir la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent opacity-85 md:opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

      {/* Content : On annule le translate sur mobile, on l'active sur desktop */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-0 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full mb-2 md:mb-3 border border-white/30">
          {project.category}
        </span>
        <h3 className="text-lg md:text-2xl font-serif text-white font-bold mb-1 md:mb-2 leading-tight">
          {project.title}
        </h3>
        
        {/* Description : Toujours visible sur mobile, cachée puis révélée au hover sur desktop */}
        <p className="text-white/80 text-xs md:text-sm line-clamp-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:delay-100">
          {project.description}
        </p>
      </div>
    </div>
  );
}
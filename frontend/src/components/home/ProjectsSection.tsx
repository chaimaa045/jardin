"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { portfolioApi } from "@/services/api";
import { PortfolioProject } from "@/types/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export function ProjectsSection() {
  const t = useTranslations();
  const [recentProjects, setRecentProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const items = await portfolioApi.getProjects();
        setRecentProjects((items as PortfolioProject[]).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {t('Portfolio.homeSection.title')}
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            {t('Portfolio.homeSection.desc')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {recentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link 
            href="/realisations" 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-white font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {t('Portfolio.homeSection.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';
import { PortfolioForm } from '@/components/admin/PortfolioForm';
import { portfolioApi } from '@/services/api';
import type { PortfolioProject } from '@/types/portfolio';
import { Loader2 } from 'lucide-react';

export default function EditPortfolioProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await portfolioApi.getProjectById(Number(params.id));
        setProject(data as PortfolioProject);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      loadProject();
    }
  }, [params.id]);

  return (
    <AdminPageLayout>
      <div className="p-4 lg:p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        ) : project ? (
          <PortfolioForm isEdit={true} initialData={project} />
        ) : (
          <div className="text-center py-20 text-primary/60">Projet introuvable.</div>
        )}
      </div>
    </AdminPageLayout>
  );
}

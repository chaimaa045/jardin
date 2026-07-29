'use client';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';
import { PortfolioForm } from '@/components/admin/PortfolioForm';

export default function NewPortfolioProjectPage() {
  return (
    <AdminPageLayout>
      <div className="p-4 lg:p-8">
        <PortfolioForm isEdit={false} />
      </div>
    </AdminPageLayout>
  );
}

'use client';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { PortfolioForm } from '@/components/admin/PortfolioForm';

export default function NewPortfolioProjectPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <PortfolioForm isEdit={false} />
      </main>
    </div>
  );
}

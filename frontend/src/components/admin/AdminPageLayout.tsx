'use client';
import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Menu, X, Leaf } from 'lucide-react';

export function AdminPageLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDFCFB]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-surface h-full shadow-2xl transition-transform">
            <div className="absolute top-4 -right-12">
              <button
                type="button"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 h-full overflow-y-auto">
              <AdminSidebar onNavigate={() => setIsMobileMenuOpen(false)} isMobile />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        {/* Mobile top navigation */}
        <div className="lg:hidden bg-white border-b border-[#e5dfd5] flex items-center justify-between px-4 py-3 shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-primary text-lg font-serif">FLORA DECOR</span>
          </div>
          <button
            type="button"
            className="p-2 -mr-2 text-primary/70 hover:text-primary hover:bg-[#e5dfd5]/30 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

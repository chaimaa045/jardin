'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Leaf, ShoppingBag, Tags, Settings, ExternalLink, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Produits', href: '/admin/products', icon: Leaf },
  { name: 'Commandes', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Catégories', href: '/admin/categories', icon: Tags },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-surface border-r border-[#e5dfd5] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#e5dfd5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-primary text-sm font-serif">FLORA DECOR</p>
            <p className="text-xs text-secondary/70">Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                  : 'text-primary/70 hover:bg-white hover:text-primary hover:shadow-sm'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-[#e5dfd5] bg-surface">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-primary/70 hover:text-primary hover:bg-white transition-all duration-200 mb-2"
        >
          <ExternalLink className="w-5 h-5" />
          Voir le site public
        </a>

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
            {user?.username?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-primary font-medium truncate">{user?.username || 'Admin'}</p>
            <p className="text-xs text-primary/60">Administrateur</p>
          </div>
        </div>

        {/* Déconnexion */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}

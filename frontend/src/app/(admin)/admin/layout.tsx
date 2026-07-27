import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Administration — FLORA DECOR',
  description: 'Espace administrateur privé',
  robots: 'noindex, nofollow', // Ne jamais indexer l'admin
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

/**
 * Layout de l'espace administration.
 * Totalement INDÉPENDANT du layout public :
 * - Pas de Header/Footer public
 * - Pas de CartProvider
 * - Pas de next-intl (admin en français uniquement)
 * - Fond sombre professionnel
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/admin-manifest.json" />
        <meta name="theme-color" content="#059669" />
        <link rel="apple-touch-icon" href="/admin-icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} antialiased bg-[#FAF8F5] text-[#212523] min-h-screen`}>
        <Toaster position="top-right" />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/admin-sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

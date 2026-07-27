import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { clientProfile } from '@/data/profile';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import EditorialLayout from '@/components/layout/EditorialLayout';

// 1. IMPORTS POUR NEXT-INTL
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// 2. IMPORT DU PANIER
import { CartProvider } from '@/hooks/useCart';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"], 
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${clientProfile.company.businessName} | Paysagiste à ${clientProfile.company.city} — Jardins & Espaces Verts`,
  description: clientProfile.personal.shortBio,
  keywords: [
    'paysagiste',
    'aménagement paysager',
    'entretien espaces verts',
    clientProfile.company.city,
  ].join(', '),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: `${clientProfile.company.businessName} | Paysagiste à ${clientProfile.company.city}`,
    description: clientProfile.personal.shortBio,
    url: '',
    siteName: clientProfile.company.businessName,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  
  const { locale } = await params;
  const messages = await getMessages();

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  const formatIntl = (num: string) => {
    if (!num) return '';
    if (num.startsWith('+')) return num;
    if (num.startsWith('0')) return `+212${num.slice(1)}`;
    return num;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": clientProfile.company.businessName,
    "description": clientProfile.personal.shortBio,
    "url": '',
    "telephone": formatIntl(clientProfile.company.gsm || clientProfile.company.telFax || ''),
    "email": clientProfile.company.email || '',
    "address": {
      "@type": "PostalAddress",
      "streetAddress": clientProfile.company.address,
      "addressLocality": clientProfile.company.city,
      "addressRegion": clientProfile.company.region,
      "postalCode": clientProfile.company.postalCode,
      "addressCountry": 'MA'
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "13:00"
      }
    ]
  };

  return (
    <html lang={locale} dir={direction} className="scroll-smooth" data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col text-[#1A1A1A] overflow-x-hidden`}> 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* 3. ENVELOPPEMENT DE L'APPLICATION AVEC CARTPROVIDER */}
          <CartProvider>
            <Header />
            <main className="flex-grow">
              <EditorialLayout>
                {children}
              </EditorialLayout>
            </main>
            <Footer />
            <WhatsAppButton />
            <Toaster position="bottom-center" />
          </CartProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
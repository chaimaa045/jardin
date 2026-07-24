import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.39'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Autoriser potentiellement le serveur hébergé
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  // Proxy API — élimine complètement le CORS
  // Le navigateur appelle /api/... sur Vercel (même domaine = pas de CORS)
  // Vercel transfère la requête au backend Back4App (serveur-à-serveur = pas de CORS)
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware i18n pour les routes publiques
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================================
  // 1. PROTECTION DES ROUTES ADMIN
  // ============================================================
  if (pathname.startsWith('/admin')) {
    // La page de login est toujours accessible
    if (pathname === '/admin/login') {
      // Si déjà authentifié → rediriger vers le dashboard
      const token = request.cookies.get('access_token');
      if (token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Toutes les autres routes admin → vérifier le token
    const token = request.cookies.get('access_token');
    if (!token) {
      // Pas de token → rediriger vers le login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token présent → laisser passer (Spring Boot validera côté API)
    return NextResponse.next();
  }

  // ============================================================
  // 2. GESTION i18n POUR LES ROUTES PUBLIQUES
  // ============================================================
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Appliquer le middleware à toutes les routes, sauf les API et les fichiers statiques
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};

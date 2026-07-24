const CACHE_NAME = 'sg-admin-cache-v1';

// Fichiers critiques à mettre en cache pour l'écran de chargement hors ligne
const URLS_TO_CACHE = [
  '/admin/login',
  '/admin-manifest.json',
  '/admin-icon-192.png',
  '/admin-icon-512.png'
];

self.addEventListener('install', (event) => {
  // Ouvre le cache et ajoute les fichiers nécessaires
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Nettoyer les anciens caches si on change de version
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ne PAS intercepter les requêtes vers l'API backend (cross-origin)
  if (!event.request.url.startsWith(self.location.origin)) {
    return; // Laisser le navigateur gérer normalement
  }

  // Pour les requêtes du même domaine : stratégie "Network First"
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

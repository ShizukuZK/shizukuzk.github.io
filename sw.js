const CACHE_NAME = 'create-aero-v14';
const URLS = [
  '/',
  '/index.html',
  '/install.html',
  '/changelog.html',
  '/privacy.html',
  '/404.html',
  '/manifest.json',
  '/og-image.svg',
  '/config.json',
  '/assets/site.css',
  '/assets/lucide-lite.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS).catch(()=>{});
    }).catch(()=>{})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  if (new URL(e.request.url).pathname === '/config.json') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone)).catch(()=>{});
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  if (new URL(e.request.url).pathname === '/assets/lucide-lite.js') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone)).catch(()=>{});
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone)).catch(()=>{});
          return response;
        })
        .catch(() => caches.match(e.request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then((r) => r || fetch(e.request))
      .catch(() => {
        if (e.request.destination === 'document') {
          return caches.match('/404.html') || caches.match('/');
        }
        return new Response('Offline', { status: 503 });
      })
  );
});

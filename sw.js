const CACHE_NAME = 'create-aero-v3';
const URLS = [
  '/',
  '/index.html',
  '/install.html',
  '/changelog.html',
  '/privacy.html',
  '/404.html',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
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
    })
  );
});

self.addEventListener('fetch', (e) => {
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

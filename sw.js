const CACHE_NAME = 'create-aero-v1';
const URLS = [
  '/',
  '/index.html',
  '/install.html',
  '/changelog.html',
  '/privacy.html'
];
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS)).catch(()=>{})
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request)).catch(()=>fetch(e.request))
  );
});

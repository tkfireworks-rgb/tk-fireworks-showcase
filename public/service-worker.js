const CACHE_NAME = 'tk-fireworks-v1';
const STATIC_ASSETS = [
  '/tk-fireworks-showcase/',
  '/tk-fireworks-showcase/index.html',
  '/tk-fireworks-showcase/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {
      console.log('Cache installation failed');
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
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

// Fetch event - cache first, then network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For JSON data files, use network-first approach
  if (event.request.url.includes('/data/') && event.request.url.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(event.request, response.clone()));
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || new Response('Offline: Data not available', { status: 503 });
          });
        })
    );
    return;
  }

  // For all other requests, use cache-first approach
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((response) => {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(event.request, response.clone()));
          return response;
        })
      );
    }).catch(() => {
      return new Response('Offline: Resource not available', { status: 503 });
    })
  );
});

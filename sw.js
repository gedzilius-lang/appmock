const APP_PREFIX = 'clubjoin-';
const VERSION = 'v1';
const CACHE_NAME = APP_PREFIX + VERSION;
const IMAGE_CACHE_NAME = 'clubjoin-image-cache-v1';

const ALL_CACHES = [CACHE_NAME, IMAGE_CACHE_NAME];

// List of files that make up the app shell
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.tsx',
  '/services/mockData.ts',
  '/components/Header.tsx',
  '/components/EventCard.tsx',
  '/components/ProductCard.tsx',
  '/components/ArticleCard.tsx',
  '/components/Thumbnails.tsx',
  '/tabs/HomeTab.tsx',
  '/tabs/RadioTab.tsx',
  '/tabs/NetworkTab.tsx',
  '/tabs/ProfileTab.tsx',
  '/components/charts/LineChart.tsx',
  '/components/charts/BarChart.tsx',
  '/components/charts/PieChart.tsx',
  '/components/dashboards/EventHost/EventOverview.tsx',
  '/components/dashboards/EventHost/DataInsights.tsx',
  '/components/dashboards/EventHost/GuestListManagement.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client'
];

// Install service worker and cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[Service Worker] Caching app shell: ${CACHE_NAME}`);
      const requests = CORE_ASSETS.map(url => new Request(url, {cache: 'reload'}));
      return cache.addAll(requests).catch(error => {
        console.error('Failed to cache core assets:', error);
      });
    })
  );
  self.skipWaiting();
});

// Activate service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!ALL_CACHES.includes(cacheName) && cacheName.startsWith(APP_PREFIX)) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.hostname === 'picsum.photos') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(cache => {
        return cache.match(request).then(response => {
          return response || fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }
  
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).catch(error => {
          console.error(`[Service Worker] Fetch failed for ${request.url}:`, error);
      });
    })
  );
});
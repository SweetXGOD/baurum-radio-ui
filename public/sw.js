const CACHE_NAME = 'baurum-radio-v2';
const urlsToCache = ['/', '/index.html', '/assets/*'];

self.addEventListener('install', (event) => {
  console.log('🔄 Установка Baurum Radio');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Для API пропускаем кэширование
  if (event.request.url.includes('/generate') || 
      event.request.url.includes('localhost:8000')) {
    return fetch(event.request);
  }
  
  // Для всех остальных файлов - кэш сначала
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
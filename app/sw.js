/* Necesitamos usar Polyfill porque todavía no todos los navegadores 
 * son compatibles con la API de caché
 */ 
 
importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       'index.html',
       'index.html?homescreen=1',
       '?homescreen=1',
       'styles/main.css',
       'scripts/main.min.js',
       'sounds/airhorn.mp3'
     ]);
   })
 );
 self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('airhorner')
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});

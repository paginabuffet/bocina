
// Necesitamos usar Polyfill porque todavía no todos los navegadores 
// son compatibles con la API de caché
importScripts('cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/index.html',
     ]);
   })
 );
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

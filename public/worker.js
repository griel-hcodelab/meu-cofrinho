const CACHE_NAME = 'vault-cache';
const urlsToCache = [
    'assets/css/stylesheet.css',
    'assets/css/cropper.min.css',
    'javascript.js',

]

self.addEventListener('install', function(event){
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
        return;
      }
    event.waitUntil(
        caches.open('v1')
        .then(function(cache){
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
        return;
      }
    event.respondWith(
        caches.match(event.request).then( response => {
            return response || fetch(event.request)
        })
    );
});
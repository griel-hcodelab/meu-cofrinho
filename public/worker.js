const CACHE_NAME = 'vault-cache';
const urlsToCache = [
    'assets/css/stylesheet.css',
    'assets/css/cropper.min.css',
    'javascript.js',

]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('v1')
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then( response => {
            return response || fetch(event.request)
        })
    );
});
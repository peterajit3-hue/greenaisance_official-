// Minimal service worker for Greenaisance — enables "Install app" / "Add to Home Screen"
// on browsers that require an active service worker for installability.
// It doesn't cache anything special; it just passes requests straight through.

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event){
  // Pass-through: just let the network handle every request normally.
  event.respondWith(fetch(event.request).catch(function(){
    return new Response('Offline — please reconnect to use Greenaisance.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }));
});

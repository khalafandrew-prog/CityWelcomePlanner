const CACHE_NAME = "citywp-v1";
const ASSETS = [
  "/CityWelcomePlanner/",
  "/CityWelcomePlanner/index.html",
  "/CityWelcomePlanner/style.css",
  "/CityWelcomePlanner/app.js",
  "/CityWelcomePlanner/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

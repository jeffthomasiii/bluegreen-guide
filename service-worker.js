const CACHE_NAME = "bgg-v1.2-shell-v12";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./design-system.css",
  "./phase-1-expansion.css",
  "./brand-refresh.css",
  "./ui-refresh.css",
  "./ui-responsive-fixes.css",
  "./mission-bay-place-pilot.css",
  "./mobile-ux.css",
  "./mobile-compact.css",
  "./mobile-layout-polish.css",
  "./mobile-explore-limit.css",
  "./app.js",
  "./collections-ui.js",
  "./ui-refresh.js",
  "./mission-bay-place-pilot.js",
  "./mobile-ux.js",
  "./mobile-compact.js",
  "./mobile-explore-limit.js",
  "./data/places.js",
  "./data/mission-bay-launch-points.js",
  "./data/mission-bay-launch-points.json",
  "./data/green-space-field-test.js",
  "./data/green-space-field-test.json",
  "./data/launch-profile.js",
  "./data/collections.js",
  "./assets/brand/bluegreen-guide-logo-primary-transparent.svg",
  "./assets/icons/wayfinding.svg",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Keep map tiles, fonts, source links, and other third-party data network-driven.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});

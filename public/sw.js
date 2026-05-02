const CACHE_NAME = 'healthos-v1';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Push: handle incoming push events
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'HealthOS Alert', {
      body:  data.body  ?? 'You have a new notification.',
      icon:  '/favicon.ico',
      badge: '/favicon.ico',
      tag:   data.tag   ?? 'healthos',
      data:  { url: data.url ?? '/' },
    })
  );
});

// Notification click: focus or open app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow(event.notification.data.url);
    })
  );
});

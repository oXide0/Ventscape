const staticCacheName = 'app-v1';

const assetUrls = ['/index.html'];

self.addEventListener('install', async () => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetUrls);
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    }
});

async function cacheFirst(req) {
    const cache = await caches.match(req);
    return cache ?? fetch(req);
}

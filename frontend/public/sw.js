/*
 * Service worker for Al-Hikmah AI.
 *
 * Goal: /quran stays readable with no internet at all. The mushaf payload
 * (/quran-data, generated at build time) and the app shell are cached, so both
 * a soft navigation and a full reload keep working offline.
 *
 * Rules:
 * - Never touch /api/* or cross-origin requests: the FastAPI backend lives on
 *   another origin and AI/tafsir always need the network.
 * - The "PRECACHE_QURAN" message renews the mushaf cache after a fresh deploy.
 * - Pages fall back to the cached copy, then to /offline.html.
 */

const VERSION = "v1";
const SHELL_CACHE = `alhikmah-shell-${VERSION}`;
const PAGE_CACHE = `alhikmah-pages-${VERSION}`;
const QURAN_CACHE = `alhikmah-quran-${VERSION}`;
const ACTIVE_CACHES = [SHELL_CACHE, PAGE_CACHE, QURAN_CACHE];
const OFFLINE_URL = "/offline.html";

const SHELL_ASSETS = [
  "/quran",
  OFFLINE_URL,
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

const STATIC_ASSET = /\.(?:png|jpg|jpeg|svg|webp|ico|woff2?|css|js|map)$/;

// Next.js App Router requests pages as React Server Component payloads (the
// "RSC: 1" header) instead of HTML. Used to store the document, not the stream.
function isPageRequest(request, url) {
  if (url.pathname.startsWith("/_next/")) return false;
  if (request.mode === "navigate") return true;
  const rsc = request.headers.get("RSC");
  return Boolean(rsc) && rsc !== "0" && !request.headers.get("Next-Router-Prefetch");
}

async function precacheQuran(files) {
  if (!Array.isArray(files) || files.length === 0) return;
  const cache = await caches.open(QURAN_CACHE);
  for (let index = 0; index < files.length; index += 8) {
    const batch = files.slice(index, index + 8);
    await Promise.all(
      batch.map(async (file) => {
        try {
          const response = await fetch(file, { cache: "no-cache" });
          if (response.ok) await cache.put(file, response);
        } catch {
          // Keep the previously cached copy.
        }
      }),
    );
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.all(
        SHELL_ASSETS.map(async (asset) => {
          try {
            await cache.add(new Request(asset, { cache: "reload" }));
          } catch {
            // A missing shell asset must not block activation.
          }
        }),
      );
      try {
        const manifest = await fetch("/quran-data/sw-manifest.json", { cache: "no-cache" });
        if (manifest.ok) {
          const data = await manifest.json();
          await precacheQuran(data.files);
        }
      } catch {
        // Mushaf precache is retried from the page via PRECACHE_QURAN.
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith("alhikmah-") && !ACTIVE_CACHES.includes(name))
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();

      // clients.claim() controls the page only from its next navigation, and
      // offline reading depends on it. Reload the pages that were open before
      // the worker installed (the page sets a flag so this happens once).
      const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      const uncontrolled = windows.filter((client) => !client.controller);
      await Promise.all(
        uncontrolled.map(async (client) => {
          try {
            await client.navigate(client.url);
          } catch {
            // Best effort: the next visit will be controlled anyway.
          }
        }),
      );
    })(),
  );
});

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "PRECACHE_QURAN") {
    event.waitUntil(precacheQuran(data.files));
  }
  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/** Cache lookup limited to one of this worker's caches, never another kind. */
async function matchIn(cacheName, request, pathname) {
  const cache = await caches.open(cacheName);
  return (await cache.match(request)) || (await cache.match(pathname));
}

async function networkFirst(request, url, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await matchIn(cacheName, request, url.pathname);
    if (cached) return cached;
    throw error;
  }
}

async function serveQuran(request, url) {
  // Range requests are left to the network: the cached body is served whole.
  if (request.headers.get("range")) return networkFirst(request, url, QURAN_CACHE);
  const cached = await matchIn(QURAN_CACHE, request, url.pathname);
  if (cached) return cached;
  return networkFirst(request, url, QURAN_CACHE);
}

async function cacheFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function handlePage(request, url) {
  try {
    const response = await fetch(request);
    // Only navigations store a document; RSC payloads are passed through so the
    // cached page is always complete HTML.
    if (response.ok && request.mode === "navigate") {
      const cache = await caches.open(PAGE_CACHE);
      await cache.put(url.pathname, response.clone());
    }
    return response;
  } catch (error) {
    const cached =
      (await matchIn(PAGE_CACHE, request, url.pathname)) ||
      (await matchIn(SHELL_CACHE, request, url.pathname)) ||
      (await matchIn(SHELL_CACHE, request, "/quran"));
    if (cached) return cached;
    const offline = await matchIn(SHELL_CACHE, request, OFFLINE_URL);
    if (offline) return offline;
    throw error;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (url.pathname.startsWith("/quran-data/")) {
    event.respondWith(serveQuran(request, url));
    return;
  }

  if (STATIC_ASSET.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isPageRequest(request, url)) {
    event.respondWith(handlePage(request, url));
  }
});

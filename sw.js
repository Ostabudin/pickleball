/* 匹克球分隊 offline cache — bump CACHE version on each release */
const CACHE = 'pb-v4';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'no-cache' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      /* only touch this app's own cache generations — Cache Storage is shared
         by every project on this github.io origin */
      .then(ks => Promise.all(ks.filter(k => k.startsWith('pb-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* pages: network first with forced revalidation (bypasses the CDN's 10-min
   max-age so releases land immediately); cached shell when offline. Only a
   healthy, non-redirected, same-origin shell response may overwrite the
   offline copy — error pages and other documents must never poison it.
   assets: cache first */
self.addEventListener('fetch', e => {
  if(e.request.mode === 'navigate' || e.request.destination === 'document'){
    const isShell = /\/$|\/index\.html$/.test(new URL(e.request.url).pathname);
    e.respondWith(
      fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => {
        if(isShell && r.ok && r.type === 'basic' && !r.redirected){
          const copy = r.clone();
          e.waitUntil(caches.open(CACHE).then(c => c.put('./index.html', copy)));
        }
        return r;
      }).catch(() => caches.match(isShell ? './index.html' : e.request))
    );
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});

const CACHE_NAME = "v1";

const CACHED_URLS = [
  "/",
  "index.html",
  "assets/css/screen.css",
  "assets/js/script.js",
  "assets/images/favicon-16x16.png",
  "assets/images/favicon-32x32.png",
  "assets/images/image.ico",
  "assets/lib/dropzone.js",
  "assets/lib/dropzone.css",
]

this.addEventListener("install", e => {
  const populateCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(CACHED_URLS);
  }

  e.waitUntil(populateCache());
})

this.addEventListener('fetch', function (e) {
  e.respondWith(myFetcher(e));
});


const myFetcher = async e => {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(e.request);
  if (response !== undefined) return response;
  else return fetch(e.request);
}

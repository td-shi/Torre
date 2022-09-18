let CACHE_NAME  = "Torre-cache-v1";
let urlsToCache = [
//    "https://td-shi.github.io/Torre/index.html",
    "https://td-shi.github.io/Torre/favicon.svg",
    "https://td-shi.github.io/Torre/css/common.css",
    "https://td-shi.github.io/Torre/img/search.svg",
    "https://td-shi.github.io/Torre/img/menu.svg",
    "https://td-shi.github.io/Torre/img/delete.svg",
    "https://unpkg.com/modern-css-reset/dist/reset.min.css",
    "https://unpkg.com/maquette@3.3.4/dist/maquette.umd.js",
    "https://td-shi.github.io/Torre/js/gutil.js"
//    "https://td-shi.github.io/Torre/js/maqatom.umd.js"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(
            function(cache){
                return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(
        function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

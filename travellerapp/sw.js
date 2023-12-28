const STATIC_CACHE = "static-v5";
const DYNAMIC_CACHE = "dynamic-v5";

self.addEventListener("install", function (event) {
    console.log("Installed", event);
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            cache.addAll([
                "/",
                "/index.html",
                "/detail.html",
                "/manifest.json",

                "/js/script.js",
                "/js/jquery-3.5.1.min.js",

                "/css/style.css",

                "/images/logo.svg",
                "/images/search.svg",

                "/fonts/product_sans_bold-webfont.woff2",
                "/fonts/product_sans_bold-webfont.woff",
                "/fonts/product_sans_regular-webfont.woff2",
                "/fonts/product_sans_regular-webfont.woff",
            ]);
        })
    );
});

self.addEventListener("activate", function (event) {
    console.log("Activated", event);
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log(key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// self.addEventListener("fetch", function (event) {
//     event.respondWith(
//         caches.match(event.request, { ignoreSearch: true }).then((response) => {
//             if (response) {
//                 return response;
//             } else {
//                 return fetch(event.request).then((res) => {
//                     return caches.open(DYNAMIC_CACHE).then((cache) => {
//                         cache.put(event.request.url, res.clone());
//                         return res;
//                     });
//                 });
//             }
//         })
//     );
// });

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});

self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open("password-manager").then((cache) => {
            console.log("Caching files...");
            return cache.addAll([
                "/",
                "/index.html",
                "/app.js",
                "/styles.css",
                "/manifest.json",
                "/icons/icon-192x192.png",
                "/icons/icon-512x512.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    console.log("Fetch intercepted for:", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

/*Тестировал через VSCode Live-server - все работает, как браузерная, так и установленная версия*/

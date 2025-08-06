// AICAMP Service Worker
const CACHE_NAME = 'aicamp-v3.0';
const urlsToCache = [
  '/',
  '/diagnosis',
  '/services',
  '/consultation',
  '/tax-calculator',
  '/about',
  '/cases'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('AICAMP Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.warn('Service Worker cache failed:', error);
      })
  );
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('AICAMP Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 요청 처리
self.addEventListener('fetch', (event) => {
  // API 요청은 캐시하지 않음
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에서 찾으면 반환
        if (response) {
          return response;
        }

        // 네트워크에서 가져오기
        return fetch(event.request).then((response) => {
          // 성공적인 응답만 캐시
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 캐시에 복사
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // 오프라인 시 기본 페이지 반환
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// 메시지 처리 (Chrome 확장 프로그램 오류 방지)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 오류 처리
self.addEventListener('error', (event) => {
  console.warn('Service Worker error:', event.error);
});

// 언핸들드 리젝션 처리
self.addEventListener('unhandledrejection', (event) => {
  console.warn('Service Worker unhandled rejection:', event.reason);
});

console.log('AICAMP Service Worker loaded successfully'); 
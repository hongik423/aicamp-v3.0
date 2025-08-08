// AICAMP Service Worker - 안전한 버전
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
        // 모든 오류를 안전하게 처리
        console.warn('Service Worker cache failed:', error.message);
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
  // Chrome 확장 프로그램 요청 무시
  if (
    event.request.url.includes('chrome-extension://') ||
    event.request.url.includes('moz-extension://') ||
    event.request.url.includes('safari-extension://')
  ) {
    return;
  }

  // GET 이외의 메서드는 캐싱하지 않음 (HEAD/POST/PUT 등은 Cache API 미지원)
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request).catch(async (error) => {
      console.warn('Network request failed for non-GET:', error?.message || error);
      // 비-GET 요청 실패 시에는 캐시 대체 불가, 기본 루트 제공
      const fallback = await caches.open(CACHE_NAME).then((cache) => cache.match('/'));
      return fallback || new Response('Network error', { status: 503 });
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에서 찾은 경우 반환
      if (response) {
        return response;
      }

      // 네트워크에서 가져오기 (GET 전용 캐싱)
      return fetch(event.request)
        .then((networkResponse) => {
          // 유효한 응답이 아니면 그대로 반환
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // 응답을 복제하여 캐시에 저장
          const responseToCache = networkResponse.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              // GET 요청만 안전하게 put
              cache.put(event.request, responseToCache).catch((err) => {
                console.warn('Cache put failed (GET):', err?.message || err);
              });
            })
            .catch((error) => {
              console.warn('Cache open failed:', error?.message || error);
            });

          return networkResponse;
        })
        .catch(async (error) => {
          console.warn('Fetch failed:', error?.message || error);
          // 오프라인 페이지 반환
          const offline = await caches.match('/');
          return offline || new Response('Offline', { status: 503 });
        });
    })
  );
});

// 메시지 처리 - 안전한 버전
self.addEventListener('message', (event) => {
  // Chrome 확장 프로그램 관련 메시지 완전 무시
  if (event.data && typeof event.data === 'string') {
    if (event.data.includes('port closed') || 
        event.data.includes('Extension context') ||
        event.data.includes('chrome-extension://') ||
        event.data.includes('content.js') ||
        event.data.includes('runtime.lastError')) {
      return;
    }
  }
  
  // 유효한 메시지만 처리
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 오류 처리 - 안전한 버전
self.addEventListener('error', (event) => {
  // Chrome 확장 프로그램 오류 완전 무시
  if (event.error && event.error.message) {
    if (event.error.message.includes('port closed') || 
        event.error.message.includes('Extension context') ||
        event.error.message.includes('chrome-extension://') ||
        event.error.message.includes('content.js') ||
        event.error.message.includes('runtime.lastError') ||
        event.error.message.includes('The message port closed')) {
      return;
    }
  }
  
  // 일반적인 오류만 로깅
  console.warn('Service Worker error:', event.error?.message || 'Unknown error');
});

// Unhandled promise rejection 처리 - 안전한 버전
self.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  
  // Chrome 확장 프로그램 관련 오류 완전 무시
  if (reason && typeof reason === 'string') {
    if (reason.includes('port closed') || 
        reason.includes('Extension context') ||
        reason.includes('chrome-extension://') ||
        reason.includes('content.js') ||
        reason.includes('runtime.lastError') ||
        reason.includes('The message port closed')) {
      event.preventDefault();
      return;
    }
  }
  
  if (reason && reason.message) {
    if (reason.message.includes('port closed') || 
        reason.message.includes('Extension context') ||
        reason.message.includes('chrome-extension://') ||
        reason.message.includes('content.js') ||
        reason.message.includes('runtime.lastError') ||
        reason.message.includes('The message port closed')) {
      event.preventDefault();
      return;
    }
  }
  
  // 일반적인 rejection만 로깅
  console.warn('Service Worker unhandled rejection:', 
    reason?.message || reason || 'Unknown rejection');
});

console.log('AICAMP Service Worker loaded successfully'); 
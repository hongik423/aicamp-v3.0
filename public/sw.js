// AICAMP Service Worker - 안전한 버전
const CACHE_NAME = 'aicamp-v3.3';
const urlsToCache = [
  '/',
  '/diagnosis',
  '/services',
  '/services/ai-curriculum',
  // 요청하신 추가 사전 캐시 경로들
  '/services/investment-analysis',
  '/services/policy-funding',
  '/services/policy-funding/operating-funding',
  '/services/policy-funding/facility-funding',
  '/services/policy-funding/rd-funding',
  '/services/policy-funding/startup-funding',
  '/services/policy-funding/investment-analysis',
  '/tax-calculator',
  '/tax-calculator/error-report',
  '/consultation',
  '/tax-calculator',
  '/about',
  '/cases',
  '/seminar',
  // 아이콘/매니페스트 (일부 브라우저가 자동 요청)
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icon.svg',
  '/manifest.webmanifest'
];

// 캐시 제외/주의 대상 URL 패턴
const NON_CACHEABLE_PATTERNS = [
  '/api/',
  '/chat',
  '/chat-ai',
  '/_next/data/',
  '/_next/image',
  '/_next/webpack-hmr',
  '/sw.js',
];

const NON_CACHEABLE_QUERY_KEYS = ['_rsc', 'next', 'trpc', 'no-cache'];

function isSameOrigin(url) {
  try {
    const u = new URL(url);
    return u.origin === self.location.origin;
  } catch (_) {
    return false;
  }
}

function isNonCacheableRequest(request) {
  // 비-GET 즉시 비캐시
  if (request.method !== 'GET') return true;

  const url = request.url;
  if (!isSameOrigin(url)) {
    // 교차 출처는 캐시하지 않음 (필요 시 허용 패턴 추가)
    return true;
  }

  try {
    const u = new URL(url);
    // 특정 경로 제외
    if (NON_CACHEABLE_PATTERNS.some((p) => u.pathname.startsWith(p))) return true;
    // 특정 쿼리 키 포함 시 제외
    for (const key of u.searchParams.keys()) {
      if (NON_CACHEABLE_QUERY_KEYS.includes(key)) return true;
    }
  } catch (_) {}

  // SSE/HTML 스트림 등은 제외
  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/event-stream')) return true;

  return false;
}

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
  // 즉시 대기 상태 건너뛰어 빠른 업데이트 적용
  self.skipWaiting();
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
  // 즉시 클라이언트 제어
  self.clients && self.clients.claim && self.clients.claim();
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

  // 캐시 부적합 요청은 그대로 네트워크만 사용
  if (isNonCacheableRequest(event.request)) {
    event.respondWith(
      fetch(event.request).catch(async (error) => {
        console.warn('Network request failed (non-cacheable):', error?.message || error);
        // 네비게이션 요청이면 루트로 폴백
        if (event.request.mode === 'navigate') {
          const fallback = await caches.open(CACHE_NAME).then((cache) => cache.match('/'));
          return fallback || new Response('Offline', { status: 503 });
        }
        return new Response('Network error', { status: 503 });
      })
    );
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
              // Cache API는 GET Request만 허용됨. 키는 항상 GET으로 생성
              const cacheKey = new Request(event.request.url, { method: 'GET' });
              cache.put(cacheKey, responseToCache).catch((err) => {
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
    if (reason.includes("Request method 'HEAD' is unsupported") ||
        reason.includes("Request method 'POST' is unsupported") ||
        reason.includes('Failed to execute \"put\" on \"Cache\"')) {
      event.preventDefault();
      return;
    }
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
    const msg = reason.message;
    if (msg.includes("Request method 'HEAD' is unsupported") ||
        msg.includes("Request method 'POST' is unsupported") ||
        msg.includes('Failed to execute \"put\" on \"Cache\"')) {
      event.preventDefault();
      return;
    }
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
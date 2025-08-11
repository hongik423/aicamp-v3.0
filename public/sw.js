// AICAMP Service Worker - 안전한 버전
const CACHE_NAME = 'aicamp-v3.4-' + Date.now();
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
  '/__NEXT',
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

  // Icon/Manifest 등은 캐시 허용 (일부 브라우저 자동요청)
  try {
    const u = new URL(request.url);
    const iconLike = /(?:icon|manifest)/i.test(u.pathname);
    if (iconLike) return false;
  } catch (_) {}

  // SSE/HTML 스트림 등은 제외
  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/event-stream')) return true;

  return false;
}

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('AICAMP Service Worker installing...');
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      console.log('Opened cache');
      await Promise.all(
        urlsToCache.map(async (url) => {
          try {
            const request = new Request(url, { method: 'GET', cache: 'reload' });
            const response = await fetch(request);
            if (response && response.ok) {
              await cache.put(request, response.clone());
            } else {
              console.warn('Precache skipped (HTTP)', url, response?.status);
            }
          } catch (e) {
            console.warn('Precache failed', url, e?.message || e);
          }
        })
      );
    } catch (error) {
      console.warn('Service Worker cache process error:', error?.message || error);
    }
  })());
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

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cacheKey = new Request(event.request.url, { method: 'GET' });
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const networkResponse = await fetch(event.request);
      if (networkResponse && networkResponse.ok && event.request.method === 'GET') {
        try {
          await cache.put(cacheKey, networkResponse.clone());
        } catch (err) {
          console.warn('Cache put failed (GET):', err?.message || err);
        }
      }
      return networkResponse;
    } catch (error) {
      console.warn('Fetch failed:', error?.message || error);
      const offline = await caches.match('/');
      return offline || new Response('Offline', { status: 503 });
    }
  })());
});

// 메시지 처리 - 안전한 버전
self.addEventListener('message', (event) => {
  try {
    // Chrome 확장 프로그램 관련 메시지 완전 무시
    if (event.data && typeof event.data === 'string') {
      if (event.data.includes('port closed') || 
          event.data.includes('Extension context') ||
          event.data.includes('chrome-extension://') ||
          event.data.includes('content.js') ||
          event.data.includes('runtime.lastError') ||
          event.data.includes('The message port closed')) {
        event.stopImmediatePropagation();
        return;
      }
    }
    
    // 객체 타입 메시지 검사
    if (event.data && typeof event.data === 'object') {
      const dataStr = JSON.stringify(event.data);
      if (dataStr.includes('chrome-extension://') ||
          dataStr.includes('runtime.lastError') ||
          dataStr.includes('Extension context')) {
        event.stopImmediatePropagation();
        return;
      }
    }
    
    // 유효한 메시지만 처리
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  } catch (error) {
    // 메시지 처리 중 오류 발생 시 조용히 무시
    console.debug('Service Worker message handling error:', error.message);
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
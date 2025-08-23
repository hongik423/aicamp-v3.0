// 이교장의AI역량진단보고서 Service Worker
const CACHE_VERSION = '3.7'; // Chrome 확장 프로그램 오류 수정
const CACHE_NAME = 'aicamp-v' + CACHE_VERSION + '-' + new Date().getTime();
const urlsToCache = [
  '/',
  '/images/aicamp_logo.png',
  '/images/aicamp_logo_del_250726.png',
  '/api/manifest'
];

// 캐시 버전 체크 및 강제 업데이트 키
const FORCE_UPDATE_KEY = 'aicamp-force-update-' + CACHE_VERSION;

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ 캐시 생성 완료');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('❌ 캐시 생성 실패:', error);
      })
  );
  // 새 워커가 즉시 활성화되도록 대기 상태 건너뜀
  self.skipWaiting();
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker 활성화');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ 이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 네트워크 요청 처리
self.addEventListener('fetch', (event) => {
  // Chrome 확장 프로그램 요청 무시 (캐시 오류 방지)
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.startsWith('safari-web-extension://')) {
    return;
  }
  
  // 외부 도메인 요청 무시 (CORS 오류 방지)
  try {
    const requestUrl = new URL(event.request.url);
    const currentUrl = new URL(self.location.href);
    
    if (requestUrl.origin !== currentUrl.origin && 
        !requestUrl.hostname.includes('aicamp.club') &&
        !requestUrl.hostname.includes('localhost')) {
      return;
    }
  } catch (error) {
    // URL 파싱 실패 시 요청 무시
    return;
  }
  
  // HTML 페이지(네비게이션)는 항상 네트워크 우선으로 처리해 최신 배포를 즉시 반영
  const acceptHeader = event.request.headers.get('accept') || '';
  if (event.request.mode === 'navigate' || acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(event.request, {
        mode: 'cors',
        credentials: 'same-origin'
      })
        .then((response) => {
          // 성공 시 캐시에 백그라운드 저장하여 다음 로드 속도 개선 (안전한 요청만)
          if (event.request.url.startsWith('http')) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // API 요청은 네트워크 우선 처리 (실시간 데이터 보장)
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request, {
        mode: 'cors',
        credentials: 'same-origin'
      })
        .then((response) => {
          if (response.status === 200 && event.request.url.startsWith('http')) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Next.js 정적 파일에 대해서는 네트워크 우선 전략 사용 (캐시 버스팅)
  if (event.request.url.includes('/_next/static/') || 
      event.request.url.includes('.js') || 
      event.request.url.includes('.css')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 성공적으로 받아온 경우에만 캐시에 저장 (안전한 요청만)
          if (response.status === 200 && event.request.url.startsWith('http')) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              })
              .catch(() => {}); // 캐시 저장 실패 시 무시
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패 시에만 캐시에서 반환
          return caches.match(event.request);
        })
    );
    return;
  }

  // 매니페스트 요청에 대해서는 네트워크 우선 전략 사용
  if (event.request.url.includes('manifest.webmanifest') || event.request.url.includes('/api/manifest')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 성공적으로 받아온 경우 캐시에 저장 (안전한 요청만)
          if (response.status === 200 && event.request.url.startsWith('http')) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              })
              .catch(() => {}); // 캐시 저장 실패 시 무시
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패 시 캐시에서 반환
          return caches.match(event.request);
        })
    );
    return;
  }

  // 일반 요청에 대한 캐시 우선 전략
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에 있으면 반환, 없으면 네트워크에서 가져옴
        return response || fetch(event.request, {
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Cross-Origin-Resource-Policy': 'cross-origin'
          }
        });
      })
      .catch((error) => {
        console.warn('Service Worker fetch 오류:', error);
        // 폴백: 기본 fetch 시도
        try {
          return fetch(event.request);
        } catch (fallbackError) {
          console.warn('Service Worker 폴백 fetch 오류:', fallbackError);
          return new Response('Service Worker 오류', { status: 503 });
        }
      })
  );
});

// 메시지 처리
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 전역 오류 처리
self.addEventListener('error', (event) => {
  console.warn('Service Worker 전역 오류:', event.error);
  event.preventDefault();
});

self.addEventListener('unhandledrejection', (event) => {
  console.warn('Service Worker 처리되지 않은 Promise 거부:', event.reason);
  event.preventDefault();
});

console.log('🎓 이교장의AI역량진단보고서 Service Worker 로드 완료');
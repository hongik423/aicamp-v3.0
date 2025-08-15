// 이교장의AI역량진단보고서 Service Worker
const CACHE_NAME = 'ai-diagnosis-v1';
const urlsToCache = [
  '/',
  '/images/aicamp_leader.png',
  '/manifest.webmanifest'
];

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
    })
  );
});

// 네트워크 요청 처리
self.addEventListener('fetch', (event) => {
  // 매니페스트 요청에 대해서는 네트워크 우선 전략 사용
  if (event.request.url.includes('manifest.webmanifest')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 성공적으로 받아온 경우 캐시에 저장
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
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
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.warn('Service Worker fetch 오류:', error);
        return fetch(event.request);
      })
  );
});

// 메시지 처리
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🎓 이교장의AI역량진단보고서 Service Worker 로드 완료');
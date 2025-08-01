// AICAMP Service Worker - 완전 오류 방지 버전
const CACHE_NAME = 'aicamp-v1.0.4'; // 버전 업데이트 - 오류 수정
const STATIC_CACHE_URLS = [
  '/',
  '/diagnosis',
  '/chatbot',
  '/consultation',
  '/about',
  '/services',
  '/center-leader',
  '/n8n_1-20.pdf',  // ✅ PDF 파일 추가
  '/images/AICAMP로고.png',
  '/images/aicamp_leader.png',
  '/images/aicamp_leader2.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Check if running in development
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// 🆕 완전한 메시지 포트 및 확장 프로그램 오류 방지 시스템
self.addEventListener('error', (event) => {
  const errorMessage = event.error?.message || event.message || '';
  
  // 메시지 포트 관련 오류
  if (errorMessage.includes('port closed') || 
      errorMessage.includes('message port closed') ||
      errorMessage.includes('runtime.lastError') ||
      errorMessage.includes('Extension context')) {
    event.preventDefault();
    return false;
  }
  
  // 확장 프로그램 관련 오류
  if (errorMessage.includes('chrome-extension://') ||
      errorMessage.includes('extension://') ||
      errorMessage.includes('content.js')) {
    event.preventDefault();
    return false;
  }
  
  event.preventDefault();
});

// 🆕 unhandledrejection 이벤트 처리 추가
self.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && 
      (event.reason.message.includes('port closed') || 
       event.reason.message.includes('message port closed'))) {
    console.log('Message port rejection suppressed in SW');
    event.preventDefault();
    return false;
  }
  console.log('Service Worker unhandled rejection:', event.reason);
  event.preventDefault();
});

// 🆕 메시지 이벤트 안전 처리
self.addEventListener('message', (event) => {
  try {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  } catch (error) {
    console.log('Message event error handled:', error);
  }
});

// Install event
self.addEventListener('install', (event) => {
  console.log('AICAMP Service Worker installing...');
  
  // Skip caching in development
  if (isDevelopment) {
    console.log('Development mode: Skipping cache installation');
    return self.skipWaiting();
  }
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential resources...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('AICAMP Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error during service worker installation:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('AICAMP Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ]).then(() => {
      console.log('AICAMP Service Worker activated');
      // 🆕 오프라인 양식 제출 처리
      return handleOfflineFormSubmission();
    })
  );
});

// 🆕 개선된 메시지 핸들러 - 메시지 포트 오류 방지
self.addEventListener('message', (event) => {
  // 안전한 포트 응답 함수
  const safePostMessage = (port, message) => {
    try {
      if (port && typeof port.postMessage === 'function') {
        port.postMessage(message);
      }
    } catch (error) {
      console.log('Message port send failed (likely closed):', error.message);
    }
  };

  try {
    if (!event.ports || event.ports.length === 0) {
      console.log('No message port available, skipping response');
      return;
    }
    
    const port = event.ports[0];
    const { type, data } = event.data || {};
    
    switch (type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        safePostMessage(port, { success: true });
        break;
        
      case 'GET_VERSION':
        safePostMessage(port, { version: CACHE_NAME });
        break;
        
      case 'CACHE_URLS':
        if (data && Array.isArray(data.urls)) {
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(data.urls))
            .then(() => safePostMessage(port, { success: true }))
            .catch(error => safePostMessage(port, { success: false, error: error.message }));
        } else {
          safePostMessage(port, { success: false, error: 'Invalid URL data' });
        }
        break;
        
      default:
        console.log('Unknown message type:', type);
        safePostMessage(port, { success: false, error: 'Unknown message type' });
    }
  } catch (error) {
    console.error('Message handler error:', error);
    // 메시지 포트가 닫혔을 수 있으므로 안전하게 처리
    if (event.ports && event.ports[0]) {
      try {
        event.ports[0].postMessage({ success: false, error: error.message });
      } catch (portError) {
        console.log('Message port already closed during error handling');
      }
    }
  }
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', (event) => {
  // In development, always use network
  if (isDevelopment) {
    return;
  }
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip _next directory (webpack chunks)
  if (event.request.url.includes('/_next/')) {
    return;
  }
  
  // Skip API routes
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseClone = response.clone();
        
        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            })
            .catch((error) => {
              console.log('Cache storage error:', error);
            });
        }
        
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If not in cache, return a basic offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Resource not available offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'diagnosis-form') {
    event.waitUntil(
      // Handle offline form submissions
      handleOfflineFormSubmission()
    );
  }
});

async function handleOfflineFormSubmission() {
  try {
    // Get stored form data from IndexedDB
    const storedForms = await getStoredForms();
    
    for (const formData of storedForms) {
      try {
        const response = await fetch('/api/simplified-diagnosis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.data)
        });
        
        if (response.ok) {
          // Remove successfully submitted form
          await removeStoredForm(formData.id);
        }
      } catch (error) {
        console.error('Failed to submit stored form:', error);
      }
    }
  } catch (error) {
    console.error('Error handling offline form submission:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'AICAMP에서 새로운 소식이 있습니다!',
    icon: '/images/AICAMP로고.png',
    badge: '/images/AICAMP로고.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('AICAMP 알림', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// 🆕 IndexedDB helper functions - 오류 방지 개선
async function getStoredForms() {
  try {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AICAMPOfflineDB', 1);
      
      request.onerror = () => {
        console.log('IndexedDB open error');
        resolve([]);
      };
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('forms')) {
          resolve([]);
          return;
        }
        
        const transaction = db.transaction(['forms'], 'readonly');
        const store = transaction.objectStore('forms');
        const getAllRequest = store.getAll();
        
        getAllRequest.onsuccess = () => {
          resolve(getAllRequest.result || []);
        };
        
        getAllRequest.onerror = () => {
          console.log('IndexedDB getAll error');
          resolve([]);
        };
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('forms')) {
          db.createObjectStore('forms', { keyPath: 'id' });
        }
      };
    });
  } catch (error) {
    console.error('getStoredForms error:', error);
    return [];
  }
}

async function removeStoredForm(id) {
  try {
    return new Promise((resolve) => {
      const request = indexedDB.open('AICAMPOfflineDB', 1);
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('forms')) {
          resolve();
          return;
        }
        
        const transaction = db.transaction(['forms'], 'readwrite');
        const store = transaction.objectStore('forms');
        
        const deleteRequest = store.delete(id);
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => resolve();
      };
      
      request.onerror = () => resolve();
    });
  } catch (error) {
    console.error('removeStoredForm error:', error);
  }
} 
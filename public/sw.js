// AICAMP Service Worker
const CACHE_NAME = 'aicamp-v1.0.1'; // 버전 업데이트
const STATIC_CACHE_URLS = [
  '/',
  '/diagnosis',
  '/chatbot',
  '/consultation',
  '/about',
  '/services',
  '/center-leader',
  '/images/AICAMP로고.png',
  '/images/aicamp_leader.png',
  '/images/aicamp_leader2.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Check if running in development
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

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
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('AICAMP Service Worker activated');
        return self.clients.claim();
      })
  );
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
    },
    actions: [
      {
        action: 'explore',
        title: '확인하기',
        icon: '/images/AICAMP로고.png'
      },
      {
        action: 'close',
        title: '닫기'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('AICAMP', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for IndexedDB operations
async function getStoredForms() {
  // Implement IndexedDB operations
  return [];
}

async function removeStoredForm(id) {
  // Implement IndexedDB removal
  console.log('Removing stored form:', id);
} 
'use client';

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('AICAMP Service Worker registered:', registration.scope);
          
          // 업데이트 확인
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // 새 버전 사용 가능 알림
                  console.log('New AICAMP version available');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('AICAMP Service Worker registration failed:', error);
        });
    }
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
} 
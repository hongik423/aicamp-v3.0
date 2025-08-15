'use client'

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      console.log('⏳ Service Worker 등록 시도 중...');
      
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker 등록 성공:', registration.scope);
          
          // 업데이트 확인
          registration.addEventListener('updatefound', () => {
            console.log('🔄 Service Worker 업데이트 발견');
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🆕 새로운 Service Worker 설치됨');
                  // 필요시 사용자에게 새로고침 알림 가능
                }
              });
            }
          });
        })
        .catch((error) => {
          console.warn('⚠️ Service Worker 등록 실패:', error);
        });
    } else {
      console.log('ℹ️ Service Worker 미지원 또는 개발 모드');
    }
  }, []);

  return null; // UI 렌더링 없음
}

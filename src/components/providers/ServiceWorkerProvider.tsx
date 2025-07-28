'use client';

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 🆕 완전한 전역 오류 핸들러 - 모든 메시지 포트 오류 차단
      const handleGlobalError = (event: ErrorEvent) => {
        const errorMessage = event.message || '';
        if (errorMessage.includes('message port closed') || 
            errorMessage.includes('port closed') ||
            errorMessage.includes('The message port closed')) {
          console.log('Message port error handled and suppressed');
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      };
      
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const reason = event.reason;
        if (reason && typeof reason === 'string' && 
            (reason.includes('message port closed') || 
             reason.includes('port closed') ||
             reason.includes('The message port closed'))) {
          console.log('Promise rejection for message port handled');
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        
        // 다른 타입의 rejection도 안전하게 처리
        if (reason && typeof reason === 'object' && reason.message &&
            reason.message.includes('port closed')) {
          console.log('Object-type message port rejection handled');
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      };
      
      // 🆕 런타임 오류도 처리
      const handleRuntimeError = () => {
        // Chrome 확장 프로그램 관련 오류 무시
        if (chrome && chrome.runtime && chrome.runtime.lastError) {
          const error = chrome.runtime.lastError;
          if (error.message && error.message.includes('message port closed')) {
            console.log('Chrome runtime error suppressed');
            return;
          }
        }
      };
      
      window.addEventListener('error', handleGlobalError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      
      // 🆕 Chrome 확장 프로그램 오류 처리
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        setInterval(handleRuntimeError, 1000);
      }

      // Service Worker 등록 (안전한 버전)
      if ('serviceWorker' in navigator) {
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
                    console.log('New AICAMP version available');
                  }
                });
              }
            });
            
          })
          .catch((error) => {
            // Service Worker 등록 실패도 안전하게 처리
            if (!error.message.includes('port closed')) {
              console.log('Service Worker registration failed (safe):', error);
            }
          });
      }

      // 🆕 정리 함수 - 메모리 누수 방지
      return () => {
        window.removeEventListener('error', handleGlobalError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, []);

  return null;
} 
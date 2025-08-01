'use client';

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 🆕 완전한 전역 오류 핸들러 - 모든 메시지 포트 오류 차단
      const handleGlobalError = (event: ErrorEvent) => {
        const errorMessage = event.message || '';
        const errorSource = event.filename || '';
        
        // 메시지 포트 및 확장 프로그램 관련 오류 처리
        if (errorMessage.includes('message port closed') || 
            errorMessage.includes('port closed') ||
            errorMessage.includes('The message port closed') ||
            errorMessage.includes('runtime.lastError') ||
            errorMessage.includes('Unchecked runtime.lastError') ||
            errorMessage.includes('Extension context invalidated')) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        
        // Chrome 확장 프로그램 관련 오류 처리
        if (errorSource.includes('extension://') || 
            errorSource.includes('chrome-extension://') ||
            errorMessage.includes('Extension context invalidated') ||
            errorMessage.includes('chrome-extension://') ||
            errorMessage.includes('content.js') ||
            errorMessage.includes('content_script')) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        
        // 추가 확장 프로그램 스크립트 오류 처리
        if (errorSource.includes('injected.js') || 
            errorSource.includes('inject.js') ||
            errorMessage.includes('Cannot access') ||
            errorMessage.includes('Script error')) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      };
      
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const reason = event.reason;
        
        // 문자열 타입 오류 처리
        if (reason && typeof reason === 'string') {
          if (reason.includes('message port closed') || 
              reason.includes('port closed') ||
              reason.includes('The message port closed') ||
              reason.includes('runtime.lastError') ||
              reason.includes('Extension context invalidated') ||
              reason.includes('chrome-extension://')) {
            console.log('Promise rejection for extension/port error suppressed');
            event.preventDefault();
            event.stopPropagation();
            return;
          }
        }
        
        // 객체 타입 오류 처리
        if (reason && typeof reason === 'object' && reason.message) {
          if (reason.message.includes('port closed') ||
              reason.message.includes('message port closed') ||
              reason.message.includes('runtime.lastError') ||
              reason.message.includes('Extension context')) {
            console.log('Object-type extension error rejection suppressed');
            event.preventDefault();
            event.stopPropagation();
            return;
          }
        }
        
        // Error 객체 타입 처리
        if (reason instanceof Error && reason.message) {
          if (reason.message.includes('port closed') ||
              reason.message.includes('message port closed') ||
              reason.message.includes('runtime.lastError')) {
            console.log('Error object extension rejection suppressed');
            event.preventDefault();
            event.stopPropagation();
            return;
          }
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
      
      // 🆕 Chrome 확장 프로그램 오류 처리 (안전한 버전)
      let runtimeErrorInterval: NodeJS.Timeout | null = null;
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        runtimeErrorInterval = setInterval(() => {
          try {
            handleRuntimeError();
          } catch (e) {
            // 오류 처리 중 발생하는 오류도 무시
          }
        }, 2000); // 2초로 간격 증가
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
        if (runtimeErrorInterval) {
          clearInterval(runtimeErrorInterval);
        }
      };
    }
  }, []);

  return null;
} 
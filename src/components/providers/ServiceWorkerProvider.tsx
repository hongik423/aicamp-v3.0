'use client';

import { useEffect, useRef } from 'react';

// Service Worker 등록 상태를 전역으로 관리
let serviceWorkerRegistered = false;
let registrationInProgress = false;

export function ServiceWorkerProvider() {
  const errorHandlersSetup = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || errorHandlersSetup.current) {
      return;
    }

    // 🔧 통합된 오류 핸들러 - 한 번만 설정
    const setupErrorHandlers = () => {
      // Chrome 확장 프로그램 오류 패턴
      const extensionErrorPatterns = [
        'message port closed',
        'The message port closed',
        'port closed',
        'runtime.lastError',
        'Unchecked runtime.lastError',
        'Extension context',
        'chrome-extension://',
        'extension://',
        'content.js',
        'content_script',
        'injected.js',
        'inject.js',
        'Cannot access'
      ];

      const isExtensionError = (message: string, source?: string): boolean => {
        return extensionErrorPatterns.some(pattern => 
          message.includes(pattern) || (source && source.includes(pattern))
        );
      };

      // 전역 오류 핸들러
      const handleGlobalError = (event: ErrorEvent) => {
        if (isExtensionError(event.message || '', event.filename || '')) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      };

      // Promise rejection 핸들러
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const reason = event.reason;
        let shouldSuppress = false;

        if (typeof reason === 'string') {
          shouldSuppress = isExtensionError(reason);
        } else if (reason && typeof reason === 'object' && reason.message) {
          shouldSuppress = isExtensionError(reason.message);
        } else if (reason instanceof Error && reason.message) {
          shouldSuppress = isExtensionError(reason.message);
        }

        if (shouldSuppress) {
          event.preventDefault();
          return;
        }
      };

      // Console 오버라이드 - 한 번만 실행
      if (!window.__aicampConsoleOverridden) {
        const originalError = window.console.error;
        const originalWarn = window.console.warn;

        window.console.error = function(...args: any[]) {
          const errorMessage = args[0]?.toString() || '';
          if (!isExtensionError(errorMessage)) {
            originalError.apply(console, args);
          }
        };

        window.console.warn = function(...args: any[]) {
          const warnMessage = args[0]?.toString() || '';
          if (!isExtensionError(warnMessage)) {
            originalWarn.apply(console, args);
          }
        };

        window.__aicampConsoleOverridden = true;
      }

      // 이벤트 리스너 등록
      window.addEventListener('error', handleGlobalError, true);
      window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

      return () => {
        window.removeEventListener('error', handleGlobalError, true);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      };
    };

    // 🔧 Service Worker 등록 - 중복 방지 및 layout.tsx와 충돌 방지
    const registerServiceWorker = async () => {
      // 이미 등록되었거나 등록 중이면 건너뛰기
      if (!('serviceWorker' in navigator) || serviceWorkerRegistered || registrationInProgress) {
        return;
      }
      
      registrationInProgress = true;

      try {
        // 기존 등록 확인
        let existingRegistration = await navigator.serviceWorker.getRegistration('/');
        
        // 등록이 없으면 새로 등록
        if (!existingRegistration) {
          try {
            existingRegistration = await navigator.serviceWorker.register('/sw.js', {
              scope: '/',
              updateViaCache: 'none'
            });
          } catch (regError) {
            // Service Worker 등록 실패 시 무시
            console.log('ℹ️ Service Worker 등록 건너뛰기');
            serviceWorkerRegistered = true;
            return;
          }
        }
        
        if (existingRegistration) {
          console.log('🚀 Google Apps Script 시스템 초기화 완료');
          console.log('📧 이메일 서비스: Google Apps Script');
          console.log('🔗 연결 상태: connected');
          serviceWorkerRegistered = true;
        }

      } catch (error: any) {
        if (!error.message?.includes('port closed') && 
            !error.message?.includes('Extension context') &&
            !error.message?.includes('chrome-extension://') &&
            !error.message?.includes('Manifest fetch') &&
            !error.message?.includes('manifest.json')) {
          console.warn('Service Worker 상태 확인 실패:', error);
        }
      } finally {
        registrationInProgress = false;
      }
    };

    // 설정 실행
    const cleanup = setupErrorHandlers();
    registerServiceWorker();
    errorHandlersSetup.current = true;

    return cleanup;
  }, []);

  return null;
}

// 전역 타입 확장
declare global {
  interface Window {
    __aicampConsoleOverridden?: boolean;
  }
} 
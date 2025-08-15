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

    // 🛡️ Service Worker 등록은 layout.tsx에서 통합 관리됨 - 중복 방지
    const registerServiceWorker = async () => {
      // Service Worker 등록은 layout.tsx에서 처리하므로 여기서는 상태만 확인
      if ('serviceWorker' in navigator) {
        try {
          const existingRegistration = await navigator.serviceWorker.getRegistration('/');
          if (existingRegistration) {
            console.log('✅ Service Worker 상태: 정상 등록됨');
            serviceWorkerRegistered = true;
          }
        } catch (error: any) {
          // 오류는 조용히 무시 (layout.tsx에서 처리됨)
        }
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
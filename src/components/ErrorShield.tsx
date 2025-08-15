'use client'

import { useEffect, useRef } from 'react';

// 🛡️ 이교장의AI역량진단보고서 전역 오류 차단 시스템
export default function ErrorShield() {
  const shieldInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || shieldInitialized.current) {
      return;
    }

    console.log('🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 활성화');
    shieldInitialized.current = true;

    // 원본 console 메서드 백업
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleLog = console.log;

    // 차단할 오류 패턴들
    const blockedPatterns = [
      // Chrome Extension 관련
      'Extension context invalidated',
      'port closed',
      'chrome-extension://',
      'content.js',
      'runtime.lastError',
      'The message port closed',
      
      // Manifest 관련
      'Manifest fetch',
      'manifest.json',
      'manifest.webmanifest',
      'Failed to load resource',
      
      // Service Worker 관련
      'service-worker',
      'sw.js',
      
      // 기타 외부 오류
      'net::ERR_',
      'ERR_INTERNET_DISCONNECTED',
      'ERR_NETWORK_CHANGED'
    ];

    // 오류 메시지 필터링 함수
    const shouldBlockError = (message: string): boolean => {
      return blockedPatterns.some(pattern => 
        message.toLowerCase().includes(pattern.toLowerCase())
      );
    };

    // Console 오류 필터링
    console.error = (...args: any[]) => {
      const message = args.join(' ');
      if (shouldBlockError(message)) {
        // 차단된 오류는 조용히 무시
        return;
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      const message = args.join(' ');
      if (shouldBlockError(message)) {
        // 차단된 경고는 조용히 무시
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // 전역 오류 핸들러
    const handleGlobalError = (event: ErrorEvent) => {
      const message = event.message || '';
      const filename = event.filename || '';
      const source = event.error?.stack || '';

      // Chrome Extension 오류 차단
      if (filename.includes('chrome-extension://') ||
          message.includes('Extension context') ||
          message.includes('port closed') ||
          source.includes('chrome-extension://')) {
        event.preventDefault();
        return false;
      }

      // Manifest 오류 차단
      if (message.includes('Manifest fetch') ||
          message.includes('manifest.json') ||
          message.includes('401')) {
        event.preventDefault();
        return false;
      }

      // Service Worker 오류 차단
      if (message.includes('service-worker') ||
          filename.includes('sw.js')) {
        event.preventDefault();
        return false;
      }

      // 네트워크 오류 차단
      if (message.includes('Failed to load resource') ||
          message.includes('net::ERR_')) {
        event.preventDefault();
        return false;
      }

      // 실제 오류인 경우 로깅
      console.warn('🚨 실제 오류 감지:', {
        message: message.substring(0, 100),
        filename: filename.substring(0, 50),
        lineno: event.lineno,
        colno: event.colno
      });

      return true;
    };

    // 처리되지 않은 Promise 거부 핸들러
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || event.reason || '';
      
      if (typeof reason === 'string') {
        // Chrome Extension 오류 차단
        if (reason.includes('port closed') ||
            reason.includes('Extension context') ||
            reason.includes('chrome-extension://')) {
          event.preventDefault();
          return false;
        }

        // Manifest 오류 차단
        if (reason.includes('manifest.webmanifest') ||
            reason.includes('Failed to load resource') ||
            reason.includes('401')) {
          event.preventDefault();
          return false;
        }

        // Service Worker 오류 차단
        if (reason.includes('service-worker') ||
            reason.includes('sw.js')) {
          event.preventDefault();
          return false;
        }
      }

      // 실제 오류인 경우 로깅
      console.warn('🚨 처리되지 않은 Promise 거부:', {
        reason: String(reason).substring(0, 100)
      });

      return true;
    };

    // Fetch 오버라이드 (추가 보호)
    const originalFetch = window.fetch;
    window.fetch = function(url: RequestInfo | URL, ...args: any[]) {
      const urlString = typeof url === 'string' ? url : url.toString();
      
      // Manifest 요청 특별 처리
      if (urlString.includes('manifest.webmanifest') || 
          urlString.includes('manifest.json') ||
          urlString.includes('/api/manifest')) {
        return originalFetch.apply(this, [url, ...args]).catch(error => {
          // Manifest 오류는 기본 응답으로 대체
          return new Response(JSON.stringify({
            "name": "AI역량진단",
            "short_name": "AI진단",
            "start_url": "/",
            "display": "browser",
            "background_color": "#ffffff",
            "theme_color": "#3b82f6"
          }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/manifest+json' } 
          });
        });
      }

      return originalFetch.apply(this, [url, ...args]);
    };

    // 이벤트 리스너 등록
    window.addEventListener('error', handleGlobalError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

    // 정리 함수 반환
    return () => {
      console.log('🛡️ 오류 차단 시스템 정리');
      
      // 원본 console 메서드 복원
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.log = originalConsoleLog;
      
      // 원본 fetch 복원
      window.fetch = originalFetch;
      
      // 이벤트 리스너 제거
      window.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
    };
  }, []);

  // 개발 모드에서 차단 상태 표시
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-2 right-2 bg-green-50 border border-green-200 rounded px-2 py-1 text-xs text-green-600 z-50 font-mono">
        🛡️ 오류 차단 활성
      </div>
    );
  }

  return null;
}

// 전역 타입 확장
declare global {
  interface Window {
    __errorShieldActive?: boolean;
  }
}

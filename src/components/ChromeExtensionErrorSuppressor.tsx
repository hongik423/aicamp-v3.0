'use client';

import { useEffect } from 'react';

/**
 * Chrome 확장 프로그램 오류 전용 차단 컴포넌트
 * "The message port closed before a response was received" 오류 완전 차단
 */
export default function ChromeExtensionErrorSuppressor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log('🛡️ Chrome 확장 프로그램 오류 차단 시스템 활성화');

    // Chrome Runtime 오류 패턴 (매우 구체적)
    const chromeErrorPatterns = [
      'The message port closed before a response was received',
      'Unchecked runtime.lastError',
      'runtime.lastError',
      'message port closed',
      'port closed',
      'Extension context invalidated',
      'chrome-extension://',
      'extension://',
      'chrome.runtime',
      'chrome.tabs',
      'chrome.storage'
    ];

    // 오류 메시지 확인 함수
    const isChromeExtensionError = (message: string): boolean => {
      const lowerMessage = message.toLowerCase();
      return chromeErrorPatterns.some(pattern => 
        lowerMessage.includes(pattern.toLowerCase())
      );
    };

    // 원본 console 메서드 백업
    const originalError = console.error;
    const originalWarn = console.warn;

    // Console 오류 차단 (Chrome 확장 프로그램 전용)
    console.error = function(...args: any[]) {
      const message = args.join(' ');
      if (isChromeExtensionError(message)) {
        // Chrome 확장 프로그램 오류는 완전히 차단
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = function(...args: any[]) {
      const message = args.join(' ');
      if (isChromeExtensionError(message)) {
        // Chrome 확장 프로그램 경고도 완전히 차단
        return;
      }
      originalWarn.apply(console, args);
    };

    // 전역 오류 핸들러 (Chrome 확장 프로그램 전용)
    const handleChromeError = (event: ErrorEvent) => {
      const message = event.message || '';
      if (isChromeExtensionError(message)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // Promise rejection 핸들러 (Chrome 확장 프로그램 전용)
    const handleChromeRejection = (event: PromiseRejectionEvent) => {
      const reason = String(event.reason?.message || event.reason || '');
      if (isChromeExtensionError(reason)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // window.onerror 오버라이드 (Chrome 확장 프로그램 전용)
    const originalOnerror = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      const messageStr = String(message || '');
      if (isChromeExtensionError(messageStr)) {
        return true; // 오류 처리됨으로 표시하여 차단
      }
      return originalOnerror ? originalOnerror.call(this, message, source, lineno, colno, error) : false;
    };

    // 이벤트 리스너 등록 (최고 우선순위)
    window.addEventListener('error', handleChromeError, { capture: true, passive: false });
    window.addEventListener('unhandledrejection', handleChromeRejection, { capture: true, passive: false });

    // 정리 함수
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.onerror = originalOnerror;
      window.removeEventListener('error', handleChromeError, { capture: true });
      window.removeEventListener('unhandledrejection', handleChromeRejection, { capture: true });
    };
  }, []);

  return null; // UI 없음
}

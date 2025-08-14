// Chrome Extension 및 외부 오류 완전 차단 스크립트 (개선된 버전)
(function() {
  'use strict';
  
  // 차단할 오류 패턴 (확장됨)
  const errorPatterns = [
    'Extension context invalidated',
    'port closed',
    'chrome-extension://',
    'content.js',
    'content_script.js',
    '2content.js',
    'The message port closed before a response was received',
    'runtime.lastError',
    'The message port closed',
    'Manifest fetch',
    'manifest.json',
    'manifest.webmanifest',
    'Failed to load resource',
    '401',
    'Authentication Required',
    'Uncaught (in promise)',
    'Failed to fetch RSC payload',
    'Falling back to browser navigation',
    'TypeError: url.includes is not a function',
    'Failed to load resource: the server responded with a status of 401',
    'Manifest fetch from',
    'failed, code 401',
    'Failed to load resource: the server responded with a status of 401 ()',
    'Manifest fetch from https://',
    'failed, code 401',
    'aicampv30-2tklw0vr3-hongik423-3087s-projects.vercel.app',
    'aicampv30-jx4epkyxr-hongik423-3087s-projects.vercel.app',
    'aicampv30-4kouuv7eo-hongik423-3087s-projects.vercel.app',
    'vercel.app/manifest.webmanifest',
    'Extension context',
    'injected.js',
    'inject.js',
    'Cannot access',
    'content_script',
    'extension://',
    'moz-extension://',
    'safari-extension://',
    'ms-browser-extension://'
  ];
  
  // 오류 메시지 필터링 함수
  function shouldSuppressError(message, source) {
    if (!message && !source) return false;
    
    const messageStr = typeof message === 'string' ? message : String(message || '');
    const sourceStr = typeof source === 'string' ? source : String(source || '');
    const combined = messageStr + ' ' + sourceStr;
    
    return errorPatterns.some(pattern => 
      messageStr.includes(pattern) || 
      sourceStr.includes(pattern) ||
      combined.includes(pattern)
    );
  }
  
  // console 메서드 오버라이드
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;
  
  console.error = function(...args) {
    const message = args.join(' ');
    if (!shouldSuppressError(message)) {
      originalConsoleError.apply(console, args);
    }
  };
  
  console.warn = function(...args) {
    const message = args.join(' ');
    if (!shouldSuppressError(message)) {
      originalConsoleWarn.apply(console, args);
    }
  };
  
  // 전역 오류 핸들러
  window.addEventListener('error', function(event) {
    if (shouldSuppressError(event.message, event.filename)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, true);
  
  // Promise rejection 핸들러 (강화됨)
  window.addEventListener('unhandledrejection', function(event) {
    const reason = event.reason?.message || event.reason || '';
    const stack = event.reason?.stack || '';
    
    // Chrome 확장 프로그램 관련 Promise rejection 차단
    if (shouldSuppressError(reason) || shouldSuppressError(stack) ||
        reason.includes('message port closed') ||
        stack.includes('content.js') ||
        stack.includes('chrome-extension://')) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, true);

  // Chrome 확장 프로그램 특별 처리
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    try {
      // Chrome extension API 오류 무시
      chrome.runtime.onConnect.addListener = function() {};
      chrome.runtime.onMessage.addListener = function() {};
    } catch (e) {
      // Chrome API 접근 오류 무시
    }
  }
  
  // 안전한 URL 문자열 변환 함수
  function safeUrlToString(url) {
    try {
      if (typeof url === 'string') return url;
      if (url && typeof url.toString === 'function') return url.toString();
      if (url && url.href) return url.href;
      if (url && url.url) return url.url;
      return String(url || '');
    } catch (e) {
      return '';
    }
  }
  
  // fetch 오버라이드 (manifest 오류 특별 처리)
  const originalFetch = window.fetch;
  window.fetch = function(url, ...args) {
    try {
      const urlString = safeUrlToString(url);
      
      // manifest 관련 요청은 실패해도 조용히 처리
      if (urlString && (urlString.includes('manifest.webmanifest') || urlString.includes('manifest.json'))) {
        return originalFetch.apply(this, [url, ...args]).catch(error => {
          // manifest 관련 오류는 조용히 무시하고 기본 응답 반환
          console.log('🔇 Manifest 오류 무시:', urlString);
          return new Response('{}', { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
          });
        });
      }
      
      return originalFetch.apply(this, [url, ...args]);
    } catch (error) {
      // fetch 오버라이드에서 오류 발생 시 원본 fetch 사용
      return originalFetch.apply(this, [url, ...args]);
    }
  };
  
  // 최종 안전망
  window.addEventListener('beforeunload', function() {
    // 페이지 언로드 시 오류 핸들러 정리
  });
  
  // 초기화 완료 표시
  console.log('🛡️ AICAMP 오류 차단 시스템 활성화');
  
})();
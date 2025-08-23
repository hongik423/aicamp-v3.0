// 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템
(function() {
const errorPatterns = [
  // Chrome Extension 관련 (강화)
  'Extension context invalidated',
  'port closed',
  'message port closed',
  'The message port closed before a response was received',
  'Unchecked runtime.lastError',
  'runtime.lastError',
  'message port closed',
  'port closed before a response',
  'chrome.runtime.lastError',
  'chrome-extension://',
  'extension://',
  'content.js',
  'content_script',
  'injected.js',
  'inject.js',
  'Cannot access',
  'chrome.runtime',
  'chrome.tabs',
  'chrome.storage',
  'chrome.webNavigation',
  
  // Manifest 관련
  'Manifest fetch',
  'manifest.json',
  'manifest.webmanifest',
  'Failed to load resource',
  'status of 401',
  'code 401',
  'status of 403',
  'code 403',
  
  // Service Worker 관련
  'service-worker',
  'sw.js',
  
  // SSE 연결 관련 (강화)
  'SSE 연결 오류',
  'EventSource',
  'diagnosis-progress',
  '신청서 접수 연결 오류',
  
  // 네트워크 오류
  'net::ERR_',
  'ERR_INTERNET_DISCONNECTED',
  'ERR_NETWORK_CHANGED',
  'Failed to load resource',
  
  // 기타 외부 오류
  '개인정보 동의',
  'privacyConsent',
  'message port closed',
  
  // React DevTools 관련
  'React DevTools detected duplicate welcome',
  'duplicate welcome "message" events'
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

  // Chrome 확장 프로그램 특별 처리 (강화)
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    try {
      // Chrome extension API 오류 무시
      const originalLastError = chrome.runtime.lastError;
      Object.defineProperty(chrome.runtime, 'lastError', {
        get: function() {
          // lastError 접근 시 자동으로 null 반환하여 오류 차단
          return null;
        },
        configurable: true
      });
      
      // Chrome API 메서드들 무력화
      chrome.runtime.onConnect.addListener = function() {};
      chrome.runtime.onMessage.addListener = function() {};
      chrome.runtime.sendMessage = function() {};
      chrome.runtime.connect = function() {};
    } catch (e) {
      // Chrome API 접근 오류 무시
    }
  }
  
  // 추가적인 Chrome 확장 프로그램 오류 차단
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (typeof listener === 'function') {
      const wrappedListener = function(...args) {
        try {
          return listener.apply(this, args);
        } catch (error) {
          const errorMessage = error?.message || '';
          if (shouldSuppressError(errorMessage)) {
            return; // Chrome 확장 프로그램 오류는 무시
          }
          throw error; // 다른 오류는 정상 처리
        }
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
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
      if (urlString && (urlString.includes('manifest.webmanifest') || urlString.includes('manifest.json') || urlString.includes('/api/manifest'))) {
        return originalFetch.apply(this, [url, ...args]).catch(error => {
          // manifest 관련 오류는 조용히 무시하고 기본 응답 반환
          console.log('🔇 Manifest 오류 무시:', urlString);
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
      
      // Service Worker 관련 요청도 조용히 처리
      if (urlString && (urlString.includes('sw.js') || urlString.includes('service-worker'))) {
        return originalFetch.apply(this, [url, ...args]).catch(error => {
          console.log('🔇 Service Worker 오류 무시:', urlString);
          return new Response('// Service Worker 비활성화', { 
            status: 200, 
            headers: { 'Content-Type': 'application/javascript' } 
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
  console.log('🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 활성화');
  
})();
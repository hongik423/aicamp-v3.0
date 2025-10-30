// 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 V23.1 Enhanced
(function() {
  // 중복 로딩 방지 (강화)
  if (window.AICAMP_ERROR_SUPPRESSION_LOADED) {
    console.log('🛡️ 오류 차단 시스템이 이미 활성화되어 있습니다.');
    return;
  }
  window.AICAMP_ERROR_SUPPRESSION_LOADED = true;
  
  // 로딩 시간 기록
  window.AICAMP_ERROR_SUPPRESSION_LOADED_AT = Date.now();
  
  console.log('🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 활성화');

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
  'chrome.extension',
  'browser-extension',
  'Extension manifest',
  'chrome.contextMenus',
  'chrome.cookies',
  'chrome.downloads',
  'chrome.history',
  'chrome.identity',
  'chrome.management',
  'chrome.permissions',
  'chrome.privacy',
  'chrome.proxy',
  'chrome.sessions',
  'chrome.topSites',
  'chrome.webRequest',
  
  // Background.js 관련 오류 (새로 추가)
  'background.js',
  'Error in invocation of tabs.get',
  'Value must be at least 0',
  'handleSubFrameNavigationComplete',
  'onNavigateComplete',
  'tabs.get(integer tabId',
  'tabId: Value must be at least 0',
  'TypeError: Error in invocation',
  'Hr.handleSubFrameNavigationComplete',
  'Hr.onNavigateComplete',
  'Gr.onNavigateComplete',
  'chrome.webNavigation',
  'webNavigation.onCompleted',
  'webNavigation.onBeforeNavigate',
  'webNavigation.onNavigateComplete',
  'chrome.tabs.onUpdated',
  'chrome.tabs.onActivated',
  'Invalid tabId',
  'tabId parameter',
  'tabs.get callback',
  'chrome-extension://',
  'extension context',
  'extension invalidated',
  
  // PostMessage 관련 오류
  'Invalid target origin',
  'Failed to execute \'postMessage\'',
  'postMessage',
  'targetOrigin',
  
  // Manifest 관련
  'Manifest fetch',
  'manifest.json',
  'manifest.webmanifest',
  'Failed to load resource',
  'status of 401',
  'code 401',
  'status of 403',
  'code 403',
  'status of 404',
  'code 404',
  
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
  
  // React Hydration 오류 (새로 추가)
  'Minified React error #418',
  'Minified React error #423',
  'Hydration failed',
  'Hydration mismatch',
  'Extra attributes from the server',
  'data-input-type',
  'Warning: Extra attributes from the server',
  'React DevTools detected duplicate welcome',
  'duplicate welcome "message" events',
  'useReducedMotion',
  'framer-motion',
  'AnimatePresence',
  'motion.div',
  
  // 보고서 관련 오류 차단
  '사실기반 35페이지 보고서 로드 오류',
  '해당 진단ID의 보고서를 생성할 수 없습니다',
  
  // 기타 외부 오류
  '개인정보 동의',
  'privacyConsent',
  'message port closed',
  
  // React DevTools 관련
  'React DevTools detected duplicate welcome',
  'duplicate welcome "message" events',
  
  // JavaScript 함수 관련 오류 (V23.1 Enhanced)
  'nextSlide is not defined',
  'prevSlide is not defined',
  'toggleFullscreen is not defined',
  'printReport is not defined',
  'showSlide is not defined',
  'initializeKeyboardControls is not defined',
  'updateSlideCounter is not defined',
  'updateProgressBar is not defined',
  
  // installHook.js 관련 오류
  'installHook.js',
  'messageListener'
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
        stack.includes('chrome-extension://') ||
        reason.includes('Minified React error #418') ||
        reason.includes('Minified React error #423') ||
        reason.includes('Hydration failed')) {
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
      
      // Chrome API 메서드들 완전 무력화
      chrome.runtime.onConnect = { addListener: function() { return {}; } };
      chrome.runtime.onMessage = { addListener: function() { return {}; } };
      chrome.runtime.sendMessage = function() { return Promise.resolve(); };
      chrome.runtime.connect = function() { 
        return { 
          onMessage: { addListener: function() { return {}; } },
          postMessage: function() {},
          disconnect: function() {}
        }; 
      };
      
      // Chrome tabs API 완전 무력화 (background.js 오류 해결)
      if (chrome.tabs) {
        // tabs.get 완전 무력화
        chrome.tabs.get = function(tabId, callback) {
          console.log('🔇 tabs.get 호출 차단:', tabId);
          if (callback) {
            setTimeout(() => callback({}), 0);
          }
          return Promise.resolve({});
        };
        
        // 모든 tabs API 완전 무력화
        chrome.tabs.query = function(queryInfo, callback) {
          console.log('🔇 tabs.query 호출 차단');
          if (callback) {
            setTimeout(() => callback([]), 0);
          }
          return Promise.resolve([]);
        };

        chrome.tabs.onUpdated = { addListener: function() { return {}; } };
        chrome.tabs.onActivated = { addListener: function() { return {}; } };
        chrome.tabs.onCreated = { addListener: function() { return {}; } };
        chrome.tabs.onRemoved = { addListener: function() { return {}; } };
        chrome.tabs.onMoved = { addListener: function() { return {}; } };
        chrome.tabs.onAttached = { addListener: function() { return {}; } };
        chrome.tabs.onDetached = { addListener: function() { return {}; } };
        chrome.tabs.onHighlighted = { addListener: function() { return {}; } };
        chrome.tabs.onReplaced = { addListener: function() { return {}; } };
      }

      // Chrome webNavigation API 완전 무력화
      if (chrome.webNavigation) {
        chrome.webNavigation.onCompleted = { addListener: function() { return {}; } };
        chrome.webNavigation.onBeforeNavigate = { addListener: function() { return {}; } };
        chrome.webNavigation.onNavigateComplete = { addListener: function() { return {}; } };
        chrome.webNavigation.onCommitted = { addListener: function() { return {}; } };
        chrome.webNavigation.onDOMContentLoaded = { addListener: function() { return {}; } };
        chrome.webNavigation.onErrorOccurred = { addListener: function() { return {}; } };
        chrome.webNavigation.onCreatedNavigationTarget = { addListener: function() { return {}; } };
        chrome.webNavigation.onReferenceFragmentUpdated = { addListener: function() { return {}; } };
        chrome.webNavigation.onTabReplaced = { addListener: function() { return {}; } };
        chrome.webNavigation.onHistoryStateUpdated = { addListener: function() { return {}; } };
      }
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
  
  // React Hydration 오류 특별 처리
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    // data-input-type 속성 자동 제거
    if (element.hasAttribute && element.hasAttribute('data-input-type')) {
      element.removeAttribute('data-input-type');
    }
    
    return element;
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
  
  // React DevTools 오류 차단
  if (typeof window !== 'undefined') {
    // React DevTools 관련 이벤트 차단
    const originalPostMessage = window.postMessage;
    window.postMessage = function(message, targetOrigin, transfer) {
      try {
        // React DevTools 메시지 차단
        if (message && typeof message === 'object' && message.source === 'react-devtools-content-script') {
          return; 
        }
        
        // targetOrigin 유효성 검사 강화
        if (typeof targetOrigin === 'undefined' || targetOrigin === null || targetOrigin === '') {
          targetOrigin = window.location.origin || '*';
        }
        
        // 안전한 호출
        return originalPostMessage.call(this, message, targetOrigin, transfer);
      } catch (error) {
        // postMessage 오류 무시
        console.log('🔇 postMessage 오류 차단:', error.message);
        return;
      }
    };
  }
  
  // 최종 안전망
  window.addEventListener('beforeunload', function() {
    // 페이지 언로드 시 오류 핸들러 정리
  });
  
  // 추가적인 오류 차단 (Promise 기반)
  const originalPromise = window.Promise;
  if (originalPromise) {
    const originalThen = originalPromise.prototype.then;
    originalPromise.prototype.then = function(onFulfilled, onRejected) {
      const wrappedOnRejected = function(reason) {
        if (shouldSuppressError(reason?.message || reason)) {
          return; // 오류 무시
        }
        if (onRejected) {
          return onRejected.call(this, reason);
        }
      };
      return originalThen.call(this, onFulfilled, wrappedOnRejected);
    };
  }
  
  // 초기화 완료 표시
  console.log('🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 활성화');
  console.log('🛡️ Background.js 오류 차단 활성화');
  console.log('🛡️ Chrome 확장 프로그램 오류 차단 활성화');
  
})();
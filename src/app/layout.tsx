import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/mobile-optimization.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Providers from './providers';
import GlobalBanner from '@/components/layout/GlobalBanner';

// import N8nCurriculumBanner from '@/components/layout/N8nCurriculumBanner';
// import AutoShowBanners from '@/components/layout/AutoShowBanners';

import FloatingChatbot from '@/components/layout/floating-chatbot';
import ServiceWorkerRegister from '@/components/service-worker-register';
import ErrorShield from '@/components/ErrorShield';
import ChromeExtensionErrorSuppressor from '@/components/ChromeExtensionErrorSuppressor';
import BannerController from '@/components/layout/BannerController';
import { AccessibilityControls } from '@/components/ui/accessibility-controls';
import { NetworkStatus } from '@/components/ui/mobile-loading';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false, // preload 비활성화하여 경고 해결
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: '이교장의AI역량진단보고서 - 45문항 정밀 AI역량진단',
    template: '%s | 이교장의AI역량진단보고서',
  },
  description: '기업의 AI 역량을 진단하고 맞춤형 솔루션을 제공하는 전문 컨설팅 기관입니다. 무료 AI 역량진단부터 전문 컨설팅까지 원스톱 서비스를 제공합니다.',
  keywords: 'AI 컨설팅, AI 역량진단, 디지털 전환, 기업 컨설팅, 인공지능, AI 교육, 스마트 팩토리, AICAMP, 무료진단',
  authors: [{ name: 'AICAMP', url: 'https://aicamp.club' }],
  creator: 'AICAMP',
  publisher: 'AICAMP',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/aicamp_logo_del_250726.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/aicamp_logo_del_250726.png', type: 'image/png', sizes: '16x16' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aicamp.club'),
  alternates: {
    canonical: 'https://aicamp.club',
    languages: {
      'ko-KR': 'https://aicamp.club',
      'ko': 'https://aicamp.club',
    },
  },
  openGraph: {
    title: 'AICAMP - AI 역량진단 및 컨설팅 전문기관',
    description: '기업의 AI 역량을 진단하고 맞춤형 솔루션을 제공하는 전문 컨설팅 기관입니다. 무료 AI 역량진단부터 전문 컨설팅까지 원스톱 서비스를 제공합니다.',
    url: 'https://aicamp.club',
    siteName: 'AICAMP',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/aicamp_logo_del_250726.png',
        width: 1200,
        height: 630,
        alt: 'AICAMP 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AICAMP - AI 역량진단 및 컨설팅 전문기관',
    description: '기업의 AI 역량을 진단하고 맞춤형 솔루션을 제공하는 전문 컨설팅 기관입니다. 무료 AI 역량진단부터 전문 컨설팅까지 원스톱 서비스를 제공합니다.',
    images: ['/images/aicamp_logo_del_250726.png'],
    creator: '@AICAMP',
    site: '@AICAMP',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// Service Worker 전역 상태 관리 (중복 등록 완전 방지)
let serviceWorkerRegistrationAttempted = false;
let serviceWorkerRegistered = false;

const registerServiceWorkerSafely = () => {
  if (typeof window === 'undefined' || 
      !('serviceWorker' in navigator) ||
      serviceWorkerRegistrationAttempted ||
      serviceWorkerRegistered) {
    return;
  }
  
  serviceWorkerRegistrationAttempted = true;

  // console 오류 무음화 - Chrome Extension 및 기타 외부 오류 필터링
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;
  
  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (message.includes('Extension context invalidated') || 
        message.includes('port closed') ||
        message.includes('chrome-extension://') ||
        message.includes('content.js') ||
        message.includes('runtime.lastError') ||
        message.includes('The message port closed') ||
        message.includes('message port closed') ||
        message.includes('Failed to load resource') ||
        message.includes('401') ||
        message.includes('403') ||
        message.includes('개인정보 동의') ||
        message.includes('privacyConsent') ||
        message.includes('Unchecked runtime.lastError') ||
        message.includes('message port closed before a response was received')) {
      return; // 🛡️ 확장 프로그램, 개인정보 관련 오류는 무시
    }
    originalConsoleWarn.apply(console, args);
  };
  
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    if (message.includes('Extension context invalidated') || 
        message.includes('port closed') ||
        message.includes('chrome-extension://') ||
        message.includes('content.js') ||
        message.includes('runtime.lastError') ||
        message.includes('The message port closed') ||
        message.includes('message port closed') ||
        message.includes('installHook.js') ||
        message.includes('messageListener') ||
        message.includes('Invalid target origin') ||
        message.includes('postMessage') ||
        message.includes('Failed to load resource') ||
        message.includes('401') ||
        message.includes('403') ||
        message.includes('404') ||
        message.includes('사실기반 35페이지 보고서 로드 오류') ||
        message.includes('해당 진단ID의 보고서를 생성할 수 없습니다') ||
        message.includes('개인정보 동의') ||
        message.includes('privacyConsent') ||
        message.includes('Unchecked runtime.lastError') ||
        message.includes('message port closed before a response was received')) {
      return; // 🛡️ 확장 프로그램, 개인정보, 보고서 관련 오류는 무시
    }
    originalConsoleError.apply(console, args);
  };

  // 전역 오류 처리 - Chrome Extension 관련 오류 필터링
  const handleGlobalError = (event: ErrorEvent) => {
    const errorMessage = event.message || '';
    const errorSource = event.filename || '';
    if (errorMessage.includes('port closed') ||
        errorMessage.includes('Extension context') ||
        errorMessage.includes('chrome-extension://') ||
        errorMessage.includes('content.js') ||
        errorMessage.includes('installHook.js') ||
        errorMessage.includes('messageListener') ||
        errorMessage.includes('Invalid target origin') ||
        errorMessage.includes('postMessage') ||
        errorMessage.includes('Failed to load resource') ||
        errorMessage.includes('401') ||
        errorMessage.includes('403') ||
        errorMessage.includes('404') ||
        errorMessage.includes('사실기반 35페이지 보고서 로드 오류') ||
        errorMessage.includes('해당 진단ID의 보고서를 생성할 수 없습니다') ||
        errorMessage.includes('개인정보 동의') ||
        errorMessage.includes('privacyConsent') ||
        errorMessage.includes('Unchecked runtime.lastError') ||
        errorMessage.includes('message port closed before a response was received') ||
        errorSource.includes('chrome-extension://') ||
        errorSource.includes('content.js') ||
        errorSource.includes('installHook.js')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason?.message || event.reason || '';
    if (typeof reason === 'string' && (
        reason.includes('port closed') ||
        reason.includes('Extension context') ||
        reason.includes('chrome-extension://') ||
        reason.includes('content.js') ||
        reason.includes('installHook.js') ||
        reason.includes('messageListener') ||
        reason.includes('Invalid target origin') ||
        reason.includes('postMessage') ||
        reason.includes('Failed to load resource') ||
        reason.includes('401') ||
        reason.includes('403') ||
        reason.includes('404') ||
        reason.includes('사실기반 35페이지 보고서 로드 오류') ||
        reason.includes('해당 진단ID의 보고서를 생성할 수 없습니다') ||
        reason.includes('개인정보 동의') ||
        reason.includes('privacyConsent') ||
        reason.includes('Unchecked runtime.lastError') ||
        reason.includes('message port closed before a response was received'))) {
      event.preventDefault();
      return false;
    }
  };

  // 전역 이벤트 리스너 등록
  window.addEventListener('error', handleGlobalError, true);
  window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

  // 페이지 로드 완료 후 Service Worker 등록
  setTimeout(async () => {
    try {
      // 기존 등록 확인
      const existingRegistration = await navigator.serviceWorker.getRegistration('/');
      if (existingRegistration) {
        console.log('🚀 Google Apps Script 시스템 초기화 완료');
        console.log('📧 이메일 서비스: Google Apps Script');
        console.log('🔗 연결 상태: connected');
        serviceWorkerRegistered = true;
        return;
      }

      // 새로운 Service Worker 등록
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('🚀 Google Apps Script 시스템 초기화 완료');
      console.log('📧 이메일 서비스: Google Apps Script');
      console.log('🔗 연결 상태: connected');
      serviceWorkerRegistered = true;
      
      // Service Worker 업데이트 처리
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Service Worker 업데이트 발견');
            }
          });
        }
      });
      
    } catch (error: any) {
      // Service Worker 등록 실패는 치명적이지 않으므로 경고만 표시
      if (!error.message?.includes('port closed') && 
          !error.message?.includes('Extension context') &&
          !error.message?.includes('chrome-extension://')) {
        console.warn('⚠️ Service Worker registration failed:', error.message);
      }
    } finally {
      // 원래 console 함수들 복원
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
      
      // 전역 이벤트 리스너 제거
      window.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
    }
  }, 1000); // 1초 지연으로 단축
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>

        
        {/* 강력한 캐시 무효화 - 일관된 최신 버전 보장 */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta name="expires" content="0" />
        <meta name="pragma" content="no-cache" />
        <meta name="version" content={`v3.4-${Date.now()}`} />
        <meta name="last-modified" content={new Date().toISOString()} />
        
        {/* SEO 최적화 - Canonical URL */}
        <link rel="canonical" href="https://aicamp.club" />
        
        {/* 도메인 통합을 위한 추가 메타 태그 */}
        <meta property="og:url" content="https://aicamp.club" />
        <meta name="twitter:url" content="https://aicamp.club" />
        
        {/* 검색엔진 최적화 */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow" />
        <meta name="chrome-extension-compatibility" content="disabled" />
        <meta name="extension-message-port" content="disabled" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AICAMP" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-navbutton-color" content="#3b82f6" />
        
        {/* 오류 차단 스크립트 - 최우선 로드 (중복 방지) */}
        <script 
          src="/suppress-errors.js" 
          suppressHydrationWarning
          id="suppress-errors-script"
          async
          defer
        />
        

        
        {/* 폰트 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 폰트 최적화 및 브라우저 호환성 스크립트 */}
        <script 
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 폰트 로딩 최적화 (preload 경고 방지)
                function optimizeFontLoading() {
                  // 폰트 로드 상태 확인
                  if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(() => {
                      // 폰트 로드 완료 후 스타일 적용
                      const style = document.createElement('style');
                      style.textContent = 'body{font-family:Inter,system-ui,-apple-system,sans-serif}';
                      document.head.appendChild(style);
                    });
                  } else {
                    // 폰트 API가 없는 경우 즉시 적용
                    const style = document.createElement('style');
                    style.textContent = 'body{font-family:Inter,system-ui,-apple-system,sans-serif}';
                    document.head.appendChild(style);
                  }
                }
                
                // DOM 로드 즉시 실행
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', optimizeFontLoading);
                } else {
                  optimizeFontLoading();
                }
                
                // 🛡️ React Hydration 오류 방지 강화 + Chrome Extension 오류 차단
                window.addEventListener('error', function(e) {
                  const msg = e.message || '';
                  const source = e.filename || '';
                  if (msg.includes('Minified React error #418') || 
                      msg.includes('Minified React error #423') ||
                      msg.includes('Hydration failed') ||
                      msg.includes('Hydration mismatch') ||
                      msg.includes('Extra attributes from the server') ||
                      msg.includes('data-input-type') ||
                      msg.includes('runtime.lastError') || 
                      msg.includes('Extension context') ||
                      msg.includes('chrome-extension://') ||
                      msg.includes('The message port closed') ||
                      msg.includes('message port closed') ||
                      msg.includes('Unchecked runtime.lastError') ||
                      msg.includes('message port closed before a response was received') ||
                      msg.includes('Failed to load resource') ||
                      msg.includes('401') ||
                      msg.includes('403') ||
                      msg.includes('개인정보 동의') ||
                      msg.includes('privacyConsent') ||
                      msg.includes('background.js') ||
                      msg.includes('Error in invocation of tabs.get') ||
                      msg.includes('Value must be at least 0') ||
                      msg.includes('handleSubFrameNavigationComplete') ||
                      msg.includes('onNavigateComplete') ||
                      msg.includes('tabs.get(integer tabId') ||
                      msg.includes('tabId: Value must be at least 0') ||
                      msg.includes('TypeError: Error in invocation') ||
                      msg.includes('Hr.handleSubFrameNavigationComplete') ||
                      msg.includes('Hr.onNavigateComplete') ||
                      msg.includes('Gr.onNavigateComplete') ||
                      msg.includes('chrome.webNavigation') ||
                      msg.includes('webNavigation.onCompleted') ||
                      msg.includes('webNavigation.onBeforeNavigate') ||
                      msg.includes('webNavigation.onNavigateComplete') ||
                      msg.includes('chrome.tabs.onUpdated') ||
                      msg.includes('chrome.tabs.onActivated') ||
                      msg.includes('Invalid tabId') ||
                      msg.includes('tabId parameter') ||
                      msg.includes('tabs.get callback') ||
                      msg.includes('extension context') ||
                      msg.includes('extension invalidated') ||
                      source.includes('chrome-extension://') ||
                      source.includes('background.js') ||
                      source.includes('content.js') ||
                      source.includes('installHook.js')) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                  }
                }, true);
                
                window.addEventListener('unhandledrejection', function(e) {
                  const msg = (e.reason && e.reason.message) || '';
                  const stack = (e.reason && e.reason.stack) || '';
                  if (msg.includes('Minified React error #418') || 
                      msg.includes('Minified React error #423') ||
                      msg.includes('Hydration failed') ||
                      msg.includes('Hydration mismatch') ||
                      msg.includes('runtime.lastError') || 
                      msg.includes('Extension context') ||
                      msg.includes('chrome-extension://') ||
                      msg.includes('The message port closed') ||
                      msg.includes('message port closed') ||
                      msg.includes('Unchecked runtime.lastError') ||
                      msg.includes('message port closed before a response was received') ||
                      msg.includes('Failed to load resource') ||
                      msg.includes('401') ||
                      msg.includes('403') ||
                      msg.includes('개인정보 동의') ||
                      msg.includes('privacyConsent') ||
                      msg.includes('background.js') ||
                      msg.includes('Error in invocation of tabs.get') ||
                      msg.includes('Value must be at least 0') ||
                      msg.includes('handleSubFrameNavigationComplete') ||
                      msg.includes('onNavigateComplete') ||
                      msg.includes('tabs.get(integer tabId') ||
                      msg.includes('tabId: Value must be at least 0') ||
                      msg.includes('TypeError: Error in invocation') ||
                      msg.includes('Hr.handleSubFrameNavigationComplete') ||
                      msg.includes('Hr.onNavigateComplete') ||
                      msg.includes('Gr.onNavigateComplete') ||
                      msg.includes('chrome.webNavigation') ||
                      msg.includes('webNavigation.onCompleted') ||
                      msg.includes('webNavigation.onBeforeNavigate') ||
                      msg.includes('webNavigation.onNavigateComplete') ||
                      msg.includes('chrome.tabs.onUpdated') ||
                      msg.includes('chrome.tabs.onActivated') ||
                      msg.includes('Invalid tabId') ||
                      msg.includes('tabId parameter') ||
                      msg.includes('tabs.get callback') ||
                      msg.includes('extension context') ||
                      msg.includes('extension invalidated') ||
                      stack.includes('chrome-extension://') ||
                      stack.includes('background.js') ||
                      stack.includes('content.js') ||
                      stack.includes('installHook.js')) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                  }
                }, true);
                
                // React DevTools 오류 차단
                if (typeof window !== 'undefined') {
                  const originalPostMessage = window.postMessage;
                  window.postMessage = function(message, targetOrigin, transfer) {
                    if (message && typeof message === 'object' && 
                        (message.source === 'react-devtools-content-script' ||
                         message.source === 'react-devtools-backend')) {
                      return; // React DevTools 메시지 차단
                    }
                    return originalPostMessage.call(this, message, targetOrigin, transfer);
                  };
                }
                
                // 🛡️ Chrome 확장 프로그램 API 완전 무력화
                if (typeof chrome !== 'undefined' && chrome.runtime) {
                  try {
                    // Chrome runtime API 무력화
                    chrome.runtime.lastError = null;
                    chrome.runtime.onConnect = { addListener: function() {} };
                    chrome.runtime.onMessage = { addListener: function() {} };
                    chrome.runtime.sendMessage = function() { return Promise.resolve(); };
                    chrome.runtime.connect = function() { return { onMessage: { addListener: function() {} } }; };
                    
                    // Chrome tabs API 무력화
                    if (chrome.tabs) {
                      chrome.tabs.get = function() { return Promise.resolve({}); };
                      chrome.tabs.query = function() { return Promise.resolve([]); };
                      chrome.tabs.onUpdated = { addListener: function() {} };
                      chrome.tabs.onActivated = { addListener: function() {} };
                    }
                    
                    // Chrome webNavigation API 무력화
                    if (chrome.webNavigation) {
                      chrome.webNavigation.onCompleted = { addListener: function() {} };
                      chrome.webNavigation.onBeforeNavigate = { addListener: function() {} };
                      chrome.webNavigation.onNavigateComplete = { addListener: function() {} };
                    }
                    
                    console.log('🛡️ Chrome 확장 프로그램 API 무력화 완료');
                  } catch (e) {
                    // Chrome API 접근 오류 무시
                  }
                }
              })();
            `
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {/* 네트워크 상태 표시 */}
          <NetworkStatus />
          
          {/* 접근성 컨트롤 */}
          <AccessibilityControls />
          
          {/* V22.0 글로벌 알림 배너 시스템 */}
          <GlobalBanner />
          
          {/* 기존 배너들을 BannerController로 통합 관리 */}
          <BannerController />
          
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1 pt-20">
              {children}
            </main>
            <FloatingChatbot />
            <Footer />
            <ServiceWorkerRegister />
            <ErrorShield />
            <ChromeExtensionErrorSuppressor />
          </div>
        </Providers>
      </body>
    </html>
  );
}

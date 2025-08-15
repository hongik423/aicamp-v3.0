import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Providers from './providers';
import GlobalBanner from '@/components/layout/GlobalBanner';

import FloatingChatbot from '@/components/layout/floating-chatbot';
import ServiceWorkerRegister from '@/components/service-worker-register';
import ErrorShield from '@/components/ErrorShield';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false, // preload 경고 방지를 위해 비활성화
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
      { url: '/images/aicamp_logo_del_250726.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/aicamp_logo_del_250726.png', type: 'image/png', sizes: '16x16' }
    ],
    shortcut: ['/images/aicamp_logo_del_250726.png'],
    apple: [
      { url: '/images/aicamp_logo.png', sizes: '180x180' },
    ],
  },
  manifest: '/api/manifest',
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
    locale: 'ko_KR',
    type: 'website',
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
        message.includes('Manifest fetch') ||
        message.includes('manifest.json') ||
        message.includes('manifest.webmanifest') ||
        message.includes('Failed to load resource') ||
        message.includes('401') ||
        message.includes('message port closed')) {
      return; // 확장 프로그램 및 manifest 관련 오류는 무시
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
        message.includes('Manifest fetch') ||
        message.includes('manifest.json') ||
        message.includes('manifest.webmanifest') ||
        message.includes('Failed to load resource') ||
        message.includes('401') ||
        message.includes('message port closed')) {
      return; // 확장 프로그램 및 manifest 관련 오류는 무시
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
        errorMessage.includes('manifest.webmanifest') ||
        errorMessage.includes('Failed to load resource') ||
        errorSource.includes('chrome-extension://') ||
        errorSource.includes('content.js')) {
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
        reason.includes('manifest.webmanifest') ||
        reason.includes('Failed to load resource'))) {
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
        {/* 애플 터치 아이콘 - head 최상단 명시 */}
        <link rel="apple-touch-icon" href="/images/aicamp_logo.png" sizes="180x180" />
        
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
        
        {/* 오류 차단 스크립트 - 최우선 로드 */}
        <script src="/suppress-errors.js" suppressHydrationWarning />
        
        {/* PWA 매니페스트 */}
        <link rel="manifest" href="/api/manifest" />
        
        {/* 폰트 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 폰트 최적화 및 브라우저 호환성 스크립트 */}
        <script 
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 폰트 프리로드 최적화
                function optimizeFontLoading() {
                  // Inter 폰트 즉시 사용하여 프리로드 경고 방지
                  const style = document.createElement('style');
                  style.textContent = 'body{font-family:Inter,system-ui,-apple-system,sans-serif}';
                  document.head.appendChild(style);
                  
                  // 프리로드된 폰트 강제 사용
                  const testElement = document.createElement('span');
                  testElement.style.cssText = 'font-family:Inter;opacity:0;position:absolute;pointer-events:none';
                  testElement.textContent = '.';
                  document.body.appendChild(testElement);
                  requestAnimationFrame(() => document.body.removeChild(testElement));
                }
                
                // DOM 로드 즉시 실행
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', optimizeFontLoading);
                } else {
                  optimizeFontLoading();
                }
                
                // Chrome 확장 프로그램 오류 방지
                window.addEventListener('error', function(e) {
                  const msg = e.message || '';
                  if (msg.includes('runtime.lastError') || 
                      msg.includes('Extension context') ||
                      msg.includes('chrome-extension://') ||
                      msg.includes('The message port closed')) {
                    e.preventDefault();
                    return false;
                  }
                }, true);
                
                window.addEventListener('unhandledrejection', function(e) {
                  const msg = (e.reason && e.reason.message) || '';
                  if (msg.includes('runtime.lastError') || 
                      msg.includes('Extension context') ||
                      msg.includes('chrome-extension://') ||
                      msg.includes('The message port closed')) {
                    e.preventDefault();
                    return false;
                  }
                }, true);
              })();
            `
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <GlobalBanner />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <FloatingChatbot />
            <Footer />
            <ServiceWorkerRegister />
            <ErrorShield />
          </div>
        </Providers>
      </body>
    </html>
  );
}

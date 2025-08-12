import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Providers from './providers';
import GlobalBanner from '@/components/layout/GlobalBanner';
import FloatingChatbot from '@/components/layout/floating-chatbot';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'AICAMP - AI 역량진단 및 컨설팅 전문기관',
    template: '%s | AICAMP',
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

// Service Worker 오류 방지를 위한 안전한 등록 함수
const registerServiceWorkerSafely = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    // 브라우저 확장 프로그램 오류 방지
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args.join(' ');
      if (message.includes('port closed') || 
          message.includes('Extension context') ||
          message.includes('chrome-extension://') ||
          message.includes('content.js') ||
          message.includes('runtime.lastError') ||
          message.includes('The message port closed')) {
        return; // 확장 프로그램 오류 무시
      }
      originalConsoleWarn.apply(console, args);
    };

    // Service Worker 등록을 지연시켜 안전하게 처리
    setTimeout(async () => {
      try {
        // 기존 Service Worker 제거
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
        
        // 새로운 Service Worker 등록
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        });
        
        console.log('AICAMP Service Worker registered:', registration.scope);
        
        // Service Worker 업데이트 처리
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New Service Worker available');
              }
            });
          }
        });
        
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      } finally {
        // 원래 console.warn 복원
        console.warn = originalConsoleWarn;
      }
    }, 2000); // 2초 지연
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Service Worker 안전 등록
  if (typeof window !== 'undefined') {
    registerServiceWorkerSafely();
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 파비콘 및 애플 터치 아이콘 - head 최상단 */}
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
        
        {/* PWA 매니페스트 - Next.js 동적 생성 사용 */}
        <link rel="manifest" href="/manifest.webmanifest" />
        
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
      <body className={inter.className}>
        <Providers>
          <GlobalBanner />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <FloatingChatbot />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

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
});

export const metadata: Metadata = {
  title: 'AICAMP - AI 역량진단 및 컨설팅',
  description: 'AI 역량진단, 상담신청, 세금계산기 등 다양한 서비스를 제공하는 AICAMP입니다.',
  keywords: 'AI 역량진단, 상담신청, 세금계산기, AICAMP',
  authors: [{ name: 'AICAMP' }],
  creator: 'AICAMP',
  publisher: 'AICAMP',
  icons: {
    icon: [{ url: '/icon', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180' }],
    shortcut: ['/icon'],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aicamp.club'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AICAMP - AI 역량진단 및 컨설팅',
    description: 'AI 역량진단, 상담신청, 세금계산기 등 다양한 서비스를 제공하는 AICAMP입니다.',
    url: 'https://aicamp.club',
    siteName: 'AICAMP',
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
    title: 'AICAMP - AI 역량진단 및 컨설팅',
    description: 'AI 역량진단, 상담신청, 세금계산기 등 다양한 서비스를 제공하는 AICAMP입니다.',
    images: ['/images/aicamp_logo_del_250726.png'],
  },
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
        {/* 브라우저 확장 프로그램 오류 방지 메타 태그 */}
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
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
        
        {/* 파비콘/애플 터치 아이콘 - head 내부에 위치 */}
        <link rel="icon" href="/images/aicamp_logo_del_250726.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/aicamp_logo.png" />
        
        {/* 폰트 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 폰트 프리로드 경고 방지를 위한 스크립트 */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // 폰트 프리로드 사용 보장
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  const preloadedFonts = document.querySelectorAll('link[rel="preload"][as="font"]');
                  preloadedFonts.forEach(function(link) {
                    if (link.href && link.href.includes('woff2')) {
                      // 폰트 사용 강제 트리거
                      const testDiv = document.createElement('div');
                      testDiv.style.fontFamily = 'Inter';
                      testDiv.style.opacity = '0';
                      testDiv.style.position = 'absolute';
                      testDiv.textContent = 'test';
                      document.body.appendChild(testDiv);
                      setTimeout(() => document.body.removeChild(testDiv), 100);
                    }
                  });
                });
                
                // Chrome 확장 프로그램 오류 방지
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('runtime.lastError') ||
                    e.message.includes('Extension context') ||
                    e.message.includes('chrome-extension://') ||
                    e.message.includes('The message port closed')
                  )) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                });
                
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && e.reason.message && (
                    e.reason.message.includes('runtime.lastError') ||
                    e.reason.message.includes('Extension context') ||
                    e.reason.message.includes('chrome-extension://') ||
                    e.reason.message.includes('The message port closed')
                  )) {
                    e.preventDefault();
                    return false;
                  }
                });
              }
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

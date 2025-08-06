import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AICAMP - AI 역량진단 및 컨설팅',
  description: 'AI 역량진단, 상담신청, 세금계산기 등 다양한 서비스를 제공하는 AICAMP입니다.',
  keywords: 'AI 역량진단, 상담신청, 세금계산기, AICAMP',
  authors: [{ name: 'AICAMP' }],
  creator: 'AICAMP',
  publisher: 'AICAMP',
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
        url: '/images/aicamp_logo.png',
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
    images: ['/images/aicamp_logo.png'],
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
        
        {/* PWA 매니페스트 */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* 아이콘 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

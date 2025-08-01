import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FloatingChatbot from '@/components/layout/floating-chatbot';
import { InstallPrompt } from '@/components/ui/install-prompt';
import { ServiceWorkerProvider } from '@/components/providers/ServiceWorkerProvider';

const inter = Inter({ subsets: ['latin'] });

// 안정성을 위한 단순화

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
            ? process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-camp-landingpage.vercel.app'
    : 'http://localhost:3000'
  ),
  title: {
    default: 'AICAMP | AI 프로세스 자동화 컨설팅 및 교육',
    template: '%s | AICAMP'
  },
  description: 'AICAMP AI 교육센터 - AI 기반 무료 진단과 전문 교육으로 기업과 개인의 AI 역량 강화를 지원합니다.',
  keywords: [
    'AICAMP', 'AI교육', 'AI진단', 'AI컨설팅', 'AI역량강화', 
    'AI교육센터', 'AI생산성', 'AI기술교육', 'AI혁신', 
    'AI전문가', 'AI개발', '디지털혁신'
  ],
  authors: [{ name: 'AICAMP AI 교육센터' }],
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-camp-landingpage.vercel.app',
    title: 'AI-CAMP | AI 기업진단 및 경영컨설팅',
    description: 'AI 기반 무료 진단과 전문 컨설팅으로 중소기업 성장을 지원합니다.',
    siteName: 'AI-CAMP',
  },
  twitter: {
    card: 'summary_large_image',
          title: 'AI-CAMP | AI 기업진단 및 경영컨설팅',
    description: 'AI 기반 무료 진단과 전문 컨설팅으로 중소기업 성장을 지원합니다.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
      <ServiceWorkerProvider />
      <Header />
      <main className="flex-1" suppressHydrationWarning>
        {children}
      </main>
      <Footer />
      <FloatingChatbot />
      <InstallPrompt />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* UTF-8 인코딩 명시적 설정 - GitHub Pages 한글 깨짐 방지 */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="Content-Language" content="ko" />
        
                  {/* 모바일 뷰포트 최적화 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        
                  {/* 최적화된 캐시 설정 */}
        <meta name="version" content="2.0" />
        
        {/* 🔧 한글 폰트 최적화 - Pretendard만 사용 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 🔧 성능 최적화: DNS 프리페치 - Google Apps Script 기반 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//script.google.com" />
        <link rel="dns-prefetch" href="//generativelanguage.googleapis.com" />
        
        {/* PWA 메타 태그 */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AICAMP" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple PWA 설정 */}
        <link rel="apple-touch-icon" href="/images/aicamp_logo.png" />
        <link rel="apple-touch-startup-image" href="/images/aicamp_logo.png" />
        
        {/* Vercel 배포 최적화 설정 */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-camp-landingpage.vercel.app'} />
        
        {/* Chrome 확장 프로그램 오류 완전 차단 스크립트 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Chrome 확장 프로그램 오류 완전 차단
            if (typeof window !== 'undefined') {
              // console.error 오버라이드 - 더 광범위한 차단
              const originalError = window.console.error;
              window.console.error = function(...args) {
                const errorMessage = args[0]?.toString() || '';
                
                // Chrome 확장 프로그램 관련 오류 완전 무시
                if (errorMessage.includes('message port closed') || 
                    errorMessage.includes('The message port closed') ||
                    errorMessage.includes('Extension context') ||
                    errorMessage.includes('chrome-extension://') ||
                    errorMessage.includes('content.js') ||
                    errorMessage.includes('runtime.lastError') ||
                    errorMessage.includes('Unchecked runtime.lastError') ||
                    errorMessage.includes('extension://') ||
                    errorMessage.includes('content_script') ||
                    errorMessage.includes('injected.js') ||
                    errorMessage.includes('inject.js')) {
                  return; // 완전 무시
                }
                
                originalError.apply(console, args);
              };
              
              // console.warn도 오버라이드
              const originalWarn = window.console.warn;
              window.console.warn = function(...args) {
                const warnMessage = args[0]?.toString() || '';
                if (warnMessage.includes('message port closed') ||
                    warnMessage.includes('Extension context') ||
                    warnMessage.includes('runtime.lastError')) {
                  return;
                }
                originalWarn.apply(console, args);
              };
              
              // 전역 오류 핸들러 강화
              window.addEventListener('error', function(event) {
                const message = event.message || '';
                const source = event.filename || '';
                
                if (message.includes('Extension context') ||
                    message.includes('chrome-extension') ||
                    message.includes('content.js') ||
                    message.includes('message port closed') ||
                    message.includes('The message port closed') ||
                    message.includes('runtime.lastError') ||
                    source.includes('extension://') ||
                    source.includes('content.js') ||
                    source.includes('injected.js')) {
                  event.preventDefault();
                  event.stopPropagation();
                  return false;
                }
              }, true); // capture phase에서도 처리
              
              // Unhandled promise rejection 강화 처리
              window.addEventListener('unhandledrejection', function(event) {
                const reason = event.reason;
                let shouldBlock = false;
                
                if (typeof reason === 'string') {
                  shouldBlock = reason.includes('Extension context') ||
                               reason.includes('chrome-extension') ||
                               reason.includes('content.js') ||
                               reason.includes('message port closed') ||
                               reason.includes('runtime.lastError');
                } else if (reason && reason.message) {
                  shouldBlock = reason.message.includes('Extension context') ||
                               reason.message.includes('chrome-extension') ||
                               reason.message.includes('content.js') ||
                               reason.message.includes('message port closed') ||
                               reason.message.includes('runtime.lastError');
                }
                
                if (shouldBlock) {
                  event.preventDefault();
                  return false;
                }
              });
              
              // Chrome runtime 오류 주기적 정리
              if (typeof chrome !== 'undefined' && chrome.runtime) {
                setInterval(function() {
                  try {
                    if (chrome.runtime.lastError) {
                      // 오류가 있어도 무시
                    }
                  } catch (e) {
                    // 접근 오류도 무시
                  }
                }, 5000);
              }
            }
          `
        }} />

      </head>
      <body className={`${inter.className} bg-white`} suppressHydrationWarning>        
        <Providers>
          <RootLayoutContent>
            {children}
          </RootLayoutContent>
        </Providers>
      </body>
    </html>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X
} from 'lucide-react';


// Service Worker 등록 (개발 환경에서는 비활성화)
const registerServiceWorker = async () => {
  // 개발 환경에서는 Service Worker 등록하지 않음
  if (process.env.NODE_ENV === 'development') {
    console.log('개발 환경에서는 Service Worker를 등록하지 않습니다.');
    return;
  }

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      // Service Worker 파일이 존재하는지 먼저 확인
      const response = await fetch('/sw.js', { method: 'HEAD' });
      if (!response.ok) {
        console.log('Service Worker 파일이 존재하지 않습니다.');
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('AICAMP Service Worker registered:', registration.scope);
      
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number>(9);
  const containerRef = useRef<HTMLDivElement>(null);

  // 네비게이션 메뉴 정의 - useEffect보다 먼저 정의
  const navigation = [
    { href: '/', label: '홈', isSpecial: false, priority: 1 },
    { href: '/services/ai-curriculum', label: 'AICAMP교육', isSpecial: false, priority: 2 },
    { href: '/services', label: 'AICAMP서비스', isSpecial: false, priority: 3 },
    { href: '/benchmark', label: 'AI벤치마크', isSpecial: false, priority: 4 },
    { href: '/about', label: 'AICAMP소개', isSpecial: false, priority: 5 },
    { href: '/seminar', label: '세미나', isSpecial: false, priority: 6 },
    { href: '/consultation', label: '상담신청', isSpecial: false, priority: 7 },
    { href: '/services/investment-analysis', label: '사업타당성분석기', isSpecial: false, priority: 8 },
    { href: '/tax-calculator', label: '세금계산기', isSpecial: false, priority: 9 }
  ];

  // 네비게이션 자동 넓이 조절 로직 - 모든 메뉴 항상 표시
  useEffect(() => {
    const calculateVisibleItems = () => {
      // 모든 메뉴 항상 표시 (더보기 없음)
      setVisibleItems(navigation.length);
    };

    const handleResize = () => {
      // 디바운스를 통한 성능 최적화
      clearTimeout((window as any).resizeTimer);
      (window as any).resizeTimer = setTimeout(calculateVisibleItems, 100);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Service Worker 등록을 지연시켜 안전하게 처리
    const timer = setTimeout(() => {
      registerServiceWorker();
    }, 1000);

    // 초기 계산 및 이벤트 리스너 등록
    calculateVisibleItems();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      clearTimeout((window as any).resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigation.length]);



  // 모든 메뉴 표시 (더보기 없음)
  const visibleNavigation = navigation;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-accelerate ${
      isScrolled ? 'bg-white/95 backdrop-blur-optimized shadow-lg' : 'bg-white'
    }`}>
      <div className="w-full max-w-none px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div ref={containerRef} className="flex items-center h-14 sm:h-16 w-full">
          {/* 로고 영역 - 좌측 고정 */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <Image
                  src="/images/aicamp_logo_del_250726.png"
                  alt="AICAMP 로고"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                  priority
                  unoptimized
                />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent whitespace-nowrap drop-shadow-sm">AICAMP</span>
            </Link>
          </div>

          {/* AI역량진단 버튼 - 데스크톱 */}
          <div className="hidden lg:flex items-center ml-4 xl:ml-6 2xl:ml-8 flex-shrink-0">
            <Link
              href="/diagnosis"
              className="inline-flex items-center px-2 py-1.5 xl:px-3 xl:py-2 rounded-lg text-xs xl:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              <span>AI역량진단</span>
              <Badge variant="secondary" className="ml-1 text-xs bg-white/20 text-white border-0">
                무료
              </Badge>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 - 가변 영역 */}
          <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-2 overflow-hidden">
            <div className="flex items-center space-x-0 lg:space-x-0.5 xl:space-x-1 overflow-hidden">
              {visibleNavigation.filter(item => !item.isSpecial).map((item) => (
                <div key={item.href} className="relative group flex-shrink-0">
                  <Link
                    href={item.href}
                    className="inline-flex items-center px-1 py-1 lg:px-1.5 lg:py-1.5 xl:px-2 xl:py-1.5 rounded-lg text-xs lg:text-xs xl:text-xs font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-200 whitespace-nowrap"
                  >
                    <span className="truncate max-w-[60px] lg:max-w-[75px] xl:max-w-[90px]">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-1 text-xs bg-blue-100 text-blue-600 flex-shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </div>
              ))}
              

            </div>
          </nav>

          {/* AI 상담 버튼 - 가장 우측에 고정, 컴팩트 디자인 */}
          <div className="hidden lg:flex items-center flex-shrink-0 ml-auto pl-2 pr-4 xl:pr-6 2xl:pr-8">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                  if (btn) btn.click();
                }
              }}
              className="inline-flex items-center px-2 py-1.5 xl:px-3 xl:py-2 rounded-lg text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-green-600 transition-all whitespace-nowrap animate-pulse"
            >
              <span className="lg:inline xl:inline">이교장의AI상담</span>
            </button>
          </div>

          {/* AI역량진단 버튼 - 태블릿용 */}
          <div className="hidden md:flex lg:hidden items-center ml-6 flex-shrink-0">
            <Link
              href="/diagnosis"
              className="inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              <span className="hidden sm:inline">AI역량진단</span>
              <span className="sm:hidden">AI역량진단</span>
              <Badge variant="secondary" className="ml-1 text-xs bg-white/20 text-white border-0">
                무료
              </Badge>
            </Link>
          </div>

          {/* 태블릿용 스마트 네비게이션 - 자동 조절 */}
          <nav className="hidden md:flex lg:hidden items-center justify-center flex-1 min-w-0 mx-2 overflow-hidden">
            <div className="flex items-center space-x-1 overflow-hidden">
              <Link
                href="/services"
                className="px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
              >
                서비스
              </Link>
              <Link
                href="/benchmark"
                className="px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
              >
                AI벤치마크
              </Link>
              <Link
                href="/consultation"
                className="px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
              >
                상담신청
              </Link>
              
              <Link
                href="/tax-calculator"
                className="px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
              >
                세금계산기
              </Link>
            </div>
          </nav>

          {/* 태블릿용 AI 상담 버튼 - 가장 우측에 고정, 추가 여백 확보 */}
          <div className="hidden md:flex lg:hidden items-center flex-shrink-0 ml-auto pl-2 pr-6 xl:pr-8">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                  if (btn) btn.click();
                }
              }}
              className="inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap animate-pulse"
            >
              <span className="hidden sm:inline">이교장의AI상담</span>
              <span className="sm:hidden">이교장의AI상담</span>
            </button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 메뉴 - 향상된 UX */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-xl">
            <nav className="py-4 px-3 space-y-2 max-h-[75vh] overflow-y-auto">
              {/* 상단 고정 AI 상담 버튼 (모바일 전용) - 개선된 디자인 */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (typeof window !== 'undefined') {
                    const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                    if (btn) btn.click();
                  }
                }}
                className="w-full mb-3 inline-flex items-center justify-center px-5 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 shadow-lg active:shadow-xl hover:from-blue-700 hover:to-green-600 transform active:scale-95 transition-all duration-200 animate-pulse touch-manipulation"
              >
                <span className="mr-2">💬</span>
                이교장의AI상담 바로가기
              </button>

              {/* 우선순위별 메뉴 그룹화 */}
              {/* AI역량진단 특별 버튼 */}
              <Link
                href="/diagnosis"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation active:scale-95 mb-4"
              >
                <span className="text-base font-medium">AI역량진단</span>
                <Badge variant="secondary" className="text-xs ml-2 bg-white/20 text-white border-0">
                  무료
                </Badge>
              </Link>

              <div className="space-y-1">
                {/* 핵심 서비스 그룹 */}
                <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider">
                  핵심 서비스
                </div>
                {navigation.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 touch-manipulation active:scale-95"
                  >
                    <span className="text-base font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs ml-2 bg-blue-100 text-blue-600">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
                
                {/* 추가 서비스 그룹 */}
                <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider mt-4">
                  추가 서비스
                </div>
                {navigation.slice(3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 touch-manipulation active:scale-95"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="text-base">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs ml-2 bg-blue-100 text-blue-600">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
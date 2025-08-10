'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { getImagePath } from '@/lib/utils';

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
  const [navWidth, setNavWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number>(9);
  const [showDropdown, setShowDropdown] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 네비게이션 자동 넓이 조절 로직
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!navRef.current || !containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const logoWidth = 200; // 로고 영역 예상 넓이
      const actionWidth = 180; // AI 상담 버튼 영역 예상 넓이
      const availableWidth = containerWidth - logoWidth - actionWidth - 32; // 여백 고려
      
      // 각 메뉴 항목의 예상 넓이 (텍스트 길이 기반)
      const itemWidths = navigation.map(item => {
        const textLength = item.label.length;
        return Math.max(textLength * 8 + 32, 80); // 최소 80px
      });
      
      let totalWidth = 0;
      let count = 0;
      
      for (let i = 0; i < itemWidths.length; i++) {
        if (totalWidth + itemWidths[i] <= availableWidth) {
          totalWidth += itemWidths[i] + 8; // 간격 포함
          count++;
        } else {
          break;
        }
      }
      
      setVisibleItems(Math.max(count, 3)); // 최소 3개 항목 표시
    };

    const handleResize = () => {
      calculateVisibleItems();
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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { href: '/diagnosis', label: 'AI역량진단', isSpecial: true, badge: '무료', priority: 1 },
    { href: '/services/ai-curriculum', label: 'AICAMP교육', isSpecial: false, priority: 2 },
    { href: '/services', label: 'AICAMP서비스', isSpecial: false, priority: 3 },
    { href: '/about', label: 'AICAMP소개', isSpecial: false, priority: 4 },
    { href: '/seminar', label: '세미나', isSpecial: false, priority: 5 },
    { href: '/cases', label: '성공사례', isSpecial: false, priority: 6 },
    { href: '/consultation', label: '상담신청', isSpecial: false, priority: 7 },
    { href: '/services/investment-analysis', label: '사업타당성분석기', isSpecial: false, priority: 8 },
    { href: '/tax-calculator', label: '세금계산기', isSpecial: false, priority: 9 }
  ];

  // 표시할 메뉴와 숨겨진 메뉴 분리
  const visibleNavigation = navigation.slice(0, visibleItems);
  const hiddenNavigation = navigation.slice(visibleItems);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-accelerate ${
      isScrolled ? 'bg-white/95 backdrop-blur-optimized shadow-lg' : 'bg-white'
    }`}>
      <div className="w-full max-w-none px-3 sm:px-4 lg:px-6 xl:px-8">
        <div ref={containerRef} className="flex items-center justify-between h-14 sm:h-16 w-full min-w-0">
          {/* 로고 + AICAMP + 홈 - 순서 개선 및 자동 넓이 조정 */}
          <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
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

          {/* 데스크톱 네비게이션 - 스마트 자동 넓이 조절 */}
          <nav ref={navRef} className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-4 relative">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {visibleNavigation.map((item) => (
                <div key={item.href} className="relative group flex-shrink-0">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center px-2 py-2 lg:px-3 lg:py-2 xl:px-4 xl:py-2 rounded-xl text-xs lg:text-sm xl:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                      item.isSpecial
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                    }`}
                  >
                    <span className="truncate max-w-[120px] lg:max-w-none">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-1 lg:ml-2 text-xs bg-white/20 text-white border-0 flex-shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </div>
              ))}
              
              {/* 더보기 드롭다운 버튼 */}
              {hiddenNavigation.length > 0 && (
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="inline-flex items-center px-2 py-2 lg:px-3 lg:py-2 xl:px-4 xl:py-2 rounded-xl text-xs lg:text-sm xl:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-200 whitespace-nowrap"
                  >
                    <span>더보기</span>
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* 드롭다운 메뉴 */}
                  {showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slide-in-from-top gpu-accelerate">
                      {hiddenNavigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* AI 상담 버튼 - 별도 영역으로 분리하여 반응형 개선, 우측 4cm 여백 확보 */}
          <div className="hidden lg:flex items-center flex-shrink-0 mr-36">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                  if (btn) btn.click();
                }
              }}
              className="inline-flex items-center px-3 py-2 xl:px-4 xl:py-2 rounded-xl text-sm xl:text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-green-600 transition-all whitespace-nowrap animate-pulse"
            >
              <span className="hidden xl:inline">이교장의AI상담</span>
              <span className="xl:hidden">AI상담</span>
            </button>
          </div>

          {/* 태블릿용 스마트 네비게이션 - 자동 조절 */}
          <nav className="hidden md:flex lg:hidden items-center justify-center flex-1 min-w-0 mx-2 relative">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              {/* 우선순위가 높은 메뉴 먼저 표시 */}
              <Link
                href="/diagnosis"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-2 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 flex-shrink-0"
              >
                AI진단
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20 text-white border-0">
                  무료
                </Badge>
              </Link>
              <Link
                href="/services"
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex-shrink-0"
              >
                서비스
              </Link>
              <Link
                href="/tax-calculator"
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex-shrink-0 hidden sm:block"
              >
                세금계산기
              </Link>
              <Link
                href="/consultation"
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex-shrink-0"
              >
                상담
              </Link>
              
              {/* 태블릿용 더보기 드롭다운 */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center"
                >
                  <span className="hidden sm:inline">더보기</span>
                  <span className="sm:hidden">⋯</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slide-in-from-top gpu-accelerate">
                    <Link
                      href="/about"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      AICAMP소개
                    </Link>
                    <Link
                      href="/seminar"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      세미나
                    </Link>
                    <Link
                      href="/cases"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      성공사례
                    </Link>
                    <Link
                      href="/tax-calculator"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 sm:hidden"
                    >
                      세금계산기
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* 태블릿용 AI 상담 버튼 - 텍스트 통일, 우측 4cm 여백 확보 */}
          <div className="hidden md:flex lg:hidden items-center flex-shrink-0 mr-36">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                  if (btn) btn.click();
                }
              }}
              className="inline-flex items-center px-2 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap animate-pulse"
            >
              이교장의AI상담
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
              <div className="space-y-1">
                {/* 핵심 서비스 그룹 */}
                <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider">
                  핵심 서비스
                </div>
                {navigation.slice(0, 4).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation active:scale-95 ${
                      item.isSpecial
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                    }`}
                  >
                    <span className="text-base font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className={`text-xs ml-2 ${
                        item.isSpecial 
                          ? 'bg-white/20 text-white border-0' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
                
                {/* 추가 서비스 그룹 */}
                <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider mt-4">
                  추가 서비스
                </div>
                {navigation.slice(4).map((item) => (
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
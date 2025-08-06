'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X
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

  useEffect(() => {
    // Service Worker 등록을 지연시켜 안전하게 처리
    const timer = setTimeout(() => {
      registerServiceWorker();
    }, 1000);

    // 스크롤 이벤트 리스너
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { href: '/', label: '홈', isSpecial: false },
    { href: '/diagnosis', label: 'AI역량진단', isSpecial: true, badge: '무료' },
    { href: '/services/ai-curriculum', label: 'AICAMP교육', isSpecial: false },
    { href: '/services', label: 'AICAMP서비스', isSpecial: false },
    { href: '/about', label: 'AICAMP소개', isSpecial: false },
    { href: '/seminar', label: '세미나', isSpecial: false },
    { href: '/cases', label: '성공사례', isSpecial: false },
    { href: '/consultation', label: '상담신청', isSpecial: false },
    { href: '/services/investment-analysis', label: '사업타당성분석기', isSpecial: false },
    { href: '/tax-calculator', label: '세금계산기', isSpecial: false }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10">
              <Image
                src="/images/aicamp_logo_del_250726.png"
                alt="AICAMP 로고"
                width={40}
                height={40}
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">AICAMP</span>
          </Link>

          {/* 데스크톱 네비게이션 - 반응형 개선 */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 xl:px-4 xl:py-2 rounded-xl text-sm xl:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                    item.isSpecial
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs bg-white/20 text-white border-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* 태블릿용 간소화 네비게이션 */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            <Link
              href="/"
              className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              홈
            </Link>
            <Link
              href="/diagnosis"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              AI진단
              <Badge variant="secondary" className="ml-1 text-xs bg-white/20 text-white border-0">
                무료
              </Badge>
            </Link>
            <Link
              href="/services"
              className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              서비스
            </Link>
            <Link
              href="/tax-calculator"
              className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              세금계산기
            </Link>
            <Link
              href="/consultation"
              className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              상담
            </Link>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 메뉴 - 개선된 반응형 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <nav className="py-3 px-2 space-y-1 max-h-[70vh] overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation active:scale-95 ${
                    item.isSpecial
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <span className="text-base">{item.label}</span>
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 단색 톤 집중형 네비게이션: 배너 연동 제거, 배지 사용 제거
import { 
  Menu, 
  X,
  Download,
  BookOpen,
  FileText,
  BarChart3
} from 'lucide-react';
import CurriculumSidePanel from './CurriculumSidePanel';
// import DiagnosisNotificationBanner from '@/components/diagnosis/DiagnosisNotificationBanner';


// Service Worker 등록 비활성화 (layout.tsx에서 통합 관리)
const checkServiceWorkerStatus = async () => {
  // layout.tsx에서 Service Worker를 통합 관리하므로 여기서는 상태만 확인
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        console.log('✅ Service Worker 상태: 정상 등록됨');
      } else {
        console.log('⏳ Service Worker 등록 대기 중...');
      }
    } catch (error) {
      // Service Worker 관련 오류는 무시 (layout.tsx에서 처리)
    }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number>(9);
  const [isCurriculumPanelOpen, setIsCurriculumPanelOpen] = useState(false);
  const [buttonSize, setButtonSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');
  const [navTextSize, setNavTextSize] = useState<'xs' | 'sm' | 'md'>('sm');
  const containerRef = useRef<HTMLDivElement>(null);

  // 네비게이션 메뉴 정의 - 개별 신청자 중심 몰입감 있는 UX
  const navigation = [
    { href: '/services/ai-curriculum', label: '직무AI트랙', isSpecial: false, priority: 1, category: 'education' },
    { href: '/services', label: '서비스들', isSpecial: false, priority: 2, category: 'service' },
    { href: '/benchmark', label: '벤치마크', isSpecial: false, priority: 3, category: 'assessment' },
    { href: '/about', label: '캠프소개', isSpecial: false, priority: 4, category: 'info' },
    { href: '/seminar', label: '세미나', isSpecial: false, priority: 5, category: 'education' },
    { href: '/services/investment-analysis', label: '타당성분석', isSpecial: false, priority: 6, category: 'analysis' },
    { href: '/tax-calculator', label: '세금계산기', isSpecial: false, priority: 7, category: 'tool' }
  ];

  // 네비게이션 자동 넓이 조절 로직 - 모든 메뉴 항상 표시 + 동적 크기 조절
  useEffect(() => {
    const calculateResponsiveSizes = () => {
      const width = window.innerWidth;
      
      // 모든 메뉴 항상 표시 (더보기 없음)
      setVisibleItems(navigation.length);
      
      // 화면 크기에 따른 버튼 크기 자동 조절
      if (width < 1280) { // xl 미만
        setButtonSize('xs');
        setNavTextSize('xs');
      } else if (width < 1536) { // xl ~ 2xl
        setButtonSize('sm');
        setNavTextSize('sm');
      } else { // 2xl 이상
        setButtonSize('md');
        setNavTextSize('md');
      }
    };

    const handleResize = () => {
      // 디바운스를 통한 성능 최적화
      clearTimeout((window as any).resizeTimer);
      (window as any).resizeTimer = setTimeout(calculateResponsiveSizes, 100);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Service Worker 상태 확인을 지연시켜 안전하게 처리
    const timer = setTimeout(() => {
      checkServiceWorkerStatus();
    }, 1000);

    // 초기 계산 및 이벤트 리스너 등록
    calculateResponsiveSizes();
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

  // 동적 크기 조절을 위한 유틸리티 함수들
  const getButtonSizeClasses = (size: 'xs' | 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'xs':
        return 'px-1.5 py-1 text-xs';
      case 'sm':
        return 'px-2 py-1.5 text-xs';
      case 'md':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-4 py-2.5 text-sm';
      default:
        return 'px-2 py-1.5 text-xs';
    }
  };

  const getNavTextSizeClasses = (size: 'xs' | 'sm' | 'md') => {
    switch (size) {
      case 'xs':
        return 'text-xs px-1 py-1 max-w-[50px]';
      case 'sm':
        return 'text-sm px-1.5 py-1.5 max-w-[70px]';
      case 'md':
        return 'text-sm px-2 py-1.5 max-w-[90px]';
      default:
        return 'text-xs px-1 py-1 max-w-[50px]';
    }
  };

  const getNavSpacingClasses = (size: 'xs' | 'sm' | 'md') => {
    switch (size) {
      case 'xs':
        return 'space-x-0.5';
      case 'sm':
        return 'space-x-1';
      case 'md':
        return 'space-x-1.5';
      default:
        return 'space-x-1';
    }
  };

  return (
    <>
      {/* V22.0 진단 완료 알림 배너 - 임시 비활성화 */}
      {/* <DiagnosisNotificationBanner /> */}
      
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 gpu-accelerate ${
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
              <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">AICAMP</span>
            </Link>
          </div>

          {/* AI역량진단 & 보고서조회 버튼 - 데스크톱 (동적 크기 조절 적용) */}
          <div className="hidden lg:flex items-center ml-4 xl:ml-6 2xl:ml-8 flex-shrink-0 gap-2">
            <Link
              href="/ai-diagnosis"
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors whitespace-nowrap`}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              <span>AI역량진단</span>
            </Link>
            
            <Link
              href="/prd-report-access"
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors whitespace-nowrap`}
            >
              <FileText className="w-4 h-4 mr-1" />
              <span>보고서조회</span>
            </Link>
            
            {/* 상담신청 버튼 - 격을 높인 디자인 */}
            <Link
              href="/consultation"
              className={`inline-flex items-center ${buttonSize === 'xs' ? 'px-2 py-1' : buttonSize === 'sm' ? 'px-3 py-2' : 'px-4 py-2.5'} rounded-md font-bold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors whitespace-nowrap`}
            >
              <span className="font-black">상담신청</span>

            </Link>
            
            {/* n8n커리큘럼 버튼 - 텍스트 변경 */}
            <button
              onClick={() => setIsCurriculumPanelOpen(true)}
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors whitespace-nowrap`}
              title="n8n 커리큘럼 보기"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              <span className={buttonSize === 'xs' ? 'hidden' : 'inline'}>n8n커리큘럼</span>
              <span className={buttonSize === 'xs' ? 'inline' : 'hidden'}>n8n</span>

            </button>
          </div>

          {/* 데스크톱 네비게이션 - 가변 영역 (동적 크기 조절 적용) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-2 overflow-hidden">
            <div className={`flex items-center ${getNavSpacingClasses(navTextSize)} overflow-hidden`}>
              {visibleNavigation.map((item) => (
                <div key={item.href} className="relative group flex-shrink-0">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center ${getNavTextSizeClasses(navTextSize)} rounded-md font-medium transition-colors whitespace-nowrap px-2 py-1 ${
                      (item as any).highlight 
                        ? 'text-white bg-gray-900 hover:bg-gray-800' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          {/* AI 상담 버튼 - 가장 우측에 고정, 동적 크기 조절 적용 */}
          <div className="hidden lg:flex items-center flex-shrink-0 ml-auto pl-2 pr-4 xl:pr-6 2xl:pr-8">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                  if (btn) btn.click();
                }
              }}
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors whitespace-nowrap`}
            >
              <span className={buttonSize === 'xs' ? 'hidden' : 'inline'}>이교장의AI상담</span>
              <span className={buttonSize === 'xs' ? 'inline' : 'hidden'}>AI상담</span>
            </button>
          </div>

          {/* AI역량진단 & 보고서조회 버튼 - 태블릿용 (개별 신청자 중심 UX) */}
          <div className="hidden md:flex lg:hidden items-center ml-6 flex-shrink-0 gap-2">
            <Link
              href="/ai-diagnosis"
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors whitespace-nowrap`}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              <span className={buttonSize === 'xs' ? 'hidden' : 'inline'}>AI역량진단</span>
              <span className={buttonSize === 'xs' ? 'inline' : 'hidden'}>AI진단</span>
            </Link>
            
            <Link
              href="/prd-report-access"
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors whitespace-nowrap`}
            >
              <FileText className="w-4 h-4 mr-1" />
              <span className={buttonSize === 'xs' ? 'hidden' : 'inline'}>보고서조회</span>
              <span className={buttonSize === 'xs' ? 'inline' : 'hidden'}>보고서</span>
            </Link>
            
            {/* 상담신청 버튼 - 격을 높인 디자인 */}
            <Link
              href="/consultation"
              className={`inline-flex items-center ${buttonSize === 'xs' ? 'px-2 py-1' : buttonSize === 'sm' ? 'px-3 py-2' : 'px-4 py-2.5'} rounded-md font-bold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors whitespace-nowrap`}
            >
              <span className="font-black">상담신청</span>
            </Link>
            
            {/* n8n커리큘럼 버튼 - 텍스트 변경 */}
            <button
              onClick={() => setIsCurriculumPanelOpen(true)}
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors whitespace-nowrap`}
              title="n8n 커리큘럼 보기"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              <span className={buttonSize === 'xs' ? 'hidden' : 'inline'}>n8n커리큘럼</span>
              <span className={buttonSize === 'xs' ? 'inline' : 'hidden'}>n8n</span>

            </button>
          </div>

          {/* 태블릿용 스마트 네비게이션 - 자동 조절 (상담신청은 상단 버튼으로 이동) */}
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
                벤치마크
              </Link>
              <Link
                href="/about"
                className="px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
              >
                캠프소개
              </Link>
              <Link
                href="/tax-calculator"
                className="px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
              >
                세금계산기
              </Link>
            </div>
          </nav>

          {/* 태블릿용 AI 상담 버튼 - 가장 우측에 고정, 동적 크기 조절 적용 */}
          <div className="hidden md:flex lg:hidden items-center flex-shrink-0 ml-auto pl-2 pr-6 xl:pr-8">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const btn = document.querySelector('[data-floating-chatbot]') as HTMLElement | null;
                  if (btn) btn.click();
                }
              }}
              className={`inline-flex items-center ${getButtonSizeClasses(buttonSize)} rounded-md font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors whitespace-nowrap`}
            >
              <span className={buttonSize === 'xs' ? 'hidden' : 'inline'}>이교장의AI상담</span>
              <span className={buttonSize === 'xs' ? 'inline' : 'hidden'}>AI상담</span>
            </button>
          </div>

          {/* 모바일 메뉴 버튼 - 개선된 애니메이션 및 접근성 */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              // 햅틱 피드백
              if (navigator.vibrate && typeof navigator.vibrate === 'function') {
                navigator.vibrate(50);
              }
            }}
            className="md:hidden p-3 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[48px] min-h-[48px]"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>

        {/* 모바일 메뉴 - 향상된 UX 및 애니메이션 */}
        <div className={`md:hidden border-t border-gray-200 bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[75vh] opacity-100' : 'max-h-0 opacity-0'
        }`}>
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
                className="w-full mb-3 inline-flex items-center justify-center px-5 py-4 rounded-md text-lg font-bold text-white bg-gray-900 hover:bg-gray-800 active:shadow-sm transform active:scale-95 transition-colors touch-manipulation"
              >
                <span className="mr-2">💬</span>
                이교장의AI상담 바로가기
              </button>

              {/* 우선순위별 메뉴 그룹화 */}
              {/* AI역량진단 특별 버튼 - 개별 신청자 중심 강조 */}
              <Link
                href="/ai-diagnosis"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 rounded-md font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors touch-manipulation active:scale-95 mb-2"
              >
                <span className="text-base font-medium flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  AI역량진단
                </span>
              </Link>

              {/* 보고서조회 버튼 - 개별 신청자 중심 몰입감 있는 UX */}
              <Link
                href="/prd-report-access"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 rounded-md font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors touch-manipulation active:scale-95 mb-2"
              >
                <span className="text-base font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  보고서조회
                </span>
              </Link>

              {/* 상담신청 버튼 - 격을 높인 디자인 */}
              <Link
                href="/consultation"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between px-5 py-4 rounded-md font-black bg-blue-600 text-white hover:bg-blue-700 transition-colors touch-manipulation active:scale-95 mb-3"
              >
                <span className="text-lg font-black">🔥 상담신청</span>

              </Link>

              {/* n8n커리큘럼 버튼 - 모바일, 텍스트 변경 */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCurriculumPanelOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-md font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors touch-manipulation active:scale-95 mb-4"
              >
                <span className="text-base font-medium flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  n8n커리큘럼
                </span>

              </button>

              <div className="space-y-1">
                {/* 핵심 서비스 그룹 */}
                <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider">
                  핵심 서비스
                </div>
                {navigation.slice(0, 2).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors touch-manipulation active:scale-95"
                  >
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                ))}
                
                {/* 추가 서비스 그룹 */}
                <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider mt-4">
                  추가 서비스
                </div>
                {navigation.slice(2).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-md font-medium transition-colors touch-manipulation active:scale-95 ${
                      (item as any).highlight 
                        ? 'text-white bg-gray-900' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className={`text-base flex items-center ${(item as any).highlight ? 'font-semibold' : ''}`}>
                      {(item as any).highlight && <FileText className="w-4 h-4 mr-2" />}
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2" />
                  </Link>
                ))}
              </div>
            </nav>
        </div>
      </div>
      
      {/* n8n 커리큘럼 사이드 패널 */}
      <CurriculumSidePanel
        isOpen={isCurriculumPanelOpen}
        onClose={() => setIsCurriculumPanelOpen(false)}
      />
    </header>
    </>
  );
}
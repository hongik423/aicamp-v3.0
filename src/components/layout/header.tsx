'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X,
  Home,
  BarChart3,
  Zap,
  Factory,
  Rocket,
  Shield,
  Building,
  Trophy,
  User,
  Video,
  Headphones,
  Phone,
  Calculator,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
  Crown,
  Lightbulb,
  Beaker,
  Gift,
  Brain
} from 'lucide-react';
import { getImagePath } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedTaxMenu, setExpandedTaxMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 이동 핸들러
  const handleNavigation = (path: string) => {
    try {
      console.log('네비게이션 이동:', path);
      router.push(path);
      setIsMenuOpen(false);
      setExpandedTaxMenu(false);
    } catch (error) {
      console.error('네비게이션 오류:', error);
      // 오류 발생시 window.location으로 대체
      window.location.href = path;
    }
  };

  // 세금계산기 선택 핸들러
  const handleTaxCalculatorSelect = (calculatorId: string) => {
    try {
      const url = `/tax-calculator?calculator=${calculatorId}`;
      console.log('세금계산기 선택:', url);
      router.push(url);
      setIsMenuOpen(false);
      setExpandedTaxMenu(false);
    } catch (error) {
      console.error('세금계산기 네비게이션 오류:', error);
      // 오류 발생시 window.location으로 대체
      window.location.href = `/tax-calculator?calculator=${calculatorId}`;
    }
  };

  // 모바일 메뉴 닫기 (Esc 키 지원)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        setExpandedTaxMenu(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // 네비게이션 아이템 정의 - 고객 중심 메뉴 구성 (전환율 최적화)
  const navigationItems = [
    { href: '/diagnosis', label: 'AI무료진단', icon: Zap, isSpecial: true, badge: '무료' },
    { href: '/services', label: 'AI서비스', icon: Rocket, isSpecial: false, badge: '인기' },
    { href: '/services/ai-curriculum', label: 'AI교육', icon: Brain, isSpecial: false, badge: 'NEW' },
    { href: '/services/policy-funding', label: '정책자금', icon: DollarSign, isSpecial: false, badge: '추천' },
    { href: '/seminar', label: '세미나', icon: Video, isSpecial: false, badge: '개최중' },
    { href: '/cases', label: '성공사례', icon: Trophy, isSpecial: false, badge: undefined },
    { href: '/consultation', label: '상담신청', icon: MessageSquare, isSpecial: false, badge: undefined },
    { href: '/about', label: '회사소개', icon: Building, isSpecial: false, badge: undefined }
  ];

  // 세금계산기 메뉴
  const taxCalculators = [
    { id: 'vat', title: '부가가치세 계산기', description: '매출/매입 세액 계산', icon: Calculator },
    { id: 'income', title: '소득세 계산기', description: '연간 소득세 계산', icon: DollarSign },
    { id: 'corporate', title: '법인세 계산기', description: '법인세율 계산', icon: Building2 },
    { id: 'withholding', title: '원천징수 계산기', description: '원천세 계산', icon: TrendingUp },
    { id: 'property', title: '재산세 계산기', description: '재산세율 계산', icon: Crown },
    { id: 'gift', title: '증여세 계산기', description: '증여세율 계산', icon: Gift }
  ];

  const actionButtons = [
    { href: '/diagnosis-form', label: 'AI 무료진단', color: 'blue', icon: Building },
    { href: '/consultation', label: '전문가상담', color: 'green', icon: MessageSquare },
    { href: '/tax-calculator', label: '세금계산기', color: 'purple', icon: Calculator },
    { href: '/services/policy-funding/investment-analysis', label: 'AI투자분석기', color: 'orange', icon: TrendingUp }
  ];

  return (
    <>
      {/* 100% 화면 크기 자동 조절 헤더 - 모든 메뉴 표시 최적화 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/20' 
          : 'bg-white/95 backdrop-blur-xl'
      }`}>
        <div className="w-full overflow-x-auto navbar-scrollbar">
          <nav className="flex items-center justify-between min-h-[44px] px-4 w-full">
            
            {/* 로고 - 왼쪽 고정 */}
            <div className="flex items-center flex-shrink-0">
              <Link 
                href="/"
                className="flex items-center hover:opacity-70 transition-opacity duration-200 mr-1"
                aria-label="AICAMP 홈페이지로 이동"
              >
                <div className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center">
                  <Image 
                    src={getImagePath('/images/aicamp_logo_del_250726.png')}
                    alt="AICAMP" 
                    width={24}
                    height={24}
                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                  />
                </div>
              </Link>
              
              {/* 홈 버튼 */}
              <Link
                href="/"
                className={`px-2 py-1 text-xs font-normal rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ml-1
                  ${pathname === '/'
                    ? 'text-white bg-gray-800'
                    : 'text-gray-800 hover:text-white hover:bg-gray-800 bg-gray-100'
                  }`}
              >
                <Home className="w-3 h-3" />
                <span>홈</span>
              </Link>
            </div>

            {/* 메인 네비게이션 - 가운데 영역 (전체 표시) */}
            <div className="hidden md:flex flex-1 justify-center mx-1 lg:mx-2 xl:mx-3">
              <div className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2 flex-wrap justify-center">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-1 py-2 text-xs font-normal rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 nav-item-hover
                      md:px-1 md:text-xs
                      lg:px-1.5 lg:text-xs
                      xl:px-2 xl:text-xs
                      2xl:px-3 2xl:text-sm
                      ${pathname === item.href
                        ? (item.isSpecial 
                            ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg ring-2 ring-purple-300' 
                            : 'text-white bg-gray-800')
                        : (item.isSpecial
                            ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-md ring-1 ring-purple-200 font-medium'
                            : 'text-gray-800 hover:text-white hover:bg-gray-800 bg-gray-100')
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {item.icon && <item.icon className="w-3 h-3 lg:w-4 lg:h-4" />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900 ml-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 액션 버튼들 - 오른쪽 (전체 표시) */}
            <div className="hidden md:flex flex-shrink-0 ml-1 lg:ml-2">
              <div className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2 flex-wrap">
                {actionButtons.map((button) => {
                  const buttonClass = `inline-block px-1 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 nav-item-hover
                    md:px-1 md:text-xs
                    lg:px-1.5 lg:text-xs
                    xl:px-2 xl:text-xs
                    2xl:px-3 2xl:text-sm
                    ${button.color === 'blue' 
                      ? 'text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-100'
                      : button.color === 'green'
                      ? 'text-green-600 hover:text-white hover:bg-green-600 bg-green-100'
                      : button.color === 'purple'
                      ? 'text-purple-600 hover:text-white hover:bg-purple-600 bg-purple-100'
                      : button.color === 'orange'
                      ? 'text-orange-600 hover:text-white hover:bg-orange-600 bg-orange-100'
                      : button.color === 'yellow'
                      ? 'text-yellow-600 hover:text-white hover:bg-yellow-600 bg-yellow-100'
                      : 'text-red-600 hover:text-white hover:bg-red-600 bg-red-100'
                  }`;

                  if ('external' in button && button.external) {
                    return (
                      <a
                        key={button.href}
                        href={button.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClass}
                        aria-label={button.label}
                      >
                        {button.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={button.href}
                      href={button.href}
                      className={buttonClass}
                      aria-label={button.label}
                    >
                      {button.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <div className="md:hidden flex-shrink-0 ml-1">
              <button
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              >
                <Menu className="w-4 h-4 text-gray-800" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 - 스크롤 가능 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden bg-white"
          >
            {/* 헤더 고정 영역 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">AICAMP 서비스</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="메뉴 닫기"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 스크롤 가능한 메뉴 영역 */}
            <div className="overflow-y-auto h-full pb-20">
              <div className="px-4 py-6 space-y-6">
                {/* 최상단 주요 액션 버튼들 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-3 px-1">⭐ 주요 서비스</div>
                  <div className="grid grid-cols-1 gap-3">
                    {actionButtons.map((button) => {
                      const getDescription = (label: string) => {
                        switch(label) {
                          case 'AI 무료진단': return 'AI 무료 경영진단 신청서 보기';
                          case '전문가상담': return '전문가 무료 상담';
                          case 'n8n책자구매': return 'AI 자동화 실무 가이드북';
                          case '세금계산기': return '10가지 세금 계산기';
                          case 'AI투자재무타당성분석기': return 'NPV/IRR 투자분석';
                          default: return '버그 및 개선사항 신고';
                        }
                      };

                      return (
                        <motion.div key={button.href} whileHover={{ x: 8 }} className="group">
                          {('external' in button && button.external) ? (
                            <a 
                              href={button.href} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className={`flex items-center p-4 rounded-xl transition-all duration-200 group ${
                                button.color === 'blue' 
                                  ? 'bg-blue-50 hover:bg-blue-100 border-2 border-blue-200'
                                  : button.color === 'green'
                                  ? 'bg-green-50 hover:bg-green-100 border-2 border-green-200'
                                  : button.color === 'purple'
                                  ? 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-200'
                                  : button.color === 'orange'
                                  ? 'bg-orange-50 hover:bg-orange-100 border-2 border-orange-200'
                                  : button.color === 'yellow'
                                  ? 'bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200'
                                  : 'bg-red-50 hover:bg-red-100 border-2 border-red-200'
                              }`}>
                                <button.icon className={`w-7 h-7 mr-4 ${
                                  button.color === 'blue' 
                                    ? 'text-blue-600 group-hover:text-blue-700'
                                    : button.color === 'green'
                                    ? 'text-green-600 group-hover:text-green-700'
                                    : button.color === 'purple'
                                    ? 'text-purple-600 group-hover:text-purple-700'
                                    : button.color === 'orange'
                                    ? 'text-orange-600 group-hover:text-orange-700'
                                    : button.color === 'yellow'
                                    ? 'text-yellow-600 group-hover:text-yellow-700'
                                    : 'text-red-600 group-hover:text-red-700'
                                }`} />
                                <div className="flex-1">
                                  <div className={`font-bold text-lg ${
                                    button.color === 'blue' 
                                      ? 'text-blue-900 group-hover:text-blue-800'
                                      : button.color === 'green'
                                      ? 'text-green-900 group-hover:text-green-800'
                                      : button.color === 'purple'
                                      ? 'text-purple-900 group-hover:text-purple-800'
                                      : button.color === 'orange'
                                      ? 'text-orange-900 group-hover:text-orange-800'
                                      : button.color === 'yellow'
                                      ? 'text-yellow-900 group-hover:text-yellow-800'
                                      : 'text-red-900 group-hover:text-red-800'
                                  }`}>
                                    {button.label}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {getDescription(button.label)}
                                  </div>
                                </div>
                              </div>
                            </a>
                          ) : (
                            <Link 
                              href={button.href}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className={`flex items-center p-4 rounded-xl transition-all duration-200 group ${
                                button.color === 'blue' 
                                  ? 'bg-blue-50 hover:bg-blue-100 border-2 border-blue-200'
                                  : button.color === 'green'
                                  ? 'bg-green-50 hover:bg-green-100 border-2 border-green-200'
                                  : button.color === 'purple'
                                  ? 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-200'
                                  : button.color === 'orange'
                                  ? 'bg-orange-50 hover:bg-orange-100 border-2 border-orange-200'
                                  : button.color === 'yellow'
                                  ? 'bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200'
                                  : 'bg-red-50 hover:bg-red-100 border-2 border-red-200'
                              }`}>
                                <button.icon className={`w-7 h-7 mr-4 ${
                                  button.color === 'blue' 
                                    ? 'text-blue-600 group-hover:text-blue-700'
                                    : button.color === 'green'
                                    ? 'text-green-600 group-hover:text-green-700'
                                    : button.color === 'purple'
                                    ? 'text-purple-600 group-hover:text-purple-700'
                                    : button.color === 'orange'
                                    ? 'text-orange-600 group-hover:text-orange-700'
                                    : button.color === 'yellow'
                                    ? 'text-yellow-600 group-hover:text-yellow-700'
                                    : 'text-red-600 group-hover:text-red-700'
                                }`} />
                                <div className="flex-1">
                                  <div className={`font-bold text-lg ${
                                    button.color === 'blue' 
                                      ? 'text-blue-900 group-hover:text-blue-800'
                                      : button.color === 'green'
                                      ? 'text-green-900 group-hover:text-green-800'
                                      : button.color === 'purple'
                                      ? 'text-purple-900 group-hover:text-purple-800'
                                      : button.color === 'orange'
                                      ? 'text-orange-900 group-hover:text-orange-800'
                                      : button.color === 'yellow'
                                      ? 'text-yellow-900 group-hover:text-yellow-800'
                                      : 'text-red-900 group-hover:text-red-800'
                                  }`}>
                                    {button.label}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {getDescription(button.label)}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 네비게이션 메뉴 */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-gray-700 mb-3 px-1">📋 서비스 메뉴</div>
                  <div className="grid grid-cols-1 gap-2">
                    {/* 홈 버튼 */}
                    <motion.div whileHover={{ x: 8 }} className="group">
                      <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                          pathname === '/'
                            ? 'bg-gray-100 border-2 border-gray-300'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <Home className="w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-800" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 group-hover:text-gray-800">
                            홈
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                    
                    {navigationItems.map((item) => (
                      <motion.div key={item.href} whileHover={{ x: 8 }} className="group">
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                            pathname === item.href
                              ? 'bg-gray-100 border-2 border-gray-300'
                              : 'hover:bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          {item.icon && (
                            <item.icon className="w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-800" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-gray-800">
                              {item.label}
                            </div>
                            {item.badge && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900 ml-2">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 세금계산기 메뉴 */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-gray-700 mb-3 px-1">🧮 세금계산기</div>
                  <div className="grid grid-cols-1 gap-2">
                    {taxCalculators.map((calculator) => (
                      <motion.div key={calculator.id} whileHover={{ x: 8 }} className="group">
                        <button
                          onClick={() => handleTaxCalculatorSelect(calculator.id)}
                          className="w-full flex items-center p-3 rounded-lg transition-all duration-200 group hover:bg-gray-50 border-2 border-transparent"
                        >
                          <calculator.icon className="w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-800" />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900 group-hover:text-gray-800">
                              {calculator.title}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {calculator.description}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
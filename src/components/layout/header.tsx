'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
  Beaker
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
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // 네비게이션 메뉴 데이터
  const navigationItems = [
    { href: '/', label: '홈', icon: Home },
    { href: '/services/business-analysis', label: '사업분석', icon: BarChart3 },
    { href: '/services/ai-productivity', label: 'AI일터혁신', icon: Zap },
    { href: '/services/policy-funding', label: '정책자금', icon: Building2 },
    { href: '/services/tech-startup', label: '기술창업', icon: Rocket },
    { href: '/services/certification', label: '벤처/ISO/인증', icon: Shield },
    { href: '/services/website', label: '매출증대웹페이지', icon: Building },
    { href: '/cases', label: '성공사례', icon: Trophy },
    { href: '/center-leader', label: '교장', icon: User },
    { href: '/seminar', label: '세미나', icon: Video },
    { href: '/support', label: '고객지원', icon: Headphones }
  ];

  // 세금계산기 메뉴 데이터
  const taxCalculators = [
    {
      id: 'earned-income',
      title: '근로소득세 계산기',
      description: '급여 소득자를 위한 소득세 계산',
      icon: User,
      color: 'blue'
    },
    {
      id: 'comprehensive-income',
      title: '종합소득세 계산기',
      description: '사업소득, 기타소득 포함 종합소득세',
      icon: FileText,
      color: 'green'
    },
    {
      id: 'capital-gains',
      title: '양도소득세 계산기',
      description: '부동산, 주식 양도소득세 계산',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 'inheritance',
      title: '상속세 계산기',
      description: '상속재산에 대한 상속세 계산',
      icon: Building2,
      color: 'orange'
    },
    {
      id: 'gift',
      title: '증여세 계산기',
      description: '증여재산에 대한 증여세 계산',
      icon: DollarSign,
      color: 'pink'
    },
    {
      id: 'corporate-tax',
      title: '법인세 계산기',
      description: '법인의 소득에 대한 법인세 계산',
      icon: Building2,
      color: 'indigo'
    },
    {
      id: 'vat',
      title: '부가가치세 계산기',
      description: '매출, 매입세액 부가가치세 계산',
      icon: Calculator,
      color: 'cyan'
    },
    {
      id: 'withholding',
      title: '원천징수세 계산기',
      description: '급여, 용역비 원천징수세 계산',
      icon: FileText,
      color: 'emerald'
    },
    {
      id: 'business-inheritance',
      title: '가업상속세 계산기',
      description: '중소기업·중견기업 가업상속공제',
      icon: Crown,
      color: 'violet'
    },
    {
      id: 'stock-transfer',
      title: '주식이동세 계산기',
      description: '주식 매매시 발생하는 양도소득세',
      icon: TrendingUp,
      color: 'pink'
    }
  ];

  const actionButtons = [
    { href: '/diagnosis', label: 'AI 무료진단', color: 'blue', icon: Building },
    { href: '/consultation', label: '전문가상담', color: 'green', icon: MessageSquare },
    { href: '/tax-calculator', label: '세금계산기', color: 'purple', icon: Calculator },
    { href: '/services/policy-funding/operating-funding', label: '운전자금', color: 'green', icon: DollarSign },
    { href: '/services/policy-funding/startup-funding', label: '창업자금', color: 'purple', icon: Lightbulb },
    { href: '/services/policy-funding/rd-funding', label: 'R&D자금', color: 'orange', icon: Beaker },
    { href: '/services/policy-funding#investment-analysis-section', label: '투자재무타당성분석기', color: 'orange', icon: TrendingUp },
    { href: '/support/contact', label: '오류신고', color: 'red', icon: MessageSquare }
  ];

  return (
    <>
      {/* 애플스토어 스타일 헤더 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/20' 
          : 'bg-white/95 backdrop-blur-xl'
      }`}>
        <div className="max-w-screen-2xl mx-auto">
          <nav className="flex items-center justify-between h-11 px-4 lg:px-6">
            
            {/* 로고 - 왼쪽 */}
            <Link 
              href="/"
              className="flex items-center hover:opacity-70 transition-opacity duration-200"
              aria-label="AICAMP 홈페이지로 이동"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <img 
                  src={getImagePath('/images/aicamp_logo.png')}
                  alt="AICAMP" 
                  className="w-6 h-6 object-contain"
                />
              </div>
            </Link>

            {/* 메인 네비게이션 - 가운데 */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-1.5 py-2 text-xs font-normal rounded-full transition-all duration-200 whitespace-nowrap
                    lg:px-2 lg:text-xs
                    xl:px-3 xl:text-sm
                    2xl:px-3.5 2xl:text-sm
                    ${pathname === item.href
                      ? 'text-white bg-gray-800'
                      : 'text-gray-800 hover:text-white hover:bg-gray-800 bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* 액션 버튼들 - 오른쪽 */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {actionButtons.map((button) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className={`inline-block px-1.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap
                    lg:px-2 lg:text-xs
                    xl:px-3 xl:text-sm
                    2xl:px-3 2xl:text-sm
                    ${button.color === 'blue' 
                      ? 'text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-100'
                      : button.color === 'green'
                      ? 'text-green-600 hover:text-white hover:bg-green-600 bg-green-100'
                      : button.color === 'purple'
                      ? 'text-purple-600 hover:text-white hover:bg-purple-600 bg-purple-100'
                      : button.color === 'orange'
                      ? 'text-orange-600 hover:text-white hover:bg-orange-600 bg-orange-100'
                      : 'text-red-600 hover:text-white hover:bg-red-600 bg-red-100'
                  }`}
                  aria-label={button.label}
                >
                  {button.label}
                </Link>
              ))}
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <div className="lg:hidden">
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
                    {actionButtons.map((button) => (
                      <motion.div key={button.href} whileHover={{ x: 8 }} className="group">
                        <Link href={button.href} onClick={() => setIsMenuOpen(false)}>
                          <div className={`flex items-center p-4 rounded-xl transition-all duration-200 group ${
                            button.color === 'blue' 
                              ? 'bg-blue-50 hover:bg-blue-100 border-2 border-blue-200'
                              : button.color === 'green'
                              ? 'bg-green-50 hover:bg-green-100 border-2 border-green-200'
                              : button.color === 'purple'
                              ? 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-200'
                              : button.color === 'orange'
                              ? 'bg-orange-50 hover:bg-orange-100 border-2 border-orange-200'
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
                                  : 'text-red-900 group-hover:text-red-800'
                              }`}>
                                {button.label}
                              </div>
                              <div className={`text-sm ${
                                button.color === 'blue' 
                                  ? 'text-blue-600 group-hover:text-blue-700'
                                  : button.color === 'green'
                                  ? 'text-green-600 group-hover:text-green-700'
                                  : button.color === 'purple'
                                  ? 'text-purple-600 group-hover:text-purple-700'
                                  : button.color === 'orange'
                                  ? 'text-orange-600 group-hover:text-orange-700'
                                  : 'text-red-600 group-hover:text-red-700'
                              }`}>
                                {button.label === 'AI 무료진단' ? 'AI 기반 기업 진단' : 
                                 button.label === '전문가상담' ? '전문가 무료 상담' : 
                                 button.label === '세금계산기' ? '10가지 세금 계산기' :
                                 button.label === '투자재무타당성분석기' ? 'NPV/IRR 투자분석' :
                                 '버그 및 개선사항 신고'}
                              </div>
                            </div>
                            <ChevronRight className={`w-6 h-6 ${
                              button.color === 'blue' 
                                ? 'text-blue-400 group-hover:text-blue-600'
                                : button.color === 'green'
                                ? 'text-green-400 group-hover:text-green-600'
                                : button.color === 'purple'
                                ? 'text-purple-400 group-hover:text-purple-600'
                                : button.color === 'orange'
                                ? 'text-orange-400 group-hover:text-orange-600'
                                : 'text-red-400 group-hover:text-red-600'
                            }`} />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 전체 서비스 메뉴 - 요청된 순서대로 배치 */}
                <div className="pb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-3 px-1">📋 전체 서비스</div>
                  {[
                    { href: '/', label: '홈', icon: Home, description: '메인페이지' },
                    { href: '/services/business-analysis', label: '사업분석', icon: BarChart3, description: '비즈니스 컨설팅' },
                    { href: '/services/ai-productivity', label: 'AI일터혁신', icon: Zap, description: 'AI 업무 자동화' },
                    { href: '/services/website', label: '매출증대웹페이지', icon: Building, description: 'SEO 최적화 웹사이트' },
                    { href: '/services/policy-funding', label: '정책자금', icon: Building2, description: '듀얼브레인 정책자금 컨설팅' },
                    { href: '/services/tech-startup', label: '기술창업', icon: Rocket, description: '스타트업 지원' },
                    { href: '/services/certification', label: '벤처/ISO/인증', icon: Shield, description: '각종 인증 획득' },
                    { href: '/cases', label: '성공사례', icon: Trophy, description: '고객 성공 스토리' },
                    { href: '/center-leader', label: '교장', icon: User, description: '이후경 경영지도사' },
                    { href: '/seminar', label: '세미나', icon: Video, description: '교육 프로그램' },
                    { href: '/support', label: '고객지원', icon: Headphones, description: '문의 및 지원' }
                  ].map((item) => (
                    <motion.div key={item.href} whileHover={{ x: 8 }} className="group mb-2">
                      <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                        <div className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group">
                          <item.icon className="w-6 h-6 mr-4 text-blue-600 group-hover:text-blue-700" />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                              {item.label}
                            </div>
                            <div className="text-sm text-gray-500 group-hover:text-blue-600">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* 모바일 세금계산기 섹션 */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-3 px-1">🧮 세금계산기</div>
                  {taxCalculators.map((calc) => (
                    <motion.div key={calc.id} whileHover={{ x: 8 }} className="group mb-2">
                      <button
                        onClick={() => {
                          handleTaxCalculatorSelect(calc.id);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left"
                      >
                        <div className="flex items-center p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group">
                          <calc.icon className="w-5 h-5 mr-4 text-green-600 group-hover:text-green-700" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-green-700 text-sm">
                              {calc.title}
                            </div>
                            <div className="text-xs text-gray-500 group-hover:text-green-600">
                              {calc.description}
                            </div>
                          </div>
                          <Calculator className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
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
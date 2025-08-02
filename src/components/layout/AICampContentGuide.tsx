'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Zap, 
  Building2, 
  Rocket, 
  Shield, 
  Building,
  Trophy,
  User,
  Video,
  Headphones,
  Calculator,
  MessageSquare,
  DollarSign,
  Lightbulb,
  Beaker,
  TrendingUp,
  FileText,
  ChevronRight,
  Sparkles,
  Star,
  Clock,
  Target,
  ArrowDown,
  X,
  Menu,
  Book,
  Navigation
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  href: string;
  category: string;
  popular?: boolean;
  new?: boolean;
}

// AI CAMP 컨텐츠 데이터
const contentData: ContentItem[] = [
  // 핵심 서비스
  {
    id: 'business-analysis',
    title: '프리미엄 사업분석',
    subtitle: 'BM ZEN 방법론',
    description: '신규사업 성공률 95%, 매출 4배 증가 보장',
    icon: BarChart3,
    color: 'text-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    href: '/services/business-analysis',
    category: '핵심서비스',
    popular: true
  },
  {
    id: 'ai-productivity',
    title: 'AI 일터혁신',
    subtitle: '업무 효율성 40% 향상',
    description: '20주 프로그램으로 디지털 혁신 완성',
    icon: Zap,
    color: 'text-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    href: '/services/ai-productivity',
    category: '핵심서비스',
    new: true
  },
  {
    id: 'policy-funding',
    title: '정책자금 컨설팅',
    subtitle: '98% 성공률, 20일 완성',
    description: '듀얼브레인 방법론으로 평균 5.8억원 확보',
    icon: Building2,
    color: 'text-green-600',
    bgColor: 'from-green-50 to-green-100',
    href: '/services/policy-funding',
    category: '핵심서비스',
    popular: true
  },
  {
    id: 'tech-startup',
    title: '기술창업 지원',
    subtitle: '평균 5억원 자금 확보',
    description: '정부지원 연계 기술사업화, 3년 사후관리',
    icon: Rocket,
    color: 'text-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
    href: '/services/tech-startup',
    category: '핵심서비스'
  },
  {
    id: 'certification',
    title: '벤처/ISO/인증',
    subtitle: '연간 5천만원 세제혜택',
    description: '벤처·ISO·ESG 통합 인증 100% 취득 보장',
    icon: Shield,
    color: 'text-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100',
    href: '/services/certification',
    category: '핵심서비스'
  },
  {
    id: 'website',
    title: '매출증대 웹페이지',
    subtitle: '온라인 매출 30% 증대',
    description: '지능형 SEO 최적화, 무료 1년 관리',
    icon: Building,
    color: 'text-cyan-600',
    bgColor: 'from-cyan-50 to-cyan-100',
    href: '/services/website',
    category: '핵심서비스'
  },

  // 주요 액션
  {
    id: 'diagnosis',
    title: 'AI 무료진단',
    subtitle: 'GEMINI 2.5 Flash, 즉시 결과',
    description: 'AI 활용도 정밀분석으로 맞춤형 전략 제공',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    href: '/diagnosis',
    category: '주요액션',
    popular: true
  },
  {
    id: 'consultation',
    title: '전문가 상담',
    subtitle: '25년 경력 전문가',
    description: '이후경 경영지도사 직접 상담',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'from-green-50 to-green-100',
    href: '/consultation',
    category: '주요액션'
  },
  {
    id: 'tax-calculator',
    title: '세금계산기',
    subtitle: '10가지 계산기',
    description: '소득세, 법인세, 상속세 등 종합 계산',
    icon: Calculator,
    color: 'text-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    href: '/tax-calculator',
    category: '주요액션'
  },
  {
    id: 'investment-analysis',
    title: '투자재무 타당성분석',
    subtitle: 'NPV/IRR 분석',
    description: 'AI 기반 투자 타당성 검토 시스템',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
    href: '/services/policy-funding#investment-analysis-section',
    category: '주요액션',
    new: true
  },

  // 기타 서비스
  {
    id: 'cases',
    title: '성공사례',
    subtitle: '고객 성공 스토리',
    description: '실제 고객들의 생생한 성과 경험담',
    icon: Trophy,
    color: 'text-yellow-600',
    bgColor: 'from-yellow-50 to-yellow-100',
    href: '/cases',
    category: '기타서비스'
  },
  {
    id: 'center-leader',
    title: 'CEO & 교장',
    subtitle: '홍용기 CEO · 이후경 교장',
    description: '28년 경력 전문가 프로필',
    icon: User,
    color: 'text-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    href: '/center-leader',
    category: '기타서비스'
  },
  {
    id: 'seminar',
    title: '세미나 & 교육',
    subtitle: '전문가 교육과정',
    description: 'AI, 경영혁신 전문 교육 프로그램',
    icon: Video,
    color: 'text-pink-600',
    bgColor: 'from-pink-50 to-pink-100',
    href: '/seminar',
    category: '기타서비스'
  },
  {
    id: 'support',
    title: '고객지원',
    subtitle: '24시간 지원센터',
    description: 'FAQ, 문의하기, 공지사항, 자료실',
    icon: Headphones,
    color: 'text-teal-600',
    bgColor: 'from-teal-50 to-teal-100',
    href: '/support',
    category: '기타서비스'
  }
];

const AICampContentGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isMinimized, setIsMinimized] = useState(false);

  const categories = ['전체', '핵심서비스', '주요액션', '기타서비스'];

  const filteredContent = selectedCategory === '전체' 
    ? contentData 
    : contentData.filter(item => item.category === selectedCategory);

  // 페이지 로드 시 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 1초 후 나타남

    return () => clearTimeout(timer);
  }, []);

  // 스크롤시 컴포넌트 최소화
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 20,
          duration: 0.8 
        }}
        className={`fixed z-40 left-0 right-0 transition-all duration-500 ${
          isMinimized ? 'bottom-28' : 'bottom-24'
        }`}
      >
        <div className={`mx-auto transition-all duration-500 ${
          isMinimized ? 'max-w-md' : 'max-w-7xl'
        }`}>
          <div className={`bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl transition-all duration-500 ${
            isMinimized ? 'rounded-2xl mx-4' : 'rounded-t-3xl'
          }`}>
            
            {/* 최소화된 상태 */}
            {isMinimized ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="p-4"
              >
                <button
                  onClick={() => setIsMinimized(false)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Book className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                    <div className="text-left">
                      <div className="font-bold text-lg">AI CAMP 가이드</div>
                      <div className="text-sm text-blue-100">원하는 서비스를 찾아보세요</div>
                    </div>
                  </div>
                  <ArrowDown className="w-5 h-5 rotate-180 group-hover:translate-y-1 transition-transform duration-200" />
                </button>
              </motion.div>
            ) : (
              /* 전체 상태 */
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Book className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">AI CAMP 서비스 가이드</h2>
                      <p className="text-gray-600">필요한 서비스를 쉽게 찾아보세요</p>
                    </div>
                  </motion.div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="최소화"
                    >
                      <ArrowDown className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="닫기"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* 카테고리 필터 */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>

                {/* 컨텐츠 그리드 */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredContent.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          type: 'spring',
                          stiffness: 100,
                          damping: 15
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { type: 'spring', stiffness: 400, damping: 20 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href={item.href}>
                          <div className={`relative p-4 bg-gradient-to-br ${item.bgColor} rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden`}>
                            
                            {/* 배경 이펙트 */}
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* 뱃지들 */}
                            <div className="absolute top-2 right-2 flex space-x-1">
                              {item.popular && (
                                <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                  HOT
                                </div>
                              )}
                              {item.new && (
                                <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                  NEW
                                </div>
                              )}
                            </div>
                            
                            {/* 아이콘 */}
                            <div className={`w-12 h-12 rounded-xl ${item.color} bg-white/50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-200`}>
                              <item.icon className="w-6 h-6" />
                            </div>
                            
                            {/* 텍스트 */}
                            <div className="relative z-10">
                              <h3 className="font-bold text-gray-900 mb-1 text-sm group-hover:text-blue-600 transition-colors duration-200">
                                {item.title}
                              </h3>
                              <p className={`text-xs font-medium mb-2 ${item.color}`}>
                                {item.subtitle}
                              </p>
                              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            
                            {/* 화살표 */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* 하단 액션 */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200"
                >
                  <Link href="/diagnosis" className="flex-1">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>3분 무료 AI 진단</span>
                    </button>
                  </Link>
                  <Link href="/consultation" className="flex-1">
                    <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>전문가 상담</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AICampContentGuide; 
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  Factory, 
  Rocket, 
  Award, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Quote,
  Clock,
  FileText,
  Zap,
  Shield,
  Sparkles,
  CheckCircle2,
  Phone,
  Bot
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MCenterChatInterface from '@/components/chatbot/MCenterChatInterface';
import AICampContentGuide from '@/components/layout/AICampContentGuide';
import BookPromotionModal from '@/components/layout/BookPromotionModal';
import BookPromotionBanner from '@/components/layout/BookPromotionBanner';

// 서비스 데이터 - 애플스토어 스타일로 업데이트
const services = [
  {
    id: 'business-analysis',
    title: '프리미엄 사업분석',
    subtitle: '신규사업 성공률 95%',
    description: '차세대 비즈니스 혁신 솔루션',
    icon: Cpu,
    color: 'bg-white text-white',
    bgColor: 'from-blue-50 to-purple-50',
    textColor: 'text-white',
    href: '/services/business-analysis',
    benefits: ['95% 성공률 보장', '매출 4배 증가', '5단계 전략 프레임워크'],
    badge: '추천',
    featured: true
  },
  {
    id: 'ai-productivity',
    title: '혁신 AI 솔루션',
    subtitle: '업무 효율성 40% 향상',
    description: '20주 프로그램으로 디지털 혁신 완성',
    icon: Zap,
    color: 'bg-purple-100 text-purple-600',
    bgColor: 'from-purple-50 to-pink-50',
    textColor: 'text-white',
    href: '/services/ai-productivity',
    benefits: ['정부 100% 지원', '20주 집중 프로그램', '업무 효율성 40% 향상'],
    badge: '정부지원'
  },
  {
    id: 'policy-funding',
    title: '정책자금 컨설팅',
    subtitle: '98% 성공률, 20일 완성',
    description: '듀얼브레인 방법론 기반 혁신 컨설팅',
    icon: Factory,
    color: 'bg-orange-100 text-orange-600',
    bgColor: 'from-orange-50 to-red-50',
    textColor: 'text-white',
    href: '/services/policy-funding',
    benefits: ['98% 선정 성공률', '20일 완성', '5.8억원 평균 확보'],
    badge: '정책자금'
  },
  {
    id: 'tech-startup',
    title: '기술사업화/창업',
    subtitle: '평균 5억원 자금 확보',
    description: '정부지원 연계 기술사업화',
    icon: Rocket,
    color: 'bg-green-100 text-green-600',
    bgColor: 'from-green-50 to-emerald-50',
    textColor: 'text-white',
    href: '/services/tech-startup',
    benefits: ['평균 5억원 확보', '성공률 85%', '3년 사후관리'],
    badge: '성장'
  },
  {
    id: 'certification',
    title: '프리미엄 인증지원',
    subtitle: '연간 5천만원 세제혜택',
    description: '벤처·ISO·ESG 통합 인증',
    icon: Award,
    color: 'bg-blue-100 text-blue-600',
    bgColor: 'from-blue-50 to-cyan-50',
    textColor: 'text-white',
    href: '/services/certification',
    benefits: ['5천만원 세제혜택', '통합 인증 관리', '100% 취득 보장'],
    badge: '인증'
  },
  {
    id: 'website',
    title: '디지털 혁신',
    subtitle: '온라인 매출 30% 증대',
    description: '차세대 디지털 솔루션',
    icon: Globe,
    color: 'bg-indigo-100 text-indigo-600',
    bgColor: 'from-indigo-50 to-violet-50',
    textColor: 'text-white',
    href: '/services/website',
    benefits: ['매출 30% 증대', '지능형 최적화', '무료 1년 관리'],
    badge: '디지털'
  }
];

// 성장 단계 데이터 - 애플스토어 스타일로 업데이트
const growthStages = [
  {
    step: '1단계',
    period: '1-3년',
    title: '기반 구축',
    description: '창업 초기 필수 요소 완성',
    features: ['창업 자금 확보', '기본 인증 취득', '신뢰도 구축'],
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    icon: '1'
  },
  {
    step: '2단계',
    period: '3-7년',
    title: '성장 가속화',
    description: '조직 확장과 시스템 구축',
    features: ['조직 확장', '기술 고도화', '매출 확대'],
    color: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    icon: '2'
  },
  {
    step: '3단계',
    period: '7-10년',
    title: '시장 지배력',
    description: '혁신 도입과 글로벌 진출',
    features: ['혁신 도입', '글로벌 진출', '생태계 구축'],
    color: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    icon: '3'
  },
  {
    step: '4단계',
    period: '10년+',
    title: '지속가능 혁신',
    description: '미래 지향적 기업 전환',
    features: ['디지털 전환', '사회적 책임', '미래 준비'],
    color: 'from-orange-50 to-yellow-50',
    borderColor: 'border-orange-200',
    icon: '4'
  }
];

// 실시간 지표 데이터
const performanceMetrics = [
  { label: '완료된 진단', value: '1,247', suffix: '건', icon: BarChart3, color: 'text-blue-600' },
  { label: '성공 프로젝트', value: '324', suffix: '건', icon: Target, color: 'text-green-600' },
  { label: '고객 절약 효과', value: '127', suffix: '억원', icon: TrendingUp, color: 'text-purple-600' },
  { label: '고객 만족도', value: '94.2', suffix: '%', icon: Star, color: 'text-orange-600' }
];

// 고객 후기 데이터
const testimonials = [
  {
    name: '김세무',
    title: '세무법인 대표',
    company: '○○세무법인',
    content: 'AI 진단을 통해 고객사에게 더 전문적인 솔루션을 제공할 수 있게 되었습니다. 고객 만족도가 크게 향상되었어요.',
    rating: 5,
    avatar: 'K'
  },
  {
    name: '이창업',
    title: '대표이사',
    company: '스마트제조(주)',
              content: '정책자금 컨설팅으로 5억원 정부지원을 확보했습니다. 전문가의 체계적인 지원이 정말 도움이 되었습니다.',
    rating: 5,
    avatar: 'L'
  },
  {
    name: '박기술',
    title: 'CTO',
    company: '혁신테크',
    content: '기술사업화 지원을 받아 5억원 자금을 확보했습니다. 3년 사후관리까지 체계적으로 지원받고 있어요.',
    rating: 5,
    avatar: 'P'
  }
];

// 숫자 카운트업 애니메이션 훅
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart 이징 적용
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  // 교차 관찰자로 화면에 보일 때 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return count;
}

// 애플스토어 스타일 메트릭 카드 컴포넌트
function MetricCard({ metric }: { metric: typeof performanceMetrics[0] }) {
  const count = useCountUp(parseInt(metric.value.replace('.', '')));
  const displayValue = metric.label === '고객 만족도' 
    ? (count / 10).toFixed(1) 
    : count.toLocaleString();

  return (
    <div className="bg-white rounded-3xl shadow-lg border-0 p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 mx-auto mb-4 rounded-2xl flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300`}>
          <metric.icon className={`w-8 h-8 ${metric.color}`} />
        </div>
        <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${metric.color} font-mono`}>
          <span className="text-overflow-safe">{displayValue}</span>
          <span className="text-lg ml-1 text-gray-500">{metric.suffix}</span>
        </div>
        <p className="text-gray-600 text-overflow-safe">{metric.label}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleChatbotConnect = () => {
    setIsConnecting(true);
    
                            // "AI-CAMP 교장 챗봇과 연결하기...." 메시지 표시
    setTimeout(() => {
      setIsConnecting(false);
      setIsChatOpen(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 애플스토어 스타일 Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-400 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* 상단 배지 */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-sm mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-semibold text-gray-800">프리미엄 비즈니스 혁신 프레임워크</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6">
              <span className="block text-gray-900">기업 성장의 새로운 차원을</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                경험하세요
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed" 
               style={{ animationDelay: '0.2s' }}>
              <strong className="text-gray-800">혁신 AI, 스마트 투자, 기술창업, 프리미엄 인증, 디지털 혁신</strong> - 
              6대 영역 통합 솔루션으로 차원이 다른 비즈니스 성과를 만나보세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                 style={{ animationDelay: '0.4s' }}>
              <Link href="/services">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  사업분석 시작하기
                </button>
              </Link>
              
              <Link href="/diagnosis">
                <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  AI역량진단
                </button>
              </Link>
              
              <Link href="/consultation">
                <button className="px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  전문가 상담 신청
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* n8n 책자 홍보 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* 배경 효과 - 모바일에서 축소 */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 상단 배지 - 모바일 최적화 */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-lg mb-6 sm:mb-8 animate-pulse text-sm sm:text-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>신간 출간! 국내최초 한국어판</span>
            </div>
            
            {/* 제목과 설명을 먼저 표시 */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  AI 자동화의 끝판왕!
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-semibold mb-4">
                n8n을 활용한 업무혁신
              </p>
            </div>

            {/* 책표지와 상세 내용을 아래에 배치 */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 sm:gap-12 lg:gap-16 mb-6 sm:mb-8">
              {/* 좌측: 더 큰 책표지 이미지 */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <a 
                  href="/n8n_1-20.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <div className="relative w-48 h-60 sm:w-56 sm:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-90 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                    <Image
                      src="/images/book_1_cover.JPG?v=3"
                      alt="AI 자동화의 끝판왕! n8n을 활용한 업무혁신 책표지"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      className="group-hover:brightness-110 transition-all duration-300"
                    />
                    {/* 호버 효과 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 책표지 위 "클릭하여 미리보기" 텍스트 */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-white text-sm font-medium">PDF 다운로드</p>
                      </div>
                    </div>
                  </div>
                </a>
                
                {/* 책표지 아래 간단한 정보 */}
                <div className="text-center mt-4 lg:text-left">
                  <p className="text-blue-200 text-sm font-medium">국내최초 한국어판</p>
                  <p className="text-white text-sm">부크크(BookK) 출간</p>
                </div>
              </div>
              
              {/* 우측: 책 소개 내용 */}
              <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                    업무 자동화의 새로운 패러다임,<br />
                    <span className="text-yellow-300">n8n으로 혁신하세요!</span>
                  </h3>
                  
                  <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-6">
                    <strong className="text-yellow-300">독일에서 개발된 글로벌 자동화 프로그램 n8n</strong>을 
                    국내 중소기업과 스타트업이 <strong className="text-green-200">실제 업무에 바로 적용</strong>할 수 있도록, 
                    우리나라의 비즈니스 문화와 시스템에 맞는 <strong className="text-purple-200">실무 중심의 사례와 방법론</strong>을 담은 
                    국내 최초 한글판 가이드북입니다.
                  </p>
                </div>
                
                {/* 핵심 특징 - 간결하게 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { title: "국내 최초 한글판", desc: "해외 자료 의존 탈피" },
                    { title: "실무 즉시 적용", desc: "중소기업 환경 최적화" },
                    { title: "AI Agent 구축", desc: "초간단부터 심화까지" },
                    { title: "전문가 3인 집필", desc: "박사·경영지도사·CMC" }
                  ].map((feature, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">

                      <div className="text-left">
                        <h5 className="font-bold text-white text-sm leading-tight">{feature.title}</h5>
                        <p className="text-xs text-blue-200 leading-relaxed mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CTA 버튼들 - 더 눈에 띄게 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
                  <a 
                    href="https://bookk.co.kr/bookStore/687ca81fda03645ce0aa85e0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >

                    지금 바로 구매하기
                  </a>
                  
                  <a 
                    href="/services/ai-productivity"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold text-base rounded-xl transition-all duration-200 transform hover:scale-105 hover:bg-white hover:text-gray-900"
                  >
                    <span className="mr-2">⚡</span>
                    AI 업무혁신 상담
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
              <Badge className="bg-red-500 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-lg">
국내최초
              </Badge>
              <Badge className="bg-blue-500 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-lg">
실무직결
              </Badge>
              <Badge className="bg-green-500 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-lg">
전문가 집필
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* 좌측: 책자 이미지 및 정보 - 모바일 최적화 */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                {/* 책자 이미지 플레이스홀더 - 모바일 최적화 */}
                <div className="w-full max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                    {/* n8n 워크플로우 다이어그램 시뮬레이션 */}
                    <div className="relative">
                      <div className="text-white text-sm sm:text-lg font-bold mb-3 sm:mb-4 leading-tight">
                        Flexible AI workflow automation<br />
                        for technical teams
                      </div>
                      
                      {/* 워크플로우 노드들 - 모바일 최적화 */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-3 sm:mb-4">
                        <div className="bg-purple-600 rounded p-1 sm:p-2 text-xs text-white text-center">IT Ops</div>
                        <div className="bg-purple-600 rounded p-1 sm:p-2 text-xs text-white text-center">Sec Ops</div>
                        <div className="bg-purple-600 rounded p-1 sm:p-2 text-xs text-white text-center">Dev Ops</div>
                        <div className="bg-purple-600 rounded p-1 sm:p-2 text-xs text-white text-center">Sales</div>
                      </div>
                      
                      {/* 중앙 플로우 - 모바일 최적화 */}
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">1</div>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <div className="w-10 h-6 sm:w-12 sm:h-8 bg-gray-700 rounded flex items-center justify-center text-white text-xs">AI</div>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">+</div>
                      </div>
                      
                      {/* 하단 설명 - 모바일 축소 */}
                      <div className="text-xs text-gray-400 text-center leading-tight">
                        글로벌 워크플로우 자동화 플랫폼
                      </div>
                    </div>
                    
                    {/* 국내최초 뱃지 - 모바일 최적화 */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-lg">
                        <div className="text-center">
                          <div className="text-xs font-bold text-gray-900">국내최초</div>
                          <div className="text-xs font-bold text-gray-900">한국어판</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 저자 정보 - 모바일 최적화 */}
                <div className="text-center">
                  <div className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-2">공동 저자</div>
                  
                  {/* 모바일에서 세로 배치, 데스크톱에서 가로 배치 */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-blue-200">
                    <div className="text-center bg-white/5 rounded-lg p-2 sm:p-3 w-full sm:w-auto">
                      <div className="font-bold text-yellow-300 text-base sm:text-lg">홍용기</div>
                      <div className="text-xs text-blue-200">AI CAMP 대표이사</div>
                      <div className="text-xs text-green-200">컨설팅학 박사 · CMC</div>
                    </div>
                    <div className="text-white font-bold hidden sm:block">×</div>
                    <div className="text-center bg-white/5 rounded-lg p-2 sm:p-3 w-full sm:w-auto">
                      <div className="font-bold text-yellow-300 text-base sm:text-lg">이후경</div>
                      <div className="text-xs text-blue-200">AI CAMP 교장 · CTO</div>
                      <div className="text-xs text-green-200">경영지도사</div>
                    </div>
                    <div className="text-white font-bold hidden sm:block">×</div>
                    <div className="text-center bg-white/5 rounded-lg p-2 sm:p-3 w-full sm:w-auto">
                      <div className="font-bold text-yellow-300 text-base sm:text-lg">홍정민</div>
                      <div className="text-xs text-blue-200">박사과정 · CMC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 우측: 책자 소개 및 혜택 - 모바일 최적화 */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
                  업무 자동화의 새로운 패러다임,<br />
                  <span className="text-yellow-300">n8n으로 혁신하세요!</span>
                </h3>
                
                <p className="text-base sm:text-xl text-blue-100 leading-relaxed mb-6 sm:mb-8 text-left px-2">
                  <strong className="text-yellow-300">독일에서 개발된 글로벌 자동화 프로그램 n8n</strong>을 
                  국내 중소기업과 스타트업이 <strong className="text-green-200">실제 업무에 바로 적용</strong>할 수 있도록, 
                  우리나라의 비즈니스 문화와 시스템에 맞는 <strong className="text-purple-200">실무 중심의 사례와 방법론</strong>을 담은 
                  국내 최초 한글판 가이드북입니다.
                </p>
              </div>
              
              {/* 핵심 특징 - 모바일 최적화 */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-2">이 책의 핵심 특징</h4>
                
                {[
                  { icon: Target, title: "국내 최초 한글판", desc: "해외 자료 의존에서 벗어난 체계적 실무 가이드" },
                  { icon: Zap, title: "실무 즉시 적용", desc: "중소기업·스타트업 환경에 최적화된 사례 중심" },
                  { icon: Cpu, title: "AI Agent 구축", desc: "초간단 AI 에이전트부터 심화 프로젝트까지" },
                  { icon: CheckCircle, title: "전문가 3인 집필", desc: "컨설팅학 박사·경영지도사·CMC 컨설턴트" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 mx-2">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h5 className="font-bold text-white text-base sm:text-lg leading-tight">{feature.title}</h5>
                      <p className="text-sm sm:text-base text-blue-200 leading-relaxed mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA 버튼들 - 모바일 터치 최적화 */}
              <div className="flex flex-col gap-3 sm:gap-4 px-2">
                <a 
                  href="https://bookk.co.kr/bookStore/687ca81fda03645ce0aa85e0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-4 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base sm:text-lg rounded-xl sm:rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >

                  지금 바로 구매하기
                </a>
                
                <Link 
                  href="/services/ai-productivity"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-white hover:text-gray-900"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  AI 업무혁신 상담
                </Link>
              </div>
              
              {/* 목차 정보 - 모바일 최적화 */}
              <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 mx-2">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-white font-bold text-base sm:text-lg mb-2">주요 목차</div>
                </div>
                
                <div className="grid grid-cols-1 gap-2 sm:gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                    <div className="font-bold text-yellow-300 mb-1 text-sm sm:text-base">Part I</div>
                    <div className="text-blue-200 text-xs sm:text-sm text-left">AI 자동화, 왜 n8n인가?</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                    <div className="font-bold text-yellow-300 mb-1 text-sm sm:text-base">Part II</div>
                    <div className="text-blue-200 text-xs sm:text-sm text-left">n8n 사용법 완전 정복</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                    <div className="font-bold text-yellow-300 mb-1 text-sm sm:text-base">Part III</div>
                    <div className="text-blue-200 text-xs sm:text-sm text-left">실전 AI 자동화 시나리오</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                    <div className="font-bold text-yellow-300 mb-1 text-sm sm:text-base">Part IV</div>
                    <div className="text-blue-200 text-xs sm:text-sm text-left">안정적 자동화 시스템 구축</div>
                  </div>
                </div>
                
                <div className="text-center mt-3 sm:mt-4">
                  <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Template 활용부터 AI Agent 구축까지<br />
                    심화 프로젝트: 정부지원사업 알림 & 상담신청 자동화
                  </div>
                </div>
              </div>
              
              {/* 출간 정보 - 모바일 최적화 */}
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 mx-2">
                <div className="text-center">
                  <div className="text-white font-bold mb-2 text-sm sm:text-base">부크크(BookK) 출간</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    업무 자동화에 관심 있는 모든 분들을 위한 필독서
                  </div>
                </div>
              </div>
            </div>
          </div>
          
                        {/* 하단 저자 인사말 및 추천 문구 */}
          <div className="text-center mt-16 space-y-12">
            
            {/* AI CAMP 비전 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
               <Quote className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
               <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                 "AI로 일하는 즐거움을 되찾아드린다"
               </blockquote>
               <div className="text-lg text-blue-100 leading-relaxed mb-4">
                 반복적인 작업에서 해방되어 더 창조적이고 의미 있는 일에 집중할 수 있도록, 
                 <strong className="text-yellow-300">AI 자동화는 단순한 기술의 도입이 아닌 일하는 방식의 패러다임 전환</strong>입니다.
               </div>
               <cite className="text-blue-200 font-semibold">- AI CAMP의 비전</cite>
             </div>

             {/* 저자 인사말 - 모바일 최적화 */}
             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/10 max-w-6xl mx-auto">
               <div className="text-center mb-6 sm:mb-8">
                 <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full mb-3 sm:mb-4 text-sm sm:text-base">
                   <Users className="w-4 h-4" />
                   <span>저자 인사말</span>
                 </div>
                 <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-tight px-2">
                   독자 여러분께 드리는 감사와 다짐
                 </h3>
               </div>

               <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8 text-left">
                 {/* 홍용기 대표이사 - 모바일 최적화 */}
                 <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                   <div className="text-center mb-3 sm:mb-4">
                     <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                       <span className="text-white font-bold text-lg sm:text-xl">홍</span>
                     </div>
                     <h4 className="text-yellow-300 font-bold text-base sm:text-lg">홍용기</h4>
                     <p className="text-blue-200 text-xs sm:text-sm">AI CAMP 대표이사</p>
                     <p className="text-green-200 text-xs">컨설팅학 박사</p>
                   </div>
                   <blockquote className="text-blue-100 text-xs sm:text-sm leading-relaxed italic text-left">
                     "이 책의 출간은 우리나라 기업 환경에 최적화된 AI 자동화 가이드를 제공하고자 하는 
                     깊은 취지에서 시작되었습니다. 글로벌 Tool인 n8n을 국내 중소기업과 스타트업이 
                     실제 업무에 바로 적용할 수 있도록 돕고자 합니다."
                   </blockquote>
                 </div>

                 {/* 이후경 교장 - 모바일 최적화 */}
                 <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                   <div className="text-center mb-3 sm:mb-4">
                     <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                       <span className="text-white font-bold text-lg sm:text-xl">이</span>
                     </div>
                     <h4 className="text-yellow-300 font-bold text-base sm:text-lg">이후경</h4>
                     <p className="text-blue-200 text-xs sm:text-sm">AI CAMP 교장 · CTO</p>
                     <p className="text-green-200 text-xs">경영지도사</p>
                   </div>
                   <blockquote className="text-blue-100 text-xs sm:text-sm leading-relaxed italic text-left">
                     "28년간 쌓인 실무 경험과 교육자로서의 통찰이 없었다면, 이론과 실무를 완벽하게 
                     연결하는 이 책의 탄생은 불가능했을 것입니다. 독자분들의 성공적인 자동화 여정을 
                     진심으로 응원합니다."
                   </blockquote>
                 </div>

                 {/* 홍정민 CMC - 모바일 최적화 */}
                 <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                   <div className="text-center mb-3 sm:mb-4">
                     <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                       <span className="text-white font-bold text-lg sm:text-xl">홍</span>
                     </div>
                     <h4 className="text-yellow-300 font-bold text-base sm:text-lg">홍정민</h4>
                     <p className="text-blue-200 text-xs sm:text-sm">박사과정 · CMC</p>
                   </div>
                   <blockquote className="text-blue-100 text-xs sm:text-sm leading-relaxed italic text-left">
                     "출간 과정에서 AI를 활용한 디자인 작업과 편집 프로세스 최적화, 그리고 무엇보다 
                     독자들이 이해하기 쉽도록 내용을 구성하는 데 기여했습니다. 함께 학습 공동체를 
                     구축해나가겠습니다."
                   </blockquote>
                 </div>
               </div>

               <div className="text-center mt-6 sm:mt-8">
                 <div className="bg-gradient-to-r from-blue-100/10 to-purple-100/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                   <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">AI CAMP와 함께 만들어갈 미래</h4>
                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 text-xs sm:text-sm text-blue-100">
                     <div className="flex items-center justify-center sm:justify-start gap-2">
                       <Users className="w-4 h-4 text-green-400 flex-shrink-0" />
                       <span>지속적인 학습 커뮤니티</span>
                     </div>
                     <div className="flex items-center justify-center sm:justify-start gap-2">
                       <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
                       <span>실무 적용 지원</span>
                     </div>
                     <div className="flex items-center justify-center sm:justify-start gap-2">
                       <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                       <span>기술 발전과 함께하는 성장</span>
                     </div>
                   </div>
                   <div className="mt-3 sm:mt-4 text-center">
                     <p className="text-blue-200 text-xs sm:text-sm italic leading-relaxed px-2">
                       "기술이 사람을 대신하는 것이 아니라, 사람이 더 가치 있는 일에 집중할 수 있도록 돕는 것이 
                       <strong className="text-yellow-300"> 진정한 자동화의 목표</strong>입니다."
                     </p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 애플스토어 스타일 AI 상담사 섹션 */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-sm mb-8">
              <Cpu className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold text-gray-800">차세대 지능형 상담 시스템</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
              <span className="text-gray-900">AI CAMP 교장과 바로 대화하기</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <strong className="text-blue-600">최첨단 AI 기술</strong>로 무장한 전문 상담사가 24시간 대기 중입니다.<br />
              기업 성장에 관한 모든 궁금증을 지금 바로 해결해보세요!
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* 애플스토어 스타일 - 완전히 새로운 디자인 */}
            <div className="bg-white rounded-none shadow-none relative overflow-hidden min-h-[80vh] flex items-center">
              
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* 좌측: 텍스트 콘텐츠 */}
                <div className="space-y-8 order-2 lg:order-1">
                  {/* 작은 라벨 */}
                  <div className="text-center lg:text-left">
                    <span className="inline-block text-lg font-medium text-gray-600 mb-4">
                      업무 혁신
                    </span>
                  </div>
                  
                  {/* 메인 타이틀 - 애플 스타일 */}
                  <div className="text-center lg:text-left">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight tracking-tight mb-6">
                      완전히 새로운<br />
                      <span className="text-blue-600">AI 상담 경험</span>
                    </h2>
                  </div>
                  
                  {/* 설명 텍스트 */}
                  <div className="text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                      안녕하세요, 이후경 경영지도사입니다. 28년간 쌓인 재무·인사·생산·마케팅의 
                      통합적 솔루션에 AI 기술을 접목하여 실무에서 전략까지 
                      폭발적인 일터혁신을 이끌어내는 성과중심 컨설팅을 제공합니다. 
                      <br /><br />
                      BM ZEN 사업분석, AI 생산성혁신, 공장경매, 기술창업, 인증지원, 
                      웹사이트구축 등 6대 핵심서비스를 통해 귀하의 기업이 
                      차원이 다른 성장을 경험할 수 있도록 직접 지도해드리겠습니다.
                    </p>
                  </div>
                  
                  {/* 애플 스타일 버튼 */}
                  <div className="text-center lg:text-left">
                    <button 
                      className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      onClick={handleChatbotConnect}
                      disabled={isConnecting || isChatOpen}
                    >
                      {isConnecting ? (
                        <>
                          <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          AI CAMP 교장 챗봇과 연결하기...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">+</span>
                          무료 체험해보기 및 자세히 알아보기
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 우측: 비주얼 영역 */}
                <div className="order-1 lg:order-2 relative">
                  <Link href="/chatbot" className="block cursor-pointer group">
                    <div className="relative w-full h-[500px] lg:h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl group-hover:scale-[1.02]">
                    
                    {/* 배경 그라데이션 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
                    
                    {/* 모니터 시뮬레이션 */}
                    <div className="absolute inset-8 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                      {/* 화면 내용 */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 relative">
                        
                        {/* 상단 메뉴바 */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800/50 dark:bg-aicamp-navy/50 backdrop-blur-sm flex items-center px-4">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="flex-1 text-center">
                            <span className="text-white/70 text-xs">AI CAMP AI 상담 시스템</span>
                          </div>
                        </div>
                        
                        {/* 중앙 콘텐츠 */}
                        <div className="absolute inset-0 top-8 flex items-center justify-center p-8">
                          <div className="text-center text-white space-y-6">
                            {/* AI 아이콘 */}
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 dark:from-aicamp-purple dark:to-aicamp-teal rounded-full flex items-center justify-center shadow-xl">
                              <Cpu className="w-10 h-10 text-white" />
                            </div>
                            
                            {/* 실시간 대화 시뮬레이션 */}
                            <div className="space-y-3 max-w-md">
                              <div className="bg-white/10 dark:bg-aicamp-navy/30 backdrop-blur-sm rounded-2xl p-4 text-left">
                                <p className="text-sm text-white/90">안녕하세요! AI CAMP 교장입니다.</p>
                              </div>
                              <div className="bg-blue-500/80 dark:bg-aicamp-teal/80 backdrop-blur-sm rounded-2xl p-4 text-right ml-8">
                                <p className="text-sm text-white">우리 회사 매출 증대 방법을 알고 싶어요</p>
                              </div>
                              <div className="bg-white/10 dark:bg-aicamp-navy/30 backdrop-blur-sm rounded-2xl p-4 text-left">
                                <p className="text-sm text-white/90">BM ZEN 사업분석으로 20-40% 매출 성장이 가능합니다!</p>
                              </div>
                            </div>
                            
                            {/* 기능 배지들 */}
                            <div className="flex flex-wrap gap-2 justify-center">
                              <span className="px-3 py-1 bg-blue-500/30 dark:bg-aicamp-purple/30 backdrop-blur-sm rounded-full text-xs text-white/90">Advanced AI</span>
                              <span className="px-3 py-1 bg-green-500/30 dark:bg-aicamp-teal/30 backdrop-blur-sm rounded-full text-xs text-white/90">24시간</span>
                              <span className="px-3 py-1 bg-purple-500/30 dark:bg-aicamp-orange/30 backdrop-blur-sm rounded-full text-xs text-white/90">즉시응답</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* 하단 상태바 */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-800/30 dark:bg-aicamp-navy/30 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white/50 text-xs">●온라인 • 즉시 상담 가능</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 플로팅 엘리먼트들 */}
                    <div className="absolute top-20 right-8 w-16 h-16 bg-white/20 dark:bg-aicamp-navy/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce">
                      <span className="text-2xl">AI</span>
                    </div>
                    <div className="absolute bottom-20 left-8 w-12 h-12 bg-white/20 dark:bg-aicamp-navy/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse">
                      <span className="text-xl">24H</span>
                    </div>
                    
                    {/* 클릭 안내 오버레이 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center space-x-2 text-gray-800">
                          <Bot className="w-5 h-5" />
                          <span className="font-semibold">이후경 AI 교장과 채팅하기</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
                  
            
            {/* 애플스토어 스타일 하단 섹션 - 간단한 특징들 */}
            <div className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-4xl mx-auto text-center space-y-16">
                
                {/* 핵심 특징들 - 애플 스타일 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">전문 분야별 맞춤 상담</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      사업분석, AI혁신, 정책자금, 기술창업, 인증, 웹사이트 등 6개 전문 분야
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">즉시 응답 및 정확한 분석</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      25년 전문가 경험과 차세대 AI 기술의 완벽한 융합
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center">
                      <Phone className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">전문가 연결 및 후속 상담</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      필요시 이후경 AI CAMP 교장 직접 상담 (010-9251-9743)
                    </p>
                  </div>
                </div>
                
                {/* 추가 액션 버튼들 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/consultation">
                    <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium rounded-full transition-all duration-200">
                      상담신청하기
                    </button>
                  </Link>
                  
                  <Link href="/diagnosis">
                    <button 
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      // 🔥 모바일 터치 최적화 추가
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // 모바일 진동 피드백
                        if (navigator.vibrate) {
                          navigator.vibrate(50);
                        }
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // 터치 종료 시 명시적으로 링크 이동
                        setTimeout(() => {
                          window.location.href = '/diagnosis';
                        }, 50);
                      }}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      AI역량진단
                    </button>
                  </Link>
                </div>
                
                {/* 상태 인디케이터 */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>24시간 상담</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI역량진단</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>즉시 응답</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6대 핵심서비스 - 사용자 중심 개선 */}
      <section className="py-20 lg:py-32 bg-white relative">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-sm mb-8">
              <Star className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-semibold text-gray-800">기업 성장 솔루션</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              <span>6대 핵심서비스</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              기업 단계별 맞춤 솔루션으로 <strong className="text-blue-600">확실한 성과</strong>를 경험하세요<br />
              25년 전문가 경험 + 최신 AI 기술 = <strong className="text-purple-600">검증된 결과</strong>
            </p>
          </div>
          
          {/* 6대 핵심서비스 - 진짜 동작하는 모바일 버전 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-lg group relative overflow-hidden cursor-pointer
                           ${service.featured ? 'ring-2 ring-blue-400 scale-105' : ''} 
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                {/* 특별 추천 배지 */}
                {service.featured && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                                    px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      최고 추천
                    </div>
                  </div>
                )}
                
                <CardContent className="p-4 h-full flex flex-col">
                  {/* 서비스 헤더 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${service.color} shadow-md 
                                    group-hover:scale-110 transition-all duration-300`}>
                      <service.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 font-bold text-xs">
                      {service.badge}
                    </Badge>
                  </div>
                  
                  {/* 서비스 정보 */}
                  <div className="mb-4 flex-1">
                    <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 
                                   transition-colors leading-tight">
                      {service.title}
                    </h3>
                    
                    <div className="text-xs md:text-sm font-semibold text-blue-600 mb-2">
                      {service.subtitle}
                    </div>
                    
                    <p className="text-gray-600 mb-3 text-xs md:text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* 핵심 혜택 */}
                    <div className="space-y-1.5">
                      {service.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm text-gray-700 font-medium line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 액션 버튼 */}
                  <div className="space-y-2">
                    <Link href={service.href}>
                      <Button 
                        className={`w-full font-semibold py-3 text-sm transition-all duration-300 
                                   shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95
                                   ${service.featured 
                                     ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                                     : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-400'
                                   }`}
                      >
                        자세히 보기
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    
                    {/* 빠른 상담 버튼 */}
                    <button 
                      className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium 
                                py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          const chatbot = document.querySelector('[data-floating-chatbot]') as HTMLElement;
                          if (chatbot) {
                            chatbot.click();
                          } else {
                            router.push('/consultation');
                          }
                        }
                      }}
                    >
AI CAMP 교장에게 바로 문의하기
                    </button>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>

          {/* 빠른 액션 섹션 */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                <span>어떤 서비스가 필요한지 모르겠다면?</span>
              </h3>
              <p className="text-gray-600 mb-6">
                AI 진단으로 맞춤형 솔루션을 추천받으세요 (소요시간: 3분)
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <Link href="/diagnosis">
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 
                              hover:from-green-600 hover:to-emerald-700 text-white shadow-xl w-full sm:w-auto px-6 py-3 rounded-lg font-medium"
                  >
                    3분 AI역량진단
                  </Button>
                </Link>
                
                <Link href="/consultation">
                  <Button 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium w-full sm:w-auto"
                  >
                    전문가 직접 상담
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI역량진단</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>즉시 결과</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>전문가 검증</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 성장 단계별 가이드 - 프리미엄 표현 */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              기업 성장 4단계 혁신 프레임워크
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              기업의 성장 단계에 맞는 맞춤형 지원으로 지속 가능한 성장을 실현하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthStages.map((stage, index) => (
              <Card key={index} className={`rounded-2xl border-0 shadow-md transition-all duration-300 
                                          hover:shadow-xl hover:-translate-y-2 ${stage.color} group`}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stage.icon}
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {stage.step}
                    </div>
                    <div className="text-sm text-gray-600 mb-3 bg-white/80 px-3 py-1 rounded-full inline-block">
                      {stage.period}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {stage.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3">
                    {stage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 실시간 성과 지표 - 토스 스타일 */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              <span>실시간 성과 지표</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                              AI CAMP와 함께한 기업들의 실제 성과를 확인하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {performanceMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>
      </section>

      {/* 고객 추천 후기 - 토스 스타일 */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              <span>고객 성공 스토리</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                              AI CAMP를 선택한 기업들의 진솔한 경험담을 들어보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border-0 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                                    rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                      <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-gray-700 italic leading-relaxed">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 기업 성장 단계별 맞춤 전략 */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              <span>기업 성장 단계별 맞춤 전략</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              창업부터 지속가능한 혁신까지, 각 단계에 최적화된 솔루션을 제공합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {growthStages.map((stage, index) => (
              <Card key={index} className={`bg-white rounded-3xl shadow-lg border-0 text-center ${stage.color} hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{stage.icon}</div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 mb-4 inline-block">
                    <span className="text-sm font-bold text-gray-700">{stage.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{stage.description}</p>
                  <div className="text-xs text-blue-600 font-medium mb-4">{stage.period}</div>
                  
                  <div className="space-y-2">
                    {stage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border-0 max-w-4xl mx-auto hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                <span>단계별 맞춤 전략 설계</span>
              </h3>
              <p className="text-gray-600 mb-6">
                귀하의 기업이 현재 어느 단계에 있든, AI CAMP는 다음 성장을 위한 
                최적의 로드맵을 제시합니다
              </p>
              <Link href="/diagnosis">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] shadow-lg hover:shadow-xl text-white px-8 py-4 rounded-full font-medium relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <span className="relative flex items-center">
                    <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                    <span>우리 기업 성장 단계 진단받기</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI역량진단 섹션 - 프리미엄 표현 */}
      <section id="ai-diagnosis" className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Cpu className="w-5 h-5" />
              <span className="font-semibold">차세대 지능형 진단 시스템</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              AI역량진단 신청
            </h2>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100">
              복잡한 20여개 입력 항목을 <strong className="text-white">8개 핵심 정보</strong>로 혁신적 간소화!<br />
              2-3주 처리 시간을 <strong className="text-white">2-3분</strong>으로 혁명적 단축
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* 개선 효과 비교 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Clock, title: '처리 속도', before: '기존: 2-3주', after: '신규: 2-3분', improvement: '99.9% 단축', color: 'from-green-400 to-emerald-500' },
                { icon: BarChart3, title: '입력 항목', before: '기존: 20+ 항목', after: '신규: 8개 항목', improvement: '60% 간소화', color: 'from-blue-400 to-cyan-500' },
                { icon: FileText, title: '보고서', before: '기존: 5000자+', after: '신규: 전문가 진단보고서', improvement: '핵심 정보 집중', color: 'from-purple-400 to-pink-500' }
              ].map((item, index) => (
                                  <Card key={index} className={`text-center p-6 bg-gradient-to-br ${item.color} text-white border-0 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <CardContent className="p-0">
                    <item.icon className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <div className="space-y-2">
                      <div className="text-white/70 line-through text-sm">{item.before}</div>
                      <div className="font-bold text-lg">{item.after}</div>
                      <div className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full inline-block">
                        {item.improvement}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA 섹션 */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-white">
                  지금 바로 AI역량진단을 신청하세요!
                </h3>
                <p className="text-blue-100 mb-8 text-lg">
                  8개 정보만 입력하면 2-3분 내에 전문가 수준의 진단 보고서를 받아볼 수 있습니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Link href="/diagnosis">
                    {/* 개선된 AI역량진단 신청하기 버튼 */}
                    <Button 
                      className="btn-hero bg-white text-blue-600 hover:bg-gray-50 shadow-xl transform hover:scale-[1.05] active:scale-[0.95] transition-all duration-200 relative overflow-hidden group"
                      // 🔥 모바일 터치 최적화 추가
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // 모바일 진동 피드백
                        if (navigator.vibrate) {
                          navigator.vibrate(50);
                        }
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // 터치 종료 시 명시적으로 링크 이동
                        setTimeout(() => {
                          window.location.href = '/diagnosis';
                        }, 50);
                      }}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      <span className="relative flex items-center">
                        AI역량진단 신청하기
                      </span>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                  {[
                    { icon: Shield, text: '100% 무료' },
                    { icon: Clock, text: '2-3분 소요' },
                    { icon: Users, text: '전문가 상담 가능' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

              {/* AI-CAMP 교장 챗봇 인터페이스 */}
      <MCenterChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onMinimize={() => setIsChatOpen(false)}
      />

      {/* AI CAMP 컨텐츠 가이드 - 하단에서 솟구치는 애니메이션 */}
      <AICampContentGuide />

      {/* n8n 책 홍보 배너 - 최상위 레이어로 위에서 떨어지는 애니메이션 */}
      <BookPromotionBanner />
      
      {/* n8n 책 홍보 모달 - 최상위 레이어 (비활성화) */}
      {/* <BookPromotionModal /> */}

      {/* 연결 중 로딩 오버레이 */}
      {isConnecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white animate-pulse" />
            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI CAMP 교장 챗봇과 연결하기...</h3>
            <p className="text-gray-600 mb-4">잠시만 기다려 주세요</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

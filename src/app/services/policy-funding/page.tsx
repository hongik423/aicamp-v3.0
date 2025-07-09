'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InvestmentAnalysisTool from '@/components/investment-analysis/InvestmentAnalysisTool';
import { 
  Target, 
  Clock, 
  TrendingUp, 
  Award,
  Shield,
  Zap,
  Star,
  Calculator,
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Building2,
  FileText,
  Users,
  Lightbulb,
  BarChart3,
  Brain,
  Trophy,
  MapPin,
  Calendar,
  DollarSign,
  CreditCard,
  Beaker,
  Workflow,
  Factory
} from 'lucide-react';

export default function PolicyFundingPage() {
  const performanceMetrics = [
    {
      value: 95,
      unit: '%',
      trend: '+12%',
      label: '승인율',
      description: '정책자금 심사 통과율',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      value: 25,
      unit: '일',
      trend: '-5일',
      label: '평균 처리기간',
      description: '신청부터 승인까지',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      value: 4.2,
      unit: '억원',
      trend: '+8%',
      label: '평균 대출금액',
      description: '기업당 평균 지원금',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      value: 800,
      unit: '+',
      trend: '+156',
      label: '성공 사례',
      description: '누적 지원 기업 수',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];



  const fundingTypes = [
    {
      title: '시설자금',
      description: '생산설비, 사업장 구입',
      amount: '최대 45억원',
      rate: '연 2.0~3.0%',
      detailUrl: '/services/policy-funding/facility-funding',
      icon: Factory,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      specialty: '생산 최적화 + 품질관리'
    },
    {
      title: '운전자금',
      description: '원자재, 인건비 등',
      amount: '최대 10억원',
      rate: '연 2.5~3.5%',
      detailUrl: '/services/policy-funding/operating-funding',
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      specialty: '현금흐름 관리 + 운영 효율화'
    },
    {
      title: '창업자금',
      description: '창업 7년 이내 기업 대상',
      amount: '최대 10억원',
      rate: '연 1.5~2.5%',
      detailUrl: '/services/policy-funding/startup-funding',
      icon: Lightbulb,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      specialty: '비즈니스 모델 + 마케팅 전략'
    },
    {
      title: 'R&D자금',
      description: '기술개발 전용',
      amount: '최대 20억원',
      rate: '연 1.0~2.0%',
      detailUrl: '/services/policy-funding/rd-funding',
      icon: Beaker,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      specialty: '기술사업화 + 특허 전략'
    },
    {
      title: '투자분석기',
      description: 'AI 기반 재무타당성 분석',
      amount: '무료 제공',
      rate: '실시간 분석',
      detailUrl: '/services/policy-funding/investment-analysis',
      icon: Calculator,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      specialty: '5구간 평가 + 8개 지표 분석'
    },
    {
      title: '전문가 상담',
      description: '이후경 경영지도사 1:1 컨설팅',
      amount: '무료 상담',
      rate: '성공 시 수수료',
      detailUrl: '/consultation',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      specialty: '28년 노하우 + 듀얼브레인 방법론'
    },
    {
      title: '성공 사례',
      description: '정책자금 승인 성공 스토리',
      amount: '평균 4.2억원',
      rate: '승인률 95%',
      detailUrl: '/cases',
      icon: Trophy,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      specialty: '실제 기업 성공사례 + 노하우'
    },
    {
      title: '종합 지원',
      description: '설립부터 사업성공까지',
      amount: '맞춤형 제안',
      rate: '성과 기반',
      detailUrl: '/support',
      icon: Shield,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      specialty: '통합 솔루션 + 원스톱 서비스'
    }
  ];

  // 새로운 섹션 데이터
  const governmentAgencies = [
    {
      name: '중소벤처기업부',
      description: '창업·벤처 지원',
      url: 'https://www.mss.go.kr',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      name: '신용보증기금',
      description: '신용보증 지원',
      url: 'https://www.kodit.co.kr',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      name: '기술보증기금',
      description: '기술평가 보증',
      url: 'https://www.kibo.or.kr',
      icon: Zap,
      color: 'text-purple-600'
    },
    {
      name: '소상공인시장진흥공단',
      description: '소상공인 지원',
      url: 'https://www.semas.or.kr',
      icon: Users,
      color: 'text-orange-600'
    },
    {
      name: '중소벤처기업진흥공단 (KOSME)',
      description: '중소기업 종합지원',
      url: 'https://www.sbc.or.kr',
      icon: TrendingUp,
      color: 'text-teal-600'
    },
    {
      name: 'TIPS',
      description: '민관 합동 투자 프로그램',
      url: 'https://www.jointips.or.kr/',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      name: '기업마당',
      description: '기업 지원사업 통합정보',
      url: 'https://www.bizinfo.go.kr',
      icon: FileText,
      color: 'text-indigo-600'
    },
    {
      name: '창업진흥원',
      description: '창업 생태계 지원',
      url: 'https://www.kised.or.kr',
      icon: Lightbulb,
      color: 'text-cyan-600'
    },
    {
      name: 'IRIS',
      description: '통합연구지원시스템',
      url: 'https://www.iris.go.kr',
      icon: BarChart3,
      color: 'text-emerald-600'
    },
    {
      name: '지역신용보증재단',
      description: '지역 신용보증 지원',
      url: 'https://untact.koreg.or.kr/web/index.do',
      icon: MapPin,
      color: 'text-rose-600'
    },
    {
      name: '중소벤처24',
      description: '중소벤처기업 원스톱 서비스',
      url: 'https://www.smes.go.kr',
      icon: Calendar,
      color: 'text-violet-600'
    },
    {
      name: '고용지원금',
      description: '고용창출 및 고용안정 지원',
      url: 'https://www.work24.go.kr',
      icon: DollarSign,
      color: 'text-amber-600'
    }
  ];





  const detailedSuccessCases = [
    {
      company: 'A제조업 (자동차 부품)',
      industry: '제조업',
      location: '경기도 안산',
      fundingType: '시설자금',
      amount: '5억원',
      period: '20일',
      beforeSales: '120억원',
      afterSales: '360억원',
      employment: '15명 신규 채용',
      details: 'AI 품질검사 시스템 도입으로 불량률 30% 감소',
      year: '2023',
      icon: Target
    },
    {
      company: 'B테크기업 (AI 솔루션)',
      industry: '정보통신업',
      location: '서울 강남',
      fundingType: 'R&D 자금',
      amount: '3억원',
      period: '15일',
      beforeSales: '50억원',
      afterSales: '150억원',
      employment: '25명 신규 채용',
      details: '자체 AI 모델 개발로 글로벌 시장 진출',
      year: '2024',
      icon: Brain
    },
    {
      company: 'C바이오기업 (의료기기)',
      industry: '바이오헬스',
      location: '대전 대덕',
      fundingType: '창업자금',
      amount: '10억원',
      period: '30일',
      beforeSales: '0원',
      afterSales: '200억원',
      employment: '40명 신규 채용',
      details: '혁신 의료기기 개발로 IPO 준비 중',
      year: '2024',
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500/20 text-white border-blue-400 rounded-full text-sm sm:text-base">
              정책자금 전문 컨설팅
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">정책자금으로 시작하는</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                성공적인 사업 확장
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto px-4">
              AI 기반 맞춤형 정책자금 매칭으로<br className="hidden sm:block" />
              <span className="sm:hidden">평균 4.2억원, 최대 45억원까지 지원받으세요</span>
              <span className="hidden sm:inline">평균 4.2억원, 최대 45억원까지 지원받으세요</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full w-full sm:w-auto"
                onClick={() => {
                  const analysisSection = document.getElementById('investment-analysis-section');
                  if (analysisSection) {
                    analysisSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">투자재무타당성분석기</span>
                <span className="sm:hidden">재무분석기</span>
              </Button>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  상담신청
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 투자재무타당성분석기 킬러콘텐츠 섹션 */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base">
              🎯 킬러콘텐츠
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                정책자금승인가능성을 미리확인하세요
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                재무타당성분석기
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              AI 기반 5구간 투자규모별 평가와 8개 지표 종합분석으로<br className="hidden sm:block" />
              <span className="sm:hidden">정책자금 승인 가능성을 사전에 정확히 예측합니다</span>
              <span className="hidden sm:inline">정책자금 승인 가능성을 사전에 정확히 예측합니다</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
            {/* 좌측: 분석기 미리보기 */}
            <div className="relative">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">투자분석 종합 보고서</h3>
                  <Badge className="bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">완료</Badge>
                </div>
                
                {/* 탭 메뉴 미리보기 */}
                <div className="flex gap-1 sm:gap-2 mb-6 overflow-x-auto pb-2">
                  {['입력', '점수분석', 'AI평가', '재무분석', '차트분석', 'DSCR', '레이더', 'AI리포트'].map((tab, index) => (
                    <Badge 
                      key={index} 
                      variant={index === 2 ? "default" : "secondary"}
                      className="rounded-full text-xs whitespace-nowrap px-2 py-1 flex-shrink-0"
                    >
                      {tab}
                    </Badge>
                  ))}
                </div>

                {/* 핵심 지표 미리보기 */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-blue-600 mb-1">NPV (순현재가치)</div>
                    <div className="text-lg sm:text-2xl font-bold text-blue-800">+12.5억원</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-green-600 mb-1">IRR (내부수익률)</div>
                    <div className="text-lg sm:text-2xl font-bold text-green-800">18.3%</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-purple-600 mb-1">DSCR (상환능력)</div>
                    <div className="text-lg sm:text-2xl font-bold text-purple-800">2.8</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-orange-600 mb-1">회수기간</div>
                    <div className="text-lg sm:text-2xl font-bold text-orange-800">4.2년</div>
                  </div>
                </div>

                {/* 종합 등급 */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white text-center">
                  <div className="text-xs sm:text-sm opacity-90 mb-2">투자 등급</div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">A등급</div>
                  <div className="text-xs sm:text-sm opacity-90">투자 실행 적극 권장</div>
                </div>
              </div>
              
              {/* 애니메이션 효과 - 모바일에서는 크기 축소 */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>

            {/* 우측: 특징 및 CTA */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">5구간 투자규모별 평가</h4>
                    <p className="text-sm sm:text-base text-gray-600">25억 미만부터 100억 이상까지 투자규모에 따른 차별화된 평가 기준 적용</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">AI 기반 8개 지표 종합분석</h4>
                    <p className="text-sm sm:text-base text-gray-600">NPV, IRR, DSCR, 회수기간, 수익성, 안정성, 성장성, 리스크를 종합 분석</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">실시간 승인 가능성 예측</h4>
                    <p className="text-sm sm:text-base text-gray-600">정책자금 승인 확률을 사전에 정확히 예측하여 성공률 극대화</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">지금 바로 분석 시작</h3>
                <p className="text-blue-100 mb-6 text-sm sm:text-base">
                  3분만에 귀하의 투자 프로젝트가 정책자금 투자가 타당성 "PASS" 인지를 확인해보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 rounded-full font-semibold text-sm sm:text-base"
                    onClick={() => {
                      const analysisSection = document.getElementById('investment-analysis-section');
                      if (analysisSection) {
                        analysisSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    무료 분석 시작
                  </Button>
                  <Link href="/consultation">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 rounded-full text-sm sm:text-base">
                      <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      전문가 상담
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 성과 지표 섹션 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">검증된 성과</h2>
            <p className="text-base sm:text-lg text-gray-600">데이터로 증명하는 정책자금 컨설팅 실적</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <div className={`absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 ${metric.bgColor} rounded-bl-full opacity-20`} />
                <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 sm:p-3 ${metric.bgColor} rounded-lg sm:rounded-xl`}>
                      <metric.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${metric.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs rounded-full">
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900">{metric.value}</span>
                      <span className="text-lg sm:text-xl text-gray-600">{metric.unit}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{metric.label}</div>
                    <div className="text-xs text-gray-500">{metric.description}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 차별성 강조 - 듀얼브레인 방법론 섹션 */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm sm:text-base">
              Dual-Brain Methodology
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              🧠 듀얼브레인 방법론
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              AI와 탁월한 융합적 능력자 이후경 경영지도사의 시너지로<br className="hidden sm:block" />
              <span className="sm:hidden">차별화된 BM 구축과 합격하는 사업계획서 작성 지도</span>
              <span className="hidden sm:inline">차별화된 BM 구축과 합격하는 사업계획서 작성 지도</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
            {/* 좌측: 듀얼브레인 설명 */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl flex-1">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">AI Brain + Human Brain</h3>
                    <p className="text-sm sm:text-base text-gray-600">인공지능과 전문가의 완벽한 결합</p>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">AI 기반 재무타당성 평가</h4>
                      <p className="text-xs sm:text-sm text-gray-600">NPV, IRR, DSCR 등 정밀한 재무분석</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">이후경 경영지도사 전문 컨설팅</h4>
                      <p className="text-xs sm:text-sm text-gray-600">30년 경험의 융합적 능력자가 직접 지도</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">차별화된 BM 구축</h4>
                      <p className="text-xs sm:text-sm text-gray-600">시장 경쟁력 확보를 위한 맞춤형 비즈니스 모델</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  <h3 className="text-lg sm:text-xl font-bold">합격하는 사업계획서</h3>
                </div>
                <p className="text-green-100 mb-3 sm:mb-4 text-sm sm:text-base">
                  단순한 서류 작성이 아닌, 실제 승인받는 사업계획서 작성 지도
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                    <div className="font-bold text-base sm:text-lg">95%</div>
                    <div className="text-xs sm:text-sm text-green-100">승인율</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                    <div className="font-bold text-base sm:text-lg">평균 4.2억</div>
                    <div className="text-xs sm:text-sm text-green-100">지원금액</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측: 프로세스 플로우 */}
            <div className="h-full">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl h-full flex flex-col">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                  통합 자문 서비스 프로세스
                </h3>
                
                <div className="space-y-4 sm:space-y-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm sm:text-base">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">AI 재무타당성 분석</h4>
                      <p className="text-xs sm:text-sm text-gray-600">투자 프로젝트의 정밀한 재무분석 및 평가</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm sm:text-base">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">전문가 1:1 컨설팅</h4>
                      <p className="text-xs sm:text-sm text-gray-600">이후경 경영지도사의 맞춤형 사업전략 수립</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm sm:text-base">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">차별화된 BM 구축</h4>
                      <p className="text-xs sm:text-sm text-gray-600">시장 경쟁력 확보를 위한 비즈니스 모델 설계</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm sm:text-base">4</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">사업계획서 작성 지도</h4>
                      <p className="text-xs sm:text-sm text-gray-600">승인받는 사업계획서의 핵심 포인트 지도</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-sm sm:text-base">5</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">정책자금 신청 지원</h4>
                      <p className="text-xs sm:text-sm text-gray-600">신청부터 승인까지 전 과정 지원</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 font-bold text-sm sm:text-base">6</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">사후 관리 지원</h4>
                      <p className="text-xs sm:text-sm text-gray-600">지속적인 성장을 위한 경영 컨설팅</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 통합 자문 서비스 섹션 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm sm:text-base">
              Integrated Consulting Service
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              설립부터 사업성공까지 통합 자문 서비스
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              단순한 자금 지원이 아닌, 기업 성장의 완전한 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">비즈니스 모델 설계</h3>
              <p className="text-sm sm:text-base text-gray-600">
                수익구조 분석부터 가치제안까지 완전한 비즈니스 모델 구축
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">재무 마케팅 전략</h3>
              <p className="text-sm sm:text-base text-gray-600">
                재무계획 수립과 타겟 마케팅 전략으로 매출 극대화
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Factory className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">스마트공장 구축</h3>
              <p className="text-sm sm:text-base text-gray-600">
                MES 시스템 도입으로 생산 효율성 향상과 원가 절감
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">사업성공 관리</h3>
              <p className="text-sm sm:text-base text-gray-600">
                설립부터 운영까지 지속적인 성장 관리 시스템
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 차별화된 전문성 섹션 */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
              Premium Expertise
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏆 최고의 전문성을 확보하고 있습니다
            </h2>
            <p className="text-lg text-gray-600">
              단순한 자금 연결이 아닌, 기업 성장의 완전한 솔루션을 제공하는 차별화된 전문성
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 좌측: 전문 영역 */}
            <div className="space-y-8">
              <Card className="rounded-2xl shadow-xl h-80 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center text-xl">
                    <Workflow className="w-6 h-6 mr-3" />
                    MES 시스템 구축 전문
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">생산관리 시스템(MES) 설계</h4>
                        <p className="text-sm text-gray-600">실시간 생산 모니터링과 품질 관리</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">스마트공장 원가절감 전략</h4>
                        <p className="text-sm text-gray-600">AI 기반 생산 최적화로 원가 30% 절감</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">4차 산업혁명 대응</h4>
                        <p className="text-sm text-gray-600">IoT, 빅데이터 활용 스마트 제조</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-xl h-80 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center text-xl">
                    <TrendingUp className="w-6 h-6 mr-3" />
                    재무 마케팅 전략
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">재무타당성 분석</h4>
                        <p className="text-sm text-gray-600">NPV, IRR, DSCR 등 정밀 분석</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">수익모델 최적화</h4>
                        <p className="text-sm text-gray-600">다양한 수익원 발굴과 최적화</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">디지털 마케팅 전략</h4>
                        <p className="text-sm text-gray-600">온라인 채널 최적화 및 고객 확보</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 우측: 성과 지표 */}
            <div className="space-y-8">
              <Card className="rounded-2xl shadow-xl h-80 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center text-xl">
                    <Trophy className="w-6 h-6 mr-3" />
                    검증된 성과
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-600">정책자금 성공</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">95%</div>
                      <div className="text-sm text-gray-600">승인율</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">1,200억</div>
                      <div className="text-sm text-gray-600">누적 지원금</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">30%</div>
                      <div className="text-sm text-gray-600">평균 원가절감</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-xl h-80 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center text-xl">
                    <Shield className="w-6 h-6 mr-3" />
                    차별화 요소
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">대기업 출신 전문가</h4>
                        <p className="text-sm text-gray-600">현대그룹, 삼성생명 28년 노하우</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">정부 인증 전문기관</h4>
                        <p className="text-sm text-gray-600">중소벤처기업부 공식 인증</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">통합 솔루션 제공</h4>
                        <p className="text-sm text-gray-600">설립부터 성공까지 원스톱 서비스</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 정책자금 종류 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
              Specialized Funding
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              차별화된 정책자금 전문 서비스
            </h2>
            <p className="text-lg text-gray-600">
              각 분야별 전문 컨설팅과 함께 제공되는 맞춤형 정책자금 지원
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundingTypes.map((fund, index) => (
              <Link 
                key={index}
                href={fund.detailUrl}
                className="group block"
              >
                <Card className="relative group hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer transform hover:-translate-y-1">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${fund.bgColor} rounded-bl-full opacity-20`} />
                  <CardContent className="pt-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 ${fund.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                        <fund.icon className={`h-8 w-8 ${fund.color}`} />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{fund.title}</h3>
                    <p className="text-gray-600 mb-4">{fund.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">지원한도:</span>
                        <span className="font-semibold">{fund.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">금리:</span>
                        <span className="font-semibold text-green-600">{fund.rate}</span>
                      </div>
                    </div>
                    
                    {/* 전문성 차별화 */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">전문 컨설팅</div>
                      <div className="text-sm font-medium text-gray-900">{fund.specialty}</div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <span className="text-sm text-blue-600 font-medium group-hover:underline">
                        자세히 보기 →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 맞춤형 정책자금 성공사례 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 rounded-full">
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              맞춤형 정책자금 성공사례
            </h2>
            <p className="text-lg text-gray-600">
              투자재무타당성분석기로 검증된 실제 기업들의 정책자금 활용 성공 스토리
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {detailedSuccessCases.map((story, index) => (
              <Card key={index} className="relative group hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                {/* 배경 그라데이션 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <story.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="text-xs rounded-full">{story.year}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <Badge className="bg-green-100 text-green-800 text-xs rounded-full">분석 완료</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{story.company}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{story.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="relative">
                  <div className="space-y-4">
                    {/* 투자분석 결과 미리보기 */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 text-white">
                      <div className="text-sm opacity-90 mb-2">투자재무타당성분석 결과</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs opacity-80">NPV</div>
                          <div className="text-lg font-bold">+{(parseFloat(story.amount.replace('억원', '')) * 2.5).toFixed(1)}억원</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80">IRR</div>
                          <div className="text-lg font-bold">{15 + index * 2}%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">지원금액</div>
                        <div className="text-lg font-bold text-blue-600">{story.amount}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">처리기간</div>
                        <div className="text-lg font-bold text-green-600">{story.period}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-2">성과 지표</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>매출 증가</span>
                          <span className="font-medium">{story.beforeSales} → {story.afterSales}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>고용 창출</span>
                          <span className="font-medium text-green-600">{story.employment}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">핵심 성공요인:</span>
                        <br />
                        {story.details}
                      </div>
                    </div>

                    {/* 분석 시작 버튼 */}
                    <div className="pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full rounded-full hover:bg-blue-50 hover:border-blue-300 text-sm"
                        onClick={() => {
                          const analysisSection = document.getElementById('investment-analysis-section');
                          if (analysisSection) {
                            analysisSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        나도 분석해보기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 정책자금을 받아보세요
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            AI 재무분석으로 승인 가능성을 미리 확인하고<br />
            전문가의 1:1 맞춤 컨설팅을 받아보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 rounded-full"
              onClick={() => {
                const analysisSection = document.getElementById('investment-analysis-section');
                if (analysisSection) {
                  analysisSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Calculator className="mr-2 h-5 w-5" />
              AI 투자분석 시작
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 rounded-full">
              <MessageCircle className="mr-2 h-5 w-5" />
              카카오톡 상담
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-blue-100">
            평균 응답시간: 30분 이내 | 상담 비용: 무료
          </p>
        </div>
      </section>

      {/* 투자재무타당성분석기 섹션 */}
      <section id="investment-analysis-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-2">
              🎯 AI 투자재무타당성분석기
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                정책자금 승인 가능성을 미리 확인하세요
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5구간 투자규모별 평가와 8개 지표 종합분석으로<br />
              귀하의 프로젝트 투자타당성을 정확히 진단합니다
            </p>
          </div>

          {/* 투자분석기 컴포넌트 */}
          <InvestmentAnalysisTool />
        </div>
      </section>
    </div>
  );
} 
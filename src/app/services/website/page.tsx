'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/header';

import { 
  Globe, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Shield,
  Clock,
  ArrowLeft,
  Target,
  Smartphone,
  DollarSign,
  Brain,
  Bot,
  Star,
  Zap,
  Building2,
  BarChart3,
  Settings,
  ChevronRight,
  Monitor,
  CreditCard,
  Search,
  FileText,
  PieChart,
  Briefcase,
  Award,
  Calendar,
  Phone,
  MessageSquare,
  Lightbulb,
  Cpu,
  Network,
  Code,
  Palette,
  ShoppingCart,
  Mail,
  Eye,
  ThumbsUp,
  BookOpen,
  Headphones
} from 'lucide-react';
import HeroSection from '@/components/ui/hero-section';

export default function WebsitePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // 히어로 섹션 데이터
  const heroData = {
    badge: {
      icon: Bot,
      text: "AI 챗봇 임베디드 포함 - 세무사 고객을 위한 디지털 혁신 솔루션"
    },
    title: "확실하게 뒷받침",
    subtitle: "매출증대 웹사이트를",
    description: "고객사의 온라인 매출 30-50% 증대로 세무사의 수수료 수익도 함께 성장합니다. 24시간 365일 AI 챗봇 자동 응대 시스템으로 디지털 혁신을 실현하세요",
    stats: [
      {
        value: "30-50%",
        label: "온라인 매출 증대",
        description: "AI 챗봇 임베디드 효과",
        icon: TrendingUp,
        color: "text-green-600",
        trend: "상승"
      },
      {
        value: "12-18개월",
        label: "투자 회수 기간",
        description: "기존 3-5년 → 단축",
        icon: Clock,
        color: "text-blue-600",
        trend: "단축"
      },
      {
        value: "95%",
        label: "AI 챗봇 응답률",
        description: "24시간 365일 자동 응대",
        icon: Bot,
        color: "text-purple-600",
        trend: "고성능"
      },
      {
        value: "실시간",
        label: "세무 연동 시스템",
        description: "매출 데이터 세무사 연동",
        icon: Building2,
        color: "text-orange-600",
        trend: "통합"
      }
    ],
    primaryCTA: {
      text: "무료 상담 신청",
      href: "/consultation"
    },
    secondaryCTA: {
      text: "38단계 디지털 성숙도 진단",
      href: "/ai-diagnosis"
    }
  };

  // 핵심 가치 제안 - 세무사 고객을 위한 디지털 혁신 솔루션
  const coreValues = [
    {
      title: '온라인 매출 30-50% 증대',
      description: 'AI 챗봇 임베디드로 24시간 고객 응대',
      value: '30-50%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: '투자 회수 기간',
      description: '기존 3-5년 → 12-18개월 내 투자 회수',
      value: '12-18개월',
      icon: Clock,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'AI 챗봇 응답률',
      description: '24시간 365일 자동 응대 시스템',
      value: '95%',
      icon: Bot,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: '세무 연동 시스템',
      description: '실시간 매출 데이터 세무사 연동',
      value: '실시간',
      icon: Building2,
      color: 'from-orange-500 to-red-600'
    }
  ];

  // Business Model Zen 5단계 프레임워크
  const bmzFramework = [
    {
      stage: '1단계',
      title: '가치 발견',
      description: '38개 질문 디지털 성숙도 진단',
      details: ['온라인 존재감 분석', '고객 행동 패턴 분석', '매출 기회 발굴', '경쟁사 벤치마킹'],
      icon: Search,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      stage: '2단계',
      title: '가치 창출',
      description: '성장 단계별 맞춤형 웹사이트 전략',
      details: ['기업별 맞춤 설계', 'AI 챗봇 시나리오', 'CRM 통합 전략', '매출 목표 기반 KPI'],
      icon: Lightbulb,
      color: 'from-purple-400 to-pink-500'
    },
    {
      stage: '3단계',
      title: '가치 제공',
      description: '세무사 협업 프로세스',
      details: ['기획 및 설계', '개발 및 구축', '런칭 및 최적화', '세무 연계 시스템'],
      icon: Code,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      stage: '4단계',
      title: '가치 포착',
      description: '명확한 수익 증대 모델',
      details: ['온라인 매출 증대', '고객 응대 효율화', '마케팅 비용 절감', '세무사 수익 확대'],
      icon: DollarSign,
      color: 'from-green-400 to-teal-500'
    },
    {
      stage: '5단계',
      title: '가치 교정',
      description: '6개월 사후관리 시스템',
      details: ['월별 성과 분석', '세무사 지원 강화', 'AI 챗봇 성능 개선', '지속적 최적화'],
      icon: Settings,
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  // 성장 단계별 맞춤형 웹사이트 전략
  const growthStages = [
    {
      stage: 'Step 1',
      period: '창업~3년',
      title: '첫 고객 확보 디지털 기반',
      target: '온라인 신뢰도 구축 + 첫 매출 창출',
      investment: '500-1,000만원',
      monthlyRevenue: '300-500만원',
      recoveryPeriod: '12개월',
      features: [
        { name: '신뢰도 중심 설계', effect: '신뢰도 80% 향상' },
        { name: 'AI 챗봇 기본형', effect: '문의 응답률 95%' },
        { name: '로컬 SEO 최적화', effect: '지역 고객 300% 증가' },
        { name: '모바일 퍼스트', effect: '모바일 전환율 5배' }
      ],
      icon: Building2,
      color: 'from-emerald-500 to-green-600'
    },
    {
      stage: 'Step 2',
      period: '3-7년',
      title: '매출 채널 다각화 플랫폼',
      target: '온라인 매출 30-40% 달성',
      investment: '2,000-5,000만원',
      monthlyRevenue: '1,500-3,000만원',
      recoveryPeriod: '18개월',
      features: [
        { name: 'CRM 통합', effect: '재구매율 40% 향상' },
        { name: 'AI 챗봇 고급형', effect: '전환율 8-12% 달성' },
        { name: '마케팅 자동화', effect: '리드 너처링 60%' },
        { name: '결제 시스템', effect: '매출 처리 자동화' }
      ],
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      stage: 'Step 3',
      period: '7-10년',
      title: 'AI 기반 디지털 생태계',
      target: '고객 경험 혁신 + 시장 주도',
      investment: '5,000-1억원',
      monthlyRevenue: '3,000-8,000만원',
      recoveryPeriod: '24개월',
      features: [
        { name: 'AI 개인화', effect: '구매전환율 3배' },
        { name: '음성봇 연동', effect: '상담 효율 300%' },
        { name: '예측 분석', effect: '고객 유지율 95%' },
        { name: 'API 생태계', effect: '수익원 다각화' }
      ],
      icon: Cpu,
      color: 'from-purple-500 to-violet-600'
    },
    {
      stage: 'Step 4',
      period: '10년 이상',
      title: '글로벌 디지털 플랫폼',
      target: '해외 매출 50% + 업계 표준',
      investment: '1억원 이상',
      monthlyRevenue: '8,000만원 이상',
      recoveryPeriod: '36개월',
      features: [
        { name: '글로벌 다국어', effect: '해외 매출 50%' },
        { name: '블록체인 연동', effect: '신뢰성 극대화' },
        { name: '메타버스 진출', effect: '미래 시장 선점' },
        { name: '업계 표준화', effect: '시장 주도권 확보' }
      ],
      icon: Globe,
      color: 'from-red-500 to-pink-600'
    }
  ];

  // AI 챗봇 임베디드 시스템 상세
  const chatbotFeatures = [
    {
      category: '지능형 고객 상담',
      description: '24시간 365일 전문 상담사 수준 서비스',
      features: [
        { name: '일반 문의', capability: '즉시 자동 응답 (95% 정확도)', handoff: '필요시에만 연결' },
        { name: '서비스 안내', capability: '상세 정보 제공 + 브로셔 다운로드', handoff: '복잡한 요구사항 시' },
        { name: '견적 문의', capability: '자동 견적 산출 + 맞춤 제안', handoff: '최종 상담 및 계약' },
        { name: '예약 접수', capability: '실시간 일정 확인 + 자동 예약', handoff: '일정 변경 요청 시' },
        { name: 'A/S 접수', capability: '문제 진단 + 해결 방안 제시', handoff: '기술적 지원 필요 시' }
      ],
      icon: Bot
    },

    {
      category: '학습형 AI 시스템',
      description: '사용할수록 더 똑똑해지는 AI',
      features: [
        { name: '상담 품질', capability: '고객 대화 이력 학습', handoff: '응답 정확도 월 5% 향상' },
        { name: '업종 특화', capability: '업계별 전문 용어 학습', handoff: '전문성 수준 지속 상승' },
        { name: '지역 특성', capability: '지역별 고객 패턴 분석', handoff: '지역 맞춤 서비스 제공' },
        { name: '계절성', capability: '시즌별 문의 패턴 학습', handoff: '선제적 안내 서비스' }
      ],
      icon: Brain
    }
  ];



  // 성과 지표
  const performanceMetrics = [
    {
      metric: '온라인 매출 비중',
      before: '기존 5%',
      after: '35% (7배 증가)',
      period: '6개월 기준',
      icon: TrendingUp
    },
    {
      metric: '신규 고객 확보',
      before: '월 5명',
      after: '월 25명 (5배 증가)',
      period: '월간 기준',
      icon: Users
    },
    {
      metric: '고객 응대 효율',
      before: '8시간',
      after: '24시간 (3배 향상)',
      period: '운영 시간',
      icon: Clock
    },
    {
      metric: '마케팅 비용',
      before: '월 200만원',
      after: '월 50만원 (75% 절감)',
      period: '월간 기준',
      icon: DollarSign
    }
  ];

  // 성공 사례
  const successCases = [
    {
      company: '제조업 A사',
      industry: '정밀기계 부품 제조',
      employees: '직원 25명',
      period: '2024년 3월 ~ 9월 (6개월)',
      investment: '1,200만원 (웹사이트 + AI 챗봇 고급형)',
      results: {
        onlineRevenue: '월 50만원 → 월 1,800만원 (36배 증가)',
        newCustomers: '월 2명 → 월 28명 (14배 증가)',
        responseRate: '30% → 98% (즉시 응답)',
        automation: '반복 업무 70% 자동화'
      },
      testimonial: 'AI 챗봇이 밤늦게도 고객 문의를 받아주니까 매출이 정말 눈에 띄게 늘었어요. 더불어 ○○세무사님도 일거리가 늘어서 서로 윈-윈하는 관계가 되었습니다.',
      icon: Building2
    },
    {
      company: '서비스업 B사',
      industry: '인테리어 디자인',
      employees: '직원 12명',
      period: '2024년 5월 ~ 11월 (6개월)',
      investment: '800만원 (기본형 웹사이트 + AI 챗봇)',
      results: {
        consultations: '월 5건 → 월 35건 (7배 증가)',
        conversionRate: '20% → 65% (3배 향상)',
        satisfaction: '80% → 95% (24시간 상담)',
        marketingCost: '50% 절감 (자동화 효과)'
      },
      testimonial: '예전에는 전화 못 받으면 고객을 놓쳤는데, 이제는 AI가 24시간 상담받고 예약까지 잡아줘서 매출이 정말 많이 늘었어요.',
      icon: Palette
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 통일된 히어로 섹션 */}
      <HeroSection {...heroData} />

      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/services')}
              className="p-0 h-auto font-normal hover:text-purple-600"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              서비스 목록
            </Button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-purple-600 font-medium">매출증대 웹사이트 구축</span>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">세무사 고객에게 제공하는 핵심 가치</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                디지털 혁신으로 함께 성장하는 파트너십
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AI 챗봇 임베디드 웹사이트로 고객사의 매출이 증가하면, 세무사의 수수료 수익도 함께 증가합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-24 bg-gradient-to-r ${value.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                      <value.icon className="w-10 h-10 text-white relative z-10" />
                    </div>
                    <div className="p-6">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{value.value}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* Business Model Zen Framework */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-800">Business Model Zen 프레임워크</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                5단계 전략적 웹사이트 구축 프로세스
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                체계적이고 검증된 프레임워크로 디지털 혁신 성공률을 극대화합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {bmzFramework.map((stage, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-20 bg-gradient-to-r ${stage.color} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                      <stage.icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-bold text-gray-500 mb-1">{stage.stage}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                      <div className="space-y-1">
                        {stage.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {index < bmzFramework.length - 1 && (
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center z-10 lg:block hidden">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 성장 단계별 맞춤형 웹사이트 전략 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">성장 단계별 맞춤형 전략</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                기업 성장 단계에 최적화된 웹사이트 솔루션
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                창업부터 글로벌 진출까지, 각 성장 단계에 맞는 전략적 웹사이트를 제공합니다.
              </p>
            </div>

            <div className="space-y-8">
              {growthStages.map((stage, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-5 gap-0">
                      <div className={`bg-gradient-to-r ${stage.color} p-6 flex flex-col justify-center items-center text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                        <stage.icon className="w-12 h-12 mb-3 relative z-10" />
                        <div className="text-lg font-bold mb-1 relative z-10">{stage.stage}</div>
                        <div className="text-sm text-white/90 relative z-10 text-center">{stage.period}</div>
                      </div>
                      <div className="lg:col-span-4 p-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.title}</h3>
                            <p className="text-gray-600 mb-4 font-medium">핵심 목표: {stage.target}</p>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              {stage.features.map((feature, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-sm font-semibold text-gray-900 mb-1">{feature.name}</div>
                                  <div className="text-xs text-purple-600">{feature.effect}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                            <h4 className="font-bold text-gray-900 mb-3 text-center">투자 및 수익 분석</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-gray-600">초기 투자</div>
                                <div className="text-lg font-bold text-purple-600">{stage.investment}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">월 매출 증가</div>
                                <div className="text-lg font-bold text-green-600">{stage.monthlyRevenue}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">투자 회수</div>
                                <div className="text-lg font-bold text-orange-600">{stage.recoveryPeriod}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI 챗봇 임베디드 시스템 상세 */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
                <Bot className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">AI 챗봇 임베디드 시스템 상세</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                24시간 365일 지능형 고객 응대 시스템
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                세무사와 완벽하게 연동되는 스마트 AI 챗봇으로 고객 응대를 혁신하세요.
              </p>
            </div>

            <div className="space-y-8">
              {chatbotFeatures.map((category, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                        <p className="text-purple-100 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="grid lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{feature.name}</div>
                            <div className="text-sm text-gray-600">{feature.capability}</div>
                          </div>
                          <div>
                            <div className="text-sm text-purple-600 font-medium">{feature.handoff}</div>
                          </div>
                          <div className="flex items-center justify-end">
                            <div className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                              95% 정확도
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 성과 측정 및 효과 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">검증된 성과 지표</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                고객 기업 성과 지표 (6개월 기준)
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AI 챗봇 임베디드 웹사이트 도입 후 실제 측정된 성과 데이터입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <metric.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{metric.metric}</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">{metric.before}</div>
                      <ChevronRight className="w-4 h-4 text-gray-400 mx-auto" />
                      <div className="text-lg font-bold text-green-600">{metric.after}</div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{metric.period}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI 챗봇 특화 효과 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-purple-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI 챗봇 특화 효과</h3>
                <p className="text-gray-600">24시간 자동 응대 시스템의 핵심 성과</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600 mb-1">문의 응답률</div>
                  <div className="text-xs text-gray-500">30% → 95% (즉시 응답)</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">60%</div>
                  <div className="text-sm text-gray-600 mb-1">상담 예약율</div>
                  <div className="text-xs text-gray-500">20% → 60% (자동 예약)</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">90%</div>
                  <div className="text-sm text-gray-600 mb-1">고객 만족도</div>
                  <div className="text-xs text-gray-500">70% → 90% (24시간 서비스)</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">80%</div>
                  <div className="text-sm text-gray-600 mb-1">업무 자동화</div>
                  <div className="text-xs text-gray-500">직원 반복 업무 80% 자동화</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">검증된 성공 사례</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                실제 고객사 성공 스토리
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AI 챗봇 임베디드 웹사이트로 매출 혁신을 달성한 고객사들의 실제 사례입니다.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {successCases.map((case_, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <case_.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{case_.company}</CardTitle>
                        <p className="text-purple-100 text-sm">{case_.industry} | {case_.employees}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">프로젝트 기간</div>
                      <div className="font-semibold text-gray-900">{case_.period}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">투자 금액</div>
                      <div className="font-semibold text-purple-600">{case_.investment}</div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">주요 성과</h4>
                      {Object.entries(case_.results).map(([key, value], idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <ThumbsUp className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <blockquote className="text-sm text-gray-700 italic">
                          "{case_.testimonial}"
                        </blockquote>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 특별 혜택 및 프로모션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-800">세무사 파트너 론칭 혜택</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              얼리버드 특가 (선착순 20개사)
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              세무사 파트너십 프로그램 론칭을 기념하여 특별 혜택을 제공합니다.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-2">30% 할인</div>
                <div className="text-sm text-gray-700">구축비 1,000만원 → 700만원</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">6개월 무료</div>
                <div className="text-sm text-gray-700">운영비 900만원 상당 무료</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-2">무료 업그레이드</div>
                <div className="text-sm text-gray-700">AI 챗봇 고급형 300만원 상당</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-2">1년 무료</div>
                <div className="text-sm text-gray-700">전용 교육 프로그램 200만원 상당</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💎 성과 보장 제도</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-orange-800">6개월 내 온라인 매출 2배 미달 시</div>
                  <div className="text-gray-700">추가 3개월 무료 지원</div>
                </div>
                <div>
                  <div className="font-semibold text-orange-800">AI 챗봇 만족도 90% 미달 시</div>
                  <div className="text-gray-700">완전 재구축 무료 제공</div>
                </div>
                <div>
                  <div className="font-semibold text-orange-800">투자 회수 18개월 초과 시</div>
                  <div className="text-gray-700">차액 보상 (최대 500만원)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              지금 시작하세요! 디지털 혁신 파트너십
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              AI 챗봇 임베디드 웹사이트로 고객사 온라인 매출 30-50% 증대하고,
              세무사 수수료 수익도 함께 350% 성장시키세요!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">1단계</div>
                <div className="text-sm">38단계 무료 디지털 진단</div>
                <div className="text-xs text-purple-200 mt-1">소요시간: 15분</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">2단계</div>
                <div className="text-sm">전문가 맞춤 상담</div>
                <div className="text-xs text-purple-200 mt-1">90분 심층 컨설팅</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">3단계</div>
                <div className="text-sm">프로젝트 시작</div>
                <div className="text-xs text-purple-200 mt-1">성과 보장 조건 명시</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => router.push('/consultation')}
              >
                <Phone className="w-5 h-5 mr-2" />
                무료 상담 신청
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4"
                onClick={() => router.push('/ai-diagnosis')}
              >
                <Search className="w-5 h-5 mr-2" />
                38단계 디지털 성숙도 진단
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-purple-200 mb-2">전문가 직접 상담 - AI CAMP 디지털혁신센터</p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-bold">010-9251-9743</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>hongik423@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>이후경 책임컨설턴트</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
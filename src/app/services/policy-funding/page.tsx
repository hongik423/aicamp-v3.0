'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Building2,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Zap,
  Target,
  BarChart3,
  FileText,
  Brain,
  Cpu,
  DollarSign,
  Lightbulb,
  Calendar,
  Phone,
  Mail,
  Play,
  ChevronRight,
  Crown,
  Sparkles,
  Database,
  Settings,
  PieChart,
  Calculator,
  Globe,
  Rocket,
  Gauge,
  LineChart,
  TrendingDown,
  AlertTriangle,
  MapPin,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/header';
import InteractiveFinancialCharts from '@/components/policy-funding/InteractiveFinancialCharts';
import CaseStudySystem from '@/components/policy-funding/CaseStudySystem';

const PolicyFundingPage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [activeTier, setActiveTier] = useState(1);

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 핵심 성과 지표 (PRD 문서 기준)
  const keyMetrics = [
    {
      value: "95%",
      label: "정책자금 선정 성공률",
      description: "업계 평균 30% 대비 3배 성과",
      icon: Target,
      color: "text-green-600",
      trend: "+12%"
    },
    {
      value: "25일",
      label: "평균 처리기간",
      description: "업계 최단 처리시간 달성",
      icon: Clock,
      color: "text-blue-600",
      trend: "-60%"
    },
    {
      value: "4.2억원",
      label: "평균 확보 금액",
      description: "최대 150억원까지 확보",
      icon: DollarSign,
      color: "text-purple-600",
      trend: "+8%"
    },
    {
      value: "800+",
      label: "누적 성공 사례",
      description: "검증된 전문성과 신뢰도",
      icon: Award,
      color: "text-orange-600",
      trend: "+156"
    }
  ];

  // 듀얼브레인 5단계 프로세스
  const dualBrainProcess = [
    {
      step: 1,
      title: "AI 빅데이터 환경분석",
      description: "10만+ 기업 데이터로 실시간 환경 분석",
      duration: "1-2일",
      icon: Database,
      humanRole: "분석 방향성 및 핵심 변수 설정",
      aiRole: "10만+ 기업 데이터 실시간 분석",
      outputs: ["종합 환경분석 리포트", "기회요인 및 위험요인 매트릭스", "정책 변화 영향도 분석"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "하이브리드 시장분석",
      description: "경쟁사 분석 및 시장 기회 발굴",
      duration: "2-3일",
      icon: BarChart3,
      humanRole: "시장 기회의 전략적 해석",
      aiRole: "실시간 경쟁사 벤치마킹",
      outputs: ["정밀 시장분석 리포트", "경쟁우위 전략 제안서", "고객 세그먼트별 전략"],
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 3,
      title: "초정밀 재무분석",
      description: "1,000+ 시나리오 재무 시뮬레이션",
      duration: "3-4일",
      icon: PieChart,
      humanRole: "재무 전략 수립 및 최적화",
      aiRole: "1,000+ 시나리오 동시 분석",
      outputs: ["종합 재무분석 리포트", "다중 시나리오 분석표", "투자수익성 검증서"],
      color: "from-purple-500 to-violet-500"
    },
    {
      step: 4,
      title: "지능형 정책매칭",
      description: "500+ 정책자금 실시간 매칭",
      duration: "2-3일",
      icon: Target,
      humanRole: "정책 변화 대응 전략 수립",
      aiRole: "500+ 정책자금 실시간 매칭",
      outputs: ["맞춤형 정책자금 매칭표", "성공확률 예측 리포트", "신청 전략 가이드"],
      color: "from-orange-500 to-red-500"
    },
    {
      step: 5,
      title: "통합 의사결정 지원",
      description: "최적 솔루션 및 실행 계획",
      duration: "1-2일",
      icon: Crown,
      humanRole: "최종 전략 의사결정",
      aiRole: "종합 리스크 매트릭스 생성",
      outputs: ["종합 사업타당성분석서", "정책자금 신청 전략서", "실행 로드맵 및 관리 방안"],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  // 서비스 티어
  const serviceTiers = [
    {
      id: 1,
      name: "기본 분석 서비스",
      price: "문의",
      description: "소규모 프로젝트, 초기 검토 단계",
      features: [
        "AI 자동 사업타당성분석",
        "정책자금 매칭 (Top 10)",
        "기본 재무 시뮬레이션",
        "신청서 템플릿 제공",
        "이후경 경영지도사 검토 1회"
      ],
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      id: 2,
      name: "듀얼브레인 프리미엄",
      price: "문의",
      description: "중대형 프로젝트, 확실한 성공 보장",
      features: [
        "완전 듀얼브레인 분석 프로세스",
        "1,000+ 시나리오 정밀 분석",
        "맞춤형 신청서 완전 작성",
        "심사 대응 전략 수립",
        "6개월 사후 관리",
        "실시간 진행상황 공유"
      ],
      color: "border-blue-500 ring-2 ring-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      recommended: true
    },
    {
      id: 3,
      name: "전략 컨설팅 패키지",
      price: "문의",
      description: "대규모 프로젝트, 장기 파트너십",
      features: [
        "프리미엄 서비스 + 추가 혜택",
        "실시간 모니터링 시스템",
        "무제한 전략 상담",
        "재신청 보장 서비스",
        "1년 전략 파트너십"
      ],
      color: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  // 성공사례
  const successCases = [
    {
      company: "㈜테크이노베이션",
      industry: "IT/소프트웨어",
      amount: "45억원",
      duration: "18일",
      result: "1차 선정",
      testimonial: "기존 3번 탈락했는데, 듀얼브레인 분석으로 한 번에 성공했습니다!",
      ceo: "김대표"
    },
    {
      company: "㈜스마트팩토리",
      industry: "제조업",
      amount: "38억원",
      duration: "22일",
      result: "심사위원 만점",
      testimonial: "AI 분석의 정확도와 전문가의 통찰력이 결합된 완벽한 서비스였습니다.",
      ceo: "박대표"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 mb-6">
                <Crown className="w-4 h-4 mr-2" />
                대한민국 최고 수준 정책자금 전문 플랫폼
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                중소기업 성장 동력을
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  확실하게 뒷받침
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Apple Store 수준의 사용자 경험과 <strong className="text-yellow-300">95% 성공률</strong>의 전문성을 결합한<br />
                <strong className="text-cyan-300">토털 솔루션</strong>으로 정책자금 확보의 새로운 기준을 제시합니다
              </p>
            </motion.div>

            {/* 성과 지표 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            >
              {keyMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="absolute top-3 right-3">
                    <metric.icon className={`w-5 h-5 ${metric.color.replace('text-', 'text-')}`} />
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold text-white mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-blue-200 font-medium mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-blue-300 mb-3">
                    {metric.description}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400 font-semibold">
                      {metric.trend}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                onClick={() => router.push('/consultation')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg px-8 py-4 rounded-full shadow-2xl"
              >
                무료 상담 신청하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full"
              >
                성공사례 보기
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 듀얼브레인 시각화 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              혁신적 듀얼브레인 방법론
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              인간 전문성과 AI 기술의 완벽한 융합으로 10명 전문가팀의 성과를 1/3 시간에 5배 깊이로 구현
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* 이후경 경영지도사 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-200"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">이후경 경영지도사</h3>
              <div className="space-y-2 text-gray-700">
                <div className="font-semibold">✓ 경영지도사 자격 보유</div>
                <div className="font-semibold">✓ 20년 정책자금 컨설팅 경력</div>
                <div className="font-semibold">✓ 1,000+ 성공 프로젝트 경험</div>
                <div className="font-semibold">✓ 정부 정책 담당자 네트워크</div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-xl">
                <div className="text-sm text-blue-600 font-medium">담당 역할</div>
                <div className="text-gray-800">창조적 사고와 직관적 판단, 최종 의사결정</div>
              </div>
            </motion.div>

            {/* 시너지 표현 */}
            <div className="flex flex-col items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4"
              >
                <Sparkles className="w-8 h-8 text-purple-600" />
              </motion.div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">시너지 효과</h3>
                <p className="text-gray-600">인간 직관 × AI 정밀도</p>
                <div className="mt-4 text-sm text-purple-600 font-semibold">98% 성공률 달성</div>
              </div>
            </div>

            {/* AI 시스템 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 text-center border border-purple-200"
            >
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI 시스템</h3>
              <div className="space-y-2 text-gray-700">
                <div className="font-semibold">✓ 실시간 빅데이터 분석 (10만+ 기업)</div>
                <div className="font-semibold">✓ 1,000+ 시나리오 동시 처리</div>
                <div className="font-semibold">✓ 24/7 지속적 학습 및 업데이트</div>
                <div className="font-semibold">✓ 500+ 정책자금 실시간 매칭</div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-xl">
                <div className="text-sm text-purple-600 font-medium">담당 역할</div>
                <div className="text-gray-800">무제한 동시 처리, 정밀한 패턴 인식</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Financial Charts 섹션 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveFinancialCharts />
        </div>
      </section>

      {/* Case Study System 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaseStudySystem />
        </div>
      </section>

      {/* Progressive Disclosure - 주요 차별화 요소 */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-white/10 text-white border-white/20 mb-6">
                <Rocket className="w-4 h-4 mr-2" />
                세계 최고 수준의 차별화
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                왜 AI CAMP인가?
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                업계 평균을 압도하는 성과와 혁신적 방법론
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 성공률 비교 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">성공률</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-purple-200 text-sm">vs 업계 평균 30%</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">AI CAMP</span>
                  <span className="text-white font-semibold">95%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full w-[95%]"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">업계 평균</span>
                  <span className="text-white font-semibold">30%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full w-[30%]"></div>
                </div>
              </div>
            </motion.div>

            {/* 처리 속도 비교 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">처리 속도</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">25일</div>
                <div className="text-purple-200 text-sm">vs 업계 평균 60일</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">AI CAMP</span>
                  <span className="text-white font-semibold">25일</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full w-[42%]"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">업계 평균</span>
                  <span className="text-white font-semibold">60일</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full w-[100%]"></div>
                </div>
              </div>
            </motion.div>

            {/* 평균 확보 금액 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">확보 금액</h3>
                <div className="text-4xl font-bold text-purple-400 mb-2">4.2억원</div>
                <div className="text-purple-200 text-sm">최대 150억원</div>
              </div>
              <div className="bg-purple-500/20 rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-white font-semibold mb-1">성공 사례</div>
                  <div className="text-purple-200 text-sm">800+ 프로젝트 완료</div>
                  <div className="flex justify-center items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-white text-sm ml-2">4.9/5.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5단계 프로세스 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              듀얼브레인 혁신 프로세스
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              기존 60일 → 20일 (67% 단축), 1,000+ 시나리오 정밀 분석
            </p>
          </div>

          <div className="space-y-8">
            {dualBrainProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-3xl overflow-hidden ${
                  activeStep === index ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      {/* 단계 정보 */}
                      <div className="text-center lg:text-left">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${process.color} text-white mb-4`}>
                          <process.icon className="w-8 h-8" />
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">STEP {process.step}</Badge>
                          <Badge className="bg-green-100 text-green-700">{process.duration}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{process.title}</h3>
                        <p className="text-gray-600">{process.description}</p>
                      </div>

                      {/* 듀얼브레인 역할 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-900">전문가</span>
                          </div>
                          <p className="text-sm text-blue-800">{process.humanRole}</p>
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-purple-900">AI</span>
                          </div>
                          <p className="text-sm text-purple-800">{process.aiRole}</p>
                        </div>
                      </div>

                      {/* 결과물 */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-3">산출물</h4>
                        <div className="space-y-2">
                          {process.outputs.map((output, outputIndex) => (
                            <div key={outputIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{output}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 프로세스 요약 */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">총 20일</div>
                <div className="text-gray-600">완성 기간</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">예측 정확도</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">1,000+</div>
                <div className="text-gray-600">시나리오 분석</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 티어 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              서비스 구성
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              프로젝트 규모와 요구사항에 맞는 최적의 솔루션을 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTiers.map((tier) => (
              <motion.div
                key={tier.id}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-3xl overflow-hidden ${tier.color} ${
                  tier.recommended ? 'transform scale-105' : ''
                }`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-2 text-sm font-semibold">
                    ⭐ 추천
                  </div>
                )}
                <Card className="border-0 h-full">
                  <CardHeader className={`text-center ${tier.recommended ? 'pt-12' : 'pt-8'}`}>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {tier.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-blue-600">{tier.price}</div>
                    <CardDescription className="text-gray-600">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    <Button 
                      className={`w-full mt-6 ${tier.buttonColor} text-white`}
                      onClick={() => router.push('/consultation')}
                    >
                      상담 신청하기
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 성공사례 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              검증된 성공사례
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              듀얼브레인으로 달성한 실제 성과들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successCases.map((case_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{case_.company}</h3>
                    <p className="text-gray-600">{case_.industry}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{case_.amount}</div>
                    <div className="text-sm text-gray-500">{case_.duration} 완성</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <div className="text-sm text-blue-600 font-medium mb-1">결과</div>
                  <div className="text-blue-900 font-semibold">{case_.result}</div>
                </div>

                <blockquote className="italic text-gray-700 mb-4">
                  "{case_.testimonial}"
                </blockquote>
                <div className="text-right text-sm text-gray-500">- {case_.ceo}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 최종 CTA 섹션 - Apple Store 스타일 */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* 배경 효과 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mb-8">
              <Crown className="w-4 h-4 mr-2" />
              지금 시작하세요
            </Badge>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              중소기업 성장의
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                확실한 파트너
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              <strong className="text-yellow-300">95% 성공률</strong>의 검증된 전문성으로<br />
              귀하의 사업 성장을 확실하게 뒷받침하겠습니다
            </p>
            
            {/* 보장 사항 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <div className="text-white font-bold text-lg mb-2">24시간 내</div>
                <div className="text-blue-200 text-sm">전문가 연락</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Target className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <div className="text-white font-bold text-lg mb-2">무료 진단</div>
                <div className="text-blue-200 text-sm">성공확률 분석</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Lightbulb className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <div className="text-white font-bold text-lg mb-2">맞춤 전략</div>
                <div className="text-blue-200 text-sm">개별화된 솔루션</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Shield className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <div className="text-white font-bold text-lg mb-2">성공 보장</div>
                <div className="text-blue-200 text-sm">95% 성공률</div>
              </motion.div>
            </div>

            {/* 주요 CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => router.push('/consultation')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-xl px-12 py-6 rounded-full shadow-2xl font-bold border-0"
                >
                  무료 상담 신청하기
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xl px-12 py-6 rounded-full backdrop-blur-sm"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  1599-1234
                </Button>
              </motion.div>
            </div>

            {/* 신뢰도 지표 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">800+</div>
                <div className="text-blue-200 text-sm">성공 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">95%</div>
                <div className="text-blue-200 text-sm">선정 성공률</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">4.9</div>
                <div className="text-blue-200 text-sm">고객 만족도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">25일</div>
                <div className="text-blue-200 text-sm">평균 처리기간</div>
              </div>
            </div>

            {/* 긴급성 요소 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 p-6 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-semibold">한정 특가</span>
              </div>
              <p className="text-white">
                이달 말까지 <strong className="text-yellow-300">무료 심층 분석</strong> 제공 
                (정가 200만원 상당)
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PolicyFundingPage; 
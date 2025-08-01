'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, Shield, Users, TrendingUp, CheckCircle, Star, Target, Lightbulb, 
  BarChart3, FileText, Zap, ArrowRight, Award, Brain, Globe, Smartphone,
  Building, MapPin, Phone, Mail
} from 'lucide-react';

const keyFeatures = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'AI 기반 정밀 분석',
    description: 'Gemini 2.5 Flash 엔진으로 200+ 업종 데이터베이스 기반 맞춤 분석',
    highlight: '전문가 수준'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: '8개 섹션 종합 보고서',
    description: '경영환경, SWOT, 전략, 실행계획, 리스크, 기회, 제언, 서비스연계',
    highlight: '포괄적 진단'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: '3단계 실행 로드맵',
    description: '1-3개월, 4-9개월, 10-12개월 단계별 구체적 실행 계획 제시',
    highlight: '실행 가능한'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: '5-10분 내 즉시 결과',
    description: '기존 컨설팅 2-4주 소요 → AI 분석으로 즉시 결과 제공',
    highlight: '초고속 분석'
  }
];

const analysisContent = [
  {
    title: '1. 진단 개요',
    items: ['기업 현황 종합 분석', '업종별 특성 반영', '핵심 이슈 도출']
  },
  {
    title: '2. SWOT 분석',
    items: ['강점-기회 결합 전략 (SO)', '약점-기회 활용 전략 (WO)', '강점-위협 대응 전략 (ST)', '약점-위협 해결 전략 (WT)']
  },
  {
    title: '3. 전략 방향',
    items: ['핵심 전략 과제 도출', '우선순위 매트릭스', '차별화 전략 제안']
  },
  {
    title: '4. 실행 로드맵',
    items: ['단계별 실행 계획', '월별 타임라인', 'KPI 설정 가이드']
  },
  {
    title: '5. 벤치마킹',
    items: ['동종업계 비교 분석', '성공 사례 매칭', '경쟁 우위 요소 발굴']
  },
  {
    title: '6. 추천 서비스',
    items: ['AICAMP 교육 프로그램', '전문가 컨설팅 연결', '정부 지원사업 안내']
  }
];

const differentiators = [
  {
    category: '접근성',
    comparison: '기존 컨설팅 수백만원 → 100% 무료 제공',
    benefit: '진입장벽 완전 제거'
  },
  {
    category: '속도',
    comparison: '기존 2-4주 소요 → 5-10분 내 즉시 결과',
    benefit: '빠른 의사결정 지원'
  },
  {
    category: '개인화',
    comparison: '일반화된 템플릿 → 신청자별 100% 맞춤 분석',
    benefit: '실질적 도움'
  },
  {
    category: '연계성',
    comparison: '일회성 진단 → 교육/컨설팅 자연스러운 연결',
    benefit: '지속적 성장 지원'
  }
];

const useCases = [
  {
    type: '중소기업 CEO',
    scenario: '스마트 팩토리 도입 검토',
    needs: ['디지털 전환 방향성', 'ROI 분석', '실행 우선순위'],
    result: '3단계 디지털 전환 로드맵 + 투자 우선순위 제시'
  },
  {
    type: '스타트업 창업자',
    scenario: '시리즈 A 투자 유치 준비',
    needs: ['객관적 사업 분석', '경쟁사 비교', '성장 전략'],
    result: '투자자 설득용 데이터 + 확장성 검증 + 차별화 전략'
  },
  {
    type: '온라인 쇼핑몰 운영자',
    scenario: '매출 성장 정체 해결',
    needs: ['고객 분석', '마케팅 전략', '운영 효율화'],
    result: '고객 세분화 전략 + 채널별 마케팅 플랜 + 자동화 방안'
  }
];

const stepByStep = [
  {
    step: 1,
    title: '기본 정보 입력',
    description: '기업명, 업종, 지역 등 기본 정보를 입력합니다',
    time: '1분',
    details: ['기업명', '대표자명', '업종 선택 (200+ 업종)', '사업 지역']
  },
  {
    step: 2,
    title: '사업 현황 작성',
    description: '사업 내용과 주요 고민사항을 작성합니다',
    time: '2분',
    details: ['사업 내용 (20자 이상)', '주요 고민사항 선택', '기대 효과 작성', '연락처 정보']
  },
  {
    step: 3,
    title: 'AI 분석 진행',
    description: 'AI가 입력된 정보를 바탕으로 종합 분석합니다',
    time: '5-10분',
    details: ['업종별 특화 분석', 'SWOT 매트릭스 생성', '경쟁사 비교 분석', '실행 로드맵 수립']
  },
  {
    step: 4,
    title: '진단 결과 확인',
    description: '8개 섹션으로 구성된 맞춤형 진단 보고서를 확인합니다',
    time: '즉시',
    details: ['6개 탭 인터랙티브 보고서', 'PDF 다운로드', '전문가 상담 연결', 'AICAMP 서비스 추천']
  }
];

export default function DiagnosisServiceOverviewPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStartDiagnosis = () => {
    window.location.href = '/diagnosis';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
              <Award className="w-4 h-4 mr-2" />
              AI 기반 무료 경영진단 시스템
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              전문가 수준의<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                AI 경영진단
              </span>을<br />
              무료로 받아보세요
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              200+ 업종 데이터베이스와 최신 AI 기술로 기업별 맞춤형 경영진단을 제공합니다.<br />
              8개 섹션 종합 분석과 3단계 실행 로드맵을 5-10분 내에 확인하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={handleStartDiagnosis}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 font-semibold shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                무료 진단 시작하기
              </Button>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  전체 서비스 보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% 무료</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5-10분 내 결과</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>8개 섹션 보고서</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>전문가 상담 연결</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 특징 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 AICAMP AI 진단을 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              기존 컨설팅의 한계를 뛰어넘는 혁신적인 AI 기반 경영진단 서비스입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-700">
                    {feature.highlight}
                  </Badge>
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 진단 과정 단계별 안내 */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              간단한 4단계로 완성되는 진단
            </h2>
            <p className="text-xl text-gray-600">
              복잡한 절차 없이 간단하게 전문가급 진단을 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {stepByStep.map((step, index) => (
              <div key={index} className="relative">
                <Card className={`h-full transition-all duration-300 cursor-pointer ${
                  activeStep === index ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`} onClick={() => setActiveStep(index)}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-4">
                      {step.description}
                    </p>
                    <div className="text-center mb-4">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.time}
                      </Badge>
                    </div>
                    
                    {activeStep === index && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">세부 내용:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* 화살표 (마지막 단계 제외) */}
                {index < stepByStep.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-gray-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 분석 내용 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              8개 섹션 종합 진단 내용
            </h2>
            <p className="text-xl text-gray-600">
              전문 컨설팅 수준의 포괄적 분석을 AI로 자동화했습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisContent.map((section, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 차별화 포인트 섹션 */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              기존 컨설팅과 완전히 다른 접근
            </h2>
            <p className="text-xl text-gray-600">
              AI 기술로 컨설팅의 패러다임을 바꿨습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <Card key={index} className="border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{diff.category}</h3>
                      <p className="text-gray-600 mb-3">{diff.comparison}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {diff.benefit}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 활용 사례 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              실제 활용 사례
            </h2>
            <p className="text-xl text-gray-600">
              다양한 업종과 규모의 기업이 실제로 활용하고 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{useCase.type}</h3>
                    <p className="text-blue-600 font-medium">{useCase.scenario}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">주요 니즈</h4>
                    <ul className="space-y-2">
                      {useCase.needs.map((need, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">진단 결과</h4>
                    <p className="text-sm text-green-700">{useCase.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <Star className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  지금 시작하세요
                </h3>
                <p className="text-xl text-blue-100 mb-2">
                  2분 투자로 받는 전문가 수준의 경영진단
                </p>
                <p className="text-blue-200">
                  8개 섹션 종합 보고서 + 3단계 실행 로드맵 + PDF 다운로드
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  onClick={handleStartDiagnosis}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-50 text-xl px-10 py-5 font-bold shadow-lg"
                >
                  <Zap className="w-6 h-6 mr-2" />
                  무료 진단 시작하기
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>100% 무료 서비스</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5-10분 내 결과 확인</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>PDF 다운로드 가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  <span>모바일 최적화</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 연락처 정보 섹션 */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">궁금한 점이 있으신가요?</h2>
          <p className="text-gray-300 mb-8">
            AI 진단 서비스에 대해 더 자세한 정보가 필요하시면 언제든지 연락주세요
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>010-9251-9743</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>hongik423@gmail.com</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Building className="w-5 h-5 text-blue-400" />
              <span>AICAMP AI 교육센터</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
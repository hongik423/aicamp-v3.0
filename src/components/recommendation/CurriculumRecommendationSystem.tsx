'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain,
  Target,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  Lightbulb,
  Zap,
  Building,
  GraduationCap,
  BarChart3,
  Settings,
  ArrowRight,
  Play,
  BookOpen,
  Award,
  DollarSign,
  Download
} from 'lucide-react';

interface CompanyProfile {
  industry: string;
  size: string;
  currentAILevel: number;
  goals: string[];
  timeline: string;
  budget: string;
  technicalCapability: number;
  urgency: number;
}

interface CurriculumModule {
  id: string;
  name: string;
  category: 'basic' | 'advanced' | 'executive';
  duration: number;
  difficulty: number;
  prerequisites: string[];
  outcomes: string[];
  tools: string[];
  industry: string[];
  priority: number;
  estimatedROI: number;
}

interface RecommendedPath {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  estimatedROI: number;
  difficulty: number;
  modules: CurriculumModule[];
  timeline: {
    phase: string;
    duration: number;
    modules: string[];
    outcomes: string[];
  }[];
  successRate: number;
  similarCompanies: number;
}

const curriculumModules: CurriculumModule[] = [
  // 기초 모듈
  {
    id: 'ai-fundamentals',
    name: 'AI 기초 이해',
    category: 'basic',
    duration: 8,
    difficulty: 1,
    prerequisites: [],
    outcomes: ['AI 개념 이해', 'AI 활용 사례 파악', '기본 용어 숙지'],
    tools: ['ChatGPT', 'AI 개념'],
    industry: ['전업종'],
    priority: 10,
    estimatedROI: 150
  },
  {
    id: 'prompt-engineering',
    name: '프롬프트 엔지니어링',
    category: 'basic',
    duration: 16,
    difficulty: 2,
    prerequisites: ['ai-fundamentals'],
    outcomes: ['효과적 프롬프트 작성', 'ChatGPT 고급 활용', '업무 자동화 기초'],
    tools: ['ChatGPT', 'Claude'],
    industry: ['전업종'],
    priority: 9,
    estimatedROI: 200
  },
  {
    id: 'n8n-basics',
    name: 'n8n 워크플로우 기초',
    category: 'basic',
    duration: 12,
    difficulty: 2,
    prerequisites: ['prompt-engineering'],
    outcomes: ['노코드 자동화 이해', '기본 워크플로우 구축', 'API 연동 기초'],
    tools: ['n8n', 'API'],
    industry: ['전업종'],
    priority: 8,
    estimatedROI: 300
  },

  // 심화 모듈 - 제조업
  {
    id: 'manufacturing-ai',
    name: '제조업 AI 특화',
    category: 'advanced',
    duration: 24,
    difficulty: 4,
    prerequisites: ['n8n-basics'],
    outcomes: ['스마트팩토리 구축', 'IoT 연동', '품질 관리 AI'],
    tools: ['Computer Vision', 'IoT', 'ML'],
    industry: ['제조업'],
    priority: 9,
    estimatedROI: 450
  },
  {
    id: 'quality-control-ai',
    name: 'AI 품질관리',
    category: 'advanced',
    duration: 20,
    difficulty: 4,
    prerequisites: ['manufacturing-ai'],
    outcomes: ['자동 품질검사', '불량 예측', '품질 데이터 분석'],
    tools: ['YOLO', 'OpenCV', 'ML'],
    industry: ['제조업'],
    priority: 8,
    estimatedROI: 380
  },

  // 심화 모듈 - 서비스업
  {
    id: 'customer-service-ai',
    name: '고객서비스 AI',
    category: 'advanced',
    duration: 18,
    difficulty: 3,
    prerequisites: ['n8n-basics'],
    outcomes: ['AI 챗봇 구축', '감정분석', '고객 데이터 분석'],
    tools: ['ChatGPT API', '감정분석', 'CRM'],
    industry: ['서비스업'],
    priority: 8,
    estimatedROI: 350
  },

  // 심화 모듈 - 금융업
  {
    id: 'financial-ai',
    name: '금융 AI 분석',
    category: 'advanced',
    duration: 28,
    difficulty: 5,
    prerequisites: ['n8n-basics'],
    outcomes: ['리스크 분석', '투자 알고리즘', '자동화 트레이딩'],
    tools: ['Python', 'ML', '금융 API'],
    industry: ['금융업'],
    priority: 9,
    estimatedROI: 500
  },

  // 경영진 모듈
  {
    id: 'ai-strategy',
    name: 'AI 전략 수립',
    category: 'executive',
    duration: 6,
    difficulty: 2,
    prerequisites: [],
    outcomes: ['AI 도입 전략', 'ROI 분석', '조직 변화관리'],
    tools: ['전략 프레임워크'],
    industry: ['전업종'],
    priority: 7,
    estimatedROI: 200
  },
  {
    id: 'digital-transformation',
    name: '디지털 전환 리더십',
    category: 'executive',
    duration: 8,
    difficulty: 3,
    prerequisites: ['ai-strategy'],
    outcomes: ['DX 로드맵', '조직 혁신', '성과 관리'],
    tools: ['리더십 도구'],
    industry: ['전업종'],
    priority: 6,
    estimatedROI: 300
  }
];

const sampleRecommendations: RecommendedPath[] = [
  {
    id: 'manufacturing-complete',
    name: '제조업 완전 자동화 패키지',
    description: 'IoT + AI + n8n을 활용한 스마트팩토리 구축 전문 과정',
    totalDuration: 108,
    estimatedROI: 680,
    difficulty: 4,
    modules: curriculumModules.filter(m => 
      ['ai-fundamentals', 'prompt-engineering', 'n8n-basics', 'manufacturing-ai', 'quality-control-ai', 'ai-strategy'].includes(m.id)
    ),
    timeline: [
      {
        phase: '1단계: AI 기초 역량 구축',
        duration: 36,
        modules: ['AI 기초 이해', '프롬프트 엔지니어링', 'n8n 워크플로우 기초'],
        outcomes: ['AI 기본 이해', '자동화 도구 활용', '업무 프로세스 개선']
      },
      {
        phase: '2단계: 제조업 특화 AI 구축',
        duration: 44,
        modules: ['제조업 AI 특화', 'AI 품질관리'],
        outcomes: ['스마트팩토리 시스템', '품질 자동화', 'IoT 연동']
      },
      {
        phase: '3단계: 전략적 활용',
        duration: 6,
        modules: ['AI 전략 수립'],
        outcomes: ['조직 혁신 전략', 'ROI 극대화', '지속적 개선']
      }
    ],
    successRate: 94,
    similarCompanies: 156
  },
  {
    id: 'service-optimization',
    name: '서비스업 고객경험 최적화',
    description: 'AI 고객서비스 + 데이터 분석으로 고객만족도 극대화',
    totalDuration: 76,
    estimatedROI: 520,
    difficulty: 3,
    modules: curriculumModules.filter(m => 
      ['ai-fundamentals', 'prompt-engineering', 'n8n-basics', 'customer-service-ai', 'ai-strategy'].includes(m.id)
    ),
    timeline: [
      {
        phase: '1단계: AI 기초 및 자동화',
        duration: 36,
        modules: ['AI 기초 이해', '프롬프트 엔지니어링', 'n8n 워크플로우 기초'],
        outcomes: ['AI 도구 활용', '업무 자동화', '효율성 향상']
      },
      {
        phase: '2단계: 고객서비스 AI 구축',
        duration: 18,
        modules: ['고객서비스 AI'],
        outcomes: ['AI 챗봇 구축', '고객 데이터 분석', '서비스 개선']
      },
      {
        phase: '3단계: 전략 수립',
        duration: 6,
        modules: ['AI 전략 수립'],
        outcomes: ['서비스 혁신 전략', '고객경험 최적화']
      }
    ],
    successRate: 89,
    similarCompanies: 89
  },
  {
    id: 'finance-advanced',
    name: '금융업 AI 고도화',
    description: 'ML 기반 금융 분석 및 자동화 투자 시스템 구축',
    totalDuration: 96,
    estimatedROI: 720,
    difficulty: 5,
    modules: curriculumModules.filter(m => 
      ['ai-fundamentals', 'prompt-engineering', 'n8n-basics', 'financial-ai', 'ai-strategy', 'digital-transformation'].includes(m.id)
    ),
    timeline: [
      {
        phase: '1단계: AI 기초 및 자동화',
        duration: 36,
        modules: ['AI 기초 이해', '프롬프트 엔지니어링', 'n8n 워크플로우 기초'],
        outcomes: ['AI 기본 역량', '자동화 시스템', '프로세스 개선']
      },
      {
        phase: '2단계: 금융 AI 전문화',
        duration: 28,
        modules: ['금융 AI 분석'],
        outcomes: ['리스크 분석 AI', '투자 알고리즘', '자동화 트레이딩']
      },
      {
        phase: '3단계: 조직 혁신',
        duration: 14,
        modules: ['AI 전략 수립', '디지털 전환 리더십'],
        outcomes: ['DX 전략', '조직 변화', '성과 극대화']
      }
    ],
    successRate: 91,
    similarCompanies: 34
  }
];

export default function CurriculumRecommendationSystem() {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyProfile, setCompanyProfile] = useState<Partial<CompanyProfile>>({});
  const [recommendations, setRecommendations] = useState<RecommendedPath[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendedPath | null>(null);

  const industries = [
    { id: 'manufacturing', label: '제조업' },
    { id: 'service', label: '서비스업' },
    { id: 'finance', label: '금융업' },
    { id: 'startup', label: '스타트업' },
    { id: 'professional', label: '전문서비스' },
    { id: 'construction', label: '건설업' },
    { id: 'logistics', label: '물류유통' },
    { id: 'healthcare', label: '의료헬스케어' }
  ];

  const companySizes = [
    { id: 'small', label: '소기업 (50명 이하)' },
    { id: 'medium', label: '중기업 (51-300명)' },
    { id: 'large', label: '대기업 (301명 이상)' }
  ];

  const goals = [
    { id: 'efficiency', label: '업무 효율성 향상' },
    { id: 'automation', label: '프로세스 자동화' },
    { id: 'cost-reduction', label: '비용 절감' },
    { id: 'quality', label: '품질 개선' },
    { id: 'customer-satisfaction', label: '고객만족도 향상' },
    { id: 'innovation', label: '혁신 역량 강화' }
  ];

  const generateRecommendations = () => {
    // 실제 구현에서는 AI 기반 추천 알고리즘 사용
    const filtered = sampleRecommendations.filter(rec => {
      if (companyProfile.industry === 'manufacturing') {
        return rec.id === 'manufacturing-complete';
      } else if (companyProfile.industry === 'service') {
        return rec.id === 'service-optimization';
      } else if (companyProfile.industry === 'finance') {
        return rec.id === 'finance-advanced';
      }
      return true;
    });
    
    setRecommendations(filtered.length > 0 ? filtered : sampleRecommendations);
    setCurrentStep(3);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800';
    if (difficulty <= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return '기초';
    if (difficulty <= 3) return '중급';
    if (difficulty <= 4) return '고급';
    return '전문가';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 커리큘럼 추천 시스템
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            귀하의 기업에 최적화된 AI 교육 과정을 추천해드립니다
          </p>
        </div>

        {/* 진행 단계 */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[
              { step: 1, label: '기업 정보' },
              { step: 2, label: '목표 설정' },
              { step: 3, label: '추천 결과' },
              { step: 4, label: '상세 계획' }
            ].map((item, index) => (
              <React.Fragment key={item.step}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= item.step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > item.step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{item.step}</span>
                  )}
                </div>
                <span className={`text-sm ${
                  currentStep >= item.step ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <ArrowRight className={`w-4 h-4 ${
                    currentStep > item.step ? 'text-blue-600' : 'text-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 1단계: 기업 정보 입력 */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                기업 정보를 입력해주세요
              </CardTitle>
              <CardDescription>
                정확한 추천을 위해 기본 정보가 필요합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업종 선택
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {industries.map(industry => (
                    <button
                      key={industry.id}
                      onClick={() => setCompanyProfile({
                        ...companyProfile,
                        industry: industry.id
                      })}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        companyProfile.industry === industry.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {industry.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기업 규모
                </label>
                <div className="space-y-2">
                  {companySizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setCompanyProfile({
                        ...companyProfile,
                        size: size.id
                      })}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        companyProfile.size === size.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  현재 AI 활용 수준
                </label>
                <div className="space-y-2">
                  <Progress 
                    value={companyProfile.currentAILevel || 0} 
                    className="h-3"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={companyProfile.currentAILevel || 0}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      currentAILevel: parseInt(e.target.value)
                    })}
                    className="w-full"
                    aria-label="현재 AI 활용 수준"
                    title="현재 AI 활용 수준을 선택하세요"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>초보</span>
                    <span>중급</span>
                    <span>고급</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setCurrentStep(2)}
                className="w-full"
                disabled={!companyProfile.industry || !companyProfile.size}
              >
                다음 단계
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 2단계: 목표 설정 */}
        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                목표와 우선순위를 설정해주세요
              </CardTitle>
              <CardDescription>
                달성하고자 하는 목표를 선택하고 우선순위를 정해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  주요 목표 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {goals.map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => {
                        const currentGoals = companyProfile.goals || [];
                        const newGoals = currentGoals.includes(goal.id)
                          ? currentGoals.filter(g => g !== goal.id)
                          : [...currentGoals, goal.id];
                        setCompanyProfile({
                          ...companyProfile,
                          goals: newGoals
                        });
                      }}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        companyProfile.goals?.includes(goal.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  구현 일정
                </label>
                <select
                  value={companyProfile.timeline || ''}
                  onChange={(e) => setCompanyProfile({
                    ...companyProfile,
                    timeline: e.target.value
                  })}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  aria-label="구현 일정"
                  title="구현 일정을 선택하세요"
                >
                  <option value="">선택해주세요</option>
                  <option value="urgent">긴급 (1-2개월)</option>
                  <option value="normal">보통 (3-6개월)</option>
                  <option value="flexible">여유 (6개월 이상)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  예산 범위
                </label>
                <select
                  value={companyProfile.budget || ''}
                  onChange={(e) => setCompanyProfile({
                    ...companyProfile,
                    budget: e.target.value
                  })}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  aria-label="예산 범위"
                  title="예산 범위를 선택하세요"
                >
                  <option value="">선택해주세요</option>
                  <option value="low">1억 미만</option>
                  <option value="medium">1-5억</option>
                  <option value="high">5억 이상</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  이전
                </Button>
                <Button 
                  onClick={generateRecommendations}
                  className="flex-1"
                  disabled={!companyProfile.goals?.length || !companyProfile.timeline || !companyProfile.budget}
                >
                  추천받기
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3단계: 추천 결과 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                맞춤형 커리큘럼 추천
              </h2>
              <p className="text-gray-600">
                {companyProfile.industry === 'manufacturing' ? '제조업' :
                 companyProfile.industry === 'service' ? '서비스업' :
                 companyProfile.industry === 'finance' ? '금융업' : '귀하의 업종'}에 
                최적화된 AI 교육 과정을 추천해드립니다
              </p>
            </div>

            <div className="grid gap-6">
              {recommendations.map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {recommendation.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {recommendation.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-gray-400" />
                            <span>{recommendation.totalDuration}시간</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                            <span className="text-green-600 font-medium">
                              ROI {recommendation.estimatedROI}%
                            </span>
                          </div>
                          <Badge className={getDifficultyColor(recommendation.difficulty)}>
                            {getDifficultyLabel(recommendation.difficulty)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {recommendation.successRate}%
                        </div>
                        <div className="text-xs text-gray-500">성공률</div>
                        <div className="text-xs text-gray-400 mt-1">
                          유사 기업 {recommendation.similarCompanies}곳
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {recommendation.timeline.map((phase, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{phase.phase}</div>
                            <div className="text-sm text-gray-500">
                              {phase.duration}시간 • {phase.modules.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedRecommendation(recommendation);
                          setCurrentStep(4);
                        }}
                        className="flex-1"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        상세 보기
                      </Button>
                      <Button className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        시작하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(2)}
              >
                다른 조건으로 추천받기
              </Button>
            </div>
          </div>
        )}

        {/* 4단계: 상세 계획 */}
        {currentStep === 4 && selectedRecommendation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedRecommendation.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  상세 구현 계획 및 모듈별 정보
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(3)}
              >
                목록으로 돌아가기
              </Button>
            </div>

            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">단계별 계획</TabsTrigger>
                <TabsTrigger value="modules">모듈 상세</TabsTrigger>
                <TabsTrigger value="outcomes">예상 성과</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-4">
                {selectedRecommendation.timeline.map((phase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        {phase.phase}
                      </CardTitle>
                      <CardDescription>
                        소요시간: {phase.duration}시간
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">포함 모듈</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.modules.map((module, idx) => (
                              <Badge key={idx} variant="outline">
                                {module}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">기대 성과</h4>
                          <ul className="space-y-1">
                            {phase.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="modules" className="space-y-4">
                {selectedRecommendation.modules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{module.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {getDifficultyLabel(module.difficulty)}
                          </Badge>
                          <Badge variant="outline">
                            {module.duration}시간
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">학습 내용</h4>
                          <ul className="space-y-1">
                            {module.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <Star className="w-3 h-3 text-yellow-500 mr-2" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">활용 도구</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.tools.map((tool, idx) => (
                              <Badge key={idx} variant="secondary">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-gray-600">
                              예상 ROI: <span className="font-medium text-green-600">{module.estimatedROI}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="outcomes" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        효율성 향상
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        +{Math.round(selectedRecommendation.estimatedROI * 0.3)}%
                      </div>
                      <p className="text-sm text-gray-600">
                        업무 프로세스 자동화를 통한 생산성 향상
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-600">
                        <DollarSign className="w-5 h-5 mr-2" />
                        비용 절감
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {Math.round(selectedRecommendation.estimatedROI * 0.2)}억원
                      </div>
                      <p className="text-sm text-gray-600">
                        연간 예상 비용 절감 효과
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-purple-600">
                        <Users className="w-5 h-5 mr-2" />
                        직원 만족도
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {selectedRecommendation.successRate}%
                      </div>
                      <p className="text-sm text-gray-600">
                        AI 도구 활용으로 업무 만족도 향상
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      예상 성과 타임라인
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { period: '1개월 후', achievement: 'AI 기초 역량 확보, 기본 자동화 도구 활용' },
                        { period: '3개월 후', achievement: '핵심 업무 프로세스 자동화, 생산성 30% 향상' },
                        { period: '6개월 후', achievement: '고급 AI 시스템 구축, 전사 디지털 전환 완료' },
                        { period: '1년 후', achievement: `ROI ${selectedRecommendation.estimatedROI}% 달성, 업계 선도 기업으로 도약` }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.period}</div>
                            <div className="text-sm text-gray-600">{item.achievement}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                계획서 다운로드
              </Button>
              <Button size="lg">
                <Play className="w-4 h-4 mr-2" />
                교육 신청하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

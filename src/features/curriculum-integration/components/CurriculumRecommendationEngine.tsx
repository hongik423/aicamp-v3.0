'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  Target, 
  Clock, 
  TrendingUp, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Star,
  Building2
} from 'lucide-react';
import { INDUSTRY_SPECIFIC_CURRICULUM } from '../constants/enhanced-curriculum-database';
import { CurriculumRecommendation, CurriculumModule } from '../types';

interface CurriculumRecommendationEngineProps {
  industryType: string;
  companySize: string;
  currentAIMaturity: number; // 0-100
  specificNeeds: string[];
  budget?: number;
  timeline?: string;
  onRecommendationGenerated?: (recommendation: CurriculumRecommendation) => void;
}

export default function CurriculumRecommendationEngine({
  industryType,
  companySize,
  currentAIMaturity,
  specificNeeds,
  budget,
  timeline,
  onRecommendationGenerated
}: CurriculumRecommendationEngineProps) {
  const [recommendation, setRecommendation] = useState<CurriculumRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generateRecommendation();
  }, [industryType, companySize, currentAIMaturity, specificNeeds]);

  const generateRecommendation = async () => {
    setIsGenerating(true);
    setProgress(0);

    // 진행률 시뮬레이션
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 100);

    // 실제 추천 생성 로직
    setTimeout(() => {
      const newRecommendation = createCurriculumRecommendation();
      setRecommendation(newRecommendation);
      setProgress(100);
      setIsGenerating(false);
      clearInterval(progressInterval);
      
      if (onRecommendationGenerated) {
        onRecommendationGenerated(newRecommendation);
      }
    }, 1500);
  };

  const createCurriculumRecommendation = (): CurriculumRecommendation => {
    const industryCurriculum = INDUSTRY_SPECIFIC_CURRICULUM[industryType];
    if (!industryCurriculum) {
      return createDefaultRecommendation();
    }

    const recommendedModules: CurriculumModule[] = [];
    const customizationSuggestions: string[] = [];
    const implementationPlan: string[] = [];

    // AI 성숙도에 따른 모듈 선택
    if (currentAIMaturity < 30) {
      // 기초 과정 중심
      recommendedModules.push(...industryCurriculum.basic.slice(0, 3));
      customizationSuggestions.push('기초 과정부터 차근차근 시작하여 AI에 대한 두려움을 해소');
      customizationSuggestions.push('실무진 대상 핸즈온 실습 중심의 교육 진행');
    } else if (currentAIMaturity < 70) {
      // 기초 + 심화 과정 조합
      recommendedModules.push(...industryCurriculum.basic.slice(0, 2));
      recommendedModules.push(...industryCurriculum.advanced.slice(0, 2));
      customizationSuggestions.push('기존 AI 경험을 바탕으로 실무 적용 중심의 심화 교육');
      customizationSuggestions.push('부서별 특성을 고려한 맞춤형 프로젝트 진행');
    } else {
      // 심화 + 경영진 과정 중심
      recommendedModules.push(...industryCurriculum.advanced);
      recommendedModules.push(...industryCurriculum.executive);
      customizationSuggestions.push('고급 AI 기술 적용과 전략적 활용에 중점');
      customizationSuggestions.push('조직 전체의 AI 전환을 위한 리더십 교육 강화');
    }

    // 회사 규모에 따른 커스터마이징
    if (companySize === 'small') {
      customizationSuggestions.push('소규모 조직 특성에 맞는 즉시 적용 가능한 실무 중심 교육');
      implementationPlan.push('1단계: 핵심 인력 3-5명 집중 교육 (2주)');
      implementationPlan.push('2단계: 파일럿 프로젝트 진행 및 성과 측정 (4주)');
      implementationPlan.push('3단계: 전직원 확산 교육 (4주)');
    } else if (companySize === 'medium') {
      customizationSuggestions.push('부서별 특성을 고려한 단계적 교육 프로그램');
      implementationPlan.push('1단계: 부서별 리더 교육 (3주)');
      implementationPlan.push('2단계: 부서별 맞춤 교육 진행 (6주)');
      implementationPlan.push('3단계: 전사 통합 프로젝트 (4주)');
    } else {
      customizationSuggestions.push('대규모 조직의 체계적 AI 전환을 위한 단계적 접근');
      implementationPlan.push('1단계: 경영진 및 핵심 리더 전략 교육 (2주)');
      implementationPlan.push('2단계: 부서별 전문가 양성 교육 (8주)');
      implementationPlan.push('3단계: 전사 확산 및 문화 정착 (12주)');
    }

    // 특정 니즈에 따른 추가 커스터마이징
    specificNeeds.forEach(need => {
      switch (need) {
        case '자동화':
          customizationSuggestions.push('n8n, RPA 도구를 활용한 업무 자동화 집중 교육');
          break;
        case '데이터분석':
          customizationSuggestions.push('Python, 데이터 시각화를 통한 비즈니스 인사이트 도출');
          break;
        case '고객서비스':
          customizationSuggestions.push('AI 챗봇, 고객 분석을 통한 서비스 혁신');
          break;
        case '품질관리':
          customizationSuggestions.push('Computer Vision, 예측 모델링을 통한 품질 혁신');
          break;
      }
    });

    const totalHours = recommendedModules.reduce((sum, module) => {
      return sum + parseInt(module.duration.replace('시간', ''));
    }, 0);

    return {
      recommendedModules,
      customizationSuggestions,
      estimatedDuration: `${totalHours}시간 (${Math.ceil(totalHours / 8)}일)`,
      expectedROI: calculateExpectedROI(currentAIMaturity, companySize),
      implementationPlan
    };
  };

  const createDefaultRecommendation = (): CurriculumRecommendation => {
    return {
      recommendedModules: [],
      customizationSuggestions: ['해당 업종에 대한 맞춤형 커리큘럼을 준비 중입니다.'],
      estimatedDuration: '상담 후 결정',
      expectedROI: '상담 후 산정',
      implementationPlan: ['1:1 상담을 통한 맞춤형 계획 수립']
    };
  };

  const calculateExpectedROI = (maturity: number, size: string): string => {
    let baseROI = 200;
    
    // AI 성숙도에 따른 조정
    if (maturity < 30) baseROI = 300;
    else if (maturity < 70) baseROI = 250;
    else baseROI = 200;

    // 회사 규모에 따른 조정
    if (size === 'large') baseROI += 100;
    else if (size === 'medium') baseROI += 50;

    return `${baseROI}% (6개월 내)`;
  };

  const getMaturityLevel = (maturity: number): { label: string; color: string } => {
    if (maturity < 30) return { label: '초기', color: 'text-red-600' };
    if (maturity < 70) return { label: '성장', color: 'text-yellow-600' };
    return { label: '성숙', color: 'text-green-600' };
  };

  const maturityLevel = getMaturityLevel(currentAIMaturity);

  if (isGenerating) {
    return (
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-blue-600 animate-pulse" />
            <span>AI 커리큘럼 분석 중...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{progress}%</div>
              <Progress value={progress} className="w-full h-2" />
            </div>
            <div className="text-sm text-gray-600 text-center">
              {progress < 30 && "업종별 특성 분석 중..."}
              {progress >= 30 && progress < 60 && "AI 성숙도 평가 중..."}
              {progress >= 60 && progress < 90 && "맞춤형 커리큘럼 생성 중..."}
              {progress >= 90 && "최종 추천안 완성 중..."}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendation) return null;

  return (
    <div className="space-y-6">
      {/* 추천 개요 */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Target className="w-6 h-6" />
            <span>맞춤형 커리큘럼 추천</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">현재 수준</span>
              </div>
              <div className={`text-lg font-bold ${maturityLevel.color}`}>
                {maturityLevel.label}
              </div>
              <div className="text-sm text-gray-600">AI 성숙도 {currentAIMaturity}%</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">교육 기간</span>
              </div>
              <div className="text-lg font-bold text-orange-600">
                {recommendation.estimatedDuration}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">예상 ROI</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                {recommendation.expectedROI}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">추천 모듈</span>
              </div>
              <div className="text-lg font-bold text-purple-600">
                {recommendation.recommendedModules.length}개
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 추천 모듈 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>추천 교육 모듈</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendation.recommendedModules.map((module, index) => (
              <div key={module.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-1">{module.title}</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{module.duration}</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {module.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{module.description}</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">
                    {module.expectedOutcomes[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 커스터마이징 제안 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <span>맞춤형 커스터마이징 제안</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendation.customizationSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{suggestion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 구현 계획 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span>단계별 구현 계획</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendation.implementationPlan.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700">{step}</p>
                </div>
                {index < recommendation.implementationPlan.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-400 mt-1" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">맞춤형 AI 교육 프로그램 시작하기</h3>
          <p className="text-blue-100 mb-6">
            전문 컨설턴트와 함께 귀하의 조직에 최적화된 AI 교육 계획을 수립하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              무료 상담 신청
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              교육 자료 다운로드
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

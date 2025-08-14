'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  Mail, 
  TrendingUp, 
  Target, 
  AlertCircle,
  CheckCircle,
  ChevronRight,
  BarChart3,
  Brain,
  Lightbulb,
  ArrowUpRight,
  Building2,
  Users,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DiagnosisResult {
  totalScore: number;
  grade: string;
  categoryScores: {
    businessFoundation: number;
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    description: string;
    impact: string;
    timeframe: string;
  }[];
  industryBenchmark: number;
  reportUrl?: string;
}

export default function DiagnosisResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 세션 스토리지에서 결과 데이터 가져오기
    const storedResult = sessionStorage.getItem('diagnosisResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    // 더미 데이터로 테스트
    result = {
      totalScore: 68,
      grade: 'B',
      categoryScores: {
        businessFoundation: 72,
        currentAI: 45,
        organizationReadiness: 65,
        techInfrastructure: 58,
        goalClarity: 78,
        executionCapability: 70
      },
      strengths: [
        "명확한 사업 목표와 전략 보유",
        "경영진의 AI 도입 의지가 강함",
        "조직의 변화 수용성이 높음"
      ],
      weaknesses: [
        "현재 AI 활용도가 매우 낮음",
        "기술 인프라 현대화 필요",
        "AI 전문 인력 부족"
      ],
      recommendations: [
        {
          priority: 'HIGH',
          title: "AI 파일럿 프로젝트 즉시 시작",
          description: "고객 서비스 챗봇 또는 마케팅 자동화 도구 도입으로 빠른 성과 창출",
          impact: "3개월 내 업무 효율성 30% 향상",
          timeframe: "1-3개월"
        },
        {
          priority: 'HIGH',
          title: "전직원 AI 기초 교육 실시",
          description: "ChatGPT, Claude 등 생성형 AI 도구 활용법 교육",
          impact: "직원 생산성 20% 향상",
          timeframe: "1개월"
        },
        {
          priority: 'MEDIUM',
          title: "클라우드 인프라 전환",
          description: "AWS, Azure 등 클라우드 서비스로 단계적 마이그레이션",
          impact: "IT 비용 25% 절감, AI 도입 기반 마련",
          timeframe: "3-6개월"
        }
      ],
      industryBenchmark: 75
    };
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'S': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'B': return 'bg-green-100 text-green-800 border-green-300';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'D': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const categoryLabels = {
    businessFoundation: '사업 기반',
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfrastructure: '기술 인프라',
    goalClarity: '목표 명확성',
    executionCapability: '실행 역량'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 맥킨지 스타일 헤더 */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">AI 역량진단 결과 보고서</h1>
                <p className="text-slate-300">McKinsey-Style Executive Summary</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Report Date</p>
                <p className="text-lg font-semibold">{new Date().toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 border-2 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl flex items-center">
                <BarChart3 className="mr-3" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* 종합 점수 */}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${result.totalScore * 3.51} 351.86`}
                        className="text-blue-600"
                      />
                    </svg>
                    <span className="absolute text-3xl font-bold">{result.totalScore}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">종합 점수</h3>
                  <Badge className={`text-lg px-4 py-2 ${getGradeColor(result.grade)}`}>
                    {result.grade}등급
                  </Badge>
                </div>

                {/* 업계 대비 */}
                <div className="text-center">
                  <div className="mb-4">
                    <Building2 className="w-16 h-16 mx-auto text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">업계 평균 대비</h3>
                  <div className="flex items-center justify-center space-x-2">
                    {result.totalScore > result.industryBenchmark ? (
                      <>
                        <ArrowUpRight className="text-green-600" />
                        <span className="text-2xl font-bold text-green-600">
                          +{result.totalScore - result.industryBenchmark}점
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="text-red-600 transform rotate-90" />
                        <span className="text-2xl font-bold text-red-600">
                          -{result.industryBenchmark - result.totalScore}점
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">업계 평균: {result.industryBenchmark}점</p>
                </div>

                {/* AI 성숙도 */}
                <div className="text-center">
                  <div className="mb-4">
                    <Brain className="w-16 h-16 mx-auto text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI 성숙도 단계</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.grade === 'S' ? 'AI 선도' :
                     result.grade === 'A' ? 'AI 활용' :
                     result.grade === 'B' ? 'AI 성장' :
                     result.grade === 'C' ? 'AI 도입' : 'AI 준비'}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">디지털 전환 준비 완료</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 카테고리별 분석 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Target className="mr-2" />
                카테고리별 상세 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(result.categoryScores).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{categoryLabels[key as keyof typeof categoryLabels]}</span>
                      <span className="text-sm font-bold">{score}점</span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 강점과 개선점 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full shadow-lg border-l-4 border-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-green-700">
                  <CheckCircle className="mr-2" />
                  핵심 강점
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full shadow-lg border-l-4 border-orange-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-orange-700">
                  <AlertCircle className="mr-2" />
                  개선 필요 영역
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 실행 권고사항 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="mr-2" />
                전략적 실행 권고사항
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg flex items-center">
                        <ChevronRight className="mr-1" />
                        {rec.title}
                      </h4>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority === 'HIGH' ? '최우선' :
                         rec.priority === 'MEDIUM' ? '중요' : '권장'}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{rec.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                        <span><strong>기대효과:</strong> {rec.impact}</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2 text-blue-600" />
                        <span><strong>실행기간:</strong> {rec.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 액션 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center space-x-4"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2" />
            PDF 보고서 다운로드
          </Button>
          <Button size="lg" variant="outline">
            <Mail className="mr-2" />
            이메일로 재발송
          </Button>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Users className="mr-2" />
            전문가 상담 신청
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

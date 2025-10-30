'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Zap,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DiagnosisResult {
  totalScore: number;
  grade: string;
  categoryScores: {
    [key: string]: number;
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendations: string[];
  companyInfo: {
    companyName: string;
    industry: string;
    employeeCount: number;
    contactName: string;
    email: string;
  };
  maturityLevel?: string;
  percentile?: number;
}

export default function DiagnosisResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedResult = sessionStorage.getItem('diagnosisResult');
    
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        
        // 진단 결과가 최근 것인지 확인 (1시간 이내)
        const resultTimestamp = parsedResult.timestamp || parsedResult.createdAt;
        if (resultTimestamp) {
          const resultTime = new Date(resultTimestamp).getTime();
          const currentTime = Date.now();
          const oneHour = 60 * 60 * 1000; // 1시간
          
          if (currentTime - resultTime < oneHour) {
            setResult(parsedResult);
            setHasValidSession(true);
          } else {
            console.log('⚠️ 진단 결과가 만료됨 (1시간 초과)');
            sessionStorage.removeItem('diagnosisResult');
            setHasValidSession(false);
          }
        } else {
          // 타임스탬프가 없는 경우 유효한 것으로 간주 (기존 호환성)
          setResult(parsedResult);
          setHasValidSession(true);
        }
      } catch (error) {
        console.error('❌ 저장된 진단 결과 파싱 오류:', error);
        sessionStorage.removeItem('diagnosisResult');
        setHasValidSession(false);
      }
    } else {
      // 세션에 저장된 진단 결과가 없는 경우
      console.log('⚠️ 세션에 저장된 진단 결과가 없음');
      setHasValidSession(false);
    }
    
    setIsLoading(false);
  }, [router]);

  // 유효한 세션이 없는 경우 진단 시작 페이지로 안내
  if (!isLoading && !hasValidSession) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <Card className="w-full max-w-md border-orange-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                진단 결과를 찾을 수 없습니다
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                진단을 완료하지 않았거나 세션이 만료되었습니다.<br />
                새로운 진단을 시작하거나 진단ID로 결과를 조회하세요.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/ai-diagnosis')}>
                  <Brain className="w-4 h-4 mr-2" />
                  새 진단 시작
                </Button>
                <Button
                  onClick={() => router.push('/report-access')}
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  진단ID로 조회
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">보고서를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">진단 결과를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">
              진단을 다시 실행하거나 관리자에게 문의해주세요.
            </p>
            <Button onClick={() => router.push('/ai-diagnosis')}>
              새로운 진단 시작
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCategoryLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
      businessFoundation: '사업 기반',
      currentAI: '현재 AI 활용',
      organizationReadiness: '조직 준비도',
      techInfrastructure: '기술 인프라',
      goalClarity: '목표 명확성',
      executionCapability: '실행 역량'
    };
    return labels[key] || key;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">
              AI 역량진단 결과
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {result.companyInfo.companyName}의 AI 전환 진단 결과
          </p>
        </motion.div>

        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 bg-gray-900 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.totalScore}</div>
                  <div className="text-blue-100">총점</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.grade}</div>
                  <div className="text-blue-100">등급</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">상위 {100 - (result.percentile || 50)}%</div>
                  <div className="text-blue-100">업계 순위</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.maturityLevel || 'AI Adopter'}</div>
                  <div className="text-blue-100">성숙도</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                카테고리별 상세 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(result.categoryScores).map(([key, score], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        {getCategoryLabel(key)}
                      </span>
                      <span className={`font-bold text-lg ${getScoreColor(score)}`}>
                        {score}점
                      </span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SWOT Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-orange-600" />
                SWOT 전략 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      강점 (Strengths)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      기회 (Opportunities)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-1">•</span>
                          <span>{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                    <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      약점 (Weaknesses)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-600 mr-1">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      위협 (Threats)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.threats.map((threat, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-600 mr-1">•</span>
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gray-900 text-white">
            <CardContent className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4">
                🚀 AI 혁신의 여정을 시작하세요!
              </h2>
              <p className="text-lg mb-6 text-purple-100">
                {result.companyInfo.companyName}의 AI 전환을 위한 맞춤형 로드맵이 준비되었습니다.
                지금 바로 AICAMP와 함께 미래를 만들어가세요.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => router.push('/consultation')} className="bg-white text-gray-900 hover:bg-gray-100">
                  📞 전문가 상담 신청
                </Button>
                <Button
                  onClick={() => router.push('/report-access')}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  📧 상세 보고서 조회
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
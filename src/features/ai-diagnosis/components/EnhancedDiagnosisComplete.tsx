'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Share2, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award,
  Clock,
  Users,
  Building,
  Zap,
  Star,
  ArrowRight,
  ExternalLink,
  Copy,
  Calendar,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface EnhancedDiagnosisCompleteProps {
  result: any;
}

const EnhancedDiagnosisComplete: React.FC<EnhancedDiagnosisCompleteProps> = ({ result }) => {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // 애니메이션 시퀀스
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 500),
      setTimeout(() => setAnimationStep(2), 1000),
      setTimeout(() => setAnimationStep(3), 1500),
      setTimeout(() => setShowDetails(true), 2000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // 점수에 따른 색상
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  // 성숙도 레벨에 따른 배지
  const getMaturityBadge = (level: string) => {
    const badges = {
      'Expert': { color: 'bg-purple-500', icon: '🚀' },
      'Advanced': { color: 'bg-green-500', icon: '⭐' },
      'Intermediate': { color: 'bg-blue-500', icon: '📈' },
      'Basic': { color: 'bg-yellow-500', icon: '📊' },
      'Beginner': { color: 'bg-gray-500', icon: '🌱' }
    };
    
    const badge = badges[level as keyof typeof badges] || badges.Basic;
    
    return (
      <Badge className={`${badge.color} text-white px-4 py-2 text-sm font-medium`}>
        {badge.icon} {level}
      </Badge>
    );
  };

  // 링크 복사
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "링크가 복사되었습니다",
      description: "진단 결과 링크를 공유할 수 있습니다",
    });
  };

  // 상담 신청
  const handleConsultation = () => {
    // 상담 신청 페이지로 이동
    window.open('/consultation', '_blank');
  };

  // 보고서 다운로드
  const handleDownload = () => {
    if (result.htmlReport) {
      const blob = new Blob([result.htmlReport], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AI역량진단보고서_${new Date().toISOString().split('T')[0]}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* 완료 헤더 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 AI 역량진단 완료!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            45문항 기반 정밀 분석이 완료되었습니다
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('ko-KR')}
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              {result.version || 'V12.0'}
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              GEMINI 2.5 Flash
            </div>
          </div>
        </motion.div>

        {/* 핵심 결과 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                종합 진단 결과
              </CardTitle>
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl font-bold text-blue-600">
                  {result.totalScore || result.enhancedScores?.totalScore || 0}점
                </div>
                {getMaturityBadge(result.maturityLevel || result.enhancedScores?.maturityLevel || 'Basic')}
              </div>
              <p className="text-gray-600 mt-2">
                상위 {100 - (result.percentile || result.enhancedScores?.percentile || 50)}% 수준
              </p>
            </CardHeader>
          </Card>
        </motion.div>

        {/* 카테고리별 점수 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationStep >= 2 ? 1 : 0, y: animationStep >= 2 ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6">📊 영역별 상세 점수</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.categoryScores || result.enhancedScores?.categoryScores ? 
              Object.entries(result.categoryScores || result.enhancedScores.categoryScores).map(([category, score]) => {
                const categoryNames: Record<string, { name: string; icon: any }> = {
                  businessFoundation: { name: '사업 기반', icon: <Building className="w-5 h-5" /> },
                  currentAI: { name: '현재 AI 활용', icon: <Zap className="w-5 h-5" /> },
                  organizationReadiness: { name: '조직 준비도', icon: <Users className="w-5 h-5" /> },
                  techInfrastructure: { name: '기술 인프라', icon: <BarChart3 className="w-5 h-5" /> },
                  goalClarity: { name: '목표 명확성', icon: <Target className="w-5 h-5" /> },
                  executionCapability: { name: '실행 역량', icon: <TrendingUp className="w-5 h-5" /> }
                };
                
                const categoryInfo = categoryNames[category] || { name: category, icon: <Star className="w-5 h-5" /> };
                
                return (
                  <Card key={category} className={`border-2 ${getScoreColor(score as number)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {categoryInfo.icon}
                          <span className="font-medium text-sm">{categoryInfo.name}</span>
                        </div>
                        <Badge variant="outline" className="font-bold">
                          {score}점
                        </Badge>
                      </div>
                      <Progress value={score as number} className="h-2" />
                    </CardContent>
                  </Card>
                );
              }) : null
            }
          </div>
        </motion.div>

        {/* 벤치마크 비교 */}
        {result.gapAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animationStep >= 3 ? 1 : 0, y: animationStep >= 3 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-center mb-6">🎯 벤치마크 비교</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {result.gapAnalysis.competitivePosition}
                  </div>
                  <p className="text-gray-600">경쟁 포지션</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold mb-2 ${
                    result.gapAnalysis.industryGap.total >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.gapAnalysis.industryGap.total > 0 ? '+' : ''}{result.gapAnalysis.industryGap.total}점
                  </div>
                  <p className="text-gray-600">업종 평균 대비</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold mb-2 ${
                    result.gapAnalysis.sizeGap.total >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.gapAnalysis.sizeGap.total > 0 ? '+' : ''}{result.gapAnalysis.sizeGap.total}점
                  </div>
                  <p className="text-gray-600">규모 평균 대비</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* 주요 인사이트 */}
        <AnimatePresence>
          {showDetails && result.detailedAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-center mb-6">💡 주요 인사이트</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      주요 강점
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.detailedAnalysis.strengths?.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-green-700">
                          <Star className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-orange-800 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      빠른 개선 영역
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.detailedAnalysis.quickWins?.map((win: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-orange-700">
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{win}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 액션 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-center mb-6">📋 다음 단계</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  보고서 다운로드
                </Button>
                
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  결과 공유
                </Button>
                
                <Button
                  onClick={handleConsultation}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  전문가 상담
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  홈으로 이동
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 추가 서비스 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">🚀 더 깊이 있는 분석이 필요하신가요?</h3>
              <p className="mb-6 opacity-90">
                AICAMP 전문가와 1:1 맞춤 컨설팅을 통해 구체적인 실행 계획을 수립하세요
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">무료 상담</h4>
                  <p className="text-sm opacity-80">30분 무료 전화 상담</p>
                </div>
                <div>
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">맞춤 전략</h4>
                  <p className="text-sm opacity-80">기업별 맞춤 AI 전략</p>
                </div>
                <div>
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">실행 지원</h4>
                  <p className="text-sm opacity-80">구현까지 전 과정 지원</p>
                </div>
              </div>
              
              <Button
                onClick={handleConsultation}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                전문가 상담 신청하기
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDiagnosisComplete;

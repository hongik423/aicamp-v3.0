'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3, 
  Target, 
  Zap,
  Award,
  TrendingUp,
  Shield,
  Brain,
  Rocket,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface EnhancedDiagnosisIntroProps {
  onStart: (data: any) => void;
}

const EnhancedDiagnosisIntro: React.FC<EnhancedDiagnosisIntroProps> = ({ onStart }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // 애니메이션 시퀀스
  useEffect(() => {
    const timer1 = setTimeout(() => setShowFeatures(true), 500);
    const timer2 = setTimeout(() => setIsReady(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // 핵심 특징
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "45문항 정밀 진단",
      description: "6개 영역 45문항으로 AI 역량을 정밀 분석",
      color: "bg-blue-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "업종별 벤치마크",
      description: "동일 업종/규모 기업 대비 경쟁력 분석",
      color: "bg-green-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "맞춤형 전략 수립",
      description: "SWOT 분석 기반 실행 가능한 전략 제시",
      color: "bg-purple-500"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "단계별 로드맵",
      description: "3단계 실행 로드맵과 투자 계획 제공",
      color: "bg-orange-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "전문가 수준 분석",
      description: "Ollama GPT-OSS 20B 온디바이스 심층 분석",
      color: "bg-red-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "완전 무료",
      description: "회원가입 없이 즉시 진단 가능",
      color: "bg-indigo-500"
    }
  ];

  // 진단 과정
  const process = [
    {
      step: 1,
      title: "기업 정보 입력",
      description: "기본 정보와 사업 현황",
      duration: "2분",
      icon: <Users className="w-5 h-5" />
    },
    {
      step: 2,
      title: "현재 상태 평가",
      description: "AI/디지털 활용 현황",
      duration: "3분",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      step: 3,
      title: "조직 준비도 진단",
      description: "변화 수용도와 역량",
      duration: "3분",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      step: 4,
      title: "기술 인프라 평가",
      description: "시스템과 보안 역량",
      duration: "2분",
      icon: <Zap className="w-5 h-5" />
    },
    {
      step: 5,
      title: "목표 및 전략 설정",
      description: "AI 도입 목표와 계획",
      duration: "3분",
      icon: <Target className="w-5 h-5" />
    },
    {
      step: 6,
      title: "결과 분석",
      description: "종합 분석 및 보고서",
      duration: "1분",
      icon: <Award className="w-5 h-5" />
    }
  ];

  // 시작하기
  const handleStart = () => {
    onStart({
      startTime: new Date().toISOString(),
      version: 'V12.0-ENHANCED-45QUESTIONS'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            최신 고도화 버전 V12.0
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI 역량진단 시스템
            <span className="text-blue-600"> PREMIUM</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            45문항 정밀 분석으로 귀사의 AI 도입 준비도를 종합 진단하고, 
            업종별 벤치마크 비교와 맞춤형 전략을 제공합니다
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              소요시간: 10-15분
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              회원가입 불필요
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              완전 무료
            </div>
          </div>
        </motion.div>

        {/* 핵심 특징 */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-center mb-8">🚀 핵심 특징</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 진단 과정 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8">📋 진단 과정</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="text-gray-400 mt-1">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* 진행 표시 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: currentStep >= index ? '100%' : '0%' }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 예상 결과 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">🎯 진단 완료 후 제공되는 결과</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold mb-2">종합 점수</h3>
                    <p className="text-sm opacity-90">6개 영역별 점수와 총점</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold mb-2">벤치마크 비교</h3>
                    <p className="text-sm opacity-90">업종/규모별 경쟁력 분석</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold mb-2">SWOT 전략</h3>
                    <p className="text-sm opacity-90">강점/약점 기반 전략</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold mb-2">실행 로드맵</h3>
                    <p className="text-sm opacity-90">3단계 구체적 실행계획</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 시작 버튼 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isReady ? 1 : 0.5, 
            scale: isReady ? 1 : 0.9 
          }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleStart}
            disabled={!isReady}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Play className="w-6 h-6 mr-2" />
            {isReady ? 'AI 역량진단 시작하기' : '준비 중...'}
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            * 진단 결과는 이메일로도 발송됩니다
          </p>
        </motion.div>

        {/* 신뢰성 지표 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">1,000+ 기업 진단 완료</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">평균 만족도 4.8/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-sm">AI 전문기관 인증</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDiagnosisIntro;

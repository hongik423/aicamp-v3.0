'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  FileText,
  Mail,
  BarChart3,
  Target,
  Lightbulb,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';

interface DiagnosisStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  startTime?: number;
  endTime?: number;
}

interface DiagnosisProgressModalProps {
  isOpen: boolean;
  onClose?: () => void;
  diagnosisId?: string;
  companyName?: string;
  email?: string;
  reportPassword?: string;
  onComplete?: (result: any) => void;
  onError?: (error: string) => void;
}

export default function DiagnosisProgressModal({ 
  isOpen,
  onClose, 
  diagnosisId,
  companyName = '귀하의 기업',
  email,
  reportPassword,
  onComplete,
  onError 
}: DiagnosisProgressModalProps) {
  const [steps, setSteps] = useState<DiagnosisStep[]>([
    {
      id: 'data-validation',
      name: '데이터 검증 및 전처리',
      description: '제출된 정보의 완성도와 유효성을 검증합니다',
      icon: CheckCircle2,
      estimatedTime: '30초',
      status: 'pending'
    },
    {
      id: 'gemini-analysis',
      name: 'GEMINI 2.5 Flash AI 분석',
      description: 'AI 역량 6분야 종합 평가 및 업종별 벤치마크 비교',
      icon: Brain,
      estimatedTime: '2-3분',
      status: 'pending'
    },
    {
      id: 'swot-analysis',
      name: 'SWOT 전략 분석',
      description: '강점/약점/기회/위협 요인 분석 및 전략 도출',
      icon: Target,
      estimatedTime: '1-2분',
      status: 'pending'
    },
    {
      id: 'report-generation',
      name: '맞춤형 보고서 생성',
      description: '실행 로드맵 및 개선방안 포함 종합 보고서 작성',
      icon: FileText,
      estimatedTime: '2-3분',
      status: 'pending'
    },
    {
      id: 'email-sending',
      name: '완성된 보고서 이메일 전송',
      description: 'PDF 형태의 최종 진단보고서 이메일 발송',
      icon: Mail,
      estimatedTime: '30-60초',
      status: 'pending'
    }
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState<number | null>(null);

  // 단계별 예상 시간 (초)
  const stepDurations = {
    'data-validation': 30,
    'gemini-analysis': 150, // 2.5분
    'swot-analysis': 90,    // 1.5분
    'report-generation': 150, // 2.5분
    'email-sending': 45     // 45초
  };

  useEffect(() => {
    if (isOpen && !startTime) {
      setStartTime(Date.now());
      const totalDuration = Object.values(stepDurations).reduce((sum, duration) => sum + duration, 0);
      setEstimatedCompletionTime(Date.now() + totalDuration * 1000);
      startDiagnosisProcess();
    }
  }, [isOpen, startTime]);

  const startDiagnosisProcess = async () => {
    console.log('🚀 진단 프로세스 시작');
    
    for (let i = 0; i < steps.length; i++) {
      await processStep(i);
    }
  };

  const processStep = async (stepIndex: number) => {
    const step = steps[stepIndex];
    const duration = stepDurations[step.id as keyof typeof stepDurations] * 1000;

    // 단계 시작
    setCurrentStepIndex(stepIndex);
    setSteps(prev => prev.map((s, index) => 
      index === stepIndex 
        ? { ...s, status: 'in-progress', startTime: Date.now() }
        : s
    ));

    console.log(`⏳ ${step.name} 시작`);

    try {
      // 실제 처리 시뮬레이션 (실제로는 API 호출)
      await new Promise((resolve, reject) => {
        const progressInterval = setInterval(() => {
          const elapsed = Date.now() - (steps[stepIndex].startTime || Date.now());
          const progress = Math.min(95, (elapsed / duration) * 100);
          
          setTotalProgress(prev => {
            const baseProgress = (stepIndex / steps.length) * 100;
            const currentStepProgress = (progress / 100) * (100 / steps.length);
            return Math.min(95, baseProgress + currentStepProgress);
          });
        }, 100);

        // 단계 완료 시뮬레이션
        setTimeout(() => {
          clearInterval(progressInterval);
          resolve(true);
        }, Math.random() * duration + duration * 0.5); // 랜덤한 완료 시간
      });

      // 단계 완료
      setSteps(prev => prev.map((s, index) => 
        index === stepIndex 
          ? { ...s, status: 'completed', endTime: Date.now() }
          : s
      ));

      console.log(`✅ ${step.name} 완료`);

      // 모든 단계 완료 시 결과 표시
      if (stepIndex === steps.length - 1) {
        setTotalProgress(100);
        console.log('🎉 모든 진단 단계 완료!');
        
        // 잠시 후 완료 콜백 호출
        setTimeout(() => {
          if (onComplete) {
            onComplete({
              success: true,
              message: 'AI 역량진단이 성공적으로 완료되었습니다.',
              totalTime: getElapsedTime(),
              steps: steps.map(s => ({ ...s, status: 'completed' }))
            });
          }
        }, 1000);
      }

    } catch (error) {
      console.error(`❌ ${step.name} 실패:`, error);
      
      setSteps(prev => prev.map((s, index) => 
        index === stepIndex 
          ? { ...s, status: 'error', endTime: Date.now() }
          : s
      ));

      if (onError) {
        onError(`${step.name} 처리 중 오류가 발생했습니다.`);
      }
      return;
    }
  };

  const getElapsedTime = () => {
    if (!startTime) return '0초';
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;
  };

  const getRemainingTime = () => {
    if (!estimatedCompletionTime) return '계산 중...';
    const remaining = Math.max(0, Math.floor((estimatedCompletionTime - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return minutes > 0 ? `약 ${minutes}분 ${seconds}초` : `약 ${seconds}초`;
  };

  const getCurrentStepIcon = (step: DiagnosisStep) => {
    const IconComponent = step.icon;
    
    if (step.status === 'completed') {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    } else if (step.status === 'in-progress') {
      return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />;
    } else if (step.status === 'error') {
      return <AlertCircle className="w-6 h-6 text-red-600" />;
    } else {
      return <IconComponent className="w-6 h-6 text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            🤖 {companyName} AI 역량 진단 분석 중
          </CardTitle>
          <p className="text-gray-600 text-lg mt-2">
            GEMINI 2.5 Flash AI가 귀하의 기업을 분석하고 있습니다
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 전체 진행률 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <Badge variant="outline" className="text-sm">
                {Math.round(totalProgress)}% 완료
              </Badge>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>경과 시간: {getElapsedTime()}</span>
              <span>남은 시간: {getRemainingTime()}</span>
            </div>
          </div>

          {/* 단계별 진행 상황 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">📊 단계별 진행 상황</h3>
            
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
                  step.status === 'completed' ? 'bg-green-50 border-green-200' :
                  step.status === 'in-progress' ? 'bg-blue-50 border-blue-200 shadow-md' :
                  step.status === 'error' ? 'bg-red-50 border-red-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getCurrentStepIcon(step)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium text-sm ${
                      step.status === 'completed' ? 'text-green-800' :
                      step.status === 'in-progress' ? 'text-blue-800' :
                      step.status === 'error' ? 'text-red-800' :
                      'text-gray-600'
                    }`}>
                      {step.name}
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      예상시간: {step.estimatedTime}
                    </span>
                  </div>
                  
                  <p className={`text-xs ${
                    step.status === 'completed' ? 'text-green-700' :
                    step.status === 'in-progress' ? 'text-blue-700' :
                    step.status === 'error' ? 'text-red-700' :
                    'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                  
                  {step.status === 'in-progress' && (
                                          <div className="mt-2">
                        <div className="h-1 bg-blue-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full animate-pulse w-3/5" />
                        </div>
                      </div>
                  )}
                  
                  {step.status === 'completed' && step.endTime && step.startTime && (
                    <div className="mt-1">
                      <span className="text-xs text-green-600">
                        ✅ 완료 ({Math.round((step.endTime - step.startTime) / 1000)}초 소요)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 주의사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">⏱️ 분석 시간 안내</p>
                <p>
                  고품질 AI 분석을 위해 총 <strong>5-8분</strong>이 소요될 수 있습니다.<br />
                  분석이 완료되면 등록하신 이메일로 상세한 보고서가 발송됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 현재 처리 중인 단계 하이라이트 */}
          {currentStepIndex < steps.length && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 animate-pulse" />
                <div>
                  <p className="font-medium">현재 진행 중</p>
                  <p className="text-blue-100 text-sm">
                    {steps[currentStepIndex]?.name} - {steps[currentStepIndex]?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
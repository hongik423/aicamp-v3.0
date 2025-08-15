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
import { useBannerStore } from '@/lib/stores/bannerStore';

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
  pollApiPath?: string; // 진행 상태/결과 조회 API 경로 (기본: /api/diagnosis-results/[id])
  pollIntervalMs?: number; // 폴링 주기
}

export default function DiagnosisProgressModal({ 
  isOpen,
  onClose, 
  diagnosisId,
  companyName = '귀하의 기업',
  email,
  reportPassword,
  onComplete,
  onError,
  pollApiPath = '/api/diagnosis-results/',
  pollIntervalMs = 15000
}: DiagnosisProgressModalProps) {
  const banner = useBannerStore();
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
  const [polling, setPolling] = useState(false);
  const [sseActive, setSseActive] = useState(false);

  const stepIdOrder: Array<DiagnosisStep['id']> = [
    'data-validation',
    'gemini-analysis',
    'swot-analysis',
    'report-generation',
    'email-sending',
  ];

  const computeTotalProgressFromSteps = (currentSteps: DiagnosisStep[]) => {
    const perStep = 100 / currentSteps.length;
    return currentSteps.reduce((acc, s) => {
      if (s.status === 'completed') return acc + perStep;
      if (s.status === 'in-progress') return acc + perStep * 0.6; // 가중치
      return acc;
    }, 0);
  };

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
      // 모달이 열리면 배너가 보장되도록 업데이트
      banner.update('🔄 진단이 진행 중입니다. 보고서 생성 및 이메일 발송 준비 중...', {
        subMessage: '완료되면 이메일로 자동 발송됩니다. 창을 닫으셔도 됩니다.',
        variant: 'info',
        progressPercent: 3,
        stepLabel: '데이터 검증'
      } as any);
    }
  }, [isOpen, startTime, banner]);

  // SSE 기반 실시간 진행 업데이트 (가능하면 폴링보다 우선 적용)
  useEffect(() => {
    if (!isOpen || !diagnosisId) return;
    if (typeof window === 'undefined' || typeof EventSource === 'undefined') return;

    let es: EventSource | null = null;
    try {
      es = new EventSource(`/api/diagnosis-progress?diagnosisId=${encodeURIComponent(diagnosisId)}`);
      setSseActive(true);

      const applySnapshot = (snapshot: any) => {
        if (!snapshot?.latestByStep) return;
        setSteps((prev) => {
          const updated = prev.map((s) => {
            const ev = snapshot.latestByStep[s.id as string];
            if (!ev) return s;
            const nextStatus = (ev.status as DiagnosisStep['status']) || s.status;
            const next: DiagnosisStep = { ...s, status: nextStatus };
            if (nextStatus === 'completed' && !next.endTime) next.endTime = Date.now();
            if (nextStatus === 'in-progress' && !next.startTime) next.startTime = Date.now();
            return next;
          });
          setTotalProgress(Math.min(100, computeTotalProgressFromSteps(updated)));
          // 배너 진행률/단계 업데이트
          const current = updated.find((u) => u.status === 'in-progress') || updated.find((u) => u.status !== 'pending');
          banner.update('🔄 AI 역량진단 진행 중', {
            subMessage: snapshot?.events?.slice(-1)?.[0]?.message || 'GEMINI 분석 및 보고서 생성 중',
            variant: 'info',
            progressPercent: Math.min(100, computeTotalProgressFromSteps(updated)),
            stepLabel: current?.name || '진행 중'
          } as any);
          return updated;
        });
      };

      es.addEventListener('started', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          if (data?.snapshot) applySnapshot(data.snapshot);
        } catch {}
      });

      es.addEventListener('progress', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          if (data?.snapshot) applySnapshot(data.snapshot);
        } catch {}
      });

      es.addEventListener('done', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed', endTime: s.endTime ?? Date.now() })));
          setTotalProgress(100);
          banner.update('✅ AI 역량진단이 완료되어 상세 보고서가 이메일로 발송되었습니다.', {
            subMessage: '1차 접수확인 메일에 이어 2차 완성 보고서를 받으실 수 있습니다. 이용해 주셔서 감사합니다.',
            variant: 'success',
            progressPercent: 100,
            stepLabel: '이메일 발송 완료'
          } as any);
          if (onComplete) onComplete({ success: true, diagnosisId, ...data });
        } catch {}
      });

      es.addEventListener('timeout', () => {
        // 시간 초과 시에도 진행 모달은 남기고 이메일 안내 유지
        banner.update('⏰ 진단이 계속 진행 중입니다.', {
          subMessage: '최대 15분까지 소요될 수 있습니다. 완료 시 이메일 발송됩니다.',
          variant: 'warning',
        });
      });

      es.onerror = () => {
        setSseActive(false);
        try { es?.close(); } catch {}
      };
    } catch {
      setSseActive(false);
      try { es?.close(); } catch {}
    }

    return () => {
      setSseActive(false);
      try { es?.close(); } catch {}
    };
  }, [isOpen, diagnosisId, onComplete]);

  // 결과 폴링 시작
  useEffect(() => {
    // SSE가 활성화되면 폴링 생략
    if (!isOpen || !diagnosisId || polling || sseActive) return;
    setPolling(true);

    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`${pollApiPath}${diagnosisId}`);
        const data = await res.json();

        if (res.ok && data?.success) {
          // 모든 단계 완료 처리
          setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed', endTime: s.endTime ?? Date.now() })));
          setTotalProgress(100);

          // 배너 성공 안내 유지 (자동 숨김 제거)
          banner.update('✅ 진단 보고서가 완성되어 이메일로 전송되었습니다.', {
            subMessage: '이 창은 닫으셔도 됩니다. 이용해 주셔서 감사합니다.',
            variant: 'success',
            progressPercent: 100,
            stepLabel: '이메일 발송 완료'
          } as any);

          // 완료 콜백
          if (onComplete) {
            onComplete({ success: true, diagnosisId, ...data });
          }

          clearInterval(intervalId);
          setPolling(false);
        }
      } catch (e) {
        // 네트워크 오류는 무시하고 다음 주기에 재시도
      }
    }, Math.max(5000, pollIntervalMs));

    return () => {
      clearInterval(intervalId);
      setPolling(false);
    };
  }, [isOpen, diagnosisId, pollApiPath, pollIntervalMs, polling, onComplete, sseActive, banner]);

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
      // 실제 처리 시뮬레이션 (SSE/폴링으로 실제 상태를 덮어씌움)
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
        }, Math.random() * duration + duration * 0.5); // 시각적 진행감 제공
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl text-gray-900 leading-tight">
            🤖 {companyName} AI 역량 진단 분석 중
          </CardTitle>
          <p className="text-gray-600 text-base sm:text-lg mt-2 leading-relaxed">
            GEMINI 2.5 Flash AI가 귀하의 기업을 분석하고 있습니다
          </p>
          
          {/* 진단 시작 안내 메시지 */}
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-green-800">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="font-semibold text-lg">
                ✅ 진단이 시작되었습니다!
              </p>
            </div>
            <p className="text-green-700 text-sm mt-2">
              <strong>약 10분 이상 소요될 수 있습니다.</strong> 잠시 다른 일을 보고 오셔도 됩니다.
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          {/* 전체 진행률 - 모바일 최적화 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-medium text-gray-700">전체 진행률</span>
              <Badge variant="outline" className="text-sm font-bold">
                {Math.round(totalProgress)}% 완료
              </Badge>
            </div>
            <Progress value={totalProgress} className="h-4" />
            <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
              <span>⏱️ 경과 시간: {getElapsedTime()}</span>
              <span>⏳ 남은 시간: {getRemainingTime()}</span>
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

                    {/* 주의사항 - 지속적 안내 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-2 text-yellow-900">⏱️ 분석 시간 안내</p>
                <div className="space-y-2">
                  <p className="font-medium">
                    🤖 <strong>고품질 AI 분석을 위해 약 10분 이상 소요됩니다.</strong>
                  </p>
                  <p className="text-yellow-700">
                    ✨ 잠시 다른 업무를 보시거나 창을 닫으셔도 괜찮습니다.<br />
                    📧 분석 완료 시 등록하신 이메일로 상세한 보고서를 발송해드립니다.
                  </p>
                  <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    💡 <strong>팁:</strong> GEMINI 2.5 Flash AI가 귀하의 기업 상황을 정밀 분석하여 맞춤형 전략을 수립하고 있습니다.
                  </div>
                </div>
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
          
          {/* 지속적 안내 메시지 - 항상 표시 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-lg p-4 shadow-sm">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-blue-800">
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
                <p className="font-bold text-lg">
                  🔄 진단이 진행 중입니다
                </p>
              </div>
              <div className="space-y-2 text-blue-700">
                <p className="font-semibold">
                  ⏰ <strong>약 10분 이상 소요될 수 있습니다</strong>
                </p>
                <p className="text-sm">
                  ✨ 잠시 다른 업무를 보시거나 창을 닫으셔도 괜찮습니다<br />
                  📧 분석 완료 시 등록하신 이메일로 결과를 발송해드립니다
                </p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 text-xs text-blue-800">
                <p className="font-medium">💡 현재 진행 중인 작업</p>
                <p>GEMINI 2.5 Flash AI가 귀하의 기업 데이터를 심층 분석하여<br />맞춤형 AI 역량 진단 보고서를 작성하고 있습니다.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
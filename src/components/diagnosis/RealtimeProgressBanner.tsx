'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Brain, Target, FileText, Mail, Loader2, AlertCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { progressTracker, DiagnosisProgressState } from '@/lib/utils/diagnosisProgressTracker';

interface ProgressStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  startTime?: number;
  endTime?: number;
}

interface RealtimeProgressBannerProps {
  isVisible: boolean;
  diagnosisId: string;
  companyName?: string;
  onComplete?: (result: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
  autoHideOnComplete?: boolean;
  autoHideDelay?: number;
}

const DIAGNOSIS_STEPS: ProgressStep[] = [
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
];

export default function RealtimeProgressBanner({
  isVisible,
  diagnosisId,
  companyName = '귀하의 기업',
  onComplete,
  onError,
  onClose,
  autoHideOnComplete = true,
  autoHideDelay = 8000
}: RealtimeProgressBannerProps) {
  const [progressState, setProgressState] = useState<DiagnosisProgressState | null>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 진행 상태 변경 리스너
  const handleProgressUpdate = useCallback((state: DiagnosisProgressState) => {
    setProgressState(state);
    setHasError(state.hasError);
    setErrorMessage(state.errorMessage || '');

    // 완료 시 콜백 호출
    if (state.isCompleted && onComplete) {
      onComplete({
        success: true,
        diagnosisId: state.diagnosisId,
        completed: true
      });
    }

    // 오류 시 콜백 호출
    if (state.hasError && onError) {
      onError({
        success: false,
        error: state.errorMessage || '알 수 없는 오류'
      });
    }
  }, [onComplete, onError]);

  // 진단 추적 시작
  useEffect(() => {
    if (isVisible && diagnosisId) {
      // 추적 시작
      const initialState = progressTracker.startTracking(diagnosisId, companyName);
      setProgressState(initialState);

      // 리스너 등록
      progressTracker.addListener(diagnosisId, handleProgressUpdate);

      return () => {
        // 리스너 제거
        progressTracker.removeListener(diagnosisId, handleProgressUpdate);
      };
    }
  }, [isVisible, diagnosisId, companyName, handleProgressUpdate]);

  // 자동 숨김 처리
  useEffect(() => {
    if (progressState?.isCompleted && autoHideOnComplete) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [progressState?.isCompleted, autoHideOnComplete, autoHideDelay, onClose]);

  // 진행 상태가 없으면 렌더링하지 않음
  if (!isVisible || !progressState) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b"
      >
        <Card className="rounded-none border-0 border-b">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {progressState.companyName} AI 역량진단 진행 중
                  </h3>
                  <p className="text-sm text-gray-600">
                    진단ID: {progressState.diagnosisId}
                  </p>
                </div>
              </div>
              
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* 전체 진행률 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  전체 진행률: {Math.round(progressState.overallProgress)}%
                </span>
                <Badge variant={hasError ? "destructive" : progressState.isCompleted ? "default" : "secondary"}>
                  {hasError ? "오류 발생" : progressState.isCompleted ? "완료" : "진행 중"}
                </Badge>
              </div>
              <Progress value={progressState.overallProgress} className="h-2" />
            </div>

            {/* 오류 메시지 */}
            {hasError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{errorMessage}</span>
                </div>
              </motion.div>
            )}

            {/* 단계별 진행 상황 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {progressState.steps.map((step, index) => {
                const Icon = step.id === 'data-validation' ? CheckCircle2 :
                           step.id === 'gemini-analysis' ? Brain :
                           step.id === 'swot-analysis' ? Target :
                           step.id === 'report-generation' ? FileText : Mail;
                
                const isActive = step.status === 'in-progress';
                const isCompleted = step.status === 'completed';
                const isError = step.status === 'error';
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      isError ? 'bg-red-50 border-red-200' :
                      isCompleted ? 'bg-green-50 border-green-200' :
                      isActive ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {isActive ? (
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                      ) : isError ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <Icon className={`w-4 h-4 ${
                          isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      )}
                      <span className={`text-xs font-medium ${
                        isError ? 'text-red-600' :
                        isCompleted ? 'text-green-600' :
                        isActive ? 'text-blue-600' :
                        'text-gray-500'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      {step.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      예상 시간: {step.estimatedTime}
                    </p>
                    {step.progress !== undefined && step.progress > 0 && (
                      <div className="mt-2">
                        <Progress value={step.progress} className="h-1" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* 완료 메시지 */}
            {progressState.isCompleted && !hasError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    진단이 완료되어 이메일로 전송되었습니다!
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  이 창은 잠시 후 자동으로 닫힙니다. 이용해 주셔서 감사합니다.
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

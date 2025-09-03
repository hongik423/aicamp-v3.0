'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Brain, Target, FileText, Mail, Loader2, AlertCircle, X, Database, UserCheck } from 'lucide-react';
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
    name: '1단계: 데이터 검증',
    description: '제출된 45문항 응답의 완성도와 유효성을 실시간 검증합니다',
    icon: CheckCircle2,
    estimatedTime: '30초',
    status: 'pending'
  },
  {
    id: 'data-storage',
    name: '3단계: 데이터 저장',
    description: 'Google Sheets에 신청서가 자동으로 저장됩니다',
    icon: Database,
    estimatedTime: '즉시',
    status: 'pending'
  },
  {
    id: 'email-dispatch',
    name: '4단계: 신청자 확인 이메일',
    description: '신청자에게 접수 확인 이메일이 발송됩니다',
    icon: UserCheck,
    estimatedTime: '즉시',
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
  autoHideOnComplete = false, // 🔧 자동 숨김 비활성화 - 사용자가 수동으로 닫을 때까지 유지
  autoHideDelay = 0 // 완료 후에도 자동으로 사라지지 않음
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

  // 자동 숨김 처리 - 완전히 비활성화하여 지속 표시
  useEffect(() => {
    // autoHideOnComplete가 false이므로 자동 숨김 처리하지 않음
    // 사용자가 수동으로 닫을 때까지 배너가 지속적으로 표시됨
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
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                  <Brain className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900">
                    {progressState.companyName} AI 역량진단 진행 중
                  </h3>
                  <p className="text-xs text-gray-600 truncate max-w-[200px]">
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
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">
                  진행률: {Math.round(progressState.overallProgress)}%
                </span>
                <Badge variant={hasError ? "destructive" : progressState.isCompleted ? "default" : "secondary"} className="text-xs px-2 py-0">
                  {hasError ? "오류" : progressState.isCompleted ? "완료" : "진행 중"}
                </Badge>
              </div>
              <Progress value={progressState.overallProgress} className="h-1.5" />
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

            {/* 24시간 대기 안내 - 강화된 가시성 */}
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-blue-900 mb-1">
                    ⏰ 이교장 오프라인 분석 진행 중
                  </h4>
                  <p className="text-sm text-blue-800 mb-2">
                    제출된 45개 항목을 이교장이 직접 분석하여 맞춤형 진단보고서를 작성합니다.
                  </p>
                  <div className="text-xs text-blue-700 font-medium">
                    📅 예상 완료 시간: <span className="text-red-600 font-bold">24시간 이내</span> | 
                    📧 완료 시 이메일로 자동 발송됩니다
                  </div>
                </div>
              </div>
            </div>

            {/* 단계별 진행 상황 */}
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                📊 진단 진행 단계별 현황
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {progressState.steps.map((step, index) => {
                const Icon = step.id === 'data-validation' ? CheckCircle2 :
                           step.id === 'ollama-analysis' ? Brain :
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

            {/* 완료 메시지 - 24시간 대기 강조 */}
            {progressState.isCompleted && !hasError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-bold text-green-800">
                        ✅ 신청서 접수 완료!
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      신청서 제출 시 이미 개인정보 동의를 완료하셨습니다. 이제 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다.
                    </p>
                    <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
                      <strong>📧 다음 단계:</strong> 24시간 내에 상세한 AI 역량진단보고서가 이메일로 발송됩니다.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

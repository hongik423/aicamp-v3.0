'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle, Clock, FileText, Mail, Database, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface WaitingStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  estimatedTime?: string;
}

interface WaitingSystemModalProps {
  isOpen: boolean;
  diagnosisId: string;
  companyName: string;
  onComplete: (reportUrl: string) => void;
  onError: (error: string) => void;
}

const WaitingSystemModal: React.FC<WaitingSystemModalProps> = ({
  isOpen,
  diagnosisId,
  companyName,
  onComplete,
  onError
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(120);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const [steps, setSteps] = useState<WaitingStep[]>([
    {
      id: 'data-processing',
      label: '데이터 처리',
      description: '45문항 응답 데이터를 분석하고 있습니다',
      icon: <Database className="w-5 h-5" />,
      status: 'processing',
      progress: 0,
      estimatedTime: '30초'
    },
    {
      id: 'score-calculation',
      label: '점수 계산',
      description: '카테고리별 점수와 AI 성숙도를 계산하고 있습니다',
      icon: <Zap className="w-5 h-5" />,
      status: 'pending',
      progress: 0,
      estimatedTime: '45초'
    },
    {
      id: 'report-generation',
      label: '보고서 생성',
      description: '35페이지 맞춤형 AI 역량진단 보고서를 생성하고 있습니다',
      icon: <FileText className="w-5 h-5" />,
      status: 'pending',
      progress: 0,
      estimatedTime: '60초'
    },
    {
      id: 'email-sending',
      label: '이메일 발송',
      description: '진단 결과를 이메일로 발송하고 있습니다',
      icon: <Mail className="w-5 h-5" />,
      status: 'pending',
      progress: 0,
      estimatedTime: '15초'
    }
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 진행 상황 시뮬레이션 및 실제 API 호출
  useEffect(() => {
    if (!isOpen || !diagnosisId) return;

    let progressInterval: NodeJS.Timeout;
    let timeInterval: NodeJS.Timeout;
    let checkInterval: NodeJS.Timeout;

    const startProcessing = async () => {
      console.log('🚀 대기 시스템 시작:', { diagnosisId, companyName });

      // 진행 상황 시뮬레이션
      progressInterval = setInterval(() => {
        setSteps(prevSteps => {
          const newSteps = [...prevSteps];
          const currentStepIndex = newSteps.findIndex(step => step.status === 'processing');
          
          if (currentStepIndex >= 0) {
            newSteps[currentStepIndex].progress = Math.min(newSteps[currentStepIndex].progress + 5, 95);
            
            if (newSteps[currentStepIndex].progress >= 95) {
              newSteps[currentStepIndex].status = 'completed';
              newSteps[currentStepIndex].progress = 100;
              
              if (currentStepIndex < newSteps.length - 1) {
                newSteps[currentStepIndex + 1].status = 'processing';
                setCurrentStep(currentStepIndex + 1);
              }
            }
          }
          
          return newSteps;
        });

        setOverallProgress(prev => Math.min(prev + 2, 100));
      }, 800);

      timeInterval = setInterval(() => {
        setEstimatedTimeRemaining(prev => Math.max(prev - 1, 0));
      }, 1000);

      // 🚨 치명적 오류 수정: 보고서 생성 상태 1회만 확인 - 무한 재시도 차단
      let checkAttempts = 0;
      const maxCheckAttempts = 3; // 최대 3회만 확인
      
      checkInterval = setInterval(async () => {
        checkAttempts++;
        
        if (checkAttempts > maxCheckAttempts) {
          console.log('📋 보고서 준비 중 - 48시간 답변 메시지 표시');
          
          setSteps(prevSteps => prevSteps.map(step => ({
            ...step,
            status: 'completed',
            progress: 100
          })));
          
          setOverallProgress(100);
          
          // 48시간 답변 메시지와 함께 완료 처리
          setTimeout(() => {
            onComplete(`/diagnosis-results/${diagnosisId}?message=48hours`);
          }, 1000);
          
          clearInterval(progressInterval);
          clearInterval(timeInterval);
          clearInterval(checkInterval);
          return;
        }
        
        try {
          const checkResponse = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });

          if (checkResponse.ok) {
            const checkResult = await checkResponse.json();
            
            if (checkResult.success && checkResult.htmlReport) {
              console.log('✅ 보고서 생성 완료 확인!');
              
              setSteps(prevSteps => prevSteps.map(step => ({
                ...step,
                status: 'completed',
                progress: 100
              })));
              
              setOverallProgress(100);
              
              setTimeout(() => {
                onComplete(`/diagnosis-results/${diagnosisId}?from=waiting-system`);
              }, 1000);
              
              clearInterval(progressInterval);
              clearInterval(timeInterval);
              clearInterval(checkInterval);
            }
          } else {
            console.log(`📋 보고서 확인 시도 ${checkAttempts}/${maxCheckAttempts} - 준비 중`);
          }
        } catch (error) {
          console.log(`📋 보고서 상태 확인 오류 ${checkAttempts}/${maxCheckAttempts}:`, error);
        }
      }, 5000); // 5초 간격으로 확인
    };

    startProcessing();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (timeInterval) clearInterval(timeInterval);
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isOpen, diagnosisId, retryCount, onComplete]);

  const handleManualRetry = async () => {
    setIsRetrying(false);
    setRetryCount(0);
    setOverallProgress(50);
    
    try {
      const retryResponse = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (retryResponse.ok) {
        const retryResult = await retryResponse.json();
        if (retryResult.success && retryResult.htmlReport) {
          onComplete(`/diagnosis-results/${diagnosisId}?from=manual-retry`);
        }
      } else {
        throw new Error('보고서를 찾을 수 없습니다.');
      }
    } catch (error) {
      onError('보고서 생성에 실패했습니다. 관리자에게 문의해주세요.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              AI 역량진단 보고서 생성 중
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">{companyName}</span>님의 맞춤형 보고서를 준비하고 있습니다
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm text-gray-500">{overallProgress}% 완료</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-4 rounded-lg border ${
                  step.status === 'completed' 
                    ? 'bg-green-50 border-green-200' 
                    : step.status === 'processing'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : step.status === 'processing'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : step.status === 'processing' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{step.label}</h3>
                    {step.estimatedTime && step.status === 'processing' && (
                      <span className="text-xs text-gray-500">예상 {step.estimatedTime}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  
                  {step.status === 'processing' && (
                    <Progress value={step.progress} className="h-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">예상 완료 시간</span>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {formatTime(estimatedTimeRemaining)}
              </span>
            </div>
          </div>

          {isRetrying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-800">
                  보고서 생성이 예상보다 오래 걸리고 있습니다
                </span>
              </div>
              <p className="text-sm text-yellow-700 mb-4">
                시스템이 정상 작동 중이지만 처리 시간이 길어지고 있습니다. 
                수동으로 다시 시도하거나 잠시 더 기다려주세요.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleManualRetry}
                  variant="outline"
                  size="sm"
                  className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                >
                  수동 재시도
                </Button>
                <Button
                  onClick={() => setIsRetrying(false)}
                  variant="ghost"
                  size="sm"
                  className="text-yellow-700"
                >
                  계속 대기
                </Button>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">진단 ID</p>
            <p className="font-mono text-sm font-semibold text-gray-900 bg-white px-3 py-1 rounded border">
              {diagnosisId}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              이 ID로 언제든지 보고서에 접근할 수 있습니다
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              보고서 생성이 완료되면 자동으로 결과 페이지로 이동합니다.<br />
              <span className="font-semibold text-blue-600">창을 닫지 마시고 잠시만 기다려주세요.</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitingSystemModal;
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Mail, 
  Database, 
  Brain,
  FileText,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosisStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message?: string;
  estimatedTime?: string;
}

interface DiagnosisProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnosisId?: string;
  companyName?: string;
  email?: string;
  hasError?: boolean;
  errorMessage?: string;
  errorStep?: string;
}

export const DiagnosisProgressModal: React.FC<DiagnosisProgressModalProps> = ({
  isOpen,
  onClose,
  diagnosisId,
  companyName,
  email,
  hasError = false,
  errorMessage = '',
  errorStep = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const [steps, setSteps] = useState<DiagnosisStep[]>([
    {
      id: 'validation',
      title: '신청서 검증',
      description: '개인정보 동의 및 필수 정보 확인',
      icon: CheckCircle,
      status: 'pending',
      estimatedTime: '즉시'
    },
    {
      id: 'saving',
      title: '데이터 저장',
      description: '진단 신청 정보를 안전하게 저장',
      icon: Database,
      status: 'pending',
      estimatedTime: '1-2초'
    },
    {
      id: 'email_confirmation',
      title: '접수 확인 이메일',
      description: '신청 접수 확인 이메일 발송',
      icon: Mail,
      status: 'pending',
      estimatedTime: '2-3초'
    },
    {
      id: 'ai_analysis',
      title: 'AI 경영진단 분석',
      description: '이후경 교장의 AI 기반 맞춤 분석',
      icon: Brain,
      status: 'pending',
      estimatedTime: '3-5분'
    },
    {
      id: 'report_delivery',
      title: '결과보고서 전송',
      description: '완성된 진단 보고서 이메일 발송',
      icon: FileText,
      status: 'pending',
      estimatedTime: '1-2분'
    }
  ]);

  // 진행상황 처리 (오류 상태 포함)
  useEffect(() => {
    if (!isOpen) return;

    // 외부에서 오류가 전달된 경우
    if (hasError && errorStep) {
      const errorStepIndex = steps.findIndex(step => step.id === errorStep);
      if (errorStepIndex !== -1) {
        setSteps(prev => prev.map((step, index) => {
          if (index < errorStepIndex) {
            return { ...step, status: 'completed', message: getCompletionMessage(step.id) };
          } else if (index === errorStepIndex) {
            return { ...step, status: 'error', message: errorMessage };
          }
          return step;
        }));
        setCurrentStep(errorStepIndex);
        setOverallProgress(((errorStepIndex + 0.5) / steps.length) * 100);
        setInternalError(true);
        return;
      }
    }

    const simulateProgress = async () => {
      // 단계별 진행
      for (let i = 0; i < steps.length; i++) {
        // 현재 단계를 'processing'으로 변경
        setSteps(prev => prev.map((step, index) => 
          index === i 
            ? { ...step, status: 'processing' }
            : step
        ));
        setCurrentStep(i);
        setOverallProgress(((i + 0.5) / steps.length) * 100);

        // 각 단계별 처리 시간 시뮬레이션
        const processingTime = i === 0 ? 1000 : i === 1 ? 2000 : i === 2 ? 2000 : i === 3 ? 8000 : 3000;
        await new Promise(resolve => setTimeout(resolve, processingTime));

        // 현재 단계를 'completed'로 변경
        setSteps(prev => prev.map((step, index) => 
          index === i 
            ? { 
                ...step, 
                status: 'completed',
                message: getCompletionMessage(step.id)
              }
            : step
        ));
        setOverallProgress(((i + 1) / steps.length) * 100);

        // 마지막 단계 완료시
        if (i === steps.length - 1) {
          setIsCompleted(true);
        }
      }
    };

    simulateProgress();
  }, [isOpen, hasError, errorStep, errorMessage]);

  const getCompletionMessage = (stepId: string): string => {
    switch (stepId) {
      case 'validation':
        return '모든 필수 정보가 확인되었습니다';
      case 'saving':
        return `진단 ID: ${diagnosisId} 생성 완료`;
      case 'email_confirmation':
        return `${email}로 접수 확인 이메일이 발송되었습니다`;
      case 'ai_analysis':
        return '이후경 교장의 AI 분석이 완료되었습니다';
      case 'report_delivery':
        return '맞춤형 경영진단 보고서가 이메일로 전송되었습니다';
      default:
        return '완료되었습니다';
    }
  };

  const getStatusIcon = (status: DiagnosisStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DiagnosisStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'processing':
        return 'bg-blue-50 border-blue-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                AI 경영진단 신청 진행상황
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">
                {companyName}의 진단 신청이 처리되고 있습니다
              </DialogDescription>
            </div>
            {isCompleted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 전체 진행률 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm text-gray-500">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          {/* 단계별 진행상황 */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${getStatusColor(step.status)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <span className="text-xs text-gray-500">
                        예상시간: {step.estimatedTime}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    
                    {step.message && (
                      <div className="bg-white/50 rounded-md p-2 mt-2">
                        <p className="text-sm text-gray-700">{step.message}</p>
                      </div>
                    )}

                    {step.status === 'processing' && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-xs text-blue-600 font-medium">처리중...</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 오류 안내 */}
          <AnimatePresence>
            {(hasError || internalError) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6"
              >
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ❌ 진단 신청 중 오류가 발생했습니다
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {errorMessage || '일시적인 서버 오류로 인해 진단 신청이 완료되지 않았습니다.'}
                  </p>
                  
                  <div className="bg-white/70 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🔧 해결방법</h4>
                    <div className="text-sm text-gray-600 space-y-2 text-left">
                      <p>1. <strong>잠시 후 다시 시도:</strong> 서버가 일시적으로 바쁠 수 있습니다</p>
                      <p>2. <strong>입력 정보 확인:</strong> 이메일 주소와 필수 정보를 다시 확인해주세요</p>
                      <p>3. <strong>브라우저 새로고침:</strong> 페이지를 새로고침 후 재시도해주세요</p>
                      <p>4. <strong>고객센터 문의:</strong> 문제가 지속되면 고객센터로 연락주세요</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📞 고객지원</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>이메일:</strong> support@aicamp.kr</p>
                      <p><strong>전화:</strong> 1588-1234</p>
                      <p><strong>운영시간:</strong> 평일 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button 
                      onClick={onClose}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      닫기
                    </Button>
                    <Button 
                      onClick={() => window.location.reload()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      다시 시도
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 완료 안내 */}
          <AnimatePresence>
            {isCompleted && !hasError && !internalError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6"
              >
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    🎉 진단 신청이 완료되었습니다!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    이후경 교장의 맞춤형 AI 경영진단 보고서가 <br />
                    <strong className="text-blue-600">{email}</strong>로 발송되었습니다.
                  </p>
                  
                  <div className="bg-white/70 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">📋 진단 정보</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>진단 ID:</strong> {diagnosisId}</p>
                      <p><strong>기업명:</strong> {companyName}</p>
                      <p><strong>이메일:</strong> {email}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📧 결과보고서 전달방식</h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p>• <strong>이메일 발송:</strong> 신청하신 이메일로 PDF 보고서 전송</p>
                      <p>• <strong>내용:</strong> AI 역량 분석, SWOT 분석, 개선방안, 로드맵</p>
                      <p>• <strong>후속지원:</strong> 전문가 상담 및 교육과정 안내</p>
                    </div>
                  </div>

                  <Button 
                    onClick={onClose}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    확인 완료
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 주의사항 */}
          {!isCompleted && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">안내사항</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 진단 과정을 중단하지 마세요</li>
                    <li>• 이메일이 오지 않으면 스팸함을 확인해주세요</li>
                    <li>• 문의사항은 고객센터로 연락주세요</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosisProgressModal;
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle,
  ArrowRight,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressGuideStepsProps {
  currentStep: 'basic' | 'assessment' | 'additional';
  validationStatus: {
    email: boolean;
    phone: boolean;
    address: boolean;
    basicInfo: boolean;
  };
  className?: string;
}

export function ProgressGuideSteps({ 
  currentStep, 
  validationStatus, 
  className 
}: ProgressGuideStepsProps) {
  const steps = [
    {
      id: 'basic',
      title: '기본 정보 입력',
      description: '연락처 및 회사 정보 입력',
      icon: User,
      substeps: [
        { id: 'company', title: '회사명', icon: User, completed: validationStatus.basicInfo },
        { id: 'email', title: '이메일 검증', icon: Mail, completed: validationStatus.email },
        { id: 'phone', title: '전화번호 검증', icon: Phone, completed: validationStatus.phone },
        { id: 'address', title: '주소 검증', icon: MapPin, completed: validationStatus.address }
      ]
    },
    {
      id: 'assessment',
      title: '45문항 진단',
      description: 'AI 역량 평가 질문 응답',
      icon: FileText,
      substeps: []
    },
    {
      id: 'additional',
      title: '추가 정보',
      description: '예산 및 우선순위 설정',
      icon: BarChart3,
      substeps: []
    }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const isStepCompleted = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    return stepIndex < getCurrentStepIndex();
  };

  const isStepCurrent = (stepId: string) => {
    return stepId === currentStep;
  };

  const getStepStatus = (stepId: string) => {
    if (isStepCompleted(stepId)) return 'completed';
    if (isStepCurrent(stepId)) return 'current';
    return 'pending';
  };

  return (
    <Card className={cn('border-gray-200', className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-sm text-gray-900">진단 진행 단계</h3>
          <Badge variant="secondary" className="text-xs">
            {getCurrentStepIndex() + 1} / {steps.length}
          </Badge>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const status = getStepStatus(step.id);
            
            return (
              <div key={step.id} className="relative">
                {/* 연결선 */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200"></div>
                )}
                
                <div className={cn(
                  'flex items-start gap-3 p-3 rounded-lg transition-all',
                  status === 'current' && 'bg-blue-50 border border-blue-200',
                  status === 'completed' && 'bg-green-50 border border-green-200',
                  status === 'pending' && 'bg-gray-50'
                )}>
                  {/* 단계 아이콘 */}
                  <div className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2',
                    status === 'completed' && 'bg-green-500 border-green-500 text-white',
                    status === 'current' && 'bg-blue-500 border-blue-500 text-white',
                    status === 'pending' && 'bg-white border-gray-300 text-gray-400'
                  )}>
                    {status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn(
                        'font-medium text-sm',
                        status === 'current' && 'text-blue-900',
                        status === 'completed' && 'text-green-900',
                        status === 'pending' && 'text-gray-500'
                      )}>
                        {step.title}
                      </h4>
                      {status === 'current' && (
                        <Badge variant="default" className="text-xs">
                          진행 중
                        </Badge>
                      )}
                      {status === 'completed' && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          완료
                        </Badge>
                      )}
                    </div>
                    
                    <p className={cn(
                      'text-xs mb-2',
                      status === 'current' && 'text-blue-700',
                      status === 'completed' && 'text-green-700',
                      status === 'pending' && 'text-gray-500'
                    )}>
                      {step.description}
                    </p>

                    {/* 하위 단계 (기본 정보 단계에만 표시) */}
                    {step.id === 'basic' && status === 'current' && (
                      <div className="space-y-2">
                        {step.substeps.map((substep) => {
                          const SubstepIcon = substep.icon;
                          return (
                            <div key={substep.id} className="flex items-center gap-2">
                              <div className={cn(
                                'flex items-center justify-center w-6 h-6 rounded-full border',
                                substep.completed 
                                  ? 'bg-green-500 border-green-500 text-white' 
                                  : 'bg-white border-gray-300 text-gray-400'
                              )}>
                                {substep.completed ? (
                                  <CheckCircle2 className="h-3 w-3" />
                                ) : (
                                  <Circle className="h-3 w-3" />
                                )}
                              </div>
                              <span className={cn(
                                'text-xs',
                                substep.completed ? 'text-green-700' : 'text-gray-600'
                              )}>
                                {substep.title}
                              </span>
                              {substep.completed && (
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 현재 단계 가이드 메시지 */}
                    {status === 'current' && (
                      <div className="mt-3 p-2 bg-white rounded border border-blue-200">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-blue-900 mb-1">
                              현재 단계 가이드
                            </p>
                            <p className="text-xs text-blue-700">
                              {getStepGuideMessage(step.id, validationStatus)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 전체 진행률 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>전체 진행률</span>
            <span>{Math.round(((getCurrentStepIndex()) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={cn(
                "bg-blue-500 h-2 rounded-full transition-all duration-300",
                getCurrentStepIndex() === 0 && "w-0",
                getCurrentStepIndex() === 1 && "w-1/3",
                getCurrentStepIndex() === 2 && "w-2/3",
                getCurrentStepIndex() >= 3 && "w-full"
              )}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 단계별 가이드 메시지
function getStepGuideMessage(stepId: string, validationStatus: any): string {
  switch (stepId) {
    case 'basic':
      if (!validationStatus.basicInfo) {
        return '회사명과 담당자명을 입력해주세요.';
      }
      if (!validationStatus.email) {
        return '이메일 주소를 정확히 입력하고 검증을 완료해주세요. 비즈니스 이메일을 권장합니다.';
      }
      if (!validationStatus.phone) {
        return '전화번호를 올바른 형식으로 입력해주세요. 휴대폰 번호(010-****-****)를 권장합니다.';
      }
      if (!validationStatus.address) {
        return '주소를 정확히 입력해주세요. 시/도, 시/군/구, 읍/면/동까지 모두 입력해야 합니다.';
      }
      return '모든 기본 정보가 검증되었습니다. 다음 단계로 진행해주세요.';
      
    case 'assessment':
      return '45개 문항에 정확히 응답해주세요. 각 문항은 1-5점 척도로 평가됩니다.';
      
    case 'additional':
      return '예산 정보와 우선순위를 설정하여 맞춤형 진단 결과를 받아보세요.';
      
    default:
      return '';
  }
}

export default ProgressGuideSteps;

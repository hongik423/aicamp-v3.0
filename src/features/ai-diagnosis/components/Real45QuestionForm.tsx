'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, RotateCcw, Save, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { REAL_45_QUESTIONS, RealQuestion } from '../constants/real-45-questions';
import { getQuestionBehaviorIndicators } from '../constants/question-specific-behavior-indicators';
import { AddressInput } from '@/components/ui/address-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { EmailInput } from '@/components/ui/email-input';
// import EnhancedDiagnosisComplete from './EnhancedDiagnosisComplete'; // 삭제된 컴포넌트

interface CompanyInfo {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  industryCustom?: string;
  employeeCount: string;
  annualRevenue: string;
  location: string;
}

interface FormState {
  companyInfo: CompanyInfo;
  answers: Record<number, number>; // questionId -> score
  currentQuestion: number;
  isCompleted: boolean;
}

interface DiagnosisResult {
  success: boolean;
  diagnosisId?: string;
  totalScore?: number;
  enhancedScores?: any;
  error?: string;
}

const Real45QuestionForm: React.FC = () => {
  const { toast } = useToast();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    companyInfo: {
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      industry: '',
      employeeCount: '',
      annualRevenue: '',
      location: ''
    },
    answers: {},
    currentQuestion: -1, // -1 = 기업정보 입력, 0-44 = 질문
    isCompleted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(true);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [persistentNoticeOpen, setPersistentNoticeOpen] = useState(false);
  const [showProgressGuide, setShowProgressGuide] = useState(false);
  const [showMissingAnswerAlert, setShowMissingAnswerAlert] = useState(false);
  const [progressData, setProgressData] = useState<any>(null);
  const [progressSteps, setProgressSteps] = useState({
    'data-validation': { status: 'pending', progress: 0, label: '데이터 검증' },
    'gemini-analysis': { status: 'pending', progress: 0, label: 'AI 분석' },
    'swot-analysis': { status: 'pending', progress: 0, label: 'SWOT 분석' },
    'report-generation': { status: 'pending', progress: 0, label: '보고서 생성' },
    'email-sending': { status: 'pending', progress: 0, label: '이메일 발송' }
  });

  // 간단한 입력 핸들러들
  const handleAddressChange = (address: string) => {
    setFormState(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        location: address
      }
    }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormState(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        contactPhone: phone
      }
    }));
  };

  const handleEmailChange = (email: string) => {
    setFormState(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        contactEmail: email
      }
    }));
  };

  // 진행률 계산
  const progress = formState.currentQuestion === -1 ? 0 : 
    ((formState.currentQuestion + 1) / REAL_45_QUESTIONS.length) * 100;
  
  // 답변 완료된 문항 수
  const answeredCount = Object.keys(formState.answers).length;

  // Hydration 완료 처리
  useEffect(() => {
    setIsHydrated(true);
    
    // 로컬 스토리지에서 데이터 복원 (클라이언트에서만)
    try {
      const savedData = localStorage.getItem('real45QuestionForm');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormState(parsedData);
        setShowCompanyForm(parsedData.currentQuestion === -1);
      }
    } catch (error) {
      console.error('로컬 스토리지 데이터 복원 실패:', error);
    }
  }, []);

  // 데이터 변경 시 로컬 스토리지에 저장 (Hydration 완료 후에만)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('real45QuestionForm', JSON.stringify(formState));
    }
  }, [formState, isHydrated]);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      // 진행 중인 요청이나 타이머가 있다면 정리
      setIsSubmitting(false);
    };
  }, []);

  // 진행 상황 안내 표시
  const showProgressGuidance = () => {
    setShowProgressGuide(true);
    setTimeout(() => setShowProgressGuide(false), 5000); // 5초 후 자동 닫기
  };

  // 역량진단 시작 시 진행 상황 안내
  useEffect(() => {
    if (!showCompanyForm && formState.currentQuestion === 0) {
      showProgressGuidance();
    }
  }, [showCompanyForm, formState.currentQuestion]);

  // 실시간 진행상황 추적
  const startProgressTracking = (diagnosisId: string) => {
    if (!diagnosisId) return;

    // SSE 연결로 실시간 진행상황 추적
    const eventSource = new EventSource(`/api/diagnosis-progress?diagnosisId=${encodeURIComponent(diagnosisId)}`);
    
    eventSource.onopen = () => {
      console.log('진행상황 추적 시작:', diagnosisId);
    };

    eventSource.addEventListener('started', (event) => {
      const data = JSON.parse(event.data);
      setProgressData(data);
      updateProgressSteps('data-validation', 'in-progress', 20);
    });

    eventSource.addEventListener('progress', (event) => {
      const data = JSON.parse(event.data);
      setProgressData(data);
      
      // 진행 단계별 업데이트
      const elapsedMs = data.elapsedMs || 0;
      const elapsedMinutes = Math.floor(elapsedMs / 60000);
      
      if (elapsedMinutes < 1) {
        updateProgressSteps('data-validation', 'in-progress', 60);
      } else if (elapsedMinutes < 3) {
        updateProgressSteps('data-validation', 'completed', 100);
        updateProgressSteps('gemini-analysis', 'in-progress', 40);
      } else if (elapsedMinutes < 6) {
        updateProgressSteps('gemini-analysis', 'in-progress', 80);
        updateProgressSteps('swot-analysis', 'in-progress', 30);
      } else if (elapsedMinutes < 8) {
        updateProgressSteps('gemini-analysis', 'completed', 100);
        updateProgressSteps('swot-analysis', 'in-progress', 70);
        updateProgressSteps('report-generation', 'in-progress', 20);
      } else {
        updateProgressSteps('swot-analysis', 'completed', 100);
        updateProgressSteps('report-generation', 'in-progress', 60);
        updateProgressSteps('email-sending', 'in-progress', 10);
      }
    });

    eventSource.addEventListener('done', (event) => {
      const data = JSON.parse(event.data);
      setProgressData(data);
      
      // 모든 단계 완료
      Object.keys(progressSteps).forEach(step => {
        updateProgressSteps(step, 'completed', 100);
      });
      
      setPersistentNoticeOpen(false);
      
      toast({
        title: "🎉 진단 완료!",
        description: "맥킨지 스타일 보고서가 이메일로 발송되었습니다.",
        variant: "default"
      });
      
      eventSource.close();
    });

    eventSource.addEventListener('timeout', (event) => {
      const data = JSON.parse(event.data);
      setPersistentNoticeOpen(false);
      
      toast({
        title: "⏰ 처리 시간 초과",
        description: "고품질 분석으로 인해 시간이 소요되고 있습니다. 이메일로 결과를 확인해주세요.",
        variant: "default"
      });
      
      eventSource.close();
    });

    eventSource.onerror = (error) => {
      console.error('진행상황 추적 오류:', error);
      eventSource.close();
    };

    // 컴포넌트 언마운트 시 정리
    return () => {
      eventSource.close();
    };
  };

  // 진행 단계 업데이트 함수
  const updateProgressSteps = (stepKey: string, status: string, progress: number) => {
    setProgressSteps(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey as keyof typeof prev],
        status,
        progress
      }
    }));
  };

  // 기업정보 입력 완료 (간소화)
  const handleCompanyInfoSubmit = () => {
    const { 
      companyName, 
      contactName, 
      contactEmail, 
      contactPhone,
      industry, 
      employeeCount, 
      location,
      industryCustom
    } = formState.companyInfo;
    
    if (!companyName || !contactName || !contactEmail || !contactPhone || !industry || !employeeCount || !location.trim()) {
      toast({
        title: "필수 정보 누락",
        description: "필수 항목을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    // 직접입력 선택시 내용 확인
    if (industry === '직접입력' && !industryCustom?.trim()) {
      toast({
        title: "업종 직접입력 필요",
        description: "업종을 직접 입력해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    setShowCompanyForm(false);
    setFormState(prev => ({ ...prev, currentQuestion: 0 }));
  };

  // 답변 저장 (자동 진행 포함) - React 오류 #418, #423 수정
  const handleAnswer = (questionId: number, score: number) => {
    setFormState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: score
      }
    }));

    // 점수 선택 시 토스트 알림으로 즉시 피드백
    const scoreLabels = {
      5: "매우 우수 (5점)",
      4: "우수 (4점)", 
      3: "보통 (3점)",
      2: "개선 필요 (2점)",
      1: "매우 부족 (1점)"
    };
    
    toast({
      title: `✅ ${scoreLabels[score as keyof typeof scoreLabels]} 선택됨`,
      description: `질문 ${questionId}번에 ${score}점을 부여했습니다.`,
      duration: 2000,
    });

    // React.startTransition으로 상태 업데이트 안전하게 처리
    const timer = setTimeout(() => {
      React.startTransition(() => {
        if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
          setFormState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1
          }));
        }
      });
    }, 1200); // 피드백을 확인할 시간을 조금 더 줌

    // 타이머 정리를 위해 ref나 state에 저장할 수도 있지만, 
    // 여기서는 컴포넌트가 언마운트될 때 자동으로 정리됩니다.
    return () => clearTimeout(timer);
  };

  // 다음 질문 - React 오류 #418, #423 수정
  const handleNext = () => {
    React.startTransition(() => {
      if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
        setFormState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
      }
    });
  };

  // 이전 질문 - React 오류 #418, #423 수정
  const handlePrev = () => {
    React.startTransition(() => {
      if (formState.currentQuestion > 0) {
        setFormState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion - 1
        }));
      }
    });
  };

  // 진단 완료 및 제출
  const handleSubmit = async () => {
    if (answeredCount < REAL_45_QUESTIONS.length) {
      toast({
        title: "답변 미완료",
        description: `${REAL_45_QUESTIONS.length - answeredCount}개 문항이 남았습니다.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setPersistentNoticeOpen(true);
    try {
      // API 호출 로직 - 실제 신청서 데이터 연계 수정
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // 기업 정보
          companyName: formState.companyInfo.companyName,
          contactName: formState.companyInfo.contactName,
          contactEmail: formState.companyInfo.contactEmail,
          contactPhone: formState.companyInfo.contactPhone,
          industry: formState.companyInfo.industry === '직접입력' ? formState.companyInfo.industryCustom : formState.companyInfo.industry,
          customIndustry: formState.companyInfo.industryCustom,
          employeeCount: formState.companyInfo.employeeCount,
          annualRevenue: formState.companyInfo.annualRevenue,
          location: formState.companyInfo.location,
          
          // 실제 신청서 응답 데이터 - 객체 형태로 전송
          assessmentResponses: formState.answers, // ✅ 객체 형태로 전송
          
          // 추가 메타데이터
          diagnosisType: 'real-45-questions',
          questionCount: REAL_45_QUESTIONS.length,
          businessContent: '', // 기본값
          challenges: '', // 기본값
        }),
      });

      if (!response.ok) {
        throw new Error('진단 제출에 실패했습니다.');
      }

      const result = await response.json();
      
      if (result.success) {
        // 진단 결과를 상태에 저장하여 완료 화면으로 전환
        setDiagnosisResult(result);
        
        // 세션 스토리지에 결과 저장 (페이지 새로고침 대비)
        try {
          sessionStorage.setItem('diagnosisResult', JSON.stringify(result));
        } catch (storageError) {
          console.warn('세션 저장 실패:', storageError);
        }
        
        // 실시간 진행상황 추적 시작
        if (result.diagnosisId) {
          startProgressTracking(result.diagnosisId);
        }
        
        toast({
          title: "진단 제출 완료!",
          description: "AI 분석을 시작합니다. 실시간 진행상황을 확인하세요.",
          variant: "default"
        });

        // 로컬 스토리지 정리
        localStorage.removeItem('real45QuestionForm');
        
        setFormState(prev => ({ ...prev, isCompleted: true }));
      } else {
        throw new Error(result.error || '진단 처리 중 오류가 발생했습니다.');
      }
      
    } catch (error: any) {
      console.error('진단 제출 오류:', error);
      
      // 오류 유형에 따른 상세 메시지 제공
      let errorMessage = "진단 제출 중 오류가 발생했습니다.";
      let errorDescription = "잠시 후 다시 시도해주세요.";
      
      if (error.message?.includes('500')) {
        errorMessage = "서버 처리 오류";
        errorDescription = "AI 분석 중 일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (error.message?.includes('timeout') || error.message?.includes('Timeout')) {
        errorMessage = "처리 시간 초과";
        errorDescription = "고품질 AI 분석으로 인해 시간이 소요되고 있습니다. 잠시 후 다시 시도해주세요.";
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = "네트워크 연결 오류";
        errorDescription = "인터넷 연결을 확인하고 다시 시도해주세요.";
      }
      
      toast({
        title: errorMessage,
        description: errorDescription,
        variant: "destructive"
      });
      
      // 오류 보고 (선택사항)
      if (typeof window !== 'undefined') {
        try {
          fetch('/api/error-shield', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'diagnosis-submission-error',
              error: error.message,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              url: window.location.href
            })
          }).catch(() => {}); // 오류 보고 실패는 무시
        } catch {}
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 진단 완료 화면
  if (diagnosisResult) {
    return <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">진단 완료!</h2>
          <p className="text-gray-600 mb-4">맥킨지 스타일 보고서가 이메일로 발송됩니다.</p>
          <p className="text-sm text-gray-500">진단 ID: {diagnosisResult.diagnosisId}</p>
        </div>
      </div>
      {persistentNoticeOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-semibold">AI 역량진단 보고서 생성 중</span>
              </div>
              <p className="text-white/80 text-sm mt-1">실시간 진행상황을 확인하세요</p>
            </div>
            
            <div className="p-4 space-y-4">
              {/* 전체 진행률 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">전체 진행률</span>
                  <span className="text-sm text-gray-500">
                    {Math.round(Object.values(progressSteps).reduce((acc, step) => acc + step.progress, 0) / 5)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(Object.values(progressSteps).reduce((acc, step) => acc + step.progress, 0) / 5)}%`
                    }}
                  />
                </div>
              </div>

              {/* 단계별 진행상황 */}
              <div className="space-y-3">
                {Object.entries(progressSteps).map(([key, step]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'in-progress' ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step.status === 'completed' ? '✓' : 
                       step.status === 'in-progress' ? '⚡' : '○'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-medium ${
                          step.status === 'completed' ? 'text-green-700' :
                          step.status === 'in-progress' ? 'text-blue-700' :
                          'text-gray-500'
                        }`}>
                          {step.label}
                        </span>
                        <span className="text-xs text-gray-500">{step.progress}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`}
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 예상 시간 및 안내 */}
              <div className="rounded-lg border bg-blue-50 border-blue-200 p-3">
                <p className="text-blue-900 font-medium text-sm">📊 고품질 AI 분석 진행 중</p>
                <p className="text-blue-800/80 text-xs mt-1">
                  GEMINI 2.5 Flash가 45개 항목을 종합 분석하여 맥킨지 스타일 보고서를 생성합니다.
                </p>
                <p className="text-blue-700 text-xs mt-2 font-medium">
                  예상 완료 시간: 5~15분 | 완료 시 자동으로 이메일 발송됩니다
                </p>
              </div>
              
              {progressData && (
                <div className="text-xs text-gray-500 text-center">
                  진단 ID: {progressData.diagnosisId || diagnosisResult?.diagnosisId}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>;
  }

  // Hydration이 완료되지 않았으면 로딩 표시
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI 역량진단을 준비 중입니다...</p>
          <p className="text-xs text-gray-400 mt-2">Hydration: {isHydrated ? '완료' : '대기중'}</p>
        </div>
      </div>
    );
  }

  // 기업 정보 입력 폼
  if (showCompanyForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-6">
                <Image 
                  src="/aicamp_leader.png" 
                  alt="이교장" 
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mr-4 shadow-lg"
                />
                <div className="text-center">
                  <CardTitle className="text-3xl font-bold text-blue-900 mb-2">
                    AI 역량진단 신청서
                  </CardTitle>
                  <p className="text-lg font-semibold text-blue-600">45개 행동지표 기반 맞춤형 분석</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 font-medium">
                      📋 신청서 작성 안내
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      정확한 진단을 위해 모든 필수 항목을 빠짐없이 작성해 주세요. 
                      작성하신 정보는 맞춤형 AI 역량 분석에만 사용됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* 회사명 입력 */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      회사명
                    </label>
                    <input
                      type="text"
                      value={formState.companyInfo.companyName}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, companyName: e.target.value }
                      }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg min-h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm
                                placeholder:text-gray-400"
                      placeholder="회사명을 입력하세요"
                    />
                  </div>

                  {/* 담당자명 입력 */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      담당자명
                    </label>
                    <input
                      type="text"
                      value={formState.companyInfo.contactName}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, contactName: e.target.value }
                      }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg min-h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm
                                placeholder:text-gray-400"
                      placeholder="담당자명을 입력하세요"
                    />
                  </div>

                  {/* 이메일 입력 */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      이메일 주소
                    </label>
                    <EmailInput
                      value={formState.companyInfo.contactEmail}
                      onChange={handleEmailChange}
                      label=""
                      required={true}
                      placeholder="example@company.com"
                      showEmailNotice={true}
                      className="w-full"
                    />
                  </div>

                  {/* 전화번호 입력 */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      전화번호
                    </label>
                    <PhoneInput
                      value={formState.companyInfo.contactPhone}
                      onChange={handlePhoneChange}
                      label=""
                      required={true}
                      placeholder="010-0000-0000"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">업종 *</label>
                    <select
                      value={formState.companyInfo.industry}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, industry: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      aria-label="업종 선택"
                    >
                      <option value="">업종을 선택하세요</option>
                      <option value="제조업">제조업</option>
                      <option value="서비스업">서비스업</option>
                      <option value="유통업">유통업</option>
                      <option value="IT/소프트웨어">IT/소프트웨어</option>
                      <option value="금융업">금융업</option>
                      <option value="건설업">건설업</option>
                      <option value="교육업">교육업</option>
                      <option value="의료업">의료업</option>
                      <option value="운송업">운송업</option>
                      <option value="농업">농업</option>
                      <option value="직접입력">직접입력</option>
                    </select>
                  </div>

                  {/* 업종 직접입력 필드 */}
                  {formState.companyInfo.industry === '직접입력' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">업종 직접입력 *</label>
                      <input
                        type="text"
                        value={formState.companyInfo.industryCustom || ''}
                        onChange={(e) => setFormState(prev => ({
                          ...prev,
                          companyInfo: { ...prev.companyInfo, industryCustom: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="업종을 직접 입력하세요"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">직원수 *</label>
                    <select
                      value={formState.companyInfo.employeeCount}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, employeeCount: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      aria-label="직원수 선택"
                    >
                      <option value="">직원수를 선택하세요</option>
                      <option value="1-10명">1-10명</option>
                      <option value="11-50명">11-50명</option>
                      <option value="51-100명">51-100명</option>
                      <option value="101-300명">101-300명</option>
                      <option value="300명 이상">300명 이상</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">연매출</label>
                    <select
                      value={formState.companyInfo.annualRevenue}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, annualRevenue: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      aria-label="연매출 선택"
                    >
                      <option value="">연매출을 선택하세요</option>
                      <option value="10억원 미만">10억원 미만</option>
                      <option value="10억~20억원 미만">10억~20억원 미만</option>
                      <option value="20억~50억원 미만">20억~50억원 미만</option>
                      <option value="50억~100억원 미만">50억~100억원 미만</option>
                      <option value="100억~300억원 미만">100억~300억원 미만</option>
                      <option value="300억~500억원 미만">300억~500억원 미만</option>
                      <option value="500억~1000억원 미만">500억~1000억원 미만</option>
                      <option value="1000억원 이상">1000억원 이상</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">소재지 (도/특별시/시) *</label>
                    <select
                      value={formState.companyInfo.location}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, location: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      aria-label="소재지 선택"
                    >
                      <option value="">소재지를 선택하세요</option>
                      <option value="서울특별시">서울특별시</option>
                      <option value="부산광역시">부산광역시</option>
                      <option value="대구광역시">대구광역시</option>
                      <option value="인천광역시">인천광역시</option>
                      <option value="광주광역시">광주광역시</option>
                      <option value="대전광역시">대전광역시</option>
                      <option value="울산광역시">울산광역시</option>
                      <option value="세종특별자치시">세종특별자치시</option>
                      <option value="경기도">경기도</option>
                      <option value="강원특별자치도">강원특별자치도</option>
                      <option value="충청북도">충청북도</option>
                      <option value="충청남도">충청남도</option>
                      <option value="전라북도">전라북도</option>
                      <option value="전라남도">전라남도</option>
                      <option value="경상북도">경상북도</option>
                      <option value="경상남도">경상남도</option>
                      <option value="제주특별자치도">제주특별자치도</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleCompanyInfoSubmit}
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  진단 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 질문 진행 화면
  const currentQuestion = REAL_45_QUESTIONS[formState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Image 
                src="/aicamp_leader.png" 
                alt="이교장" 
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-3 shadow-md"
              />
              <h1 className="text-2xl font-bold text-blue-900">이교장의AI역량진단</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-lg px-3 py-1">
                {answeredCount}/{REAL_45_QUESTIONS.length}
              </Badge>
              {answeredCount > 0 && (
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                  <span className="mr-1">🎯</span>
                  현재 점수: {Object.values(formState.answers).reduce((sum, score) => sum + score, 0)}점
                </div>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600">
              진행률: {Math.round(progress)}%
            </p>
            {answeredCount > 0 && (
              <p className="text-sm text-blue-600 font-medium">
                평균 점수: {(Object.values(formState.answers).reduce((sum, score) => sum + score, 0) / answeredCount).toFixed(1)}점
              </p>
            )}
          </div>
        </div>

        {/* 질문 카드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={formState.currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    질문 {formState.currentQuestion + 1}
                  </Badge>
                  <Badge variant="outline" className={
                    currentQuestion.category === 'businessFoundation' ? 'bg-blue-50 text-blue-700' :
                    currentQuestion.category === 'currentAI' ? 'bg-green-50 text-green-700' :
                    currentQuestion.category === 'organizationReadiness' ? 'bg-purple-50 text-purple-700' :
                    currentQuestion.category === 'techInfrastructure' ? 'bg-indigo-50 text-indigo-700' :
                    currentQuestion.category === 'goalClarity' ? 'bg-yellow-50 text-yellow-700' :
                    currentQuestion.category === 'executionCapability' ? 'bg-red-50 text-red-700' :
                    'bg-gray-50 text-gray-700'
                  }>
                    {currentQuestion.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* 점수 체계 안내 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 font-semibold mr-2">📊 점수 체계 안내</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    <div className="text-center p-2 bg-green-100 rounded text-green-800 font-medium">
                      5점<br/>매우 우수
                    </div>
                    <div className="text-center p-2 bg-blue-100 rounded text-blue-800 font-medium">
                      4점<br/>우수
                    </div>
                    <div className="text-center p-2 bg-yellow-100 rounded text-yellow-800 font-medium">
                      3점<br/>보통
                    </div>
                    <div className="text-center p-2 bg-orange-100 rounded text-orange-800 font-medium">
                      2점<br/>개선 필요
                    </div>
                    <div className="text-center p-2 bg-red-100 rounded text-red-800 font-medium">
                      1점<br/>매우 부족
                    </div>
                  </div>
                </div>

                {/* 질문별 정확한 행동지표 기반 답변 옵션 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    행동지표별 평가 (해당하는 수준을 선택해주세요)
                  </h4>
                  
                  <div className="space-y-3">
                    {getQuestionBehaviorIndicators(currentQuestion.id).map((indicator) => {
                      const isSelected = formState.answers[currentQuestion.id] === indicator.score;
                      return (
                        <button
                          key={indicator.score}
                          onClick={() => handleAnswer(currentQuestion.id, indicator.score)}
                          className={`
                            w-full p-4 text-left border-2 rounded-lg transition-all duration-300 transform
                            ${isSelected
                              ? `${indicator.color} ${indicator.bgColor} border-current shadow-xl scale-[1.02] ring-2 ring-blue-200`
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:scale-[1.01]'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="font-semibold text-lg mr-3">
                                  {indicator.label}
                                </span>
                                <div className={`
                                  flex items-center px-3 py-1 rounded-full text-sm font-bold transition-all duration-300
                                  ${isSelected 
                                    ? 'bg-white text-blue-600 shadow-md ring-2 ring-blue-300 animate-pulse' 
                                    : 'bg-gray-100 text-gray-600'
                                  }
                                `}>
                                  <span className="mr-1">⭐</span>
                                  <span>{indicator.score}점</span>
                                  {isSelected && <span className="ml-1 text-green-500">✓</span>}
                                </div>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm font-medium text-blue-600">
                                  {indicator.keyword}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                {indicator.description}
                              </p>
                              {indicator.actionItems.length > 0 && (
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">주요 실행과제: </span>
                                  {indicator.actionItems.slice(0, 2).join(', ')}
                                  {indicator.actionItems.length > 2 && ' 등'}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 네비게이션 */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={formState.currentQuestion === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    이전
                  </Button>

                  {formState.currentQuestion === REAL_45_QUESTIONS.length - 1 ? (
                    <Button
                      onClick={() => {
                        if (answeredCount < REAL_45_QUESTIONS.length) {
                          setShowMissingAnswerAlert(true);
                          setTimeout(() => setShowMissingAnswerAlert(false), 3000);
                          return;
                        }
                        handleSubmit();
                      }}
                      disabled={isSubmitting}
                      className={`px-8 transition-all duration-300 ${
                        answeredCount < REAL_45_QUESTIONS.length 
                          ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          진단 완료 {answeredCount < REAL_45_QUESTIONS.length && `(${REAL_45_QUESTIONS.length - answeredCount}개 남음)`}
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!formState.answers[currentQuestion.id]}
                    >
                      다음
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* 저장 버튼 */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast({
                title: "자동 저장됨",
                description: "진행 상황이 자동으로 저장되었습니다.",
              });
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            진행상황 자동 저장됨
          </Button>
        </div>
              </div>

        {/* 진행 상황 안내 모달 */}
        {showProgressGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span className="font-semibold">AI 역량진단 시작!</span>
                </div>
                <p className="text-white/90 text-sm mt-1">45개 문항으로 정밀 분석을 시작합니다</p>
              </div>
              <div className="p-4 space-y-3 text-sm text-gray-700">
                <div className="rounded-lg border bg-blue-50 border-blue-200 p-3">
                  <p className="text-blue-900 font-medium mb-2">📋 진행 방법 안내</p>
                  <ul className="text-blue-800/80 space-y-1 text-xs">
                    <li>• 각 질문을 신중히 읽고 현재 상황에 맞는 점수를 선택하세요</li>
                    <li>• 진행 상황은 자동으로 저장됩니다</li>
                    <li>• 모든 문항 완료 후 맥킨지 스타일 보고서가 생성됩니다</li>
                  </ul>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setShowProgressGuide(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    시작하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 답변 누락 알림 */}
        {showMissingAnswerAlert && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">답변이 완료되지 않았습니다</p>
                  <p className="text-sm text-red-100">
                    {REAL_45_QUESTIONS.length - answeredCount}개 문항이 남아있습니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Real45QuestionForm;
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, RotateCcw, Save, Loader2, ArrowRight, CheckCircle, X, Download, FileText } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { REAL_45_QUESTIONS, RealQuestion } from '../constants/real-45-questions';
import { getQuestionBehaviorIndicators } from '../constants/question-specific-behavior-indicators';
import { AddressInput } from '@/components/ui/address-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { EmailInput } from '@/components/ui/email-input';
import ScoreGuideModal from '@/components/diagnosis/ScoreGuideModal';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';
import { generateDiagnosisFormPDF, downloadPDF, generateAndUploadDiagnosisFormPDF } from '@/lib/pdf/diagnosis-form-generator';
import { generateScoreReportPDF, generateAndUploadScoreReportPDF } from '@/lib/pdf/score-report-generator';
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
  privacyConsent?: boolean;
  marketingConsent?: boolean;
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
  grade?: string;
  maturityLevel?: string;
  percentile?: number;
  categoryScores?: {
    businessFoundation?: number;
    currentAIUsage?: number;
    organizationalReadiness?: number;
    technicalInfrastructure?: number;
    goalClarity?: number;
    executionCapability?: number;
  };
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  recommendations?: string[];
}

const Real45QuestionForm: React.FC = () => {
  const { toast } = useToast();
  const [isHydrated, setIsHydrated] = useState(true);
  const prevProgressStatus = useRef<string>(''); // 강제로 Hydration 완료로 설정
  const [formState, setFormState] = useState<FormState>({
    companyInfo: {
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      industry: '',
      employeeCount: '',
      annualRevenue: '',
      location: '',
      privacyConsent: false,
      marketingConsent: false
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
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [progressSteps, setProgressSteps] = useState({
    'data-validation': { status: 'pending', progress: 0, label: '1단계: 데이터 검증' },
    'report-generation': { status: 'pending', progress: 0, label: '2단계: 보고서 생성' },
    'data-storage': { status: 'pending', progress: 0, label: '3단계: 데이터 저장' },
    'email-dispatch': { status: 'pending', progress: 0, label: '4단계: 보고서 발송' }
  });

  // 🎯 이메일 발송 상태 추적 관련 상태
  const [emailVerificationStatus, setEmailVerificationStatus] = useState({
    status: 'pending', // 'pending' | 'checking' | 'sent' | 'delivered' | 'confirmed' | 'completed' | 'error'
    message: '이메일 발송 준비 중...',
    timestamp: null,
    shouldHideBanner: false,
    completionMessage: ''
  });
  const [emailVerificationInterval, setEmailVerificationInterval] = useState<NodeJS.Timeout | null>(null);
  
  // 점수체계 안내 모달 상태 (비활성화)
  const [showScoreGuide, setShowScoreGuide] = useState(false);
  const [hasShownGuide, setHasShownGuide] = useState(true); // 항상 표시된 것으로 처리
  
  // PDF 다운로드 상태
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingScorePDF, setIsGeneratingScorePDF] = useState(false);

  // PDF 다운로드 및 Google Drive 업로드 함수들
  const handleDownloadDiagnosisForm = async () => {
    if (!formState.companyInfo.companyName || Object.keys(formState.answers).length === 0) {
      toast({
        title: "❌ 다운로드 불가",
        description: "기업 정보와 진단 응답을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const diagnosisData = {
        companyInfo: formState.companyInfo,
        responses: formState.answers,
        diagnosisId: diagnosisResult?.diagnosisId || `DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        submitDate: new Date().toISOString()
      };

      // Google Drive 폴더 ID (환경변수 또는 기본값)
      const folderId = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID || "1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj";
      
      // PDF 생성 및 Google Drive 업로드
      const result = await generateAndUploadDiagnosisFormPDF(diagnosisData, folderId);
      
      if (result.success) {
        // 로컬 다운로드도 함께 수행
        if (result.blob) {
          const filename = `AI역량진단신청서_${formState.companyInfo.companyName}_${new Date().toISOString().slice(0, 10)}.pdf`;
          downloadPDF(result.blob, filename);
        }
        
        toast({
          title: "✅ 신청서 HTML 생성 및 저장 완료",
          description: "진단 신청서 HTML이 다운로드되고 Google Drive에 저장되었습니다.",
        });
        
        console.log('✅ Google Drive 저장 완료:', {
          fileId: result.fileId,
          webViewLink: result.webViewLink
        });
      } else {
        // Google Drive 업로드 실패 시 로컬 다운로드만 수행
        const pdfBlob = await generateDiagnosisFormPDF(diagnosisData);
        const filename = `AI역량진단신청서_${formState.companyInfo.companyName}_${new Date().toISOString().slice(0, 10)}.pdf`;
        downloadPDF(pdfBlob, filename);
        
        toast({
          title: "✅ 신청서 HTML 다운로드 완료 (Google Drive 저장 실패)",
          description: "진단 신청서 HTML이 다운로드되었습니다. Google Drive 저장에 실패했습니다.",
          variant: "destructive"
        });
        
        console.error('❌ Google Drive 저장 실패:', result.error);
      }
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      toast({
        title: "❌ PDF 생성 실패",
        description: "PDF 생성 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadScoreReport = async () => {
    if (!diagnosisResult) {
      toast({
        title: "❌ 다운로드 불가",
        description: "진단 결과가 없습니다. 먼저 진단을 완료해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingScorePDF(true);
    try {
      const scoreData = {
        diagnosisId: diagnosisResult.diagnosisId || `DIAG_${Date.now()}`,
        companyName: formState.companyInfo.companyName,
        submitDate: new Date().toISOString(),
        totalScore: diagnosisResult.totalScore || 0,
        categoryScores: {
          businessFoundation: diagnosisResult.categoryScores?.businessFoundation || 0,
          currentAIUsage: diagnosisResult.categoryScores?.currentAIUsage || 0,
          organizationalReadiness: diagnosisResult.categoryScores?.organizationalReadiness || 0,
          technicalInfrastructure: diagnosisResult.categoryScores?.technicalInfrastructure || 0,
          goalClarity: diagnosisResult.categoryScores?.goalClarity || 0,
          executionCapability: diagnosisResult.categoryScores?.executionCapability || 0
        },
        recommendations: diagnosisResult.recommendations || ['단계적 AI 도입 계획 수립'],
        nextSteps: [
          '1단계: 현재 상태 정밀 분석',
          '2단계: AI 도입 전략 수립',
          '3단계: 단계별 실행 계획 수립',
          '4단계: 성과 측정 및 개선'
        ]
      };

      // Google Drive 폴더 ID (환경변수 또는 기본값)
      const folderId = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID || "1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj";
      
      // PDF 생성 및 Google Drive 업로드
      const result = await generateAndUploadScoreReportPDF(scoreData, folderId);
      
      if (result.success) {
        // 로컬 다운로드도 함께 수행
        if (result.blob) {
          const filename = `AI역량진단점수체크_${formState.companyInfo.companyName}_${new Date().toISOString().slice(0, 10)}.pdf`;
          downloadPDF(result.blob, filename);
        }
        
        toast({
          title: "✅ 점수 보고서 생성 및 저장 완료",
          description: "점수체크 보고서가 다운로드되고 Google Drive에 저장되었습니다.",
        });
        
        console.log('✅ Google Drive 저장 완료:', {
          fileId: result.fileId,
          webViewLink: result.webViewLink
        });
      } else {
        // Google Drive 업로드 실패 시 로컬 다운로드만 수행
        const pdfBlob = await generateScoreReportPDF(scoreData);
        const filename = `AI역량진단점수체크_${formState.companyInfo.companyName}_${new Date().toISOString().slice(0, 10)}.pdf`;
        downloadPDF(pdfBlob, filename);
        
        toast({
          title: "✅ 점수 보고서 다운로드 완료 (Google Drive 저장 실패)",
          description: "점수체크 보고서가 다운로드되었습니다. Google Drive 저장에 실패했습니다.",
          variant: "destructive"
        });
        
        console.error('❌ Google Drive 저장 실패:', result.error);
      }
    } catch (error) {
      console.error('점수체크 PDF 생성 오류:', error);
      toast({
        title: "❌ 점수체크 PDF 생성 실패",
        description: "점수체크 PDF 생성 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingScorePDF(false);
    }
  };

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

  // 회사정보 입력 유효성 (개인정보 동의 포함)
  const isCompanyFormValid = Boolean(
    formState.companyInfo.companyName?.trim() &&
    formState.companyInfo.contactName?.trim() &&
    formState.companyInfo.contactEmail?.trim() &&
    formState.companyInfo.contactPhone?.trim() &&
    formState.companyInfo.industry?.trim() &&
    formState.companyInfo.employeeCount?.trim() &&
    formState.companyInfo.annualRevenue?.trim() &&
    formState.companyInfo.location?.trim() &&
    formState.companyInfo.privacyConsent === true
  );

  // 진단 초기화 함수
  const resetDiagnosis = () => {
    const initialState = {
      companyInfo: {
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        industry: '',
        employeeCount: '',
        annualRevenue: '',
        location: '',
        privacyConsent: false,
        marketingConsent: false
      },
      answers: {},
      currentQuestion: -1,
      isCompleted: false
    };
    
    setFormState(initialState);
    setShowCompanyForm(true);
    setDiagnosisResult(null);
    setIsSubmitting(false);
    
    // 로컬 스토리지도 초기화
    localStorage.removeItem('real45QuestionForm');
    
    console.log('🔄 진단이 초기화되었습니다');
  };

  // Hydration 완료 처리
  useEffect(() => {
    // 즉시 Hydration 완료로 설정
    setIsHydrated(true);
    console.log('✅ Hydration 완료');
    
    // URL 파라미터로 초기화 요청 확인
    const urlParams = new URLSearchParams(window.location.search);
    const shouldReset = urlParams.get('reset') === 'true';
    
    if (shouldReset) {
      resetDiagnosis();
      // URL에서 reset 파라미터 제거
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    
    // 로컬 스토리지에서 데이터 복원 (클라이언트에서만)
    try {
      const savedData = localStorage.getItem('real45QuestionForm');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // 진단이 완료된 상태라면 초기화
        if (parsedData.isCompleted || parsedData.currentQuestion >= REAL_45_QUESTIONS.length - 1) {
          console.log('🔄 완료된 진단 감지 - 자동 초기화');
          resetDiagnosis();
          return;
        }
        
        setFormState(parsedData);
        setShowCompanyForm(parsedData.currentQuestion === -1);
      }
    } catch (error) {
      console.error('로컬 스토리지 데이터 복원 실패:', error);
      resetDiagnosis();
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
      
      // 🎯 이메일 발송 상태 추적 인터벌 정리
      if (emailVerificationInterval) {
        clearInterval(emailVerificationInterval);
        setEmailVerificationInterval(null);
        console.log('🧹 이메일 발송 상태 추적 인터벌 정리 완료');
      }
    };
  }, [emailVerificationInterval]);

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

  // 신청서 접수 진행상황 추적
  const startProgressTracking = (diagnosisId: string) => {
    if (!diagnosisId) return;

    console.log('🎯 신청서 접수 진행상황 추적 시작:', diagnosisId);
    
    let eventSource: EventSource | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;
    const reconnectDelay = 2000; // 2초

    const createEventSource = () => {
      if (eventSource) {
        eventSource.close();
      }
      
      eventSource = new EventSource(`/api/diagnosis-progress?diagnosisId=${encodeURIComponent(diagnosisId)}`);
      
      eventSource.onopen = () => {
        console.log('✅ SSE 연결 성공 - 신청서 접수 모니터링 시작:', diagnosisId);
        reconnectAttempts = 0; // 연결 성공 시 재시도 횟수 리셋
        updateProgressSteps('data-validation', 'in-progress', 20);
      };

      eventSource.addEventListener('started', (event) => {
        const data = JSON.parse(event.data);
        console.log('📊 신청서 접수 시작됨:', data);
        setProgressData(data);
        updateProgressSteps('data-validation', 'in-progress', 30);
      });

      eventSource.addEventListener('progress', (event) => {
        const data = JSON.parse(event.data);
        
        // 진행상황 로그 최적화: 중요한 상태 변화만 로그
        const shouldLog = data.status !== prevProgressStatus.current || 
                         (data.elapsedMs && data.elapsedMs % 60000 < 5000); // 1분마다만 로그
        
        if (shouldLog) {
          console.log('📈 신청서 처리 진행상황 업데이트:', {
            status: data.status,
            progress: data.overallProgress || 0,
            elapsedTime: Math.floor((data.elapsedMs || 0) / 1000) + 's',
            etaHint: data.etaHint
          });
          prevProgressStatus.current = data.status;
        }
        
        setProgressData(data);
        
        // 실제 Google Sheets 데이터 기반 신청서 접수 진행상황 반영
        if (data.snapshot && data.snapshot.steps) {
          const steps = data.snapshot.steps;
          Object.keys(steps).forEach(stepKey => {
            const step = steps[stepKey];
            updateProgressSteps(stepKey, step.status, step.progress);
          });
        } else {
          // 폴백: 경과 시간 기반 추정 (V17 간소화 - 신청서 접수)
          const elapsedMs = data.elapsedMs || 0;
          const elapsedMinutes = Math.floor(elapsedMs / 60000);
          
          if (elapsedMinutes < 1) {
            updateProgressSteps('data-validation', 'completed', 100);
            updateProgressSteps('report-generation', 'in-progress', Math.min(80, 20 + elapsedMinutes * 60));
          } else if (elapsedMinutes < 2) {
            updateProgressSteps('data-validation', 'completed', 100);
            updateProgressSteps('report-generation', 'completed', 100);
            updateProgressSteps('data-storage', 'in-progress', Math.min(80, (elapsedMinutes - 1) * 80));
          } else if (elapsedMinutes < 3) {
            updateProgressSteps('data-validation', 'completed', 100);
            updateProgressSteps('report-generation', 'completed', 100);
            updateProgressSteps('data-storage', 'completed', 100);
            updateProgressSteps('email-dispatch', 'in-progress', Math.min(80, (elapsedMinutes - 2) * 40));
          } else {
            updateProgressSteps('data-validation', 'completed', 100);
            updateProgressSteps('report-generation', 'completed', 100);
            updateProgressSteps('data-storage', 'completed', 100);
            updateProgressSteps('email-dispatch', 'in-progress', 90);
          }
        }
      });

      eventSource.addEventListener('done', (event) => {
        const data = JSON.parse(event.data);
        console.log('🎉 신청서 접수 완료:', data);
        setProgressData(data);
        
        // 모든 단계 완료
        updateProgressSteps('data-validation', 'completed', 100);
        updateProgressSteps('report-generation', 'completed', 100);
        updateProgressSteps('data-storage', 'completed', 100);
        updateProgressSteps('email-dispatch', 'completed', 100);
        
        // 완료 후에도 배너를 지속적으로 표시 (사용자가 수동으로 닫을 때까지)
        toast({
          title: "🎉 신청서 접수 완료!",
          description: "신청서가 성공적으로 접수되었습니다. 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다.",
          variant: "default"
        });
        
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      });

      eventSource.addEventListener('timeout', (event) => {
        const data = JSON.parse(event.data);
        console.log('⏰ 신청서 접수 타임아웃:', data);
        
        // 타임아웃 시에도 완료 처리 (신청서 접수 완료)
        updateProgressSteps('data-validation', 'completed', 100);
        updateProgressSteps('report-generation', 'completed', 100);
        updateProgressSteps('data-storage', 'completed', 100);
        updateProgressSteps('email-dispatch', 'completed', 100);
        
        // 타임아웃 시에도 배너를 지속적으로 표시
        toast({
          title: "⏰ 접수 완료",
          description: "신청서가 성공적으로 접수되었습니다. 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다.",
          variant: "default"
        });
        
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      });

      eventSource.onerror = (error) => {
        console.warn('⚠️ SSE 연결 일시적 중단:', error);
        
        // 연결이 닫혔는지 확인
        if (eventSource && eventSource.readyState === EventSource.CLOSED) {
          console.log('🔌 SSE 연결이 닫혔습니다. 재연결을 시도합니다...');
          
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.log(`🔄 재연결 시도 ${reconnectAttempts}/${maxReconnectAttempts}`);
            
            setTimeout(() => {
              createEventSource();
            }, reconnectDelay);
          } else {
            console.log('❌ 최대 재연결 시도 횟수 초과. 접수 완료로 처리합니다.');
            
            // 최대 재시도 횟수 초과 시 접수 완료로 처리
            updateProgressSteps('data-validation', 'completed', 100);
            updateProgressSteps('report-generation', 'completed', 100);
            updateProgressSteps('data-storage', 'completed', 100);
            updateProgressSteps('email-dispatch', 'completed', 100);
            
            toast({
              title: "📡 접수 완료",
              description: "신청서가 성공적으로 접수되었습니다. 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다.",
              variant: "default"
            });
            
            if (eventSource) {
              eventSource.close();
              eventSource = null;
            }
          }
        }
      };
    };

    // 초기 연결 생성
    createEventSource();

    // 컴포넌트 언마운트 시 SSE 연결 정리
    return () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    };
  };

  // 🎯 이메일 발송 상태 추적 함수
  const startEmailVerificationTracking = (diagnosisId: string, email: string) => {
    if (!diagnosisId || !email) {
      console.warn('⚠️ 이메일 발송 추적을 위한 필수 정보가 누락되었습니다.');
      return;
    }

    console.log('📧 이메일 발송 상태 추적 시작:', { diagnosisId, email });

    setEmailVerificationStatus({
      status: 'checking',
      message: '이메일 발송 상태 확인 중...',
      timestamp: new Date().toISOString(),
      shouldHideBanner: false,
      completionMessage: ''
    });

    // 이메일 발송 상태를 주기적으로 확인 (30초마다)
    const checkEmailStatus = async () => {
      try {
        const response = await fetch('/api/email-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diagnosisId,
            email,
            action: 'check',
            type: 'ai_diagnosis'
          }),
        });

        if (!response.ok) {
          throw new Error(`이메일 상태 확인 실패: ${response.status}`);
        }

        const result = await response.json();
        
        console.log('📧 이메일 상태 확인 결과:', result);

        setEmailVerificationStatus({
          status: result.status || 'pending',
          message: getEmailStatusMessage(result.status),
          timestamp: new Date().toISOString(),
          shouldHideBanner: result.data?.shouldHideBanner || false,
          completionMessage: result.data?.completionMessage || ''
        });

        // 🎯 이메일 발송 완료 시 배너 숨김 처리
        if (result.status === 'sent' || result.status === 'delivered') {
          console.log('✅ 이메일 발송 완료 감지 - 배너 숨김 처리 시작');
          console.log('📧 이메일 상태 결과:', result);
          
          // 배너 숨김 함수 호출 (전역 함수 사용)
          console.log('🔍 window.hideAllBanners 함수 확인:', typeof (window as any).hideAllBanners);
          
          if (typeof window !== 'undefined') {
            if ((window as any).hideAllBanners) {
              console.log('🎯 배너 숨김 함수 호출 시작');
              (window as any).hideAllBanners();
              console.log('✅ 배너 숨김 함수 호출 완료');
            } else {
              console.warn('⚠️ window.hideAllBanners 함수를 찾을 수 없습니다.');
              
              // 대체 방법: 직접 배너 숨김 이벤트 발송
              console.log('🔄 대체 방법: 배너 숨김 이벤트 직접 발송');
              window.dispatchEvent(new CustomEvent('hideAllBanners'));
            }
          }
          
          // 완료 토스트 표시
          toast({
            title: "📧 이메일 발송 완료",
            description: result.data?.completionMessage || "AI역량진단 신청이 완료되었습니다. 확인 이메일을 발송했습니다.",
            variant: "default"
          });

          // 추적 중단
          if (emailVerificationInterval) {
            clearInterval(emailVerificationInterval);
            setEmailVerificationInterval(null);
            console.log('🛑 이메일 상태 추적 중단');
          }
        }

      } catch (error) {
        console.error('❌ 이메일 상태 확인 오류:', error);
        
        setEmailVerificationStatus({
          status: 'error',
          message: '이메일 상태 확인 중 오류가 발생했습니다.',
          timestamp: new Date().toISOString(),
          shouldHideBanner: false,
          completionMessage: ''
        });
      }
    };

    // 즉시 첫 번째 확인 실행
    checkEmailStatus();

    // 30초마다 상태 확인 (최대 10분간)
    const interval = setInterval(checkEmailStatus, 30000);
    setEmailVerificationInterval(interval);

    // 10분 후 자동 중단
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setEmailVerificationInterval(null);
        console.log('⏰ 이메일 발송 상태 추적 타임아웃 (10분)');
      }
    }, 600000); // 10분
  };

  // 이메일 상태에 따른 메시지 생성
  const getEmailStatusMessage = (status: string): string => {
    switch (status) {
      case 'pending':
        return '이메일 발송 준비 중...';
      case 'checking':
        return '이메일 발송 상태 확인 중...';
      case 'sent':
        return '✅ 이메일 발송 완료!';
      case 'delivered':
        return '✅ 이메일 전달 완료!';
      case 'confirmed':
        return '✅ 이메일 확인 완료!';
      case 'completed':
        return '✅ 모든 처리 완료!';
      case 'error':
        return '❌ 이메일 발송 오류';
      default:
        return '이메일 상태 확인 중...';
    }
  };

  // 신청서 접수 진행 단계 업데이트 함수
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



  // 미답변 문항으로 이동하는 함수 (수동 트리거용)
  const moveToNextUnanswered = () => {
    const unansweredQuestions = REAL_45_QUESTIONS
      .map((_, index) => index + 1)
      .filter(questionId => !formState.answers[questionId]);
    
    if (unansweredQuestions.length > 0) {
      const nextUnanswered = unansweredQuestions[0];
      setFormState(prev => ({ ...prev, currentQuestion: nextUnanswered - 1 }));
      
      toast({
        title: `📝 ${unansweredQuestions.length}개 미답변 문항`,
        description: `${nextUnanswered}번 문항으로 이동했습니다.`,
        variant: "default"
      });
    } else {
      // 모든 문항 완료시 제출 화면으로
      toast({
        title: "🎉 모든 문항 완료!",
        description: "진단 제출이 가능합니다.",
        variant: "default"
      });
    }
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
      annualRevenue,
      location,
      industryCustom
    } = formState.companyInfo;
    
    if (!companyName || !contactName || !contactEmail || !contactPhone || !industry || !employeeCount || !annualRevenue || !location.trim() || !formState.companyInfo.privacyConsent) {
      toast({
        title: "필수 동의/정보 누락",
        description: !formState.companyInfo.privacyConsent ? "개인정보 수집·이용 동의가 필요합니다." : "필수 항목을 모두 입력해주세요.",
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
    
    // 점수체계 안내 모달 비활성화 (평가자가 문항에만 집중할 수 있도록)
    // if (!hasShownGuide) {
    //   setShowScoreGuide(true);
    //   setHasShownGuide(true);
    // } else {
    //   setFormState(prev => ({ ...prev, currentQuestion: 0 }));
    // }
    
    // 바로 진단 시작
    setFormState(prev => ({ ...prev, currentQuestion: 0 }));
  };

  // 점수체계 안내 모달 완료 후 진단 시작
  const handleScoreGuideComplete = () => {
    setShowScoreGuide(false);
    setFormState(prev => ({ ...prev, currentQuestion: 0 }));
  };

  // 답변 저장 및 자동 진행 - 개선된 버전
  const handleAnswer = (questionId: number, score: number) => {
    // 중복 클릭 방지 - 이미 답변된 경우 무시
    if (formState.answers[questionId] === score) {
      return;
    }

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
      duration: 1500,
    });

    // 자동 진행 로직 - 0.5초 후 다음 질문으로 이동
    setTimeout(() => {
      if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
        setFormState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
      } else {
        // 마지막 질문인 경우 제출 처리
        handleSubmit();
      }
    }, 500);
  };

  // 다음 질문 - 필수 답변 검증 강화
  const handleNext = () => {
    const currentQuestionId = formState.currentQuestion + 1;
    
    // 현재 질문에 답변이 없으면 진행 불가
    if (!formState.answers[currentQuestionId]) {
      toast({
        title: "⚠️ 답변 필수",
        description: "현재 질문에 답변해야 다음으로 진행할 수 있습니다.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

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
          privacyConsent: formState.companyInfo.privacyConsent === true,
          marketingConsent: formState.companyInfo.marketingConsent === true,
          
          // 실제 신청서 응답 데이터 - 객체 형태로 전송
          assessmentResponses: formState.answers, // ✅ 객체 형태로 전송
          
          // 추가 메타데이터
          diagnosisType: 'real-45-questions',
          questionCount: REAL_45_QUESTIONS.length,
          businessContent: '', // 기본값
          challenges: '', // 기본값
          // 서버 장시간 대기 방지: 보고서 생성 GAS 호출은 클라이언트에서 수행
          deferGAS: true
        }),
      });

      if (!response.ok) {
        throw new Error('진단 제출에 실패했습니다.');
      }

      const result = await response.json();
      
      if (result.success) {
        // 진단 결과를 상태에 저장하여 완료 화면으로 전환
        const diagnosisId = result.diagnosisId || result.data?.diagnosisId || `TEMP-${Date.now()}`;
        const enhancedResult = {
          ...result,
          diagnosisId: diagnosisId
        };
        
        setDiagnosisResult(enhancedResult);
        
        // 🎯 V22.0 알림 배너를 위한 로컬 스토리지 저장
        if (result.data?.reportInfo) {
          localStorage.setItem('completedDiagnosisId', diagnosisId);
          localStorage.setItem('diagnosisReportInfo', JSON.stringify({
            diagnosisId: diagnosisId,
            companyName: formState.companyInfo.companyName,
            fileName: result.data.reportInfo.fileName,
            totalScore: result.data.reportInfo.totalScore,
            grade: result.data.reportInfo.grade,
            createdAt: result.data.reportInfo.createdAt
          }));
          
          // 페이지 새로고침으로 알림 배너 표시
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        
        // 세션 스토리지에 결과 저장 (페이지 새로고침 대비)
        try {
          sessionStorage.setItem('diagnosisResult', JSON.stringify(enhancedResult));
        } catch (storageError) {
          console.warn('세션 저장 실패:', storageError);
        }
        
        // 실제 진행상황 추적 시작
        startProgressTracking(diagnosisId);
        
        // 🎯 이메일 발송 상태 추적 시작
        startEmailVerificationTracking(diagnosisId, formState.companyInfo.contactEmail);
        
        // 신청서 접수 요청을 클라이언트에서 즉시 트리거 (장시간 처리 안전)
        try {
          const gasPayload = {
            type: 'diagnosis',
            action: 'diagnosis',
            companyName: formState.companyInfo.companyName,
            contactName: formState.companyInfo.contactName,
            contactEmail: formState.companyInfo.contactEmail,
            contactPhone: formState.companyInfo.contactPhone,
            industry: formState.companyInfo.industry === '직접입력' ? formState.companyInfo.industryCustom : formState.companyInfo.industry,
            employeeCount: formState.companyInfo.employeeCount,
            annualRevenue: formState.companyInfo.annualRevenue,
            location: formState.companyInfo.location,
            privacyConsent: formState.companyInfo.privacyConsent === true,
            assessmentResponses: formState.answers,
            diagnosisId,
            // 서버 워크플로우와 GAS가 요구하는 최소 필드만 전송
            reportGeneration: {
              requestHtmlReport: true,
              requestEmailSending: true,
              emailRecipient: formState.companyInfo.contactEmail,
              companyName: formState.companyInfo.companyName
            },
            timestamp: new Date().toISOString(),
            version: 'V17.0-SIMPLIFIED-FIXED',
            source: 'client_deferred'
          } as const;

          fetch('/api/google-script-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gasPayload)
          }).then(() => {
                      // 진행상태를 확정적으로 한 단계 올려 사용자 체감 개선
          updateProgressSteps('report-generation', 'in-progress', 80);
          updateProgressSteps('email-dispatch', 'in-progress', 40);
          }).catch(() => {
            // 실패해도 서버가 재시도하거나 사용자는 결과 페이지에서 다시 확인 가능 (신청서 접수)
          });
        } catch {}
        
        toast({
          title: "✅ 진단 신청서 제출 완료!",
          description: "신청서가 성공적으로 접수되었습니다. 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다.",
          variant: "default"
        });

        // 신청서 제출 완료 후 로컬 스토리지 정리
        localStorage.removeItem('real45QuestionForm');
        
        setFormState(prev => ({ ...prev, isCompleted: true }));
      } else {
        throw new Error(result.error || '진단 처리 중 오류가 발생했습니다.');
      }
      
    } catch (error: any) {
      console.error('신청서 제출 오류:', error);
      
      // 오류 유형에 따른 상세 메시지 제공
      let errorMessage = "신청서 제출 중 오류가 발생했습니다.";
      let errorDescription = "잠시 후 다시 시도해주세요.";
      
      if (error.message?.includes('500')) {
        errorMessage = "서버 처리 오류";
        errorDescription = "신청서 접수 중 일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (error.message?.includes('timeout') || error.message?.includes('Timeout')) {
        errorMessage = "처리 시간 초과";
        errorDescription = "신청서 접수 중 시간이 소요되고 있습니다. 잠시 후 다시 시도해주세요.";
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
              type: 'application-submission-error',
              error: error.message,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              url: window.location.href
            })
          }).catch(() => {}); // 신청서 제출 오류 보고 실패는 무시
        } catch {}
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 신청서 제출 완료 화면
  if (diagnosisResult) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center pt-24">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-lg">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">✅ 신청서 제출 완료!</h2>
          <p className="text-gray-600 mb-4">AI 역량진단 신청서가 성공적으로 접수되었습니다.</p>
          <p className="text-sm text-gray-500 mb-4">신청 ID: {diagnosisResult.diagnosisId}</p>
          
          {/* 🎯 이메일 발송 상태 표시 */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center space-x-2">
              {emailVerificationStatus.status === 'checking' && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
              {emailVerificationStatus.status === 'sent' || emailVerificationStatus.status === 'delivered' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : emailVerificationStatus.status === 'error' ? (
                <X className="w-4 h-4 text-red-500" />
              ) : (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
              <span className={`text-sm font-medium ${
                emailVerificationStatus.status === 'sent' || emailVerificationStatus.status === 'delivered' 
                  ? 'text-green-700' 
                  : emailVerificationStatus.status === 'error'
                  ? 'text-red-700'
                  : 'text-blue-700'
              }`}>
                {emailVerificationStatus.message}
              </span>
            </div>
            {emailVerificationStatus.completionMessage && (
              <p className="text-xs text-gray-600 mt-2 text-center">
                {emailVerificationStatus.completionMessage}
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            {/* 신청서 PDF 다운로드 버튼들 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <Button
                onClick={handleDownloadDiagnosisForm}
                disabled={isGeneratingPDF}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                size="lg"
              >
                {isGeneratingPDF ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {isGeneratingPDF ? 'HTML 생성 중...' : '진단 신청서 HTML'}
              </Button>
              
              <Button
                onClick={handleDownloadScoreReport}
                disabled={isGeneratingScorePDF || !diagnosisResult}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                size="lg"
              >
                {isGeneratingScorePDF ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isGeneratingScorePDF ? 'PDF 생성 중...' : '진단 점수체크 PDF'}
              </Button>
            </div>
            
            <Button 
              onClick={() => window.open(`/diagnosis/report/${diagnosisResult.diagnosisId}`, '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              📄 진단 신청서 보기
            </Button>
            
            <Button 
              onClick={() => setShowConsultationModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              💬 이교장 직접 상담 신청
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
              size="lg"
            >
              홈으로 돌아가기
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            * 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다
          </p>
        </div>

        {/* 이교장 직접 상담 신청 모달 */}
        <ConsultationRequestModal
          isOpen={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
          diagnosisData={diagnosisResult}
          companyName={formState.companyInfo.companyName}
          contactEmail={formState.companyInfo.contactEmail}
          contactName={formState.companyInfo.contactName}
          contactPhone={formState.companyInfo.contactPhone}
          initialData={{
            industry: formState.companyInfo.industry,
            inquiryType: 'diagnosis',
            consultationArea: 'diagnosis',
            inquiryContent: `AI 역량진단 신청서 제출 후 이교장 직접 상담을 요청합니다.`
          }}
        />
      </div>
      {persistentNoticeOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-semibold">이교장의 AI역량진단 신청서 접수 중</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPersistentNoticeOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-white/80 text-sm mt-1">신청서 접수 진행상황을 확인하세요</p>
            </div>
            
            <div className="p-4 space-y-4">
              {/* 전체 진행률 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">전체 진행률</span>
                  <span className="text-sm text-gray-500">
                    {Math.round(Object.values(progressSteps).reduce((acc, step) => acc + step.progress, 0) / 4)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(Object.values(progressSteps).reduce((acc, step) => acc + step.progress, 0) / 4)}%`
                    }}
                  />
                </div>
              </div>

              {/* 신청서 접수 완료 - 개인정보 동의 확인 */}
              <div className="mt-2 space-y-3 p-4 bg-white rounded-xl border border-gray-200">
                {/* 개인정보동의 상태 표시 (체크박스 제거) */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium text-blue-600">✅ [완료] 개인정보 수집·이용 동의</span>: 신청서 제출 시 이미 동의하셨습니다. 수집 항목(회사명, 담당자 성명, 연락처(이메일·전화), 소재지, 45문항 응답), 수집·이용 목적(AI 역량진단 수행, 결과보고서 발송, 고객 응대), 보유·이용 기간(목적 달성 후 즉시 파기·다만 관련 법령에 따른 의무 보관 기간은 그 기간 동안 보관), 제3자 제공/국외이전(없음), 처리 위탁(이메일 발송 및 클라우드 인프라 운영 등 서비스 제공에 필수적인 범위), 동의 거부 권리 및 불이익(동의를 거부할 수 있으나 서비스 제공이 불가). 문의: hongik423@gmail.com
                  </div>
                </div>
                
                {/* 마케팅동의 상태 표시 (체크박스 제거) */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600">[선택] 마케팅 정보 수신 동의</span>: 신청서 제출 시 선택하신 동의 상태입니다. 수집 항목(이메일, 연락처, 회사명), 목적(AICAMP 교육·세미나·서비스 소식 및 프로모션 안내), 보유 기간(동의 철회 시까지), 철회 방법(이메일 하단 수신거부 또는 hongik423@gmail.com 요청). 선택 동의 미체크 시에도 서비스 이용에는 영향이 없습니다.
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <p className="text-sm text-green-800 font-medium">신청서 제출 시 이미 개인정보 동의를 완료하셨습니다. 이제 이교장이 오프라인에서 분석하여 24시간 내 이메일로 발송됩니다.</p>
                  </div>
                </div>
              </div>



              {/* 단계별 진행상황 */}
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  📊 진단 진행 단계별 현황
                </h4>
              </div>
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
                <p className="text-blue-900 font-medium text-sm">📊 이교장 오프라인 분석 진행 중</p>
                <p className="text-blue-800/80 text-xs mt-1">
                  제출된 45개 항목을 이교장이 직접 분석하여 맞춤형 진단보고서를 작성합니다.
                </p>
                <p className="text-blue-700 text-xs mt-2 font-medium">
                  예상 완료 시간: 24시간 이내 | 완료 시 이메일로 자동 발송됩니다
                </p>
              </div>
              
              {progressData && (
                <div className="text-xs text-gray-500 text-center">
                  신청 ID: {progressData.diagnosisId || diagnosisResult?.diagnosisId}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </>
    );
  }

  // Hydration이 완료되지 않았으면 로딩 표시
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI 역량진단 신청서를 준비 중입니다...</p>
          <p className="text-xs text-gray-400 mt-2">Hydration: {isHydrated ? '완료' : '대기중'}</p>
        </div>
      </div>
    );
  }

  // 기업 정보 입력 폼
  if (showCompanyForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 pt-24 form-container">
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
                  <p className="text-lg font-semibold text-blue-600">45개 행동지표 기반 신청서 작성</p>
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
                      정확한 신청서 작성을 위해 모든 필수 항목을 빠짐없이 작성해 주세요. 
                      작성하신 정보는 이교장의 맞춤형 AI 역량 분석에만 사용됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* 회사명 입력 */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
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
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm
                                placeholder:text-gray-400"
                      placeholder="회사명을 입력하세요"
                    />
                  </div>

                  {/* 담당자명 입력 */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
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
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm
                                placeholder:text-gray-400"
                      placeholder="담당자명을 입력하세요"
                    />
                  </div>

                  {/* 이메일 입력 */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
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
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
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

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      업종
                    </label>
                    <select
                      value={formState.companyInfo.industry}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, industry: e.target.value }
                      }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm"
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
                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                        업종 직접입력
                      </label>
                      <input
                        type="text"
                        value={formState.companyInfo.industryCustom || ''}
                        onChange={(e) => setFormState(prev => ({
                          ...prev,
                          companyInfo: { ...prev.companyInfo, industryCustom: e.target.value }
                        }))}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                  transition-all duration-300 ease-in-out
                                  focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                  hover:border-gray-300 hover:shadow-sm
                                  placeholder:text-gray-400"
                        placeholder="업종을 직접 입력하세요"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      직원수
                    </label>
                    <select
                      value={formState.companyInfo.employeeCount}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, employeeCount: e.target.value }
                      }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm"
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

                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      연매출
                    </label>
                    <select
                      value={formState.companyInfo.annualRevenue}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, annualRevenue: e.target.value }
                      }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm"
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

                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      소재지 (도/특별시/시)
                    </label>
                    <select
                      value={formState.companyInfo.location}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, location: e.target.value }
                      }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg h-[56px] 
                                transition-all duration-300 ease-in-out
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                                hover:border-gray-300 hover:shadow-sm"
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

                  {/* 개인정보 동의 (필수) */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mr-2">필수</span>
                      개인정보 수집·이용 동의
                    </label>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4">
                      <label className="flex items-start gap-3">
                        <Checkbox
                          checked={!!formState.companyInfo.privacyConsent}
                          onCheckedChange={(v) => setFormState(prev => ({
                            ...prev,
                            companyInfo: { ...prev.companyInfo, privacyConsent: v === true }
                          }))}
                        />
                        <span className="text-sm text-gray-700">
                          [필수] 개인정보 수집·이용에 동의합니다. 수집 항목: 회사/담당자/연락처/소재지/45문항 응답. 이용 목적: AI 역량진단 분석 및 결과 발송. 보유 기간: 목적 달성 후 즉시 파기(법령상 보관 의무 제외).
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  {/* 마케팅 정보 수신 동의 (선택) */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold mr-2">선택</span>
                      마케팅 정보 수신 동의
                    </label>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                      <label className="flex items-start gap-3">
                        <Checkbox
                          checked={!!formState.companyInfo.marketingConsent}
                          onCheckedChange={(v) => setFormState(prev => ({
                            ...prev,
                            companyInfo: { ...prev.companyInfo, marketingConsent: v === true }
                          }))}
                        />
                        <span className="text-sm text-gray-600">[선택] AICAMP 교육/세미나/서비스 소식 안내 수신에 동의합니다. 동의하지 않아도 서비스 이용에는 영향이 없습니다.</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleCompanyInfoSubmit}
                  size="lg"
                  disabled={!isCompanyFormValid}
                  className={`px-8 py-3 text-lg ${
                    isCompanyFormValid
                      ? ''
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  신청서 작성 시작 <ArrowRight className="ml-2 h-5 w-5" />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 pt-24 form-container">
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
              <h1 className="text-2xl font-bold text-blue-900">이교장의AI역량진단 신청서</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-lg px-3 py-1">
                {answeredCount}/{REAL_45_QUESTIONS.length}
              </Badge>
              {answeredCount > 0 && (
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                  <span className="mr-1">🎯</span>
                  <span className="font-bold">현재 응답 점수: {Object.values(formState.answers).reduce((sum, score) => sum + score, 0)}점</span>
                </div>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                진행률: {Math.round(progress)}%
              </p>
              {answeredCount < REAL_45_QUESTIONS.length && (
                <div className="flex items-center text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 animate-pulse">
                  <span className="mr-1">⚠️</span>
                  <span className="font-bold">{REAL_45_QUESTIONS.length - answeredCount}개 미답변 (필수)</span>
                </div>
              )}
            </div>
            {answeredCount > 0 && (
              <p className="text-sm text-blue-600 font-medium">
                평균 응답 점수: {(Object.values(formState.answers).reduce((sum, score) => sum + score, 0) / answeredCount).toFixed(1)}점
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
                    currentQuestion?.category === 'businessFoundation' ? 'bg-blue-50 text-blue-700' :
                    currentQuestion?.category === 'currentAI' ? 'bg-green-50 text-green-700' :
                    currentQuestion?.category === 'organizationReadiness' ? 'bg-purple-50 text-purple-700' :
                    currentQuestion?.category === 'techInfrastructure' ? 'bg-indigo-50 text-indigo-700' :
                    currentQuestion?.category === 'goalClarity' ? 'bg-yellow-50 text-yellow-700' :
                    currentQuestion?.category === 'executionCapability' ? 'bg-red-50 text-red-700' :
                    'bg-gray-50 text-gray-700'
                  }>
                    {currentQuestion?.category || '알 수 없음'}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion?.question || '질문을 불러오는 중...'}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* 간소화된 평가 안내 - 평가자가 문항에만 집중할 수 있도록 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <span className="text-blue-600 font-semibold text-sm mr-2">💡</span>
                    <p className="text-blue-700 text-sm">
                      각 문항의 행동지표를 읽고 현재 상황에 맞는 수준을 선택하여 신청서를 작성해주세요.
                    </p>
                  </div>
                </div>

                {/* 질문별 정확한 행동지표 기반 답변 옵션 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    행동지표별 응답 (해당하는 수준을 선택해주세요)
                  </h4>
                  <div className="space-y-3">
                    {currentQuestion && getQuestionBehaviorIndicators(currentQuestion.id).map((indicator) => {
                      const isSelected = formState.answers[currentQuestion.id] === indicator.score;
                      return (
                        <button
                          key={indicator.score}
                          onClick={() => {
                            handleAnswer(currentQuestion.id, indicator.score);
                          }}
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
                <div className="flex justify-between items-center pt-6">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrev} disabled={formState.currentQuestion === 0}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      이전
                    </Button>
                    <Button variant="outline" onClick={resetDiagnosis} className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      처음부터
                    </Button>
                  </div>

                  {formState.currentQuestion === REAL_45_QUESTIONS.length - 1 ? (
                    <Button onClick={() => {
                      if (answeredCount < REAL_45_QUESTIONS.length) {
                        setShowMissingAnswerAlert(true);
                        setTimeout(() => setShowMissingAnswerAlert(false), 3000);
                        return;
                      }
                      handleSubmit();
                    }} disabled={isSubmitting} className={`px-8 transition-all duration-300 ${
                      answeredCount < REAL_45_QUESTIONS.length 
                        ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}>
                      {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />제출 중...</>) : (<><Check className="mr-2 h-4 w-4" />신청서 제출 {answeredCount < REAL_45_QUESTIONS.length && `(${REAL_45_QUESTIONS.length - answeredCount}개 남음)`}</>)}
                    </Button>
                  ) : (
                    <div className="flex flex-col items-end">
                      {currentQuestion && !formState.answers[currentQuestion.id] && (
                        <div className="mb-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 animate-pulse">
                          ⚠️ 점수를 선택해주세요 (필수)
                        </div>
                      )}
                      <Button onClick={handleNext} disabled={!currentQuestion || !formState.answers[currentQuestion.id]} className={`transition-all duration-300 ${
                        !currentQuestion || !formState.answers[currentQuestion.id] 
                          ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed opacity-50' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}>
                        다음
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* 저장 및 미답변 문항 안내 */}
        <div className="mt-6 text-center space-y-3">
          <Button variant="ghost" size="sm" onClick={() => {
            toast({ title: "자동 저장됨", description: "신청서 작성 진행 상황이 자동으로 저장되었습니다." });
          }}>
            <Save className="mr-2 h-4 w-4" />
            신청서 작성 진행상황 자동 저장됨
          </Button>

          {answeredCount < REAL_45_QUESTIONS.length && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={moveToNextUnanswered} className="text-red-600 border-red-200 hover:bg-red-50">
                <ArrowRight className="mr-2 h-4 w-4" />
                미답변 문항으로 이동 ({REAL_45_QUESTIONS.length - answeredCount}개 남음)
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 점수체계 안내 모달 (비활성화) */}
      {/* <ScoreGuideModal isVisible={showScoreGuide} onClose={() => setShowScoreGuide(false)} onStart={handleScoreGuideComplete} /> */}

      {/* 진행 상황 안내 모달 */}
      {showProgressGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold">AI 역량진단 신청서 작성 시작!</span>
              </div>
              <p className="text-white/90 text-sm mt-1">45개 문항으로 신청서 작성을 시작합니다</p>
            </div>
            <div className="p-4 space-y-3 text-sm text-gray-700">
              <div className="rounded-lg border bg-blue-50 border-blue-200 p-3">
                <p className="text-blue-900 font-medium mb-2">📋 신청서 작성 방법 안내</p>
                <ul className="text-blue-800/80 space-y-1 text-xs">
                  <li>• 각 질문을 신중히 읽고 현재 상황에 맞는 점수를 선택하세요</li>
                  <li>• 신청서 작성 진행 상황은 자동으로 저장됩니다</li>
                  <li>• 모든 문항 완료 후 신청서가 접수되어 이교장이 오프라인으로 분석합니다</li>
                  <li>• 24시간 내 이메일로 상세한 진단보고서가 발송됩니다</li>
                </ul>
              </div>
              <div className="text-center">
                <button onClick={() => setShowProgressGuide(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">신청서 작성 시작</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 답변 누락 알림 - 강화된 버전 */}
      {showMissingAnswerAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><span className="text-2xl">⚠️</span></div>
                <div>
                  <h3 className="font-bold text-lg">답변 미완료</h3>
                  <p className="text-red-100 text-sm">모든 문항에 답변해주세요</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{REAL_45_QUESTIONS.length - answeredCount}개</div>
                <p className="text-gray-700 mb-4">문항이 아직 답변되지 않았습니다</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-yellow-800 text-sm"><strong>정확한 신청서 작성</strong>을 위해 모든 문항에 답변이 필요합니다</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowMissingAnswerAlert(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">계속 신청서 작성하기</button>
                <button onClick={() => { setShowMissingAnswerAlert(false); moveToNextUnanswered(); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">미답변 문항으로 자동 이동</button>
              </div>
            </div>
          </div>
        </div>
      )}

              {/* 이교장 직접 상담 신청 모달 */}
        <ConsultationRequestModal
          isOpen={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
          diagnosisData={diagnosisResult}
          companyName={formState.companyInfo.companyName}
          contactEmail={formState.companyInfo.contactEmail}
          contactName={formState.companyInfo.contactName}
          contactPhone={formState.companyInfo.contactPhone}
          initialData={{
            industry: formState.companyInfo.industry,
            inquiryType: 'diagnosis',
            consultationArea: 'diagnosis',
            inquiryContent: `AI 역량진단 신청서 제출 후 이교장 직접 상담을 요청합니다.`
          }}
        />
    </div>
  );
};

export default Real45QuestionForm;
'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Save, Loader2, ArrowRight, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { REAL_45_QUESTIONS } from '../constants/real-45-questions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import EnhancedAddressInput from '@/components/ui/enhanced-address-input';
import PhoneInput from '@/components/ui/phone-input';
import EmailInput from '@/components/ui/email-input';
import EnhancedIndustryInput from '@/components/ui/enhanced-industry-input';
import { CATEGORY_BEHAVIOR_INDICATORS } from '../constants/behavior-indicators';
import {
  getQuestionBehaviorIndicators,
  getScoreBehaviorIndicator
} from '../constants/question-specific-behavior-indicators';
import BehaviorIndicatorCard from './BehaviorIndicatorCard';
import CategoryProgressIndicator from './CategoryProgressIndicator';

interface CompanyInfo {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  customIndustry?: string; // 직접 입력한 업종
  employeeCount: string;
  annualRevenue: string;
  location: string;
}

interface FormState {
  companyInfo: CompanyInfo;
  answers: Record<number, number>;
  currentQuestion: number;
  isCompleted: boolean;
  showCompanyForm: boolean;
  userValidated?: boolean; // 사용자 검증 완료 플래그
  privacyConsent: boolean; // 개인정보 동의 플래그
  marketingConsent: boolean; // 마케팅 동의 플래그 (선택)
}

const EnhancedBehaviorEvaluationForm: React.FC = () => {
  // 모든 Hook을 최상단에 배치하여 순서 보장
  const { toast } = useToast();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    companyInfo: {
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      industry: '',
      customIndustry: '',
      employeeCount: '',
      annualRevenue: '',
      location: ''
    },
    answers: {},
    currentQuestion: 0,
    isCompleted: false,
    showCompanyForm: true,
    userValidated: false,
    privacyConsent: false,
    marketingConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);

  // 현재 질문 정보 (Hook 순서 보장을 위해 최상단 배치)
  const currentQuestionData = REAL_45_QUESTIONS[formState.currentQuestion];
  const currentCategoryData = currentQuestionData ? CATEGORY_BEHAVIOR_INDICATORS[currentQuestionData.category] : null;
  
  // 진행률 계산
  const progress = ((formState.currentQuestion + 1) / REAL_45_QUESTIONS.length) * 100;
  const answeredCount = Object.keys(formState.answers).length;

  // 모든 useEffect Hook들을 최상단에 배치
  // Hydration 완료 후 렌더링 (React 오류 #418, #423 수정)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Hydration 완료 처리 - 새로운 진단은 항상 기본정보부터 시작
  useEffect(() => {
    if (isHydrated) {
      // URL에 특별한 파라미터가 있을 때만 이전 데이터 복원
      const urlParams = new URLSearchParams(window.location.search);
      const continueSession = urlParams.get('continue');
      
      if (continueSession === 'true') {
        // 로컬 스토리지에서 데이터 복원 (continue=true 파라미터가 있을 때만)
        const savedData = localStorage.getItem('enhancedBehaviorEvaluationForm');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            // 24시간 이내의 데이터만 복원
            const saveTime = parsedData.saveTime || 0;
            const now = Date.now();
            const hoursDiff = (now - saveTime) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
              setFormState(parsedData);
              toast({
                title: "이전 진행 상황을 복원했습니다",
                description: "이어서 진단을 진행해주세요.",
                className: "border-purple-200 bg-purple-50 text-purple-900",
              });
            } else {
              // 24시간이 지난 데이터는 삭제
              localStorage.removeItem('enhancedBehaviorEvaluationForm');
            }
          } catch (error) {
            console.error('로컬 스토리지 데이터 복원 실패:', error);
            localStorage.removeItem('enhancedBehaviorEvaluationForm');
          }
        }
      } else {
        // 새로운 진단 시작 - 기존 데이터 초기화
        localStorage.removeItem('enhancedBehaviorEvaluationForm');
        // 초기 상태 확실히 설정
        setFormState({
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
          currentQuestion: 0,
          isCompleted: false,
          showCompanyForm: true,
          userValidated: false,
          privacyConsent: false,
          marketingConsent: false
        });
      }
    }
  }, [isHydrated]);

  // 로컬 스토리지 저장 (Hydration 완료 후에만)
  useEffect(() => {
    if (isHydrated && !formState.showCompanyForm) {
      // 기본정보 입력 완료 후에만 저장 (진행 중인 상태만 저장)
      const dataToSave = {
        ...formState,
        saveTime: Date.now() // 저장 시간 추가
      };
      localStorage.setItem('enhancedBehaviorEvaluationForm', JSON.stringify(dataToSave));
    }
  }, [formState, isHydrated]);

  // 현재 선택된 점수 업데이트
  useEffect(() => {
    if (currentQuestionData) {
      setSelectedScore(formState.answers[currentQuestionData.id] || null);
    }
    
    // Cleanup 함수로 메모리 누수 방지
    return () => {
      setSelectedScore(null);
    };
  }, [formState.currentQuestion, currentQuestionData, formState.answers]);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      // 진행 중인 요청이나 타이머가 있다면 정리
      setIsSubmitting(false);
    };
  }, []);

  // 기업정보 입력 핸들러들
  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string) => {
    setFormState(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value
      }
    }));
  };

  // 기업정보 완료 및 질문 시작 - 강화된 검증 시스템
  const handleStartQuestions = () => {
    const { companyName, contactName, contactEmail, contactPhone, industry, employeeCount, location } = formState.companyInfo;
    
    // 1단계: 필수 필드 검증
    if (!companyName?.trim() || !contactName?.trim() || !contactEmail?.trim() || !contactPhone?.trim() || !industry?.trim() || !employeeCount?.trim() || !location?.trim()) {
      toast({
        title: "⚠️ 필수 정보 누락",
        description: "모든 필수 항목을 정확히 입력해야 AI역량진단을 시작할 수 있습니다.",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900",
        duration: 5000
      });
      return;
    }

    // 개인정보 동의 검증
    if (!formState.privacyConsent) {
      toast({
        title: "⚠️ 개인정보 동의 필수",
        description: "개인정보 수집 및 이용에 동의해야 AI역량진단을 진행할 수 있습니다.",
        variant: "destructive",
        className: "border-red-200 bg-red-50 text-red-900",
        duration: 5000
      });
      return;
    }

    // 2단계: 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      toast({
        title: "📧 이메일 형식 오류",
        description: "올바른 이메일 주소를 입력해주세요. (예: company@domain.com)",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900",
        duration: 5000
      });
      return;
    }

    // 3단계: 연락처 형식 검증
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(contactPhone) || contactPhone.length < 10) {
      toast({
        title: "📞 연락처 형식 오류",
        description: "올바른 연락처를 입력해주세요. (예: 010-1234-5678)",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900",
        duration: 5000
      });
      return;
    }

    // 4단계: 직접입력 업종 확인
    if (industry === '직접입력' && !formState.companyInfo.customIndustry?.trim()) {
      toast({
        title: "🏢 업종 직접입력 필요", 
        description: "업종을 직접 입력해주세요.",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900",
        duration: 5000
      });
      return;
    }

    // 5단계: 회사명 최소 길이 검증
    if (companyName.trim().length < 2) {
      toast({
        title: "🏢 회사명 확인",
        description: "회사명을 2글자 이상 입력해주세요.",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900",
        duration: 5000
      });
      return;
    }

    // 6단계: 담당자명 최소 길이 검증
    if (contactName.trim().length < 2) {
      toast({
        title: "👤 담당자명 확인",
        description: "담당자명을 2글자 이상 입력해주세요.",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900",
        duration: 5000
      });
      return;
    }
    
    // 모든 검증 통과 - 사용자 인증 완료 상태로 설정
    const userSession = {
      companyInfo: formState.companyInfo,
      isValidated: true,
      validatedAt: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // 세션 정보 저장
    sessionStorage.setItem('aicamp_user_session', JSON.stringify(userSession));
    
    // 질문 시작 시 첫 번째 질문(index 0)부터 시작하도록 명시적으로 설정
    setFormState(prev => ({ 
      ...prev, 
      showCompanyForm: false,
      currentQuestion: 0,  // 명시적으로 첫 번째 질문부터 시작
      userValidated: true  // 사용자 검증 완료 플래그
    }));
    
    // 첫 번째 질문의 기존 답변이 있다면 로드
    const firstQuestionId = REAL_45_QUESTIONS[0]?.id;
    if (firstQuestionId && formState.answers[firstQuestionId]) {
      setSelectedScore(formState.answers[firstQuestionId]);
    } else {
      setSelectedScore(null);
    }
    
    // 성공 메시지
    toast({
      title: "🎉 기업정보 등록 완료!",
      description: `${companyName}의 AI역량진단을 시작합니다. 45개 질문에 차례로 답변해주세요.`,
      className: "border-green-200 bg-green-50 text-green-900",
      duration: 4000
    });

    // 0.5초 후 시작 안내
    setTimeout(() => {
      toast({
        title: "🚀 AI역량진단 시작!",
        description: "각 질문을 신중히 읽고 현재 상황에 가장 적합한 점수를 선택해주세요.",
        className: "border-blue-200 bg-blue-50 text-blue-900",
        duration: 3000
      });
    }, 500);
  };

  // 점수 선택 핸들러 - 1회 클릭으로 즉시 다음으로 이동
  const handleScoreSelect = (score: number) => {
    // 즉시 선택된 점수 업데이트
    setSelectedScore(score);
    
    // 답변 저장
    setFormState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestionData.id]: score
      }
    }));
    
    // 시각적 피드백을 위한 짧은 지연 후 즉시 자동 이동 (0.3초로 단축)
    setTimeout(() => {
      // React.startTransition으로 안전한 상태 업데이트
      React.startTransition(() => {
        if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
          const nextQuestionIndex = formState.currentQuestion + 1;
          const nextQuestionId = REAL_45_QUESTIONS[nextQuestionIndex]?.id;
          
          setFormState(prev => ({
            ...prev,
            currentQuestion: nextQuestionIndex
          }));
          
          // 다음 질문의 기존 답변이 있다면 로드, 없다면 null
          setSelectedScore(prev => {
            const existingAnswer = formState.answers[nextQuestionId];
            return existingAnswer || null;
          });
        } else {
          // 마지막 질문인 경우 제출 처리
          handleSubmit();
        }
      });
    }, 200); // 0.2초로 더 단축하여 즉각적인 응답성 제공
  };

  // 다음 질문으로 이동 (React 오류 #418, #423 수정)
  const handleNext = () => {
    if (selectedScore === null) {
      toast({
        title: "점수를 선택해주세요",
        description: "질문에 대한 답변을 선택한 후 다음으로 진행할 수 있습니다.",
        variant: "destructive",
        className: "border-yellow-200 bg-yellow-50 text-yellow-900"
      });
      return;
    }

    // React.startTransition으로 상태 업데이트 안전하게 처리
    React.startTransition(() => {
      if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
        const nextQuestionIndex = formState.currentQuestion + 1;
        const nextQuestionId = REAL_45_QUESTIONS[nextQuestionIndex]?.id;
        
        setFormState(prev => ({
          ...prev,
          currentQuestion: nextQuestionIndex
        }));
        setSelectedScore(formState.answers[nextQuestionId] || null);
      } else {
        // 모든 질문 완료
        handleSubmit();
      }
    });
  };

  // 이전 질문으로 이동 (React 오류 #418, #423 수정)
  const handlePrevious = () => {
    if (formState.currentQuestion > 0) {
      // React.startTransition으로 상태 업데이트 안전하게 처리
      React.startTransition(() => {
        const prevQuestionIndex = formState.currentQuestion - 1;
        const prevQuestionId = REAL_45_QUESTIONS[prevQuestionIndex]?.id;
        
        setFormState(prev => ({
          ...prev,
          currentQuestion: prevQuestionIndex
        }));
        setSelectedScore(formState.answers[prevQuestionId] || null);
      });
    }
  };

  // 진단 제출 - 사용자 검증 확인 포함
  const handleSubmit = async () => {
    // 1단계: 사용자 검증 상태 확인
    const userSession = sessionStorage.getItem('aicamp_user_session');
    if (!userSession || !formState.userValidated) {
      toast({
        title: "🚫 접근 권한 없음",
        description: "기업정보를 먼저 등록해야 AI역량진단 보고서를 받을 수 있습니다.",
        variant: "destructive",
        className: "border-red-200 bg-red-50 text-red-900",
        duration: 5000
      });
      
      // 기업정보 입력 화면으로 돌아가기
      setFormState(prev => ({
        ...prev,
        showCompanyForm: true,
        currentQuestion: 0,
        userValidated: false
      }));
      return;
    }

    // 2단계: 세션 유효성 검증
    try {
      const sessionData = JSON.parse(userSession);
      if (!sessionData.isValidated || !sessionData.companyInfo) {
        throw new Error('Invalid session');
      }
    } catch (error) {
      toast({
        title: "🚫 세션 만료",
        description: "세션이 만료되었습니다. 기업정보를 다시 입력해주세요.",
        variant: "destructive",
        className: "border-red-200 bg-red-50 text-red-900",
        duration: 5000
      });
      
      sessionStorage.removeItem('aicamp_user_session');
      setFormState(prev => ({
        ...prev,
        showCompanyForm: true,
        currentQuestion: 0,
        userValidated: false
      }));
      return;
    }

    // 3단계: 답변 완성도 확인
    if (answeredCount < REAL_45_QUESTIONS.length) {
      toast({
        title: "⚠️ 모든 질문에 답변해주세요",
        description: `${REAL_45_QUESTIONS.length - answeredCount}개 질문이 남아있습니다. 정확한 진단을 위해 모든 질문에 답변해주세요.`,
        variant: "destructive",
        className: "border-yellow-200 bg-yellow-50 text-yellow-900",
        duration: 5000
      });
      return;
    }

    setIsSubmitting(true);
    
    // 단계별 진행 상황 알림 (AICAMP 브랜드 색상 적용)
    const showProgressStep = (step: number, title: string, description: string) => {
      toast({
        title: `[${step}/5] ${title}`,
        description,
        duration: 3000,
        className: "border-indigo-200 bg-indigo-50 text-indigo-900",
      });
    };

    try {
      // 1단계: 분석 시작
      showProgressStep(1, "📊 AI 분석 시작", "45문항 응답 데이터를 수집하고 있습니다...");
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // 사용자가 볼 수 있도록 잠시 대기

      // 2단계: 데이터 처리
      showProgressStep(2, "🧠 GEMINI AI 분석", "GEMINI 2.5 Flash로 역량을 정밀 분석 중입니다...");

      // AI 진단 API 호출
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState.companyInfo,
          answers: formState.answers,
          diagnosisType: 'enhanced-behavior-evaluation',
          questionCount: REAL_45_QUESTIONS.length,
          metadata: {
            completedAt: new Date().toISOString(),
            totalScore: Object.values(formState.answers).reduce((sum, score) => sum + score, 0),
            averageScore: Object.values(formState.answers).reduce((sum, score) => sum + score, 0) / REAL_45_QUESTIONS.length,
            categoryScores: REAL_45_QUESTIONS.reduce((acc, question) => {
              const score = formState.answers[question.id] || 0;
              if (!acc[question.category]) acc[question.category] = [];
              acc[question.category].push(score);
              return acc;
            }, {} as Record<string, number[]>)
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`진단 처리 실패: ${response.status}`);
      }

      // 3단계: 보고서 생성
      showProgressStep(3, "📋 맞춤형 보고서 생성", "업종별 특화 분석 및 SWOT 분석을 작성하고 있습니다...");

      const result = await response.json();
      
      if (result.success) {
        // 4단계: 이메일 준비
        showProgressStep(4, "📧 이메일 발송 준비", "생성된 보고서를 이메일로 발송 준비 중입니다...");
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // 이메일 발송 시뮬레이션
        
        // 5단계: 완료
        showProgressStep(5, "✅ 진단 완료!", "종합 분석 보고서가 이메일로 발송되었습니다!");
        
        // 로컬 스토리지 정리
        localStorage.removeItem('enhancedBehaviorEvaluationForm');
        
        // 완료 상태로 변경
        setFormState(prev => ({ ...prev, isCompleted: true }));
        
        // 최종 성공 토스트 (AICAMP 성공 색상 적용)
        setTimeout(() => {
          toast({
            title: "🎉 AI역량진단 완료!",
            description: "전문가급 분석 보고서를 이메일로 확인하세요. 추가 상담이 필요하시면 언제든 연락주세요.",
            duration: 5000,
            className: "border-green-200 bg-green-50 text-green-900",
          });
        }, 2000);

      } else {
        throw new Error(result.error || '진단 처리 실패');
      }

    } catch (error: any) {
      console.error('진단 제출 오류:', error);
      toast({
        title: "❌ 진단 제출 실패",
        description: `오류가 발생했습니다: ${error.message}. 잠시 후 다시 시도해주세요.`,
        variant: "destructive",
        duration: 5000,
        className: "border-red-200 bg-red-50 text-red-900",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 클라이언트 사이드에서만 렌더링하여 Hydration 오류 방지
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">AI역량진단 시스템 로딩 중...</p>
        </div>
      </div>
    );
  }

  // 진단 완료 화면
  if (formState.isCompleted) {
    const totalScore = Object.values(formState.answers).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / answeredCount;
    const maxPossibleScore = REAL_45_QUESTIONS.length * 5;
    const scorePercentage = (totalScore / maxPossibleScore) * 100;
    
    // 등급 계산
    const getGrade = (percentage: number) => {
      if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' };
      if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bgColor: 'bg-green-100' };
      if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      if (percentage >= 50) return { grade: 'C+', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      return { grade: 'C', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    };
    
    const gradeInfo = getGrade(scorePercentage);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            {/* 완료 아이콘 */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            
            {/* 제목 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🎉 AI역량진단 완료!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {formState.companyInfo.companyName}의 AI 역량 진단이 완료되었습니다
            </p>
            
            {/* 점수 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{totalScore}</div>
                <div className="text-sm text-gray-500">총점 (/{maxPossibleScore})</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}</div>
                <div className="text-sm text-gray-500">평균 점수 (/5.0)</div>
              </div>
              <div className={`${gradeInfo.bgColor} rounded-lg p-4`}>
                <div className={`text-2xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</div>
                <div className="text-sm text-gray-500">AI 역량 등급</div>
              </div>
            </div>
            
            {/* 진행 상황 */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 보고서 처리 현황</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm">45문항 응답 분석 완료</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm">GEMINI AI 역량 분석 완료</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm">맞춤형 SWOT 분석 생성 완료</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm">업종별 특화 보고서 생성 완료</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm">이메일 발송 완료</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 다음 단계 안내 */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2">📧 다음 단계</h3>
              <p className="text-blue-100 mb-4">
                종합 분석 보고서가 <strong>{formState.companyInfo.contactEmail}</strong>로 발송되었습니다.<br/>
                보고서에는 다음 내용이 포함되어 있습니다:
              </p>
              <ul className="text-sm text-blue-100 space-y-1 text-left max-w-md mx-auto">
                <li>• 6개 영역별 상세 역량 분석</li>
                <li>• SWOT 분석 및 개선 방향</li>
                <li>• 업종별 맞춤 AI 도입 전략</li>
                <li>• 단계별 실행 로드맵</li>
                <li>• AICAMP 교육 프로그램 추천</li>
              </ul>
            </div>
            
            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/consultation'}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                전문가 상담 신청
              </Button>
              <Button
                onClick={() => window.location.href = '/services'}
                variant="outline"
                size="lg"
              >
                AICAMP 프로그램 보기
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="ghost"
                size="lg"
              >
                메인으로 돌아가기
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 기업정보 입력 폼 렌더링
  if (formState.showCompanyForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {!imageError ? (
                <img 
                  src="/images/aicamp_leader.png" 
                  alt="이교장" 
                  className="w-16 h-16 rounded-full mr-4 shadow-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-16 h-16 rounded-full mr-4 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  이
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                이교장의AI역량진단
              </h1>
            </div>
          </div>

          {/* 기업정보 입력 폼 */}
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
              <CardTitle className="text-2xl flex items-center font-bold">
                <span className="text-3xl mr-3">🏢</span>
                기업 정보 등록
              </CardTitle>
              <p className="text-blue-100 text-base mt-3 leading-relaxed">
                정확한 AI역량진단을 위해 기업정보를 입력해주세요.
                <br/>입력하신 정보는 안전하게 보호되며, 맞춤형 진단 보고서 작성에만 사용됩니다.
              </p>
            </CardHeader>
            <CardContent className="p-8 bg-gray-50">
              <div className="space-y-8">
                {/* 회사명 입력 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>
                      회사명
                    </Label>
                    <Input
                      id="companyName"
                      value={formState.companyInfo.companyName}
                      onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
                      placeholder="회사명을 입력하세요"
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                {/* 담당자 정보 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">담당자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-1">*</span>
                        담당자명
                      </Label>
                      <Input
                        id="contactName"
                        value={formState.companyInfo.contactName}
                        onChange={(e) => handleCompanyInfoChange('contactName', e.target.value)}
                        placeholder="담당자명을 입력하세요"
                        className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-1">*</span>
                        이메일
                      </Label>
                      <EmailInput
                        value={formState.companyInfo.contactEmail}
                        onChange={(value) => handleCompanyInfoChange('contactEmail', value)}
                        placeholder="이메일 주소를 입력하세요"
                        className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 연락처 및 업종 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">연락처 및 업종</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-1">*</span>
                        연락처
                      </Label>
                      <PhoneInput
                        value={formState.companyInfo.contactPhone}
                        onChange={(value) => handleCompanyInfoChange('contactPhone', value)}
                        placeholder="숫자만 입력하세요"
                        clearOnFocus
                        className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-1">*</span>
                        업종
                      </Label>
                      <EnhancedIndustryInput
                        value={formState.companyInfo.industry}
                        onChange={(value) => handleCompanyInfoChange('industry', value)}
                        customIndustry={formState.companyInfo.customIndustry}
                        onCustomIndustryChange={(value) => handleCompanyInfoChange('customIndustry', value)}
                        placeholder="업종을 선택하세요"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* 직원수 및 지역 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">기업 규모 및 위치</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="employeeCount" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-1">*</span>
                        직원 수
                      </Label>
                      <Select value={formState.companyInfo.employeeCount} onValueChange={(value) => handleCompanyInfoChange('employeeCount', value)}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="직원 수를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-4명">1-4명</SelectItem>
                          <SelectItem value="5-9명">5-9명</SelectItem>
                          <SelectItem value="10-19명">10-19명</SelectItem>
                          <SelectItem value="20-49명">20-49명</SelectItem>
                          <SelectItem value="50-99명">50-99명</SelectItem>
                          <SelectItem value="100-299명">100-299명</SelectItem>
                          <SelectItem value="300명 이상">300명 이상</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-1">*</span>
                        지역
                      </Label>
                      <EnhancedAddressInput
                        value={formState.companyInfo.location}
                        onChange={(value) => handleCompanyInfoChange('location', value)}
                        placeholder="지역을 선택하세요"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">개인정보 수집 및 이용 동의</h3>
                  
                  <div className="space-y-4">
                    {/* 필수 동의 */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy-consent"
                        checked={formState.privacyConsent}
                        onCheckedChange={(checked) => 
                          setFormState(prev => ({ ...prev, privacyConsent: !!checked }))
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor="privacy-consent" 
                          className="text-sm font-medium text-gray-700 cursor-pointer flex items-center"
                        >
                          <span className="text-red-500 mr-1">*</span>
                          개인정보 수집 및 이용에 동의합니다 (필수)
                        </Label>
                        <div className="text-xs text-gray-500 mt-1 bg-white p-3 rounded border">
                          <p className="font-medium mb-1">수집목적: AI 역량진단 서비스 제공 및 결과 보고서 발송</p>
                          <p className="mb-1">수집항목: 회사명, 담당자명, 이메일, 연락처, 업종, 직원수, 소재지</p>
                          <p className="mb-1">보유기간: 서비스 완료 후 1년</p>
                          <p>※ 개인정보 수집에 동의하지 않을 권리가 있으나, 동의 거부 시 서비스 이용이 제한됩니다.</p>
                        </div>
                      </div>
                    </div>

                    {/* 선택 동의 */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="marketing-consent"
                        checked={formState.marketingConsent}
                        onCheckedChange={(checked) => 
                          setFormState(prev => ({ ...prev, marketingConsent: !!checked }))
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor="marketing-consent" 
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          마케팅 정보 수신에 동의합니다 (선택)
                        </Label>
                        <div className="text-xs text-gray-500 mt-1">
                          AI 교육 프로그램, 세미나, 컨설팅 서비스 관련 정보를 이메일로 받아보실 수 있습니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 시작 버튼 */}
                <div className="pt-4">
                  <Button
                    onClick={handleStartQuestions}
                    disabled={!formState.privacyConsent}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    AI 역량진단 시작하기
                  </Button>
                </div>
                
                {/* 안내 메시지 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 text-xl mt-1">ℹ️</span>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p className="font-semibold">안내사항</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>모든 필수 항목(*)을 입력해주세요</li>
                        <li>진단 완료 후 맞춤형 AI 역량진단 보고서가 이메일로 발송됩니다</li>
                        <li>입력하신 정보는 안전하게 보호되며 진단 목적으로만 사용됩니다</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 메인 진단 화면 렌더링
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {!imageError ? (
              <img 
                src="/images/aicamp_leader.png" 
                alt="이교장" 
                className="w-20 h-20 rounded-full mr-4 shadow-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-20 h-20 rounded-full mr-4 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                이
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              이교장의AI역량진단보고서
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            행동지표 기반 정밀 평가
          </h2>
          <p className="text-gray-600">
            각 질문에 대해 현재 조직의 행동 수준을 정확히 평가해주세요
          </p>
        </div>

        {/* 진행률 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                진행률: {formState.currentQuestion + 1} / {REAL_45_QUESTIONS.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% 완료
              </span>
            </div>
            <Progress value={progress} className="w-full h-2" />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>답변 완료: {answeredCount}개</span>
              <span>남은 질문: {REAL_45_QUESTIONS.length - answeredCount}개</span>
            </div>
          </CardContent>
        </Card>

        {/* 메인 질문 카드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={formState.currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{currentCategoryData?.icon}</span>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {currentQuestionData.section} - {formState.currentQuestion + 1}번
                      </Badge>
                      <CardTitle className="text-xl">
                        {currentCategoryData?.title}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">가중치</div>
                    <div className="text-lg font-bold">{currentQuestionData.weight}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {currentQuestionData.question}
                  </h3>
                  {currentQuestionData.description && (
                    <p className="text-gray-600 text-sm">
                      {currentQuestionData.description}
                    </p>
                  )}
                </div>

                {/* 45문항 개별 행동지표 기반 점수 선택 (질문별 지표 우선) */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    행동지표별 평가 (질문별 맞춤 지표에서 선택하세요)
                  </h4>

                  <div className="grid gap-3">
                    {getQuestionBehaviorIndicators(currentQuestionData.id).map((indicator, index) => {
                      return (
                        <motion.div
                          key={indicator.score}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                            hover:shadow-lg hover:scale-[1.02]
                            ${
                              selectedScore === indicator.score
                                ? `${indicator.bgColor} border-blue-500 shadow-md`
                                : 'bg-white border-gray-200 hover:border-blue-300'
                            }
                          `}
                          onClick={() => handleScoreSelect(indicator.score)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center
                                text-xl font-bold
                                ${
                                  selectedScore === indicator.score
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }
                              `}>
                                {indicator.score}
                              </div>
                            </div>

                            <div className="flex-grow">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`font-semibold ${indicator.color}`}>
                                  {indicator.label}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {indicator.keyword}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">
                                {indicator.description}
                              </p>

                              {indicator.actionItems?.length ? (
                                <div className="mt-2 pl-4 border-l-2 border-gray-200">
                                  <ul className="space-y-1">
                                    {indicator.actionItems.slice(0, 2).map((item, idx) => (
                                      <li key={idx} className="text-xs text-gray-500 flex items-start">
                                        <span className="mr-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                            </div>

                            {selectedScore === indicator.score && (
                              <div className="flex-shrink-0">
                                <Check className="w-6 h-6 text-blue-500" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 선택된 점수 요약 - 개선된 버전 */}
                {selectedScore && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-900">선택하신 평가 내용</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
                          {selectedScore}점
                        </Badge>
                        <span className="text-blue-800 font-medium">
                          {getScoreBehaviorIndicator(currentQuestionData.id, selectedScore)?.label || getEnhancedBehaviorIndicator(selectedScore)?.label || getOriginalScoreBehaviorIndicator(selectedScore).label}
                        </span>
                      </div>
                      
                      {(() => {
                        const questionIndicator = getScoreBehaviorIndicator(currentQuestionData.id, selectedScore);
                        if (questionIndicator) {
                          return (
                            <div className={`p-4 rounded-lg border ${questionIndicator.bgColor}`}>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <span className={`font-semibold ${questionIndicator.color}`}>
                                    {questionIndicator.keyword}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {questionIndicator.description}
                                </p>
                                <div className="space-y-2">
                                  <h4 className="font-medium text-gray-800">구체적 행동 항목:</h4>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {questionIndicator.actionItems.map((item, index) => (
                                      <li key={index} className="flex items-start space-x-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="pt-2 border-t border-gray-200">
                                  <p className="text-sm font-medium text-gray-800">기대 결과:</p>
                                  <p className="text-sm text-gray-600">{questionIndicator.expectedOutcome}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        
                        // Fallback to enhanced category indicator
                        const enhancedIndicator = getEnhancedCategoryIndicator(currentQuestionData.category, selectedScore);
                        if (enhancedIndicator?.indicator) {
                          return (
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                {enhancedIndicator.indicator.keyword}
                              </p>
                              <p className="text-xs text-gray-600">
                                {enhancedIndicator.indicator.description}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* 네비게이션 */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={formState.currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                const dataToSave = {
                  ...formState,
                  saveTime: Date.now()
                };
                localStorage.setItem('enhancedBehaviorEvaluationForm', JSON.stringify(dataToSave));
                toast({
                  title: "진행상황이 저장되었습니다",
                  description: "언제든 돌아와서 이어서 진행할 수 있습니다. (24시간 내 유효)",
                  className: "border-purple-200 bg-purple-50 text-purple-900",
                });
              }}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>저장</span>
            </Button>

            {formState.currentQuestion === REAL_45_QUESTIONS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={selectedScore === null || isSubmitting}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>{isSubmitting ? '제출 중...' : '진단 완료'}</span>
              </Button>
            ) : (
              <div className="text-sm text-gray-500 italic animate-pulse">
                점수 선택 시 자동으로 다음 질문으로 이동합니다
              </div>
            )}
          </div>
        </div>

        {/* 진행 상황 요약 */}
        <div className="mt-6">
          <CategoryProgressIndicator 
            answers={formState.answers}
            questions={REAL_45_QUESTIONS}
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedBehaviorEvaluationForm;
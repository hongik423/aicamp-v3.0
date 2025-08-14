'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, RotateCcw, Save, Loader2, ArrowRight, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { REAL_45_QUESTIONS, RealQuestion } from '../constants/real-45-questions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddressInput from '@/components/ui/address-input';
import PhoneInput from '@/components/ui/phone-input';
import EmailInput from '@/components/ui/email-input';
import { 
  BEHAVIOR_INDICATORS, 
  CATEGORY_BEHAVIOR_INDICATORS,
  getScoreBehaviorIndicator,
  getCategoryBehaviorIndicator,
  getScoreColor,
  getScoreIcon,
  BehaviorIndicator 
} from '../constants/behavior-indicators';
import BehaviorIndicatorCard from './BehaviorIndicatorCard';
import CategoryProgressIndicator from './CategoryProgressIndicator';

interface CompanyInfo {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
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
      employeeCount: '',
      annualRevenue: '',
      location: ''
    },
    answers: {},
    currentQuestion: 0,
    isCompleted: false,
    showCompanyForm: true
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
          showCompanyForm: true
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

  // 기업정보 완료 및 질문 시작
  const handleStartQuestions = () => {
    const { companyName, contactName, contactEmail, contactPhone, industry, employeeCount, location } = formState.companyInfo;
    
    if (!companyName || !contactName || !contactEmail || !contactPhone || !industry || !employeeCount || !location.trim()) {
      toast({
        title: "필수 정보 누락",
        description: "필수 항목을 모두 입력해주세요.",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900"
      });
      return;
    }

    // 직접입력 선택시 내용 확인
    if (industry === '직접입력' && !formState.companyInfo.industryCustom?.trim()) {
      toast({
        title: "업종 직접입력 필요", 
        description: "업종을 직접 입력해주세요.",
        variant: "destructive",
        className: "border-orange-200 bg-orange-50 text-orange-900"
      });
      return;
    }
    
    // 질문 시작 시 첫 번째 질문(index 0)부터 시작하도록 명시적으로 설정
    setFormState(prev => ({ 
      ...prev, 
      showCompanyForm: false,
      currentQuestion: 0  // 명시적으로 첫 번째 질문부터 시작
    }));
    
    // 첫 번째 질문의 기존 답변이 있다면 로드
    const firstQuestionId = REAL_45_QUESTIONS[0]?.id;
    if (firstQuestionId && formState.answers[firstQuestionId]) {
      setSelectedScore(formState.answers[firstQuestionId]);
    } else {
      setSelectedScore(null);
    }
    
    toast({
      title: "🚀 AI역량진단 시작!",
      description: "45개 질문에 차례로 답변해주세요.",
      className: "border-blue-200 bg-blue-50 text-blue-900",
    });
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
    }, 300); // 0.3초로 단축하여 더 빠른 반응성 제공
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

  // 진단 제출
  const handleSubmit = async () => {
    if (answeredCount < REAL_45_QUESTIONS.length) {
      toast({
        title: "모든 질문에 답변해주세요",
        description: `${REAL_45_QUESTIONS.length - answeredCount}개 질문이 남아있습니다.`,
        variant: "destructive",
        className: "border-yellow-200 bg-yellow-50 text-yellow-900"
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
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardTitle className="text-xl">기업 정보 입력</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">회사명 *</Label>
                  <Input
                    id="companyName"
                    value={formState.companyInfo.companyName}
                    onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
                    placeholder="회사명을 입력하세요"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">담당자명 *</Label>
                    <Input
                      id="contactName"
                      value={formState.companyInfo.contactName}
                      onChange={(e) => handleCompanyInfoChange('contactName', e.target.value)}
                      placeholder="담당자명"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">이메일 *</Label>
                    <EmailInput
                      value={formState.companyInfo.contactEmail}
                      onChange={(value) => handleCompanyInfoChange('contactEmail', value)}
                      placeholder="이메일 주소"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">연락처 *</Label>
                    <PhoneInput
                      value={formState.companyInfo.contactPhone}
                      onChange={(value) => handleCompanyInfoChange('contactPhone', value)}
                      placeholder="연락처"
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">업종 *</Label>
                    <Select value={formState.companyInfo.industry} onValueChange={(value) => handleCompanyInfoChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="업종 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="제조업">제조업</SelectItem>
                        <SelectItem value="서비스업">서비스업</SelectItem>
                        <SelectItem value="IT/소프트웨어">IT/소프트웨어</SelectItem>
                        <SelectItem value="유통/도소매">유통/도소매</SelectItem>
                        <SelectItem value="건설업">건설업</SelectItem>
                        <SelectItem value="금융업">금융업</SelectItem>
                        <SelectItem value="교육업">교육업</SelectItem>
                        <SelectItem value="의료업">의료업</SelectItem>
                        <SelectItem value="직접입력">직접입력</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeCount">직원 수 *</Label>
                    <Select value={formState.companyInfo.employeeCount} onValueChange={(value) => handleCompanyInfoChange('employeeCount', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="직원 수 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5명">1-5명</SelectItem>
                        <SelectItem value="6-20명">6-20명</SelectItem>
                        <SelectItem value="21-50명">21-50명</SelectItem>
                        <SelectItem value="51-100명">51-100명</SelectItem>
                        <SelectItem value="101-300명">101-300명</SelectItem>
                        <SelectItem value="301명 이상">301명 이상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">지역 *</Label>
                    <AddressInput
                      value={formState.companyInfo.location}
                      onChange={(value) => handleCompanyInfoChange('location', value)}
                      placeholder="지역 선택"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartQuestions}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                AI역량진단 시작하기
              </Button>
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
              이교장의AI역량진단
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

                {/* 행동지표 기반 점수 선택 */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    행동지표별 평가 (점수를 선택해주세요)
                  </h4>

                  <div className="grid gap-4">
                    {BEHAVIOR_INDICATORS.map((indicator, index) => (
                      <BehaviorIndicatorCard
                        key={indicator.score}
                        indicator={indicator}
                        category={currentQuestionData.category}
                        isSelected={selectedScore === indicator.score}
                        onSelect={handleScoreSelect}
                        index={index}
                        questionId={currentQuestionData.id}
                      />
                    ))}
                  </div>
                </div>

                {/* 선택된 점수 요약 */}
                {selectedScore && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">선택한 평가</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {selectedScore}점
                      </Badge>
                      <span className="text-blue-800">
                        {getScoreBehaviorIndicator(selectedScore).label}
                      </span>
                      <span className="text-blue-600">
                        {getCategoryBehaviorIndicator(currentQuestionData.category, selectedScore)?.keyword}
                      </span>
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
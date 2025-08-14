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

  // 현재 질문 정보
  const currentQuestionData = REAL_45_QUESTIONS[formState.currentQuestion];
  const currentCategoryData = currentQuestionData ? CATEGORY_BEHAVIOR_INDICATORS[currentQuestionData.category] : null;

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
        variant: "destructive"
      });
      return;
    }

    // 직접입력 선택시 내용 확인
    if (industry === '직접입력' && !formState.companyInfo.industryCustom?.trim()) {
      toast({
        title: "업종 직접입력 필요", 
        description: "업종을 직접 입력해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    setFormState(prev => ({ ...prev, showCompanyForm: false }));
  };

  // 진행률 계산
  const progress = ((formState.currentQuestion + 1) / REAL_45_QUESTIONS.length) * 100;
  const answeredCount = Object.keys(formState.answers).length;

  // 점수 선택 핸들러 - 선택 즉시 다음으로 이동
  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    setFormState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestionData.id]: score
      }
    }));
    
    // 0.5초 후 자동으로 다음 질문으로 이동
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  // 다음 질문으로 이동
  const handleNext = () => {
    if (selectedScore === null) {
      toast({
        title: "점수를 선택해주세요",
        description: "질문에 대한 답변을 선택한 후 다음으로 진행할 수 있습니다.",
        variant: "destructive"
      });
      return;
    }

    if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
      setFormState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
      setSelectedScore(formState.answers[REAL_45_QUESTIONS[formState.currentQuestion + 1]?.id] || null);
    } else {
      // 모든 질문 완료
      handleSubmit();
    }
  };

  // 이전 질문으로 이동
  const handlePrevious = () => {
    if (formState.currentQuestion > 0) {
      setFormState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
      setSelectedScore(formState.answers[REAL_45_QUESTIONS[formState.currentQuestion - 1]?.id] || null);
    }
  };

  // 진단 제출
  const handleSubmit = async () => {
    if (answeredCount < REAL_45_QUESTIONS.length) {
      toast({
        title: "모든 질문에 답변해주세요",
        description: `${REAL_45_QUESTIONS.length - answeredCount}개 질문이 남아있습니다.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // 실제 진행 상황 표시
    const showProgress = (title: string, description: string) => {
      toast({
        title,
        description,
      });
    };
    
    try {
      // 1단계: 데이터 준비
      showProgress("📊 진단 데이터 준비 중...", "평가 결과를 분석하고 있습니다.");
      
      const diagnosisData = {
        // 기업 정보
        companyName: formState.companyInfo.companyName,
        contactName: formState.companyInfo.contactName,
        contactEmail: formState.companyInfo.contactEmail,
        contactPhone: formState.companyInfo.contactPhone,
        industry: formState.companyInfo.industry,
        industryCustom: formState.companyInfo.industryCustom,
        employeeCount: formState.companyInfo.employeeCount,
        annualRevenue: formState.companyInfo.annualRevenue,
        location: formState.companyInfo.location,
        
        // 45문항 응답 (기존 API 호환 배열 형태)
        assessmentResponses: REAL_45_QUESTIONS.map(q => formState.answers[q.id] || 3),
        
        // 추가 메타데이터
        timestamp: new Date().toISOString(),
        formVersion: 'EnhancedBehaviorEvaluation',
        totalQuestions: REAL_45_QUESTIONS.length
      };

      // 2단계: AI 분석
      setTimeout(() => {
        showProgress("🤖 AI 분석 진행 중...", "GEMINI AI가 맞춤형 보고서를 작성하고 있습니다.");
      }, 1000);

      // API 호출
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diagnosisData),
      });

      const result = await response.json();

      if (result.success) {
        // 3단계: 보고서 생성 완료
        showProgress("✅ 보고서 생성 완료!", "맥킨지 스타일의 전문 보고서가 작성되었습니다.");
        
        // 4단계: 이메일 발송
        setTimeout(() => {
          showProgress("📧 이메일 발송 중...", "관리자와 신청자에게 보고서를 발송하고 있습니다.");
        }, 500);
        
        // 로컬 스토리지 정리
        localStorage.removeItem('enhancedBehaviorEvaluationForm');
        
        // 5단계: 결과 페이지로 이동
        setTimeout(() => {
          // 결과 데이터를 세션 스토리지에 저장
          sessionStorage.setItem('diagnosisResult', JSON.stringify(result));
          window.location.href = '/diagnosis/result';
        }, 2000);
        
      } else {
        throw new Error(result.error || '진단 처리 실패');
      }
    } catch (error: any) {
      console.error('진단 제출 오류:', error);
      toast({
        title: "제출 오류",
        description: error.message || "진단 제출 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hydration 완료 처리
  useEffect(() => {
    setIsHydrated(true);
    
    // 로컬 스토리지에서 데이터 복원 (클라이언트에서만)
    const savedData = localStorage.getItem('enhancedBehaviorEvaluationForm');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormState(parsedData);
      } catch (error) {
        console.error('로컬 스토리지 데이터 복원 실패:', error);
      }
    }
  }, []);

  // 로컬 스토리지 저장 (Hydration 완료 후에만)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('enhancedBehaviorEvaluationForm', JSON.stringify(formState));
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
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              기업 정보 입력
            </h2>
            <p className="text-gray-600">
              정확한 진단을 위해 기업 정보를 입력해주세요
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardTitle className="text-xl">기업 기본 정보</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* 회사명 */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  회사명 *
                </Label>
                <Input
                  id="companyName"
                  placeholder="회사명을 입력해주세요"
                  value={formState.companyInfo.companyName}
                  onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* 담당자 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">
                    담당자명 *
                  </Label>
                  <Input
                    id="contactName"
                    placeholder="담당자명을 입력해주세요"
                    value={formState.companyInfo.contactName}
                    onChange={(e) => handleCompanyInfoChange('contactName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">
                    연락처 *
                  </Label>
                  <PhoneInput
                    value={formState.companyInfo.contactPhone}
                    onChange={(phone) => handleCompanyInfoChange('contactPhone', phone)}
                    placeholder="연락처를 입력해주세요"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">
                  이메일 *
                </Label>
                <EmailInput
                  value={formState.companyInfo.contactEmail}
                  onChange={(email) => handleCompanyInfoChange('contactEmail', email)}
                  placeholder="이메일을 입력해주세요"
                />
              </div>

              {/* 업종 */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                  업종 *
                </Label>
                <Select 
                  value={formState.companyInfo.industry} 
                  onValueChange={(value) => handleCompanyInfoChange('industry', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="업종을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="제조업">제조업</SelectItem>
                    <SelectItem value="서비스업">서비스업</SelectItem>
                    <SelectItem value="IT/소프트웨어">IT/소프트웨어</SelectItem>
                    <SelectItem value="금융업">금융업</SelectItem>
                    <SelectItem value="유통업">유통업</SelectItem>
                    <SelectItem value="건설업">건설업</SelectItem>
                    <SelectItem value="교육업">교육업</SelectItem>
                    <SelectItem value="의료업">의료업</SelectItem>
                    <SelectItem value="직접입력">직접입력</SelectItem>
                  </SelectContent>
                </Select>
                
                {formState.companyInfo.industry === '직접입력' && (
                  <Input
                    placeholder="업종을 직접 입력해주세요"
                    value={formState.companyInfo.industryCustom || ''}
                    onChange={(e) => handleCompanyInfoChange('industryCustom', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>

              {/* 직원 수 및 매출 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-sm font-medium text-gray-700">
                    직원 수 *
                  </Label>
                  <Select 
                    value={formState.companyInfo.employeeCount} 
                    onValueChange={(value) => handleCompanyInfoChange('employeeCount', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="직원 수를 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10명">1-10명</SelectItem>
                      <SelectItem value="11-50명">11-50명</SelectItem>
                      <SelectItem value="51-100명">51-100명</SelectItem>
                      <SelectItem value="101-300명">101-300명</SelectItem>
                      <SelectItem value="301-1000명">301-1000명</SelectItem>
                      <SelectItem value="1000명 이상">1000명 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue" className="text-sm font-medium text-gray-700">
                    연 매출
                  </Label>
                  <Select 
                    value={formState.companyInfo.annualRevenue} 
                    onValueChange={(value) => handleCompanyInfoChange('annualRevenue', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="연 매출을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10억 미만">10억 미만</SelectItem>
                      <SelectItem value="10억-50억">10억-50억</SelectItem>
                      <SelectItem value="50억-100억">50억-100억</SelectItem>
                      <SelectItem value="100억-500억">100억-500억</SelectItem>
                      <SelectItem value="500억-1000억">500억-1000억</SelectItem>
                      <SelectItem value="1000억 이상">1000억 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 주소 */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  회사 주소 *
                </Label>
                <AddressInput
                  value={formState.companyInfo.location}
                  onChange={(address) => handleCompanyInfoChange('location', address)}
                  placeholder="회사 주소를 입력해주세요"
                />
              </div>

              {/* 시작 버튼 */}
              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleStartQuestions}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  AI 역량진단 시작하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Hydration이 완료되지 않았거나 현재 질문 데이터가 없으면 로딩 표시
  if (!isHydrated || !currentQuestionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI 역량진단을 준비 중입니다...</p>
        </div>
      </div>
    );
  }

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
                localStorage.setItem('enhancedBehaviorEvaluationForm', JSON.stringify(formState));
                toast({
                  title: "진행상황이 저장되었습니다",
                  description: "언제든 돌아와서 이어서 진행할 수 있습니다.",
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

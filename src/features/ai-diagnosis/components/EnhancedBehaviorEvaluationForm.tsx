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

  // Hydration 완료 처리
  useEffect(() => {
    if (isHydrated) {
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
    }
  }, [isHydrated]);

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

  // 다음 질문으로 이동 (React 오류 #418, #423 수정)
  const handleNext = () => {
    if (selectedScore === null) {
      toast({
        title: "점수를 선택해주세요",
        description: "질문에 대한 답변을 선택한 후 다음으로 진행할 수 있습니다.",
        variant: "destructive"
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
      showProgress("📊 AI 분석 시작", "45문항 응답을 종합 분석 중입니다...");

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

      const result = await response.json();
      
      if (result.success) {
        showProgress("✅ 분석 완료", "맞춤형 보고서가 생성되었습니다!");
        
        // 로컬 스토리지 정리
        localStorage.removeItem('enhancedBehaviorEvaluationForm');
        
        // 완료 상태로 변경
        setFormState(prev => ({ ...prev, isCompleted: true }));
        
        // 성공 토스트
        toast({
          title: "🎉 AI역량진단 완료!",
          description: "종합 분석 보고서가 이메일로 발송됩니다.",
        });

      } else {
        throw new Error(result.error || '진단 처리 실패');
      }

    } catch (error: any) {
      console.error('진단 제출 오류:', error);
      toast({
        title: "진단 제출 실패",
        description: error.message || "잠시 후 다시 시도해주세요.",
        variant: "destructive"
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 AI역량진단 완료!
            </h1>
            <p className="text-gray-600 mb-6">
              45문항 정밀 진단이 성공적으로 완료되었습니다.<br/>
              종합 분석 보고서가 이메일로 발송됩니다.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
              <div>총 문항 수: {REAL_45_QUESTIONS.length}개</div>
              <div>답변 완료: {answeredCount}개</div>
              <div>평균 점수: {(Object.values(formState.answers).reduce((sum, score) => sum + score, 0) / answeredCount).toFixed(1)}점</div>
              <div>총점: {Object.values(formState.answers).reduce((sum, score) => sum + score, 0)}점</div>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              메인으로 돌아가기
            </Button>
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
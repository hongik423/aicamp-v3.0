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
}

const EnhancedBehaviorEvaluationForm: React.FC = () => {
  const { toast } = useToast();
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
    isCompleted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  // 현재 질문 정보
  const currentQuestionData = REAL_45_QUESTIONS[formState.currentQuestion];
  const currentCategoryData = currentQuestionData ? CATEGORY_BEHAVIOR_INDICATORS[currentQuestionData.category] : null;

  // 진행률 계산
  const progress = ((formState.currentQuestion + 1) / REAL_45_QUESTIONS.length) * 100;
  const answeredCount = Object.keys(formState.answers).length;

  // 점수 선택 핸들러
  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    setFormState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestionData.id]: score
      }
    }));
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
    try {
      // 진단 데이터 구성
      const diagnosisData = {
        ...formState.companyInfo,
        assessmentResponses: REAL_45_QUESTIONS.map(q => formState.answers[q.id] || 0),
        timestamp: new Date().toISOString()
      };

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
        toast({
          title: "진단이 완료되었습니다!",
          description: "결과가 이메일로 발송됩니다.",
        });
        setFormState(prev => ({ ...prev, isCompleted: true }));
        localStorage.removeItem('enhancedBehaviorEvaluationForm');
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

  // 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem('enhancedBehaviorEvaluationForm', JSON.stringify(formState));
  }, [formState]);

  // 현재 선택된 점수 업데이트
  useEffect(() => {
    if (currentQuestionData) {
      setSelectedScore(formState.answers[currentQuestionData.id] || null);
    }
  }, [formState.currentQuestion, currentQuestionData, formState.answers]);

  if (!currentQuestionData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧠 AI 역량진단 - 행동지표 평가
          </h1>
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
                        → {getCategoryBehaviorIndicator(currentQuestionData.category, selectedScore)?.keyword}
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
              <Button
                onClick={handleNext}
                disabled={selectedScore === null}
                className="flex items-center space-x-2"
              >
                <span>다음</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
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

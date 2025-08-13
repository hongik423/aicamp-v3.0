'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, RotateCcw, Save, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { REAL_45_QUESTIONS, RealQuestion } from '../constants/real-45-questions';

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
  answers: Record<number, number>; // questionId -> score
  currentQuestion: number;
  isCompleted: boolean;
}

const Real45QuestionForm: React.FC = () => {
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
    currentQuestion: -1, // -1 = 기업정보 입력, 0-44 = 질문
    isCompleted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(true);

  // 진행률 계산
  const progress = formState.currentQuestion === -1 ? 0 : 
    ((formState.currentQuestion + 1) / REAL_45_QUESTIONS.length) * 100;
  
  // 답변 완료된 문항 수
  const answeredCount = Object.keys(formState.answers).length;
  
  // 현재 질문
  const currentQ = formState.currentQuestion >= 0 ? REAL_45_QUESTIONS[formState.currentQuestion] : null;

  // 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem('ai-diagnosis-45q', JSON.stringify(formState));
  }, [formState]);

  // 로컬 스토리지 복원
  useEffect(() => {
    const saved = localStorage.getItem('ai-diagnosis-45q');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormState(parsed);
        setShowCompanyForm(parsed.currentQuestion === -1);
      } catch (error) {
        console.error('저장된 데이터 복원 실패:', error);
      }
    }
  }, []);

  // 기업정보 입력 완료
  const handleCompanyInfoSubmit = () => {
    const { companyName, contactName, contactEmail, industry, employeeCount } = formState.companyInfo;
    
    if (!companyName || !contactName || !contactEmail || !industry || !employeeCount) {
      toast({
        title: "필수 정보 누락",
        description: "필수 항목을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    setFormState(prev => ({ ...prev, currentQuestion: 0 }));
    setShowCompanyForm(false);
    
    toast({
      title: "기업정보 저장 완료",
      description: "이제 45문항 진단을 시작합니다!",
    });
  };

  // 답변 선택
  const handleAnswerSelect = (questionId: number, score: number) => {
    setFormState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: score }
    }));
    
    // 자동으로 다음 질문으로 이동 (0.5초 후)
    setTimeout(() => {
      if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
        setFormState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
      } else {
        // 마지막 질문 완료
        setFormState(prev => ({ ...prev, isCompleted: true }));
        toast({
          title: "🎉 45문항 진단 완료!",
          description: "모든 질문에 답변하셨습니다. 결과를 분석 중입니다.",
        });
      }
    }, 500);
  };

  // 이전 질문
  const handlePrevious = () => {
    if (formState.currentQuestion > 0) {
      setFormState(prev => ({ ...prev, currentQuestion: prev.currentQuestion - 1 }));
    } else if (formState.currentQuestion === 0) {
      setShowCompanyForm(true);
      setFormState(prev => ({ ...prev, currentQuestion: -1 }));
    }
  };

  // 다음 질문
  const handleNext = () => {
    if (currentQ && formState.answers[currentQ.id]) {
      if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
        setFormState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
      }
    } else {
      toast({
        title: "답변을 선택해주세요",
        description: "현재 질문에 답변한 후 다음으로 진행할 수 있습니다.",
        variant: "destructive"
      });
    }
  };

  // 진단 제출
  const handleSubmit = async () => {
    if (answeredCount < REAL_45_QUESTIONS.length) {
      toast({
        title: "답변 미완료",
        description: `${REAL_45_QUESTIONS.length - answeredCount}개 질문이 남았습니다.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // API 호출 데이터 준비
      const assessmentResponses = REAL_45_QUESTIONS.map(q => formState.answers[q.id] || 1);
      
      const submitData = {
        ...formState.companyInfo,
        assessmentResponses,
        additionalInfo: `45문항 정밀 진단 완료 - ${new Date().toLocaleString('ko-KR')}`
      };

      console.log('🚀 45문항 진단 제출:', submitData);

      // AI 진단 API 호출
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('진단 처리 실패');
      }

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "🎉 진단 완료!",
          description: "AI역량진단이 성공적으로 완료되었습니다. 이메일로 결과를 발송했습니다.",
        });
        
        // 로컬 스토리지 클리어
        localStorage.removeItem('ai-diagnosis-45q');
        
        // 결과 페이지로 이동하거나 완료 상태 표시
        setFormState(prev => ({ ...prev, isCompleted: true }));
        
      } else {
        throw new Error(result.error || '진단 처리 실패');
      }
      
    } catch (error: any) {
      console.error('진단 제출 오류:', error);
      toast({
        title: "제출 실패",
        description: error.message || "진단 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 처음부터 다시 시작
  const handleRestart = () => {
    setFormState({
      companyInfo: {
        companyName: '', contactName: '', contactEmail: '', contactPhone: '',
        industry: '', employeeCount: '', annualRevenue: '', location: ''
      },
      answers: {},
      currentQuestion: -1,
      isCompleted: false
    });
    setShowCompanyForm(true);
    localStorage.removeItem('ai-diagnosis-45q');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 AICAMP AI역량진단
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            45문항 정밀 진단으로 귀사의 AI 역량을 정확히 분석합니다
          </p>
          
          {/* 진행률 표시 */}
          {!showCompanyForm && (
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex-1 max-w-md">
                <Progress value={progress} className="h-3" />
              </div>
              <Badge variant="outline" className="px-3 py-1">
                {answeredCount}/{REAL_45_QUESTIONS.length}
              </Badge>
            </div>
          )}
        </div>

        {/* 기업정보 입력 폼 */}
        {showCompanyForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900">
                  🏢 기업 기본정보
                </CardTitle>
                <p className="text-gray-600">
                  정확한 진단을 위해 기업 정보를 입력해주세요
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      회사명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formState.companyInfo.companyName}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, companyName: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="예: (주)AICAMP"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formState.companyInfo.contactName}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, contactName: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formState.companyInfo.contactEmail}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, contactEmail: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="hong@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처
                    </label>
                    <input
                      type="tel"
                      value={formState.companyInfo.contactPhone}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, contactPhone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="010-1234-5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      업종 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formState.companyInfo.industry}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, industry: e.target.value }
                      }))}
                      title="업종 선택"
                      aria-label="업종 선택"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">업종을 선택해주세요</option>
                      <option value="IT/소프트웨어">IT/소프트웨어</option>
                      <option value="제조업">제조업</option>
                      <option value="금융/보험">금융/보험</option>
                      <option value="유통/도소매">유통/도소매</option>
                      <option value="건설/부동산">건설/부동산</option>
                      <option value="의료/헬스케어">의료/헬스케어</option>
                      <option value="교육">교육</option>
                      <option value="미디어/엔터테인먼트">미디어/엔터테인먼트</option>
                      <option value="운송/물류">운송/물류</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      직원 수 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formState.companyInfo.employeeCount}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, employeeCount: e.target.value }
                      }))}
                      title="직원 수 선택"
                      aria-label="직원 수 선택"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">직원 수를 선택해주세요</option>
                      <option value="1-10명">1-10명</option>
                      <option value="11-30명">11-30명</option>
                      <option value="31-50명">31-50명</option>
                      <option value="51-100명">51-100명</option>
                      <option value="101-300명">101-300명</option>
                      <option value="301명 이상">301명 이상</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연매출
                    </label>
                    <select
                      value={formState.companyInfo.annualRevenue}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, annualRevenue: e.target.value }
                      }))}
                      title="연매출 선택"
                      aria-label="연매출 선택"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">연매출을 선택해주세요</option>
                      <option value="10억 미만">10억 미만</option>
                      <option value="10억-50억">10억-50억</option>
                      <option value="50억-100억">50억-100억</option>
                      <option value="100억-500억">100억-500억</option>
                      <option value="500억 이상">500억 이상</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      소재지
                    </label>
                    <input
                      type="text"
                      value={formState.companyInfo.location}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, location: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="서울시 강남구"
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    onClick={handleCompanyInfoSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    45문항 진단 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 45문항 질문 */}
        {!showCompanyForm && !formState.isCompleted && currentQ && (
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Badge variant="secondary" className="px-3 py-1">
                    {currentQ.section}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    {formState.currentQuestion + 1}/{REAL_45_QUESTIONS.length}
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl text-gray-900 leading-relaxed">
                  {currentQ.question}
                </CardTitle>
                
                {currentQ.description && (
                  <p className="text-gray-600 mt-3">
                    {currentQ.description}
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {currentQ.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswerSelect(currentQ.id, option.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                        formState.answers[currentQ.id] === option.value
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{option.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600">
                            {option.description}
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formState.answers[currentQ.id] === option.value
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formState.answers[currentQ.id] === option.value && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* 네비게이션 버튼 */}
                <div className="flex justify-between items-center pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="px-6 py-2 rounded-xl"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    이전
                  </Button>

                  <div className="text-sm text-gray-500">
                    답변을 선택하면 자동으로 다음 질문으로 이동합니다
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formState.answers[currentQ.id]}
                    className="px-6 py-2 rounded-xl"
                  >
                    다음
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 완료 화면 */}
        {formState.isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur text-center">
              <CardContent className="py-12">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  45문항 AI역량진단 완료!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  모든 질문에 답변해주셔서 감사합니다.<br />
                  정확한 분석 결과를 이메일로 발송해드리겠습니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        분석 중...
                      </>
                    ) : (
                      '진단 결과 받기'
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="px-6 py-2 rounded-xl"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    처음부터 다시
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 하단 정보 */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🔒 모든 정보는 안전하게 암호화되어 처리됩니다</p>
          <p>📧 결과는 입력하신 이메일로 발송됩니다</p>
          <p>🤖 GEMINI 2.5 Flash AI가 정밀 분석합니다</p>
        </div>
      </div>
    </div>
  );
};

export default Real45QuestionForm;

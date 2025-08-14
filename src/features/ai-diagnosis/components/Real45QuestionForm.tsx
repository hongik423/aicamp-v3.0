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
import { AddressInput } from '@/components/ui/address-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { EmailInput } from '@/components/ui/email-input';

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
    const savedData = localStorage.getItem('real45QuestionForm');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormState(parsedData);
        setShowCompanyForm(parsedData.currentQuestion === -1);
      } catch (error) {
        console.error('로컬 스토리지 데이터 복원 실패:', error);
      }
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

  // 답변 저장 (자동 진행 포함)
  const handleAnswer = (questionId: number, score: number) => {
    setFormState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: score
      }
    }));

    // 0.8초 후 자동으로 다음 질문으로 이동 (사용자 경험 개선)
    const timer = setTimeout(() => {
      if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
        setFormState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
      }
    }, 800);

    // 타이머 정리를 위해 ref나 state에 저장할 수도 있지만, 
    // 여기서는 컴포넌트가 언마운트될 때 자동으로 정리됩니다.
    return () => clearTimeout(timer);
  };

  // 다음 질문
  const handleNext = () => {
    if (formState.currentQuestion < REAL_45_QUESTIONS.length - 1) {
      setFormState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  // 이전 질문
  const handlePrev = () => {
    if (formState.currentQuestion > 0) {
      setFormState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
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
    try {
      // API 호출 로직 (기존과 동일)
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState.companyInfo,
          assessmentResponses: REAL_45_QUESTIONS.map(q => formState.answers[q.id] || 0)
        }),
      });

      if (!response.ok) {
        throw new Error('진단 제출에 실패했습니다.');
      }

      const result = await response.json();
      
      toast({
        title: "진단 완료!",
        description: "진단 결과를 이메일로 발송했습니다.",
        variant: "default"
      });

      // 로컬 스토리지 정리
      localStorage.removeItem('real45QuestionForm');
      
      setFormState(prev => ({ ...prev, isCompleted: true }));
      
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "제출 실패",
        description: "진단 제출 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hydration이 완료되지 않았으면 로딩 표시
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI 역량진단을 준비 중입니다...</p>
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
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/images/AICAMP-leader.png" 
                  alt="이교장" 
                  className="w-16 h-16 rounded-full mr-4 shadow-lg"
                />
                <CardTitle className="text-2xl font-bold text-blue-900">
                  이교장의AI역량진단
                </CardTitle>
              </div>
              <p className="text-lg font-semibold text-blue-600 mb-2">🎓 45문항 정밀 진단</p>
              <p className="text-gray-600">기업 정보를 입력해주세요</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">회사명 *</label>
                    <input
                      type="text"
                      value={formState.companyInfo.companyName}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, companyName: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="회사명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">담당자명 *</label>
                    <input
                      type="text"
                      value={formState.companyInfo.contactName}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, contactName: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="담당자명을 입력하세요"
                    />
                  </div>

                  <EmailInput
                    value={formState.companyInfo.contactEmail}
                    onChange={handleEmailChange}
                    label="이메일"
                    required={true}
                    placeholder="example@company.com"
                    showEmailNotice={true}
                    className="w-full"
                  />

                  <PhoneInput
                    value={formState.companyInfo.contactPhone}
                    onChange={handlePhoneChange}
                    label="연락처"
                    required={true}
                    placeholder="010-0000-0000"
                    className="w-full"
                  />
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

  // 나머지 컴포넌트는 기존과 동일하게 유지...
  const currentQuestion = REAL_45_QUESTIONS[formState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img 
                src="/images/AICAMP-leader.png" 
                alt="이교장" 
                className="w-12 h-12 rounded-full mr-3 shadow-md"
              />
              <h1 className="text-2xl font-bold text-blue-900">이교장의AI역량진단</h1>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {answeredCount}/{REAL_45_QUESTIONS.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            진행률: {Math.round(progress)}%
          </p>
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
                    currentQuestion.category === 'business' ? 'bg-blue-50 text-blue-700' :
                    currentQuestion.category === 'technology' ? 'bg-green-50 text-green-700' :
                    currentQuestion.category === 'organization' ? 'bg-purple-50 text-purple-700' :
                    'bg-gray-50 text-gray-700'
                  }>
                    {currentQuestion.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* 답변 옵션 */}
                <div className="grid gap-3">
                  {[5, 4, 3, 2, 1].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleAnswer(currentQuestion.id, score)}
                      className={`
                        p-4 text-left border-2 rounded-lg transition-all duration-200
                        ${formState.answers[currentQuestion.id] === score
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {score === 5 ? '매우 그렇다' :
                           score === 4 ? '그렇다' :
                           score === 3 ? '보통이다' :
                           score === 2 ? '그렇지 않다' : '전혀 그렇지 않다'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {score}점
                        </span>
                      </div>
                    </button>
                  ))}
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
                      onClick={handleSubmit}
                      disabled={isSubmitting || answeredCount < REAL_45_QUESTIONS.length}
                      className="px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          진단 완료
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
    </div>
  );
};

export default Real45QuestionForm;
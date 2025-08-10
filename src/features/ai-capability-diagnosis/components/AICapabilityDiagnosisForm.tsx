'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  ChevronRight, 
  ChevronLeft,
  Building2, 
  User, 
  BarChart3, 
  Brain,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  industryOptions, 
  companySizeOptions, 
  regionOptions, 
  concernOptions, 
  benefitOptions,
  currentAIUsageOptions,
  investmentPlanOptions
} from '../constants/options';
import { AI_CAPABILITY_QUESTIONS, SCORE_SCALE } from '../constants/questions';
import { submitDiagnosis } from '../api';
import { EnhancedAssessmentForm } from './EnhancedAssessmentForm';
import { UnifiedAssessmentMatrix } from './UnifiedAssessmentMatrix';
import { IndustrySelect } from './IndustrySelect';
import DiagnosisProgressModal from '@/components/diagnosis/DiagnosisProgressModal';
import { useBannerStore } from '@/lib/stores/bannerStore';

// 폼 검증 스키마
const diagnosisSchema = z.object({
  // 기본 정보
  companyName: z.string().min(2, '기업명을 입력해주세요'),
  industry: z.string().min(1, '업종을 선택해주세요'),
  customIndustry: z.string().optional(), // 기타 업종 직접 입력
  companySize: z.string().min(1, '기업 규모를 선택해주세요'),
  region: z.string().min(1, '지역을 선택해주세요'),
  
  // 신청자 정보
  applicantName: z.string().min(2, '성명을 입력해주세요'),
  position: z.string().min(2, '직책을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  phone: z.string().regex(/^[0-9-]+$/, '올바른 전화번호 형식이 아닙니다'),
  
  // 사업 정보
  businessDetails: z.string().min(10, '사업 내용을 10자 이상 입력해주세요'),
  mainConcerns: z.array(z.string()).min(1, '최소 1개 이상의 고민사항을 선택해주세요'),
  expectedBenefits: z.array(z.string()).min(1, '최소 1개 이상의 기대효과를 선택해주세요'),
  
  // AI 역량 평가
  assessmentResponses: z.record(z.string(), z.number().min(1).max(5)),
  
  // 추가 정보
  currentAIUsage: z.string().optional(),
  aiInvestmentPlan: z.string().optional(),
  additionalRequests: z.string().optional(),
  
  // 동의 사항
  privacyConsent: z.boolean().refine(val => val === true, '개인정보 처리 동의가 필요합니다'),
  marketingConsent: z.boolean()
});

type DiagnosisFormData = z.infer<typeof diagnosisSchema>;

export const AICapabilityDiagnosisForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccentText, setIsAccentText] = useState(false);
  const [isAccentIcon, setIsAccentIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [highlightUnanswered, setHighlightUnanswered] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState<string>('');
  const [reportPassword, setReportPassword] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const totalSteps = 4;
  const banner = useBannerStore();

  const form = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      customIndustry: '',
      companySize: '',
      region: '',
      applicantName: '',
      position: '',
      email: '',
      phone: '',
      businessDetails: '',
      mainConcerns: [],
      expectedBenefits: [],
      assessmentResponses: {},
      currentAIUsage: '',
      aiInvestmentPlan: '',
      additionalRequests: '',
      privacyConsent: false,
      marketingConsent: false
    }
  });

  useEffect(() => {
    // 모바일 여부 판별 (초기 마운트 시 1회)
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    }
  }, []);

  // 제출 중에는 보색 효과를 끝까지 유지
  useEffect(() => {
    if (isSubmitting) {
      setIsAccentText(true);
      // 아이콘은 약간 늦게 진입하여 스태거 효과
      const id = setTimeout(() => setIsAccentIcon(true), 120);
      return () => clearTimeout(id);
    } else {
      setIsAccentText(false);
      setIsAccentIcon(false);
    }
  }, [isSubmitting]);

  const ACCENT_DURATION_MS = useMemo(() => (isMobile ? 1800 : 1200), [isMobile]);

  const handleStartDiagnosis = async () => {
    // 폼 유효성 검사
    const isValid = await form.trigger();
    if (!isValid) {
      setHighlightUnanswered(true);
      toast({
        title: "입력 확인 필요",
        description: "모든 필수 항목을 입력해주세요.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // 클릭 시작 시 즉시 텍스트 반전, 아이콘은 지연 진입
    setIsAccentText(true);
    setTimeout(() => setIsAccentIcon(true), 120);
    
    // 모바일은 더 길게 유지하지만, 실제 제출 시작 후에는 isSubmitting 효과로 계속 유지됨
    setTimeout(() => {
      if (!isSubmitting) {
        setIsAccentText(false);
        setIsAccentIcon(false);
      }
    }, ACCENT_DURATION_MS);

    // 폼 제출 실행
    const formData = form.getValues();
    await onSubmit(formData);
  };

  const onSubmit = async (data: DiagnosisFormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    // 전역 배너 시작
    banner.show('✅ 진단이 시작되었습니다. 약 10분 이상 소요될 수 있습니다.', {
      subMessage: '잠시 다른 곳에 다녀오셔도 됩니다. 보고서 작성 및 이메일 발송 완료까지 안내가 계속 표시됩니다.',
      variant: 'info',
    });
    
    try {
      console.log('🔍 진단 데이터 제출 시작:', {
        companyName: data.companyName,
        email: data.email,
        assessmentCount: Object.keys(data.assessmentResponses || {}).length
      });

      const result = await submitDiagnosis(data);
      
      console.log('📊 API 응답:', result);
      
      if (result.success && result.diagnosisId) {
        setDiagnosisId(result.diagnosisId);
        banner.update('🔄 진단이 진행 중입니다. 보고서 생성 및 이메일 발송을 준비 중...', {
          subMessage: '창을 닫으셔도 완료 시 이메일로 결과를 받아보실 수 있습니다.',
          variant: 'info',
        });
        
        // 패스워드가 있으면 저장
        if (result.reportPassword) {
          setReportPassword(result.reportPassword);
        }
        
        // 로컬 스토리지에 최근 진단 결과 ID 저장
        const recentIds = JSON.parse(localStorage.getItem('recentDiagnosisIds') || '[]');
        const newIds = [result.diagnosisId, ...recentIds.filter((id: string) => id !== result.diagnosisId)].slice(0, 5);
        localStorage.setItem('recentDiagnosisIds', JSON.stringify(newIds));
        
        setShowProgressModal(true);
        toast({
          title: "진단 신청 완료",
          description: `AI 역량진단이 시작되었습니다. 결과는 이메일로 발송됩니다.${result.reportPassword ? ` (패스워드: ${result.reportPassword})` : ''}`,
        });
      } else {
        const errorMessage = result.error || result.message || '진단 신청 중 오류가 발생했습니다';
        setSubmitError(errorMessage);
        banner.update('❌ 진단 요청 중 오류가 발생했습니다.', {
          subMessage: '잠시 후 다시 시도해주세요.',
          variant: 'error',
        });
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "진단 신청 중 오류가 발생했습니다.";
      setSubmitError(errorMessage);
      toast({
        title: "오류 발생",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('❌ 진단 제출 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // 3단계(AI 역량평가)에서 4단계로 진행 시 필수 검증
    if (currentStep === 3) {
      const assessmentResponses = form.getValues('assessmentResponses') || {};
      const allQuestions = Object.values(AI_CAPABILITY_QUESTIONS).flatMap(category => 
        category.questions.map(q => ({ id: q.id, question: q.question, category: category.title }))
      );
      
      const unansweredQuestions = allQuestions.filter(q => 
        !assessmentResponses[q.id] || assessmentResponses[q.id] === undefined
      );

      if (unansweredQuestions.length > 0) {
        // 미답변 질문이 있으면 경고 메시지 표시
        const categoryGroups = unansweredQuestions.reduce((acc, q) => {
          if (!acc[q.category]) acc[q.category] = [];
          acc[q.category].push(q.question);
          return acc;
        }, {} as Record<string, string[]>);

        let message = `아직 답변하지 않은 질문이 ${unansweredQuestions.length}개 있습니다.\n\n`;
        Object.entries(categoryGroups).forEach(([category, questions]) => {
          message += `【${category}】\n`;
          questions.forEach((question, index) => {
            message += `${index + 1}. ${question}\n`;
          });
          message += '\n';
        });
        message += '모든 질문에 답변해주세요.';

        toast({
          title: "필수 항목 미완료",
          description: message,
          variant: "destructive",
        });

        // 미답변 질문 하이라이트 활성화
        setHighlightUnanswered(true);
        
        // 첫 번째 미답변 질문으로 스크롤
        setTimeout(() => {
          const firstUnansweredElement = document.querySelector(`[data-question-id="${unansweredQuestions[0].id}"]`);
          if (firstUnansweredElement) {
            firstUnansweredElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        
        return; // 다음 단계로 진행하지 않음
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <>
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">
          AI 역량진단 신청서
        </CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          기업의 AI 역량을 종합적으로 진단하고 맞춤형 성장 전략을 제시합니다
        </CardDescription>
        <Progress value={progress} className="mt-4" />
        <div className="text-center text-sm text-gray-600 mt-2">
          {currentStep} / {totalSteps} 단계
        </div>
      </CardHeader>
      <CardContent 
        className="p-4 sm:p-6"
        // 🔥 모바일 터치 최적화 개선
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          // 모바일 스크롤 최적화
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-8"
            // 🔥 모바일 터치 최적화 개선
            onTouchStart={(e) => {
              // 기본 동작은 유지하고 시각적 피드백만 제공
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'scale(0.99)';
              target.style.transition = 'transform 0.1s ease';
            }}
            onTouchEnd={(e) => {
              // 터치 종료 시 원래 크기로 복원
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'scale(1)';
            }}
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            {/* Step 1: 기업 정보 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  기업 정보
                </h3>
                
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>기업명 *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="예: 주식회사 에이아이캠프" 
                          className="placeholder:text-gray-400 focus:placeholder:text-gray-300 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 모바일 최적화: 세로 레이아웃으로 변경 */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">업종 *</FormLabel>
                        <FormControl>
                          <IndustrySelect
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 기타 업종 직접 입력 */}
                  {form.watch('industry') === 'other' && (
                    <FormField
                      control={form.control}
                      name="customIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">기타 업종 (직접 입력) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="구체적인 업종을 입력해주세요" 
                              className="h-12 text-base placeholder:text-gray-400 focus:placeholder:text-gray-300 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-sm">
                            위 업종 목록에 없는 경우 구체적으로 입력해주세요
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">기업 규모 *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base placeholder:text-gray-800 placeholder:font-bold placeholder:opacity-100 bg-white border-2 border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 text-gray-900 font-medium">
                              <SelectValue placeholder="규모를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {companySizeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="text-base py-3">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지역 *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="placeholder:text-gray-800 placeholder:font-bold placeholder:opacity-100 bg-white border-2 border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 text-gray-900 font-medium h-12">
                            <SelectValue placeholder="지역을 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>주요 사업 내용 *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="귀사의 주요 사업 내용과 제품/서비스를 간략히 설명해주세요"
                          className="min-h-[100px] placeholder:text-gray-400 focus:placeholder:opacity-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className="text-lg font-semibold flex items-center gap-2 mt-8">
                  <User className="w-5 h-5" />
                  신청자 정보
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>성명 *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="홍길동" 
                            className="placeholder:text-gray-400 focus:placeholder:opacity-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>직책 *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="대표이사" 
                            className="placeholder:text-gray-400 focus:placeholder:opacity-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일 *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="example@company.com" 
                            className="placeholder:text-gray-400 focus:placeholder:opacity-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>연락처 *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="010-1234-5678" 
                            className="placeholder:text-gray-400 focus:placeholder:opacity-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 2: AI 관심사항 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  AI 도입 관련 정보
                </h3>

                <FormField
                  control={form.control}
                  name="mainConcerns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>주요 고민사항 * (복수 선택 가능)</FormLabel>
                      <FormDescription>
                        귀사가 AI 도입과 관련하여 겪고 있는 주요 어려움을 선택해주세요
                      </FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        {concernOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value || []), option.value]
                                  : field.value?.filter((val) => val !== option.value) || [];
                                field.onChange(newValue);
                              }}
                            />
                            <Label className="text-sm font-normal cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedBenefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>기대 효과 * (복수 선택 가능)</FormLabel>
                      <FormDescription>
                        AI 도입을 통해 기대하는 주요 효과를 선택해주세요
                      </FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        {benefitOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value || []), option.value]
                                  : field.value?.filter((val) => val !== option.value) || [];
                                field.onChange(newValue);
                              }}
                            />
                            <Label className="text-sm font-normal cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="currentAIUsage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>현재 AI 사용 수준</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentAIUsageOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiInvestmentPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AI 투자 계획</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {investmentPlanOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>추가 요청사항</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="AI 진단과 관련하여 특별히 확인하고 싶은 사항이 있다면 자유롭게 작성해주세요"
                          className="min-h-[100px] placeholder:text-gray-400 focus:placeholder:opacity-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: AI 역량 평가 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI 역량 평가
                </h3>
                <p className="text-sm text-gray-600">
                  각 질문에 대해 귀사의 현재 상황을 가장 잘 나타내는 점수를 선택해주세요
                </p>

                {/* 미답변 질문 경고 */}
                {highlightUnanswered && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-700">
                      <strong>아직 답변하지 않은 질문이 있습니다.</strong><br />
                      빨간색으로 표시된 질문에 모두 답변해주세요. 모든 질문에 답변해야 다음 단계로 진행할 수 있습니다.
                    </AlertDescription>
                  </Alert>
                )}

                            <UnifiedAssessmentMatrix
              responses={form.watch('assessmentResponses') || {}}
              onChange={(responses) => {
                form.setValue('assessmentResponses', responses);
                // 답변 시 하이라이트 해제
                if (highlightUnanswered) {
                  setHighlightUnanswered(false);
                }
              }}
              highlightUnanswered={highlightUnanswered}
            />







 



              </div>
            )}

            {/* Step 4: 동의 및 제출 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  개인정보 처리 동의
                </h3>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-700 mb-4">
                    AICAMP는 개인정보보호법에 따라 귀하의 개인정보를 안전하게 처리합니다.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 수집 항목: 기업명, 성명, 직책, 이메일, 연락처</li>
                    <li>• 이용 목적: AI 역량진단 결과 제공 및 관련 서비스 안내</li>
                    <li>• 보유 기간: 서비스 제공 완료 후 3년</li>
                  </ul>
                </div>

                <FormField
                  control={form.control}
                  name="privacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          개인정보 수집 및 이용에 동의합니다 *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          마케팅 정보 수신에 동의합니다 (선택)
                        </FormLabel>
                        <FormDescription>
                          AI 교육 프로그램, 세미나, 이벤트 등의 정보를 받아보실 수 있습니다
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* 제출 전 안내 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">진단 결과 안내</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• AI 역량진단은 약 5-10분 소요됩니다</li>
                        <li>• 상세한 진단 결과는 이메일로 발송됩니다</li>
                        <li>• 이후경 교장의 맞춤형 성장 전략이 포함됩니다</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 네비게이션 버튼 - 모바일 최적화 */}
            <div className="flex justify-between pt-6 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 h-12 px-6 text-base min-w-[120px] flex-1 max-w-[180px]"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 h-12 px-6 text-base min-w-[120px] flex-1 max-w-[180px]"
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  다음
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group flex items-center gap-2 h-12 px-6 text-base min-w-[120px] flex-1 max-w-[180px] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                  onClick={handleStartDiagnosis}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">진단 시작 중...</span>
                      <span className="sm:hidden">시작 중...</span>
                    </>
                  ) : (
                    <>
                      <Brain className={`w-5 h-5 ${isAccentIcon ? 'mix-blend-difference animate-pulse' : ''} group-hover:mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`} />
                      <span className={`hidden sm:inline ${isAccentText ? 'mix-blend-difference animate-pulse' : ''} group-hover:mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>AI 역량진단 시작</span>
                      <span className={`sm:hidden ${isAccentText ? 'mix-blend-difference animate-pulse' : ''} group-hover:mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>진단 시작</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    <DiagnosisProgressModal
      isOpen={showProgressModal}
      onClose={() => setShowProgressModal(false)}
      diagnosisId={diagnosisId}
      companyName={form.watch('companyName')}
      email={form.watch('email')}
      reportPassword={reportPassword}
      onComplete={(result) => {
        console.log('🎉 진단 완료 결과:', result);
        setShowProgressModal(false);
        
        // 임시 결과 데이터 생성 (실제로는 API에서 받아와야 함)
        const mockReportData = {
          overallScore: 75,
          grade: 'B',
          categoryScores: {
            leadership: 4.2,
            infrastructure: 3.8,
            employeeCapability: 3.5,
            culture: 4.0,
            practicalApplication: 3.7,
            dataCapability: 3.3
          },
          recommendations: [
            'AI 기초 교육 프로그램 도입',
            '데이터 관리 체계 구축',
            '조직 문화 개선 방안 수립'
          ],
          strengths: ['경영진의 강한 의지', '혁신적 조직문화'],
          improvements: ['AI 전문 인력 확보', '데이터 인프라 구축'],
          roadmap: {
            phase1: '기초 역량 구축 (1-3개월)',
            phase2: '실무 적용 확산 (4-6개월)', 
            phase3: '고도화 및 최적화 (7-12개월)'
          }
        };

        const mockCompanyInfo = {
          companyName: form.watch('companyName'),
          applicantName: form.watch('applicantName'),
          email: form.watch('email'),
          industry: form.watch('industry'),
          companySize: form.watch('companySize')
        };

        // 로컬 스토리지에 결과 저장
        if (diagnosisId) {
          localStorage.setItem(`diagnosis_result_${diagnosisId}`, JSON.stringify({
            reportData: mockReportData,
            companyInfo: mockCompanyInfo,
            timestamp: new Date().toISOString()
          }));
        }
        
        // 성공 메시지와 함께 결과 표시
        toast({
          title: "🎉 AI 역량진단 완료!",
          description: `${result.message} 결과를 확인하세요.`,
          duration: 5000,
        });

        // 결과 페이지로 이동
        if (diagnosisId) {
          setTimeout(() => {
            window.open(`/diagnosis/result/${diagnosisId}`, '_blank');
          }, 1500);
        }
      }}
      onError={(error) => {
        console.error('❌ 진단 처리 오류:', error);
        toast({
          title: "처리 중 오류 발생",
          description: error,
          variant: "destructive",
          duration: 5000,
        });
      }}
    />
    </>
  );
};
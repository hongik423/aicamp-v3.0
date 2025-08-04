'use client';

import React, { useState } from 'react';
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
  assessmentResponses: z.record(z.number().min(1).max(5)),
  
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
  const [highlightUnanswered, setHighlightUnanswered] = useState(false);
  const totalSteps = 4;

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

  const onSubmit = async (data: DiagnosisFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitDiagnosis(data);
      if (result.success && result.diagnosisId) {
        toast({
          title: "진단 신청 완료",
          description: "AI 역량진단이 시작되었습니다. 결과는 이메일로 발송됩니다.",
        });
        // 결과 페이지로 이동
        window.location.href = `/diagnosis/result/${result.diagnosisId}`;
      } else {
        throw new Error(result.message || '진단 신청 중 오류가 발생했습니다');
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: error instanceof Error ? error.message : "진단 신청 중 오류가 발생했습니다.",
        variant: "destructive",
      });
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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">이후경 교장의 AI 역량 진단</CardTitle>
        <CardDescription>
          기업의 AI 활용 역량을 종합적으로 진단하고 맞춤형 성장 전략을 제시합니다
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <Input placeholder="예: 주식회사 에이아이캠프" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>업종 *</FormLabel>
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
                  <FormLabel>기타 업종 (직접 입력) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="구체적인 업종을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
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
                        <FormLabel>기업 규모 *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="규모를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companySizeOptions.map((option) => (
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
                </div>

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지역 *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
                          className="min-h-[100px]"
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
                          <Input placeholder="홍길동" {...field} />
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
                          <Input placeholder="대표이사" {...field} />
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
                          <Input type="email" placeholder="example@company.com" {...field} />
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
                          <Input placeholder="010-1234-5678" {...field} />
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
                          className="min-h-[100px]"
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

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      진단 시작 중...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      진단 시작하기
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
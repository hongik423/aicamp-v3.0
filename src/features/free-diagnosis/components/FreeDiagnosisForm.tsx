'use client';

import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Building, MapPin, Target, Mail, User, Brain, Cog, MessageSquare, CheckCircle } from 'lucide-react';
import { submitDiagnosis } from '@/features/free-diagnosis/api';
import { industryOptions, regionOptions, concernOptions } from '@/features/free-diagnosis/constants/options';
import RatingScale from '@/components/ui/rating-scale';
import DiagnosisProgressModal from '@/components/diagnosis/DiagnosisProgressModal';

// 통합된 진단 신청 폼 스키마
const diagnosisSchema = z.object({
  // 기본 정보
  companyName: z.string().min(2, '기업명을 입력해주세요').max(100, '100자 이내로 입력해주세요'),
  representativeName: z.string().min(2, '대표자명을 입력해주세요').max(50, '50자 이내로 입력해주세요'),
  position: z.string().min(2, '직책을 입력해주세요').max(50, '50자 이내로 입력해주세요'),
  industry: z.string().min(1, '업종을 선택해주세요'),
  customIndustry: z.string().optional(),
  region: z.string().min(1, '지역을 선택해주세요'),
  businessContent: z.string()
    .min(20, '사업 내용을 20자 이상 작성해주세요')
    .max(1000, '1000자 이내로 작성해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().optional(),
  employeeCount: z.string().optional(),
  annualRevenue: z.string().optional(),
  businessHistory: z.string().optional(),
  
  // AI 활용 역량 진단 - 필수 응답
  // 1. 경영진 리더십
  ceoAIVision: z.number().min(1, 'CEO AI 비전 점수를 선택해주세요').max(5),
  aiInvestment: z.number().min(1, 'AI 투자 의지 점수를 선택해주세요').max(5),
  aiStrategy: z.number().min(1, 'AI 전략 수립 점수를 선택해주세요').max(5),
  changeManagement: z.number().min(1, '변화 관리 점수를 선택해주세요').max(5),
  riskTolerance: z.number().min(1, '리스크 수용도 점수를 선택해주세요').max(5),
  
  // 2. 인프라/시스템
  itInfrastructure: z.number().min(1, 'IT 인프라 점수를 선택해주세요').max(5),
  dataManagement: z.number().min(1, '데이터 관리 점수를 선택해주세요').max(5),
  securityLevel: z.number().min(1, '보안 수준 점수를 선택해주세요').max(5),
  aiToolsAdopted: z.number().min(1, 'AI 도구 도입 점수를 선택해주세요').max(5),
  
  // 3. 직원 역량
  digitalLiteracy: z.number().min(1, '디지털 리터러시 점수를 선택해주세요').max(5),
  aiToolUsage: z.number().min(1, 'AI 도구 활용 점수를 선택해주세요').max(5),
  learningAgility: z.number().min(1, '학습 민첩성 점수를 선택해주세요').max(5),
  dataAnalysis: z.number().min(1, '데이터 분석 능력 점수를 선택해주세요').max(5),
  
  // 4. 조직 문화
  innovationCulture: z.number().min(1, '혁신 문화 점수를 선택해주세요').max(5),
  collaborationLevel: z.number().min(1, '협업 수준 점수를 선택해주세요').max(5),
  experimentCulture: z.number().min(1, '실험 문화 점수를 선택해주세요').max(5),
  continuousLearning: z.number().min(1, '지속 학습 점수를 선택해주세요').max(5),
  
  // 5. 실무 적용도
  processAutomation: z.number().min(1, '프로세스 자동화 점수를 선택해주세요').max(5),
  decisionMaking: z.number().min(1, '의사결정 활용 점수를 선택해주세요').max(5),
  customerService: z.number().min(1, '고객 서비스 활용 점수를 선택해주세요').max(5),
  
  // 실무 역량 진단 - 필수 응답
  // 업무 자동화 역량
  rpaExperience: z.number().min(1, 'RPA 경험 점수를 선택해주세요').max(5),
  workflowAutomation: z.number().min(1, '워크플로우 자동화 점수를 선택해주세요').max(5),
  documentAutomation: z.number().min(1, '문서 자동화 점수를 선택해주세요').max(5),
  dataProcessing: z.number().min(1, '데이터 처리 점수를 선택해주세요').max(5),
  repetitiveTaskAuto: z.number().min(1, '반복 업무 자동화 점수를 선택해주세요').max(5),
  
  // 데이터 분석 실무
  excelDataAnalysis: z.number().min(1, '엑셀 데이터 분석 점수를 선택해주세요').max(5),
  dataVisualization: z.number().min(1, '데이터 시각화 점수를 선택해주세요').max(5),
  basicStatistics: z.number().min(1, '기초 통계 점수를 선택해주세요').max(5),
  reportGeneration: z.number().min(1, '보고서 생성 점수를 선택해주세요').max(5),
  insightExtraction: z.number().min(1, '인사이트 추출 점수를 선택해주세요').max(5),
  
  // AI 도구 활용
  chatGPTUsage: z.number().min(1, 'ChatGPT 사용 점수를 선택해주세요').max(5),
  aiImageTools: z.number().min(1, 'AI 이미지 도구 점수를 선택해주세요').max(5),
  aiDataTools: z.number().min(1, 'AI 데이터 도구 점수를 선택해주세요').max(5),
  aiDocTools: z.number().min(1, 'AI 문서 도구 점수를 선택해주세요').max(5),
  aiSearchTools: z.number().min(1, 'AI 검색 도구 점수를 선택해주세요').max(5),
  
  // 디지털 협업
  cloudPlatforms: z.number().min(1, '클라우드 플랫폼 점수를 선택해주세요').max(5),
  projectManagement: z.number().min(1, '프로젝트 관리 점수를 선택해주세요').max(5),
  videoConference: z.number().min(1, '화상 회의 점수를 선택해주세요').max(5),
  documentSharing: z.number().min(1, '문서 공유 점수를 선택해주세요').max(5),
  teamCommunication: z.number().min(1, '팀 커뮤니케이션 점수를 선택해주세요').max(5),
  
  // 경영 진단 정보
  concerns: z.array(z.string()).min(1, '최소 1개 이상의 주요 고민사항을 선택해주세요'),
  customConcern: z.string().optional(),
  expectations: z.string()
    .min(20, '기대 효과를 20자 이상 작성해주세요')
    .max(500, '500자 이내로 작성해주세요'),
  
  // 개인정보 동의
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: '개인정보 처리에 동의해주세요'
  })
}).refine((data) => {
  // 업종이 'custom'인 경우 customIndustry가 필수
  if (data.industry === 'custom') {
    return data.customIndustry && data.customIndustry.trim().length >= 2;
  }
  return true;
}, {
  message: '업종을 2자 이상 입력해주세요',
  path: ['customIndustry']
});

type DiagnosisFormData = z.infer<typeof diagnosisSchema>;

export const FreeDiagnosisForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    diagnosisId?: string;
    companyName?: string;
    email?: string;
    hasError?: boolean;
    errorMessage?: string;
    errorStep?: string;
  }>({});
  const { toast } = useToast();
  
  const form = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      companyName: '',
      representativeName: '',
      position: '',
      industry: '',
      customIndustry: '',
      region: '',
      businessContent: '',
      email: '',
      phone: '',
      employeeCount: '',
      annualRevenue: '',
      businessHistory: '',
      // AI/실무 역량 진단 - 필수 선택 (기본값 없음)
      ceoAIVision: undefined,
      aiInvestment: undefined,
      aiStrategy: undefined,
      changeManagement: undefined,
      riskTolerance: undefined,
      itInfrastructure: undefined,
      dataManagement: undefined,
      securityLevel: undefined,
      aiToolsAdopted: undefined,
      digitalLiteracy: undefined,
      aiToolUsage: undefined,
      learningAgility: undefined,
      dataAnalysis: undefined,
      innovationCulture: undefined,
      collaborationLevel: undefined,
      experimentCulture: undefined,
      continuousLearning: undefined,
      processAutomation: undefined,
      decisionMaking: undefined,
      customerService: undefined,
      rpaExperience: undefined,
      workflowAutomation: undefined,
      documentAutomation: undefined,
      dataProcessing: undefined,
      repetitiveTaskAuto: undefined,
      excelDataAnalysis: undefined,
      dataVisualization: undefined,
      basicStatistics: undefined,
      reportGeneration: undefined,
      insightExtraction: undefined,
      chatGPTUsage: undefined,
      aiImageTools: undefined,
      aiDataTools: undefined,
      aiDocTools: undefined,
      aiSearchTools: undefined,
      cloudPlatforms: undefined,
      projectManagement: undefined,
      videoConference: undefined,
      documentSharing: undefined,
      teamCommunication: undefined,
      concerns: [],
      customConcern: '',
      expectations: '',
      agreeToTerms: false
    }
  });

  // 업종 선택 값을 실시간 감시
  const selectedIndustry = useWatch({
    control: form.control,
    name: 'industry',
    defaultValue: ''
  });

  const onSubmit = async (data: DiagnosisFormData) => {
    try {
      setIsSubmitting(true);
      
      // 진행상황 모달 열기
      setDiagnosisResult({
        companyName: data.companyName,
        email: data.email
      });
      setShowProgressModal(true);
      
      // API 호출
      const result = await submitDiagnosis(data);
      
      if (result.success) {
        // 진단 ID 업데이트
        setDiagnosisResult(prev => ({
          ...prev,
          diagnosisId: result.diagnosisId
        }));
        
        // 타임아웃이나 재시도 상황인 경우
        if (result.isTimeout || result.isRetry) {
          // 모달은 그대로 두고 완료 상태로 표시
          return;
        }
        
        // 정상 처리된 경우 - 모달에서 완료 상태 표시
      } else {
        // 오류 발생시 모달에 오류 정보 설정
        setDiagnosisResult(prev => ({
          ...prev,
          hasError: true,
          errorMessage: result.message || '진단 신청 중 오류가 발생했습니다',
          errorStep: 'validation' // API 호출 자체 실패는 검증 단계로 분류
        }));
        return; // 모달은 계속 열어두고 오류 상태 표시
      }
    } catch (error) {
      // 네트워크 오류 등 예외 상황
      const errorMessage = error instanceof Error ? error.message : '네트워크 오류가 발생했습니다';
      
      setDiagnosisResult(prev => ({
        ...prev,
        hasError: true,
        errorMessage: errorMessage,
        errorStep: 'validation'
      }));
      
      // 모달이 열려있지 않으면 토스트로 표시
      if (!showProgressModal) {
        toast({
          title: '진단 신청 실패',
          description: errorMessage,
          variant: 'destructive'
        });
        setShowProgressModal(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProgressModalClose = () => {
    setShowProgressModal(false);
    // 모달이 닫히면 홈으로 이동
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <Card id="diagnosis-form" className="max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardTitle className="text-2xl lg:text-3xl text-center">AI 역량진단 신청</CardTitle>
        <CardDescription className="text-center text-lg">
          귀사의 정보를 입력해주시면 맞춤형 경영진단 보고서를 제공해드립니다
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 lg:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            
            {/* 1. 기본 정보 섹션 */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                <Building className="w-6 h-6 text-blue-600" />
                1. 기본 정보
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>기업명 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="주식회사 AICAMP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="representativeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>대표자명 <span className="text-red-500">*</span></FormLabel>
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
                      <FormLabel>직책 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="대표이사" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>업종 <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="업종을 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industryOptions.map((option) => (
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
                
                {selectedIndustry === 'custom' && (
                  <FormField
                    control={form.control}
                    name="customIndustry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>기타 업종 입력 <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="업종을 직접 입력해주세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지역 <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@company.com" {...field} />
                      </FormControl>
                      <FormDescription>진단 결과를 받으실 이메일 주소</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="businessContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>사업/서비스 내용 <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="귀사의 주요 사업 내용, 제품/서비스, 특징 등을 상세히 작성해주세요.&#10;예) 제조업 15년, 자동차 부품 생산, 직원 50명, 연매출 100억"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>최소 20자 이상 작성해주세요</span>
                      <span>{field.value?.length || 0} / 1000</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>직원수</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-9">1-9명</SelectItem>
                          <SelectItem value="10-49">10-49명</SelectItem>
                          <SelectItem value="50-99">50-99명</SelectItem>
                          <SelectItem value="100-299">100-299명</SelectItem>
                          <SelectItem value="300+">300명 이상</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="annualRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연매출</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1억미만">1억 미만</SelectItem>
                          <SelectItem value="1-10억">1-10억</SelectItem>
                          <SelectItem value="10-50억">10-50억</SelectItem>
                          <SelectItem value="50-100억">50-100억</SelectItem>
                          <SelectItem value="100억이상">100억 이상</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사업연수</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1년미만">1년 미만</SelectItem>
                          <SelectItem value="1-3년">1-3년</SelectItem>
                          <SelectItem value="3-5년">3-5년</SelectItem>
                          <SelectItem value="5-10년">5-10년</SelectItem>
                          <SelectItem value="10년이상">10년 이상</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 2. AI 및 실무 역량 진단 통합 섹션 */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                <Brain className="w-6 h-6 text-purple-600" />
                2. AI 및 실무 역량 진단 <span className="text-red-500 text-sm">*모든 항목 필수</span>
              </h3>
              <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                각 항목에 대해 현재 귀사의 수준을 1-5점으로 평가해주세요.<br/>
                <strong>1점: 매우 낮음/경험 없음</strong> | <strong>3점: 보통</strong> | <strong>5점: 매우 높음/전문가 수준</strong>
              </p>
              
              {/* 2-1. AI 활용 역량 */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-purple-700 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  2-1. AI 활용 역량
                </h4>
                
                {/* 경영진 리더십 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">① 경영진 리더십</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ceoAIVision"
                      render={({ field }) => (
                        <RatingScale
                          label="CEO의 AI 비전과 추진 의지"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiInvestment"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 투자 의지와 예산 확보"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiStrategy"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 전략 수립 수준"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="changeManagement"
                      render={({ field }) => (
                        <RatingScale
                          label="변화 관리 역량"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="riskTolerance"
                      render={({ field }) => (
                        <RatingScale
                          label="리스크 수용도"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* 인프라/시스템 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">② 인프라/시스템</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="itInfrastructure"
                      render={({ field }) => (
                        <RatingScale
                          label="IT 인프라 수준"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataManagement"
                      render={({ field }) => (
                        <RatingScale
                          label="데이터 관리 체계"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="securityLevel"
                      render={({ field }) => (
                        <RatingScale
                          label="보안 수준"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiToolsAdopted"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 도구 도입 현황"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* 직원 역량 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">③ 직원 역량</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="digitalLiteracy"
                      render={({ field }) => (
                        <RatingScale
                          label="디지털 리터러시"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiToolUsage"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 도구 활용 능력"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="learningAgility"
                      render={({ field }) => (
                        <RatingScale
                          label="학습 민첩성"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataAnalysis"
                      render={({ field }) => (
                        <RatingScale
                          label="데이터 분석 능력"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* 조직 문화 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">④ 조직 문화</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="innovationCulture"
                      render={({ field }) => (
                        <RatingScale
                          label="혁신 문화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="collaborationLevel"
                      render={({ field }) => (
                        <RatingScale
                          label="협업 수준"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experimentCulture"
                      render={({ field }) => (
                        <RatingScale
                          label="실험 문화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="continuousLearning"
                      render={({ field }) => (
                        <RatingScale
                          label="지속적 학습 문화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* 실무 적용도 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">⑤ 실무 적용도</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="processAutomation"
                      render={({ field }) => (
                        <RatingScale
                          label="프로세스 자동화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="decisionMaking"
                      render={({ field }) => (
                        <RatingScale
                          label="데이터 기반 의사결정"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerService"
                      render={({ field }) => (
                        <RatingScale
                          label="고객 서비스 AI 적용"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {/* 2-2. 실무 역량 */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-purple-700 flex items-center gap-2">
                  <Cog className="w-5 h-5" />
                  2-2. 실무 역량
                </h4>
                
                {/* 업무 자동화 역량 */}
                <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">① 업무 자동화 역량</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rpaExperience"
                      render={({ field }) => (
                        <RatingScale
                          label="RPA 경험"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="workflowAutomation"
                      render={({ field }) => (
                        <RatingScale
                          label="워크플로우 자동화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="documentAutomation"
                      render={({ field }) => (
                        <RatingScale
                          label="문서 자동화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataProcessing"
                      render={({ field }) => (
                        <RatingScale
                          label="데이터 처리 자동화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="repetitiveTaskAuto"
                      render={({ field }) => (
                        <RatingScale
                          label="반복 업무 자동화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* 데이터 분석 실무 */}
                <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">② 데이터 분석 실무</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="excelDataAnalysis"
                      render={({ field }) => (
                        <RatingScale
                          label="엑셀 데이터 분석"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataVisualization"
                      render={({ field }) => (
                        <RatingScale
                          label="데이터 시각화"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="basicStatistics"
                      render={({ field }) => (
                        <RatingScale
                          label="기초 통계 분석"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="reportGeneration"
                      render={({ field }) => (
                        <RatingScale
                          label="보고서 생성"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="insightExtraction"
                      render={({ field }) => (
                        <RatingScale
                          label="인사이트 추출"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* AI 도구 활용 */}
                <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">③ AI 도구 활용</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="chatGPTUsage"
                      render={({ field }) => (
                        <RatingScale
                          label="ChatGPT 활용"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiImageTools"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 이미지 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiDataTools"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 데이터 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiDocTools"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 문서 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aiSearchTools"
                      render={({ field }) => (
                        <RatingScale
                          label="AI 검색 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                
                {/* 디지털 협업 */}
                <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700">④ 디지털 협업</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cloudPlatforms"
                      render={({ field }) => (
                        <RatingScale
                          label="클라우드 플랫폼"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="projectManagement"
                      render={({ field }) => (
                        <RatingScale
                          label="프로젝트 관리 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="videoConference"
                      render={({ field }) => (
                        <RatingScale
                          label="화상 회의 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="documentSharing"
                      render={({ field }) => (
                        <RatingScale
                          label="문서 공유 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="teamCommunication"
                      render={({ field }) => (
                        <RatingScale
                          label="팀 커뮤니케이션 도구"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 주요 고민사항 */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                <MessageSquare className="w-6 h-6 text-green-600" />
                3. 주요 고민사항 <span className="text-red-500">*</span>
              </h3>
              
              <FormField
                control={form.control}
                name="concerns"
                render={() => (
                  <FormItem>
                    <FormLabel>현재 경영상 가장 큰 고민은 무엇인가요? (복수 선택 가능)</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {concernOptions.map((item) => (
                        <FormField
                          key={item.value}
                          control={form.control}
                          name="concerns"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.value) ?? false}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      return checked
                                        ? field.onChange([...currentValue, item.value])
                                        : field.onChange(
                                            currentValue.filter(
                                              (value) => value !== item.value
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 4. 기타 고민사항 */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
                4. 기타 고민사항
              </h3>
              
              <FormField
                control={form.control}
                name="customConcern"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>위 항목 외 추가 고민사항이 있으시면 작성해주세요</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="위 선택지에 없는 고민사항이나 구체적인 상황을 자유롭게 작성해주세요."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 5. 기대 효과 */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                <Target className="w-6 h-6 text-blue-600" />
                5. 기대 효과 <span className="text-red-500">*</span>
              </h3>
              
              <FormField
                control={form.control}
                name="expectations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이번 진단을 통해 얻고자 하는 구체적인 목표나 기대효과를 작성해주세요</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="진단을 통해 얻고자 하는 구체적인 목표나 기대효과를 작성해주세요.&#10;예) 디지털 전환 로드맵 수립, 매출 증대 방안 모색, AI 도입 우선순위 파악"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>최소 20자 이상 작성해주세요</span>
                      <span>{field.value?.length || 0} / 500</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 6. 개인정보 동의 */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                <CheckCircle className="w-6 h-6 text-red-600" />
                6. 개인정보 처리 동의 <span className="text-red-500">*</span>
              </h3>
              
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base">
                        개인정보 수집 및 이용에 동의합니다 <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription className="text-sm text-gray-600">
                        수집항목: 기업명, 대표자명, 연락처, 이메일 등<br/>
                        이용목적: AI 경영진단 서비스 제공 및 결과 발송<br/>
                        보유기간: 서비스 완료 후 1년
                        <br/>
                        <a 
                          href="/privacy" 
                          target="_blank" 
                          className="text-blue-600 hover:underline"
                        >
                          개인정보 수집 및 이용 상세내용 보기 →
                        </a>
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    진단 신청 처리 중...
                  </>
                ) : (
                  '🚀 AI 역량진단 신청하기'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      {/* 진행상황 모달 */}
      <DiagnosisProgressModal
        isOpen={showProgressModal}
        onClose={handleProgressModalClose}
        diagnosisId={diagnosisResult.diagnosisId}
        companyName={diagnosisResult.companyName}
        email={diagnosisResult.email}
        hasError={diagnosisResult.hasError}
        errorMessage={diagnosisResult.errorMessage}
        errorStep={diagnosisResult.errorStep}
      />
    </Card>
  );
};

export default FreeDiagnosisForm;
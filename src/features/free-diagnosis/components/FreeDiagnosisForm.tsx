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
import { Loader2, Building, MapPin, Target, Mail, User, Brain } from 'lucide-react';
import { submitDiagnosis } from '@/features/free-diagnosis/api';
import { industryOptions, regionOptions, concernOptions } from '@/features/free-diagnosis/constants/options';
import RatingScale from '@/components/ui/rating-scale';

// 진단 신청 폼 스키마
const diagnosisSchema = z.object({
  // 기본 정보
  companyName: z.string().min(2, '기업명을 입력해주세요').max(100, '100자 이내로 입력해주세요'),
  representativeName: z.string().min(2, '대표자명을 입력해주세요').max(50, '50자 이내로 입력해주세요'),
  position: z.string().min(2, '직책을 입력해주세요').max(50, '50자 이내로 입력해주세요'),
  industry: z.string().min(1, '업종을 선택해주세요'),
  customIndustry: z.string().optional(),
  region: z.string().min(1, '지역을 선택해주세요'),
  
  // 사업 정보
  businessContent: z.string()
    .min(20, '사업 내용을 20자 이상 작성해주세요')
    .max(1000, '1000자 이내로 작성해주세요'),
  
  // 경영 진단 정보
  concerns: z.array(z.string()).min(1, '최소 1개 이상의 고민사항을 선택해주세요'),
  customConcern: z.string().optional(),
  expectations: z.string()
    .min(20, '기대 효과를 20자 이상 작성해주세요')
    .max(500, '500자 이내로 작성해주세요'),
  
  // 연락처
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().optional(),
  
  // 기업 규모 정보
  employeeCount: z.string().optional(),
  annualRevenue: z.string().optional(),
  businessHistory: z.string().optional(),
  
  // AI 역량 진단 (5개 영역)
  // 1. 경영진 리더십
  ceoAIVision: z.number().min(1).max(5).optional(),        // CEO AI 비전
  aiInvestment: z.number().min(1).max(5).optional(),       // AI 투자 의지
  aiStrategy: z.number().min(1).max(5).optional(),         // AI 전략 수립
  changeManagement: z.number().min(1).max(5).optional(),   // 변화 관리
  riskTolerance: z.number().min(1).max(5).optional(),      // 리스크 수용도
  
  // 2. 인프라/시스템
  itInfrastructure: z.number().min(1).max(5).optional(),   // IT 인프라
  dataManagement: z.number().min(1).max(5).optional(),     // 데이터 관리
  securityLevel: z.number().min(1).max(5).optional(),      // 보안 수준
  aiToolsAdopted: z.number().min(1).max(5).optional(),     // AI 도구 도입
  
  // 3. 직원 역량
  digitalLiteracy: z.number().min(1).max(5).optional(),    // 디지털 리터러시
  aiToolUsage: z.number().min(1).max(5).optional(),        // AI 도구 활용
  learningAgility: z.number().min(1).max(5).optional(),    // 학습 민첩성
  dataAnalysis: z.number().min(1).max(5).optional(),       // 데이터 분석 능력
  
  // 4. 조직 문화
  innovationCulture: z.number().min(1).max(5).optional(),  // 혁신 문화
  collaborationLevel: z.number().min(1).max(5).optional(), // 협업 수준
  experimentCulture: z.number().min(1).max(5).optional(),  // 실험 문화
  continuousLearning: z.number().min(1).max(5).optional(), // 지속 학습
  
  // 5. 실무 적용도
  processAutomation: z.number().min(1).max(5).optional(),  // 프로세스 자동화
  decisionMaking: z.number().min(1).max(5).optional(),     // 의사결정 활용
  customerService: z.number().min(1).max(5).optional(),    // 고객 서비스 적용
  
  // 실무 역량 진단 (PDF 커리큘럼 기반)
  // 업무 자동화 역량
  rpaExperience: z.number().min(1).max(5).optional(),
  workflowAutomation: z.number().min(1).max(5).optional(),
  documentAutomation: z.number().min(1).max(5).optional(),
  dataProcessing: z.number().min(1).max(5).optional(),
  repetitiveTaskAuto: z.number().min(1).max(5).optional(),
  
  // 데이터 분석 실무
  excelDataAnalysis: z.number().min(1).max(5).optional(),
  dataVisualization: z.number().min(1).max(5).optional(),
  basicStatistics: z.number().min(1).max(5).optional(),
  reportGeneration: z.number().min(1).max(5).optional(),
  insightExtraction: z.number().min(1).max(5).optional(),
  
  // AI 도구 활용
  chatGPTUsage: z.number().min(1).max(5).optional(),
  aiImageTools: z.number().min(1).max(5).optional(),
  aiDataTools: z.number().min(1).max(5).optional(),
  aiDocTools: z.number().min(1).max(5).optional(),
  aiSearchTools: z.number().min(1).max(5).optional(),
  
  // 디지털 협업
  cloudPlatforms: z.number().min(1).max(5).optional(),
  projectManagement: z.number().min(1).max(5).optional(),
  videoConference: z.number().min(1).max(5).optional(),
  documentSharing: z.number().min(1).max(5).optional(),
  teamCommunication: z.number().min(1).max(5).optional(),
  
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
      concerns: [],
      customConcern: '',
      expectations: '',
      email: '',
      phone: '',
      employeeCount: '',
      annualRevenue: '',
      businessHistory: '',
      // AI 역량 진단 기본값
      ceoAIVision: 3,
      aiInvestment: 3,
      aiStrategy: 3,
      changeManagement: 3,
      riskTolerance: 3,
      itInfrastructure: 3,
      dataManagement: 3,
      securityLevel: 3,
      aiToolsAdopted: 3,
      digitalLiteracy: 3,
      aiToolUsage: 3,
      learningAgility: 3,
      dataAnalysis: 3,
      innovationCulture: 3,
      collaborationLevel: 3,
      experimentCulture: 3,
      continuousLearning: 3,
      processAutomation: 3,
      decisionMaking: 3,
      customerService: 3,
      // 실무 역량 진단 기본값
      rpaExperience: 3,
      workflowAutomation: 3,
      documentAutomation: 3,
      dataProcessing: 3,
      repetitiveTaskAuto: 3,
      excelDataAnalysis: 3,
      dataVisualization: 3,
      basicStatistics: 3,
      reportGeneration: 3,
      insightExtraction: 3,
      chatGPTUsage: 3,
      aiImageTools: 3,
      aiDataTools: 3,
      aiDocTools: 3,
      aiSearchTools: 3,
      cloudPlatforms: 3,
      projectManagement: 3,
      videoConference: 3,
      documentSharing: 3,
      teamCommunication: 3,
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
      
      // API 호출
      const result = await submitDiagnosis(data);
      
      if (result.success) {
        // 타임아웃이나 재시도 상황인 경우
        if (result.isTimeout || result.isRetry) {
          toast({
            title: '📨 진단 신청 접수 완료',
            description: `${result.message} 예상 소요 시간: ${result.estimatedTime || '5-10분'}`,
          });
          
          // 홈페이지로 이동 (결과 페이지는 아직 생성되지 않았으므로)
          window.location.href = '/';
          return;
        }
        
        // 정상 처리된 경우
        toast({
          title: '진단 신청이 완료되었습니다!',
          description: '5-10분 내에 진단 결과를 이메일로 발송해드립니다.',
        });
        
        // 결과 페이지로 이동
        window.location.href = `/diagnosis/result/${result.diagnosisId}`;
      } else {
        throw new Error(result.message || '진단 신청 중 오류가 발생했습니다');
      }
    } catch (error) {
      toast({
        title: '진단 신청 실패',
        description: error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card id="diagnosis-form" className="max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardTitle className="text-2xl lg:text-3xl text-center">무료 AI 경영진단 신청</CardTitle>
        <CardDescription className="text-center text-lg">
          귀사의 정보를 입력해주시면 맞춤형 경영진단 보고서를 제공해드립니다
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 lg:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 기본 정보 섹션 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-gray-600" />
                기본 정보
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* 업종 직접입력 필드 (조건부 표시) */}
                {selectedIndustry === 'custom' && (
                  <FormField
                    control={form.control}
                    name="customIndustry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>업종 직접입력 <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="예: 스마트팜, 드론제조, 블록체인, NFT, 메타버스, K-뷰티 등" 
                            {...field}
                            maxLength={50}
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-600">
                          💡 위 선택지에 없는 특수한 업종이나 신산업 분야를 정확히 입력해주세요 (최대 50자)
                        </FormDescription>
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
              </div>
            </div>

            {/* 사업 내용 섹션 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-600" />
                사업 내용
              </h3>
              
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
            </div>

            {/* 기업 규모 정보 섹션 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-gray-600" />
                기업 규모 정보
              </h3>
              
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

            {/* AI 역량 진단 섹션 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-gray-600" />
                AI 활용 역량 진단
              </h3>
              <p className="text-sm text-gray-600">
                각 항목에 대해 현재 귀사의 수준을 1-5점으로 평가해주세요. (1점: 매우 낮음, 5점: 매우 높음)
              </p>
              
              {/* 1. 경영진 리더십 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">1. 경영진 리더십</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="ceoAIVision"
                    render={({ field }) => (
                      <RatingScale
                        label="CEO의 AI 비전과 추진 의지"
                        value={field.value}
                        onChange={field.onChange}
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
                      />
                    )}
                  />
                </div>
              </div>
              
              {/* 2. 인프라/시스템 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">2. 인프라/시스템</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="itInfrastructure"
                    render={({ field }) => (
                      <RatingScale
                        label="IT 인프라 수준"
                        value={field.value}
                        onChange={field.onChange}
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
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="aiToolsAdopted"
                    render={({ field }) => (
                      <RatingScale
                        label="AI 도구 도입 수준"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              
              {/* 3. 직원 역량 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">3. 직원 역량</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="digitalLiteracy"
                    render={({ field }) => (
                      <RatingScale
                        label="디지털 리터러시"
                        value={field.value}
                        onChange={field.onChange}
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
                      />
                    )}
                  />
                </div>
              </div>
              
              {/* 4. 조직 문화 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">4. 조직 문화</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="innovationCulture"
                    render={({ field }) => (
                      <RatingScale
                        label="혁신 문화"
                        value={field.value}
                        onChange={field.onChange}
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
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="continuousLearning"
                    render={({ field }) => (
                      <RatingScale
                        label="지속 학습 문화"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              
              {/* 5. 실무 적용도 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">5. 실무 적용도</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="processAutomation"
                    render={({ field }) => (
                      <RatingScale
                        label="프로세스 자동화"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="decisionMaking"
                    render={({ field }) => (
                      <RatingScale
                        label="AI 기반 의사결정"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerService"
                    render={({ field }) => (
                      <RatingScale
                        label="고객 서비스 AI 활용"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* 경영 진단 정보 섹션 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">주요 고민사항</h3>
              
              <FormField
                control={form.control}
                name="concerns"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {concernOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="concerns"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customConcern"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기타 고민사항</FormLabel>
                    <FormControl>
                      <Input placeholder="위 항목 외 고민사항이 있으시면 작성해주세요" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expectations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기대 효과 <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="진단을 통해 얻고자 하는 구체적인 목표나 기대효과를 작성해주세요.&#10;예) 디지털 전환 로드맵 수립, 매출 증대 방안 모색"
                        className="min-h-[100px]"
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

            {/* 실무 역량 진단 섹션 - PDF 커리큘럼 기반 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-gray-600" />
                실무 역량 진단 (선택사항)
              </h3>
              <p className="text-sm text-gray-600">
                보다 정확한 맞춤형 커리큘럼 제공을 위해 현재 실무 역량을 평가해주세요.
              </p>
              
              {/* 1. 업무 자동화 역량 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">1. 업무 자동화 역량</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="rpaExperience"
                    render={({ field }) => (
                      <RatingScale
                        label="RPA(업무자동화) 도구 활용 경험"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="workflowAutomation"
                    render={({ field }) => (
                      <RatingScale
                        label="업무 프로세스 자동화 수준"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              
              {/* 2. 데이터 분석 실무 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">2. 데이터 분석 실무</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="excelDataAnalysis"
                    render={({ field }) => (
                      <RatingScale
                        label="엑셀 데이터 분석 능력"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dataVisualization"
                    render={({ field }) => (
                      <RatingScale
                        label="데이터 시각화 능력"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              
              {/* 3. AI 도구 활용 */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">3. AI 도구 활용 역량</h4>
                <div className="space-y-4 pl-4">
                  <FormField
                    control={form.control}
                    name="chatGPTUsage"
                    render={({ field }) => (
                      <RatingScale
                        label="ChatGPT/Claude 등 AI 활용도"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="aiImageTools"
                    render={({ field }) => (
                      <RatingScale
                        label="AI 이미지 생성 도구 활용"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* 개인정보 동의 */}
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
                    <FormLabel>
                      개인정보 수집 및 이용에 동의합니다 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      진단 결과 발송 및 서비스 제공을 위해 필요한 최소한의 정보만 수집합니다.
                      <br />
                      <a 
                        href="/privacy/enhanced" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                      >
                        개인정보 수집 및 이용 상세내용 보기 →
                      </a>
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* 제출 버튼 */}
            <Button 
              type="submit" 
              size="lg"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  진단 신청 중...
                </>
              ) : (
                '무료 진단 신청하기'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
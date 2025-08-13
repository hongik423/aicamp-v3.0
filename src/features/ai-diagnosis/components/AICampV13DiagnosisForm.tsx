'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AICAMP_V13_QUESTIONS, 
  DIAGNOSIS_SECTIONS, 
  RESPONSE_OPTIONS,
  Question 
} from '../constants/questions-v13';
import { 
  Brain, 
  Building2, 
  Users, 
  Settings, 
  Target, 
  Zap,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface FormData {
  // 기본 정보
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactPosition: string;
  
  // 사업 정보
  industry: string;
  industryCustom: string; // 직접입력시 사용
  businessType: string[];
  employeeCount: string;
  annualRevenue: string;
  establishmentYear: number;
  location: string;
  locationCustom: string; // 직접입력시 사용
  
  // 45문항 응답
  assessmentResponses: number[];
  
  // 추가 정보
  additionalInfo: string;
  budgetAllocation: string;
  priorityFunctions: string[];
  
  // 개인정보 동의
  privacyConsent: boolean;
}

interface Props {
  onComplete: (data: FormData) => void;
  onBack?: () => void;
}

const SECTION_ICONS = {
  1: Building2,
  2: Brain,
  3: Users,
  4: Settings,
  5: Target,
  6: Zap
};

const INDUSTRIES = [
  '제조업', 'IT/소프트웨어', '유통/도소매', '서비스업', '건설업', 
  '의료/헬스케어', '교육', '금융/보험', '운송/물류', '농업/수산업',
  '에너지', '미디어/엔터테인먼트', '부동산', '기타', '직접입력'
];

const REGIONS = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', 
  '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도',
  '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', 
  '경상남도', '제주특별자치도', '직접입력'
];

const EMPLOYEE_COUNTS = [
  '1-10명', '11-50명', '51-100명', '101-300명', '301-500명', '500명 이상'
];

const ANNUAL_REVENUES = [
  '1억원 미만', '1-5억원', '5-10억원', '10-50억원', '50-100억원', '100억원 이상'
];

const BUDGET_ALLOCATIONS = [
  '500만원 미만', '500만원-1,000만원', '1,000만원-3,000만원', 
  '3,000만원-5,000만원', '5,000만원-1억원', '1억원 이상'
];

export default function AICampV13DiagnosisForm({ onComplete, onBack }: Props) {
  const [currentStep, setCurrentStep] = useState<'basic' | 'assessment' | 'additional'>('basic');
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactPosition: '',
    industry: '',
    industryCustom: '',
    businessType: [],
    employeeCount: '',
    annualRevenue: '',
    establishmentYear: new Date().getFullYear(),
    location: '',
    locationCustom: '',
    assessmentResponses: Array(45).fill(0),
    additionalInfo: '',
    budgetAllocation: '',
    priorityFunctions: [],
    privacyConsent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 진행률 계산
  const getProgress = () => {
    if (currentStep === 'basic') return 10;
    if (currentStep === 'assessment') {
      const answeredQuestions = formData.assessmentResponses.filter(r => r > 0).length;
      return 10 + (answeredQuestions / 45) * 80;
    }
    return 95;
  };

  // 현재 섹션의 질문들
  const getCurrentSectionQuestions = () => {
    return AICAMP_V13_QUESTIONS.filter(q => q.sectionId === currentSection);
  };

  // 섹션 완료 여부 확인
  const isSectionComplete = (sectionId: number) => {
    const section = Object.values(DIAGNOSIS_SECTIONS).find(s => s.id === sectionId);
    if (!section) return false;
    
    const [start, end] = section.questionRange;
    return formData.assessmentResponses.slice(start - 1, end).every(r => r > 0);
  };

  // 기본 정보 유효성 검사
  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = '회사명을 입력해주세요';
    if (!formData.contactName.trim()) newErrors.contactName = '담당자명을 입력해주세요';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = '이메일을 입력해주세요';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = '연락처를 입력해주세요';
    if (!formData.industry) newErrors.industry = '업종을 선택해주세요';
    if (formData.industry === '직접입력' && !formData.industryCustom.trim()) {
      newErrors.industryCustom = '업종을 직접 입력해주세요';
    }
    if (!formData.location) newErrors.location = '지역을 선택해주세요';
    if (formData.location === '직접입력' && !formData.locationCustom.trim()) {
      newErrors.locationCustom = '지역을 직접 입력해주세요';
    }
    if (!formData.employeeCount) newErrors.employeeCount = '직원수를 선택해주세요';
    if (!formData.privacyConsent) newErrors.privacyConsent = '개인정보 처리방침에 동의해주세요';
    
    // 이메일 형식 검증
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = '올바른 이메일 형식을 입력해주세요';
    }
    
    // 전화번호 형식 검증
    if (formData.contactPhone && !/^[0-9-+\s()]{8,}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = '올바른 전화번호 형식을 입력해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 평가 완료 여부 확인
  const isAssessmentComplete = () => {
    return formData.assessmentResponses.every(r => r > 0);
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (currentStep === 'basic' && validateBasicInfo()) {
      setCurrentStep('assessment');
    } else if (currentStep === 'assessment' && isAssessmentComplete()) {
      setCurrentStep('additional');
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
    if (currentStep === 'additional') {
      setCurrentStep('assessment');
    } else if (currentStep === 'assessment') {
      setCurrentStep('basic');
    } else if (onBack) {
      onBack();
    }
  };

  // 응답 업데이트
  const updateResponse = (questionId: number, value: number) => {
    const newResponses = [...formData.assessmentResponses];
    newResponses[questionId - 1] = value;
    setFormData({ ...formData, assessmentResponses: newResponses });
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!isAssessmentComplete()) {
      alert('모든 문항에 응답해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onComplete(formData);
    } catch (error) {
      console.error('진단 제출 오류:', error);
      alert('진단 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 기본 정보 입력 단계
  if (currentStep === 'basic') {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-900">
            🎓 이교장의 AI역량진단시스템
          </CardTitle>
          <CardDescription className="text-lg">
            45문항 정밀 AI역량진단 시스템
          </CardDescription>
          <Progress value={getProgress()} className="w-full mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">회사명 *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="회사명을 입력하세요"
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactName">담당자명 *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="담당자명을 입력하세요"
                  className={errors.contactName ? 'border-red-500' : ''}
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactEmail">이메일 *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="이메일을 입력하세요"
                  className={errors.contactEmail ? 'border-red-500' : ''}
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPhone">연락처 *</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="연락처를 입력하세요 (예: 010-1234-5678)"
                  className={errors.contactPhone ? 'border-red-500' : ''}
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPosition">직책</Label>
                <Input
                  id="contactPosition"
                  value={formData.contactPosition}
                  onChange={(e) => setFormData({ ...formData, contactPosition: e.target.value })}
                  placeholder="직책을 입력하세요 (예: 대표, 팀장, 담당자)"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">업종 *</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value, industryCustom: '' })}>
                  <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
                    <SelectValue placeholder="업종을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                )}
                
                {formData.industry === '직접입력' && (
                  <div className="mt-2">
                    <Input
                      placeholder="업종을 직접 입력하세요"
                      value={formData.industryCustom}
                      onChange={(e) => setFormData({ ...formData, industryCustom: e.target.value })}
                      className={errors.industryCustom ? 'border-red-500' : ''}
                    />
                    {errors.industryCustom && (
                      <p className="text-red-500 text-sm mt-1">{errors.industryCustom}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="employeeCount">직원수 *</Label>
                <Select value={formData.employeeCount} onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}>
                  <SelectTrigger className={errors.employeeCount ? 'border-red-500' : ''}>
                    <SelectValue placeholder="직원수를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEE_COUNTS.map((count) => (
                      <SelectItem key={count} value={count}>{count}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employeeCount && (
                  <p className="text-red-500 text-sm mt-1">{errors.employeeCount}</p>
                )}
              </div>

              <div>
                <Label htmlFor="annualRevenue">연매출</Label>
                <Select value={formData.annualRevenue} onValueChange={(value) => setFormData({ ...formData, annualRevenue: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="연매출을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {ANNUAL_REVENUES.map((revenue) => (
                      <SelectItem key={revenue} value={revenue}>{revenue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">지역 *</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value, locationCustom: '' })}>
                  <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
                
                {formData.location === '직접입력' && (
                  <div className="mt-2">
                    <Input
                      placeholder="지역을 직접 입력하세요"
                      value={formData.locationCustom}
                      onChange={(e) => setFormData({ ...formData, locationCustom: e.target.value })}
                      className={errors.locationCustom ? 'border-red-500' : ''}
                    />
                    {errors.locationCustom && (
                      <p className="text-red-500 text-sm mt-1">{errors.locationCustom}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 개인정보 동의 */}
          <div className="border-t pt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacyConsent"
                checked={formData.privacyConsent}
                onCheckedChange={(checked) => setFormData({ ...formData, privacyConsent: !!checked })}
                className={errors.privacyConsent ? 'border-red-500' : ''}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="privacyConsent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  개인정보 처리방침에 동의합니다 *
                </Label>
                <p className="text-xs text-muted-foreground">
                  진단 서비스 제공을 위해 개인정보를 수집·이용합니다. 
                  <a href="/privacy" target="_blank" className="text-blue-600 hover:underline ml-1">
                    자세히 보기
                  </a>
                </p>
                {errors.privacyConsent && (
                  <p className="text-red-500 text-xs mt-1">{errors.privacyConsent}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전
            </Button>
            <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700">
              다음 단계
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 45문항 평가 단계
  if (currentStep === 'assessment') {
    const currentQuestions = getCurrentSectionQuestions();
    const sectionInfo = Object.values(DIAGNOSIS_SECTIONS).find(s => s.id === currentSection);
    const SectionIcon = SECTION_ICONS[currentSection as keyof typeof SECTION_ICONS];

    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SectionIcon className="w-8 h-8" style={{ color: sectionInfo?.color }} />
                <div>
                  <CardTitle className="text-xl">
                    {sectionInfo?.name} ({currentSection}/6)
                  </CardTitle>
                  <CardDescription>
                    {sectionInfo?.description}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={isSectionComplete(currentSection) ? "default" : "secondary"}>
                {isSectionComplete(currentSection) ? '완료' : '진행중'}
              </Badge>
            </div>
            <Progress value={getProgress()} className="w-full mt-4" />
          </CardHeader>
        </Card>

        {/* 섹션 네비게이션 */}
        <div className="flex justify-center space-x-2">
          {Object.values(DIAGNOSIS_SECTIONS).map((section) => {
            const Icon = SECTION_ICONS[section.id as keyof typeof SECTION_ICONS];
            return (
              <Button
                key={section.id}
                variant={currentSection === section.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentSection(section.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.name}</span>
                {isSectionComplete(section.id) && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </Button>
            );
          })}
        </div>

        {/* 질문 카드들 */}
        <div className="grid gap-4">
          {currentQuestions.map((question) => (
            <Card key={question.id} className="border-l-4" style={{ borderLeftColor: sectionInfo?.color }}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium leading-relaxed">
                      {question.id}. {question.question}
                    </CardTitle>
                    {question.description && (
                      <CardDescription className="mt-2 text-gray-600">
                        {question.description}
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant="outline" className="ml-4">
                    가중치 {question.weight}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <RadioGroup
                  value={formData.assessmentResponses[question.id - 1]?.toString() || ""}
                  onValueChange={(value) => updateResponse(question.id, parseInt(value))}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-3"
                >
                  {RESPONSE_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value={option.value.toString()} id={`q${question.id}-${option.value}`} />
                      <Label
                        htmlFor={`q${question.id}-${option.value}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            이전
          </Button>
          
          <div className="flex space-x-2">
            {currentSection > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentSection(currentSection - 1)}
              >
                이전 섹션
              </Button>
            )}
            
            {currentSection < 6 ? (
              <Button
                onClick={() => setCurrentSection(currentSection + 1)}
                disabled={!isSectionComplete(currentSection)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                다음 섹션
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNextStep}
                disabled={!isAssessmentComplete()}
                className="bg-green-600 hover:bg-green-700"
              >
                평가 완료
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* 완료 상태 표시 */}
        {!isAssessmentComplete() && (
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
            <p className="text-yellow-800">
              모든 문항에 응답해야 다음 단계로 진행할 수 있습니다.
              <br />
              <span className="font-medium">
                {formData.assessmentResponses.filter(r => r > 0).length}/45 문항 완료
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }

  // 추가 정보 입력 단계
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-900">
          🎯 추가 정보 입력
        </CardTitle>
        <CardDescription>
          더 정확한 진단을 위한 추가 정보를 입력해주세요 (선택사항)
        </CardDescription>
        <Progress value={getProgress()} className="w-full mt-4" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="budgetAllocation">AI 도입 예산 계획</Label>
          <Select value={formData.budgetAllocation} onValueChange={(value) => setFormData({ ...formData, budgetAllocation: value })}>
            <SelectTrigger>
              <SelectValue placeholder="예상 예산을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_ALLOCATIONS.map((budget) => (
                <SelectItem key={budget} value={budget}>{budget}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="additionalInfo">추가 요청사항이나 궁금한 점</Label>
          <Textarea
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            placeholder="AI 도입 관련 궁금한 점이나 특별히 고려해야 할 사항이 있다면 자유롭게 작성해주세요."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            이전
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                진단 분석 중...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                진단 신청 완료
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

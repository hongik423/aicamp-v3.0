/**
 * ================================================================================
 * 🚀 PRD 기반 완전한 AI 역량진단 폼
 * ================================================================================
 * 
 * @fileoverview PRD 요구사항에 완벽히 부합하는 React 컴포넌트
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  UserInputData,
  IndustryType,
  EmployeeRange,
  RevenueRange,
  LocationType,
  CreateAssessmentRequest,
  APIResponse,
  ScoreRange
} from '@/types/ai-diagnosis-prd.types';
import { AlertCircle, CheckCircle2, Clock, Building2, Users, Target } from 'lucide-react';

interface PRDDiagnosisFormProps {
  onSubmit?: (data: UserInputData) => void;
  onProgress?: (progress: number) => void;
  initialData?: Partial<UserInputData>;
}

interface FormStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: string[];
}

interface ValidationError {
  field: string;
  message: string;
}

export default function PRDDiagnosisForm({
  onSubmit,
  onProgress,
  initialData
}: PRDDiagnosisFormProps) {
  // ================================================================================
  // 📋 상태 관리
  // ================================================================================
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserInputData>>(initialData || {});
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [assessmentScores, setAssessmentScores] = useState<Record<string, number>>({});
  
  // 폼 단계 정의 (PRD 요구사항 기반)
  const formSteps: FormStep[] = [
    {
      id: 'basic-info',
      title: '기본 정보',
      description: '회사 및 담당자 정보를 입력해주세요',
      icon: Building2,
      fields: ['companyName', 'contactPerson', 'email', 'phone', 'position', 'department']
    },
    {
      id: 'company-info',
      title: '회사 정보',
      description: '회사의 규모와 업종 정보를 입력해주세요',
      icon: Users,
      fields: ['industry', 'employeeCount', 'annualRevenue', 'location']
    },
    {
      id: 'ai-assessment',
      title: 'AI 역량 평가',
      description: '45문항 AI 역량 평가를 진행해주세요',
      icon: Target,
      fields: ['assessmentScores']
    },
    {
      id: 'privacy-consent',
      title: '개인정보 동의',
      description: '개인정보 처리 및 서비스 이용에 동의해주세요',
      icon: CheckCircle2,
      fields: ['privacyConsent']
    }
  ];
  
  // 45문항 질문 정의 (PRD 요구사항 기반)
  const assessmentQuestions = [
    // Q1-Q8: 사업 기반 AI 이해도
    { id: 1, category: '사업기반', question: '우리 회사의 핵심 사업 모델과 수익 구조가 명확합니까?' },
    { id: 2, category: '사업기반', question: '경쟁 우위를 뒷받침하는 차별화 요소가 있습니까?' },
    { id: 3, category: '사업기반', question: '고객 니즈와 시장 변화를 정기적으로 반영합니까?' },
    { id: 4, category: '사업기반', question: '성과(KPI) 측정·관리 체계가 구축되어 있습니까?' },
    { id: 5, category: '사업기반', question: '재무 건전성과 자금 운용이 안정적입니까?' },
    { id: 6, category: '사업기반', question: '기업의 전반적 안정성(재무/운영/리스크)이 높습니까?' },
    { id: 7, category: '사업기반', question: '향후 성장 잠재력과 확장 계획이 명확합니까?' },
    { id: 8, category: '사업기반', question: '브랜드 인지도/신뢰도가 업계 평균 이상입니까?' },
    
    // Q9-Q16: 현재 AI 활용 수준
    { id: 9, category: '현재AI활용', question: 'ChatGPT 등 생성형 AI를 실무에 적극 활용하고 있습니까?' },
    { id: 10, category: '현재AI활용', question: '업무 전반에서 AI 도구를 체계적으로 활용하고 있습니까?' },
    { id: 11, category: '현재AI활용', question: '생성형 AI 활용 가이드/정책이 마련되어 있습니까?' },
    { id: 12, category: '현재AI활용', question: '정기적인 AI 교육/학습 프로그램이 운영됩니까?' },
    { id: 13, category: '현재AI활용', question: 'AI/자동화 투자 계획과 우선순위가 수립되어 있습니까?' },
    { id: 14, category: '현재AI활용', question: 'AI 도입 성과를 KPI로 측정/관리하고 있습니까?' },
    { id: 15, category: '현재AI활용', question: 'AI 윤리/법규 준수 및 거버넌스 체계가 있습니까?' },
    { id: 16, category: '현재AI활용', question: 'AI/데이터 품질 및 보안 관리가 체계적으로 이루어집니까?' },
    
    // Q17-Q24: 조직 준비도
    { id: 17, category: '조직준비도', question: '조직의 디지털 전환 준비도가 높습니까?' },
    { id: 18, category: '조직준비도', question: '변화 관리 역량과 경험이 충분합니까?' },
    { id: 19, category: '조직준비도', question: '조직문화가 혁신/학습/공유 중심입니까?' },
    { id: 20, category: '조직준비도', question: '리더십이 AI 도입을 적극적으로 지원합니까?' },
    { id: 21, category: '조직준비도', question: '직원들의 AI 역량(기초~심화)이 충분합니까?' },
    { id: 22, category: '조직준비도', question: '교육/훈련 체계가 정기적으로 운영됩니까?' },
    { id: 23, category: '조직준비도', question: '협업/지식공유 문화와 도구가 활성화되어 있습니까?' },
    { id: 24, category: '조직준비도', question: '실험/파일럿을 장려하는 제도가 있습니까?' },
    
    // Q25-Q32: 기술 인프라
    { id: 25, category: '기술인프라', question: '클라우드/온프레미스 인프라가 안정적입니까?' },
    { id: 26, category: '기술인프라', question: '데이터 수집/저장/처리 인프라가 구축되어 있습니까?' },
    { id: 27, category: '기술인프라', question: '보안 시스템과 접근 통제가 적절합니까?' },
    { id: 28, category: '기술인프라', question: '네트워크 성능/안정성이 충분합니까?' },
    { id: 29, category: '기술인프라', question: '레거시 포함 IT 인프라의 현대화 수준이 높습니까?' },
    { id: 30, category: '기술인프라', question: '핵심 시스템 간 통합/연동이 원활합니까?' },
    { id: 31, category: '기술인프라', question: '모니터링/관측성(Observability) 체계가 있습니까?' },
    { id: 32, category: '기술인프라', question: '백업/복구/재해복구 체계가 마련되어 있습니까?' },
    
    // Q33-Q40: AI 전략 명확성
    { id: 33, category: '목표명확성', question: 'AI 전략과 비전이 명확히 수립되어 있습니까?' },
    { id: 34, category: '목표명확성', question: '성과 지표와 목표값이 구체적으로 정의되어 있습니까?' },
    { id: 35, category: '목표명확성', question: '우선순위/로드맵이 합리적으로 설정되어 있습니까?' },
    { id: 36, category: '목표명확성', question: '로드맵의 단계별 목표와 과제가 구체적입니까?' },
    { id: 37, category: '목표명확성', question: '내/외부 이해관계자의 합의와 공감대가 형성되어 있습니까?' },
    { id: 38, category: '목표명확성', question: '목표/전략이 조직 전체에 충분히 소통되고 있습니까?' },
    { id: 39, category: '목표명확성', question: '목표 관리(SMART) 원칙이 적용되고 있습니까?' },
    { id: 40, category: '목표명확성', question: '성과 추적/리뷰 체계가 정기적으로 운영됩니까?' },
    
    // Q41-Q45: 실행 역량
    { id: 41, category: '실행역량', question: '프로젝트 관리 체계가 성숙합니까?' },
    { id: 42, category: '실행역량', question: '자원(인력/예산/시간) 배분이 효율적입니까?' },
    { id: 43, category: '실행역량', question: '목표 대비 성과 달성률이 높습니까?' },
    { id: 44, category: '실행역량', question: '문제 해결/의사결정 속도가 빠릅니까?' },
    { id: 45, category: '실행역량', question: '지속적 개선/혁신 활동이 활발합니까?' }
  ];
  
  // ================================================================================
  // 📋 이벤트 핸들러
  // ================================================================================
  
  /**
   * 폼 데이터 업데이트
   */
  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 실시간 검증
    validateField(field, value);
  }, []);
  
  /**
   * 평가 점수 업데이트
   */
  const updateAssessmentScore = useCallback((questionId: number, score: ScoreRange) => {
    setAssessmentScores(prev => ({
      ...prev,
      [`q${questionId}`]: score
    }));
    
    // 진행률 업데이트
    const completedQuestions = Object.keys({ ...assessmentScores, [`q${questionId}`]: score }).length;
    const assessmentProgress = (completedQuestions / 45) * 100;
    const overallProgress = (currentStep * 25) + (assessmentProgress * 0.25);
    setProgress(overallProgress);
    
    if (onProgress) {
      onProgress(overallProgress);
    }
  }, [assessmentScores, currentStep, onProgress]);
  
  /**
   * 다음 단계로 이동
   */
  const handleNextStep = useCallback(() => {
    const currentStepData = formSteps[currentStep];
    const errors = validateStep(currentStepData.id);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress((currentStep + 1) * 25);
      
      if (onProgress) {
        onProgress((currentStep + 1) * 25);
      }
    } else {
      handleSubmit();
    }
  }, [currentStep, formData, assessmentScores]);
  
  /**
   * 이전 단계로 이동
   */
  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setProgress(currentStep * 25);
      
      if (onProgress) {
        onProgress(currentStep * 25);
      }
    }
  }, [currentStep, onProgress]);
  
  /**
   * 폼 제출
   */
  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      console.log('🚀 PRD 기반 AI 역량진단 제출 시작');
      
      // 최종 데이터 구성
      const finalData: UserInputData = {
        basicInfo: {
          companyName: formData.basicInfo?.companyName || '',
          industry: formData.basicInfo?.industry || IndustryType.SERVICE,
          employeeCount: formData.basicInfo?.employeeCount || EmployeeRange.UNDER_10,
          annualRevenue: formData.basicInfo?.annualRevenue || RevenueRange.UNDER_100M,
          location: formData.basicInfo?.location || LocationType.SEOUL,
          contactPerson: formData.basicInfo?.contactPerson || '',
          email: formData.basicInfo?.email || '',
          phone: formData.basicInfo?.phone,
          position: formData.basicInfo?.position,
          department: formData.basicInfo?.department
        },
        assessmentScores: convertAssessmentScores(assessmentScores),
        privacyConsent: {
          dataProcessingConsent: formData.privacyConsent?.dataProcessingConsent || false,
          marketingConsent: formData.privacyConsent?.marketingConsent || false,
          consentTimestamp: new Date(),
          ipAddress: await getClientIP(),
          consentVersion: 'PRD-v1.0'
        },
        sessionMetadata: {
          sessionId: `session_${Date.now()}`,
          startTime: new Date(Date.now() - progress * 1000), // 추정 시작 시간
          completionTime: new Date(),
          deviceInfo: navigator.userAgent,
          browserInfo: getBrowserInfo(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        }
      };
      
      // API 호출
      const response = await fetch('/api/prd-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalData as CreateAssessmentRequest)
      });
      
      const result: APIResponse = await response.json();
      
      if (result.success) {
        console.log('✅ PRD 기반 AI 역량진단 완료', result.data);
        
        if (onSubmit) {
          onSubmit(finalData);
        }
        
        // 결과 페이지로 이동
        if (result.data?.diagnosisId) {
          window.location.href = `/diagnosis-results/${result.data.diagnosisId}`;
        }
      } else {
        throw new Error(result.error?.message || '진단 처리 실패');
      }
      
    } catch (error: any) {
      console.error('❌ PRD 기반 AI 역량진단 실패:', error);
      alert(`진단 처리 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, assessmentScores, progress, onSubmit]);
  
  // ================================================================================
  // 📋 검증 함수들
  // ================================================================================
  
  /**
   * 필드 검증
   */
  const validateField = useCallback((field: string, value: any): boolean => {
    const errors: ValidationError[] = [];
    
    switch (field) {
      case 'companyName':
        if (!value || value.trim().length < 2) {
          errors.push({ field, message: '회사명은 2자 이상 입력해주세요' });
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          errors.push({ field, message: '유효한 이메일 주소를 입력해주세요' });
        }
        break;
      
      case 'contactPerson':
        if (!value || value.trim().length < 2) {
          errors.push({ field, message: '담당자명은 2자 이상 입력해주세요' });
        }
        break;
      
      case 'phone':
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (value && !phoneRegex.test(value)) {
          errors.push({ field, message: '유효한 전화번호를 입력해주세요' });
        }
        break;
    }
    
    // 오류 업데이트
    setValidationErrors(prev => {
      const filtered = prev.filter(error => error.field !== field);
      return [...filtered, ...errors];
    });
    
    return errors.length === 0;
  }, []);
  
  /**
   * 단계별 검증
   */
  const validateStep = useCallback((stepId: string): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    switch (stepId) {
      case 'basic-info':
        if (!formData.basicInfo?.companyName) {
          errors.push({ field: 'companyName', message: '회사명을 입력해주세요' });
        }
        if (!formData.basicInfo?.contactPerson) {
          errors.push({ field: 'contactPerson', message: '담당자명을 입력해주세요' });
        }
        if (!formData.basicInfo?.email) {
          errors.push({ field: 'email', message: '이메일을 입력해주세요' });
        }
        break;
      
      case 'company-info':
        if (!formData.basicInfo?.industry) {
          errors.push({ field: 'industry', message: '업종을 선택해주세요' });
        }
        if (!formData.basicInfo?.employeeCount) {
          errors.push({ field: 'employeeCount', message: '직원 수를 선택해주세요' });
        }
        break;
      
      case 'ai-assessment':
        const completedQuestions = Object.keys(assessmentScores).length;
        if (completedQuestions < 45) {
          errors.push({ 
            field: 'assessmentScores', 
            message: `45문항을 모두 응답해주세요 (현재: ${completedQuestions}/45)` 
          });
        }
        break;
      
      case 'privacy-consent':
        if (!formData.privacyConsent?.dataProcessingConsent) {
          errors.push({ field: 'dataProcessingConsent', message: '개인정보 처리 동의가 필요합니다' });
        }
        break;
    }
    
    return errors;
  }, [formData, assessmentScores]);
  
  // ================================================================================
  // 📋 렌더링 함수들
  // ================================================================================
  
  /**
   * 기본 정보 단계 렌더링
   */
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">회사명 *</Label>
          <Input
            id="companyName"
            placeholder="회사명을 입력하세요"
            value={formData.basicInfo?.companyName || ''}
            onChange={(e) => updateFormData('basicInfo.companyName', e.target.value)}
            className={getFieldErrorClass('companyName')}
          />
          {getFieldError('companyName') && (
            <p className="text-red-500 text-sm">{getFieldError('companyName')}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPerson">담당자명 *</Label>
          <Input
            id="contactPerson"
            placeholder="담당자명을 입력하세요"
            value={formData.basicInfo?.contactPerson || ''}
            onChange={(e) => updateFormData('basicInfo.contactPerson', e.target.value)}
            className={getFieldErrorClass('contactPerson')}
          />
          {getFieldError('contactPerson') && (
            <p className="text-red-500 text-sm">{getFieldError('contactPerson')}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일 *</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.basicInfo?.email || ''}
            onChange={(e) => updateFormData('basicInfo.email', e.target.value)}
            className={getFieldErrorClass('email')}
          />
          {getFieldError('email') && (
            <p className="text-red-500 text-sm">{getFieldError('email')}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">연락처</Label>
          <Input
            id="phone"
            placeholder="연락처를 입력하세요"
            value={formData.basicInfo?.phone || ''}
            onChange={(e) => updateFormData('basicInfo.phone', e.target.value)}
            className={getFieldErrorClass('phone')}
          />
          {getFieldError('phone') && (
            <p className="text-red-500 text-sm">{getFieldError('phone')}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="position">직책</Label>
          <Input
            id="position"
            placeholder="직책을 입력하세요"
            value={formData.basicInfo?.position || ''}
            onChange={(e) => updateFormData('basicInfo.position', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">부서</Label>
          <Input
            id="department"
            placeholder="부서를 입력하세요"
            value={formData.basicInfo?.department || ''}
            onChange={(e) => updateFormData('basicInfo.department', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
  
  /**
   * 회사 정보 단계 렌더링
   */
  const renderCompanyInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industry">업종 *</Label>
          <Select
            value={formData.basicInfo?.industry}
            onValueChange={(value) => updateFormData('basicInfo.industry', value as IndustryType)}
          >
            <SelectTrigger className={getFieldErrorClass('industry')}>
              <SelectValue placeholder="업종을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(IndustryType).map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError('industry') && (
            <p className="text-red-500 text-sm">{getFieldError('industry')}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employeeCount">직원 수 *</Label>
          <Select
            value={formData.basicInfo?.employeeCount}
            onValueChange={(value) => updateFormData('basicInfo.employeeCount', value as EmployeeRange)}
          >
            <SelectTrigger className={getFieldErrorClass('employeeCount')}>
              <SelectValue placeholder="직원 수를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EmployeeRange).map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError('employeeCount') && (
            <p className="text-red-500 text-sm">{getFieldError('employeeCount')}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="annualRevenue">연매출</Label>
          <Select
            value={formData.basicInfo?.annualRevenue}
            onValueChange={(value) => updateFormData('basicInfo.annualRevenue', value as RevenueRange)}
          >
            <SelectTrigger>
              <SelectValue placeholder="연매출을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RevenueRange).map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">소재지</Label>
          <Select
            value={formData.basicInfo?.location}
            onValueChange={(value) => updateFormData('basicInfo.location', value as LocationType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="소재지를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(LocationType).map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
  
  /**
   * AI 역량 평가 단계 렌더링
   */
  const renderAssessmentStep = () => {
    const categories = [
      { name: '사업기반', questions: assessmentQuestions.slice(0, 8), color: 'bg-blue-50 border-blue-200' },
      { name: '현재AI활용', questions: assessmentQuestions.slice(8, 16), color: 'bg-green-50 border-green-200' },
      { name: '조직준비도', questions: assessmentQuestions.slice(16, 24), color: 'bg-purple-50 border-purple-200' },
      { name: '기술인프라', questions: assessmentQuestions.slice(24, 32), color: 'bg-orange-50 border-orange-200' },
      { name: '목표명확성', questions: assessmentQuestions.slice(32, 40), color: 'bg-red-50 border-red-200' },
      { name: '실행역량', questions: assessmentQuestions.slice(40, 45), color: 'bg-indigo-50 border-indigo-200' }
    ];
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">AI 역량 45문항 평가</h3>
          <p className="text-gray-600">각 문항에 대해 1점(매우 낮음)부터 5점(매우 높음)까지 평가해주세요</p>
          <div className="mt-4">
            <Progress value={(Object.keys(assessmentScores).length / 45) * 100} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
              {Object.keys(assessmentScores).length}/45 문항 완료
            </p>
          </div>
        </div>
        
        {categories.map((category, categoryIndex) => (
          <Card key={category.name} className={`${category.color} border-2`}>
            <CardHeader>
              <CardTitle className="text-lg">
                {category.name} ({category.questions.length}문항)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.questions.map((question, questionIndex) => (
                  <div key={question.id} className="bg-white p-4 rounded-lg border">
                    <div className="mb-3">
                      <Label className="text-sm font-medium">
                        Q{question.id}. {question.question}
                      </Label>
                    </div>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(score => (
                        <Button
                          key={score}
                          variant={assessmentScores[`q${question.id}`] === score ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateAssessmentScore(question.id, score as ScoreRange)}
                          className="flex-1"
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>매우 낮음</span>
                      <span>매우 높음</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  /**
   * 개인정보 동의 단계 렌더링
   */
  const renderPrivacyConsentStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>개인정보 처리 방침</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">수집하는 개인정보</h4>
            <ul className="text-sm space-y-1">
              <li>• 회사명, 담당자명, 이메일, 연락처</li>
              <li>• 회사 규모, 업종, 소재지 정보</li>
              <li>• AI 역량 평가 응답 데이터</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">개인정보 이용 목적</h4>
            <ul className="text-sm space-y-1">
              <li>• AI 역량진단 결과 분석 및 보고서 생성</li>
              <li>• 진단 결과 이메일 발송</li>
              <li>• 후속 상담 및 서비스 제공</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">개인정보 보유 기간</h4>
            <p className="text-sm">서비스 이용 완료 후 3년간 보관 (관련 법령에 따라)</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dataProcessingConsent"
                checked={formData.privacyConsent?.dataProcessingConsent || false}
                onCheckedChange={(checked) => 
                  updateFormData('privacyConsent.dataProcessingConsent', checked)
                }
              />
              <Label htmlFor="dataProcessingConsent" className="text-sm">
                개인정보 수집 및 이용에 동의합니다 (필수) *
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={formData.privacyConsent?.marketingConsent || false}
                onCheckedChange={(checked) => 
                  updateFormData('privacyConsent.marketingConsent', checked)
                }
              />
              <Label htmlFor="marketingConsent" className="text-sm">
                마케팅 정보 수신에 동의합니다 (선택)
              </Label>
            </div>
          </div>
          
          {getFieldError('dataProcessingConsent') && (
            <p className="text-red-500 text-sm">{getFieldError('dataProcessingConsent')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
  /**
   * 현재 단계 내용 렌더링
   */
  const renderStepContent = () => {
    switch (formSteps[currentStep].id) {
      case 'basic-info':
        return renderBasicInfoStep();
      case 'company-info':
        return renderCompanyInfoStep();
      case 'ai-assessment':
        return renderAssessmentStep();
      case 'privacy-consent':
        return renderPrivacyConsentStep();
      default:
        return <div>알 수 없는 단계입니다.</div>;
    }
  };
  
  // ================================================================================
  // 📋 유틸리티 함수들
  // ================================================================================
  
  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find(error => error.field === field)?.message;
  };
  
  const getFieldErrorClass = (field: string): string => {
    return getFieldError(field) ? 'border-red-500' : '';
  };
  
  // ================================================================================
  // 📋 메인 렌더링
  // ================================================================================
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI 역량진단 (PRD 기반)
        </h1>
        <p className="text-gray-600">
          15분 진단으로 전문가 수준의 AI 역량 분석을 받아보세요
        </p>
      </div>
      
      {/* 진행 표시 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {formSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2
                  ${isActive ? 'bg-blue-500 border-blue-500 text-white' : ''}
                  ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                `}>
                  <StepIcon className="w-6 h-6" />
                </div>
                <span className={`text-xs text-center ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 text-center mt-2">
          {Math.round(progress)}% 완료
        </p>
      </div>
      
      {/* 현재 단계 내용 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-blue-600">
              {React.createElement(formSteps[currentStep].icon, { className: "w-6 h-6" })}
            </span>
            <span>{formSteps[currentStep].title}</span>
          </CardTitle>
          <p className="text-gray-600">{formSteps[currentStep].description}</p>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
      
      {/* 오류 메시지 */}
      {validationErrors.length > 0 && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">입력 오류</span>
            </div>
            <ul className="text-sm text-red-600 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error.message}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* 네비게이션 버튼 */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
        >
          이전
        </Button>
        
        <Button
          onClick={handleNextStep}
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              처리 중...
            </>
          ) : currentStep === formSteps.length - 1 ? (
            '진단 시작'
          ) : (
            '다음'
          )}
        </Button>
      </div>
    </div>
  );
}

// ================================================================================
// 🎯 유틸리티 함수들
// ================================================================================

/**
 * 평가 점수를 PRD 형식으로 변환
 */
function convertAssessmentScores(scores: Record<string, number>): UserInputData['assessmentScores'] {
  const q1_to_q8: number[] = [];
  const q9_to_q16: number[] = [];
  const q17_to_q24: number[] = [];
  const q25_to_q32: number[] = [];
  const q33_to_q40: number[] = [];
  const q41_to_q45: number[] = [];
  
  for (let i = 1; i <= 45; i++) {
    const score = scores[`q${i}`] || 0;
    
    if (i <= 8) q1_to_q8.push(score);
    else if (i <= 16) q9_to_q16.push(score);
    else if (i <= 24) q17_to_q24.push(score);
    else if (i <= 32) q25_to_q32.push(score);
    else if (i <= 40) q33_to_q40.push(score);
    else q41_to_q45.push(score);
  }
  
  return { q1_to_q8, q9_to_q16, q17_to_q24, q25_to_q32, q33_to_q40, q41_to_q45 };
}

/**
 * 클라이언트 IP 주소 가져오기
 */
async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return '0.0.0.0';
  }
}

/**
 * 브라우저 정보 가져오기
 */
function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  
  return 'Unknown';
}

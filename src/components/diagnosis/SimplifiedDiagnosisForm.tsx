'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import PrivacyConsent from '@/components/ui/privacy-consent';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Building, 
  User, 
  Users, 
  MapPin,
  AlertCircle,
  Star,
  Loader2,
  CheckCircle2,
  FileText,
  Brain,
  Clock,
  Building2,
  Target,
  TrendingUp,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Zap,
  Mail,
  Phone,
  ArrowLeft,
  BarChart3,
  Award,
  ShoppingCart,
  MessageCircle,
  Store,
  Package,
  Palette
} from 'lucide-react';

// 🚀 **최고 사양 5점 척도 20개 문항 진단 폼 스키마**
const advancedDiagnosisFormSchema = z.object({
  // 기본 정보 (5개)
  companyName: z.string().min(2, '회사명을 입력해주세요'),
  industry: z.string().min(1, '업종을 선택해주세요'),
  contactManager: z.string().min(2, '담당자명을 입력해주세요'),
  phone: z.string().min(10, '연락처를 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요').min(1, '이메일을 입력해주세요'),
  employeeCount: z.string().min(1, '직원수를 선택해주세요'),
  
  // 추가 정보 (주요 고민사항, 예상 혜택)
  mainConcerns: z.string().min(4, '주요 고민사항을 4자 이상 입력해주세요'),
  expectedBenefits: z.string().min(4, '예상 혜택을 4자 이상 입력해주세요'),
  
  // 🔶 상품/서비스 관리 역량 (5개, 가중치 25%)
  planning_level: z.number().min(1).max(5).nullable(),
  differentiation_level: z.number().min(1).max(5).nullable(),
  pricing_level: z.number().min(1).max(5).nullable(),
  expertise_level: z.number().min(1).max(5).nullable(),
  quality_level: z.number().min(1).max(5).nullable(),
  
  // 🔷 고객응대 역량 (4개, 가중치 20%)
  customer_greeting: z.number().min(1).max(5).nullable(),
  customer_service: z.number().min(1).max(5).nullable(),
  complaint_management: z.number().min(1).max(5).nullable(),
  customer_retention: z.number().min(1).max(5).nullable(),
  
  // 🔸 마케팅 역량 (5개, 가중치 25%)
  customer_understanding: z.number().min(1).max(5).nullable(),
  marketing_planning: z.number().min(1).max(5).nullable(),
  offline_marketing: z.number().min(1).max(5).nullable(),
  online_marketing: z.number().min(1).max(5).nullable(),
  sales_strategy: z.number().min(1).max(5).nullable(),
  
  // 🔹 구매/재고관리 (2개, 가중치 15%)
  purchase_management: z.number().min(1).max(5).nullable(),
  inventory_management: z.number().min(1).max(5).nullable(),
  
  // 🔺 매장관리 역량 (4개, 가중치 15%)
  exterior_management: z.number().min(1).max(5).nullable(),
  interior_management: z.number().min(1).max(5).nullable(),
  cleanliness: z.number().min(1).max(5).nullable(),
  work_flow: z.number().min(1).max(5).nullable(),
  
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요',
  }),
});

type AdvancedDiagnosisFormData = z.infer<typeof advancedDiagnosisFormSchema>;

interface SimplifiedDiagnosisFormProps {
  onComplete: (data: any) => void;
  onBack?: () => void;
}

// 🍎 업종 옵션 (간소화)
const industryOptions = [
  '제조업', '도소매업', '음식점/숙박업', 'IT/소프트웨어', '건설업',
  '서비스업', '의료/보건업', '교육/문화', '운수/물류', '기타'
];

// 🍎 직원수 옵션
const employeeCountOptions = [
  '1-5명', '6-10명', '11-30명', '31-50명', '51-100명', '100명 이상'
];

// 🚀 **5개 영역별 평가 카테고리 정의**
const evaluationCategories = [
  {
    id: 'productService',
    name: '상품/서비스 관리 역량',
    icon: ShoppingCart,
    color: 'blue',
    weight: 25,
    description: '주력 상품과 서비스의 기획, 차별화, 가격 설정, 전문성, 품질 관리 역량',
    items: [
      {
        id: 'planning_level',
        name: '기획 수준',
        question: '주력 상품과 서비스의 구성이 확고하며 주기적으로 개선하고 있는가?',
        description: '상품/서비스 기획의 체계성과 지속적 개선 노력'
      },
      {
        id: 'differentiation_level',
        name: '차별화 정도',
        question: '동종업계 대비 차별화되며 모방이 어려운가?',
        description: '경쟁사 대비 독창성과 차별화 요소의 확보 정도'
      },
      {
        id: 'pricing_level',
        name: '가격 설정의 적절성',
        question: '경쟁업체 분석을 통해 가격 설정이 적절히 되어 있는가?',
        description: '시장 분석 기반의 합리적 가격 정책 수립'
      },
      {
        id: 'expertise_level',
        name: '전문성 및 기술력',
        question: '관련 전문성과 기술력을 보유하고 있는가?',
        description: '업무 수행에 필요한 전문 지식과 기술적 역량'
      },
      {
        id: 'quality_level',
        name: '품질 관리',
        question: '품질이 균일하며 지속적으로 개선하고 있는가?',
        description: '일관된 품질 유지와 지속적 품질 향상 시스템'
      }
    ]
  },
  {
    id: 'customerService',
    name: '고객응대 역량',
    icon: MessageCircle,
    color: 'green',
    weight: 20,
    description: '고객과의 소통, 응대, 불만 처리, 관계 유지 역량',
    items: [
      {
        id: 'customer_greeting',
        name: '고객맞이',
        question: '직원들의 용모와 복장을 주기적으로 관리하는가?',
        description: '고객 접점에서의 첫인상과 전문적 이미지 관리'
      },
      {
        id: 'customer_service',
        name: '고객 응대',
        question: '매뉴얼과 교육을 통해 원활한 고객응대를 하는가?',
        description: '체계적인 고객 서비스 교육과 표준화된 응대 방식'
      },
      {
        id: 'complaint_management',
        name: '고객 불만관리',
        question: '불만사항에 대한 체계적 관리 시스템이 있는가?',
        description: '고객 불만 접수, 처리, 개선 프로세스의 체계화'
      },
      {
        id: 'customer_retention',
        name: '고객 유지',
        question: '고객 유지와 관리를 위한 방안을 수행하고 있는가?',
        description: '기존 고객 관계 유지와 재방문 유도 활동'
      }
    ]
  },
  {
    id: 'marketing',
    name: '마케팅 역량',
    icon: TrendingUp,
    color: 'purple',
    weight: 25,
    description: '고객 이해, 마케팅 계획, 온오프라인 마케팅, 판매 전략 역량',
    items: [
      {
        id: 'customer_understanding',
        name: '고객 특성 이해',
        question: '고객 특성과 시장 트렌드를 주기적으로 파악하는가?',
        description: '타겟 고객 분석과 시장 동향 모니터링'
      },
      {
        id: 'marketing_planning',
        name: '마케팅 및 홍보 계획',
        question: '구체적인 마케팅 실행방안을 가지고 있는가?',
        description: '체계적인 마케팅 전략 수립과 실행 계획'
      },
      {
        id: 'offline_marketing',
        name: '오프라인 마케팅',
        question: '판촉행사를 정기적으로 표준화하여 운영하는가?',
        description: '오프라인 채널을 통한 마케팅 활동의 체계화'
      },
      {
        id: 'online_marketing',
        name: '온라인 마케팅',
        question: '온라인 마케팅을 통한 매출 증대가 이루어지는가?',
        description: '디지털 채널 활용과 온라인 마케팅 성과'
      },
      {
        id: 'sales_strategy',
        name: '판매 전략',
        question: '다양한 판매 채널별 전략을 구성하고 있는가?',
        description: '멀티채널 판매 전략과 채널별 차별화 방안'
      }
    ]
  },
  {
    id: 'procurement',
    name: '구매 및 재고관리',
    icon: Package,
    color: 'orange',
    weight: 15,
    description: '원재료 구매, 재고 관리, 공급망 최적화 역량',
    items: [
      {
        id: 'purchase_management',
        name: '구매관리',
        question: '원재료/설비 구매를 체계적으로 관리하는가?',
        description: '구매 프로세스의 체계화와 비용 효율성 관리'
      },
      {
        id: 'inventory_management',
        name: '재고관리',
        question: '계획을 바탕으로 적정 재고를 유지하는가?',
        description: '재고 수준 최적화와 재고 회전율 관리'
      }
    ]
  },
  {
    id: 'storeManagement',
    name: '매장관리 역량',
    icon: Store,
    color: 'indigo',
    weight: 15,
    description: '매장 외관, 인테리어, 청결도, 작업 동선 관리 역량',
    items: [
      {
        id: 'exterior_management',
        name: '외관 관리',
        question: '매장 간판과 디자인이 효과적으로 어필하는가?',
        description: '매장 외관의 시각적 어필과 브랜드 이미지 구현'
      },
      {
        id: 'interior_management',
        name: '인테리어 관리',
        question: '인테리어가 컨셉과 일치하며 편의시설을 갖추었는가?',
        description: '매장 내부 공간 구성과 고객 편의성 고려'
      },
      {
        id: 'cleanliness',
        name: '청결도',
        question: '내/외부가 청결하며 주기적 청소를 하는가?',
        description: '매장 위생 관리와 청결 유지 시스템'
      },
      {
        id: 'work_flow',
        name: '작업 동선',
        question: '효율적 작업공간과 고객 소통이 가능한가?',
        description: '업무 효율성과 고객 접근성을 고려한 공간 설계'
      }
    ]
  }
];

// 🎯 **5점 척도 라벨**
const scaleLabels = [
  { value: 1, label: '매우 부족', color: 'text-red-600', bg: 'bg-red-50' },
  { value: 2, label: '부족', color: 'text-orange-600', bg: 'bg-orange-50' },
  { value: 3, label: '보통', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { value: 4, label: '우수', color: 'text-blue-600', bg: 'bg-blue-50' },
  { value: 5, label: '매우 우수', color: 'text-green-600', bg: 'bg-green-50' }
];

export default function SimplifiedDiagnosisForm({ onComplete, onBack }: SimplifiedDiagnosisFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: 기본정보, 2-6: 각 영역별 평가
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { toast } = useToast();

  const form = useForm<AdvancedDiagnosisFormData>({
    resolver: zodResolver(advancedDiagnosisFormSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      contactManager: '',
      phone: '',
      email: '',
      employeeCount: '',
      mainConcerns: '',
      expectedBenefits: '',
      // 모든 평가 항목을 null로 초기화
      planning_level: null,
      differentiation_level: null,
      pricing_level: null,
      expertise_level: null,
      quality_level: null,
      customer_greeting: null,
      customer_service: null,
      complaint_management: null,
      customer_retention: null,
      customer_understanding: null,
      marketing_planning: null,
      offline_marketing: null,
      online_marketing: null,
      sales_strategy: null,
      purchase_management: null,
      inventory_management: null,
      exterior_management: null,
      interior_management: null,
      cleanliness: null,
      work_flow: null,
      privacyConsent: false,
    },
  });

  // 📊 **진행률 계산**
  const calculateProgress = () => {
    const currentValues = form.getValues();
    const totalItems = 20; // 20개 평가 항목
    const answeredItems = evaluationCategories
      .flatMap(cat => cat.items)
      .filter(item => currentValues[item.id as keyof AdvancedDiagnosisFormData] !== null).length;
    
    return Math.round((answeredItems / totalItems) * 100);
  };

  // 🎯 **각 단계별 완료 여부 확인**
  const isStepComplete = (step: number) => {
    const currentValues = form.getValues();
    
    if (step === 1) {
      // 기본 정보 단계
      const requiredFields = ['companyName', 'industry', 'contactManager', 'phone', 'email', 'employeeCount', 'mainConcerns', 'expectedBenefits'] as const;
      return requiredFields.every(field => {
        const value = currentValues[field];
        return value && value.trim().length > 0;
      });
    } else if (step >= 2 && step <= 6) {
      // 평가 영역 단계
      const categoryIndex = step - 2;
      const category = evaluationCategories[categoryIndex];
      return category.items.every(item => 
        currentValues[item.id as keyof AdvancedDiagnosisFormData] !== null
      );
    }
    return false;
  };

  // 🚀 **고급 진단 처리 (Enhanced 진단평가 엔진 v3.0 연동)**
  const onSubmit = async (data: AdvancedDiagnosisFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    toast({
      title: "🔮 고급 AI 진단 분석 중...",
      description: "Enhanced 진단평가 엔진 v3.0으로 정교한 분석을 진행합니다.",
      duration: 3000,
    });

    try {
      console.log('🚀 고급 진단 데이터 전송:', {
        기본정보: {
          회사명: data.companyName,
          업종: data.industry,
          담당자: data.contactManager,
          연락처: data.phone,
          이메일: data.email,
          직원수: data.employeeCount
        },
        평가점수개수: Object.keys(data).filter(key => 
          key.includes('_') && data[key as keyof AdvancedDiagnosisFormData] !== null
        ).length + '/20개'
      });

      // Enhanced 진단평가 엔진 v3.0 API 호출
      const requestData = {
        ...data,
        // 🔥 누락된 필드들 기본값 설정
        businessLocation: '서울특별시',
        growthStage: 'growth',
        submitDate: new Date().toISOString()
      };
      
      const response = await fetch('/api/simplified-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`진단 처리 실패: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // 🔒 안전한 데이터 접근 (undefined 방지)
        const diagnosis = result?.data?.diagnosis;
        const totalScore = diagnosis?.totalScore || 0;
        
        toast({
          title: "🎉 고급 AI 진단이 완료되었습니다!",
          description: `종합 점수 ${totalScore}점 - 전문가 수준의 분석 결과를 확인하세요.`,
          duration: 4000,
        });
        
        console.log('✅ 고급 진단 완료:', {
          totalScore: totalScore,
          reportType: result.data?.reportType,
          enhanced: result.data?.enhanced,
          analysisEngine: result.data?.analysisEngine,
          hasDiagnosis: !!diagnosis
        });
        
        // 결과 전달
        onComplete(result);
      } else {
        throw new Error(result.error || '진단 처리 중 오류가 발생했습니다.');
      }
      
    } catch (error) {
      console.error('❌ 고급 진단 처리 오류:', error);
      
      // 🔍 상세한 오류 정보 로깅
      if (error instanceof Error) {
        console.error('오류 상세:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      
      let errorTitle = "진단 처리 중 오류가 발생했습니다";
      let errorDescription = "잠시 후 다시 시도해주시거나 전문가 상담을 신청해주세요.";
      
      // 🎯 구체적인 오류 메시지 제공
      if (error instanceof Error) {
        if (error.message.includes('diagnosis')) {
          errorTitle = "진단 데이터 처리 오류";
          errorDescription = "진단 결과를 처리하는 중 문제가 발생했습니다. 다시 시도해주세요.";
        } else if (error.message.includes('네트워크') || error.message.includes('fetch')) {
          errorTitle = "네트워크 연결 오류";
          errorDescription = "인터넷 연결을 확인하고 다시 시도해주세요.";
        }
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🎯 **단계 이동 함수**
  const nextStep = () => {
    if (currentStep < 6) {
      if (isStepComplete(currentStep)) {
        setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep]);
        setCurrentStep(currentStep + 1);
      } else {
        // 단계별 구체적인 오류 메시지
        let stepErrorMessage = "현재 단계의 모든 필수 정보를 입력한 후 다음 단계로 진행할 수 있습니다.";
        
        if (currentStep === 1) {
          const formValues = form.getValues();
          const missingFields = [];
          
          if (!formValues.companyName?.trim()) missingFields.push("회사명");
          if (!formValues.industry?.trim()) missingFields.push("업종");
          if (!formValues.contactManager?.trim()) missingFields.push("담당자명");
          if (!formValues.phone?.trim()) missingFields.push("연락처");
          if (!formValues.email?.trim()) missingFields.push("이메일");
          if (!formValues.employeeCount?.trim()) missingFields.push("직원수");
          if (!formValues.mainConcerns || formValues.mainConcerns.length < 4) missingFields.push("주요 고민사항 (4자 이상)");
          if (!formValues.expectedBenefits || formValues.expectedBenefits.length < 4) missingFields.push("예상 혜택 (4자 이상)");
          
          if (missingFields.length > 0) {
            stepErrorMessage = `다음 기본정보를 입력해 주세요: ${missingFields.join(", ")}`;
          }
        } else if (currentStep >= 2 && currentStep <= 6) {
          stepErrorMessage = "현재 단계의 모든 평가 항목을 선택해주세요 (1점~5점 척도).";
        }
        
        toast({
          title: "📝 필수 정보를 입력해주세요",
          description: stepErrorMessage,
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 🎨 **단계별 렌더링**
  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          🔮 고급 AI 진단 평가
        </h2>
        <Badge variant="outline" className="text-sm">
          {calculateProgress()}% 완료
        </Badge>
      </div>
      
      <Progress value={calculateProgress()} className="h-3 mb-4" />
      
      <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-2">
        {[
          { step: 1, name: '기본정보', icon: Building2 },
          { step: 2, name: '상품/서비스', icon: ShoppingCart },
          { step: 3, name: '고객응대', icon: MessageCircle },
          { step: 4, name: '마케팅', icon: TrendingUp },
          { step: 5, name: '구매/재고', icon: Package },
          { step: 6, name: '매장관리', icon: Store }
        ].map(({ step, name, icon: Icon }) => (
          <div 
            key={step}
            className={`flex flex-col items-center space-y-2 min-w-[80px] ${
              currentStep === step ? 'text-blue-600' : 
              completedSteps.includes(step) ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
              currentStep === step ? 'bg-blue-600' : 
              completedSteps.includes(step) ? 'bg-green-600' : 'bg-gray-400'
            }`}>
              {completedSteps.includes(step) ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
            </div>
            <span className="text-xs font-medium text-center">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // 📝 **5점 척도 평가 컴포넌트**
  const renderScaleInput = (item: any, categoryColor: string) => (
    <FormField
      key={item.id}
      control={form.control}
      name={item.id as keyof AdvancedDiagnosisFormData}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="border-l-4 border-gray-200 pl-4">
            <FormLabel className="text-base font-semibold text-gray-900">
              {item.name}
            </FormLabel>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              {item.question}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              {item.description}
            </p>
            
            {/* 5점 척도 버튼 */}
            <div className="grid grid-cols-5 gap-2">
              {scaleLabels.map((scale) => (
                <button
                  key={scale.value}
                  type="button"
                  onClick={() => field.onChange(scale.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                    field.value === scale.value
                      ? `border-${categoryColor}-500 ${scale.bg} ${scale.color} shadow-md`
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <div className="font-bold text-lg">{scale.value}</div>
                  <div className="text-xs font-medium">{scale.label}</div>
                </button>
              ))}
            </div>
            
            {/* 선택된 점수 표시 */}
            {field.value && (
              <div className="mt-3 text-center">
                <Badge variant="outline" className={scaleLabels.find(s => s.value === field.value)?.color}>
                  선택: {field.value}점 ({scaleLabels.find(s => s.value === field.value)?.label})
                </Badge>
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="max-w-5xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {renderStepIndicator()}

          {/* 🍎 1단계: 기본 정보 */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">기본 정보 입력</CardTitle>
                <p className="text-gray-600">회사 정보와 연락처를 입력해주세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* 회사 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base font-semibold">
                          <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                          회사명 *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(주)AICAMP" 
                            className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center text-base font-semibold">
                          <Building className="w-5 h-5 mr-2 text-purple-600" />
                          업종 *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-all">
                              <SelectValue placeholder="업종을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="z-[10000] bg-white/95 backdrop-blur-sm shadow-2xl border-gray-200 industry-select">
                            {industryOptions.map((industry) => (
                              <SelectItem 
                                key={industry} 
                                value={industry}
                                className="hover:bg-purple-50 focus:bg-purple-50 cursor-pointer"
                              >
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 담당자 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactManager"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base font-semibold">
                          <User className="w-5 h-5 mr-2 text-green-600" />
                          담당자명 *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="홍길동" 
                            className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base font-semibold">
                          <Users className="w-5 h-5 mr-2 text-orange-600" />
                          직원수 *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-all">
                              <SelectValue placeholder="직원수를 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="z-[10000] bg-white/95 backdrop-blur-sm shadow-2xl border-gray-200 employee-select">
                            {employeeCountOptions.map((count) => (
                              <SelectItem 
                                key={count} 
                                value={count}
                                className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer"
                              >
                                {count}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 연락처 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base font-semibold">
                          <Phone className="w-5 h-5 mr-2 text-red-600" />
                          연락처 *
                        </FormLabel>
                        <FormControl>
                          <PhoneInput 
                            placeholder="010-1234-5678" 
                            className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-all"
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
                        <FormLabel className="flex items-center text-base font-semibold">
                          <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                          이메일 *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="example@company.com" 
                            className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 주요 고민사항과 예상 혜택 */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="mainConcerns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base font-semibold">
                          <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                          주요 고민사항 *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="현재 겪고 있는 경영상의 주요 문제점이나 고민사항을 구체적으로 작성해주세요. (예: 매출 정체, 인력 부족, 마케팅 효과 미흡 등)" 
                            className="min-h-[100px] border-2 hover:border-blue-400 focus:border-blue-500 transition-all resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expectedBenefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base font-semibold">
                          <Target className="w-5 h-5 mr-2 text-green-600" />
                          예상 혜택 *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="AI 진단을 통해 기대하는 개선사항이나 혜택을 작성해주세요. (예: 업무 효율성 향상, 비용 절감, 신규 사업 기회 발굴 등)" 
                            className="min-h-[100px] border-2 hover:border-blue-400 focus:border-blue-500 transition-all resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 다음 단계 버튼 */}
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={onBack}
                    className="px-6"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    이전으로
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete(1)}
                    className="px-6"
                  >
                    다음 단계
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 🚀 2-6단계: 5개 영역별 평가 */}
          {currentStep >= 2 && currentStep <= 6 && (() => {
            const categoryIndex = currentStep - 2;
            const category = evaluationCategories[categoryIndex];
            const Icon = category.icon;
            
            return (
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${category.color}-600`} />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">
                    {category.name}
                  </CardTitle>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                  <Badge variant="outline" className="mx-auto mt-3">
                    가중치: {category.weight}% | {category.items.length}개 문항
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-8">
                  
                  {/* 평가 문항들 */}
                  {category.items.map((item) => renderScaleInput(item, category.color))}

                  {/* 네비게이션 버튼 */}
                  <div className="flex justify-between pt-6">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={prevStep}
                      className="px-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      이전 단계
                    </Button>
                    
                    {currentStep < 6 ? (
                      <Button 
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepComplete(currentStep)}
                        className="px-6"
                      >
                        다음 단계
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        {/* 개인정보 동의 */}
                        <FormField
                          control={form.control}
                          name="privacyConsent"
                          render={({ field }) => (
                            <FormItem>
                              <PrivacyConsent 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                required={true}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* 진단 완료 버튼 */}
                        <Button 
                          type="submit"
                          disabled={isSubmitting || !form.getValues('privacyConsent')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 h-auto text-white"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              고급 AI 진단 분석 중...
                            </>
                          ) : (
                            <>
                              <Brain className="w-5 h-5 mr-2" />
                              🔮 고급 AI 진단 완료하기
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

        </form>
      </Form>
    </div>
  );
} 
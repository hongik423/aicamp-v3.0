'use client';

import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Users, 
  Building2,
  CreditCard,
  PiggyBank,
  Car,
  Home,
  Heart,
  Briefcase,
  Globe
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 금융/보험 업종 성공사례 데이터
export const financeInsuranceCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'bank-digital-transformation': {
    id: 'bank-digital-transformation',
    category: 'finance',
    industry: '금융업',
    subIndustry: '은행',
    companyName: 'KB국민은행 (직원 2,500명)',
    companySize: '대기업',
    title: '디지털 뱅킹 혁신과 AI 고객경험',
    subtitle: 'AI 기반 개인화 서비스로 고객 만족도 95% 달성',
    description: '전통 은행에서 AI와 n8n을 활용한 디지털 뱅킹 혁신으로 고객 경험을 완전히 재정의한 성공사례',
    icon: DollarSign,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '은행업',
      employees: '2,500명',
      revenue: '연 매출 15조원',
      location: '서울시 중구'
    },
    challenges: [
      {
        title: '고객 서비스 개인화 한계',
        description: '일괄 서비스로 인한 고객별 맞춤 솔루션 제공 어려움',
        impact: '고객 만족도 정체 및 이탈율 증가'
      },
      {
        title: '디지털 채널 활용 부족',
        description: '오프라인 중심 서비스로 디지털 고객 접점 부족',
        impact: '젊은 고객층 이탈 및 경쟁력 약화'
      },
      {
        title: '리스크 관리 비효율',
        description: '수작업 기반 신용평가로 대출 심사 시간 오래 소요',
        impact: '고객 대기시간 증가 및 비즈니스 기회 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '금융업 특화 AI 도입 전략과 디지털 전환 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '금융 서비스 맞춤형 AI 소통 기법과 고객 상담 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '금융 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '디지털 뱅킹 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '금융업 AI 도입 리스크 관리 및 규제 준수 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 디지털 전환 전략 수립',
        duration: '4주',
        activities: [
          '현재 고객 여정 분석',
          'AI 적용 가능 영역 식별',
          '디지털 전환 로드맵 수립'
        ],
        results: [
          '20개 핵심 고객 터치포인트 식별',
          'AI 우선 적용 영역 8개 선정'
        ]
      },
      {
        phase: '2단계: AI 개인화 서비스 구축',
        duration: '8주',
        activities: [
          'AI 기반 고객 프로파일링',
          '개인화 상품 추천 시스템',
          '실시간 고객 상담 챗봇'
        ],
        results: [
          '고객 만족도 95% 달성',
          '상품 추천 정확도 92%'
        ]
      },
      {
        phase: '3단계: 디지털 채널 확장',
        duration: '12주',
        activities: [
          '모바일 뱅킹 AI 기능 추가',
          '웹 채널 개인화 서비스',
          'API 기반 서비스 연동'
        ],
        results: [
          '디지털 채널 이용률 80% 증가',
          '신규 고객 확보 150% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '고객 만족도',
          before: '72%',
          after: '95%',
          improvement: '23%p 향상'
        },
        {
          metric: '디지털 채널 이용률',
          before: '45%',
          after: '81%',
          improvement: '80% 증가'
        },
        {
          metric: '상품 추천 정확도',
          before: '65%',
          after: '92%',
          improvement: '41.5% 향상'
        }
      ],
      financial: [
        {
          item: '연간 운영비 절감',
          amount: '120억원'
        },
        {
          item: '신규 고객 확보 수익',
          amount: '300억원'
        },
        {
          item: '고객 생애가치 증가',
          amount: '500억원'
        }
      ],
      qualitative: [
        '젊은 고객층 유입으로 고객층 다변화 달성',
        '개인화 서비스로 고객 충성도 극대화',
        '디지털 혁신으로 업계 선도적 위치 확보'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 은행이 완전히 달라졌습니다. 고객들이 "이제 은행이 나를 정말 이해한다"고 하시고, 직원들도 더 창의적인 업무에 집중할 수 있게 되었어요. 디지털 혁신의 진정한 의미를 깨달았습니다.',
      author: '박○○',
      position: '디지털 혁신본부장',
      company: 'KB국민은행'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 디지털 혁신 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 금융 혁신상 수상'
      }
    ],
    tags: ['AI', '디지털뱅킹', '개인화서비스', '고객경험', '챗봇'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 120억원',
      errorReduction: '90%',
      productivityGain: '200%'
    },
    n8nWorkflows: [
      {
        workflowName: '고객 프로파일링 자동화',
        description: '고객 행동 데이터 기반 개인화 프로파일 생성',
        triggerType: '실시간 데이터',
        integrations: ['CRM', '데이터웨어하우스', 'AI모델'],
        executionCount: 50000
      },
      {
        workflowName: '상품 추천 엔진',
        description: 'AI 기반 개인화 상품 추천 시스템',
        triggerType: '고객 행동',
        integrations: ['고객데이터', '상품DB', '추천알고리즘'],
        executionCount: 100000
      }
    ],
    aiImplementations: [
      {
        aiTool: 'NLP 챗봇',
        useCase: '고객 상담 및 상품 안내',
        accuracy: '94%',
        trainingData: '100만건 상담 기록'
      },
      {
        aiTool: '추천 시스템',
        useCase: '개인화 상품 추천',
        accuracy: '92%',
        trainingData: '500만건 거래 데이터'
      }
    ],
    departmentAutomations: [
      {
        department: '고객서비스팀',
        processes: ['상담', '상품안내', '문의처리'],
        automationLevel: '85%',
        manualHours: '40시간/주',
        automatedHours: '6시간/주',
        efficiency: '85% 개선'
      },
      {
        department: '마케팅팀',
        processes: ['고객분석', '상품추천', '캠페인'],
        automationLevel: '90%',
        manualHours: '35시간/주',
        automatedHours: '4시간/주',
        efficiency: '88.6% 개선'
      }
    ],
    roiData: {
      investment: '50억원',
      monthlySavings: '10억원',
      paybackPeriod: '5개월',
      threeYearROI: '1,800%'
    },
    implementationTimeline: '24주',
    successFactors: [
      '경영진의 강력한 디지털 전환 의지',
      '고객 중심의 서비스 설계',
      '단계적이고 체계적인 도입',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'insurance-claims-automation': {
    id: 'insurance-claims-automation',
    category: 'finance',
    industry: '보험업',
    subIndustry: '손해보험',
    companyName: '삼성화재 (직원 1,800명)',
    companySize: '대기업',
    title: 'AI 기반 보험금 청구 자동화',
    subtitle: '청구 처리 시간 90% 단축, 고객 만족도 98% 달성',
    description: 'AI와 n8n을 활용한 보험금 청구 프로세스 자동화로 고객 경험을 혁신하고 운영 효율성을 극대화한 성공사례',
    icon: Shield,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '손해보험',
      employees: '1,800명',
      revenue: '연 매출 8조원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '청구 처리 시간 지연',
        description: '수작업 기반 청구 심사로 평균 15일 소요',
        impact: '고객 불만 증가 및 경쟁력 약화'
      },
      {
        title: '사기 위험 관리 한계',
        description: '육안 검토로 인한 사기 탐지 정확도 70% 수준',
        impact: '사기 손실 증가 및 보험료 상승'
      },
      {
        title: '고객 서비스 부족',
        description: '청구 진행 상황 실시간 안내 어려움',
        impact: '고객 문의 증가 및 만족도 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '보험업 특화 AI 도입 전략과 디지털 전환 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '보험 업무 맞춤형 AI 소통 기법과 문서 처리 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '보험 청구 프로세스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '보험 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '보험업 AI 도입 리스크 관리 및 규제 준수 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 청구 프로세스 분석',
        duration: '3주',
        activities: [
          '현재 청구 처리 프로세스 매핑',
          '병목 지점 식별',
          'AI 적용 가능 영역 분석'
        ],
        results: [
          '12개 핵심 프로세스 식별',
          '자동화 우선순위 6개 영역 선정'
        ]
      },
      {
        phase: '2단계: AI 청구 심사 시스템',
        duration: '8주',
        activities: [
          'AI 기반 서류 검토 자동화',
          '사기 탐지 알고리즘 구축',
          '실시간 청구 상태 추적'
        ],
        results: [
          '청구 처리 시간 90% 단축',
          '사기 탐지 정확도 95% 달성'
        ]
      },
      {
        phase: '3단계: 고객 서비스 혁신',
        duration: '6주',
        activities: [
          '24시간 AI 상담 챗봇',
          '모바일 청구 앱 개발',
          '실시간 알림 시스템'
        ],
        results: [
          '고객 만족도 98% 달성',
          '고객 문의 70% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '청구 처리 시간',
          before: '15일',
          after: '1.5일',
          improvement: '90% 단축'
        },
        {
          metric: '사기 탐지 정확도',
          before: '70%',
          after: '95%',
          improvement: '35.7% 향상'
        },
        {
          metric: '고객 만족도',
          before: '75%',
          after: '98%',
          improvement: '30.7%p 향상'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 80억원'
        },
        {
          item: '사기 손실 감소',
          amount: '연 120억원'
        },
        {
          item: '고객 유지율 향상 수익',
          amount: '연 200억원'
        }
      ],
      qualitative: [
        '고객 경험 혁신으로 업계 선도적 위치 확보',
        '직원들의 고부가가치 업무 집중 가능',
        '디지털 전환으로 경쟁력 대폭 향상'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 보험 청구가 완전히 달라졌습니다. 고객들이 "이제 보험 청구가 이렇게 쉬웠나?"라고 하시고, 직원들도 반복적인 서류 검토에서 벗어나 더 중요한 업무에 집중할 수 있게 되었어요.',
      author: '이○○',
      position: '디지털 혁신팀장',
      company: '삼성화재'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 최고 수준 청구 처리 속도 달성'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 보험 혁신상 수상'
      }
    ],
    tags: ['AI', '보험청구', '자동화', '사기탐지', '고객서비스'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 200억원',
      errorReduction: '95%',
      productivityGain: '300%'
    },
    n8nWorkflows: [
      {
        workflowName: '청구 서류 자동 검토',
        description: 'AI 기반 서류 검토 및 승인 자동화',
        triggerType: '서류 접수',
        integrations: ['OCR', 'AI모델', '결제시스템'],
        executionCount: 25000
      },
      {
        workflowName: '사기 탐지 시스템',
        description: '실시간 사기 위험 분석 및 알림',
        triggerType: '청구 접수',
        integrations: ['데이터베이스', 'AI모델', '보안시스템'],
        executionCount: 15000
      }
    ],
    aiImplementations: [
      {
        aiTool: 'Computer Vision',
        useCase: '서류 검토 및 OCR',
        accuracy: '98%',
        trainingData: '100만건 서류 이미지'
      },
      {
        aiTool: 'Anomaly Detection',
        useCase: '사기 탐지',
        accuracy: '95%',
        trainingData: '50만건 청구 데이터'
      }
    ],
    departmentAutomations: [
      {
        department: '청구심사팀',
        processes: ['서류검토', '심사', '승인'],
        automationLevel: '90%',
        manualHours: '40시간/주',
        automatedHours: '4시간/주',
        efficiency: '90% 개선'
      },
      {
        department: '고객서비스팀',
        processes: ['상담', '진행상황안내', '문의처리'],
        automationLevel: '85%',
        manualHours: '35시간/주',
        automatedHours: '5시간/주',
        efficiency: '85.7% 개선'
      }
    ],
    roiData: {
      investment: '30억원',
      monthlySavings: '16억 7천만원',
      paybackPeriod: '1.8개월',
      threeYearROI: '2,400%'
    },
    implementationTimeline: '17주',
    successFactors: [
      '고객 중심의 서비스 설계',
      '정확한 프로세스 분석',
      '단계적 자동화 도입',
      '지속적인 성과 모니터링'
    ],
    featured: true
  }
};

// 성공사례 목록 데이터
export const financeInsuranceCases: SuccessCase[] = [
  {
    id: 'bank-digital-transformation',
    category: 'finance',
    industry: '금융업',
    companyName: 'KB국민은행 (직원 2,500명)',
    title: '디지털 뱅킹 혁신과 AI 고객경험',
    description: 'AI 기반 개인화 서비스로 고객 만족도 95% 달성, 디지털 채널 이용률 80% 증가',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: DollarSign,
    color: 'blue',
    results: {
      efficiency: '200% 향상',
      satisfaction: '95% 달성'
    },
    tags: ['AI', '디지털뱅킹', '개인화서비스', '고객경험'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 120억원',
      errorReduction: '90%',
      productivityGain: '200%'
    }
  },
  {
    id: 'insurance-claims-automation',
    category: 'finance',
    industry: '보험업',
    companyName: '삼성화재 (직원 1,800명)',
    title: 'AI 기반 보험금 청구 자동화',
    description: '청구 처리 시간 90% 단축, 고객 만족도 98% 달성, 사기 탐지 정확도 95%',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Shield,
    color: 'green',
    results: {
      efficiency: '300% 향상',
      satisfaction: '98% 달성'
    },
    tags: ['AI', '보험청구', '자동화', '사기탐지'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 200억원',
      errorReduction: '95%',
      productivityGain: '300%'
    }
  }
];

export default financeInsuranceCaseDetails;

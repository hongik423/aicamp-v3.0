'use client';

import { 
  Factory, 
  Building2, 
  TrendingUp, 
  Zap, 
  Brain, 
  Settings,
  Users,
  ShoppingCart,
  Truck,
  Heart,
  GraduationCap,
  Hammer,
  DollarSign,
  Radio,
  Film,
  Fuel,
  Wheat
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// AI & n8n 프로세스 자동화 성공사례 데이터
export const successCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'manufacturing-smart-factory': {
    id: 'manufacturing-smart-factory',
    category: 'manufacturing',
    industry: '제조업',
    subIndustry: '정밀기계 부품 제조',
    companyName: 'A사 (직원 120명)',
    companySize: '중소기업',
    title: 'AI 기반 스마트팩토리 구축',
    subtitle: 'n8n + AI로 생산성 300% 향상',
    description: '전통적인 제조업에서 AI와 n8n을 활용한 프로세스 자동화로 생산성을 획기적으로 개선한 성공사례',
    icon: Factory,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '정밀기계 부품 제조',
      employees: '120명',
      revenue: '연 매출 150억원',
      location: '경기도 안산시'
    },
    challenges: [
      {
        title: '생산 계획 수립 비효율',
        description: '수작업으로 인한 생산 계획 수립에 매일 4시간 소요',
        impact: '생산 효율성 저하 및 납기 지연 빈발'
      },
      {
        title: '품질 관리 한계',
        description: '육안 검사로 인한 불량품 검출률 75% 수준',
        impact: '고객 클레임 증가 및 재작업 비용 발생'
      },
      {
        title: '재고 관리 복잡성',
        description: '300여 종의 부품 재고를 엑셀로 관리',
        impact: '과재고 및 결품 동시 발생으로 자금 효율성 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '제조업 특화 AI 도입 전략과 구성원 몰입도 극대화'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간', 
          description: '제조업 현장 맞춤형 AI 소통 기법과 업무 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '스마트팩토리 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '고몰입 제조팀 구축을 위한 변혁적 리더십'
        },
        {
          title: '혁신 문화 구축과 AI 융합',
          duration: '20시간',
          description: '제조 혁신을 주도하는 조직문화 조성'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '제조업 AI 도입 리스크 관리 및 윤리적 기반 마련'
        },
        {
          title: '성과 우수성과 AI 융합 관리',
          duration: '20시간',
          description: '제조업 성과 혁신을 위한 AI 기반 관리 시스템'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 현황 분석',
        duration: '2주',
        activities: [
          '현재 생산 프로세스 매핑',
          '데이터 수집 포인트 식별',
          'AI 적용 가능 영역 분석'
        ],
        results: [
          '15개 핵심 프로세스 식별',
          '7개 자동화 우선순위 영역 선정'
        ]
      },
      {
        phase: '2단계: 파일럿 구축',
        duration: '4주',
        activities: [
          'n8n 기반 생산계획 자동화',
          'AI 품질검사 시스템 구축',
          '실시간 모니터링 대시보드 개발'
        ],
        results: [
          '생산계획 수립 시간 80% 단축',
          '불량품 검출률 95% 달성'
        ]
      },
      {
        phase: '3단계: 전사 확산',
        duration: '8주',
        activities: [
          '전 생산라인 확대 적용',
          '직원 교육 및 체인지 매니지먼트',
          '성과 측정 시스템 구축'
        ],
        results: [
          '전 직원 AI 활용 능력 확보',
          '월간 생산성 지표 300% 개선'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '생산 계획 수립 시간',
          before: '4시간/일',
          after: '30분/일',
          improvement: '87.5% 단축'
        },
        {
          metric: '불량품 검출률',
          before: '75%',
          after: '95%',
          improvement: '20%p 향상'
        },
        {
          metric: '재고 회전율',
          before: '연 6회',
          after: '연 12회',
          improvement: '100% 개선'
        }
      ],
      financial: [
        {
          item: '연간 인건비 절감',
          amount: '2억 4천만원'
        },
        {
          item: '품질 비용 절감',
          amount: '1억 8천만원'
        },
        {
          item: '재고 비용 절감',
          amount: '3억 2천만원'
        }
      ],
      qualitative: [
        '직원들의 단순 반복업무 해소로 창의적 업무 집중 가능',
        '실시간 데이터 기반 의사결정으로 경영 민첩성 향상',
        '고객 만족도 98% 달성으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI와 n8n을 도입한 후 우리 공장이 완전히 달라졌습니다. 직원들이 더 이상 단순 반복업무에 시달리지 않고, 데이터를 보고 똑똑한 판단을 할 수 있게 되었어요. 매출도 30% 늘었고, 무엇보다 일하는 재미를 찾았습니다.',
      author: '김○○',
      position: '생산관리팀장',
      company: 'A사'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '신규 고객 확보 40% 증가'
      },
      {
        metric: '1년 후 성과',
        achievement: '업계 벤치마킹 기업으로 선정'
      }
    ],
    tags: ['AI', 'n8n', '스마트팩토리', '생산성', '품질관리', '재고관리'],
    automationMetrics: {
      timeReduction: '87.5%',
      costSaving: '연 7억 4천만원',
      errorReduction: '92%',
      productivityGain: '300%'
    },
    n8nWorkflows: [
      {
        name: '생산계획 자동화',
        description: 'ERP 데이터 기반 최적 생산계획 자동 생성',
        nodes: 12,
        triggers: ['스케줄 기반', 'ERP 데이터 변경'],
        actions: ['데이터 분석', '계획 생성', 'Slack 알림']
      },
      {
        name: '품질검사 알림',
        description: 'AI 품질검사 결과 실시간 알림',
        nodes: 8,
        triggers: ['이벤트 기반', 'AI 모델 결과'],
        actions: ['데이터 처리', '알림 전송', '리포트 생성']
      }
    ],
    aiImplementations: [
      {
        type: 'Computer Vision',
        purpose: '제품 품질 검사',
        accuracy: '95%',
        processingTime: '0.3초'
      },
      {
        type: '예측 분석 모델',
        purpose: '생산량 예측',
        accuracy: '92%',
        processingTime: '1.2초'
      }
    ],
    departmentAutomations: [
      {
        department: '생산관리팀',
        automationLevel: '90%',
        timeSaved: '28시간/주',
        costReduction: '87.5% 개선'
      },
      {
        department: '자재관리팀',
        automationLevel: '85%',
        timeSaved: '22시간/주',
        costReduction: '78.6% 개선'
      }
    ],
    roiData: {
      investment: '8천만원',
      monthlySavings: '6천 2백만원',
      paybackPeriod: '1.3개월',
      threeYearROI: '2,750%'
    },
    implementationTimeline: '14주',
    successFactors: [
      '경영진의 강력한 의지와 AI 비전 제시',
      '전 직원 AI 마인드셋 전환 및 고몰입 문화 조성',
      '개인별 맞춤형 성장 계획과 지속적 학습 지원',
      '혁신 실험을 장려하는 심리적 안전감 확보',
      '성과와 웰빙을 균형있게 관리하는 리더십',
      'AI 윤리와 투명성을 기반으로 한 신뢰 구축',
      '부서 간 협업과 지식 공유 문화 정착',
      '실시간 피드백과 인정을 통한 동기부여 시스템'
    ],
    videoUrl: 'https://youtube.com/watch?v=example1',
    pdfUrl: '/reports/manufacturing-case-study.pdf',
    featured: true
  },

  'service-crm-automation': {
    id: 'service-crm-automation',
    category: 'service',
    industry: '서비스업',
    subIndustry: '고객관리 서비스',
    companyName: 'B사 (직원 45명)',
    companySize: '중소기업',
    title: '고객관리 완전 자동화',
    subtitle: 'AI CRM으로 고객만족도 98% 달성',
    description: 'AI와 n8n을 활용한 고객관리 프로세스 자동화로 고객만족도와 매출을 동시에 향상시킨 성공사례',
    icon: Users,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '고객관리 서비스',
      employees: '45명',
      revenue: '연 매출 80억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '고객 응대 지연',
        description: '전화 상담 대기시간 평균 5분, 이메일 응답 시간 24시간',
        impact: '고객 불만 증가 및 이탈율 상승'
      },
      {
        title: '개인화 서비스 한계',
        description: '고객별 맞춤 서비스 제공의 어려움',
        impact: '고객만족도 정체 및 재구매율 저조'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 고객 중심 문화 혁신',
          duration: '16시간',
          description: '서비스업 특화 AI 도입과 고객 만족도 극대화를 위한 조직 변화'
        },
        {
          title: '고급 프롬프트 엔지니어링 - 고객서비스 특화',
          duration: '20시간', 
          description: '고객 응대 및 서비스 개선을 위한 전문 AI 활용법'
        }
      ],
      advanced: [
        {
          title: 'N8N 고객여정 자동화 시스템',
          duration: '24시간',
          description: '고객 접점부터 만족까지 전체 여정 자동화'
        },
        {
          title: '서비스 리더십과 팀 몰입도 혁신',
          duration: '16시간',
          description: '고객 중심 조직문화와 직원 몰입도 동시 향상'
        },
        {
          title: '지속적 학습 시스템과 서비스 혁신',
          duration: '16시간',
          description: '고객 피드백 기반 지속적 서비스 개선 문화'
        }
      ],
      executive: [
        {
          title: 'AI 기반 고객 경험 전략',
          duration: '12시간',
          description: '데이터 기반 고객 경험 설계 및 AI 윤리 경영'
        },
        {
          title: '서비스 성과 우수성 관리',
          duration: '20시간',
          description: 'AI 기반 서비스 품질 관리 및 직원 성과 최적화'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 고객 여정 분석',
        duration: '1주',
        activities: [
          '고객 터치포인트 매핑',
          '현재 응대 프로세스 분석'
        ],
        results: [
          '12개 핵심 터치포인트 식별',
          '자동화 우선순위 설정'
        ]
      },
      {
        phase: '2단계: AI 챗봇 구축',
        duration: '3주',
        activities: [
          'FAQ 기반 챗봇 개발',
          'n8n 워크플로우 연동'
        ],
        results: [
          '80% 문의 자동 해결',
          '응답 시간 95% 단축'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '고객 응답 시간',
          before: '24시간',
          after: '즉시',
          improvement: '100% 단축'
        },
        {
          metric: '고객만족도',
          before: '72%',
          after: '98%',
          improvement: '26%p 향상'
        }
      ],
      financial: [
        {
          item: '인건비 절감',
          amount: '연 1억 2천만원'
        }
      ],
      qualitative: [
        '24시간 고객 지원 서비스 실현',
        '직원들의 고부가가치 업무 집중 가능'
      ]
    },
    testimonial: {
      quote: 'AI 챗봇 도입 후 고객들이 "이제 언제든지 도움을 받을 수 있어서 좋다"고 하십니다. 직원들도 반복적인 문의 응답에서 벗어나 더 창의적인 업무에 집중할 수 있게 되었어요.',
      author: '이○○',
      position: '고객서비스팀장',
      company: 'B사'
    },
    followUpResults: [
      {
        metric: '3개월 후',
        achievement: '고객 재구매율 45% 증가'
      }
    ],
    tags: ['AI챗봇', 'CRM', '고객서비스', '자동화'],
    automationMetrics: {
      timeReduction: '95%',
      costSaving: '연 1억 2천만원',
      errorReduction: '88%',
      productivityGain: '250%'
    },
    n8nWorkflows: [
      {
        name: '고객 문의 자동 분류',
        description: '문의 유형별 자동 라우팅',
        nodes: 6,
        triggers: ['이메일 수신', 'CRM 이벤트'],
        actions: ['텍스트 분석', '분류 처리', 'Slack 알림']
      }
    ],
    aiImplementations: [
      {
        type: 'NLP 챗봇',
        purpose: '고객 상담',
        accuracy: '89%',
        processingTime: '0.8초'
      }
    ],
    departmentAutomations: [
      {
        department: '고객서비스팀',
        automationLevel: '80%',
        timeSaved: '32시간/주',
        costReduction: '80% 개선'
      }
    ],
    roiData: {
      investment: '3천만원',
      monthlySavings: '1천만원',
      paybackPeriod: '3개월',
      threeYearROI: '1,200%'
    },
    implementationTimeline: '4주',
    successFactors: [
      '고객 중심 마인드셋과 AI 활용의 완벽한 융합',
      '직원 개인별 성장 목표와 조직 목표의 일치',
      '실패를 학습 기회로 전환하는 혁신 문화',
      '고객 피드백 기반 지속적 서비스 개선',
      '팀 간 협업과 지식 공유를 통한 시너지 창출',
      'AI 도구 활용 역량과 감성 지능의 균형 발전',
      '성과 인정과 보상을 통한 동기부여 강화',
      '리더의 코칭과 멘토링을 통한 지속적 성장 지원'
    ],
    featured: true
  }
};

// 성공사례 목록 데이터
export const successCases: SuccessCase[] = [
  {
    id: 'manufacturing-smart-factory',
    category: 'manufacturing',
    industry: '제조업',
    companyName: 'A사 (직원 120명)',
    title: 'AI 기반 스마트팩토리 구축',
    description: 'n8n + AI로 생산성 300% 향상, 연 7억 4천만원 비용 절감',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Factory,
    color: 'blue',
    results: {
      efficiency: '300% 향상',
      satisfaction: '98% 달성'
    },
    tags: ['AI', 'n8n', '스마트팩토리'],
    automationMetrics: {
      timeReduction: '87.5%',
      costSaving: '연 7억 4천만원',
      errorReduction: '92%',
      productivityGain: '300%'
    }
  },
  {
    id: 'service-crm-automation',
    category: 'service',
    industry: '서비스업',
    companyName: 'B사 (직원 45명)',
    title: '고객관리 완전 자동화',
    description: 'AI CRM으로 고객만족도 98% 달성, 응답시간 100% 단축',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Users,
    color: 'green',
    results: {
      efficiency: '250% 향상',
      satisfaction: '98% 달성'
    },
    tags: ['AI챗봇', 'CRM', '고객서비스'],
    automationMetrics: {
      timeReduction: '95%',
      costSaving: '연 1억 2천만원',
      errorReduction: '88%',
      productivityGain: '250%'
    }
  }
];

// 업종별 필터링 옵션
export const industryOptions = [
  { value: 'all', label: '전체 업종' },
  { value: 'manufacturing', label: '제조업' },
  { value: 'service', label: '서비스업' },
  { value: 'startup', label: '스타트업' },
  { value: 'finance', label: '금융업' },
  { value: 'healthcare', label: '의료/헬스케어' },
  { value: 'education', label: '교육/연구' },
  { value: 'logistics', label: '물류/유통' },
  { value: 'construction', label: '건설/부동산' },
];

// 부서별 필터링 옵션
export const departmentOptions = [
  { value: 'all', label: '전체 부서' },
  { value: 'planning', label: '기획/전략' },
  { value: 'sales', label: '영업' },
  { value: 'marketing', label: '마케팅' },
  { value: 'production', label: '생산/물류' },
  { value: 'customer', label: '고객지원' },
  { value: 'hr', label: '인사/총무' },
  { value: 'finance', label: '재무/회계' },
];

// 회사 규모별 필터링 옵션
export const companySizeOptions = [
  { value: 'all', label: '전체 규모' },
  { value: 'startup', label: '스타트업 (1-10명)' },
  { value: 'small', label: '소기업 (11-50명)' },
  { value: 'medium', label: '중기업 (51-300명)' },
  { value: 'large', label: '대기업 (300명 이상)' },
];

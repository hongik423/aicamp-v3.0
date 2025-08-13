'use client';

import { 
  ShoppingCart, 
  Store, 
  Truck, 
  Coffee, 
  Hotel, 
  Plane, 
  Bike,
  Users,
  TrendingUp,
  Zap,
  Heart,
  Star,
  Globe,
  Building2
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 유통/서비스 업종 성공사례 데이터
export const retailServiceCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'offline-retail-smart-store': {
    id: 'offline-retail-smart-store',
    category: 'retail',
    industry: '유통업',
    subIndustry: '오프라인 소매업',
    companyName: '이마트 (직원 3,200명)',
    companySize: '대기업',
    title: '스마트 스토어 혁신과 AI 고객경험',
    subtitle: 'AI 기반 개인화 쇼핑으로 매출 40% 증가',
    description: '전통 오프라인 소매업에서 AI와 n8n을 활용한 스마트 스토어 구축으로 고객 경험을 혁신한 성공사례',
    icon: Store,
    color: 'blue',
    heroImage: '/images/benchmark/83AI 기반 유통 재고 관리.png',
    companyInfo: {
      industry: '대형마트',
      employees: '3,200명',
      revenue: '연 매출 25조원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '고객 개인화 서비스 부족',
        description: '일괄 서비스로 인한 고객별 맞춤 상품 추천 어려움',
        impact: '고객 만족도 정체 및 매출 성장 한계'
      },
      {
        title: '재고 관리 비효율',
        description: '수작업 기반 재고 관리로 과재고 및 결품 동시 발생',
        impact: '매출 손실 및 고객 불만 증가'
      },
      {
        title: '고객 행동 분석 한계',
        description: '오프라인 고객 행동 데이터 수집 및 분석 어려움',
        impact: '마케팅 효과 측정 부족 및 의사결정 한계'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '유통업 특화 AI 도입 전략과 디지털 전환 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '유통 서비스 맞춤형 AI 소통 기법과 고객 상담 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '유통 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '스마트 리테일 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '유통업 AI 도입 리스크 관리 및 개인정보 보호 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 스마트 스토어 인프라 구축',
        duration: '6주',
        activities: [
          'IoT 센서 및 카메라 설치',
          '고객 행동 추적 시스템 구축',
          'AI 기반 재고 관리 시스템'
        ],
        results: [
          '전 매장 IoT 인프라 완성',
          '실시간 고객 행동 데이터 수집'
        ]
      },
      {
        phase: '2단계: AI 개인화 서비스',
        duration: '8주',
        activities: [
          '고객 프로파일링 시스템',
          '개인화 상품 추천',
          '스마트 카트 서비스'
        ],
        results: [
          '고객 만족도 92% 달성',
          '개인화 추천 정확도 88%'
        ]
      },
      {
        phase: '3단계: 운영 최적화',
        duration: '10주',
        activities: [
          'AI 기반 재고 최적화',
          '직원 업무 자동화',
          '실시간 매출 분석'
        ],
        results: [
          '재고 회전율 50% 향상',
          '매출 40% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '매출 증가율',
          before: '기준',
          after: '+40%',
          improvement: '40% 증가'
        },
        {
          metric: '고객 만족도',
          before: '78%',
          after: '92%',
          improvement: '17.9%p 향상'
        },
        {
          metric: '재고 회전율',
          before: '연 8회',
          after: '연 12회',
          improvement: '50% 향상'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 10조원'
        },
        {
          item: '재고 비용 절감',
          amount: '연 500억원'
        },
        {
          item: '운영비 절감',
          amount: '연 300억원'
        }
      ],
      qualitative: [
        '고객 개인화 서비스로 충성도 극대화',
        '실시간 데이터 기반 의사결정으로 경영 효율성 향상',
        '스마트 리테일 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 매장이 완전히 달라졌습니다. 고객들이 "이제 쇼핑이 이렇게 편리했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 고객 서비스에 집중할 수 있게 되었어요.',
      author: '김○○',
      position: '스마트 리테일 본부장',
      company: '이마트'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 스마트 리테일 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 리테일 혁신상 수상'
      }
    ],
    tags: ['AI', '스마트스토어', '개인화서비스', '재고관리', 'IoT'],
    automationMetrics: {
      timeReduction: '75%',
      costSaving: '연 800억원',
      errorReduction: '85%',
      productivityGain: '150%'
    },
    n8nWorkflows: [
      {
        name: '재고 자동 관리',
        description: 'AI 기반 재고 예측 및 자동 발주 시스템',
        nodes: 15,
        triggers: ['실시간 재고 데이터'],
        actions: ['ERP', '공급업체API', 'AI모델']
      },
      {
        name: '고객 행동 분석',
        description: '실시간 고객 행동 데이터 분석 및 인사이트 생성',
        nodes: 20,
        triggers: ['고객 행동'],
        actions: ['IoT센서', '카메라', '분석엔진']
      }
    ],
    aiImplementations: [
      {
        type: 'Computer Vision',
        purpose: '고객 행동 분석',
        accuracy: '92%',
        processingTime: '100만건 고객 행동 데이터'
      },
      {
        type: '예측 분석',
        purpose: '재고 수요 예측',
        accuracy: '89%',
        processingTime: '3년간 판매 데이터'
      }
    ],
    departmentAutomations: [
      {
        department: '매장운영팀',
        automationLevel: '80%',
        timeSaved: '32시간/주',
        costReduction: '연 800억원'
      },
      {
        department: '마케팅팀',
        automationLevel: '85%',
        timeSaved: '30시간/주',
        costReduction: '연 600억원'
      }
    ],
    roiData: {
      investment: '100억원',
      monthlySavings: '66억 7천만원',
      paybackPeriod: '1.5개월',
      threeYearROI: '3,600%'
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

  'ecommerce-personalization': {
    id: 'ecommerce-personalization',
    category: 'retail',
    industry: '유통업',
    subIndustry: '이커머스/온라인쇼핑',
    companyName: '쿠팡 (직원 5,000명)',
    companySize: '대기업',
    title: 'AI 기반 개인화 쇼핑 경험',
    subtitle: '개인화 추천으로 매출 60% 증가, 고객 만족도 96% 달성',
    description: 'AI와 n8n을 활용한 개인화 쇼핑 경험으로 고객 충성도를 극대화하고 매출을 혁신적으로 증가시킨 성공사례',
    icon: ShoppingCart,
    color: 'orange',
    heroImage: '/images/benchmark/84AI 기반 고객 맞춤형 추천.png',
    companyInfo: {
      industry: '이커머스',
      employees: '5,000명',
      revenue: '연 매출 35조원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '일괄 상품 추천 한계',
        description: '모든 고객에게 동일한 상품 추천으로 개인화 부족',
        impact: '고객 이탈율 증가 및 매출 성장 한계'
      },
      {
        title: '고객 행동 분석 부족',
        description: '복잡한 고객 행동 데이터 분석 어려움',
        impact: '마케팅 효과 측정 부족 및 의사결정 한계'
      },
      {
        title: '고객 서비스 부족',
        description: '24시간 고객 상담 서비스 제공 어려움',
        impact: '고객 불만 증가 및 만족도 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '이커머스 특화 AI 도입 전략과 디지털 혁신 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '이커머스 서비스 맞춤형 AI 소통 기법과 고객 상담 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '이커머스 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '디지털 커머스 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '이커머스 AI 도입 리스크 관리 및 개인정보 보호 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 고객 데이터 통합',
        duration: '4주',
        activities: [
          '고객 행동 데이터 수집',
          '개인화 알고리즘 개발',
          'A/B 테스트 환경 구축'
        ],
        results: [
          '고객 행동 데이터 통합 완료',
          '개인화 알고리즘 1차 개발'
        ]
      },
      {
        phase: '2단계: 개인화 서비스 구축',
        duration: '8주',
        activities: [
          'AI 기반 상품 추천 시스템',
          '개인화 홈페이지',
          '맞춤형 프로모션'
        ],
        results: [
          '개인화 추천 정확도 92% 달성',
          '고객 만족도 96% 달성'
        ]
      },
      {
        phase: '3단계: 고객 서비스 혁신',
        duration: '6주',
        activities: [
          '24시간 AI 상담 챗봇',
          '실시간 고객 피드백 시스템',
          '개인화 알림 서비스'
        ],
        results: [
          '고객 문의 응답 시간 95% 단축',
          '고객 이탈율 40% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '매출 증가율',
          before: '기준',
          after: '+60%',
          improvement: '60% 증가'
        },
        {
          metric: '고객 만족도',
          before: '82%',
          after: '96%',
          improvement: '17.1%p 향상'
        },
        {
          metric: '개인화 추천 정확도',
          before: '65%',
          after: '92%',
          improvement: '41.5% 향상'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 21조원'
        },
        {
          item: '고객 획득 비용 절감',
          amount: '연 800억원'
        },
        {
          item: '고객 생애가치 증가',
          amount: '연 1,200억원'
        }
      ],
      qualitative: [
        '개인화 서비스로 고객 충성도 극대화',
        '실시간 데이터 기반 의사결정으로 경영 효율성 향상',
        'AI 기반 이커머스 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 쇼핑몰이 완전히 달라졌습니다. 고객들이 "이제 쇼핑이 이렇게 편리했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 고객 서비스에 집중할 수 있게 되었어요.',
      author: '박○○',
      position: 'AI 혁신 본부장',
      company: '쿠팡'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 AI 이커머스 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 이커머스 혁신상 수상'
      }
    ],
    tags: ['AI', '개인화', '추천시스템', '고객경험', '챗봇'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 2,000억원',
      errorReduction: '95%',
      productivityGain: '200%'
    },
    n8nWorkflows: [
      {
        name: '개인화 추천 엔진',
        description: 'AI 기반 개인화 상품 추천 시스템',
        nodes: 18,
        triggers: ['고객 행동'],
        actions: ['고객데이터', '상품DB', 'AI모델']
      },
      {
        name: '고객 상담 자동화',
        description: '24시간 AI 상담 챗봇 시스템',
        nodes: 12,
        triggers: ['고객 문의'],
        actions: ['챗봇', 'CRM', '지식베이스']
      }
    ],
    aiImplementations: [
      {
        type: '추천 시스템',
        purpose: '개인화 상품 추천',
        accuracy: '92%',
        processingTime: '1,000만건 고객 행동 데이터'
      },
      {
        type: 'NLP 챗봇',
        purpose: '고객 상담',
        accuracy: '94%',
        processingTime: '500만건 상담 기록'
      }
    ],
    departmentAutomations: [
      {
        department: '개발팀',
        automationLevel: '90%',
        timeSaved: '36시간/주',
        costReduction: '연 1,200억원'
      },
      {
        department: '고객서비스팀',
        automationLevel: '85%',
        timeSaved: '30시간/주',
        costReduction: '연 800억원'
      }
    ],
    roiData: {
      investment: '200억원',
      monthlySavings: '166억 7천만원',
      paybackPeriod: '1.2개월',
      threeYearROI: '4,200%'
    },
    implementationTimeline: '18주',
    successFactors: [
      '경영진의 강력한 AI 혁신 의지',
      '고객 중심의 서비스 설계',
      '단계적이고 체계적인 도입',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'wholesale-supply-chain': {
    id: 'wholesale-supply-chain',
    category: 'retail',
    industry: '유통업',
    subIndustry: '도매업',
    companyName: 'CJ대한통운 (직원 2,800명)',
    companySize: '대기업',
    title: 'AI 기반 공급망 최적화',
    subtitle: '공급망 효율성 80% 향상, 운영비 50% 절감',
    description: 'AI와 n8n을 활용한 공급망 최적화로 물류 효율성을 극대화하고 운영비를 대폭 절감한 성공사례',
    icon: Truck,
    color: 'green',
    heroImage: '/images/benchmark/88AI 기반 제품 수요 예측.png',
    companyInfo: {
      industry: '물류/도매',
      employees: '2,800명',
      revenue: '연 매출 12조원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '공급망 비효율',
        description: '수작업 기반 공급망 관리로 재고 과다 및 배송 지연',
        impact: '운영비 증가 및 고객 만족도 저하'
      },
      {
        title: '수요 예측 부정확',
        description: '전통적 방법으로 수요 예측 정확도 60% 수준',
        impact: '재고 과다 및 결품 동시 발생'
      },
      {
        title: '배송 경로 최적화 부족',
        description: '비효율적인 배송 경로로 배송 시간 및 비용 증가',
        impact: '배송 비용 증가 및 고객 불만'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '물류업 특화 AI 도입 전략과 디지털 전환 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '물류 서비스 맞춤형 AI 소통 기법과 업무 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '물류 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '스마트 물류 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '물류업 AI 도입 리스크 관리 및 안전성 확보 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 공급망 데이터 통합',
        duration: '4주',
        activities: [
          '공급망 데이터 수집 및 통합',
          'AI 기반 수요 예측 모델 개발',
          '실시간 모니터링 시스템 구축'
        ],
        results: [
          '전 공급망 데이터 통합 완료',
          '수요 예측 정확도 85% 달성'
        ]
      },
      {
        phase: '2단계: AI 최적화 시스템',
        duration: '8주',
        activities: [
          'AI 기반 재고 최적화',
          '배송 경로 최적화 알고리즘',
          '자동 발주 시스템'
        ],
        results: [
          '재고 회전율 60% 향상',
          '배송 시간 40% 단축'
        ]
      },
      {
        phase: '3단계: 운영 자동화',
        duration: '6주',
        activities: [
          '자동화된 창고 관리',
          '실시간 배송 추적',
          '예측적 유지보수'
        ],
        results: [
          '운영비 50% 절감',
          '고객 만족도 94% 달성'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '공급망 효율성',
          before: '기준',
          after: '+80%',
          improvement: '80% 향상'
        },
        {
          metric: '수요 예측 정확도',
          before: '60%',
          after: '85%',
          improvement: '41.7% 향상'
        },
        {
          metric: '배송 시간',
          before: '3일',
          after: '1.8일',
          improvement: '40% 단축'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 6,000억원'
        },
        {
          item: '재고 비용 절감',
          amount: '연 2,000억원'
        },
        {
          item: '배송 비용 절감',
          amount: '연 1,500억원'
        }
      ],
      qualitative: [
        'AI 기반 최적화로 운영 효율성 극대화',
        '실시간 모니터링으로 의사결정 속도 향상',
        '스마트 물류 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 물류가 완전히 달라졌습니다. 고객들이 "이제 배송이 이렇게 빠르고 정확했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 고객 서비스에 집중할 수 있게 되었어요.',
      author: '이○○',
      position: '스마트 물류 본부장',
      company: 'CJ대한통운'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 스마트 물류 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 물류 혁신상 수상'
      }
    ],
    tags: ['AI', '공급망', '물류', '최적화', '자동화'],
    automationMetrics: {
      timeReduction: '80%',
      costSaving: '연 9,500억원',
      errorReduction: '90%',
      productivityGain: '200%'
    },
    n8nWorkflows: [
      {
        name: '수요 예측 자동화',
        description: 'AI 기반 수요 예측 및 자동 발주 시스템',
        nodes: 16,
        triggers: ['실시간 판매 데이터'],
        actions: ['ERP', '공급업체API', 'AI모델']
      },
      {
        name: '배송 경로 최적화',
        description: 'AI 기반 최적 배송 경로 계산 및 할당',
        nodes: 14,
        triggers: ['주문 접수'],
        actions: ['주문시스템', 'GPS', 'AI모델']
      }
    ],
    aiImplementations: [
      {
        type: '예측 분석',
        purpose: '수요 예측',
        accuracy: '85%',
        processingTime: '5년간 판매 데이터'
      },
      {
        type: '최적화 알고리즘',
        purpose: '배송 경로 최적화',
        accuracy: '92%',
        processingTime: '3년간 배송 데이터'
      }
    ],
    departmentAutomations: [
      {
        department: '물류운영팀',
        automationLevel: '85%',
        timeSaved: '34시간/주',
        costReduction: '연 1,500억원'
      },
      {
        department: '고객서비스팀',
        automationLevel: '80%',
        timeSaved: '28시간/주',
        costReduction: '연 1,000억원'
      }
    ],
    roiData: {
      investment: '150억원',
      monthlySavings: '791억 7천만원',
      paybackPeriod: '0.2개월',
      threeYearROI: '6,300%'
    },
    implementationTimeline: '18주',
    successFactors: [
      '경영진의 강력한 디지털 전환 의지',
      '정확한 공급망 분석',
      '단계적이고 체계적인 도입',
      '지속적인 성과 모니터링'
    ],
    featured: true
  },

  'fashion-boutique-digital': {
    id: 'fashion-boutique-digital',
    category: 'retail',
    industry: '유통업',
    subIndustry: '패션/부티',
    companyName: '무신사 (직원 1,200명)',
    companySize: '중견기업',
    title: 'AI 기반 패션 트렌드 예측과 개인화 스타일링',
    subtitle: '트렌드 예측 정확도 88%, 고객 만족도 94% 달성',
    description: 'AI와 n8n을 활용한 패션 트렌드 예측과 개인화 스타일링으로 고객 경험을 혁신한 성공사례',
    icon: Heart,
    color: 'pink',
    heroImage: '/images/benchmark/81AI 기반 패션 트렌드 예측.png',
    companyInfo: {
      industry: '패션/부티',
      employees: '1,200명',
      revenue: '연 매출 8,000억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '패션 트렌드 예측 부정확',
        description: '전통적 방법으로 트렌드 예측 정확도 60% 수준',
        impact: '잘못된 상품 기획으로 재고 과다 및 매출 손실'
      },
      {
        title: '개인화 스타일링 부족',
        description: '일괄 상품 추천으로 개인별 스타일 맞춤 어려움',
        impact: '고객 만족도 저하 및 이탈율 증가'
      },
      {
        title: '고객 피드백 수집 한계',
        description: '수작업 기반 고객 피드백 분석으로 반영 지연',
        impact: '상품 기획 및 마케팅 효과 측정 부족'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '패션업 특화 AI 도입 전략과 디지털 혁신 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '패션 서비스 맞춤형 AI 소통 기법과 스타일링 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '패션 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '디지털 패션 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '패션업 AI 도입 리스크 관리 및 개인정보 보호 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 트렌드 데이터 수집',
        duration: '4주',
        activities: [
          '소셜미디어 트렌드 데이터 수집',
          'AI 기반 트렌드 예측 모델 개발',
          '고객 스타일 데이터 분석'
        ],
        results: [
          '트렌드 예측 정확도 88% 달성',
          '고객 스타일 프로파일링 완료'
        ]
      },
      {
        phase: '2단계: 개인화 스타일링',
        duration: '6주',
        activities: [
          'AI 기반 개인화 스타일링 시스템',
          '가상 피팅 서비스',
          '맞춤형 코디 추천'
        ],
        results: [
          '개인화 스타일링 정확도 92% 달성',
          '고객 만족도 94% 달성'
        ]
      },
      {
        phase: '3단계: 고객 경험 혁신',
        duration: '4주',
        activities: [
          '실시간 고객 피드백 시스템',
          'AI 기반 상품 기획',
          '개인화 마케팅'
        ],
        results: [
          '고객 피드백 반영 시간 80% 단축',
          '매출 45% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '트렌드 예측 정확도',
          before: '60%',
          after: '88%',
          improvement: '46.7% 향상'
        },
        {
          metric: '고객 만족도',
          before: '78%',
          after: '94%',
          improvement: '20.5%p 향상'
        },
        {
          metric: '매출 증가율',
          before: '기준',
          after: '+45%',
          improvement: '45% 증가'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 3,600억원'
        },
        {
          item: '재고 비용 절감',
          amount: '연 400억원'
        },
        {
          item: '마케팅 효율성 향상',
          amount: '연 300억원'
        }
      ],
      qualitative: [
        'AI 기반 트렌드 예측으로 상품 기획 정확도 향상',
        '개인화 스타일링으로 고객 충성도 극대화',
        '디지털 패션 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 패션 브랜드가 완전히 달라졌습니다. 고객들이 "이제 스타일링이 이렇게 정확했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 창의적인 디자인에 집중할 수 있게 되었어요.',
      author: '최○○',
      position: '패션 혁신 본부장',
      company: '무신사'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 AI 패션 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 패션 혁신상 수상'
      }
    ],
    tags: ['AI', '패션', '트렌드예측', '스타일링', '개인화'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 700억원',
      errorReduction: '88%',
      productivityGain: '180%'
    },
    n8nWorkflows: [
      {
        name: '트렌드 예측 자동화',
        description: 'AI 기반 패션 트렌드 예측 및 분석 시스템',
        nodes: 15,
        triggers: ['소셜미디어', '검색데이터', '판매데이터'],
        actions: ['데이터분석', 'AI모델', '리포트생성']
      },
      {
        name: '개인화 스타일링',
        description: 'AI 기반 개인화 스타일링 및 코디 추천 시스템',
        nodes: 12,
        triggers: ['고객행동', '스타일선호도', '구매이력'],
        actions: ['스타일분석', '코디추천', '피팅시뮬레이션']
      }
    ],
    aiImplementations: [
      {
        type: '트렌드 예측 AI',
        purpose: '패션 트렌드 예측',
        accuracy: '88%',
        processingTime: '실시간'
      },
      {
        type: '스타일링 AI',
        purpose: '개인화 스타일링',
        accuracy: '92%',
        processingTime: '5초'
      }
    ],
    departmentAutomations: [
      {
        department: '상품기획팀',
        automationLevel: '85%',
        timeSaved: '30시간/주',
        costReduction: '연 200억원'
      },
      {
        department: '마케팅팀',
        automationLevel: '80%',
        timeSaved: '25시간/주',
        costReduction: '연 150억원'
      }
    ],
    roiData: {
      investment: '80억원',
      monthlySavings: '58억 3천만원',
      paybackPeriod: '1.4개월',
      threeYearROI: '2,625%'
    },
    implementationTimeline: '14주',
    successFactors: [
      '경영진의 강력한 디지털 패션 혁신 의지',
      '고객 중심의 스타일링 서비스 설계',
      '정확한 트렌드 데이터 분석',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'restaurant-cafe-smart': {
    id: 'restaurant-cafe-smart',
    category: 'retail',
    industry: '유통업',
    subIndustry: '외식/카페',
    companyName: '스타벅스 (직원 2,500명)',
    companySize: '대기업',
    title: 'AI 기반 스마트 외식 서비스 혁신',
    subtitle: '고객 만족도 96%, 매출 50% 증가, 운영 효율성 120% 향상',
    description: 'AI와 n8n을 활용한 스마트 외식 서비스로 고객 경험을 혁신하고 운영 효율성을 극대화한 성공사례',
    icon: Coffee,
    color: 'brown',
    heroImage: 'https://source.unsplash.com/1200x800/?cafe,restaurant,barista,smart%20ordering',
    companyInfo: {
      industry: '외식/카페',
      employees: '2,500명',
      revenue: '연 매출 15,000억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '고객 대기 시간 과다',
        description: '수작업 기반 주문 처리로 고객 대기 시간 15분 이상',
        impact: '고객 불만 증가 및 매출 손실'
      },
      {
        title: '재료 관리 비효율',
        description: '수작업 기반 재료 관리로 폐기율 20% 수준',
        impact: '원가 증가 및 수익성 저하'
      },
      {
        title: '고객 선호도 분석 부족',
        description: '고객 선호도 데이터 수집 및 분석 어려움',
        impact: '메뉴 기획 및 마케팅 효과 측정 부족'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '외식업 특화 AI 도입 전략과 디지털 혁신 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '외식 서비스 맞춤형 AI 소통 기법과 고객 서비스 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '외식 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '스마트 외식 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '외식업 AI 도입 리스크 관리 및 식품 안전성 확보 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 스마트 주문 시스템',
        duration: '4주',
        activities: [
          'AI 기반 주문 예측 시스템',
          '자동 재료 발주 시스템',
          '고객 대기 시간 최적화'
        ],
        results: [
          '고객 대기 시간 70% 단축',
          '주문 처리 정확도 98% 달성'
        ]
      },
      {
        phase: '2단계: 개인화 서비스',
        duration: '6주',
        activities: [
          'AI 기반 개인화 메뉴 추천',
          '고객 선호도 분석 시스템',
          '맞춤형 프로모션'
        ],
        results: [
          '개인화 추천 정확도 90% 달성',
          '고객 만족도 96% 달성'
        ]
      },
      {
        phase: '3단계: 운영 최적화',
        duration: '4주',
        activities: [
          'AI 기반 재료 관리 최적화',
          '실시간 매출 분석',
          '예측적 유지보수'
        ],
        results: [
          '재료 폐기율 60% 감소',
          '매출 50% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '고객 대기 시간',
          before: '15분',
          after: '4.5분',
          improvement: '70% 단축'
        },
        {
          metric: '고객 만족도',
          before: '82%',
          after: '96%',
          improvement: '17.1%p 향상'
        },
        {
          metric: '재료 폐기율',
          before: '20%',
          after: '8%',
          improvement: '60% 감소'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 7,500억원'
        },
        {
          item: '재료 비용 절감',
          amount: '연 1,800억원'
        },
        {
          item: '운영비 절감',
          amount: '연 1,200억원'
        }
      ],
      qualitative: [
        'AI 기반 개인화 서비스로 고객 충성도 극대화',
        '실시간 데이터 기반 의사결정으로 경영 효율성 향상',
        '스마트 외식 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 카페가 완전히 달라졌습니다. 고객들이 "이제 주문이 이렇게 빠르고 정확했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 고객 서비스에 집중할 수 있게 되었어요.',
      author: '김○○',
      position: '스마트 외식 혁신 본부장',
      company: '스타벅스'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 스마트 외식 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 외식 혁신상 수상'
      }
    ],
    tags: ['AI', '외식', '스마트주문', '개인화', '재료관리'],
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 3,000억원',
      errorReduction: '90%',
      productivityGain: '120%'
    },
    n8nWorkflows: [
      {
        name: '스마트 주문 관리',
        description: 'AI 기반 주문 예측 및 자동 재료 발주 시스템',
        nodes: 18,
        triggers: ['주문데이터', '고객행동', '재고상태'],
        actions: ['주문예측', '재료발주', '인력배치']
      },
      {
        name: '개인화 메뉴 추천',
        description: 'AI 기반 개인화 메뉴 추천 및 프로모션 시스템',
        nodes: 14,
        triggers: ['고객선호도', '구매이력', '계절정보'],
        actions: ['메뉴추천', '프로모션', '피드백수집']
      }
    ],
    aiImplementations: [
      {
        type: '주문 예측 AI',
        purpose: '주문량 예측 및 재료 관리',
        accuracy: '92%',
        processingTime: '실시간'
      },
      {
        type: '개인화 AI',
        purpose: '개인화 메뉴 추천',
        accuracy: '90%',
        processingTime: '3초'
      }
    ],
    departmentAutomations: [
      {
        department: '매장운영팀',
        automationLevel: '85%',
        timeSaved: '35시간/주',
        costReduction: '연 800억원'
      },
      {
        department: '고객서비스팀',
        automationLevel: '80%',
        timeSaved: '30시간/주',
        costReduction: '연 600억원'
      }
    ],
    roiData: {
      investment: '120억원',
      monthlySavings: '250억원',
      paybackPeriod: '0.5개월',
      threeYearROI: '7,500%'
    },
    implementationTimeline: '14주',
    successFactors: [
      '경영진의 강력한 스마트 외식 혁신 의지',
      '고객 중심의 서비스 설계',
      '정확한 주문 예측 시스템',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'hotel-accommodation-smart': {
    id: 'hotel-accommodation-smart',
    category: 'retail',
    industry: '유통업',
    subIndustry: '숙박/호텔',
    companyName: '신라호텔 (직원 1,800명)',
    companySize: '대기업',
    title: 'AI 기반 스마트 호텔 서비스 혁신',
    subtitle: '고객 만족도 98%, 매출 55% 증가, 운영 효율성 140% 향상',
    description: 'AI와 n8n을 활용한 스마트 호텔 서비스로 고객 경험을 혁신하고 운영 효율성을 극대화한 성공사례',
    icon: Hotel,
    color: 'purple',
    heroImage: 'https://source.unsplash.com/1200x800/?hotel,hotel%20room,front%20desk,smart%20hotel',
    companyInfo: {
      industry: '숙박/호텔',
      employees: '1,800명',
      revenue: '연 매출 12,000억원',
      location: '서울시 중구'
    },
    challenges: [
      {
        title: '고객 서비스 응답 지연',
        description: '수작업 기반 고객 서비스로 응답 시간 30분 이상',
        impact: '고객 불만 증가 및 만족도 저하'
      },
      {
        title: '객실 관리 비효율',
        description: '수작업 기반 객실 관리로 예약 충돌 및 운영 비효율',
        impact: '매출 손실 및 고객 불만'
      },
      {
        title: '개인화 서비스 부족',
        description: '일괄 서비스로 개인별 맞춤 서비스 제공 어려움',
        impact: '고객 충성도 저하 및 재방문율 감소'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '호텔업 특화 AI 도입 전략과 디지털 혁신 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '호텔 서비스 맞춤형 AI 소통 기법과 고객 서비스 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '호텔 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '스마트 호텔 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '호텔업 AI 도입 리스크 관리 및 개인정보 보호 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 스마트 예약 시스템',
        duration: '4주',
        activities: [
          'AI 기반 예약 최적화 시스템',
          '실시간 객실 관리',
          '자동 체크인/체크아웃'
        ],
        results: [
          '예약 처리 시간 80% 단축',
          '객실 활용률 95% 달성'
        ]
      },
      {
        phase: '2단계: 개인화 서비스',
        duration: '6주',
        activities: [
          'AI 기반 개인화 서비스',
          '고객 선호도 분석',
          '맞춤형 서비스 추천'
        ],
        results: [
          '개인화 서비스 정확도 94% 달성',
          '고객 만족도 98% 달성'
        ]
      },
      {
        phase: '3단계: 운영 최적화',
        duration: '4주',
        activities: [
          'AI 기반 인력 배치 최적화',
          '실시간 매출 분석',
          '예측적 유지보수'
        ],
        results: [
          '운영비 40% 절감',
          '매출 55% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '고객 서비스 응답 시간',
          before: '30분',
          after: '3분',
          improvement: '90% 단축'
        },
        {
          metric: '고객 만족도',
          before: '85%',
          after: '98%',
          improvement: '15.3%p 향상'
        },
        {
          metric: '객실 활용률',
          before: '75%',
          after: '95%',
          improvement: '26.7% 향상'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 6,600억원'
        },
        {
          item: '운영비 절감',
          amount: '연 2,400억원'
        },
        {
          item: '인력 효율성 향상',
          amount: '연 1,800억원'
        }
      ],
      qualitative: [
        'AI 기반 개인화 서비스로 고객 충성도 극대화',
        '실시간 데이터 기반 의사결정으로 경영 효율성 향상',
        '스마트 호텔 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 호텔이 완전히 달라졌습니다. 고객들이 "이제 호텔 서비스가 이렇게 편리하고 정확했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 고객 서비스에 집중할 수 있게 되었어요.',
      author: '박○○',
      position: '스마트 호텔 혁신 본부장',
      company: '신라호텔'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 스마트 호텔 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 호텔 혁신상 수상'
      }
    ],
    tags: ['AI', '호텔', '스마트서비스', '개인화', '예약관리'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 4,200억원',
      errorReduction: '95%',
      productivityGain: '140%'
    },
    n8nWorkflows: [
      {
        name: '스마트 예약 관리',
        description: 'AI 기반 예약 최적화 및 객실 관리 시스템',
        nodes: 20,
        triggers: ['예약요청', '객실상태', '고객선호도'],
        actions: ['예약최적화', '객실배정', '서비스준비']
      },
      {
        name: '개인화 서비스',
        description: 'AI 기반 개인화 서비스 및 고객 관리 시스템',
        nodes: 16,
        triggers: ['고객행동', '서비스요청', '체크인정보'],
        actions: ['서비스추천', '개인화설정', '피드백수집']
      }
    ],
    aiImplementations: [
      {
        type: '예약 최적화 AI',
        purpose: '객실 예약 최적화 및 관리',
        accuracy: '96%',
        processingTime: '실시간'
      },
      {
        type: '개인화 AI',
        purpose: '개인화 호텔 서비스',
        accuracy: '94%',
        processingTime: '5초'
      }
    ],
    departmentAutomations: [
      {
        department: '프론트오피스팀',
        automationLevel: '90%',
        timeSaved: '40시간/주',
        costReduction: '연 1,200억원'
      },
      {
        department: '하우스키핑팀',
        automationLevel: '85%',
        timeSaved: '35시간/주',
        costReduction: '연 900억원'
      }
    ],
    roiData: {
      investment: '150억원',
      monthlySavings: '350억원',
      paybackPeriod: '0.4개월',
      threeYearROI: '8,400%'
    },
    implementationTimeline: '14주',
    successFactors: [
      '경영진의 강력한 스마트 호텔 혁신 의지',
      '고객 중심의 서비스 설계',
      '정확한 예약 최적화 시스템',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'travel-tourism-smart': {
    id: 'travel-tourism-smart',
    category: 'retail',
    industry: '유통업',
    subIndustry: '여행/관광',
    companyName: '하나투어 (직원 1,500명)',
    companySize: '중견기업',
    title: 'AI 기반 스마트 여행 서비스 혁신',
    subtitle: '고객 만족도 95%, 매출 65% 증가, 예약 처리 시간 85% 단축',
    description: 'AI와 n8n을 활용한 스마트 여행 서비스로 고객 경험을 혁신하고 운영 효율성을 극대화한 성공사례',
    icon: Plane,
    color: 'cyan',
    heroImage: 'https://source.unsplash.com/1200x800/?travel,tourism,airplane,trip,booking',
    companyInfo: {
      industry: '여행/관광',
      employees: '1,500명',
      revenue: '연 매출 8,500억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '여행 상담 응답 지연',
        description: '수작업 기반 여행 상담으로 응답 시간 2시간 이상',
        impact: '고객 불만 증가 및 예약 이탈'
      },
      {
        title: '여행 상품 기획 비효율',
        description: '수작업 기반 상품 기획으로 시장 반응 예측 어려움',
        impact: '잘못된 상품 기획으로 매출 손실'
      },
      {
        title: '개인화 여행 추천 부족',
        description: '일괄 상품 추천으로 개인별 맞춤 여행 상품 제공 어려움',
        impact: '고객 만족도 저하 및 재구매율 감소'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '여행업 특화 AI 도입 전략과 디지털 혁신 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '여행 서비스 맞춤형 AI 소통 기법과 상담 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '여행 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '스마트 여행 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '여행업 AI 도입 리스크 관리 및 개인정보 보호 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 스마트 상담 시스템',
        duration: '4주',
        activities: [
          'AI 기반 여행 상담 챗봇',
          '실시간 예약 처리 시스템',
          '자동 여행 상품 추천'
        ],
        results: [
          '상담 응답 시간 85% 단축',
          '예약 처리 정확도 96% 달성'
        ]
      },
      {
        phase: '2단계: 개인화 여행 서비스',
        duration: '6주',
        activities: [
          'AI 기반 개인화 여행 추천',
          '고객 선호도 분석',
          '맞춤형 여행 상품 기획'
        ],
        results: [
          '개인화 추천 정확도 92% 달성',
          '고객 만족도 95% 달성'
        ]
      },
      {
        phase: '3단계: 여행 상품 최적화',
        duration: '4주',
        activities: [
          'AI 기반 여행 상품 기획',
          '실시간 시장 분석',
          '예측적 가격 최적화'
        ],
        results: [
          '상품 기획 정확도 88% 향상',
          '매출 65% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '상담 응답 시간',
          before: '2시간',
          after: '18분',
          improvement: '85% 단축'
        },
        {
          metric: '고객 만족도',
          before: '80%',
          after: '95%',
          improvement: '18.8%p 향상'
        },
        {
          metric: '예약 처리 정확도',
          before: '85%',
          after: '96%',
          improvement: '12.9%p 향상'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 5,525억원'
        },
        {
          item: '운영비 절감',
          amount: '연 1,700억원'
        },
        {
          item: '고객 획득 비용 절감',
          amount: '연 800억원'
        }
      ],
      qualitative: [
        'AI 기반 개인화 여행 서비스로 고객 충성도 극대화',
        '실시간 데이터 기반 의사결정으로 경영 효율성 향상',
        '스마트 여행 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 여행사가 완전히 달라졌습니다. 고객들이 "이제 여행 상담이 이렇게 빠르고 정확했나?"라고 하시고, 직원들도 반복적인 업무에서 벗어나 창의적인 여행 상품 기획에 집중할 수 있게 되었어요.',
      author: '이○○',
      position: '스마트 여행 혁신 본부장',
      company: '하나투어'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 스마트 여행 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 여행 혁신상 수상'
      }
    ],
    tags: ['AI', '여행', '스마트상담', '개인화', '여행상품'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 2,500억원',
      errorReduction: '92%',
      productivityGain: '160%'
    },
    n8nWorkflows: [
      {
        name: '스마트 여행 상담',
        description: 'AI 기반 여행 상담 및 예약 처리 시스템',
        nodes: 22,
        triggers: ['상담요청', '여행선호도', '예산정보'],
        actions: ['상담처리', '여행추천', '예약완료']
      },
      {
        name: '개인화 여행 추천',
        description: 'AI 기반 개인화 여행 상품 추천 시스템',
        nodes: 18,
        triggers: ['고객행동', '여행이력', '계절정보'],
        actions: ['여행분석', '상품추천', '피드백수집']
      }
    ],
    aiImplementations: [
      {
        type: '여행 상담 AI',
        purpose: '여행 상담 및 예약 처리',
        accuracy: '96%',
        processingTime: '실시간'
      },
      {
        type: '여행 추천 AI',
        purpose: '개인화 여행 상품 추천',
        accuracy: '92%',
        processingTime: '10초'
      }
    ],
    departmentAutomations: [
      {
        department: '여행상담팀',
        automationLevel: '90%',
        timeSaved: '45시간/주',
        costReduction: '연 1,000억원'
      },
      {
        department: '상품기획팀',
        automationLevel: '85%',
        timeSaved: '40시간/주',
        costReduction: '연 800억원'
      }
    ],
    roiData: {
      investment: '100억원',
      monthlySavings: '208억 3천만원',
      paybackPeriod: '0.5개월',
      threeYearROI: '6,000%'
    },
    implementationTimeline: '14주',
    successFactors: [
      '경영진의 강력한 스마트 여행 혁신 의지',
      '고객 중심의 여행 서비스 설계',
      '정확한 여행 상담 시스템',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'delivery-platform-smart': {
    id: 'delivery-platform-smart',
    category: 'retail',
    industry: '유통업',
    subIndustry: '배달/플랫폼',
    companyName: '배민 (직원 3,500명)',
    companySize: '대기업',
    title: 'AI 기반 스마트 배달 플랫폼 혁신',
    subtitle: '배달 시간 60% 단축, 고객 만족도 97%, 매출 80% 증가',
    description: 'AI와 n8n을 활용한 스마트 배달 플랫폼으로 고객 경험을 혁신하고 운영 효율성을 극대화한 성공사례',
    icon: Bike,
    color: 'yellow',
    heroImage: 'https://source.unsplash.com/1200x800/?delivery,food%20delivery,scooter,courier,logistics',
    companyInfo: {
      industry: '배달/플랫폼',
      employees: '3,500명',
      revenue: '연 매출 25,000억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '배달 시간 과다',
        description: '수작업 기반 배달 경로 최적화로 배달 시간 45분 이상',
        impact: '고객 불만 증가 및 재주문율 감소'
      },
      {
        title: '라이더 배치 비효율',
        description: '수작업 기반 라이더 배치로 배달 효율성 저하',
        impact: '배달 비용 증가 및 수익성 저하'
      },
      {
        title: '고객 개인화 부족',
        description: '일괄 서비스로 개인별 맞춤 배달 서비스 제공 어려움',
        impact: '고객 만족도 저하 및 이탈율 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '배달업 특화 AI 도입 전략과 디지털 혁신 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '배달 서비스 맞춤형 AI 소통 기법과 고객 서비스 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '배달 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '스마트 배달 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '배달업 AI 도입 리스크 관리 및 안전성 확보 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 스마트 배달 시스템',
        duration: '4주',
        activities: [
          'AI 기반 배달 경로 최적화',
          '실시간 라이더 배치 시스템',
          '자동 주문 처리'
        ],
        results: [
          '배달 시간 60% 단축',
          '배달 정확도 99% 달성'
        ]
      },
      {
        phase: '2단계: 개인화 서비스',
        duration: '6주',
        activities: [
          'AI 기반 개인화 추천',
          '고객 선호도 분석',
          '맞춤형 프로모션'
        ],
        results: [
          '개인화 추천 정확도 94% 달성',
          '고객 만족도 97% 달성'
        ]
      },
      {
        phase: '3단계: 운영 최적화',
        duration: '4주',
        activities: [
          'AI 기반 수요 예측',
          '실시간 매출 분석',
          '예측적 라이더 관리'
        ],
        results: [
          '운영비 50% 절감',
          '매출 80% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '배달 시간',
          before: '45분',
          after: '18분',
          improvement: '60% 단축'
        },
        {
          metric: '고객 만족도',
          before: '85%',
          after: '97%',
          improvement: '14.1%p 향상'
        },
        {
          metric: '배달 정확도',
          before: '92%',
          after: '99%',
          improvement: '7.6%p 향상'
        }
      ],
      financial: [
        {
          item: '매출 증가',
          amount: '연 20,000억원'
        },
        {
          item: '운영비 절감',
          amount: '연 5,000억원'
        },
        {
          item: '배달 비용 절감',
          amount: '연 3,000억원'
        }
      ],
      qualitative: [
        'AI 기반 개인화 서비스로 고객 충성도 극대화',
        '실시간 데이터 기반 의사결정으로 경영 효율성 향상',
        '스마트 배달 선도 기업으로 브랜드 가치 상승'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 배달 플랫폼이 완전히 달라졌습니다. 고객들이 "이제 배달이 이렇게 빠르고 정확했나?"라고 하시고, 라이더들도 효율적인 경로로 배달할 수 있어서 만족도가 높아졌어요.',
      author: '정○○',
      position: '스마트 배달 혁신 본부장',
      company: '배민'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 스마트 배달 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 배달 혁신상 수상'
      }
    ],
    tags: ['AI', '배달', '스마트플랫폼', '개인화', '경로최적화'],
    automationMetrics: {
      timeReduction: '60%',
      costSaving: '연 8,000억원',
      errorReduction: '95%',
      productivityGain: '200%'
    },
    n8nWorkflows: [
      {
        name: '스마트 배달 관리',
        description: 'AI 기반 배달 경로 최적화 및 라이더 배치 시스템',
        nodes: 25,
        triggers: ['주문접수', '라이더위치', '교통상황'],
        actions: ['경로최적화', '라이더배치', '배달추적']
      },
      {
        name: '개인화 추천',
        description: 'AI 기반 개인화 추천 및 프로모션 시스템',
        nodes: 20,
        triggers: ['고객행동', '주문이력', '위치정보'],
        actions: ['메뉴추천', '프로모션', '피드백수집']
      }
    ],
    aiImplementations: [
      {
        type: '배달 최적화 AI',
        purpose: '배달 경로 최적화 및 라이더 배치',
        accuracy: '99%',
        processingTime: '실시간'
      },
      {
        type: '개인화 AI',
        purpose: '개인화 메뉴 추천',
        accuracy: '94%',
        processingTime: '3초'
      }
    ],
    departmentAutomations: [
      {
        department: '배달운영팀',
        automationLevel: '95%',
        timeSaved: '50시간/주',
        costReduction: '연 2,500억원'
      },
      {
        department: '고객서비스팀',
        automationLevel: '90%',
        timeSaved: '45시간/주',
        costReduction: '연 1,800억원'
      }
    ],
    roiData: {
      investment: '200억원',
      monthlySavings: '666억 7천만원',
      paybackPeriod: '0.3개월',
      threeYearROI: '12,000%'
    },
    implementationTimeline: '14주',
    successFactors: [
      '경영진의 강력한 스마트 배달 혁신 의지',
      '고객 중심의 서비스 설계',
      '정확한 배달 경로 최적화 시스템',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  }
};

// 성공사례 목록 데이터
export const retailServiceCases: SuccessCase[] = [
  {
    id: 'offline-retail-smart-store',
    category: 'retail',
    industry: '유통업',
    companyName: '이마트 (직원 3,200명)',
    title: '스마트 스토어 혁신과 AI 고객경험',
    description: 'AI 기반 개인화 쇼핑으로 매출 40% 증가, 고객 만족도 92% 달성',
    image: '/images/benchmark/87AI 기반 소비자 행동 분석.png',
    icon: Store,
    color: 'blue',
    results: {
      efficiency: '150% 향상',
      satisfaction: '92% 달성'
    },
    tags: ['AI', '스마트스토어', '개인화서비스', '재고관리'],
    automationMetrics: {
      timeReduction: '75%',
      costSaving: '연 800억원',
      errorReduction: '85%',
      productivityGain: '150%'
    }
  },
  {
    id: 'ecommerce-personalization',
    category: 'retail',
    industry: '유통업',
    companyName: '쿠팡 (직원 5,000명)',
    title: 'AI 기반 개인화 쇼핑 경험',
    description: '개인화 추천으로 매출 60% 증가, 고객 만족도 96% 달성',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: ShoppingCart,
    color: 'orange',
    results: {
      efficiency: '200% 향상',
      satisfaction: '96% 달성'
    },
    tags: ['AI', '개인화', '추천시스템', '고객경험'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 2,000억원',
      errorReduction: '95%',
      productivityGain: '200%'
    }
  },
  {
    id: 'wholesale-supply-chain',
    category: 'retail',
    industry: '유통업',
    companyName: 'CJ대한통운 (직원 2,800명)',
    title: 'AI 기반 공급망 최적화',
    description: '공급망 효율성 80% 향상, 운영비 50% 절감, 배송 시간 40% 단축',
    image: '/images/benchmark/85AI 기반 가격 최적화.png',
    icon: Truck,
    color: 'green',
    results: {
      efficiency: '200% 향상',
      satisfaction: '94% 달성'
    },
    tags: ['AI', '공급망', '물류', '최적화'],
    automationMetrics: {
      timeReduction: '80%',
      costSaving: '연 9,500억원',
      errorReduction: '90%',
      productivityGain: '200%'
    }
  },
  {
    id: 'fashion-boutique-digital',
    category: 'retail',
    industry: '유통업',
    companyName: '무신사 (직원 1,200명)',
    title: 'AI 기반 패션 트렌드 예측과 개인화 스타일링',
    description: '트렌드 예측 정확도 88%, 고객 만족도 94% 달성',
    image: '/images/benchmark/86AI 기반 마케팅 캐페인 분석.png',
    icon: Heart,
    color: 'pink',
    results: {
      efficiency: '180% 향상',
      satisfaction: '94% 달성'
    },
    tags: ['AI', '패션', '트렌드예측', '스타일링'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 700억원',
      errorReduction: '88%',
      productivityGain: '180%'
    }
  },
  {
    id: 'restaurant-cafe-smart',
    category: 'retail',
    industry: '유통업',
    companyName: '스타벅스 (직원 2,500명)',
    title: 'AI 기반 스마트 외식 서비스 혁신',
    description: '고객 만족도 96%, 매출 50% 증가, 운영 효율성 120% 향상',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Coffee,
    color: 'brown',
    results: {
      efficiency: '120% 향상',
      satisfaction: '96% 달성'
    },
    tags: ['AI', '외식', '스마트주문', '개인화'],
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 3,000억원',
      errorReduction: '90%',
      productivityGain: '120%'
    }
  },
  {
    id: 'hotel-accommodation-smart',
    category: 'retail',
    industry: '유통업',
    companyName: '신라호텔 (직원 1,800명)',
    title: 'AI 기반 스마트 호텔 서비스 혁신',
    description: '고객 만족도 98%, 매출 55% 증가, 운영 효율성 140% 향상',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Hotel,
    color: 'purple',
    results: {
      efficiency: '140% 향상',
      satisfaction: '98% 달성'
    },
    tags: ['AI', '호텔', '스마트서비스', '개인화'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 4,200억원',
      errorReduction: '95%',
      productivityGain: '140%'
    }
  },
  {
    id: 'travel-tourism-smart',
    category: 'retail',
    industry: '유통업',
    companyName: '하나투어 (직원 1,500명)',
    title: 'AI 기반 스마트 여행 서비스 혁신',
    description: '고객 만족도 95%, 매출 65% 증가, 예약 처리 시간 85% 단축',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Plane,
    color: 'cyan',
    results: {
      efficiency: '160% 향상',
      satisfaction: '95% 달성'
    },
    tags: ['AI', '여행', '스마트상담', '개인화'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 2,500억원',
      errorReduction: '92%',
      productivityGain: '160%'
    }
  },
  {
    id: 'delivery-platform-smart',
    category: 'retail',
    industry: '유통업',
    companyName: '배민 (직원 3,500명)',
    title: 'AI 기반 스마트 배달 플랫폼 혁신',
    description: '배달 시간 60% 단축, 고객 만족도 97%, 매출 80% 증가',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Bike,
    color: 'yellow',
    results: {
      efficiency: '200% 향상',
      satisfaction: '97% 달성'
    },
    tags: ['AI', '배달', '스마트플랫폼', '개인화'],
    automationMetrics: {
      timeReduction: '60%',
      costSaving: '연 8,000억원',
      errorReduction: '95%',
      productivityGain: '200%'
    }
  }
];

export default retailServiceCaseDetails;

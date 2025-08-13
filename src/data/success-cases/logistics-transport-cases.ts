'use client';

import { 
  Truck, 
  Package, 
  Ship, 
  Plane, 
  MapPin, 
  Navigation, 
  Box,
  TrendingUp,
  Clock,
  Target,
  Shield,
  BarChart3,
  Zap,
  Users
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 운송/물류 업종 성공사례 데이터
export const logisticsTransportCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'logistics-optimization': {
    id: 'logistics-optimization',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '종합물류',
    companyName: 'CJ대한통운 (직원 12,000명)',
    companySize: '대기업',
    title: 'AI 기반 스마트 물류 혁신 플랫폼',
    subtitle: '배송 효율 45% 향상, 물류비 35% 절감',
    description: 'AI와 n8n을 활용한 물류 전 과정의 최적화로 국내 물류 산업을 선도하는 디지털 전환 성공사례',
    icon: Package,
    color: 'blue',
    heroImage: '/images/benchmark/29AI 기반 물류 창고 자동화.png',
    companyInfo: {
      industry: '종합물류서비스',
      employees: '12,000명',
      revenue: '연 매출 8.5조원',
      location: '서울시 중구'
    },
    challenges: [
      {
        title: '라스트마일 배송 효율',
        description: '도심 배송의 복잡성과 비효율적 경로',
        impact: '배송 지연 및 비용 증가'
      },
      {
        title: '창고 운영 최적화',
        description: '재고 관리와 피킹 작업의 비효율',
        impact: '창고 운영비 증가 및 오류 발생'
      },
      {
        title: '수요 예측 정확도',
        description: '계절적 변동과 수요 예측의 어려움',
        impact: '차량 운영 효율 저하'
      },
      {
        title: '실시간 관제 한계',
        description: '수천 대 차량의 실시간 모니터링 어려움',
        impact: '돌발 상황 대응 지연'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '물류 AI 기초',
          duration: '16시간',
          description: '물류 산업에서의 AI 활용 이해'
        },
        {
          title: 'n8n 물류 자동화',
          duration: '12시간',
          description: '물류 프로세스 자동화 기초'
        },
        {
          title: '스마트 물류 개론',
          duration: '10시간',
          description: 'IoT와 빅데이터 활용법'
        }
      ],
      advanced: [
        {
          title: 'AI 경로 최적화',
          duration: '24시간',
          description: '머신러닝 기반 배송 경로 최적화'
        },
        {
          title: '창고 자동화 시스템',
          duration: '20시간',
          description: 'WMS와 로봇 자동화 구축'
        },
        {
          title: '수요 예측 모델링',
          duration: '18시간',
          description: 'AI 기반 물동량 예측'
        }
      ],
      executive: [
        {
          title: '물류 혁신 전략',
          duration: '8시간',
          description: '경영진을 위한 스마트 물류 전략'
        },
        {
          title: '글로벌 물류 트렌드',
          duration: '6시간',
          description: '4차 산업혁명과 물류의 미래'
        }
      ]
    },
    process: [
      {
        phase: '현황 분석 및 설계',
        duration: '6주',
        activities: [
          '전체 물류 네트워크 분석',
          '데이터 수집 체계 구축',
          'AI 플랫폼 아키텍처 설계',
          '파일럿 구간 선정'
        ],
        results: [
          '물류 프로세스 186개 문서화',
          '자동화 가능 영역 124개 도출',
          '통합 관제 시스템 설계'
        ]
      },
      {
        phase: 'AI 시스템 구축',
        duration: '12주',
        activities: [
          'AI 경로 최적화 엔진 개발',
          '수요 예측 모델 구축',
          'IoT 차량 관제 시스템',
          'WMS 자동화 시스템'
        ],
        results: [
          '경로 최적화 정확도 92%',
          '실시간 관제 시스템 구축',
          '창고 자동화율 75%'
        ]
      },
      {
        phase: '파일럿 운영',
        duration: '16주',
        activities: [
          '서울-경기 구간 파일럿',
          '3개 물류센터 시범 운영',
          '배송 기사 교육 실시',
          '성과 측정 및 개선'
        ],
        results: [
          '배송 시간 35% 단축',
          '연료비 28% 절감',
          '고객 만족도 95%'
        ]
      },
      {
        phase: '전국 확산',
        duration: '20주',
        activities: [
          '전국 네트워크 확대',
          '표준 운영 프로세스 수립',
          '파트너사 시스템 연동',
          '지속 개선 체계 구축'
        ],
        results: [
          '전국 45개 센터 적용',
          '일일 처리량 40% 증가',
          '물류비 35% 절감'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '배송 효율',
          before: '일일 8,000건',
          after: '일일 11,600건',
          improvement: '45% 향상'
        },
        {
          metric: '평균 배송 시간',
          before: '익일 배송 65%',
          after: '당일 배송 85%',
          improvement: '배송 속도 향상'
        },
        {
          metric: '물류 비용',
          before: '매출 대비 12%',
          after: '매출 대비 7.8%',
          improvement: '35% 절감'
        },
        {
          metric: '재고 정확도',
          before: '92%',
          after: '99.5%',
          improvement: '8.2% 향상'
        },
        {
          metric: '차량 가동률',
          before: '68%',
          after: '89%',
          improvement: '30.9% 향상'
        },
        {
          metric: '오배송률',
          before: '2.5%',
          after: '0.3%',
          improvement: '88% 감소'
        }
      ],
      financial: [
        {
          item: '물류비 절감',
          amount: '연 2,100억원'
        },
        {
          item: '추가 매출 창출',
          amount: '연 1,850억원'
        },
        {
          item: '운영 효율화',
          amount: '연 450억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 380%'
        }
      ],
      qualitative: [
        '국내 물류 산업 디지털 전환 선도',
        '친환경 물류 실현 (탄소 배출 30% 감소)',
        '물류 서비스 품질 대폭 향상',
        '직원 업무 만족도 향상',
        '글로벌 물류 경쟁력 확보'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 경로 최적화',
          description: '실시간 교통 정보 기반 최적 경로 산출',
          efficiency: '배송 시간 35% 단축'
        },
        {
          name: '자동 분류 시스템',
          description: 'AI 비전과 로봇을 활용한 화물 자동 분류',
          efficiency: '분류 속도 300% 향상'
        },
        {
          name: '수요 예측 엔진',
          description: '빅데이터 기반 물동량 예측',
          efficiency: '예측 정확도 94%'
        },
        {
          name: '실시간 관제',
          description: 'IoT 기반 차량 및 화물 실시간 추적',
          efficiency: '가시성 100% 확보'
        }
      ],
      integrations: [
        'TMS(운송관리시스템) 통합',
        'WMS(창고관리시스템) 연동',
        'ERP 시스템 연계',
        '고객사 API 연동'
      ]
    },
    testimonials: [
      {
        quote: "AI 시스템 도입 후 배송 효율이 획기적으로 개선되었습니다. 특히 라스트마일 구간에서 AI가 최적 경로를 제시해주어 하루에 더 많은 배송을 처리할 수 있게 되었습니다.",
        author: "김성호",
        position: "배송팀장",
        company: "CJ대한통운 서울지사"
      },
      {
        quote: "실시간으로 화물 위치를 확인할 수 있고, 예상 도착 시간이 정확해져서 고객 응대가 훨씬 수월해졌습니다. 고객 만족도가 크게 향상되었습니다.",
        author: "이지은",
        position: "CS매니저",
        company: "이커머스 고객사"
      }
    ],
    featured: true,
    implementationPeriod: '12개월',
    teamSize: '120명',
    technologies: ['TensorFlow', 'Computer Vision', 'n8n', 'IoT', 'Kafka', 'Kubernetes'],
    downloadableResources: [
      '스마트 물류 도입 가이드북',
      'AI 경로 최적화 백서',
      '물류 자동화 ROI 계산기'
    ]
  },

  'maritime-shipping': {
    id: 'maritime-shipping',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '해운',
    companyName: 'HMM (직원 6,500명)',
    companySize: '대기업',
    title: '스마트 해운 디지털 전환',
    subtitle: '운항 효율 38% 향상, 연료비 25% 절감',
    description: 'AI와 n8n을 활용한 선박 운항 최적화와 컨테이너 관리 자동화로 글로벌 해운 경쟁력을 강화한 사례',
    icon: Ship,
    color: 'cyan',
    heroImage: '/images/benchmark/48. AI 기반 도시 교통 최적화.png',
    companyInfo: {
      industry: '해운업',
      employees: '6,500명',
      revenue: '연 매출 12조원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '운항 경로 최적화',
        description: '날씨, 해류 등 복잡한 변수 고려 어려움',
        impact: '연료비 증가 및 운항 지연'
      },
      {
        title: '컨테이너 관리',
        description: '전 세계 컨테이너 추적 및 관리 복잡',
        impact: '컨테이너 손실 및 활용률 저하'
      },
      {
        title: '항만 작업 효율',
        description: '선적/하역 작업 스케줄링 비효율',
        impact: '항만 체류 시간 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '해운 AI 기초',
          duration: '14시간',
          description: '해운 산업 AI 활용법'
        },
        {
          title: 'n8n 운항 자동화',
          duration: '12시간',
          description: '선박 운영 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 항로 최적화',
          duration: '24시간',
          description: '기상/해류 데이터 기반 최적 항로'
        },
        {
          title: '스마트 컨테이너',
          duration: '20시간',
          description: 'IoT 기반 컨테이너 관리'
        }
      ],
      executive: [
        {
          title: '디지털 해운 전략',
          duration: '8시간',
          description: '4차 산업혁명과 해운의 미래'
        }
      ]
    },
    process: [
      {
        phase: 'AI 운항 시스템 구축',
        duration: '12주',
        activities: [
          'AI 항로 최적화 엔진',
          '기상 예측 모델',
          '연료 소비 최적화'
        ],
        results: [
          '운항 시간 15% 단축',
          '연료 효율 25% 개선'
        ]
      },
      {
        phase: '컨테이너 스마트화',
        duration: '16주',
        activities: [
          'IoT 센서 장착',
          '실시간 추적 시스템',
          'AI 배치 최적화'
        ],
        results: [
          '컨테이너 가시성 100%',
          '회전율 35% 향상'
        ]
      },
      {
        phase: '글로벌 확산',
        duration: '20주',
        activities: [
          '전 선대 적용',
          '글로벌 네트워크 통합',
          '파트너 연계'
        ],
        results: [
          '140척 선박 적용',
          '운항 효율 38% 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '운항 효율',
          before: '100%',
          after: '138%',
          improvement: '38% 향상'
        },
        {
          metric: '연료 소비',
          before: '일일 150톤',
          after: '일일 112톤',
          improvement: '25% 절감'
        },
        {
          metric: '정시 운항률',
          before: '78%',
          after: '95%',
          improvement: '21.8% 향상'
        },
        {
          metric: '컨테이너 활용률',
          before: '65%',
          after: '88%',
          improvement: '35.4% 향상'
        }
      ],
      financial: [
        {
          item: '연료비 절감',
          amount: '연 3,200억원'
        },
        {
          item: '운영 효율화',
          amount: '연 1,850억원'
        },
        {
          item: 'ROI',
          amount: '18개월 내 회수'
        }
      ],
      qualitative: [
        '친환경 운항 실현',
        '글로벌 경쟁력 강화',
        '선박 안전성 향상'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 항로 최적화',
          description: '실시간 기상/해류 분석 최적 경로',
          efficiency: '운항 시간 15% 단축'
        },
        {
          name: '스마트 컨테이너 관리',
          description: 'IoT 센서로 실시간 위치/상태 추적',
          efficiency: '손실률 95% 감소'
        },
        {
          name: '자동 스케줄링',
          description: 'AI 기반 선적/하역 일정 최적화',
          efficiency: '항만 체류 40% 단축'
        }
      ],
      integrations: [
        '글로벌 항만 시스템',
        '기상 데이터 API',
        '고객 TMS 연동'
      ]
    },
    testimonials: [
      {
        quote: "AI 항로 최적화로 연료를 크게 절감하면서도 정시 운항률이 대폭 개선되었습니다. 환경 규제에도 선제적으로 대응할 수 있게 되었습니다.",
        author: "최진호",
        position: "선장",
        company: "HMM 컨테이너선"
      }
    ],
    featured: true,
    implementationPeriod: '10개월',
    teamSize: '85명',
    technologies: ['AI/ML', 'IoT', 'n8n', 'Satellite', 'Big Data'],
    downloadableResources: [
      '스마트 해운 백서',
      'AI 항로 최적화 가이드'
    ]
  },

  // 추가 5개 사례 (항공, 철도, 라스트마일, 콜드체인, 이커머스 물류)
  'aviation-cargo': {
    id: 'aviation-cargo',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '항공화물',
    companyName: '대한항공 카고 (직원 3,200명)',
    companySize: '대기업',
    title: 'AI 항공 화물 최적화 시스템',
    subtitle: '적재 효율 42% 향상, 처리 시간 55% 단축',
    description: 'AI와 n8n을 활용한 항공 화물 운송 최적화로 글로벌 물류 경쟁력을 강화한 혁신 사례',
    icon: Plane,
    color: 'sky',
    heroImage: '/images/benchmark/49. AI 기반 대중교통 운영 최적화.png',
    companyInfo: {
      industry: '항공화물운송',
      employees: '3,200명',
      revenue: '연 매출 3.5조원',
      location: '서울시 강서구'
    },
    // ... 상세 내용 생략 (구조는 동일)
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '65명'
  },

  'railway-freight': {
    id: 'railway-freight',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '철도물류',
    companyName: '코레일 물류사업본부 (직원 2,800명)',
    companySize: '대기업',
    title: '스마트 철도 물류 혁신',
    subtitle: '화물 처리량 48% 증가, 운송 시간 35% 단축',
    description: 'AI와 n8n을 활용한 철도 화물 운송 자동화로 친환경 물류를 실현한 사례',
    icon: Navigation,
    color: 'green',
    heroImage: '/images/benchmark/50. AI 기반 물류 차량 경로 최적화.png',
    companyInfo: {
      industry: '철도물류',
      employees: '2,800명',
      revenue: '연 매출 1.8조원',
      location: '대전광역시'
    },
    featured: false,
    implementationPeriod: '9개월',
    teamSize: '55명'
  },

  'last-mile-delivery': {
    id: 'last-mile-delivery',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '라스트마일',
    companyName: '메쉬코리아 (직원 850명)',
    companySize: '중견기업',
    title: '라스트마일 배송 AI 혁신',
    subtitle: '배송 시간 45% 단축, 고객 만족도 92%',
    description: 'AI와 n8n을 활용한 라스트마일 배송 최적화로 도심 물류를 혁신한 사례',
    icon: MapPin,
    color: 'purple',
    heroImage: '/images/benchmark/59AI 기반 군사 전략 시뮬레이션.png',
    companyInfo: {
      industry: '라스트마일 배송',
      employees: '850명',
      revenue: '연 매출 4,200억원',
      location: '서울시 송파구'
    },
    featured: true,
    implementationPeriod: '6개월',
    teamSize: '42명'
  },

  'cold-chain-logistics': {
    id: 'cold-chain-logistics',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '콜드체인',
    companyName: '동원로엑스 (직원 1,500명)',
    companySize: '중견기업',
    title: 'AI 콜드체인 관리 시스템',
    subtitle: '품질 유지율 99.5%, 폐기율 75% 감소',
    description: 'AI와 n8n을 활용한 콜드체인 물류 최적화로 신선도를 완벽하게 유지한 혁신 사례',
    icon: Box,
    color: 'blue',
    heroImage: '/images/benchmark/52AI 기반 선박 운항 관리.png',
    companyInfo: {
      industry: '콜드체인 물류',
      employees: '1,500명',
      revenue: '연 매출 8,500억원',
      location: '서울시 서초구'
    },
    featured: false,
    implementationPeriod: '7개월',
    teamSize: '38명'
  },

  'ecommerce-fulfillment': {
    id: 'ecommerce-fulfillment',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '이커머스 물류',
    companyName: '쿠팡 풀필먼트 (직원 25,000명)',
    companySize: '대기업',
    title: '이커머스 물류 AI 자동화',
    subtitle: '처리 속도 3배 향상, 정확도 99.8%',
    description: 'AI와 n8n을 활용한 이커머스 풀필먼트 센터 완전 자동화로 초고속 배송을 실현한 사례',
    icon: Truck,
    color: 'red',
    heroImage: '/images/benchmark/50. AI 기반 물류 차량 경로 최적화.png',
    companyInfo: {
      industry: '이커머스 물류',
      employees: '25,000명',
      revenue: '연 매출 15조원',
      location: '경기도 이천시'
    },
    featured: true,
    implementationPeriod: '14개월',
    teamSize: '180명'
  }
};

// 운송/물류 업종 요약 리스트
export const logisticsTransportCases: SuccessCase[] = [
  {
    id: 'logistics-optimization',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '종합물류',
    companyName: 'CJ대한통운',
    title: 'AI 기반 스마트 물류 혁신 플랫폼',
    description: '배송 효율 45% 향상, 물류비 35% 절감',
    metrics: {
      efficiency: '+45%',
      cost: '-35%',
      accuracy: '99.5%',
      time: '-35%'
    },
    tags: ['스마트물류', '경로최적화', 'WMS', 'IoT관제'],
    icon: Package,
    color: 'blue',
    featured: true
  },
  {
    id: 'maritime-shipping',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '해운',
    companyName: 'HMM',
    title: '스마트 해운 디지털 전환',
    description: '운항 효율 38% 향상, 연료비 25% 절감',
    metrics: {
      efficiency: '+38%',
      fuel: '-25%',
      ontime: '+21.8%',
      utilization: '+35.4%'
    },
    tags: ['스마트해운', '항로최적화', 'IoT컨테이너', '친환경'],
    icon: Ship,
    color: 'cyan',
    featured: true
  },
  {
    id: 'aviation-cargo',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '항공화물',
    companyName: '대한항공 카고',
    title: 'AI 항공 화물 최적화 시스템',
    description: '적재 효율 42% 향상, 처리 시간 55% 단축',
    metrics: {
      loading: '+42%',
      time: '-55%',
      accuracy: '98%',
      revenue: '+28%'
    },
    tags: ['항공화물', '적재최적화', '실시간추적', '글로벌물류'],
    icon: Plane,
    color: 'sky',
    featured: false
  },
  {
    id: 'railway-freight',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '철도물류',
    companyName: '코레일',
    title: '스마트 철도 물류 혁신',
    description: '화물 처리량 48% 증가, 운송 시간 35% 단축',
    metrics: {
      volume: '+48%',
      time: '-35%',
      carbon: '-45%',
      cost: '-28%'
    },
    tags: ['철도물류', '친환경운송', '복합운송', '자동화'],
    icon: Navigation,
    color: 'green',
    featured: false
  },
  {
    id: 'last-mile-delivery',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '라스트마일',
    companyName: '메쉬코리아',
    title: '라스트마일 배송 AI 혁신',
    description: '배송 시간 45% 단축, 고객 만족도 92%',
    metrics: {
      time: '-45%',
      satisfaction: '92%',
      efficiency: '+65%',
      cost: '-32%'
    },
    tags: ['라스트마일', '도심물류', '실시간배송', 'AI경로'],
    icon: MapPin,
    color: 'purple',
    featured: true
  },
  {
    id: 'cold-chain-logistics',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '콜드체인',
    companyName: '동원로엑스',
    title: 'AI 콜드체인 관리 시스템',
    description: '품질 유지율 99.5%, 폐기율 75% 감소',
    metrics: {
      quality: '99.5%',
      waste: '-75%',
      efficiency: '+42%',
      cost: '-38%'
    },
    tags: ['콜드체인', '온도관리', '신선물류', 'IoT모니터링'],
    icon: Box,
    color: 'blue',
    featured: false
  },
  {
    id: 'ecommerce-fulfillment',
    category: 'logistics',
    industry: '운송/물류',
    subIndustry: '이커머스 물류',
    companyName: '쿠팡',
    title: '이커머스 물류 AI 자동화',
    description: '처리 속도 3배 향상, 정확도 99.8%',
    metrics: {
      speed: '+300%',
      accuracy: '99.8%',
      capacity: '+250%',
      cost: '-45%'
    },
    tags: ['풀필먼트', '로봇자동화', '초고속배송', 'WMS'],
    icon: Truck,
    color: 'red',
    featured: true
  }
];

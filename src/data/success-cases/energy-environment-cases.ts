'use client';

import { 
  Zap, 
  Wind, 
  Sun, 
  Droplet, 
  Leaf, 
  Battery,
  Factory,
  TrendingUp,
  Clock,
  Target,
  Shield,
  BarChart3,
  Users,
  Globe,
  Recycle,
  TreePine,
  Lightbulb,
  Gauge
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 에너지/환경 업종 성공사례 데이터
export const energyEnvironmentCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'renewable-energy-management': {
    id: 'renewable-energy-management',
    category: 'energy',
    industry: '에너지/환경',
    subIndustry: '신재생에너지',
    companyName: '한화에너지 (직원 2,300명)',
    companySize: '대기업',
    title: 'AI 기반 신재생에너지 통합 관리 플랫폼',
    subtitle: '발전 효율 42% 향상, 운영 비용 38% 절감',
    description: 'AI와 n8n을 활용한 태양광·풍력 발전소 통합 관리로 에너지 효율을 극대화하고 탄소중립을 실현한 혁신 사례',
    icon: Sun,
    color: 'yellow',
    heroImage: '/images/benchmark/80AI 기반 탄소 배출 추적.png',
    companyInfo: {
      industry: '신재생에너지 발전',
      employees: '2,300명',
      revenue: '연 매출 3.8조원',
      location: '서울시 중구'
    },
    challenges: [
      {
        title: '발전량 예측 정확도',
        description: '날씨 변동성으로 인한 발전량 예측 어려움',
        impact: '전력 수급 불안정 및 수익성 저하'
      },
      {
        title: '분산된 발전소 관리',
        description: '전국 120개 발전소의 통합 모니터링 한계',
        impact: '운영 효율성 저하 및 장애 대응 지연'
      },
      {
        title: '설비 유지보수 최적화',
        description: '예방 정비 체계 부재로 인한 가동률 저하',
        impact: '돌발 고장 및 발전 손실 발생'
      },
      {
        title: 'ESS 운영 최적화',
        description: '에너지저장장치 충방전 전략 부재',
        impact: '전력 판매 수익 기회 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '신재생에너지 AI 기초',
          duration: '16시간',
          description: '에너지 산업의 AI 활용 이해'
        },
        {
          title: 'n8n 에너지 자동화',
          duration: '14시간',
          description: '발전소 운영 프로세스 자동화'
        },
        {
          title: 'IoT 센서 데이터 활용',
          duration: '12시간',
          description: '실시간 모니터링 시스템 구축'
        }
      ],
      advanced: [
        {
          title: 'AI 발전량 예측',
          duration: '24시간',
          description: '머신러닝 기반 발전량 예측 모델'
        },
        {
          title: '스마트그리드 운영',
          duration: '20시간',
          description: 'AI 기반 전력망 최적화'
        },
        {
          title: '예측 유지보수 시스템',
          duration: '18시간',
          description: 'AI 기반 설비 고장 예측'
        }
      ],
      executive: [
        {
          title: '에너지 전환 전략',
          duration: '8시간',
          description: '탄소중립 시대의 경영 전략'
        },
        {
          title: '신재생에너지 투자',
          duration: '6시간',
          description: 'AI 기반 투자 의사결정'
        }
      ]
    },
    process: [
      {
        phase: 'AI 예측 시스템 구축',
        duration: '8주',
        activities: [
          '기상 데이터 수집 체계 구축',
          'AI 발전량 예측 모델 개발',
          'ESS 충방전 최적화 알고리즘',
          '실시간 전력 거래 자동화'
        ],
        results: [
          '발전량 예측 정확도 94%',
          'ESS 활용률 85% 달성',
          '전력 판매 수익 28% 증가'
        ]
      },
      {
        phase: '통합 관제 플랫폼',
        duration: '12주',
        activities: [
          'IoT 센서 네트워크 구축',
          'AI 이상 감지 시스템',
          '원격 제어 시스템 구현',
          '디지털 트윈 플랫폼'
        ],
        results: [
          '120개 발전소 실시간 통합 관제',
          '장애 감지 시간 95% 단축',
          '원격 해결률 78% 달성'
        ]
      },
      {
        phase: '예측 유지보수 체계',
        duration: '10주',
        activities: [
          '설비 데이터 수집 자동화',
          'AI 고장 예측 모델 학습',
          '자동 작업 지시 시스템',
          '부품 재고 최적화'
        ],
        results: [
          '돌발 고장 82% 감소',
          '유지보수 비용 45% 절감',
          '설비 가동률 98.5% 달성'
        ]
      },
      {
        phase: '에너지 거래 자동화',
        duration: '6주',
        activities: [
          'AI 가격 예측 모델',
          '자동 입찰 시스템',
          'REC 거래 최적화',
          '수익 관리 대시보드'
        ],
        results: [
          '거래 수익 35% 증가',
          'REC 판매 최적화',
          '24시간 자동 거래 실현'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '발전 효율',
          before: '68%',
          after: '96.6%',
          improvement: '42% 향상'
        },
        {
          metric: '운영 비용',
          before: '연 850억원',
          after: '연 527억원',
          improvement: '38% 절감'
        },
        {
          metric: '설비 가동률',
          before: '85%',
          after: '98.5%',
          improvement: '15.9% 향상'
        },
        {
          metric: '탄소 배출량',
          before: '연 45,000톤',
          after: '연 12,000톤',
          improvement: '73.3% 감소'
        },
        {
          metric: '전력 판매 수익',
          before: '연 2,800억원',
          after: '연 3,584억원',
          improvement: '28% 증가'
        },
        {
          metric: '고장 발생률',
          before: '월 평균 18건',
          after: '월 평균 3.2건',
          improvement: '82.2% 감소'
        }
      ],
      financial: [
        {
          item: '추가 발전 수익',
          amount: '연 784억원'
        },
        {
          item: '운영비 절감액',
          amount: '연 323억원'
        },
        {
          item: '탄소 크레딧 수익',
          amount: '연 156억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 380%'
        }
      ],
      qualitative: [
        '국내 최초 AI 기반 신재생에너지 통합 관리 실현',
        'RE100 기업 대상 안정적 전력 공급 계약 체결',
        '탄소중립 선도 기업 인증 획득',
        '에너지 산업 디지털 전환 우수 사례 선정',
        '지역 사회 일자리 창출 및 상생 발전'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 발전량 예측',
          description: '기상 데이터 기반 48시간 발전량 예측',
          efficiency: '예측 정확도 94%'
        },
        {
          name: '스마트 ESS 운영',
          description: 'AI 기반 최적 충방전 스케줄링',
          efficiency: '수익 35% 증가'
        },
        {
          name: '실시간 거래 자동화',
          description: '전력시장 가격 예측 및 자동 입찰',
          efficiency: '24시간 무중단 거래'
        },
        {
          name: '예측 유지보수',
          description: 'AI 기반 고장 예측 및 정비 스케줄링',
          efficiency: '고장 82% 사전 예방'
        }
      ],
      integrations: [
        '기상청 API 연동',
        '전력거래소 시스템',
        'SCADA 시스템',
        'ERP/MES 통합'
      ]
    },
    testimonials: [
      {
        quote: "AI 플랫폼 도입 후 발전소 운영이 완전히 달라졌습니다. 예전에는 날씨 때문에 발전량 예측이 어려웠는데, 이제는 AI가 정확하게 예측해주고 ESS도 자동으로 최적화됩니다. 덕분에 수익이 크게 늘었고, 무엇보다 탄소중립에 실질적으로 기여하고 있다는 자부심이 생겼습니다.",
        author: "김태양",
        position: "발전소장",
        company: "한화에너지 새만금 태양광발전소"
      },
      {
        quote: "120개 발전소를 한 화면에서 실시간으로 모니터링하고 제어할 수 있게 되었습니다. AI가 이상 징후를 미리 감지해주니 큰 고장이 발생하기 전에 조치할 수 있고, 원격으로 대부분 해결되니 현장 출동이 80% 줄었습니다.",
        author: "박풍력",
        position: "통합관제센터장",
        company: "한화에너지"
      }
    ],
    featured: true,
    implementationPeriod: '9개월',
    teamSize: '68명',
    technologies: ['TensorFlow', 'n8n', 'IoT', 'Digital Twin', 'SCADA', 'Time Series AI'],
    downloadableResources: [
      '신재생에너지 AI 도입 가이드북',
      '스마트그리드 운영 매뉴얼',
      'ESS 최적화 백서'
    ]
  },

  'traditional-power-plant': {
    id: 'traditional-power-plant',
    category: 'energy',
    industry: '에너지/환경',
    subIndustry: '전통발전',
    companyName: '한국남부발전 (직원 2,850명)',
    companySize: '대기업',
    title: 'AI 화력발전소 운영 최적화',
    subtitle: '발전 효율 18% 향상, 탄소 배출 32% 감소',
    description: 'AI와 n8n을 활용한 화력발전소 스마트 운영으로 효율을 극대화하고 환경 영향을 최소화한 혁신 사례',
    icon: Factory,
    color: 'gray',
    heroImage: '/images/benchmark/47. AI 기반 재난 대응 시뮬레이션.png',
    companyInfo: {
      industry: '화력발전',
      employees: '2,850명',
      revenue: '연 매출 4.2조원',
      location: '부산시 사하구'
    },
    challenges: [
      {
        title: '연소 효율 최적화',
        description: '보일러 연소 조건 수동 조정의 한계',
        impact: '연료비 증가 및 환경 오염'
      },
      {
        title: '설비 노후화 관리',
        description: '30년 이상 노후 설비의 잦은 고장',
        impact: '가동률 저하 및 정비 비용 증가'
      },
      {
        title: '환경 규제 대응',
        description: '강화되는 대기오염물질 배출 규제',
        impact: '과징금 및 가동 제한 위험'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '화력발전 AI 기초',
          duration: '14시간',
          description: '발전소 AI 활용 이해'
        },
        {
          title: 'n8n 발전 자동화',
          duration: '12시간',
          description: '발전 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 연소 최적화',
          duration: '20시간',
          description: '보일러 연소 효율 극대화'
        },
        {
          title: '예측 정비 시스템',
          duration: '18시간',
          description: 'AI 기반 설비 관리'
        }
      ],
      executive: [
        {
          title: '친환경 발전 전략',
          duration: '6시간',
          description: '탄소중립 경영 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 연소 최적화',
        duration: '10주',
        activities: [
          '연소 데이터 수집 체계',
          'AI 최적화 모델 개발',
          '실시간 제어 시스템',
          '배출가스 모니터링'
        ],
        results: [
          '연소 효율 18% 향상',
          'NOx 배출 45% 감소',
          '연료비 연 280억원 절감'
        ]
      },
      {
        phase: '예측 정비 체계 구축',
        duration: '12주',
        activities: [
          '진동/온도 센서 설치',
          'AI 고장 예측 모델',
          '정비 스케줄 자동화',
          '부품 수명 예측'
        ],
        results: [
          '돌발 정지 75% 감소',
          '정비 비용 40% 절감',
          '가동률 95% 달성'
        ]
      },
      {
        phase: '환경 관리 자동화',
        duration: '8주',
        activities: [
          '대기오염 실시간 측정',
          'AI 배출 예측 모델',
          '자동 저감 시스템',
          '환경 리포트 자동화'
        ],
        results: [
          '배출 기준 100% 준수',
          '탄소 배출 32% 감소',
          '환경 과징금 Zero'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '발전 효율',
          before: '38%',
          after: '44.8%',
          improvement: '18% 향상'
        },
        {
          metric: '탄소 배출량',
          before: '연 850만톤',
          after: '연 578만톤',
          improvement: '32% 감소'
        },
        {
          metric: '설비 가동률',
          before: '82%',
          after: '95%',
          improvement: '15.9% 향상'
        },
        {
          metric: '연료비',
          before: '연 1,850억원',
          after: '연 1,570억원',
          improvement: '15.1% 절감'
        }
      ],
      financial: [
        {
          item: '연료비 절감',
          amount: '연 280억원'
        },
        {
          item: '정비비 절감',
          amount: '연 125억원'
        },
        {
          item: '탄소배출권 절감',
          amount: '연 95억원'
        }
      ],
      qualitative: [
        '친환경 발전소 전환 성공',
        '지역사회 대기질 개선 기여',
        '발전소 안전성 대폭 향상'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 연소 제어',
          description: '실시간 연소 조건 최적화',
          efficiency: '효율 18% 향상'
        },
        {
          name: '예측 정비',
          description: 'AI 기반 고장 예측 및 정비',
          efficiency: '고장 75% 예방'
        },
        {
          name: '환경 모니터링',
          description: '24시간 배출가스 관리',
          efficiency: '배출 32% 감소'
        }
      ],
      integrations: [
        'DCS(분산제어시스템)',
        'CEMS(굴뚝배출감시)',
        'ERP 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI가 보일러 연소를 최적화하니 같은 연료로 더 많은 전기를 생산할 수 있게 되었고, 미세먼지도 크게 줄었습니다. 30년 된 발전소가 최신 발전소 못지않은 효율을 내고 있습니다.",
        author: "이화력",
        position: "발전팀장",
        company: "한국남부발전"
      }
    ],
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '45명',
    technologies: ['AI/ML', 'n8n', 'IoT', 'DCS', 'CEMS'],
    downloadableResources: [
      '화력발전 AI 전환 가이드',
      '탄소 저감 매뉴얼'
    ]
  },

  'waste-management': {
    id: 'waste-management',
    category: 'energy',
    industry: '에너지/환경',
    subIndustry: '폐기물처리',
    companyName: '에코그린환경 (직원 1,200명)',
    companySize: '중견기업',
    title: 'AI 순환경제 폐기물 관리 시스템',
    subtitle: '재활용률 78% 달성, 처리 비용 45% 절감',
    description: 'AI와 n8n을 활용한 스마트 폐기물 수거·분류·재활용으로 순환경제를 실현한 환경 혁신 사례',
    icon: Recycle,
    color: 'green',
    heroImage: '/images/benchmark/71AI 기반 폐기물 처리 최적화.png',
    companyInfo: {
      industry: '폐기물 처리',
      employees: '1,200명',
      revenue: '연 매출 3,800억원',
      location: '경기도 김포시'
    },
    challenges: [
      {
        title: '수거 경로 비효율',
        description: '고정 경로 수거로 인한 연료비 낭비',
        impact: '운영비 증가 및 탄소 배출'
      },
      {
        title: '분류 정확도 한계',
        description: '수작업 분류로 인한 낮은 재활용률',
        impact: '매립 비용 증가 및 자원 낭비'
      },
      {
        title: '불법 투기 관리',
        description: '불법 투기 단속의 어려움',
        impact: '환경 오염 및 처리 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '순환경제 AI 기초',
          duration: '12시간',
          description: '폐기물 관리 AI 활용'
        },
        {
          title: 'n8n 수거 자동화',
          duration: '14시간',
          description: '스마트 수거 시스템'
        }
      ],
      advanced: [
        {
          title: 'AI 분류 시스템',
          duration: '20시간',
          description: '컴퓨터 비전 폐기물 분류'
        },
        {
          title: '경로 최적화',
          duration: '16시간',
          description: 'AI 기반 수거 경로 최적화'
        }
      ],
      executive: [
        {
          title: '순환경제 전략',
          duration: '6시간',
          description: 'ESG 경영과 순환경제'
        }
      ]
    },
    process: [
      {
        phase: 'AI 수거 최적화',
        duration: '8주',
        activities: [
          'IoT 센서 설치',
          'AI 경로 최적화',
          '실시간 모니터링',
          '수거 스케줄 자동화'
        ],
        results: [
          '수거 경로 35% 단축',
          '연료비 40% 절감',
          '수거 효율 250% 향상'
        ]
      },
      {
        phase: 'AI 분류 시스템',
        duration: '10주',
        activities: [
          '컴퓨터 비전 도입',
          'AI 재질 인식',
          '로봇 분류 자동화',
          '품질 검증 시스템'
        ],
        results: [
          '분류 정확도 95%',
          '재활용률 78% 달성',
          '처리 속도 400% 향상'
        ]
      },
      {
        phase: '불법 투기 방지',
        duration: '6주',
        activities: [
          'AI CCTV 분석',
          '자동 신고 시스템',
          '예측 순찰 경로',
          '주민 알림 서비스'
        ],
        results: [
          '불법 투기 85% 감소',
          '단속 효율 300% 향상',
          '주민 만족도 92%'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '재활용률',
          before: '32%',
          after: '78%',
          improvement: '143.8% 향상'
        },
        {
          metric: '처리 비용',
          before: '톤당 15만원',
          after: '톤당 8.25만원',
          improvement: '45% 절감'
        },
        {
          metric: '수거 효율',
          before: '일 200톤',
          after: '일 500톤',
          improvement: '150% 향상'
        },
        {
          metric: '매립량',
          before: '연 45만톤',
          after: '연 12만톤',
          improvement: '73.3% 감소'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 185억원'
        },
        {
          item: '재활용품 판매 수익',
          amount: '연 320억원'
        },
        {
          item: 'ROI',
          amount: '14개월 내 회수'
        }
      ],
      qualitative: [
        '국내 최고 재활용률 달성',
        '탄소중립 인증 획득',
        '지역 환경 개선 대상 수상'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 수거 경로',
          description: '실시간 최적 경로 계산',
          efficiency: '경로 35% 단축'
        },
        {
          name: 'AI 폐기물 분류',
          description: '컴퓨터 비전 자동 분류',
          efficiency: '정확도 95%'
        },
        {
          name: '불법 투기 감지',
          description: 'AI CCTV 자동 감지',
          efficiency: '85% 예방'
        }
      ],
      integrations: [
        'IoT 센서 네트워크',
        '컴퓨터 비전 시스템',
        '차량 관제 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI 도입 후 폐기물이 자원으로 바뀌었습니다. 재활용률이 2배 이상 늘었고, 매립장으로 가는 쓰레기가 확 줄었습니다. 진정한 순환경제를 실현하고 있습니다.",
        author: "김순환",
        position: "처리장 소장",
        company: "에코그린환경"
      }
    ],
    featured: true,
    implementationPeriod: '6개월',
    teamSize: '38명',
    technologies: ['Computer Vision', 'n8n', 'IoT', 'GPS', 'Robotics'],
    downloadableResources: [
      '순환경제 AI 가이드',
      '스마트 폐기물 관리 백서'
    ]
  },

  'water-treatment': {
    id: 'water-treatment',
    category: 'energy',
    industry: '에너지/환경',
    subIndustry: '수처리',
    companyName: 'K-water (직원 4,500명)',
    companySize: '대기업',
    title: 'AI 스마트 물 관리 플랫폼',
    subtitle: '누수율 2.8% 달성, 에너지 35% 절감',
    description: 'AI와 n8n을 활용한 상수도 전 과정 스마트화로 물 손실을 최소화하고 수질을 혁신적으로 개선한 사례',
    icon: Droplet,
    color: 'blue',
    heroImage: '/images/benchmark/72AI 기반 수자원 관리.png',
    companyInfo: {
      industry: '수자원 관리',
      employees: '4,500명',
      revenue: '연 매출 2.8조원',
      location: '대전시 대덕구'
    },
    challenges: [
      {
        title: '노후 관로 누수',
        description: '30년 이상 노후 관로의 빈번한 누수',
        impact: '수자원 손실 및 수도료 수익 감소'
      },
      {
        title: '수질 관리 복잡성',
        description: '실시간 수질 모니터링 한계',
        impact: '수질 사고 위험 및 민원 발생'
      },
      {
        title: '에너지 비용 증가',
        description: '펌프 운영 최적화 부재',
        impact: '과도한 전력 소비 및 운영비 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '스마트 물 관리 기초',
          duration: '14시간',
          description: 'AI 수처리 시스템 이해'
        },
        {
          title: 'n8n 수도 자동화',
          duration: '12시간',
          description: '수도 운영 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 누수 감지',
          duration: '20시간',
          description: '음향/압력 기반 누수 예측'
        },
        {
          title: '수질 예측 모델',
          duration: '18시간',
          description: 'AI 기반 수질 관리'
        }
      ],
      executive: [
        {
          title: '물 산업 혁신',
          duration: '6시간',
          description: '스마트 물 관리 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 누수 감지 시스템',
        duration: '10주',
        activities: [
          '음향 센서 설치',
          'AI 누수 패턴 학습',
          '실시간 감지 시스템',
          '자동 차단 밸브'
        ],
        results: [
          '누수 감지율 98%',
          '누수율 2.8% 달성',
          '수자원 연 85만톤 절약'
        ]
      },
      {
        phase: '수질 관리 자동화',
        duration: '8주',
        activities: [
          '수질 센서 네트워크',
          'AI 수질 예측',
          '자동 약품 투입',
          '실시간 알림 시스템'
        ],
        results: [
          '수질 기준 100% 달성',
          '약품 사용 30% 절감',
          '수질 민원 Zero'
        ]
      },
      {
        phase: '에너지 최적화',
        duration: '6주',
        activities: [
          'AI 수요 예측',
          '펌프 운영 최적화',
          '압력 관리 자동화',
          '에너지 모니터링'
        ],
        results: [
          '전력 사용 35% 절감',
          '펌프 효율 28% 향상',
          '탄소 배출 40% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '누수율',
          before: '12.5%',
          after: '2.8%',
          improvement: '77.6% 감소'
        },
        {
          metric: '에너지 비용',
          before: '연 450억원',
          after: '연 292억원',
          improvement: '35% 절감'
        },
        {
          metric: '수질 적합률',
          before: '95.2%',
          after: '99.9%',
          improvement: '5% 향상'
        },
        {
          metric: '운영 인력',
          before: '850명',
          after: '520명',
          improvement: '38.8% 효율화'
        }
      ],
      financial: [
        {
          item: '누수 감소 수익',
          amount: '연 125억원'
        },
        {
          item: '에너지 절감액',
          amount: '연 158억원'
        },
        {
          item: '인건비 절감',
          amount: '연 95억원'
        }
      ],
      qualitative: [
        '세계 최저 수준 누수율 달성',
        '24시간 안전한 수돗물 공급',
        'ISO 50001 에너지경영 인증'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 누수 감지',
          description: '음향/압력 분석 누수 예측',
          efficiency: '감지율 98%'
        },
        {
          name: '수질 자동 관리',
          description: 'AI 기반 약품 투입 최적화',
          efficiency: '수질 99.9%'
        },
        {
          name: '펌프 최적 운영',
          description: 'AI 수요 예측 기반 운영',
          efficiency: '에너지 35% 절감'
        }
      ],
      integrations: [
        'SCADA 시스템',
        'GIS 관망도',
        'AMI(원격검침)'
      ]
    },
    testimonials: [
      {
        quote: "AI가 관로의 미세한 소리를 듣고 누수를 찾아냅니다. 예전에는 땅을 파봐야 알았는데, 이제는 정확한 위치를 미리 알고 가니 작업 시간이 90% 줄었습니다.",
        author: "박청수",
        position: "관로관리팀장",
        company: "K-water"
      }
    ],
    featured: false,
    implementationPeriod: '7개월',
    teamSize: '52명',
    technologies: ['AI/ML', 'n8n', 'IoT', 'Acoustic Sensors', 'SCADA'],
    downloadableResources: [
      '스마트 물 관리 가이드',
      'AI 누수 감지 백서'
    ]
  },

  'carbon-management': {
    id: 'carbon-management',
    category: 'energy',
    industry: '에너지/환경',
    subIndustry: '탄소관리',
    companyName: '포스코 (직원 37,000명)',
    companySize: '대기업',
    title: 'AI 탄소중립 통합 관리 시스템',
    subtitle: '탄소 배출 38% 감축, 비용 2,800억원 절감',
    description: 'AI와 n8n을 활용한 전사 탄소 배출 모니터링과 감축으로 2050 탄소중립을 향한 혁신적 전환 사례',
    icon: Leaf,
    color: 'green',
    heroImage: '/images/benchmark/65AI 기반 전력 수요 예측.png',
    companyInfo: {
      industry: '철강 제조',
      employees: '37,000명',
      revenue: '연 매출 76조원',
      location: '경상북도 포항시'
    },
    challenges: [
      {
        title: '복잡한 배출원 관리',
        description: '수천 개 배출원의 실시간 모니터링 한계',
        impact: '정확한 배출량 파악 어려움'
      },
      {
        title: '감축 기술 최적화',
        description: '다양한 감축 기술의 효과 예측 어려움',
        impact: '투자 의사결정 지연'
      },
      {
        title: '탄소 규제 대응',
        description: '강화되는 국제 탄소 규제 준수',
        impact: '막대한 탄소세 부담'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '탄소중립 AI 기초',
          duration: '16시간',
          description: '탄소 관리 AI 활용'
        },
        {
          title: 'n8n 탄소 모니터링',
          duration: '14시간',
          description: '배출 데이터 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 배출 예측',
          duration: '24시간',
          description: '탄소 배출 예측 모델'
        },
        {
          title: '감축 최적화',
          duration: '20시간',
          description: 'AI 기반 감축 전략'
        }
      ],
      executive: [
        {
          title: '탄소중립 경영',
          duration: '8시간',
          description: 'Net Zero 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 모니터링 구축',
        duration: '12주',
        activities: [
          'IoT 센서 전면 설치',
          '실시간 데이터 수집',
          'AI 배출량 산정',
          '블록체인 검증'
        ],
        results: [
          '3,500개 배출원 실시간 모니터링',
          '측정 정확도 99.5%',
          '보고 시간 95% 단축'
        ]
      },
      {
        phase: 'AI 감축 최적화',
        duration: '16주',
        activities: [
          '공정별 AI 분석',
          '감축 시뮬레이션',
          '투자 우선순위 도출',
          '실행 로드맵 수립'
        ],
        results: [
          '감축 잠재량 45% 발굴',
          '투자 효율성 3배 향상',
          '2030 목표 조기 달성'
        ]
      },
      {
        phase: '수소 전환 준비',
        duration: '20주',
        activities: [
          '수소환원제철 시뮬레이션',
          'AI 전환 시나리오',
          '그린수소 수급 계획',
          '인프라 전환 설계'
        ],
        results: [
          '전환 비용 30% 절감',
          '전환 기간 2년 단축',
          '기술 리스크 최소화'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '탄소 배출량',
          before: '연 8,100만톤',
          after: '연 5,022만톤',
          improvement: '38% 감축'
        },
        {
          metric: '탄소 비용',
          before: '연 4,500억원',
          after: '연 1,700억원',
          improvement: '62.2% 절감'
        },
        {
          metric: '에너지 효율',
          before: '100%',
          after: '128%',
          improvement: '28% 향상'
        },
        {
          metric: '재생에너지 비율',
          before: '8%',
          after: '35%',
          improvement: '337.5% 증가'
        }
      ],
      financial: [
        {
          item: '탄소세 절감',
          amount: '연 2,800억원'
        },
        {
          item: '에너지 비용 절감',
          amount: '연 1,250억원'
        },
        {
          item: '그린 프리미엄 수익',
          amount: '연 850억원'
        }
      ],
      qualitative: [
        '글로벌 탄소중립 선도 기업',
        'CDP A등급 획득',
        'RE100 가입 및 이행'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 배출 모니터링',
          description: '실시간 탄소 배출 추적',
          efficiency: '정확도 99.5%'
        },
        {
          name: '감축 시뮬레이션',
          description: 'AI 기반 감축 시나리오',
          efficiency: '최적화 효율 3배'
        },
        {
          name: '탄소 거래 자동화',
          description: '배출권 자동 거래',
          efficiency: '수익 45% 증가'
        }
      ],
      integrations: [
        'IoT 센서 네트워크',
        '블록체인 검증',
        'ETS 거래 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI가 공장 전체의 탄소 배출을 실시간으로 추적하고 최적의 감축 방법을 제시합니다. 덕분에 탄소중립 목표를 훨씬 빨리 달성할 수 있게 되었고, 비용도 크게 절감했습니다.",
        author: "최그린",
        position: "탄소중립추진단장",
        company: "포스코"
      }
    ],
    featured: true,
    implementationPeriod: '12개월',
    teamSize: '125명',
    technologies: ['AI/ML', 'n8n', 'IoT', 'Blockchain', 'Digital Twin'],
    downloadableResources: [
      '탄소중립 AI 전략서',
      '배출 모니터링 가이드',
      'Net Zero 로드맵'
    ]
  },

  'environmental-consulting': {
    id: 'environmental-consulting',
    category: 'energy',
    industry: '에너지/환경',
    subIndustry: '환경컨설팅',
    companyName: '한국환경공단 (직원 2,100명)',
    companySize: '공기업',
    title: 'AI 환경영향평가 자동화 플랫폼',
    subtitle: '평가 기간 70% 단축, 정확도 95% 달성',
    description: 'AI와 n8n을 활용한 환경영향평가 전 과정 자동화로 신속하고 정확한 환경 컨설팅을 실현한 혁신 사례',
    icon: Globe,
    color: 'emerald',
    heroImage: '/images/benchmark/66AI 기반 스마트 그리드 운영.png',
    companyInfo: {
      industry: '환경 서비스',
      employees: '2,100명',
      revenue: '연 매출 1.2조원',
      location: '인천시 서구'
    },
    challenges: [
      {
        title: '평가 기간 장기화',
        description: '복잡한 환경영향평가 수작업 진행',
        impact: '개발 사업 지연 및 비용 증가'
      },
      {
        title: '데이터 분석 한계',
        description: '방대한 환경 데이터 수동 분석',
        impact: '평가 정확도 저하'
      },
      {
        title: '규제 변화 대응',
        description: '빈번한 환경 규제 변경',
        impact: '평가 기준 불일치'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '환경평가 AI 기초',
          duration: '14시간',
          description: 'AI 환경영향평가 이해'
        },
        {
          title: 'n8n 평가 자동화',
          duration: '12시간',
          description: '평가 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 영향 예측',
          duration: '20시간',
          description: '환경영향 예측 모델'
        },
        {
          title: '빅데이터 분석',
          duration: '18시간',
          description: '환경 빅데이터 활용'
        }
      ],
      executive: [
        {
          title: '환경 경영 전략',
          duration: '6시간',
          description: 'ESG와 환경평가'
        }
      ]
    },
    process: [
      {
        phase: 'AI 평가 시스템 구축',
        duration: '10주',
        activities: [
          '환경 데이터 통합',
          'AI 예측 모델 개발',
          '자동 보고서 생성',
          '규제 자동 업데이트'
        ],
        results: [
          '평가 기간 70% 단축',
          '데이터 분석 100배 가속',
          '규제 준수율 100%'
        ]
      },
      {
        phase: '생태계 영향 분석',
        duration: '8주',
        activities: [
          '위성 영상 AI 분석',
          '생물종 자동 식별',
          '서식지 변화 예측',
          '보전 방안 도출'
        ],
        results: [
          '생태 평가 정확도 95%',
          '멸종위기종 100% 파악',
          '서식지 보전율 85%'
        ]
      },
      {
        phase: '주민 영향 평가',
        duration: '6주',
        activities: [
          'AI 소음/진동 예측',
          '대기질 영향 분석',
          '건강 영향 평가',
          '주민 의견 분석'
        ],
        results: [
          '예측 정확도 92%',
          '민원 75% 감소',
          '주민 수용성 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '평가 소요 기간',
          before: '평균 6개월',
          after: '평균 1.8개월',
          improvement: '70% 단축'
        },
        {
          metric: '평가 정확도',
          before: '78%',
          after: '95%',
          improvement: '21.8% 향상'
        },
        {
          metric: '처리 건수',
          before: '연 250건',
          after: '연 850건',
          improvement: '240% 증가'
        },
        {
          metric: '평가 비용',
          before: '건당 8,500만원',
          after: '건당 3,200만원',
          improvement: '62.4% 절감'
        }
      ],
      financial: [
        {
          item: '인건비 절감',
          amount: '연 125억원'
        },
        {
          item: '추가 수주 수익',
          amount: '연 280억원'
        },
        {
          item: 'ROI',
          amount: '10개월 내 회수'
        }
      ],
      qualitative: [
        '국내 최초 AI 환경평가 시스템',
        '국제 환경평가 표준 인증',
        '개발과 보전의 균형 실현'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 영향 예측',
          description: '다차원 환경영향 시뮬레이션',
          efficiency: '평가 시간 70% 단축'
        },
        {
          name: '자동 보고서 생성',
          description: 'AI 기반 평가서 작성',
          efficiency: '작성 시간 85% 절감'
        },
        {
          name: '규제 자동 반영',
          description: '실시간 규제 업데이트',
          efficiency: '준수율 100%'
        }
      ],
      integrations: [
        'GIS 시스템',
        '위성 영상 플랫폼',
        '환경 빅데이터'
      ]
    },
    testimonials: [
      {
        quote: "AI 시스템 덕분에 6개월 걸리던 환경영향평가를 2개월 만에 끝낼 수 있었습니다. 더 정확하고 객관적인 평가가 가능해져 사업 추진이 훨씬 원활해졌습니다.",
        author: "김환경",
        position: "평가1팀장",
        company: "한국환경공단"
      }
    ],
    featured: false,
    implementationPeriod: '7개월',
    teamSize: '48명',
    technologies: ['AI/ML', 'n8n', 'GIS', 'Satellite Imagery', 'NLP'],
    downloadableResources: [
      'AI 환경평가 가이드',
      '디지털 환경평가 백서'
    ]
  }
};

// 에너지/환경 업종 요약 리스트
export const energyEnvironmentCases: SuccessCase[] = [
  {
    id: 'renewable-energy-management',
    category: 'energy',
    industry: '에너지/환경',
    companyName: '한화에너지',
    title: 'AI 기반 신재생에너지 통합 관리 플랫폼',
    description: '발전 효율 42% 향상, 운영 비용 38% 절감',
    metrics: {
      efficiency: '+42%',
      cost: '-38%',
      carbon: '-73.3%',
      revenue: '+28%'
    },
    tags: ['신재생에너지', 'ESS최적화', '스마트그리드', '탄소중립'],
    icon: Sun,
    color: 'yellow',
    featured: true
  },
  {
    id: 'traditional-power-plant',
    category: 'energy',
    industry: '에너지/환경',
    companyName: '한국남부발전',
    title: 'AI 화력발전소 운영 최적화',
    description: '발전 효율 18% 향상, 탄소 배출 32% 감소',
    metrics: {
      efficiency: '+18%',
      carbon: '-32%',
      availability: '+15.9%',
      fuel: '-15.1%'
    },
    tags: ['화력발전', '연소최적화', '예측정비', '친환경'],
    icon: Factory,
    color: 'gray',
    featured: false
  },
  {
    id: 'waste-management',
    category: 'energy',
    industry: '에너지/환경',
    companyName: '에코그린환경',
    title: 'AI 순환경제 폐기물 관리 시스템',
    description: '재활용률 78% 달성, 처리 비용 45% 절감',
    metrics: {
      recycling: '78%',
      cost: '-45%',
      efficiency: '+150%',
      landfill: '-73.3%'
    },
    tags: ['순환경제', '스마트수거', 'AI분류', '재활용'],
    icon: Recycle,
    color: 'green',
    featured: true
  },
  {
    id: 'water-treatment',
    category: 'energy',
    industry: '에너지/환경',
    companyName: 'K-water',
    title: 'AI 스마트 물 관리 플랫폼',
    description: '누수율 2.8% 달성, 에너지 35% 절감',
    metrics: {
      leakage: '2.8%',
      energy: '-35%',
      quality: '99.9%',
      efficiency: '+38.8%'
    },
    tags: ['스마트물관리', '누수감지', '수질관리', '에너지최적화'],
    icon: Droplet,
    color: 'blue',
    featured: false
  },
  {
    id: 'carbon-management',
    category: 'energy',
    industry: '에너지/환경',
    companyName: '포스코',
    title: 'AI 탄소중립 통합 관리 시스템',
    description: '탄소 배출 38% 감축, 비용 2,800억원 절감',
    metrics: {
      carbon: '-38%',
      cost: '-62.2%',
      energy: '+28%',
      renewable: '+337.5%'
    },
    tags: ['탄소중립', 'NetZero', '배출모니터링', '수소전환'],
    icon: Leaf,
    color: 'green',
    featured: true
  },
  {
    id: 'environmental-consulting',
    category: 'energy',
    industry: '에너지/환경',
    companyName: '한국환경공단',
    title: 'AI 환경영향평가 자동화 플랫폼',
    description: '평가 기간 70% 단축, 정확도 95% 달성',
    metrics: {
      time: '-70%',
      accuracy: '95%',
      capacity: '+240%',
      cost: '-62.4%'
    },
    tags: ['환경평가', 'AI예측', '자동보고서', 'ESG'],
    icon: Globe,
    color: 'emerald',
    featured: false
  }
];

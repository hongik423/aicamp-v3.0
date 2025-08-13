'use client';

import { 
  Wheat, 
  Fish, 
  TreePine, 
  Beef, 
  Sprout,
  Factory,
  TrendingUp,
  Clock,
  Target,
  Shield,
  BarChart3,
  Users,
  Droplets,
  Sun,
  Wind,
  Bug,
  Thermometer,
  Camera
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 농업/수산업 업종 성공사례 데이터
export const agricultureFisheryCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'smart-farm-automation': {
    id: 'smart-farm-automation',
    category: 'agriculture',
    industry: '농업/수산업',
    subIndustry: '농업기술/스마트팜',
    companyName: '팜에이트 (직원 450명)',
    companySize: '중견기업',
    title: 'AI 완전 자율 스마트팜 운영 시스템',
    subtitle: '생산량 285% 증가, 인건비 78% 절감',
    description: 'AI와 n8n을 활용한 완전 자동화 수직농장으로 365일 안정적인 농산물 생산을 실현한 농업 혁신 사례',
    icon: Sprout,
    color: 'green',
    heroImage: '/images/benchmark/41. AI 기반 스마트 농업 관리.png',
    companyInfo: {
      industry: '스마트팜 운영',
      employees: '450명',
      revenue: '연 매출 1,850억원',
      location: '경기도 평택시'
    },
    challenges: [
      {
        title: '생육 환경 최적화',
        description: '작물별 최적 생육 조건 수동 관리의 한계',
        impact: '생산성 저하 및 품질 편차'
      },
      {
        title: '병해충 관리 어려움',
        description: '조기 발견 및 대응 체계 부재',
        impact: '수확량 손실 및 농약 과다 사용'
      },
      {
        title: '에너지 비용 부담',
        description: 'LED 조명 및 공조 시스템 운영비',
        impact: '수익성 악화'
      },
      {
        title: '숙련 인력 부족',
        description: '전문 농업 기술자 확보 어려움',
        impact: '운영 효율성 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '스마트팜 AI 기초',
          duration: '16시간',
          description: '정밀농업 AI 시스템 이해'
        },
        {
          title: 'n8n 농장 자동화',
          duration: '14시간',
          description: '재배 프로세스 자동화'
        },
        {
          title: 'IoT 센서 활용',
          duration: '12시간',
          description: '농업 IoT 데이터 관리'
        }
      ],
      advanced: [
        {
          title: 'AI 생육 최적화',
          duration: '24시간',
          description: '작물별 최적 재배 모델'
        },
        {
          title: '컴퓨터 비전 병해충',
          duration: '20시간',
          description: 'AI 영상 분석 진단'
        },
        {
          title: '수확량 예측 모델',
          duration: '18시간',
          description: '머신러닝 생산 예측'
        }
      ],
      executive: [
        {
          title: '미래농업 전략',
          duration: '8시간',
          description: 'AgTech 경영 혁신'
        },
        {
          title: '식량안보와 AI',
          duration: '6시간',
          description: '지속가능 농업 경영'
        }
      ]
    },
    process: [
      {
        phase: 'AI 환경 제어 시스템',
        duration: '10주',
        activities: [
          'IoT 센서 네트워크 구축',
          'AI 생육 모델 개발',
          '자동 환경 제어 시스템',
          '에너지 최적화 알고리즘'
        ],
        results: [
          '생육 속도 45% 향상',
          '에너지 사용 38% 절감',
          '품질 균일도 95%'
        ]
      },
      {
        phase: '병해충 AI 진단',
        duration: '8주',
        activities: [
          '고해상도 카메라 설치',
          'AI 이미지 분석 모델',
          '자동 방제 시스템',
          '예방 관리 프로토콜'
        ],
        results: [
          '병해충 조기 발견율 98%',
          '농약 사용 85% 감소',
          '수확 손실 2% 미만'
        ]
      },
      {
        phase: '수확·포장 자동화',
        duration: '12주',
        activities: [
          'AI 숙도 판별 시스템',
          '로봇 수확 시스템',
          '자동 선별·포장',
          '품질 등급 자동화'
        ],
        results: [
          '수확 정확도 99%',
          '포장 속도 500% 향상',
          '인건비 78% 절감'
        ]
      },
      {
        phase: '유통 최적화',
        duration: '6주',
        activities: [
          'AI 수요 예측',
          '자동 재고 관리',
          '최적 배송 경로',
          '신선도 추적 시스템'
        ],
        results: [
          '폐기율 8% → 0.5%',
          '유통 기간 50% 단축',
          '고객 만족도 96%'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '연간 생산량',
          before: '평당 180kg',
          after: '평당 513kg',
          improvement: '285% 증가'
        },
        {
          metric: '인건비',
          before: '연 85억원',
          after: '연 18.7억원',
          improvement: '78% 절감'
        },
        {
          metric: '에너지 비용',
          before: '월 8,500만원',
          after: '월 5,270만원',
          improvement: '38% 절감'
        },
        {
          metric: '물 사용량',
          before: '일 850톤',
          after: '일 85톤',
          improvement: '90% 절감'
        },
        {
          metric: '농약 사용량',
          before: '연 12톤',
          after: '연 1.8톤',
          improvement: '85% 감소'
        },
        {
          metric: '수확 주기',
          before: '연 3.5회',
          after: '연 12회',
          improvement: '243% 향상'
        }
      ],
      financial: [
        {
          item: '추가 생산 수익',
          amount: '연 285억원'
        },
        {
          item: '운영비 절감액',
          amount: '연 125억원'
        },
        {
          item: '프리미엄 판매 수익',
          amount: '연 85억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 420%'
        }
      ],
      qualitative: [
        '국내 최초 완전 자율 수직농장 구현',
        '무농약 친환경 인증 획득',
        '365일 안정적 공급 체계 구축',
        '탄소중립 농장 인증',
        '청년 일자리 창출 우수기업'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 환경 제어',
          description: '온도/습도/CO2/조도 자동 최적화',
          efficiency: '생육 45% 가속'
        },
        {
          name: '병해충 AI 진단',
          description: '컴퓨터 비전 실시간 모니터링',
          efficiency: '조기 발견 98%'
        },
        {
          name: '로봇 수확 시스템',
          description: 'AI 숙도 판별 자동 수확',
          efficiency: '정확도 99%'
        },
        {
          name: '수요 예측 재배',
          description: 'AI 기반 수요 예측 생산 계획',
          efficiency: '폐기율 0.5%'
        }
      ],
      integrations: [
        'IoT 센서 플랫폼',
        '기상청 API',
        'ERP 시스템',
        '유통 SCM'
      ]
    },
    testimonials: [
      {
        quote: "AI가 작물의 미세한 변화까지 감지하고 최적의 환경을 만들어줍니다. 1년 365일 최고 품질의 농산물을 생산할 수 있게 되었고, 젊은 직원들도 쉽게 농장을 운영할 수 있습니다. 진정한 농업의 미래를 만들고 있다고 자부합니다.",
        author: "김스마트",
        position: "스마트팜 운영본부장",
        company: "팜에이트"
      },
      {
        quote: "예전에는 병해충 때문에 수확량의 30%를 잃기도 했는데, AI가 잎의 미세한 변화도 놓치지 않고 즉시 알려줍니다. 농약도 거의 쓰지 않게 되어 소비자들이 정말 좋아합니다.",
        author: "이청정",
        position: "재배팀장",
        company: "팜에이트"
      }
    ],
    featured: true,
    implementationPeriod: '10개월',
    teamSize: '58명',
    technologies: ['Computer Vision', 'n8n', 'IoT', 'Robotics', 'ML', 'Vertical Farming'],
    downloadableResources: [
      '스마트팜 AI 도입 가이드북',
      '정밀농업 자동화 매뉴얼',
      '수직농장 운영 백서'
    ]
  },

  'traditional-farming': {
    id: 'traditional-farming',
    category: 'agriculture',
    industry: '농업/수산업',
    subIndustry: '농업/농산물',
    companyName: '한국농업협동조합 (직원 850명)',
    companySize: '협동조합',
    title: 'AI 기반 전통농업 디지털 전환',
    subtitle: '수확량 42% 증가, 유통 손실 65% 감소',
    description: 'AI와 n8n으로 전통 농업을 과학영농으로 전환하여 생산성과 수익성을 극대화한 농촌 혁신 사례',
    icon: Wheat,
    color: 'yellow',
    heroImage: '/images/benchmark/42. AI 기반 작물 수확 최적화.png',
    companyInfo: {
      industry: '농산물 생산·유통',
      employees: '조합원 12,000명',
      revenue: '연 거래액 2.5조원',
      location: '전국 8개 지역'
    },
    challenges: [
      {
        title: '기후변화 대응',
        description: '이상기후로 인한 작물 피해 증가',
        impact: '수확량 불안정 및 품질 저하'
      },
      {
        title: '고령화 인력난',
        description: '농촌 고령화로 노동력 부족',
        impact: '경작 포기 농지 증가'
      },
      {
        title: '유통 구조 비효율',
        description: '복잡한 유통 단계와 정보 비대칭',
        impact: '농가 수익 감소'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '디지털 농업 입문',
          duration: '12시간',
          description: '스마트폰 활용 영농'
        },
        {
          title: 'AI 영농 도우미',
          duration: '10시간',
          description: 'AI 농사 컨설팅 활용'
        }
      ],
      advanced: [
        {
          title: '정밀농업 실습',
          duration: '20시간',
          description: '드론/센서 활용법'
        },
        {
          title: '데이터 영농',
          duration: '16시간',
          description: '농업 빅데이터 분석'
        }
      ],
      executive: [
        {
          title: '농업 경영 혁신',
          duration: '8시간',
          description: 'AgTech 시대 농업경영'
        }
      ]
    },
    process: [
      {
        phase: 'AI 영농 지원 시스템',
        duration: '12주',
        activities: [
          '토양/기상 데이터 수집',
          'AI 재배 컨설팅 모델',
          '병해충 예측 경보',
          '모바일 앱 개발'
        ],
        results: [
          '12,000 농가 앱 사용',
          '재배 성공률 85%',
          '병해충 피해 60% 감소'
        ]
      },
      {
        phase: '스마트 유통 플랫폼',
        duration: '10주',
        activities: [
          'AI 가격 예측 시스템',
          '직거래 플랫폼 구축',
          '품질 자동 등급화',
          '실시간 재고 관리'
        ],
        results: [
          '유통 단계 5→2단계',
          '농가 수익 35% 증가',
          '폐기율 65% 감소'
        ]
      },
      {
        phase: '드론 정밀농업',
        duration: '8주',
        activities: [
          '드론 영상 분석',
          'AI 생육 진단',
          '정밀 방제 시스템',
          '수확 시기 예측'
        ],
        results: [
          '방제 비용 50% 절감',
          '수확량 42% 증가',
          '노동 시간 70% 단축'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '평균 수확량',
          before: '10a당 450kg',
          after: '10a당 639kg',
          improvement: '42% 증가'
        },
        {
          metric: '유통 손실률',
          before: '28%',
          after: '9.8%',
          improvement: '65% 감소'
        },
        {
          metric: '농가 소득',
          before: '연 3,200만원',
          after: '연 4,320만원',
          improvement: '35% 증가'
        },
        {
          metric: '영농 비용',
          before: '10a당 180만원',
          after: '10a당 126만원',
          improvement: '30% 절감'
        }
      ],
      financial: [
        {
          item: '추가 생산 수익',
          amount: '연 3,200억원'
        },
        {
          item: '유통 비용 절감',
          amount: '연 850억원'
        },
        {
          item: '정부 지원금 확보',
          amount: '연 450억원'
        }
      ],
      qualitative: [
        '청년 농업인 500명 유입',
        '지역 농산물 브랜드 가치 상승',
        'GAP 인증 농가 85% 달성'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 영농 컨설팅',
          description: '맞춤형 재배 처방',
          efficiency: '수확량 42% 증가'
        },
        {
          name: '스마트 계약재배',
          description: 'AI 수요 예측 기반 계약',
          efficiency: '판로 100% 확보'
        },
        {
          name: '드론 정밀방제',
          description: 'AI 처방 자동 살포',
          efficiency: '방제비 50% 절감'
        }
      ],
      integrations: [
        '농업기상 시스템',
        '농산물 유통정보',
        '토양정보 시스템'
      ]
    },
    testimonials: [
      {
        quote: "70살에 스마트폰으로 AI 농사를 짓게 될 줄은 몰랐습니다. AI가 언제 무엇을 해야 하는지 알려주니 농사가 쉬워졌고, 수확도 많이 늘었습니다.",
        author: "박농부",
        position: "쌀 재배 농가",
        company: "이천시 농업협동조합"
      }
    ],
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '42명',
    technologies: ['AI/ML', 'n8n', 'Drone', 'IoT', 'Mobile App'],
    downloadableResources: [
      '스마트 영농 가이드',
      'AI 농업 활용 매뉴얼'
    ]
  },

  'livestock-farming': {
    id: 'livestock-farming',
    category: 'agriculture',
    industry: '농업/수산업',
    subIndustry: '축산업',
    companyName: '하림 (직원 3,200명)',
    companySize: '대기업',
    title: 'AI 축산 통합 관리 플랫폼',
    subtitle: '폐사율 78% 감소, 사료효율 32% 개선',
    description: 'AI와 n8n을 활용한 스마트 축산으로 동물복지와 생산성을 동시에 실현한 축산업 혁신 사례',
    icon: Beef,
    color: 'red',
    heroImage: '/images/benchmark/43. AI 기반 가축 건강 모니터링.png',
    companyInfo: {
      industry: '육계 사육·가공',
      employees: '3,200명',
      revenue: '연 매출 2.8조원',
      location: '전라북도 익산시'
    },
    challenges: [
      {
        title: '질병 관리 어려움',
        description: '조류독감 등 전염병 위험',
        impact: '대량 폐사 및 살처분'
      },
      {
        title: '사료 효율성',
        description: '비효율적 사료 급여',
        impact: '생산 원가 상승'
      },
      {
        title: '동물복지 요구',
        description: '소비자 동물복지 요구 증가',
        impact: '시설 개선 압박'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '스마트 축산 기초',
          duration: '14시간',
          description: 'AI 축산 시스템 이해'
        },
        {
          title: 'n8n 사육 자동화',
          duration: '12시간',
          description: '축사 자동화 시스템'
        }
      ],
      advanced: [
        {
          title: 'AI 질병 예측',
          duration: '20시간',
          description: '가축 건강 모니터링'
        },
        {
          title: '사료 최적화',
          duration: '16시간',
          description: 'AI 기반 사료 관리'
        }
      ],
      executive: [
        {
          title: '축산업 혁신',
          duration: '6시간',
          description: '지속가능 축산 경영'
        }
      ]
    },
    process: [
      {
        phase: 'AI 건강 모니터링',
        duration: '10주',
        activities: [
          '바이오 센서 설치',
          'AI 행동 패턴 분석',
          '질병 조기 경보',
          '자동 격리 시스템'
        ],
        results: [
          '질병 조기 발견 95%',
          '폐사율 78% 감소',
          '항생제 사용 65% 감소'
        ]
      },
      {
        phase: '스마트 사료 관리',
        duration: '8주',
        activities: [
          '개체별 RFID 관리',
          'AI 성장 예측 모델',
          '자동 급이 시스템',
          '영양 최적화'
        ],
        results: [
          '사료효율 32% 개선',
          '성장 기간 15% 단축',
          '균일도 92% 달성'
        ]
      },
      {
        phase: '환경 제어 자동화',
        duration: '6주',
        activities: [
          'IoT 환경 센서',
          'AI 쾌적도 관리',
          '자동 환기 시스템',
          '스트레스 모니터링'
        ],
        results: [
          '동물복지 인증 획득',
          '생산성 28% 향상',
          '에너지 35% 절감'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '폐사율',
          before: '8.5%',
          after: '1.87%',
          improvement: '78% 감소'
        },
        {
          metric: '사료요구율(FCR)',
          before: '1.85',
          after: '1.26',
          improvement: '32% 개선'
        },
        {
          metric: '출하 일령',
          before: '35일',
          after: '29.75일',
          improvement: '15% 단축'
        },
        {
          metric: '항생제 사용',
          before: '연 12톤',
          after: '연 4.2톤',
          improvement: '65% 감소'
        }
      ],
      financial: [
        {
          item: '사료비 절감',
          amount: '연 320억원'
        },
        {
          item: '폐사 손실 감소',
          amount: '연 185억원'
        },
        {
          item: '프리미엄 판매',
          amount: '연 250억원'
        }
      ],
      qualitative: [
        '동물복지 최우수 인증',
        '무항생제 축산물 인증',
        '탄소중립 축산 선도'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 질병 예측',
          description: '행동 패턴 기반 건강 진단',
          efficiency: '조기 발견 95%'
        },
        {
          name: '정밀 사료 급여',
          description: '개체별 맞춤 급이',
          efficiency: 'FCR 32% 개선'
        },
        {
          name: '환경 자동 제어',
          description: '최적 사육 환경 유지',
          efficiency: '생산성 28% 향상'
        }
      ],
      integrations: [
        'RFID 시스템',
        'IoT 플랫폼',
        'ERP 연동'
      ]
    },
    testimonials: [
      {
        quote: "AI가 닭들의 행동을 24시간 관찰하면서 아픈 개체를 미리 찾아냅니다. 덕분에 전염병 확산을 막을 수 있고, 건강한 닭을 키울 수 있게 되었습니다.",
        author: "김축산",
        position: "농장장",
        company: "하림 익산농장"
      }
    ],
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '35명',
    technologies: ['Computer Vision', 'n8n', 'IoT', 'RFID', 'ML'],
    downloadableResources: [
      '스마트 축산 가이드',
      'AI 축산 매뉴얼'
    ]
  },

  'aquaculture-management': {
    id: 'aquaculture-management',
    category: 'agriculture',
    industry: '농업/수산업',
    subIndustry: '수산업',
    companyName: '동원수산 (직원 1,850명)',
    companySize: '대기업',
    title: 'AI 스마트 양식장 운영 시스템',
    subtitle: '생존율 95% 달성, 생산량 68% 증가',
    description: 'AI와 n8n을 활용한 첨단 양식 기술로 지속가능한 수산업을 실현한 해양 혁신 사례',
    icon: Fish,
    color: 'blue',
    heroImage: '/images/benchmark/44. AI 기반 수산 양식 관리.png',
    companyInfo: {
      industry: '수산 양식',
      employees: '1,850명',
      revenue: '연 매출 1.5조원',
      location: '경상남도 통영시'
    },
    challenges: [
      {
        title: '수질 관리 복잡성',
        description: '적조, 수온 변화 등 환경 변수',
        impact: '대량 폐사 위험'
      },
      {
        title: '질병 관리 어려움',
        description: '수중 질병 조기 발견 한계',
        impact: '폐사율 증가 및 품질 저하'
      },
      {
        title: '사료 효율성',
        description: '과다 급이로 인한 수질 오염',
        impact: '생산 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '스마트 양식 기초',
          duration: '14시간',
          description: 'AI 양식 시스템 이해'
        },
        {
          title: 'n8n 양식장 자동화',
          duration: '12시간',
          description: '수산 자동화 기술'
        }
      ],
      advanced: [
        {
          title: 'AI 수질 관리',
          duration: '20시간',
          description: '수질 예측 및 제어'
        },
        {
          title: '어류 건강 진단',
          duration: '18시간',
          description: 'AI 영상 건강 분석'
        }
      ],
      executive: [
        {
          title: '지속가능 수산업',
          duration: '6시간',
          description: '블루이코노미 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 수질 관리 시스템',
        duration: '10주',
        activities: [
          'IoT 수질 센서 설치',
          'AI 수질 예측 모델',
          '자동 수질 조절',
          '적조 조기 경보'
        ],
        results: [
          '수질 안정성 98%',
          '적조 피해 Zero',
          '용존산소 최적 유지'
        ]
      },
      {
        phase: 'AI 건강 모니터링',
        duration: '8주',
        activities: [
          '수중 카메라 네트워크',
          'AI 행동 패턴 분석',
          '질병 조기 진단',
          '자동 약품 투여'
        ],
        results: [
          '질병 조기 발견 92%',
          '생존율 95% 달성',
          '항생제 사용 70% 감소'
        ]
      },
      {
        phase: '스마트 급이 시스템',
        duration: '6주',
        activities: [
          'AI 성장 예측',
          '자동 급이 조절',
          '사료 효율 최적화',
          '잔사료 모니터링'
        ],
        results: [
          '사료효율 38% 개선',
          '성장 기간 25% 단축',
          '수질 오염 60% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '생존율',
          before: '72%',
          after: '95%',
          improvement: '31.9% 향상'
        },
        {
          metric: '연간 생산량',
          before: '3,200톤',
          after: '5,376톤',
          improvement: '68% 증가'
        },
        {
          metric: '사료전환율',
          before: '1.8',
          after: '1.12',
          improvement: '38% 개선'
        },
        {
          metric: '양식 기간',
          before: '18개월',
          after: '13.5개월',
          improvement: '25% 단축'
        }
      ],
      financial: [
        {
          item: '생산 증대 수익',
          amount: '연 485억원'
        },
        {
          item: '사료비 절감',
          amount: '연 125억원'
        },
        {
          item: '인건비 절감',
          amount: '연 65억원'
        }
      ],
      qualitative: [
        'ASC 국제인증 획득',
        '친환경 수산물 인증',
        '수출 경쟁력 강화'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 수질 제어',
          description: '24시간 수질 자동 관리',
          efficiency: '안정성 98%'
        },
        {
          name: '어류 건강 진단',
          description: 'AI 영상 분석 진단',
          efficiency: '조기 발견 92%'
        },
        {
          name: '스마트 급이',
          description: 'AI 기반 자동 급이',
          efficiency: '사료 38% 절감'
        }
      ],
      integrations: [
        'IoT 수질 센서',
        '수중 카메라',
        '기상청 API'
      ]
    },
    testimonials: [
      {
        quote: "AI 덕분에 밤에도 안심하고 잘 수 있습니다. 수질 이상이나 물고기 이상 행동을 즉시 알려주고, 자동으로 대응까지 해주니 폐사가 거의 없어졌습니다.",
        author: "이바다",
        position: "양식장 대표",
        company: "동원수산 통영양식장"
      }
    ],
    featured: false,
    implementationPeriod: '7개월',
    teamSize: '38명',
    technologies: ['Computer Vision', 'n8n', 'IoT', 'Underwater Robotics'],
    downloadableResources: [
      '스마트 양식 가이드',
      'AI 수산업 백서'
    ]
  },

  'forestry-management': {
    id: 'forestry-management',
    category: 'agriculture',
    industry: '농업/수산업',
    subIndustry: '임업',
    companyName: '한국산림조합 (직원 1,200명)',
    companySize: '공기업',
    title: 'AI 산림 통합 관리 시스템',
    subtitle: '산불 예방 92%, 병해충 피해 75% 감소',
    description: 'AI와 n8n을 활용한 스마트 산림 관리로 산림 자원을 보호하고 탄소흡수원을 확대한 그린 혁신 사례',
    icon: TreePine,
    color: 'green',
    heroImage: '/images/benchmark/45. AI 기반 산림 자원 관리.png',
    companyInfo: {
      industry: '산림 관리',
      employees: '1,200명',
      revenue: '연 예산 8,500억원',
      location: '대전시 서구'
    },
    challenges: [
      {
        title: '산불 위험 관리',
        description: '광범위한 산림의 산불 감시 한계',
        impact: '대형 산불 피해 발생'
      },
      {
        title: '병해충 확산',
        description: '소나무재선충 등 병해충 방제 어려움',
        impact: '산림 황폐화'
      },
      {
        title: '불법 벌채 단속',
        description: '광활한 산림 감시 인력 부족',
        impact: '산림 자원 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '스마트 산림 기초',
          duration: '12시간',
          description: 'AI 산림 관리 이해'
        },
        {
          title: 'n8n 산림 자동화',
          duration: '10시간',
          description: '산림 모니터링 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 산불 예측',
          duration: '18시간',
          description: '산불 위험도 예측 모델'
        },
        {
          title: '드론 산림 조사',
          duration: '16시간',
          description: 'AI 드론 활용 기술'
        }
      ],
      executive: [
        {
          title: '산림 경영 혁신',
          duration: '6시간',
          description: '탄소중립 산림 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 산불 감시 시스템',
        duration: '12주',
        activities: [
          'IoT 연기 감지 센서',
          'AI 위성 영상 분석',
          '산불 위험도 예측',
          '자동 경보 시스템'
        ],
        results: [
          '조기 감지율 98%',
          '산불 피해 92% 감소',
          '대응 시간 85% 단축'
        ]
      },
      {
        phase: '병해충 AI 방제',
        duration: '10주',
        activities: [
          '드론 정밀 조사',
          'AI 병해충 식별',
          '확산 예측 모델',
          '드론 정밀 방제'
        ],
        results: [
          '조기 발견율 95%',
          '피해 면적 75% 감소',
          '방제 비용 60% 절감'
        ]
      },
      {
        phase: '산림 자원 관리',
        duration: '8주',
        activities: [
          'LiDAR 산림 조사',
          'AI 수목 생장 예측',
          '탄소 흡수량 산정',
          '불법 벌채 감지'
        ],
        results: [
          '산림 자원 정확도 97%',
          '탄소 흡수 25% 증가',
          '불법 벌채 88% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '산불 피해 면적',
          before: '연 850ha',
          after: '연 68ha',
          improvement: '92% 감소'
        },
        {
          metric: '병해충 피해',
          before: '연 12,000ha',
          after: '연 3,000ha',
          improvement: '75% 감소'
        },
        {
          metric: '탄소 흡수량',
          before: '연 450만톤',
          after: '연 562만톤',
          improvement: '25% 증가'
        },
        {
          metric: '산림 관리 비용',
          before: '연 850억원',
          after: '연 510억원',
          improvement: '40% 절감'
        }
      ],
      financial: [
        {
          item: '산불 피해 절감',
          amount: '연 320억원'
        },
        {
          item: '병해충 방제비 절감',
          amount: '연 185억원'
        },
        {
          item: '탄소 크레딧 수익',
          amount: '연 125억원'
        }
      ],
      qualitative: [
        '산림 생태계 복원',
        'UNESCO 산림 관리 인증',
        '산촌 일자리 창출'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 산불 예측',
          description: '실시간 산불 위험도 분석',
          efficiency: '예방율 92%'
        },
        {
          name: '드론 병해충 방제',
          description: 'AI 진단 정밀 방제',
          efficiency: '피해 75% 감소'
        },
        {
          name: '산림 자원 모니터링',
          description: 'LiDAR/AI 산림 조사',
          efficiency: '정확도 97%'
        }
      ],
      integrations: [
        '기상청 시스템',
        '위성 영상 플랫폼',
        'IoT 센서 네트워크'
      ]
    },
    testimonials: [
      {
        quote: "AI가 산불 위험을 미리 알려주고, 드론이 병해충을 찾아내니 산림 관리가 혁명적으로 바뀌었습니다. 우리 산림이 더욱 푸르고 건강해지고 있습니다.",
        author: "박숲",
        position: "산림관리소장",
        company: "강원도 산림관리소"
      }
    ],
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '45명',
    technologies: ['AI/ML', 'n8n', 'Drone', 'LiDAR', 'Satellite', 'IoT'],
    downloadableResources: [
      '스마트 산림 관리 가이드',
      'AI 산림 보호 백서'
    ]
  }
};

// 농업/수산업 업종 요약 리스트
export const agricultureFisheryCases: SuccessCase[] = [
  {
    id: 'smart-farm-automation',
    category: 'agriculture',
    industry: '농업/수산업',
    companyName: '팜에이트',
    title: 'AI 완전 자율 스마트팜 운영 시스템',
    description: '생산량 285% 증가, 인건비 78% 절감',
    metrics: {
      production: '+285%',
      labor: '-78%',
      energy: '-38%',
      water: '-90%'
    },
    tags: ['스마트팜', '수직농장', 'AI재배', '무농약'],
    icon: Sprout,
    color: 'green',
    featured: true
  },
  {
    id: 'traditional-farming',
    category: 'agriculture',
    industry: '농업/수산업',
    companyName: '한국농업협동조합',
    title: 'AI 기반 전통농업 디지털 전환',
    description: '수확량 42% 증가, 유통 손실 65% 감소',
    metrics: {
      yield: '+42%',
      loss: '-65%',
      income: '+35%',
      cost: '-30%'
    },
    tags: ['정밀농업', '드론방제', '스마트유통', 'AgTech'],
    icon: Wheat,
    color: 'yellow',
    featured: false
  },
  {
    id: 'livestock-farming',
    category: 'agriculture',
    industry: '농업/수산업',
    companyName: '하림',
    title: 'AI 축산 통합 관리 플랫폼',
    description: '폐사율 78% 감소, 사료효율 32% 개선',
    metrics: {
      mortality: '-78%',
      fcr: '+32%',
      growth: '-15%',
      antibiotics: '-65%'
    },
    tags: ['스마트축산', '동물복지', 'AI건강관리', '무항생제'],
    icon: Beef,
    color: 'red',
    featured: true
  },
  {
    id: 'aquaculture-management',
    category: 'agriculture',
    industry: '농업/수산업',
    companyName: '동원수산',
    title: 'AI 스마트 양식장 운영 시스템',
    description: '생존율 95% 달성, 생산량 68% 증가',
    metrics: {
      survival: '95%',
      production: '+68%',
      fcr: '+38%',
      period: '-25%'
    },
    tags: ['스마트양식', '수질관리', 'AI급이', 'ASC인증'],
    icon: Fish,
    color: 'blue',
    featured: false
  },
  {
    id: 'forestry-management',
    category: 'agriculture',
    industry: '농업/수산업',
    companyName: '한국산림조합',
    title: 'AI 산림 통합 관리 시스템',
    description: '산불 예방 92%, 병해충 피해 75% 감소',
    metrics: {
      fire: '-92%',
      pest: '-75%',
      carbon: '+25%',
      cost: '-40%'
    },
    tags: ['산림보호', '산불예방', '드론조사', '탄소흡수'],
    icon: TreePine,
    color: 'green',
    featured: false
  }
];

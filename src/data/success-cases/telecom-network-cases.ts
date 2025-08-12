'use client';

import { 
  Wifi, 
  Signal, 
  Globe, 
  Cloud,
  Router,
  Shield,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Users,
  Zap,
  Network,
  Radio,
  Server,
  Lock,
  Phone,
  MessageSquare
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 통신/네트워크 업종 성공사례 데이터
export const telecomNetworkCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'telecom-5g-optimization': {
    id: 'telecom-5g-optimization',
    category: 'telecom',
    industry: '통신/네트워크',
    subIndustry: '이동통신',
    companyName: 'SK텔레콤 (직원 5,200명)',
    companySize: '대기업',
    title: 'AI 기반 5G 네트워크 자율 최적화',
    subtitle: '네트워크 효율 65% 향상, 운영 비용 42% 절감',
    description: 'AI와 n8n을 활용한 5G 네트워크 완전 자동화로 초연결 시대를 선도하는 통신 혁신 사례',
    icon: Signal,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '이동통신 서비스',
      employees: '5,200명',
      revenue: '연 매출 17.8조원',
      location: '서울시 중구'
    },
    challenges: [
      {
        title: '네트워크 복잡성 증가',
        description: '5G 도입으로 기지국과 주파수 관리 복잡도 급증',
        impact: '네트워크 품질 저하 및 운영 비용 증가'
      },
      {
        title: '실시간 트래픽 관리',
        description: '폭증하는 데이터 트래픽의 동적 관리 한계',
        impact: '서비스 품질 불안정 및 고객 불만'
      },
      {
        title: '에너지 비용 급증',
        description: '5G 기지국의 높은 전력 소비',
        impact: '운영 비용 증가 및 탄소 배출 문제'
      },
      {
        title: '장애 대응 지연',
        description: '수동 모니터링으로 인한 장애 감지 지연',
        impact: '서비스 중단 시간 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '5G 네트워크 AI 기초',
          duration: '16시간',
          description: '통신 네트워크 AI 활용 이해'
        },
        {
          title: 'n8n 네트워크 자동화',
          duration: '14시간',
          description: '네트워크 운영 프로세스 자동화'
        },
        {
          title: 'SON 기술 이해',
          duration: '12시간',
          description: '자가구성 네트워크 기초'
        }
      ],
      advanced: [
        {
          title: 'AI 트래픽 예측',
          duration: '24시간',
          description: '머신러닝 기반 트래픽 관리'
        },
        {
          title: '네트워크 슬라이싱',
          duration: '20시간',
          description: 'AI 기반 동적 자원 할당'
        },
        {
          title: '장애 예측 시스템',
          duration: '18시간',
          description: 'AI 기반 proactive 유지보수'
        }
      ],
      executive: [
        {
          title: '6G 전략 수립',
          duration: '8시간',
          description: '차세대 통신 비즈니스 전략'
        },
        {
          title: 'AI Native 네트워크',
          duration: '6시간',
          description: 'AI 중심 통신 인프라 혁신'
        }
      ]
    },
    process: [
      {
        phase: 'AI 네트워크 최적화',
        duration: '12주',
        activities: [
          'SON(Self-Organizing Network) 구축',
          'AI 파라미터 최적화',
          '자동 셀 플래닝',
          '간섭 자동 제어'
        ],
        results: [
          '네트워크 용량 65% 증가',
          '커버리지 홀 95% 해소',
          '주파수 효율 45% 향상'
        ]
      },
      {
        phase: '트래픽 관리 자동화',
        duration: '10주',
        activities: [
          'AI 트래픽 예측 모델',
          '동적 자원 할당',
          '네트워크 슬라이싱',
          'QoS 자동 보장'
        ],
        results: [
          '트래픽 처리량 3배 증가',
          '지연시간 75% 감소',
          '서비스 품질 99.99%'
        ]
      },
      {
        phase: '에너지 효율화',
        duration: '8주',
        activities: [
          'AI 절전 모드 관리',
          '기지국 자동 온/오프',
          '빔포밍 최적화',
          '재생에너지 연동'
        ],
        results: [
          '에너지 소비 38% 절감',
          '탄소 배출 45% 감소',
          '운영비 42% 절감'
        ]
      },
      {
        phase: '장애 예측 시스템',
        duration: '6주',
        activities: [
          'AI 이상 탐지',
          '장애 패턴 학습',
          '자동 복구 시스템',
          '예방 정비 자동화'
        ],
        results: [
          '장애 예측 정확도 92%',
          '다운타임 87% 감소',
          'MTTR 65% 단축'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '네트워크 효율',
          before: '100%',
          after: '165%',
          improvement: '65% 향상'
        },
        {
          metric: '운영 비용',
          before: '연 2,850억원',
          after: '연 1,653억원',
          improvement: '42% 절감'
        },
        {
          metric: '서비스 가용성',
          before: '99.5%',
          after: '99.99%',
          improvement: '0.49%p 향상'
        },
        {
          metric: '평균 다운로드 속도',
          before: '280Mbps',
          after: '850Mbps',
          improvement: '203% 향상'
        },
        {
          metric: '에너지 효율(bit/Joule)',
          before: '100',
          after: '385',
          improvement: '285% 향상'
        },
        {
          metric: '고객 만족도(NPS)',
          before: '32',
          after: '68',
          improvement: '112.5% 향상'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 1,197억원'
        },
        {
          item: '에너지 비용 절감',
          amount: '연 450억원'
        },
        {
          item: '추가 서비스 수익',
          amount: '연 2,800억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 520%'
        }
      ],
      qualitative: [
        '세계 최초 AI 자율 5G 네트워크 구현',
        'GSMA 글로벌 혁신상 수상',
        '탄소중립 통신망 인증 획득',
        'B2B 전용 네트워크 슬라이스 상용화',
        '6G 표준화 선도 기업 인정'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI SON 최적화',
          description: '셀 파라미터 자동 최적화',
          efficiency: '네트워크 용량 65% 증가'
        },
        {
          name: '트래픽 예측 관리',
          description: 'ML 기반 동적 자원 할당',
          efficiency: '처리량 3배 향상'
        },
        {
          name: '에너지 스마트 관리',
          description: 'AI 기반 절전 모드 제어',
          efficiency: '에너지 38% 절감'
        },
        {
          name: '장애 자동 복구',
          description: 'Self-healing 네트워크',
          efficiency: '다운타임 87% 감소'
        }
      ],
      integrations: [
        'OSS/BSS 시스템',
        'Cloud RAN',
        'Edge Computing',
        'Open RAN'
      ]
    },
    testimonials: [
      {
        quote: "AI가 네트워크를 24시간 자동으로 최적화하니 품질이 획기적으로 개선되었습니다. 특히 대규모 이벤트나 재난 상황에서도 안정적인 통신이 가능해져 고객들의 신뢰가 크게 높아졌습니다. 진정한 자율 네트워크 시대가 열렸습니다.",
        author: "김네트워크",
        position: "네트워크운영센터장",
        company: "SK텔레콤"
      },
      {
        quote: "예전에는 기지국 하나를 최적화하는데 일주일이 걸렸는데, 이제 AI가 수천 개 기지국을 실시간으로 최적화합니다. 에너지도 크게 절약되어 탄소중립 목표 달성이 눈앞에 왔습니다.",
        author: "박5G",
        position: "기술전략본부장",
        company: "SK텔레콤"
      }
    ],
    featured: true,
    implementationPeriod: '10개월',
    teamSize: '125명',
    technologies: ['AI/ML', 'n8n', 'SON', 'Network Slicing', 'Open RAN', 'Edge AI'],
    downloadableResources: [
      'AI 네트워크 자동화 가이드북',
      '5G 최적화 백서',
      '자율 네트워크 운영 매뉴얼'
    ]
  },

  'network-security': {
    id: 'network-security',
    category: 'telecom',
    industry: '통신/네트워크',
    subIndustry: '네트워크 보안',
    companyName: '안랩 (직원 850명)',
    companySize: '중견기업',
    title: 'AI 기반 제로트러스트 보안 플랫폼',
    subtitle: '보안 위협 차단 99.8%, 대응 시간 95% 단축',
    description: 'AI와 n8n을 활용한 지능형 보안 위협 대응으로 완벽한 네트워크 보안을 실현한 사이버 방어 혁신 사례',
    icon: Shield,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '네트워크 보안',
      employees: '850명',
      revenue: '연 매출 2,100억원',
      location: '경기도 성남시'
    },
    challenges: [
      {
        title: '진화하는 사이버 위협',
        description: '제로데이 공격 등 신종 위협 급증',
        impact: '기존 시그니처 기반 탐지 한계'
      },
      {
        title: '대량 보안 이벤트',
        description: '일 수십억 건 보안 로그 분석 부담',
        impact: '중요 위협 놓침 및 대응 지연'
      },
      {
        title: '내부자 위협',
        description: '정상 행위로 위장한 내부 위협',
        impact: '데이터 유출 및 시스템 침해'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 보안 기초',
          duration: '14시간',
          description: '사이버 보안 AI 활용'
        },
        {
          title: 'n8n 보안 자동화',
          duration: '12시간',
          description: '보안 운영 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 위협 탐지',
          duration: '20시간',
          description: '머신러닝 이상 탐지'
        },
        {
          title: 'SOAR 구축',
          duration: '18시간',
          description: '보안 오케스트레이션'
        }
      ],
      executive: [
        {
          title: '제로트러스트 전략',
          duration: '6시간',
          description: 'AI 기반 보안 아키텍처'
        }
      ]
    },
    process: [
      {
        phase: 'AI 위협 탐지 시스템',
        duration: '10주',
        activities: [
          'UEBA 시스템 구축',
          'AI 이상행위 탐지',
          '위협 인텔리전스 통합',
          '자동 위협 분류'
        ],
        results: [
          '위협 탐지율 99.8%',
          '오탐율 0.01% 미만',
          '제로데이 공격 차단'
        ]
      },
      {
        phase: 'SOAR 플랫폼 구축',
        duration: '8주',
        activities: [
          '보안 플레이북 자동화',
          'AI 대응 의사결정',
          '자동 격리/차단',
          '포렌식 자동화'
        ],
        results: [
          '대응 시간 95% 단축',
          '수동 작업 88% 감소',
          'MTTD 5분 이내'
        ]
      },
      {
        phase: '제로트러스트 구현',
        duration: '12주',
        activities: [
          'AI 신원 검증',
          '동적 접근 제어',
          '마이크로 세그멘테이션',
          '지속적 모니터링'
        ],
        results: [
          '내부 위협 92% 차단',
          '권한 침해 Zero',
          '컴플라이언스 100%'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '위협 차단률',
          before: '85%',
          after: '99.8%',
          improvement: '17.4% 향상'
        },
        {
          metric: '평균 탐지 시간(MTTD)',
          before: '4.5시간',
          after: '5분',
          improvement: '98.1% 단축'
        },
        {
          metric: '평균 대응 시간(MTTR)',
          before: '48시간',
          after: '2.4시간',
          improvement: '95% 단축'
        },
        {
          metric: '보안 운영 인력',
          before: '50명',
          after: '12명',
          improvement: '76% 효율화'
        }
      ],
      financial: [
        {
          item: '침해 사고 예방',
          amount: '연 850억원'
        },
        {
          item: '운영 비용 절감',
          amount: '연 120억원'
        },
        {
          item: '컴플라이언스 비용 절감',
          amount: '연 65억원'
        }
      ],
      qualitative: [
        '국내 최초 AI 제로트러스트 구현',
        'SOC2 Type II 인증 획득',
        '정부 사이버보안 대상 수상'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 위협 헌팅',
          description: 'Proactive 위협 탐지',
          efficiency: '탐지율 99.8%'
        },
        {
          name: 'SOAR 자동 대응',
          description: '보안 사고 자동 처리',
          efficiency: '대응 시간 95% 단축'
        },
        {
          name: '제로트러스트 검증',
          description: '지속적 신원/권한 검증',
          efficiency: '침해 92% 차단'
        }
      ],
      integrations: [
        'SIEM 플랫폼',
        'Threat Intelligence',
        'EDR/XDR 솔루션'
      ]
    },
    testimonials: [
      {
        quote: "AI가 수십억 건의 로그를 실시간으로 분석하고 위협을 즉시 차단합니다. 보안 팀이 더 이상 단순 모니터링이 아닌 전략적 보안 강화에 집중할 수 있게 되었습니다.",
        author: "이보안",
        position: "CISO",
        company: "안랩"
      }
    ],
    featured: true,
    implementationPeriod: '8개월',
    teamSize: '35명',
    technologies: ['AI/ML', 'n8n', 'SOAR', 'UEBA', 'Zero Trust'],
    downloadableResources: [
      'AI 보안 운영 가이드',
      '제로트러스트 구축 백서'
    ]
  },

  'cloud-network': {
    id: 'cloud-network',
    category: 'telecom',
    industry: '통신/네트워크',
    subIndustry: '클라우드 네트워크',
    companyName: '네이버 클라우드 플랫폼 (직원 1,500명)',
    companySize: '대기업',
    title: 'AI 기반 하이브리드 클라우드 최적화',
    subtitle: '성능 85% 향상, 비용 48% 절감',
    description: 'AI와 n8n으로 멀티클라우드 환경을 지능적으로 관리하여 최적의 성능과 비용 효율을 달성한 클라우드 혁신 사례',
    icon: Cloud,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '클라우드 서비스',
      employees: '1,500명',
      revenue: '연 매출 5,200억원',
      location: '경기도 성남시'
    },
    challenges: [
      {
        title: '멀티클라우드 복잡성',
        description: '여러 클라우드 환경의 통합 관리 어려움',
        impact: '운영 효율성 저하 및 비용 증가'
      },
      {
        title: '워크로드 최적화',
        description: '동적 워크로드에 대한 자원 할당 비효율',
        impact: '성능 저하 및 비용 낭비'
      },
      {
        title: '네트워크 지연',
        description: '클라우드 간 데이터 전송 지연',
        impact: '서비스 품질 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '클라우드 AI 기초',
          duration: '14시간',
          description: '클라우드 최적화 AI 활용'
        },
        {
          title: 'n8n 클라우드 자동화',
          duration: '12시간',
          description: '클라우드 운영 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 워크로드 관리',
          duration: '20시간',
          description: '지능형 자원 할당'
        },
        {
          title: 'FinOps 최적화',
          duration: '16시간',
          description: 'AI 기반 비용 최적화'
        }
      ],
      executive: [
        {
          title: '클라우드 전략',
          duration: '6시간',
          description: 'AI-First 클라우드 전환'
        }
      ]
    },
    process: [
      {
        phase: 'AI 워크로드 최적화',
        duration: '10주',
        activities: [
          'AI 부하 예측 모델',
          '자동 스케일링',
          '컨테이너 오케스트레이션',
          '서버리스 최적화'
        ],
        results: [
          '응답 시간 75% 단축',
          '자원 활용률 92%',
          '성능 85% 향상'
        ]
      },
      {
        phase: 'FinOps 자동화',
        duration: '8주',
        activities: [
          'AI 비용 분석',
          '예약 인스턴스 최적화',
          '스팟 인스턴스 활용',
          '자동 비용 할당'
        ],
        results: [
          '클라우드 비용 48% 절감',
          'ROI 320% 달성',
          '비용 예측 정확도 95%'
        ]
      },
      {
        phase: '네트워크 최적화',
        duration: '6주',
        activities: [
          'SD-WAN 구축',
          'AI 라우팅 최적화',
          'CDN 자동 배포',
          '엣지 컴퓨팅 활용'
        ],
        results: [
          '네트워크 지연 65% 감소',
          '대역폭 효율 3배',
          '가용성 99.99%'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '애플리케이션 성능',
          before: '100%',
          after: '185%',
          improvement: '85% 향상'
        },
        {
          metric: '클라우드 비용',
          before: '월 8.5억원',
          after: '월 4.42억원',
          improvement: '48% 절감'
        },
        {
          metric: '배포 시간',
          before: '평균 4시간',
          after: '평균 12분',
          improvement: '95% 단축'
        },
        {
          metric: '장애 복구 시간',
          before: '평균 2시간',
          after: '평균 5분',
          improvement: '95.8% 단축'
        }
      ],
      financial: [
        {
          item: '인프라 비용 절감',
          amount: '연 489억원'
        },
        {
          item: '운영 인력 절감',
          amount: '연 85억원'
        },
        {
          item: '다운타임 비용 절감',
          amount: '연 125억원'
        }
      ],
      qualitative: [
        '국내 최초 AI 기반 멀티클라우드 관리',
        'ISO 27017 클라우드 보안 인증',
        '탄소중립 데이터센터 인증'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 오토스케일링',
          description: '예측 기반 자동 확장/축소',
          efficiency: '자원 효율 92%'
        },
        {
          name: 'FinOps 자동화',
          description: 'AI 비용 최적화',
          efficiency: '비용 48% 절감'
        },
        {
          name: '자동 장애 복구',
          description: 'Self-healing 인프라',
          efficiency: 'RTO 95% 단축'
        }
      ],
      integrations: [
        'Kubernetes',
        'Terraform',
        'Multi-Cloud APIs'
      ]
    },
    testimonials: [
      {
        quote: "AI가 워크로드를 실시간으로 분석하고 최적의 클라우드에 자동 배치합니다. 비용은 절반으로 줄고 성능은 두 배로 늘었습니다.",
        author: "김클라우드",
        position: "클라우드아키텍트",
        company: "네이버 클라우드 플랫폼"
      }
    ],
    featured: false,
    implementationPeriod: '7개월',
    teamSize: '45명',
    technologies: ['AI/ML', 'n8n', 'Kubernetes', 'SD-WAN', 'FinOps'],
    downloadableResources: [
      '하이브리드 클라우드 가이드',
      'FinOps 최적화 백서'
    ]
  },

  'iot-network': {
    id: 'iot-network',
    category: 'telecom',
    industry: '통신/네트워크',
    subIndustry: 'IoT 네트워크',
    companyName: 'LG유플러스 (직원 9,800명)',
    companySize: '대기업',
    title: 'AI 기반 대규모 IoT 플랫폼',
    subtitle: '디바이스 관리 효율 380% 향상, 처리 지연 92% 감소',
    description: 'AI와 n8n을 활용한 수백만 IoT 디바이스의 지능형 관리로 초연결 생태계를 구현한 IoT 혁신 사례',
    icon: Network,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: 'IoT 플랫폼 서비스',
      employees: '9,800명',
      revenue: '연 매출 14.2조원',
      location: '서울시 용산구'
    },
    challenges: [
      {
        title: '대규모 디바이스 관리',
        description: '수백만 IoT 디바이스의 동시 연결 관리',
        impact: '시스템 과부하 및 관리 복잡성'
      },
      {
        title: '실시간 데이터 처리',
        description: '초당 수십만 건의 데이터 스트림 처리',
        impact: '처리 지연 및 데이터 손실'
      },
      {
        title: '이기종 프로토콜',
        description: '다양한 IoT 프로토콜 통합 어려움',
        impact: '호환성 문제 및 개발 지연'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'IoT 플랫폼 기초',
          duration: '14시간',
          description: 'IoT 생태계 이해'
        },
        {
          title: 'n8n IoT 자동화',
          duration: '12시간',
          description: 'IoT 워크플로우 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 엣지 컴퓨팅',
          duration: '20시간',
          description: '엣지 AI 구현'
        },
        {
          title: 'IoT 데이터 분석',
          duration: '18시간',
          description: '실시간 스트림 분석'
        }
      ],
      executive: [
        {
          title: 'IoT 비즈니스',
          duration: '6시간',
          description: 'IoT 생태계 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 디바이스 관리',
        duration: '12주',
        activities: [
          '디바이스 자동 온보딩',
          'AI 이상 탐지',
          '펌웨어 자동 업데이트',
          '수명 주기 관리'
        ],
        results: [
          '500만 디바이스 관리',
          '관리 효율 380% 향상',
          '장애율 95% 감소'
        ]
      },
      {
        phase: '엣지 AI 구축',
        duration: '10주',
        activities: [
          '엣지 노드 배포',
          'AI 모델 경량화',
          '분산 추론 시스템',
          '로컬 의사결정'
        ],
        results: [
          '처리 지연 92% 감소',
          '대역폭 사용 78% 절감',
          '실시간 응답 구현'
        ]
      },
      {
        phase: '데이터 파이프라인',
        duration: '8주',
        activities: [
          '스트림 처리 엔진',
          'AI 데이터 필터링',
          '실시간 분석',
          '예측 유지보수'
        ],
        results: [
          '초당 100만 건 처리',
          '데이터 손실 0.001%',
          '인사이트 도출 시간 85% 단축'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '관리 디바이스 수',
          before: '50만 대',
          after: '500만 대',
          improvement: '900% 증가'
        },
        {
          metric: '평균 처리 지연',
          before: '250ms',
          after: '20ms',
          improvement: '92% 감소'
        },
        {
          metric: '운영 효율성',
          before: '100%',
          after: '380%',
          improvement: '280% 향상'
        },
        {
          metric: '시스템 가용성',
          before: '99.5%',
          after: '99.99%',
          improvement: '0.49%p 향상'
        }
      ],
      financial: [
        {
          item: '운영 비용 절감',
          amount: '연 285억원'
        },
        {
          item: 'IoT 서비스 수익',
          amount: '연 1,850억원'
        },
        {
          item: 'ROI',
          amount: '18개월 내 회수'
        }
      ],
      qualitative: [
        '아시아 최대 IoT 플랫폼',
        '스마트시티 핵심 인프라',
        'IoT 국제 표준 주도'
      ]
    },
    automationMetrics: {
      workflows: [
        {
          name: 'AI 디바이스 온보딩',
          description: '자동 등록 및 설정',
          efficiency: '온보딩 시간 95% 단축'
        },
        {
          name: '엣지 AI 처리',
          description: '로컬 실시간 분석',
          efficiency: '지연 92% 감소'
        },
        {
          name: '예측 유지보수',
          description: 'AI 기반 장애 예측',
          efficiency: '장애 95% 예방'
        }
      ],
      integrations: [
        'MQTT/CoAP',
        'Edge Computing',
        'Time Series DB'
      ]
    },
    testimonials: [
      {
        quote: "AI가 수백만 개의 IoT 디바이스를 자동으로 관리하고 최적화합니다. 엣지 AI로 실시간 처리가 가능해져 스마트시티와 스마트팩토리 구현이 현실이 되었습니다.",
        author: "박IoT",
        position: "IoT사업본부장",
        company: "LG유플러스"
      }
    ],
    featured: false,
    implementationPeriod: '9개월',
    teamSize: '85명',
    technologies: ['AI/ML', 'n8n', 'Edge Computing', 'MQTT', 'Kubernetes'],
    downloadableResources: [
      'IoT 플랫폼 구축 가이드',
      '엣지 AI 백서'
    ]
  }
};

// 통신/네트워크 업종 요약 리스트
export const telecomNetworkCases: SuccessCase[] = [
  {
    id: 'telecom-5g-optimization',
    category: 'telecom',
    industry: '통신/네트워크',
    companyName: 'SK텔레콤',
    title: 'AI 기반 5G 네트워크 자율 최적화',
    description: '네트워크 효율 65% 향상, 운영 비용 42% 절감',
    metrics: {
      efficiency: '+65%',
      cost: '-42%',
      availability: '99.99%',
      speed: '+203%'
    },
    tags: ['5G', 'SON', '네트워크슬라이싱', '자율네트워크'],
    icon: Signal,
    color: 'red',
    featured: true
  },
  {
    id: 'network-security',
    category: 'telecom',
    industry: '통신/네트워크',
    companyName: '안랩',
    title: 'AI 기반 제로트러스트 보안 플랫폼',
    description: '보안 위협 차단 99.8%, 대응 시간 95% 단축',
    metrics: {
      detection: '99.8%',
      response: '-95%',
      mttd: '-98.1%',
      efficiency: '+76%'
    },
    tags: ['제로트러스트', 'SOAR', 'AI보안', '위협헌팅'],
    icon: Shield,
    color: 'blue',
    featured: true
  },
  {
    id: 'cloud-network',
    category: 'telecom',
    industry: '통신/네트워크',
    companyName: '네이버 클라우드 플랫폼',
    title: 'AI 기반 하이브리드 클라우드 최적화',
    description: '성능 85% 향상, 비용 48% 절감',
    metrics: {
      performance: '+85%',
      cost: '-48%',
      deployment: '-95%',
      recovery: '-95.8%'
    },
    tags: ['멀티클라우드', 'FinOps', '오토스케일링', 'SD-WAN'],
    icon: Cloud,
    color: 'green',
    featured: false
  },
  {
    id: 'iot-network',
    category: 'telecom',
    industry: '통신/네트워크',
    companyName: 'LG유플러스',
    title: 'AI 기반 대규모 IoT 플랫폼',
    description: '디바이스 관리 효율 380% 향상, 처리 지연 92% 감소',
    metrics: {
      devices: '+900%',
      latency: '-92%',
      efficiency: '+380%',
      availability: '99.99%'
    },
    tags: ['IoT플랫폼', '엣지AI', '스마트시티', '실시간처리'],
    icon: Network,
    color: 'purple',
    featured: false
  }
];

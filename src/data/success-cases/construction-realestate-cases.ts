'use client';

import { 
  Building2, 
  HardHat, 
  Home, 
  Wrench, 
  Map, 
  Building, 
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  Shield,
  BarChart3,
  Zap,
  Users
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 건설/부동산 업종 성공사례 데이터
export const constructionRealEstateCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'general-construction-smart': {
    id: 'general-construction-smart',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '종합건설업',
    companyName: '대림산업 (직원 8,500명)',
    companySize: '대기업',
    title: 'AI 기반 스마트 건설 현장 혁신',
    subtitle: '공기 단축 35%, 안전사고 78% 감소',
    description: 'AI와 n8n을 활용한 건설 현장 전반의 디지털 전환으로 생산성과 안전성을 획기적으로 개선한 혁신 사례',
    icon: Building2,
    color: 'gray',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
    companyInfo: {
      industry: '종합건설업',
      employees: '8,500명',
      revenue: '연 매출 12조원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '공정 관리 복잡성',
        description: '다수 협력업체와 복잡한 공정으로 일정 지연 빈발',
        impact: '프로젝트 지연으로 인한 패널티 및 수익성 악화'
      },
      {
        title: '안전 사고 위험',
        description: '건설 현장의 높은 안전 사고 발생률',
        impact: '인명 피해 및 프로젝트 중단 위험'
      },
      {
        title: '자재 관리 비효율',
        description: '자재 발주 및 재고 관리 체계 미흡',
        impact: '자재 낭비 및 원가 상승'
      },
      {
        title: '품질 관리 한계',
        description: '수작업 검수로 인한 품질 편차',
        impact: '하자 발생 및 재시공 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '건설 AI 기초',
          duration: '16시간',
          description: '건설 산업에서의 AI 활용 이해'
        },
        {
          title: 'n8n 현장 자동화',
          duration: '12시간',
          description: '건설 프로세스 자동화 기초'
        },
        {
          title: 'BIM과 AI 융합',
          duration: '14시간',
          description: 'BIM 데이터와 AI 활용법'
        }
      ],
      advanced: [
        {
          title: 'AI 공정 관리',
          duration: '24시간',
          description: '머신러닝 기반 공정 최적화'
        },
        {
          title: '컴퓨터 비전 안전관리',
          duration: '20시간',
          description: 'AI 영상 분석 안전 시스템'
        },
        {
          title: '예측 유지보수',
          duration: '18시간',
          description: 'IoT와 AI 기반 장비 관리'
        }
      ],
      executive: [
        {
          title: '스마트 건설 전략',
          duration: '8시간',
          description: '경영진을 위한 디지털 전환 전략'
        },
        {
          title: '건설 혁신 리더십',
          duration: '6시간',
          description: 'AI 시대 건설 경영 혁신'
        }
      ]
    },
    process: [
      {
        phase: '현황 분석 및 설계',
        duration: '6주',
        activities: [
          '전체 건설 프로세스 매핑',
          '현장 데이터 수집 체계 구축',
          'AI 플랫폼 아키텍처 설계',
          '파일럿 현장 선정 (3개)'
        ],
        results: [
          '156개 업무 프로세스 문서화',
          '자동화 가능 영역 89개 도출',
          '통합 관제 시스템 설계'
        ]
      },
      {
        phase: 'AI 시스템 구축',
        duration: '12주',
        activities: [
          'AI 공정 예측 모델 개발',
          '컴퓨터 비전 안전 관리 시스템',
          'IoT 센서 네트워크 구축',
          'BIM 연동 품질 관리 시스템'
        ],
        results: [
          '공정 예측 정확도 92%',
          '실시간 안전 모니터링 구현',
          '자동 품질 검수 시스템 가동'
        ]
      },
      {
        phase: '파일럿 운영',
        duration: '16주',
        activities: [
          '3개 현장 파일럿 적용',
          '현장 관리자 교육 실시',
          '협력업체 시스템 연동',
          '성과 측정 및 개선'
        ],
        results: [
          '공기 25% 단축 확인',
          '안전사고 65% 감소',
          '원가 15% 절감'
        ]
      },
      {
        phase: '전사 확산',
        duration: '20주',
        activities: [
          '전체 현장 단계적 확대',
          '표준 운영 프로세스 수립',
          '성과 관리 체계 구축',
          '지속 혁신 문화 정착'
        ],
        results: [
          '45개 전체 현장 적용',
          '공기 35% 단축 달성',
          '안전사고 78% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '평균 공기',
          before: '24개월',
          after: '15.6개월',
          improvement: '35% 단축'
        },
        {
          metric: '안전사고 발생률',
          before: '연 18건',
          after: '연 4건',
          improvement: '77.8% 감소'
        },
        {
          metric: '원가율',
          before: '85%',
          after: '72%',
          improvement: '15.3% 개선'
        },
        {
          metric: '하자 발생률',
          before: '12%',
          after: '3%',
          improvement: '75% 감소'
        },
        {
          metric: '협력업체 생산성',
          before: '100%',
          after: '145%',
          improvement: '45% 향상'
        },
        {
          metric: '자재 손실률',
          before: '8%',
          after: '2%',
          improvement: '75% 감소'
        }
      ],
      financial: [
        {
          item: '공기 단축 수익',
          amount: '연 850억원'
        },
        {
          item: '원가 절감액',
          amount: '연 1,200억원'
        },
        {
          item: '하자 보수 비용 절감',
          amount: '연 320억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 420%'
        }
      ],
      qualitative: [
        '건설 현장 안전 문화 혁신',
        '협력업체와의 상생 협력 강화',
        '스마트 건설 선도 기업 위상 확립',
        'ESG 경영 평가 A등급 획득',
        '해외 프로젝트 수주 경쟁력 강화'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 공정 관리',
          description: '머신러닝 기반 공정 예측 및 최적화',
          efficiency: '일정 준수율 95%'
        },
        {
          name: '안전 모니터링',
          description: 'CCTV AI 분석으로 위험 상황 감지',
          efficiency: '사고 예방율 85%'
        },
        {
          name: '자재 자동 발주',
          description: 'BIM 연동 자재 소요량 예측 및 발주',
          efficiency: '재고 비용 60% 절감'
        },
        {
          name: '품질 자동 검수',
          description: '드론과 AI 영상 분석 품질 체크',
          efficiency: '검수 시간 80% 단축'
        }
      ],
      integrations: [
        'BIM(Revit) 완벽 연동',
        'ERP 시스템 통합',
        'IoT 센서 네트워크',
        '협력업체 SCM 연계'
      ]
    },
    testimonials: [
      {
        quote: "AI 시스템 도입 후 현장 관리가 획기적으로 개선되었습니다. 특히 안전사고가 크게 줄어들어 작업자들의 만족도가 높아졌고, 공정 예측이 정확해져 프로젝트를 계획대로 완료할 수 있게 되었습니다.",
        author: "김상호",
        position: "현장소장",
        company: "대림산업 판교 현장"
      },
      {
        quote: "스마트 건설 시스템 덕분에 우리 같은 협력업체도 효율적으로 일할 수 있게 되었습니다. 자재 발주와 인력 배치가 체계화되어 생산성이 크게 향상되었습니다.",
        author: "박진수",
        position: "대표이사",
        company: "한국철근 (협력업체)"
      }
    ],
    featured: true,
    implementationPeriod: '12개월',
    teamSize: '85명',
    technologies: ['TensorFlow', 'Computer Vision', 'n8n', 'IoT', 'BIM', 'Drone'],
    downloadableResources: [
      '스마트 건설 도입 가이드북',
      'AI 안전 관리 매뉴얼',
      'BIM-AI 통합 백서'
    ]
  },

  'specialized-construction': {
    id: 'specialized-construction',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '전문건설업',
    companyName: '삼우전기 (직원 450명)',
    companySize: '중견기업',
    title: '전기공사 AI 자동화 혁신',
    subtitle: '시공 정확도 98%, 작업 시간 45% 단축',
    description: 'AI와 n8n을 활용한 전기 설비 공사의 디지털 혁신으로 품질과 효율을 극대화한 사례',
    icon: Wrench,
    color: 'yellow',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
    companyInfo: {
      industry: '전기공사업',
      employees: '450명',
      revenue: '연 매출 2,800억원',
      location: '경기도 성남시'
    },
    challenges: [
      {
        title: '설계 오류 빈발',
        description: '복잡한 전기 설계도의 수작업 검토 한계',
        impact: '재시공 비용 및 공기 지연'
      },
      {
        title: '기술 인력 부족',
        description: '숙련된 전기 기술자 확보 어려움',
        impact: '프로젝트 수주 제한'
      },
      {
        title: '안전 규정 준수',
        description: '복잡한 전기 안전 규정 관리',
        impact: '규정 위반 리스크'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '전기공사 AI 기초',
          duration: '12시간',
          description: '전기 설비 AI 활용법'
        },
        {
          title: 'n8n 시공 자동화',
          duration: '14시간',
          description: '전기공사 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 설계 검증',
          duration: '20시간',
          description: '전기 설계도 자동 검증 시스템'
        },
        {
          title: '스마트 시공 관리',
          duration: '18시간',
          description: 'IoT 기반 시공 품질 관리'
        }
      ],
      executive: [
        {
          title: '전문건설 혁신',
          duration: '6시간',
          description: 'AI 시대 전문건설업 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 설계 검증 시스템',
        duration: '6주',
        activities: [
          'CAD 도면 AI 분석',
          '규정 자동 체크',
          '시공성 검토'
        ],
        results: [
          '설계 오류 95% 사전 감지',
          '검토 시간 70% 단축'
        ]
      },
      {
        phase: 'AR 시공 지원',
        duration: '8주',
        activities: [
          'AR 글래스 도입',
          '실시간 시공 가이드',
          '원격 기술 지원'
        ],
        results: [
          '시공 정확도 98%',
          '초급 기술자 생산성 200%'
        ]
      },
      {
        phase: '품질 관리 자동화',
        duration: '10주',
        activities: [
          'IoT 센서 설치',
          'AI 품질 예측',
          '자동 검수 시스템'
        ],
        results: [
          '하자율 2% 미만',
          '검수 시간 80% 절감'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '시공 정확도',
          before: '88%',
          after: '98%',
          improvement: '11.4% 향상'
        },
        {
          metric: '작업 시간',
          before: '100시간/구간',
          after: '55시간/구간',
          improvement: '45% 단축'
        },
        {
          metric: '재시공률',
          before: '15%',
          after: '2%',
          improvement: '86.7% 감소'
        },
        {
          metric: '기술자 생산성',
          before: '100%',
          after: '180%',
          improvement: '80% 향상'
        }
      ],
      financial: [
        {
          item: '인건비 절감',
          amount: '연 45억원'
        },
        {
          item: '재시공 비용 절감',
          amount: '연 28억원'
        },
        {
          item: '추가 수주 수익',
          amount: '연 85억원'
        }
      ],
      qualitative: [
        '기술 인력 양성 가속화',
        '안전 사고 Zero 달성',
        '고객사 신뢰도 향상'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 도면 분석',
          description: 'CAD 도면 자동 검증 및 오류 감지',
          efficiency: '검토 시간 70% 절감'
        },
        {
          name: 'AR 시공 가이드',
          description: 'AR 글래스로 실시간 작업 지시',
          efficiency: '작업 정확도 98%'
        },
        {
          name: 'IoT 품질 모니터링',
          description: '실시간 전기 품질 측정 및 분석',
          efficiency: '하자 발생 90% 예방'
        }
      ],
      integrations: [
        'AutoCAD 연동',
        'AR 글래스 시스템',
        'IoT 센서 네트워크'
      ]
    },
    testimonials: [
      {
        quote: "AR 글래스를 통해 실시간으로 작업 지시를 받으니 초보자도 전문가 수준의 작업이 가능해졌습니다. 실수가 줄고 작업 속도가 크게 향상되었습니다.",
        author: "이준혁",
        position: "전기기사",
        company: "삼우전기"
      }
    ],
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '25명',
    technologies: ['Computer Vision', 'AR', 'n8n', 'IoT', 'AutoCAD API'],
    downloadableResources: [
      '전문건설 AI 도입 가이드',
      'AR 시공 매뉴얼'
    ]
  },

  'architecture-design': {
    id: 'architecture-design',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '건축설계',
    companyName: '희림종합건축사사무소 (직원 850명)',
    companySize: '중견기업',
    title: 'AI 건축 설계 자동화 플랫폼',
    subtitle: '설계 시간 60% 단축, 디자인 품질 45% 향상',
    description: 'AI 생성 설계와 n8n 자동화로 건축 설계의 창의성과 효율성을 극대화한 혁신 사례',
    icon: Home,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2131&auto=format&fit=crop',
    companyInfo: {
      industry: '건축설계',
      employees: '850명',
      revenue: '연 매출 1,200억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '설계 반복 작업',
        description: '유사한 설계 요소의 반복적 작업',
        impact: '창의적 설계 시간 부족'
      },
      {
        title: '규정 검토 복잡성',
        description: '건축법규 및 인허가 요건 검토',
        impact: '설계 변경 및 지연'
      },
      {
        title: '고객 요구 반영',
        description: '추상적 요구사항의 구체화 어려움',
        impact: '잦은 설계 변경 요청'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 건축 설계 기초',
          duration: '14시간',
          description: 'AI 활용 설계 프로세스'
        },
        {
          title: 'n8n 설계 자동화',
          duration: '12시간',
          description: '설계 워크플로우 자동화'
        }
      ],
      advanced: [
        {
          title: 'Generative Design',
          duration: '24시간',
          description: 'AI 생성 설계 마스터'
        },
        {
          title: 'BIM-AI 통합',
          duration: '20시간',
          description: 'BIM과 AI 융합 설계'
        }
      ],
      executive: [
        {
          title: '설계사무소 혁신',
          duration: '6시간',
          description: 'AI 시대 건축 설계 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 설계 플랫폼 구축',
        duration: '8주',
        activities: [
          'Generative Design 시스템',
          '법규 자동 검토 엔진',
          '3D 시각화 자동화'
        ],
        results: [
          '설계안 자동 생성',
          '법규 검토 자동화'
        ]
      },
      {
        phase: '설계 프로세스 혁신',
        duration: '10주',
        activities: [
          'AI 설계 최적화',
          '고객 요구 분석 AI',
          'VR 설계 검토'
        ],
        results: [
          '설계 시간 60% 단축',
          '고객 만족도 92%'
        ]
      },
      {
        phase: '전사 적용',
        duration: '12주',
        activities: [
          '전체 프로젝트 확대',
          '설계사 역량 강화',
          '품질 관리 체계'
        ],
        results: [
          '프로젝트 수주 45% 증가',
          '설계 품질 대폭 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '설계 소요 시간',
          before: '평균 3개월',
          after: '평균 1.2개월',
          improvement: '60% 단축'
        },
        {
          metric: '설계안 생성 수',
          before: '프로젝트당 3-5개',
          after: '프로젝트당 20-30개',
          improvement: '500% 증가'
        },
        {
          metric: '설계 변경률',
          before: '35%',
          after: '8%',
          improvement: '77% 감소'
        },
        {
          metric: '프로젝트 수주율',
          before: '25%',
          after: '45%',
          improvement: '80% 향상'
        }
      ],
      financial: [
        {
          item: '설계 수익 증가',
          amount: '연 180억원'
        },
        {
          item: '운영비 절감',
          amount: '연 35억원'
        },
        {
          item: 'ROI',
          amount: '14개월 내 회수'
        }
      ],
      qualitative: [
        '창의적 설계 시간 확보',
        '국제 설계 공모 수상',
        '친환경 설계 역량 강화'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 설계 생성',
          description: 'Generative Design으로 다양한 설계안 자동 생성',
          efficiency: '설계 시간 60% 절감'
        },
        {
          name: '법규 자동 검토',
          description: 'AI 기반 건축법규 준수 검증',
          efficiency: '검토 시간 85% 단축'
        },
        {
          name: 'VR 설계 프레젠테이션',
          description: 'VR로 실감나는 설계안 체험',
          efficiency: '계약 성사율 80% 향상'
        }
      ],
      integrations: [
        'Revit/ArchiCAD',
        'Rhino/Grasshopper',
        'Unreal Engine'
      ]
    },
    testimonials: [
      {
        quote: "AI가 수십 개의 설계안을 순식간에 만들어내니 창의적인 디자인에 더 집중할 수 있게 되었습니다. 고객들도 다양한 옵션을 보고 매우 만족해합니다.",
        author: "김현주",
        position: "수석 건축사",
        company: "희림종합건축사사무소"
      }
    ],
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '35명',
    technologies: ['Generative AI', 'n8n', 'VR', 'Dynamo', 'Machine Learning'],
    downloadableResources: [
      'AI 건축 설계 가이드',
      'Generative Design 매뉴얼'
    ]
  },

  'civil-infrastructure': {
    id: 'civil-infrastructure',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '토목/인프라',
    companyName: 'GS건설 인프라부문 (직원 3,200명)',
    companySize: '대기업',
    title: '스마트 인프라 건설 혁신',
    subtitle: '시공 효율 42% 향상, 유지보수 비용 55% 절감',
    description: 'AI와 n8n을 활용한 도로, 교량 등 인프라 건설의 스마트화로 효율성을 극대화한 사례',
    icon: Map,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop',
    companyInfo: {
      industry: '토목/인프라',
      employees: '3,200명',
      revenue: '연 매출 4.5조원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '지형 분석 복잡성',
        description: '대규모 지형 데이터 분석의 어려움',
        impact: '최적 노선 선정 지연'
      },
      {
        title: '장비 운영 효율',
        description: '중장비 운영 최적화 부족',
        impact: '장비 가동률 저하 및 비용 증가'
      },
      {
        title: '유지보수 예측',
        description: '인프라 노후화 예측 어려움',
        impact: '긴급 보수 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '인프라 AI 기초',
          duration: '14시간',
          description: '토목 분야 AI 활용법'
        },
        {
          title: 'n8n 시공 관리',
          duration: '12시간',
          description: '인프라 프로젝트 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 지형 분석',
          duration: '24시간',
          description: 'GIS와 AI 융합 분석'
        },
        {
          title: '예측 유지보수',
          duration: '20시간',
          description: 'IoT 기반 인프라 관리'
        }
      ],
      executive: [
        {
          title: '인프라 혁신 전략',
          duration: '8시간',
          description: '스마트 인프라 경영'
        }
      ]
    },
    process: [
      {
        phase: 'AI 지형 분석 시스템',
        duration: '8주',
        activities: [
          '위성 영상 AI 분석',
          '최적 노선 자동 설계',
          '환경 영향 평가'
        ],
        results: [
          '설계 시간 50% 단축',
          '공사비 15% 절감'
        ]
      },
      {
        phase: '스마트 시공 관리',
        duration: '12주',
        activities: [
          'GPS 장비 관제',
          'AI 작업 최적화',
          '드론 진도 관리'
        ],
        results: [
          '장비 효율 35% 향상',
          '공기 30% 단축'
        ]
      },
      {
        phase: 'IoT 유지보수',
        duration: '10주',
        activities: [
          'IoT 센서 설치',
          'AI 수명 예측',
          '예방 정비 체계'
        ],
        results: [
          '유지보수 비용 55% 절감',
          '인프라 수명 30% 연장'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '시공 효율',
          before: '100%',
          after: '142%',
          improvement: '42% 향상'
        },
        {
          metric: '설계 기간',
          before: '6개월',
          after: '3개월',
          improvement: '50% 단축'
        },
        {
          metric: '장비 가동률',
          before: '65%',
          after: '88%',
          improvement: '35.4% 향상'
        },
        {
          metric: '유지보수 비용',
          before: '연 450억원',
          after: '연 202억원',
          improvement: '55% 절감'
        }
      ],
      financial: [
        {
          item: '공사비 절감',
          amount: '프로젝트당 150억원'
        },
        {
          item: '유지보수 절감',
          amount: '연 248억원'
        },
        {
          item: 'ROI',
          amount: '18개월 내 회수'
        }
      ],
      qualitative: [
        '친환경 시공 실현',
        '인프라 안전성 향상',
        '스마트시티 기반 구축'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 노선 설계',
          description: '지형 분석 기반 최적 노선 자동 생성',
          efficiency: '설계 시간 50% 절감'
        },
        {
          name: '장비 관제 시스템',
          description: 'GPS/IoT 기반 실시간 장비 최적 배치',
          efficiency: '장비 효율 35% 향상'
        },
        {
          name: '예측 유지보수',
          description: 'AI 기반 인프라 수명 예측 및 정비',
          efficiency: '돌발 고장 80% 예방'
        }
      ],
      integrations: [
        'GIS 시스템',
        'GPS 관제',
        'IoT 플랫폼'
      ]
    },
    testimonials: [
      {
        quote: "AI 지형 분석으로 최적 노선을 빠르게 찾아내고, IoT로 인프라를 실시간 모니터링하니 프로젝트 효율이 놀랍게 향상되었습니다.",
        author: "정민수",
        position: "인프라사업부장",
        company: "GS건설"
      }
    ],
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '45명',
    technologies: ['GIS', 'Computer Vision', 'n8n', 'IoT', 'Drone'],
    downloadableResources: [
      '스마트 인프라 백서',
      'IoT 유지보수 가이드'
    ]
  },

  'real-estate-development': {
    id: 'real-estate-development',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '부동산개발',
    companyName: '롯데건설 개발사업부 (직원 2,100명)',
    companySize: '대기업',
    title: 'AI 부동산 개발 의사결정 플랫폼',
    subtitle: '투자 수익률 35% 향상, 개발 기간 40% 단축',
    description: 'AI 분석과 n8n 자동화로 부동산 개발의 전 과정을 혁신한 데이터 기반 의사결정 사례',
    icon: Building,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
    companyInfo: {
      industry: '부동산개발',
      employees: '2,100명',
      revenue: '연 매출 3.8조원',
      location: '서울시 송파구'
    },
    challenges: [
      {
        title: '입지 분석 복잡성',
        description: '수많은 변수를 고려한 최적 입지 선정',
        impact: '투자 실패 리스크'
      },
      {
        title: '시장 예측 어려움',
        description: '부동산 시장 변동성 예측 한계',
        impact: '수익성 저하'
      },
      {
        title: '인허가 프로세스',
        description: '복잡한 인허가 절차 관리',
        impact: '개발 지연 및 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '부동산 AI 기초',
          duration: '12시간',
          description: '부동산 개발 AI 활용'
        },
        {
          title: 'n8n 개발 자동화',
          duration: '14시간',
          description: '개발 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 입지 분석',
          duration: '24시간',
          description: '빅데이터 기반 입지 평가'
        },
        {
          title: '시장 예측 모델',
          duration: '20시간',
          description: '머신러닝 가격 예측'
        }
      ],
      executive: [
        {
          title: '부동산 투자 전략',
          duration: '8시간',
          description: 'AI 기반 투자 의사결정'
        }
      ]
    },
    process: [
      {
        phase: 'AI 분석 플랫폼 구축',
        duration: '10주',
        activities: [
          '빅데이터 수집 체계',
          'AI 입지 평가 모델',
          '시장 예측 엔진'
        ],
        results: [
          '1,000개 후보지 분석',
          '투자 정확도 85%'
        ]
      },
      {
        phase: '개발 프로세스 자동화',
        duration: '12주',
        activities: [
          '인허가 자동 관리',
          'VR 분양 시스템',
          '고객 분석 AI'
        ],
        results: [
          '인허가 기간 40% 단축',
          '분양률 95% 달성'
        ]
      },
      {
        phase: '운영 최적화',
        duration: '8주',
        activities: [
          '포트폴리오 관리',
          '수익 최적화',
          '리스크 관리'
        ],
        results: [
          'IRR 35% 향상',
          '공실률 3% 미만'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '투자 수익률(IRR)',
          before: '15%',
          after: '20.25%',
          improvement: '35% 향상'
        },
        {
          metric: '개발 기간',
          before: '평균 5년',
          after: '평균 3년',
          improvement: '40% 단축'
        },
        {
          metric: '분양 성공률',
          before: '75%',
          after: '95%',
          improvement: '26.7% 향상'
        },
        {
          metric: '입지 선정 정확도',
          before: '60%',
          after: '85%',
          improvement: '41.7% 향상'
        }
      ],
      financial: [
        {
          item: '추가 개발 이익',
          amount: '프로젝트당 450억원'
        },
        {
          item: '금융 비용 절감',
          amount: '연 120억원'
        },
        {
          item: 'ROI',
          amount: '2년 내 회수'
        }
      ],
      qualitative: [
        '데이터 기반 의사결정 정착',
        '시장 선도 위치 확보',
        '투자자 신뢰도 향상'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 입지 분석',
          description: '100+ 변수 분석으로 최적 입지 추천',
          efficiency: '분석 시간 95% 절감'
        },
        {
          name: '시장 가격 예측',
          description: '머신러닝 기반 미래 가격 예측',
          efficiency: '예측 정확도 88%'
        },
        {
          name: 'VR 사전 분양',
          description: 'VR로 미완성 물건 체험 및 분양',
          efficiency: '분양 기간 50% 단축'
        }
      ],
      integrations: [
        '국토부 데이터',
        '금융 시스템',
        'CRM 플랫폼'
      ]
    },
    testimonials: [
      {
        quote: "AI 분석 플랫폼 덕분에 과거에는 놓쳤을 우수한 개발 기회를 찾아낼 수 있었고, 투자 의사결정 속도가 획기적으로 빨라졌습니다.",
        author: "이상훈",
        position: "개발사업본부장",
        company: "롯데건설"
      }
    ],
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '38명',
    technologies: ['Machine Learning', 'n8n', 'VR', 'Big Data', 'GIS'],
    downloadableResources: [
      '부동산 AI 분석 가이드',
      '스마트 개발 백서'
    ]
  },

  'property-management': {
    id: 'property-management',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '자산관리/임대',
    companyName: '이지스자산운용 (직원 320명)',
    companySize: '중견기업',
    title: 'AI 자산관리 최적화 시스템',
    subtitle: '운영 효율 58% 향상, NOI 32% 증가',
    description: 'AI와 n8n을 활용한 부동산 자산관리 자동화로 수익성을 극대화한 PropTech 혁신 사례',
    icon: DollarSign,
    color: 'orange',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    companyInfo: {
      industry: '부동산 자산관리',
      employees: '320명',
      revenue: '운용자산 2.5조원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '임대 관리 복잡성',
        description: '다수 임차인과 건물의 통합 관리 어려움',
        impact: '운영 비효율 및 공실 증가'
      },
      {
        title: '유지보수 비용',
        description: '예측 불가능한 시설 관리 비용',
        impact: '수익성 저하'
      },
      {
        title: '임대료 최적화',
        description: '시장 변화에 따른 임대료 조정 지연',
        impact: '수익 기회 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'PropTech AI 기초',
          duration: '10시간',
          description: '자산관리 AI 활용법'
        },
        {
          title: 'n8n 운영 자동화',
          duration: '12시간',
          description: '임대 관리 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 수익 최적화',
          duration: '20시간',
          description: '임대료 및 운영비 최적화'
        },
        {
          title: '예측 유지보수',
          duration: '16시간',
          description: 'IoT 기반 시설 관리'
        }
      ],
      executive: [
        {
          title: '자산관리 혁신',
          duration: '6시간',
          description: 'AI 기반 자산 운용 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 임대 관리 시스템',
        duration: '6주',
        activities: [
          '임차인 AI 챗봇',
          '자동 계약 관리',
          '임대료 최적화 엔진'
        ],
        results: [
          '관리 효율 60% 향상',
          '공실률 5% 미만'
        ]
      },
      {
        phase: 'IoT 시설 관리',
        duration: '8주',
        activities: [
          'IoT 센서 설치',
          '예측 정비 시스템',
          '에너지 최적화'
        ],
        results: [
          '유지보수 비용 35% 절감',
          '에너지 비용 28% 절감'
        ]
      },
      {
        phase: '수익 최적화',
        duration: '6주',
        activities: [
          'AI 가격 전략',
          '테넌트 믹스 최적화',
          '부가 서비스 개발'
        ],
        results: [
          'NOI 32% 증가',
          '자산 가치 25% 상승'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '순영업수익(NOI)',
          before: '연 850억원',
          after: '연 1,122억원',
          improvement: '32% 증가'
        },
        {
          metric: '공실률',
          before: '12%',
          after: '4%',
          improvement: '66.7% 감소'
        },
        {
          metric: '운영 비용',
          before: '매출 대비 35%',
          after: '매출 대비 22%',
          improvement: '37% 절감'
        },
        {
          metric: '임차인 만족도',
          before: '3.5/5.0',
          after: '4.5/5.0',
          improvement: '28.6% 향상'
        }
      ],
      financial: [
        {
          item: '추가 임대 수익',
          amount: '연 180억원'
        },
        {
          item: '운영비 절감',
          amount: '연 92억원'
        },
        {
          item: '자산 가치 상승',
          amount: '6,250억원'
        }
      ],
      qualitative: [
        '임차인 이탈률 최소화',
        'ESG 경영 실현',
        '스마트 빌딩 인증'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 임대료 최적화',
          description: '시장 분석 기반 동적 가격 책정',
          efficiency: '수익 15% 증가'
        },
        {
          name: '스마트 시설 관리',
          description: 'IoT 센서로 예측 유지보수',
          efficiency: '고장 시간 75% 감소'
        },
        {
          name: '임차인 자동 응대',
          description: 'AI 챗봇 24/7 서비스',
          efficiency: '응대 시간 85% 절감'
        }
      ],
      integrations: [
        '스마트 빌딩 시스템',
        'CRM 플랫폼',
        '회계 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI 시스템으로 건물 운영이 완전히 자동화되어 관리가 훨씬 편해졌고, 임차인들의 만족도도 크게 높아졌습니다. 수익도 예상보다 훨씬 많이 늘었습니다.",
        author: "김재원",
        position: "자산관리본부장",
        company: "이지스자산운용"
      }
    ],
    featured: false,
    implementationPeriod: '5개월',
    teamSize: '22명',
    technologies: ['AI/ML', 'n8n', 'IoT', 'ChatGPT', 'Power BI'],
    downloadableResources: [
      'PropTech AI 도입 가이드',
      '스마트 빌딩 운영 매뉴얼'
    ]
  },

  'modular-construction': {
    id: 'modular-construction',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '모듈러건축',
    companyName: '포스코A&C (직원 680명)',
    companySize: '중견기업',
    title: '모듈러 건축 AI 생산 혁신',
    subtitle: '생산성 75% 향상, 건축 기간 60% 단축',
    description: 'AI와 n8n을 활용한 모듈러 건축의 설계-생산-시공 전 과정 자동화로 건설 패러다임을 혁신한 사례',
    icon: HardHat,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop',
    companyInfo: {
      industry: '모듈러/프리팹 건축',
      employees: '680명',
      revenue: '연 매출 4,200억원',
      location: '경상북도 포항시'
    },
    challenges: [
      {
        title: '설계 표준화',
        description: '모듈 조합의 복잡성과 커스터마이징 한계',
        impact: '설계 시간 증가 및 생산 효율 저하'
      },
      {
        title: '공장 생산 최적화',
        description: '모듈 생산 라인의 효율성 부족',
        impact: '생산 비용 증가 및 납기 지연'
      },
      {
        title: '현장 조립 정확도',
        description: '모듈 간 접합부 시공 품질 편차',
        impact: '재작업 및 하자 발생'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '모듈러 건축 AI',
          duration: '12시간',
          description: '모듈러 건축의 AI 활용'
        },
        {
          title: 'n8n 생산 자동화',
          duration: '14시간',
          description: '제조 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 모듈 설계',
          duration: '20시간',
          description: 'Generative 모듈 디자인'
        },
        {
          title: '스마트 팩토리',
          duration: '24시간',
          description: 'AI 기반 생산 최적화'
        }
      ],
      executive: [
        {
          title: '모듈러 건축 혁신',
          duration: '6시간',
          description: 'DfMA 전략과 AI'
        }
      ]
    },
    process: [
      {
        phase: 'AI 설계 시스템',
        duration: '8주',
        activities: [
          'AI 모듈 조합 엔진',
          'BIM 자동화',
          '구조 해석 AI'
        ],
        results: [
          '설계 시간 70% 단축',
          '1,000+ 모듈 조합 생성'
        ]
      },
      {
        phase: '스마트 팩토리 구축',
        duration: '12주',
        activities: [
          'AI 생산 스케줄링',
          '로봇 자동화 라인',
          '품질 검사 AI'
        ],
        results: [
          '생산성 75% 향상',
          '불량률 1% 미만'
        ]
      },
      {
        phase: '현장 시공 혁신',
        duration: '10주',
        activities: [
          'AR 조립 가이드',
          'AI 공정 관리',
          '품질 자동 검증'
        ],
        results: [
          '시공 기간 60% 단축',
          '하자율 95% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '생산성',
          before: '월 50모듈',
          after: '월 87.5모듈',
          improvement: '75% 향상'
        },
        {
          metric: '건축 기간',
          before: '12개월',
          after: '4.8개월',
          improvement: '60% 단축'
        },
        {
          metric: '건축 비용',
          before: '평당 450만원',
          after: '평당 315만원',
          improvement: '30% 절감'
        },
        {
          metric: '탄소 배출',
          before: '100%',
          after: '45%',
          improvement: '55% 감소'
        }
      ],
      financial: [
        {
          item: '생산 비용 절감',
          amount: '연 280억원'
        },
        {
          item: '추가 수주 수익',
          amount: '연 520억원'
        },
        {
          item: 'ROI',
          amount: '14개월 내 회수'
        }
      ],
      qualitative: [
        '친환경 건축 선도',
        '건설 안전성 획기적 개선',
        '해외 시장 진출 성공'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 모듈 설계',
          description: 'Generative Design으로 최적 모듈 조합',
          efficiency: '설계 시간 70% 절감'
        },
        {
          name: '스마트 생산 라인',
          description: 'AI 스케줄링과 로봇 자동화',
          efficiency: '생산성 75% 향상'
        },
        {
          name: 'AR 시공 가이드',
          description: 'AR로 정확한 모듈 조립 지원',
          efficiency: '시공 오류 90% 감소'
        }
      ],
      integrations: [
        'BIM 시스템',
        'MES(제조실행시스템)',
        'AR/VR 플랫폼'
      ]
    },
    testimonials: [
      {
        quote: "AI가 수백 가지 모듈 조합을 순식간에 만들어내고, 공장에서는 로봇이 정밀하게 생산합니다. 건축이 제조업처럼 혁신되고 있습니다.",
        author: "박철수",
        position: "기술연구소장",
        company: "포스코A&C"
      }
    ],
    featured: true,
    implementationPeriod: '8개월',
    teamSize: '42명',
    technologies: ['Generative AI', 'Robotics', 'n8n', 'AR', 'Digital Twin'],
    downloadableResources: [
      '모듈러 건축 AI 백서',
      'DfMA 자동화 가이드'
    ]
  }
};

// 건설/부동산 업종 요약 리스트 (인덱스 페이지용)
export const constructionRealEstateCases: SuccessCase[] = [
  {
    id: 'general-construction-smart',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '종합건설업',
    companyName: '대림산업',
    title: 'AI 기반 스마트 건설 현장 혁신',
    description: '공기 단축 35%, 안전사고 78% 감소',
    metrics: {
      efficiency: '+45%',
      safety: '-78%',
      cost: '-15.3%',
      quality: '+75%'
    },
    tags: ['스마트건설', '안전관리', 'BIM', 'IoT'],
    icon: Building2,
    color: 'gray',
    featured: true
  },
  {
    id: 'specialized-construction',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '전문건설업',
    companyName: '삼우전기',
    title: '전기공사 AI 자동화 혁신',
    description: '시공 정확도 98%, 작업 시간 45% 단축',
    metrics: {
      accuracy: '98%',
      time: '-45%',
      rework: '-86.7%',
      productivity: '+80%'
    },
    tags: ['전문건설', 'AR시공', '품질관리', 'AutoCAD'],
    icon: Wrench,
    color: 'yellow',
    featured: false
  },
  {
    id: 'architecture-design',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '건축설계',
    companyName: '희림종합건축사사무소',
    title: 'AI 건축 설계 자동화 플랫폼',
    description: '설계 시간 60% 단축, 디자인 품질 45% 향상',
    metrics: {
      time: '-60%',
      options: '+500%',
      changes: '-77%',
      revenue: '+180억'
    },
    tags: ['Generative Design', 'BIM', 'VR설계', '법규검토'],
    icon: Home,
    color: 'blue',
    featured: true
  },
  {
    id: 'civil-infrastructure',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '토목/인프라',
    companyName: 'GS건설',
    title: '스마트 인프라 건설 혁신',
    description: '시공 효율 42% 향상, 유지보수 비용 55% 절감',
    metrics: {
      efficiency: '+42%',
      maintenance: '-55%',
      equipment: '+35.4%',
      duration: '-50%'
    },
    tags: ['인프라', 'GIS', 'IoT유지보수', '드론'],
    icon: Map,
    color: 'green',
    featured: false
  },
  {
    id: 'real-estate-development',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '부동산개발',
    companyName: '롯데건설',
    title: 'AI 부동산 개발 의사결정 플랫폼',
    description: '투자 수익률 35% 향상, 개발 기간 40% 단축',
    metrics: {
      roi: '+35%',
      period: '-40%',
      success: '+26.7%',
      accuracy: '+41.7%'
    },
    tags: ['부동산개발', '입지분석', '시장예측', 'VR분양'],
    icon: Building,
    color: 'purple',
    featured: true
  },
  {
    id: 'property-management',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '자산관리/임대',
    companyName: '이지스자산운용',
    title: 'AI 자산관리 최적화 시스템',
    description: '운영 효율 58% 향상, NOI 32% 증가',
    metrics: {
      noi: '+32%',
      vacancy: '-66.7%',
      cost: '-37%',
      value: '+25%'
    },
    tags: ['PropTech', '자산관리', 'IoT시설', '임대최적화'],
    icon: DollarSign,
    color: 'orange',
    featured: false
  },
  {
    id: 'modular-construction',
    category: 'construction',
    industry: '건설/부동산',
    subIndustry: '모듈러건축',
    companyName: '포스코A&C',
    title: '모듈러 건축 AI 생산 혁신',
    description: '생산성 75% 향상, 건축 기간 60% 단축',
    metrics: {
      productivity: '+75%',
      period: '-60%',
      cost: '-30%',
      carbon: '-55%'
    },
    tags: ['모듈러건축', '스마트팩토리', 'DfMA', 'AR조립'],
    icon: HardHat,
    color: 'red',
    featured: true
  }
];

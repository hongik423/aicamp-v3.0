'use client';

import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Brain, 
  Pill, 
  Shield, 
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  FileText,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 의료/헬스케어 업종 성공사례 데이터
export const healthcareMedicalCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'hospital-patient-care': {
    id: 'hospital-patient-care',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '종합병원',
    companyName: '서울대학교병원 (직원 3,500명)',
    companySize: '대기업',
    title: 'AI 기반 환자 케어 자동화 시스템',
    subtitle: '환자 대기시간 65% 단축, 의료진 업무 효율 80% 향상',
    description: 'AI와 n8n을 활용한 환자 진료 프로세스 자동화로 의료 서비스 품질을 혁신적으로 개선한 디지털 전환 성공사례',
    icon: Heart,
    color: 'red',
    heroImage: '/images/benchmark2/중증 외원 AI 운영 혁신.png',
    companyInfo: {
      industry: '종합병원',
      employees: '3,500명',
      revenue: '연 매출 1조 2천억원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '환자 대기시간 증가',
        description: '외래 환자 평균 대기시간 2시간 30분으로 환자 불만 급증',
        impact: '환자 만족도 하락 및 타 병원 이탈률 35% 증가'
      },
      {
        title: '의료진 행정 업무 과중',
        description: '의사/간호사가 진료 외 행정 업무에 일일 3시간 소요',
        impact: '진료 가능 환자 수 감소 및 의료진 번아웃 증가'
      },
      {
        title: '검사 결과 처리 지연',
        description: '검사 결과 분석 및 환자 통보까지 평균 3-5일 소요',
        impact: '진단 및 치료 지연으로 환자 건강 위험 증가'
      },
      {
        title: '의료 데이터 활용 부족',
        description: '축적된 의료 데이터의 5% 미만만 활용',
        impact: '예방 의료 및 정밀 의료 서비스 제공 한계'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '의료 AI 기초와 윤리',
          duration: '16시간',
          description: '의료 분야 AI 기술의 이해와 환자 정보 보호, 의료 윤리'
        },
        {
          title: 'n8n 자동화 기초',
          duration: '12시간',
          description: '의료 프로세스 자동화를 위한 n8n 기본 활용법'
        },
        {
          title: '프롬프트 엔지니어링',
          duration: '8시간',
          description: '의료 상황별 최적화된 AI 프롬프트 작성 기법'
        }
      ],
      advanced: [
        {
          title: '의료 데이터 분석 AI',
          duration: '24시간',
          description: '검사 결과, 영상 데이터 AI 분석 및 진단 보조 시스템'
        },
        {
          title: '환자 케어 자동화',
          duration: '20시간',
          description: '예약, 문진, 검사, 처방까지 전체 프로세스 자동화'
        },
        {
          title: 'AI 챗봇 구축',
          duration: '16시간',
          description: '24/7 환자 상담 AI 챗봇 개발 및 운영'
        }
      ],
      executive: [
        {
          title: '의료 AI 전략',
          duration: '8시간',
          description: '병원 경영진을 위한 AI 도입 전략 및 ROI 분석'
        },
        {
          title: '디지털 헬스케어 트렌드',
          duration: '6시간',
          description: '글로벌 디지털 헬스케어 동향과 미래 전략'
        }
      ]
    },
    process: [
      {
        phase: '진단 및 분석',
        duration: '4주',
        activities: [
          '병원 전체 업무 프로세스 맵핑',
          '환자 여정 분석 (Patient Journey Mapping)',
          '의료진 업무 패턴 분석',
          '자동화 가능 영역 도출'
        ],
        results: [
          '132개 업무 프로세스 문서화',
          '자동화 가능 업무 87개 식별',
          '우선순위 매트릭스 수립'
        ]
      },
      {
        phase: 'AI 시스템 설계',
        duration: '6주',
        activities: [
          'AI 진료 보조 시스템 아키텍처 설계',
          'n8n 워크플로우 설계 (45개)',
          '의료 데이터 보안 체계 구축',
          'PACS/EMR 시스템 연동 설계'
        ],
        results: [
          '통합 AI 플랫폼 설계 완료',
          '의료정보 보안 인증 획득',
          'API 연동 체계 구축'
        ]
      },
      {
        phase: '파일럿 구현',
        duration: '8주',
        activities: [
          '외래 진료과 3개 선정 파일럿',
          'AI 문진 시스템 구축',
          '검사 결과 자동 분석 시스템 구현',
          '의료진 대상 집중 교육'
        ],
        results: [
          '파일럿 진료과 대기시간 45% 감소',
          '의료진 만족도 85% 달성',
          '시스템 안정성 99.9% 확보'
        ]
      },
      {
        phase: '전면 확산',
        duration: '12주',
        activities: [
          '전체 진료과 단계적 확대',
          'AI 응급실 트리아지 시스템 도입',
          '예측 분석 기반 병상 관리 시스템',
          '전직원 AI 활용 교육 실시'
        ],
        results: [
          '전체 32개 진료과 적용 완료',
          '일일 처리 환자 수 40% 증가',
          '의료 서비스 품질 지표 개선'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '환자 대기시간',
          before: '평균 150분',
          after: '평균 52분',
          improvement: '65% 단축'
        },
        {
          metric: '일일 진료 환자 수',
          before: '1,200명',
          after: '1,680명',
          improvement: '40% 증가'
        },
        {
          metric: '검사 결과 처리 시간',
          before: '72시간',
          after: '6시간',
          improvement: '92% 단축'
        },
        {
          metric: '의료진 행정 업무 시간',
          before: '일일 3시간',
          after: '일일 0.6시간',
          improvement: '80% 감소'
        },
        {
          metric: '환자 만족도',
          before: '3.2/5.0',
          after: '4.6/5.0',
          improvement: '44% 향상'
        },
        {
          metric: '의료 과실 발생률',
          before: '0.8%',
          after: '0.1%',
          improvement: '87.5% 감소'
        }
      ],
      financial: [
        {
          item: '연간 운영비 절감',
          amount: '82억원'
        },
        {
          item: '추가 진료 수익',
          amount: '156억원'
        },
        {
          item: '의료 과실 관련 비용 절감',
          amount: '23억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 320%'
        }
      ],
      qualitative: [
        '의료진 업무 만족도 대폭 향상',
        '환자 신뢰도 및 병원 브랜드 가치 상승',
        '예방 의료 서비스 강화로 지역 사회 건강 증진',
        '의료 데이터 기반 연구 역량 강화',
        'JCI 국제 인증 획득'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: '환자 예약 및 문진 자동화',
          description: 'AI 챗봇을 통한 24/7 예약 접수 및 사전 문진',
          efficiency: '처리 시간 85% 단축'
        },
        {
          name: '검사 결과 자동 분석',
          description: 'AI 영상 판독 및 검사 수치 자동 분석',
          efficiency: '정확도 98.5% 달성'
        },
        {
          name: '처방 및 투약 관리',
          description: '약물 상호작용 체크 및 투약 스케줄 자동화',
          efficiency: '투약 오류 95% 감소'
        },
        {
          name: '병상 배정 최적화',
          description: 'AI 예측 모델 기반 병상 효율적 관리',
          efficiency: '병상 회전율 35% 향상'
        }
      ],
      integrations: [
        'EMR/PACS 시스템 완벽 연동',
        '건강보험 청구 시스템 자동화',
        '약국 처방전 전송 시스템',
        '검사 장비 실시간 데이터 연동'
      ]
    },
    testimonials: [
      {
        quote: "AI 도입 후 환자를 위한 실질적인 진료 시간이 2배 이상 늘었습니다. 행정 업무에서 해방되어 의사 본연의 역할에 집중할 수 있게 되었고, 환자들의 만족도도 크게 향상되었습니다.",
        author: "김정호",
        position: "내과 과장",
        company: "서울대학교병원"
      },
      {
        quote: "검사 예약부터 결과 확인까지 모든 과정이 간소화되어 정말 편리합니다. 특히 AI 챗봇이 24시간 상담해주어 불안할 때마다 도움을 받을 수 있어 좋습니다.",
        author: "이미선",
        position: "외래 환자",
        company: "당뇨병 치료 중"
      }
    ],
    featured: true,
    implementationPeriod: '8개월',
    teamSize: '45명',
    technologies: ['GPT-4', 'Claude', 'n8n', 'Python', 'TensorFlow', 'FHIR'],
    downloadableResources: [
      '의료 AI 도입 가이드북',
      '환자 케어 자동화 템플릿',
      'ROI 계산 도구'
    ]
  },

  'clinic-operations': {
    id: 'clinic-operations',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '의원/클리닉',
    companyName: '강남 연세의원 (직원 25명)',
    companySize: '중소기업',
    title: '중소 의원 AI 운영 혁신',
    subtitle: '운영 효율 70% 개선, 매출 45% 증가',
    description: '소규모 의원에서 AI와 n8n을 활용하여 운영 전반을 혁신하고 환자 경험을 개선한 성공사례',
    icon: Stethoscope,
    color: 'green',
    heroImage: '/images/benchmark2/AI 기반 환자 케어 자동화 시스템.png',
    companyInfo: {
      industry: '내과/가정의학과',
      employees: '25명',
      revenue: '연 매출 35억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '예약 관리 비효율',
        description: '수기 예약 관리로 인한 중복 예약 및 노쇼 발생',
        impact: '일일 환자 20% 손실, 수익 감소'
      },
      {
        title: '환자 대기 시간',
        description: '비효율적 프로세스로 평균 대기 시간 1시간 초과',
        impact: '환자 이탈률 30% 발생'
      },
      {
        title: '의료 기록 관리',
        description: '종이 차트 중심으로 정보 검색 어려움',
        impact: '진료 효율성 저하 및 의료 사고 위험'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '의원 디지털 전환 기초',
          duration: '8시간',
          description: '중소 의원을 위한 AI 기초 이해'
        },
        {
          title: 'n8n 실무 활용',
          duration: '12시간',
          description: '의원 운영 자동화 실습'
        }
      ],
      advanced: [
        {
          title: '환자 관리 자동화',
          duration: '16시간',
          description: '예약, 문진, 처방 자동화 구축'
        },
        {
          title: 'AI 진료 보조',
          duration: '12시간',
          description: 'AI를 활용한 진단 보조 시스템'
        }
      ],
      executive: [
        {
          title: '의원 경영 혁신',
          duration: '4시간',
          description: 'AI 기반 의원 경영 전략'
        }
      ]
    },
    process: [
      {
        phase: '현황 분석',
        duration: '2주',
        activities: [
          '업무 프로세스 분석',
          '환자 동선 파악',
          '자동화 영역 도출'
        ],
        results: [
          '15개 핵심 프로세스 도출',
          '자동화 가능 업무 80% 식별'
        ]
      },
      {
        phase: 'AI 시스템 구축',
        duration: '4주',
        activities: [
          '예약 관리 시스템 구축',
          'AI 문진 챗봇 개발',
          'EMR 시스템 도입'
        ],
        results: [
          '온라인 예약 시스템 오픈',
          'AI 챗봇 정확도 95%'
        ]
      },
      {
        phase: '운영 최적화',
        duration: '4주',
        activities: [
          '직원 교육 실시',
          '환자 안내 체계 개선',
          '프로세스 미세 조정'
        ],
        results: [
          '전직원 AI 활용 능력 확보',
          '환자 만족도 90% 달성'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '일일 진료 환자',
          before: '40명',
          after: '58명',
          improvement: '45% 증가'
        },
        {
          metric: '평균 대기 시간',
          before: '65분',
          after: '20분',
          improvement: '69% 단축'
        },
        {
          metric: '노쇼율',
          before: '25%',
          after: '5%',
          improvement: '80% 감소'
        },
        {
          metric: '행정 업무 시간',
          before: '일일 4시간',
          after: '일일 1시간',
          improvement: '75% 감소'
        }
      ],
      financial: [
        {
          item: '월 추가 수익',
          amount: '8,500만원'
        },
        {
          item: '인건비 절감',
          amount: '연 1.2억원'
        },
        {
          item: 'ROI',
          amount: '8개월 내 회수'
        }
      ],
      qualitative: [
        '의료진 업무 만족도 향상',
        '환자 재방문율 증가',
        '지역 내 평판 1위 달성'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: '스마트 예약 관리',
          description: 'AI 기반 예약 최적화 및 리마인더',
          efficiency: '노쇼 80% 감소'
        },
        {
          name: 'AI 문진 시스템',
          description: '사전 문진으로 진료 시간 단축',
          efficiency: '진료 시간 30% 절약'
        },
        {
          name: '처방전 자동화',
          description: '약국 연동 자동 처방전 전송',
          efficiency: '처리 시간 90% 단축'
        }
      ],
      integrations: [
        '건강보험 자동 청구',
        '약국 시스템 연동',
        '검사 기관 연계'
      ]
    },
    testimonials: [
      {
        quote: "작은 의원에서도 대형 병원 못지않은 스마트한 진료 시스템을 구축할 수 있었습니다. 환자분들의 만족도가 크게 올라갔고, 저희도 진료에만 집중할 수 있게 되었습니다.",
        author: "박준영",
        position: "원장",
        company: "강남 연세의원"
      }
    ],
    featured: true,
    implementationPeriod: '3개월',
    teamSize: '8명',
    technologies: ['ChatGPT', 'n8n', 'Google Cloud', 'KakaoTalk API'],
    downloadableResources: [
      '중소 의원 AI 도입 매뉴얼',
      '예약 관리 자동화 템플릿'
    ]
  },

  'pharmacy-automation': {
    id: 'pharmacy-automation',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '약국',
    companyName: '온누리약국 체인 (직원 85명)',
    companySize: '중견기업',
    title: '스마트 약국 운영 자동화',
    subtitle: '처방 조제 시간 60% 단축, 재고 관리 정확도 99%',
    description: 'AI와 n8n을 활용한 약국 운영 전반의 자동화로 고객 서비스와 운영 효율을 극대화한 사례',
    icon: Pill,
    color: 'purple',
    heroImage: '/images/benchmark2/스마트 약국 운영 자동화.png',
    companyInfo: {
      industry: '약국',
      employees: '85명',
      revenue: '연 매출 120억원',
      location: '서울/경기 15개 지점'
    },
    challenges: [
      {
        title: '복잡한 재고 관리',
        description: '3,000여 종 의약품 재고 관리의 어려움',
        impact: '재고 부족/과잉으로 연 2억원 손실'
      },
      {
        title: '처방전 처리 지연',
        description: '수기 입력과 검수로 조제 시간 지연',
        impact: '고객 대기 시간 증가 및 불만 발생'
      },
      {
        title: '복약 지도 품질',
        description: '약사별 복약 지도 품질 편차',
        impact: '의약품 오남용 위험 및 고객 신뢰도 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '약국 디지털 전환',
          duration: '8시간',
          description: '약국 운영 AI 활용 기초'
        },
        {
          title: 'n8n 자동화 입문',
          duration: '12시간',
          description: '약국 업무 자동화 기초'
        }
      ],
      advanced: [
        {
          title: 'AI 재고 관리',
          duration: '16시간',
          description: '예측 분석 기반 재고 최적화'
        },
        {
          title: '복약 지도 AI',
          duration: '12시간',
          description: 'AI 활용 맞춤형 복약 지도'
        }
      ],
      executive: [
        {
          title: '약국 경영 혁신',
          duration: '4시간',
          description: 'AI 기반 약국 체인 경영 전략'
        }
      ]
    },
    process: [
      {
        phase: '프로세스 분석',
        duration: '3주',
        activities: [
          '전체 약국 업무 흐름 분석',
          '재고 회전율 분석',
          '고객 서비스 접점 파악'
        ],
        results: [
          '표준 운영 프로세스 수립',
          '자동화 우선순위 결정'
        ]
      },
      {
        phase: 'AI 시스템 도입',
        duration: '6주',
        activities: [
          'OCR 처방전 인식 시스템',
          'AI 재고 예측 모델 구축',
          '복약 지도 챗봇 개발'
        ],
        results: [
          '처방전 인식 정확도 99.5%',
          '재고 예측 정확도 95%'
        ]
      },
      {
        phase: '전체 지점 확산',
        duration: '8주',
        activities: [
          '단계별 지점 적용',
          '약사 및 직원 교육',
          '시스템 안정화'
        ],
        results: [
          '15개 전 지점 적용 완료',
          '운영 표준화 달성'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '처방 조제 시간',
          before: '평균 15분',
          after: '평균 6분',
          improvement: '60% 단축'
        },
        {
          metric: '재고 정확도',
          before: '85%',
          after: '99%',
          improvement: '16.5% 향상'
        },
        {
          metric: '일일 처리 처방전',
          before: '200건',
          after: '320건',
          improvement: '60% 증가'
        },
        {
          metric: '재고 회전율',
          before: '연 8회',
          after: '연 12회',
          improvement: '50% 개선'
        }
      ],
      financial: [
        {
          item: '재고 손실 감소',
          amount: '연 1.8억원'
        },
        {
          item: '추가 매출',
          amount: '연 25억원'
        },
        {
          item: '인건비 절감',
          amount: '연 3.5억원'
        }
      ],
      qualitative: [
        '고객 대기 시간 대폭 감소',
        '복약 지도 품질 표준화',
        '약사 업무 만족도 향상'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'OCR 처방전 자동 입력',
          description: 'AI OCR로 처방전 즉시 디지털화',
          efficiency: '입력 시간 95% 절감'
        },
        {
          name: 'AI 재고 예측',
          description: '수요 예측 기반 자동 발주',
          efficiency: '재고 부족 90% 방지'
        },
        {
          name: '약물 상호작용 체크',
          description: 'AI 기반 실시간 DUR 체크',
          efficiency: '약물 사고 100% 예방'
        }
      ],
      integrations: [
        '건강보험공단 시스템',
        '의약품 도매상 ERP',
        '병원 처방 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI 도입 후 단순 반복 업무에서 벗어나 환자 상담과 복약 지도에 더 많은 시간을 할애할 수 있게 되었습니다. 전문가로서의 역할에 집중할 수 있어 매우 만족합니다.",
        author: "최현주",
        position: "약국장",
        company: "온누리약국 강남점"
      }
    ],
    featured: false,
    implementationPeriod: '5개월',
    teamSize: '12명',
    technologies: ['Azure AI', 'n8n', 'OCR', 'Power BI'],
    downloadableResources: [
      '약국 AI 도입 가이드',
      '재고 관리 자동화 템플릿'
    ]
  },

  'dental-clinic': {
    id: 'dental-clinic',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '치과',
    companyName: '서울미소치과 네트워크 (직원 120명)',
    companySize: '중견기업',
    title: '치과 진료 AI 혁신 시스템',
    subtitle: '진단 정확도 95%, 치료 계획 수립 시간 70% 단축',
    description: 'AI 영상 진단과 n8n 자동화로 치과 진료의 정확성과 효율성을 혁신적으로 개선한 성공사례',
    icon: Activity,
    color: 'blue',
    heroImage: '/images/benchmark2/건강검진 프로세스 완전 자동화.png',
    companyInfo: {
      industry: '치과',
      employees: '120명',
      revenue: '연 매출 180억원',
      location: '서울/경기 8개 지점'
    },
    challenges: [
      {
        title: 'X-ray 판독 시간',
        description: '수동 영상 판독으로 진단 시간 지연',
        impact: '환자 대기 시간 증가 및 진료 효율 저하'
      },
      {
        title: '치료 계획 수립',
        description: '복잡한 치료 계획 수립에 과도한 시간 소요',
        impact: '당일 치료 시작 어려움'
      },
      {
        title: '환자 관리',
        description: '정기 검진 및 사후 관리 누락',
        impact: '환자 이탈 및 구강 건강 악화'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '치과 AI 기초',
          duration: '8시간',
          description: 'AI 영상 진단 기초 이해'
        },
        {
          title: 'n8n 워크플로우',
          duration: '12시간',
          description: '치과 업무 자동화 구축'
        }
      ],
      advanced: [
        {
          title: 'AI 영상 진단',
          duration: '20시간',
          description: '파노라마, CT 영상 AI 분석'
        },
        {
          title: '치료 계획 AI',
          duration: '16시간',
          description: 'AI 기반 최적 치료 계획 수립'
        }
      ],
      executive: [
        {
          title: '치과 경영 전략',
          duration: '6시간',
          description: 'AI 활용 치과 경영 혁신'
        }
      ]
    },
    process: [
      {
        phase: '진단 체계 구축',
        duration: '4주',
        activities: [
          'AI 영상 진단 시스템 도입',
          '진료 프로세스 재설계',
          '의료진 교육'
        ],
        results: [
          'X-ray 자동 분석 시스템 구축',
          '진단 정확도 95% 달성'
        ]
      },
      {
        phase: '치료 자동화',
        duration: '6주',
        activities: [
          'AI 치료 계획 시스템',
          '3D 시뮬레이션 도입',
          '환자 관리 자동화'
        ],
        results: [
          '치료 계획 시간 70% 단축',
          '환자 만족도 92%'
        ]
      },
      {
        phase: '전체 확산',
        duration: '8주',
        activities: [
          '8개 지점 통합 적용',
          '표준 프로토콜 수립',
          '품질 관리 체계'
        ],
        results: [
          '전 지점 표준화 완료',
          '진료 품질 균일화'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '진단 시간',
          before: '평균 30분',
          after: '평균 9분',
          improvement: '70% 단축'
        },
        {
          metric: '진단 정확도',
          before: '82%',
          after: '95%',
          improvement: '15.9% 향상'
        },
        {
          metric: '일일 진료 환자',
          before: '25명',
          after: '40명',
          improvement: '60% 증가'
        },
        {
          metric: '재진료율',
          before: '15%',
          after: '3%',
          improvement: '80% 감소'
        }
      ],
      financial: [
        {
          item: '월 추가 수익',
          amount: '2.5억원'
        },
        {
          item: '의료 과실 보험료 절감',
          amount: '연 8천만원'
        },
        {
          item: 'ROI',
          amount: '14개월 내 회수'
        }
      ],
      qualitative: [
        '치료 결과 예측 가능성 향상',
        '환자 신뢰도 대폭 상승',
        '의료진 진단 자신감 향상'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI X-ray 분석',
          description: '충치, 치주질환 자동 감지',
          efficiency: '진단 시간 70% 절감'
        },
        {
          name: '3D 치료 시뮬레이션',
          description: 'AI 기반 치료 결과 예측',
          efficiency: '치료 성공률 95%'
        },
        {
          name: '예방 관리 알림',
          description: '정기 검진 자동 안내',
          efficiency: '재방문율 85% 달성'
        }
      ],
      integrations: [
        'PACS 영상 시스템',
        'CAD/CAM 시스템',
        '보험 청구 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI 영상 진단 도입 후 놓치기 쉬운 초기 충치나 치주 질환을 정확하게 찾아낼 수 있게 되었습니다. 환자분들께 더 정확한 진단과 치료를 제공할 수 있어 자부심을 느낍니다.",
        author: "김민수",
        position: "원장",
        company: "서울미소치과 강남점"
      }
    ],
    featured: true,
    implementationPeriod: '6개월',
    teamSize: '15명',
    technologies: ['TensorFlow', 'n8n', 'DICOM', '3D Imaging AI'],
    downloadableResources: [
      '치과 AI 도입 백서',
      '영상 진단 AI 활용 가이드'
    ]
  },

  'health-checkup-center': {
    id: 'health-checkup-center',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '건강검진센터',
    companyName: 'KMI 한국의학연구소 (직원 450명)',
    companySize: '중견기업',
    title: '건강검진 프로세스 완전 자동화',
    subtitle: '검진 시간 50% 단축, 정확도 98% 달성',
    description: 'AI와 n8n을 활용한 건강검진 전 과정 자동화로 검진 효율성과 정확도를 획기적으로 개선한 사례',
    icon: Shield,
    color: 'orange',
    heroImage: '/images/benchmark2/치과 진료 AI 혁신 시스템.png',
    companyInfo: {
      industry: '건강검진센터',
      employees: '450명',
      revenue: '연 매출 350억원',
      location: '전국 12개 센터'
    },
    challenges: [
      {
        title: '검진 대기 시간',
        description: '복잡한 검진 동선으로 대기 시간 과다',
        impact: '고객 불만 및 일일 검진 인원 제한'
      },
      {
        title: '결과 분석 지연',
        description: '수많은 검사 결과 수동 분석',
        impact: '결과 통보까지 2주 이상 소요'
      },
      {
        title: '사후 관리 부재',
        description: '검진 후 건강 관리 연계 부족',
        impact: '예방 의료 효과 제한'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '검진 센터 AI 기초',
          duration: '8시간',
          description: '건강검진 AI 활용 이해'
        },
        {
          title: 'n8n 프로세스 자동화',
          duration: '12시간',
          description: '검진 워크플로우 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 건강 위험 예측',
          duration: '20시간',
          description: '빅데이터 기반 질병 예측 모델'
        },
        {
          title: '맞춤형 건강 관리',
          duration: '16시간',
          description: 'AI 개인 맞춤 건강 플랜'
        }
      ],
      executive: [
        {
          title: '검진센터 경영 혁신',
          duration: '6시간',
          description: 'AI 기반 센터 운영 전략'
        }
      ]
    },
    process: [
      {
        phase: '프로세스 재설계',
        duration: '4주',
        activities: [
          '검진 동선 최적화',
          'AI 분석 시스템 설계',
          '통합 플랫폼 구축'
        ],
        results: [
          '스마트 검진 동선 수립',
          '실시간 분석 체계 구축'
        ]
      },
      {
        phase: 'AI 시스템 구현',
        duration: '8주',
        activities: [
          'AI 영상 판독 시스템',
          '검사 결과 자동 분석',
          '건강 위험도 예측 모델'
        ],
        results: [
          '판독 정확도 98%',
          '즉시 결과 제공 가능'
        ]
      },
      {
        phase: '전국 센터 확산',
        duration: '12주',
        activities: [
          '12개 센터 순차 적용',
          '직원 역량 강화',
          '품질 표준화'
        ],
        results: [
          '전 센터 통합 운영',
          '서비스 품질 균일화'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '검진 소요 시간',
          before: '평균 4시간',
          after: '평균 2시간',
          improvement: '50% 단축'
        },
        {
          metric: '결과 제공 시간',
          before: '14일',
          after: '당일',
          improvement: '100% 개선'
        },
        {
          metric: '일일 검진 인원',
          before: '200명',
          after: '350명',
          improvement: '75% 증가'
        },
        {
          metric: '이상 소견 발견율',
          before: '65%',
          after: '92%',
          improvement: '41.5% 향상'
        }
      ],
      financial: [
        {
          item: '연간 추가 수익',
          amount: '85억원'
        },
        {
          item: '운영비 절감',
          amount: '연 28억원'
        },
        {
          item: 'ROI',
          amount: '18개월 내 회수'
        }
      ],
      qualitative: [
        '조기 질병 발견율 대폭 향상',
        '고객 만족도 95% 달성',
        '예방 의료 서비스 강화'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 통합 판독',
          description: 'X-ray, CT, MRI 통합 AI 분석',
          efficiency: '판독 시간 90% 절감'
        },
        {
          name: '건강 위험 예측',
          description: '10년 내 질병 발생 확률 예측',
          efficiency: '예측 정확도 85%'
        },
        {
          name: '맞춤 건강 플랜',
          description: '개인별 건강 관리 계획 자동 수립',
          efficiency: '건강 개선율 70%'
        }
      ],
      integrations: [
        'PACS 영상 시스템',
        '국민건강보험공단',
        '협력 병원 네트워크'
      ]
    },
    testimonials: [
      {
        quote: "AI 도입으로 미세한 이상 소견도 놓치지 않게 되었고, 당일 결과를 받아볼 수 있어 검진의 가치가 크게 높아졌습니다. 고객들의 건강을 더 잘 지킬 수 있게 되어 보람을 느낍니다.",
        author: "이정훈",
        position: "센터장",
        company: "KMI 강남센터"
      }
    ],
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '25명',
    technologies: ['IBM Watson', 'n8n', 'TensorFlow', 'HL7 FHIR'],
    downloadableResources: [
      '검진센터 AI 도입 가이드',
      '건강 예측 모델 백서'
    ]
  },

  'rehabilitation-center': {
    id: 'rehabilitation-center',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '재활의학',
    companyName: '하나재활병원 (직원 180명)',
    companySize: '중견기업',
    title: 'AI 재활 치료 혁신 플랫폼',
    subtitle: '재활 성공률 75% 향상, 치료 기간 40% 단축',
    description: 'AI 동작 분석과 맞춤형 재활 프로그램으로 재활 치료의 효과를 극대화한 혁신 사례',
    icon: Users,
    color: 'teal',
    heroImage: '/images/benchmark2/AI HR 서비스 플랫폼.png',
    companyInfo: {
      industry: '재활병원',
      employees: '180명',
      revenue: '연 매출 95억원',
      location: '경기도 성남시'
    },
    challenges: [
      {
        title: '재활 진도 측정',
        description: '객관적 재활 진도 평가 어려움',
        impact: '치료 효과 판단 및 계획 수정 지연'
      },
      {
        title: '개인 맞춤 한계',
        description: '표준화된 재활 프로그램의 한계',
        impact: '개인별 최적 치료 제공 어려움'
      },
      {
        title: '재택 재활 관리',
        description: '퇴원 후 재활 관리 부재',
        impact: '재활 중단 및 악화 위험'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '재활 AI 기초',
          duration: '8시간',
          description: 'AI 동작 분석 이해'
        },
        {
          title: 'n8n 재활 자동화',
          duration: '12시간',
          description: '재활 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 동작 분석',
          duration: '20시간',
          description: '3D 동작 분석 및 평가'
        },
        {
          title: '맞춤형 재활 설계',
          duration: '16시간',
          description: 'AI 기반 개인 맞춤 프로그램'
        }
      ],
      executive: [
        {
          title: '재활병원 혁신',
          duration: '6시간',
          description: 'AI 활용 재활 서비스 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 시스템 구축',
        duration: '6주',
        activities: [
          '3D 동작 분석 시스템',
          'AI 재활 평가 모델',
          '원격 재활 플랫폼'
        ],
        results: [
          '동작 분석 정확도 95%',
          '실시간 진도 측정'
        ]
      },
      {
        phase: '임상 적용',
        duration: '8주',
        activities: [
          '파일럿 환자군 적용',
          '치료사 교육',
          '효과성 검증'
        ],
        results: [
          '재활 성공률 75% 향상',
          '치료 기간 40% 단축'
        ]
      },
      {
        phase: '서비스 확대',
        duration: '8주',
        activities: [
          '전체 환자 확대',
          '재택 재활 서비스',
          '보험 적용 추진'
        ],
        results: [
          '재택 재활 참여율 85%',
          '재입원율 60% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '재활 성공률',
          before: '45%',
          after: '78.75%',
          improvement: '75% 향상'
        },
        {
          metric: '평균 치료 기간',
          before: '6개월',
          after: '3.6개월',
          improvement: '40% 단축'
        },
        {
          metric: '일일 치료 환자',
          before: '50명',
          after: '85명',
          improvement: '70% 증가'
        },
        {
          metric: '재발률',
          before: '35%',
          after: '12%',
          improvement: '65.7% 감소'
        }
      ],
      financial: [
        {
          item: '치료 수익 증가',
          amount: '연 32억원'
        },
        {
          item: '재입원 비용 절감',
          amount: '연 8억원'
        },
        {
          item: 'ROI',
          amount: '10개월 내 회수'
        }
      ],
      qualitative: [
        '환자 삶의 질 대폭 개선',
        '치료사 업무 효율 향상',
        '재활 의학 선도 병원 인정'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: '3D 동작 분석',
          description: 'AI 카메라로 실시간 동작 평가',
          efficiency: '평가 시간 80% 절감'
        },
        {
          name: 'AI 재활 코치',
          description: '24/7 AI 재활 지도 및 피드백',
          efficiency: '재활 수행률 90%'
        },
        {
          name: '진도 자동 리포트',
          description: '주간/월간 재활 진도 자동 분석',
          efficiency: '관리 시간 70% 절감'
        }
      ],
      integrations: [
        'IoT 재활 기기',
        '웨어러블 센서',
        '원격 진료 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI 동작 분석 시스템 덕분에 환자의 미세한 진전도 정확히 파악할 수 있게 되었습니다. 맞춤형 재활 프로그램으로 환자들의 회복 속도가 눈에 띄게 빨라졌습니다.",
        author: "정수진",
        position: "재활의학과 과장",
        company: "하나재활병원"
      }
    ],
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '18명',
    technologies: ['Computer Vision', 'n8n', 'Unity 3D', 'IoT'],
    downloadableResources: [
      '재활병원 AI 도입 사례집',
      'AI 동작 분석 가이드'
    ]
  },

  'mental-health-clinic': {
    id: 'mental-health-clinic',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '정신건강의학',
    companyName: '마음드림 정신건강의학과 (직원 35명)',
    companySize: '중소기업',
    title: 'AI 정신건강 케어 시스템',
    subtitle: '조기 진단율 85% 향상, 치료 성공률 70% 개선',
    description: 'AI 감정 분석과 디지털 치료제로 정신건강 관리를 혁신한 선도적 사례',
    icon: Brain,
    color: 'indigo',
    heroImage: '/images/benchmark2/AI 연구 가속화 플랫폼.png',
    companyInfo: {
      industry: '정신건강의학과',
      employees: '35명',
      revenue: '연 매출 28억원',
      location: '서울시 송파구'
    },
    challenges: [
      {
        title: '조기 진단 어려움',
        description: '정신질환 초기 증상 파악 어려움',
        impact: '치료 시기를 놓쳐 만성화 위험'
      },
      {
        title: '지속 관리 한계',
        description: '내원 사이 환자 상태 파악 불가',
        impact: '급성 악화 및 응급 상황 발생'
      },
      {
        title: '치료 접근성',
        description: '대면 진료 중심으로 접근성 제한',
        impact: '치료 중단 및 사각지대 발생'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '정신건강 AI 기초',
          duration: '8시간',
          description: 'AI 감정 분석 이해'
        },
        {
          title: 'n8n 케어 자동화',
          duration: '12시간',
          description: '환자 관리 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 진단 보조',
          duration: '16시간',
          description: '음성/텍스트 기반 진단'
        },
        {
          title: '디지털 치료제',
          duration: '20시간',
          description: 'AI 기반 인지행동치료'
        }
      ],
      executive: [
        {
          title: '정신건강 서비스 혁신',
          duration: '4시간',
          description: 'AI 활용 정신건강 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 진단 시스템',
        duration: '6주',
        activities: [
          '음성/텍스트 분석 AI',
          '감정 패턴 분석',
          '위험도 예측 모델'
        ],
        results: [
          '조기 진단율 85% 향상',
          '진단 정확도 92%'
        ]
      },
      {
        phase: '디지털 치료 플랫폼',
        duration: '8주',
        activities: [
          'AI 챗봇 상담사',
          'VR 노출 치료',
          '앱 기반 CBT'
        ],
        results: [
          '24/7 케어 제공',
          '치료 접근성 300% 향상'
        ]
      },
      {
        phase: '통합 케어 시스템',
        duration: '6주',
        activities: [
          '의사-AI 협진 체계',
          '응급 알림 시스템',
          '가족 연계 케어'
        ],
        results: [
          '응급 대응 시간 80% 단축',
          '치료 지속률 85%'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '조기 진단율',
          before: '35%',
          after: '64.75%',
          improvement: '85% 향상'
        },
        {
          metric: '치료 성공률',
          before: '50%',
          after: '85%',
          improvement: '70% 개선'
        },
        {
          metric: '치료 중단율',
          before: '45%',
          after: '15%',
          improvement: '66.7% 감소'
        },
        {
          metric: '평균 치료 기간',
          before: '12개월',
          after: '7개월',
          improvement: '41.7% 단축'
        }
      ],
      financial: [
        {
          item: '신규 환자 증가',
          amount: '월 3,500만원'
        },
        {
          item: '디지털 치료 수익',
          amount: '월 2,200만원'
        },
        {
          item: 'ROI',
          amount: '6개월 내 회수'
        }
      ],
      qualitative: [
        '환자 삶의 질 획기적 개선',
        '정신건강 인식 개선',
        '지역사회 정신건강 증진'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 감정 모니터링',
          description: '일일 감정 일기 자동 분석',
          efficiency: '위험 신호 95% 감지'
        },
        {
          name: '맞춤형 CBT 프로그램',
          description: 'AI 기반 인지행동치료 자동 설계',
          efficiency: '치료 효과 70% 향상'
        },
        {
          name: '응급 대응 시스템',
          description: '자살 위험 감지 및 즉시 개입',
          efficiency: '응급 상황 90% 예방'
        }
      ],
      integrations: [
        '웨어러블 기기',
        '응급의료시스템',
        '지역 정신건강센터'
      ]
    },
    testimonials: [
      {
        quote: "AI 시스템 도입으로 환자들의 미세한 변화도 놓치지 않게 되었습니다. 특히 자살 위험을 조기에 감지하여 소중한 생명을 구할 수 있었던 것이 가장 큰 보람입니다.",
        author: "김태현",
        position: "원장",
        company: "마음드림 정신건강의학과"
      }
    ],
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '10명',
    technologies: ['NLP', 'n8n', 'VR', 'Sentiment Analysis'],
    downloadableResources: [
      '정신건강 AI 활용 가이드',
      '디지털 치료제 매뉴얼'
    ]
  }
};

// 의료/헬스케어 업종 요약 리스트 (인덱스 페이지용)
export const healthcareMedicalCases: SuccessCase[] = [
  {
    id: 'hospital-patient-care',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '종합병원',
    companyName: '서울대학교병원',
    title: 'AI 기반 환자 케어 자동화 시스템',
    description: '환자 대기시간 65% 단축, 의료진 업무 효율 80% 향상',
    metrics: {
      efficiency: '+80%',
      revenue: '+156억',
      time: '-65%',
      satisfaction: '+44%'
    },
    tags: ['의료AI', '프로세스자동화', '환자경험', 'EMR연동'],
    icon: Heart,
    color: 'red',
    featured: true
  },
  {
    id: 'clinic-operations',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '의원/클리닉',
    companyName: '강남 연세의원',
    title: '중소 의원 AI 운영 혁신',
    description: '운영 효율 70% 개선, 매출 45% 증가',
    metrics: {
      efficiency: '+70%',
      revenue: '+45%',
      time: '-69%',
      satisfaction: '+90%'
    },
    tags: ['의원자동화', '예약관리', 'AI문진', '클라우드'],
    icon: Stethoscope,
    color: 'green',
    featured: true
  },
  {
    id: 'pharmacy-automation',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '약국',
    companyName: '온누리약국 체인',
    title: '스마트 약국 운영 자동화',
    description: '처방 조제 시간 60% 단축, 재고 관리 정확도 99%',
    metrics: {
      efficiency: '+60%',
      accuracy: '99%',
      revenue: '+25억',
      inventory: '+50%'
    },
    tags: ['약국자동화', 'OCR', '재고관리', 'DUR'],
    icon: Pill,
    color: 'purple',
    featured: false
  },
  {
    id: 'dental-clinic',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '치과',
    companyName: '서울미소치과 네트워크',
    title: '치과 진료 AI 혁신 시스템',
    description: '진단 정확도 95%, 치료 계획 수립 시간 70% 단축',
    metrics: {
      accuracy: '95%',
      efficiency: '+60%',
      time: '-70%',
      revenue: '+2.5억/월'
    },
    tags: ['영상진단AI', '3D시뮬레이션', '치료계획', 'PACS'],
    icon: Activity,
    color: 'blue',
    featured: true
  },
  {
    id: 'health-checkup-center',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '건강검진센터',
    companyName: 'KMI 한국의학연구소',
    title: '건강검진 프로세스 완전 자동화',
    description: '검진 시간 50% 단축, 정확도 98% 달성',
    metrics: {
      efficiency: '+75%',
      accuracy: '98%',
      time: '-50%',
      detection: '+41.5%'
    },
    tags: ['검진자동화', 'AI판독', '예측의학', '빅데이터'],
    icon: Shield,
    color: 'orange',
    featured: false
  },
  {
    id: 'rehabilitation-center',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '재활의학',
    companyName: '하나재활병원',
    title: 'AI 재활 치료 혁신 플랫폼',
    description: '재활 성공률 75% 향상, 치료 기간 40% 단축',
    metrics: {
      success: '+75%',
      time: '-40%',
      efficiency: '+70%',
      relapse: '-65.7%'
    },
    tags: ['동작분석', '3D모션캡처', '원격재활', 'IoT'],
    icon: Users,
    color: 'teal',
    featured: true
  },
  {
    id: 'mental-health-clinic',
    category: 'healthcare',
    industry: '의료/헬스케어',
    subIndustry: '정신건강의학',
    companyName: '마음드림 정신건강의학과',
    title: 'AI 정신건강 케어 시스템',
    description: '조기 진단율 85% 향상, 치료 성공률 70% 개선',
    metrics: {
      diagnosis: '+85%',
      success: '+70%',
      dropout: '-66.7%',
      accessibility: '+300%'
    },
    tags: ['감정분석', '디지털치료제', 'VR치료', 'CBT'],
    icon: Brain,
    color: 'indigo',
    featured: false
  }
];

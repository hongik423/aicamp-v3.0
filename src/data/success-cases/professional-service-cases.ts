'use client';

import { 
  Scale, 
  Calculator, 
  Briefcase, 
  Code, 
  Users, 
  Megaphone, 
  Palette,
  TrendingUp,
  Clock,
  Target,
  Shield,
  BarChart3,
  Zap,
  Brain
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 전문서비스 업종 성공사례 데이터
export const professionalServiceCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'legal-automation': {
    id: 'legal-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '법률',
    companyName: '김앤장 법률사무소 (직원 1,200명)',
    companySize: '대기업',
    title: 'AI 법률 서비스 자동화 혁신',
    subtitle: '법률 검토 시간 70% 단축, 정확도 95% 달성',
    description: 'AI와 n8n을 활용한 법률 문서 분석과 계약 검토 자동화로 법률 서비스의 효율성과 정확성을 획기적으로 개선한 사례',
    icon: Scale,
    color: 'indigo',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    companyInfo: {
      industry: '법률사무소',
      employees: '1,200명',
      revenue: '연 매출 1조 2천억원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '방대한 문서 검토',
        description: '수천 페이지 계약서 및 법률 문서 수동 검토',
        impact: '검토 시간 과다 및 인적 오류 발생'
      },
      {
        title: '판례 검색 비효율',
        description: '관련 판례 및 법령 검색에 과도한 시간 소요',
        impact: '법률 자문 품질 저하'
      },
      {
        title: '다국어 계약 처리',
        description: '글로벌 계약의 번역 및 검토 부담',
        impact: '국제 거래 대응 지연'
      },
      {
        title: '실사(Due Diligence) 복잡성',
        description: 'M&A 실사 과정의 방대한 데이터 처리',
        impact: '실사 기간 장기화 및 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '리걸테크 AI 기초',
          duration: '16시간',
          description: '법률 분야 AI 활용 이해'
        },
        {
          title: 'n8n 법률 자동화',
          duration: '12시간',
          description: '법률 업무 프로세스 자동화'
        },
        {
          title: '법률 데이터 보안',
          duration: '10시간',
          description: 'AI 시대의 정보 보호'
        }
      ],
      advanced: [
        {
          title: 'AI 계약 분석',
          duration: '24시간',
          description: 'NLP 기반 계약서 자동 분석'
        },
        {
          title: '판례 예측 모델',
          duration: '20시간',
          description: '머신러닝 기반 판결 예측'
        },
        {
          title: '법률 챗봇 구축',
          duration: '18시간',
          description: 'AI 법률 상담 시스템'
        }
      ],
      executive: [
        {
          title: '리걸테크 전략',
          duration: '8시간',
          description: '법률사무소 디지털 전환'
        },
        {
          title: 'AI 윤리와 법률',
          duration: '6시간',
          description: 'AI 시대의 법적 이슈'
        }
      ]
    },
    process: [
      {
        phase: 'AI 문서 분석 시스템',
        duration: '10주',
        activities: [
          'OCR 및 NLP 엔진 구축',
          '계약 조항 자동 추출',
          '리스크 자동 평가',
          '다국어 번역 시스템'
        ],
        results: [
          '문서 처리 속도 10배',
          '오류 감지율 98%',
          '15개 언어 지원'
        ]
      },
      {
        phase: '판례 검색 AI',
        duration: '12주',
        activities: [
          '판례 데이터베이스 구축',
          'AI 검색 엔진 개발',
          '유사 판례 추천',
          '판결 예측 모델'
        ],
        results: [
          '검색 시간 90% 단축',
          '관련성 정확도 95%',
          '승소 예측률 82%'
        ]
      },
      {
        phase: '실사 자동화',
        duration: '14주',
        activities: [
          'AI 실사 플랫폼',
          '자동 리포트 생성',
          '이상 거래 감지',
          '규제 준수 체크'
        ],
        results: [
          '실사 기간 60% 단축',
          '비용 50% 절감',
          '정확도 97%'
        ]
      },
      {
        phase: '통합 법률 플랫폼',
        duration: '16주',
        activities: [
          '전사 시스템 통합',
          'AI 법률 비서 도입',
          '클라이언트 포털',
          '성과 분석 대시보드'
        ],
        results: [
          '생산성 85% 향상',
          '고객 만족도 92%',
          '수임료 30% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '문서 검토 시간',
          before: '평균 10시간',
          after: '평균 3시간',
          improvement: '70% 단축'
        },
        {
          metric: '계약 검토 정확도',
          before: '85%',
          after: '98%',
          improvement: '15.3% 향상'
        },
        {
          metric: '변호사 생산성',
          before: '일 5건',
          after: '일 12건',
          improvement: '140% 향상'
        },
        {
          metric: '실사 처리 기간',
          before: '평균 3개월',
          after: '평균 1.2개월',
          improvement: '60% 단축'
        },
        {
          metric: '판례 검색 시간',
          before: '건당 2시간',
          after: '건당 12분',
          improvement: '90% 절감'
        },
        {
          metric: '고객 응답 시간',
          before: '48시간',
          after: '4시간',
          improvement: '91.7% 단축'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 280억원'
        },
        {
          item: '추가 수임료 수익',
          amount: '연 450억원'
        },
        {
          item: '실사 비용 절감',
          amount: '연 120억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 520%'
        }
      ],
      qualitative: [
        '국내 리걸테크 선도 위상',
        '변호사 업무 만족도 향상',
        '국제 법률 서비스 경쟁력 강화',
        '젊은 인재 유치 성공',
        'ESG 법률 자문 선도'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 계약 검토',
          description: 'NLP 기반 계약 조항 자동 분석',
          efficiency: '검토 시간 70% 절감'
        },
        {
          name: '판례 검색 엔진',
          description: 'AI 기반 유사 판례 즉시 검색',
          efficiency: '검색 정확도 95%'
        },
        {
          name: '실사 자동화',
          description: 'M&A 실사 문서 자동 분석',
          efficiency: '처리 속도 5배'
        },
        {
          name: '법률 챗봇',
          description: '24/7 기초 법률 상담',
          efficiency: '상담 처리량 300% 증가'
        }
      ],
      integrations: [
        '법률 데이터베이스',
        '법원 전자소송 시스템',
        '글로벌 법률 네트워크',
        '클라이언트 ERP'
      ]
    },
    testimonials: [
      {
        quote: "AI 도구 덕분에 단순 문서 검토에서 벗어나 고객을 위한 전략적 자문에 집중할 수 있게 되었습니다. 특히 국제 계약 검토가 획기적으로 빨라졌습니다.",
        author: "김정훈",
        position: "시니어 파트너",
        company: "김앤장 법률사무소"
      },
      {
        quote: "실사 기간이 절반 이하로 줄어들어 M&A 딜을 훨씬 빠르게 진행할 수 있게 되었습니다. AI가 리스크를 정확히 짚어내 놀랍습니다.",
        author: "이상민",
        position: "전무",
        company: "삼성전자 법무팀"
      }
    ],
    featured: true,
    implementationPeriod: '12개월',
    teamSize: '95명',
    technologies: ['GPT-4', 'Claude', 'n8n', 'Python', 'Elasticsearch', 'Azure'],
    downloadableResources: [
      '리걸테크 도입 가이드',
      'AI 계약 검토 매뉴얼',
      '법률 자동화 ROI 계산기'
    ]
  },

  'accounting-automation': {
    id: 'accounting-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '회계',
    companyName: '삼일PwC (직원 3,500명)',
    companySize: '대기업',
    title: 'AI 회계 감사 혁신 플랫폼',
    subtitle: '감사 시간 55% 단축, 부정 탐지율 92%',
    description: 'AI와 n8n을 활용한 회계 감사 자동화와 부정 탐지로 감사 품질을 혁신적으로 개선한 사례',
    icon: Calculator,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop',
    companyInfo: {
      industry: '회계법인',
      employees: '3,500명',
      revenue: '연 매출 1조 5천억원',
      location: '서울시 용산구'
    },
    challenges: [
      {
        title: '방대한 감사 데이터',
        description: '수만 건의 거래 내역 수동 검토',
        impact: '감사 시간 증가 및 샘플링 한계'
      },
      {
        title: '부정 거래 탐지',
        description: '복잡한 부정 패턴 식별 어려움',
        impact: '회계 부정 미탐지 리스크'
      },
      {
        title: '규제 대응',
        description: '변화하는 회계 기준 적용 복잡성',
        impact: '컴플라이언스 리스크'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '회계 AI 기초',
          duration: '14시간',
          description: '회계 감사 AI 활용법'
        },
        {
          title: 'n8n 감사 자동화',
          duration: '12시간',
          description: '감사 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 이상 탐지',
          duration: '24시간',
          description: '머신러닝 부정 탐지 모델'
        },
        {
          title: '예측 분석',
          duration: '20시간',
          description: '재무 리스크 예측 모델링'
        }
      ],
      executive: [
        {
          title: '디지털 감사 전략',
          duration: '8시간',
          description: 'AI 시대 회계법인 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 감사 플랫폼 구축',
        duration: '12주',
        activities: [
          '전수 조사 자동화',
          'AI 이상 거래 탐지',
          '자동 분개 검증',
          '리스크 스코어링'
        ],
        results: [
          '감사 범위 100% 커버',
          '이상 탐지율 92%'
        ]
      },
      {
        phase: '부정 탐지 AI',
        duration: '10주',
        activities: [
          '패턴 인식 모델',
          '네트워크 분석',
          '실시간 모니터링'
        ],
        results: [
          '부정 탐지율 85% 향상',
          '오탐률 5% 미만'
        ]
      },
      {
        phase: '통합 감사 시스템',
        duration: '14주',
        activities: [
          'ERP 연동',
          '자동 보고서 생성',
          '클라이언트 포털'
        ],
        results: [
          '감사 시간 55% 단축',
          '감사 품질 40% 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '감사 소요 시간',
          before: '평균 3개월',
          after: '평균 1.35개월',
          improvement: '55% 단축'
        },
        {
          metric: '부정 탐지율',
          before: '45%',
          after: '92%',
          improvement: '104% 향상'
        },
        {
          metric: '감사 정확도',
          before: '93%',
          after: '99.2%',
          improvement: '6.7% 향상'
        },
        {
          metric: '처리 거래 수',
          before: '샘플 5%',
          after: '전수 100%',
          improvement: '20배 증가'
        }
      ],
      financial: [
        {
          item: '감사 효율화 수익',
          amount: '연 380억원'
        },
        {
          item: '추가 수임 수익',
          amount: '연 520억원'
        },
        {
          item: 'ROI',
          amount: '10개월 내 회수'
        }
      ],
      qualitative: [
        '감사 품질 국제 인증',
        '회계사 업무 만족도 향상',
        '디지털 감사 선도 기업'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 전수 감사',
          description: '100% 거래 자동 검증',
          efficiency: '감사 범위 20배 확대'
        },
        {
          name: '부정 탐지 엔진',
          description: 'ML 기반 이상 패턴 감지',
          efficiency: '탐지율 92%'
        },
        {
          name: '자동 보고서',
          description: 'AI 기반 감사 보고서 작성',
          efficiency: '작성 시간 80% 절감'
        }
      ],
      integrations: [
        'SAP/Oracle ERP',
        '국세청 시스템',
        '금융감독원 공시'
      ]
    },
    testimonials: [
      {
        quote: "AI로 전수 감사가 가능해져 샘플링의 한계를 극복했습니다. 부정 거래를 놓치지 않고 찾아낼 수 있어 감사 품질이 크게 향상되었습니다.",
        author: "박성준",
        position: "감사본부장",
        company: "삼일PwC"
      }
    ],
    featured: true,
    implementationPeriod: '10개월',
    teamSize: '120명',
    technologies: ['TensorFlow', 'n8n', 'Tableau', 'Python', 'SAP'],
    downloadableResources: [
      'AI 감사 가이드북',
      '부정 탐지 매뉴얼'
    ]
  },

  // 추가 5개 사례 (경영컨설팅, IT컨설팅, HR, 마케팅, 디자인)
  'management-consulting': {
    id: 'management-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '경영컨설팅',
    companyName: '맥킨지 한국사무소',
    title: 'AI 경영 분석 자동화',
    subtitle: '분석 시간 65% 단축, 인사이트 품질 80% 향상',
    description: 'AI를 활용한 데이터 분석과 전략 수립 자동화로 컨설팅 품질을 혁신한 사례',
    icon: Briefcase,
    color: 'blue',
    featured: false,
    implementationPeriod: '8개월',
    teamSize: '65명'
  },

  'it-consulting': {
    id: 'it-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'IT컨설팅',
    companyName: '삼성SDS',
    title: 'AI 기반 IT 컨설팅 혁신',
    subtitle: '프로젝트 기간 45% 단축, 성공률 92%',
    description: 'AI를 활용한 시스템 분석과 아키텍처 설계 자동화로 IT 컨설팅을 혁신한 사례',
    icon: Code,
    color: 'purple',
    featured: true,
    implementationPeriod: '9개월',
    teamSize: '85명'
  },

  'hr-consulting': {
    id: 'hr-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'HR/인사노무',
    companyName: '머서 코리아',
    title: 'AI HR 서비스 플랫폼',
    subtitle: '채용 효율 75% 향상, 인재 매칭 정확도 88%',
    description: 'AI를 활용한 인재 채용과 조직 진단 자동화로 HR 서비스를 혁신한 사례',
    icon: Users,
    color: 'orange',
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '42명'
  },

  'marketing-agency': {
    id: 'marketing-agency',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '마케팅에이전시',
    companyName: '제일기획',
    title: 'AI 마케팅 자동화 플랫폼',
    subtitle: '캠페인 효율 120% 향상, ROI 185% 개선',
    description: 'AI를 활용한 마케팅 전략 수립과 캠페인 최적화로 마케팅 성과를 극대화한 사례',
    icon: Megaphone,
    color: 'red',
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '58명'
  },

  'design-branding': {
    id: 'design-branding',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '디자인/브랜딩',
    companyName: '플러스엑스',
    title: 'AI 디자인 생성 혁신',
    subtitle: '디자인 생산성 200% 향상, 고객 만족도 95%',
    description: 'AI를 활용한 디자인 자동 생성과 브랜딩 최적화로 창의성과 효율성을 극대화한 사례',
    icon: Palette,
    color: 'pink',
    featured: false,
    implementationPeriod: '5개월',
    teamSize: '35명'
  }
};

// 전문서비스 업종 요약 리스트
export const professionalServiceCases: SuccessCase[] = [
  {
    id: 'legal-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '법률',
    companyName: '김앤장',
    title: 'AI 법률 서비스 자동화 혁신',
    description: '법률 검토 시간 70% 단축, 정확도 95% 달성',
    metrics: {
      time: '-70%',
      accuracy: '98%',
      productivity: '+140%',
      revenue: '+30%'
    },
    tags: ['리걸테크', '계약분석', '판례검색', 'AI실사'],
    icon: Scale,
    color: 'indigo',
    featured: true
  },
  {
    id: 'accounting-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '회계',
    companyName: '삼일PwC',
    title: 'AI 회계 감사 혁신 플랫폼',
    description: '감사 시간 55% 단축, 부정 탐지율 92%',
    metrics: {
      time: '-55%',
      detection: '92%',
      coverage: '100%',
      accuracy: '99.2%'
    },
    tags: ['회계자동화', '부정탐지', '전수감사', 'AI감사'],
    icon: Calculator,
    color: 'green',
    featured: true
  },
  {
    id: 'management-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '경영컨설팅',
    companyName: '맥킨지',
    title: 'AI 경영 분석 자동화',
    description: '분석 시간 65% 단축, 인사이트 품질 80% 향상',
    metrics: {
      time: '-65%',
      quality: '+80%',
      projects: '+45%',
      accuracy: '94%'
    },
    tags: ['경영분석', '전략수립', '데이터분석', 'AI인사이트'],
    icon: Briefcase,
    color: 'blue',
    featured: false
  },
  {
    id: 'it-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'IT컨설팅',
    companyName: '삼성SDS',
    title: 'AI 기반 IT 컨설팅 혁신',
    description: '프로젝트 기간 45% 단축, 성공률 92%',
    metrics: {
      duration: '-45%',
      success: '92%',
      quality: '+75%',
      cost: '-38%'
    },
    tags: ['IT컨설팅', '시스템분석', '아키텍처설계', 'AI진단'],
    icon: Code,
    color: 'purple',
    featured: true
  },
  {
    id: 'hr-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'HR/인사노무',
    companyName: '머서',
    title: 'AI HR 서비스 플랫폼',
    description: '채용 효율 75% 향상, 인재 매칭 정확도 88%',
    metrics: {
      efficiency: '+75%',
      matching: '88%',
      time: '-60%',
      retention: '+45%'
    },
    tags: ['HR테크', 'AI채용', '조직진단', '인재매칭'],
    icon: Users,
    color: 'orange',
    featured: false
  },
  {
    id: 'marketing-agency',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '마케팅에이전시',
    companyName: '제일기획',
    title: 'AI 마케팅 자동화 플랫폼',
    description: '캠페인 효율 120% 향상, ROI 185% 개선',
    metrics: {
      efficiency: '+120%',
      roi: '+185%',
      conversion: '+95%',
      cost: '-42%'
    },
    tags: ['마케팅자동화', 'AI캠페인', '성과예측', '타겟팅'],
    icon: Megaphone,
    color: 'red',
    featured: true
  },
  {
    id: 'design-branding',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '디자인/브랜딩',
    companyName: '플러스엑스',
    title: 'AI 디자인 생성 혁신',
    description: '디자인 생산성 200% 향상, 고객 만족도 95%',
    metrics: {
      productivity: '+200%',
      satisfaction: '95%',
      time: '-70%',
      quality: '+85%'
    },
    tags: ['AI디자인', '자동생성', '브랜딩', '크리에이티브'],
    icon: Palette,
    color: 'pink',
    featured: false
  }
];

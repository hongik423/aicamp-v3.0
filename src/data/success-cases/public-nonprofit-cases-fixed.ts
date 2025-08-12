'use client';

import { 
  Building2, 
  Heart, 
  School, 
  Users,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Zap,
  Award,
  MapPin,
  AlertTriangle,
  Siren,
  FileText,
  Vote,
  HandHeart
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 공공/비영리 업종 성공사례 데이터
export const publicNonprofitCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'government-digital-transformation': {
    id: 'government-digital-transformation',
    category: 'public',
    industry: '공공/비영리',
    subIndustry: '정부기관',
    companyName: '행정안전부 (직원 12,000명)',
    companySize: '정부기관',
    title: 'AI 기반 디지털 정부 통합 플랫폼',
    subtitle: '민원 처리 시간 78% 단축, 시민 만족도 92% 달성',
    description: 'AI와 n8n을 활용한 정부 서비스 완전 디지털화로 국민 중심의 혁신적인 전자정부를 구현한 공공 혁신 사례',
    icon: Building2,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '중앙정부기관',
      employees: '12,000명',
      revenue: '연 예산 85조원',
      location: '세종특별자치시'
    },
    challenges: [
      {
        title: '복잡한 행정 프로세스',
        description: '부처 간 칸막이와 중복 업무로 인한 비효율',
        impact: '민원 처리 지연 및 국민 불편'
      },
      {
        title: '데이터 사일로',
        description: '부처별 분산된 데이터로 통합 서비스 한계',
        impact: '정책 의사결정 지연 및 정확도 저하'
      },
      {
        title: '디지털 격차',
        description: '고령층, 취약계층의 디지털 서비스 접근성',
        impact: '공공서비스 형평성 문제'
      },
      {
        title: '보안 위협',
        description: '사이버 공격 및 개인정보 유출 위험',
        impact: '국가 안보 및 국민 신뢰 위협'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '디지털 정부 AI 기초',
          duration: '16시간',
          description: '공공 분야 AI 활용 이해'
        },
        {
          title: 'n8n 행정 자동화',
          duration: '14시간',
          description: '민원 처리 프로세스 자동화'
        },
        {
          title: '데이터 기반 행정',
          duration: '12시간',
          description: '빅데이터 정책 수립'
        }
      ],
      advanced: [
        {
          title: 'AI 정책 의사결정',
          duration: '24시간',
          description: '머신러닝 기반 정책 분석'
        },
        {
          title: '스마트 보안 시스템',
          duration: '20시간',
          description: 'AI 사이버 보안 구축'
        },
        {
          title: '시민 참여 플랫폼',
          duration: '18시간',
          description: 'AI 기반 국민 소통'
        }
      ],
      executive: [
        {
          title: '디지털 정부 전략',
          duration: '8시간',
          description: 'AI 시대 정부 혁신'
        },
        {
          title: '데이터 거버넌스',
          duration: '6시간',
          description: '공공 데이터 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 민원 처리 시스템',
        duration: '12주',
        activities: [
          'AI 챗봇 상담 시스템',
          '자동 민원 분류/배정',
          '지능형 문서 처리',
          '통합 민원 포털 구축'
        ],
        results: [
          '민원 처리 시간 78% 단축',
          '24시간 365일 서비스',
          '처리 정확도 96%'
        ]
      },
      {
        phase: '데이터 통합 플랫폼',
        duration: '16주',
        activities: [
          '범정부 데이터 레이크',
          'AI 데이터 분석 엔진',
          '실시간 정책 대시보드',
          '예측 정책 모델링'
        ],
        results: [
          '350개 기관 데이터 통합',
          '정책 수립 시간 65% 단축',
          '예측 정확도 89%'
        ]
      },
      {
        phase: '디지털 포용 서비스',
        duration: '10주',
        activities: [
          'AI 음성 인터페이스',
          '다국어 자동 번역',
          '시각장애인 지원 AI',
          '찾아가는 디지털 서비스'
        ],
        results: [
          '접근성 95% 달성',
          '디지털 격차 70% 해소',
          '취약계층 만족도 88%'
        ]
      },
      {
        phase: 'AI 보안 체계 구축',
        duration: '14주',
        activities: [
          'AI 위협 탐지 시스템',
          '블록체인 신원 인증',
          '양자암호 통신',
          '자동 보안 대응'
        ],
        results: [
          '보안 사고 92% 예방',
          '개인정보 유출 Zero',
          '해킹 시도 99.9% 차단'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '민원 처리 시간',
          before: '평균 7일',
          after: '평균 1.54일',
          improvement: '78% 단축'
        },
        {
          metric: '시민 만족도',
          before: '62%',
          after: '92%',
          improvement: '48.4% 향상'
        },
        {
          metric: '행정 비용',
          before: '연 8,500억원',
          after: '연 4,250억원',
          improvement: '50% 절감'
        },
        {
          metric: '디지털 서비스 이용률',
          before: '45%',
          after: '87%',
          improvement: '93.3% 증가'
        },
        {
          metric: '정책 수립 기간',
          before: '평균 6개월',
          after: '평균 2.1개월',
          improvement: '65% 단축'
        },
        {
          metric: '공무원 생산성',
          before: '100%',
          after: '285%',
          improvement: '185% 향상'
        }
      ],
      financial: [
        {
          item: '행정 비용 절감',
          amount: '연 4,250억원'
        },
        {
          item: '종이 문서 절감',
          amount: '연 350억원'
        },
        {
          item: '부정수급 방지',
          amount: '연 1,850억원'
        },
        {
          item: '총 경제 효과',
          amount: '연 2.5조원'
        }
      ],
      qualitative: [
        'UN 전자정부 평가 1위 달성',
        'OECD 디지털 정부 지수 최우수',
        '국민 신뢰도 역대 최고 기록',
        '공무원 직무 만족도 대폭 향상',
        '국제 벤치마킹 대상국 선정'
      ]
    },
    testimonial: {
      quote: "AI 시스템 도입 후 복잡했던 민원 처리가 자동화되어 국민들께 더 빠르고 정확한 서비스를 제공할 수 있게 되었습니다. 특히 24시간 AI 상담으로 언제든 도움을 드릴 수 있어 만족도가 크게 높아졌습니다.",
      author: "김정부",
      position: "디지털정부국장",
      company: "행정안전부"
    },
    followUpResults: [
      {
        metric: '연간 민원 처리량',
        achievement: '전년 대비 320% 증가'
      },
      {
        metric: '정책 실행 속도',
        achievement: '평균 2.5배 향상'
      }
    ],
    tags: ['디지털정부', 'AI민원', '데이터통합', '보안'],
    // AI & n8n 자동화 특화 필드
    automationMetrics: {
      timeReduction: '78%',
      costSaving: '연 4,250억원',
      errorReduction: '92%',
      productivityGain: '185%'
    },
    n8nWorkflows: [
      {
        workflowName: 'AI 민원 처리',
        description: '자동 분류, 처리, 답변 생성',
        triggerType: '민원 접수',
        integrations: ['정부24', 'AI 엔진', '부처 시스템'],
        executionCount: 50000
      },
      {
        workflowName: '정책 영향 분석',
        description: 'AI 시뮬레이션 정책 예측',
        triggerType: '정책 수립',
        integrations: ['빅데이터', 'AI 모델', '통계청'],
        executionCount: 2000
      },
      {
        workflowName: '보안 위협 대응',
        description: '실시간 탐지 및 자동 차단',
        triggerType: '이상 감지',
        integrations: ['보안 시스템', 'AI 분석', '대응 체계'],
        executionCount: 100000
      }
    ],
    aiImplementations: [
      {
        aiTool: 'NLP 챗봇',
        useCase: '민원 상담',
        accuracy: '96%',
        processingTime: '평균 30초'
      },
      {
        aiTool: '예측 분석',
        useCase: '정책 효과 예측',
        accuracy: '89%',
        processingTime: '평균 5분'
      },
      {
        aiTool: '이상 탐지',
        useCase: '보안 위협 감지',
        accuracy: '99.9%',
        processingTime: '실시간'
      }
    ],
    roiData: {
      investment: '500억원',
      monthlySavings: '354억원',
      paybackPeriod: '1.4개월',
      threeYearROI: '2,550%'
    },
    implementationTimeline: '12개월',
    successFactors: [
      '최고 리더십의 강력한 디지털 전환 의지',
      '부처 간 협업과 데이터 공유 문화 조성',
      '공무원 AI 역량 강화 교육 프로그램',
      '국민 중심 서비스 설계와 지속적 개선'
    ],
    featured: true
  }
};

// 공공/비영리 업종 요약 리스트
export const publicNonprofitCases: SuccessCase[] = [
  {
    id: 'government-digital-transformation',
    category: 'public',
    industry: '공공/비영리',
    companyName: '행정안전부',
    title: 'AI 기반 디지털 정부 통합 플랫폼',
    description: '민원 처리 시간 78% 단축, 시민 만족도 92% 달성',
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=250&fit=crop&crop=center',
    icon: Building2,
    color: 'blue',
    results: {
      efficiency: '185% 향상',
      satisfaction: '92% 달성'
    },
    tags: ['디지털정부', 'AI민원', '데이터통합', '보안'],
    featured: true
  }
];

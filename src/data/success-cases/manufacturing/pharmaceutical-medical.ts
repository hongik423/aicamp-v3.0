'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Pill, Heart, Shield, Activity } from 'lucide-react';

export const pharmaceuticalMedicalCase: SuccessCaseDetail = {
  id: 'pharmaceutical-medical-001',
  category: 'manufacturing',
  industry: '제조/생산',
  subIndustry: '제약/의료기기',
  companyName: '바이오팜코리아',
  companySize: 'large',
  title: 'AI 신약 개발로 임상 성공률 3배 향상',
  subtitle: 'n8n 자동화와 AI 분석으로 혁신한 R&D 프로세스',
  description: 'AI 기반 약물 설계와 n8n 연구 데이터 자동화를 통해 신약 개발 기간을 50% 단축하고 임상 성공률을 획기적으로 높인 혁신 사례',
  icon: Pill,
  color: 'purple',
  heroImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070',
  
  companyInfo: {
    industry: '제약 및 의료기기 제조',
    employees: '800명',
    revenue: '1,200억원',
    location: '충북 오송바이오단지'
  },

  challenges: [
    {
      title: '높은 신약 개발 실패율',
      description: '전통적 방법으로 10년 이상 소요되는 개발 과정에서 90% 이상 실패',
      impact: '연구개발 투자 대비 성공률 10% 미만'
    },
    {
      title: '임상 데이터 관리 복잡성',
      description: '수만 건의 임상 데이터를 수작업으로 관리하여 오류 빈발',
      impact: '데이터 오류로 인한 재작업 30% 발생'
    },
    {
      title: 'GMP 규제 대응 어려움',
      description: '까다로운 품질 관리 기준과 문서화 요구사항 충족 부담',
      impact: '규제 대응 인력 비용 연간 20억원'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI in Drug Discovery',
        duration: '2주',
        description: '머신러닝 기반 약물 스크리닝 기초'
      },
      {
        title: '임상 데이터 분석',
        duration: '2주',
        description: '통계 분석과 데이터 시각화 기법'
      },
      {
        title: 'GxP 규제와 자동화',
        duration: '1주',
        description: 'n8n을 활용한 규제 준수 자동화'
      }
    ],
    advanced: [
      {
        title: 'AI 약물 설계 모델링',
        duration: '4주',
        description: '분자 구조 예측과 약물-표적 상호작용 분석'
      },
      {
        title: '임상시험 최적화',
        duration: '3주',
        description: 'AI 기반 환자 선별과 프로토콜 최적화'
      },
      {
        title: '품질관리 자동화',
        duration: '2주',
        description: 'Computer Vision을 활용한 품질 검사'
      }
    ],
    executive: [
      {
        title: 'R&D 혁신 전략',
        duration: '3일',
        description: 'AI 기반 신약 개발 파이프라인 구축'
      },
      {
        title: '규제 대응 전략',
        duration: '2일',
        description: 'FDA/MFDS 승인 프로세스 최적화'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 연구 데이터 통합',
      duration: '6주',
      activities: [
        '분산된 연구 데이터 통합 플랫폼 구축',
        'LIMS/ELN 시스템 연동',
        '데이터 표준화 및 품질 관리 체계 수립'
      ],
      results: [
        '500TB 연구 데이터 통합',
        '데이터 접근성 95% 향상',
        '연구 데이터 재사용률 80% 증가'
      ]
    },
    {
      phase: '2단계: AI 모델 개발',
      duration: '16주',
      activities: [
        '약물-표적 상호작용 예측 모델 개발',
        '독성 및 부작용 예측 시스템 구축',
        '임상 성공률 예측 알고리즘 구현'
      ],
      results: [
        '후보 물질 스크리닝 시간 90% 단축',
        '독성 예측 정확도 88% 달성',
        '임상 2상 진입률 300% 향상'
      ]
    },
    {
      phase: '3단계: n8n 프로세스 자동화',
      duration: '8주',
      activities: [
        '임상시험 데이터 수집 자동화',
        'FDA 제출 문서 자동 생성',
        '품질관리 워크플로우 구축'
      ],
      results: [
        '60개 자동화 워크플로우 구축',
        '문서 작성 시간 70% 절감',
        '규제 대응 속도 2배 향상'
      ]
    },
    {
      phase: '4단계: 전사 확산',
      duration: '10주',
      activities: [
        '전체 R&D 파이프라인 AI 적용',
        '연구원 AI 도구 활용 교육',
        '지속 개선 체계 구축'
      ],
      results: [
        '15개 신약 프로젝트 AI 적용',
        '150명 연구원 교육 완료',
        '월 20건 AI 기반 인사이트 도출'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '신약 개발 기간',
        before: '12년',
        after: '6년',
        improvement: '-50%'
      },
      {
        metric: '임상 성공률',
        before: '10%',
        after: '32%',
        improvement: '+220%'
      },
      {
        metric: '연구 생산성',
        before: '100% (기준)',
        after: '280%',
        improvement: '+180%'
      },
      {
        metric: '데이터 오류율',
        before: '5%',
        after: '0.2%',
        improvement: '-96%'
      }
    ],
    financial: [
      {
        item: '연구개발 비용 절감',
        amount: '연간 150억원'
      },
      {
        item: '신약 조기 출시 수익',
        amount: '예상 500억원'
      },
      {
        item: '임상 실패 비용 절감',
        amount: '연간 80억원'
      }
    ],
    qualitative: [
      '국내 최초 AI 설계 신약 임상 3상 진입',
      'FDA Fast Track 지정 2건 획득',
      '글로벌 제약사와 기술 이전 계약 체결',
      '연구원 직무 만족도 90% 달성'
    ]
  },

  automationMetrics: {
    timeReduction: '70%',
    costSaving: '230억원/년',
    errorReduction: '96%',
    productivityGain: '180%'
  },

  n8nWorkflows: [
    {
      name: '임상 데이터 자동 수집',
      description: 'EDC 시스템에서 데이터 자동 수집 및 검증',
      nodes: 35,
      triggers: ['Data Entry', 'Schedule'],
      actions: ['Validation', 'Database Update', 'Alert']
    },
    {
      name: 'FDA 제출 문서 생성',
      description: 'IND/NDA 제출 서류 자동 작성 및 검토',
      nodes: 42,
      triggers: ['Milestone', 'Request'],
      actions: ['Document Generation', 'Review Workflow', 'Submission']
    },
    {
      name: '품질 이상 대응',
      description: 'GMP 일탈 사항 자동 감지 및 CAPA 프로세스',
      nodes: 28,
      triggers: ['Quality Event', 'Sensor Alert'],
      actions: ['Investigation', 'CAPA Creation', 'Notification']
    }
  ],

  aiImplementations: [
    {
      type: 'Drug-Target Interaction AI',
      purpose: '신약 후보 물질 스크리닝',
      accuracy: '91%',
      processingTime: '2시간/10만 화합물'
    },
    {
      type: 'Clinical Trial Optimization',
      purpose: '최적 환자군 선별 및 프로토콜 설계',
      accuracy: '85%',
      processingTime: '30분/프로토콜'
    },
    {
      type: 'Adverse Event Prediction',
      purpose: '부작용 조기 예측',
      accuracy: '88%',
      processingTime: '실시간'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n 도입은 우리 회사의 R&D 패러다임을 완전히 바꿨습니다. 예전에는 10년 걸려도 성공을 장담할 수 없었던 신약 개발이 이제는 6년 만에 높은 확률로 성공할 수 있게 되었습니다. 특히 AI가 제시하는 인사이트는 연구원들도 놓치기 쉬운 부분을 정확히 짚어내 주었고, n8n 자동화로 복잡한 규제 대응도 수월해졌습니다.',
    author: '정미경',
    position: '연구소장',
    company: '바이오팜코리아'
  },

  followUpResults: [
    {
      metric: '파이프라인 가치',
      achievement: '3,000억원 → 8,500억원 (2년간)'
    },
    {
      metric: '특허 출원',
      achievement: 'AI 기반 신약 특허 25건 출원'
    },
    {
      metric: '글로벌 파트너십',
      achievement: '5개 글로벌 제약사와 공동 연구'
    }
  ],

  roiData: {
    investment: '50억원',
    monthlySavings: '19.2억원',
    paybackPeriod: '2.6개월',
    threeYearROI: '1,380%'
  },

  implementationTimeline: '10개월',
  
  successFactors: [
    '도메인 전문가와 AI 전문가의 긴밀한 협업',
    '규제 요구사항을 고려한 시스템 설계',
    '단계별 검증을 통한 신뢰성 확보',
    '지속적인 모델 업데이트 체계',
    '글로벌 연구 네트워크 활용'
  ],

  tags: ['제약', '신약개발', 'R&D', 'GMP', '임상시험', 'n8n자동화'],
  featured: true
};

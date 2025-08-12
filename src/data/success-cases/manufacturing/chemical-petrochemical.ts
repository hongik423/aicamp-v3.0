'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Flask, Droplets, AlertTriangle, LineChart } from 'lucide-react';

export const chemicalPetrochemicalCase: SuccessCaseDetail = {
  id: 'chemical-petrochemical-001',
  category: 'manufacturing',
  industry: '제조/생산',
  subIndustry: '화학/석유화학',
  companyName: '대한석유화학',
  companySize: 'enterprise',
  title: 'AI 공정 최적화로 에너지 효율 40% 개선',
  subtitle: '실시간 화학 반응 예측과 n8n 자동 제어 시스템',
  description: 'AI 기반 화학 공정 시뮬레이션과 n8n 자동화를 통해 에너지 소비를 최소화하고 생산 수율을 극대화한 친환경 스마트 플랜트 구축 사례',
  icon: Flask,
  color: 'green',
  heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070',
  
  companyInfo: {
    industry: '석유화학 제품 제조',
    employees: '3,500명',
    revenue: '2조 5천억원',
    location: '울산광역시'
  },

  challenges: [
    {
      title: '복잡한 화학 반응 제어',
      description: '수백 개의 변수가 상호작용하는 화학 공정을 수동으로 최적화하는 한계',
      impact: '에너지 과소비로 연간 200억원 추가 비용 발생'
    },
    {
      title: '환경 규제 대응 어려움',
      description: '강화되는 탄소 배출 규제와 환경 기준 충족 압박',
      impact: '탄소 배출권 구매 비용 연간 150억원'
    },
    {
      title: '안전 사고 리스크',
      description: '고온·고압 환경에서의 작업자 안전 위험과 사고 가능성',
      impact: '연간 5~10건의 안전 사고 발생'
    }
  ],

  curriculum: {
    basic: [
      {
        title: '화학공정과 AI 기초',
        duration: '2주',
        description: '화학공학 기본 원리와 AI 적용 가능성 이해'
      },
      {
        title: '프로세스 데이터 분석',
        duration: '2주',
        description: 'DCS/SCADA 데이터 수집 및 분석 방법'
      },
      {
        title: 'n8n 프로세스 자동화',
        duration: '1주',
        description: '화학 공정 모니터링 자동화 워크플로우 구축'
      }
    ],
    advanced: [
      {
        title: '화학 반응 예측 모델링',
        duration: '4주',
        description: '딥러닝 기반 반응 속도 및 수율 예측 모델 개발'
      },
      {
        title: '에너지 최적화 알고리즘',
        duration: '3주',
        description: '강화학습을 통한 에너지 소비 최적화'
      },
      {
        title: '안전 관리 AI 시스템',
        duration: '3주',
        description: '컴퓨터 비전 기반 위험 감지 시스템 구축'
      }
    ],
    executive: [
      {
        title: '친환경 경영 전략',
        duration: '3일',
        description: 'ESG 경영과 디지털 전환 통합 전략'
      },
      {
        title: '스마트 플랜트 ROI',
        duration: '2일',
        description: '투자 효과 분석과 단계별 구축 전략'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 데이터 인프라 구축',
      duration: '8주',
      activities: [
        '전체 공정 센서 데이터 통합 플랫폼 구축',
        '실시간 데이터 레이크 구성',
        'OT/IT 통합 아키텍처 설계'
      ],
      results: [
        '3,000개 센서 데이터 실시간 수집',
        '초당 100만 데이터 포인트 처리',
        '데이터 정확도 99.8% 확보'
      ]
    },
    {
      phase: '2단계: AI 모델 개발',
      duration: '12주',
      activities: [
        '화학 반응 예측 모델 개발',
        '에너지 소비 최적화 알고리즘 구현',
        '품질 예측 및 이상 감지 시스템 구축'
      ],
      results: [
        '반응 수율 예측 정확도 95%',
        '에너지 최적화 시뮬레이션 완료',
        '품질 이상 조기 감지율 92%'
      ]
    },
    {
      phase: '3단계: n8n 자동 제어 구현',
      duration: '6주',
      activities: [
        'AI 예측 기반 자동 제어 로직 구현',
        '안전 임계값 자동 모니터링 시스템',
        '실시간 대시보드 및 알림 체계 구축'
      ],
      results: [
        '45개 자동화 제어 루프 구현',
        '24/7 무인 모니터링 체계 구축',
        '이상 상황 대응 시간 90% 단축'
      ]
    },
    {
      phase: '4단계: 전체 플랜트 적용',
      duration: '12주',
      activities: [
        '모든 생산 라인 AI 시스템 적용',
        '운전원 AI 활용 교육',
        '지속 개선 체계 구축'
      ],
      results: [
        '8개 생산 라인 전체 적용',
        '200명 운전원 교육 완료',
        'AI 모델 자동 재학습 체계 구축'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '에너지 효율',
        before: '100% (기준)',
        after: '140%',
        improvement: '+40%'
      },
      {
        metric: '생산 수율',
        before: '82%',
        after: '94%',
        improvement: '+14.6%'
      },
      {
        metric: '탄소 배출량',
        before: '100만톤/년',
        after: '65만톤/년',
        improvement: '-35%'
      },
      {
        metric: '안전 사고',
        before: '8건/년',
        after: '0건/년',
        improvement: '-100%'
      }
    ],
    financial: [
      {
        item: '에너지 비용 절감',
        amount: '연간 180억원'
      },
      {
        item: '탄소 배출권 비용 절감',
        amount: '연간 120억원'
      },
      {
        item: '생산성 향상 수익',
        amount: '연간 250억원'
      }
    ],
    qualitative: [
      'ISO 50001 에너지경영시스템 인증 획득',
      '환경부 녹색 기업 대상 수상',
      '무재해 1,000일 달성',
      '업계 최초 AI 기반 완전 자동 공정 제어 실현'
    ]
  },

  automationMetrics: {
    timeReduction: '80%',
    costSaving: '550억원/년',
    errorReduction: '92%',
    productivityGain: '40%'
  },

  n8nWorkflows: [
    {
      name: '실시간 공정 최적화',
      description: 'AI 예측을 기반으로 온도, 압력, 유량 자동 조절',
      nodes: 38,
      triggers: ['Sensor Data', 'AI Prediction'],
      actions: ['DCS Control', 'Parameter Adjustment', 'Log Recording']
    },
    {
      name: '환경 모니터링 자동화',
      description: '배출 가스 및 폐수 실시간 모니터링과 규제 준수 보고',
      nodes: 25,
      triggers: ['Environmental Sensors', 'Regulatory Schedule'],
      actions: ['Alert System', 'Report Generation', 'Government API']
    },
    {
      name: '안전 관리 워크플로우',
      description: 'AI 비전 기반 위험 감지 및 긴급 대응 자동화',
      nodes: 30,
      triggers: ['CCTV Analysis', 'Gas Detectors', 'Temperature Sensors'],
      actions: ['Emergency Shutdown', 'Evacuation Alert', 'Fire System']
    }
  ],

  aiImplementations: [
    {
      type: 'Chemical Process Simulation AI',
      purpose: '화학 반응 예측 및 최적 조건 도출',
      accuracy: '95%',
      processingTime: '30초/시뮬레이션'
    },
    {
      type: 'Reinforcement Learning',
      purpose: '에너지 소비 최적화',
      accuracy: '92%',
      processingTime: '실시간'
    },
    {
      type: 'Computer Vision',
      purpose: '안전 위험 요소 감지',
      accuracy: '98%',
      processingTime: '0.1초/프레임'
    }
  ],

  testimonial: {
    quote: '처음에는 화학 공정에 AI를 적용한다는 것이 매우 도전적으로 보였습니다. 하지만 단계적 접근과 철저한 검증을 통해 놀라운 성과를 달성했습니다. 특히 에너지 효율 40% 개선은 업계에서 혁명적인 수치입니다. n8n 자동화로 운전원들이 더 안전하고 효율적으로 일할 수 있게 되었고, 무엇보다 탄소 중립 목표에 크게 다가갈 수 있었습니다.',
    author: '이준호',
    position: 'CTO',
    company: '대한석유화학'
  },

  followUpResults: [
    {
      metric: 'ESG 평가 등급',
      achievement: 'B → A+ (1년 만에 2단계 상승)'
    },
    {
      metric: '글로벌 경쟁력',
      achievement: '업계 생산 효율성 세계 3위 달성'
    },
    {
      metric: '그린 제품 비중',
      achievement: '15% → 45% 증가'
    }
  ],

  roiData: {
    investment: '80억원',
    monthlySavings: '45.8억원',
    paybackPeriod: '1.7개월',
    threeYearROI: '2,065%'
  },

  implementationTimeline: '9개월',
  
  successFactors: [
    '화학공학 전문가와 AI 엔지니어의 융합팀 구성',
    '철저한 안전성 검증 프로세스',
    '단계별 파일럿 테스트 진행',
    '실시간 피드백 기반 모델 개선',
    '전사적 친환경 경영 비전 공유'
  ],

  tags: ['석유화학', '에너지효율', '탄소중립', '안전관리', 'ESG', 'n8n자동화'],
  featured: true
};

'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Settings, Wrench, Gauge, Cog } from 'lucide-react';

export const machineryEquipmentCase: SuccessCaseDetail = {
  id: 'machinery-equipment-001',
  category: 'manufacturing',
  industry: '제조/생산',
  subIndustry: '기계/장비',
  companyName: '한국정밀기계',
  companySize: 'large',
  title: 'AI 예측정비로 설비 가동률 98% 달성',
  subtitle: 'IoT 센서와 n8n 통합으로 구현한 지능형 설비 관리',
  description: '머신러닝 기반 고장 예측과 n8n 자동화를 통해 비계획 정지를 95% 감소시키고, 정비 비용을 60% 절감한 혁신 사례',
  icon: Settings,
  color: 'orange',
  heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070',
  
  companyInfo: {
    industry: '산업용 기계 제조',
    employees: '1,200명',
    revenue: '3,500억원',
    location: '경남 창원시'
  },

  challenges: [
    {
      title: '예상치 못한 설비 고장',
      description: 'CNC 공작기계, 프레스 등 핵심 설비의 돌발 고장으로 생산 차질 빈발',
      impact: '월평균 120시간 비계획 정지, 연간 80억원 손실'
    },
    {
      title: '과도한 예방정비 비용',
      description: '불필요한 부품 교체와 과도한 정비로 인한 비용 증가',
      impact: '연간 정비 비용 45억원, 30% 과다 지출'
    },
    {
      title: '정비 이력 관리 부실',
      description: '수기 작성 정비 일지로 인한 데이터 활용 불가',
      impact: '정비 효율성 분석 불가, 개선점 파악 어려움'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'IoT 센서 데이터 이해',
        duration: '1주',
        description: '진동, 온도, 압력 센서 데이터 수집 및 분석 기초'
      },
      {
        title: 'AI 예측 분석 기초',
        duration: '2주',
        description: '시계열 데이터 분석과 이상 탐지 알고리즘'
      },
      {
        title: 'n8n 워크플로우 설계',
        duration: '1주',
        description: '센서 데이터 수집부터 알림까지 자동화 구축'
      }
    ],
    advanced: [
      {
        title: '예측정비 AI 모델 개발',
        duration: '4주',
        description: 'LSTM/Random Forest를 활용한 고장 예측 모델 구현'
      },
      {
        title: '디지털 트윈 구축',
        duration: '3주',
        description: '실시간 설비 상태 시뮬레이션 시스템 개발'
      },
      {
        title: '통합 모니터링 시스템',
        duration: '2주',
        description: 'SCADA 연동 및 실시간 대시보드 구축'
      }
    ],
    executive: [
      {
        title: '스마트 제조 전략',
        duration: '3일',
        description: 'Industry 4.0 전환 로드맵과 투자 전략'
      },
      {
        title: 'OEE 최적화 방법론',
        duration: '2일',
        description: '설비종합효율 향상을 위한 경영 전략'
      }
    ]
  },

  process: [
    {
      phase: '1단계: IoT 인프라 구축',
      duration: '6주',
      activities: [
        '150대 핵심 설비에 IoT 센서 설치',
        '실시간 데이터 수집 플랫폼 구축',
        '기존 MES/ERP 시스템 연동'
      ],
      results: [
        '분당 50만개 데이터 포인트 수집',
        '데이터 수집률 99.5% 달성',
        '통합 데이터 레이크 구축 완료'
      ]
    },
    {
      phase: '2단계: AI 예측 모델 개발',
      duration: '10주',
      activities: [
        '3년간 정비 이력 데이터 정제 및 라벨링',
        '설비별 맞춤형 예측 모델 개발',
        'A/B 테스트를 통한 모델 검증'
      ],
      results: [
        '고장 예측 정확도 89% 달성',
        '평균 7일 전 고장 징후 포착',
        '오탐율 5% 이하 달성'
      ]
    },
    {
      phase: '3단계: n8n 자동화 워크플로우',
      duration: '4주',
      activities: [
        '예측 알림 자동화 시스템 구축',
        '정비 작업 지시 자동 생성',
        '부품 재고 자동 발주 시스템 연동'
      ],
      results: [
        '35개 자동화 워크플로우 구축',
        '정비 대응 시간 75% 단축',
        '부품 재고 30% 감소'
      ]
    },
    {
      phase: '4단계: 전사 확산 및 고도화',
      duration: '8주',
      activities: [
        '전체 설비로 시스템 확대',
        '정비 팀 AI 활용 교육',
        '지속 개선 프로세스 정립'
      ],
      results: [
        '500대 설비 적용 완료',
        '정비 인력 80% 교육 이수',
        '월 평균 15건 개선 아이디어 도출'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '설비 가동률(OEE)',
        before: '68%',
        after: '98%',
        improvement: '+44%'
      },
      {
        metric: '비계획 정지 시간',
        before: '120시간/월',
        after: '6시간/월',
        improvement: '-95%'
      },
      {
        metric: '정비 비용',
        before: '45억원/년',
        after: '18억원/년',
        improvement: '-60%'
      },
      {
        metric: 'MTBF(평균고장간격)',
        before: '720시간',
        after: '2,880시간',
        improvement: '+300%'
      }
    ],
    financial: [
      {
        item: '생산 손실 감소',
        amount: '연간 75억원'
      },
      {
        item: '정비 비용 절감',
        amount: '연간 27억원'
      },
      {
        item: '재고 비용 절감',
        amount: '연간 8억원'
      }
    ],
    qualitative: [
      '정비 팀 업무 스트레스 70% 감소',
      '고객 납기 준수율 99.5% 달성',
      '품질 불량률 50% 감소',
      'ISO 55001 자산관리 인증 획득'
    ]
  },

  automationMetrics: {
    timeReduction: '75%',
    costSaving: '110억원/년',
    errorReduction: '95%',
    productivityGain: '44%'
  },

  n8nWorkflows: [
    {
      name: '이상징후 감지 및 알림',
      description: 'AI가 감지한 이상 신호를 실시간으로 정비팀에 전달',
      nodes: 22,
      triggers: ['Sensor Data', 'AI Analysis'],
      actions: ['SMS', 'Email', 'Mobile App Push', 'Dashboard Alert']
    },
    {
      name: '정비 작업 자동 스케줄링',
      description: '예측된 정비 필요 시점에 맞춰 작업 일정 자동 수립',
      nodes: 28,
      triggers: ['Prediction Model', 'Calendar'],
      actions: ['Work Order', 'Resource Allocation', 'Parts Ordering']
    },
    {
      name: '정비 리포트 자동 생성',
      description: '정비 완료 후 자동으로 보고서 생성 및 배포',
      nodes: 15,
      triggers: ['Maintenance Complete'],
      actions: ['Report Generation', 'Database Update', 'Management Dashboard']
    }
  ],

  aiImplementations: [
    {
      type: 'Time Series Forecasting (LSTM)',
      purpose: '설비 고장 시점 예측',
      accuracy: '89%',
      processingTime: '실시간'
    },
    {
      type: 'Anomaly Detection',
      purpose: '비정상 패턴 조기 감지',
      accuracy: '94%',
      processingTime: '0.5초'
    },
    {
      type: 'RUL Prediction',
      purpose: '부품 잔여 수명 예측',
      accuracy: '85%',
      processingTime: '1분/설비'
    }
  ],

  testimonial: {
    quote: 'AI 예측정비 도입은 우리 회사의 게임 체인저였습니다. 설비가 고장나기 전에 미리 알고 대응할 수 있다는 것은 제조업에서 꿈같은 일이었죠. n8n 자동화로 정비팀이 능동적으로 일할 수 있게 되었고, 생산성과 품질 모두 획기적으로 개선되었습니다. 투자 대비 효과는 기대 이상이었고, 이제는 경쟁사들이 우리의 사례를 벤치마킹하러 옵니다.',
    author: '박진수',
    position: '생산본부장',
    company: '한국정밀기계'
  },

  followUpResults: [
    {
      metric: '고객 만족도',
      achievement: 'NPS 45 → 78 (도입 1년 후)'
    },
    {
      metric: '신규 수주',
      achievement: '전년 대비 35% 증가'
    },
    {
      metric: '직원 이직률',
      achievement: '15% → 3% 감소'
    }
  ],

  roiData: {
    investment: '25억원',
    monthlySavings: '9.2억원',
    paybackPeriod: '2.7개월',
    threeYearROI: '1,320%'
  },

  implementationTimeline: '7개월',
  
  successFactors: [
    '정비팀과 IT팀의 긴밀한 협업',
    '단계적 구현을 통한 리스크 관리',
    '실시간 피드백 반영 체계 구축',
    '전사적 데이터 기반 문화 조성',
    '지속적인 모델 재학습 및 개선'
  ],

  tags: ['예측정비', 'IoT', '설비관리', 'OEE', '스마트팩토리', 'n8n자동화'],
  featured: true
};

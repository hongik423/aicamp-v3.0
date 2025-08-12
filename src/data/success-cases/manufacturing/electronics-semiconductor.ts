'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Cpu, Zap, Shield, Activity } from 'lucide-react';

export const electronicsSemiconductorCase: SuccessCaseDetail = {
  id: 'electronics-semiconductor-001',
  category: 'manufacturing',
  industry: '제조/생산',
  subIndustry: '전자/반도체',
  companyName: '글로벌반도체코리아',
  companySize: 'enterprise',
  title: 'AI 기반 반도체 공정 최적화로 수율 35% 향상',
  subtitle: '딥러닝과 n8n 자동화를 통한 스마트 팩토리 혁신',
  description: 'AI 비전 검사 시스템과 n8n 워크플로우를 통해 반도체 생산 공정을 완전 자동화하고, 실시간 품질 예측으로 불량률을 획기적으로 감소시킨 혁신 사례',
  icon: Cpu,
  color: 'blue',
  heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070',
  
  companyInfo: {
    industry: '반도체 제조업',
    employees: '5,000명',
    revenue: '1조 2천억원',
    location: '경기도 이천시'
  },

  challenges: [
    {
      title: '복잡한 공정 관리의 한계',
      description: '300개 이상의 반도체 공정 단계에서 발생하는 데이터를 수동으로 관리하며 실시간 대응 불가',
      impact: '불량률 15% 이상, 연간 500억원 손실'
    },
    {
      title: '품질 검사 병목 현상',
      description: '전수 검사 불가능으로 샘플링 검사에 의존, 불량품 유출 리스크 상존',
      impact: '고객 클레임 연 200건 이상 발생'
    },
    {
      title: '설비 다운타임 증가',
      description: '예방 정비 체계 부재로 긴급 정비 빈발, 생산성 저하',
      impact: '월평균 48시간 비계획 정지, 생산성 20% 감소'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 기초와 반도체 산업 이해',
        duration: '2주',
        description: 'AI/ML 기본 개념과 반도체 제조 공정의 이해'
      },
      {
        title: 'n8n 워크플로우 기초',
        duration: '1주',
        description: 'n8n 기본 노드 사용법과 데이터 처리 자동화'
      },
      {
        title: '품질 데이터 분석 기초',
        duration: '2주',
        description: 'Python을 활용한 공정 데이터 분석 및 시각화'
      }
    ],
    advanced: [
      {
        title: 'AI 비전 검사 시스템 구축',
        duration: '4주',
        description: 'CNN 기반 결함 검출 모델 개발 및 최적화'
      },
      {
        title: '예측 정비 시스템 개발',
        duration: '3주',
        description: '설비 센서 데이터 기반 고장 예측 모델 구현'
      },
      {
        title: 'n8n 고급 자동화',
        duration: '3주',
        description: 'MES/ERP 연동 및 실시간 알림 시스템 구축'
      }
    ],
    executive: [
      {
        title: '디지털 전환 리더십',
        duration: '1주',
        description: '스마트 팩토리 전략 수립과 변화 관리'
      },
      {
        title: 'AI 투자 ROI 분석',
        duration: '3일',
        description: 'AI 프로젝트 투자 대비 수익 분석 및 의사결정'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 현황 분석 및 목표 설정',
      duration: '4주',
      activities: [
        '전체 생산 공정 매핑 및 데이터 수집 체계 구축',
        'AI 적용 가능 영역 도출 및 우선순위 설정',
        'ROI 목표 및 KPI 정의'
      ],
      results: [
        '15개 핵심 공정 선정',
        '데이터 수집률 95% 달성',
        '구체적 개선 목표 수립'
      ]
    },
    {
      phase: '2단계: AI 모델 개발 및 검증',
      duration: '12주',
      activities: [
        'AI 비전 검사 모델 개발 (YOLOv8 기반)',
        '공정 최적화 알고리즘 구현',
        '파일럿 라인 적용 및 검증'
      ],
      results: [
        '검사 정확도 99.7% 달성',
        '검사 속도 10배 향상',
        '파일럿 라인 수율 20% 개선'
      ]
    },
    {
      phase: '3단계: n8n 자동화 구축',
      duration: '8주',
      activities: [
        'MES/ERP 시스템 연동 워크플로우 구축',
        '실시간 품질 모니터링 대시보드 개발',
        '자동 알림 및 리포팅 시스템 구현'
      ],
      results: [
        '50개 자동화 워크플로우 구축',
        '실시간 대시보드 5개 구현',
        '의사결정 시간 80% 단축'
      ]
    },
    {
      phase: '4단계: 전사 확대 및 최적화',
      duration: '16주',
      activities: [
        '전체 생산 라인 확대 적용',
        '직원 교육 및 변화 관리',
        '지속적 개선 체계 구축'
      ],
      results: [
        '전체 라인 적용 완료',
        '500명 직원 교육 완료',
        '월간 개선 사항 50건 이상 도출'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '반도체 수율',
        before: '65%',
        after: '87.5%',
        improvement: '+35%'
      },
      {
        metric: '불량률',
        before: '15%',
        after: '2.5%',
        improvement: '-83%'
      },
      {
        metric: '검사 처리 속도',
        before: '100개/시간',
        after: '1,000개/시간',
        improvement: '+900%'
      },
      {
        metric: '설비 가동률',
        before: '75%',
        after: '95%',
        improvement: '+27%'
      }
    ],
    financial: [
      {
        item: '불량 감소로 인한 비용 절감',
        amount: '연간 420억원'
      },
      {
        item: '생산성 향상 수익',
        amount: '연간 350억원'
      },
      {
        item: '인건비 절감',
        amount: '연간 80억원'
      }
    ],
    qualitative: [
      '글로벌 고객사 품질 만족도 최고 등급 획득',
      '업계 최초 완전 자동화 품질 검사 시스템 구축',
      '직원 업무 만족도 85% 향상',
      '산업 안전 사고 Zero 달성'
    ]
  },

  automationMetrics: {
    timeReduction: '85%',
    costSaving: '850억원/년',
    errorReduction: '83%',
    productivityGain: '35%'
  },

  n8nWorkflows: [
    {
      name: '실시간 품질 모니터링',
      description: 'AI 검사 결과를 실시간으로 수집하고 이상 발생 시 즉시 알림',
      nodes: 25,
      triggers: ['Webhook', 'Schedule', 'MQTT'],
      actions: ['Database', 'Slack', 'Email', 'Dashboard Update']
    },
    {
      name: '예측 정비 자동화',
      description: '설비 센서 데이터 분석을 통한 고장 예측 및 정비 일정 자동 수립',
      nodes: 18,
      triggers: ['IoT Sensors', 'Schedule'],
      actions: ['AI Analysis', 'Maintenance System', 'Work Order Creation']
    },
    {
      name: '생산 계획 최적화',
      description: 'AI 수요 예측과 재고 현황을 기반으로 최적 생산 계획 수립',
      nodes: 32,
      triggers: ['Daily Schedule', 'Inventory Change'],
      actions: ['ERP Update', 'Production Planning', 'Supply Chain Notification']
    }
  ],

  aiImplementations: [
    {
      type: 'Computer Vision (YOLOv8)',
      purpose: '웨이퍼 결함 실시간 검출',
      accuracy: '99.7%',
      processingTime: '0.1초/이미지'
    },
    {
      type: 'Predictive Analytics',
      purpose: '설비 고장 예측',
      accuracy: '92%',
      processingTime: '실시간'
    },
    {
      type: 'Process Optimization AI',
      purpose: '공정 파라미터 최적화',
      accuracy: '95%',
      processingTime: '5분/배치'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n을 통한 디지털 전환으로 우리는 단순한 제조업체에서 기술 선도 기업으로 도약했습니다. 특히 실시간 품질 예측과 자동화된 의사결정 시스템은 글로벌 경쟁력의 핵심이 되었습니다. 무엇보다 직원들이 단순 반복 업무에서 벗어나 창의적인 개선 활동에 집중할 수 있게 된 것이 가장 큰 성과입니다.',
    author: '김상호',
    position: 'CEO',
    company: '글로벌반도체코리아'
  },

  followUpResults: [
    {
      metric: '글로벌 시장 점유율',
      achievement: '15% → 22% (도입 2년 후)'
    },
    {
      metric: '신규 고객 획득',
      achievement: '연간 12개 글로벌 대기업 신규 계약'
    },
    {
      metric: '특허 출원',
      achievement: 'AI 관련 특허 15건 출원'
    }
  ],

  roiData: {
    investment: '150억원',
    monthlySavings: '70억원',
    paybackPeriod: '2.1개월',
    threeYearROI: '1,700%'
  },

  implementationTimeline: '10개월',
  
  successFactors: [
    '경영진의 강력한 디지털 전환 의지와 투자',
    '전 직원 참여형 AI 교육 프로그램 운영',
    '단계적 접근을 통한 리스크 최소화',
    'AI 전문가와 현장 전문가의 긴밀한 협업',
    '지속적인 모델 개선과 피드백 체계 구축'
  ],

  tags: ['반도체', '스마트팩토리', 'AI비전', '예측정비', '품질관리', 'n8n자동화'],
  featured: true
};

'use client';

import { 
  Factory, 
  Cpu, 
  Beaker, 
  Pill, 
  Utensils, 
  Droplets, 
  HardHat, 
  Anchor, 
  Plane
} from 'lucide-react';
import { SuccessCaseDetail } from '@/types/success-case.types';

// 제조/생산 업종별 벤치마크 성공사례 데이터
export const manufacturingBenchmarkCases: { [key: string]: SuccessCaseDetail } = {
  // 1. 전자/반도체
  'electronics-semiconductor-ai': {
    id: 'electronics-semiconductor-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '전자/반도체',
    companyName: '반도체테크 A (직원 200명)',
    companySize: '중기업',
    title: 'AI 기반 반도체 품질 관리 혁신',
    subtitle: '불량률 95% 감소, 생산성 300% 향상',
    description: 'AI를 활용한 반도체 제조 공정 최적화와 품질 관리 자동화로 생산성과 품질을 동시에 혁신한 벤치마크 사례',
    icon: Cpu,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '전자/반도체',
      employees: '200명',
      revenue: '연 매출 500억원',
      location: '경기도 용인시'
    },
    challenges: [
      {
        title: '반도체 불량률 높음',
        description: '수동 검사로 인한 불량 반도체 검출 한계',
        impact: '고객 클레임 증가 및 매출 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '반도체 AI 기초',
          duration: '16시간',
          description: '반도체 제조 공정과 AI 융합 기술'
        }
      ],
      advanced: [
        {
          title: 'AI 품질 관리 시스템',
          duration: '24시간',
          description: 'Computer Vision 기반 자동 검사 시스템'
        }
      ],
      executive: [
        {
          title: '반도체 AI 전략',
          duration: '8시간',
          description: '반도체 AI 투자 ROI 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '불량률',
          before: '5%',
          after: '0.25%',
          improvement: '95% 감소'
        }
      ],
      financial: [
        {
          item: '품질 비용 절감',
          amount: '연 15억원'
        }
      ],
      qualitative: ['고객 만족도 98% 달성', '생산성 300% 향상']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 15억원',
      errorReduction: '95%',
      productivityGain: '300%'
    },
    roiData: {
      investment: '3억원',
      monthlySavings: '1억 2천 5백만원',
      paybackPeriod: '2.4개월',
      threeYearROI: '1,500%'
    },
    implementationTimeline: '3개월',
    successFactors: [
      'AI 모델 정확도 99.5% 달성',
      '실시간 데이터 처리 시스템 구축',
      '전사적 AI 문화 정착'
    ],
    tags: ['반도체', 'AI', '품질관리', '자동화', 'Computer Vision'],
    testimonial: {
      quote: 'AI 품질 관리 시스템 도입으로 고객 만족도가 크게 향상되었습니다.',
      author: '김철수',
      position: '품질관리팀장',
      company: '반도체테크 A'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '생산성 350% 향상, 불량률 0.1% 달성'
      }
    ],
    n8nWorkflows: [
      {
        name: '품질 검사 자동화',
        description: 'Computer Vision 기반 자동 검사 워크플로우',
        nodes: 15,
        triggers: ['이미지 업로드', '품질 기준 설정'],
        actions: ['AI 분석', '결과 저장', '알림 발송']
      }
    ],
    aiImplementations: [
      {
        type: 'Computer Vision',
        purpose: '반도체 불량 검출',
        accuracy: '99.5%',
        processingTime: '0.1초'
      }
    ],
    departmentAutomations: [
      {
        department: '품질관리팀',
        automationLevel: '90%',
        timeSaved: '월 160시간',
        costReduction: '연 15억원'
      }
    ],
    featured: true
  },

  // 2. 기계/장비
  'machinery-equipment-ai': {
    id: 'machinery-equipment-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '기계/장비',
    companyName: '기계솔루션 B (직원 150명)',
    companySize: '중기업',
    title: 'AI 기반 예측 정비 시스템',
    subtitle: '장비 고장률 80% 감소, 정비 비용 60% 절감',
    description: 'AI를 활용한 장비 상태 모니터링과 예측 정비로 장비 가동률을 극대화한 벤치마크 사례',
    icon: Factory,
    color: 'gray',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '기계/장비',
      employees: '150명',
      revenue: '연 매출 300억원',
      location: '경기도 안산시'
    },
    challenges: [
      {
        title: '예상치 못한 장비 고장',
        description: '정기 정비로도 예방할 수 없는 돌발 고장',
        impact: '생산 중단 및 수리 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'IoT 센서 기초',
          duration: '12시간',
          description: '장비 모니터링 센서 설치 및 데이터 수집'
        }
      ],
      advanced: [
        {
          title: 'AI 예측 분석',
          duration: '20시간',
          description: '머신러닝 기반 고장 예측 모델 구축'
        }
      ],
      executive: [
        {
          title: '스마트팩토리 전략',
          duration: '6시간',
          description: '예측 정비 시스템 투자 효과 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '장비 고장률',
          before: '월 5회',
          after: '월 1회',
          improvement: '80% 감소'
        }
      ],
      financial: [
        {
          item: '정비 비용 절감',
          amount: '연 8억원'
        }
      ],
      qualitative: ['장비 가동률 95% 달성', '생산성 200% 향상']
    },
    automationMetrics: {
      timeReduction: '80%',
      costSaving: '연 8억원',
      errorReduction: '80%',
      productivityGain: '200%'
    },
    roiData: {
      investment: '2억원',
      monthlySavings: '6천 7백만원',
      paybackPeriod: '3개월',
      threeYearROI: '1,200%'
    },
    implementationTimeline: '4개월',
    successFactors: [
      'IoT 센서 데이터 정확도 98% 달성',
      '실시간 모니터링 시스템 구축',
      '예측 정비 프로세스 표준화'
    ],
    tags: ['기계/장비', 'AI', '예측정비', 'IoT', '스마트팩토리'],
    testimonial: {
      quote: 'AI 예측 정비 시스템으로 장비 가동률이 크게 향상되었습니다.',
      author: '박영희',
      position: '설비관리팀장',
      company: '기계솔루션 B'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '장비 가동률 98% 달성, 정비 비용 70% 절감'
      }
    ],
    n8nWorkflows: [
      {
        name: '장비 상태 모니터링',
        description: 'IoT 센서 데이터 기반 예측 정비 워크플로우',
        nodes: 12,
        triggers: ['센서 데이터 수집', '임계값 초과'],
        actions: ['AI 분석', '정비 알림', '스케줄 조정']
      }
    ],
    aiImplementations: [
      {
        type: 'Predictive Analytics',
        purpose: '장비 고장 예측',
        accuracy: '95%',
        processingTime: '1초'
      }
    ],
    departmentAutomations: [
      {
        department: '설비관리팀',
        automationLevel: '85%',
        timeSaved: '월 120시간',
        costReduction: '연 8억원'
      }
    ],
    featured: true
  },

  // 3. 화학/석유화학
  'chemical-petrochemical-ai': {
    id: 'chemical-petrochemical-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '화학/석유화학',
    companyName: '화학테크 C (직원 300명)',
    companySize: '대기업',
    title: 'AI 기반 화학 공정 최적화',
    subtitle: '에너지 효율성 40% 향상, 원료 사용량 25% 절감',
    description: 'AI를 활용한 화학 공정 최적화와 에너지 효율성 향상으로 환경 친화적 생산을 실현한 벤치마크 사례',
    icon: Beaker,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '화학/석유화학',
      employees: '300명',
      revenue: '연 매출 800억원',
      location: '울산광역시'
    },
    challenges: [
      {
        title: '에너지 효율성 저하',
        description: '복잡한 화학 공정으로 인한 에너지 낭비',
        impact: '생산 비용 증가 및 환경 부담'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '화학 공정 AI 기초',
          duration: '18시간',
          description: '화학 공정 데이터 분석 및 AI 모델링'
        }
      ],
      advanced: [
        {
          title: 'AI 공정 최적화',
          duration: '26시간',
          description: '실시간 공정 제어 및 최적화 시스템'
        }
      ],
      executive: [
        {
          title: '그린케미 전략',
          duration: '8시간',
          description: '환경 친화적 생산 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '에너지 효율성',
          before: '기존 대비 100%',
          after: '기존 대비 140%',
          improvement: '40% 향상'
        }
      ],
      financial: [
        {
          item: '에너지 비용 절감',
          amount: '연 20억원'
        }
      ],
      qualitative: ['탄소 배출량 30% 감소', '환경 인증 획득']
    },
    automationMetrics: {
      timeReduction: '60%',
      costSaving: '연 20억원',
      errorReduction: '70%',
      productivityGain: '150%'
    },
    roiData: {
      investment: '5억원',
      monthlySavings: '1억 7천만원',
      paybackPeriod: '2.9개월',
      threeYearROI: '1,200%'
    },
    featured: true
  },

  // 4. 제약/의료기기
  'pharmaceutical-medical-ai': {
    id: 'pharmaceutical-medical-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '제약/의료기기',
    companyName: '바이오테크 D (직원 180명)',
    companySize: '중기업',
    title: 'AI 기반 의약품 품질 관리',
    subtitle: '품질 검사 정확도 99.9% 달성, 검사 시간 90% 단축',
    description: 'AI를 활용한 의약품 품질 검사 자동화와 GMP 준수 관리로 안전한 의약품 생산을 보장한 벤치마크 사례',
    icon: Pill,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '제약/의료기기',
      employees: '180명',
      revenue: '연 매출 400억원',
      location: '경기도 성남시'
    },
    challenges: [
      {
        title: '품질 검사 시간 오래 걸림',
        description: '수동 품질 검사로 인한 생산 지연',
        impact: '의약품 공급 지연 및 규제 준수 위험'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'GMP AI 기초',
          duration: '14시간',
          description: 'GMP 규정과 AI 품질 관리 시스템'
        }
      ],
      advanced: [
        {
          title: 'AI 품질 검사 시스템',
          duration: '22시간',
          description: 'Computer Vision 기반 자동 품질 검사'
        }
      ],
      executive: [
        {
          title: '바이오 AI 전략',
          duration: '6시간',
          description: '제약 AI 투자 전략 및 규제 대응'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '품질 검사 시간',
          before: '배치당 8시간',
          after: '배치당 48분',
          improvement: '90% 단축'
        }
      ],
      financial: [
        {
          item: '검사 인력 비용 절감',
          amount: '연 6억원'
        }
      ],
      qualitative: ['품질 검사 정확도 99.9% 달성', 'GMP 준수율 100%']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 6억원',
      errorReduction: '99%',
      productivityGain: '1,000%'
    },
    roiData: {
      investment: '2억 5천만원',
      monthlySavings: '5천만원',
      paybackPeriod: '5개월',
      threeYearROI: '720%'
    },
    featured: true
  },

  // 5. 식품/의류
  'food-textile-ai': {
    id: 'food-textile-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '식품/의류',
    companyName: '식품패션 E (직원 120명)',
    companySize: '중소기업',
    title: 'AI 기반 식품 안전 관리',
    subtitle: '식품 안전 사고 100% 예방, 품질 일관성 확보',
    description: 'AI를 활용한 식품 안전 검사와 품질 관리 자동화로 소비자 안전을 보장한 벤치마크 사례',
    icon: Utensils,
    color: 'orange',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '식품/의류',
      employees: '120명',
      revenue: '연 매출 200억원',
      location: '경기도 이천시'
    },
    challenges: [
      {
        title: '식품 안전 검사 한계',
        description: '수동 검사로 인한 식품 안전 위험 요소 탐지 지연',
        impact: '식품 안전 사고 발생 위험 및 브랜드 이미지 손상'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '식품 안전 AI 기초',
          duration: '12시간',
          description: '식품 안전 검사와 AI 융합 기술'
        }
      ],
      advanced: [
        {
          title: 'AI 안전 검사 시스템',
          duration: '18시간',
          description: 'Computer Vision 기반 자동 안전 검사'
        }
      ],
      executive: [
        {
          title: '식품 AI 전략',
          duration: '4시간',
          description: '식품 안전 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '안전 검사 정확도',
          before: '85%',
          after: '99.5%',
          improvement: '17% 향상'
        }
      ],
      financial: [
        {
          item: '안전 사고 비용 절감',
          amount: '연 3억원'
        }
      ],
      qualitative: ['식품 안전 사고 0건 달성', '소비자 신뢰도 95% 향상']
    },
    automationMetrics: {
      timeReduction: '80%',
      costSaving: '연 3억원',
      errorReduction: '99%',
      productivityGain: '400%'
    },
    roiData: {
      investment: '1억 5천만원',
      monthlySavings: '2천 5백만원',
      paybackPeriod: '6개월',
      threeYearROI: '600%'
    },
    featured: true
  },

  // 6. 석유/에너지
  'oil-energy-ai': {
    id: 'oil-energy-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '석유/에너지',
    companyName: '에너지솔루션 F (직원 250명)',
    companySize: '대기업',
    title: 'AI 기반 에너지 효율 최적화',
    subtitle: '에너지 사용량 35% 절감, 운영 비용 40% 감소',
    description: 'AI를 활용한 에너지 사용량 최적화와 예측 분석으로 지속 가능한 에너지 생산을 실현한 벤치마크 사례',
    icon: Droplets,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '석유/에너지',
      employees: '250명',
      revenue: '연 매출 600억원',
      location: '울산광역시'
    },
    challenges: [
      {
        title: '에너지 사용량 비효율',
        description: '복잡한 에너지 시스템으로 인한 낭비',
        impact: '운영 비용 증가 및 환경 부담'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '에너지 AI 기초',
          duration: '16시간',
          description: '에너지 시스템과 AI 분석 기초'
        }
      ],
      advanced: [
        {
          title: 'AI 에너지 최적화',
          duration: '24시간',
          description: '실시간 에너지 사용량 최적화 시스템'
        }
      ],
      executive: [
        {
          title: '그린에너지 전략',
          duration: '8시간',
          description: '지속 가능한 에너지 생산 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '에너지 사용량',
          before: '기존 대비 100%',
          after: '기존 대비 65%',
          improvement: '35% 절감'
        }
      ],
      financial: [
        {
          item: '운영 비용 절감',
          amount: '연 25억원'
        }
      ],
      qualitative: ['탄소 배출량 40% 감소', '환경 인증 획득']
    },
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 25억원',
      errorReduction: '80%',
      productivityGain: '200%'
    },
    roiData: {
      investment: '4억원',
      monthlySavings: '2억 1천만원',
      paybackPeriod: '1.9개월',
      threeYearROI: '1,875%'
    },
    featured: true
  },

  // 7. 철강/금속
  'steel-metal-ai': {
    id: 'steel-metal-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '철강/금속',
    companyName: '철강테크 G (직원 400명)',
    companySize: '대기업',
    title: 'AI 기반 철강 품질 관리',
    subtitle: '철강 품질 일관성 95% 향상, 불량률 90% 감소',
    description: 'AI를 활용한 철강 제조 공정 최적화와 품질 관리로 고품질 철강 생산을 실현한 벤치마크 사례',
    icon: HardHat,
    color: 'gray',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '철강/금속',
      employees: '400명',
      revenue: '연 매출 1,200억원',
      location: '포항시'
    },
    challenges: [
      {
        title: '철강 품질 불균일',
        description: '복잡한 제조 공정으로 인한 품질 편차',
        impact: '고객 클레임 증가 및 매출 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '철강 AI 기초',
          duration: '18시간',
          description: '철강 제조 공정과 AI 융합 기술'
        }
      ],
      advanced: [
        {
          title: 'AI 품질 관리 시스템',
          duration: '26시간',
          description: '실시간 품질 모니터링 및 제어 시스템'
        }
      ],
      executive: [
        {
          title: '철강 AI 전략',
          duration: '8시간',
          description: '철강 AI 투자 ROI 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '품질 일관성',
          before: '70%',
          after: '95%',
          improvement: '95% 향상'
        }
      ],
      financial: [
        {
          item: '품질 비용 절감',
          amount: '연 30억원'
        }
      ],
      qualitative: ['고객 만족도 98% 달성', '생산성 250% 향상']
    },
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 30억원',
      errorReduction: '90%',
      productivityGain: '250%'
    },
    roiData: {
      investment: '6억원',
      monthlySavings: '2억 5천만원',
      paybackPeriod: '2.4개월',
      threeYearROI: '1,500%'
    },
    featured: true
  },

  // 8. 조선/해양
  'shipbuilding-marine-ai': {
    id: 'shipbuilding-marine-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '조선/해양',
    companyName: '조선해양 H (직원 600명)',
    companySize: '대기업',
    title: 'AI 기반 선박 설계 최적화',
    subtitle: '설계 시간 60% 단축, 연료 효율성 30% 향상',
    description: 'AI를 활용한 선박 설계 최적화와 연료 효율성 향상으로 경쟁력 있는 선박을 개발한 벤치마크 사례',
    icon: Anchor,
    color: 'navy',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '조선/해양',
      employees: '600명',
      revenue: '연 매출 2,000억원',
      location: '부산광역시'
    },
    challenges: [
      {
        title: '선박 설계 시간 오래 걸림',
        description: '복잡한 선박 설계로 인한 개발 기간 연장',
        impact: '수주 기회 손실 및 개발 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '조선 AI 기초',
          duration: '20시간',
          description: '선박 설계와 AI 융합 기술'
        }
      ],
      advanced: [
        {
          title: 'AI 설계 최적화',
          duration: '28시간',
          description: 'AI 기반 선박 설계 자동화 시스템'
        }
      ],
      executive: [
        {
          title: '조선 AI 전략',
          duration: '8시간',
          description: '조선 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '설계 시간',
          before: '24개월',
          after: '10개월',
          improvement: '60% 단축'
        }
      ],
      financial: [
        {
          item: '설계 비용 절감',
          amount: '연 50억원'
        }
      ],
      qualitative: ['연료 효율성 30% 향상', '환경 규제 준수']
    },
    automationMetrics: {
      timeReduction: '60%',
      costSaving: '연 50억원',
      errorReduction: '75%',
      productivityGain: '300%'
    },
    roiData: {
      investment: '10억원',
      monthlySavings: '4억 2천만원',
      paybackPeriod: '2.4개월',
      threeYearROI: '1,500%'
    },
    featured: true
  },

  // 9. 항공/우주
  'aerospace-ai': {
    id: 'aerospace-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '항공/우주',
    companyName: '항공우주 I (직원 350명)',
    companySize: '대기업',
    title: 'AI 기반 항공기 부품 품질 관리',
    subtitle: '부품 정밀도 99.9% 달성, 검사 시간 85% 단축',
    description: 'AI를 활용한 항공기 부품의 초정밀 품질 검사와 제조 공정 최적화로 안전한 항공기를 생산한 벤치마크 사례',
    icon: Plane,
    color: 'sky',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '항공/우주',
      employees: '350명',
      revenue: '연 매출 800억원',
      location: '경기도 성남시'
    },
    challenges: [
      {
        title: '항공기 부품 정밀도 한계',
        description: '수동 검사로 인한 미세한 오차 탐지 어려움',
        impact: '안전성 위험 및 규제 준수 문제'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '항공 AI 기초',
          duration: '16시간',
          description: '항공기 부품 제조와 AI 품질 관리'
        }
      ],
      advanced: [
        {
          title: 'AI 정밀 검사 시스템',
          duration: '24시간',
          description: '초정밀 Computer Vision 검사 시스템'
        }
      ],
      executive: [
        {
          title: '항공 AI 전략',
          duration: '6시간',
          description: '항공 AI 투자 전략 및 안전성 확보'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '부품 정밀도',
          before: '99.5%',
          after: '99.9%',
          improvement: '99.9% 달성'
        }
      ],
      financial: [
        {
          item: '검사 비용 절감',
          amount: '연 20억원'
        }
      ],
      qualitative: ['안전성 100% 보장', '국제 인증 획득']
    },
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 20억원',
      errorReduction: '99.9%',
      productivityGain: '600%'
    },
    roiData: {
      investment: '5억원',
      monthlySavings: '1억 7천만원',
      paybackPeriod: '2.9개월',
      threeYearROI: '1,200%'
    },
    featured: true
  },

  // 10. 자동차 부품
  'automotive-parts-ai': {
    id: 'automotive-parts-ai',
    category: 'manufacturing',
    industry: '제조/생산',
    subIndustry: '자동차 부품',
    companyName: '자동차부품 J (직원 280명)',
    companySize: '중기업',
    title: 'AI 기반 자동차 부품 생산 최적화',
    subtitle: '생산성 400% 향상, 품질 불량률 95% 감소',
    description: 'AI를 활용한 자동차 부품 생산 라인 최적화와 품질 관리로 고품질 부품을 대량 생산한 벤치마크 사례',
    icon: Factory,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '자동차 부품',
      employees: '280명',
      revenue: '연 매출 600억원',
      location: '경기도 화성시'
    },
    challenges: [
      {
        title: '생산성 저하',
        description: '수동 생산 라인으로 인한 생산성 한계',
        impact: '납기 지연 및 원가 경쟁력 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '자동차 AI 기초',
          duration: '14시간',
          description: '자동차 부품 생산과 AI 융합 기술'
        }
      ],
      advanced: [
        {
          title: 'AI 생산 최적화',
          duration: '22시간',
          description: '스마트 팩토리 생산 라인 구축'
        }
      ],
      executive: [
        {
          title: '자동차 AI 전략',
          duration: '6시간',
          description: '자동차 부품 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '생산성',
          before: '시간당 100개',
          after: '시간당 400개',
          improvement: '400% 향상'
        }
      ],
      financial: [
        {
          item: '생산 비용 절감',
          amount: '연 25억원'
        }
      ],
      qualitative: ['품질 불량률 95% 감소', '납기 준수율 100%']
    },
    automationMetrics: {
      timeReduction: '75%',
      costSaving: '연 25억원',
      errorReduction: '95%',
      productivityGain: '400%'
    },
    roiData: {
      investment: '4억원',
      monthlySavings: '2억 1천만원',
      paybackPeriod: '1.9개월',
      threeYearROI: '1,875%'
    },
    featured: true
  }
};

export default manufacturingBenchmarkCases;

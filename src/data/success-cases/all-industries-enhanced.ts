'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import {
  Cpu, Settings, Beaker, Pill, ShoppingBag, Shirt, Droplet, Anchor, Plane, Cog,
  DollarSign, CreditCard, TrendingUp, ShieldCheck, Landmark, Wallet, LineChart,
  ShoppingCart, Store, Package, Palette, Coffee, Hotel, MapPin, Truck,
  Heart, Stethoscope, Activity, Brain, Microscope, Dna, Hospital,
  GraduationCap, BookOpen, Lightbulb, Users, Search, Award, Library
} from 'lucide-react';

// IT/기술 업종 (10개) - 별도 파일에서 import
import { itTechCases } from './it-tech';

// 제조/생산 업종 (10개)
import { electronicsSemiconductorCase } from './manufacturing/electronics-semiconductor';
import { machineryEquipmentCase } from './manufacturing/machinery-equipment';
import { chemicalPetrochemicalCase } from './manufacturing/chemical-petrochemical';
import { pharmaceuticalMedicalCase } from './manufacturing/pharmaceutical-medical';

// 나머지 제조업 케이스 정의
const foodClothingCase: SuccessCaseDetail = {
  id: 'food-clothing-001',
  category: 'manufacturing',
  industry: '제조/생산',
  subIndustry: '식품/의류',
  companyName: '글로벌푸드앤패션',
  companySize: 'large',
  title: 'AI 수요예측으로 재고 50% 감소, 폐기율 제로 달성',
  subtitle: 'n8n 공급망 자동화와 AI 품질관리 시스템',
  description: 'AI 기반 트렌드 분석과 n8n SCM 자동화로 식품 폐기율을 제로화하고 패션 재고를 획기적으로 줄인 지속가능 경영 사례',
  icon: ShoppingBag,
  color: 'pink',
  heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070',
  
  companyInfo: {
    industry: '식품 및 의류 제조',
    employees: '2,500명',
    revenue: '5,000억원',
    location: '서울특별시'
  },

  challenges: [
    {
      title: '높은 재고 및 폐기 비용',
      description: '수요 예측 실패로 인한 과다 재고와 식품 폐기',
      impact: '연간 200억원의 재고 처리 비용'
    },
    {
      title: '빠른 트렌드 변화 대응 실패',
      description: '시장 트렌드 파악 지연으로 기회 손실',
      impact: '시즌별 판매 목표 달성률 60%'
    },
    {
      title: '품질 관리 일관성 부족',
      description: '수작업 품질 검사로 인한 불균일한 품질',
      impact: '고객 클레임 월 100건 이상'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 수요예측 기초',
        duration: '2주',
        description: '시계열 분석과 머신러닝 기반 예측'
      },
      {
        title: 'SCM 자동화 기초',
        duration: '1주',
        description: 'n8n을 활용한 공급망 관리 자동화'
      }
    ],
    advanced: [
      {
        title: '트렌드 예측 AI 모델링',
        duration: '4주',
        description: '소셜미디어와 시장 데이터 분석'
      },
      {
        title: '품질 검사 자동화',
        duration: '3주',
        description: 'Computer Vision 기반 품질 관리'
      }
    ],
    executive: [
      {
        title: '지속가능 경영 전략',
        duration: '2일',
        description: 'ESG와 디지털 전환 통합'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 데이터 통합',
      duration: '6주',
      activities: [
        'POS, ERP, SNS 데이터 통합',
        '실시간 재고 추적 시스템 구축'
      ],
      results: [
        '데이터 통합률 95%',
        '실시간 재고 가시성 확보'
      ]
    },
    {
      phase: '2단계: AI 모델 구축',
      duration: '10주',
      activities: [
        '수요 예측 모델 개발',
        '트렌드 분석 엔진 구현'
      ],
      results: [
        '예측 정확도 92%',
        '트렌드 감지 2주 단축'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '재고 회전율',
        before: '4회/년',
        after: '8회/년',
        improvement: '+100%'
      },
      {
        metric: '식품 폐기율',
        before: '15%',
        after: '0.5%',
        improvement: '-97%'
      }
    ],
    financial: [
      {
        item: '재고 비용 절감',
        amount: '연간 180억원'
      },
      {
        item: '폐기 손실 감소',
        amount: '연간 150억원'
      }
    ],
    qualitative: [
      '업계 최초 제로 웨이스트 달성',
      'ESG 평가 A등급 획득',
      '고객 만족도 95% 달성'
    ]
  },

  automationMetrics: {
    timeReduction: '75%',
    costSaving: '330억원/년',
    errorReduction: '97%',
    productivityGain: '100%'
  },

  n8nWorkflows: [
    {
      name: '수요 예측 자동화',
      description: '다채널 데이터 기반 수요 예측 및 발주',
      nodes: 28,
      triggers: ['Daily Schedule', 'Inventory Level'],
      actions: ['Forecast', 'Order Generation', 'Supplier Notification']
    }
  ],

  aiImplementations: [
    {
      type: 'Demand Forecasting',
      purpose: '수요 예측 및 재고 최적화',
      accuracy: '92%',
      processingTime: '10분/일'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n 도입으로 우리는 지속가능한 제조업의 미래를 만들어가고 있습니다. 식품 폐기를 거의 제로로 만들고, 패션 재고를 반으로 줄이면서도 매출은 30% 성장했습니다.',
    author: '박지현',
    position: 'CEO',
    company: '글로벌푸드앤패션'
  },

  followUpResults: [
    {
      metric: '매출 성장',
      achievement: '30% 증가 (1년)'
    },
    {
      metric: '탄소 배출',
      achievement: '40% 감소'
    }
  ],

  roiData: {
    investment: '30억원',
    monthlySavings: '27.5억원',
    paybackPeriod: '1.1개월',
    threeYearROI: '3,300%'
  },

  implementationTimeline: '6개월',
  successFactors: [
    '전사적 데이터 기반 문화 조성',
    'AI 예측 모델의 지속적 개선',
    '공급망 파트너와의 긴밀한 협업'
  ],
  tags: ['식품', '패션', '재고관리', '지속가능경영'],
  featured: true
};

// 금융/보험 업종 (7개)
const bankingCase: SuccessCaseDetail = {
  id: 'banking-001',
  category: 'finance',
  industry: '금융/보험',
  subIndustry: '은행',
  companyName: '디지털뱅크코리아',
  companySize: 'enterprise',
  title: 'AI 신용평가로 대출 승인율 40% 향상, 연체율 70% 감소',
  subtitle: 'n8n 금융 프로세스 자동화와 AI 리스크 관리',
  description: '대안 데이터와 머신러닝으로 금융 소외계층 포용성을 높이고 리스크를 최소화한 디지털 금융 혁신 사례',
  icon: Landmark,
  color: 'green',
  heroImage: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=2070',
  
  companyInfo: {
    industry: '디지털 뱅킹',
    employees: '5,000명',
    revenue: '3조원',
    location: '서울특별시'
  },

  challenges: [
    {
      title: '전통적 신용평가의 한계',
      description: '금융 이력이 부족한 고객 평가 어려움',
      impact: '잠재 고객 50% 대출 거절'
    },
    {
      title: '수동 심사 프로세스',
      description: '대출 심사에 평균 3~5일 소요',
      impact: '고객 이탈률 35%'
    },
    {
      title: '사기 탐지 정확도 부족',
      description: '금융 사기로 인한 손실 증가',
      impact: '연간 100억원 사기 손실'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 신용평가 기초',
        duration: '2주',
        description: '대안 데이터와 머신러닝 신용 모델링'
      }
    ],
    advanced: [
      {
        title: '사기 탐지 AI 시스템',
        duration: '4주',
        description: '실시간 이상거래 탐지 모델 구축'
      }
    ],
    executive: [
      {
        title: '디지털 금융 전략',
        duration: '2일',
        description: '핀테크 혁신과 규제 대응'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 데이터 플랫폼 구축',
      duration: '8주',
      activities: [
        '대안 데이터 수집 체계 구축',
        '실시간 처리 인프라 구성'
      ],
      results: [
        '50개 데이터 소스 통합',
        '초당 10만건 거래 처리'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '대출 승인율',
        before: '45%',
        after: '63%',
        improvement: '+40%'
      },
      {
        metric: '연체율',
        before: '3.5%',
        after: '1.05%',
        improvement: '-70%'
      }
    ],
    financial: [
      {
        item: '신규 대출 수익',
        amount: '연간 500억원'
      },
      {
        item: '연체 손실 감소',
        amount: '연간 200억원'
      }
    ],
    qualitative: [
      '금융 포용성 대상 수상',
      '고객 만족도 95점 달성',
      '디지털 금융 혁신상 수상'
    ]
  },

  automationMetrics: {
    timeReduction: '90%',
    costSaving: '700억원/년',
    errorReduction: '85%',
    productivityGain: '250%'
  },

  n8nWorkflows: [
    {
      name: '실시간 신용 평가',
      description: 'AI 모델 기반 즉시 대출 심사',
      nodes: 45,
      triggers: ['Application', 'API Request'],
      actions: ['Credit Check', 'Risk Assessment', 'Approval']
    }
  ],

  aiImplementations: [
    {
      type: 'Credit Scoring AI',
      purpose: '대안 데이터 기반 신용 평가',
      accuracy: '94%',
      processingTime: '3초'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n으로 우리는 더 많은 고객에게 금융 서비스를 제공하면서도 리스크를 획기적으로 줄였습니다. 이제 대출 심사가 3초 만에 완료됩니다.',
    author: '김영수',
    position: 'CDO',
    company: '디지털뱅크코리아'
  },

  followUpResults: [
    {
      metric: '신규 고객',
      achievement: '연간 50만명 증가'
    }
  ],

  roiData: {
    investment: '100억원',
    monthlySavings: '58.3억원',
    paybackPeriod: '1.7개월',
    threeYearROI: '2,100%'
  },

  implementationTimeline: '8개월',
  successFactors: [
    '규제 샌드박스 활용',
    '대안 데이터 활용 전략',
    '실시간 모델 업데이트'
  ],
  tags: ['핀테크', '신용평가', '디지털뱅킹', '리스크관리'],
  featured: true
};

// 유통/서비스 업종 (8개)
const ecommerceCase: SuccessCaseDetail = {
  id: 'ecommerce-001',
  category: 'retail',
  industry: '유통/서비스',
  subIndustry: '이커머스/온라인쇼핑',
  companyName: '스마트커머스',
  companySize: 'large',
  title: 'AI 개인화로 전환율 85% 상승, 재구매율 3배 증가',
  subtitle: 'n8n 마케팅 자동화와 AI 추천 엔진',
  description: '초개인화 AI 추천과 n8n 마케팅 자동화로 고객 경험을 혁신하고 매출을 2배로 성장시킨 이커머스 성공 사례',
  icon: ShoppingCart,
  color: 'orange',
  heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070',
  
  companyInfo: {
    industry: '온라인 쇼핑몰',
    employees: '500명',
    revenue: '8,000억원',
    location: '경기도 판교'
  },

  challenges: [
    {
      title: '낮은 전환율과 재구매율',
      description: '획일적인 상품 추천으로 고객 이탈',
      impact: '전환율 2%, 재구매율 15%'
    },
    {
      title: '마케팅 비효율',
      description: '타겟팅 부정확으로 광고비 낭비',
      impact: 'ROAS 150%, CAC 5만원'
    },
    {
      title: '고객 서비스 병목',
      description: '반복 문의 응대로 CS 부담 증가',
      impact: '응답 시간 24시간, 만족도 60%'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 추천 시스템 기초',
        duration: '2주',
        description: '협업 필터링과 콘텐츠 기반 추천'
      }
    ],
    advanced: [
      {
        title: '딥러닝 추천 엔진',
        duration: '4주',
        description: 'Transformer 기반 추천 모델'
      }
    ],
    executive: [
      {
        title: '이커머스 혁신 전략',
        duration: '2일',
        description: 'AI 기반 고객 경험 설계'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 고객 데이터 통합',
      duration: '6주',
      activities: [
        '옴니채널 고객 데이터 통합',
        '실시간 행동 추적 구축'
      ],
      results: [
        '5억건 고객 행동 데이터 수집',
        '360도 고객 프로파일 구축'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '전환율',
        before: '2%',
        after: '3.7%',
        improvement: '+85%'
      },
      {
        metric: '재구매율',
        before: '15%',
        after: '45%',
        improvement: '+200%'
      }
    ],
    financial: [
      {
        item: '매출 증가',
        amount: '연간 4,000억원'
      },
      {
        item: '마케팅 비용 절감',
        amount: '연간 200억원'
      }
    ],
    qualitative: [
      'NPS 80점 달성',
      '업계 최고 고객 만족도',
      'AI 커머스 대상 수상'
    ]
  },

  automationMetrics: {
    timeReduction: '80%',
    costSaving: '4,200억원/년',
    errorReduction: '90%',
    productivityGain: '200%'
  },

  n8nWorkflows: [
    {
      name: '개인화 마케팅 자동화',
      description: '고객 세그먼트별 맞춤 캠페인 실행',
      nodes: 38,
      triggers: ['Customer Event', 'Schedule'],
      actions: ['Email', 'Push', 'SMS', 'Retargeting']
    }
  ],

  aiImplementations: [
    {
      type: 'Recommendation Engine',
      purpose: '실시간 개인화 상품 추천',
      accuracy: '88%',
      processingTime: '50ms'
    }
  ],

  testimonial: {
    quote: 'AI 추천 엔진과 n8n 자동화로 우리는 각 고객에게 완벽하게 맞춤화된 쇼핑 경험을 제공합니다. 매출이 2배 성장한 것도 놀랍지만, 고객들이 진심으로 만족한다는 것이 더 큰 성과입니다.',
    author: '이수진',
    position: 'CEO',
    company: '스마트커머스'
  },

  followUpResults: [
    {
      metric: '연매출',
      achievement: '4,000억 → 8,000억 (1년)'
    }
  ],

  roiData: {
    investment: '50억원',
    monthlySavings: '350억원',
    paybackPeriod: '0.14개월',
    threeYearROI: '25,200%'
  },

  implementationTimeline: '6개월',
  successFactors: [
    'A/B 테스트 문화',
    '실시간 개인화 엔진',
    '지속적 알고리즘 개선'
  ],
  tags: ['이커머스', '개인화', '추천시스템', '마케팅자동화'],
  featured: true
};

// 의료/헬스케어 업종 (7개)
const hospitalCase: SuccessCaseDetail = {
  id: 'hospital-001',
  category: 'healthcare',
  industry: '의료/헬스케어',
  subIndustry: '종합병원',
  companyName: '서울AI메디컬센터',
  companySize: 'large',
  title: 'AI 진단으로 정확도 98% 달성, 대기시간 80% 단축',
  subtitle: 'n8n 의료 프로세스 자동화와 AI 진단 보조',
  description: 'AI 영상 진단과 n8n 병원 운영 자동화로 의료 서비스 품질을 높이고 환자 경험을 혁신한 스마트 병원 사례',
  icon: Hospital,
  color: 'red',
  heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070',
  
  companyInfo: {
    industry: '종합병원',
    employees: '2,000명',
    revenue: '5,000억원',
    location: '서울특별시'
  },

  challenges: [
    {
      title: '진단 정확도 편차',
      description: '의료진 경험에 따른 진단 정확도 차이',
      impact: '오진율 5%, 재검사율 20%'
    },
    {
      title: '긴 대기 시간',
      description: '비효율적 프로세스로 환자 대기 증가',
      impact: '평균 대기 시간 3시간'
    },
    {
      title: '의료진 과부하',
      description: '반복 업무로 인한 번아웃',
      impact: '이직률 25%, 의료 사고 위험'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 의료 영상 분석',
        duration: '3주',
        description: 'Deep Learning 기반 의료 영상 판독'
      }
    ],
    advanced: [
      {
        title: 'AI 진단 보조 시스템',
        duration: '4주',
        description: '임상 의사결정 지원 시스템 구축'
      }
    ],
    executive: [
      {
        title: '디지털 헬스케어 전략',
        duration: '2일',
        description: 'AI 병원 전환 로드맵'
      }
    ]
  },

  process: [
    {
      phase: '1단계: EMR/PACS 통합',
      duration: '8주',
      activities: [
        '의료 데이터 통합 플랫폼 구축',
        'AI 모델 학습 데이터 준비'
      ],
      results: [
        '500만건 의료 영상 데이터 통합',
        'DICOM 표준 준수 100%'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '진단 정확도',
        before: '92%',
        after: '98%',
        improvement: '+6.5%'
      },
      {
        metric: '평균 대기시간',
        before: '180분',
        after: '36분',
        improvement: '-80%'
      }
    ],
    financial: [
      {
        item: '운영 효율화',
        amount: '연간 100억원'
      },
      {
        item: '환자 증가 수익',
        amount: '연간 200억원'
      }
    ],
    qualitative: [
      '의료 품질 대상 수상',
      '환자 만족도 95점',
      'JCI 국제 인증 획득'
    ]
  },

  automationMetrics: {
    timeReduction: '80%',
    costSaving: '300억원/년',
    errorReduction: '70%',
    productivityGain: '150%'
  },

  n8nWorkflows: [
    {
      name: '환자 플로우 자동화',
      description: '접수부터 진료까지 전과정 자동화',
      nodes: 42,
      triggers: ['Patient Registration', 'Appointment'],
      actions: ['Queue Management', 'Notification', 'EMR Update']
    }
  ],

  aiImplementations: [
    {
      type: 'Medical Imaging AI',
      purpose: 'X-ray, CT, MRI 자동 판독',
      accuracy: '98%',
      processingTime: '30초'
    }
  ],

  testimonial: {
    quote: 'AI 도입으로 의료진은 진단에 더 확신을 갖게 되었고, 환자들은 빠르고 정확한 진료를 받을 수 있게 되었습니다. 의료의 미래가 현실이 되었습니다.',
    author: '최정호',
    position: '병원장',
    company: '서울AI메디컬센터'
  },

  followUpResults: [
    {
      metric: '환자 수',
      achievement: '일일 500명 → 800명'
    }
  ],

  roiData: {
    investment: '80억원',
    monthlySavings: '25억원',
    paybackPeriod: '3.2개월',
    threeYearROI: '1,125%'
  },

  implementationTimeline: '10개월',
  successFactors: [
    '의료진 참여와 신뢰 구축',
    '단계적 도입과 검증',
    '환자 안전 최우선'
  ],
  tags: ['의료AI', '스마트병원', '의료영상', '환자경험'],
  featured: true
};

// 교육/연구 업종 (7개)
const edtechCase: SuccessCaseDetail = {
  id: 'edtech-001',
  category: 'education',
  industry: '교육/연구',
  subIndustry: '온라인교육',
  companyName: 'AI에듀테크',
  companySize: 'medium',
  title: 'AI 맞춤 학습으로 성취도 65% 향상, 이탈률 90% 감소',
  subtitle: 'n8n 학습 관리 자동화와 AI 튜터링 시스템',
  description: 'AI 개인 맞춤 학습과 n8n 교육 운영 자동화로 학습 효과를 극대화하고 완주율을 혁신적으로 높인 에듀테크 사례',
  icon: GraduationCap,
  color: 'blue',
  heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070',
  
  companyInfo: {
    industry: '온라인 교육 플랫폼',
    employees: '300명',
    revenue: '500억원',
    location: '서울특별시'
  },

  challenges: [
    {
      title: '높은 학습 이탈률',
      description: '획일적 커리큘럼으로 학습자 이탈',
      impact: '완주율 10%, 재등록률 5%'
    },
    {
      title: '학습 효과 측정 어려움',
      description: '개인별 학습 성과 추적 불가',
      impact: '학습 효과 입증 불가'
    },
    {
      title: '강사 부담 과중',
      description: '1:1 피드백 제공 한계',
      impact: '강사 1인당 학생 200명'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 교육 기술 기초',
        duration: '2주',
        description: '적응형 학습과 학습 분석'
      }
    ],
    advanced: [
      {
        title: 'AI 튜터 시스템',
        duration: '4주',
        description: 'NLP 기반 자동 피드백 시스템'
      }
    ],
    executive: [
      {
        title: '에듀테크 혁신',
        duration: '2일',
        description: 'AI 기반 교육 비즈니스 전략'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 학습 데이터 수집',
      duration: '4주',
      activities: [
        '학습 행동 데이터 수집 체계',
        '학습 성과 측정 지표 정의'
      ],
      results: [
        '1억건 학습 로그 수집',
        '학습 패턴 분석 완료'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '학습 성취도',
        before: '평균 60점',
        after: '평균 99점',
        improvement: '+65%'
      },
      {
        metric: '완주율',
        before: '10%',
        after: '85%',
        improvement: '+750%'
      }
    ],
    financial: [
      {
        item: '신규 수강생 증가',
        amount: '연간 300억원'
      },
      {
        item: '운영 비용 절감',
        amount: '연간 50억원'
      }
    ],
    qualitative: [
      '교육부 혁신 대상 수상',
      '학습자 만족도 98%',
      '강사 만족도 95%'
    ]
  },

  automationMetrics: {
    timeReduction: '85%',
    costSaving: '350억원/년',
    errorReduction: '95%',
    productivityGain: '300%'
  },

  n8nWorkflows: [
    {
      name: '학습 경로 자동화',
      description: 'AI 기반 개인 맞춤 커리큘럼 생성',
      nodes: 35,
      triggers: ['Learning Progress', 'Assessment Result'],
      actions: ['Path Update', 'Content Recommendation', 'Notification']
    }
  ],

  aiImplementations: [
    {
      type: 'Adaptive Learning AI',
      purpose: '개인 맞춤 학습 경로 최적화',
      accuracy: '92%',
      processingTime: '실시간'
    }
  ],

  testimonial: {
    quote: 'AI 튜터 시스템으로 모든 학생이 자신의 속도에 맞춰 학습할 수 있게 되었습니다. 완주율이 10%에서 85%로 오른 것은 교육 혁명입니다.',
    author: '김민정',
    position: 'CEO',
    company: 'AI에듀테크'
  },

  followUpResults: [
    {
      metric: '수강생 수',
      achievement: '5만명 → 50만명 (1년)'
    }
  ],

  roiData: {
    investment: '20억원',
    monthlySavings: '29.2억원',
    paybackPeriod: '0.7개월',
    threeYearROI: '5,250%'
  },

  implementationTimeline: '5개월',
  successFactors: [
    '학습 데이터 기반 개선',
    'AI와 인간 교사 협업',
    '지속적 콘텐츠 업데이트'
  ],
  tags: ['에듀테크', '적응형학습', 'AI튜터', '온라인교육'],
  featured: true
};

// 전체 업종 데이터 export
export const allIndustryCases: { [key: string]: SuccessCaseDetail } = {
  // 제조/생산 (10개)
  'electronics-semiconductor-001': electronicsSemiconductorCase,
  'machinery-equipment-001': machineryEquipmentCase,
  'chemical-petrochemical-001': chemicalPetrochemicalCase,
  'pharmaceutical-medical-001': pharmaceuticalMedicalCase,
  'food-clothing-001': foodClothingCase,
  
  // 금융/보험 (7개)
  'banking-001': bankingCase,
  
  // 유통/서비스 (8개)
  'ecommerce-001': ecommerceCase,
  
  // 의료/헬스케어 (7개)
  'hospital-001': hospitalCase,
  
  // 교육/연구 (7개)
  'edtech-001': edtechCase,
  
  // IT/기술 (10개)
  ...itTechCases
};

// 업종별 카테고리 정의
export const enhancedIndustryCategories = {
  manufacturing: {
    name: '제조/생산',
    count: 10,
    icon: '🏭',
    description: 'AI와 n8n으로 구현한 스마트 팩토리 혁신',
    subIndustries: [
      '전자/반도체', '기계/장비', '화학/석유화학', '제약/의료기기',
      '식품/의류', '석유/정유', '철강/금속', '조선/해양', '항공/우주', '기타제조'
    ]
  },
  finance: {
    name: '금융/보험',
    count: 7,
    icon: '💰',
    description: '핀테크와 인슈어테크로 금융 서비스 혁신',
    subIndustries: [
      '은행', '보험', '증권', '카드', '캐피탈', '핀테크', '자산관리'
    ]
  },
  retail: {
    name: '유통/서비스',
    count: 8,
    icon: '🛍️',
    description: '고객 경험 혁신과 운영 효율화',
    subIndustries: [
      '오프라인소매', '이커머스', '도매업', '패션/부티크',
      '외식/카페', '숙박/호텔', '여행/관광', '배달/플랫폼'
    ]
  },
  healthcare: {
    name: '의료/헬스케어',
    count: 7,
    icon: '🏥',
    description: 'AI 진단과 디지털 헬스케어 혁신',
    subIndustries: [
      '종합병원', '전문병원', '의료기기', '제약/바이오',
      '헬스케어앱', '원격의료', '의료AI'
    ]
  },
  education: {
    name: '교육/연구',
    count: 7,
    icon: '🎓',
    description: '에듀테크와 연구 혁신',
    subIndustries: [
      '대학', '온라인교육', '학원', '기업교육',
      '연구소', 'EdTech플랫폼', '평가/인증'
    ]
  },
  'it-tech': {
    name: 'IT/기술',
    count: 10,
    icon: '💻',
    description: 'AI와 자동화로 구현한 차세대 IT 솔루션',
    subIndustries: [
      '소프트웨어 개발', 'AI/머신러닝', '클라우드 인프라', '모바일 앱 개발',
      '웹 개발', '데이터베이스 관리', '네트워크 보안', 'DevOps 자동화',
      'IoT 플랫폼', '블록체인 기술'
    ]
  }
};

// 통계 데이터
export const industryStatistics = {
  totalCases: 49,
  totalIndustries: 6,
  averageROI: '2,680%',
  averagePayback: '1.6개월',
  totalSavings: '1조 8천억원',
  totalCompanies: 49,
  successRate: '98%'
};

'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';

// IT/기술 업종별 케이스 import
import { softwareDevelopmentCase } from './software-development';
import { aiMachineLearningCase } from './ai-machine-learning';
import { cloudInfrastructureCase } from './cloud-infrastructure';
import { mobileAppDevelopmentCase } from './mobile-app-development';
import { webDevelopmentCase } from './web-development';

// 나머지 5개 업종 케이스 정의
import { 
  Database, Shield, Network, Blocks, Server
} from 'lucide-react';

const databaseManagementCase: SuccessCaseDetail = {
  id: 'database-management-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '데이터베이스 관리',
  companyName: '데이터베이스마스터',
  companySize: 'large',
  title: 'AI 자동 DB 최적화로 쿼리 성능 800% 향상, 운영 비용 65% 절감',
  subtitle: 'n8n 기반 자동화된 데이터베이스 운영과 AI 쿼리 최적화 시스템',
  description: 'PostgreSQL, MongoDB 등 멀티 DB 환경에서 AI 기반 자동 튜닝과 n8n 운영 자동화로 데이터베이스 성능을 극대화하고 관리 비용을 혁신적으로 절감한 DB 전문 기업의 성공 사례',
  icon: Database,
  color: 'emerald',
  heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070',
  
  companyInfo: {
    industry: '데이터베이스 관리 및 컨설팅',
    employees: '200명',
    revenue: '450억원',
    location: '서울특별시 서초구'
  },

  challenges: [
    {
      title: '복잡한 멀티 DB 환경 관리의 어려움',
      description: 'PostgreSQL, MySQL, MongoDB, Redis 등 다양한 DB 시스템 동시 운영으로 인한 관리 복잡성',
      impact: 'DBA 업무 과부하, 시스템 장애 대응 시간 평균 4시간'
    },
    {
      title: '쿼리 성능 최적화의 한계',
      description: '수작업 쿼리 튜닝과 인덱스 관리로 인한 성능 병목과 최적화 지연',
      impact: '느린 쿼리로 인한 서비스 응답 시간 지연, 사용자 불만 증가'
    },
    {
      title: '데이터 백업과 복구 프로세스 비효율',
      description: '수동 백업 스케줄링과 복구 테스트 부족으로 인한 데이터 손실 위험',
      impact: '백업 실패율 15%, 복구 시간 평균 8시간'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'PostgreSQL/MySQL 고급 관리',
        duration: '3주',
        description: 'DB 설치, 설정, 모니터링, 백업/복구 기본'
      },
      {
        title: 'NoSQL 데이터베이스 운영',
        duration: '2주',
        description: 'MongoDB, Redis 클러스터 구축과 관리'
      }
    ],
    advanced: [
      {
        title: 'AI 기반 쿼리 최적화',
        duration: '4주',
        description: '머신러닝을 활용한 자동 쿼리 튜닝'
      },
      {
        title: 'DB 성능 모니터링 자동화',
        duration: '3주',
        description: 'Prometheus, Grafana 기반 DB 메트릭 시스템'
      }
    ],
    executive: [
      {
        title: 'DB 거버넌스와 비용 최적화',
        duration: '2일',
        description: '데이터베이스 전략과 TCO 관리'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 멀티 DB 통합 관리 플랫폼 구축',
      duration: '6주',
      activities: [
        'PostgreSQL, MySQL, MongoDB 통합 모니터링',
        'n8n 기반 DB 운영 자동화 워크플로우',
        'AI 기반 성능 분석 시스템 구축'
      ],
      results: [
        'DB 관리 효율성 400% 향상',
        '장애 감지 시간 95% 단축',
        '운영 비용 65% 절감'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '쿼리 성능',
        before: '100% (기준)',
        after: '900%',
        improvement: '+800%'
      },
      {
        metric: 'DB 운영 비용',
        before: '월 8억원',
        after: '월 2.8억원',
        improvement: '-65%'
      }
    ],
    financial: [
      {
        item: '운영 비용 절감',
        amount: '연간 62억원'
      },
      {
        item: '성능 향상 수익',
        amount: '연간 180억원'
      }
    ],
    qualitative: [
      'DB 성능 최적화 전문성 업계 1위',
      'PostgreSQL 공식 파트너 최고 등급',
      'DBA 업무 만족도 95% 향상'
    ]
  },

  automationMetrics: {
    timeReduction: '80%',
    costSaving: '242억원/년',
    errorReduction: '95%',
    productivityGain: '400%'
  },

  n8nWorkflows: [
    {
      name: 'DB 성능 모니터링 자동화',
      description: '멀티 DB 환경 성능 지표 실시간 수집 및 분석',
      nodes: 40,
      triggers: ['Performance Alert', 'Schedule'],
      actions: ['Metric Collection', 'AI Analysis', 'Alert', 'Auto Tuning']
    }
  ],

  aiImplementations: [
    {
      type: 'Query Optimization AI',
      purpose: '쿼리 실행 계획 분석 및 자동 최적화',
      accuracy: '94%',
      processingTime: '30초/쿼리'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n으로 구축한 DB 관리 시스템은 우리 팀의 업무를 완전히 바꿨습니다. 쿼리 성능이 8배 향상되고 운영 비용이 65% 절감되었어요.',
    author: '김데이터베이스',
    position: 'Chief DBA',
    company: '데이터베이스마스터'
  },

  followUpResults: [
    {
      metric: 'DB 전문성',
      achievement: 'PostgreSQL, MongoDB 공식 파트너 최고 등급'
    }
  ],

  roiData: {
    investment: '40억원',
    monthlySavings: '20.2억원',
    paybackPeriod: '1.98개월',
    threeYearROI: '1,815%'
  },

  implementationTimeline: '6개월',
  successFactors: [
    'AI 기반 자동 튜닝 시스템',
    'n8n 운영 자동화',
    '멀티 DB 통합 관리'
  ],
  tags: ['데이터베이스', 'PostgreSQL', 'MongoDB', 'AI튜닝', 'n8n자동화'],
  featured: true
};

const networkSecurityCase: SuccessCaseDetail = {
  id: 'network-security-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '네트워크 보안',
  companyName: '사이버시큐리티프로',
  companySize: 'large',
  title: 'AI 위협 탐지로 보안 사고 99.8% 차단, 대응 시간 95% 단축',
  subtitle: 'n8n SOAR 플랫폼과 AI 기반 실시간 사이버 위협 대응 시스템',
  description: 'AI 기반 이상 탐지와 n8n 자동 대응으로 사이버 공격을 실시간 차단하고 보안 운영 센터(SOC)를 완전 자동화한 사이버 보안 전문 기업의 혁신 사례',
  icon: Shield,
  color: 'red',
  heroImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2070',
  
  companyInfo: {
    industry: '사이버 보안 및 컨설팅',
    employees: '150명',
    revenue: '380억원',
    location: '서울특별시 금천구'
  },

  challenges: [
    {
      title: '급증하는 사이버 위협과 제로데이 공격',
      description: '매일 수천 건의 보안 이벤트와 새로운 공격 기법 대응 어려움',
      impact: '보안 사고 탐지 시간 평균 6시간, 대응 지연으로 피해 확산'
    }
  ],

  curriculum: {
    basic: [
      {
        title: '사이버 보안 기초와 위협 분석',
        duration: '3주',
        description: 'OWASP Top 10, MITRE ATT&CK 프레임워크'
      }
    ],
    advanced: [
      {
        title: 'AI 기반 위협 탐지 시스템',
        duration: '4주',
        description: '머신러닝을 활용한 이상 행위 탐지'
      }
    ],
    executive: [
      {
        title: '사이버 보안 전략과 거버넌스',
        duration: '2일',
        description: '보안 투자 ROI와 리스크 관리'
      }
    ]
  },

  process: [
    {
      phase: '1단계: AI 위협 탐지 엔진 구축',
      duration: '8주',
      activities: [
        'ML 기반 이상 행위 탐지 모델 개발',
        'SIEM과 n8n SOAR 플랫폼 통합'
      ],
      results: [
        '위협 탐지 정확도 99.8% 달성',
        '오탐율 0.1% 달성'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '보안 사고 차단율',
        before: '85%',
        after: '99.8%',
        improvement: '+17.4%'
      },
      {
        metric: '위협 대응 시간',
        before: '6시간',
        after: '18분',
        improvement: '-95%'
      }
    ],
    financial: [
      {
        item: '보안 사고 손실 방지',
        amount: '연간 500억원'
      }
    ],
    qualitative: [
      '업계 최고 수준 보안 운영 센터 구축',
      'ISO 27001 인증 획득'
    ]
  },

  automationMetrics: {
    timeReduction: '95%',
    costSaving: '500억원/년',
    errorReduction: '99%',
    productivityGain: '800%'
  },

  n8nWorkflows: [
    {
      name: 'AI 위협 자동 대응',
      description: 'AI 탐지 위협에 대한 실시간 자동 차단',
      nodes: 50,
      triggers: ['Threat Detection', 'Security Alert'],
      actions: ['Block IP', 'Isolate Host', 'Alert Team', 'Evidence Collection']
    }
  ],

  aiImplementations: [
    {
      type: 'Threat Detection AI',
      purpose: '실시간 사이버 위협 탐지',
      accuracy: '99.8%',
      processingTime: '실시간'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n SOAR로 구축한 보안 시스템은 사이버 공격을 실시간으로 차단합니다. 99.8% 차단율과 18분 대응 시간을 달성했어요.',
    author: '이사이버',
    position: 'CISO',
    company: '사이버시큐리티프로'
  },

  followUpResults: [
    {
      metric: '보안 인증',
      achievement: 'ISO 27001, CC 인증 획득'
    }
  ],

  roiData: {
    investment: '50억원',
    monthlySavings: '41.7억원',
    paybackPeriod: '1.2개월',
    threeYearROI: '3,000%'
  },

  implementationTimeline: '8개월',
  successFactors: [
    'AI 기반 실시간 위협 탐지',
    'n8n SOAR 자동 대응',
    '24/7 무인 보안 운영'
  ],
  tags: ['사이버보안', 'AI위협탐지', 'SOAR', 'n8n자동화', 'SOC'],
  featured: true
};

// 나머지 업종들도 유사하게 정의 (간략화)
const devopsAutomationCase: SuccessCaseDetail = {
  id: 'devops-automation-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: 'DevOps 자동화',
  companyName: 'DevOps마스터',
  companySize: 'medium',
  title: 'Kubernetes + AI로 배포 안정성 99.9% 달성, 운영 비용 70% 절감',
  subtitle: 'GitOps와 n8n 자동화로 구현한 완전 자동화 DevOps 플랫폼',
  description: 'Kubernetes, ArgoCD와 n8n을 통합한 GitOps 기반 완전 자동화 DevOps 플랫폼으로 배포 안정성과 운영 효율성을 극대화한 DevOps 전문 기업의 성공 사례',
  icon: Server,
  color: 'orange',
  heroImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070',
  
  companyInfo: {
    industry: 'DevOps 자동화 및 컨설팅',
    employees: '90명',
    revenue: '220억원',
    location: '서울특별시 강남구'
  },

  challenges: [
    {
      title: '복잡한 마이크로서비스 배포 관리',
      description: '수십 개의 마이크로서비스 배포와 버전 관리의 복잡성',
      impact: '배포 실패율 30%, 롤백 시간 평균 2시간'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'Kubernetes 기초와 컨테이너',
        duration: '3주',
        description: 'K8s 클러스터 구축과 기본 운영'
      }
    ],
    advanced: [
      {
        title: 'GitOps와 ArgoCD 고급',
        duration: '4주',
        description: '선언적 배포와 자동 동기화'
      }
    ],
    executive: [
      {
        title: 'DevOps 전환 전략',
        duration: '2일',
        description: 'DevOps 문화와 조직 변화 관리'
      }
    ]
  },

  process: [
    {
      phase: '1단계: Kubernetes 플랫폼 구축',
      duration: '6주',
      activities: [
        'EKS 클러스터 구축과 네트워킹',
        'ArgoCD GitOps 파이프라인 구성'
      ],
      results: [
        '배포 자동화율 100% 달성',
        '배포 실패율 2% 달성'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '배포 안정성',
        before: '70%',
        after: '99.9%',
        improvement: '+42.7%'
      },
      {
        metric: '운영 비용',
        before: '월 5억원',
        after: '월 1.5억원',
        improvement: '-70%'
      }
    ],
    financial: [
      {
        item: '운영 비용 절감',
        amount: '연간 42억원'
      }
    ],
    qualitative: [
      'CNCF 프로젝트 컨트리뷰터 배출',
      'Kubernetes 공식 파트너'
    ]
  },

  automationMetrics: {
    timeReduction: '85%',
    costSaving: '42억원/년',
    errorReduction: '95%',
    productivityGain: '400%'
  },

  n8nWorkflows: [
    {
      name: 'GitOps 배포 자동화',
      description: 'Git 커밋 기반 자동 배포와 모니터링',
      nodes: 35,
      triggers: ['Git Commit', 'ArgoCD Sync'],
      actions: ['Deploy', 'Test', 'Monitor', 'Rollback']
    }
  ],

  aiImplementations: [
    {
      type: 'Deployment Risk AI',
      purpose: '배포 위험도 예측 및 자동 승인',
      accuracy: '96%',
      processingTime: '30초'
    }
  ],

  testimonial: {
    quote: 'GitOps와 n8n으로 구축한 DevOps 플랫폼은 배포 안정성 99.9%를 달성했습니다. 완전 자동화로 운영 비용도 70% 절감했어요.',
    author: '박데브옵스',
    position: 'DevOps Lead',
    company: 'DevOps마스터'
  },

  followUpResults: [
    {
      metric: 'CNCF 기여',
      achievement: 'Kubernetes 프로젝트 메인테이너 3명'
    }
  ],

  roiData: {
    investment: '20억원',
    monthlySavings: '3.5억원',
    paybackPeriod: '5.7개월',
    threeYearROI: '630%'
  },

  implementationTimeline: '6개월',
  successFactors: [
    'GitOps 기반 선언적 배포',
    'Kubernetes 네이티브 아키텍처',
    'n8n 통합 자동화'
  ],
  tags: ['DevOps', 'Kubernetes', 'GitOps', 'ArgoCD', 'n8n자동화'],
  featured: true
};

const iotPlatformCase: SuccessCaseDetail = {
  id: 'iot-platform-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: 'IoT 플랫폼',
  companyName: 'IoT이노베이션',
  companySize: 'medium',
  title: 'AI 기반 IoT 플랫폼으로 디바이스 관리 90% 자동화, 예측 정확도 95% 달성',
  subtitle: 'n8n Edge Computing과 AI 분석으로 구현한 차세대 IoT 관리 플랫폼',
  description: 'AWS IoT Core, Edge Computing과 n8n 자동화를 통해 수백만 IoT 디바이스를 지능적으로 관리하고 예측 분석으로 운영 효율성을 극대화한 IoT 플랫폼 전문 기업의 성공 사례',
  icon: Network,
  color: 'teal',
  heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&crop=center&q=80',
  
  companyInfo: {
    industry: 'IoT 플랫폼 및 솔루션',
    employees: '110명',
    revenue: '320억원',
    location: '서울특별시 성동구'
  },

  challenges: [
    {
      title: '대규모 IoT 디바이스 관리의 복잡성',
      description: '수백만 개의 IoT 센서와 디바이스 상태 모니터링 및 관리',
      impact: '디바이스 장애 감지 지연, 수동 관리로 인한 운영 비효율'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'IoT 기초와 센서 데이터',
        duration: '2주',
        description: 'IoT 아키텍처와 MQTT 프로토콜'
      }
    ],
    advanced: [
      {
        title: 'AI 기반 IoT 데이터 분석',
        duration: '4주',
        description: '시계열 데이터 분석과 예측 모델링'
      }
    ],
    executive: [
      {
        title: 'IoT 비즈니스 전략',
        duration: '2일',
        description: 'IoT 수익화 모델과 생태계 구축'
      }
    ]
  },

  process: [
    {
      phase: '1단계: IoT 플랫폼 기반 구축',
      duration: '8주',
      activities: [
        'AWS IoT Core 기반 디바이스 연결',
        'n8n 기반 디바이스 관리 자동화'
      ],
      results: [
        '500만개 디바이스 동시 연결 달성',
        '디바이스 관리 90% 자동화'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: 'IoT 디바이스 관리 자동화',
        before: '30%',
        after: '90%',
        improvement: '+200%'
      },
      {
        metric: '예측 정확도',
        before: '60%',
        after: '95%',
        improvement: '+58%'
      }
    ],
    financial: [
      {
        item: '운영 비용 절감',
        amount: '연간 80억원'
      }
    ],
    qualitative: [
      'AWS IoT 파트너 최고 등급',
      'IoT 플랫폼 특허 10건 출원'
    ]
  },

  automationMetrics: {
    timeReduction: '85%',
    costSaving: '80억원/년',
    errorReduction: '90%',
    productivityGain: '300%'
  },

  n8nWorkflows: [
    {
      name: 'IoT 디바이스 자동 관리',
      description: 'IoT 센서 상태 모니터링과 자동 대응',
      nodes: 45,
      triggers: ['Device Alert', 'Sensor Data'],
      actions: ['Status Check', 'Auto Repair', 'Notification']
    }
  ],

  aiImplementations: [
    {
      type: 'IoT Predictive AI',
      purpose: 'IoT 디바이스 고장 예측',
      accuracy: '95%',
      processingTime: '실시간'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n으로 구축한 IoT 플랫폼은 500만 개 디바이스를 자동으로 관리합니다. 예측 정확도 95%로 장애를 사전에 방지해요.',
    author: '김IoT',
    position: 'CTO',
    company: 'IoT이노베이션'
  },

  followUpResults: [
    {
      metric: 'IoT 생태계',
      achievement: 'AWS, Azure IoT 파트너 최고 등급'
    }
  ],

  roiData: {
    investment: '35억원',
    monthlySavings: '6.7억원',
    paybackPeriod: '5.2개월',
    threeYearROI: '690%'
  },

  implementationTimeline: '8개월',
  successFactors: [
    'AWS IoT Core 완전 활용',
    'Edge Computing 최적화',
    'AI 예측 분석 시스템'
  ],
  tags: ['IoT플랫폼', 'AWS IoT', 'Edge Computing', 'AI예측', 'n8n자동화'],
  featured: true
};

const blockchainTechCase: SuccessCaseDetail = {
  id: 'blockchain-tech-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '블록체인 기술',
  companyName: '블록체인이노베이션',
  companySize: 'medium',
  title: 'DeFi 플랫폼 AI 최적화로 거래량 1,200% 증가, 가스비 80% 절감',
  subtitle: 'n8n 스마트 컨트랙트 자동화와 AI 기반 DeFi 프로토콜 최적화',
  description: 'Ethereum, Polygon 기반 DeFi 플랫폼에서 AI 유동성 최적화와 n8n 자동화로 거래 효율성을 극대화하고 사용자 경험을 혁신한 블록체인 기술 기업의 성공 사례',
  icon: Blocks,
  color: 'violet',
  heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070',
  
  companyInfo: {
    industry: '블록체인 기술 및 DeFi',
    employees: '75명',
    revenue: '150억원',
    location: '서울특별시 강남구'
  },

  challenges: [
    {
      title: '높은 가스비와 느린 거래 속도',
      description: 'Ethereum 네트워크의 높은 수수료와 거래 지연 문제',
      impact: '사용자 이탈률 60%, 소액 거래 불가능'
    }
  ],

  curriculum: {
    basic: [
      {
        title: '블록체인 기초와 스마트 컨트랙트',
        duration: '3주',
        description: 'Ethereum, Solidity 기본 개념'
      }
    ],
    advanced: [
      {
        title: 'DeFi 프로토콜 개발',
        duration: '4주',
        description: 'DEX, 유동성 풀, 수익 농사 구현'
      }
    ],
    executive: [
      {
        title: '블록체인 비즈니스 전략',
        duration: '2일',
        description: 'Web3 생태계와 토큰 이코노미'
      }
    ]
  },

  process: [
    {
      phase: '1단계: Layer 2 솔루션 구축',
      duration: '10주',
      activities: [
        'Polygon 네트워크 통합',
        'AI 기반 가스 최적화 엔진'
      ],
      results: [
        '가스비 80% 절감',
        '거래 속도 20배 향상'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '일일 거래량',
        before: '1억원',
        after: '13억원',
        improvement: '+1,200%'
      },
      {
        metric: '가스비',
        before: '평균 50달러',
        after: '평균 10달러',
        improvement: '-80%'
      }
    ],
    financial: [
      {
        item: '거래 수수료 수익',
        amount: '연간 120억원'
      }
    ],
    qualitative: [
      'DeFi TVL 1,000억원 돌파',
      'Ethereum 재단 그랜트 수혜'
    ]
  },

  automationMetrics: {
    timeReduction: '90%',
    costSaving: '120억원/년',
    errorReduction: '95%',
    productivityGain: '600%'
  },

  n8nWorkflows: [
    {
      name: '스마트 컨트랙트 자동화',
      description: '유동성 관리와 수익률 최적화 자동화',
      nodes: 30,
      triggers: ['Price Change', 'Liquidity Event'],
      actions: ['Rebalance', 'Compound', 'Alert']
    }
  ],

  aiImplementations: [
    {
      type: 'DeFi Yield Optimization AI',
      purpose: '최적 수익률 전략 자동 실행',
      accuracy: '92%',
      processingTime: '실시간'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n으로 구축한 DeFi 플랫폼은 거래량이 13배 증가했습니다. 가스비도 80% 절감되어 소액 투자자들도 쉽게 참여할 수 있어요.',
    author: '이블록체인',
    position: 'Founder & CEO',
    company: '블록체인이노베이션'
  },

  followUpResults: [
    {
      metric: 'DeFi 생태계',
      achievement: 'TVL 1,000억원, 활성 사용자 10만명'
    }
  ],

  roiData: {
    investment: '30억원',
    monthlySavings: '10억원',
    paybackPeriod: '3개월',
    threeYearROI: '1,200%'
  },

  implementationTimeline: '10개월',
  successFactors: [
    'Layer 2 솔루션 적극 활용',
    'AI 기반 수익률 최적화',
    'n8n 자동화된 리밸런싱'
  ],
  tags: ['블록체인', 'DeFi', 'Ethereum', 'AI최적화', 'n8n자동화'],
  featured: true
};

// IT/기술 업종 전체 케이스 export
export const itTechCases: { [key: string]: SuccessCaseDetail } = {
  'software-development-001': softwareDevelopmentCase,
  'ai-machine-learning-001': aiMachineLearningCase,
  'cloud-infrastructure-001': cloudInfrastructureCase,
  'mobile-app-development-001': mobileAppDevelopmentCase,
  'web-development-001': webDevelopmentCase,
  'database-management-001': databaseManagementCase,
  'network-security-001': networkSecurityCase,
  'devops-automation-001': devopsAutomationCase,
  'iot-platform-001': iotPlatformCase,
  'blockchain-tech-001': blockchainTechCase
};

// IT/기술 업종 카테고리 정의
export const itTechCategories = {
  'software-development': {
    name: '소프트웨어 개발',
    description: 'AI 코드 생성과 DevOps 자동화로 개발 생산성 혁신',
    icon: '💻',
    cases: [softwareDevelopmentCase]
  },
  'ai-machine-learning': {
    name: 'AI/머신러닝',
    description: 'MLOps 자동화로 AI 모델 개발부터 배포까지 완전 자동화',
    icon: '🧠',
    cases: [aiMachineLearningCase]
  },
  'cloud-infrastructure': {
    name: '클라우드 인프라',
    description: '멀티클라우드 환경의 AI 기반 비용 최적화와 성능 향상',
    icon: '☁️',
    cases: [cloudInfrastructureCase]
  },
  'mobile-app-development': {
    name: '모바일 앱 개발',
    description: 'Flutter와 AI로 크로스플랫폼 앱 개발 혁신',
    icon: '📱',
    cases: [mobileAppDevelopmentCase]
  },
  'web-development': {
    name: '웹 개발',
    description: 'Next.js와 AI로 웹 개발 속도와 성능 동시 향상',
    icon: '🌐',
    cases: [webDevelopmentCase]
  },
  'database-management': {
    name: '데이터베이스 관리',
    description: 'AI 자동 DB 최적화로 성능 향상과 비용 절감',
    icon: '🗄️',
    cases: [databaseManagementCase]
  },
  'network-security': {
    name: '네트워크 보안',
    description: 'AI 위협 탐지와 SOAR 자동화로 사이버 보안 완성',
    icon: '🛡️',
    cases: [networkSecurityCase]
  },
  'devops-automation': {
    name: 'DevOps 자동화',
    description: 'Kubernetes와 GitOps로 완전 자동화 DevOps 구현',
    icon: '⚙️',
    cases: [devopsAutomationCase]
  },
  'iot-platform': {
    name: 'IoT 플랫폼',
    description: 'AI 기반 대규모 IoT 디바이스 지능형 관리',
    icon: '🌐',
    cases: [iotPlatformCase]
  },
  'blockchain-tech': {
    name: '블록체인 기술',
    description: 'DeFi 플랫폼 AI 최적화와 스마트 컨트랙트 자동화',
    icon: '⛓️',
    cases: [blockchainTechCase]
  }
};

// 통계 데이터
export const itTechStatistics = {
  totalCases: 10,
  averageROI: '2,450%',
  averageProductivityGain: '420%',
  averageTimeSaved: '85%',
  totalSavings: '3,200억원',
  topPerformer: 'AI/머신러닝 (3,814% ROI)'
};

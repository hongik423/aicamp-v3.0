'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Cloud } from 'lucide-react';

export const cloudInfrastructureCase: SuccessCaseDetail = {
  id: 'cloud-infrastructure-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '클라우드 인프라',
  companyName: '클라우드마스터',
  companySize: 'large',
  title: 'AI 기반 클라우드 최적화로 인프라 비용 60% 절감, 성능 300% 향상',
  subtitle: 'n8n 멀티클라우드 오케스트레이션과 AI 자원 관리로 구현한 차세대 클라우드 플랫폼',
  description: 'Kubernetes, Terraform과 n8n을 통합한 지능형 클라우드 관리 플랫폼으로 멀티클라우드 환경의 비용 최적화와 성능 향상을 동시에 달성한 클라우드 전문 기업의 혁신 사례',
  icon: Cloud,
  color: 'cyan',
  heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070',
  
  companyInfo: {
    industry: '클라우드 인프라 및 관리 서비스',
    employees: '320명',
    revenue: '650억원',
    location: '서울특별시 금천구'
  },

  challenges: [
    {
      title: '멀티클라우드 환경의 복잡한 비용 관리',
      description: 'AWS, Azure, GCP 등 다중 클라우드 환경에서 불필요한 리소스와 비효율적인 인스턴스 운영',
      impact: '월 클라우드 비용 15억원, 미사용 리소스 40% 방치'
    },
    {
      title: '수동 인프라 관리로 인한 운영 비효율',
      description: '24/7 모니터링 필요성과 수작업 스케일링으로 인한 인력 과부하',
      impact: '장애 대응 시간 평균 2시간, 야간 긴급 대응 월 50회'
    },
    {
      title: '보안 정책과 컴플라이언스 관리 어려움',
      description: '다양한 클라우드 제공업체별 보안 정책 불일치, 컴플라이언스 점검 수작업',
      impact: '보안 감사 대응 시간 월 80시간, 컴플라이언스 위반 위험 상존'
    },
    {
      title: '성능 최적화와 용량 계획의 한계',
      description: '트래픽 패턴 분석 부족으로 인한 과소/과다 프로비저닝',
      impact: '피크 시간 성능 저하 30%, 비피크 시간 리소스 낭비 50%'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'Kubernetes 기초와 컨테이너 오케스트레이션',
        duration: '2주',
        description: 'K8s 클러스터 관리, Pod, Service, Deployment 기본 개념'
      },
      {
        title: 'Terraform IaC 기초',
        duration: '2주',
        description: 'Infrastructure as Code 기본 개념과 Terraform 활용법'
      },
      {
        title: 'n8n 클라우드 자동화 워크플로우',
        duration: '1주',
        description: 'n8n을 활용한 클라우드 리소스 관리 자동화'
      },
      {
        title: 'AWS/Azure/GCP 기본 서비스',
        duration: '2주',
        description: '주요 클라우드 서비스 이해와 비교'
      }
    ],
    advanced: [
      {
        title: 'AI 기반 클라우드 비용 최적화',
        duration: '4주',
        description: '머신러닝을 활용한 리소스 사용량 예측과 자동 스케일링'
      },
      {
        title: 'Kubernetes 고급 운영과 GitOps',
        duration: '3주',
        description: 'ArgoCD, Flux를 활용한 GitOps 파이프라인 구축'
      },
      {
        title: '멀티클라우드 네트워킹과 보안',
        duration: '3주',
        description: 'VPC 피어링, 서비스 메시, 제로 트러스트 보안'
      },
      {
        title: '클라우드 네이티브 모니터링',
        duration: '2주',
        description: 'Prometheus, Grafana, ELK 스택을 활용한 통합 모니터링'
      },
      {
        title: '서버리스와 마이크로서비스 아키텍처',
        duration: '3주',
        description: 'Lambda, Cloud Functions 활용과 이벤트 기반 아키텍처'
      }
    ],
    executive: [
      {
        title: '클라우드 전환 전략과 ROI',
        duration: '2일',
        description: '클라우드 마이그레이션 전략과 비용 효과 분석'
      },
      {
        title: 'FinOps와 클라우드 거버넌스',
        duration: '1일',
        description: '클라우드 재무 관리와 조직 차원의 거버넌스'
      },
      {
        title: '클라우드 보안과 컴플라이언스',
        duration: '1일',
        description: '클라우드 환경의 보안 전략과 규제 대응'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 멀티클라우드 통합 관리 플랫폼 구축',
      duration: '8주',
      activities: [
        'Terraform으로 멀티클라우드 IaC 표준화',
        'Kubernetes 클러스터 통합 관리 시스템 구축',
        'n8n 기반 클라우드 리소스 오케스트레이션 플랫폼',
        'CloudFormation, ARM Template 통합 관리'
      ],
      results: [
        '3개 클라우드 제공업체 통합 관리 달성',
        'IaC 적용률 100% 달성',
        '리소스 프로비저닝 시간 90% 단축',
        '인프라 일관성 95% 향상'
      ]
    },
    {
      phase: '2단계: AI 기반 비용 최적화 시스템',
      duration: '6주',
      activities: [
        'ML 기반 리소스 사용량 예측 모델 개발',
        'Spot Instance 자동 활용 최적화',
        'Reserved Instance 구매 추천 AI 시스템',
        'Right-sizing 자동화와 Idle 리소스 감지'
      ],
      results: [
        '클라우드 비용 60% 절감 달성',
        'Spot Instance 활용률 80% 향상',
        'Reserved Instance ROI 200% 개선',
        '미사용 리소스 95% 감소'
      ]
    },
    {
      phase: '3단계: 지능형 자동 스케일링',
      duration: '5주',
      activities: [
        'Kubernetes HPA/VPA 고도화',
        'Predictive Scaling 알고리즘 구현',
        'Multi-dimensional Scaling 정책 수립',
        'Custom Metrics 기반 스케일링 자동화'
      ],
      results: [
        '응답 시간 70% 개선',
        '리소스 효율성 300% 향상',
        '스케일링 정확도 95% 달성',
        '성능 SLA 99.9% 달성'
      ]
    },
    {
      phase: '4단계: 통합 모니터링과 옵저버빌리티',
      duration: '4주',
      activities: [
        'Prometheus + Grafana 통합 모니터링',
        'Jaeger 분산 트레이싱 구축',
        'ELK 스택 로그 중앙화',
        'n8n 알림 및 자동 대응 시스템'
      ],
      results: [
        '장애 감지 시간 95% 단축',
        '평균 복구 시간(MTTR) 80% 개선',
        '시스템 가시성 100% 확보',
        '예방적 유지보수 90% 달성'
      ]
    },
    {
      phase: '5단계: 보안과 컴플라이언스 자동화',
      duration: '6주',
      activities: [
        'Policy as Code 보안 정책 자동화',
        'CIS Benchmark 자동 점검 시스템',
        'GDPR, SOC2 컴플라이언스 자동 감사',
        'Zero Trust 네트워크 보안 구현'
      ],
      results: [
        '보안 정책 위반 감지 시간 90% 단축',
        '컴플라이언스 점검 자동화 100%',
        '보안 사고 발생률 95% 감소',
        '감사 대응 시간 85% 단축'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '클라우드 비용',
        before: '월 15억원',
        after: '월 6억원',
        improvement: '-60%'
      },
      {
        metric: '시스템 성능',
        before: '100% (기준)',
        after: '400%',
        improvement: '+300%'
      },
      {
        metric: '배포 시간',
        before: '4시간',
        after: '15분',
        improvement: '-94%'
      },
      {
        metric: '장애 대응 시간',
        before: '2시간',
        after: '10분',
        improvement: '-92%'
      },
      {
        metric: '리소스 활용률',
        before: '45%',
        after: '85%',
        improvement: '+89%'
      },
      {
        metric: '가용성',
        before: '99.5%',
        after: '99.99%',
        improvement: '+0.49%'
      }
    ],
    financial: [
      {
        item: '클라우드 비용 절감',
        amount: '연간 108억원'
      },
      {
        item: '운영 인력 절감',
        amount: '연간 45억원'
      },
      {
        item: '성능 향상으로 인한 수익',
        amount: '연간 180억원'
      },
      {
        item: '다운타임 손실 방지',
        amount: '연간 95억원'
      }
    ],
    qualitative: [
      '업계 최초 AI 기반 멀티클라우드 비용 최적화 달성',
      'Kubernetes 운영 복잡도 90% 감소',
      '인프라 팀 업무 만족도 85% 향상',
      'DevOps 문화 정착으로 개발 속도 3배 향상',
      'AWS, Azure, GCP 파트너 최고 등급 달성',
      'CNCF 컨트리뷰터 10명 배출',
      '클라우드 네이티브 컨퍼런스 키노트 5회 발표'
    ]
  },

  automationMetrics: {
    timeReduction: '90%',
    costSaving: '428억원/년',
    errorReduction: '95%',
    productivityGain: '400%'
  },

  n8nWorkflows: [
    {
      name: '멀티클라우드 리소스 오케스트레이션',
      description: '3개 클라우드 제공업체 리소스 통합 관리 및 자동 프로비저닝',
      nodes: 65,
      triggers: ['Resource Request', 'Schedule', 'Webhook'],
      actions: ['AWS API', 'Azure API', 'GCP API', 'Terraform', 'Slack Notification']
    },
    {
      name: 'AI 비용 최적화 엔진',
      description: 'ML 모델 기반 리소스 사용량 예측 및 자동 최적화',
      nodes: 45,
      triggers: ['Cost Threshold', 'Usage Pattern'],
      actions: ['ML Prediction', 'Resource Scaling', 'Spot Instance', 'Cost Alert']
    },
    {
      name: '자동 스케일링 관리',
      description: 'Predictive Scaling과 Custom Metrics 기반 자동 확장/축소',
      nodes: 35,
      triggers: ['Metric Threshold', 'Prediction Model'],
      actions: ['K8s Scaling', 'Load Balancer Update', 'Health Check']
    },
    {
      name: '보안 정책 자동 감사',
      description: 'CIS Benchmark 및 컴플라이언스 자동 점검과 대응',
      nodes: 40,
      triggers: ['Security Event', 'Schedule'],
      actions: ['Policy Check', 'Violation Alert', 'Auto Remediation']
    },
    {
      name: '장애 감지 및 자동 복구',
      description: 'AI 기반 이상 징후 감지 및 자동 복구 프로세스',
      nodes: 30,
      triggers: ['Anomaly Detection', 'Health Check Fail'],
      actions: ['Auto Healing', 'Failover', 'Incident Creation', 'PagerDuty']
    }
  ],

  aiImplementations: [
    {
      type: 'Cost Optimization AI',
      purpose: '클라우드 비용 패턴 분석 및 최적화 추천',
      accuracy: '94%',
      processingTime: '5분/분석'
    },
    {
      type: 'Predictive Scaling AI',
      purpose: '트래픽 패턴 기반 리소스 수요 예측',
      accuracy: '92%',
      processingTime: '실시간'
    },
    {
      type: 'Anomaly Detection AI',
      purpose: '시스템 이상 징후 조기 감지',
      accuracy: '96%',
      processingTime: '30초'
    },
    {
      type: 'Right-sizing AI',
      purpose: '워크로드별 최적 인스턴스 사이즈 추천',
      accuracy: '89%',
      processingTime: '1분/워크로드'
    },
    {
      type: 'Security Compliance AI',
      purpose: '보안 정책 위반 자동 감지 및 분류',
      accuracy: '97%',
      processingTime: '실시간'
    }
  ],

  departmentAutomations: [
    {
      department: '인프라 운영팀',
      automationLevel: '95%',
      timeSaved: '주 40시간',
      costReduction: '팀당 월 2,000만원'
    },
    {
      department: 'DevOps팀',
      automationLevel: '90%',
      timeSaved: '주 35시간',
      costReduction: '팀당 월 1,800만원'
    },
    {
      department: '보안팀',
      automationLevel: '85%',
      timeSaved: '주 25시간',
      costReduction: '팀당 월 1,200만원'
    },
    {
      department: 'FinOps팀',
      automationLevel: '92%',
      timeSaved: '주 30시간',
      costReduction: '팀당 월 1,500만원'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n으로 구축한 멀티클라우드 플랫폼은 우리 회사의 게임체인저였습니다. 월 15억원이던 클라우드 비용이 6억원으로 줄어들면서도 성능은 4배나 향상되었어요. 특히 예측 스케일링 AI가 트래픽 급증을 미리 감지해서 자동으로 리소스를 준비해주니까, 블랙프라이데이 같은 대규모 이벤트에도 전혀 걱정이 없습니다. 인프라 팀원들은 이제 반복 작업 대신 혁신적인 아키텍처 설계에 집중하고 있고, 야간 대기 근무도 90% 줄었어요. 클라우드가 진짜 우리 편이 된 느낌입니다.',
    author: '이클라우드',
    position: 'CTO',
    company: '클라우드마스터'
  },

  followUpResults: [
    {
      metric: '클라우드 전문성 인증',
      achievement: 'AWS/Azure/GCP 최고 등급 파트너 동시 달성'
    },
    {
      metric: '기술 리더십',
      achievement: 'CNCF 프로젝트 메인테이너 5명, 컨트리뷰터 15명'
    },
    {
      metric: '비즈니스 성장',
      achievement: '클라우드 컨설팅 매출 500% 증가, 글로벌 진출 10개국'
    },
    {
      metric: '인재 브랜딩',
      achievement: '클라우드 엔지니어 지원자 1000% 증가, 업계 톱티어 영입'
    }
  ],

  roiData: {
    investment: '60억원',
    monthlySavings: '35.7억원',
    paybackPeriod: '1.68개월',
    threeYearROI: '2,142%'
  },

  implementationTimeline: '7개월',
  
  successFactors: [
    '클라우드 네이티브 기술 스택의 전략적 선택과 통합',
    'FinOps 문화 도입을 통한 비용 의식 개선',
    '점진적 마이그레이션과 리스크 최소화 전략',
    'AI/ML 전문가와 인프라 엔지니어의 융합팀 구성',
    '오픈소스 커뮤니티 적극 참여를 통한 기술 선도',
    '지속적인 성능 모니터링과 데이터 기반 최적화'
  ],

  tags: ['클라우드인프라', 'Kubernetes', 'FinOps', '멀티클라우드', 'n8n자동화', 'AI최적화'],
  featured: true
};

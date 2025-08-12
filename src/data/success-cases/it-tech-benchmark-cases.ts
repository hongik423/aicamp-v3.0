'use client';

import { 
  Code, 
  Cpu, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  Shield, 
  Zap, 
  Brain, 
  Network
} from 'lucide-react';
import { SuccessCaseDetail } from '@/types/success-case.types';

// IT/기술 업종별 벤치마크 성공사례 데이터
export const itTechBenchmarkCases: { [key: string]: SuccessCaseDetail } = {
  // 1. 소프트웨어 개발
  'software-development-ai': {
    id: 'software-development-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '소프트웨어 개발',
    companyName: '테크스타트업 A (직원 85명)',
    companySize: '중소기업',
    title: 'AI 기반 개발 생산성 혁신',
    subtitle: '코드 리뷰 자동화로 개발 속도 400% 향상',
    description: 'AI 코드 분석과 자동 리뷰 시스템을 도입하여 개발 품질과 속도를 동시에 혁신한 벤치마크 사례',
    icon: Code,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '소프트웨어 개발',
      employees: '85명',
      revenue: '연 매출 120억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '코드 리뷰 병목',
        description: '수동 코드 리뷰로 인한 개발 지연 및 품질 불균일',
        impact: '릴리스 주기 2배 연장 및 버그 발생률 증가'
      },
      {
        title: '개발자 생산성 저하',
        description: '반복적 코딩 작업으로 인한 개발자 업무 효율성 저하',
        impact: '핵심 기능 개발 지연 및 인력 부족 현상'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 기반 개발 도구 마스터리',
          duration: '16시간',
          description: 'GitHub Copilot, ChatGPT를 활용한 코딩 효율성 극대화'
        }
      ],
      advanced: [
        {
          title: 'AI 코드 리뷰 시스템 구축',
          duration: '24시간',
          description: '자동화된 코드 품질 검사 및 리뷰 워크플로우'
        }
      ],
      executive: [
        {
          title: '개발 조직 AI 전환 전략',
          duration: '8시간',
          description: '개발팀 AI 도입 로드맵 및 성과 측정 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: AI 개발 도구 도입',
        duration: '2주',
        activities: ['GitHub Copilot 설정', 'ChatGPT 코딩 프롬프트 최적화'],
        results: ['개발 속도 200% 향상', '코드 품질 일관성 확보']
      }
    ],
    results: {
      quantitative: [
        {
          metric: '개발 속도',
          before: '기능당 2주',
          after: '기능당 3일',
          improvement: '400% 향상'
        }
      ],
      financial: [
        {
          item: '개발 인건비 절감',
          amount: '연 3억원'
        }
      ],
      qualitative: ['개발자 만족도 95% 달성', '버그 발생률 80% 감소']
    },
    testimonial: {
      quote: 'AI 도구 도입으로 개발자가 창의적 문제 해결에 집중할 수 있게 되었습니다.',
      author: '김개발',
      position: 'CTO',
      company: '테크스타트업 A'
    },
    followUpResults: [
      {
        metric: '연간 릴리스 횟수',
        achievement: '24회 → 48회 (100% 증가)'
      }
    ],
    tags: ['AI코딩', 'GitHub Copilot', '개발자생산성'],
    automationMetrics: {
      timeReduction: '75%',
      costSaving: '연 3억원',
      errorReduction: '80%',
      productivityGain: '400%'
    },
    n8nWorkflows: [
      {
        name: '코드 리뷰 자동화',
        description: 'PR 생성 시 자동 코드 분석 및 리뷰 워크플로우',
        nodes: 12,
        triggers: ['GitHub Webhook', 'PR 생성'],
        actions: ['코드 분석', '리뷰 생성', 'Slack 알림']
      }
    ],
    aiImplementations: [
      {
        type: 'GitHub Copilot',
        purpose: '코드 자동 완성 및 제안',
        accuracy: '85%',
        processingTime: '실시간'
      }
    ],
    departmentAutomations: [
      {
        department: '개발팀',
        automationLevel: '70%',
        timeSaved: '주 28시간',
        costReduction: '연 3억원'
      }
    ],
    roiData: {
      investment: '5천만원',
      monthlySavings: '2천 5백만원',
      paybackPeriod: '2개월',
      threeYearROI: '1,800%'
    },
    implementationTimeline: '8주',
    successFactors: [
      '개발팀의 적극적인 AI 도구 학습 의지',
      '단계적 도입을 통한 저항 최소화',
      '지속적인 AI 도구 업데이트 및 최적화'
    ],
    featured: true
  },

  // 2. 클라우드 인프라
  'cloud-infrastructure-ai': {
    id: 'cloud-infrastructure-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '클라우드 인프라',
    companyName: '클라우드솔루션 B (직원 120명)',
    companySize: '중기업',
    title: 'AI 기반 클라우드 자동화',
    subtitle: '인프라 관리 효율성 500% 향상',
    description: 'AI를 활용한 클라우드 인프라 자동 모니터링과 최적화로 운영 효율성을 극대화한 벤치마크 사례',
    icon: Cloud,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '클라우드 인프라',
      employees: '120명',
      revenue: '연 매출 200억원',
      location: '서울시 서초구'
    },
    challenges: [
      {
        title: '인프라 모니터링 복잡성',
        description: '수백 개 서버의 수동 모니터링으로 인한 운영 부담',
        impact: '장애 대응 지연 및 비용 낭비'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '클라우드 AI 서비스 이해',
          duration: '12시간',
          description: 'AWS, Azure, GCP의 AI 서비스 활용법'
        }
      ],
      advanced: [
        {
          title: 'AI 기반 인프라 자동화',
          duration: '20시간',
          description: 'Terraform, Ansible과 AI 연동 자동화'
        }
      ],
      executive: [
        {
          title: '클라우드 AI 전략',
          duration: '6시간',
          description: '클라우드 AI 투자 ROI 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '인프라 관리 효율성',
          before: '수동 관리',
          after: 'AI 자동화',
          improvement: '500% 향상'
        }
      ],
      financial: [
        {
          item: '운영 비용 절감',
          amount: '연 8억원'
        }
      ],
      qualitative: ['장애 대응 시간 90% 단축', '시스템 가용성 99.9% 달성']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 8억원',
      errorReduction: '95%',
      productivityGain: '500%'
    },
    roiData: {
      investment: '1억원',
      monthlySavings: '6천 7백만원',
      paybackPeriod: '1.5개월',
      threeYearROI: '2,400%'
    },
    implementationTimeline: '6주',
    successFactors: [
      '클라우드 네이티브 아키텍처 구축',
      'AI 모니터링 시스템 정확도 99% 달성',
      '자동화된 장애 대응 프로세스 구축'
    ],
    tags: ['클라우드', 'AI', '인프라자동화', 'DevOps', '모니터링'],
    testimonial: {
      quote: 'AI 자동화로 인프라 관리가 완전히 혁신되었습니다.',
      author: '박인프라',
      position: 'DevOps 엔지니어',
      company: '클라우드솔루션 B'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '운영 비용 60% 추가 절감, 시스템 안정성 99.99% 달성'
      }
    ],
    n8nWorkflows: [
      {
        name: '인프라 모니터링 자동화',
        description: '클라우드 리소스 자동 모니터링 및 최적화 워크플로우',
        nodes: 18,
        triggers: ['리소스 사용량 임계값', '비용 초과 알림'],
        actions: ['자동 스케일링', '비용 최적화', '알림 발송']
      }
    ],
    aiImplementations: [
      {
        type: 'Predictive Analytics',
        purpose: '인프라 리소스 예측 및 최적화',
        accuracy: '95%',
        processingTime: '5분'
      }
    ],
    departmentAutomations: [
      {
        department: 'DevOps팀',
        automationLevel: '90%',
        timeSaved: '주 35시간',
        costReduction: '연 8억원'
      }
    ],
    featured: true
  },

  // 3. 데이터 분석
  'data-analytics-ai': {
    id: 'data-analytics-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '데이터 분석',
    companyName: '데이터인사이트 C (직원 65명)',
    companySize: '중소기업',
    title: 'AI 기반 데이터 인사이트 자동화',
    subtitle: '분석 시간 90% 단축, 인사이트 정확도 300% 향상',
    description: 'AI를 활용한 자동 데이터 분석과 인사이트 생성으로 의사결정 속도와 정확성을 혁신한 벤치마크 사례',
    icon: Database,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '데이터 분석',
      employees: '65명',
      revenue: '연 매출 80억원',
      location: '서울시 마포구'
    },
    challenges: [
      {
        title: '데이터 분석 지연',
        description: '수동 데이터 분석으로 인한 인사이트 도출 지연',
        impact: '의사결정 기회 손실 및 경쟁력 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 데이터 분석 기초',
          duration: '14시간',
          description: 'Python, Pandas, AI 분석 도구 활용법'
        }
      ],
      advanced: [
        {
          title: '자동화된 인사이트 생성',
          duration: '18시간',
          description: 'ML 모델을 활용한 예측 분석 자동화'
        }
      ],
      executive: [
        {
          title: '데이터 기반 의사결정',
          duration: '4시간',
          description: 'AI 분석 결과 활용 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '분석 시간',
          before: '주 40시간',
          after: '주 4시간',
          improvement: '90% 단축'
        }
      ],
      financial: [
        {
          item: '분석 인력 비용 절감',
          amount: '연 2억원'
        }
      ],
      qualitative: ['인사이트 정확도 300% 향상', '의사결정 속도 5배 증가']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 2억원',
      errorReduction: '85%',
      productivityGain: '1,000%'
    },
    roiData: {
      investment: '3천만원',
      monthlySavings: '1천 7백만원',
      paybackPeriod: '1.8개월',
      threeYearROI: '2,000%'
    },
    featured: true
  },

  // 4. 모바일 앱 개발
  'mobile-app-ai': {
    id: 'mobile-app-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '모바일 앱 개발',
    companyName: '모바일랩 D (직원 45명)',
    companySize: '중소기업',
    title: 'AI 기반 앱 개발 혁신',
    subtitle: '개발 주기 60% 단축, 사용자 경험 최적화',
    description: 'AI를 활용한 모바일 앱 개발 자동화와 사용자 행동 분석으로 개발 효율성과 앱 품질을 동시에 향상시킨 벤치마크 사례',
    icon: Smartphone,
    color: 'indigo',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '모바일 앱 개발',
      employees: '45명',
      revenue: '연 매출 60억원',
      location: '서울시 성동구'
    },
    challenges: [
      {
        title: '앱 개발 주기 길음',
        description: '수동 개발로 인한 앱 출시 지연',
        impact: '시장 기회 손실 및 개발 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 앱 개발 도구',
          duration: '16시간',
          description: 'Flutter, React Native AI 도구 활용'
        }
      ],
      advanced: [
        {
          title: 'AI 기반 UX 최적화',
          duration: '20시간',
          description: '사용자 행동 분석 및 자동 최적화'
        }
      ],
      executive: [
        {
          title: '모바일 AI 전략',
          duration: '6시간',
          description: '모바일 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '개발 주기',
          before: '3개월',
          after: '1개월',
          improvement: '60% 단축'
        }
      ],
      financial: [
        {
          item: '개발 비용 절감',
          amount: '연 1.5억원'
        }
      ],
      qualitative: ['앱 스토어 평점 4.8점 달성', '사용자 이탈률 60% 감소']
    },
    automationMetrics: {
      timeReduction: '60%',
      costSaving: '연 1.5억원',
      errorReduction: '75%',
      productivityGain: '300%'
    },
    roiData: {
      investment: '2천만원',
      monthlySavings: '1천 2백만원',
      paybackPeriod: '1.7개월',
      threeYearROI: '2,100%'
    },
    featured: true
  },

  // 5. 웹 개발
  'web-development-ai': {
    id: 'web-development-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '웹 개발',
    companyName: '웹솔루션 E (직원 75명)',
    companySize: '중소기업',
    title: 'AI 기반 웹 개발 자동화',
    subtitle: '웹사이트 구축 시간 80% 단축',
    description: 'AI를 활용한 웹 개발 자동화와 SEO 최적화로 고품질 웹사이트를 빠르게 구축한 벤치마크 사례',
    icon: Globe,
    color: 'teal',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '웹 개발',
      employees: '75명',
      revenue: '연 매출 100억원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '웹 개발 시간 오래 걸림',
        description: '수동 코딩으로 인한 웹사이트 구축 지연',
        impact: '고객 만족도 저하 및 매출 기회 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 웹 개발 도구',
          duration: '12시간',
          description: 'AI 기반 웹 개발 플랫폼 활용법'
        }
      ],
      advanced: [
        {
          title: 'AI SEO 최적화',
          duration: '16시간',
          description: '자동 SEO 분석 및 최적화'
        }
      ],
      executive: [
        {
          title: '웹 AI 전략',
          duration: '4시간',
          description: '웹 AI 투자 효과 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '웹사이트 구축 시간',
          before: '2개월',
          after: '2주',
          improvement: '80% 단축'
        }
      ],
      financial: [
        {
          item: '개발 비용 절감',
          amount: '연 2억원'
        }
      ],
      qualitative: ['고객 만족도 95% 달성', 'SEO 순위 평균 50% 향상']
    },
    automationMetrics: {
      timeReduction: '80%',
      costSaving: '연 2억원',
      errorReduction: '70%',
      productivityGain: '400%'
    },
    roiData: {
      investment: '3천만원',
      monthlySavings: '1천 7백만원',
      paybackPeriod: '1.8개월',
      threeYearROI: '2,000%'
    },
    featured: true
  },

  // 6. 사이버보안
  'cybersecurity-ai': {
    id: 'cybersecurity-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '사이버보안',
    companyName: '시큐리티랩 F (직원 90명)',
    companySize: '중소기업',
    title: 'AI 기반 보안 위협 탐지',
    subtitle: '보안 사고 탐지율 95% 향상, 대응 시간 90% 단축',
    description: 'AI를 활용한 실시간 보안 위협 탐지와 자동 대응 시스템으로 보안 수준을 혁신적으로 향상시킨 벤치마크 사례',
    icon: Shield,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '사이버보안',
      employees: '90명',
      revenue: '연 매출 150억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '보안 위협 탐지 한계',
        description: '수동 보안 모니터링으로 인한 위협 탐지 지연',
        impact: '보안 사고 발생 시 대응 지연으로 인한 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 보안 기초',
          duration: '14시간',
          description: 'AI 기반 보안 도구 이해 및 활용'
        }
      ],
      advanced: [
        {
          title: 'AI 위협 탐지 시스템',
          duration: '22시간',
          description: '머신러닝 기반 이상 탐지 및 대응'
        }
      ],
      executive: [
        {
          title: '보안 AI 전략',
          duration: '6시간',
          description: 'AI 보안 투자 ROI 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '위협 탐지율',
          before: '60%',
          after: '95%',
          improvement: '95% 향상'
        }
      ],
      financial: [
        {
          item: '보안 사고 손실 절감',
          amount: '연 5억원'
        }
      ],
      qualitative: ['보안 대응 시간 90% 단축', '보안 사고 발생률 80% 감소']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 5억원',
      errorReduction: '95%',
      productivityGain: '1,000%'
    },
    roiData: {
      investment: '1억 5천만원',
      monthlySavings: '4천 2백만원',
      paybackPeriod: '3.6개월',
      threeYearROI: '1,200%'
    },
    featured: true
  },

  // 7. IoT 플랫폼
  'iot-platform-ai': {
    id: 'iot-platform-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: 'IoT 플랫폼',
    companyName: 'IoT솔루션 G (직원 110명)',
    companySize: '중기업',
    title: 'AI 기반 IoT 데이터 분석',
    subtitle: 'IoT 데이터 처리 속도 600% 향상',
    description: 'AI를 활용한 IoT 센서 데이터 실시간 분석과 예측 모델링으로 스마트 시티 솔루션을 혁신한 벤치마크 사례',
    icon: Network,
    color: 'orange',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: 'IoT 플랫폼',
      employees: '110명',
      revenue: '연 매출 180억원',
      location: '서울시 송파구'
    },
    challenges: [
      {
        title: 'IoT 데이터 처리 한계',
        description: '대용량 IoT 데이터의 실시간 처리 및 분석 어려움',
        impact: '스마트 시티 서비스 품질 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'IoT AI 기초',
          duration: '16시간',
          description: 'IoT 데이터와 AI 분석 기초'
        }
      ],
      advanced: [
        {
          title: '실시간 IoT 분석',
          duration: '24시간',
          description: '스트리밍 데이터 AI 분석 시스템'
        }
      ],
      executive: [
        {
          title: 'IoT AI 전략',
          duration: '8시간',
          description: '스마트 시티 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '데이터 처리 속도',
          before: '배치 처리',
          after: '실시간 처리',
          improvement: '600% 향상'
        }
      ],
      financial: [
        {
          item: '운영 효율성 향상',
          amount: '연 4억원'
        }
      ],
      qualitative: ['서비스 응답 시간 90% 단축', '예측 정확도 85% 달성']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 4억원',
      errorReduction: '80%',
      productivityGain: '600%'
    },
    roiData: {
      investment: '2억원',
      monthlySavings: '3천 3백만원',
      paybackPeriod: '6개월',
      threeYearROI: '600%'
    },
    featured: true
  },

  // 8. 블록체인
  'blockchain-ai': {
    id: 'blockchain-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '블록체인',
    companyName: '블록체인랩 H (직원 55명)',
    companySize: '중소기업',
    title: 'AI 기반 블록체인 최적화',
    subtitle: '트랜잭션 처리 속도 300% 향상',
    description: 'AI를 활용한 블록체인 네트워크 최적화와 스마트 컨트랙트 자동화로 성능을 혁신적으로 향상시킨 벤치마크 사례',
    icon: Zap,
    color: 'yellow',
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '블록체인',
      employees: '55명',
      revenue: '연 매출 70억원',
      location: '서울시 마포구'
    },
    challenges: [
      {
        title: '블록체인 성능 한계',
        description: '기존 블록체인의 느린 트랜잭션 처리 속도',
        impact: '사용자 경험 저하 및 확장성 문제'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '블록체인 AI 기초',
          duration: '12시간',
          description: '블록체인과 AI 융합 기술 이해'
        }
      ],
      advanced: [
        {
          title: 'AI 블록체인 최적화',
          duration: '20시간',
          description: 'AI 기반 합의 알고리즘 최적화'
        }
      ],
      executive: [
        {
          title: '블록체인 AI 전략',
          duration: '6시간',
          description: '블록체인 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '트랜잭션 처리 속도',
          before: '초당 100건',
          after: '초당 300건',
          improvement: '300% 향상'
        }
      ],
      financial: [
        {
          item: '운영 비용 절감',
          amount: '연 1.5억원'
        }
      ],
      qualitative: ['네트워크 안정성 99.9% 달성', '사용자 만족도 90% 향상']
    },
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 1.5억원',
      errorReduction: '90%',
      productivityGain: '300%'
    },
    roiData: {
      investment: '8천만원',
      monthlySavings: '1천 2백만원',
      paybackPeriod: '6.7개월',
      threeYearROI: '675%'
    },
    featured: true
  },

  // 9. 게임 개발
  'game-development-ai': {
    id: 'game-development-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '게임 개발',
    companyName: '게임스튜디오 I (직원 95명)',
    companySize: '중소기업',
    title: 'AI 기반 게임 개발 혁신',
    subtitle: '게임 개발 시간 60% 단축, 사용자 경험 최적화',
    description: 'AI를 활용한 게임 자산 생성과 사용자 행동 분석으로 개발 효율성과 게임 품질을 동시에 향상시킨 벤치마크 사례',
    icon: Brain,
    color: 'pink',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '게임 개발',
      employees: '95명',
      revenue: '연 매출 130억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '게임 자산 제작 시간',
        description: '수동 게임 자산 제작으로 인한 개발 지연',
        impact: '게임 출시 지연 및 개발 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 게임 개발 기초',
          duration: '14시간',
          description: 'AI 기반 게임 자산 생성 도구 활용'
        }
      ],
      advanced: [
        {
          title: 'AI 게임 최적화',
          duration: '18시간',
          description: '사용자 행동 분석 및 게임 밸런싱'
        }
      ],
      executive: [
        {
          title: '게임 AI 전략',
          duration: '6시간',
          description: '게임 AI 투자 효과 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '게임 개발 시간',
          before: '18개월',
          after: '12개월',
          improvement: '60% 단축'
        }
      ],
      financial: [
        {
          item: '개발 비용 절감',
          amount: '연 2.5억원'
        }
      ],
      qualitative: ['게임 평점 4.7점 달성', '사용자 이탈률 50% 감소']
    },
    automationMetrics: {
      timeReduction: '60%',
      costSaving: '연 2.5억원',
      errorReduction: '70%',
      productivityGain: '250%'
    },
    roiData: {
      investment: '1억원',
      monthlySavings: '2천만원',
      paybackPeriod: '5개월',
      threeYearROI: '900%'
    },
    featured: true
  },

  // 10. 하드웨어 개발
  'hardware-development-ai': {
    id: 'hardware-development-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '하드웨어 개발',
    companyName: '하드웨어랩 J (직원 80명)',
    companySize: '중소기업',
    title: 'AI 기반 하드웨어 설계 최적화',
    subtitle: '설계 시간 70% 단축, 성능 200% 향상',
    description: 'AI를 활용한 하드웨어 설계 자동화와 성능 최적화로 개발 효율성과 제품 품질을 혁신적으로 향상시킨 벤치마크 사례',
    icon: Cpu,
    color: 'gray',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '하드웨어 개발',
      employees: '80명',
      revenue: '연 매출 110억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '하드웨어 설계 복잡성',
        description: '수동 설계로 인한 개발 시간 지연 및 오류 발생',
        impact: '제품 출시 지연 및 개발 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 하드웨어 설계 기초',
          duration: '16시간',
          description: 'AI 기반 설계 도구 및 시뮬레이션'
        }
      ],
      advanced: [
        {
          title: 'AI 성능 최적화',
          duration: '22시간',
          description: 'AI 기반 하드웨어 성능 최적화'
        }
      ],
      executive: [
        {
          title: '하드웨어 AI 전략',
          duration: '6시간',
          description: '하드웨어 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '설계 시간',
          before: '6개월',
          after: '2개월',
          improvement: '70% 단축'
        }
      ],
      financial: [
        {
          item: '개발 비용 절감',
          amount: '연 3억원'
        }
      ],
      qualitative: ['제품 성능 200% 향상', '설계 오류율 80% 감소']
    },
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 3억원',
      errorReduction: '80%',
      productivityGain: '350%'
    },
    roiData: {
      investment: '1억 2천만원',
      monthlySavings: '2천 5백만원',
      paybackPeriod: '4.8개월',
      threeYearROI: '750%'
    },
    featured: true
  }
};

export default itTechBenchmarkCases;

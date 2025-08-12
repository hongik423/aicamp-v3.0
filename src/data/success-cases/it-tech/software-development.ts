'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Code, GitBranch, Zap, Activity } from 'lucide-react';

export const softwareDevelopmentCase: SuccessCaseDetail = {
  id: 'software-development-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '소프트웨어 개발',
  companyName: '넥스트젠소프트',
  companySize: 'large',
  title: 'AI 코드 생성과 n8n DevOps 자동화로 개발 생산성 400% 향상',
  subtitle: 'GitHub Copilot과 n8n CI/CD 파이프라인으로 구현한 초고속 개발 문화',
  description: 'AI 기반 코드 생성, 자동 테스트, n8n 배포 자동화를 통해 개발 속도를 4배 향상시키고 버그율을 90% 감소시킨 소프트웨어 개발의 혁신 사례',
  icon: Code,
  color: 'blue',
  heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
  
  companyInfo: {
    industry: '소프트웨어 개발 및 서비스',
    employees: '450명',
    revenue: '800억원',
    location: '서울특별시 강남구'
  },

  challenges: [
    {
      title: '반복적인 코딩 작업으로 인한 생산성 저하',
      description: '개발자들이 CRUD 로직, API 연동, 데이터 처리 등 반복적인 코드 작성에 60% 이상의 시간을 소모',
      impact: '핵심 비즈니스 로직 개발 시간 부족, 프로젝트 지연율 40%'
    },
    {
      title: '수동 배포와 테스트로 인한 품질 이슈',
      description: '수작업 배포 프로세스와 불완전한 테스트 커버리지로 프로덕션 버그 빈발',
      impact: '월평균 50건의 긴급 패치, 고객 서비스 중단 시간 월 12시간'
    },
    {
      title: '프로젝트 관리와 커뮤니케이션 비효율',
      description: '분산된 팀 간 협업 도구와 프로세스로 인한 정보 공유 지연',
      impact: '요구사항 변경 대응 시간 평균 5일, 팀 간 오해로 인한 재작업 30%'
    },
    {
      title: '기술 부채 누적과 코드 품질 관리 한계',
      description: '빠른 개발 속도 추구로 인한 코드 리뷰 부실, 기술 부채 지속 증가',
      impact: '유지보수 비용 연간 120억원, 신규 기능 개발 속도 50% 감소'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'AI 기반 코드 생성 도구 활용',
        duration: '2주',
        description: 'GitHub Copilot, ChatGPT Code Interpreter 등 AI 도구를 활용한 효율적 코딩 방법'
      },
      {
        title: 'n8n 기본 워크플로우 구축',
        duration: '1주',
        description: 'n8n을 활용한 기본 자동화 워크플로우 설계 및 구현'
      },
      {
        title: 'Git/GitHub 고급 활용법',
        duration: '1주',
        description: 'Git Flow, PR 자동화, 브랜치 전략 등 협업 최적화'
      },
      {
        title: 'DevOps 기초와 CI/CD',
        duration: '2주',
        description: '지속적 통합/배포 파이프라인 구축 기초'
      }
    ],
    advanced: [
      {
        title: 'AI 코드 리뷰 시스템 구축',
        duration: '3주',
        description: 'GPT-4 기반 자동 코드 리뷰 및 품질 검증 시스템 개발'
      },
      {
        title: 'n8n 고급 DevOps 자동화',
        duration: '4주',
        description: '복잡한 배포 파이프라인과 모니터링 자동화 구축'
      },
      {
        title: 'AI 기반 테스트 자동화',
        duration: '3주',
        description: '자동 테스트 케이스 생성 및 실행 시스템 구현'
      },
      {
        title: '마이크로서비스 아키텍처 자동화',
        duration: '4주',
        description: 'Kubernetes, Docker를 활용한 컨테이너 오케스트레이션'
      },
      {
        title: '성능 모니터링 AI 분석',
        duration: '2주',
        description: 'APM 데이터 기반 성능 이슈 자동 감지 및 최적화'
      }
    ],
    executive: [
      {
        title: '소프트웨어 개발 혁신 전략',
        duration: '2일',
        description: 'AI 시대 소프트웨어 개발 조직의 디지털 전환 전략'
      },
      {
        title: '개발 생산성 ROI 분석',
        duration: '1일',
        description: 'AI/자동화 도입 효과 측정 및 투자 의사결정'
      },
      {
        title: '애자일 조직 문화 혁신',
        duration: '1일',
        description: 'AI 도구 도입에 따른 조직 문화 변화 관리'
      }
    ]
  },

  process: [
    {
      phase: '1단계: AI 개발 환경 구축',
      duration: '4주',
      activities: [
        'GitHub Copilot, Cursor AI 등 AI 코딩 도구 전사 도입',
        'GPT-4 기반 코드 리뷰 봇 개발 및 GitHub 연동',
        'AI 프롬프트 엔지니어링 가이드라인 수립',
        '개발팀별 AI 도구 활용 교육 프로그램 실시'
      ],
      results: [
        '450명 개발자 AI 도구 사용률 95% 달성',
        '코드 작성 속도 평균 3배 향상',
        'AI 생성 코드 품질 점수 85점 달성',
        '개발자 만족도 92점 기록'
      ]
    },
    {
      phase: '2단계: n8n DevOps 파이프라인 구축',
      duration: '6주',
      activities: [
        'n8n 기반 CI/CD 파이프라인 설계 및 구축',
        'GitHub Actions와 n8n 통합 자동화 워크플로우',
        'Docker/Kubernetes 컨테이너 배포 자동화',
        'Slack, Jira, Confluence 통합 알림 시스템 구축'
      ],
      results: [
        '배포 시간 2시간 → 10분으로 92% 단축',
        '배포 실패율 15% → 1.2%로 감소',
        '50개 자동화 워크플로우 구축 완료',
        '개발팀 간 커뮤니케이션 효율 80% 향상'
      ]
    },
    {
      phase: '3단계: AI 기반 품질 관리 시스템',
      duration: '5주',
      activities: [
        'GPT-4 기반 자동 코드 리뷰 시스템 구현',
        'AI 테스트 케이스 자동 생성 엔진 개발',
        'SonarQube 연동 코드 품질 자동 검증',
        '버그 예측 AI 모델 개발 및 적용'
      ],
      results: [
        '코드 리뷰 시간 70% 단축',
        '테스트 커버리지 60% → 95% 향상',
        '프로덕션 버그 발생률 90% 감소',
        '코드 품질 점수 평균 20% 향상'
      ]
    },
    {
      phase: '4단계: 통합 모니터링 및 최적화',
      duration: '4주',
      activities: [
        'AI 기반 성능 모니터링 대시보드 구축',
        'n8n 장애 감지 및 자동 복구 시스템',
        '개발 메트릭 실시간 분석 및 인사이트 제공',
        '지속적 개선을 위한 피드백 루프 구축'
      ],
      results: [
        '시스템 장애 감지 시간 95% 단축',
        '자동 복구율 85% 달성',
        '개발 생산성 지표 실시간 추적',
        '월간 개선 아이디어 평균 25건 도출'
      ]
    },
    {
      phase: '5단계: 전사 확산 및 고도화',
      duration: '6주',
      activities: [
        '성공 사례 기반 다른 팀 확산',
        'AI 개발 센터 오브 엑셀런스 구축',
        '외부 파트너사 대상 베스트 프랙티스 공유',
        '차세대 AI 도구 파일럿 테스트'
      ],
      results: [
        '전사 25개 개발팀 100% 적용',
        'AI CoE 통해 월 50건 혁신 아이디어 창출',
        '파트너 10개사 벤치마킹 프로그램 운영',
        'GPT-4 Turbo, Claude 등 신규 AI 도구 검증'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '개발 생산성',
        before: '100% (기준)',
        after: '400%',
        improvement: '+300%'
      },
      {
        metric: '코드 작성 속도',
        before: '100줄/시간',
        after: '350줄/시간',
        improvement: '+250%'
      },
      {
        metric: '배포 빈도',
        before: '주 2회',
        after: '일 5회',
        improvement: '+1,150%'
      },
      {
        metric: '버그 발생률',
        before: '10%',
        after: '1%',
        improvement: '-90%'
      },
      {
        metric: '코드 리뷰 시간',
        before: '4시간/PR',
        after: '1.2시간/PR',
        improvement: '-70%'
      },
      {
        metric: '테스트 커버리지',
        before: '60%',
        after: '95%',
        improvement: '+58%'
      }
    ],
    financial: [
      {
        item: '개발 비용 절감',
        amount: '연간 180억원'
      },
      {
        item: '출시 시간 단축 수익',
        amount: '연간 220억원'
      },
      {
        item: '품질 개선 비용 절감',
        amount: '연간 95억원'
      },
      {
        item: '운영 비용 절감',
        amount: '연간 65억원'
      }
    ],
    qualitative: [
      '업계 최초 완전 자동화 DevOps 파이프라인 구축',
      '개발자 업무 만족도 40% 향상 (창의적 업무 집중)',
      '고객 서비스 안정성 99.9% 달성',
      '신기술 도입 속도 3배 향상',
      'GitHub 스타 1만개 이상 오픈소스 프로젝트 5개 출시',
      '개발 문화 혁신 우수 기업 선정'
    ]
  },

  automationMetrics: {
    timeReduction: '75%',
    costSaving: '560억원/년',
    errorReduction: '90%',
    productivityGain: '300%'
  },

  n8nWorkflows: [
    {
      name: 'AI 코드 리뷰 자동화',
      description: 'PR 생성 시 GPT-4가 자동으로 코드 리뷰 수행 및 피드백 제공',
      nodes: 35,
      triggers: ['GitHub Webhook', 'PR Created'],
      actions: ['GPT-4 Analysis', 'Comment Creation', 'Slack Notification', 'Jira Update']
    },
    {
      name: 'CI/CD 파이프라인 오케스트레이션',
      description: '코드 커밋부터 프로덕션 배포까지 전체 과정 자동화',
      nodes: 45,
      triggers: ['Git Push', 'Branch Merge'],
      actions: ['Build', 'Test', 'Deploy', 'Monitor', 'Rollback']
    },
    {
      name: '장애 감지 및 자동 복구',
      description: 'AI 기반 이상 징후 감지 및 자동 대응 시스템',
      nodes: 28,
      triggers: ['Monitoring Alert', 'Performance Threshold'],
      actions: ['Log Analysis', 'Auto Scale', 'Incident Creation', 'Team Alert']
    },
    {
      name: '개발 메트릭 수집 및 분석',
      description: '개발팀 생산성 지표 자동 수집 및 인사이트 생성',
      nodes: 32,
      triggers: ['Daily Schedule', 'Sprint End'],
      actions: ['Data Collection', 'AI Analysis', 'Report Generation', 'Dashboard Update']
    },
    {
      name: '자동 테스트 케이스 생성',
      description: 'AI가 코드 분석 후 자동으로 테스트 케이스 생성 및 실행',
      nodes: 25,
      triggers: ['Code Change', 'Feature Complete'],
      actions: ['Code Analysis', 'Test Generation', 'Test Execution', 'Coverage Report']
    }
  ],

  aiImplementations: [
    {
      type: 'GitHub Copilot + GPT-4',
      purpose: '실시간 코드 생성 및 자동완성',
      accuracy: '92%',
      processingTime: '실시간'
    },
    {
      type: 'Code Review AI (GPT-4)',
      purpose: '자동 코드 품질 검증 및 개선 제안',
      accuracy: '88%',
      processingTime: '30초/PR'
    },
    {
      type: 'Bug Prediction AI',
      purpose: '코드 변경 기반 버그 발생 가능성 예측',
      accuracy: '85%',
      processingTime: '5분/커밋'
    },
    {
      type: 'Performance Analysis AI',
      purpose: '코드 성능 이슈 자동 감지 및 최적화 제안',
      accuracy: '90%',
      processingTime: '2분/분석'
    },
    {
      type: 'Test Case Generation AI',
      purpose: '코드 기반 자동 테스트 케이스 생성',
      accuracy: '87%',
      processingTime: '1분/함수'
    }
  ],

  departmentAutomations: [
    {
      department: '프론트엔드 개발팀',
      automationLevel: '95%',
      timeSaved: '주 25시간',
      costReduction: '팀당 월 800만원'
    },
    {
      department: '백엔드 개발팀',
      automationLevel: '92%',
      timeSaved: '주 30시간',
      costReduction: '팀당 월 950만원'
    },
    {
      department: 'DevOps팀',
      automationLevel: '98%',
      timeSaved: '주 35시간',
      costReduction: '팀당 월 1,200만원'
    },
    {
      department: 'QA팀',
      automationLevel: '85%',
      timeSaved: '주 20시간',
      costReduction: '팀당 월 600만원'
    }
  ],

  testimonial: {
    quote: 'AI와 n8n 도입으로 우리 개발팀은 완전히 새로운 차원으로 진화했습니다. 개발자들이 더 이상 반복적인 코딩에 시간을 낭비하지 않고, 진짜 창의적인 문제 해결에 집중할 수 있게 되었어요. 특히 GPT-4가 코드 리뷰를 해주고, n8n이 배포를 자동화해주니까 개발 속도가 4배나 빨라졌습니다. 무엇보다 개발자들이 "이제 진짜 개발자가 된 기분"이라고 말하는 게 가장 큰 성과입니다. 버그는 90% 줄었고, 고객 만족도는 하늘을 찌르고 있어요. 이제 경쟁사들이 우리를 벤치마킹하러 옵니다.',
    author: '김테크',
    position: 'CTO',
    company: '넥스트젠소프트'
  },

  followUpResults: [
    {
      metric: 'GitHub 스타 프로젝트',
      achievement: '5개 오픈소스 프로젝트 1만+ 스타 달성'
    },
    {
      metric: '개발자 채용 경쟁력',
      achievement: '지원자 300% 증가, 업계 톱티어 인재 유치'
    },
    {
      metric: '기술 브랜딩',
      achievement: '개발자 컨퍼런스 키노트 10회, 기술 블로그 월 50만 PV'
    },
    {
      metric: '비즈니스 성장',
      achievement: '신규 프로젝트 수주 200% 증가, 대기업 파트너십 15개'
    }
  ],

  roiData: {
    investment: '45억원',
    monthlySavings: '46.7억원',
    paybackPeriod: '0.96개월',
    threeYearROI: '3,733%'
  },

  implementationTimeline: '5개월',
  
  successFactors: [
    '전사적 AI 퍼스트 마인드셋과 경영진의 강력한 지원',
    '개발자 중심의 상향식 혁신 문화 조성',
    '단계적 도입을 통한 리스크 최소화와 학습 효과 극대화',
    'AI 도구 전문가와 시니어 개발자의 멘토링 시스템',
    '지속적인 피드백과 개선을 통한 완벽한 자동화 달성',
    '오픈소스 기여를 통한 기술 생태계 선순환 구조 구축'
  ],

  tags: ['소프트웨어개발', 'AI코딩', 'DevOps', 'GitHub', 'n8n자동화', '개발생산성'],
  featured: true
};

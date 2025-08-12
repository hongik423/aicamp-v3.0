'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Smartphone } from 'lucide-react';

export const mobileAppDevelopmentCase: SuccessCaseDetail = {
  id: 'mobile-app-development-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '모바일 앱 개발',
  companyName: '모바일이노베이션',
  companySize: 'medium',
  title: 'AI 기반 앱 개발로 출시 시간 70% 단축, 사용자 만족도 95% 달성',
  subtitle: 'Flutter + Firebase와 n8n 자동화로 구현한 크로스플랫폼 앱 개발 혁신',
  description: 'AI 코드 생성, 자동 테스트, n8n CI/CD 파이프라인을 통해 iOS/Android 동시 개발 속도를 혁신하고 앱스토어 평점 4.8점을 달성한 모바일 앱 개발사의 성공 사례',
  icon: Smartphone,
  color: 'green',
  heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070',
  
  companyInfo: {
    industry: '모바일 앱 개발 및 서비스',
    employees: '85명',
    revenue: '180억원',
    location: '서울특별시 서초구'
  },

  challenges: [
    {
      title: 'iOS/Android 중복 개발로 인한 비효율',
      description: '네이티브 앱 개발로 인한 중복 작업과 플랫폼별 상이한 개발 일정',
      impact: '개발 기간 2배 소요, 유지보수 비용 연간 50억원'
    },
    {
      title: '앱스토어 배포와 업데이트 복잡성',
      description: '수동 빌드, 테스트, 배포 과정으로 인한 출시 지연과 버그 위험',
      impact: '출시까지 평균 6개월, 긴급 패치 배포 시간 3일'
    },
    {
      title: '사용자 피드백 대응과 개선 지연',
      description: '앱스토어 리뷰와 사용자 피드백 수집/분석의 수작업 처리',
      impact: '피드백 대응 시간 평균 2주, 사용자 이탈률 35%'
    },
    {
      title: '성능 최적화와 크래시 관리 한계',
      description: '앱 성능 모니터링 부족과 크래시 원인 파악의 어려움',
      impact: '앱 크래시율 8%, 성능 이슈로 인한 평점 하락'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'Flutter 크로스플랫폼 개발 기초',
        duration: '3주',
        description: 'Dart 언어와 Flutter 프레임워크 기본 개념'
      },
      {
        title: 'Firebase 백엔드 서비스 활용',
        duration: '2주',
        description: 'Firestore, Authentication, Cloud Functions 기초'
      },
      {
        title: 'n8n 모바일 앱 CI/CD',
        duration: '2주',
        description: '앱 빌드부터 스토어 배포까지 자동화'
      },
      {
        title: '앱 디자인 시스템과 UX',
        duration: '1주',
        description: 'Material Design, Human Interface Guidelines'
      }
    ],
    advanced: [
      {
        title: 'AI 기반 앱 개발 도구',
        duration: '4주',
        description: 'ChatGPT, GitHub Copilot을 활용한 Flutter 개발'
      },
      {
        title: '고급 상태 관리와 아키텍처',
        duration: '3주',
        description: 'Bloc, Provider, Clean Architecture 구현'
      },
      {
        title: '앱 성능 최적화와 모니터링',
        duration: '2주',
        description: 'Firebase Performance, Crashlytics 활용'
      },
      {
        title: 'AR/VR 모바일 앱 개발',
        duration: '3주',
        description: 'ARCore, ARKit 통합과 Unity 연동'
      },
      {
        title: '앱스토어 최적화(ASO)',
        duration: '2주',
        description: 'AI 기반 키워드 최적화와 A/B 테스트'
      }
    ],
    executive: [
      {
        title: '모바일 앱 비즈니스 전략',
        duration: '2일',
        description: '앱 수익화 모델과 사용자 획득 전략'
      },
      {
        title: '앱 개발 ROI 최적화',
        duration: '1일',
        description: '크로스플랫폼 개발의 비용 효과 분석'
      }
    ]
  },

  process: [
    {
      phase: '1단계: Flutter 크로스플랫폼 환경 구축',
      duration: '4주',
      activities: [
        'Flutter/Dart 개발 환경 표준화',
        'Firebase 프로젝트 설정 및 통합',
        'Material Design 3.0 디자인 시스템 구축',
        '개발팀 Flutter 교육 프로그램 실시'
      ],
      results: [
        'iOS/Android 동시 개발 환경 100% 구축',
        '개발자 Flutter 숙련도 90% 달성',
        '디자인 시스템 컴포넌트 200개 구축',
        '개발 생산성 2배 향상'
      ]
    },
    {
      phase: '2단계: AI 기반 개발 도구 도입',
      duration: '3주',
      activities: [
        'GitHub Copilot Flutter 확장 설정',
        'ChatGPT 기반 코드 리뷰 봇 구축',
        'AI 기반 UI 디자인 자동 생성',
        'Flutter 위젯 자동 완성 시스템'
      ],
      results: [
        'AI 코드 생성 활용률 85%',
        '코드 작성 속도 3배 향상',
        'UI 구현 시간 60% 단축',
        '코드 품질 점수 25% 향상'
      ]
    },
    {
      phase: '3단계: n8n CI/CD 파이프라인 구축',
      duration: '5주',
      activities: [
        'GitHub Actions + n8n 빌드 자동화',
        'Firebase App Distribution 자동 배포',
        'Google Play Console, App Store Connect API 연동',
        'Fastlane 통합 배포 파이프라인'
      ],
      results: [
        '빌드 시간 2시간 → 15분으로 88% 단축',
        '배포 과정 완전 자동화 달성',
        '테스트 배포 주기 일일 → 시간당 가능',
        '배포 실패율 25% → 2% 감소'
      ]
    },
    {
      phase: '4단계: 사용자 피드백 자동화 시스템',
      duration: '4주',
      activities: [
        'Firebase Analytics 고급 이벤트 추적',
        'App Store/Play Store 리뷰 자동 수집',
        'Sentiment Analysis AI로 피드백 분석',
        'Slack/Jira 통합 피드백 관리'
      ],
      results: [
        '사용자 행동 데이터 100% 수집',
        '피드백 분석 시간 90% 단축',
        '부정 리뷰 대응 시간 2주 → 1일',
        '사용자 만족도 70% → 95% 향상'
      ]
    },
    {
      phase: '5단계: 성능 모니터링과 최적화',
      duration: '3주',
      activities: [
        'Firebase Performance Monitoring 구축',
        'Crashlytics 크래시 자동 분석',
        'AI 기반 성능 이슈 예측 시스템',
        'A/B 테스트 자동화 플랫폼'
      ],
      results: [
        '앱 크래시율 8% → 0.5% 감소',
        '성능 이슈 감지 시간 95% 단축',
        '앱 시작 속도 40% 향상',
        'A/B 테스트 실행 주기 50% 단축'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '앱 개발 시간',
        before: '6개월',
        after: '1.8개월',
        improvement: '-70%'
      },
      {
        metric: '앱스토어 평점',
        before: '3.2점',
        after: '4.8점',
        improvement: '+50%'
      },
      {
        metric: '사용자 만족도',
        before: '70%',
        after: '95%',
        improvement: '+36%'
      },
      {
        metric: '앱 크래시율',
        before: '8%',
        after: '0.5%',
        improvement: '-94%'
      },
      {
        metric: '개발 생산성',
        before: '100% (기준)',
        after: '350%',
        improvement: '+250%'
      },
      {
        metric: '배포 빈도',
        before: '월 1회',
        after: '주 3회',
        improvement: '+1,100%'
      }
    ],
    financial: [
      {
        item: '개발 비용 절감',
        amount: '연간 80억원'
      },
      {
        item: '빠른 출시로 인한 수익',
        amount: '연간 120억원'
      },
      {
        item: '유지보수 비용 절감',
        amount: '연간 35억원'
      },
      {
        item: '사용자 증가 수익',
        amount: '연간 95억원'
      }
    ],
    qualitative: [
      '업계 최초 AI 기반 Flutter 개발 프로세스 구축',
      '앱스토어 에디터 추천 앱 5개 달성',
      '개발자 업무 만족도 90% 향상',
      'Flutter 커뮤니티 컨트리뷰터 15명 배출',
      'Google I/O, Apple WWDC 발표 기회 획득',
      '모바일 앱 어워드 3개 부문 수상'
    ]
  },

  automationMetrics: {
    timeReduction: '70%',
    costSaving: '330억원/년',
    errorReduction: '94%',
    productivityGain: '250%'
  },

  n8nWorkflows: [
    {
      name: '모바일 앱 CI/CD 파이프라인',
      description: 'Flutter 앱 빌드부터 스토어 배포까지 완전 자동화',
      nodes: 42,
      triggers: ['Git Push', 'Release Tag'],
      actions: ['Flutter Build', 'Test Run', 'Firebase Deploy', 'Store Upload']
    },
    {
      name: '사용자 피드백 수집 분석',
      description: '앱스토어 리뷰와 사용자 피드백 자동 수집 및 감정 분석',
      nodes: 28,
      triggers: ['New Review', 'Schedule'],
      actions: ['Review Scraping', 'Sentiment Analysis', 'Slack Alert', 'Jira Ticket']
    },
    {
      name: 'A/B 테스트 자동화',
      description: 'Firebase Remote Config 기반 A/B 테스트 자동 실행',
      nodes: 25,
      triggers: ['Test Schedule', 'User Segment'],
      actions: ['Config Update', 'Analytics Track', 'Result Analysis']
    },
    {
      name: '앱 성능 모니터링',
      description: 'Firebase Performance 데이터 분석 및 이슈 자동 감지',
      nodes: 22,
      triggers: ['Performance Alert', 'Crash Report'],
      actions: ['Issue Analysis', 'Developer Alert', 'Auto Fix Attempt']
    },
    {
      name: 'ASO 최적화 자동화',
      description: 'AI 기반 앱스토어 키워드 최적화와 메타데이터 관리',
      nodes: 18,
      triggers: ['Ranking Change', 'Keyword Update'],
      actions: ['Keyword Analysis', 'Metadata Update', 'Competitor Analysis']
    }
  ],

  aiImplementations: [
    {
      type: 'Flutter Code Generation AI',
      purpose: 'Flutter 위젯과 비즈니스 로직 자동 생성',
      accuracy: '88%',
      processingTime: '30초/컴포넌트'
    },
    {
      type: 'UI/UX Design AI',
      purpose: '사용자 행동 기반 UI 디자인 자동 최적화',
      accuracy: '85%',
      processingTime: '5분/화면'
    },
    {
      type: 'App Performance AI',
      purpose: '성능 이슈 자동 감지 및 최적화 제안',
      accuracy: '92%',
      processingTime: '실시간'
    },
    {
      type: 'User Feedback Analysis AI',
      purpose: '사용자 리뷰와 피드백 감정 분석',
      accuracy: '94%',
      processingTime: '1초/리뷰'
    },
    {
      type: 'ASO Optimization AI',
      purpose: '앱스토어 검색 최적화 키워드 추천',
      accuracy: '87%',
      processingTime: '10분/분석'
    }
  ],

  departmentAutomations: [
    {
      department: '모바일 개발팀',
      automationLevel: '85%',
      timeSaved: '주 30시간',
      costReduction: '팀당 월 1,200만원'
    },
    {
      department: 'QA팀',
      automationLevel: '90%',
      timeSaved: '주 25시간',
      costReduction: '팀당 월 1,000만원'
    },
    {
      department: 'DevOps팀',
      automationLevel: '95%',
      timeSaved: '주 35시간',
      costReduction: '팀당 월 1,400만원'
    },
    {
      department: '마케팅팀',
      automationLevel: '80%',
      timeSaved: '주 20시간',
      costReduction: '팀당 월 800만원'
    }
  ],

  testimonial: {
    quote: 'Flutter와 AI, n8n을 결합한 개발 환경은 우리 팀을 완전히 변화시켰습니다. 예전에는 iOS와 Android를 따로 개발해서 6개월이 걸렸는데, 이제는 1.8개월 만에 두 플랫폼 동시 출시가 가능해졌어요. AI가 코드를 생성해주고, n8n이 테스트부터 배포까지 자동화해주니까 개발자들이 정말 창의적인 기능 개발에만 집중할 수 있게 되었습니다. 특히 사용자 피드백을 실시간으로 분석해서 바로 개선사항을 반영하니까 앱스토어 평점이 4.8점까지 올라갔어요. 이제 우리 앱들이 에디터 추천을 받을 정도로 품질이 향상되었습니다.',
    author: '김모바일',
    position: 'Head of Mobile Development',
    company: '모바일이노베이션'
  },

  followUpResults: [
    {
      metric: '앱 다운로드',
      achievement: '누적 500만 다운로드, 월간 활성 사용자 200만명'
    },
    {
      metric: '수상 실적',
      achievement: 'Google Play Awards 3회, Apple Design Awards 후보'
    },
    {
      metric: '기술 인정',
      achievement: 'Flutter 공식 케이스 스터디 선정, Google I/O 발표'
    },
    {
      metric: '비즈니스 성장',
      achievement: '앱 개발 의뢰 300% 증가, 글로벌 클라이언트 25개사'
    }
  ],

  roiData: {
    investment: '25억원',
    monthlySavings: '27.5억원',
    paybackPeriod: '0.91개월',
    threeYearROI: '3,960%'
  },

  implementationTimeline: '5개월',
  
  successFactors: [
    'Flutter 크로스플랫폼 기술의 전략적 선택',
    'AI 도구와 개발자 역량의 완벽한 결합',
    '사용자 중심의 지속적 개선 문화',
    'Firebase 생태계의 적극적 활용',
    '자동화를 통한 개발자 경험 최적화',
    '오픈소스 커뮤니티와의 적극적 기여'
  ],

  tags: ['모바일앱', 'Flutter', 'Firebase', 'AI개발', 'n8n자동화', '크로스플랫폼'],
  featured: true
};

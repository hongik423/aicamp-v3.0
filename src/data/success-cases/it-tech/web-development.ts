'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Globe } from 'lucide-react';

export const webDevelopmentCase: SuccessCaseDetail = {
  id: 'web-development-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: '웹 개발',
  companyName: '웹마스터프로',
  companySize: 'medium',
  title: 'Next.js + AI로 웹 개발 속도 500% 향상, 성능 점수 100점 달성',
  subtitle: 'Vercel과 n8n 자동화로 구현한 풀스택 웹 개발 혁신 플랫폼',
  description: 'React/Next.js와 AI 코드 생성, n8n 배포 자동화를 통해 웹사이트 개발부터 운영까지 완전히 혁신하고 Google PageSpeed 100점을 달성한 웹 개발 전문 기업의 성공 사례',
  icon: Globe,
  color: 'indigo',
  heroImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2070',
  
  companyInfo: {
    industry: '웹 개발 및 디지털 솔루션',
    employees: '120명',
    revenue: '280억원',
    location: '서울특별시 강남구'
  },

  challenges: [
    {
      title: '반복적인 웹 개발 작업의 비효율성',
      description: '컴포넌트 재작성, API 연동, 스타일링 등 반복 작업으로 개발 속도 저하',
      impact: '프로젝트 납기 지연률 40%, 개발자 번아웃 증가'
    },
    {
      title: '웹사이트 성능과 SEO 최적화 한계',
      description: '수동 최적화로 인한 성능 이슈와 검색엔진 노출 부족',
      impact: 'PageSpeed 점수 평균 65점, 검색 트래픽 30% 감소'
    },
    {
      title: '다양한 디바이스 대응과 접근성 부족',
      description: '반응형 디자인과 웹 접근성 구현의 복잡성',
      impact: '모바일 사용자 이탈률 45%, 접근성 감사 실패'
    },
    {
      title: '배포와 유지보수의 복잡성',
      description: '수동 배포 과정과 버그 추적, 성능 모니터링 부족',
      impact: '배포 시간 평균 4시간, 장애 감지 시간 2시간'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'React/Next.js 현대적 웹 개발',
        duration: '3주',
        description: 'React 18, Next.js 14 최신 기능과 개발 패턴'
      },
      {
        title: 'TypeScript와 타입 안전성',
        duration: '2주',
        description: '타입스크립트 고급 기능과 웹 개발 적용'
      },
      {
        title: 'Tailwind CSS와 모던 스타일링',
        duration: '1주',
        description: '유틸리티 퍼스트 CSS와 컴포넌트 스타일링'
      },
      {
        title: 'n8n 웹 개발 자동화',
        duration: '2주',
        description: '빌드부터 배포까지 웹 개발 워크플로우 자동화'
      }
    ],
    advanced: [
      {
        title: 'AI 기반 웹 개발 도구',
        duration: '4주',
        description: 'GitHub Copilot, v0.dev 등 AI 도구 활용한 개발'
      },
      {
        title: 'Jamstack과 헤드리스 CMS',
        duration: '3주',
        description: 'Strapi, Sanity 등 헤드리스 CMS 통합'
      },
      {
        title: '웹 성능 최적화와 Core Web Vitals',
        duration: '2주',
        description: 'LCP, FID, CLS 최적화와 성능 모니터링'
      },
      {
        title: '웹 접근성과 사용자 경험',
        duration: '2주',
        description: 'WCAG 2.1 준수와 접근성 테스트 자동화'
      },
      {
        title: 'PWA와 오프라인 기능',
        duration: '3주',
        description: 'Service Worker, 캐싱 전략, 오프라인 지원'
      }
    ],
    executive: [
      {
        title: '웹 기술 트렌드와 비즈니스 전략',
        duration: '2일',
        description: '웹 기술 발전과 디지털 전환 전략'
      },
      {
        title: '웹 개발 ROI와 성과 측정',
        duration: '1일',
        description: '웹 프로젝트 투자 대비 효과 분석'
      }
    ]
  },

  process: [
    {
      phase: '1단계: 모던 웹 개발 스택 구축',
      duration: '4주',
      activities: [
        'Next.js 14 + TypeScript 개발 환경 구축',
        'Tailwind CSS + shadcn/ui 디자인 시스템',
        'ESLint, Prettier 코드 품질 도구 설정',
        'Storybook 컴포넌트 문서화 시스템'
      ],
      results: [
        '개발 환경 표준화 100% 달성',
        '컴포넌트 재사용률 80% 향상',
        '코드 품질 점수 95점 달성',
        '개발자 온보딩 시간 70% 단축'
      ]
    },
    {
      phase: '2단계: AI 기반 코드 생성 도구 통합',
      duration: '3주',
      activities: [
        'GitHub Copilot 웹 개발 최적화 설정',
        'v0.dev UI 컴포넌트 자동 생성',
        'ChatGPT API 연동 코드 리뷰 시스템',
        'AI 기반 테스트 케이스 자동 생성'
      ],
      results: [
        'AI 코드 생성 활용률 90%',
        '컴포넌트 개발 시간 80% 단축',
        '코드 리뷰 효율성 3배 향상',
        '테스트 커버리지 95% 달성'
      ]
    },
    {
      phase: '3단계: 성능 최적화 자동화',
      duration: '5주',
      activities: [
        'Next.js Image 최적화와 lazy loading',
        'Bundle 분석과 Code Splitting 자동화',
        'CDN과 Edge Computing 최적화',
        'Core Web Vitals 실시간 모니터링'
      ],
      results: [
        'PageSpeed 점수 100점 달성',
        '로딩 속도 70% 향상',
        'SEO 점수 평균 95점 달성',
        '사용자 경험 지표 50% 개선'
      ]
    },
    {
      phase: '4단계: n8n CI/CD와 배포 자동화',
      duration: '4주',
      activities: [
        'Vercel 자동 배포 파이프라인',
        'GitHub Actions + n8n 통합 워크플로우',
        'E2E 테스트 자동화 (Playwright)',
        '성능 회귀 테스트 자동 감지'
      ],
      results: [
        '배포 시간 4시간 → 3분으로 99% 단축',
        '배포 실패율 20% → 1% 감소',
        '테스트 자동화율 100% 달성',
        '성능 회귀 감지 시간 95% 단축'
      ]
    },
    {
      phase: '5단계: 접근성과 사용자 경험 최적화',
      duration: '3주',
      activities: [
        'WCAG 2.1 접근성 가이드라인 적용',
        'axe-core 자동 접근성 테스트',
        '다국어 지원(i18n) 자동화',
        'PWA 기능과 오프라인 지원'
      ],
      results: [
        '웹 접근성 AA 등급 100% 달성',
        '다국어 지원 10개 언어 구현',
        'PWA 설치율 40% 달성',
        '사용자 만족도 95% 향상'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: '웹 개발 속도',
        before: '100% (기준)',
        after: '600%',
        improvement: '+500%'
      },
      {
        metric: 'PageSpeed 점수',
        before: '65점',
        after: '100점',
        improvement: '+54%'
      },
      {
        metric: '로딩 속도',
        before: '3.5초',
        after: '1.2초',
        improvement: '-66%'
      },
      {
        metric: 'SEO 점수',
        before: '70점',
        after: '95점',
        improvement: '+36%'
      },
      {
        metric: '배포 시간',
        before: '4시간',
        after: '3분',
        improvement: '-99%'
      },
      {
        metric: '사용자 만족도',
        before: '75%',
        after: '95%',
        improvement: '+27%'
      }
    ],
    financial: [
      {
        item: '개발 비용 절감',
        amount: '연간 120억원'
      },
      {
        item: '빠른 출시로 인한 수익',
        amount: '연간 180억원'
      },
      {
        item: '성능 개선 수익 증대',
        amount: '연간 85억원'
      },
      {
        item: '유지보수 비용 절감',
        amount: '연간 45억원'
      }
    ],
    qualitative: [
      '업계 최초 AI 기반 웹 개발 프로세스 완성',
      'Google PageSpeed 100점 달성 사이트 50개 구축',
      '웹 접근성 AA 등급 인증 100% 달성',
      'Vercel 공식 파트너 최고 등급 달성',
      'Next.js 컨퍼런스 키노트 발표 3회',
      '웹 개발 어워드 5개 부문 수상'
    ]
  },

  automationMetrics: {
    timeReduction: '85%',
    costSaving: '430억원/년',
    errorReduction: '92%',
    productivityGain: '500%'
  },

  n8nWorkflows: [
    {
      name: '웹사이트 CI/CD 파이프라인',
      description: 'Next.js 빌드부터 Vercel 배포까지 완전 자동화',
      nodes: 38,
      triggers: ['Git Push', 'PR Merge'],
      actions: ['Build', 'Test', 'Deploy', 'Performance Check', 'Slack Alert']
    },
    {
      name: '성능 모니터링 자동화',
      description: 'Core Web Vitals 실시간 추적과 성능 회귀 감지',
      nodes: 25,
      triggers: ['Performance Alert', 'Schedule'],
      actions: ['Lighthouse CI', 'Performance Analysis', 'Report Generation']
    },
    {
      name: 'SEO 최적화 자동화',
      description: '메타데이터 최적화와 사이트맵 자동 생성',
      nodes: 20,
      triggers: ['Content Update', 'Site Deploy'],
      actions: ['Meta Generation', 'Sitemap Update', 'Search Console API']
    },
    {
      name: '접근성 테스트 자동화',
      description: 'axe-core 기반 접근성 검사와 리포트 생성',
      nodes: 18,
      triggers: ['Deploy Complete', 'Schedule'],
      actions: ['Accessibility Scan', 'Issue Detection', 'Report Email']
    },
    {
      name: '사용자 피드백 수집',
      description: '사용자 행동 분석과 피드백 자동 수집',
      nodes: 22,
      triggers: ['User Event', 'Feedback Submit'],
      actions: ['Analytics Track', 'Sentiment Analysis', 'Issue Creation']
    }
  ],

  aiImplementations: [
    {
      type: 'Code Generation AI (GitHub Copilot)',
      purpose: 'React/Next.js 컴포넌트 자동 생성',
      accuracy: '92%',
      processingTime: '실시간'
    },
    {
      type: 'UI Generation AI (v0.dev)',
      purpose: '디자인 기반 UI 컴포넌트 자동 생성',
      accuracy: '88%',
      processingTime: '30초/컴포넌트'
    },
    {
      type: 'Performance Optimization AI',
      purpose: '웹 성능 이슈 자동 감지 및 최적화',
      accuracy: '94%',
      processingTime: '2분/페이지'
    },
    {
      type: 'SEO Content AI',
      purpose: 'SEO 최적화 메타데이터 자동 생성',
      accuracy: '90%',
      processingTime: '10초/페이지'
    },
    {
      type: 'Accessibility AI',
      purpose: '웹 접근성 이슈 자동 감지 및 수정',
      accuracy: '87%',
      processingTime: '1분/페이지'
    }
  ],

  departmentAutomations: [
    {
      department: '프론트엔드 개발팀',
      automationLevel: '90%',
      timeSaved: '주 35시간',
      costReduction: '팀당 월 1,400만원'
    },
    {
      department: 'UI/UX 디자인팀',
      automationLevel: '80%',
      timeSaved: '주 25시간',
      costReduction: '팀당 월 1,000만원'
    },
    {
      department: 'QA팀',
      automationLevel: '95%',
      timeSaved: '주 30시간',
      costReduction: '팀당 월 1,200만원'
    },
    {
      department: 'DevOps팀',
      automationLevel: '98%',
      timeSaved: '주 40시간',
      costReduction: '팀당 월 1,600만원'
    }
  ],

  testimonial: {
    quote: 'Next.js와 AI, n8n의 조합은 우리 웹 개발 팀에게 마법 같은 경험을 선사했습니다. AI가 컴포넌트를 생성해주고, n8n이 배포를 자동화해주니까 개발 속도가 6배나 빨라졌어요. 특히 v0.dev로 디자인을 코드로 바로 변환하고, GitHub Copilot이 복잡한 로직을 완성해주니까 개발자들이 "이제 진짜 창작자가 된 기분"이라고 말합니다. PageSpeed 100점을 달성한 사이트가 50개나 되고, 모든 사이트가 웹 접근성 AA 등급을 받았어요. 고객들이 "웹사이트가 이렇게 빠를 수 있나요?"라고 놀라워합니다.',
    author: '박웹마스터',
    position: 'Head of Web Development',
    company: '웹마스터프로'
  },

  followUpResults: [
    {
      metric: '기술 인정도',
      achievement: 'Vercel 공식 파트너, Next.js 컨퍼런스 키노트 발표'
    },
    {
      metric: '프로젝트 성과',
      achievement: 'PageSpeed 100점 사이트 50개, 웹 접근성 AA 등급 100%'
    },
    {
      metric: '비즈니스 성장',
      achievement: '웹 개발 의뢰 400% 증가, 대기업 클라이언트 30개사'
    },
    {
      metric: '개발자 브랜딩',
      achievement: '웹 개발자 지원자 500% 증가, 업계 톱티어 인재 영입'
    }
  ],

  roiData: {
    investment: '30억원',
    monthlySavings: '35.8억원',
    paybackPeriod: '0.84개월',
    threeYearROI: '4,292%'
  },

  implementationTimeline: '5개월',
  
  successFactors: [
    'Next.js 생태계의 전략적 활용과 최신 기술 도입',
    'AI 도구들의 유기적 통합과 개발자 워크플로우 최적화',
    '성능과 접근성을 모두 고려한 품질 중심 개발 문화',
    '자동화를 통한 반복 작업 제거와 창의적 업무 집중',
    '오픈소스 기여를 통한 기술 커뮤니티 선도',
    '지속적인 학습과 최신 웹 표준 준수'
  ],

  tags: ['웹개발', 'Next.js', 'React', 'AI코딩', 'n8n자동화', '성능최적화'],
  featured: true
};

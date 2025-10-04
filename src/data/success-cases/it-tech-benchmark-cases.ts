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
    heroImage: '/images/benchmark2/AI 기반 DevOps 자동화.png',
    companyInfo: {
      industry: '소프트웨어 개발',
      employees: '85명',
      revenue: '연 매출 120억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '소프트웨어 개발 생명주기(SDLC) 복잡성 증가',
        description: '마이크로서비스 아키텍처 전환과 DevOps 파이프라인 구축 과정에서 코드 품질 관리, 테스트 자동화, CI/CD 통합의 복잡성이 기하급수적으로 증가. 특히 다양한 프로그래밍 언어(Java, Python, JavaScript, Go)와 프레임워크(Spring Boot, React, Node.js, Kubernetes) 혼재로 인한 일관된 코드 리뷰 기준 부재',
        impact: '릴리스 주기 평균 4주 → 8주 연장, 프로덕션 버그 발생률 35% 증가, 개발자 코드 리뷰 대기시간 평균 2.5일'
      },
      {
        title: '개발팀 간 협업 비효율성과 지식 사일로 현상',
        description: '프론트엔드, 백엔드, DevOps, QA 팀 간 업무 프로세스 단절로 인한 정보 공유 지연. Git 브랜치 전략 불일치, API 문서 동기화 실패, 테스트 케이스 중복 작성 등 소프트웨어 개발 특유의 협업 문제점 심화',
        impact: '팀 간 커뮤니케이션 오버헤드 40% 증가, 중복 개발 작업 25% 발생, 기술 부채 누적으로 유지보수 비용 60% 상승'
      },
      {
        title: 'AI/ML 모델 개발과 운영 환경의 괴리',
        description: '데이터 사이언스팀의 Jupyter 노트북 기반 모델 개발과 프로덕션 환경의 컨테이너 기반 배포 간 환경 차이로 인한 모델 성능 저하. MLOps 파이프라인 부재로 모델 버전 관리, A/B 테스트, 모니터링 체계 미흡',
        impact: '모델 배포 성공률 65%, 모델 성능 평균 15% 저하, 실시간 추론 지연시간 200ms 초과'
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
        phase: '1단계: 소프트웨어 아키텍처 분석 및 AI 통합 설계 (Architecture Assessment & AI Integration Design)',
        duration: '3주',
        activities: [
          '기존 마이크로서비스 아키텍처 분석 및 AI 적용 포인트 식별',
          'GitHub Copilot Enterprise, CodeWhisperer, ChatGPT-4 Turbo API 통합 환경 구축',
          'Docker 컨테이너 기반 AI 개발 환경 표준화 (Python 3.11, Node.js 18, Java 17)',
          'n8n 워크플로우 서버 구축 및 Git Actions, Jira, Slack, SonarQube API 연동 설정',
          'MLOps 파이프라인 설계: Kubeflow + MLflow + DVC를 활용한 모델 생명주기 관리',
          'AI 코드 생성 품질 측정을 위한 커스텀 메트릭 개발 (코드 복잡도, 테스트 커버리지, 성능 지표)'
        ],
        results: [
          'AI 통합 소프트웨어 아키텍처 설계서 완성 (35페이지)',
          '개발환경 컨테이너 이미지 표준화 완료 (5개 언어/프레임워크)',
          'n8n 기반 CI/CD 파이프라인 자동화 워크플로우 12개 구축',
          'AI 코드 품질 측정 대시보드 개발 완료 (실시간 모니터링)'
        ]
      },
      {
        phase: '2단계: AI 기반 개발 프로세스 혁신 및 팀별 맞춤 교육 (AI-Driven Development Process Innovation)',
        duration: '4주',
        activities: [
          '프론트엔드팀: React/TypeScript 환경에서 GitHub Copilot을 활용한 컴포넌트 자동 생성 및 테스트 코드 작성 교육',
          '백엔드팀: Spring Boot/Python FastAPI에서 AI 기반 API 설계, 데이터베이스 쿼리 최적화, 보안 코드 패턴 적용 교육',
          'DevOps팀: n8n을 활용한 인프라 자동화, Kubernetes 배포 스크립트 AI 생성, 모니터링 알람 자동화 구축',
          'QA팀: AI 기반 테스트 케이스 자동 생성, Selenium 테스트 스크립트 AI 작성, 버그 리포트 자동 분석 시스템 구축',
          '데이터사이언스팀: AutoML 파이프라인 구축, 모델 하이퍼파라미터 자동 튜닝, A/B 테스트 자동화 n8n 워크플로우 개발',
          '팀 간 협업 최적화: AI 기반 코드 리뷰 자동화, API 문서 자동 동기화, 기술 부채 자동 탐지 시스템 구축'
        ],
        results: [
          '팀별 AI 활용 가이드라인 수립 완료 (각 팀 15-20페이지 상세 매뉴얼)',
          'AI 코드 생성 정확도: 프론트엔드 92%, 백엔드 89%, 테스트 코드 85% 달성',
          'n8n 자동화 워크플로우 총 28개 구축 (팀당 평균 5.6개)',
          '개발자별 AI 도구 활용 숙련도 평가: 평균 8.3/10점 달성'
        ]
      },
      {
        phase: '3단계: 고급 AI/ML 운영 체계 구축 및 성과 최적화 (Advanced AI/ML Operations & Performance Optimization)',
        duration: '3주',
        activities: [
          'MLOps 파이프라인 고도화: 모델 자동 재훈련, 드리프트 탐지, 성능 모니터링 자동화',
          'AI 기반 코드 품질 관리: SonarQube + AI 분석을 통한 코드 냄새 자동 탐지 및 리팩토링 제안',
          '실시간 성능 모니터링: Grafana + Prometheus를 활용한 AI 모델 추론 성능 대시보드 구축',
          '보안 강화: AI 기반 취약점 스캐닝, 의존성 관리 자동화, 라이선스 컴플라이언스 체크',
          '지속적 학습 체계: 개발팀 AI 활용 패턴 분석, 맞춤형 AI 도구 추천, 생산성 지표 자동 추적',
          '고객 피드백 루프: 프로덕션 로그 분석을 통한 AI 모델 개선점 도출 및 자동 반영'
        ],
        results: [
          '통합 AI 개발 플랫폼 구축 완료 (개발→테스트→배포→모니터링 전 과정 AI 지원)',
          '코드 품질 지표 개선: 복잡도 40% 감소, 테스트 커버리지 95% 달성, 기술 부채 60% 해결',
          '배포 성공률 99.2% 달성 (기존 85% 대비 대폭 개선)',
          '개발 생산성 종합 지표 425% 향상 (기능 개발 속도, 버그 수정 시간, 코드 리뷰 시간 종합)'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '소프트웨어 개발 생산성 (Lines of Code per Developer per Day)',
          before: '평균 150 LOC/개발자/일',
          after: '평균 635 LOC/개발자/일',
          improvement: '423% 향상'
        },
        {
          metric: 'CI/CD 파이프라인 실행 시간',
          before: '평균 45분 (빌드+테스트+배포)',
          after: '평균 8분 (AI 최적화된 병렬 처리)',
          improvement: '82% 단축'
        },
        {
          metric: '코드 리뷰 사이클 타임',
          before: '평균 2.5일 (리뷰 요청→승인→머지)',
          after: '평균 4시간 (AI 사전 검토→인간 최종 승인)',
          improvement: '93% 단축'
        },
        {
          metric: '프로덕션 버그 발생률',
          before: '릴리스당 평균 12개 버그',
          after: '릴리스당 평균 2개 버그',
          improvement: '83% 감소'
        },
        {
          metric: '테스트 커버리지',
          before: '68% (수동 테스트 케이스 작성)',
          after: '95% (AI 자동 테스트 케이스 생성)',
          improvement: '40% 향상'
        },
        {
          metric: 'API 응답 시간 최적화',
          before: '평균 280ms (수동 쿼리 튜닝)',
          after: '평균 85ms (AI 기반 쿼리 최적화)',
          improvement: '70% 개선'
        },
        {
          metric: '기술 부채 해결 속도',
          before: '월 평균 5개 이슈 해결',
          after: '월 평균 23개 이슈 해결',
          improvement: '360% 향상'
        }
      ],
      financial: [
        {
          item: '개발 인력 효율성 증대로 인한 비용 절감',
          amount: '연 4.2억원',
          details: '기존 12명 개발팀이 18명 규모의 생산성 달성으로 6명 추가 채용 비용 절약'
        },
        {
          item: '프로덕션 버그 수정 비용 절감',
          amount: '연 1.8억원',
          details: '긴급 패치, 고객 지원, 신뢰도 회복 비용 대폭 감소'
        },
        {
          item: '인프라 운영 비용 최적화',
          amount: '연 9,500만원',
          details: 'AI 기반 리소스 최적화로 AWS 비용 35% 절감'
        },
        {
          item: '고객 이탈 방지를 통한 매출 보호',
          amount: '연 2.1억원',
          details: '서비스 안정성 향상으로 기업 고객 이탈률 15% → 3%로 감소'
        },
        {
          item: '신규 기능 출시 가속화로 인한 매출 증대',
          amount: '연 3.6억원',
          details: '경쟁사 대비 4배 빠른 기능 출시로 시장 선점 효과'
        }
      ],
      qualitative: [
        '개발자 업무 만족도 95% 달성 (단순 반복 작업 감소, 창의적 문제 해결에 집중)',
        '코드 품질 일관성 확보 (팀원별 스타일 차이 90% 감소, 유지보수성 대폭 향상)',
        '신입 개발자 온보딩 시간 70% 단축 (AI 멘토링 시스템으로 학습 곡선 완화)',
        '기술 스택 전환 리스크 최소화 (AI 기반 코드 마이그레이션으로 안전한 리팩토링)',
        '24/7 무중단 서비스 달성 (AI 예측 기반 장애 사전 감지 및 자동 복구)',
        '오픈소스 기여도 300% 증가 (AI 도구로 생산성 향상된 여유 시간 활용)',
        '고객 요구사항 반영 속도 5배 향상 (AI 기반 요구사항 분석 및 자동 구현)',
        '보안 취약점 사전 차단율 98% 달성 (AI 기반 실시간 보안 스캐닝)'
      ]
    },
    testimonial: {
      quote: "솔직히 처음엔 'AI가 개발자를 대체할 것'이라는 두려움이 컸습니다. 하지만 AICAMP의 체계적인 접근 방식을 통해 AI가 개발자의 파트너라는 걸 깨달았죠. 특히 마이크로서비스 아키텍처 전환 과정에서 수백 개의 API 엔드포인트를 수동으로 작성해야 했던 악몽 같은 경험이 있었는데, AI 도구 도입 후에는 복잡한 비즈니스 로직만 집중하면 나머지는 AI가 알아서 처리해주더군요. 가장 놀라운 건 우리 주니어 개발자가 시니어급 코드를 작성하기 시작했다는 점입니다. GitHub Copilot이 실시간으로 베스트 프랙티스를 제안해주니까 자연스럽게 코드 품질이 향상됐어요. 지금은 경쟁사보다 4배 빠른 속도로 신기능을 출시하고 있고, 개발팀 야근은 거의 사라졌습니다. 투자 대비 효과가 이렇게 확실한 기술 도입은 처음이에요. 다른 스타트업 CTO들에게 꼭 추천하고 싶습니다.",
      author: '김테크',
      position: 'CTO & Co-founder',
      company: '테크스타트업 A',
      metrics: '개발 생산성 425% 향상, ROI 1,800% 달성',
      additionalContext: '마이크로서비스 전환과 동시에 AI 도입으로 기술 부채 해결과 생산성 혁신 동시 달성'
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
        name: 'AI 기반 CI/CD 파이프라인 자동화',
        description: 'Git 커밋 → 자동 빌드 → AI 코드 분석 → 테스트 실행 → 배포 승인 → 프로덕션 배포까지 완전 자동화',
        nodes: 28,
        triggers: ['GitHub Webhook', 'Pull Request', 'Master Branch Push'],
        actions: ['소스코드 분석', 'AI 코드 리뷰', '자동 테스트 실행', '보안 취약점 스캔', 'Docker 이미지 빌드', 'Kubernetes 배포', 'Slack/Teams 알림']
      },
      {
        name: '스마트 버그 트래킹 및 자동 할당 시스템',
        description: 'Jira 이슈 생성 시 AI가 버그 유형 분석하여 최적 담당자 자동 할당 및 우선순위 설정',
        nodes: 15,
        triggers: ['Jira Webhook', 'Bug Report Creation', 'Customer Support Ticket'],
        actions: ['이슈 내용 AI 분석', '유사 이슈 검색', '담당자 워크로드 분석', '자동 할당', '우선순위 설정', '관련팀 알림']
      },
      {
        name: 'AI 기반 코드 품질 모니터링 및 개선 제안',
        description: 'SonarQube 분석 결과를 AI가 해석하여 구체적인 리팩토링 제안 및 자동 수정 PR 생성',
        nodes: 22,
        triggers: ['SonarQube Analysis Complete', 'Code Quality Threshold Breach'],
        actions: ['코드 품질 지표 분석', 'AI 기반 개선안 생성', '자동 리팩토링 수행', 'PR 생성', '리뷰어 할당', '품질 대시보드 업데이트']
      },
      {
        name: '개발자 생산성 분석 및 맞춤형 AI 도구 추천',
        description: 'Git 활동, IDE 사용 패턴, 코드 작성 스타일을 분석하여 개인별 최적 AI 도구 및 설정 추천',
        nodes: 18,
        triggers: ['Daily Git Activity', 'Weekly Productivity Review'],
        actions: ['개발 패턴 분석', '생산성 지표 계산', 'AI 도구 효과 측정', '맞춤형 추천 생성', '개인 대시보드 업데이트']
      },
      {
        name: '실시간 장애 예측 및 자동 복구',
        description: '시스템 메트릭과 로그를 AI가 실시간 분석하여 장애 예측 및 사전 대응 조치 자동 실행',
        nodes: 25,
        triggers: ['Prometheus Alert', 'Log Pattern Anomaly', 'Performance Threshold'],
        actions: ['AI 이상징후 탐지', '장애 원인 분석', '자동 스케일링', '트래픽 리라우팅', '긴급 알림 발송', '복구 보고서 생성']
      }
    ],
    aiImplementations: [
      {
        type: 'GitHub Copilot Enterprise + Custom AI Models',
        purpose: '소프트웨어 개발 전 과정 AI 지원 (코딩, 리뷰, 테스트, 문서화)',
        accuracy: '92% (코드 생성), 89% (버그 탐지), 94% (테스트 케이스 생성)',
        processingTime: '실시간 (평균 50ms 응답)'
      },
      {
        type: 'OpenAI GPT-4 Turbo + CodeT5',
        purpose: '복잡한 아키텍처 설계 및 레거시 코드 마이그레이션 자동화',
        accuracy: '87% (아키텍처 제안), 91% (코드 변환)',
        processingTime: '평균 2-5초 (복잡도에 따라 변동)'
      },
      {
        type: '커스텀 MLOps 파이프라인 (Kubeflow + MLflow)',
        purpose: 'ML 모델 자동 훈련, 배포, 모니터링 및 A/B 테스트',
        accuracy: '96% (모델 성능 예측), 99% (배포 성공률)',
        processingTime: '모델 훈련 30% 단축, 배포 시간 85% 단축'
      },
      {
        type: 'AI 기반 보안 스캐닝 (Snyk + Custom Security AI)',
        purpose: '실시간 보안 취약점 탐지 및 자동 패치 제안',
        accuracy: '98% (취약점 탐지), 85% (자동 패치 성공률)',
        processingTime: '실시간 스캐닝 (코드 커밋 시 즉시)'
      }
    ],
    departmentAutomations: [
      {
        department: '프론트엔드 개발팀 (React/TypeScript)',
        automationLevel: '85%',
        timeSaved: '주 35시간 (팀 전체)',
        costReduction: '연 1.2억원',
        details: 'UI 컴포넌트 자동 생성, 반응형 디자인 최적화, 접근성 검사 자동화, 번들 크기 최적화'
      },
      {
        department: '백엔드 개발팀 (Java/Python)',
        automationLevel: '78%',
        timeSaved: '주 42시간 (팀 전체)',
        costReduction: '연 1.5억원',
        details: 'API 엔드포인트 자동 생성, 데이터베이스 쿼리 최적화, 마이크로서비스 간 통신 자동화'
      },
      {
        department: 'DevOps/인프라팀',
        automationLevel: '90%',
        timeSaved: '주 48시간 (팀 전체)',
        costReduction: '연 1.8억원',
        details: 'Kubernetes 클러스터 자동 관리, CI/CD 파이프라인 최적화, 모니터링 및 알람 자동화'
      },
      {
        department: 'QA/테스트팀',
        automationLevel: '82%',
        timeSaved: '주 38시간 (팀 전체)',
        costReduction: '연 1.1억원',
        details: '테스트 케이스 자동 생성, E2E 테스트 자동화, 성능 테스트 자동 실행 및 분석'
      },
      {
        department: '데이터사이언스팀',
        automationLevel: '75%',
        timeSaved: '주 32시간 (팀 전체)',
        costReduction: '연 9,500만원',
        details: 'AutoML 파이프라인, 데이터 전처리 자동화, 모델 성능 모니터링 자동화'
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

  // 2. AI/머신러닝
  'ai-machine-learning-platform': {
    id: 'ai-machine-learning-platform',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: 'AI/머신러닝',
    companyName: 'AI 플랫폼 B (직원 100명)',
    companySize: '중소기업',
    title: 'AI 기반 머신러닝 플랫폼 자동화',
    subtitle: '데이터 처리 및 모델 학습 속도 500% 향상',
    description: 'AI를 활용한 데이터 처리 및 머신러닝 모델 학습 자동화로 빠른 데이터 분석과 예측 모델 개발을 실현한 벤치마크 사례',
    icon: Brain,
    color: 'purple',
    heroImage: '/images/benchmark2/AI 연구 가속화 플랫폼.png',
    companyInfo: {
      industry: 'AI/머신러닝',
      employees: '100명',
      revenue: '연 매출 180억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '데이터 처리 병목',
        description: '대용량 데이터의 실시간 처리 및 분석 어려움',
        impact: '데이터 분석 지연 및 모델 학습 속도 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 데이터 처리 기초',
          duration: '16시간',
          description: '데이터 수집, 전처리, 탐색 및 시각화'
        }
      ],
      advanced: [
        {
          title: 'AI 모델 학습 자동화',
          duration: '24시간',
          description: '데이터 준비부터 모델 학습까지 자동화'
        }
      ],
      executive: [
        {
          title: 'AI 플랫폼 전략',
          duration: '8시간',
          description: 'AI 플랫폼 투자 ROI 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '데이터 처리 속도',
          before: '배치 처리',
          after: '실시간 처리',
          improvement: '500% 향상'
        }
      ],
      financial: [
        {
          item: '데이터 분석 인력 비용 절감',
          amount: '연 4억원'
        }
      ],
      qualitative: ['데이터 분석 시간 90% 단축', '모델 학습 속도 5배 증가']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 4억원',
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
      '데이터 통합 및 정제 시스템 구축',
      '모델 학습 파이프라인 자동화',
      '모니터링 및 로깅 시스템'
    ],
    tags: ['AI', '머신러닝', '데이터처리', '모델학습', '자동화'],
    testimonial: {
      quote: 'AI 플랫폼으로 데이터 분석 및 모델 개발이 완전히 혁신되었습니다.',
      author: '박AI',
      position: 'AI 플랫폼 팀장',
      company: 'AI 플랫폼 B'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '데이터 처리 속도 95% 단축, 모델 학습 속도 6배 증가'
      }
    ],
    n8nWorkflows: [
      {
        name: '데이터 처리 및 모델 학습 자동화',
        description: '데이터 수집부터 모델 학습까지 자동화된 워크플로우',
        nodes: 20,
        triggers: ['데이터 수집', '모델 학습 요청'],
        actions: ['데이터 전처리', '탐색 및 전처리', '모델 학습', '결과 분석']
      }
    ],
    aiImplementations: [
      {
        type: 'Machine Learning',
        purpose: '데이터 처리 및 모델 학습',
        accuracy: '92%',
        processingTime: '10분'
      }
    ],
    departmentAutomations: [
      {
        department: 'AI팀',
        automationLevel: '90%',
        timeSaved: '주 35시간',
        costReduction: '연 4억원'
      }
    ],
    featured: true
  },

  // 3. 클라우드 인프라
  'cloud-infrastructure-automation': {
    id: 'cloud-infrastructure-automation',
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
    heroImage: '/images/benchmark2/AI 기반 하이브리드 클라우드 최적화.png',
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

  // 4. 모바일 앱 개발
  'mobile-app-development-ai': {
    id: 'mobile-app-development-ai',
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
    heroImage: '/images/benchmark2/AI 게임 개발 자동화.png',
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
    implementationTimeline: '5주',
    successFactors: [
      'AI 기반 앱 개발 도구 도입',
      '사용자 행동 분석 시스템 구축',
      '자동화된 테스트 및 배포 파이프라인'
    ],
    tags: ['모바일앱', 'AI', '개발자동화', 'UX최적화', 'React Native'],
    testimonial: {
      quote: 'AI 도구로 앱 개발이 완전히 달라졌습니다.',
      author: '박모바일',
      position: '모바일 개발팀장',
      company: '모바일랩 D'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '앱 다운로드 200% 증가, 사용자 만족도 4.8점 달성'
      }
    ],
    n8nWorkflows: [
      {
        name: '앱 개발 자동화',
        description: '코드 생성부터 배포까지 자동화된 모바일 앱 개발 워크플로우',
        nodes: 14,
        triggers: ['기능 요청', 'UI 변경'],
        actions: ['코드 생성', '테스트 자동화', '앱스토어 배포', '사용자 피드백 수집']
      }
    ],
    aiImplementations: [
      {
        type: 'Code Generation',
        purpose: '모바일 앱 코드 자동 생성',
        accuracy: '88%',
        processingTime: '5분'
      }
    ],
    departmentAutomations: [
      {
        department: '모바일팀',
        automationLevel: '75%',
        timeSaved: '주 24시간',
        costReduction: '연 1.5억원'
      }
    ],
    featured: true
  },

  // 5. 웹 개발
  'web-development-automation': {
    id: 'web-development-automation',
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
    heroImage: '/images/benchmark2/AI 기반 IT 컨설팅 혁신.png',
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
    implementationTimeline: '6주',
    successFactors: [
      'AI 기반 웹 개발 플랫폼 도입',
      'SEO 자동화 시스템 구축',
      '반응형 디자인 자동 생성'
    ],
    tags: ['웹개발', 'AI', 'SEO자동화', '반응형디자인', 'Next.js'],
    testimonial: {
      quote: 'AI로 웹사이트 구축이 놀라울 정도로 빨라졌습니다.',
      author: '김웹',
      position: '웹 개발팀장',
      company: '웹솔루션 E'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '웹사이트 방문자 300% 증가, 전환율 150% 향상'
      }
    ],
    n8nWorkflows: [
      {
        name: '웹 개발 자동화',
        description: '디자인부터 배포까지 자동화된 웹사이트 개발 워크플로우',
        nodes: 16,
        triggers: ['디자인 요청', '콘텐츠 업데이트'],
        actions: ['페이지 생성', 'SEO 최적화', '테스트 자동화', '배포']
      }
    ],
    aiImplementations: [
      {
        type: 'Web Generation',
        purpose: '웹사이트 자동 생성 및 최적화',
        accuracy: '90%',
        processingTime: '15분'
      }
    ],
    departmentAutomations: [
      {
        department: '웹팀',
        automationLevel: '80%',
        timeSaved: '주 32시간',
        costReduction: '연 2억원'
      }
    ],
    featured: true
  },

  // 6. 데이터베이스 관리
  'database-management-ai': {
    id: 'database-management-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '데이터베이스 관리',
    companyName: '데이터인사이트 C (직원 65명)',
    companySize: '중소기업',
    title: 'AI 기반 데이터베이스 관리 자동화',
    subtitle: '데이터 백업 및 복구 속도 90% 단축',
    description: 'AI를 활용한 데이터베이스 자동 백업, 모니터링 및 복구 시스템으로 데이터 안정성과 가용성을 혁신한 벤치마크 사례',
    icon: Database,
    color: 'green',
    heroImage: '/images/benchmark2/AI 기반 대규모 IoT 플랫폼.png',
    companyInfo: {
      industry: '데이터베이스 관리',
      employees: '65명',
      revenue: '연 매출 80억원',
      location: '서울시 마포구'
    },
    challenges: [
      {
        title: '데이터 백업 및 복구 병목',
        description: '수동 백업 및 복구로 인한 데이터 손실 및 시스템 가용성 저하',
        impact: '데이터 손실 및 비즈니스 중단'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 데이터베이스 관리 기초',
          duration: '14시간',
          description: '데이터베이스 백업, 모니터링 도구 활용법'
        }
      ],
      advanced: [
        {
          title: 'AI 자동 백업 및 복구',
          duration: '18시간',
          description: '데이터베이스 자동 백업 및 복구 시스템'
        }
      ],
      executive: [
        {
          title: '데이터베이스 AI 전략',
          duration: '4시간',
          description: '데이터베이스 AI 투자 전략'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: '데이터 백업 및 복구 속도',
          before: '수동 백업',
          after: '자동 백업',
          improvement: '90% 단축'
        }
      ],
      financial: [
        {
          item: '데이터 백업 비용 절감',
          amount: '연 2억원'
        }
      ],
      qualitative: ['데이터 손실 0건 달성', '시스템 가용성 99.9% 달성']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 2억원',
      errorReduction: '95%',
      productivityGain: '1,000%'
    },
    roiData: {
      investment: '3천만원',
      monthlySavings: '1천 7백만원',
      paybackPeriod: '1.8개월',
      threeYearROI: '2,000%'
    },
    implementationTimeline: '4주',
    successFactors: [
      '데이터베이스 자동 백업 및 복구 시스템 구축',
      '실시간 모니터링 자동화',
      '자동 대응 및 복구 시스템'
    ],
    tags: ['데이터베이스', 'AI', '백업자동화', '복구자동화', '모니터링'],
    testimonial: {
      quote: 'AI 데이터베이스 관리로 데이터 안정성이 크게 향상되었습니다.',
      author: '최데이터',
      position: '데이터베이스 관리팀장',
      company: '데이터인사이트 C'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '데이터 손실 0건 달성, 시스템 가용성 99.99% 달성'
      }
    ],
    n8nWorkflows: [
      {
        name: '데이터베이스 관리 자동화',
        description: '백업부터 모니터링까지 자동화된 데이터베이스 관리 워크플로우',
        nodes: 15,
        triggers: ['백업 요청', '모니터링 경고'],
        actions: ['자동 백업', '복구 실행', '알림 발송', '모니터링 결과 분석']
      }
    ],
    aiImplementations: [
      {
        type: 'Database Management',
        purpose: '데이터베이스 자동 백업 및 복구',
        accuracy: '98%',
        processingTime: '1초'
      }
    ],
    departmentAutomations: [
      {
        department: '데이터베이스팀',
        automationLevel: '95%',
        timeSaved: '주 36시간',
        costReduction: '연 2억원'
      }
    ],
    featured: true
  },

  // 7. 네트워크 보안
  'network-security-ai': {
    id: 'network-security-ai',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: '네트워크 보안',
    companyName: '시큐리티랩 F (직원 90명)',
    companySize: '중소기업',
    title: 'AI 기반 보안 위협 탐지',
    subtitle: '보안 사고 탐지율 95% 향상, 대응 시간 90% 단축',
    description: 'AI를 활용한 실시간 보안 위협 탐지와 자동 대응 시스템으로 보안 수준을 혁신적으로 향상시킨 벤치마크 사례',
    icon: Shield,
    color: 'red',
    heroImage: '/images/benchmark2/AI 기반 제로트러스트 보안 플랫폼.png',
    companyInfo: {
      industry: '네트워크 보안',
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
    implementationTimeline: '8주',
    successFactors: [
      'AI 기반 위협 탐지 시스템 구축',
      '실시간 보안 모니터링 자동화',
      '자동 대응 및 복구 시스템'
    ],
    tags: ['사이버보안', 'AI', '위협탐지', '보안자동화', 'ML'],
    testimonial: {
      quote: 'AI 보안 시스템으로 위협 대응이 실시간으로 가능해졌습니다.',
      author: '최보안',
      position: '보안팀장',
      company: '시큐리티랩 F'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '보안 사고 0건 달성, 대응 시간 95% 단축'
      }
    ],
    n8nWorkflows: [
      {
        name: '보안 위협 대응',
        description: '위협 탐지부터 대응까지 자동화된 보안 워크플로우',
        nodes: 20,
        triggers: ['위협 탐지', '이상 행동 감지'],
        actions: ['위협 분석', '자동 차단', '알림 발송', '복구 실행']
      }
    ],
    aiImplementations: [
      {
        type: 'Threat Detection',
        purpose: '실시간 보안 위협 탐지 및 분석',
        accuracy: '98%',
        processingTime: '1초'
      }
    ],
    departmentAutomations: [
      {
        department: '보안팀',
        automationLevel: '95%',
        timeSaved: '주 40시간',
        costReduction: '연 5억원'
      }
    ],
    featured: true
  },

  // 8. DevOps 자동화
  'devops-automation': {
    id: 'devops-automation',
    category: 'it_tech',
    industry: 'IT/기술',
    subIndustry: 'DevOps 자동화',
    companyName: '웹솔루션 E (직원 75명)',
    companySize: '중소기업',
    title: 'AI 기반 DevOps 자동화',
    subtitle: 'CI/CD 파이프라인 속도 500% 향상',
    description: 'AI를 활용한 자동화된 CI/CD 파이프라인으로 개발 및 배포 속도를 혁신한 벤치마크 사례',
    icon: Zap,
    color: 'yellow',
    heroImage: '/images/benchmark2/AI 기반 보안 위협 탐지.png',
    companyInfo: {
      industry: 'DevOps 자동화',
      employees: '75명',
      revenue: '연 매출 100억원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: 'CI/CD 파이프라인 병목',
        description: '수동 테스트, 빌드, 배포로 인한 개발 및 배포 지연',
        impact: '빠른 소프트웨어 전달 및 고객 만족도 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI CI/CD 파이프라인 이해',
          duration: '16시간',
          description: 'GitLab CI, Jenkins, GitHub Actions 활용법'
        }
      ],
      advanced: [
        {
          title: 'AI 자동화된 CI/CD',
          duration: '24시간',
          description: '자동 테스트, 빌드, 배포 파이프라인'
        }
      ],
      executive: [
        {
          title: 'DevOps AI 전략',
          duration: '8시간',
          description: 'DevOps AI 투자 ROI 분석'
        }
      ]
    },
    results: {
      quantitative: [
        {
          metric: 'CI/CD 파이프라인 속도',
          before: '수동 프로세스',
          after: '자동 프로세스',
          improvement: '500% 향상'
        }
      ],
      financial: [
        {
          item: '개발 및 배포 비용 절감',
          amount: '연 10억원'
        }
      ],
      qualitative: ['개발 및 배포 속도 5배 증가', '고객 만족도 95% 달성']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 10억원',
      errorReduction: '95%',
      productivityGain: '500%'
    },
    roiData: {
      investment: '2억원',
      monthlySavings: '1천 2백만원',
      paybackPeriod: '2개월',
      threeYearROI: '1,000%'
    },
    implementationTimeline: '6주',
    successFactors: [
      '자동화된 CI/CD 파이프라인 구축',
      '실시간 모니터링 및 로깅 시스템',
      '자동 대응 및 복구 시스템'
    ],
    tags: ['DevOps', 'AI', 'CI/CD자동화', '자동테스트', '자동배포'],
    testimonial: {
      quote: 'AI로 개발 및 배포 속도가 크게 향상되었습니다.',
      author: '김DevOps',
      position: 'DevOps 팀장',
      company: '웹솔루션 E'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '개발 및 배포 속도 95% 단축, 고객 만족도 95% 달성'
      }
    ],
    n8nWorkflows: [
      {
        name: 'DevOps 자동화',
        description: '자동화된 CI/CD 파이프라인 워크플로우',
        nodes: 20,
        triggers: ['코드 변경', '배포 요청'],
        actions: ['자동 테스트', '빌드', '배포', '모니터링']
      }
    ],
    aiImplementations: [
      {
        type: 'CI/CD Automation',
        purpose: '자동화된 CI/CD 파이프라인',
        accuracy: '98%',
        processingTime: '1초'
      }
    ],
    departmentAutomations: [
      {
        department: 'DevOps팀',
        automationLevel: '95%',
        timeSaved: '주 40시간',
        costReduction: '연 10억원'
      }
    ],
    featured: true
  },

  // 9. IoT 플랫폼
  'iot-platform-development': {
    id: 'iot-platform-development',
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
    heroImage: '/images/benchmark2/AI 기반 5G 네트워크 효율 최적화.png',
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
    implementationTimeline: '10주',
    successFactors: [
      'IoT 센서 데이터 통합 시스템 구축',
      '실시간 스트리밍 분석 엔진',
      '예측 모델링 자동화'
    ],
    tags: ['IoT', 'AI', '실시간분석', '스마트시티', '센서데이터'],
    testimonial: {
      quote: 'IoT와 AI의 결합으로 스마트 시티 서비스가 완전히 바뀌었습니다.',
      author: '정IoT',
      position: 'IoT 플랫폼팀장',
      company: 'IoT솔루션 G'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '서비스 응답 시간 95% 단축, 예측 정확도 90% 달성'
      }
    ],
    n8nWorkflows: [
      {
        name: 'IoT 데이터 분석',
        description: '센서 데이터 수집부터 예측 분석까지 자동화된 워크플로우',
        nodes: 22,
        triggers: ['센서 데이터 수신', '분석 요청'],
        actions: ['데이터 전처리', '실시간 분석', '예측 모델링', '알림 발송']
      }
    ],
    aiImplementations: [
      {
        type: 'Streaming Analytics',
        purpose: '실시간 IoT 데이터 스트리밍 분석',
        accuracy: '88%',
        processingTime: '실시간'
      }
    ],
    departmentAutomations: [
      {
        department: 'IoT팀',
        automationLevel: '90%',
        timeSaved: '주 38시간',
        costReduction: '연 4억원'
      }
    ],
    featured: true
  },

  // 10. 블록체인 기술
  'blockchain-technology-ai': {
    id: 'blockchain-technology-ai',
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
    heroImage: '/images/benchmark2/AI 자산관리 최적화 시스템.png',
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
    implementationTimeline: '7주',
    successFactors: [
      'AI 기반 합의 알고리즘 최적화',
      '스마트 컨트랙트 자동화',
      '네트워크 성능 모니터링'
    ],
    tags: ['블록체인', 'AI', '스마트컨트랙트', '합의알고리즘', 'DeFi'],
    testimonial: {
      quote: 'AI로 블록체인 성능이 혁신적으로 향상되었습니다.',
      author: '한블록',
      position: '블록체인 개발팀장',
      company: '블록체인랩 H'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 성과',
        achievement: '네트워크 안정성 99.99% 달성, 사용자 만족도 95% 향상'
      }
    ],
    n8nWorkflows: [
      {
        name: '블록체인 최적화',
        description: '트랜잭션 처리부터 스마트 컨트랙트 실행까지 자동화',
        nodes: 18,
        triggers: ['트랜잭션 요청', '컨트랙트 실행'],
        actions: ['성능 최적화', '합의 프로세스', '검증 실행', '결과 기록']
      }
    ],
    aiImplementations: [
      {
        type: 'Consensus Optimization',
        purpose: 'AI 기반 합의 알고리즘 최적화',
        accuracy: '94%',
        processingTime: '2초'
      }
    ],
    departmentAutomations: [
      {
        department: '블록체인팀',
        automationLevel: '85%',
        timeSaved: '주 28시간',
        costReduction: '연 1.5억원'
      }
    ],
    featured: true
  }
};

export default itTechBenchmarkCases;

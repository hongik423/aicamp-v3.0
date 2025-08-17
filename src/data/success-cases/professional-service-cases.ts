'use client';

import { 
  Scale, 
  Calculator, 
  Briefcase, 
  Code, 
  Users, 
  Megaphone, 
  Palette,
  TrendingUp,
  Clock,
  Target,
  Shield,
  BarChart3,
  Zap,
  Brain
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 전문서비스 업종 성공사례 데이터
export const professionalServiceCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'legal-automation': {
    id: 'legal-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '법률',
    companyName: '김앤장 법률사무소 (직원 1,200명)',
    companySize: '대기업',
    title: 'AI 법률 서비스 자동화 혁신',
    subtitle: '법률 검토 시간 70% 단축, 정확도 95% 달성',
    description: 'AI와 n8n을 활용한 법률 문서 분석과 계약 검토 자동화로 법률 서비스의 효율성과 정확성을 획기적으로 개선한 사례',
    icon: Scale,
    color: 'indigo',
    heroImage: '/images/benchmark2/AI 법률 서비스 자동화 혁신.png',
    companyInfo: {
      industry: '법률사무소',
      employees: '1,200명',
      revenue: '연 매출 1조 2천억원',
      location: '서울시 종로구'
    },
    challenges: [
      {
        title: '방대한 문서 검토',
        description: '수천 페이지 계약서 및 법률 문서 수동 검토',
        impact: '검토 시간 과다 및 인적 오류 발생'
      },
      {
        title: '판례 검색 비효율',
        description: '관련 판례 및 법령 검색에 과도한 시간 소요',
        impact: '법률 자문 품질 저하'
      },
      {
        title: '다국어 계약 처리',
        description: '글로벌 계약의 번역 및 검토 부담',
        impact: '국제 거래 대응 지연'
      },
      {
        title: '실사(Due Diligence) 복잡성',
        description: 'M&A 실사 과정의 방대한 데이터 처리',
        impact: '실사 기간 장기화 및 비용 증가'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '리걸테크 AI 기초',
          duration: '16시간',
          description: '법률 분야 AI 활용 이해'
        },
        {
          title: 'n8n 법률 자동화',
          duration: '12시간',
          description: '법률 업무 프로세스 자동화'
        },
        {
          title: '법률 데이터 보안',
          duration: '10시간',
          description: 'AI 시대의 정보 보호'
        }
      ],
      advanced: [
        {
          title: 'AI 계약 분석',
          duration: '24시간',
          description: 'NLP 기반 계약서 자동 분석'
        },
        {
          title: '판례 예측 모델',
          duration: '20시간',
          description: '머신러닝 기반 판결 예측'
        },
        {
          title: '법률 챗봇 구축',
          duration: '18시간',
          description: 'AI 법률 상담 시스템'
        }
      ],
      executive: [
        {
          title: '리걸테크 전략',
          duration: '8시간',
          description: '법률사무소 디지털 전환'
        },
        {
          title: 'AI 윤리와 법률',
          duration: '6시간',
          description: 'AI 시대의 법적 이슈'
        }
      ]
    },
    process: [
      {
        phase: 'AI 문서 분석 시스템',
        duration: '10주',
        activities: [
          'OCR 및 NLP 엔진 구축',
          '계약 조항 자동 추출',
          '리스크 자동 평가',
          '다국어 번역 시스템'
        ],
        results: [
          '문서 처리 속도 10배',
          '오류 감지율 98%',
          '15개 언어 지원'
        ]
      },
      {
        phase: '판례 검색 AI',
        duration: '12주',
        activities: [
          '판례 데이터베이스 구축',
          'AI 검색 엔진 개발',
          '유사 판례 추천',
          '판결 예측 모델'
        ],
        results: [
          '검색 시간 90% 단축',
          '관련성 정확도 95%',
          '승소 예측률 82%'
        ]
      },
      {
        phase: '실사 자동화',
        duration: '14주',
        activities: [
          'AI 실사 플랫폼',
          '자동 리포트 생성',
          '이상 거래 감지',
          '규제 준수 체크'
        ],
        results: [
          '실사 기간 60% 단축',
          '비용 50% 절감',
          '정확도 97%'
        ]
      },
      {
        phase: '통합 법률 플랫폼',
        duration: '16주',
        activities: [
          '전사 시스템 통합',
          'AI 법률 비서 도입',
          '클라이언트 포털',
          '성과 분석 대시보드'
        ],
        results: [
          '생산성 85% 향상',
          '고객 만족도 92%',
          '수임료 30% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '문서 검토 시간',
          before: '평균 10시간',
          after: '평균 3시간',
          improvement: '70% 단축'
        },
        {
          metric: '계약 검토 정확도',
          before: '85%',
          after: '98%',
          improvement: '15.3% 향상'
        },
        {
          metric: '변호사 생산성',
          before: '일 5건',
          after: '일 12건',
          improvement: '140% 향상'
        },
        {
          metric: '실사 처리 기간',
          before: '평균 3개월',
          after: '평균 1.2개월',
          improvement: '60% 단축'
        },
        {
          metric: '판례 검색 시간',
          before: '건당 2시간',
          after: '건당 12분',
          improvement: '90% 절감'
        },
        {
          metric: '고객 응답 시간',
          before: '48시간',
          after: '4시간',
          improvement: '91.7% 단축'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 280억원'
        },
        {
          item: '추가 수임료 수익',
          amount: '연 450억원'
        },
        {
          item: '실사 비용 절감',
          amount: '연 120억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 520%'
        }
      ],
      qualitative: [
        '국내 리걸테크 선도 위상',
        '변호사 업무 만족도 향상',
        '국제 법률 서비스 경쟁력 강화',
        '젊은 인재 유치 성공',
        'ESG 법률 자문 선도'
      ]
    },
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 280억원',
      errorReduction: '98%',
      productivityGain: '85%'
    },
    n8nWorkflows: [
      { name: 'AI 계약 검토 파이프라인', description: 'OCR→NLP 조항 추출→리스크 스코어링→자동 보고', nodes: 18, triggers: ['계약 업로드', '이메일 수신'], actions: ['OCR', 'LLM분석', '리포트생성', 'DMS저장'] },
      { name: '판례·법령 검색 자동화', description: '키워드/문맥 기반 유사 판례·법령 검색', nodes: 12, triggers: ['질의 입력'], actions: ['벡터검색', '랭킹', '요약'] },
      { name: 'DD(실사) 문서 자동화', description: '실사 체크리스트 기반 항목별 자동 수집/분석', nodes: 16, triggers: ['실사 착수'], actions: ['데이터수집', '이상탐지', '리포트'] }
    ],
    aiImplementations: [
      { type: 'NLP 계약 분석', purpose: '조항 추출/리스크 평가', accuracy: '98%', processingTime: '문서당 30초' },
      { type: '시맨틱 검색', purpose: '판례/법령 유사도 검색', accuracy: '95%', processingTime: '500ms' },
      { type: '요약/초안 생성', purpose: '법률 의견서 초안', accuracy: '93%', processingTime: '10초' }
    ],
    departmentAutomations: [
      { department: '송무팀', automationLevel: '70%', timeSaved: '28시간/주', costReduction: '연 30억원' },
      { department: '자문팀', automationLevel: '80%', timeSaved: '32시간/주', costReduction: '연 45억원' },
      { department: '실사팀', automationLevel: '75%', timeSaved: '30시간/주', costReduction: '연 25억원' }
    ],
    roiData: { investment: '40억원', monthlySavings: '23억원', paybackPeriod: '1.7개월', threeYearROI: '1,800%' },
    implementationTimeline: '12개월',
    successFactors: [ '표준화/거버넌스', '법률 도메인 프롬프트 자산', '합동 운영체계' ],
    testimonial: { quote: '계약 검토와 실사가 자동화되며 변호사들이 전략 자문에 집중할 수 있었습니다.', author: '김정훈', position: '시니어 파트너', company: '김앤장 법률사무소' },
    followUpResults: [ { metric: '재계약률', achievement: '전년 대비 28% 증가' }, { metric: '해외 자문 매출', achievement: '42% 성장' } ],
    tags: ['리걸테크', '계약분석', '판례검색', 'AI실사'],
    featured: true
  },

  'accounting-automation': {
    id: 'accounting-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '회계',
    companyName: '삼일PwC (직원 3,500명)',
    companySize: '대기업',
    title: 'AI 회계 감사 혁신 플랫폼',
    subtitle: '감사 시간 55% 단축, 부정 탐지율 92%',
    description: 'AI와 n8n을 활용한 회계 감사 자동화와 부정 탐지로 감사 품질을 혁신적으로 개선한 사례',
    icon: Calculator,
    color: 'green',
    heroImage: '/images/benchmark2/AI 회계 감사 혁신 플랫폼.png',
    companyInfo: {
      industry: '회계법인',
      employees: '3,500명',
      revenue: '연 매출 1조 5천억원',
      location: '서울시 용산구'
    },
    challenges: [
      {
        title: '방대한 감사 데이터',
        description: '수만 건의 거래 내역 수동 검토',
        impact: '감사 시간 증가 및 샘플링 한계'
      },
      {
        title: '부정 거래 탐지',
        description: '복잡한 부정 패턴 식별 어려움',
        impact: '회계 부정 미탐지 리스크'
      },
      {
        title: '규제 대응',
        description: '변화하는 회계 기준 적용 복잡성',
        impact: '컴플라이언스 리스크'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '회계 AI 기초',
          duration: '14시간',
          description: '회계 감사 AI 활용법'
        },
        {
          title: 'n8n 감사 자동화',
          duration: '12시간',
          description: '감사 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 이상 탐지',
          duration: '24시간',
          description: '머신러닝 부정 탐지 모델'
        },
        {
          title: '예측 분석',
          duration: '20시간',
          description: '재무 리스크 예측 모델링'
        }
      ],
      executive: [
        {
          title: '디지털 감사 전략',
          duration: '8시간',
          description: 'AI 시대 회계법인 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 감사 플랫폼 구축',
        duration: '12주',
        activities: [
          '전수 조사 자동화',
          'AI 이상 거래 탐지',
          '자동 분개 검증',
          '리스크 스코어링'
        ],
        results: [
          '감사 범위 100% 커버',
          '이상 탐지율 92%'
        ]
      },
      {
        phase: '부정 탐지 AI',
        duration: '10주',
        activities: [
          '패턴 인식 모델',
          '네트워크 분석',
          '실시간 모니터링'
        ],
        results: [
          '부정 탐지율 85% 향상',
          '오탐률 5% 미만'
        ]
      },
      {
        phase: '통합 감사 시스템',
        duration: '14주',
        activities: [
          'ERP 연동',
          '자동 보고서 생성',
          '클라이언트 포털'
        ],
        results: [
          '감사 시간 55% 단축',
          '감사 품질 40% 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '감사 소요 시간',
          before: '평균 3개월',
          after: '평균 1.35개월',
          improvement: '55% 단축'
        },
        {
          metric: '부정 탐지율',
          before: '45%',
          after: '92%',
          improvement: '104% 향상'
        },
        {
          metric: '감사 정확도',
          before: '93%',
          after: '99.2%',
          improvement: '6.7% 향상'
        },
        {
          metric: '처리 거래 수',
          before: '샘플 5%',
          after: '전수 100%',
          improvement: '20배 증가'
        }
      ],
      financial: [
        {
          item: '감사 효율화 수익',
          amount: '연 380억원'
        },
        {
          item: '추가 수임 수익',
          amount: '연 520억원'
        },
        {
          item: 'ROI',
          amount: '10개월 내 회수'
        }
      ],
      qualitative: [
        '감사 품질 국제 인증',
        '회계사 업무 만족도 향상',
        '디지털 감사 선도 기업'
      ]
    },
    automationMetrics: {
      timeReduction: '55%',
      costSaving: '연 380억원',
      errorReduction: '92%',
      productivityGain: '85%'
    },
    n8nWorkflows: [
      { name: '전수감사 파이프라인', description: '거래 수집→규칙/ML 검증→리스크 점수→레포트', nodes: 20, triggers: ['배치 처리'], actions: ['ERP연동', 'ML검증', '리포트'] },
      { name: '이상거래 탐지', description: '그래프 기반 네트워크 분석과 실시간 모니터링', nodes: 14, triggers: ['실시간 이벤트'], actions: ['스트림처리', '알림', '대시보드'] },
      { name: '자동 감사보고', description: '핵심 지표 요약 및 감사 의견 초안 생성', nodes: 10, triggers: ['감사 종료'], actions: ['요약', '문서화', '승인흐름'] }
    ],
    aiImplementations: [
      { type: '이상탐지 ML', purpose: '부정 패턴 탐지', accuracy: '92%', processingTime: '실시간' },
      { type: '문서요약 LLM', purpose: '감사보고 초안', accuracy: '95%', processingTime: '30초' }
    ],
    departmentAutomations: [
      { department: '감사1본부', automationLevel: '80%', timeSaved: '34시간/주', costReduction: '연 60억원' },
      { department: '품질관리', automationLevel: '70%', timeSaved: '26시간/주', costReduction: '연 25억원' }
    ],
    roiData: { investment: '30억원', monthlySavings: '18억원', paybackPeriod: '1.7개월', threeYearROI: '1,980%' },
    implementationTimeline: '10개월',
    successFactors: ['전사 ERP 연동', '샘플링→전수 전환', '데이터 신뢰성 확보'],
    testimonial: { quote: '전수 감사와 자동 보고서로 품질과 속도를 동시에 달성했습니다.', author: '박성준', position: '감사본부장', company: '삼일PwC' },
    followUpResults: [{ metric: '오탐률', achievement: '5% 미만 유지' }, { metric: '감사 수임', achievement: '연 22% 증가' }],
    tags: ['회계자동화', '부정탐지', '전수감사', 'AI감사'],
    featured: true
  },

  // 추가 5개 사례 (경영컨설팅, IT컨설팅, HR, 마케팅, 디자인)
  'management-consulting': {
    id: 'management-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '경영컨설팅',
    companyName: '맥킨지 한국사무소',
    companySize: '대기업',
    title: 'AI 경영 분석 자동화',
    subtitle: '분석 시간 65% 단축, 인사이트 품질 80% 향상',
    description: 'AI 기반 시장/재무/운영 데이터 분석 자동화와 전략 시뮬레이션으로 프로젝트 납기를 단축하고 품질을 고도화',
    icon: Briefcase,
    color: 'blue',
    heroImage: '/images/benchmark2/AI 경영 분석 자동화분.png',
    companyInfo: { industry: '경영컨설팅', employees: '1,000명', revenue: '연 매출 8,500억원', location: '서울 강남' },
    challenges: [
      { title: '수작업 리서치 의존', description: '분산된 데이터 수집/정제에 과다 시간', impact: '인사이트 도출 지연' },
      { title: '시나리오 시뮬레이션 한계', description: '모델링 자동화 부족', impact: '의사결정 품질 편차' },
      { title: '전달물 표준화 부족', description: '산출물 품질 편차', impact: '고객 만족도 저하' }
    ],
    curriculum: {
      basic: [
        { title: '컨설팅 데이터를 위한 프롬프트', duration: '12시간', description: '케이스 인터뷰식 프롬프트 템플릿' },
        { title: '데이터 파이프라인 기초', duration: '12시간', description: '수집/정제/적재 파이프라인' }
      ],
      advanced: [
        { title: 'n8n 데이터 파이프라인', duration: '20시간', description: 'API/크롤링/ETL 자동화' },
        { title: '시뮬레이션/옵티마이저', duration: '16시간', description: '재무/운영 시뮬레이션 자동화' }
      ],
      executive: [
        { title: 'AI 컨설팅 거버넌스', duration: '8시간', description: '품질/윤리/보안 체계' }
      ]
    },
    process: [
      { phase: '데이터 통합/정제', duration: '4주', activities: ['다중 소스 수집', '중복제거/정제', '도메인 스키마화'], results: ['데이터 레이크 구축', '신뢰도 향상'] },
      { phase: '분석/시뮬레이션', duration: '6주', activities: ['시장/재무 모델', '수요/공급 예측', '민감도 분석'], results: ['정확도 20%↑', '의사결정 속도 50%↑'] },
      { phase: '전달물 자동화', duration: '2주', activities: ['슬라이드 자동 생성', '요약/추천안'], results: ['납기 35% 단축'] }
    ],
    results: {
      quantitative: [
        { metric: '리서치 시간', before: '평균 4주', after: '평균 1.4주', improvement: '65% 단축' },
        { metric: '분석 정확도', before: '기준', after: '+20%', improvement: '20% 향상' },
        { metric: '납기', before: '기준', after: '+35%', improvement: '35% 단축' }
      ],
      financial: [
        { item: '프로젝트 수익성', amount: '연 120억원 개선' },
        { item: '비용 절감', amount: '연 45억원' }
      ],
      qualitative: ['전달물 표준화', '재사용 가능한 분석 자산', '클라이언트 만족도 상승']
    },
    automationMetrics: { timeReduction: '65%', costSaving: '연 45억원', errorReduction: '40%', productivityGain: '70%' },
    n8nWorkflows: [
      { name: '시장 데이터 ETL', description: 'API/크롤링→정제→데이터레이크', nodes: 14, triggers: ['스케줄'], actions: ['수집', '정제', '적재'] },
      { name: '슬라이드 자동화', description: '분석요약→PPT 생성→승인흐름', nodes: 10, triggers: ['분석 완료'], actions: ['요약', '템플릿적용', '문서전송'] }
    ],
    aiImplementations: [
      { type: '타임시리즈 예측', purpose: '수요/매출 예측', accuracy: '90%', processingTime: '실시간' },
      { type: 'LLM 요약', purpose: '전달물 요약/초안', accuracy: '94%', processingTime: '10초' }
    ],
    departmentAutomations: [
      { department: '리서치팀', automationLevel: '75%', timeSaved: '30시간/주', costReduction: '연 10억원' },
      { department: '전략기획', automationLevel: '70%', timeSaved: '26시간/주', costReduction: '연 8억원' }
    ],
    roiData: { investment: '12억원', monthlySavings: '7억원', paybackPeriod: '1.7개월', threeYearROI: '1,650%' },
    implementationTimeline: '8개월',
    successFactors: ['데이터 표준화', '재사용 가능한 모듈', '컨설턴트 교육'],
    testimonial: { quote: '데이터 수집부터 전달물까지 자동화해 납기와 품질을 동시에 달성했습니다.', author: '김○○', position: '파트너', company: '맥킨지' },
    followUpResults: [{ metric: '클라이언트 만족도', achievement: '+18%p' }],
    tags: ['경영분석', '전략수립', '데이터분석', 'AI인사이트'],
    featured: false
  },

  'it-consulting': {
    id: 'it-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'IT컨설팅',
    companyName: '삼성SDS',
    title: 'AI 기반 IT 컨설팅 혁신',
    subtitle: '프로젝트 기간 45% 단축, 성공률 92%',
    description: 'AI를 활용한 시스템 분석과 아키텍처 설계 자동화로 IT 컨설팅을 혁신한 사례',
    icon: Code,
    color: 'purple',
    featured: true,
    implementationPeriod: '9개월',
    teamSize: '85명'
  },

  'hr-consulting': {
    id: 'hr-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'HR/인사노무',
    companyName: '머서 코리아',
    title: 'AI HR 서비스 플랫폼',
    subtitle: '채용 효율 75% 향상, 인재 매칭 정확도 88%',
    description: 'AI를 활용한 인재 채용과 조직 진단 자동화로 HR 서비스를 혁신한 사례',
    icon: Users,
    color: 'orange',
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '42명'
  },

  'marketing-agency': {
    id: 'marketing-agency',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '마케팅에이전시',
    companyName: '제일기획',
    title: 'AI 마케팅 자동화 플랫폼',
    subtitle: '캠페인 효율 120% 향상, ROI 185% 개선',
    description: 'AI를 활용한 마케팅 전략 수립과 캠페인 최적화로 마케팅 성과를 극대화한 사례',
    icon: Megaphone,
    color: 'red',
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '58명'
  },

  'design-branding': {
    id: 'design-branding',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '디자인/브랜딩',
    companyName: '플러스엑스',
    title: 'AI 디자인 생성 혁신',
    subtitle: '디자인 생산성 200% 향상, 고객 만족도 95%',
    description: 'AI를 활용한 디자인 자동 생성과 브랜딩 최적화로 창의성과 효율성을 극대화한 사례',
    icon: Palette,
    color: 'pink',
    featured: false,
    implementationPeriod: '5개월',
    teamSize: '35명'
  }
};

// 전문서비스 업종 요약 리스트
export const professionalServiceCases: SuccessCase[] = [
  {
    id: 'legal-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '법률',
    companyName: '김앤장',
    title: 'AI 법률 서비스 자동화 혁신',
    description: '법률 검토 시간 70% 단축, 정확도 95% 달성',
    metrics: {
      time: '-70%',
      accuracy: '98%',
      productivity: '+140%',
      revenue: '+30%'
    },
    tags: ['리걸테크', '계약분석', '판례검색', 'AI실사'],
    icon: Scale,
    color: 'indigo',
    featured: true
  },
  {
    id: 'accounting-automation',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '회계',
    companyName: '삼일PwC',
    title: 'AI 회계 감사 혁신 플랫폼',
    description: '감사 시간 55% 단축, 부정 탐지율 92%',
    metrics: {
      time: '-55%',
      detection: '92%',
      coverage: '100%',
      accuracy: '99.2%'
    },
    tags: ['회계자동화', '부정탐지', '전수감사', 'AI감사'],
    icon: Calculator,
    color: 'green',
    featured: true
  },
  {
    id: 'management-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '경영컨설팅',
    companyName: '맥킨지',
    title: 'AI 경영 분석 자동화',
    description: '분석 시간 65% 단축, 인사이트 품질 80% 향상',
    metrics: {
      time: '-65%',
      quality: '+80%',
      projects: '+45%',
      accuracy: '94%'
    },
    tags: ['경영분석', '전략수립', '데이터분석', 'AI인사이트'],
    icon: Briefcase,
    color: 'blue',
    featured: false
  },
  {
    id: 'it-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'IT컨설팅',
    companyName: '삼성SDS',
    title: 'AI 기반 IT 컨설팅 혁신',
    description: '프로젝트 기간 45% 단축, 성공률 92%',
    metrics: {
      duration: '-45%',
      success: '92%',
      quality: '+75%',
      cost: '-38%'
    },
    tags: ['IT컨설팅', '시스템분석', '아키텍처설계', 'AI진단'],
    icon: Code,
    color: 'purple',
    featured: true
  },
  {
    id: 'hr-consulting',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: 'HR/인사노무',
    companyName: '머서',
    title: 'AI HR 서비스 플랫폼',
    description: '채용 효율 75% 향상, 인재 매칭 정확도 88%',
    metrics: {
      efficiency: '+75%',
      matching: '88%',
      time: '-60%',
      retention: '+45%'
    },
    tags: ['HR테크', 'AI채용', '조직진단', '인재매칭'],
    icon: Users,
    color: 'orange',
    featured: false
  },
  {
    id: 'marketing-agency',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '마케팅에이전시',
    companyName: '제일기획',
    title: 'AI 마케팅 자동화 플랫폼',
    description: '캠페인 효율 120% 향상, ROI 185% 개선',
    metrics: {
      efficiency: '+120%',
      roi: '+185%',
      conversion: '+95%',
      cost: '-42%'
    },
    tags: ['마케팅자동화', 'AI캠페인', '성과예측', '타겟팅'],
    icon: Megaphone,
    color: 'red',
    featured: true
  },
  {
    id: 'design-branding',
    category: 'professional',
    industry: '전문서비스',
    subIndustry: '디자인/브랜딩',
    companyName: '플러스엑스',
    title: 'AI 디자인 생성 혁신',
    description: '디자인 생산성 200% 향상, 고객 만족도 95%',
    metrics: {
      productivity: '+200%',
      satisfaction: '95%',
      time: '-70%',
      quality: '+85%'
    },
    tags: ['AI디자인', '자동생성', '브랜딩', '크리에이티브'],
    icon: Palette,
    color: 'pink',
    featured: false
  }
];

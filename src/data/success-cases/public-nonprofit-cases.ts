'use client';

import { 
  Building2, 
  Heart, 
  School, 
  Users,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Zap,
  Award,
  MapPin,
  AlertTriangle,
  Siren,
  FileText,
  Vote,
  HandHeart
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 공공/비영리 업종 성공사례 데이터
export const publicNonprofitCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'government-digital-transformation': {
    id: 'government-digital-transformation',
    category: 'public',
    industry: '공공/비영리',
    subIndustry: '정부기관',
    companyName: '행정안전부 (직원 12,000명)',
    companySize: '정부기관',
    title: 'AI 기반 디지털 정부 통합 플랫폼',
    subtitle: '민원 처리 시간 78% 단축, 시민 만족도 92% 달성',
    description: 'AI와 n8n을 활용한 정부 서비스 완전 디지털화로 국민 중심의 혁신적인 전자정부를 구현한 공공 혁신 사례',
    icon: Building2,
    color: 'blue',
    heroImage: 'https://source.unsplash.com/1200x800/?government,city%20hall,public%20service,digital',
    companyInfo: {
      industry: '중앙정부기관',
      employees: '12,000명',
      revenue: '연 예산 85조원',
      location: '세종특별자치시'
    },
    challenges: [
      {
        title: '복잡한 행정 프로세스',
        description: '부처 간 칸막이와 중복 업무로 인한 비효율',
        impact: '민원 처리 지연 및 국민 불편'
      },
      {
        title: '데이터 사일로',
        description: '부처별 분산된 데이터로 통합 서비스 한계',
        impact: '정책 의사결정 지연 및 정확도 저하'
      },
      {
        title: '디지털 격차',
        description: '고령층, 취약계층의 디지털 서비스 접근성',
        impact: '공공서비스 형평성 문제'
      },
      {
        title: '보안 위협',
        description: '사이버 공격 및 개인정보 유출 위험',
        impact: '국가 안보 및 국민 신뢰 위협'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '디지털 정부 AI 기초',
          duration: '16시간',
          description: '공공 분야 AI 활용 이해'
        },
        {
          title: 'n8n 행정 자동화',
          duration: '14시간',
          description: '민원 처리 프로세스 자동화'
        },
        {
          title: '데이터 기반 행정',
          duration: '12시간',
          description: '빅데이터 정책 수립'
        }
      ],
      advanced: [
        {
          title: 'AI 정책 의사결정',
          duration: '24시간',
          description: '머신러닝 기반 정책 분석'
        },
        {
          title: '스마트 보안 시스템',
          duration: '20시간',
          description: 'AI 사이버 보안 구축'
        },
        {
          title: '시민 참여 플랫폼',
          duration: '18시간',
          description: 'AI 기반 국민 소통'
        }
      ],
      executive: [
        {
          title: '디지털 정부 전략',
          duration: '8시간',
          description: 'AI 시대 정부 혁신'
        },
        {
          title: '데이터 거버넌스',
          duration: '6시간',
          description: '공공 데이터 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 민원 처리 시스템',
        duration: '12주',
        activities: [
          'AI 챗봇 상담 시스템',
          '자동 민원 분류/배정',
          '지능형 문서 처리',
          '통합 민원 포털 구축'
        ],
        results: [
          '민원 처리 시간 78% 단축',
          '24시간 365일 서비스',
          '처리 정확도 96%'
        ]
      },
      {
        phase: '데이터 통합 플랫폼',
        duration: '16주',
        activities: [
          '범정부 데이터 레이크',
          'AI 데이터 분석 엔진',
          '실시간 정책 대시보드',
          '예측 정책 모델링'
        ],
        results: [
          '350개 기관 데이터 통합',
          '정책 수립 시간 65% 단축',
          '예측 정확도 89%'
        ]
      },
      {
        phase: '디지털 포용 서비스',
        duration: '10주',
        activities: [
          'AI 음성 인터페이스',
          '다국어 자동 번역',
          '시각장애인 지원 AI',
          '찾아가는 디지털 서비스'
        ],
        results: [
          '접근성 95% 달성',
          '디지털 격차 70% 해소',
          '취약계층 만족도 88%'
        ]
      },
      {
        phase: 'AI 보안 체계 구축',
        duration: '14주',
        activities: [
          'AI 위협 탐지 시스템',
          '블록체인 신원 인증',
          '양자암호 통신',
          '자동 보안 대응'
        ],
        results: [
          '보안 사고 92% 예방',
          '개인정보 유출 Zero',
          '해킹 시도 99.9% 차단'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '민원 처리 시간',
          before: '평균 7일',
          after: '평균 1.54일',
          improvement: '78% 단축'
        },
        {
          metric: '시민 만족도',
          before: '62%',
          after: '92%',
          improvement: '48.4% 향상'
        },
        {
          metric: '행정 비용',
          before: '연 8,500억원',
          after: '연 4,250억원',
          improvement: '50% 절감'
        },
        {
          metric: '디지털 서비스 이용률',
          before: '45%',
          after: '87%',
          improvement: '93.3% 증가'
        },
        {
          metric: '정책 수립 기간',
          before: '평균 6개월',
          after: '평균 2.1개월',
          improvement: '65% 단축'
        },
        {
          metric: '공무원 생산성',
          before: '100%',
          after: '285%',
          improvement: '185% 향상'
        }
      ],
      financial: [
        {
          item: '행정 비용 절감',
          amount: '연 4,250억원'
        },
        {
          item: '종이 문서 절감',
          amount: '연 350억원'
        },
        {
          item: '부정수급 방지',
          amount: '연 1,850억원'
        },
        {
          item: '총 경제 효과',
          amount: '연 2.5조원'
        }
      ],
      qualitative: [
        'UN 전자정부 평가 1위 달성',
        'OECD 디지털 정부 지수 최우수',
        '국민 신뢰도 역대 최고 기록',
        '공무원 직무 만족도 대폭 향상',
        '국제 벤치마킹 대상국 선정'
      ]
    },
    testimonial: {
      quote: "AI 시스템 도입 후 복잡했던 민원 처리가 자동화되어 국민들께 더 빠르고 정확한 서비스를 제공할 수 있게 되었습니다. 특히 24시간 AI 상담으로 언제든 도움을 드릴 수 있어 만족도가 크게 높아졌습니다.",
      author: "김정부",
      position: "디지털정부국장",
      company: "행정안전부"
    },
    followUpResults: [
      {
        metric: '연간 민원 처리량',
        achievement: '전년 대비 320% 증가'
      },
      {
        metric: '정책 실행 속도',
        achievement: '평균 2.5배 향상'
      }
    ],
    tags: ['디지털정부', 'AI민원', '데이터통합', '보안'],
    // AI & n8n 자동화 특화 필드
    automationMetrics: {
      timeReduction: '78%',
      costSaving: '연 4,250억원',
      errorReduction: '92%',
      productivityGain: '185%'
    },
    n8nWorkflows: [
      {
        workflowName: 'AI 민원 처리',
        description: '자동 분류, 처리, 답변 생성',
        triggerType: '민원 접수',
        integrations: ['정부24', 'AI 엔진', '부처 시스템'],
        executionCount: 50000
      },
      {
        workflowName: '정책 영향 분석',
        description: 'AI 시뮬레이션 정책 예측',
        triggerType: '정책 수립',
        integrations: ['빅데이터', 'AI 모델', '통계청'],
        executionCount: 2000
      },
      {
        workflowName: '보안 위협 대응',
        description: '실시간 탐지 및 자동 차단',
        triggerType: '이상 감지',
        integrations: ['보안 시스템', 'AI 분석', '대응 체계'],
        executionCount: 100000
      }
    ],
    aiImplementations: [
      {
        aiTool: 'NLP 챗봇',
        useCase: '민원 상담',
        accuracy: '96%',
        processingTime: '평균 30초'
      },
      {
        aiTool: '예측 분석',
        useCase: '정책 효과 예측',
        accuracy: '89%',
        processingTime: '평균 5분'
      },
      {
        aiTool: '이상 탐지',
        useCase: '보안 위협 감지',
        accuracy: '99.9%',
        processingTime: '실시간'
      }
    ],
    roiData: {
      investment: '500억원',
      monthlySavings: '354억원',
      paybackPeriod: '1.4개월',
      threeYearROI: '2,550%'
    },
    implementationTimeline: '12개월',
    successFactors: [
      '최고 리더십의 강력한 디지털 전환 의지',
      '부처 간 협업과 데이터 공유 문화 조성',
      '공무원 AI 역량 강화 교육 프로그램',
      '국민 중심 서비스 설계와 지속적 개선'
    ],
    featured: true
  },

  'local-government-smart-city': {
    id: 'local-government-smart-city',
    category: 'public',
    industry: '공공/비영리',
    subIndustry: '지방자치단체',
    companyName: '서울특별시 (직원 40,000명)',
    companySize: '지방자치단체',
    title: 'AI 기반 스마트 시티 통합 플랫폼',
    subtitle: '교통혼잡 42% 감소, 민원처리 71% 단축',
    description: '교통/환경/안전 데이터를 통합하고 AI와 n8n으로 예측·대응·민원처리를 자동화해 시민 체감 성과를 만든 사례',
    icon: Globe,
    color: 'green',
    heroImage: 'https://source.unsplash.com/1200x800/?smart%20city,traffic,environment,city',
    companyInfo: { industry: '지방정부', employees: '40,000명', revenue: '연 예산 44조원', location: '서울특별시' },
    challenges: [
      { title: '교통 혼잡/사고', description: '실시간 데이터 분절로 사전 대응 한계', impact: '시민 불편/사회적 비용 증가' },
      { title: '대기/미세먼지', description: '예측/경보 체계 미흡', impact: '건강 리스크' },
      { title: '민원 연계', description: '부서 별 처리 파편화', impact: '처리 지연' }
    ],
    curriculum: {
      basic: [ { title: '공공 데이터 표준/거버넌스', duration: '12시간', description: '메타데이터/품질' } ],
      advanced: [ { title: 'n8n 도시데이터 파이프라인', duration: '20시간', description: 'IoT/교통/환경 통합' } ],
      executive: [ { title: '스마트시티 전략/윤리', duration: '8시간', description: '안전/프라이버시' } ]
    },
    process: [
      { phase: '데이터 통합', duration: '8주', activities: ['CCTV/신호/센서/기상 통합', '데이터 거버넌스'], results: ['실시간 데이터레이크 구축'] },
      { phase: '예측/대응', duration: '10주', activities: ['혼잡/사고 예측', '대기질 예측', '자동 경보/우회'], results: ['혼잡 42%↓'] },
      { phase: '민원 자동화', duration: '6주', activities: ['분류/배정/알림', '처리 SLA 추적'], results: ['처리 71% 단축'] }
    ],
    results: {
      quantitative: [
        { metric: '교통 혼잡', before: '기준', after: '-42%', improvement: '42% 감소' },
        { metric: '민원 처리 시간', before: '평균 7일', after: '평균 2일', improvement: '71% 단축' },
        { metric: '대기질 경보 정확도', before: '78%', after: '91%', improvement: '16.7%p 향상' }
      ],
      financial: [ { item: '사회적 비용 절감', amount: '연 6,200억원' } ],
      qualitative: ['시민 체감 서비스 향상', '현장 대응 속도 개선', '데이터 기반 행정 정착']
    },
    testimonial: { quote: '부서가 하나의 데이터 플랫폼으로 연결되며 사전 대응이 가능해졌습니다.', author: '박○○', position: '스마트도시정책관', company: '서울특별시' },
    followUpResults: [ { metric: '시민 만족도', achievement: '92% 달성' } ],
    tags: ['스마트시티', '교통', '대기질', '민원'],
    automationMetrics: { timeReduction: '71%', costSaving: '연 6,200억원', errorReduction: '35%', productivityGain: '65%' },
    n8nWorkflows: [
      { name: '교통 이벤트 파이프라인', description: '혼잡/사고 감지→경보/우회안내', nodes: 18, triggers: ['CCTV/신호'], actions: ['탐지', '우회알림', '대시보드'] },
      { name: '대기질 예측/경보', description: '센서/기상→예측→취약계층 알림', nodes: 12, triggers: ['센서'], actions: ['예측', 'SMS', '지도'] },
      { name: '민원 자동 분류/배정', description: '민원→자연어 분류→담당 배정/SLA', nodes: 14, triggers: ['접수'], actions: ['분류', '배정', '알림'] }
    ],
    aiImplementations: [
      { type: '이상탐지/Computer Vision', purpose: '사고/혼잡 감지', accuracy: '93%', processingTime: '실시간' },
      { type: '타임시리즈 예측', purpose: '대기질/수요 예측', accuracy: '91%', processingTime: '실시간' },
      { type: 'NLP 분류', purpose: '민원 라우팅', accuracy: '94%', processingTime: '1초' }
    ],
    departmentAutomations: [
      { department: '교통과', automationLevel: '80%', timeSaved: '36시간/주', costReduction: '연 120억원' },
      { department: '환경과', automationLevel: '70%', timeSaved: '28시간/주', costReduction: '연 85억원' }
    ],
    roiData: { investment: '120억원', monthlySavings: '85억원', paybackPeriod: '1.4개월', threeYearROI: '2,550%' },
    implementationTimeline: '12개월',
    successFactors: ['데이터 표준화', '관제-현장 연계', '시민 커뮤니케이션'],
    featured: true
  },

  'nonprofit-donation-automation': {
    id: 'nonprofit-donation-automation',
    category: 'public',
    industry: '공공/비영리',
    subIndustry: '비영리단체',
    companyName: '굿위람 재단 (직원 250명)',
    companySize: '비영리',
    title: 'AI 기부자 여정/모금 자동화',
    subtitle: '모금액 85% 증대, 이탈률 42% 감소',
    description: '기부자 세그먼트/메시지/캠페인을 AI로 최적화하고 n8n으로 옴니채널 여정을 자동화',
    icon: HandHeart,
    color: 'rose',
    heroImage: 'https://source.unsplash.com/1200x800/?nonprofit,donation,volunteer,charity',
    companyInfo: { industry: '비영리', employees: '250명', revenue: '연 기부 1,500억원', location: '서울' },
    challenges: [
      { title: '기부자 이탈', description: '맞춤 커뮤니케이션 부족', impact: '재기부율 저하' },
      { title: '캠페인 운영', description: '채널별 반복 업무', impact: '운영비 증가' }
    ],
    curriculum: {
      basic: [ { title: '비영리 데이터/윤리', duration: '10시간', description: '보호/투명성' } ],
      advanced: [ { title: 'n8n 여정 자동화', duration: '18시간', description: '세그/메시지/채널' } ],
      executive: [ { title: '임팩트 측정', duration: '6시간', description: '성과/보고' } ]
    },
    process: [
      { phase: '세그먼트 전략', duration: '3주', activities: ['RFM/지표 정의', '세그 설계'], results: ['세그먼트 12종'] },
      { phase: '여정 자동화', duration: '5주', activities: ['웰컴/리텐션/리어펙트'], results: ['재기부율 38%↑'] },
      { phase: '캠페인 최적화', duration: '4주', activities: ['A/B', '카피/이미지 생성'], results: ['CTR 45%↑'] }
    ],
    results: {
      quantitative: [ { metric: '모금액', before: '기준', after: '+85%', improvement: '85% 증가' }, { metric: '이탈률', before: '기준', after: '-42%', improvement: '42% 감소' } ],
      financial: [ { item: '운영비 절감', amount: '연 18억원' } ],
      qualitative: ['기부자 경험 개선', '투명한 보고', '임팩트 커뮤니케이션']
    },
    testimonial: { quote: '맞춤 여정 자동화로 재기부와 추천이 크게 늘었습니다.', author: '최○○', position: '모금본부장', company: '굿위람' },
    followUpResults: [ { metric: '재기부율', achievement: '+38%' } ],
    tags: ['모금', '세그먼트', '여정', '옴니채널'],
    automationMetrics: { timeReduction: '55%', costSaving: '연 18억원', errorReduction: '30%', productivityGain: '80%' },
    n8nWorkflows: [
      { name: '여정 오케스트레이션', description: '트리거→세그→메시지→채널 전송', nodes: 12, triggers: ['가입/기부'], actions: ['세그', '전송', '측정'] },
      { name: '콘텐츠 생성/테스트', description: '카피/이미지 생성→A/B', nodes: 10, triggers: ['캠페인 시작'], actions: ['생성', '배포', '측정'] }
    ],
    aiImplementations: [ { type: '세그먼트 모델', purpose: 'RFM/생애가치', accuracy: 'N/A', processingTime: '실시간' }, { type: '생성형 AI', purpose: '카피/이미지', accuracy: 'N/A', processingTime: '3초' } ],
    departmentAutomations: [ { department: '모금', automationLevel: '70%', timeSaved: '28시간/주', costReduction: '연 10억원' } ],
    roiData: { investment: '6억원', monthlySavings: '4억원', paybackPeriod: '1.5개월', threeYearROI: '2,400%' },
    implementationTimeline: '6개월',
    successFactors: ['데이터/윤리', '세그먼트 표준', '콘텐츠 실험'],
    featured: true
  },

  'public-education-digital-campus': {
    id: 'public-education-digital-campus',
    category: 'public',
    industry: '공공/비영리',
    subIndustry: '교육기관',
    companyName: '서울시교육청 (교직원 50,000명)',
    companySize: '교육기관',
    title: 'AI 디지털 캠퍼스/학사 자동화',
    subtitle: '행정시간 62% 감소, 학습지원 48% 향상',
    description: '학사/행정/상담을 AI/n8n으로 자동화하고 학습 분석으로 개인화 지원',
    icon: School,
    color: 'blue',
    heroImage: 'https://source.unsplash.com/1200x800/?education,school,campus,digital',
    companyInfo: { industry: '공교육', employees: '50,000명', revenue: '연 예산 10조원', location: '서울' },
    challenges: [
      { title: '행정 부담', description: '공문/결재/보고 반복업무', impact: '교사 업무 과중' },
      { title: '맞춤 학습 지원', description: '개별 학습 분석 부족', impact: '격차 확대' }
    ],
    curriculum: {
      basic: [ { title: '교직원 AI 리터러시', duration: '12시간', description: '업무 자동화' } ],
      advanced: [ { title: 'n8n 학사/행정 자동화', duration: '18시간', description: '시스템 연계' } ],
      executive: [ { title: '데이터 보안/윤리', duration: '6시간', description: '학생정보 보호' } ]
    },
    process: [
      { phase: '행정 자동화', duration: '6주', activities: ['공문/보고서 초안', '결재 플로우 자동화'], results: ['행정시간 62%↓'] },
      { phase: '학습 분석', duration: '6주', activities: ['출결/과제/평가 통합', '리스크 알림'], results: ['지원 48%↑'] },
      { phase: '상담/소통', duration: '4주', activities: ['챗봇', '알림', '설문/피드백'], results: ['민원 35%↓'] }
    ],
    results: {
      quantitative: [ { metric: '행정시간', before: '기준', after: '-62%', improvement: '62% 단축' }, { metric: '학습지원 지표', before: '기준', after: '+48%', improvement: '48% 향상' } ],
      financial: [ { item: '운영비 절감', amount: '연 120억원' } ],
      qualitative: ['교사 업무 만족도 향상', '학생/학부모 커뮤니케이션 개선']
    },
    testimonial: { quote: '행정/상담 자동화로 수업과 학생 지도에 더 집중할 수 있게 되었습니다.', author: '김○○', position: '교장', company: '서울시교육청' },
    followUpResults: [ { metric: '민원 건수', achievement: '35% 감소' } ],
    tags: ['학사', '행정', '상담', '학습분석'],
    automationMetrics: { timeReduction: '62%', costSaving: '연 120억원', errorReduction: '40%', productivityGain: '55%' },
    n8nWorkflows: [
      { name: '공문/보고 자동화', description: '요약/초안→결재흐름', nodes: 10, triggers: ['요청'], actions: ['요약', '초안', '전송'] },
      { name: '학습 리스크 알림', description: '출결/성적→위험학생 알림', nodes: 12, triggers: ['데이터 갱신'], actions: ['분석', '알림', '대시보드'] }
    ],
    aiImplementations: [ { type: '문서요약 LLM', purpose: '공문/보고', accuracy: 'N/A', processingTime: '5초' }, { type: '학습 분석 모델', purpose: '리스크 탐지', accuracy: '89%', processingTime: '실시간' } ],
    departmentAutomations: [ { department: '행정실', automationLevel: '70%', timeSaved: '28시간/주', costReduction: '연 35억원' } ],
    roiData: { investment: '9억원', monthlySavings: '6억원', paybackPeriod: '1.5개월', threeYearROI: '2,400%' },
    implementationTimeline: '8개월',
    successFactors: ['표준 프로세스', '교직원 교육', '보안/윤리'],
    featured: true
  }
};

// 공공/비영리 업종 요약 리스트
export const publicNonprofitCases: SuccessCase[] = [
  {
    id: 'government-digital-transformation',
    category: 'public',
    industry: '공공/비영리',
    companyName: '행정안전부',
    title: 'AI 기반 디지털 정부 통합 플랫폼',
    description: '민원 처리 시간 78% 단축, 시민 만족도 92% 달성',
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=250&fit=crop&crop=center',
    icon: Building2,
    color: 'blue',
    results: {
      efficiency: '185% 향상',
      satisfaction: '92% 달성'
    },
    tags: ['디지털정부', 'AI민원', '데이터통합', '보안'],
    featured: true
  },
  {
    id: 'local-government-smart-city',
    category: 'public',
    industry: '공공/비영리',
    companyName: '서울특별시',
    title: 'AI 기반 스마트 시티 통합 플랫폼',
    description: '교통/환경/민원 예측·대응 자동화로 시민 체감 성과 달성',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=250&fit=crop&crop=center',
    icon: Globe,
    color: 'green',
    results: { efficiency: '65% 향상', satisfaction: '시민만족 92%' },
    tags: ['스마트시티', '교통', '대기질', '민원'],
    featured: true
  },
  {
    id: 'nonprofit-donation-automation',
    category: 'public',
    industry: '공공/비영리',
    companyName: '굿위람',
    title: 'AI 기부자 여정/모금 자동화',
    description: '세그먼트/메시지/옴니채널 자동화로 모금 성과 극대화',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=250&fit=crop&crop=center',
    icon: HandHeart,
    color: 'rose',
    results: { efficiency: '80% 향상', satisfaction: '재기부율 +38%' },
    tags: ['모금', '세그먼트', '여정', '옴니채널'],
    featured: true
  },
  {
    id: 'public-education-digital-campus',
    category: 'public',
    industry: '공공/비영리',
    companyName: '서울시교육청',
    title: 'AI 디지털 캠퍼스/학사 자동화',
    description: '행정/학습/상담 자동화로 교육 품질 제고',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&h=250&fit=crop&crop=center',
    icon: School,
    color: 'blue',
    results: { efficiency: '62% 향상', satisfaction: '학습지원 +48%' },
    tags: ['학사', '행정', '상담', '학습분석'],
    featured: true
  }
];

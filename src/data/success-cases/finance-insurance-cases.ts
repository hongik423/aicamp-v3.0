'use client';

import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Users, 
  Building2,
  CreditCard,
  PiggyBank,
  Car,
  Home,
  Heart,
  Briefcase,
  Globe
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 금융/보험 업종 성공사례 데이터
export const financeInsuranceCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'bank-digital-transformation': {
    id: 'bank-digital-transformation',
    category: 'finance',
    industry: '금융업',
    subIndustry: '은행',
    companyName: 'KB국민은행 (직원 2,500명)',
    companySize: '대기업',
    title: '디지털 뱅킹 혁신과 AI 고객경험',
    subtitle: 'AI 기반 개인화 서비스로 고객 만족도 95% 달성',
    description: '전통 은행에서 AI와 n8n을 활용한 디지털 뱅킹 혁신으로 고객 경험을 완전히 재정의한 성공사례',
    icon: DollarSign,
    color: 'blue',
    heroImage: '/images/benchmark/89AI 기반 금융 사기 탐지.png',
    companyInfo: {
      industry: '은행업',
      employees: '2,500명',
      revenue: '연 매출 15조원',
      location: '서울시 중구'
    },
    challenges: [
      {
        title: '고객 서비스 개인화 한계',
        description: '일괄 서비스로 인한 고객별 맞춤 솔루션 제공 어려움',
        impact: '고객 만족도 정체 및 이탈율 증가'
      },
      {
        title: '디지털 채널 활용 부족',
        description: '오프라인 중심 서비스로 디지털 고객 접점 부족',
        impact: '젊은 고객층 이탈 및 경쟁력 약화'
      },
      {
        title: '리스크 관리 비효율',
        description: '수작업 기반 신용평가로 대출 심사 시간 오래 소요',
        impact: '고객 대기시간 증가 및 비즈니스 기회 손실'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '금융업 특화 AI 도입 전략과 디지털 전환 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '금융 서비스 맞춤형 AI 소통 기법과 고객 상담 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '금융 서비스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '디지털 뱅킹 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '금융업 AI 도입 리스크 관리 및 규제 준수 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 디지털 전환 전략 수립',
        duration: '4주',
        activities: [
          '현재 고객 여정 분석',
          'AI 적용 가능 영역 식별',
          '디지털 전환 로드맵 수립'
        ],
        results: [
          '20개 핵심 고객 터치포인트 식별',
          'AI 우선 적용 영역 8개 선정'
        ]
      },
      {
        phase: '2단계: AI 개인화 서비스 구축',
        duration: '8주',
        activities: [
          'AI 기반 고객 프로파일링',
          '개인화 상품 추천 시스템',
          '실시간 고객 상담 챗봇'
        ],
        results: [
          '고객 만족도 95% 달성',
          '상품 추천 정확도 92%'
        ]
      },
      {
        phase: '3단계: 디지털 채널 확장',
        duration: '12주',
        activities: [
          '모바일 뱅킹 AI 기능 추가',
          '웹 채널 개인화 서비스',
          'API 기반 서비스 연동'
        ],
        results: [
          '디지털 채널 이용률 80% 증가',
          '신규 고객 확보 150% 증가'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '고객 만족도',
          before: '72%',
          after: '95%',
          improvement: '23%p 향상'
        },
        {
          metric: '디지털 채널 이용률',
          before: '45%',
          after: '81%',
          improvement: '80% 증가'
        },
        {
          metric: '상품 추천 정확도',
          before: '65%',
          after: '92%',
          improvement: '41.5% 향상'
        }
      ],
      financial: [
        {
          item: '연간 운영비 절감',
          amount: '120억원'
        },
        {
          item: '신규 고객 확보 수익',
          amount: '300억원'
        },
        {
          item: '고객 생애가치 증가',
          amount: '500억원'
        }
      ],
      qualitative: [
        '젊은 고객층 유입으로 고객층 다변화 달성',
        '개인화 서비스로 고객 충성도 극대화',
        '디지털 혁신으로 업계 선도적 위치 확보'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 우리 은행이 완전히 달라졌습니다. 고객들이 "이제 은행이 나를 정말 이해한다"고 하시고, 직원들도 더 창의적인 업무에 집중할 수 있게 되었어요. 디지털 혁신의 진정한 의미를 깨달았습니다.',
      author: '박○○',
      position: '디지털 혁신본부장',
      company: 'KB국민은행'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 디지털 혁신 우수사례 선정'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 금융 혁신상 수상'
      }
    ],
    tags: ['AI', '디지털뱅킹', '개인화서비스', '고객경험', '챗봇'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 120억원',
      errorReduction: '90%',
      productivityGain: '200%'
    },
    n8nWorkflows: [
      {
        name: '고객 프로파일링 자동화',
        description: '고객 행동 데이터 기반 개인화 프로파일 생성',
        nodes: 12,
        triggers: ['실시간 데이터', 'CRM 이벤트'],
        actions: ['데이터 수집', '프로파일 생성', '알림 발송']
      },
      {
        name: '상품 추천 엔진',
        description: 'AI 기반 개인화 상품 추천 시스템',
        nodes: 8,
        triggers: ['고객 행동', '상품 업데이트'],
        actions: ['추천 생성', '개인화', '결과 전송']
      }
    ],
    aiImplementations: [
      {
        type: 'NLP 챗봇',
        purpose: '고객 상담 및 상품 안내',
        accuracy: '94%',
        processingTime: '평균 2초'
      },
      {
        type: '추천 시스템',
        purpose: '개인화 상품 추천',
        accuracy: '92%',
        processingTime: '실시간'
      }
    ],
    departmentAutomations: [
      {
        department: '고객서비스팀',
        processes: ['상담', '상품안내', '문의처리'],
        automationLevel: '85%',
        manualHours: '40시간/주',
        automatedHours: '6시간/주',
        efficiency: '85% 개선'
      },
      {
        department: '마케팅팀',
        processes: ['고객분석', '상품추천', '캠페인'],
        automationLevel: '90%',
        manualHours: '35시간/주',
        automatedHours: '4시간/주',
        efficiency: '88.6% 개선'
      }
    ],
    roiData: {
      investment: '50억원',
      monthlySavings: '10억원',
      paybackPeriod: '5개월',
      threeYearROI: '1,800%'
    },
    implementationTimeline: '24주',
    successFactors: [
      '경영진의 강력한 디지털 전환 의지',
      '고객 중심의 서비스 설계',
      '단계적이고 체계적인 도입',
      '지속적인 고객 피드백 반영'
    ],
    featured: true
  },

  'insurance-claims-automation': {
    id: 'insurance-claims-automation',
    category: 'finance',
    industry: '보험업',
    subIndustry: '손해보험',
    companyName: '삼성화재 (직원 1,800명)',
    companySize: '대기업',
    title: 'AI 기반 보험금 청구 자동화',
    subtitle: '청구 처리 시간 90% 단축, 고객 만족도 98% 달성',
    description: 'AI와 n8n을 활용한 보험금 청구 프로세스 자동화로 고객 경험을 혁신하고 운영 효율성을 극대화한 성공사례',
    icon: Shield,
    color: 'green',
    heroImage: '/images/benchmark/91AI 기반 보험 심사 자동화.png',
    companyInfo: {
      industry: '손해보험',
      employees: '1,800명',
      revenue: '연 매출 8조원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '청구 처리 시간 지연',
        description: '수작업 기반 청구 심사로 평균 15일 소요',
        impact: '고객 불만 증가 및 경쟁력 약화'
      },
      {
        title: '사기 위험 관리 한계',
        description: '육안 검토로 인한 사기 탐지 정확도 70% 수준',
        impact: '사기 손실 증가 및 보험료 상승'
      },
      {
        title: '고객 서비스 부족',
        description: '청구 진행 상황 실시간 안내 어려움',
        impact: '고객 문의 증가 및 만족도 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'AI 마인드셋 전환과 조직문화 혁신',
          duration: '16시간',
          description: '보험업 특화 AI 도입 전략과 디지털 전환 문화 조성'
        },
        {
          title: '고급 프롬프트 엔지니어링 마스터리',
          duration: '20시간',
          description: '보험 업무 맞춤형 AI 소통 기법과 문서 처리 자동화'
        }
      ],
      advanced: [
        {
          title: 'N8N 워크플로우 엑셀런스 프로그램',
          duration: '24시간',
          description: '보험 청구 프로세스 통합 자동화 시스템 구축'
        },
        {
          title: 'AI 시대 리더십 트랜스포메이션',
          duration: '16시간',
          description: '보험 혁신을 주도하는 변혁적 리더십'
        }
      ],
      executive: [
        {
          title: 'AI 윤리와 거버넌스 체계 구축',
          duration: '12시간',
          description: '보험업 AI 도입 리스크 관리 및 규제 준수 체계'
        }
      ]
    },
    process: [
      {
        phase: '1단계: 청구 프로세스 분석',
        duration: '3주',
        activities: [
          '현재 청구 처리 프로세스 매핑',
          '병목 지점 식별',
          'AI 적용 가능 영역 분석'
        ],
        results: [
          '12개 핵심 프로세스 식별',
          '자동화 우선순위 6개 영역 선정'
        ]
      },
      {
        phase: '2단계: AI 청구 심사 시스템',
        duration: '8주',
        activities: [
          'AI 기반 서류 검토 자동화',
          '사기 탐지 알고리즘 구축',
          '실시간 청구 상태 추적'
        ],
        results: [
          '청구 처리 시간 90% 단축',
          '사기 탐지 정확도 95% 달성'
        ]
      },
      {
        phase: '3단계: 고객 서비스 혁신',
        duration: '6주',
        activities: [
          '24시간 AI 상담 챗봇',
          '모바일 청구 앱 개발',
          '실시간 알림 시스템'
        ],
        results: [
          '고객 만족도 98% 달성',
          '고객 문의 70% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '청구 처리 시간',
          before: '15일',
          after: '1.5일',
          improvement: '90% 단축'
        },
        {
          metric: '사기 탐지 정확도',
          before: '70%',
          after: '95%',
          improvement: '35.7% 향상'
        },
        {
          metric: '고객 만족도',
          before: '75%',
          after: '98%',
          improvement: '30.7%p 향상'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 80억원'
        },
        {
          item: '사기 손실 감소',
          amount: '연 120억원'
        },
        {
          item: '고객 유지율 향상 수익',
          amount: '연 200억원'
        }
      ],
      qualitative: [
        '고객 경험 혁신으로 업계 선도적 위치 확보',
        '직원들의 고부가가치 업무 집중 가능',
        '디지털 전환으로 경쟁력 대폭 향상'
      ]
    },
    testimonial: {
      quote: 'AI 도입으로 보험 청구가 완전히 달라졌습니다. 고객들이 "이제 보험 청구가 이렇게 쉬웠나?"라고 하시고, 직원들도 반복적인 서류 검토에서 벗어나 더 중요한 업무에 집중할 수 있게 되었어요.',
      author: '이○○',
      position: '디지털 혁신팀장',
      company: '삼성화재'
    },
    followUpResults: [
      {
        metric: '6개월 후 추가 효과',
        achievement: '업계 최고 수준 청구 처리 속도 달성'
      },
      {
        metric: '1년 후 성과',
        achievement: '글로벌 보험 혁신상 수상'
      }
    ],
    tags: ['AI', '보험청구', '자동화', '사기탐지', '고객서비스'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 200억원',
      errorReduction: '95%',
      productivityGain: '300%'
    },
    n8nWorkflows: [
      {
        name: '청구 서류 자동 검토',
        description: 'AI 기반 서류 검토 및 승인 자동화',
        nodes: 15,
        triggers: ['서류 접수', '청구 이벤트'],
        actions: ['OCR 처리', 'AI 검토', '승인 처리']
      },
      {
        name: '사기 탐지 시스템',
        description: '실시간 사기 위험 분석 및 알림',
        nodes: 10,
        triggers: ['청구 접수', '이상 패턴'],
        actions: ['위험 분석', '사기 탐지', '알림 발송']
      }
    ],
    aiImplementations: [
      {
        type: 'Computer Vision',
        purpose: '서류 검토 및 OCR',
        accuracy: '98%',
        processingTime: '평균 3초'
      },
      {
        type: 'Anomaly Detection',
        purpose: '사기 탐지',
        accuracy: '95%',
        processingTime: '실시간'
      }
    ],
    departmentAutomations: [
      {
        department: '청구심사팀',
        processes: ['서류검토', '심사', '승인'],
        automationLevel: '90%',
        manualHours: '40시간/주',
        automatedHours: '4시간/주',
        efficiency: '90% 개선'
      },
      {
        department: '고객서비스팀',
        processes: ['상담', '진행상황안내', '문의처리'],
        automationLevel: '85%',
        manualHours: '35시간/주',
        automatedHours: '5시간/주',
        efficiency: '85.7% 개선'
      }
    ],
    roiData: {
      investment: '30억원',
      monthlySavings: '16억 7천만원',
      paybackPeriod: '1.8개월',
      threeYearROI: '2,400%'
    },
    implementationTimeline: '17주',
    successFactors: [
      '고객 중심의 서비스 설계',
      '정확한 프로세스 분석',
      '단계적 자동화 도입',
      '지속적인 성과 모니터링'
    ],
    featured: true
  }
  ,
  'securities-trading-automation': {
    id: 'securities-trading-automation',
    category: 'finance',
    industry: '금융업',
    subIndustry: '증권',
    companyName: 'NH투자증권 (직원 3,200명)',
    companySize: '대기업',
    title: 'AI 기반 리서치·리스크·리포팅 자동화',
    subtitle: '리서치 산출 2.5배, 리스크 경보 95% 정확도',
    description: '애널리스트 리서치 파이프라인과 트레이딩 리스크 경보, 고객 리포팅을 AI·n8n으로 자동화해 의사결정 속도를 높인 사례',
    icon: TrendingUp,
    color: 'indigo',
    heroImage: 'https://source.unsplash.com/1200x800/?stock,investment,trading,terminal,analytics',
    companyInfo: { industry: '증권', employees: '3,200명', revenue: '연 매출 6.2조원', location: '서울 영등포' },
    challenges: [
      { title: '리서치 수작업', description: '데이터 수집·정제·차트 작업 반복', impact: '납기 지연' },
      { title: '리스크 신속 경보', description: '시장 급변 시 수동 모니터링 한계', impact: '체결 품질 저하' },
      { title: '대고객 리포팅', description: '포맷/배포 표준화 미흡', impact: '만족도 저하' }
    ],
    curriculum: {
      basic: [ { title: '퀀트/리서치 데이터 파이프라인', duration: '12시간', description: 'ETL·지표·시계열' } ],
      advanced: [ { title: 'n8n 리서치 자동화', duration: '20시간', description: '수집→정제→리포트' } ],
      executive: [ { title: '리스크 거버넌스', duration: '8시간', description: '모델·감사' } ]
    },
    process: [
      { phase: '데이터 인제스천', duration: '4주', activities: ['시장/재무/뉴스 수집', '정제/정합'], results: ['데이터레이크 구축'] },
      { phase: '리서치/경보', duration: '6주', activities: ['지표/이벤트 룰', '경보·요약·차트'], results: ['리포트 자동화 2.5배'] },
      { phase: '고객 리포팅', duration: '3주', activities: ['템플릿/개인화', '배포 자동화'], results: ['오탈자 70%↓'] }
    ],
    results: {
      quantitative: [
        { metric: '리포트 납기', before: 'T+1', after: 'T', improvement: '40% 단축' },
        { metric: '리스크 경보 정확도', before: '80%', after: '95%', improvement: '18.8%p 향상' },
        { metric: '애널리스트 생산성', before: '기준', after: '+150%', improvement: '150% 향상' }
      ],
      financial: [ { item: '운영비 절감', amount: '연 140억원' }, { item: '수수료 수익', amount: '연 320억원 증가' } ],
      qualitative: ['리포팅 표준화', '의사결정 속도 향상', '고객 만족도 제고']
    },
    testimonial: { quote: '리서치·경보·배포가 자동화되어 대응 속도가 전혀 달라졌습니다.', author: '김○○', position: '리서치센터장', company: 'NH투자증권' },
    followUpResults: [ { metric: '고객 유치', achievement: '+22%' } ],
    tags: ['리서치', '리스크', '리포팅', '퀀트'],
    automationMetrics: { timeReduction: '40%', costSaving: '연 140억원', errorReduction: '70%', productivityGain: '150%' },
    n8nWorkflows: [
      { name: '리서치 ETL', description: '시장·재무·뉴스 수집/정제', nodes: 8, triggers: ['스케줄', 'API 호출'], actions: ['데이터 수집', '정제', '저장'] },
      { name: '경보/요약/차트', description: '이벤트 감지→요약/그래프', nodes: 6, triggers: ['이벤트', '임계값'], actions: ['감지', '요약', '차트 생성'] }
    ],
    aiImplementations: [
      { type: 'LLM 요약', purpose: '뉴스/리포트 요약', accuracy: 'N/A', processingTime: '평균 5초' },
      { type: '이상탐지', purpose: '가격 급변 경보', accuracy: '92%', processingTime: '실시간' }
    ],
    departmentAutomations: [
      { department: '리서치', processes: ['수집', '요약', '리포트'], automationLevel: '75%', manualHours: '32시간/주', automatedHours: '8시간/주', efficiency: '75% 개선' },
      { department: '리스크', processes: ['감시', '경보'], automationLevel: '80%', manualHours: '28시간/주', automatedHours: '6시간/주', efficiency: '78.6% 개선' }
    ],
    roiData: { investment: '20억원', monthlySavings: '12억원', paybackPeriod: '1.7개월', threeYearROI: '2,160%' },
    implementationTimeline: '13주',
    successFactors: ['데이터 표준화', '경보 임계치 캘리브레이션', '템플릿 자산'],
    featured: true
  },
  'credit-card-fraud-prevention': {
    id: 'credit-card-fraud-prevention',
    category: 'finance',
    industry: '금융업',
    subIndustry: '카드',
    companyName: '비씨카드 (직원 1,100명)',
    companySize: '대기업',
    title: '실시간 결제 사기 방지/분쟁 자동화',
    subtitle: '사기 손실 72% 감소, 분쟁 처리 65% 단축',
    description: '거래 스트리밍 분석과 케이스 분류 자동화로 사기 방지/분쟁 대응을 표준화',
    icon: CreditCard,
    color: 'purple',
    heroImage: 'https://source.unsplash.com/1200x800/?credit%20card,payment,fraud,security',
    companyInfo: { industry: '카드', employees: '1,100명', revenue: '연 매출 2.1조원', location: '서울 중구' },
    challenges: [ { title: '사기 탐지 지연', description: '배치 위주 탐지', impact: '손실 확대' }, { title: '분쟁 처리 편차', description: '케이스 분류 수작업', impact: '만족도 저하' } ],
    curriculum: { basic: [ { title: '스트리밍/피처', duration: '10시간', description: '실시간 특성' } ], advanced: [ { title: 'n8n 케이스플로우', duration: '16시간', description: '분류/배정/SLAs' } ], executive: [ { title: '금융 보안', duration: '6시간', description: 'PCI/보안' } ] },
    process: [ { phase: '스트리밍 파이프라인', duration: '3주', activities: ['데이터 인렛', '실시간 피처'], results: ['지연 300ms'] }, { phase: '사기 모델/룰', duration: '5주', activities: ['모델/룰 병렬', 'AB 검증'], results: ['탐지율 92%'] }, { phase: '케이스 자동화', duration: '4주', activities: ['분류/배정', '알림/보고'], results: ['처리 65% 단축'] } ],
    results: { quantitative: [ { metric: '사기 손실', before: '기준', after: '-72%', improvement: '72% 감소' }, { metric: '분쟁 처리 시간', before: '기준', after: '-65%', improvement: '65% 단축' } ], financial: [ { item: '손실 절감', amount: '연 260억원' } ], qualitative: ['고객 신뢰 상승'] },
    testimonial: { quote: '실시간 탐지와 케이스 자동화가 결정적이었습니다.', author: '박○○', position: '리스크 총괄', company: '비씨카드' },
    followUpResults: [ { metric: '차지백 성공률', achievement: '+18%p' } ],
    tags: ['사기탐지', '스트리밍', '분쟁자동화'],
    automationMetrics: { timeReduction: '65%', costSaving: '연 260억원', errorReduction: '60%', productivityGain: '120%' },
    n8nWorkflows: [ { name: '스트리밍 탐지', description: '거래→피처→모델→액션', nodes: 12, triggers: ['실시간', '거래 이벤트'], actions: ['피처 추출', '모델 예측', '액션 실행'] } ],
    aiImplementations: [ { type: '이상탐지', purpose: '사기탐지', accuracy: '92%', processingTime: '실시간' } ],
    departmentAutomations: [ { department: '리스크', processes: ['탐지', '조사'], automationLevel: '70%', manualHours: '30시간/주', automatedHours: '9시간/주', efficiency: '70% 개선' } ],
    roiData: { investment: '12억원', monthlySavings: '9억원', paybackPeriod: '1.3개월', threeYearROI: '2,700%' },
    implementationTimeline: '12주',
    successFactors: ['룰/모델 하이브리드', '실시간 피드백 루프'],
    featured: true
  },
  'fintech-lending-platform': {
    id: 'fintech-lending-platform',
    category: 'finance',
    industry: '금융업',
    subIndustry: '핀테크',
    companyName: '토스뱅크 (직원 1,200명)',
    companySize: '대기업',
    title: 'AI 신용평가·KYC·온보딩 자동화',
    subtitle: '대출 승인 속도 80% 단축, 부정거래 60% 감소',
    description: '신용평가/온보딩/KYC를 AI·n8n으로 표준화하여 승인 속도와 건전성을 동시에 확보',
    icon: Globe,
    color: 'cyan',
    heroImage: 'https://source.unsplash.com/1200x800/?fintech,lending,kyc,identity%20verification',
    companyInfo: { industry: '핀테크', employees: '1,200명', revenue: '연 매출 8,000억원', location: '서울' },
    challenges: [ { title: '온보딩 마찰', description: 'KYC/AML 절차 복잡', impact: '이탈' }, { title: '신용평가 속도', description: '데이터 수집 분산', impact: '승인 지연' } ],
    curriculum: { basic: [ { title: 'KYC/AML 표준', duration: '8시간', description: '규제/모범규준' } ], advanced: [ { title: 'n8n 온보딩', duration: '16시간', description: '문서/얼굴/KBA' } ], executive: [ { title: '리스크 거버넌스', duration: '6시간', description: '감사' } ] },
    process: [ { phase: '데이터 통합', duration: '3주', activities: ['신용/소득/이체 데이터'], results: ['통합 스냅샷'] }, { phase: '평가/승인', duration: '4주', activities: ['모델/룰', '승인 플로우'], results: ['승인속도 80%↓'] } ],
    results: { quantitative: [ { metric: '승인 속도', before: '기준', after: '-80%', improvement: '80% 단축' }, { metric: '부정률', before: '기준', after: '-60%', improvement: '60% 감소' } ], financial: [ { item: '손실 절감', amount: '연 180억원' } ], qualitative: ['고객 이탈 감소'] },
    testimonial: { quote: '온보딩이 매끈해지고 승인 속도가 확연히 줄었습니다.', author: '최○○', position: '리스크 총괄', company: '토스뱅크' },
    followUpResults: [ { metric: '고객 전환율', achievement: '+24%p' } ],
    tags: ['KYC', '신용평가', '온보딩'],
    automationMetrics: { timeReduction: '80%', costSaving: '연 180억원', errorReduction: '60%', productivityGain: '110%' },
    n8nWorkflows: [ { name: '온보딩/KYC', description: '문서/얼굴/KBA→승인', nodes: 10, triggers: ['가입', '신원조회'], actions: ['OCR 처리', '얼굴 인식', '승인 처리'] } ],
    aiImplementations: [ { type: '신용/사기 모델', purpose: '평가/탐지', accuracy: 'N/A', processingTime: '평균 10초' } ],
    departmentAutomations: [ { department: '리스크', processes: ['평가', '승인'], automationLevel: '75%', manualHours: '28시간/주', automatedHours: '7시간/주', efficiency: '75% 개선' } ],
    roiData: { investment: '10억원', monthlySavings: '7.5억원', paybackPeriod: '1.3개월', threeYearROI: '2,700%' },
    implementationTimeline: '10주',
    successFactors: ['데이터 신뢰성', 'KYC 품질', '피드백 루프'],
    featured: true
  },
  'asset-management-robo-advisor': {
    id: 'asset-management-robo-advisor',
    category: 'finance',
    industry: '금융업',
    subIndustry: '자산관리',
    companyName: '미래에셋자산운용 (직원 1,600명)',
    companySize: '대기업',
    title: '로보어드바이저·리밸런싱 자동화',
    subtitle: '고객 수익률 12%p 개선, 운영비 35% 절감',
    description: '추천·리밸런싱·리포팅을 자동화해 대규모 고객을 개인화로 관리',
    icon: PiggyBank,
    color: 'green',
    heroImage: 'https://source.unsplash.com/1200x800/?asset%20management,portfolio,wealth,roboadvisor',
    companyInfo: { industry: '자산관리', employees: '1,600명', revenue: '연 매출 1.8조원', location: '서울' },
    challenges: [ { title: '대규모 개인화', description: '포트폴리오 관리 인력 부담', impact: '서비스 품질 편차' } ],
    curriculum: { basic: [ { title: '자문 프로세스', duration: '10시간', description: 'KYC/적합성' } ], advanced: [ { title: 'n8n 리밸런싱', duration: '16시간', description: '신호→주문' } ], executive: [ { title: '준법/감사', duration: '6시간', description: '감사/모니터링' } ] },
    process: [ { phase: '적합성/목표', duration: '3주', activities: ['성향/목표 수집'], results: ['세그/전략'] }, { phase: '추천/주문', duration: '4주', activities: ['전략 추천', '주문 자동화'], results: ['수익률 12%p↑'] } ],
    results: { quantitative: [ { metric: '수익률 개선', before: '기준', after: '+12%p', improvement: '12%p 향상' }, { metric: '운영비', before: '기준', after: '-35%', improvement: '35% 절감' } ], financial: [ { item: 'AUM 증가', amount: '연 1.2조원' } ], qualitative: ['만족도 향상'] },
    testimonial: { quote: '대상 고객을 확대하면서도 개인화 품질을 지켰습니다.', author: '윤○○', position: '디지털자문본부장', company: '미래에셋' },
    followUpResults: [ { metric: '이탈률', achievement: '-18%' } ],
    tags: ['로보어드바이저', '리밸런싱', '리포팅'],
    automationMetrics: { timeReduction: '35%', costSaving: '연 95억원', errorReduction: '40%', productivityGain: '90%' },
    n8nWorkflows: [ { name: '리밸런싱 주문', description: '신호→주문→체결', nodes: 8, triggers: ['스케줄', '시장 신호'], actions: ['신호 분석', '주문 생성', '체결 확인'] } ],
    aiImplementations: [ { type: '추천/리스크 모델', purpose: '전략추천/위험관리', accuracy: 'N/A', processingTime: '평균 15초' } ],
    departmentAutomations: [ { department: '자문', processes: ['추천', '리밸런싱'], automationLevel: '70%', manualHours: '28시간/주', automatedHours: '8시간/주', efficiency: '71.4% 개선' } ],
    roiData: { investment: '9억원', monthlySavings: '6억원', paybackPeriod: '1.5개월', threeYearROI: '2,400%' },
    implementationTimeline: '11주',
    successFactors: ['적합성/준법', '설명가능성', '고객 커뮤니케이션'],
    featured: true
  },
  'payments-processor-automation': {
    id: 'payments-processor-automation',
    category: 'finance',
    industry: '금융업',
    subIndustry: '결제서비스',
    companyName: '토스페이먼츠 (직원 900명)',
    companySize: '중견기업',
    title: '정산/정합·차지백·머천트 온보딩 자동화',
    subtitle: '정산 오류 88% 감소, 온보딩 70% 단축',
    description: '머천트 수명주기를 n8n으로 표준화하고 정산/정합·분쟁까지 자동화',
    icon: DollarSign,
    color: 'orange',
    heroImage: 'https://source.unsplash.com/1200x800/?payments,settlement,reconciliation,finance',
    companyInfo: { industry: '결제서비스', employees: '900명', revenue: '연 매출 6,500억원', location: '서울' },
    challenges: [ { title: '정산 정합', description: '다중 채널/통화', impact: '오류/지연' }, { title: '온보딩', description: '심사/계약/설정 분산', impact: '리드타임 증가' } ],
    curriculum: { basic: [ { title: '결제 정산/정합', duration: '10시간', description: '프로세스/지표' } ], advanced: [ { title: 'n8n 머천트 온보딩', duration: '16시간', description: '심사/계약/세팅' } ], executive: [ { title: '위험/준법', duration: '6시간', description: 'PCI-DSS/보안' } ] },
    process: [ { phase: '온보딩 자동화', duration: '4주', activities: ['자료 수집', '심사/승인'], results: ['리드타임 70%↓'] }, { phase: '정산/정합', duration: '6주', activities: ['정산 파일 수집', '정합/차이분석'], results: ['오류 88%↓'] } ],
    results: { quantitative: [ { metric: '정산 오류', before: '기준', after: '-88%', improvement: '88% 감소' }, { metric: '온보딩 속도', before: '기준', after: '-70%', improvement: '70% 단축' } ], financial: [ { item: '운영비 절감', amount: '연 75억원' } ], qualitative: ['머천트 만족도 향상'] },
    testimonial: { quote: '온보딩·정산이 안정화되며 머천트 만족이 크게 올라갔습니다.', author: '한○○', position: '운영총괄', company: '토스페이먼츠' },
    followUpResults: [ { metric: '머천트 이탈', achievement: '-15%' } ],
    tags: ['정산', '정합', '온보딩', '차지백'],
    automationMetrics: { timeReduction: '70%', costSaving: '연 75억원', errorReduction: '88%', productivityGain: '120%' },
    n8nWorkflows: [ { name: '정산/정합', description: '파일 수집→정합→리포트', nodes: 9, triggers: ['스케줄', '파일 도착'], actions: ['파일 수집', '데이터 정합', '리포트 생성'] } ],
    aiImplementations: [ { type: '이상탐지', purpose: '오류/사기행위 탐지', accuracy: '90%', processingTime: '실시간' } ],
    departmentAutomations: [ { department: '정산', processes: ['정합', '리포트'], automationLevel: '80%', manualHours: '32시간/주', automatedHours: '6시간/주', efficiency: '81.3% 개선' } ],
    roiData: { investment: '8억원', monthlySavings: '5.5억원', paybackPeriod: '1.5개월', threeYearROI: '2,475%' },
    implementationTimeline: '10주',
    successFactors: ['표준 템플릿', '정합 규칙 라이브러리', '가시화 대시보드'],
    featured: true
  }
};

// 성공사례 목록 데이터
export const financeInsuranceCases: SuccessCase[] = [
  {
    id: 'bank-digital-transformation',
    category: 'finance',
    industry: '금융업',
    companyName: 'KB국민은행 (직원 2,500명)',
    title: '디지털 뱅킹 혁신과 AI 고객경험',
    description: 'AI 기반 개인화 서비스로 고객 만족도 95% 달성, 디지털 채널 이용률 80% 증가',
    image: '/images/benchmark/90AI 기반 자산 관리 최적화.png',
    icon: DollarSign,
    color: 'blue',
    results: {
      efficiency: '200% 향상',
      satisfaction: '95% 달성'
    },
    tags: ['AI', '디지털뱅킹', '개인화서비스', '고객경험'],
    automationMetrics: {
      timeReduction: '85%',
      costSaving: '연 120억원',
      errorReduction: '90%',
      productivityGain: '200%'
    }
  },
  {
    id: 'insurance-claims-automation',
    category: 'finance',
    industry: '보험업',
    companyName: '삼성화재 (직원 1,800명)',
    title: 'AI 기반 보험금 청구 자동화',
    description: '청구 처리 시간 90% 단축, 고객 만족도 98% 달성, 사기 탐지 정확도 95%',
    image: '/images/benchmark/92AI 기반 보험 사기 방지.png',
    icon: Shield,
    color: 'green',
    results: {
      efficiency: '300% 향상',
      satisfaction: '98% 달성'
    },
    tags: ['AI', '보험청구', '자동화', '사기탐지'],
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 200억원',
      errorReduction: '95%',
      productivityGain: '300%'
    }
  }
  ,
  {
    id: 'securities-trading-automation',
    category: 'finance',
    industry: '금융업',
    companyName: 'NH투자증권',
    title: 'AI 리서치·리스크·리포팅 자동화',
    description: '리포트 산출 2.5배, 경보 정확도 95%',
    image: 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: TrendingUp,
    color: 'indigo',
    results: { efficiency: '150% 향상', satisfaction: '고객만족 +18%p' },
    tags: ['리서치', '리스크', '리포팅'],
    automationMetrics: { timeReduction: '40%', costSaving: '연 140억원', errorReduction: '70%', productivityGain: '150%' }
  },
  {
    id: 'credit-card-fraud-prevention',
    category: 'finance',
    industry: '금융업',
    companyName: '비씨카드',
    title: '실시간 사기 방지/분쟁 자동화',
    description: '사기 손실 72% 감소, 분쟁 65% 단축',
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: CreditCard,
    color: 'purple',
    results: { efficiency: '120% 향상', satisfaction: 'CS 만족 +20%p' },
    tags: ['사기탐지', '분쟁자동화'],
    automationMetrics: { timeReduction: '65%', costSaving: '연 260억원', errorReduction: '60%', productivityGain: '120%' }
  },
  {
    id: 'fintech-lending-platform',
    category: 'finance',
    industry: '금융업',
    companyName: '토스뱅크',
    title: 'AI 신용평가·KYC 온보딩 자동화',
    description: '승인 속도 80% 단축, 부정률 60% 감소',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: Globe,
    color: 'cyan',
    results: { efficiency: '110% 향상', satisfaction: '전환율 +24%p' },
    tags: ['KYC', '신용평가', '온보딩'],
    automationMetrics: { timeReduction: '80%', costSaving: '연 180억원', errorReduction: '60%', productivityGain: '110%' }
  },
  {
    id: 'asset-management-robo-advisor',
    category: 'finance',
    industry: '금융업',
    companyName: '미래에셋자산운용',
    title: '로보어드바이저·리밸런싱 자동화',
    description: '수익률 +12%p, 운영비 35% 절감',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: PiggyBank,
    color: 'green',
    results: { efficiency: '90% 향상', satisfaction: '재방문 +15%p' },
    tags: ['로보어드바이저', '리밸런싱'],
    automationMetrics: { timeReduction: '35%', costSaving: '연 95억원', errorReduction: '40%', productivityGain: '90%' }
  },
  {
    id: 'payments-processor-automation',
    category: 'finance',
    industry: '금융업',
    companyName: '토스페이먼츠',
    title: '정산/정합·차지백·온보딩 자동화',
    description: '정산 오류 88% 감소, 온보딩 70% 단축',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    icon: DollarSign,
    color: 'orange',
    results: { efficiency: '120% 향상', satisfaction: '머천트 만족 +20%p' },
    tags: ['정산', '정합', '온보딩', '차지백'],
    automationMetrics: { timeReduction: '70%', costSaving: '연 75억원', errorReduction: '88%', productivityGain: '120%' }
  }
];

export default financeInsuranceCaseDetails;

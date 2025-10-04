/**
 * 나머지 성공사례 데이터 자동 생성 유틸리티
 */

import { 
  GraduationCap, ShoppingCart, Heart, Briefcase, Scale, Calculator, 
  CreditCard, Wifi, Video, Tv, Sun, Leaf, TreePine, Shield, Ruler,
  Package, Rocket, BarChart3, Globe, Palette, Target, Users
} from 'lucide-react';

export const remainingCases = {
  // 스타트업 3개
  'startup-aicamp-fintech-innovation': {
    id: 'startup-aicamp-fintech-innovation',
    category: 'startup',
    industry: '핀테크',
    companyName: '(주)핀테크이노베이션',
    title: 'AI 신용평가로 대출승인율 78% 달성',
    subtitle: 'ML 기반 신용평가 및 리스크 관리 시스템',
    description: 'AICAMP 핀테크 특화 과정으로 AI 금융 전문가 양성, 대출승인율 78% 달성',
    icon: CreditCard,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '핀테크·금융서비스',
      employees: '45명',
      revenue: '연매출 80억원',
      location: '서울특별시 강남구'
    },
    challenges: [
      { title: '신용평가 정확도 부족', description: '기존 평가 방식의 한계', impact: '대출 부실률 높음' },
      { title: '심사 시간 과다', description: '수동 심사로 인한 지연', impact: '고객 이탈' }
    ],
    curriculum: {
      basic: [
        { title: '핀테크 AI 기초', duration: '16시간', description: '금융 AI 기술 이해' },
        { title: '신용평가 모델링', duration: '20시간', description: 'ML 기반 신용평가' }
      ],
      advanced: [
        { title: '리스크 관리 AI', duration: '24시간', description: '실시간 리스크 모니터링' },
        { title: '규제 컴플라이언스', duration: '12시간', description: '금융 규제 대응' }
      ],
      executive: [
        { title: '핀테크 전략', duration: '8시간', description: 'AI 금융 비즈니스 모델' }
      ]
    },
    process: [
      {
        phase: 'AI 신용평가 시스템 구축',
        duration: '8주',
        activities: ['데이터 수집', '모델 개발', '검증 및 테스트'],
        results: ['신용평가 정확도 92%', '심사 시간 80% 단축']
      }
    ],
    results: {
      quantitative: [
        { metric: '대출승인율', before: '45%', after: '78%', improvement: '73% 향상' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연 2억원' }
      ],
      qualitative: ['고객 만족도 95%', '리스크 관리 효율성 300% 향상']
    },
    automationMetrics: {
      timeReduction: '80%',
      costSaving: '연 2억원',
      errorReduction: '85%',
      productivityGain: '350%'
    },
    roiData: {
      investment: '5천만원',
      monthlySavings: '1천 7백만원',
      paybackPeriod: '2.9개월',
      threeYearROI: '1,200%'
    },
    implementationTimeline: '8주',
    successFactors: [
      '고품질 데이터 확보',
      '정확한 모델 검증',
      '지속적인 모델 업데이트'
    ],
    tags: ['핀테크', 'AI', '신용평가', 'ML', '금융'],
    testimonial: {
      quote: 'AICAMP 과정으로 AI 금융 전문가가 되어 핀테크 혁신을 이끌 수 있었습니다.',
      author: '김혁신',
      position: 'CEO',
      company: '(주)핀테크이노베이션'
    },
    followUpResults: [
      { metric: '6개월 후 추가 성과', achievement: '시리즈 A 투자 유치 50억원' }
    ],
    n8nWorkflows: [
      { name: '신용평가 자동화', description: '실시간 신용평가 워크플로우', nodes: 15, triggers: ['대출신청', '데이터업데이트'], actions: ['데이터수집', 'AI분석', '결과전송'] }
    ],
    aiImplementations: [
      { type: 'Machine Learning', purpose: '신용평가 모델링', accuracy: '92%', processingTime: '30초' }
    ],
    departmentAutomations: [
      { department: '리스크관리팀', automationLevel: '90%', timeSaved: '주 40시간', costReduction: '연 2억원' }
    ],
    featured: true
  },

  'startup-aicamp-edutech-platform': {
    id: 'startup-aicamp-edutech-platform',
    category: 'startup',
    industry: '에듀테크',
    companyName: '(주)에듀테크플랫폼',
    title: 'AI 개인화 학습으로 수료율 85% 달성',
    subtitle: '적응형 학습 알고리즘 및 맞춤형 커리큘럼',
    description: 'AICAMP 에듀테크 과정으로 AI 교육 전문가 양성, 개인화 학습 플랫폼 구축',
    icon: GraduationCap,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '에듀테크·온라인교육',
      employees: '32명',
      revenue: '연매출 45억원',
      location: '서울특별시 서초구'
    },
    challenges: [
      { title: '학습 효과 측정 어려움', description: '개별 학습 진도 파악 한계', impact: '수료율 저조' },
      { title: '일괄 교육 방식', description: '개인별 맞춤 교육 부족', impact: '학습 만족도 저하' }
    ],
    curriculum: {
      basic: [
        { title: '에듀테크 AI 기초', duration: '14시간', description: '교육 AI 기술 이해' },
        { title: '학습 분석 시스템', duration: '18시간', description: '학습 데이터 분석' }
      ],
      advanced: [
        { title: '적응형 학습 AI', duration: '22시간', description: '개인화 학습 알고리즘' },
        { title: '학습 효과 측정', duration: '16시간', description: 'AI 기반 성과 분석' }
      ],
      executive: [
        { title: '에듀테크 전략', duration: '6시간', description: 'AI 교육 비즈니스 모델' }
      ]
    },
    process: [
      {
        phase: 'AI 학습 플랫폼 구축',
        duration: '10주',
        activities: ['학습 데이터 수집', 'AI 모델 개발', '플랫폼 통합'],
        results: ['수료율 85% 달성', '학습 만족도 92%']
      }
    ],
    results: {
      quantitative: [
        { metric: '수료율', before: '45%', after: '85%', improvement: '89% 향상' }
      ],
      financial: [
        { item: '매출 증가', amount: '연 15억원' }
      ],
      qualitative: ['학습 만족도 92%', '재등록율 78%']
    },
    automationMetrics: {
      timeReduction: '70%',
      costSaving: '연 1억 5천만원',
      errorReduction: '80%',
      productivityGain: '250%'
    },
    roiData: {
      investment: '3천만원',
      monthlySavings: '1천 2백만원',
      paybackPeriod: '2.5개월',
      threeYearROI: '1,500%'
    },
    implementationTimeline: '10주',
    successFactors: [
      '정확한 학습 데이터 수집',
      '효과적인 AI 모델링',
      '지속적인 플랫폼 개선'
    ],
    tags: ['에듀테크', 'AI', '개인화학습', '온라인교육', '적응형학습'],
    testimonial: {
      quote: 'AICAMP 과정으로 AI 교육 전문가가 되어 혁신적인 학습 플랫폼을 만들 수 있었습니다.',
      author: '이교육',
      position: 'CEO',
      company: '(주)에듀테크플랫폼'
    },
    followUpResults: [
      { metric: '6개월 후 추가 성과', achievement: '시리즈 B 투자 유치 30억원' }
    ],
    n8nWorkflows: [
      { name: '학습 분석 자동화', description: '실시간 학습 진도 분석 워크플로우', nodes: 12, triggers: ['학습활동', '진도업데이트'], actions: ['데이터분석', '맞춤추천', '알림발송'] }
    ],
    aiImplementations: [
      { type: 'Adaptive Learning', purpose: '개인화 학습 경로', accuracy: '88%', processingTime: '5초' }
    ],
    departmentAutomations: [
      { department: '교육개발팀', automationLevel: '85%', timeSaved: '주 35시간', costReduction: '연 1억 5천만원' }
    ],
    featured: true
  },

  'startup-aicamp-healthtech-solution': {
    id: 'startup-aicamp-healthtech-solution',
    category: 'startup',
    industry: '헬스테크',
    companyName: '(주)헬스테크솔루션',
    title: 'AI 진단으로 정확도 94% 달성',
    subtitle: '의료 영상 분석 및 진단 지원 시스템',
    description: 'AICAMP 헬스테크 과정으로 AI 의료 전문가 양성, 진단 정확도 94% 달성',
    icon: Heart,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    companyInfo: {
      industry: '헬스테크·의료AI',
      employees: '28명',
      revenue: '연매출 35억원',
      location: '서울특별시 강남구'
    },
    challenges: [
      { title: '진단 정확도 한계', description: '의료 영상 수동 분석 한계', impact: '진단 오류 발생' },
      { title: '의료진 업무 과부하', description: '대량 영상 분석 시간 소요', impact: '진료 지연' }
    ],
    curriculum: {
      basic: [
        { title: '헬스테크 AI 기초', duration: '16시간', description: '의료 AI 기술 이해' },
        { title: '의료 영상 분석', duration: '20시간', description: 'Computer Vision 의료 적용' }
      ],
      advanced: [
        { title: 'AI 진단 모델링', duration: '24시간', description: '의료 영상 진단 AI' },
        { title: '의료 데이터 관리', duration: '18시간', description: 'HIPAA 규정 준수' }
      ],
      executive: [
        { title: '헬스테크 전략', duration: '8시간', description: 'AI 의료 비즈니스 모델' }
      ]
    },
    process: [
      {
        phase: 'AI 진단 시스템 구축',
        duration: '12주',
        activities: ['의료 데이터 수집', 'AI 모델 개발', '임상 검증'],
        results: ['진단 정확도 94%', '분석 시간 90% 단축']
      }
    ],
    results: {
      quantitative: [
        { metric: '진단 정확도', before: '78%', after: '94%', improvement: '21% 향상' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연 3억원' }
      ],
      qualitative: ['의료진 만족도 96%', '환자 대기시간 70% 단축']
    },
    automationMetrics: {
      timeReduction: '90%',
      costSaving: '연 3억원',
      errorReduction: '85%',
      productivityGain: '400%'
    },
    roiData: {
      investment: '8천만원',
      monthlySavings: '2천 5백만원',
      paybackPeriod: '3.2개월',
      threeYearROI: '1,125%'
    },
    implementationTimeline: '12주',
    successFactors: [
      '고품질 의료 데이터 확보',
      '정확한 AI 모델 검증',
      '의료진 협력 및 피드백'
    ],
    tags: ['헬스테크', 'AI', '의료진단', 'Computer Vision', '의료AI'],
    testimonial: {
      quote: 'AICAMP 과정으로 AI 의료 전문가가 되어 혁신적인 진단 시스템을 개발할 수 있었습니다.',
      author: '박의료',
      position: 'CEO',
      company: '(주)헬스테크솔루션'
    },
    followUpResults: [
      { metric: '6개월 후 추가 성과', achievement: 'FDA 승인 및 시리즈 C 투자 유치 80억원' }
    ],
    n8nWorkflows: [
      { name: '의료 진단 자동화', description: '의료 영상 분석 및 진단 워크플로우', nodes: 18, triggers: ['영상업로드', '진단요청'], actions: ['영상분석', 'AI진단', '결과전송'] }
    ],
    aiImplementations: [
      { type: 'Computer Vision', purpose: '의료 영상 진단', accuracy: '94%', processingTime: '2분' }
    ],
    departmentAutomations: [
      { department: '의료진단팀', automationLevel: '95%', timeSaved: '주 45시간', costReduction: '연 3억원' }
    ],
    featured: true
  }
};

export default remainingCases;

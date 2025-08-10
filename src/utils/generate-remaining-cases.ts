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
    heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop',
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
        { title: 'AI 금융 기초', duration: '8시간', description: '핀테크 AI 활용, 신용평가 개념' },
        { title: '머신러닝 기초', duration: '12시간', description: 'ML 알고리즘, 데이터 전처리' }
      ],
      advanced: [
        { title: '신용평가 모델', duration: '24시간', description: 'ML 신용평가, 리스크 모델링' },
        { title: '자동화 시스템', duration: '20시간', description: '자동 심사, API 연동' }
      ],
      executive: [
        { title: '핀테크 전략', duration: '4시간', description: '디지털 금융 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: AI 금융 교육',
        duration: '3주 (20시간)',
        activities: ['AI 신용평가 이론', 'ML 기초 실습'],
        results: ['금융 AI 이해도 85% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '대출승인율', before: '45%', after: '78%', improvement: '33%p 향상' },
        { metric: '심사시간', before: '3일', after: '30분', improvement: '95% 단축' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연간 8억원' },
        { item: '매출 증대', amount: '연간 25억원' },
        { item: 'ROI', amount: '380%' }
      ],
      qualitative: ['AI 신용평가로 정확도 향상', '자동화로 고객 만족도 증대']
    },
    testimonial: {
      quote: "AI 신용평가 시스템으로 더 정확하고 빠른 서비스를 제공할 수 있게 되었습니다.",
      author: "박핀테크",
      position: "리스크관리팀장",
      company: "(주)핀테크이노베이션"
    },
    followUpResults: [
      { metric: '사업 확장', achievement: '개인신용대출 서비스 론칭' }
    ],
    tags: ['핀테크', '신용평가', 'AI금융', '자동화']
  },

  'startup-aicamp-edtech-personalization': {
    id: 'startup-aicamp-edtech-personalization',
    category: 'startup',
    industry: '에듀테크',
    companyName: '(주)에듀테크개인화',
    title: 'AI 개인화 학습으로 학습효과 185% 향상',
    subtitle: '적응형 학습 및 개인화 추천 시스템',
    description: 'AICAMP 에듀테크 과정으로 AI 교육 전문가 양성, 학습효과 185% 향상',
    icon: GraduationCap,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '교육·에듀테크',
      employees: '32명',
      revenue: '연매출 45억원',
      location: '서울특별시 서초구'
    },
    challenges: [
      { title: '획일적 교육', description: '개인별 학습 수준 차이 미반영', impact: '학습효과 저하' },
      { title: '학습 동기 부족', description: '흥미 유발 콘텐츠 부족', impact: '학습 지속율 낮음' }
    ],
    curriculum: {
      basic: [
        { title: 'AI 교육 기초', duration: '8시간', description: '적응형 학습, 개인화 추천' },
        { title: '학습 분석', duration: '12시간', description: '학습 데이터 분석, 패턴 인식' }
      ],
      advanced: [
        { title: '개인화 알고리즘', duration: '24시간', description: '적응형 학습 모델, 추천 시스템' },
        { title: '콘텐츠 자동화', duration: '20시간', description: 'AI 콘텐츠 생성, 자동 평가' }
      ],
      executive: [
        { title: '에듀테크 전략', duration: '4시간', description: 'AI 교육 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: AI 교육 기술 학습',
        duration: '3주 (20시간)',
        activities: ['적응형 학습 이해', '개인화 기술 실습'],
        results: ['교육 AI 전문성 확보']
      }
    ],
    results: {
      quantitative: [
        { metric: '학습효과', before: '100%', after: '185%', improvement: '85% 향상' },
        { metric: '학습 지속율', before: '60%', after: '89%', improvement: '29%p 향상' }
      ],
      financial: [
        { item: '매출 증대', amount: '연간 18억원' },
        { item: 'ROI', amount: '420%' }
      ],
      qualitative: ['개인화 학습으로 학습 만족도 향상', 'AI 추천으로 학습 동기 증진']
    },
    testimonial: {
      quote: "AI 개인화 학습 시스템으로 학생들의 학습 성과가 크게 향상되었습니다.",
      author: "김에듀",
      position: "교육개발팀장",
      company: "(주)에듀테크개인화"
    },
    followUpResults: [
      { metric: '플랫폼 확장', achievement: '온라인 학습 플랫폼 론칭' }
    ],
    tags: ['에듀테크', '개인화학습', 'AI교육', '적응형학습']
  },

  'startup-aicamp-healthtech-diagnosis': {
    id: 'startup-aicamp-healthtech-diagnosis',
    category: 'startup',
    industry: '헬스테크',
    companyName: '(주)헬스테크진단',
    title: 'AI 의료영상 분석으로 진단정확도 94% 달성',
    subtitle: 'Computer Vision 기반 의료영상 진단 시스템',
    description: 'AICAMP 헬스테크 과정으로 AI 의료 전문가 양성, 진단정확도 94% 달성',
    icon: Heart,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '헬스테크·의료IT',
      employees: '28명',
      revenue: '연매출 35억원',
      location: '대전광역시 유성구'
    },
    challenges: [
      { title: '진단 정확도 한계', description: '기존 진단 방식의 정확도 부족', impact: '오진 위험' },
      { title: '진단 시간 과다', description: '전문의 부족으로 진단 지연', impact: '환자 대기시간 증가' }
    ],
    curriculum: {
      basic: [
        { title: '의료 AI 기초', duration: '8시간', description: '의료영상 AI, Computer Vision' },
        { title: '딥러닝 기초', duration: '12시간', description: 'CNN, 이미지 분석 기초' }
      ],
      advanced: [
        { title: '의료영상 분석', duration: '24시간', description: '딥러닝 진단 모델, 영상 처리' },
        { title: '진단 시스템', duration: '20시간', description: 'AI 진단 워크플로우, 시스템 통합' }
      ],
      executive: [
        { title: '헬스테크 전략', duration: '4시간', description: 'AI 의료 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 의료 AI 교육',
        duration: '3주 (20시간)',
        activities: ['의료영상 AI 이해', 'CNN 모델 실습'],
        results: ['의료 AI 전문성 확보']
      }
    ],
    results: {
      quantitative: [
        { metric: '진단정확도', before: '78%', after: '94%', improvement: '16%p 향상' },
        { metric: '진단시간', before: '45분', after: '3분', improvement: '93% 단축' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연간 5억원' },
        { item: '매출 증대', amount: '연간 15억원' },
        { item: 'ROI', amount: '350%' }
      ],
      qualitative: ['AI 진단으로 정확도 향상', '빠른 진단으로 환자 만족도 증대']
    },
    testimonial: {
      quote: "AI 의료영상 분석 시스템으로 더 정확하고 빠른 진단이 가능해졌습니다.",
      author: "이헬스",
      position: "의료개발팀장",
      company: "(주)헬스테크진단"
    },
    followUpResults: [
      { metric: '기술 인증', achievement: '의료기기 인증 획득' }
    ],
    tags: ['헬스테크', '의료영상', 'AI진단', 'Computer Vision']
  }
};

export default remainingCases;

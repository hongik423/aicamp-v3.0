/**
 * 🏢 브랜딩 및 연락처 정보 중앙 관리
 * 
 * 모든 브랜딩 관련 정보를 이 파일에서 중앙 관리합니다.
 * 변경 시 이 파일만 수정하면 전체 시스템에 적용됩니다.
 */

// 🏢 기업 정보
export const COMPANY_INFO = {
  name: 'AICAMP',
  fullName: 'AICAMP AI 교육센터',
  shortName: 'AICAMP',
  slogan: 'AI와 함께 성장하는 미래를 만들어갑니다',
  mission: '기업과 개인의 AI 역량 강화를 통한 디지털 혁신을 지원합니다',
  vision: 'AI 기술을 통해 모든 기업이 글로벌 경쟁력을 갖춘 리더가 되는 세상',
  coreValues: [
    '💡 혁신 (Innovation)',
    '🤝 신뢰 (Trust)', 
    '🎯 성과 (Performance)',
    '🌟 탁월함 (Excellence)'
  ],
  address: '서울 금천구 서부샛길 606 대성디폴리스 지식산업센터 A동 14층 1408-3호',
  website: 'https://aicamp-landingpage.vercel.app',
  email: 'hongik423@gmail.com'
} as const;

// 👨‍💼 담당자 정보
export const CONSULTANT_INFO = {
  name: '이후경',
  title: 'AI 교육 전문가',
  fullTitle: '이후경 AI 교육 전문가',
  phone: '010-9251-9743',
  email: 'hongik423@gmail.com',
  experience: '25년',
  specialization: 'AI 기술 교육 및 디지털 혁신 전략',
  certification: 'AI 교육 전문가 자격증',
  company: 'AICAMP',
  description: '25년간 500개 이상 기업의 AI 도입과 디지털 혁신을 이끌어온 전문가',
  background: '현대그룹, 삼성생명 대기업 AI 전략 경험 + 200개사 AI 교육 노하우'
} as const;

// 📞 연락처 정보
export const CONTACT_INFO = {
  mainPhone: '010-9251-9743',
  emergencyPhone: '010-9251-9743',
  email: 'hongik423@gmail.com',
  kakaoTalk: '@aicamp',
  businessHours: '평일 09:00-18:00',
  consultationHours: '평일/주말 09:00-21:00',
  responseTime: '24시간 이내 연락',
  visitConsultation: '무료 현장 방문 상담 가능',
  
  // 상담 관련 정보 (하위 호환성)
  consultationInfo: {
    freeConsultation: '첫 상담은 완전 무료입니다!',
    consultationTime: '30분',
    availableTime: '평일/주말 09:00-21:00',
    responseMethod: '전화 또는 이메일'
  }
} as const;

// 🌐 웹사이트 정보
export const WEBSITE_INFO = {
  domain: 'aicamp-education.com',
  title: 'AICAMP AI 교육센터',
  description: 'AI 기반 교육 및 전문 컨설팅 서비스',
  
  // SEO 관련
  keywords: [
    'AI 교육센터',
    'AI 교육',
    'AI 컨설팅',
    '디지털 혁신',
    'AI 기술 교육',
    'AI 역량 강화'
  ],
  
  // 소셜미디어
  social: {
    // 추후 필요시 추가
  }
} as const;

// 📧 이메일 템플릿 정보
export const EMAIL_TEMPLATES = {
  // 발신자 정보
  sender: {
    name: COMPANY_INFO.name,
    email: CONTACT_INFO.email,
    replyTo: CONTACT_INFO.email
  },
  
  // 공통 서명
  signature: `
${COMPANY_INFO.name}
${CONSULTANT_INFO.name}
📞 ${CONTACT_INFO.mainPhone}
📧 ${CONTACT_INFO.email}

${CONTACT_INFO.consultationInfo.freeConsultation}
  `.trim(),
  
  // 공통 푸터
  footer: `
---
🏢 ${COMPANY_INFO.name}
${COMPANY_INFO.slogan}
📞 ${CONTACT_INFO.mainPhone} | 📧 ${CONTACT_INFO.email}
  `.trim()
} as const;

// 🎯 AI 센터장 설정
export const CHATBOT_CONFIG = {
  name: `AI-CAMP 교장`,
  greeting: `안녕하세요! 🤖 AI-CAMP 교장 ${CONSULTANT_INFO.fullTitle}입니다.`,
  
  systemMessage: `저는 AI-CAMP 교장 ${CONSULTANT_INFO.fullTitle}로, 25년간 현대그룹과 삼성생명에서 쌓은 대기업 AI 전략 경험과 500개 기업 AI 교육 노하우를 바탕으로 전문 상담을 진행합니다.`,
  
  contactInfo: {
    consultant: `AI-CAMP 교장 ${CONSULTANT_INFO.fullTitle}`,
    phone: CONTACT_INFO.mainPhone,
    email: CONTACT_INFO.email
  },
  
  character: {
    identity: 'AI-CAMP 교장 이후경 AI 교육 전문가',
    expertise: '25년 AI 교육 및 디지털 혁신 전문가',
    tone: '전문적이면서도 친근한',
    focus: 'AI 기술 중심의 구체적 솔루션 제시'
  }
} as const;

// 🔧 환경 변수 (레거시 호환)
export const LEGACY_MAPPING = {
  // 기존 M-CENTER -> 새 브랜드명
  'M-CENTER': COMPANY_INFO.name,
  'M-Center': COMPANY_INFO.name,
  'm-center': COMPANY_INFO.shortName,
  '기업의별 M-CENTER': COMPANY_INFO.name,
  '기업의별 경영지도센터': COMPANY_INFO.fullName,
  '경영지도센터': COMPANY_INFO.fullName,
  
  // 기존 담당자 -> 새 담당자
  '이후경 책임컨설턴트': CONSULTANT_INFO.name,
  '이후경 경영지도사': CONSULTANT_INFO.name,
      'AICAMP교장': CONSULTANT_INFO.title,
  
  // 기존 이메일 -> 새 이메일
  'mcenter@example.com': CONTACT_INFO.email,
  'lhk@injc.kr': CONTACT_INFO.email
} as const;

// 🚀 내보내기 (편의 함수)
export const getBrandName = () => COMPANY_INFO.name;
export const getConsultantName = () => CONSULTANT_INFO.name;
export const getMainEmail = () => CONTACT_INFO.email;
export const getMainPhone = () => CONTACT_INFO.mainPhone;

// 전체 설정 객체
export const BRANDING_CONFIG = {
  company: COMPANY_INFO,
  consultant: CONSULTANT_INFO,
  contact: CONTACT_INFO,
  website: WEBSITE_INFO,
  email: EMAIL_TEMPLATES,
  chatbot: CHATBOT_CONFIG,
  legacy: LEGACY_MAPPING
} as const;

export default BRANDING_CONFIG; 
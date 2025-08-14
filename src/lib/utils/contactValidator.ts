/**
 * 전화번호 및 이메일 검증 유틸리티
 * 한국 전화번호 형식 및 국제 이메일 표준 검증
 */

// 전화번호 검증 결과
export interface PhoneValidationResult {
  isValid: boolean;
  type: 'invalid' | 'mobile' | 'landline' | 'toll-free' | 'international';
  formatted: string;
  message: string;
  suggestions?: string[];
}

// 이메일 검증 결과
export interface EmailValidationResult {
  isValid: boolean;
  type: 'invalid' | 'personal' | 'business' | 'temporary' | 'suspicious';
  domain: string;
  message: string;
  suggestions?: string[];
  securityLevel: 'low' | 'medium' | 'high';
}

// 한국 전화번호 패턴
const PHONE_PATTERNS = {
  mobile: {
    pattern: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
    formats: [
      /^(01[0-9])-?([0-9]{3,4})-?([0-9]{4})$/,
      /^(01[0-9])([0-9]{3,4})([0-9]{4})$/
    ],
    prefixes: ['010', '011', '016', '017', '018', '019']
  },
  landline: {
    pattern: /^(02|0[3-6][1-5]|05[1-5])-?[0-9]{3,4}-?[0-9]{4}$/,
    formats: [
      /^(02)-?([0-9]{3,4})-?([0-9]{4})$/,
      /^(0[3-6][1-5])-?([0-9]{3,4})-?([0-9]{4})$/,
      /^(05[1-5])-?([0-9]{3,4})-?([0-9]{4})$/
    ],
    prefixes: ['02', '031', '032', '033', '041', '042', '043', '044', '051', '052', '053', '054', '055', '061', '062', '063', '064']
  },
  tollFree: {
    pattern: /^(080|1588|1577|1566|1544)-?[0-9]{4}$/,
    formats: [
      /^(080|1588|1577|1566|1544)-?([0-9]{4})$/
    ],
    prefixes: ['080', '1588', '1577', '1566', '1544']
  }
};

// 의심스러운 이메일 도메인 (임시 이메일, 스팸 등)
const SUSPICIOUS_DOMAINS = [
  '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'temp-mail.org', 'throwaway.email', 'maildrop.cc'
];

// 비즈니스 이메일 도메인
const BUSINESS_DOMAINS = [
  'company.co.kr', 'corp.co.kr', 'co.kr', 'or.kr', 'ne.kr', 
  'com', 'net', 'org', 'biz', 'info'
];

// 개인 이메일 도메인
const PERSONAL_DOMAINS = [
  'gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'kakao.com',
  'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'
];

/**
 * 전화번호 형식 검증 및 정규화
 */
export function validatePhoneNumber(phone: string): PhoneValidationResult {
  if (!phone || phone.trim().length === 0) {
    return {
      isValid: false,
      type: 'invalid',
      formatted: '',
      message: '전화번호를 입력해주세요.'
    };
  }

  // 공백, 하이픈, 괄호 등 제거
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

  // 국제번호 형식 체크 (+82)
  if (cleanPhone.startsWith('+82')) {
    const koreanNumber = '0' + cleanPhone.substring(3);
    return validateKoreanPhone(koreanNumber, 'international');
  }

  // 한국 전화번호 검증
  return validateKoreanPhone(cleanPhone);
}

/**
 * 한국 전화번호 검증
 */
function validateKoreanPhone(phone: string, originalType?: string): PhoneValidationResult {
  // 휴대폰 번호 검증
  if (PHONE_PATTERNS.mobile.pattern.test(phone)) {
    const formatted = formatPhoneNumber(phone, 'mobile');
    return {
      isValid: true,
      type: originalType === 'international' ? 'international' : 'mobile',
      formatted,
      message: '유효한 휴대폰 번호입니다.'
    };
  }

  // 일반전화 번호 검증
  if (PHONE_PATTERNS.landline.pattern.test(phone)) {
    const formatted = formatPhoneNumber(phone, 'landline');
    return {
      isValid: true,
      type: 'landline',
      formatted,
      message: '유효한 일반전화 번호입니다.'
    };
  }

  // 무료전화 번호 검증
  if (PHONE_PATTERNS.tollFree.pattern.test(phone)) {
    const formatted = formatPhoneNumber(phone, 'tollFree');
    return {
      isValid: true,
      type: 'toll-free',
      formatted,
      message: '유효한 무료전화 번호입니다.'
    };
  }

  // 검증 실패시 제안사항 생성
  const suggestions = generatePhoneSuggestions(phone);

  return {
    isValid: false,
    type: 'invalid',
    formatted: phone,
    message: '올바른 전화번호 형식이 아닙니다.',
    suggestions
  };
}

/**
 * 전화번호 형식 정규화
 */
function formatPhoneNumber(phone: string, type: string): string {
  const cleanPhone = phone.replace(/[\s\-]/g, '');

  switch (type) {
    case 'mobile':
      if (cleanPhone.length === 11) {
        return `${cleanPhone.substring(0, 3)}-${cleanPhone.substring(3, 7)}-${cleanPhone.substring(7)}`;
      } else if (cleanPhone.length === 10) {
        return `${cleanPhone.substring(0, 3)}-${cleanPhone.substring(3, 6)}-${cleanPhone.substring(6)}`;
      }
      break;
    case 'landline':
      if (cleanPhone.startsWith('02')) {
        return `${cleanPhone.substring(0, 2)}-${cleanPhone.substring(2, 6)}-${cleanPhone.substring(6)}`;
      } else {
        return `${cleanPhone.substring(0, 3)}-${cleanPhone.substring(3, 7)}-${cleanPhone.substring(7)}`;
      }
    case 'tollFree':
      return `${cleanPhone.substring(0, 4)}-${cleanPhone.substring(4)}`;
  }
  
  return cleanPhone;
}

/**
 * 전화번호 제안사항 생성
 */
function generatePhoneSuggestions(phone: string): string[] {
  const suggestions: string[] = [];
  const cleanPhone = phone.replace(/[\s\-]/g, '');

  // 길이 체크
  if (cleanPhone.length < 10) {
    suggestions.push('전화번호가 너무 짧습니다. (최소 10자리)');
  } else if (cleanPhone.length > 11) {
    suggestions.push('전화번호가 너무 깁니다. (최대 11자리)');
  }

  // 휴대폰 번호 형식 제안
  if (cleanPhone.startsWith('01') && cleanPhone.length === 11) {
    suggestions.push('휴대폰: 010-1234-5678 형식으로 입력하세요');
  }

  // 일반전화 형식 제안
  if (cleanPhone.startsWith('02') || cleanPhone.match(/^0[3-6]/)) {
    suggestions.push('일반전화: 02-1234-5678 또는 031-123-4567 형식으로 입력하세요');
  }

  return suggestions;
}

/**
 * 이메일 주소 검증
 */
export function validateEmail(email: string): EmailValidationResult {
  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      type: 'invalid',
      domain: '',
      message: '이메일을 입력해주세요.',
      securityLevel: 'low'
    };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // 기본 이메일 형식 검증
  const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailPattern.test(trimmedEmail)) {
    return {
      isValid: false,
      type: 'invalid',
      domain: '',
      message: '올바른 이메일 형식이 아닙니다.',
      suggestions: ['example@company.com 형식으로 입력하세요'],
      securityLevel: 'low'
    };
  }

  // 고급 이메일 형식 검증
  const advancedEmailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!advancedEmailPattern.test(trimmedEmail)) {
    return {
      isValid: false,
      type: 'invalid',
      domain: '',
      message: '이메일 형식이 올바르지 않습니다.',
      suggestions: ['특수문자 사용을 확인해주세요'],
      securityLevel: 'low'
    };
  }

  const [localPart, domain] = trimmedEmail.split('@');
  
  // 도메인 분석
  const domainAnalysis = analyzeDomain(domain);
  
  // 로컬 파트 검증
  const localPartAnalysis = analyzeLocalPart(localPart);

  if (!localPartAnalysis.isValid) {
    return {
      isValid: false,
      type: 'invalid',
      domain,
      message: localPartAnalysis.message,
      suggestions: localPartAnalysis.suggestions,
      securityLevel: 'low'
    };
  }

  return {
    isValid: true,
    type: domainAnalysis.type,
    domain,
    message: domainAnalysis.message,
    suggestions: domainAnalysis.suggestions,
    securityLevel: domainAnalysis.securityLevel
  };
}

/**
 * 도메인 분석
 */
function analyzeDomain(domain: string): Omit<EmailValidationResult, 'isValid'> {
  // 의심스러운 도메인 체크
  if (SUSPICIOUS_DOMAINS.some(suspiciousDomain => domain.includes(suspiciousDomain))) {
    return {
      type: 'suspicious',
      domain,
      message: '임시 이메일 또는 의심스러운 도메인입니다.',
      suggestions: ['신뢰할 수 있는 이메일 주소를 사용해주세요'],
      securityLevel: 'low'
    };
  }

  // 비즈니스 도메인 체크
  if (BUSINESS_DOMAINS.some(businessDomain => domain.endsWith(businessDomain))) {
    return {
      type: 'business',
      domain,
      message: '유효한 비즈니스 이메일입니다.',
      securityLevel: 'high'
    };
  }

  // 개인 도메인 체크
  if (PERSONAL_DOMAINS.some(personalDomain => domain === personalDomain)) {
    return {
      type: 'personal',
      domain,
      message: '유효한 개인 이메일입니다.',
      securityLevel: 'medium'
    };
  }

  // 일반 도메인
  return {
    type: 'business',
    domain,
    message: '유효한 이메일 주소입니다.',
    securityLevel: 'medium'
  };
}

/**
 * 로컬 파트 분석 (@ 앞부분)
 */
function analyzeLocalPart(localPart: string): { isValid: boolean; message: string; suggestions?: string[] } {
  // 길이 체크
  if (localPart.length > 64) {
    return {
      isValid: false,
      message: '이메일 사용자명이 너무 깁니다. (최대 64자)',
      suggestions: ['더 짧은 사용자명을 사용해주세요']
    };
  }

  // 시작/끝 점 체크
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return {
      isValid: false,
      message: '이메일 사용자명은 점(.)으로 시작하거나 끝날 수 없습니다.',
      suggestions: ['점을 제거하거나 다른 위치로 이동해주세요']
    };
  }

  // 연속된 점 체크
  if (localPart.includes('..')) {
    return {
      isValid: false,
      message: '이메일 사용자명에 연속된 점(..)이 있습니다.',
      suggestions: ['연속된 점을 하나로 변경해주세요']
    };
  }

  return {
    isValid: true,
    message: '유효한 이메일 형식입니다.'
  };
}

/**
 * 실시간 전화번호 검증 (비동기)
 */
export async function validatePhoneNumberAsync(phone: string): Promise<PhoneValidationResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(validatePhoneNumber(phone));
    }, 300);
  });
}

/**
 * 실시간 이메일 검증 (비동기)
 */
export async function validateEmailAsync(email: string): Promise<EmailValidationResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(validateEmail(email));
    }, 300);
  });
}

/**
 * 전화번호 마스킹 (개인정보 보호)
 */
export function maskPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-]/g, '');
  
  if (cleanPhone.length >= 10) {
    return `${cleanPhone.substring(0, 3)}-****-${cleanPhone.substring(cleanPhone.length - 4)}`;
  }
  
  return '***-****-****';
}

/**
 * 이메일 마스킹 (개인정보 보호)
 */
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  
  if (localPart.length <= 2) {
    return `*@${domain}`;
  }
  
  return `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}@${domain}`;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 숫자를 한국어 천 단위 구분기호로 포맷팅 (정수 반올림 적용)
 */
export const formatNumber = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  // 🔥 정수로 반올림하여 소수점 완전 제거
  const roundedNum = Math.round(num);
  return new Intl.NumberFormat('ko-KR').format(roundedNum);
};

/**
 * 숫자를 한국 원화 통화 형식으로 포맷팅 (정수 반올림 적용)
 */
export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  // 🔥 정수로 반올림하여 소수점 완전 제거
  const roundedNum = Math.round(num);
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(roundedNum);
};

/**
 * 숫자를 한국어 천 단위 구분기호와 함께 "원" 단위로 포맷팅 (정수 반올림 적용)
 */
export const formatWon = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  // 🔥 정수로 반올림하여 소수점 완전 제거
  const roundedNum = Math.round(num);
  return `${formatNumber(roundedNum)}원`;
};

/**
 * 퍼센트를 한국어 형식으로 포맷팅
 */
export const formatPercent = (rate: number, precision: number = 2): string => {
  return `${rate.toFixed(precision)}%`;
};

// 추가된 숫자 입력 필드 전용 함수들

/**
 * 입력된 문자열에서 숫자만 추출하여 반환
 */
export const extractNumbers = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

/**
 * 숫자 입력 필드용 포맷팅 (실시간 천원 단위 구분자 적용)
 */
export const formatNumberInput = (value: string | number): string => {
  if (!value) return '';
  const numStr = typeof value === 'string' ? extractNumbers(value) : value.toString();
  const num = parseInt(numStr) || 0;
  return num === 0 ? '' : formatNumber(num);
};

/**
 * 포맷팅된 숫자 문자열을 순수 숫자로 파싱
 */
export const parseFormattedNumber = (formattedValue: string): number => {
  if (!formattedValue) return 0;
  const numStr = extractNumbers(formattedValue);
  return parseInt(numStr) || 0;
};

/**
 * 숫자 입력 필드의 변경사항을 처리하는 헬퍼 함수
 */
export const handleNumberInputChange = (
  inputValue: string,
  onChange: (value: number) => void,
  options?: {
    min?: number;
    max?: number;
    allowEmpty?: boolean;
  }
): string => {
  const { min = 0, max, allowEmpty = true } = options || {};
  
  // 빈 값 처리
  if (!inputValue && allowEmpty) {
    onChange(0);
    return '';
  }
  
  // 숫자만 추출
  const numericValue = extractNumbers(inputValue);
  let num = parseInt(numericValue) || 0;
  
  // 최소값/최대값 제한
  if (num < min) num = min;
  if (max && num > max) num = max;
  
  // 콜백 호출
  onChange(num);
  
  // 포맷팅된 값 반환
  return num === 0 && allowEmpty ? '' : formatNumber(num);
};

/**
 * 숫자 입력 필드 유효성 검사
 */
export const validateNumberInput = (
  value: number,
  options?: {
    min?: number;
    max?: number;
    required?: boolean;
  }
): { isValid: boolean; errorMessage?: string } => {
  const { min = 0, max, required = false } = options || {};
  
  if (required && (!value || value === 0)) {
    return { isValid: false, errorMessage: '필수 입력 항목입니다.' };
  }
  
  if (value < min) {
    return { isValid: false, errorMessage: `최소값은 ${formatNumber(min)}원입니다.` };
  }
  
  if (max && value > max) {
    return { isValid: false, errorMessage: `최대값은 ${formatNumber(max)}원입니다.` };
  }
  
  return { isValid: true };
};

// 🔧 GitHub Pages 호환 이미지 경로 처리
export function getImagePath(path: string): string {
  // 개발 환경에서는 상대 경로, 배포 환경에서는 절대 경로 사용
  const basePath = process.env.NODE_ENV === 'production' ? '' : '';
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * 로고 이미지 경로를 가져오는 함수 (SVG 우선 사용)
 */
export function getLogoPath(): string {
  return getImagePath('/images/AICAMP로고.png');
}

/**
 * AICAMP 센터장 이미지 선택 함수
 * aicamp_leader.png와 aicamp_leader2.jpg 중 시간 기반으로 선택
 */
export function getRandomLeaderImage(): string {
  const images = [
    '/images/aicamp_leader.png',
    '/images/aicamp_leader2.jpg'
  ];
  
  // Hydration 오류를 방지하기 위해 시간 기반 선택 (서버와 클라이언트에서 동일)
  // 시간대별로 다른 이미지 표시 (12시간마다 변경)
  const hours = new Date().getHours();
  const imageIndex = Math.floor(hours / 12) % images.length;
  
  return getImagePath(images[imageIndex]);
}

/**
 * 세션 기반 고정 이미지 선택 (한 세션 동안 동일한 이미지 유지)
 */
export function getSessionLeaderImage(): string {
  const images = [
    '/images/aicamp_leader.png',
    '/images/aicamp_leader2.jpg'
  ];
  
  // Hydration 오류를 방지하기 위해 서버와 클라이언트 모두에서 동일한 이미지 사용
  // 날짜 기반으로 일관된 이미지 선택
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const imageIndex = dayOfYear % images.length;
  
  return getImagePath(images[imageIndex]);
}

/**
 * 날짜 기반 이미지 선택 (하루마다 다른 이미지)
 */
export function getDailyLeaderImage(): string {
  const images = [
    '/images/aicamp_leader.png',
    '/images/aicamp_leader2.jpg'
  ];
  
  // 오늘 날짜를 기반으로 이미지 선택
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const imageIndex = dayOfYear % images.length;
  
  return getImagePath(images[imageIndex]);
}

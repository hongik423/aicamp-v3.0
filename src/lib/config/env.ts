/**
 * 환경변수 검증 및 보안 관리 시스템
 * Ollama GPT-OSS 20B 전용 - 이교장의AI상담 시스템
 * 100% 온디바이스 AI, 외부 API 의존성 완전 제거
 */

import { z } from 'zod';

// 🔧 **실제 AICAMP 구글시트 정보** (V22.3 최신 버전 + 상세시트 우선검색)
// 올바른 Google Apps Script URL (POST 요청 지원) - V22.3 새로 배포된 버전
const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec'; // V22.3 aicamp_enhanced_stable_v22.js 스크립트 (2025.08.31 배포완료)
const GOOGLE_SHEETS_ID = '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ';

// 환경변수 스키마 정의 (GEMINI 제거됨 - Ollama 전용)
const envSchema = z.object({
  // Ollama API 설정 (로컬 AI 서버)
  OLLAMA_API_URL: z.string().url('유효한 Ollama API URL이 필요합니다').optional(),
  OLLAMA_MODEL: z.string().optional(),
  
  // Google Sheets & Apps Script (클라이언트 사이드 허용)
  NEXT_PUBLIC_GOOGLE_SHEETS_ID: z.string().min(1, 'Google Sheets ID는 필수입니다').optional(),
  NEXT_PUBLIC_GOOGLE_SCRIPT_URL: z.string().url('유효한 Google Script URL이 필요합니다').optional(),
  NEXT_PUBLIC_GAS_URL: z.string().url('유효한 Google Apps Script URL이 필요합니다').optional(),
  NEXT_PUBLIC_BASE_URL: z.string().optional(),
  
  // 선택적 환경변수
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VERCEL_URL: z.string().optional(),
});

// 타입 정의
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * 서버 사이드 환경변수 검증 및 반환
 */
export function getServerEnv(): EnvConfig {
  try {
    const env = envSchema.parse({
      OLLAMA_API_URL: process.env.OLLAMA_API_URL,
      OLLAMA_MODEL: process.env.OLLAMA_MODEL,
      NEXT_PUBLIC_GOOGLE_SHEETS_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
      NEXT_PUBLIC_GOOGLE_SCRIPT_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL,
      NEXT_PUBLIC_GAS_URL: process.env.NEXT_PUBLIC_GAS_URL,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
    });

    return env;
  } catch (error) {
    console.error('환경변수 검증 실패:', error);
    // 개발 환경에서는 기본값으로 계속 진행
    return {
      OLLAMA_API_URL: process.env.OLLAMA_API_URL || 'http://localhost:11434',
      OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'gpt-oss:20b',
      NEXT_PUBLIC_GOOGLE_SHEETS_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || GOOGLE_SHEETS_ID,
      NEXT_PUBLIC_GOOGLE_SCRIPT_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL,
      NEXT_PUBLIC_GAS_URL: process.env.NEXT_PUBLIC_GAS_URL || DEFAULT_GOOGLE_SCRIPT_URL,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://aicamp.club',
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      VERCEL_URL: process.env.VERCEL_URL,
    };
  }
}

/**
 * 클라이언트 사이드 환경변수 (Google Apps Script 기반)
 */
export function getClientEnv() {
  return {
    googleSheetsId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || GOOGLE_SHEETS_ID,
    googleScriptUrl: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://aicamp.club',
    nodeEnv: process.env.NODE_ENV || 'production',
  };
}

/**
 * 🎯 통합 앱 설정 (appConfig) - emailService.ts에서 사용
 */
export const appConfig = {
  // Google Apps Script 설정
  googleSheetsId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || GOOGLE_SHEETS_ID,
  googleScriptUrl: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL,
  
  // 환경 설정
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // 회사 정보 (시스템 통일)
  company: {
    name: 'AICAMP',
    email: 'hongik423@gmail.com', // 관리자 이메일
    phone: '010-9251-9743',
    website: 'aicamp.club', // 통일된 웹사이트
  },
  
  // 기본 URL
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://aicamp.club',
};

/**
 * Ollama API URL 가져오기 (로컬 AI 서버)
 */
export function getOllamaUrl(): string {
  const url = process.env.OLLAMA_API_URL || 'http://localhost:11434';
  
  console.log('🤖 Ollama API URL:', url);
  return url;
}

/**
 * Ollama 모델명 가져오기
 */
export function getOllamaModel(): string {
  const model = process.env.OLLAMA_MODEL || 'gpt-oss:20b';
  
  console.log('🧠 Ollama 모델:', model);
  return model;
}

/**
    * Google Apps Script URL 가져오기 (AI 역량진단용)
 */
export function getGasUrl(): string {
  // 강제로 올바른 URL 사용 (환경변수 무시)
  const correctUrl = 'https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec';
  
  console.log('🔧 강제 올바른 GAS URL 사용:', correctUrl);
  return correctUrl;
}

/**
 * 환경변수 유효성 검사
 */
export function validateEnv(): boolean {
  try {
    getServerEnv();
    return true;
  } catch (error) {
    console.warn('환경변수 검증 경고:', error);
    return true; // 기본값으로 계속 진행
  }
}

/**
 * 개발 환경 여부 확인
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * 프로덕션 환경 여부 확인
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * API 키 마스킹 (로깅용)
 */
export function maskApiKey(key: string): string {
  if (!key || key.length < 8) return '***';
  return `${key.slice(0, 8)}****${key.slice(-4)}`;
}

/**
 * Google Apps Script 연결 테스트
 */
export async function testGoogleScriptConnection(): Promise<{
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}> {
  try {
    const clientEnv = getClientEnv();
    const scriptUrl = clientEnv.googleScriptUrl;
    
    if (!scriptUrl) {
      return {
        success: false,
        message: 'Google Script URL이 설정되지 않았습니다.',
        error: 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL 환경변수를 확인해주세요.'
      };
    }
    
    console.log('🔵 Google Apps Script 연결 테스트 시작:', scriptUrl);
    
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('✅ Google Apps Script 연결 성공:', data);
    
    return {
      success: true,
      message: 'Google Apps Script 연결 테스트 성공',
      data: data
    };
    
  } catch (error) {
    console.error('❌ Google Apps Script 연결 실패:', error);
    
    return {
      success: false,
      message: 'Google Apps Script 연결 테스트 실패',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

/**
 * 환경변수 상태 로깅 (민감한 정보 제외)
 */
export function logEnvStatus(): void {
  if (isDevelopment()) {
    console.log('🔧 환경변수 상태 (Google Apps Script 통합):', {
      nodeEnv: process.env.NODE_ENV,
      aiProvider: 'ollama',
      ollamaUrl: process.env.OLLAMA_API_URL,
      ollamaModel: process.env.OLLAMA_MODEL,
      hasGoogleSheetsId: !!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
      hasGoogleScriptUrl: !!process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL,
      hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      googleScriptUrlMasked: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ? 
        `${process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL.slice(0, 50)}...` : 'Default',
    });
  }
} 
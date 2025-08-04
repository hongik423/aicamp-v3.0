// AICAMP AI 역량진단 시스템 - Vercel 최적화 타임아웃 설정
// Vercel 무료 버전: 10초 함수 실행 제한에 맞춘 설정

// ================================================================================
// 🚀 Vercel 최적화 타임아웃 설정 (무료 버전 10초 제한 고려)
// ================================================================================

// 기존 Google Apps Script 타임아웃 (참고용)
const ORIGINAL_TIMEOUT_SETTINGS = {
  GEMINI_API: 1200000,        // 20분 - Google Apps Script 전용
  RETRY_DELAY: 600000,        // 10분 - Google Apps Script 전용
  EMAIL_SERVICE: 180000,      // 3분 - Google Apps Script 전용
  PROGRESS_UPDATE: 30000      // 30초 - Google Apps Script 전용
};

// 🔥 Vercel 최적화 타임아웃 설정 (10초 제한)
const VERCEL_TIMEOUT_SETTINGS = {
  GEMINI_API: 8000,           // 8초 (Vercel 10초 제한 내에서 최대)
  RETRY_DELAY: 2000,          // 2초 (빠른 재시도)
  EMAIL_SERVICE: 5000,        // 5초 (이메일 발송 최적화 필요)
  PROGRESS_UPDATE: 1000,      // 1초 (실시간 업데이트)
  MAX_EXECUTION_TIME: 9000,   // 9초 (안전 마진 1초)
  BATCH_SIZE: 1,              // 배치 크기 최소화
  CACHE_TTL: 300              // 5분 캐시 (성능 최적화)
};

// 🎯 Vercel 환경별 설정
const VERCEL_ENVIRONMENT_CONFIG = {
  development: {
    ...VERCEL_TIMEOUT_SETTINGS,
    DEBUG_MODE: true,
    LOG_LEVEL: 'verbose'
  },
  preview: {
    ...VERCEL_TIMEOUT_SETTINGS,
    DEBUG_MODE: true,
    LOG_LEVEL: 'info'
  },
  production: {
    ...VERCEL_TIMEOUT_SETTINGS,
    DEBUG_MODE: false,
    LOG_LEVEL: 'error',
    GEMINI_API: 7000,         // 운영환경에서 더 보수적
    MAX_EXECUTION_TIME: 8000   // 운영환경 안전 마진 확대
  }
};

// 📊 성능 최적화 전략
const VERCEL_OPTIMIZATION_STRATEGIES = {
  // 1. 비동기 처리 최적화
  async: {
    enableStreaming: true,        // 스트리밍 응답
    enableWebhooks: true,         // 웹훅 기반 비동기 처리
    queueSystem: 'vercel-kv'      // Vercel KV 대기열
  },
  
  // 2. 캐싱 전략
  caching: {
    apiResponses: 300,           // 5분 API 응답 캐시
    staticContent: 3600,         // 1시간 정적 콘텐츠 캐시
    userSessions: 1800           // 30분 사용자 세션 캐시
  },
  
  // 3. 함수 분할 전략
  functions: {
    submitDiagnosis: {
      timeout: 9000,
      memory: 1024,
      regions: ['icn1']         // Seoul region
    },
    processAI: {
      timeout: 8000,
      memory: 1024,
      background: true          // 백그라운드 처리
    },
    sendEmail: {
      timeout: 5000,
      memory: 512,
      regions: ['icn1']
    }
  }
};

// 🔄 Google Apps Script vs Vercel 전환 전략
const MIGRATION_STRATEGY = {
  // Phase 1: 즉시 응답 + 백그라운드 처리
  immediateResponse: {
    responseTime: '< 2초',
    strategy: '신청 접수 즉시 확인, AI 분석은 백그라운드',
    implementation: 'Webhook + Queue'
  },
  
  // Phase 2: 스트리밍 응답
  streamingResponse: {
    responseTime: '실시간',
    strategy: 'AI 분석 진행상황 실시간 스트리밍',
    implementation: 'Server-Sent Events'
  },
  
  // Phase 3: 마이크로서비스 분할
  microservices: {
    services: [
      'diagnosis-submission',
      'ai-analysis-engine', 
      'report-generation',
      'email-notification'
    ],
    orchestration: 'Vercel Edge Functions'
  }
};

// ⚡ Vercel Edge Functions 최적화 (더 빠른 응답)
const EDGE_FUNCTION_CONFIG = {
  runtime: 'edge',
  regions: ['icn1', 'hnd1'],    // 한국, 일본 리전
  timeout: 30000,               // Edge Functions는 30초 제한
  memory: 128                   // Edge Functions 메모리 제한
};

module.exports = {
  VERCEL_TIMEOUT_SETTINGS,
  VERCEL_ENVIRONMENT_CONFIG,
  VERCEL_OPTIMIZATION_STRATEGIES,
  MIGRATION_STRATEGY,
  EDGE_FUNCTION_CONFIG,
  ORIGINAL_TIMEOUT_SETTINGS
};
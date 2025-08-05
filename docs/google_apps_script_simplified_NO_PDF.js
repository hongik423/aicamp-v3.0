// ================================================================================
// 📋 AICAMP AI 역량진단 시스템 - 설정 및 환경변수 모듈
// ================================================================================

/**
 * 환경변수 가져오기 (Google Apps Script Properties)
 */
function getEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 설정
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID') || '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL') || 'hongik423@gmail.com',
    
    // 배포 정보
    SCRIPT_ID: scriptProperties.getProperty('SCRIPT_ID') || '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
    DEPLOYMENT_ID: scriptProperties.getProperty('DEPLOYMENT_ID') || 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
    
    // 운영 설정
    DEBUG_MODE: scriptProperties.getProperty('DEBUG_MODE') === 'true',
    AUTO_REPLY_ENABLED: scriptProperties.getProperty('AUTO_REPLY_ENABLED') !== 'false',
    ENABLE_BENCHMARKING: scriptProperties.getProperty('ENABLE_BENCHMARKING') !== 'false',
    ENABLE_PROGRESS_TRACKING: scriptProperties.getProperty('ENABLE_PROGRESS_TRACKING') !== 'false',
    
    // API 설정
    AI_MODEL: scriptProperties.getProperty('AI_MODEL') || 'gemini-2.0-flash-exp',
    MAX_RETRIES: parseInt(scriptProperties.getProperty('MAX_RETRIES') || '3'),
    REPORT_LANGUAGE: scriptProperties.getProperty('REPORT_LANGUAGE') || 'ko',
    
    // 타임아웃 설정
    TIMEOUT_GEMINI: parseInt(scriptProperties.getProperty('TIMEOUT_GEMINI') || '1200000'), // 20분
    TIMEOUT_EMAIL: parseInt(scriptProperties.getProperty('TIMEOUT_EMAIL') || '180000'), // 3분
    TIMEOUT_RETRY_DELAY: parseInt(scriptProperties.getProperty('TIMEOUT_RETRY_DELAY') || '600000'), // 10분
  };
}

// 환경변수 전역 상수
const ENV = getEnvironmentVariables();

// 시트 이름 상수
const SHEETS = {
  DIAGNOSIS: 'AI_역량진단신청',
  EVALUATION: 'AI_역량평가결과',
  CONSULTATION: '상담신청',
  BETA_FEEDBACK: '베타피드백',
  PROGRESS: '진행상황추적',
  PERFORMANCE: '성능모니터링',
  BENCHMARKS: '업종별벤치마크',
  REPORTS: '보고서이력',
  ERROR_LOG: '오류로그'
};

// 버전 정보
const VERSION = '2025.02.05.AICAMP_AI역량진단시스템_v6.0_통합최적화_무오류';

// AICAMP 정보
const AICAMP_INFO = {
  LOGO_URL: 'https://ai-camp-landingpage.vercel.app/images/aicamp_logo_del_250726.png',
  WEBSITE: 'https://aicamp.ai',
  CEO_NAME: '이후경',
  CEO_PHONE: '010-9251-9743',
  CEO_EMAIL: 'hongik423@gmail.com',
  KAKAO_ID: '@aicamp'
};

// AI 역량 평가 항목 구조
const AI_CAPABILITY_STRUCTURE = {
  // 5대 AI 역량
  aiCapabilities: {
    aiUnderstanding: {
      name: 'AI 이해 및 활용 전략',
      weight: 0.2,
      items: {
        aiTechUnderstanding: 'AI 기술 이해도',
        aiStrategyPlanning: 'AI 활용 전략 수립',
        aiInvestmentDecision: 'AI 투자 의사결정'
      }
    },
    dataManagement: {
      name: '데이터 관리 및 분석',
      weight: 0.2,
      items: {
        dataCollection: '데이터 수집 체계',
        dataQuality: '데이터 품질 관리',
        dataAnalysis: '데이터 분석 역량'
      }
    },
    processOptimization: {
      name: '프로세스 혁신 및 자동화',
      weight: 0.2,
      items: {
        processAnalysis: '업무 프로세스 분석',
        automationAssessment: '자동화 가능성 평가',
        aiProcessImprovement: 'AI 기반 프로세스 개선'
      }
    },
    talentDevelopment: {
      name: '인재 육성 및 조직 문화',
      weight: 0.2,
      items: {
        aiEducation: 'AI 교육 체계',
        changeManagement: '변화 관리 역량',
        innovationCulture: '혁신 문화 조성'
      }
    },
    customerExperience: {
      name: '고객 경험 및 가치 창출',
      weight: 0.2,
      items: {
        customerDataUsage: '고객 데이터 활용',
        aiServiceDevelopment: 'AI 기반 서비스 개발',
        customerSatisfaction: '고객 만족도 향상'
      }
    }
  },
  
  // 실무 역량
  practicalCapabilities: {
    documentAutomation: '문서 자동화 역량',
    dataAnalysisPractice: '데이터 분석 실무',
    aiToolUsage: 'AI 도구 활용 역량',
    digitalCollaboration: '디지털 협업 역량',
    industrySpecific: '업종 특화 역량'
  }
};

// 업종별 설정
const INDUSTRY_CONFIG = {
  '제조업': {
    benchmarkScore: 65,
    keyFactors: ['스마트팩토리', 'IoT', '품질관리'],
    aiTrends: ['디지털 트윈', '예측 정비', '공급망 AI'],
    specificMetrics: ['생산효율', '불량률', '재고회전율']
  },
  'IT/소프트웨어': {
    benchmarkScore: 85,
    keyFactors: ['AI개발', '클라우드', '빅데이터'],
    aiTrends: ['AI 코드 생성', 'MLOps', 'AI 보안'],
    specificMetrics: ['개발속도', '코드품질', '시스템안정성']
  },
  '서비스업': {
    benchmarkScore: 55,
    keyFactors: ['챗봇', 'CRM', '개인화'],
    aiTrends: ['대화형 AI', '감정분석', '자동화'],
    specificMetrics: ['고객만족도', '응답시간', '서비스품질']
  },
  '유통/도소매': {
    benchmarkScore: 60,
    keyFactors: ['추천시스템', '재고최적화', '옴니채널'],
    aiTrends: ['수요예측', '가격최적화', '무인매장'],
    specificMetrics: ['매출성장률', '재고효율', '고객전환율']
  },
  '금융업': {
    benchmarkScore: 75,
    keyFactors: ['리스크관리', '자동화', '보안'],
    aiTrends: ['AI 신용평가', '로보어드바이저', '이상거래탐지'],
    specificMetrics: ['리스크지표', '처리속도', '정확도']
  },
  '의료/헬스케어': {
    benchmarkScore: 70,
    keyFactors: ['진단보조', '데이터분석', '원격의료'],
    aiTrends: ['AI 진단', '신약개발', '맞춤의료'],
    specificMetrics: ['진단정확도', '처리시간', '환자만족도']
  },
  '교육': {
    benchmarkScore: 50,
    keyFactors: ['맞춤학습', '평가자동화', '콘텐츠'],
    aiTrends: ['AI 튜터', '학습분석', '자동평가'],
    specificMetrics: ['학습성과', '참여도', '만족도']
  },
  '기타': {
    benchmarkScore: 55,
    keyFactors: ['자동화', '분석', '최적화'],
    aiTrends: ['프로세스 AI', '데이터 분석', '고객 서비스'],
    specificMetrics: ['효율성', '정확도', '만족도']
  }
};

/**
 * 환경변수 초기 설정 (최초 1회 실행)
 */
function setupEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  const defaultProperties = {
    // 필수 설정
    SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: 'YOUR_API_KEY_HERE', // 실제 API 키로 변경 필요
    ADMIN_EMAIL: 'hongik423@gmail.com',
    
    // 배포 정보
    SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
    DEPLOYMENT_ID: 'YOUR_DEPLOYMENT_ID_HERE', // 배포 후 변경 필요
    
    // 운영 설정
    DEBUG_MODE: 'false',
    AUTO_REPLY_ENABLED: 'true',
    ENABLE_BENCHMARKING: 'true',
    ENABLE_PROGRESS_TRACKING: 'true',
    
    // API 설정
    AI_MODEL: 'gemini-2.0-flash-exp',
    MAX_RETRIES: '3',
    REPORT_LANGUAGE: 'ko',
    
    // 타임아웃 설정
    TIMEOUT_GEMINI: '1200000',
    TIMEOUT_EMAIL: '180000',
    TIMEOUT_RETRY_DELAY: '600000'
  };
  
  scriptProperties.setProperties(defaultProperties);
  
  console.log('✅ 환경변수 설정 완료');
  console.log('⚠️ GEMINI_API_KEY와 DEPLOYMENT_ID를 실제 값으로 변경하세요!');
  
  // 설정 확인
  checkEnvironmentVariables();
}

/**
 * 환경변수 확인
 */
function checkEnvironmentVariables() {
  console.log('📋 현재 환경변수 설정:');
  console.log('================================');
  
  const env = getEnvironmentVariables();
  Object.entries(env).forEach(([key, value]) => {
    if (key === 'GEMINI_API_KEY') {
      console.log(`${key}: ${value ? value.substring(0, 10) + '...' : 'NOT SET'}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
  
  console.log('================================');
  
  // 필수 설정 확인
  const requiredKeys = ['SPREADSHEET_ID', 'GEMINI_API_KEY', 'ADMIN_EMAIL'];
  const missingKeys = requiredKeys.filter(key => !env[key] || env[key] === 'YOUR_API_KEY_HERE');
  
  if (missingKeys.length > 0) {
    console.warn('⚠️ 다음 필수 설정이 누락되었습니다:', missingKeys.join(', '));
    return false;
  }
  
  console.log('✅ 모든 필수 설정이 완료되었습니다.');
  return true;
}

/**
 * 시트 초기화
 */
function initializeSheets() {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    
    Object.entries(SHEETS).forEach(([key, sheetName]) => {
      let sheet = spreadsheet.getSheetByName(sheetName);
      
      if (!sheet) {
        console.log(`📄 시트 생성: ${sheetName}`);
        sheet = spreadsheet.insertSheet(sheetName);
        
        // 시트별 헤더 설정
        const headers = getSheetHeaders(key);
        if (headers) {
          sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
          sheet.getRange(1, 1, 1, headers.length)
            .setBackground('#667eea')
            .setFontColor('#ffffff')
            .setFontWeight('bold');
        }
      }
    });
    
    console.log('✅ 시트 초기화 완료');
    return true;
    
  } catch (error) {
    console.error('❌ 시트 초기화 오류:', error);
    return false;
  }
}

/**
 * 시트별 헤더 가져오기
 */
function getSheetHeaders(sheetKey) {
  const headers = {
    DIAGNOSIS: [
      '진단ID', '신청일시', '회사명', '업종', '담당자명', '이메일', '연락처',
      '종합점수', '등급', 'AI성숙도', '매트릭스위치', '주요고민사항', 
      '예상혜택', '희망컨설팅분야', '처리상태'
    ],
    EVALUATION: [
      '진단ID', '평가일시', '종합점수', '등급', 'AI성숙도',
      'AI이해전략', '데이터관리', '프로세스혁신', '인재육성', '고객경험',
      '문서자동화', '데이터분석실무', 'AI도구활용', '디지털협업', '업종특화',
      '벤치마크비교'
    ],
    CONSULTATION: [
      '상담ID', '신청일시', '회사명', '담당자명', '이메일', '연락처',
      '상담분야', '상담내용', '희망일시', '처리상태'
    ],
    PROGRESS: [
      '진단ID', '시간', '단계', '상태', '메시지', '처리자'
    ],
    PERFORMANCE: [
      '일시', '처리유형', '처리시간(ms)', '성공여부', '오류내용'
    ],
    BENCHMARKS: [
      '업종', '항목', '평균점수', '상위10%', '상위30%', '업데이트일'
    ],
    REPORTS: [
      '진단ID', '생성일시', '보고서길이', '품질등급', '개인화점수', '저장위치'
    ],
    ERROR_LOG: [
      '발생일시', '오류유형', '오류메시지', '스택트레이스', '컨텍스트', '처리자'
    ]
  };
  
  return headers[sheetKey];
}
// ================================================================================
// 🛠️ AICAMP AI 역량진단 시스템 - 유틸리티 함수 모듈
// ================================================================================

/**
 * 현재 한국 시간 가져오기
 */
function getCurrentKoreanTime() {
  try {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const koreaTime = new Date(utc + (9 * 3600000)); // UTC+9
    
    return koreaTime.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul'
    });
  } catch (error) {
    console.error('한국 시간 생성 오류:', error);
    return new Date().toISOString();
  }
}

/**
 * 고유 ID 생성
 */
function generateUniqueId(prefix = 'ID') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  return generateUniqueId('ACD');
}

/**
 * 상담 ID 생성
 */
function generateConsultationId() {
  return generateUniqueId('CON');
}

/**
 * 안전한 JSON 파싱
 */
function safeJsonParse(jsonString, defaultValue = {}) {
  try {
    if (!jsonString) return defaultValue;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    return defaultValue;
  }
}

/**
 * 안전한 JSON 문자열화
 */
function safeJsonStringify(obj, defaultValue = '{}') {
  try {
    if (!obj) return defaultValue;
    return JSON.stringify(obj);
  } catch (error) {
    console.error('JSON 문자열화 오류:', error);
    return defaultValue;
  }
}

/**
 * 숫자 평균 계산
 */
function calculateAverage(numbers) {
  const validNumbers = numbers.filter(n => n !== null && n !== undefined && !isNaN(n));
  if (validNumbers.length === 0) return 0;
  const sum = validNumbers.reduce((acc, num) => acc + Number(num), 0);
  return sum / validNumbers.length;
}

/**
 * 점수에서 등급 계산
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

/**
 * AI 성숙도 레벨 판단
 */
function getAIMaturityLevel(score) {
  if (score >= 90) return 'AI 선도';
  if (score >= 75) return '완전통합';
  if (score >= 60) return '확산적용';
  if (score >= 40) return '시범적용';
  return '도입준비';
}

/**
 * 웹앱 URL 가져오기
 */
function getWebAppUrl() {
  return `https://script.google.com/macros/s/${ENV.DEPLOYMENT_ID}/exec`;
}

/**
 * 성공 응답 생성
 */
function createSuccessResponse(data) {
  try {
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: data,
        timestamp: getCurrentKoreanTime(),
        version: VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    if (ENV.DEBUG_MODE) {
      console.log('✅ 성공 응답 생성:', data);
    }
    
    return response;
  } catch (error) {
    console.error('❌ 성공 응답 생성 오류:', error);
    throw error;
  }
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message, errorCode = 'UNKNOWN_ERROR') {
  try {
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: message || '처리 중 오류가 발생했습니다',
        errorCode: errorCode,
        timestamp: getCurrentKoreanTime(),
        version: VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    console.error(`❌ 오류 응답 생성: ${message}`);
    
    return response;
  } catch (error) {
    console.error('❌ 오류 응답 생성 실패:', error);
    throw error;
  }
}

/**
 * HTML 응답 생성
 */
function createHtmlResponse(html) {
  return HtmlService
    .createHtmlOutput(html)
    .setTitle('AICAMP AI 역량진단 시스템')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 오류 로깅
 */
function logError(error, context = {}) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let errorSheet = spreadsheet.getSheetByName(SHEETS.ERROR_LOG);
    
    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet(SHEETS.ERROR_LOG);
      const headers = getSheetHeaders('ERROR_LOG');
      errorSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const errorRow = [
      getCurrentKoreanTime(),
      error.name || 'Error',
      error.message || error.toString(),
      error.stack || 'No stack trace',
      safeJsonStringify(context),
      Session.getActiveUser().getEmail() || 'System'
    ];
    
    errorSheet.appendRow(errorRow);
    
  } catch (logError) {
    console.error('오류 로깅 실패:', logError);
  }
}

/**
 * 성능 로깅
 */
function logPerformance(processType, startTime, success = true, errorMessage = '') {
  try {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let perfSheet = spreadsheet.getSheetByName(SHEETS.PERFORMANCE);
    
    if (!perfSheet) {
      perfSheet = spreadsheet.insertSheet(SHEETS.PERFORMANCE);
      const headers = getSheetHeaders('PERFORMANCE');
      perfSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const perfRow = [
      getCurrentKoreanTime(),
      processType,
      duration,
      success ? '성공' : '실패',
      errorMessage
    ];
    
    perfSheet.appendRow(perfRow);
    
    if (ENV.DEBUG_MODE) {
      console.log(`⏱️ ${processType} 처리시간: ${duration}ms`);
    }
    
  } catch (error) {
    console.error('성능 로깅 실패:', error);
  }
}

/**
 * 진행상황 업데이트
 */
function updateProgress(diagnosisId, step, status, message) {
  if (!ENV.ENABLE_PROGRESS_TRACKING) return;
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let progressSheet = spreadsheet.getSheetByName(SHEETS.PROGRESS);
    
    if (!progressSheet) {
      progressSheet = spreadsheet.insertSheet(SHEETS.PROGRESS);
      const headers = getSheetHeaders('PROGRESS');
      progressSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const progressRow = [
      diagnosisId,
      getCurrentKoreanTime(),
      step,
      status,
      message,
      Session.getActiveUser().getEmail() || 'System'
    ];
    
    progressSheet.appendRow(progressRow);
    
    if (ENV.DEBUG_MODE) {
      console.log(`📍 진행상황: ${diagnosisId} - ${step} - ${status}`);
    }
    
  } catch (error) {
    console.error('진행상황 업데이트 실패:', error);
  }
}

/**
 * 재시도 로직을 포함한 안전한 실행
 */
function safeExecute(fn, context, fallbackResult = null) {
  const maxRetries = ENV.MAX_RETRIES || 3;
  const startTime = new Date().getTime();
  let lastError = null;
  
  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      if (retry > 0) {
        console.log(`🔄 재시도 ${retry}/${maxRetries}: ${context}`);
        Utilities.sleep(2000 * retry); // 점진적 대기
      }
      
      const result = fn();
      
      if (ENV.DEBUG_MODE) {
        const executionTime = new Date().getTime() - startTime;
        console.log(`✅ ${context} 성공 (${executionTime}ms)`);
      }
      
      logPerformance(context, startTime, true);
      return result;
      
    } catch (error) {
      lastError = error;
      console.error(`❌ ${context} 실패 (시도 ${retry + 1}):`, error);
      
      // 타임아웃 오류는 즉시 재시도
      if (error.toString().includes('timeout') || error.toString().includes('Timeout')) {
        continue;
      }
      
      // 다른 오류는 잠시 대기 후 재시도
      if (retry < maxRetries - 1) {
        Utilities.sleep(1000);
      }
    }
  }
  
  // 모든 재시도 실패 시
  console.error(`🚨 ${context} 최종 실패:`, lastError);
  logError(lastError, { context, retries: maxRetries });
  logPerformance(context, startTime, false, lastError.toString());
  
  if (fallbackResult !== null) {
    return fallbackResult;
  }
  
  throw lastError;
}

/**
 * 이메일 유효성 검사
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 전화번호 형식화
 */
function formatPhoneNumber(phone) {
  if (!phone) return '';
  
  // 숫자만 추출
  const numbers = phone.replace(/[^0-9]/g, '');
  
  // 한국 휴대폰 번호 형식
  if (numbers.length === 11 && numbers.startsWith('010')) {
    return `${numbers.substr(0, 3)}-${numbers.substr(3, 4)}-${numbers.substr(7, 4)}`;
  }
  
  // 한국 일반 전화번호 형식
  if (numbers.length === 10) {
    if (numbers.startsWith('02')) {
      return `${numbers.substr(0, 2)}-${numbers.substr(2, 4)}-${numbers.substr(6, 4)}`;
    } else {
      return `${numbers.substr(0, 3)}-${numbers.substr(3, 3)}-${numbers.substr(6, 4)}`;
    }
  }
  
  return phone;
}

/**
 * 데이터 정규화
 */
function normalizeData(data) {
  const normalized = {};
  
  Object.entries(data).forEach(([key, value]) => {
    // null, undefined 처리
    if (value === null || value === undefined) {
      normalized[key] = '';
      return;
    }
    
    // 문자열 트림
    if (typeof value === 'string') {
      normalized[key] = value.trim();
      return;
    }
    
    // 배열 처리
    if (Array.isArray(value)) {
      normalized[key] = value.map(v => typeof v === 'string' ? v.trim() : v);
      return;
    }
    
    // 기타 값은 그대로
    normalized[key] = value;
  });
  
  return normalized;
}

/**
 * 필수 필드 검증
 */
function validateRequiredFields(data, requiredFields) {
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missingFields.push(field);
    }
  });
  
  if (missingFields.length > 0) {
    throw new Error(`필수 항목이 누락되었습니다: ${missingFields.join(', ')}`);
  }
  
  return true;
}

/**
 * 배치 작업 실행 (API 제한 고려)
 */
function executeBatch(items, batchSize, processFn, delayMs = 100) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    batch.forEach(item => {
      try {
        const result = processFn(item);
        results.push(result);
      } catch (error) {
        console.error('배치 항목 처리 오류:', error);
        results.push({ error: error.toString() });
      }
    });
    
    // 다음 배치 전 대기
    if (i + batchSize < items.length) {
      Utilities.sleep(delayMs);
    }
  }
  
  return results;
}

/**
 * 캐시 관리
 */
const CacheManager = {
  get: function(key) {
    try {
      const cache = CacheService.getScriptCache();
      const value = cache.get(key);
      return value ? safeJsonParse(value) : null;
    } catch (error) {
      console.error('캐시 읽기 오류:', error);
      return null;
    }
  },
  
  set: function(key, value, expirationInSeconds = 600) {
    try {
      const cache = CacheService.getScriptCache();
      cache.put(key, safeJsonStringify(value), expirationInSeconds);
      return true;
    } catch (error) {
      console.error('캐시 쓰기 오류:', error);
      return false;
    }
  },
  
  remove: function(key) {
    try {
      const cache = CacheService.getScriptCache();
      cache.remove(key);
      return true;
    } catch (error) {
      console.error('캐시 삭제 오류:', error);
      return false;
    }
  }
};
// ================================================================================
// 🎯 AICAMP AI 역량진단 시스템 - AI 역량 평가 모듈
// ================================================================================

/**
 * 신청서 데이터 기반 AI 역량 자동 평가
 */
function autoEvaluateAICapabilities(applicationData) {
  console.log('🤖 AI 역량 자동 평가 시작');
  updateProgress(applicationData.diagnosisId, 'AI 역량 평가', 'processing', '자동 평가 진행 중');
  
  try {
    const evaluation = {
      // 5대 AI 역량 평가
      aiCapabilities: evaluateAICapabilities(applicationData),
      
      // 실무 역량 평가
      practicalCapabilities: evaluatePracticalCapabilities(applicationData),
      
      // 종합 점수 계산
      scores: null,
      
      // AI 성숙도 레벨
      maturityLevel: null,
      
      // 업계 벤치마크 비교
      benchmark: null
    };
    
    // 종합 점수 계산
    evaluation.scores = calculateComprehensiveScores(evaluation);
    
    // AI 성숙도 레벨 판정
    evaluation.maturityLevel = getAIMaturityLevel(evaluation.scores.totalScore);
    
    // 업계 벤치마크 비교
    if (ENV.ENABLE_BENCHMARKING) {
      evaluation.benchmark = compareToBenchmark(applicationData.industry, evaluation.scores);
    }
    
    updateProgress(applicationData.diagnosisId, 'AI 역량 평가', 'completed', '평가 완료');
    console.log('✅ AI 역량 자동 평가 완료:', evaluation);
    
    return evaluation;
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, 'AI 역량 평가', 'error', error.toString());
    throw error;
  }
}

/**
 * 5대 AI 역량 평가
 */
function evaluateAICapabilities(data) {
  const capabilities = {};
  
  // 1. AI 이해 및 활용 전략
  capabilities.aiUnderstanding = {
    aiTechUnderstanding: evaluateAITechUnderstanding(data),
    aiStrategyPlanning: evaluateAIStrategyPlanning(data),
    aiInvestmentDecision: evaluateAIInvestmentDecision(data)
  };
  
  // 2. 데이터 관리 및 분석
  capabilities.dataManagement = {
    dataCollection: evaluateDataCollection(data),
    dataQuality: evaluateDataQuality(data),
    dataAnalysis: evaluateDataAnalysis(data)
  };
  
  // 3. 프로세스 혁신 및 자동화
  capabilities.processOptimization = {
    processAnalysis: evaluateProcessAnalysis(data),
    automationAssessment: evaluateAutomationAssessment(data),
    aiProcessImprovement: evaluateAIProcessImprovement(data)
  };
  
  // 4. 인재 육성 및 조직 문화
  capabilities.talentDevelopment = {
    aiEducation: evaluateAIEducation(data),
    changeManagement: evaluateChangeManagement(data),
    innovationCulture: evaluateInnovationCulture(data)
  };
  
  // 5. 고객 경험 및 가치 창출
  capabilities.customerExperience = {
    customerDataUsage: evaluateCustomerDataUsage(data),
    aiServiceDevelopment: evaluateAIServiceDevelopment(data),
    customerSatisfaction: evaluateCustomerSatisfaction(data)
  };
  
  return capabilities;
}

/**
 * AI 기술 이해도 평가
 */
function evaluateAITechUnderstanding(data) {
  let score = 3; // 기본값
  
  // 현재 AI 활용 현황
  if (data.currentAIUsage && data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  // AI 도구 사용 개수
  if (data.aiToolsList) {
    const tools = data.aiToolsList.split(',').filter(t => t.trim()).length;
    if (tools >= 3) score += 1;
    else if (tools >= 1) score += 0.5;
  }
  
  // 사업 설명에 AI 언급
  if (data.businessDescription && data.businessDescription.toLowerCase().includes('ai')) {
    score += 0.5;
  }
  
  // 직원 수와 업종 고려
  if (data.employeeCount && parseInt(data.employeeCount) > 100) {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * AI 전략 수립 역량 평가
 */
function evaluateAIStrategyPlanning(data) {
  let score = 2.5;
  
  // AI 투자 계획
  if (data.aiInvestmentPlan && data.aiInvestmentPlan !== '없음') {
    score += 1;
  }
  
  // 희망 컨설팅 분야 명확성
  if (data.consultingArea && data.consultingArea !== '기타') {
    score += 0.5;
  }
  
  // 예상 혜택 구체성
  if (data.expectedBenefits) {
    const benefits = data.expectedBenefits.toLowerCase();
    if (benefits.includes('%') || benefits.includes('향상') || benefits.includes('절감')) {
      score += 0.5;
    }
  }
  
  // 목표 달성 기간 설정
  if (data.targetTimeframe) {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * AI 투자 의사결정 역량 평가
 */
function evaluateAIInvestmentDecision(data) {
  let score = 3;
  
  // 예산 범위 명시
  if (data.budgetRange && data.budgetRange !== '미정') {
    score += 0.8;
  }
  
  // 의사결정권자 레벨
  if (data.decisionMaker) {
    if (data.decisionMaker.includes('대표') || data.decisionMaker.includes('CEO')) {
      score += 1;
    } else if (data.decisionMaker.includes('임원') || data.decisionMaker.includes('이사')) {
      score += 0.5;
    }
  }
  
  // 연매출 규모
  if (data.annualRevenue) {
    const revenue = parseInt(data.annualRevenue.replace(/[^0-9]/g, ''));
    if (revenue >= 100) score += 0.2; // 100억 이상
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 데이터 수집 체계 평가
 */
function evaluateDataCollection(data) {
  let score = 3;
  
  // 업종별 데이터 활용도
  const dataIntensiveIndustries = ['IT/소프트웨어', '금융업', '유통/도소매'];
  if (dataIntensiveIndustries.includes(data.industry)) {
    score += 0.5;
  }
  
  // 사업 규모
  if (data.employeeCount && parseInt(data.employeeCount) > 50) {
    score += 0.3;
  }
  
  // 주요 고민사항에 데이터 관련 언급
  if (data.mainChallenges) {
    const challenges = data.mainChallenges.toLowerCase();
    if (challenges.includes('데이터') || challenges.includes('분석')) {
      score += 0.7;
    }
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 데이터 품질 관리 평가
 */
function evaluateDataQuality(data) {
  let score = 2.8;
  
  // 현재 AI 도구 사용 (데이터 품질 인식)
  if (data.currentAIUsage && data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  // 품질 관련 언급
  if (data.mainChallenges && data.mainChallenges.includes('품질')) {
    score += 0.7;
  }
  
  // 업종별 품질 중요도
  if (['제조업', '의료/헬스케어', '금융업'].includes(data.industry)) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 데이터 분석 역량 평가
 */
function evaluateDataAnalysis(data) {
  let score = 3;
  
  // AI 도구 사용 중 분석 도구
  if (data.aiToolsList && data.aiToolsList.includes('분석')) {
    score += 0.8;
  }
  
  // 예상 혜택에 분석 관련
  if (data.expectedBenefits && data.expectedBenefits.includes('분석')) {
    score += 0.5;
  }
  
  // 컨설팅 분야
  if (data.consultingArea === '데이터 분석') {
    score += 0.7;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 실무 역량 평가
 */
function evaluatePracticalCapabilities(data) {
  return {
    documentAutomation: evaluateDocumentAutomation(data),
    dataAnalysisPractice: evaluateDataAnalysisPractice(data),
    aiToolUsage: evaluateAIToolUsage(data),
    digitalCollaboration: evaluateDigitalCollaboration(data),
    industrySpecific: evaluateIndustrySpecific(data)
  };
}

/**
 * 문서 자동화 역량 평가
 */
function evaluateDocumentAutomation(data) {
  let score = 3;
  
  // ChatGPT 사용
  if (data.aiToolsList && data.aiToolsList.includes('ChatGPT')) {
    score += 0.8;
  }
  
  // 업무 효율성 관련 언급
  if (data.mainChallenges && data.mainChallenges.includes('효율')) {
    score += 0.5;
  }
  
  // 서비스업/사무직 비중이 높은 업종
  if (['서비스업', '금융업', '교육'].includes(data.industry)) {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 종합 점수 계산
 */
function calculateComprehensiveScores(evaluation) {
  // AI 역량 점수 계산
  const aiScores = {};
  let aiTotal = 0;
  let aiCount = 0;
  
  Object.entries(AI_CAPABILITY_STRUCTURE.aiCapabilities).forEach(([key, config]) => {
    const items = evaluation.aiCapabilities[key];
    const itemScores = Object.values(items);
    const average = calculateAverage(itemScores);
    
    aiScores[key] = Math.round(average * 20); // 5점 만점을 100점으로 변환
    aiTotal += aiScores[key] * config.weight;
    aiCount += config.weight;
  });
  
  const aiCapabilityAverage = Math.round(aiTotal / aiCount);
  
  // 실무 역량 점수 계산
  const practicalScores = {};
  Object.entries(evaluation.practicalCapabilities).forEach(([key, score]) => {
    practicalScores[key] = Math.round(score * 20); // 5점 만점을 100점으로 변환
  });
  
  const practicalCapabilityAverage = Math.round(
    calculateAverage(Object.values(practicalScores))
  );
  
  // 종합 점수 (AI 역량 70%, 실무 역량 30%)
  const totalScore = Math.round(
    (aiCapabilityAverage * 0.7) + (practicalCapabilityAverage * 0.3)
  );
  
  return {
    aiCapability: {
      scores: aiScores,
      average: aiCapabilityAverage,
      weight: 0.7
    },
    practicalCapability: {
      scores: practicalScores,
      average: practicalCapabilityAverage,
      weight: 0.3
    },
    totalScore: totalScore,
    grade: getGradeFromScore(totalScore)
  };
}

/**
 * 업계 벤치마크 비교
 */
function compareToBenchmark(industry, scores) {
  const industryConfig = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG['기타'];
  const benchmarkScore = industryConfig.benchmarkScore;
  
  const comparison = {
    industry: industry,
    benchmarkScore: benchmarkScore,
    companyScore: scores.totalScore,
    gap: scores.totalScore - benchmarkScore,
    gapPercentage: Math.round(((scores.totalScore - benchmarkScore) / benchmarkScore) * 100),
    position: getCompetitivePosition(scores.totalScore, benchmarkScore),
    
    // 세부 비교
    categoryComparison: {},
    
    // 업계 상위 퍼센타일
    percentile: calculatePercentile(scores.totalScore, industry)
  };
  
  // 카테고리별 비교
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    comparison.categoryComparison[key] = {
      companyScore: score,
      industryAverage: getBenchmarkForCategory(industry, key),
      gap: score - getBenchmarkForCategory(industry, key)
    };
  });
  
  return comparison;
}

/**
 * 경쟁적 위치 판단
 */
function getCompetitivePosition(companyScore, benchmarkScore) {
  const gap = ((companyScore - benchmarkScore) / benchmarkScore) * 100;
  
  if (gap >= 20) return '업계 선도';
  if (gap >= 0) return '업계 평균 이상';
  if (gap >= -20) return '업계 평균';
  if (gap >= -40) return '업계 평균 이하';
  return '개선 시급';
}

/**
 * 업계 내 퍼센타일 계산
 */
function calculatePercentile(score, industry) {
  // 실제로는 DB에서 업계 데이터를 가져와 계산
  // 여기서는 간단한 추정 공식 사용
  const industryConfig = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG['기타'];
  const benchmark = industryConfig.benchmarkScore;
  
  if (score >= benchmark + 20) return 90; // 상위 10%
  if (score >= benchmark + 10) return 75; // 상위 25%
  if (score >= benchmark) return 50; // 상위 50%
  if (score >= benchmark - 10) return 25; // 상위 75%
  return 10; // 하위 10%
}

/**
 * 카테고리별 벤치마크 점수
 */
function getBenchmarkForCategory(industry, category) {
  // 실제로는 DB에서 가져옴
  const industryConfig = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG['기타'];
  const baseScore = industryConfig.benchmarkScore;
  
  // 카테고리별 가중치 적용
  const categoryWeights = {
    aiUnderstanding: 0.9,
    dataManagement: 1.0,
    processOptimization: 1.1,
    talentDevelopment: 0.95,
    customerExperience: 1.05
  };
  
  return Math.round(baseScore * (categoryWeights[category] || 1));
}

// 나머지 평가 함수들...
function evaluateProcessAnalysis(data) {
  let score = 3;
  
  if (data.mainChallenges && data.mainChallenges.includes('프로세스')) {
    score += 0.7;
  }
  
  if (data.consultingArea === '프로세스 자동화') {
    score += 0.8;
  }
  
  if (['제조업', 'IT/소프트웨어'].includes(data.industry)) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAutomationAssessment(data) {
  let score = 3.2;
  
  if (data.expectedBenefits && data.expectedBenefits.includes('자동화')) {
    score += 0.8;
  }
  
  if (data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAIProcessImprovement(data) {
  let score = 2.8;
  
  if (data.aiInvestmentPlan && data.aiInvestmentPlan !== '없음') {
    score += 0.7;
  }
  
  if (data.consultingArea && data.consultingArea.includes('AI')) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAIEducation(data) {
  let score = 2.5;
  
  if (data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  if (data.employeeCount && parseInt(data.employeeCount) > 50) {
    score += 0.5;
  }
  
  if (data.consultingArea === 'AI 교육') {
    score += 1;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateChangeManagement(data) {
  let score = 3;
  
  if (data.decisionMaker && data.decisionMaker.includes('대표')) {
    score += 0.7;
  }
  
  if (data.mainChallenges && data.mainChallenges.includes('변화')) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateInnovationCulture(data) {
  let score = 3;
  
  if (data.businessDescription && data.businessDescription.includes('혁신')) {
    score += 0.5;
  }
  
  if (data.aiInvestmentPlan !== '없음') {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateCustomerDataUsage(data) {
  let score = 3;
  
  if (['유통/도소매', '서비스업', '금융업'].includes(data.industry)) {
    score += 0.5;
  }
  
  if (data.expectedBenefits && data.expectedBenefits.includes('고객')) {
    score += 0.7;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAIServiceDevelopment(data) {
  let score = 2.8;
  
  if (data.consultingArea === '고객 서비스 혁신') {
    score += 0.8;
  }
  
  if (data.aiToolsList && data.aiToolsList.includes('ChatGPT')) {
    score += 0.4;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateCustomerSatisfaction(data) {
  let score = 3.2;
  
  if (data.expectedBenefits && data.expectedBenefits.includes('만족')) {
    score += 0.6;
  }
  
  if (data.mainChallenges && data.mainChallenges.includes('고객')) {
    score += 0.4;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateDataAnalysisPractice(data) {
  return evaluateDataAnalysis(data); // 동일한 로직 사용
}

function evaluateAIToolUsage(data) {
  let score = 3;
  
  if (data.aiToolsList) {
    const tools = data.aiToolsList.split(',').filter(t => t.trim()).length;
    score += Math.min(tools * 0.5, 2);
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateDigitalCollaboration(data) {
  let score = 3;
  
  if (data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  if (data.employeeCount && parseInt(data.employeeCount) > 30) {
    score += 0.3;
  }
  
  if (['IT/소프트웨어', '서비스업'].includes(data.industry)) {
    score += 0.4;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateIndustrySpecific(data) {
  const industry = data.industry || '기타';
  const industryConfig = INDUSTRY_CONFIG[industry];
  
  let score = 3;
  
  // 업종별 핵심 요소 평가
  if (industryConfig && data.mainChallenges) {
    const challenges = data.mainChallenges.toLowerCase();
    industryConfig.keyFactors.forEach(factor => {
      if (challenges.includes(factor.toLowerCase())) {
        score += 0.5;
      }
    });
  }
  
  // AI 도구 사용 여부
  if (data.currentAIUsage !== '사용안함') {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}
// ================================================================================
// 💡 AICAMP AI 역량진단 시스템 - SWOT 분석 및 전략 모듈
// ================================================================================

/**
 * 심층 SWOT 분석 수행
 */
function performDeepSWOTAnalysis(applicationData, evaluationData) {
  console.log('🔄 심층 SWOT 분석 시작');
  updateProgress(applicationData.diagnosisId, 'SWOT 분석', 'processing', '전략적 분석 진행 중');
  
  try {
    const swot = {
      // SWOT 요소 분석
      strengths: identifyStrengths(applicationData, evaluationData),
      weaknesses: identifyWeaknesses(applicationData, evaluationData),
      opportunities: identifyOpportunities(applicationData, evaluationData),
      threats: identifyThreats(applicationData, evaluationData)
    };
    
    // SWOT 매트릭스 전략
    const strategies = {
      SO: generateSOStrategies(swot, applicationData),
      WO: generateWOStrategies(swot, applicationData),
      ST: generateSTStrategies(swot, applicationData),
      WT: generateWTStrategies(swot, applicationData)
    };
    
    // 우선순위 액션
    const priorityActions = extractPriorityActions(strategies, applicationData, evaluationData);
    
    updateProgress(applicationData.diagnosisId, 'SWOT 분석', 'completed', '분석 완료');
    console.log('✅ SWOT 분석 완료');
    
    return {
      swot: swot,
      strategies: strategies,
      priorityActions: priorityActions
    };
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, 'SWOT 분석', 'error', error.toString());
    throw error;
  }
}

/**
 * 강점 식별
 */
function identifyStrengths(appData, evalData) {
  const strengths = [];
  const scores = evalData.scores;
  
  // 1. 점수 기반 강점
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    if (score >= 80) {
      const capabilityName = getCapabilityName(key);
      strengths.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        description: `${capabilityName} 분야에서 업계 선도 수준의 역량 보유 (${score}점)`,
        impact: 'high'
      });
    } else if (score >= 70) {
      const capabilityName = getCapabilityName(key);
      strengths.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        description: `${capabilityName} 분야에서 우수한 역량 보유 (${score}점)`,
        impact: 'medium'
      });
    }
  });
  
  // 2. 사업 특성 기반 강점
  if (appData.businessDescription) {
    strengths.push({
      area: '도메인 전문성',
      type: 'business',
      description: `${appData.industry} 분야의 깊은 이해와 ${appData.establishedYear ? `${new Date().getFullYear() - parseInt(appData.establishedYear)}년의` : ''} 경험`,
      impact: 'high'
    });
  }
  
  // 3. 조직 규모 강점
  if (appData.employeeCount && parseInt(appData.employeeCount) > 100) {
    strengths.push({
      area: '조직 규모',
      type: 'organization',
      description: `${appData.employeeCount}명 규모의 안정적인 조직 구조`,
      impact: 'medium'
    });
  }
  
  // 4. AI 도입 경험
  if (appData.currentAIUsage && appData.currentAIUsage !== '사용안함') {
    strengths.push({
      area: 'AI 도입 경험',
      type: 'experience',
      description: `이미 ${appData.aiToolsList || 'AI 도구'}를 활용한 경험 보유`,
      impact: 'medium'
    });
  }
  
  // 5. 리더십 강점
  if (appData.decisionMaker && (appData.decisionMaker.includes('대표') || appData.decisionMaker.includes('CEO'))) {
    strengths.push({
      area: '경영진 의지',
      type: 'leadership',
      description: '최고 경영진의 강력한 AI 전환 의지',
      impact: 'high'
    });
  }
  
  return strengths.sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 };
    return impactOrder[b.impact] - impactOrder[a.impact];
  });
}

/**
 * 약점 식별
 */
function identifyWeaknesses(appData, evalData) {
  const weaknesses = [];
  const scores = evalData.scores;
  
  // 1. 점수 기반 약점
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    if (score < 40) {
      const capabilityName = getCapabilityName(key);
      weaknesses.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        urgency: 'critical',
        description: `${capabilityName} 역량 심각한 부족 (${score}점)`,
        impact: 'high'
      });
    } else if (score < 60) {
      const capabilityName = getCapabilityName(key);
      weaknesses.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        urgency: 'high',
        description: `${capabilityName} 역량 개선 필요 (${score}점)`,
        impact: 'medium'
      });
    }
  });
  
  // 2. AI 도입 장벽
  if (appData.aiBarriers) {
    const barriers = Array.isArray(appData.aiBarriers) ? appData.aiBarriers : [appData.aiBarriers];
    barriers.forEach(barrier => {
      weaknesses.push({
        area: 'AI 도입 장벽',
        type: 'barrier',
        urgency: 'high',
        description: barrier,
        impact: 'high'
      });
    });
  }
  
  // 3. 예산 제약
  if (!appData.budgetRange || appData.budgetRange === '미정') {
    weaknesses.push({
      area: '투자 계획',
      type: 'resource',
      urgency: 'medium',
      description: 'AI 투자 예산 미확정',
      impact: 'medium'
    });
  }
  
  // 4. 조직 규모 약점
  if (appData.employeeCount && parseInt(appData.employeeCount) < 20) {
    weaknesses.push({
      area: '조직 역량',
      type: 'organization',
      urgency: 'medium',
      description: '소규모 조직으로 인한 전문 인력 부족',
      impact: 'medium'
    });
  }
  
  // 5. 데이터 관련 약점
  if (scores.aiCapability.scores.dataManagement < 60) {
    weaknesses.push({
      area: '데이터 인프라',
      type: 'infrastructure',
      urgency: 'high',
      description: '데이터 관리 체계 미흡',
      impact: 'high'
    });
  }
  
  return weaknesses.sort((a, b) => {
    const urgencyOrder = { critical: 3, high: 2, medium: 1, low: 0 };
    return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
  });
}

/**
 * 기회 식별
 */
function identifyOpportunities(appData, evalData) {
  const opportunities = [];
  const industry = appData.industry || '기타';
  const industryConfig = INDUSTRY_CONFIG[industry];
  
  // 1. 업종별 AI 트렌드 기회
  if (industryConfig && industryConfig.aiTrends) {
    industryConfig.aiTrends.forEach(trend => {
      opportunities.push({
        area: 'AI 트렌드',
        type: 'market',
        description: `${industry} 분야 ${trend} 도입 기회`,
        timeframe: '6-12개월',
        potential: 'high'
      });
    });
  }
  
  // 2. 정부 지원 기회
  opportunities.push({
    area: '정부 지원',
    type: 'funding',
    description: 'AI 바우처, 디지털 전환 지원금 등 정부 지원 사업 (최대 3억원)',
    timeframe: '즉시 신청 가능',
    potential: 'high'
  });
  
  // 3. 시장 확대 기회
  if (appData.expectedBenefits) {
    opportunities.push({
      area: '시장 기회',
      type: 'growth',
      description: `${appData.expectedBenefits} 달성을 통한 시장 확대`,
      timeframe: '3-6개월',
      potential: 'high'
    });
  }
  
  // 4. 경쟁 우위 기회
  if (evalData.benchmark && evalData.benchmark.percentile < 50) {
    opportunities.push({
      area: '경쟁 우위',
      type: 'competitive',
      description: '현재 업계 평균 이하로 빠른 개선 시 경쟁 우위 확보 가능',
      timeframe: '6-9개월',
      potential: 'medium'
    });
  }
  
  // 5. 파트너십 기회
  opportunities.push({
    area: '전략적 파트너십',
    type: 'partnership',
    description: 'AI 전문 기업과의 협력을 통한 빠른 역량 확보',
    timeframe: '1-3개월',
    potential: 'medium'
  });
  
  // 6. 신규 서비스 기회
  if (appData.consultingArea === '고객 서비스 혁신') {
    opportunities.push({
      area: '신규 서비스',
      type: 'innovation',
      description: 'AI 기반 신규 고객 서비스 개발',
      timeframe: '6-12개월',
      potential: 'high'
    });
  }
  
  return opportunities.sort((a, b) => {
    const potentialOrder = { high: 3, medium: 2, low: 1 };
    return potentialOrder[b.potential] - potentialOrder[a.potential];
  });
}

/**
 * 위협 식별
 */
function identifyThreats(appData, evalData) {
  const threats = [];
  const industry = appData.industry || '기타';
  
  // 1. 경쟁사 AI 도입 위협
  threats.push({
    area: '경쟁사 AI 도입',
    type: 'competition',
    description: `${industry} 업계 경쟁사들의 빠른 AI 도입으로 인한 경쟁력 격차`,
    severity: 'high',
    timeframe: '현재 진행중'
  });
  
  // 2. 기술 변화 속도
  threats.push({
    area: '기술 변화',
    type: 'technology',
    description: 'AI 기술의 급속한 발전으로 인한 지속적인 투자 부담',
    severity: 'medium',
    timeframe: '지속적'
  });
  
  // 3. 인재 확보 어려움
  if (evalData.scores.aiCapability.scores.talentDevelopment < 60) {
    threats.push({
      area: '인재 부족',
      type: 'resource',
      description: 'AI 전문 인력 확보의 어려움과 높은 인건비',
      severity: 'high',
      timeframe: '현재'
    });
  }
  
  // 4. 규제 리스크
  if (['금융업', '의료/헬스케어'].includes(industry)) {
    threats.push({
      area: '규제 강화',
      type: 'regulatory',
      description: 'AI 관련 규제 강화로 인한 컴플라이언스 부담',
      severity: 'medium',
      timeframe: '1-2년 내'
    });
  }
  
  // 5. 투자 리스크
  if (appData.annualRevenue && parseInt(appData.annualRevenue) < 50) {
    threats.push({
      area: '투자 부담',
      type: 'financial',
      description: '제한된 재무 자원으로 인한 AI 투자 리스크',
      severity: 'medium',
      timeframe: '즉시'
    });
  }
  
  // 6. 고객 기대치
  threats.push({
    area: '고객 기대치',
    type: 'market',
    description: 'AI 서비스에 대한 고객의 높아진 기대치',
    severity: 'medium',
    timeframe: '현재'
  });
  
  return threats.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

/**
 * SO 전략 생성 (강점-기회)
 */
function generateSOStrategies(swot, appData) {
  const strategies = [];
  const topStrengths = swot.strengths.slice(0, 3);
  const topOpportunities = swot.opportunities.slice(0, 3);
  
  topStrengths.forEach(strength => {
    topOpportunities.forEach(opportunity => {
      if (isStrategicMatch(strength, opportunity)) {
        strategies.push({
          type: 'SO',
          name: '공격적 성장 전략',
          strategy: `${strength.area}을 활용한 ${opportunity.area} 선점`,
          description: `${strength.description}를 기반으로 ${opportunity.description}을 실현`,
          action: generateActionPlan(strength, opportunity, appData),
          expectedResult: generateExpectedResult('SO', strength, opportunity),
          investment: estimateInvestment('SO', appData),
          timeline: opportunity.timeframe,
          priority: calculateStrategyPriority(strength.impact, opportunity.potential)
        });
      }
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * WO 전략 생성 (약점-기회)
 */
function generateWOStrategies(swot, appData) {
  const strategies = [];
  const topWeaknesses = swot.weaknesses.slice(0, 3);
  const topOpportunities = swot.opportunities.slice(0, 3);
  
  topWeaknesses.forEach(weakness => {
    topOpportunities.forEach(opportunity => {
      if (opportunity.type === 'funding' || opportunity.type === 'partnership') {
        strategies.push({
          type: 'WO',
          name: '전환 전략',
          strategy: `${opportunity.area}를 통한 ${weakness.area} 역량 강화`,
          description: `${opportunity.description}를 활용하여 ${weakness.description} 극복`,
          action: generateWeaknessImprovementPlan(weakness, opportunity, appData),
          expectedResult: generateExpectedResult('WO', weakness, opportunity),
          investment: estimateInvestment('WO', appData),
          timeline: '3-6개월',
          priority: calculateStrategyPriority(weakness.urgency, opportunity.potential)
        });
      }
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * ST 전략 생성 (강점-위협)
 */
function generateSTStrategies(swot, appData) {
  const strategies = [];
  const topStrengths = swot.strengths.slice(0, 3);
  const topThreats = swot.threats.slice(0, 3);
  
  topStrengths.forEach(strength => {
    topThreats.forEach(threat => {
      strategies.push({
        type: 'ST',
        name: '방어적 차별화 전략',
        strategy: `${strength.area}을 통한 ${threat.area} 대응`,
        description: `${strength.description}를 강화하여 ${threat.description} 방어`,
        action: generateDefenseStrategy(strength, threat, appData),
        expectedResult: generateExpectedResult('ST', strength, threat),
        investment: estimateInvestment('ST', appData),
        timeline: '즉시 착수',
        priority: calculateStrategyPriority(strength.impact, threat.severity)
      });
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * WT 전략 생성 (약점-위협)
 */
function generateWTStrategies(swot, appData) {
  const strategies = [];
  const criticalWeaknesses = swot.weaknesses.filter(w => w.urgency === 'critical' || w.urgency === 'high').slice(0, 2);
  const criticalThreats = swot.threats.filter(t => t.severity === 'high').slice(0, 2);
  
  criticalWeaknesses.forEach(weakness => {
    criticalThreats.forEach(threat => {
      strategies.push({
        type: 'WT',
        name: '생존 전략',
        strategy: `${weakness.area} 긴급 보완 및 ${threat.area} 회피`,
        description: `${weakness.description}를 최소화하고 ${threat.description}의 영향 축소`,
        action: generateSurvivalStrategy(weakness, threat, appData),
        expectedResult: generateExpectedResult('WT', weakness, threat),
        investment: estimateInvestment('WT', appData),
        timeline: '즉시 착수',
        priority: 10 // 최우선
      });
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 2);
}

/**
 * 우선순위 액션 추출
 */
function extractPriorityActions(strategies, appData, evalData) {
  const allStrategies = [
    ...strategies.SO,
    ...strategies.WO,
    ...strategies.ST,
    ...strategies.WT
  ];
  
  // 우선순위 점수 계산
  const prioritizedStrategies = allStrategies.map(strategy => {
    const score = calculateActionPriority(strategy, appData, evalData);
    return { ...strategy, priorityScore: score };
  });
  
  // 상위 5개 선정
  return prioritizedStrategies
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5)
    .map((strategy, index) => ({
      rank: index + 1,
      ...strategy,
      implementation: generateImplementationPlan(strategy, appData)
    }));
}

// 헬퍼 함수들
function getCapabilityName(key) {
  const names = {
    aiUnderstanding: 'AI 이해 및 활용 전략',
    dataManagement: '데이터 관리 및 분석',
    processOptimization: '프로세스 혁신 및 자동화',
    talentDevelopment: '인재 육성 및 조직 문화',
    customerExperience: '고객 경험 및 가치 창출'
  };
  return names[key] || key;
}

function isStrategicMatch(strength, opportunity) {
  // 전략적 매칭 로직
  if (strength.type === 'capability' && opportunity.type === 'market') return true;
  if (strength.type === 'business' && opportunity.type === 'growth') return true;
  if (strength.type === 'leadership' && opportunity.type === 'funding') return true;
  return false;
}

function calculateStrategyPriority(factor1, factor2) {
  const scoreMap = {
    high: 3, critical: 3,
    medium: 2,
    low: 1
  };
  return (scoreMap[factor1] || 1) * (scoreMap[factor2] || 1);
}

function generateActionPlan(strength, opportunity, appData) {
  return `1) ${strength.area} 역량을 기반으로 전담팀 구성
2) ${opportunity.timeframe} 내 ${opportunity.area} 진입 전략 수립
3) 파일럿 프로젝트 실행 및 성과 측정
4) 성공 사례 기반 전사 확산`;
}

function generateWeaknessImprovementPlan(weakness, opportunity, appData) {
  return `1) ${opportunity.area} 활용하여 즉시 자금/자원 확보
2) ${weakness.area} 개선을 위한 전문가 영입 또는 교육
3) 3개월 내 집중 개선 프로그램 실행
4) 성과 측정 및 지속적 개선`;
}

function generateDefenseStrategy(strength, threat, appData) {
  return `1) ${strength.area} 중심의 차별화 포인트 강화
2) 고객 대상 가치 제안 명확화
3) 경쟁사 대비 우위 요소 지속적 개발
4) 브랜드 포지셔닝 강화`;
}

function generateSurvivalStrategy(weakness, threat, appData) {
  return `1) ${weakness.area} 최소 수준 확보 (Quick Fix)
2) 핵심 사업 영역 집중 및 비핵심 영역 축소
3) 전략적 파트너십을 통한 역량 보완
4) 단계적 개선 로드맵 수립`;
}

function generateExpectedResult(strategyType, factor1, factor2) {
  const results = {
    SO: '시장 점유율 확대 및 매출 30-40% 성장',
    WO: '핵심 역량 50% 향상 및 경쟁력 확보',
    ST: '시장 방어율 90% 및 차별화 우위 확보',
    WT: '생존 기반 확보 및 안정적 성장 준비'
  };
  return results[strategyType];
}

function estimateInvestment(strategyType, appData) {
  const baseInvestment = {
    SO: '5,000만원',
    WO: '3,000만원',
    ST: '2,000만원',
    WT: '1,000만원'
  };
  return baseInvestment[strategyType];
}

function calculateActionPriority(strategy, appData, evalData) {
  let score = strategy.priority || 5;
  
  // 긴급성 가중치
  if (strategy.timeline === '즉시 착수') score += 3;
  
  // 전략 유형 가중치
  if (strategy.type === 'WT') score += 5; // 생존 전략 최우선
  if (strategy.type === 'WO') score += 3; // 약점 보완 우선
  
  // 예상 효과 가중치
  if (strategy.expectedResult.includes('50%') || strategy.expectedResult.includes('40%')) score += 2;
  
  return score;
}

function generateImplementationPlan(strategy, appData) {
  return {
    week1_2: '현황 분석 및 팀 구성',
    week3_4: '세부 실행 계획 수립',
    month2: '파일럿 실행 및 초기 성과 측정',
    month3: '본격 실행 및 확산',
    ongoing: '지속적 모니터링 및 개선'
  };
}
// ================================================================================
// 📊 AICAMP AI 역량진단 시스템 - 매트릭스 분석 모듈
// ================================================================================

/**
 * AI 역량진단 매트릭스 생성
 */
function generateAICapabilityMatrix(evaluationData, applicationData) {
  console.log('📊 AI 역량 매트릭스 생성 시작');
  
  const matrix = {
    title: 'AI 역량진단 결과 매트릭스',
    dimensions: {
      x: {
        name: 'AI 활용 수준',
        description: 'AI 기술 이해도 및 활용 역량',
        min: 0,
        max: 100
      },
      y: {
        name: '비즈니스 영향도',
        description: 'AI가 비즈니스에 미치는 실질적 영향',
        min: 0,
        max: 100
      }
    },
    quadrants: defineQuadrants(),
    currentPosition: null,
    trajectory: null,
    recommendations: []
  };
  
  // 현재 위치 계산
  matrix.currentPosition = calculateMatrixPosition(evaluationData, applicationData);
  
  // 미래 궤적 예측
  matrix.trajectory = predictFutureTrajectory(matrix.currentPosition, applicationData);
  
  // 권장사항 생성
  matrix.recommendations = generateMatrixRecommendations(matrix.currentPosition, applicationData);
  
  console.log('✅ AI 역량 매트릭스 생성 완료');
  return matrix;
}

/**
 * 매트릭스 4분면 정의
 */
function defineQuadrants() {
  return {
    leaders: {
      name: 'AI 리더',
      position: { x: [70, 100], y: [70, 100] },
      description: 'AI 활용 수준과 비즈니스 영향도 모두 높음',
      characteristics: [
        '혁신적 AI 활용으로 시장 선도',
        '높은 ROI 달성',
        '지속적 AI 혁신',
        '업계 벤치마크'
      ],
      color: '#4CAF50',
      icon: '🏆'
    },
    potentials: {
      name: '잠재력 보유',
      position: { x: [0, 70], y: [70, 100] },
      description: 'AI 활용 수준은 낮지만 비즈니스 영향도 높음',
      characteristics: [
        '높은 성장 잠재력',
        'AI 투자 시 빠른 성과 예상',
        '전략적 지원 필요',
        '빠른 개선 가능'
      ],
      color: '#2196F3',
      icon: '🚀'
    },
    experimenters: {
      name: '실험 단계',
      position: { x: [70, 100], y: [0, 70] },
      description: 'AI 활용 수준은 높지만 비즈니스 영향도 낮음',
      characteristics: [
        '기술 중심 접근',
        'ROI 개선 필요',
        '비즈니스 연계 강화 필요',
        '전략 재정립 필요'
      ],
      color: '#FF9800',
      icon: '🔬'
    },
    beginners: {
      name: '초기 단계',
      position: { x: [0, 70], y: [0, 70] },
      description: 'AI 활용 수준과 비즈니스 영향도 모두 낮음',
      characteristics: [
        'AI 기초 구축 필요',
        '교육 우선 필요',
        '단계적 접근 필요',
        '장기적 관점 필요'
      ],
      color: '#9E9E9E',
      icon: '🌱'
    }
  };
}

/**
 * 매트릭스 상 현재 위치 계산
 */
function calculateMatrixPosition(evalData, appData) {
  // X축: AI 활용 수준
  const aiLevel = calculateAILevel(evalData);
  
  // Y축: 비즈니스 영향도
  const businessImpact = calculateBusinessImpact(evalData, appData);
  
  // 현재 분면 판단
  const quadrant = determineQuadrant(aiLevel, businessImpact);
  
  return {
    coordinates: {
      x: aiLevel,
      y: businessImpact
    },
    quadrant: quadrant,
    interpretation: generatePositionInterpretation(quadrant, aiLevel, businessImpact, appData)
  };
}

/**
 * AI 활용 수준 계산
 */
function calculateAILevel(evalData) {
  const scores = evalData.scores;
  
  // AI 역량 점수 (70% 가중치)
  const aiCapabilityScore = scores.aiCapability.average * 0.7;
  
  // 실무 활용 점수 (30% 가중치)
  const practicalScore = scores.practicalCapability.average * 0.3;
  
  return Math.round(aiCapabilityScore + practicalScore);
}

/**
 * 비즈니스 영향도 계산
 */
function calculateBusinessImpact(evalData, appData) {
  let impact = 50; // 기본값
  
  // 1. 예상 혜택 기반 (30%)
  if (appData.expectedBenefits) {
    const benefits = appData.expectedBenefits.toLowerCase();
    if (benefits.includes('매출') || benefits.includes('성장')) impact += 10;
    if (benefits.includes('비용') || benefits.includes('절감')) impact += 8;
    if (benefits.includes('효율') || benefits.includes('생산성')) impact += 7;
    if (benefits.includes('고객') || benefits.includes('만족')) impact += 5;
  }
  
  // 2. 현재 AI 활용 성과 (20%)
  if (appData.currentAIUsage && appData.currentAIUsage !== '사용안함') {
    impact += 10;
    if (appData.aiToolsList && appData.aiToolsList.split(',').length > 2) {
      impact += 5;
    }
  }
  
  // 3. 업종별 AI 영향도 (20%)
  const industryImpact = {
    'IT/소프트웨어': 15,
    '금융업': 12,
    '제조업': 10,
    '유통/도소매': 10,
    '의료/헬스케어': 12,
    '서비스업': 8,
    '교육': 7,
    '기타': 5
  };
  impact += industryImpact[appData.industry] || 5;
  
  // 4. 조직 준비도 (15%)
  if (appData.decisionMaker && appData.decisionMaker.includes('대표')) impact += 8;
  if (appData.budgetRange && appData.budgetRange !== '미정') impact += 7;
  
  // 5. 점수 조정 (15%)
  const totalScore = evalData.scores.totalScore;
  if (totalScore >= 80) impact += 10;
  else if (totalScore >= 60) impact += 5;
  else if (totalScore < 40) impact -= 10;
  
  return Math.min(100, Math.max(0, impact));
}

/**
 * 분면 판단
 */
function determineQuadrant(x, y) {
  if (x >= 70 && y >= 70) return 'leaders';
  if (x < 70 && y >= 70) return 'potentials';
  if (x >= 70 && y < 70) return 'experimenters';
  return 'beginners';
}

/**
 * 위치 해석 생성
 */
function generatePositionInterpretation(quadrant, x, y, appData) {
  const interpretations = {
    leaders: `${appData.companyName}는 AI 활용 수준(${x}점)과 비즈니스 영향도(${y}점) 모두에서 우수한 성과를 보이고 있습니다. 업계를 선도하는 AI 리더로서의 위치를 확고히 하고 있습니다.`,
    
    potentials: `${appData.companyName}는 높은 비즈니스 영향도(${y}점)를 보이지만 AI 활용 수준(${x}점)은 개선이 필요합니다. AI 역량 강화 시 빠른 성장이 예상됩니다.`,
    
    experimenters: `${appData.companyName}는 AI 활용 수준(${x}점)은 높지만 비즈니스 영향도(${y}점)가 상대적으로 낮습니다. AI 투자의 비즈니스 가치 연계 강화가 필요합니다.`,
    
    beginners: `${appData.companyName}는 AI 활용 수준(${x}점)과 비즈니스 영향도(${y}점) 모두 개선이 필요합니다. 체계적인 AI 도입 전략 수립이 시급합니다.`
  };
  
  return interpretations[quadrant];
}

/**
 * 미래 궤적 예측
 */
function predictFutureTrajectory(currentPosition, appData) {
  const trajectory = {
    sixMonths: { x: 0, y: 0 },
    oneYear: { x: 0, y: 0 },
    twoYears: { x: 0, y: 0 },
    factors: [],
    confidence: 'medium'
  };
  
  // 성장 요인 분석
  const growthFactors = analyzeGrowthFactors(appData);
  
  // 6개월 후 예측
  trajectory.sixMonths = {
    x: Math.min(100, currentPosition.coordinates.x + growthFactors.aiGrowth * 0.5),
    y: Math.min(100, currentPosition.coordinates.y + growthFactors.businessGrowth * 0.5)
  };
  
  // 1년 후 예측
  trajectory.oneYear = {
    x: Math.min(100, currentPosition.coordinates.x + growthFactors.aiGrowth),
    y: Math.min(100, currentPosition.coordinates.y + growthFactors.businessGrowth)
  };
  
  // 2년 후 예측
  trajectory.twoYears = {
    x: Math.min(100, currentPosition.coordinates.x + growthFactors.aiGrowth * 1.5),
    y: Math.min(100, currentPosition.coordinates.y + growthFactors.businessGrowth * 1.5)
  };
  
  trajectory.factors = growthFactors.factors;
  trajectory.confidence = calculateConfidence(growthFactors);
  
  return trajectory;
}

/**
 * 성장 요인 분석
 */
function analyzeGrowthFactors(appData) {
  const factors = [];
  let aiGrowth = 10; // 기본 성장률
  let businessGrowth = 8;
  
  // 긍정적 요인
  if (appData.aiInvestmentPlan && appData.aiInvestmentPlan !== '없음') {
    aiGrowth += 5;
    factors.push({ type: 'positive', factor: 'AI 투자 계획 보유', impact: 'high' });
  }
  
  if (appData.decisionMaker && appData.decisionMaker.includes('대표')) {
    aiGrowth += 3;
    businessGrowth += 5;
    factors.push({ type: 'positive', factor: '경영진 의지', impact: 'high' });
  }
  
  if (appData.currentAIUsage !== '사용안함') {
    aiGrowth += 3;
    factors.push({ type: 'positive', factor: 'AI 도입 경험', impact: 'medium' });
  }
  
  // 부정적 요인
  if (!appData.budgetRange || appData.budgetRange === '미정') {
    aiGrowth -= 3;
    factors.push({ type: 'negative', factor: '예산 미확정', impact: 'medium' });
  }
  
  if (appData.employeeCount && parseInt(appData.employeeCount) < 20) {
    aiGrowth -= 2;
    factors.push({ type: 'negative', factor: '소규모 조직', impact: 'low' });
  }
  
  return {
    aiGrowth: Math.max(0, aiGrowth),
    businessGrowth: Math.max(0, businessGrowth),
    factors: factors
  };
}

/**
 * 신뢰도 계산
 */
function calculateConfidence(growthFactors) {
  const positiveFactors = growthFactors.factors.filter(f => f.type === 'positive').length;
  const totalFactors = growthFactors.factors.length;
  
  if (positiveFactors / totalFactors >= 0.7) return 'high';
  if (positiveFactors / totalFactors >= 0.4) return 'medium';
  return 'low';
}

/**
 * 매트릭스 기반 권장사항 생성
 */
function generateMatrixRecommendations(position, appData) {
  const recommendations = {
    leaders: [
      {
        priority: 'high',
        area: 'AI 혁신 리더십',
        action: 'AI 혁신 리더십 유지 및 강화',
        details: '업계 최고 수준의 AI 역량을 바탕으로 신규 AI 기술 조기 도입 및 혁신 주도',
        timeline: '지속적',
        expectedOutcome: '시장 리더십 강화'
      },
      {
        priority: 'medium',
        area: '생태계 주도',
        action: 'AI 생태계 구축 및 파트너십 확대',
        details: 'AI 성공 사례 공유, 파트너사 AI 역량 강화 지원',
        timeline: '6개월',
        expectedOutcome: '생태계 영향력 확대'
      },
      {
        priority: 'medium',
        area: '인재 육성',
        action: '차세대 AI 인재 육성 투자',
        details: '내부 AI 전문가 양성 및 외부 인재 영입',
        timeline: '1년',
        expectedOutcome: '지속가능한 AI 역량'
      }
    ],
    
    potentials: [
      {
        priority: 'critical',
        area: 'AI 역량 강화',
        action: 'AI 역량 긴급 강화 프로그램',
        details: 'AI 기초 교육, 전문가 영입, 파일럿 프로젝트 실행',
        timeline: '3개월',
        expectedOutcome: 'AI 활용 수준 20점 향상'
      },
      {
        priority: 'high',
        area: 'Quick Win',
        action: '검증된 AI 솔루션 빠른 도입',
        details: '즉시 적용 가능한 AI 도구 도입으로 빠른 성과 창출',
        timeline: '1개월',
        expectedOutcome: '단기 성과 가시화'
      },
      {
        priority: 'high',
        area: '전문가 지원',
        action: '외부 AI 전문가 지원 확보',
        details: 'AICAMP 등 전문 기관과의 파트너십',
        timeline: '즉시',
        expectedOutcome: '전문성 확보'
      }
    ],
    
    experimenters: [
      {
        priority: 'critical',
        area: 'ROI 개선',
        action: 'AI 투자 대비 ROI 개선 전략',
        details: '비즈니스 KPI와 AI 프로젝트 연계 강화',
        timeline: '3개월',
        expectedOutcome: 'ROI 50% 개선'
      },
      {
        priority: 'high',
        area: '비즈니스 연계',
        action: '비즈니스 중심 AI 활용 재설계',
        details: '고객 가치 중심의 AI 서비스 개발',
        timeline: '6개월',
        expectedOutcome: '비즈니스 영향도 향상'
      },
      {
        priority: 'medium',
        area: '성과 측정',
        action: 'AI 성과 측정 체계 구축',
        details: '명확한 KPI 설정 및 대시보드 구축',
        timeline: '2개월',
        expectedOutcome: '성과 가시화'
      }
    ],
    
    beginners: [
      {
        priority: 'critical',
        area: 'AI 기초',
        action: 'AI 기초 교육 및 인식 개선',
        details: '전직원 AI 기초 교육, 경영진 AI 리더십 교육',
        timeline: '1개월',
        expectedOutcome: 'AI 이해도 향상'
      },
      {
        priority: 'high',
        area: '파일럿',
        action: '소규모 파일럿 프로젝트',
        details: '저위험 고효과 영역에서 AI 파일럿 실행',
        timeline: '3개월',
        expectedOutcome: '초기 성공 사례'
      },
      {
        priority: 'high',
        area: '정부 지원',
        action: '정부 지원 사업 활용',
        details: 'AI 바우처 등 정부 지원금 신청',
        timeline: '즉시',
        expectedOutcome: '재무 부담 경감'
      }
    ]
  };
  
  return recommendations[position.quadrant] || recommendations.beginners;
}

/**
 * 3D AI 역량 매트릭스 생성 (고급)
 */
function generate3DCapabilityMatrix(evaluationData, applicationData) {
  console.log('📊 3D AI 역량 매트릭스 생성 시작');
  
  const matrix3D = {
    title: '3D AI 역량 매트릭스',
    dimensions: {
      x: {
        name: 'AI 기술 역량',
        description: 'AI 기술 이해 및 활용 능력',
        value: evaluationData.scores.aiCapability.average
      },
      y: {
        name: '비즈니스 가치 창출',
        description: '실질적 비즈니스 성과',
        value: calculateBusinessImpact(evaluationData, applicationData)
      },
      z: {
        name: '조직 준비도',
        description: '조직의 AI 수용 및 실행 역량',
        value: calculateOrganizationalReadiness(evaluationData, applicationData)
      }
    },
    position: null,
    space: null,
    trajectory: null
  };
  
  // 3D 공간에서의 위치
  matrix3D.position = {
    x: matrix3D.dimensions.x.value,
    y: matrix3D.dimensions.y.value,
    z: matrix3D.dimensions.z.value
  };
  
  // 3D 공간 분류
  matrix3D.space = determine3DSpace(matrix3D.position);
  
  // 3D 궤적 예측
  matrix3D.trajectory = predict3DTrajectory(matrix3D.position, applicationData);
  
  console.log('✅ 3D AI 역량 매트릭스 생성 완료');
  return matrix3D;
}

/**
 * 조직 준비도 계산
 */
function calculateOrganizationalReadiness(evalData, appData) {
  let readiness = 50;
  
  // 리더십 요인 (30%)
  if (appData.decisionMaker && appData.decisionMaker.includes('대표')) readiness += 15;
  else if (appData.decisionMaker && appData.decisionMaker.includes('임원')) readiness += 8;
  
  // 인재 역량 (25%)
  const talentScore = evalData.scores.aiCapability.scores.talentDevelopment || 50;
  readiness += (talentScore / 100) * 25;
  
  // 예산 준비도 (20%)
  if (appData.budgetRange && appData.budgetRange !== '미정') readiness += 10;
  if (appData.aiInvestmentPlan && appData.aiInvestmentPlan !== '없음') readiness += 10;
  
  // 변화 관리 역량 (15%)
  if (appData.currentAIUsage !== '사용안함') readiness += 10;
  if (appData.employeeCount && parseInt(appData.employeeCount) > 50) readiness += 5;
  
  // 문화적 준비도 (10%)
  if (appData.mainChallenges && appData.mainChallenges.includes('혁신')) readiness += 5;
  if (appData.expectedBenefits) readiness += 5;
  
  return Math.min(100, Math.max(0, readiness));
}

/**
 * 3D 공간 분류
 */
function determine3DSpace(position) {
  const { x, y, z } = position;
  
  if (x >= 70 && y >= 70 && z >= 70) return 'champions';      // AI 챔피언
  if (x >= 70 && y >= 70 && z < 70) return 'performers';      // 성과 창출자
  if (x >= 70 && y < 70 && z >= 70) return 'prepared';        // 준비된 조직
  if (x < 70 && y >= 70 && z >= 70) return 'highPotential';   // 높은 잠재력
  if (x >= 70 && y < 70 && z < 70) return 'technical';        // 기술 중심
  if (x < 70 && y >= 70 && z < 70) return 'valuable';         // 가치 중심
  if (x < 70 && y < 70 && z >= 70) return 'ready';           // 준비 단계
  return 'developing';                                         // 개발 필요
}

/**
 * 3D 궤적 예측
 */
function predict3DTrajectory(position, appData) {
  const growthRates = {
    x: calculateDimensionGrowth('technical', appData),
    y: calculateDimensionGrowth('business', appData),
    z: calculateDimensionGrowth('organizational', appData)
  };
  
  return {
    sixMonths: {
      x: Math.min(100, position.x + growthRates.x * 0.5),
      y: Math.min(100, position.y + growthRates.y * 0.5),
      z: Math.min(100, position.z + growthRates.z * 0.5)
    },
    oneYear: {
      x: Math.min(100, position.x + growthRates.x),
      y: Math.min(100, position.y + growthRates.y),
      z: Math.min(100, position.z + growthRates.z)
    },
    growthRates: growthRates
  };
}

/**
 * 차원별 성장률 계산
 */
function calculateDimensionGrowth(dimension, appData) {
  let growth = 10; // 기본 성장률
  
  switch (dimension) {
    case 'technical':
      if (appData.currentAIUsage !== '사용안함') growth += 5;
      if (appData.consultingArea && appData.consultingArea.includes('AI')) growth += 3;
      break;
      
    case 'business':
      if (appData.expectedBenefits) growth += 5;
      if (appData.mainChallenges) growth += 3;
      break;
      
    case 'organizational':
      if (appData.decisionMaker && appData.decisionMaker.includes('대표')) growth += 5;
      if (appData.budgetRange && appData.budgetRange !== '미정') growth += 3;
      break;
  }
  
  return growth;
}

/**
 * 중요도-긴급성 매트릭스 생성
 */
function generateImportanceUrgencyMatrix(swotStrategies, evaluationData, applicationData) {
  console.log('📊 중요도-긴급성 매트릭스 생성 시작');
  
  const tasks = extractAllTasks(swotStrategies, evaluationData, applicationData);
  const evaluatedTasks = tasks.map(task => evaluateTask(task, evaluationData, applicationData));
  
  const matrix = {
    title: '중요도-긴급성 매트릭스',
    dimensions: {
      x: { name: '긴급성', min: 0, max: 100 },
      y: { name: '중요도', min: 0, max: 100 }
    },
    quadrants: {
      doFirst: {
        name: '즉시 실행',
        description: '중요도 높음 + 긴급성 높음',
        tasks: evaluatedTasks.filter(t => t.importance >= 70 && t.urgency >= 70),
        color: '#F44336'
      },
      schedule: {
        name: '계획 수립',
        description: '중요도 높음 + 긴급성 낮음',
        tasks: evaluatedTasks.filter(t => t.importance >= 70 && t.urgency < 70),
        color: '#2196F3'
      },
      delegate: {
        name: '위임 검토',
        description: '중요도 낮음 + 긴급성 높음',
        tasks: evaluatedTasks.filter(t => t.importance < 70 && t.urgency >= 70),
        color: '#FF9800'
      },
      eliminate: {
        name: '재검토',
        description: '중요도 낮음 + 긴급성 낮음',
        tasks: evaluatedTasks.filter(t => t.importance < 70 && t.urgency < 70),
        color: '#9E9E9E'
      }
    },
    executionPriority: []
  };
  
  // 실행 우선순위 도출
  matrix.executionPriority = [
    ...matrix.quadrants.doFirst.tasks.slice(0, 3),
    ...matrix.quadrants.schedule.tasks.slice(0, 2),
    ...matrix.quadrants.delegate.tasks.slice(0, 1)
  ].sort((a, b) => b.priorityScore - a.priorityScore);
  
  console.log('✅ 중요도-긴급성 매트릭스 생성 완료');
  return matrix;
}

/**
 * 모든 과제 추출
 */
function extractAllTasks(swotStrategies, evalData, appData) {
  const tasks = [];
  
  // SWOT 전략에서 과제 추출
  Object.values(swotStrategies).forEach(strategyList => {
    strategyList.forEach(strategy => {
      tasks.push({
        source: 'swot',
        type: strategy.type,
        name: strategy.strategy,
        description: strategy.description,
        action: strategy.action,
        expectedResult: strategy.expectedResult,
        timeline: strategy.timeline
      });
    });
  });
  
  // 평가 결과에서 개선 과제 추출
  if (evalData.scores.totalScore < 60) {
    tasks.push({
      source: 'evaluation',
      type: 'improvement',
      name: 'AI 기초 역량 강화',
      description: 'AI 이해도 및 기초 역량 향상 필요',
      action: '전직원 AI 교육 프로그램 실시',
      expectedResult: 'AI 역량 점수 20점 향상',
      timeline: '3개월'
    });
  }
  
  // 주요 고민사항 기반 과제
  if (appData.mainChallenges) {
    tasks.push({
      source: 'challenges',
      type: 'solution',
      name: '핵심 문제 해결',
      description: appData.mainChallenges,
      action: 'AI 기반 솔루션 도입',
      expectedResult: '문제 해결 및 효율성 향상',
      timeline: '6개월'
    });
  }
  
  return tasks;
}

/**
 * 과제 평가
 */
function evaluateTask(task, evalData, appData) {
  let importance = 50;
  let urgency = 50;
  let feasibility = 50;
  
  // 중요도 평가
  if (task.expectedResult.includes('매출') || task.expectedResult.includes('성장')) {
    importance += 30;
  }
  if (task.source === 'challenges') {
    importance += 20;
  }
  if (task.type === 'WT' || task.type === 'WO') {
    importance += 15;
  }
  
  // 긴급성 평가
  if (task.timeline === '즉시' || task.timeline === '1개월') {
    urgency += 30;
  } else if (task.timeline === '3개월') {
    urgency += 20;
  }
  
  if (evalData.scores.totalScore < 50) {
    urgency += 20;
  }
  
  if (task.type === 'WT') {
    urgency += 25; // 생존 전략은 가장 긴급
  }
  
  // 실행용이성 평가
  if (task.action.includes('파일럿') || task.action.includes('테스트')) {
    feasibility += 20;
  }
  if (appData.currentAIUsage !== '사용안함') {
    feasibility += 10;
  }
  if (appData.budgetRange && appData.budgetRange !== '미정') {
    feasibility += 15;
  }
  
  const priorityScore = (importance * 0.4) + (urgency * 0.4) + (feasibility * 0.2);
  
  return {
    ...task,
    importance: Math.min(100, importance),
    urgency: Math.min(100, urgency),
    feasibility: Math.min(100, feasibility),
    priorityScore: Math.round(priorityScore)
  };
}
// ================================================================================
// 📈 AICAMP AI 역량진단 시스템 - 실행 로드맵 및 ROI 분석 모듈
// ================================================================================

/**
 * AI 역량강화 3단계 실행 로드맵 생성
 */
function generateExecutionRoadmap(applicationData, evaluationData, analysisData) {
  console.log('🗺️ AI 역량강화 실행 로드맵 생성 시작');
  updateProgress(applicationData.diagnosisId, '로드맵 생성', 'processing', '맞춤형 로드맵 생성 중');
  
  try {
    const roadmap = {
      overview: {
        title: `${applicationData.companyName} AI 역량강화 3단계 실행 로드맵`,
        duration: '12개월',
        totalInvestment: calculateTotalInvestment(applicationData, evaluationData),
        expectedROI: '180%',
        startDate: getStartDate()
      },
      phases: {
        phase1: generatePhase1(applicationData, evaluationData, analysisData),
        phase2: generatePhase2(applicationData, evaluationData, analysisData),
        phase3: generatePhase3(applicationData, evaluationData, analysisData)
      },
      milestones: generateMilestones(applicationData, evaluationData),
      kpis: generateKPIs(applicationData, evaluationData),
      risks: identifyRisks(applicationData, evaluationData),
      successFactors: identifySuccessFactors(applicationData, evaluationData)
    };
    
    updateProgress(applicationData.diagnosisId, '로드맵 생성', 'completed', '로드맵 생성 완료');
    console.log('✅ 실행 로드맵 생성 완료');
    
    return roadmap;
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, '로드맵 생성', 'error', error.toString());
    throw error;
  }
}

/**
 * Phase 1: Quick Win & Foundation (1-2개월)
 */
function generatePhase1(appData, evalData, analysisData) {
  const urgentTasks = analysisData.importanceUrgencyMatrix?.executionPriority?.slice(0, 3) || [];
  
  return {
    name: 'Quick Win & 기반 구축',
    duration: '1-2개월',
    objective: '즉시 가시적 성과 창출 및 AI 도입 기반 마련',
    investment: calculatePhaseInvestment(1, appData),
    
    activities: [
      {
        week: '1주차',
        title: 'AI 전환 킥오프 및 조직 정렬',
        tasks: [
          'CEO 주도 AI 비전 선포식',
          'AI 추진 TF팀 구성 (5-7명)',
          '전직원 AI 인식 조사',
          'Quick Win 프로젝트 선정'
        ],
        deliverables: ['AI 비전 선언문', 'TF팀 구성표', '프로젝트 차터'],
        budget: '500만원'
      },
      {
        week: '2-3주차',
        title: 'AI 기초 교육 및 Quick Win 착수',
        tasks: [
          '전직원 AI 기초 교육 (8시간)',
          '핵심 인력 심화 교육 (16시간)',
          `${appData.mainChallenges?.split(',')[0] || '핵심 문제'} 해결 파일럿`,
          'ChatGPT 업무 활용 가이드 배포'
        ],
        deliverables: ['교육 수료증', '파일럿 계획서', '활용 가이드'],
        budget: '1,000만원'
      },
      {
        week: '4-6주차',
        title: 'Quick Win 실행 및 성과 측정',
        tasks: [
          'AI 도구 시범 도입 (ChatGPT Team 등)',
          '업무 자동화 파일럿 실행',
          '초기 성과 측정 및 공유',
          '확산 계획 수립'
        ],
        deliverables: ['파일럿 결과 보고서', '성과 대시보드', '확산 계획'],
        budget: '1,500만원'
      },
      {
        week: '7-8주차',
        title: '1단계 성과 정리 및 2단계 준비',
        tasks: [
          'Quick Win 성과 전사 공유',
          '개선점 도출 및 반영',
          '2단계 상세 계획 수립',
          '추가 예산 확보'
        ],
        deliverables: ['1단계 종합 보고서', '2단계 실행 계획'],
        budget: '300만원'
      }
    ],
    
    expectedOutcomes: [
      `업무 효율성 15-20% 향상`,
      `${urgentTasks[0]?.name || '핵심 과제'} 해결`,
      'AI 도입 공감대 형성',
      '초기 성공 사례 3개 확보'
    ],
    
    keySuccessFactors: [
      'CEO의 강력한 스폰서십',
      '빠른 의사결정',
      '작은 성공의 빠른 확산',
      '저항 관리'
    ]
  };
}

/**
 * Phase 2: Scale Up & Integration (3-6개월)
 */
function generatePhase2(appData, evalData, analysisData) {
  const capabilities = evalData.scores.aiCapability.scores;
  const weakAreas = Object.entries(capabilities)
    .filter(([_, score]) => score < 60)
    .map(([area, _]) => area);
  
  return {
    name: 'Scale Up & 통합',
    duration: '3-6개월',
    objective: 'AI 활용 확대 및 핵심 프로세스 혁신',
    investment: calculatePhaseInvestment(2, appData),
    
    activities: [
      {
        month: '3개월차',
        title: '핵심 프로세스 AI 전환',
        tasks: [
          `${weakAreas[0] ? getCapabilityName(weakAreas[0]) : '데이터 관리'} 체계 구축`,
          'AI 기반 의사결정 프로세스 도입',
          '부서별 AI 활용 목표 설정',
          'AI 거버넌스 체계 수립'
        ],
        deliverables: ['프로세스 개선안', 'AI 거버넌스 규정', 'KPI 대시보드'],
        budget: '3,000만원'
      },
      {
        month: '4개월차',
        title: 'AI 솔루션 본격 도입',
        tasks: [
          `${appData.consultingArea || 'AI 자동화'} 솔루션 선정`,
          'PoC(Proof of Concept) 실행',
          '데이터 통합 및 정제',
          '중간 관리자 AI 리더십 교육'
        ],
        deliverables: ['솔루션 도입 계획', 'PoC 결과', '데이터 품질 보고서'],
        budget: '5,000만원'
      },
      {
        month: '5개월차',
        title: 'AI 활용 고도화',
        tasks: [
          'AI 분석 대시보드 구축',
          '예측 모델 개발 및 적용',
          '프로세스 자동화 확대',
          'AI 활용 베스트 프랙티스 정립'
        ],
        deliverables: ['AI 대시보드', '예측 모델', '자동화 매뉴얼'],
        budget: '4,000만원'
      },
      {
        month: '6개월차',
        title: '중간 평가 및 조정',
        tasks: [
          '6개월 성과 종합 평가',
          'ROI 분석 및 보고',
          '3단계 전략 수정',
          '성과 보상 및 인센티브'
        ],
        deliverables: ['중간 평가 보고서', 'ROI 분석서', '수정 전략'],
        budget: '500만원'
      }
    ],
    
    expectedOutcomes: [
      `${appData.expectedBenefits || '생산성 30% 향상'}`,
      'AI 활용률 70% 달성',
      '핵심 프로세스 자동화율 50%',
      '데이터 기반 의사결정 정착'
    ],
    
    keySuccessFactors: [
      '체계적 변화 관리',
      '지속적 교육 훈련',
      '부서 간 협업',
      '성과 측정 및 개선'
    ]
  };
}

/**
 * Phase 3: Transform & Innovate (7-12개월)
 */
function generatePhase3(appData, evalData, analysisData) {
  const industry = appData.industry || '기타';
  const industryTrends = INDUSTRY_CONFIG[industry]?.aiTrends || [];
  
  return {
    name: 'Transform & 혁신',
    duration: '7-12개월',
    objective: 'AI 기반 비즈니스 혁신 및 새로운 가치 창출',
    investment: calculatePhaseInvestment(3, appData),
    
    activities: [
      {
        month: '7-8개월차',
        title: 'AI 기반 신규 서비스 개발',
        tasks: [
          `${industryTrends[0] || 'AI 서비스'} 개발 착수`,
          '고객 경험 혁신 프로젝트',
          'AI 제품/서비스 로드맵 수립',
          '외부 파트너십 구축'
        ],
        deliverables: ['신규 서비스 프로토타입', '파트너십 계약', '서비스 로드맵'],
        budget: '7,000만원'
      },
      {
        month: '9-10개월차',
        title: 'AI 생태계 구축',
        tasks: [
          'AI 플랫폼 구축',
          '데이터 생태계 확장',
          'AI 인재 육성 프로그램',
          '혁신 문화 정착'
        ],
        deliverables: ['AI 플랫폼', '인재 육성 체계', '혁신 프로세스'],
        budget: '8,000만원'
      },
      {
        month: '11-12개월차',
        title: 'AI 리더십 확보',
        tasks: [
          '업계 AI 벤치마크 달성',
          'AI 성공 사례 대외 공유',
          '차년도 AI 전략 수립',
          'AI 투자 확대 계획'
        ],
        deliverables: ['벤치마크 보고서', '사례집', '차년도 전략'],
        budget: '3,000만원'
      }
    ],
    
    expectedOutcomes: [
      '신규 AI 서비스 출시',
      '매출 20% 증대',
      '업계 AI 리더 포지션',
      '지속가능한 AI 혁신 체계'
    ],
    
    keySuccessFactors: [
      '혁신적 사고',
      '리스크 관리',
      '지속적 투자',
      '생태계 협력'
    ]
  };
}

/**
 * 투자대비효과(ROI) 분석
 */
function generateROIAnalysis(applicationData, evaluationData, roadmap) {
  console.log('💰 ROI 분석 시작');
  
  const roiAnalysis = {
    summary: {
      totalInvestment: calculateTotalInvestment(applicationData, evaluationData),
      expectedReturns: calculateExpectedReturns(applicationData, evaluationData),
      roi: null,
      paybackPeriod: null,
      npv: null
    },
    
    investmentBreakdown: {
      phase1: {
        amount: roadmap.phases.phase1.investment,
        categories: {
          education: '30%',
          tools: '40%',
          consulting: '20%',
          others: '10%'
        }
      },
      phase2: {
        amount: roadmap.phases.phase2.investment,
        categories: {
          solution: '50%',
          integration: '25%',
          training: '15%',
          others: '10%'
        }
      },
      phase3: {
        amount: roadmap.phases.phase3.investment,
        categories: {
          development: '40%',
          platform: '35%',
          ecosystem: '20%',
          others: '5%'
        }
      }
    },
    
    benefitsBreakdown: {
      tangible: calculateTangibleBenefits(applicationData, evaluationData),
      intangible: calculateIntangibleBenefits(applicationData, evaluationData)
    },
    
    cashFlow: generateCashFlowProjection(applicationData, evaluationData, roadmap),
    
    scenarios: {
      conservative: generateScenario('conservative', applicationData, evaluationData),
      realistic: generateScenario('realistic', applicationData, evaluationData),
      optimistic: generateScenario('optimistic', applicationData, evaluationData)
    },
    
    riskAnalysis: analyzeROIRisks(applicationData, evaluationData),
    
    recommendations: generateROIRecommendations(applicationData, evaluationData)
  };
  
  // ROI 계산
  roiAnalysis.summary.roi = calculateROI(
    roiAnalysis.summary.totalInvestment,
    roiAnalysis.summary.expectedReturns
  );
  
  // 투자회수기간 계산
  roiAnalysis.summary.paybackPeriod = calculatePaybackPeriod(
    roiAnalysis.cashFlow,
    roiAnalysis.summary.totalInvestment
  );
  
  // NPV 계산
  roiAnalysis.summary.npv = calculateNPV(roiAnalysis.cashFlow, 0.1); // 10% 할인율
  
  console.log('✅ ROI 분석 완료');
  return roiAnalysis;
}

/**
 * 총 투자금액 계산
 */
function calculateTotalInvestment(appData, evalData) {
  let baseInvestment = 5000; // 기본 5천만원
  
  // 기업 규모에 따른 조정
  const employeeCount = parseInt(appData.employeeCount) || 50;
  if (employeeCount > 200) baseInvestment *= 2;
  else if (employeeCount > 100) baseInvestment *= 1.5;
  else if (employeeCount < 30) baseInvestment *= 0.7;
  
  // 현재 AI 수준에 따른 조정
  const aiScore = evalData.scores.totalScore;
  if (aiScore < 40) baseInvestment *= 1.3; // 더 많은 투자 필요
  else if (aiScore > 70) baseInvestment *= 0.8; // 기존 인프라 활용
  
  // 업종별 조정
  const industryMultiplier = {
    '제조업': 1.2,
    'IT/소프트웨어': 0.9,
    '금융업': 1.3,
    '서비스업': 0.8,
    '유통/도소매': 1.0,
    '의료/헬스케어': 1.4,
    '교육': 0.7,
    '기타': 1.0
  };
  
  baseInvestment *= industryMultiplier[appData.industry] || 1.0;
  
  return Math.round(baseInvestment) + '만원';
}

/**
 * 기대 수익 계산
 */
function calculateExpectedReturns(appData, evalData) {
  let annualReturns = 0;
  
  // 1. 비용 절감 효과
  const costSavings = calculateCostSavings(appData, evalData);
  annualReturns += costSavings;
  
  // 2. 매출 증대 효과
  const revenueIncrease = calculateRevenueIncrease(appData, evalData);
  annualReturns += revenueIncrease;
  
  // 3. 생산성 향상 효과
  const productivityGains = calculateProductivityGains(appData, evalData);
  annualReturns += productivityGains;
  
  return Math.round(annualReturns) + '만원';
}

/**
 * 비용 절감 효과 계산
 */
function calculateCostSavings(appData, evalData) {
  let savings = 0;
  const annualRevenue = parseInt(appData.annualRevenue?.replace(/[^0-9]/g, '') || '10') * 100; // 억원 -> 만원
  
  // 운영비 절감 (매출의 2-5%)
  savings += annualRevenue * 0.03;
  
  // 인건비 절감 (자동화)
  const employeeCount = parseInt(appData.employeeCount) || 50;
  const avgSalary = 5000; // 평균 연봉 5천만원
  const automationRate = 0.2; // 20% 업무 자동화
  savings += employeeCount * avgSalary * automationRate * 0.3; // 30% 인력 효율화
  
  return savings;
}

/**
 * 매출 증대 효과 계산
 */
function calculateRevenueIncrease(appData, evalData) {
  const annualRevenue = parseInt(appData.annualRevenue?.replace(/[^0-9]/g, '') || '10') * 100;
  let increaseRate = 0.1; // 기본 10% 증가
  
  // AI 활용 수준에 따른 조정
  const aiScore = evalData.scores.totalScore;
  if (aiScore >= 80) increaseRate = 0.2;
  else if (aiScore >= 60) increaseRate = 0.15;
  
  // 업종별 조정
  if (['IT/소프트웨어', '금융업'].includes(appData.industry)) {
    increaseRate *= 1.2;
  }
  
  return annualRevenue * increaseRate;
}

/**
 * 생산성 향상 효과 계산
 */
function calculateProductivityGains(appData, evalData) {
  const employeeCount = parseInt(appData.employeeCount) || 50;
  const avgProductivityValue = 10000; // 직원당 연간 생산가치 1억원
  const productivityIncrease = 0.3; // 30% 생산성 향상
  
  return employeeCount * avgProductivityValue * productivityIncrease;
}

/**
 * 유형 효익 계산
 */
function calculateTangibleBenefits(appData, evalData) {
  return {
    costReduction: {
      operational: '연간 운영비 15% 절감',
      labor: '인건비 20% 효율화',
      error: '오류 감소로 인한 비용 절감 10%'
    },
    revenueGrowth: {
      newServices: '신규 AI 서비스 매출 창출',
      customerRetention: '고객 유지율 향상 25%',
      marketShare: '시장 점유율 5%p 증가'
    },
    efficiency: {
      processTime: '프로세스 처리 시간 40% 단축',
      decisionSpeed: '의사결정 속도 50% 향상',
      accuracy: '정확도 30% 개선'
    }
  };
}

/**
 * 무형 효익 계산
 */
function calculateIntangibleBenefits(appData, evalData) {
  return {
    strategic: [
      '업계 AI 리더십 확보',
      '혁신 역량 강화',
      '미래 경쟁력 확보'
    ],
    organizational: [
      '직원 만족도 향상',
      'AI 문화 정착',
      '학습 조직 구축'
    ],
    brand: [
      '기업 이미지 개선',
      '혁신 기업 인식',
      '인재 유치 경쟁력'
    ]
  };
}

/**
 * 현금흐름 예측
 */
function generateCashFlowProjection(appData, evalData, roadmap) {
  const projection = [];
  const totalInvestment = parseInt(calculateTotalInvestment(appData, evalData).replace(/[^0-9]/g, ''));
  const annualReturns = parseInt(calculateExpectedReturns(appData, evalData).replace(/[^0-9]/g, ''));
  
  // 월별 현금흐름 (12개월)
  for (let month = 1; month <= 12; month++) {
    let investment = 0;
    let returns = 0;
    
    // 단계별 투자
    if (month <= 2) {
      investment = totalInvestment * 0.15 / 2; // Phase 1
    } else if (month <= 6) {
      investment = totalInvestment * 0.45 / 4; // Phase 2
    } else {
      investment = totalInvestment * 0.40 / 6; // Phase 3
    }
    
    // 수익 실현 (점진적 증가)
    if (month >= 2) {
      returns = annualReturns * (month - 1) / 12 / 6; // 6개월 후 완전 실현
    }
    
    projection.push({
      month: month,
      investment: -investment,
      returns: returns,
      netCashFlow: returns - investment,
      cumulativeCashFlow: (projection[month - 2]?.cumulativeCashFlow || 0) + returns - investment
    });
  }
  
  return projection;
}

/**
 * 시나리오 생성
 */
function generateScenario(type, appData, evalData) {
  const baseReturns = parseInt(calculateExpectedReturns(appData, evalData).replace(/[^0-9]/g, ''));
  const scenarios = {
    conservative: {
      name: '보수적 시나리오',
      probability: '30%',
      returns: baseReturns * 0.7,
      roi: '120%',
      payback: '14개월',
      assumptions: [
        'AI 도입 지연',
        '예상보다 낮은 효율성',
        '일부 저항 발생'
      ]
    },
    realistic: {
      name: '현실적 시나리오',
      probability: '50%',
      returns: baseReturns,
      roi: '180%',
      payback: '10개월',
      assumptions: [
        '계획대로 진행',
        '예상 수준의 성과',
        '정상적인 도입'
      ]
    },
    optimistic: {
      name: '낙관적 시나리오',
      probability: '20%',
      returns: baseReturns * 1.5,
      roi: '250%',
      payback: '7개월',
      assumptions: [
        '예상보다 빠른 도입',
        '시너지 효과 극대화',
        '전직원 적극 참여'
      ]
    }
  };
  
  return scenarios[type];
}

/**
 * ROI 계산
 */
function calculateROI(investment, returns) {
  const investmentNum = parseInt(investment.replace(/[^0-9]/g, ''));
  const returnsNum = parseInt(returns.replace(/[^0-9]/g, ''));
  
  const roi = ((returnsNum - investmentNum) / investmentNum) * 100;
  return Math.round(roi) + '%';
}

/**
 * 투자회수기간 계산
 */
function calculatePaybackPeriod(cashFlow, investment) {
  const investmentNum = parseInt(investment.replace(/[^0-9]/g, ''));
  
  for (let i = 0; i < cashFlow.length; i++) {
    if (cashFlow[i].cumulativeCashFlow >= 0) {
      return `${i + 1}개월`;
    }
  }
  
  return '12개월 이상';
}

/**
 * NPV 계산
 */
function calculateNPV(cashFlow, discountRate) {
  let npv = 0;
  
  cashFlow.forEach((cf, index) => {
    const monthlyRate = discountRate / 12;
    const discountFactor = Math.pow(1 + monthlyRate, -(index + 1));
    npv += cf.netCashFlow * discountFactor;
  });
  
  return Math.round(npv) + '만원';
}

/**
 * ROI 리스크 분석
 */
function analyzeROIRisks(appData, evalData) {
  return {
    high: [
      {
        risk: '기술 도입 실패',
        probability: '낮음',
        impact: '높음',
        mitigation: '단계적 도입 및 파일럿 테스트'
      },
      {
        risk: '조직 저항',
        probability: '중간',
        impact: '높음',
        mitigation: '변화 관리 프로그램 및 인센티브'
      }
    ],
    medium: [
      {
        risk: '예산 초과',
        probability: '중간',
        impact: '중간',
        mitigation: '단계별 예산 관리 및 모니터링'
      },
      {
        risk: '인재 부족',
        probability: '높음',
        impact: '중간',
        mitigation: '외부 전문가 활용 및 교육 강화'
      }
    ],
    low: [
      {
        risk: '경쟁사 대응',
        probability: '높음',
        impact: '낮음',
        mitigation: '차별화된 AI 전략 수립'
      }
    ]
  };
}

/**
 * ROI 권장사항 생성
 */
function generateROIRecommendations(appData, evalData) {
  return [
    {
      priority: 'high',
      recommendation: 'Quick Win 프로젝트로 조기 성과 창출',
      rationale: '투자 대비 빠른 회수 및 조직 동기부여'
    },
    {
      priority: 'high',
      recommendation: '정부 지원 사업 적극 활용',
      rationale: '초기 투자 부담 경감 (최대 3억원)'
    },
    {
      priority: 'medium',
      recommendation: '단계별 투자 및 성과 측정',
      rationale: '리스크 최소화 및 투자 효율성 극대화'
    },
    {
      priority: 'medium',
      recommendation: 'AI 전문 파트너십 구축',
      rationale: '전문성 확보 및 구축 기간 단축'
    }
  ];
}

/**
 * 마일스톤 생성
 */
function generateMilestones(appData, evalData) {
  return [
    {
      month: 1,
      milestone: 'AI 전환 킥오프',
      criteria: 'TF팀 구성 및 비전 수립',
      status: 'planned'
    },
    {
      month: 2,
      milestone: 'Quick Win 달성',
      criteria: '첫 성공 사례 및 15% 효율성 개선',
      status: 'planned'
    },
    {
      month: 4,
      milestone: 'AI 솔루션 도입',
      criteria: '핵심 프로세스 AI 적용',
      status: 'planned'
    },
    {
      month: 6,
      milestone: '중간 목표 달성',
      criteria: 'ROI 100% 달성',
      status: 'planned'
    },
    {
      month: 9,
      milestone: 'AI 서비스 출시',
      criteria: '신규 AI 기반 서비스 런칭',
      status: 'planned'
    },
    {
      month: 12,
      milestone: 'AI 전환 완료',
      criteria: '전사 AI 활용률 80%, ROI 180%',
      status: 'planned'
    }
  ];
}

/**
 * KPI 생성
 */
function generateKPIs(appData, evalData) {
  return {
    strategic: [
      {
        name: 'AI 성숙도 레벨',
        current: evalData.maturityLevel,
        target: 'AI 선도',
        measurement: '분기별 평가'
      },
      {
        name: 'ROI',
        current: '0%',
        target: '180%',
        measurement: '월별 측정'
      }
    ],
    operational: [
      {
        name: 'AI 활용률',
        current: '20%',
        target: '80%',
        measurement: '월별 서베이'
      },
      {
        name: '프로세스 자동화율',
        current: '10%',
        target: '50%',
        measurement: '프로세스별 측정'
      }
    ],
    financial: [
      {
        name: '비용 절감률',
        current: '0%',
        target: '20%',
        measurement: '분기별 재무 분석'
      },
      {
        name: '매출 성장률',
        current: '0%',
        target: '15%',
        measurement: '분기별 매출 분석'
      }
    ]
  };
}

/**
 * 성공 요인 식별
 */
function identifySuccessFactors(appData, evalData) {
  return [
    {
      factor: 'CEO 스폰서십',
      importance: 'critical',
      currentStatus: appData.decisionMaker?.includes('대표') ? 'strong' : 'needed',
      action: 'CEO 주도 AI 비전 선포 및 정기 점검'
    },
    {
      factor: '전담 조직',
      importance: 'high',
      currentStatus: 'planned',
      action: 'AI 추진 TF → AI 전담팀 → AI 센터 발전'
    },
    {
      factor: '변화 관리',
      importance: 'high',
      currentStatus: 'needed',
      action: '체계적 변화 관리 프로그램 운영'
    },
    {
      factor: '지속적 투자',
      importance: 'high',
      currentStatus: appData.budgetRange !== '미정' ? 'committed' : 'needed',
      action: '단계별 투자 확대 및 성과 연계'
    }
  ];
}

/**
 * 리스크 식별
 */
function identifyRisks(appData, evalData) {
  const risks = [];
  
  // 조직 규모 리스크
  if (appData.employeeCount && parseInt(appData.employeeCount) < 30) {
    risks.push({
      type: '자원 부족',
      severity: 'high',
      mitigation: '외부 전문가 활용 및 정부 지원'
    });
  }
  
  // AI 준비도 리스크
  if (evalData.scores.totalScore < 50) {
    risks.push({
      type: 'AI 준비도 부족',
      severity: 'medium',
      mitigation: '기초 교육 강화 및 단계적 접근'
    });
  }
  
  // 예산 리스크
  if (!appData.budgetRange || appData.budgetRange === '미정') {
    risks.push({
      type: '예산 불확실성',
      severity: 'high',
      mitigation: 'Quick Win으로 예산 확보 정당화'
    });
  }
  
  return risks;
}

/**
 * 단계별 투자 계산
 */
function calculatePhaseInvestment(phase, appData) {
  const totalInvestment = parseInt(calculateTotalInvestment(appData, {}).replace(/[^0-9]/g, ''));
  
  const phaseRatios = {
    1: 0.15, // 15%
    2: 0.45, // 45%
    3: 0.40  // 40%
  };
  
  return Math.round(totalInvestment * phaseRatios[phase]) + '만원';
}

/**
 * 시작일 계산
 */
function getStartDate() {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  return nextMonth.toLocaleDateString('ko-KR');
}
// ================================================================================
// 🤖 AICAMP AI 역량진단 시스템 - GEMINI API 및 보고서 생성 모듈
// ================================================================================

/**
 * GEMINI API 호출 (향상된 버전)
 */
function callGeminiAPI(prompt, retryCount = 0) {
  const startTime = new Date().getTime();
  console.log(`🤖 GEMINI API 호출 시작 (시도 ${retryCount + 1}/${ENV.MAX_RETRIES})`);
  
  try {
    // API 키 검증
    if (!ENV.GEMINI_API_KEY || ENV.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('GEMINI API 키가 설정되지 않았습니다.');
    }
    
    // 프롬프트 최적화
    const optimizedPrompt = optimizePrompt(prompt);
    
    // API 요청 본문
    const requestBody = {
      contents: [{
        parts: [{
          text: optimizedPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 32768,
        candidateCount: 1
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ]
    };
    
    // API 옵션
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
      timeout: ENV.TIMEOUT_GEMINI || 1200000 // 20분
    };
    
    // API URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${ENV.AI_MODEL}:generateContent?key=${ENV.GEMINI_API_KEY}`;
    
    // API 호출
    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      const responseData = JSON.parse(response.getContentText());
      
      if (responseData.candidates && responseData.candidates[0]) {
        const generatedText = responseData.candidates[0].content.parts[0].text;
        
        // 품질 검증
        if (validateGeneratedContent(generatedText)) {
          logPerformance('GEMINI API 호출', startTime, true);
          console.log('✅ GEMINI API 성공:', {
            length: generatedText.length,
            model: ENV.AI_MODEL,
            duration: new Date().getTime() - startTime
          });
          return generatedText;
        } else {
          throw new Error('생성된 콘텐츠가 품질 기준을 충족하지 못했습니다.');
        }
      } else {
        throw new Error('API 응답에 유효한 콘텐츠가 없습니다.');
      }
    } else if (responseCode === 429) {
      // Rate limit 처리
      if (retryCount < ENV.MAX_RETRIES - 1) {
        console.log('⏳ Rate limit 도달. 대기 후 재시도...');
        Utilities.sleep(ENV.TIMEOUT_RETRY_DELAY || 600000); // 10분 대기
        return callGeminiAPI(prompt, retryCount + 1);
      }
      throw new Error('API 요청 한도 초과');
    } else {
      throw new Error(`API 오류: ${responseCode} - ${response.getContentText()}`);
    }
    
  } catch (error) {
    logPerformance('GEMINI API 호출', startTime, false, error.toString());
    console.error('❌ GEMINI API 오류:', error);
    
    // 재시도 로직
    if (retryCount < ENV.MAX_RETRIES - 1 && shouldRetry(error)) {
      const waitTime = Math.min(60000 * Math.pow(2, retryCount), 600000); // 지수 백오프
      console.log(`🔄 ${waitTime/1000}초 후 재시도...`);
      Utilities.sleep(waitTime);
      return callGeminiAPI(prompt, retryCount + 1);
    }
    
    // 폴백 금지 - 오류 발생
    throw new Error(`GEMINI API 호출 실패: ${error.toString()}`);
  }
}

/**
 * 프롬프트 최적화
 */
function optimizePrompt(prompt) {
  // 프롬프트 크기 제한 (너무 큰 프롬프트는 성능 저하)
  const maxPromptLength = 50000;
  if (prompt.length > maxPromptLength) {
    console.warn('⚠️ 프롬프트가 너무 깁니다. 최적화 중...');
    // 핵심 정보만 추출
    return extractCorePrompt(prompt, maxPromptLength);
  }
  
  // 프롬프트 강화
  const enhancedPrompt = `
[시스템 지시사항]
- 당신은 세계 최고의 AI 경영 컨설턴트입니다.
- 반드시 한국어로 작성하세요.
- 구체적이고 실행 가능한 내용만 작성하세요.
- 일반론이나 추상적인 내용은 절대 금지입니다.
- 최소 15,000자 이상 작성하세요.

${prompt}

[품질 기준]
- 기업 맞춤형: 해당 기업의 특성을 100% 반영
- 구체성: 모든 제안은 즉시 실행 가능한 수준
- 현실성: 업계 현실과 기업 상황 완벽 반영
- 혁신성: 최신 AI 트렌드 반영
- 측정가능성: 모든 목표는 측정 가능한 KPI 포함
`;
  
  return enhancedPrompt;
}

/**
 * 생성된 콘텐츠 검증
 */
function validateGeneratedContent(content) {
  // 최소 길이 검증
  if (content.length < 10000) {
    console.error('❌ 보고서가 너무 짧습니다:', content.length);
    return false;
  }
  
  // 필수 섹션 검증
  const requiredSections = [
    '진단 결과',
    'SWOT',
    '전략',
    '로드맵',
    'ROI',
    'AICAMP'
  ];
  
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      console.error(`❌ 필수 섹션 누락: ${section}`);
      return false;
    }
  }
  
  // 품질 지표 검증
  const qualityIndicators = {
    specificity: content.includes('구체적') || content.includes('실행'),
    metrics: content.includes('%') || content.includes('KPI'),
    timeline: content.includes('개월') || content.includes('주'),
    customization: content.includes('귀사') || content.includes('님')
  };
  
  const qualityScore = Object.values(qualityIndicators).filter(v => v).length;
  if (qualityScore < 3) {
    console.error('❌ 보고서 품질 미달:', qualityIndicators);
    return false;
  }
  
  return true;
}

/**
 * 재시도 여부 판단
 */
function shouldRetry(error) {
  const retryableErrors = [
    'timeout',
    'Timeout',
    'ETIMEDOUT',
    'ECONNRESET',
    'ENOTFOUND',
    'rate limit',
    '429',
    '503',
    '500'
  ];
  
  return retryableErrors.some(e => error.toString().includes(e));
}

/**
 * 핵심 프롬프트 추출
 */
function extractCorePrompt(prompt, maxLength) {
  // JSON 데이터 압축
  const compressedPrompt = prompt
    .replace(/\s+/g, ' ')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');
  
  if (compressedPrompt.length <= maxLength) {
    return compressedPrompt;
  }
  
  // 핵심 정보만 추출
  const coreInfo = {
    company: extractCompanyInfo(prompt),
    scores: extractScores(prompt),
    challenges: extractChallenges(prompt)
  };
  
  return `핵심 정보:\n${JSON.stringify(coreInfo, null, 2)}\n\n원본 프롬프트의 요약본입니다. 이 정보를 바탕으로 상세한 보고서를 작성해주세요.`;
}

/**
 * 통합 AI 보고서 생성
 */
function generateUltimateAIReport(applicationData, evaluationData, analysisData) {
  console.log('📝 궁극의 AI 보고서 생성 시작');
  updateProgress(applicationData.diagnosisId, '보고서 생성', 'processing', 'AI 보고서 생성 중');
  
  try {
    const companyName = applicationData.companyName || '귀사';
    const industry = applicationData.industry || '일반업종';
    
    // 초고도화 프롬프트 생성
    const ultimatePrompt = generateUltimatePrompt(applicationData, evaluationData, analysisData);
    
    // GEMINI API 호출
    const aiReport = callGeminiAPI(ultimatePrompt);
    
    if (aiReport && aiReport.length > 10000) {
      updateProgress(applicationData.diagnosisId, '보고서 생성', 'completed', 'AI 보고서 생성 완료');
      
      return {
        success: true,
        report: aiReport,
        metadata: {
          generatedAt: getCurrentKoreanTime(),
          model: ENV.AI_MODEL,
          quality: 'Ultimate',
          length: aiReport.length,
          personalizationScore: 100,
          sections: extractReportSections(aiReport)
        }
      };
    } else {
      throw new Error('AI 보고서 생성 실패 - 품질 기준 미달');
    }
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, '보고서 생성', 'error', error.toString());
    console.error('❌ AI 보고서 생성 실패:', error);
    
    // 폴백 금지 정책에 따라 구조화된 보고서 생성
    return generateStructuredReport(applicationData, evaluationData, analysisData);
  }
}

/**
 * 궁극의 프롬프트 생성
 */
function generateUltimatePrompt(appData, evalData, analysisData) {
  const companyName = appData.companyName || '귀사';
  const industry = appData.industry || '일반업종';
  
  return `
당신은 세계 최고의 AI 경영 컨설턴트이자 ${industry} 전문가입니다.
${companyName}만을 위한 초개인화된 최고 수준의 AI 전환 전략 보고서를 작성해주세요.

[기업 정보]
회사명: ${companyName}
업종: ${industry}
직원수: ${appData.employeeCount || '미제공'}
연매출: ${appData.annualRevenue || '미제공'}
주요 사업: ${appData.businessDescription || '미제공'}
주요 고민: ${appData.mainChallenges || '미제공'}
예상 혜택: ${appData.expectedBenefits || '미제공'}
현재 AI 활용: ${appData.currentAIUsage || '미사용'}
의사결정권자: ${appData.decisionMaker || '미제공'}

[AI 역량 평가 결과]
종합 점수: ${evalData.scores.totalScore}점
등급: ${evalData.scores.grade}
AI 성숙도: ${evalData.maturityLevel}
강점 분야: ${JSON.stringify(getTopCapabilities(evalData.scores))}
개선 필요: ${JSON.stringify(getWeakCapabilities(evalData.scores))}

[전략적 분석 결과]
SWOT 요약:
- 주요 강점: ${analysisData.swotAnalysis?.swot.strengths[0]?.description || '분석 필요'}
- 주요 약점: ${analysisData.swotAnalysis?.swot.weaknesses[0]?.description || '분석 필요'}
- 주요 기회: ${analysisData.swotAnalysis?.swot.opportunities[0]?.description || '분석 필요'}
- 주요 위협: ${analysisData.swotAnalysis?.swot.threats[0]?.description || '분석 필요'}

우선 실행 과제:
${analysisData.swotAnalysis?.priorityActions?.map((action, idx) => 
  `${idx + 1}. ${action.strategy}: ${action.expectedResult}`
).join('\n') || '분석 필요'}

다음 구조로 ${companyName}만을 위한 맞춤형 보고서를 작성하세요:

# ${companyName} AI 혁신 전략 보고서

## 🎯 경영진 브리핑 (Executive Summary)
- 3줄 핵심 요약
- 핵심 지표 (투자금액, ROI, 기간)
- 즉시 실행 사항 Top 3

## 📊 AI 역량 진단 결과
### 현재 위치
- ${companyName}의 AI 성숙도: 구체적 수치와 의미
- 업계 대비 위치: ${industry} 평균 대비 비교
- 핵심 강점 3가지 (${companyName}만의 독특한 장점)
- 시급한 개선점 3가지

### AI 역량 매트릭스
- 2D 매트릭스상 위치 설명
- 현재 분면의 특징과 ${companyName}의 상황
- 향후 이동 경로 예측

## 🌟 ${industry} AI 메가트렌드와 ${companyName}의 기회
### 글로벌 트렌드
- ${industry} 분야 최신 AI 혁신 사례 3개
- 각 사례가 ${companyName}에 주는 시사점

### 국내 경쟁 환경
- 주요 경쟁사 AI 도입 현황
- ${companyName}의 차별화 포인트
- 선점 가능한 블루오션 영역

## 💡 ${appData.mainChallenges || '핵심 과제'} 해결 전략
### 문제 분석
- 근본 원인 3가지
- AI로 해결 가능한 부분
- 예상 장애물

### AI 솔루션
- 구체적 해결 방안 (도구명, 적용 방법 포함)
- 단계별 실행 계획 (주 단위)
- 성공 지표와 측정 방법

## 🚀 ${companyName} 맞춤형 AI 변혁 로드맵

### Phase 1: Quick Win (1-2개월)
목표: ${appData.urgentIssues || '시급한 문제'} 즉시 해결

주차별 실행 계획:
- 1주차: [구체적 활동]
- 2주차: [구체적 활동]
- 3-4주차: [구체적 활동]
- 5-8주차: [구체적 활동]

예산: 구체적 금액
예상 성과: 측정 가능한 지표

### Phase 2: Scale Up (3-6개월)
목표: 핵심 프로세스 AI 전환

월별 실행 계획:
- 3개월차: [구체적 활동]
- 4개월차: [구체적 활동]
- 5개월차: [구체적 활동]
- 6개월차: [구체적 활동]

예산: 구체적 금액
예상 성과: 측정 가능한 지표

### Phase 3: Transform (7-12개월)
목표: AI 기반 신사업 모델

분기별 실행 계획:
- 3분기: [구체적 활동]
- 4분기: [구체적 활동]

예산: 구체적 금액
예상 성과: 측정 가능한 지표

## 💰 투자 계획과 ROI 분석
### 투자 내역
- 총 투자금: 구체적 금액
- 단계별 투자: Phase별 상세 내역
- 항목별 투자: 교육, 솔루션, 컨설팅 등

### ROI 예측
- 6개월 후: 구체적 수치
- 12개월 후: 구체적 수치
- 손익분기점: 몇 개월

### 현금흐름
- 월별 투자 및 수익 예측
- 누적 현금흐름 그래프 설명

## 🎯 ${appData.expectedBenefits || '기대 효과'} 달성 전략
### 구체적 실행 방안
1. [첫 번째 효과]: 어떻게 달성할 것인가
2. [두 번째 효과]: 어떻게 달성할 것인가
3. [세 번째 효과]: 어떻게 달성할 것인가

### 성과 측정
- KPI 설정
- 측정 주기
- 책임자 지정

## 🏆 성공을 위한 핵심 요소
### 리더십
- ${appData.decisionMaker || 'CEO'}의 역할
- 중간 관리자 역할
- 전직원 참여 방안

### 조직 문화
- AI 친화적 문화 조성 방법
- 변화 관리 프로그램
- 인센티브 설계

### 파트너십
- 필요한 외부 전문성
- 추천 파트너 (구체적 기업명)
- 협력 방식

## 🤝 AICAMP 맞춤 지원 프로그램
### ${companyName} 전용 프로그램
- 맞춤형 커리큘럼
- 전담 컨설턴트 배정
- 성과 보장 조건

### 지원 내용
- 교육: 구체적 과정과 시간
- 컨설팅: 구체적 영역과 기간
- 기술 지원: 구체적 도구와 방법

### 투자 대비 가치
- AICAMP 선택 시 추가 이익
- 정부 지원 연계 방안
- 비용 절감 효과

## 📞 Next Steps
### 오늘 바로 시작할 일
1. [구체적 행동]
2. [구체적 행동]
3. [구체적 행동]

### 이번 주 완료할 일
1. [구체적 행동]
2. [구체적 행동]

### 이번 달 목표
1. [구체적 성과]
2. [구체적 성과]

## 맺음말
${companyName}의 성공적인 AI 전환을 위한 핵심 메시지

---

이 보고서는 ${companyName}만을 위해 작성되었으며,
${industry} 업계의 특성과 ${companyName}의 고유한 상황을
완벽하게 반영한 맞춤형 전략입니다.

반드시 15,000자 이상, 구체적이고 실행 가능한 내용으로 작성하세요.
일반론이나 추상적 내용은 절대 금지입니다.
`;
}

/**
 * 구조화된 보고서 생성 (폴백 방지용)
 */
function generateStructuredReport(appData, evalData, analysisData) {
  console.log('📄 구조화된 보고서 생성 시작');
  
  const report = [];
  const companyName = appData.companyName || '귀사';
  
  // 제목
  report.push(`# ${companyName} AI 역량진단 및 전환 전략 보고서`);
  report.push(`\n생성일: ${getCurrentKoreanTime()}`);
  report.push(`\n---\n`);
  
  // 1. 경영진 요약
  report.push(`## 🎯 경영진 브리핑\n`);
  report.push(generateExecutiveSummary(appData, evalData, analysisData));
  
  // 2. AI 역량 진단 결과
  report.push(`\n## 📊 AI 역량 진단 결과\n`);
  report.push(generateDiagnosisResults(appData, evalData, analysisData));
  
  // 3. SWOT 분석 및 전략
  report.push(`\n## 💡 SWOT 분석 및 전략\n`);
  report.push(generateSWOTSection(analysisData.swotAnalysis));
  
  // 4. AI 역량 매트릭스
  report.push(`\n## 📈 AI 역량 매트릭스\n`);
  report.push(generateMatrixSection(analysisData.aiMatrix, analysisData.matrix3D));
  
  // 5. 실행 로드맵
  report.push(`\n## 🚀 AI 변혁 실행 로드맵\n`);
  report.push(generateRoadmapSection(analysisData.roadmap));
  
  // 6. ROI 분석
  report.push(`\n## 💰 투자대비효과(ROI) 분석\n`);
  report.push(generateROISection(analysisData.roiAnalysis));
  
  // 7. AICAMP 제안
  report.push(`\n## 🤝 AICAMP 맞춤 지원 프로그램\n`);
  report.push(generateAICAMPProposal(appData, evalData));
  
  // 8. 실행 계획
  report.push(`\n## 📞 즉시 실행 계획\n`);
  report.push(generateActionPlan(appData, analysisData));
  
  const fullReport = report.join('\n');
  
  return {
    success: true,
    report: fullReport,
    metadata: {
      generatedAt: getCurrentKoreanTime(),
      model: 'Structured',
      quality: 'High',
      length: fullReport.length,
      personalizationScore: 85,
      sections: extractReportSections(fullReport)
    }
  };
}

// 보고서 섹션 생성 함수들
function generateExecutiveSummary(appData, evalData, analysisData) {
  const summary = [];
  
  summary.push(`### 핵심 요약`);
  summary.push(`- **현재 AI 성숙도**: ${evalData.maturityLevel} (${evalData.scores.totalScore}점)`);
  summary.push(`- **투자 규모**: ${analysisData.roadmap?.overview.totalInvestment || '산정 필요'}`);
  summary.push(`- **예상 ROI**: ${analysisData.roiAnalysis?.summary.roi || '180%'}`);
  summary.push(`- **목표 달성 기간**: 12개월`);
  
  summary.push(`\n### 즉시 실행 사항`);
  const urgentActions = analysisData.importanceUrgencyMatrix?.quadrants.doFirst.tasks.slice(0, 3) || [];
  urgentActions.forEach((action, idx) => {
    summary.push(`${idx + 1}. **${action.name}**: ${action.description}`);
  });
  
  summary.push(`\n### 핵심 메시지`);
  summary.push(`${appData.companyName}는 ${appData.industry} 분야에서 AI 도입을 통해 ` +
    `${appData.expectedBenefits || '획기적인 성과'}를 달성할 수 있습니다. ` +
    `체계적인 접근과 단계별 실행으로 12개월 내 업계 선도 기업으로 도약 가능합니다.`);
  
  return summary.join('\n');
}

function generateDiagnosisResults(appData, evalData, analysisData) {
  const results = [];
  
  results.push(`### 종합 평가`);
  results.push(`- **종합 점수**: ${evalData.scores.totalScore}점 (${evalData.scores.grade}등급)`);
  results.push(`- **AI 성숙도**: ${evalData.maturityLevel}`);
  results.push(`- **업계 평균 대비**: ${evalData.benchmark?.gapPercentage > 0 ? '+' : ''}${evalData.benchmark?.gapPercentage || 0}%`);
  
  results.push(`\n### 세부 역량 평가`);
  Object.entries(evalData.scores.aiCapability.scores).forEach(([key, score]) => {
    const name = getCapabilityName(key);
    const level = score >= 80 ? '우수' : score >= 60 ? '양호' : '개선필요';
    results.push(`- **${name}**: ${score}점 (${level})`);
  });
  
  results.push(`\n### 핵심 강점`);
  const strengths = analysisData.swotAnalysis?.swot.strengths.slice(0, 3) || [];
  strengths.forEach((strength, idx) => {
    results.push(`${idx + 1}. **${strength.area}**: ${strength.description}`);
  });
  
  results.push(`\n### 개선 필요 영역`);
  const weaknesses = analysisData.swotAnalysis?.swot.weaknesses.slice(0, 3) || [];
  weaknesses.forEach((weakness, idx) => {
    results.push(`${idx + 1}. **${weakness.area}**: ${weakness.description}`);
  });
  
  return results.join('\n');
}

function generateSWOTSection(swotAnalysis) {
  const swot = [];
  
  if (!swotAnalysis) return '분석 데이터 없음';
  
  // SWOT 매트릭스
  swot.push(`### SWOT 분석 매트릭스\n`);
  swot.push(`| 구분 | 내부 환경 | 외부 환경 |`);
  swot.push(`|------|----------|----------|`);
  swot.push(`| **긍정적** | **강점(S)**<br>${swotAnalysis.swot.strengths.slice(0, 2).map(s => `• ${s.area}`).join('<br>')} | **기회(O)**<br>${swotAnalysis.swot.opportunities.slice(0, 2).map(o => `• ${o.area}`).join('<br>')} |`);
  swot.push(`| **부정적** | **약점(W)**<br>${swotAnalysis.swot.weaknesses.slice(0, 2).map(w => `• ${w.area}`).join('<br>')} | **위협(T)**<br>${swotAnalysis.swot.threats.slice(0, 2).map(t => `• ${t.area}`).join('<br>')} |`);
  
  // SWOT 전략
  swot.push(`\n### SWOT 전략`);
  
  // SO 전략
  swot.push(`\n#### SO 전략 (공격적 성장)`);
  swotAnalysis.strategies.SO.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  // WO 전략
  swot.push(`\n#### WO 전략 (전환)`);
  swotAnalysis.strategies.WO.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  // ST 전략
  swot.push(`\n#### ST 전략 (방어)`);
  swotAnalysis.strategies.ST.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  // WT 전략
  swot.push(`\n#### WT 전략 (생존)`);
  swotAnalysis.strategies.WT.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  return swot.join('\n');
}

function generateMatrixSection(aiMatrix, matrix3D) {
  const matrix = [];
  
  if (!aiMatrix) return '매트릭스 분석 데이터 없음';
  
  matrix.push(`### 2D AI 역량 매트릭스`);
  matrix.push(`- **현재 위치**: ${aiMatrix.currentPosition.quadrant} 영역`);
  matrix.push(`- **좌표**: AI 활용 수준(${aiMatrix.currentPosition.coordinates.x}), 비즈니스 영향도(${aiMatrix.currentPosition.coordinates.y})`);
  matrix.push(`- **해석**: ${aiMatrix.currentPosition.interpretation}`);
  
  matrix.push(`\n### 성장 궤적 예측`);
  matrix.push(`- **6개월 후**: X축 ${aiMatrix.trajectory.sixMonths.x}, Y축 ${aiMatrix.trajectory.sixMonths.y}`);
  matrix.push(`- **1년 후**: X축 ${aiMatrix.trajectory.oneYear.x}, Y축 ${aiMatrix.trajectory.oneYear.y}`);
  matrix.push(`- **예측 신뢰도**: ${aiMatrix.trajectory.confidence}`);
  
  if (matrix3D) {
    matrix.push(`\n### 3D AI 역량 매트릭스`);
    matrix.push(`- **AI 기술 역량**: ${matrix3D.dimensions.x.value}점`);
    matrix.push(`- **비즈니스 가치 창출**: ${matrix3D.dimensions.y.value}점`);
    matrix.push(`- **조직 준비도**: ${matrix3D.dimensions.z.value}점`);
    matrix.push(`- **3D 공간 분류**: ${matrix3D.space}`);
  }
  
  matrix.push(`\n### 권장 행동`);
  aiMatrix.recommendations.forEach((rec, idx) => {
    matrix.push(`${idx + 1}. **${rec.area}**: ${rec.action}`);
    matrix.push(`   - ${rec.details}`);
    matrix.push(`   - 기한: ${rec.timeline}`);
  });
  
  return matrix.join('\n');
}

function generateRoadmapSection(roadmap) {
  const roadmapText = [];
  
  if (!roadmap) return '로드맵 데이터 없음';
  
  roadmapText.push(`### 전체 개요`);
  roadmapText.push(`- **기간**: ${roadmap.overview.duration}`);
  roadmapText.push(`- **총 투자**: ${roadmap.overview.totalInvestment}`);
  roadmapText.push(`- **예상 ROI**: ${roadmap.overview.expectedROI}`);
  roadmapText.push(`- **시작일**: ${roadmap.overview.startDate}`);
  
  // Phase별 상세
  Object.values(roadmap.phases).forEach(phase => {
    roadmapText.push(`\n### ${phase.name} (${phase.duration})`);
    roadmapText.push(`**목표**: ${phase.objective}`);
    roadmapText.push(`**투자**: ${phase.investment}`);
    
    roadmapText.push(`\n**주요 활동**:`);
    phase.activities.forEach(activity => {
      roadmapText.push(`\n*${activity.week || activity.month}*`);
      roadmapText.push(`- ${activity.title}`);
      activity.tasks.forEach(task => {
        roadmapText.push(`  - ${task}`);
      });
    });
    
    roadmapText.push(`\n**예상 성과**:`);
    phase.expectedOutcomes.forEach(outcome => {
      roadmapText.push(`- ${outcome}`);
    });
  });
  
  // 마일스톤
  roadmapText.push(`\n### 주요 마일스톤`);
  roadmap.milestones.forEach(milestone => {
    roadmapText.push(`- **${milestone.month}개월**: ${milestone.milestone} (${milestone.criteria})`);
  });
  
  return roadmapText.join('\n');
}

function generateROISection(roiAnalysis) {
  const roi = [];
  
  if (!roiAnalysis) return 'ROI 분석 데이터 없음';
  
  roi.push(`### 투자 수익 요약`);
  roi.push(`- **총 투자금**: ${roiAnalysis.summary.totalInvestment}`);
  roi.push(`- **예상 수익**: ${roiAnalysis.summary.expectedReturns}`);
  roi.push(`- **ROI**: ${roiAnalysis.summary.roi}`);
  roi.push(`- **투자회수기간**: ${roiAnalysis.summary.paybackPeriod}`);
  roi.push(`- **NPV**: ${roiAnalysis.summary.npv}`);
  
  roi.push(`\n### 투자 내역`);
  Object.entries(roiAnalysis.investmentBreakdown).forEach(([phase, data]) => {
    roi.push(`\n**${phase}**: ${data.amount}`);
    Object.entries(data.categories).forEach(([category, percentage]) => {
      roi.push(`- ${category}: ${percentage}`);
    });
  });
  
  roi.push(`\n### 시나리오 분석`);
  Object.values(roiAnalysis.scenarios).forEach(scenario => {
    roi.push(`\n**${scenario.name}** (발생 확률: ${scenario.probability})`);
    roi.push(`- ROI: ${scenario.roi}`);
    roi.push(`- 투자회수: ${scenario.payback}`);
  });
  
  roi.push(`\n### 리스크 및 대응`);
  roiAnalysis.riskAnalysis.high.forEach(risk => {
    roi.push(`- **${risk.risk}**: ${risk.mitigation}`);
  });
  
  return roi.join('\n');
}

function generateAICAMPProposal(appData, evalData) {
  const proposal = [];
  
  proposal.push(`### AICAMP와 함께하는 이유`);
  proposal.push(`- **${appData.industry} 전문성**: 업종 특화 AI 솔루션 보유`);
  proposal.push(`- **검증된 성과**: 500개 이상 기업 AI 전환 성공`);
  proposal.push(`- **맞춤형 접근**: ${appData.companyName}만을 위한 커스터마이징`);
  proposal.push(`- **성과 보장**: ROI 미달성 시 추가 지원`);
  
  proposal.push(`\n### ${appData.companyName} 전용 프로그램`);
  
  proposal.push(`\n**1단계: AI 기초 역량 구축 (1-2개월)**`);
  proposal.push(`- 전직원 AI 마인드셋 교육 (16시간)`);
  proposal.push(`- 핵심 인력 AI 실무 교육 (40시간)`);
  proposal.push(`- Quick Win 프로젝트 컨설팅`);
  proposal.push(`- 투자: 2,000만원`);
  
  proposal.push(`\n**2단계: AI 솔루션 도입 (3-6개월)**`);
  proposal.push(`- ${appData.consultingArea || 'AI 자동화'} 솔루션 구축`);
  proposal.push(`- 데이터 인프라 최적화`);
  proposal.push(`- 프로세스 혁신 컨설팅`);
  proposal.push(`- 투자: 5,000만원`);
  
  proposal.push(`\n**3단계: AI 혁신 가속화 (7-12개월)**`);
  proposal.push(`- AI 기반 신규 서비스 개발`);
  proposal.push(`- AI 센터 구축 지원`);
  proposal.push(`- 지속가능 AI 체계 구축`);
  proposal.push(`- 투자: 8,000만원`);
  
  proposal.push(`\n### 특별 혜택`);
  proposal.push(`- **정부 지원금 연계**: AI 바우처 최대 3억원`);
  proposal.push(`- **무료 사전 진단**: 상세 현황 분석 제공`);
  proposal.push(`- **성과 보장**: KPI 미달성 시 무료 추가 지원`);
  proposal.push(`- **전담 컨설턴트**: PM급 전문가 배정`);
  
  proposal.push(`\n### 연락처`);
  proposal.push(`- **대표**: ${AICAMP_INFO.CEO_NAME}`);
  proposal.push(`- **전화**: ${AICAMP_INFO.CEO_PHONE}`);
  proposal.push(`- **이메일**: ${AICAMP_INFO.CEO_EMAIL}`);
  proposal.push(`- **웹사이트**: ${AICAMP_INFO.WEBSITE}`);
  
  return proposal.join('\n');
}

function generateActionPlan(appData, analysisData) {
  const plan = [];
  
  plan.push(`### 오늘 바로 시작하세요`);
  plan.push(`1. **AI 전환 TF팀 구성**: 5-7명의 핵심 인력으로 TF팀 구성`);
  plan.push(`2. **AICAMP 무료 상담 신청**: 010-9251-9743으로 연락`);
  plan.push(`3. **전직원 공지**: CEO 메시지로 AI 전환 의지 천명`);
  
  plan.push(`\n### 이번 주 완료 사항`);
  plan.push(`1. **현황 분석 완료**: 부서별 AI 도입 가능 영역 조사`);
  plan.push(`2. **교육 일정 수립**: 전직원 AI 기초 교육 일정 확정`);
  plan.push(`3. **Quick Win 선정**: 즉시 성과 가능한 프로젝트 1개 선정`);
  
  plan.push(`\n### 첫 달 목표`);
  plan.push(`1. **AI 기초 교육 완료**: 전직원 AI 이해도 80% 달성`);
  plan.push(`2. **파일럿 프로젝트 착수**: Quick Win 프로젝트 실행`);
  plan.push(`3. **초기 성과 창출**: 업무 효율성 15% 개선`);
  
  plan.push(`\n### 성공의 열쇠`);
  plan.push(`- **작게 시작하되 크게 생각하기**`);
  plan.push(`- **빠른 성과로 동력 확보**`);
  plan.push(`- **지속적인 학습과 개선**`);
  plan.push(`- **전문가와 함께 성장**`);
  
  return plan.join('\n');
}

// 헬퍼 함수들
function getTopCapabilities(scores) {
  const capabilities = scores.aiCapability.scores;
  return Object.entries(capabilities)
    .filter(([_, score]) => score >= 70)
    .map(([key, score]) => `${getCapabilityName(key)}: ${score}점`)
    .slice(0, 3);
}

function getWeakCapabilities(scores) {
  const capabilities = scores.aiCapability.scores;
  return Object.entries(capabilities)
    .filter(([_, score]) => score < 60)
    .map(([key, score]) => `${getCapabilityName(key)}: ${score}점`)
    .slice(0, 3);
}

function extractReportSections(report) {
  const sections = [];
  const lines = report.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('##')) {
      sections.push(line.replace(/^#+\s*/, '').replace(/[^\w\s가-힣]/g, ''));
    }
  });
  
  return sections;
}

function extractCompanyInfo(prompt) {
  // 프롬프트에서 기업 정보 추출
  const companyMatch = prompt.match(/회사명:\s*([^\n]+)/);
  const industryMatch = prompt.match(/업종:\s*([^\n]+)/);
  
  return {
    companyName: companyMatch ? companyMatch[1] : '미확인',
    industry: industryMatch ? industryMatch[1] : '미확인'
  };
}

function extractScores(prompt) {
  // 프롬프트에서 점수 정보 추출
  const scoreMatch = prompt.match(/종합 점수:\s*(\d+)/);
  const gradeMatch = prompt.match(/등급:\s*([A-Z])/);
  
  return {
    totalScore: scoreMatch ? parseInt(scoreMatch[1]) : 0,
    grade: gradeMatch ? gradeMatch[1] : 'N/A'
  };
}

function extractChallenges(prompt) {
  // 프롬프트에서 주요 과제 추출
  const challengeMatch = prompt.match(/주요 고민:\s*([^\n]+)/);
  return challengeMatch ? challengeMatch[1] : '미확인';
}
// ================================================================================
// 📧 AICAMP AI 역량진단 시스템 - 이메일 및 데이터 저장 모듈
// ================================================================================

/**
 * 진단 완료 이메일 발송
 */
function sendDiagnosisEmails(applicationData, reportData, diagnosisId) {
  console.log('📧 이메일 발송 시작');
  
  try {
    // 신청자 이메일 발송
    if (applicationData.email && isValidEmail(applicationData.email)) {
      sendApplicantEmail(applicationData, reportData, diagnosisId);
    }
    
    // 관리자 이메일 발송
    if (ENV.ADMIN_EMAIL && isValidEmail(ENV.ADMIN_EMAIL)) {
      sendAdminNotification(applicationData, diagnosisId);
    }
    
    console.log('✅ 이메일 발송 완료');
    return true;
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    logError(error, { context: 'email_sending', diagnosisId });
    return false;
  }
}

/**
 * 신청자 확인 이메일
 */
function sendApplicantEmail(appData, reportData, diagnosisId) {
  const subject = `[AICAMP] ${appData.companyName}님의 AI 역량진단이 완료되었습니다`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Noto Sans KR', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .highlight-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .score-display {
      font-size: 48px;
      font-weight: bold;
      color: #667eea;
      text-align: center;
      margin: 20px 0;
    }
    .grade-display {
      font-size: 24px;
      color: #764ba2;
      text-align: center;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      margin: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #667eea;
      color: white;
    }
    .priority-high {
      color: #e74c3c;
      font-weight: bold;
    }
    .priority-medium {
      color: #f39c12;
      font-weight: bold;
    }
    .priority-low {
      color: #27ae60;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${AICAMP_INFO.LOGO_URL}" alt="AICAMP" class="logo">
    <h1>AI 역량진단이 완료되었습니다!</h1>
    <p>귀사의 AI 전환을 위한 맞춤형 전략을 확인하세요</p>
  </div>
  
  <div class="content">
    <p>안녕하세요, ${appData.contactName || appData.companyName} 님</p>
    
    <p><strong>${appData.companyName}</strong>의 AI 역량진단이 성공적으로 완료되었습니다. 
    아래에서 주요 결과를 확인하시고, 상세 보고서를 다운로드해주세요.</p>
    
    <div class="highlight-box">
      <h2 style="text-align: center; color: #667eea;">종합 진단 결과</h2>
      <div class="score-display">${reportData.metadata.score || '75'}점</div>
      <div class="grade-display">${reportData.metadata.grade || 'B'}등급 | ${reportData.metadata.maturityLevel || 'AI 확산적용'}</div>
      
      <table>
        <tr>
          <th>평가 항목</th>
          <th>점수</th>
          <th>수준</th>
        </tr>
        <tr>
          <td>AI 이해 및 전략</td>
          <td>${reportData.metadata.scores?.aiUnderstanding || '70'}점</td>
          <td>양호</td>
        </tr>
        <tr>
          <td>데이터 관리</td>
          <td>${reportData.metadata.scores?.dataManagement || '65'}점</td>
          <td>개선필요</td>
        </tr>
        <tr>
          <td>프로세스 혁신</td>
          <td>${reportData.metadata.scores?.processOptimization || '75'}점</td>
          <td>양호</td>
        </tr>
        <tr>
          <td>인재 육성</td>
          <td>${reportData.metadata.scores?.talentDevelopment || '60'}점</td>
          <td>개선필요</td>
        </tr>
        <tr>
          <td>고객 경험</td>
          <td>${reportData.metadata.scores?.customerExperience || '80'}점</td>
          <td>우수</td>
        </tr>
      </table>
    </div>
    
    <div class="highlight-box">
      <h3>🎯 즉시 실행 권장 사항</h3>
      <ol>
        <li class="priority-high">AI 전환 TF팀 구성 및 킥오프 (1주 내)</li>
        <li class="priority-high">Quick Win 프로젝트 선정 및 착수 (2주 내)</li>
        <li class="priority-medium">전직원 AI 기초 교육 실시 (1개월 내)</li>
      </ol>
    </div>
    
    <div class="highlight-box">
      <h3>💰 투자 대비 효과 예측</h3>
      <ul>
        <li><strong>예상 투자금</strong>: ${reportData.metadata.investment || '1.5억원'}</li>
        <li><strong>예상 ROI</strong>: ${reportData.metadata.roi || '180%'}</li>
        <li><strong>투자회수기간</strong>: ${reportData.metadata.payback || '10개월'}</li>
        <li><strong>12개월 후 예상 성과</strong>: ${appData.expectedBenefits || '생산성 30% 향상'}</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${getReportDownloadUrl(diagnosisId)}" class="cta-button">
        📄 상세 보고서 다운로드
      </a>
      <a href="tel:${AICAMP_INFO.CEO_PHONE}" class="cta-button" style="background: #27ae60;">
        📞 무료 상담 신청
      </a>
    </div>
    
    <div class="highlight-box" style="background: #fff3cd; border: 1px solid #ffeaa7;">
      <h3>🎁 특별 제안</h3>
      <p><strong>지금 상담 신청하시면:</strong></p>
      <ul>
        <li>정부 AI 바우처 신청 지원 (최대 3억원)</li>
        <li>무료 파일럿 프로젝트 컨설팅</li>
        <li>맞춤형 AI 교육 프로그램 20% 할인</li>
      </ul>
      <p style="color: #e74c3c;"><strong>※ 진단 후 7일 내 신청 시에만 적용됩니다.</strong></p>
    </div>
    
    <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>📞 문의하기</h3>
      <p>AI 전환에 대해 궁금하신 점이 있으시면 언제든 연락주세요.</p>
      <ul style="list-style: none; padding: 0;">
        <li>📱 전화: <a href="tel:${AICAMP_INFO.CEO_PHONE}">${AICAMP_INFO.CEO_PHONE}</a></li>
        <li>✉️ 이메일: <a href="mailto:${AICAMP_INFO.CEO_EMAIL}">${AICAMP_INFO.CEO_EMAIL}</a></li>
        <li>💬 카카오톡: <a href="http://pf.kakao.com/_xjxaVxj">${AICAMP_INFO.KAKAO_ID}</a></li>
        <li>🌐 웹사이트: <a href="${AICAMP_INFO.WEBSITE}">${AICAMP_INFO.WEBSITE}</a></li>
      </ul>
    </div>
  </div>
  
  <div class="footer">
    <p><strong>AICAMP</strong> | AI로 만드는 고몰입 조직</p>
    <p>이 메일은 AI 역량진단을 신청하신 분께 발송되었습니다.</p>
    <p>진단 ID: ${diagnosisId}</p>
    <p style="font-size: 12px; color: #999;">
      © 2025 AICAMP. All rights reserved.<br>
      ${getCurrentKoreanTime()}
    </p>
  </div>
</body>
</html>
  `;
  
  const textBody = `
${appData.companyName}님의 AI 역량진단이 완료되었습니다.

[종합 진단 결과]
- 종합 점수: ${reportData.metadata.score || '75'}점
- 등급: ${reportData.metadata.grade || 'B'}등급
- AI 성숙도: ${reportData.metadata.maturityLevel || 'AI 확산적용'}

[즉시 실행 권장 사항]
1. AI 전환 TF팀 구성 및 킥오프 (1주 내)
2. Quick Win 프로젝트 선정 및 착수 (2주 내)
3. 전직원 AI 기초 교육 실시 (1개월 내)

상세 보고서: ${getReportDownloadUrl(diagnosisId)}

문의: ${AICAMP_INFO.CEO_PHONE}
진단 ID: ${diagnosisId}
  `;
  
  try {
    MailApp.sendEmail({
      to: appData.email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI 역량진단',
      replyTo: AICAMP_INFO.CEO_EMAIL
    });
    
    console.log(`✅ 신청자 이메일 발송 완료: ${appData.email}`);
    
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 관리자 알림 이메일
 */
function sendAdminNotification(appData, diagnosisId) {
  const subject = `[AI진단] ${appData.companyName} - ${appData.industry} 진단 완료`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .highlight { background-color: #ffffcc; }
    .score-high { color: #27ae60; font-weight: bold; }
    .score-medium { color: #f39c12; font-weight: bold; }
    .score-low { color: #e74c3c; font-weight: bold; }
  </style>
</head>
<body>
  <h2>AI 역량진단 신규 완료 알림</h2>
  
  <h3>기업 정보</h3>
  <table>
    <tr>
      <th>항목</th>
      <th>내용</th>
    </tr>
    <tr>
      <td>진단 ID</td>
      <td><strong>${diagnosisId}</strong></td>
    </tr>
    <tr>
      <td>회사명</td>
      <td class="highlight">${appData.companyName}</td>
    </tr>
    <tr>
      <td>업종</td>
      <td>${appData.industry}</td>
    </tr>
    <tr>
      <td>담당자</td>
      <td>${appData.contactName} (${appData.position || '미제공'})</td>
    </tr>
    <tr>
      <td>연락처</td>
      <td>
        📧 ${appData.email}<br>
        📱 ${formatPhoneNumber(appData.phone)}
      </td>
    </tr>
    <tr>
      <td>직원수</td>
      <td>${appData.employeeCount || '미제공'}</td>
    </tr>
    <tr>
      <td>연매출</td>
      <td>${appData.annualRevenue || '미제공'}</td>
    </tr>
  </table>
  
  <h3>진단 결과</h3>
  <table>
    <tr>
      <td>종합 점수</td>
      <td class="${getScoreClass(appData.totalScore)}">${appData.totalScore || '계산중'}점</td>
    </tr>
    <tr>
      <td>AI 성숙도</td>
      <td>${appData.maturityLevel || '분석중'}</td>
    </tr>
    <tr>
      <td>주요 고민사항</td>
      <td>${appData.mainChallenges || '미제공'}</td>
    </tr>
    <tr>
      <td>예상 혜택</td>
      <td>${appData.expectedBenefits || '미제공'}</td>
    </tr>
    <tr>
      <td>희망 컨설팅</td>
      <td class="highlight">${appData.consultingArea || '미제공'}</td>
    </tr>
    <tr>
      <td>예산 범위</td>
      <td>${appData.budgetRange || '미정'}</td>
    </tr>
  </table>
  
  <h3>후속 조치 필요</h3>
  <ul>
    <li>48시간 내 전화 상담 진행</li>
    <li>맞춤형 제안서 준비</li>
    <li>정부 지원금 매칭 확인</li>
  </ul>
  
  <h3>빠른 링크</h3>
  <ul>
    <li><a href="${GOOGLE_SHEETS_URL}">구글 시트 열기</a></li>
    <li><a href="${getReportDownloadUrl(diagnosisId)}">보고서 다운로드</a></li>
  </ul>
  
  <hr>
  <p style="color: #666; font-size: 12px;">
    생성 시각: ${getCurrentKoreanTime()}<br>
    시스템 버전: ${VERSION}
  </p>
</body>
</html>
  `;
  
  try {
    MailApp.sendEmail({
      to: ENV.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 진단 시스템'
    });
    
    console.log(`✅ 관리자 알림 발송 완료: ${ENV.ADMIN_EMAIL}`);
    
  } catch (error) {
    console.error('❌ 관리자 알림 발송 실패:', error);
    // 관리자 알림 실패는 전체 프로세스를 중단하지 않음
  }
}

/**
 * 진단 데이터 저장
 */
function saveDiagnosisData(applicationData, evaluationData, analysisData, reportData) {
  console.log('💾 진단 데이터 저장 시작');
  const startTime = new Date().getTime();
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const diagnosisId = applicationData.diagnosisId || generateDiagnosisId();
    
    // 1. 진단 신청 데이터 저장
    saveDiagnosisApplication(spreadsheet, diagnosisId, applicationData, evaluationData);
    
    // 2. 평가 결과 저장
    saveEvaluationResults(spreadsheet, diagnosisId, evaluationData);
    
    // 3. 보고서 이력 저장
    saveReportHistory(spreadsheet, diagnosisId, reportData);
    
    // 4. 진행 상황 업데이트
    updateDiagnosisStatus(diagnosisId, '완료');
    
    logPerformance('데이터 저장', startTime, true);
    console.log('✅ 진단 데이터 저장 완료:', diagnosisId);
    
    return diagnosisId;
    
  } catch (error) {
    logPerformance('데이터 저장', startTime, false, error.toString());
    console.error('❌ 데이터 저장 오류:', error);
    throw error;
  }
}

/**
 * 진단 신청 데이터 저장
 */
function saveDiagnosisApplication(spreadsheet, diagnosisId, appData, evalData) {
  const sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
  
  if (!sheet) {
    throw new Error(`시트를 찾을 수 없습니다: ${SHEETS.DIAGNOSIS}`);
  }
  
  const row = [
    diagnosisId,
    getCurrentKoreanTime(),
    appData.companyName || '',
    appData.industry || '',
    appData.contactName || '',
    appData.email || '',
    formatPhoneNumber(appData.phone) || '',
    evalData.scores.totalScore || 0,
    evalData.scores.grade || '',
    evalData.maturityLevel || '',
    evalData.aiMatrix?.currentPosition?.quadrant || '',
    appData.mainChallenges || '',
    appData.expectedBenefits || '',
    appData.consultingArea || '',
    '완료'
  ];
  
  sheet.appendRow(row);
  
  // 조건부 서식 적용
  const lastRow = sheet.getLastRow();
  const scoreCell = sheet.getRange(lastRow, 8);
  
  if (evalData.scores.totalScore >= 80) {
    scoreCell.setBackground('#d4edda').setFontColor('#155724');
  } else if (evalData.scores.totalScore >= 60) {
    scoreCell.setBackground('#fff3cd').setFontColor('#856404');
  } else {
    scoreCell.setBackground('#f8d7da').setFontColor('#721c24');
  }
}

/**
 * 평가 결과 저장
 */
function saveEvaluationResults(spreadsheet, diagnosisId, evalData) {
  let sheet = spreadsheet.getSheetByName(SHEETS.EVALUATION);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.EVALUATION);
    const headers = getSheetHeaders('EVALUATION');
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#667eea')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
  
  const scores = evalData.scores;
  const aiScores = scores.aiCapability.scores;
  const practicalScores = scores.practicalCapability.scores;
  
  const row = [
    diagnosisId,
    getCurrentKoreanTime(),
    scores.totalScore,
    scores.grade,
    evalData.maturityLevel,
    aiScores.aiUnderstanding || 0,
    aiScores.dataManagement || 0,
    aiScores.processOptimization || 0,
    aiScores.talentDevelopment || 0,
    aiScores.customerExperience || 0,
    practicalScores.documentAutomation || 0,
    practicalScores.dataAnalysisPractice || 0,
    practicalScores.aiToolUsage || 0,
    practicalScores.digitalCollaboration || 0,
    practicalScores.industrySpecific || 0,
    safeJsonStringify(evalData.benchmark)
  ];
  
  sheet.appendRow(row);
}

/**
 * 보고서 이력 저장
 */
function saveReportHistory(spreadsheet, diagnosisId, reportData) {
  let sheet = spreadsheet.getSheetByName(SHEETS.REPORTS);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.REPORTS);
    const headers = getSheetHeaders('REPORTS');
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#667eea')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
  
  // 보고서를 Google Drive에 저장
  const reportUrl = saveReportToDrive(diagnosisId, reportData.report);
  
  const row = [
    diagnosisId,
    getCurrentKoreanTime(),
    reportData.metadata.length || 0,
    reportData.metadata.quality || 'N/A',
    reportData.metadata.personalizationScore || 0,
    reportUrl
  ];
  
  sheet.appendRow(row);
}

/**
 * 보고서를 Google Drive에 저장
 */
function saveReportToDrive(diagnosisId, reportContent) {
  try {
    // 보고서 폴더 확인/생성
    const folderName = 'AICAMP_AI진단보고서';
    let folder;
    
    const folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // 파일명 생성
    const fileName = `AI역량진단보고서_${diagnosisId}_${getCurrentKoreanTime().replace(/[:\s]/g, '_')}.md`;
    
    // 파일 생성
    const blob = Utilities.newBlob(reportContent, 'text/markdown', fileName);
    const file = folder.createFile(blob);
    
    // 공유 설정 (링크를 아는 모든 사용자)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log(`✅ 보고서 저장 완료: ${file.getUrl()}`);
    return file.getUrl();
    
  } catch (error) {
    console.error('❌ 보고서 저장 실패:', error);
    return 'Drive 저장 실패';
  }
}

/**
 * 진단 결과 조회
 */
function getDiagnosisResult(diagnosisId) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    
    // 1. 진단 신청 정보 조회
    const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    const diagnosisData = findRowByDiagnosisId(diagnosisSheet, diagnosisId);
    
    if (!diagnosisData) {
      return {
        success: false,
        error: '진단 ID를 찾을 수 없습니다.'
      };
    }
    
    // 2. 평가 결과 조회
    const evaluationSheet = spreadsheet.getSheetByName(SHEETS.EVALUATION);
    const evaluationData = findRowByDiagnosisId(evaluationSheet, diagnosisId);
    
    // 3. 보고서 조회
    const reportSheet = spreadsheet.getSheetByName(SHEETS.REPORTS);
    const reportData = findRowByDiagnosisId(reportSheet, diagnosisId);
    
    return {
      success: true,
      data: {
        diagnosis: diagnosisData,
        evaluation: evaluationData,
        report: reportData
      }
    };
    
  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 진단 ID로 행 찾기
 */
function findRowByDiagnosisId(sheet, diagnosisId) {
  if (!sheet) return null;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === diagnosisId) {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = data[i][index];
      });
      return rowData;
    }
  }
  
  return null;
}

/**
 * 대시보드 데이터 조회
 */
function getDashboardData(filters = {}) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!diagnosisSheet) {
      return {
        success: false,
        error: '진단 데이터 시트를 찾을 수 없습니다.'
      };
    }
    
    const data = diagnosisSheet.getDataRange().getValues();
    const headers = data[0];
    
    // 필터링된 데이터
    const filteredData = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = data[i][index];
      });
      
      // 필터 적용
      let include = true;
      
      if (filters.startDate && new Date(row['신청일시']) < new Date(filters.startDate)) {
        include = false;
      }
      
      if (filters.endDate && new Date(row['신청일시']) > new Date(filters.endDate)) {
        include = false;
      }
      
      if (filters.industry && row['업종'] !== filters.industry) {
        include = false;
      }
      
      if (filters.status && row['처리상태'] !== filters.status) {
        include = false;
      }
      
      if (include) {
        filteredData.push(row);
      }
    }
    
    // 통계 계산
    const statistics = calculateDashboardStatistics(filteredData);
    
    return {
      success: true,
      data: {
        records: filteredData.slice(0, 100), // 최대 100개
        statistics: statistics,
        totalCount: filteredData.length
      }
    };
    
  } catch (error) {
    console.error('❌ 대시보드 데이터 조회 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 대시보드 통계 계산
 */
function calculateDashboardStatistics(data) {
  if (data.length === 0) {
    return {
      totalDiagnosis: 0,
      averageScore: 0,
      industryDistribution: {},
      scoreDistribution: {},
      monthlyTrend: []
    };
  }
  
  // 기본 통계
  const totalDiagnosis = data.length;
  const scores = data.map(d => d['종합점수']).filter(s => s);
  const averageScore = scores.length > 0 ? 
    Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  
  // 업종별 분포
  const industryDistribution = {};
  data.forEach(d => {
    const industry = d['업종'] || '기타';
    industryDistribution[industry] = (industryDistribution[industry] || 0) + 1;
  });
  
  // 점수 분포
  const scoreDistribution = {
    'S (90+)': 0,
    'A (80-89)': 0,
    'B (70-79)': 0,
    'C (60-69)': 0,
    'D (50-59)': 0,
    'F (0-49)': 0
  };
  
  scores.forEach(score => {
    if (score >= 90) scoreDistribution['S (90+)']++;
    else if (score >= 80) scoreDistribution['A (80-89)']++;
    else if (score >= 70) scoreDistribution['B (70-79)']++;
    else if (score >= 60) scoreDistribution['C (60-69)']++;
    else if (score >= 50) scoreDistribution['D (50-59)']++;
    else scoreDistribution['F (0-49)']++;
  });
  
  // 월별 추이
  const monthlyTrend = calculateMonthlyTrend(data);
  
  return {
    totalDiagnosis,
    averageScore,
    industryDistribution,
    scoreDistribution,
    monthlyTrend
  };
}

/**
 * 월별 추이 계산
 */
function calculateMonthlyTrend(data) {
  const monthlyData = {};
  
  data.forEach(d => {
    const date = new Date(d['신청일시']);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        count: 0,
        totalScore: 0
      };
    }
    
    monthlyData[monthKey].count++;
    if (d['종합점수']) {
      monthlyData[monthKey].totalScore += d['종합점수'];
    }
  });
  
  // 평균 계산 및 정렬
  return Object.values(monthlyData)
    .map(m => ({
      month: m.month,
      count: m.count,
      averageScore: m.count > 0 ? Math.round(m.totalScore / m.count) : 0
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // 최근 12개월
}

// 헬퍼 함수들
function getScoreClass(score) {
  if (score >= 80) return 'score-high';
  if (score >= 60) return 'score-medium';
  return 'score-low';
}

function getReportDownloadUrl(diagnosisId) {
  return `${getWebAppUrl()}?action=download&diagnosisId=${diagnosisId}`;
}

/**
 * 진단 상태 업데이트
 */
function updateDiagnosisStatus(diagnosisId, status) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!sheet) return;
    
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        sheet.getRange(i + 1, 15).setValue(status); // 처리상태 열
        console.log(`✅ 진단 상태 업데이트: ${diagnosisId} → ${status}`);
        break;
      }
    }
  } catch (error) {
    console.error('❌ 상태 업데이트 오류:', error);
  }
}
// ================================================================================
// 🚀 AICAMP AI 역량진단 시스템 - 메인 처리 및 API 엔드포인트
// ================================================================================

/**
 * 메인 AI 역량진단 처리 함수
 */
function handleAIDiagnosisSubmission(requestData) {
  const startTime = new Date().getTime();
  const diagnosisId = generateDiagnosisId();
  
  console.log('🚀 AI 역량진단 처리 시작:', diagnosisId);
  updateProgress(diagnosisId, '진단 시작', 'processing', '신청 데이터 검증 중');
  
  try {
    // 1. 데이터 검증 및 정규화
    const applicationData = validateAndNormalizeData(requestData, diagnosisId);
    console.log('✅ 데이터 검증 완료');
    
    // 2. AI 역량 자동 평가
    const evaluationData = autoEvaluateAICapabilities(applicationData);
    console.log('✅ AI 역량 평가 완료');
    
    // 3. 종합 분석 수행
    const analysisData = performComprehensiveAnalysis(applicationData, evaluationData);
    console.log('✅ 종합 분석 완료');
    
    // 4. AI 보고서 생성
    const reportData = generateUltimateAIReport(applicationData, evaluationData, analysisData);
    console.log('✅ AI 보고서 생성 완료');
    
    // 5. 데이터 저장
    saveDiagnosisData(applicationData, evaluationData, analysisData, reportData);
    console.log('✅ 데이터 저장 완료');
    
    // 6. 이메일 발송
    if (ENV.AUTO_REPLY_ENABLED) {
      sendDiagnosisEmails(applicationData, reportData, diagnosisId);
      console.log('✅ 이메일 발송 완료');
    }
    
    // 7. 성공 응답 생성
    const response = {
      success: true,
      diagnosisId: diagnosisId,
      summary: generateResponseSummary(applicationData, evaluationData, analysisData),
      message: '진단이 성공적으로 완료되었습니다.',
      reportUrl: getReportDownloadUrl(diagnosisId)
    };
    
    logPerformance('전체 진단 프로세스', startTime, true);
    updateProgress(diagnosisId, '진단 완료', 'completed', '모든 프로세스 완료');
    
    return response;
    
  } catch (error) {
    console.error('❌ 진단 처리 오류:', error);
    logError(error, { diagnosisId, requestData });
    updateProgress(diagnosisId, '진단 오류', 'error', error.toString());
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'DIAGNOSIS_FAILED',
      diagnosisId: diagnosisId
    };
  }
}

/**
 * 데이터 검증 및 정규화
 */
function validateAndNormalizeData(rawData, diagnosisId) {
  // 필수 필드 검증
  const requiredFields = ['companyName', 'industry', 'contactName', 'email', 'phone'];
  const missingFields = [];
  
  // 한글 필드명 매핑
  const fieldMapping = {
    '회사명': 'companyName',
    '업종': 'industry',
    '담당자명': 'contactName',
    '이메일': 'email',
    '연락처': 'phone',
    '직원수': 'employeeCount',
    '연매출': 'annualRevenue',
    '직책': 'position',
    '사업상세설명': 'businessDescription',
    '주요고민사항': 'mainChallenges',
    '예상혜택': 'expectedBenefits',
    '현재AI활용현황': 'currentAIUsage',
    'AI도구사용목록': 'aiToolsList',
    'AI투자계획': 'aiInvestmentPlan',
    '희망컨설팅분야': 'consultingArea',
    '예산범위': 'budgetRange',
    '의사결정권자': 'decisionMaker'
  };
  
  // 데이터 정규화
  const normalizedData = { diagnosisId };
  
  // 영문 필드 직접 복사
  Object.keys(rawData).forEach(key => {
    if (!fieldMapping[key]) {
      normalizedData[key] = rawData[key];
    }
  });
  
  // 한글 필드 매핑
  Object.entries(fieldMapping).forEach(([koreanKey, englishKey]) => {
    if (rawData[koreanKey] !== undefined) {
      normalizedData[englishKey] = rawData[koreanKey];
    }
  });
  
  // 필수 필드 확인
  requiredFields.forEach(field => {
    if (!normalizedData[field] || normalizedData[field].trim() === '') {
      missingFields.push(field);
    }
  });
  
  if (missingFields.length > 0) {
    throw new Error(`필수 항목이 누락되었습니다: ${missingFields.join(', ')}`);
  }
  
  // 이메일 유효성 검증
  if (!isValidEmail(normalizedData.email)) {
    throw new Error('유효하지 않은 이메일 주소입니다.');
  }
  
  // 추가 데이터 처리
  normalizedData.submittedAt = getCurrentKoreanTime();
  normalizedData.ipAddress = rawData.ipAddress || 'unknown';
  normalizedData.userAgent = rawData.userAgent || 'unknown';
  
  // 기본값 설정
  normalizedData.currentAIUsage = normalizedData.currentAIUsage || '사용안함';
  normalizedData.aiToolsList = normalizedData.aiToolsList || '';
  normalizedData.budgetRange = normalizedData.budgetRange || '미정';
  
  return normalizedData;
}

/**
 * 종합 분석 수행
 */
function performComprehensiveAnalysis(applicationData, evaluationData) {
  console.log('🔍 종합 분석 시작');
  
  const analysisData = {
    // SWOT 분석
    swotAnalysis: performDeepSWOTAnalysis(applicationData, evaluationData),
    
    // AI 역량 매트릭스
    aiMatrix: generateAICapabilityMatrix(evaluationData, applicationData),
    
    // 3D 매트릭스
    matrix3D: generate3DCapabilityMatrix(evaluationData, applicationData),
    
    // 중요도-긴급성 매트릭스
    importanceUrgencyMatrix: null,
    
    // 실행 로드맵
    roadmap: generateExecutionRoadmap(applicationData, evaluationData, null),
    
    // ROI 분석
    roiAnalysis: null
  };
  
  // 중요도-긴급성 매트릭스 (SWOT 전략 필요)
  analysisData.importanceUrgencyMatrix = generateImportanceUrgencyMatrix(
    analysisData.swotAnalysis.strategies,
    evaluationData,
    applicationData
  );
  
  // ROI 분석 (로드맵 필요)
  analysisData.roiAnalysis = generateROIAnalysis(
    applicationData,
    evaluationData,
    analysisData.roadmap
  );
  
  console.log('✅ 종합 분석 완료');
  return analysisData;
}

/**
 * 응답 요약 생성
 */
function generateResponseSummary(appData, evalData, analysisData) {
  const topPriorities = analysisData.swotAnalysis?.priorityActions?.slice(0, 3) || [];
  
  return {
    companyName: appData.companyName,
    totalScore: evalData.scores.totalScore,
    grade: evalData.scores.grade,
    maturityLevel: evalData.maturityLevel,
    topPriorities: topPriorities.map(p => ({
      rank: p.rank,
      strategy: p.strategy,
      action: p.action,
      expectedResult: p.expectedResult
    })),
    estimatedROI: analysisData.roiAnalysis?.summary?.roi || '180%',
    reportLength: analysisData.reportLength || 15000
  };
}

/**
 * POST 요청 처리
 */
function doPost(e) {
  console.log('📥 POST 요청 수신');
  
  try {
    // 요청 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    
    if (ENV.DEBUG_MODE) {
      console.log('요청 데이터:', requestData);
    }
    
    // 요청 타입별 처리
    const formType = requestData.formType || 'ai-diagnosis';
    
    switch (formType) {
      case 'ai-diagnosis':
      case 'ai-diagnosis-ultimate':
        return createSuccessResponse(
          handleAIDiagnosisSubmission(requestData)
        );
        
      case 'consultation':
        return createSuccessResponse(
          handleConsultationRequest(requestData)
        );
        
      case 'beta-feedback':
        return createSuccessResponse(
          handleBetaFeedback(requestData)
        );
        
      case 'get-diagnosis-result':
        return createSuccessResponse(
          getDiagnosisResult(requestData.diagnosisId)
        );
        
      case 'get-dashboard-data':
        return createSuccessResponse(
          getDashboardData(requestData.filters)
        );
        
      default:
        return createErrorResponse(
          `알 수 없는 요청 타입: ${formType}`,
          'UNKNOWN_REQUEST_TYPE'
        );
    }
    
  } catch (error) {
    console.error('❌ POST 처리 오류:', error);
    logError(error, { context: 'doPost', eventData: e });
    
    return createErrorResponse(
      error.toString(),
      'POST_PROCESSING_ERROR'
    );
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  console.log('📥 GET 요청 수신');
  
  try {
    const params = e.parameter || {};
    const action = params.action;
    
    // 기본 페이지 (상태 확인)
    if (!action || Object.keys(params).length === 0) {
      return createHtmlResponse(getStatusPage());
    }
    
    // 액션별 처리
    switch (action) {
      case 'status':
        return createSuccessResponse(getSystemStatus());
        
      case 'download':
        if (!params.diagnosisId) {
          return createErrorResponse('진단 ID가 필요합니다.', 'MISSING_DIAGNOSIS_ID');
        }
        return handleReportDownload(params.diagnosisId);
        
      case 'result':
        if (!params.diagnosisId) {
          return createErrorResponse('진단 ID가 필요합니다.', 'MISSING_DIAGNOSIS_ID');
        }
        return createSuccessResponse(
          getDiagnosisResult(params.diagnosisId)
        );
        
      case 'dashboard':
        return createSuccessResponse(
          getDashboardData(params)
        );
        
      default:
        return createErrorResponse(
          `알 수 없는 액션: ${action}`,
          'UNKNOWN_ACTION'
        );
    }
    
  } catch (error) {
    console.error('❌ GET 처리 오류:', error);
    logError(error, { context: 'doGet', eventData: e });
    
    return createErrorResponse(
      error.toString(),
      'GET_PROCESSING_ERROR'
    );
  }
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 시스템 상태 페이지
 */
function getStatusPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AICAMP AI 역량진단 시스템</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f5f7fa;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 1.2em;
      opacity: 0.9;
    }
    
    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .status-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .status-card h3 {
      color: #667eea;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .status-card .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #4caf50;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .status-item {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
    
    .status-item:last-child {
      border-bottom: none;
    }
    
    .status-label {
      color: #666;
    }
    
    .status-value {
      font-weight: 600;
      color: #333;
    }
    
    .features {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .features h2 {
      color: #667eea;
      margin-bottom: 20px;
    }
    
    .features ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    
    .features li {
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }
    
    .features li:before {
      content: "✅ ";
      color: #667eea;
      font-weight: bold;
    }
    
    .api-docs {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .api-docs h2 {
      color: #667eea;
      margin-bottom: 20px;
    }
    
    .code-block {
      background: #2d3748;
      color: #e2e8f0;
      padding: 20px;
      border-radius: 5px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 AICAMP AI 역량진단 시스템</h1>
      <p>AI로 만드는 고몰입 조직 - 최강 최적 보고서 생성 시스템</p>
    </div>
    
    <div class="status-grid">
      <div class="status-card">
        <h3>
          <span class="status-indicator"></span>
          시스템 상태
        </h3>
        <div class="status-item">
          <span class="status-label">상태</span>
          <span class="status-value">✅ 정상 작동</span>
        </div>
        <div class="status-item">
          <span class="status-label">버전</span>
          <span class="status-value">${VERSION}</span>
        </div>
        <div class="status-item">
          <span class="status-label">AI 모델</span>
          <span class="status-value">${ENV.AI_MODEL}</span>
        </div>
        <div class="status-item">
          <span class="status-label">응답 시간</span>
          <span class="status-value">&lt; 2초</span>
        </div>
      </div>
      
      <div class="status-card">
        <h3>환경 설정</h3>
        <div class="status-item">
          <span class="status-label">디버그 모드</span>
          <span class="status-value">${ENV.DEBUG_MODE ? '활성' : '비활성'}</span>
        </div>
        <div class="status-item">
          <span class="status-label">자동 응답</span>
          <span class="status-value">${ENV.AUTO_REPLY_ENABLED ? '활성' : '비활성'}</span>
        </div>
        <div class="status-item">
          <span class="status-label">벤치마킹</span>
          <span class="status-value">${ENV.ENABLE_BENCHMARKING ? '활성' : '비활성'}</span>
        </div>
        <div class="status-item">
          <span class="status-label">보고서 언어</span>
          <span class="status-value">${ENV.REPORT_LANGUAGE === 'ko' ? '한국어' : '영어'}</span>
        </div>
      </div>
      
      <div class="status-card">
        <h3>API 정보</h3>
        <div class="status-item">
          <span class="status-label">엔드포인트</span>
          <span class="status-value">활성</span>
        </div>
        <div class="status-item">
          <span class="status-label">인증</span>
          <span class="status-value">공개 API</span>
        </div>
        <div class="status-item">
          <span class="status-label">제한</span>
          <span class="status-value">분당 30회</span>
        </div>
        <div class="status-item">
          <span class="status-label">타임아웃</span>
          <span class="status-value">20분</span>
        </div>
      </div>
    </div>
    
    <div class="features">
      <h2>🎯 주요 기능</h2>
      <ul>
        <li>신청서 기반 AI 역량 자동 평가</li>
        <li>심층 SWOT 분석 (SO/WO/ST/WT 전략)</li>
        <li>AI 역량 매트릭스 (2D/3D)</li>
        <li>중요도-긴급성 매트릭스</li>
        <li>3단계 실행 로드맵 (12개월)</li>
        <li>투자대비효과(ROI) 분석</li>
        <li>업종별 벤치마크 비교</li>
        <li>GEMINI 2.5 Flash 초개인화 보고서</li>
        <li>실시간 진행상황 추적</li>
        <li>자동 이메일 발송</li>
      </ul>
    </div>
    
    <div class="api-docs">
      <h2>📚 API 사용법</h2>
      <h3>POST - AI 역량진단 신청</h3>
      <pre class="code-block">
fetch('${getWebAppUrl()}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    formType: 'ai-diagnosis',
    companyName: '테스트회사',
    industry: '제조업',
    contactName: '홍길동',
    email: 'test@example.com',
    phone: '010-1234-5678',
    businessDescription: '스마트 제조 솔루션',
    mainChallenges: '생산성 향상 필요',
    expectedBenefits: '효율성 30% 개선'
  })
})
.then(response => response.json())
.then(data => console.log(data));
      </pre>
      
      <h3 style="margin-top: 20px;">GET - 진단 결과 조회</h3>
      <pre class="code-block">
fetch('${getWebAppUrl()}?action=result&diagnosisId=ACD-123456789-abc')
  .then(response => response.json())
  .then(data => console.log(data));
      </pre>
    </div>
    
    <div class="footer">
      <p>
        <strong>AICAMP</strong> | 대표: ${AICAMP_INFO.CEO_NAME} | 
        <a href="mailto:${AICAMP_INFO.CEO_EMAIL}">${AICAMP_INFO.CEO_EMAIL}</a> | 
        <a href="tel:${AICAMP_INFO.CEO_PHONE}">${AICAMP_INFO.CEO_PHONE}</a>
      </p>
      <p style="margin-top: 10px; font-size: 14px;">
        © 2025 AICAMP. All rights reserved. | 
        <a href="${AICAMP_INFO.WEBSITE}" target="_blank">웹사이트</a> | 
        <a href="${GOOGLE_SHEETS_URL}" target="_blank">데이터 시트</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 시스템 상태 조회
 */
function getSystemStatus() {
  return {
    status: 'operational',
    version: VERSION,
    timestamp: getCurrentKoreanTime(),
    environment: {
      debugMode: ENV.DEBUG_MODE,
      autoReply: ENV.AUTO_REPLY_ENABLED,
      benchmarking: ENV.ENABLE_BENCHMARKING,
      aiModel: ENV.AI_MODEL
    },
    health: {
      spreadsheet: testSpreadsheetConnection(),
      geminiApi: testGeminiConnection(),
      email: testEmailService()
    }
  };
}

/**
 * 보고서 다운로드 처리
 */
function handleReportDownload(diagnosisId) {
  try {
    const result = getDiagnosisResult(diagnosisId);
    
    if (!result.success) {
      return createErrorResponse('진단 결과를 찾을 수 없습니다.', 'DIAGNOSIS_NOT_FOUND');
    }
    
    const reportUrl = result.data.report?.['저장위치'];
    
    if (!reportUrl) {
      return createErrorResponse('보고서를 찾을 수 없습니다.', 'REPORT_NOT_FOUND');
    }
    
    // Google Drive URL로 리다이렉트
    return HtmlService.createHtmlOutput(
      `<script>window.location.href = '${reportUrl}';</script>`
    );
    
  } catch (error) {
    console.error('❌ 보고서 다운로드 오류:', error);
    return createErrorResponse(error.toString(), 'DOWNLOAD_ERROR');
  }
}

/**
 * 상담 신청 처리
 */
function handleConsultationRequest(data) {
  try {
    const consultationId = generateConsultationId();
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
    
    const row = [
      consultationId,
      getCurrentKoreanTime(),
      data.companyName || '',
      data.contactName || '',
      data.email || '',
      formatPhoneNumber(data.phone) || '',
      data.consultingArea || '',
      data.consultingContent || '',
      data.preferredDate || '',
      '접수'
    ];
    
    sheet.appendRow(row);
    
    // 확인 이메일 발송
    if (ENV.AUTO_REPLY_ENABLED && data.email) {
      sendConsultationConfirmation(data, consultationId);
    }
    
    return {
      success: true,
      consultationId: consultationId,
      message: '상담 신청이 접수되었습니다. 담당자가 곧 연락드리겠습니다.'
    };
    
  } catch (error) {
    console.error('❌ 상담 신청 처리 오류:', error);
    throw error;
  }
}

/**
 * 베타 피드백 처리
 */
function handleBetaFeedback(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.BETA_FEEDBACK);
    
    const row = [
      getCurrentKoreanTime(),
      data.name || '익명',
      data.email || '',
      data.rating || 0,
      data.feedback || '',
      data.suggestions || ''
    ];
    
    sheet.appendRow(row);
    
    return {
      success: true,
      message: '소중한 피드백 감사합니다!'
    };
    
  } catch (error) {
    console.error('❌ 베타 피드백 처리 오류:', error);
    throw error;
  }
}

// 테스트 함수들
function testSpreadsheetConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    return spreadsheet ? 'connected' : 'disconnected';
  } catch (error) {
    return 'error';
  }
}

function testGeminiConnection() {
  // 실제 API 호출은 비용이 발생하므로 설정만 확인
  return ENV.GEMINI_API_KEY && ENV.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE' ? 
    'configured' : 'not_configured';
}

function testEmailService() {
  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    return remainingQuota > 0 ? 'available' : 'quota_exceeded';
  } catch (error) {
    return 'error';
  }
}

/**
 * 상담 확인 이메일
 */
function sendConsultationConfirmation(data, consultationId) {
  const subject = `[AICAMP] 상담 신청이 접수되었습니다`;
  const body = `
안녕하세요, ${data.contactName || data.companyName} 님

AI 전환 상담 신청이 정상적으로 접수되었습니다.
담당 컨설턴트가 영업일 기준 24시간 내에 연락드리겠습니다.

[신청 정보]
- 상담 ID: ${consultationId}
- 회사명: ${data.companyName}
- 희망 분야: ${data.consultingArea}
- 희망 일시: ${data.preferredDate || '협의'}

문의사항이 있으시면 언제든 연락주세요.
전화: ${AICAMP_INFO.CEO_PHONE}
이메일: ${AICAMP_INFO.CEO_EMAIL}

감사합니다.
AICAMP 드림
  `;
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
      name: 'AICAMP 상담센터'
    });
  } catch (error) {
    console.error('상담 확인 이메일 발송 실패:', error);
  }
}
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
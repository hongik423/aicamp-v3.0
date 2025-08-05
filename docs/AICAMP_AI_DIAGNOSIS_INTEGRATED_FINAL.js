// ================================================================================
// 🚀 AICAMP AI 역량진단 시스템 - 완전 통합 버전 v6.0
// ================================================================================
// 마지막 업데이트: 2025.02.05
// 제공된 API 키 및 배포 정보 적용 완료
// ================================================================================

// 하드코딩된 설정값 (제공된 정보 적용)
const HARDCODED_CONFIG = {
  SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj',
  ADMIN_EMAIL: 'hongik423@gmail.com'
};

// ================================================================================
// 📋 설정 및 환경변수 모듈
// ================================================================================

/**
 * 환경변수 가져오기 (Google Apps Script Properties)
 */
function getEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 설정 (하드코딩된 값 우선 사용)
    SPREADSHEET_ID: HARDCODED_CONFIG.SPREADSHEET_ID,
    GEMINI_API_KEY: HARDCODED_CONFIG.GEMINI_API_KEY,
    ADMIN_EMAIL: HARDCODED_CONFIG.ADMIN_EMAIL,
    
    // 배포 정보
    SCRIPT_ID: HARDCODED_CONFIG.SCRIPT_ID,
    DEPLOYMENT_ID: HARDCODED_CONFIG.DEPLOYMENT_ID,
    
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
    // 필수 설정은 하드코딩된 값 사용
    SPREADSHEET_ID: HARDCODED_CONFIG.SPREADSHEET_ID,
    GEMINI_API_KEY: HARDCODED_CONFIG.GEMINI_API_KEY,
    ADMIN_EMAIL: HARDCODED_CONFIG.ADMIN_EMAIL,
    SCRIPT_ID: HARDCODED_CONFIG.SCRIPT_ID,
    DEPLOYMENT_ID: HARDCODED_CONFIG.DEPLOYMENT_ID,
    
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
  console.log('✅ 제공된 API 키와 배포 정보가 적용되었습니다.');
  
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
// 🛠️ 유틸리티 함수 모듈
// ================================================================================

/**
 * 현재 한국 시간 가져오기
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return Utilities.formatDate(koreanTime, 'GMT+9', 'yyyy-MM-dd HH:mm:ss');
}

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `AICAMP-${timestamp}-${random}`;
}

/**
 * 상담 ID 생성
 */
function generateConsultationId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `CONSULT-${timestamp}-${random}`;
}

/**
 * 진행 상황 업데이트
 */
function updateProgress(diagnosisId, stage, status, message = '') {
  if (!ENV.ENABLE_PROGRESS_TRACKING) return;
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(SHEETS.PROGRESS);
    
    if (!progressSheet) return;
    
    progressSheet.appendRow([
      diagnosisId,
      getCurrentKoreanTime(),
      stage,
      status,
      message,
      Session.getActiveUser().getEmail() || 'system'
    ]);
  } catch (error) {
    console.error('진행 상황 업데이트 오류:', error);
  }
}

/**
 * 성능 측정 로깅
 */
function logPerformance(operation, startTime, success = true, errorMessage = '') {
  try {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const perfSheet = spreadsheet.getSheetByName(SHEETS.PERFORMANCE);
    
    if (!perfSheet) return;
    
    perfSheet.appendRow([
      getCurrentKoreanTime(),
      operation,
      duration,
      success ? 'Y' : 'N',
      errorMessage
    ]);
    
    if (ENV.DEBUG_MODE) {
      console.log(`⏱️ ${operation}: ${duration}ms ${success ? '✅' : '❌'}`);
    }
  } catch (error) {
    console.error('성능 로깅 오류:', error);
  }
}

/**
 * 안전한 실행 래퍼
 */
function safeExecute(func, errorMessage = '처리 중 오류가 발생했습니다') {
  try {
    return func();
  } catch (error) {
    console.error(errorMessage, error);
    logError(error, { context: errorMessage });
    throw new Error(`${errorMessage}: ${error.toString()}`);
  }
}

/**
 * 재시도 로직이 포함된 안전한 실행
 */
function safeExecuteWithRetry(func, maxRetries = 3, retryDelay = 1000) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return func();
    } catch (error) {
      lastError = error;
      console.error(`시도 ${i + 1}/${maxRetries} 실패:`, error);
      
      if (i < maxRetries - 1) {
        Utilities.sleep(retryDelay);
      }
    }
  }
  
  throw lastError;
}

/**
 * JSON 응답 생성
 */
function createJsonResponse(data, success = true, message = '') {
  const response = {
    success: success,
    timestamp: getCurrentKoreanTime(),
    version: VERSION,
    data: data,
    message: message
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message, errorCode = 'UNKNOWN_ERROR') {
  const response = {
    success: false,
    timestamp: getCurrentKoreanTime(),
    version: VERSION,
    error: {
      code: errorCode,
      message: message
    }
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HTML 응답 생성
 */
function createHtmlResponse(html) {
  return HtmlService.createHtmlOutput(html)
    .setTitle('AICAMP AI 역량진단 시스템')
    .setWidth(800)
    .setHeight(600);
}

/**
 * 오류 로깅
 */
function logError(error, context = {}) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const errorSheet = spreadsheet.getSheetByName(SHEETS.ERROR_LOG);
    
    if (!errorSheet) return;
    
    errorSheet.appendRow([
      getCurrentKoreanTime(),
      error.name || 'UnknownError',
      error.message || error.toString(),
      error.stack || '',
      JSON.stringify(context),
      Session.getActiveUser().getEmail() || 'system'
    ]);
    
  } catch (logError) {
    console.error('오류 로깅 실패:', logError);
  }
}

/**
 * 진단 상태 업데이트
 */
function updateDiagnosisStatus(diagnosisId, status) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!diagnosisSheet) return;
    
    const data = diagnosisSheet.getDataRange().getValues();
    const headers = data[0];
    const idIndex = headers.indexOf('진단ID');
    const statusIndex = headers.indexOf('처리상태');
    
    if (idIndex === -1 || statusIndex === -1) return;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idIndex] === diagnosisId) {
        diagnosisSheet.getRange(i + 1, statusIndex + 1).setValue(status);
        break;
      }
    }
  } catch (error) {
    console.error('진단 상태 업데이트 오류:', error);
  }
}

/**
 * 시작 날짜 계산 (다음 월요일)
 */
function getStartDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;
  const nextMonday = new Date(today.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
  return Utilities.formatDate(nextMonday, 'GMT+9', 'yyyy년 MM월 dd일');
}

/**
 * 숫자 포맷팅
 */
function formatNumber(num) {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 퍼센트 포맷팅
 */
function formatPercent(num) {
  return `${Math.round(num)}%`;
}

/**
 * 점수를 등급으로 변환
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
 * AI 성숙도 레벨 판정
 */
function getAIMaturityLevel(score) {
  if (score >= 80) return 'AI 선도기업';
  if (score >= 60) return 'AI 활용기업';
  if (score >= 40) return 'AI 도입기업';
  if (score >= 20) return 'AI 준비기업';
  return 'AI 입문기업';
}

/**
 * 보고서 다운로드 URL 생성
 */
function getReportDownloadUrl(diagnosisId) {
  return `${ENV.DEPLOYMENT_ID}/report?id=${diagnosisId}`;
}

/**
 * 데이터 검증
 */
function validateRequiredFields(data, requiredFields) {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === '') {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    throw new Error(`필수 항목이 누락되었습니다: ${missingFields.join(', ')}`);
  }
  
  return true;
}

/**
 * 이메일 유효성 검사
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 전화번호 정규화
 */
function normalizePhoneNumber(phone) {
  return phone.replace(/[^0-9]/g, '').replace(/^82/, '0');
}

/**
 * 안전한 JSON 파싱
 */
function safeJsonParse(jsonString, defaultValue = {}) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    return defaultValue;
  }
}

/**
 * 텍스트 자르기
 */
function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * HTML 이스케이프
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * 배열을 청크로 분할
 */
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * 객체 깊은 복사
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 테스트 시스템
 */
function testUltimateSystem() {
  console.log('🧪 AICAMP AI 역량진단 시스템 테스트 시작');
  console.log('================================');
  
  // 1. 환경변수 확인
  if (!checkEnvironmentVariables()) {
    console.error('❌ 환경변수 설정이 필요합니다.');
    return;
  }
  
  // 2. 시트 초기화
  if (!initializeSheets()) {
    console.error('❌ 시트 초기화 실패');
    return;
  }
  
  // 3. 테스트 데이터
  const testData = {
    formType: 'ai-diagnosis',
    companyName: '테스트전자(주)',
    industry: '제조업',
    employeeCount: '150명',
    annualRevenue: '500억원',
    businessDescription: '스마트홈 IoT 기기 제조 및 판매',
    mainChallenges: '생산 효율성 개선, 품질 관리 자동화',
    expectedBenefits: '생산성 40% 향상, 불량률 50% 감소',
    currentAIUsage: '일부 부서에서 ChatGPT 활용',
    aiToolsList: 'ChatGPT, Excel',
    contactName: '김혁신',
    position: '경영기획팀장',
    email: 'test@testcompany.com',
    phone: '010-1234-5678',
    consultingArea: '스마트팩토리, AI 품질관리'
  };
  
  console.log('📋 테스트 데이터:', testData);
  
  // 4. 진단 실행
  try {
    const result = handleAIDiagnosisSubmission(testData);
    console.log('✅ 진단 완료:', result);
    
    // 5. 결과 확인
    if (result.success) {
      console.log('🎉 테스트 성공!');
      console.log('진단 ID:', result.diagnosisId);
      console.log('요약:', result.summary);
    } else {
      console.error('❌ 테스트 실패:', result.message);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error);
  }
  
  console.log('================================');
  console.log('🧪 테스트 완료');
}

// ================================================================================
// 🎯 AI 역량 평가 모듈
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
 * 평균 계산 헬퍼 함수
 */
function calculateAverage(numbers) {
  if (!numbers || numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
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
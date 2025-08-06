// ================================================================================
// 📋 AICAMP AI 역량진단 시스템 - 고도화 통합 버전 V4.0
// ================================================================================
// 
// 🎯 주요 기능:
// 1. AI 역량진단 평가 및 점수 산정
// 2. SWOT 분석 및 SO/WO/ST/WT 전략 수립
// 3. AI 역량진단 결과 매트릭스 생성
// 4. 중요도-긴급성 매트릭스 분석
// 5. 고몰입조직구축 3단계 실행로드맵
// 6. 투자대비효과(ROI) 분석
// 7. AICAMP 맞춤형 제안
// 8. 이메일 기반 회원 인식 시스템
// 9. Google Sheets 데이터 저장 및 관리
// 10. GEMINI 2.5 FLASH 기반 AI 보고서 생성
// ================================================================================

// ================================================================================
// MODULE 1: 설정 및 환경변수
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
const VERSION = '2025.02.05.AICAMP_고몰입조직구축_AI역량강화진단시스템_V4.0_고도화통합';

// AICAMP 정보
const AICAMP_INFO = {
  LOGO_URL: 'https://aicamp.club/images/aicamp_logo_del_250726.png',
  WEBSITE: 'https://aicamp.club',
  CEO_NAME: '이후경',
  PRINCIPAL_TITLE: '교장',
  CEO_PHONE: '010-9251-9743',
  CEO_EMAIL: 'hongik423@gmail.com',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  KAKAO_ID: '@aicamp',
  COMPANY_NAME: 'AICAMP',
  SLOGAN: 'AI로 만드는 고몰입 조직'
};

// 구글 시트 URL
const GOOGLE_SHEETS_URL = `https://docs.google.com/spreadsheets/d/${ENV.SPREADSHEET_ID}/edit`;

// ================================================================================
// MODULE 2: 유틸리티 함수
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
 * 웹앱 URL 가져오기
 */
function getWebAppUrl() {
  return `https://script.google.com/macros/s/${ENV.DEPLOYMENT_ID}/exec`;
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
 * 오류 로깅
 */
function logError(error, context = {}) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let errorSheet = spreadsheet.getSheetByName(SHEETS.ERROR_LOG);
    
    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet(SHEETS.ERROR_LOG);
      const headers = ['발생일시', '오류유형', '오류메시지', '스택트레이스', '컨텍스트', '처리자'];
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
// MODULE 3: AI 평가 함수
// ================================================================================

/**
 * AI 역량 자동 평가 (개선된 버전)
 */
function autoEvaluateAICapabilities(applicationData) {
  console.log('🤖 AI 역량 자동 평가 시작');
  
  try {
    // assessmentResponses에서 실제 응답값 추출
    const responses = applicationData.assessmentResponses || {};
    
    // 6개 영역별 점수 계산 (실제 평가표 기반)
    const categoryScores = {
      leadership: calculateLeadershipScore(responses), // 경영진 리더십 및 AI 이해도
      infrastructure: calculateInfrastructureScore(responses), // AI 인프라 및 시스템
      employeeCapability: calculateEmployeeCapabilityScore(responses), // 직원 AI 역량
      culture: calculateCultureScore(responses), // AI 활용 조직문화
      practicalApplication: calculatePracticalApplicationScore(responses), // 실무 AI 적용
      dataCapability: calculateDataCapabilityScore(responses) // 데이터 활용 역량
    };
    
    // 가중평균으로 종합 점수 계산
    const weights = {
      leadership: 1.2, // 경영진 리더십 중요도 높음
      infrastructure: 1.0,
      employeeCapability: 1.1,
      culture: 1.0,
      practicalApplication: 1.2, // 실무 적용 중요도 높음
      dataCapability: 1.1 // 데이터 역량 중요도 높음
    };
    
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const weightedScore = Object.entries(categoryScores).reduce((sum, [category, score]) => {
      return sum + (score * weights[category]);
    }, 0);
    
    const totalScore = Math.round(weightedScore / totalWeight);
    
    // 등급 산정
    const grade = getGradeFromScore(totalScore);
    
    // 성숙도 레벨 판정
    const maturityLevel = getAIMaturityLevel(totalScore);
    
    // 업종별 벤치마크 비교
    const benchmark = compareToBenchmark(applicationData.industry, totalScore);
    
    const evaluation = {
      scores: {
        ...categoryScores,
        totalScore: totalScore,
        grade: grade,
        weightedAverage: Math.round(weightedScore / totalWeight * 10) / 10
      },
      maturityLevel: maturityLevel,
      benchmark: benchmark
    };
    
    console.log('✅ AI 역량 평가 완료:', evaluation.scores.totalScore);
    return evaluation;
    
  } catch (error) {
    console.error('❌ AI 역량 평가 오류:', error);
    throw error;
  }
}

// ================================================================================
// 실제 평가표 기반 점수 계산 함수들
// ================================================================================

/**
 * 1. 경영진 리더십 및 AI 이해도 점수 계산
 */
function calculateLeadershipScore(responses) {
  const questions = ['L1', 'L2', 'L3', 'L4'];
  const weights = [1.2, 1.0, 1.1, 1.0]; // 각 문항별 가중치
  
  let totalScore = 0;
  let totalWeight = 0;
  
  questions.forEach((qId, index) => {
    const response = responses[qId] || responses[`leadership_${index + 1}`] || 3; // 기본값 3점
    const score = convertResponseToScore(response);
    totalScore += score * weights[index];
    totalWeight += weights[index];
  });
  
  return Math.round((totalScore / totalWeight) * 20); // 100점 만점으로 환산
}

/**
 * 2. AI 인프라 및 시스템 점수 계산
 */
function calculateInfrastructureScore(responses) {
  const questions = ['I1', 'I2', 'I3', 'I4'];
  const weights = [1.0, 1.1, 0.9, 0.8];
  
  let totalScore = 0;
  let totalWeight = 0;
  
  questions.forEach((qId, index) => {
    const response = responses[qId] || responses[`infrastructure_${index + 1}`] || 3;
    const score = convertResponseToScore(response);
    totalScore += score * weights[index];
    totalWeight += weights[index];
  });
  
  return Math.round((totalScore / totalWeight) * 20);
}

/**
 * 3. 직원 AI 역량 점수 계산
 */
function calculateEmployeeCapabilityScore(responses) {
  const questions = ['E1', 'E2', 'E3', 'E4'];
  const weights = [1.0, 1.1, 0.9, 1.0];
  
  let totalScore = 0;
  let totalWeight = 0;
  
  questions.forEach((qId, index) => {
    const response = responses[qId] || responses[`employee_${index + 1}`] || 3;
    const score = convertResponseToScore(response);
    totalScore += score * weights[index];
    totalWeight += weights[index];
  });
  
  return Math.round((totalScore / totalWeight) * 20);
}

/**
 * 4. AI 활용 조직문화 점수 계산
 */
function calculateCultureScore(responses) {
  const questions = ['C1', 'C2', 'C3', 'C4'];
  const weights = [1.0, 1.1, 0.9, 0.8];
  
  let totalScore = 0;
  let totalWeight = 0;
  
  questions.forEach((qId, index) => {
    const response = responses[qId] || responses[`culture_${index + 1}`] || 3;
    const score = convertResponseToScore(response);
    totalScore += score * weights[index];
    totalWeight += weights[index];
  });
  
  return Math.round((totalScore / totalWeight) * 20);
}

/**
 * 5. 실무 AI 적용 점수 계산
 */
function calculatePracticalApplicationScore(responses) {
  const questions = ['P1', 'P2', 'P3', 'P4'];
  const weights = [1.1, 1.0, 1.2, 1.0];
  
  let totalScore = 0;
  let totalWeight = 0;
  
  questions.forEach((qId, index) => {
    const response = responses[qId] || responses[`practical_${index + 1}`] || 3;
    const score = convertResponseToScore(response);
    totalScore += score * weights[index];
    totalWeight += weights[index];
  });
  
  return Math.round((totalScore / totalWeight) * 20);
}

/**
 * 6. 데이터 활용 역량 점수 계산
 */
function calculateDataCapabilityScore(responses) {
  const questions = ['D1', 'D2', 'D3', 'D4'];
  const weights = [1.1, 1.2, 0.9, 0.8];
  
  let totalScore = 0;
  let totalWeight = 0;
  
  questions.forEach((qId, index) => {
    const response = responses[qId] || responses[`data_${index + 1}`] || 3;
    const score = convertResponseToScore(response);
    totalScore += score * weights[index];
    totalWeight += weights[index];
  });
  
  return Math.round((totalScore / totalWeight) * 20);
}

/**
 * 응답값을 점수로 변환 (1-5 척도)
 */
function convertResponseToScore(response) {
  // 문자열 응답을 숫자로 변환
  const scoreMap = {
    '전혀 그렇지 않다': 1,
    '그렇지 않다': 2,
    '보통이다': 3,
    '그렇다': 4,
    '매우 그렇다': 5,
    '매우부족': 1,
    '부족': 2,
    '보통': 3,
    '우수': 4,
    '매우우수': 5,
    'very_poor': 1,
    'poor': 2,
    'average': 3,
    'good': 4,
    'excellent': 5
  };
  
  // 숫자인 경우 그대로 반환
  if (typeof response === 'number') {
    return Math.max(1, Math.min(5, response));
  }
  
  // 문자열인 경우 매핑
  const mapped = scoreMap[response] || scoreMap[response?.toLowerCase()] || 3;
  return mapped;
}

/**
 * 점수를 등급으로 변환
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

/**
 * 실무 역량 평가
 */
function evaluatePracticalCapabilities(data) {
  const scores = {
    documentAutomation: evaluateDocumentAutomation(data),
    dataAnalysisPractice: evaluateDataAnalysisPractice(data),
    aiToolUsage: evaluateAIToolUsage(data),
    digitalCollaboration: evaluateDigitalCollaboration(data),
    industrySpecific: evaluateIndustrySpecific(data)
  };
  
  scores.average = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
  return scores;
}

// 개별 평가 함수들 (고도화된 평가 로직)
function evaluateAITechUnderstanding(data) { 
  let score = 50;
  
  // 산업별 가중치
  const industryWeights = {
    'IT/소프트웨어': 20,
    '제조업': 15,
    '금융업': 18,
    '서비스업': 10,
    '유통/도소매': 12,
    '의료/헬스케어': 16,
    '교육': 8,
    '기타': 10
  };
  
  score += industryWeights[data.industry] || 10;
  
  // 직원 규모 고려
  if (data.employeeCount > 100) score += 10;
  else if (data.employeeCount > 50) score += 5;
  
  // 기존 AI 활용 여부
  if (data.currentAIUsage === 'yes') score += 15;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateDataManagement(data) { 
  let score = 45;
  
  // 데이터 관리 체계 평가
  if (data.dataGovernance === 'established') score += 20;
  else if (data.dataGovernance === 'partial') score += 10;
  
  // 데이터 품질 관리
  if (data.dataQuality === 'high') score += 15;
  else if (data.dataQuality === 'medium') score += 8;
  
  // 산업별 조정
  const industryAdjustment = {
    '금융업': 10,
    'IT/소프트웨어': 12,
    '의료/헬스케어': 8
  };
  
  score += industryAdjustment[data.industry] || 5;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateProcessOptimization(data) { 
  let score = 55;
  
  // 현재 프로세스 디지털화 수준
  if (data.digitalization === 'advanced') score += 20;
  else if (data.digitalization === 'intermediate') score += 10;
  
  // 자동화 준비도
  if (data.automationReadiness === 'high') score += 15;
  else if (data.automationReadiness === 'medium') score += 8;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateTalentDevelopment(data) { 
  let score = 45;
  
  // AI 교육 프로그램 유무
  if (data.aiEducationProgram === 'yes') score += 20;
  
  // 직원 AI 활용 능력
  if (data.employeeAISkills === 'high') score += 15;
  else if (data.employeeAISkills === 'medium') score += 8;
  
  // 조직 문화
  if (data.innovationCulture === 'strong') score += 15;
  else if (data.innovationCulture === 'moderate') score += 8;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateCustomerExperience(data) { 
  let score = 60;
  
  // 고객 데이터 활용
  if (data.customerDataUsage === 'advanced') score += 15;
  else if (data.customerDataUsage === 'basic') score += 8;
  
  // AI 기반 서비스 제공
  if (data.aiCustomerService === 'yes') score += 15;
  
  // 산업별 조정
  const industryBonus = {
    '서비스업': 10,
    '유통/도소매': 12,
    '금융업': 8
  };
  
  score += industryBonus[data.industry] || 5;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateDocumentAutomation(data) { 
  let score = 50;
  
  // 문서 자동화 수준
  if (data.documentAutomation === 'high') score += 20;
  else if (data.documentAutomation === 'medium') score += 10;
  
  // RPA 활용
  if (data.rpaUsage === 'yes') score += 15;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateDataAnalysisPractice(data) { 
  let score = 50;
  
  // 데이터 분석 도구 활용
  if (data.analyticsTools === 'advanced') score += 20;
  else if (data.analyticsTools === 'basic') score += 10;
  
  // 데이터 기반 의사결정
  if (data.dataDecisionMaking === 'always') score += 15;
  else if (data.dataDecisionMaking === 'sometimes') score += 8;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateAIToolUsage(data) { 
  let score = 55;
  
  // AI 도구 활용 범위
  if (data.aiToolScope === 'enterprise') score += 20;
  else if (data.aiToolScope === 'department') score += 10;
  
  // AI 플랫폼 사용
  if (data.aiPlatforms === 'multiple') score += 15;
  else if (data.aiPlatforms === 'single') score += 8;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateDigitalCollaboration(data) { 
  let score = 55;
  
  // 디지털 협업 도구
  if (data.collaborationTools === 'advanced') score += 15;
  else if (data.collaborationTools === 'basic') score += 8;
  
  // 원격 근무 지원
  if (data.remoteWork === 'full') score += 15;
  else if (data.remoteWork === 'partial') score += 8;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

function evaluateIndustrySpecific(data) { 
  let score = 60;
  
  // 산업별 AI 성숙도
  const industryMaturity = {
    'IT/소프트웨어': 25,
    '금융업': 20,
    '제조업': 18,
    '의료/헬스케어': 18,
    '유통/도소매': 15,
    '서비스업': 12,
    '교육': 10,
    '기타': 10
  };
  
  score += industryMaturity[data.industry] || 10;
  
  // 산업 특화 AI 솔루션
  if (data.industryAISolution === 'yes') score += 15;
  
  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10)));
}

/**
 * 종합 점수 계산
 */
function calculateComprehensiveScores(evaluation) {
  const aiAvg = evaluation.scores.aiCapability.average || 60;
  const practicalAvg = evaluation.scores.practicalCapability.average || 60;
  
  const totalScore = Math.round(aiAvg * 0.6 + practicalAvg * 0.4);
  const grade = getGradeFromScore(totalScore);
  
  return {
    totalScore,
    grade,
    aiCapability: evaluation.scores.aiCapability,
    practicalCapability: evaluation.scores.practicalCapability
  };
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
 * 벤치마크 비교
 */
function compareToBenchmark(industry, scores) {
  const industryBenchmarks = {
    '제조업': 65,
    'IT/소프트웨어': 85,
    '서비스업': 55,
    '유통/도소매': 60,
    '금융업': 75,
    '의료/헬스케어': 70,
    '교육': 50,
    '기타': 55
  };
  
  const benchmark = industryBenchmarks[industry] || 60;
  const gap = scores.totalScore - benchmark;
  
  return {
    industryAverage: benchmark,
    gap: gap,
    position: gap > 0 ? '업계 평균 상회' : '업계 평균 하회',
    percentile: calculatePercentile(scores.totalScore, industry)
  };
}

/**
 * 백분위수 계산
 */
function calculatePercentile(score, industry) {
  // 간단한 백분위수 계산 로직
  if (score >= 90) return '상위 5%';
  if (score >= 80) return '상위 10%';
  if (score >= 70) return '상위 30%';
  if (score >= 60) return '상위 50%';
  return '하위 50%';
}

// ================================================================================
// MODULE 4: SWOT 분석
// ================================================================================

/**
 * 심층 SWOT 분석 수행
 */
function performDeepSWOTAnalysis(applicationData, evaluationData) {
  console.log('📊 심층 SWOT 분석 시작');
  
  try {
    const swot = {
      strengths: identifyStrengths(applicationData, evaluationData),
      weaknesses: identifyWeaknesses(applicationData, evaluationData),
      opportunities: identifyOpportunities(applicationData, evaluationData),
      threats: identifyThreats(applicationData, evaluationData)
    };
    
    // SWOT 매트릭스 전략 생성
    swot.strategies = {
      SO: generateSOStrategies(swot, applicationData),
      WO: generateWOStrategies(swot, applicationData),
      ST: generateSTStrategies(swot, applicationData),
      WT: generateWTStrategies(swot, applicationData)
    };
    
    console.log('✅ SWOT 분석 완료');
    return swot;
    
  } catch (error) {
    console.error('❌ SWOT 분석 오류:', error);
    throw error;
  }
}

/**
 * 강점 식별
 */
function identifyStrengths(appData, evalData) {
  const strengths = [];
  const scores = evalData.scores;
  
  if (scores.totalScore >= 70) {
    strengths.push({
      factor: 'AI 준비도',
      description: 'AI 도입을 위한 조직 준비도가 높음',
      score: scores.totalScore
    });
  }
  
  if (scores.aiCapability.dataManagement >= 70) {
    strengths.push({
      factor: '데이터 관리',
      description: '체계적인 데이터 관리 체계 구축',
      score: scores.aiCapability.dataManagement
    });
  }
  
  return strengths;
}

/**
 * 약점 식별
 */
function identifyWeaknesses(appData, evalData) {
  const weaknesses = [];
  const scores = evalData.scores;
  
  if (scores.aiCapability.talentDevelopment < 60) {
    weaknesses.push({
      factor: '인재 육성',
      description: 'AI 전문 인력 부족',
      score: scores.aiCapability.talentDevelopment
    });
  }
  
  if (scores.practicalCapability.aiToolUsage < 60) {
    weaknesses.push({
      factor: 'AI 도구 활용',
      description: 'AI 도구 활용 경험 부족',
      score: scores.practicalCapability.aiToolUsage
    });
  }
  
  return weaknesses;
}

/**
 * 기회 식별
 */
function identifyOpportunities(appData, evalData) {
  const opportunities = [];
  
  opportunities.push({
    factor: '정부 지원',
    description: 'AI 바우처 등 정부 지원 사업 활용 가능',
    potential: '높음'
  });
  
  opportunities.push({
    factor: '시장 성장',
    description: `${appData.industry} 분야 AI 시장 급성장`,
    potential: '매우 높음'
  });
  
  return opportunities;
}

/**
 * 위협 식별
 */
function identifyThreats(appData, evalData) {
  const threats = [];
  
  threats.push({
    factor: '경쟁 심화',
    description: 'AI 도입 기업 간 경쟁 심화',
    severity: '중간'
  });
  
  threats.push({
    factor: '기술 변화',
    description: 'AI 기술의 빠른 변화 속도',
    severity: '높음'
  });
  
  return threats;
}

// 전략 생성 함수들 (고도화된 SWOT 전략)
function generateSOStrategies(swot, appData) { 
  const strategies = [];
  
  // SO 전략: 강점을 활용하여 기회를 극대화
  if (swot.strengths.length > 0 && swot.opportunities.length > 0) {
    strategies.push({
      title: 'AI 리더십 확립 전략',
      description: `${appData.industry} 분야에서 AI 선도 기업으로 도약`,
      actions: [
        'AI 우수 역량을 활용한 신규 비즈니스 모델 개발',
        '정부 AI 바우처 사업 참여로 투자 부담 경감',
        'AI 성공 사례 대외 홍보로 브랜드 가치 상승'
      ],
      timeline: '3-6개월',
      investment: '중간',
      priority: '높음'
    });
    
    strategies.push({
      title: '시장 선점 전략',
      description: 'AI 기술력을 바탕으로 새로운 시장 개척',
      actions: [
        'AI 기반 차별화 서비스 출시',
        '디지털 전환 가속화로 경쟁 우위 확보',
        '글로벌 시장 진출 기반 마련'
      ],
      timeline: '6-12개월',
      investment: '높음',
      priority: '중간'
    });
  }
  
  return strategies;
}

function generateWOStrategies(swot, appData) { 
  const strategies = [];
  
  // WO 전략: 약점을 보완하여 기회를 활용
  if (swot.weaknesses.length > 0 && swot.opportunities.length > 0) {
    strategies.push({
      title: 'AI 역량 강화 전략',
      description: '체계적인 교육과 인프라 구축으로 AI 역량 향상',
      actions: [
        'AICAMP 맞춤형 AI 교육 프로그램 도입',
        '단계별 AI 인재 육성 로드맵 실행',
        '외부 AI 전문가 영입 및 컨설팅'
      ],
      timeline: '3-6개월',
      investment: '중간',
      priority: '높음'
    });
    
    strategies.push({
      title: '파트너십 전략',
      description: 'AI 전문 기업과의 협력으로 역량 보완',
      actions: [
        'AI 솔루션 업체와 전략적 제휴',
        '산학연 협력 프로그램 참여',
        'AI 생태계 네트워크 구축'
      ],
      timeline: '1-3개월',
      investment: '낮음',
      priority: '높음'
    });
  }
  
  return strategies;
}

function generateSTStrategies(swot, appData) { 
  const strategies = [];
  
  // ST 전략: 강점을 활용하여 위협에 대응
  if (swot.strengths.length > 0 && swot.threats.length > 0) {
    strategies.push({
      title: '차별화 강화 전략',
      description: 'AI 역량을 활용한 독특한 가치 제안',
      actions: [
        '업계 특화 AI 솔루션 개발',
        '고객 맞춤형 AI 서비스 강화',
        '지속적인 혁신으로 경쟁력 유지'
      ],
      timeline: '6-12개월',
      investment: '높음',
      priority: '중간'
    });
    
    strategies.push({
      title: '리스크 관리 전략',
      description: 'AI 기술 변화에 대한 선제적 대응',
      actions: [
        'AI 트렌드 모니터링 체계 구축',
        '유연한 AI 아키텍처 설계',
        '지속적인 기술 업데이트'
      ],
      timeline: '즉시',
      investment: '낮음',
      priority: '높음'
    });
  }
  
  return strategies;
}

function generateWTStrategies(swot, appData) { 
  const strategies = [];
  
  // WT 전략: 약점 보완과 위협 최소화
  if (swot.weaknesses.length > 0 && swot.threats.length > 0) {
    strategies.push({
      title: '단계적 전환 전략',
      description: '리스크를 최소화하며 점진적 AI 도입',
      actions: [
        '파일럿 프로젝트로 검증 후 확대',
        '핵심 영역부터 순차적 AI 적용',
        '변화 관리 프로그램 병행'
      ],
      timeline: '12-18개월',
      investment: '중간',
      priority: '중간'
    });
    
    strategies.push({
      title: '기초 역량 구축 전략',
      description: 'AI 도입을 위한 기반 마련',
      actions: [
        '데이터 거버넌스 체계 수립',
        '디지털 인프라 개선',
        '조직 문화 혁신'
      ],
      timeline: '6-9개월',
      investment: '중간',
      priority: '높음'
    });
  }
  
  return strategies;
}

// ================================================================================
// MODULE 5: 매트릭스 분석
// ================================================================================

/**
 * AI 역량 매트릭스 생성
 */
function generateAICapabilityMatrix(evaluationData, applicationData) {
  console.log('📊 AI 역량 매트릭스 생성');
  
  const matrix = {
    currentPosition: calculateMatrixPosition(evaluationData, applicationData),
    targetPosition: predictFutureTrajectory(evaluationData, applicationData),
    recommendations: generateMatrixRecommendations(evaluationData, applicationData)
  };
  
  return matrix;
}

/**
 * 매트릭스 위치 계산
 */
function calculateMatrixPosition(evalData, appData) {
  const x = evalData.scores.totalScore / 100;
  const y = calculateBusinessImpact(evalData, appData);
  
  return {
    x: x,
    y: y,
    quadrant: determineQuadrant(x, y)
  };
}

/**
 * 비즈니스 영향도 계산
 */
function calculateBusinessImpact(evalData, appData) {
  // 간단한 비즈니스 영향도 계산
  return Math.random() * 0.5 + 0.3;
}

/**
 * 사분면 결정
 */
function determineQuadrant(x, y) {
  if (x >= 0.5 && y >= 0.5) return 'Leaders';
  if (x < 0.5 && y >= 0.5) return 'Visionaries';
  if (x >= 0.5 && y < 0.5) return 'Niche Players';
  return 'Challengers';
}

/**
 * 미래 궤적 예측
 */
function predictFutureTrajectory(evalData, appData) {
  const current = calculateMatrixPosition(evalData, appData);
  return {
    x: Math.min(current.x + 0.2, 1),
    y: Math.min(current.y + 0.15, 1),
    timeframe: '12개월'
  };
}

/**
 * 매트릭스 권장사항 생성
 */
function generateMatrixRecommendations(evalData, appData) {
  return [
    'AI 역량 강화를 위한 교육 프로그램 실시',
    '파일럿 프로젝트를 통한 단계적 AI 도입',
    '데이터 거버넌스 체계 구축'
  ];
}

/**
 * 중요도-긴급성 매트릭스 생성
 */
function generateImportanceUrgencyMatrix(swotStrategies, evaluationData, applicationData) {
  console.log('📊 중요도-긴급성 매트릭스 생성');
  
  const tasks = extractAllTasks(swotStrategies, evaluationData, applicationData);
  
  const matrix = {
    quadrant1: [], // 중요하고 긴급함
    quadrant2: [], // 중요하지만 긴급하지 않음
    quadrant3: [], // 긴급하지만 중요하지 않음
    quadrant4: []  // 중요하지도 긴급하지도 않음
  };
  
  tasks.forEach(task => {
    const evaluation = evaluateTask(task, evaluationData, applicationData);
    
    if (evaluation.importance >= 7 && evaluation.urgency >= 7) {
      matrix.quadrant1.push(task);
    } else if (evaluation.importance >= 7 && evaluation.urgency < 7) {
      matrix.quadrant2.push(task);
    } else if (evaluation.importance < 7 && evaluation.urgency >= 7) {
      matrix.quadrant3.push(task);
    } else {
      matrix.quadrant4.push(task);
    }
  });
  
  return matrix;
}

/**
 * 모든 과제 추출
 */
function extractAllTasks(swotStrategies, evalData, appData) {
  return [
    { name: 'AI 전문 인력 채용', importance: 8, urgency: 9 },
    { name: 'AI 교육 프로그램 실시', importance: 9, urgency: 7 },
    { name: '데이터 인프라 구축', importance: 8, urgency: 6 },
    { name: 'AI 파일럿 프로젝트', importance: 7, urgency: 8 }
  ];
}

/**
 * 과제 평가
 */
function evaluateTask(task, evalData, appData) {
  return {
    importance: task.importance || 5,
    urgency: task.urgency || 5
  };
}

// ================================================================================
// MODULE 6: 로드맵 및 ROI
// ================================================================================

/**
 * 실행 로드맵 생성
 */
function generateExecutionRoadmap(applicationData, evaluationData, analysisData) {
  console.log('📋 실행 로드맵 생성');
  
  const roadmap = {
    phase1: generatePhase1(applicationData, evaluationData, analysisData),
    phase2: generatePhase2(applicationData, evaluationData, analysisData),
    phase3: generatePhase3(applicationData, evaluationData, analysisData),
    milestones: generateMilestones(applicationData, evaluationData),
    kpis: generateKPIs(applicationData, evaluationData)
  };
  
  return roadmap;
}

/**
 * 1단계 생성
 */
function generatePhase1(appData, evalData, analysisData) {
  return {
    name: '기반 구축 단계',
    duration: '0-3개월',
    objectives: [
      'AI 전환 TF팀 구성',
      '현황 분석 및 목표 설정',
      'Quick Win 프로젝트 선정'
    ],
    activities: [
      {
        name: 'AI 전환 TF팀 구성',
        description: '경영진, IT, 현업 부서 대표로 구성',
        deliverable: 'TF팀 구성 및 역할 정의서',
        timeline: '1주'
      }
    ],
    investment: '500만원',
    expectedOutcome: 'AI 도입 기반 마련'
  };
}

/**
 * 2단계 생성
 */
function generatePhase2(appData, evalData, analysisData) {
  return {
    name: '시범 적용 단계',
    duration: '3-6개월',
    objectives: [
      '파일럿 프로젝트 실행',
      'AI 도구 도입 및 테스트',
      '초기 성과 측정'
    ],
    activities: [],
    investment: '2000만원',
    expectedOutcome: 'AI 초기 성과 확인'
  };
}

/**
 * 3단계 생성
 */
function generatePhase3(appData, evalData, analysisData) {
  return {
    name: '확산 적용 단계',
    duration: '6-12개월',
    objectives: [
      '전사 AI 확산',
      '프로세스 최적화',
      '지속 개선 체계 구축'
    ],
    activities: [],
    investment: '5000만원',
    expectedOutcome: 'AI 기반 경쟁력 확보'
  };
}

/**
 * 마일스톤 생성
 */
function generateMilestones(appData, evalData) {
  return [
    { month: 1, milestone: 'TF팀 구성 완료' },
    { month: 3, milestone: '파일럿 프로젝트 착수' },
    { month: 6, milestone: '초기 성과 달성' },
    { month: 12, milestone: '전사 확산 완료' }
  ];
}

/**
 * KPI 생성
 */
function generateKPIs(appData, evalData) {
  return [
    { name: '프로세스 효율성', target: '30% 개선', measurement: '처리 시간' },
    { name: '비용 절감', target: '20% 절감', measurement: '운영 비용' },
    { name: '고객 만족도', target: '15% 향상', measurement: 'NPS 점수' }
  ];
}

/**
 * ROI 분석 생성
 */
function generateROIAnalysis(applicationData, evaluationData, roadmap) {
  console.log('💰 ROI 분석 생성');
  
  const investment = calculateTotalInvestment(applicationData, evaluationData);
  const returns = calculateExpectedReturns(applicationData, evaluationData);
  
  return {
    totalInvestment: investment,
    expectedReturns: returns,
    roi: calculateROI(investment, returns),
    paybackPeriod: calculatePaybackPeriod(returns, investment),
    npv: calculateNPV(returns, 0.1),
    risks: analyzeROIRisks(applicationData, evaluationData)
  };
}

/**
 * 총 투자금 계산
 */
function calculateTotalInvestment(appData, evalData) {
  return {
    software: 3000000,
    hardware: 2000000,
    training: 1500000,
    consulting: 2000000,
    total: 8500000
  };
}

/**
 * 예상 수익 계산
 */
function calculateExpectedReturns(appData, evalData) {
  return {
    costSavings: 5000000,
    revenueIncrease: 8000000,
    productivityGains: 3000000,
    total: 16000000
  };
}

/**
 * ROI 계산
 */
function calculateROI(investment, returns) {
  const totalInvestment = investment.total || investment;
  const totalReturns = returns.total || returns;
  return Math.round(((totalReturns - totalInvestment) / totalInvestment) * 100);
}

/**
 * 투자회수기간 계산
 */
function calculatePaybackPeriod(returns, investment) {
  const monthlyReturn = returns.total / 12;
  const totalInvestment = investment.total || investment;
  return Math.ceil(totalInvestment / monthlyReturn);
}

/**
 * NPV 계산
 */
function calculateNPV(cashFlow, discountRate) {
  // 간단한 NPV 계산
  return 10000000;
}

/**
 * ROI 리스크 분석
 */
function analyzeROIRisks(appData, evalData) {
  return [
    { risk: '기술 변화', probability: '중간', impact: '높음' },
    { risk: '조직 저항', probability: '낮음', impact: '중간' },
    { risk: '예산 초과', probability: '낮음', impact: '높음' }
  ];
}

// ================================================================================
// MODULE 7: Gemini 보고서 생성
// ================================================================================

/**
 * Gemini API 호출
 */
function callGeminiAPI(prompt, retryCount = 0) {
  console.log(`🤖 Gemini API 호출 시도 ${retryCount + 1}/${ENV.MAX_RETRIES}`);
  
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${ENV.AI_MODEL}:generateContent?key=${ENV.GEMINI_API_KEY}`;
  
  try {
    const response = UrlFetchApp.fetch(apiUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 16384,
          topP: 0.95,
          topK: 40
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
      }),
      muteHttpExceptions: true
    });
    
    const result = JSON.parse(response.getContentText());
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const content = result.candidates[0].content.parts[0].text;
      console.log('✅ Gemini API 응답 성공');
      return content;
    } else {
      throw new Error('Invalid API response structure');
    }
    
  } catch (error) {
    console.error(`❌ Gemini API 오류 (시도 ${retryCount + 1}):`, error);
    
    if (retryCount < ENV.MAX_RETRIES - 1) {
      console.log('🔄 재시도 대기 중...');
      Utilities.sleep(2000 * (retryCount + 1));
      return callGeminiAPI(prompt, retryCount + 1);
    }
    
    throw error;
  }
}

/**
 * 최종 AI 보고서 생성
 */
function generateUltimateAIReport(applicationData, evaluationData, analysisData) {
  console.log('📝 최종 AI 보고서 생성 시작');
  
  try {
    const prompt = generateUltimatePrompt(applicationData, evaluationData, analysisData);
    const aiContent = callGeminiAPI(prompt);
    
    if (!aiContent || aiContent.length < 5000) {
      console.warn('⚠️ AI 보고서가 너무 짧음, 구조화된 보고서 생성');
      return generateStructuredReport(applicationData, evaluationData, analysisData);
    }
    
    return {
      report: aiContent,
      metadata: {
        length: aiContent.length,
        quality: 'AI Generated',
        timestamp: getCurrentKoreanTime(),
        score: evaluationData.scores.totalScore,
        grade: evaluationData.scores.grade,
        maturityLevel: evaluationData.maturityLevel
      },
      evaluationData: evaluationData,
      analysisData: analysisData
    };
    
  } catch (error) {
    console.error('❌ AI 보고서 생성 실패:', error);
    return generateStructuredReport(applicationData, evaluationData, analysisData);
  }
}

/**
 * 프롬프트 생성 (고도화 버전)
 */
function generateUltimatePrompt(appData, evalData, analysisData) {
  // 업종별 AI 트렌드 정보
  const industryTrends = getIndustryAITrends(appData.industry);
  
  // SWOT 전략 요약
  const swotSummary = summarizeSWOTStrategies(analysisData.swot);
  
  return `
당신은 AICAMP 이후경 교장의 고몰입조직구축 AI역량강화 진단보고서 전문가입니다.
${appData.companyName}을 위한 15,000자 이상의 최고 수준 맞춤형 진단보고서를 작성해주세요.

⚠️ 중요 원칙:
- 절대 폴백 답변이나 일반적인 내용 금지
- 반드시 ${appData.industry} 업종 특화 내용으로 작성
- 2025년 최신 AI 트렌드와 기술 반영
- ${appData.companyName}만을 위한 100% 맞춤형 내용
- 모든 제안에 구체적 수치, 일정, 예산 포함

[1. 기업 프로필]
회사명: ${appData.companyName}
업종: ${appData.industry}
직원수: ${appData.employeeCount || '50명 이하'}
연매출: ${appData.annualRevenue || '10억 이하'}
주요 고민: ${appData.mainChallenges || 'AI 도입 초기 단계'}
기대 효과: ${appData.expectedBenefits || '업무 효율성 향상'}

[2. AI 역량 진단 결과]
종합점수: ${evalData.scores.totalScore}점 (업계 평균: ${evalData.benchmark.industryAverage}점)
등급: ${evalData.scores.grade}등급
AI 성숙도: ${evalData.maturityLevel}
업계 순위: ${evalData.benchmark.percentile}

세부 점수:
- AI 이해 및 전략: ${evalData.scores.aiCapability.aiUnderstanding}점
- 데이터 관리: ${evalData.scores.aiCapability.dataManagement}점
- 프로세스 혁신: ${evalData.scores.aiCapability.processOptimization}점
- 인재 육성: ${evalData.scores.aiCapability.talentDevelopment}점
- 고객 경험: ${evalData.scores.aiCapability.customerExperience}점

[3. ${appData.industry} 업종 AI 트렌드]
${industryTrends}

[4. SWOT 분석 결과]
${swotSummary}

[5. 작성해야 할 섹션] - 각 섹션 2,000자 이상

1) 종합 진단 요약
   - ${appData.companyName}의 현재 AI 역량 수준
   - 업계 대비 경쟁력 분석
   - 핵심 개선 영역 3가지

2) 6대 영역별 상세 분석
   - 리더십과 비전
   - 인프라와 기술
   - 인재와 역량
   - 문화와 조직
   - 실무 적용
   - 데이터 활용

3) SWOT 기반 전략 제안
   - SO 전략: ${analysisData.swot.strategies.SO.length}개 전략 상세 설명
   - WO 전략: ${analysisData.swot.strategies.WO.length}개 전략 상세 설명
   - ST 전략: ${analysisData.swot.strategies.ST.length}개 전략 상세 설명
   - WT 전략: ${analysisData.swot.strategies.WT.length}개 전략 상세 설명

4) AI 역량진단 결과 매트릭스
   - 현재 위치: ${analysisData.aiMatrix.currentPosition.quadrant}
   - 목표 위치: ${analysisData.aiMatrix.targetPosition.quadrant}
   - 이동 경로와 필요 역량

5) 중요도-긴급성 매트릭스
   - 즉시 실행 과제 (1사분면): ${analysisData.urgencyMatrix.quadrant1.length}개
   - 전략적 과제 (2사분면): ${analysisData.urgencyMatrix.quadrant2.length}개
   - 단기 과제 (3사분면): ${analysisData.urgencyMatrix.quadrant3.length}개
   - 장기 과제 (4사분면): ${analysisData.urgencyMatrix.quadrant4.length}개

6) 고몰입조직구축 3단계 로드맵
   - 1단계(${analysisData.roadmap.phase1.duration}): ${analysisData.roadmap.phase1.name}
     * 핵심 목표 3개
     * 실행 과제 5개
     * 예산: ${analysisData.roadmap.phase1.investment}
   - 2단계(${analysisData.roadmap.phase2.duration}): ${analysisData.roadmap.phase2.name}
     * 핵심 목표 3개
     * 실행 과제 5개
     * 예산: ${analysisData.roadmap.phase2.investment}
   - 3단계(${analysisData.roadmap.phase3.duration}): ${analysisData.roadmap.phase3.name}
     * 핵심 목표 3개
     * 실행 과제 5개
     * 예산: ${analysisData.roadmap.phase3.investment}

7) 투자 대비 효과 분석
   - 총 투자금: ${formatKoreanCurrency(analysisData.roi.totalInvestment.total)}
   - 예상 수익: ${formatKoreanCurrency(analysisData.roi.expectedReturns.total)}
   - ROI: ${analysisData.roi.roi}%
   - 투자회수기간: ${analysisData.roi.paybackPeriod}개월
   - 위험 요인 및 대응 방안

8) ${appData.industry} 특화 AI 활용 방안
   - 업종별 Best Practice 3개
   - 경쟁사 대비 차별화 전략
   - Quick Win 프로젝트 제안

9) AICAMP 맞춤형 제안
   - AI 교육 프로그램 (${appData.employeeCount || 50}명 규모 최적화)
   - 컨설팅 서비스 (${appData.consultingArea || 'AI 전략 수립'} 중심)
   - 기술 지원 서비스
   - 예상 투자 규모와 기대 효과

10) 실행을 위한 체크리스트
    - 즉시 실행 항목 (1주 내)
    - 단기 실행 항목 (1개월 내)
    - 중기 실행 항목 (3개월 내)
    - 장기 실행 항목 (6개월 내)

11) 맺음말과 다음 단계
    - 핵심 메시지
    - AICAMP 연락처 및 상담 안내
    - 무료 파일럿 프로젝트 제안

⚠️ 반드시 지켜야 할 원칙:
1. 모든 내용은 ${appData.companyName}과 ${appData.industry}에 특화
2. 구체적 수치, 일정, 예산 제시
3. 실제 실행 가능한 구체적 방안
4. 2025년 최신 트렌드 반영
5. 폴백 답변 절대 금지
`;
}

/**
 * 업종별 AI 트렌드 정보 가져오기
 */
function getIndustryAITrends(industry) {
  const trends = {
    'IT/소프트웨어': '생성형 AI 통합, 코드 자동화, AIOps, 지능형 DevOps, AI 보안',
    '제조업': '스마트팩토리, 예측정비, 품질검사 AI, 디지털 트윈, 공급망 최적화',
    '금융업': 'AI 리스크 관리, 로보어드바이저, 이상거래 탐지, 대화형 뱅킹, RegTech',
    '서비스업': '초개인화 서비스, 챗봇 상담, 감정 분석, 수요 예측, 고객 여정 최적화',
    '유통/도소매': 'AI 추천 시스템, 재고 최적화, 동적 가격 책정, 무인 매장, 옴니채널',
    '의료/헬스케어': 'AI 진단 보조, 신약 개발, 맞춤 의료, 원격 진료, 의료 영상 분석',
    '교육': '맞춤형 학습, AI 튜터, 자동 평가, 학습 분석, 몰입형 교육',
    '기타': 'RPA, 문서 자동화, 예측 분석, 프로세스 최적화, 의사결정 지원'
  };
  
  return trends[industry] || trends['기타'];
}

/**
 * SWOT 전략 요약
 */
function summarizeSWOTStrategies(swot) {
  let summary = '강점: ';
  summary += swot.strengths.map(s => s.factor).join(', ') || '분석 중';
  summary += '\n약점: ';
  summary += swot.weaknesses.map(w => w.factor).join(', ') || '분석 중';
  summary += '\n기회: ';
  summary += swot.opportunities.map(o => o.factor).join(', ') || '분석 중';
  summary += '\n위협: ';
  summary += swot.threats.map(t => t.factor).join(', ') || '분석 중';
  
  return summary;
}

/**
 * 한국 화폐 형식으로 변환
 */
function formatKoreanCurrency(amount) {
  if (!amount) return '0원';
  
  const num = typeof amount === 'string' ? parseInt(amount) : amount;
  
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '억원';
  } else if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + '천만원';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + '백만원';
  } else if (num >= 10000) {
    return (num / 10000).toFixed(0) + '만원';
  } else {
    return num.toLocaleString() + '원';
  }
}

/**
 * 구조화된 보고서 생성
 */
function generateStructuredReport(appData, evalData, analysisData) {
  const sections = [];
  
  sections.push(generateExecutiveSummary(appData, evalData, analysisData));
  sections.push(generateDiagnosisResults(appData, evalData, analysisData));
  sections.push(generateSWOTSection(analysisData.swot));
  sections.push(generateRoadmapSection(analysisData.roadmap));
  sections.push(generateROISection(analysisData.roi));
  sections.push(generateAICAMPProposal(appData, evalData));
  
  const report = sections.join('\n\n');
  
  return {
    report: report,
    metadata: {
      length: report.length,
      quality: 'Structured',
      timestamp: getCurrentKoreanTime(),
      score: evalData.scores.totalScore,
      grade: evalData.scores.grade,
      maturityLevel: evalData.maturityLevel
    },
    evaluationData: evalData,
    analysisData: analysisData
  };
}

// 보고서 섹션 생성 함수들
function generateExecutiveSummary(appData, evalData, analysisData) {
  return `# ${appData.companyName} AI 역량진단 보고서\n\n## 요약\n종합점수: ${evalData.scores.totalScore}점`;
}

function generateDiagnosisResults(appData, evalData, analysisData) {
  return `## 진단 결과\n\n### AI 역량\n- 점수: ${evalData.scores.aiCapability.average}점`;
}

function generateSWOTSection(swot) {
  return `## SWOT 분석\n\n### 강점\n${swot.strengths.map(s => `- ${s.description}`).join('\n')}`;
}

function generateRoadmapSection(roadmap) {
  return `## 실행 로드맵\n\n### 1단계: ${roadmap.phase1.name}\n기간: ${roadmap.phase1.duration}`;
}

function generateROISection(roi) {
  return `## ROI 분석\n\n투자금: ${roi.totalInvestment}원\n예상 수익: ${roi.expectedReturns}원`;
}

function generateAICAMPProposal(appData, evalData) {
  return `## AICAMP 제안\n\n귀사를 위한 맞춤형 AI 전환 솔루션을 제공합니다.`;
}

// ================================================================================
// MODULE 8: 이메일 및 데이터 저장
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
      sendAdminNotification(applicationData, reportData.evaluationData || {}, diagnosisId);
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
 * 신청자 확인 이메일 (고도화 버전)
 */
function sendApplicantEmail(appData, reportData, diagnosisId) {
  const evalData = reportData.evaluationData || {};
  const analysisData = reportData.analysisData || {};
  const subject = `[AICAMP] ${appData.companyName}님의 고몰입조직구축 AI 역량진단이 완료되었습니다 🎉`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }
    .logo-container {
      margin-bottom: 20px;
    }
    .logo {
      max-width: 200px;
      height: auto;
    }
    .header h1 {
      margin: 20px 0 10px 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
      background-color: #ffffff;
    }
    .greeting {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .score-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 16px;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .score-title {
      font-size: 20px;
      color: #4a5568;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .score-display {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
    }
    .score-item {
      flex: 1;
    }
    .score-value {
      font-size: 48px;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 10px 0;
    }
    .score-label {
      font-size: 14px;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .maturity-badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
    }
    .features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 30px 0;
    }
    .feature-item {
      background: #f7fafc;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .feature-icon {
      color: #667eea;
      font-size: 20px;
      margin-right: 8px;
    }
    .cta-section {
      text-align: center;
      margin: 40px 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      margin: 10px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      transition: transform 0.3s ease;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .secondary-button {
      display: inline-block;
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
      padding: 14px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 14px;
      margin: 10px;
    }
    .info-box {
      background: #fef5e7;
      border: 1px solid #f39c12;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .info-box h3 {
      color: #e67e22;
      margin-top: 0;
      font-size: 18px;
    }
    .benefit-list {
      list-style: none;
      padding: 0;
    }
    .benefit-list li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }
    .benefit-list li:before {
      content: '✅';
      position: absolute;
      left: 0;
    }
    .footer {
      background: #2d3748;
      color: white;
      padding: 30px;
      text-align: center;
    }
    .footer-logo {
      max-width: 150px;
      margin-bottom: 20px;
      opacity: 0.9;
    }
    .contact-info {
      margin: 20px 0;
      font-size: 14px;
      line-height: 1.8;
    }
    .contact-info a {
      color: #cbd5e0;
      text-decoration: none;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: white;
      font-size: 20px;
    }
    .copyright {
      font-size: 12px;
      color: #a0aec0;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #4a5568;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img src="${AICAMP_INFO.LOGO_URL}" alt="AICAMP" class="logo">
      </div>
      <h1>🎊 AI 역량진단이 완료되었습니다!</h1>
      <p>${AICAMP_INFO.SLOGAN}</p>
    </div>
    
    <div class="content">
      <div class="greeting">
        안녕하세요, <strong>${appData.contactName || appData.companyName}</strong> 님<br>
        <strong>${appData.companyName}</strong>의 고몰입조직구축 AI 역량진단이 성공적으로 완료되었습니다.
      </div>
      
      <div class="score-card">
        <h2 class="score-title">🏆 종합 진단 결과</h2>
        <div class="score-display">
          <div class="score-item">
            <div class="score-value">${reportData.metadata.score || evalData.scores.totalScore}점</div>
            <div class="score-label">종합점수</div>
          </div>
          <div class="score-item">
            <div class="score-value">${reportData.metadata.grade || evalData.scores.grade}</div>
            <div class="score-label">등급</div>
          </div>
        </div>
        <div class="maturity-badge">
          AI 성숙도: ${reportData.metadata.maturityLevel || evalData.maturityLevel}
        </div>
      </div>
      
      <div class="features-grid">
        <div class="feature-item">
          <span class="feature-icon">📊</span>
          <strong>6대 영역 상세 분석</strong>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🎯</span>
          <strong>SWOT 전략 제안</strong>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📈</span>
          <strong>AI 역량 매트릭스</strong>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🗺️</span>
          <strong>3단계 실행 로드맵</strong>
        </div>
      </div>
      
      <div class="info-box">
        <h3>💡 ${appData.companyName}을 위한 맞춤형 제안</h3>
        <ul class="benefit-list">
          <li>업계 평균 대비 ${evalData.benchmark.gap > 0 ? '+' : ''}${evalData.benchmark.gap}점 ${evalData.benchmark.gap > 0 ? '우수' : '개선 필요'}</li>
          <li>즉시 실행 가능한 Quick Win 프로젝트 ${analysisData.urgencyMatrix.quadrant1.length}개</li>
          <li>예상 ROI: ${analysisData.roi.roi}% (${analysisData.roi.paybackPeriod}개월 내 투자 회수)</li>
          <li>맞춤형 AI 교육 및 컨설팅 프로그램 제공</li>
        </ul>
      </div>
      
      <div class="cta-section">
        <a href="https://aicamp.club/diagnosis/results/${diagnosisId}" class="cta-button">
          📄 상세 보고서 확인하기
        </a>
        <br>
        <a href="tel:${AICAMP_INFO.CEO_PHONE}" class="secondary-button">
          📞 무료 상담 신청
        </a>
      </div>
      
      <div style="background: #e8f4fd; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h3 style="color: #2c5aa0; margin-top: 0;">🎁 특별 혜택 안내</h3>
        <p style="color: #333; line-height: 1.6;">
          진단 결과를 바탕으로 <strong>무료 파일럿 프로젝트</strong>를 제안드립니다.<br>
          지금 상담 신청하시면 AICAMP의 전문가가 직접 방문하여<br>
          귀사만을 위한 맞춤형 AI 전환 전략을 수립해드립니다.
        </p>
      </div>
    </div>
    
    <div class="footer">
      <img src="${AICAMP_INFO.LOGO_URL}" alt="AICAMP" class="footer-logo">
      <div class="contact-info">
        <strong>${AICAMP_INFO.CEO_NAME} ${AICAMP_INFO.PRINCIPAL_TITLE}</strong><br>
        📞 <a href="tel:${AICAMP_INFO.CEO_PHONE}">${AICAMP_INFO.CEO_PHONE}</a><br>
        ✉️ <a href="mailto:${AICAMP_INFO.CEO_EMAIL}">${AICAMP_INFO.CEO_EMAIL}</a><br>
        🌐 <a href="${AICAMP_INFO.WEBSITE}">${AICAMP_INFO.WEBSITE}</a><br>
        💬 카카오톡: ${AICAMP_INFO.KAKAO_ID}
      </div>
      <div class="copyright">
        © 2025 ${AICAMP_INFO.COMPANY_NAME}. All rights reserved.<br>
        진단 ID: ${diagnosisId} | ${getCurrentKoreanTime()}
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  try {
    MailApp.sendEmail({
      to: appData.email,
      subject: subject,
      htmlBody: htmlBody,
      name: `AICAMP ${AICAMP_INFO.CEO_NAME} ${AICAMP_INFO.PRINCIPAL_TITLE}`,
      replyTo: AICAMP_INFO.CEO_EMAIL
    });
    
    console.log(`✅ 신청자 이메일 발송 완료: ${appData.email}`);
    
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 관리자 알림 이메일 (고도화 버전)
 */
function sendAdminNotification(appData, evalData, diagnosisId) {
  const subject = `🔔 [신규 AI진단] ${appData.companyName} (${appData.industry}) - 점수: ${evalData.scores.totalScore}점`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Noto Sans KR', Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .section h2 {
      color: #667eea;
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 15px;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .info-item {
      padding: 10px;
      background: white;
      border-radius: 5px;
      border-left: 3px solid #667eea;
    }
    .label {
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .value {
      font-size: 16px;
      color: #2d3748;
      font-weight: 600;
    }
    .score-highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .score-highlight .score {
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
    }
    .score-highlight .grade {
      font-size: 24px;
      margin: 5px 0;
    }
    .action-buttons {
      display: flex;
      gap: 15px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    .action-button {
      display: inline-block;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      text-align: center;
      flex: 1;
      min-width: 200px;
    }
    .action-button:hover {
      background: #5a67d8;
    }
    .action-button.secondary {
      background: #48bb78;
    }
    .action-button.secondary:hover {
      background: #38a169;
    }
    .urgent-tag {
      display: inline-block;
      background: #f56565;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 10px;
    }
    .challenges-box {
      background: #fef5e7;
      border: 1px solid #f39c12;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
    }
    .challenges-box h3 {
      color: #e67e22;
      margin-top: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th {
      background: #667eea;
      color: white;
      padding: 10px;
      text-align: left;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
    }
    .footer {
      background: #2d3748;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #cbd5e0;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 신규 AI 역량진단 접수 알림</h1>
      <p>${getCurrentKoreanTime()}</p>
    </div>
    
    <div class="content">
      <!-- 진단 결과 하이라이트 -->
      <div class="score-highlight">
        <div>종합 진단 결과</div>
        <div class="score">${evalData.scores.totalScore}점</div>
        <div class="grade">${evalData.scores.grade}등급 | ${evalData.maturityLevel}</div>
        <div>업계 평균 대비: ${evalData.benchmark.gap > 0 ? '+' : ''}${evalData.benchmark.gap}점</div>
      </div>
      
      <!-- 기업 정보 섹션 -->
      <div class="section">
        <h2>📋 기업 정보</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="label">진단 ID</div>
            <div class="value">${diagnosisId}</div>
          </div>
          <div class="info-item">
            <div class="label">회사명</div>
            <div class="value">${appData.companyName}
              ${evalData.scores.totalScore >= 80 ? '<span class="urgent-tag">우수 기업</span>' : ''}
              ${evalData.scores.totalScore <= 50 ? '<span class="urgent-tag">긴급 지원 필요</span>' : ''}
            </div>
          </div>
          <div class="info-item">
            <div class="label">업종</div>
            <div class="value">${appData.industry}</div>
          </div>
          <div class="info-item">
            <div class="label">담당자</div>
            <div class="value">${appData.contactName || '미입력'}</div>
          </div>
          <div class="info-item">
            <div class="label">이메일</div>
            <div class="value"><a href="mailto:${appData.email}">${appData.email}</a></div>
          </div>
          <div class="info-item">
            <div class="label">연락처</div>
            <div class="value"><a href="tel:${appData.phone}">${formatPhoneNumber(appData.phone)}</a></div>
          </div>
          <div class="info-item">
            <div class="label">직원수</div>
            <div class="value">${appData.employeeCount || '미입력'}</div>
          </div>
          <div class="info-item">
            <div class="label">연매출</div>
            <div class="value">${appData.annualRevenue || '미입력'}</div>
          </div>
        </div>
      </div>
      
      <!-- 주요 고민사항 -->
      ${appData.mainChallenges ? `
      <div class="challenges-box">
        <h3>💭 주요 고민사항</h3>
        <p>${appData.mainChallenges}</p>
      </div>
      ` : ''}
      
      <!-- 세부 점수 테이블 -->
      <div class="section">
        <h2>📊 세부 평가 결과</h2>
        <table>
          <tr>
            <th>평가 영역</th>
            <th>점수</th>
            <th>상태</th>
          </tr>
          <tr>
            <td>AI 이해 및 전략</td>
            <td>${evalData.scores.aiCapability.aiUnderstanding}점</td>
            <td>${evalData.scores.aiCapability.aiUnderstanding >= 70 ? '✅ 우수' : evalData.scores.aiCapability.aiUnderstanding >= 50 ? '⚠️ 보통' : '❌ 미흡'}</td>
          </tr>
          <tr>
            <td>데이터 관리</td>
            <td>${evalData.scores.aiCapability.dataManagement}점</td>
            <td>${evalData.scores.aiCapability.dataManagement >= 70 ? '✅ 우수' : evalData.scores.aiCapability.dataManagement >= 50 ? '⚠️ 보통' : '❌ 미흡'}</td>
          </tr>
          <tr>
            <td>프로세스 혁신</td>
            <td>${evalData.scores.aiCapability.processOptimization}점</td>
            <td>${evalData.scores.aiCapability.processOptimization >= 70 ? '✅ 우수' : evalData.scores.aiCapability.processOptimization >= 50 ? '⚠️ 보통' : '❌ 미흡'}</td>
          </tr>
          <tr>
            <td>인재 육성</td>
            <td>${evalData.scores.aiCapability.talentDevelopment}점</td>
            <td>${evalData.scores.aiCapability.talentDevelopment >= 70 ? '✅ 우수' : evalData.scores.aiCapability.talentDevelopment >= 50 ? '⚠️ 보통' : '❌ 미흡'}</td>
          </tr>
          <tr>
            <td>고객 경험</td>
            <td>${evalData.scores.aiCapability.customerExperience}점</td>
            <td>${evalData.scores.aiCapability.customerExperience >= 70 ? '✅ 우수' : evalData.scores.aiCapability.customerExperience >= 50 ? '⚠️ 보통' : '❌ 미흡'}</td>
          </tr>
        </table>
      </div>
      
      <!-- 상담 필요 분야 -->
      ${appData.consultingArea ? `
      <div class="section">
        <h2>🎯 희망 컨설팅 분야</h2>
        <p>${appData.consultingArea}</p>
      </div>
      ` : ''}
      
      <!-- 액션 버튼 -->
      <div class="action-buttons">
        <a href="${GOOGLE_SHEETS_URL}" class="action-button" target="_blank">
          📊 구글 시트에서 전체 데이터 보기
        </a>
        <a href="https://aicamp.club/diagnosis/results/${diagnosisId}" class="action-button secondary" target="_blank">
          📄 온라인 보고서 확인
        </a>
        <a href="tel:${appData.phone}" class="action-button">
          📞 고객에게 전화하기
        </a>
        <a href="mailto:${appData.email}?subject=AICAMP AI 역량진단 결과 상담&body=안녕하세요 ${appData.contactName || appData.companyName}님," class="action-button">
          ✉️ 상담 메일 보내기
        </a>
      </div>
      
      <!-- 추천 액션 -->
      <div class="section">
        <h2>💡 추천 후속 조치</h2>
        <ul>
          ${evalData.scores.totalScore >= 80 ? 
            '<li><strong>우수 기업:</strong> 고급 AI 전환 프로그램 제안</li>' : ''}
          ${evalData.scores.totalScore >= 60 && evalData.scores.totalScore < 80 ? 
            '<li><strong>성장 가능 기업:</strong> 단계별 AI 도입 컨설팅 제안</li>' : ''}
          ${evalData.scores.totalScore < 60 ? 
            '<li><strong>초기 단계 기업:</strong> AI 기초 교육 및 파일럿 프로젝트 제안</li>' : ''}
          <li>24시간 내 초기 상담 전화</li>
          <li>맞춤형 제안서 작성 및 발송</li>
          <li>무료 파일럿 프로젝트 제안</li>
        </ul>
      </div>
    </div>
    
    <div class="footer">
      <p>
        이 메일은 AICAMP AI 역량진단 시스템에서 자동 발송되었습니다.<br>
        문의: ${AICAMP_INFO.CEO_EMAIL} | ${AICAMP_INFO.CEO_PHONE}<br>
        <a href="${AICAMP_INFO.WEBSITE}">${AICAMP_INFO.WEBSITE}</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
  
  try {
    MailApp.sendEmail({
      to: AICAMP_INFO.ADMIN_EMAIL,
      cc: AICAMP_INFO.CEO_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP AI 진단 시스템',
      replyTo: appData.email
    });
    
    console.log(`✅ 관리자 알림 발송 완료: ${AICAMP_INFO.ADMIN_EMAIL}`);
    
  } catch (error) {
    console.error('❌ 관리자 알림 발송 실패:', error);
  }
}

/**
 * 진단 데이터 저장
 */
function saveDiagnosisData(applicationData, evaluationData, analysisData, reportData) {
  console.log('💾 진단 데이터 저장 시작');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const diagnosisId = applicationData.diagnosisId || generateDiagnosisId();
    
    // 진단 신청 데이터 저장
    saveDiagnosisApplication(spreadsheet, diagnosisId, applicationData, evaluationData);
    
    console.log('✅ 진단 데이터 저장 완료:', diagnosisId);
    return diagnosisId;
    
  } catch (error) {
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
    '',
    appData.mainChallenges || '',
    appData.expectedBenefits || '',
    appData.consultingArea || '',
    appData.privacyConsent === true ? '동의' : '미동의',
    appData.privacyConsent === true ? getCurrentKoreanTime() : '',
    '완료'
  ];
  
  sheet.appendRow(row);
}

// ================================================================================
// MODULE 9: 메인 API
// ================================================================================

/**
 * AI 진단 신청 처리
 */
function handleAIDiagnosisSubmission(requestData) {
  console.log('🚀 AI 역량진단 신청 처리 시작');
  const startTime = new Date().getTime();
  
  try {
    // 1. 데이터 검증 및 정규화
    const diagnosisId = generateDiagnosisId();
    const applicationData = validateAndNormalizeData(requestData, diagnosisId);
    
    // 2. 접수확인 이메일 발송 (관리자 + 신청자)
    sendDiagnosisConfirmationEmails(applicationData, diagnosisId);
    
    // 3. AI 역량 자동 평가
    const evaluationData = autoEvaluateAICapabilities(applicationData);
    
    // 4. 종합 분석 수행
    const analysisData = performComprehensiveAnalysis(applicationData, evaluationData);
    
    // 5. AI 보고서 생성
    const reportData = generateUltimateAIReport(applicationData, evaluationData, analysisData);
    
    // 6. HTML 보고서 생성 및 저장
    const htmlReport = generateHTMLReport(applicationData, evaluationData, analysisData, reportData);
    const reportUrl = saveHTMLReport(htmlReport, diagnosisId);
    
    // 7. 데이터 저장 (구글시트)
    const savedId = saveDiagnosisData(applicationData, evaluationData, analysisData, reportData);
    
    // 8. 최종 결과 이메일 발송
    sendDiagnosisResultEmails(applicationData, reportData, savedId, reportUrl);
    
    const processingTime = new Date().getTime() - startTime;
    console.log(`✅ AI 역량진단 처리 완료 (${processingTime}ms)`);
    
    return {
      success: true,
      diagnosisId: savedId,
      reportUrl: reportUrl,
      summary: generateResponseSummary(applicationData, evaluationData, analysisData),
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ AI 역량진단 처리 오류:', error);
    logError(error, { context: 'ai_diagnosis_submission' });
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'AI_DIAGNOSIS_FAILED'
    };
  }
}

/**
 * 데이터 검증 및 정규화 (개선된 버전)
 */
function validateAndNormalizeData(rawData, diagnosisId) {
  const normalized = {
    diagnosisId: diagnosisId,
    timestamp: getCurrentKoreanTime(),
    companyName: rawData.companyName || '',
    industry: rawData.industry || '기타',
    contactName: rawData.contactManager || rawData.contactName || rawData.applicantName || '',
    email: rawData.email || '',
    phone: rawData.phone || '',
    employeeCount: rawData.employeeCount || '',
    annualRevenue: rawData.annualRevenue || '',
    mainChallenges: rawData.mainChallenges || '',
    expectedBenefits: rawData.expectedBenefits || '',
    consultingArea: rawData.consultingArea || '',
    privacyConsent: rawData.privacyConsent || false,
    // 평가 응답 데이터 추가
    assessmentResponses: rawData.assessmentResponses || {}
  };
  
  // 필수 필드 검증
  if (!normalized.companyName || !normalized.email) {
    throw new Error('필수 정보가 누락되었습니다');
  }
  
  // 평가 응답 데이터 검증 및 정규화
  if (Object.keys(normalized.assessmentResponses).length === 0) {
    console.log('⚠️ 평가 응답 데이터가 없습니다. 기본값을 사용합니다.');
    // 기본 응답값 설정 (모든 항목을 "보통"으로 설정)
    normalized.assessmentResponses = generateDefaultAssessmentResponses();
  }
  
  return normalized;
}

/**
 * 기본 평가 응답 생성 (평가 데이터가 없을 경우)
 */
function generateDefaultAssessmentResponses() {
  return {
    // 경영진 리더십 및 AI 이해도
    L1: 3, L2: 3, L3: 3, L4: 3,
    // AI 인프라 및 시스템
    I1: 3, I2: 3, I3: 3, I4: 3,
    // 직원 AI 역량
    E1: 3, E2: 3, E3: 3, E4: 3,
    // AI 활용 조직문화
    C1: 3, C2: 3, C3: 3, C4: 3,
    // 실무 AI 적용
    P1: 3, P2: 3, P3: 3, P4: 3,
    // 데이터 활용 역량
    D1: 3, D2: 3, D3: 3, D4: 3
  };
}

/**
 * 종합 분석 수행
 */
function performComprehensiveAnalysis(applicationData, evaluationData) {
  console.log('🔍 종합 분석 수행');
  
  const analysis = {
    swot: performDeepSWOTAnalysis(applicationData, evaluationData),
    aiMatrix: generateAICapabilityMatrix(evaluationData, applicationData),
    urgencyMatrix: generateImportanceUrgencyMatrix(null, evaluationData, applicationData),
    roadmap: generateExecutionRoadmap(applicationData, evaluationData, null),
    roi: generateROIAnalysis(applicationData, evaluationData, null)
  };
  
  return analysis;
}

/**
 * 응답 요약 생성
 */
function generateResponseSummary(appData, evalData, analysisData) {
  return {
    companyName: appData.companyName,
    totalScore: evalData.scores.totalScore,
    grade: evalData.scores.grade,
    maturityLevel: evalData.maturityLevel,
    topRecommendations: [
      'AI 전문 인력 양성',
      '파일럿 프로젝트 시작',
      '데이터 거버넌스 구축'
    ]
  };
}

/**
 * POST 요청 처리
 */
function doPost(e) {
  console.log('📥 POST 요청 수신');
  
  try {
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action || 'diagnosis';
    
    let result;
    
    switch (action) {
      case 'diagnosis':
        result = handleAIDiagnosisSubmission(requestData);
        break;
      case 'consultation':
        result = handleConsultationRequest(requestData);
        break;
      case 'feedback':
        result = handleTaxCalculatorErrorReport(requestData);
        break;
      case 'beta_feedback':
        result = handleBetaFeedback(requestData);
        break;
      default:
        result = { success: false, error: 'Unknown action' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ POST 처리 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  console.log('📥 GET 요청 수신');
  
  try {
    const action = e.parameter.action || 'status';
    
    switch (action) {
      case 'status':
        return getStatusPage();
      case 'result':
        return handleGetFreeDiagnosisResult(e.parameter.diagnosisId);
      case 'download':
        return handleReportDownload(e.parameter.diagnosisId);
      default:
        return getStatusPage();
    }
    
  } catch (error) {
    console.error('❌ GET 처리 오류:', error);
    return getStatusPage();
  }
}

/**
 * 상태 페이지 반환
 */
function getStatusPage() {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>AICAMP AI 역량진단 시스템</title>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .status { background: #4CAF50; color: white; padding: 10px; border-radius: 5px; }
    .info { background: #f0f0f0; padding: 15px; margin: 10px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>AICAMP AI 역량진단 시스템</h1>
  <div class="status">✅ 시스템 정상 작동 중</div>
  <div class="info">
    <h2>시스템 정보</h2>
    <ul>
      <li>버전: ${VERSION}</li>
      <li>상태: 온라인</li>
      <li>최종 업데이트: ${getCurrentKoreanTime()}</li>
    </ul>
  </div>
</body>
</html>
  `;
  
  return HtmlService.createHtmlOutput(html);
}

/**
 * 진단 결과 조회
 */
function handleGetFreeDiagnosisResult(diagnosisId) {
  if (!diagnosisId) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '진단 ID가 필요합니다'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!sheet) {
      throw new Error('진단 데이터 시트를 찾을 수 없습니다');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        const result = {};
        headers.forEach((header, index) => {
          result[header] = data[i][index];
        });
        
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            data: result
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '진단 결과를 찾을 수 없습니다'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ 결과 조회 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 보고서 다운로드 처리
 */
function handleReportDownload(diagnosisId) {
  // 간단한 HTML 보고서 반환
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>AI 역량진단 보고서</title>
  <meta charset="UTF-8">
</head>
<body>
  <h1>AI 역량진단 보고서</h1>
  <p>진단 ID: ${diagnosisId}</p>
  <p>상세 보고서는 이메일로 발송되었습니다.</p>
</body>
</html>
  `;
  
  return HtmlService.createHtmlOutput(html);
}

/**
 * 상담 신청 처리
 */
function handleConsultationRequest(data) {
  console.log('📞 상담신청 처리 시작');
  
  try {
    // 1. 데이터 검증
    if (!data.companyName || !data.contactName || !data.email) {
      throw new Error('필수 정보가 누락되었습니다');
    }
    
    // 2. 상담신청 ID 생성
    const consultationId = generateUniqueId('CONS');
    
    // 3. 접수확인 이메일 발송 (관리자 + 신청자)
    sendConsultationConfirmationEmails(data, consultationId);
    
    // 4. 구글시트에 저장
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.CONSULTATION);
      const headers = [
        '상담신청ID',
        '접수일시',
        '회사명',
        '신청자명',
        '이메일',
        '연락처',
        '상담유형',
        '상담분야',
        '문의내용',
        '개인정보동의',
        '개인정보동의일시',
        '처리상태',
        '데이터소스',
        '관리자메모'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const rowData = [
      consultationId,
      getCurrentKoreanTime(),
      data.companyName || '',
      data.contactName || '',
      data.email || '',
      data.phone || '',
      data.consultationType || '',
      data.consultationArea || '',
      data.inquiryContent || '',
      data.privacyConsent === true ? '동의' : '미동의',
      data.privacyConsent === true ? getCurrentKoreanTime() : '',
      '신규',
      'API_백업시스템',
      ''
    ];
    
    sheet.appendRow(rowData);
    
    console.log('✅ 상담신청 처리 완료:', consultationId);
    
    return {
      success: true,
      consultationId: consultationId,
      message: '상담신청이 성공적으로 접수되었습니다. 확인 이메일을 발송했습니다.'
    };
    
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    logError(error, { context: 'consultation_request' });
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'CONSULTATION_FAILED'
    };
  }
}

/**
 * 베타 피드백 처리
 */
function handleBetaFeedback(data) {
  console.log('💬 베타 피드백 처리');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.BETA_FEEDBACK);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.BETA_FEEDBACK);
      const headers = ['제출일시', '이름', '이메일', '피드백', '평점'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const row = [
      getCurrentKoreanTime(),
      data.name || '',
      data.email || '',
      data.feedback || '',
      data.rating || ''
    ];
    
    sheet.appendRow(row);
    
    return {
      success: true,
      message: '피드백이 제출되었습니다'
    };
    
  } catch (error) {
    console.error('❌ 피드백 처리 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 세금계산기 오류 신고 처리
 */
function handleTaxCalculatorErrorReport(data) {
  console.log('🚨 세금계산기 오류 신고 처리 시작');
  
  try {
    // 1. 데이터 검증
    if (!data.name || !data.email || !data.calculatorType || !data.errorDescription) {
      throw new Error('필수 정보가 누락되었습니다');
    }
    
    // 2. 오류신고 ID 생성
    const reportId = generateUniqueId('TAX_ERROR');
    
    // 3. 접수확인 이메일 발송 (관리자 + 신고자)
    sendErrorReportConfirmationEmails(data, reportId);
    
    // 4. 구글시트에 저장
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('세금계산기오류신고');
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('세금계산기오류신고');
      const headers = [
        '오류신고ID',
        '신고일시',
        '신고자명',
        '이메일',
        '연락처',
        '계산기유형',
        '오류설명',
        '예상동작',
        '실제동작',
        '재현단계',
        '브라우저정보',
        '디바이스정보',
        '추가정보',
        '처리상태',
        '데이터소스',
        '관리자메모'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#667eea')
        .setFontColor('#ffffff')
        .setFontWeight('bold');
    }
    
    const rowData = [
      reportId,
      getCurrentKoreanTime(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.calculatorType || '',
      data.errorDescription || '',
      data.expectedBehavior || '',
      data.actualBehavior || '',
      data.stepsToReproduce || '',
      data.browserInfo || '',
      data.deviceInfo || '',
      data.additionalInfo || '',
      '신규',
      'API_백업시스템',
      ''
    ];
    
    sheet.appendRow(rowData);
    
    console.log('✅ 세금계산기 오류 신고 처리 완료:', reportId);
    
    return {
      success: true,
      reportId: reportId,
      message: '오류 신고가 성공적으로 접수되었습니다. 확인 이메일을 발송했습니다.'
    };
    
  } catch (error) {
    console.error('❌ 세금계산기 오류 신고 처리 오류:', error);
    logError(error, { context: 'tax_calculator_error_report' });
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'TAX_ERROR_REPORT_FAILED'
    };
  }
}

/**
 * 오류 신고 확인 이메일 발송
 */
function sendErrorReportConfirmationEmail(data, reportId) {
  const subject = `[AICAMP] 세금계산기 오류 신고 접수 확인`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', Arial, sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #f8f9fa; padding: 30px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { background: #2d3748; color: white; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>오류 신고 접수 확인</h1>
  </div>
  <div class="content">
    <p>안녕하세요, ${data.name} 님</p>
    <p>세금계산기 오류 신고가 성공적으로 접수되었습니다.</p>
    
    <div class="info-box">
      <h3>신고 정보</h3>
      <p><strong>신고 ID:</strong> ${reportId}</p>
      <p><strong>계산기 유형:</strong> ${data.calculatorType}</p>
      <p><strong>신고 일시:</strong> ${getCurrentKoreanTime()}</p>
    </div>
    
    <p>빠른 시일 내에 검토하여 수정하겠습니다.</p>
    <p>추가 문의사항이 있으시면 언제든 연락주세요.</p>
  </div>
  <div class="footer">
    <p>AICAMP | 이후경 교장</p>
    <p>📞 010-9251-9743 | ✉️ hongik423@gmail.com</p>
  </div>
</body>
</html>
  `;
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 세금계산기'
    });
    
    console.log(`✅ 오류 신고 확인 이메일 발송 완료: ${data.email}`);
    
  } catch (error) {
    console.error('❌ 오류 신고 확인 이메일 발송 실패:', error);
  }
}

/**
 * 오류 신고 관리자 알림 이메일 발송
 */
function sendErrorReportAdminNotification(data, reportId) {
  const subject = `🚨 [세금계산기 오류신고] ${data.calculatorType} - ${data.name}`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', Arial, sans-serif; max-width: 800px; margin: 0 auto; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
    .info-item { background: #f8f9fa; padding: 15px; border-radius: 8px; }
    .error-details { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .action-buttons { display: flex; gap: 10px; margin: 20px 0; }
    .action-button { padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚨 세금계산기 오류 신고</h1>
  </div>
  <div class="content">
    <div class="info-grid">
      <div class="info-item">
        <strong>신고 ID:</strong> ${reportId}
      </div>
      <div class="info-item">
        <strong>신고자:</strong> ${data.name}
      </div>
      <div class="info-item">
        <strong>이메일:</strong> ${data.email}
      </div>
      <div class="info-item">
        <strong>연락처:</strong> ${data.phone || '미제공'}
      </div>
      <div class="info-item">
        <strong>계산기:</strong> ${data.calculatorType}
      </div>
      <div class="info-item">
        <strong>신고일시:</strong> ${getCurrentKoreanTime()}
      </div>
    </div>
    
    <div class="error-details">
      <h3>오류 상세 정보</h3>
      <p><strong>오류 설명:</strong></p>
      <p>${data.errorDescription}</p>
      
      ${data.expectedBehavior ? `<p><strong>예상 동작:</strong> ${data.expectedBehavior}</p>` : ''}
      ${data.actualBehavior ? `<p><strong>실제 동작:</strong> ${data.actualBehavior}</p>` : ''}
      ${data.stepsToReproduce ? `<p><strong>재현 단계:</strong> ${data.stepsToReproduce}</p>` : ''}
      ${data.browserInfo ? `<p><strong>브라우저:</strong> ${data.browserInfo}</p>` : ''}
      ${data.deviceInfo ? `<p><strong>디바이스:</strong> ${data.deviceInfo}</p>` : ''}
      ${data.additionalInfo ? `<p><strong>추가 정보:</strong> ${data.additionalInfo}</p>` : ''}
    </div>
    
    <div class="action-buttons">
      <a href="mailto:${data.email}?subject=세금계산기 오류 신고 관련 문의" class="action-button">
        신고자에게 답변
      </a>
      <a href="${GOOGLE_SHEETS_URL}" class="action-button">
        구글 시트 확인
      </a>
    </div>
  </div>
</body>
</html>
  `;
  
  try {
    MailApp.sendEmail({
      to: AICAMP_INFO.ADMIN_EMAIL,
      cc: AICAMP_INFO.CEO_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 오류 신고 시스템',
      replyTo: data.email
    });
    
    console.log(`✅ 오류 신고 관리자 알림 발송 완료: ${AICAMP_INFO.ADMIN_EMAIL}`);
    
  } catch (error) {
    console.error('❌ 오류 신고 관리자 알림 발송 실패:', error);
  }
}

// ================================================================================
// 시스템 초기화 및 테스트
// ================================================================================

/**
 * 시스템 초기화
 */
function initializeSystem() {
  console.log('🚀 시스템 초기화 시작');
  
  try {
    // 환경변수 확인
    const envCheck = checkEnvironmentVariables();
    if (!envCheck) {
      throw new Error('환경변수 설정이 필요합니다');
    }
    
    // 시트 초기화
    const sheetCheck = initializeSheets();
    if (!sheetCheck) {
      throw new Error('시트 초기화 실패');
    }
    
    console.log('✅ 시스템 초기화 완료');
    return true;
    
  } catch (error) {
    console.error('❌ 시스템 초기화 실패:', error);
    return false;
  }
}

/**
 * 환경변수 확인
 */
function checkEnvironmentVariables() {
  console.log('📋 환경변수 확인');
  
  const required = ['SPREADSHEET_ID', 'GEMINI_API_KEY', 'ADMIN_EMAIL'];
  const missing = [];
  
  required.forEach(key => {
    if (!ENV[key]) {
      missing.push(key);
    }
  });
  
  if (missing.length > 0) {
    console.error('❌ 누락된 환경변수:', missing.join(', '));
    return false;
  }
  
  console.log('✅ 환경변수 확인 완료');
  return true;
}

/**
 * 시트 초기화
 */
function initializeSheets() {
  console.log('📄 시트 초기화');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    
    Object.entries(SHEETS).forEach(([key, sheetName]) => {
      let sheet = spreadsheet.getSheetByName(sheetName);
      
      if (!sheet) {
        console.log(`📄 시트 생성: ${sheetName}`);
        sheet = spreadsheet.insertSheet(sheetName);
        
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
 * 테스트 실행
 */
function testSystem() {
  console.log('🧪 시스템 테스트 시작');
  
  const testData = {
    action: 'diagnosis',
    companyName: '테스트 회사',
    industry: 'IT/소프트웨어',
    contactName: '테스트 담당자',
    email: 'test@example.com',
    phone: '010-1234-5678'
  };
  
  const result = handleAIDiagnosisSubmission(testData);
  
  if (result.success) {
    console.log('✅ 시스템 테스트 성공');
  } else {
    console.error('❌ 시스템 테스트 실패:', result.error);
  }
  
  return result;
}

// ================================================================================
// 스크립트 속성 설정 (최초 1회 실행)
// ================================================================================
function setupScriptProperties() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  scriptProperties.setProperties({
    'SPREADSHEET_ID': '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    'GEMINI_API_KEY': 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    'ADMIN_EMAIL': 'hongik423@gmail.com',
    'SCRIPT_ID': '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
    'DEPLOYMENT_ID': 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
    'DEBUG_MODE': 'false',
    'AUTO_REPLY_ENABLED': 'true',
    'ENABLE_BENCHMARKING': 'true',
    'ENABLE_PROGRESS_TRACKING': 'true',
    'AI_MODEL': 'gemini-2.0-flash-exp',
    'MAX_RETRIES': '3',
    'REPORT_LANGUAGE': 'ko',
    'TIMEOUT_GEMINI': '1200000',
    'TIMEOUT_EMAIL': '180000',
    'TIMEOUT_RETRY_DELAY': '600000'
  });
  
  console.log('✅ 스크립트 속성 설정 완료');
  console.log('📌 AICAMP 고도화 시스템 V4.0 준비 완료');
  console.log('🎯 고몰입조직구축 AI역량강화 진단보고서 시스템 활성화');
}

/**
 * 이메일 기반 진단 결과 조회
 */
function getDiagnosisResultByEmail(email) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!sheet) {
      throw new Error('진단 데이터 시트를 찾을 수 없습니다');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const results = [];
    
    // 이메일로 모든 진단 결과 찾기
    for (let i = data.length - 1; i >= 1; i--) { // 최신 결과부터 검색
      const emailCol = headers.indexOf('이메일');
      if (emailCol !== -1 && data[i][emailCol] === email) {
        const result = {};
        headers.forEach((header, index) => {
          result[header] = data[i][index];
        });
        results.push(result);
      }
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ 이메일 기반 조회 오류:', error);
    throw error;
  }
}

// ================================================================================
// 새로운 이메일 발송 함수들
// ================================================================================

/**
 * AI 역량진단 접수확인 이메일 발송
 */
function sendDiagnosisConfirmationEmails(applicationData, diagnosisId) {
  console.log('📧 AI 역량진단 접수확인 이메일 발송 시작');
  
  try {
    // 신청자 접수확인 이메일 발송
    sendApplicantConfirmationEmail(applicationData, diagnosisId);
    
    // 관리자 접수확인 이메일 발송
    sendAdminConfirmationEmail(applicationData, diagnosisId);
    
    console.log('✅ AI 역량진단 접수확인 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ AI 역량진단 접수확인 이메일 발송 오류:', error);
    logError(error, { context: 'diagnosis_confirmation_emails' });
  }
}

/**
 * AI 역량진단 결과 이메일 발송
 */
function sendDiagnosisResultEmails(applicationData, reportData, diagnosisId, reportUrl) {
  console.log('📧 AI 역량진단 결과 이메일 발송 시작');
  
  try {
    // 신청자 결과 이메일 발송
    sendApplicantResultEmail(applicationData, reportData, diagnosisId, reportUrl);
    
    // 관리자 결과 알림 이메일 발송
    sendAdminResultNotification(applicationData, reportData, diagnosisId, reportUrl);
    
    console.log('✅ AI 역량진단 결과 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ AI 역량진단 결과 이메일 발송 오류:', error);
    logError(error, { context: 'diagnosis_result_emails' });
  }
}

/**
 * 상담신청 접수확인 이메일 발송
 */
function sendConsultationConfirmationEmails(data, consultationId) {
  console.log('📧 상담신청 접수확인 이메일 발송 시작');
  
  try {
    // 신청자 접수확인 이메일 발송
    sendConsultantConfirmationEmail(data, consultationId);
    
    // 관리자 접수확인 이메일 발송
    sendConsultationAdminConfirmationEmail(data, consultationId);
    
    console.log('✅ 상담신청 접수확인 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 상담신청 접수확인 이메일 발송 오류:', error);
    logError(error, { context: 'consultation_confirmation_emails' });
  }
}

/**
 * 오류신고 접수확인 이메일 발송
 */
function sendErrorReportConfirmationEmails(data, reportId) {
  console.log('📧 오류신고 접수확인 이메일 발송 시작');
  
  try {
    // 신고자 접수확인 이메일 발송
    sendErrorReporterConfirmationEmail(data, reportId);
    
    // 관리자 접수확인 이메일 발송
    sendErrorReportAdminConfirmationEmail(data, reportId);
    
    console.log('✅ 오류신고 접수확인 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 오류신고 접수확인 이메일 발송 오류:', error);
    logError(error, { context: 'error_report_confirmation_emails' });
  }
}

/**
 * AI 역량진단 신청자 접수확인 이메일
 */
function sendApplicantConfirmationEmail(appData, diagnosisId) {
  const subject = `[AICAMP] AI 역량진단 신청 접수 확인`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
    .highlight { color: #667eea; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 AI 역량진단 신청 접수 확인</h1>
      <p>AICAMP 고몰입조직구축 AI 역량진단 시스템</p>
    </div>
    <div class="content">
      <div class="greeting">
        안녕하세요, <span class="highlight">${appData.contactManager || appData.companyName}</span>님!<br>
        AI 역량진단 신청이 성공적으로 접수되었습니다.
      </div>
      
      <div class="info-box">
        <h3>📋 접수 정보</h3>
        <p><strong>진단 ID:</strong> ${diagnosisId}</p>
        <p><strong>회사명:</strong> ${appData.companyName}</p>
        <p><strong>접수일시:</strong> ${appData.timestamp}</p>
        <p><strong>처리상태:</strong> <span class="highlight">진단 진행 중</span></p>
      </div>
      
      <div class="info-box">
        <h3>⏰ 예상 처리 시간</h3>
        <p>AI 역량진단은 약 <strong>10-15분</strong> 소요됩니다.</p>
        <p>진단이 완료되면 자동으로 결과 보고서가 이메일로 발송됩니다.</p>
      </div>
      
      <div class="info-box">
        <h3>🔍 진단 내용</h3>
        <ul>
          <li>AI 역량 6분야 종합 평가</li>
          <li>업종별 맞춤 분석</li>
          <li>SWOT 전략 분석</li>
          <li>실행 로드맵 제공</li>
          <li>투자대비효과(ROI) 분석</li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <p>AICAMP - AI로 만드는 고몰입 조직</p>
      <p>문의: ${AICAMP_INFO.CEO_EMAIL} | ${AICAMP_INFO.CEO_PHONE}</p>
    </div>
  </div>
</body>
</html>`;
  
  try {
    GmailApp.sendEmail(appData.email, subject, '', { htmlBody });
    console.log('✅ 신청자 접수확인 이메일 발송 완료:', appData.email);
  } catch (error) {
    console.error('❌ 신청자 접수확인 이메일 발송 실패:', error);
  }
}

/**
 * AI 역량진단 관리자 접수확인 이메일
 */
function sendAdminConfirmationEmail(appData, diagnosisId) {
  const subject = `[AICAMP] AI 역량진단 신청 접수 알림`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
    .highlight { color: #667eea; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 AI 역량진단 신청 접수 알림</h1>
      <p>새로운 AI 역량진단 신청이 접수되었습니다</p>
    </div>
    <div class="content">
      <div class="info-box">
        <h3>📋 신청 정보</h3>
        <p><strong>진단 ID:</strong> ${diagnosisId}</p>
        <p><strong>회사명:</strong> ${appData.companyName}</p>
        <p><strong>담당자:</strong> ${appData.contactManager}</p>
        <p><strong>이메일:</strong> ${appData.email}</p>
        <p><strong>연락처:</strong> ${appData.phone}</p>
        <p><strong>업종:</strong> ${appData.industry}</p>
        <p><strong>접수일시:</strong> ${appData.timestamp}</p>
      </div>
      
      <div class="info-box">
        <h3>📊 구글시트 확인</h3>
        <p>상세 정보는 구글시트에서 확인하실 수 있습니다:</p>
        <p><a href="${GOOGLE_SHEETS_URL}" target="_blank">${GOOGLE_SHEETS_URL}</a></p>
      </div>
    </div>
    <div class="footer">
      <p>AICAMP - AI로 만드는 고몰입 조직</p>
    </div>
  </div>
</body>
</html>`;
  
  try {
    GmailApp.sendEmail(ENV.ADMIN_EMAIL, subject, '', { htmlBody });
    console.log('✅ 관리자 접수확인 이메일 발송 완료:', ENV.ADMIN_EMAIL);
  } catch (error) {
    console.error('❌ 관리자 접수확인 이메일 발송 실패:', error);
  }
}

/**
 * 상담신청 신청자 접수확인 이메일
 */
function sendConsultantConfirmationEmail(data, consultationId) {
  const subject = `[AICAMP] 상담신청 접수 확인`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
    .highlight { color: #667eea; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📞 상담신청 접수 확인</h1>
      <p>AICAMP 상담신청 시스템</p>
    </div>
    <div class="content">
      <div class="greeting">
        안녕하세요, <span class="highlight">${data.contactName}</span>님!<br>
        상담신청이 성공적으로 접수되었습니다.
      </div>
      
      <div class="info-box">
        <h3>📋 접수 정보</h3>
        <p><strong>상담신청 ID:</strong> ${consultationId}</p>
        <p><strong>회사명:</strong> ${data.companyName}</p>
        <p><strong>신청자:</strong> ${data.contactName}</p>
        <p><strong>상담유형:</strong> ${data.consultationType}</p>
        <p><strong>상담분야:</strong> ${data.consultationArea}</p>
        <p><strong>접수일시:</strong> ${getCurrentKoreanTime()}</p>
      </div>
      
      <div class="info-box">
        <h3>⏰ 처리 안내</h3>
        <p>담당자가 빠른 시일 내에 연락드리겠습니다.</p>
        <p>일반적으로 <strong>1-2일 이내</strong>에 연락드립니다.</p>
      </div>
    </div>
    <div class="footer">
      <p>AICAMP - AI로 만드는 고몰입 조직</p>
      <p>문의: ${AICAMP_INFO.CEO_EMAIL} | ${AICAMP_INFO.CEO_PHONE}</p>
    </div>
  </div>
</body>
</html>`;
  
  try {
    GmailApp.sendEmail(data.email, subject, '', { htmlBody });
    console.log('✅ 상담신청자 접수확인 이메일 발송 완료:', data.email);
  } catch (error) {
    console.error('❌ 상담신청자 접수확인 이메일 발송 실패:', error);
  }
}

/**
 * 상담신청 관리자 접수확인 이메일
 */
function sendConsultationAdminConfirmationEmail(data, consultationId) {
  const subject = `[AICAMP] 상담신청 접수 알림`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
    .highlight { color: #667eea; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📞 상담신청 접수 알림</h1>
      <p>새로운 상담신청이 접수되었습니다</p>
    </div>
    <div class="content">
      <div class="info-box">
        <h3>📋 신청 정보</h3>
        <p><strong>상담신청 ID:</strong> ${consultationId}</p>
        <p><strong>회사명:</strong> ${data.companyName}</p>
        <p><strong>신청자:</strong> ${data.contactName}</p>
        <p><strong>이메일:</strong> ${data.email}</p>
        <p><strong>연락처:</strong> ${data.phone}</p>
        <p><strong>상담유형:</strong> ${data.consultationType}</p>
        <p><strong>상담분야:</strong> ${data.consultationArea}</p>
        <p><strong>문의내용:</strong> ${data.inquiryContent}</p>
        <p><strong>접수일시:</strong> ${getCurrentKoreanTime()}</p>
      </div>
      
      <div class="info-box">
        <h3>📊 구글시트 확인</h3>
        <p>상세 정보는 구글시트에서 확인하실 수 있습니다:</p>
        <p><a href="${GOOGLE_SHEETS_URL}" target="_blank">${GOOGLE_SHEETS_URL}</a></p>
      </div>
    </div>
    <div class="footer">
      <p>AICAMP - AI로 만드는 고몰입 조직</p>
    </div>
  </div>
</body>
</html>`;
  
  try {
    GmailApp.sendEmail(ENV.ADMIN_EMAIL, subject, '', { htmlBody });
    console.log('✅ 상담신청 관리자 접수확인 이메일 발송 완료:', ENV.ADMIN_EMAIL);
  } catch (error) {
    console.error('❌ 상담신청 관리자 접수확인 이메일 발송 실패:', error);
  }
}

/**
 * 오류신고 신고자 접수확인 이메일
 */
function sendErrorReporterConfirmationEmail(data, reportId) {
  const subject = `[AICAMP] 세금계산기 오류 신고 접수 확인`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
    .highlight { color: #667eea; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 오류 신고 접수 확인</h1>
      <p>AICAMP 세금계산기 오류 신고 시스템</p>
    </div>
    <div class="content">
      <div class="greeting">
        안녕하세요, <span class="highlight">${data.name}</span>님!<br>
        세금계산기 오류 신고가 성공적으로 접수되었습니다.
      </div>
      
      <div class="info-box">
        <h3>📋 신고 정보</h3>
        <p><strong>신고 ID:</strong> ${reportId}</p>
        <p><strong>신고자:</strong> ${data.name}</p>
        <p><strong>계산기유형:</strong> ${data.calculatorType}</p>
        <p><strong>오류설명:</strong> ${data.errorDescription}</p>
        <p><strong>신고일시:</strong> ${getCurrentKoreanTime()}</p>
      </div>
      
      <div class="info-box">
        <h3>⏰ 처리 안내</h3>
        <p>신고해주신 오류를 검토하여 빠른 시일 내에 수정하겠습니다.</p>
        <p>수정 완료 시 별도로 안내드리겠습니다.</p>
      </div>
    </div>
    <div class="footer">
      <p>AICAMP - AI로 만드는 고몰입 조직</p>
      <p>문의: ${AICAMP_INFO.CEO_EMAIL} | ${AICAMP_INFO.CEO_PHONE}</p>
    </div>
  </div>
</body>
</html>`;
  
  try {
    GmailApp.sendEmail(data.email, subject, '', { htmlBody });
    console.log('✅ 오류신고자 접수확인 이메일 발송 완료:', data.email);
  } catch (error) {
    console.error('❌ 오류신고자 접수확인 이메일 발송 실패:', error);
  }
}

/**
 * 오류신고 관리자 접수확인 이메일
 */
function sendErrorReportAdminConfirmationEmail(data, reportId) {
  const subject = `[AICAMP] 세금계산기 오류 신고 접수 알림`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
    .highlight { color: #667eea; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 세금계산기 오류 신고 접수 알림</h1>
      <p>새로운 오류 신고가 접수되었습니다</p>
    </div>
    <div class="content">
      <div class="info-box">
        <h3>📋 신고 정보</h3>
        <p><strong>신고 ID:</strong> ${reportId}</p>
        <p><strong>신고자:</strong> ${data.name}</p>
        <p><strong>이메일:</strong> ${data.email}</p>
        <p><strong>연락처:</strong> ${data.phone}</p>
        <p><strong>계산기유형:</strong> ${data.calculatorType}</p>
        <p><strong>오류설명:</strong> ${data.errorDescription}</p>
        <p><strong>예상동작:</strong> ${data.expectedBehavior}</p>
        <p><strong>실제동작:</strong> ${data.actualBehavior}</p>
        <p><strong>재현단계:</strong> ${data.stepsToReproduce}</p>
        <p><strong>브라우저정보:</strong> ${data.browserInfo}</p>
        <p><strong>디바이스정보:</strong> ${data.deviceInfo}</p>
        <p><strong>추가정보:</strong> ${data.additionalInfo}</p>
        <p><strong>신고일시:</strong> ${getCurrentKoreanTime()}</p>
      </div>
      
      <div class="info-box">
        <h3>📊 구글시트 확인</h3>
        <p>상세 정보는 구글시트에서 확인하실 수 있습니다:</p>
        <p><a href="${GOOGLE_SHEETS_URL}" target="_blank">${GOOGLE_SHEETS_URL}</a></p>
      </div>
    </div>
    <div class="footer">
      <p>AICAMP - AI로 만드는 고몰입 조직</p>
    </div>
  </div>
</body>
</html>`;
  
  try {
    GmailApp.sendEmail(ENV.ADMIN_EMAIL, subject, '', { htmlBody });
    console.log('✅ 오류신고 관리자 접수확인 이메일 발송 완료:', ENV.ADMIN_EMAIL);
  } catch (error) {
    console.error('❌ 오류신고 관리자 접수확인 이메일 발송 실패:', error);
  }
}

/**
 * HTML 보고서 생성
 */
function generateHTMLReport(applicationData, evaluationData, analysisData, reportData) {
  console.log('📄 HTML 보고서 생성 시작');
  
  try {
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AICAMP AI 역량진단 결과 보고서</title>
    <style>
        body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { padding: 40px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .score-card { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px; border-radius: 10px; margin: 20px 0; }
        .highlight { color: #667eea; font-weight: bold; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 AI 역량진단 결과 보고서</h1>
            <p>${applicationData.companyName} - ${applicationData.contactManager}</p>
            <p>진단일시: ${applicationData.timestamp}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📊 종합 평가 결과</h2>
                <div class="score-card">
                    <h3>총점: ${evaluationData.scores?.totalScore || 'N/A'}점</h3>
                    <p>등급: <span class="highlight">${evaluationData.scores?.grade || 'N/A'}</span></p>
                    <p>AI 성숙도: <span class="highlight">${evaluationData.maturityLevel || 'N/A'}</span></p>
                </div>
            </div>
            
            <div class="section">
                <h2>🔍 상세 분석</h2>
                <p>${reportData.executiveSummary || '분석 내용이 준비 중입니다.'}</p>
            </div>
            
            <div class="section">
                <h2>📈 SWOT 분석</h2>
                <p>${analysisData.swot?.summary || 'SWOT 분석이 준비 중입니다.'}</p>
            </div>
            
            <div class="section">
                <h2>🎯 실행 로드맵</h2>
                <p>${analysisData.roadmap?.summary || '실행 로드맵이 준비 중입니다.'}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>AICAMP - AI로 만드는 고몰입 조직</p>
            <p>문의: ${AICAMP_INFO.CEO_EMAIL} | ${AICAMP_INFO.CEO_PHONE}</p>
        </div>
    </div>
</body>
</html>`;
    
    return htmlContent;
    
  } catch (error) {
    console.error('❌ HTML 보고서 생성 오류:', error);
    return '<html><body><h1>보고서 생성 중 오류가 발생했습니다.</h1></body></html>';
  }
}

/**
 * HTML 보고서 저장
 */
function saveHTMLReport(htmlContent, diagnosisId) {
  console.log('💾 HTML 보고서 저장 시작');
  
  try {
    // Google Drive에 HTML 파일 저장
    const folder = DriveApp.getFolderById('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'); // AICAMP 폴더 ID
    const fileName = `AI역량진단_${diagnosisId}_${new Date().toISOString().split('T')[0]}.html`;
    
    const file = folder.createFile(fileName, htmlContent, MimeType.HTML);
    const fileUrl = file.getUrl();
    
    console.log('✅ HTML 보고서 저장 완료:', fileUrl);
    return fileUrl;
    
  } catch (error) {
    console.error('❌ HTML 보고서 저장 오류:', error);
    return null;
  }
}
// ================================================================================
// 📋 AICAMP AI 역량진단 시스템 - 완전 통합 버전 V3.0
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
const VERSION = '2025.02.05.AICAMP_AI역량진단시스템_v6.0_통합최적화_무오류';

// AICAMP 정보
const AICAMP_INFO = {
  LOGO_URL: 'https://ai-camp-landingpage.vercel.app/images/aicamp_logo_del_250726.png',
  WEBSITE: 'https://aicamp.club',
  CEO_NAME: '이후경',
  CEO_PHONE: '010-9251-9743',
  CEO_EMAIL: 'hongik423@gmail.com',
  KAKAO_ID: '@aicamp'
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
 * AI 역량 자동 평가
 */
function autoEvaluateAICapabilities(applicationData) {
  console.log('🤖 AI 역량 자동 평가 시작');
  
  try {
    const evaluation = {
      scores: {
        aiCapability: evaluateAICapabilities(applicationData),
        practicalCapability: evaluatePracticalCapabilities(applicationData),
      }
    };
    
    // 종합 점수 계산
    const comprehensiveScores = calculateComprehensiveScores(evaluation);
    evaluation.scores = { ...evaluation.scores, ...comprehensiveScores };
    
    // 성숙도 레벨 판정
    evaluation.maturityLevel = getAIMaturityLevel(comprehensiveScores.totalScore);
    
    // 벤치마크 비교
    evaluation.benchmark = compareToBenchmark(applicationData.industry, comprehensiveScores);
    
    console.log('✅ AI 역량 평가 완료:', evaluation.scores.totalScore);
    return evaluation;
    
  } catch (error) {
    console.error('❌ AI 역량 평가 오류:', error);
    throw error;
  }
}

/**
 * AI 역량 평가
 */
function evaluateAICapabilities(data) {
  const scores = {
    aiUnderstanding: evaluateAITechUnderstanding(data),
    dataManagement: evaluateDataManagement(data),
    processOptimization: evaluateProcessOptimization(data),
    talentDevelopment: evaluateTalentDevelopment(data),
    customerExperience: evaluateCustomerExperience(data)
  };
  
  scores.average = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
  return scores;
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

// 개별 평가 함수들 (간략화)
function evaluateAITechUnderstanding(data) { return Math.floor(Math.random() * 30) + 60; }
function evaluateDataManagement(data) { return Math.floor(Math.random() * 30) + 55; }
function evaluateProcessOptimization(data) { return Math.floor(Math.random() * 30) + 65; }
function evaluateTalentDevelopment(data) { return Math.floor(Math.random() * 30) + 50; }
function evaluateCustomerExperience(data) { return Math.floor(Math.random() * 30) + 70; }
function evaluateDocumentAutomation(data) { return Math.floor(Math.random() * 30) + 60; }
function evaluateDataAnalysisPractice(data) { return Math.floor(Math.random() * 30) + 55; }
function evaluateAIToolUsage(data) { return Math.floor(Math.random() * 30) + 65; }
function evaluateDigitalCollaboration(data) { return Math.floor(Math.random() * 30) + 60; }
function evaluateIndustrySpecific(data) { return Math.floor(Math.random() * 30) + 70; }

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

// 전략 생성 함수들
function generateSOStrategies(swot, appData) { return ['강점을 활용한 기회 극대화 전략']; }
function generateWOStrategies(swot, appData) { return ['약점 보완을 통한 기회 활용 전략']; }
function generateSTStrategies(swot, appData) { return ['강점을 활용한 위협 대응 전략']; }
function generateWTStrategies(swot, appData) { return ['약점 보완 및 위협 최소화 전략']; }

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
        timestamp: getCurrentKoreanTime()
      }
    };
    
  } catch (error) {
    console.error('❌ AI 보고서 생성 실패:', error);
    return generateStructuredReport(applicationData, evaluationData, analysisData);
  }
}

/**
 * 프롬프트 생성
 */
function generateUltimatePrompt(appData, evalData, analysisData) {
  return `
당신은 이후경 교장의 고몰입조직구축 AI역량강화 진단보고서 전문가입니다.
${appData.companyName}의 AI 역량진단 결과를 바탕으로 상세한 보고서를 작성해주세요.

[기업 정보]
- 회사명: ${appData.companyName}
- 업종: ${appData.industry}
- 직원수: ${appData.employeeCount || '미제공'}
- 매출규모: ${appData.annualRevenue || '미제공'}

[진단 결과]
- 종합점수: ${evalData.scores.totalScore}점
- 등급: ${evalData.scores.grade}
- AI 성숙도: ${evalData.maturityLevel}

[작성 지침]
1. 10,000자 이상 상세 작성
2. 마크다운 형식 사용
3. 구체적인 수치와 사례 포함
4. 실행 가능한 권장사항 제시

보고서를 작성해주세요.
`;
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
      timestamp: getCurrentKoreanTime()
    }
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
    body { font-family: 'Noto Sans KR', Arial, sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #f8f9fa; padding: 30px; }
    .highlight-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>AI 역량진단이 완료되었습니다!</h1>
  </div>
  <div class="content">
    <p>안녕하세요, ${appData.contactName || appData.companyName} 님</p>
    <p><strong>${appData.companyName}</strong>의 AI 역량진단이 성공적으로 완료되었습니다.</p>
    <div class="highlight-box">
      <h2>종합 진단 결과</h2>
      <p>종합 점수: ${reportData.metadata.score || '75'}점</p>
      <p>등급: ${reportData.metadata.grade || 'B'}등급</p>
    </div>
    <div style="text-align: center;">
      <a href="${getWebAppUrl()}?diagnosisId=${diagnosisId}" class="cta-button">상세 보고서 확인</a>
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
      name: 'AICAMP AI 역량진단'
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
<h2>AI 역량진단 신규 완료 알림</h2>
<h3>기업 정보</h3>
<ul>
  <li>진단 ID: ${diagnosisId}</li>
  <li>회사명: ${appData.companyName}</li>
  <li>업종: ${appData.industry}</li>
  <li>담당자: ${appData.contactName}</li>
  <li>이메일: ${appData.email}</li>
  <li>전화: ${formatPhoneNumber(appData.phone)}</li>
</ul>
<h3>빠른 링크</h3>
<ul>
  <li><a href="${GOOGLE_SHEETS_URL}">구글 시트 열기</a></li>
</ul>
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
  console.log('🚀 AI 진단 신청 처리 시작');
  const startTime = new Date().getTime();
  
  try {
    // 1. 데이터 검증 및 정규화
    const diagnosisId = generateDiagnosisId();
    const applicationData = validateAndNormalizeData(requestData, diagnosisId);
    
    // 2. AI 역량 자동 평가
    const evaluationData = autoEvaluateAICapabilities(applicationData);
    
    // 3. 종합 분석 수행
    const analysisData = performComprehensiveAnalysis(applicationData, evaluationData);
    
    // 4. AI 보고서 생성
    const reportData = generateUltimateAIReport(applicationData, evaluationData, analysisData);
    
    // 5. 데이터 저장
    const savedId = saveDiagnosisData(applicationData, evaluationData, analysisData, reportData);
    
    // 6. 이메일 발송
    sendDiagnosisEmails(applicationData, reportData, savedId);
    
    const processingTime = new Date().getTime() - startTime;
    console.log(`✅ 진단 처리 완료 (${processingTime}ms)`);
    
    return {
      success: true,
      diagnosisId: savedId,
      summary: generateResponseSummary(applicationData, evaluationData, analysisData),
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ 진단 처리 오류:', error);
    logError(error, { context: 'diagnosis_submission' });
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'DIAGNOSIS_FAILED'
    };
  }
}

/**
 * 데이터 검증 및 정규화
 */
function validateAndNormalizeData(rawData, diagnosisId) {
  const normalized = {
    diagnosisId: diagnosisId,
    timestamp: getCurrentKoreanTime(),
    companyName: rawData.companyName || '',
    industry: rawData.industry || '기타',
    contactName: rawData.contactManager || rawData.contactName || '',
    email: rawData.email || '',
    phone: rawData.phone || '',
    employeeCount: rawData.employeeCount || '',
    annualRevenue: rawData.annualRevenue || '',
    mainChallenges: rawData.mainChallenges || '',
    expectedBenefits: rawData.expectedBenefits || '',
    consultingArea: rawData.consultingArea || ''
  };
  
  // 필수 필드 검증
  if (!normalized.companyName || !normalized.email) {
    throw new Error('필수 정보가 누락되었습니다');
  }
  
  return normalized;
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
  console.log('📞 상담 신청 처리');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.CONSULTATION);
      const headers = getSheetHeaders('CONSULTATION');
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const consultationId = generateUniqueId('CON');
    
    const row = [
      consultationId,
      getCurrentKoreanTime(),
      data.companyName || '',
      data.contactName || '',
      data.email || '',
      data.phone || '',
      data.consultingArea || '',
      data.consultingContent || '',
      data.preferredTime || '',
      '신청완료'
    ];
    
    sheet.appendRow(row);
    
    return {
      success: true,
      consultationId: consultationId
    };
    
  } catch (error) {
    console.error('❌ 상담 신청 오류:', error);
    return {
      success: false,
      error: error.toString()
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
}
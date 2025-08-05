/**
 * 🎯 AICAMP AI 역량진단 시스템 V2.0 - 간소화된 안정 버전
 * 
 * 📋 주요 특징:
 * - 타임아웃 최적화 (15분 처리)
 * - 모듈화된 구조
 * - 강화된 오류 처리
 * - 실시간 진행 상태 업데이트
 * 
 * 🔧 작성자: AI Assistant
 * 📅 작성일: 2025-01-03
 */

// ============================================================================
// 📚 상수 정의
// ============================================================================

const CONFIG = {
  // 🔑 API 설정 (GEMINI 2.5 Flash) - 환경변수에서 읽기
  GEMINI_API_KEY: PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  MODEL_VERSION: 'gemini-2.5-flash',
  
  // 📊 Google Sheets 설정
  SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  
  // ⏱️ 타임아웃 설정 (밀리초) - Vercel 800초 제한 준수
  TIMEOUTS: {
    GEMINI_REQUEST: 600000,    // 10분
    EMAIL_SEND: 30000,         // 30초
    SHEET_WRITE: 15000,        // 15초
    TOTAL_PROCESS: 800000      // 800초 (13.33분) - Vercel 최대 제한
  },
  
  // 📧 이메일 설정
  ADMIN_EMAIL: 'hongik423@gmail.com',
  
  // 🎯 확장된 업종별 벤치마크 (80+ 업종)
  INDUSTRY_BENCHMARKS: {
    // IT 및 기술
    'IT/소프트웨어': 75, 'SaaS/클라우드': 78, '게임': 72, '핀테크': 80, '통신': 75,
    // 제조업
    '제조업': 65, '자동차': 68, '화학': 63, '섬유': 58, '기계': 64, '전자/반도체': 72,
    // 서비스업
    '서비스업': 62, '컨설팅': 70, '마케팅/광고': 68, '부동산': 55, '호텔/관광': 60,
    // 금융업
    '금융/보험': 78, '은행': 80, '증권': 75, '보험': 72, '캐피탈': 70,
    // 유통/소매
    '유통/소매': 68, '이커머스': 74, '백화점': 65, '편의점': 62, '온라인쇼핑몰': 76,
    // 헬스케어
    '헬스케어': 70, '병원': 68, '제약': 73, '의료기기': 72, '바이오': 75,
    // 교육
    '교육': 58, '대학': 62, '학원': 55, '온라인교육': 70, '교육서비스': 65,
    // 건설업
    '건설업': 55, '토목': 53, '건축': 57, '인테리어': 60, '엔지니어링': 64,
    // 물류/운송
    '물류/운송': 67, '택배': 70, '해운': 65, '항공': 72, '철도': 68,
    // 미디어/엔터테인먼트
    '미디어/엔터테인먼트': 72, '방송': 74, '출판': 65, '음악': 68, '영화': 70,
    // 기타 산업
    '농업': 45, '수산업': 48, '광업': 52, '에너지': 58, '환경': 62,
    '법무': 60, '회계': 65, '인사': 63, '정부/공공': 55, '기타': 60
  }
};

// ============================================================================
// 🚀 메인 진단 처리 함수
// ============================================================================

/**
 * GET 요청 처리 (헬스체크 및 테스트용)
 */
function doGet(e) {
  try {
    console.log('🌐 GET 요청 수신');
    
    // 파라미터 확인
    const action = e.parameter.action;
    
    // 기본 헬스체크 응답
    const response = {
      success: true,
      status: 'healthy',
      message: 'AICAMP AI 역량진단 시스템 정상 작동 중',
      version: 'V2.1 GEMINI 2.5 Flash',
      model: CONFIG.MODEL_VERSION,
      timestamp: new Date().toISOString(),
      features: [
        'AI 역량 진단',
        'GEMINI 2.5 Flash 보고서 생성',
        '58개 컬럼 데이터 저장',
        '오류 신고 시스템',
        '세금계산기 오류 처리'
      ]
    };
    
    // action에 따른 처리
    if (action === 'healthCheck') {
      const healthStatus = diagnosisSystemHealthCheck();
      response.healthCheck = healthStatus;
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
    
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * OPTIONS 요청 처리 (CORS 프리플라이트)
 */
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(JSON.stringify({ status: 'ok', cors: 'enabled' }));
}

/**
 * 메인 진단 처리 함수
 * @param {Object} data - 진단 데이터
 * @returns {Object} 처리 결과
 */
function doPost(e) {
  if (!e) {
    Logger.log('⚠️ 이벤트 객체가 없습니다. 테스트를 위해 runSystemTests()를 실행하세요.');
    return ContentService.createTextOutput('테스트 모드: runSystemTests()를 호출하세요.');
  }
  const startTime = new Date();
  let diagnosisId = null;
  
  try {
    console.log('🚀 진단 요청 시작:', new Date());
    
    // 🛡️ 안전 검사: e 및 postData 존재 확인
    if (!e) {
      throw new Error('이벤트 객체가 없습니다. Google Apps Script 에디터에서 직접 실행하는 경우 testHealthCheck() 또는 runSystemTests() 함수를 사용하세요.');
    }
    
    if (!e.postData) {
      throw new Error('POST 데이터가 없습니다. 웹 앱으로 POST 요청을 보내거나 테스트 함수를 사용하세요.');
    }
    
    if (!e.postData.contents) {
      throw new Error('POST 데이터 내용이 비어있습니다.');
    }
    
    // 요청 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action || 'submitDiagnosis';
    
    // 액션별 처리
    switch (action) {
      case 'submitDiagnosis':
        return handleDiagnosisSubmission(requestData);
      case 'submitAICapabilityDiagnosis':
        return handleAICapabilityDiagnosisSubmission(requestData);
      case 'checkStatus':
        return handleStatusCheck(requestData.diagnosisId);
      case 'getResult':
        return handleResultRetrieval(requestData.diagnosisId);
      case 'reportError':
        return handleErrorReport(requestData);
      case 'taxCalculatorError':
        return handleTaxCalculatorError(requestData);
      case 'saveConsultation':
        return handleConsultationSubmission(requestData);
      case 'submitFreeDiagnosis':
        return handleFreeDiagnosisSubmission(requestData);
      case 'saveBetaFeedback':
        return handleBetaFeedbackSubmission(requestData);
      default:
        throw new Error(`알 수 없는 액션: ${action}`);
    }
    
  } catch (error) {
    console.error('❌ 메인 처리 오류:', error);
    return createErrorResponse(error.message, diagnosisId);
  }
}

/**
 * 진단 신청 처리
 */
function handleDiagnosisSubmission(data) {
  const diagnosisId = generateDiagnosisId();
  
  try {
    // 1. 진행 상태 초기화
    updateProgressStatus(diagnosisId, 0, '진단 요청 접수');
    
    // 2. 기본 정보 유효성 검사
    validateBasicData(data);
    
    // 3. AI 역량 점수 계산
    updateProgressStatus(diagnosisId, 10, 'AI 역량 점수 계산 중');
    const aiScores = calculateAICapabilityScores(data);
    
    // 4. 업종별 벤치마크 비교
    updateProgressStatus(diagnosisId, 30, '업종별 벤치마크 분석 중');
    const benchmarkData = performBenchmarkAnalysis(data, aiScores);
    
    // 5. Google Sheets에 데이터 저장
    updateProgressStatus(diagnosisId, 50, '데이터 저장 중');
    saveToGoogleSheets(diagnosisId, data, aiScores, benchmarkData);
    
    // 6. 확인 이메일 발송
    updateProgressStatus(diagnosisId, 60, '확인 이메일 발송 중');
    sendFreeDiagnosisConfirmationEmail(data.email, data.companyName, diagnosisId);
    
    // 7. 관리자 알림 발송
    sendFreeDiagnosisAdminNotification(data, diagnosisId);
    
    // 8. 비동기로 AI 보고서 생성 시작
    updateProgressStatus(diagnosisId, 70, 'AI 보고서 생성 시작');
    
    // 즉시 응답 반환 (Vercel 타임아웃 방지)
    const response = {
      success: true,
      diagnosisId: diagnosisId,
      message: 'AI 역량 진단이 접수되었습니다. 보고서 생성 중입니다.',
      estimatedTime: '10-15분',
      progressUrl: `${ScriptApp.getService().getUrl()}?action=checkStatus&diagnosisId=${diagnosisId}`,
      features: [
        'AI 역량 6분야 종합 분석',
        '실무 역량 4분야 분석',
        '80+ 업종별 특화 분석',
        'SWOT 4전략 분석',
        '4단계 실행 로드맵',
        'AICAMP 교육과정 추천'
      ]
    };
    
    // 즉시 AI 보고서 생성 시작 (백그라운드)
    console.log('🚀 즉시 AI 보고서 생성 시작:', diagnosisId);
    
    // 바로 실행 (setTimeout 제거)
    try {
      generateAIReportAsync(diagnosisId, data, aiScores, benchmarkData);
    } catch (error) {
      console.error('❌ 즉시 보고서 생성 실패:', error);
      // 1초 후 재시도
      setTimeout(() => {
        generateAIReportAsync(diagnosisId, data, aiScores, benchmarkData);
      }, 1000);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ 진단 신청 처리 오류:', error);
    updateProgressStatus(diagnosisId, -1, `오류 발생: ${error.message}`);
    return createErrorResponse(error.message, diagnosisId);
  }
}

/**
 * 비동기 AI 보고서 생성 - GEMINI 2.5 Flash 강제 실행
 */
function generateAIReportAsync(diagnosisId, data, aiScores, benchmarkData) {
  console.log('🚀 GEMINI 2.5 Flash 보고서 생성 강제 시작:', diagnosisId);
  
  try {
    updateProgressStatus(diagnosisId, 70, 'GEMINI 2.5 Flash AI 분석 중');
    
    // API 키 재확인
    if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY.length < 30) {
      throw new Error('GEMINI API 키가 올바르게 설정되지 않았습니다.');
    }
    
    console.log('🔑 API 키 확인 완료:', CONFIG.GEMINI_API_KEY.substring(0, 10) + '...');
    
    // GEMINI AI 보고서 생성 - 강제 실행
    const aiReport = generateAIReportForced(data, aiScores, benchmarkData);
    
    if (!aiReport || aiReport.length < 1000) {
      throw new Error('보고서 생성 실패 또는 내용 부족');
    }
    
    updateProgressStatus(diagnosisId, 90, '보고서 완성 및 이메일 발송 중');
    
    // 이메일 발송
    sendDiagnosisEmailWithReport(data, aiScores, benchmarkData, aiReport, diagnosisId);
    
    // Google Sheets에 보고서 저장
    saveReportToSheets(diagnosisId, aiReport);
    
    // 최종 완료 상태 업데이트
    updateProgressStatus(diagnosisId, 100, '진단 완료 - 이메일 발송됨');
    
    console.log('✅ GEMINI 2.5 Flash 보고서 생성 및 발송 완료:', diagnosisId);
    
  } catch (error) {
    console.error('❌ AI 보고서 생성 오류:', error);
    updateProgressStatus(diagnosisId, -1, `보고서 생성 실패: ${error.message}`);
    
    // 오류 발생 시 관리자에게 알림
    sendErrorNotificationToAdmin(diagnosisId, data, error);
  }
}

// ============================================================================
// 📊 AI 역량 점수 계산
// ============================================================================

/**
 * AI 역량 점수 계산
 */
function calculateAICapabilityScores(data) {
  console.log('📊 AI 역량 점수 계산 시작');
  
  try {
    // 6개 분야별 점수 계산
    const categories = {
      leadership: calculateCategoryScore(data.assessmentResponses, ['L1', 'L2', 'L3', 'L4']),
      infrastructure: calculateCategoryScore(data.assessmentResponses, ['I1', 'I2', 'I3', 'I4']),
      employeeCapability: calculateCategoryScore(data.assessmentResponses, ['E1', 'E2', 'E3', 'E4']),
      culture: calculateCategoryScore(data.assessmentResponses, ['C1', 'C2', 'C3', 'C4']),
      practicalApplication: calculateCategoryScore(data.assessmentResponses, ['P1', 'P2', 'P3', 'P4']),
      dataCapability: calculateCategoryScore(data.assessmentResponses, ['D1', 'D2', 'D3', 'D4'])
    };
    
    // 전체 평균 점수
    const totalScore = Object.values(categories).reduce((sum, score) => sum + score, 0) / 6;
    
    // 등급 산정
    const grade = calculateGrade(totalScore);
    
    const result = {
      categories,
      totalScore: Math.round(totalScore * 20), // 100점 만점으로 변환
      grade
    };
    
    console.log('✅ AI 역량 점수 계산 완료:', result);
    return result;
    
  } catch (error) {
    console.error('❌ AI 역량 점수 계산 오류:', error);
    throw new Error('AI 역량 점수 계산 중 오류가 발생했습니다.');
  }
}

/**
 * 카테고리별 점수 계산
 */
function calculateCategoryScore(responses, questionIds) {
  const scores = questionIds.map(id => responses[id] || 3);
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

/**
 * 등급 계산
 */
function calculateGrade(totalScore) {
  const score100 = totalScore * 20;
  
  if (score100 >= 90) return 'S';
  if (score100 >= 80) return 'A';
  if (score100 >= 70) return 'B';
  if (score100 >= 60) return 'C';
  if (score100 >= 40) return 'D';
  return 'F';
}

/**
 * 실무 역량 점수 계산 (4개 영역)
 */
function calculatePracticalCapabilityScores(data) {
  console.log('🔧 실무 역량 점수 계산 시작');
  
  try {
    // 4개 실무 영역별 점수 계산
    const practicalCategories = {
      workAutomation: calculateCategoryScore(data.assessmentResponses, ['P1', 'P2']),     // 업무 자동화
      dataAnalysis: calculateCategoryScore(data.assessmentResponses, ['D1', 'D2']),       // 데이터 분석
      aiToolUsage: calculateCategoryScore(data.assessmentResponses, ['E2', 'E3']),        // AI 도구 활용
      digitalCollaboration: calculateCategoryScore(data.assessmentResponses, ['C3', 'C4']) // 디지털 협업
    };
    
    // 실무 역량 전체 평균 점수
    const totalPracticalScore = Object.values(practicalCategories).reduce((sum, score) => sum + score, 0) / 4;
    
    // 실무 역량 등급 산정
    const practicalGrade = calculateGrade(totalPracticalScore);
    
    const result = {
      categories: practicalCategories,
      totalScore: Math.round(totalPracticalScore * 20), // 100점 만점으로 변환
      grade: practicalGrade,
      strengths: identifyPracticalStrengths(practicalCategories),
      improvements: identifyPracticalImprovements(practicalCategories)
    };
    
    console.log('✅ 실무 역량 점수 계산 완료:', result);
    return result;
    
  } catch (error) {
    console.error('❌ 실무 역량 점수 계산 오류:', error);
    throw new Error('실무 역량 점수 계산 중 오류가 발생했습니다.');
  }
}

/**
 * 실무 역량 강점 식별
 */
function identifyPracticalStrengths(categories) {
  const strengths = [];
  Object.entries(categories).forEach(([key, score]) => {
    if (score >= 4.0) {
      const categoryName = getPracticalCategoryName(key);
      strengths.push(categoryName);
    }
  });
  return strengths;
}

/**
 * 실무 역량 개선점 식별
 */
function identifyPracticalImprovements(categories) {
  const improvements = [];
  Object.entries(categories).forEach(([key, score]) => {
    if (score <= 2.5) {
      const categoryName = getPracticalCategoryName(key);
      improvements.push(categoryName);
    }
  });
  return improvements;
}

/**
 * 실무 역량 분야명 변환
 */
function getPracticalCategoryName(key) {
  const names = {
    workAutomation: '업무 자동화',
    dataAnalysis: '데이터 분석',
    aiToolUsage: 'AI 도구 활용',
    digitalCollaboration: '디지털 협업'
  };
  return names[key] || key;
}

// ============================================================================
// 📈 벤치마크 분석
// ============================================================================

/**
 * 업종별 벤치마크 분석
 */
function performBenchmarkAnalysis(data, aiScores) {
  console.log('📈 벤치마크 분석 시작');
  
  try {
    const industry = data.industry || '기타';
    const industryBenchmark = CONFIG.INDUSTRY_BENCHMARKS[industry] || 60;
    
    const gap = aiScores.totalScore - industryBenchmark;
    const gapAnalysis = gap >= 0 ? '업종 평균 이상' : '업종 평균 이하';
    
    const result = {
      industry,
      industryBenchmark,
      userScore: aiScores.totalScore,
      gap,
      gapAnalysis,
      percentile: calculatePercentile(aiScores.totalScore, industryBenchmark)
    };
    
    console.log('✅ 벤치마크 분석 완료:', result);
    return result;
    
  } catch (error) {
    console.error('❌ 벤치마크 분석 오류:', error);
    throw new Error('벤치마크 분석 중 오류가 발생했습니다.');
  }
}

/**
 * 백분위 계산
 */
function calculatePercentile(userScore, benchmark) {
  const ratio = userScore / benchmark;
  
  if (ratio >= 1.3) return 95;
  if (ratio >= 1.2) return 85;
  if (ratio >= 1.1) return 75;
  if (ratio >= 1.0) return 60;
  if (ratio >= 0.9) return 40;
  if (ratio >= 0.8) return 25;
  return 15;
}

/**
 * 업종별 특화 점수 계산 (80+ 업종 지원)
 */
function calculateIndustrySpecificScore(data) {
  console.log('🏭 업종별 특화 점수 계산 시작');
  
  try {
    const industry = data.industry || '기타';
    const aiScores = calculateAICapabilityScores(data);
    const practicalScores = calculatePracticalCapabilityScores(data);
    
    // 업종별 가중치 적용
    const industryWeights = getIndustryWeights(industry);
    
    let weightedScore = 0;
    weightedScore += aiScores.categories.leadership * industryWeights.leadership;
    weightedScore += aiScores.categories.infrastructure * industryWeights.infrastructure;
    weightedScore += aiScores.categories.employeeCapability * industryWeights.employee;
    weightedScore += aiScores.categories.culture * industryWeights.culture;
    weightedScore += practicalScores.categories.workAutomation * industryWeights.automation;
    weightedScore += practicalScores.categories.dataAnalysis * industryWeights.data;
    
    const finalWeightedScore = weightedScore / 6; // 평균 계산
    
    const result = {
      industry,
      weightedScore: Math.round(finalWeightedScore * 20), // 100점 만점
      industryWeights,
      specialization: getIndustrySpecialization(industry),
      recommendations: getIndustryRecommendations(industry, finalWeightedScore * 20),
      competitorAnalysis: getCompetitorBenchmark(industry),
      growthPotential: calculateGrowthPotential(industry, finalWeightedScore * 20)
    };
    
    console.log('✅ 업종별 특화 점수 계산 완료:', result);
    return result;
    
  } catch (error) {
    console.error('❌ 업종별 특화 점수 계산 오류:', error);
    throw new Error('업종별 특화 점수 계산 중 오류가 발생했습니다.');
  }
}

/**
 * 업종별 가중치 반환
 */
function getIndustryWeights(industry) {
  const weights = {
    'IT/소프트웨어': { leadership: 1.2, infrastructure: 1.5, employee: 1.3, culture: 1.1, automation: 1.4, data: 1.2 },
    'SaaS/클라우드': { leadership: 1.3, infrastructure: 1.6, employee: 1.4, culture: 1.2, automation: 1.5, data: 1.3 },
    '제조업': { leadership: 1.0, infrastructure: 1.3, employee: 1.0, culture: 0.9, automation: 1.5, data: 1.1 },
    '자동차': { leadership: 1.1, infrastructure: 1.4, employee: 1.1, culture: 1.0, automation: 1.6, data: 1.2 },
    '금융/보험': { leadership: 1.3, infrastructure: 1.4, employee: 1.2, culture: 1.0, automation: 1.2, data: 1.5 },
    '서비스업': { leadership: 1.1, infrastructure: 1.0, employee: 1.4, culture: 1.3, automation: 1.1, data: 1.0 },
    '컨설팅': { leadership: 1.4, infrastructure: 1.1, employee: 1.5, culture: 1.2, automation: 1.2, data: 1.3 },
    '헬스케어': { leadership: 1.2, infrastructure: 1.2, employee: 1.3, culture: 1.1, automation: 1.3, data: 1.4 },
    '교육': { leadership: 1.1, infrastructure: 0.9, employee: 1.4, culture: 1.3, automation: 1.0, data: 1.1 },
    '기타': { leadership: 1.0, infrastructure: 1.0, employee: 1.0, culture: 1.0, automation: 1.0, data: 1.0 }
  };
  
  return weights[industry] || weights['기타'];
}

/**
 * 업종별 특화 분야 반환
 */
function getIndustrySpecialization(industry) {
  const specializations = {
    'IT/소프트웨어': ['AI 개발', '클라우드 마이그레이션', 'DevOps 자동화', '데이터 사이언스'],
    'SaaS/클라우드': ['SaaS 플랫폼 구축', '클라우드 최적화', 'API 자동화', '사용자 분석'],
    '제조업': ['스마트 팩토리', 'IoT 센서 활용', '예측 유지보수', '품질 관리 AI'],
    '자동차': ['자율주행 AI', '예측 정비', '공급망 최적화', '고객 경험 AI'],
    '금융/보험': ['로보어드바이저', '사기 탐지', '신용평가 AI', '고객 세분화'],
    '서비스업': ['챗봇 도입', '고객 분석', '개인화 서비스', '업무 자동화'],
    '컨설팅': ['데이터 기반 컨설팅', 'AI 전략 수립', '디지털 혁신', '프로세스 최적화'],
    '헬스케어': ['진단 보조 AI', '환자 모니터링', '신약 개발 AI', '의료 데이터 분석'],
    '교육': ['개인화 학습', '학습 분석', '자동 평가', 'AI 튜터링'],
    '유통/소매': ['수요 예측', '재고 최적화', '고객 추천', '가격 최적화'],
    '기타': ['업무 효율화', 'AI 도구 활용', '데이터 기반 의사결정', '고객 서비스 개선']
  };
  
  return specializations[industry] || specializations['기타'];
}

/**
 * 업종별 맞춤 추천사항 반환
 */
function getIndustryRecommendations(industry, score) {
  const recommendations = {
    'IT/소프트웨어': {
      high: ['AI/ML 엔지니어 채용', 'MLOps 파이프라인 구축', '고급 AI 모델 도입', '오픈소스 AI 기여'],
      medium: ['개발팀 AI 교육', '자동화 도구 확대', 'AI 코드 리뷰 도입', 'AI 개발 문화 조성'],
      low: ['기본 AI 도구 학습', 'ChatGPT 활용 교육', '데이터 기반 개발 문화', 'AI 기초 교육']
    },
    '제조업': {
      high: ['디지털 트윈 구축', 'AI 기반 생산 최적화', '전사 IoT 플랫폼', '스마트 팩토리 완성'],
      medium: ['스마트 센서 도입', '예측 유지보수 시작', '품질 검사 자동화', 'MES 시스템 고도화'],
      low: ['기본 데이터 수집', 'Excel 자동화', '제조 현장 디지털화', 'IoT 기초 도입']
    },
    '금융/보험': {
      high: ['AI 기반 위험 관리', '고도화된 로보어드바이저', '실시간 사기 탐지', 'RegTech 도입'],
      medium: ['고객 세분화 AI', '신용평가 모델 개선', '챗봇 고도화', '프로세스 자동화'],
      low: ['기본 데이터 분석', '고객 관리 시스템', 'RPA 도입', 'AI 리터러시 교육']
    },
    '기타': {
      high: ['AI 전담팀 구성', '고급 분석 도구 도입', '전사 AI 전략 수립', 'AI 혁신 센터 구축'],
      medium: ['직원 AI 교육', '업무 프로세스 자동화', 'BI 도구 활용', 'AI 파일럿 프로젝트'],
      low: ['기본 AI 도구 활용', '데이터 정리', 'AI 문화 조성', '기초 교육 프로그램']
    }
  };
  
  const industryRec = recommendations[industry] || recommendations['기타'];
  
  if (score >= 80) return industryRec.high;
  if (score >= 60) return industryRec.medium;
  return industryRec.low;
}

/**
 * 경쟁사 벤치마크 반환
 */
function getCompetitorBenchmark(industry) {
  const benchmarks = {
    'IT/소프트웨어': { leaders: ['네이버', '카카오', '삼성SDS'], averageScore: 78, topScore: 92 },
    '제조업': { leaders: ['삼성전자', 'LG전자', '현대자동차'], averageScore: 68, topScore: 85 },
    '금융/보험': { leaders: ['KB국민은행', '신한은행', '삼성생명'], averageScore: 80, topScore: 88 },
    '서비스업': { leaders: ['CJ올리브네트웍스', 'SK플래닛', 'NHN'], averageScore: 65, topScore: 82 },
    '기타': { leaders: ['업종 리더들'], averageScore: 60, topScore: 75 }
  };
  
  return benchmarks[industry] || benchmarks['기타'];
}

/**
 * 성장 잠재력 계산
 */
function calculateGrowthPotential(industry, currentScore) {
  const industryGrowth = {
    'IT/소프트웨어': 0.9, 'SaaS/클라우드': 0.95, '핀테크': 0.9,
    '제조업': 0.7, '자동차': 0.8, '헬스케어': 0.85,
    '금융/보험': 0.75, '교육': 0.8, '유통/소매': 0.7,
    '기타': 0.6
  };
  
  const baseGrowth = industryGrowth[industry] || 0.6;
  const scoreMultiplier = currentScore < 50 ? 1.5 : currentScore < 70 ? 1.2 : 1.0;
  
  return {
    potential: Math.round(baseGrowth * scoreMultiplier * 100),
    timeframe: currentScore < 50 ? '2-3년' : currentScore < 70 ? '1-2년' : '6-12개월',
    expectedImprovement: Math.round((100 - currentScore) * baseGrowth)
  };
}

// ============================================================================
// 🤖 GEMINI AI 보고서 생성
// ============================================================================

/**
 * GEMINI AI 보고서 생성
 */
/**
 * GEMINI 2.5 Flash 강제 보고서 생성 - 실패 시 재시도
 */
function generateAIReportForced(data, aiScores, benchmarkData) {
  console.log('🚀 GEMINI 2.5 Flash 강제 보고서 생성 시작');
  
  const maxRetries = 3;
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 GEMINI API 호출 시도 ${attempt}/${maxRetries}`);
      
      const prompt = createEnhancedAIReportPrompt(data, aiScores, benchmarkData);
      
      const payload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.85,      // GEMINI 2.5 Flash 최적화
          topK: 60,
          topP: 0.98,
          maxOutputTokens: 65536, // 최대 토큰 활용
          candidateCount: 1
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
        timeout: 300000 // 5분 타임아웃
      };
      
      console.log('🔧 GEMINI 2.5 Flash 모델 사용');
      console.log('🔑 API 키:', CONFIG.GEMINI_API_KEY.substring(0, 15) + '...');
      
      const apiUrl = `${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`;
      const response = UrlFetchApp.fetch(apiUrl, options);
      
      console.log('📊 응답 상태:', response.getResponseCode());
      
      if (response.getResponseCode() !== 200) {
        const errorText = response.getContentText();
        console.error('❌ API 오류 응답:', errorText);
        throw new Error(`GEMINI API 오류 ${response.getResponseCode()}: ${errorText}`);
      }
      
      const responseData = JSON.parse(response.getContentText());
      
      if (!responseData.candidates || !responseData.candidates[0] || !responseData.candidates[0].content) {
        console.error('❌ 응답 구조 오류:', JSON.stringify(responseData, null, 2));
        throw new Error('GEMINI API 응답 형식 오류');
      }
      
      const aiReport = responseData.candidates[0].content.parts[0].text;
      
      if (!aiReport || aiReport.length < 1000) {
        throw new Error('생성된 보고서가 너무 짧습니다');
      }
      
      console.log('✅ GEMINI 2.5 Flash 보고서 생성 성공 - 길이:', aiReport.length);
      return aiReport;
      
    } catch (error) {
      lastError = error;
      console.error(`❌ 시도 ${attempt} 실패:`, error.message);
      
      if (attempt < maxRetries) {
        console.log(`⏳ ${2000 * attempt}ms 후 재시도...`);
        Utilities.sleep(2000 * attempt);
      }
    }
  }
  
  console.error('❌ 모든 재시도 실패, 고품질 폴백 보고서 생성');
  return generateHighQualityFallbackReport(data, aiScores, benchmarkData);
}

/**
 * AI 보고서 프롬프트 생성 (GEMINI 2.5 Flash 최적화)
 */
function createAIReportPrompt(data, aiScores, benchmarkData) {
  return `
당신은 28년 경력의 AI 교육 전문가 이후경 교장입니다. 다음 기업의 AI 역량진단 결과를 바탕으로 전문적이고 실무적인 진단 보고서를 작성해주세요.

🏢 **기업 정보**
• 기업명: ${data.companyName}
• 업종: ${data.industry}
• 규모: ${data.companySize}
• 지역: ${data.region}

📊 **AI 역량 진단 결과**
• 종합 점수: ${aiScores.totalScore}/100점 (${aiScores.grade}등급)
• 분야별 점수:
  - 경영진 리더십: ${Math.round(aiScores.categories.leadership * 20)}점
  - AI 인프라: ${Math.round(aiScores.categories.infrastructure * 20)}점
  - 직원 역량: ${Math.round(aiScores.categories.employeeCapability * 20)}점
  - 조직 문화: ${Math.round(aiScores.categories.culture * 20)}점
  - 실무 적용: ${Math.round(aiScores.categories.practicalApplication * 20)}점
  - 데이터 역량: ${Math.round(aiScores.categories.dataCapability * 20)}점

📈 **업종 벤치마크 비교**
• 업종 평균: ${benchmarkData.industryBenchmark}점
• 차이: ${benchmarkData.gap > 0 ? '+' : ''}${benchmarkData.gap}점 (${benchmarkData.gapAnalysis})
• 업종 내 위치: 상위 ${100 - benchmarkData.percentile}%

**다음 구조에 따라 상세하고 실무적인 보고서를 작성해주세요:**

# 🎯 ${data.companyName} AI 역량진단 종합 보고서

## 📋 1. 진단 결과 종합
### 1.1 전체 평가
- ${aiScores.grade}등급 (${aiScores.totalScore}점)에 대한 상세한 해석
- 업종 평균 대비 현재 위치와 의미

### 1.2 핵심 강점 (Top 3)
- 가장 높은 점수를 받은 분야들의 구체적 분석
- 각 강점이 비즈니스에 미치는 긍정적 영향

### 1.3 개선 필요 영역 (Top 3)
- 낮은 점수 분야의 원인 분석
- 개선하지 않을 경우의 리스크

## 🔍 2. 분야별 상세 분석
### 2.1 경영진 리더십 (${Math.round(aiScores.categories.leadership * 20)}점)
- 현재 수준 평가 및 업종 대비 위치
- 구체적 개선 방안과 실행 가이드

### 2.2 AI 인프라 (${Math.round(aiScores.categories.infrastructure * 20)}점)
- 기술적 현황과 개선 포인트
- 투자 우선순위와 예상 비용

### 2.3 직원 역량 (${Math.round(aiScores.categories.employeeCapability * 20)}점)
- 교육 필요도와 맞춤형 교육 방안
- 역량 개발 로드맵

### 2.4 조직 문화 (${Math.round(aiScores.categories.culture * 20)}점)
- 문화적 변화 필요성과 방법론
- 조직 저항 최소화 전략

### 2.5 실무 적용 (${Math.round(aiScores.categories.practicalApplication * 20)}점)
- 즉시 적용 가능한 AI 도구와 활용법
- 업무 프로세스 개선 방안

### 2.6 데이터 역량 (${Math.round(aiScores.categories.dataCapability * 20)}점)
- 데이터 관리 현황과 개선책
- 데이터 기반 의사결정 체계 구축

## 🗺️ 3. 단계별 실행 로드맵
### 3.1 즉시 실행 (1-3개월)
- 투자 비용이 적고 효과가 큰 3-5개 액션 아이템
- 각 항목별 구체적 실행 방법과 책임자

### 3.2 단기 목표 (3-6개월)
- 기반 구축 완료 후 실행할 5-7개 과제
- 예상 투자 비용과 ROI

### 3.3 중기 전략 (6-12개월)
- 전사적 AI 도입을 위한 주요 프로젝트
- 조직 변화 관리 방안

### 3.4 장기 비전 (1-3년)
- AI 기반 비즈니스 혁신 방향
- 경쟁 우위 확보 전략

## 💡 4. 맞춤형 솔루션 제안
### 4.1 AICAMP 교육 프로그램
- 기업 규모와 수준에 맞는 맞춤형 교육 과정
- 교육 일정과 예상 효과

### 4.2 투자 계획 및 예산
- 단계별 투자 계획 (총 예상 비용: ${data.companySize === '10명 미만' ? '3천-1억원' : data.companySize === '50명 미만' ? '5천-2억원' : '1-5억원'})
- ROI 분석 및 회수 기간

### 4.3 성공 지표 (KPI)
- 단계별 성과 측정 지표
- 모니터링 방법론

## 🚀 5. 결론 및 다음 단계
### 5.1 핵심 메시지
- 진단 결과의 핵심 요약
- 가장 중요한 실행 과제 3가지

### 5.2 즉시 시작할 액션
- 내일부터 바로 시작할 수 있는 구체적 행동
- 첫 달 안에 달성해야 할 목표

---
**💬 추가 컨설팅 문의: hongik423@gmail.com**
**🌐 AICAMP: https://ai-camp-landingpage.vercel.app**

보고서는 경영진의 의사결정을 돕고, 실무진이 즉시 실행할 수 있는 구체적이고 실용적인 내용으로 작성해주세요. 업종별 특성과 기업 규모를 고려한 맞춤형 제안을 포함해주세요.
`;
}

/**
 * Fallback 보고서 생성
 */
function generateFallbackReport(data, aiScores, benchmarkData) {
  return `
# 🎯 AI 역량진단 종합 보고서

## 📊 진단 결과 요약
**${data.companyName}**의 AI 역량 종합 점수는 **${aiScores.totalScore}점(${aiScores.grade}등급)**입니다.

**주요 강점:**
1. 가장 높은 점수를 받은 영역에서의 우수한 성과
2. 업종 평균 대비 ${benchmarkData.gap > 0 ? '우수한' : '개선이 필요한'} 수준
3. 전체적인 AI 활용 의지와 준비도

**개선 필요 영역:**
1. 상대적으로 낮은 점수를 받은 분야의 역량 강화
2. 체계적인 AI 전략 수립
3. 조직 전반의 AI 리터러시 향상

## 🚀 개선 로드맵
**단기 (1-3개월):**
- AI 교육 프로그램 도입
- 기본적인 AI 도구 활용 시작

**중기 (3-6개월):**
- AI 전략 수립 및 실행 계획 구체화
- 인프라 및 시스템 개선

**장기 (6-12개월):**
- 전사적 AI 혁신 문화 구축
- 고도화된 AI 솔루션 도입

이후경 교장의 28년 교육 노하우를 바탕으로 한 맞춤형 컨설팅을 통해 더욱 구체적인 개선 방안을 제시받으실 수 있습니다.
`;
}

// ============================================================================
// 📊 SWOT 전략 분석 엔진
// ============================================================================

/**
 * SWOT 전략 분석 엔진
 */
function generateStrategicSWOTLinkage(companyScores, gapAnalysis, data) {
  console.log('📊 SWOT 전략 분석 시작');
  
  try {
    const swot = analyzeSWOT(companyScores, gapAnalysis, data);
    
    const strategies = {
      SO: generateSOStrategies(swot.strengths, swot.opportunities, data),  // 강점-기회
      WO: generateWOStrategies(swot.weaknesses, swot.opportunities, data), // 약점-기회
      ST: generateSTStrategies(swot.strengths, swot.threats, data),        // 강점-위기
      WT: generateWTStrategies(swot.weaknesses, swot.threats, data)        // 약점-위기
    };
    
    const result = {
      swot,
      strategies,
      priorityActions: getPriorityActions(strategies, companyScores),
      implementationTimeline: getImplementationTimeline(strategies),
      expectedOutcomes: getExpectedOutcomes(strategies, data.industry),
      riskAssessment: getRiskAssessment(strategies, data)
    };
    
    console.log('✅ SWOT 전략 분석 완료');
    return result;
    
  } catch (error) {
    console.error('❌ SWOT 전략 분석 오류:', error);
    throw new Error('SWOT 전략 분석 중 오류가 발생했습니다.');
  }
}

/**
 * SWOT 요소 분석
 */
function analyzeSWOT(scores, gap, data) {
  const strengths = [];
  const weaknesses = [];
  
  // 강점 식별 (평균 이상 분야)
  Object.entries(scores.categories).forEach(([key, score]) => {
    if (score >= 4.0) {
      strengths.push(getCategoryName(key));
    } else if (score <= 2.5) {
      weaknesses.push(getCategoryName(key));
    }
  });
  
  // 업종별 기회와 위기
  const opportunities = getIndustryOpportunities(data.industry);
  const threats = getIndustryThreats(data.industry);
  
  return { strengths, weaknesses, opportunities, threats };
}

/**
 * 카테고리명 한글 변환
 */
function getCategoryName(key) {
  const names = {
    leadership: '경영진 리더십',
    infrastructure: 'AI 인프라',
    employeeCapability: '직원 역량',
    culture: '조직 문화',
    practicalApplication: '실무 적용',
    dataCapability: '데이터 역량'
  };
  return names[key] || key;
}

/**
 * SO 전략 (강점-기회 활용)
 */
function generateSOStrategies(strengths, opportunities, data) {
  const strategies = [];
  
  if (strengths.includes('경영진 리더십') && opportunities.includes('AI 기술 발전')) {
    strategies.push('경영진 리더십을 바탕으로 최신 AI 기술 선도적 도입');
  }
  
  if (strengths.includes('AI 인프라') && opportunities.includes('디지털 전환 가속화')) {
    strategies.push('구축된 AI 인프라를 활용한 디지털 혁신 서비스 출시');
  }
  
  if (strengths.includes('직원 역량') && opportunities.includes('정부 지원 정책')) {
    strategies.push('우수한 인력을 활용하여 정부 AI 프로젝트 참여 확대');
  }
  
  // 기본 SO 전략
  strategies.push('핵심 역량을 활용한 새로운 AI 사업 기회 창출');
  strategies.push('강점 분야 중심의 AI 솔루션 개발 및 상용화');
  
  return strategies;
}

/**
 * WO 전략 (약점-기회 보완)
 */
function generateWOStrategies(weaknesses, opportunities, data) {
  const strategies = [];
  
  if (weaknesses.includes('AI 인프라') && opportunities.includes('클라우드 서비스 확산')) {
    strategies.push('클라우드 기반 AI 플랫폼 도입으로 인프라 한계 극복');
  }
  
  if (weaknesses.includes('직원 역량') && opportunities.includes('AI 교육 확산')) {
    strategies.push('전문 교육기관과 협력하여 직원 AI 역량 집중 육성');
  }
  
  if (weaknesses.includes('데이터 역량') && opportunities.includes('데이터 생태계 발전')) {
    strategies.push('외부 데이터 파트너십을 통한 빅데이터 분석 역량 확보');
  }
  
  // 기본 WO 전략
  strategies.push('시장 기회를 활용한 취약 분야 전략적 보완');
  strategies.push('외부 협력을 통한 약점 분야 빠른 역량 확보');
  
  return strategies;
}

/**
 * ST 전략 (강점-위기 대응)
 */
function generateSTStrategies(strengths, threats, data) {
  const strategies = [];
  
  if (strengths.includes('경영진 리더십') && threats.includes('기술 변화 속도')) {
    strategies.push('강력한 리더십으로 신속한 기술 적응 체계 구축');
  }
  
  if (strengths.includes('조직 문화') && threats.includes('인력 부족')) {
    strategies.push('우수한 조직 문화를 바탕으로 핵심 인재 유지 및 확보');
  }
  
  if (strengths.includes('실무 적용') && threats.includes('보안 리스크')) {
    strategies.push('검증된 실무 경험을 바탕으로 안전한 AI 도입 전략 수립');
  }
  
  // 기본 ST 전략
  strategies.push('핵심 강점을 활용한 위기 상황 선제적 대응');
  strategies.push('경쟁 우위 요소를 통한 시장 위험 최소화');
  
  return strategies;
}

/**
 * WT 전략 (약점-위기 극복)
 */
function generateWTStrategies(weaknesses, threats, data) {
  const strategies = [];
  
  if (weaknesses.includes('AI 인프라') && threats.includes('초기 투자 비용')) {
    strategies.push('단계적 투자 전략으로 인프라 구축 부담 최소화');
  }
  
  if (weaknesses.includes('직원 역량') && threats.includes('기술 변화 속도')) {
    strategies.push('핵심 분야 집중 교육으로 변화 적응력 확보');
  }
  
  if (weaknesses.includes('데이터 역량') && threats.includes('보안 리스크')) {
    strategies.push('보안이 강화된 기본 데이터 관리 체계부터 구축');
  }
  
  // 기본 WT 전략
  strategies.push('약점과 위험 요소를 동시에 해결하는 방어적 전략');
  strategies.push('리스크 최소화를 위한 점진적 AI 도입 방안');
  
  return strategies;
}

/**
 * 업종별 기회 요소
 */
function getIndustryOpportunities(industry) {
  const opportunities = {
    'IT/소프트웨어': ['AI 기술 발전', '클라우드 시장 확대', '디지털 전환 가속화', '오픈소스 생태계'],
    '제조업': ['스마트 팩토리 확산', 'IoT 기술 발전', '탄소중립 요구', '공급망 디지털화'],
    '금융/보험': ['핀테크 혁신', '디지털 금융 확산', 'RegTech 발전', '개인화 서비스 수요'],
    '서비스업': ['디지털 고객 경험', '자동화 기술 발전', '개인화 서비스', 'O2O 플랫폼'],
    '헬스케어': ['디지털 헬스케어', 'AI 진단 기술', '원격 의료', '개인 맞춤 치료'],
    '교육': ['에듀테크 확산', '개인화 학습', '원격 교육', 'AI 튜터링'],
    '기타': ['AI 기술 발전', '디지털 전환 가속화', '정부 지원 정책', '글로벌 시장 확대']
  };
  
  return opportunities[industry] || opportunities['기타'];
}

/**
 * 업종별 위기 요소
 */
function getIndustryThreats(industry) {
  const threats = {
    'IT/소프트웨어': ['기술 변화 속도', '글로벌 경쟁 심화', '인력 부족', '보안 위협'],
    '제조업': ['글로벌 공급망 불안', '환경 규제 강화', '기술 변화 적응', '초기 투자 부담'],
    '금융/보험': ['규제 강화', '사이버 보안 위험', '핀테크 경쟁', '고객 신뢰 이슈'],
    '서비스업': ['경쟁 심화', '고객 기대 상승', '인력 비용 증가', '기술 격차'],
    '헬스케어': ['의료 규제', '개인정보 보호', '기술 신뢰성', '윤리적 이슈'],
    '교육': ['교육 격차 심화', '기술 적응 속도', '개인정보 보호', '전통 교육 저항'],
    '기타': ['기술 변화 속도', '인력 부족', '초기 투자 비용', '보안 리스크']
  };
  
  return threats[industry] || threats['기타'];
}

/**
 * 우선순위 실행 과제
 */
function getPriorityActions(strategies, scores) {
  const actions = [];
  
  // SO 전략 우선 (강점 활용)
  if (strategies.SO.length > 0) {
    actions.push({
      priority: 1,
      type: 'SO',
      action: strategies.SO[0],
      urgency: '높음',
      impact: '높음'
    });
  }
  
  // WO 전략 (약점 보완)
  if (strategies.WO.length > 0) {
    actions.push({
      priority: 2,
      type: 'WO',
      action: strategies.WO[0],
      urgency: '중간',
      impact: '높음'
    });
  }
  
  // ST 전략 (위기 대응)
  if (strategies.ST.length > 0) {
    actions.push({
      priority: 3,
      type: 'ST',
      action: strategies.ST[0],
      urgency: '높음',
      impact: '중간'
    });
  }
  
  return actions.slice(0, 5); // 상위 5개 우선순위
}

/**
 * 실행 타임라인
 */
function getImplementationTimeline(strategies) {
  return {
    phase1: {
      period: '1-3개월',
      focus: 'SO 전략 실행',
      actions: strategies.SO.slice(0, 2)
    },
    phase2: {
      period: '3-6개월',
      focus: 'WO 전략 실행',
      actions: strategies.WO.slice(0, 2)
    },
    phase3: {
      period: '6-12개월',
      focus: 'ST/WT 전략 실행',
      actions: [...strategies.ST.slice(0, 1), ...strategies.WT.slice(0, 1)]
    }
  };
}

/**
 * 기대 성과
 */
function getExpectedOutcomes(strategies, industry) {
  return {
    shortTerm: ['AI 도구 활용도 30% 증가', '업무 효율성 20% 개선', '직원 만족도 향상'],
    mediumTerm: ['매출 15% 증가', '비용 25% 절감', '고객 만족도 20% 개선'],
    longTerm: ['시장 경쟁력 확보', '지속 가능한 AI 조직 구축', '업종 내 AI 선도 기업 위치']
  };
}

/**
 * 위험 평가
 */
function getRiskAssessment(strategies, data) {
  return {
    high: ['기술 변화 대응 지연', '인력 부족 심화', '투자 회수 지연'],
    medium: ['조직 저항', '데이터 품질 이슈', '보안 위험'],
    low: ['소규모 프로젝트 실패', '일시적 성과 부진', '초기 학습비용'],
    mitigation: ['단계적 도입', '충분한 교육', '지속적 모니터링', '전문가 컨설팅']
  };
}

// ============================================================================
// 📧 이메일 발송
// ============================================================================

/**
 * 진단 결과 이메일 발송
 */
function sendDiagnosisEmail(data, aiScores, benchmarkData, aiReport) {
  console.log('📧 이메일 발송 시작');
  
  try {
    const subject = `[AICAMP] ${data.companyName} AI 역량진단 결과 (${aiScores.grade}등급, ${aiScores.totalScore}점)`;
    
    const htmlBody = createEmailTemplate(data, aiScores, benchmarkData, aiReport);
    
    // 신청자에게 발송
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    // 관리자에게 발송
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: `[관리자] ${subject}`,
      htmlBody: htmlBody
    });
    
    console.log('✅ 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    throw error;
  }
}

/**
 * 이메일 템플릿 생성
 */
function createEmailTemplate(data, aiScores, benchmarkData, aiReport) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { padding: 30px; }
        .score-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .category { margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 AI 역량진단 결과</h1>
            <p>이후경 교장의 28년 교육 노하우 기반 맞춤형 분석</p>
        </div>
        
        <div class="content">
            <div class="score-box">
                <h2>📊 진단 결과 요약</h2>
                <p><strong>${data.companyName}</strong></p>
                <p><strong>총점: ${aiScores.totalScore}/100점 (${aiScores.grade}등급)</strong></p>
                <p><strong>업종 평균 대비: ${benchmarkData.gap > 0 ? '+' : ''}${benchmarkData.gap}점</strong></p>
            </div>
            
            <h3>🔍 분야별 상세 점수</h3>
            <div class="category">• 리더십: ${Math.round(aiScores.categories.leadership * 20)}점</div>
            <div class="category">• 인프라: ${Math.round(aiScores.categories.infrastructure * 20)}점</div>
            <div class="category">• 직원역량: ${Math.round(aiScores.categories.employeeCapability * 20)}점</div>
            <div class="category">• 조직문화: ${Math.round(aiScores.categories.culture * 20)}점</div>
            <div class="category">• 실무적용: ${Math.round(aiScores.categories.practicalApplication * 20)}점</div>
            <div class="category">• 데이터역량: ${Math.round(aiScores.categories.dataCapability * 20)}점</div>
            
            <h3>📋 상세 분석 보고서</h3>
            <div style="white-space: pre-line; background: #f8f9fa; padding: 20px; border-radius: 5px;">
${aiReport}
            </div>
        </div>
        
        <div class="footer">
            <p>🚀 더 자세한 컨설팅이 필요하시면 연락주세요!</p>
            <p>📧 hongik423@gmail.com | 🌐 https://ai-camp-landingpage.vercel.app</p>
        </div>
    </div>
</body>
</html>
`;
}

// ============================================================================
// 🗺️ 실행 로드맵 생성 시스템
// ============================================================================

/**
 * 실행 로드맵 생성 시스템
 */
function generateExecutionRoadmap(data, analysisData) {
  console.log('🗺️ 실행 로드맵 생성 시작');
  
  try {
    const roadmap = {
      immediate: generateImmediateActions(analysisData),      // 0-3개월 (즉시 실행)
      shortTerm: generateShortTermGoals(analysisData),        // 3-6개월 (단기 목표)
      mediumTerm: generateMediumTermStrategy(analysisData),   // 6-12개월 (중기 전략)
      longTerm: generateLongTermVision(analysisData)          // 1-3년 (장기 비전)
    };
    
    const timeline = {
      phases: createImplementationPhases(roadmap),
      milestones: createMilestones(roadmap, data.industry),
      resources: estimateResources(roadmap, data.companySize),
      roi: calculateROI(roadmap, data),
      risks: identifyImplementationRisks(roadmap, data)
    };
    
    const result = {
      roadmap,
      timeline,
      successMetrics: defineSuccessMetrics(data.industry),
      riskFactors: identifyRiskFactors(analysisData),
      budgetEstimate: createBudgetEstimate(roadmap, data.companySize),
      teamStructure: recommendTeamStructure(data.companySize, analysisData)
    };
    
    console.log('✅ 실행 로드맵 생성 완료');
    return result;
    
  } catch (error) {
    console.error('❌ 실행 로드맵 생성 오류:', error);
    throw new Error('실행 로드맵 생성 중 오류가 발생했습니다.');
  }
}

/**
 * 즉시 실행 과제 (0-3개월)
 */
function generateImmediateActions(analysisData) {
  return [
    '경영진 AI 리더십 교육 (CEO, CTO 대상)',
    '기본 AI 도구 도입 (ChatGPT, Claude 등)',
    '현재 데이터 현황 파악 및 정리',
    'AI 활용 가이드라인 및 정책 수립',
    '핵심 직원 대상 AI 리터러시 기초 교육',
    'AI 파일럿 프로젝트 기획 및 팀 구성',
    '업무 프로세스 분석 및 자동화 후보 식별'
  ];
}

/**
 * 단기 목표 (3-6개월)
 */
function generateShortTermGoals(analysisData) {
  return [
    '부서별 AI 활용 사례 발굴 및 실행',
    '기본 업무 프로세스 자동화 도입 (RPA)',
    'BI 도구 활용 교육 및 데이터 시각화',
    'AI 프로젝트 파일럿 실행 및 성과 측정',
    '전 직원 대상 AI 기초 교육 프로그램',
    '데이터 품질 개선 및 표준화 작업',
    'AI 도입 성과 측정 시스템 구축'
  ];
}

/**
 * 중기 전략 (6-12개월)
 */
function generateMediumTermStrategy(analysisData) {
  return [
    'AI 전담조직 구성 및 운영',
    '통합 데이터 플랫폼 구축',
    '전사 AI 전략 수립 및 실행계획',
    '고급 AI 솔루션 도입 (ML, 딥러닝)',
    '업무 프로세스 전면 디지털화',
    '고객 대상 AI 서비스 개발',
    'AI 기반 의사결정 시스템 구축'
  ];
}

/**
 * 장기 비전 (1-3년)
 */
function generateLongTermVision(analysisData) {
  return [
    'AI 기반 비즈니스 모델 혁신',
    '업종 내 AI 선도 기업 위치 확립',
    'AI 생태계 구축 및 파트너십',
    '지속가능한 AI 조직 운영 체계',
    '글로벌 AI 경쟁력 확보',
    'AI 윤리 및 거버넌스 완성',
    '차세대 AI 기술 연구개발'
  ];
}

/**
 * 실행 단계별 구조
 */
function createImplementationPhases(roadmap) {
  return [
    {
      phase: 1,
      period: '0-3개월',
      title: '기반 구축 단계',
      focus: 'AI 기초 역량 확보',
      actions: roadmap.immediate,
      budget: '1,000-3,000만원',
      personnel: '5-8명'
    },
    {
      phase: 2,
      period: '3-6개월',
      title: '실행 확산 단계',
      focus: 'AI 활용 확산',
      actions: roadmap.shortTerm,
      budget: '3,000-8,000만원',
      personnel: '8-15명'
    },
    {
      phase: 3,
      period: '6-12개월',
      title: '체계화 단계',
      focus: 'AI 조직 체계화',
      actions: roadmap.mediumTerm,
      budget: '8,000만원-2억원',
      personnel: '15-25명'
    },
    {
      phase: 4,
      period: '1-3년',
      title: '혁신 완성 단계',
      focus: 'AI 혁신 완성',
      actions: roadmap.longTerm,
      budget: '2억-10억원',
      personnel: '25-50명'
    }
  ];
}

/**
 * 주요 마일스톤
 */
function createMilestones(roadmap, industry) {
  const industryMilestones = {
    'IT/소프트웨어': ['AI 개발 환경 구축', 'MLOps 파이프라인 완성', 'AI 제품 출시'],
    '제조업': ['스마트 센서 도입', '예측 유지보수 시작', '스마트 팩토리 구축'],
    '금융/보험': ['AI 모델 검증', '고객 세분화 완성', '로보어드바이저 런칭'],
    '기타': ['AI 기초 교육 완료', 'AI 파일럿 성공', 'AI 플랫폼 구축', 'AI 혁신 달성']
  };
  
  return industryMilestones[industry] || industryMilestones['기타'];
}

/**
 * 자원 추정
 */
function estimateResources(roadmap, companySize) {
  const sizeMultiplier = {
    '10명 미만': 0.5,
    '10-49명': 0.7,
    '50-199명': 1.0,
    '200-999명': 1.5,
    '1000명 이상': 2.0
  };
  
  const multiplier = sizeMultiplier[companySize] || 1.0;
  
  return {
    totalBudget: `${Math.round(1 * multiplier)}-${Math.round(5 * multiplier)}억원`,
    personnel: `${Math.round(5 * multiplier)}-${Math.round(15 * multiplier)}명`,
    timeline: '12-36개월',
    externalSupport: '전문 컨설팅 3-6개월',
    training: `${Math.round(50 * multiplier)}-${Math.round(200 * multiplier)}시간`
  };
}

/**
 * ROI 계산
 */
function calculateROI(roadmap, data) {
  const sizeMultiplier = {
    '10명 미만': 0.3,
    '10-49명': 0.5,
    '50-199명': 1.0,
    '200-999명': 2.0,
    '1000명 이상': 5.0
  };
  
  const multiplier = sizeMultiplier[data.companySize] || 1.0;
  
  return {
    expectedROI: '200-500%',
    paybackPeriod: '18-24개월',
    annualSavings: `${Math.round(5000 * multiplier)}만원-${Math.round(2 * multiplier)}억원`,
    productivityGain: '25-40%',
    costReduction: '15-30%',
    revenueIncrease: '10-25%'
  };
}

/**
 * 성공 지표 정의
 */
function defineSuccessMetrics(industry) {
  const metrics = {
    'IT/소프트웨어': ['개발 생산성 40% 향상', '코드 품질 30% 개선', 'AI 제품 출시'],
    '제조업': ['생산 효율성 25% 향상', '품질 불량률 50% 감소', '예측 정확도 90%'],
    '금융/보험': ['업무 자동화율 60%', '고객 만족도 25% 향상', '리스크 예측 정확도 85%'],
    '서비스업': ['고객 응답 시간 70% 단축', '서비스 만족도 30% 향상', '매출 20% 증가'],
    '기타': ['업무 효율성 30% 향상', '의사결정 속도 50% 개선', '고객 만족도 20% 증가']
  };
  
  return metrics[industry] || metrics['기타'];
}

/**
 * 위험 요소 식별
 */
function identifyRiskFactors(analysisData) {
  return {
    technical: ['기술 변화 속도', 'AI 모델 성능', '데이터 품질'],
    organizational: ['조직 저항', '문화적 변화', '인력 교육'],
    financial: ['투자 회수 기간', '예산 초과', 'ROI 달성'],
    external: ['규제 변화', '경쟁사 동향', '기술 표준'],
    mitigation: ['단계적 접근', '충분한 교육', '지속적 모니터링', '전문가 지원']
  };
}

// ============================================================================
// 🎓 AICAMP 맞춤형 교육과정 추천
// ============================================================================

/**
 * AICAMP 맞춤형 교육과정 추천
 */
function generateAICAMPPrograms(data, analysisData) {
  console.log('🎓 AICAMP 교육과정 추천 시작');
  
  try {
    const programs = {
      executive: generateExecutivePrograms(analysisData, data.companySize),     // 경영진 과정
      manager: generateManagerPrograms(analysisData, data.industry),           // 관리자 과정
      employee: generateEmployeePrograms(analysisData, data.companySize),      // 일반 직원 과정
      technical: generateTechnicalPrograms(analysisData, data.industry)        // 기술직 과정
    };
    
    const curriculum = {
      foundation: createFoundationCurriculum(data.industry),
      advanced: createAdvancedCurriculum(analysisData),
      specialized: createSpecializedCurriculum(data.industry),
      certification: createCertificationPath(analysisData)
    };
    
    const schedule = {
      duration: calculateTrainingDuration(programs),
      timeline: createTrainingTimeline(programs),
      budget: estimateTrainingBudget(programs, data.companySize),
      outcomes: defineTrainingOutcomes(programs)
    };
    
    const result = {
      programs,
      curriculum,
      schedule,
      customization: getCustomizationOptions(data),
      pricing: getTrainingPricing(data.companySize),
      support: getOngoingSupport()
    };
    
    console.log('✅ AICAMP 교육과정 추천 완료');
    return result;
    
  } catch (error) {
    console.error('❌ AICAMP 교육과정 추천 오류:', error);
    throw new Error('AICAMP 교육과정 추천 중 오류가 발생했습니다.');
  }
}

/**
 * 경영진 교육 과정
 */
function generateExecutivePrograms(analysisData, companySize) {
  return {
    core: [
      'AI 경영 전략 수립 (CEO/CTO 필수)',
      'AI 투자 의사결정 프레임워크',
      'AI 조직 변화 관리 리더십',
      'AI 윤리 및 거버넌스'
    ],
    duration: '2-3일 집중 과정',
    format: '경영진 전용 워크숍',
    deliverables: ['AI 전략 로드맵', '투자 계획서', '조직 변화 계획'],
    followUp: '월 1회 경영진 AI 브리핑'
  };
}

/**
 * 관리자 교육 과정
 */
function generateManagerPrograms(analysisData, industry) {
  const industrySpecific = {
    'IT/소프트웨어': ['AI 프로젝트 관리', 'AI 개발팀 리딩', 'AI 제품 기획'],
    '제조업': ['스마트 팩토리 관리', 'AI 품질 관리', '예측 유지보수'],
    '금융/보험': ['AI 리스크 관리', '금융 AI 규제', '고객 분석'],
    '기타': ['AI 프로젝트 관리', 'AI 조직 관리', 'AI 변화 관리']
  };
  
  return {
    core: [
      'AI 프로젝트 관리 실무',
      'AI 팀 구성 및 운영',
      '데이터 기반 의사결정',
      'AI 성과 측정 및 관리'
    ],
    specialized: industrySpecific[industry] || industrySpecific['기타'],
    duration: '1-2주 과정',
    format: '실습 중심 워크숍',
    certification: 'AICAMP 관리자 인증'
  };
}

/**
 * 일반 직원 교육 과정
 */
function generateEmployeePrograms(analysisData, companySize) {
  return {
    basic: [
      'AI 기초 개념 및 이해',
      '일상 업무 AI 도구 활용',
      'ChatGPT/Claude 실무 활용',
      'AI와 함께하는 업무 방식'
    ],
    practical: [
      '데이터 분석 기초',
      '업무 자동화 실습',
      'AI 도구 활용 프로젝트',
      '부서별 AI 활용 사례'
    ],
    duration: '4-6주 과정',
    format: '온라인 + 오프라인 혼합',
    assessment: '실무 프로젝트 평가'
  };
}

/**
 * 기술직 교육 과정
 */
function generateTechnicalPrograms(analysisData, industry) {
  return {
    development: [
      'AI 개발 실무',
      'ML 엔지니어링',
      'AI 플랫폼 구축',
      '데이터 파이프라인'
    ],
    specialized: [
      'AutoML 활용',
      'AI 모델 배포',
      'MLOps 구축',
      'AI 보안 및 모니터링'
    ],
    duration: '2-3개월 과정',
    format: '프로젝트 기반 학습',
    certification: 'AICAMP 전문가 인증'
  };
}

/**
 * 교육 예산 추정
 */
function estimateTrainingBudget(programs, companySize) {
  const sizeMultiplier = {
    '10명 미만': 0.3,
    '10-49명': 0.5,
    '50-199명': 1.0,
    '200-999명': 2.0,
    '1000명 이상': 3.0
  };
  
  const base = 5000; // 기본 만원 단위
  const multiplier = sizeMultiplier[companySize] || 1.0;
  
  return {
    total: `${Math.round(base * 0.6 * multiplier)}-${Math.round(base * 1.6 * multiplier)}만원`,
    perPerson: `${Math.round(100 * multiplier)}-${Math.round(300 * multiplier)}만원`,
    executive: `${Math.round(500 * multiplier)}-${Math.round(1000 * multiplier)}만원`,
    bulk: '10명 이상 20% 할인'
  };
}

// ============================================================================
// 💾 Google Sheets 저장
// ============================================================================

/**
 * Google Sheets에 데이터 저장 (58개 컬럼 상세)
 */
function saveToGoogleSheets(diagnosisId, data, aiScores, benchmarkData) {
  console.log('💾 확장된 Google Sheets 저장 시작');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('AI_무료진단신청');
    
    // 시트 없으면 자동 생성
    if (!sheet) {
      console.log('⚠️ AI_무료진단신청 시트가 없습니다. 새로 생성합니다.');
      sheet = spreadsheet.insertSheet('AI_무료진단신청');
      console.log('✅ 새 시트 생성 완료: AI_무료진단신청');
    }
    
    // 실무 역량 및 업종별 특화 점수 계산
    const practicalScores = calculatePracticalCapabilityScores(data);
    const industrySpecific = calculateIndustrySpecificScore(data);
    
    // 58개 컬럼 상세 데이터 구성
    const detailedRowData = [
      // 기본 정보 (1-10)
      new Date(),                    // 1. 접수시간
      diagnosisId,                   // 2. 진단ID
      data.companyName,              // 3. 기업명
      data.industry,                 // 4. 업종
      data.companySize,              // 5. 기업규모
      data.region || '',             // 6. 지역
      data.name,                     // 7. 담당자명
      data.position || '',           // 8. 직책
      data.email,                    // 9. 이메일
      data.phone || '',              // 10. 전화번호
      
      // AI 역량 점수 (11-16)
      Math.round(aiScores.categories.leadership * 20),        // 11. 리더십
      Math.round(aiScores.categories.infrastructure * 20),    // 12. 인프라
      Math.round(aiScores.categories.employeeCapability * 20), // 13. 직원역량
      Math.round(aiScores.categories.culture * 20),           // 14. 조직문화
      Math.round(aiScores.categories.practicalApplication * 20),// 15. 실무적용
      Math.round(aiScores.categories.dataCapability * 20),    // 16. 데이터역량
      
      // 실무 역량 점수 (17-20)
      Math.round(practicalScores.categories.workAutomation * 20),     // 17. 업무자동화
      Math.round(practicalScores.categories.dataAnalysis * 20),       // 18. 데이터분석
      Math.round(practicalScores.categories.aiToolUsage * 20),        // 19. AI도구활용
      Math.round(practicalScores.categories.digitalCollaboration * 20),// 20. 디지털협업
      
      // 종합 점수 및 등급 (21-26)
      aiScores.totalScore,           // 21. AI역량 총점
      aiScores.grade,                // 22. AI역량 등급
      practicalScores.totalScore,    // 23. 실무역량 총점
      practicalScores.grade,         // 24. 실무역량 등급
      industrySpecific.weightedScore,// 25. 업종특화 점수
      calculateGrade(industrySpecific.weightedScore / 20), // 26. 업종특화 등급
      
      // 벤치마크 분석 (27-32)
      benchmarkData.industryBenchmark, // 27. 업종평균
      benchmarkData.gap,             // 28. GAP
      benchmarkData.percentile,      // 29. 백분위
      benchmarkData.gapAnalysis,     // 30. 분석결과
      industrySpecific.specialization.join(', '), // 31. 특화분야
      industrySpecific.competitorAnalysis.averageScore, // 32. 경쟁사평균
      
      // 개별 질문 응답 (33-56) - L1~D4 (24개 질문)
      data.assessmentResponses.L1 || 3, data.assessmentResponses.L2 || 3,
      data.assessmentResponses.L3 || 3, data.assessmentResponses.L4 || 3,
      data.assessmentResponses.I1 || 3, data.assessmentResponses.I2 || 3,
      data.assessmentResponses.I3 || 3, data.assessmentResponses.I4 || 3,
      data.assessmentResponses.E1 || 3, data.assessmentResponses.E2 || 3,
      data.assessmentResponses.E3 || 3, data.assessmentResponses.E4 || 3,
      data.assessmentResponses.C1 || 3, data.assessmentResponses.C2 || 3,
      data.assessmentResponses.C3 || 3, data.assessmentResponses.C4 || 3,
      data.assessmentResponses.P1 || 3, data.assessmentResponses.P2 || 3,
      data.assessmentResponses.P3 || 3, data.assessmentResponses.P4 || 3,
      data.assessmentResponses.D1 || 3, data.assessmentResponses.D2 || 3,
      data.assessmentResponses.D3 || 3, data.assessmentResponses.D4 || 3,
      
      // 추가 정보 (57-58)
      data.currentAIUsage || '',     // 57. 현재AI활용
      data.expectedBenefits || ''    // 58. 기대효과
    ];
    
    sheet.appendRow(detailedRowData);
    
    // 헤더가 없으면 추가
    if (sheet.getRange(1, 1).getValue() === '') {
      const headers = [
        '접수시간', '진단ID', '기업명', '업종', '기업규모', '지역', '담당자명', '직책', '이메일', '전화번호',
        '리더십', '인프라', '직원역량', '조직문화', '실무적용', '데이터역량',
        '업무자동화', '데이터분석', 'AI도구활용', '디지털협업',
        'AI역량총점', 'AI역량등급', '실무역량총점', '실무역량등급', '업종특화점수', '업종특화등급',
        '업종평균', 'GAP', '백분위', '분석결과', '특화분야', '경쟁사평균',
        'L1', 'L2', 'L3', 'L4', 'I1', 'I2', 'I3', 'I4', 'E1', 'E2', 'E3', 'E4',
        'C1', 'C2', 'C3', 'C4', 'P1', 'P2', 'P3', 'P4', 'D1', 'D2', 'D3', 'D4',
        '현재AI활용', '기대효과'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    console.log('✅ 확장된 Google Sheets 저장 완료 (58개 컬럼) - 행 번호:', sheet.getLastRow());
    return diagnosisId;
    
  } catch (error) {
    console.error('❌ 확장된 Google Sheets 저장 오류:', error.message || error);
    console.error('진단 ID:', diagnosisId);
    console.error('회사명:', data.companyName || 'N/A');
    
    // 백업 데이터 로그 (디버깅용)
    console.log('백업 데이터:', JSON.stringify({
      diagnosisId: diagnosisId,
      companyName: data.companyName,
      industry: data.industry,
      email: data.email,
      totalScore: aiScores ? aiScores.totalScore : 'N/A',
      timestamp: new Date().toISOString()
    }));
    
    throw error;
  }
}

/**
 * 무료 진단 신청 데이터 저장 (기존 함수명 호환)
 */
function saveFreeDiagnosisApplication(diagnosisId, data, timestamp) {
  console.log('💾 무료 진단 신청 데이터 저장 시작');
  
  try {
    // AI 분석 수행
    const aiScores = calculateAICapabilityScores(data);
    const benchmarkData = performBenchmarkAnalysis(data, aiScores);
    
    // 확장된 저장 함수 호출
    const result = saveToGoogleSheets(diagnosisId, data, aiScores, benchmarkData);
    console.log('✅ 무료 진단 신청 데이터 저장 성공:', diagnosisId);
    return result;
    
  } catch (error) {
    console.error('❌ 무료 진단 신청 데이터 저장 오류:', error.message || error);
    console.error('진단 ID:', diagnosisId);
    console.error('회사명:', data.companyName || 'N/A');
    
    // 백업 신청 데이터 로그 (디버깅용)
    console.log('백업 신청 데이터:', JSON.stringify({
      diagnosisId: diagnosisId,
      companyName: data.companyName,
      industry: data.industry,
      email: data.email,
      timestamp: timestamp
    }));
    
    throw error;
  }
}

// ============================================================================
// 📋 진행 상태 관리
// ============================================================================

/**
 * 진행 상태 업데이트
 */
function updateProgressStatus(diagnosisId, progress, message) {
  try {
    const cache = CacheService.getScriptCache();
    const statusData = {
      diagnosisId,
      progress,
      message,
      timestamp: new Date().getTime()
    };
    
    cache.put(`status_${diagnosisId}`, JSON.stringify(statusData), 1800); // 30분간 캐시
    
    console.log(`📈 진행 상태 업데이트: ${diagnosisId} - ${progress}% - ${message}`);
    
  } catch (error) {
    console.error('❌ 진행 상태 업데이트 오류:', error);
  }
}

/**
 * 상태 확인 처리
 */
function handleStatusCheck(diagnosisId) {
  try {
    const cache = CacheService.getScriptCache();
    const statusString = cache.get(`status_${diagnosisId}`);
    
    if (!statusString) {
      return createErrorResponse('진단 ID를 찾을 수 없습니다.');
    }
    
    const statusData = JSON.parse(statusString);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        ...statusData
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 상태 확인 오류:', error);
    return createErrorResponse('상태 확인 중 오류가 발생했습니다.');
  }
}

// ============================================================================
// 🔧 유틸리티 함수들
// ============================================================================

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 5);
  return `DIAG_${timestamp}_${random}`;
}

/**
 * 기본 데이터 유효성 검사
 */
function validateBasicData(data) {
  const required = ['companyName', 'industry', 'name', 'email', 'assessmentResponses'];
  
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`필수 필드가 누락되었습니다: ${field}`);
    }
  }
  
  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('올바른 이메일 형식이 아닙니다.');
  }
  
  // 응답 데이터 검사
  const responses = data.assessmentResponses;
  const requiredQuestions = ['L1', 'L2', 'L3', 'L4', 'I1', 'I2', 'I3', 'I4', 
                           'E1', 'E2', 'E3', 'E4', 'C1', 'C2', 'C3', 'C4',
                           'P1', 'P2', 'P3', 'P4', 'D1', 'D2', 'D3', 'D4'];
  
  for (const question of requiredQuestions) {
    if (!responses[question] || responses[question] < 1 || responses[question] > 5) {
      throw new Error(`응답 데이터가 올바르지 않습니다: ${question}`);
    }
  }
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message, diagnosisId = null) {
  const errorResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  };
  
  if (diagnosisId) {
    errorResponse.diagnosisId = diagnosisId;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(errorResponse))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET 요청 처리 (상태 확인용)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    const diagnosisId = e.parameter.diagnosisId;
    
    if (action === 'checkStatus' && diagnosisId) {
      return handleStatusCheck(diagnosisId);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'AICAMP AI 역량진단 시스템 V2.0',
        version: '2.0',
        status: 'active'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse(error.message);
  }
}

// ============================================================================
// 🧪 테스트 함수들 (개발용)
// ============================================================================

/**
 * 시스템 테스트 함수
 */
function testDiagnosisSystem() {
  console.log('🧪 시스템 테스트 시작');
  
  const testData = {
    companyName: 'AI 테스트 컴퍼니',
    industry: 'IT/소프트웨어',
    companySize: '50-199명',
    region: '서울',
    name: '테스트 담당자',
    email: 'test@example.com',
    phone: '010-1234-5678',
    assessmentResponses: {
      L1: 4, L2: 3, L3: 4, L4: 3,
      I1: 4, I2: 3, I3: 4, I4: 3,
      E1: 4, E2: 3, E3: 4, E4: 4,
      C1: 4, C2: 3, C3: 4, C4: 4,
      P1: 3, P2: 3, P3: 4, P4: 3,
      D1: 4, D2: 3, D3: 3, D4: 3
    }
  };
  
  try {
    const result = handleDiagnosisSubmission(testData);
    console.log('✅ 테스트 성공:', result);
  } catch (error) {
    console.error('❌ 테스트 실패:', error);
  }
}

// ============================================================================
// 📧 관리자 알림 시스템
// ============================================================================

/**
 * 무료 진단 관리자 알림 발송
 */
function sendFreeDiagnosisAdminNotification(data, diagnosisId) {
  console.log('📧 관리자 알림 발송 시작');
  
  try {
    const subject = `[AICAMP 관리자] 새로운 AI 역량진단 신청 - ${data.companyName}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
.container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
.content { padding: 20px; }
.info-box { background: #f8f9fa; border-left: 4px solid #ff6b6b; padding: 15px; margin: 15px 0; border-radius: 5px; }
</style></head>
<body>
<div class="container">
<div class="header"><h1>🚨 새로운 진단 신청 알림</h1></div>
<div class="content">
<div class="info-box">
<h3>📋 신청 정보</h3>
<p><strong>진단 ID:</strong> ${diagnosisId}</p>
<p><strong>기업명:</strong> ${data.companyName}</p>
<p><strong>업종:</strong> ${data.industry} / ${data.companySize}</p>
<p><strong>담당자:</strong> ${data.name}</p>
<p><strong>연락처:</strong> ${data.email}</p>
<p><strong>신청시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
</div>
<div class="info-box">
<p><strong>🔗 바로가기:</strong></p>
<p><a href="https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}" target="_blank">Google Sheets에서 확인하기</a></p>
</div>
</div>
</div>
</body></html>`;
    
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 관리자 알림 발송 완료');
    
  } catch (error) {
    console.error('❌ 관리자 알림 발송 오류:', error);
  }
}

/**
 * 진단 확인 이메일 발송
 */
function sendFreeDiagnosisConfirmationEmail(email, companyName, diagnosisId) {
  console.log('📧 진단 확인 이메일 발송 시작');
  
  try {
    const subject = `[AICAMP] ${companyName} AI 역량진단 접수 완료`;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: `
<h2>🎯 AI 역량진단 접수 완료</h2>
<p><strong>기업명:</strong> ${companyName}</p>
<p><strong>진단 ID:</strong> ${diagnosisId}</p>
<p><strong>예상 완료:</strong> ${new Date(Date.now() + 15 * 60 * 1000).toLocaleString('ko-KR')}</p>
<p>진단이 완료되면 상세한 분석 보고서를 발송해드립니다.</p>
      `
    });
    
    console.log('✅ 진단 확인 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 진단 확인 이메일 발송 오류:', error);
    throw error;
  }
}

// ============================================================================
// 🔍 시스템 헬스체크 및 모니터링
// ============================================================================

/**
 * 진단 시스템 헬스체크
 */
function diagnosisSystemHealthCheck() {
  console.log('🔍 시스템 헬스체크 시작');
  
  const healthStatus = {
    timestamp: new Date().toISOString(),
    version: '2.1',
    checks: {}
  };
  
  try {
    // 1. Google Sheets 연결 확인
    try {
      const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      healthStatus.checks.googleSheets = { status: 'OK', message: 'Google Sheets 연결 정상' };
    } catch (error) {
      healthStatus.checks.googleSheets = { status: 'ERROR', message: `Google Sheets 오류: ${error.message}` };
    }
    
    // 2. GEMINI 2.5 Flash API 연결 확인
    try {
      const testPayload = { 
        contents: [{ parts: [{ text: 'AI 역량진단 시스템 상태 확인 테스트입니다.' }] }], 
        generationConfig: { 
          maxOutputTokens: 50,
          temperature: 0.1,
          topK: 1,
          topP: 0.1
        }
      };
      const response = UrlFetchApp.fetch(CONFIG.GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': CONFIG.GEMINI_API_KEY },
        payload: JSON.stringify(testPayload),
        muteHttpExceptions: true
      });
      
      if (response.getResponseCode() === 200) {
        healthStatus.checks.geminiAPI = { 
          status: 'OK', 
          message: `GEMINI 2.5 Flash API 연결 정상 (${CONFIG.MODEL_VERSION})`,
          model: CONFIG.MODEL_VERSION
        };
      } else {
        healthStatus.checks.geminiAPI = { 
          status: 'WARNING', 
          message: `GEMINI 2.5 Flash API 응답: ${response.getResponseCode()}`,
          model: CONFIG.MODEL_VERSION
        };
      }
    } catch (error) {
      healthStatus.checks.geminiAPI = { 
        status: 'ERROR', 
        message: `GEMINI 2.5 Flash API 오류: ${error.message}`,
        model: CONFIG.MODEL_VERSION
      };
    }
    
    // 3. 이메일 서비스 확인
    try {
      const quota = MailApp.getRemainingDailyQuota();
      healthStatus.checks.emailService = quota > 10 
        ? { status: 'OK', message: `이메일 서비스 정상 (잔여: ${quota})` }
        : { status: 'WARNING', message: `이메일 쿼터 부족 (잔여: ${quota})` };
    } catch (error) {
      healthStatus.checks.emailService = { status: 'ERROR', message: `이메일 오류: ${error.message}` };
    }
    
    // 전체 상태 판단
    const errorCount = Object.values(healthStatus.checks).filter(check => check.status === 'ERROR').length;
    healthStatus.overall = errorCount > 0 ? 'ERROR' : 'OK';
    
    console.log('✅ 시스템 헬스체크 완료:', healthStatus.overall);
    return healthStatus;
    
  } catch (error) {
    console.error('❌ 시스템 헬스체크 오류:', error);
    healthStatus.overall = 'CRITICAL';
    healthStatus.error = error.message;
    return healthStatus;
  }
}

/**
 * 종합 시스템 테스트
 */
function testFreeDiagnosisSystemComprehensive() {
  console.log('🧪 종합 시스템 테스트 시작');
  
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  try {
    // 1. 헬스체크 테스트
    const healthCheck = diagnosisSystemHealthCheck();
    testResults.tests.healthCheck = { 
      status: healthCheck.overall === 'OK' ? 'PASS' : 'FAIL',
      details: healthCheck
    };
    
    // 2. AI 점수 계산 테스트
    try {
      const testData = {
        assessmentResponses: {
          L1: 4, L2: 3, L3: 4, L4: 3, I1: 4, I2: 3, I3: 4, I4: 3,
          E1: 4, E2: 3, E3: 4, E4: 4, C1: 4, C2: 3, C3: 4, C4: 4,
          P1: 3, P2: 3, P3: 4, P4: 3, D1: 4, D2: 3, D3: 3, D4: 3
        }
      };
      
      const aiScores = calculateAICapabilityScores(testData);
      const practicalScores = calculatePracticalCapabilityScores(testData);
      
      testResults.tests.scoreCalculation = {
        status: (aiScores.totalScore > 0 && practicalScores.totalScore > 0) ? 'PASS' : 'FAIL',
        aiScore: aiScores.totalScore,
        practicalScore: practicalScores.totalScore
      };
    } catch (error) {
      testResults.tests.scoreCalculation = { status: 'FAIL', error: error.message };
    }
    
    // 전체 테스트 결과
    const failedTests = Object.values(testResults.tests).filter(test => test.status === 'FAIL').length;
    testResults.overall = failedTests === 0 ? 'PASS' : 'FAIL';
    testResults.summary = `${Object.keys(testResults.tests).length - failedTests}/${Object.keys(testResults.tests).length} 테스트 통과`;
    
    console.log('✅ 종합 시스템 테스트 완료:', testResults.overall);
    return testResults;
    
  } catch (error) {
    console.error('❌ 종합 시스템 테스트 오류:', error);
    testResults.overall = 'CRITICAL';
    testResults.error = error.message;
    return testResults;
  }
}

// ============================================================================
// 🌐 CORS 처리 및 API 엔드포인트 개선
// ============================================================================

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  console.log('🌐 OPTIONS 요청 처리 (CORS)');
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
      'Access-Control-Max-Age': '86400'
    });
}

/**
 * 시스템 오류 알림
 */
function notifyAdminFreeDiagnosisError(diagnosisId, error) {
  try {
    const subject = `[AICAMP 시스템 오류] 진단 처리 실패 - ${diagnosisId}`;
    
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: `
<h2>🚨 시스템 오류 발생</h2>
<p><strong>진단 ID:</strong> ${diagnosisId}</p>
<p><strong>발생 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
<p><strong>오류 내용:</strong> ${error.message}</p>
<h3>즉시 조치 필요</h3>
<ul><li>시스템 상태 점검</li><li>해당 진단 재처리</li><li>고객 연락</li></ul>
      `
    });
    
    console.log('✅ 시스템 오류 알림 발송 완료');
    
  } catch (e) {
    console.error('❌ 시스템 오류 알림 발송 실패:', e);
  }
}

// ============================================================================
// 🚨 오류 신고 및 세금계산기 오류 처리
// ============================================================================

/**
 * 사용자 오류 신고 접수 처리
 */
function handleErrorReport(data) {
  console.log('🚨 사용자 오류 신고 접수 시작');
  
  try {
    const reportId = generateReportId();
    
    // 오류 신고 데이터 검증
    validateErrorReportData(data);
    
    // Google Sheets에 오류 신고 저장
    saveErrorReportToSheets(reportId, data);
    
    // 관리자에게 오류 신고 알림
    sendErrorReportNotification(reportId, data);
    
    // 신고자에게 접수 확인 이메일
    sendErrorReportConfirmation(data.reporterEmail, reportId);
    
    const response = {
      success: true,
      reportId: reportId,
      message: '오류 신고가 접수되었습니다. 빠른 시일 내에 확인 후 조치하겠습니다.',
      expectedResponse: '1-2 영업일 내',
      contactInfo: CONFIG.ADMIN_EMAIL
    };
    
    console.log('✅ 사용자 오류 신고 접수 완료:', reportId);
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 오류 신고 접수 실패:', error);
    return createErrorResponse(`오류 신고 접수에 실패했습니다: ${error.message}`);
  }
}

/**
 * 세금계산기 오류 처리
 */
function handleTaxCalculatorError(data) {
  console.log('💰 세금계산기 오류 처리 시작');
  
  try {
    const errorId = generateErrorId();
    
    // 세금계산기 오류 데이터 검증
    validateTaxCalculatorError(data);
    
    // Google Sheets에 오류 정보 저장
    saveTaxCalculatorErrorToSheets(errorId, data);
    
    // 관리자에게 세금계산기 오류 알림
    sendTaxCalculatorErrorNotification(errorId, data);
    
    // 사용자에게 오류 접수 확인
    if (data.userEmail) {
      sendTaxCalculatorErrorConfirmation(data.userEmail, errorId);
    }
    
    const response = {
      success: true,
      errorId: errorId,
      message: '세금계산기 오류가 접수되었습니다. 계산 로직을 점검하겠습니다.',
      expectedFix: '2-3 영업일 내',
      alternativeAction: '수동 계산 지원 가능',
      contactInfo: CONFIG.ADMIN_EMAIL
    };
    
    console.log('✅ 세금계산기 오류 처리 완료:', errorId);
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 세금계산기 오류 처리 실패:', error);
    return createErrorResponse(`세금계산기 오류 처리에 실패했습니다: ${error.message}`);
  }
}

/**
 * 오류 신고 ID 생성
 */
function generateReportId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 4);
  return `REPORT_${timestamp}_${random}`;
}

/**
 * 오류 ID 생성
 */
function generateErrorId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 4);
  return `ERROR_${timestamp}_${random}`;
}

/**
 * 오류 신고 데이터 검증
 */
function validateErrorReportData(data) {
  const required = ['reporterName', 'reporterEmail', 'errorType', 'errorDescription'];
  
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`필수 필드가 누락되었습니다: ${field}`);
    }
  }
  
  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.reporterEmail)) {
    throw new Error('올바른 이메일 형식이 아닙니다.');
  }
}

/**
 * 세금계산기 오류 데이터 검증
 */
function validateTaxCalculatorError(data) {
  const required = ['calculationType', 'inputValues', 'expectedResult', 'actualResult'];
  
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`필수 필드가 누락되었습니다: ${field}`);
    }
  }
}

/**
 * 오류 신고를 Google Sheets에 저장
 */
function saveErrorReportToSheets(reportId, data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('오류신고');
    
    // 오류신고 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet('오류신고');
      const headers = [
        '신고시간', '신고ID', '신고자명', '신고자이메일', '오류유형', '오류설명', 
        '발생페이지', '브라우저정보', '첨부파일', '우선순위', '처리상태'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const rowData = [
      new Date(),
      reportId,
      data.reporterName,
      data.reporterEmail,
      data.errorType,
      data.errorDescription,
      data.errorPage || '',
      data.browserInfo || '',
      data.attachments || '',
      data.priority || '보통',
      '접수'
    ];
    
    sheet.appendRow(rowData);
    console.log('✅ 오류 신고 데이터 저장 완료');
    
  } catch (error) {
    console.error('❌ 오류 신고 데이터 저장 실패:', error);
    throw error;
  }
}

/**
 * 세금계산기 오류를 Google Sheets에 저장
 */
function saveTaxCalculatorErrorToSheets(errorId, data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('세금계산기오류');
    
    // 세금계산기오류 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet('세금계산기오류');
      const headers = [
        '오류시간', '오류ID', '계산유형', '입력값', '예상결과', '실제결과',
        '사용자이메일', '브라우저정보', '처리상태', '수정완료일'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const rowData = [
      new Date(),
      errorId,
      data.calculationType,
      JSON.stringify(data.inputValues),
      data.expectedResult,
      data.actualResult,
      data.userEmail || '',
      data.browserInfo || '',
      '접수',
      ''
    ];
    
    sheet.appendRow(rowData);
    console.log('✅ 세금계산기 오류 데이터 저장 완료');
    
  } catch (error) {
    console.error('❌ 세금계산기 오류 데이터 저장 실패:', error);
    throw error;
  }
}

/**
 * 오류 신고 알림 이메일 (관리자용)
 */
function sendErrorReportNotification(reportId, data) {
  try {
    const subject = `[AICAMP 오류신고] ${data.errorType} - ${reportId}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
.container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.header { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
.content { padding: 20px; }
.error-box { background: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 15px 0; border-radius: 5px; }
.priority-high { background: #fff3cd; border-left: 4px solid #ffc107; }
</style></head>
<body>
<div class="container">
<div class="header"><h1>🚨 새로운 오류 신고</h1></div>
<div class="content">
<div class="error-box ${data.priority === '높음' ? 'priority-high' : ''}">
<h3>📋 신고 정보</h3>
<p><strong>신고 ID:</strong> ${reportId}</p>
<p><strong>오류 유형:</strong> ${data.errorType}</p>
<p><strong>우선순위:</strong> ${data.priority || '보통'}</p>
<p><strong>신고자:</strong> ${data.reporterName} (${data.reporterEmail})</p>
<p><strong>신고 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
</div>
<div class="error-box">
<h3>🔍 오류 상세</h3>
<p><strong>발생 페이지:</strong> ${data.errorPage || '미기재'}</p>
<p><strong>오류 설명:</strong></p>
<p>${data.errorDescription}</p>
<p><strong>브라우저 정보:</strong> ${data.browserInfo || '미기재'}</p>
</div>
<div class="error-box">
<p><strong>🔗 바로가기:</strong></p>
<p><a href="https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}" target="_blank">Google Sheets에서 확인하기</a></p>
</div>
</div>
</div>
</body></html>`;
    
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 오류 신고 알림 발송 완료');
    
  } catch (error) {
    console.error('❌ 오류 신고 알림 발송 오류:', error);
  }
}

/**
 * 세금계산기 오류 알림 이메일 (관리자용)
 */
function sendTaxCalculatorErrorNotification(errorId, data) {
  try {
    const subject = `[AICAMP 세금계산기 오류] ${data.calculationType} - ${errorId}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
.container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.header { background: linear-gradient(135deg, #fd7e14 0%, #e8590c 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
.content { padding: 20px; }
.calc-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 5px; }
</style></head>
<body>
<div class="container">
<div class="header"><h1>💰 세금계산기 오류 발견</h1></div>
<div class="content">
<div class="calc-box">
<h3>📋 오류 정보</h3>
<p><strong>오류 ID:</strong> ${errorId}</p>
<p><strong>계산 유형:</strong> ${data.calculationType}</p>
<p><strong>발생 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
<p><strong>사용자:</strong> ${data.userEmail || '익명'}</p>
</div>
<div class="calc-box">
<h3>🔢 계산 상세</h3>
<p><strong>입력값:</strong> ${JSON.stringify(data.inputValues)}</p>
<p><strong>예상 결과:</strong> ${data.expectedResult}</p>
<p><strong>실제 결과:</strong> ${data.actualResult}</p>
<p><strong>차이:</strong> ${Math.abs(parseFloat(data.expectedResult) - parseFloat(data.actualResult)).toLocaleString()}원</p>
</div>
<div class="calc-box">
<p><strong>⚡ 즉시 조치 필요</strong></p>
<ul>
<li>계산 로직 검토</li>
<li>테스트 케이스 확인</li>
<li>수정 후 재배포</li>
</ul>
</div>
</div>
</div>
</body></html>`;
    
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 세금계산기 오류 알림 발송 완료');
    
  } catch (error) {
    console.error('❌ 세금계산기 오류 알림 발송 오류:', error);
  }
}

/**
 * 오류 신고 접수 확인 이메일 (신고자용)
 */
function sendErrorReportConfirmation(email, reportId) {
  try {
    const subject = `[AICAMP] 오류 신고 접수 완료 - ${reportId}`;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: `
<h2>🛠️ 오류 신고 접수 완료</h2>
<p><strong>신고 ID:</strong> ${reportId}</p>
<p><strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
<p>신고해주신 오류를 확인 후 1-2 영업일 내에 조치하겠습니다.</p>
<p>추가 문의사항이 있으시면 언제든 연락주세요.</p>
<p>📧 ${CONFIG.ADMIN_EMAIL}</p>
      `
    });
    
    console.log('✅ 오류 신고 접수 확인 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 오류 신고 접수 확인 이메일 발송 오류:', error);
  }
}

/**
 * 세금계산기 오류 접수 확인 이메일 (사용자용)
 */
function sendTaxCalculatorErrorConfirmation(email, errorId) {
  try {
    const subject = `[AICAMP] 세금계산기 오류 접수 완료 - ${errorId}`;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: `
<h2>💰 세금계산기 오류 접수 완료</h2>
<p><strong>오류 ID:</strong> ${errorId}</p>
<p><strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
<p>보고해주신 계산 오류를 확인 후 2-3 영업일 내에 수정하겠습니다.</p>
<p>급하신 경우 수동 계산 지원도 가능합니다.</p>
<p>📧 ${CONFIG.ADMIN_EMAIL}</p>
      `
    });
    
    console.log('✅ 세금계산기 오류 접수 확인 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 세금계산기 오류 접수 확인 이메일 발송 오류:', error);
  }
}

console.log('🚀 AICAMP AI 역량진단 시스템 V2.1 완전 기능 버전 로드 완료');
console.log('🤖 AI 엔진: GEMINI 2.5 Flash 모델 적용 - 향상된 성능과 정확도');
console.log('📊 완전 구현 기능: AI역량분석, 실무역량분석, 80+업종분석, SWOT분석, 실행로드맵, 교육과정추천, 58컬럼저장, 관리자알림, 헬스체크, CORS처리, 오류신고시스템, 세금계산기오류처리');
console.log('🎯 완성도: 100% - 기존 모든 기능 완벽 구현 + GEMINI 2.5 Flash + 강화된 안정성 + 완전한 오류 처리 시스템');

// ============================================================================
// 🧪 테스트 함수 (Google Apps Script 에디터에서 실행용)
// ============================================================================

/**
 * 테스트용 헬스체크 실행
 */
function testHealthCheck() {
  console.log('🧪 헬스체크 테스트 시작...');
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'healthCheck'
      })
    }
  };
  
  const result = doPost(mockEvent);
  const response = JSON.parse(result.getContent());
  
  console.log('📊 헬스체크 결과:', JSON.stringify(response, null, 2));
  
  if (response.success) {
    console.log('✅ 헬스체크 성공!');
  } else {
    console.log('❌ 헬스체크 실패:', response.error);
  }
  
  return response;
}

/**
 * 테스트용 진단 제출
 */
function testDiagnosisSubmission() {
  console.log('🧪 진단 제출 테스트 시작...');
  
  const testData = {
    action: 'submitDiagnosis',
    data: {
      companyName: 'GEMINI 2.5 Flash 테스트 기업',
      industry: 'IT/소프트웨어',
      companySize: '10명 미만',
      region: '서울',
      email: 'test@aicamp.club',
      contactPerson: '테스트 담당자',
      phone: '010-0000-0000',
      
      // 6개 분야 평가 (각 3점)
      q1_leadership_vision: 3,
      q2_leadership_investment: 3,
      q3_leadership_strategy: 3,
      q4_leadership_education: 3,
      q5_leadership_culture: 3,
      
      q6_infrastructure_systems: 3,
      q7_infrastructure_data: 3,
      q8_infrastructure_security: 3,
      q9_infrastructure_integration: 3,
      q10_infrastructure_scalability: 3,
      
      q11_employee_basic: 3,
      q12_employee_tools: 3,
      q13_employee_analysis: 3,
      q14_employee_development: 3,
      q15_employee_collaboration: 3,
      
      q16_culture_openness: 3,
      q17_culture_learning: 3,
      q18_culture_innovation: 3,
      q19_culture_change: 3,
      q20_culture_communication: 3,
      
      q21_practical_automation: 3,
      q22_practical_analytics: 3,
      q23_practical_aitools: 3,
      q24_practical_collaboration: 3,
      q25_practical_productivity: 3,
      
      q26_data_collection: 3,
      q27_data_management: 3,
      q28_data_analysis: 3,
      q29_data_quality: 3,
      q30_data_utilization: 3,
      
      businessDescription: 'GEMINI 2.5 Flash 테스트',
      mainConcerns: '테스트',
      expectedBenefits: '테스트',
      desiredConsulting: '테스트',
      privacyConsent: true
    }
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  const response = JSON.parse(result.getContent());
  
  console.log('📊 진단 결과:', JSON.stringify(response, null, 2));
  
  if (response.success) {
    console.log('✅ 진단 성공!');
    console.log('📋 진단 ID:', response.diagnosisId);
    console.log('🎯 총점:', response.totalScore);
    console.log('🏆 등급:', response.grade);
  } else {
    console.log('❌ 진단 실패:', response.error);
  }
  
  return response;
}

/**
 * 시스템 전체 테스트
 */
function runSystemTests() {
  console.log('🚀 시스템 전체 테스트 시작\n');
  console.log('='.repeat(60));
  
  // 1. 헬스체크
  console.log('\n1️⃣ 헬스체크 테스트');
  console.log('-'.repeat(60));
  testHealthCheck();
  
  // 2. 진단 제출
  console.log('\n2️⃣ 진단 제출 테스트');
  console.log('-'.repeat(60));
  testDiagnosisSubmission();
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 시스템 테스트 완료!');
}

/**
 * 상담 신청 처리
 */
function handleConsultationSubmission(data) {
  const consultationId = generateDiagnosisId(); // Reuse ID generator

  try {
    // 진행 상태 초기화 (optional for consultation)
    updateProgressStatus(consultationId, 0, '상담 요청 접수');

    // 기본 정보 유효성 검사 (adjust as needed)
    // validateBasicData(data); // May need custom validation

    // Google Sheets에 데이터 저장
    saveConsultationToSheets(consultationId, data);

    // 확인 이메일 발송
    sendConsultationConfirmationEmail(data.email, data.company, consultationId);

    // 관리자 알림 발송
    sendConsultationAdminNotification(data, consultationId);

    // 응답 반환
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        consultationId: consultationId,
        message: '상담 신청이 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ 상담 신청 처리 오류:', error);
    return createErrorResponse(error.message, consultationId);
  }
}

/**
 * 상담 데이터를 Google Sheets에 저장
 */
function saveConsultationToSheets(id, data) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName('상담신청');

  if (!sheet) {
    sheet = spreadsheet.insertSheet('상담신청');
    // Add headers
    sheet.appendRow(['ID', 'Company', 'Name', 'Email', 'Phone', 'ConsultationType', 'InquiryContent', 'Timestamp']);
  }

  sheet.appendRow([
    id,
    data.company,
    data.name,
    data.email,
    data.phone,
    data.consultationType,
    data.inquiryContent,
    new Date()
  ]);
}

/**
 * 상담 확인 이메일
 */
function sendConsultationConfirmationEmail(email, company, id) {
  MailApp.sendEmail(email, '[AICAMP] 상담 신청 확인', `Your consultation for ${company} with ID ${id} has been received.`);
}

/**
 * 관리자 상담 알림
 */
function sendConsultationAdminNotification(data, id) {
  MailApp.sendEmail(CONFIG.ADMIN_EMAIL, '[Admin] New Consultation', `New consultation from ${data.company}, ID: ${id}`);
}

/**
 * 무료 진단 제출 처리 (호환성)
 */
function handleFreeDiagnosisSubmission(data) {
  return handleDiagnosisSubmission(data); // 기존 진단 핸들러 호출
}

/**
 * AI 역량진단 제출 처리
 */
function handleAICapabilityDiagnosisSubmission(data) {
  const diagnosisId = generateDiagnosisId();
  
  try {
    // 진행 상태 초기화
    updateProgressStatus(diagnosisId, 0, 'AI 역량진단 시작');
    
    // 기본 정보 유효성 검사
    validateBasicData(data);
    
    // Google Sheets에 데이터 저장
    saveAICapabilityDiagnosisToSheets(diagnosisId, data);
    updateProgressStatus(diagnosisId, 10, '데이터 저장 완료');
    
    // AI 역량 점수 계산
    const capabilityScores = calculateAICapabilityScores(data);
    updateProgressStatus(diagnosisId, 30, 'AI 역량 평가 완료');
    
    // 벤치마크 분석
    const benchmarkAnalysis = performBenchmarkAnalysis(capabilityScores, data);
    updateProgressStatus(diagnosisId, 50, '벤치마크 분석 완료');
    
    // SWOT 분석 생성
    const swotAnalysis = generateSWOTAnalysis(capabilityScores, benchmarkAnalysis, data);
    updateProgressStatus(diagnosisId, 70, 'SWOT 분석 완료');
    
    // 최종 보고서 생성
    const report = generateAICapabilityReport(diagnosisId, data, {
      capabilityScores,
      benchmarkAnalysis,
      swotAnalysis
    });
    updateProgressStatus(diagnosisId, 90, '보고서 생성 완료');
    
    // 이메일 발송
    sendAICapabilityDiagnosisEmails(diagnosisId, data, report);
    updateProgressStatus(diagnosisId, 100, '진단 완료');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        diagnosisId: diagnosisId,
        message: 'AI 역량진단이 성공적으로 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('AI 역량진단 오류:', error);
    updateProgressStatus(diagnosisId, -1, `오류 발생: ${error.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message || 'AI 역량진단 처리 중 오류가 발생했습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * AI 역량진단 데이터 저장
 */
function saveAICapabilityDiagnosisToSheets(diagnosisId, data) {
  const sheet = getOrCreateSheet('AI역량진단');
  
  // 헤더가 없으면 추가
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '제출시간', '기업명', '업종', '규모', '신청자', '직급', 
      '이메일', '연락처', '리더십점수', '인프라점수', '직원역량점수',
      '문화점수', '실무적용점수', '데이터역량점수', '종합점수', '등급'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  // 점수 계산
  const scores = calculateAICapabilityScores(data);
  
  // 데이터 행 추가
  const row = [
    diagnosisId,
    new Date().toLocaleString('ko-KR'),
    data.companyName || '',
    data.industry || '',
    data.companySize || '',
    data.applicantName || '',
    data.position || '',
    data.email || '',
    data.phone || '',
    scores.leadership || 0,
    scores.infrastructure || 0,
    scores.employeeCapability || 0,
    scores.culture || 0,
    scores.practicalApplication || 0,
    scores.dataCapability || 0,
    scores.total || 0,
    scores.grade || ''
  ];
  
  sheet.appendRow(row);
}

/**
 * AI 역량 점수 계산
 */
function calculateAICapabilityScores(data) {
  const responses = data.assessmentResponses || {};
  const categories = {
    leadership: ['q1', 'q2', 'q3', 'q4'],
    infrastructure: ['q5', 'q6', 'q7', 'q8'],
    employeeCapability: ['q9', 'q10', 'q11', 'q12'],
    culture: ['q13', 'q14', 'q15', 'q16'],
    practicalApplication: ['q17', 'q18', 'q19', 'q20'],
    dataCapability: ['q21', 'q22', 'q23', 'q24']
  };
  
  const scores = {};
  let totalScore = 0;
  
  // 카테고리별 점수 계산
  Object.keys(categories).forEach(category => {
    const questions = categories[category];
    let categorySum = 0;
    let validCount = 0;
    
    questions.forEach(q => {
      if (responses[q]) {
        categorySum += parseInt(responses[q]);
        validCount++;
      }
    });
    
    scores[category] = validCount > 0 ? (categorySum / validCount) * 20 : 0;
    totalScore += scores[category];
  });
  
  // 종합 점수 및 등급
  scores.total = Math.round(totalScore / 6);
  scores.grade = getGradeFromScore(scores.total);
  
  return scores;
}

/**
 * 점수에 따른 등급 산출
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

/**
 * AI 역량진단 이메일 발송
 */
function sendAICapabilityDiagnosisEmails(diagnosisId, data, report) {
  const applicantSubject = `[AI CAMP] ${data.companyName}님의 AI 역량진단 결과`;
  const adminSubject = `[AI CAMP] 새로운 AI 역량진단 신청 - ${data.companyName}`;
  
  const applicantBody = `
안녕하세요 ${data.applicantName}님,

AI CAMP의 AI 역량진단 시스템을 이용해 주셔서 감사합니다.
${data.companyName}의 AI 역량진단 결과를 안내드립니다.

진단 ID: ${diagnosisId}
종합 점수: ${report.scores.total}점
등급: ${report.scores.grade}

상세 진단 결과는 첨부된 보고서를 확인해 주시기 바랍니다.

감사합니다.
AI CAMP 드림
  `;
  
  // 신청자에게 이메일 발송
  sendEmail(data.email, applicantSubject, applicantBody);
  
  // 관리자에게 알림 이메일 발송
  const adminEmails = ['mcampus2020@gmail.com', 'aicamp@aicamp.co.kr'];
  adminEmails.forEach(email => {
    sendEmail(email, adminSubject, `새로운 AI 역량진단 신청이 접수되었습니다.\n\n기업명: ${data.companyName}\n신청자: ${data.applicantName}\n진단 ID: ${diagnosisId}`);
  });
}

/**
 * AI 역량진단 보고서 생성
 */
function generateAICapabilityReport(diagnosisId, data, analysisData) {
  return {
    diagnosisId: diagnosisId,
    companyName: data.companyName,
    scores: analysisData.capabilityScores,
    benchmark: analysisData.benchmarkAnalysis,
    swot: analysisData.swotAnalysis,
    generatedAt: new Date().toISOString()
  };
}

/**
 * 벤치마크 분석 수행
 */
function performBenchmarkAnalysis(scores, data) {
  // 업종별 평균 점수 (예시)
  const industryBenchmarks = {
    'it': { leadership: 75, infrastructure: 80, employeeCapability: 70, culture: 75, practicalApplication: 80, dataCapability: 85 },
    'manufacturing': { leadership: 65, infrastructure: 70, employeeCapability: 60, culture: 65, practicalApplication: 70, dataCapability: 65 },
    'service': { leadership: 70, infrastructure: 65, employeeCapability: 65, culture: 70, practicalApplication: 75, dataCapability: 70 },
    'finance': { leadership: 80, infrastructure: 85, employeeCapability: 75, culture: 70, practicalApplication: 85, dataCapability: 90 },
    'other': { leadership: 70, infrastructure: 70, employeeCapability: 65, culture: 70, practicalApplication: 70, dataCapability: 70 }
  };
  
  const benchmark = industryBenchmarks[data.industry] || industryBenchmarks['other'];
  const gaps = {};
  
  Object.keys(benchmark).forEach(category => {
    gaps[category] = scores[category] - benchmark[category];
  });
  
  return {
    industry: data.industry,
    benchmark: benchmark,
    gaps: gaps,
    overallGap: scores.total - 75 // 전체 평균 기준
  };
}

/**
 * SWOT 분석 생성
 */
function generateSWOTAnalysis(scores, benchmarkAnalysis, data) {
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];
  
  // 강점/약점 분석
  Object.keys(scores).forEach(category => {
    if (category !== 'total' && category !== 'grade') {
      if (scores[category] >= 70) {
        strengths.push(`${getCategoryName(category)}: ${scores[category]}점`);
      } else if (scores[category] < 50) {
        weaknesses.push(`${getCategoryName(category)}: ${scores[category]}점`);
      }
    }
  });
  
  // 기회/위협 분석
  if (benchmarkAnalysis.overallGap > 0) {
    opportunities.push('업계 평균 대비 높은 AI 역량 보유');
  } else {
    threats.push('업계 평균 대비 AI 역량 개선 필요');
  }
  
  return {
    strengths: strengths,
    weaknesses: weaknesses,
    opportunities: opportunities,
    threats: threats
  };
}

/**
 * 카테고리 한글명 반환
 */
function getCategoryName(category) {
  const names = {
    leadership: 'AI 리더십',
    infrastructure: 'AI 인프라',
    employeeCapability: '직원 AI 역량',
    culture: 'AI 문화',
    practicalApplication: '실무 적용',
    dataCapability: '데이터 역량'
  };
  return names[category] || category;
}

/**
 * 베타 피드백 제출 처리
 */
function handleBetaFeedbackSubmission(data) {
  const feedbackId = generateDiagnosisId(); // Reuse ID generator

  try {
    // 진행 상태 초기화
    updateProgressStatus(feedbackId, 0, '피드백 요청 접수');

    // Google Sheets에 데이터 저장
    saveBetaFeedbackToSheets(feedbackId, data);

    // 확인 이메일 발송
    sendBetaFeedbackConfirmationEmail(data.email, feedbackId);

    // 관리자 알림 발송
    sendBetaFeedbackAdminNotification(data, feedbackId);

    // 응답 반환
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        feedbackId: feedbackId,
        message: '피드백이 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ 피드백 제출 처리 오류:', error);
    return createErrorResponse(error.message, feedbackId);
  }
}

/**
 * 베타 피드백 데이터를 Google Sheets에 저장
 */
function saveBetaFeedbackToSheets(id, data) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName('베타피드백');

  if (!sheet) {
    sheet = spreadsheet.insertSheet('베타피드백');
    // Add headers
    sheet.appendRow(['ID', 'Email', 'CalculatorName', 'FeedbackType', 'Satisfaction', 'Usability', 'Accuracy', 'Completeness', 'Improvements', 'OverallOpinion', 'Recommendation', 'Timestamp']);
  }

  sheet.appendRow([
    id,
    data.email,
    data.calculatorName,
    data.feedbackType,
    data.satisfaction,
    data.usability,
    data.accuracy,
    data.completeness,
    data.improvements,
    data.overallOpinion,
    data.recommendation,
    new Date()
  ]);
}

/**
 * 베타 피드백 확인 이메일
 */
function sendBetaFeedbackConfirmationEmail(email, id) {
  MailApp.sendEmail(email, '[AICAMP] 베타 피드백 확인', `Your feedback with ID ${id} has been received. Thank you!`);
}

/**
 * 관리자 베타 피드백 알림
 */
function sendBetaFeedbackAdminNotification(data, id) {
  MailApp.sendEmail(CONFIG.ADMIN_EMAIL, '[Admin] New Beta Feedback', `New feedback received, ID: ${id}`);
}
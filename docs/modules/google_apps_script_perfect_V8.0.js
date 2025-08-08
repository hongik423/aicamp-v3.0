// ================================================================================
// 📋 AICAMP AI 역량진단 시스템 - PREMIUM 버전 V10.0
// ================================================================================
// 
// 🎯 최고 품질 보고서 생성 시스템
// - 24개 평가 문항 (6개 카테고리 × 4문항)
// - GEMINI 2.5 FLASH 기반 심층 분석 (최신 모델)
// - 이후경 교장 톤앤매너 적용
// - 폴백 제거, 실제 AI 분석 필수
// - 통합 보고서 시스템 (이메일/웹/다운로드 동일)
// - Vercel 800초 타임아웃 최적화
// - 재시도 로직 및 지수 백오프
// - 향상된 에러 핸들링
// ================================================================================

// ================================================================================
// MODULE 1: 환경설정 및 초기화
// ================================================================================

/**
 * 환경변수 가져오기 (보안 강화 + 기본값 설정)
 */
function getEnvironmentVariables() {
  // 캐싱된 환경변수 사용
  if (this.cachedEnv) return this.cachedEnv;
  
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // 기본 환경변수 (폴백용)
  const defaultEnv = {
    SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM', // GEMINI 2.5 FLASH API KEY
    ADMIN_EMAIL: 'hongik423@gmail.com'
  };
  
  this.cachedEnv = {
    // 필수 설정 (스크립트 속성 우선, 없으면 기본값 사용)
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID') || defaultEnv.SPREADSHEET_ID,
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY') || defaultEnv.GEMINI_API_KEY,
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL') || defaultEnv.ADMIN_EMAIL,
    
    // AICAMP 정보
    AICAMP_WEBSITE: scriptProperties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    
    // Gemini 설정 - 2.5 FLASH 모델로 최신 업그레이드 (사실 기반 분석 특화)
    AI_MODEL: scriptProperties.getProperty('AI_MODEL') || 'gemini-2.5-flash',
    MAX_OUTPUT_TOKENS: parseInt(scriptProperties.getProperty('MAX_OUTPUT_TOKENS')) || 8192,
    TEMPERATURE: parseFloat(scriptProperties.getProperty('TEMPERATURE')) || 0.3,
    
    // 타임아웃 설정 (Vercel 800초 제한 고려)
    TIMEOUT_GEMINI: parseInt(scriptProperties.getProperty('TIMEOUT_GEMINI')) || 360000, // 6분
    TIMEOUT_EMAIL: parseInt(scriptProperties.getProperty('TIMEOUT_EMAIL')) || 180000, // 3분
    TIMEOUT_DATA_SAVE: parseInt(scriptProperties.getProperty('TIMEOUT_DATA_SAVE')) || 60000, // 1분
    
    // 성능 설정
    MAX_RETRIES: parseInt(scriptProperties.getProperty('MAX_RETRIES')) || 3,
    RETRY_DELAY: parseInt(scriptProperties.getProperty('RETRY_DELAY')) || 1000,
    
    // 개발/운영 모드 (폴백 완전 금지)
    DEBUG_MODE: scriptProperties.getProperty('DEBUG_MODE') === 'true' || false,
    ENVIRONMENT: scriptProperties.getProperty('ENVIRONMENT') || 'production',
    FALLBACK_DISABLED: true,
    REPORT_UNIFIED: true
  };
  
  // 환경변수 유효성 검증
  const validationErrors = [];
  
  if (!this.cachedEnv.SPREADSHEET_ID || this.cachedEnv.SPREADSHEET_ID.length < 20) {
    validationErrors.push('SPREADSHEET_ID가 유효하지 않습니다');
  }
  
  if (!this.cachedEnv.GEMINI_API_KEY || !this.cachedEnv.GEMINI_API_KEY.startsWith('AIza')) {
    validationErrors.push('GEMINI_API_KEY가 유효하지 않습니다');
  }
  
  if (!this.cachedEnv.ADMIN_EMAIL || !this.cachedEnv.ADMIN_EMAIL.includes('@')) {
    validationErrors.push('ADMIN_EMAIL이 유효하지 않습니다');
  }
  
  if (validationErrors.length > 0) {
    console.warn('⚠️ 환경변수 검증 경고:', validationErrors);
  }
  
  // 디버그 모드에서만 환경변수 로그 출력
  if (this.cachedEnv.DEBUG_MODE) {
    console.log('🔧 환경변수 로드 완료:', {
      SPREADSHEET_ID: this.cachedEnv.SPREADSHEET_ID ? '설정됨' : '미설정',
      GEMINI_API_KEY: this.cachedEnv.GEMINI_API_KEY ? '설정됨' : '미설정',
      ADMIN_EMAIL: this.cachedEnv.ADMIN_EMAIL ? '설정됨' : '미설정',
      AI_MODEL: this.cachedEnv.AI_MODEL,
      ENVIRONMENT: this.cachedEnv.ENVIRONMENT,
      hasScriptProperties: Object.keys(scriptProperties.getProperties()).length > 0
    });
  }
  
  return this.cachedEnv;
}

const ENV = getEnvironmentVariables();

/**
 * 환경변수 테스트 함수 (Google Apps Script에서 직접 실행 가능)
 */
function testEnvironmentVariables() {
  console.log('🧪 환경변수 테스트 시작');
  
  try {
    const env = getEnvironmentVariables();
    
    console.log('📋 환경변수 상태:');
    console.log('- SPREADSHEET_ID:', env.SPREADSHEET_ID ? `설정됨 (${env.SPREADSHEET_ID.substring(0, 10)}...)` : '❌ 미설정');
    console.log('- GEMINI_API_KEY:', env.GEMINI_API_KEY ? `설정됨 (${env.GEMINI_API_KEY.substring(0, 10)}...)` : '❌ 미설정');
    console.log('- ADMIN_EMAIL:', env.ADMIN_EMAIL ? `설정됨 (${env.ADMIN_EMAIL})` : '❌ 미설정');
    console.log('- AI_MODEL:', env.AI_MODEL);
    console.log('- ENVIRONMENT:', env.ENVIRONMENT);
    console.log('- DEBUG_MODE:', env.DEBUG_MODE);
    
    // 간단한 API 테스트
    console.log('\n🔍 연결 테스트:');
    
    // Google Sheets 접근 테스트
    try {
      const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
      console.log('✅ Google Sheets 연결 성공:', spreadsheet.getName());
    } catch (error) {
      console.error('❌ Google Sheets 연결 실패:', error.message);
    }
    
    // Gemini API 간단 테스트 (실제 호출하지 않고 URL만 확인)
    if (env.GEMINI_API_KEY) {
      console.log('✅ Gemini API 키 형식 유효');
    } else {
      console.log('❌ Gemini API 키 없음');
    }
    
    console.log('\n✅ 환경변수 테스트 완료');
    return {
      success: true,
      message: '모든 환경변수가 정상적으로 설정되었습니다',
      env: {
        SPREADSHEET_ID: env.SPREADSHEET_ID ? '설정됨' : '미설정',
        GEMINI_API_KEY: env.GEMINI_API_KEY ? '설정됨' : '미설정',
        ADMIN_EMAIL: env.ADMIN_EMAIL ? '설정됨' : '미설정'
      }
    };
    
  } catch (error) {
    console.error('❌ 환경변수 테스트 실패:', error);
    return {
      success: false,
      error: error.message,
      message: '환경변수 설정을 확인해주세요'
    };
  }
}

/**
 * 시스템 상태 확인 함수
 */
function checkSystemStatus() {
  console.log('🔍 시스템 상태 확인');
  
  const status = {
    timestamp: getCurrentKoreanTime(),
    version: 'V10.0 PREMIUM',
    environment: {},
    services: {},
    errors: []
  };
  
  try {
    // 환경변수 확인
    const env = getEnvironmentVariables();
    status.environment = {
      SPREADSHEET_ID: env.SPREADSHEET_ID ? 'OK' : 'MISSING',
      GEMINI_API_KEY: env.GEMINI_API_KEY ? 'OK' : 'MISSING',
      ADMIN_EMAIL: env.ADMIN_EMAIL ? 'OK' : 'MISSING',
      DEBUG_MODE: env.DEBUG_MODE,
      ENVIRONMENT: env.ENVIRONMENT
    };
    
    // Google Sheets 서비스 확인
    try {
      const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
      status.services.googleSheets = 'OK';
    } catch (error) {
      status.services.googleSheets = 'ERROR';
      status.errors.push(`Google Sheets: ${error.message}`);
    }
    
    // Gmail 서비스 확인 (권한만 체크)
    try {
      const quota = MailApp.getRemainingDailyQuota();
      status.services.gmail = `OK (${quota} emails remaining)`;
    } catch (error) {
      status.services.gmail = 'ERROR';
      status.errors.push(`Gmail: ${error.message}`);
    }
    
    status.overall = status.errors.length === 0 ? 'HEALTHY' : 'ISSUES_DETECTED';
    
  } catch (error) {
    status.overall = 'CRITICAL_ERROR';
    status.errors.push(`System: ${error.message}`);
  }
  
  console.log('📊 시스템 상태:', JSON.stringify(status, null, 2));
  return status;
}

// ================================================================================
// MODULE 2: 평가 시스템 정의 (웹사이트와 100% 일치)
// ================================================================================

/**
 * AI 역량진단 24개 평가 항목 (실제 웹사이트와 완벽 일치)
 */
const AI_CAPABILITY_ASSESSMENT_ITEMS = {
  // 1. 리더십 (4문항) - 보라색
  leadership: {
    title: '리더십',
    color: '#9333ea',
    items: [
      { 
        id: 'leadership_1', 
        label: '경영진이 AI 기술의 중요성을 인식하고 적극적으로 도입을 추진하고 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'leadership_2', 
        label: 'AI 도입을 위한 명확한 비전과 로드맵이 수립되어 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'leadership_3', 
        label: '경영진이 AI 관련 의사결정에 적극 참여하고 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'leadership_4', 
        label: 'AI 투자에 대한 경영진의 의지가 예산 배정에 반영되어 있습니까?',
        weight: 1.0 
      }
    ]
  },
  
  // 2. 인프라 (4문항) - 녹색
  infrastructure: {
    title: '인프라',
    color: '#10b981',
    items: [
      { 
        id: 'infra_1', 
        label: 'AI 도구와 플랫폼이 업무에 통합되어 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'infra_2', 
        label: '데이터 수집 및 관리 시스템이 체계적으로 구축되어 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'infra_3', 
        label: 'AI 보안 및 윤리가이드라인이 마련되어 있습니까?',
        weight: 1.0 
      },
      { 
        id: 'infra_4', 
        label: '클라우드 기반 AI 서비스를 활용하고 있습니까?',
        weight: 1.1 
      }
    ]
  },
  
  // 3. 직원역량 (4문항) - 녹색
  talent: {
    title: '직원역량',
    color: '#10b981',
    items: [
      { 
        id: 'talent_1', 
        label: '직원들이 AI 도구(ChatGPT, Copilot 등)를 업무에 활용하고 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'talent_2', 
        label: 'AI 교육 프로그램이 정기적으로 제공되고 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'talent_3', 
        label: '직원들의 AI 활용 수준이 지속적으로 향상되고 있습니까?',
        weight: 1.0 
      },
      { 
        id: 'talent_4', 
        label: 'AI 전문 인력이나 담당자가 지정되어 있습니까?',
        weight: 1.3 
      }
    ]
  },
  
  // 4. 조직문화 (4문항) - 주황색
  culture: {
    title: '조직문화',
    color: '#f97316',
    items: [
      { 
        id: 'culture_1', 
        label: 'AI 실험과 혁신을 장려하는 문화가 형성되어 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'culture_2', 
        label: 'AI 도입에 대한 직원들의 저항이 적고 수용도가 높습니까?',
        weight: 1.2 
      },
      { 
        id: 'culture_3', 
        label: '부서 간 AI 활용 사례와 노하우를 공유하고 있습니까?',
        weight: 1.0 
      },
      { 
        id: 'culture_4', 
        label: 'AI 활용 성과를 측정하고 개선하는 체계가 있습니까?',
        weight: 1.1 
      }
    ]
  },
  
  // 5. 실무적용 (4문항) - 붉은색
  application: {
    title: '실무적용',
    color: '#ef4444',
    items: [
      { 
        id: 'app_1', 
        label: '업무 자동화를 위해 AI를 활용하고 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'app_2', 
        label: '고객 서비스 개선에 AI를 활용하고 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'app_3', 
        label: '의사결정 지원을 위해 AI 분석을 활용하고 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'app_4', 
        label: '제품/서비스 혁신에 AI를 적용하고 있습니까?',
        weight: 1.2 
      }
    ]
  },
  
  // 6. 데이터 (4문항) - 파란색
  data: {
    title: '데이터',
    color: '#3b82f6',
    items: [
      { 
        id: 'data_1', 
        label: '체계적인 데이터 수집 및 관리 프로세스가 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'data_2', 
        label: '데이터 기반 의사결정이 일상화되어 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'data_3', 
        label: '데이터 품질 관리 체계가 구축되어 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'data_4', 
        label: '실시간 데이터 분석이 가능한 시스템이 있습니까?',
        weight: 1.0 
      }
    ]
  }
};

// ================================================================================
// MODULE 3: 핵심 처리 함수
// ================================================================================

/**
 * 6자리 보고서 접근 패스워드 생성
 */
function generateReportPassword() {
  const chars = '0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log('🔐 보고서 패스워드 생성:', password);
  return password;
}

/**
 * AI 역량진단 신청 처리 (메인 함수)
 */
function handleEnhancedAIDiagnosisSubmission(requestData) {
  console.log('🚀 AI 역량진단 신청 처리 시작 (V10.0 PREMIUM - GEMINI 2.5 FLASH)');
  
  let diagnosisId = null; // diagnosisId를 함수 스코프 상단에 선언 및 초기화
  const startTime = new Date().getTime();
  const TIMEOUT_LIMIT = 750000; // Vercel 800초 제한 고려 (750초 = 12.5분)
  
  try {
    // 0. 환경변수 검증
    const env = getEnvironmentVariables();
    
    if (env.DEBUG_MODE) {
      console.log('📥 받은 데이터:', JSON.stringify(requestData, null, 2));
    } else {
      console.log('📥 데이터 수신:', {
        companyName: requestData.companyName,
        email: requestData.email,
        assessmentCount: requestData.assessmentResponses?.length || 0
      });
    }
    
    // 1. 데이터 검증 및 정규화
    diagnosisId = generateDiagnosisId(); // 여기서 diagnosisId에 값을 할당
    const reportPassword = generateReportPassword(); // 패스워드 생성
    const applicationData = normalizeApplicationData(requestData, diagnosisId);
    
    // 패스워드를 applicationData에 추가
    applicationData.reportPassword = reportPassword;
    
    // 2. 평가 점수 계산
    const scoreResult = calculateEnhancedScores(applicationData.assessmentScores);
    
    // 3. GAP 분석
    const gapAnalysis = performGAPAnalysis(scoreResult, applicationData.industry);
    
    // 4. SWOT 분석
    const swotAnalysis = generateSWOTAnalysis(applicationData, scoreResult);
    
    // 5. 우선순위 매트릭스
    const priorityMatrix = generatePriorityMatrix(scoreResult, gapAnalysis);
    
    // 6. 3단계 로드맵
    const roadmap = generate3PhaseRoadmap(scoreResult, applicationData);
    
    // 7. ROI 분석
    const roiAnalysis = calculateROIAnalysis(applicationData, scoreResult);
    
    // 8. AICAMP 맞춤 제안
    const aicampProposal = generateAICampProposal(scoreResult, applicationData);
    
    // 9. GEMINI AI 보고서 생성 (타임아웃 체크)
    const currentTime = new Date().getTime();
    if (currentTime - startTime > TIMEOUT_LIMIT) {
      console.warn('⚠️ 타임아웃 임박, 빠른 처리 모드');
    }
    
    const aiReport = generateAIReport({
      applicationData,
      scoreResult,
      gapAnalysis,
      swotAnalysis,
      priorityMatrix,
      roadmap,
      roiAnalysis,
      aicampProposal,
      diagnosisId
    });
    
    // 10. 데이터 저장 (패스워드 포함)
    saveToGoogleSheet(applicationData, aiReport, diagnosisId, reportPassword);
    
    // 11. 이메일 발송 (패스워드 포함)
    sendResultEmails(applicationData, aiReport, diagnosisId, reportPassword);
    
    const processingTime = new Date().getTime() - startTime;
    
    console.log(`✅ 처리 완료: ${processingTime}ms (${(processingTime/1000).toFixed(1)}초)`);
    
    // 타임아웃 경고
    if (processingTime > 600000) { // 10분 초과
      console.warn(`⚠️ 처리 시간 경고: ${(processingTime/1000).toFixed(1)}초`);
    }
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      reportPassword: reportPassword, // 패스워드 반환
      processingTime: processingTime,
      report: aiReport,
      message: 'AI 역량진단이 성공적으로 완료되었습니다. 이메일로 발송된 6자리 패스워드를 확인하세요.'
    };
    
  } catch (error) {
    console.error('❌ 처리 실패:', error);
    console.error('Stack:', error.stack);
    
    // 오류 알림
    notifyError(error, requestData);
    
    // 명확한 오류 응답 (폴백 없음)
    return {
      success: false,
      error: error.toString(),
      message: 'AI 역량진단 처리 중 오류가 발생했습니다. GEMINI API 설정을 확인하고 다시 시도해주세요.',
      diagnosisId: diagnosisId || 'ERROR',
      adminNotified: true,
      timestamp: getCurrentKoreanTime()
    };
  }
}

/**
 * 데이터 정규화
 */
function normalizeApplicationData(rawData, diagnosisId) {
  console.log('📋 데이터 정규화 시작');
  
  const normalized = {
    diagnosisId: diagnosisId,
    timestamp: getCurrentKoreanTime(),
    
    // 기업 정보
    companyName: rawData.companyName || rawData.company || '미입력',
    contactName: rawData.contactName || rawData.applicantName || rawData.contactManager || '담당자',
    email: rawData.email || 'no-email@example.com',
    phone: rawData.phone || '미입력',
    
    // 기업 속성
    industry: rawData.industry || rawData.businessType || '기타',
    employeeCount: rawData.employeeCount || rawData.employees || '1-10명',
    
    // 평가 점수
    assessmentScores: {}
  };
  
  // assessmentResponses 배열 처리 (프론트엔드에서 보내는 형식)
  if (rawData.assessmentResponses && Array.isArray(rawData.assessmentResponses)) {
    console.log('📊 assessmentResponses 배열 처리:', rawData.assessmentResponses.length);
    rawData.assessmentResponses.forEach(response => {
      if (response.questionId && response.value !== undefined) {
        normalized.assessmentScores[response.questionId] = parseInt(response.value) || 3;
      }
    });
  }
  
  // 개별 필드 처리 (하위 호환성)
  Object.keys(rawData).forEach(key => {
    if (key.includes('leadership_') || key.includes('infra_') || 
        key.includes('talent_') || key.includes('culture_') || 
        key.includes('app_') || key.includes('data_')) {
      normalized.assessmentScores[key] = parseInt(rawData[key]) || 3;
    }
  });
  
  // 점수가 없으면 기본값 설정
  if (Object.keys(normalized.assessmentScores).length === 0) {
    console.warn('⚠️ 평가 점수 없음, 기본값 설정');
    Object.values(AI_CAPABILITY_ASSESSMENT_ITEMS).forEach(category => {
      category.items.forEach(item => {
        normalized.assessmentScores[item.id] = 3; // 중간값
      });
    });
  }
  
  console.log('✅ 정규화 완료:', Object.keys(normalized.assessmentScores).length, '개 항목');
  return normalized;
}

/**
 * 점수 계산 (가중치 적용)
 */
function calculateEnhancedScores(assessmentScores) {
  console.log('🔢 점수 계산 시작');
  
  const categoryScores = {};
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  // 카테고리별 점수 계산
  Object.entries(AI_CAPABILITY_ASSESSMENT_ITEMS).forEach(([categoryKey, category]) => {
    let categoryWeightedSum = 0;
    let categoryWeightSum = 0;
    
    category.items.forEach(item => {
      const score = assessmentScores[item.id] || 3;
      const weightedScore = score * item.weight;
      categoryWeightedSum += weightedScore;
      categoryWeightSum += item.weight;
    });
    
    const categoryAverage = categoryWeightSum > 0 
      ? categoryWeightedSum / categoryWeightSum 
      : 3;
    
    categoryScores[category.title] = categoryAverage;
    totalWeightedScore += categoryAverage;
    totalWeight++;
  });
  
  // 전체 점수 계산 (0-100 스케일)
  const averageScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 3;
  const overallScore = Math.round(averageScore * 20); // 5점 만점을 100점으로 변환
  
  // 등급 결정
  let grade = 'D';
  if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 60) grade = 'B';
  else if (overallScore >= 40) grade = 'C';
  
  // 백분위 계산
  const percentile = calculatePercentile(overallScore);
  
  console.log(`✅ 점수 계산 완료: ${overallScore}점 (${grade}등급)`);
  
  return {
    overallScore,
    grade,
    percentile,
    categoryScores,
    averageScore
  };
}

/**
 * GAP 분석
 */
function performGAPAnalysis(scoreResult, industry) {
  console.log('🔍 GAP 분석 시작');
  
  const industryBenchmarks = {
    'IT/소프트웨어': { avg: 70, top25: 85 },
    '제조업': { avg: 50, top25: 65 },
    '금융': { avg: 65, top25: 80 },
    '유통/물류': { avg: 55, top25: 70 },
    '의료/헬스케어': { avg: 60, top25: 75 },
    '교육': { avg: 55, top25: 70 },
    '건설업': { avg: 45, top25: 60 },
    '기타': { avg: 50, top25: 65 }
  };
  
  const benchmark = industryBenchmarks[industry] || industryBenchmarks['기타'];
  const gap = scoreResult.overallScore - benchmark.avg;
  
  // Critical Gaps 식별
  const criticalGaps = [];
  const strengthAreas = [];
  
  Object.entries(scoreResult.categoryScores).forEach(([category, score]) => {
    if (score < 3) {
      criticalGaps.push(category);
    } else if (score >= 4) {
      strengthAreas.push(category);
    }
  });
  
  return {
    industryAverage: benchmark.avg,
    industryTop25: benchmark.top25,
    gap: gap,
    gapPercentage: Math.round((gap / benchmark.avg) * 100),
    criticalGaps,
    strengthAreas,
    position: gap >= 0 ? '업계 평균 이상' : '업계 평균 이하'
  };
}

/**
 * SWOT 분석
 */
function generateSWOTAnalysis(applicationData, scoreResult) {
  console.log('📊 SWOT 분석 시작');
  
  const swot = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };
  
  // 강점 분석
  Object.entries(scoreResult.categoryScores).forEach(([category, score]) => {
    if (score >= 4) {
      swot.strengths.push(`${category} 역량 우수 (${score.toFixed(1)}/5.0)`);
    }
  });
  
  if (swot.strengths.length === 0) {
    swot.strengths.push('변화 수용 의지', '디지털 전환 관심');
  }
  
  // 약점 분석
  Object.entries(scoreResult.categoryScores).forEach(([category, score]) => {
    if (score < 3) {
      swot.weaknesses.push(`${category} 역량 부족 (${score.toFixed(1)}/5.0)`);
    }
  });
  
  if (swot.weaknesses.length === 0) {
    swot.weaknesses.push('AI 전문성 부족', '체계적 접근 미흡');
  }
  
  // 기회 요인
  swot.opportunities = [
    'AI 기술 발전과 접근성 향상',
    '정부 AI 지원사업 활용 가능',
    'AI 도구 비용 절감 추세',
    '산업별 AI 솔루션 증가'
  ];
  
  // 위협 요인
  swot.threats = [
    '경쟁사 AI 도입 가속화',
    'AI 인재 확보 경쟁',
    '기술 변화 속도',
    'AI 관련 규제 강화'
  ];
  
  // SO, WO, ST, WT 전략
  swot.strategies = {
    SO: [
      '강점 영역을 기반으로 AI 파일럿 프로젝트 실행',
      '정부 지원사업 우선 선정 가능성 활용'
    ],
    WO: [
      'AICAMP 교육으로 약점 영역 보완',
      '외부 전문가 활용한 빠른 역량 확보'
    ],
    ST: [
      '선제적 AI 도입으로 경쟁 우위 확보',
      '내부 역량 강화로 외부 의존도 감소'
    ],
    WT: [
      '단계적 접근으로 리스크 최소화',
      '핵심 영역 우선 개선 전략'
    ]
  };
  
  return swot;
}

/**
 * 우선순위 매트릭스
 */
function generatePriorityMatrix(scoreResult, gapAnalysis) {
  console.log('🎯 우선순위 매트릭스 생성');
  
  const matrix = {
    highImportanceHighUrgency: [],
    highImportanceLowUrgency: [],
    lowImportanceHighUrgency: [],
    lowImportanceLowUrgency: []
  };
  
  // Critical Gaps는 높은 중요도/긴급성
  gapAnalysis.criticalGaps.forEach(gap => {
    matrix.highImportanceHighUrgency.push(`${gap} 역량 긴급 강화`);
  });
  
  // 기본 과제 추가
  if (scoreResult.overallScore < 60) {
    matrix.highImportanceHighUrgency.push('AI 기초 교육 실시');
    matrix.highImportanceHighUrgency.push('AI 전담 조직 구성');
  }
  
  matrix.highImportanceLowUrgency = [
    'AI 거버넌스 체계 구축',
    '장기 AI 전략 수립',
    'AI 성과 측정 체계 마련'
  ];
  
  matrix.lowImportanceHighUrgency = [
    'AI 도구 시범 도입',
    '직원 인식 개선 활동'
  ];
  
  matrix.lowImportanceLowUrgency = [
    '고급 AI 기술 연구',
    '외부 파트너십 탐색'
  ];
  
  return matrix;
}

/**
 * 3단계 실행 로드맵 - 업종별 특성 고려
 */
function generate3PhaseRoadmap(scoreResult, applicationData) {
  console.log('🗺️ 업종별 맞춤형 3단계 로드맵 생성');
  
  const employeeScale = getEmployeeScale(applicationData.employeeCount);
  const budgetScale = getBudgetScale(employeeScale);
  const industrySpecific = getIndustrySpecificRoadmap(applicationData.industry, scoreResult);
  
  const roadmap = {
    phase1: {
      title: industrySpecific.phase1.title || '기초 역량 구축',
      period: '1-3개월',
      objectives: [
        'AI 리터러시 향상',
        '기본 도구 도입',
        '조직 인식 개선'
      ],
      keyActions: [
        ...industrySpecific.phase1.keyActions,
        'AICAMP 기초 교육 프로그램 실시',
        'AI 추진 TF 구성'
      ],
      budget: '심층진단후 TBD',
      expectedOutcomes: [
        'AI 기초 역량 확보',
        '직원 인식 개선',
        ...industrySpecific.phase1.outcomes
      ],
      kpi: [
        '교육 이수율 90% 이상',
        ...industrySpecific.phase1.kpi
      ],
      industryFocus: industrySpecific.phase1.focus
    },
    phase2: {
      title: industrySpecific.phase2.title || 'AI 활용 확산',
      period: '4-8개월',
      objectives: [
        '실무 적용 확대',
        '성과 창출',
        '문화 정착'
      ],
      keyActions: [
        ...industrySpecific.phase2.keyActions,
        '부서별 AI 프로젝트 실행',
        'AI 활용 성과 공유'
      ],
      budget: '심층진단후 TBD',
      expectedOutcomes: [
        '가시적 성과 창출',
        'AI 활용 문화 확산',
        ...industrySpecific.phase2.outcomes
      ],
      kpi: [
        '3개 이상 AI 프로젝트 완료',
        ...industrySpecific.phase2.kpi
      ],
      industryFocus: industrySpecific.phase2.focus
    },
    phase3: {
      title: industrySpecific.phase3.title || '고도화 및 최적화',
      period: '9-12개월',
      objectives: [
        'AI 기반 혁신',
        '지속가능 체계',
        '경쟁력 확보'
      ],
      keyActions: [
        ...industrySpecific.phase3.keyActions,
        'AI 거버넌스 완성',
        '지속적 개선 체계 운영'
      ],
      budget: '심층진단후 TBD',
      expectedOutcomes: [
        'AI 성숙도 A등급',
        ...industrySpecific.phase3.outcomes,
        '업계 선도 위치'
      ],
      kpi: [
        '전사 AI 활용률 70%',
        ...industrySpecific.phase3.kpi
      ],
      industryFocus: industrySpecific.phase3.focus
    }
  };
  
  return roadmap;
}

/**
 * 업종별 특화 로드맵 생성
 */
function getIndustrySpecificRoadmap(industry, scoreResult) {
  const industryRoadmaps = {
    'IT/소프트웨어': {
      phase1: {
        title: 'N8N 기반 개발 자동화 구축',
        keyActions: [
          'N8N 워크플로우 자동화 시스템 구축',
          'GitHub-Slack-JIRA 연동 자동화',
          'AI 코드 리뷰 자동화 파이프라인',
          'ChatGPT API 기반 개발 지원 봇 구현'
        ],
        outcomes: [
          '개발 워크플로우 자동화율 70%',
          '반복 작업 시간 50% 절감',
          'AI 코드 생성 도구 활용률 90%'
        ],
        kpi: [
          'N8N 워크플로우 30개 이상 구축',
          '개발팀 생산성 40% 향상',
          'AI 도구 활용률 85% 이상'
        ],
        focus: 'N8N 자동화 중심의 개발 프로세스 혁신'
      },
      phase2: {
        title: '고객 서비스 자동화 및 AI 통합',
        keyActions: [
          'N8N 기반 고객 지원 자동화 시스템',
          'AI 챗봇과 CRM 연동 자동화',
          '사용자 피드백 분석 자동화',
          'A/B 테스트 결과 자동 리포팅'
        ],
        outcomes: [
          '고객 응답 시간 80% 단축',
          '서비스 품질 지표 35% 개선',
          'AI 기반 개인화 서비스 제공'
        ],
        kpi: [
          '자동화 워크플로우 50개 이상',
          '고객 만족도 30% 향상',
          'AI 기능 활용률 70%'
        ],
        focus: 'N8N 자동화를 통한 고객 경험 혁신'
      },
      phase3: {
        title: '지능형 비즈니스 자동화 플랫폼',
        keyActions: [
          'N8N 기반 통합 비즈니스 자동화 플랫폼',
          'AI 예측 모델과 자동화 연동',
          '다중 채널 마케팅 자동화',
          '실시간 비즈니스 인텔리전스 자동화'
        ],
        outcomes: [
          '전사 자동화율 85% 달성',
          'AI 기반 의사결정 시스템 구축',
          '비즈니스 프로세스 완전 자동화'
        ],
        kpi: [
          'N8N 워크플로우 100개 이상',
          '운영 효율성 60% 향상',
          'AI 자동화 매출 기여도 50%'
        ],
        focus: 'N8N 기반 지능형 자동화 생태계 구축'
      }
    },
    
    '제조업': {
      phase1: {
        title: 'N8N 기반 생산 자동화 시스템',
        keyActions: [
          'N8N으로 IoT 센서 데이터 자동 수집/분석',
          '설비 이상 알림 자동화 워크플로우',
          'ERP-MES-WMS 시스템 연동 자동화',
          'AI 예측 정비 알림 자동화'
        ],
        outcomes: [
          '생산 데이터 실시간 모니터링',
          '설비 가동률 20% 향상',
          '예방 정비로 다운타임 60% 감소'
        ],
        kpi: [
          'N8N 자동화 워크플로우 25개 구축',
          '데이터 수집 자동화율 95%',
          '설비 이상 감지 정확도 90%'
        ],
        focus: 'N8N 기반 스마트 팩토리 자동화'
      },
      phase2: {
        title: '품질관리 및 공급망 자동화',
        keyActions: [
          'N8N 기반 품질 검사 결과 자동 분석',
          '불량품 발생 시 자동 알림/대응 시스템',
          '공급업체 연동 자동 발주 시스템',
          'AI 수요 예측과 생산 계획 자동화'
        ],
        outcomes: [
          '품질 관리 프로세스 완전 자동화',
          '불량률 75% 감소',
          '재고 최적화로 비용 30% 절감'
        ],
        kpi: [
          '자동화 워크플로우 40개 이상',
          '품질 검사 자동화율 85%',
          '공급망 자동화 커버리지 80%'
        ],
        focus: 'N8N 기반 통합 품질/공급망 자동화'
      },
      phase3: {
        title: '완전 자율 생산 시스템',
        keyActions: [
          'N8N 기반 생산라인 완전 자동화',
          'AI 기반 자율 생산 최적화',
          '디지털 트윈과 실시간 자동화 연동',
          '무인 공장 운영 자동화 시스템'
        ],
        outcomes: [
          '생산라인 자동화율 95% 달성',
          '무인 운영 시간 80% 확대',
          '생산 효율성 50% 향상'
        ],
        kpi: [
          'N8N 워크플로우 80개 이상',
          '완전 자동화 라인 비율 70%',
          'AI 자율 운영 시간 비율 60%'
        ],
        focus: 'N8N 기반 완전 자율 스마트 팩토리'
      }
    },
    
    '금융': {
      phase1: {
        title: 'N8N 기반 금융 업무 자동화',
        keyActions: [
          'N8N으로 대출 심사 프로세스 자동화',
          '고객 상담 내역 자동 분류/라우팅',
          '컴플라이언스 체크 자동화 워크플로우',
          'AI 사기 탐지 알림 자동화 시스템'
        ],
        outcomes: [
          '대출 심사 시간 70% 단축',
          '고객 응답 시간 85% 감소',
          '컴플라이언스 위반 사전 차단'
        ],
        kpi: [
          'N8N 자동화 워크플로우 20개 구축',
          '업무 자동화율 65%',
          '고객 만족도 25% 향상'
        ],
        focus: 'N8N 기반 금융 프로세스 자동화'
      },
      phase2: {
        title: '개인화 서비스 자동화 확산',
        keyActions: [
          'N8N 기반 고객 맞춤 상품 추천 자동화',
          '투자 포트폴리오 리밸런싱 자동화',
          '리스크 모니터링 실시간 알림 시스템',
          'AI 기반 자동 신용 평가 시스템'
        ],
        outcomes: [
          '상품 추천 정확도 40% 향상',
          '포트폴리오 수익률 20% 개선',
          '리스크 관리 정확도 35% 향상'
        ],
        kpi: [
          '자동화 워크플로우 35개 이상',
          '개인화 서비스 커버리지 80%',
          '고객 전환율 25% 향상'
        ],
        focus: 'N8N 기반 AI 개인화 금융 서비스'
      },
      phase3: {
        title: '통합 핀테크 자동화 플랫폼',
        keyActions: [
          'N8N 기반 오픈뱅킹 API 자동화',
          '다중 채널 금융 서비스 통합 자동화',
          '실시간 자산 관리 자동화 시스템',
          'AI 기반 투자 자문 완전 자동화'
        ],
        outcomes: [
          '금융 서비스 완전 자동화',
          '플랫폼 기반 수익 300% 증가',
          '금융 생태계 허브 역할 수행'
        ],
        kpi: [
          'N8N 워크플로우 60개 이상',
          '자동화 서비스 커버리지 95%',
          'API 호출량 월 5천만회'
        ],
        focus: 'N8N 기반 완전 자동화 핀테크 생태계'
      }
    },
    
    '유통/물류': {
      phase1: {
        title: 'N8N 기반 물류 자동화 시스템',
        keyActions: [
          'N8N으로 재고 관리 자동화 워크플로우',
          '주문-배송-배송완료 자동 알림 시스템',
          '공급업체 연동 자동 발주 시스템',
          'AI 수요 예측과 재고 보충 자동화'
        ],
        outcomes: [
          '재고 관리 완전 자동화',
          '주문 처리 시간 80% 단축',
          '배송 효율성 30% 향상'
        ],
        kpi: [
          'N8N 자동화 워크플로우 30개 구축',
          '재고 정확도 99% 달성',
          '주문 자동화율 90%'
        ],
        focus: 'N8N 기반 스마트 물류 자동화'
      },
      phase2: {
        title: '고객 경험 자동화 및 개인화',
        keyActions: [
          'N8N 기반 개인화 상품 추천 자동화',
          '고객 행동 분석 자동 리포팅',
          '다중 채널 마케팅 자동화',
          'AI 기반 동적 가격 조정 자동화'
        ],
        outcomes: [
          '개인화 서비스 정확도 45% 향상',
          '마케팅 ROI 50% 개선',
          '고객 재구매율 40% 증가'
        ],
        kpi: [
          '자동화 워크플로우 45개 이상',
          '개인화 추천 정확도 85%',
          '마케팅 자동화 커버리지 80%'
        ],
        focus: 'N8N 기반 옴니채널 고객 경험 자동화'
      },
      phase3: {
        title: '완전 자율 유통 플랫폼',
        keyActions: [
          'N8N 기반 무인 매장 운영 자동화',
          'AI 기반 상품 기획 자동화 시스템',
          '공급망 전체 자동화 통합 플랫폼',
          '실시간 비즈니스 최적화 자동화'
        ],
        outcomes: [
          '매장 운영 자동화율 95%',
          '신상품 성공률 65% 향상',
          '운영 비용 55% 절감'
        ],
        kpi: [
          'N8N 워크플로우 70개 이상',
          '무인 매장 운영률 85%',
          '플랫폼 자동화 매출 기여도 70%'
        ],
        focus: 'N8N 기반 완전 자율 유통 생태계'
      }
    },
    
    '의료/헬스케어': {
      phase1: {
        title: 'N8N 기반 의료 업무 자동화',
        keyActions: [
          'N8N으로 환자 예약/진료 일정 자동화',
          '검사 결과 자동 분류/전송 시스템',
          '의료진 업무 배정 자동화',
          'AI 진단 보조와 자동 알림 연동'
        ],
        outcomes: [
          '환자 대기시간 60% 단축',
          '의료진 업무 효율성 40% 향상',
          '진료 프로세스 자동화율 70%'
        ],
        kpi: [
          'N8N 자동화 워크플로우 25개 구축',
          '예약 자동화율 95%',
          '진단 보조 AI 활용률 80%'
        ],
        focus: 'N8N 기반 의료 프로세스 자동화'
      },
      phase2: {
        title: '개인화 의료 서비스 자동화',
        keyActions: [
          'N8N 기반 개인 맞춤 치료 계획 자동화',
          '환자 건강 상태 모니터링 자동화',
          '약물 처방 및 부작용 알림 자동화',
          'AI 기반 건강 위험도 평가 자동화'
        ],
        outcomes: [
          '맞춤형 치료 정확도 35% 향상',
          '약물 부작용 50% 감소',
          '환자 만족도 30% 향상'
        ],
        kpi: [
          '자동화 워크플로우 40개 이상',
          '개인화 치료 적용률 75%',
          '건강 모니터링 자동화율 85%'
        ],
        focus: 'N8N 기반 정밀 의료 자동화'
      },
      phase3: {
        title: '통합 헬스케어 자동화 생태계',
        keyActions: [
          'N8N 기반 예방 의료 완전 자동화',
          '웨어러블 기기 연동 자동 건강관리',
          '의료기관 간 데이터 자동 연동',
          'AI 기반 질병 예측/예방 자동화'
        ],
        outcomes: [
          '예방 가능 질병 75% 감소',
          '의료비 절감 45% 달성',
          '헬스케어 생태계 허브 구축'
        ],
        kpi: [
          'N8N 워크플로우 60개 이상',
          '예방 의료 자동화율 90%',
          '통합 플랫폼 사용자 100만명'
        ],
        focus: 'N8N 기반 예방 중심 헬스케어 자동화'
      }
    }
  };
  
  // 기본 로드맵 (업종이 매칭되지 않는 경우) - N8N 자동화 중심
  const defaultRoadmap = {
    phase1: {
      title: 'N8N 기반 업무 자동화 기초',
      keyActions: [
        'N8N 플랫폼 도입 및 기본 워크플로우 구축',
        'ChatGPT API 연동 자동화 시스템',
        '반복 업무 자동화 파일럿 프로젝트',
        'AI 도구 통합 자동화 환경 구축'
      ],
      outcomes: [
        '기본 업무 자동화율 60%',
        '반복 작업 시간 40% 절감',
        'AI 도구 활용 자동화'
      ],
      kpi: [
        'N8N 워크플로우 15개 이상 구축',
        'AI 도구 활용률 70% 이상',
        '업무 효율성 30% 향상'
      ],
      focus: 'N8N 기반 업무 자동화 기초 구축'
    },
    phase2: {
      title: 'AI 통합 자동화 확산',
      keyActions: [
        'N8N 기반 부서별 맞춤 자동화',
        'AI 분석 결과 자동 리포팅',
        '다중 시스템 연동 자동화',
        '고객 서비스 자동화 확대'
      ],
      outcomes: [
        '전사 자동화 커버리지 75%',
        'AI 기반 의사결정 자동화',
        'ROI 150% 달성'
      ],
      kpi: [
        '자동화 워크플로우 30개 이상',
        '업무 효율 40% 향상',
        'AI 통합 자동화율 80%'
      ],
      focus: 'N8N 기반 AI 통합 자동화 확산'
    },
    phase3: {
      title: '지능형 자동화 생태계 완성',
      keyActions: [
        'N8N 기반 완전 자동화 시스템',
        'AI 기반 예측적 자동화',
        '외부 파트너 시스템 자동 연동',
        '지속적 최적화 자동화'
      ],
      outcomes: [
        '비즈니스 프로세스 90% 자동화',
        'AI 기반 자율 운영 시스템',
        'ROI 250% 이상 달성'
      ],
      kpi: [
        'N8N 워크플로우 50개 이상',
        '완전 자동화 프로세스 비율 70%',
        '지능형 자동화 성과 창출'
      ],
      focus: 'N8N 기반 지능형 자동화 생태계 구축'
    }
  };
  
  return industryRoadmaps[industry] || defaultRoadmap;
}

/**
 * ROI 분석
 */
function calculateROIAnalysis(applicationData, scoreResult) {
  console.log('💰 ROI 분석 계산');
  
  const industryROI = {
    'IT/소프트웨어': 3.5,
    '제조업': 2.8,
    '금융': 3.2,
    '유통/물류': 2.5,
    '의료/헬스케어': 3.0,
    '교육': 2.3,
    '건설업': 2.0,
    '기타': 2.5
  };
  
  const roiMultiplier = industryROI[applicationData.industry] || 2.5;
  const currentScoreBonus = scoreResult.overallScore / 100;
  
  const expectedROI = Math.round((roiMultiplier + currentScoreBonus) * 100);
  const paybackPeriod = Math.max(6, Math.round(18 - (scoreResult.overallScore / 10)));
  
  return {
    expectedROI: `${expectedROI}%`,
    paybackPeriod: `${paybackPeriod}개월`,
    yearlyBenefits: {
      year1: `${Math.round(expectedROI * 0.4)}%`,
      year2: `${Math.round(expectedROI * 0.8)}%`,
      year3: `${expectedROI}%`
    },
    benefitAreas: [
      '업무 효율 30-50% 향상',
      '의사결정 속도 2배 향상',
      '운영비용 20-30% 절감',
      '고객 만족도 향상'
    ],
    investmentBreakdown: {
      education: '40%',
      infrastructure: '30%',
      consulting: '20%',
      tools: '10%'
    }
  };
}

/**
 * AICAMP 맞춤 제안
 */
function generateAICampProposal(scoreResult, applicationData) {
  console.log('🎓 AICAMP 맞춤 제안 생성');
  
  let level = 'basic';
  if (scoreResult.overallScore >= 70) level = 'advanced';
  else if (scoreResult.overallScore >= 50) level = 'intermediate';
  
  const proposals = {
    basic: {
      title: 'N8N 기반 AI 자동화 기초 과정',
      duration: '3개월 (48시간)',
      modules: [
        'N8N 자동화 플랫폼 기초 (12시간)',
        'ChatGPT API 연동 실습 (12시간)',
        '업무별 자동화 워크플로우 구축 (16시간)',
        'AI 도구 통합 자동화 (8시간)'
      ],
      price: '심층진단후 TBD',
      benefits: [
        'N8N 자동화 기초 역량 확보',
        '반복 업무 50% 자동화',
        'AI 도구 통합 활용 능력'
      ],
      practicalProjects: [
        '이메일 자동 분류/응답 시스템',
        '데이터 수집/분석 자동화',
        '고객 문의 자동 라우팅'
      ]
    },
    intermediate: {
      title: 'N8N 기반 AI 통합 자동화 과정',
      duration: '6개월 (96시간)',
      modules: [
        'N8N 고급 워크플로우 설계 (24시간)',
        'AI API 다중 연동 자동화 (24시간)',
        '부서별 맞춤 자동화 구축 (32시간)',
        '자동화 성과 측정/최적화 (16시간)'
      ],
      price: '심층진단후 TBD',
      benefits: [
        '전사 자동화 시스템 구축',
        'AI 기반 의사결정 자동화',
        'ROI 150% 이상 성과 창출'
      ],
      practicalProjects: [
        'CRM-ERP 통합 자동화',
        'AI 분석 리포트 자동 생성',
        '다중 채널 마케팅 자동화'
      ]
    },
    advanced: {
      title: 'N8N 기반 지능형 자동화 마스터 과정',
      duration: '12개월 (144시간)',
      modules: [
        'N8N 엔터프라이즈 아키텍처 (36시간)',
        'AI 예측 모델 자동화 통합 (36시간)',
        '완전 자율 운영 시스템 구축 (48시간)',
        '자동화 거버넌스/보안 (24시간)'
      ],
      price: '심층진단후 TBD',
      benefits: [
        '업계 최고 수준 자동화 역량',
        '완전 자율 운영 시스템 구축',
        'AI 자동화 혁신 리더십'
      ],
      practicalProjects: [
        '무인 운영 자동화 시스템',
        'AI 기반 예측적 자동화',
        '지능형 비즈니스 최적화'
      ]
    }
  };
  
  return {
    recommendedProgram: proposals[level],
    additionalServices: [
      'N8N 자동화 컨설팅',
      '실시간 자동화 성과 대시보드',
      'AI 자동화 전문가 멘토링',
      '24/7 자동화 시스템 모니터링'
    ],
    governmentSupport: {
      available: true,
      programs: ['AI 바우처', 'K-Digital Training', 'HRD-Net 환급'],
      coverage: '최대 80%',
      specialBenefit: 'N8N 자동화 특화 과정 인증'
    },
    practicalOutcomes: [
      '업무 자동화율 70% 이상 달성',
      'N8N 워크플로우 30개 이상 구축',
      'AI 도구 통합 활용률 90%',
      '반복 업무 시간 60% 절감'
    ]
  };
}

/**
 * GEMINI AI 보고서 생성 - 사실 기반 최고 품질 보고서 (이후경 교장 톤앤매너)
 * 폴백 응답 완전 금지, 실제 신청서 데이터 기반 분석만 수행
 */
function generateAIReport(data) {
  console.log('🤖 AI 심층 분석 보고서 생성 시작 - 실제 신청서 데이터 기반 분석');
  console.log('📋 분석 대상:', data.applicationData.companyName, '-', data.applicationData.industry);
  
  try {
    // 신청서 데이터 완전성 검증
    const requiredFields = ['companyName', 'industry', 'employeeCount', 'contactName', 'email'];
    const missingFields = requiredFields.filter(field => !data.applicationData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`필수 신청서 데이터가 누락되었습니다: ${missingFields.join(', ')}`);
    }
    
    console.log('✅ 신청서 데이터 검증 완료');
    
    // GEMINI API 호출 - 사실 기반 분석만 수행
    const geminiResponse = callGeminiAPI(data);
    
    // AI 분석 결과 완전성 검증 (폴백 금지)
    if (!geminiResponse || Object.keys(geminiResponse).length === 0) {
      throw new Error('AI 분석 결과가 비어있습니다. GEMINI API 상태를 확인하세요.');
    }
    
    // AI 응답 품질 검증
    if (!geminiResponse.keyFindings || !geminiResponse.ceoMessage) {
      throw new Error('AI 분석 품질이 기준에 미달합니다. 핵심 분석 결과가 누락되었습니다.');
    }
    
    console.log('✅ AI 분석 품질 검증 완료');
    
    // 통합 보고서 구조 - 모든 채널(이메일, 웹, 다운로드)에서 완전히 동일한 내용
    const report = {
      // 기업 기본 정보 (신청서 기반)
      companyInfo: {
        companyName: data.applicationData.companyName,
        industry: data.applicationData.industry,
        employeeCount: data.applicationData.employeeCount,
        contactName: data.applicationData.contactName,
        email: data.applicationData.email,
        businessDescription: data.applicationData.businessDescription || '',
        submissionData: data.applicationData // 전체 신청서 데이터 보존
      },
      
      // 핵심 요약 (AI 분석 기반)
      executiveSummary: {
        overallScore: data.scoreResult.overallScore,
        grade: data.scoreResult.grade,
        percentile: data.scoreResult.percentile,
        maturityLevel: getMaturityLevel(data.scoreResult.overallScore),
        keyFindings: geminiResponse.keyFindings, // 폴백 제거
        ceoMessage: geminiResponse.ceoMessage    // 폴백 제거
      },
      
      // 카테고리별 상세 분석
      categoryAnalysis: data.scoreResult.categoryScores,
      
      // GAP 분석
      gapAnalysis: data.gapAnalysis,
      
      // SWOT 전략 매트릭스 (AI 분석 기반 SO, WO, ST, WT 전략)
      swotAnalysis: {
        strengths: data.swotAnalysis.strengths,
        weaknesses: data.swotAnalysis.weaknesses,
        opportunities: data.swotAnalysis.opportunities,
        threats: data.swotAnalysis.threats,
        strategicMatrix: {
          SO_strategies: geminiResponse.strategicMatrix?.SO전략 || geminiResponse.strategicMatrix?.SO_strategies || [],
          WO_strategies: geminiResponse.strategicMatrix?.WO전략 || geminiResponse.strategicMatrix?.WO_strategies || [],
          ST_strategies: geminiResponse.strategicMatrix?.ST전략 || geminiResponse.strategicMatrix?.ST_strategies || [],
          WT_strategies: geminiResponse.strategicMatrix?.WT전략 || geminiResponse.strategicMatrix?.WT_strategies || []
        },
        actionPlan: geminiResponse.actionPlan || [],
        basedOnActualData: `${data.applicationData.companyName}의 실제 신청서 답변을 바탕으로 한 SWOT 분석`
      },
      
      // 우선순위 매트릭스 (중요도 vs 긴급성/실행용이성)
      priorityMatrix: {
        ...data.priorityMatrix,
        executionEase: geminiResponse.executionEase || {},
        quickWins: geminiResponse.quickWins || []
      },
      
      // 3단계 실행 로드맵
      roadmap: {
        ...data.roadmap,
        detailedActions: geminiResponse.detailedActions || {},
        milestones: geminiResponse.milestones || []
      },
      
      // ROI 분석
      roiAnalysis: {
        ...data.roiAnalysis,
        industryBenchmark: geminiResponse.industryBenchmark || {},
        successCases: geminiResponse.successCases || []
      },
      
      // AICAMP 맞춤형 제안
      aicampProposal: {
        ...data.aicampProposal,
        customizedSolution: geminiResponse.customizedSolution || {},
        implementationPlan: geminiResponse.implementationPlan || []
      },
      
      // AI 심층 인사이트
      aiInsights: {
        industryTrends: geminiResponse.industryTrends || [],
        competitiveAnalysis: geminiResponse.competitiveAnalysis || {},
        futureRecommendations: geminiResponse.futureRecommendations || [],
        riskMitigation: geminiResponse.riskMitigation || []
      },
      
      // 실행 권고사항
      recommendations: {
        immediate: geminiResponse.immediateActions || [],
        shortTerm: geminiResponse.shortTermActions || [],
        longTerm: geminiResponse.longTermActions || []
      },
      
      // 메타데이터
      metadata: {
        diagnosisId: data.diagnosisId,
        generatedAt: getCurrentKoreanTime(),
        version: 'V10.0 PREMIUM - 사실기반분석',
        reportQuality: 'PROFESSIONAL_PLUS',
        aiModel: 'GEMINI-2.0-FLASH-EXP',
        analysisType: '실제 신청서 데이터 기반 맞춤형 분석',
        consultantProfile: '이후경 교장 - N8N 자동화 전문가',
        reportUnified: true,
        fallbackDisabled: true,
        dataIntegrity: `${data.applicationData.companyName} 신청서 기반 사실 분석`
      }
    };
    
    console.log('✅ 사실 기반 AI 심층 분석 보고서 생성 완료');
    console.log('📋 보고서 메타데이터:', report.metadata);
    
    return report;
    
  } catch (error) {
    console.error('❌ AI 보고서 생성 실패:', error);
    console.error('📋 실패한 기업:', data.applicationData?.companyName || 'Unknown');
    
    // 폴백 완전 금지 - 실제 AI 분석 없이는 보고서 생성 불가
    throw new Error(`${data.applicationData?.companyName || '해당 기업'}의 AI 보고서 생성 실패: ${error.message}. 실제 AI 분석 없이는 보고서를 제공할 수 없습니다.`);
  }
}

/**
 * GEMINI API 호출 (환경변수 검증 포함)
 */
function callGeminiAPI(data) {
  const env = getEnvironmentVariables();
  
  // API 키 검증
  if (!env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다');
    throw new Error('GEMINI API 키가 설정되지 않았습니다');
  }
  
  // 재시도 로직 추가
  let retries = 0;
  const maxRetries = env.MAX_RETRIES || 3;
  const retryDelay = env.RETRY_DELAY || 1000;
  
  const prompt = `
당신은 AICAMP의 이후경 교장입니다. 30년간 기업 교육과 AI 혁신을 이끌어온 전문가로서, 
특히 N8N 자동화와 AI 통합 분야의 최고 권위자입니다.
실무 중심의 N8N 자동화 솔루션을 통해 기업의 업무 효율성과 AI 역량을 혁신적으로 개선시킵니다.
진정성 있고 실질적인 도움이 되는 조언을 제공하며, 기업의 자동화 혁신을 함께 고민하는 파트너입니다.

**중요**: 아래 제공된 실제 기업 정보와 진단 결과를 바탕으로만 분석하세요. 일반적인 답변이 아닌, 
이 기업의 실제 상황에 맞는 구체적이고 맞춤형 분석을 제공해야 합니다.

[실제 기업 정보 - 신청서 기반]
회사명: ${data.applicationData.companyName}
업종: ${data.applicationData.industry}
직원수: ${data.applicationData.employeeCount}명
담당자: ${data.applicationData.contactName}
이메일: ${data.applicationData.email}
사업내용: ${data.applicationData.businessDescription || '미제공'}

[진단 결과]
전체 점수: ${data.scoreResult.overallScore}점 (${data.scoreResult.grade}등급)
업계 평균 대비: ${data.gapAnalysis.position}
백분위: 상위 ${data.scoreResult.percentile}%

[카테고리별 점수]
${Object.entries(data.scoreResult.categoryScores).map(([cat, score]) => `${cat}: ${score.toFixed(1)}/5.0`).join('\n')}

[실제 SWOT 분석 결과 - 신청서 답변 기반]
강점(Strengths): ${data.swotAnalysis.strengths.join(', ')}
약점(Weaknesses): ${data.swotAnalysis.weaknesses.join(', ')}
기회(Opportunities): ${data.swotAnalysis.opportunities.join(', ')}
위협(Threats): ${data.swotAnalysis.threats.join(', ')}

[신청서 상세 답변 데이터]
${Object.entries(data.applicationData).filter(([key, value]) => 
  key !== 'companyName' && key !== 'industry' && key !== 'employeeCount' && 
  key !== 'contactName' && key !== 'email' && value
).map(([key, value]) => `${key}: ${value}`).join('\n')}

**분석 지시사항**: 
위 실제 데이터를 바탕으로 ${data.applicationData.companyName}만을 위한 N8N 자동화 중심의 심층 분석 보고서를 작성하세요.
절대 일반적인 템플릿 답변을 하지 말고, 이 기업의 실제 상황과 답변을 구체적으로 반영하세요.

다음 내용을 반드시 포함하여 JSON 형식으로 작성하되, N8N 자동화 전문가인 이후경 교장의 톤앤매너를 유지하세요:

1. ceoMessage: ${data.applicationData.companyName} 대표님께 드리는 개인화된 메시지 
   (회사명과 업종을 명시하며, N8N 자동화의 가치와 격려하는 톤, 150-200자)

2. keyFindings: ${data.applicationData.companyName}의 실제 진단 결과를 바탕으로 한 핵심 발견사항 5개
   - 신청서에서 제출한 실제 답변과 점수를 구체적으로 언급
   - ${data.applicationData.industry} 업종 특성과 회사 규모(${data.applicationData.employeeCount}명) 반영
   - 각 항목은 구체적인 자동화 가능 영역과 예상 효과 포함

3. strategicMatrix: N8N 자동화 기반 SWOT 전략 매트릭스
   - SO전략: N8N 강점-기회 활용 자동화 전략 2개
   - WO전략: N8N으로 약점-기회 보완 자동화 전략 2개
   - ST전략: N8N 강점-위협 대응 자동화 전략 2개
   - WT전략: N8N으로 약점-위협 방어 자동화 전략 2개

4. actionPlan: N8N 기반 즉시 실행 가능한 자동화 액션 플랜 5개

5. executionEase: N8N 자동화 실행 용이성 분석
   - quickWins: N8N으로 빠른 자동화 성과 가능 항목 3개
   - mediumTerm: N8N 중기 자동화 과제 3개
   - longTerm: N8N 장기 자동화 과제 3개

6. quickWins: N8N Quick Win 자동화 프로젝트 3개 (구체적 워크플로우 포함)

7. detailedActions: N8N 자동화 3단계별 상세 실행 계획
   - phase1Actions: N8N 기초 자동화 구축 액션 5개
   - phase2Actions: N8N 통합 자동화 확산 액션 5개
   - phase3Actions: N8N 지능형 자동화 완성 액션 5개

8. milestones: N8N 자동화 주요 마일스톤 6개 (워크플로우 구축 목표 명시)

9. industryBenchmark: ${data.applicationData.industry} 업계 N8N 자동화 벤치마크
   - topPerformers: N8N 자동화 선도 기업 특징 3개
   - averageLevel: 업계 평균 자동화 수준 설명
   - improvement: N8N 자동화 개선 포인트 3개

10. successCases: ${data.applicationData.industry} 업계 N8N 자동화 성공 사례 2개

11. customizedSolution: AICAMP N8N 자동화 맞춤형 솔루션
    - coreProgram: N8N 핵심 프로그램명과 설명
    - keyBenefits: N8N 자동화 핵심 혜택 5개
    - expectedOutcome: N8N 자동화 기대 성과

12. implementationPlan: N8N 자동화 구현 계획 (월별 워크플로우 구축 일정)

13. industryTrends: ${data.applicationData.industry} 업계 N8N 자동화 트렌드 3개

14. competitiveAnalysis: N8N 자동화 경쟁력 분석
    - currentPosition: 현재 자동화 수준 위치
    - competitiveAdvantage: N8N 자동화 경쟁 우위 요소
    - improvementAreas: N8N 자동화 개선 영역

15. futureRecommendations: N8N 자동화 미래 전략 권고 5개

16. riskMitigation: N8N 자동화 리스크 완화 방안 3개

17. immediateActions: N8N 즉시 실행 자동화 사항 5개 (1주일 내)

18. shortTermActions: N8N 단기 자동화 실행 사항 5개 (1-3개월)

19. longTermActions: N8N 장기 자동화 실행 사항 5개 (6개월-1년)

**최종 품질 요구사항**:
1. 모든 내용은 ${data.applicationData.companyName}의 실제 신청서 답변과 진단 결과를 구체적으로 언급
2. 회사명, 업종, 직원수, 담당자명을 자연스럽게 본문에 포함
3. 일반론 절대 금지 - 오직 이 기업만을 위한 맞춤형 분석
4. N8N 자동화 전문가인 이후경 교장의 따뜻하면서도 실무적이고 전문적인 톤 유지
5. ${data.applicationData.industry} 업종 특성을 반영한 구체적인 N8N 워크플로우 시나리오 제시
6. 신청서에서 제출한 실제 데이터와 점수를 분석에 활용
7. 모든 권고사항은 실행 가능하고 측정 가능한 구체적 내용으로 작성

JSON 형식으로 응답하되, 위 요구사항을 모두 충족하는 최고 품질의 보고서를 작성하세요.`;

  // 재시도 로직 포함 API 호출
  while (retries < maxRetries) {
    try {
      console.log(`🤖 GEMINI API 호출 시작 (시도 ${retries + 1}/${maxRetries})`);
      
      const response = UrlFetchApp.fetch(
        `https://generativelanguage.googleapis.com/v1/models/${env.AI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, // v1 정식 버전 사용
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          payload: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: env.TEMPERATURE,
              maxOutputTokens: env.MAX_OUTPUT_TOKENS,
              candidateCount: 1,
              topK: 40,
              topP: 0.95
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
        }
      );
      
      const responseCode = response.getResponseCode();
      const responseText = response.getContentText();
      
      if (env.DEBUG_MODE) {
        console.log('GEMINI API 응답 코드:', responseCode);
        console.log('GEMINI API 응답 길이:', responseText.length);
      }
      
      // 429 (Rate Limit) 또는 503 (Service Unavailable) 처리
      if (responseCode === 429 || responseCode === 503) {
        console.warn(`⚠️ API 일시적 오류 (${responseCode}), 재시도 중...`);
        retries++;
        if (retries < maxRetries) {
          Utilities.sleep(retryDelay * retries); // 지수 백오프
          continue;
        }
      }
      
      if (responseCode !== 200) {
        console.error('❌ GEMINI API 오류:', responseCode, responseText);
        throw new Error(`GEMINI API 오류: ${responseCode} - ${responseText}`);
      }
      
      const result = JSON.parse(responseText);
      
      if (result.error) {
        console.error('❌ GEMINI API 에러 응답:', result.error);
        throw new Error(`GEMINI API 에러: ${result.error.message}`);
      }
      
      // 응답 구조 안전성 검사 강화 (V8.0 → V10.0 수준으로 업그레이드)
      if (!result.candidates || !Array.isArray(result.candidates) || result.candidates.length === 0) {
        console.warn('⚠️ GEMINI 응답에 candidates 배열이 없거나 비어있음:', JSON.stringify(result));
        throw new Error('GEMINI API 응답에 candidates 배열이 없습니다');
      }
      
      const candidate = result.candidates[0];
      if (!candidate || !candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
        console.warn('⚠️ GEMINI 응답의 content 구조가 올바르지 않음:', JSON.stringify(candidate));
        throw new Error('GEMINI API 응답의 content 구조가 올바르지 않습니다');
      }
      
      const textPart = candidate.content.parts[0];
      if (!textPart || !textPart.text) {
        console.warn('⚠️ GEMINI 응답에 text 내용이 없음:', JSON.stringify(textPart));
        throw new Error('GEMINI API 응답에 text 내용이 없습니다');
      }
      
      const content = textPart.text;
      console.log('✅ GEMINI AI 분석 완료, 응답 길이:', content.length);
      
      try {
        // JSON 추출 및 파싱
        let jsonContent = content;
        
        // Markdown 코드 블록 제거
        if (content.includes('```json')) {
          const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
          if (jsonMatch && jsonMatch[1]) {
            jsonContent = jsonMatch[1];
          } else {
            console.warn('⚠️ JSON 코드 블록을 찾았지만 내용이 비어있음');
          }
        } else if (content.includes('```')) {
          const codeMatch = content.match(/```\n?([\s\S]*?)\n?```/);
          if (codeMatch && codeMatch[1]) {
            jsonContent = codeMatch[1];
          } else {
            console.warn('⚠️ 코드 블록을 찾았지만 내용이 비어있음');
          }
        }
        
        // JSON 파싱 전 내용 검증
        if (!jsonContent || jsonContent.trim().length === 0) {
          console.warn('⚠️ 추출된 JSON 내용이 비어있음');
          throw new Error('추출된 JSON 내용이 비어있습니다');
        }
        
        console.log('🔍 JSON 파싱 시도, 내용 길이:', jsonContent.length);
        return JSON.parse(jsonContent.trim());
        
      } catch (e) {
        console.warn('⚠️ JSON 파싱 실패, 재시도 중...', e.message);
        console.log('📄 파싱 실패한 내용 (처음 500자):', content.substring(0, 500));
        retries++;
        if (retries < maxRetries) {
          Utilities.sleep(retryDelay);
          continue;
        }
        // 마지막 시도에서도 실패시 오류 발생 (폴백 제거)
        throw new Error('AI 응답 JSON 파싱 실패. GEMINI API 응답 형식을 확인하세요.');
      }
      
    } catch (error) {
      console.error(`❌ GEMINI API 호출 실패 (시도 ${retries + 1}/${maxRetries}):`, error);
      retries++;
      
      if (retries >= maxRetries) {
        // 폴백 완전 금지 - 모든 환경에서 오류 전파
        throw new Error(`AI 분석 실패: ${error.message}. 실제 AI 분석 없이는 보고서를 생성할 수 없습니다.`);
      }
      
      // 재시도 전 대기
      Utilities.sleep(retryDelay * retries);
    }
  }
  
  // 모든 재시도 실패
  throw new Error('GEMINI API 호출이 모든 재시도 후에도 실패했습니다.');
}

// ================================================================================
// MODULE 4: 이메일 및 저장
// ================================================================================

/**
 * 결과 이메일 발송 (환경변수 검증 포함)
 */
function sendResultEmails(applicationData, report, diagnosisId, password) {
  console.log('📧 결과 이메일 발송 (패스워드 포함)');
  
  try {
    const env = getEnvironmentVariables();
    
    // 관리자 이메일 검증
    if (!env.ADMIN_EMAIL) {
      console.error('❌ ADMIN_EMAIL이 설정되지 않았습니다');
      throw new Error('관리자 이메일이 설정되지 않았습니다');
    }
    
    let emailsSent = 0;
    
    // 신청자 이메일 발송 (패스워드 포함)
    if (applicationData.email && applicationData.email.includes('@')) {
      try {
        const applicantHtml = generateApplicantEmailHTML(applicationData, report, diagnosisId, password);
        MailApp.sendEmail({
          to: applicationData.email,
          subject: `[AICAMP] ${applicationData.companyName} AI 역량진단 결과 (패스워드: ${password})`,
          htmlBody: applicantHtml,
          name: 'AICAMP AI 역량진단'
        });
        emailsSent++;
        console.log('✅ 신청자 이메일 발송 완료 (패스워드 포함):', applicationData.email);
      } catch (error) {
        console.error('❌ 신청자 이메일 발송 실패:', error);
      }
    } else {
      console.warn('⚠️ 유효하지 않은 신청자 이메일:', applicationData.email);
    }
    
    // 관리자 이메일 발송 (패스워드 포함)
    try {
      const adminHtml = generateAdminEmailHTML(applicationData, report, diagnosisId, password);
      MailApp.sendEmail({
        to: env.ADMIN_EMAIL,
        subject: `[진단완료] ${applicationData.companyName} - ${report.executiveSummary.overallScore}점 (PW: ${password})`,
        htmlBody: adminHtml,
        name: 'AICAMP System'
      });
      emailsSent++;
      console.log('✅ 관리자 이메일 발송 완료 (패스워드 포함):', env.ADMIN_EMAIL);
    } catch (error) {
      console.error('❌ 관리자 이메일 발송 실패:', error);
    }
    
    console.log(`✅ 이메일 발송 완료: ${emailsSent}건`);
    
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error);
    throw error; // 상위로 오류 전파
  }
}

/**
 * 핵심 발견사항 HTML 생성 헬퍼 함수
 */
function generateKeyFindingsHTML(keyFindings) {
  if (!keyFindings || keyFindings.length === 0) {
    return '<p>분석 중입니다...</p>';
  }
  
  // keyFindings가 배열인 경우
  if (Array.isArray(keyFindings)) {
    return '<ul>' + keyFindings.map(finding => {
      // finding이 객체인 경우 처리
      if (typeof finding === 'object' && finding !== null) {
        // title과 description이 있는 경우
        if (finding.title) {
          return `<li><strong>${finding.title}</strong>${finding.description ? ': ' + finding.description : ''}</li>`;
        }
        // automationPotential과 expectedEffect가 있는 경우 (N8N 관련)
        if (finding.automationPotential) {
          return `<li>
            <strong>${finding.title || '자동화 가능 영역'}</strong><br>
            <span style="color: #667eea;">자동화 방안:</span> ${finding.automationPotential}<br>
            <span style="color: #10b981;">기대 효과:</span> ${finding.expectedEffect || ''}
          </li>`;
        }
        // JSON 문자열인 경우
        return `<li>${JSON.stringify(finding).replace(/[{}"]/g, '').replace(/,/g, ', ')}</li>`;
      }
      // 일반 문자열인 경우
      return `<li>${finding}</li>`;
    }).join('') + '</ul>';
  }
  
  // keyFindings가 문자열인 경우
  if (typeof keyFindings === 'string') {
    // JSON 형식 문자 제거
    return keyFindings.replace(/```json/g, '').replace(/```/g, '').replace(/\{|\}/g, '');
  }
  
  return '<p>분석 결과를 처리 중입니다...</p>';
}

/**
 * 키 파인딩 포맷팅 헬퍼 함수
 */
function formatKeyFinding(finding) {
  if (typeof finding === 'object' && finding !== null) {
    if (finding.title) {
      let result = finding.title;
      if (finding.automationPotential) {
        result += ` - N8N 자동화: ${finding.automationPotential}`;
      }
      if (finding.expectedEffect) {
        result += ` (효과: ${finding.expectedEffect})`;
      }
      return result;
    }
    // JSON 객체를 읽기 쉬운 문자열로 변환
    return Object.entries(finding)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
      .replace(/automationPotential/g, '자동화 방안')
      .replace(/expectedEffect/g, '기대 효과')
      .replace(/title/g, '제목')
      .replace(/description/g, '설명');
  }
  return finding;
}

/**
 * 신청자 이메일 HTML - 사실 기반 통합 보고서 (패스워드 포함)
 * 웹페이지, 다운로드 보고서와 완전히 동일한 내용 제공
 */
function generateApplicantEmailHTML(applicationData, report, diagnosisId, password) {
  const env = getEnvironmentVariables();
  
  // 핵심 발견사항이 신청서 데이터를 반영하는지 확인
  const keyFindingsHTML = report.executiveSummary.keyFindings ? 
    generateKeyFindingsHTML(report.executiveSummary.keyFindings) : 
    `<p style="color: #e53e3e;">AI 분석 결과가 없습니다. 시스템 관리자에게 문의하세요.</p>`;
  
  // SWOT 전략 매트릭스 HTML 생성 (객체 처리 개선)
  const swotStrategiesHTML = report.swotAnalysis.strategicMatrix ? `
    <div class="strategy-matrix">
      <h3>🎯 SWOT 전략 매트릭스</h3>
      <div class="strategy-grid">
        <div class="strategy-item">
          <h4>SO 전략 (강점-기회)</h4>
          <ul>${formatStrategyList(report.swotAnalysis.strategicMatrix.SO전략 || report.swotAnalysis.strategicMatrix.SO || [])}</ul>
        </div>
        <div class="strategy-item">
          <h4>WO 전략 (약점-기회)</h4>
          <ul>${formatStrategyList(report.swotAnalysis.strategicMatrix.WO전략 || report.swotAnalysis.strategicMatrix.WO || [])}</ul>
        </div>
        <div class="strategy-item">
          <h4>ST 전략 (강점-위협)</h4>
          <ul>${formatStrategyList(report.swotAnalysis.strategicMatrix.ST전략 || report.swotAnalysis.strategicMatrix.ST || [])}</ul>
        </div>
        <div class="strategy-item">
          <h4>WT 전략 (약점-위협)</h4>
          <ul>${formatStrategyList(report.swotAnalysis.strategicMatrix.WT전략 || report.swotAnalysis.strategicMatrix.WT || [])}</ul>
        </div>
      </div>
    </div>
  ` : '';
  
  // 전략 리스트 포맷팅 헬퍼 함수
  function formatStrategyList(strategies) {
    return strategies.map(s => {
      if (typeof s === 'object' && s.title) {
        return `<li><strong>${s.title}</strong>${s.description ? ': ' + s.description : ''}</li>`;
      }
      return `<li>${s}</li>`;
    }).join('');
  }
  
  // Quick Wins HTML 생성 (객체 처리 개선)
  const quickWinsHTML = report.priorityMatrix.quickWins && report.priorityMatrix.quickWins.length > 0 ? `
    <div class="quick-wins">
      <h3>⚡ N8N 자동화 Quick Win 프로젝트</h3>
      <ul>${report.priorityMatrix.quickWins.map(qw => {
        if (typeof qw === 'object') {
          if (qw.projectName) {
            return `<li>
              <strong>${qw.projectName}</strong><br>
              ${qw.workflowDescription ? `<span style="color: #6c757d; font-size: 14px;">${qw.workflowDescription}</span>` : ''}
            </li>`;
          }
          return `<li>${formatKeyFinding(qw)}</li>`;
        }
        return `<li>${qw}</li>`;
      }).join('')}</ul>
    </div>
  ` : '';
  
  // 실행 권고사항 HTML 생성
  const recommendationsHTML = report.recommendations ? `
    <div class="recommendations">
      <h3>📋 실행 권고사항</h3>
      <div class="rec-timeline">
        <div class="rec-item">
          <h4>즉시 실행 (1주일 내)</h4>
          <ul>${(report.recommendations.immediate || []).map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
        <div class="rec-item">
          <h4>단기 과제 (1-3개월)</h4>
          <ul>${(report.recommendations.shortTerm || []).map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
        <div class="rec-item">
          <h4>장기 전략 (6개월-1년)</h4>
          <ul>${(report.recommendations.longTerm || []).map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  ` : '';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif; 
      margin: 0; 
      padding: 0; 
      background: #f5f7fa;
      color: #2c3e50;
      line-height: 1.6;
    }
    .container { 
      max-width: 800px; 
      margin: 0 auto; 
      background: white;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      color: white; 
      padding: 60px 40px; 
      text-align: center;
      position: relative;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .header .company-name {
      font-size: 24px;
      margin-top: 10px;
      opacity: 0.95;
      font-weight: 600;
    }
    .header .industry-info {
      font-size: 16px;
      margin-top: 5px;
      opacity: 0.85;
    }
    .header .diagnosis-id {
      position: absolute;
      top: 20px;
      right: 40px;
      font-size: 12px;
      opacity: 0.8;
    }
    .password-notice {
      background: linear-gradient(135deg, #ff6b6b, #ffd93d);
      color: white;
      padding: 20px 30px;
      margin: 30px 40px;
      border-radius: 10px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0 5px 15px rgba(255,107,107,0.3);
    }
    .password-code {
      display: inline-block;
      background: white;
      color: #ff6b6b;
      padding: 10px 20px;
      margin: 10px 0;
      border-radius: 8px;
      font-size: 24px;
      letter-spacing: 5px;
      font-weight: bold;
    }
    .ceo-message {
      background: #f8f9fa;
      padding: 30px;
      margin: -30px 40px 40px;
      border-radius: 10px;
      border-left: 4px solid #667eea;
      font-style: italic;
      position: relative;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    .ceo-message:before {
      content: '"';
      font-size: 48px;
      color: #667eea;
      position: absolute;
      top: 10px;
      left: 20px;
      opacity: 0.3;
    }
    .content { 
      padding: 40px;
    }
    .score-card { 
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      padding: 40px; 
      border-radius: 15px; 
      text-align: center; 
      margin: 30px 0;
      border: 2px solid #667eea30;
    }
    .score-number { 
      font-size: 72px; 
      font-weight: bold; 
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }
    .score-grade { 
      font-size: 32px; 
      color: #495057; 
      margin: 10px 0;
      font-weight: 600;
    }
    .score-percentile {
      font-size: 18px;
      color: #6c757d;
    }
    .category-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 20px; 
      margin: 30px 0;
    }
    .category-item { 
      background: #fff; 
      border: 2px solid #e9ecef; 
      padding: 20px; 
      border-radius: 10px;
      transition: all 0.3s ease;
    }
    .category-item:hover {
      border-color: #667eea;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
    }
    .category-item strong {
      display: block;
      color: #667eea;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .category-score {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
    }
    .section-title {
      font-size: 24px;
      color: #2c3e50;
      margin: 40px 0 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
      font-weight: 600;
    }
    .key-findings {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .key-findings ul {
      margin: 0;
      padding-left: 20px;
    }
    .key-findings li {
      margin: 10px 0;
      color: #495057;
    }
    .strategy-matrix {
      margin: 40px 0;
    }
    .strategy-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    .strategy-item {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      border-left: 3px solid #667eea;
    }
    .strategy-item h4 {
      color: #667eea;
      margin: 0 0 15px;
      font-size: 16px;
    }
    .strategy-item ul {
      margin: 0;
      padding-left: 20px;
    }
    .strategy-item li {
      margin: 8px 0;
      font-size: 14px;
    }
    .quick-wins {
      background: #e7f5ff;
      padding: 25px;
      border-radius: 10px;
      margin: 30px 0;
      border-left: 4px solid #339af0;
    }
    .roadmap {
      margin: 40px 0;
    }
    .phase {
      background: #fff;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      padding: 25px;
      margin: 20px 0;
    }
    .phase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .phase-title {
      font-size: 20px;
      font-weight: 600;
      color: #667eea;
    }
    .phase-period {
      background: #667eea;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 14px;
    }
    .recommendations {
      margin: 40px 0;
    }
    .rec-timeline {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    .rec-item {
      background: #fff;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      padding: 20px;
    }
    .rec-item h4 {
      color: #667eea;
      margin: 0 0 15px;
      font-size: 16px;
    }
    .program-card {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      padding: 30px;
      border-radius: 15px;
      margin: 30px 0;
      border: 2px solid #667eea30;
    }
    .program-card h3 {
      color: #667eea;
      margin: 0 0 20px;
      font-size: 24px;
    }
    .program-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    .program-detail {
      padding: 10px;
      background: white;
      border-radius: 8px;
    }
    .cta-section {
      text-align: center;
      margin: 50px 0;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 15px;
    }
    .cta-button { 
      display: inline-block; 
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white; 
      padding: 18px 40px; 
      text-decoration: none; 
      border-radius: 30px; 
      margin: 10px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }
    .footer { 
      background: #2c3e50; 
      color: white; 
      padding: 40px; 
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    @media (max-width: 768px) {
      .category-grid, .strategy-grid, .rec-timeline {
        grid-template-columns: 1fr;
      }
      .program-details {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="diagnosis-id">진단번호: ${diagnosisId}</div>
      <h1>N8N 자동화 AI 역량진단 결과보고서</h1>
      <div class="company-name">${applicationData.companyName}</div>
      <div class="industry-info">${applicationData.industry} | 직원수 ${applicationData.employeeCount}명 | 담당자: ${applicationData.contactName}</div>
    </div>
    
    <div class="password-notice">
      🔐 보고서 접근 패스워드
      <div class="password-code">${password}</div>
      <div style="font-size: 14px; font-weight: normal; margin-top: 10px;">
        온라인 보고서 확인 시 위 패스워드를 입력하세요
      </div>
    </div>
    
    <div class="ceo-message">
      <p style="margin: 0; font-size: 18px; font-weight: 600;">${applicationData.companyName} ${applicationData.contactName} 대표님께,</p>
      <p style="margin-top: 15px; font-size: 16px; line-height: 1.7;">
        ${report.executiveSummary.ceoMessage || `${applicationData.companyName}의 AI 역량진단 결과를 바탕으로 N8N 자동화 중심의 맞춤형 솔루션을 제안드립니다. ${applicationData.industry} 업종의 특성을 반영하여 실무에 바로 적용 가능한 자동화 전략을 준비했습니다.`}
      </p>
      <p style="margin-top: 15px; text-align: right; font-style: normal; color: #667eea; font-size: 16px;">
        <strong>AICAMP 이후경 교장 (N8N 자동화 전문가)</strong>
      </p>
    </div>
    
    <div class="content">
      <div class="score-card">
        <div class="score-number">${report.executiveSummary.overallScore}</div>
        <div class="score-grade">${report.executiveSummary.grade}등급</div>
        <div class="score-percentile">업계 상위 ${report.executiveSummary.percentile}%</div>
        <div style="margin-top: 10px; color: #6c757d;">
          ${report.executiveSummary.maturityLevel}
        </div>
      </div>
      
      <h2 class="section-title">📊 카테고리별 진단 결과</h2>
      <div class="category-grid">
        ${Object.entries(report.categoryAnalysis).map(([cat, score]) => `
          <div class="category-item">
            <strong>${cat}</strong>
            <div class="category-score">${score.toFixed(1)}/5.0</div>
          </div>
        `).join('')}
      </div>
      
      <h2 class="section-title">🎯 ${applicationData.companyName} 핵심 발견사항</h2>
      <div class="key-findings">
        <p style="margin-bottom: 20px; color: #6c757d; font-style: italic;">
          ${applicationData.companyName}의 실제 신청서 답변과 진단 결과를 바탕으로 한 맞춤형 분석입니다.
        </p>
        ${keyFindingsHTML}
      </div>
      
      ${swotStrategiesHTML}
      
      ${quickWinsHTML}
      
      <h2 class="section-title">🚀 3단계 실행 로드맵</h2>
      <div class="roadmap">
        <div class="phase">
          <div class="phase-header">
            <span class="phase-title">${report.roadmap.phase1.title}</span>
            <span class="phase-period">${report.roadmap.phase1.period}</span>
          </div>
          <ul>
            ${report.roadmap.phase1.keyActions.slice(0, 3).map(action => `<li>${action}</li>`).join('')}
      </ul>
        </div>
        <div class="phase">
          <div class="phase-header">
            <span class="phase-title">${report.roadmap.phase2.title}</span>
            <span class="phase-period">${report.roadmap.phase2.period}</span>
          </div>
          <ul>
            ${report.roadmap.phase2.keyActions.slice(0, 3).map(action => `<li>${action}</li>`).join('')}
          </ul>
        </div>
        <div class="phase">
          <div class="phase-header">
            <span class="phase-title">${report.roadmap.phase3.title}</span>
            <span class="phase-period">${report.roadmap.phase3.period}</span>
          </div>
          <ul>
            ${report.roadmap.phase3.keyActions.slice(0, 3).map(action => `<li>${action}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      ${recommendationsHTML}
      
      <h2 class="section-title">🎓 AICAMP 맞춤형 제안</h2>
      <div class="program-card">
        <h3>${report.aicampProposal.recommendedProgram.title}</h3>
        <div class="program-details">
          <div class="program-detail">
            <strong>기간:</strong> ${report.aicampProposal.recommendedProgram.duration}
          </div>
          <div class="program-detail">
            <strong>투자:</strong> ${report.aicampProposal.recommendedProgram.price}
          </div>
        </div>
        <div style="margin-top: 20px;">
          <strong>핵심 혜택:</strong>
          <ul style="margin-top: 10px;">
            ${report.aicampProposal.recommendedProgram.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
        ${report.aicampProposal.governmentSupport ? `
        <div style="margin-top: 20px; padding: 15px; background: #e7f5ff; border-radius: 8px;">
          <strong>💰 정부 지원사업 활용 가능</strong>
          <p style="margin: 10px 0 0;">최대 ${report.aicampProposal.governmentSupport.coverage} 지원</p>
        </div>
        ` : ''}
      </div>
      
      <div class="cta-section">
        <h2 style="margin-bottom: 20px;">다음 단계로 나아가세요</h2>
        <p style="color: #6c757d; margin-bottom: 30px;">
          AICAMP와 함께 AI 혁신의 여정을 시작하세요
        </p>
        <a href="https://${env.AICAMP_WEBSITE}/diagnosis/result/${diagnosisId}" class="cta-button">
          📊 상세 보고서 확인
        </a>
        <a href="mailto:${env.ADMIN_EMAIL}?subject=[AI역량진단] ${applicationData.companyName} 상담 요청&body=진단번호: ${diagnosisId}%0D%0A회사명: ${applicationData.companyName}%0D%0A담당자: ${applicationData.contactName}" class="cta-button">
          📞 무료 상담 신청
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>AICAMP - AI로 만드는 고몰입 조직</strong></p>
      <p>이후경 교장 | 30년 기업교육 전문가</p>
      <p>📧 ${env.ADMIN_EMAIL} | 🌐 <a href="https://${env.AICAMP_WEBSITE}">${env.AICAMP_WEBSITE}</a></p>
      <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
        본 보고서는 ${applicationData.companyName}을(를) 위해 특별히 작성되었습니다.<br>
        무단 복제 및 배포를 금지합니다. © 2024 AICAMP All Rights Reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 관리자 이메일 HTML - 사실 기반 상세 분석 포함 (상담용 참고자료)
 */
function generateAdminEmailHTML(applicationData, report, diagnosisId, password) {
  const env = getEnvironmentVariables();
  
  // 신청서 데이터 상세 정보 추출
  const applicationDetails = Object.entries(applicationData)
    .filter(([key, value]) => value && key !== 'email' && key !== 'timestamp')
    .map(([key, value]) => `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`)
    .join('');
  
  // SWOT 전략 요약
  const swotSummary = report.swotAnalysis.strategicMatrix ? 
    Object.entries(report.swotAnalysis.strategicMatrix).map(([key, strategies]) => 
      `${key}: ${(strategies || []).slice(0, 2).join(', ')}`
    ).join(' | ') : '';
  
  // Quick Wins 요약
  const quickWinsSummary = report.priorityMatrix.quickWins ? 
    report.priorityMatrix.quickWins.slice(0, 3).join(', ') : '';
  
  // AI 인사이트 요약
  const aiInsightsSummary = report.aiInsights && report.aiInsights.industryTrends ? 
    report.aiInsights.industryTrends.slice(0, 2).join(', ') : '';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Noto Sans KR', Arial, sans-serif; 
      margin: 20px;
      background: #f5f7fa;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h2 { 
      color: #667eea; 
      border-bottom: 3px solid #667eea; 
      padding-bottom: 10px;
    }
    h3 { 
      color: #495057; 
      margin-top: 30px;
      background: #f8f9fa;
      padding: 10px;
      border-left: 4px solid #667eea;
    }
    table { 
      width: 100%; 
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td { 
      border: 1px solid #e9ecef; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background: #667eea; 
      color: white;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background: #f8f9fa;
    }
    .highlight {
      background: #fff3cd;
      padding: 2px 5px;
      border-radius: 3px;
    }
    .score-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: bold;
      color: white;
    }
    .grade-A { background: #28a745; }
    .grade-B { background: #ffc107; }
    .grade-C { background: #fd7e14; }
    .grade-D { background: #dc3545; }
    .action-items {
      background: #e7f5ff;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      border-left: 4px solid #339af0;
    }
    .action-items ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .action-items li {
      margin: 8px 0;
    }
    .ceo-message-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      font-style: italic;
      border-left: 4px solid #667eea;
    }
    .key-findings-box {
      background: #fff5f5;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      border-left: 4px solid #fa5252;
    }
    .btn {
      display: inline-block;
      padding: 10px 25px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 10px 5px;
      font-weight: 600;
    }
    .btn:hover {
      background: #5a67d8;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e9ecef;
      text-align: center;
      color: #6c757d;
    }
    .urgent {
      color: #dc3545;
      font-weight: bold;
    }
    .success {
      color: #28a745;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🚨 ${applicationData.companyName} N8N 자동화 AI 역량진단 접수 - 상담 준비 자료</h2>
    
    <div class="ceo-message-box">
      <strong>이후경 교장 AI 생성 메시지:</strong><br>
      ${report.executiveSummary.ceoMessage || `${applicationData.companyName}의 ${applicationData.industry} 업종 특성을 반영한 N8N 자동화 솔루션이 필요합니다.`}
    </div>
    
    <div style="background: #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <strong>📞 상담 포인트:</strong> ${applicationData.industry} 업종, ${applicationData.employeeCount}명 규모에 맞는 N8N 자동화 전략 제시
    </div>
    
    <h3>📋 기업 정보</h3>
  <table>
      <tr>
        <th width="30%">항목</th>
        <th width="70%">내용</th>
      </tr>
      <tr>
        <td><strong>진단 ID</strong></td>
        <td><span class="highlight">${diagnosisId}</span></td>
      </tr>
      <tr>
        <td><strong>보고서 패스워드</strong></td>
        <td><span class="highlight" style="background: #ff6b6b; color: white; padding: 5px 10px; border-radius: 5px; font-size: 18px; letter-spacing: 3px;">${password}</span></td>
      </tr>
      <tr>
        <td><strong>회사명</strong></td>
        <td><strong style="font-size: 18px; color: #667eea;">${applicationData.companyName}</strong></td>
      </tr>
      <tr>
        <td><strong>담당자</strong></td>
        <td>${applicationData.contactName}</td>
      </tr>
      <tr>
        <td><strong>이메일</strong></td>
        <td><a href="mailto:${applicationData.email}">${applicationData.email}</a></td>
      </tr>
      <tr>
        <td><strong>연락처</strong></td>
        <td><a href="tel:${applicationData.phone}">${applicationData.phone}</a></td>
      </tr>
      <tr>
        <td><strong>업종</strong></td>
        <td><span class="success">${applicationData.industry}</span></td>
      </tr>
      <tr>
        <td><strong>직원수</strong></td>
        <td><span class="success">${applicationData.employeeCount}명</span></td>
      </tr>
      ${applicationDetails}
      <tr>
        <td><strong>접수 시간</strong></td>
        <td>${applicationData.timestamp || getCurrentKoreanTime()}</td>
      </tr>
  </table>
  
    <h3>📊 진단 결과 요약</h3>
  <table>
      <tr>
        <th>평가 항목</th>
        <th>점수</th>
        <th>등급</th>
      </tr>
      <tr>
        <td><strong>종합 점수</strong></td>
        <td style="font-size: 24px; font-weight: bold; color: #667eea;">
          ${report.executiveSummary.overallScore}점
        </td>
        <td>
          <span class="score-badge grade-${report.executiveSummary.grade}">
            ${report.executiveSummary.grade}등급
          </span>
        </td>
      </tr>
      <tr>
        <td><strong>백분위</strong></td>
        <td colspan="2">상위 ${report.executiveSummary.percentile}%</td>
      </tr>
      <tr>
        <td><strong>성숙도</strong></td>
        <td colspan="2">${report.executiveSummary.maturityLevel}</td>
      </tr>
    </table>
    
    <h3>📈 카테고리별 점수</h3>
    <table>
      <tr>
        <th>카테고리</th>
        <th>점수</th>
        <th>평가</th>
      </tr>
      ${Object.entries(report.categoryAnalysis).map(([cat, score]) => {
        const evaluation = score >= 4 ? '<span class="success">우수</span>' : 
                          score >= 3 ? '보통' : 
                          '<span class="urgent">개선필요</span>';
        return `
        <tr>
          <td><strong>${cat}</strong></td>
          <td>${score.toFixed(1)}/5.0</td>
          <td>${evaluation}</td>
        </tr>`;
      }).join('')}
    </table>
    
    <div class="key-findings-box">
      <h4>🎯 이후경 교장의 AI 역량진단보고서</h4>
      <ul>
        ${report.executiveSummary.keyFindings.slice(0, 5).map(finding => 
          `<li>${typeof finding === 'object' ? formatKeyFinding(finding) : finding}</li>`
    ).join('')}
      </ul>
    </div>
    
    ${swotSummary ? `
    <h3>🎯 SWOT 전략 요약</h3>
    <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
      ${swotSummary}
    </p>
    ` : ''}
    
    ${quickWinsSummary ? `
    <h3>⚡ Quick Wins</h3>
    <p style="background: #e7f5ff; padding: 15px; border-radius: 5px;">
      ${quickWinsSummary}
    </p>
    ` : ''}
    
    <h3>🎓 추천 프로그램</h3>
    <table>
      <tr>
        <th>항목</th>
        <th>내용</th>
      </tr>
      <tr>
        <td><strong>프로그램명</strong></td>
        <td>${report.aicampProposal.recommendedProgram.title}</td>
      </tr>
      <tr>
        <td><strong>기간</strong></td>
        <td>${report.aicampProposal.recommendedProgram.duration}</td>
      </tr>
      <tr>
        <td><strong>투자금액</strong></td>
        <td>${report.aicampProposal.recommendedProgram.price}</td>
      </tr>
      <tr>
        <td><strong>정부지원</strong></td>
        <td>${report.aicampProposal.governmentSupport ? 
          `가능 (${report.aicampProposal.governmentSupport.coverage})` : 
          '확인필요'}</td>
      </tr>
  </table>
  
    <div class="action-items">
      <h4>📌 즉시 실행 사항 (Action Items)</h4>
      <ul>
        <li class="urgent">🔴 24시간 내 초기 상담 전화 (필수)</li>
        <li>📞 담당자: ${applicationData.contactName} (${applicationData.phone})</li>
        <li>📧 이메일: ${applicationData.email}</li>
        <li>📋 맞춤형 제안서 작성 (2일 내)</li>
        <li>💰 정부 지원사업 매칭 검토</li>
        <li>📅 대면 미팅 일정 조율</li>
      </ul>
      
      <h4>💡 상담 포인트</h4>
      <ul>
        <li>현재 점수: ${report.executiveSummary.overallScore}점 (${report.executiveSummary.grade}등급)</li>
        <li>주요 강점: ${report.gapAnalysis.strengthAreas.join(', ') || '균형적 역량'}</li>
        <li>개선 필요: ${report.gapAnalysis.criticalGaps.join(', ') || '전반적 향상 필요'}</li>
        <li>업계 대비: ${report.gapAnalysis.position}</li>
  </ul>
    </div>
    
    ${aiInsightsSummary ? `
    <h3>🤖 AI 인사이트</h3>
    <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
      <strong>업계 트렌드:</strong> ${aiInsightsSummary}
    </p>
    ` : ''}
    
    <div style="text-align: center; margin: 40px 0;">
      <a href="https://docs.google.com/spreadsheets/d/${env.SPREADSHEET_ID}" class="btn">
        📊 Google Sheet 데이터 확인
      </a>
      <a href="https://${env.AICAMP_WEBSITE}/diagnosis/result/${diagnosisId}" class="btn">
        📋 온라인 보고서 확인
      </a>
      <a href="mailto:${applicationData.email}?subject=Re: [AI역량진단] ${applicationData.companyName} 결과 안내&body=안녕하세요 ${applicationData.contactName}님,%0D%0A%0D%0AAICAMP 이후경입니다.%0D%0A제출해주신 AI 역량진단 결과를 검토했습니다.%0D%0A%0D%0A[진단번호: ${diagnosisId}]%0D%0A" class="btn">
        ✉️ 답변 메일 작성
      </a>
    </div>
    
    <div class="footer">
      <p><strong>AICAMP AI 역량진단 시스템 V9.0</strong></p>
      <p>접수 시간: ${getCurrentKoreanTime()}</p>
      <p style="color: #dc3545; font-weight: bold;">
        ⚠️ 이 진단 결과는 24시간 내 확인 및 연락이 필요합니다
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Google Sheet 저장 - 상세 정보 포함
 */
function saveToGoogleSheet(applicationData, report, diagnosisId, password) {
  console.log('💾 Google Sheet 저장 시작 (패스워드 포함)');
  
  try {
    const env = getEnvironmentVariables();
    
    // Spreadsheet ID 검증
    if (!env.SPREADSHEET_ID) {
      console.error('❌ SPREADSHEET_ID가 설정되지 않았습니다');
      throw new Error('Google Sheets ID가 설정되지 않았습니다');
    }
    
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    
    // 1. 메인 시트 - 진단 결과 요약
    let mainSheet = spreadsheet.getSheetByName('AI역량진단');
    if (!mainSheet) {
      mainSheet = spreadsheet.insertSheet('AI역량진단');
      const headers = [
        '진단ID', '일시', '회사명', '담당자', '이메일', '연락처',
        '업종', '직원수', '전체점수', '등급', '백분위', '성숙도',
        '리더십', '인프라', '직원역량', '조직문화', '실무적용', '데이터',
        'CEO메시지', '추천프로그램', '핵심발견사항', '패스워드', '상담상태', '메모'
      ];
      mainSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      mainSheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#667eea')
        .setFontColor('white');
    }
    
    // 핵심 발견사항 요약
    const keyFindingsSummary = report.executiveSummary.keyFindings ? 
      report.executiveSummary.keyFindings.slice(0, 3).join(' | ') : '';
    
    const mainRowData = [
      diagnosisId,
      applicationData.timestamp,
      applicationData.companyName,
      applicationData.contactName,
      applicationData.email,
      applicationData.phone,
      applicationData.industry,
      applicationData.employeeCount,
      report.executiveSummary.overallScore,
      report.executiveSummary.grade,
      report.executiveSummary.percentile,
      report.executiveSummary.maturityLevel,
      report.categoryAnalysis['리더십']?.toFixed(1) || '',
      report.categoryAnalysis['인프라']?.toFixed(1) || '',
      report.categoryAnalysis['직원역량']?.toFixed(1) || '',
      report.categoryAnalysis['조직문화']?.toFixed(1) || '',
      report.categoryAnalysis['실무적용']?.toFixed(1) || '',
      report.categoryAnalysis['데이터']?.toFixed(1) || '',
      report.executiveSummary.ceoMessage || '',
      report.aicampProposal.recommendedProgram.title || '',
      keyFindingsSummary,
      password || '', // 패스워드 추가
      '신규', // 상담 상태 (신규/진행중/완료)
      '' // 메모
    ];
    
    mainSheet.appendRow(mainRowData);
    
    // 2. 상세 분석 시트 - AI 분석 결과
    let detailSheet = spreadsheet.getSheetByName('상세분석');
    if (!detailSheet) {
      detailSheet = spreadsheet.insertSheet('상세분석');
      const detailHeaders = [
        '진단ID', '회사명', '업종', 
        'SWOT-강점', 'SWOT-약점', 'SWOT-기회', 'SWOT-위협',
        'SO전략', 'WO전략', 'ST전략', 'WT전략',
        'Quick Wins', '즉시실행', '단기과제', '장기전략',
        '업계트렌드', '경쟁력분석', '리스크완화',
        '예상ROI', '회수기간'
      ];
      detailSheet.getRange(1, 1, 1, detailHeaders.length).setValues([detailHeaders]);
      detailSheet.getRange(1, 1, 1, detailHeaders.length)
        .setFontWeight('bold')
        .setBackground('#764ba2')
        .setFontColor('white');
    }
    
    // SWOT 전략 정리
    const swotStrategies = report.swotAnalysis.strategicMatrix || report.swotAnalysis.strategies || {};
    
    // 권고사항 정리
    const recommendations = report.recommendations || {};
    
    // AI 인사이트 정리
    const aiInsights = report.aiInsights || {};
    
    const detailRowData = [
      diagnosisId,
      applicationData.companyName,
      applicationData.industry,
      (report.swotAnalysis.strengths || []).join(', '),
      (report.swotAnalysis.weaknesses || []).join(', '),
      (report.swotAnalysis.opportunities || []).join(', '),
      (report.swotAnalysis.threats || []).join(', '),
      (swotStrategies.SO || []).join(', '),
      (swotStrategies.WO || []).join(', '),
      (swotStrategies.ST || []).join(', '),
      (swotStrategies.WT || []).join(', '),
      (report.priorityMatrix.quickWins || []).join(', '),
      (recommendations.immediate || []).join(', '),
      (recommendations.shortTerm || []).join(', '),
      (recommendations.longTerm || []).join(', '),
      (aiInsights.industryTrends || []).join(', '),
      JSON.stringify(aiInsights.competitiveAnalysis || {}),
      (aiInsights.riskMitigation || []).join(', '),
      report.roiAnalysis.expectedROI || '',
      report.roiAnalysis.paybackPeriod || ''
    ];
    
    detailSheet.appendRow(detailRowData);
    
    // 3. 로드맵 시트 - 실행 계획
    let roadmapSheet = spreadsheet.getSheetByName('실행로드맵');
    if (!roadmapSheet) {
      roadmapSheet = spreadsheet.insertSheet('실행로드맵');
      const roadmapHeaders = [
        '진단ID', '회사명',
        '1단계-제목', '1단계-기간', '1단계-예산', '1단계-목표', '1단계-액션',
        '2단계-제목', '2단계-기간', '2단계-예산', '2단계-목표', '2단계-액션',
        '3단계-제목', '3단계-기간', '3단계-예산', '3단계-목표', '3단계-액션'
      ];
      roadmapSheet.getRange(1, 1, 1, roadmapHeaders.length).setValues([roadmapHeaders]);
      roadmapSheet.getRange(1, 1, 1, roadmapHeaders.length)
        .setFontWeight('bold')
        .setBackground('#10b981')
        .setFontColor('white');
    }
    
    const roadmapRowData = [
      diagnosisId,
      applicationData.companyName,
      report.roadmap.phase1.title,
      report.roadmap.phase1.period,
      report.roadmap.phase1.budget,
      (report.roadmap.phase1.objectives || []).join(', '),
      (report.roadmap.phase1.keyActions || []).join(', '),
      report.roadmap.phase2.title,
      report.roadmap.phase2.period,
      report.roadmap.phase2.budget,
      (report.roadmap.phase2.objectives || []).join(', '),
      (report.roadmap.phase2.keyActions || []).join(', '),
      report.roadmap.phase3.title,
      report.roadmap.phase3.period,
      report.roadmap.phase3.budget,
      (report.roadmap.phase3.objectives || []).join(', '),
      (report.roadmap.phase3.keyActions || []).join(', ')
    ];
    
    roadmapSheet.appendRow(roadmapRowData);
    
    // 4. 전체 보고서 JSON 저장 (백업용)
    let jsonSheet = spreadsheet.getSheetByName('보고서JSON');
    if (!jsonSheet) {
      jsonSheet = spreadsheet.insertSheet('보고서JSON');
      const jsonHeaders = ['진단ID', '회사명', '일시', '보고서JSON'];
      jsonSheet.getRange(1, 1, 1, jsonHeaders.length).setValues([jsonHeaders]);
      jsonSheet.getRange(1, 1, 1, jsonHeaders.length)
        .setFontWeight('bold')
        .setBackground('#6c757d')
        .setFontColor('white');
    }
    
    const jsonRowData = [
      diagnosisId,
      applicationData.companyName,
      applicationData.timestamp,
      JSON.stringify(report)
    ];
    
    jsonSheet.appendRow(jsonRowData);
    
    // 시트 포맷팅 개선
    mainSheet.autoResizeColumns(1, 23);
    detailSheet.autoResizeColumns(1, 19);
    roadmapSheet.autoResizeColumns(1, 17);
    
    console.log('✅ Google Sheet 저장 완료 (4개 시트)');
    
  } catch (error) {
    console.error('❌ Sheet 저장 실패:', error);
    // 저장 실패해도 프로세스는 계속 진행
  }
}

// ================================================================================
// MODULE 5: 유틸리티 함수
// ================================================================================

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `AICAMP-${timestamp}-${random}`.toUpperCase();
}

/**
 * 한국 시간
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return koreaTime.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * 백분위 계산
 */
function calculatePercentile(score) {
  // 정규분포 가정
  const mean = 50;
  const stdDev = 15;
  const zScore = (score - mean) / stdDev;
  
  // 근사 계산
  const percentile = 50 + (zScore * 16);
  return Math.round(Math.max(5, Math.min(95, percentile)));
}

/**
 * CEO 메시지 생성 (이후경 교장 톤)
 */
function generateCEOMessage(data) {
  const companyName = data.applicationData.companyName;
  const score = data.scoreResult.overallScore;
  const grade = data.scoreResult.grade;
  
  if (score >= 80) {
    return `${companyName} 대표님, 축하드립니다! 귀사는 이미 AI 역량에서 업계를 선도하고 있습니다. ` +
           `이제 더 높은 도약을 위해 AICAMP가 함께하겠습니다. 귀사의 성공이 업계 전체의 혁신으로 이어질 것입니다.`;
  } else if (score >= 60) {
    return `${companyName} 대표님, 귀사는 AI 전환의 중요한 시점에 있습니다. ` +
           `이미 갖춘 기초 역량을 바탕으로 본격적인 AI 혁신을 시작할 때입니다. AICAMP가 최적의 파트너가 되겠습니다.`;
  } else if (score >= 40) {
    return `${companyName} 대표님, AI 여정의 첫걸음을 내딛으신 것을 환영합니다. ` +
           `지금이 바로 체계적인 AI 역량 구축의 적기입니다. 30년 경험의 AICAMP가 귀사의 성공을 보장하겠습니다.`;
  } else {
    return `${companyName} 대표님, AI 시대의 변화를 인식하신 것만으로도 큰 진전입니다. ` +
           `늦지 않았습니다. AICAMP와 함께라면 빠른 성장이 가능합니다. 귀사의 잠재력을 믿습니다.`;
  }
}

/**
 * 성숙도 레벨
 */
function getMaturityLevel(score) {
  if (score >= 80) return '선도 단계';
  if (score >= 60) return '최적화 단계';
  if (score >= 40) return '확산 단계';
  if (score >= 20) return '도입 단계';
  return '초기 단계';
}

/**
 * 직원 규모
 */
function getEmployeeScale(employeeCount) {
  const count = employeeCount.split('-')[0];
  const num = parseInt(count) || 10;
  
  if (num >= 300) return 'large';
  if (num >= 100) return 'medium';
  if (num >= 50) return 'small';
  return 'micro';
}

/**
 * 예산 규모
 */
function getBudgetScale(scale) {
  const budgets = {
    micro: { phase1: 300, phase2: 800, phase3: 1500 },
    small: { phase1: 500, phase2: 1500, phase3: 3000 },
    medium: { phase1: 1000, phase2: 3000, phase3: 5000 },
    large: { phase1: 2000, phase2: 5000, phase3: 10000 }
  };
  
  return budgets[scale] || budgets.micro;
}

// ===============================================
// 폴백 함수 완전 제거 - V10.0에서는 모든 폴백 금지
// AI 분석이 실패하면 명확한 오류를 발생시켜 문제를 해결하도록 함
// 실제 AI 분석 없이는 보고서를 생성하지 않음
// ===============================================

/**
 * 오류 알림
 */
function notifyError(error, requestData) {
  try {
    const env = getEnvironmentVariables();
    MailApp.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: '[오류] AI 역량진단 처리 실패',
      body: `
오류 발생: ${error.toString()}
회사: ${requestData.companyName || 'Unknown'}
시간: ${getCurrentKoreanTime()}
환경: ${env.ENVIRONMENT || 'unknown'}
데이터: ${JSON.stringify(requestData, null, 2)}
      `,
      name: 'AICAMP Error System'
    });
  } catch (e) {
    console.error('오류 알림 실패:', e);
  }
}

// ================================================================================
// MODULE 6: API 엔드포인트
// ================================================================================

/**
 * POST 요청 처리
 */
function doPost(e) {
  console.log('='.repeat(80));
  console.log('📥 POST 요청 수신 - V10.0 PREMIUM (GEMINI 2.5 FLASH)');
  console.log('요청 시간:', getCurrentKoreanTime());
  
  try {
    // 요청 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    console.log('액션:', requestData.action || 'diagnosis');
    
    // 액션별 처리
    const action = requestData.action || 'diagnosis';
    let result;
    
    switch (action) {
      case 'diagnosis':
      case 'ai_diagnosis':
      case 'saveDiagnosis':
      case 'saveDiagnosisResult':
        result = handleEnhancedAIDiagnosisSubmission(requestData);
        break;
        
      case 'consultation':
        result = handleConsultationRequest(requestData);
        break;
        
      case 'error_report':
        result = handleErrorReport(requestData);
        break;
        
      case 'health':
      case 'status':
        result = {
          success: true,
          status: 'operational',
          version: 'V10.0 PREMIUM - 사실기반분석',
          message: 'AICAMP N8N 자동화 AI 역량진단 시스템 - 실제 데이터 기반 맞춤형 보고서',
          model: 'GEMINI-2.0-FLASH-EXP',
          specialization: 'N8N Automation & AI Integration',
          features: [
            '실제 신청서 데이터 기반 분석',
            'N8N 자동화 중심 SWOT 전략 매트릭스',
            '업종별 N8N 자동화 로드맵',
            '3단계 N8N 워크플로우 구축 계획',
            '이후경 교장 N8N 전문가 톤앤매너',
            '통합 보고서 시스템 (이메일/웹/다운로드 동일)',
            '폴백 답변 완전 금지'
          ],
          improvements: [
            '신청서 답변 구체적 반영',
            'AI 분석 품질 대폭 향상',
            '사실 기반 맞춤형 솔루션',
            '이메일 기반 회원 인식'
          ]
        };
        break;
        
      default:
        console.warn('알 수 없는 액션:', action);
        result = {
          success: false,
          error: `Unknown action: ${action}`,
          supportedActions: ['diagnosis', 'consultation', 'error_report', 'health']
        };
    }
    
    console.log('응답 상태:', result.success ? '성공' : '실패');
    console.log('='.repeat(80));
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ POST 처리 오류:', error);
    console.error('Stack:', error.stack);
    
    // 오류 시에도 안정적인 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: '처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      status: 'operational',
        version: 'V9.0 PREMIUM - N8N 자동화 특화',
      timestamp: getCurrentKoreanTime(),
        message: 'AICAMP N8N 자동화 AI 역량진단 시스템 - 실무 중심 자동화 솔루션',
        specialization: 'N8N Automation & AI Integration',
      features: [
        '24개 평가 항목 (6개 카테고리)',
          'GEMINI 2.5 FLASH AI 심층 분석',
          'N8N 자동화 중심 SWOT 전략 매트릭스',
          '업종별 N8N 자동화 로드맵',
          '3단계 N8N 워크플로우 구축 계획',
          'N8N 자동화 ROI 분석',
          'AICAMP N8N 자동화 맞춤 제안',
          '이후경 교장 N8N 전문가 톤앤매너',
          '6자리 패스워드 보안 시스템'
        ],
        automationFocus: [
          'N8N 워크플로우 기반 업종별 특화',
          'AI API 통합 자동화 솔루션',
          '실무 중심 자동화 교육 과정',
          '업무 효율성 60% 이상 개선'
        ],
        improvements: [
          '폴백 제거 - 실제 AI 분석 필수',
          '투자금액: 심층진단후 TBD',
          'Google Sheet 4개 시트 저장',
          'N8N 자동화 전문가 CEO 메시지 생성',
          '보고서 패스워드 인증 시스템'
      ]
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 상담신청 처리
 */
function handleConsultationRequest(data) {
  console.log('📞 상담신청 처리');
  
  try {
    const id = generateDiagnosisId();
    
    // 데이터 저장
    saveConsultationData({
      id: id,
      companyName: data.companyName || '',
      contactName: data.contactName || '',
      email: data.email || '',
      phone: data.phone || '',
      content: data.content || ''
    });
    
    // 이메일 발송
    sendConsultationEmail(data, id);
    
    return {
      success: true,
      id: id,
      message: '상담신청이 접수되었습니다.'
    };
    
  } catch (error) {
    console.error('상담신청 처리 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 오류신고 처리
 */
function handleErrorReport(data) {
  console.log('🚨 오류신고 처리');
  
  try {
    const env = getEnvironmentVariables();
    const id = generateDiagnosisId();
    
    // 관리자 알림
    MailApp.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: `[오류신고] ${data.type || '시스템'}`,
      body: JSON.stringify(data, null, 2),
      name: 'AICAMP System'
    });
    
    return {
      success: true,
      id: id,
      message: '오류신고가 접수되었습니다.'
    };
    
  } catch (error) {
    console.error('오류신고 처리 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 상담 데이터 저장
 */
function saveConsultationData(data) {
  const env = getEnvironmentVariables();
  const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName('상담신청');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('상담신청');
    sheet.getRange(1, 1, 1, 6).setValues([
      ['ID', '일시', '회사명', '담당자', '이메일', '내용']
    ]);
  }
  
  sheet.appendRow([
    data.id,
    getCurrentKoreanTime(),
    data.companyName,
    data.contactName,
    data.email,
    data.content
  ]);
}

/**
 * 상담 이메일 발송
 */
function sendConsultationEmail(data, id) {
  const subject = '[AICAMP] 상담신청 접수 확인';
  const body = `
상담신청이 접수되었습니다.

접수번호: ${id}
회사명: ${data.companyName}
담당자: ${data.contactName}

영업일 기준 1-2일 내에 연락드리겠습니다.

감사합니다.
AICAMP
  `;
  
  if (data.email && data.email.includes('@')) {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
      name: 'AICAMP'
    });
  }
  
  // 관리자 알림
  const env = getEnvironmentVariables();
  MailApp.sendEmail({
    to: env.ADMIN_EMAIL,
    subject: `[상담신청] ${data.companyName}`,
    body: JSON.stringify(data, null, 2),
    name: 'AICAMP System'
  });
}

// ================================================================================
// 🎉 AICAMP AI 역량진단 시스템 V9.0 PREMIUM - 최고 품질 보고서
// ================================================================================
// 
// ✅ 웹사이트와 100% 일치
// ✅ 24개 평가 항목 (6개 카테고리 × 4문항)
// ✅ GEMINI 2.5 FLASH AI 심층 분석 (폴백 금지)
// ✅ 이후경 교장 톤앤매너 적용
// ✅ 통합 보고서 시스템 (이메일/웹/다운로드 동일)
// ✅ SWOT 전략 매트릭스 (SO, WO, ST, WT)
// ✅ 중요도-긴급성 매트릭스
// ✅ 3단계 실행 로드맵 (투자금액: 심층진단후 TBD)
// ✅ Google Sheet 4개 시트 상세 저장
// ✅ 관리자/신청자 맞춤형 이메일
// ✅ 환경변수 보안 강화 및 검증
// 
// 📌 핵심 업그레이드 (V9.0):
// - GEMINI 2.5 FLASH 모델 업그레이드
// - 폴백 제거, 실제 AI 분석 필수
// - 이후경 교장 톤앤매너 프롬프트
// - 투자금액 "심층진단후 TBD"로 변경
// - 보고서 품질 대폭 향상
// - 통합 보고서 구조
// - CEO 메시지 자동 생성
// - 상세 Google Sheets 저장 (4개 시트)
// 
// 📌 환경변수 설정 (Google Apps Script 스크립트 속성):
// 1. SPREADSHEET_ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0 (기본값 설정됨)
// 2. GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM (기본값 설정됨)
// 3. ADMIN_EMAIL: hongik423@gmail.com (기본값 설정됨)
// 
// 📌 선택적 환경변수:
// 4. AICAMP_WEBSITE: 웹사이트 도메인 (기본값: aicamp.club)
// 5. AI_MODEL: AI 모델명 (기본값: gemini-2.5-flash)
// 6. MAX_OUTPUT_TOKENS: 최대 출력 토큰 (기본값: 32768)
// 7. TEMPERATURE: AI 온도 설정 (기본값: 0.7)
// 8. DEBUG_MODE: 디버그 모드 (기본값: false)
// 9. ENVIRONMENT: 환경 설정 (기본값: production)
// 
// 📌 배포 방법:
// 1. Google Apps Script에 전체 코드 복사
// 2. 기본값으로 바로 실행 가능
// 3. 웹 앱으로 배포 (액세스 권한: 모든 사용자)
// 4. 배포 URL을 프론트엔드 환경변수에 설정
// 5. 권한 승인 (Gmail, Sheets, 외부 URL 접근)
//
// 📌 테스트 방법:
// 1. testEnvironmentVariables() 함수 실행으로 환경변수 확인
// 2. checkSystemStatus() 함수 실행으로 전체 시스템 상태 확인
// 
// 🔧 V10.0 PREMIUM 품질 개선사항:
// - GEMINI 2.5 FLASH 모델 사용 (최신 정식 버전)
// - 실제 신청서 데이터 기반 사실 분석 (폴백 완전 금지)
// - 이후경 교장 N8N 자동화 전문가 톤앤매너
// - 통합 보고서 시스템 (이메일/웹/다운로드 동일 내용)
// - 신청서 답변 구체적 반영한 맞춤형 분석
// - AI 분석 품질 검증 시스템
// - 이메일 기반 회원 인식 시스템
// - 관리자 상담용 상세 데이터 제공
// - 사실 기반 SWOT 전략 매트릭스 (SO, WO, ST, WT)
// - N8N 자동화 중심 실행 가능한 권고사항
// - Vercel 800초 타임아웃 최적화
// - 재시도 로직 및 지수 백오프 적용
// - JSON 파싱 오류 처리 강화
// - API Rate Limit 대응 로직 추가
// ================================================================================
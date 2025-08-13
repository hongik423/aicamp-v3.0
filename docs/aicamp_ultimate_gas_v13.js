/**
 * ================================================================================
 * 🚀 AICAMP 통합 시스템 V13.0 ULTIMATE - Google Apps Script
 * ================================================================================
 * 
 * 🎯 완벽한 3-in-1 통합 시스템:
 * 1. AI역량진단 (45문항 고도화 시스템)
 * 2. 상담신청
 * 3. 오류신고 (세금계산기)
 * 
 * 🔥 핵심 특징:
 * - GEMINI 2.5 FLASH 모델 완벽 연동
 * - 폴백 답변 완전 금지 (100% AI 기반 분석)
 * - SWOT → 매트릭스 → 로드맵 논리적 연계
 * - 회원인식 기반 이메일 시스템
 * - Google Sheets 자동 관리
 * - HTML 보고서 배너 시스템
 * - 무오류 품질 기준
 * 
 * ================================================================================
 */

// ================================================================================
// MODULE 1: 핵심 설정 및 환경변수
// ================================================================================

/**
 * 시스템 설정 상수
 */
const AICAMP_CONFIG = {
  // 시스템 정보
  VERSION: 'V13.0-ULTIMATE-INTEGRATED',
  MODEL: 'GEMINI-2.5-FLASH',
  DOMAIN: 'aicamp.club',
  
  // API 설정
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  
  // 관리자 정보
  ADMIN_EMAIL: 'hongik423@gmail.com',
  
  // 타임아웃 설정 (Vercel 800초 제한 고려)
  TIMEOUTS: {
    GEMINI_API: 780000,    // 13분 (780초)
    EMAIL_SEND: 120000,    // 2분
    SHEET_SAVE: 60000,     // 1분
    TOTAL_PROCESS: 900000  // 15분 (최대)
  },
  
  // 재시도 설정
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 2000,
    EXPONENTIAL_BACKOFF: true
  },
  
  // 품질 기준
  QUALITY_STANDARDS: {
    NO_FALLBACK: true,
    AI_REQUIRED: true,
    ERROR_TOLERANCE: 0,
    REPORT_MIN_LENGTH: 5000
  }
};

/**
 * Google Sheets 설정
 */
const SHEETS_CONFIG = {
  // 메인 스프레드시트 ID (실제 값으로 교체 필요)
  SPREADSHEET_ID: '1your-main-spreadsheet-id-here',
  
  // 시트 이름 정의
  SHEETS: {
    // AI 역량진단
    AI_DIAGNOSIS_MAIN: 'AI역량진단_메인데이터',
    AI_DIAGNOSIS_SCORES: 'AI역량진단_점수분석',
    AI_DIAGNOSIS_SWOT: 'AI역량진단_SWOT분석',
    AI_DIAGNOSIS_REPORTS: 'AI역량진단_보고서',
    
    // 상담신청
    CONSULTATION_REQUESTS: '상담신청_데이터',
    CONSULTATION_LOG: '상담신청_처리로그',
    
    // 오류신고
    ERROR_REPORTS: '오류신고_데이터',
    ERROR_LOG: '오류신고_처리로그',
    
    // 통합 관리
    EMAIL_LOG: '이메일_발송로그',
    ADMIN_DASHBOARD: '관리자_대시보드',
    MEMBER_MANAGEMENT: '회원_관리'
  }
};

// ================================================================================
// MODULE 2: 메인 처리 함수 (doPost/doGet)
// ================================================================================

/**
 * 메인 POST 요청 처리기
 */
function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🚀 AICAMP 통합 시스템 V13.0 - 요청 수신');
  
  try {
    // 요청 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    const requestType = requestData.type;
    
    console.log('📋 요청 타입:', requestType);
    console.log('📊 요청 시작 시간:', new Date().toLocaleString('ko-KR'));
    
    // 요청 타입별 라우팅
    let result;
    switch (requestType) {
      case 'ai_diagnosis':
        result = handleAIDiagnosisRequest(requestData);
        break;
      case 'consultation_request':
        result = handleConsultationRequest(requestData);
        break;
      case 'error_report':
        result = handleErrorReport(requestData);
        break;
      default:
        throw new Error('지원하지 않는 요청 타입: ' + requestType);
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 처리 완료 - 소요시간:', processingTime + 'ms');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        ...result,
        processingTime: processingTime,
        timestamp: new Date().toISOString(),
        version: AICAMP_CONFIG.VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 시스템 오류:', error);
    
    // 오류 알림 발송
    sendErrorNotification(error, e.postData?.contents);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
        version: AICAMP_CONFIG.VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리기 (시스템 상태 확인)
 */
function doGet(e) {
  try {
    const systemStatus = checkSystemHealth();
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'active',
        version: AICAMP_CONFIG.VERSION,
        model: AICAMP_CONFIG.MODEL,
        timestamp: new Date().toISOString(),
        health: systemStatus,
        message: 'AICAMP 통합 시스템 V13.0이 정상 작동 중입니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 3: AI 역량진단 처리 시스템
// ================================================================================

/**
 * AI 역량진단 요청 처리 (메인 함수)
 */
function handleAIDiagnosisRequest(requestData) {
  console.log('🧠 AI역량진단 처리 시작 - 45문항 시스템');
  
  const diagnosisId = generateDiagnosisId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    console.log('📋 1단계: 데이터 검증 및 정규화');
    const normalizedData = normalizeAIDiagnosisData(requestData.data, diagnosisId);
    
    // 2단계: 45문항 점수 계산 및 분석
    console.log('📊 2단계: 45문항 점수 계산');
    const scoreAnalysis = calculateAdvancedScores(normalizedData);
    
    // 3단계: 업종별/규모별 벤치마크 분석
    console.log('🎯 3단계: 벤치마크 갭 분석');
    const benchmarkAnalysis = performBenchmarkAnalysis(scoreAnalysis, normalizedData);
    
    // 4단계: 고도화된 SWOT 분석
    console.log('⚡ 4단계: SWOT 분석');
    const swotAnalysis = generateAdvancedSWOT(normalizedData, scoreAnalysis, benchmarkAnalysis);
    
    // 5단계: 중요도-긴급성 매트릭스 생성
    console.log('📈 5단계: 우선순위 매트릭스');
    const priorityMatrix = generatePriorityMatrix(swotAnalysis, scoreAnalysis, normalizedData);
    
    // 6단계: 3단계 실행 로드맵 생성
    console.log('🗺️ 6단계: 실행 로드맵');
    const executionRoadmap = generate3PhaseRoadmap(priorityMatrix, swotAnalysis, normalizedData);
    
    // 7단계: 투자대비효과 분석
    console.log('💰 7단계: ROI 분석');
    const roiAnalysis = calculateROIAnalysis(executionRoadmap, normalizedData);
    
    // 8단계: AICAMP 맞춤형 제안
    console.log('🎓 8단계: AICAMP 맞춤형 제안');
    const aicampProposal = generateAICampProposal(normalizedData, scoreAnalysis, executionRoadmap);
    
    // 9단계: GEMINI AI 종합 보고서 생성
    console.log('🤖 9단계: GEMINI AI 종합 분석');
    const aiReport = generateGeminiReport(
      normalizedData, 
      scoreAnalysis, 
      swotAnalysis, 
      priorityMatrix, 
      executionRoadmap, 
      roiAnalysis, 
      aicampProposal
    );
    
    // 10단계: HTML 보고서 생성
    console.log('📄 10단계: HTML 보고서 생성');
    const htmlReport = generateHTMLReport(normalizedData, aiReport, {
      scores: scoreAnalysis,
      swot: swotAnalysis,
      matrix: priorityMatrix,
      roadmap: executionRoadmap,
      roi: roiAnalysis,
      proposal: aicampProposal
    });
    
    // 11단계: Google Sheets 저장
    console.log('💾 11단계: 데이터 저장');
    const saveResult = saveAIDiagnosisData(normalizedData, aiReport, {
      scores: scoreAnalysis,
      swot: swotAnalysis,
      matrix: priorityMatrix,
      roadmap: executionRoadmap,
      roi: roiAnalysis,
      proposal: aicampProposal,
      html: htmlReport
    });
    
    // 12단계: 이메일 발송
    console.log('📧 12단계: 이메일 발송');
    const emailResult = sendAIDiagnosisEmails(normalizedData, aiReport, htmlReport, diagnosisId);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('🎉 AI역량진단 완료 - 총 소요시간:', processingTime + 'ms');
    
    return {
      type: 'ai_diagnosis',
      diagnosisId: diagnosisId,
      success: true,
      message: '45문항 AI역량진단이 성공적으로 완료되었습니다.',
      results: {
        totalScore: scoreAnalysis.totalScore,
        maturityLevel: scoreAnalysis.maturityLevel,
        reportGenerated: true,
        emailsSent: emailResult.success,
        dataSaved: saveResult.success
      },
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ AI역량진단 처리 오류:', error);
    
    // 오류 데이터 저장
    saveErrorLog('ai_diagnosis', diagnosisId, error, requestData);
    
    throw new Error(`AI역량진단 처리 실패: ${error.message}`);
  }
}

/**
 * AI 역량진단 데이터 정규화
 */
function normalizeAIDiagnosisData(rawData, diagnosisId) {
  console.log('🔧 AI역량진단 데이터 정규화 시작');
  
  // 필수 필드 검증
  const requiredFields = ['companyName', 'contactName', 'contactEmail', 'industry', 'employeeCount'];
  for (const field of requiredFields) {
    if (!rawData[field]) {
      throw new Error(`필수 필드가 누락되었습니다: ${field}`);
    }
  }
  
  // 45문항 응답 검증
  if (!rawData.assessmentResponses || rawData.assessmentResponses.length !== 45) {
    throw new Error(`45문항 응답이 필요합니다. 현재: ${rawData.assessmentResponses?.length || 0}문항`);
  }
  
  return {
    // 기본 정보
    diagnosisId: diagnosisId,
    timestamp: new Date().toISOString(),
    
    // 회사 정보
    companyName: rawData.companyName.trim(),
    contactName: rawData.contactName.trim(),
    contactEmail: rawData.contactEmail.toLowerCase().trim(),
    contactPhone: rawData.contactPhone || '',
    contactPosition: rawData.contactPosition || '',
    
    // 사업 정보
    industry: rawData.industry,
    businessType: Array.isArray(rawData.businessType) ? rawData.businessType : [rawData.businessType],
    employeeCount: rawData.employeeCount,
    annualRevenue: rawData.annualRevenue || '',
    establishmentYear: rawData.establishmentYear || new Date().getFullYear(),
    location: rawData.location || '',
    
    // 45문항 응답 (정규화)
    assessmentResponses: rawData.assessmentResponses.map((response, index) => ({
      questionId: index + 1,
      sectionId: Math.floor(index / 7.5) + 1, // 6개 섹션
      value: parseInt(response) || 1,
      weight: getQuestionWeight(index + 1)
    })),
    
    // 추가 정보
    additionalInfo: rawData.additionalInfo || '',
    
    // 시스템 정보
    version: AICAMP_CONFIG.VERSION,
    model: AICAMP_CONFIG.MODEL
  };
}

/**
 * 문항별 가중치 반환
 */
function getQuestionWeight(questionId) {
  // 문항별 중요도에 따른 가중치 설정
  const weights = {
    // 사업 기반 (1-8번) - 기본 가중치
    1: 1.0, 2: 1.1, 3: 1.2, 4: 1.0, 5: 1.1, 6: 1.0, 7: 1.1, 8: 1.2,
    // 현재 AI 활용 (9-16번) - 높은 가중치
    9: 1.3, 10: 1.4, 11: 1.5, 12: 1.3, 13: 1.4, 14: 1.3, 15: 1.4, 16: 1.5,
    // 조직 준비도 (17-24번) - 중간 가중치
    17: 1.2, 18: 1.3, 19: 1.1, 20: 1.2, 21: 1.3, 22: 1.1, 23: 1.2, 24: 1.3,
    // 기술 인프라 (25-32번) - 높은 가중치
    25: 1.4, 26: 1.5, 27: 1.3, 28: 1.4, 29: 1.5, 30: 1.3, 31: 1.4, 32: 1.5,
    // 목표 명확성 (33-40번) - 중간 가중치
    33: 1.1, 34: 1.2, 35: 1.3, 36: 1.1, 37: 1.2, 38: 1.1, 39: 1.2, 40: 1.3,
    // 실행 역량 (41-45번) - 최고 가중치
    41: 1.5, 42: 1.6, 43: 1.5, 44: 1.6, 45: 1.7
  };
  
  return weights[questionId] || 1.0;
}

/**
 * 45문항 고도화 점수 계산 시스템
 */
function calculateAdvancedScores(normalizedData) {
  console.log('🧮 고도화 점수 계산 시작');
  
  const responses = normalizedData.assessmentResponses;
  
  // 섹션별 점수 계산
  const sectionScores = calculateSectionScores(responses);
  
  // 가중 평균 총점 계산
  const totalScore = calculateWeightedTotalScore(sectionScores);
  
  // 성숙도 레벨 결정
  const maturityLevel = determineMaturityLevel(totalScore);
  
  // 백분위 계산
  const percentile = calculatePercentile(totalScore);
  
  // 상세 분석 수행
  const detailedAnalysis = performDetailedAnalysis(sectionScores, responses, normalizedData);
  
  return {
    // 기본 점수
    totalScore: Math.round(totalScore * 10) / 10,
    maturityLevel: maturityLevel,
    percentile: percentile,
    
    // 섹션별 점수
    sectionScores: sectionScores,
    
    // 상세 분석
    detailedAnalysis: detailedAnalysis,
    
    // 메타데이터
    calculatedAt: new Date().toISOString(),
    questionCount: responses.length
  };
}

/**
 * 섹션별 점수 계산
 */
function calculateSectionScores(responses) {
  const sections = {
    businessFoundation: { name: '사업기반', questions: responses.slice(0, 8) },
    currentAI: { name: '현재AI활용', questions: responses.slice(8, 16) },
    organizationReadiness: { name: '조직준비도', questions: responses.slice(16, 24) },
    techInfrastructure: { name: '기술인프라', questions: responses.slice(24, 32) },
    goalClarity: { name: '목표명확성', questions: responses.slice(32, 40) },
    executionCapability: { name: '실행역량', questions: responses.slice(40, 45) }
  };
  
  const sectionScores = {};
  
  for (const [sectionKey, sectionData] of Object.entries(sections)) {
    const questions = sectionData.questions;
    let weightedSum = 0;
    let totalWeight = 0;
    
    questions.forEach(q => {
      weightedSum += q.value * q.weight;
      totalWeight += q.weight;
    });
    
    const sectionScore = (weightedSum / totalWeight) * 20; // 100점 만점으로 환산
    
    sectionScores[sectionKey] = {
      name: sectionData.name,
      score: Math.round(sectionScore * 10) / 10,
      questionCount: questions.length,
      rawSum: weightedSum,
      totalWeight: totalWeight
    };
  }
  
  return sectionScores;
}

/**
 * 가중 평균 총점 계산
 */
function calculateWeightedTotalScore(sectionScores) {
  // 섹션별 중요도 가중치
  const sectionWeights = {
    businessFoundation: 1.0,    // 기본 중요도
    currentAI: 1.5,            // 높은 중요도
    organizationReadiness: 1.2, // 중간 중요도
    techInfrastructure: 1.4,   // 높은 중요도
    goalClarity: 1.1,          // 기본+ 중요도
    executionCapability: 1.6   // 최고 중요도
  };
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  for (const [sectionKey, sectionData] of Object.entries(sectionScores)) {
    const weight = sectionWeights[sectionKey] || 1.0;
    weightedSum += sectionData.score * weight;
    totalWeight += weight;
  }
  
  return weightedSum / totalWeight;
}

/**
 * 성숙도 레벨 결정
 */
function determineMaturityLevel(totalScore) {
  if (totalScore >= 85) return 'Expert';
  if (totalScore >= 70) return 'Advanced';
  if (totalScore >= 55) return 'Intermediate';
  if (totalScore >= 40) return 'Basic';
  return 'Beginner';
}

/**
 * 백분위 계산
 */
function calculatePercentile(totalScore) {
  // 실제 데이터 기반 백분위 계산 (추후 실제 데이터로 업데이트)
  const scoreRanges = [
    { min: 90, percentile: 95 },
    { min: 85, percentile: 90 },
    { min: 80, percentile: 85 },
    { min: 75, percentile: 80 },
    { min: 70, percentile: 75 },
    { min: 65, percentile: 70 },
    { min: 60, percentile: 65 },
    { min: 55, percentile: 60 },
    { min: 50, percentile: 50 },
    { min: 45, percentile: 40 },
    { min: 40, percentile: 30 },
    { min: 35, percentile: 20 },
    { min: 30, percentile: 10 },
    { min: 0, percentile: 5 }
  ];
  
  for (const range of scoreRanges) {
    if (totalScore >= range.min) {
      return range.percentile;
    }
  }
  
  return 5;
}

/**
 * 상세 분석 수행
 */
function performDetailedAnalysis(sectionScores, responses, normalizedData) {
  // 강점 분석
  const strengths = identifyStrengths(sectionScores, responses);
  
  // 약점 분석
  const weaknesses = identifyWeaknesses(sectionScores, responses);
  
  // 중요 갭 분석
  const criticalGaps = identifyCriticalGaps(sectionScores, normalizedData);
  
  // 빠른 개선 영역
  const quickWins = identifyQuickWins(sectionScores, responses);
  
  return {
    strengths: strengths,
    weaknesses: weaknesses,
    criticalGaps: criticalGaps,
    quickWins: quickWins,
    analysisDate: new Date().toISOString()
  };
}

/**
 * 강점 식별
 */
function identifyStrengths(sectionScores, responses) {
  const strengths = [];
  
  // 높은 점수 섹션 식별
  const sortedSections = Object.entries(sectionScores)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 3);
  
  sortedSections.forEach(([key, data]) => {
    if (data.score >= 70) {
      strengths.push(`${data.name} 영역에서 우수한 성과 (${data.score}점)`);
    }
  });
  
  // 특정 문항 기반 강점
  responses.forEach((response, index) => {
    if (response.value >= 4 && response.weight >= 1.3) {
      const questionArea = getQuestionArea(index + 1);
      strengths.push(`${questionArea}에서 높은 역량 보유`);
    }
  });
  
  return strengths.slice(0, 5); // 상위 5개 강점
}

/**
 * 약점 식별
 */
function identifyWeaknesses(sectionScores, responses) {
  const weaknesses = [];
  
  // 낮은 점수 섹션 식별
  const sortedSections = Object.entries(sectionScores)
    .sort((a, b) => a[1].score - b[1].score)
    .slice(0, 3);
  
  sortedSections.forEach(([key, data]) => {
    if (data.score < 60) {
      weaknesses.push(`${data.name} 영역 개선 필요 (${data.score}점)`);
    }
  });
  
  // 특정 문항 기반 약점
  responses.forEach((response, index) => {
    if (response.value <= 2 && response.weight >= 1.2) {
      const questionArea = getQuestionArea(index + 1);
      weaknesses.push(`${questionArea} 역량 강화 필요`);
    }
  });
  
  return weaknesses.slice(0, 5); // 상위 5개 약점
}

/**
 * 중요 갭 식별
 */
function identifyCriticalGaps(sectionScores, normalizedData) {
  const gaps = [];
  
  // 업종별 기대 수준과의 갭
  const industryBenchmark = getIndustryBenchmark(normalizedData.industry);
  
  Object.entries(sectionScores).forEach(([key, data]) => {
    const expectedScore = industryBenchmark[key] || 65;
    const gap = expectedScore - data.score;
    
    if (gap > 10) {
      gaps.push(`${data.name}: 업종 평균 대비 ${Math.round(gap)}점 부족`);
    }
  });
  
  return gaps.slice(0, 3); // 상위 3개 갭
}

/**
 * 빠른 개선 영역 식별
 */
function identifyQuickWins(sectionScores, responses) {
  const quickWins = [];
  
  // 중간 점수대에서 개선 가능한 영역
  Object.entries(sectionScores).forEach(([key, data]) => {
    if (data.score >= 50 && data.score < 70) {
      quickWins.push(`${data.name} 영역 단기 개선 가능`);
    }
  });
  
  return quickWins.slice(0, 3); // 상위 3개
}

/**
 * 문항 영역 반환
 */
function getQuestionArea(questionId) {
  const areas = {
    1: '비즈니스 전략', 2: '시장 이해', 3: '경쟁 분석', 4: '고객 니즈', 
    5: '데이터 수집', 6: '프로세스 표준화', 7: '성과 측정', 8: '리스크 관리',
    9: 'AI 도구 활용', 10: '자동화 구현', 11: '데이터 분석', 12: '예측 모델링',
    13: '고객 서비스 AI', 14: '운영 효율화', 15: 'AI 통합', 16: '성과 개선',
    17: '리더십 지원', 18: '조직 문화', 19: '변화 관리', 20: '교육 체계',
    21: '협업 체계', 22: '의사결정', 23: '커뮤니케이션', 24: '조직 학습',
    25: 'IT 인프라', 26: '데이터 관리', 27: '보안 체계', 28: '클라우드',
    29: 'API 연동', 30: '시스템 통합', 31: '모니터링', 32: '확장성',
    33: 'AI 전략', 34: '목표 설정', 35: '성과 지표', 36: '로드맵',
    37: '우선순위', 38: '자원 배분', 39: '일정 관리', 40: '성과 추적',
    41: '실행 계획', 42: '프로젝트 관리', 43: '품질 관리', 44: '위험 관리', 45: '지속 개선'
  };
  
  return areas[questionId] || '일반 역량';
}

/**
 * 업종별 벤치마크 반환
 */
function getIndustryBenchmark(industry) {
  const benchmarks = {
    'IT/소프트웨어': {
      businessFoundation: 75, currentAI: 80, organizationReadiness: 70,
      techInfrastructure: 85, goalClarity: 75, executionCapability: 70
    },
    '제조업': {
      businessFoundation: 70, currentAI: 60, organizationReadiness: 65,
      techInfrastructure: 70, goalClarity: 70, executionCapability: 75
    },
    '금융/보험': {
      businessFoundation: 80, currentAI: 70, organizationReadiness: 75,
      techInfrastructure: 80, goalClarity: 80, executionCapability: 70
    },
    '유통/도소매': {
      businessFoundation: 65, currentAI: 55, organizationReadiness: 60,
      techInfrastructure: 65, goalClarity: 65, executionCapability: 70
    },
    '건설/부동산': {
      businessFoundation: 65, currentAI: 45, organizationReadiness: 55,
      techInfrastructure: 60, goalClarity: 65, executionCapability: 70
    },
    '의료/헬스케어': {
      businessFoundation: 75, currentAI: 65, organizationReadiness: 70,
      techInfrastructure: 75, goalClarity: 75, executionCapability: 65
    }
  };
  
  return benchmarks[industry] || {
    businessFoundation: 65, currentAI: 55, organizationReadiness: 60,
    techInfrastructure: 65, goalClarity: 65, executionCapability: 65
  };
}

// ================================================================================
// MODULE 4: 벤치마크 분석 시스템
// ================================================================================

/**
 * 업종별/규모별 벤치마크 분석
 */
function performBenchmarkAnalysis(scoreAnalysis, normalizedData) {
  console.log('🎯 벤치마크 분석 시작');
  
  const industryBenchmark = getIndustryBenchmark(normalizedData.industry);
  const sizeBenchmark = getSizeBenchmark(normalizedData.employeeCount);
  
  // 업종별 갭 분석
  const industryGaps = {};
  const sizeGaps = {};
  
  Object.entries(scoreAnalysis.sectionScores).forEach(([key, data]) => {
    industryGaps[key] = {
      actual: data.score,
      benchmark: industryBenchmark[key],
      gap: data.score - industryBenchmark[key],
      percentage: ((data.score - industryBenchmark[key]) / industryBenchmark[key] * 100).toFixed(1)
    };
    
    sizeGaps[key] = {
      actual: data.score,
      benchmark: sizeBenchmark[key],
      gap: data.score - sizeBenchmark[key],
      percentage: ((data.score - sizeBenchmark[key]) / sizeBenchmark[key] * 100).toFixed(1)
    };
  });
  
  // 경쟁 포지션 결정
  const competitivePosition = determineCompetitivePosition(
    scoreAnalysis.totalScore, 
    industryBenchmark, 
    sizeBenchmark
  );
  
  // 우선순위 영역 식별
  const priorityAreas = identifyPriorityAreas(industryGaps, sizeGaps);
  
  return {
    industryGaps: industryGaps,
    sizeGaps: sizeGaps,
    competitivePosition: competitivePosition,
    priorityAreas: priorityAreas,
    industryName: normalizedData.industry,
    companySize: normalizedData.employeeCount,
    analysisDate: new Date().toISOString()
  };
}

/**
 * 규모별 벤치마크 반환
 */
function getSizeBenchmark(employeeCount) {
  const sizeBenchmarks = {
    '1-10명': {
      businessFoundation: 55, currentAI: 40, organizationReadiness: 45,
      techInfrastructure: 50, goalClarity: 55, executionCapability: 60
    },
    '11-30명': {
      businessFoundation: 60, currentAI: 50, organizationReadiness: 55,
      techInfrastructure: 60, goalClarity: 60, executionCapability: 65
    },
    '31-50명': {
      businessFoundation: 65, currentAI: 60, organizationReadiness: 65,
      techInfrastructure: 70, goalClarity: 65, executionCapability: 70
    },
    '51-100명': {
      businessFoundation: 70, currentAI: 65, organizationReadiness: 70,
      techInfrastructure: 75, goalClarity: 70, executionCapability: 70
    },
    '101-300명': {
      businessFoundation: 75, currentAI: 70, organizationReadiness: 75,
      techInfrastructure: 80, goalClarity: 75, executionCapability: 75
    },
    '300명 이상': {
      businessFoundation: 80, currentAI: 75, organizationReadiness: 80,
      techInfrastructure: 85, goalClarity: 80, executionCapability: 75
    }
  };
  
  return sizeBenchmarks[employeeCount] || sizeBenchmarks['31-50명'];
}

/**
 * 경쟁 포지션 결정
 */
function determineCompetitivePosition(totalScore, industryBenchmark, sizeBenchmark) {
  const industryAvg = Object.values(industryBenchmark).reduce((a, b) => a + b, 0) / 6;
  const sizeAvg = Object.values(sizeBenchmark).reduce((a, b) => a + b, 0) / 6;
  const overallBenchmark = (industryAvg + sizeAvg) / 2;
  
  const gap = totalScore - overallBenchmark;
  
  if (gap >= 15) return 'Market Leader';
  if (gap >= 5) return 'Above Average';
  if (gap >= -5) return 'Average';
  if (gap >= -15) return 'Below Average';
  return 'Needs Improvement';
}

/**
 * 우선순위 영역 식별
 */
function identifyPriorityAreas(industryGaps, sizeGaps) {
  const priorities = [];
  
  Object.entries(industryGaps).forEach(([key, data]) => {
    const sizeGap = sizeGaps[key].gap;
    const avgGap = (data.gap + sizeGap) / 2;
    
    if (avgGap < -10) {
      priorities.push({
        area: data.actual < 50 ? `${key} (긴급)` : key,
        gap: avgGap,
        priority: data.actual < 50 ? 'High' : 'Medium'
      });
    }
  });
  
  return priorities.sort((a, b) => a.gap - b.gap).slice(0, 5);
}

// ================================================================================
// MODULE 5: 고도화된 SWOT 분석 시스템
// ================================================================================

/**
 * 고도화된 SWOT 분석 생성
 */
function generateAdvancedSWOT(normalizedData, scoreAnalysis, benchmarkAnalysis) {
  console.log('⚡ 고도화된 SWOT 분석 시작');
  
  // 내부 요인 분석
  const internalFactors = analyzeInternalFactors(scoreAnalysis, normalizedData);
  
  // 외부 요인 분석
  const externalFactors = analyzeExternalFactors(normalizedData, benchmarkAnalysis);
  
  // SWOT 매트릭스 생성
  const swotMatrix = generateSWOTMatrix(internalFactors, externalFactors);
  
  // 전략적 권고사항 생성
  const strategicRecommendations = generateStrategicRecommendations(swotMatrix);
  
  return {
    strengths: {
      internal: internalFactors.strengths.internal,
      competitive: internalFactors.strengths.competitive,
      strategic: internalFactors.strengths.strategic
    },
    weaknesses: {
      operational: internalFactors.weaknesses.operational,
      technical: internalFactors.weaknesses.technical,
      organizational: internalFactors.weaknesses.organizational
    },
    opportunities: {
      market: externalFactors.opportunities.market,
      technology: externalFactors.opportunities.technology,
      strategic: externalFactors.opportunities.strategic
    },
    threats: {
      competitive: externalFactors.threats.competitive,
      technical: externalFactors.threats.technical,
      market: externalFactors.threats.market
    },
    strategicRecommendations: strategicRecommendations,
    analysisDate: new Date().toISOString(),
    matrixScore: calculateSWOTMatrixScore(swotMatrix)
  };
}

/**
 * 내부 요인 분석
 */
function analyzeInternalFactors(scoreAnalysis, normalizedData) {
  const strengths = {
    internal: [],
    competitive: [],
    strategic: []
  };
  
  const weaknesses = {
    operational: [],
    technical: [],
    organizational: []
  };
  
  // 점수 기반 강점/약점 분석
  Object.entries(scoreAnalysis.sectionScores).forEach(([key, data]) => {
    if (data.score >= 75) {
      // 강점 분류
      if (['businessFoundation', 'goalClarity'].includes(key)) {
        strengths.strategic.push(`${data.name} 영역 우수 (${data.score}점)`);
      } else if (['currentAI', 'techInfrastructure'].includes(key)) {
        strengths.competitive.push(`${data.name} 경쟁력 보유 (${data.score}점)`);
      } else {
        strengths.internal.push(`${data.name} 내부 역량 우수 (${data.score}점)`);
      }
    } else if (data.score < 60) {
      // 약점 분류
      if (['techInfrastructure', 'currentAI'].includes(key)) {
        weaknesses.technical.push(`${data.name} 기술적 한계 (${data.score}점)`);
      } else if (['organizationReadiness', 'executionCapability'].includes(key)) {
        weaknesses.organizational.push(`${data.name} 조직적 약점 (${data.score}점)`);
      } else {
        weaknesses.operational.push(`${data.name} 운영상 개선 필요 (${data.score}점)`);
      }
    }
  });
  
  // 업종 특성 반영 강점
  const industryStrengths = getIndustrySpecificStrengths(normalizedData.industry, scoreAnalysis);
  strengths.strategic.push(...industryStrengths);
  
  return { strengths, weaknesses };
}

/**
 * 외부 요인 분석
 */
function analyzeExternalFactors(normalizedData, benchmarkAnalysis) {
  const opportunities = {
    market: [],
    technology: [],
    strategic: []
  };
  
  const threats = {
    competitive: [],
    technical: [],
    market: []
  };
  
  // 업종별 기회/위협 분석
  const industryFactors = getIndustryExternalFactors(normalizedData.industry);
  opportunities.market.push(...industryFactors.opportunities.market);
  opportunities.technology.push(...industryFactors.opportunities.technology);
  threats.competitive.push(...industryFactors.threats.competitive);
  threats.market.push(...industryFactors.threats.market);
  
  // 규모별 기회/위협
  const sizeFactors = getSizeExternalFactors(normalizedData.employeeCount);
  opportunities.strategic.push(...sizeFactors.opportunities);
  threats.technical.push(...sizeFactors.threats);
  
  // AI 트렌드 기반 기회
  opportunities.technology.push(
    'AI 자동화 기술 발전으로 인한 효율성 개선 기회',
    '데이터 기반 의사결정 문화 확산',
    '고객 맞춤형 서비스 제공 기회 확대'
  );
  
  return { opportunities, threats };
}

/**
 * 업종별 특화 강점 반환
 */
function getIndustrySpecificStrengths(industry, scoreAnalysis) {
  const industryStrengths = {
    'IT/소프트웨어': [
      '기술 친화적 조직 문화',
      '빠른 기술 도입 역량',
      '데이터 활용 기반 구축'
    ],
    '제조업': [
      '체계적 프로세스 관리',
      '품질 관리 시스템 운영',
      '생산 효율성 추구 문화'
    ],
    '금융/보험': [
      '데이터 보안 체계',
      '리스크 관리 역량',
      '고객 데이터 분석 경험'
    ],
    '유통/도소매': [
      '고객 접점 다양성',
      '시장 변화 민감성',
      '재고 관리 시스템'
    ]
  };
  
  return industryStrengths[industry] || ['업종 특화 경험', '시장 이해도'];
}

/**
 * 업종별 외부 요인 반환
 */
function getIndustryExternalFactors(industry) {
  const factors = {
    'IT/소프트웨어': {
      opportunities: {
        market: ['디지털 전환 가속화', 'AI/ML 수요 증가'],
        technology: ['클라우드 기술 발전', 'API 생태계 확장']
      },
      threats: {
        competitive: ['기술 변화 속도', '인재 경쟁 심화'],
        market: ['시장 포화', '규제 강화 가능성']
      }
    },
    '제조업': {
      opportunities: {
        market: ['스마트 팩토리 정책 지원', '자동화 수요 증가'],
        technology: ['IoT 센서 기술 발전', 'AI 품질 관리']
      },
      threats: {
        competitive: ['해외 제조업체 경쟁', '원자재 가격 상승'],
        market: ['환경 규제 강화', '인력 부족']
      }
    }
  };
  
  return factors[industry] || {
    opportunities: {
      market: ['시장 확대 기회'],
      technology: ['기술 혁신 기회']
    },
    threats: {
      competitive: ['경쟁 심화'],
      market: ['시장 변화']
    }
  };
}

/**
 * 규모별 외부 요인 반환
 */
function getSizeExternalFactors(employeeCount) {
  const sizeFactors = {
    '1-30명': {
      opportunities: ['정부 지원 프로그램 활용', '빠른 의사결정', '유연한 조직 운영'],
      threats: ['자원 제약', '인력 부족', '시장 영향력 한계']
    },
    '31-100명': {
      opportunities: ['중견기업 지원 정책', '전문화 기회', '파트너십 확대'],
      threats: ['규모의 경제 한계', '인재 확보 경쟁', '시스템 복잡성']
    },
    '100명+': {
      opportunities: ['규모의 경제', '시장 영향력', '투자 여력'],
      threats: ['조직 경직성', '변화 저항', '의사결정 복잡성']
    }
  };
  
  const size = employeeCount.includes('1-') || employeeCount.includes('11-30') ? '1-30명' :
               employeeCount.includes('31-') || employeeCount.includes('51-100') ? '31-100명' : '100명+';
  
  return sizeFactors[size];
}

/**
 * SWOT 매트릭스 생성
 */
function generateSWOTMatrix(internalFactors, externalFactors) {
  return {
    so_combinations: combineFactors(
      internalFactors.strengths, 
      externalFactors.opportunities, 
      'strength_opportunity'
    ),
    wo_combinations: combineFactors(
      internalFactors.weaknesses, 
      externalFactors.opportunities, 
      'weakness_opportunity'
    ),
    st_combinations: combineFactors(
      internalFactors.strengths, 
      externalFactors.threats, 
      'strength_threat'
    ),
    wt_combinations: combineFactors(
      internalFactors.weaknesses, 
      externalFactors.threats, 
      'weakness_threat'
    )
  };
}

/**
 * 요인 조합 생성
 */
function combineFactors(internalFactors, externalFactors, type) {
  const combinations = [];
  const maxCombinations = 3;
  let count = 0;
  
  for (const [internalKey, internalValues] of Object.entries(internalFactors)) {
    for (const [externalKey, externalValues] of Object.entries(externalFactors)) {
      if (count >= maxCombinations) break;
      
      combinations.push({
        internal: internalKey,
        external: externalKey,
        type: type,
        priority: calculateCombinationPriority(internalValues.length, externalValues.length)
      });
      
      count++;
    }
    if (count >= maxCombinations) break;
  }
  
  return combinations;
}

/**
 * 조합 우선순위 계산
 */
function calculateCombinationPriority(internalCount, externalCount) {
  const totalCount = internalCount + externalCount;
  if (totalCount >= 6) return 'High';
  if (totalCount >= 4) return 'Medium';
  return 'Low';
}

/**
 * 전략적 권고사항 생성
 */
function generateStrategicRecommendations(swotMatrix) {
  return {
    so_strategies: [
      '강점을 활용한 기회 확대 전략',
      '핵심 역량 기반 시장 진출',
      '경쟁 우위 요소 극대화'
    ],
    wo_strategies: [
      '약점 보완을 통한 기회 포착',
      '외부 파트너십 활용',
      '단계적 역량 강화'
    ],
    st_strategies: [
      '강점 활용 위협 대응',
      '차별화 전략 강화',
      '리스크 관리 체계 구축'
    ],
    wt_strategies: [
      '방어적 포지셔닝',
      '최소 위험 전략',
      '선택과 집중'
    ]
  };
}

/**
 * SWOT 매트릭스 점수 계산
 */
function calculateSWOTMatrixScore(matrix) {
  const soScore = matrix.so_combinations.length * 3;
  const woScore = matrix.wo_combinations.length * 2;
  const stScore = matrix.st_combinations.length * 2;
  const wtScore = matrix.wt_combinations.length * 1;
  
  return {
    total: soScore + woScore + stScore + wtScore,
    breakdown: { so: soScore, wo: woScore, st: stScore, wt: wtScore }
  };
}

// ================================================================================
// MODULE 6: 중요도-긴급성 매트릭스 시스템
// ================================================================================

/**
 * 우선순위 매트릭스 생성 (중요도 × 긴급성 × 실행용이성)
 */
function generatePriorityMatrix(swotAnalysis, scoreAnalysis, normalizedData) {
  console.log('📈 우선순위 매트릭스 생성 시작');
  
  // SWOT 결과에서 액션 아이템 추출
  const actionItems = extractActionItems(swotAnalysis, scoreAnalysis);
  
  // 각 액션 아이템에 대한 매트릭스 평가
  const evaluatedItems = actionItems.map(item => {
    const importance = calculateImportance(item, scoreAnalysis, normalizedData);
    const urgency = calculateUrgency(item, scoreAnalysis, normalizedData);
    const feasibility = calculateFeasibility(item, normalizedData);
    
    return {
      ...item,
      importance: importance,
      urgency: urgency,
      feasibility: feasibility,
      priorityScore: (importance * 0.4 + urgency * 0.3 + feasibility * 0.3),
      quadrant: determineQuadrant(importance, urgency)
    };
  });
  
  // 우선순위별 정렬
  const sortedItems = evaluatedItems.sort((a, b) => b.priorityScore - a.priorityScore);
  
  // 쿼드런트별 분류
  const quadrants = classifyByQuadrants(sortedItems);
  
  return {
    actionItems: sortedItems,
    quadrants: quadrants,
    topPriorities: sortedItems.slice(0, 5),
    matrixAnalysis: generateMatrixAnalysis(quadrants),
    createdAt: new Date().toISOString()
  };
}

/**
 * SWOT에서 액션 아이템 추출
 */
function extractActionItems(swotAnalysis, scoreAnalysis) {
  const actionItems = [];
  
  // SO 전략 (강점-기회)
  swotAnalysis.strategicRecommendations.so_strategies.forEach((strategy, index) => {
    actionItems.push({
      id: `SO_${index + 1}`,
      title: strategy,
      type: 'SO_Strategy',
      category: '성장전략',
      source: 'strength_opportunity',
      description: `강점을 활용한 기회 확대: ${strategy}`
    });
  });
  
  // WO 전략 (약점-기회)
  swotAnalysis.strategicRecommendations.wo_strategies.forEach((strategy, index) => {
    actionItems.push({
      id: `WO_${index + 1}`,
      title: strategy,
      type: 'WO_Strategy',
      category: '개선전략',
      source: 'weakness_opportunity',
      description: `약점 보완을 통한 기회 활용: ${strategy}`
    });
  });
  
  // ST 전략 (강점-위협)
  swotAnalysis.strategicRecommendations.st_strategies.forEach((strategy, index) => {
    actionItems.push({
      id: `ST_${index + 1}`,
      title: strategy,
      type: 'ST_Strategy',
      category: '방어전략',
      source: 'strength_threat',
      description: `강점을 활용한 위협 대응: ${strategy}`
    });
  });
  
  // WT 전략 (약점-위협)
  swotAnalysis.strategicRecommendations.wt_strategies.forEach((strategy, index) => {
    actionItems.push({
      id: `WT_${index + 1}`,
      title: strategy,
      type: 'WT_Strategy',
      category: '리스크관리',
      source: 'weakness_threat',
      description: `약점과 위협 최소화: ${strategy}`
    });
  });
  
  // 점수 기반 개선 액션 추가
  Object.entries(scoreAnalysis.sectionScores).forEach(([key, data]) => {
    if (data.score < 65) {
      actionItems.push({
        id: `IMPROVE_${key.toUpperCase()}`,
        title: `${data.name} 역량 강화`,
        type: 'Improvement',
        category: '역량개발',
        source: 'score_analysis',
        description: `${data.name} 영역 점수 개선 (현재 ${data.score}점)`
      });
    }
  });
  
  return actionItems;
}

/**
 * 중요도 계산 (1-10점)
 */
function calculateImportance(item, scoreAnalysis, normalizedData) {
  let importance = 5; // 기본 점수
  
  // 전략 타입별 가중치
  const typeWeights = {
    'SO_Strategy': 9,    // 성장전략 - 최고 중요도
    'WO_Strategy': 8,    // 개선전략 - 높은 중요도
    'ST_Strategy': 7,    // 방어전략 - 중간 중요도
    'WT_Strategy': 6,    // 리스크관리 - 기본+ 중요도
    'Improvement': 7     // 역량개발 - 중간 중요도
  };
  
  importance = typeWeights[item.type] || 5;
  
  // 업종별 조정
  const industryAdjustments = {
    'IT/소프트웨어': { 'SO_Strategy': +1, 'WO_Strategy': +1 },
    '제조업': { 'ST_Strategy': +1, 'Improvement': +1 },
    '금융/보험': { 'WT_Strategy': +1, 'ST_Strategy': +1 }
  };
  
  const adjustment = industryAdjustments[normalizedData.industry]?.[item.type] || 0;
  importance += adjustment;
  
  // 현재 성숙도 레벨에 따른 조정
  if (scoreAnalysis.maturityLevel === 'Beginner') {
    if (item.type === 'WO_Strategy' || item.type === 'Improvement') importance += 1;
  } else if (scoreAnalysis.maturityLevel === 'Expert') {
    if (item.type === 'SO_Strategy') importance += 1;
  }
  
  return Math.min(Math.max(importance, 1), 10);
}

/**
 * 긴급성 계산 (1-10점)
 */
function calculateUrgency(item, scoreAnalysis, normalizedData) {
  let urgency = 5; // 기본 점수
  
  // 점수 기반 긴급성
  if (item.source === 'score_analysis') {
    const sectionKey = item.id.replace('IMPROVE_', '').toLowerCase();
    const sectionScore = scoreAnalysis.sectionScores[sectionKey]?.score || 65;
    
    if (sectionScore < 40) urgency = 9;      // 매우 긴급
    else if (sectionScore < 50) urgency = 8; // 긴급
    else if (sectionScore < 60) urgency = 7; // 중간 긴급
    else urgency = 5;                        // 보통
  }
  
  // 전략 타입별 긴급성
  const typeUrgency = {
    'WT_Strategy': 8,    // 리스크관리 - 긴급
    'WO_Strategy': 7,    // 개선전략 - 중간 긴급
    'ST_Strategy': 6,    // 방어전략 - 보통
    'SO_Strategy': 5,    // 성장전략 - 보통
    'Improvement': 6     // 역량개발 - 보통
  };
  
  urgency = Math.max(urgency, typeUrgency[item.type] || 5);
  
  // 업종별 긴급성 조정
  const industryUrgencyBoost = {
    'IT/소프트웨어': ['SO_Strategy', 'WO_Strategy'],
    '제조업': ['ST_Strategy', 'WT_Strategy'],
    '유통/도소매': ['WO_Strategy', 'Improvement']
  };
  
  const boostTypes = industryUrgencyBoost[normalizedData.industry] || [];
  if (boostTypes.includes(item.type)) urgency += 1;
  
  return Math.min(Math.max(urgency, 1), 10);
}

/**
 * 실행용이성 계산 (1-10점)
 */
function calculateFeasibility(item, normalizedData) {
  let feasibility = 5; // 기본 점수
  
  // 회사 규모별 실행용이성
  const sizeFactors = {
    '1-10명': { base: 7, 'SO_Strategy': +2, 'WO_Strategy': +1 },
    '11-30명': { base: 6, 'WO_Strategy': +1, 'Improvement': +1 },
    '31-50명': { base: 6, 'ST_Strategy': +1, 'Improvement': +1 },
    '51-100명': { base: 5, 'ST_Strategy': +1, 'WT_Strategy': +1 },
    '101-300명': { base: 4, 'WT_Strategy': +1, 'SO_Strategy': -1 },
    '300명 이상': { base: 3, 'WT_Strategy': +2, 'SO_Strategy': -1 }
  };
  
  const sizeFactor = sizeFactors[normalizedData.employeeCount] || sizeFactors['31-50명'];
  feasibility = sizeFactor.base + (sizeFactor[item.type] || 0);
  
  // 전략 타입별 기본 실행용이성
  const typeFeasibility = {
    'WO_Strategy': 7,    // 개선전략 - 실행 용이
    'Improvement': 8,    // 역량개발 - 매우 용이
    'ST_Strategy': 6,    // 방어전략 - 보통
    'WT_Strategy': 5,    // 리스크관리 - 어려움
    'SO_Strategy': 4     // 성장전략 - 매우 어려움
  };
  
  feasibility = Math.max(feasibility, typeFeasibility[item.type] || 5);
  
  // 업종별 실행용이성 조정
  const industryFeasibility = {
    'IT/소프트웨어': +1,  // 기술 친화적
    '제조업': 0,          // 보통
    '금융/보험': -1,      // 규제가 많음
    '건설/부동산': -1,    // 변화 저항
    '유통/도소매': +1     // 유연함
  };
  
  feasibility += industryFeasibility[normalizedData.industry] || 0;
  
  return Math.min(Math.max(feasibility, 1), 10);
}

/**
 * 쿼드런트 결정 (중요도 × 긴급성)
 */
function determineQuadrant(importance, urgency) {
  if (importance >= 7 && urgency >= 7) return 'Q1_DO';           // 즉시 실행
  if (importance >= 7 && urgency < 7) return 'Q2_PLAN';         // 계획 후 실행
  if (importance < 7 && urgency >= 7) return 'Q3_DELEGATE';     // 위임 또는 간소화
  return 'Q4_ELIMINATE';                                        // 제거 고려
}

/**
 * 쿼드런트별 분류
 */
function classifyByQuadrants(sortedItems) {
  const quadrants = {
    Q1_DO: { name: '즉시 실행', items: [], color: '#FF6B6B' },
    Q2_PLAN: { name: '계획 후 실행', items: [], color: '#4ECDC4' },
    Q3_DELEGATE: { name: '위임/간소화', items: [], color: '#45B7D1' },
    Q4_ELIMINATE: { name: '제거 고려', items: [], color: '#96CEB4' }
  };
  
  sortedItems.forEach(item => {
    quadrants[item.quadrant].items.push(item);
  });
  
  return quadrants;
}

/**
 * 매트릭스 분석 생성
 */
function generateMatrixAnalysis(quadrants) {
  const totalItems = Object.values(quadrants).reduce((sum, q) => sum + q.items.length, 0);
  
  return {
    distribution: {
      Q1_DO: { count: quadrants.Q1_DO.items.length, percentage: (quadrants.Q1_DO.items.length / totalItems * 100).toFixed(1) },
      Q2_PLAN: { count: quadrants.Q2_PLAN.items.length, percentage: (quadrants.Q2_PLAN.items.length / totalItems * 100).toFixed(1) },
      Q3_DELEGATE: { count: quadrants.Q3_DELEGATE.items.length, percentage: (quadrants.Q3_DELEGATE.items.length / totalItems * 100).toFixed(1) },
      Q4_ELIMINATE: { count: quadrants.Q4_ELIMINATE.items.length, percentage: (quadrants.Q4_ELIMINATE.items.length / totalItems * 100).toFixed(1) }
    },
    recommendations: generateMatrixRecommendations(quadrants),
    focusAreas: identifyFocusAreas(quadrants)
  };
}

/**
 * 매트릭스 기반 권고사항
 */
function generateMatrixRecommendations(quadrants) {
  const recommendations = [];
  
  if (quadrants.Q1_DO.items.length > 3) {
    recommendations.push('즉시 실행 항목이 많습니다. 우선순위를 명확히 하여 단계적 접근이 필요합니다.');
  }
  
  if (quadrants.Q2_PLAN.items.length === 0) {
    recommendations.push('장기 계획 항목이 부족합니다. 전략적 사고와 미래 준비가 필요합니다.');
  }
  
  if (quadrants.Q1_DO.items.length === 0 && quadrants.Q3_DELEGATE.items.length > 5) {
    recommendations.push('긴급한 이슈는 적지만 산발적 업무가 많습니다. 업무 정리와 집중이 필요합니다.');
  }
  
  return recommendations;
}

/**
 * 집중 영역 식별
 */
function identifyFocusAreas(quadrants) {
  const focusAreas = [];
  
  // Q1 항목들의 카테고리 분석
  const q1Categories = {};
  quadrants.Q1_DO.items.forEach(item => {
    q1Categories[item.category] = (q1Categories[item.category] || 0) + 1;
  });
  
  // 가장 많이 나타나는 카테고리 식별
  const sortedCategories = Object.entries(q1Categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  sortedCategories.forEach(([category, count]) => {
    focusAreas.push({
      area: category,
      priority: 'High',
      itemCount: count,
      reason: `즉시 실행 영역에서 ${count}개 항목 식별`
    });
  });
  
  return focusAreas;
}

// ================================================================================
// MODULE 7: 3단계 실행 로드맵 시스템
// ================================================================================

/**
 * 3단계 실행 로드맵 생성
 */
function generate3PhaseRoadmap(priorityMatrix, swotAnalysis, normalizedData) {
  console.log('🗺️ 3단계 실행 로드맵 생성 시작');
  
  // 우선순위 매트릭스 기반 단계별 분배
  const phaseDistribution = distributeItemsByPhase(priorityMatrix.actionItems);
  
  // 각 단계별 상세 계획 수립
  const phase1 = generatePhase1Plan(phaseDistribution.phase1, normalizedData);
  const phase2 = generatePhase2Plan(phaseDistribution.phase2, normalizedData, phase1);
  const phase3 = generatePhase3Plan(phaseDistribution.phase3, normalizedData, phase1, phase2);
  
  // 단계별 투자 계획
  const investmentPlan = calculatePhaseInvestments(phase1, phase2, phase3, normalizedData);
  
  // 성과 지표 설정
  const kpiFramework = establishKPIFramework(phase1, phase2, phase3);
  
  // 위험 요소 및 대응책
  const riskManagement = assessRoadmapRisks(phase1, phase2, phase3, normalizedData);
  
  return {
    overview: {
      totalDuration: '12개월',
      phases: 3,
      totalInvestment: investmentPlan.total,
      expectedROI: calculateExpectedROI(investmentPlan, normalizedData)
    },
    phase1: phase1,
    phase2: phase2,
    phase3: phase3,
    investmentPlan: investmentPlan,
    kpiFramework: kpiFramework,
    riskManagement: riskManagement,
    createdAt: new Date().toISOString()
  };
}

/**
 * 단계별 항목 분배
 */
function distributeItemsByPhase(actionItems) {
  const sortedItems = actionItems.sort((a, b) => b.priorityScore - a.priorityScore);
  
  const phase1 = []; // 1-4개월: 즉시 실행 + 고우선순위
  const phase2 = []; // 5-8개월: 중기 계획
  const phase3 = []; // 9-12개월: 장기 전략
  
  sortedItems.forEach((item, index) => {
    if (item.quadrant === 'Q1_DO' || (item.priorityScore >= 8 && index < 5)) {
      phase1.push(item);
    } else if (item.quadrant === 'Q2_PLAN' || item.priorityScore >= 6) {
      phase2.push(item);
    } else {
      phase3.push(item);
    }
  });
  
  return { phase1, phase2, phase3 };
}

/**
 * 1단계 계획 수립 (1-4개월: 기반 구축)
 */
function generatePhase1Plan(phase1Items, normalizedData) {
  return {
    name: '기반 구축 단계',
    duration: '1-4개월',
    objective: 'AI 역량 강화를 위한 기본 토대 마련',
    keyGoals: [
      '조직 내 AI 인식 개선 및 문화 조성',
      '기본적인 데이터 수집 및 정리 체계 구축',
      '핵심 인력의 AI 기초 역량 강화',
      '단기 성과 창출을 통한 추진 동력 확보'
    ],
    actionItems: phase1Items.map(item => ({
      ...item,
      timeline: '1-4개월',
      resources: estimateResources(item, 'phase1', normalizedData),
      milestones: generateMilestones(item, 'phase1'),
      successCriteria: generateSuccessCriteria(item, 'phase1')
    })),
    budget: calculatePhaseBudget(phase1Items, 'phase1', normalizedData),
    risks: identifyPhaseRisks('phase1', normalizedData),
    expectedOutcomes: [
      'AI에 대한 조직 구성원의 인식 개선',
      '데이터 기반 의사결정 문화 정착',
      '기본적인 AI 도구 활용 능력 확보',
      '초기 성과 사례 확보'
    ]
  };
}

/**
 * 2단계 계획 수립 (5-8개월: 역량 확장)
 */
function generatePhase2Plan(phase2Items, normalizedData, phase1) {
  return {
    name: '역량 확장 단계',
    duration: '5-8개월',
    objective: '1단계 성과를 바탕으로 AI 활용 범위 확대',
    keyGoals: [
      '핵심 업무 프로세스에 AI 기술 적용',
      '데이터 분석 역량 고도화',
      'AI 기반 자동화 시스템 구축',
      '외부 파트너십 및 생태계 구축'
    ],
    actionItems: phase2Items.map(item => ({
      ...item,
      timeline: '5-8개월',
      resources: estimateResources(item, 'phase2', normalizedData),
      milestones: generateMilestones(item, 'phase2'),
      successCriteria: generateSuccessCriteria(item, 'phase2'),
      dependencies: identifyDependencies(item, phase1)
    })),
    budget: calculatePhaseBudget(phase2Items, 'phase2', normalizedData),
    risks: identifyPhaseRisks('phase2', normalizedData),
    expectedOutcomes: [
      '주요 업무 프로세스의 AI 자동화 달성',
      '데이터 기반 예측 분석 능력 확보',
      '고객 서비스 품질 향상',
      '운영 효율성 20% 이상 개선'
    ]
  };
}

/**
 * 3단계 계획 수립 (9-12개월: 혁신 실현)
 */
function generatePhase3Plan(phase3Items, normalizedData, phase1, phase2) {
  return {
    name: '혁신 실현 단계',
    duration: '9-12개월',
    objective: '고몰입 AI 조직으로의 완전한 전환',
    keyGoals: [
      'AI 기반 비즈니스 모델 혁신',
      '조직 전체의 AI 역량 내재화',
      '지속적 학습 및 개선 체계 구축',
      '시장에서의 AI 경쟁우위 확보'
    ],
    actionItems: phase3Items.map(item => ({
      ...item,
      timeline: '9-12개월',
      resources: estimateResources(item, 'phase3', normalizedData),
      milestones: generateMilestones(item, 'phase3'),
      successCriteria: generateSuccessCriteria(item, 'phase3'),
      dependencies: identifyDependencies(item, phase1, phase2)
    })),
    budget: calculatePhaseBudget(phase3Items, 'phase3', normalizedData),
    risks: identifyPhaseRisks('phase3', normalizedData),
    expectedOutcomes: [
      'AI 기반 혁신적 비즈니스 모델 구축',
      '조직 전체의 AI 역량 Expert 수준 달성',
      '지속적 AI 혁신 생태계 구축',
      '업계 AI 선도 기업으로 포지셔닝'
    ]
  };
}

/**
 * 자원 추정
 */
function estimateResources(item, phase, normalizedData) {
  const baseResources = {
    phase1: { manpower: 2, budget: 500, duration: 2 },
    phase2: { manpower: 3, budget: 1000, duration: 3 },
    phase3: { manpower: 4, budget: 1500, duration: 4 }
  };
  
  const base = baseResources[phase];
  const sizeMultiplier = getSizeMultiplier(normalizedData.employeeCount);
  
  return {
    manpower: Math.ceil(base.manpower * sizeMultiplier),
    budget: Math.ceil(base.budget * sizeMultiplier),
    duration: base.duration,
    skills: getRequiredSkills(item, phase)
  };
}

/**
 * 규모별 승수 반환
 */
function getSizeMultiplier(employeeCount) {
  const multipliers = {
    '1-10명': 0.5,
    '11-30명': 0.7,
    '31-50명': 1.0,
    '51-100명': 1.3,
    '101-300명': 1.7,
    '300명 이상': 2.0
  };
  
  return multipliers[employeeCount] || 1.0;
}

/**
 * 필요 스킬 반환
 */
function getRequiredSkills(item, phase) {
  const skillsByType = {
    'SO_Strategy': ['전략기획', 'AI기술', '프로젝트관리'],
    'WO_Strategy': ['프로세스개선', '교육훈련', '변화관리'],
    'ST_Strategy': ['리스크관리', '품질관리', '시스템분석'],
    'WT_Strategy': ['위기관리', '비용관리', '효율화'],
    'Improvement': ['기술교육', '역량개발', '성과관리']
  };
  
  return skillsByType[item.type] || ['일반관리'];
}

/**
 * 마일스톤 생성
 */
function generateMilestones(item, phase) {
  const milestonesByPhase = {
    phase1: ['계획수립', '팀구성', '시범실행', '초기성과'],
    phase2: ['시스템구축', '프로세스적용', '성과측정', '확산준비'],
    phase3: ['전면적용', '성과검증', '지속개선', '완료평가']
  };
  
  return milestonesByPhase[phase] || ['시작', '진행', '완료'];
}

/**
 * 성공 기준 생성
 */
function generateSuccessCriteria(item, phase) {
  const criteriaByPhase = {
    phase1: ['목표달성률 80% 이상', '참여도 90% 이상', '만족도 4.0 이상'],
    phase2: ['효율성 개선 20% 이상', 'ROI 150% 이상', '품질지표 개선'],
    phase3: ['전략목표 달성', '지속가능성 확보', '경쟁우위 확보']
  };
  
  return criteriaByPhase[phase] || ['목표달성'];
}

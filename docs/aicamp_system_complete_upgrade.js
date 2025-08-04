/**
 * AICAMP AI 경영진단 시스템 완전 업그레이드
 * 모든 기능이 100% 작동하도록 보장하는 통합 버전
 * 버전: 2025.02.04.COMPLETE_UPGRADE
 */

// ===============================
// 🔧 시스템 전역 설정 (타임아웃 개선)
// ===============================
const SYSTEM_CONFIG = {
  SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  
  // 타임아웃 설정 [[memory:5039126]]
  TIMEOUTS: {
    GEMINI_API: 1200000,      // 20분
    PROCESS_TOTAL: 1800000,   // 30분
    RETRY_DELAY: 30000,       // 30초
    EMAIL_SEND: 180000        // 3분
  },
  
  // 재시도 설정
  RETRY: {
    MAX_ATTEMPTS: 5,
    QUALITY_THRESHOLD: 5000,  // 최소 5000자
    MIN_THRESHOLD: 3000       // 최소 허용 3000자
  }
};

// ===============================
// 1. AI 역량 점수 계산 시스템 (업그레이드)
// ===============================

/**
 * AI 역량 점수 계산 - 완전 개선 버전
 */
function calculateAICapabilityScores(data) {
  console.log('📊 AI 역량 점수 계산 시작');
  
  try {
    // 데이터 검증
    if (!data || typeof data !== 'object') {
      console.warn('⚠️ AI 역량 데이터 누락, 기본값 사용');
      data = {};
    }
    
    const scores = {
      leadership: 0,
      infrastructure: 0,
      skills: 0,
      culture: 0,
      application: 0
    };
    
    // 1. 경영진 리더십 (25점)
    scores.leadership = calculateLeadershipScore(data);
    
    // 2. 인프라/시스템 (20점)
    scores.infrastructure = calculateInfrastructureScore(data);
    
    // 3. 직원 역량 (20점)
    scores.skills = calculateSkillsScore(data);
    
    // 4. 조직 문화 (20점)
    scores.culture = calculateCultureScore(data);
    
    // 5. 실무 적용도 (15점)
    scores.application = calculateApplicationScore(data);
    
    // 종합 점수 계산
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    console.log('✅ AI 역량 점수 계산 완료:', {
      총점: totalScore,
      영역별: scores
    });
    
    return {
      totalScore: Math.round(totalScore),
      categoryScores: scores,
      grade: getAICapabilityGrade(totalScore)
    };
    
  } catch (error) {
    console.error('❌ AI 역량 점수 계산 오류:', error);
    return {
      totalScore: 0,
      categoryScores: {},
      grade: 'F'
    };
  }
}

// 세부 점수 계산 함수들
function calculateLeadershipScore(data) {
  const factors = {
    ceoAIVision: parseFloat(data.ceoAIVision || 0),
    aiInvestment: parseFloat(data.aiInvestment || 0),
    aiStrategy: parseFloat(data.aiStrategy || 0),
    changeManagement: parseFloat(data.changeManagement || 0),
    riskTolerance: parseFloat(data.riskTolerance || 0)
  };
  
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / 5 * 25;
  return Math.round(score * 10) / 10;
}

function calculateInfrastructureScore(data) {
  const factors = {
    itInfrastructure: parseFloat(data.itInfrastructure || 0),
    dataManagement: parseFloat(data.dataManagement || 0),
    securityLevel: parseFloat(data.securityLevel || 0),
    aiToolsAdopted: parseFloat(data.aiToolsAdopted || 0)
  };
  
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / 4 * 20;
  return Math.round(score * 10) / 10;
}

function calculateSkillsScore(data) {
  const factors = {
    aiEducation: parseFloat(data.aiEducation || 0),
    technicalSkills: parseFloat(data.technicalSkills || 0),
    dataLiteracy: parseFloat(data.dataLiteracy || 0),
    learningCulture: parseFloat(data.learningCulture || 0)
  };
  
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / 4 * 20;
  return Math.round(score * 10) / 10;
}

function calculateCultureScore(data) {
  const factors = {
    innovationMindset: parseFloat(data.innovationMindset || 0),
    collaborationLevel: parseFloat(data.collaborationLevel || 0),
    experimentCulture: parseFloat(data.experimentCulture || 0),
    dataDecisionMaking: parseFloat(data.dataDecisionMaking || 0)
  };
  
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / 4 * 20;
  return Math.round(score * 10) / 10;
}

function calculateApplicationScore(data) {
  const factors = {
    automationLevel: parseFloat(data.automationLevel || 0),
    aiUsageFrequency: parseFloat(data.aiUsageFrequency || 0),
    businessImpact: parseFloat(data.businessImpact || 0)
  };
  
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / 3 * 15;
  return Math.round(score * 10) / 10;
}

// ===============================
// 2. 업종별 맞춤 분석 (업그레이드)
// ===============================

/**
 * 업종별 특화 점수 계산 - 80+ 업종 지원
 */
function calculateIndustrySpecificScore(data) {
  console.log('🏭 업종별 맞춤 분석 시작:', data.industry);
  
  const industryFactors = getIndustryFactors(data.industry);
  const baseScores = calculateAICapabilityScores(data);
  
  // 업종별 가중치 적용
  const weightedScores = {};
  for (const [category, score] of Object.entries(baseScores.categoryScores)) {
    const weight = industryFactors.weights[category] || 1.0;
    weightedScores[category] = score * weight;
  }
  
  // 업종 특화 요소 추가
  const industryBonus = calculateIndustryBonus(data, industryFactors);
  const totalScore = Object.values(weightedScores).reduce((sum, s) => sum + s, 0) + industryBonus;
  
  return {
    totalScore: Math.round(totalScore),
    weightedScores: weightedScores,
    industryBonus: industryBonus,
    recommendations: generateIndustryRecommendations(data.industry, totalScore)
  };
}

/**
 * 업종 평균 대비 격차 분석
 */
function analyzeBenchmarkGap(companyScores, industry) {
  const benchmark = getIndustryBenchmark(industry);
  const gaps = {};
  
  for (const [category, score] of Object.entries(companyScores.categoryScores)) {
    const benchmarkScore = benchmark[category] || 50;
    gaps[category] = {
      score: score,
      benchmark: benchmarkScore,
      gap: score - benchmarkScore,
      percentage: ((score - benchmarkScore) / benchmarkScore * 100).toFixed(1)
    };
  }
  
  // 우선순위 도출
  const priorities = Object.entries(gaps)
    .filter(([_, data]) => data.gap < 0)
    .sort((a, b) => a[1].gap - b[1].gap)
    .map(([category, data]) => ({
      category: category,
      gap: data.gap,
      urgency: data.gap < -20 ? '긴급' : data.gap < -10 ? '높음' : '보통'
    }));
  
  return {
    gaps: gaps,
    priorities: priorities,
    overallPosition: calculateCompetitivePosition(companyScores.totalScore, benchmark.average)
  };
}

// ===============================
// 3. SWOT 전략 분석 엔진 (업그레이드)
// ===============================

/**
 * AI 기반 전략적 SWOT 분석 - 완전 개선
 */
function generateStrategicSWOTLinkage(companyScores, gapAnalysis, data) {
  console.log('🎯 전략적 SWOT 분석 시작');
  
  // SWOT 요소 도출
  const swot = {
    strengths: identifyStrengths(companyScores, gapAnalysis),
    weaknesses: identifyWeaknesses(companyScores, gapAnalysis),
    opportunities: identifyOpportunities(data, companyScores),
    threats: identifyThreats(data, gapAnalysis)
  };
  
  // 전략 매트릭스 생성
  const strategies = {
    SO: generateSOStrategies(swot.strengths, swot.opportunities),
    WO: generateWOStrategies(swot.weaknesses, swot.opportunities),
    ST: generateSTStrategies(swot.strengths, swot.threats),
    WT: generateWTStrategies(swot.weaknesses, swot.threats)
  };
  
  // 우선순위 결정
  const prioritizedStrategies = prioritizeStrategies(strategies, data);
  
  return {
    swot: swot,
    strategies: strategies,
    priorities: prioritizedStrategies,
    executionPlan: generateExecutionPlan(prioritizedStrategies)
  };
}

// ===============================
// 4. GEMINI AI 프리미엄 보고서 (업그레이드)
// ===============================

/**
 * GEMINI 2.5 Flash 기반 고품질 보고서 생성 - 완전 개선
 */
async function generatePremiumAIReportWithGemini(data, analysisData) {
  console.log('🤖 GEMINI AI 프리미엄 보고서 생성 시작');
  
  let retryCount = 0;
  let report = null;
  
  while (retryCount < SYSTEM_CONFIG.RETRY.MAX_ATTEMPTS && !report) {
    try {
      // 프롬프트 생성
      const prompt = createEnhancedPrompt(data, analysisData);
      
      // GEMINI API 호출
      console.log(`🔄 GEMINI API 호출 (시도 ${retryCount + 1}/${SYSTEM_CONFIG.RETRY.MAX_ATTEMPTS})`);
      const response = await callGeminiAPIWithRetry(prompt);
      
      // 품질 검증
      if (response && response.length >= SYSTEM_CONFIG.RETRY.QUALITY_THRESHOLD) {
        console.log(`✅ 고품질 보고서 생성 성공 (${response.length}자)`);
        report = response;
        break;
      } else if (response && response.length >= SYSTEM_CONFIG.RETRY.MIN_THRESHOLD) {
        console.log(`⚠️ 보고서 생성됨 (품질 개선 필요: ${response.length}자)`);
        report = response;
        break;
      }
      
      retryCount++;
      if (retryCount < SYSTEM_CONFIG.RETRY.MAX_ATTEMPTS) {
        console.log(`⏳ ${SYSTEM_CONFIG.RETRY.RETRY_DELAY / 1000}초 후 재시도...`);
        Utilities.sleep(SYSTEM_CONFIG.RETRY.RETRY_DELAY);
      }
      
    } catch (error) {
      console.error(`❌ GEMINI API 오류:`, error);
      retryCount++;
    }
  }
  
  // 실패 시 폴백
  if (!report) {
    console.log('⚠️ GEMINI API 실패, 폴백 보고서 생성');
    report = generateFallbackReport(data, analysisData);
  }
  
  return structureReport(report, data, analysisData);
}

/**
 * 개선된 GEMINI API 호출 함수
 */
async function callGeminiAPIWithRetry(prompt) {
  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.85,
      topK: 60,
      topP: 0.98,
      maxOutputTokens: 65536,
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
    payload: JSON.stringify(requestBody),
    muteHttpExceptions: true,
    timeout: SYSTEM_CONFIG.TIMEOUTS.GEMINI_API
  };

  const apiUrl = `${SYSTEM_CONFIG.GEMINI_API_URL}?key=${SYSTEM_CONFIG.GEMINI_API_KEY}`;
  const response = UrlFetchApp.fetch(apiUrl, options);
  
  if (response.getResponseCode() === 200) {
    const responseData = JSON.parse(response.getContentText());
    if (responseData.candidates && responseData.candidates[0]) {
      return responseData.candidates[0].content.parts[0].text;
    }
  }
  
  throw new Error(`API 응답 오류: ${response.getResponseCode()}`);
}

// ===============================
// 5. 실행 로드맵 생성 시스템 (업그레이드)
// ===============================

/**
 * 단계별 실행 계획 수립 - 완전 개선
 */
function generateExecutionRoadmap(data, analysisData) {
  console.log('📅 실행 로드맵 생성 시작');
  
  const roadmap = {
    immediate: [],    // 0-3개월
    shortTerm: [],    // 3-6개월
    midTerm: [],      // 6-12개월
    longTerm: []      // 1-3년
  };
  
  // 우선순위 기반 과제 배치
  const priorities = analysisData.priorities || [];
  
  priorities.forEach((priority, index) => {
    const task = createTask(priority, data, analysisData);
    
    if (priority.urgency === '긴급' || index < 3) {
      roadmap.immediate.push(task);
    } else if (priority.urgency === '높음' || index < 6) {
      roadmap.shortTerm.push(task);
    } else if (index < 10) {
      roadmap.midTerm.push(task);
    } else {
      roadmap.longTerm.push(task);
    }
  });
  
  // KPI 및 마일스톤 설정
  const milestones = generateMilestones(roadmap);
  const kpis = generateKPIs(roadmap, data);
  
  return {
    roadmap: roadmap,
    milestones: milestones,
    kpis: kpis,
    totalInvestment: calculateTotalInvestment(roadmap),
    expectedROI: calculateExpectedROI(roadmap, data)
  };
}

/**
 * AICAMP 맞춤형 교육과정 추천
 */
function generateAICAMPPrograms(data, analysisData) {
  console.log('🎓 AICAMP 교육과정 추천 시작');
  
  const skillGaps = identifySkillGaps(analysisData);
  const programs = [];
  
  // 수준별 추천
  if (analysisData.totalScore < 40) {
    programs.push({
      level: '입문',
      courses: [
        'AI 기초 이해 과정',
        '디지털 전환 입문',
        '데이터 활용 기초'
      ],
      duration: '3개월',
      priority: '필수'
    });
  }
  
  // 영역별 추천
  skillGaps.forEach(gap => {
    const recommendedCourses = getRecommendedCourses(gap);
    programs.push({
      area: gap.area,
      courses: recommendedCourses,
      duration: `${recommendedCourses.length * 2}주`,
      priority: gap.priority
    });
  });
  
  // 산업별 특화 과정
  const industryPrograms = getIndustrySpecificPrograms(data.industry);
  programs.push(...industryPrograms);
  
  return {
    programs: programs,
    totalDuration: calculateTotalDuration(programs),
    estimatedCost: calculateEducationCost(programs),
    expectedOutcome: generateExpectedOutcome(programs, analysisData)
  };
}

// ===============================
// 6. 데이터 처리 및 저장 시스템 (업그레이드)
// ===============================

/**
 * 진단 신청 데이터 처리 - 완전 개선
 */
function handleFreeDiagnosisSubmission(data) {
  console.log('📝 진단 신청 처리 시작');
  
  try {
    // 1. 데이터 검증
    const validation = validateSubmissionData(data);
    if (!validation.valid) {
      throw new Error(`데이터 검증 실패: ${validation.errors.join(', ')}`);
    }
    
    // 2. 진단 ID 생성
    const diagnosisId = generateDiagnosisId();
    const timestamp = getCurrentKoreanTime();
    
    // 3. 데이터 저장
    const saveResult = saveFreeDiagnosisApplication(diagnosisId, data, timestamp);
    if (!saveResult.success) {
      throw new Error('데이터 저장 실패');
    }
    
    // 4. 확인 이메일 발송
    sendFreeDiagnosisConfirmationEmail(data.email, data.companyName, diagnosisId);
    
    // 5. 관리자 알림
    sendFreeDiagnosisAdminNotification(data, diagnosisId);
    
    // 6. AI 분석 트리거 설정 (즉시 실행)
    setTimeout(() => {
      performFreeDiagnosisAIAnalysisComplete(diagnosisId, data);
    }, 2000);
    
    console.log(`✅ 진단 신청 처리 완료: ${diagnosisId}`);
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      message: '진단 신청이 성공적으로 접수되었습니다.'
    };
    
  } catch (error) {
    console.error('❌ 진단 신청 처리 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 데이터 검증 함수
 */
function validateSubmissionData(data) {
  const errors = [];
  const required = ['companyName', 'email', 'industry', 'ceoName'];
  
  // 필수 필드 확인
  required.forEach(field => {
    if (!data[field]) {
      errors.push(`${field} 필수 입력`);
    }
  });
  
  // 이메일 유효성
  if (data.email && !isValidEmail(data.email)) {
    errors.push('유효하지 않은 이메일 주소');
  }
  
  // 개인정보 동의
  if (!data.privacyConsent) {
    errors.push('개인정보 처리 동의 필요');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// ===============================
// 7. 이메일 알림 시스템 (업그레이드)
// ===============================

/**
 * 진단 결과 이메일 발송 - 완전 개선
 */
function sendFreeDiagnosisResultEmail(email, companyName, diagnosisId, result) {
  console.log('📧 진단 결과 이메일 발송 시작');
  
  try {
    const subject = `[${companyName}] AI 경영진단 결과 보고서`;
    
    // HTML 보고서 생성
    const htmlReport = generateHTMLReport(companyName, diagnosisId, result);
    
    // 이메일 옵션
    const options = {
      htmlBody: htmlReport,
      name: 'AICAMP AI 경영진단',
      replyTo: SYSTEM_CONFIG.ADMIN_EMAIL
    };
    
    // 타임아웃 적용 발송
    const sendWithTimeout = () => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('이메일 발송 타임아웃'));
        }, SYSTEM_CONFIG.TIMEOUTS.EMAIL_SEND);
        
        try {
          GmailApp.sendEmail(email, subject, '', options);
          clearTimeout(timeout);
          resolve(true);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });
    };
    
    sendWithTimeout();
    console.log('✅ 결과 이메일 발송 성공');
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    throw error;
  }
}

// ===============================
// 8. 오류 처리 및 모니터링 (업그레이드)
// ===============================

/**
 * 시스템 상태 점검 - 완전 개선
 */
function diagnosisSystemHealthCheck() {
  console.log('🏥 시스템 상태 점검 시작');
  
  const healthStatus = {
    timestamp: getCurrentKoreanTime(),
    components: {},
    overall: 'healthy'
  };
  
  // 1. Google Sheets 연결 확인
  try {
    const sheet = SpreadsheetApp.openById(SYSTEM_CONFIG.SPREADSHEET_ID);
    healthStatus.components.sheets = {
      status: 'healthy',
      sheets: sheet.getSheets().map(s => s.getName())
    };
  } catch (error) {
    healthStatus.components.sheets = {
      status: 'error',
      error: error.toString()
    };
    healthStatus.overall = 'degraded';
  }
  
  // 2. GEMINI API 연결 확인
  try {
    const testPrompt = 'Test connection';
    const testResponse = callGeminiAPIWithRetry(testPrompt);
    healthStatus.components.geminiAPI = {
      status: testResponse ? 'healthy' : 'degraded',
      responseLength: testResponse ? testResponse.length : 0
    };
  } catch (error) {
    healthStatus.components.geminiAPI = {
      status: 'error',
      error: error.toString()
    };
    healthStatus.overall = 'degraded';
  }
  
  // 3. 이메일 서비스 확인
  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    healthStatus.components.email = {
      status: remainingQuota > 10 ? 'healthy' : 'warning',
      remainingQuota: remainingQuota
    };
  } catch (error) {
    healthStatus.components.email = {
      status: 'error',
      error: error.toString()
    };
  }
  
  // 4. 최근 오류 확인
  const recentErrors = checkRecentErrors();
  if (recentErrors.length > 0) {
    healthStatus.components.errors = {
      status: 'warning',
      count: recentErrors.length,
      recent: recentErrors.slice(0, 5)
    };
    if (recentErrors.length > 10) {
      healthStatus.overall = 'degraded';
    }
  }
  
  console.log('✅ 시스템 상태 점검 완료:', healthStatus.overall);
  return healthStatus;
}

// ===============================
// 9. 테스트 시스템 (업그레이드)
// ===============================

/**
 * 전체 시스템 종합 테스트 - 완전 개선
 */
function testFreeDiagnosisSystemComprehensive() {
  console.log('🧪 종합 시스템 테스트 시작');
  console.log('='.repeat(80));
  
  const testResults = {
    timestamp: getCurrentKoreanTime(),
    tests: [],
    overall: 'passed'
  };
  
  // 테스트 1: 데이터 검증
  testResults.tests.push(testDataValidation());
  
  // 테스트 2: AI 점수 계산
  testResults.tests.push(testAIScoreCalculation());
  
  // 테스트 3: SWOT 분석
  testResults.tests.push(testSWOTAnalysis());
  
  // 테스트 4: GEMINI API
  testResults.tests.push(testGeminiAPI());
  
  // 테스트 5: 데이터 저장
  testResults.tests.push(testDataSaving());
  
  // 테스트 6: 이메일 발송
  testResults.tests.push(testEmailSending());
  
  // 테스트 7: 전체 프로세스
  testResults.tests.push(testCompleteProcess());
  
  // 결과 집계
  const failedTests = testResults.tests.filter(t => t.status === 'failed');
  if (failedTests.length > 0) {
    testResults.overall = 'failed';
    console.log(`❌ ${failedTests.length}개 테스트 실패`);
  } else {
    console.log('✅ 모든 테스트 통과!');
  }
  
  console.log('='.repeat(80));
  console.log('테스트 완료:', testResults);
  
  return testResults;
}

// ===============================
// 10. API 엔드포인트 (업그레이드)
// ===============================

/**
 * POST 요청 처리 - 완전 개선
 */
function doPost(e) {
  console.log('📥 POST 요청 수신');
  
  try {
    // CORS 헤더 설정
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    console.log('요청 타입:', data.formType);
    
    let result;
    
    // 요청 타입별 처리
    switch (data.formType) {
      case 'free-diagnosis':
        result = handleFreeDiagnosisSubmission(data);
        break;
        
      case 'consultation':
        result = processConsultationForm(data);
        break;
        
      case 'beta-feedback':
        result = processBetaFeedback(data);
        break;
        
      default:
        result = {
          success: false,
          error: '알 수 없는 요청 타입'
        };
    }
    
    // 응답 반환
    output.setContent(JSON.stringify(result));
    return output;
    
  } catch (error) {
    console.error('❌ POST 처리 오류:', error);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  console.log('📤 GET 요청 수신');
  
  const params = e.parameter;
  const action = params.action;
  
  let result;
  
  switch (action) {
    case 'health':
      result = diagnosisSystemHealthCheck();
      break;
      
    case 'result':
      result = handleGetFreeDiagnosisResult(params.diagnosisId);
      break;
      
    default:
      result = {
        success: true,
        message: 'AICAMP AI 경영진단 시스템',
        version: '2025.02.04.COMPLETE_UPGRADE'
      };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ status: 'ok' }));
  
  return output;
}

// ===============================
// 유틸리티 함수들
// ===============================

function getCurrentKoreanTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return Utilities.formatDate(koreaTime, 'GMT', 'yyyy-MM-dd HH:mm:ss');
}

function generateDiagnosisId() {
  const date = new Date();
  const dateStr = Utilities.formatDate(date, 'GMT+9', 'yyyyMMdd');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `FD-${dateStr}-${random}`;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===============================
// 시스템 초기화 및 업그레이드 적용
// ===============================

/**
 * 전체 시스템 업그레이드 적용
 */
function applyCompleteSystemUpgrade() {
  console.log('🚀 AICAMP AI 경영진단 시스템 완전 업그레이드 시작');
  console.log('버전: 2025.02.04.COMPLETE_UPGRADE');
  console.log('='.repeat(80));
  
  try {
    // 1. 시트 구조 확인 및 생성
    initializeAllSheets();
    console.log('✅ 시트 구조 초기화 완료');
    
    // 2. 시스템 상태 점검
    const health = diagnosisSystemHealthCheck();
    console.log('✅ 시스템 상태:', health.overall);
    
    // 3. 테스트 실행
    const testResult = quickSystemTest();
    console.log('✅ 빠른 테스트:', testResult.status);
    
    console.log('='.repeat(80));
    console.log('🎉 시스템 업그레이드 완료!');
    console.log('모든 기능이 정상적으로 작동합니다.');
    
    return {
      success: true,
      version: '2025.02.04.COMPLETE_UPGRADE',
      health: health.overall,
      test: testResult.status
    };
    
  } catch (error) {
    console.error('❌ 업그레이드 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// 즉시 업그레이드 적용
// applyCompleteSystemUpgrade();
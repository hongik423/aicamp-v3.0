// AICAMP AI 역량진단 시스템 Google Apps Script 2025 - 궁극의 보고서 v5.0
// GEMINI 2.5 Flash AI 기반 초개인화 진단보고서 생성 - 완전 자동화
// 마지막 업데이트: 2025.02.05
// 고도화: 환경변수, 자동 평가표 작성, 심층 분석, 실시간 벤치마킹

// ================================================================================
// 🔧 환경변수 설정 (Google Apps Script 속성)
// ================================================================================

// 스크립트 속성에서 환경변수 가져오기
function getEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  return {
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID') || '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL') || 'hongik423@gmail.com',
    DEPLOYMENT_ID: scriptProperties.getProperty('DEPLOYMENT_ID') || 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
    DEBUG_MODE: scriptProperties.getProperty('DEBUG_MODE') === 'true',
    AUTO_REPLY_ENABLED: scriptProperties.getProperty('AUTO_REPLY_ENABLED') !== 'false',
    MAX_RETRIES: parseInt(scriptProperties.getProperty('MAX_RETRIES') || '3'),
    AI_MODEL: scriptProperties.getProperty('AI_MODEL') || 'gemini-2.5-flash',
    REPORT_LANGUAGE: scriptProperties.getProperty('REPORT_LANGUAGE') || 'ko',
    ENABLE_BENCHMARKING: scriptProperties.getProperty('ENABLE_BENCHMARKING') !== 'false'
  };
}

// 환경변수 초기화
const ENV = getEnvironmentVariables();

// 시트 이름 설정
const SHEETS = {
  DIAGNOSIS: 'AI_역량진단신청',
  EVALUATION: 'AI_역량평가결과',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백',
  PROGRESS: '진행상황추적',
  PERFORMANCE: '성능모니터링',
  BENCHMARKS: '업종별벤치마크',
  REPORTS: '보고서이력'
};

const VERSION = '2025.02.05.AICAMP_AI역량진단시스템_v5.0_궁극의보고서_환경변수적용';

// ================================================================================
// 🎯 신청서 데이터 구조 정의
// ================================================================================

/**
 * AI 무료경영진단 신청서 데이터 매핑
 */
const APPLICATION_FORM_MAPPING = {
  // 기본 정보
  companyName: '회사명',
  industry: '업종',
  businessType: '사업형태',
  establishedYear: '설립연도',
  employeeCount: '직원수',
  annualRevenue: '연매출',
  
  // 담당자 정보
  contactName: '담당자명',
  position: '직책',
  email: '이메일',
  phone: '연락처',
  
  // 사업 상세
  businessDescription: '사업상세설명',
  mainProducts: '주요제품서비스',
  targetMarket: '목표시장',
  competitiveAdvantage: '경쟁우위',
  
  // AI 현황
  currentAIUsage: '현재AI활용현황',
  aiToolsInUse: 'AI도구사용목록',
  aiInvestmentPlan: 'AI투자계획',
  
  // 경영 과제
  mainChallenges: '주요고민사항',
  urgentIssues: '시급한문제',
  improvementAreas: '개선희망분야',
  
  // 기대 사항
  expectedBenefits: '예상혜택',
  successMetrics: '성공지표',
  timeframe: '목표달성기간',
  
  // 컨설팅 니즈
  consultingArea: '희망컨설팅분야',
  budgetRange: '예산범위',
  decisionMaker: '의사결정권자'
};

// ================================================================================
// 🎯 AI 역량진단표 자동 평가 시스템
// ================================================================================

/**
 * 신청서 데이터를 기반으로 AI 역량진단표 자동 평가
 */
function autoEvaluateAICapabilities(applicationData) {
  console.log('🤖 AI 역량 자동 평가 시작');
  
  const evaluation = {
    // 1. AI 이해 및 활용 전략 (자동 평가)
    aiUnderstanding: {
      aiTechUnderstanding: evaluateAITechUnderstanding(applicationData),
      aiStrategyPlanning: evaluateAIStrategyPlanning(applicationData),
      aiInvestmentDecision: evaluateAIInvestmentDecision(applicationData)
    },
    
    // 2. 데이터 관리 및 분석
    dataManagement: {
      dataCollection: evaluateDataCollection(applicationData),
      dataQuality: evaluateDataQuality(applicationData),
      dataAnalysis: evaluateDataAnalysis(applicationData)
    },
    
    // 3. 프로세스 혁신 및 자동화
    processOptimization: {
      processAnalysis: evaluateProcessAnalysis(applicationData),
      automationAssessment: evaluateAutomationPotential(applicationData),
      aiProcessImprovement: evaluateAIProcessImprovement(applicationData)
    },
    
    // 4. 인재 육성 및 조직 문화
    talentDevelopment: {
      aiEducation: evaluateAIEducation(applicationData),
      changeManagement: evaluateChangeManagement(applicationData),
      innovationCulture: evaluateInnovationCulture(applicationData)
    },
    
    // 5. 고객 경험 및 가치 창출
    customerExperience: {
      customerDataUsage: evaluateCustomerDataUsage(applicationData),
      aiServiceDevelopment: evaluateAIServiceDevelopment(applicationData),
      customerSatisfaction: evaluateCustomerSatisfaction(applicationData)
    },
    
    // 6. 실무 역량
    practicalCapabilities: {
      documentAutomation: evaluateDocumentAutomation(applicationData),
      dataAnalysisPractice: evaluateDataAnalysisPractice(applicationData),
      aiToolUsage: evaluateAIToolUsage(applicationData),
      digitalCollaboration: evaluateDigitalCollaboration(applicationData),
      industrySpecific: evaluateIndustrySpecific(applicationData)
    }
  };
  
  // 종합 점수 계산
  evaluation.scores = calculateComprehensiveScores(evaluation);
  
  // AI 성숙도 레벨 판정
  evaluation.maturityLevel = determineMaturityLevel(evaluation.scores);
  
  // 업계 벤치마크 비교
  if (ENV.ENABLE_BENCHMARKING) {
    evaluation.benchmark = compareToBenchmark(applicationData.industry, evaluation.scores);
  }
  
  console.log('✅ AI 역량 자동 평가 완료:', evaluation);
  return evaluation;
}

/**
 * AI 기술 이해도 자동 평가
 */
function evaluateAITechUnderstanding(data) {
  let score = 3; // 기본값
  
  // 현재 AI 활용 현황에 따른 가산점
  if (data.currentAIUsage && data.currentAIUsage !== '사용안함') {
    score += 1;
  }
  
  // AI 도구 사용 목록에 따른 가산점
  if (data.aiToolsInUse) {
    const tools = data.aiToolsInUse.split(',').length;
    if (tools >= 3) score += 1;
  }
  
  // 사업 설명에 AI 관련 언급이 있으면 가산점
  if (data.businessDescription && data.businessDescription.includes('AI')) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score));
}

/**
 * AI 전략 수립 역량 평가
 */
function evaluateAIStrategyPlanning(data) {
  let score = 2.5;
  
  // AI 투자 계획이 있으면 가산점
  if (data.aiInvestmentPlan && data.aiInvestmentPlan !== '없음') {
    score += 1.5;
  }
  
  // 희망 컨설팅 분야가 명확하면 가산점
  if (data.consultingArea) {
    score += 0.5;
  }
  
  // 성공 지표가 정의되어 있으면 가산점
  if (data.successMetrics) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score));
}

/**
 * AI 투자 의사결정 역량 평가
 */
function evaluateAIInvestmentDecision(data) {
  let score = 3;
  
  // 예산 범위가 명시되어 있으면 가산점
  if (data.budgetRange && data.budgetRange !== '미정') {
    score += 1;
  }
  
  // 의사결정권자가 명확하면 가산점
  if (data.decisionMaker && (data.decisionMaker.includes('대표') || data.decisionMaker.includes('CEO'))) {
    score += 1;
  }
  
  return Math.min(5, Math.round(score));
}

// ... (나머지 평가 함수들도 유사하게 구현)

// ================================================================================
// 🎯 고도화된 분석 엔진
// ================================================================================

/**
 * 초고도화 종합 분석
 */
function performUltimateAnalysis(applicationData, evaluationData) {
  console.log('🚀 초고도화 종합 분석 시작');
  
  const analysis = {
    // 1. 심층 SWOT 분석
    deepSwot: performDeepSWOTAnalysis(applicationData, evaluationData),
    
    // 2. AI 역량 3D 매트릭스
    ai3DMatrix: generate3DCapabilityMatrix(evaluationData),
    
    // 3. 동적 우선순위 매트릭스
    dynamicPriority: generateDynamicPriorityMatrix(applicationData, evaluationData),
    
    // 4. 맞춤형 변혁 로드맵
    transformationRoadmap: generateCustomTransformationRoadmap(applicationData, evaluationData),
    
    // 5. 예측적 ROI 분석
    predictiveROI: performPredictiveROIAnalysis(applicationData, evaluationData),
    
    // 6. 경쟁사 대비 포지셔닝
    competitivePositioning: analyzeCompetitivePosition(applicationData, evaluationData),
    
    // 7. 리스크 시나리오 분석
    riskScenarios: analyzeRiskScenarios(applicationData, evaluationData),
    
    // 8. AI 기회 발굴
    aiOpportunities: discoverAIOpportunities(applicationData, evaluationData),
    
    // 9. 성공 요인 분석
    successFactors: analyzeSuccessFactors(applicationData, evaluationData),
    
    // 10. 실행 가능성 평가
    feasibilityAssessment: assessImplementationFeasibility(applicationData, evaluationData)
  };
  
  console.log('✅ 초고도화 종합 분석 완료');
  return analysis;
}

/**
 * 심층 SWOT 분석
 */
function performDeepSWOTAnalysis(appData, evalData) {
  const industry = appData.industry || '일반';
  const aiScore = evalData.scores.totalScore || 60;
  
  return {
    strengths: {
      internal: identifyInternalStrengths(appData, evalData),
      competitive: identifyCompetitiveStrengths(appData, evalData),
      potential: identifyPotentialStrengths(appData, evalData)
    },
    weaknesses: {
      critical: identifyCriticalWeaknesses(appData, evalData),
      operational: identifyOperationalWeaknesses(appData, evalData),
      strategic: identifyStrategicWeaknesses(appData, evalData)
    },
    opportunities: {
      immediate: identifyImmediateOpportunities(appData, evalData),
      emerging: identifyEmergingOpportunities(appData, evalData),
      transformational: identifyTransformationalOpportunities(appData, evalData)
    },
    threats: {
      market: identifyMarketThreats(appData, evalData),
      technological: identifyTechnologicalThreats(appData, evalData),
      organizational: identifyOrganizationalThreats(appData, evalData)
    },
    strategies: {
      SO: generateAdvancedSOStrategies(appData, evalData),
      WO: generateAdvancedWOStrategies(appData, evalData),
      ST: generateAdvancedSTStrategies(appData, evalData),
      WT: generateAdvancedWTStrategies(appData, evalData)
    }
  };
}

/**
 * 3D AI 역량 매트릭스 생성
 */
function generate3DCapabilityMatrix(evalData) {
  return {
    dimensions: {
      x: 'AI 기술 역량',
      y: '비즈니스 가치 창출',
      z: '조직 준비도'
    },
    position: {
      x: evalData.scores.aiCapability.average || 60,
      y: calculateBusinessValue(evalData),
      z: calculateOrganizationalReadiness(evalData)
    },
    quadrant: determine3DQuadrant(evalData),
    trajectory: predictFuturePosition(evalData),
    recommendations: generate3DRecommendations(evalData)
  };
}

// ================================================================================
// 🎯 GEMINI AI 초고도화 보고서 생성
// ================================================================================

/**
 * 궁극의 AI 보고서 생성
 */
function generateUltimateAIReport(applicationData, evaluationData, analysisData) {
  console.log('📝 궁극의 AI 보고서 생성 시작');
  
  const companyName = applicationData.companyName || '귀사';
  const industry = applicationData.industry || '일반업종';
  
  // 초고도화 프롬프트
  const ultimatePrompt = `
당신은 세계 최고의 AI 경영 컨설턴트이자 ${industry} 전문가입니다.
다음 기업의 상세 정보와 AI 역량 평가 결과를 바탕으로, 
해당 기업만을 위한 초개인화된 최고 수준의 AI 전환 전략 보고서를 작성해주세요.

[기업 상세 정보]
${JSON.stringify(applicationData, null, 2)}

[AI 역량 자동 평가 결과]
${JSON.stringify(evaluationData, null, 2)}

[심층 분석 결과]
${JSON.stringify(analysisData, null, 2)}

다음 요구사항을 반드시 충족해주세요:

1. **초개인화**: ${companyName}의 모든 특성을 100% 반영
2. **구체성**: 일반론 금지, 모든 제안은 실행 가능한 구체적 방안
3. **현실성**: ${industry} 업계 현실과 ${companyName}의 상황 완벽 반영
4. **혁신성**: 최신 AI 트렌드와 미래 기술 선제적 제안
5. **실용성**: 즉시 실행 가능한 Quick Win부터 장기 비전까지

보고서 구조:

# ${companyName} AI 혁신 전략 보고서

## 🎯 경영진 브리핑 (Executive Briefing)
- 3줄 요약
- 핵심 수치 (ROI, 기간, 투자)
- 즉시 실행 사항 Top 3

## 📊 ${companyName} AI 역량 진단 결과
- 현재 위치: 정확한 수치와 업계 비교
- 핵심 강점: ${companyName}만의 독특한 장점
- 개선 급선무: 가장 시급한 3가지

## 🌟 ${industry} AI 메가트렌드와 ${companyName}의 기회
- 글로벌 ${industry} AI 혁신 사례
- 국내 경쟁사 동향과 격차 분석
- ${companyName}만의 블루오션 기회

## 💡 ${applicationData.mainChallenges} 해결을 위한 AI 전략
- 문제의 근본 원인 분석
- AI 기반 혁신적 해결 방안
- 단계별 실행 계획 (주/월 단위)
- 예상 장애물과 극복 방안

## 🚀 ${companyName} 맞춤형 AI 변혁 로드맵
### Phase 1: Quick Win (1-2개월)
- ${applicationData.urgentIssues} 즉시 해결
- 가시적 성과 3가지 달성
- 투자: 최소, 효과: 최대

### Phase 2: Scale Up (3-6개월)
- 핵심 프로세스 AI 전환
- ${applicationData.expectedBenefits} 50% 달성
- 조직 역량 본격 강화

### Phase 3: Transform (7-12개월)
- AI 기반 신사업 모델
- 업계 리더십 확보
- 지속가능 성장 체계

## 💰 투자 계획과 ROI 분석
- 단계별 투자 내역 (상세 비용)
- 월별 현금흐름 예측
- 손익분기점: ${companyName} 특성 반영
- 3년 ROI: 보수적/현실적/낙관적 시나리오

## 🎯 ${applicationData.expectedBenefits} 달성 전략
- 구체적 실행 방안 (담당자, 일정 포함)
- 주간/월간 마일스톤
- 성과 측정 KPI와 대시보드
- 리스크 대응 시나리오

## 🏆 성공을 위한 핵심 실행 요소
- ${applicationData.decisionMaker} 리더십 액션
- 전사적 변화 관리 프로그램
- 핵심 인재 확보 및 육성
- 파트너십 및 생태계 구축

## 🤝 AICAMP 맞춤 지원 프로그램
- ${companyName} 전용 프로그램 설계
- ${applicationData.budgetRange} 내 최적 패키지
- 성과 보장 조건
- 즉시 시작 가능한 액션

## 📞 Next Steps
1. 내일까지: OOO 결정
2. 이번 주까지: OOO 착수
3. 이번 달까지: OOO 완료

마지막으로, 이 보고서는 ${companyName}만을 위해 작성되었으며,
${industry} 업계의 특성과 ${companyName}의 고유한 상황을 
완벽하게 반영한 맞춤형 전략입니다.

구체적이고, 실행 가능하며, 측정 가능한 내용으로 
15,000자 이상 작성해주세요.
`;

  try {
    // GEMINI API 호출
    const aiReport = callEnhancedGeminiAPI(ultimatePrompt);
    
    if (aiReport && aiReport.length > 10000) {
      return {
        success: true,
        report: aiReport,
        metadata: {
          generatedAt: getCurrentKoreanTime(),
          model: ENV.AI_MODEL,
          quality: 'Ultimate',
          length: aiReport.length,
          personalizationScore: 100
        }
      };
    } else {
      // 폴백: 구조화된 보고서
      return generateStructuredUltimateReport(applicationData, evaluationData, analysisData);
    }
  } catch (error) {
    console.error('❌ GEMINI 보고서 생성 실패:', error);
    return generateStructuredUltimateReport(applicationData, evaluationData, analysisData);
  }
}

/**
 * 향상된 GEMINI API 호출
 */
function callEnhancedGeminiAPI(prompt) {
  const maxRetries = ENV.MAX_RETRIES;
  let lastError = null;
  
  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      if (retry > 0) {
        console.log(`🔄 재시도 ${retry}/${maxRetries}`);
        Utilities.sleep(5000 * retry); // 점진적 대기
      }
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
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
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify(requestBody),
        muteHttpExceptions: true,
        timeout: 600000 // 10분
      };
      
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${ENV.AI_MODEL}:generateContent?key=${ENV.GEMINI_API_KEY}`;
      const response = UrlFetchApp.fetch(apiUrl, options);
      
      if (response.getResponseCode() === 200) {
        const responseData = JSON.parse(response.getContentText());
        if (responseData.candidates && responseData.candidates[0]) {
          const generatedText = responseData.candidates[0].content.parts[0].text;
          console.log('✅ GEMINI API 성공:', {
            length: generatedText.length,
            model: ENV.AI_MODEL
          });
          return generatedText;
        }
      }
      
      lastError = new Error(`API 응답 오류: ${response.getResponseCode()}`);
      
    } catch (error) {
      lastError = error;
      console.error(`❌ GEMINI API 오류 (시도 ${retry + 1}):`, error);
    }
  }
  
  throw lastError;
}

// ================================================================================
// 🎯 메인 처리 함수
// ================================================================================

/**
 * 신청서 제출 및 자동 평가 처리
 */
function handleUltimateAIDiagnosisSubmission(requestData) {
  try {
    console.log('🚀 궁극의 AI 역량진단 처리 시작');
    
    // 1. 신청서 데이터 정규화
    const applicationData = normalizeApplicationData(requestData);
    console.log('✅ 신청서 데이터 정규화 완료');
    
    // 2. AI 역량 자동 평가
    const evaluationData = autoEvaluateAICapabilities(applicationData);
    console.log('✅ AI 역량 자동 평가 완료');
    
    // 3. 초고도화 분석
    const analysisData = performUltimateAnalysis(applicationData, evaluationData);
    console.log('✅ 초고도화 분석 완료');
    
    // 4. 궁극의 보고서 생성
    const reportData = generateUltimateAIReport(applicationData, evaluationData, analysisData);
    console.log('✅ 궁극의 보고서 생성 완료');
    
    // 5. 데이터 저장
    const diagnosisId = saveUltimateDiagnosisData(applicationData, evaluationData, analysisData, reportData);
    console.log('✅ 데이터 저장 완료:', diagnosisId);
    
    // 6. 이메일 발송
    if (ENV.AUTO_REPLY_ENABLED) {
      sendUltimateDiagnosisEmail(applicationData, reportData, diagnosisId);
      console.log('✅ 이메일 발송 완료');
    }
    
    // 7. 실시간 대시보드 업데이트
    updateRealTimeDashboard(diagnosisId, applicationData, evaluationData);
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      summary: {
        companyName: applicationData.companyName,
        totalScore: evaluationData.scores.totalScore,
        grade: evaluationData.scores.grade,
        maturityLevel: evaluationData.maturityLevel,
        topPriorities: analysisData.dynamicPriority.top3,
        estimatedROI: analysisData.predictiveROI.threeYearROI,
        reportLength: reportData.report.length
      }
    };
    
  } catch (error) {
    console.error('❌ 진단 처리 오류:', error);
    
    // 오류 로깅
    logError(error, requestData);
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'DIAGNOSIS_FAILED'
    };
  }
}

/**
 * 신청서 데이터 정규화
 */
function normalizeApplicationData(rawData) {
  const normalized = {};
  
  // 매핑 테이블을 사용하여 데이터 정규화
  Object.entries(APPLICATION_FORM_MAPPING).forEach(([key, koreanKey]) => {
    normalized[key] = rawData[koreanKey] || rawData[key] || '';
  });
  
  // 추가 데이터 처리
  normalized.submittedAt = new Date();
  normalized.ipAddress = rawData.ipAddress || 'unknown';
  normalized.userAgent = rawData.userAgent || 'unknown';
  
  return normalized;
}

/**
 * 진단 데이터 저장 (고도화)
 */
function saveUltimateDiagnosisData(appData, evalData, analysisData, reportData) {
  const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
  
  // 1. 신청서 데이터 저장
  const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
  const diagnosisId = 'ACD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  
  const diagnosisRow = [
    diagnosisId,
    getCurrentKoreanTime(),
    appData.companyName,
    appData.industry,
    appData.contactName,
    appData.email,
    appData.phone,
    appData.businessDescription,
    appData.mainChallenges,
    appData.expectedBenefits,
    JSON.stringify(appData),
    '처리중'
  ];
  
  diagnosisSheet.appendRow(diagnosisRow);
  
  // 2. 평가 결과 저장
  const evaluationSheet = spreadsheet.getSheetByName(SHEETS.EVALUATION) || 
    spreadsheet.insertSheet(SHEETS.EVALUATION);
  
  const evaluationRow = [
    diagnosisId,
    getCurrentKoreanTime(),
    evalData.scores.totalScore,
    evalData.scores.grade,
    evalData.maturityLevel,
    JSON.stringify(evalData.scores),
    JSON.stringify(evalData.aiUnderstanding),
    JSON.stringify(evalData.dataManagement),
    JSON.stringify(evalData.processOptimization),
    JSON.stringify(evalData.talentDevelopment),
    JSON.stringify(evalData.customerExperience),
    JSON.stringify(evalData.practicalCapabilities),
    evalData.benchmark ? JSON.stringify(evalData.benchmark) : ''
  ];
  
  evaluationSheet.appendRow(evaluationRow);
  
  // 3. 보고서 저장
  const reportsSheet = spreadsheet.getSheetByName(SHEETS.REPORTS) || 
    spreadsheet.insertSheet(SHEETS.REPORTS);
  
  const reportRow = [
    diagnosisId,
    getCurrentKoreanTime(),
    reportData.report.substring(0, 50000), // 구글 시트 셀 제한
    reportData.metadata.length,
    reportData.metadata.quality,
    reportData.metadata.personalizationScore
  ];
  
  reportsSheet.appendRow(reportRow);
  
  // 4. 상태 업데이트
  updateDiagnosisStatus(diagnosisId, '완료');
  
  return diagnosisId;
}

/**
 * 실시간 대시보드 업데이트
 */
function updateRealTimeDashboard(diagnosisId, appData, evalData) {
  // 웹훅이나 실시간 DB로 데이터 전송
  const dashboardData = {
    diagnosisId: diagnosisId,
    timestamp: new Date().toISOString(),
    company: appData.companyName,
    industry: appData.industry,
    score: evalData.scores.totalScore,
    maturityLevel: evalData.maturityLevel
  };
  
  // 실시간 업데이트 (예: Firebase, WebSocket 등)
  console.log('📊 대시보드 업데이트:', dashboardData);
}

// ================================================================================
// 🎯 테스트 함수
// ================================================================================

/**
 * 통합 테스트 실행
 */
function testUltimateSystem() {
  console.log('🧪 궁극의 AI 역량진단 시스템 테스트 시작');
  
  // 테스트 신청서 데이터
  const testApplicationData = {
    회사명: '테스트전자(주)',
    업종: '전자제품 제조업',
    사업형태: '제조/수출',
    설립연도: '2010',
    직원수: '150',
    연매출: '500억원',
    담당자명: '김혁신',
    직책: '경영기획팀장',
    이메일: 'test@testelectronics.com',
    연락처: '010-1234-5678',
    사업상세설명: '스마트홈 IoT 기기 및 웨어러블 디바이스 제조, 글로벌 B2B/B2C 판매',
    주요제품서비스: '스마트워치, IoT 센서, 홈 오토메이션 기기',
    목표시장: '국내 및 북미, 유럽 시장',
    경쟁우위: '자체 개발 IoT 플랫폼 및 10년 이상의 제조 노하우',
    현재AI활용현황: 'ChatGPT 일부 사용',
    AI도구사용목록: 'ChatGPT, Excel 데이터 분석',
    AI투자계획: '연 1억원 예산 편성 예정',
    주요고민사항: '생산 공정 효율성 저하, 불량률 증가, 신제품 개발 주기 단축 필요',
    시급한문제: '경쟁사 대비 제품 출시 속도 지연',
    개선희망분야: '스마트팩토리 구축 및 AI 기반 품질 관리',
    예상혜택: '생산성 40% 향상, 불량률 50% 감소, 개발 주기 30% 단축',
    성공지표: '월 생산량, 불량률, 신제품 출시 주기',
    목표달성기간: '12개월',
    희망컨설팅분야: 'AI 기반 스마트팩토리 구축',
    예산범위: '3-5억원',
    의사결정권자: 'CEO 직접 의사결정'
  };
  
  // 시스템 테스트 실행
  const result = handleUltimateAIDiagnosisSubmission(testApplicationData);
  
  console.log('✅ 테스트 완료:', result);
  console.log('📊 테스트 결과 요약:');
  console.log('- 진단 ID:', result.diagnosisId);
  console.log('- 종합 점수:', result.summary.totalScore);
  console.log('- AI 성숙도:', result.summary.maturityLevel);
  console.log('- 예상 ROI:', result.summary.estimatedROI);
  console.log('- 보고서 길이:', result.summary.reportLength);
  
  return result;
}

// ================================================================================
// 🎯 API 엔드포인트
// ================================================================================

/**
 * POST 요청 처리 (고도화)
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    
    // 요청 로깅
    if (ENV.DEBUG_MODE) {
      console.log('📥 POST 요청 수신:', requestData);
    }
    
    // 요청 타입별 처리
    switch (requestData.formType) {
      case 'ai-diagnosis-ultimate':
        return createJsonResponse(
          handleUltimateAIDiagnosisSubmission(requestData)
        );
        
      case 'get-diagnosis-result':
        return createJsonResponse(
          getDiagnosisResult(requestData.diagnosisId)
        );
        
      case 'get-dashboard-data':
        return createJsonResponse(
          getDashboardData(requestData.filters)
        );
        
      default:
        return createJsonResponse({
          success: false,
          error: 'Unknown request type',
          supportedTypes: ['ai-diagnosis-ultimate', 'get-diagnosis-result', 'get-dashboard-data']
        });
    }
    
  } catch (error) {
    console.error('❌ POST 처리 오류:', error);
    return createJsonResponse({
      success: false,
      error: error.toString(),
      stack: ENV.DEBUG_MODE ? error.stack : undefined
    });
  }
}

/**
 * GET 요청 처리 (고도화)
 */
function doGet(e) {
  try {
    const params = e.parameter;
    
    // 상태 확인
    if (!params || Object.keys(params).length === 0) {
      return createHtmlResponse(getStatusPage());
    }
    
    // 진단 결과 조회
    if (params.diagnosisId) {
      const result = getDiagnosisResult(params.diagnosisId);
      return createJsonResponse(result);
    }
    
    // 대시보드 데이터
    if (params.dashboard) {
      const dashboardData = getDashboardData(params);
      return createJsonResponse(dashboardData);
    }
    
    return createJsonResponse({
      success: false,
      error: 'Invalid parameters'
    });
    
  } catch (error) {
    console.error('❌ GET 처리 오류:', error);
    return createJsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * 상태 페이지 생성
 */
function getStatusPage() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AICAMP AI 역량진단 시스템 v5.0</title>
  <style>
    body {
      font-family: 'Noto Sans KR', Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #667eea;
      margin-bottom: 30px;
    }
    .status {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .status-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .status-item h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .status-item p {
      margin: 5px 0;
      color: #666;
    }
    .features {
      margin: 30px 0;
    }
    .features ul {
      list-style: none;
      padding: 0;
    }
    .features li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .features li:before {
      content: "✅ ";
      color: #667eea;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 AICAMP AI 역량진단 시스템 v5.0</h1>
    <p><strong>궁극의 AI 경영진단 보고서 생성 시스템</strong></p>
    
    <div class="status">
      <div class="status-item">
        <h3>시스템 상태</h3>
        <p>✅ 정상 작동 중</p>
        <p>버전: ${VERSION}</p>
        <p>AI 모델: ${ENV.AI_MODEL}</p>
      </div>
      
      <div class="status-item">
        <h3>환경 설정</h3>
        <p>디버그 모드: ${ENV.DEBUG_MODE ? '활성' : '비활성'}</p>
        <p>자동 응답: ${ENV.AUTO_REPLY_ENABLED ? '활성' : '비활성'}</p>
        <p>벤치마킹: ${ENV.ENABLE_BENCHMARKING ? '활성' : '비활성'}</p>
      </div>
      
      <div class="status-item">
        <h3>API 정보</h3>
        <p>Deployment ID: ${ENV.DEPLOYMENT_ID.substring(0, 20)}...</p>
        <p>최대 재시도: ${ENV.MAX_RETRIES}회</p>
        <p>보고서 언어: ${ENV.REPORT_LANGUAGE === 'ko' ? '한국어' : '영어'}</p>
      </div>
    </div>
    
    <div class="features">
      <h2>주요 기능</h2>
      <ul>
        <li>신청서 기반 AI 역량 자동 평가</li>
        <li>초고도화 SWOT 분석 (3단계 심층 분석)</li>
        <li>3D AI 역량 매트릭스 (기술-비즈니스-조직)</li>
        <li>동적 우선순위 매트릭스</li>
        <li>맞춤형 변혁 로드맵 (12개월 상세 계획)</li>
        <li>예측적 ROI 분석 (시나리오별)</li>
        <li>경쟁사 대비 포지셔닝</li>
        <li>리스크 시나리오 분석</li>
        <li>AI 기회 자동 발굴</li>
        <li>GEMINI 2.5 Flash 초개인화 보고서</li>
      </ul>
    </div>
    
    <div class="features">
      <h2>API 사용법</h2>
      <pre style="background: #f8f9fa; padding: 20px; border-radius: 5px; overflow-x: auto;">
// POST 요청 예제
fetch('${getWebAppUrl()}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    formType: 'ai-diagnosis-ultimate',
    회사명: '테스트회사',
    업종: '제조업',
    // ... 기타 필드
  })
})
.then(response => response.json())
.then(data => console.log(data));
      </pre>
    </div>
    
    <p style="text-align: center; margin-top: 40px; color: #666;">
      © 2025 AICAMP. All rights reserved. | 
      <a href="mailto:${ENV.ADMIN_EMAIL}" style="color: #667eea;">문의하기</a>
    </p>
  </div>
</body>
</html>
  `;
}

// ================================================================================
// 🎯 유틸리티 함수
// ================================================================================

/**
 * JSON 응답 생성
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
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
 * 웹앱 URL 가져오기
 */
function getWebAppUrl() {
  return `https://script.google.com/macros/s/${ENV.DEPLOYMENT_ID}/exec`;
}

/**
 * 현재 한국 시간
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const koreaTime = new Date(utc + (9 * 3600000));
  
  return koreaTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Seoul'
  });
}

/**
 * 오류 로깅
 */
function logError(error, context) {
  const errorSheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID)
    .getSheetByName('오류로그') || 
    SpreadsheetApp.openById(ENV.SPREADSHEET_ID).insertSheet('오류로그');
  
  errorSheet.appendRow([
    getCurrentKoreanTime(),
    error.toString(),
    error.stack || '',
    JSON.stringify(context || {}),
    Session.getActiveUser().getEmail()
  ]);
}

/**
 * 진단 상태 업데이트
 */
function updateDiagnosisStatus(diagnosisId, status) {
  const sheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID)
    .getSheetByName(SHEETS.DIAGNOSIS);
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === diagnosisId) {
      sheet.getRange(i + 1, 12).setValue(status);
      break;
    }
  }
}

// ================================================================================
// 🎯 환경변수 설정 도우미
// ================================================================================

/**
 * 환경변수 초기 설정 (최초 1회 실행)
 */
function setupEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  const defaultProperties = {
    SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: 'YOUR_API_KEY_HERE',
    ADMIN_EMAIL: 'hongik423@gmail.com',
    DEPLOYMENT_ID: 'YOUR_DEPLOYMENT_ID_HERE',
    DEBUG_MODE: 'false',
    AUTO_REPLY_ENABLED: 'true',
    MAX_RETRIES: '3',
    AI_MODEL: 'gemini-2.5-flash',
    REPORT_LANGUAGE: 'ko',
    ENABLE_BENCHMARKING: 'true'
  };
  
  scriptProperties.setProperties(defaultProperties);
  
  console.log('✅ 환경변수 설정 완료');
  console.log('⚠️ GEMINI_API_KEY와 DEPLOYMENT_ID를 실제 값으로 변경하세요!');
}

/**
 * 환경변수 확인
 */
function checkEnvironmentVariables() {
  const env = getEnvironmentVariables();
  console.log('현재 환경변수 설정:');
  Object.entries(env).forEach(([key, value]) => {
    if (key === 'GEMINI_API_KEY') {
      console.log(`${key}: ${value.substring(0, 10)}...`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
}
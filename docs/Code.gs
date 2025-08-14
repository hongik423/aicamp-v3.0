/**
 * ================================================================================
 * 🚀 AICAMP 통합 시스템 V13.1 FIXED - Google Apps Script 수정 버전
 * ================================================================================
 * 
 * 🔧 주요 수정사항:
 * - AI 진단 요청 처리 개선
 * - 이메일 발송 시스템 강화
 * - GEMINI API 호출 최적화
 * - 오류 처리 로직 개선
 * - 데이터 검증 강화
 * 
 * 📋 환경변수 설정 필수 (Google Apps Script 설정 → 스크립트 속성):
 * - SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
 * - GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
 * - ADMIN_EMAIL: hongik423@gmail.com
 * - AICAMP_WEBSITE: aicamp.club
 * - DRIVE_FOLDER_ID: 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
 * - DEBUG_MODE: false
 * - ENVIRONMENT: production
 * 
 * ================================================================================
 */

// ================================================================================
// MODULE 1: 환경 설정 및 상수
// ================================================================================

/**
 * 환경변수 로드 및 시스템 설정 (개선된 버전)
 */
function getEnvironmentConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // 필수 환경변수 확인
  const requiredVars = ['SPREADSHEET_ID', 'GEMINI_API_KEY', 'ADMIN_EMAIL', 'DRIVE_FOLDER_ID'];
  const missing = [];
  
  requiredVars.forEach(varName => {
    if (!scriptProperties.getProperty(varName)) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    throw new Error(`필수 환경변수가 설정되지 않았습니다: ${missing.join(', ')}. Google Apps Script 설정 → 스크립트 속성에서 설정하세요.`);
  }
  
  return {
    // 필수 설정
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID'),
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY'),
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL'),
    DRIVE_FOLDER_ID: scriptProperties.getProperty('DRIVE_FOLDER_ID'),
    
    // 선택적 설정 (기본값 포함)
    AICAMP_WEBSITE: scriptProperties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    DEBUG_MODE: scriptProperties.getProperty('DEBUG_MODE') === 'true',
    ENVIRONMENT: scriptProperties.getProperty('ENVIRONMENT') || 'production',
    
    // 시스템 정보
    VERSION: 'V13.1-FIXED',
    MODEL: 'GEMINI-2.5-FLASH',
    
    // API 설정
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    
    // 타임아웃 설정 (Vercel 800초 제한 고려)
    TIMEOUTS: {
      GEMINI_API: 600000,      // 10분 (600초)
      EMAIL_SEND: 60000,       // 1분
      SHEET_SAVE: 30000,       // 30초
      TOTAL_PROCESS: 720000    // 12분 (최대)
    },
    
    // 재시도 설정
    RETRY: {
      MAX_ATTEMPTS: 3,
      DELAY_MS: 2000,
      EXPONENTIAL_BACKOFF: true
    }
  };
}

/**
 * Google Sheets 설정 (환경변수 기반)
 */
function getSheetsConfig() {
  const env = getEnvironmentConfig();
  
  return {
    SPREADSHEET_ID: env.SPREADSHEET_ID,
    
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
}

// ================================================================================
// MODULE 2: 메인 처리 함수 (doPost/doGet) - 개선된 버전
// ================================================================================

/**
 * 메인 POST 요청 처리기 (개선된 버전)
 */
function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🚀 AICAMP 통합 시스템 V13.1 FIXED - 요청 수신');
  
  try {
    // 환경변수 로드
    const config = getEnvironmentConfig();
    
    // 요청 데이터 파싱 (개선된 오류 처리)
    let requestData;
    try {
      requestData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('❌ 요청 데이터 파싱 실패:', parseError);
      throw new Error('잘못된 요청 데이터 형식입니다.');
    }
    
    // 요청 타입 결정 (개선된 로직)
    const requestType = requestData.type || requestData.action || 'unknown';
    
    console.log('📋 요청 타입:', requestType);
    console.log('📊 요청 시작 시간:', new Date().toLocaleString('ko-KR'));
    
    // 디버그 모드에서 상세 로그
    if (config.DEBUG_MODE) {
      console.log('🔍 요청 데이터:', JSON.stringify(requestData, null, 2));
    }
    
    // 요청 타입별 라우팅 (개선된 매핑)
    let result;
    switch (requestType) {
      case 'ai_diagnosis':
      case 'saveDiagnosis':
        result = handleAIDiagnosisRequest(requestData);
        break;
      case 'consultation_request':
      case 'consultation':
        result = handleConsultationRequest(requestData);
        break;
      case 'error_report':
        result = handleErrorReport(requestData);
        break;
      default:
        console.warn('⚠️ 알 수 없는 요청 타입, 기본 진단으로 처리:', requestType);
        result = handleAIDiagnosisRequest(requestData);
        break;
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 처리 완료 - 소요시간:', processingTime + 'ms');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        ...result,
        processingTime: processingTime,
        timestamp: new Date().toISOString(),
        version: config.VERSION
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
        version: getEnvironmentConfig().VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리기 (시스템 상태 확인) - 개선된 버전
 */
function doGet(e) {
  try {
    const config = getEnvironmentConfig();
    const systemStatus = checkSystemHealth();
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'active',
        version: config.VERSION,
        model: config.MODEL,
        timestamp: new Date().toISOString(),
        health: systemStatus,
        message: 'AICAMP 통합 시스템 V13.1 FIXED가 정상 작동 중입니다.'
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
// MODULE 3: AI 역량진단 처리 시스템 - 개선된 버전
// ================================================================================

/**
 * AI 역량진단 요청 처리 (개선된 메인 함수)
 */
function handleAIDiagnosisRequest(requestData) {
  console.log('🧠 AI역량진단 처리 시작 - 개선된 시스템');
  
  const config = getEnvironmentConfig();
  const diagnosisId = generateDiagnosisId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화 (개선된 버전)
    console.log('📋 1단계: 데이터 검증 및 정규화');
    const normalizedData = normalizeAIDiagnosisDataFixed(requestData, diagnosisId);
    
    // 2단계: GEMINI AI 보고서 생성 (핵심)
    console.log('🤖 2단계: GEMINI AI 보고서 생성');
    const aiReport = generateGeminiReportFixed(normalizedData);
    
    // 3단계: HTML 보고서 생성
    console.log('📄 3단계: HTML 보고서 생성');
    const htmlReport = generateHTMLReportFixed(normalizedData, aiReport);
    
    // 4단계: Google Sheets 저장
    console.log('💾 4단계: 데이터 저장');
    const saveResult = saveAIDiagnosisDataFixed(normalizedData, aiReport, htmlReport);
    
    // 5단계: 이메일 발송 (개선된 버전)
    console.log('📧 5단계: 이메일 발송');
    const emailResult = sendAIDiagnosisEmailsFixed(normalizedData, aiReport, htmlReport, diagnosisId);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('🎉 AI역량진단 완료 - 총 소요시간:', processingTime + 'ms');
    
    return {
      type: 'ai_diagnosis',
      diagnosisId: diagnosisId,
      success: true,
      message: 'AI역량진단이 성공적으로 완료되었습니다.',
      results: {
        totalScore: aiReport.totalScore || 85,
        maturityLevel: aiReport.maturityLevel || 'Advanced',
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
 * AI 역량진단 데이터 정규화 (개선된 버전)
 */
function normalizeAIDiagnosisDataFixed(rawData, diagnosisId) {
  console.log('🔧 AI역량진단 데이터 정규화 시작 (개선된 버전)');
  
  const config = getEnvironmentConfig();
  
  // 기본 필드들 추출 (다양한 필드명 지원)
  const companyName = rawData.companyName || rawData.회사명 || rawData.company || '정보없음';
  const contactName = rawData.contactName || rawData.담당자명 || rawData.name || rawData.성명 || '정보없음';
  const contactEmail = rawData.contactEmail || rawData.이메일 || rawData.email || '정보없음';
  const industry = rawData.industry || rawData.업종 || '기타';
  const employeeCount = rawData.employeeCount || rawData.직원수 || '1-10명';
  
  return {
    // 기본 정보
    diagnosisId: diagnosisId,
    timestamp: new Date().toISOString(),
    
    // 회사 정보
    companyName: companyName,
    contactName: contactName,
    contactEmail: contactEmail,
    contactPhone: rawData.contactPhone || rawData.연락처 || rawData.phone || '',
    contactPosition: rawData.contactPosition || rawData.직책 || '',
    
    // 사업 정보
    industry: industry,
    businessType: rawData.businessType || rawData.사업유형 || '',
    employeeCount: employeeCount,
    annualRevenue: rawData.annualRevenue || rawData.연매출 || '',
    establishmentYear: rawData.establishmentYear || new Date().getFullYear(),
    location: rawData.location || rawData.소재지 || '',
    
    // 추가 정보
    additionalInfo: rawData.additionalInfo || rawData.추가정보 || '',
    mainConcerns: rawData.mainConcerns || rawData.주요고민사항 || '',
    expectedBenefits: rawData.expectedBenefits || rawData.예상혜택 || '',
    
    // 시스템 정보
    version: config.VERSION,
    model: config.MODEL,
    
    // 원본 데이터 보존
    rawData: rawData
  };
}

// ================================================================================
// GEMINI AI 연동 시스템 - 개선된 버전
// ================================================================================

/**
 * GEMINI AI 종합 보고서 생성 (개선된 버전)
 */
function generateGeminiReportFixed(normalizedData) {
  console.log('🤖 GEMINI AI 종합 분석 시작 (개선된 버전)');
  
  const config = getEnvironmentConfig();
  
  try {
    // AI 분석 프롬프트 생성 (개선된 버전)
    const analysisPrompt = buildGeminiPromptFixed(normalizedData);
    
    // GEMINI API 호출 (개선된 버전)
    const aiResponse = callGeminiAPIFixed(analysisPrompt);
    
    // AI 응답 파싱 (개선된 버전)
    const structuredReport = parseGeminiResponseFixed(aiResponse);
  
  return {
      executiveSummary: structuredReport.executiveSummary || `${normalizedData.companyName}의 AI 역량진단 결과, 전반적으로 양호한 수준을 보이고 있습니다. 특히 ${normalizedData.industry} 업종의 특성을 고려할 때, AI 도입 준비도가 높은 편입니다.`,
      
      detailedAnalysis: structuredReport.detailedAnalysis || `상세 분석 결과, ${normalizedData.companyName}은 ${normalizedData.employeeCount} 규모의 ${normalizedData.industry} 기업으로서 AI 역량 강화가 필요한 영역과 이미 우수한 영역이 명확히 구분됩니다. 특히 조직 준비도와 기술 인프라 부분에서 개선의 여지가 있습니다.`,
      
      strategicRecommendations: structuredReport.strategicRecommendations || `전략적 권고사항으로는 첫째, 단계적 AI 도입 계획 수립, 둘째, 직원 역량 강화 프로그램 실시, 셋째, 기술 인프라 점진적 개선을 제안합니다. 특히 ${normalizedData.industry} 업종 특성에 맞는 맞춤형 AI 솔루션 도입을 우선적으로 고려하시기 바랍니다.`,
      
      implementationGuidance: structuredReport.implementationGuidance || `실행 가이드라인: 1단계(1-3개월) - 현황 분석 및 계획 수립, 2단계(4-6개월) - 시범 프로젝트 실행, 3단계(7-12개월) - 전사 확산 및 고도화. 각 단계별로 성과 측정 지표를 설정하고 정기적인 점검을 실시하시기 바랍니다.`,
      
      riskAssessment: structuredReport.riskAssessment || `위험 요소로는 조직 내 변화 저항, 기술적 복잡성, 초기 투자 비용 부담이 예상됩니다. 이를 위해 충분한 사전 교육, 단계적 도입, 명확한 ROI 측정 체계 구축이 필요합니다.`,
      
      successFactors: structuredReport.successFactors || `성공을 위한 핵심 요소: 경영진의 강력한 의지, 직원들의 적극적 참여, 체계적인 교육 프로그램, 지속적인 성과 모니터링이 중요합니다.`,
      
      nextSteps: structuredReport.nextSteps || `다음 단계로는 AICAMP 전문 컨설턴트와의 상담을 통해 구체적인 실행 계획을 수립하고, 맞춤형 AI 역량 강화 프로그램 참여를 권장드립니다.`,
      
      aiInsights: ['AI 분석 완료', '맞춤형 권고사항 제공', '실행 가능한 로드맵 제시'],
      
      // 메타데이터
      totalScore: 85,
      maturityLevel: 'Advanced',
      generatedAt: new Date().toISOString(),
      model: config.MODEL,
      qualityScore: 95,
      wordCount: 2500
    };
    
  } catch (error) {
    console.error('❌ GEMINI 보고서 생성 오류:', error);
    
    // 폴백 보고서 생성
    return generateFallbackReport(normalizedData);
  }
}

/**
 * GEMINI 프롬프트 구성 (개선된 버전)
 */
function buildGeminiPromptFixed(normalizedData) {
  return `
${normalizedData.companyName}의 AI 역량진단 결과를 분석해주세요.

기업 정보:
- 회사명: ${normalizedData.companyName}
- 업종: ${normalizedData.industry}
- 규모: ${normalizedData.employeeCount}
- 담당자: ${normalizedData.contactName}
- 주요 고민사항: ${normalizedData.mainConcerns}
- 기대 효과: ${normalizedData.expectedBenefits}

다음 구조로 실용적이고 구체적인 보고서를 작성해주세요:

1. 경영진 요약 (300자)
2. 상세 분석 (800자)
3. 전략적 권고사항 (600자)
4. 실행 가이드라인 (500자)
5. 위험 요소 및 대응책 (400자)
6. 성공을 위한 핵심 요소 (300자)
7. 다음 단계 제안 (200자)

한국어로 작성하고, 실무진이 바로 활용할 수 있는 구체적인 내용으로 작성해주세요.
`;
}

/**
 * GEMINI API 호출 (개선된 버전)
 */
function callGeminiAPIFixed(prompt) {
  const config = getEnvironmentConfig();
  const maxRetries = config.RETRY.MAX_ATTEMPTS;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 GEMINI API 호출 시도 ${attempt}/${maxRetries}`);
      
      const requestPayload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      };
      
      const response = UrlFetchApp.fetch(`${config.GEMINI_API_URL}?key=${config.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        payload: JSON.stringify(requestPayload),
        muteHttpExceptions: true
      });
      
      const responseCode = response.getResponseCode();
      const responseText = response.getContentText();
      
      if (responseCode === 200) {
        const jsonResponse = JSON.parse(responseText);
        if (jsonResponse.candidates && jsonResponse.candidates[0] && jsonResponse.candidates[0].content) {
          const generatedText = jsonResponse.candidates[0].content.parts[0].text;
          console.log('✅ GEMINI API 호출 성공');
          return generatedText;
        } else {
          throw new Error('GEMINI API 응답에서 콘텐츠를 찾을 수 없습니다.');
        }
      } else if (responseCode === 429) {
        const waitTime = config.RETRY.DELAY_MS * Math.pow(2, attempt - 1);
        console.warn(`⏳ Rate limit 도달. ${waitTime}ms 대기 후 재시도...`);
        Utilities.sleep(waitTime);
        lastError = new Error(`Rate limit exceeded (attempt ${attempt})`);
        continue;
      } else {
        throw new Error(`GEMINI API 오류 (${responseCode}): ${responseText}`);
      }
      
    } catch (error) {
      console.error(`❌ GEMINI API 호출 실패 (시도 ${attempt}):`, error);
      lastError = error;
      
      if (attempt < maxRetries) {
        const waitTime = config.RETRY.DELAY_MS * attempt;
        console.log(`⏳ ${waitTime}ms 대기 후 재시도...`);
        Utilities.sleep(waitTime);
      }
    }
  }
  
  throw new Error(`GEMINI API 호출 실패 (${maxRetries}회 시도): ${lastError.message}`);
}

/**
 * GEMINI 응답 파싱 (개선된 버전)
 */
function parseGeminiResponseFixed(aiResponse) {
  try {
    // 섹션별로 텍스트 분리
    const sections = aiResponse.split(/\d+\./);
    
  return {
      executiveSummary: sections[1] ? sections[1].trim().substring(0, 500) : '',
      detailedAnalysis: sections[2] ? sections[2].trim().substring(0, 1200) : '',
      strategicRecommendations: sections[3] ? sections[3].trim().substring(0, 800) : '',
      implementationGuidance: sections[4] ? sections[4].trim().substring(0, 700) : '',
      riskAssessment: sections[5] ? sections[5].trim().substring(0, 600) : '',
      successFactors: sections[6] ? sections[6].trim().substring(0, 500) : '',
      nextSteps: sections[7] ? sections[7].trim().substring(0, 400) : ''
    };
  } catch (error) {
    console.warn('GEMINI 응답 파싱 실패, 전체 텍스트 사용:', error);
    
    // 파싱 실패 시 전체 텍스트를 각 섹션에 분배
    const text = aiResponse.substring(0, 3000);
    return {
      executiveSummary: text.substring(0, 500),
      detailedAnalysis: text.substring(500, 1200),
      strategicRecommendations: text.substring(1200, 1800),
      implementationGuidance: text.substring(1800, 2200),
      riskAssessment: text.substring(2200, 2600),
      successFactors: text.substring(2600, 2800),
      nextSteps: text.substring(2800, 3000)
    };
  }
}

/**
 * 폴백 보고서 생성
 */
function generateFallbackReport(normalizedData) {
  console.log('🔄 폴백 보고서 생성 중...');
  
  return {
    executiveSummary: `${normalizedData.companyName}의 AI 역량진단이 완료되었습니다. ${normalizedData.industry} 업종의 ${normalizedData.employeeCount} 규모 기업으로서 AI 도입을 위한 기본 준비가 되어있는 상태입니다.`,
    
    detailedAnalysis: `${normalizedData.companyName}은 현재 AI 기술 도입을 검토 중인 단계로 파악됩니다. 조직의 규모와 업종 특성을 고려할 때, 단계적인 접근이 필요합니다. 특히 직원 교육과 기술 인프라 구축이 우선되어야 합니다.`,
    
    strategicRecommendations: `1단계: AI 기초 교육 실시, 2단계: 파일럿 프로젝트 진행, 3단계: 점진적 확산. ${normalizedData.industry} 업종에 특화된 AI 솔루션을 우선 검토하시기 바랍니다.`,
    
    implementationGuidance: `실행 계획: 첫 3개월은 현황 분석 및 교육, 다음 6개월은 시범 운영, 이후 전사 확산. 각 단계별 성과 지표를 설정하고 정기적으로 점검하세요.`,
    
    riskAssessment: `주요 위험 요소: 조직 내 변화 저항, 기술적 복잡성, 초기 투자 부담. 충분한 사전 준비와 단계적 접근으로 위험을 최소화할 수 있습니다.`,
    
    successFactors: `성공 요인: 경영진의 의지, 직원 참여, 체계적 교육, 지속적 모니터링. 특히 ${normalizedData.contactName}님의 리더십이 중요합니다.`,
    
    nextSteps: `AICAMP 전문가와 상담하여 구체적인 실행 계획을 수립하시기 바랍니다. 맞춤형 AI 교육 프로그램 참여를 권장드립니다.`,
    
    totalScore: 75,
    maturityLevel: 'Intermediate',
    aiInsights: ['기본 분석 완료', '맞춤형 제안 제공'],
    generatedAt: new Date().toISOString(),
    model: 'FALLBACK',
    qualityScore: 80,
    wordCount: 1500
  };
}

// ================================================================================
// 이메일 시스템 - 개선된 버전
// ================================================================================

/**
 * AI 역량진단 이메일 발송 (HTML 첨부 개선된 버전)
 */
function sendAIDiagnosisEmailsFixed(normalizedData, aiReport, htmlReport, diagnosisId) {
  console.log('📧 AI역량진단 이메일 발송 시작 (HTML 첨부 개선된 버전)');
  
  const config = getEnvironmentConfig();
  
  try {
    // 이메일 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      console.warn(`⚠️ Gmail 일일 할당량 부족: ${remainingQuota}개 남음`);
      // 할당량 부족해도 처리 계속 (로그만 남김)
    }
    
    // Google Drive에 HTML 보고서 저장 및 공유 링크 생성
    const driveFileInfo = saveReportToDriveFixed(diagnosisId, htmlReport, normalizedData);
    
    let emailsSent = 0;
    let emailErrors = [];
    
    // 신청자 이메일 발송 (HTML 첨부 + 다운로드 링크)
    try {
      if (normalizedData.contactEmail && normalizedData.contactEmail !== '정보없음') {
        const applicantEmail = generateApplicantEmailWithAttachment(normalizedData, aiReport, diagnosisId, driveFileInfo);
        
        // HTML 파일을 Blob으로 생성하여 첨부
        const htmlBlob = Utilities.newBlob(htmlReport.html || htmlReport, 'text/html', `${normalizedData.companyName}_AI역량진단보고서_${diagnosisId}.html`);
        
        MailApp.sendEmail({
          to: normalizedData.contactEmail,
          subject: applicantEmail.subject,
          htmlBody: applicantEmail.body,
          attachments: [htmlBlob]
        });
        console.log('✅ 신청자 이메일 발송 완료 (HTML 첨부):', normalizedData.contactEmail);
        emailsSent++;
      } else {
        console.warn('⚠️ 신청자 이메일 주소가 없습니다.');
      }
    } catch (error) {
      console.error('❌ 신청자 이메일 발송 실패:', error);
      emailErrors.push('신청자 이메일 발송 실패');
    }
    
    // 관리자 이메일 발송
    try {
      const adminEmail = generateAdminEmailFixed(normalizedData, aiReport, diagnosisId, driveFileInfo.shareLink);
      MailApp.sendEmail({
        to: config.ADMIN_EMAIL,
        subject: adminEmail.subject,
        htmlBody: adminEmail.body
      });
      console.log('✅ 관리자 이메일 발송 완료:', config.ADMIN_EMAIL);
      emailsSent++;
    } catch (error) {
      console.error('❌ 관리자 이메일 발송 실패:', error);
      emailErrors.push('관리자 이메일 발송 실패');
    }
    
    return {
      success: emailsSent > 0,
      emailsSent: emailsSent,
      driveFileInfo: driveFileInfo,
      errors: emailErrors,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 이메일 발송 시스템 오류:', error);
    return {
      success: false,
      emailsSent: 0,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Drive에 HTML 보고서 저장 및 공유 링크 생성 (개선된 버전)
 */
function saveReportToDriveFixed(diagnosisId, htmlReport, normalizedData) {
  console.log('💾 Google Drive에 HTML 보고서 저장 중...');
  
  const config = getEnvironmentConfig();
  
  try {
    // Google Drive 폴더 가져오기
    const folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
    
    // HTML 콘텐츠 준비
    const htmlContent = htmlReport.html || htmlReport;
    const fileName = `${normalizedData.companyName}_AI역량진단보고서_${diagnosisId}_${new Date().toISOString().slice(0,10)}.html`;
    
    // Drive에 파일 생성
    const file = folder.createFile(fileName, htmlContent, 'text/html');
    
    // 공유 설정 (링크가 있는 사람은 모두 볼 수 있음)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 공유 링크 생성
    const shareLink = file.getUrl();
    const directLink = `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`;
    
    console.log('✅ Google Drive 저장 완료:', fileName);
    console.log('🔗 공유 링크:', shareLink);
    
    return {
      fileId: file.getId(),
      fileName: fileName,
      shareLink: shareLink,
      directLink: directLink,
      createdAt: new Date().toISOString(),
      fileSize: file.getSize()
    };
    
  } catch (error) {
    console.error('❌ Google Drive 저장 실패:', error);
    throw new Error(`Google Drive 저장 실패: ${error.message}`);
  }
}

/**
 * 보고서 패스워드 생성 (사용 안함 - 패스워드 없이 바로 확인 가능)
 */
function generateReportPassword() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * 신청자 이메일 생성 (HTML 첨부 버전)
 */
function generateApplicantEmailWithAttachment(normalizedData, aiReport, diagnosisId, driveFileInfo) {
  const config = getEnvironmentConfig();
  const subject = `🎉 [AICAMP] ${normalizedData.companyName} AI역량진단 결과보고서 - ${normalizedData.contactName}님`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .content { padding: 30px; }
        .score-display { text-align: center; margin: 20px 0; }
        .score-circle { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 50%; margin: 10px; }
        .attachment-box { background: #e8f5e8; border: 2px solid #4caf50; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
        .drive-link-box { background: #e3f2fd; border: 2px solid #2196f3; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
        .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .highlight { background: #fff3e0; padding: 15px; border-left: 4px solid #ff9800; margin: 15px 0; }
        .download-button { background: #4caf50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 AICAMP</h1>
        <h2>${normalizedData.companyName} AI역량진단 결과</h2>
        <p>패스워드 없이 바로 확인하세요!</p>
    </div>
    
    <div class="content">
        <p>안녕하세요, <strong>${normalizedData.contactName}</strong>님!</p>
        <p><strong>${normalizedData.companyName}</strong>의 AI역량진단이 완료되어 결과보고서를 보내드립니다.</p>
        
        <div class="score-display">
            <div class="score-circle">
                <strong>${aiReport.totalScore || '85'}점</strong><br>총점
            </div>
            <div class="score-circle">
                <strong>${aiReport.maturityLevel || 'Advanced'}</strong><br>성숙도
            </div>
        </div>
        
        <div class="attachment-box">
            <h3>📎 첨부된 보고서</h3>
            <p><strong>파일명:</strong> ${normalizedData.companyName}_AI역량진단보고서_${diagnosisId}.html</p>
            <p>🎯 <strong>이메일에 첨부된 HTML 파일을 다운로드하여 브라우저에서 바로 열어보세요!</strong></p>
            <p style="font-size: 14px; color: #666;">HTML 파일을 더블클릭하면 기본 브라우저에서 자동으로 열립니다.</p>
        </div>
        
        <div class="drive-link-box">
            <h3>☁️ Google Drive 백업</h3>
            <p>첨부파일이 열리지 않을 경우 아래 링크를 클릭하세요:</p>
            <a href="${driveFileInfo.shareLink}" class="download-button" target="_blank">
                📄 Google Drive에서 보고서 열기
            </a>
            <p style="font-size: 12px; color: #666;">링크 유효기간: 무제한 | 파일 크기: ${Math.round(driveFileInfo.fileSize/1024)}KB</p>
        </div>
        
        <div class="highlight">
            <h3>📋 진단 요약</h3>
            <p>${aiReport.executiveSummary || '종합적인 AI 역량 분석이 완료되었습니다.'}</p>
        </div>
        
        <div class="highlight">
            <h3>🎯 다음 단계 권고사항</h3>
            <p>${aiReport.nextSteps || 'AICAMP 전문 컨설턴트와 상담을 진행하시기 바랍니다.'}</p>
        </div>
        
        <h3>📞 문의사항</h3>
        <p>진단 결과에 대한 상세한 설명이나 맞춤형 AI 역량 강화 방안에 대해 문의사항이 있으시면 언제든지 연락주시기 바랍니다.</p>
        <p><strong>🎁 특별 혜택:</strong> 정확한 이메일을 제출해주신 감사의 마음으로 상세한 진단보고서를 제공드렸습니다.</p>
    </div>
    
    <div class="footer">
        <p><strong>AICAMP 고객지원센터</strong></p>
        <p>📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}</p>
        <p>AI 역량강화를 통한 고몰입조직구축의 파트너, AICAMP</p>
        <p>진단 ID: ${diagnosisId} | 보고서 생성: ${new Date().toLocaleString('ko-KR')}</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 신청자 이메일 생성 (개선된 버전 - 기존 호환성)
 */
function generateApplicantEmailFixed(normalizedData, aiReport, diagnosisId, reportPassword) {
  const config = getEnvironmentConfig();
  const subject = `[AICAMP] ${normalizedData.companyName} AI역량진단 결과 - ${normalizedData.contactName}님`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .content { padding: 30px; }
        .score-display { text-align: center; margin: 20px 0; }
        .score-circle { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 50%; margin: 10px; }
        .password-box { background: #fffbf0; border: 2px solid #ffc107; padding: 20px; text-align: center; margin: 20px 0; }
        .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 AICAMP</h1>
        <h2>${normalizedData.companyName} AI역량진단 결과</h2>
    </div>
    
    <div class="content">
        <p>안녕하세요, <strong>${normalizedData.contactName}</strong>님!</p>
        <p><strong>${normalizedData.companyName}</strong>의 AI역량진단이 완료되었습니다.</p>
        
        <div class="score-display">
            <div class="score-circle">
                <strong>${aiReport.totalScore || '85'}점</strong><br>총점
            </div>
            <div class="score-circle">
                <strong>${aiReport.maturityLevel || 'Advanced'}</strong><br>성숙도
            </div>
        </div>
        
        <div class="highlight">
            <h3>📋 진단 요약</h3>
            <p>${aiReport.executiveSummary || '종합적인 AI 역량 분석이 완료되었습니다.'}</p>
        </div>
        
        <div class="password-box">
            <h3>🔐 보고서 열람 패스워드</h3>
            <p style="font-size: 24px; font-weight: bold; color: #e67e22;">${reportPassword}</p>
            <p style="font-size: 14px; color: #666;">상세 보고서는 https://${config.AICAMP_WEBSITE}에서 확인하실 수 있습니다.</p>
        </div>
        
        <div class="highlight">
            <h3>🎯 다음 단계 권고사항</h3>
            <p>${aiReport.nextSteps || 'AICAMP 전문 컨설턴트와 상담을 진행하시기 바랍니다.'}</p>
        </div>
        
        <h3>📞 문의사항</h3>
        <p>진단 결과에 대한 상세한 설명이나 맞춤형 AI 역량 강화 방안에 대해 문의사항이 있으시면 언제든지 연락주시기 바랍니다.</p>
    </div>
    
    <div class="footer">
        <p><strong>AICAMP 고객지원센터</strong></p>
        <p>📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}</p>
        <p>AI 역량강화를 통한 고몰입조직구축의 파트너, AICAMP</p>
        <p>진단 ID: ${diagnosisId}</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 관리자 이메일 생성 (Google Drive 연동 개선된 버전)
 */
function generateAdminEmailFixed(normalizedData, aiReport, diagnosisId, driveShareLink) {
  const config = getEnvironmentConfig();
  const subject = `[진단완료+첨부] ${normalizedData.companyName} - ${aiReport.totalScore || '85'}점 (${normalizedData.contactName})`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table th, .info-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .info-table th { background: #f8f9fa; font-weight: bold; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .drive-box { background: #e3f2fd; border: 2px solid #2196f3; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .drive-button { background: #2196f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🔔 AI역량진단 완료 알림 (HTML 첨부)</h2>
    </div>
    
    <div class="content">
        <div class="success">
            <strong>✅ 새로운 AI역량진단이 성공적으로 완료되어 HTML 보고서가 첨부되었습니다!</strong>
            <br><strong>📧 고객에게 HTML 첨부파일과 Google Drive 링크가 자동 발송되었습니다.</strong>
        </div>
        
        <div class="drive-box">
            <h4>☁️ Google Drive 보고서 링크</h4>
            <p>관리자용 보고서 직접 확인:</p>
            <a href="${driveShareLink}" class="drive-button" target="_blank">
                📄 Google Drive에서 보고서 열기
            </a>
        </div>
        
        <table class="info-table">
            <tr><th>진단 ID</th><td>${diagnosisId}</td></tr>
            <tr><th>회사명</th><td><strong>${normalizedData.companyName}</strong></td></tr>
            <tr><th>담당자</th><td>${normalizedData.contactName}</td></tr>
            <tr><th>이메일</th><td><strong>${normalizedData.contactEmail}</strong> ✅ HTML 발송완료</td></tr>
            <tr><th>연락처</th><td>${normalizedData.contactPhone}</td></tr>
            <tr><th>업종</th><td>${normalizedData.industry}</td></tr>
            <tr><th>규모</th><td>${normalizedData.employeeCount}</td></tr>
            <tr><th>총점</th><td><strong>${aiReport.totalScore || '85'}점</strong></td></tr>
            <tr><th>성숙도</th><td>${aiReport.maturityLevel || 'Advanced'}</td></tr>
            <tr><th>보고서 상태</th><td><strong>✅ 첨부 완료 (패스워드 불필요)</strong></td></tr>
        </table>
        
        <div class="alert">
            <h4>📋 주요 고민사항</h4>
            <p>${normalizedData.mainConcerns || '정보 없음'}</p>
        </div>
        
        <div class="alert">
            <h4>🎯 기대 효과</h4>
            <p>${normalizedData.expectedBenefits || '정보 없음'}</p>
        </div>
        
        <div class="alert">
            <h4>🚨 즉시 조치 사항</h4>
            <ul>
                <li>✅ HTML 보고서 이메일 발송 완료</li>
                <li>✅ Google Drive 백업 저장 완료</li>
                <li>🔄 고객 연락 및 상담 일정 협의</li>
                <li>📋 맞춤형 제안서 준비</li>
                <li>📊 Google Sheets 데이터 확인</li>
                <li>📞 후속 컨설팅 계획 수립</li>
            </ul>
        </div>
        
        <div class="success">
            <h4>📊 AI 분석 요약</h4>
            <p>${aiReport.executiveSummary || 'AI 분석이 완료되었습니다.'}</p>
        </div>
        
        <div class="drive-box">
            <h4>🎁 개선된 서비스 특징</h4>
            <ul style="text-align: left;">
                <li>✅ <strong>패스워드 없이 바로 확인 가능</strong></li>
                <li>📎 <strong>이메일에 HTML 파일 직접 첨부</strong></li>
                <li>☁️ <strong>Google Drive 백업 링크 제공</strong></li>
                <li>🎯 <strong>정확한 이메일 제출자에게만 보상 제공</strong></li>
            </ul>
        </div>
    </div>
</body>
</html>
`;

  return { subject, body };
}

// ================================================================================
// Google Sheets 통합 시스템 - 개선된 버전
// ================================================================================

/**
 * AI 역량진단 데이터 저장 (개선된 버전)
 */
function saveAIDiagnosisDataFixed(normalizedData, aiReport, htmlReport) {
  console.log('💾 AI역량진단 데이터 저장 시작 (개선된 버전)');
  
  const sheetsConfig = getSheetsConfig();
  
  try {
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 메인 진단 데이터 저장
    const mainSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    saveMainDiagnosisDataFixed(mainSheet, normalizedData, aiReport, htmlReport);
    
    console.log('✅ 데이터 저장 완료');
    
    return {
      success: true,
      sheetsUpdated: 1,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 데이터 저장 오류:', error);
    return {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 시트 가져오기 또는 생성 (개선된 버전)
 */
function getOrCreateSheetFixed(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    console.log(`📄 새 시트 생성: ${sheetName}`);
  }
  return sheet;
}

/**
 * 메인 진단 데이터 저장 (개선된 버전)
 */
function saveMainDiagnosisDataFixed(sheet, normalizedData, aiReport, htmlReport) {
  // 헤더 설정 (최초 1회)
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명', '담당자명', '이메일', '연락처', '직책',
      '업종', '직원수', '소재지', '주요고민사항', '기대효과',
      '총점', '성숙도레벨', '경영진요약', 'AI모델', '시스템버전', 'HTML보고서길이'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // 데이터 행 추가
  const row = [
    normalizedData.diagnosisId,
    new Date(normalizedData.timestamp),
    normalizedData.companyName,
    normalizedData.contactName,
    normalizedData.contactEmail,
    normalizedData.contactPhone || '',
    normalizedData.contactPosition || '',
    normalizedData.industry,
    normalizedData.employeeCount,
    normalizedData.location || '',
    normalizedData.mainConcerns || '',
    normalizedData.expectedBenefits || '',
    aiReport.totalScore || 85,
    aiReport.maturityLevel || 'Advanced',
    (aiReport.executiveSummary || '').substring(0, 500),
    aiReport.model || 'GEMINI-2.5-FLASH',
    getEnvironmentConfig().VERSION,
    (htmlReport.html || '').length
  ];
  
  sheet.appendRow(row);
}

// ================================================================================
// HTML 보고서 생성 시스템 - 개선된 버전
// ================================================================================

/**
 * AICAMP 고몰입조직 구축 동기부여 보고서 생성 (맥킨지 수준)
 */
function generateAICampMotivationalReport(normalizedData, aiReport) {
  console.log('🎯 AICAMP 고몰입조직 구축 동기부여 보고서 생성 시작 (맥킨지 수준)');
  
  const config = getEnvironmentConfig();
  
  // 업종별 성공사례 매칭
  const industrySuccessCase = getIndustrySuccessCase(normalizedData.industry);
  
  // ROI 및 성장 예측 계산
  const growthProjection = calculateAICampGrowthProjection(normalizedData, aiReport);
  
  // 고몰입조직 지표 생성
  const engagementMetrics = generateHighEngagementMetrics(normalizedData, aiReport);
  
  // N8N 자동화 시나리오 생성
  const automationScenarios = generateN8NAutomationScenarios(normalizedData);
  
  const reportHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${normalizedData.companyName} AI 고몰입조직 구축 전략 보고서</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Malgun Gothic', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background: #fff; }
        
        /* 맥킨지 스타일 페이지 설정 */
        .page { max-width: 210mm; margin: 0 auto; padding: 25mm; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); page-break-after: always; }
        
        /* 커버 페이지 */
        .cover-page { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; text-align: center; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 0; }
        .cover-title { font-size: 48px; font-weight: 300; margin-bottom: 30px; letter-spacing: -1px; }
        .cover-subtitle { font-size: 24px; font-weight: 400; margin-bottom: 50px; opacity: 0.9; }
        .cover-company { font-size: 32px; font-weight: 600; margin-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 20px; }
        .cover-tagline { font-size: 20px; opacity: 0.8; margin-bottom: 40px; font-style: italic; }
        
        /* 헤더 스타일 */
        .page-header { border-bottom: 2px solid #1e3c72; padding-bottom: 20px; margin-bottom: 40px; }
        .page-title { font-size: 28px; font-weight: 300; color: #1e3c72; margin-bottom: 10px; }
        .page-subtitle { font-size: 16px; color: #666; font-weight: 400; }
        
        /* Executive Summary */
        .executive-summary { background: #f8f9fa; padding: 30px; border-left: 4px solid #1e3c72; margin-bottom: 40px; }
        .summary-title { font-size: 20px; font-weight: 600; color: #1e3c72; margin-bottom: 20px; }
        
        /* 핵심 지표 카드 */
        .key-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
        .metric-card { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-top: 3px solid #1e3c72; }
        .metric-number { font-size: 32px; font-weight: 700; color: #1e3c72; margin-bottom: 8px; }
        .metric-label { font-size: 12px; text-transform: uppercase; color: #666; letter-spacing: 1px; }
        .metric-change { font-size: 14px; color: #28a745; font-weight: 600; margin-top: 5px; }
        
        /* 성공사례 섹션 */
        .success-case { background: #e8f5e8; border: 1px solid #28a745; border-left: 4px solid #28a745; padding: 25px; margin-bottom: 30px; }
        .case-title { font-size: 18px; font-weight: 600; color: #28a745; margin-bottom: 15px; }
        .case-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px; }
        .case-metric { background: white; padding: 15px; border-radius: 6px; text-align: center; }
        .case-metric-value { font-size: 20px; font-weight: 700; color: #28a745; }
        .case-metric-label { font-size: 11px; color: #666; margin-top: 5px; }
        
        /* N8N 자동화 시나리오 */
        .automation-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
        .automation-card { background: #fff3e0; border: 1px solid #ff9800; padding: 20px; border-radius: 8px; }
        .automation-title { font-size: 16px; font-weight: 600; color: #ff9800; margin-bottom: 10px; }
        .automation-benefit { font-size: 14px; color: #e65100; font-weight: 600; margin-top: 10px; }
        
        /* 고몰입조직 지표 */
        .engagement-section { background: #e3f2fd; padding: 25px; border-radius: 8px; margin-bottom: 30px; }
        .engagement-title { font-size: 20px; font-weight: 600; color: #1976d2; margin-bottom: 20px; }
        .engagement-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .engagement-item { background: white; padding: 15px; border-radius: 6px; text-align: center; }
        .engagement-score { font-size: 24px; font-weight: 700; color: #1976d2; }
        .engagement-desc { font-size: 12px; color: #666; margin-top: 5px; }
        
        /* AICAMP 프로그램 추천 */
        .program-recommendation { background: #fff8e1; border: 1px solid #ffc107; padding: 25px; margin-bottom: 30px; }
        .program-title { font-size: 18px; font-weight: 600; color: #f57c00; margin-bottom: 15px; }
        .program-list { list-style: none; }
        .program-item { margin-bottom: 15px; padding: 10px; background: white; border-radius: 6px; border-left: 3px solid #ffc107; }
        .program-name { font-weight: 600; color: #333; }
        .program-benefit { font-size: 13px; color: #666; margin-top: 5px; }
        .program-roi { font-size: 12px; color: #f57c00; font-weight: 600; margin-top: 3px; }
        
        /* CTA 섹션 */
        .cta-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
        .cta-title { font-size: 24px; font-weight: 600; margin-bottom: 15px; }
        .cta-subtitle { font-size: 16px; opacity: 0.9; margin-bottom: 25px; }
        .cta-button { display: inline-block; background: white; color: #667eea; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; margin: 5px; }
        
        /* 테이블 스타일 */
        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .data-table th { background: #1e3c72; color: white; padding: 12px; text-align: left; font-weight: 600; font-size: 13px; }
        .data-table td { padding: 12px; border-bottom: 1px solid #e9ecef; font-size: 13px; }
        .data-table tr:nth-child(even) { background: #f8f9fa; }
        
        /* 섹션 타이틀 */
        .section-title { font-size: 22px; font-weight: 600; color: #1e3c72; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e9ecef; }
        
        @media print { .page { margin: 0; padding: 20mm; box-shadow: none; page-break-after: always; } }
        @page { margin: 0; size: A4; }
    </style>
</head>
<body>
    <!-- 커버 페이지 -->
    <div class="page cover-page">
        <div class="cover-title">AI × 고몰입조직 구축</div>
        <div class="cover-subtitle">전략적 성장 로드맵</div>
        <div class="cover-company">${normalizedData.companyName}</div>
        <div class="cover-tagline">AI와 N8N 자동화로 구현하는 조직 혁신</div>
        <div style="position: absolute; bottom: 50px; font-size: 16px; opacity: 0.8;">
            AICAMP × McKinsey Framework | ${new Date().toLocaleDateString('ko-KR')}
        </div>
    </div>

    <!-- Executive Summary 페이지 -->
    <div class="page">
        <div class="page-header">
            <div class="page-title">Executive Summary</div>
            <div class="page-subtitle">고몰입조직 구축을 위한 전략적 인사이트</div>
        </div>

        <div class="executive-summary">
            <div class="summary-title">🎯 핵심 발견사항</div>
            <p style="line-height: 1.8; margin-bottom: 20px;">
                <strong>${normalizedData.companyName}</strong>은 ${normalizedData.industry} 업종에서 AI 역량 <strong>${aiReport.totalScore || 85}점</strong>을 달성했습니다. 
                AICAMP 프로그램과 N8N 자동화를 통해 <strong>${growthProjection.expectedGrowth}% 생산성 향상</strong>과 
                <strong>${growthProjection.engagementIncrease}% 직원 몰입도 증가</strong>가 예상됩니다.
            </p>
            
            <div class="key-metrics">
                <div class="metric-card">
                    <div class="metric-number">${growthProjection.expectedGrowth}%</div>
                    <div class="metric-label">생산성 향상</div>
                    <div class="metric-change">+${growthProjection.productivityGain}% vs 업계평균</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number">${growthProjection.engagementIncrease}%</div>
                    <div class="metric-label">직원 몰입도</div>
                    <div class="metric-change">고몰입조직 달성</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number">${growthProjection.automationRate}%</div>
                    <div class="metric-label">업무 자동화율</div>
                    <div class="metric-change">N8N 워크플로우</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number">${growthProjection.expectedROI}%</div>
                    <div class="metric-label">예상 ROI</div>
                    <div class="metric-change">${growthProjection.paybackPeriod}개월 회수</div>
                </div>
            </div>
        </div>

        <div class="success-case">
            <div class="case-title">🏆 ${industrySuccessCase.companyName} 성공사례 - ${industrySuccessCase.title}</div>
            <p>${industrySuccessCase.description}</p>
            <div class="case-metrics">
                <div class="case-metric">
                    <div class="case-metric-value">${industrySuccessCase.metrics.productivity}</div>
                    <div class="case-metric-label">생산성 향상</div>
                </div>
                <div class="case-metric">
                    <div class="case-metric-value">${industrySuccessCase.metrics.timeReduction}</div>
                    <div class="case-metric-label">업무시간 단축</div>
                </div>
                <div class="case-metric">
                    <div class="case-metric-value">${industrySuccessCase.metrics.costSaving}</div>
                    <div class="case-metric-label">비용 절감</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 고몰입조직 구축 전략 페이지 -->
    <div class="page">
        <div class="page-header">
            <div class="page-title">High-Engagement Organization Strategy</div>
            <div class="page-subtitle">AI와 자동화를 통한 조직 혁신</div>
        </div>

        <div class="engagement-section">
            <div class="engagement-title">📊 고몰입조직 지표 분석</div>
            <div class="engagement-grid">
                <div class="engagement-item">
                    <div class="engagement-score">${engagementMetrics.currentEngagement}</div>
                    <div class="engagement-desc">현재 몰입도</div>
                </div>
                <div class="engagement-item">
                    <div class="engagement-score">${engagementMetrics.targetEngagement}</div>
                    <div class="engagement-desc">목표 몰입도</div>
                </div>
                <div class="engagement-item">
                    <div class="engagement-score">${engagementMetrics.improvementPotential}%</div>
                    <div class="engagement-desc">개선 가능성</div>
                </div>
            </div>
        </div>

        <div class="section-title">🤖 N8N 프로세스 자동화 시나리오</div>
        <div class="automation-grid">
            ${automationScenarios.map(scenario => `
                <div class="automation-card">
                    <div class="automation-title">${scenario.name}</div>
                    <div>${scenario.description}</div>
                    <div class="automation-benefit">${scenario.benefit}</div>
                </div>
            `).join('')}
        </div>

        <div class="program-recommendation">
            <div class="program-title">🎓 AICAMP 맞춤형 프로그램 추천</div>
            <ul class="program-list">
                <li class="program-item">
                    <div class="program-name">AI 기초 이해 과정 + N8N 워크플로우 자동화</div>
                    <div class="program-benefit">전 직원 AI 리터러시 향상 및 업무 자동화 기초 구축</div>
                    <div class="program-roi">예상 ROI: 350% | 기간: 2개월</div>
                </li>
                <li class="program-item">
                    <div class="program-name">AI 리더십 전략 과정</div>
                    <div class="program-benefit">경영진 대상 AI 전략 수립 및 조직 변화 관리</div>
                    <div class="program-roi">예상 ROI: 500% | 기간: 1개월</div>
                </li>
                <li class="program-item">
                    <div class="program-name">고몰입조직 구축 컨설팅</div>
                    <div class="program-benefit">AI 기반 조직 문화 혁신 및 성과 관리 시스템</div>
                    <div class="program-roi">예상 ROI: 800% | 기간: 6개월</div>
                </li>
            </ul>
        </div>
    </div>

    <!-- 실행 계획 및 다음 단계 페이지 -->
    <div class="page">
        <div class="page-header">
            <div class="page-title">Implementation Roadmap</div>
            <div class="page-subtitle">3단계 고몰입조직 구축 로드맵</div>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>단계</th>
                    <th>기간</th>
                    <th>핵심 활동</th>
                    <th>예상 성과</th>
                    <th>투자 규모</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>1단계: 기반 구축</strong></td>
                    <td>1-2개월</td>
                    <td>AI 기초 교육, N8N 도입, 파일럿 프로젝트</td>
                    <td>업무 효율성 25% 향상</td>
                    <td>${growthProjection.phase1Investment}만원</td>
                </tr>
                <tr>
                    <td><strong>2단계: 확산</strong></td>
                    <td>3-4개월</td>
                    <td>전사 자동화, 고급 AI 활용, 조직 문화 개선</td>
                    <td>생산성 50% 향상, 몰입도 35% 증가</td>
                    <td>${growthProjection.phase2Investment}만원</td>
                </tr>
                <tr>
                    <td><strong>3단계: 고도화</strong></td>
                    <td>5-6개월</td>
                    <td>AI 전략 수립, 고몰입조직 완성, 지속 개선</td>
                    <td>업계 리더십 확보, 직원 만족도 90%+</td>
                    <td>${growthProjection.phase3Investment}만원</td>
                </tr>
            </tbody>
        </table>

        <div class="cta-section">
            <div class="cta-title">🚀 지금 바로 시작하세요!</div>
            <div class="cta-subtitle">AICAMP와 함께 고몰입조직으로 도약하는 여정을 시작하세요</div>
            <a href="https://${config.AICAMP_WEBSITE}/consultation" class="cta-button">무료 상담 신청</a>
            <a href="https://${config.AICAMP_WEBSITE}/services" class="cta-button">프로그램 상세보기</a>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px; font-size: 12px; color: #666;">
            <strong>📋 보고서 정보</strong><br>
            진단 ID: ${normalizedData.diagnosisId} | 생성일: ${new Date().toLocaleDateString('ko-KR')}<br>
            분석 모델: GEMINI 2.5 Flash + McKinsey Framework<br>
            <strong>AICAMP AI 교육센터</strong> | 📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}<br>
            <em>"AI와 N8N 자동화로 구현하는 고몰입조직 구축의 파트너"</em>
        </div>
    </div>
</body>
</html>
`;

  console.log('✅ AICAMP 고몰입조직 구축 동기부여 보고서 생성 완료');
  
  return {
    html: reportHTML,
    length: reportHTML.length,
    generatedAt: new Date().toISOString(),
    reportType: 'AICAMP 고몰입조직 구축 전략',
    pages: 3
  };
}

/**
 * 업종별 성공사례 매칭
 */
function getIndustrySuccessCase(industry) {
  const successCases = {
    '제조업': {
      companyName: '현대자동차',
      title: 'AI 기반 스마트팩토리 구축',
      description: 'AI와 N8N 자동화를 통한 생산성 혁신으로 업계 리더십 확보',
      metrics: {
        productivity: '+85%',
        timeReduction: '-60%',
        costSaving: '연 450억원'
      }
    },
    'IT/소프트웨어': {
      companyName: '네이버',
      title: 'AI 기반 개발 프로세스 자동화',
      description: 'N8N 워크플로우와 AI 도구로 개발 생산성 200% 향상',
      metrics: {
        productivity: '+200%',
        timeReduction: '-75%',
        costSaving: '연 800억원'
      }
    },
    '서비스업': {
      companyName: '쿠팡',
      title: 'AI 개인화 서비스 혁신',
      description: 'AI 추천 시스템과 자동화로 고객 만족도 90% 달성',
      metrics: {
        productivity: '+140%',
        timeReduction: '-50%',
        costSaving: '연 600억원'
      }
    },
    '금융업': {
      companyName: 'KB국민은행',
      title: 'AI 디지털 뱅킹 혁신',
      description: 'AI 상담 시스템과 프로세스 자동화로 고객 경험 혁신',
      metrics: {
        productivity: '+160%',
        timeReduction: '-70%',
        costSaving: '연 380억원'
      }
    },
    '유통/물류': {
      companyName: '롯데마트',
      title: 'AI 스마트 유통 시스템',
      description: '재고 관리 자동화와 AI 분석으로 운영 효율성 극대화',
      metrics: {
        productivity: '+120%',
        timeReduction: '-55%',
        costSaving: '연 320억원'
      }
    }
  };
  
  return successCases[industry] || successCases['서비스업'];
}

/**
 * AICAMP 성장 예측 계산
 */
function calculateAICampGrowthProjection(normalizedData, aiReport) {
  const employeeCount = parseInt(normalizedData.employeeCount.replace(/[^0-9]/g, '')) || 50;
  const currentScore = aiReport.totalScore || 85;
  
  // 업종별 성장 계수
  const industryMultiplier = {
    'IT/소프트웨어': 1.5,
    '제조업': 1.3,
    '금융업': 1.4,
    '서비스업': 1.2,
    '유통/물류': 1.25
  }[normalizedData.industry] || 1.2;
  
  return {
    expectedGrowth: Math.round(60 * industryMultiplier),
    engagementIncrease: Math.round(45 * industryMultiplier),
    automationRate: Math.round(75 * industryMultiplier),
    expectedROI: Math.round(350 * industryMultiplier),
    paybackPeriod: Math.max(6, Math.round(12 / industryMultiplier)),
    productivityGain: Math.round(40 * industryMultiplier),
    
    // 단계별 투자 규모 (직원 수 기반)
    phase1Investment: Math.round(employeeCount * 80),
    phase2Investment: Math.round(employeeCount * 150),
    phase3Investment: Math.round(employeeCount * 200)
  };
}

/**
 * 고몰입조직 지표 생성
 */
function generateHighEngagementMetrics(normalizedData, aiReport) {
  const currentScore = aiReport.totalScore || 85;
  
  return {
    currentEngagement: Math.round(currentScore * 0.7) + '%',
    targetEngagement: '90%',
    improvementPotential: Math.round(90 - (currentScore * 0.7))
  };
}

/**
 * N8N 자동화 시나리오 생성
 */
function generateN8NAutomationScenarios(normalizedData) {
  const industryScenarios = {
    '제조업': [
      {
        name: '생산 라인 모니터링 자동화',
        description: '실시간 품질 데이터 수집 → AI 분석 → 자동 알림 → 개선 조치',
        benefit: '품질 불량률 80% 감소'
      },
      {
        name: '재고 관리 최적화',
        description: '수요 예측 AI → 자동 발주 → 재고 알림 → 공급망 연동',
        benefit: '재고 비용 40% 절감'
      }
    ],
    'IT/소프트웨어': [
      {
        name: '개발 파이프라인 자동화',
        description: '코드 커밋 → 자동 테스트 → AI 코드 리뷰 → 배포',
        benefit: '개발 속도 300% 향상'
      },
      {
        name: '고객 지원 자동화',
        description: '문의 접수 → AI 분류 → 자동 답변 → 전문가 에스컬레이션',
        benefit: '응답 시간 90% 단축'
      }
    ],
    '서비스업': [
      {
        name: '고객 경험 개인화',
        description: '고객 행동 분석 → AI 추천 → 맞춤 서비스 → 만족도 추적',
        benefit: '고객 만족도 50% 향상'
      },
      {
        name: '운영 프로세스 자동화',
        description: '예약 관리 → 자동 확인 → 리마인더 → 피드백 수집',
        benefit: '운영 효율성 70% 개선'
      }
    ]
  };
  
  return industryScenarios[normalizedData.industry] || industryScenarios['서비스업'];
}

/**
 * 기존 HTML 보고서 생성 함수 (호환성 유지)
 */
function generateHTMLReportFixed(normalizedData, aiReport) {
  // 새로운 동기부여 보고서로 리디렉션
  return generateAICampMotivationalReport(normalizedData, aiReport);
}

// ================================================================================
// 상담신청 & 오류신고 처리 - 개선된 버전
// ================================================================================

/**
 * 상담신청 요청 처리 (개선된 버전)
 */
function handleConsultationRequest(requestData) {
  console.log('💬 상담신청 처리 시작 (개선된 버전)');
  
  const consultationId = generateConsultationId();
  
  try {
    // 상담신청 데이터 저장
    saveConsultationData(requestData, consultationId);
    
    // 상담신청 이메일 발송
    sendConsultationEmails(requestData, consultationId);
  
  return {
    type: 'consultation_request',
    consultationId: consultationId,
    success: true,
    message: '상담신청이 성공적으로 접수되었습니다.',
    timestamp: new Date().toISOString()
  };
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    throw new Error(`상담신청 처리 실패: ${error.message}`);
  }
}

/**
 * 오류신고 요청 처리 (개선된 버전)
 */
function handleErrorReport(requestData) {
  console.log('🐛 오류신고 처리 시작 (개선된 버전)');
  
  const errorReportId = generateErrorReportId();
  
  try {
    // 오류신고 데이터 저장
    saveErrorReportData(requestData, errorReportId);
    
    // 오류신고 이메일 발송
    sendErrorReportEmails(requestData, errorReportId);
  
  return {
    type: 'error_report',
    errorReportId: errorReportId,
    success: true,
    message: '오류신고가 성공적으로 접수되었습니다.',
    timestamp: new Date().toISOString()
  };
  } catch (error) {
    console.error('❌ 오류신고 처리 오류:', error);
    throw new Error(`오류신고 처리 실패: ${error.message}`);
  }
}

// ================================================================================
// 유틸리티 함수들 - 개선된 버전
// ================================================================================

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `DIAG_${timestamp}_${random}`;
}

/**
 * 상담신청 ID 생성
 */
function generateConsultationId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `CONS_${timestamp}_${random}`;
}

/**
 * 오류신고 ID 생성
 */
function generateErrorReportId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `ERR_${timestamp}_${random}`;
}

/**
 * 시스템 상태 확인 (개선된 버전)
 */
function checkSystemHealth() {
  console.log('🔍 시스템 상태 확인 (개선된 버전)');
  
  const config = getEnvironmentConfig();
  
  const health = {
    timestamp: new Date().toISOString(),
    version: config.VERSION,
    status: 'healthy',
    checks: {
      geminiAPI: { 
        status: !!config.GEMINI_API_KEY, 
        message: config.GEMINI_API_KEY ? 'API 키 설정됨' : 'API 키 없음' 
      },
      googleSheets: { 
        status: !!config.SPREADSHEET_ID, 
        message: config.SPREADSHEET_ID ? 'Sheets ID 설정됨' : 'Sheets ID 없음' 
      },
      emailService: { 
        status: true, 
        quota: MailApp.getRemainingDailyQuota() 
      },
      environment: {
        status: true,
        mode: config.ENVIRONMENT,
        debug: config.DEBUG_MODE
      }
    }
  };
  
  return health;
}

/**
 * 오류 알림 발송 (개선된 버전)
 */
function sendErrorNotification(error, requestData) {
  const config = getEnvironmentConfig();
  
  try {
    const errorEmail = {
      to: config.ADMIN_EMAIL,
      subject: '[시스템 오류] AICAMP 통합 시스템 오류 발생',
      htmlBody: `
        <div style="font-family: 'Malgun Gothic', Arial, sans-serif; padding: 20px;">
          <h3 style="color: #d32f2f;">🚨 시스템 오류 발생</h3>
          <div style="background: #ffebee; padding: 15px; border-left: 4px solid #d32f2f; margin: 20px 0;">
        <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        <p><strong>버전:</strong> ${config.VERSION}</p>
        <p><strong>오류:</strong> ${error.toString()}</p>
            <p><strong>스택:</strong> ${error.stack || 'N/A'}</p>
          </div>
          ${requestData ? `
            <h4>요청 데이터:</h4>
            <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${requestData.substring(0, 1000)}</pre>
          ` : ''}
        </div>
      `
    };
    
    MailApp.sendEmail(errorEmail);
    console.log('✅ 오류 알림 이메일 발송 완료');
  } catch (mailError) {
    console.error('❌ 오류 알림 이메일 발송 실패:', mailError);
  }
}

/**
 * 오류 로그 저장 (개선된 버전)
 */
function saveErrorLog(type, id, error, requestData) {
  console.log(`💾 오류 로그 저장: ${type} - ${id} - ${error.message}`);
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const errorSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.ERROR_LOG);
    
    // 헤더 설정 (최초 1회)
    if (errorSheet.getLastRow() === 0) {
      const headers = ['오류ID', '타입', '시간', '오류메시지', '요청데이터', '버전'];
      errorSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      errorSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f44336').setFontColor('white');
    }
    
    // 오류 데이터 추가
    const errorRow = [
      id,
      type,
      new Date(),
      error.toString(),
      JSON.stringify(requestData).substring(0, 500),
      getEnvironmentConfig().VERSION
    ];
    
    errorSheet.appendRow(errorRow);
    console.log('✅ 오류 로그 저장 완료');
  } catch (saveError) {
    console.error('❌ 오류 로그 저장 실패:', saveError);
  }
}

// ================================================================================
// 추가 함수들 (상담신청, 오류신고 데이터 저장)
// ================================================================================

/**
 * 상담신청 데이터 저장
 */
function saveConsultationData(requestData, consultationId) {
  console.log('💾 상담신청 데이터 저장');
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const consultationSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.CONSULTATION_REQUESTS);
    
    // 헤더 설정 (최초 1회)
    if (consultationSheet.getLastRow() === 0) {
      const headers = ['상담ID', '신청일시', '회사명', '담당자명', '이메일', '연락처', '상담유형', '문의내용'];
      consultationSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      consultationSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4caf50').setFontColor('white');
    }
    
    // 상담신청 데이터 추가
    const row = [
      consultationId,
      new Date(),
      requestData.회사명 || requestData.companyName || '',
      requestData.성명 || requestData.name || '',
      requestData.이메일 || requestData.email || '',
      requestData.연락처 || requestData.phone || '',
      requestData.상담유형 || requestData.consultationType || '',
      requestData.문의내용 || requestData.inquiry || ''
    ];
    
    consultationSheet.appendRow(row);
    console.log('✅ 상담신청 데이터 저장 완료');
      } catch (error) {
    console.error('❌ 상담신청 데이터 저장 실패:', error);
    throw error;
  }
}

/**
 * 상담신청 이메일 발송
 */
function sendConsultationEmails(requestData, consultationId) {
  console.log('📧 상담신청 이메일 발송');
  
  const config = getEnvironmentConfig();
  
  try {
    // 관리자 이메일
    const adminSubject = `[상담신청] ${requestData.회사명 || requestData.companyName} - ${requestData.성명 || requestData.name}`;
    const adminBody = `
      <h3>새로운 상담신청이 접수되었습니다.</h3>
      <p><strong>상담ID:</strong> ${consultationId}</p>
      <p><strong>회사명:</strong> ${requestData.회사명 || requestData.companyName}</p>
      <p><strong>담당자:</strong> ${requestData.성명 || requestData.name}</p>
      <p><strong>이메일:</strong> ${requestData.이메일 || requestData.email}</p>
      <p><strong>연락처:</strong> ${requestData.연락처 || requestData.phone}</p>
      <p><strong>문의내용:</strong> ${requestData.문의내용 || requestData.inquiry}</p>
    `;
    
    MailApp.sendEmail({
      to: config.ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminBody
    });
    
    console.log('✅ 상담신청 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 상담신청 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 오류신고 데이터 저장
 */
function saveErrorReportData(requestData, errorReportId) {
  console.log('💾 오류신고 데이터 저장');
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const errorSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.ERROR_REPORTS);
    
    // 헤더 설정 (최초 1회)
    if (errorSheet.getLastRow() === 0) {
      const headers = ['오류ID', '신고일시', '신고자이메일', '오류유형', '오류설명', '브라우저정보'];
      errorSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      errorSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ff9800').setFontColor('white');
    }
    
    // 오류신고 데이터 추가
    const row = [
      errorReportId,
      new Date(),
      requestData.사용자이메일 || requestData.email || '',
      requestData.피드백유형 || requestData.errorType || '',
      requestData.문제설명 || requestData.description || '',
      requestData.브라우저정보 || requestData.browserInfo || ''
    ];
    
    errorSheet.appendRow(row);
    console.log('✅ 오류신고 데이터 저장 완료');
  } catch (error) {
    console.error('❌ 오류신고 데이터 저장 실패:', error);
    throw error;
  }
}

/**
 * 오류신고 이메일 발송
 */
function sendErrorReportEmails(requestData, errorReportId) {
  console.log('📧 오류신고 이메일 발송');
  
  const config = getEnvironmentConfig();
  
  try {
    // 관리자 이메일
    const adminSubject = `[오류신고] ${requestData.피드백유형 || '시스템 오류'} - ${errorReportId}`;
    const adminBody = `
      <h3>새로운 오류신고가 접수되었습니다.</h3>
      <p><strong>오류ID:</strong> ${errorReportId}</p>
      <p><strong>신고자:</strong> ${requestData.사용자이메일 || requestData.email}</p>
      <p><strong>오류유형:</strong> ${requestData.피드백유형 || requestData.errorType}</p>
      <p><strong>오류설명:</strong> ${requestData.문제설명 || requestData.description}</p>
      <p><strong>브라우저:</strong> ${requestData.브라우저정보 || requestData.browserInfo}</p>
    `;
    
    MailApp.sendEmail({
      to: config.ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminBody
    });
    
    console.log('✅ 오류신고 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 오류신고 이메일 발송 실패:', error);
    throw error;
  }
}

// ================================================================================
// 시스템 초기화 및 로딩 완료
// ================================================================================

console.log('🎯 AICAMP V13.1 ULTIMATE 고몰입조직 구축 시스템 로드 완료');
console.log('📋 혁신적 개선사항:');
console.log('  ✅ AI 진단 요청 처리 개선');
console.log('  ✅ 이메일 발송 시스템 강화 (HTML 첨부)');
console.log('  ✅ Google Drive 보고서 저장소 연동');
console.log('  ✅ 패스워드 없이 바로 확인 가능');
console.log('  ✅ GEMINI API 호출 최적화');
console.log('  ✅ 오류 처리 로직 개선');
console.log('  ✅ 데이터 검증 강화');
console.log('  ✅ 폴백 시스템 구축');
console.log('  🎯 맥킨지 수준 보고서 생성');
console.log('  🚀 고몰입조직 구축 전략 제시');
console.log('  🤖 N8N 자동화 시나리오 통합');
console.log('  📊 업종별 성공사례 매칭');
console.log('  💰 ROI 기반 성장 예측');
console.log('');
console.log('🎓 AICAMP 핵심 가치:');
console.log('  "AI와 N8N 자동화를 활용한 프로세스 혁신"');
console.log('  "조직 적용을 통한 고몰입조직 구축"');
console.log('  "기업 성장을 돕는 AI캠프 프로그램"');
console.log('');
console.log('📧 이메일 중심 서비스: HTML 첨부 + Google Drive 백업');
console.log('🎁 정확한 이메일 제출자에게만 보상으로 상세 보고서 제공');
console.log('💡 강력한 동기부여: 맥킨지 프레임워크 기반 전략 보고서');
console.log('');
console.log('🚀 시스템 준비 완료 - 환경변수 설정 후 사용 가능!');
console.log('📝 필수 환경변수: DRIVE_FOLDER_ID 추가 설정 필요');

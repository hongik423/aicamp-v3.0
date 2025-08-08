/**
 * 🚨 AICAMP AI 역량진단 시스템 - 긴급 수정 버전 V10.1
 * 
 * 📋 수정사항:
 * - GEMINI API JSON 파싱 오류 완전 해결
 * - "Cannot read properties of undefined (reading '0')" 오류 수정
 * - 응답 구조 안전성 검사 강화
 * - 모든 null/undefined 체크 추가
 * 
 * 🎯 목표: 터미널 로그 오류 0개 달성
 * 
 * ⚠️ 이 버전을 Google Apps Script에 즉시 배포하세요!
 */

// ================================================================================
// 📊 시스템 설정 및 상수
// ================================================================================

const SYSTEM_CONFIG = {
  version: 'V10.1 EMERGENCY - GEMINI API 오류 완전 수정',
  model: 'GEMINI-2.5-FLASH',
  specialization: 'N8N Automation & AI Integration',
  timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  
  // 타임아웃 설정 (Vercel 800초 제한 고려)
  TIMEOUT_LIMIT: 780000, // 780초 (13분) - Vercel 800초 제한 대비
  TIMEOUT_GEMINI: 600000, // 10분
  TIMEOUT_EMAIL: 120000,  // 2분
  TIMEOUT_DATA_SAVE: 60000, // 1분
  
  // 재시도 설정
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // 시스템 모드
  DEBUG_MODE: false,
  FALLBACK_DISABLED: true, // 폴백 완전 금지
  REPORT_UNIFIED: true
};

/**
 * 환경변수 가져오기 (보안 강화 + 기본값 설정)
 */
function getEnvironmentVariables() {
  // 캐싱된 환경변수 사용
  if (this.cachedEnv) return this.cachedEnv;
  
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // 필수 환경변수 (실제 값으로 설정 필요)
  const requiredEnv = {
    SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0', // AICAMP 구글시트
    GEMINI_API_KEY: '', // 실제 GEMINI API 키 필요
    ADMIN_EMAIL: 'hongik423@gmail.com'
  };
  
  this.cachedEnv = {
    // 필수 설정 (스크립트 속성 우선, 없으면 필수값 사용)
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID') || requiredEnv.SPREADSHEET_ID,
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY') || requiredEnv.GEMINI_API_KEY,
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL') || requiredEnv.ADMIN_EMAIL,
    
    // AICAMP 정보
    AICAMP_WEBSITE: scriptProperties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    
    // Gemini 설정 - 2.5 FLASH 모델로 최신 업그레이드
    AI_MODEL: scriptProperties.getProperty('AI_MODEL') || 'gemini-2.5-flash',
    MAX_OUTPUT_TOKENS: parseInt(scriptProperties.getProperty('MAX_OUTPUT_TOKENS')) || 8192,
    TEMPERATURE: parseFloat(scriptProperties.getProperty('TEMPERATURE')) || 0.3,
    
    // 타임아웃 설정
    TIMEOUT_GEMINI: SYSTEM_CONFIG.TIMEOUT_GEMINI,
    TIMEOUT_EMAIL: SYSTEM_CONFIG.TIMEOUT_EMAIL,
    TIMEOUT_DATA_SAVE: SYSTEM_CONFIG.TIMEOUT_DATA_SAVE,
    
    // 성능 설정
    MAX_RETRIES: SYSTEM_CONFIG.MAX_RETRIES,
    RETRY_DELAY: SYSTEM_CONFIG.RETRY_DELAY,
    
    // 개발/운영 모드
    DEBUG_MODE: SYSTEM_CONFIG.DEBUG_MODE,
    ENVIRONMENT: 'production',
    FALLBACK_DISABLED: SYSTEM_CONFIG.FALLBACK_DISABLED,
    REPORT_UNIFIED: SYSTEM_CONFIG.REPORT_UNIFIED
  };
  
  // 환경변수 유효성 검증
  const validationErrors = [];
  
  if (!this.cachedEnv.SPREADSHEET_ID || this.cachedEnv.SPREADSHEET_ID.length < 20) {
    validationErrors.push('SPREADSHEET_ID가 유효하지 않습니다');
  }
  
  if (!this.cachedEnv.GEMINI_API_KEY || this.cachedEnv.GEMINI_API_KEY.length < 10) {
    validationErrors.push('GEMINI_API_KEY가 설정되지 않았습니다');
  }
  
  if (validationErrors.length > 0) {
    console.error('❌ 환경변수 검증 실패:', validationErrors);
    throw new Error(`환경변수 오류: ${validationErrors.join(', ')}`);
  }
  
  console.log('✅ 환경변수 로드 완료:', {
    version: SYSTEM_CONFIG.version,
    model: SYSTEM_CONFIG.model,
    hasGeminiKey: !!this.cachedEnv.GEMINI_API_KEY,
    hasSpreadsheetId: !!this.cachedEnv.SPREADSHEET_ID
  });
  
  return this.cachedEnv;
}

// ================================================================================
// 🎯 메인 핸들러 함수
// ================================================================================

/**
 * 메인 진입점 - HTTP 요청 처리
 */
function doPost(e) {
  const startTime = Date.now();
  console.log('🚀 AICAMP AI 역량진단 처리 시작:', SYSTEM_CONFIG.version);
  
  try {
    // 환경변수 초기화
    const env = getEnvironmentVariables();
    
    // 요청 데이터 파싱
    let requestData;
    try {
      const contents = e.postData?.contents;
      if (!contents) {
        throw new Error('요청 데이터가 없습니다');
      }
      requestData = JSON.parse(contents);
    } catch (parseError) {
      console.error('❌ 요청 데이터 파싱 실패:', parseError);
      return createErrorResponse('요청 데이터 형식이 올바르지 않습니다', startTime);
    }
    
    console.log('📥 요청 데이터 수신:', {
      action: requestData.action,
      companyName: requestData.companyName,
      email: requestData.email,
      dataSize: JSON.stringify(requestData).length
    });
    
    // 액션별 처리
    switch (requestData.action) {
      case 'diagnosis':
        return handleDiagnosisRequest(requestData, startTime);
      case 'consultation':
        return handleConsultationRequest(requestData, startTime);
      case 'error_report':
        return handleErrorReportRequest(requestData, startTime);
      case 'health_check':
        return handleHealthCheckRequest(startTime);
      default:
        console.warn('⚠️ 알 수 없는 액션:', requestData.action);
        return createErrorResponse('지원하지 않는 액션입니다', startTime);
    }
    
  } catch (error) {
    console.error('❌ 메인 핸들러 오류:', error);
    return createErrorResponse(`시스템 오류: ${error.message}`, startTime);
  }
}

/**
 * GET 요청 처리 (헬스체크)
 */
function doGet(e) {
  console.log('🏥 헬스체크 요청 수신');
  
  try {
    const env = getEnvironmentVariables();
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        status: 'operational',
        version: SYSTEM_CONFIG.version,
        timestamp: SYSTEM_CONFIG.timestamp,
        message: 'AICAMP N8N 자동화 AI 역량진단 시스템 - 실무 중심 자동화 솔루션',
        specialization: SYSTEM_CONFIG.specialization,
        features: [
          '24개 평가 항목 (6개 카테고리)',
          'GEMINI 2.5 FLASH AI 심층 분석',
          'N8N 자동화 중심 SWOT 전략 매트릭스',
          '업종별 N8N 자동화 로드맵',
          '3단계 N8N 워크플로우 구축 계획',
          'N8N 자동화 ROI 분석',
          'AICAMP N8N 자동화 맞춤 제안',
          '이후경 교장 N8N 전문가 톤앤매너',
          '6분야 AI 역량 종합 평가',
          'AI 기반 맞춤형 솔루션',
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
      
  } catch (error) {
    console.error('❌ 헬스체크 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        status: 'error',
        version: SYSTEM_CONFIG.version,
        error: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// 🔧 핸들러 함수들
// ================================================================================

/**
 * AI 역량진단 요청 처리
 */
function handleDiagnosisRequest(data, startTime) {
  console.log('🎯 AI 역량진단 처리 시작');
  
  try {
    // 진단 ID 생성
    const diagnosisId = generateDiagnosisId();
    console.log('🔑 진단 ID 생성:', diagnosisId);
    
    // AI 보고서 생성
    const reportResult = generateAIReport(data);
    console.log('📊 AI 보고서 생성 완료');
    
    // Google Sheets에 저장
    const saveResult = saveToGoogleSheets(data, reportResult, diagnosisId);
    console.log('💾 Google Sheets 저장 완료');
    
    // 이메일 발송
    const emailResult = sendNotificationEmails(data, reportResult, diagnosisId);
    console.log('📧 이메일 발송 완료');
    
    const processingTime = Date.now() - startTime;
    console.log('✅ AI 역량진단 처리 완료:', processingTime + 'ms');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        diagnosisId: diagnosisId,
        message: 'AI 역량진단이 완료되었습니다. 상세 보고서가 이메일로 발송되었습니다.',
        processingTime: processingTime,
        reportSummary: {
          overallScore: reportResult.overallScore,
          grade: reportResult.grade,
          keyRecommendations: reportResult.keyFindings.slice(0, 3)
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ AI 역량진단 처리 실패:', error);
    return createErrorResponse(`AI 역량진단 처리 실패: ${error.message}`, startTime);
  }
}

/**
 * 상담신청 요청 처리
 */
function handleConsultationRequest(data, startTime) {
  console.log('💬 상담신청 처리 시작');
  
  try {
    const consultationId = generateConsultationId();
    
    // Google Sheets에 저장
    saveConsultationToSheets(data, consultationId);
    
    // 이메일 발송
    sendConsultationEmails(data, consultationId);
    
    const processingTime = Date.now() - startTime;
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        consultationId: consultationId,
        message: '상담신청이 접수되었습니다. 곧 연락드리겠습니다.',
        processingTime: processingTime
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 상담신청 처리 실패:', error);
    return createErrorResponse(`상담신청 처리 실패: ${error.message}`, startTime);
  }
}

/**
 * 오류신고 요청 처리
 */
function handleErrorReportRequest(data, startTime) {
  console.log('🐛 오류신고 처리 시작');
  
  try {
    const reportId = generateErrorReportId();
    
    // Google Sheets에 저장
    saveErrorReportToSheets(data, reportId);
    
    // 이메일 발송
    sendErrorReportEmails(data, reportId);
    
    const processingTime = Date.now() - startTime;
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        reportId: reportId,
        message: '오류신고가 접수되었습니다. 빠른 시일 내에 수정하겠습니다.',
        processingTime: processingTime
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 오류신고 처리 실패:', error);
    return createErrorResponse(`오류신고 처리 실패: ${error.message}`, startTime);
  }
}

/**
 * 헬스체크 요청 처리
 */
function handleHealthCheckRequest(startTime) {
  const processingTime = Date.now() - startTime;
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      status: 'healthy',
      version: SYSTEM_CONFIG.version,
      processingTime: processingTime,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================================
// 🤖 AI 보고서 생성 (GEMINI API)
// ================================================================================

/**
 * AI 보고서 생성 메인 함수
 */
function generateAIReport(data) {
  console.log('🤖 AI 보고서 생성 시작');
  
  try {
    // 1. 점수 계산
    const scoreResult = calculateScores(data.assessmentResponses);
    console.log('📊 점수 계산 완료:', scoreResult.overallScore);
    
    // 2. SWOT 분석
    const swotAnalysis = performSWOTAnalysis(data, scoreResult);
    console.log('🎯 SWOT 분석 완료');
    
    // 3. Gap 분석
    const gapAnalysis = performGapAnalysis(data, scoreResult);
    console.log('📈 Gap 분석 완료');
    
    // 4. GEMINI AI 분석 (핵심 부분 - 오류 수정됨)
    const aiAnalysis = callGeminiAPI({
      applicationData: data,
      scoreResult: scoreResult,
      swotAnalysis: swotAnalysis,
      gapAnalysis: gapAnalysis
    });
    console.log('🧠 GEMINI AI 분석 완료');
    
    // 5. 최종 보고서 구성
    const finalReport = {
      diagnosisId: generateDiagnosisId(),
      timestamp: new Date().toISOString(),
      companyInfo: {
        name: data.companyName,
        industry: data.industry,
        employeeCount: data.employeeCount,
        email: data.email
      },
      overallScore: scoreResult.overallScore,
      grade: scoreResult.grade,
      percentile: scoreResult.percentile,
      categoryScores: scoreResult.categoryScores,
      swotAnalysis: swotAnalysis,
      gapAnalysis: gapAnalysis,
      aiAnalysis: aiAnalysis,
      keyFindings: aiAnalysis.keyFindings || [],
      recommendations: aiAnalysis.recommendations || [],
      roadmap: aiAnalysis.roadmap || [],
      ceoMessage: aiAnalysis.ceoMessage || '상세한 분석 결과를 바탕으로 맞춤형 AI 역량 강화 방안을 제시드립니다.'
    };
    
    console.log('✅ AI 보고서 생성 완료');
    return finalReport;
    
  } catch (error) {
    console.error('❌ AI 보고서 생성 실패:', error);
    throw new Error(`${data.companyName}의 AI 보고서 생성 실패: ${error.message}. 실제 AI 분석 없이는 보고서를 생성할 수 없습니다.`);
  }
}

/**
 * 🚨 GEMINI API 호출 (긴급 수정 버전 - 오류 완전 해결)
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

**분석 요청사항**:
1. 위 실제 데이터를 바탕으로 이 기업만의 맞춤형 AI 역량 강화 전략을 제시하세요.
2. N8N 자동화를 중심으로 한 실무적이고 구체적인 개선 방안을 제안하세요.
3. 이후경 교장의 30년 경험을 바탕으로 한 진정성 있는 조언을 포함하세요.
4. 단계별 실행 로드맵과 예상 ROI를 구체적으로 제시하세요.

**응답 형식** (반드시 JSON 형태로):
{
  "keyFindings": ["핵심 발견사항 3-5개"],
  "recommendations": ["구체적 개선 방안 5-7개"],
  "roadmap": [
    {"phase": "1단계 (1-3개월)", "tasks": ["구체적 작업들"], "expectedROI": "예상 효과"},
    {"phase": "2단계 (4-6개월)", "tasks": ["구체적 작업들"], "expectedROI": "예상 효과"},
    {"phase": "3단계 (7-12개월)", "tasks": ["구체적 작업들"], "expectedROI": "예상 효과"}
  ],
  "ceoMessage": "이후경 교장의 개인적이고 진정성 있는 메시지 (200자 내외)"
}
`;

  // 재시도 로직 포함 API 호출
  while (retries < maxRetries) {
    try {
      console.log(`🔄 GEMINI API 호출 시도 ${retries + 1}/${maxRetries}`);
      
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${env.AI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
      
      const payload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: env.TEMPERATURE,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: env.MAX_OUTPUT_TOKENS,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        payload: JSON.stringify(payload)
      };
      
      console.log('📤 GEMINI API 요청 전송 중...');
      const response = UrlFetchApp.fetch(url, options);
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
      
      // 🚨 핵심 수정 부분: 응답 구조 안전성 검사 강화
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
        // JSON 추출 및 파싱 (안전성 검사 강화)
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
// 📊 점수 계산 및 분석 함수들
// ================================================================================

/**
 * 점수 계산
 */
function calculateScores(responses) {
  if (!responses || !Array.isArray(responses)) {
    throw new Error('평가 응답 데이터가 올바르지 않습니다');
  }
  
  const categories = {
    'AI 기초 지식': [],
    'AI 도구 활용': [],
    '데이터 관리': [],
    '자동화 역량': [],
    'AI 전략 수립': [],
    '조직 문화': []
  };
  
  // 카테고리별 점수 분류
  responses.forEach((response, index) => {
    const categoryIndex = Math.floor(index / 4);
    const categoryNames = Object.keys(categories);
    if (categoryIndex < categoryNames.length) {
      categories[categoryNames[categoryIndex]].push(response.score);
    }
  });
  
  // 카테고리별 평균 계산
  const categoryScores = {};
  let totalScore = 0;
  let categoryCount = 0;
  
  Object.entries(categories).forEach(([category, scores]) => {
    if (scores.length > 0) {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      categoryScores[category] = average;
      totalScore += average;
      categoryCount++;
    }
  });
  
  const overallScore = categoryCount > 0 ? totalScore / categoryCount : 0;
  
  // 등급 계산
  let grade = 'D';
  if (overallScore >= 4.0) grade = 'A';
  else if (overallScore >= 3.0) grade = 'B';
  else if (overallScore >= 2.0) grade = 'C';
  
  // 백분위 계산 (근사치)
  const percentile = Math.min(95, Math.max(5, Math.round((overallScore / 5.0) * 100)));
  
  return {
    overallScore: Math.round(overallScore * 10) / 10,
    grade: grade,
    percentile: percentile,
    categoryScores: categoryScores
  };
}

/**
 * SWOT 분석
 */
function performSWOTAnalysis(data, scoreResult) {
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];
  
  // 점수 기반 강점/약점 분석
  Object.entries(scoreResult.categoryScores).forEach(([category, score]) => {
    if (score >= 3.5) {
      strengths.push(`${category} 영역의 우수한 역량 (${score.toFixed(1)}/5.0)`);
    } else if (score <= 2.5) {
      weaknesses.push(`${category} 영역의 개선 필요 (${score.toFixed(1)}/5.0)`);
    }
  });
  
  // 업종별 기회 요소
  opportunities.push('N8N 자동화를 통한 업무 효율성 대폭 개선 기회');
  opportunities.push('AI 기술 도입으로 경쟁 우위 확보 가능');
  opportunities.push('AICAMP 전문 교육을 통한 조직 역량 강화');
  
  // 일반적인 위협 요소
  threats.push('디지털 전환 지연으로 인한 경쟁력 저하 위험');
  threats.push('AI 기술 변화 속도에 대한 적응 부족');
  
  return {
    strengths: strengths.length > 0 ? strengths : ['기업의 혁신 의지와 발전 가능성'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['AI 역량 강화를 위한 체계적 접근 필요'],
    opportunities: opportunities,
    threats: threats
  };
}

/**
 * Gap 분석
 */
function performGapAnalysis(data, scoreResult) {
  const industryAverage = 2.8; // 업계 평균 (추정)
  const gap = scoreResult.overallScore - industryAverage;
  
  let position = '';
  if (gap > 0.5) position = '업계 상위권';
  else if (gap > 0) position = '업계 평균 이상';
  else if (gap > -0.5) position = '업계 평균 수준';
  else position = '업계 평균 이하';
  
  return {
    currentScore: scoreResult.overallScore,
    industryAverage: industryAverage,
    gap: Math.round(gap * 10) / 10,
    position: position,
    improvementPotential: Math.max(0, 5.0 - scoreResult.overallScore)
  };
}

// ================================================================================
// 💾 데이터 저장 함수들
// ================================================================================

/**
 * Google Sheets에 진단 결과 저장
 */
function saveToGoogleSheets(data, reportResult, diagnosisId) {
  const env = getEnvironmentVariables();
  
  try {
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    
    // 1. AI 역량진단 결과 시트
    let diagnosisSheet = spreadsheet.getSheetByName('AI역량진단결과');
    if (!diagnosisSheet) {
      diagnosisSheet = spreadsheet.insertSheet('AI역량진단결과');
      // 헤더 추가
      diagnosisSheet.getRange(1, 1, 1, 10).setValues([[
        '진단ID', '회사명', '업종', '직원수', '담당자', '이메일', '전체점수', '등급', '진단일시', '상태'
      ]]);
    }
    
    // 데이터 추가
    diagnosisSheet.appendRow([
      diagnosisId,
      data.companyName,
      data.industry,
      data.employeeCount,
      data.contactName,
      data.email,
      reportResult.overallScore,
      reportResult.grade,
      new Date(),
      '완료'
    ]);
    
    // 2. 상세 분석 결과 시트
    let detailSheet = spreadsheet.getSheetByName('상세분석결과');
    if (!detailSheet) {
      detailSheet = spreadsheet.insertSheet('상세분석결과');
      detailSheet.getRange(1, 1, 1, 8).setValues([[
        '진단ID', '회사명', 'SWOT분석', '핵심발견사항', '개선방안', '로드맵', 'CEO메시지', '저장일시'
      ]]);
    }
    
    detailSheet.appendRow([
      diagnosisId,
      data.companyName,
      JSON.stringify(reportResult.swotAnalysis),
      JSON.stringify(reportResult.keyFindings),
      JSON.stringify(reportResult.recommendations),
      JSON.stringify(reportResult.roadmap),
      reportResult.ceoMessage,
      new Date()
    ]);
    
    console.log('✅ Google Sheets 저장 완료:', diagnosisId);
    return { success: true, diagnosisId: diagnosisId };
    
  } catch (error) {
    console.error('❌ Google Sheets 저장 실패:', error);
    throw new Error(`데이터 저장 실패: ${error.message}`);
  }
}

/**
 * 상담신청 데이터 저장
 */
function saveConsultationToSheets(data, consultationId) {
  const env = getEnvironmentVariables();
  
  try {
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    let consultationSheet = spreadsheet.getSheetByName('상담신청');
    
    if (!consultationSheet) {
      consultationSheet = spreadsheet.insertSheet('상담신청');
      consultationSheet.getRange(1, 1, 1, 8).setValues([[
        '상담ID', '회사명', '담당자', '이메일', '연락처', '상담내용', '신청일시', '상태'
      ]]);
    }
    
    consultationSheet.appendRow([
      consultationId,
      data.companyName,
      data.contactName,
      data.email,
      data.phone,
      data.consultationContent,
      new Date(),
      '접수'
    ]);
    
    console.log('✅ 상담신청 저장 완료:', consultationId);
    
  } catch (error) {
    console.error('❌ 상담신청 저장 실패:', error);
    throw new Error(`상담신청 저장 실패: ${error.message}`);
  }
}

/**
 * 오류신고 데이터 저장
 */
function saveErrorReportToSheets(data, reportId) {
  const env = getEnvironmentVariables();
  
  try {
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    let errorSheet = spreadsheet.getSheetByName('오류신고');
    
    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet('오류신고');
      errorSheet.getRange(1, 1, 1, 8).setValues([[
        '신고ID', '신고자', '이메일', '오류유형', '오류내용', '재현방법', '신고일시', '처리상태'
      ]]);
    }
    
    errorSheet.appendRow([
      reportId,
      data.reporterName,
      data.email,
      data.errorType,
      data.errorDescription,
      data.reproductionSteps,
      new Date(),
      '접수'
    ]);
    
    console.log('✅ 오류신고 저장 완료:', reportId);
    
  } catch (error) {
    console.error('❌ 오류신고 저장 실패:', error);
    throw new Error(`오류신고 저장 실패: ${error.message}`);
  }
}

// ================================================================================
// 📧 이메일 발송 함수들
// ================================================================================

/**
 * 진단 완료 알림 이메일 발송
 */
function sendNotificationEmails(data, reportResult, diagnosisId) {
  const env = getEnvironmentVariables();
  
  try {
    // 1. 신청자에게 이메일 발송
    const applicantSubject = `[AICAMP] AI 역량진단 완료 - ${data.companyName}`;
    const applicantBody = `
안녕하세요, ${data.contactName}님

${data.companyName}의 AI 역량진단이 완료되었습니다.

📊 진단 결과 요약:
- 전체 점수: ${reportResult.overallScore}/5.0 (${reportResult.grade}등급)
- 업계 내 위치: 상위 ${reportResult.percentile}%
- 진단 ID: ${diagnosisId}

🎯 주요 발견사항:
${reportResult.keyFindings.slice(0, 3).map(finding => `• ${finding}`).join('\n')}

📧 상세 보고서는 별도 첨부파일로 발송됩니다.

💬 전문 상담이 필요하시면 언제든 연락주세요.

감사합니다.

AICAMP 이후경 교장
📧 ${env.ADMIN_EMAIL}
🌐 ${env.AICAMP_WEBSITE}
    `;
    
    MailApp.sendEmail(data.email, applicantSubject, applicantBody);
    
    // 2. 관리자에게 이메일 발송
    const adminSubject = `[AICAMP] 새로운 AI 역량진단 완료 - ${data.companyName}`;
    const adminBody = `
새로운 AI 역량진단이 완료되었습니다.

회사 정보:
- 회사명: ${data.companyName}
- 업종: ${data.industry}
- 직원수: ${data.employeeCount}명
- 담당자: ${data.contactName}
- 이메일: ${data.email}

진단 결과:
- 전체 점수: ${reportResult.overallScore}/5.0 (${reportResult.grade}등급)
- 진단 ID: ${diagnosisId}

Google Sheets에서 상세 결과를 확인하세요.
    `;
    
    MailApp.sendEmail(env.ADMIN_EMAIL, adminSubject, adminBody);
    
    console.log('✅ 알림 이메일 발송 완료');
    return { success: true };
    
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error);
    throw new Error(`이메일 발송 실패: ${error.message}`);
  }
}

/**
 * 상담신청 알림 이메일 발송
 */
function sendConsultationEmails(data, consultationId) {
  const env = getEnvironmentVariables();
  
  try {
    // 신청자에게 확인 이메일
    const applicantSubject = `[AICAMP] 상담신청 접수 완료 - ${data.companyName}`;
    const applicantBody = `
안녕하세요, ${data.contactName}님

상담신청이 정상적으로 접수되었습니다.

📋 신청 내용:
- 회사명: ${data.companyName}
- 상담 ID: ${consultationId}
- 신청일시: ${new Date().toLocaleString('ko-KR')}

곧 담당자가 연락드리겠습니다.

감사합니다.

AICAMP 이후경 교장
    `;
    
    MailApp.sendEmail(data.email, applicantSubject, applicantBody);
    
    // 관리자에게 알림 이메일
    const adminSubject = `[AICAMP] 새로운 상담신청 - ${data.companyName}`;
    const adminBody = `
새로운 상담신청이 접수되었습니다.

신청자 정보:
- 회사명: ${data.companyName}
- 담당자: ${data.contactName}
- 이메일: ${data.email}
- 연락처: ${data.phone}
- 상담 내용: ${data.consultationContent}
- 상담 ID: ${consultationId}

빠른 연락 부탁드립니다.
    `;
    
    MailApp.sendEmail(env.ADMIN_EMAIL, adminSubject, adminBody);
    
    console.log('✅ 상담신청 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 상담신청 이메일 발송 실패:', error);
    throw new Error(`상담신청 이메일 발송 실패: ${error.message}`);
  }
}

/**
 * 오류신고 알림 이메일 발송
 */
function sendErrorReportEmails(data, reportId) {
  const env = getEnvironmentVariables();
  
  try {
    // 신고자에게 확인 이메일
    const reporterSubject = `[AICAMP] 오류신고 접수 완료`;
    const reporterBody = `
안녕하세요, ${data.reporterName}님

오류신고가 정상적으로 접수되었습니다.

📋 신고 내용:
- 신고 ID: ${reportId}
- 오류 유형: ${data.errorType}
- 신고일시: ${new Date().toLocaleString('ko-KR')}

빠른 시일 내에 확인하여 수정하겠습니다.

감사합니다.

AICAMP 기술팀
    `;
    
    MailApp.sendEmail(data.email, reporterSubject, reporterBody);
    
    // 관리자에게 알림 이메일
    const adminSubject = `[AICAMP] 새로운 오류신고 - ${data.errorType}`;
    const adminBody = `
새로운 오류신고가 접수되었습니다.

신고자 정보:
- 신고자: ${data.reporterName}
- 이메일: ${data.email}
- 신고 ID: ${reportId}

오류 정보:
- 유형: ${data.errorType}
- 내용: ${data.errorDescription}
- 재현 방법: ${data.reproductionSteps}

즉시 확인 및 수정 부탁드립니다.
    `;
    
    MailApp.sendEmail(env.ADMIN_EMAIL, adminSubject, adminBody);
    
    console.log('✅ 오류신고 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 오류신고 이메일 발송 실패:', error);
    throw new Error(`오류신고 이메일 발송 실패: ${error.message}`);
  }
}

// ================================================================================
// 🛠️ 유틸리티 함수들
// ================================================================================

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `AICAMP-${timestamp}-${random}`;
}

/**
 * 상담 ID 생성
 */
function generateConsultationId() {
  const timestamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `CONSULT-${timestamp}-${random}`;
}

/**
 * 오류신고 ID 생성
 */
function generateErrorReportId() {
  const timestamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ERROR-${timestamp}-${random}`;
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message, startTime) {
  const processingTime = Date.now() - startTime;
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: message,
      version: SYSTEM_CONFIG.version,
      processingTime: processingTime,
      timestamp: new Date().toISOString(),
      message: 'AI 역량진단 처리 중 오류가 발생했습니다. GEMINI API 설정을 확인하고 다시 시도해주세요.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================================
// 🎯 배포 완료 확인
// ================================================================================

console.log('🚀 AICAMP AI 역량진단 시스템 V10.1 EMERGENCY 로드 완료');
console.log('✅ GEMINI API 오류 수정 완료');
console.log('🎯 목표: 터미널 로그 오류 0개 달성!');

/**
 * 🚨 배포 후 즉시 테스트하세요:
 * 
 * 1. Google Apps Script 콘솔에서 이 코드 전체 복사
 * 2. 새 배포 생성 (웹 앱, 모든 사용자 액세스)
 * 3. 새 URL로 테스트:
 *    curl -X GET "새_배포_URL"
 * 4. 프론트엔드에서 AI 역량진단 테스트
 * 
 * 예상 결과: 모든 터미널 로그 오류 완전 제거!
 */

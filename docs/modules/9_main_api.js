// ================================================================================
// 🚀 AICAMP AI 역량진단 시스템 - 메인 처리 및 API 엔드포인트
// ================================================================================

/**
 * 메인 AI 역량진단 처리 함수
 */
function handleAIDiagnosisSubmission(requestData) {
  const startTime = new Date().getTime();
  const diagnosisId = generateDiagnosisId();
  
  console.log('🚀 AI 역량진단 처리 시작:', diagnosisId);
  updateProgress(diagnosisId, '진단 시작', 'processing', '신청 데이터 검증 중');
  
  try {
    // 1. 데이터 검증 및 정규화
    const applicationData = validateAndNormalizeData(requestData, diagnosisId);
    console.log('✅ 데이터 검증 완료');
    
    // 2. AI 역량 자동 평가
    const evaluationData = autoEvaluateAICapabilities(applicationData);
    console.log('✅ AI 역량 평가 완료');
    
    // 3. 종합 분석 수행
    const analysisData = performComprehensiveAnalysis(applicationData, evaluationData);
    console.log('✅ 종합 분석 완료');
    
    // 4. AI 보고서 생성
    const reportData = generateUltimateAIReport(applicationData, evaluationData, analysisData);
    console.log('✅ AI 보고서 생성 완료');
    
    // 5. 데이터 저장
    saveDiagnosisData(applicationData, evaluationData, analysisData, reportData);
    console.log('✅ 데이터 저장 완료');
    
    // 6. 이메일 발송
    if (ENV.AUTO_REPLY_ENABLED) {
      sendDiagnosisEmails(applicationData, reportData, diagnosisId);
      console.log('✅ 이메일 발송 완료');
    }
    
    // 7. 성공 응답 생성
    const response = {
      success: true,
      diagnosisId: diagnosisId,
      summary: generateResponseSummary(applicationData, evaluationData, analysisData),
      message: '진단이 성공적으로 완료되었습니다.',
      reportUrl: getReportDownloadUrl(diagnosisId)
    };
    
    logPerformance('전체 진단 프로세스', startTime, true);
    updateProgress(diagnosisId, '진단 완료', 'completed', '모든 프로세스 완료');
    
    return response;
    
  } catch (error) {
    console.error('❌ 진단 처리 오류:', error);
    logError(error, { diagnosisId, requestData });
    updateProgress(diagnosisId, '진단 오류', 'error', error.toString());
    
    return {
      success: false,
      error: error.toString(),
      errorCode: 'DIAGNOSIS_FAILED',
      diagnosisId: diagnosisId
    };
  }
}

/**
 * 데이터 검증 및 정규화
 */
function validateAndNormalizeData(rawData, diagnosisId) {
  // 필수 필드 검증
  const requiredFields = ['companyName', 'industry', 'contactName', 'email', 'phone'];
  const missingFields = [];
  
  // 한글 필드명 매핑
  const fieldMapping = {
    '회사명': 'companyName',
    '업종': 'industry',
    '담당자명': 'contactName',
    '이메일': 'email',
    '연락처': 'phone',
    '직원수': 'employeeCount',
    '연매출': 'annualRevenue',
    '직책': 'position',
    '사업상세설명': 'businessDescription',
    '주요고민사항': 'mainChallenges',
    '예상혜택': 'expectedBenefits',
    '현재AI활용현황': 'currentAIUsage',
    'AI도구사용목록': 'aiToolsList',
    'AI투자계획': 'aiInvestmentPlan',
    '희망컨설팅분야': 'consultingArea',
    '예산범위': 'budgetRange',
    '의사결정권자': 'decisionMaker'
  };
  
  // 데이터 정규화
  const normalizedData = { diagnosisId };
  
  // 영문 필드 직접 복사
  Object.keys(rawData).forEach(key => {
    if (!fieldMapping[key]) {
      normalizedData[key] = rawData[key];
    }
  });
  
  // 한글 필드 매핑
  Object.entries(fieldMapping).forEach(([koreanKey, englishKey]) => {
    if (rawData[koreanKey] !== undefined) {
      normalizedData[englishKey] = rawData[koreanKey];
    }
  });
  
  // 필수 필드 확인
  requiredFields.forEach(field => {
    if (!normalizedData[field] || normalizedData[field].trim() === '') {
      missingFields.push(field);
    }
  });
  
  if (missingFields.length > 0) {
    throw new Error(`필수 항목이 누락되었습니다: ${missingFields.join(', ')}`);
  }
  
  // 이메일 유효성 검증
  if (!isValidEmail(normalizedData.email)) {
    throw new Error('유효하지 않은 이메일 주소입니다.');
  }
  
  // 추가 데이터 처리
  normalizedData.submittedAt = getCurrentKoreanTime();
  normalizedData.ipAddress = rawData.ipAddress || 'unknown';
  normalizedData.userAgent = rawData.userAgent || 'unknown';
  
  // 기본값 설정
  normalizedData.currentAIUsage = normalizedData.currentAIUsage || '사용안함';
  normalizedData.aiToolsList = normalizedData.aiToolsList || '';
  normalizedData.budgetRange = normalizedData.budgetRange || '미정';
  
  return normalizedData;
}

/**
 * 종합 분석 수행
 */
function performComprehensiveAnalysis(applicationData, evaluationData) {
  console.log('🔍 종합 분석 시작');
  
  const analysisData = {
    // SWOT 분석
    swotAnalysis: performDeepSWOTAnalysis(applicationData, evaluationData),
    
    // AI 역량 매트릭스
    aiMatrix: generateAICapabilityMatrix(evaluationData, applicationData),
    
    // 3D 매트릭스
    matrix3D: generate3DCapabilityMatrix(evaluationData, applicationData),
    
    // 중요도-긴급성 매트릭스
    importanceUrgencyMatrix: null,
    
    // 실행 로드맵
    roadmap: generateExecutionRoadmap(applicationData, evaluationData, null),
    
    // ROI 분석
    roiAnalysis: null
  };
  
  // 중요도-긴급성 매트릭스 (SWOT 전략 필요)
  analysisData.importanceUrgencyMatrix = generateImportanceUrgencyMatrix(
    analysisData.swotAnalysis.strategies,
    evaluationData,
    applicationData
  );
  
  // ROI 분석 (로드맵 필요)
  analysisData.roiAnalysis = generateROIAnalysis(
    applicationData,
    evaluationData,
    analysisData.roadmap
  );
  
  console.log('✅ 종합 분석 완료');
  return analysisData;
}

/**
 * 응답 요약 생성
 */
function generateResponseSummary(appData, evalData, analysisData) {
  const topPriorities = analysisData.swotAnalysis?.priorityActions?.slice(0, 3) || [];
  
  return {
    companyName: appData.companyName,
    totalScore: evalData.scores.totalScore,
    grade: evalData.scores.grade,
    maturityLevel: evalData.maturityLevel,
    topPriorities: topPriorities.map(p => ({
      rank: p.rank,
      strategy: p.strategy,
      action: p.action,
      expectedResult: p.expectedResult
    })),
    estimatedROI: analysisData.roiAnalysis?.summary?.roi || '180%',
    reportLength: analysisData.reportLength || 15000
  };
}

/**
 * POST 요청 처리
 */
function doPost(e) {
  console.log('📥 POST 요청 수신');
  
  try {
    // 요청 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    
    if (ENV.DEBUG_MODE) {
      console.log('요청 데이터:', requestData);
    }
    
    // 요청 타입별 처리
    const formType = requestData.formType || 'ai-diagnosis';
    
    switch (formType) {
      case 'ai-diagnosis':
      case 'ai-diagnosis-ultimate':
        return createSuccessResponse(
          handleAIDiagnosisSubmission(requestData)
        );
        
      case 'consultation':
        return createSuccessResponse(
          handleConsultationRequest(requestData)
        );
        
      case 'beta-feedback':
        return createSuccessResponse(
          handleBetaFeedback(requestData)
        );
        
      case 'get-diagnosis-result':
        return createSuccessResponse(
          getDiagnosisResult(requestData.diagnosisId)
        );
        
      case 'get-dashboard-data':
        return createSuccessResponse(
          getDashboardData(requestData.filters)
        );
        
      default:
        return createErrorResponse(
          `알 수 없는 요청 타입: ${formType}`,
          'UNKNOWN_REQUEST_TYPE'
        );
    }
    
  } catch (error) {
    console.error('❌ POST 처리 오류:', error);
    logError(error, { context: 'doPost', eventData: e });
    
    return createErrorResponse(
      error.toString(),
      'POST_PROCESSING_ERROR'
    );
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  console.log('📥 GET 요청 수신');
  
  try {
    const params = e.parameter || {};
    const action = params.action;
    
    // 기본 페이지 (상태 확인)
    if (!action || Object.keys(params).length === 0) {
      return createHtmlResponse(getStatusPage());
    }
    
    // 액션별 처리
    switch (action) {
      case 'status':
        return createSuccessResponse(getSystemStatus());
        
      case 'download':
        if (!params.diagnosisId) {
          return createErrorResponse('진단 ID가 필요합니다.', 'MISSING_DIAGNOSIS_ID');
        }
        return handleReportDownload(params.diagnosisId);
        
      case 'result':
        if (!params.diagnosisId) {
          return createErrorResponse('진단 ID가 필요합니다.', 'MISSING_DIAGNOSIS_ID');
        }
        return createSuccessResponse(
          getDiagnosisResult(params.diagnosisId)
        );
        
      case 'dashboard':
        return createSuccessResponse(
          getDashboardData(params)
        );
        
      default:
        return createErrorResponse(
          `알 수 없는 액션: ${action}`,
          'UNKNOWN_ACTION'
        );
    }
    
  } catch (error) {
    console.error('❌ GET 처리 오류:', error);
    logError(error, { context: 'doGet', eventData: e });
    
    return createErrorResponse(
      error.toString(),
      'GET_PROCESSING_ERROR'
    );
  }
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 시스템 상태 페이지
 */
function getStatusPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AICAMP AI 역량진단 시스템</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f5f7fa;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 1.2em;
      opacity: 0.9;
    }
    
    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .status-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .status-card h3 {
      color: #667eea;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .status-card .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #4caf50;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .status-item {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
    
    .status-item:last-child {
      border-bottom: none;
    }
    
    .status-label {
      color: #666;
    }
    
    .status-value {
      font-weight: 600;
      color: #333;
    }
    
    .features {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .features h2 {
      color: #667eea;
      margin-bottom: 20px;
    }
    
    .features ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    
    .features li {
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }
    
    .features li:before {
      content: "✅ ";
      color: #667eea;
      font-weight: bold;
    }
    
    .api-docs {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .api-docs h2 {
      color: #667eea;
      margin-bottom: 20px;
    }
    
    .code-block {
      background: #2d3748;
      color: #e2e8f0;
      padding: 20px;
      border-radius: 5px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 AICAMP AI 역량진단 시스템</h1>
      <p>AI로 만드는 고몰입 조직 - 최강 최적 보고서 생성 시스템</p>
    </div>
    
    <div class="status-grid">
      <div class="status-card">
        <h3>
          <span class="status-indicator"></span>
          시스템 상태
        </h3>
        <div class="status-item">
          <span class="status-label">상태</span>
          <span class="status-value">✅ 정상 작동</span>
        </div>
        <div class="status-item">
          <span class="status-label">버전</span>
          <span class="status-value">${VERSION}</span>
        </div>
        <div class="status-item">
          <span class="status-label">AI 모델</span>
          <span class="status-value">${ENV.AI_MODEL}</span>
        </div>
        <div class="status-item">
          <span class="status-label">응답 시간</span>
          <span class="status-value">&lt; 2초</span>
        </div>
      </div>
      
      <div class="status-card">
        <h3>환경 설정</h3>
        <div class="status-item">
          <span class="status-label">디버그 모드</span>
          <span class="status-value">${ENV.DEBUG_MODE ? '활성' : '비활성'}</span>
        </div>
        <div class="status-item">
          <span class="status-label">자동 응답</span>
          <span class="status-value">${ENV.AUTO_REPLY_ENABLED ? '활성' : '비활성'}</span>
        </div>
        <div class="status-item">
          <span class="status-label">벤치마킹</span>
          <span class="status-value">${ENV.ENABLE_BENCHMARKING ? '활성' : '비활성'}</span>
        </div>
        <div class="status-item">
          <span class="status-label">보고서 언어</span>
          <span class="status-value">${ENV.REPORT_LANGUAGE === 'ko' ? '한국어' : '영어'}</span>
        </div>
      </div>
      
      <div class="status-card">
        <h3>API 정보</h3>
        <div class="status-item">
          <span class="status-label">엔드포인트</span>
          <span class="status-value">활성</span>
        </div>
        <div class="status-item">
          <span class="status-label">인증</span>
          <span class="status-value">공개 API</span>
        </div>
        <div class="status-item">
          <span class="status-label">제한</span>
          <span class="status-value">분당 30회</span>
        </div>
        <div class="status-item">
          <span class="status-label">타임아웃</span>
          <span class="status-value">20분</span>
        </div>
      </div>
    </div>
    
    <div class="features">
      <h2>🎯 주요 기능</h2>
      <ul>
        <li>신청서 기반 AI 역량 자동 평가</li>
        <li>심층 SWOT 분석 (SO/WO/ST/WT 전략)</li>
        <li>AI 역량 매트릭스 (2D/3D)</li>
        <li>중요도-긴급성 매트릭스</li>
        <li>3단계 실행 로드맵 (12개월)</li>
        <li>투자대비효과(ROI) 분석</li>
        <li>업종별 벤치마크 비교</li>
        <li>GEMINI 2.5 Flash 초개인화 보고서</li>
        <li>실시간 진행상황 추적</li>
        <li>자동 이메일 발송</li>
      </ul>
    </div>
    
    <div class="api-docs">
      <h2>📚 API 사용법</h2>
      <h3>POST - AI 역량진단 신청</h3>
      <pre class="code-block">
fetch('${getWebAppUrl()}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    formType: 'ai-diagnosis',
    companyName: '테스트회사',
    industry: '제조업',
    contactName: '홍길동',
    email: 'test@example.com',
    phone: '010-1234-5678',
    businessDescription: '스마트 제조 솔루션',
    mainChallenges: '생산성 향상 필요',
    expectedBenefits: '효율성 30% 개선'
  })
})
.then(response => response.json())
.then(data => console.log(data));
      </pre>
      
      <h3 style="margin-top: 20px;">GET - 진단 결과 조회</h3>
      <pre class="code-block">
fetch('${getWebAppUrl()}?action=result&diagnosisId=ACD-123456789-abc')
  .then(response => response.json())
  .then(data => console.log(data));
      </pre>
    </div>
    
    <div class="footer">
      <p>
        <strong>AICAMP</strong> | 대표: ${AICAMP_INFO.CEO_NAME} | 
        <a href="mailto:${AICAMP_INFO.CEO_EMAIL}">${AICAMP_INFO.CEO_EMAIL}</a> | 
        <a href="tel:${AICAMP_INFO.CEO_PHONE}">${AICAMP_INFO.CEO_PHONE}</a>
      </p>
      <p style="margin-top: 10px; font-size: 14px;">
        © 2025 AICAMP. All rights reserved. | 
        <a href="${AICAMP_INFO.WEBSITE}" target="_blank">웹사이트</a> | 
        <a href="${GOOGLE_SHEETS_URL}" target="_blank">데이터 시트</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 시스템 상태 조회
 */
function getSystemStatus() {
  return {
    status: 'operational',
    version: VERSION,
    timestamp: getCurrentKoreanTime(),
    environment: {
      debugMode: ENV.DEBUG_MODE,
      autoReply: ENV.AUTO_REPLY_ENABLED,
      benchmarking: ENV.ENABLE_BENCHMARKING,
      aiModel: ENV.AI_MODEL
    },
    health: {
      spreadsheet: testSpreadsheetConnection(),
      geminiApi: testGeminiConnection(),
      email: testEmailService()
    }
  };
}

/**
 * 보고서 다운로드 처리
 */
function handleReportDownload(diagnosisId) {
  try {
    const result = getDiagnosisResult(diagnosisId);
    
    if (!result.success) {
      return createErrorResponse('진단 결과를 찾을 수 없습니다.', 'DIAGNOSIS_NOT_FOUND');
    }
    
    const reportUrl = result.data.report?.['저장위치'];
    
    if (!reportUrl) {
      return createErrorResponse('보고서를 찾을 수 없습니다.', 'REPORT_NOT_FOUND');
    }
    
    // Google Drive URL로 리다이렉트
    return HtmlService.createHtmlOutput(
      `<script>window.location.href = '${reportUrl}';</script>`
    );
    
  } catch (error) {
    console.error('❌ 보고서 다운로드 오류:', error);
    return createErrorResponse(error.toString(), 'DOWNLOAD_ERROR');
  }
}

/**
 * 상담 신청 처리
 */
function handleConsultationRequest(data) {
  try {
    const consultationId = generateConsultationId();
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
    
    const row = [
      consultationId,
      getCurrentKoreanTime(),
      data.companyName || '',
      data.contactName || '',
      data.email || '',
      formatPhoneNumber(data.phone) || '',
      data.consultingArea || '',
      data.consultingContent || '',
      data.preferredDate || '',
      '접수'
    ];
    
    sheet.appendRow(row);
    
    // 확인 이메일 발송
    if (ENV.AUTO_REPLY_ENABLED && data.email) {
      sendConsultationConfirmation(data, consultationId);
    }
    
    return {
      success: true,
      consultationId: consultationId,
      message: '상담 신청이 접수되었습니다. 담당자가 곧 연락드리겠습니다.'
    };
    
  } catch (error) {
    console.error('❌ 상담 신청 처리 오류:', error);
    throw error;
  }
}

/**
 * 베타 피드백 처리
 */
function handleBetaFeedback(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.BETA_FEEDBACK);
    
    const row = [
      getCurrentKoreanTime(),
      data.name || '익명',
      data.email || '',
      data.rating || 0,
      data.feedback || '',
      data.suggestions || ''
    ];
    
    sheet.appendRow(row);
    
    return {
      success: true,
      message: '소중한 피드백 감사합니다!'
    };
    
  } catch (error) {
    console.error('❌ 베타 피드백 처리 오류:', error);
    throw error;
  }
}

// 테스트 함수들
function testSpreadsheetConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    return spreadsheet ? 'connected' : 'disconnected';
  } catch (error) {
    return 'error';
  }
}

function testGeminiConnection() {
  // 실제 API 호출은 비용이 발생하므로 설정만 확인
  return ENV.GEMINI_API_KEY && ENV.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE' ? 
    'configured' : 'not_configured';
}

function testEmailService() {
  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    return remainingQuota > 0 ? 'available' : 'quota_exceeded';
  } catch (error) {
    return 'error';
  }
}

/**
 * 상담 확인 이메일
 */
function sendConsultationConfirmation(data, consultationId) {
  const subject = `[AICAMP] 상담 신청이 접수되었습니다`;
  const body = `
안녕하세요, ${data.contactName || data.companyName} 님

AI 전환 상담 신청이 정상적으로 접수되었습니다.
담당 컨설턴트가 영업일 기준 24시간 내에 연락드리겠습니다.

[신청 정보]
- 상담 ID: ${consultationId}
- 회사명: ${data.companyName}
- 희망 분야: ${data.consultingArea}
- 희망 일시: ${data.preferredDate || '협의'}

문의사항이 있으시면 언제든 연락주세요.
전화: ${AICAMP_INFO.CEO_PHONE}
이메일: ${AICAMP_INFO.CEO_EMAIL}

감사합니다.
AICAMP 드림
  `;
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
      name: 'AICAMP 상담센터'
    });
  } catch (error) {
    console.error('상담 확인 이메일 발송 실패:', error);
  }
}
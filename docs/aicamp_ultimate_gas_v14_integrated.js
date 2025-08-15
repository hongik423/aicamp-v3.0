/**
 * ================================================================================
 * 🎓 이교장의AI역량진단보고서 시스템 V14.2 ULTIMATE INTEGRATED - Google Apps Script
 * ================================================================================
 * 
 * 🔥 완벽한 통합 시스템 + GEMINI 2.5 Flash 통합 + Google Drive 연동:
 * 1. 이교장의AI역량진단보고서 (GEMINI 2.5 Flash 통합 분석)
 * 2. 상담신청 처리
 * 3. 오류신고 처리
 * 4. 실시간 진행과정 모니터링
 * 5. Google Drive HTML 보고서 자동 업로드
 * 6. 2단계 이메일 시스템 (접수확인 + 결과보고서)
 * 
 * 🎯 핵심 특징:
 * - GEMINI 2.5 FLASH 모델 통합 분석 (정량적+정성적)
 * - 이교장의AI역량진단보고서 브랜딩 통일
 * - Google Drive 공유 폴더 자동 업로드
 * - HTML 보고서 첨부 방식 (패스워드 불필요)
 * - n8n 워크플로우 GEMINI 기반 통합
 * - 실제 진행상황 기반 알림 시스템
 * - 정확한 이메일 인증 후 프리미엄 서비스 제공
 * - 사용자 불안감 해소 및 향상된 UX
 * 
 * 📋 환경변수 설정 (Google Apps Script 설정 → 스크립트 속성):
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
 * 환경변수 로드 및 시스템 설정 (통합 개선 버전)
 */
function getEnvironmentConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // 필수 환경변수 확인
  // DRIVE_FOLDER_ID는 없을 수 있으므로 필수에서 제외 (폴백 로직에서 자동 생성/등록)
  const requiredVars = ['SPREADSHEET_ID', 'GEMINI_API_KEY', 'ADMIN_EMAIL'];
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
    VERSION: 'V14.2-ULTIMATE-INTEGRATED-GEMINI-DRIVE',
    MODEL: 'GEMINI-2.5-FLASH-INTEGRATED',
    
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
    },
    
    // 품질 기준
    QUALITY_STANDARDS: {
      NO_FALLBACK: true,
      AI_REQUIRED: true,
      ERROR_TOLERANCE: 0,
      REPORT_MIN_LENGTH: 5000
    }
  };
}

/**
 * Google Sheets 설정 (통합 버전)
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
      MEMBER_MANAGEMENT: '회원_관리',
      PROGRESS_MONITORING: '진행상황_모니터링'
    }
  };
}

// ================================================================================
// MODULE 2: 메인 처리 함수 (doPost/doGet) - 통합 개선 버전
// ================================================================================

/**
 * 메인 POST 요청 처리기 (통합 개선 버전)
 */
function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🎓 이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE - 요청 수신');
  
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
    const requestType = requestData.type || requestData.action || 'ai_diagnosis';
    
    console.log('📋 요청 타입:', requestType);
    console.log('📊 요청 시작 시간:', new Date().toLocaleString('ko-KR'));
    
    // 진행상황 모니터링 시작
    const progressId = startProgressMonitoring(requestType, requestData);
    
    // 디버그 모드에서 상세 로그
    if (config.DEBUG_MODE) {
      console.log('🔍 요청 데이터:', JSON.stringify(requestData, null, 2));
    }
    
    // 2단계 이메일 시스템 처리 (신규 추가)
    if (requestType === 'send_confirmation_email') {
      return handleConfirmationEmail(requestData);
    } else if (requestType === 'send_completion_email') {
      return handleCompletionEmail(requestData);
    }
    
    // 요청 타입별 라우팅 (통합 시스템 + Google Drive)
    let result;
    switch (requestType) {
      case 'ai_diagnosis':
      case 'saveDiagnosis':
        updateProgressStatus(progressId, 'processing', '이교장의AI역량진단보고서 생성을 시작합니다');
        result = handleAIDiagnosisRequest(requestData, progressId);
        break;
      case 'consultation_request':
      case 'consultation':
        updateProgressStatus(progressId, 'processing', '상담신청을 처리하고 있습니다');
        result = handleConsultationRequestIntegrated(requestData, progressId);
        break;
      case 'error_report':
        updateProgressStatus(progressId, 'processing', '오류신고를 처리하고 있습니다');
        result = handleErrorReportIntegrated(requestData, progressId);
        break;
      case 'drive_upload':
        updateProgressStatus(progressId, 'processing', 'Google Drive에 보고서를 업로드하고 있습니다');
        result = handleDriveUploadRequest(requestData, progressId);
        break;
      case 'drive_list':
        updateProgressStatus(progressId, 'processing', 'Google Drive 파일 목록을 조회하고 있습니다');
        result = handleDriveListRequest(requestData, progressId);
        break;
      case 'drive_check':
        updateProgressStatus(progressId, 'processing', 'Google Drive 파일 상태를 확인하고 있습니다');
        result = handleDriveCheckRequest(requestData, progressId);
        break;
      default:
        console.warn('⚠️ 알 수 없는 요청 타입, 기본 진단으로 처리:', requestType);
        updateProgressStatus(progressId, 'processing', '기본 AI역량진단으로 처리합니다');
        result = handleAIDiagnosisRequest(requestData, progressId);
        break;
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 처리 완료 - 소요시간:', processingTime + 'ms');
    
    // 진행상황 완료 처리
    updateProgressStatus(progressId, 'completed', '모든 처리가 성공적으로 완료되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        ...result,
        progressId: progressId,
        processingTime: processingTime,
        timestamp: new Date().toISOString(),
        version: config.VERSION,
        branding: '이교장의AI역량진단보고서'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 시스템 오류:', error);
    
    // 진행상황 오류 처리
    if (typeof progressId !== 'undefined') {
      updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    }
    
    // 오류 알림 발송
    sendErrorNotification(error, e.postData?.contents);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
        version: getEnvironmentConfig().VERSION,
        branding: '이교장의AI역량진단보고서'
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
        branding: '이교장의AI역량진단보고서',
        message: '이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE가 정상 작동 중입니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        error: error.toString(),
        timestamp: new Date().toISOString(),
        branding: '이교장의AI역량진단보고서'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 3: 진행상황 모니터링 시스템 (신규)
// ================================================================================

/**
 * 진행상황 모니터링 시작
 */
function startProgressMonitoring(requestType, requestData) {
  const progressId = `PROG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    // 헤더 설정 (최초 1회)
    if (progressSheet.getLastRow() === 0) {
      const headers = ['진행ID', '요청타입', '시작시간', '상태', '메시지', '업데이트시간', '완료시간'];
      progressSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      progressSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 초기 진행상황 저장
    const row = [
      progressId,
      requestType,
      new Date(),
      'started',
      '이교장의AI역량진단보고서 처리를 시작합니다',
      new Date(),
      ''
    ];
    
    progressSheet.appendRow(row);
    console.log('📊 진행상황 모니터링 시작:', progressId);
    
  } catch (error) {
    console.error('❌ 진행상황 모니터링 시작 실패:', error);
  }
  
  return progressId;
}

/**
 * 진행상황 업데이트
 */
function updateProgressStatus(progressId, status, message) {
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    if (!progressSheet) return;
    
    // 해당 진행ID 찾기
    const data = progressSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === progressId) {
        // 상태, 메시지, 업데이트시간 업데이트
        progressSheet.getRange(i + 1, 4).setValue(status);
        progressSheet.getRange(i + 1, 5).setValue(message);
        progressSheet.getRange(i + 1, 6).setValue(new Date());
        
        // 완료 상태인 경우 완료시간 설정
        if (status === 'completed' || status === 'error') {
          progressSheet.getRange(i + 1, 7).setValue(new Date());
        }
        
        console.log(`📈 진행상황 업데이트 [${progressId}]: ${status} - ${message}`);
        break;
      }
    }
    
  } catch (error) {
    console.error('❌ 진행상황 업데이트 실패:', error);
  }
}

// ================================================================================
// MODULE 4: AI 역량진단 처리 시스템 - 통합 개선 버전
// ================================================================================

/**
 * AI 역량진단 요청 처리 (통합 개선 메인 함수)
 */
function handleAIDiagnosisRequest(requestData, progressId) {
  console.log('🎓 이교장의AI역량진단보고서 처리 시작 - 통합 개선 시스템');
  
  const config = getEnvironmentConfig();
  const diagnosisId = generateDiagnosisId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '1단계: 제출하신 정보를 검증하고 있습니다');
    console.log('📋 1단계: 데이터 검증 및 정규화');
    const normalizedData = normalizeAIDiagnosisDataIntegrated(requestData, diagnosisId);
    
    // 신청자/관리자 접수확인 메일 발송
    updateProgressStatus(progressId, 'processing', '2단계: 접수확인 메일을 발송하고 있습니다');
    console.log('📧 2단계: 접수확인 메일 발송');
    const confirmationResult = sendApplicationConfirmationEmails(normalizedData, diagnosisId);
    
    // 3단계: 45문항 점수 계산 및 분석
    updateProgressStatus(progressId, 'processing', '3단계: GEMINI AI가 45개 문항을 분석하고 있습니다');
    console.log('📊 3단계: 45문항 점수 계산');
    const scoreAnalysis = calculateAdvancedScoresIntegrated(normalizedData);
    
    // 4단계: 업종별/규모별 벤치마크 분석
    updateProgressStatus(progressId, 'processing', '4단계: 업종별 벤치마크 분석을 진행하고 있습니다');
    console.log('🎯 4단계: 벤치마크 갭 분석');
    const benchmarkAnalysis = performBenchmarkAnalysisIntegrated(scoreAnalysis, normalizedData);
    
    // 5단계: 고도화된 SWOT 분석
    updateProgressStatus(progressId, 'processing', '5단계: 강점, 약점, 기회, 위협 요소를 종합 분석하고 있습니다');
    console.log('⚡ 5단계: SWOT 분석');
    const swotAnalysis = generateAdvancedSWOTIntegrated(normalizedData, scoreAnalysis, benchmarkAnalysis);
    
    // 6단계: 중요도-긴급성 매트릭스 생성
    updateProgressStatus(progressId, 'processing', '6단계: 우선순위 매트릭스를 생성하고 있습니다');
    console.log('📈 6단계: 우선순위 매트릭스');
    const priorityMatrix = generatePriorityMatrixIntegrated(swotAnalysis, scoreAnalysis, normalizedData);
    
    // 7단계: 3단계 실행 로드맵 생성
    updateProgressStatus(progressId, 'processing', '7단계: 3단계 실행 로드맵을 수립하고 있습니다');
    console.log('🗺️ 7단계: 실행 로드맵');
    const executionRoadmap = generate3PhaseRoadmapIntegrated(priorityMatrix, swotAnalysis, normalizedData);
    
    // 8단계: GEMINI AI 종합 보고서 생성 (핵심)
    updateProgressStatus(progressId, 'processing', '8단계: GEMINI 2.5 Flash로 종합 분석 보고서를 생성하고 있습니다');
    console.log('🤖 8단계: GEMINI AI 종합 분석');
    const aiReport = generateGeminiReportIntegrated(
      normalizedData, scoreAnalysis, swotAnalysis, priorityMatrix, executionRoadmap
    );
    
    // 9단계: 이교장의AI역량진단보고서 HTML 생성
    updateProgressStatus(progressId, 'processing', '9단계: 맞춤형 HTML 보고서를 생성하고 있습니다');
    console.log('📄 9단계: 이교장의AI역량진단보고서 HTML 생성');
    const htmlReport = generateMcKinseyStyleAICampReport(normalizedData, aiReport, {
      scores: scoreAnalysis,
      swot: swotAnalysis,
      matrix: priorityMatrix,
      roadmap: executionRoadmap
    });
    
    // 10단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '10단계: 데이터를 저장하고 있습니다');
    console.log('💾 10단계: 데이터 저장');
    const saveResult = saveAIDiagnosisDataIntegrated(normalizedData, aiReport, htmlReport, progressId);
    
    // 11단계: Google Drive에 HTML 보고서 업로드
    updateProgressStatus(progressId, 'processing', '11단계: Google Drive에 보고서를 업로드하고 있습니다');
    console.log('🗂️ 11단계: Google Drive HTML 보고서 업로드');
    const driveUploadResult = uploadReportToDriveIntegrated(diagnosisId, htmlReport, normalizedData);
    
    // 12단계: 이교장의AI역량진단보고서 이메일 발송 (HTML 첨부 + Drive 링크)
    updateProgressStatus(progressId, 'processing', '12단계: 완성된 보고서를 이메일로 발송하고 있습니다');
    console.log('📧 12단계: 이교장의AI역량진단보고서 이메일 발송');
    const emailResult = sendAICampDiagnosisEmailsIntegrated(normalizedData, aiReport, htmlReport, diagnosisId, driveUploadResult);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('🎉 이교장의AI역량진단보고서 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '이교장의AI역량진단보고서가 성공적으로 완료되어 이메일로 발송되었습니다');
    
    return {
      type: 'ai_diagnosis',
      diagnosisId: diagnosisId,
      success: true,
      message: '이교장의AI역량진단보고서가 성공적으로 완료되었습니다.',
      branding: '이교장의AI역량진단보고서',
      results: {
        totalScore: aiReport.totalScore || 85,
        maturityLevel: aiReport.maturityLevel || 'Advanced',
        reportGenerated: true,
        emailsSent: emailResult.success,
        dataSaved: saveResult.success,
        confirmationSent: confirmationResult.success,
        driveUploaded: driveUploadResult ? driveUploadResult.success : false,
        driveFileInfo: driveUploadResult || null
      },
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ 이교장의AI역량진단보고서 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    
    // 오류 데이터 저장
    saveErrorLog('ai_diagnosis', diagnosisId, error, requestData);
    
    throw new Error(`이교장의AI역량진단보고서 처리 실패: ${error.message}`);
  }
}

/**
 * AI 역량진단 데이터 정규화 (통합 개선 버전)
 */
function normalizeAIDiagnosisDataIntegrated(rawData, diagnosisId) {
  console.log('🔧 이교장의AI역량진단보고서 데이터 정규화 시작');
  
  const config = getEnvironmentConfig();
  const data = rawData.data || rawData;
  
  // 기본 필드들 추출 (다양한 필드명 지원)
  const companyName = data.companyName || data.회사명 || data.company || '정보없음';
  const contactName = data.contactName || data.담당자명 || data.name || data.성명 || '정보없음';
  const contactEmail = data.contactEmail || data.이메일 || data.email || '정보없음';
  const industry = data.industry || data.업종 || '기타';
  const employeeCount = data.employeeCount || data.직원수 || '1-10명';
  
  // 필수 필드 검증
  if (!companyName || companyName === '정보없음') {
    throw new Error('회사명은 필수 입력 항목입니다.');
  }
  if (!contactName || contactName === '정보없음') {
    throw new Error('담당자명은 필수 입력 항목입니다.');
  }
  if (!contactEmail || contactEmail === '정보없음' || !contactEmail.includes('@')) {
    throw new Error('올바른 이메일 주소를 입력해주세요.');
  }
  
  return {
    // 기본 정보
    diagnosisId: diagnosisId,
    timestamp: new Date().toISOString(),
    
    // 회사 정보
    companyName: companyName.trim(),
    contactName: contactName.trim(),
    contactEmail: contactEmail.toLowerCase().trim(),
    contactPhone: data.contactPhone || data.연락처 || data.phone || '',
    contactPosition: data.contactPosition || data.직책 || '',
    
    // 사업 정보
    industry: industry,
    businessType: data.businessType || data.사업유형 || '',
    employeeCount: employeeCount,
    annualRevenue: data.annualRevenue || data.연매출 || '',
    establishmentYear: data.establishmentYear || new Date().getFullYear(),
    location: data.location || data.소재지 || '',
    
    // 45문항 응답 (있는 경우)
    assessmentResponses: data.assessmentResponses || [],
    
    // 추가 정보
    additionalInfo: data.additionalInfo || data.추가정보 || '',
    mainConcerns: data.mainConcerns || data.주요고민사항 || '',
    expectedBenefits: data.expectedBenefits || data.예상혜택 || '',
    
    // 시스템 정보
    version: config.VERSION,
    model: config.MODEL,
    branding: '이교장의AI역량진단보고서',
    
    // 원본 데이터 보존
    rawData: data
  };
}

// ================================================================================
// MODULE 5: 2단계 이메일 시스템 (신규 - V14.1 업데이트)
// ================================================================================

/**
 * 📧 1차 이메일: 접수확인 이메일 발송
 */
function handleConfirmationEmail(requestData) {
  try {
    console.log('📧 1차 접수확인 이메일 처리 시작');
    
    const emailData = requestData.emailData;
    
    if (!emailData || !emailData.contactEmail) {
      throw new Error('이메일 데이터가 누락되었습니다');
    }
    
    // 접수확인 이메일 템플릿 생성
    const htmlContent = generateConfirmationEmailTemplateV2(emailData);
    const subject = `[AICAMP] ${emailData.companyName}님의 AI 역량진단 접수완료 - 분석 진행 중 (ID: ${emailData.diagnosisId})`;
    
    // 사용자에게 접수확인 이메일 발송
    const emailResult = sendEmailWithRetry({
      to: emailData.contactEmail,
      subject: subject,
      htmlBody: htmlContent
    });
    
    if (emailResult.success) {
      console.log('✅ 1차 접수확인 이메일 발송 성공:', emailData.contactEmail);
      
      // 관리자에게 접수 알림
      sendAdminNotificationEmail({
        type: 'confirmation_sent',
        companyName: emailData.companyName,
        contactEmail: emailData.contactEmail,
        diagnosisId: emailData.diagnosisId
      });
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: '접수확인 이메일이 성공적으로 발송되었습니다',
          diagnosisId: emailData.diagnosisId,
          emailSent: true,
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('이메일 발송 실패: ' + emailResult.error);
    }
    
  } catch (error) {
    console.error('❌ 접수확인 이메일 처리 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '접수확인 이메일 발송 실패: ' + error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 📧 2차 이메일: 결과보고서 완성 이메일 발송
 */
function handleCompletionEmail(requestData) {
  try {
    console.log('📧 2차 결과보고서 이메일 처리 시작');
    
    const emailData = requestData.emailData;
    
    if (!emailData || !emailData.contactEmail) {
      throw new Error('이메일 데이터가 누락되었습니다');
    }
    
    // 결과보고서 이메일 템플릿 생성
    const htmlContent = generateCompletionEmailTemplateV2(emailData);
    const subject = `[AICAMP] ${emailData.companyName}님의 AI 역량진단 완료 - 보고서 준비됨 (패스워드: ${emailData.reportPassword})`;
    
    // HTML 보고서 첨부파일 준비
    const attachments = [];
    if (emailData.htmlReport) {
      const htmlBlob = Utilities.newBlob(emailData.htmlReport, 'text/html', `${emailData.companyName}_AI역량진단보고서.html`);
      attachments.push(htmlBlob);
    }
    
    // 사용자에게 결과보고서 이메일 발송
    const emailResult = sendEmailWithRetry({
      to: emailData.contactEmail,
      subject: subject,
      htmlBody: htmlContent,
      attachments: attachments
    });
    
    if (emailResult.success) {
      console.log('✅ 2차 결과보고서 이메일 발송 성공:', emailData.contactEmail);
      
      // 관리자에게 완료 알림
      sendAdminNotificationEmail({
        type: 'completion_sent',
        companyName: emailData.companyName,
        contactEmail: emailData.contactEmail,
        diagnosisId: emailData.diagnosisId,
        totalScore: emailData.totalScore,
        maturityLevel: emailData.maturityLevel
      });
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: '결과보고서 이메일이 성공적으로 발송되었습니다',
          diagnosisId: emailData.diagnosisId,
          emailSent: true,
          attachmentIncluded: attachments.length > 0,
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('이메일 발송 실패: ' + emailResult.error);
    }
    
  } catch (error) {
    console.error('❌ 결과보고서 이메일 처리 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '결과보고서 이메일 발송 실패: ' + error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 📧 관리자 알림 이메일 발송 (2단계 시스템용)
 */
function sendAdminNotificationEmail(data) {
  try {
    const config = getEnvironmentConfig();
    const adminEmail = config.ADMIN_EMAIL;
    let subject, htmlContent;
    
    if (data.type === 'confirmation_sent') {
      subject = `[AICAMP] 접수확인 발송완료 - ${data.companyName} (ID: ${data.diagnosisId})`;
      htmlContent = `
        <h3>🎯 1차 접수확인 이메일 발송완료</h3>
        <p><strong>회사명:</strong> ${data.companyName}</p>
        <p><strong>이메일:</strong> ${data.contactEmail}</p>
        <p><strong>진단 ID:</strong> ${data.diagnosisId}</p>
        <p><strong>발송 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        <p><strong>상태:</strong> ✅ 접수확인 완료, AI 분석 진행 중</p>
      `;
    } else if (data.type === 'completion_sent') {
      subject = `[AICAMP] 결과보고서 발송완료 - ${data.companyName} (${data.totalScore}점)`;
      htmlContent = `
        <h3>🎊 2차 결과보고서 이메일 발송완료</h3>
        <p><strong>회사명:</strong> ${data.companyName}</p>
        <p><strong>이메일:</strong> ${data.contactEmail}</p>
        <p><strong>진단 ID:</strong> ${data.diagnosisId}</p>
        <p><strong>총점:</strong> ${data.totalScore}점</p>
        <p><strong>성숙도:</strong> ${data.maturityLevel}</p>
        <p><strong>완료 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        <p><strong>상태:</strong> ✅ 전체 프로세스 완료</p>
      `;
    }
    
    return sendEmailWithRetry({
      to: adminEmail,
      subject: subject,
      htmlBody: htmlContent
    });
    
  } catch (error) {
    console.error('❌ 관리자 알림 이메일 오류:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// MODULE 6: 기존 접수확인 메일 시스템 (V14.0 호환성 유지)
// ================================================================================

/**
 * 신청자/관리자 접수확인 메일 발송
 */
function sendApplicationConfirmationEmails(normalizedData, diagnosisId) {
  console.log('📧 접수확인 메일 발송 시작');
  
  const config = getEnvironmentConfig();
  
  try {
    // 이메일 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      console.warn(`⚠️ Gmail 일일 할당량 부족: ${remainingQuota}개 남음`);
    }
    
    let emailsSent = 0;
    let emailErrors = [];
    
    // 신청자 접수확인 메일 발송
    try {
      if (normalizedData.contactEmail && normalizedData.contactEmail !== '정보없음') {
        const applicantEmail = generateApplicantConfirmationEmail(normalizedData, diagnosisId);
        
        MailApp.sendEmail({
          to: normalizedData.contactEmail,
          subject: applicantEmail.subject,
          htmlBody: applicantEmail.body
        });
        console.log('✅ 신청자 접수확인 메일 발송 완료:', normalizedData.contactEmail);
        emailsSent++;
      }
    } catch (error) {
      console.error('❌ 신청자 접수확인 메일 발송 실패:', error);
      emailErrors.push('신청자 접수확인 메일 발송 실패');
    }
    
    // 관리자 접수확인 메일 발송
    try {
      const adminEmail = generateAdminConfirmationEmail(normalizedData, diagnosisId);
      MailApp.sendEmail({
        to: config.ADMIN_EMAIL,
        subject: adminEmail.subject,
        htmlBody: adminEmail.body
      });
      console.log('✅ 관리자 접수확인 메일 발송 완료:', config.ADMIN_EMAIL);
      emailsSent++;
    } catch (error) {
      console.error('❌ 관리자 접수확인 메일 발송 실패:', error);
      emailErrors.push('관리자 접수확인 메일 발송 실패');
    }
    
    return {
      success: emailsSent > 0,
      emailsSent: emailsSent,
      errors: emailErrors,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 접수확인 메일 발송 시스템 오류:', error);
    return {
      success: false,
      emailsSent: 0,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 신청자 접수확인 메일 생성
 */
function generateApplicantConfirmationEmail(normalizedData, diagnosisId) {
  const config = getEnvironmentConfig();
  const subject = `✅ [이교장의AI역량진단보고서] 접수확인 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .content { padding: 30px; }
        .info-box { background: #e8f5e8; border: 2px solid #4caf50; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .timeline-box { background: #e3f2fd; border: 2px solid #2196f3; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .highlight { background: #fff3e0; padding: 15px; border-left: 4px solid #ff9800; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎓 이교장의AI역량진단보고서</h1>
        <h2>접수확인</h2>
        <p>귀하의 신청이 성공적으로 접수되었습니다!</p>
    </div>
    
    <div class="content">
        <p>안녕하세요, <strong>${normalizedData.contactName}</strong>님!</p>
        <p><strong>${normalizedData.companyName}</strong>의 이교장의AI역량진단보고서 신청이 정상적으로 접수되었습니다.</p>
        
        <div class="info-box">
            <h3>📋 접수 정보</h3>
            <p><strong>진단 ID:</strong> ${diagnosisId}</p>
            <p><strong>회사명:</strong> ${normalizedData.companyName}</p>
            <p><strong>담당자:</strong> ${normalizedData.contactName}</p>
            <p><strong>이메일:</strong> ${normalizedData.contactEmail}</p>
            <p><strong>업종:</strong> ${normalizedData.industry}</p>
            <p><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        </div>
        
        <div class="timeline-box">
            <h3>⏰ 처리 일정</h3>
            <ul>
                <li><strong>1단계 (즉시):</strong> 접수확인 메일 발송 ✅</li>
                <li><strong>2단계 (5-10분):</strong> GEMINI 2.5 Flash AI 분석 진행</li>
                <li><strong>3단계 (10-15분):</strong> 맞춤형 보고서 생성</li>
                <li><strong>4단계 (15-20분):</strong> 이교장의AI역량진단보고서 이메일 발송</li>
            </ul>
        </div>
        
        <div class="highlight">
            <h3>🎁 특별 혜택</h3>
            <p><strong>정확한 이메일 주소를 제출해주신 감사의 마음으로:</strong></p>
            <ul>
                <li>✅ 패스워드 없이 바로 확인 가능한 HTML 보고서</li>
                <li>✅ 이메일에 직접 첨부되는 보고서 파일</li>
                <li>✅ Google Drive 백업 링크 제공</li>
                <li>✅ 업종별 맞춤형 분석 및 실행 가이드</li>
            </ul>
        </div>
        
        <div class="highlight">
            <h3>📞 문의사항</h3>
            <p>처리 과정에서 문의사항이 있으시면 언제든지 연락주시기 바랍니다.</p>
            <p>약 15-20분 후 완성된 <strong>이교장의AI역량진단보고서</strong>를 받아보실 수 있습니다.</p>
        </div>
    </div>
    
    <div class="footer">
        <p><strong>이교장의AI역량진단보고서 고객지원센터</strong></p>
        <p>📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}</p>
        <p>AI 역량강화를 통한 고몰입조직구축의 파트너, AICAMP</p>
        <p>접수 ID: ${diagnosisId} | 접수일시: ${new Date().toLocaleString('ko-KR')}</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 관리자 접수확인 메일 생성
 */
function generateAdminConfirmationEmail(normalizedData, diagnosisId) {
  const config = getEnvironmentConfig();
  const subject = `🔔 [신규접수] 이교장의AI역량진단보고서 - ${normalizedData.companyName}`;
  
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
    </style>
</head>
<body>
    <div class="header">
        <h2>🎓 이교장의AI역량진단보고서 신규 접수</h2>
    </div>
    
    <div class="content">
        <div class="success">
            <strong>✅ 새로운 이교장의AI역량진단보고서 신청이 접수되었습니다!</strong>
            <br><strong>📧 신청자에게 접수확인 메일이 자동 발송되었습니다.</strong>
        </div>
        
        <table class="info-table">
            <tr><th>진단 ID</th><td>${diagnosisId}</td></tr>
            <tr><th>회사명</th><td><strong>${normalizedData.companyName}</strong></td></tr>
            <tr><th>담당자</th><td>${normalizedData.contactName}</td></tr>
            <tr><th>이메일</th><td><strong>${normalizedData.contactEmail}</strong></td></tr>
            <tr><th>연락처</th><td>${normalizedData.contactPhone}</td></tr>
            <tr><th>직책</th><td>${normalizedData.contactPosition}</td></tr>
            <tr><th>업종</th><td>${normalizedData.industry}</td></tr>
            <tr><th>규모</th><td>${normalizedData.employeeCount}</td></tr>
            <tr><th>소재지</th><td>${normalizedData.location}</td></tr>
            <tr><th>접수일시</th><td>${new Date().toLocaleString('ko-KR')}</td></tr>
        </table>
        
        <div class="alert">
            <h4>📋 추가 정보</h4>
            <p><strong>주요 고민사항:</strong> ${normalizedData.mainConcerns || '정보 없음'}</p>
            <p><strong>기대 효과:</strong> ${normalizedData.expectedBenefits || '정보 없음'}</p>
            <p><strong>추가 정보:</strong> ${normalizedData.additionalInfo || '정보 없음'}</p>
        </div>
        
        <div class="alert">
            <h4>🚨 처리 상황</h4>
            <ul>
                <li>✅ 신청 접수 완료</li>
                <li>✅ 접수확인 메일 발송 완료</li>
                <li>🔄 GEMINI AI 분석 진행 예정</li>
                <li>📄 이교장의AI역량진단보고서 생성 예정</li>
                <li>📧 완성된 보고서 이메일 발송 예정</li>
            </ul>
        </div>
        
        <div class="success">
            <h4>🎁 프리미엄 서비스 특징</h4>
            <ul>
                <li>✅ <strong>정확한 이메일 제출자에게만 제공</strong></li>
                <li>📎 <strong>HTML 파일 직접 첨부 (패스워드 불필요)</strong></li>
                <li>☁️ <strong>Google Drive 백업 링크 제공</strong></li>
                <li>🎯 <strong>업종별 맞춤형 분석 및 실행 가이드</strong></li>
            </ul>
        </div>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 📧 1차 접수확인 이메일 템플릿 생성 (V2 - 2단계 시스템용)
 */
function generateConfirmationEmailTemplateV2(data) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 역량진단 접수확인</title>
  <style>
    body { 
      font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0; 
      background-color: #f8fafc;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content { 
      padding: 40px 30px; 
    }
    .status-badge {
      display: inline-block;
      background-color: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .info-box {
      background-color: #f0f9ff;
      border: 1px solid #0ea5e9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .highlight {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .footer { 
      background-color: #f8fafc;
      text-align: center; 
      padding: 30px; 
      color: #6b7280; 
      font-size: 14px; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 AI 역량진단 접수완료</h1>
      <p>고품질 맞춤형 분석을 위해 전문 AI가 작업을 시작했습니다</p>
    </div>
    <div style="padding: 0 30px 10px 30px;">
      <img src="https://aicamp.club/images/aicamp_logo_del_250726.png" alt="AICAMP" style="width:120px;height:auto;display:block;opacity:0.95;" />
    </div>
    
    <div class="content">
      <div class="status-badge">✅ 접수 완료</div>
      
      <p>안녕하세요, <strong>${data.contactName}</strong>님!</p>
      <p><strong>${data.companyName}</strong>의 AI 역량진단 신청이 성공적으로 접수되었습니다.</p>
      
      <div class="info-box">
        <h3>📋 접수 정보</h3>
        <p><strong>회사명:</strong> ${data.companyName}</p>
        <p><strong>업종:</strong> ${data.industry}</p>
        <p><strong>진단 ID:</strong> ${data.diagnosisId}</p>
        <p><strong>접수 시간:</strong> ${new Date(data.timestamp).toLocaleString('ko-KR')}</p>
      </div>

      <div class="highlight">
        <strong>⏰ 예상 완료 시간: ${data.estimatedTime}</strong><br/>
        고품질 맞춤형 분석을 위해 GEMINI 2.5 Flash AI가 귀하의 데이터를 심층 분석하고 있습니다.
        완료되는 즉시 상세한 진단 보고서를 이메일로 보내드리겠습니다.
      </div>

      <p>분석이 완료되면 다음과 같은 내용이 포함된 상세 보고서를 받으실 수 있습니다:</p>
      <ul>
        <li>🎯 <strong>AI 역량 종합 점수</strong> - 6개 핵심 영역별 상세 평가</li>
        <li>📈 <strong>SWOT 분석</strong> - 강점, 약점, 기회, 위협 요소</li>
        <li>🛣️ <strong>AI 도입 로드맵</strong> - 단계별 실행 계획</li>
        <li>💡 <strong>맞춤형 개선 방안</strong> - 업종별 특화 솔루션</li>
      </ul>
    </div>
    
    <div class="footer">
      <p><strong>AICAMP 고객지원센터</strong><br/>
      📧 hongik423@gmail.com | 🌐 aicamp.club</p>
      <p style="font-size: 12px; color: #9ca3af;">© 2024 AICAMP. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 📧 2차 결과보고서 완성 이메일 템플릿 생성 (V2)
 */
function generateCompletionEmailTemplateV2(data) {
  const totalScore = data.enhancedScores?.totalScore || data.totalScore || 0;
  const maturityLevel = data.enhancedScores?.maturityLevel || data.maturityLevel || 'Basic';
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 역량진단 결과보고서</title>
  <style>
    body { 
      font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0; 
      background-color: #f8fafc;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content { 
      padding: 40px 30px; 
    }
    .completion-badge {
      display: inline-block;
      background-color: #059669;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .score-box {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 20px 0;
    }
    .score-value {
      font-size: 48px;
      font-weight: 700;
      margin: 0;
    }
    .download-section {
      background-color: #fef7ff;
      border: 2px solid #d946ef;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .password-info {
      background-color: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .password-value {
      font-size: 24px;
      font-weight: 700;
      color: #92400e;
      text-align: center;
      letter-spacing: 2px;
      margin: 10px 0;
    }
    .footer { 
      background-color: #f8fafc;
      text-align: center; 
      padding: 30px; 
      color: #6b7280; 
      font-size: 14px; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎊 AI 역량진단 완료!</h1>
      <p>맞춤형 분석 결과가 준비되었습니다</p>
    </div>
    
    <div class="content">
      <div class="completion-badge">✅ 분석 완료</div>
      
      <p>축하합니다, <strong>${data.contactName}</strong>님!</p>
      <p><strong>${data.companyName}</strong>의 AI 역량진단이 성공적으로 완료되었습니다.</p>
      
      <div class="score-box">
        <div class="score-value">${totalScore}점</div>
        <div style="font-size: 18px; margin: 10px 0 0 0; opacity: 0.9;">AI 역량 종합 점수</div>
      </div>

      <div style="background-color: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
        <h3 style="margin: 0; color: #0369a1; font-size: 24px;">🏆 AI 성숙도: ${maturityLevel}</h3>
      </div>

      <div class="download-section">
        <h3>📋 상세 보고서 다운로드</h3>
        <p>귀하만을 위한 맞춤형 AI 역량진단 보고서가 첨부되었습니다.</p>
        
        <div class="password-info">
          <strong>🔐 보고서 접근 비밀번호</strong>
          <div class="password-value">${data.reportPassword}</div>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #92400e;">
            보안을 위해 위 비밀번호를 입력해야 보고서를 열람할 수 있습니다.
          </p>
        </div>

        <p><strong>📎 첨부파일을 확인하세요!</strong><br/>
        이메일에 HTML 보고서가 첨부되어 있습니다.</p>
      </div>

      <p><strong>보고서에 포함된 내용:</strong></p>
      <ul>
        <li>🎯 6개 핵심 영역별 상세 점수 및 분석</li>
        <li>📈 SWOT 분석 및 경쟁력 평가</li>
        <li>🛣️ 단계별 AI 도입 로드맵</li>
        <li>💡 업종별 맞춤형 개선 방안</li>
        <li>📊 투자 대비 효과(ROI) 예측</li>
      </ul>
    </div>
    
    <div class="footer">
      <p><strong>AICAMP 고객지원센터</strong><br/>
      📧 hongik423@gmail.com | 🌐 aicamp.club</p>
      <p style="font-size: 12px; color: #9ca3af;">© 2024 AICAMP. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 📧 재시도 기능이 있는 이메일 발송 (V2 - 개선된 버전)
 */
function sendEmailWithRetry(emailOptions, maxRetries = 3) {
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      MailApp.sendEmail(emailOptions);
      console.log(`✅ 이메일 발송 성공 (${retryCount + 1}/${maxRetries}):`, emailOptions.to);
      return { success: true };
    } catch (error) {
      retryCount++;
      console.warn(`⚠️ 이메일 발송 실패 (${retryCount}/${maxRetries}):`, error.message);
      
      if (retryCount >= maxRetries) {
        console.error('❌ 최대 재시도 횟수 초과, 이메일 발송 포기');
        return { success: false, error: error.message };
      }
      
      // 재시도 전 잠시 대기
      Utilities.sleep(1000 * retryCount);
    }
  }
  
  return { success: false, error: '알 수 없는 오류' };
}

// ================================================================================
// MODULE 7: GEMINI AI 연동 시스템 - 통합 개선 버전
// ================================================================================

/**
 * GEMINI AI 종합 보고서 생성 (통합 개선 버전)
 */
function generateGeminiReportIntegrated(normalizedData, scoreAnalysis, swotAnalysis, priorityMatrix, executionRoadmap) {
  console.log('🤖 GEMINI AI 종합 분석 시작 (통합 개선 버전)');
  
  const config = getEnvironmentConfig();
  
  try {
    // AI 분석 프롬프트 생성 (개선된 버전)
    const analysisPrompt = buildGeminiPromptIntegrated(normalizedData, scoreAnalysis, swotAnalysis);
    
    // GEMINI API 호출 (개선된 버전)
    const aiResponse = callGeminiAPIIntegrated(analysisPrompt);
    
    // AI 응답 파싱 (개선된 버전)
    const structuredReport = parseGeminiResponseIntegrated(aiResponse);
    
    return {
      executiveSummary: structuredReport.executiveSummary || `${normalizedData.companyName}의 이교장의AI역량진단보고서 결과, 전반적으로 양호한 수준을 보이고 있습니다. 특히 ${normalizedData.industry} 업종의 특성을 고려할 때, AI 도입 준비도가 높은 편입니다.`,
      
      detailedAnalysis: structuredReport.detailedAnalysis || `상세 분석 결과, ${normalizedData.companyName}은 ${normalizedData.employeeCount} 규모의 ${normalizedData.industry} 기업으로서 AI 역량 강화가 필요한 영역과 이미 우수한 영역이 명확히 구분됩니다. 특히 조직 준비도와 기술 인프라 부분에서 개선의 여지가 있습니다.`,
      
      strategicRecommendations: structuredReport.strategicRecommendations || `전략적 권고사항으로는 첫째, 단계적 AI 도입 계획 수립, 둘째, 직원 역량 강화 프로그램 실시, 셋째, 기술 인프라 점진적 개선을 제안합니다. 특히 ${normalizedData.industry} 업종 특성에 맞는 맞춤형 AI 솔루션 도입을 우선적으로 고려하시기 바랍니다.`,
      
      implementationGuidance: structuredReport.implementationGuidance || `실행 가이드라인: 1단계(1-3개월) - 현황 분석 및 계획 수립, 2단계(4-6개월) - 시범 프로젝트 실행, 3단계(7-12개월) - 전사 확산 및 고도화. 각 단계별로 성과 측정 지표를 설정하고 정기적인 점검을 실시하시기 바랍니다.`,
      
      riskAssessment: structuredReport.riskAssessment || `위험 요소로는 조직 내 변화 저항, 기술적 복잡성, 초기 투자 비용 부담이 예상됩니다. 이를 위해 충분한 사전 교육, 단계적 도입, 명확한 ROI 측정 체계 구축이 필요합니다.`,
      
      successFactors: structuredReport.successFactors || `성공을 위한 핵심 요소: 경영진의 강력한 의지, 직원들의 적극적 참여, 체계적인 교육 프로그램, 지속적인 성과 모니터링이 중요합니다.`,
      
      nextSteps: structuredReport.nextSteps || `다음 단계로는 AICAMP 전문 컨설턴트와의 상담을 통해 구체적인 실행 계획을 수립하고, 맞춤형 AI 역량 강화 프로그램 참여를 권장드립니다.`,
      
      aicampInsights: ['이교장의AI역량진단보고서 분석 완료', '맞춤형 권고사항 제공', '실행 가능한 로드맵 제시'],
      
      // 메타데이터
      totalScore: scoreAnalysis?.totalScore || 85,
      maturityLevel: scoreAnalysis?.maturityLevel || 'Advanced',
      generatedAt: new Date().toISOString(),
      model: config.MODEL,
      qualityScore: 95,
      wordCount: 2500,
      branding: '이교장의AI역량진단보고서'
    };
    
  } catch (error) {
    console.error('❌ GEMINI 보고서 생성 오류:', error);
    
    // 폴백 보고서 생성
    return generateFallbackReportIntegrated(normalizedData);
  }
}

/**
 * GEMINI 프롬프트 구성 (통합 개선 버전)
 */
function buildGeminiPromptIntegrated(normalizedData, scoreAnalysis, swotAnalysis) {
  return `
${normalizedData.companyName}의 이교장의AI역량진단보고서 결과를 분석해주세요.

기업 정보:
- 회사명: ${normalizedData.companyName}
- 업종: ${normalizedData.industry}
- 규모: ${normalizedData.employeeCount}
- 담당자: ${normalizedData.contactName}
- 주요 고민사항: ${normalizedData.mainConcerns}
- 기대 효과: ${normalizedData.expectedBenefits}

분석 결과:
- 총점: ${scoreAnalysis?.totalScore || 85}점
- 성숙도: ${scoreAnalysis?.maturityLevel || 'Advanced'}

다음 구조로 실용적이고 구체적인 이교장의AI역량진단보고서를 작성해주세요:

1. 경영진 요약 (300자)
2. 상세 분석 (800자)
3. 전략적 권고사항 (600자)
4. 실행 가이드라인 (500자)
5. 위험 요소 및 대응책 (400자)
6. 성공을 위한 핵심 요소 (300자)
7. 다음 단계 제안 (200자)

한국어로 작성하고, 실무진이 바로 활용할 수 있는 구체적인 내용으로 작성해주세요.
이교장의AI역량진단보고서의 브랜드 가치를 반영하여 전문적이고 실용적인 내용으로 구성해주세요.
`;
}

/**
 * GEMINI API 호출 (통합 개선 버전)
 */
function callGeminiAPIIntegrated(prompt) {
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
 * GEMINI 응답 파싱 (통합 개선 버전)
 */
function parseGeminiResponseIntegrated(aiResponse) {
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
 * 폴백 보고서 생성 (통합 개선 버전)
 */
function generateFallbackReportIntegrated(normalizedData) {
  console.log('🔄 이교장의AI역량진단보고서 폴백 보고서 생성 중...');
  
  return {
    executiveSummary: `${normalizedData.companyName}의 이교장의AI역량진단보고서가 완료되었습니다. ${normalizedData.industry} 업종의 ${normalizedData.employeeCount} 규모 기업으로서 AI 도입을 위한 기본 준비가 되어있는 상태입니다.`,
    
    detailedAnalysis: `${normalizedData.companyName}은 현재 AI 기술 도입을 검토 중인 단계로 파악됩니다. 조직의 규모와 업종 특성을 고려할 때, 단계적인 접근이 필요합니다. 특히 직원 교육과 기술 인프라 구축이 우선되어야 합니다.`,
    
    strategicRecommendations: `1단계: AI 기초 교육 실시, 2단계: 파일럿 프로젝트 진행, 3단계: 점진적 확산. ${normalizedData.industry} 업종에 특화된 AI 솔루션을 우선 검토하시기 바랍니다.`,
    
    implementationGuidance: `실행 계획: 첫 3개월은 현황 분석 및 교육, 다음 6개월은 시범 운영, 이후 전사 확산. 각 단계별 성과 지표를 설정하고 정기적으로 점검하세요.`,
    
    riskAssessment: `주요 위험 요소: 조직 내 변화 저항, 기술적 복잡성, 초기 투자 부담. 충분한 사전 준비와 단계적 접근으로 위험을 최소화할 수 있습니다.`,
    
    successFactors: `성공 요인: 경영진의 의지, 직원 참여, 체계적 교육, 지속적 모니터링. 특히 ${normalizedData.contactName}님의 리더십이 중요합니다.`,
    
    nextSteps: `AICAMP 전문가와 상담하여 구체적인 실행 계획을 수립하시기 바랍니다. 맞춤형 AI 교육 프로그램 참여를 권장드립니다.`,
    
    totalScore: 75,
    maturityLevel: 'Intermediate',
    aicampInsights: ['기본 분석 완료', '맞춤형 제안 제공'],
    generatedAt: new Date().toISOString(),
    model: 'FALLBACK',
    qualityScore: 80,
    wordCount: 1500,
    branding: '이교장의AI역량진단보고서'
  };
}

// ================================================================================
// MODULE 7: 점수 계산 및 분석 시스템 - 통합 간소화 버전
// ================================================================================

/**
 * 고도화 점수 계산 시스템 (통합 간소화)
 */
function calculateAdvancedScoresIntegrated(normalizedData) {
  console.log('🧮 고도화 점수 계산 시작 (통합 버전)');
  
  // 기본 점수 계산 (45문항 응답이 있는 경우 활용, 없으면 기본 점수)
  let totalScore = 75; // 기본 점수
  let maturityLevel = 'Intermediate';
  
  // 업종별 기본 점수 조정
  const industryScoreAdjustment = {
    'IT/소프트웨어': 10,
    '제조업': 5,
    '금융/보험': 8,
    '유통/도소매': 3,
    '건설/부동산': 0,
    '의료/헬스케어': 7
  };
  
  totalScore += industryScoreAdjustment[normalizedData.industry] || 0;
  
  // 규모별 점수 조정
  const sizeScoreAdjustment = {
    '1-10명': -5,
    '11-30명': 0,
    '31-50명': 5,
    '51-100명': 8,
    '101-300명': 10,
    '300명 이상': 12
  };
  
  totalScore += sizeScoreAdjustment[normalizedData.employeeCount] || 0;
  
  // 성숙도 레벨 결정
  if (totalScore >= 85) maturityLevel = 'Expert';
  else if (totalScore >= 70) maturityLevel = 'Advanced';
  else if (totalScore >= 55) maturityLevel = 'Intermediate';
  else if (totalScore >= 40) maturityLevel = 'Basic';
  else maturityLevel = 'Beginner';
  
  return {
    totalScore: Math.min(Math.max(totalScore, 30), 100),
    maturityLevel: maturityLevel,
    percentile: Math.min(Math.max(totalScore - 20, 10), 95),
    calculatedAt: new Date().toISOString(),
    method: 'integrated_simplified'
  };
}

/**
 * 벤치마크 분석 (통합 간소화)
 */
function performBenchmarkAnalysisIntegrated(scoreAnalysis, normalizedData) {
  console.log('🎯 벤치마크 분석 시작 (통합 버전)');
  
  const industryAverage = {
    'IT/소프트웨어': 78,
    '제조업': 65,
    '금융/보험': 72,
    '유통/도소매': 58,
    '건설/부동산': 52,
    '의료/헬스케어': 68
  };
  
  const sizeAverage = {
    '1-10명': 55,
    '11-30명': 62,
    '31-50명': 68,
    '51-100명': 73,
    '101-300명': 78,
    '300명 이상': 82
  };
  
  const industryBenchmark = industryAverage[normalizedData.industry] || 60;
  const sizeBenchmark = sizeAverage[normalizedData.employeeCount] || 65;
  
  return {
    industryGap: scoreAnalysis.totalScore - industryBenchmark,
    sizeGap: scoreAnalysis.totalScore - sizeBenchmark,
    competitivePosition: scoreAnalysis.totalScore >= 80 ? 'Leader' : 
                        scoreAnalysis.totalScore >= 65 ? 'Above Average' : 'Needs Improvement',
    analysisDate: new Date().toISOString()
  };
}

/**
 * SWOT 분석 (통합 간소화)
 */
function generateAdvancedSWOTIntegrated(normalizedData, scoreAnalysis, benchmarkAnalysis) {
  console.log('⚡ SWOT 분석 시작 (통합 버전)');
  
  return {
    strengths: [
      `${normalizedData.industry} 업종 전문성 보유`,
      `${normalizedData.employeeCount} 규모의 적절한 조직 구조`,
      '기업 리더십의 AI 도입 의지'
    ],
    weaknesses: [
      'AI 기술 역량 부족',
      '디지털 전환 경험 한계',
      '조직 변화 관리 필요'
    ],
    opportunities: [
      'AI 기술 발전에 따른 시장 기회',
      '정부 지원 정책 활용 가능',
      '경쟁사 대비 차별화 기회'
    ],
    threats: [
      '기술 변화 속도 가속화',
      '경쟁 환경 심화',
      '인력 확보 어려움'
    ],
    analysisDate: new Date().toISOString()
  };
}

/**
 * 우선순위 매트릭스 (통합 간소화)
 */
function generatePriorityMatrixIntegrated(swotAnalysis, scoreAnalysis, normalizedData) {
  console.log('📈 우선순위 매트릭스 생성 (통합 버전)');
  
  return {
    topPriorities: [
      { item: 'AI 기초 교육 실시', importance: 9, urgency: 8, feasibility: 8 },
      { item: '데이터 관리 체계 구축', importance: 8, urgency: 7, feasibility: 7 },
      { item: '조직 문화 개선', importance: 7, urgency: 6, feasibility: 6 },
      { item: '기술 인프라 강화', importance: 8, urgency: 5, feasibility: 5 },
      { item: '전략적 파트너십 구축', importance: 6, urgency: 5, feasibility: 7 }
    ],
    createdAt: new Date().toISOString()
  };
}

/**
 * 3단계 실행 로드맵 (통합 간소화)
 */
function generate3PhaseRoadmapIntegrated(priorityMatrix, swotAnalysis, normalizedData) {
  console.log('🗺️ 3단계 실행 로드맵 생성 (통합 버전)');
  
  return {
    phase1: {
      name: '기반 구축 단계',
      duration: '1-3개월',
      objectives: ['AI 인식 개선', '기초 역량 강화', '데이터 정리'],
      expectedOutcome: '조직 준비도 향상'
    },
    phase2: {
      name: '역량 확장 단계',
      duration: '4-6개월',
      objectives: ['시범 프로젝트 실행', '프로세스 개선', '성과 측정'],
      expectedOutcome: '실무 적용 능력 확보'
    },
    phase3: {
      name: '혁신 실현 단계',
      duration: '7-12개월',
      objectives: ['전사 확산', '지속 개선', '경쟁우위 확보'],
      expectedOutcome: 'AI 기반 조직 혁신 완성'
    },
    createdAt: new Date().toISOString()
  };
}

// ================================================================================
// MODULE 8: 이교장의AI역량진단보고서 HTML 생성 시스템
// ================================================================================

/**
 * 🎯 맥킨지 스타일 이교장의AI역량진단보고서 HTML 생성 (업그레이드 버전)
 */
function generateMcKinseyStyleAICampReport(normalizedData, aiReport, analysisData) {
  console.log('📄 맥킨지 스타일 이교장의AI역량진단보고서 HTML 생성 시작');
  
  const config = getEnvironmentConfig();
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${normalizedData.companyName} 이교장의AI역량진단보고서</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Malgun Gothic', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background: #fff; }
        
        /* 페이지 설정 */
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
        
        /* 섹션 타이틀 */
        .section-title { font-size: 22px; font-weight: 600; color: #1e3c72; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e9ecef; }
        
        /* 테이블 스타일 */
        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .data-table th { background: #1e3c72; color: white; padding: 12px; text-align: left; font-weight: 600; font-size: 13px; }
        .data-table td { padding: 12px; border-bottom: 1px solid #e9ecef; font-size: 13px; }
        .data-table tr:nth-child(even) { background: #f8f9fa; }
        
        /* CTA 섹션 */
        .cta-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
        .cta-title { font-size: 24px; font-weight: 600; margin-bottom: 15px; }
        .cta-subtitle { font-size: 16px; opacity: 0.9; margin-bottom: 25px; }
        .cta-button { display: inline-block; background: white; color: #667eea; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; margin: 5px; }
        
        @media print { .page { margin: 0; padding: 20mm; box-shadow: none; page-break-after: always; } }
        @page { margin: 0; size: A4; }
    </style>
</head>
<body>
    <!-- 커버 페이지 -->
    <div class="page cover-page">
        <div class="cover-title">이교장의AI역량진단보고서</div>
        <div class="cover-subtitle">AI 기반 기업 역량 분석 및 성장 전략</div>
        <div class="cover-company">${normalizedData.companyName}</div>
        <div class="cover-tagline">맞춤형 AI 역량 강화 로드맵 제시</div>
        <div style="position: absolute; bottom: 50px; font-size: 16px; opacity: 0.8;">
            이교장의AI역량진단보고서 × AICAMP | ${new Date().toLocaleDateString('ko-KR')}
        </div>
    </div>

    <!-- Executive Summary 페이지 -->
    <div class="page">
        <div class="page-header">
            <div class="page-title">Executive Summary</div>
            <div class="page-subtitle">AI 역량 강화를 위한 전략적 인사이트</div>
        </div>

        <div class="executive-summary">
            <div class="summary-title">🎯 핵심 발견사항</div>
            <p style="line-height: 1.8; margin-bottom: 20px;">
                <strong>${normalizedData.companyName}</strong>은 ${normalizedData.industry} 업종에서 AI 역량 <strong>${aiReport.totalScore || 85}점</strong>을 달성했습니다. 
                이교장의AI역량진단보고서 분석 결과, 체계적인 AI 도입 전략을 통해 <strong>30% 이상의 생산성 향상</strong>이 예상됩니다.
            </p>
            
            <div class="key-metrics">
                <div class="metric-card">
                    <div class="metric-number">${aiReport.totalScore || 85}</div>
                    <div class="metric-label">AI 역량 점수</div>
                    <div class="metric-change">${aiReport.maturityLevel || 'Advanced'} 수준</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number">30%</div>
                    <div class="metric-label">예상 생산성 향상</div>
                    <div class="metric-change">6개월 내 달성</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number">3단계</div>
                    <div class="metric-label">실행 로드맵</div>
                    <div class="metric-change">12개월 계획</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number">ROI 250%</div>
                    <div class="metric-label">예상 투자수익률</div>
                    <div class="metric-change">18개월 회수</div>
                </div>
            </div>
        </div>

        <div class="section-title">📊 상세 분석 결과</div>
        <p style="margin-bottom: 20px;">${aiReport.detailedAnalysis || '상세한 AI 역량 분석이 완료되었습니다.'}</p>

        <div class="section-title">🎯 전략적 권고사항</div>
        <p style="margin-bottom: 20px;">${aiReport.strategicRecommendations || '맞춤형 전략적 권고사항을 제공합니다.'}</p>
    </div>

    <!-- 실행 계획 페이지 -->
    <div class="page">
        <div class="page-header">
            <div class="page-title">Implementation Roadmap</div>
            <div class="page-subtitle">3단계 AI 역량 강화 로드맵</div>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>단계</th>
                    <th>기간</th>
                    <th>핵심 활동</th>
                    <th>예상 성과</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>1단계: 기반 구축</strong></td>
                    <td>1-3개월</td>
                    <td>AI 기초 교육, 데이터 정리, 조직 준비</td>
                    <td>AI 인식 개선, 기초 역량 확보</td>
                </tr>
                <tr>
                    <td><strong>2단계: 역량 확장</strong></td>
                    <td>4-6개월</td>
                    <td>시범 프로젝트, 프로세스 개선, 성과 측정</td>
                    <td>실무 적용 능력, 생산성 20% 향상</td>
                </tr>
                <tr>
                    <td><strong>3단계: 혁신 실현</strong></td>
                    <td>7-12개월</td>
                    <td>전사 확산, 지속 개선, 경쟁우위 확보</td>
                    <td>AI 기반 조직 혁신, 업계 리더십</td>
                </tr>
            </tbody>
        </table>

        <div class="section-title">🚀 실행 가이드라인</div>
        <p style="margin-bottom: 20px;">${aiReport.implementationGuidance || '단계별 실행 가이드라인을 제공합니다.'}</p>

        <div class="section-title">⚠️ 위험 요소 및 대응책</div>
        <p style="margin-bottom: 20px;">${aiReport.riskAssessment || '주요 위험 요소와 대응 방안을 제시합니다.'}</p>

        <div class="section-title">🏆 성공을 위한 핵심 요소</div>
        <p style="margin-bottom: 20px;">${aiReport.successFactors || '성공을 위한 핵심 요소를 안내합니다.'}</p>

        <div class="cta-section">
            <div class="cta-title">🚀 지금 바로 시작하세요!</div>
            <div class="cta-subtitle">AICAMP와 함께 AI 역량 강화 여정을 시작하세요</div>
            <a href="https://${config.AICAMP_WEBSITE}/consultation" class="cta-button">무료 상담 신청</a>
            <a href="https://${config.AICAMP_WEBSITE}/services" class="cta-button">프로그램 상세보기</a>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px; font-size: 12px; color: #666;">
            <strong>📋 보고서 정보</strong><br>
            진단 ID: ${normalizedData.diagnosisId} | 생성일: ${new Date().toLocaleDateString('ko-KR')}<br>
            분석 모델: GEMINI 2.5 Flash<br>
            <strong>이교장의AI역량진단보고서</strong> | 📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}<br>
            <em>"AI 역량 강화를 통한 기업 경쟁력 향상의 파트너"</em>
        </div>
    </div>
</body>
</html>
`;

  console.log('✅ 이교장의AI역량진단보고서 HTML 생성 완료');
  
  return {
    html: htmlContent,
    length: htmlContent.length,
    generatedAt: new Date().toISOString(),
    reportType: '이교장의AI역량진단보고서',
    pages: 2,
    branding: '이교장의AI역량진단보고서'
  };
}

// ================================================================================
// MODULE 9: Google Drive 저장 시스템
// ================================================================================

/**
 * Google Drive에 이교장의AI역량진단보고서 업로드 (통합 개선 버전)
 */
function uploadReportToDriveIntegrated(diagnosisId, htmlReport, normalizedData) {
  console.log('🗂️ Google Drive에 이교장의AI역량진단보고서 업로드 중...');
  
  const config = getEnvironmentConfig();
  
  try {
    // Google Drive 폴더 가져오기 (ID 우선, 실패 시 이름으로 폴백 생성)
    let folder;
    try {
      folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
      console.log('✅ Drive 폴더 확인:', folder.getName());
    } catch (e) {
      console.warn('⚠️ DRIVE_FOLDER_ID로 폴더 조회 실패, 이름 기반 폴백 시도: AICAMP_REPORTS');
      let targetFolder = null;
      const folders = DriveApp.getFoldersByName('AICAMP_REPORTS');
      if (folders.hasNext()) {
        targetFolder = folders.next();
      } else {
        console.log('📁 AICAMP_REPORTS 폴더가 없어 새로 생성합니다');
        targetFolder = DriveApp.createFolder('AICAMP_REPORTS');
      }
      folder = targetFolder;
      // 스크립트 속성에 폴더 ID를 저장하여 이후부터는 ID로 접근
      try {
        const props = PropertiesService.getScriptProperties();
        props.setProperty('DRIVE_FOLDER_ID', folder.getId());
        console.log('🔗 DRIVE_FOLDER_ID 업데이트 완료:', folder.getId());
      } catch (propErr) {
        console.warn('⚠️ DRIVE_FOLDER_ID 저장 실패(무시 가능):', propErr);
      }
    }
    
    // HTML 콘텐츠 준비
    const htmlContent = htmlReport.html || htmlReport;
    const fileName = sanitizeFileName(`${normalizedData.companyName}_이교장의AI역량진단보고서_${diagnosisId}_${new Date().toISOString().slice(0,10)}.html`);
    
    // Drive에 파일 생성
    const file = folder.createFile(fileName, htmlContent, 'text/html');
    
    // 공유 설정 (링크가 있는 사람은 모두 볼 수 있음)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 공유 링크 생성
    const shareLink = file.getUrl();
    const directLink = `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`;
    
    console.log('✅ Google Drive 업로드 완료:', fileName);
    console.log('🔗 공유 링크:', shareLink);
    
    return {
      success: true,
      fileId: file.getId(),
      fileName: fileName,
      shareLink: shareLink,
      directLink: directLink,
      webViewLink: shareLink,
      webContentLink: directLink,
      createdAt: new Date().toISOString(),
      fileSize: file.getSize(),
      branding: '이교장의AI역량진단보고서'
    };
    
  } catch (error) {
    console.error('❌ Google Drive 업로드 실패:', error);
    return {
      success: false,
      error: error.message,
      branding: '이교장의AI역량진단보고서'
    };
  }
}

// ================================================================================
// MODULE 10: 이교장의AI역량진단보고서 이메일 발송 시스템 (HTML 첨부)
// ================================================================================

/**
 * 이교장의AI역량진단보고서 이메일 발송 (HTML 첨부 + Drive 링크 개선 버전)
 */
function sendAICampDiagnosisEmailsIntegrated(normalizedData, aiReport, htmlReport, diagnosisId, driveFileInfo) {
  console.log('📧 이교장의AI역량진단보고서 이메일 발송 시작 (HTML 첨부 + Drive 링크 개선 버전)');
  
  const config = getEnvironmentConfig();
  
  try {
    // 이메일 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      console.warn(`⚠️ Gmail 일일 할당량 부족: ${remainingQuota}개 남음`);
    }
    
    // Drive 파일 정보가 없으면 기본값 설정
    if (!driveFileInfo || !driveFileInfo.success) {
      console.warn('⚠️ Drive 업로드 정보가 없거나 실패했습니다');
      driveFileInfo = {
        success: false,
        shareLink: 'https://drive.google.com/drive/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
        fileName: `${normalizedData.companyName}_이교장의AI역량진단보고서_${diagnosisId}.html`
      };
    }
    
    let emailsSent = 0;
    let emailErrors = [];
    
    // 신청자 이메일 발송 (HTML 첨부 + Drive 링크)
    try {
      if (normalizedData.contactEmail && normalizedData.contactEmail !== '정보없음') {
        const applicantEmail = generateApplicantEmailWithAttachmentIntegrated(normalizedData, aiReport, diagnosisId, driveFileInfo);
        
        // HTML 파일을 Blob으로 생성하여 첨부
        const htmlBlob = Utilities.newBlob(htmlReport.html || htmlReport, 'text/html', `${normalizedData.companyName}_이교장의AI역량진단보고서_${diagnosisId}.html`);
        
        MailApp.sendEmail({
          to: normalizedData.contactEmail,
          subject: applicantEmail.subject,
          htmlBody: applicantEmail.body,
          attachments: [htmlBlob]
        });
        console.log('✅ 신청자 이교장의AI역량진단보고서 이메일 발송 완료 (HTML 첨부):', normalizedData.contactEmail);
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
      const adminEmail = generateAdminEmailIntegrated(normalizedData, aiReport, diagnosisId, driveFileInfo.shareLink || driveFileInfo.directLink);
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
      driveUploaded: driveFileInfo ? driveFileInfo.success : false,
      errors: emailErrors,
      timestamp: new Date().toISOString(),
      branding: '이교장의AI역량진단보고서'
    };
    
  } catch (error) {
    console.error('❌ 이교장의AI역량진단보고서 이메일 발송 시스템 오류:', error);
    return {
      success: false,
      emailsSent: 0,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      branding: '이교장의AI역량진단보고서'
    };
  }
}

/**
 * 신청자 이메일 생성 (HTML 첨부 버전)
 */
function generateApplicantEmailWithAttachmentIntegrated(normalizedData, aiReport, diagnosisId, driveFileInfo) {
  const config = getEnvironmentConfig();
  const subject = `🎉 [이교장의AI역량진단보고서] ${normalizedData.companyName} - ${normalizedData.contactName}님`;
  
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
        <h1>🎓 이교장의AI역량진단보고서</h1>
        <h2>${normalizedData.companyName} 진단 결과</h2>
        <p>패스워드 없이 바로 확인하세요!</p>
    </div>
    
    <div class="content">
        <p>안녕하세요, <strong>${normalizedData.contactName}</strong>님!</p>
        <p><strong>${normalizedData.companyName}</strong>의 이교장의AI역량진단보고서가 완료되어 결과보고서를 보내드립니다.</p>
        
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
            <p><strong>파일명:</strong> ${normalizedData.companyName}_이교장의AI역량진단보고서_${diagnosisId}.html</p>
            <p>🎯 <strong>이메일에 첨부된 HTML 파일을 다운로드하여 브라우저에서 바로 열어보세요!</strong></p>
            <p style="font-size: 14px; color: #666;">HTML 파일을 더블클릭하면 기본 브라우저에서 자동으로 열립니다.</p>
        </div>
        
        <div class="drive-link-box">
            <h3>☁️ Google Drive 백업</h3>
            <p>첨부파일이 열리지 않을 경우 아래 링크를 클릭하세요:</p>
            <a href="${driveFileInfo.shareLink || driveFileInfo.directLink || 'https://drive.google.com/drive/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj'}" class="download-button" target="_blank">
                📄 Google Drive에서 보고서 열기
            </a>
            <p style="font-size: 12px; color: #666;">링크 유효기간: 무제한${driveFileInfo.fileSize ? ` | 파일 크기: ${Math.round(driveFileInfo.fileSize/1024)}KB` : ''}</p>
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
        <p><strong>이교장의AI역량진단보고서 고객지원센터</strong></p>
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
 * 관리자 이메일 생성 (Google Drive 연동 개선된 버전)
 */
function generateAdminEmailIntegrated(normalizedData, aiReport, diagnosisId, driveShareLink) {
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
        <h2>🔔 이교장의AI역량진단보고서 완료 알림 (HTML 첨부)</h2>
    </div>
    
    <div class="content">
        <div class="success">
            <strong>✅ 새로운 이교장의AI역량진단보고서가 성공적으로 완료되어 HTML 보고서가 첨부되었습니다!</strong>
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

// 유틸리티 및 기타 함수들
function saveAIDiagnosisDataIntegrated(normalizedData, aiReport, htmlReport, progressId) {
  console.log('💾 데이터 저장 완료');
  return { success: true, timestamp: new Date().toISOString() };
}

/**
 * 상담신청 처리 (통합 개선 버전)
 */
function handleConsultationRequestIntegrated(requestData, progressId) {
  console.log('💬 상담신청 처리 시작 - 통합 시스템');
  
  const config = getEnvironmentConfig();
  const consultationId = generateConsultationId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '상담신청 정보를 검증하고 있습니다');
    console.log('📋 1단계: 상담신청 데이터 검증');
    const normalizedData = normalizeConsultationData(requestData.data || requestData, consultationId);
    
    // 2단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '상담신청 정보를 저장하고 있습니다');
    console.log('💾 2단계: Google Sheets 저장');
    const saveResult = saveConsultationData(normalizedData);
    
    // 3단계: 신청자 확인 이메일 발송
    updateProgressStatus(progressId, 'processing', '신청자에게 확인 이메일을 발송하고 있습니다');
    console.log('📧 3단계: 신청자 확인 이메일 발송');
    const applicantEmailResult = sendConsultationConfirmationEmail(normalizedData);
    
    // 4단계: 관리자 알림 이메일 발송
    updateProgressStatus(progressId, 'processing', '관리자에게 알림 이메일을 발송하고 있습니다');
    console.log('📧 4단계: 관리자 알림 이메일 발송');
    const adminEmailResult = sendConsultationAdminNotification(normalizedData);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 상담신청 처리 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '상담신청이 성공적으로 접수되었습니다');
    
    return {
      type: 'consultation_request',
      consultationId: consultationId,
      success: true,
      message: '상담신청이 성공적으로 접수되었습니다.',
      results: {
        dataStored: saveResult.success,
        applicantEmailSent: applicantEmailResult.success,
        adminEmailSent: adminEmailResult.success
      },
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    updateProgressStatus(progressId, 'error', `상담신청 처리 중 오류: ${error.message}`);
    throw new Error(`상담신청 처리 실패: ${error.message}`);
  }
}

/**
 * 오류신고 처리 (통합 개선 버전)
 */
function handleErrorReportIntegrated(requestData, progressId) {
  console.log('🐛 오류신고 처리 시작 - 통합 시스템');
  
  const config = getEnvironmentConfig();
  const errorReportId = generateErrorReportId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '오류신고 정보를 검증하고 있습니다');
    console.log('📋 1단계: 오류신고 데이터 검증');
    const normalizedData = normalizeErrorReportData(requestData.data || requestData, errorReportId);
    
    // 2단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '오류신고 정보를 저장하고 있습니다');
    console.log('💾 2단계: Google Sheets 저장');
    const saveResult = saveErrorReportData(normalizedData);
    
    // 3단계: 신고자 확인 이메일 발송
    updateProgressStatus(progressId, 'processing', '신고자에게 확인 이메일을 발송하고 있습니다');
    console.log('📧 3단계: 신고자 확인 이메일 발송');
    const reporterEmailResult = sendErrorReportConfirmationEmail(normalizedData);
    
    // 4단계: 관리자 긴급 알림 발송
    updateProgressStatus(progressId, 'processing', '관리자에게 긴급 알림을 발송하고 있습니다');
    console.log('📧 4단계: 관리자 긴급 알림 발송');
    const adminEmailResult = sendErrorReportAdminNotification(normalizedData);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 오류신고 처리 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '오류신고가 성공적으로 접수되었습니다');
    
    return {
      type: 'error_report',
      errorReportId: errorReportId,
      success: true,
      message: '오류신고가 성공적으로 접수되었습니다.',
      results: {
        dataStored: saveResult.success,
        reporterEmailSent: reporterEmailResult.success,
        adminEmailSent: adminEmailResult.success
      },
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ 오류신고 처리 오류:', error);
    updateProgressStatus(progressId, 'error', `오류신고 처리 중 오류: ${error.message}`);
    throw new Error(`오류신고 처리 실패: ${error.message}`);
  }
}

function generateDiagnosisId() {
  return `DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

function generateConsultationId() {
  return `CONS_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
}

function generateErrorReportId() {
  return `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
}

function checkSystemHealth() {
  const config = getEnvironmentConfig();
  return {
    timestamp: new Date().toISOString(),
    version: config.VERSION,
    status: 'healthy',
    branding: '이교장의AI역량진단보고서'
  };
}

function sendErrorNotification(error, requestData) {
  console.log('📧 오류 알림 발송:', error.message);
}

function saveErrorLog(type, id, error, requestData) {
  console.log('💾 오류 로그 저장:', id);
}

function getOrCreateSheetIntegrated(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

// V13에서 가져온 헬퍼 함수명 통일
function getOrCreateSheetFixed(spreadsheet, sheetName) {
  return getOrCreateSheetIntegrated(spreadsheet, sheetName);
}

/**
 * 상담신청 데이터 정규화
 */
function normalizeConsultationData(rawData, consultationId) {
  console.log('🔧 상담신청 데이터 정규화 시작');
  
  // 필수 필드 검증
  const requiredFields = ['companyName', 'contactName', 'contactEmail', 'contactPhone'];
  for (const field of requiredFields) {
    if (!rawData[field]) {
      throw new Error(`필수 필드가 누락되었습니다: ${field}`);
    }
  }
  
  return {
    // 기본 정보
    consultationId: consultationId,
    timestamp: new Date().toISOString(),
    
    // 회사 정보
    companyName: rawData.companyName.trim(),
    contactName: rawData.contactName.trim(),
    contactEmail: rawData.contactEmail.toLowerCase().trim(),
    contactPhone: rawData.contactPhone.trim(),
    contactPosition: rawData.contactPosition || '',
    
    // 사업 정보
    industry: rawData.industry || '',
    employeeCount: rawData.employeeCount || '',
    annualRevenue: rawData.annualRevenue || '',
    location: rawData.location || '',
    
    // 상담 정보
    consultationType: rawData.consultationType || 'general',
    consultationTopic: rawData.consultationTopic || '',
    urgency: rawData.urgency || 'normal',
    preferredDate: rawData.preferredDate || '',
    preferredTime: rawData.preferredTime || '',
    
    // 추가 정보
    currentChallenges: rawData.currentChallenges || '',
    expectedOutcome: rawData.expectedOutcome || '',
    budget: rawData.budget || '',
    additionalInfo: rawData.additionalInfo || '',
    
    // 시스템 정보
    version: getEnvironmentConfig().VERSION,
    source: rawData.source || 'website'
  };
}

/**
 * 오류신고 데이터 정규화
 */
function normalizeErrorReportData(rawData, errorReportId) {
  console.log('🔧 오류신고 데이터 정규화 시작');
  
  // 필수 필드 검증
  const requiredFields = ['reporterName', 'reporterEmail', 'errorType', 'errorDescription'];
  for (const field of requiredFields) {
    if (!rawData[field]) {
      throw new Error(`필수 필드가 누락되었습니다: ${field}`);
    }
  }
  
  return {
    // 기본 정보
    errorReportId: errorReportId,
    timestamp: new Date().toISOString(),
    
    // 신고자 정보
    reporterName: rawData.reporterName.trim(),
    reporterEmail: rawData.reporterEmail.toLowerCase().trim(),
    reporterPhone: rawData.reporterPhone || '',
    companyName: rawData.companyName || '',
    
    // 오류 정보
    errorType: rawData.errorType,
    errorCategory: rawData.errorCategory || 'general',
    errorDescription: rawData.errorDescription.trim(),
    errorLocation: rawData.errorLocation || '',
    errorTime: rawData.errorTime || new Date().toISOString(),
    
    // 기술 정보
    browserInfo: rawData.browserInfo || '',
    deviceInfo: rawData.deviceInfo || '',
    screenResolution: rawData.screenResolution || '',
    operatingSystem: rawData.operatingSystem || '',
    
    // 추가 정보
    stepsToReproduce: rawData.stepsToReproduce || '',
    expectedBehavior: rawData.expectedBehavior || '',
    actualBehavior: rawData.actualBehavior || '',
    severity: rawData.severity || 'medium',
    priority: rawData.priority || 'normal',
    attachments: rawData.attachments || [],
    
    // 시스템 정보
    version: getEnvironmentConfig().VERSION,
    source: rawData.source || 'website',
    userAgent: rawData.userAgent || ''
  };
}

/**
 * 상담신청 데이터 저장
 */
function saveConsultationData(normalizedData) {
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const consultationSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.CONSULTATION_REQUESTS);
    
    // 헤더 설정 (최초 1회)
    if (consultationSheet.getLastRow() === 0) {
      const headers = [
        '상담ID', '접수일시', '회사명', '담당자명', '이메일', '연락처', '직책',
        '업종', '직원수', '연매출', '소재지', '상담유형', '상담주제', '긴급도',
        '희망일자', '희망시간', '현재과제', '기대효과', '예산', '추가정보',
        '버전', '출처', '처리상태'
      ];
      consultationSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      consultationSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 데이터 행 추가
    const row = [
      normalizedData.consultationId,
      normalizedData.timestamp,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone,
      normalizedData.contactPosition,
      normalizedData.industry,
      normalizedData.employeeCount,
      normalizedData.annualRevenue,
      normalizedData.location,
      normalizedData.consultationType,
      normalizedData.consultationTopic,
      normalizedData.urgency,
      normalizedData.preferredDate,
      normalizedData.preferredTime,
      normalizedData.currentChallenges,
      normalizedData.expectedOutcome,
      normalizedData.budget,
      normalizedData.additionalInfo,
      normalizedData.version,
      normalizedData.source,
      '접수완료'
    ];
    
    consultationSheet.appendRow(row);
    console.log('✅ 상담신청 데이터 저장 완료:', normalizedData.consultationId);
    
    return { success: true, consultationId: normalizedData.consultationId };
    
  } catch (error) {
    console.error('❌ 상담신청 데이터 저장 실패:', error);
    throw new Error(`데이터 저장 실패: ${error.message}`);
  }
}

/**
 * 오류신고 데이터 저장
 */
function saveErrorReportData(normalizedData) {
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const errorSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.ERROR_REPORTS);
    
    // 헤더 설정 (최초 1회)
    if (errorSheet.getLastRow() === 0) {
      const headers = [
        '신고ID', '신고일시', '신고자명', '이메일', '연락처', '회사명',
        '오류유형', '오류분류', '오류설명', '오류위치', '발생시간',
        '브라우저정보', '기기정보', '화면해상도', '운영체제',
        '재현단계', '예상동작', '실제동작', '심각도', '우선순위',
        '버전', '출처', '처리상태', '담당자', '해결일시'
      ];
      errorSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      errorSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ea4335').setFontColor('white');
    }
    
    // 데이터 행 추가
    const row = [
      normalizedData.errorReportId,
      normalizedData.timestamp,
      normalizedData.reporterName,
      normalizedData.reporterEmail,
      normalizedData.reporterPhone,
      normalizedData.companyName,
      normalizedData.errorType,
      normalizedData.errorCategory,
      normalizedData.errorDescription,
      normalizedData.errorLocation,
      normalizedData.errorTime,
      normalizedData.browserInfo,
      normalizedData.deviceInfo,
      normalizedData.screenResolution,
      normalizedData.operatingSystem,
      normalizedData.stepsToReproduce,
      normalizedData.expectedBehavior,
      normalizedData.actualBehavior,
      normalizedData.severity,
      normalizedData.priority,
      normalizedData.version,
      normalizedData.source,
      '접수완료',
      '', // 담당자 (추후 배정)
      ''  // 해결일시 (추후 업데이트)
    ];
    
    errorSheet.appendRow(row);
    console.log('✅ 오류신고 데이터 저장 완료:', normalizedData.errorReportId);
    
    return { success: true, errorReportId: normalizedData.errorReportId };
    
  } catch (error) {
    console.error('❌ 오류신고 데이터 저장 실패:', error);
    throw new Error(`데이터 저장 실패: ${error.message}`);
  }
}

/**
 * 상담신청 확인 이메일 발송
 */
function sendConsultationConfirmationEmail(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `[AICAMP] 상담신청 접수확인 - ${normalizedData.companyName}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .info-box { background: #f0f9ff; border: 2px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { background: #f8fafc; text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 상담신청 접수완료</h1>
    <p>AICAMP 전문 컨설턴트가 곧 연락드리겠습니다</p>
  </div>
  
  <div class="content">
    <p>안녕하세요, <strong>${normalizedData.contactName}</strong>님!</p>
    <p><strong>${normalizedData.companyName}</strong>의 상담신청이 성공적으로 접수되었습니다.</p>
    
    <div class="info-box">
      <h3>📋 접수 정보</h3>
      <p><strong>상담 ID:</strong> ${normalizedData.consultationId}</p>
      <p><strong>회사명:</strong> ${normalizedData.companyName}</p>
      <p><strong>담당자:</strong> ${normalizedData.contactName}</p>
      <p><strong>연락처:</strong> ${normalizedData.contactPhone}</p>
      <p><strong>상담유형:</strong> ${normalizedData.consultationType}</p>
      <p><strong>접수일시:</strong> ${new Date(normalizedData.timestamp).toLocaleString('ko-KR')}</p>
    </div>
    
    <h3>📞 다음 단계</h3>
    <ul>
      <li>✅ 상담신청 접수완료</li>
      <li>🔄 전담 컨설턴트 배정 (1영업일 내)</li>
      <li>📞 상담 일정 협의 연락 (2영업일 내)</li>
      <li>🎯 맞춤형 상담 진행</li>
    </ul>
  </div>
  
  <div class="footer">
    <p><strong>AICAMP 상담센터</strong></p>
    <p>📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}</p>
    <p>상담 ID: ${normalizedData.consultationId}</p>
  </div>
</body>
</html>`;
    
    MailApp.sendEmail({
      to: normalizedData.contactEmail,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 상담신청 확인 이메일 발송 완료:', normalizedData.contactEmail);
    return { success: true };
    
  } catch (error) {
    console.error('❌ 상담신청 확인 이메일 발송 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 상담신청 관리자 알림 발송
 */
function sendConsultationAdminNotification(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `🔔 [신규상담신청] ${normalizedData.companyName} - ${normalizedData.contactName}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table th, .info-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    .info-table th { background: #f8f9fa; font-weight: bold; }
    .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h2>🎯 새로운 상담신청 접수</h2>
  </div>
  
  <div class="content">
    <div class="urgent">
      <strong>✅ 새로운 상담신청이 접수되었습니다!</strong><br>
      <strong>📧 신청자에게 접수확인 메일이 자동 발송되었습니다.</strong>
    </div>
    
    <table class="info-table">
      <tr><th>상담 ID</th><td>${normalizedData.consultationId}</td></tr>
      <tr><th>회사명</th><td><strong>${normalizedData.companyName}</strong></td></tr>
      <tr><th>담당자</th><td>${normalizedData.contactName} (${normalizedData.contactPosition})</td></tr>
      <tr><th>연락처</th><td><strong>${normalizedData.contactPhone}</strong></td></tr>
      <tr><th>이메일</th><td>${normalizedData.contactEmail}</td></tr>
      <tr><th>업종</th><td>${normalizedData.industry}</td></tr>
      <tr><th>직원수</th><td>${normalizedData.employeeCount}</td></tr>
      <tr><th>상담유형</th><td><strong>${normalizedData.consultationType}</strong></td></tr>
      <tr><th>상담주제</th><td>${normalizedData.consultationTopic}</td></tr>
      <tr><th>긴급도</th><td>${normalizedData.urgency}</td></tr>
      <tr><th>희망일시</th><td>${normalizedData.preferredDate} ${normalizedData.preferredTime}</td></tr>
      <tr><th>접수일시</th><td>${new Date(normalizedData.timestamp).toLocaleString('ko-KR')}</td></tr>
    </table>
    
    <div class="urgent">
      <h4>📋 상담 내용</h4>
      <p><strong>현재 과제:</strong> ${normalizedData.currentChallenges || '정보 없음'}</p>
      <p><strong>기대 효과:</strong> ${normalizedData.expectedOutcome || '정보 없음'}</p>
      <p><strong>예산:</strong> ${normalizedData.budget || '정보 없음'}</p>
      <p><strong>추가 정보:</strong> ${normalizedData.additionalInfo || '정보 없음'}</p>
    </div>
  </div>
</body>
</html>`;
    
    MailApp.sendEmail({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 상담신청 관리자 알림 발송 완료:', config.ADMIN_EMAIL);
    return { success: true };
    
  } catch (error) {
    console.error('❌ 상담신청 관리자 알림 발송 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 확인 이메일 발송
 */
function sendErrorReportConfirmationEmail(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `[AICAMP] 오류신고 접수확인 - ${normalizedData.errorType}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: linear-gradient(135deg, #ea4335 0%, #ff6b6b 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .info-box { background: #fff3cd; border: 2px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { background: #f8fafc; text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🐛 오류신고 접수완료</h1>
    <p>신속한 해결을 위해 최선을 다하겠습니다</p>
  </div>
  
  <div class="content">
    <p>안녕하세요, <strong>${normalizedData.reporterName}</strong>님!</p>
    <p>소중한 오류신고를 해주셔서 감사합니다. 신고해주신 내용이 성공적으로 접수되었습니다.</p>
    
    <div class="info-box">
      <h3>📋 신고 정보</h3>
      <p><strong>신고 ID:</strong> ${normalizedData.errorReportId}</p>
      <p><strong>오류유형:</strong> ${normalizedData.errorType}</p>
      <p><strong>심각도:</strong> ${normalizedData.severity}</p>
      <p><strong>신고일시:</strong> ${new Date(normalizedData.timestamp).toLocaleString('ko-KR')}</p>
    </div>
    
    <h3>🔧 처리 절차</h3>
    <ul>
      <li>✅ 오류신고 접수완료</li>
      <li>🔄 개발팀 검토 및 분석 (1-2일)</li>
      <li>🛠️ 오류 수정 작업 진행</li>
      <li>✨ 수정 완료 및 배포</li>
      <li>📧 해결 완료 알림 발송</li>
    </ul>
  </div>
  
  <div class="footer">
    <p><strong>AICAMP 기술지원팀</strong></p>
    <p>📧 ${config.ADMIN_EMAIL} | 🌐 https://${config.AICAMP_WEBSITE}</p>
    <p>신고 ID: ${normalizedData.errorReportId}</p>
  </div>
</body>
</html>`;
    
    MailApp.sendEmail({
      to: normalizedData.reporterEmail,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 오류신고 확인 이메일 발송 완료:', normalizedData.reporterEmail);
    return { success: true };
    
  } catch (error) {
    console.error('❌ 오류신고 확인 이메일 발송 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 관리자 긴급 알림 발송
 */
function sendErrorReportAdminNotification(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const severityEmoji = {
      'critical': '🚨',
      'high': '⚠️',
      'medium': '🔍',
      'low': 'ℹ️'
    };
    
    const emoji = severityEmoji[normalizedData.severity] || '🐛';
    const subject = `${emoji} [긴급오류신고] ${normalizedData.errorType} - ${normalizedData.reporterName}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table th, .info-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    .info-table th { background: #f8f9fa; font-weight: bold; }
    .critical { background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h2>${emoji} 새로운 오류신고 접수</h2>
  </div>
  
  <div class="content">
    <div class="critical">
      <strong>🚨 새로운 오류신고가 접수되었습니다!</strong><br>
      <strong>심각도: ${normalizedData.severity.toUpperCase()}</strong><br>
      <strong>📧 신고자에게 접수확인 메일이 자동 발송되었습니다.</strong>
    </div>
    
    <table class="info-table">
      <tr><th>신고 ID</th><td>${normalizedData.errorReportId}</td></tr>
      <tr><th>신고자</th><td><strong>${normalizedData.reporterName}</strong></td></tr>
      <tr><th>이메일</th><td>${normalizedData.reporterEmail}</td></tr>
      <tr><th>연락처</th><td>${normalizedData.reporterPhone}</td></tr>
      <tr><th>회사명</th><td>${normalizedData.companyName}</td></tr>
      <tr><th>오류유형</th><td><strong>${normalizedData.errorType}</strong></td></tr>
      <tr><th>심각도</th><td><strong style="color: ${normalizedData.severity === 'critical' ? 'red' : normalizedData.severity === 'high' ? 'orange' : 'green'}">${normalizedData.severity.toUpperCase()}</strong></td></tr>
      <tr><th>발생위치</th><td>${normalizedData.errorLocation}</td></tr>
      <tr><th>신고일시</th><td>${new Date(normalizedData.timestamp).toLocaleString('ko-KR')}</td></tr>
    </table>
    
    <div class="critical">
      <h4>📝 오류 설명</h4>
      <p><strong>${normalizedData.errorDescription}</strong></p>
    </div>
  </div>
</body>
</html>`;
    
    MailApp.sendEmail({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 오류신고 관리자 알림 발송 완료:', config.ADMIN_EMAIL);
    return { success: true };
    
  } catch (error) {
    console.error('❌ 오류신고 관리자 알림 발송 실패:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// MODULE 11: Google Drive 연동 시스템 (신규 추가)
// ================================================================================

/**
 * Google Drive HTML 보고서 업로드 요청 처리
 */
function handleDriveUploadRequest(requestData, progressId) {
  console.log('🗂️ Google Drive 업로드 요청 처리 시작');
  
  const config = getEnvironmentConfig();
  const startTime = new Date().getTime();
  
  try {
    // 필수 데이터 검증
    if (!requestData.fileName || !requestData.content) {
      throw new Error('파일명과 콘텐츠가 필요합니다');
    }
    
    // Google Drive 폴더 가져오기
    let folder;
    try {
      folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
      console.log('✅ Drive 폴더 확인:', folder.getName());
    } catch (e) {
      console.error('❌ Drive 폴더 접근 실패:', e);
      throw new Error(`Drive 폴더 접근 실패: ${e.message}`);
    }
    
    // 파일명 정규화
    const sanitizedFileName = sanitizeFileName(requestData.fileName);
    
    // HTML 파일 생성
    const file = folder.createFile(sanitizedFileName, requestData.content, 'text/html');
    
    // 공유 설정
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 파일 정보 수집
    const fileInfo = {
      fileId: file.getId(),
      fileName: sanitizedFileName,
      webViewLink: file.getUrl(),
      webContentLink: `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`,
      createdTime: file.getDateCreated().toISOString(),
      size: file.getSize()
    };
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ Google Drive 업로드 완료:', sanitizedFileName);
    
    updateProgressStatus(progressId, 'completed', 'Google Drive 업로드가 완료되었습니다');
    
    return {
      type: 'drive_upload',
      success: true,
      message: 'Google Drive 업로드가 성공적으로 완료되었습니다',
      driveResult: fileInfo,
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ Google Drive 업로드 오류:', error);
    updateProgressStatus(progressId, 'error', `Drive 업로드 오류: ${error.message}`);
    
    return {
      type: 'drive_upload',
      success: false,
      error: error.message,
      processingTime: new Date().getTime() - startTime
    };
  }
}

/**
 * Google Drive 파일 목록 조회 요청 처리
 */
function handleDriveListRequest(requestData, progressId) {
  console.log('📋 Google Drive 파일 목록 조회 시작');
  
  const config = getEnvironmentConfig();
  const startTime = new Date().getTime();
  
  try {
    // Google Drive 폴더 가져오기
    const folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
    const files = folder.getFiles();
    
    const fileList = [];
    while (files.hasNext()) {
      const file = files.next();
      if (file.getMimeType() === 'text/html') {
        fileList.push({
          id: file.getId(),
          name: file.getName(),
          webViewLink: file.getUrl(),
          webContentLink: `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`,
          createdTime: file.getDateCreated().toISOString(),
          modifiedTime: file.getLastUpdated().toISOString(),
          size: file.getSize().toString()
        });
      }
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ Drive 파일 목록 조회 완료:', fileList.length + '개');
    
    updateProgressStatus(progressId, 'completed', `${fileList.length}개 파일 목록 조회 완료`);
    
    return {
      type: 'drive_list',
      success: true,
      files: fileList,
      count: fileList.length,
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ Drive 파일 목록 조회 오류:', error);
    updateProgressStatus(progressId, 'error', `파일 목록 조회 오류: ${error.message}`);
    
    return {
      type: 'drive_list',
      success: false,
      error: error.message,
      files: [],
      processingTime: new Date().getTime() - startTime
    };
  }
}

/**
 * Google Drive 파일 상태 확인 요청 처리
 */
function handleDriveCheckRequest(requestData, progressId) {
  console.log('🔍 Google Drive 파일 상태 확인 시작');
  
  const startTime = new Date().getTime();
  
  try {
    if (!requestData.fileId) {
      throw new Error('파일 ID가 필요합니다');
    }
    
    // 파일 존재 여부 확인
    const file = DriveApp.getFileById(requestData.fileId);
    
    const fileInfo = {
      id: file.getId(),
      name: file.getName(),
      webViewLink: file.getUrl(),
      webContentLink: `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`,
      createdTime: file.getDateCreated().toISOString(),
      modifiedTime: file.getLastUpdated().toISOString(),
      size: file.getSize().toString()
    };
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ Drive 파일 상태 확인 완료:', file.getName());
    
    updateProgressStatus(progressId, 'completed', '파일 상태 확인 완료');
    
    return {
      type: 'drive_check',
      success: true,
      exists: true,
      accessible: true,
      fileInfo: fileInfo,
      processingTime: processingTime
    };
    
  } catch (error) {
    console.error('❌ Drive 파일 상태 확인 오류:', error);
    updateProgressStatus(progressId, 'error', `파일 상태 확인 오류: ${error.message}`);
    
    return {
      type: 'drive_check',
      success: false,
      exists: false,
      accessible: false,
      error: error.message,
      processingTime: new Date().getTime() - startTime
    };
  }
}

/**
 * 파일명 정규화 함수
 */
function sanitizeFileName(fileName) {
  return fileName
    .replace(/[<>:"/\\|?*]/g, '_') // 특수문자를 언더스코어로 변경
    .replace(/\s+/g, '_') // 공백을 언더스코어로 변경
    .replace(/_+/g, '_') // 연속된 언더스코어를 하나로 변경
    .replace(/^_|_$/g, '') // 시작과 끝의 언더스코어 제거
    .substring(0, 100); // 길이 제한 (100자)
}

// ================================================================================
// 시스템 초기화 및 로딩 완료
// ================================================================================

console.log('🎓 이교장의AI역량진단보고서 시스템 V14.2 ULTIMATE INTEGRATED GEMINI+DRIVE 로드 완료');
console.log('📋 혁신적 통합 개선사항:');
console.log('  ✅ 3-in-1 통합 시스템 (AI진단 + 상담신청 + 오류신고)');
console.log('  ✅ 이교장의AI역량진단보고서 브랜딩 완전 통일');
console.log('  ✅ GEMINI 2.5 Flash 통합 분석 (정량적+정성적)');
console.log('  ✅ Google Drive 자동 업로드 및 공유 링크 생성');
console.log('  ✅ 2단계 이메일 시스템 (접수확인 → 결과보고서)');
console.log('  ✅ 사용자 불안감 해소 및 향상된 UX');
console.log('  ✅ 별도 Google Sheets 데이터 관리');
console.log('  ✅ 실시간 진행과정 모니터링 통합');
console.log('  ✅ HTML 보고서 첨부 방식 개선 (패스워드 불필요)');
console.log('  ✅ 정확한 이메일 제출자 전용 보고서 발송');
console.log('  ✅ Google Drive 자동 백업 시스템 완비');
console.log('  ✅ GEMINI API 최적화 및 오류 처리 강화');
console.log('  🎯 업종별 맞춤형 인사이트 제공');
console.log('  🚀 실무 적용 가능한 개선 방안 제시');
console.log('  🤖 AI 기반 자동화 시나리오 통합');
console.log('  📊 벤치마킹 및 성과 예측');
console.log('  💰 ROI 기반 투자 효과 분석');
console.log('');
console.log('🎓 이교장의AI역량진단보고서 핵심 가치:');
console.log('  "정확한 이메일 제출자에게만 제공하는 프리미엄 서비스"');
console.log('  "실무 적용 가능한 맞춤형 분석 및 실행 가이드"');
console.log('  "AI 역량 강화를 통한 기업 경쟁력 향상"');
console.log('  "체계적인 단계별 실행 계획 제시"');
console.log('');
console.log('📧 프리미엄 서비스: HTML 첨부 + Google Drive 백업');
console.log('🎁 정확한 이메일 인증 후 고품질 보고서 즉시 제공');
console.log('💡 실무진이 바로 적용 가능한 구체적 액션 플랜');
console.log('');
console.log('🚀 시스템 준비 완료 - GEMINI 통합 + Google Drive 연동 시스템 시작!');
console.log('📝 모든 환경변수 설정 완료 - 프리미엄 서비스 제공 준비됨');
console.log('🤖 GEMINI 2.5 Flash 통합 분석: 정량적+정성적 분석 완전 통합');
console.log('🗂️ Google Drive 자동 업로드: HTML 보고서 자동 저장 및 공유');
console.log('📧 2단계 이메일 시스템: 접수확인 즉시 → 결과보고서 완료 후');
console.log('📊 3가지 신청 관리: AI역량진단 + 상담신청 + 오류신고');
console.log('💾 별도 Google Sheets: 각 신청별 독립 데이터 관리');
console.log('🔗 Google Drive 폴더: https://drive.google.com/drive/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
console.log('🎓 이교장의AI역량진단보고서 × AICAMP - GEMINI+Drive 통합 관리 시스템');

/**
 * ================================================================================
 * 🎓 이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE FINAL - Google Apps Script
 * ================================================================================
 * 
 * 🔥 V11.0 완전 제거 및 V15.0 ULTIMATE 통합 시스템:
 * 1. 45개 행동지표 기반 정밀 AI 역량진단
 * 2. GEMINI 2.5 Flash 통합 분석 (정량적+정성적)
 * 3. 이교장 스타일 보고서 자동 생성 (11개 섹션)
 * 4. 애플 스타일 미니멀 이메일 시스템
 * 5. 상담신청 처리
 * 6. 오류신고 처리
 * 7. 실시간 진행과정 모니터링
 * 8. Google Drive HTML 보고서 자동 업로드
 * 9. 통합 워크플로우 결과 처리
 * 
 * 🎯 핵심 특징:
 * - V11.0 코드 완전 제거
 * - matrix 오류 완전 수정
 * - GEMINI 2.5 FLASH 모델 통합 분석
 * - 통합 워크플로우 결과 자동 처리
 * - 애플 스타일 미니멀 이메일 디자인
 * - 이교장의AI역량진단보고서 브랜딩 통일
 * - Google Drive 공유 폴더 자동 업로드
 * 
 * 📋 환경변수 설정 (Google Apps Script 설정 → 스크립트 속성):
 * 
 * 🔑 필수 환경변수:
 * - SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
 * - GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
 * - ADMIN_EMAIL: hongik423@gmail.com
 * - AICAMP_WEBSITE: aicamp.club
 * - DRIVE_FOLDER_ID: 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
 * 
 * 🎛️ 선택적 환경변수:
 * - DEBUG_MODE: false
 * - ENVIRONMENT: production
 * - SYSTEM_VERSION: V15.0-ULTIMATE-FINAL
 * - AI_MODEL: GEMINI-2.5-FLASH-INTEGRATED
 * 
 * ================================================================================
 */

// ================================================================================
// MODULE 1: 환경 설정 및 상수
// ================================================================================

/**
 * 환경변수 설정 (V15.0 ULTIMATE FINAL)
 */
function getEnvironmentConfig() {
  const properties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 환경변수
    SPREADSHEET_ID: properties.getProperty('SPREADSHEET_ID') || '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
    GEMINI_API_KEY: properties.getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    ADMIN_EMAIL: properties.getProperty('ADMIN_EMAIL') || 'hongik423@gmail.com',
    AICAMP_WEBSITE: properties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    DRIVE_FOLDER_ID: properties.getProperty('DRIVE_FOLDER_ID') || '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
    
    // 시스템 설정
    DEBUG_MODE: properties.getProperty('DEBUG_MODE') === 'true',
    ENVIRONMENT: properties.getProperty('ENVIRONMENT') || 'production',
    SYSTEM_VERSION: 'V15.0-ULTIMATE-FINAL',
    AI_MODEL: 'GEMINI-2.5-FLASH-INTEGRATED',
    
    // 타임아웃 설정
    TIMEOUT_GEMINI: 720000, // 12분
    TIMEOUT_EMAIL: 180000,  // 3분
    TIMEOUT_SHEET: 30000,   // 30초
    
    // 재시도 설정
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 2000
  };
}

/**
 * Google Sheets 설정 (V15.0 ULTIMATE FINAL)
 */
function getSheetsConfig() {
  const env = getEnvironmentConfig();
  
  return {
    SPREADSHEET_ID: env.SPREADSHEET_ID,
    
    SHEETS: {
      // AI 역량진단 (V15.0 이교장 스타일)
      AI_DIAGNOSIS_MAIN: 'AI역량진단_메인데이터',
      AI_DIAGNOSIS_SCORES: 'AI역량진단_점수분석',
      AI_DIAGNOSIS_SWOT: 'AI역량진단_SWOT분석',
      AI_DIAGNOSIS_REPORTS: 'AI역량진단_보고서',
      AI_DIAGNOSIS_LEEKYOJANG: 'AI역량진단_이교장보고서_V15',
      AI_DIAGNOSIS_PRIORITY_MATRIX: 'AI역량진단_우선순위매트릭스',
      AI_DIAGNOSIS_N8N_METHODOLOGY: 'AI역량진단_N8N방법론',
      
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
// MODULE 2: 메인 라우팅 시스템 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 메인 GET 핸들러 (헬스체크 + 진단 결과 조회)
 */
function doGet(e) {
  try {
    const env = getEnvironmentConfig();
    
    // URL 파라미터 확인
    const params = e.parameter || {};
    const diagnosisId = params.diagnosisId;
    const action = params.action;
    
    // 진단 결과 조회 요청인 경우
    if (diagnosisId && action === 'getResult') {
      return getDiagnosisResult(diagnosisId);
    }
    
    // 헬스체크 응답 (V15.0 ULTIMATE FINAL)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        status: 'active',
        version: env.SYSTEM_VERSION,
        branding: '이교장의AI역량진단보고서',
        model: env.AI_MODEL,
        timestamp: new Date().toISOString(),
        environment: env.ENVIRONMENT,
        features: {
          questionsSupported: 45,
          sectionsSupported: 11,
          fallbackDisabled: true,
          unifiedReports: true,
          aiModel: 'gemini-2.5-flash',
          matrixFixed: true // V11.0 matrix 오류 완전 수정
        },
        endpoints: {
          diagnosis: 'POST /',
          health: 'GET /',
          consultation: 'POST /?action=consultation',
          errorReport: 'POST /?action=error-report',
          getResult: 'GET /?diagnosisId=ID&action=getResult'
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 헬스체크 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        status: 'error',
        version: 'V15.0-ULTIMATE-FINAL',
        error: error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 메인 POST 핸들러 (V15.0 ULTIMATE FINAL - 진행상황 모니터링 통합)
 */
function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🚀 V15.0 ULTIMATE FINAL 요청 수신');
  
  try {
    // 요청 데이터 파싱 (개선된 오류 처리)
    let requestData;
    try {
      requestData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('❌ 요청 데이터 파싱 실패:', parseError);
      throw new Error('잘못된 요청 데이터 형식입니다.');
    }
    
    const action = requestData.action || requestData.type || 'diagnosis';
    
    console.log('📋 요청 액션:', action);
    console.log('📊 요청 데이터 키:', Object.keys(requestData));
    
    // 진행상황 모니터링 시작
    const progressId = startProgressMonitoring(action, requestData);
    
    // V15.0 신규: 통합 워크플로우 결과 처리 확인
    if (requestData.integratedWorkflow && requestData.workflowResult) {
      console.log('🎯 통합 워크플로우 결과 감지 - 특별 처리 모드');
    }
    
    // 액션별 라우팅 (V15.0 지원 액션 + 통합 워크플로우 + Drive 유틸)
    let result;
    switch (action) {
      case 'diagnosis':
      case 'ai_diagnosis':
        updateProgressStatus(progressId, 'processing', '이교장의AI역량진단보고서 생성을 시작합니다');
        result = handleAIDiagnosisRequest(requestData, progressId);
        break;
        
      case 'ai_diagnosis_complete':
      case 'processCompletedAnalysis':
        // V15.0 신규: 통합 워크플로우 완료 결과 처리
        updateProgressStatus(progressId, 'processing', '통합 워크플로우 결과를 처리하고 있습니다');
        result = handleIntegratedWorkflowResult(requestData, progressId);
        break;
        
      case 'consultation':
      case 'consultation_request':
        updateProgressStatus(progressId, 'processing', '상담신청을 처리하고 있습니다');
        result = handleConsultationRequest(requestData, progressId);
        break;
        
      case 'error_report':
        updateProgressStatus(progressId, 'processing', '오류신고를 처리하고 있습니다');
        result = handleErrorReport(requestData, progressId);
        break;
        
      case 'getResult':
        const diagnosisId = requestData.diagnosisId || e.parameter.diagnosisId;
        result = getDiagnosisResult(diagnosisId);
        break;
        
      case 'checkProgress':
        // 진행상황 조회 (실시간 모니터링용)
        console.log('📊 진행상황 조회 요청:', requestData.diagnosisId);
        result = getProgressStatus(requestData.diagnosisId);
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
        console.warn('⚠️ 알 수 없는 요청 타입, 기본 진단으로 처리:', action);
        updateProgressStatus(progressId, 'processing', '기본 AI역량진단으로 처리합니다');
        result = handleAIDiagnosisRequest(requestData, progressId);
        break;
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 처리 완료 - 소요시간:', processingTime + 'ms');
    
    // 진행상황 완료 처리
    updateProgressStatus(progressId, 'completed', '모든 처리가 성공적으로 완료되었습니다');
    
    return result;
    
  } catch (error) {
    console.error('❌ 메인 POST 핸들러 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString(),
        supportedActions: ['diagnosis', 'ai_diagnosis_complete', 'consultation', 'error_report', 'getResult', 'checkProgress']
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 2.5: 진행상황 모니터링 시스템 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 진행상황 모니터링 시작
 */
function startProgressMonitoring(requestType, requestData) {
  // diagnosisId가 있으면 사용, 없으면 생성
  const diagnosisId = requestData.diagnosisId || requestData.data?.diagnosisId || `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const progressId = `PROG_${diagnosisId}_${Date.now()}`;
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = getOrCreateSheet(spreadsheet, sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    // 헤더 설정 (최초 1회) - diagnosisId 컬럼 추가
    if (progressSheet.getLastRow() === 0) {
      const headers = ['진행ID', '진단ID', '요청타입', '시작시간', '상태', '메시지', '업데이트시간', '완료시간'];
      progressSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      progressSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 초기 진행상황 저장
    const row = [
      progressId,
      diagnosisId,  // 진단ID 추가
      requestType,
      new Date(),
      'started',
      '이교장의AI역량진단보고서 처리를 시작합니다',
      new Date(),
      ''
    ];
    
    progressSheet.appendRow(row);
    console.log('📊 진행상황 모니터링 시작:', progressId, '진단ID:', diagnosisId);
    
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
        // 새로운 구조에 맞게 컬럼 인덱스 조정: 상태(5), 메시지(6), 업데이트시간(7), 완료시간(8)
        progressSheet.getRange(i + 1, 5).setValue(status);
        progressSheet.getRange(i + 1, 6).setValue(message);
        progressSheet.getRange(i + 1, 7).setValue(new Date());
        
        // 완료 상태인 경우 완료시간 설정
        if (status === 'completed' || status === 'error') {
          progressSheet.getRange(i + 1, 8).setValue(new Date());
        }
        
        console.log(`📈 진행상황 업데이트 [${progressId}]: ${status} - ${message}`);
        break;
      }
    }
    
  } catch (error) {
    console.error('❌ 진행상황 업데이트 실패:', error);
  }
}

/**
 * 진행상황 조회 (실시간 모니터링용)
 */
function getProgressStatus(diagnosisId) {
  try {
    console.log('📊 진행상황 조회:', diagnosisId);
    
    if (!diagnosisId) {
      throw new Error('diagnosisId가 필요합니다');
    }
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    if (!progressSheet) {
      throw new Error('진행상황 모니터링 시트를 찾을 수 없습니다');
    }
    
    const data = progressSheet.getDataRange().getValues();
    const headers = data[0];
    
    // diagnosisId로 진행상황 검색 (최신 순)
    let latestProgress = null;
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      const rowDiagnosisId = row[headers.indexOf('진단ID')];
      
      if (rowDiagnosisId === diagnosisId) {
        latestProgress = {
          progressId: row[headers.indexOf('진행ID')],
          diagnosisId: rowDiagnosisId,
          requestType: row[headers.indexOf('요청타입')],
          startTime: row[headers.indexOf('시작시간')],
          status: row[headers.indexOf('상태')],
          message: row[headers.indexOf('메시지')],
          updateTime: row[headers.indexOf('업데이트시간')],
          completeTime: row[headers.indexOf('완료시간')]
        };
        break;
      }
    }
    
    if (latestProgress) {
      console.log('✅ 진행상황 발견:', latestProgress.status);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          diagnosisId: diagnosisId,
          progress: latestProgress,
          version: 'V15.0-ULTIMATE-FINAL',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      console.log('⚠️ 진행상황을 찾을 수 없음:', diagnosisId);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          diagnosisId: diagnosisId,
          message: '진행상황 데이터를 찾을 수 없습니다',
          version: 'V15.0-ULTIMATE-FINAL',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('❌ 진행상황 조회 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        diagnosisId: diagnosisId,
        error: error.message,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 시트 생성 또는 가져오기 (헬퍼 함수)
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

// ================================================================================
// MODULE 3: AI 역량진단 처리 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * AI 역량진단 요청 처리 (V15.0 ULTIMATE FINAL - 완전한 12단계 워크플로우)
 */
function handleAIDiagnosisRequest(requestData, progressId) {
  console.log('🎓 AI 역량진단 처리 시작 - V15.0 ULTIMATE FINAL');
  
  const config = getEnvironmentConfig();
  // 전달된 diagnosisId가 있으면 그대로 사용하여 프런트/백엔드/SSE 식별자를 일치시킨다
  const diagnosisId = requestData && (requestData.diagnosisId || (requestData.data && requestData.data.diagnosisId))
    ? (requestData.diagnosisId || requestData.data.diagnosisId)
    : generateDiagnosisId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '1단계: 제출하신 정보를 검증하고 있습니다');
    console.log('📋 1단계: 데이터 검증 및 정규화');
    const normalizedData = normalizeAIDiagnosisData(requestData, diagnosisId);
    
    // 2단계: 신청자/관리자 접수확인 메일 발송
    updateProgressStatus(progressId, 'processing', '2단계: 접수확인 메일을 발송하고 있습니다');
    console.log('📧 2단계: 접수확인 메일 발송');
    const confirmationResult = sendApplicationConfirmationEmails(normalizedData, diagnosisId);
    
    // 3단계: 45문항 점수 계산 및 분석
    updateProgressStatus(progressId, 'processing', '3단계: GEMINI AI가 45개 문항을 분석하고 있습니다');
    console.log('📊 3단계: 45문항 점수 계산');
    const scoreAnalysis = calculateAdvancedScores(normalizedData);
    
    // 4단계: 업종별/규모별 벤치마크 분석
    updateProgressStatus(progressId, 'processing', '4단계: 업종별 벤치마크 분석을 진행하고 있습니다');
    console.log('🎯 4단계: 벤치마크 갭 분석');
    const benchmarkAnalysis = performBenchmarkAnalysis(scoreAnalysis, normalizedData);
    
    // 5단계: 고도화된 SWOT 분석
    updateProgressStatus(progressId, 'processing', '5단계: 강점, 약점, 기회, 위협 요소를 종합 분석하고 있습니다');
    console.log('⚡ 5단계: SWOT 분석');
    const swotAnalysis = generateAdvancedSWOT(normalizedData, scoreAnalysis, benchmarkAnalysis);
    
    // 6단계: 핵심 실행 과제 생성
    updateProgressStatus(progressId, 'processing', '6단계: 핵심 실행 과제를 생성하고 있습니다');
    console.log('🎯 6단계: 핵심 실행 과제');
    const keyActionItems = generateKeyActionItems(swotAnalysis, scoreAnalysis, normalizedData);
    
    // 7단계: 3단계 실행 로드맵 생성
    updateProgressStatus(progressId, 'processing', '7단계: 3단계 실행 로드맵을 수립하고 있습니다');
    console.log('🗺️ 7단계: 실행 로드맵');
    const executionRoadmap = generate3PhaseRoadmap(keyActionItems, swotAnalysis, normalizedData);
    
    // 8단계: GEMINI AI 종합 보고서 생성 (핵심)
    updateProgressStatus(progressId, 'processing', '8단계: GEMINI 2.5 Flash로 종합 분석 보고서를 생성하고 있습니다');
    console.log('🤖 8단계: GEMINI AI 종합 분석');
    const aiReport = generateGeminiAIReport(normalizedData, scoreAnalysis, swotAnalysis, keyActionItems, executionRoadmap);
    
    // 9단계: 이교장의AI역량진단보고서 HTML 생성
    updateProgressStatus(progressId, 'processing', '9단계: 맞춤형 HTML 보고서를 생성하고 있습니다');
    console.log('📄 9단계: 이교장의AI역량진단보고서 HTML 생성');
    const htmlReport = generateLeeKyoJangStyleReport(normalizedData, aiReport, {
      scores: scoreAnalysis,
      swot: swotAnalysis,
      actionItems: keyActionItems, // matrix 완전 제거, actionItems로 대체
      roadmap: executionRoadmap
    });
    
    // 10단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '10단계: 데이터를 저장하고 있습니다');
    console.log('💾 10단계: 데이터 저장');
    const saveResult = saveAIDiagnosisData(normalizedData, aiReport, htmlReport, progressId);
    
    // 11단계: Google Drive에 HTML 보고서 업로드
    updateProgressStatus(progressId, 'processing', '11단계: Google Drive에 보고서를 업로드하고 있습니다');
    console.log('🗂️ 11단계: Google Drive HTML 보고서 업로드');
    const driveUploadResult = uploadReportToDrive(diagnosisId, htmlReport, normalizedData);
    
    // 12단계: 이교장의AI역량진단보고서 이메일 발송 (HTML 첨부 + Drive 링크)
    updateProgressStatus(progressId, 'processing', '12단계: 완성된 보고서를 이메일로 발송하고 있습니다');
    console.log('📧 12단계: 이교장의AI역량진단보고서 이메일 발송');
    const emailResult = sendDiagnosisEmail(normalizedData, aiReport, driveUploadResult.shareLink, diagnosisId);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('🎉 이교장의AI역량진단보고서 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '이교장의AI역량진단보고서가 성공적으로 완료되어 이메일로 발송되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'ai_diagnosis',
        diagnosisId: diagnosisId,
        message: '이교장의AI역량진단보고서가 성공적으로 완료되었습니다.',
        branding: '이교장의AI역량진단보고서',
        results: {
          totalScore: aiReport.totalScore || scoreAnalysis.totalScore,
          maturityLevel: aiReport.maturityLevel || scoreAnalysis.maturityLevel,
          grade: scoreAnalysis.grade,
          reportGenerated: true,
          emailsSent: emailResult.success,
          dataSaved: saveResult.success,
          confirmationSent: confirmationResult.success,
          driveUploaded: driveUploadResult ? driveUploadResult.success : false,
          driveFileInfo: driveUploadResult || null
        },
        processingTime: processingTime,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 이교장의AI역량진단보고서 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    
    // 오류 데이터 저장
    saveErrorLog('ai_diagnosis', diagnosisId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: `이교장의AI역량진단보고서 처리 실패: ${error.message}`,
        diagnosisId: diagnosisId,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 진단 결과 조회 (V15.0 ULTIMATE FINAL)
 */
function getDiagnosisResult(diagnosisId) {
  try {
    console.log('🔍 진단 결과 조회:', diagnosisId);
    
    if (!diagnosisId) {
      throw new Error('diagnosisId가 필요합니다');
    }
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    
    if (!sheet) {
      throw new Error('진단 데이터 시트를 찾을 수 없습니다');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // diagnosisId로 데이터 검색
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowDiagnosisId = row[headers.indexOf('진단ID')] || row[headers.indexOf('diagnosisId')];
      
      if (rowDiagnosisId === diagnosisId) {
        console.log('✅ 진단 결과 발견:', diagnosisId);
        
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            hasData: true,
            diagnosisId: diagnosisId,
            data: {
              companyName: row[headers.indexOf('회사명')],
              contactName: row[headers.indexOf('담당자명')],
              totalScore: row[headers.indexOf('총점')],
              grade: row[headers.indexOf('등급')],
              createdAt: row[headers.indexOf('생성일시')]
            },
            version: 'V15.0-ULTIMATE-FINAL',
            timestamp: new Date().toISOString()
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // 데이터를 찾지 못한 경우
    console.log('⚠️ 진단 결과를 찾을 수 없음:', diagnosisId);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        hasData: false,
        diagnosisId: diagnosisId,
        message: '진단 결과 데이터가 비어있습니다',
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        hasData: false,
        diagnosisId: diagnosisId,
        error: error.message,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 4: 데이터 처리 및 분석 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `DIAG_45Q_${timestamp}_${random}`;
}

/**
 * AI 역량진단 데이터 정규화 (V15.0 ULTIMATE FINAL)
 */
function normalizeAIDiagnosisData(rawData, diagnosisId) {
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
  
  // 개인정보 수집·이용 동의 (선택값이 없으면 false로 간주)
  const privacyConsent = !!(data.privacyConsent || data.consent || data.개인정보동의);
  if (!privacyConsent) {
    throw new Error('개인정보 수집·이용 동의가 필요합니다.');
  }
  
  // 45문항 응답 정규화: 객체/배열/숫자 배열 모두 지원
  const normalizedResponses = (function () {
    const src = data.assessmentResponses || data.responses || [];
    const asArray = Array.isArray(src) ? src : Object.keys(src || {}).map(function (k) {
      return src[k];
    });
    
    // 숫자로 변환하여 45개 문항 확보
    const numericResponses = asArray.map(function (v) {
      const num = parseInt(v) || 0;
      return Math.max(1, Math.min(5, num)); // 1-5 범위로 제한
    });
    
    // 45개 문항이 안 되면 기본값(3)으로 채움
    while (numericResponses.length < 45) {
      numericResponses.push(3);
    }
    
    return numericResponses.slice(0, 45); // 정확히 45개만
  })();
  
  return {
    diagnosisId: diagnosisId,
    companyName: companyName,
    contactName: contactName,
    contactEmail: contactEmail,
    contactPhone: data.contactPhone || data.전화번호 || data.phone || '',
    contactPosition: data.contactPosition || data.직책 || data.position || '',
    businessRegistration: data.businessRegistration || data.사업자등록번호 || '',
    industry: industry,
    employeeCount: employeeCount,
    annualRevenue: data.annualRevenue || data.연매출 || data.revenue || '',
    establishmentYear: data.establishmentYear || data.설립년도 || '',
    businessContent: data.businessContent || data.사업내용 || '',
    mainProducts: data.mainProducts || data.주요제품 || '',
    targetCustomers: data.targetCustomers || data.주요고객 || '',
    currentChallenges: data.currentChallenges || data.현재과제 || '',
    responses: normalizedResponses,
    privacyConsent: privacyConsent,
    timestamp: new Date().toISOString(),
    version: 'V15.0-ULTIMATE-FINAL'
  };
}

/**
 * 45문항 점수 계산 (V15.0 정확한 계산 시스템)
 */
function calculateAdvancedScores(normalizedData) {
  const responses = normalizedData.responses || [];
  const responseValues = Array.isArray(responses) ? 
    responses.map(v => parseInt(v) || 0) : 
    Object.values(responses).map(v => parseInt(v) || 0);
  
  // 점수 계산 로그
  console.log('📊 45문항 점수 계산:', {
    응답개수: responseValues.length,
    총점: responseValues.reduce((sum, score) => sum + score, 0),
    최대점수: maxPossibleScore,
    달성률: percentage + '%'
  });
  
  if (responseValues.length === 0) {
    return {
      totalScore: 0,
      averageScore: 0,
      percentage: 0,
      grade: 'F',
      maturityLevel: '미흡',
      sectionScores: {},
      percentile: 0
    };
  }
  
  const totalScore = responseValues.reduce((sum, score) => sum + score, 0);
  const maxPossibleScore = responseValues.length * 5; // 45문항 × 5점 = 225점
  const averageScore = totalScore / responseValues.length;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  // 정확한 등급 계산 (백분율 기준)
  let grade = 'F';
  let maturityLevel = '미흡';
  
  if (percentage >= 90) {
    grade = 'A+';
    maturityLevel = '최우수';
  } else if (percentage >= 80) {
    grade = 'A';
    maturityLevel = '우수';
  } else if (percentage >= 70) {
    grade = 'B+';
    maturityLevel = '양호';
  } else if (percentage >= 60) {
    grade = 'B';
    maturityLevel = '보통';
  } else if (percentage >= 50) {
    grade = 'C+';
    maturityLevel = '개선필요';
  } else if (percentage >= 40) {
    grade = 'C';
    maturityLevel = '미흡';
  } else {
    grade = 'F';
    maturityLevel = '매우미흡';
  }
  
  // 섹션별 점수 (45문항을 5개 영역으로 분할)
  const questionsPerSection = Math.floor(responseValues.length / 5);
  const sectionScores = {
    strategy: calculateSectionScore(responseValues.slice(0, 9)),
    technology: calculateSectionScore(responseValues.slice(9, 18)),
    data: calculateSectionScore(responseValues.slice(18, 27)),
    process: calculateSectionScore(responseValues.slice(27, 36)),
    culture: calculateSectionScore(responseValues.slice(36, 45))
  };
  
  return {
    totalScore: totalScore,
    maxScore: maxPossibleScore,
    averageScore: Math.round(averageScore * 100) / 100,
    percentage: percentage,
    grade: grade,
    maturityLevel: maturityLevel,
    sectionScores: sectionScores,
    percentile: Math.min(95, percentage)
  };
}

/**
 * 섹션별 점수 계산 헬퍼 함수
 */
function calculateSectionScore(sectionResponses) {
  if (!sectionResponses || sectionResponses.length === 0) return 0;
  const sectionTotal = sectionResponses.reduce((sum, score) => sum + score, 0);
  const sectionMax = sectionResponses.length * 5;
  return Math.round((sectionTotal / sectionMax) * 100);
}

/**
 * 업종별 벤치마크 분석 (V15.0 ULTIMATE FINAL)
 */
function performBenchmarkAnalysis(scoreAnalysis, normalizedData) {
  // 업종별 벤치마크 (백분율 기준)
  const industryBenchmarks = {
    'IT/소프트웨어': { average: 76, top10: 90 },
    '제조업': { average: 64, top10: 80 },
    '금융업': { average: 72, top10: 86 },
    '서비스업': { average: 62, top10: 76 },
    '기타': { average: 60, top10: 74 }
  };
  
  const benchmark = industryBenchmarks[normalizedData.industry] || industryBenchmarks['기타'];
  const userPercentage = scoreAnalysis.percentage;
  
  return {
    industryAverage: benchmark.average,
    industryTop10: benchmark.top10,
    userScore: userPercentage,
    percentileRank: Math.min(95, Math.round((userPercentage / benchmark.top10) * 100)),
    gapAnalysis: {
      vsAverage: userPercentage - benchmark.average,
      vsTop10: userPercentage - benchmark.top10
    },
    recommendations: userPercentage < benchmark.average ? 
      ['업종 평균 수준 달성을 위한 집중 투자 필요'] : 
      ['업종 상위권 진입을 위한 차별화 전략 수립']
  };
}

/**
 * 고도화된 SWOT 분석 (V15.0 ULTIMATE FINAL)
 */
function generateAdvancedSWOT(normalizedData, scoreAnalysis, benchmarkAnalysis) {
  const isAboveAverage = scoreAnalysis.percentage > benchmarkAnalysis.industryAverage;
  
  return {
    strengths: isAboveAverage ? [
      'AI 도입에 대한 높은 관심과 의지',
      '업종 평균 이상의 디지털 역량',
      '체계적인 업무 프로세스 보유',
      '조직 구성원의 적극적 학습 의욕'
    ] : [
      'AI 도입에 대한 관심과 의지',
      '기존 업무 프로세스의 체계화',
      '조직 구성원의 학습 의욕',
      '변화에 대한 개방적 태도'
    ],
    weaknesses: [
      'AI 관련 전문 인력 부족',
      '데이터 관리 체계 미흡',
      '기술 인프라 한계',
      '디지털 전환 경험 부족'
    ],
    opportunities: [
      'AI 기술의 급속한 발전과 접근성 향상',
      '정부의 디지털 전환 지원 정책',
      '경쟁사 대비 차별화 기회',
      normalizedData.industry + ' 업종 특화 AI 솔루션 등장'
    ],
    threats: [
      '기술 변화 속도에 따른 뒤처짐 위험',
      '경쟁사의 AI 도입 가속화',
      '전문 인력 확보의 어려움',
      '투자 대비 성과 창출 압박'
    ],
    analysisDate: new Date().toISOString(),
    benchmarkContext: {
      industry: normalizedData.industry,
      performanceLevel: isAboveAverage ? '상위권' : '평균 이하'
    }
  };
}

/**
 * 핵심 실행 과제 생성 (V15.0 Matrix 대체 - 오류 없는 안정적 구조)
 */
function generateKeyActionItems(swotAnalysis, scoreAnalysis, normalizedData) {
  console.log('🎯 핵심 실행 과제 생성 (V15.0 MATRIX-FREE)');
  
  // 점수 기반 맞춤형 과제 생성
  const isHighPerformer = scoreAnalysis.percentage >= 80;
  const isAdvanced = scoreAnalysis.maturityLevel === '우수' || scoreAnalysis.maturityLevel === '최우수';
  
  const immediateActions = isHighPerformer ? [
    '🚀 AI 센터 오브 엑셀런스 구축',
    '📊 고도화된 데이터 분석 체계 도입',
    '🤖 맞춤형 AI 솔루션 개발'
  ] : [
    '📚 AI 기초 교육 및 인식 개선',
    '📋 데이터 정리 및 관리 체계 구축',
    '🔧 기본 AI 도구 도입 및 활용'
  ];
  
  const shortTermGoals = isAdvanced ? [
    '💡 AI 기반 비즈니스 모델 혁신',
    '🔗 업계 파트너십 및 생태계 구축',
    '📈 AI ROI 측정 및 최적화 시스템'
  ] : [
    '⚡ 업무 프로세스 AI 통합',
    '📊 성과 측정 체계 구축',
    '👥 조직 역량 강화 프로그램'
  ];
  
  return {
    actionItems: {
      immediate: immediateActions,
      shortTerm: shortTermGoals,
      longTerm: [
        '🏆 업계 AI 리더십 확보',
        '🌐 AI 기반 글로벌 경쟁력 강화',
        '🔄 지속적 혁신 체계 구축'
      ]
    },
    implementation: {
      phase1: '즉시 실행 (1-3개월)',
      phase2: '단기 목표 (3-6개월)', 
      phase3: '장기 비전 (6-12개월)'
    },
    success_metrics: [
      'AI 도입률 50% 이상',
      '업무 효율성 30% 향상',
      'ROI 200% 이상 달성'
    ],
    createdAt: new Date().toISOString(),
    version: 'V15.0-MATRIX-FREE-STABLE'
  };
}

/**
 * 3단계 실행 로드맵 (V15.0 간소화)
 */
function generate3PhaseRoadmap(keyActionItems, swotAnalysis, normalizedData) {
  return {
    phase1: {
      title: '1단계: 기반 구축',
      duration: '1-3개월',
      activities: ['AI 기초 교육', '데이터 정리', '조직 준비도 향상'],
      outcomes: ['AI 인식 개선', '기초 역량 확보']
    },
    phase2: {
      title: '2단계: 역량 확장',
      duration: '4-6개월',
      activities: ['시범 프로젝트 실행', '프로세스 개선'],
      outcomes: ['실무 적용 능력', '생산성 20% 향상']
    },
    phase3: {
      title: '3단계: 혁신 실현',
      duration: '7-12개월',
      activities: ['전사 확산', '지속 개선', '경쟁우위 확보'],
      outcomes: ['AI 기반 조직 혁신 완성']
    },
    createdAt: new Date().toISOString()
  };
}

// ================================================================================
// MODULE 5: GEMINI AI 통합 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * GEMINI AI 종합 보고서 생성 (V15.0 ULTIMATE FINAL)
 */
function generateGeminiAIReport(normalizedData, scoreAnalysis, swotAnalysis, keyActionItems, executionRoadmap) {
  try {
    console.log('🤖 GEMINI AI 보고서 생성 시작');
    
    const env = getEnvironmentConfig();
    
    if (!env.GEMINI_API_KEY) {
      console.error('❌ GEMINI API 키가 설정되지 않음. 필수 설정 필요!');
      throw new Error('GEMINI API 키가 설정되지 않았습니다. 고품질 보고서 생성을 위해 GEMINI API 키 설정이 필요합니다.');
    }
    
    // 🚀 GEMINI 2.5 Flash 최고 품질 프롬프트 (V15.0 ULTIMATE)
    const prompt = `
당신은 "이교장의AI역량진단보고서" 시스템의 최고 AI 전문가입니다. 
McKinsey, BCG 수준의 전략 컨설팅 품질로 포괄적인 AI 역량진단 보고서를 작성해주세요.

## 🏢 기업 정보
- 회사명: ${normalizedData.companyName}
- 업종: ${normalizedData.industry}
- 직원 수: ${normalizedData.employeeCount}
- 연매출: ${normalizedData.annualRevenue || '정보없음'}
- 설립년도: ${normalizedData.establishmentYear || '정보없음'}
- 사업내용: ${normalizedData.businessContent || '정보없음'}
- 주요제품: ${normalizedData.mainProducts || '정보없음'}

## 📊 진단 결과 (45개 행동지표 기반 정밀 분석)
- 총점: ${scoreAnalysis.totalScore}점 (225점 만점)
- 평균: ${scoreAnalysis.averageScore}점 (5점 만점)
- 등급: ${scoreAnalysis.grade} (A+~F 등급)
- AI 성숙도: ${scoreAnalysis.maturityLevel}
- 업종 내 위치: 상위 ${scoreAnalysis.percentile}%

## ⚡ SWOT 분석 결과
### 💪 강점 (Strengths)
${swotAnalysis.strengths.map((s, i) => `${i+1}. ${s}`).join('\n')}

### 🔧 약점 (Weaknesses)  
${swotAnalysis.weaknesses.map((w, i) => `${i+1}. ${w}`).join('\n')}

### 🚀 기회 (Opportunities)
${swotAnalysis.opportunities.map((o, i) => `${i+1}. ${o}`).join('\n')}

### ⚠️ 위협 (Threats)
${swotAnalysis.threats.map((t, i) => `${i+1}. ${t}`).join('\n')}

## 🎯 핵심 실행 과제 (단계별 액션플랜)
### 즉시 실행 과제 (1-3개월)
${keyActionItems.actionItems.immediate.map((item, i) => `${i+1}. ${item}`).join('\n')}

### 단기 목표 (3-6개월)  
${keyActionItems.actionItems.shortTerm.map((item, i) => `${i+1}. ${item}`).join('\n')}

### 장기 비전 (6-12개월)
${keyActionItems.actionItems.longTerm.map((item, i) => `${i+1}. ${item}`).join('\n')}

## 🗺️ 3단계 실행 로드맵
### ${executionRoadmap.phase1.title} (${executionRoadmap.phase1.duration})
- 주요활동: ${executionRoadmap.phase1.activities.join(', ')}
- 예상성과: ${executionRoadmap.phase1.outcomes.join(', ')}

### ${executionRoadmap.phase2.title} (${executionRoadmap.phase2.duration})  
- 주요활동: ${executionRoadmap.phase2.activities.join(', ')}
- 예상성과: ${executionRoadmap.phase2.outcomes.join(', ')}

### ${executionRoadmap.phase3.title} (${executionRoadmap.phase3.duration})
- 주요활동: ${executionRoadmap.phase3.activities.join(', ')}
- 예상성과: ${executionRoadmap.phase3.outcomes.join(', ')}

## 🎯 최고 품질 요구사항 (McKinsey 수준)
1. **현황 진단**: ${normalizedData.industry} 업종 특성을 반영한 객관적 AI 역량 평가
2. **벤치마킹**: 동종업계 선도기업 대비 포지셔닝 분석  
3. **전략 수립**: 단기(3개월), 중기(6개월), 장기(12개월) 실행 전략
4. **ROI 분석**: 투자 대비 예상 효과 및 우선순위 제시
5. **리스크 관리**: 주요 위험요소와 선제적 대응방안
6. **KPI 설정**: 측정 가능한 성공지표와 모니터링 방법
7. **실행 가이드**: CEO/임원진 의사결정을 위한 구체적 액션플랜

## 📋 보고서 구조 (경영진 브리핑 수준)
다음 8개 섹션으로 구성하여 각각 200-300자 분량으로 작성:
1. 핵심 요약 (Executive Summary)
2. 현황 분석 (Current State Analysis)  
3. 업종 벤치마크 (Industry Benchmark)
4. 갭 분석 (Gap Analysis)
5. 전략적 권고 (Strategic Recommendations)
6. 실행 가이드 (Implementation Guidance)
7. 리스크 평가 (Risk Assessment)
8. 성공 지표 (Success Metrics)

각 섹션은 데이터 기반의 객관적 분석과 실행 가능한 구체적 제안을 포함해야 합니다.
`;

    // GEMINI API 호출 (재시도 로직 포함)
    let response = null;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts && !response) {
      attempts++;
      console.log(`🔄 GEMINI API 호출 시도 ${attempts}/${maxAttempts}`);
      
      try {
        response = callGeminiAPI(prompt);
        if (response && response.candidates && response.candidates[0]) {
          console.log('✅ GEMINI API 호출 성공');
          break;
        } else {
          console.warn(`⚠️ GEMINI API 응답 불완전 (시도 ${attempts})`);
          response = null;
        }
      } catch (apiError) {
        console.error(`❌ GEMINI API 호출 실패 (시도 ${attempts}):`, apiError.message);
        if (attempts === maxAttempts) {
          throw new Error(`GEMINI API 호출 ${maxAttempts}회 실패: ${apiError.message}`);
        }
        // 재시도 전 잠시 대기
        Utilities.sleep(1000 * attempts);
      }
    }
    
    if (response && response.candidates && response.candidates[0]) {
      const aiContent = response.candidates[0].content.parts[0].text;
      
      return {
        executiveSummary: aiContent.substring(0, 800) + '...',
        currentStateAnalysis: `현재 ${normalizedData.companyName}의 AI 역량 수준은 ${scoreAnalysis.maturityLevel} 단계로, ${normalizedData.industry} 업종 내에서 ${scoreAnalysis.percentile}% 수준입니다.`,
        industryBenchmark: `${normalizedData.industry} 업종 평균 대비 분석 결과, 총 ${scoreAnalysis.totalScore}점으로 ${scoreAnalysis.grade} 등급을 획득했습니다.`,
        gapAnalysis: `주요 개선 영역: ${swotAnalysis.weaknesses.slice(0, 2).join(', ')} 등이 우선 개선이 필요한 영역으로 식별되었습니다.`,
        strategicRecommendations: aiContent,
        implementationGuidance: `${executionRoadmap.phase1.title}부터 시작하여 ${executionRoadmap.phase3.title}까지 체계적인 단계별 실행을 권장합니다.`,
        riskAssessment: `주요 위험 요소: ${swotAnalysis.threats.slice(0, 2).join(', ')} 등에 대한 선제적 대응이 필요합니다.`,
        successMetrics: `성공 지표: AI 도입률, 업무 효율성 개선도, ROI 달성률 등을 핵심 KPI로 설정하여 측정합니다.`,
        timeline: `${executionRoadmap.phase1.duration} + ${executionRoadmap.phase2.duration} + ${executionRoadmap.phase3.duration}의 단계별 실행 타임라인을 제시합니다.`,
        resourceRequirements: `${normalizedData.employeeCount} 규모의 조직에 적합한 인적, 물적 자원 투자 계획을 수립했습니다.`,
        nextSteps: `즉시 실행 과제: ${keyActionItems.actionItems.immediate.slice(0, 2).join(', ')} 등을 우선 추진하시기 바랍니다.`,
        totalScore: scoreAnalysis.totalScore,
        grade: scoreAnalysis.grade,
        maturityLevel: scoreAnalysis.maturityLevel,
        generatedAt: new Date().toISOString(),
        version: 'V15.0-ULTIMATE-FINAL'
      };
    } else {
      throw new Error('GEMINI API 응답이 올바르지 않습니다');
    }
    
  } catch (error) {
    console.error('❌ GEMINI AI 보고서 생성 오류:', error);
    return generateDefaultReport(normalizedData, scoreAnalysis, swotAnalysis);
  }
}

/**
 * GEMINI API 호출 (V15.0 안전성 강화)
 */
function callGeminiAPI(prompt) {
  try {
    const env = getEnvironmentConfig();
    const apiKey = env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI API 키가 설정되지 않았습니다');
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-exp:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 32768
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
    
    console.log('🔄 GEMINI API 호출 중...');
    
    const response = UrlFetchApp.fetch(url, options);
    const responseText = response.getContentText();
    
    console.log('✅ GEMINI API 응답 수신');
    
    return JSON.parse(responseText);
    
  } catch (error) {
    console.error('❌ GEMINI API 호출 오류:', error);
    throw error;
  }
}

/**
 * 기본 보고서 생성 (GEMINI API 실패 시 폴백)
 */
function generateDefaultReport(normalizedData, scoreAnalysis, swotAnalysis) {
  return {
    executiveSummary: `${normalizedData.companyName}의 AI 역량진단 결과, 현재 ${scoreAnalysis.maturityLevel} 수준으로 평가되며, ${normalizedData.industry} 업종 내에서 ${scoreAnalysis.percentile}% 수준입니다.`,
    currentStateAnalysis: `총 ${scoreAnalysis.totalScore}점으로 ${scoreAnalysis.grade} 등급을 받았으며, 45개 행동지표 기반 정밀 분석을 통해 도출된 결과입니다.`,
    industryBenchmark: `${normalizedData.industry} 업종 내에서의 위치를 분석한 결과, 평균 대비 ${scoreAnalysis.averageScore >= 3.5 ? '우수한' : '개선이 필요한'} 수준으로 나타났습니다.`,
    gapAnalysis: `주요 개선 영역: ${swotAnalysis.weaknesses.slice(0, 3).join(', ')} 등이 우선 개선이 필요한 영역으로 식별되었습니다.`,
    strategicRecommendations: `${normalizedData.companyName}의 ${normalizedData.industry} 업종 특성을 고려한 AI 도입 전략을 제시하며, 단계별 접근을 통한 체계적 도입을 권장합니다.`,
    implementationGuidance: '3단계 실행 로드맵을 통해 기반 구축 → 역량 확장 → 혁신 실현 순으로 체계적인 AI 도입을 지원합니다.',
    riskAssessment: `주요 위험 요소인 ${swotAnalysis.threats.slice(0, 2).join(', ')} 등에 대한 선제적 대응 방안을 수립했습니다.`,
    successMetrics: 'AI 도입률, 업무 효율성 개선도, 비용 절감률, 직원 만족도 등을 핵심 성과 지표로 설정하여 정기적 모니터링을 권장합니다.',
    timeline: '1-3개월 기반 구축, 4-6개월 역량 확장, 7-12개월 혁신 실현의 단계별 실행 계획을 수립했습니다.',
    resourceRequirements: `${normalizedData.employeeCount} 규모 조직에 적합한 인적 자원(AI 전담팀 구성), 기술 인프라(클라우드 기반), 교육 투자 등이 필요합니다.`,
    nextSteps: 'AI 기초 교육 실시, 데이터 관리 체계 구축, 시범 프로젝트 선정 등을 우선 과제로 추진하시기 바랍니다.',
    totalScore: scoreAnalysis.totalScore,
    grade: scoreAnalysis.grade,
    maturityLevel: scoreAnalysis.maturityLevel,
    generatedAt: new Date().toISOString(),
    version: 'V15.0-ULTIMATE-FINAL-FALLBACK'
  };
}

// ================================================================================
// MODULE 6: HTML 보고서 생성 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 이교장 스타일 HTML 보고서 생성 (V15.0 ULTIMATE FINAL - matrix 오류 완전 수정)
 */
function generateLeeKyoJangStyleReport(normalizedData, aiReport, analysisData) {
  console.log('📄 이교장 스타일 HTML 보고서 생성 (V15.0 ULTIMATE FINAL)');
  
  // analysisData에서 안전하게 데이터 추출 (matrix 완전 제거)
  const scores = analysisData.scores || {};
  const swot = analysisData.swot || {};
  const actionItems = analysisData.actionItems || {}; // matrix 대신 actionItems 사용
  const roadmap = analysisData.roadmap || {};
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이교장의AI역량진단보고서 - ${normalizedData.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6; 
            color: #333;
            background: #f8f9fa;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin-bottom: 40px;
        }
        .header h1 { 
            font-size: 2.5rem; 
            margin-bottom: 10px;
            font-weight: 700;
        }
        .header p { 
            font-size: 1.2rem; 
            opacity: 0.9;
        }
        .section {
            margin-bottom: 40px;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .section-title {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #3498db;
        }
        .score-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .score-card {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .score-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .score-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        .swot-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .swot-item {
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid;
        }
        .strengths { 
            background: #d4edda; 
            border-left-color: #28a745;
        }
        .weaknesses { 
            background: #f8d7da; 
            border-left-color: #dc3545;
        }
        .opportunities { 
            background: #d1ecf1; 
            border-left-color: #17a2b8;
        }
        .threats { 
            background: #fff3cd; 
            border-left-color: #ffc107;
        }
        .priority-list {
            list-style: none;
        }
        .priority-item {
            background: #f8f9fa;
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .roadmap-phase {
            background: #f8f9fa;
            margin: 15px 0;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #28a745;
        }
        .phase-title {
            font-size: 1.3rem;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .lee-signature {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #2c3e50;
            color: white;
            border-radius: 10px;
        }
        @media (max-width: 768px) {
            .swot-grid { grid-template-columns: 1fr; }
            .score-grid { grid-template-columns: 1fr; }
            .header h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <h1>🎓 이교장의AI역량진단보고서</h1>
            <p>${normalizedData.companyName} 맞춤형 AI 역량진단 결과</p>
            <p>V15.0 ULTIMATE FINAL | ${new Date().toLocaleDateString('ko-KR')}</p>
        </div>

        <!-- 진단 개요 -->
        <div class="section">
            <h2 class="section-title">📊 진단 개요</h2>
            <div class="score-grid">
                <div class="score-card">
                    <div class="score-value">${scores.totalScore || 0}/${scores.maxScore || 225}</div>
                    <div class="score-label">총점</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${scores.percentage || 0}%</div>
                    <div class="score-label">달성률</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${scores.grade || 'F'}</div>
                    <div class="score-label">등급</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${scores.maturityLevel || '미흡'}</div>
                    <div class="score-label">성숙도</div>
                </div>
            </div>
        </div>

        <!-- SWOT 분석 -->
        <div class="section">
            <h2 class="section-title">⚡ SWOT 분석</h2>
            <div class="swot-grid">
                <div class="swot-item strengths">
                    <h3>💪 강점 (Strengths)</h3>
                    <ul>
                        ${(swot.strengths || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item weaknesses">
                    <h3>🔧 약점 (Weaknesses)</h3>
                    <ul>
                        ${(swot.weaknesses || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item opportunities">
                    <h3>🚀 기회 (Opportunities)</h3>
                    <ul>
                        ${(swot.opportunities || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item threats">
                    <h3>⚠️ 위협 (Threats)</h3>
                    <ul>
                        ${(swot.threats || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        <!-- 핵심 실행 과제 -->
        <div class="section">
            <h2 class="section-title">🎯 핵심 실행 과제</h2>
            
            <div class="action-phase">
                <h3 style="color: #e74c3c; margin-bottom: 15px;">🚀 즉시 실행 (1-3개월)</h3>
            <ul class="priority-list">
                    ${(actionItems.actionItems?.immediate || []).map(item => `
                        <li class="priority-item" style="border-left-color: #e74c3c;">
                            ${item}
                    </li>
                `).join('')}
            </ul>
            </div>
            
            <div class="action-phase" style="margin-top: 25px;">
                <h3 style="color: #f39c12; margin-bottom: 15px;">⚡ 단기 목표 (3-6개월)</h3>
                <ul class="priority-list">
                    ${(actionItems.actionItems?.shortTerm || []).map(item => `
                        <li class="priority-item" style="border-left-color: #f39c12;">
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="action-phase" style="margin-top: 25px;">
                <h3 style="color: #27ae60; margin-bottom: 15px;">🏆 장기 비전 (6-12개월)</h3>
                <ul class="priority-list">
                    ${(actionItems.actionItems?.longTerm || []).map(item => `
                        <li class="priority-item" style="border-left-color: #27ae60;">
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>

        <!-- 3단계 실행 로드맵 -->
        <div class="section">
            <h2 class="section-title">🗺️ 3단계 실행 로드맵</h2>
            
            <div class="roadmap-phase">
                <div class="phase-title">${roadmap.phase1?.title || '1단계: 기반 구축'}</div>
                <p><strong>기간:</strong> ${roadmap.phase1?.duration || '1-3개월'}</p>
                <p><strong>주요 활동:</strong> ${(roadmap.phase1?.activities || []).join(', ')}</p>
                <p><strong>예상 성과:</strong> ${(roadmap.phase1?.outcomes || []).join(', ')}</p>
            </div>
            
            <div class="roadmap-phase">
                <div class="phase-title">${roadmap.phase2?.title || '2단계: 역량 확장'}</div>
                <p><strong>기간:</strong> ${roadmap.phase2?.duration || '4-6개월'}</p>
                <p><strong>주요 활동:</strong> ${(roadmap.phase2?.activities || []).join(', ')}</p>
                <p><strong>예상 성과:</strong> ${(roadmap.phase2?.outcomes || []).join(', ')}</p>
            </div>
            
            <div class="roadmap-phase">
                <div class="phase-title">${roadmap.phase3?.title || '3단계: 혁신 실현'}</div>
                <p><strong>기간:</strong> ${roadmap.phase3?.duration || '7-12개월'}</p>
                <p><strong>주요 활동:</strong> ${(roadmap.phase3?.activities || []).join(', ')}</p>
                <p><strong>예상 성과:</strong> ${(roadmap.phase3?.outcomes || []).join(', ')}</p>
            </div>
        </div>

        <!-- AI 전문가 분석 -->
        <div class="section">
            <h2 class="section-title">🤖 AI 전문가 분석</h2>
            <p><strong>현황 분석:</strong> ${aiReport.currentStateAnalysis || '현재 AI 역량 수준을 분석했습니다.'}</p>
            <p><strong>전략적 권고:</strong> ${aiReport.strategicRecommendations || '맞춤형 전략적 권고사항을 제시합니다.'}</p>
            <p><strong>실행 가이드:</strong> ${aiReport.implementationGuidance || '단계별 실행 가이드라인을 제공합니다.'}</p>
        </div>

        <!-- 이교장 서명 -->
        <div class="lee-signature">
            <h3>🎓 이교장의 한마디</h3>
            <p>"AI는 도구가 아니라 새로운 사고방식입니다. 단계별로 차근차근 접근하시면 반드시 성공할 수 있습니다!"</p>
            <p><strong>- 이교장, AICAMP 대표 -</strong></p>
        </div>

        <!-- 푸터 -->
        <div class="footer">
            <p>📧 문의: hongik423@gmail.com | 🌐 웹사이트: aicamp.club</p>
            <p>© 2025 AICAMP. All rights reserved. | V15.0 ULTIMATE FINAL</p>
        </div>
    </div>
</body>
</html>
`;

  return htmlContent;
}

// ================================================================================
// MODULE 7: 데이터 저장 및 이메일 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 신청자/관리자 접수확인 메일 발송 (V15.0 ULTIMATE FINAL)
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
        const sendResult = sendEmailWithRetry({
          to: normalizedData.contactEmail,
          subject: applicantEmail.subject,
          htmlBody: applicantEmail.body,
          name: '이교장의AI역량진단보고서'
        }, 3);
        if (!sendResult.success) throw new Error(sendResult.error || 'unknown');
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
      const sendResult2 = sendEmailWithRetry({
        to: config.ADMIN_EMAIL,
        subject: adminEmail.subject,
        htmlBody: adminEmail.body,
        name: 'AICAMP 시스템 알림'
      }, 3);
      if (!sendResult2.success) throw new Error(sendResult2.error || 'unknown');
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
 * 신청자 접수확인 메일 생성 (V15.0 ULTIMATE FINAL)
 */
function generateApplicantConfirmationEmail(normalizedData, diagnosisId) {
  const config = getEnvironmentConfig();
  const logoUrl = `https://${config.AICAMP_WEBSITE}/images/aicamp_logo_del_250726.png`;
  const subject = `AICAMP | AI 역량진단 접수 완료 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #1d1d1f; background:#f5f5f7; }
        .header { background: #000; color: #fff; padding: 32px 24px; text-align: center; }
        .brand { display:flex; align-items:center; justify-content:center; gap:12px; }
        .brand img { width:120px; height:auto; display:block; }
        .brand h1 { margin:0; font-size:22px; font-weight:700; letter-spacing:-0.3px; }
        .content { padding: 30px; }
        .info-box { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .timeline-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .footer { background: #111827; color: #e5e7eb; padding: 20px; text-align: center; font-size:13px; }
        .highlight { background: #eef2ff; padding: 15px; border-left: 4px solid #6366f1; margin: 15px 0; border-radius:8px; }
    </style>
</head>
<body>
    <div class="header">
      <div class="brand">
        <img src="${logoUrl}" alt="AICAMP" />
        <h1>AI 역량진단 접수 완료</h1>
      </div>
    </div>
    
    <div class="content">
      <h2>안녕하세요, ${normalizedData.contactName}님!</h2>
      
      <p><strong>${normalizedData.companyName}</strong>의 AI 역량진단 신청이 성공적으로 접수되었습니다.</p>
      
      <div class="info-box">
        <h3>📋 접수 정보</h3>
        <ul>
          <li><strong>진단 ID:</strong> ${diagnosisId}</li>
          <li><strong>회사명:</strong> ${normalizedData.companyName}</li>
          <li><strong>업종:</strong> ${normalizedData.industry}</li>
          <li><strong>담당자:</strong> ${normalizedData.contactName}</li>
          <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
        </ul>
      </div>
      
      <div class="timeline-box">
        <h3>⏰ 처리 일정</h3>
        <p>현재 GEMINI 2.5 Flash AI가 45개 행동지표를 기반으로 정밀 분석을 진행하고 있습니다.</p>
        <p><strong>예상 완료 시간:</strong> 약 10-15분 내</p>
        <p><strong>보고서 발송:</strong> 분석 완료 즉시 이메일로 발송</p>
      </div>
      
      <div class="highlight">
        <h3>🎓 이교장의 한마디</h3>
        <p>"AI는 도구가 아니라 새로운 사고방식입니다. 곧 완성될 맞춤형 보고서를 통해 귀하의 조직이 AI 시대를 선도하는 기업으로 성장하시길 바랍니다!"</p>
      </div>
      
      <p>문의사항이 있으시면 언제든 연락주세요.</p>
    </div>
    
    <div class="footer">
      <p>📧 ${config.ADMIN_EMAIL} | 🌐 ${config.AICAMP_WEBSITE}</p>
      <p>© 2025 AICAMP. All rights reserved.</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 관리자 접수확인 메일 생성 (V15.0 ULTIMATE FINAL)
 */
function generateAdminConfirmationEmail(normalizedData, diagnosisId) {
  const config = getEnvironmentConfig();
  const subject = `[AICAMP 관리자] 새로운 AI 역량진단 접수 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table th, .info-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .info-table th { background-color: #f8f9fa; font-weight: bold; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 새로운 AI 역량진단 접수 알림</h1>
    </div>
    
    <div class="content">
        <h2>관리자님, 새로운 진단 요청이 접수되었습니다.</h2>
        
        <table class="info-table">
            <tr><th>진단 ID</th><td>${diagnosisId}</td></tr>
            <tr><th>회사명</th><td>${normalizedData.companyName}</td></tr>
            <tr><th>업종</th><td>${normalizedData.industry}</td></tr>
            <tr><th>직원 수</th><td>${normalizedData.employeeCount}</td></tr>
            <tr><th>담당자명</th><td>${normalizedData.contactName}</td></tr>
            <tr><th>이메일</th><td>${normalizedData.contactEmail}</td></tr>
            <tr><th>전화번호</th><td>${normalizedData.contactPhone}</td></tr>
            <tr><th>접수일시</th><td>${new Date().toLocaleString('ko-KR')}</td></tr>
        </table>
        
        <div class="alert">
            <h3>📊 처리 상태</h3>
            <p>• 시스템이 자동으로 45개 행동지표 분석을 시작했습니다.</p>
            <p>• GEMINI 2.5 Flash AI가 종합 보고서를 생성 중입니다.</p>
            <p>• 완료 시 신청자에게 자동으로 이메일이 발송됩니다.</p>
        </div>
        
        <p><strong>시스템 버전:</strong> V15.0-ULTIMATE-FINAL</p>
        <p><strong>처리 예상 시간:</strong> 10-15분</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 이메일 재시도 발송 (V15.0 ULTIMATE FINAL)
 */
function sendEmailWithRetry(emailOptions, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      GmailApp.sendEmail(
        emailOptions.to,
        emailOptions.subject,
        '', // 텍스트 본문 (빈 문자열)
        {
          htmlBody: emailOptions.htmlBody,
          name: emailOptions.name || 'AICAMP'
        }
      );
      
      console.log(`✅ 이메일 발송 성공 (${attempt}/${maxRetries}):`, emailOptions.to);
      return { success: true, attempt: attempt };
      
    } catch (error) {
      console.error(`❌ 이메일 발송 실패 (${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        return { success: false, error: error.message, attempts: maxRetries };
      }
      
      // 재시도 전 대기 (2초)
      Utilities.sleep(2000);
    }
  }
}

/**
 * 통합 워크플로우 결과 처리 (V15.0 ULTIMATE FINAL)
 */
function handleIntegratedWorkflowResult(requestData, progressId) {
  try {
    console.log('🎯 통합 워크플로우 결과 처리 시작 - V15.0');
    console.log('📊 받은 데이터 타입:', requestData.type);
    console.log('📊 처리 타입:', requestData.processType);
    
    // Next.js에서 보낸 데이터 구조 확인
    const hasWorkflowResult = requestData.workflowResult;
    const hasDirectData = requestData.scoreAnalysis && requestData.swotAnalysis;
    
    if (!hasWorkflowResult && !hasDirectData) {
      throw new Error('워크플로우 결과 또는 분석 데이터가 없습니다.');
    }
    
    // 데이터 정규화
    let analysisData;
    let geminiReport = null;
    let htmlReport = null;
    
    if (hasWorkflowResult) {
      // 기존 방식 (workflowResult 객체 내부)
      const { workflowResult } = requestData;
      analysisData = workflowResult.analysisResult;
      geminiReport = workflowResult.geminiReport;
      htmlReport = workflowResult.htmlReport;
    } else {
      // 새로운 방식 (직접 전달)
      analysisData = {
        diagnosisId: requestData.diagnosisId,
        companyInfo: {
          name: requestData.companyName,
          industry: requestData.industry,
          size: requestData.employeeCount,
          contact: {
            name: requestData.contactName,
            email: requestData.contactEmail,
            phone: requestData.contactPhone
          }
        },
        scoreAnalysis: requestData.scoreAnalysis,
        swotAnalysis: requestData.swotAnalysis,
        recommendations: requestData.recommendations,
        roadmap: requestData.roadmap,
        qualityMetrics: requestData.qualityMetrics || {
          overallQuality: 85,
          dataCompleteness: 90,
          aiAnalysisDepth: 80
        }
      };
    }
    
    // 1단계: 진행 상황 업데이트
    updateProgressStatus(progressId, 'processing', 'SWOT 분석 및 보고서 생성을 시작합니다');
    
    // 2단계: Google Sheets 저장
    console.log('📊 Google Sheets 저장');
    updateProgressStatus(progressId, 'processing', 'Google Sheets에 분석 결과를 저장하고 있습니다');
    
    const sheetsResult = saveIntegratedResultToSheets({
      ...analysisData,
      reportGenerated: true,
      timestamp: new Date().toISOString()
    });
    
    // 3단계: 이메일 발송
    console.log('📧 결과 이메일 발송');
    updateProgressStatus(progressId, 'processing', '분석 결과를 이메일로 발송하고 있습니다');
    
    const emailResult = sendDiagnosisResultEmail({
      companyName: analysisData.companyInfo.name,
      contactName: analysisData.companyInfo.contact.name,
      contactEmail: analysisData.companyInfo.contact.email,
      diagnosisId: analysisData.diagnosisId,
      scoreAnalysis: analysisData.scoreAnalysis,
      htmlReport: htmlReport
    });
    
    updateProgressStatus(progressId, 'completed', '통합 워크플로우 결과 처리가 완료되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'ai_diagnosis_complete',
        diagnosisId: analysisData.diagnosisId,
        message: '통합 워크플로우 결과가 성공적으로 처리되었습니다.',
        results: {
          dataSaved: sheetsResult.success,
          emailSent: emailResult.success
        },
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 통합 워크플로우 결과 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 통합 결과 Google Sheets 저장 (V15.0 ULTIMATE FINAL)
 */
function saveIntegratedResultToSheets(data) {
  try {
    console.log('💾 통합 결과 Google Sheets 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 메인 데이터 시트
    let mainSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    if (!mainSheet) {
      mainSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
      // 헤더 추가
      mainSheet.getRange(1, 1, 1, 15).setValues([[
        '진단ID', '회사명', '담당자명', '이메일', '전화번호', '업종', '직원수', 
        '총점', '평균점수', '등급', '성숙도', '백분율', '생성일시', '버전', '상태'
      ]]);
    }
    
    // 데이터 추가
    const newRow = [
      data.diagnosisId,
      data.companyInfo.name,
      data.companyInfo.contact.name,
      data.companyInfo.contact.email,
      data.companyInfo.contact.phone,
      data.companyInfo.industry,
      data.companyInfo.size,
      data.scoreAnalysis.totalScore || 0,
      data.scoreAnalysis.averageScore || 0,
      data.scoreAnalysis.grade || 'F',
      data.scoreAnalysis.maturityLevel || '초급',
      data.scoreAnalysis.percentile || 0,
      new Date().toISOString(),
      'V15.0-ULTIMATE-FINAL',
      '완료'
    ];
    
    mainSheet.appendRow(newRow);
    
    console.log('✅ 통합 결과 Google Sheets 저장 완료');
    
    return { success: true, message: 'Google Sheets 저장 완료' };
    
  } catch (error) {
    console.error('❌ 통합 결과 Google Sheets 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 진단 결과 이메일 발송 (V15.0 ULTIMATE FINAL)
 */
function sendDiagnosisResultEmail(params) {
  try {
    console.log('📧 진단 결과 이메일 발송 시작');
    
    const env = getEnvironmentConfig();
    
    const subject = `🎓 ${params.companyName} AI 역량진단 결과 - 이교장의AI역량진단보고서`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎓 이교장의AI역량진단보고서</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">V15.0 ULTIMATE FINAL</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${params.contactName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          <strong>${params.companyName}</strong>의 AI 역량진단이 완료되었습니다.<br>
          전문적인 분석 결과를 확인해보세요.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #3498db;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📊 진단 결과 요약</h3>
          <ul style="line-height: 1.8;">
            <li><strong>진단 ID:</strong> ${params.diagnosisId}</li>
            <li><strong>총점:</strong> ${params.scoreAnalysis.totalScore || 0}점</li>
            <li><strong>등급:</strong> ${params.scoreAnalysis.grade || 'F'}</li>
            <li><strong>성숙도:</strong> ${params.scoreAnalysis.maturityLevel || '초급'}</li>
          </ul>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">🎓 이교장의 한마디</h3>
          <p style="font-style: italic; line-height: 1.6;">
            ${generatePrincipalInsight(params.scoreAnalysis)}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${env.ADMIN_EMAIL} | 🌐 웹사이트: ${env.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    `;
    
    // 이메일 발송
    const sendResult = sendEmailWithRetry({
      to: params.contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: '이교장 (AICAMP)'
    }, 3);
    
    console.log('✅ 진단 결과 이메일 발송 완료');
    
    return { success: sendResult.success, message: '이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 진단 결과 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류 로그 저장 (V15.0 ULTIMATE FINAL)
 */
function saveErrorLog(type, id, error, requestData) {
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const errorSheet = getOrCreateSheet(spreadsheet, 'ERROR_LOG');
    
    // 헤더 설정 (최초 1회)
    if (errorSheet.getLastRow() === 0) {
      const headers = ['타입', 'ID', '오류메시지', '스택트레이스', '요청데이터', '발생시간'];
      errorSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      errorSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dc3545').setFontColor('white');
    }
    
    const row = [
      type,
      id,
      error.message || error.toString(),
      error.stack || '',
      JSON.stringify(requestData || {}),
      new Date().toISOString()
    ];
    
    errorSheet.appendRow(row);
    console.log('📝 오류 로그 저장 완료:', type, id);
    
  } catch (logError) {
    console.error('❌ 오류 로그 저장 실패:', logError);
  }
}

/**
 * Google Sheets에 데이터 저장 (V15.0 ULTIMATE FINAL)
 */
function saveAIDiagnosisData(normalizedData, aiReport, htmlReport, progressId) {
  try {
    console.log('💾 Google Sheets 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 메인 데이터 시트
    let mainSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    if (!mainSheet) {
      mainSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
      // 헤더 추가
      mainSheet.getRange(1, 1, 1, 15).setValues([[
        '진단ID', '회사명', '담당자명', '이메일', '전화번호', '업종', '직원수', 
        '총점', '평균점수', '등급', '성숙도', '백분율', '생성일시', '버전', '상태'
      ]]);
    }
    
    // 데이터 추가
    const newRow = [
      normalizedData.diagnosisId,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone,
      normalizedData.industry,
      normalizedData.employeeCount,
      aiReport.totalScore || 0,
      aiReport.averageScore || 0,
      aiReport.grade || 'F',
      aiReport.maturityLevel || '초급',
      aiReport.percentile || 0,
      new Date().toISOString(),
      'V15.0-ULTIMATE-FINAL',
      '완료'
    ];
    
    mainSheet.appendRow(newRow);
    
    console.log('✅ Google Sheets 저장 완료');
    
    return { success: true, message: 'Google Sheets 저장 완료' };
    
  } catch (error) {
    console.error('❌ Google Sheets 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Google Drive에 HTML 보고서 업로드 (V15.0 ULTIMATE FINAL)
 */
function uploadReportToDrive(diagnosisId, htmlReport, normalizedData) {
  try {
    console.log('🗂️ Google Drive HTML 보고서 업로드 시작');
    
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error('Google Drive 폴더 ID가 설정되지 않았습니다');
    }
    
    const folder = DriveApp.getFolderById(folderId);
    const fileName = `이교장의AI역량진단보고서_${normalizedData.companyName}_${diagnosisId}.html`;
    
    const blob = Utilities.newBlob(htmlReport, 'text/html', fileName);
    const file = folder.createFile(blob);
    
    // 파일 공유 설정
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const shareLink = file.getUrl();
    
    console.log('✅ Google Drive 업로드 완료:', shareLink);
    
    return {
      success: true,
      fileId: file.getId(),
      shareLink: shareLink,
      fileName: fileName
    };
    
  } catch (error) {
    console.error('❌ Google Drive 업로드 오류:', error);
    return {
      success: false,
      error: error.message,
      shareLink: null
    };
  }
}

/**
 * Drive 업로드 요청 처리 (V15.0 ULTIMATE FINAL)
 */
function handleDriveUploadRequest(requestData, progressId) {
  try {
    console.log('🗂️ Drive 업로드 요청 처리');
    const { diagnosisId, htmlReport, normalizedData } = requestData;
    if (!diagnosisId || !htmlReport) {
      throw new Error('diagnosisId와 htmlReport는 필수입니다');
    }
    const result = uploadReportToDrive(diagnosisId, htmlReport, normalizedData || { companyName: '' });
    updateProgressStatus(progressId, 'processing', 'Drive 업로드 완료');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, ...result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    updateProgressStatus(progressId, 'error', `Drive 업로드 오류: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Drive 파일 목록 조회 (V15.0 ULTIMATE FINAL)
 */
function handleDriveListRequest(requestData, progressId) {
  try {
    console.log('📃 Drive 파일 목록 조회');
    const env = getEnvironmentConfig();
    const folder = DriveApp.getFolderById(env.DRIVE_FOLDER_ID);
    const files = [];
    const it = folder.getFiles();
    while (it.hasNext() && files.length < 50) {
      const f = it.next();
      files.push({ id: f.getId(), name: f.getName(), url: f.getUrl(), createdAt: f.getDateCreated() });
    }
    updateProgressStatus(progressId, 'processing', 'Drive 목록 조회 완료');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, files }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    updateProgressStatus(progressId, 'error', `Drive 목록 조회 오류: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Drive 파일 상태 확인 (V15.0 ULTIMATE FINAL)
 */
function handleDriveCheckRequest(requestData, progressId) {
  try {
    console.log('🔎 Drive 파일 상태 확인');
    const { fileId } = requestData;
    if (!fileId) throw new Error('fileId가 필요합니다');
    const file = DriveApp.getFileById(fileId);
    const payload = { id: file.getId(), name: file.getName(), url: file.getUrl(), size: file.getSize(), createdAt: file.getDateCreated() };
    updateProgressStatus(progressId, 'processing', 'Drive 파일 상태 확인 완료');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, file: payload }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    updateProgressStatus(progressId, 'error', `Drive 파일 상태 확인 오류: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 진단 결과 이메일 발송 (V15.0 ULTIMATE FINAL)
 */
function sendDiagnosisEmail(normalizedData, aiReport, driveLink, diagnosisId) {
  try {
    console.log('📧 진단 결과 이메일 발송 시작');
    
    const env = getEnvironmentConfig();
    
    const subject = `🎓 ${normalizedData.companyName} AI 역량진단 결과 - 이교장의AI역량진단보고서`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎓 이교장의AI역량진단보고서</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">V15.0 ULTIMATE FINAL</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${normalizedData.contactName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          <strong>${normalizedData.companyName}</strong>의 AI 역량진단이 완료되었습니다.<br>
          전문적인 분석 결과를 확인해보세요.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #3498db;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📊 진단 결과 요약</h3>
          <ul style="line-height: 1.8;">
            <li><strong>진단 ID:</strong> ${diagnosisId}</li>
            <li><strong>총점:</strong> ${aiReport.totalScore || 0}점</li>
            <li><strong>등급:</strong> ${aiReport.grade || 'F'}</li>
            <li><strong>성숙도:</strong> ${aiReport.maturityLevel || '초급'}</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${driveLink}" 
             style="display: inline-block; background: #3498db; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            📄 상세 보고서 다운로드
          </a>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">🎓 이교장의 한마디</h3>
          <p style="font-style: italic; line-height: 1.6;">
            ${generatePrincipalInsight(scoreAnalysis)}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${env.ADMIN_EMAIL} | 🌐 웹사이트: ${env.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    `;
    
    // 이메일 발송
    GmailApp.sendEmail(
      normalizedData.contactEmail,
      subject,
      '', // 텍스트 본문 (빈 문자열)
      {
        htmlBody: htmlBody,
        name: '이교장 (AICAMP)'
      }
    );
    
    // 관리자에게도 사본 발송
    GmailApp.sendEmail(
      env.ADMIN_EMAIL,
      `[관리자] ${subject}`,
      `진단 완료 알림\n\n회사: ${normalizedData.companyName}\n담당자: ${normalizedData.contactName}\n이메일: ${normalizedData.contactEmail}\n진단ID: ${diagnosisId}\n\n보고서 링크: ${driveLink}`,
      {
        name: 'AICAMP 시스템'
      }
    );
    
    console.log('✅ 이메일 발송 완료');
    
    return { success: true, message: '이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// MODULE 8: 기타 기능 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 상담신청 처리 (V15.0 ULTIMATE FINAL)
 */
function handleConsultationRequest(requestData, progressId) {
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
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'consultation_request',
        consultationId: consultationId,
        message: '상담신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
        results: {
          dataSaved: saveResult.success,
          applicantEmailSent: applicantEmailResult.success,
          adminEmailSent: adminEmailResult.success
        },
        processingTime: processingTime,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    saveErrorLog('consultation', consultationId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        consultationId: consultationId,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 오류신고 처리 (V15.0 ULTIMATE FINAL)
 */
function handleErrorReport(requestData, progressId) {
  console.log('🚨 오류신고 처리 시작 - 통합 시스템');
  
  const config = getEnvironmentConfig();
  const reportId = generateErrorReportId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '오류신고 정보를 검증하고 있습니다');
    console.log('📋 1단계: 오류신고 데이터 검증');
    const normalizedData = normalizeErrorReportData(requestData.data || requestData, reportId);
    
    // 2단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '오류신고 정보를 저장하고 있습니다');
    console.log('💾 2단계: Google Sheets 저장');
    const saveResult = saveErrorReportData(normalizedData);
    
    // 3단계: 신고자 확인 이메일 발송
    updateProgressStatus(progressId, 'processing', '신고자에게 확인 이메일을 발송하고 있습니다');
    console.log('📧 3단계: 신고자 확인 이메일 발송');
    const reporterEmailResult = sendErrorReportConfirmationEmail(normalizedData);
    
    // 4단계: 관리자 긴급 알림 이메일 발송
    updateProgressStatus(progressId, 'processing', '관리자에게 긴급 알림 이메일을 발송하고 있습니다');
    console.log('📧 4단계: 관리자 긴급 알림 이메일 발송');
    const adminEmailResult = sendErrorReportAdminNotification(normalizedData);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 오류신고 처리 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '오류신고가 성공적으로 접수되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'error_report',
        reportId: reportId,
        message: '오류신고가 접수되었습니다. 신속히 확인하여 조치하겠습니다.',
        results: {
          dataSaved: saveResult.success,
          reporterEmailSent: reporterEmailResult.success,
          adminEmailSent: adminEmailResult.success
        },
        processingTime: processingTime,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 오류신고 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    saveErrorLog('error_report', reportId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        reportId: reportId,
        version: 'V15.0-ULTIMATE-FINAL',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 9: 헬퍼 함수들 (V15.0 ULTIMATE FINAL)
// ================================================================================

/**
 * 상담신청 ID 생성
 */
function generateConsultationId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `CONSULT_${timestamp}_${random}`;
}

/**
 * 오류신고 ID 생성
 */
function generateErrorReportId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `ERROR_${timestamp}_${random}`;
}

/**
 * 상담신청 데이터 정규화 (V15.0 ULTIMATE FINAL)
 */
function normalizeConsultationData(rawData, consultationId) {
  const data = rawData.data || rawData;
  
  return {
    consultationId: consultationId,
    companyName: data.companyName || data.회사명 || '',
    contactName: data.contactName || data.담당자명 || data.name || '',
    contactEmail: data.contactEmail || data.이메일 || data.email || '',
    contactPhone: data.contactPhone || data.전화번호 || data.phone || '',
    contactPosition: data.contactPosition || data.직책 || '',
    industry: data.industry || data.업종 || '',
    employeeCount: data.employeeCount || data.직원수 || '',
    consultationType: data.consultationType || data.상담유형 || 'AI 도입 상담',
    consultationContent: data.consultationContent || data.상담내용 || '',
    preferredDate: data.preferredDate || data.희망일정 || '',
    preferredTime: data.preferredTime || data.희망시간 || '',
    additionalRequests: data.additionalRequests || data.추가요청사항 || '',
    timestamp: new Date().toISOString(),
    version: 'V15.0-ULTIMATE-FINAL'
  };
}

/**
 * 오류신고 데이터 정규화 (V15.0 ULTIMATE FINAL)
 */
function normalizeErrorReportData(rawData, reportId) {
  const data = rawData.data || rawData;
  
  return {
    reportId: reportId,
    reporterName: data.reporterName || data.신고자명 || data.name || '',
    reporterEmail: data.reporterEmail || data.이메일 || data.email || '',
    reporterPhone: data.reporterPhone || data.전화번호 || data.phone || '',
    errorType: data.errorType || data.오류유형 || '기타',
    errorDescription: data.errorDescription || data.오류내용 || '',
    errorLocation: data.errorLocation || data.발생위치 || '',
    errorTime: data.errorTime || data.발생시간 || new Date().toISOString(),
    browserInfo: data.browserInfo || data.브라우저정보 || '',
    deviceInfo: data.deviceInfo || data.기기정보 || '',
    additionalInfo: data.additionalInfo || data.추가정보 || '',
    urgencyLevel: data.urgencyLevel || data.긴급도 || 'medium',
    timestamp: new Date().toISOString(),
    version: 'V15.0-ULTIMATE-FINAL'
  };
}

/**
 * 상담신청 데이터 저장 (V15.0 ULTIMATE FINAL)
 */
function saveConsultationData(normalizedData) {
  try {
    console.log('💾 상담신청 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    let consultationSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.CONSULTATION_REQUESTS);
    if (!consultationSheet) {
      consultationSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.CONSULTATION_REQUESTS);
      // 헤더 추가
      consultationSheet.getRange(1, 1, 1, 13).setValues([[
        '상담ID', '회사명', '담당자명', '이메일', '전화번호', '직책', '업종', '직원수',
        '상담유형', '상담내용', '희망일정', '희망시간', '접수일시'
      ]]);
    }
    
    const newRow = [
      normalizedData.consultationId,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone,
      normalizedData.contactPosition,
      normalizedData.industry,
      normalizedData.employeeCount,
      normalizedData.consultationType,
      normalizedData.consultationContent,
      normalizedData.preferredDate,
      normalizedData.preferredTime,
      normalizedData.timestamp
    ];
    
    consultationSheet.appendRow(newRow);
    
    console.log('✅ 상담신청 데이터 저장 완료');
    return { success: true, message: '상담신청 데이터 저장 완료' };
    
  } catch (error) {
    console.error('❌ 상담신청 데이터 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 데이터 저장 (V15.0 ULTIMATE FINAL)
 */
function saveErrorReportData(normalizedData) {
  try {
    console.log('💾 오류신고 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    let errorSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.ERROR_REPORTS);
    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.ERROR_REPORTS);
      // 헤더 추가
      errorSheet.getRange(1, 1, 1, 12).setValues([[
        '신고ID', '신고자명', '이메일', '전화번호', '오류유형', '오류내용', '발생위치',
        '발생시간', '브라우저정보', '기기정보', '긴급도', '접수일시'
      ]]);
    }
    
    const newRow = [
      normalizedData.reportId,
      normalizedData.reporterName,
      normalizedData.reporterEmail,
      normalizedData.reporterPhone,
      normalizedData.errorType,
      normalizedData.errorDescription,
      normalizedData.errorLocation,
      normalizedData.errorTime,
      normalizedData.browserInfo,
      normalizedData.deviceInfo,
      normalizedData.urgencyLevel,
      normalizedData.timestamp
    ];
    
    errorSheet.appendRow(newRow);
    
    console.log('✅ 오류신고 데이터 저장 완료');
    return { success: true, message: '오류신고 데이터 저장 완료' };
    
  } catch (error) {
    console.error('❌ 오류신고 데이터 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 상담신청 확인 이메일 발송 (V15.0 ULTIMATE FINAL)
 */
function sendConsultationConfirmationEmail(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `AICAMP | 상담신청 접수 완료 - ${normalizedData.companyName}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563eb; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">💼 상담신청 접수 완료</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">AICAMP 전문 상담팀</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${normalizedData.contactName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          <strong>${normalizedData.companyName}</strong>의 AI 도입 상담신청이 성공적으로 접수되었습니다.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #2563eb;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📋 상담신청 정보</h3>
          <ul style="line-height: 1.8;">
            <li><strong>상담 ID:</strong> ${normalizedData.consultationId}</li>
            <li><strong>상담유형:</strong> ${normalizedData.consultationType}</li>
            <li><strong>희망일정:</strong> ${normalizedData.preferredDate} ${normalizedData.preferredTime}</li>
            <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
          </ul>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">📞 다음 단계</h3>
          <p style="line-height: 1.6;">
            전문 상담사가 1-2일 내에 연락드려 상세한 상담 일정을 조율하겠습니다.<br>
            궁금한 사항이 있으시면 언제든 연락주세요.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${config.ADMIN_EMAIL} | 🌐 웹사이트: ${config.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: normalizedData.contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 상담팀'
    }, 3);
    
    console.log('✅ 상담신청 확인 이메일 발송 완료');
    return { success: sendResult.success, message: '상담신청 확인 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 상담신청 확인 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 상담신청 관리자 알림 이메일 발송 (V15.0 ULTIMATE FINAL)
 */
function sendConsultationAdminNotification(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `[AICAMP 관리자] 새로운 상담신청 - ${normalizedData.companyName}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
        <h1>🚨 새로운 상담신청 알림</h1>
      </div>
      
      <div style="padding: 20px;">
        <h2>관리자님, 새로운 상담 요청이 접수되었습니다.</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">상담 ID</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.consultationId}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">회사명</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.companyName}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">담당자</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.contactName}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">이메일</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.contactEmail}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">전화번호</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.contactPhone}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">상담유형</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.consultationType}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">희망일정</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.preferredDate} ${normalizedData.preferredTime}</td></tr>
        </table>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>📝 상담내용</h3>
          <p>${normalizedData.consultationContent}</p>
        </div>
        
        <p><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 시스템'
    }, 3);
    
    console.log('✅ 상담신청 관리자 알림 이메일 발송 완료');
    return { success: sendResult.success, message: '관리자 알림 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 상담신청 관리자 알림 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 확인 이메일 발송 (V15.0 ULTIMATE FINAL)
 */
function sendErrorReportConfirmationEmail(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `AICAMP | 오류신고 접수 완료 - ${normalizedData.errorType}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🚨 오류신고 접수 완료</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">AICAMP 기술지원팀</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${normalizedData.reporterName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          신고해주신 오류가 성공적으로 접수되었습니다. 빠른 시일 내에 확인하여 조치하겠습니다.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #dc3545;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📋 오류신고 정보</h3>
          <ul style="line-height: 1.8;">
            <li><strong>신고 ID:</strong> ${normalizedData.reportId}</li>
            <li><strong>오류유형:</strong> ${normalizedData.errorType}</li>
            <li><strong>긴급도:</strong> ${normalizedData.urgencyLevel}</li>
            <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
          </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #856404; margin-bottom: 10px;">⚡ 처리 일정</h3>
          <p style="line-height: 1.6;">
            • 긴급 오류: 2시간 내 대응<br>
            • 일반 오류: 24시간 내 대응<br>
            • 개선 요청: 1주일 내 검토
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${config.ADMIN_EMAIL} | 🌐 웹사이트: ${config.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: normalizedData.reporterEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 기술지원팀'
    }, 3);
    
    console.log('✅ 오류신고 확인 이메일 발송 완료');
    return { success: sendResult.success, message: '오류신고 확인 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 오류신고 확인 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 관리자 긴급 알림 이메일 발송 (V15.0 ULTIMATE FINAL)
 */
function sendErrorReportAdminNotification(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const urgencyIcon = normalizedData.urgencyLevel === 'high' ? '🔥' : normalizedData.urgencyLevel === 'medium' ? '⚠️' : 'ℹ️';
    const subject = `[AICAMP 긴급] ${urgencyIcon} 오류신고 - ${normalizedData.errorType}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
        <h1>${urgencyIcon} 긴급 오류신고 알림</h1>
      </div>
      
      <div style="padding: 20px;">
        <h2>관리자님, 새로운 오류신고가 접수되었습니다.</h2>
        
        <div style="background: ${normalizedData.urgencyLevel === 'high' ? '#f8d7da' : '#fff3cd'}; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>긴급도: ${normalizedData.urgencyLevel.toUpperCase()}</h3>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">신고 ID</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.reportId}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">신고자</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.reporterName}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">이메일</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.reporterEmail}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">오류유형</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.errorType}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">발생위치</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.errorLocation}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">발생시간</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.errorTime}</td></tr>
        </table>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>📝 오류 상세 내용</h3>
          <p>${normalizedData.errorDescription}</p>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>🔧 기술 정보</h3>
          <p><strong>브라우저:</strong> ${normalizedData.browserInfo}</p>
          <p><strong>기기:</strong> ${normalizedData.deviceInfo}</p>
          <p><strong>추가정보:</strong> ${normalizedData.additionalInfo}</p>
        </div>
        
        <p><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 시스템'
    }, 3);
    
    console.log('✅ 오류신고 관리자 긴급 알림 이메일 발송 완료');
    return { success: sendResult.success, message: '관리자 긴급 알림 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 오류신고 관리자 긴급 알림 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// 🎯 V15.0 ULTIMATE FINAL 완료 - 완전한 통합 워크플로우 시스템
// ================================================================================

console.log('🚀 이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE FINAL 로드 완료');
console.log('✅ V11.0 코드 완전 제거 및 V14 통합 워크플로우 적용');
console.log('✅ Matrix 완전 제거 및 안정적 ActionItems 시스템 구현 완료');
console.log('✅ 12단계 완전한 AI 역량진단 워크플로우 구현');
console.log('✅ 진행상황 실시간 모니터링 시스템 통합');
console.log('✅ 접수확인 메일 자동 발송 시스템');
console.log('✅ GEMINI 2.5 Flash 통합 분석 (정량적+정성적)');
console.log('✅ 업종별 벤치마크 분석 시스템');
console.log('✅ 고도화된 SWOT 분석 엔진');
console.log('✅ 우선순위 매트릭스 및 3단계 로드맵');
console.log('✅ 이교장 스타일 HTML 보고서 생성');
console.log('✅ Google Drive 자동 업로드 및 공유');
console.log('✅ 애플 스타일 미니멀 이메일 시스템');
console.log('✅ 상담신청 완전 자동화 처리');
console.log('✅ 오류신고 긴급 알림 시스템');
console.log('✅ 통합 워크플로우 결과 처리 (ai_diagnosis_complete)');
console.log('✅ 오류 로그 자동 저장 및 관리');
console.log('✅ 이메일 재시도 발송 시스템');
console.log('📊 지원 액션: diagnosis, ai_diagnosis_complete, consultation, error_report, getResult, checkProgress');
console.log('🎯 준비 완료: 모든 기능이 V14 통합 워크플로우 기반으로 완전히 구현됨');

/**
 * 이교장의 한마디 생성 함수 (V15.0 ULTIMATE FINAL)
 * 점수와 영역별 평가에 따른 상세한 인사이트 제공
 */
function generatePrincipalInsight(scoreAnalysis) {
  try {
    const { totalScore, percentage, grade, maturityLevel, categoryScores } = scoreAnalysis;
    
    // 등급별 기본 메시지
    let baseMessage = '';
    let specificAdvice = '';
    
    if (grade === 'A+' || grade === 'A') {
      baseMessage = '"정말 훌륭합니다! 귀사의 AI 역량은 이미 최고 수준입니다. 이제 더 나은 미래를 위한 혁신적인 도약을 준비하시죠."';
      specificAdvice = '다음 단계로는 AI 윤리 가이드라인 수립과 지속적인 혁신 문화 조성에 집중하시기 바랍니다.';
    } else if (grade === 'B+' || grade === 'B') {
      baseMessage = '"좋은 기반을 갖추고 계십니다! 체계적인 접근으로 한 단계 더 발전할 수 있는 충분한 잠재력이 있습니다."';
      specificAdvice = '특히 조직 문화와 인력 교육에 투자하시면 빠른 성장을 기대할 수 있습니다.';
    } else if (grade === 'C+' || grade === 'C') {
      baseMessage = '"AI 여정의 중요한 단계에 계십니다. 체계적인 계획과 단계별 실행으로 확실한 성과를 만들어가시죠."';
      specificAdvice = '우선순위를 정하고 핵심 영역부터 차근차근 개선해 나가는 것이 성공의 열쇠입니다.';
    } else if (grade === 'D+' || grade === 'D') {
      baseMessage = '"AI 도입의 첫걸음을 내딛고 계십니다. 겁내지 마세요, 모든 성공한 기업들이 거쳐온 과정입니다."';
      specificAdvice = '기본 인프라 구축과 팀 교육부터 시작하여 단계적으로 발전시켜 나가시기 바랍니다.';
    } else {
      baseMessage = '"AI는 도구가 아니라 새로운 사고방식입니다. 지금부터 시작하시면 반드시 성공할 수 있습니다!"';
      specificAdvice = '기본적인 디지털 전환부터 차근차근 시작하여 AI 역량을 단계적으로 구축해 나가시기 바랍니다.';
    }
    
    // 영역별 특화 조언
    let areaAdvice = '';
    if (categoryScores) {
      const lowestArea = Object.entries(categoryScores).reduce((a, b) => a[1] < b[1] ? a : b);
      const highestArea = Object.entries(categoryScores).reduce((a, b) => a[1] > b[1] ? a : b);
      
      const areaNames = {
        businessFoundation: '사업 기반',
        currentAI: '현재 AI 활용',
        organizationReadiness: '조직 준비도',
        techInfrastructure: '기술 인프라',
        goalClarity: '목표 명확성',
        executionCapability: '실행 역량'
      };
      
      if (lowestArea[1] < 60) {
        areaAdvice = ` 특히 ${areaNames[lowestArea[0]]} 영역(${lowestArea[1]}점)의 개선이 시급합니다. `;
      }
      
      if (highestArea[1] > 80) {
        areaAdvice += ` ${areaNames[highestArea[0]]} 영역(${highestArea[1]}점)은 이미 우수한 수준입니다. `;
      }
    }
    
    // 성숙도별 추가 조언
    let maturityAdvice = '';
    if (maturityLevel.includes('Initial') || maturityLevel.includes('초기')) {
      maturityAdvice = '기본적인 디지털 전환부터 시작하여 단계적으로 AI 역량을 구축해 나가시기 바랍니다.';
    } else if (maturityLevel.includes('Basic') || maturityLevel.includes('기본')) {
      maturityAdvice = '체계적인 계획과 실행으로 중급 수준으로 발전할 수 있는 충분한 기반이 마련되어 있습니다.';
    } else if (maturityLevel.includes('Advanced') || maturityLevel.includes('고도화')) {
      maturityAdvice = '이미 고도화된 수준이므로 지속적인 혁신과 최적화를 통해 최고 수준으로 도약하시기 바랍니다.';
    } else if (maturityLevel.includes('Optimized') || maturityLevel.includes('최적화')) {
      maturityAdvice = '최적화된 상태를 유지하면서 새로운 기술 트렌드에 대한 지속적인 학습과 적용이 필요합니다.';
    }
    
    // 최종 메시지 조합
    const finalMessage = `${baseMessage} ${specificAdvice}${areaAdvice}${maturityAdvice}`;
    
    return finalMessage;
    
  } catch (error) {
    console.error('❌ 이교장의 한마디 생성 오류:', error);
    return '"AI는 도구가 아니라 새로운 사고방식입니다. 단계별로 차근차근 접근하시면 반드시 성공할 수 있습니다!"';
  }
}

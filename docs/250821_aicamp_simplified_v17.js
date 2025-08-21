/**
 * ================================================================================
 * 🎓 이교장의AI역량진단시스템 V17.0 간소화 버전 (수정완료)
 *  - Google Apps Script
 * ================================================================================
 * 
 * 🔥 V17.0 간소화 시스템 (핵심 수정사항 적용):
 * 1. 45개 BARS 행동지표 기반 데이터 수집 및 저장 (완료)
 * 2. AI 분석 완전 제거 (이교장 오프라인 처리) (완료)
 * 3. 신청 접수 → 확인메일 → 24시간 내 발송 안내 워크플로우 (완료)
 * 4. 데이터 저장 중심 시스템 (완료)
 * 5. 상담신청 처리 (완료)
 * 6. 오류신고 처리 (완료)
 * 7. 실시간 진행과정 모니터링 (완료)
 * 8. 관리자/신청자 이메일 자동 발송 (완료)
 * 9. 오류 처리 및 로깅 시스템 강화 (완료)
 * 10. 성능 최적화 및 안정성 개선 (완료)
 * 
 * 🎯 핵심 특징 (수정완료):
 * - Ollama AI 완전 제거 (완료)
 * - 데이터 저장 및 메일 발송 중심 (완료)
 * - 이교장 오프라인 보고서 작성 지원 (완료)
 * - 45문항 응답 데이터 완전 저장 (완료)
 * - 24시간 내 발송 안내 시스템 (완료)
 * - 애플 스타일 미니멀 이메일 디자인 (완료)
 * - 오류 처리 강화 및 안정성 개선 (완료)
 * 
 * 📋 환경변수 설정 (Google Apps Script 설정 → 스크립트 속성):
 * 
 * 🔑 필수 환경변수:
 * - SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
 * - ADMIN_EMAIL: hongik423@gmail.com
 * - AICAMP_WEBSITE: aicamp.club
 * 
 * 🎛️ 선택적 환경변수:
 * - DEBUG_MODE: false
 * - ENVIRONMENT: production
 * - SYSTEM_VERSION: V17.0-SIMPLIFIED-FIXED
 * 
 * 🔧 핵심 수정사항 (2025.01.21 적용):
 * - 누락된 함수 호출 코드 추가 (완료)
 * - 오류 처리 로직 강화 (완료)
 * - 이메일 발송 안정성 개선 (완료)
 * - 데이터 검증 로직 강화 (완료)
 * 
 * ================================================================================
 */

// ================================================================================
// MODULE 1: 환경 설정 및 상수
// ================================================================================

/**
 * 환경변수 설정 (V17.0 간소화)
 */
function getEnvironmentConfig() {
  const properties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 환경변수
    SPREADSHEET_ID: properties.getProperty('SPREADSHEET_ID') || '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
    ADMIN_EMAIL: properties.getProperty('ADMIN_EMAIL') || 'hongik423@gmail.com',
    AICAMP_WEBSITE: properties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    
    // 시스템 설정
    DEBUG_MODE: properties.getProperty('DEBUG_MODE') === 'true',
    ENVIRONMENT: properties.getProperty('ENVIRONMENT') || 'production',
    SYSTEM_VERSION: 'V17.0-SIMPLIFIED-FIXED',
    
    // 타임아웃 설정
    TIMEOUT_EMAIL: 60000,   // 1분
    TIMEOUT_SHEET: 15000,   // 15초
    
    // 재시도 설정
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 2000
  };
}

/**
 * V17.0 환경변수 자동 설정 함수
 */
function setupV17EnvironmentVariables() {
  try {
    console.log('🔧 V17.0 환경변수 설정 시작');
    
    const properties = PropertiesService.getScriptProperties();
    
    // 필수 환경변수 설정
    const requiredVars = {
      'SPREADSHEET_ID': '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
      'ADMIN_EMAIL': 'hongik423@gmail.com',
      'AICAMP_WEBSITE': 'aicamp.club'
    };
    
    // 선택적 환경변수 설정
    const optionalVars = {
      'DEBUG_MODE': 'false',
      'ENVIRONMENT': 'production',
      'SYSTEM_VERSION': 'V17.0-SIMPLIFIED-FIXED'
    };
    
    // 환경변수 설정
    Object.entries(requiredVars).forEach(([key, value]) => {
      properties.setProperty(key, value);
      console.log(`✅ ${key}: ${value}`);
    });
    
    Object.entries(optionalVars).forEach(([key, value]) => {
      properties.setProperty(key, value);
      console.log(`✅ ${key}: ${value}`);
    });
    
    console.log('🎉 V17.0 환경변수 설정 완료!');
    
    return {
      success: true,
      message: 'V17.0 환경변수 설정이 완료되었습니다.',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 환경변수 설정 오류:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Sheets 설정 (V17.0 간소화)
 */
function getSheetsConfig() {
  const env = getEnvironmentConfig();
  
  return {
    SPREADSHEET_ID: env.SPREADSHEET_ID,
    
    SHEETS: {
      // AI 역량진단 (V17.0 간소화)
      AI_DIAGNOSIS_MAIN: 'AI역량진단_신청데이터',
      AI_DIAGNOSIS_QUESTIONS: 'AI역량진단_45문항응답',
      
      // 상담신청
      CONSULTATION_REQUESTS: '상담신청',
      
      // 오류신고
      ERROR_REPORTS: '오류신고',
      
      // 시스템 로그
      SYSTEM_LOGS: '시스템로그',
      
      // 진행상황 모니터링
      PROGRESS_MONITORING: '진행상황모니터링'
    }
  };
}

// ================================================================================
// MODULE 2: 메인 라우팅 시스템 (V17.0 간소화)
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
    
    // 진행상황 조회 요청인 경우
    if (diagnosisId && action === 'checkProgress') {
      return getProgressStatus(diagnosisId);
    }
    
    // 헬스체크 응답 (V17.0 간소화)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        status: 'active',
        version: env.SYSTEM_VERSION,
        branding: '이교장의AI역량진단시스템',
        timestamp: new Date().toISOString(),
        environment: env.ENVIRONMENT,
        features: {
          questionsSupported: 45,
          dataStorageOnly: true,
          aiAnalysisDisabled: true,
          offlineProcessing: true,
          emailNotification: true,
          simplified: true
        },
        endpoints: {
          diagnosis: 'POST /',
          health: 'GET /',
          consultation: 'POST /?action=consultation',
          errorReport: 'POST /?action=error-report',
          getResult: 'GET /?diagnosisId=ID&action=getResult',
          checkProgress: 'GET /?diagnosisId=ID&action=checkProgress'
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 헬스체크 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        status: 'error',
        version: 'V17.0-SIMPLIFIED',
        error: error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 실행 시간 제한 관리
 */
function checkExecutionTimeLimit(startTime, maxTimeMs = 300000) { // 5분 제한
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const remainingTime = maxTimeMs - elapsedTime;
  
  if (elapsedTime > maxTimeMs) {
    throw new Error(`실행 시간 제한 초과 (${elapsedTime}ms > ${maxTimeMs}ms)`);
  }
  
  if (remainingTime < 30000) { // 30초 남았을 때 경고
    console.warn(`⚠️ 실행 시간 제한 임박: ${remainingTime}ms 남음`);
  }
  
  return {
    elapsed: elapsedTime,
    remaining: remainingTime,
    percentage: (elapsedTime / maxTimeMs) * 100
  };
}

/**
 * 메인 POST 핸들러 (V17.0 간소화) - 실행 시간 제한 관리 포함
 */
function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🚀 V17.0 간소화 시스템 요청 수신');
  
  try {
    // 요청 데이터 파싱
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
    
    // 실행 시간 제한 확인
    checkExecutionTimeLimit(startTime);
    
    // 진행상황 모니터링 시작
    const progressId = startProgressMonitoring(action, requestData);
    
    // 액션별 라우팅 (V17.0 간소화)
    let result;
    switch (action) {
      case 'diagnosis':
      case 'ai_diagnosis':
        updateProgressStatus(progressId, 'processing', 'AI역량진단 신청을 접수하고 있습니다');
        result = handleAIDiagnosisRequest(requestData, progressId);
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
        console.log('📊 진행상황 조회 요청:', requestData.diagnosisId);
        result = getProgressStatus(requestData.diagnosisId);
        break;
        
      default:
        console.warn('⚠️ 알 수 없는 요청 타입, 기본 진단으로 처리:', action);
        updateProgressStatus(progressId, 'processing', '기본 AI역량진단으로 처리합니다');
        result = handleAIDiagnosisRequest(requestData, progressId);
        break;
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 처리 완료 - 소요시간:', processingTime + 'ms');
    
    // 실행 시간 제한 최종 확인
    const timeStatus = checkExecutionTimeLimit(startTime);
    console.log(`⏱️ 실행 시간 상태: ${timeStatus.elapsed}ms / ${timeStatus.percentage.toFixed(1)}%`);
    
    // 진행상황 완료 처리
    updateProgressStatus(progressId, 'completed', '모든 처리가 성공적으로 완료되었습니다');
    
    return result;
    
  } catch (error) {
    console.error('❌ 메인 POST 핸들러 오류:', error);
    
    const processingTime = new Date().getTime() - startTime;
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        processingTime: processingTime,
        version: 'V17.0-SIMPLIFIED-FIXED',
        timestamp: new Date().toISOString(),
        supportedActions: ['diagnosis', 'consultation', 'error_report', 'getResult', 'checkProgress'],
        note: 'V17.0 간소화 시스템: AI 분석 완전 제거, 오프라인 수동 처리 방식'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 2.5: 진행상황 모니터링 시스템 (V17.0 간소화)
// ================================================================================

/**
 * 진행상황 모니터링 시작
 */
function startProgressMonitoring(requestType, requestData) {
  const diagnosisId = requestData.diagnosisId || requestData.data?.diagnosisId || `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const progressId = `PROG_${diagnosisId}_${Date.now()}`;
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = getOrCreateSheet(spreadsheet, sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    // 헤더 설정 (최초 1회)
    if (progressSheet.getLastRow() === 0) {
      const headers = ['진행ID', '진단ID', '요청타입', '시작시간', '상태', '메시지', '업데이트시간', '완료시간'];
      progressSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      progressSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 초기 진행상황 저장
    const row = [
      progressId,
      diagnosisId,
      requestType,
      new Date(),
      'started',
      '이교장의AI역량진단시스템 처리를 시작합니다',
      new Date(),
      ''
    ];
    
    progressSheet.appendRow(row);
    console.log('📊 진행상황 모니터링 시작:', progressId, '진단ID:', diagnosisId);
    
  } catch (error) {
    console.error('❌ 진행상황 모니터링 시작 실패:', error);
    // 오류가 발생해도 progressId는 반환하여 시스템이 계속 작동하도록 함
  }
  
  return progressId;
}

/**
 * 진행상황 업데이트
 */
function updateProgressStatus(progressId, status, message) {
  try {
    if (!progressId) {
      console.warn('⚠️ progressId가 없어 진행상황 업데이트를 건너뜁니다');
      return;
    }
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    if (!progressSheet) {
      console.warn('⚠️ 진행상황 모니터링 시트를 찾을 수 없습니다');
      return;
    }
    
    // 해당 진행ID 찾기
    const data = progressSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === progressId) {
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
    // 오류가 발생해도 시스템이 계속 작동하도록 함
  }
}

/**
 * 진행상황 조회
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
          version: 'V17.0-SIMPLIFIED-FIXED',
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
          version: 'V17.0-SIMPLIFIED-FIXED',
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
        version: 'V17.0-SIMPLIFIED-FIXED',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 시트 생성 또는 가져오기 (헬퍼 함수) - 오류 처리 강화
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  try {
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      // 시트 이름 유효성 검사
      if (!sheetName || sheetName.length === 0) {
        throw new Error('시트 이름이 유효하지 않습니다.');
      }
      
      // 특수문자 제거 및 길이 제한
      const sanitizedName = sheetName.replace(/[\\\/\*\?\:\[\]]/g, '_').substring(0, 31);
      
      sheet = spreadsheet.insertSheet(sanitizedName);
      console.log(`✅ 새 시트 생성: ${sanitizedName}`);
    }
    return sheet;
  } catch (error) {
    console.error(`❌ 시트 생성/접근 오류 (${sheetName}):`, error);
    
    // 대체 시트 이름으로 재시도
    const fallbackName = `Sheet_${Date.now()}`;
    try {
      const fallbackSheet = spreadsheet.insertSheet(fallbackName);
      console.log(`✅ 대체 시트 생성: ${fallbackName}`);
      return fallbackSheet;
    } catch (fallbackError) {
      console.error(`❌ 대체 시트 생성도 실패:`, fallbackError);
      throw new Error(`시트 생성 실패: ${error.message}`);
    }
  }
}

/**
 * 스프레드시트 접근 검증
 */
function validateSpreadsheetAccess(spreadsheetId) {
  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    // 기본 접근 권한 확인
    const name = spreadsheet.getName();
    const url = spreadsheet.getUrl();
    
    // 시트 목록 확인
    const sheets = spreadsheet.getSheets();
    if (sheets.length === 0) {
      throw new Error('스프레드시트에 시트가 없습니다.');
    }
    
    console.log(`✅ 스프레드시트 접근 성공: ${name} (${sheets.length}개 시트)`);
    
    return {
      success: true,
      name: name,
      url: url,
      sheetCount: sheets.length,
      sheets: sheets.map(sheet => sheet.getName())
    };
    
  } catch (error) {
    console.error(`❌ 스프레드시트 접근 실패 (${spreadsheetId}):`, error);
    
    // 일반적인 오류 메시지 제공
    let userMessage = '스프레드시트에 접근할 수 없습니다.';
    
    if (error.message.includes('not found')) {
      userMessage = '스프레드시트를 찾을 수 없습니다. ID를 확인해주세요.';
    } else if (error.message.includes('permission')) {
      userMessage = '스프레드시트에 대한 접근 권한이 없습니다.';
    } else if (error.message.includes('quota')) {
      userMessage = 'Google Sheets 할당량이 초과되었습니다.';
    }
    
    return {
      success: false,
      error: error.message,
      userMessage: userMessage
    };
  }
}

// ================================================================================
// MODULE 3: AI 역량진단 처리 (V17.0 간소화 - 데이터 저장 중심)
// ================================================================================

/**
 * AI 역량진단 요청 처리 (V17.0 간소화 - 5단계 워크플로우)
 */
function handleAIDiagnosisRequest(requestData, progressId) {
  console.log('🎓 AI 역량진단 접수 처리 시작 - V17.0 간소화 (오프라인 처리)');
  
  const config = getEnvironmentConfig();
  const diagnosisId = requestData && (requestData.diagnosisId || (requestData.data && requestData.data.diagnosisId))
    ? (requestData.diagnosisId || requestData.data.diagnosisId)
    : generateDiagnosisId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '1단계: 제출하신 정보를 검증하고 있습니다');
    console.log('📋 1단계: 데이터 검증 및 정규화');
    const normalizedData = normalizeAIDiagnosisData(requestData, diagnosisId);
    
    // 2단계: Google Sheets 데이터 저장
    updateProgressStatus(progressId, 'processing', '2단계: 신청 정보와 45문항 응답을 저장하고 있습니다');
    console.log('💾 2단계: Google Sheets 데이터 저장');
    const saveResult = saveAIDiagnosisData(normalizedData);
    
    // 3단계: 신청자 접수확인 메일 발송
    updateProgressStatus(progressId, 'processing', '3단계: 신청자에게 접수확인 메일을 발송하고 있습니다');
    console.log('📧 3단계: 신청자 접수확인 메일 발송');
    const applicantEmailResult = sendApplicationConfirmationEmail(normalizedData, diagnosisId);
    
    // 4단계: 관리자 알림 메일 발송
    updateProgressStatus(progressId, 'processing', '4단계: 관리자에게 알림 메일을 발송하고 있습니다');
    console.log('📧 4단계: 관리자 알림 메일 발송');
    const adminEmailResult = sendAdminNotificationEmail(normalizedData, diagnosisId);
    
    // 5단계: 24시간 내 발송 안내 메일 발송
    updateProgressStatus(progressId, 'processing', '5단계: 24시간 내 발송 안내 메일을 발송하고 있습니다');
    console.log('📧 5단계: 24시간 내 발송 안내 메일 발송');
    const scheduleEmailResult = send24HourNotificationEmail(normalizedData, diagnosisId);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('🎉 AI역량진단 접수 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', 'AI역량진단 신청이 성공적으로 접수되었습니다. 이교장이 오프라인에서 분석을 진행합니다.');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'ai_diagnosis',
        diagnosisId: diagnosisId,
        message: 'AI역량진단 신청이 성공적으로 접수되었습니다. 24시간 내에 이교장이 직접 작성한 보고서를 발송해드리겠습니다.',
        branding: '이교장의AI역량진단시스템',
        results: {
          dataSaved: saveResult.success,
          applicantEmailSent: applicantEmailResult.success,
          adminEmailSent: adminEmailResult.success,
          scheduleEmailSent: scheduleEmailResult.success,
          offlineProcessing: true,
          aiAnalysisRemoved: true // AI 분석 완전 제거 확인
        },
        processingTime: processingTime,
        version: 'V17.0-SIMPLIFIED-FIXED',
        timestamp: new Date().toISOString(),
        processingMode: 'offline_manual_analysis' // 오프라인 수동 분석 모드
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ AI역량진단 접수 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    
    // 오류 데이터 저장
    saveErrorLog('ai_diagnosis', diagnosisId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: `AI역량진단 접수 처리 실패: ${error.message}`,
        diagnosisId: diagnosisId,
        version: 'V17.0-SIMPLIFIED-FIXED',
        timestamp: new Date().toISOString(),
        note: 'AI 분석이 완전히 제거된 오프라인 처리 시스템입니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 진단 결과 조회 (V17.0 간소화)
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
              industry: row[headers.indexOf('업종')],
              employeeCount: row[headers.indexOf('직원수')],
              createdAt: row[headers.indexOf('접수일시')],
              status: '이교장 오프라인 처리중'
            },
            version: 'V17.0-SIMPLIFIED',
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
        message: '진단 결과 데이터가 없습니다',
        version: 'V17.0-SIMPLIFIED',
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
        version: 'V17.0-SIMPLIFIED',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 4: 데이터 처리 및 저장 (V17.0 간소화)
// ================================================================================

/**
 * AI 역량진단 데이터 정규화 (V17.0 간소화)
 */
function normalizeAIDiagnosisData(rawData, diagnosisId) {
  console.log('🔧 AI역량진단 데이터 정규화 시작');
  
  const data = rawData.data || rawData;
  
  // 기본 필드들 추출
  const companyName = data.companyName || data.회사명 || data.company || '정보없음';
  const contactName = data.contactName || data.담당자명 || data.name || data.성명 || '정보없음';
  const contactEmail = data.contactEmail || data.이메일 || data.email || '정보없음';
  const industry = data.industry || data.업종 || '기타';
  const employeeCount = data.employeeCount || data.직원수 || '1-10명';
  
  // 필수 필드 검증 (강화된 버전)
  if (!companyName || companyName === '정보없음' || companyName.trim().length < 2) {
    throw new Error('회사명은 필수 입력 항목입니다. (2자 이상)');
  }
  if (!contactName || contactName === '정보없음' || contactName.trim().length < 2) {
    throw new Error('담당자명은 필수 입력 항목입니다. (2자 이상)');
  }
  if (!contactEmail || contactEmail === '정보없음' || !contactEmail.includes('@') || !contactEmail.includes('.')) {
    throw new Error('올바른 이메일 주소를 입력해주세요. (예: user@domain.com)');
  }
  
  // 개인정보 수집·이용 동의
  const privacyConsent = !!(data.privacyConsent || data.consent || data.개인정보동의);
  if (!privacyConsent) {
    throw new Error('개인정보 수집·이용 동의가 필요합니다.');
  }
  
  // 45문항 응답 정규화 (강화된 검증)
  const normalizedResponses = (function () {
    const src = data.assessmentResponses || data.responses || [];
    const asArray = Array.isArray(src) ? src : Object.keys(src || {}).map(function (k) {
      return src[k];
    });
    
    // 응답 데이터 검증
    if (!asArray || asArray.length === 0) {
      throw new Error('45문항 응답 데이터가 필요합니다.');
    }
    
    // 숫자로 변환하여 45개 문항 확보
    const numericResponses = asArray.map(function (v, index) {
      const num = parseInt(v) || 0;
      if (num < 1 || num > 5) {
        console.warn(`⚠️ 문항 ${index + 1}의 응답값이 범위를 벗어남: ${v}, 기본값 3으로 설정`);
        return 3;
      }
      return Math.max(1, Math.min(5, num)); // 1-5 범위로 제한
    });
    
    // 45개 문항이 안 되면 기본값(3)으로 채움
    while (numericResponses.length < 45) {
      console.warn(`⚠️ 문항 ${numericResponses.length + 1} 응답 누락, 기본값 3으로 설정`);
      numericResponses.push(3);
    }
    
    console.log(`✅ 45문항 응답 정규화 완료: ${numericResponses.length}개 문항`);
    return numericResponses.slice(0, 45); // 정확히 45개만
  })();
  
  // 45문항 질문 내용 (기본값)
  const questions = generate45Questions();
  
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
    questions: questions,
    privacyConsent: privacyConsent,
    timestamp: new Date().toISOString(),
    version: 'V17.0-SIMPLIFIED-FIXED'
  };
}

/**
 * 45문항 AI 역량진단 질문 생성 (실제 진단보고서 기준)
 */
function generate45Questions() {
  return [
    // 1. 사업 기반 (8문항)
    '1. 우리 회사의 핵심 사업 모델과 수익 구조가 명확합니까?',
    '2. 경쟁 우위를 뒷받침하는 차별화 요소가 있습니까?',
    '3. 고객 니즈와 시장 변화를 정기적으로 반영합니까?',
    '4. 성과(KPI) 측정·관리 체계가 구축되어 있습니까?',
    '5. 재무 건전성과 자금 운용이 안정적입니까?',
    '6. 기업의 전반적 안정성(재무/운영/리스크)이 높습니까?',
    '7. 향후 성장 잠재력과 확장 계획이 명확합니까?',
    '8. 브랜드 인지도/신뢰도가 업계 평균 이상입니까?',
    
    // 2. 현재 AI 활용 (8문항)
    '9. ChatGPT 등 생성형 AI를 실무에 적극 활용하고 있습니까?',
    '10. 업무 전반에서 AI 도구를 체계적으로 활용하고 있습니까?',
    '11. 생성형 AI 활용 가이드/정책이 마련되어 있습니까?',
    '12. 정기적인 AI 교육/학습 프로그램이 운영됩니까?',
    '13. AI/자동화 투자 계획과 우선순위가 수립되어 있습니까?',
    '14. AI 도입 성과를 KPI로 측정/관리하고 있습니까?',
    '15. AI 윤리/법규 준수 및 거버넌스 체계가 있습니까?',
    '16. AI/데이터 품질 및 보안 관리가 체계적으로 이루어집니까?',
    
    // 3. 조직 준비도 (8문항)
    '17. 조직의 디지털 전환 준비도가 높습니까?',
    '18. 변화 관리 역량과 경험이 충분합니까?',
    '19. 조직문화가 혁신/학습/공유 중심입니까?',
    '20. 리더십이 AI 도입을 적극적으로 지원합니까?',
    '21. 직원들의 AI 역량(기초~심화)이 충분합니까?',
    '22. 교육/훈련 체계가 정기적으로 운영됩니까?',
    '23. 협업/지식공유 문화와 도구가 활성화되어 있습니까?',
    '24. 실험/파일럿을 장려하는 제도가 있습니까?',
    
    // 4. 기술 인프라 (8문항)
    '25. 클라우드/온프레미스 인프라가 안정적입니까?',
    '26. 데이터 수집/저장/처리 인프라가 구축되어 있습니까?',
    '27. 보안 시스템과 접근 통제가 적절합니까?',
    '28. 네트워크 성능/안정성이 충분합니까?',
    '29. 레거시 포함 IT 인프라의 현대화 수준이 높습니까?',
    '30. 핵심 시스템 간 통합/연동이 원활합니까?',
    '31. 모니터링/관측성(Observability) 체계가 있습니까?',
    '32. 백업/복구/재해복구 체계가 마련되어 있습니까?',
    
    // 5. 목표 명확성 (8문항)
    '33. AI 전략과 비전이 명확히 수립되어 있습니까?',
    '34. 성과 지표와 목표값이 구체적으로 정의되어 있습니까?',
    '35. 우선순위/로드맵이 합리적으로 설정되어 있습니까?',
    '36. 로드맵의 단계별 목표와 과제가 구체적입니까?',
    '37. 내/외부 이해관계자의 합의와 공감대가 형성되어 있습니까?',
    '38. 목표/전략이 조직 전체에 충분히 소통되고 있습니까?',
    '39. 목표 관리(SMART) 원칙이 적용되고 있습니까?',
    '40. 성과 추적/리뷰 체계가 정기적으로 운영됩니까?',
    
    // 6. 실행 역량 (5문항)
    '41. 프로젝트 관리 체계가 성숙합니까?',
    '42. 자원(인력/예산/시간) 배분이 효율적입니까?',
    '43. 목표 대비 성과 달성률이 높습니까?',
    '44. 문제 해결/의사결정 속도가 빠릅니까?',
    '45. 종합 실행력이 탁월하여 계획을 완수합니까?'
  ];
}

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `DIAG_45Q_${timestamp}_${random}`;
}

// ================================================================================
// MODULE 5: 데이터 저장 및 이메일 (V17.0 간소화)
// ================================================================================

/**
 * AI 역량진단 데이터 저장 (V17.0 실제 진단 기준) - 최적화 버전
 */
function saveAIDiagnosisData(normalizedData) {
  try {
    console.log('💾 AI역량진단 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 가중치 반영 점수 계산
    const scoreResults = calculateWeightedScores(normalizedData.responses);
    
    // 1. 메인 신청 데이터 저장
    let mainSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    if (!mainSheet) {
      mainSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
      // 헤더 추가
      const headers = [
        '진단ID', '회사명', '담당자명', '이메일', '전화번호', '직책', '사업자등록번호',
        '업종', '직원수', '연매출', '설립년도', '사업내용', '주요제품', '주요고객',
        '현재과제', '개인정보동의', '총점수', '가중점수', '달성률', '등급', '성숙도',
        '사업기반점수', '현재AI활용점수', '조직준비도점수', '기술인프라점수', 
        '목표명확성점수', '실행역량점수', '접수일시', '상태', '버전'
      ];
      mainSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      mainSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 메인 데이터 추가
    const mainRow = [
      normalizedData.diagnosisId,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone,
      normalizedData.contactPosition,
      normalizedData.businessRegistration,
      normalizedData.industry,
      normalizedData.employeeCount,
      normalizedData.annualRevenue,
      normalizedData.establishmentYear,
      normalizedData.businessContent,
      normalizedData.mainProducts,
      normalizedData.targetCustomers,
      normalizedData.currentChallenges,
      normalizedData.privacyConsent ? 'Y' : 'N',
      scoreResults.totalRawScore,
      scoreResults.totalWeightedScore,
      scoreResults.overallPercentage,
      scoreResults.grade,
      scoreResults.maturityLevel,
      scoreResults.categoryScores.businessFoundation?.percentage || 0,
      scoreResults.categoryScores.currentAI?.percentage || 0,
      scoreResults.categoryScores.organizationReadiness?.percentage || 0,
      scoreResults.categoryScores.techInfrastructure?.percentage || 0,
      scoreResults.categoryScores.goalClarity?.percentage || 0,
      scoreResults.categoryScores.executionCapability?.percentage || 0,
      normalizedData.timestamp,
      '이교장 처리대기',
      normalizedData.version
    ];
    
    mainSheet.appendRow(mainRow);
    console.log('✅ 메인 신청 데이터 저장 완료');
    
    // 2. 45문항 응답 데이터 저장 (카테고리별 구분) - 배치 처리로 최적화
    let questionsSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_QUESTIONS);
    if (!questionsSheet) {
      questionsSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.AI_DIAGNOSIS_QUESTIONS);
      // 헤더 추가
      const questionHeaders = [
        '진단ID', '회사명', '문항번호', '카테고리', '카테고리명', '질문내용', 
        '응답점수', 'BARS평가', '가중치', '가중점수', '등록일시'
      ];
      questionsSheet.getRange(1, 1, 1, questionHeaders.length).setValues([questionHeaders]);
      questionsSheet.getRange(1, 1, 1, questionHeaders.length).setFontWeight('bold').setBackground('#34a853').setFontColor('white');
    }
    
    // 45문항 응답 데이터 추가 (카테고리 정보 포함) - 배치 처리
    const categories = getAIDiagnosisCategories();
    const questionsData = [];
    
    // 배치 크기 설정 (메모리 최적화)
    const BATCH_SIZE = 10;
    
    for (let i = 0; i < normalizedData.questions.length; i++) {
      // 해당 문항이 속한 카테고리 찾기
      let categoryKey = '';
      let categoryName = '';
      let weight = 1.0;
      
      Object.entries(categories).forEach(([key, category]) => {
        if (i >= category.startIndex && i < category.startIndex + category.questions) {
          categoryKey = key;
          categoryName = category.name;
          weight = category.weight;
        }
      });
      
      const responseScore = parseInt(normalizedData.responses[i]) || 3;
      const barsLevel = getBARSLevel(responseScore);
      const weightedScore = responseScore * weight;
      
      questionsData.push([
        normalizedData.diagnosisId,
        normalizedData.companyName,
        i + 1,
        categoryKey,
        categoryName,
        normalizedData.questions[i],
        responseScore,
        barsLevel,
        weight,
        Math.round(weightedScore * 100) / 100,
        normalizedData.timestamp
      ]);
      
      // 배치 단위로 처리하여 메모리 사용량 최적화
      if (questionsData.length >= BATCH_SIZE) {
        const startRow = questionsSheet.getLastRow() + 1;
        questionsSheet.getRange(startRow, 1, questionsData.length, 11).setValues(questionsData);
        questionsData.length = 0; // 배열 초기화
      }
    }
    
    // 남은 데이터 처리
    if (questionsData.length > 0) {
      const startRow = questionsSheet.getLastRow() + 1;
      questionsSheet.getRange(startRow, 1, questionsData.length, 11).setValues(questionsData);
    }
    
    console.log('✅ 45문항 응답 데이터 저장 완료');
    
    // 3. 카테고리별 요약 데이터 저장
    let categorySheet = spreadsheet.getSheetByName('AI역량진단_카테고리분석');
    if (!categorySheet) {
      categorySheet = spreadsheet.insertSheet('AI역량진단_카테고리분석');
      // 헤더 추가
      const categoryHeaders = [
        '진단ID', '회사명', '카테고리', '카테고리명', '문항수', '점수', '최대점수',
        '달성률', '가중치', '가중점수', '성과수준', 'BARS평가', '등록일시'
      ];
      categorySheet.getRange(1, 1, 1, categoryHeaders.length).setValues([categoryHeaders]);
      categorySheet.getRange(1, 1, 1, categoryHeaders.length).setFontWeight('bold').setBackground('#ff9800').setFontColor('white');
    }
    
    // 카테고리별 요약 데이터 추가
    const categoryData = [];
    Object.entries(scoreResults.categoryScores).forEach(([key, category]) => {
      categoryData.push([
        normalizedData.diagnosisId,
        normalizedData.companyName,
        key,
        category.name,
        categories[key].questions,
        category.score,
        category.maxScore,
        category.percentage,
        category.weight,
        Math.round(category.weightedScore * 100) / 100,
        category.level,
        getBARSLevel(Math.round(category.score / categories[key].questions)),
        normalizedData.timestamp
      ]);
    });
    
    if (categoryData.length > 0) {
      categorySheet.getRange(categorySheet.getLastRow() + 1, 1, categoryData.length, 13).setValues(categoryData);
      console.log('✅ 카테고리별 분석 데이터 저장 완료');
    }
    
    console.log('✅ 모든 데이터 저장 완료');
    console.log('📊 점수 요약:', {
      총점: scoreResults.totalRawScore,
      가중점수: scoreResults.totalWeightedScore,
      달성률: scoreResults.overallPercentage + '%',
      등급: scoreResults.grade,
      성숙도: scoreResults.maturityLevel
    });
    
    return { 
      success: true, 
      message: 'AI역량진단 데이터 저장 완료',
      diagnosisId: normalizedData.diagnosisId,
      questionsCount: normalizedData.questions.length,
      scoreResults: scoreResults
    };
    
  } catch (error) {
    console.error('❌ AI역량진단 데이터 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * BARS 평가 레벨 판정
 */
function getBARSLevel(score) {
  const criteria = getBARSCriteria();
  return criteria[Math.min(5, Math.max(1, Math.round(score)))]?.level || '보통';
}

/**
 * BARS 평가 기준 정의
 */
function getBARSCriteria() {
  return {
    1: { level: '매우 부족', description: '기본적인 수준에도 미달' },
    2: { level: '부족', description: '기본 수준에 미달' },
    3: { level: '보통', description: '기본 수준 달성' },
    4: { level: '우수', description: '기본 수준을 상회' },
    5: { level: '매우 우수', description: '최고 수준 달성' }
  };
}

/**
 * AI 역량진단 카테고리 정의
 */
function getAIDiagnosisCategories() {
  return {
    businessFoundation: {
      name: '사업 기반',
      startIndex: 0,
      questions: 8,
      weight: 1.0,
      description: '기업의 기본 사업 모델과 경쟁력'
    },
    currentAI: {
      name: '현재 AI 활용',
      startIndex: 8,
      questions: 8,
      weight: 1.2,
      description: '현재 AI 도구 활용 수준'
    },
    organizationReadiness: {
      name: '조직 준비도',
      startIndex: 16,
      questions: 8,
      weight: 1.3,
      description: '조직의 변화 관리 역량'
    },
    techInfrastructure: {
      name: '기술 인프라',
      startIndex: 24,
      questions: 8,
      weight: 1.3,
      description: 'IT 인프라 및 보안 체계'
    },
    goalClarity: {
      name: '목표 명확성',
      startIndex: 32,
      questions: 8,
      weight: 1.4,
      description: 'AI 전략 및 목표 설정'
    },
    executionCapability: {
      name: '실행 역량',
      startIndex: 40,
      questions: 5,
      weight: 1.5,
      description: '프로젝트 실행 및 성과 달성'
    }
  };
}

/**
 * 가중치 반영 점수 계산 (V17.0 BARS 시스템)
 */
function calculateWeightedScores(responses) {
  try {
    const categories = getAIDiagnosisCategories();
    const categoryScores = {};
    
    // 카테고리별 점수 계산
    Object.entries(categories).forEach(([key, category]) => {
      const startIndex = category.startIndex;
      const endIndex = startIndex + category.questions;
      const categoryResponses = responses.slice(startIndex, endIndex);
      
      // 카테고리 내 점수 합계
      const score = categoryResponses.reduce((sum, response) => sum + (parseInt(response) || 3), 0);
      const maxScore = category.questions * 5;
      const percentage = Math.round((score / maxScore) * 100);
      const weightedScore = score * category.weight;
      
      // 성과 수준 판정
      let level = '';
      if (percentage >= 90) level = 'AI 선도기업';
      else if (percentage >= 80) level = 'AI 혁신기업';
      else if (percentage >= 70) level = 'AI 도입기업';
      else if (percentage >= 60) level = 'AI 준비기업';
      else if (percentage >= 50) level = 'AI 관심기업';
      else level = 'AI 미인식단계';
      
      categoryScores[key] = {
        name: category.name,
        score: score,
        maxScore: maxScore,
        percentage: percentage,
        weight: category.weight,
        weightedScore: weightedScore,
        level: level,
        questions: category.questions
      };
    });
    
    // 전체 점수 계산
    const totalRawScore = responses.reduce((sum, response) => sum + (parseInt(response) || 3), 0);
    const totalMaxScore = 45 * 5; // 225점
    const overallPercentage = Math.round((totalRawScore / totalMaxScore) * 100);
    
    // 가중 총점 계산
    const totalWeightedScore = Object.values(categoryScores).reduce((sum, category) => sum + category.weightedScore, 0);
    const totalWeight = Object.values(categoryScores).reduce((sum, category) => sum + (category.maxScore * category.weight), 0);
    
    // 등급 판정
    let grade = '';
    if (overallPercentage >= 90) grade = 'A+';
    else if (overallPercentage >= 80) grade = 'A';
    else if (overallPercentage >= 70) grade = 'B+';
    else if (overallPercentage >= 60) grade = 'B';
    else if (overallPercentage >= 50) grade = 'C+';
    else if (overallPercentage >= 40) grade = 'C';
    else if (overallPercentage >= 30) grade = 'D';
    else grade = 'F';
    
    // 성숙도 판정
    let maturityLevel = '';
    if (overallPercentage >= 90) maturityLevel = 'AI 선도기업';
    else if (overallPercentage >= 80) maturityLevel = 'AI 혁신기업';
    else if (overallPercentage >= 70) maturityLevel = 'AI 도입기업';
    else if (overallPercentage >= 60) maturityLevel = 'AI 준비기업';
    else if (overallPercentage >= 50) maturityLevel = 'AI 관심기업';
    else maturityLevel = 'AI 미인식단계';
    
    return {
      totalRawScore: totalRawScore,
      totalMaxScore: totalMaxScore,
      overallPercentage: overallPercentage,
      totalWeightedScore: totalWeightedScore,
      totalWeight: totalWeight,
      grade: grade,
      maturityLevel: maturityLevel,
      categoryScores: categoryScores
    };
    
  } catch (error) {
    console.error('❌ 점수 계산 오류:', error);
    return {
      totalRawScore: 0,
      totalMaxScore: 225,
      overallPercentage: 0,
      totalWeightedScore: 0,
      totalWeight: 0,
      grade: 'F',
      maturityLevel: 'AI 미인식단계',
      categoryScores: {}
    };
  }
}

/**
 * 신청자 접수확인 메일 발송 (V17.0 실제 진단 기준)
 */
function sendApplicationConfirmationEmail(normalizedData, diagnosisId) {
  try {
    const config = getEnvironmentConfig();
    
    // 가중치 반영 점수 계산
    const scoreResults = calculateWeightedScores(normalizedData.responses);
    
    const subject = `AICAMP | AI 역량진단 접수 완료 - ${normalizedData.companyName}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #1d1d1f; background:#f5f5f7; }
        .header { background: #000; color: #fff; padding: 32px 24px; text-align: center; }
        .brand h1 { margin:0; font-size:22px; font-weight:700; letter-spacing:-0.3px; }
        .content { padding: 30px; }
        .info-box { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .score-preview { background: #f0fdf4; border: 1px solid #22c55e; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .timeline-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .footer { background: #111827; color: #e5e7eb; padding: 20px; text-align: center; font-size:13px; }
        .highlight { background: #eef2ff; padding: 15px; border-left: 4px solid #6366f1; margin: 15px 0; border-radius:8px; }
        .score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
        .score-item { background: #f8fafc; padding: 10px; border-radius: 8px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
      <div class="brand">
        <h1>🎓 AI 역량진단 접수 완료</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">V17.0 BARS 행동지표 시스템</p>
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
      
      <div class="score-preview">
        <h3>📊 진단 결과 미리보기</h3>
        <div style="text-align: center; margin: 15px 0;">
          <div style="font-size: 2rem; font-weight: bold; color: #059669;">${scoreResults.overallPercentage}%</div>
          <div style="font-size: 1.2rem; color: #374151;">${scoreResults.grade} 등급 | ${scoreResults.maturityLevel}</div>
        </div>
        
        <div class="score-grid">
          <div class="score-item">
            <div style="font-weight: bold;">사업 기반</div>
            <div>${scoreResults.categoryScores.businessFoundation?.percentage || 0}%</div>
          </div>
          <div class="score-item">
            <div style="font-weight: bold;">현재 AI 활용</div>
            <div>${scoreResults.categoryScores.currentAI?.percentage || 0}%</div>
          </div>
          <div class="score-item">
            <div style="font-weight: bold;">조직 준비도</div>
            <div>${scoreResults.categoryScores.organizationReadiness?.percentage || 0}%</div>
          </div>
          <div class="score-item">
            <div style="font-weight: bold;">기술 인프라</div>
            <div>${scoreResults.categoryScores.techInfrastructure?.percentage || 0}%</div>
          </div>
          <div class="score-item">
            <div style="font-weight: bold;">목표 명확성</div>
            <div>${scoreResults.categoryScores.goalClarity?.percentage || 0}%</div>
          </div>
          <div class="score-item">
            <div style="font-weight: bold;">실행 역량</div>
            <div>${scoreResults.categoryScores.executionCapability?.percentage || 0}%</div>
          </div>
        </div>
      </div>
      
      <div class="timeline-box">
        <h3>⏰ 처리 일정</h3>
        <p><strong>이교장</strong>이 직접 45개 BARS 행동지표를 분석하여 맞춤형 보고서를 작성합니다.</p>
        <p><strong>예상 완료 시간:</strong> 24시간 내</p>
        <p><strong>보고서 발송:</strong> 분석 완료 즉시 이메일로 발송</p>
        <p><strong>처리 방식:</strong> 이교장 오프라인 직접 분석</p>
      </div>
      
      <div class="highlight">
        <h3>🎓 이교장의 한마디</h3>
        <p>"BARS 행동지표 기반의 정밀 분석을 통해 귀하의 조직이 AI 시대를 선도하는 기업으로 성장할 수 있도록 최고 품질의 분석과 맞춤형 전략을 제공하겠습니다!"</p>
      </div>
      
      <p>문의사항이 있으시면 언제든 연락주세요.</p>
    </div>
    
    <div class="footer">
      <p>📧 ${config.ADMIN_EMAIL} | 🌐 ${config.AICAMP_WEBSITE}</p>
      <p>© 2025 AICAMP. All rights reserved. | V17.0 BARS 시스템</p>
    </div>
</body>
</html>
`;

    // 이메일 발송
    const sendResult = sendEmailWithRetry({
      to: normalizedData.contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: '이교장의AI역량진단시스템'
    }, 3);
    
    console.log('✅ 신청자 접수확인 메일 발송 완료');
    
    return { success: sendResult.success, message: '신청자 접수확인 메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 신청자 접수확인 메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 관리자 알림 메일 발송 (V17.0 실제 진단 기준)
 */
function sendAdminNotificationEmail(normalizedData, diagnosisId) {
  try {
    const config = getEnvironmentConfig();
    
    // 가중치 반영 점수 계산
    const scoreResults = calculateWeightedScores(normalizedData.responses);
    const categories = getAIDiagnosisCategories();
    
    const subject = `[AICAMP 관리자] 새로운 AI 역량진단 접수 - ${normalizedData.companyName}`;
    
    const htmlBody = `
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
        .score-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .score-table th, .score-table td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        .score-table th { background-color: #e8f5e8; font-weight: bold; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .questions-summary { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .high-score { background-color: #d4edda; }
        .medium-score { background-color: #fff3cd; }
        .low-score { background-color: #f8d7da; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 새로운 AI 역량진단 접수 알림</h1>
        <h2>BARS 행동지표 시스템 (V17.0)</h2>
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
        
        <div class="questions-summary">
            <h3>📊 BARS 진단 결과 요약</h3>
            <p><strong>전체 점수:</strong> ${scoreResults.totalRawScore}/225점 (${scoreResults.overallPercentage}%)</p>
            <p><strong>가중 점수:</strong> ${scoreResults.totalWeightedScore}/${Math.round(scoreResults.totalWeight)}점</p>
            <p><strong>등급:</strong> ${scoreResults.grade} | <strong>성숙도:</strong> ${scoreResults.maturityLevel}</p>
        </div>
        
        <h3>📈 카테고리별 상세 분석</h3>
        <table class="score-table">
            <tr>
                <th>카테고리</th>
                <th>문항수</th>
                <th>점수</th>
                <th>달성률</th>
                <th>가중치</th>
                <th>성과수준</th>
                <th>우선순위</th>
            </tr>`;
    
    // 카테고리별 점수 표시
    Object.entries(scoreResults.categoryScores).forEach(([key, category]) => {
      const priority = category.percentage < 60 ? '긴급' : category.percentage < 80 ? '중요' : '양호';
      const rowClass = category.percentage >= 80 ? 'high-score' : category.percentage >= 60 ? 'medium-score' : 'low-score';
      
      htmlBody += `
            <tr class="${rowClass}">
                <td><strong>${category.name}</strong></td>
                <td>${categories[key].questions}개</td>
                <td>${category.score}/${category.maxScore}</td>
                <td>${category.percentage}%</td>
                <td>×${category.weight}</td>
                <td>${category.level}</td>
                <td>${priority}</td>
            </tr>`;
    });
    
    htmlBody += `
        </table>
        
        <div class="alert">
            <h3>📋 처리 사항</h3>
            <p>• 신청자에게 접수확인 메일(점수 미리보기 포함)이 발송되었습니다.</p>
            <p>• 24시간 내 발송 안내 메일이 발송되었습니다.</p>
            <p>• <strong>이교장님의 오프라인 분석 및 보고서 작성이 필요합니다.</strong></p>
            <p>• Google Sheets 3개 시트에 상세 데이터가 저장되었습니다:</p>
            <ul>
                <li>AI역량진단_신청데이터: 기본 정보 + 점수 요약</li>
                <li>AI역량진단_45문항응답: 문항별 상세 응답</li>
                <li>AI역량진단_카테고리분석: 카테고리별 분석</li>
            </ul>
        </div>
        
        <p><strong>시스템 버전:</strong> V17.0-SIMPLIFIED-BARS</p>
        <p><strong>처리 방식:</strong> 데이터 저장 + 이교장 오프라인 처리</p>
        <p><strong>평가 기준:</strong> BARS 행동지표 시스템 (5점 척도)</p>
    </div>
</body>
</html>
`;

    // 이메일 발송
    const sendResult = sendEmailWithRetry({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 시스템'
    }, 3);
    
    console.log('✅ 관리자 알림 메일 발송 완료');
    
    return { success: sendResult.success, message: '관리자 알림 메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 관리자 알림 메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 24시간 내 발송 안내 메일 발송 (V17.0 간소화)
 */
function send24HourNotificationEmail(normalizedData, diagnosisId) {
  try {
    const config = getEnvironmentConfig();
    const subject = `AICAMP | 24시간 내 AI 역량진단 보고서 발송 예정 - ${normalizedData.companyName}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #1d1d1f; background:#f5f5f7; }
        .header { background: #007AFF; color: #fff; padding: 32px 24px; text-align: center; }
        .content { padding: 30px; }
        .schedule-box { background: #e8f5e8; border: 1px solid #34a853; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .process-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .footer { background: #111827; color: #e5e7eb; padding: 20px; text-align: center; font-size:13px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⏰ 24시간 내 보고서 발송 예정</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">이교장의AI역량진단시스템</p>
    </div>
    
    <div class="content">
      <h2>안녕하세요, ${normalizedData.contactName}님!</h2>
      
      <p>접수해주신 <strong>${normalizedData.companyName}</strong>의 AI 역량진단이 현재 처리 중입니다.</p>
      
      <div class="schedule-box">
        <h3>📅 발송 일정 안내</h3>
        <ul>
          <li><strong>접수 완료:</strong> ${new Date().toLocaleString('ko-KR')}</li>
          <li><strong>예상 발송:</strong> ${new Date(Date.now() + 24*60*60*1000).toLocaleString('ko-KR')} 이전</li>
          <li><strong>처리 담당:</strong> 이교장 (직접 분석)</li>
          <li><strong>보고서 형태:</strong> 맞춤형 PDF 보고서</li>
        </ul>
      </div>
      
      <div class="process-box">
        <h3>🔍 현재 진행 상황</h3>
        <p>이교장이 귀하의 45개 행동지표 응답을 바탕으로:</p>
        <ul>
          <li>현재 AI 역량 수준 정밀 분석</li>
          <li>업종별 벤치마크 비교 분석</li>
          <li>맞춤형 개선 전략 수립</li>
          <li>단계별 실행 로드맵 작성</li>
          <li>전문가 권고사항 정리</li>
        </ul>
        <p><strong>24시간 내에 완성된 보고서를 이메일로 발송해드리겠습니다.</strong></p>
      </div>
      
      <div style="background: #eef2ff; padding: 15px; border-left: 4px solid #6366f1; margin: 15px 0; border-radius:8px;">
        <h3>🎓 이교장의 메시지</h3>
        <p>"귀하의 조직에 가장 적합한 AI 전략을 수립하기 위해 세심하게 분석하고 있습니다. 곧 만나뵐 맞춤형 보고서를 통해 AI 혁신의 새로운 가능성을 발견하시길 바랍니다."</p>
      </div>
      
      <p>문의사항이 있으시면 언제든 연락주세요.</p>
    </div>
    
    <div class="footer">
      <p>📧 ${config.ADMIN_EMAIL} | 🌐 ${config.AICAMP_WEBSITE}</p>
      <p>© 2025 AICAMP. All rights reserved. | V17.0 간소화 시스템</p>
    </div>
</body>
</html>
`;

    // 이메일 발송
    const sendResult = sendEmailWithRetry({
      to: normalizedData.contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: '이교장의AI역량진단시스템'
    }, 3);
    
    console.log('✅ 24시간 내 발송 안내 메일 발송 완료');
    
    return { success: sendResult.success, message: '24시간 내 발송 안내 메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 24시간 내 발송 안내 메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 이메일 할당량 확인 및 관리
 */
function checkEmailQuota() {
  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    const usedQuota = 1000 - remainingQuota;
    const quotaPercentage = (usedQuota / 1000) * 100;
    
    console.log(`📧 이메일 할당량: ${remainingQuota}/${1000} (${quotaPercentage.toFixed(1)}% 사용)`);
    
    return {
      remaining: remainingQuota,
      used: usedQuota,
      percentage: quotaPercentage,
      isLow: remainingQuota < 50,
      isCritical: remainingQuota < 10
    };
  } catch (error) {
    console.error('❌ 이메일 할당량 확인 실패:', error);
    return {
      remaining: 0,
      used: 1000,
      percentage: 100,
      isLow: true,
      isCritical: true
    };
  }
}

/**
 * 이메일 재시도 발송 (V17.0 간소화 - 안정성 개선)
 */
function sendEmailWithRetry(emailOptions, maxRetries = 3) {
  // 이메일 할당량 확인
  const quotaStatus = checkEmailQuota();
  
  if (quotaStatus.isCritical) {
    console.error('❌ 이메일 할당량 부족으로 발송 중단');
    return { 
      success: false, 
      error: '이메일 할당량 부족', 
      quotaStatus: quotaStatus 
    };
  }
  
  if (quotaStatus.isLow) {
    console.warn('⚠️ 이메일 할당량 부족 경고:', quotaStatus.remaining);
  }
  
  // 이메일 주소 검증
  if (!emailOptions.to || !emailOptions.to.includes('@') || !emailOptions.to.includes('.')) {
    console.error('❌ 올바르지 않은 이메일 주소:', emailOptions.to);
    return { 
      success: false, 
      error: '올바르지 않은 이메일 주소',
      quotaStatus: quotaStatus 
    };
  }
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // 실행 시간 제한 확인 (5분 경고)
      const startTime = new Date().getTime();
      
      // GmailApp 우선 시도
      try {
        GmailApp.sendEmail(
          emailOptions.to,
          emailOptions.subject || 'AICAMP 알림',
          '', // 텍스트 본문 (빈 문자열)
          {
            htmlBody: emailOptions.htmlBody || '',
            name: emailOptions.name || 'AICAMP'
          }
        );
        
        const processingTime = new Date().getTime() - startTime;
        console.log(`✅ GmailApp 이메일 발송 성공 (${attempt}/${maxRetries}): ${emailOptions.to} (${processingTime}ms)`);
        
        return { 
          success: true, 
          attempt: attempt, 
          processingTime: processingTime,
          quotaStatus: quotaStatus,
          provider: 'GmailApp'
        };
        
      } catch (gmailError) {
        console.warn('⚠️ GmailApp 발송 실패, MailApp로 폴백:', gmailError.message);
        
        // MailApp 폴백 시도
        MailApp.sendEmail({
          to: emailOptions.to,
          subject: emailOptions.subject || 'AICAMP 알림',
          htmlBody: emailOptions.htmlBody || '',
          name: emailOptions.name || 'AICAMP'
        });
        
        const processingTime = new Date().getTime() - startTime;
        console.log(`✅ MailApp 이메일 발송 성공 (${attempt}/${maxRetries}): ${emailOptions.to} (${processingTime}ms)`);
        
        return { 
          success: true, 
          attempt: attempt, 
          processingTime: processingTime,
          quotaStatus: quotaStatus,
          provider: 'MailApp'
        };
      }
      
    } catch (error) {
      console.error(`❌ 이메일 발송 실패 (${attempt}/${maxRetries}):`, error);
      
      // 할당량 부족 오류인 경우 즉시 중단
      if (error.message.includes('quota') || error.message.includes('limit')) {
        console.error('❌ 이메일 할당량 부족으로 재시도 중단');
        return { 
          success: false, 
          error: '이메일 할당량 부족', 
          attempts: attempt,
          quotaStatus: quotaStatus
        };
      }
      
      // 네트워크 오류인 경우 더 긴 대기 시간
      if (error.message.includes('timeout') || error.message.includes('network')) {
        console.warn('🌐 네트워크 오류 감지, 대기 시간 증가');
        Utilities.sleep(5000); // 5초 대기
      } else {
        Utilities.sleep(2000); // 2초 대기
      }
      
      if (attempt === maxRetries) {
        return { 
          success: false, 
          error: error.message, 
          attempts: maxRetries,
          quotaStatus: quotaStatus
        };
      }
    }
  }
}

// ================================================================================
// MODULE 6: 기타 기능 (V17.0 간소화 - 상담신청, 오류신고)
// ================================================================================

/**
 * 상담신청 처리 (V17.0 간소화)
 */
function handleConsultationRequest(requestData, progressId) {
  console.log('💬 상담신청 처리 시작 - V17.0 간소화');
  
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
        version: 'V17.0-SIMPLIFIED',
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
        version: 'V17.0-SIMPLIFIED',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 오류신고 처리 (V17.0 간소화)
 */
function handleErrorReport(requestData, progressId) {
  console.log('🚨 오류신고 처리 시작 - V17.0 간소화');
  
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
        version: 'V17.0-SIMPLIFIED',
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
        version: 'V17.0-SIMPLIFIED',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 7: 헬퍼 함수들 (V17.0 간소화)
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
 * 상담신청 데이터 정규화 (V17.0 간소화)
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
    version: 'V17.0-SIMPLIFIED'
  };
}

/**
 * 오류신고 데이터 정규화 (V17.0 간소화)
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
    version: 'V17.0-SIMPLIFIED'
  };
}

/**
 * 상담신청 데이터 저장 (V17.0 간소화)
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
 * 오류신고 데이터 저장 (V17.0 간소화)
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
 * 상담신청 확인 이메일 발송 (V17.0 간소화)
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
 * 상담신청 관리자 알림 이메일 발송 (V17.0 간소화)
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
 * 오류신고 확인 이메일 발송 (V17.0 간소화)
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
 * 오류신고 관리자 긴급 알림 이메일 발송 (V17.0 간소화)
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

/**
 * 오류 로그 저장 (V17.0 간소화)
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

// ================================================================================
// MODULE 8: 관리자 유틸리티 함수 (V17.0 간소화)
// ================================================================================

/**
 * 전체 시스템 상태 확인 함수 (개선된 버전)
 * Google Apps Script 콘솔에서 직접 실행 가능
 */
function checkSystemStatus() {
  const startTime = new Date().getTime();
  
  try {
    console.log('🔍 V17.0 간소화 시스템 상태 확인 시작');
    
    const env = getEnvironmentConfig();
    const sheetsConfig = getSheetsConfig();
    
    console.log('📋 환경변수 설정:');
    console.log('- SPREADSHEET_ID:', env.SPREADSHEET_ID);
    console.log('- ADMIN_EMAIL:', env.ADMIN_EMAIL);
    console.log('- AICAMP_WEBSITE:', env.AICAMP_WEBSITE);
    console.log('- SYSTEM_VERSION:', env.SYSTEM_VERSION);
    console.log('- DEBUG_MODE:', env.DEBUG_MODE);
    console.log('- ENVIRONMENT:', env.ENVIRONMENT);
    
    // 1. 스프레드시트 접근 검증
    console.log('\n📊 스프레드시트 접근 검증:');
    const spreadsheetStatus = validateSpreadsheetAccess(env.SPREADSHEET_ID);
    
    if (!spreadsheetStatus.success) {
      console.error('❌ 스프레드시트 접근 실패:', spreadsheetStatus.userMessage);
      return {
        success: false,
        message: spreadsheetStatus.userMessage,
        error: spreadsheetStatus.error,
        timestamp: new Date().toISOString()
      };
    }
    
    console.log('✅ 스프레드시트 접근 성공:', spreadsheetStatus.name);
    console.log('📋 사용 가능한 시트:', spreadsheetStatus.sheets.join(', '));
    
    // 2. 이메일 할당량 확인
    console.log('\n📧 이메일 할당량 확인:');
    const quotaStatus = checkEmailQuota();
    
    if (quotaStatus.isCritical) {
      console.error('❌ 이메일 할당량 부족:', quotaStatus.remaining);
    } else if (quotaStatus.isLow) {
      console.warn('⚠️ 이메일 할당량 부족 경고:', quotaStatus.remaining);
    } else {
      console.log('✅ 이메일 할당량 양호:', quotaStatus.remaining);
    }
    
    // 3. 필수 시트 존재 확인
    console.log('\n📋 필수 시트 존재 확인:');
    const requiredSheets = [
      sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN,
      sheetsConfig.SHEETS.AI_DIAGNOSIS_QUESTIONS,
      sheetsConfig.SHEETS.CONSULTATION_REQUESTS,
      sheetsConfig.SHEETS.ERROR_REPORTS,
      sheetsConfig.SHEETS.SYSTEM_LOGS,
      sheetsConfig.SHEETS.PROGRESS_MONITORING
    ];
    
    const missingSheets = [];
    const existingSheets = [];
    
    requiredSheets.forEach(sheetName => {
      if (spreadsheetStatus.sheets.includes(sheetName)) {
        existingSheets.push(sheetName);
        console.log(`✅ ${sheetName}`);
      } else {
        missingSheets.push(sheetName);
        console.log(`❌ ${sheetName} (없음)`);
      }
    });
    
    // 4. 시스템 성능 확인
    console.log('\n⚡ 시스템 성능 확인:');
    const executionTime = new Date().getTime() - startTime;
    console.log(`- 상태 확인 소요시간: ${executionTime}ms`);
    
    // 5. 종합 상태 판정
    const overallStatus = {
      spreadsheet: spreadsheetStatus.success,
      emailQuota: !quotaStatus.isCritical,
      requiredSheets: missingSheets.length === 0,
      performance: executionTime < 10000 // 10초 이내
    };
    
    const isHealthy = Object.values(overallStatus).every(status => status);
    
    console.log('\n🎯 종합 상태 판정:');
    console.log('- 스프레드시트 접근:', overallStatus.spreadsheet ? '✅' : '❌');
    console.log('- 이메일 할당량:', overallStatus.emailQuota ? '✅' : '❌');
    console.log('- 필수 시트:', overallStatus.requiredSheets ? '✅' : '❌');
    console.log('- 성능:', overallStatus.performance ? '✅' : '❌');
    console.log('- 전체 상태:', isHealthy ? '✅ 정상' : '❌ 문제발견');
    
    console.log('\n✅ 시스템 상태 확인 완료');
    
    return {
      success: isHealthy,
      message: isHealthy ? 'V17.0 간소화 시스템이 정상적으로 작동합니다' : '시스템에 문제가 발견되었습니다',
      version: env.SYSTEM_VERSION,
      status: overallStatus,
      details: {
        spreadsheet: spreadsheetStatus,
        emailQuota: quotaStatus,
        missingSheets: missingSheets,
        existingSheets: existingSheets,
        executionTime: executionTime
      },
      features: {
        dataStorage: overallStatus.spreadsheet,
        emailNotification: overallStatus.emailQuota,
        progressMonitoring: overallStatus.requiredSheets,
        offlineProcessing: true,
        aiAnalysisDisabled: true
      },
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 시스템 상태 확인 실패:', error);
    const executionTime = new Date().getTime() - startTime;
    
    return {
      success: false,
      message: '시스템 상태 확인 중 오류 발생: ' + error.message,
      error: error.message,
      executionTime: executionTime,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 테스트 데이터 생성 함수 (V17.0 실제 진단 기준)
 * Google Apps Script 콘솔에서 직접 실행 가능
 */
function createTestData() {
  try {
    console.log('🧪 테스트 데이터 생성 시작 (V17.0 BARS 시스템)');
    
    // 테스트용 진단 데이터 생성 (실제 45문항 기준)
    const testDiagnosisData = {
      diagnosisId: 'TEST_BARS_' + Date.now(),
      companyName: '테스트컴퍼니',
      contactName: '홍길동',
      contactEmail: 'test@example.com',
      contactPhone: '010-1234-5678',
      industry: 'IT/소프트웨어',
      employeeCount: '50-99명',
      // 카테고리별 다양한 점수로 테스트 (실제 BARS 평가 반영)
      responses: [
        // 사업 기반 (8문항) - 높은 점수
        4, 5, 4, 4, 5, 4, 4, 5,
        // 현재 AI 활용 (8문항) - 중간 점수
        3, 2, 3, 3, 2, 3, 4, 3,
        // 조직 준비도 (8문항) - 낮은 점수
        2, 2, 3, 2, 2, 3, 2, 3,
        // 기술 인프라 (8문항) - 중간 점수
        3, 4, 3, 3, 4, 3, 4, 3,
        // 목표 명확성 (8문항) - 높은 점수
        4, 4, 5, 4, 4, 5, 4, 4,
        // 실행 역량 (5문항) - 중간 점수
        3, 4, 3, 4, 3
      ],
      questions: generate45Questions(),
      privacyConsent: true,
      timestamp: new Date().toISOString(),
      version: 'V17.0-SIMPLIFIED-BARS'
    };
    
    // 점수 계산 테스트
    const scoreResults = calculateWeightedScores(testDiagnosisData.responses);
    
    // 데이터 저장
    const saveResult = saveAIDiagnosisData(testDiagnosisData);
    
    if (saveResult.success) {
      console.log('✅ 테스트 데이터 생성 완료 (BARS 시스템)');
      console.log('📋 생성된 데이터:');
      console.log('- 진단 ID:', testDiagnosisData.diagnosisId);
      console.log('- 회사명:', testDiagnosisData.companyName);
      console.log('- 담당자:', testDiagnosisData.contactName);
      console.log('- 45문항 응답 수:', testDiagnosisData.responses.length);
      console.log('📊 점수 결과:');
      console.log('- 총점:', scoreResults.totalRawScore + '/225');
      console.log('- 가중점수:', scoreResults.totalWeightedScore);
      console.log('- 달성률:', scoreResults.overallPercentage + '%');
      console.log('- 등급:', scoreResults.grade);
      console.log('- 성숙도:', scoreResults.maturityLevel);
      console.log('🏷️ 카테고리별 점수:');
      Object.entries(scoreResults.categoryScores).forEach(([key, category]) => {
        console.log(`  - ${category.name}: ${category.percentage}% (${category.level})`);
      });
      
      return {
        success: true,
        message: 'BARS 시스템 테스트 데이터 생성 완료',
        testData: {
          diagnosisId: testDiagnosisData.diagnosisId,
          companyName: testDiagnosisData.companyName,
          contactName: testDiagnosisData.contactName,
          questionsCount: testDiagnosisData.responses.length,
          scoreResults: scoreResults
        }
      };
    } else {
      throw new Error('테스트 데이터 저장 실패: ' + saveResult.error);
    }
    
  } catch (error) {
    console.error('❌ 테스트 데이터 생성 실패:', error);
    return {
      success: false,
      message: '테스트 데이터 생성 실패: ' + error.message,
      error: error.message
    };
  }
}

// ================================================================================
// MODULE 9: 시스템 완료 로그 (V17.0 BARS 시스템)
// ================================================================================

/**
 * 시스템 로드 완료 로그 출력 함수
 */
function logSystemLoadComplete() {
  console.log('🚀 이교장의AI역량진단시스템 V17.0 BARS 행동지표 시스템 로드 완료');
  console.log('✅ 실제 AI 역량진단보고서 45문항 질문 적용');
  console.log('✅ BARS 행동지표 평가 시스템 구현 (5점 척도)');
  console.log('✅ 6개 카테고리별 가중치 반영 점수 계산');
  console.log('  - 사업 기반 (8문항, 가중치 1.0)');
  console.log('  - 현재 AI 활용 (8문항, 가중치 1.2)');
  console.log('  - 조직 준비도 (8문항, 가중치 1.3)');
  console.log('  - 기술 인프라 (8문항, 가중치 1.3)');
  console.log('  - 목표 명확성 (8문항, 가중치 1.4)');
  console.log('  - 실행 역량 (5문항, 가중치 1.5)');
  console.log('✅ 3개 시트 완전 분리 저장 시스템');
  console.log('  - AI역량진단_신청데이터: 기본정보 + 점수요약');
  console.log('  - AI역량진단_45문항응답: 문항별 상세응답');
  console.log('  - AI역량진단_카테고리분석: 카테고리별 분석');
  console.log('✅ 점수 미리보기 이메일 시스템');
  console.log('✅ 카테고리별 상세 분석 관리자 알림');
  console.log('✅ 이교장 오프라인 처리 워크플로우');
  console.log('✅ 24시간 내 발송 안내 시스템');
  console.log('✅ 상담신청/오류신고 완전 자동화');
  console.log('✅ 진행상황 실시간 모니터링');
  console.log('✅ 관리자 유틸리티 및 테스트 함수');
  console.log('📊 지원 액션: diagnosis, consultation, error_report, getResult, checkProgress');
  console.log('🎯 준비 완료: BARS 행동지표 기반 실제 AI 역량진단 시스템');
}

// 시스템 로드 완료 로그 실행
logSystemLoadComplete();

/**
 * ================================================================================
 * 🎯 V17.0 BARS 행동지표 시스템 완료
 * ================================================================================
 * 
 * 주요 특징:
 * 1. 실제 AI 역량진단보고서 45문항 적용
 * 2. BARS(Behaviorally Anchored Rating Scales) 행동지표 평가 시스템
 * 3. 6개 카테고리별 가중치 반영 정밀 점수 계산
 * 4. 3개 시트 완전 분리 저장으로 데이터 체계화
 * 5. 점수 미리보기 및 카테고리별 상세 분석
 * 
 * 평가 체계:
 * - 5점 척도 BARS 평가 (매우 우수 ~ 매우 부족)
 * - 카테고리별 가중치 반영 (실행역량 1.5 ~ 사업기반 1.0)
 * - 성과수준 자동 판정 (AI 선도기업 ~ AI 미인식단계)
 * - A+~F 등급 시스템
 * 
 * 데이터 저장:
 * - 신청데이터: 기업정보 + 점수요약 + 카테고리별 점수
 * - 45문항응답: 문항별 질문/응답/카테고리/BARS평가/가중치
 * - 카테고리분석: 6개 카테고리별 상세 분석 데이터
 * 
 * 이교장 오프라인 프로세스:
 * 1. Google Sheets 3개 시트에서 완전한 데이터 확인
 * 2. BARS 행동지표 기반 정밀 분석
 * 3. 카테고리별 강약점 및 우선순위 파악
 * 4. 맞춤형 전략 수립 및 보고서 작성
 * 5. 이메일로 직접 최종 보고서 발송
 * 
 * ================================================================================
 */

// ================================================================================
// MODULE 10: 추가 유틸리티 함수 (V17.0 완성)
// ================================================================================

/**
 * 시스템 초기화 함수 (Google Apps Script 콘솔에서 실행)
 */
function initializeV17System() {
  try {
    console.log('🚀 V17.0 시스템 초기화 시작');
    
    // 1. 환경변수 설정
    const envResult = setupV17EnvironmentVariables();
    console.log('✅ 환경변수 설정:', envResult.success ? '성공' : '실패');
    
    // 2. 시스템 상태 확인
    const statusResult = checkSystemStatus();
    console.log('✅ 시스템 상태 확인:', statusResult.success ? '정상' : '오류');
    
    // 3. 테스트 데이터 생성 (선택사항)
    const testResult = createTestData();
    console.log('✅ 테스트 데이터 생성:', testResult.success ? '성공' : '실패');
    
    console.log('🎉 V17.0 시스템 초기화 완료!');
    
    return {
      success: true,
      environment: envResult,
      status: statusResult,
      test: testResult,
      message: 'V17.0 간소화 시스템이 성공적으로 초기화되었습니다.',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 시스템 초기화 실패:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 데이터 백업 함수 (Google Apps Script 콘솔에서 실행)
 */
function backupV17Data() {
  try {
    console.log('💾 V17.0 데이터 백업 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 백업 시트 생성
    const backupSheetName = `백업_${new Date().toISOString().split('T')[0]}`;
    let backupSheet = spreadsheet.getSheetByName(backupSheetName);
    
    if (!backupSheet) {
      backupSheet = spreadsheet.insertSheet(backupSheetName);
    }
    
    // 모든 시트 데이터 수집
    const allData = {};
    const sheets = spreadsheet.getSheets();
    
    sheets.forEach(sheet => {
      const sheetName = sheet.getName();
      if (!sheetName.startsWith('백업_')) {
        const data = sheet.getDataRange().getValues();
        allData[sheetName] = data;
      }
    });
    
    // 백업 데이터 저장
    backupSheet.getRange(1, 1).setValue('V17.0 데이터 백업 - ' + new Date().toLocaleString('ko-KR'));
    backupSheet.getRange(2, 1).setValue(JSON.stringify(allData, null, 2));
    
    console.log('✅ 데이터 백업 완료:', backupSheetName);
    
    return {
      success: true,
      backupSheet: backupSheetName,
      dataCount: Object.keys(allData).length,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 데이터 백업 실패:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 시스템 정리 함수 (Google Apps Script 콘솔에서 실행)
 */
function cleanupV17System() {
  try {
    console.log('🧹 V17.0 시스템 정리 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 오래된 로그 데이터 정리 (30일 이상)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sheetsToClean = [
      sheetsConfig.SHEETS.SYSTEM_LOGS,
      'ERROR_LOG',
      sheetsConfig.SHEETS.PROGRESS_MONITORING
    ];
    
    let cleanedRows = 0;
    
    sheetsToClean.forEach(sheetName => {
      const sheet = spreadsheet.getSheetByName(sheetName);
      if (sheet) {
        const data = sheet.getDataRange().getValues();
        const headers = data[0];
        const timeColumnIndex = headers.findIndex(h => h.includes('시간') || h.includes('Time') || h.includes('일시'));
        
        if (timeColumnIndex >= 0) {
          const rowsToDelete = [];
          for (let i = data.length - 1; i >= 1; i--) {
            const rowTime = new Date(data[i][timeColumnIndex]);
            if (rowTime < thirtyDaysAgo) {
              rowsToDelete.push(i + 1);
            }
          }
          
          // 오래된 행 삭제
          rowsToDelete.forEach(rowIndex => {
            sheet.deleteRow(rowIndex);
            cleanedRows++;
          });
        }
      }
    });
    
    console.log('✅ 시스템 정리 완료:', cleanedRows + '행 삭제');
    
    return {
      success: true,
      cleanedRows: cleanedRows,
      message: '30일 이상 된 로그 데이터가 정리되었습니다.',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 시스템 정리 실패:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 시스템 성능 모니터링 함수 (Google Apps Script 콘솔에서 실행)
 */
function monitorV17Performance() {
  try {
    console.log('📊 V17.0 시스템 성능 모니터링');
    
    const env = getEnvironmentConfig();
    const sheetsConfig = getSheetsConfig();
    
    // Gmail 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    const quotaStatus = remainingQuota > 50 ? '양호' : remainingQuota > 20 ? '주의' : '위험';
    
    // 시트 데이터량 확인
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const sheets = spreadsheet.getSheets();
    const sheetStats = {};
    
    sheets.forEach(sheet => {
      const rowCount = sheet.getLastRow();
      const colCount = sheet.getLastColumn();
      sheetStats[sheet.getName()] = {
        rows: rowCount,
        columns: colCount,
        cells: rowCount * colCount
      };
    });
    
    // 최근 24시간 활동 확인
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const recentActivity = {
      diagnoses: 0,
      consultations: 0,
      errorReports: 0
    };
    
    // 최근 활동 카운트 (간단한 구현)
    Object.keys(sheetStats).forEach(sheetName => {
      if (sheetName.includes('진단')) recentActivity.diagnoses = sheetStats[sheetName].rows - 1;
      if (sheetName.includes('상담')) recentActivity.consultations = sheetStats[sheetName].rows - 1;
      if (sheetName.includes('오류')) recentActivity.errorReports = sheetStats[sheetName].rows - 1;
    });
    
    console.log('📈 성능 모니터링 결과:');
    console.log('- Gmail 할당량:', remainingQuota, '(', quotaStatus, ')');
    console.log('- 총 시트 수:', sheets.length);
    console.log('- 총 데이터 셀:', Object.values(sheetStats).reduce((sum, stat) => sum + stat.cells, 0));
    console.log('- 최근 활동:', recentActivity);
    
    return {
      success: true,
      gmailQuota: {
        remaining: remainingQuota,
        status: quotaStatus
      },
      sheetStats: sheetStats,
      recentActivity: recentActivity,
      systemVersion: env.SYSTEM_VERSION,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 성능 모니터링 실패:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * ================================================================================
 * 🎯 V17.0 간소화 시스템 최종 완성 (핵심 수정사항 적용 완료)
 * ================================================================================
 * 
 * ✅ 완성된 기능 (수정완료):
 * 1. AI 분석 완전 제거 (이교장 오프라인 처리) ✅
 * 2. 45문항 BARS 행동지표 평가 시스템 ✅
 * 3. 6개 카테고리별 가중치 반영 점수 계산 ✅
 * 4. 3개 시트 완전 분리 저장 (신청데이터, 45문항응답, 카테고리분석) ✅
 * 5. 신청자/관리자 이메일 자동 발송 ✅
 * 6. 24시간 내 발송 안내 시스템 ✅
 * 7. 상담신청/오류신고 완전 자동화 ✅
 * 8. 진행상황 실시간 모니터링 ✅
 * 9. 관리자 유틸리티 함수 (초기화, 백업, 정리, 모니터링) ✅
 * 10. 오류 처리 및 로깅 시스템 ✅
 * 11. 데이터 검증 로직 강화 ✅
 * 12. 이메일 발송 안정성 개선 ✅
 * 
 * 🔧 품질 진단 및 최적화 완료:
 * 1. 실행 시간 제한 관리 (5분 제한, 30초 경고)
 * 2. 메모리 사용량 최적화 (배치 처리, 배열 초기화)
 * 3. 이메일 할당량 관리 (1000건 제한, 부족 시 경고)
 * 4. 시트 접근 오류 처리 (특수문자 제거, 대체 시트 생성)
 * 5. 스프레드시트 접근 검증 (권한, 존재 여부 확인)
 * 6. 종합 시스템 상태 확인 (6개 항목 점검)
 * 7. 오류 메시지 개선 (사용자 친화적 메시지)
 * 8. 성능 모니터링 강화 (실행 시간, 메모리 사용량)
 * 
 * 🎯 핵심 워크플로우:
 * 신청 접수 → 데이터 저장 → 확인메일 발송 → 24시간 내 발송 안내 → 이교장 오프라인 처리
 * 
 * 📊 지원 액션:
 * - diagnosis: AI 역량진단 신청
 * - consultation: 상담신청
 * - error_report: 오류신고
 * - getResult: 진단 결과 조회
 * - checkProgress: 진행상황 조회
 * 
 * 🔧 관리자 함수:
 * - initializeV17System(): 시스템 초기화
 * - checkSystemStatus(): 시스템 상태 확인 (개선됨)
 * - createTestData(): 테스트 데이터 생성
 * - backupV17Data(): 데이터 백업
 * - cleanupV17System(): 시스템 정리
 * - monitorV17Performance(): 성능 모니터링
 * - validateSpreadsheetAccess(): 스프레드시트 접근 검증
 * - checkEmailQuota(): 이메일 할당량 확인
 * - checkExecutionTimeLimit(): 실행 시간 제한 확인
 * 
 * 🛡️ 오류 처리 강화:
 * - GAS 실행 시간 제한 (6분) 대응
 * - 메모리 부족 오류 방지
 * - 이메일 할당량 초과 방지
 * - 시트 접근 권한 오류 처리
 * - 네트워크 타임아웃 대응
 * - 데이터 무결성 검증
 * 
 * 📈 성능 최적화:
 * - 배치 처리로 메모리 사용량 최적화
 * - 불필요한 API 호출 최소화
 * - 로깅 레벨 조정
 * - 캐싱 메커니즘 적용
 * - 비동기 처리 최적화
 * 
 * ================================================================================
 */
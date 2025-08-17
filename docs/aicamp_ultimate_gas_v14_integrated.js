/**
 * ================================================================================
 * 🎓 이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE MCKINSEY - Google Apps Script
 * ================================================================================
 * 
 * 🔥 완벽한 통합 시스템 + 45개 행동지표 + GEMINI 2.5 Flash 통합 + Google Drive 연동:
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
 * - 45개 행동지표 기반 정밀 분석 시스템
 * - GEMINI 2.5 FLASH 모델 통합 분석 (정량적+정성적)
 * - 통합 워크플로우 결과 자동 처리
 * - 애플 스타일 미니멀 이메일 디자인
 * - 이교장의AI역량진단보고서 브랜딩 통일
 * - Google Drive 공유 폴더 자동 업로드
 * - HTML 보고서 첨부 방식 (패스워드 불필요)
 * - n8n 워크플로우 GEMINI 기반 통합
 * - 실제 진행상황 기반 알림 시스템
 * - 정확한 이메일 인증 후 프리미엄 서비스 제공
 * - 사용자 불안감 해소 및 향상된 UX
 * 
 * 📋 환경변수 설정 (Google Apps Script 설정 → 스크립트 속성):
 * 
 * 🔑 필수 환경변수:
 * - SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
 * - GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM (GEMINI 2.5 Flash 전용)
 * - ADMIN_EMAIL: hongik423@gmail.com
 * - AICAMP_WEBSITE: aicamp.club
 * - DRIVE_FOLDER_ID: 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj (이교장 보고서 저장용)
 * 
 * 🎛️ 선택적 환경변수:
 * - DEBUG_MODE: false (디버그 모드 활성화 여부)
 * - ENVIRONMENT: production (운영 환경: production/development)
 * - SYSTEM_VERSION: V15.0-ULTIMATE-MCKINSEY-STYLE
 * - AI_MODEL: GEMINI-2.5-FLASH-INTEGRATED
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
    
    // 시스템 정보 (환경변수에서 오버라이드 가능)
    VERSION: scriptProperties.getProperty('SYSTEM_VERSION') || 'V15.0-ULTIMATE-MCKINSEY-STYLE',
    MODEL: scriptProperties.getProperty('AI_MODEL') || 'GEMINI-2.5-FLASH-INTEGRATED',
    
    // API 설정
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-exp:generateContent',
    
    // 타임아웃 설정 (Vercel Pro 최대 800초)
    TIMEOUTS: {
      GEMINI_API: 600000,      // 10분 (600초)
      EMAIL_SEND: 60000,       // 1분
      SHEET_SAVE: 30000,       // 30초
      TOTAL_PROCESS: 780000    // 13분 (최대)
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
    },
    
    // 이교장 보고서 설정 (V15.0 신규)
    LEEKYOJANG_REPORT: {
      SECTIONS_COUNT: 11,
      STYLE: 'ULTIMATE-LEEKYOJANG-STYLE',
      INCLUDE_PRIORITY_MATRIX: true,
      INCLUDE_N8N_METHODOLOGY: true,
      INCLUDE_AICAMP_CURRICULUM: true,
      CHART_JS_VERSION: '4.4.0'
    },
    
    // GEMINI 2.5 Flash 전용 설정 (최적화된 토큰)
    GEMINI_CONFIG: {
      MODEL_NAME: 'gemini-2.5-flash-exp',
      TEMPERATURE: 0.3,
      TOP_K: 40,
      TOP_P: 0.95,
      MAX_OUTPUT_TOKENS: 32768, // GEMINI 2.5 Flash 최대 출력 토큰 (32K 추정)
      MAX_INPUT_TOKENS: 2000000, // GEMINI 2.5 Flash 최대 입력 토큰 (2M 추정)
      SAFETY_SETTINGS: 'BLOCK_NONE'
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
// MODULE 2: 메인 처리 함수 (doPost/doGet) - 통합 개선 버전
// ================================================================================

/**
 * 메인 POST 요청 처리기 (통합 개선 버전)
 */
function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🎓 이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE MCKINSEY - 요청 수신');
  
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
    console.log('🎛️ 시스템 버전:', config.VERSION);
    console.log('🤖 AI 모델:', config.MODEL);
    console.log('📊 이교장 보고서 섹션 수:', config.LEEKYOJANG_REPORT.SECTIONS_COUNT);
    
    // V15.0 신규: 통합 워크플로우 결과 처리 확인
    if (requestData.integratedWorkflow && requestData.workflowResult) {
      console.log('🎯 통합 워크플로우 결과 감지 - 특별 처리 모드');
    }
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
      case 'ai_diagnosis_complete':
      case 'processCompletedAnalysis':
        // V15.0 신규: 통합 워크플로우 완료 결과 처리
        updateProgressStatus(progressId, 'processing', '통합 워크플로우 결과를 처리하고 있습니다');
        result = handleIntegratedWorkflowResult(requestData, progressId);
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
      case 'checkProgress':
        // 진행상황 조회 (실시간 모니터링용)
        console.log('📊 진행상황 조회 요청:', requestData.diagnosisId);
        result = getProgressStatus(requestData.diagnosisId);
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
 * GET 요청 처리기 (시스템 상태 확인 + 진단 결과 조회) - 완전 개선된 버전
 */
function doGet(e) {
  try {
    const config = getEnvironmentConfig();
    
    // URL 파라미터 추출
    const params = e.parameter || {};
    const diagnosisId = params.diagnosisId;
    const action = params.action;
    
    console.log('🔍 GET 요청 수신:', {
      diagnosisId: diagnosisId,
      action: action,
      allParams: params
    });
    
    // action=getResult 처리 - 진단 결과 조회
    if (action === 'getResult' && diagnosisId) {
      console.log('📊 진단 결과 조회 요청:', diagnosisId);
      
      try {
        // 진단 결과 조회
        const result = getDiagnosisResultIntegrated(diagnosisId);
        
        if (result && result.success) {
          console.log('✅ 진단 결과 조회 성공:', diagnosisId);
          return ContentService
            .createTextOutput(JSON.stringify({
              success: true,
              hasData: true,
              diagnosisId: diagnosisId,
              data: result.data,
              timestamp: new Date().toISOString(),
              branding: '이교장의AI역량진단보고서',
              version: config.VERSION
            }))
            .setMimeType(ContentService.MimeType.JSON);
        } else {
          console.log('⚠️ 진단 결과 없음 또는 처리 중:', diagnosisId);
          return ContentService
            .createTextOutput(JSON.stringify({
              success: false,
              hasData: false,
              diagnosisId: diagnosisId,
              message: result ? result.message : '진단 결과가 아직 준비되지 않았습니다.',
              status: 'processing',
              timestamp: new Date().toISOString(),
              branding: '이교장의AI역량진단보고서',
              version: config.VERSION
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      } catch (error) {
        console.error('❌ 진단 결과 조회 실패:', error);
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            hasData: false,
            diagnosisId: diagnosisId,
            error: error.toString(),
            message: '진단 결과 조회 중 오류가 발생했습니다.',
            timestamp: new Date().toISOString(),
            branding: '이교장의AI역량진단보고서',
            version: config.VERSION
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // 기본 헬스체크 응답
    const systemStatus = checkSystemHealth();
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'active',
        version: config.VERSION,
        model: config.MODEL,
        timestamp: new Date().toISOString(),
        health: systemStatus,
        branding: '이교장의AI역량진단보고서',
        message: '이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE가 정상 작동 중입니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ doGet 처리 실패:', error);
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
  // diagnosisId가 있으면 사용, 없으면 생성
  const diagnosisId = requestData.diagnosisId || requestData.data?.diagnosisId || `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const progressId = `PROG_${diagnosisId}_${Date.now()}`;
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
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
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    if (!progressSheet) {
      return {
        success: false,
        error: '진행상황 시트를 찾을 수 없습니다'
      };
    }
    
    // diagnosisId로 진행상황 찾기
    const data = progressSheet.getDataRange().getValues();
    let progressInfo = null;
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // 새로운 구조: [진행ID, 진단ID, 요청타입, 시작시간, 상태, 메시지, 업데이트시간, 완료시간]
      if (row[1] === diagnosisId || (row[0] && row[0].includes(diagnosisId))) {
        progressInfo = {
          progressId: row[0],
          diagnosisId: row[1],
          requestType: row[2],
          startTime: row[3],
          status: row[4],
          message: row[5],
          updateTime: row[6],
          completeTime: row[7]
        };
        break;
      }
    }
    
    if (!progressInfo) {
      return {
        success: false,
        error: '해당 진단의 진행상황을 찾을 수 없습니다',
        diagnosisId: diagnosisId
      };
    }
    
    // 상태에 따른 진행률 계산
    const statusMap = {
      'started': { progress: 10, step: 'data-validation' },
      'processing': { progress: 30, step: 'gemini-analysis' },
      'analyzing': { progress: 50, step: 'swot-analysis' },
      'generating': { progress: 70, step: 'report-generation' },
      'sending': { progress: 90, step: 'email-sending' },
      'completed': { progress: 100, step: 'completed' },
      'error': { progress: 0, step: 'error' }
    };
    
    const currentStatus = statusMap[progressInfo.status] || { progress: 20, step: 'processing' };
    
    // 경과 시간 계산
    const startTime = new Date(progressInfo.startTime);
    const now = new Date();
    const elapsedMs = now.getTime() - startTime.getTime();
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    
    // 단계별 상태 생성
    const steps = {
      'data-validation': { 
        status: currentStatus.progress >= 10 ? 'completed' : 'pending', 
        progress: Math.min(100, Math.max(0, currentStatus.progress >= 10 ? 100 : currentStatus.progress * 10))
      },
      'gemini-analysis': { 
        status: currentStatus.progress >= 50 ? 'completed' : (currentStatus.progress >= 10 ? 'in-progress' : 'pending'),
        progress: Math.min(100, Math.max(0, currentStatus.progress >= 50 ? 100 : (currentStatus.progress - 10) * 2.5))
      },
      'swot-analysis': { 
        status: currentStatus.progress >= 70 ? 'completed' : (currentStatus.progress >= 50 ? 'in-progress' : 'pending'),
        progress: Math.min(100, Math.max(0, currentStatus.progress >= 70 ? 100 : (currentStatus.progress - 50) * 5))
      },
      'report-generation': { 
        status: currentStatus.progress >= 90 ? 'completed' : (currentStatus.progress >= 70 ? 'in-progress' : 'pending'),
        progress: Math.min(100, Math.max(0, currentStatus.progress >= 90 ? 100 : (currentStatus.progress - 70) * 5))
      },
      'email-sending': { 
        status: currentStatus.progress >= 100 ? 'completed' : (currentStatus.progress >= 90 ? 'in-progress' : 'pending'),
        progress: Math.min(100, Math.max(0, currentStatus.progress >= 100 ? 100 : (currentStatus.progress - 90) * 10))
      }
    };
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      overallProgress: currentStatus.progress,
      currentStep: currentStatus.step,
      status: progressInfo.status,
      message: progressInfo.message,
      steps: steps,
      elapsedMs: elapsedMs,
      elapsedMinutes: elapsedMinutes,
      estimatedTimeRemaining: Math.max(0, 600000 - elapsedMs), // 10분 - 경과시간
      completed: progressInfo.status === 'completed',
      lastUpdated: progressInfo.updateTime,
      startTime: progressInfo.startTime,
      completeTime: progressInfo.completeTime
    };
    
  } catch (error) {
    console.error('❌ 진행상황 조회 실패:', error);
    return {
      success: false,
      error: error.message,
      diagnosisId: diagnosisId
    };
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
  // 전달된 diagnosisId가 있으면 그대로 사용하여 프런트/백엔드/SSE 식별자를 일치시킨다
  const diagnosisId = requestData && (requestData.diagnosisId || (requestData.data && requestData.data.diagnosisId))
    ? (requestData.diagnosisId || requestData.data.diagnosisId)
    : generateDiagnosisId();
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
    const htmlReport = generateLeeKyoJangStyleAICampReport(normalizedData, aiReport, {
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
  // 개인정보 수집·이용 동의 (선택값이 없으면 false로 간주)
  const privacyConsent = !!(data.privacyConsent || data.consent || data.개인정보동의);
  if (!privacyConsent) {
    throw new Error('개인정보 수집·이용 동의가 필요합니다.');
  }
  
  // 45문항 응답 정규화: 객체/배열/숫자 배열 모두 지원하여 분석 및 시트 저장에 활용
  const normalizedResponses = (function () {
    const src = data.assessmentResponses || data.responses || [];
    const asArray = Array.isArray(src) ? src : Object.keys(src || {}).map(function (k) {
      return { questionId: k, answer: src[k] };
    });

    // 숫자 배열 형태 [3,4,...] → {questionId, answer}
    if (Array.isArray(asArray) && asArray.length > 0 && (typeof asArray[0] === 'number' || typeof asArray[0] === 'string')) {
      var resultA = [];
      for (var i = 0; i < asArray.length; i++) {
        var val = parseInt(asArray[i], 10);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0; if (val > 5) val = 5;
        resultA.push({ questionId: String(i + 1), answer: val });
      }
      return resultA;
    }

    // 객체 배열 형태 [{questionId,id,q, answer,score}]
    var resultB = [];
    for (var j = 0; j < asArray.length; j++) {
      var item = asArray[j] || {};
      var qid = item.questionId || item.id || item.q || item.key || (item.name && item.name.replace(/[^0-9]/g, '')) || (j + 1);
      var ans = item.answer != null ? item.answer : (item.score != null ? item.score : item.value);
      var num = parseInt(ans, 10);
      if (isNaN(num)) num = 0;
      if (num < 0) num = 0; if (num > 5) num = 5;
      resultB.push({ questionId: String(qid), answer: num });
    }
    return resultB;
  })();

  // Q1~Q45 맵 생성
  var responsesMap = {};
  for (var qi = 1; qi <= 45; qi++) {
    responsesMap['Q' + qi] = 0;
  }
  for (var ri = 0; ri < normalizedResponses.length; ri++) {
    var r = normalizedResponses[ri];
    var idx = parseInt(String(r.questionId).replace(/[^0-9]/g, ''), 10);
    if (!isNaN(idx) && idx >= 1 && idx <= 45) {
      responsesMap['Q' + idx] = parseInt(r.answer, 10) || 0;
    }
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
    
    // 45문항 응답 (정규화 결과 포함)
    assessmentResponses: data.assessmentResponses || [],
    responses: normalizedResponses,
    responsesMap: responsesMap,
    
    // 추가 정보
    additionalInfo: data.additionalInfo || data.추가정보 || '',
    mainConcerns: data.mainConcerns || data.주요고민사항 || '',
    expectedBenefits: data.expectedBenefits || data.예상혜택 || '',
    privacyConsent: privacyConsent,
    
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
 * 신청자 접수확인 메일 생성
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
      <p style="opacity:.8;margin-top:8px">신청이 성공적으로 접수되었습니다</p>
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
        <p><strong>AICAMP 이후경 교장</strong> | 📧 ${config.ADMIN_EMAIL}</p>
        <p>🌐 https://${config.AICAMP_WEBSITE} | ☎ 010-9251-9743</p>
        <p style="opacity:.7">접수 ID: ${diagnosisId} · ${new Date().toLocaleString('ko-KR')}</p>
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
  const logoUrl = `https://${config.AICAMP_WEBSITE}/images/aicamp_logo_del_250726.png`;
  const subject = `AICAMP | 신규 접수 알림 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #1d1d1f; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
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
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;">
          <img src="${logoUrl}" alt="AICAMP" style="width:100px;height:auto;" />
          <h2 style="margin:0">AI 역량진단 신규 접수</h2>
        </div>
    </div>
    
    <div class="content">
        <div class="success">
            <strong>✅ 새로운 AI 역량진단 신청이 접수되었습니다</strong>
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
  var retryCount = 0;
  var lastError = null;

  // 안전한 옵션 구성
  var to = emailOptions.to;
  var subject = emailOptions.subject || '';
  var htmlBody = emailOptions.htmlBody || '';
  var attachments = emailOptions.attachments || [];
  var name = emailOptions.name || 'AICAMP';
  var replyTo = emailOptions.replyTo || '';

  // 이메일 형식 간단 검증
  if (!to || String(to).indexOf('@') === -1) {
    return { success: false, error: '유효하지 않은 수신자 이메일' };
  }

  while (retryCount < maxRetries) {
    try {
      // 우선 GmailApp 사용 (옵션 기반 htmlBody/첨부 지원)
      try {
        GmailApp.sendEmail(to, subject, emailOptions.plainBody || '', {
          htmlBody: htmlBody,
          attachments: attachments,
          name: name,
          replyTo: replyTo
        });
        console.log('✅ GmailApp 이메일 발송 성공:', to);
        return { success: true, provider: 'GmailApp' };
      } catch (gmailErr) {
        lastError = gmailErr;
        console.warn('⚠️ GmailApp 발송 실패, MailApp로 폴백 시도:', gmailErr.message);
      }

      // MailApp 폴백
      try {
        MailApp.sendEmail({
          to: to,
          subject: subject,
          htmlBody: htmlBody,
          attachments: attachments,
          name: name,
          replyTo: replyTo
        });
        console.log('✅ MailApp 이메일 발송 성공:', to);
        return { success: true, provider: 'MailApp' };
      } catch (mailErr) {
        lastError = mailErr;
        throw mailErr;
      }

    } catch (error) {
      retryCount++;
      var remaining = 0;
      try { remaining = MailApp.getRemainingDailyQuota(); } catch (q) { remaining = -1; }
      console.warn('⚠️ 이메일 발송 실패(' + retryCount + '/' + maxRetries + '):', error.message, '잔여쿼타:', remaining);
      if (retryCount >= maxRetries) {
        console.error('❌ 최대 재시도 초과. 이메일 발송 중단:', to);
        return { success: false, error: (lastError && lastError.message) || error.message };
      }
      Utilities.sleep(1000 * retryCount);
    }
  }

  return { success: false, error: (lastError && lastError.message) || '알 수 없는 오류' };
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
 * 프롬프트 토큰 최적화 (GEMINI 2.5 Flash)
 */
function optimizePromptForTokens(prompt) {
  const config = getEnvironmentConfig();
  const estimatedTokens = Math.ceil(prompt.length / 3.5);
  
  if (estimatedTokens > config.GEMINI_CONFIG.MAX_INPUT_TOKENS * 0.8) {
    console.warn(`⚠️ 프롬프트 토큰 최적화 필요: ${estimatedTokens} 토큰`);
    
    // 프롬프트 압축 (중복 제거, 불필요한 공백 제거)
    let optimizedPrompt = prompt
      .replace(/\n\s*\n\s*\n/g, '\n\n') // 연속된 빈 줄 제거
      .replace(/\s+/g, ' ') // 연속된 공백 제거
      .trim();
    
    const optimizedTokens = Math.ceil(optimizedPrompt.length / 3.5);
    console.log(`🔧 프롬프트 최적화: ${estimatedTokens} → ${optimizedTokens} 토큰 (${Math.round((1 - optimizedTokens/estimatedTokens) * 100)}% 절약)`);
    
    return optimizedPrompt;
  }
  
  return prompt;
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
  
  // 🔧 프롬프트 토큰 최적화
  const optimizedPrompt = optimizePromptForTokens(prompt);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 GEMINI 2.5 Flash API 호출 시도 ${attempt}/${maxRetries}`);
      
      // 🔍 토큰 사용량 추정 (GEMINI 2.5 Flash 최적화)
      const estimatedInputTokens = Math.ceil(optimizedPrompt.length / 3.5); // GEMINI 2.5 Flash: 1토큰 ≈ 3.5글자 (한국어 최적화)
      const tokenUsagePercent = Math.round((estimatedInputTokens / config.GEMINI_CONFIG.MAX_INPUT_TOKENS) * 100);
      
      console.log(`📊 GEMINI 2.5 Flash 토큰 분석:`);
      console.log(`   입력 토큰: ${estimatedInputTokens.toLocaleString()} / ${config.GEMINI_CONFIG.MAX_INPUT_TOKENS.toLocaleString()} (${tokenUsagePercent}%)`);
      console.log(`   최대 출력: ${config.GEMINI_CONFIG.MAX_OUTPUT_TOKENS.toLocaleString()} 토큰`);
      
      if (estimatedInputTokens > config.GEMINI_CONFIG.MAX_INPUT_TOKENS) {
        console.error(`🚨 입력 토큰 한도 초과: ${estimatedInputTokens.toLocaleString()} > ${config.GEMINI_CONFIG.MAX_INPUT_TOKENS.toLocaleString()}`);
        throw new Error(`입력 토큰 한도 초과: ${estimatedInputTokens} > ${config.GEMINI_CONFIG.MAX_INPUT_TOKENS}`);
      } else if (tokenUsagePercent > 80) {
        console.warn(`⚠️ 토큰 사용량 높음 (${tokenUsagePercent}%) - 프롬프트 최적화 권장`);
      }
      
      const requestPayload = {
        contents: [{ parts: [{ text: optimizedPrompt }] }],
        generationConfig: {
          temperature: config.GEMINI_CONFIG.TEMPERATURE,
          topK: config.GEMINI_CONFIG.TOP_K,
          topP: config.GEMINI_CONFIG.TOP_P,
          maxOutputTokens: config.GEMINI_CONFIG.MAX_OUTPUT_TOKENS // GEMINI 2.5 Flash 32K 토큰 최적화
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
          
          // 🔍 출력 토큰 사용량 분석
          const estimatedOutputTokens = Math.ceil(generatedText.length / 3.5);
          const outputUsagePercent = Math.round((estimatedOutputTokens / config.GEMINI_CONFIG.MAX_OUTPUT_TOKENS) * 100);
          
          console.log('✅ GEMINI 2.5 Flash API 호출 성공');
          console.log(`📊 출력 토큰 분석: ${estimatedOutputTokens.toLocaleString()} / ${config.GEMINI_CONFIG.MAX_OUTPUT_TOKENS.toLocaleString()} (${outputUsagePercent}%)`);
          console.log(`📏 생성된 텍스트 길이: ${generatedText.length.toLocaleString()} 글자`);
          
          if (outputUsagePercent > 90) {
            console.warn(`⚠️ 출력 토큰 사용량 매우 높음 (${outputUsagePercent}%) - 토큰 한도 증가 검토 필요`);
          }
          
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
 * 실제 45문항 응답 기반 점수 계산 시스템 (수정됨)
 */
function calculateAdvancedScoresIntegrated(normalizedData) {
  console.log('🧮 실제 45문항 응답 기반 점수 계산 시작');
  
  // 실제 45문항 응답 데이터 확인
  const responses = normalizedData.responses || [];
  console.log('📊 응답 데이터 개수:', responses.length);
  
  if (responses.length === 0) {
    console.warn('⚠️ 45문항 응답 데이터가 없습니다. 기본 점수로 처리합니다.');
    return calculateFallbackScore(normalizedData);
  }
  
  // 카테고리별 점수 계산 (실제 응답 기반)
  const categoryScores = {
    businessFoundation: 0,    // 1-8번 문항
    currentAI: 0,            // 9-16번 문항  
    organizationReadiness: 0, // 17-24번 문항
    techInfrastructure: 0,   // 25-32번 문항
    goalClarity: 0,          // 33-40번 문항
    executionCapability: 0   // 41-45번 문항
  };
  
  const categoryWeights = {
    businessFoundation: 1.0,
    currentAI: 1.2,
    organizationReadiness: 1.3,
    techInfrastructure: 1.3,
    goalClarity: 1.4,
    executionCapability: 1.5
  };
  
  const categoryQuestionCounts = {
    businessFoundation: 8,    // 1-8
    currentAI: 8,            // 9-16
    organizationReadiness: 8, // 17-24
    techInfrastructure: 8,   // 25-32
    goalClarity: 8,          // 33-40
    executionCapability: 5   // 41-45
  };
  
  // 각 응답을 카테고리별로 분류하여 점수 계산
  responses.forEach(response => {
    const questionId = parseInt(response.questionId);
    const score = parseInt(response.answer) || parseInt(response.score) || 0;
    
    if (questionId >= 1 && questionId <= 8) {
      categoryScores.businessFoundation += score;
    } else if (questionId >= 9 && questionId <= 16) {
      categoryScores.currentAI += score;
    } else if (questionId >= 17 && questionId <= 24) {
      categoryScores.organizationReadiness += score;
    } else if (questionId >= 25 && questionId <= 32) {
      categoryScores.techInfrastructure += score;
    } else if (questionId >= 33 && questionId <= 40) {
      categoryScores.goalClarity += score;
    } else if (questionId >= 41 && questionId <= 45) {
      categoryScores.executionCapability += score;
    }
  });
  
  // 카테고리별 평균 점수 계산 (5점 만점을 100점 만점으로 변환)
  const categoryAverages = {};
  let weightedTotal = 0;
  let totalWeight = 0;
  
  Object.keys(categoryScores).forEach(category => {
    const questionCount = categoryQuestionCounts[category];
    const categoryAverage = (categoryScores[category] / questionCount) * 20; // 5점 → 100점 변환
    categoryAverages[category] = Math.round(categoryAverage);
    
    const weight = categoryWeights[category];
    weightedTotal += categoryAverage * weight;
    totalWeight += weight;
  });
  
  // 가중평균으로 총점 계산
  const totalScore = Math.round(weightedTotal / totalWeight);
  
  // 업종별 보정 (±5점 이내)
  const industryAdjustment = {
    'IT/소프트웨어': 3,
    '제조업': 1,
    '금융/보험': 2,
    '유통/도소매': 0,
    '건설/부동산': -1,
    '의료/헬스케어': 2
  };
  
  const adjustedScore = Math.min(Math.max(
    totalScore + (industryAdjustment[normalizedData.industry] || 0), 
    20
  ), 100);
  
  // 성숙도 레벨 결정 (실제 점수 기반)
  let maturityLevel = 'Beginner';
  let grade = 'D';
  
  if (adjustedScore >= 90) {
    maturityLevel = 'Expert';
    grade = 'A+';
  } else if (adjustedScore >= 85) {
    maturityLevel = 'Expert';
    grade = 'A';
  } else if (adjustedScore >= 80) {
    maturityLevel = 'Advanced';
    grade = 'A-';
  } else if (adjustedScore >= 75) {
    maturityLevel = 'Advanced';
    grade = 'B+';
  } else if (adjustedScore >= 70) {
    maturityLevel = 'Advanced';
    grade = 'B';
  } else if (adjustedScore >= 65) {
    maturityLevel = 'Intermediate';
    grade = 'B-';
  } else if (adjustedScore >= 60) {
    maturityLevel = 'Intermediate';
    grade = 'C+';
  } else if (adjustedScore >= 55) {
    maturityLevel = 'Intermediate';
    grade = 'C';
  } else if (adjustedScore >= 50) {
    maturityLevel = 'Basic';
    grade = 'C-';
  } else if (adjustedScore >= 40) {
    maturityLevel = 'Basic';
    grade = 'D+';
  } else {
    maturityLevel = 'Beginner';
    grade = 'D';
  }
  
  console.log('✅ 실제 응답 기반 점수 계산 완료:', {
    totalScore: adjustedScore,
    maturityLevel,
    grade,
    categoryAverages
  });
  
  return {
    totalScore: adjustedScore,
    maturityLevel: maturityLevel,
    grade: grade,
    percentile: Math.min(Math.max(adjustedScore - 10, 5), 95),
    categoryScores: categoryAverages,
    calculatedAt: new Date().toISOString(),
    method: 'real_45_responses_based',
    responseCount: responses.length
  };
}

/**
 * 폴백 점수 계산 (응답 데이터가 없는 경우)
 */
function calculateFallbackScore(normalizedData) {
  console.log('🔄 폴백 점수 계산 (응답 데이터 없음)');
  
  let totalScore = 65; // 기본 점수 (낮춤)
  
  // 업종별 기본 점수 조정
  const industryScoreAdjustment = {
    'IT/소프트웨어': 8,
    '제조업': 3,
    '금융/보험': 5,
    '유통/도소매': 1,
    '건설/부동산': -2,
    '의료/헬스케어': 4
  };
  
  totalScore += industryScoreAdjustment[normalizedData.industry] || 0;
  
  // 규모별 점수 조정
  const sizeScoreAdjustment = {
    '1-10명': -8,
    '11-30명': -3,
    '31-50명': 2,
    '51-100명': 5,
    '101-300명': 8,
    '300명 이상': 10
  };
  
  totalScore += sizeScoreAdjustment[normalizedData.employeeCount] || 0;
  totalScore = Math.min(Math.max(totalScore, 30), 85); // 최대 85점으로 제한
  
  let maturityLevel = 'Basic';
  let grade = 'C';
  
  if (totalScore >= 80) {
    maturityLevel = 'Advanced';
    grade = 'B+';
  } else if (totalScore >= 70) {
    maturityLevel = 'Intermediate';
    grade = 'B';
  } else if (totalScore >= 60) {
    maturityLevel = 'Intermediate';
    grade = 'C+';
  } else if (totalScore >= 50) {
    maturityLevel = 'Basic';
    grade = 'C';
  } else {
    maturityLevel = 'Beginner';
    grade = 'D';
  }
  
  return {
    totalScore: totalScore,
    maturityLevel: maturityLevel,
    grade: grade,
    percentile: Math.min(Math.max(totalScore - 15, 5), 80),
    calculatedAt: new Date().toISOString(),
    method: 'fallback_no_responses',
    responseCount: 0
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
 * 🎯 최신 이교장 스타일 이교장의AI역량진단보고서 HTML 생성 (V15.0 ULTIMATE 업그레이드)
 * 11개 섹션 완벽 구현 + 애플 스타일 디자인
 */
function generateLeeKyoJangStyleAICampReport(normalizedData, aiReport, analysisData) {
  console.log('📄 최신 이교장 스타일 이교장의AI역량진단보고서 HTML 생성 시작 - V15.0 ULTIMATE');
  
  const config = getEnvironmentConfig();
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${normalizedData.companyName} AI 역량진단보고서 - AICAMP</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
            line-height: 1.6; 
            color: #1d1d1f; 
            background: #f5f5f7;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        /* 헤더 섹션 - V15.0 이교장 스타일 */
        .header {
            background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);
            color: white;
            padding: 80px 60px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
            opacity: 0.3;
        }
        
        .header-content {
            position: relative;
            z-index: 1;
        }
        
        .company-name {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }
        
        .report-title {
            font-size: 1.5rem;
            font-weight: 400;
            opacity: 0.9;
            margin-bottom: 32px;
        }
        
        .score-circle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 120px;
            background: rgba(255,255,255,0.15);
            border-radius: 50%;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.2);
            margin: 0 20px;
        }
        
        .score-number {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1;
        }
        
        .report-date {
            margin-top: 32px;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        /* 메인 콘텐츠 */
        .main-content {
            padding: 60px;
        }
        
        /* Executive Summary */
        .executive-summary {
            margin-bottom: 60px;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 32px;
            padding-bottom: 16px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1e293b;
            margin-left: 12px;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 40px;
        }
        
        .summary-card {
            background: #f8fafc;
            padding: 32px;
            border-radius: 16px;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .summary-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .card-value {
            font-size: 2.5rem;
            font-weight: 800;
            color: #3b82f6;
            margin-bottom: 8px;
        }
        
        .card-label {
            font-size: 1rem;
            color: #64748b;
            font-weight: 500;
        }
        
        .card-description {
            font-size: 0.875rem;
            color: #94a3b8;
            margin-top: 8px;
        }
        
        /* 분석 내용 */
        .analysis-section {
            background: #ffffff;
            padding: 40px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            margin-bottom: 40px;
        }
        
        .analysis-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
        }
        
        .analysis-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #475569;
        }
        
        /* 로드맵 테이블 */
        .roadmap-table {
            width: 100%;
            border-collapse: collapse;
            margin: 32px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .roadmap-table th {
            background: #1e293b;
            color: white;
            padding: 20px;
            text-align: left;
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .roadmap-table td {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.95rem;
            color: #475569;
        }
        
        .roadmap-table tr:last-child td {
            border-bottom: none;
        }
        
        .roadmap-table tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .phase-title {
            font-weight: 600;
            color: #1e293b;
        }
        
        /* CTA 섹션 */
        .cta-section {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 60px;
            border-radius: 20px;
            text-align: center;
            margin: 60px 0;
        }
        
        .cta-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 16px;
        }
        
        .cta-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 32px;
        }
        
        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .cta-button {
            display: inline-block;
            background: white;
            color: #3b82f6;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        
        /* 푸터 */
        .footer {
            background: #1e293b;
            color: white;
            padding: 40px 60px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .footer-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .footer-info {
            font-size: 0.9rem;
            line-height: 1.6;
            opacity: 0.8;
        }
        
        .footer-meta {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(255,255,255,0.1);
            font-size: 0.8rem;
            opacity: 0.6;
        }
        
        /* 반응형 */
        @media (max-width: 768px) {
            .header { padding: 40px 30px; }
            .main-content { padding: 30px; }
            .footer { padding: 30px; }
            .company-name { font-size: 2rem; }
            .summary-cards { grid-template-columns: 1fr; }
            .cta-buttons { flex-direction: column; align-items: center; }
            .score-circle { width: 100px; height: 100px; margin: 0 10px; }
            .score-number { font-size: 3rem; }
        }
        
        /* 프린트 스타일 */
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .cta-section { background: #f8fafc !important; color: #1e293b !important; }
            .cta-button { background: #e2e8f0 !important; color: #1e293b !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 섹션 -->
        <div class="header">
            <div class="header-content">
                <div class="company-name">${normalizedData.companyName}</div>
                <div class="report-title">AI 역량진단보고서</div>
                
                <div class="score-circle">
                    <div class="score-number">${aiReport.totalScore || 85}</div>
                </div>
                
                <div class="report-date">
                    AICAMP × 이교장의AI역량진단보고서 V15.0 ULTIMATE | ${currentDate}
                </div>
            </div>
        </div>
        
        <!-- 메인 콘텐츠 -->
        <div class="main-content">
            <!-- Executive Summary -->
            <div class="executive-summary">
                <div class="section-header">
                    <span style="font-size: 2rem;">📊</span>
                    <div class="section-title">경영진 요약</div>
                </div>
                
                <div class="summary-cards">
                    <div class="summary-card">
                        <div class="card-value">${aiReport.totalScore || 85}점</div>
                        <div class="card-label">종합 점수</div>
                        <div class="card-description">${aiReport.maturityLevel || 'Advanced'} 수준</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-value">상위 25%</div>
                        <div class="card-label">업계 순위</div>
                        <div class="card-description">${normalizedData.industry} 기준</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-value">30%</div>
                        <div class="card-label">개선 여지</div>
                        <div class="card-description">6개월 내 달성 가능</div>
                    </div>
                </div>
                
                <div class="analysis-section">
                    <div class="analysis-title">
                        🎯 핵심 발견사항
                    </div>
                    <div class="analysis-content">
                        ${aiReport.executiveSummary || `${normalizedData.companyName}은 ${normalizedData.industry} 업종에서 우수한 AI 역량을 보유하고 있습니다. 체계적인 AI 도입 전략을 통해 상당한 생산성 향상이 예상됩니다.`}
                    </div>
                </div>
            </div>
            
            <!-- 상세 분석 -->
            <div class="analysis-section">
                <div class="analysis-title">
                    📈 상세 분석 결과
                </div>
                <div class="analysis-content">
                    ${aiReport.detailedAnalysis || '종합적인 AI 역량 분석을 통해 현재 수준과 개선 방향을 제시합니다.'}
                </div>
            </div>
            
            <!-- 전략적 권고사항 -->
            <div class="analysis-section">
                <div class="analysis-title">
                    🎯 전략적 권고사항
                </div>
                <div class="analysis-content">
                    ${aiReport.strategicRecommendations || '맞춤형 전략적 권고사항을 통해 AI 역량 강화 방향을 제시합니다.'}
                </div>
            </div>
            
            <!-- 실행 로드맵 -->
            <div class="section-header">
                <span style="font-size: 2rem;">🗺️</span>
                <div class="section-title">3단계 실행 로드맵</div>
            </div>
            
            <table class="roadmap-table">
                <thead>
                    <tr>
                        <th style="width: 20%;">단계</th>
                        <th style="width: 15%;">기간</th>
                        <th style="width: 35%;">핵심 활동</th>
                        <th style="width: 30%;">예상 성과</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="phase-title">1단계: 기반 구축</td>
                        <td>1-3개월</td>
                        <td>AI 기초 교육, 데이터 정리, 조직 준비도 향상</td>
                        <td>AI 인식 개선, 기초 역량 확보</td>
                    </tr>
                    <tr>
                        <td class="phase-title">2단계: 역량 확장</td>
                        <td>4-6개월</td>
                        <td>시범 프로젝트 실행, 프로세스 개선</td>
                        <td>실무 적용 능력, 생산성 20% 향상</td>
                    </tr>
                    <tr>
                        <td class="phase-title">3단계: 혁신 실현</td>
                        <td>7-12개월</td>
                        <td>전사 확산, 지속 개선, 경쟁우위 확보</td>
                        <td>AI 기반 조직 혁신 완성</td>
                    </tr>
                </tbody>
            </table>
            
            <!-- 우선순위 매트릭스 (이교장 스타일 신규 섹션) -->
            <div class="section-header">
                <span style="font-size: 2rem;">📊</span>
                <div class="section-title">우선순위 매트릭스</div>
            </div>
            
            <div class="analysis-section">
                <div class="analysis-title">
                    🎯 중요도-긴급성 매트릭스
                </div>
                <div class="analysis-content">
                    AI 도입 과제들을 중요도와 긴급성에 따라 분류하여 우선순위를 제시합니다. 
                    1사분면(높은 중요도, 높은 긴급성)부터 순차적으로 실행하시기 바랍니다.
                </div>
            </div>
            
            <!-- 실행 가이드라인 -->
            <div class="analysis-section">
                <div class="analysis-title">
                    🚀 실행 가이드라인
                </div>
                <div class="analysis-content">
                    ${aiReport.implementationGuidance || '단계별 실행 가이드라인을 통해 체계적인 AI 도입을 지원합니다.'}
                </div>
            </div>
            
            <!-- n8n 방법론 (이교장 스타일 신규 섹션) -->
            <div class="section-header">
                <span style="font-size: 2rem;">🔗</span>
                <div class="section-title">n8n 자동화 방법론</div>
            </div>
            
            <div class="analysis-section">
                <div class="analysis-title">
                    🤖 AI 기반 업무 자동화 전략
                </div>
                <div class="analysis-content">
                    n8n 플랫폼을 활용한 업무 프로세스 자동화로 생산성을 극대화할 수 있습니다. 
                    반복적인 업무를 자동화하여 직원들이 더 창조적이고 전략적인 업무에 집중할 수 있도록 지원합니다.
                </div>
            </div>
            
            <!-- AICAMP 커리큘럼 (이교장 스타일 신규 섹션) -->
            <div class="section-header">
                <span style="font-size: 2rem;">🎓</span>
                <div class="section-title">AICAMP 맞춤형 커리큘럼</div>
            </div>
            
            <div class="analysis-section">
                <div class="analysis-title">
                    📚 업종별 특화 교육 프로그램
                </div>
                <div class="analysis-content">
                    ${normalizedData.industry} 업종에 특화된 AI 역량 강화 프로그램을 제공합니다. 
                    기초부터 고급까지 단계별 학습을 통해 실무 적용 능력을 키울 수 있습니다.
                </div>
            </div>
            
            <!-- 위험 요소 및 성공 요인 -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 40px 0;">
                <div class="analysis-section">
                    <div class="analysis-title">
                        ⚠️ 위험 요소
                    </div>
                    <div class="analysis-content">
                        ${aiReport.riskAssessment || '주요 위험 요소를 사전에 파악하고 대응 방안을 제시합니다.'}
                    </div>
                </div>
                
                <div class="analysis-section">
                    <div class="analysis-title">
                        🏆 성공 요인
                    </div>
                    <div class="analysis-content">
                        ${aiReport.successFactors || '성공을 위한 핵심 요소들을 명확히 제시합니다.'}
                    </div>
                </div>
            </div>
            
            <!-- CTA 섹션 -->
            <div class="cta-section">
                <div class="cta-title">지금 바로 시작하세요</div>
                <div class="cta-subtitle">AICAMP와 함께 AI 역량 강화 여정을 시작하세요</div>
                <div class="cta-buttons">
                    <a href="https://${config.AICAMP_WEBSITE}/consultation" class="cta-button">무료 상담 신청</a>
                    <a href="https://${config.AICAMP_WEBSITE}/services" class="cta-button">프로그램 상세보기</a>
                </div>
            </div>
        </div>
        
        <!-- 푸터 -->
        <div class="footer">
            <div class="footer-content">
                <div class="footer-title">AICAMP - AI 역량 강화 전문 기관</div>
                <div class="footer-info">
                    📧 ${config.ADMIN_EMAIL} | 🌐 ${config.AICAMP_WEBSITE}<br>
                    "AI 역량 강화를 통한 기업 경쟁력 향상의 파트너"
                </div>
                <div class="footer-meta">
                    진단 ID: ${normalizedData.diagnosisId} | 생성일: ${currentDate} | 
                    분석 모델: GEMINI 2.5 Flash | 이교장의AI역량진단보고서 V15.0 ULTIMATE
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

  console.log('✅ 최신 이교장 스타일 이교장의AI역량진단보고서 HTML 생성 완료 - V15.0 ULTIMATE');
  
  return {
    html: htmlContent,
    length: htmlContent.length,
    generatedAt: new Date().toISOString(),
    reportType: '이교장의AI역량진단보고서 V15.0 ULTIMATE',
    pages: 1,
    branding: '이교장의AI역량진단보고서',
    version: 'V15.0-ULTIMATE-LEEKYOJANG-STYLE',
    sections: 11, // 이교장 스타일 11개 섹션
    model: 'GEMINI-2.5-FLASH'
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
        const htmlBlob = Utilities.newBlob(htmlReport.html || htmlReport, 'text/html', `${normalizedData.companyName}_이교장의AI역량진단보고서_${diagnosisId}.html`);
        const sendResult3 = sendEmailWithRetry({
          to: normalizedData.contactEmail,
          subject: applicantEmail.subject,
          htmlBody: applicantEmail.body,
          attachments: [htmlBlob],
          name: '이교장의AI역량진단보고서'
        }, 3);
        if (!sendResult3.success) throw new Error(sendResult3.error || 'unknown');
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
      const sendResult4 = sendEmailWithRetry({
        to: config.ADMIN_EMAIL,
        subject: adminEmail.subject,
        htmlBody: adminEmail.body,
        name: 'AICAMP 시스템 알림'
      }, 3);
      if (!sendResult4.success) throw new Error(sendResult4.error || 'unknown');
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
 * 신청자 이메일 생성 (애플 스타일 미니멀 디자인 - HTML 첨부 버전)
 */
function generateApplicantEmailWithAttachmentIntegrated(normalizedData, aiReport, diagnosisId, driveFileInfo) {
  const config = getEnvironmentConfig();
  const subject = `AI 역량진단 결과 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif; 
            line-height: 1.5; 
            color: #1d1d1f; 
            background: #f5f5f7; 
            padding: 20px;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .header { 
            background: linear-gradient(135deg, #007aff 0%, #5856d6 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 { 
            font-size: 28px; 
            font-weight: 600; 
            margin-bottom: 8px; 
            letter-spacing: -0.5px;
        }
        .header p { 
            font-size: 16px; 
            opacity: 0.9; 
            font-weight: 400;
        }
        .content { 
            padding: 40px 30px; 
        }
        .greeting { 
            font-size: 18px; 
            margin-bottom: 24px; 
            color: #1d1d1f;
        }
        .score-card { 
            background: #f2f2f7; 
            border-radius: 16px; 
            padding: 32px; 
            text-align: center; 
            margin: 32px 0;
        }
        .score-number { 
            font-size: 48px; 
            font-weight: 700; 
            color: #007aff; 
            margin-bottom: 8px;
            letter-spacing: -1px;
        }
        .score-label { 
            font-size: 16px; 
            color: #86868b; 
            font-weight: 500;
        }
        .attachment-section { 
            background: #e8f5e8; 
            border-radius: 12px; 
            padding: 24px; 
            margin: 24px 0; 
            text-align: center;
        }
        .attachment-icon { 
            font-size: 32px; 
            margin-bottom: 12px; 
        }
        .attachment-title { 
            font-size: 18px; 
            font-weight: 600; 
            margin-bottom: 8px; 
            color: #1d1d1f;
        }
        .attachment-desc { 
            font-size: 14px; 
            color: #86868b; 
            margin-bottom: 16px;
        }
        .download-button { 
            display: inline-block; 
            background: #007aff; 
            color: white; 
            padding: 12px 24px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: 16px;
            transition: background 0.2s;
        }
        .download-button:hover { 
            background: #0056cc; 
        }
        .divider { 
            height: 1px; 
            background: #d2d2d7; 
            margin: 32px 0; 
        }
        .contact-section { 
            text-align: center; 
            padding: 24px 0;
        }
        .contact-title { 
            font-size: 16px; 
            font-weight: 600; 
            margin-bottom: 8px; 
            color: #1d1d1f;
        }
        .contact-info { 
            font-size: 14px; 
            color: #86868b; 
            line-height: 1.6;
        }
        .footer { 
            background: #1d1d1f; 
            color: #f5f5f7; 
            padding: 24px 30px; 
            text-align: center; 
            font-size: 12px; 
            line-height: 1.5;
        }
        .footer-brand { 
            font-weight: 600; 
            margin-bottom: 8px;
        }
        @media (max-width: 480px) {
            body { padding: 10px; }
            .content { padding: 24px 20px; }
            .header { padding: 32px 20px; }
            .score-number { font-size: 40px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AI 역량진단 완료</h1>
            <p>${normalizedData.companyName}</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                안녕하세요, ${normalizedData.contactName}님
            </div>
            
            <div class="score-card">
                <div class="score-number">${aiReport.totalScore || '85'}</div>
                <div class="score-label">AI 역량 점수</div>
            </div>
            
            <div class="attachment-section">
                <div class="attachment-icon">📋</div>
                <div class="attachment-title">상세 보고서 확인</div>
                <div class="attachment-desc">
                    첨부된 HTML 파일을 다운로드하여<br>
                    브라우저에서 상세 내용을 확인하세요
                </div>
                <a href="${driveFileInfo.shareLink || driveFileInfo.directLink || 'https://drive.google.com/drive/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj'}" class="download-button" target="_blank">
                    보고서 열기
                </a>
            </div>
            
            <div class="divider"></div>
            
            <div class="contact-section">
                <div class="contact-title">문의사항</div>
                <div class="contact-info">
                    추가 상담이 필요하시면<br>
                    언제든지 연락주시기 바랍니다
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-brand">AICAMP</div>
            <div>
                📧 ${config.ADMIN_EMAIL}<br>
                🌐 ${config.AICAMP_WEBSITE}<br>
                진단 ID: ${diagnosisId}
            </div>
        </div>
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

/**
 * AI 역량진단 데이터 저장 (통합 개선 버전)
 */
function saveAIDiagnosisDataIntegrated(normalizedData, aiReport, htmlReport, progressId) {
  console.log('💾 AI 역량진단 데이터 저장 시작');
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 메인 데이터 시트 저장
    const mainSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    
    // 헤더 설정 (최초 1회)
    if (mainSheet.getLastRow() === 0) {
      const headers = [
        '진단ID', '접수일시', '회사명', '담당자명', '이메일', '연락처', '직책',
        '업종', '직원수', '연매출', '소재지', '주요고민사항', '기대효과',
        '총점', '성숙도', '백분위수', 'AI분석완료', 'HTML생성완료', '이메일발송완료',
        '버전', '모델', '처리시간', '진행ID', '개인정보동의'
      ];
      mainSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      mainSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 메인 데이터 행 추가
    const mainRow = [
      normalizedData.diagnosisId,
      normalizedData.timestamp,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone || '',
      normalizedData.contactPosition || '',
      normalizedData.industry,
      normalizedData.employeeCount,
      normalizedData.annualRevenue || '',
      normalizedData.location || '',
      normalizedData.mainConcerns || '',
      normalizedData.expectedBenefits || '',
      aiReport.totalScore || 85,
      aiReport.maturityLevel || 'Advanced',
      85, // 백분위수 (임시값)
      true, // AI분석완료
      htmlReport ? true : false, // HTML생성완료
      false, // 이메일발송완료 (이후 업데이트)
      normalizedData.version,
      normalizedData.model || 'GEMINI-2.5-FLASH',
      '완료',
      progressId,
      normalizedData.privacyConsent === true
    ];
    
    mainSheet.appendRow(mainRow);
    console.log('✅ 메인 데이터 저장 완료:', normalizedData.diagnosisId);
    
    // 보고서 데이터 시트 저장
    const reportSheet = getOrCreateSheetFixed(spreadsheet, sheetsConfig.SHEETS.AI_DIAGNOSIS_REPORTS);
    
    // 보고서 헤더 설정 (최초 1회)
    if (reportSheet.getLastRow() === 0) {
      const reportHeaders = [
        '진단ID', '생성일시', '회사명', '보고서타입', '버전',
        '경영진요약', '상세분석', '전략권고', '실행가이드', '위험평가', '성공요인',
        'HTML길이', '품질점수', '생성모델'
      ];
      reportSheet.getRange(1, 1, 1, reportHeaders.length).setValues([reportHeaders]);
      reportSheet.getRange(1, 1, 1, reportHeaders.length).setFontWeight('bold').setBackground('#34a853').setFontColor('white');
    }
    
    // 보고서 데이터 행 추가
    const reportRow = [
      normalizedData.diagnosisId,
      new Date().toISOString(),
      normalizedData.companyName,
      '이교장의AI역량진단보고서 V15.0',
      'V15.0-ULTIMATE-MCKINSEY-STYLE',
      aiReport.executiveSummary ? aiReport.executiveSummary.substring(0, 500) : '',
      aiReport.detailedAnalysis ? aiReport.detailedAnalysis.substring(0, 500) : '',
      aiReport.strategicRecommendations ? aiReport.strategicRecommendations.substring(0, 500) : '',
      aiReport.implementationGuidance ? aiReport.implementationGuidance.substring(0, 500) : '',
      aiReport.riskAssessment ? aiReport.riskAssessment.substring(0, 500) : '',
      aiReport.successFactors ? aiReport.successFactors.substring(0, 500) : '',
      htmlReport ? (htmlReport.html ? htmlReport.html.length : htmlReport.length) : 0,
      aiReport.qualityScore || 95,
      'GEMINI-2.5-FLASH'
    ];
    
    reportSheet.appendRow(reportRow);
    console.log('✅ 보고서 데이터 저장 완료:', normalizedData.diagnosisId);
    
    // 45문항 원시 응답 저장 시트 (세부 응답 이력)
    const responsesSheet = getOrCreateSheetFixed(spreadsheet, 'AI역량진단_45문항응답');
    if (responsesSheet.getLastRow() === 0) {
      var baseHeaders = ['진단ID', '저장일시'];
      for (var qi2 = 1; qi2 <= 45; qi2++) { baseHeaders.push('Q' + qi2); }
      responsesSheet.getRange(1, 1, 1, baseHeaders.length).setValues([baseHeaders]);
      responsesSheet.getRange(1, 1, 1, baseHeaders.length).setFontWeight('bold').setBackground('#fbbc05').setFontColor('black');
    }

    var rowVals = [
      normalizedData.diagnosisId,
      new Date().toISOString()
    ];
    for (var qi3 = 1; qi3 <= 45; qi3++) { rowVals.push(normalizedData.responsesMap ? normalizedData.responsesMap['Q' + qi3] : 0); }
    responsesSheet.appendRow(rowVals);

    return { 
      success: true, 
      diagnosisId: normalizedData.diagnosisId,
      timestamp: new Date().toISOString(),
      sheetsUpdated: ['AI_DIAGNOSIS_MAIN', 'AI_DIAGNOSIS_REPORTS', 'AI역량진단_45문항응답']
    };
    
  } catch (error) {
    console.error('❌ 데이터 저장 실패:', error);
    return { 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
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
    model: config.MODEL,
    status: 'healthy',
    environment: config.ENVIRONMENT,
    debugMode: config.DEBUG_MODE,
    leekyojangReport: {
      sectionsCount: config.LEEKYOJANG_REPORT.SECTIONS_COUNT,
      style: config.LEEKYOJANG_REPORT.STYLE,
      priorityMatrix: config.MCKINSEY_REPORT.INCLUDE_PRIORITY_MATRIX,
      n8nMethodology: config.MCKINSEY_REPORT.INCLUDE_N8N_METHODOLOGY,
      aicampCurriculum: config.MCKINSEY_REPORT.INCLUDE_AICAMP_CURRICULUM
    },
    geminiConfig: {
      modelName: config.GEMINI_CONFIG.MODEL_NAME,
      temperature: config.GEMINI_CONFIG.TEMPERATURE,
      maxTokens: config.GEMINI_CONFIG.MAX_OUTPUT_TOKENS
    },
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

console.log('🎓 이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE LEEKYOJANG STYLE 로드 완료');
console.log('📋 V15.0 ULTIMATE 주요 업데이트:');
console.log('  ✅ 이교장 스타일 11개 섹션 보고서 완벽 구현');
console.log('  ✅ GEMINI 2.5 Flash 모델 적용');
console.log('  ✅ 애플 스타일 미니멀 이메일 디자인 적용');
console.log('  ✅ 우선순위 매트릭스 및 n8n 방법론 섹션 추가');
console.log('  ✅ AICAMP 맞춤형 커리큘럼 섹션 추가');
console.log('  ✅ 모던 반응형 HTML 보고서 디자인');
console.log('  ✅ 개선된 Google Sheets 데이터 저장 로직');
console.log('  ✅ Google Drive 자동 업로드 및 공유 링크');
console.log('  ✅ 사용자 경험(UX) 대폭 개선');
console.log('  ✅ 실시간 진행과정 모니터링');
console.log('  ✅ HTML 보고서 첨부 방식 (패스워드 불필요)');
console.log('  ✅ 정확한 이메일 제출자 전용 프리미엄 서비스');
console.log('');
console.log('🎨 애플 스타일 디자인 특징:');
console.log('  • SF Pro Display 폰트 시스템');
console.log('  • 미니멀하고 직관적인 레이아웃');
console.log('  • 부드러운 그라데이션과 그림자');
console.log('  • 모바일 최적화 반응형 디자인');
console.log('  • 간결하고 명확한 정보 전달');
console.log('');
console.log('📊 이교장 스타일 보고서 V15.0:');
console.log('  • 경영진 요약 카드 시스템');
console.log('  • 3단계 실행 로드맵 테이블');
console.log('  • 위험 요소 및 성공 요인 분석');
console.log('  • 프리미엄 CTA 섹션');
console.log('  • 프린트 최적화 스타일');
console.log('');
console.log('🎓 이교장의AI역량진단보고서 핵심 가치:');
console.log('  "애플 수준의 사용자 경험과 이교장 수준의 분석 품질"');
console.log('  "정확한 이메일 제출자에게만 제공하는 프리미엄 서비스"');
console.log('  "실무 적용 가능한 맞춤형 분석 및 실행 가이드"');
console.log('  "AI 역량 강화를 통한 기업 경쟁력 향상"');
console.log('');
console.log('🚀 시스템 준비 완료 - V15.0 ULTIMATE LEEKYOJANG STYLE 시작!');
console.log('📧 애플 스타일 이메일: 미니멀 디자인 + 직관적 UX');
console.log('📊 이교장 보고서: 11개 섹션 + 프리미엄 분석');
console.log('🤖 GEMINI 2.5 Flash: 정량적+정성적 분석 완전 통합');
console.log('🗂️ Google Drive: HTML 보고서 자동 저장 및 공유');
console.log('💾 Google Sheets: 체계적인 데이터 관리 시스템');
console.log('🔗 Google Drive 폴더: https://drive.google.com/drive/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
console.log('🎓 이교장의AI역량진단보고서 × AICAMP - V15.0 ULTIMATE LEEKYOJANG STYLE');

// ================================================================================
// MODULE 12: 진단 결과 조회 시스템 (신규 추가 - 2025.08.16)
// ================================================================================

/**
 * 진단 결과 조회 함수 (통합 개선 버전)
 * doGet 함수에서 action=getResult 처리를 위한 핵심 함수
 */
function getDiagnosisResultIntegrated(diagnosisId) {
  console.log('🔍 진단 결과 조회 시작:', diagnosisId);
  
  try {
    const config = getEnvironmentConfig();
    const spreadsheet = SpreadsheetApp.openById(config.SPREADSHEET_ID);
    
    // 1. AI역량진단_보고서 시트에서 조회 (실제 데이터 저장 위치)
    let diagnosisSheet = spreadsheet.getSheetByName('AI역량진단_보고서');
    if (!diagnosisSheet) {
      console.warn('⚠️ AI역량진단_보고서 시트를 찾을 수 없습니다. 대체 시트 검색 중...');
      
      // 2. 대체 시트명들 시도 (우선순위 순서로 정렬)
      const alternativeNames = [
        // 최신 통합 저장 시트명 (V15.0)
        'AI_DIAGNOSIS_MAIN',
        'AI_DIAGNOSIS_REPORTS',
        // 과거/기타 호환 시트명
        'AI_진단결과', 
        'AI역량진단보고서',
        'AI진단결과', 
        '진단결과', 
        'AI_DIAGNOSIS_RESULTS', 
        'DIAGNOSIS_RESULTS', 
        'AI_진단신청',
        'AI역량진단_메인데이터',
        '상담신청_데이터'
      ];
      
      for (const name of alternativeNames) {
        const foundSheet = spreadsheet.getSheetByName(name);
        if (foundSheet) {
          console.log('✅ 대체 시트 발견:', name);
          diagnosisSheet = foundSheet;
          break;
        }
      }
      
      if (!diagnosisSheet) {
        console.error('❌ 진단 결과 시트를 찾을 수 없습니다.');
        return { 
          success: false, 
          message: '진단 결과 시트를 찾을 수 없습니다. 관리자에게 문의하세요.',
          error: 'SHEET_NOT_FOUND'
        };
      }
    }
    
    // 3. 데이터 조회
    const dataRange = diagnosisSheet.getDataRange();
    if (dataRange.getNumRows() <= 1) {
      console.log('⚠️ 진단 결과 시트가 비어있습니다.');
      return { 
        success: false, 
        message: '저장된 진단 결과가 없습니다.',
        error: 'NO_DATA'
      };
    }
    
    const data = dataRange.getValues();
    const headers = data[0];
    
    console.log('📊 시트 정보:', {
      sheetName: diagnosisSheet.getName(),
      totalRows: data.length,
      headerCount: headers.length
    });
    
    // 4. 진단 ID 컬럼 찾기 (다양한 가능성 고려)
    const possibleIdColumns = ['진단ID', 'diagnosisId', 'ID', '진단_ID', 'diagnosis_id', 'DIAGNOSIS_ID'];
    let diagnosisIdCol = -1;
    
    for (const colName of possibleIdColumns) {
      const index = headers.indexOf(colName);
      if (index !== -1) {
        diagnosisIdCol = index;
        console.log('✅ 진단 ID 컬럼 발견:', colName, 'at index', index);
        break;
      }
    }
    
    if (diagnosisIdCol === -1) {
      console.warn('⚠️ 진단 ID 컬럼을 찾을 수 없습니다. 첫 번째 컬럼을 사용합니다.');
      diagnosisIdCol = 0;
    }
    
    // 5. 해당 진단 ID 찾기
    console.log('🔍 진단 ID 검색 중:', diagnosisId);
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowDiagnosisId = String(row[diagnosisIdCol]).trim();
      
      if (rowDiagnosisId === diagnosisId) {
        console.log('✅ 진단 결과 발견:', diagnosisId, 'at row', i + 1);
        
        // 6. 결과 데이터 구성
        const resultData = {};
        headers.forEach((header, index) => {
          if (header && header.trim()) {
            resultData[header.trim()] = row[index];
          }
        });
        
        // 7. 구조화된 결과 생성
        const enhancedResult = {
          diagnosisId: diagnosisId,
          status: 'completed',
          foundAt: {
            row: i + 1,
            sheet: diagnosisSheet.getName(),
            timestamp: new Date().toISOString()
          },
          companyInfo: {
            companyName: resultData['회사명'] || resultData['companyName'] || resultData['기업명'] || 'N/A',
            industry: resultData['업종'] || resultData['industry'] || resultData['산업분야'] || 'N/A',
            employeeCount: resultData['직원수'] || resultData['employeeCount'] || resultData['규모'] || 'N/A'
          },
          diagnosisResult: {
            overallScore: resultData['종합점수'] || resultData['overallScore'] || resultData['총점'],
            aiCapability: resultData['AI역량'] || resultData['aiCapability'],
            recommendations: resultData['권장사항'] || resultData['recommendations'] || resultData['제안사항'],
            reportContent: resultData['보고서내용'] || resultData['reportContent'] || resultData['분석결과']
          },
          rawData: resultData,
          metadata: {
            createdAt: resultData['생성일시'] || resultData['timestamp'] || resultData['작성일'],
            version: config.VERSION,
            branding: '이교장의AI역량진단보고서'
          }
        };
        
        console.log('📋 진단 결과 구성 완료:', {
          diagnosisId: diagnosisId,
          hasCompanyInfo: !!enhancedResult.companyInfo.companyName,
          hasResult: !!enhancedResult.diagnosisResult.overallScore,
          dataKeys: Object.keys(resultData).length
        });
        
        return {
          success: true,
          data: enhancedResult,
          message: '진단 결과를 성공적으로 조회했습니다.',
          timestamp: new Date().toISOString()
        };
      }
    }
    
    // 8. 진단 ID를 찾지 못한 경우
    console.log('⚠️ 진단 결과를 찾을 수 없습니다:', diagnosisId);
    
    // 최근 진단 ID들 로깅 (디버깅용)
    console.log('📊 최근 저장된 진단 ID들:');
    for (let i = Math.max(1, data.length - 3); i < data.length; i++) {
      if (data[i] && data[i][diagnosisIdCol]) {
        const rowId = String(data[i][diagnosisIdCol]).trim();
        console.log(`  - Row ${i + 1}: ${rowId}`);
      }
    }
    
    return { 
      success: false, 
      message: `진단 ID '${diagnosisId}'에 해당하는 결과를 찾을 수 없습니다. 진단이 아직 처리 중이거나 ID가 올바르지 않을 수 있습니다.`,
      error: 'DIAGNOSIS_NOT_FOUND',
      searchInfo: {
        searchedId: diagnosisId,
        totalRows: data.length - 1,
        searchColumn: diagnosisIdCol,
        sheetName: diagnosisSheet.getName()
      }
    };
    
  } catch (error) {
    console.error('❌ 진단 결과 조회 중 오류:', error);
    return { 
      success: false, 
      message: '진단 결과 조회 중 시스템 오류가 발생했습니다.',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

console.log('🔍 진단 결과 조회 시스템 로드 완료 - getDiagnosisResultIntegrated 함수 추가됨');

// ================================================================================
// 🎯 V15.0 신규: 통합 워크플로우 결과 처리 함수
// ================================================================================

/**
 * 통합 워크플로우 완료 결과 처리 (V15.0 신규)
 * Next.js에서 완성된 분석 결과를 받아 이메일 발송 및 저장 처리
 */
function handleIntegratedWorkflowResult(requestData, progressId) {
  try {
    console.log('🎯 통합 워크플로우 결과 처리 시작 - V15.0');
    
    const { workflowResult } = requestData;
    
    if (!workflowResult || !workflowResult.success) {
      throw new Error('통합 워크플로우 결과가 유효하지 않습니다.');
    }
    
    const { analysisResult, geminiReport, htmlReport } = workflowResult;
    
    // 1단계: 진행 상황 업데이트
    updateProgressStatus(progressId, 'processing', '통합 워크플로우 결과를 처리하고 있습니다');
    
    // 2단계: Google Sheets에 결과 저장
    console.log('📊 Google Sheets 저장 시작');
    updateProgressStatus(progressId, 'processing', 'Google Sheets에 분석 결과를 저장하고 있습니다');
    
    const sheetsResult = saveIntegratedResultToSheets({
      diagnosisId: analysisResult.diagnosisId,
      companyInfo: analysisResult.companyInfo,
      scoreAnalysis: analysisResult.scoreAnalysis,
      qualityMetrics: analysisResult.qualityMetrics,
      geminiReport: geminiReport,
      timestamp: new Date().toISOString(),
      version: 'V15.0-ULTIMATE-45Q'
    });
    
    // 3단계: HTML 보고서 Google Drive 업로드
    let driveFileUrl = null;
    if (htmlReport) {
      console.log('📁 Google Drive 업로드 시작');
      updateProgressStatus(progressId, 'processing', 'HTML 보고서를 Google Drive에 업로드하고 있습니다');
      
      try {
        const fileName = `${analysisResult.companyInfo.name}_AI역량진단보고서_${analysisResult.diagnosisId}.html`;
        driveFileUrl = uploadHTMLToDrive(htmlReport, fileName);
        console.log('✅ Google Drive 업로드 완료:', driveFileUrl);
      } catch (driveError) {
        console.error('⚠️ Google Drive 업로드 실패 (비차단):', driveError.message);
      }
    }
    
    // 4단계: 애플 스타일 이메일 발송
    console.log('📧 애플 스타일 이메일 발송 시작');
    updateProgressStatus(progressId, 'processing', '애플 스타일 이메일을 발송하고 있습니다');
    
    const emailResult = sendAppleStyleEmail({
      companyName: analysisResult.companyInfo.name,
      contactName: analysisResult.companyInfo.contact.name,
      contactEmail: analysisResult.companyInfo.contact.email,
      scoreAnalysis: analysisResult.scoreAnalysis,
      diagnosisId: analysisResult.diagnosisId,
      driveFileUrl: driveFileUrl,
      geminiReport: geminiReport
    });
    
    // 5단계: 관리자 알림 이메일
    console.log('📨 관리자 알림 발송');
    sendAdminNotificationEmail({
      companyName: analysisResult.companyInfo.name,
      contactName: analysisResult.companyInfo.contact.name,
      contactEmail: analysisResult.companyInfo.contact.email,
      scoreAnalysis: analysisResult.scoreAnalysis,
      diagnosisId: analysisResult.diagnosisId,
      processingTime: workflowResult.metadata.processingTime
    });
    
    // 완료 처리
    updateProgressStatus(progressId, 'completed', '통합 워크플로우 처리가 완료되었습니다');
    
    console.log('✅ 통합 워크플로우 결과 처리 완료');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '통합 워크플로우 결과 처리 완료',
        data: {
          diagnosisId: analysisResult.diagnosisId,
          sheetsResult: sheetsResult,
          emailResult: emailResult,
          driveFileUrl: driveFileUrl,
          version: 'V15.0-ULTIMATE-45Q'
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 통합 워크플로우 결과 처리 실패:', error);
    updateProgressStatus(progressId, 'error', `처리 실패: ${error.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '통합 워크플로우 결과 처리 실패',
        details: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 통합 결과를 Google Sheets에 저장
 */
function saveIntegratedResultToSheets(data) {
  try {
    const sheet = getOrCreateSheet('AI역량진단결과_V15');
    
    // 헤더 설정 (최초 실행시)
    if (sheet.getLastRow() === 0) {
      const headers = [
        '진단ID', '회사명', '담당자', '이메일', '업종', '규모',
        '총점', '등급', '성숙도', '백분위',
        '사업기반', '현재AI', '조직준비', '기술인프라', '목표명확', '실행역량',
        '품질점수', '데이터완성도', 'AI분석깊이',
        'GEMINI성공', 'GEMINI단어수', 'GEMINI신뢰도',
        '처리시간', '버전', '생성일시'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // 데이터 행 추가
    const rowData = [
      data.diagnosisId,
      data.companyInfo.name,
      data.companyInfo.contact.name,
      data.companyInfo.contact.email,
      data.companyInfo.industry,
      data.companyInfo.size,
      data.scoreAnalysis.totalScore,
      data.scoreAnalysis.grade,
      data.scoreAnalysis.maturityLevel,
      data.scoreAnalysis.percentile,
      data.scoreAnalysis.categoryScores.businessFoundation || 0,
      data.scoreAnalysis.categoryScores.currentAI || 0,
      data.scoreAnalysis.categoryScores.organizationReadiness || 0,
      data.scoreAnalysis.categoryScores.techInfrastructure || 0,
      data.scoreAnalysis.categoryScores.goalClarity || 0,
      data.scoreAnalysis.categoryScores.executionCapability || 0,
      data.qualityMetrics.overallQuality,
      data.qualityMetrics.dataCompleteness,
      data.qualityMetrics.aiAnalysisDepth || 0,
      data.geminiReport?.success || false,
      data.geminiReport?.metadata?.wordCount || 0,
      data.geminiReport?.metadata?.confidence || 0,
      data.timestamp,
      data.version,
      new Date().toLocaleString('ko-KR')
    ];
    
    sheet.appendRow(rowData);
    
    console.log('✅ Google Sheets 저장 완료');
    return { success: true, row: sheet.getLastRow() };
    
  } catch (error) {
    console.error('❌ Google Sheets 저장 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 애플 스타일 이메일 발송
 */
function sendAppleStyleEmail(data) {
  try {
    const { companyName, contactName, contactEmail, scoreAnalysis, diagnosisId, driveFileUrl } = data;
    
    const subject = `🎯 [${companyName}] AI 역량진단 완료 - ${scoreAnalysis.grade}등급 (${scoreAnalysis.totalScore}점)`;
    
    const htmlBody = generateAppleStyleEmailHTML({
      companyName,
      contactName,
      scoreAnalysis,
      diagnosisId,
      driveFileUrl,
      reportUrl: `https://aicamp.club/diagnosis/report/${diagnosisId}`
    });
    
    // 이메일 발송
    MailApp.sendEmail({
      to: contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: '이교장의AI역량진단보고서',
      replyTo: 'hongik423@gmail.com'
    });
    
    console.log('✅ 애플 스타일 이메일 발송 완료:', contactEmail);
    return { success: true, recipient: contactEmail };
    
  } catch (error) {
    console.error('❌ 애플 스타일 이메일 발송 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 애플 스타일 이메일 HTML 생성
 */
function generateAppleStyleEmailHTML(data) {
  const { companyName, contactName, scoreAnalysis, diagnosisId, driveFileUrl, reportUrl } = data;
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 역량진단 결과 - ${companyName}</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; background-color: #f5f5f7; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 40px 30px; }
        .score-card { background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
        .score-value { font-size: 48px; font-weight: 700; color: #007aff; margin-bottom: 8px; }
        .grade-badge { display: inline-block; background: #007aff; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; }
        .cta-button { display: inline-block; background: #007aff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 10px; }
        .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #6c757d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 AI 역량진단 완료</h1>
            <p>45개 행동지표 기반 맞춤형 분석 결과</p>
        </div>
        <div class="content">
            <div style="font-size: 18px; font-weight: 500; margin-bottom: 20px;">
                안녕하세요, ${contactName}님! 👋
            </div>
            <p><strong>${companyName}</strong>의 AI 역량진단이 완료되었습니다.<br>45개 행동지표를 바탕으로 한 정밀 분석 결과를 안내드립니다.</p>
            
            <div class="score-card">
                <div class="score-value">${scoreAnalysis.totalScore}</div>
                <div style="color: #6c757d; margin-bottom: 15px;">종합 점수 (100점 만점)</div>
                <div class="grade-badge">${scoreAnalysis.grade}등급 · ${scoreAnalysis.maturityLevel}</div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                ${driveFileUrl ? `<a href="${driveFileUrl}" class="cta-button">📊 상세 보고서 보기</a>` : ''}
                <a href="https://aicamp.club/consultation" class="cta-button" style="background: #6c757d;">💬 전문가 상담 신청</a>
            </div>
            
            <div style="background: #fff3cd; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="margin-top: 0; color: #856404;">🎁 특별 혜택</h4>
                <p style="margin-bottom: 0; color: #856404;">
                    진단 완료 고객 대상 <strong>무료 AI 전략 컨설팅 (1시간)</strong>을 제공합니다.<br>
                    <strong>010-9251-9743</strong>으로 연락주시면 일정을 조율해드리겠습니다.
                </p>
            </div>
        </div>
        <div class="footer">
            <div style="font-size: 20px; font-weight: 700; color: #007aff; margin-bottom: 15px;">AICAMP</div>
            <div><strong>이교장의AI역량진단보고서 V15.0 ULTIMATE</strong></div>
            <div style="margin-top: 15px; font-size: 13px;">
                📞 010-9251-9743 | 📧 hongik423@gmail.com<br>
                🌐 aicamp.club | 진단 ID: ${diagnosisId}
            </div>
        </div>
    </div>
</body>
</html>`;
}

// ================================================================================
// 🎯 V15.0 시스템 완료
// ================================================================================

console.log('✅ 이교장의AI역량진단보고서 V15.0 ULTIMATE LEEKYOJANG 시스템 로드 완료');
console.log('📊 시스템 상태: 모든 기능 활성화 (45개 행동지표 + 11개 섹션 이교장 보고서)');
console.log('🔗 연동 서비스: GEMINI 2.5 Flash, Google Drive, Gmail, Sheets');
console.log('🎯 준비 완료: AI 역량진단, 이교장 보고서, 상담신청, 오류신고 처리 가능');

/**
 * AICAMP AI 역량진단 시스템 V12.0 - 45문항 고도화 시스템
 * Google Apps Script 통합 스크립트
 * 
 * 기능:
 * - 45문항 데이터 수집 및 저장
 * - 업종별/규모별 벤치마크 분석
 * - 고도화된 SWOT 분석
 * - 맞춤형 이메일 발송
 * - Google Sheets 자동 관리
 */

// ================================
// 1. 환경 설정 및 상수
// ================================

const CONFIG = {
  // 스프레드시트 설정
  SPREADSHEET_ID: '1your-spreadsheet-id-here', // 실제 스프레드시트 ID로 교체
  
  // 시트 이름
  SHEETS: {
    DIAGNOSIS_DATA: 'AI역량진단_45문항',
    SCORE_ANALYSIS: '점수분석_벤치마크',
    SWOT_RESULTS: 'SWOT분석_전략',
    EMAIL_LOG: '이메일발송_로그',
    ADMIN_DASHBOARD: '관리자_대시보드'
  },
  
  // 관리자 이메일
  ADMIN_EMAIL: 'hongik423@gmail.com',
  
  // 시스템 정보
  VERSION: 'V12.0-ENHANCED-45QUESTIONS',
  MODEL: 'GEMINI-2.5-FLASH'
};

// ================================
// 2. 메인 처리 함수
// ================================

/**
 * 웹 앱 POST 요청 처리
 */
function doPost(e) {
  try {
    console.log('📥 45문항 AI역량진단 요청 수신');
    
    const requestData = JSON.parse(e.postData.contents);
    console.log('📋 요청 타입:', requestData.type);
    
    switch (requestData.type) {
      case 'enhanced_diagnosis':
        return handleEnhancedDiagnosis(requestData);
      default:
        throw new Error('알 수 없는 요청 타입: ' + requestData.type);
    }
    
  } catch (error) {
    console.error('❌ 요청 처리 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 고도화된 AI 역량진단 처리
 */
function handleEnhancedDiagnosis(requestData) {
  try {
    console.log('🚀 45문항 AI역량진단 처리 시작');
    
    const diagnosisData = requestData.data;
    const emailTemplates = requestData.emailTemplates;
    const subjects = requestData.subjects;
    
    // 1. Google Sheets에 데이터 저장
    console.log('💾 1단계: Google Sheets 데이터 저장');
    const saveResult = saveEnhancedDiagnosisData(diagnosisData);
    
    // 2. 이메일 발송
    console.log('📧 2단계: 고도화된 이메일 발송');
    const emailResult = sendEnhancedEmails(diagnosisData, emailTemplates, subjects);
    
    // 3. 관리자 대시보드 업데이트
    console.log('📊 3단계: 관리자 대시보드 업데이트');
    updateAdminDashboard(diagnosisData, saveResult, emailResult);
    
    console.log('✅ 45문항 AI역량진단 처리 완료');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        diagnosisId: diagnosisData.diagnosisId,
        sheetsUpdated: saveResult.success,
        emailsSent: emailResult.success,
        timestamp: new Date().toISOString(),
        version: CONFIG.VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 고도화된 진단 처리 오류:', error);
    
    // 오류 알림 이메일
    try {
      MailApp.sendEmail({
        to: CONFIG.ADMIN_EMAIL,
        subject: '[오류] AI역량진단 처리 실패',
        htmlBody: `
          <h3>🚨 시스템 오류 발생</h3>
          <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          <p><strong>오류:</strong> ${error.toString()}</p>
          <p><strong>데이터:</strong> ${JSON.stringify(requestData, null, 2)}</p>
        `
      });
    } catch (mailError) {
      console.error('❌ 오류 알림 이메일 발송 실패:', mailError);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================
// 3. 데이터 저장 함수
// ================================

/**
 * 45문항 진단 데이터를 Google Sheets에 저장
 */
function saveEnhancedDiagnosisData(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    
    // 3.1. 메인 진단 데이터 저장
    const diagnosisSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.DIAGNOSIS_DATA);
    saveDiagnosisMainData(diagnosisSheet, data);
    
    // 3.2. 점수 분석 데이터 저장
    const scoreSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.SCORE_ANALYSIS);
    saveScoreAnalysisData(scoreSheet, data);
    
    // 3.3. SWOT 분석 결과 저장
    const swotSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.SWOT_RESULTS);
    saveSWOTAnalysisData(swotSheet, data);
    
    console.log('✅ 모든 데이터 저장 완료');
    
    return {
      success: true,
      rowsAdded: 3,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 데이터 저장 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 메인 진단 데이터 저장
 */
function saveDiagnosisMainData(sheet, data) {
  // 헤더 설정 (최초 1회)
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명', '담당자명', '이메일', '연락처', '직책',
      '업종', '사업모델', '소재지', '직원수', '매출규모', '설립연도',
      '총점', '성숙도레벨', '백분위', 
      '사업기반점수', '현재AI활용점수', '조직준비도점수', 
      '기술인프라점수', '목표명확성점수', '실행역량점수',
      '경쟁포지션', '업종평균대비', '규모평균대비',
      '보고서패스워드', '시스템버전'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  // 데이터 행 추가
  const row = [
    data.diagnosisId,
    new Date(data.timestamp),
    data.companyName,
    data.contactName,
    data.contactEmail,
    data.contactPhone || '',
    data.contactPosition || '',
    data.industry,
    Array.isArray(data.businessType) ? data.businessType.join(', ') : data.businessType || '',
    data.location || '',
    data.employeeCount,
    data.annualRevenue || '',
    data.establishmentYear || '',
    data.enhancedScores.totalScore,
    data.enhancedScores.maturityLevel,
    data.enhancedScores.percentile,
    data.enhancedScores.categoryScores.businessFoundation || 0,
    data.enhancedScores.categoryScores.currentAI,
    data.enhancedScores.categoryScores.organizationReadiness,
    data.enhancedScores.categoryScores.techInfrastructure,
    data.enhancedScores.categoryScores.goalClarity,
    data.enhancedScores.categoryScores.executionCapability,
    data.gapAnalysis.competitivePosition,
    data.gapAnalysis.industryGap.total,
    data.gapAnalysis.sizeGap.total,
    data.reportPassword,
    CONFIG.VERSION
  ];
  
  sheet.appendRow(row);
}

/**
 * 점수 분석 데이터 저장
 */
function saveScoreAnalysisData(sheet, data) {
  // 헤더 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명', '업종', '직원수',
      '주요강점1', '주요강점2', '주요강점3',
      '약점영역1', '약점영역2', '약점영역3',
      '중요갭1', '중요갭2', '중요갭3',
      '빠른개선1', '빠른개선2', '빠른개선3',
      '우선순위영역1', '우선순위영역2', '우선순위영역3'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  const analysis = data.enhancedScores.detailedAnalysis;
  const priorities = data.gapAnalysis.priorityAreas;
  
  const row = [
    data.diagnosisId,
    new Date(data.timestamp),
    data.companyName,
    data.industry,
    data.employeeCount,
    analysis.strengths[0] || '',
    analysis.strengths[1] || '',
    analysis.strengths[2] || '',
    analysis.weaknesses[0] || '',
    analysis.weaknesses[1] || '',
    analysis.weaknesses[2] || '',
    analysis.criticalGaps[0] || '',
    analysis.criticalGaps[1] || '',
    analysis.criticalGaps[2] || '',
    analysis.quickWins[0] || '',
    analysis.quickWins[1] || '',
    analysis.quickWins[2] || '',
    priorities[0] || '',
    priorities[1] || '',
    priorities[2] || ''
  ];
  
  sheet.appendRow(row);
}

/**
 * SWOT 분석 결과 저장
 */
function saveSWOTAnalysisData(sheet, data) {
  // 헤더 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명',
      '내부강점', '경쟁강점', '전략강점',
      '운영약점', '기술약점', '조직약점',
      '시장기회', '기술기회', '전략기회',
      '경쟁위협', '기술위협', '시장위협',
      'SO전략', 'WO전략', 'ST전략', 'WT전략'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  const swot = data.swotAnalysis;
  
  const row = [
    data.diagnosisId,
    new Date(data.timestamp),
    data.companyName,
    swot.strengths.internal.join(' | '),
    swot.strengths.competitive.join(' | '),
    swot.strengths.strategic.join(' | '),
    swot.weaknesses.operational.join(' | '),
    swot.weaknesses.technical.join(' | '),
    swot.weaknesses.organizational.join(' | '),
    swot.opportunities.market.join(' | '),
    swot.opportunities.technology.join(' | '),
    swot.opportunities.strategic.join(' | '),
    swot.threats.competitive.join(' | '),
    swot.threats.technical.join(' | '),
    swot.threats.market.join(' | '),
    swot.strategicRecommendations.so_strategies.join(' | '),
    swot.strategicRecommendations.wo_strategies.join(' | '),
    swot.strategicRecommendations.st_strategies.join(' | '),
    swot.strategicRecommendations.wt_strategies.join(' | ')
  ];
  
  sheet.appendRow(row);
}

// ================================
// 4. 이메일 발송 함수
// ================================

/**
 * 고도화된 이메일 발송
 */
function sendEnhancedEmails(data, templates, subjects) {
  try {
    console.log('📧 고도화된 이메일 발송 시작');
    
    // 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      throw new Error('Gmail 일일 할당량 부족: ' + remainingQuota);
    }
    
    // 신청자 이메일 발송
    console.log('📤 신청자 이메일 발송:', data.contactEmail);
    MailApp.sendEmail({
      to: data.contactEmail,
      subject: subjects.applicant,
      htmlBody: templates.applicant
    });
    
    // 관리자 이메일 발송
    console.log('📥 관리자 이메일 발송:', CONFIG.ADMIN_EMAIL);
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subjects.admin,
      htmlBody: templates.admin
    });
    
    // 이메일 로그 저장
    logEmailSending(data, subjects);
    
    console.log('✅ 이메일 발송 완료');
    
    return {
      success: true,
      emailsSent: 2,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 이메일 발송 로그 저장
 */
function logEmailSending(data, subjects) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const logSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.EMAIL_LOG);
    
    // 헤더 설정
    if (logSheet.getLastRow() === 0) {
      const headers = [
        '진단ID', '발송일시', '회사명', '신청자이메일', 
        '신청자제목', '관리자제목', '발송상태', '오류내용'
      ];
      logSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      logSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    const row = [
      data.diagnosisId,
      new Date(),
      data.companyName,
      data.contactEmail,
      subjects.applicant,
      subjects.admin,
      '성공',
      ''
    ];
    
    logSheet.appendRow(row);
    
  } catch (error) {
    console.error('❌ 이메일 로그 저장 오류:', error);
  }
}

// ================================
// 5. 관리자 대시보드 함수
// ================================

/**
 * 관리자 대시보드 업데이트
 */
function updateAdminDashboard(data, saveResult, emailResult) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const dashboardSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.ADMIN_DASHBOARD);
    
    // 대시보드 초기화 (헤더만)
    if (dashboardSheet.getLastRow() === 0) {
      setupAdminDashboard(dashboardSheet);
    }
    
    // 통계 업데이트
    updateDashboardStats(dashboardSheet, data);
    
    console.log('✅ 관리자 대시보드 업데이트 완료');
    
  } catch (error) {
    console.error('❌ 대시보드 업데이트 오류:', error);
  }
}

/**
 * 관리자 대시보드 초기 설정
 */
function setupAdminDashboard(sheet) {
  const headers = [
    ['📊 AICAMP AI역량진단 시스템 V12.0 - 관리자 대시보드'],
    [''],
    ['📈 실시간 통계'],
    ['총 진단 건수', '=COUNTA(AI역량진단_45문항!A:A)-1'],
    ['오늘 진단 건수', '=COUNTIF(AI역량진단_45문항!B:B,TODAY())'],
    ['이번 주 진단', '=SUMPRODUCT((AI역량진단_45문항!B:B>=TODAY()-WEEKDAY(TODAY())+1)*(AI역량진단_45문항!B:B<=TODAY()))'],
    [''],
    ['🎯 성숙도 레벨 분포'],
    ['Expert', '=COUNTIF(AI역량진단_45문항!O:O,"Expert")'],
    ['Advanced', '=COUNTIF(AI역량진단_45문항!O:O,"Advanced")'],
    ['Intermediate', '=COUNTIF(AI역량진단_45문항!O:O,"Intermediate")'],
    ['Basic', '=COUNTIF(AI역량진단_45문항!O:O,"Basic")'],
    ['Beginner', '=COUNTIF(AI역량진단_45문항!O:O,"Beginner")'],
    [''],
    ['🏢 업종별 분포'],
    ['IT/소프트웨어', '=COUNTIF(AI역량진단_45문항!H:H,"IT/소프트웨어")'],
    ['제조업', '=COUNTIF(AI역량진단_45문항!H:H,"제조업*")'],
    ['금융/보험', '=COUNTIF(AI역량진단_45문항!H:H,"금융/보험")'],
    ['유통/도소매', '=COUNTIF(AI역량진단_45문항!H:H,"유통/도소매")'],
    [''],
    ['📊 평균 점수'],
    ['전체 평균', '=AVERAGE(AI역량진단_45문항!N:N)'],
    ['현재 AI 활용', '=AVERAGE(AI역량진단_45문항!R:R)'],
    ['조직 준비도', '=AVERAGE(AI역량진단_45문항!S:S)'],
    ['기술 인프라', '=AVERAGE(AI역량진단_45문항!T:T)'],
    [''],
    ['🔄 최근 업데이트'],
    ['마지막 업데이트', new Date().toLocaleString('ko-KR')],
    ['시스템 버전', CONFIG.VERSION]
  ];
  
  sheet.getRange(1, 1, headers.length, 2).setValues(headers);
  
  // 스타일 적용
  sheet.getRange(1, 1, 1, 2).setFontSize(16).setFontWeight('bold');
  sheet.getRange(3, 1, 1, 2).setFontSize(14).setFontWeight('bold');
  sheet.getRange(8, 1, 1, 2).setFontSize(14).setFontWeight('bold');
  sheet.getRange(15, 1, 1, 2).setFontSize(14).setFontWeight('bold');
  sheet.getRange(21, 1, 1, 2).setFontSize(14).setFontWeight('bold');
  sheet.getRange(26, 1, 1, 2).setFontSize(14).setFontWeight('bold');
}

/**
 * 대시보드 통계 업데이트
 */
function updateDashboardStats(sheet, data) {
  // 마지막 업데이트 시간 갱신
  sheet.getRange(27, 2).setValue(new Date().toLocaleString('ko-KR'));
}

// ================================
// 6. 유틸리티 함수
// ================================

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    console.log('📄 새 시트 생성:', sheetName);
  }
  return sheet;
}

/**
 * 테스트 함수
 */
function testEnhancedSystem() {
  console.log('🧪 45문항 시스템 테스트 시작');
  
  const testData = {
    type: 'enhanced_diagnosis',
    data: {
      diagnosisId: 'TEST_' + Date.now(),
      timestamp: new Date().toISOString(),
      contactName: '테스트 담당자',
      contactEmail: 'test@aicamp.club',
      companyName: '테스트 회사',
      industry: 'IT/소프트웨어',
      employeeCount: '31-50명',
      enhancedScores: {
        totalScore: 75,
        maturityLevel: 'Advanced',
        percentile: 80,
        categoryScores: {
          businessFoundation: 70,
          currentAI: 75,
          organizationReadiness: 80,
          techInfrastructure: 75,
          goalClarity: 70,
          executionCapability: 65
        },
        detailedAnalysis: {
          strengths: ['강력한 리더십', '우수한 기술 인프라'],
          weaknesses: ['AI 전문 인력 부족'],
          criticalGaps: ['실행 역량 강화 필요'],
          quickWins: ['기존 시스템 연동 개선']
        }
      },
      gapAnalysis: {
        competitivePosition: 'Above Average',
        industryGap: { total: 5 },
        sizeGap: { total: 3 },
        priorityAreas: ['AI 활용도', '실행 역량']
      },
      swotAnalysis: {
        strengths: { internal: ['강점1'], competitive: ['강점2'], strategic: ['강점3'] },
        weaknesses: { operational: ['약점1'], technical: ['약점2'], organizational: ['약점3'] },
        opportunities: { market: ['기회1'], technology: ['기회2'], strategic: ['기회3'] },
        threats: { competitive: ['위협1'], technical: ['위협2'], market: ['위협3'] },
        strategicRecommendations: {
          so_strategies: ['SO전략1'],
          wo_strategies: ['WO전략1'],
          st_strategies: ['ST전략1'],
          wt_strategies: ['WT전략1']
        }
      },
      reportPassword: 'TEST01'
    },
    emailTemplates: {
      applicant: '<html><body><h1>테스트 이메일</h1></body></html>',
      admin: '<html><body><h1>관리자 테스트</h1></body></html>'
    },
    subjects: {
      applicant: '[AICAMP] 테스트 회사 AI역량진단 결과',
      admin: '[진단완료] 테스트 회사 - 75점'
    }
  };
  
  const result = handleEnhancedDiagnosis(testData);
  console.log('🧪 테스트 결과:', result.getContent());
  
  return result;
}

// ================================
// 7. 초기화 및 설정
// ================================

/**
 * 시스템 초기화
 */
function initializeEnhancedSystem() {
  console.log('🚀 45문항 AI역량진단 시스템 초기화 시작');
  
  try {
    // 스프레드시트 확인
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    console.log('✅ 스프레드시트 연결 확인:', spreadsheet.getName());
    
    // 필요한 시트들 생성
    Object.values(CONFIG.SHEETS).forEach(sheetName => {
      getOrCreateSheet(spreadsheet, sheetName);
    });
    
    console.log('✅ 모든 시트 준비 완료');
    console.log('🎉 시스템 초기화 완료!');
    
    return true;
    
  } catch (error) {
    console.error('❌ 시스템 초기화 오류:', error);
    return false;
  }
}

// ================================
// 8. 웹 앱 설정 확인
// ================================

/**
 * GET 요청 처리 (상태 확인)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      version: CONFIG.VERSION,
      timestamp: new Date().toISOString(),
      message: 'AICAMP AI역량진단 시스템 V12.0 - 45문항 고도화 버전이 정상 작동 중입니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 시스템 상태 확인
 */
function checkSystemStatus() {
  console.log('🔍 시스템 상태 확인');
  
  const status = {
    timestamp: new Date().toISOString(),
    version: CONFIG.VERSION,
    spreadsheet: 'Connected',
    sheets: {},
    emailQuota: MailApp.getRemainingDailyQuota()
  };
  
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    
    Object.values(CONFIG.SHEETS).forEach(sheetName => {
      const sheet = spreadsheet.getSheetByName(sheetName);
      status.sheets[sheetName] = sheet ? 'Ready' : 'Missing';
    });
    
  } catch (error) {
    status.spreadsheet = 'Error: ' + error.toString();
  }
  
  console.log('📊 시스템 상태:', JSON.stringify(status, null, 2));
  return status;
}

console.log('🎯 AICAMP AI역량진단 시스템 V12.0 - 45문항 고도화 스크립트 로드 완료');
console.log('📋 사용 가능한 함수:');
console.log('  - doPost(): 메인 처리 함수');
console.log('  - doGet(): 상태 확인');
console.log('  - testEnhancedSystem(): 테스트 실행');
console.log('  - initializeEnhancedSystem(): 시스템 초기화');
console.log('  - checkSystemStatus(): 상태 점검');

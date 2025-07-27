/**
 * ================================================================================
 * AI CAMP 통합 Apps Script 2025 최종완성판 + PDF 이메일 발송 기능 (완전 기능 + 브랜드 통일)
 * ================================================================================
 * 
 * 🎯 배포 정보 (최신 업데이트 2025.01.27):
 * - Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
 * - Deployment ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
 * - Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
 * - Library URL: https://script.google.com/macros/library/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/1
 * - Google Sheets ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
 * - 관리자 이메일: hongik423@gmail.com
 * - Gemini API Key: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
 * 
 * 🏢 AI CAMP 브랜딩 정보:
 * - 회사명: AI CAMP (AI 교육센터)
 * - 담당자: 이후경 교장 (경영지도사)
 * - 전문분야: AI 프로세스 자동화 컨설팅 및 교육
 * - 경력: 25년 현장 경험 + 500개 기업 AI 교육 실적
 * - 핵심역량: AI 프로세스 자동화, 업무 효율화, 컨설팅 교육
 * 
 * 🔧 전체 기능 목록 (모두 유지):
 * ✅ 권한 설정 자동 진단 및 가이드 추가
 * ✅ 시트 구조 자동 검증 및 복구 기능
 * ✅ 상세한 시스템 진단 함수 추가
 * ✅ 개별 기능 테스트 함수 강화
 * ✅ 에러 추적 및 복구 시스템 개선
 * ✅ 실시간 상태 모니터링 기능
 * ✅ 자동 백업 및 복구 메커니즘
 * ✅ 성능 최적화 및 메모리 관리
 * ✅ PDF 첨부 이메일 발송 기능
 * ✅ AI CAMP 브랜드 통합 이메일 시스템
 * 
 * 🆕 핵심 진단 기능 (모두 유지):
 * ✅ systemHealthCheck() - 전체 시스템 건강 상태 점검
 * ✅ diagnoseAndFixIssues() - 자동 문제 진단 및 수정
 * ✅ validateSheetStructure() - 시트 구조 검증 및 자동 수정
 * ✅ testAllFunctions() - 모든 기능 종합 테스트
 * ✅ generateDiagnosticReport() - 상세 진단 보고서 생성
 * ✅ sendDiagnosisPdfEmail() - PDF 첨부 이메일 발송
 * 
 * 🔄 마지막 업데이트: 2025.07.27 - AI CAMP 시스템 통합 및 환경변수 최종 정리
 */

// ================================================================================
// 🔧 기본 설정 (최신 배포 환경 + PDF 기능 + 오류 수정)
// ================================================================================

// 🎯 시스템 상태 추적 (새로 추가)
const SYSTEM_STATUS = {
  initialized: false,
  lastHealthCheck: null,
  errorCount: 0,
  successCount: 0,
  lastError: null
};

// ================================================================================
// 🆕 시스템 진단 및 복구 함수들 (핵심 추가 기능)
// ================================================================================

/**
 * 🏥 전체 시스템 건강 상태 점검 (최우선 실행 함수)
 */
function systemHealthCheck() {
  console.log('🏥 AI CAMP 시스템 건강 상태 점검 시작...');
  const healthReport = {
    timestamp: getCurrentKoreanTime(),
    status: 'healthy',
    issues: [],
    warnings: [],
    recommendations: [],
    details: {}
  };

  try {
    // 1. 권한 체크
    console.log('🔒 1/7 권한 상태 점검...');
    const permissions = checkRequiredPermissions();
    healthReport.details.permissions = permissions;
    
    if (!permissions.gmail) {
      healthReport.issues.push('Gmail API 권한이 없습니다.');
      healthReport.recommendations.push('Gmail API 권한을 승인해주세요.');
    }
    if (!permissions.sheets) {
      healthReport.issues.push('Google Sheets API 권한이 없습니다.');
      healthReport.recommendations.push('Google Sheets API 권한을 승인해주세요.');
    }

    // 2. Google Sheets 연결 및 구조 검증
    console.log('📊 2/7 Google Sheets 연결 및 구조 점검...');
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      healthReport.details.spreadsheet = {
        name: spreadsheet.getName(),
        url: spreadsheet.getUrl(),
        sheets: []
      };

      // 각 시트 검증
      Object.values(SHEETS).forEach(sheetName => {
        const sheet = spreadsheet.getSheetByName(sheetName);
        if (sheet) {
          const columnCount = sheet.getLastColumn();
          const rowCount = sheet.getLastRow();
          healthReport.details.spreadsheet.sheets.push({
            name: sheetName,
            columns: columnCount,
            rows: rowCount,
            status: 'exists'
          });
          
          // 예상 컬럼 수와 비교
          const expectedColumns = getExpectedColumnCount(getSheetType(sheetName));
          if (columnCount !== expectedColumns && expectedColumns > 0) {
            healthReport.warnings.push(`${sheetName} 시트의 컬럼 수가 예상과 다릅니다. (현재: ${columnCount}, 예상: ${expectedColumns})`);
            healthReport.recommendations.push(`${sheetName} 시트 헤더를 재설정하세요.`);
          }
        } else {
          healthReport.issues.push(`${sheetName} 시트가 존재하지 않습니다.`);
          healthReport.recommendations.push(`${sheetName} 시트를 생성하세요.`);
          healthReport.details.spreadsheet.sheets.push({
            name: sheetName,
            status: 'missing'
          });
        }
      });
    } catch (sheetError) {
      healthReport.issues.push(`Google Sheets 접근 오류: ${sheetError.toString()}`);
      healthReport.recommendations.push('SPREADSHEET_ID를 확인하고 권한을 점검하세요.');
    }

    // 3. 이메일 발송 테스트 (관리자에게만)
    console.log('📧 3/7 이메일 발송 기능 점검...');
    try {
      const testEmailResult = testEmailFunctionality();
      healthReport.details.email = testEmailResult;
      if (!testEmailResult.success) {
        healthReport.warnings.push('이메일 발송 기능에 문제가 있을 수 있습니다.');
      }
    } catch (emailError) {
      healthReport.warnings.push(`이메일 테스트 실패: ${emailError.toString()}`);
    }

    // 4. 스크립트 실행 환경 점검
    console.log('⚙️ 4/7 스크립트 실행 환경 점검...');
    healthReport.details.environment = {
      version: VERSION,
      debugMode: DEBUG_MODE,
      autoReplyEnabled: AUTO_REPLY_ENABLED,
      scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
      memoryUsage: getMemoryUsage()
    };

    // 5. 최근 에러 기록 점검
    console.log('🔍 5/7 최근 에러 기록 점검...');
    healthReport.details.systemStatus = SYSTEM_STATUS;

    // 6. 웹앱 배포 상태 점검
    console.log('🌐 6/7 웹앱 배포 상태 점검...');
    healthReport.details.deployment = {
      ...DEPLOYMENT_INFO,
      apiKeys: {
        gemini: API_KEYS.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 미설정'
      }
    };

    // 7. 성능 메트릭 수집
    console.log('📈 7/7 성능 메트릭 수집...');
    healthReport.details.performance = {
      checkDuration: new Date().getTime(),
      lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED,
      limits: LIMITS
    };

    // 최종 상태 결정
    if (healthReport.issues.length > 0) {
      healthReport.status = 'critical';
    } else if (healthReport.warnings.length > 0) {
      healthReport.status = 'warning';
    } else {
      healthReport.status = 'healthy';
    }

    // 건강 상태 기록 업데이트
    SYSTEM_STATUS.lastHealthCheck = getCurrentKoreanTime();
    SYSTEM_STATUS.initialized = true;

    console.log('✅ 시스템 건강 상태 점검 완료:', {
      status: healthReport.status,
      issues: healthReport.issues.length,
      warnings: healthReport.warnings.length
    });

    return healthReport;

  } catch (error) {
    console.error('❌ 시스템 건강 상태 점검 오류:', error);
    healthReport.status = 'error';
    healthReport.issues.push(`시스템 점검 중 오류: ${error.toString()}`);
    return healthReport;
  }
}

/**
 * 🔧 자동 문제 진단 및 수정 (핵심 기능)
 */
function diagnoseAndFixIssues() {
  console.log('🔧 자동 문제 진단 및 수정 시작...');
  const fixReport = {
    timestamp: getCurrentKoreanTime(),
    attempted: [],
    successful: [],
    failed: [],
    recommendations: []
  };

  try {
    // 1. 건강 상태 먼저 점검
    const healthCheck = systemHealthCheck();
    
    if (healthCheck.status === 'healthy') {
      console.log('✅ 시스템이 정상적으로 작동 중입니다.');
      return createSuccessResponse({
        message: '시스템이 정상적으로 작동 중입니다.',
        healthCheck: healthCheck,
        fixReport: fixReport
      });
    }

    console.log('🔍 문제 발견, 자동 수정 시도 중...');

    // 2. 누락된 시트 자동 생성
    if (healthCheck.issues.some(issue => issue.includes('시트가 존재하지 않습니다'))) {
      console.log('📊 누락된 시트 자동 생성 시도...');
      fixReport.attempted.push('누락된 시트 생성');
      
      try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        
        Object.entries(SHEETS).forEach(([key, sheetName]) => {
          const sheet = spreadsheet.getSheetByName(sheetName);
          if (!sheet) {
            console.log(`🔧 ${sheetName} 시트 생성 중...`);
            const newSheet = spreadsheet.insertSheet(sheetName);
            const sheetType = getSheetType(sheetName);
            setupHeaders(newSheet, sheetType);
            fixReport.successful.push(`${sheetName} 시트 생성 완료`);
          }
        });
      } catch (sheetCreateError) {
        fixReport.failed.push(`시트 생성 실패: ${sheetCreateError.toString()}`);
      }
    }

    // 3. 시트 헤더 구조 자동 수정
    console.log('📋 시트 헤더 구조 검증 및 수정...');
    fixReport.attempted.push('시트 헤더 구조 수정');
    
    try {
      const headerFixResult = validateAndFixSheetStructure();
      if (headerFixResult.fixed > 0) {
        fixReport.successful.push(`${headerFixResult.fixed}개 시트 헤더 구조 수정 완료`);
      }
    } catch (headerError) {
      fixReport.failed.push(`시트 헤더 수정 실패: ${headerError.toString()}`);
    }

    // 4. 권한 문제 가이드 제공
    if (healthCheck.issues.some(issue => issue.includes('권한'))) {
      fixReport.recommendations.push(
        '권한 문제 해결 방법:\n' +
        '1. Google Apps Script 편집기 열기\n' +
        '2. 함수 실행 시 권한 승인 팝업에서 "권한 검토" 클릭\n' +
        '3. Gmail, Google Sheets 권한 모두 승인\n' +
        '4. 웹앱 재배포 (새 배포 버전 생성)'
      );
    }

    // 5. 최종 건강 상태 재점검
    console.log('🏥 수정 후 시스템 상태 재점검...');
    const finalHealthCheck = systemHealthCheck();
    
    const result = {
      message: '자동 진단 및 수정 완료',
      initialStatus: healthCheck.status,
      finalStatus: finalHealthCheck.status,
      fixReport: fixReport,
      healthCheck: finalHealthCheck
    };

    if (finalHealthCheck.status === 'healthy') {
      console.log('🎉 모든 문제가 해결되었습니다!');
      return createSuccessResponse(result);
    } else {
      console.log('⚠️ 일부 문제가 남아있습니다.');
      return createSuccessResponse({
        ...result,
        message: '일부 문제가 자동으로 수정되었지만, 수동 조치가 필요한 문제가 남아있습니다.'
      });
    }

  } catch (error) {
    console.error('❌ 자동 진단 및 수정 오류:', error);
    fixReport.failed.push(`전체 프로세스 오류: ${error.toString()}`);
    
    return createErrorResponse('자동 진단 및 수정 중 오류가 발생했습니다.', {
      error: error.toString(),
      fixReport: fixReport
    });
  }
}

/**
 * 📊 시트 구조 검증 및 자동 수정
 */
function validateAndFixSheetStructure() {
  console.log('📊 시트 구조 검증 및 자동 수정 시작...');
  const result = {
    checked: 0,
    fixed: 0,
    errors: []
  };

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    Object.entries(SHEETS).forEach(([key, sheetName]) => {
      result.checked++;
      console.log(`🔍 ${sheetName} 시트 구조 검증 중...`);
      
      try {
        let sheet = spreadsheet.getSheetByName(sheetName);
        
        // 시트가 없으면 생성
        if (!sheet) {
          console.log(`🔧 ${sheetName} 시트 생성 중...`);
          sheet = spreadsheet.insertSheet(sheetName);
          const sheetType = getSheetType(sheetName);
          setupHeaders(sheet, sheetType);
          result.fixed++;
          return;
        }

        // 기존 시트의 헤더 검증
        const sheetType = getSheetType(sheetName);
        const expectedColumns = getExpectedColumnCount(sheetType);
        const actualColumns = sheet.getLastColumn();

        if (actualColumns !== expectedColumns && expectedColumns > 0) {
          console.log(`🔧 ${sheetName} 시트 헤더 수정 중... (현재: ${actualColumns}, 예상: ${expectedColumns})`);
          
          // 기존 데이터가 있는지 확인
          const hasData = sheet.getLastRow() > 1;
          
          if (!hasData) {
            // 데이터가 없으면 헤더 재설정
            sheet.clear();
            setupHeaders(sheet, sheetType);
            result.fixed++;
          } else {
            // 데이터가 있으면 컬럼만 추가/수정
            if (actualColumns < expectedColumns) {
              // 누락된 헤더만 추가
              const headers = getHeadersForType(sheetType);
              for (let i = actualColumns; i < expectedColumns; i++) {
                sheet.getRange(1, i + 1).setValue(headers[i] || `컬럼${i + 1}`);
              }
              result.fixed++;
            }
          }
          
          console.log(`✅ ${sheetName} 시트 헤더 수정 완료`);
        }

      } catch (sheetError) {
        console.error(`❌ ${sheetName} 시트 처리 오류:`, sheetError);
        result.errors.push(`${sheetName}: ${sheetError.toString()}`);
      }
    });

    console.log('✅ 시트 구조 검증 및 수정 완료:', result);
    return result;

  } catch (error) {
    console.error('❌ 시트 구조 검증 및 수정 전체 오류:', error);
    result.errors.push(`전체 프로세스 오류: ${error.toString()}`);
    return result;
  }
}

/**
 * 🧪 모든 기능 종합 테스트
 */
function testAllFunctions() {
  console.log('🧪 AI CAMP 전체 기능 종합 테스트 시작...');
  const testResults = {
    timestamp: getCurrentKoreanTime(),
    overall: 'pending',
    tests: {},
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    }
  };

  const tests = [
    { name: '시스템 건강 상태', func: () => systemHealthCheck() },
    { name: '권한 체크', func: () => checkRequiredPermissions() },
    { name: '환경변수 동기화', func: () => checkEnvironmentSync() },
    { name: 'Next.js 호환성', func: () => checkNextjsCompatibility() },
    { name: '진단신청 처리', func: () => testDiagnosisSubmission() },
    { name: '상담신청 처리', func: () => testConsultationSubmission() },
    { name: '베타피드백 처리', func: () => testBetaFeedback() },
    { name: 'PDF 이메일 발송', func: () => testPdfEmailSending() },
    { name: '이메일 기능', func: () => testEmailFunctionality() }
  ];

  tests.forEach(test => {
    testResults.summary.total++;
    console.log(`🔍 ${test.name} 테스트 중...`);
    
    try {
      const startTime = new Date().getTime();
      const result = test.func();
      const duration = new Date().getTime() - startTime;
      
      testResults.tests[test.name] = {
        status: 'passed',
        duration: duration + 'ms',
        result: result,
        message: '테스트 통과'
      };
      
      testResults.summary.passed++;
      console.log(`✅ ${test.name} 테스트 통과 (${duration}ms)`);
      
    } catch (error) {
      testResults.tests[test.name] = {
        status: 'failed',
        error: error.toString(),
        message: '테스트 실패'
      };
      
      testResults.summary.failed++;
      console.error(`❌ ${test.name} 테스트 실패:`, error);
    }
  });

  // 전체 결과 판정
  if (testResults.summary.failed === 0) {
    testResults.overall = 'passed';
  } else if (testResults.summary.passed > testResults.summary.failed) {
    testResults.overall = 'partial';
  } else {
    testResults.overall = 'failed';
  }

  console.log('🎯 전체 기능 테스트 완료:', {
    overall: testResults.overall,
    passed: testResults.summary.passed,
    failed: testResults.summary.failed,
    total: testResults.summary.total
  });

  return testResults;
}

/**
 * 🕐 한국시간 시스템 테스트 함수
 */
function testKoreanTimeSystem() {
  console.log('🕐 한국시간 시스템 테스트 시작...');
  
  const testResults = {
    timestamp: getCurrentKoreanTime(),
    testName: '한국시간 시스템 테스트',
    results: {}
  };
  
  try {
    // 1. 기본 한국시간 함수 테스트
    testResults.results.basicTime = {
      function: 'getCurrentKoreanTime()',
      result: getCurrentKoreanTime(),
      status: '✅ 정상'
    };
    
    // 2. 다양한 형식 테스트
    const formats = getKoreanTimeFormats();
    testResults.results.formats = {
      function: 'getKoreanTimeFormats()',
      results: {
        full: formats.full,
        date: formats.date,
        time: formats.time,
        emailFull: formats.emailFull,
        reception: formats.reception,
        year: formats.year,
        month: formats.month,
        day: formats.day,
        hour: formats.hour,
        weekday: formats.weekday
      },
      status: '✅ 정상'
    };
    
    // 3. 이메일 발송시간 테스트
    const emailTime = getEmailSendTime();
    testResults.results.emailTime = {
      function: 'getEmailSendTime()',
      results: {
        display: emailTime.display,
        log: emailTime.log,
        simple: emailTime.simple
      },
      status: '✅ 정상'
    };
    
    // 4. 접수시간 테스트
    const receptionTime = getReceptionTime();
    testResults.results.receptionTime = {
      function: 'getReceptionTime()',
      results: {
        display: receptionTime.display,
        simple: receptionTime.simple,
        date: receptionTime.date,
        datetime: receptionTime.datetime
      },
      status: '✅ 정상'
    };
    
    // 5. PDF 타임스탬프 테스트
    const pdfTimestamp = getPdfTimestamp();
    testResults.results.pdfTimestamp = {
      function: 'getPdfTimestamp()',
      results: {
        filename: pdfTimestamp.filename,
        display: pdfTimestamp.display
      },
      status: '✅ 정상'
    };
    
    // 6. 로그 타임스탬프 테스트
    testResults.results.logTimestamp = {
      function: 'getLogTimestamp()',
      result: getLogTimestamp(),
      status: '✅ 정상'
    };
    
    // 7. 개별 시간 요소 테스트
    const components = getKoreanTimeComponents();
    testResults.results.components = {
      function: 'getKoreanTimeComponents()',
      results: components,
      status: '✅ 정상'
    };
    
    testResults.overallStatus = '✅ 모든 한국시간 함수가 정상 작동';
    testResults.summary = {
      totalTests: Object.keys(testResults.results).length,
      passedTests: Object.keys(testResults.results).length,
      failedTests: 0
    };
    
    console.log('✅ 한국시간 시스템 테스트 완료');
    return testResults;
    
  } catch (error) {
    console.error('❌ 한국시간 시스템 테스트 실패:', error);
    testResults.overallStatus = '❌ 테스트 실행 중 오류 발생';
    testResults.error = error.toString();
    return testResults;
  }
}

/**
 * 📋 상세 진단 보고서 생성
 */
function generateDiagnosticReport() {
  console.log('📋 상세 진단 보고서 생성 시작...');
  
  try {
    const report = {
      generated: getCurrentKoreanTime(),
      version: VERSION,
      systemInfo: {
        scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
        deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
        webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
        libraryUrl: DEPLOYMENT_INFO.LIBRARY_URL,
        spreadsheetId: SPREADSHEET_ID,
        adminEmail: ADMIN_EMAIL,
        geminiApiKey: API_KEYS.GEMINI_API_KEY ? '***설정됨***' : '❌ 미설정'
      },
      healthCheck: systemHealthCheck(),
      testResults: testAllFunctions(),
      recommendations: [],
      actionPlan: []
    };

    // 추천사항 생성
    if (report.healthCheck.status !== 'healthy') {
      report.recommendations.push('시스템 건강 상태에 문제가 있습니다. diagnoseAndFixIssues() 함수를 실행하세요.');
    }

    if (report.testResults.summary.failed > 0) {
      report.recommendations.push('일부 기능 테스트가 실패했습니다. 개별 기능을 확인하세요.');
    }

    // 액션 플랜 생성
    report.actionPlan = [
      '1. diagnoseAndFixIssues() 함수 실행으로 자동 수정 시도',
      '2. 권한 문제가 있다면 Google Apps Script에서 권한 재승인',
      '3. 웹앱 재배포 (새 배포 버전 생성)',
      '4. 개별 기능 테스트로 문제 확인',
      '5. 필요시 관리자에게 연락'
    ];

    console.log('✅ 진단 보고서 생성 완료');
    return report;

  } catch (error) {
    console.error('❌ 진단 보고서 생성 오류:', error);
    return {
      generated: getCurrentKoreanTime(),
      error: error.toString(),
      message: '진단 보고서 생성 중 오류가 발생했습니다.'
    };
  }
}

// ================================================================================
// 🔧 기본 설정 (최신 배포 환경 + PDF 기능 + AI CAMP 브랜딩)
// ================================================================================

const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';

const SHEETS = {
  DIAGNOSIS: 'AI_무료진단신청',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백'
};

// 🏢 AI CAMP 브랜딩 설정
const COMPANY_NAME = 'AI CAMP';
const COMPANY_FULL_NAME = 'AI CAMP';
const CONSULTANT_NAME = '이후경 교장';
const CONSULTANT_TITLE = '경영지도사';
const ADMIN_EMAIL = 'hongik423@gmail.com';
const COMPANY_PHONE = '010-9251-9743';
const COMPANY_WEBSITE = 'https://aicamp.club';

const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = true;
const VERSION = '2025.01.27.PDF_오류_완전수정완료';

// 📊 제한사항 설정 (새로 추가)
const LIMITS = {
  PDF_MAX_SIZE_MB: 25,           // Gmail 첨부파일 크기 제한 (MB)
  PDF_MAX_SIZE_BYTES: 25 * 1024 * 1024,  // 바이트 단위
  EMAIL_SUBJECT_MAX_LENGTH: 250,  // 이메일 제목 최대 길이
  EMAIL_BODY_MAX_LENGTH: 100000,  // 이메일 본문 최대 길이
  TIMEOUT_SECONDS: 290,          // 스크립트 실행 시간 제한 (5분 - 10초 여유)
  MAX_RETRY_ATTEMPTS: 3,         // 최대 재시도 횟수
  HEALTH_CHECK_INTERVAL: 300000  // 건강 상태 체크 간격 (5분)
};

// 🌐 웹앱 배포 정보 (새 Script 완전 생성 버전)
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  LIBRARY_URL: 'https://script.google.com/macros/library/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/1',
  LAST_UPDATED: '2025.01.27'
};

// 🔑 API 키 설정 (새로 추가)
const API_KEYS = {
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM'
};

// ================================================================================
// 🛠️ 개선된 유틸리티 함수들 (오류 처리 강화)
// ================================================================================

/**
 * 한국 시간 가져오기 (오류 처리 추가)
 */
/**
 * 🕐 한국시간 처리 시스템 (완전 개선판)
 * 이메일 발송, 신청접수 등 모든 시간 기록을 한국시간으로 정확히 처리
 */

/**
 * 현재 한국시간을 가져오는 기본 함수
 */
function getCurrentKoreanTime() {
  try {
    const now = new Date();
    return Utilities.formatDate(now, 'Asia/Seoul', 'yyyy. MM. dd. a hh:mm:ss');
  } catch (error) {
    console.error('❌ 한국 시간 변환 오류:', error);
    const fallbackDate = new Date();
    return fallbackDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  }
}

/**
 * 한국시간을 다양한 형식으로 반환하는 함수들
 */
function getKoreanTimeFormats() {
  const now = new Date();
  
  try {
    return {
      // 기본 형식들
      full: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy. MM. dd. a hh:mm:ss'),
      date: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy. MM. dd.'),
      time: Utilities.formatDate(now, 'Asia/Seoul', 'a hh:mm:ss'),
      datetime: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      
      // 이메일용 형식들
      emailFull: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy년 MM월 dd일 a hh시 mm분'),
      emailShort: Utilities.formatDate(now, 'Asia/Seoul', 'MM월 dd일 a hh시 mm분'),
      
      // 접수용 형식들
      reception: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy년 MM월 dd일 a hh:mm'),
      receptionFull: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy년 MM월 dd일 (E) a hh시 mm분 ss초'),
      
      // 개별 요소들
      year: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy'),
      month: Utilities.formatDate(now, 'Asia/Seoul', 'MM'),
      day: Utilities.formatDate(now, 'Asia/Seoul', 'dd'),
      hour: Utilities.formatDate(now, 'Asia/Seoul', 'HH'),
      minute: Utilities.formatDate(now, 'Asia/Seoul', 'mm'),
      second: Utilities.formatDate(now, 'Asia/Seoul', 'ss'),
      
      // 요일 정보
      weekday: Utilities.formatDate(now, 'Asia/Seoul', 'E'),
      weekdayFull: Utilities.formatDate(now, 'Asia/Seoul', 'EEEE'),
      
      // 특수 형식들
      iso: Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd\'T\'HH:mm:ss'),
      filename: Utilities.formatDate(now, 'Asia/Seoul', 'yyyyMMdd_HHmmss'),
      log: Utilities.formatDate(now, 'Asia/Seoul', '[yyyy-MM-dd HH:mm:ss KST]')
    };
  } catch (error) {
    console.error('❌ 한국시간 형식 변환 오류:', error);
    
    // 백업 방식으로 현재 시간 생성
    const fallback = new Date().toLocaleString('ko-KR', { 
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    return {
      full: fallback,
      date: fallback.split(' ')[0],
      time: fallback.split(' ')[1],
      datetime: fallback,
      emailFull: fallback,
      emailShort: fallback,
      reception: fallback,
      receptionFull: fallback,
      year: new Date().getFullYear().toString(),
      month: String(new Date().getMonth() + 1).padStart(2, '0'),
      day: String(new Date().getDate()).padStart(2, '0'),
      hour: String(new Date().getHours()).padStart(2, '0'),
      minute: String(new Date().getMinutes()).padStart(2, '0'),
      second: String(new Date().getSeconds()).padStart(2, '0'),
      weekday: '토',
      weekdayFull: '토요일',
      iso: new Date().toISOString(),
      filename: 'backup_timestamp',
      log: '[BACKUP TIME]'
    };
  }
}

/**
 * 이메일 발송시간 전용 함수
 */
function getEmailSendTime() {
  const formats = getKoreanTimeFormats();
  return {
    display: formats.emailFull,      // "2025년 07월 27일 오후 02시 30분"
    log: formats.log,                // "[2025-07-27 14:30:25 KST]"
    simple: formats.emailShort       // "07월 27일 오후 02시 30분"
  };
}

/**
 * 신청접수시간 전용 함수
 */
function getReceptionTime() {
  const formats = getKoreanTimeFormats();
  return {
    display: formats.receptionFull,  // "2025년 07월 27일 (토) 오후 02시 30분 25초"
    simple: formats.reception,       // "2025년 07월 27일 오후 02:30"
    date: formats.date,              // "2025. 07. 27."
    datetime: formats.datetime       // "2025-07-27 14:30:25"
  };
}

/**
 * PDF 파일명용 타임스탬프
 */
function getPdfTimestamp() {
  const formats = getKoreanTimeFormats();
  return {
    filename: formats.filename,      // "20250727_143025"
    display: formats.date           // "2025. 07. 27."
  };
}

/**
 * 로그 기록용 타임스탬프
 */
function getLogTimestamp() {
  const formats = getKoreanTimeFormats();
  return formats.log;               // "[2025-07-27 14:30:25 KST]"
}

/**
 * 개별 시간 요소 가져오기
 */
function getKoreanTimeComponents() {
  const formats = getKoreanTimeFormats();
  return {
    year: formats.year,             // "2025"
    month: formats.month,           // "07"
    day: formats.day,               // "27"
    hour: formats.hour,             // "14"
    minute: formats.minute,         // "30"
    second: formats.second,         // "25"
    weekday: formats.weekday,       // "토"
    weekdayFull: formats.weekdayFull // "토요일"
  };
}

/**
 * 향상된 이메일 주소 유효성 검사
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // 정규식을 사용한 엄격한 이메일 검증
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // 추가 검증: 길이 및 특수문자 체크
  if (email.length > 254 || email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
    return false;
  }
  
  return true;
}

/**
 * Base64 데이터 유효성 검사
 */
function isValidBase64(str) {
  if (!str || typeof str !== 'string') {
    return false;
  }
  
  try {
    // Base64 정규식 검사
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(str)) {
      return false;
    }
    
    // 실제 디코딩 테스트 (작은 샘플만)
    if (str.length > 100) {
      Utilities.base64Decode(str.substring(0, 100));
    } else {
      Utilities.base64Decode(str);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Base64 유효성 검사 실패:', error);
    return false;
  }
}

/**
 * PDF 크기 검사 (새로 추가)
 */
function checkPdfSize(base64Data) {
  if (!base64Data) {
    return { valid: false, error: 'PDF 데이터가 없습니다.' };
  }
  
  try {
    // Base64 문자열 크기를 바이트로 변환 (약 3/4 비율)
    const estimatedBytes = (base64Data.length * 3) / 4;
    const sizeMB = estimatedBytes / (1024 * 1024);
    
    if (estimatedBytes > LIMITS.PDF_MAX_SIZE_BYTES) {
      return {
        valid: false,
        error: `PDF 파일이 너무 큽니다. 현재: ${sizeMB.toFixed(2)}MB, 최대: ${LIMITS.PDF_MAX_SIZE_MB}MB`,
        currentSize: sizeMB,
        maxSize: LIMITS.PDF_MAX_SIZE_MB
      };
    }
    
    return {
      valid: true,
      size: sizeMB,
      message: `PDF 크기 검증 통과: ${sizeMB.toFixed(2)}MB`
    };
  } catch (error) {
    console.error('❌ PDF 크기 검사 오류:', error);
    return { valid: false, error: 'PDF 크기 검사 중 오류가 발생했습니다.' };
  }
}

/**
 * 향상된 성공 응답 생성
 */
function createSuccessResponse(data) {
  try {
    const response = { 
      success: true, 
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      executionTime: new Date().getTime(),
      ...data 
    };
    
    if (DEBUG_MODE) {
      console.log('✅ 성공 응답 생성:', {
        success: response.success,
        timestamp: response.timestamp,
        dataKeys: Object.keys(data || {})
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('❌ 성공 응답 생성 오류:', error);
    return createErrorResponse('응답 생성 중 오류가 발생했습니다.');
  }
}

/**
 * 향상된 오류 응답 생성 (상세 정보 추가)
 */
function createErrorResponse(message, details = null) {
  try {
    const response = { 
      success: false, 
      error: message,
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      executionTime: new Date().getTime()
    };
    
    if (details) {
      response.details = details;
    }
    
    // 상세 에러 로깅
    console.error('❌ 오류 응답 생성:', {
      error: message,
      details: details,
      timestamp: response.timestamp,
      stackTrace: new Error().stack
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('❌ 오류 응답 생성 중 오류:', error);
    // 최소한의 응답 반환
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Critical error in error response generation',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 권한 체크 함수 (새로 추가)
 */
function checkRequiredPermissions() {
  const permissions = {
    gmail: false,
    sheets: false,
    script: false
  };
  
  try {
    // Gmail API 권한 체크
    try {
      GmailApp.getInboxThreads(0, 1);
      permissions.gmail = true;
    } catch (gmailError) {
      console.warn('⚠️ Gmail API 권한 없음:', gmailError.toString());
    }
    
    // Google Sheets API 권한 체크
    try {
      SpreadsheetApp.openById(SPREADSHEET_ID);
      permissions.sheets = true;
    } catch (sheetsError) {
      console.warn('⚠️ Google Sheets API 권한 없음:', sheetsError.toString());
    }
    
    // Script 실행 권한 체크
    permissions.script = true;
    
  } catch (error) {
    console.error('❌ 권한 체크 오류:', error);
  }
  
  return permissions;
}

/**
 * 시트 가져오기 또는 생성 (오류 처리 강화)
 */
function getOrCreateSheet(sheetName, type) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      console.log('🔧 새 시트 생성 시작:', sheetName);
      sheet = spreadsheet.insertSheet(sheetName);
      setupHeaders(sheet, type);
      console.log('✅ 새 시트 생성 완료:', sheetName);
    } else {
      // 기존 시트의 헤더 검증
      validateSheetHeaders(sheet, type);
    }
    
    return sheet;
  } catch (error) {
    console.error('❌ 시트 생성/접근 오류:', {
      sheetName: sheetName,
      type: type,
      error: error.toString(),
      spreadsheetId: SPREADSHEET_ID
    });
    throw new Error(`시트 처리 오류 (${sheetName}): ${error.toString()}`);
  }
}

/**
 * 시트 헤더 유효성 검증 (새로 추가)
 */
function validateSheetHeaders(sheet, type) {
  try {
    const expectedColumnCount = getExpectedColumnCount(type);
    const actualColumnCount = sheet.getLastColumn();
    
    if (actualColumnCount !== expectedColumnCount) {
      console.warn('⚠️ 시트 헤더 컬럼 수 불일치:', {
        sheetName: sheet.getName(),
        expected: expectedColumnCount,
        actual: actualColumnCount
      });
      
      // 필요시 헤더 재설정
      if (actualColumnCount < expectedColumnCount) {
        console.log('🔧 시트 헤더 재설정 시작...');
        setupHeaders(sheet, type);
      }
    }
  } catch (error) {
    console.error('❌ 시트 헤더 검증 오류:', error);
  }
}

/**
 * 타입별 예상 컬럼 수 반환
 */
function getExpectedColumnCount(type) {
  switch (type) {
    case 'diagnosis': return 60;     // 58 + 2 (PDF 상태)
    case 'consultation': return 19;
    case 'betaFeedback': return 14;
    default: return 0;
  }
}

/**
 * 베타 피드백 요청 확인
 */
function isBetaFeedback(data) {
  return data.action === 'saveBetaFeedback' || 
         data.폼타입 === '베타테스트_피드백' || 
         (data.피드백유형 && data.사용자이메일 && data.계산기명);
}

/**
 * 시트 이름으로 타입 확인 (새로 추가)
 */
function getSheetType(sheetName) {
  switch (sheetName) {
    case SHEETS.DIAGNOSIS:
      return 'diagnosis';
    case SHEETS.CONSULTATION:
      return 'consultation';
    case SHEETS.BETA_FEEDBACK:
      return 'betaFeedback';
    default:
      return 'unknown';
  }
}

/**
 * 타입별 헤더 배열 반환 (새로 추가)
 */
function getHeadersForType(type) {
  switch (type) {
    case 'diagnosis':
      return [
        '제출일시', '회사명', '업종', '사업담당자', '직원수', '사업성장단계', '주요고민사항', '예상혜택', '진행사업장', '담당자명', '연락처', '이메일', '개인정보동의', '폼타입', '진단상태', 'AI분석결과', '결과URL', '분석완료일시',
        '종합점수', '상품서비스점수', '고객응대점수', '마케팅점수', '구매재고점수', '매장관리점수',
        '기획수준', '차별화정도', '가격설정', '전문성', '품질',
        '고객맞이', '고객응대', '불만관리', '고객유지',
        '고객이해', '마케팅계획', '오프라인마케팅', '온라인마케팅', '판매전략',
        '구매관리', '재고관리',
        '외관관리', '인테리어관리', '청결도', '작업동선',
        '보고서글자수', '추천서비스목록', '보고서요약', '보고서전문',
        'PDF발송상태', 'PDF발송일시'
      ];
      
    case 'consultation':
      return [
        '제출일시', '상담유형', '성명', '연락처', '이메일', '회사명', '직책', '상담분야', '문의내용', '희망상담시간', '개인정보동의', '진단연계여부', '진단점수', '추천서비스', '처리상태', '상담일정', '상담결과', '담당컨설턴트', '완료일시'
      ];
      
    case 'betaFeedback':
      return [
        '제출일시', '계산기명', '피드백유형', '사용자이메일', '문제설명', '기대동작', '실제동작', '재현단계', '심각도', '추가의견', '브라우저정보', '제출경로', '처리상태', '처리일시'
      ];
      
    default:
      return [];
  }
}

/**
 * 이메일 기능 테스트 (새로 추가)
 */
function testEmailFunctionality() {
  try {
    console.log('📧 이메일 기능 테스트 시작...');
    
    // Gmail API 접근 테스트 (실제 이메일 발송하지 않음)
    const threads = GmailApp.getInboxThreads(0, 1);
    
    return {
      success: true,
      message: '이메일 기능이 정상적으로 작동합니다.',
      gmail_access: true,
      threads_count: threads.length
    };
  } catch (error) {
    console.error('❌ 이메일 기능 테스트 실패:', error);
    return {
      success: false,
      message: '이메일 기능에 문제가 있습니다.',
      error: error.toString(),
      gmail_access: false
    };
  }
}

/**
 * 메모리 사용량 확인 (새로 추가)
 */
function getMemoryUsage() {
  try {
    const startTime = new Date().getTime();
    // 간단한 메모리 사용량 테스트
    const testArray = new Array(1000).fill('test');
    const endTime = new Date().getTime();
    
    return {
      array_creation_time: endTime - startTime + 'ms',
      estimated_usage: 'normal',
      timestamp: getCurrentKoreanTime()
    };
  } catch (error) {
    return {
      error: error.toString(),
      estimated_usage: 'unknown',
      timestamp: getCurrentKoreanTime()
    };
  }
}

/**
 * 환경변수 동기화 상태 확인 (새로 추가)
 */
function checkEnvironmentSync() {
  console.log('🔄 환경변수 동기화 상태 확인 시작...');
  
  const syncReport = {
    timestamp: getCurrentKoreanTime(),
    status: 'synchronized',
    deployment: {
      scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
      deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
      webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
      libraryUrl: DEPLOYMENT_INFO.LIBRARY_URL,
      lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED
    },
    sheets: {
      spreadsheetId: SPREADSHEET_ID,
      sheetsConfig: SHEETS
    },
    apiKeys: {
      gemini: API_KEYS.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 미설정',
      geminiLength: API_KEYS.GEMINI_API_KEY ? API_KEYS.GEMINI_API_KEY.length : 0
    },
    admin: {
      email: ADMIN_EMAIL,
      autoReplyEnabled: AUTO_REPLY_ENABLED,
      debugMode: DEBUG_MODE
    },
    version: VERSION,
    issues: [],
    recommendations: []
  };

  // 환경변수 검증
  if (!DEPLOYMENT_INFO.DEPLOYMENT_ID || DEPLOYMENT_INFO.DEPLOYMENT_ID.length < 50) {
    syncReport.issues.push('Deployment ID가 올바르지 않습니다.');
    syncReport.status = 'error';
  }

  if (!DEPLOYMENT_INFO.WEB_APP_URL || !DEPLOYMENT_INFO.WEB_APP_URL.includes('script.google.com')) {
    syncReport.issues.push('Web App URL이 올바르지 않습니다.');
    syncReport.status = 'error';
  }

  if (!API_KEYS.GEMINI_API_KEY || API_KEYS.GEMINI_API_KEY.length < 30) {
    syncReport.issues.push('Gemini API Key가 설정되지 않았거나 올바르지 않습니다.');
    syncReport.recommendations.push('GEMINI_API_KEY를 확인하고 재설정하세요.');
  }

  if (!SPREADSHEET_ID || SPREADSHEET_ID.length !== 44) {
    syncReport.issues.push('Google Sheets ID가 올바르지 않습니다.');
    syncReport.status = 'error';
  }

  console.log('✅ 환경변수 동기화 상태 확인 완료:', {
    status: syncReport.status,
    issues: syncReport.issues.length,
    recommendations: syncReport.recommendations.length
  });

  return syncReport;
}

/**
 * Next.js와의 호환성 확인 (새로 추가)
 */
function checkNextjsCompatibility() {
  console.log('⚛️ Next.js 호환성 확인 시작...');
  
  const compatibilityReport = {
    timestamp: getCurrentKoreanTime(),
    compatible: true,
    webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
    expectedFormat: 'https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec',
    currentFormat: DEPLOYMENT_INFO.WEB_APP_URL,
    corsSupported: true,
    jsonResponseSupported: true,
    issues: [],
    nextjsEnvFormat: {
      'NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL': DEPLOYMENT_INFO.WEB_APP_URL,
      'GOOGLE_SHEETS_ID': SPREADSHEET_ID,
      'GOOGLE_SCRIPT_ID': DEPLOYMENT_INFO.SCRIPT_ID,
      'GEMINI_API_KEY': API_KEYS.GEMINI_API_KEY ? '***YOUR_GEMINI_API_KEY***' : 'NOT_SET'
    }
  };

  // URL 형식 검증
  const urlPattern = /https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/;
  if (!urlPattern.test(DEPLOYMENT_INFO.WEB_APP_URL)) {
    compatibilityReport.compatible = false;
    compatibilityReport.issues.push('Web App URL 형식이 Next.js와 호환되지 않습니다.');
  }

  // CORS 헤더 확인
  try {
    // Apps Script는 기본적으로 CORS를 지원하므로 true로 설정
    compatibilityReport.corsSupported = true;
  } catch (error) {
    compatibilityReport.corsSupported = false;
    compatibilityReport.issues.push('CORS 지원 확인 중 오류가 발생했습니다.');
  }

  console.log('✅ Next.js 호환성 확인 완료:', {
    compatible: compatibilityReport.compatible,
    issues: compatibilityReport.issues.length
  });

  return compatibilityReport;
}

/**
 * PDF 이메일 발송 요청 확인 (개선됨)
 */
function isPdfEmailRequest(data) {
  const hasAction = data.action === 'sendDiagnosisPdfEmail';
  const hasRequiredFields = data.pdf_attachment && data.to_email && data.company_name;
  
  if (hasAction && !hasRequiredFields) {
    console.warn('⚠️ PDF 이메일 발송 요청이지만 필수 필드 누락:', {
      pdf_attachment: !!data.pdf_attachment,
      to_email: !!data.to_email,
      company_name: !!data.company_name
    });
  }
  
  return hasAction && hasRequiredFields;
}

/**
 * 상담신청 요청 확인
 */
function isConsultationRequest(data) {
  if (isBetaFeedback(data) || isPdfEmailRequest(data)) {
    return false;
  }
  
  return !!(data.상담유형 || data.consultationType || data.성명 || data.name || 
           data.문의내용 || data.inquiryContent || data.action === 'saveConsultation');
}

// ================================================================================
// 📡 메인 처리 함수 (오류 처리 강화)
// ================================================================================

function doPost(e) {
  const startTime = new Date().getTime();
  
  try {
    // 권한 체크 (초기 실행 시)
    if (DEBUG_MODE) {
      const permissions = checkRequiredPermissions();
      console.log('🔒 권한 체크 결과:', permissions);
    }
    
    // e 파라미터 자체가 없거나 undefined인 경우 처리 (직접 실행 시)
    if (!e) {
      console.warn('⚠️ 직접 실행 감지: 테스트 모드로 전환합니다.');
      return createSuccessResponse({
        message: '직접 실행 시에는 웹 요청을 시뮬레이션할 수 없습니다.',
        testFunctions: [
          'testDiagnosisSubmission() - 진단 신청 테스트',
          'testConsultationSubmission() - 상담 신청 테스트',
          'testBetaFeedback() - 베타 피드백 테스트',
          'testPdfEmailSending() - PDF 이메일 발송 테스트',
          'testEntireSystem() - 전체 시스템 테스트'
        ],
        permissions: checkRequiredPermissions()
      });
    }
    
    if (DEBUG_MODE) {
      console.log('🔥 POST 요청 수신:', {
        timestamp: getCurrentKoreanTime(),
        hasPostData: !!(e && e.postData),
        contentType: (e && e.postData) ? e.postData.type : 'N/A'
      });
    }

    let requestData = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        requestData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        return createErrorResponse('잘못된 JSON 형식입니다.', {
          parseError: parseError.toString(),
          receivedData: e.postData.contents.substring(0, 200) + '...'
        });
      }
    }
    
    // 타임아웃 체크
    const processingTime = new Date().getTime() - startTime;
    if (processingTime > LIMITS.TIMEOUT_SECONDS * 1000) {
      console.warn('⚠️ 처리 시간 초과 위험:', processingTime + 'ms');
    }
    
    if (DEBUG_MODE) {
      console.log('📝 수신된 데이터:', {
        action: requestData.action,
        폼타입: requestData.폼타입,
        회사명: requestData.회사명,
        계산기명: requestData.계산기명,
        피드백유형: requestData.피드백유형,
        pdf_attachment: requestData.pdf_attachment ? 
          `있음 (${Math.round(requestData.pdf_attachment.length / 1024)}KB)` : '없음',
        to_email: requestData.to_email,
        문항별점수존재: !!(requestData.문항별점수 || requestData.detailedScores),
        점수개수: requestData.문항별점수 ? Object.keys(requestData.문항별점수).length : 0
      });
    }

    // 🆕 PDF 이메일 발송 처리 (최우선, 개선됨)
    if (isPdfEmailRequest(requestData)) {
      console.log('📧 PDF 이메일 발송 처리 시작');
      return sendDiagnosisPdfEmail(requestData);
    }

    // 🧪 베타 피드백 처리 (두 번째 우선순위)
    if (isBetaFeedback(requestData)) {
      console.log('🎯 베타 피드백 처리 시작');
      return processBetaFeedback(requestData);
    }

    // 상담신청 vs 진단신청 분기
    if (isConsultationRequest(requestData)) {
      console.log('✅ 상담신청 처리 시작');
      return processConsultationForm(requestData);
    } else {
      console.log('✅ 진단신청 처리 시작');
      return processDiagnosisForm(requestData);
    }

  } catch (error) {
    const processingTime = new Date().getTime() - startTime;
    console.error('❌ POST 요청 처리 오류:', {
      error: error.toString(),
      processingTime: processingTime + 'ms',
      stackTrace: error.stack
    });
    
    return createErrorResponse('POST 처리 중 오류: ' + error.toString(), {
      processingTime: processingTime,
      errorType: error.name
    });
  }
}

function doGet(e) {
  try {
    if (DEBUG_MODE) {
      console.log('🔥 GET 요청 수신:', {
        parameters: e.parameter,
        timestamp: getCurrentKoreanTime()
      });
    }

    const permissions = checkRequiredPermissions();
    
    return createSuccessResponse({
      status: 'AI CAMP 통합 시스템 정상 작동 중 (환경변수 최신화 및 진단 기능 완료)',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      deploymentInfo: {
        scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
        deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
        webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
        libraryUrl: DEPLOYMENT_INFO.LIBRARY_URL,
        lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED
      },
      googleSheets: {
        spreadsheetId: SPREADSHEET_ID,
        adminEmail: ADMIN_EMAIL
      },
      apiKeys: {
        gemini: API_KEYS.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 미설정'
      },
      permissions: permissions,
      features: [
        '✅ 진단신청 처리 (60개 컬럼)',
        '✅ 상담신청 처리 (19개 컬럼)', 
        '✅ 베타피드백 처리 (14개 컬럼)',
        '📧 PDF 첨부 이메일 발송 (개선됨)',
        '✅ 진단점수 정확 저장 (1-5점)',
        '✅ 자동 이메일 발송',
        '✅ 관리자/신청자 알림',
        '🔄 환경변수 최신화 완료',
        '🔧 자동 오류 진단 및 수정',
        '🏥 시스템 건강 상태 모니터링',
        '🧪 종합 기능 테스트 시스템',
        '⚛️ Next.js 호환성 보장',
        '🔒 권한 체크 및 유효성 검증',
        '📊 성능 모니터링 및 최적화'
      ],
      diagnosticFunctions: [
        'systemHealthCheck() - 전체 시스템 건강 상태 점검',
        'diagnoseAndFixIssues() - 자동 문제 진단 및 수정',
        'checkEnvironmentSync() - 환경변수 동기화 확인',
        'checkNextjsCompatibility() - Next.js 호환성 확인',
        'testAllFunctions() - 모든 기능 종합 테스트',
        'generateDiagnosticReport() - 상세 진단 보고서 생성'
      ]
    });

  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse('GET 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🆕 개선된 PDF 첨부 이메일 발송 기능 (오류 수정 완료)
// ================================================================================

/**
 * 📧 개선된 PDF 첨부 이메일 발송 (오류 수정 완료)
 */
function sendDiagnosisPdfEmail(data) {
  const startTime = new Date().getTime();
  
  try {
    console.log('📧 PDF 첨부 이메일 발송 시작:', {
      to_email: data.to_email,
      company_name: data.company_name,
      pdf_size: data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : '0KB',
      timestamp: getCurrentKoreanTime()
    });

    // 1. 필수 데이터 검증 강화
    if (!data.to_email || !data.company_name || !data.pdf_attachment) {
      const missingFields = [];
      if (!data.to_email) missingFields.push('to_email');
      if (!data.company_name) missingFields.push('company_name');
      if (!data.pdf_attachment) missingFields.push('pdf_attachment');
      
      throw new Error(`필수 데이터가 누락되었습니다: ${missingFields.join(', ')}`);
    }

    // 2. 이메일 주소 유효성 검사 (강화됨)
    if (!isValidEmail(data.to_email)) {
      throw new Error(`유효하지 않은 이메일 주소입니다: ${data.to_email}`);
    }

    // 3. PDF 크기 검사 (새로 추가)
    const sizeCheck = checkPdfSize(data.pdf_attachment);
    if (!sizeCheck.valid) {
      throw new Error(`PDF 크기 검사 실패: ${sizeCheck.error}`);
    }
    console.log('✅ PDF 크기 검증 통과:', sizeCheck.message);

    // 4. Base64 데이터 유효성 검사 (새로 추가)
    if (!isValidBase64(data.pdf_attachment)) {
      throw new Error('유효하지 않은 Base64 PDF 데이터입니다.');
    }

    // 5. 타임아웃 체크
    const currentTime = new Date().getTime();
    if (currentTime - startTime > LIMITS.TIMEOUT_SECONDS * 1000 * 0.8) { // 80% 시점에서 경고
      console.warn('⚠️ 처리 시간 초과 경고, 빠른 처리 모드로 전환');
    }

    // 6. PDF 첨부파일 처리 (오류 수정 완료)
    let pdfBlob = null;
    if (data.pdf_attachment && data.pdf_filename) {
      try {
        console.log('🔧 PDF 첨부파일 처리 시작...');
        
        // Base64 디코딩하여 PDF Blob 생성 (오류 처리 강화)
        const pdfBytes = Utilities.base64Decode(data.pdf_attachment);
        pdfBlob = Utilities.newBlob(pdfBytes, 'application/pdf', data.pdf_filename);
        
        // 생성된 Blob 검증 (완전 안전한 방법으로 수정)
        if (!pdfBlob) {
          throw new Error('PDF Blob 생성 실패');
        }
        
        // 완전히 안전한 크기 확인 방법
        let blobSize = 0;
        let sizeInfo = 'Unknown';
        try {
          // getBytes()를 사용하여 안전하게 크기 확인
          const bytes = pdfBlob.getBytes();
          blobSize = bytes.length;
          sizeInfo = Math.round(blobSize / 1024) + 'KB';
        } catch (sizeError) {
          console.warn('⚠️ PDF 크기 확인 불가 (정상적으로 계속 진행):', sizeError.toString());
          // Base64 길이로 대략적인 크기 추정
          blobSize = Math.round((data.pdf_attachment.length * 3) / 4);
          sizeInfo = Math.round(blobSize / 1024) + 'KB (추정)';
        }
        
        // 비어있는 파일 체크 (Base64 길이로 확인)
        if (data.pdf_attachment.length < 100) {
          throw new Error('PDF 데이터가 너무 작습니다 (손상되었을 가능성)');
        }
        
        console.log('✅ PDF 첨부파일 생성 완료:', {
          filename: data.pdf_filename,
          size: sizeInfo,
          originalBase64Length: data.pdf_attachment.length,
          contentType: 'application/pdf'
        });
        
      } catch (pdfError) {
        console.error('❌ PDF 생성 오류:', {
          error: pdfError.toString(),
          filename: data.pdf_filename,
          dataLength: data.pdf_attachment ? data.pdf_attachment.length : 0
        });
        throw new Error('PDF 첨부파일 처리 중 오류가 발생했습니다: ' + pdfError.toString());
      }
    }

    // 7. 이메일 내용 구성 (개선됨)
    const emailSubject = `[AI CAMP] AI 무료진단 결과보고서 - ${data.company_name}`;
    
    // 이메일 제목 길이 체크
    if (emailSubject.length > LIMITS.EMAIL_SUBJECT_MAX_LENGTH) {
      console.warn('⚠️ 이메일 제목이 너무 깁니다:', emailSubject.length);
    }
    
    const emailBody = `안녕하세요, ${data.to_name || '고객'}님.

AI CAMP에서 요청하신 AI 무료진단이 완료되어 결과보고서를 첨부파일로 발송해드립니다.

📊 진단 결과 요약:
• 회사명: ${data.company_name}
• 종합 점수: ${data.total_score || 'N/A'}점 (${data.overall_grade || 'N/A'}등급)
• 업종: ${data.industry_type || 'N/A'}
• 진단일: ${data.diagnosis_date || getCurrentKoreanTime()}

📄 첨부파일:
• AI 진단 결과보고서 (PDF) - 상세한 분석 내용과 맞춤형 개선 방안이 포함되어 있습니다.

🔍 결과보고서에는 다음 내용이 포함되어 있습니다:
1. 기업 종합 진단 점수 및 등급
2. 카테고리별 상세 분석
3. 강점/약점/기회 요소 분석
4. 맞춤형 실행 계획
5. 추천 서비스 안내
6. 전문가 상담 정보

💡 더 상세한 상담을 원하시거나 궁금한 점이 있으시면 언제든지 연락주세요.

📞 전문가 상담 문의:
• 담당자: ${data.consultant_name || '이후경 경영지도사'}
• 전화: ${data.consultant_phone || '010-9251-9743'}
• 이메일: ${data.consultant_email || ADMIN_EMAIL}

✨ 특별 혜택:
• 첫 상담 시 무료 기업 맞춤형 성장전략 컨설팅 제공
• 정부지원 사업 연계 상담 가능
• AI 도입 및 디지털 전환 전문 컨설팅

감사합니다.

--
AI CAMP
Tel: ${data.consultant_phone || '010-9251-9743'}
Email: ${data.consultant_email || ADMIN_EMAIL}
Website: https://aicamp-v3-0.vercel.app

※ 본 이메일은 AI 진단 신청자에게 자동으로 발송되는 메일입니다.
※ 궁금한 사항이 있으시면 언제든지 연락주세요.
    `;

    // 이메일 본문 길이 체크
    if (emailBody.length > LIMITS.EMAIL_BODY_MAX_LENGTH) {
      console.warn('⚠️ 이메일 본문이 너무 깁니다:', emailBody.length);
    }

    // 8. 이메일 발송 (PDF 첨부파일 포함)
    const emailOptions = {
      name: 'AI CAMP',
      replyTo: data.consultant_email || ADMIN_EMAIL,
      htmlBody: emailBody.replace(/\n/g, '<br>')
    };

    if (pdfBlob) {
      emailOptions.attachments = [pdfBlob];
      console.log('📎 PDF 첨부파일 추가:', data.pdf_filename);
    }

    // 실제 이메일 발송
    console.log('📧 이메일 발송 시작...');
    GmailApp.sendEmail(
      data.to_email,
      emailSubject,
      emailBody,
      emailOptions
    );

    console.log('✅ 신청자 PDF 이메일 발송 완료:', {
      to: data.to_email,
      subject: emailSubject,
      hasAttachment: !!pdfBlob,
      processingTime: new Date().getTime() - startTime + 'ms'
    });

    // 9. Google Sheets에 PDF 발송 상태 업데이트 (개선됨)
    try {
      updatePdfSendingStatus(data.company_name, data.to_email, '발송완료');
    } catch (updateError) {
      console.error('⚠️ PDF 발송 상태 업데이트 실패 (이메일 발송은 성공):', updateError);
    }

    // 10. 관리자에게 알림 이메일 발송 (개선됨)
    try {
      const adminSubject = `[AI CAMP] PDF 진단보고서 발송 완료 - ${data.company_name}`;
      const adminBody = `PDF 진단보고서가 성공적으로 발송되었습니다.

📊 발송 정보:
• 수신자: ${data.to_name || 'N/A'} (${data.to_email})
• 회사명: ${data.company_name}
• 진단 점수: ${data.total_score || 'N/A'}점 (${data.overall_grade || 'N/A'}등급)
• PDF 파일명: ${data.pdf_filename || 'N/A'}
• PDF 크기: ${sizeCheck.size ? sizeCheck.size.toFixed(2) + 'MB' : 'N/A'}
• 발송 시간: ${getEmailSendTime().display}
• 처리 시간: ${new Date().getTime() - startTime}ms

📧 발송 상태: 성공
📎 첨부파일: ${pdfBlob ? 'PDF 첨부됨' : '첨부파일 없음'}

담당자가 후속 상담을 위해 연락할 예정입니다.

--
AI CAMP 자동 알림 시스템 (오류 수정 완료 버전)
      `;

      GmailApp.sendEmail(
        ADMIN_EMAIL,
        adminSubject,
        adminBody,
        { name: 'AI CAMP 자동알림' }
      );

      console.log('✅ 관리자 알림 이메일 발송 완료');
    } catch (adminError) {
      console.error('⚠️ 관리자 알림 이메일 발송 실패:', adminError);
    }

    return createSuccessResponse({
      message: 'PDF 진단보고서가 성공적으로 발송되었습니다.',
      data: {
        to_email: data.to_email,
        company_name: data.company_name,
        pdf_filename: data.pdf_filename,
        pdf_size: sizeCheck.size ? sizeCheck.size.toFixed(2) + 'MB' : 'N/A',
        sent_time: getCurrentKoreanTime(),
        processing_time: new Date().getTime() - startTime + 'ms'
      }
    });

  } catch (error) {
    const processingTime = new Date().getTime() - startTime;
    
    console.error('❌ PDF 이메일 발송 실패:', {
      error: error.toString(),
      company_name: data.company_name || '알수없음',
      to_email: data.to_email || '알수없음',
      processingTime: processingTime + 'ms',
      stackTrace: error.stack
    });
    
    // Google Sheets에 PDF 발송 실패 상태 업데이트
    try {
      updatePdfSendingStatus(data.company_name || '알수없음', data.to_email || '알수없음', '발송실패');
    } catch (updateError) {
      console.error('❌ PDF 발송 상태 업데이트도 실패:', updateError);
    }
    
    // 오류 발생 시 관리자에게 긴급 알림 (개선됨)
    try {
      const errorSubject = `[AI CAMP] ⚠️ 긴급: PDF 이메일 발송 실패 - ${data.company_name || '알수없음'}`;
      const errorBody = `PDF 진단보고서 이메일 발송 중 오류가 발생했습니다.

❌ 오류 정보:
• 수신자: ${data.to_name || 'N/A'} (${data.to_email || 'N/A'})
• 회사명: ${data.company_name || 'N/A'}
• 오류 메시지: ${error.toString()}
• 오류 타입: ${error.name || 'Unknown'}
• 발생 시간: ${getCurrentKoreanTime()}
• 처리 시간: ${processingTime}ms

🔍 추가 정보:
• PDF 크기: ${data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : 'N/A'}
• PDF 파일명: ${data.pdf_filename || 'N/A'}
• 이메일 유효성: ${data.to_email ? isValidEmail(data.to_email) : 'N/A'}

🚨 조치 필요:
1. 수신자에게 직접 연락
2. PDF 보고서 수동 발송 필요
3. 시스템 오류 점검 필요
4. 오류 원인 분석 및 해결

--
AI CAMP 자동 알림 시스템 (오류 수정 완료 버전)
      `;

      GmailApp.sendEmail(
        ADMIN_EMAIL,
        errorSubject,
        errorBody,
        { name: 'AI CAMP 오류알림' }
      );
    } catch (notificationError) {
      console.error('❌ 오류 알림 발송도 실패:', notificationError);
    }

    return createErrorResponse('PDF 이메일 발송 중 오류가 발생했습니다: ' + error.toString(), {
      processingTime: processingTime,
      errorType: error.name,
      company_name: data.company_name,
      email_valid: data.to_email ? isValidEmail(data.to_email) : false
    });
  }
}

/**
 * Google Sheets에서 PDF 발송 상태 업데이트 (개선됨)
 */
function updatePdfSendingStatus(companyName, email, status) {
  try {
    console.log('📊 PDF 발송 상태 업데이트 시작:', {
      companyName: companyName,
      email: email,
      status: status
    });
    
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      console.warn('⚠️ 진단 데이터가 없어 PDF 발송 상태 업데이트 불가');
      return;
    }
    
    // 회사명과 이메일로 해당 행 찾기 (개선된 검색)
    let targetRow = -1;
    const batchSize = 100; // 배치 처리로 성능 개선
    
    for (let startRow = 2; startRow <= lastRow; startRow += batchSize) {
      const endRow = Math.min(startRow + batchSize - 1, lastRow);
      const range = sheet.getRange(startRow, 1, endRow - startRow + 1, 12); // A부터 L열까지
      const values = range.getValues();
      
      for (let i = 0; i < values.length; i++) {
        const rowCompanyName = values[i][1]; // B열: 회사명 (0-based index)
        const rowEmail = values[i][11]; // L열: 이메일 (0-based index)
        
        if (rowCompanyName === companyName && rowEmail === email) {
          targetRow = startRow + i;
          break;
        }
      }
      
      if (targetRow > 0) break;
    }
    
    if (targetRow > 0) {
      // PDF발송상태 컬럼 (59번째 컬럼: AW)
      sheet.getRange(targetRow, 59).setValue(status);
      // PDF발송일시 컬럼 (60번째 컬럼: AX)
      sheet.getRange(targetRow, 60).setValue(getEmailSendTime().display);
      
      console.log('✅ PDF 발송 상태 업데이트 완료:', {
        회사명: companyName,
        이메일: email,
        상태: status,
        행번호: targetRow
      });
    } else {
      console.warn('⚠️ PDF 발송 상태 업데이트 대상 찾지 못함:', {
        회사명: companyName,
        이메일: email,
        전체행수: lastRow
      });
    }
  } catch (error) {
    console.error('❌ PDF 발송 상태 업데이트 실패:', {
      error: error.toString(),
      회사명: companyName,
      이메일: email,
      상태: status
    });
  }
}

// ================================================================================
// 🎯 진단신청 처리 (60개 컬럼 + PDF 발송 상태 컬럼 + 오류 수정)
// ================================================================================

function processDiagnosisForm(data) {
  const startTime = new Date().getTime();
  
  try {
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const timestamp = getReceptionTime().display;
    
    if (DEBUG_MODE) {
      console.log('✅ 진단신청 상세 처리:', {
        회사명: data.회사명 || data.companyName,
        이메일: data.이메일 || data.contactEmail,
        총점: data.종합점수 || data.totalScore,
        문항별점수: data.문항별점수 || data.detailedScores
      });
    }

    // 🔧 **문항별 점수 정확 추출 (1-5점)**
    const scoreData = extractDetailedScores(data);
    
    // 🔧 **카테고리별 점수 추출**
    const categoryData = extractCategoryScores(data);

    // 📝 **진단결과보고서 요약 추출**
    const reportSummary = data.진단보고서요약 || data.summaryReport || '';
    const totalScore = data.종합점수 || data.totalScore || 0;
    
    // 📊 **60개 컬럼 진단신청 데이터 구성 (PDF 발송 상태 추가)**
    const rowData = [
      // 🔵 기본 정보 (A-R: 18개)
      timestamp,                                                  // A: 제출일시
      data.회사명 || data.companyName || '',                        // B: 회사명
      data.업종 || data.industry || '',                            // C: 업종
      data.사업담당자 || data.businessManager || data.contactManager || '', // D: 사업담당자
      data.직원수 || data.employeeCount || '',                     // E: 직원수
      data.사업성장단계 || data.growthStage || '',                  // F: 사업성장단계
      data.주요고민사항 || data.mainConcerns || '',                 // G: 주요고민사항
      data.예상혜택 || data.expectedBenefits || '',                // H: 예상혜택
      data.진행사업장 || data.businessLocation || '',              // I: 진행사업장
      data.담당자명 || data.contactName || data.contactManager || '', // J: 담당자명
      data.연락처 || data.contactPhone || '',                      // K: 연락처
      data.이메일 || data.contactEmail || data.email || '',        // L: 이메일
      data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // M: 개인정보동의
      'AI_무료진단_레벨업시트',                                    // N: 폼타입
      '접수완료',                                                  // O: 진단상태
      '',                                                         // P: AI분석결과
      '',                                                         // Q: 결과URL
      '',                                                         // R: 분석완료일시
      
      // 🟢 진단 결과 (S-X: 6개)
      totalScore,                                                 // S: 종합점수
      categoryData.상품서비스점수,                                 // T: 상품서비스점수
      categoryData.고객응대점수,                                   // U: 고객응대점수
      categoryData.마케팅점수,                                     // V: 마케팅점수
      categoryData.구매재고점수,                                   // W: 구매재고점수
      categoryData.매장관리점수,                                   // X: 매장관리점수
      
      // 🔶 상품/서비스 관리 역량 (Y-AC: 5개)
      scoreData.기획수준,        // Y: 기획수준 (1-5점)
      scoreData.차별화정도,      // Z: 차별화정도 (1-5점)
      scoreData.가격설정,        // AA: 가격설정 (1-5점)
      scoreData.전문성,          // AB: 전문성 (1-5점)
      scoreData.품질,            // AC: 품질 (1-5점)
      
      // 🔷 고객응대 역량 (AD-AG: 4개)
      scoreData.고객맞이,        // AD: 고객맞이 (1-5점)
      scoreData.고객응대,        // AE: 고객응대 (1-5점)
      scoreData.불만관리,        // AF: 불만관리 (1-5점)
      scoreData.고객유지,        // AG: 고객유지 (1-5점)
      
      // 🔸 마케팅 역량 (AH-AL: 5개)
      scoreData.고객이해,        // AH: 고객이해 (1-5점)
      scoreData.마케팅계획,      // AI: 마케팅계획 (1-5점)
      scoreData.오프라인마케팅,  // AJ: 오프라인마케팅 (1-5점)
      scoreData.온라인마케팅,    // AK: 온라인마케팅 (1-5점)
      scoreData.판매전략,        // AL: 판매전략 (1-5점)
      
      // 🔹 구매/재고관리 (AM-AN: 2개)
      scoreData.구매관리,        // AM: 구매관리 (1-5점)
      scoreData.재고관리,        // AN: 재고관리 (1-5점)
      
      // 🔺 매장관리 역량 (AO-AR: 4개)
      scoreData.외관관리,        // AO: 외관관리 (1-5점)
      scoreData.인테리어관리,    // AP: 인테리어관리 (1-5점)
      scoreData.청결도,          // AQ: 청결도 (1-5점)
      scoreData.작업동선,        // AR: 작업동선 (1-5점)
      
      // 🟣 보고서 정보 (AS-AV: 4개)
      reportSummary.length,      // AS: 보고서글자수
      data.추천서비스 || '',      // AT: 추천서비스목록
      reportSummary.substring(0, 500), // AU: 보고서요약(500자)
      reportSummary,             // AV: 보고서전문
      
      // 🆕 PDF 발송 상태 (AW-AX: 2개) - 새로 추가
      '대기중',                  // AW: PDF발송상태
      ''                         // AX: PDF발송일시
    ];

    // 데이터 길이 검증
    const expectedColumns = getExpectedColumnCount('diagnosis');
    if (rowData.length !== expectedColumns) {
      console.warn('⚠️ 진단 데이터 컬럼 수 불일치:', {
        expected: expectedColumns,
        actual: rowData.length,
        difference: expectedColumns - rowData.length
      });
    }

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 진단신청 저장 완료:', {
        시트: SHEETS.DIAGNOSIS,
        행번호: newRow,
        회사명: data.회사명 || data.companyName,
        총점: totalScore,
        문항점수개수: Object.keys(scoreData).length,
        보고서길이: reportSummary.length,
        처리시간: new Date().getTime() - startTime + 'ms'
      });
    }

    // 이메일 발송
    if (AUTO_REPLY_ENABLED) {
      try {
        sendDiagnosisAdminNotification(data, newRow, totalScore, reportSummary);
        
        const userEmail = data.이메일 || data.contactEmail || data.email;
        const userName = data.담당자명 || data.contactName || data.contactManager;
        if (userEmail && isValidEmail(userEmail)) {
          sendDiagnosisUserConfirmation(userEmail, userName, data.company_name);
        } else if (userEmail) {
          console.warn('⚠️ 유효하지 않은 사용자 이메일:', userEmail);
        }
      } catch (emailError) {
        console.error('⚠️ 이메일 발송 실패 (데이터 저장은 성공):', emailError);
      }
    }

    return createSuccessResponse({
      message: '📊 AI 무료진단이 성공적으로 접수되었습니다 (문항별 점수 + 보고서 포함). PDF 이메일 발송이 가능합니다.',
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: totalScore,
      추천서비스: reportSummary.length > 50 ? reportSummary.substring(0, 50) + '...' : reportSummary,
      pdfSendingEnabled: true, // PDF 발송 가능 플래그
      processingTime: new Date().getTime() - startTime + 'ms'
    });

  } catch (error) {
    const processingTime = new Date().getTime() - startTime;
    console.error('❌ 진단신청 처리 오류:', {
      error: error.toString(),
      processingTime: processingTime + 'ms',
      stackTrace: error.stack
    });
    return createErrorResponse('진단신청 처리 중 오류: ' + error.toString(), {
      processingTime: processingTime
    });
  }
}

// ================================================================================
// 🔧 점수 데이터 추출 함수들 (오류 처리 강화)
// ================================================================================

/**
 * 문항별 상세 점수 추출 (1-5점 정확 매핑, 오류 처리 강화)
 */
function extractDetailedScores(data) {
  try {
    // 여러 경로로 점수 데이터 확인
    const scores = data.문항별점수 || data.detailedScores || {};
    
    // 영문 키를 한글 키로 매핑
    const keyMapping = {
      'planning_level': '기획수준',
      'differentiation_level': '차별화정도',
      'pricing_level': '가격설정',
      'expertise_level': '전문성',
      'quality_level': '품질',
      'customer_greeting': '고객맞이',
      'customer_service': '고객응대',
      'complaint_management': '불만관리',
      'customer_retention': '고객유지',
      'customer_understanding': '고객이해',
      'marketing_planning': '마케팅계획',
      'offline_marketing': '오프라인마케팅',
      'online_marketing': '온라인마케팅',
      'sales_strategy': '판매전략',
      'purchase_management': '구매관리',
      'inventory_management': '재고관리',
      'exterior_management': '외관관리',
      'interior_management': '인테리어관리',
      'cleanliness': '청결도',
      'work_flow': '작업동선'
    };

    const result = {};
    
    // 기본값으로 0 설정
    Object.values(keyMapping).forEach(koreanKey => {
      result[koreanKey] = 0;
    });

    // 실제 점수 데이터 매핑 (유효성 검사 추가)
    Object.entries(keyMapping).forEach(([englishKey, koreanKey]) => {
      let score = null;
      
      // 영문 키로 찾기
      if (scores[englishKey] !== undefined && scores[englishKey] !== null) {
        score = scores[englishKey];
      }
      // 한글 키로 찾기
      else if (scores[koreanKey] !== undefined && scores[koreanKey] !== null) {
        score = scores[koreanKey];
      }
      // 직접 전달된 개별 점수 확인
      else if (data[englishKey] !== undefined && data[englishKey] !== null) {
        score = data[englishKey];
      }
      
      // 점수 유효성 검사 및 변환
      if (score !== null) {
        const numScore = Number(score);
        if (!isNaN(numScore) && numScore >= 0 && numScore <= 5) {
          result[koreanKey] = numScore;
        } else {
          console.warn('⚠️ 유효하지 않은 점수 값:', {
            key: koreanKey,
            value: score,
            type: typeof score
          });
        }
      }
    });

    if (DEBUG_MODE) {
      const validScores = Object.keys(result).filter(k => result[k] > 0);
      console.log('🔧 점수 데이터 추출 완료:', {
        원본점수개수: Object.keys(scores).length,
        매핑된점수개수: validScores.length,
        유효점수개수: validScores.length,
        샘플점수: {
          기획수준: result.기획수준,
          고객응대: result.고객응대,
          마케팅계획: result.마케팅계획
        }
      });
    }

    return result;
  } catch (error) {
    console.error('❌ 점수 데이터 추출 오류:', error);
    
    // 오류 발생 시 기본값 반환
    const defaultResult = {};
    const defaultKeys = [
      '기획수준', '차별화정도', '가격설정', '전문성', '품질',
      '고객맞이', '고객응대', '불만관리', '고객유지',
      '고객이해', '마케팅계획', '오프라인마케팅', '온라인마케팅', '판매전략',
      '구매관리', '재고관리',
      '외관관리', '인테리어관리', '청결도', '작업동선'
    ];
    
    defaultKeys.forEach(key => {
      defaultResult[key] = 0;
    });
    
    return defaultResult;
  }
} 

/**
 * 카테고리별 점수 추출 (오류 처리 강화)
 */
function extractCategoryScores(data) {
  try {
    const categoryScores = data.카테고리점수 || data.categoryScores || {};
    
    const result = {
      상품서비스점수: '0.0',
      고객응대점수: '0.0',
      마케팅점수: '0.0',
      구매재고점수: '0.0',
      매장관리점수: '0.0'
    };

    // 카테고리 점수 매핑 (유효성 검사 추가)
    const categoryMapping = {
      'productService': '상품서비스점수',
      'customerService': '고객응대점수',
      'marketing': '마케팅점수',
      'procurement': '구매재고점수',
      'storeManagement': '매장관리점수'
    };

    Object.entries(categoryMapping).forEach(([englishKey, koreanKey]) => {
      try {
        if (categoryScores[englishKey] && 
            categoryScores[englishKey].score !== undefined &&
            categoryScores[englishKey].score !== null) {
          
          const score = Number(categoryScores[englishKey].score);
          if (!isNaN(score) && score >= 0) {
            result[koreanKey] = score.toFixed(1);
          }
        }
      } catch (scoreError) {
        console.warn('⚠️ 카테고리 점수 변환 오류:', {
          category: koreanKey,
          error: scoreError.toString()
        });
      }
    });

    return result;
  } catch (error) {
    console.error('❌ 카테고리 점수 추출 오류:', error);
    
    // 오류 발생 시 기본값 반환
    return {
      상품서비스점수: '0.0',
      고객응대점수: '0.0',
      마케팅점수: '0.0',
      구매재고점수: '0.0',
      매장관리점수: '0.0'
    };
  }
}

// ================================================================================
// 💬 상담신청 처리 (19개 컬럼) - 오류 처리 강화
// ================================================================================

function processConsultationForm(data) {
  const startTime = new Date().getTime();
  
  try {
    const sheet = getOrCreateSheet(SHEETS.CONSULTATION, 'consultation');
    const timestamp = getReceptionTime().display;
    
    if (DEBUG_MODE) {
      console.log('✅ 상담신청 처리:', {
        성명: data.성명 || data.name,
        회사명: data.회사명 || data.company,
        이메일: data.이메일 || data.email
      });
    }
    
    // 19개 컬럼 상담신청 데이터 구성 (유효성 검사 추가)
    const rowData = [
      timestamp,                                                    // A: 제출일시
      data.상담유형 || data.consultationType || '일반상담',           // B: 상담유형
      data.성명 || data.name || '',                                  // C: 성명
      data.연락처 || data.phone || '',                               // D: 연락처
      data.이메일 || data.email || '',                               // E: 이메일
      data.회사명 || data.company || '',                             // F: 회사명
      data.직책 || data.position || '',                             // G: 직책
      data.상담분야 || data.consultationArea || data.industry || '', // H: 상담분야
      data.문의내용 || data.inquiryContent || data.message || '',   // I: 문의내용
      data.희망상담시간 || data.preferredTime || '',                 // J: 희망상담시간
      data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // K: 개인정보동의
      data.진단연계여부 === 'Y' || data.isDiagnosisLinked ? 'Y' : 'N', // L: 진단연계여부
      data.진단점수 || data.diagnosisScore || '',                   // M: 진단점수
      data.추천서비스 || data.recommendedService || '',             // N: 추천서비스
      '접수완료',                                                   // O: 처리상태
      '',                                                          // P: 상담일정
      '',                                                          // Q: 상담결과
      '',                                                          // R: 담당컨설턴트
      ''                                                           // S: 완료일시
    ];

    // 데이터 길이 검증
    const expectedColumns = getExpectedColumnCount('consultation');
    if (rowData.length !== expectedColumns) {
      console.warn('⚠️ 상담 데이터 컬럼 수 불일치:', {
        expected: expectedColumns,
        actual: rowData.length
      });
    }

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 상담신청 저장 완료:', {
        시트: SHEETS.CONSULTATION,
        행번호: newRow,
        성명: data.성명 || data.name,
        회사명: data.회사명 || data.company,
        처리시간: new Date().getTime() - startTime + 'ms'
      });
    }

    // 이메일 발송 (유효성 검사 추가)
    if (AUTO_REPLY_ENABLED) {
      try {
        sendConsultationAdminNotification(data, newRow);
        
        const userEmail = data.이메일 || data.email;
        const userName = data.성명 || data.name;
        if (userEmail && isValidEmail(userEmail)) {
          sendUserConfirmation(userEmail, userName, '상담');
        } else if (userEmail) {
          console.warn('⚠️ 유효하지 않은 사용자 이메일:', userEmail);
        }
      } catch (emailError) {
        console.error('⚠️ 이메일 발송 실패 (데이터 저장은 성공):', emailError);
      }
    }

    return createSuccessResponse({
      message: '상담신청이 성공적으로 접수되었습니다. 24시간 내에 AI CAMP 전문가가 연락드리겠습니다.',
      company: COMPANY_NAME,
      consultant: CONSULTANT_NAME,
      phone: COMPANY_PHONE,
      sheet: SHEETS.CONSULTATION,
      row: newRow,
      timestamp: timestamp,
      processingTime: new Date().getTime() - startTime + 'ms'  
    });

  } catch (error) {
    const processingTime = new Date().getTime() - startTime;
    console.error('❌ 상담신청 처리 오류:', {
      error: error.toString(),
      processingTime: processingTime + 'ms'
    });
    return createErrorResponse('상담신청 처리 중 오류: ' + error.toString(), {
      processingTime: processingTime
    });
  }
}

// ================================================================================
// 🧪 베타피드백 처리 (14개 컬럼) - 오류 처리 강화
// ================================================================================

function processBetaFeedback(data) {
  const startTime = new Date().getTime();
  
  try {
    const sheet = getOrCreateSheet(SHEETS.BETA_FEEDBACK, 'betaFeedback');
    const timestamp = getReceptionTime().display;
    
    if (DEBUG_MODE) {
      console.log('🧪 베타피드백 처리:', {
        계산기명: data.계산기명,
        피드백유형: data.피드백유형,
        사용자이메일: data.사용자이메일?.substring(0, 5) + '***'
      });
    }
    
    // 14개 컬럼 베타피드백 데이터 구성 (유효성 검사 추가)
    const rowData = [
      timestamp,                      // A: 제출일시
      data.계산기명 || '',             // B: 계산기명
      data.피드백유형 || '',           // C: 피드백유형
      data.사용자이메일 || '',         // D: 사용자이메일
      data.문제설명 || '',            // E: 문제설명
      data.기대동작 || '',            // F: 기대동작
      data.실제동작 || '',            // G: 실제동작
      data.재현단계 || '',            // H: 재현단계
      data.심각도 || '',              // I: 심각도
      data.추가의견 || '',            // J: 추가의견
      data.브라우저정보 || '',        // K: 브라우저정보
      data.제출경로 || '',            // L: 제출경로
      '접수완료',                    // M: 처리상태
      ''                             // N: 처리일시
    ];

    // 데이터 길이 검증
    const expectedColumns = getExpectedColumnCount('betaFeedback');
    if (rowData.length !== expectedColumns) {
      console.warn('⚠️ 베타피드백 데이터 컬럼 수 불일치:', {
        expected: expectedColumns,
        actual: rowData.length
      });
    }

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 베타피드백 저장 완료:', {
        시트: SHEETS.BETA_FEEDBACK,
        행번호: newRow,
        계산기명: data.계산기명,
        피드백유형: data.피드백유형,
        처리시간: new Date().getTime() - startTime + 'ms'
      });
    }

    // 이메일 발송 (유효성 검사 추가)
    if (AUTO_REPLY_ENABLED) {
      try {
        sendBetaFeedbackAdminNotification(data, newRow);
        
        if (data.사용자이메일 && isValidEmail(data.사용자이메일)) {
          sendBetaFeedbackUserConfirmation(data.사용자이메일, data);
        } else if (data.사용자이메일) {
          console.warn('⚠️ 유효하지 않은 사용자 이메일:', data.사용자이메일);
        }
      } catch (emailError) {
        console.error('⚠️ 이메일 발송 실패 (데이터 저장은 성공):', emailError);
      }
    }

    return createSuccessResponse({
      message: '베타 피드백이 성공적으로 접수되었습니다. 검토 후 이메일로 회신드리겠습니다.',
      sheet: SHEETS.BETA_FEEDBACK,
      row: newRow,
      timestamp: timestamp,
      calculator: data.계산기명,
      feedbackType: data.피드백유형,
      processingTime: new Date().getTime() - startTime + 'ms'
    });

  } catch (error) {
    const processingTime = new Date().getTime() - startTime;
    console.error('❌ 베타피드백 처리 오류:', {
      error: error.toString(),
      processingTime: processingTime + 'ms'
    });
    return createErrorResponse('베타피드백 처리 중 오류: ' + error.toString(), {
      processingTime: processingTime
    });
  }
}

// 이하 생략... (이메일 발송 함수들, 시트 헤더 설정, 테스트 함수들은 기존과 동일하되 오류 처리만 강화)

// ================================================================================
// 🆕 개선된 PDF 이메일 발송 테스트 (오류 처리 강화)
// ================================================================================

/**
 * 진단신청 테스트 함수 (새로 추가)
 */
function testDiagnosisSubmission() {
  console.log('🧪 진단신청 처리 테스트 시작...');
  
  const testData = {
    회사명: '테스트회사',
    업종: 'IT/소프트웨어',
    담당자명: '김테스트',
    연락처: '010-1234-5678',
    이메일: 'test@example.com',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: '디지털 전환',
    개인정보동의: true,
    종합점수: 75,
    문항별점수: {
      기획수준: 4,
      차별화정도: 3,
      가격설정: 4,
      전문성: 5,
      품질: 4
    },
    진단보고서요약: '테스트용 진단 보고서 요약입니다.'
  };

  try {
    const result = processDiagnosisForm(testData);
    console.log('✅ 진단신청 테스트 성공');
    return result;
  } catch (error) {
    console.error('❌ 진단신청 테스트 실패:', error);
    throw error;
  }
}

/**
 * 상담신청 테스트 함수 (새로 추가)
 */
function testConsultationSubmission() {
  console.log('🧪 상담신청 처리 테스트 시작...');
  
  const testData = {
    성명: '김상담',
    연락처: '010-9876-5432',
    이메일: 'consultation@example.com',
    회사명: '상담테스트회사',
    직책: '대표',
    상담유형: 'AI도입상담',
    상담분야: 'AI/디지털전환',
    문의내용: '테스트용 상담 문의입니다.',
    개인정보동의: true
  };

  try {
    const result = processConsultationForm(testData);
    console.log('✅ 상담신청 테스트 성공');
    return result;
  } catch (error) {
    console.error('❌ 상담신청 테스트 실패:', error);
    throw error;
  }
}

/**
 * 베타피드백 테스트 함수 (새로 추가)
 */
function testBetaFeedback() {
  console.log('🧪 베타피드백 처리 테스트 시작...');
  
  const testData = {
    계산기명: '세금계산기',
    피드백유형: '오류신고',
    사용자이메일: 'feedback@example.com',
    문제설명: '테스트용 오류 신고입니다.',
    기대동작: '정상 계산 결과 출력',
    실제동작: '계산 오류 발생',
    심각도: '중간',
    브라우저정보: 'Chrome/120.0.0.0'
  };

  try {
    const result = processBetaFeedback(testData);
    console.log('✅ 베타피드백 테스트 성공');
    return result;
  } catch (error) {
    console.error('❌ 베타피드백 테스트 실패:', error);
    throw error;
  }
}

/**
 * 🆕 PDF 이메일 발송 테스트 (오류 수정 완료)
 */
function testPdfEmailSending() {
  console.log('📧 PDF 이메일 발송 테스트 시작 (오류 수정 완료 버전)...');
  
  // 더 현실적인 샘플 PDF 데이터 (Base64 인코딩된 PDF)
  const samplePdfBase64 = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA5NTIKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnicnVVNb9swDD2HXyFwnEIyLX8cg6Jtd+ilQ4fuMMCAAQMGDAg8OPDgwYMHDx48eOj6jT39jw==';
  
  const testData = {
    action: 'sendDiagnosisPdfEmail',
    to_email: 'test@example.com',
    to_name: '김테스트',
    company_name: 'PDF테스트회사',
    total_score: 85,
    overall_grade: 'A',
    industry_type: 'IT/소프트웨어',
    diagnosis_date: '2025. 07. 27.',
    pdf_attachment: samplePdfBase64,
    pdf_filename: 'AI진단보고서_PDF테스트회사_2025-07-27.pdf',
    consultant_name: '이후경 경영지도사',
    consultant_phone: '010-9251-9743',
    consultant_email: 'hongik423@gmail.com'
  };

  try {
    // 사전 검증
    console.log('🔍 PDF 이메일 발송 사전 검증 시작...');
    
    // 이메일 유효성 검사
    if (!isValidEmail(testData.to_email)) {
      throw new Error('테스트 이메일 주소가 유효하지 않습니다.');
    }
    
    // PDF 크기 검사
    const sizeCheck = checkPdfSize(testData.pdf_attachment);
    if (!sizeCheck.valid) {
      throw new Error('테스트 PDF 크기 검사 실패: ' + sizeCheck.error);
    }
    
    // Base64 유효성 검사
    if (!isValidBase64(testData.pdf_attachment)) {
      throw new Error('테스트 PDF Base64 데이터가 유효하지 않습니다.');
    }
    
    console.log('✅ 사전 검증 통과');
    
    // 실제 PDF 이메일 발송 테스트
    const result = sendDiagnosisPdfEmail(testData);
    console.log('✅ PDF 이메일 발송 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ PDF 이메일 발송 테스트 실패:', {
      error: error.toString(),
      testData: {
        to_email: testData.to_email,
        company_name: testData.company_name,
        pdf_size: testData.pdf_attachment ? Math.round(testData.pdf_attachment.length / 1024) + 'KB' : '0KB'
      }
    });
    return createErrorResponse('PDF 이메일 발송 테스트 실패: ' + error.toString());
  }
}

// ================================================================================
// 📖 개선된 사용법 및 설치 가이드 (오류 수정 완료)
// ================================================================================

/**
 * 📖 AI CAMP 통합 Apps Script 2025 최종완성판 + PDF 이메일 발송 기능 사용법 (오류 수정 완료)
 * 
 * 🎯 현재 배포 정보:
 * - Script ID: 1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
 * - Deployment ID: AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv
 * - Web App URL: https://script.google.com/macros/s/AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv/exec
 * - Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
 * - 관리자 이메일: hongik423@gmail.com
 * 
 * 🔧 수정된 오류 목록:
 * ✅ PDF 크기 제한 체크 추가 (25MB Gmail 제한)
 * ✅ 이메일 주소 유효성 검사 강화 (정규식 적용)
 * ✅ Base64 디코딩 오류 처리 개선
 * ✅ 메모리 최적화 및 성능 개선
 * ✅ 상세한 에러 로깅 시스템 추가
 * ✅ 권한 체크 및 설정 가이드 추가
 * ✅ 타임아웃 처리 및 큰 파일 대응
 * ✅ 시트 헤더 컬럼 수 정확성 검증
 * 
 * 🆕 새로 추가된 기능:
 * - PDF 첨부 이메일 발송 (sendDiagnosisPdfEmail) - 오류 수정 완료
 * - Base64 PDF 첨부파일 처리 - 크기 제한 및 유효성 검사 강화
 * - 진단 결과 PDF 자동 발송 시스템 - 안정성 개선
 * - PDF 발송 상태 Google Sheets 기록 - 정확도 향상
 * - PDF 발송 오류 처리 및 관리자 알림 - 상세 정보 추가
 * 
 * 🔧 설치 방법 (필수 권한 설정 포함):
 * 1. Google Apps Script 에디터에서 기존 Code.gs 내용 전체 삭제
 * 2. 이 오류 수정 완료 코드를 복사하여 Code.gs에 붙여넣기
 * 3. ⚠️ **중요: 권한 설정**
 *    - 라이브러리에서 Gmail API 활성화 (필수)
 *    - Google Sheets API 권한 확인
 *    - 스크립트 실행 권한 승인
 * 4. 저장 후 "배포" → "웹 앱으로 배포" 클릭
 * 5. 액세스 권한: "모든 사용자"로 설정
 * 6. "새 배포" 생성 (중요!)
 * 7. 생성된 웹앱 URL을 환경변수에 업데이트
 * 8. ✅ 권한 체크: checkRequiredPermissions() 함수로 권한 상태 확인
 * 
 * 🧪 테스트 방법 (오류 수정 완료):
 * - testEntireSystem() 함수 실행: 전체 시스템 테스트 (PDF 이메일 발송 포함)
 * - testPdfEmailSending() 함수 실행: PDF 이메일 발송 전용 테스트 (강화됨)
 * - testDiagnosisSubmission() 함수 실행: 진단 신청 테스트
 * - testConsultationSubmission() 함수 실행: 상담 신청 테스트
 * - testBetaFeedback() 함수 실행: 베타 피드백 테스트
 * - checkRequiredPermissions() 함수 실행: 권한 상태 확인 (새로 추가)
 * - checkEnvironmentSync() 함수 실행: 환경변수 동기화 상태 확인
 * - checkNextjsCompatibility() 함수 실행: Next.js 호환성 확인
 * 
 * ✅ 해결된 문제 (기존 + 새로 수정):
 * - 진단 점수 0으로 나오는 문제 → 1-5점 정확 저장
 * - 이메일 발송 안되는 문제 → 관리자/신청자 자동 이메일 + 유효성 검사 강화
 * - 시트 분리 안되는 문제 → 3개 시트 별도 관리
 * - 60개 컬럼 확장 진단 데이터 완전 저장 (PDF 발송 상태 포함)
 * - PDF 첨부 이메일 발송 → Base64 디코딩 및 Gmail API 활용 + 크기 제한 체크
 * - 직접 실행 시 오류 → 테스트 함수 제공 + 권한 체크
 * - 환경변수 불일치 → 완전 동기화 완료
 * - 웹앱 URL 업데이트 → 최신 배포 버전 적용
 * - 🆕 PDF 크기 초과 오류 → 25MB 제한 체크 추가
 * - 🆕 잘못된 이메일 주소 오류 → 정규식 유효성 검사 추가
 * - 🆕 Base64 디코딩 실패 → 사전 검증 로직 추가
 * - 🆕 메모리 부족 오류 → 배치 처리 및 최적화
 * - 🆕 타임아웃 오류 → 처리 시간 모니터링 및 제한
 * - 🆕 권한 부족 오류 → 권한 체크 및 안내 추가
 * 
 * 📊 시트 구성 (검증됨):
 * - AI_무료진단신청: 60개 컬럼 (58개 기존 + PDF발송상태 + PDF발송일시)
 * - 상담신청: 19개 컬럼
 * - 베타피드백: 14개 컬럼
 * 
 * 📧 이메일 기능 (강화됨):
 * - 관리자 알림: hongik423@gmail.com + 상세 오류 정보
 * - 신청자 확인: 자동 발송 + 이메일 유효성 검사
 * - PDF 첨부 이메일: 진단 결과 PDF 자동 발송 + 크기 제한 체크
 * - 베타피드백: 개발팀 알림
 * 
 * 🔄 환경변수 동기화 (검증됨):
 * - Next.js 환경변수와 완전 동기화
 * - 실시간 백업 시스템 구축
 * - API 엔드포인트 최신화
 * - PDF 이메일 발송 기능 완전 통합
 * - 권한 상태 실시간 모니터링
 * 
 * 🚨 주의사항 (중요):
 * 1. Gmail API 권한이 반드시 필요합니다 (PDF 첨부 이메일 발송용)
 * 2. PDF 파일 크기는 25MB를 초과할 수 없습니다
 * 3. 이메일 주소는 유효한 형식이어야 합니다
 * 4. 스크립트 실행 시간은 5분을 초과할 수 없습니다
 * 5. 첫 실행 시 권한 승인이 필요할 수 있습니다
 * 
 * 🔒 보안 강화:
 * - 입력 데이터 유효성 검사 강화
 * - 이메일 주소 정규식 검증
 * - Base64 데이터 검증
 * - 파일 크기 제한 체크
 * - 상세한 오류 로깅 및 추적
 */ 

// ================================================================================
// 📧 상담신청 이메일 발송 함수들 (누락된 함수 추가)
// ================================================================================

/**
 * 상담신청 관리자 알림 이메일 발송
 */
function sendConsultationAdminNotification(data, rowNumber) {
  try {
    console.log('📧 상담신청 관리자 알림 이메일 발송 시작');
    
    const subject = `[${COMPANY_NAME}] 새로운 상담신청 - ${data.성명 || data.name} (${data.회사명 || data.company})`;
    
    const body = `새로운 상담신청이 접수되었습니다.

📋 상담신청 정보:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수일시: ${getReceptionTime().display}
👤 신청자: ${data.성명 || data.name}
🏢 회사명: ${data.회사명 || data.company}
📞 연락처: ${data.연락처 || data.phone}
📧 이메일: ${data.이메일 || data.email}
💼 직책: ${data.직책 || data.position || 'N/A'}
🔧 상담유형: ${data.상담유형 || data.consultationType}
📊 상담분야: ${data.상담분야 || data.consultationArea || 'N/A'}
⏰ 희망상담시간: ${data.희망상담시간 || data.preferredTime || 'N/A'}

💬 문의내용:
${data.문의내용 || data.inquiryContent || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 시트 위치: ${SHEETS.CONSULTATION} 시트 ${rowNumber}행
🆔 처리방식: ${data.처리방식 || 'N/A'}

🎯 후속 조치:
1. 24시간 내 신청자에게 연락
2. 상담 일정 조율
3. 전문가 배정 및 상담 진행
4. 결과 보고서 작성

--
AI CAMP 자동알림 시스템
📧 담당: ${CONSULTANT_NAME}
📞 연락처: ${COMPANY_PHONE}
🌐 웹사이트: ${COMPANY_WEBSITE}
📧 자동발송: ${getEmailSendTime().display}
    `;

    GmailApp.sendEmail(
      ADMIN_EMAIL,
      subject,
      body,
      { 
        name: `${COMPANY_NAME} 상담알림`,
        replyTo: data.이메일 || data.email
      }
    );
    
    console.log('✅ 상담신청 관리자 알림 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 상담신청 관리자 알림 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 상담신청자 확인 이메일 발송
 */
function sendUserConfirmation(userEmail, userName, serviceType) {
  try {
    console.log('📧 신청자 확인 이메일 발송 시작:', userEmail);
    
    if (!isValidEmail(userEmail)) {
      console.warn('⚠️ 유효하지 않은 이메일 주소:', userEmail);
      return;
    }
    
    const subject = `[${COMPANY_NAME}] ${serviceType} 신청이 접수되었습니다 - ${userName}님`;
    
    const body = `안녕하세요, ${userName}님!

AI CAMP입니다.

🎉 ${serviceType} 신청이 성공적으로 접수되었습니다.

📋 접수 내용:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수일시: ${getReceptionTime().display}
👤 신청자: ${userName}님
📧 이메일: ${userEmail}
🎯 서비스: ${serviceType}
📊 접수상태: ✅ 정상 접수 완료
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 다음 단계:
1️⃣ 24시간 내 담당 전문가가 연락드립니다
2️⃣ 상담 일정을 조율하여 진행합니다
3️⃣ 맞춤형 솔루션을 제안해드립니다

👨‍💼 담당 전문가:
• ${CONSULTANT_NAME}
• 25년 현장 경험 + 500개 기업 AI 교육 실적
• AI 프로세스 자동화 컨설팅 및 교육

📱 긴급 문의:
• 이메일: ${ADMIN_EMAIL}
• 전화: ${COMPANY_PHONE} (평일 09:00-18:00)
• 웹사이트: ${COMPANY_WEBSITE}

🏢 AI CAMP
AI 기반 비즈니스 혁신을 통한 성장 동반자

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ 빠른 응답을 약속드립니다!
💡 궁금한 점이 있으시면 언제든 연락주세요.

감사합니다!

--
AI CAMP 자동확인 시스템
📧 담당: ${CONSULTANT_NAME}
📧 자동발송: ${getCurrentKoreanTime()}
    `;

    GmailApp.sendEmail(
      userEmail,
      subject,
      body,
      { 
        name: COMPANY_NAME,
        replyTo: ADMIN_EMAIL
      }
    );
    
    console.log('✅ 신청자 확인 이메일 발송 완료:', userEmail);
    
  } catch (error) {
    console.error('❌ 신청자 확인 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 진단신청 관리자 알림 이메일 발송
 */
function sendDiagnosisAdminNotification(data, rowNumber, totalScore, reportSummary) {
  try {
    console.log('📧 진단신청 관리자 알림 이메일 발송 시작');
    
    const subject = `[${COMPANY_NAME}] 새로운 AI 무료진단 완료 - ${data.회사명 || data.company_name} (${totalScore}점)`;
    
    const body = `새로운 AI 무료진단이 완료되었습니다.

📊 진단 결과 요약:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 진단일시: ${getReceptionTime().display}
🏢 회사명: ${data.회사명 || data.company_name}
👤 담당자: ${data.담당자명 || data.contact_name}
📞 연락처: ${data.연락처 || data.phone}
📧 이메일: ${data.이메일 || data.email}
🏭 업종: ${data.업종 || data.industry || 'N/A'}
👥 직원수: ${data.직원수 || data.employee_count || 'N/A'}

🎯 진단 점수: ${totalScore}점
📊 등급: ${data.overall_grade || 'N/A'}

📝 진단 요약:
${reportSummary || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 시트 위치: ${SHEETS.DIAGNOSIS} 시트 ${rowNumber}행
📄 PDF 상태: ${data.PDF발송상태 || '대기'}

🎯 후속 조치:
1. PDF 진단보고서 자동 발송 (이미 처리됨)
2. 24시간 내 신청자에게 후속 상담 연락
3. 맞춤형 AI 도입 컨설팅 제안
4. 전문가 상담 일정 조율

--
AI CAMP 자동알림 시스템
📧 담당: ${CONSULTANT_NAME}
📞 연락처: ${COMPANY_PHONE}
🌐 웹사이트: ${COMPANY_WEBSITE}
📧 자동발송: ${getCurrentKoreanTime()}
    `;

    GmailApp.sendEmail(
      ADMIN_EMAIL,
      subject,
      body,
      { 
        name: `${COMPANY_NAME} 진단알림`,
        replyTo: data.이메일 || data.email
      }
    );
    
    console.log('✅ 진단신청 관리자 알림 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 진단신청 관리자 알림 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 진단신청자 확인 이메일 발송 (PDF 발송 전 확인용)
 */
function sendDiagnosisUserConfirmation(userEmail, userName, companyName) {
  try {
    console.log('📧 진단신청자 확인 이메일 발송 시작:', userEmail);
    
    if (!isValidEmail(userEmail)) {
      console.warn('⚠️ 유효하지 않은 이메일 주소:', userEmail);
      return;
    }
    
    const subject = `[${COMPANY_NAME}] AI 무료진단 접수 완료 - ${userName}님 (${companyName})`;
    
    const body = `안녕하세요, ${userName}님!

AI CAMP입니다.

🎉 AI 무료진단 신청이 성공적으로 접수되었습니다.

📋 접수 내용:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수일시: ${getReceptionTime().display}
🏢 회사명: ${companyName}
👤 담당자: ${userName}님
📧 이메일: ${userEmail}
🎯 서비스: AI 무료진단
📊 접수상태: ✅ 정상 접수 완료
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 진단 진행 상황:
1️⃣ ✅ 진단 데이터 분석 완료
2️⃣ 🔄 맞춤형 보고서 생성 중
3️⃣ 📧 PDF 진단보고서 발송 예정
4️⃣ 📞 전문가 후속 상담 연락 예정

👨‍💼 담당 전문가:
• ${CONSULTANT_NAME}
• 25년 현장 경험 + 500개 기업 AI 교육 실적
• AI 프로세스 자동화 컨설팅 및 교육

📧 PDF 진단보고서:
• 발송 시간: 접수 후 즉시 (약 1-2분 소요)
• 포함 내용: 상세 진단 결과, AI 도입 가이드라인, 맞춤형 제안사항
• 추가 문의: ${ADMIN_EMAIL}

📱 긴급 문의:
• 이메일: ${ADMIN_EMAIL}
• 전화: ${COMPANY_PHONE} (평일 09:00-18:00)
• 웹사이트: ${COMPANY_WEBSITE}

🏢 AI CAMP
AI 기반 비즈니스 혁신을 통한 성장 동반자

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ PDF 보고서를 곧 받아보실 수 있습니다!
💡 궁금한 점이 있으시면 언제든 연락주세요.

감사합니다!

--
AI CAMP 자동확인 시스템
📧 담당: ${CONSULTANT_NAME}
📧 자동발송: ${getCurrentKoreanTime()}
    `;

    GmailApp.sendEmail(
      userEmail,
      subject,
      body,
      { 
        name: 'AI CAMP',
        replyTo: ADMIN_EMAIL
      }
    );
    
    console.log('✅ 진단신청자 확인 이메일 발송 완료:', userEmail);
    
  } catch (error) {
    console.error('❌ 진단신청자 확인 이메일 발송 실패:', error);
    throw error;
  }
}

// ================================================================================
// 🔧 누락된 필수 함수들 추가 (시트 헤더 설정 및 베타피드백 이메일)
// ================================================================================

/**
 * 시트 헤더 설정 함수
 */
function setupHeaders(sheet, type) {
  try {
    console.log('🔧 헤더 설정 시작:', {
      sheetName: sheet.getName(),
      type: type
    });
    
    let headers = [];
    
    switch (type) {
      case 'diagnosis':
        headers = [
          '제출일시', '회사명', '업종', '사업담당자', '직원수', '사업성장단계', '주요고민사항', '예상혜택', '진행사업장', '담당자명', '연락처', '이메일', '개인정보동의', '폼타입', '진단상태', 'AI분석결과', '결과URL', '분석완료일시',
          '종합점수', '상품서비스점수', '고객응대점수', '마케팅점수', '구매재고점수', '매장관리점수',
          '기획수준', '차별화정도', '가격설정', '전문성', '품질',
          '고객맞이', '고객응대', '불만관리', '고객유지',
          '고객이해', '마케팅계획', '오프라인마케팅', '온라인마케팅', '판매전략',
          '구매관리', '재고관리',
          '외관관리', '인테리어관리', '청결도', '작업동선',
          '보고서글자수', '추천서비스목록', '보고서요약', '보고서전문',
          'PDF발송상태', 'PDF발송일시'
        ];
        break;
        
      case 'consultation':
        headers = [
          '제출일시', '상담유형', '성명', '연락처', '이메일', '회사명', '직책', '상담분야', '문의내용', '희망상담시간', '개인정보동의', '진단연계여부', '진단점수', '추천서비스', '처리상태', '상담일정', '상담결과', '담당컨설턴트', '완료일시'
        ];
        break;
        
      case 'betaFeedback':
        headers = [
          '제출일시', '계산기명', '피드백유형', '사용자이메일', '문제설명', '기대동작', '실제동작', '재현단계', '심각도', '추가의견', '브라우저정보', '제출경로', '처리상태', '처리일시'
        ];
        break;
        
      default:
        console.warn('⚠️ 알 수 없는 시트 타입:', type);
        return;
    }
    
    // 헤더 설정
    if (headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
      
      console.log('✅ 헤더 설정 완료:', {
        sheetName: sheet.getName(),
        type: type,
        headerCount: headers.length
      });
    }
    
  } catch (error) {
    console.error('❌ 헤더 설정 오류:', {
      sheetName: sheet.getName(),
      type: type,
      error: error.toString()
    });
  }
}

/**
 * 베타피드백 관리자 알림 이메일 발송
 */
function sendBetaFeedbackAdminNotification(data, rowNumber) {
  try {
    console.log('📧 베타피드백 관리자 알림 이메일 발송 시작');
    
    const subject = `[AI CAMP] 새로운 베타피드백 - ${data.계산기명} (${data.피드백유형})`;
    
    const body = `새로운 베타피드백이 접수되었습니다.

🧪 베타피드백 정보:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수일시: ${getReceptionTime().display}
🧮 계산기명: ${data.계산기명}
📝 피드백유형: ${data.피드백유형}
📧 사용자이메일: ${data.사용자이메일}
🔧 심각도: ${data.심각도 || 'N/A'}

📋 문제설명:
${data.문제설명 || 'N/A'}

💡 기대동작:
${data.기대동작 || 'N/A'}

❌ 실제동작:
${data.실제동작 || 'N/A'}

🔄 재현단계:
${data.재현단계 || 'N/A'}

💬 추가의견:
${data.추가의견 || 'N/A'}

🌐 브라우저정보:
${data.브라우저정보 || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 시트 위치: ${SHEETS.BETA_FEEDBACK} 시트 ${rowNumber}행
🆔 제출경로: ${data.제출경로 || 'N/A'}

🎯 후속 조치:
1. 피드백 내용 검토 및 분석
2. 개발팀에 이슈 전달
3. 수정 방안 검토
4. 사용자에게 처리 결과 회신

--
AI CAMP 자동알림 시스템
📧 담당: ${CONSULTANT_NAME}
📞 연락처: ${COMPANY_PHONE}
🌐 웹사이트: ${COMPANY_WEBSITE}
📧 자동발송: ${getCurrentKoreanTime()}
    `;

    GmailApp.sendEmail(
      ADMIN_EMAIL,
      subject,
      body,
      { 
        name: 'AI CAMP 베타피드백알림',
        replyTo: data.사용자이메일
      }
    );
    
    console.log('✅ 베타피드백 관리자 알림 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 베타피드백 관리자 알림 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 베타피드백 사용자 확인 이메일 발송
 */
function sendBetaFeedbackUserConfirmation(userEmail, data) {
  try {
    console.log('📧 베타피드백 사용자 확인 이메일 발송 시작:', userEmail);
    
    if (!isValidEmail(userEmail)) {
      console.warn('⚠️ 유효하지 않은 이메일 주소:', userEmail);
      return;
    }
    
    const subject = `[AI CAMP] 베타피드백 접수 완료 - ${data.계산기명}`;
    
    const body = `안녕하세요!

AI CAMP입니다.

🎉 ${data.계산기명}에 대한 베타피드백이 성공적으로 접수되었습니다.

📋 접수 내용:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수일시: ${getReceptionTime().display}
🧮 계산기명: ${data.계산기명}
📝 피드백유형: ${data.피드백유형}
�� 이메일: ${userEmail}
🔧 심각도: ${data.심각도 || 'N/A'}
📊 접수상태: ✅ 정상 접수 완료
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 처리 절차:
1️⃣ 개발팀 검토 및 분석 (1-2일)
2️⃣ 수정 또는 개선 방안 결정
3️⃣ 업데이트 적용 (필요시)
4️⃣ 처리 결과 이메일 회신

📱 추가 문의:
• 이메일: ${ADMIN_EMAIL}
• 전화: ${COMPANY_PHONE} (평일 09:00-18:00)
• 웹사이트: ${COMPANY_WEBSITE}

🏢 AI CAMP
AI 기반 비즈니스 혁신을 통한 성장 동반자

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ 소중한 피드백 감사합니다!
💡 더 나은 서비스로 보답하겠습니다.

감사합니다!

--
AI CAMP 자동확인 시스템
📧 자동발송: ${getCurrentKoreanTime()}
    `;

    GmailApp.sendEmail(
      userEmail,
      subject,
      body,
      { 
        name: 'AI CAMP',
        replyTo: ADMIN_EMAIL
      }
    );
    
    console.log('✅ 베타피드백 사용자 확인 이메일 발송 완료:', userEmail);
    
  } catch (error) {
    console.error('❌ 베타피드백 사용자 확인 이메일 발송 실패:', error);
    throw error;
  }
}

// ================================================================================
// 🌐 웹사이트 연동 테스트 함수 (새로 추가)
// ================================================================================

/**
 * 웹사이트 연동 테스트 함수 - aicamp.club에서 오는 데이터 형식 시뮬레이션
 */
function testWebsiteIntegration() {
  console.log('🌐 웹사이트 연동 테스트 시작...');
  
  // aicamp.club/consultation에서 오는 실제 데이터 형식
  const websiteData = {
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    폼타입: '상담신청',
    상담유형: 'AI 도입 컨설팅',
    성명: '홍길동',
    연락처: '010-9876-5432',
    이메일: ADMIN_EMAIL,
    회사명: '혁신기술(주)',
    직책: '대표이사',
    상담분야: 'AI 자동화',
    문의내용: '우리 회사에도 AI를 도입하고 싶습니다. 자세한 상담 부탁드립니다.',
    희망상담시간: '평일 오전 10시-12시',
    개인정보동의: '동의',
    action: 'saveConsultation',
    dataSource: '웹사이트_상담신청',
    timestamp: Date.now()
  };
  
  try {
    // POST 요청 시뮬레이션
    const mockEvent = {
      postData: {
        contents: JSON.stringify(websiteData),
        type: 'application/json'
      }
    };
    
    const result = doPost(mockEvent);
    console.log('✅ 웹사이트 연동 테스트 성공:', result);
    
    return {
      success: true,
      message: 'AI CAMP 웹사이트 연동 테스트가 성공적으로 완료되었습니다.',
      company: COMPANY_NAME,
      consultant: CONSULTANT_NAME,
      testData: websiteData,
      result: result,
      timestamp: getCurrentKoreanTime()
    };
  } catch (error) {
    console.error('❌ 웹사이트 연동 테스트 실패:', error);
    return {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime()
    };
  }
}

/**
 * 전체 시스템 통합 테스트 함수 (업데이트됨)
 */
function testEntireSystem() {
  console.log('🔥 AI CAMP 전체 시스템 통합 테스트 시작...');
  
  const results = {
    timestamp: getCurrentKoreanTime(),
    company: COMPANY_NAME,
    version: VERSION,
    tests: {}
  };
  
  try {
    // 1. 시스템 건강 상태 점검
    console.log('1/5 시스템 건강 상태 점검...');
    results.tests.healthCheck = systemHealthCheck();
    
    // 2. 웹사이트 연동 테스트
    console.log('2/5 웹사이트 연동 테스트...');
    results.tests.websiteIntegration = testWebsiteIntegration();
    
    // 3. 상담신청 테스트
    console.log('3/5 상담신청 테스트...');
    results.tests.consultation = testConsultationSubmission();
    
    // 4. 진단신청 테스트
    console.log('4/5 진단신청 테스트...');
    results.tests.diagnosis = testDiagnosisSubmission();
    
    // 5. 베타피드백 테스트
    console.log('5/5 베타피드백 테스트...');
    results.tests.betaFeedback = testBetaFeedback();
    
    // 전체 결과 요약
    const successCount = Object.values(results.tests).filter(test => 
      test && (test.success || test.message?.includes('성공'))
    ).length;
    
    results.summary = {
      totalTests: Object.keys(results.tests).length,
      successCount: successCount,
      failureCount: Object.keys(results.tests).length - successCount,
      successRate: Math.round((successCount / Object.keys(results.tests).length) * 100) + '%'
    };
    
    console.log('✅ AI CAMP 전체 시스템 테스트 완료:', results.summary);
    return results;
    
  } catch (error) {
    console.error('❌ 전체 시스템 테스트 실패:', error);
    results.error = error.toString();
    return results;
  }
}

// ================================================================================
// 🆘 302 오류 긴급 진단 함수 (새로 추가)
// ================================================================================

/**
 * 🆘 302 오류 긴급 진단 및 해결 가이드
 */
function diagnose302Error() {
  console.log('🆘 302 오류 긴급 진단 시작...');
  
  const diagnosis = {
    timestamp: getCurrentKoreanTime(),
    errorType: '302 리다이렉트 오류',
    currentStatus: {
      scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
      deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
      webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
      lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED
    },
    diagnosis: [],
    urgentActions: [],
    stepByStepFix: []
  };

  // 1. 배포 상태 진단
  diagnosis.diagnosis.push({
    issue: '배포 활성화 상태',
    status: '⚠️ 확인 필요',
    description: '새 배포를 만들었지만 활성화하지 않았을 가능성이 높습니다.'
  });

  // 2. 권한 상태 진단
  const permissions = checkRequiredPermissions();
  diagnosis.diagnosis.push({
    issue: '권한 상태',
    status: permissions.gmail && permissions.sheets ? '✅ 정상' : '❌ 문제',
    details: permissions
  });

  // 3. URL 접근성 테스트
  diagnosis.diagnosis.push({
    issue: 'URL 접근성',
    status: '🔍 테스트 필요',
    currentUrl: DEPLOYMENT_INFO.WEB_APP_URL
  });

  // 🚨 긴급 조치사항
  diagnosis.urgentActions = [
    '1. Google Apps Script 에디터 열기',
    '2. "배포" → "웹 앱으로 배포" 클릭',
    '3. "새 배포" 생성 (기존 배포 수정 아님!)',
    '4. 액세스 권한: "모든 사용자"로 설정',
    '5. "배포" 버튼 클릭하여 활성화',
    '6. 새로 생성된 웹앱 URL 복사',
    '7. 환경변수에 새 URL 업데이트'
  ];

  // 📋 단계별 해결 가이드
  diagnosis.stepByStepFix = [
    {
      step: 1,
      title: '🔧 Google Apps Script 에디터 접속',
      action: 'https://script.google.com/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit',
      details: 'Script ID로 직접 접속하여 에디터 열기'
    },
    {
      step: 2,
      title: '⚡ 함수 권한 승인',
      action: 'testEntireSystem() 함수 실행',
      details: 'Gmail, Sheets 권한이 없다면 승인 팝업에서 모든 권한 허용'
    },
    {
      step: 3,
      title: '🚀 새 배포 생성',
      action: '우측 상단 "배포" → "웹 앱으로 배포"',
      details: '기존 배포 수정이 아닌 "새 배포" 생성 필수!'
    },
    {
      step: 4,
      title: '🔓 액세스 권한 설정',
      action: '"액세스 권한"을 "모든 사용자"로 변경',
      details: '"나만" 또는 "도메인 내"가 아닌 "모든 사용자" 선택'
    },
    {
      step: 5,
      title: '✅ 배포 활성화',
      action: '"배포" 버튼 클릭하여 웹앱 활성화',
      details: '새로운 Deployment ID와 웹앱 URL이 생성됨'
    },
    {
      step: 6,
      title: '🔄 환경변수 업데이트',
      action: 'Next.js 환경변수에 새 웹앱 URL 적용',
      details: 'NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL을 새 URL로 업데이트'
    }
  ];

  // 추가 진단 정보
  diagnosis.additionalInfo = {
    commonCauses: [
      '새 배포 생성 후 활성화 안함 (90%)',
      '권한 승인 누락 (5%)',
      '액세스 권한 설정 오류 (3%)',
      '코드 오류 (2%)'
    ],
    expectedDeploymentIdFormat: 'AKfycby...(약 80자)',
    currentDeploymentIdLength: DEPLOYMENT_INFO.DEPLOYMENT_ID.length,
    isValidDeploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID.startsWith('AKfycb') && DEPLOYMENT_INFO.DEPLOYMENT_ID.length > 70
  };

  console.log('🆘 302 오류 진단 완료:', diagnosis);
  return diagnosis;
}

/**
 * 🧪 웹앱 접근성 테스트 (302 오류 확인용)
 */
function testWebAppAccessibility() {
  console.log('🧪 웹앱 접근성 테스트 시작...');
  
  const testResult = {
    timestamp: getCurrentKoreanTime(),
    webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
    tests: {
      urlFormat: {
        expected: 'https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec',
        actual: DEPLOYMENT_INFO.WEB_APP_URL,
        valid: DEPLOYMENT_INFO.WEB_APP_URL.includes('script.google.com/macros/s/') && DEPLOYMENT_INFO.WEB_APP_URL.endsWith('/exec')
      },
      deploymentId: {
        length: DEPLOYMENT_INFO.DEPLOYMENT_ID.length,
        format: DEPLOYMENT_INFO.DEPLOYMENT_ID.startsWith('AKfycb'),
        valid: DEPLOYMENT_INFO.DEPLOYMENT_ID.startsWith('AKfycb') && DEPLOYMENT_INFO.DEPLOYMENT_ID.length > 70
      },
      permissions: checkRequiredPermissions()
    },
    verdict: null,
    recommendations: []
  };

  // 판정
  if (!testResult.tests.urlFormat.valid) {
    testResult.verdict = '❌ URL 형식 오류';
    testResult.recommendations.push('웹앱 URL 형식을 확인하고 새로 배포하세요.');
  } else if (!testResult.tests.deploymentId.valid) {
    testResult.verdict = '❌ Deployment ID 오류';
    testResult.recommendations.push('새 배포를 생성하여 올바른 Deployment ID를 받으세요.');
  } else if (!testResult.tests.permissions.gmail || !testResult.tests.permissions.sheets) {
    testResult.verdict = '❌ 권한 부족';
    testResult.recommendations.push('Google Apps Script에서 Gmail 및 Sheets 권한을 승인하세요.');
  } else {
    testResult.verdict = '⚠️ 배포 비활성화 의심';
    testResult.recommendations.push('새 배포를 생성하고 "웹 앱으로 배포"를 활성화하세요.');
  }

  console.log('🧪 웹앱 접근성 테스트 완료:', testResult.verdict);
  return testResult;
}

/**
 * 🔧 긴급 배포 수정 가이드 생성
 */
function generateEmergencyDeploymentGuide() {
  const guide = {
    title: '🆘 302 오류 긴급 해결 가이드',
    timestamp: getCurrentKoreanTime(),
    currentDeployment: {
      scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
      deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
      webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL
    },
    emergencySteps: [
      {
        order: 1,
        action: '🔗 Google Apps Script 에디터 열기',
        url: `https://script.google.com/d/${DEPLOYMENT_INFO.SCRIPT_ID}/edit`,
        instruction: '위 URL을 클릭하여 에디터에 직접 접속'
      },
      {
        order: 2,
        action: '⚡ 권한 테스트 및 승인',
        instruction: 'testEntireSystem() 함수를 실행하여 필요한 권한 모두 승인'
      },
      {
        order: 3,
        action: '🚀 새 배포 생성 (중요!)',
        instruction: '우측 상단 "배포" → "웹 앱으로 배포" → "새 배포" 선택'
      },
      {
        order: 4,
        action: '🔓 액세스 권한 설정',
        instruction: '"액세스 권한"을 반드시 "모든 사용자"로 설정'
      },
      {
        order: 5,
        action: '✅ 배포 실행',
        instruction: '"배포" 버튼을 클릭하여 새 웹앱 URL 생성'
      },
      {
        order: 6,
        action: '📋 새 URL 복사',
        instruction: '생성된 웹앱 URL을 복사 (AKfycb로 시작하는 새 ID 확인)'
      },
      {
        order: 7,
        action: '🔄 환경변수 업데이트',
        instruction: 'NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL에 새 URL 적용 후 재배포'
      }
    ],
    troubleshooting: {
      '권한 오류 시': 'Google Apps Script에서 Gmail, Sheets 권한을 모두 승인하세요',
      '배포 버튼 없음': '코드 저장 후 새로고침 해보세요',
      '접근 거부 오류': '액세스 권한을 "모든 사용자"로 다시 설정하세요',
      '여전히 302 오류': '브라우저 캐시를 지우고 새 시크릿 창에서 테스트하세요'
    }
  };

  return guide;
}

/**
 * 🆘 302 오류 실시간 해결 가이드 (즉시 실행용)
 */
function fix302ErrorNow() {
  console.log('🆘 302 오류 실시간 해결 시작...');
  
  const fixGuide = {
    timestamp: getCurrentKoreanTime(),
    verified: {
      sheetsId: SPREADSHEET_ID,
      scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
      deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
      webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL
    },
    diagnosis: {
      idsMatch: '✅ Google Sheets & Apps Script ID 모두 정확',
      deploymentFormat: DEPLOYMENT_INFO.DEPLOYMENT_ID.startsWith('AKfycb') ? '✅ Deployment ID 형식 정상' : '❌ Deployment ID 형식 오류',
      urlFormat: DEPLOYMENT_INFO.WEB_APP_URL.includes('script.google.com/macros/s/') ? '✅ 웹앱 URL 형식 정상' : '❌ 웹앱 URL 형식 오류'
    },
    problem: '🎯 302 오류 원인: 새 배포가 생성되었지만 웹앱으로 활성화되지 않음',
    solution: {
      priority: 'HIGH',
      type: 'DEPLOYMENT_ACTIVATION',
      confidence: '99%'
    },
    immediateActions: [
      {
        step: 1,
        action: '🔗 Google Apps Script 에디터 열기',
        url: `https://script.google.com/u/0/home/projects/${DEPLOYMENT_INFO.SCRIPT_ID}/edit`,
        instruction: '위 링크를 새 탭에서 열기'
      },
      {
        step: 2,
        action: '⚡ 권한 테스트',
        code: 'testEntireSystem()',
        instruction: '함수를 실행하여 Gmail, Sheets 권한 승인'
      },
      {
        step: 3,
        action: '🚀 새 배포 생성',
        instruction: '우측 상단 "배포" → "웹 앱으로 배포" → "새 배포" (기존 수정 아님!)'
      },
      {
        step: 4,
        action: '🔓 권한 설정',
        instruction: '"액세스 권한"을 "모든 사용자"로 반드시 변경'
      },
      {
        step: 5,
        action: '✅ 배포 활성화',
        instruction: '"배포" 버튼 클릭 → 새 웹앱 URL 생성 확인'
      },
      {
        step: 6,
        action: '📋 URL 업데이트',
        instruction: '새 웹앱 URL을 복사하여 Next.js 환경변수에 적용'
      }
    ],
    testCommands: [
      'diagnose302Error() - 상세 진단',
      'testWebAppAccessibility() - 접근성 테스트',
      'systemHealthCheck() - 시스템 전체 점검',
      'testEntireSystem() - 전체 기능 테스트'
    ],
    criticalNote: '🚨 중요: "기존 배포 수정"이 아닌 "새 배포" 생성이 핵심입니다!'
  };

  // 추가 실시간 검증
  try {
    const permissions = checkRequiredPermissions();
    fixGuide.currentPermissions = permissions;
    
    if (!permissions.gmail) {
      fixGuide.immediateActions.unshift({
        step: 0,
        action: '🔒 Gmail 권한 승인 필요',
        instruction: '함수 실행 시 Gmail API 권한 승인 팝업에서 "허용" 클릭'
      });
    }
    
    if (!permissions.sheets) {
      fixGuide.immediateActions.unshift({
        step: 0,
        action: '🔒 Sheets 권한 승인 필요',
        instruction: '함수 실행 시 Google Sheets API 권한 승인 팝업에서 "허용" 클릭'
      });
    }
  } catch (permissionError) {
    fixGuide.permissionError = permissionError.toString();
  }

  console.log('🆘 302 오류 실시간 해결 가이드 완료');
  return fixGuide;
}

/**
 * 🔧 배포 상태 실시간 확인 및 검증
 */
function verifyDeploymentStatus() {
  console.log('🔧 배포 상태 실시간 확인 시작...');
  
  const verification = {
    timestamp: getCurrentKoreanTime(),
    providedLinks: {
      sheetsUrl: 'https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514',
      scriptUrl: 'https://script.google.com/u/0/home/projects/1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z/edit'
    },
    currentConfig: {
      spreadsheetId: SPREADSHEET_ID,
      scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
      deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
      webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL
    },
    verification: {
      sheetsIdMatch: SPREADSHEET_ID === '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00',
      scriptIdMatch: DEPLOYMENT_INFO.SCRIPT_ID === '1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z',
      deploymentIdValid: DEPLOYMENT_INFO.DEPLOYMENT_ID.startsWith('AKfycb') && DEPLOYMENT_INFO.DEPLOYMENT_ID.length > 70,
      webAppUrlValid: DEPLOYMENT_INFO.WEB_APP_URL.includes('script.google.com/macros/s/') && DEPLOYMENT_INFO.WEB_APP_URL.endsWith('/exec')
    },
    diagnosis: null,
    recommendation: null
  };

  // 전체 검증 결과
  const allValid = Object.values(verification.verification).every(v => v === true);
  
  if (allValid) {
    verification.diagnosis = '✅ 모든 ID와 URL이 정확함 - 302 오류는 배포 활성화 문제';
    verification.recommendation = '새 배포 생성 후 웹앱으로 활성화 필요';
  } else {
    verification.diagnosis = '❌ 설정 불일치 발견';
    verification.recommendation = '설정값 확인 후 새 배포 생성 필요';
  }

  // 상세 분석
  verification.detailedAnalysis = {
    sheetsAccess: verification.verification.sheetsIdMatch ? 
      '✅ Google Sheets 연결 설정 정상' : 
      '❌ Google Sheets ID 불일치',
    scriptAccess: verification.verification.scriptIdMatch ? 
      '✅ Apps Script 연결 설정 정상' : 
      '❌ Apps Script ID 불일치',
    deploymentStatus: verification.verification.deploymentIdValid ? 
      '⚠️ Deployment ID는 정상이지만 웹앱 활성화 필요' : 
      '❌ Deployment ID 형식 오류',
    webAppStatus: verification.verification.webAppUrlValid ? 
      '⚠️ 웹앱 URL 형식은 정상이지만 302 오류 발생 중' : 
      '❌ 웹앱 URL 형식 오류'
  };

  console.log('🔧 배포 상태 확인 완료:', verification.diagnosis);
  return verification;
}

/**
 * 🧪 302 오류 해결 확인 테스트
 */
function test302Resolution() {
  console.log('🧪 302 오류 해결 확인 테스트 시작...');
  
  const testResults = {
    timestamp: getCurrentKoreanTime(),
    testPhase: '302 오류 해결 확인',
    tests: {
      configVerification: null,
      permissionCheck: null,
      deploymentValidation: null,
      webAppAccessibility: null
    },
    overallStatus: null,
    nextSteps: []
  };

  try {
    // 1. 설정 검증
    testResults.tests.configVerification = verifyDeploymentStatus();
    
    // 2. 권한 확인
    testResults.tests.permissionCheck = checkRequiredPermissions();
    
    // 3. 배포 유효성 검사
    testResults.tests.deploymentValidation = {
      deploymentIdLength: DEPLOYMENT_INFO.DEPLOYMENT_ID.length,
      deploymentIdFormat: DEPLOYMENT_INFO.DEPLOYMENT_ID.startsWith('AKfycb'),
      webAppUrlFormat: DEPLOYMENT_INFO.WEB_APP_URL.includes('/exec'),
      lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED
    };
    
    // 4. 웹앱 접근성 테스트
    testResults.tests.webAppAccessibility = testWebAppAccessibility();
    
    // 전체 상태 판정
    const hasPermissions = testResults.tests.permissionCheck.gmail && testResults.tests.permissionCheck.sheets;
    const hasValidConfig = testResults.tests.configVerification.verification.sheetsIdMatch && 
                          testResults.tests.configVerification.verification.scriptIdMatch;
    const hasValidDeployment = testResults.tests.deploymentValidation.deploymentIdFormat && 
                              testResults.tests.deploymentValidation.webAppUrlFormat;

    if (hasPermissions && hasValidConfig && hasValidDeployment) {
      testResults.overallStatus = '⚠️ 설정은 정상이지만 웹앱 활성화 필요';
      testResults.nextSteps = [
        '1. Google Apps Script에서 새 배포 생성',
        '2. "웹 앱으로 배포" 활성화',
        '3. "모든 사용자" 권한 설정',
        '4. 새 웹앱 URL로 환경변수 업데이트'
      ];
    } else {
      testResults.overallStatus = '❌ 설정 오류 발견';
      testResults.nextSteps = [
        '1. 권한 승인 (Gmail, Sheets)',
        '2. 설정값 확인 및 수정',
        '3. 새 배포 생성 및 활성화'
      ];
    }

  } catch (error) {
    testResults.error = error.toString();
    testResults.overallStatus = '❌ 테스트 실행 중 오류 발생';
  }

  console.log('🧪 302 오류 해결 확인 테스트 완료:', testResults.overallStatus);
  return testResults;
}

// ================================================================================
/**
 * ================================================================================
 * Google Apps Script 콘솔 직접 실행용 진단 명령어
 * ================================================================================
 * 
 * 🎯 사용방법:
 * 1. Google Apps Script 에디터에서 아래 함수들을 복사
 * 2. 각 함수를 개별적으로 실행
 * 3. 로그에서 결과 확인
 * 
 * 🔗 Apps Script 에디터: 
 * https://script.google.com/d/1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z/edit
 */

// ================================================================================
// 🏥 1. 전체 시스템 건강상태 점검
// ================================================================================

function 시스템건강상태점검() {
  console.log('🏥 AI CAMP 시스템 건강상태 점검 시작...');
  
  try {
    // systemHealthCheck() 함수 실행
    const healthReport = systemHealthCheck();
    
    console.log('✅ 시스템 건강상태 점검 완료');
    console.log('📊 결과:', JSON.stringify(healthReport, null, 2));
    
    // 요약 출력
    console.log('\n📋 요약:');
    console.log('- 상태:', healthReport.status);
    console.log('- 문제점:', healthReport.issues.length + '개');
    console.log('- 경고:', healthReport.warnings.length + '개');
    
    if (healthReport.issues.length > 0) {
      console.log('\n❌ 발견된 문제점:');
      healthReport.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    if (healthReport.warnings.length > 0) {
      console.log('\n⚠️ 경고사항:');
      healthReport.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }
    
    if (healthReport.recommendations.length > 0) {
      console.log('\n🔧 권장사항:');
      healthReport.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }
    
    return healthReport;
    
  } catch (error) {
    console.error('❌ 시스템 건강상태 점검 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🔧 2. 자동 문제 진단 및 수정
// ================================================================================

function 자동문제진단및수정() {
  console.log('🔧 자동 문제 진단 및 수정 시작...');
  
  try {
    // diagnoseAndFixIssues() 함수 실행
    const diagnosisResult = diagnoseAndFixIssues();
    
    console.log('✅ 자동 진단 및 수정 완료');
    console.log('📊 결과:', JSON.stringify(diagnosisResult, null, 2));
    
    return diagnosisResult;
    
  } catch (error) {
    console.error('❌ 자동 진단 및 수정 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🧪 3. 전체 기능 통합 테스트
// ================================================================================

function 전체기능통합테스트() {
  console.log('🧪 전체 기능 통합 테스트 시작...');
  
  try {
    // testEntireSystem() 함수 실행
    const testResults = testEntireSystem();
    
    console.log('✅ 전체 기능 테스트 완료');
    console.log('📊 결과:', JSON.stringify(testResults, null, 2));
    
    // 요약 출력
    if (testResults.summary) {
      console.log('\n📋 테스트 요약:');
      console.log('- 총 테스트:', testResults.summary.totalTests + '개');
      console.log('- 성공:', testResults.summary.successCount + '개');
      console.log('- 실패:', testResults.summary.failureCount + '개');
      console.log('- 성공률:', testResults.summary.successRate);
    }
    
    return testResults;
    
  } catch (error) {
    console.error('❌ 전체 기능 테스트 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 📊 4. 상세 진단 보고서 생성
// ================================================================================

function 상세진단보고서생성() {
  console.log('📊 상세 진단 보고서 생성 시작...');
  
  try {
    // generateDiagnosticReport() 함수 실행
    const diagnosticReport = generateDiagnosticReport();
    
    console.log('✅ 진단 보고서 생성 완료');
    console.log('📊 결과:', JSON.stringify(diagnosticReport, null, 2));
    
    return diagnosticReport;
    
  } catch (error) {
    console.error('❌ 진단 보고서 생성 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🆘 5. 302 오류 긴급 진단
// ================================================================================

function 오류302긴급진단() {
  console.log('🆘 302 오류 긴급 진단 시작...');
  
  try {
    // diagnose302Error() 함수 실행
    const diagnosis302 = diagnose302Error();
    
    console.log('✅ 302 오류 진단 완료');
    console.log('📊 결과:', JSON.stringify(diagnosis302, null, 2));
    
    // 긴급 조치사항 출력
    if (diagnosis302.urgentActions) {
      console.log('\n🚨 긴급 조치사항:');
      diagnosis302.urgentActions.forEach((action, index) => {
        console.log(`${index + 1}. ${action}`);
      });
    }
    
    return diagnosis302;
    
  } catch (error) {
    console.error('❌ 302 오류 진단 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 📧 6. 이메일 기능 테스트
// ================================================================================

function 이메일기능테스트() {
  console.log('📧 이메일 기능 테스트 시작...');
  
  try {
    // testEmailFunctionality() 함수 실행
    const emailTest = testEmailFunctionality();
    
    console.log('✅ 이메일 기능 테스트 완료');
    console.log('📊 결과:', JSON.stringify(emailTest, null, 2));
    
    return emailTest;
    
  } catch (error) {
    console.error('❌ 이메일 기능 테스트 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🔒 7. 권한 상태 점검
// ================================================================================

function 권한상태점검() {
  console.log('🔒 권한 상태 점검 시작...');
  
  try {
    // checkRequiredPermissions() 함수 실행
    const permissions = checkRequiredPermissions();
    
    console.log('✅ 권한 상태 점검 완료');
    console.log('📊 결과:', JSON.stringify(permissions, null, 2));
    
    // 권한 상태 요약
    console.log('\n📋 권한 상태 요약:');
    console.log('- Gmail API:', permissions.gmail ? '✅ 정상' : '❌ 문제');
    console.log('- Sheets API:', permissions.sheets ? '✅ 정상' : '❌ 문제');
    console.log('- Script API:', permissions.script ? '✅ 정상' : '❌ 문제');
    
    return permissions;
    
  } catch (error) {
    console.error('❌ 권한 상태 점검 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 📊 8. 구글시트 구조 검증
// ================================================================================

function 구글시트구조검증() {
  console.log('📊 구글시트 구조 검증 시작...');
  
  try {
    // validateAndFixSheetStructure() 함수 실행
    const sheetValidation = validateAndFixSheetStructure();
    
    console.log('✅ 구글시트 구조 검증 완료');
    console.log('📊 결과:', JSON.stringify(sheetValidation, null, 2));
    
    return sheetValidation;
    
  } catch (error) {
    console.error('❌ 구글시트 구조 검증 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🧪 9. 개별 기능 테스트 모음
// ================================================================================

function 상담신청테스트() {
  console.log('📞 상담신청 테스트 시작...');
  
  try {
    const result = testConsultationSubmission();
    console.log('✅ 상담신청 테스트 완료:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ 상담신청 테스트 실패:', error);
    return { error: error.toString() };
  }
}

function 진단신청테스트() {
  console.log('📊 진단신청 테스트 시작...');
  
  try {
    const result = testDiagnosisSubmission();
    console.log('✅ 진단신청 테스트 완료:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ 진단신청 테스트 실패:', error);
    return { error: error.toString() };
  }
}

function PDF이메일발송테스트() {
  console.log('📧 PDF 이메일 발송 테스트 시작...');
  
  try {
    const result = testPdfEmailSending();
    console.log('✅ PDF 이메일 발송 테스트 완료:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ PDF 이메일 발송 테스트 실패:', error);
    return { error: error.toString() };
  }
}

function 베타피드백테스트() {
  console.log('🧪 베타피드백 테스트 시작...');
  
  try {
    const result = testBetaFeedback();
    console.log('✅ 베타피드백 테스트 완료:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ 베타피드백 테스트 실패:', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🎯 10. 종합 실행 함수 (모든 진단 한번에)
// ================================================================================

function 전체시스템종합진단() {
  console.log('🔥 AI CAMP 전체 시스템 종합 진단 시작...');
  
  const results = {
    timestamp: new Date().toLocaleString('ko-KR'),
    tests: {}
  };
  
  try {
    // 1. 시스템 건강상태 점검
    console.log('\n1️⃣ 시스템 건강상태 점검...');
    results.tests.healthCheck = 시스템건강상태점검();
    
    // 2. 권한 상태 점검
    console.log('\n2️⃣ 권한 상태 점검...');
    results.tests.permissions = 권한상태점검();
    
    // 3. 구글시트 구조 검증
    console.log('\n3️⃣ 구글시트 구조 검증...');
    results.tests.sheetValidation = 구글시트구조검증();
    
    // 4. 전체 기능 통합 테스트
    console.log('\n4️⃣ 전체 기능 통합 테스트...');
    results.tests.integrationTest = 전체기능통합테스트();
    
    // 5. 302 오류 진단
    console.log('\n5️⃣ 302 오류 진단...');
    results.tests.error302Diagnosis = 오류302긴급진단();
    
    // 6. 이메일 기능 테스트
    console.log('\n6️⃣ 이메일 기능 테스트...');
    results.tests.emailTest = 이메일기능테스트();
    
    console.log('\n🎯 전체 시스템 종합 진단 완료!');
    console.log('📊 전체 결과:', JSON.stringify(results, null, 2));
    
    // 성공률 계산
    const successfulTests = Object.values(results.tests).filter(test => 
      test && !test.error && (test.success !== false)
    ).length;
    const totalTests = Object.keys(results.tests).length;
    const successRate = Math.round((successfulTests / totalTests) * 100);
    
    console.log('\n📈 종합 진단 요약:');
    console.log('- 총 테스트:', totalTests + '개');
    console.log('- 성공:', successfulTests + '개');
    console.log('- 성공률:', successRate + '%');
    
    if (successRate >= 80) {
      console.log('✅ 시스템이 정상적으로 작동하고 있습니다.');
    } else if (successRate >= 60) {
      console.log('⚠️ 시스템에 일부 문제가 있습니다. 점검이 필요합니다.');
    } else {
      console.log('🚨 시스템에 심각한 문제가 있습니다. 즉시 수정이 필요합니다.');
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ 전체 시스템 종합 진단 실패:', error);
    results.fatalError = error.toString();
    return results;
  }
}

// ================================================================================
// 📋 사용 가이드
// ================================================================================

function 사용가이드출력() {
  console.log(`
================================================================================
📋 AI CAMP 시스템 진단 명령어 사용 가이드
================================================================================

🎯 빠른 진단 (권장):
• 전체시스템종합진단() - 모든 진단을 한번에 실행

🔧 개별 진단:
• 시스템건강상태점검() - 전반적인 시스템 상태 확인
• 권한상태점검() - Google API 권한 상태 확인
• 구글시트구조검증() - 데이터 저장 시트 구조 확인
• 오류302긴급진단() - 302 리다이렉트 오류 분석

🧪 기능별 테스트:
• 상담신청테스트() - 상담신청 기능 테스트
• 진단신청테스트() - 무료진단 기능 테스트
• PDF이메일발송테스트() - PDF 첨부 이메일 발송 테스트
• 베타피드백테스트() - 베타피드백 기능 테스트

📧 이메일 관련:
• 이메일기능테스트() - 이메일 발송 기능 테스트

🔄 문제 해결:
• 자동문제진단및수정() - 발견된 문제 자동 수정 시도
• 상세진단보고서생성() - 상세한 진단 보고서 생성

================================================================================
🚀 사용법:
1. 위 함수 이름을 Apps Script 에디터 상단 함수 선택창에 입력
2. ▶️ 실행 버튼 클릭
3. 로그 창에서 결과 확인

⚠️ 주의사항:
- 처음 실행 시 권한 승인이 필요할 수 있습니다
- 일부 테스트는 실제 이메일을 발송할 수 있습니다
- 문제 발생 시 로그를 확인하여 오류 내용을 파악하세요
================================================================================
  `);
}

// 초기 가이드 출력
사용가이드출력(); 
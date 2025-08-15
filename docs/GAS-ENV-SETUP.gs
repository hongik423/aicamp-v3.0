/**
 * ================================================================================
 * 🎓 이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE
 * Google Apps Script 환경변수 자동 설정 스크립트
 * ================================================================================
 */

/**
 * 환경변수 자동 설정 함수
 * GAS 에디터에서 이 함수를 실행하면 모든 환경변수가 자동으로 설정됩니다.
 */
function setupEnvironmentVariables() {
  console.log('🎓 이교장의AI역량진단보고서 환경변수 설정 시작...');
  
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // 설정할 환경변수 목록
  const envVars = {
    'SPREADSHEET_ID': '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
    'GEMINI_API_KEY': 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    'ADMIN_EMAIL': 'hongik423@gmail.com',
    'AICAMP_WEBSITE': 'aicamp.club',
    'DRIVE_FOLDER_ID': '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
    'DEBUG_MODE': 'false',
    'ENVIRONMENT': 'production'
  };
  
  try {
    // 모든 환경변수를 한 번에 설정
    scriptProperties.setProperties(envVars);
    
    console.log('✅ 환경변수 설정 완료!');
    console.log('📋 설정된 환경변수:');
    
    // 설정 확인
    Object.keys(envVars).forEach(key => {
      const value = scriptProperties.getProperty(key);
      if (key === 'GEMINI_API_KEY') {
        console.log(`  ✅ ${key}: ${value ? '설정됨 (***...)' : '❌ 설정 실패'}`);
      } else {
        console.log(`  ✅ ${key}: ${value || '❌ 설정 실패'}`);
      }
    });
    
    console.log('');
    console.log('🎯 다음 단계:');
    console.log('1. Code.gs 파일을 GAS 에디터에 복사하여 붙여넣기');
    console.log('2. 배포 → 새 배포 → 유형: 웹 앱');
    console.log('3. 실행 권한: 나 → 액세스 권한: 모든 사용자');
    console.log('4. 배포 후 웹 앱 URL을 Next.js 환경변수에 설정');
    
    return {
      success: true,
      message: '이교장의AI역량진단보고서 환경변수 설정 완료',
      envVarsSet: Object.keys(envVars).length
    };
    
  } catch (error) {
    console.error('❌ 환경변수 설정 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 환경변수 확인 함수
 * 설정된 환경변수들을 확인합니다.
 */
function checkEnvironmentVariables() {
  console.log('🔍 환경변수 확인 중...');
  
  const scriptProperties = PropertiesService.getScriptProperties();
  const requiredVars = [
    'SPREADSHEET_ID',
    'GEMINI_API_KEY', 
    'ADMIN_EMAIL',
    'DRIVE_FOLDER_ID',
    'AICAMP_WEBSITE',
    'DEBUG_MODE',
    'ENVIRONMENT'
  ];
  
  console.log('📋 환경변수 상태:');
  let allSet = true;
  
  requiredVars.forEach(varName => {
    const value = scriptProperties.getProperty(varName);
    if (value) {
      if (varName === 'GEMINI_API_KEY') {
        console.log(`  ✅ ${varName}: 설정됨 (${value.substring(0, 10)}...)`);
      } else {
        console.log(`  ✅ ${varName}: ${value}`);
      }
    } else {
      console.log(`  ❌ ${varName}: 설정되지 않음`);
      allSet = false;
    }
  });
  
  if (allSet) {
    console.log('🎉 모든 환경변수가 올바르게 설정되었습니다!');
    console.log('🚀 이교장의AI역량진단보고서 시스템 준비 완료!');
  } else {
    console.log('⚠️ 일부 환경변수가 설정되지 않았습니다. setupEnvironmentVariables() 함수를 실행하세요.');
  }
  
  return {
    allSet: allSet,
    setCount: requiredVars.filter(v => scriptProperties.getProperty(v)).length,
    totalCount: requiredVars.length
  };
}

/**
 * 시스템 상태 확인 함수
 * 전체 시스템의 준비 상태를 확인합니다.
 */
function checkSystemStatus() {
  console.log('🎓 이교장의AI역량진단보고서 시스템 상태 확인');
  
  try {
    // 환경변수 확인
    const config = getEnvironmentConfig();
    console.log('✅ 환경변수 로드 성공');
    
    // Google Sheets 접근 확인
    const spreadsheet = SpreadsheetApp.openById(config.SPREADSHEET_ID);
    console.log('✅ Google Sheets 접근 성공:', spreadsheet.getName());
    
    // Google Drive 접근 확인
    const folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
    console.log('✅ Google Drive 폴더 접근 성공:', folder.getName());
    
    // 이메일 할당량 확인
    const emailQuota = MailApp.getRemainingDailyQuota();
    console.log('✅ Gmail 할당량:', emailQuota, '개 남음');
    
    console.log('🎉 시스템 상태: 모든 구성요소가 정상 작동 중');
    console.log('🚀 이교장의AI역량진단보고서 서비스 준비 완료!');
    
    return {
      status: 'healthy',
      version: config.VERSION,
      components: {
        environment: true,
        sheets: true,
        drive: true,
        email: emailQuota > 0
      },
      emailQuota: emailQuota
    };
    
  } catch (error) {
    console.error('❌ 시스템 상태 확인 실패:', error);
    return {
      status: 'error',
      error: error.toString()
    };
  }
}

/**
 * 테스트 이메일 발송 함수
 * 시스템이 정상 작동하는지 테스트 이메일을 발송합니다.
 */
function sendTestEmail() {
  console.log('📧 테스트 이메일 발송 중...');
  
  try {
    const config = getEnvironmentConfig();
    
    const testEmail = {
      to: config.ADMIN_EMAIL,
      subject: '[테스트] 이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE',
      htmlBody: `
        <div style="font-family: 'Malgun Gothic', Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2a6496;">🎓 이교장의AI역량진단보고서</h2>
          <h3 style="color: #333;">시스템 테스트 이메일</h3>
          <p>이 이메일은 시스템이 정상 작동하는지 확인하기 위한 테스트 이메일입니다.</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4>시스템 정보</h4>
            <ul>
              <li><strong>버전:</strong> ${config.VERSION}</li>
              <li><strong>모델:</strong> ${config.MODEL}</li>
              <li><strong>환경:</strong> ${config.ENVIRONMENT}</li>
              <li><strong>웹사이트:</strong> ${config.AICAMP_WEBSITE}</li>
              <li><strong>테스트 시간:</strong> ${new Date().toLocaleString('ko-KR')}</li>
            </ul>
          </div>
          
          <p style="color: #28a745;"><strong>✅ 시스템이 정상적으로 작동하고 있습니다!</strong></p>
          
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE<br>
            Google Apps Script 자동 테스트
          </p>
        </div>
      `
    };
    
    MailApp.sendEmail(testEmail);
    console.log('✅ 테스트 이메일 발송 완료:', config.ADMIN_EMAIL);
    
    return {
      success: true,
      message: '테스트 이메일이 성공적으로 발송되었습니다.',
      recipient: config.ADMIN_EMAIL
    };
    
  } catch (error) {
    console.error('❌ 테스트 이메일 발송 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ================================================================================
// 실행 가이드
// ================================================================================

/**
 * 🎯 실행 순서:
 * 
 * 1. setupEnvironmentVariables() - 환경변수 자동 설정
 * 2. checkEnvironmentVariables() - 환경변수 확인
 * 3. checkSystemStatus() - 시스템 상태 확인
 * 4. sendTestEmail() - 테스트 이메일 발송
 * 
 * 모든 함수가 성공적으로 실행되면 시스템 준비 완료!
 */

console.log('🎓 이교장의AI역량진단보고서 GAS 환경변수 설정 스크립트 로드 완료');
console.log('📋 사용 가능한 함수:');
console.log('  - setupEnvironmentVariables(): 환경변수 자동 설정');
console.log('  - checkEnvironmentVariables(): 환경변수 확인');
console.log('  - checkSystemStatus(): 시스템 상태 확인');
console.log('  - sendTestEmail(): 테스트 이메일 발송');
console.log('');
console.log('🚀 시작하려면 setupEnvironmentVariables() 함수를 실행하세요!');

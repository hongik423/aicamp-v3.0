/**
 * ================================================================================
 * AICAMP 간단 테스트용 Google Apps Script
 * ================================================================================
 * 
 * 🎯 용도: Google Apps Script 연결 및 기본 기능 테스트
 * 📅 생성일: 2025.01.28
 * 🔧 기능: 기본적인 POST/GET 요청 처리 및 JSON 응답
 * 
 * 📋 배포 방법:
 * 1. https://script.google.com 접속
 * 2. 새 프로젝트 생성
 * 3. 이 코드를 Code.gs에 복사
 * 4. 저장 후 "배포" → "웹 앱으로 배포"
 * 5. 액세스 권한: "모든 사용자"
 * 6. 새 배포 생성
 */

// 기본 설정
const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const ADMIN_EMAIL = 'hongik423@gmail.com';
const VERSION = '2025.01.28_SIMPLE_TEST';

/**
 * 한국 시간 가져오기
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const kstOffset = 9 * 60; // KST is UTC+9
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kst = new Date(utc + (kstOffset * 60000));
  
  return kst.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  try {
    console.log('📨 GET 요청 수신');
    
    const response = {
      success: true,
      message: 'AICAMP Google Apps Script 연결 성공!',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      method: 'GET',
      parameters: e.parameter || {}
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      method: 'GET'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST 요청 처리
 */
function doPost(e) {
  try {
    console.log('📨 POST 요청 수신');
    
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.warn('⚠️ JSON 파싱 실패, 원본 데이터 사용:', parseError);
        data = { raw: e.postData.contents };
      }
    }
    
    // 간단한 응답 반환
    const response = {
      success: true,
      message: 'AICAMP POST 요청 처리 완료!',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      method: 'POST',
      receivedData: data,
      dataSize: JSON.stringify(data).length
    };
    
    console.log('✅ POST 응답 생성:', response);
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      method: 'POST'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  try {
    console.log('🔄 OPTIONS 요청 수신 (CORS)');
    
    const response = {
      success: true,
      message: 'CORS OPTIONS 요청 처리 완료',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      method: 'OPTIONS'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ OPTIONS 요청 처리 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      method: 'OPTIONS'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 시스템 상태 테스트 함수
 */
function testSystemStatus() {
  try {
    console.log('🧪 시스템 상태 테스트 시작');
    
    const testResult = {
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      spreadsheetId: SPREADSHEET_ID,
      adminEmail: ADMIN_EMAIL,
      functionsAvailable: {
        doGet: typeof doGet === 'function',
        doPost: typeof doPost === 'function',
        doOptions: typeof doOptions === 'function',
        getCurrentKoreanTime: typeof getCurrentKoreanTime === 'function'
      },
      systemStatus: 'READY'
    };
    
    console.log('✅ 시스템 상태 테스트 완료:', testResult);
    
    return testResult;
    
  } catch (error) {
    console.error('❌ 시스테 상태 테스트 오류:', error);
    return {
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      systemStatus: 'ERROR'
    };
  }
}

/**
 * 간단한 구글시트 연결 테스트
 */
function testGoogleSheetsConnection() {
  try {
    console.log('📊 구글시트 연결 테스트 시작');
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetNames = spreadsheet.getSheets().map(sheet => sheet.getName());
    
    const result = {
      success: true,
      timestamp: getCurrentKoreanTime(),
      spreadsheetId: SPREADSHEET_ID,
      spreadsheetName: spreadsheet.getName(),
      sheetsCount: sheetNames.length,
      sheetNames: sheetNames,
      message: '구글시트 연결 성공!'
    };
    
    console.log('✅ 구글시트 연결 테스트 완료:', result);
    
    return result;
    
  } catch (error) {
    console.error('❌ 구글시트 연결 테스트 오류:', error);
    
    return {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      spreadsheetId: SPREADSHEET_ID,
      message: '구글시트 연결 실패'
    };
  }
}

/**
 * 이메일 발송 테스트
 */
function testEmailSending() {
  try {
    console.log('📧 이메일 발송 테스트 시작');
    
    const subject = '[AICAMP] 테스트 이메일 - ' + getCurrentKoreanTime();
    const body = `
안녕하세요!

AICAMP Google Apps Script 이메일 발송 테스트입니다.

🕐 테스트 시간: ${getCurrentKoreanTime()}
🔧 버전: ${VERSION}
📊 스프레드시트 ID: ${SPREADSHEET_ID}

이 이메일을 받으셨다면 시스템이 정상적으로 작동하고 있습니다.

감사합니다.
AICAMP AI교육센터
    `;
    
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });
    
    const result = {
      success: true,
      timestamp: getCurrentKoreanTime(),
      recipient: ADMIN_EMAIL,
      subject: subject,
      message: '이메일 발송 성공!'
    };
    
    console.log('✅ 이메일 발송 테스트 완료:', result);
    
    return result;
    
  } catch (error) {
    console.error('❌ 이메일 발송 테스트 오류:', error);
    
    return {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      recipient: ADMIN_EMAIL,
      message: '이메일 발송 실패'
    };
  }
}

/**
 * 전체 시스템 테스트
 */
function testEntireSystem() {
  try {
    console.log('🚀 전체 시스템 테스트 시작');
    
    const results = {
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      tests: {}
    };
    
    // 1. 시스템 상태 테스트
    console.log('1️⃣ 시스템 상태 테스트...');
    results.tests.systemStatus = testSystemStatus();
    
    // 2. 구글시트 연결 테스트
    console.log('2️⃣ 구글시트 연결 테스트...');
    results.tests.googleSheets = testGoogleSheetsConnection();
    
    // 3. 이메일 발송 테스트
    console.log('3️⃣ 이메일 발송 테스트...');
    results.tests.emailSending = testEmailSending();
    
    // 전체 결과 분석
    const allTestsPassed = Object.values(results.tests).every(test => 
      test.success !== false && !test.error
    );
    
    results.summary = {
      allTestsPassed: allTestsPassed,
      totalTests: Object.keys(results.tests).length,
      passedTests: Object.values(results.tests).filter(test => 
        test.success !== false && !test.error
      ).length,
      message: allTestsPassed ? '모든 테스트 통과!' : '일부 테스트 실패'
    };
    
    console.log('🎉 전체 시스템 테스트 완료:', results.summary);
    
    return results;
    
  } catch (error) {
    console.error('❌ 전체 시스템 테스트 오류:', error);
    
    return {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      message: '전체 시스템 테스트 실행 중 오류 발생'
    };
  }
} 
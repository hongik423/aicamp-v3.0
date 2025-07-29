/**
 * ================================================================================
 * AICAMP 간단 버전 Google Apps Script - 테스트 및 검증용
 * ================================================================================
 * 
 * 🎯 용도: 시스템 테스트 및 검증용 간단한 Google Apps Script
 * 📅 생성일: 2025.01.28
 * 🔧 기능: 기본적인 POST/GET 요청 처리 및 JSON 응답
 */

// 기본 설정
const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const ADMIN_EMAIL = 'hongik423@gmail.com';
const VERSION = '1.0.0_SIMPLE_TEST';

/**
 * POST 요청 처리
 */
function doPost(e) {
  try {
    console.log('📨 POST 요청 수신');
    
    const data = JSON.parse(e.postData.contents);
    
    // 간단한 응답 반환
    const response = {
      success: true,
      message: 'POST 요청 처리 완료',
      timestamp: new Date().toISOString(),
      version: VERSION,
      receivedData: data
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      version: VERSION
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  try {
    console.log('📡 GET 요청 수신');
    
    const response = {
      success: true,
      message: 'AICAMP Google Apps Script 정상 작동 중',
      timestamp: new Date().toISOString(),
      version: VERSION,
      status: 'active',
      endpoints: {
        post: 'Available',
        get: 'Available'
      },
      spreadsheetId: SPREADSHEET_ID,
      adminEmail: ADMIN_EMAIL
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      version: VERSION
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 테스트 진단 처리 함수
 */
function testDiagnosisSubmission() {
  try {
    console.log('🧪 테스트 진단 실행');
    
    const testData = {
      companyName: '테스트기업',
      applicantName: '테스트담당자',
      email: 'test@example.com',
      industry: 'IT',
      employees: '10-50명',
      score: 85
    };
    
    const response = {
      success: true,
      message: '테스트 진단 처리 완료',
      timestamp: new Date().toISOString(),
      version: VERSION,
      testResult: testData
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 테스트 진단 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      version: VERSION
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 테스트 상담 처리 함수
 */
function testConsultationSubmission() {
  try {
    console.log('💬 테스트 상담 실행');
    
    const testData = {
      name: '테스트상담자',
      company: '테스트상담기업',
      email: 'consultation@example.com',
      consultationType: 'business-analysis',
      message: '테스트 상담 요청입니다.'
    };
    
    const response = {
      success: true,
      message: '테스트 상담 처리 완료',
      timestamp: new Date().toISOString(),
      version: VERSION,
      testResult: testData
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 테스트 상담 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      version: VERSION
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 테스트 베타피드백 처리 함수
 */
function testBetaFeedback() {
  try {
    console.log('🧪 테스트 베타피드백 실행');
    
    const testData = {
      email: 'beta@example.com',
      feedback: '테스트 베타피드백입니다.',
      rating: 5,
      category: 'ui-improvement'
    };
    
    const response = {
      success: true,
      message: '테스트 베타피드백 처리 완료',
      timestamp: new Date().toISOString(),
      version: VERSION,
      testResult: testData
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 테스트 베타피드백 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      version: VERSION
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
} 
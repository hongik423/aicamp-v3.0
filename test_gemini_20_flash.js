/**
 * GEMINI 2.5 Flash 모델 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testQuickDiagnosis() {
  console.log('🚀 GEMINI 2.5 Flash 빠른 테스트 시작...\n');
  
  try {
    console.log('⏳ 빠른 진단 테스트 실행 중...');
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      testType: 'quickDiagnosisTest'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 420000, // 7분 타임아웃 (GEMINI 2.5 Flash 대응)
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    });
    
    console.log('\n📥 테스트 결과:');
    console.log('- 상태 코드:', response.status);
    
    if (response.data) {
      console.log('- 성공 여부:', response.data.success ? '✅ 성공' : '❌ 실패');
      console.log('- 메시지:', response.data.message);
      
      if (response.data.data) {
        console.log('- 상세 데이터:', JSON.stringify(response.data.data, null, 2));
      }
    }
    
  } catch (error) {
    console.error('\n❌ 테스트 오류:');
    console.error('- 오류 유형:', error.code);
    console.error('- 오류 메시지:', error.message);
    
    if (error.response) {
      console.error('- 응답 상태:', error.response.status);
      console.error('- 응답 데이터:', error.response.data);
    }
  }
}

async function testGeminiConnection() {
  console.log('🔌 GEMINI API 연결 테스트...\n');
  
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      testType: 'checkGeminiAPIConnection'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 60000,
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    });
    
    console.log('📥 GEMINI API 테스트 결과:');
    console.log('- 상태 코드:', response.status);
    console.log('- 응답:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('❌ GEMINI API 테스트 실패:', error.message);
  }
}

// 메인 실행
async function main() {
  console.log('🚀 GEMINI 2.5 Flash 모델 테스트');
  console.log('📅 시작 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🔗 대상 URL:', GOOGLE_SCRIPT_URL);
  console.log('=' .repeat(60) + '\n');
  
  // 1. GEMINI API 연결 테스트
  await testGeminiConnection();
  
  console.log('\n' + '=' .repeat(60) + '\n');
  
  // 2. 빠른 진단 테스트
  await testQuickDiagnosis();
  
  console.log('\n🏁 테스트 완료');
}

main().catch(console.error);
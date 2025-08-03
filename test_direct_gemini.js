/**
 * 직접 GEMINI 2.5 Flash 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testDirectGemini() {
  console.log('🚀 직접 GEMINI 2.5 Flash 테스트 시작...\n');
  
  const testData = {
    action: 'internalTest',
    functionName: 'checkGeminiAPIConnection'
  };
  
  console.log('📤 전송 데이터:', JSON.stringify(testData, null, 2));
  
  try {
    console.log('⏳ 테스트 실행 중... (최대 7분 대기)');
    
    const response = await axios({
      method: 'POST',
      url: GOOGLE_SCRIPT_URL,
      data: testData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 420000, // 7분
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      }
    });
    
    console.log('\n📥 응답 받음:');
    console.log('- HTTP 상태:', response.status);
    console.log('- 응답 헤더:', response.headers['content-type']);
    console.log('- 응답 데이터:', JSON.stringify(response.data, null, 2));
    
    if (response.data) {
      if (response.data.success) {
        console.log('\n✅ GEMINI 2.5 Flash 테스트 성공!');
        if (response.data.data) {
          console.log('- 추가 정보:', response.data.data);
        }
      } else {
        console.log('\n❌ 테스트 실패');
        console.log('- 오류:', response.data.error || response.data.message);
      }
    }
    
  } catch (error) {
    console.error('\n❌ 요청 오류:');
    console.error('- 오류 타입:', error.code || 'UNKNOWN');
    console.error('- 오류 메시지:', error.message);
    
    if (error.response) {
      console.error('- 응답 상태:', error.response.status);
      console.error('- 응답 데이터:', error.response.data);
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ 타임아웃 발생 - GEMINI 2.5 Flash 처리에 7분 이상 소요됨');
    }
  }
  
  console.log('\n🏁 테스트 완료');
}

testDirectGemini().catch(console.error);
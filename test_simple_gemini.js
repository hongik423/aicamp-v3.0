/**
 * 간단한 GEMINI 2.5 Flash 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testSimpleGemini() {
  console.log('🚀 간단한 GEMINI 2.5 Flash 테스트 시작...\n');
  
  try {
    console.log('⏳ 빠른 진단 테스트 실행 중...');
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      testType: 'quickDiagnosisTest'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 420000, // 7분 타임아웃
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    });
    
    console.log('\n📥 테스트 결과:');
    console.log('- 상태 코드:', response.status);
    console.log('- 응답:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.success) {
      console.log('\n✅ GEMINI 2.5 Flash 테스트 성공!');
    } else {
      console.log('\n❌ 테스트 실패');
    }
    
  } catch (error) {
    console.error('\n❌ 테스트 오류:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ 타임아웃 발생 - GEMINI 2.5 Flash 처리 시간이 예상보다 길 수 있습니다.');
    }
  }
  
  console.log('\n🏁 테스트 완료');
}

testSimpleGemini().catch(console.error);
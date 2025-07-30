/**
 * 🧪 GEMINI AI 기능 완벽 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testGeminiFunctions() {
  console.log('🧪 GEMINI AI 기능 완벽 테스트 시작');
  console.log('=' * 60);
  
  const results = {
    geminiConnection: null,
    geminiReport: null,
    enhancedEmail: null,
    completeSystem: null
  };
  
  // 1. GEMINI API 연결 테스트
  console.log('\n1️⃣ GEMINI API 연결 테스트...');
  try {
    const response1 = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      functionName: 'checkGeminiAPIConnection'
    }, { 
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });
    
    results.geminiConnection = response1.data;
    console.log('✅ GEMINI API 연결 테스트 성공:', {
      success: response1.data.success,
      connected: response1.data.connected,
      message: response1.data.message
    });
  } catch (error) {
    console.error('❌ GEMINI API 연결 테스트 실패:', error.response?.data || error.message);
    results.geminiConnection = { success: false, error: error.message };
  }
  
  // 2. GEMINI AI 보고서 생성 테스트
  console.log('\n2️⃣ GEMINI AI 보고서 생성 테스트...');
  try {
    const response2 = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      functionName: 'testGeminiAIReport'
    }, { 
      timeout: 60000,
      headers: { 'Content-Type': 'application/json' }
    });
    
    results.geminiReport = response2.data;
    console.log('✅ GEMINI AI 보고서 생성 테스트 성공:', {
      success: response2.data.success,
      reportLength: response2.data.reportLength,
      message: response2.data.message
    });
  } catch (error) {
    console.error('❌ GEMINI AI 보고서 생성 테스트 실패:', error.response?.data || error.message);
    results.geminiReport = { success: false, error: error.message };
  }
  
  // 3. 개선된 이메일 시스템 테스트
  console.log('\n3️⃣ 개선된 이메일 시스템 테스트...');
  try {
    const response3 = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      functionName: 'testEnhancedConsultationEmail'
    }, { 
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });
    
    results.enhancedEmail = response3.data;
    console.log('✅ 개선된 이메일 시스템 테스트 성공:', {
      success: response3.data.success,
      message: response3.data.message
    });
  } catch (error) {
    console.error('❌ 개선된 이메일 시스템 테스트 실패:', error.response?.data || error.message);
    results.enhancedEmail = { success: false, error: error.message };
  }
  
  // 4. 전체 시스템 통합 테스트
  console.log('\n4️⃣ 전체 시스템 통합 테스트...');
  try {
    const response4 = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      functionName: 'testCompleteAICampSystem'
    }, { 
      timeout: 60000,
      headers: { 'Content-Type': 'application/json' }
    });
    
    results.completeSystem = response4.data;
    console.log('✅ 전체 시스템 통합 테스트 성공:', {
      success: response4.data.success,
      overallSuccess: response4.data.overallSuccess,
      message: response4.data.message
    });
  } catch (error) {
    console.error('❌ 전체 시스템 통합 테스트 실패:', error.response?.data || error.message);
    results.completeSystem = { success: false, error: error.message };
  }
  
  // 5. 종합 결과 분석
  console.log('\n' + '=' * 60);
  console.log('🎯 GEMINI AI 기능 테스트 종합 결과');
  console.log('=' * 60);
  
  const testResults = [
    { name: 'GEMINI API 연결', result: results.geminiConnection },
    { name: 'GEMINI AI 보고서 생성', result: results.geminiReport },
    { name: '개선된 이메일 시스템', result: results.enhancedEmail },
    { name: '전체 시스템 통합', result: results.completeSystem }
  ];
  
  let successCount = 0;
  testResults.forEach((test, index) => {
    const status = test.result?.success ? '✅ 성공' : '❌ 실패';
    const details = test.result?.success ? 
      (test.result.message || '정상 동작') : 
      (test.result?.error || '알 수 없는 오류');
    
    console.log(`${index + 1}. ${test.name}: ${status}`);
    console.log(`   - 세부사항: ${details}`);
    
    if (test.result?.success) successCount++;
  });
  
  console.log('\n📊 최종 결과:');
  console.log(`✅ 성공: ${successCount}/${testResults.length}`);
  console.log(`❌ 실패: ${testResults.length - successCount}/${testResults.length}`);
  console.log(`🎯 성공률: ${Math.round((successCount / testResults.length) * 100)}%`);
  
  if (successCount === testResults.length) {
    console.log('\n🎉 모든 GEMINI AI 기능이 정상적으로 작동합니다!');
    console.log('✅ 무오류 달성: GEMINI AI 통합 완료');
  } else {
    console.log('\n⚠️ 일부 기능에서 오류가 발생했습니다.');
    console.log('🔧 추가 수정이 필요합니다.');
  }
  
  return results;
}

// 실행
if (require.main === module) {
  testGeminiFunctions()
    .then(results => {
      console.log('\n🏁 GEMINI AI 기능 테스트 완료');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = { testGeminiFunctions }; 
/**
 * ================================================================================
 * Google Apps Script 내부 테스트 함수 호출 스크립트
 * ================================================================================
 * 
 * 🎯 목적: Google Apps Script에 정의된 테스트 함수들을 직접 호출하여 검증
 * 🔧 실행방법: node test-google-apps-script-internal.js
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

/**
 * Google Apps Script 내부 테스트 함수 호출
 */
async function callInternalTestFunction(functionName, testData) {
  console.log(`\n🧪 ${functionName} 내부 테스트 함수 호출...`);
  
  const requestData = {
    action: 'internalTest',
    functionName: functionName,
    testData: testData,
    timestamp: Date.now()
  };

  try {
    const response = await axios({
      method: 'POST',
      url: GOOGLE_SCRIPT_URL,
      data: requestData,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('📊 응답 상태:', response.status);
    console.log('📊 응답 데이터:', response.data);
    
    return response.data;

  } catch (error) {
    console.error('❌ 내부 테스트 함수 호출 오류:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 메인 테스트 실행
 */
async function runInternalTests() {
  console.log('🔬 Google Apps Script 내부 테스트 함수 검증 시작');
  console.log('================================================================================');
  
  // 1. 진단신청 내부 테스트
  console.log('\n[1/3] 🎯 진단신청 내부 테스트 함수 호출');
  const diagnosisResult = await callInternalTestFunction('testDiagnosisSubmission', {
    testType: 'diagnosis',
    includeUpgradeFeatures: true
  });
  
  // 2초 대기
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 2. 상담신청 내부 테스트  
  console.log('\n[2/3] 💬 상담신청 내부 테스트 함수 호출');
  const consultationResult = await callInternalTestFunction('testConsultationSubmission', {
    testType: 'consultation',
    includePrivacyFix: true
  });
  
  // 2초 대기
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 3. 베타피드백 내부 테스트
  console.log('\n[3/3] 🧪 베타피드백 내부 테스트 함수 호출');  
  const betaResult = await callInternalTestFunction('testBetaFeedback', {
    testType: 'betaFeedback',
    includeSystemUpgrade: true
  });

  // 결과 요약
  console.log('\n================================================================================');
  console.log('🏁 Google Apps Script 내부 테스트 완료');
  console.log('================================================================================');
  
  const results = [diagnosisResult, consultationResult, betaResult];
  const successCount = results.filter(r => r.success).length;
  
  console.log(`📊 전체 테스트: ${results.length}개`);
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${results.length - successCount}개`);
  console.log(`📈 성공률: ${Math.round((successCount / results.length) * 100)}%`);
  
  if (successCount === results.length) {
    console.log('\n🎉 모든 내부 테스트 함수가 정상 작동합니다!');
  } else {
    console.log('\n⚠️ 일부 내부 테스트 함수에서 문제가 발견되었습니다.');
  }

  return { total: results.length, success: successCount };
}

// 실행
if (require.main === module) {
  runInternalTests()
    .then(result => {
      console.log(`\n🏆 최종 결과: ${result.success}/${result.total}`);
      process.exit(result.success === result.total ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 내부 테스트 실행 중 오류:', error);
      process.exit(1);
    });
} 
const axios = require('axios');
require('dotenv').config();

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// 테스트 시나리오들
const testScenarios = {
  // 1. 기본 진단 테스트
  basicDiagnosis: {
    action: 'diagnosis',
    companyName: '테스트 기업',
    contactName: '홍길동',
    email: 'test@example.com',
    phone: '010-1234-5678',
    industry: 'IT/소프트웨어',
    employeeCount: '10-50명',
    assessmentResponses: [
      { questionId: 'leadership_1', value: 4 },
      { questionId: 'leadership_2', value: 3 },
      { questionId: 'leadership_3', value: 4 },
      { questionId: 'leadership_4', value: 3 },
      { questionId: 'infra_1', value: 2 },
      { questionId: 'infra_2', value: 3 },
      { questionId: 'infra_3', value: 2 },
      { questionId: 'infra_4', value: 3 },
      { questionId: 'talent_1', value: 3 },
      { questionId: 'talent_2', value: 2 },
      { questionId: 'talent_3', value: 3 },
      { questionId: 'talent_4', value: 2 },
      { questionId: 'culture_1', value: 4 },
      { questionId: 'culture_2', value: 3 },
      { questionId: 'culture_3', value: 3 },
      { questionId: 'culture_4', value: 3 },
      { questionId: 'app_1', value: 2 },
      { questionId: 'app_2', value: 2 },
      { questionId: 'app_3', value: 3 },
      { questionId: 'app_4', value: 2 },
      { questionId: 'data_1', value: 3 },
      { questionId: 'data_2', value: 2 },
      { questionId: 'data_3', value: 2 },
      { questionId: 'data_4', value: 3 }
    ],
    privacyConsent: true,
    marketingConsent: false
  },

  // 2. 상담신청 테스트
  consultation: {
    action: 'consultation',
    companyName: '상담 테스트 기업',
    contactName: '김상담',
    email: 'consultation@test.com',
    phone: '010-9999-8888',
    content: '테스트 상담신청입니다.'
  },

  // 3. 시스템 상태 확인
  healthCheck: {
    action: 'health'
  },

  // 4. 오류 테스트 (잘못된 데이터)
  errorTest: {
    action: 'diagnosis',
    companyName: '', // 빈 값으로 오류 유발
    email: 'invalid-email', // 잘못된 이메일
    assessmentResponses: [] // 빈 평가 응답
  }
};

// 테스트 실행 함수
async function runTest(testName, testData) {
  console.log(`\n🧪 ${testName} 테스트 시작`);
  console.log('━'.repeat(50));
  
  try {
    const startTime = Date.now();
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, testData, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`✅ ${testName} 성공 (${duration}ms)`);
    console.log('📥 응답 데이터:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return {
      success: true,
      testName,
      duration,
      response: response.data
    };
    
  } catch (error) {
    console.error(`❌ ${testName} 실패:`, error.message);
    
    if (error.response) {
      console.error('📥 오류 응답:', error.response.data);
    }
    
    return {
      success: false,
      testName,
      error: error.message,
      response: error.response?.data
    };
  }
}

// 모든 테스트 실행
async function runAllTests() {
  console.log('🚀 AICAMP AI 역량진단 시스템 테스트 시작');
  console.log(`🔗 Google Apps Script URL: ${GOOGLE_SCRIPT_URL}`);
  console.log('━'.repeat(70));
  
  const results = [];
  
  // 1. 시스템 상태 확인
  results.push(await runTest('시스템 상태 확인', testScenarios.healthCheck));
  
  // 2. 기본 진단 테스트
  results.push(await runTest('AI 역량진단', testScenarios.basicDiagnosis));
  
  // 3. 상담신청 테스트
  results.push(await runTest('상담신청', testScenarios.consultation));
  
  // 4. 오류 테스트
  results.push(await runTest('오류 처리 테스트', testScenarios.errorTest));
  
  // 결과 요약
  console.log('\n📊 테스트 결과 요약');
  console.log('━'.repeat(70));
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const duration = result.duration ? `(${result.duration}ms)` : '';
    console.log(`${status} ${result.testName} ${duration}`);
  });
  
  console.log(`\n📈 성공률: ${successCount}/${totalCount} (${Math.round(successCount/totalCount*100)}%)`);
  
  if (successCount === totalCount) {
    console.log('🎉 모든 테스트가 성공했습니다!');
  } else {
    console.log('⚠️ 일부 테스트가 실패했습니다. 로그를 확인해주세요.');
  }
}

// 개별 테스트 실행
async function runSingleTest(testName) {
  if (!testScenarios[testName]) {
    console.error(`❌ 존재하지 않는 테스트: ${testName}`);
    console.log('사용 가능한 테스트:', Object.keys(testScenarios).join(', '));
    return;
  }
  
  await runTest(testName, testScenarios[testName]);
}

// CLI 실행
if (require.main === module) {
  const testName = process.argv[2];
  
  if (testName) {
    runSingleTest(testName);
  } else {
    runAllTests();
  }
}

module.exports = {
  runTest,
  runAllTests,
  runSingleTest,
  testScenarios
};

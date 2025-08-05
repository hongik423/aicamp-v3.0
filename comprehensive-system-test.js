/**
 * AICAMP v3.0 종합 시스템 테스트
 * AI 역량진단 시스템 전체 플로우 검증
 */

const fs = require('fs');

// 테스트 설정
const TEST_CONFIG = {
  LOCAL_URL: 'http://localhost:3000',
  PROD_URL: 'https://aicamp-v3-0-1ps6x7ef8-hongik423-3087s-projects.vercel.app',
  GAS_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec'
};

// 테스트 데이터
const testData = {
  companyName: '테스트 기업',
  industry: 'it',
  companySize: '50-199',
  applicantName: '홍길동',
  position: '대표이사',
  email: 'test@example.com',
  phone: '010-1234-5678',
  assessmentResponses: {
    q1: '4', q2: '3', q3: '4', q4: '3',
    q5: '3', q6: '3', q7: '3', q8: '3',
    q9: '2', q10: '3', q11: '2', q12: '3',
    q13: '3', q14: '3', q15: '3', q16: '3',
    q17: '4', q18: '3', q19: '3', q20: '4',
    q21: '3', q22: '3', q23: '3', q24: '3'
  }
};

// HTTP 요청 함수
async function makeRequest(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 1. 로컬 서버 테스트
async function testLocalServer() {
  console.log('🏠 로컬 서버 테스트');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.LOCAL_URL}/api/test-system`);
    if (response.success) {
      console.log('✅ 로컬 서버 정상 작동');
      return true;
    } else {
      console.log('❌ 로컬 서버 오류:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ 로컬 서버 연결 실패:', error.message);
    return false;
  }
}

// 2. AI 역량진단 API 테스트
async function testAICapabilityDiagnosis() {
  console.log('🤖 AI 역량진단 API 테스트');
  
  const response = await makeRequest(
    `${TEST_CONFIG.LOCAL_URL}/api/ai-capability-diagnosis`,
    'POST',
    testData
  );
  
  if (response.success) {
    console.log('✅ AI 역량진단 성공:', response.data.diagnosisId);
    return response.data.diagnosisId;
  } else {
    console.log('❌ AI 역량진단 실패:', response.data?.error || response.error);
    return null;
  }
}

// 3. Google Apps Script 직접 테스트
async function testGoogleAppsScript() {
  console.log('📊 Google Apps Script 직접 테스트');
  
  const response = await makeRequest(
    TEST_CONFIG.GAS_URL,
    'POST',
    {
      action: 'submitAICapabilityDiagnosis',
      data: testData
    }
  );
  
  if (response.success) {
    console.log('✅ GAS 직접 호출 성공:', response.data.diagnosisId);
    return response.data.diagnosisId;
  } else {
    console.log('❌ GAS 직접 호출 실패:', response.data?.error || response.error);
    return null;
  }
}

// 4. 프로덕션 환경 테스트
async function testProduction() {
  console.log('🌐 프로덕션 환경 테스트');
  
  const response = await makeRequest(
    `${TEST_CONFIG.PROD_URL}/api/ai-capability-diagnosis`,
    'POST',
    testData
  );
  
  if (response.success) {
    console.log('✅ 프로덕션 테스트 성공:', response.data.diagnosisId);
    return response.data.diagnosisId;
  } else {
    console.log('❌ 프로덕션 테스트 실패:', response.data?.error || response.error);
    return null;
  }
}

// 5. 부서별 교육 페이지 테스트
async function testEducationPages() {
  console.log('📚 부서별 교육 페이지 테스트');
  
  const tracks = ['planning', 'sales', 'marketing', 'production', 'cs', 'hr', 'finance'];
  let successCount = 0;
  
  for (const track of tracks) {
    try {
      const response = await fetch(`${TEST_CONFIG.LOCAL_URL}/services/ai-curriculum/tracks/${track}`);
      if (response.ok) {
        console.log(`✅ ${track} 트랙 페이지 정상`);
        successCount++;
      } else {
        console.log(`❌ ${track} 트랙 페이지 오류:`, response.status);
      }
    } catch (error) {
      console.log(`❌ ${track} 트랙 페이지 테스트 실패:`, error.message);
    }
  }
  
  console.log(`📊 교육 페이지 테스트 결과: ${successCount}/${tracks.length} 성공`);
  return successCount === tracks.length;
}

// 6. 시스템 상태 종합 리포트 생성
function generateSystemReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    testResults: results,
    summary: {
      totalTests: Object.keys(results).length,
      passedTests: Object.values(results).filter(r => r.success).length,
      failedTests: Object.values(results).filter(r => !r.success).length
    },
    recommendations: []
  };
  
  // 권장사항 생성
  if (!results.localServer.success) {
    report.recommendations.push('로컬 개발 서버를 시작하세요: npm run dev');
  }
  
  if (!results.gasTest.success) {
    report.recommendations.push('Google Apps Script 배포 상태를 확인하세요');
  }
  
  if (!results.productionTest.success) {
    report.recommendations.push('Vercel 환경 변수 설정을 확인하세요');
  }
  
  return report;
}

// 메인 테스트 실행
async function runComprehensiveTest() {
  console.log('🚀 AICAMP v3.0 종합 시스템 테스트 시작\n');
  
  const results = {};
  
  // 1. 로컬 서버 테스트
  const localServerResult = await testLocalServer();
  results.localServer = { success: localServerResult };
  console.log('');
  
  // 2. AI 역량진단 테스트 (로컬 서버가 실행 중인 경우만)
  if (localServerResult) {
    const diagnosisId = await testAICapabilityDiagnosis();
    results.aiDiagnosis = { success: !!diagnosisId, diagnosisId };
    console.log('');
    
    // 3. 부서별 교육 페이지 테스트
    const educationResult = await testEducationPages();
    results.educationPages = { success: educationResult };
    console.log('');
  }
  
  // 4. Google Apps Script 직접 테스트
  const gasId = await testGoogleAppsScript();
  results.gasTest = { success: !!gasId, diagnosisId: gasId };
  console.log('');
  
  // 5. 프로덕션 환경 테스트
  const prodId = await testProduction();
  results.productionTest = { success: !!prodId, diagnosisId: prodId };
  console.log('');
  
  // 6. 종합 리포트 생성
  const report = generateSystemReport(results);
  
  console.log('📋 종합 테스트 결과');
  console.log('='.repeat(50));
  console.log(`총 테스트: ${report.summary.totalTests}`);
  console.log(`성공: ${report.summary.passedTests}`);
  console.log(`실패: ${report.summary.failedTests}`);
  console.log(`성공률: ${Math.round((report.summary.passedTests / report.summary.totalTests) * 100)}%`);
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 권장사항:');
    report.recommendations.forEach((rec, idx) => {
      console.log(`${idx + 1}. ${rec}`);
    });
  }
  
  // 리포트 파일 저장
  fs.writeFileSync('system-test-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 상세 리포트가 system-test-report.json에 저장되었습니다.');
  
  console.log('\n🎉 종합 시스템 테스트 완료!');
}

// 테스트 실행
if (require.main === module) {
  runComprehensiveTest().catch(console.error);
}

module.exports = {
  runComprehensiveTest,
  testAICapabilityDiagnosis,
  testGoogleAppsScript,
  testProduction
};
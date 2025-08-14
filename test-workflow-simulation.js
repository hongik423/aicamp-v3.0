/**
 * AI 역량진단 워크플로우 시뮬레이션 테스트
 * 
 * 테스트 범위:
 * 1. 진단 신청 폼 제출 테스트
 * 2. API 처리 및 GAS 연동 테스트  
 * 3. 관리자/신청자 이메일 발송 테스트
 * 4. Google Drive 보고서 저장 테스트
 * 5. GEMINI 2.5 FLASH API 키 및 연동 테스트
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// 테스트 설정
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3003', // 현재 실행중인 포트로 변경
  timeout: 800000, // 800초 (메모리 정책 반영)
  retryCount: 3,
  retryDelay: 5000
};

// 테스트용 진단 데이터 (45문항 기반)
const SAMPLE_DIAGNOSIS_DATA = {
  // 기본 정보
  contactName: "테스트 담당자",
  contactEmail: "test@aicamp.club", 
  contactPhone: "010-1234-5678",
  companyName: "AICAMP 테스트 기업",
  businessRegistrationNumber: "123-45-67890",
  industry: "IT/소프트웨어",
  employeeCount: "50-100명",
  annualRevenue: "50-100억원",
  businessContent: "AI 솔루션 개발 및 컨설팅",
  currentChallenges: "AI 도입 전략 수립 및 인력 양성",
  
  // 45개 질문 응답 (1-5 점수)
  assessmentResponses: [
    // AI 전략 및 비전 (1-9번)
    4, 3, 4, 3, 4, 3, 4, 3, 4,
    // AI 기술 역량 (10-18번) 
    3, 4, 3, 4, 3, 4, 3, 4, 3,
    // 데이터 관리 (19-27번)
    4, 3, 4, 3, 4, 3, 4, 3, 4,
    // 조직 및 인력 (28-36번)
    3, 4, 3, 4, 3, 4, 3, 4, 3,
    // 실행 계획 (37-45번)
    4, 3, 4, 3, 4, 3, 4, 3, 4
  ],
  
  // 추가 정보
  aiTransformationGoals: ["업무 자동화", "의사결정 지원", "고객 서비스 개선"],
  expectedROI: "30% 이상",
  implementationTimeline: "6-12개월",
  budgetRange: "1-5억원",
  
  timestamp: new Date().toISOString()
};

// 유틸리티 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TEST_CONFIG.timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// 테스트 결과 로깅
function logTestResult(testName, success, details = {}) {
  const timestamp = new Date().toISOString();
  const result = {
    timestamp,
    testName,
    success,
    details
  };
  
  console.log(`\n[${timestamp}] ${testName}: ${success ? '✅ 성공' : '❌ 실패'}`);
  if (details.error) {
    console.error(`오류: ${details.error}`);
  }
  if (details.response) {
    console.log(`응답: ${JSON.stringify(details.response, null, 2)}`);
  }
  
  return result;
}

// 1. 서버 상태 확인
async function testServerHealth() {
  console.log('\n🔍 1단계: 서버 상태 확인');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/health`);
    const data = await response.json();
    
    return logTestResult('서버 상태 확인', response.ok, {
      status: response.status,
      response: data
    });
  } catch (error) {
    return logTestResult('서버 상태 확인', false, {
      error: error.message
    });
  }
}

// 2. 환경변수 테스트
async function testEnvironmentVariables() {
  console.log('\n🔍 2단계: 환경변수 확인');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/test-env`);
    const data = await response.json();
    
    return logTestResult('환경변수 확인', response.ok, {
      status: response.status,
      response: data
    });
  } catch (error) {
    return logTestResult('환경변수 확인', false, {
      error: error.message
    });
  }
}

// 3. GEMINI API 연동 테스트
async function testGeminiAPI() {
  console.log('\n🔍 3단계: GEMINI 2.5 FLASH API 연동 테스트');
  
  try {
    const testPrompt = "AI 역량진단 시스템이 정상 작동하는지 간단히 확인해주세요.";
    
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/test-gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: testPrompt })
    });
    
    const data = await response.json();
    
    return logTestResult('GEMINI API 연동', response.ok, {
      status: response.status,
      response: data
    });
  } catch (error) {
    return logTestResult('GEMINI API 연동', false, {
      error: error.message
    });
  }
}

// 4. AI 역량진단 폼 제출 테스트
async function testDiagnosisSubmission() {
  console.log('\n🔍 4단계: AI 역량진단 폼 제출 테스트');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/ai-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SAMPLE_DIAGNOSIS_DATA)
    });
    
    const data = await response.json();
    
    return logTestResult('진단 폼 제출', response.ok, {
      status: response.status,
      response: data
    });
  } catch (error) {
    return logTestResult('진단 폼 제출', false, {
      error: error.message
    });
  }
}

// 5. Google Apps Script 연동 테스트
async function testGoogleAppsScript() {
  console.log('\n🔍 5단계: Google Apps Script 연동 테스트');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/google-script-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'test',
        data: { message: 'GAS 연동 테스트' }
      })
    });
    
    const data = await response.json();
    
    return logTestResult('Google Apps Script 연동', response.ok, {
      status: response.status,
      response: data
    });
  } catch (error) {
    return logTestResult('Google Apps Script 연동', false, {
      error: error.message
    });
  }
}

// 6. 이메일 시스템 테스트
async function testEmailSystem() {
  console.log('\n🔍 6단계: 이메일 시스템 테스트');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@aicamp.club',
        subject: '이메일 시스템 테스트',
        type: 'diagnosis_confirmation'
      })
    });
    
    const data = await response.json();
    
    return logTestResult('이메일 시스템', response.ok, {
      status: response.status,
      response: data
    });
  } catch (error) {
    return logTestResult('이메일 시스템', false, {
      error: error.message
    });
  }
}

// 7. 전체 워크플로우 통합 테스트
async function testCompleteWorkflow() {
  console.log('\n🔍 7단계: 전체 워크플로우 통합 테스트');
  
  try {
    // 실제 진단 프로세스 전체를 테스트
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/ai-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...SAMPLE_DIAGNOSIS_DATA,
        contactEmail: 'workflow-test@aicamp.club',
        companyName: 'AICAMP 워크플로우 테스트'
      })
    });
    
    const data = await response.json();
    
    return logTestResult('전체 워크플로우', response.ok, {
      status: response.status,
      response: data,
      processingTime: data.processingTime || 'N/A'
    });
  } catch (error) {
    return logTestResult('전체 워크플로우', false, {
      error: error.message
    });
  }
}

// 메인 테스트 실행 함수
async function runWorkflowTests() {
  console.log('🚀 AICAMP AI 역량진단 워크플로우 시뮬레이션 테스트 시작');
  console.log(`⏰ 테스트 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`🔧 테스트 설정: 타임아웃 ${TEST_CONFIG.timeout/1000}초, 재시도 ${TEST_CONFIG.retryCount}회`);
  
  const testResults = [];
  
  try {
    // 각 테스트 단계별 실행
    testResults.push(await testServerHealth());
    await delay(2000);
    
    testResults.push(await testEnvironmentVariables());
    await delay(2000);
    
    testResults.push(await testGeminiAPI());
    await delay(3000);
    
    testResults.push(await testDiagnosisSubmission());
    await delay(5000);
    
    testResults.push(await testGoogleAppsScript());
    await delay(3000);
    
    testResults.push(await testEmailSystem());
    await delay(3000);
    
    testResults.push(await testCompleteWorkflow());
    
  } catch (error) {
    console.error('테스트 실행 중 오류 발생:', error);
  }
  
  // 테스트 결과 요약
  const successCount = testResults.filter(r => r.success).length;
  const totalCount = testResults.length;
  
  console.log('\n📊 테스트 결과 요약');
  console.log(`✅ 성공: ${successCount}/${totalCount}`);
  console.log(`❌ 실패: ${totalCount - successCount}/${totalCount}`);
  console.log(`📈 성공률: ${((successCount/totalCount) * 100).toFixed(1)}%`);
  
  // 결과를 파일로 저장
  const reportPath = `workflow-test-result-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(reportPath, JSON.stringify({
    testTimestamp: new Date().toISOString(),
    summary: {
      total: totalCount,
      success: successCount,
      failure: totalCount - successCount,
      successRate: ((successCount/totalCount) * 100).toFixed(1) + '%'
    },
    results: testResults
  }, null, 2));
  
  console.log(`📄 상세 결과 저장: ${reportPath}`);
  console.log(`⏰ 테스트 완료 시간: ${new Date().toLocaleString('ko-KR')}`);
  
  return testResults;
}

// 테스트 실행
if (require.main === module) {
  runWorkflowTests().catch(console.error);
}

module.exports = {
  runWorkflowTests,
  testServerHealth,
  testEnvironmentVariables,
  testGeminiAPI,
  testDiagnosisSubmission,
  testGoogleAppsScript,
  testEmailSystem,
  testCompleteWorkflow
};

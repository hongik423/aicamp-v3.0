// AICAMP v3.0 Google Apps Script Comprehensive System Test
// 구글 앱스 스크립트 통합 테스트 시스템

const https = require('https');

// 환경변수 로드
require('dotenv').config({ path: '.env.local' });

// 테스트 설정
const TEST_CONFIG = {
  // Google Apps Script URL - 환경변수에서 가져오기
  GAS_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  TIMEOUT: 30000, // 30초 타임아웃
  TEST_EMAIL: 'test@aicamp.club'
};

console.log('🚀 AICAMP v3.0 Google Apps Script 통합 테스트 시작');
console.log('📍 테스트 URL:', TEST_CONFIG.GAS_URL);
console.log('==========================================\n');

// HTTP 요청 함수
function makeRequest(data, testName) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const url = new URL(TEST_CONFIG.GAS_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      },
      timeout: TEST_CONFIG.TIMEOUT
    };

    console.log(`🧪 ${testName} 테스트 시작...`);
    
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (result.success) {
            console.log(`✅ ${testName} 성공:`, result.message || 'OK');
            resolve(result);
          } else {
            console.log(`❌ ${testName} 실패:`, result.error);
            reject(new Error(result.error));
          }
        } catch (error) {
          console.log(`❌ ${testName} 응답 파싱 오류:`, error.message);
          console.log('응답 내용:', responseData);
          reject(error);
        }
      });
    });

    req.on('timeout', () => {
      console.log(`⏰ ${testName} 타임아웃 (${TEST_CONFIG.TIMEOUT}ms)`);
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.on('error', (error) => {
      console.log(`❌ ${testName} 네트워크 오류:`, error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// 1. GET 요청 테스트 (시스템 상태 확인)
async function testSystemStatus() {
  try {
    const response = await fetch(TEST_CONFIG.GAS_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Test/1.0'
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ 시스템 상태 확인 성공');
      console.log('📊 버전:', result.version);
      console.log('🔧 기능:', result.features?.join(', '));
      return true;
    } else {
      console.log('❌ 시스템 상태 확인 실패:', result.error);
      return false;
    }
  } catch (error) {
    console.log('❌ 시스템 상태 확인 오류:', error.message);
    return false;
  }
}

// 2. 무료 AI 진단 테스트
async function testFreeDiagnosis() {
  const testData = {
    action: 'submitFreeDiagnosis',
    data: {
      companyName: 'AI테스트기업',
      representativeName: '김테스트',
      position: '대표이사',
      industry: 'IT/소프트웨어',
      region: '서울',
      email: TEST_CONFIG.TEST_EMAIL,
      phone: '010-1234-5678',
      businessContent: 'AI 기반 업무 자동화 솔루션 개발',
      concerns: '디지털 전환, AI 도입',
      expectations: 'AI 도구 활용으로 생산성 향상',
      consultingArea: 'AI 전략 수립',
      agreeToTerms: true,
      aiCapabilityData: {
        ceoAIVision: 4, aiInvestment: 3, aiStrategy: 3, changeManagement: 4, riskTolerance: 3,
        itInfrastructure: 4, dataManagement: 3, securityLevel: 4, aiToolsAdopted: 3,
        digitalLiteracy: 3, aiToolUsage: 3, learningAgility: 4, dataAnalysis: 3,
        innovationCulture: 4, collaborationLevel: 3, experimentCulture: 3, continuousLearning: 4,
        processAutomation: 3, decisionMaking: 3, customerService: 3
      }
    }
  };

  return await makeRequest(testData, '무료 AI 진단');
}

// 3. 상담신청 테스트
async function testConsultation() {
  const testData = {
    action: 'saveConsultation',
    data: {
      name: '김상담',
      companyName: '테스트컴퍼니',
      email: TEST_CONFIG.TEST_EMAIL,
      phone: '010-9876-5432',
      consultationType: 'AI 도입 컨설팅',
      inquiryContent: '우리 회사에 적합한 AI 도구 도입 방안을 상담받고 싶습니다.',
      industry: 'IT/소프트웨어',
      region: '서울'
    }
  };

  return await makeRequest(testData, '상담신청');
}

// 4. 베타 피드백 테스트
async function testBetaFeedback() {
  const testData = {
    action: 'saveBetaFeedback',
    data: {
      email: TEST_CONFIG.TEST_EMAIL,
      calculatorName: 'AI 진단 시스템',
      feedbackType: '기능 개선',
      satisfaction: 5,
      usability: 4,
      accuracy: 5,
      completeness: 4,
      improvements: '더 상세한 분석 결과를 제공해주세요',
      overallOpinion: '매우 유용한 도구입니다',
      recommendation: 5
    }
  };

  return await makeRequest(testData, '베타 피드백');
}

// 메인 테스트 실행
async function runAllTests() {
  console.log('🔍 1. 시스템 상태 확인');
  const systemOk = await testSystemStatus();
  
  if (!systemOk) {
    console.log('\n❌ 시스템 상태 확인 실패. 테스트를 중단합니다.');
    process.exit(1);
  }

  console.log('\n🧪 2. 기능별 테스트 시작');
  
  const tests = [
    { name: '무료 AI 진단', func: testFreeDiagnosis },
    { name: '상담신청', func: testConsultation },
    { name: '베타 피드백', func: testBetaFeedback }
  ];

  let successCount = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      await test.func();
      successCount++;
      console.log(`   ✅ ${test.name} 완료\n`);
    } catch (error) {
      console.log(`   ❌ ${test.name} 실패: ${error.message}\n`);
    }
    
    // 테스트 간 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('==========================================');
  console.log('📊 테스트 결과 요약');
  console.log(`✅ 성공: ${successCount}/${totalTests}`);
  console.log(`❌ 실패: ${totalTests - successCount}/${totalTests}`);
  
  if (successCount === totalTests) {
    console.log('🎉 모든 테스트 통과! 시스템이 정상 작동합니다.');
    process.exit(0);
  } else {
    console.log('⚠️  일부 테스트 실패. 로그를 확인해주세요.');
    process.exit(1);
  }
}

// 테스트 실행
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('💥 테스트 실행 중 치명적 오류:', error);
    process.exit(1);
  });
}

module.exports = { runAllTests, testSystemStatus, testFreeDiagnosis, testConsultation, testBetaFeedback };
/**
 * API 테스트 스크립트
 */

const http = require('http');

const testData = {
  action: 'submitFreeDiagnosis',
  data: {
    companyName: 'API테스트기업_' + Date.now(),
    representativeName: '박테스트',
    position: '대표이사',
    industry: 'it',
    region: 'seoul',
    businessContent: 'IT 서비스 개발 기업',
    concerns: ['ai_adoption'],
    expectations: 'AI 도입을 통한 효율성 향상',
    email: 'apitest@example.com',
    phone: '010-1111-2222',
    agreeToTerms: true,
    employeeCount: '10-50',
    annualRevenue: '10-50억',
    businessHistory: '3-5년',
    ceoAIVision: 4,
    aiInvestment: 3,
    aiStrategy: 3,
    changeManagement: 4,
    riskTolerance: 3,
    itInfrastructure: 4,
    dataManagement: 3,
    securityLevel: 4,
    aiToolsAdopted: 2,
    digitalLiteracy: 3,
    aiToolUsage: 2,
    learningAgility: 4,
    dataAnalysis: 3,
    innovationCulture: 4,
    collaborationLevel: 4,
    experimentCulture: 3,
    continuousLearning: 4,
    processAutomation: 2,
    decisionMaking: 3,
    customerService: 3
  }
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/google-script-proxy',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 API 테스트 시작...\n');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('\n✅ 응답 데이터:', JSON.stringify(result, null, 2));
      
      if (result.success) {
        console.log('\n🎉 테스트 성공!');
        console.log('진단 ID:', result.diagnosisId);
      } else {
        console.log('\n❌ 테스트 실패:', result.error);
      }
    } catch (e) {
      console.error('\n❌ JSON 파싱 오류:', e.message);
      console.log('원시 응답:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ 요청 오류: ${e.message}`);
  console.log('\n💡 개발 서버가 실행 중인지 확인하세요 (npm run dev)');
});

req.write(postData);
req.end();
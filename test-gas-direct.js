/**
 * Google Apps Script 직접 테스트
 * 배포된 웹앱 URL에 직접 POST 요청
 */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testGoogleAppsScript() {
  console.log('🧪 Google Apps Script 직접 테스트 시작\n');
  
  const testData = {
    companyName: 'GAS직접테스트_' + new Date().getTime(),
    representativeName: '김테스트',
    position: '대표이사',
    industry: 'it',
    region: 'seoul',
    businessContent: 'AI 솔루션 개발 전문 기업입니다.',
    concerns: ['ai_adoption'],
    expectations: 'AI 도입을 통한 업무 효율성 향상',
    email: 'gastest@example.com',
    phone: '010-0000-0000',
    agreeToTerms: true,
    employeeCount: '10-50',
    annualRevenue: '10-50억',
    businessHistory: '3-5년',
    // AI 역량 점수
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
  };

  try {
    console.log('📤 Google Apps Script에 직접 요청 전송...');
    console.log('URL:', GAS_URL);
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors', // CORS 우회
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'submitFreeDiagnosis',
        data: testData
      })
    });

    // no-cors 모드에서는 응답을 읽을 수 없음
    console.log('✅ 요청 전송 완료 (no-cors 모드)');
    console.log('⚠️  주의: no-cors 모드로 인해 응답을 확인할 수 없습니다.');
    console.log('\n📌 확인 방법:');
    console.log('1. Google Sheets 확인: https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0');
    console.log('2. 시트에서 "GAS직접테스트"로 시작하는 회사명 확인');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }
}

// 브라우저에서 실행할 수 있도록 HTML 생성
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>GAS Direct Test</title>
</head>
<body>
    <h1>Google Apps Script 직접 테스트</h1>
    <button onclick="testGAS()">테스트 실행</button>
    <pre id="result"></pre>
    <script>
        const GAS_URL = '${GAS_URL}';
        
        async function testGAS() {
            const result = document.getElementById('result');
            result.textContent = '테스트 중...\\n';
            
            const testData = ${JSON.stringify(testData)};
            testData.companyName = 'GAS브라우저테스트_' + Date.now();
            
            try {
                const response = await fetch(GAS_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'submitFreeDiagnosis',
                        data: testData
                    })
                });
                
                const text = await response.text();
                result.textContent += '응답:\\n' + text;
            } catch (error) {
                result.textContent += '오류: ' + error.message;
            }
        }
    </script>
</body>
</html>
`;

// HTML 파일 생성
const fs = require('fs');
fs.writeFileSync('public/test-gas-direct.html', html);
console.log('\n📄 브라우저 테스트 파일 생성: public/test-gas-direct.html');

// Node.js에서 실행
testGoogleAppsScript();
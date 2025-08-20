const fs = require('fs');
const https = require('https');

// 테스트 데이터 로드
const testData = JSON.parse(fs.readFileSync('test-diagnosis-data.json', 'utf8'));

// Google Apps Script URL (실제 배포된 URL로 변경 필요)
const GAS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// HTTPS 요청 함수
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'script.google.com',
      path: '/macros/s/YOUR_SCRIPT_ID/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          resolve({ success: false, error: 'Response parsing failed', data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// 테스트 실행
async function runTest() {
  console.log('🧪 AI 진단 시스템 테스트 시작...');
  console.log('📊 테스트 데이터:', {
    companyName: testData.companyName,
    contactName: testData.contactName,
    industry: testData.industry,
    responsesCount: Object.keys(testData.assessmentResponses).length
  });

  try {
    console.log('🚀 AI 진단 요청 전송 중...');
    const result = await makeRequest(GAS_URL, testData);
    
    console.log('📋 응답 결과:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ 테스트 성공!');
      console.log('📄 진단 ID:', result.diagnosisId);
      console.log('📊 총점:', result.results?.totalScore);
      console.log('📧 이메일 발송:', result.results?.emailsSent);
      console.log('🗂️ Drive 업로드:', result.results?.driveUploaded);
    } else {
      console.log('❌ 테스트 실패:', result.error);
    }
    
  } catch (error) {
    console.error('❌ 테스트 오류:', error.message);
  }
}

// 테스트 실행
runTest();

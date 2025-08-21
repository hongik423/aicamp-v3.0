/**
 * Next.js API 엔드포인트 테스트
 * AI 역량진단 시스템의 실제 API 호출 테스트
 */

const http = require('http');

// 테스트 데이터
const testDiagnosisData = {
  companyName: "테스트 기업",
  representativeName: "홍길동",
  email: "test@example.com",
  phone: "010-1234-5678",
  industry: "IT/소프트웨어",
  employeeCount: "10-49명",
  diagnosisId: "TEST_" + Date.now(),
  answers: {},
  diagnosisResult: {
    overallScore: 75,
    categoryScores: {
      strategy: 80,
      technology: 70,
      organization: 75,
      data: 80
    },
    maturity: "성장기",
    recommendations: [
      "AI 전략 수립 강화",
      "기술 인프라 구축",
      "조직 문화 개선"
    ]
  }
};

// 45개 문항에 대한 샘플 답변 생성
for (let i = 1; i <= 45; i++) {
  testDiagnosisData.answers[`Q${i}`] = Math.floor(Math.random() * 5) + 1;
}

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPIEndpoints() {
  try {
    console.log('🧪 Next.js API 엔드포인트 테스트 시작...\n');

    // 1. 메인 페이지 접근 테스트
    console.log('1️⃣ 메인 페이지 접근 테스트...');
    try {
      const mainPageResponse = await makeRequest('/');
      console.log('✅ 메인 페이지 접근 성공');
      console.log('- 상태 코드:', mainPageResponse.status);
    } catch (error) {
      console.log('❌ 메인 페이지 접근 실패:', error.message);
    }

    // 2. AI 진단 페이지 접근 테스트
    console.log('\n2️⃣ AI 진단 페이지 접근 테스트...');
    try {
      const diagnosisPageResponse = await makeRequest('/diagnosis');
      console.log('✅ AI 진단 페이지 접근 성공');
      console.log('- 상태 코드:', diagnosisPageResponse.status);
    } catch (error) {
      console.log('❌ AI 진단 페이지 접근 실패:', error.message);
    }

    // 3. Google Drive API 엔드포인트 테스트
    console.log('\n3️⃣ Google Drive API 엔드포인트 테스트...');
    try {
      const driveResponse = await makeRequest('/api/google-drive/upload', 'POST', {
        test: true,
        fileName: 'test-file.txt',
        fileContent: 'Test content'
      });
      console.log('✅ Google Drive API 엔드포인트 접근 성공');
      console.log('- 상태 코드:', driveResponse.status);
      console.log('- 응답:', driveResponse.data);
    } catch (error) {
      console.log('❌ Google Drive API 엔드포인트 접근 실패:', error.message);
    }

    // 4. AI 진단 API 엔드포인트 테스트
    console.log('\n4️⃣ AI 진단 API 엔드포인트 테스트...');
    try {
      const diagnosisResponse = await makeRequest('/api/ai-diagnosis/submit', 'POST', testDiagnosisData);
      console.log('✅ AI 진단 API 엔드포인트 접근 성공');
      console.log('- 상태 코드:', diagnosisResponse.status);
      console.log('- 응답:', diagnosisResponse.data);
    } catch (error) {
      console.log('❌ AI 진단 API 엔드포인트 접근 실패:', error.message);
    }

    console.log('\n🎉 API 엔드포인트 테스트 완료!');

  } catch (error) {
    console.error('\n❌ API 엔드포인트 테스트 실패:');
    console.error('오류:', error.message);
  }
}

// 스크립트 실행
if (require.main === module) {
  testAPIEndpoints();
}

module.exports = { testAPIEndpoints };

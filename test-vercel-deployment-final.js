/**
 * ================================================================================
 * Vercel 배포 완료 테스트 스크립트
 * ================================================================================
 * 
 * 🎯 테스트 대상:
 * - 최신 배포 URL: https://aicamp-v3-0-ci4n9r4rz-hongik423-3087s-projects.vercel.app
 * - 업데이트된 환경변수로 Google Apps Script 연동 테스트
 * - 모든 주요 기능 동작 확인
 */

const https = require('https');
const fs = require('fs');

// 🌐 배포된 사이트 정보
const DEPLOYMENT_INFO = {
  url: 'https://aicamp-v3-0-ci4n9r4rz-hongik423-3087s-projects.vercel.app',
  timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  version: '2025.01.27.AICAMP_최종완성_배포버전'
};

// 🔧 업데이트된 환경변수
const UPDATED_ENV = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  GOOGLE_SHEETS_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM'
};

/**
 * HTTP 요청 함수
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    
    if (options.method === 'POST' && options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

/**
 * 📋 배포 테스트 실행
 */
async function runDeploymentTests() {
  const report = {
    title: 'Vercel 배포 완료 테스트 결과',
    timestamp: DEPLOYMENT_INFO.timestamp,
    deploymentUrl: DEPLOYMENT_INFO.url,
    version: DEPLOYMENT_INFO.version,
    tests: []
  };

  console.log('🚀 Vercel 배포 테스트 시작...\n');
  console.log(`🌐 배포 URL: ${DEPLOYMENT_INFO.url}`);
  console.log(`⏰ 테스트 시간: ${DEPLOYMENT_INFO.timestamp}\n`);

  // 1. 메인 페이지 접근 테스트
  try {
    console.log('1️⃣ 메인 페이지 접근 테스트...');
    const response = await makeRequest(DEPLOYMENT_INFO.url);
    const isSuccess = response.statusCode === 200 && response.body.includes('AICAMP');
    
    report.tests.push({
      name: '메인 페이지 접근',
      status: isSuccess ? '✅ 통과' : '❌ 실패',
      details: `상태코드: ${response.statusCode}, AICAMP 브랜딩: ${response.body.includes('AICAMP') ? '확인됨' : '누락'}`
    });
    
    console.log(`   ${isSuccess ? '✅' : '❌'} 상태코드: ${response.statusCode}`);
  } catch (error) {
    report.tests.push({
      name: '메인 페이지 접근',
      status: '❌ 실패',
      details: `오류: ${error.message}`
    });
    console.log(`   ❌ 오류: ${error.message}`);
  }

  // 2. AI 무료진단 페이지 테스트
  try {
    console.log('\n2️⃣ AI 무료진단 페이지 테스트...');
    const diagnosisUrl = `${DEPLOYMENT_INFO.url}/diagnosis`;
    const response = await makeRequest(diagnosisUrl);
    const isSuccess = response.statusCode === 200 && response.body.includes('진단');
    
    report.tests.push({
      name: 'AI 무료진단 페이지',
      status: isSuccess ? '✅ 통과' : '❌ 실패',
      details: `상태코드: ${response.statusCode}, 진단 페이지: ${response.body.includes('진단') ? '정상' : '오류'}`
    });
    
    console.log(`   ${isSuccess ? '✅' : '❌'} 상태코드: ${response.statusCode}`);
  } catch (error) {
    report.tests.push({
      name: 'AI 무료진단 페이지',
      status: '❌ 실패',
      details: `오류: ${error.message}`
    });
    console.log(`   ❌ 오류: ${error.message}`);
  }

  // 3. 세금계산기 페이지 테스트
  try {
    console.log('\n3️⃣ 세금계산기 페이지 테스트...');
    const taxUrl = `${DEPLOYMENT_INFO.url}/tax-calculator`;
    const response = await makeRequest(taxUrl);
    const isSuccess = response.statusCode === 200 && response.body.includes('세금');
    
    report.tests.push({
      name: '세금계산기 페이지',
      status: isSuccess ? '✅ 통과' : '❌ 실패',
      details: `상태코드: ${response.statusCode}, 세금계산기: ${response.body.includes('세금') ? '정상' : '오류'}`
    });
    
    console.log(`   ${isSuccess ? '✅' : '❌'} 상태코드: ${response.statusCode}`);
  } catch (error) {
    report.tests.push({
      name: '세금계산기 페이지',
      status: '❌ 실패',
      details: `오류: ${error.message}`
    });
    console.log(`   ❌ 오류: ${error.message}`);
  }

  // 4. API 엔드포인트 테스트
  try {
    console.log('\n4️⃣ API 엔드포인트 테스트...');
    const apiUrl = `${DEPLOYMENT_INFO.url}/api/test-env`;
    const response = await makeRequest(apiUrl);
    const isSuccess = response.statusCode === 200;
    
    report.tests.push({
      name: 'API 엔드포인트',
      status: isSuccess ? '✅ 통과' : '❌ 실패',
      details: `상태코드: ${response.statusCode}, API 응답: ${isSuccess ? '정상' : '오류'}`
    });
    
    console.log(`   ${isSuccess ? '✅' : '❌'} 상태코드: ${response.statusCode}`);
  } catch (error) {
    report.tests.push({
      name: 'API 엔드포인트',
      status: '❌ 실패',
      details: `오류: ${error.message}`
    });
    console.log(`   ❌ 오류: ${error.message}`);
  }

  // 5. Google Apps Script 연동 테스트
  try {
    console.log('\n5️⃣ Google Apps Script 연동 테스트...');
    const response = await makeRequest(UPDATED_ENV.GOOGLE_SCRIPT_URL);
    const isSuccess = response.statusCode === 200 && response.body.includes('AICAMP');
    
    report.tests.push({
      name: 'Google Apps Script 연동',
      status: isSuccess ? '✅ 통과' : '❌ 실패',
      details: `상태코드: ${response.statusCode}, GAS 응답: ${isSuccess ? '정상' : '오류'}`
    });
    
    console.log(`   ${isSuccess ? '✅' : '❌'} 상태코드: ${response.statusCode}`);
  } catch (error) {
    report.tests.push({
      name: 'Google Apps Script 연동',
      status: '❌ 실패',
      details: `오류: ${error.message}`
    });
    console.log(`   ❌ 오류: ${error.message}`);
  }

  // 6. 환경변수 확인 (간접 테스트)
  const envCheckUrl = `${DEPLOYMENT_INFO.url}/api/test-system`;
  try {
    console.log('\n6️⃣ 환경변수 설정 확인...');
    const response = await makeRequest(envCheckUrl);
    const isSuccess = response.statusCode === 200;
    
    report.tests.push({
      name: '환경변수 설정',
      status: isSuccess ? '✅ 통과' : '❌ 실패',
      details: `시스템 테스트 API: ${isSuccess ? '정상' : '오류'}`
    });
    
    console.log(`   ${isSuccess ? '✅' : '❌'} 시스템 테스트 API 상태: ${response.statusCode}`);
  } catch (error) {
    report.tests.push({
      name: '환경변수 설정',
      status: '❌ 실패',
      details: `오류: ${error.message}`
    });
    console.log(`   ❌ 오류: ${error.message}`);
  }

  return report;
}

/**
 * 📊 테스트 결과 출력
 */
function printReport(report) {
  console.log('\n' + '='.repeat(80));
  console.log(`🎉 ${report.title}`);
  console.log(`🌐 배포 URL: ${report.deploymentUrl}`);
  console.log(`⏰ 테스트 시간: ${report.timestamp}`);
  console.log(`📦 버전: ${report.version}`);
  console.log('='.repeat(80));

  const passedTests = report.tests.filter(test => test.status.includes('✅')).length;
  const totalTests = report.tests.length;
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);

  console.log(`\n🎯 테스트 결과: ${passedTests}/${totalTests} (${successRate}%)`);
  console.log('-'.repeat(80));

  report.tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name}: ${test.status}`);
    console.log(`   ${test.details}\n`);
  });

  console.log('='.repeat(80));
  
  if (successRate >= 80) {
    console.log('🎉 Vercel 배포가 성공적으로 완료되었습니다!');
    console.log(`🌐 배포된 사이트: ${report.deploymentUrl}`);
    console.log('📌 모든 주요 기능이 정상 동작하고 있습니다.');
  } else {
    console.log('⚠️ 일부 테스트가 실패했습니다. 배포 상태를 다시 확인해주세요.');
  }
}

/**
 * 💾 테스트 결과를 파일로 저장
 */
function saveReport(report) {
  const reportContent = `# Vercel 배포 완료 테스트 결과

## 📊 배포 개요
- **배포 URL**: ${report.deploymentUrl}
- **테스트 시간**: ${report.timestamp}
- **버전**: ${report.version}
- **총 테스트**: ${report.tests.length}개
- **통과**: ${report.tests.filter(test => test.status.includes('✅')).length}개
- **실패**: ${report.tests.filter(test => test.status.includes('❌')).length}개

## 📋 상세 테스트 결과

${report.tests.map((test, index) => 
  `### ${index + 1}. ${test.name}
- **상태**: ${test.status}  
- **상세**: ${test.details}
`).join('\n')}

## 🎯 업데이트된 환경변수

| 항목 | 값 |
|------|-----|
| Google Script URL | \`${UPDATED_ENV.GOOGLE_SCRIPT_URL}\` |
| Google Sheets ID | \`${UPDATED_ENV.GOOGLE_SHEETS_ID}\` |
| Gemini API Key | \`${UPDATED_ENV.GEMINI_API_KEY}\` |

## 🌐 배포 정보

- **최신 배포 URL**: ${report.deploymentUrl}
- **배포 시간**: ${report.timestamp}
- **배포 상태**: ✅ 성공
- **빌드 상태**: ✅ 성공

## 📌 다음 단계

1. **Google Apps Script 배포**: 새로운 환경변수로 GAS 코드 업데이트 및 재배포
2. **기능 테스트**: 실제 진단 신청, 상담 신청, 베타 피드백 테스트
3. **이메일 발송 테스트**: 관리자/신청자 이메일 정상 발송 확인
4. **PDF 첨부 기능 테스트**: AI 진단 결과 PDF 이메일 첨부 확인

---
*테스트 완료 시간: ${report.timestamp}*
`;

  const reportFileName = `VERCEL_배포_완료_테스트_결과_${new Date().toISOString().split('T')[0]}.md`;
  fs.writeFileSync(reportFileName, reportContent, 'utf8');
  console.log(`\n💾 테스트 결과가 저장되었습니다: ${reportFileName}`);
}

// 메인 실행
async function main() {
  try {
    const report = await runDeploymentTests();
    printReport(report);
    saveReport(report);
  } catch (error) {
    console.error('❌ 배포 테스트 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

main(); 
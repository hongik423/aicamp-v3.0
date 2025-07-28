/**
 * ================================================================================
 * Google Apps Script 환경변수 업데이트 테스트 스크립트
 * ================================================================================
 * 
 * 🎯 테스트 대상:
 * - Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
 * - Deployment ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
 * - Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
 * - Google Sheets ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
 * - 관리자 이메일: hongik423@gmail.com
 * - Gemini API Key: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
 */

const fs = require('fs');
const path = require('path');

// 🌐 업데이트된 환경변수
const UPDATED_ENV = {
  GOOGLE_SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  GOOGLE_DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  GOOGLE_SHEETS_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM'
};

/**
 * 📋 테스트 결과 리포트
 */
function generateTestReport() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const report = {
    title: 'Google Apps Script 환경변수 업데이트 테스트 결과',
    timestamp: timestamp,
    version: '2025.01.27.AICAMP_최종완성_배포버전',
    tests: []
  };

  console.log('🔍 Google Apps Script 환경변수 업데이트 테스트 시작...\n');

  // 1. 파일 존재 확인
  const gasFilePath = 'docs/google_apps_script_with_pdf_email_integrated_FIXED.js';
  const gasFileExists = fs.existsSync(gasFilePath);
  
  report.tests.push({
    name: 'GAS 파일 존재 확인',
    status: gasFileExists ? '✅ 통과' : '❌ 실패',
    details: gasFileExists ? `파일 위치: ${gasFilePath}` : '파일을 찾을 수 없습니다'
  });
  
  if (!gasFileExists) {
    console.log('❌ GAS 파일을 찾을 수 없습니다:', gasFilePath);
    return report;
  }

  // 2. 파일 내용 읽기
  const gasContent = fs.readFileSync(gasFilePath, 'utf8');
  
  // 3. 환경변수 검증
  const envTests = [
    {
      name: 'Script ID 업데이트 확인',
      pattern: /SCRIPT_ID:\s*['"]1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj['"]/,
      expected: UPDATED_ENV.GOOGLE_SCRIPT_ID
    },
    {
      name: 'Deployment ID 업데이트 확인',
      pattern: /DEPLOYMENT_ID:\s*['"]AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0['"]/,
      expected: UPDATED_ENV.GOOGLE_DEPLOYMENT_ID
    },
    {
      name: 'Web App URL 업데이트 확인',
      pattern: /WEB_APP_URL:\s*['"]https:\/\/script\.google\.com\/macros\/s\/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0\/exec['"]/,
      expected: UPDATED_ENV.GOOGLE_SCRIPT_URL
    },
    {
      name: 'Google Sheets ID 업데이트 확인',
      pattern: /SPREADSHEET_ID\s*=\s*['"]1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0['"]/,
      expected: UPDATED_ENV.GOOGLE_SHEETS_ID
    },
    {
      name: 'Version 업데이트 확인',
      pattern: /VERSION\s*=\s*['"]2025\.01\.27\.AICAMP_최종완성_배포버전['"]/,
      expected: '2025.01.27.AICAMP_최종완성_배포버전'
    },
    {
      name: 'Gemini API Key 주석 추가 확인',
      pattern: /Gemini API Key:\s*AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM/,
      expected: UPDATED_ENV.GEMINI_API_KEY
    }
  ];

  envTests.forEach(test => {
    const isMatch = test.pattern.test(gasContent);
    report.tests.push({
      name: test.name,
      status: isMatch ? '✅ 통과' : '❌ 실패',
      details: isMatch ? `정상 업데이트: ${test.expected}` : `업데이트 누락: ${test.expected}`
    });
  });

  // 4. 핵심 함수 존재 확인
  const functionTests = [
    'doPost',
    'doGet',
    'processDiagnosisForm',
    'processConsultationForm',
    'processBetaFeedback',
    'testEntireSystem',
    'checkEnvironmentSync'
  ];

  functionTests.forEach(funcName => {
    const funcPattern = new RegExp(`function\\s+${funcName}\\s*\\(`);
    const exists = funcPattern.test(gasContent);
    report.tests.push({
      name: `${funcName} 함수 존재 확인`,
      status: exists ? '✅ 통과' : '❌ 실패',
      details: exists ? '함수가 정상적으로 존재합니다' : '함수를 찾을 수 없습니다'
    });
  });

  // 5. 파일 크기 및 라인 수 확인
  const fileStats = fs.statSync(gasFilePath);
  const lineCount = gasContent.split('\n').length;
  
  report.tests.push({
    name: '파일 크기 및 구조 확인',
    status: lineCount > 1400 ? '✅ 통과' : '❌ 실패',
    details: `파일 크기: ${(fileStats.size / 1024).toFixed(2)}KB, 라인 수: ${lineCount}줄`
  });

  return report;
}

/**
 * 📊 테스트 결과 출력
 */
function printReport(report) {
  console.log('\n' + '='.repeat(80));
  console.log(`📋 ${report.title}`);
  console.log(`🕐 테스트 시간: ${report.timestamp}`);
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
  
  if (successRate >= 90) {
    console.log('🎉 환경변수 업데이트가 성공적으로 완료되었습니다!');
    console.log('📌 다음 단계: Google Apps Script 에디터에서 새로운 배포를 진행하세요.');
  } else {
    console.log('⚠️ 일부 테스트가 실패했습니다. 파일을 다시 확인해주세요.');
  }
}

/**
 * 💾 테스트 결과를 파일로 저장
 */
function saveReport(report) {
  const reportContent = `# Google Apps Script 환경변수 업데이트 테스트 결과

## 📊 테스트 개요
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
| Script ID | \`${UPDATED_ENV.GOOGLE_SCRIPT_ID}\` |
| Deployment ID | \`${UPDATED_ENV.GOOGLE_DEPLOYMENT_ID}\` |
| Web App URL | \`${UPDATED_ENV.GOOGLE_SCRIPT_URL}\` |
| Google Sheets ID | \`${UPDATED_ENV.GOOGLE_SHEETS_ID}\` |
| 관리자 이메일 | \`${UPDATED_ENV.ADMIN_EMAIL}\` |
| Gemini API Key | \`${UPDATED_ENV.GEMINI_API_KEY}\` |

## 📌 다음 단계

1. **Google Apps Script 에디터 접속**: https://script.google.com/
2. **기존 프로젝트 열기**: Script ID \`${UPDATED_ENV.GOOGLE_SCRIPT_ID}\`
3. **코드 업데이트**: 전체 코드 교체
4. **새로운 배포**: "배포" → "웹 앱으로 배포" → "새 배포"
5. **환경변수 동기화**: Next.js 프로젝트의 \`.env.local\` 파일 업데이트

---
*테스트 완료 시간: ${report.timestamp}*
`;

  const reportFileName = `GAS_환경변수_업데이트_테스트_결과_${new Date().toISOString().split('T')[0]}.md`;
  fs.writeFileSync(reportFileName, reportContent, 'utf8');
  console.log(`\n💾 테스트 결과가 저장되었습니다: ${reportFileName}`);
}

// 메인 실행
try {
  const report = generateTestReport();
  printReport(report);
  saveReport(report);
} catch (error) {
  console.error('❌ 테스트 실행 중 오류 발생:', error);
  process.exit(1);
} 
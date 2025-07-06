/**
 * 🚨 모바일 무료진단 보안 문제 테스트 및 수정 스크립트
 * 
 * 문제: 모바일에서 무료진단 결과보고서 다운로드 시 구글시트가 다운로드되는 치명적 보안 문제
 * 해결: HTML 보고서에서 구글시트 URL/링크 완전 제거
 */

const fs = require('fs');
const path = require('path');

// 테스트 데이터
const testDiagnosisData = {
  companyName: "보안테스트기업",
  industry: "IT/소프트웨어",
  employeeCount: "10-50명",
  contactName: "김보안",
  contactPhone: "010-1234-5678",
  contactEmail: "security_test@example.com",
  mainConcerns: "무료진단 보고서 다운로드 보안 문제 테스트",
  expectedBenefits: "구글시트 링크 노출 방지",
  businessLocation: "서울특별시",
  establishmentDifficulty: "성장기",
  privacyConsent: true,
  // 5점 척도 평가
  scores: {
    기획수준: 4,
    차별화정도: 5,
    가격설정: 3,
    홍보마케팅: 4,
    // ... 20개 항목
  }
};

// 보안 문제 확인 함수
function checkSecurityIssues() {
  console.log('🔍 === 모바일 무료진단 보안 문제 검사 시작 ===\n');
  
  const filesToCheck = [
    'src/components/diagnosis/SimplifiedDiagnosisResults.tsx',
    'src/lib/utils/googleSheetsService.ts',
    'src/lib/utils/emailService.ts',
    'src/app/api/simplified-diagnosis/route.ts'
  ];
  
  const securityIssues = [];
  
  filesToCheck.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 위험한 패턴 검사
      const dangerousPatterns = [
        /docs\.google\.com\/spreadsheets/gi,
        /sheets\.google\.com/gi,
        /SPREADSHEET_ID/gi,
        /구글시트.*URL/gi,
        /구글시트.*링크/gi,
        /1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/gi, // 실제 시트 ID
        /script\.google\.com.*exec/gi
      ];
      
      dangerousPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          securityIssues.push({
            file: filePath,
            pattern: pattern.toString(),
            matches: matches,
            line: findLineNumber(content, matches[0])
          });
        }
      });
    }
  });
  
  return securityIssues;
}

// 라인 번호 찾기
function findLineNumber(content, searchText) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(searchText)) {
      return i + 1;
    }
  }
  return -1;
}

// 무료진단 API 테스트
async function testDiagnosisAPI() {
  console.log('🧪 === 무료진단 API 테스트 시작 ===\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/simplified-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testDiagnosisData)
    });
    
    if (!response.ok) {
      console.error('❌ API 호출 실패:', response.status, response.statusText);
      return null;
    }
    
    const result = await response.json();
    console.log('✅ API 호출 성공');
    
    // 응답에서 구글시트 관련 정보 확인
    const responseText = JSON.stringify(result, null, 2);
    
    const sensitivePatterns = [
      /docs\.google\.com/gi,
      /sheets\.google\.com/gi,
      /1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/gi,
      /script\.google\.com/gi
    ];
    
    const foundSensitiveData = [];
    sensitivePatterns.forEach(pattern => {
      const matches = responseText.match(pattern);
      if (matches) {
        foundSensitiveData.push({
          pattern: pattern.toString(),
          matches: matches
        });
      }
    });
    
    if (foundSensitiveData.length > 0) {
      console.error('🚨 치명적 보안 문제 발견!');
      console.error('API 응답에 구글시트 관련 민감 정보 포함:');
      foundSensitiveData.forEach(issue => {
        console.error(`  - ${issue.pattern}: ${issue.matches.join(', ')}`);
      });
      return { success: false, securityIssues: foundSensitiveData };
    }
    
    console.log('✅ API 응답 보안 검사 통과');
    return { success: true, data: result };
    
  } catch (error) {
    console.error('❌ API 테스트 오류:', error.message);
    return { success: false, error: error.message };
  }
}

// HTML 보고서 보안 검사
function checkHTMLReportSecurity(htmlContent) {
  console.log('🔍 === HTML 보고서 보안 검사 ===\n');
  
  const sensitivePatterns = [
    /docs\.google\.com\/spreadsheets/gi,
    /sheets\.google\.com/gi,
    /1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/gi,
    /script\.google\.com.*exec/gi,
    /구글시트/gi,
    /Google Sheets/gi
  ];
  
  const securityIssues = [];
  
  sensitivePatterns.forEach(pattern => {
    const matches = htmlContent.match(pattern);
    if (matches) {
      securityIssues.push({
        pattern: pattern.toString(),
        matches: matches,
        severity: 'HIGH'
      });
    }
  });
  
  if (securityIssues.length > 0) {
    console.error('🚨 HTML 보고서에서 보안 문제 발견!');
    securityIssues.forEach(issue => {
      console.error(`  - ${issue.pattern}: ${issue.matches.join(', ')}`);
    });
    return { secure: false, issues: securityIssues };
  }
  
  console.log('✅ HTML 보고서 보안 검사 통과');
  return { secure: true };
}

// 보안 수정 제안
function generateSecurityFixes() {
  console.log('\n🔧 === 보안 수정 제안 ===');
  
  const fixes = [
    {
      file: 'src/components/diagnosis/SimplifiedDiagnosisResults.tsx',
      issue: 'HTML 보고서에 구글시트 링크 포함 가능성',
      fix: 'generateCompleteHTMLReport 함수에서 모든 구글시트 관련 링크 제거'
    },
    {
      file: 'src/lib/utils/googleSheetsService.ts',
      issue: '구글시트 URL이 클라이언트에 노출',
      fix: '클라이언트 측에서 구글시트 URL 완전 숨김'
    },
    {
      file: 'src/app/api/simplified-diagnosis/route.ts',
      issue: 'API 응답에 구글시트 정보 포함 가능성',
      fix: '응답 데이터에서 구글시트 관련 정보 필터링'
    }
  ];
  
  fixes.forEach((fix, index) => {
    console.log(`\n${index + 1}. ${fix.file}`);
    console.log(`   문제: ${fix.issue}`);
    console.log(`   해결: ${fix.fix}`);
  });
}

// 메인 실행 함수
async function main() {
  console.log('🚨 === 모바일 무료진단 보안 문제 완전 검사 ===\n');
  
  // 1. 코드 보안 검사
  console.log('1️⃣ 코드 보안 검사');
  const codeSecurityIssues = checkSecurityIssues();
  
  if (codeSecurityIssues.length > 0) {
    console.error('🚨 코드에서 보안 문제 발견!');
    codeSecurityIssues.forEach(issue => {
      console.error(`  - ${issue.file}:${issue.line} - ${issue.pattern}`);
      console.error(`    발견된 내용: ${issue.matches.join(', ')}`);
    });
  } else {
    console.log('✅ 코드 보안 검사 통과');
  }
  
  // 2. API 테스트
  console.log('\n2️⃣ API 보안 테스트');
  const apiResult = await testDiagnosisAPI();
  
  if (!apiResult || !apiResult.success) {
    console.error('❌ API 테스트 실패');
    if (apiResult && apiResult.securityIssues) {
      console.error('🚨 API에서 보안 문제 발견!');
    }
  }
  
  // 3. 보안 수정 제안
  console.log('\n3️⃣ 보안 수정 제안');
  generateSecurityFixes();
  
  // 4. 최종 보고서
  console.log('\n📋 === 최종 보안 검사 보고서 ===');
  
  const totalIssues = codeSecurityIssues.length + (apiResult && apiResult.securityIssues ? apiResult.securityIssues.length : 0);
  
  if (totalIssues > 0) {
    console.log(`🚨 총 ${totalIssues}개의 보안 문제 발견`);
    console.log('⚠️ 즉시 수정이 필요합니다!');
    
    // 긴급 수정 가이드
    console.log('\n🔧 긴급 수정 가이드:');
    console.log('1. src/components/diagnosis/SimplifiedDiagnosisResults.tsx에서 구글시트 URL 완전 제거');
    console.log('2. HTML 보고서에서 모든 외부 링크 제거');
    console.log('3. API 응답에서 구글시트 관련 정보 필터링');
    console.log('4. 클라이언트 측에서 구글시트 접근 차단');
    
  } else {
    console.log('✅ 보안 검사 통과 - 문제 없음');
  }
  
  console.log('\n🎯 다음 단계:');
  console.log('1. 발견된 보안 문제 즉시 수정');
  console.log('2. 수정 후 재테스트');
  console.log('3. 프로덕션 배포 전 최종 검증');
}

// 스크립트 실행
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  checkSecurityIssues,
  testDiagnosisAPI,
  checkHTMLReportSecurity,
  generateSecurityFixes
}; 
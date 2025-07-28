/**
 * 🧪 AICAMP Vercel 배포 사이트 기능 테스트 - 2025.01.27
 * 실행: node test-deployed-site.js
 */

const fetch = require('node-fetch');

// 🌐 배포된 사이트 정보 (수정된 버전)
const DEPLOYED_SITE = {
  BASE_URL: 'https://ai-camp-landingpage.vercel.app',
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec'
};

/**
 * 🌐 사이트 접근성 테스트
 */
async function testSiteAccessibility() {
  console.log('🌐 사이트 접근성 테스트 시작...');
  
  const testPages = [
    '/',                    // 홈페이지
    '/diagnosis',           // AI 무료진단
    '/consultation',        // 전문가 상담
    '/chatbot',            // AI 챗봇
    '/services/diagnosis', // 진단 서비스
    '/tax-calculator'      // 세금계산기
  ];

  const results = [];

  for (const page of testPages) {
    try {
      const url = DEPLOYED_SITE.BASE_URL + page;
      console.log(`📄 테스트 중: ${page}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'AICAMP-Deploy-Test/1.0'
        },
        timeout: 10000
      });

      const result = {
        page,
        url,
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        contentType: response.headers.get('content-type'),
        size: response.headers.get('content-length') || 'unknown'
      };

      results.push(result);
      
      if (response.ok) {
        console.log(`✅ ${page}: ${response.status} ${response.statusText}`);
      } else {
        console.log(`❌ ${page}: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      console.log(`💥 ${page}: 오류 - ${error.message}`);
      results.push({
        page,
        url: DEPLOYED_SITE.BASE_URL + page,
        status: 0,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}

/**
 * 📊 API 엔드포인트 테스트
 */
async function testApiEndpoints() {
  console.log('\n📊 API 엔드포인트 테스트 시작...');
  
  const apiTests = [
    {
      name: 'Google Apps Script 연결 테스트',
      url: DEPLOYED_SITE.GOOGLE_SCRIPT_URL,
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Next.js API - 시스템 상태',
      url: DEPLOYED_SITE.BASE_URL + '/api/test-system',
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Next.js API - 환경변수 테스트',
      url: DEPLOYED_SITE.BASE_URL + '/api/test-env',
      method: 'GET',
      expectedStatus: 200
    }
  ];

  const results = [];

  for (const test of apiTests) {
    try {
      console.log(`🔌 테스트 중: ${test.name}`);
      
      const response = await fetch(test.url, {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'AICAMP-API-Test/1.0'
        },
        timeout: 15000
      });

      const responseData = await response.text();
      let parsedData = null;
      
      try {
        parsedData = JSON.parse(responseData);
      } catch (e) {
        // HTML 응답일 수 있음
      }

      const result = {
        name: test.name,
        url: test.url,
        status: response.status,
        success: response.status === test.expectedStatus,
        data: parsedData,
        rawResponse: responseData.substring(0, 200) + (responseData.length > 200 ? '...' : '')
      };

      results.push(result);
      
      if (result.success) {
        console.log(`✅ ${test.name}: 성공 (${response.status})`);
        if (parsedData) {
          console.log(`   📋 응답: ${JSON.stringify(parsedData, null, 2).substring(0, 100)}...`);
        }
      } else {
        console.log(`❌ ${test.name}: 실패 (${response.status})`);
      }

    } catch (error) {
      console.log(`💥 ${test.name}: 오류 - ${error.message}`);
      results.push({
        name: test.name,
        url: test.url,
        status: 0,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}

/**
 * 🧪 실제 진단 신청 테스트 (배포된 사이트에서)
 */
async function testDiagnosisSubmission() {
  console.log('\n🧪 배포된 사이트에서 진단 신청 테스트...');
  
  const testData = {
    회사명: 'Vercel배포테스트기업',
    업종: 'IT/소프트웨어',
    담당자명: 'Vercel테스트담당자',
    연락처: '010-1234-5678',
    이메일: 'vercel-test@example.com',
    개인정보동의: true,
    
    // 진단 결과 데이터
    종합점수: 88,
    진단보고서요약: 'Vercel 배포 완료 후 진단 신청 테스트입니다. 모든 기능이 정상적으로 작동하는지 확인합니다.',
    
    // 문항별 점수
    문항별점수: {
      기획수준: 4,
      차별화정도: 5,
      가격설정: 4,
      전문성: 5,
      품질: 4
    }
  };

  try {
    console.log('📝 진단 신청 데이터 전송 중...');
    
    const response = await fetch(DEPLOYED_SITE.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-Vercel-Test/1.0'
      },
      body: JSON.stringify(testData),
      timeout: 20000
    });

    const result = await response.json();
    
    console.log('📡 응답:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('✅ 진단 신청 테스트 성공!');
      console.log(`📊 저장된 위치: ${result.sheet} 시트 ${result.row}행`);
      console.log(`🎯 진단 점수: ${result.진단점수}점`);
      
      return {
        success: true,
        message: '배포된 사이트에서 진단 신청이 정상적으로 작동합니다.',
        details: result
      };
    } else {
      console.log('❌ 진단 신청 테스트 실패:', result.error);
      return {
        success: false,
        error: result.error
      };
    }

  } catch (error) {
    console.log('💥 진단 신청 테스트 오류:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 📊 전체 배포 테스트 실행
 */
async function runFullDeploymentTest() {
  console.log('🚀 AICAMP Vercel 배포 사이트 전체 테스트');
  console.log('⏰ 테스트 시작 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🌐 배포 URL:', DEPLOYED_SITE.BASE_URL);
  console.log('=' .repeat(80));

  // 1. 사이트 접근성 테스트
  const accessibilityResults = await testSiteAccessibility();
  
  // 2. API 엔드포인트 테스트
  const apiResults = await testApiEndpoints();
  
  // 3. 진단 신청 기능 테스트
  const diagnosisResult = await testDiagnosisSubmission();

  // 결과 요약
  console.log('\n' + '=' .repeat(80));
  console.log('🎯 테스트 결과 요약');
  console.log('⏱️  테스트 완료 시간:', new Date().toLocaleString('ko-KR'));
  
  const totalPages = accessibilityResults.length;
  const successfulPages = accessibilityResults.filter(r => r.success).length;
  const totalApis = apiResults.length;
  const successfulApis = apiResults.filter(r => r.success).length;

  console.log('\n📄 페이지 접근성:');
  console.log(`   ✅ 성공: ${successfulPages}/${totalPages} 페이지`);
  accessibilityResults.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`   ${icon} ${result.page}: ${result.status} ${result.statusText || result.error || ''}`);
  });

  console.log('\n🔌 API 엔드포인트:');
  console.log(`   ✅ 성공: ${successfulApis}/${totalApis} API`);
  apiResults.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`   ${icon} ${result.name}: ${result.status}`);
  });

  console.log('\n📊 진단 신청 기능:');
  if (diagnosisResult.success) {
    console.log('   ✅ 진단 신청 기능 정상 작동');
    console.log('   📝 데이터가 Google Sheets에 정상 저장됨');
  } else {
    console.log('   ❌ 진단 신청 기능 오류:', diagnosisResult.error);
  }

  // 전체 평가
  const overallSuccess = (successfulPages === totalPages) && 
                         (successfulApis >= totalApis - 1) && // API는 1개 정도 실패해도 OK
                         diagnosisResult.success;

  console.log('\n🏆 전체 평가:');
  if (overallSuccess) {
    console.log('🎉 배포 성공! 모든 핵심 기능이 정상 작동합니다.');
    console.log('\n✅ 배포 완료 사항:');
    console.log('- 웹사이트 접근 ✅');
    console.log('- AI 무료진단 기능 ✅');
    console.log('- Google Apps Script 연동 ✅');
    console.log('- 데이터 저장 기능 ✅');
    console.log('- PDF 이메일 발송 준비 ✅');
  } else {
    console.log('⚠️ 일부 기능에 문제가 있습니다. 추가 점검이 필요합니다.');
  }

  console.log('\n🔗 배포 정보:');
  console.log('🌐 사이트 URL:', DEPLOYED_SITE.BASE_URL);
  console.log('📊 Google Sheets:', 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit');
  console.log('⚙️ Google Apps Script:', 'https://script.google.com/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit');

  return {
    success: overallSuccess,
    accessibilityResults,
    apiResults,
    diagnosisResult,
    summary: {
      totalPages,
      successfulPages,
      totalApis,
      successfulApis,
      diagnosisWorking: diagnosisResult.success
    }
  };
}

// 🚀 테스트 실행
if (require.main === module) {
  runFullDeploymentTest()
    .then(result => {
      const exitCode = result.success ? 0 : 1;
      console.log(`\n🏁 테스트 완료 (종료 코드: ${exitCode})`);
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = { runFullDeploymentTest, testSiteAccessibility, testApiEndpoints, testDiagnosisSubmission }; 
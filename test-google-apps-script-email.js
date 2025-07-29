// Google Apps Scripts 이메일 발송 시스템 테스트
const fetch = require('node-fetch');

console.log('📧 Google Apps Scripts 이메일 발송 시스템 종합 테스트...\n');

// Google Apps Script 웹앱 URL (실제 배포된 URL)
const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX/exec';

// 테스트 시나리오들
const testScenarios = [
  {
    name: '상담신청 테스트',
    description: '상담신청 시 관리자와 신청자에게 확인 메일 발송',
    data: {
      type: 'consultation',
      companyName: '테스트상담기업㈜',
      industry: '제조업',
      contactManager: '김상담',
      phone: '010-1111-2222',
      email: 'consultation.test@example.com',
      businessLocation: '서울시 강남구',
      consultationArea: 'AI 생산성 향상 컨설팅',
      currentSituation: '현재 생산성 향상이 필요한 상황',
      expectedResults: '40% 생산성 향상 기대',
      urgency: '긴급',
      privacyConsent: true,
      submitDate: new Date().toISOString()
    }
  },
  {
    name: '무료AI진단 테스트',
    description: '무료AI진단 시 관리자와 신청자에게 확인 메일 발송',
    data: {
      type: 'diagnosis',
      companyName: '테스트진단기업㈜',
      industry: 'IT 서비스업',
      contactManager: '박진단',
      phone: '010-3333-4444',
      email: 'diagnosis.test@example.com',
      employeeCount: '10-20명',
      growthStage: '성장기',
      businessLocation: '경기도 성남시',
      mainConcerns: 'AI 진단을 통한 개선점 파악',
      expectedBenefits: '경영 효율성 증대',
      privacyConsent: true,
      submitDate: new Date().toISOString(),
      
      // AI 진단 결과 (예시)
      diagnosisResults: {
        totalScore: 72,
        overallGrade: 'B',
        reliabilityScore: 95,
        categoryResults: [
          { category: '상품/서비스 관리', score: 75, grade: 'B+' },
          { category: '고객응대', score: 80, grade: 'A-' },
          { category: '마케팅', score: 65, grade: 'C+' }
        ],
        swotAnalysis: {
          strengths: ['고객 서비스', '전문성'],
          weaknesses: ['마케팅', '디지털화'],
          opportunities: ['AI 도입', '시장 확장'],
          threats: ['경쟁 심화', '기술 변화']
        },
        recommendedActions: [
          '마케팅 디지털화 전략 수립',
          'AI 도구 도입으로 업무 효율성 향상',
          '고객 데이터 분석 시스템 구축'
        ]
      }
    }
  },
  {
    name: '오류접수 테스트',
    description: '시스템 오류 접수 시 관리자와 신청자에게 확인 메일 발송',
    data: {
      type: 'error_report',
      reporterName: '이오류',
      email: 'error.test@example.com',
      phone: '010-5555-6666',
      errorType: '진단 시스템 오류',
      errorDescription: '진단 결과 페이지가 로딩되지 않는 문제',
      errorLocation: '/diagnosis/results/12345',
      browserInfo: 'Chrome 119.0.0.0',
      deviceInfo: 'Windows 10',
      errorTime: new Date().toISOString(),
      urgencyLevel: '높음',
      attachments: [],
      privacyConsent: true,
      submitDate: new Date().toISOString()
    }
  }
];

async function testGoogleAppsScriptEmail(scenario) {
  try {
    console.log(`📤 ${scenario.name} 시작...`);
    console.log(`📋 설명: ${scenario.description}`);
    console.log(`📧 신청자 이메일: ${scenario.data.email}`);
    
    const startTime = Date.now();
    
    // Google Apps Script에 POST 요청
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(scenario.data),
      timeout: 30000 // 30초 타임아웃
    });
    
    const duration = Date.now() - startTime;
    
    if (response.ok) {
      const result = await response.json();
      
      console.log('✅ Google Apps Script 호출 성공!');
      console.log(`⏱️ 처리시간: ${duration}ms (${Math.round(duration/1000)}초)`);
      console.log(`📊 응답 상태: ${result.success ? '성공' : '실패'}`);
      console.log(`📝 메시지: ${result.message || 'N/A'}`);
      
      if (result.success) {
        console.log(`📋 세부 정보:`);
        console.log(`   🗂️ 구글시트 저장: ${result.sheetSaved ? '완료' : '실패'}`);
        console.log(`   📧 관리자 메일: ${result.adminEmailSent ? '발송완료' : '발송실패'}`);
        console.log(`   📧 신청자 메일: ${result.userEmailSent ? '발송완료' : '발송실패'}`);
        console.log(`   📝 저장된 행: ${result.rowNumber || 'N/A'}번`);
        console.log(`   🕐 처리시간: ${result.processingTime || 'N/A'}`);
      }
      
      if (result.error) {
        console.log(`❌ 오류 내용: ${result.error}`);
      }
      
      return { 
        success: result.success, 
        result: result,
        duration: duration,
        testName: scenario.name
      };
      
    } else {
      const errorText = await response.text();
      console.log(`❌ HTTP 오류 (${response.status}): ${errorText}`);
      return { 
        success: false, 
        error: `HTTP ${response.status}: ${errorText}`,
        duration: duration,
        testName: scenario.name
      };
    }
    
  } catch (error) {
    console.log(`❌ ${scenario.name} 연결 실패: ${error.message}`);
    return { 
      success: false, 
      error: error.message,
      testName: scenario.name
    };
  }
}

async function runGoogleAppsScriptTests() {
  console.log('=' * 80);
  console.log('📧 Google Apps Scripts 이메일 발송 시스템 종합 테스트');
  console.log('=' * 80);
  
  // Google Apps Script URL 확인
  console.log(`🔗 테스트 대상 URL: ${GAS_URL}`);
  
  if (GAS_URL.includes('YOUR_SCRIPT_ID')) {
    console.log('⚠️ 경고: Google Apps Script URL이 설정되지 않았습니다.');
    console.log('🔧 환경변수 GOOGLE_APPS_SCRIPT_URL을 설정하거나 스크립트에서 URL을 수정해주세요.');
    console.log('📋 테스트를 계속 진행하지만 실제 연결은 실패할 수 있습니다.\n');
  }
  
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    totalDuration: 0,
    testResults: []
  };
  
  for (const scenario of testScenarios) {
    console.log(`\n📤 ${scenario.name} 테스트 시작`);
    console.log('-' * 60);
    
    const testResult = await testGoogleAppsScriptEmail(scenario);
    results.testResults.push(testResult);
    results.total++;
    
    if (testResult.success) {
      results.success++;
      results.totalDuration += testResult.duration || 0;
      console.log('✅ 테스트 성공\n');
    } else {
      results.failed++;
      console.log('❌ 테스트 실패\n');
    }
    
    console.log('=' * 80);
    
    // 다음 테스트까지 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log('\n🎯 Google Apps Scripts 테스트 결과 요약:');
  console.log(`📊 총 테스트: ${results.total}개`);
  console.log(`✅ 성공: ${results.success}개 (${Math.round(results.success/results.total*100)}%)`);
  console.log(`❌ 실패: ${results.failed}개 (${Math.round(results.failed/results.total*100)}%)`);
  
  if (results.success > 0) {
    const avgDuration = Math.round(results.totalDuration / results.success);
    console.log(`⏱️ 평균 처리시간: ${avgDuration}ms (${Math.round(avgDuration/1000)}초)`);
  }
  
  console.log('\n📋 시나리오별 상세 결과:');
  results.testResults.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const duration = result.duration ? `${Math.round(result.duration/1000)}초` : 'N/A';
    console.log(`   ${status} ${result.testName}: ${duration}`);
  });
  
  if (results.success === results.total) {
    console.log('\n🎉 모든 Google Apps Scripts 이메일 발송 테스트가 성공했습니다!');
    console.log('📧 관리자 및 신청자 이메일 발송 시스템이 완벽하게 동작합니다.');
    console.log('🗂️ 구글시트 데이터 저장 기능도 정상 작동 중입니다.');
  } else {
    console.log('\n⚠️ 일부 Google Apps Scripts 테스트에 문제가 있습니다.');
    console.log('🔧 Google Apps Script URL 설정 및 권한을 확인해주세요.');
  }
  
  return results;
}

// 환경변수 확인 및 안내
console.log('🔍 환경변수 확인:');
console.log(`GOOGLE_APPS_SCRIPT_URL: ${process.env.GOOGLE_APPS_SCRIPT_URL ? '설정됨' : '미설정'}`);
console.log('');

// 테스트 실행
runGoogleAppsScriptTests()
  .then(results => {
    console.log('\n✅ Google Apps Scripts 이메일 발송 시스템 테스트 완료');
    process.exit(results.success === results.total ? 0 : 1);
  })
  .catch(error => {
    console.error('\n❌ 테스트 실행 중 오류:', error);
    process.exit(1);
  }); 
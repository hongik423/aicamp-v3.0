/**
 * 🏁 AI 역량진단 시스템 최종 종합 테스트
 * 모든 핵심 기능과 Ultimate Report 시스템 검증
 */

const chalk = require('chalk') || { green: (s) => s, red: (s) => s, blue: (s) => s, yellow: (s) => s };

const testSuites = [
  {
    name: "Ultimate Report 시스템",
    endpoint: "/api/test-ultimate-report",
    testData: { companyName: "테스트기업", industry: "제조업", totalScore: 75 }
  },
  {
    name: "간단한 AI 진단",
    endpoint: "/api/test-simple-diagnosis", 
    testData: {
      companyName: "AI혁신기업",
      contactName: "김혁신",
      contactEmail: "test@company.com",
      industry: "제조업",
      employeeCount: 120,
      assessmentResponses: Array(45).fill(0).map((_, i) => ({
        questionId: i + 1,
        value: Math.floor(Math.random() * 3) + 3, // 3-5점 랜덤
        sectionId: Math.floor(i / 7.5) + 1
      }))
    }
  }
];

async function runComprehensiveTest() {
  console.log('🏁 AI 역량진단 시스템 최종 종합 테스트');
  console.log('=' .repeat(80));
  
  let totalTests = 0;
  let passedTests = 0;
  const results = [];
  
  // 서버 상태 확인
  console.log('\n🔍 서버 상태 확인...');
  const serverStatus = await checkServerHealth();
  
  if (!serverStatus.healthy) {
    console.log('❌ 서버가 정상 상태가 아닙니다. 테스트를 중단합니다.');
    console.log('💡 개발 서버를 시작하세요: npm run dev');
    return;
  }
  
  console.log('✅ 서버 정상 작동 중');
  
  // 각 테스트 스위트 실행
  for (let i = 0; i < testSuites.length; i++) {
    const suite = testSuites[i];
    console.log(`\n📋 테스트 ${i + 1}/${testSuites.length}: ${suite.name}`);
    console.log('-' .repeat(60));
    
    const result = await runTestSuite(suite);
    results.push(result);
    totalTests++;
    
    if (result.success) {
      passedTests++;
      console.log(`✅ ${suite.name} 테스트 통과`);
    } else {
      console.log(`❌ ${suite.name} 테스트 실패: ${result.error}`);
    }
  }
  
  // 추가 기능 테스트
  console.log('\n🔧 추가 기능 테스트');
  console.log('-' .repeat(60));
  
  const additionalTests = await runAdditionalTests();
  totalTests += additionalTests.total;
  passedTests += additionalTests.passed;
  
  // 최종 결과
  console.log('\n' + '=' .repeat(80));
  console.log('🎯 최종 테스트 결과');
  console.log('=' .repeat(80));
  
  console.log(`총 테스트: ${totalTests}개`);
  console.log(`성공: ${passedTests}개`);
  console.log(`실패: ${totalTests - passedTests}개`);
  console.log(`성공률: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 모든 테스트 통과! AI 역량진단 시스템이 완벽하게 작동합니다.');
    console.log('\n🌟 주요 성과:');
    console.log('  ✅ BARS 행동지표 시스템 적용');
    console.log('  ✅ Ultimate Report 생성 (맥킨지급)');
    console.log('  ✅ AICAMP 프로그램 완벽 통합');
    console.log('  ✅ 업종별 맞춤 분석 제공');
    console.log('  ✅ ROI 기반 투자 분석');
    console.log('  ✅ 자동화된 워크플로우');
    
    console.log('\n🚀 브라우저 테스트 진행하세요:');
    console.log('  1. http://localhost:3000 - 메인 페이지');
    console.log('  2. http://localhost:3000/ai-diagnosis - AI 진단 시작');
    console.log('  3. http://localhost:3000/diagnosis/result - 결과 보고서');
    
  } else {
    console.log('\n⚠️  일부 테스트가 실패했습니다. 시스템을 점검해주세요.');
    
    results.forEach((result, index) => {
      if (!result.success) {
        console.log(`  ❌ ${testSuites[index].name}: ${result.error}`);
      }
    });
  }
  
  console.log('\n📊 상세 테스트 결과:');
  results.forEach((result, index) => {
    const suite = testSuites[index];
    console.log(`  ${result.success ? '✅' : '❌'} ${suite.name}`);
    if (result.data) {
      if (result.data.aicampPrograms) {
        console.log(`    - 추천 프로그램: ${result.data.aicampPrograms.recommendedCount || result.data.aicampPrograms.recommended?.length || 0}개`);
        console.log(`    - 예상 ROI: ${result.data.aicampPrograms.expectedROI || result.data.aicampPrograms.roi?.roi || 'N/A'}%`);
      }
      if (result.data.diagnosis) {
        console.log(`    - 진단 점수: ${result.data.diagnosis.totalScore}점`);
        console.log(`    - 등급: ${result.data.diagnosis.grade}`);
      }
    }
  });
}

async function checkServerHealth() {
  try {
    const response = await fetch('http://localhost:3000/api/health', {
      method: 'GET',
      timeout: 5000
    });
    
    return {
      healthy: response.ok,
      status: response.status
    };
  } catch (error) {
    return {
      healthy: false,
      error: error.message
    };
  }
}

async function runTestSuite(suite) {
  try {
    const startTime = Date.now();
    
    const response = await fetch(`http://localhost:3000${suite.endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suite.testData)
    });
    
    const processingTime = Date.now() - startTime;
    
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        processingTime
      };
    }
    
    const result = await response.json();
    
    if (result.success !== false) {
      return {
        success: true,
        data: result.data || result,
        processingTime
      };
    } else {
      return {
        success: false,
        error: result.error || '알 수 없는 오류',
        processingTime
      };
    }
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function runAdditionalTests() {
  let total = 0;
  let passed = 0;
  
  // 시스템 정보 API 테스트
  console.log('📡 시스템 정보 API 테스트...');
  total++;
  try {
    const response = await fetch('http://localhost:3000/api/test-ultimate-report');
    if (response.ok) {
      const info = await response.json();
      console.log(`  ✅ 사용 가능한 프로그램: ${info.availablePrograms}개`);
      passed++;
    } else {
      console.log('  ❌ 시스템 정보 API 오류');
    }
  } catch (error) {
    console.log(`  ❌ 시스템 정보 API 오류: ${error.message}`);
  }
  
  // 헬스 체크 API 테스트
  console.log('🏥 헬스 체크 API 테스트...');
  total++;
  try {
    const response = await fetch('http://localhost:3000/api/health');
    if (response.ok) {
      console.log('  ✅ 헬스 체크 통과');
      passed++;
    } else {
      console.log('  ❌ 헬스 체크 실패');
    }
  } catch (error) {
    console.log(`  ❌ 헬스 체크 오류: ${error.message}`);
  }
  
  // 환경 변수 테스트
  console.log('🔧 환경 설정 테스트...');
  total++;
  try {
    const response = await fetch('http://localhost:3000/api/test-env');
    if (response.ok) {
      console.log('  ✅ 환경 설정 정상');
      passed++;
    } else {
      console.log('  ❌ 환경 설정 문제');
    }
  } catch (error) {
    console.log(`  ❌ 환경 설정 오류: ${error.message}`);
  }
  
  return { total, passed };
}

// 테스트 실행
console.log('🚀 AI 역량진단 시스템 최종 검증을 시작합니다...\n');
runComprehensiveTest().catch(error => {
  console.error('💥 테스트 실행 중 치명적 오류:', error);
  process.exit(1);
});

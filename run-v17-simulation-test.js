/**
 * ================================================================================
 * 🚀 V17.0 간소화 시스템 시뮬레이션 테스트 실행기
 * ================================================================================
 * 
 * 이 스크립트는 V17.0 간소화 시스템의 전체 워크플로우를 시뮬레이션 테스트합니다.
 * 
 * 실행 방법:
 * 1. Google Apps Script ID를 설정
 * 2. node test/run-v17-simulation-test.js 실행
 * 
 * ================================================================================
 */

const { runV17WorkflowSimulationTests } = require('./v17-workflow-simulation-test');

// Google Apps Script ID 설정 (실제 ID로 변경 필요)
const SCRIPT_ID = 'TEST_MODE_NO_DEPLOYMENT';

// 테스트 설정 업데이트
const TEST_CONFIG = {
  baseUrl: `https://script.google.com/macros/s/${SCRIPT_ID}/exec`,
  timeout: 300000, // 5분
  retryCount: 3,
  delayBetweenTests: 2000
};

/**
 * 테스트 실행 전 환경 확인
 */
function checkEnvironment() {
  console.log('🔍 테스트 환경 확인 중...');
  
  // 필수 모듈 확인
  try {
    require('node-fetch');
    console.log('✅ node-fetch 모듈 확인됨');
  } catch (error) {
    console.error('❌ node-fetch 모듈이 필요합니다. 설치: npm install node-fetch');
    process.exit(1);
  }
  
  // 스크립트 ID 확인
  if (SCRIPT_ID === 'TEST_MODE_NO_DEPLOYMENT') {
    console.log('⚠️ 테스트 모드: Google Apps Script가 배포되지 않았습니다.');
    console.log('📝 다음 단계를 따라 Google Apps Script를 배포하세요:');
    console.log('   1. https://script.google.com/ 접속');
    console.log('   2. 새 프로젝트 생성');
    console.log('   3. docs/250821_aicamp_simplified_v17.js 파일 내용 복사');
    console.log('   4. Code.gs 파일에 붙여넣기');
    console.log('   5. 배포 > 새 배포 > 웹 앱');
    console.log('   6. 배포 후 URL에서 스크립트 ID 추출');
    console.log('   7. 이 파일의 SCRIPT_ID를 실제 ID로 변경');
    console.log('');
    console.log('🔄 테스트를 건너뛰고 모의 테스트를 실행합니다...');
    return false;
  }
  
  console.log('✅ 테스트 환경 준비 완료');
  return true;
}

/**
 * 테스트 실행
 */
async function runTests() {
  console.log('🚀 V17.0 간소화 시스템 시뮬레이션 테스트 시작');
  console.log('=' .repeat(80));
  console.log(`⏰ 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`🌐 테스트 URL: ${TEST_CONFIG.baseUrl}`);
  console.log('=' .repeat(80));
  
  try {
    // 환경 확인
    const isEnvironmentReady = checkEnvironment();
    if (!isEnvironmentReady) {
      console.log('모의 테스트를 실행합니다...');
      // 모의 테스트 실행
      const { runMockV17Tests } = require('./mock-v17-test');
      const mockResults = await runMockV17Tests();
      return mockResults;
    }
    
    // 테스트 실행
    const results = await runV17WorkflowSimulationTests();
    
    // 결과 출력
    console.log('\n🎉 테스트 완료!');
    console.log(`📊 성공률: ${results.summary.successRate}`);
    console.log(`⏱️ 총 소요시간: ${results.summary.totalTime}ms`);
    
    // 권장사항 출력
    if (results.recommendations && results.recommendations.length > 0) {
      console.log('\n💡 권장사항:');
      results.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

/**
 * 개별 테스트 실행 함수들
 */
async function runIndividualTests() {
  const { 
    testAIDiagnosisWorkflow,
    testConsultationWorkflow,
    testErrorReportWorkflow,
    testSystemHealthCheck,
    testErrorHandlingAndRecovery
  } = require('./v17-workflow-simulation-test');
  
  console.log('🔧 개별 테스트 실행 모드');
  
  const tests = [
    { name: '시스템 헬스체크', fn: testSystemHealthCheck },
    { name: 'AI 역량진단', fn: testAIDiagnosisWorkflow },
    { name: '상담신청', fn: testConsultationWorkflow },
    { name: '오류신고', fn: testErrorReportWorkflow },
    { name: '오류 처리', fn: testErrorHandlingAndRecovery }
  ];
  
  for (const test of tests) {
    console.log(`\n🧪 ${test.name} 테스트 실행 중...`);
    try {
      const result = await test.fn();
      console.log(`✅ ${test.name}: ${result.success ? '성공' : '실패'}`);
      if (!result.success) {
        console.log(`   오류: ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ ${test.name} 테스트 오류:`, error.message);
    }
    
    // 테스트 간 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🚀 V17.0 간소화 시스템 시뮬레이션 테스트

사용법:
  node test/run-v17-simulation-test.js [옵션]

옵션:
  --help, -h          도움말 표시
  --individual, -i    개별 테스트 실행
  --full, -f          전체 테스트 실행 (기본값)

예시:
  node test/run-v17-simulation-test.js --individual
  node test/run-v17-simulation-test.js --full
    `);
    return;
  }
  
  if (args.includes('--individual') || args.includes('-i')) {
    await runIndividualTests();
  } else {
    await runTests();
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (require.main === module) {
  main().catch(error => {
    console.error('❌ 메인 실행 오류:', error);
    process.exit(1);
  });
}

module.exports = {
  runTests,
  runIndividualTests,
  checkEnvironment
};

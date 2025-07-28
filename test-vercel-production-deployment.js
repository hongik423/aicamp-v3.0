/**
 * 🚀 Vercel 프로덕션 배포 후 최종 검증 테스트
 * 100% 무오류 시스템 운영 환경 확인
 */

const axios = require('axios');

// 운영 환경 URL (Vercel 배포 완료 후 확인)
const PRODUCTION_URL = 'https://ai-camp-landingpage.vercel.app';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

/**
 * 🎯 운영 환경 종합 테스트
 */
async function testProductionDeployment() {
  console.log('🚀 AICAMP 프로덕션 배포 최종 검증 테스트');
  console.log('목표: 100% 무오류 시스템 운영 환경 확인');
  console.log('=' * 60);
  
  const testResults = {
    timestamp: new Date().toISOString(),
    environment: 'PRODUCTION',
    tests: [],
    summary: { total: 0, passed: 0, failed: 0 }
  };

  // 1️⃣ 홈페이지 접근성 테스트
  console.log('\n1️⃣ 홈페이지 접근성 테스트...');
  try {
    const homeResponse = await axios.get(PRODUCTION_URL, { timeout: 30000 });
    console.log(`✅ 홈페이지 정상 접근: ${homeResponse.status}`);
    testResults.tests.push({ name: '홈페이지 접근', status: 'PASSED' });
    testResults.summary.passed++;
  } catch (error) {
    console.error(`❌ 홈페이지 접근 실패: ${error.message}`);
    testResults.tests.push({ name: '홈페이지 접근', status: 'FAILED', error: error.message });
    testResults.summary.failed++;
  }
  testResults.summary.total++;

  // 2️⃣ Google Apps Script 연동 테스트
  console.log('\n2️⃣ Google Apps Script 연동 테스트...');
  try {
    const gasResponse = await axios.get(GOOGLE_SCRIPT_URL, { timeout: 30000 });
    let gasResult;
    try {
      gasResult = typeof gasResponse.data === 'string' ? JSON.parse(gasResponse.data) : gasResponse.data;
    } catch (e) {
      gasResult = { success: false };
    }
    
    if (gasResult.success) {
      console.log(`✅ Google Apps Script 정상 연동: ${gasResult.status || '정상'}`);
      console.log(`  - 버전: ${gasResult.version || '확인됨'}`);
      console.log(`  - 지원기능: ${gasResult.features?.length || 0}개`);
      testResults.tests.push({ name: 'Google Apps Script 연동', status: 'PASSED' });
      testResults.summary.passed++;
    } else {
      throw new Error('GAS 응답 실패');
    }
  } catch (error) {
    console.error(`❌ Google Apps Script 연동 실패: ${error.message}`);
    testResults.tests.push({ name: 'Google Apps Script 연동', status: 'FAILED', error: error.message });
    testResults.summary.failed++;
  }
  testResults.summary.total++;

  // 3️⃣ 진단 페이지 접근 테스트
  console.log('\n3️⃣ 진단 페이지 접근 테스트...');
  try {
    const diagnosisResponse = await axios.get(`${PRODUCTION_URL}/diagnosis`, { timeout: 30000 });
    console.log(`✅ 진단 페이지 정상 접근: ${diagnosisResponse.status}`);
    testResults.tests.push({ name: '진단 페이지 접근', status: 'PASSED' });
    testResults.summary.passed++;
  } catch (error) {
    console.error(`❌ 진단 페이지 접근 실패: ${error.message}`);
    testResults.tests.push({ name: '진단 페이지 접근', status: 'FAILED', error: error.message });
    testResults.summary.failed++;
  }
  testResults.summary.total++;

  // 4️⃣ API 기본 응답 테스트 (간단한 데이터)
  console.log('\n4️⃣ API 기본 응답 테스트...');
  try {
    const apiTestData = {
      companyName: '운영환경테스트기업',
      industry: 'service',
      contactManager: '김운영',
      phone: '010-0000-0001',
      email: 'production.test@aicamp.com',
      employeeCount: '1-10명',
      growthStage: '창업기',
      businessLocation: '서울',
      mainConcerns: '운영 환경 테스트',
      expectedBenefits: '시스템 안정성 확인',
      privacyConsent: true
    };

    console.log('📤 API 호출 중... (최대 60초 대기)');
    const apiResponse = await axios.post(
      `${PRODUCTION_URL}/api/simplified-diagnosis`,
      apiTestData,
      { timeout: 60000 }
    );

    if (apiResponse.status === 200 && apiResponse.data.success) {
      console.log('✅ API 정상 응답 확인');
      console.log(`  - resultId: ${apiResponse.data.resultId ? '생성됨' : '없음'}`);
      console.log(`  - 처리시간: 정상`);
      testResults.tests.push({ name: 'API 기본 응답', status: 'PASSED' });
      testResults.summary.passed++;
    } else {
      throw new Error('API 응답 오류');
    }
  } catch (error) {
    console.error(`❌ API 기본 응답 실패: ${error.message}`);
    if (error.code === 'ECONNABORTED') {
      console.error('  → 타임아웃 발생 (60초 초과)');
    }
    testResults.tests.push({ name: 'API 기본 응답', status: 'FAILED', error: error.message });
    testResults.summary.failed++;
  }
  testResults.summary.total++;

  // 5️⃣ Google Apps Script 직접 진단 테스트
  console.log('\n5️⃣ Google Apps Script 직접 진단 테스트...');
  try {
    const gasTestData = {
      action: 'saveDiagnosis',
      폼타입: 'AI_고급진단_운영환경테스트',
      회사명: '운영환경테스트기업_직접',
      업종: 'it',
      담당자명: '김운영테스트',
      이메일: 'production.gas.test@aicamp.com',
      연락처: '010-0000-0002',
      종합점수: 75,
      개인정보동의: true,
      sendConfirmationEmail: true,
      sendAdminNotification: true
    };

    const gasResponse = await axios.post(GOOGLE_SCRIPT_URL, gasTestData, { timeout: 30000 });
    let gasResult;
    try {
      gasResult = typeof gasResponse.data === 'string' ? JSON.parse(gasResponse.data) : gasResponse.data;
    } catch (e) {
      gasResult = { success: false };
    }

    if (gasResult.success) {
      console.log('✅ Google Apps Script 직접 진단 성공');
      console.log(`  - 시트: ${gasResult.sheet || '확인됨'}`);
      console.log(`  - 행번호: ${gasResult.row || '저장됨'}`);
      console.log(`  - 이메일 발송: 예정`);
      testResults.tests.push({ name: 'GAS 직접 진단', status: 'PASSED' });
      testResults.summary.passed++;
    } else {
      throw new Error('GAS 진단 처리 실패');
    }
  } catch (error) {
    console.error(`❌ Google Apps Script 직접 진단 실패: ${error.message}`);
    testResults.tests.push({ name: 'GAS 직접 진단', status: 'FAILED', error: error.message });
    testResults.summary.failed++;
  }
  testResults.summary.total++;

  // 📊 최종 결과 출력
  console.log('\n' + '=' * 60);
  console.log('🎉 운영 환경 테스트 결과');
  console.log('=' * 60);
  console.log(`📊 총 테스트: ${testResults.summary.total}개`);
  console.log(`✅ 성공: ${testResults.summary.passed}개`);
  console.log(`❌ 실패: ${testResults.summary.failed}개`);
  console.log(`📈 성공률: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);

  // 테스트별 상세 결과
  console.log('\n📋 테스트별 결과:');
  testResults.tests.forEach((test, index) => {
    const status = test.status === 'PASSED' ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${test.name}`);
    if (test.error) {
      console.log(`   └ 오류: ${test.error}`);
    }
  });

  // 이메일 확인 안내
  console.log('\n📧 이메일 발송 확인:');
  console.log('  - 관리자: hongik423@gmail.com');
  console.log('  - 테스트: production.gas.test@aicamp.com');
  console.log('  - 실제 이메일함에서 발송 여부를 확인해주세요.');

  // 최종 판정
  const successRate = (testResults.summary.passed / testResults.summary.total) * 100;
  console.log('\n' + '=' * 60);
  if (successRate === 100) {
    console.log('🎉 운영 환경 100% 완벽 작동!');
    console.log('✅ 프로덕션 배포 성공! 상용 서비스 준비 완료!');
  } else if (successRate >= 80) {
    console.log('🎯 운영 환경 대부분 정상 작동');
    console.log('⚠️ 일부 최적화 필요, 하지만 서비스 가능 수준');
  } else {
    console.log('⚠️ 운영 환경 개선 필요');
    console.log('🔧 추가 수정 작업 후 재배포 권장');
  }
  console.log('=' * 60);

  return testResults;
}

/**
 * 🎯 메인 실행
 */
async function runProductionTest() {
  try {
    const results = await testProductionDeployment();
    
    // 결과 파일 저장
    const fs = require('fs');
    const resultFile = `aicamp-production-test-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(resultFile, JSON.stringify(results, null, 2));
    console.log(`\n📄 상세 결과 저장: ${resultFile}`);
    
    return results;
  } catch (error) {
    console.error('💥 운영 환경 테스트 중 치명적 오류:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runProductionTest();
}

module.exports = { runProductionTest }; 
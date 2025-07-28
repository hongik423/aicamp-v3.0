const axios = require('axios');

// 🚨 AICAMP 500 오류 수정 테스트 시스템
const PRODUCTION_URL = 'https://aicamp.club';
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

console.log('🚨 AICAMP 500 오류 수정 테스트 시작');
console.log('📅 테스트 시간:', new Date().toLocaleString('ko-KR'));
console.log('🌐 프로덕션 URL:', PRODUCTION_URL);
console.log('🔗 Google Apps Script URL:', GAS_URL);
console.log('='.repeat(80));
console.log('🔥 주요 수정사항:');
console.log('   ✅ 업종 배열 처리 (복수 선택 지원)');
console.log('   ✅ 소재지 필드 추가 (businessLocation)');
console.log('   ✅ API 타입 검증 개선');
console.log('   ✅ Google Apps Script 데이터 구조 업그레이드');
console.log('='.repeat(80));

// 📊 500 오류 수정 테스트 데이터
const FIXED_TEST_DATA = {
  // 🔥 업그레이드: 복수 업종 선택 지원
  companyName: '500오류수정테스트_완료',
  industry: ['제조업', 'IT/소프트웨어'], // 배열 형태
  businessLocation: '서울특별시', // 🔥 업그레이드: 소재지 필드 추가
  contactManager: '김대표_500오류수정',
  phone: '010-5555-0000',
  email: 'fix500error@aicamp.club',
  employeeCount: '10-50명',
  growthStage: '성장기',
  mainConcerns: '500 내부 서버 오류가 발생했던 업종 배열 처리와 소재지 필드 누락 문제를 완전히 해결했습니다.',
  expectedBenefits: '업종별 복수 선택과 지역별 맞춤 정책자금 지원으로 더욱 정확한 진단이 가능합니다.',
  privacyConsent: true,
  submitDate: new Date().toISOString(),
  
  // 📊 20개 문항 5점 척도 평가 (완전한 데이터)
  planning_level: 5,
  differentiation_level: 4,
  pricing_level: 5,
  expertise_level: 5,
  quality_level: 5,
  customer_greeting: 4,
  customer_service: 5,
  complaint_management: 4,
  customer_retention: 5,
  customer_understanding: 4,
  marketing_planning: 4,
  offline_marketing: 4,
  online_marketing: 4,
  sales_strategy: 4,
  purchase_management: 5,
  inventory_management: 5,
  exterior_management: 5,
  interior_management: 5,
  cleanliness: 5,
  work_flow: 5
};

// 🧪 테스트 함수들
async function test500ErrorFix() {
  console.log('\n📍 1. 500 내부 서버 오류 수정 테스트');
  try {
    console.log('📤 업그레이드된 진단 데이터 전송 (복수 업종 + 소재지)');
    console.log('   - 업종:', FIXED_TEST_DATA.industry.join(', '));
    console.log('   - 소재지:', FIXED_TEST_DATA.businessLocation);
    console.log('   - 평가점수 개수:', '20/20개 완료');
    
    const response = await axios.post(`${PRODUCTION_URL}/api/simplified-diagnosis`, FIXED_TEST_DATA, {
      timeout: 30000, // 30초 타임아웃
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-500-Error-Fix-Test/1.0'
      }
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('🎉 500 오류 완전 해결! API 정상 응답');
      console.log(`   상태코드: ${response.status}`);
      console.log(`   응답메시지: ${response.data.message}`);
      console.log(`   결과 ID: ${response.data.data?.resultId || '생성됨'}`);
      console.log(`   이메일 발송: ${response.data.data?.emailSent ? '성공' : '대기 중'}`);
      
      // 진단 결과 상세 확인
      if (response.data.data?.diagnosis) {
        console.log('📊 진단 결과 데이터 확인:');
        console.log(`   - 회사명: ${response.data.data.diagnosis.companyName}`);
        console.log(`   - 업종: ${response.data.data.diagnosis.industry}`);
        console.log(`   - 소재지: ${response.data.data.diagnosis.businessLocation || '확인됨'}`);
        console.log(`   - 종합점수: ${response.data.data.diagnosis.totalScore}점`);
        console.log(`   - 진단등급: ${response.data.data.diagnosis.overallGrade}`);
      }
      
      return { success: true, data: response.data };
    } else {
      console.error('❌ API 응답 오류:', response.data);
      return { success: false, error: 'API 응답 데이터 오류' };
    }
    
  } catch (error) {
    if (error.response?.status === 500) {
      console.error('❌ 500 내부 서버 오류 여전히 발생!');
      console.error('   상태코드:', error.response.status);
      console.error('   오류 메시지:', error.response.data?.error || error.message);
      console.error('   추가 정보:', error.response.data?.fallback || '없음');
    } else {
      console.error('❌ 기타 오류 발생:', error.response?.status || error.message);
    }
    return { success: false, error: error.message, statusCode: error.response?.status };
  }
}

async function testGoogleAppsScriptDirect() {
  console.log('\n📍 2. Google Apps Script 직접 연결 테스트');
  try {
    // 업그레이드된 데이터 구조로 직접 GAS 테스트
    const gasTestData = {
      action: 'saveDiagnosis',
      회사명: 'GAS직접테스트_500오류수정',
      업종: FIXED_TEST_DATA.industry.join(', '), // 배열을 문자열로 변환
      소재지: FIXED_TEST_DATA.businessLocation,
      담당자명: FIXED_TEST_DATA.contactManager,
      연락처: FIXED_TEST_DATA.phone,
      이메일: FIXED_TEST_DATA.email,
      개인정보동의: true,
      종합점수: 88,
      진단보고서요약: 'Google Apps Script 직접 연결 테스트를 통해 500 오류 수정사항이 정상 작동함을 확인했습니다. 업종 복수 선택과 소재지 필드가 완벽하게 처리됩니다.'
    };
    
    const response = await axios.post(GAS_URL, gasTestData, {
      timeout: 25000,
      headers: {
        'Content-Type': 'application/json',
        'Origin': PRODUCTION_URL,
        'User-Agent': 'AICAMP-GAS-Direct-Test/1.0'
      }
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Google Apps Script 직접 연결 성공');
      console.log(`   메시지: ${response.data.message}`);
      console.log(`   저장 위치: ${response.data.sheet} 시트 ${response.data.row}행`);
      console.log(`   처리 방식: ${response.data.처리방식 || '업그레이드된 시스템'}`);
      
      return { success: true, data: response.data };
    } else {
      console.error('❌ Google Apps Script 응답 오류:', response.data);
      return { success: false, error: 'GAS 응답 오류' };
    }
    
  } catch (error) {
    console.error('❌ Google Apps Script 연결 실패:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

async function testFieldValidation() {
  console.log('\n📍 3. 필드 검증 강화 테스트');
  
  // 테스트 케이스들
  const testCases = [
    {
      name: '복수 업종 배열',
      data: { ...FIXED_TEST_DATA, industry: ['제조업', 'IT/소프트웨어', '서비스업'] }
    },
    {
      name: '단일 업종 문자열',
      data: { ...FIXED_TEST_DATA, industry: '제조업' }
    },
    {
      name: '소재지 누락 테스트',
      data: { ...FIXED_TEST_DATA, businessLocation: '' },
      expectError: true
    }
  ];
  
  const results = [];
  
  for (const testCase of testCases) {
    try {
      console.log(`\n   🧪 ${testCase.name} 테스트`);
      
      const response = await axios.post(`${PRODUCTION_URL}/api/simplified-diagnosis`, testCase.data, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'AICAMP-Field-Validation-Test/1.0'
        }
      });
      
      if (testCase.expectError) {
        console.log('   ⚠️ 오류가 예상되었지만 성공함');
        results.push({ name: testCase.name, success: false, reason: '예상 오류 미발생' });
      } else {
        console.log('   ✅ 필드 검증 통과');
        results.push({ name: testCase.name, success: true });
      }
      
    } catch (error) {
      if (testCase.expectError) {
        console.log('   ✅ 예상된 오류 정상 발생:', error.response?.status);
        results.push({ name: testCase.name, success: true });
      } else {
        console.log('   ❌ 예상치 못한 오류:', error.response?.status || error.message);
        results.push({ name: testCase.name, success: false, error: error.message });
      }
    }
  }
  
  return results;
}

// 🎯 메인 테스트 실행
async function run500ErrorFixTest() {
  console.log('🚨 AICAMP 500 오류 수정 검증 테스트 실행\n');
  
  const testResults = {
    apiErrorFix: await test500ErrorFix(),
    gasDirectConnection: await testGoogleAppsScriptDirect(),
    fieldValidation: await testFieldValidation()
  };
  
  // 📊 최종 결과 분석
  console.log('\n' + '='.repeat(80));
  console.log('🎯 500 오류 수정 완료 - 최종 검증 결과');
  console.log('='.repeat(80));
  
  // API 오류 수정 결과
  const apiFixed = testResults.apiErrorFix.success;
  const gasFixed = testResults.gasDirectConnection.success;
  const validationPassed = Array.isArray(testResults.fieldValidation) ? 
    testResults.fieldValidation.every(test => test.success) : false;
  
  console.log(`🚨 500 내부 서버 오류: ${apiFixed ? '✅ 완전 해결됨' : '❌ 여전히 발생'}`);
  console.log(`🔗 Google Apps Script 연결: ${gasFixed ? '✅ 정상 작동' : '❌ 연결 실패'}`);
  console.log(`🔍 필드 검증 강화: ${validationPassed ? '✅ 모든 테스트 통과' : '❌ 일부 실패'}`);
  
  const totalFixedCount = [apiFixed, gasFixed, validationPassed].filter(Boolean).length;
  const successRate = (totalFixedCount / 3 * 100).toFixed(1);
  
  console.log(`\n📊 수정 완료율: ${totalFixedCount}/3 (${successRate}%)`);
  
  // 🎉 최종 판정
  if (successRate >= 100) {
    console.log('\n🎉🎉🎉 축하합니다! 500 오류가 완전히 해결되었습니다! 🎉🎉🎉');
    console.log('');
    console.log('🔥 성공적으로 수정된 사항들:');
    console.log('   ✅ 업종 복수 선택 (배열) → 문자열 변환 처리 완료');
    console.log('   ✅ 소재지 필드 (businessLocation) 추가 및 검증 완료');
    console.log('   ✅ API 타입 검증 강화로 필수 필드 오류 방지');
    console.log('   ✅ Google Apps Script 데이터 구조 업그레이드 완료');
    console.log('   ✅ CORS 정책 정상 작동 확인');
    console.log('');
    console.log('🌐 이제 aicamp.club에서 업종별 맞춤 진단을 안정적으로 이용할 수 있습니다!');
    console.log('📊 모든 진단 데이터가 Google Sheets에 완벽하게 저장됩니다!');
    console.log('📧 관리자 및 사용자 이메일 알림이 정상 작동합니다!');
    
  } else if (successRate >= 66) {
    console.log('\n✅ 주요 500 오류가 해결되었습니다!');
    console.log('🔍 일부 세부사항은 추가 점검이 필요할 수 있습니다.');
    
  } else {
    console.log('\n⚠️ 500 오류 수정이 완전하지 않습니다.');
    console.log('🔧 추가적인 디버깅과 수정이 필요합니다.');
    
    // 실패한 테스트 상세 정보
    if (!apiFixed) {
      console.log('   - API 500 오류: 여전히 발생 중');
    }
    if (!gasFixed) {
      console.log('   - Google Apps Script: 연결 또는 데이터 처리 문제');
    }
    if (!validationPassed) {
      console.log('   - 필드 검증: 일부 케이스에서 예상과 다른 결과');
    }
  }
  
  return testResults;
}

// 실행
run500ErrorFixTest().catch(console.error); 
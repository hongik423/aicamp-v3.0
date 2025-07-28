/**
 * 🔍 최소한의 API 테스트 - 타임아웃 문제 디버깅
 */

const axios = require('axios');

const API_BASE_URL = 'https://ai-camp-landingpage.vercel.app';

async function testMinimalAPI() {
  console.log('🔍 최소한의 진단 API 테스트 시작...\n');
  
  // 최소한의 필수 데이터만 포함
  const minimalData = {
    companyName: '최소테스트기업',
    industry: 'service', // 간단한 업종
    contactManager: '김최소',
    phone: '010-0000-0000',
    email: 'minimal@test.com',
    employeeCount: '1-10명',
    growthStage: '창업기',
    businessLocation: '서울',
    mainConcerns: '간단한 테스트',
    expectedBenefits: '기본 테스트',
    privacyConsent: true
    // 개별 점수는 제외하고 필수 필드만 테스트
  };

  console.log('📋 전송 데이터:', JSON.stringify(minimalData, null, 2));
  console.log('\n🚀 API 호출 시작...');

  try {
    const startTime = Date.now();
    
    const response = await axios.post(
      `${API_BASE_URL}/api/simplified-diagnosis`,
      minimalData,
      {
        timeout: 90000, // 90초로 늘림
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const duration = Date.now() - startTime;
    console.log(`✅ API 호출 성공! (${duration}ms)`);
    console.log(`상태 코드: ${response.status}`);
    
    const data = response.data;
    console.log('\n📊 응답 데이터 요약:');
    console.log(`  - success: ${data.success}`);
    console.log(`  - resultId: ${data.resultId || '없음'}`);
    
    if (data.diagnosisResult) {
      console.log(`  - totalScore: ${data.diagnosisResult.totalScore}점`);
      console.log(`  - overallGrade: ${data.diagnosisResult.overallGrade}`);
      console.log(`  - reliabilityScore: ${data.diagnosisResult.reliabilityScore}`);
      console.log(`  - categoryCount: ${data.diagnosisResult.categoryResults?.length || 0}개`);
      
      if (data.diagnosisResult.coreMetrics) {
        console.log(`  - coreMetrics: ${Object.keys(data.diagnosisResult.coreMetrics).length}개`);
      }
      
      if (data.diagnosisResult.industryInsights) {
        console.log(`  - industryInsights: 있음`);
      }
    }
    
    if (data.comprehensiveReport) {
      console.log(`  - reportLength: ${data.comprehensiveReport.length}자`);
    }
    
    console.log('\n🎉 최소한의 API 테스트 성공!');
    return true;
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ API 테스트 실패 (${duration}ms)`);
    console.error(`오류: ${error.message}`);
    
    if (error.response) {
      console.error(`상태 코드: ${error.response.status}`);
      console.error(`응답 데이터:`, error.response.data);
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ 타임아웃 발생 - API 처리 시간 초과');
    } else {
      console.error('🔌 네트워크 오류 또는 기타 문제');
    }
    
    return false;
  }
}

// 개별 점수를 포함한 테스트
async function testWithScores() {
  console.log('\n🔍 개별 점수 포함 테스트...\n');
  
  const dataWithScores = {
    companyName: '점수테스트기업',
    industry: 'manufacturing',
    contactManager: '김점수',
    phone: '010-1111-1111',
    email: 'scores@test.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: '점수 기반 진단 테스트',
    expectedBenefits: '정확한 점수 분석',
    privacyConsent: true,
    
    // 개별 점수 5개만 테스트 (전체 20개 중)
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 5,
    quality_level: 4
  };

  try {
    const startTime = Date.now();
    
    const response = await axios.post(
      `${API_BASE_URL}/api/simplified-diagnosis`,
      dataWithScores,
      {
        timeout: 90000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const duration = Date.now() - startTime;
    console.log(`✅ 점수 포함 테스트 성공! (${duration}ms)`);
    
    const data = response.data;
    console.log(`  - 총점: ${data.diagnosisResult?.totalScore || 0}점`);
    console.log(`  - 보고서 길이: ${data.comprehensiveReport?.length || 0}자`);
    
    return true;
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ 점수 포함 테스트 실패 (${duration}ms)`);
    console.error(`오류: ${error.message}`);
    
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ 타임아웃 발생 - 개별 점수 처리 시간 초과');
    }
    
    return false;
  }
}

async function runMinimalTests() {
  console.log('🚀 AICAMP API 최소 기능 테스트');
  console.log('목표: 타임아웃 문제 원인 파악');
  console.log('=' * 50);
  
  const test1 = await testMinimalAPI();
  const test2 = await testWithScores();
  
  console.log('\n' + '=' * 50);
  console.log('📊 테스트 결과 요약:');
  console.log(`  - 최소 데이터 테스트: ${test1 ? '✅ 성공' : '❌ 실패'}`);
  console.log(`  - 점수 포함 테스트: ${test2 ? '✅ 성공' : '❌ 실패'}`);
  
  if (test1 && test2) {
    console.log('\n🎉 API 기본 기능 정상 작동!');
    console.log('🔍 이제 종합 테스트를 진행해도 됩니다.');
  } else {
    console.log('\n⚠️ API 최적화가 필요합니다.');
    console.log('💡 타임아웃 시간을 늘리거나 처리 로직을 간소화해야 합니다.');
  }
  
  console.log('=' * 50);
}

if (require.main === module) {
  runMinimalTests().catch(error => {
    console.error('💥 테스트 실행 중 치명적 오류:', error);
  });
} 
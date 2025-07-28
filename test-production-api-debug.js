/**
 * 🛠️ 프로덕션 API 500 오류 디버깅 테스트
 * 목표: API 오류의 정확한 원인 파악
 */

const axios = require('axios');

const PRODUCTION_URL = 'https://ai-camp-landingpage.vercel.app';

/**
 * 🎯 매우 간단한 데이터로 API 테스트
 */
async function testSimpleAPI() {
  console.log('🔍 간단한 API 테스트 시작...');
  
  const simpleData = {
    companyName: '디버그테스트기업',
    industry: 'service',
    contactManager: '김디버그',
    phone: '010-1111-1111',
    email: 'debug@test.com',
    employeeCount: '1-10명',
    growthStage: '창업기',
    businessLocation: '서울',
    mainConcerns: '간단한 테스트',
    expectedBenefits: '오류 해결',
    privacyConsent: true,
    submitDate: new Date().toISOString()
  };

  try {
    console.log('📤 API 호출 (타임아웃: 120초)...');
    
    const response = await axios.post(
      `${PRODUCTION_URL}/api/simplified-diagnosis`,
      simpleData,
      { 
        timeout: 120000,
        validateStatus: function (status) {
          return status < 600; // 모든 응답 허용 (오류도 받기)
        }
      }
    );

    console.log(`📊 응답 상태: ${response.status}`);
    console.log(`📋 응답 헤더:`, response.headers);
    
    if (response.status === 200) {
      console.log('✅ API 성공:', {
        success: response.data.success,
        resultId: response.data.resultId ? '생성됨' : '없음'
      });
    } else {
      console.log(`❌ API 오류 (${response.status}):`, response.data);
    }

    return response;

  } catch (error) {
    console.error('💥 API 호출 중 치명적 오류:');
    console.error('  - 메시지:', error.message);
    console.error('  - 코드:', error.code);
    
    if (error.response) {
      console.error('  - 응답 상태:', error.response.status);
      console.error('  - 응답 데이터:', error.response.data);
      console.error('  - 응답 헤더:', error.response.headers);
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('  → 타임아웃 발생 (120초 초과)');
    }
    
    throw error;
  }
}

/**
 * 🎯 점수 데이터 포함 테스트
 */
async function testWithScores() {
  console.log('\n🔍 점수 데이터 포함 테스트...');
  
  const dataWithScores = {
    companyName: '점수테스트기업',
    industry: 'manufacturing',
    contactManager: '김점수',
    phone: '010-2222-2222',
    email: 'scores@test.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '부산',
    mainConcerns: '점수 기반 진단 테스트',
    expectedBenefits: '정확한 진단',
    privacyConsent: true,
    submitDate: new Date().toISOString(),
    
    // 기본 점수 추가
    planning_level: 3,
    differentiation_level: 4,
    pricing_level: 3,
    expertise_level: 4,
    quality_level: 4,
    customer_greeting: 3,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 3,
    customer_understanding: 4,
    marketing_planning: 2,
    offline_marketing: 3,
    online_marketing: 2,
    sales_strategy: 3,
    purchase_management: 4,
    inventory_management: 3,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 3
  };

  try {
    console.log('📤 점수 포함 API 호출...');
    
    const response = await axios.post(
      `${PRODUCTION_URL}/api/simplified-diagnosis`,
      dataWithScores,
      { 
        timeout: 120000,
        validateStatus: function (status) {
          return status < 600;
        }
      }
    );

    console.log(`📊 응답 상태: ${response.status}`);
    
    if (response.status === 200) {
      console.log('✅ 점수 포함 API 성공:', {
        success: response.data.success,
        totalScore: response.data.diagnosisResult?.totalScore || '없음',
        reportLength: response.data.comprehensiveReport?.length || 0
      });
    } else {
      console.log(`❌ 점수 포함 API 오류 (${response.status}):`, response.data);
    }

    return response;

  } catch (error) {
    console.error('💥 점수 포함 API 오류:', error.message);
    if (error.response) {
      console.error('  - 상태:', error.response.status);
      console.error('  - 데이터:', error.response.data);
    }
    throw error;
  }
}

/**
 * 🎯 API 상태 확인
 */
async function checkAPIStatus() {
  console.log('🔍 API 서버 상태 확인...');
  
  try {
    const response = await axios.get(`${PRODUCTION_URL}/api/test-env`, {
      timeout: 30000,
      validateStatus: function (status) {
        return status < 600;
      }
    });

    console.log(`📊 서버 상태: ${response.status}`);
    if (response.data) {
      console.log('📋 서버 정보:', response.data);
    }

  } catch (error) {
    console.error('❌ 서버 상태 확인 실패:', error.message);
  }
}

/**
 * 🎯 메인 디버깅 실행
 */
async function runDebugTests() {
  try {
    console.log('🚀 프로덕션 API 디버깅 시작');
    console.log(`🌐 대상 URL: ${PRODUCTION_URL}`);
    console.log('=' * 50);

    // 1. 서버 상태 확인
    await checkAPIStatus();
    
    // 2. 간단한 API 테스트
    console.log('\n1️⃣ 간단한 데이터 테스트');
    const simpleResult = await testSimpleAPI();
    
    // 3. 점수 포함 테스트 (간단한 테스트가 성공한경우만)
    if (simpleResult.status === 200) {
      console.log('\n2️⃣ 점수 데이터 포함 테스트');
      await testWithScores();
    } else {
      console.log('\n⚠️ 간단한 테스트 실패로 점수 테스트 건너뜀');
    }

    console.log('\n' + '=' * 50);
    console.log('🎉 디버깅 테스트 완료');

  } catch (error) {
    console.error('\n💥 디버깅 테스트 중 치명적 오류:', error.message);
    
    console.log('\n🔧 추천 해결책:');
    console.log('1. 환경변수 확인 (GEMINI_API_KEY)');
    console.log('2. Vercel 함수 타임아웃 설정 확인');
    console.log('3. 메모리 사용량 최적화');
    console.log('4. API 로직 단순화');
  }
}

if (require.main === module) {
  runDebugTests();
}

module.exports = { runDebugTests }; 
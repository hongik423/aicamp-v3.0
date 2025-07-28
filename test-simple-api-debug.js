/**
 * 🔍 AICAMP API 디버깅 테스트
 */

const axios = require('axios');

const API_BASE_URL = 'https://ai-camp-landingpage.vercel.app';

async function testBasicAPI() {
  console.log('🔍 기본 API 접근성 테스트...');
  
  try {
    // 1. 기본 페이지 접근 테스트
    const homeResponse = await axios.get(API_BASE_URL, { timeout: 10000 });
    console.log(`✅ 홈페이지 접근: ${homeResponse.status}`);
  } catch (error) {
    console.error(`❌ 홈페이지 접근 실패: ${error.message}`);
  }

  // 2. 간단한 진단 API 테스트
  console.log('\n🔍 진단 API 접근성 테스트...');
  
  const simpleData = {
    companyName: '테스트기업',
    industry: 'manufacturing',
    contactManager: '김테스트',
    phone: '010-1234-5678',  // contactPhone이 아닌 phone 사용
    email: 'test@example.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: '테스트 고민사항',
    expectedBenefits: '테스트 혜택',
    privacyConsent: true
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/simplified-diagnosis`,
      simpleData,
      {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ 진단 API 성공: ${response.status}`);
    console.log('응답 데이터 요약:', {
      success: response.data.success,
      resultId: response.data.resultId,
      totalScore: response.data.diagnosisResult?.totalScore,
      hasImprovements: !!response.data.improvements
    });
    
  } catch (error) {
    console.error(`❌ 진단 API 실패: ${error.message}`);
    
    if (error.response) {
      console.error(`상태 코드: ${error.response.status}`);
      console.error(`응답 데이터:`, error.response.data);
    } else if (error.request) {
      console.error('요청이 전송되었지만 응답을 받지 못함');
    } else {
      console.error('요청 설정 중 오류:', error.message);
    }
  }
}

// 3. 개별 점수가 포함된 데이터 테스트
async function testWithDetailedScores() {
  console.log('\n🔍 개별 점수 포함 데이터 테스트...');
  
  const detailedData = {
    companyName: '테스트기업_개별점수',
    industry: 'manufacturing',
    contactManager: '김테스트',
    phone: '010-1234-5678',  // phone 필드 사용
    email: 'test@example.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: '테스트 고민사항',
    expectedBenefits: '테스트 혜택',
    privacyConsent: true,
    
    // 개별 점수 추가
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 5,
    quality_level: 4
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/simplified-diagnosis`,
      detailedData,
      {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ 개별 점수 테스트 성공: ${response.status}`);
    console.log('응답 요약:', {
      success: response.data.success,
      resultId: response.data.resultId,
      totalScore: response.data.diagnosisResult?.totalScore
    });
    
  } catch (error) {
    console.error(`❌ 개별 점수 테스트 실패: ${error.message}`);
    
    if (error.response) {
      console.error(`상태 코드: ${error.response.status}`);
      console.error(`응답 데이터:`, error.response.data);
    }
  }
}

// 4. 환경 변수 확인
function checkEnvironment() {
  console.log('\n🔍 환경 변수 확인...');
  console.log(`API_BASE_URL: ${API_BASE_URL}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
  console.log(`NEXT_PUBLIC_VERCEL_URL: ${process.env.NEXT_PUBLIC_VERCEL_URL || 'undefined'}`);
}

async function runDebugTests() {
  console.log('🔍 AICAMP API 디버깅 테스트 시작');
  console.log('=' * 50);
  
  checkEnvironment();
  await testBasicAPI();
  await testWithDetailedScores();
  
  console.log('\n🔍 디버깅 테스트 완료');
}

if (require.main === module) {
  runDebugTests().catch(error => {
    console.error('💥 디버깅 테스트 중 오류:', error);
  });
} 
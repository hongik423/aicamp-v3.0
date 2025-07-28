/**
 * 🔑 GEMINI_API_KEY 환경변수 작동 테스트
 * 목표: AI 진단 결과가 비어있는 원인 파악
 */

const axios = require('axios');

const PRODUCTION_URL = 'https://ai-camp-landingpage.vercel.app';

/**
 * 1. 환경변수 상태 확인
 */
async function checkEnvironmentVariables() {
  console.log('🔍 환경변수 상태 확인...');
  
  try {
    const response = await axios.get(`${PRODUCTION_URL}/api/test-env`, {
      timeout: 30000
    });

    console.log('📊 환경변수 확인 결과:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;

  } catch (error) {
    console.error('❌ 환경변수 확인 실패:', error.message);
    return null;
  }
}

/**
 * 2. GEMINI API 직접 테스트
 */
async function testGeminiAPI() {
  console.log('\n🤖 GEMINI API 직접 테스트...');
  
  const testPayload = {
    testMessage: 'AI 진단 시스템 연결 테스트입니다. 간단히 응답해주세요.'
  };

  try {
    const response = await axios.post(`${PRODUCTION_URL}/api/test-env`, testPayload, {
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('🎯 GEMINI API 테스트 결과:');
    console.log(`  - 상태: ${response.status}`);
    console.log(`  - 성공여부: ${response.data.success}`);
    
    if (response.data.success) {
      console.log(`  - AI 응답 길이: ${response.data.test?.output?.length || 0}자`);
      console.log(`  - 모델: ${response.data.test?.model || '알 수 없음'}`);
      console.log(`  - 응답 미리보기: ${response.data.test?.output?.substring(0, 100)}...`);
    } else {
      console.log(`  - 오류: ${response.data.error}`);
      console.log(`  - 메시지: ${response.data.message}`);
    }

    return response.data;

  } catch (error) {
    console.error('❌ GEMINI API 테스트 실패:', error.message);
    if (error.response) {
      console.error('  - 상태 코드:', error.response.status);
      console.error('  - 응답 데이터:', error.response.data);
    }
    return null;
  }
}

/**
 * 3. 간단한 진단 API 테스트 (AI 부분만)
 */
async function testDiagnosisAPI() {
  console.log('\n🏥 진단 API (AI 생성 부분) 테스트...');
  
  const simpleDiagnosisData = {
    companyName: 'AI테스트기업',
    industry: 'manufacturing',
    contactManager: '김테스트',
    phone: '010-1111-1111',
    email: 'ai.test@example.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: 'AI 진단 시스템 테스트',
    expectedBenefits: 'AI 기능 정상 작동 확인',
    privacyConsent: true,
    submitDate: new Date().toISOString(),
    
    // 최소한의 점수만 추가
    planning_level: 3,
    differentiation_level: 4,
    pricing_level: 3,
    expertise_level: 4
  };

  try {
    console.log('📤 진단 API 호출...');
    const startTime = Date.now();
    
    const response = await axios.post(
      `${PRODUCTION_URL}/api/simplified-diagnosis`,
      simpleDiagnosisData,
      { 
        timeout: 120000,
        validateStatus: function (status) {
          return status < 600;
        }
      }
    );

    const processingTime = Date.now() - startTime;
    
    console.log(`📊 진단 API 응답 (${processingTime}ms):`);
    console.log(`  - 상태 코드: ${response.status}`);
    console.log(`  - 성공 여부: ${response.data.success}`);
    
    if (response.data.success) {
      const data = response.data;
      console.log('\n📋 결과 분석:');
      console.log(`  - 결과 ID: ${data.resultId || '없음'}`);
      console.log(`  - 종합 점수: ${data.diagnosisResult?.totalScore || '없음'}`);
      console.log(`  - 신뢰도: ${data.diagnosisResult?.reliabilityScore || '없음'}`);
      console.log(`  - 등급: ${data.diagnosisResult?.overallGrade || '없음'}`);
      console.log(`  - 보고서 길이: ${data.comprehensiveReport?.length || 0}자`);
      
      // AI 생성 부분 확인
      if (data.comprehensiveReport && data.comprehensiveReport.length > 100) {
        console.log('✅ AI 보고서 생성 성공!');
        console.log(`  - 보고서 미리보기: ${data.comprehensiveReport.substring(0, 200)}...`);
      } else {
        console.log('❌ AI 보고서 생성 실패 또는 매우 짧음');
      }
      
      // 업종별 데이터 확인
      if (data.diagnosisResult?.industryInsights) {
        console.log('🏭 업종별 데이터:');
        console.log(`  - 최신업종데이터: ${!!data.diagnosisResult.industryInsights.latestIndustryData ? '✅' : '❌'}`);
        console.log(`  - 맞춤인사이트: ${!!data.diagnosisResult.industryInsights.customInsights ? '✅' : '❌'}`);
      }
      
    } else {
      console.log(`❌ 진단 API 실패: ${response.data.error}`);
    }

    return response.data;

  } catch (error) {
    console.error('💥 진단 API 테스트 중 오류:', error.message);
    if (error.response) {
      console.error('  - 상태:', error.response.status);
      console.error('  - 데이터:', error.response.data);
    }
    return null;
  }
}

/**
 * 메인 테스트 실행
 */
async function runEnvironmentDiagnostics() {
  try {
    console.log('🚀 GEMINI_API_KEY 환경변수 진단 시작');
    console.log('📅 테스트 시간:', new Date().toLocaleString('ko-KR'));
    console.log('🌐 대상 URL:', PRODUCTION_URL);
    console.log('=' * 70);

    // 1. 환경변수 상태 확인
    const envStatus = await checkEnvironmentVariables();
    
    // 2. GEMINI API 직접 테스트
    const geminiTest = await testGeminiAPI();
    
    // 3. 진단 API 테스트
    const diagnosisTest = await testDiagnosisAPI();
    
    // 최종 진단 결과
    console.log('\n' + '=' * 70);
    console.log('🎯 최종 진단 결과');
    console.log('=' * 70);
    
    const results = {
      환경변수_확인: envStatus ? '✅ 성공' : '❌ 실패',
      GEMINI_API_직접_테스트: geminiTest?.success ? '✅ 성공' : '❌ 실패',
      진단_API_테스트: diagnosisTest?.success ? '✅ 성공' : '❌ 실패',
      AI_보고서_생성: diagnosisTest?.comprehensiveReport?.length > 100 ? '✅ 성공' : '❌ 실패'
    };
    
    console.log('📊 테스트 결과 요약:');
    Object.entries(results).forEach(([key, value]) => {
      console.log(`  - ${key}: ${value}`);
    });
    
    // 문제 진단 및 해결책 제시
    console.log('\n🔧 문제 진단 및 해결책:');
    
    if (!geminiTest?.success) {
      console.log('❌ GEMINI_API_KEY 문제 발견:');
      console.log('  1. Vercel 환경변수에 GEMINI_API_KEY가 올바르게 설정되었는지 확인');
      console.log('  2. API 키가 유효한지 확인 (Google AI Studio에서 발급)');
      console.log('  3. API 키 형식이 AIzaSy...로 시작하는지 확인');
      console.log('  💡 해결: npx vercel env rm GEMINI_API_KEY');
      console.log('  💡 해결: npx vercel env add GEMINI_API_KEY');
    } else if (!diagnosisTest?.success) {
      console.log('❌ 진단 API 로직 문제 발견:');
      console.log('  1. API 라우트에서 오류 발생');
      console.log('  2. 타임아웃 또는 메모리 부족 가능성');
      console.log('  3. 폴백 로직 검토 필요');
    } else if (diagnosisTest?.comprehensiveReport?.length <= 100) {
      console.log('❌ AI 보고서 생성 실패:');
      console.log('  1. GEMINI API는 작동하지만 진단 로직에서 문제');
      console.log('  2. EnhancedDiagnosisEngine 오류 가능성');
      console.log('  3. 폴백 로직이 빈 결과 반환');
      console.log('  💡 해결: 폴백 로직 강화 필요');
    } else {
      console.log('✅ 모든 시스템 정상 작동!');
      console.log('  - 환경변수 설정 완료');
      console.log('  - GEMINI API 연결 정상');
      console.log('  - AI 보고서 생성 성공');
    }

    return results;

  } catch (error) {
    console.error('💥 진단 테스트 중 치명적 오류:', error.message);
    return null;
  }
}

if (require.main === module) {
  runEnvironmentDiagnostics();
}

module.exports = { runEnvironmentDiagnostics }; 
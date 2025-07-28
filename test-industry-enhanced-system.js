/**
 * 🏭 업종별 최신정보 기반 완벽한 AI 진단 시스템 테스트
 * 목표: 오류진단, 상담신청, 무료AI진단 서비스 + 이메일 발송 100% 무오류 달성
 */

const axios = require('axios');

const PRODUCTION_URL = 'https://ai-camp-landingpage.vercel.app';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

// 🏭 업종별 테스트 데이터 (2025년 최신 트렌드 반영)
const INDUSTRY_TEST_DATA = {
  manufacturing: {
    companyName: '스마트제조솔루션_최신트렌드',
    industry: 'manufacturing',
    contactManager: '김제조',
    phone: '010-1111-1111',
    email: 'manufacturing.test@aicamp.com',
    employeeCount: '50-100명',
    growthStage: '성장기',
    businessLocation: '부산',
    mainConcerns: '스마트 팩토리 구축과 AI 기반 품질관리 시스템 도입이 필요합니다',
    expectedBenefits: '생산효율성 향상과 예측 유지보수를 통한 비용 절감',
    privacyConsent: true,
    // 제조업 특화 점수
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 5,
    quality_level: 4,
    customer_greeting: 3,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 3,
    marketing_planning: 2,
    offline_marketing: 3,
    online_marketing: 2,
    sales_strategy: 3,
    purchase_management: 5,
    inventory_management: 4,
    exterior_management: 5,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 4
  },

  it: {
    companyName: 'AI솔루션_클라우드네이티브',
    industry: 'it',
    contactManager: '박개발',
    phone: '010-2222-2222',
    email: 'it.test@aicamp.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: 'AI/머신러닝 솔루션 확산과 사이버보안 기술 고도화가 필요합니다',
    expectedBenefits: '글로벌 SaaS 시장 진출과 기술 경쟁력 확보',
    privacyConsent: true,
    // IT업종 특화 점수
    planning_level: 5,
    differentiation_level: 4,
    pricing_level: 3,
    expertise_level: 5,
    quality_level: 5,
    customer_greeting: 3,
    customer_service: 4,
    complaint_management: 4,
    customer_retention: 4,
    customer_understanding: 4,
    marketing_planning: 3,
    offline_marketing: 2,
    online_marketing: 4,
    sales_strategy: 4,
    purchase_management: 3,
    inventory_management: 3,
    exterior_management: 3,
    interior_management: 4,
    cleanliness: 4,
    work_flow: 5
  },

  service: {
    companyName: '디지털고객경험_개인화서비스',
    industry: 'service',
    contactManager: '이서비스',
    phone: '010-3333-3333',
    email: 'service.test@aicamp.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: '디지털 고객 경험 혁신과 개인화 서비스 확산이 필요합니다',
    expectedBenefits: '고객 만족도 향상과 구독 기반 비즈니스 모델 구축',
    privacyConsent: true,
    // 서비스업 특화 점수
    planning_level: 4,
    differentiation_level: 4,
    pricing_level: 3,
    expertise_level: 4,
    quality_level: 4,
    customer_greeting: 5,
    customer_service: 5,
    complaint_management: 4,
    customer_retention: 4,
    customer_understanding: 5,
    marketing_planning: 4,
    offline_marketing: 3,
    online_marketing: 3,
    sales_strategy: 4,
    purchase_management: 3,
    inventory_management: 3,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 4,
    work_flow: 4
  },

  retail: {
    companyName: '옴니채널_라이브커머스',
    industry: 'retail',
    contactManager: '최소매',
    phone: '010-4444-4444',
    email: 'retail.test@aicamp.com',
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    mainConcerns: '옴니채널 쇼핑 경험과 라이브 커머스 확산 대응이 필요합니다',
    expectedBenefits: 'O2O 서비스 확장과 개인화 추천 시스템 구축',
    privacyConsent: true,
    // 소매업 특화 점수
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 3,
    quality_level: 4,
    customer_greeting: 4,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 3,
    customer_understanding: 4,
    marketing_planning: 3,
    offline_marketing: 4,
    online_marketing: 3,
    sales_strategy: 4,
    purchase_management: 4,
    inventory_management: 4,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 4,
    work_flow: 3
  },

  food: {
    companyName: '배달서비스_건강식재료',
    industry: 'food',
    contactManager: '한외식',
    phone: '010-5555-5555',
    email: 'food.test@aicamp.com',
    employeeCount: '1-10명',
    growthStage: '창업기',
    businessLocation: '서울',
    mainConcerns: '배달 서비스 고도화와 건강한 식재료 선호 트렌드 대응이 필요합니다',
    expectedBenefits: '프리미엄 브런치 시장 진출과 디지털 주문 시스템 구축',
    privacyConsent: true,
    // 외식업 특화 점수
    planning_level: 3,
    differentiation_level: 4,
    pricing_level: 3,
    expertise_level: 4,
    quality_level: 5,
    customer_greeting: 4,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 4,
    marketing_planning: 3,
    offline_marketing: 3,
    online_marketing: 3,
    sales_strategy: 3,
    purchase_management: 4,
    inventory_management: 4,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 4
  }
};

/**
 * 🎯 업종별 최신정보 기반 AI 진단 테스트
 */
async function testIndustryEnhancedDiagnosis() {
  console.log('🏭 업종별 최신정보 기반 AI 진단 시스템 테스트');
  console.log('=' * 60);

  const results = {
    timestamp: new Date().toISOString(),
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    industryResults: {},
    emailResults: {}
  };

  for (const [industry, testData] of Object.entries(INDUSTRY_TEST_DATA)) {
    results.totalTests++;
    
    console.log(`\n🏭 ${industry.toUpperCase()} 업종 테스트 시작...`);
    console.log(`📊 회사명: ${testData.companyName}`);
    console.log(`📋 주요 관심사: ${testData.mainConcerns.substring(0, 50)}...`);

    try {
      const startTime = Date.now();
      
      const response = await axios.post(
        `${PRODUCTION_URL}/api/simplified-diagnosis`,
        testData,
        { timeout: 180000 } // 3분 타임아웃
      );

      const processingTime = Date.now() - startTime;

      if (response.status === 200 && response.data.success) {
        results.passedTests++;
        
        console.log(`✅ ${industry} 진단 성공! (${processingTime}ms)`);
        console.log(`  - 종합점수: ${response.data.diagnosisResult?.totalScore || '미확인'}점`);
        console.log(`  - 보고서길이: ${response.data.comprehensiveReport?.length || 0}자`);
        console.log(`  - 최신업종데이터: ${response.data.diagnosisResult?.industryInsights?.latestIndustryData ? '✅' : '❌'}`);
        console.log(`  - 업종트렌드수: ${response.data.diagnosisResult?.industryInsights?.latestIndustryData?.trends?.length || 0}개`);

        results.industryResults[industry] = {
          status: 'SUCCESS',
          processingTime,
          totalScore: response.data.diagnosisResult?.totalScore || 0,
          reportLength: response.data.comprehensiveReport?.length || 0,
          hasLatestData: !!response.data.diagnosisResult?.industryInsights?.latestIndustryData,
          trendsCount: response.data.diagnosisResult?.industryInsights?.latestIndustryData?.trends?.length || 0
        };

      } else {
        throw new Error(`API 응답 오류: ${response.status} - ${response.data?.error || 'Unknown error'}`);
      }

    } catch (error) {
      results.failedTests++;
      console.error(`❌ ${industry} 진단 실패:`, error.message);
      
      results.industryResults[industry] = {
        status: 'FAILED',
        error: error.message,
        processingTime: 0
      };
    }

    // 요청 간 간격 (1초)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

/**
 * 🎯 이메일 발송 시스템 완벽 테스트
 */
async function testEmailSystem() {
  console.log('\n📧 이메일 발송 시스템 완벽 테스트');
  console.log('=' * 60);

  const emailTests = [
    {
      type: '진단신청',
      endpoint: GOOGLE_SCRIPT_URL,
      data: {
        action: 'saveDiagnosis',
        폼타입: 'AI_무료진단_최신업종분석',
        회사명: '이메일테스트기업_최신업종',
        업종: 'manufacturing',
        담당자명: '김이메일테스트',
        이메일: 'email.test.diagnosis@aicamp.com',
        연락처: '010-1111-2222',
        종합점수: 85,
        개인정보동의: true,
        // 2025년 최신 업종 데이터 포함
        최신업종데이터: '스마트 팩토리 구축 가속화, AI 기반 품질관리 시스템 도입',
        업종트렌드: 'IoT 센서 기반 실시간 모니터링, AI 예측분석 도입',
        진단보고서요약: '제조업 최신 트렌드를 반영한 고급 진단 결과입니다. 스마트 팩토리 구축과 AI 기반 품질관리 시스템 도입을 통해 생산효율성을 크게 향상시킬 수 있습니다.'
      }
    },
    {
      type: '상담신청',
      endpoint: GOOGLE_SCRIPT_URL,
      data: {
        action: 'saveConsultation',
        상담유형: '업종별특화컨설팅',
        성명: '이상담테스트',
        연락처: '010-3333-4444',
        이메일: 'email.test.consultation@aicamp.com',
        회사명: '상담테스트기업_업종특화',
        상담분야: '업종별 최신 트렌드 분석',
        문의내용: '2025년 최신 업종 트렌드를 반영한 맞춤형 컨설팅을 받고 싶습니다.',
        개인정보동의: true
      }
    }
  ];

  const emailResults = {
    totalTests: emailTests.length,
    passedTests: 0,
    failedTests: 0,
    results: []
  };

  for (const test of emailTests) {
    console.log(`\n📧 ${test.type} 이메일 테스트...`);
    
    try {
      const response = await axios.post(test.endpoint, test.data, {
        timeout: 30000
      });

      let result;
      try {
        result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      } catch (e) {
        result = { success: false };
      }

      if (result.success) {
        emailResults.passedTests++;
        console.log(`✅ ${test.type} 이메일 발송 성공!`);
        console.log(`  - 시트: ${result.sheet || '확인됨'}`);
        console.log(`  - 행번호: ${result.row || '저장됨'}`);
        
        emailResults.results.push({
          type: test.type,
          status: 'SUCCESS',
          sheet: result.sheet,
          row: result.row
        });
      } else {
        throw new Error('이메일 발송 실패');
      }

    } catch (error) {
      emailResults.failedTests++;
      console.error(`❌ ${test.type} 이메일 발송 실패:`, error.message);
      
      emailResults.results.push({
        type: test.type,
        status: 'FAILED',
        error: error.message
      });
    }

    // 이메일 테스트 간 간격 (2초)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return emailResults;
}

/**
 * 🎯 상담신청 직접 테스트
 */
async function testConsultationService() {
  console.log('\n💬 상담신청 서비스 테스트');
  console.log('=' * 40);

  const consultationData = {
    상담유형: '업종별특화진단후상담',
    성명: '김상담신청',
    연락처: '010-6666-7777',
    이메일: 'consultation.service@aicamp.com',
    회사명: '상담신청테스트기업',
    직책: '대표이사',
    상담분야: '2025년 업종별 최신 트렌드 컨설팅',
    문의내용: '업종별 최신정보를 반영한 맞춤형 경영컨설팅을 받고 싶습니다. 특히 디지털 전환과 관련된 구체적인 로드맵을 원합니다.',
    희망상담시간: '평일 오후 2-5시',
    개인정보동의: true,
    진단연계여부: 'Y',
    진단점수: '82',
    추천서비스: '업종별 특화 컨설팅'
  };

  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, consultationData, {
      timeout: 30000
    });

    let result;
    try {
      result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    } catch (e) {
      result = { success: false };
    }

    if (result.success) {
      console.log('✅ 상담신청 성공!');
      console.log(`  - 시트: ${result.sheet || '상담신청'}`);
      console.log(`  - 행번호: ${result.row || '저장됨'}`);
      return { status: 'SUCCESS', ...result };
    } else {
      throw new Error('상담신청 처리 실패');
    }

  } catch (error) {
    console.error('❌ 상담신청 실패:', error.message);
    return { status: 'FAILED', error: error.message };
  }
}

/**
 * 🎯 메인 종합 테스트 실행
 */
async function runComprehensiveTest() {
  try {
    console.log('🚀 AICAMP 업종별 최신정보 기반 완벽한 시스템 테스트');
    console.log('🎯 목표: 무오류진단, 상담신청, 무료AI진단 + 이메일 발송 100% 달성');
    console.log('📅 테스트 일시:', new Date().toLocaleString('ko-KR'));
    console.log('🌐 대상 URL:', PRODUCTION_URL);
    console.log('=' * 80);

    // 1. 업종별 최신정보 기반 AI 진단 테스트
    const diagnosisResults = await testIndustryEnhancedDiagnosis();

    // 2. 이메일 발송 시스템 테스트
    const emailResults = await testEmailSystem();

    // 3. 상담신청 서비스 테스트
    const consultationResult = await testConsultationService();

    // 최종 결과 요약
    console.log('\n' + '=' * 80);
    console.log('🎉 종합 테스트 결과');
    console.log('=' * 80);

    const totalTests = diagnosisResults.totalTests + emailResults.totalTests + 1;
    const totalPassed = diagnosisResults.passedTests + emailResults.passedTests + (consultationResult.status === 'SUCCESS' ? 1 : 0);
    const successRate = Math.round((totalPassed / totalTests) * 100);

    console.log(`📊 전체 테스트: ${totalTests}개`);
    console.log(`✅ 성공: ${totalPassed}개`);
    console.log(`❌ 실패: ${totalTests - totalPassed}개`);
    console.log(`📈 성공률: ${successRate}%`);

    console.log('\n📋 업종별 진단 테스트 결과:');
    Object.entries(diagnosisResults.industryResults).forEach(([industry, result]) => {
      const status = result.status === 'SUCCESS' ? '✅' : '❌';
      console.log(`  ${status} ${industry}: ${result.status === 'SUCCESS' ? `${result.totalScore}점, ${result.reportLength}자, 트렌드 ${result.trendsCount}개` : result.error}`);
    });

    console.log('\n📧 이메일 발송 테스트 결과:');
    emailResults.results.forEach(result => {
      const status = result.status === 'SUCCESS' ? '✅' : '❌';
      console.log(`  ${status} ${result.type}: ${result.status === 'SUCCESS' ? `${result.sheet} 시트 ${result.row}행` : result.error}`);
    });

    console.log('\n💬 상담신청 테스트 결과:');
    const consultationStatus = consultationResult.status === 'SUCCESS' ? '✅' : '❌';
    console.log(`  ${consultationStatus} 상담신청: ${consultationResult.status === 'SUCCESS' ? '정상 처리' : consultationResult.error}`);

    // 결과 평가
    console.log('\n' + '=' * 80);
    if (successRate === 100) {
      console.log('🎉 완벽한 100% 무오류 시스템 달성!');
      console.log('✅ 모든 서비스 정상 작동 확인!');
      console.log('🚀 업종별 최신정보 기반 AI 진단 시스템 완성!');
    } else if (successRate >= 90) {
      console.log('🎯 90% 이상 성공률 달성!');
      console.log('✅ 대부분의 기능이 정상 작동합니다.');
      console.log('⚠️ 일부 개선사항이 있지만 서비스 가능한 수준입니다.');
    } else {
      console.log('⚠️ 추가 개선이 필요합니다.');
      console.log('🔧 오류가 발견된 부분을 수정 후 재테스트를 권장합니다.');
    }
    console.log('=' * 80);

    // 결과 파일 저장
    const fs = require('fs');
    const testReport = {
      timestamp: new Date().toISOString(),
      successRate,
      diagnosisResults,
      emailResults,
      consultationResult,
      summary: {
        totalTests,
        totalPassed,
        totalFailed: totalTests - totalPassed
      }
    };

    const reportFile = `aicamp-industry-enhanced-test-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(testReport, null, 2));
    console.log(`\n📄 상세 테스트 결과 저장: ${reportFile}`);

    return testReport;

  } catch (error) {
    console.error('\n💥 종합 테스트 중 치명적 오류:', error.message);
    console.log('\n🔧 추천 해결책:');
    console.log('1. 네트워크 연결 상태 확인');
    console.log('2. API 서버 상태 확인');
    console.log('3. 환경변수 설정 확인');
    console.log('4. Google Apps Script 배포 상태 확인');
    
    process.exit(1);
  }
}

if (require.main === module) {
  runComprehensiveTest();
}

module.exports = { runComprehensiveTest }; 
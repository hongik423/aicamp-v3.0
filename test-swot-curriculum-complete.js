/**
 * 🧪 SWOT 전략 고도화 및 AI CAMP 교육 커리큘럼 완벽 테스트
 * 2025년 1월 29일
 */

const CONFIG = {
  PRODUCTION_URL: 'https://aicamp-v3-0-n7eu82zwb-hongik423-3087s-projects.vercel.app',
  LOCAL_URL: 'http://localhost:3000',
  USE_PRODUCTION: false // 로컬 테스트로 변경
};

const BASE_URL = CONFIG.USE_PRODUCTION ? CONFIG.PRODUCTION_URL : CONFIG.LOCAL_URL;

/**
 * 🎯 테스트 시나리오 - 업종별 다양한 케이스
 */
const TEST_SCENARIOS = [
  {
    name: '🏭 제조업 - 점수 낮음 (입문 과정 추천)',
    data: {
      companyName: '스마트제조(주)',
      industry: '제조업',
      contactManager: '김공장',
      phone: '010-1111-2222',
      email: 'test-manufacturing-low@aicamp.club',
      employeeCount: '11-30명',
      growthStage: '성장기',
      businessLocation: '경기도 화성시',
      mainConcerns: 'AI 품질검사 시스템 도입과 스마트팩토리 구축',
      expectedBenefits: '불량률 감소와 생산성 향상',
      privacyConsent: true,
      // 낮은 점수 설정 (입문 과정 추천 예상)
      planning_level: 2,
      differentiation_level: 2,
      pricing_level: 3,
      expertise_level: 2,
      quality_level: 3,
      customer_greeting: 2,
      customer_service: 2,
      complaint_management: 2,
      customer_retention: 2,
      customer_understanding: 2,
      marketing_planning: 2,
      offline_marketing: 2,
      online_marketing: 1,
      sales_strategy: 2,
      purchase_management: 3,
      inventory_management: 2,
      exterior_management: 3,
      interior_management: 3,
      cleanliness: 3,
      work_flow: 2
    },
    expectedResults: {
      scoreRange: [35, 55],
      educationTrack: '생산/물류 트랙',
      educationLevel: '입문 과정',
      swotStrategiesCount: {
        SO: 3, // 최소 3개 이상
        WO: 3,
        ST: 3,
        WT: 3
      }
    }
  },
  {
    name: '💻 IT/서비스업 - 점수 높음 (심화 과정 추천)',
    data: {
      companyName: 'AI테크솔루션',
      industry: 'IT',
      contactManager: '박개발',
      phone: '010-3333-4444',
      email: 'test-it-high@aicamp.club',
      employeeCount: '31-50명',
      growthStage: '성숙기',
      businessLocation: '서울시 강남구',
      mainConcerns: 'GPT API 활용 서비스 고도화',
      expectedBenefits: '개발 생산성 향상과 코드 품질 개선',
      privacyConsent: true,
      // 높은 점수 설정 (심화 과정 추천 예상)
      planning_level: 4,
      differentiation_level: 5,
      pricing_level: 4,
      expertise_level: 5,
      quality_level: 4,
      customer_greeting: 4,
      customer_service: 4,
      complaint_management: 4,
      customer_retention: 4,
      customer_understanding: 4,
      marketing_planning: 4,
      offline_marketing: 3,
      online_marketing: 5,
      sales_strategy: 4,
      purchase_management: 4,
      inventory_management: 4,
      exterior_management: 4,
      interior_management: 4,
      cleanliness: 4,
      work_flow: 5
    },
    expectedResults: {
      scoreRange: [75, 90],
      educationTrack: '기획/전략 트랙',
      educationLevel: '심화 과정',
      swotStrategiesCount: {
        SO: 3,
        WO: 3,
        ST: 3,
        WT: 3
      }
    }
  },
  {
    name: '🛒 소매업 - 중간 점수',
    data: {
      companyName: '스마트스토어',
      industry: '소매업',
      contactManager: '이대표',
      phone: '010-5555-6666',
      email: 'test-retail@aicamp.club',
      employeeCount: '6-10명',
      growthStage: '성장기',
      businessLocation: '부산시',
      mainConcerns: '재고관리 자동화와 온라인 매출 증대',
      expectedBenefits: '효율적인 재고관리와 고객 만족도 향상',
      privacyConsent: true,
      // 중간 점수 설정
      planning_level: 3,
      differentiation_level: 3,
      pricing_level: 3,
      expertise_level: 3,
      quality_level: 3,
      customer_greeting: 4,
      customer_service: 3,
      complaint_management: 3,
      customer_retention: 3,
      customer_understanding: 3,
      marketing_planning: 3,
      offline_marketing: 3,
      online_marketing: 3,
      sales_strategy: 3,
      purchase_management: 3,
      inventory_management: 3,
      exterior_management: 3,
      interior_management: 3,
      cleanliness: 4,
      work_flow: 3
    },
    expectedResults: {
      scoreRange: [55, 70],
      educationTrack: '영업 트랙',
      educationLevel: '입문 과정',
      swotStrategiesCount: {
        SO: 3,
        WO: 3,
        ST: 3,
        WT: 3
      }
    }
  },
  {
    name: '🍽️ 외식업 - AI 활용 희망',
    data: {
      companyName: 'AI스마트카페',
      industry: '외식업',
      contactManager: '최사장',
      phone: '010-7777-8888',
      email: 'test-food@aicamp.club',
      employeeCount: '1-5명',
      growthStage: '창업기',
      businessLocation: '대전시',
      mainConcerns: '키오스크 도입과 고객 분석 시스템',
      expectedBenefits: '인건비 절감과 매출 증대',
      privacyConsent: true,
      planning_level: 2,
      differentiation_level: 3,
      pricing_level: 3,
      expertise_level: 2,
      quality_level: 4,
      customer_greeting: 3,
      customer_service: 3,
      complaint_management: 2,
      customer_retention: 2,
      customer_understanding: 2,
      marketing_planning: 2,
      offline_marketing: 3,
      online_marketing: 2,
      sales_strategy: 2,
      purchase_management: 3,
      inventory_management: 3,
      exterior_management: 4,
      interior_management: 4,
      cleanliness: 5,
      work_flow: 3
    },
    expectedResults: {
      scoreRange: [50, 65],
      educationTrack: '고객지원(CS) 트랙',
      educationLevel: '입문 과정',
      swotStrategiesCount: {
        SO: 3,
        WO: 3,
        ST: 3,
        WT: 3
      }
    }
  }
];

/**
 * 🧪 진단 API 테스트
 */
async function testDiagnosisAPI(scenario) {
  console.log(`\n📊 ${scenario.name} 테스트 시작...`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/simplified-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scenario.data)
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`API 오류: ${result.error || response.statusText}`);
    }

    // 테스트 결과 검증
    console.log('\n✅ 기본 정보:');
    console.log(`- 회사명: ${result.data.diagnosis.companyName}`);
    console.log(`- 업종: ${result.data.diagnosis.industry}`);
    console.log(`- 총점: ${result.data.diagnosis.totalScore}점`);
    console.log(`- 등급: ${result.data.diagnosis.overallGrade}`);
    
    // 점수 범위 검증
    const totalScore = result.data.diagnosis.totalScore;
    const expectedRange = scenario.expectedResults.scoreRange;
    if (totalScore < expectedRange[0] || totalScore > expectedRange[1]) {
      console.warn(`⚠️ 점수가 예상 범위를 벗어남: ${totalScore} (예상: ${expectedRange[0]}-${expectedRange[1]})`);
    }
    
    // SWOT 전략 검증
    console.log('\n📋 SWOT 매트릭스 전략:');
    const strategies = result.data.diagnosis.swotAnalysis.strategies;
    if (strategies) {
      console.log(`- SO 전략: ${strategies.SO ? strategies.SO.length : 0}개`);
      if (strategies.SO && strategies.SO.length > 0) {
        console.log(`  예시: ${strategies.SO[0]}`);
      }
      
      console.log(`- WO 전략: ${strategies.WO ? strategies.WO.length : 0}개`);
      if (strategies.WO && strategies.WO.length > 0) {
        console.log(`  예시: ${strategies.WO[0]}`);
      }
      
      console.log(`- ST 전략: ${strategies.ST ? strategies.ST.length : 0}개`);
      if (strategies.ST && strategies.ST.length > 0) {
        console.log(`  예시: ${strategies.ST[0]}`);
      }
      
      console.log(`- WT 전략: ${strategies.WT ? strategies.WT.length : 0}개`);
      if (strategies.WT && strategies.WT.length > 0) {
        console.log(`  예시: ${strategies.WT[0]}`);
      }
      
      // 각 전략이 3개 이상인지 검증
      const expectedCount = scenario.expectedResults.swotStrategiesCount;
      if (strategies.SO && strategies.SO.length < expectedCount.SO) {
        console.error(`❌ SO 전략 부족: ${strategies.SO.length}개 (최소 ${expectedCount.SO}개 필요)`);
      }
      if (strategies.WO && strategies.WO.length < expectedCount.WO) {
        console.error(`❌ WO 전략 부족: ${strategies.WO.length}개 (최소 ${expectedCount.WO}개 필요)`);
      }
      if (strategies.ST && strategies.ST.length < expectedCount.ST) {
        console.error(`❌ ST 전략 부족: ${strategies.ST.length}개 (최소 ${expectedCount.ST}개 필요)`);
      }
      if (strategies.WT && strategies.WT.length < expectedCount.WT) {
        console.error(`❌ WT 전략 부족: ${strategies.WT.length}개 (최소 ${expectedCount.WT}개 필요)`);
      }
    }
    
    // AI 교육 추천사항 검증
    console.log('\n🎓 AI CAMP 교육 추천:');
    const recommendations = result.data.diagnosis.recommendations;
    if (recommendations && recommendations.length > 0) {
      const aiCampRecommendation = recommendations.find(rec => rec.includes('AI CAMP'));
      if (aiCampRecommendation) {
        console.log(`- 추천 교육: ${aiCampRecommendation}`);
        
        // 예상 교육 트랙 검증
        if (aiCampRecommendation.includes(scenario.expectedResults.educationTrack)) {
          console.log(`✅ 예상 교육 트랙 일치: ${scenario.expectedResults.educationTrack}`);
        } else {
          console.warn(`⚠️ 예상과 다른 교육 트랙 추천됨`);
        }
        
        // 예상 교육 수준 검증
        if (aiCampRecommendation.includes(scenario.expectedResults.educationLevel)) {
          console.log(`✅ 예상 교육 수준 일치: ${scenario.expectedResults.educationLevel}`);
        } else {
          console.warn(`⚠️ 예상과 다른 교육 수준 추천됨`);
        }
      }
      
      // 기타 추천사항
      console.log('\n기타 추천사항:');
      recommendations.slice(0, 5).forEach((rec, idx) => {
        console.log(`${idx + 1}. ${rec}`);
      });
    }
    
    // 단계별 실행 계획 검증
    console.log('\n📅 단계별 실행 계획:');
    const actionPlan = result.data.diagnosis.actionPlan;
    if (actionPlan) {
      console.log(`- 즉시 실행: ${actionPlan.immediate ? actionPlan.immediate.length : 0}개 항목`);
      if (actionPlan.immediate && actionPlan.immediate[0]) {
        console.log(`  예시: ${actionPlan.immediate[0]}`);
      }
      
      console.log(`- 단기 계획: ${actionPlan.shortTerm ? actionPlan.shortTerm.length : 0}개 항목`);
      console.log(`- 중기 계획: ${actionPlan.mediumTerm ? actionPlan.mediumTerm.length : 0}개 항목`);
      console.log(`- 장기 비전: ${actionPlan.longTerm ? actionPlan.longTerm.length : 0}개 항목`);
    }
    
    // 결과 URL 출력
    if (result.data.diagnosis.resultUrl) {
      console.log(`\n🔗 결과 페이지: ${BASE_URL}${result.data.diagnosis.resultUrl}`);
    }
    
    return {
      success: true,
      data: result.data,
      scenario: scenario.name
    };
    
  } catch (error) {
    console.error(`❌ ${scenario.name} 테스트 실패:`, error.message);
    return {
      success: false,
      error: error.message,
      scenario: scenario.name
    };
  }
}

/**
 * 🎓 AI 교육 커리큘럼 페이지 테스트
 */
async function testCurriculumPage() {
  console.log('\n\n🎓 AI CAMP 교육 커리큘럼 페이지 테스트...');
  
  try {
    const response = await fetch(`${BASE_URL}/services/ai-curriculum`);
    
    if (!response.ok) {
      throw new Error(`페이지 로드 실패: ${response.status}`);
    }
    
    const html = await response.text();
    
    // 주요 콘텐츠 확인
    const checks = [
      { name: '페이지 제목', keyword: '기업체 AI & n8n 자동화 교육' },
      { name: '기획/전략 트랙', keyword: '기획/전략 트랙' },
      { name: '영업 트랙', keyword: '영업 트랙' },
      { name: '마케팅 트랙', keyword: '마케팅 트랙' },
      { name: '생산/물류 트랙', keyword: '생산/물류 트랙' },
      { name: '고객지원 트랙', keyword: '고객지원 트랙' },
      { name: '인사/총무 트랙', keyword: '인사/총무 트랙' },
      { name: '재무/회계 트랙', keyword: '재무/회계 트랙' },
      { name: '입문 과정', keyword: '입문 과정' },
      { name: '심화 과정', keyword: '심화 과정' },
      { name: '12시간 커리큘럼', keyword: '12시간' },
      { name: '교육 효과', keyword: '업무 시간 단축' }
    ];
    
    console.log('\n콘텐츠 확인:');
    let allChecksPass = true;
    
    checks.forEach(check => {
      if (html.includes(check.keyword)) {
        console.log(`✅ ${check.name} 확인됨`);
      } else {
        console.error(`❌ ${check.name} 누락됨`);
        allChecksPass = false;
      }
    });
    
    if (allChecksPass) {
      console.log('\n✅ AI 교육 커리큘럼 페이지 정상 작동');
    } else {
      console.warn('\n⚠️ 일부 콘텐츠가 누락되었습니다');
    }
    
    console.log(`\n🔗 교육 커리큘럼 페이지: ${BASE_URL}/services/ai-curriculum`);
    
  } catch (error) {
    console.error('❌ 커리큘럼 페이지 테스트 실패:', error.message);
  }
}

/**
 * 📊 테스트 결과 요약
 */
function summarizeResults(results) {
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 전체 테스트 결과 요약');
  console.log('='.repeat(80));
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n✅ 성공: ${successCount}/${totalCount}`);
  console.log(`❌ 실패: ${totalCount - successCount}/${totalCount}`);
  
  // SWOT 전략 통계
  let totalStrategies = { SO: 0, WO: 0, ST: 0, WT: 0 };
  let validResults = 0;
  
  results.forEach(result => {
    if (result.success && result.data?.diagnosis?.swotAnalysis?.strategies) {
      const strategies = result.data.diagnosis.swotAnalysis.strategies;
      if (strategies.SO) totalStrategies.SO += strategies.SO.length;
      if (strategies.WO) totalStrategies.WO += strategies.WO.length;
      if (strategies.ST) totalStrategies.ST += strategies.ST.length;
      if (strategies.WT) totalStrategies.WT += strategies.WT.length;
      validResults++;
    }
  });
  
  if (validResults > 0) {
    console.log('\n📋 SWOT 전략 평균 개수:');
    console.log(`- SO 전략: ${(totalStrategies.SO / validResults).toFixed(1)}개`);
    console.log(`- WO 전략: ${(totalStrategies.WO / validResults).toFixed(1)}개`);
    console.log(`- ST 전략: ${(totalStrategies.ST / validResults).toFixed(1)}개`);
    console.log(`- WT 전략: ${(totalStrategies.WT / validResults).toFixed(1)}개`);
  }
  
  // 실패한 테스트 상세
  const failedTests = results.filter(r => !r.success);
  if (failedTests.length > 0) {
    console.log('\n❌ 실패한 테스트:');
    failedTests.forEach(test => {
      console.log(`- ${test.scenario}: ${test.error}`);
    });
  }
}

/**
 * 🚀 메인 테스트 실행
 */
async function runAllTests() {
  console.log('🚀 SWOT 전략 고도화 및 AI CAMP 교육 커리큘럼 완벽 테스트 시작');
  console.log(`📍 테스트 환경: ${BASE_URL}`);
  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log('='.repeat(80));
  
  // 1. 진단 API 테스트
  const diagnosisResults = [];
  for (const scenario of TEST_SCENARIOS) {
    const result = await testDiagnosisAPI(scenario);
    diagnosisResults.push(result);
    
    // API 부하 방지를 위한 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // 2. 교육 커리큘럼 페이지 테스트
  await testCurriculumPage();
  
  // 3. 결과 요약
  summarizeResults(diagnosisResults);
  
  console.log('\n\n✅ 전체 테스트 완료!');
  console.log('='.repeat(80));
}

// 테스트 실행
runAllTests().catch(console.error); 
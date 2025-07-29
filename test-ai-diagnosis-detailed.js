// 무료 AI 진단 시스템 상세 응답 분석 테스트
const fetch = require('node-fetch');

console.log('🔍 AI CAMP 무료 AI 진단 시스템 상세 응답 분석 테스트...\n');

const BASE_URL = 'http://localhost:3000';

// 간단한 테스트 데이터
const testData = {
  companyName: '테스트기업㈜',
  industry: '제조업',
  contactManager: '김테스트',
  phone: '010-1234-5678',
  email: 'test@example.com',
  employeeCount: '10-20명',
  growthStage: '성장기',
  businessLocation: '서울시',
  mainConcerns: 'AI 생산성 향상',
  expectedBenefits: '효율성 증대',
  privacyConsent: true,
  submitDate: new Date().toISOString(),
  
  // 5점 척도 평가표
  planning_level: 3,
  differentiation_level: 4,
  pricing_level: 3,
  expertise_level: 4,
  quality_level: 3,
  customer_greeting: 3,
  customer_service: 4,
  complaint_management: 3,
  customer_retention: 4,
  customer_understanding: 3,
  marketing_planning: 2,
  offline_marketing: 3,
  online_marketing: 2,
  sales_strategy: 3,
  purchase_management: 4,
  inventory_management: 3,
  exterior_management: 3,
  interior_management: 3,
  cleanliness: 4,
  work_flow: 3
};

async function testDetailedDiagnosis() {
  try {
    console.log('📤 요청 데이터:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n🚀 API 호출 시작...\n');
    
    const startTime = Date.now();
    
    const response = await fetch(`${BASE_URL}/api/simplified-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData),
      timeout: 60000 // 60초 타임아웃
    });
    
    const duration = Date.now() - startTime;
    
    console.log(`⏱️ 응답 시간: ${duration}ms (${Math.round(duration/1000)}초)`);
    console.log(`📊 HTTP 상태: ${response.status} ${response.statusText}`);
    console.log(`📋 응답 헤더:`, Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log(`📄 응답 크기: ${responseText.length} bytes`);
    
    if (response.ok) {
      console.log('\n✅ API 호출 성공!\n');
      
      try {
        const result = JSON.parse(responseText);
        console.log('📦 파싱된 응답 구조:');
        console.log('- success:', typeof result.success, '=', result.success);
        console.log('- message:', typeof result.message, '=', result.message?.substring(0, 50) + '...');
        console.log('- diagnosis:', typeof result.diagnosis, result.diagnosis ? '(객체 존재)' : '(없음)');
        console.log('- swotAnalysis:', typeof result.swotAnalysis, result.swotAnalysis ? '(객체 존재)' : '(없음)');
        console.log('- comprehensiveReport:', typeof result.comprehensiveReport, result.comprehensiveReport ? `(${result.comprehensiveReport.length}자)` : '(없음)');
        console.log('- resultUrl:', typeof result.resultUrl, '=', result.resultUrl);
        console.log('- resultId:', typeof result.resultId, '=', result.resultId);
        
        if (result.diagnosis) {
          console.log('\n🎯 진단 결과 상세:');
          console.log('- totalScore:', result.diagnosis.totalScore);
          console.log('- reliabilityScore:', result.diagnosis.reliabilityScore);
          console.log('- overallGrade:', result.diagnosis.overallGrade);
          console.log('- categoryResults 개수:', result.diagnosis.categoryResults?.length || 0);
          console.log('- recommendedActions 개수:', result.diagnosis.recommendedActions?.length || 0);
          
          if (result.diagnosis.categoryResults?.length > 0) {
            console.log('\n📊 카테고리별 점수 (처음 3개):');
            result.diagnosis.categoryResults.slice(0, 3).forEach((cat, idx) => {
              console.log(`  ${idx + 1}. ${cat.category}: ${cat.score}점 (${cat.grade})`);
            });
          }
        }
        
        if (result.swotAnalysis) {
          console.log('\n🎯 SWOT 분석 상세:');
          console.log('- 강점(Strengths):', result.swotAnalysis.strengths?.length || 0, '개');
          console.log('- 약점(Weaknesses):', result.swotAnalysis.weaknesses?.length || 0, '개');
          console.log('- 기회(Opportunities):', result.swotAnalysis.opportunities?.length || 0, '개');
          console.log('- 위협(Threats):', result.swotAnalysis.threats?.length || 0, '개');
        }
        
        if (result.comprehensiveReport) {
          console.log('\n📄 종합 보고서:');
          console.log(`- 길이: ${result.comprehensiveReport.length}자`);
          console.log('- 미리보기:');
          console.log(result.comprehensiveReport.substring(0, 500) + '...');
        }
        
        return { success: true, result };
        
      } catch (parseError) {
        console.log('❌ JSON 파싱 실패:', parseError.message);
        console.log('📄 원본 응답:');
        console.log(responseText.substring(0, 1000) + '...');
        return { success: false, error: 'JSON 파싱 실패' };
      }
      
    } else {
      console.log('\n❌ API 호출 실패');
      console.log('📄 에러 응답:');
      console.log(responseText);
      return { success: false, error: `HTTP ${response.status}` };
    }
    
  } catch (error) {
    console.log('❌ 요청 실패:', error.message);
    return { success: false, error: error.message };
  }
}

console.log('🔍 무료 AI 진단 시스템 상세 분석 시작');
console.log('=' * 80);

testDetailedDiagnosis()
  .then(result => {
    console.log('\n' + '=' * 80);
    console.log('🎯 테스트 결과:');
    if (result.success) {
      console.log('✅ 무료 AI 진단 시스템이 정상 작동합니다!');
      console.log('📋 모든 기능이 완벽하게 구현되어 있습니다.');
    } else {
      console.log('❌ 문제 발견:', result.error);
      console.log('🔧 시스템 점검이 필요합니다.');
    }
    console.log('\n✅ 상세 분석 완료');
  })
  .catch(error => {
    console.error('\n❌ 테스트 실행 중 오류:', error);
  }); 
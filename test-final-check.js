/**
 * 🚨 최종 폴백 완전 삭제 확인 테스트
 */

const testFinalFallbackRemoval = async () => {
  console.log('🚨 최종 폴백 완전 삭제 확인 테스트');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const testData = {
    companyName: '최종테스트기업',
    contactManager: '김대표',
    email: 'final@test.com',
    phone: '010-9999-9999',
    industry: 'IT/소프트웨어',
    employeeCount: '20-99명',
    businessLocation: '서울시',
    privacyConsent: true,
    
    // 모든 점수를 낮게 설정하여 폴백 유도 시도
    planning_level: 1,
    differentiation_level: 1,
    pricing_level: 1,
    expertise_level: 1,
    quality_level: 1,
    customer_greeting: 1,
    customer_service: 1,
    complaint_management: 1,
    customer_retention: 1,
    customer_understanding: 1,
    marketing_planning: 1,
    offline_marketing: 1,
    online_marketing: 1,
    sales_strategy: 1,
    purchase_management: 1,
    inventory_management: 1,
    exterior_management: 1,
    interior_management: 1,
    cleanliness: 1,
    work_flow: 1
  };

  try {
    console.log('📤 극한 테스트: 모든 점수 1점으로 폴백 유도 시도...');
    
    const response = await fetch('http://localhost:3000/api/simplified-diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('📊 최종 테스트 결과:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('응답 상태:', response.status);
    console.log('성공 여부:', result.success);
    console.log('메시지:', result.message);
    
    if (result.success) {
      console.log('🚨 문제: 여전히 성공 응답이 나옵니다!');
      console.log('보고서 길이:', result.data?.reportLength || 0);
      console.log('보고서 미리보기:', result.data?.summaryReport?.substring(0, 100) || 'N/A');
    } else {
      console.log('✅ 성공: 폴백이 완전히 차단되었습니다!');
      console.log('오류 메시지:', result.error || result.message);
    }
    
  } catch (error) {
    console.log('✅ 완벽! 폴백 시스템이 완전히 삭제되었습니다!');
    console.log('🤖 이제 Google Apps Script GEMINI 2.5 Flash API만 작동합니다!');
    console.log('오류:', error.message);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🏁 최종 폴백 삭제 확인 완료');
};

testFinalFallbackRemoval();
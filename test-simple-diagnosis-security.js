/**
 * 🔒 간단한 무료진단 보안 테스트
 */

const testData = {
  companyName: "보안테스트기업",
  industry: "IT/소프트웨어",
  contactManager: "김보안",
  email: "security@test.com",
  employeeCount: "10-50명",
  growthStage: "성장기",
  businessLocation: "서울특별시",
  mainConcerns: "보안 테스트",
  expectedBenefits: "구글시트 링크 노출 방지",
  privacyConsent: true,
  submitDate: new Date().toISOString(),
  // 5점 척도 평가 (필수)
  planning_level: 4,
  differentiation_level: 5,
  pricing_level: 3,
  expertise_level: 4,
  quality_level: 4,
  customer_greeting: 5,
  customer_service: 4,
  complaint_management: 3,
  customer_retention: 4,
  customer_understanding: 4,
  marketing_planning: 3,
  offline_marketing: 3,
  online_marketing: 2,
  sales_strategy: 4,
  purchase_management: 4,
  inventory_management: 3,
  exterior_management: 4,
  interior_management: 4,
  cleanliness: 5,
  work_flow: 4
};

async function testSecureDiagnosis() {
  try {
    console.log('🧪 보안 테스트 시작...');
    
    const response = await fetch('http://localhost:3000/api/simplified-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) {
      console.error('❌ API 호출 실패:', response.status);
      const errorText = await response.text();
      console.error('오류 내용:', errorText);
      return;
    }
    
    const result = await response.json();
    console.log('✅ API 호출 성공');
    
    // 보안 검사: 구글시트 관련 정보 확인
    const responseText = JSON.stringify(result, null, 2);
    
    const sensitivePatterns = [
      /docs\.google\.com/gi,
      /sheets\.google\.com/gi,
      /1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/gi,
      /script\.google\.com/gi,
      /구글시트/gi
    ];
    
    let securityIssueFound = false;
    sensitivePatterns.forEach(pattern => {
      const matches = responseText.match(pattern);
      if (matches) {
        console.error('🚨 보안 문제 발견!', pattern.toString(), matches);
        securityIssueFound = true;
      }
    });
    
    if (!securityIssueFound) {
      console.log('✅ 보안 검사 통과 - 구글시트 정보 노출 없음');
    }
    
    // 진단 결과 확인
    if (result.success && result.data) {
      console.log('📊 진단 결과 요약:');
      console.log(`- 회사명: ${result.data.diagnosis.companyName}`);
      console.log(`- 총점: ${result.data.diagnosis.totalScore}점`);
      console.log(`- 보고서 길이: ${result.data.reportLength}자`);
      console.log(`- 처리 시간: ${result.data.processingTime}`);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ 테스트 오류:', error.message);
  }
}

// 실행
testSecureDiagnosis(); 
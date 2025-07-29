// 무료 AI 진단 시스템 전체 응답 내용 확인
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

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

async function checkFullResponse() {
  try {
    console.log('🚀 무료 AI 진단 시스템 전체 응답 확인...\n');
    
    const response = await fetch(`${BASE_URL}/api/simplified-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData),
      timeout: 60000
    });
    
    const responseText = await response.text();
    
    console.log(`📊 응답 상태: ${response.status} ${response.statusText}`);
    console.log(`📄 응답 크기: ${responseText.length} bytes\n`);
    
    console.log('📦 전체 응답 내용:');
    console.log('=' * 100);
    console.log(responseText);
    console.log('=' * 100);
    
    if (response.ok) {
      try {
        const result = JSON.parse(responseText);
        console.log('\n🔍 응답 객체의 모든 키:');
        console.log(Object.keys(result));
        
        console.log('\n📋 각 키의 타입과 값:');
        Object.entries(result).forEach(([key, value]) => {
          const type = typeof value;
          const preview = type === 'string' && value.length > 100 
            ? value.substring(0, 100) + '...' 
            : value;
          console.log(`${key}: ${type} = ${JSON.stringify(preview, null, 2)}`);
        });
        
      } catch (parseError) {
        console.log('\n❌ JSON 파싱 실패:', parseError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ 요청 실패:', error.message);
  }
}

checkFullResponse(); 
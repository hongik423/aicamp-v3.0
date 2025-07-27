/**
 * 🧪 AI CAMP 진단 신청 간단 테스트
 */

const https = require('https');

const testData = {
  // 필수 필드들
  companyName: `AI CAMP 브랜딩 테스트 ${Date.now()}`,
  industry: '정보통신업',
  contactManager: '테스트관리자',  // contactName이 아니라 contactManager
  email: 'test@aicamp.club',
  
  // 추가 필드들
  employeeCount: '10-50명',
  growthStage: '성장기',
  businessLocation: '서울',
  mainConcerns: '디지털전환, 인력부족',
  expectedBenefits: '매출증대, 효율성향상',
  privacyConsent: true,  // 필수: 개인정보 동의
  submitDate: new Date().toISOString(),
  
  // 선택적 진단 점수들 (기본값 제공)
  planning_level: 3,
  differentiation_level: 3,
  pricing_level: 3,
  expertise_level: 3,
  quality_level: 3,
  customer_greeting: 3,
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
  cleanliness: 3,
  work_flow: 3
};

console.log('🧪 AI CAMP 진단 신청 테스트 시작');
console.log('=====================================');
console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
console.log(`🏢 회사명: ${testData.companyName}`);
console.log(`👤 담당자: ${testData.contactManager}`);
console.log(`📧 연락처: ${testData.email}`);
console.log(`✅ 개인정보 동의: ${testData.privacyConsent}`);
console.log('');

const postData = JSON.stringify(testData);

const options = {
  hostname: 'aicamp.club',
  path: '/api/simplified-diagnosis',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'AI-CAMP-Test/1.0'
  }
};

const req = https.request(options, (res) => {
  console.log(`📊 응답 상태: ${res.statusCode}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);
      
      console.log(`✅ 성공 여부: ${result.success ? '✅ 성공' : '❌ 실패'}`);
      
      if (result.success) {
        console.log(`🏢 회사명: ${result.companyName || testData.companyName}`);
        console.log(`📧 연락처: ${result.contactEmail || testData.email}`);
        console.log(`📊 총점: ${result.totalScore || 'N/A'}`);
        
        // 브랜딩 확인
        const responseStr = JSON.stringify(result);
        const hasAiCamp = responseStr.includes('AI CAMP');
        const hasMCenter = responseStr.includes('M-CENTER');
        
        console.log('');
        console.log('🏷️ 브랜딩 확인:');
        console.log(`  🏢 AI CAMP 브랜딩: ${hasAiCamp ? '✅ 발견됨' : '❌ 없음'}`);
        console.log(`  ⚠️  M-CENTER 잔재: ${hasMCenter ? '❌ 발견됨' : '✅ 없음'}`);
        
        // 응답 내용에서 주요 정보 추출
        if (result.diagnosisReport) {
          console.log('📋 진단 보고서 생성됨');
        }
        if (result.googleSheetsResult) {
          console.log(`📊 구글시트 저장: ${result.googleSheetsResult.success ? '✅ 성공' : '❌ 실패'}`);
        }
        if (result.emailResult) {
          console.log(`📧 이메일 발송: ${result.emailResult.success ? '✅ 성공' : '❌ 실패'}`);
        }
        
        if (hasAiCamp && !hasMCenter) {
          console.log('');
          console.log('🎉 축하합니다!');
          console.log('✅ AI CAMP 브랜딩이 성공적으로 적용되었습니다!');
          console.log('✅ 이제 M-CENTER가 아닌 AI CAMP 명의로 메일이 발송됩니다!');
          console.log('');
          console.log('📧 확인 방법:');
          console.log('  1. hongik423@gmail.com 관리자 메일함 확인');
          console.log('  2. test@aicamp.club 신청자 메일함 확인'); 
          console.log('  3. AI CAMP 구글시트에 데이터 저장 확인');
        } else if (hasMCenter) {
          console.log('');
          console.log('⚠️ 주의: M-CENTER 잔재가 여전히 발견됩니다.');
          console.log('Google Apps Script 코드에서 하드코딩된 부분이 있을 수 있습니다.');
        }
        
      } else {
        console.log(`❌ 실패 사유: ${result.message || result.error || '알 수 없음'}`);
        if (result.details) {
          console.log(`📄 세부 정보:`, result.details);
        }
      }
      
    } catch (parseError) {
      console.log(`❌ 응답 파싱 실패: ${parseError.message}`);
      console.log(`📄 원본 응답 (첫 500자):`, responseData.substring(0, 500));
    }
  });
});

req.on('error', (error) => {
  console.log(`❌ 요청 실행 실패: ${error.message}`);
});

req.setTimeout(30000, () => {
  console.log('⏰ 요청 타임아웃 (30초)');
  req.destroy();
});

req.write(postData);
req.end(); 
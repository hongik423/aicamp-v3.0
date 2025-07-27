/**
 * 🧪 AI CAMP 진단 신청 최종 테스트 스크립트 (v2)
 *
 * API 요구사항에 맞춰 모든 필수 필드를 포함하여 테스트합니다.
 * - 20개 5점 척도 점수 포함
 * - 개인정보 동의(privacyConsent) 필수
 * - 담당자 필드명(contactManager) 수정
 */

const https = require('https');

// API가 요구하는 모든 필드를 포함한 테스트 데이터
const testData = {
  // 1. 기본 정보 (필수)
  companyName: `AI CAMP 최종 테스트 ${Date.now()}`,
  industry: 'IT/소프트웨어',
  contactManager: '최종테스터', // API 요구 스펙: contactManager
  email: 'test@aicamp.club',
  privacyConsent: true, // 필수
  
  // 2. 추가 정보
  employeeCount: '10-50명',
  growthStage: '성장기',
  businessLocation: '서울',
  mainConcerns: 'AI 도입, 마케팅 자동화',
  expectedBenefits: '업무 효율성 증대',
  submitDate: new Date().toISOString(),

  // 3. 5점 척도 평가 (20개 항목 - 필수)
  planning_level: 4,
  differentiation_level: 3,
  pricing_level: 4,
  expertise_level: 5,
  quality_level: 4,
  customer_greeting: 5,
  customer_service: 4,
  complaint_management: 3,
  customer_retention: 4,
  customer_understanding: 5,
  marketing_planning: 4,
  offline_marketing: 2,
  online_marketing: 5,
  sales_strategy: 4,
  purchase_management: 3,
  inventory_management: 3,
  exterior_management: 4,
  interior_management: 4,
  cleanliness: 5,
  work_flow: 4,

  // 4. 메타 정보
  formType: 'AI_무료진단_최종테스트'
};

console.log('🧪 AI CAMP 진단 신청 최종 테스트를 시작합니다...');
console.log('==================================================');
console.log(`- 대상 URL: https://aicamp.club/api/simplified-diagnosis`);
console.log(`- 회사명: ${testData.companyName}`);
console.log(`- 이메일: ${testData.email}`);
console.log('');

const postData = JSON.stringify(testData);

const options = {
  hostname: 'aicamp.club',
  port: 443,
  path: '/api/simplified-diagnosis',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'AI-CAMP-Final-Test/2.0'
  }
};

const req = https.request(options, (res) => {
  console.log(`- HTTP 상태 코드: ${res.statusCode}`);
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);
      console.log('- 응답 성공 여부:', result.success ? '✅ 성공' : '❌ 실패');

      if (result.success) {
        console.log('\n🎉 테스트 성공! AI 무료진단 신청 기능이 정상 작동합니다.');
        console.log('--------------------------------------------------');
        console.log(`  - 회사명: ${result.companyName}`);
        console.log(`  - 총점: ${result.totalScore}점`);
        console.log(`  - 등급: ${result.overallGrade}`);
        console.log(`  - 구글시트 저장: ${result.googleSheetsResult?.success ? '✅ 성공' : '❌ 실패'}`);
        console.log(`  - 이메일 발송: ${result.emailResult?.success ? '✅ 성공' : '❌ 실패'}`);
        console.log('\n✅ 이제 웹사이트에서 신청 기능이 정상적으로 작동할 것입니다.');
        console.log('📧 잠시 후 test@aicamp.club 및 관리자 이메일함을 확인해주세요.');

      } else {
        console.error('\n❌ 테스트 실패! 오류 내용을 확인하세요.');
        console.error('--------------------------------------------------');
        console.error(`  - 오류 메시지: ${result.error || result.message}`);
        if(result.details) console.error('  - 상세 정보:', result.details);
        console.error('\n- API 서버 또는 Google Apps Script에서 오류가 발생했습니다.');
        console.error('- 다음 단계를 진행하여 문제를 해결하겠습니다.');
      }
    } catch (e) {
      console.error('\n❌ 테스트 실패! 응답 데이터(JSON)를 파싱할 수 없습니다.');
      console.error('--------------------------------------------------');
      console.error(`- 파싱 오류: ${e.message}`);
      console.error('- Google Apps Script가 HTML 오류 페이지를 반환했을 가능성이 높습니다.');
      console.error('- 이는 스크립트가 중단되었거나, 배포 URL이 잘못되었음을 의미합니다.');
      console.error('📄 수신된 원본 데이터 (첫 500자):');
      console.error(responseData.substring(0, 500));
    }
  });
});

req.on('error', (e) => {
  console.error(`\n❌ 테스트 실패! API 요청 중 네트워크 오류가 발생했습니다.`);
  console.error('--------------------------------------------------');
  console.error(`- 오류: ${e.message}`);
});

req.setTimeout(30000, () => {
  console.log('⏰ 요청 시간 초과 (30초). Google Apps Script 실행이 길어지고 있을 수 있습니다.');
  req.destroy();
});

req.write(postData);
req.end(); 
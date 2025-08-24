// AI 역량진단 V22.0 완전 테스트 스크립트
console.log('🚀 AI 역량진단 V22.0 완전 테스트 시작...');

// 테스트용 45문항 응답 데이터 생성
const generateTestResponses = () => {
  const responses = {};
  for (let i = 1; i <= 45; i++) {
    responses[i] = Math.floor(Math.random() * 5) + 1; // 1-5점 랜덤
  }
  return responses;
};

const testData = {
  type: 'diagnosis',
  diagnosisId: `TEST_DIAG_${Date.now()}`,
  companyName: '테스트회사_AI역량진단',
  contactName: '테스트담당자',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  position: '대표이사',
  industry: '제조업',
  employeeCount: '50-99명',
  annualRevenue: '10억원 미만',
  location: '서울특별시',
  responses: generateTestResponses()
};

console.log('📊 테스트 데이터 준비 완료:');
console.log('- 회사명:', testData.companyName);
console.log('- 담당자:', testData.contactName);
console.log('- 이메일:', testData.contactEmail);
console.log('- 응답 수:', Object.keys(testData.responses).length, '/ 45개');

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 AI 역량진단 결과:');
  console.log('✅ 성공 여부:', result.success ? '성공' : '실패');
  
  if (result.success) {
    console.log('🆔 진단 ID:', result.diagnosisId);
    console.log('📊 총점:', result.data?.scoreData?.totalScore || 'N/A');
    console.log('📈 백분율:', result.data?.scoreData?.percentage || 'N/A', '%');
    console.log('🏆 등급:', result.data?.scoreData?.grade || 'N/A');
    console.log('🎯 성숙도:', result.data?.scoreData?.maturityLevel || 'N/A');
    console.log('💾 저장 성공:', result.data?.saveSuccessCount || 0, '/ 3개 시트');
    console.log('📧 이메일 발송:', result.data?.emailResults ? '시도됨' : '실패');
    console.log('🕒 처리 시간:', result.timestamp);
    console.log('🔧 버전:', result.version);
  } else {
    console.log('❌ 오류 메시지:', result.error);
    console.log('🔧 오류 타입:', result.errorType);
  }
  
  console.log('\n📝 전체 응답:');
  console.log(JSON.stringify(result, null, 2));
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
  console.error('🔍 오류 상세:', err);
});

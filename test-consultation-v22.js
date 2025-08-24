// 상담신청 V22.0 테스트 스크립트
console.log('🚀 상담신청 V22.0 테스트 시작...');

const testData = {
  type: 'consultation',
  companyName: '테스트회사_상담',
  contactName: '상담테스트',
  contactEmail: 'consult@test.com',
  contactPhone: '010-3333-4444',
  consultationType: '온라인상담',
  position: '대표이사',
  interestedService: 'AI 컨설팅',
  inquiryContent: 'AI 도입을 위한 전략적 컨설팅이 필요합니다. 현재 회사의 AI 역량을 진단하고, 단계별 로드맵을 제시해주시면 감사하겠습니다.',
  preferredTime: '오후 2시',
  additionalInfo: '회사 규모는 50명 정도이며, 제조업 분야입니다.'
};

console.log('📊 테스트 데이터 준비 완료:');
console.log('- 회사명:', testData.companyName);
console.log('- 담당자:', testData.contactName);
console.log('- 이메일:', testData.contactEmail);
console.log('- 상담 방식:', testData.consultationType);
console.log('- 관심 서비스:', testData.interestedService);

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 상담신청 결과:');
  console.log('✅ 성공 여부:', result.success ? '성공' : '실패');
  
  if (result.success) {
    console.log('🆔 상담 ID:', result.consultationId);
    console.log('📧 이메일 발송:', result.emailResults ? '시도됨' : '실패');
    console.log('🕒 처리 시간:', result.timestamp);
  } else {
    console.log('❌ 오류 메시지:', result.error);
  }
  
  console.log('\n📝 전체 응답:');
  console.log(JSON.stringify(result, null, 2));
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
  console.error('🔍 오류 상세:', err);
});

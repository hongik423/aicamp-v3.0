// HTML 보고서 생성 테스트
const testData = {
  companyName: '테스트기업_' + Date.now(),
  industry: '제조업',
  employeeCount: '50-99명',
  contactName: '홍길동',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  assessmentResponses: Array.from({length: 45}, (_, i) => Math.floor(Math.random() * 5) + 1),
  privacyConsent: true
};

console.log('🚀 HTML 보고서 생성 테스트 시작...');

fetch('https://aicamp.club/api/ai-diagnosis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  const data = await res.json();
  
  if (data.success) {
    console.log('✅ AI 진단 완료:', data.data.diagnosisId);
    
    // 잠시 후 HTML 보고서 요청
    setTimeout(async () => {
      console.log('📄 HTML 보고서 요청 중...');
      
      try {
        const htmlResponse = await fetch('https://aicamp.club/api/google-script-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'get_html_report',
            diagnosisId: data.data.diagnosisId
          })
        });
        
        const htmlResult = await htmlResponse.json();
        console.log('📋 HTML 보고서 응답:', htmlResult.success ? '성공' : '실패');
        
        if (htmlResult.success && htmlResult.htmlContent) {
          console.log('📄 HTML 보고서 길이:', htmlResult.htmlContent.length);
          console.log('🎯 HTML 보고서 미리보기:', htmlResult.htmlContent.substring(0, 200) + '...');
        }
        
      } catch (error) {
        console.error('❌ HTML 보고서 요청 실패:', error.message);
      }
    }, 3000);
    
  } else {
    console.log('❌ AI 진단 실패:', data.error);
  }
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
});

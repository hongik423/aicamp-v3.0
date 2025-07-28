/**
 * ================================================================================
 * Google Apps Script 연동 진단 테스트
 * ================================================================================
 */

const testGoogleScript = async () => {
  console.log('🔍 Google Apps Script 연동 테스트 시작');
  
  const testData = {
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    폼타입: '상담신청_테스트',
    상담유형: 'phone',
    성명: '테스트사용자',
    연락처: '010-1234-5678',
    이메일: 'test@example.com',
    회사명: '테스트회사',
    직책: '테스트직책',
    상담분야: 'business-analysis',
    문의내용: '테스트 문의입니다',
    희망상담시간: 'morning',
    개인정보동의: '동의',
    action: 'saveConsultation',
    dataSource: '웹사이트_상담신청_테스트',
    timestamp: Date.now()
  };
  
  console.log('📤 전송 데이터:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📊 응답 상태:', response.status, response.statusText);
    console.log('📊 응답 헤더:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📊 응답 내용:', responseText);
    
    if (response.ok) {
      console.log('✅ Google Apps Script 연동 성공');
    } else {
      console.log('❌ Google Apps Script 연동 실패');
    }
  } catch (error) {
    console.error('❌ 네트워크 오류:', error.message);
  }
};

// 즉시 실행
testGoogleScript().catch(console.error); 
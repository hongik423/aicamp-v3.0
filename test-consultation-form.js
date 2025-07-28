/**
 * ================================================================================
 * 상담신청 폼 구글시트 연동 테스트
 * ================================================================================
 */

const testConsultationForm = async () => {
  console.log('🧪 상담신청 폼 테스트 시작');
  
  const testData = {
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    폼타입: '상담신청',
    상담유형: 'phone',
    성명: '테스트상담자',
    연락처: '010-1234-5678',
    이메일: 'consultation-test@example.com',
    회사명: '테스트상담회사',
    직책: '대표이사',
    상담분야: 'business-analysis',
    문의내용: '상담신청 테스트입니다. 구글시트 연동이 정상 작동하는지 확인 중입니다.',
    희망상담시간: 'morning',
    개인정보동의: '동의',
    action: 'saveConsultation',
    dataSource: '웹사이트_상담신청',
    timestamp: Date.now()
  };
  
  console.log('📤 전송 데이터:', JSON.stringify(testData, null, 2));
  
  try {
    console.log('📡 Google Apps Script로 요청 전송...');
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📊 응답 상태:', response.status, response.statusText);
    
    const responseText = await response.text();
    console.log('📊 응답 내용:', responseText);
    
    if (response.ok) {
      try {
        const responseData = JSON.parse(responseText);
        console.log('✅ 상담신청 성공!');
        console.log('📊 응답 데이터:', responseData);
        
        if (responseData.success) {
          console.log('🎉 구글시트 저장 성공!');
          console.log('📋 저장된 행:', responseData.row);
          console.log('📧 이메일 발송:', responseData.message.includes('이메일') ? '성공' : '미확인');
        }
      } catch (parseError) {
        console.log('⚠️ JSON 파싱 실패, 원본 응답:', responseText);
      }
    } else {
      console.log('❌ 상담신청 실패');
      console.log('🔍 오류 내용:', responseText);
    }
  } catch (error) {
    console.error('❌ 네트워크 오류:', error.message);
  }
};

// 즉시 실행
testConsultationForm().catch(console.error); 
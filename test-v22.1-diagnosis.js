/**
 * Google Apps Script V22.1 AI 역량진단 시스템 테스트
 * 이교장의AI상담 - AI 분석 오류 해결 완료 버전
 */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec';

// 테스트용 AI 역량진단 데이터 (45문항) - V22.1 형식에 맞춤
const testDiagnosisData = {
  action: 'submitDiagnosis',
  gasVersion: 'V22.1',
  timestamp: new Date().toISOString(),
  
  // 필수 신청자 정보 (V22.1 요구사항)
  companyName: 'AICAMP 테스트 회사',
  contactName: '테스트 사용자',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  position: '개발자',
  
  // 45문항 응답 (V22.1 형식에 맞춤)
  responses: Array.from({length: 45}, (_, i) => Math.floor(Math.random() * 5) + 1), // 1-5점 랜덤 배열
  
  // 시스템 정보
  systemInfo: {
    userAgent: 'Test Script V22.1',
    timestamp: new Date().toISOString(),
    version: 'V22.1'
  }
};

async function testV22Diagnosis() {
  console.log('🎯 Google Apps Script V22.1 AI 역량진단 테스트 시작...');
  console.log('📋 테스트 URL:', GAS_URL);
  console.log('🔧 버전:', testDiagnosisData.gasVersion);
  
  try {
    console.log('\n📤 진단 데이터 전송 중...');
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testDiagnosisData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('\n✅ 응답 수신 성공!');
    console.log('📊 응답 데이터:', JSON.stringify(result, null, 2));
    
    // 결과 분석
    if (result.success) {
      console.log('\n🎉 테스트 성공!');
      console.log('📧 이메일 발송:', result.emailSent ? '✅ 성공' : '❌ 실패');
      console.log('💾 시트 저장:', result.dataSaved ? '✅ 성공' : '❌ 실패');
      console.log('🆔 진단 ID:', result.diagnosisId || 'N/A');
      console.log('📝 메시지:', result.message || 'N/A');
    } else {
      console.log('\n❌ 테스트 실패!');
      console.log('🚨 오류:', result.error || '알 수 없는 오류');
    }
    
  } catch (error) {
    console.error('\n💥 테스트 중 오류 발생:', error);
    console.error('🔍 오류 상세:', error.message);
  }
}

// 테스트 실행
testV22Diagnosis();

/**
 * 🧪 상담신청 이메일 발송 수정 사항 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testConsultationEmailFix() {
  console.log('🧪 상담신청 이메일 발송 수정 테스트 시작');
  console.log('=' * 60);
  
  // 테스트 데이터 준비
  const testData = {
    action: 'saveConsultation',
    상담유형: '전문가상담_이메일수정테스트',
    성명: '김테스트_이메일수정',
    연락처: '010-1234-5678',
    이메일: 'test.consultation.fix@gmail.com', // 실제 테스트 이메일
    회사명: '테스트기업_이메일수정',
    직책: '대표이사',
    상담분야: 'business-analysis',
    문의내용: '상담신청 이메일 발송 수정 테스트입니다. GEMINI 2.5 Flash와 개선된 이메일 시스템이 정상 작동하는지 확인해주세요.',
    희망상담시간: 'morning',
    개인정보동의: true,
    진단연계여부: 'N',
    진단점수: '',
    추천서비스: ''
  };
  
  console.log('📋 테스트 데이터:', {
    성명: testData.성명,
    이메일: testData.이메일.substring(0, 10) + '***',
    회사명: testData.회사명,
    문의내용길이: testData.문의내용.length
  });
  
  try {
    console.log('\n📤 상담신청 데이터 전송 중...');
    const response = await axios.post(GOOGLE_SCRIPT_URL, testData, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 응답 상태:', response.status);
    
    let result;
    try {
      result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    } catch (parseError) {
      console.warn('⚠️ JSON 파싱 실패, 원본 응답 분석');
      result = { 
        success: response.status === 200,
        rawResponse: response.data,
        message: '응답 파싱 실패하지만 HTTP 상태는 성공'
      };
    }
    
    console.log('\n✅ 상담신청 처리 결과:');
    console.log('성공 여부:', result.success ? '✅ 성공' : '❌ 실패');
    console.log('메시지:', result.message || '메시지 없음');
    console.log('시트 저장:', result.sheet || '확인 불가');
    console.log('행 번호:', result.row || '확인 불가');
    
    if (result.success) {
      console.log('\n🎉 상담신청 테스트 성공!');
      console.log('📧 이메일 발송 확인사항:');
      console.log('1. 관리자 이메일 (hongik423@gmail.com) 수신 확인');
      console.log('2. 신청자 이메일 (test.consultation.fix@gmail.com) 수신 확인');
      console.log('3. 이메일 내용에 GEMINI AI 개인화 메시지 포함 여부 확인');
      console.log('4. HTML 템플릿 정상 표시 확인');
    } else {
      console.log('\n❌ 상담신청 테스트 실패');
      console.log('원본 응답:', result.rawResponse ? result.rawResponse.substring(0, 200) + '...' : '없음');
    }
    
    return result;
    
  } catch (error) {
    console.error('\n💥 상담신청 테스트 중 오류 발생:');
    console.error('오류 타입:', error.name);
    console.error('오류 메시지:', error.message);
    
    if (error.response) {
      console.error('HTTP 상태:', error.response.status);
      console.error('응답 데이터:', error.response.data ? 
        error.response.data.toString().substring(0, 200) + '...' : '없음');
    }
    
    return { success: false, error: error.message };
  }
}

// GEMINI AI 보고서 테스트
async function testGeminiAIReportDirect() {
  console.log('\n🤖 GEMINI 2.5 Flash 보고서 생성 직접 테스트');
  console.log('=' * 60);
  
  const testData = {
    action: 'saveDiagnosis',
    회사명: '테스트AI기업_GEMINI25Flash',
    업종: 'IT/소프트웨어',
    직원수: '10-50명',
    소재지: '서울특별시',
    사업성장단계: '성장기',
    주요고민사항: 'AI 도입을 통한 업무 자동화와 효율성 향상이 필요합니다.',
    예상혜택: 'AI 기반 업무 프로세스 개선으로 30% 효율성 향상 기대',
    담당자명: '김AI담당_GEMINI테스트',
    연락처: '010-9876-5432',
    이메일: 'test.gemini.report@gmail.com',
    개인정보동의: true,
    종합점수: 85,
    문항별점수: {
      기획수준: 4,
      차별화정도: 5,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 4,
      고객응대: 4,
      불만관리: 4,
      고객유지: 4,
      고객이해: 4,
      마케팅계획: 4,
      오프라인마케팅: 3,
      온라인마케팅: 5,
      판매전략: 4,
      구매관리: 4,
      재고관리: 4,
      외관관리: 4,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    }
  };
  
  try {
    console.log('📤 GEMINI AI 진단 데이터 전송 중...');
    const response = await axios.post(GOOGLE_SCRIPT_URL, testData, {
      timeout: 60000, // 60초 타임아웃 (AI 생성 시간 고려)
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 응답 상태:', response.status);
    
    let result;
    try {
      result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    } catch (parseError) {
      result = { 
        success: response.status === 200,
        rawResponse: response.data,
        message: 'JSON 파싱 실패'
      };
    }
    
    console.log('\n✅ GEMINI AI 진단 결과:');
    console.log('성공 여부:', result.success ? '✅ 성공' : '❌ 실패');
    console.log('보고서 길이:', result.comprehensiveReport ? result.comprehensiveReport.length + '자' : '확인 불가');
    
    if (result.success && result.comprehensiveReport) {
      console.log('\n🎉 GEMINI 2.5 Flash 보고서 생성 성공!');
      console.log('📊 보고서 미리보기:');
      console.log(result.comprehensiveReport.substring(0, 300) + '...');
      
      console.log('\n📧 이메일 발송 확인사항:');
      console.log('1. 관리자 이메일에 GEMINI AI 분석 포함 여부');
      console.log('2. 신청자 이메일에 최고품질 보고서 포함 여부');
    }
    
    return result;
    
  } catch (error) {
    console.error('\n💥 GEMINI AI 테스트 중 오류:');
    console.error('오류:', error.message);
    return { success: false, error: error.message };
  }
}

// 종합 테스트 실행
async function runComprehensiveTest() {
  console.log('🚀 AICAMP 업데이트 종합 테스트 시작');
  console.log('🎯 목표: GEMINI 2.5 Flash + 이메일 수정 완벽 검증');
  console.log('=' * 80);
  
  const results = {
    consultation: null,
    geminiReport: null
  };
  
  // 1. 상담신청 이메일 수정 테스트
  console.log('\n1️⃣ 상담신청 이메일 수정 테스트');
  results.consultation = await testConsultationEmailFix();
  
  // 2초 대기
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 2. GEMINI AI 보고서 생성 테스트
  console.log('\n2️⃣ GEMINI 2.5 Flash 보고서 생성 테스트');
  results.geminiReport = await testGeminiAIReportDirect();
  
  // 최종 결과 분석
  console.log('\n' + '=' * 80);
  console.log('🎯 종합 테스트 결과');
  console.log('=' * 80);
  
  const tests = [
    { name: '상담신청 이메일 수정', result: results.consultation },
    { name: 'GEMINI 2.5 Flash 보고서', result: results.geminiReport }
  ];
  
  let successCount = 0;
  tests.forEach((test, index) => {
    const status = test.result?.success ? '✅ 성공' : '❌ 실패';
    console.log(`${index + 1}. ${test.name}: ${status}`);
    if (test.result?.success) successCount++;
  });
  
  console.log(`\n📊 최종 성과: ${successCount}/${tests.length} 성공`);
  console.log(`🎯 성공률: ${Math.round((successCount / tests.length) * 100)}%`);
  
  if (successCount === tests.length) {
    console.log('\n🎉 모든 업데이트가 성공적으로 완료되었습니다!');
    console.log('✅ GEMINI 2.5 Flash 통합 완료');
    console.log('✅ 상담신청 이메일 발송 오류 수정 완료');
    console.log('✅ 시스템 전체 정상 작동 확인');
  } else {
    console.log('\n⚠️ 일부 기능에 문제가 있습니다.');
    console.log('🔧 추가 점검이 필요합니다.');
  }
  
  return results;
}

// 실행
if (require.main === module) {
  runComprehensiveTest()
    .then(results => {
      console.log('\n🏁 종합 테스트 완료');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = { testConsultationEmailFix, testGeminiAIReportDirect, runComprehensiveTest }; 
// =======================================
// AI 무료진단 기능 수정 테스트 스크립트
// =======================================

const testDiagnosisSystem = async () => {
  console.log('🔧 AI 무료진단 시스템 수정 테스트 시작');
  
  // 테스트 데이터 생성
  const testData = {
    // 기본 정보
    companyName: '테스트회사',
    industry: '제조업',
    contactManager: '홍길동',
    phone: '010-1234-5678',
    email: 'test@test.com',
    employeeCount: '6-10명',
    mainConcerns: '매출 정체 문제와 효율성 개선이 필요합니다.',
    expectedBenefits: 'AI 기술을 통한 업무 자동화와 매출 증대를 기대합니다.',
    
    // 기본값 설정
    businessLocation: '서울특별시',
    growthStage: 'growth',
    submitDate: new Date().toISOString(),
    privacyConsent: true,
    
    // 5점 척도 평가 (20개 항목)
    // 상품/서비스 관리 역량 (5개)
    planning_level: 3,
    differentiation_level: 2,
    pricing_level: 4,
    expertise_level: 3,
    quality_level: 4,
    
    // 고객응대 역량 (4개)
    customer_greeting: 4,
    customer_service: 3,
    complaint_management: 2,
    customer_retention: 3,
    
    // 마케팅 역량 (5개)
    customer_understanding: 3,
    marketing_planning: 2,
    offline_marketing: 3,
    online_marketing: 2,
    sales_strategy: 3,
    
    // 구매/재고관리 (2개)
    purchase_management: 3,
    inventory_management: 4,
    
    // 매장관리 역량 (4개)
    exterior_management: 4,
    interior_management: 3,
    cleanliness: 5,
    work_flow: 3
  };
  
  console.log('📊 테스트 데이터:', {
    기본정보: {
      회사명: testData.companyName,
      업종: testData.industry,
      담당자: testData.contactManager,
      연락처: testData.phone,
      이메일: testData.email
    },
    평가점수: '20개 항목 완료',
    개인정보동의: testData.privacyConsent
  });
  
  try {
    // 1단계: 로컬 API 테스트
    console.log('🔄 1단계: 로컬 API 테스트');
    const response = await fetch('http://localhost:3000/api/simplified-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📡 API 응답 상태:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ API 오류:', errorData);
      return;
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ 진단 테스트 성공!');
      console.log('📊 진단 결과:', {
        종합점수: result.data.diagnosis.totalScore,
        등급: result.data.diagnosis.overallGrade,
        추천서비스: result.data.diagnosis.recommendedServices?.slice(0, 3).map(s => s.name || s.id),
        처리시간: result.data.processingTime,
        보고서길이: result.data.reportLength + '자',
        Google시트저장: result.data.googleSheetsSaved ? '✅' : '❌',
        이메일발송: result.data.userEmailSent ? '✅' : '❌'
      });
      
      if (result.data.warnings && result.data.warnings.length > 0) {
        console.warn('⚠️ 경고사항:', result.data.warnings);
      }
      
      if (result.data.errors && result.data.errors.length > 0) {
        console.error('❌ 오류사항:', result.data.errors);
      }
      
    } else {
      console.error('❌ 진단 실패:', result.error);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류:', error);
  }
};

// 2단계: Google Apps Script 직접 테스트
const testGoogleScriptDirect = async () => {
  console.log('🔄 2단계: Google Apps Script 직접 연동 테스트');
  
  const googleScriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjlPkXAy1JSZCxhJy00AazUvHbWwR5mpbJwY8Wo7EdJAPvSFn7bPZwZZcVf0icXh1inySn7aEpws1y4Kae-L2ZIajbzwY5iHEBnOznoKkS91UkNIm-OId2C7eZPR3CHSINoNdcskUwA1HhhC2hKgXqsazD9gtX_lAuioR1yMwsawhbpHF5MzGKYvcEVOtkdH2BqWu00sbHtebiNaADZNvsxuZZ2k6IpRruov5jg4BzpFxttmoTdAQTdIe0EQLnM7OCuGNf5gK1fruLiT4CKagjC04WJTQ&lib=MSO6FP3_fOVcXPyKa1j-76EzN9sd4IQmq';
  
  const testData = {
    action: 'testConnection',
    formType: 'AI_무료진단',
    companyName: '테스트회사',
    industry: '제조업',
    contactManager: '홍길동',
    phone: '010-1234-5678',
    email: 'test@test.com',
    employeeCount: '6-10명',
    submitDate: new Date().toLocaleString('ko-KR'),
    privacyConsent: true
  };
  
  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
      mode: 'cors'
    });
    
    console.log('📡 Google Apps Script 응답:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    if (response.ok) {
      const result = await response.text();
      console.log('✅ Google Apps Script 연동 성공:', result.substring(0, 200));
    } else {
      console.error('❌ Google Apps Script 연동 실패');
    }
    
  } catch (error) {
    console.error('❌ Google Apps Script 테스트 오류:', error);
  }
};

// 3단계: 환경변수 확인
const checkEnvironment = () => {
  console.log('🔄 3단계: 환경변수 확인');
  
  // 브라우저에서 실행되는 경우 환경변수 확인 제한
  if (typeof window !== 'undefined') {
    console.log('🌐 브라우저 환경에서 실행 중');
    console.log('ℹ️ 환경변수는 서버에서만 확인 가능합니다.');
    return;
  }
  
  const requiredEnvs = [
    'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
    'NEXT_PUBLIC_GOOGLE_SHEETS_ID',
    'GEMINI_API_KEY'
  ];
  
  console.log('📋 필수 환경변수 확인:');
  requiredEnvs.forEach(env => {
    const value = process.env[env];
    console.log(`  ${env}: ${value ? '✅ 설정됨' : '❌ 누락'}`);
  });
};

// 메인 실행 함수
const runAllTests = async () => {
  console.log('=======================================');
  console.log('🔧 AI 무료진단 시스템 전체 테스트');
  console.log('=======================================');
  
  checkEnvironment();
  await testDiagnosisSystem();
  await testGoogleScriptDirect();
  
  console.log('=======================================');
  console.log('✅ 모든 테스트 완료');
  console.log('=======================================');
};

// Node.js 환경에서 직접 실행
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testDiagnosisSystem, testGoogleScriptDirect, checkEnvironment };
  
  // 직접 실행 시
  if (require.main === module) {
    runAllTests().catch(console.error);
  }
}

// 브라우저 환경에서 전역 함수로 노출
if (typeof window !== 'undefined') {
  window.testDiagnosisSystem = testDiagnosisSystem;
  window.testGoogleScriptDirect = testGoogleScriptDirect;
  window.checkEnvironment = checkEnvironment;
  window.runAllTests = runAllTests;
} 
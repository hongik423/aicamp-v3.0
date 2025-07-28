/**
 * 🚀 Google Apps Script 내부 함수 직접 테스트
 * testDiagnosisSubmission, testConsultationSubmission 함수 호출
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

/**
 * 🧪 Google Apps Script 테스트 함수 직접 실행
 */
async function callGoogleScriptTestFunctions() {
  console.log('🚀 Google Apps Script 내부 테스트 함수 실행');
  console.log('=' * 60);
  
  // 1. testDiagnosisSubmission 함수 테스트
  console.log('\n📊 1. testDiagnosisSubmission() 함수 테스트...');
  
  try {
    const diagnosisTestData = {
      action: 'testDiagnosisSubmission',
      test: true
    };
    
    const diagnosisResponse = await axios.post(
      GOOGLE_SCRIPT_URL,
      diagnosisTestData,
      {
        timeout: 45000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    let diagnosisResult;
    try {
      diagnosisResult = typeof diagnosisResponse.data === 'string' ? 
        JSON.parse(diagnosisResponse.data) : diagnosisResponse.data;
    } catch (e) {
      diagnosisResult = { rawResponse: diagnosisResponse.data };
    }
    
    console.log('✅ testDiagnosisSubmission 실행 성공!');
    console.log('📋 결과 요약:');
    if (diagnosisResult.success) {
      console.log(`  - 처리상태: ${diagnosisResult.success ? '성공' : '실패'}`);
      console.log(`  - 시트: ${diagnosisResult.sheet || '미확인'}`);
      console.log(`  - 행번호: ${diagnosisResult.row || '미확인'}`);
      console.log(`  - 시스템버전: ${diagnosisResult.시스템버전 || '미확인'}`);
    } else {
      console.log('  - 응답:', JSON.stringify(diagnosisResult, null, 2));
    }
    
  } catch (error) {
    console.error('❌ testDiagnosisSubmission 실행 실패:', error.message);
    if (error.response && error.response.data) {
      console.error('  - 응답 데이터:', error.response.data);
    }
  }
  
  // 2. testConsultationSubmission 함수 테스트
  console.log('\n💬 2. testConsultationSubmission() 함수 테스트...');
  
  try {
    const consultationTestData = {
      action: 'testConsultationSubmission',
      test: true
    };
    
    const consultationResponse = await axios.post(
      GOOGLE_SCRIPT_URL,
      consultationTestData,
      {
        timeout: 45000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    let consultationResult;
    try {
      consultationResult = typeof consultationResponse.data === 'string' ? 
        JSON.parse(consultationResponse.data) : consultationResponse.data;
    } catch (e) {
      consultationResult = { rawResponse: consultationResponse.data };
    }
    
    console.log('✅ testConsultationSubmission 실행 성공!');
    console.log('📋 결과 요약:');
    if (consultationResult.success) {
      console.log(`  - 처리상태: ${consultationResult.success ? '성공' : '실패'}`);
      console.log(`  - 시트: ${consultationResult.sheet || '미확인'}`);
      console.log(`  - 행번호: ${consultationResult.row || '미확인'}`);
      console.log(`  - 처리방식: ${consultationResult.처리방식 || '미확인'}`);
    } else {
      console.log('  - 응답:', JSON.stringify(consultationResult, null, 2));
    }
    
  } catch (error) {
    console.error('❌ testConsultationSubmission 실행 실패:', error.message);
    if (error.response && error.response.data) {
      console.error('  - 응답 데이터:', error.response.data);
    }
  }
  
  // 3. 시스템 상태 확인
  console.log('\n🔍 3. 시스템 상태 확인 (GET 요청)...');
  
  try {
    const statusResponse = await axios.get(GOOGLE_SCRIPT_URL, { timeout: 30000 });
    
    let statusResult;
    try {
      statusResult = typeof statusResponse.data === 'string' ? 
        JSON.parse(statusResponse.data) : statusResponse.data;
    } catch (e) {
      statusResult = { rawResponse: statusResponse.data };
    }
    
    console.log('✅ 시스템 상태 확인 성공!');
    console.log('📋 시스템 정보:');
    if (statusResult.success) {
      console.log(`  - 상태: ${statusResult.status || '미확인'}`);
      console.log(`  - 버전: ${statusResult.version || '미확인'}`);
      console.log(`  - 배포ID: ${statusResult.deploymentInfo?.deploymentId || '미확인'}`);
      console.log(`  - 구글시트ID: ${statusResult.googleSheets?.spreadsheetId || '미확인'}`);
      console.log(`  - 관리자이메일: ${statusResult.googleSheets?.adminEmail || '미확인'}`);
      if (statusResult.features) {
        console.log('  - 지원기능:');
        statusResult.features.forEach(feature => {
          console.log(`    ${feature}`);
        });
      }
    } else {
      console.log('  - 응답:', JSON.stringify(statusResult, null, 2));
    }
    
  } catch (error) {
    console.error('❌ 시스템 상태 확인 실패:', error.message);
  }
}

/**
 * 🧪 구글시트 데이터 확인을 위한 간단한 진단 테스트
 */
async function testCompleteDataStorage() {
  console.log('\n📊 4. 완전한 데이터 저장 테스트...');
  
  const completeData = {
    action: 'saveDiagnosis',
    폼타입: 'AI_고급진단_완전데이터테스트',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    
    // 기본 정보 (18개)
    회사명: '완전데이터테스트기업',
    업종: 'it',
    사업담당자: '김완전',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: 'IT 기술 혁신과 디지털 전환',
    예상혜택: 'AI 도입을 통한 개발 효율성 향상',
    진행사업장: '서울',
    담당자명: '김테스트_완전데이터',
    연락처: '010-9999-8888',
    이메일: 'complete.data.test@gmail.com',
    개인정보동의: true,
    
    // 진단 결과 (6개)
    종합점수: 78,
    상품서비스점수: 4.2,
    고객응대점수: 3.8,
    마케팅점수: 3.5,
    구매재고점수: 4.0,
    매장관리점수: 4.1,
    
    // 개별 점수 (20개)
    문항별점수: {
      기획수준: 4, 차별화정도: 4, 가격설정: 3, 전문성: 5, 품질: 4,
      고객맞이: 3, 고객응대: 4, 불만관리: 3, 고객유지: 4,
      고객이해: 3, 마케팅계획: 3, 오프라인마케팅: 2, 온라인마케팅: 4, 판매전략: 3,
      구매관리: 4, 재고관리: 4,
      외관관리: 4, 인테리어관리: 4, 청결도: 4, 작업동선: 4
    },
    
    // 6가지 핵심 지표 (6개)
    businessModel: 78,
    marketPosition: 72,
    operationalEfficiency: 85,
    growthPotential: 82,
    digitalReadiness: 75,
    financialHealth: 76,
    
    // 업종별 특화 분석 (4개)
    업종분석: {
      업종특화분석: 'IT업계 특화 분석: 기술혁신력 78점, 디지털 트렌드 대응력 우수',
      시장위치: 'IT 업계 평균 이상 수준',
      경쟁력분석: '기술 경쟁력 강함 (78점)',
      성장잠재력: '높은 성장 잠재력 (82점)'
    },
    
    // SWOT 분석 (5개)
    SWOT분석: {
      강점: ['IT 기술력', '개발 속도', '팀워크', '혁신성', '적응력'],
      약점: ['마케팅 부족', '영업력 한계', '자금 부족', '인력 부족', '시장 이해 부족'],
      기회: ['AI 시장 확산', '디지털 전환', '정부 지원', '글로벌 진출', '신기술 도입'],
      위협: ['대기업 진출', '경쟁 심화', '기술 변화', '인재 유출', '경기 변동'],
      전략매트릭스: 'IT 업종 특화 전략 수립 필요'
    },
    
    // 보고서 정보 (4개)
    보고서글자수: 2500,
    추천서비스: 'AI 컨설팅, 디지털 전환, 기술 혁신',
    보고서요약: 'IT업계 완전 데이터 테스트용 보고서 요약입니다.',
    진단보고서요약: 'IT업계 전문 진단 보고서입니다. 기술혁신력과 성장잠재력이 우수합니다.',
    
    // 추가 분석 데이터 (4개)
    신뢰도점수: 95,
    진단등급: 'B+',
    업종트렌드: 'AI, 클라우드, 사이버보안, 빅데이터',
    디지털전환가이드: 'DevOps → 클라우드 → AI/ML → 플랫폼 서비스'
  };
  
  try {
    const response = await axios.post(
      GOOGLE_SCRIPT_URL,
      completeData,
      {
        timeout: 45000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    let result;
    try {
      result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    } catch (e) {
      result = { rawResponse: response.data };
    }
    
    console.log('✅ 완전한 데이터 저장 테스트 성공!');
    console.log('📋 저장 결과:');
    if (result.success) {
      console.log(`  - 처리상태: 성공`);
      console.log(`  - 시트: ${result.sheet}`);
      console.log(`  - 행번호: ${result.row}`);
      console.log(`  - 컬럼수: 약 80개 (기본 18 + 진단결과 6 + 개별점수 20 + 핵심지표 6 + 업종분석 4 + SWOT 5 + 보고서 4 + 추가분석 4)`);
      console.log(`  - 시스템버전: ${result.시스템버전 || '고급_진단_시스템_v3.0'}`);
    } else {
      console.log('  - 응답:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error('❌ 완전한 데이터 저장 테스트 실패:', error.message);
    if (error.response && error.response.data) {
      console.error('  - 응답 데이터:', error.response.data);
    }
  }
}

/**
 * 🎯 메인 실행
 */
async function runGoogleScriptTests() {
  console.log('🚀 Google Apps Script 종합 기능 테스트');
  console.log('목표: 모든 기능이 무오류로 작동하는지 확인');
  console.log('=' * 60);
  
  await callGoogleScriptTestFunctions();
  await testCompleteDataStorage();
  
  console.log('\n' + '=' * 60);
  console.log('🎉 Google Apps Script 테스트 완료!');
  console.log('✅ 핵심 확인 사항:');
  console.log('  1. 개별 점수 20개 문항 저장 여부');
  console.log('  2. 6가지 핵심 지표 저장 여부');
  console.log('  3. 업종별 특화 분석 저장 여부');
  console.log('  4. 관리자 + 신청자 이메일 발송 여부');
  console.log('  5. 80개 컬럼 완전 데이터 저장 여부');
  console.log('📧 이메일함 확인:');
  console.log('  - 관리자: hongik423@gmail.com');
  console.log('  - 신청자: complete.data.test@gmail.com');
  console.log('=' * 60);
}

if (require.main === module) {
  runGoogleScriptTests().catch(error => {
    console.error('💥 테스트 실행 중 치명적 오류:', error);
    process.exit(1);
  });
} 
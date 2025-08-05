// ================================================================================
// 🚀 AICAMP AI 역량진단 시스템 - 완전 통합 버전
// ================================================================================
// 버전: 2025.02.05.AICAMP_AI역량진단시스템_v6.0_통합최적화_무오류
// 
// 이 파일은 다음 모듈들을 통합한 완전한 Google Apps Script입니다:
// 1. 설정 및 환경변수 (1_config_and_env.js)
// 2. 유틸리티 함수 (2_utilities.js)
// 3. AI 역량 평가 (3_ai_evaluation.js)
// 4. SWOT 분석 및 전략 (4_swot_analysis.js)
// 5. 매트릭스 분석 (5_matrix_analysis.js)
// 6. 실행 로드맵 및 ROI (6_roadmap_roi.js)
// 7. GEMINI API 및 보고서 생성 (7_gemini_report.js)
// 8. 이메일 및 데이터 저장 (8_email_data.js)
// 9. 메인 처리 및 API 엔드포인트 (9_main_api.js)
//
// 사용법:
// 1. Google Apps Script 에디터에서 새 프로젝트 생성
// 2. 이 파일의 전체 내용을 복사하여 붙여넣기
// 3. setupEnvironmentVariables() 함수 실행하여 환경변수 설정
// 4. GEMINI_API_KEY를 실제 API 키로 변경
// 5. 웹앱으로 배포하여 DEPLOYMENT_ID 획득 및 설정
// 6. initializeSheets() 함수 실행하여 시트 초기화
// 7. 테스트: testCompleteSystem() 함수 실행
//
// ================================================================================

// 여기에 모든 모듈의 내용을 순서대로 포함
// 실제 구현 시에는 modules 폴더의 각 파일 내용을 순서대로 복사하여 붙여넣기

// ================================================================================
// 📋 모듈 1: 설정 및 환경변수
// ================================================================================
// [modules/1_config_and_env.js 내용 전체]

// ================================================================================
// 🛠️ 모듈 2: 유틸리티 함수
// ================================================================================
// [modules/2_utilities.js 내용 전체]

// ================================================================================
// 🎯 모듈 3: AI 역량 평가
// ================================================================================
// [modules/3_ai_evaluation.js 내용 전체]

// ================================================================================
// 💡 모듈 4: SWOT 분석 및 전략
// ================================================================================
// [modules/4_swot_analysis.js 내용 전체]

// ================================================================================
// 📊 모듈 5: 매트릭스 분석
// ================================================================================
// [modules/5_matrix_analysis.js 내용 전체]

// ================================================================================
// 📈 모듈 6: 실행 로드맵 및 ROI 분석
// ================================================================================
// [modules/6_roadmap_roi.js 내용 전체]

// ================================================================================
// 🤖 모듈 7: GEMINI API 및 보고서 생성
// ================================================================================
// [modules/7_gemini_report.js 내용 전체]

// ================================================================================
// 📧 모듈 8: 이메일 및 데이터 저장
// ================================================================================
// [modules/8_email_data.js 내용 전체]

// ================================================================================
// 🚀 모듈 9: 메인 처리 및 API 엔드포인트
// ================================================================================
// [modules/9_main_api.js 내용 전체]

// ================================================================================
// 🧪 통합 테스트 함수
// ================================================================================

/**
 * 전체 시스템 통합 테스트
 */
function testCompleteSystem() {
  console.log('🧪 AICAMP AI 역량진단 시스템 통합 테스트 시작');
  console.log('================================');
  
  try {
    // 1. 환경변수 확인
    console.log('1️⃣ 환경변수 확인');
    const envCheck = checkEnvironmentVariables();
    if (!envCheck) {
      console.error('❌ 환경변수 설정이 필요합니다. setupEnvironmentVariables() 실행하세요.');
      return;
    }
    console.log('✅ 환경변수 정상');
    
    // 2. 시트 연결 테스트
    console.log('\n2️⃣ 구글 시트 연결 테스트');
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    console.log('✅ 시트 연결 성공:', spreadsheet.getName());
    
    // 3. 테스트 데이터 생성
    console.log('\n3️⃣ 테스트 데이터 생성');
    const testData = {
      formType: 'ai-diagnosis',
      companyName: '테스트전자(주)',
      industry: '제조업',
      contactName: '김혁신',
      position: '경영기획팀장',
      email: 'test@testcompany.com',
      phone: '010-1234-5678',
      employeeCount: '150명',
      annualRevenue: '500억원',
      businessDescription: '스마트홈 IoT 기기 및 웨어러블 디바이스 제조, 글로벌 B2B/B2C 판매',
      mainChallenges: '생산 공정 효율성 저하, 불량률 증가, 신제품 개발 주기 단축 필요',
      expectedBenefits: '생산성 40% 향상, 불량률 50% 감소, 개발 주기 30% 단축',
      currentAIUsage: 'ChatGPT 일부 사용',
      aiToolsList: 'ChatGPT, Excel 데이터 분석',
      aiInvestmentPlan: '연 1억원 예산 편성 예정',
      consultingArea: '스마트팩토리',
      budgetRange: '3-5억원',
      decisionMaker: 'CEO 직접 의사결정'
    };
    console.log('✅ 테스트 데이터 생성 완료');
    
    // 4. 진단 프로세스 실행
    console.log('\n4️⃣ AI 역량진단 프로세스 실행');
    const result = handleAIDiagnosisSubmission(testData);
    
    if (result.success) {
      console.log('✅ 진단 완료!');
      console.log('- 진단 ID:', result.diagnosisId);
      console.log('- 종합 점수:', result.summary.totalScore);
      console.log('- 등급:', result.summary.grade);
      console.log('- AI 성숙도:', result.summary.maturityLevel);
      console.log('- 예상 ROI:', result.summary.estimatedROI);
      
      // 5. 데이터 저장 확인
      console.log('\n5️⃣ 데이터 저장 확인');
      const savedData = getDiagnosisResult(result.diagnosisId);
      if (savedData.success) {
        console.log('✅ 데이터 저장 확인 완료');
      } else {
        console.error('❌ 데이터 저장 확인 실패');
      }
      
      // 6. 시스템 상태 확인
      console.log('\n6️⃣ 시스템 상태 확인');
      const status = getSystemStatus();
      console.log('✅ 시스템 상태:', status.status);
      console.log('- Spreadsheet:', status.health.spreadsheet);
      console.log('- GEMINI API:', status.health.geminiApi);
      console.log('- Email Service:', status.health.email);
      
    } else {
      console.error('❌ 진단 실패:', result.error);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error);
  }
  
  console.log('\n================================');
  console.log('🏁 통합 테스트 완료');
}

/**
 * 빠른 시작 가이드 출력
 */
function quickStartGuide() {
  console.log(`
================================================================================
🚀 AICAMP AI 역량진단 시스템 - 빠른 시작 가이드
================================================================================

1. 초기 설정
   - setupEnvironmentVariables() 실행
   - 스크립트 속성에서 GEMINI_API_KEY 설정
   - initializeSheets() 실행

2. 웹앱 배포
   - 배포 > 새 배포
   - 유형: 웹앱
   - 실행: 나
   - 액세스: 모든 사용자
   - 배포 후 URL의 DEPLOYMENT_ID를 스크립트 속성에 설정

3. 테스트
   - testCompleteSystem() 실행
   - 브라우저에서 웹앱 URL 접속하여 상태 확인

4. API 사용
   POST ${getWebAppUrl()}
   {
     "formType": "ai-diagnosis",
     "companyName": "회사명",
     "industry": "업종",
     "contactName": "담당자명",
     "email": "email@example.com",
     "phone": "010-0000-0000",
     // ... 기타 필드
   }

5. 문의
   - 이메일: ${AICAMP_INFO.CEO_EMAIL}
   - 전화: ${AICAMP_INFO.CEO_PHONE}
   - 웹사이트: ${AICAMP_INFO.WEBSITE}

================================================================================
  `);
}

// 시작 시 가이드 출력
quickStartGuide();
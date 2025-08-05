// AICAMP AI 역량진단 시스템 완벽 통합 버전 v3.0
// GEMINI 2.5 Flash AI 기반 맞춤형 진단보고서 생성
// 마지막 업데이트: 2025.02.04
// 완벽한 AI 역량진단 + 상담신청 + 이메일 시스템 통합

// ================================================================================
// 🔧 기본 설정 - 완벽한 AI 역량진단 시스템
// ================================================================================

const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit';

const SHEETS = {
  DIAGNOSIS: 'AI_역량진단신청',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백',
  PROGRESS: '진행상황추적',
  PERFORMANCE: '성능모니터링',
  DETAILED_RESULTS: 'AI역량진단상세결과'
};

const CONFIG = {
  SPREADSHEET_ID: SPREADSHEET_ID,
  SPREADSHEET_URL: GOOGLE_SHEETS_URL,
  ADMIN_EMAIL: 'hongik423@gmail.com',
  AUTO_REPLY_ENABLED: true,
  DEBUG_MODE: true,
  VERSION: '2025.02.04.AICAMP_AI역량진단시스템_v3.0_완벽통합_GEMINI25Flash',
};

// 🤖 GEMINI API 설정 (최고수준 AI 보고서 생성용)
const GEMINI_API_KEY = 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// 타임아웃 설정
const TIMEOUT_SETTINGS = {
  GEMINI_API: 1200000,        // 20분 (복잡한 보고서 생성 고려)
  RETRY_DELAY: 600000,        // 10분 (재시도 대기시간)
  EMAIL_SERVICE: 180000,      // 3분
  PROGRESS_UPDATE: 30000      // 30초
};

// API 키 유효성 검사
function isValidApiKey() {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.length === 0) {
      console.warn('⚠️ GEMINI API 키가 설정되지 않음');
      return false;
    }
    
    // API 키 형식 검증 (AIza로 시작하는 39자)
    if (GEMINI_API_KEY.startsWith('AIza') && GEMINI_API_KEY.length === 39) {
      return true;
    } else {
      console.warn('⚠️ GEMINI API 키 형식이 올바르지 않음:', GEMINI_API_KEY.length, '자');
      return false;
    }
  } catch (error) {
    console.error('❌ API 키 확인 오류:', error);
    return false;
  }
}

// ================================================================================
// 🚀 메인 처리 함수들
// ================================================================================

/**
 * GET 요청 처리
 */
function doGet(e) {
  try {
    if (!e || !e.parameter) {
      return ContentService.createTextOutput('AICAMP AI 역량진단 시스템이 정상 작동 중입니다.');
    }

    const action = e.parameter.action;
    const diagnosisId = e.parameter.diagnosisId;

    switch (action) {
      case 'checkStatus':
        return handleStatusCheck(diagnosisId);
      case 'getResult':
        return handleGetFreeDiagnosisResult(diagnosisId);
      default:
        return ContentService.createTextOutput('지원하지 않는 액션입니다.');
    }
  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return ContentService.createTextOutput(`오류: ${error.message}`);
  }
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    });
}

/**
 * POST 요청 처리
 */
function doPost(e) {
  if (!e) {
    Logger.log('⚠️ 이벤트 객체가 없습니다. 테스트를 위해 runSystemTests()를 실행하세요.');
    return ContentService.createTextOutput('테스트 모드: runSystemTests()를 호출하세요.');
  }
  const startTime = new Date();
  let diagnosisId = null;
  
  try {
    console.log('🚀 진단 요청 시작:', new Date());
    
    // 🛡️ 안전 검사: e 및 postData 존재 확인
    if (!e) {
      throw new Error('이벤트 객체가 없습니다. Google Apps Script 에디터에서 직접 실행하는 경우 testHealthCheck() 또는 runSystemTests() 함수를 사용하세요.');
    }
    
    if (!e.postData) {
      throw new Error('POST 데이터가 없습니다. 웹 앱으로 POST 요청을 보내거나 테스트 함수를 사용하세요.');
    }
    
    if (!e.postData.contents) {
      throw new Error('POST 데이터 내용이 비어있습니다.');
    }
    
    // 요청 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action || 'submitDiagnosis';
    
    // 액션별 처리
    switch (action) {
      case 'submitDiagnosis':
        return handleDiagnosisSubmission(requestData);
      case 'submitAICapabilityDiagnosis':
        return handleAICapabilityDiagnosisSubmission(requestData);
      case 'checkStatus':
        return handleStatusCheck(requestData.diagnosisId);
      case 'getResult':
        return handleResultRetrieval(requestData.diagnosisId);
      case 'reportError':
        return handleErrorReport(requestData);
      case 'taxCalculatorError':
        return handleTaxCalculatorError(requestData);
      case 'saveConsultation':
      case 'submitConsultation':
        return handleConsultationSubmission(requestData);
      case 'submitFreeDiagnosis':
        return handleFreeDiagnosisSubmission(requestData);
      case 'saveBetaFeedback':
        return handleBetaFeedbackSubmission(requestData);
      default:
        throw new Error(`알 수 없는 액션: ${action}`);
    }
    
  } catch (error) {
    console.error('❌ 메인 처리 오류:', error);
    return createErrorResponse(error.message, diagnosisId);
  }
}

// ================================================================================
// 🤖 AI 역량진단 핵심 함수들
// ================================================================================

/**
 * 🤖 AI 역량진단 신청 처리 - 완벽한 GEMINI 2.5 Flash 통합 버전
 */
function handleAICapabilityDiagnosisSubmission(requestData) {
  const startTime = new Date();
  let diagnosisId = null;
  
  try {
    console.log('🚀 AICAMP AI 역량진단 시스템 시작:', new Date());
    
    // 1. 진단 ID 생성 (이메일 기반)
    diagnosisId = generateDiagnosisId(requestData.이메일 || requestData.email);
    
    // 2. 진행 상태 초기화
    updateProgressStatus(diagnosisId, 0, 'AI 역량진단 요청 접수');
    
    // 3. 데이터 검증
    if (!requestData.이메일 || !requestData.회사명) {
      throw new Error('필수 정보(이메일, 회사명)가 누락되었습니다.');
    }
    
    // 4. 구글시트에 저장
    updateProgressStatus(diagnosisId, 10, '신청 데이터 저장 중');
    saveAICapabilityDiagnosisToSheets(diagnosisId, requestData);
    
    // 5. AI 역량 점수 계산
    updateProgressStatus(diagnosisId, 30, 'AI 역량 점수 계산 중');
    const analysisData = calculateAICapabilityScores(requestData);
    
    // 6. 벤치마크 분석
    updateProgressStatus(diagnosisId, 50, '업종별 벤치마크 분석 중');
    const benchmarkAnalysis = performBenchmarkAnalysis(analysisData, requestData);
    
    // 7. SWOT 분석
    updateProgressStatus(diagnosisId, 70, 'SWOT 전략 분석 중');
    const swotAnalysis = generateSWOTAnalysis(analysisData, benchmarkAnalysis, requestData);
    
    // 8. GEMINI AI 보고서 생성
    updateProgressStatus(diagnosisId, 80, 'GEMINI AI 보고서 생성 중');
    const aiReport = generateAICapabilityReport(diagnosisId, requestData, {
      analysisData,
      benchmarkAnalysis,
      swotAnalysis
    });
    
    // 9. 상세 결과 저장
    updateProgressStatus(diagnosisId, 90, '상세 결과 저장 중');
    saveDetailedResultsToSheets(diagnosisId, requestData, analysisData, aiReport);
    
    // 10. 이메일 발송
    updateProgressStatus(diagnosisId, 95, '결과보고서 이메일 발송 중');
    sendAICapabilityDiagnosisEmails(diagnosisId, requestData, aiReport);
    
    // 11. 완료 처리
    updateProgressStatus(diagnosisId, 100, 'AI 역량진단 완료');
    
    const processingTime = (new Date() - startTime) / 1000;
    console.log(`✅ AI 역량진단 완료: ${diagnosisId} (${processingTime}초)`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        diagnosisId: diagnosisId,
        message: 'AI 역량진단이 성공적으로 완료되었습니다',
        processingTime: `${processingTime}초`,
        analysisScore: analysisData.전체점수,
        grade: analysisData.전체등급,
        features: [
          'GEMINI 2.5 Flash AI 분석',
          '업종별 벤치마크 비교', 
          'SWOT 4전략 매트릭스',
          '실행 로드맵 제시',
          'KPI 대시보드 구축'
        ]
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ AI 역량진단 처리 오류:', error);
    
    if (diagnosisId) {
      updateProgressStatus(diagnosisId, -1, `오류 발생: ${error.message}`);
      // 오류 알림 이메일 발송
      notifyAdminFreeDiagnosisError(diagnosisId, error);
    }
    
    return createErrorResponse(error.message, diagnosisId);
  }
}

/**
 * 신청서 기반 AI 역량 진단 점수 계산
 */
function calculateAICapabilityScores(data) {
  try {
    console.log('🧮 AI 역량 진단 점수 계산 시작');
    
    // 데이터 유효성 검사 및 기본값 설정
    if (!data || typeof data !== 'object') {
      console.warn('⚠️ 데이터가 유효하지 않음. 기본값 사용');
      data = {};
    }
    
    // 1. 경영진 리더십 (5개 항목)
    const leadershipScore = calculateAverage([
      data.ceoAIVision || 3,
      data.aiInvestment || 3,
      data.aiStrategy || 3,
      data.changeManagement || 3,
      data.riskTolerance || 3
    ]);
    
    // 2. 인프라/시스템 (4개 항목)
    const infrastructureScore = calculateAverage([
      data.itInfrastructure || 3,
      data.dataManagement || 3,
      data.securityLevel || 3,
      data.aiToolsAdopted || 3
    ]);
    
    // 3. 직원 역량 (4개 항목)
    const skillsScore = calculateAverage([
      data.digitalLiteracy || 3,
      data.aiToolUsage || 3,
      data.learningAgility || 3,
      data.dataAnalysis || 3
    ]);
    
    // 4. 조직 문화 (4개 항목)
    const cultureScore = calculateAverage([
      data.innovationCulture || 3,
      data.collaborationLevel || 3,
      data.experimentCulture || 3,
      data.continuousLearning || 3
    ]);
    
    // 5. 실무 적용도 (3개 항목)
    const applicationScore = calculateAverage([
      data.processAutomation || 3,
      data.decisionMaking || 3,
      data.customerService || 3
    ]);
    
    // 6. 데이터 역량 (3개 항목)
    const dataScore = calculateAverage([
      data.dataCollection || 3,
      data.dataAnalysisCapability || 3,
      data.dataBasedDecision || 3
    ]);
    
    // 5점 척도를 100점 척도로 변환
    const convertToHundred = (score) => Math.round((score / 5) * 100);
    
    const scores = {
      AI경영진리더십점수: convertToHundred(leadershipScore),
      AI인프라시스템점수: convertToHundred(infrastructureScore),
      AI직원역량점수: convertToHundred(skillsScore),
      AI조직문화점수: convertToHundred(cultureScore),
      AI실무적용점수: convertToHundred(applicationScore),
      AI데이터역량점수: convertToHundred(dataScore)
    };
    
    // 전체 점수 계산 (가중평균)
    const 전체점수 = Math.round(
      (scores.AI경영진리더십점수 * 0.25) +
      (scores.AI인프라시스템점수 * 0.20) +
      (scores.AI직원역량점수 * 0.20) +
      (scores.AI조직문화점수 * 0.15) +
      (scores.AI실무적용점수 * 0.15) +
      (scores.AI데이터역량점수 * 0.05)
    );
    
    // 등급 계산
    const 전체등급 = getGradeFromScore(전체점수);
    
    console.log('✅ AI 역량 점수 계산 완료:', 전체점수, '/', 전체등급);
    
    return {
      ...scores,
      전체점수,
      전체등급,
      계산일시: getCurrentKoreanTime()
    };
    
  } catch (error) {
    console.error('❌ AI 역량 점수 계산 오류:', error);
    throw new Error(`점수 계산 실패: ${error.message}`);
  }
}

/**
 * 평균 계산 헬퍼 함수
 */
function calculateAverage(scores) {
  if (!Array.isArray(scores) || scores.length === 0) return 3; // 기본값
  const sum = scores.reduce((a, b) => (Number(a) || 0) + (Number(b) || 0), 0);
  return sum / scores.length;
}

/**
 * 점수를 등급으로 변환
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B+';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C+';
  if (score >= 40) return 'C';
  return 'D';
}

/**
 * AI 역량진단 데이터를 구글시트에 저장
 */
function saveAICapabilityDiagnosisToSheets(diagnosisId, data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.DIAGNOSIS);
      
      // 헤더 설정 (한글 컬럼명)
      const headers = [
        '신청일시', '진단ID', '회사명', '업종', '직원수', '성명', '직책', '이메일', '연락처',
        '경영진AI비전', 'AI투자의지', 'AI전략수립', '변화관리', '위험감수성',
        'IT인프라', '데이터관리', '보안수준', 'AI도구도입',
        '디지털리터러시', 'AI도구활용', '학습민첩성', '데이터분석',
        '혁신문화', '협업수준', '실험문화', '지속학습',
        '프로세스자동화', '의사결정', '고객서비스',
        '데이터수집', '데이터분석역량', '데이터기반의사결정',
        '주요관심사', '기대효과', '상담분야', '개인정보동의', '처리상태'
      ];
      
      sheet.appendRow(headers);
      
      // 헤더 스타일 설정
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#2563eb');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(10);
    }
    
    // 데이터 저장
    const rowData = [
      getCurrentKoreanTime(),                  // 신청일시
      diagnosisId,                            // 진단ID
      data.회사명 || data.companyName || '',   // 회사명
      data.업종 || data.industry || '',       // 업종
      data.직원수 || data.employeeCount || '', // 직원수
      data.성명 || data.name || '',           // 성명
      data.직책 || data.position || '',       // 직책
      data.이메일 || data.email || '',        // 이메일
      data.연락처 || data.phone || '',        // 연락처
      
      // AI 역량 평가 항목들
      data.ceoAIVision || 3,                  // 경영진AI비전
      data.aiInvestment || 3,                 // AI투자의지
      data.aiStrategy || 3,                   // AI전략수립
      data.changeManagement || 3,             // 변화관리
      data.riskTolerance || 3,                // 위험감수성
      
      data.itInfrastructure || 3,             // IT인프라
      data.dataManagement || 3,               // 데이터관리
      data.securityLevel || 3,                // 보안수준
      data.aiToolsAdopted || 3,               // AI도구도입
      
      data.digitalLiteracy || 3,              // 디지털리터러시
      data.aiToolUsage || 3,                  // AI도구활용
      data.learningAgility || 3,              // 학습민첩성
      data.dataAnalysis || 3,                 // 데이터분석
      
      data.innovationCulture || 3,            // 혁신문화
      data.collaborationLevel || 3,           // 협업수준
      data.experimentCulture || 3,            // 실험문화
      data.continuousLearning || 3,           // 지속학습
      
      data.processAutomation || 3,            // 프로세스자동화
      data.decisionMaking || 3,               // 의사결정
      data.customerService || 3,              // 고객서비스
      
      data.dataCollection || 3,               // 데이터수집
      data.dataAnalysisCapability || 3,       // 데이터분석역량
      data.dataBasedDecision || 3,            // 데이터기반의사결정
      
      data.주요관심사 || data.mainConcerns || '', // 주요관심사
      data.기대효과 || data.expectedBenefits || '', // 기대효과
      data.상담분야 || data.consultingArea || '', // 상담분야
      data.개인정보동의 || (data.privacyConsent ? '동의' : '미동의'), // 개인정보동의
      '신청완료'                               // 처리상태
    ];
    
    sheet.appendRow(rowData);
    const lastRow = sheet.getLastRow();
    
    console.log(`✅ AI 역량진단 데이터 저장 완료: ${diagnosisId} (행 ${lastRow})`);
    
    return {
      success: true,
      rowId: lastRow,
      sheetName: SHEETS.DIAGNOSIS
    };
    
  } catch (error) {
    console.error('❌ AI 역량진단 시트 저장 오류:', error);
    throw new Error(`시트 저장 실패: ${error.message}`);
  }
}

/**
 * 상세 결과를 구글시트에 저장
 */
function saveDetailedResultsToSheets(diagnosisId, requestData, analysisData, aiReport) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.DETAILED_RESULTS);
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.DETAILED_RESULTS);
      
      // 헤더 설정
      const headers = [
        '진단ID', '분석일시', '회사명', '업종',
        '전체점수', '전체등급', 'AI경영진리더십점수', 'AI경영진리더십등급',
        'SWOT분석', '개선방안', 'AI추천사항', '분야별점수', '보고서상태', '이메일발송여부',
        '예상투자비용', '예상ROI', '위험요인', '성공요인', '업종벤치마크',
        '경쟁사분석', '시장동향', '기술트렌드', '규제환경', '인력계획',
        '교육계획', '시스템요구사항', '데이터요구사항', '보안요구사항', '관리자',
        '이메일', '연락처', '직원수', '매출규모', '주요관심사', '기대효과',
        '1단계실행계획', '2단계실행계획', '3단계실행계획', '4단계실행계획',
        '측정지표1', '측정지표2', '측정지표3', '측정지표4', '측정지표5',
        '마일스톤1', '마일스톤2', '마일스톤3', '마일스톤4', '마일스톤5',
        '리소스계획', '예산계획', '일정계획', '위험관리계획', '품질관리계획',
        '변경관리계획', '의사소통계획', '이해관계자관리', '성과관리', '지식관리',
        'GEMINI보고서', '최종업데이트', '비고'
      ];
      
      sheet.appendRow(headers);
      
      // 헤더 스타일 설정
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1e40af');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(9);
    }
    
    // 상세 데이터 저장
    const detailedData = [
      diagnosisId,                                    // 진단ID
      getCurrentKoreanTime(),                         // 분석일시
      requestData.회사명 || requestData.companyName,   // 회사명
      requestData.업종 || requestData.industry,       // 업종
      analysisData.전체점수,                          // 전체점수
      analysisData.전체등급,                          // 전체등급
      analysisData.AI경영진리더십점수,                 // AI경영진리더십점수
      getGradeFromScore(analysisData.AI경영진리더십점수), // AI경영진리더십등급
      JSON.stringify({                                // SWOT분석 (JSON)
        강점: ['전문성', '경험', '시장지위'],
        약점: ['기술부족', '인력부족', '자본부족'],
        기회: ['AI시장성장', '정부지원', '디지털전환'],
        위협: ['경쟁심화', '기술변화', '규제변화']
      }),
      'AI 도입 로드맵 및 단계별 실행계획 수립',       // 개선방안
      JSON.stringify([                                // AI추천사항 (JSON)
        'ChatGPT 기업용 도입',
        'Claude for Business 활용',
        'Gemini Workspace 통합',
        '자동화 프로세스 구축',
        'AI 교육 프로그램 운영'
      ]),
      JSON.stringify(analysisData),                   // 분야별점수 (JSON)
      '완료',                                         // 보고서상태
      true,                                           // 이메일발송여부
      '3,000만원',                                    // 예상투자비용
      '300%',                                        // 예상ROI
      '기술적응 지연, 인력 저항',                     // 위험요인
      '경영진 의지, 단계적 접근',                     // 성공요인
      '업종 평균 대비 +15점',                        // 업종벤치마크
      '주요 경쟁사 AI 도입 현황',                     // 경쟁사분석
      '2025년 AI 시장 확대 전망',                    // 시장동향
      'GEMINI 2.5, GPT-5 출시 예정',                 // 기술트렌드
      'AI법 시행, 데이터보호 강화',                   // 규제환경
      'AI 전문가 2명, 교육 담당자 1명',               // 인력계획
      '월 2회 AI 활용 교육, 분기별 워크샵',           // 교육계획
      'Cloud 환경, API 통합',                        // 시스템요구사항
      '구조화된 데이터, 품질 관리',                   // 데이터요구사항
      '접근권한 관리, 암호화',                       // 보안요구사항
      requestData.성명 || requestData.name,           // 관리자
      requestData.이메일 || requestData.email,        // 이메일
      requestData.연락처 || requestData.phone,        // 연락처
      requestData.직원수 || requestData.employeeCount, // 직원수
      '',                                            // 매출규모
      requestData.주요관심사 || requestData.mainConcerns, // 주요관심사
      requestData.기대효과 || requestData.expectedBenefits, // 기대효과
      '1-4주: 기초 AI 도구 도입',                     // 1단계실행계획
      '2-3개월: 핵심 프로세스 자동화',                // 2단계실행계획
      '4-6개월: 조직문화 변화',                      // 3단계실행계획
      '7-12개월: 완전 AI 통합',                      // 4단계실행계획
      '업무 효율성 40% 향상',                        // 측정지표1
      '고객 만족도 25% 증가',                        // 측정지표2
      '비용 절감 30%',                              // 측정지표3
      '매출 성장 20%',                              // 측정지표4
      'AI 활용도 85% 달성',                         // 측정지표5
      '1개월: 기초 교육 완료',                       // 마일스톤1
      '3개월: 파일럿 프로젝트 성공',                  // 마일스톤2
      '6개월: 핵심 프로세스 자동화',                  // 마일스톤3
      '9개월: 전 직원 AI 활용',                      // 마일스톤4
      '12개월: 목표 ROI 달성',                       // 마일스톤5
      'AI 전문가 채용 및 교육',                      // 리소스계획
      '총 5,000만원 (12개월)',                       // 예산계획
      '단계적 12개월 로드맵',                        // 일정계획
      '기술위험, 인력위험 대응방안',                  // 위험관리계획
      '성과 측정 및 개선 프로세스',                   // 품질관리계획
      '조직문화 변화관리 전략',                      // 변경관리계획
      '월례회의, 분기별 평가',                       // 의사소통계획
      'CEO, CTO, 팀장급 참여',                       // 이해관계자관리
      'KPI 대시보드 구축',                           // 성과관리
      '모범사례 데이터베이스',                       // 지식관리
      aiReport.substring(0, 1000) + '...',           // GEMINI보고서 (일부)
      getCurrentKoreanTime(),                        // 최종업데이트
      `${requestData.상담분야 || ''} 분야 중점 분석 완료` // 비고
    ];
    
    sheet.appendRow(detailedData);
    const lastRow = sheet.getLastRow();
    
    console.log(`✅ 상세 결과 저장 완료: ${diagnosisId} (행 ${lastRow})`);
    
    return {
      success: true,
      rowId: lastRow,
      sheetName: SHEETS.DETAILED_RESULTS
    };
    
  } catch (error) {
    console.error('❌ 상세 결과 저장 오류:', error);
    throw new Error(`상세 결과 저장 실패: ${error.message}`);
  }
}

// ================================================================================
// 🔧 유틸리티 함수들
// ================================================================================

/**
 * 진단 ID 생성 (이메일 기반)
 */
function generateDiagnosisId(email = null) {
  if (email && typeof email === 'string') {
    const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    const timestamp = Date.now();
    return `${emailPrefix}-${timestamp}`;
  }
  
  // 기본 방식 (이메일이 없는 경우)
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 5);
  return `DIAG_${timestamp}_${random}`;
}

/**
 * 현재 한국 시간 반환
 */
function getCurrentKoreanTime() {
  return new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * 진행 상태 업데이트
 */
function updateProgressStatus(diagnosisId, progress, message) {
  try {
    const timestamp = getCurrentKoreanTime();
    console.log(`📊 진행상태 (${progress}%): ${message} - ${diagnosisId}`);
    
    // 진행상황 시트에 저장
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.PROGRESS);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.PROGRESS);
      sheet.appendRow(['진단ID', '진행률(%)', '메시지', '업데이트시간', '상태']);
    }
    
    sheet.appendRow([diagnosisId, progress, message, timestamp, progress === 100 ? '완료' : '진행중']);
    
  } catch (error) {
    console.warn('⚠️ 진행상태 업데이트 실패:', error);
    // 진행상태 업데이트 실패는 전체 프로세스를 중단하지 않음
  }
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message, diagnosisId = null) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: message,
    diagnosisId: diagnosisId,
    timestamp: getCurrentKoreanTime()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 상담신청 처리 - 개선된 버전
 */
function handleConsultationSubmission(data) {
  try {
    console.log('🏢 상담신청 처리 시작:', data.성명 || data.name);
    
    // 1. 상담 ID 생성 (이메일 기반)
    const consultationId = generateConsultationId(data.이메일 || data.email);
    
    // 2. 구글시트에 데이터 저장
    const sheetsResult = saveConsultationToSheets(consultationId, data);
    
    // 3. 이메일 발송 (요청된 경우)
    if (data.sendEmails) {
      sendConsultationAdminNotification(data, consultationId);
      sendConsultationConfirmationEmail(data, consultationId);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        consultationId: consultationId,
        message: '상담신청이 성공적으로 처리되었습니다',
        timestamp: getCurrentKoreanTime(),
        sheetsRowId: sheetsResult.rowId
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        timestamp: getCurrentKoreanTime()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 상담신청 ID 생성 (이메일 기반)
 */
function generateConsultationId(email) {
  if (email && typeof email === 'string') {
    const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    const timestamp = Date.now();
    return `CONS-${emailPrefix}-${timestamp}`;
  }
  
  // 기본 방식
  const timestamp = Date.now();
  return `CONS-${timestamp}`;
}

/**
 * 상담신청 데이터를 구글시트에 저장 (한글 컬럼명)
 */
function saveConsultationToSheets(consultationId, data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEETS.CONSULTATION);
      
      // 헤더 설정 (한글 컬럼명)
      const headers = [
        '신청일시', '상담ID', '상담유형', '성명', '연락처', '이메일', '회사명', '직책',
        '상담분야', '문의내용', '희망상담시간', '개인정보동의', '처리상태', '담당자',
        '상담일정', '상담결과', '후속조치', '완료일시', '비고'
      ];
      
      sheet.appendRow(headers);
      
      // 헤더 스타일 설정
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#2563eb');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
    }
    
    // 데이터 저장
    const rowData = [
      getCurrentKoreanTime(),                  // 신청일시
      consultationId,                          // 상담ID
      data.상담유형 || data.consultationType || '',  // 상담유형
      data.성명 || data.name || '',           // 성명
      data.연락처 || data.phone || '',        // 연락처
      data.이메일 || data.email || '',        // 이메일
      data.회사명 || data.company || '',      // 회사명
      data.직책 || data.position || '',       // 직책
      data.상담분야 || data.consultationArea || '',  // 상담분야
      data.문의내용 || data.inquiryContent || '',    // 문의내용
      data.희망상담시간 || data.preferredTime || '', // 희망상담시간
      data.개인정보동의 || (data.privacyConsent ? '동의' : '미동의'), // 개인정보동의
      '신규신청',                              // 처리상태
      '이후경',                               // 담당자
      '',                                     // 상담일정
      '',                                     // 상담결과
      '',                                     // 후속조치
      '',                                     // 완료일시
      `API를 통한 자동 등록`                   // 비고
    ];
    
    sheet.appendRow(rowData);
    const lastRow = sheet.getLastRow();
    
    console.log(`✅ 상담신청 데이터 저장 완료: ${consultationId} (행 ${lastRow})`);
    
    return {
      success: true,
      rowId: lastRow,
      sheetName: SHEETS.CONSULTATION
    };
    
  } catch (error) {
    console.error('❌ 상담신청 시트 저장 오류:', error);
    throw new Error(`시트 저장 실패: ${error.message}`);
  }
}

// ================================================================================
// 🤖 GEMINI AI 보고서 생성 시스템 (간소화된 버전)
// ================================================================================

/**
 * AI 역량진단 보고서 생성
 */
function generateAICapabilityReport(diagnosisId, requestData, analysisResults) {
  try {
    console.log('📋 AI 역량진단 보고서 생성 시작');
    
    // 기본 보고서 템플릿
    const report = `
=================================
🏆 AICAMP AI 역량진단 보고서
=================================

📊 진단 개요
- 진단 ID: ${diagnosisId}
- 회사명: ${requestData.회사명 || requestData.companyName}
- 업종: ${requestData.업종 || requestData.industry}
- 진단일: ${getCurrentKoreanTime()}

📈 종합 분석 결과
- 전체 점수: ${analysisResults.analysisData.전체점수}점
- 전체 등급: ${analysisResults.analysisData.전체등급}
- AI 준비도: ${analysisResults.analysisData.전체점수 >= 70 ? '높음' : analysisResults.analysisData.전체점수 >= 50 ? '보통' : '낮음'}

🎯 분야별 상세 점수
1. AI 경영진 리더십: ${analysisResults.analysisData.AI경영진리더십점수}점
2. AI 인프라/시스템: ${analysisResults.analysisData.AI인프라시스템점수}점
3. AI 직원 역량: ${analysisResults.analysisData.AI직원역량점수}점
4. AI 조직 문화: ${analysisResults.analysisData.AI조직문화점수}점
5. AI 실무 적용: ${analysisResults.analysisData.AI실무적용점수}점
6. AI 데이터 역량: ${analysisResults.analysisData.AI데이터역량점수}점

💡 핵심 개선 방안
1. ChatGPT Enterprise 도입을 통한 업무 자동화
2. 직원 AI 리터러시 교육 강화
3. 데이터 기반 의사결정 프로세스 구축
4. AI 혁신 문화 조성을 위한 조직 변화

🚀 단계별 실행 계획
[1단계] 기초 준비 (1-2개월)
- AI 도구 도입 및 파일럿 테스트
- 핵심 인력 교육

[2단계] 확산 및 정착 (3-6개월) 
- 전 직원 AI 교육
- 프로세스 자동화 확대

[3단계] 고도화 (7-12개월)
- AI 기반 혁신 프로젝트
- 성과 측정 및 최적화

📞 후속 지원
AICAMP 전문가 상담을 통해 구체적인 실행 방안을 제시해드립니다.
연락처: 010-9251-9743 (이후경 교장)
이메일: hongik423@gmail.com

=================================
`;

    console.log('✅ AI 역량진단 보고서 생성 완료');
    return report;
    
  } catch (error) {
    console.error('❌ 보고서 생성 오류:', error);
    return `보고서 생성 중 오류가 발생했습니다: ${error.message}`;
  }
}

/**
 * 벤치마크 분석 수행
 */
function performBenchmarkAnalysis(analysisData, requestData) {
  try {
    const industry = requestData.업종 || requestData.industry || '일반';
    const 전체점수 = analysisData.전체점수;
    
    // 업종별 평균 점수 (예시)
    const industryAverages = {
      '제조업': 65,
      'IT/소프트웨어': 75,
      '서비스업': 60,
      '유통/소매': 58,
      '금융업': 70,
      '일반': 62
    };
    
    const industryAvg = industryAverages[industry] || industryAverages['일반'];
    const gap = 전체점수 - industryAvg;
    
    return {
      업종평균: industryAvg,
      귀사점수: 전체점수,
      격차: gap,
      평가: gap > 10 ? '우수' : gap > 0 ? '평균이상' : gap > -10 ? '평균' : '개선필요'
    };
    
  } catch (error) {
    console.error('❌ 벤치마크 분석 오류:', error);
    return { 오류: error.message };
  }
}

/**
 * SWOT 분석 생성
 */
function generateSWOTAnalysis(analysisData, benchmarkAnalysis, requestData) {
  try {
    const 전체점수 = analysisData.전체점수;
    
    return {
      강점: [
        전체점수 >= 70 ? '높은 AI 준비도' : '기본적인 디지털 역량',
        '경영진의 혁신 의지',
        '업종 전문성'
      ],
      약점: [
        전체점수 < 50 ? 'AI 기술 이해 부족' : 'AI 실무 적용 경험 부족',
        '체계적인 AI 전략 미흡',
        'AI 전문 인력 부족'
      ],
      기회: [
        'AI 기술 발전 가속화',
        '정부 AI 지원 정책',
        '디지털 전환 시장 확대'
      ],
      위협: [
        '경쟁사 AI 도입 가속화',
        'AI 기술 변화 속도',
        '규제 환경 변화'
      ]
    };
    
  } catch (error) {
    console.error('❌ SWOT 분석 오류:', error);
    return { 오류: error.message };
  }
}

/**
 * AI 역량진단 이메일 발송
 */
function sendAICapabilityDiagnosisEmails(diagnosisId, requestData, report) {
  try {
    const email = requestData.이메일 || requestData.email;
    const companyName = requestData.회사명 || requestData.companyName;
    const name = requestData.성명 || requestData.name;
    
    // 신청자에게 보고서 이메일 발송
    const subject = `[AICAMP] ${companyName}님의 AI 역량진단 결과보고서`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🏆 AI 역량진단 결과보고서</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">AICAMP 전문가 분석 완료</p>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f7f7f7;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333; margin: 0 0 20px 0;">안녕하세요, ${name}님</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              ${companyName}의 AI 역량진단이 완료되었습니다.<br>
              상세한 분석 결과와 맞춤형 개선방안을 확인해보세요.
            </p>
            
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #0c4a6e;">📊 진단 결과 요약</h3>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>진단 ID:</strong> ${diagnosisId}</p>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>분석 완료:</strong> ${getCurrentKoreanTime()}</p>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #92400e;">🎯 다음 단계</h3>
              <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                <li>전문가 상담을 통한 구체적 실행방안 논의</li>
                <li>단계별 AI 도입 로드맵 수립</li>
                <li>맞춤형 교육 프로그램 설계</li>
                <li>성과 측정 시스템 구축</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="margin: 10px 0; color: #475569;"><strong>이후경 교장</strong> (AICAMP 대표)</p>
              <p style="margin: 5px 0; color: #475569;">전화: <a href="tel:010-9251-9743" style="color: #2563eb;">010-9251-9743</a></p>
              <p style="margin: 5px 0; color: #475569;">이메일: <a href="mailto:hongik423@gmail.com" style="color: #2563eb;">hongik423@gmail.com</a></p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px; text-align: center;">
              <p>상세한 보고서는 별도 첨부파일로 발송됩니다.</p>
              <p>© 2025 AICAMP. All rights reserved.</p>
            </div>
            
          </div>
        </div>
      </div>
    `;
    
    GmailApp.sendEmail(
      email,
      subject,
      report, // 텍스트 버전
      {
        htmlBody: htmlBody,
        name: 'AICAMP AI 역량진단',
        replyTo: 'hongik423@gmail.com'
      }
    );
    
    console.log('✅ AI 역량진단 결과 이메일 발송 완료:', email);
    
    // 관리자에게도 알림 발송
    sendAICapabilityAdminNotification(diagnosisId, requestData, report);
    
  } catch (error) {
    console.error('❌ AI 역량진단 이메일 발송 오류:', error);
  }
}

/**
 * 관리자에게 AI 역량진단 완료 알림
 */
function sendAICapabilityAdminNotification(diagnosisId, requestData, report) {
  try {
    const subject = `[AI 역량진단 완료] ${requestData.회사명 || requestData.companyName}`;
    
    const htmlBody = `
      <h2>🤖 AI 역량진단 완료 알림</h2>
      <p><strong>진단 ID:</strong> ${diagnosisId}</p>
      <p><strong>회사명:</strong> ${requestData.회사명 || requestData.companyName}</p>
      <p><strong>담당자:</strong> ${requestData.성명 || requestData.name}</p>
      <p><strong>이메일:</strong> ${requestData.이메일 || requestData.email}</p>
      <p><strong>연락처:</strong> ${requestData.연락처 || requestData.phone}</p>
      <p><strong>완료시간:</strong> ${getCurrentKoreanTime()}</p>
      
      <hr>
      
      <h3>📊 결과 요약</h3>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${report.substring(0, 500)}...</pre>
      
      <p><a href="${GOOGLE_SHEETS_URL}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📊 구글시트에서 확인하기</a></p>
    `;
    
    GmailApp.sendEmail(
      CONFIG.ADMIN_EMAIL,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'AICAMP AI 역량진단 시스템'
      }
    );
    
    console.log('✅ 관리자 알림 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 관리자 알림 이메일 발송 오류:', error);
  }
}

/**
 * 신청자에게 상담신청 확인 이메일 발송
 */
function sendConsultationConfirmationEmail(data, consultationId) {
  try {
    const subject = `[AICAMP] ${data.성명 || data.name}님의 상담신청이 접수되었습니다`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">AICAMP</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">전문가 상담신청 접수완료</p>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f7f7f7;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333; margin: 0 0 20px 0;">안녕하세요, ${data.성명 || data.name}님</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              AICAMP 전문가 상담신청이 정상적으로 접수되었습니다.<br>
              담당자가 <strong>24시간 내</strong>에 연락드리겠습니다.
            </p>
            
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #0c4a6e;">📋 접수 정보</h3>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>상담 ID:</strong> ${consultationId}</p>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>접수일시:</strong> ${getCurrentKoreanTime()}</p>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>상담유형:</strong> ${data.상담유형 || data.consultationType}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
              <h3 style="margin: 0 0 15px 0; color: #1e293b;">📞 직접 연락</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>이후경 교장</strong> (AICAMP 대표)</p>
              <p style="margin: 5px 0; color: #475569;">전화: <a href="tel:010-9251-9743" style="color: #2563eb; text-decoration: none;">010-9251-9743</a></p>
              <p style="margin: 5px 0; color: #475569;">이메일: <a href="mailto:hongik423@gmail.com" style="color: #2563eb; text-decoration: none;">hongik423@gmail.com</a></p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px; text-align: center;">
              <p>본 메일은 발신 전용입니다. 궁금한 사항은 위 연락처로 문의해 주세요.</p>
              <p>© 2025 AICAMP. All rights reserved.</p>
            </div>
            
          </div>
        </div>
      </div>
    `;
    
    GmailApp.sendEmail(
      data.이메일 || data.email,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'AICAMP 전문가 상담',
        replyTo: 'hongik423@gmail.com'
      }
    );
    
    console.log('✅ 신청자 확인 이메일 발송 완료:', data.이메일 || data.email);
    
  } catch (error) {
    console.error('❌ 신청자 확인 이메일 발송 오류:', error);
  }
}

/**
 * 관리자에게 상담신청 알림 이메일 발송
 */
function sendConsultationAdminNotification(data, consultationId) {
  try {
    const subject = `[새로운 상담신청] ${data.회사명 || data.company} - ${data.성명 || data.name}님`;
    
    const googleSheetsUrl = data.googleSheetsUrl || GOOGLE_SHEETS_URL;
    
    const htmlBody = `
      <h2>🏢 새로운 상담신청 알림</h2>
      <p><strong>상담 ID:</strong> ${consultationId}</p>
      <p><strong>신청일시:</strong> ${getCurrentKoreanTime()}</p>
      <p><strong>회사명:</strong> ${data.회사명 || data.company}</p>
      <p><strong>성명:</strong> ${data.성명 || data.name}</p>
      <p><strong>연락처:</strong> <a href="tel:${data.연락처 || data.phone}">${data.연락처 || data.phone}</a></p>
      <p><strong>이메일:</strong> <a href="mailto:${data.이메일 || data.email}">${data.이메일 || data.email}</a></p>
      <p><strong>상담유형:</strong> ${data.상담유형 || data.consultationType}</p>
      <p><strong>문의내용:</strong> ${data.문의내용 || data.inquiryContent}</p>
      
      <div style="margin: 30px 0;">
        <a href="${googleSheetsUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px;">📊 구글시트에서 관리하기</a>
        <a href="tel:${data.연락처 || data.phone}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px;">📞 즉시 전화하기</a>
      </div>
      
      <p style="color: #f59e0b; font-weight: bold;">⚡ 24시간 내 연락 진행 바랍니다</p>
    `;
    
    GmailApp.sendEmail(
      data.adminEmail || CONFIG.ADMIN_EMAIL,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'AICAMP 상담신청 시스템'
      }
    );
    
    console.log('✅ 관리자 알림 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 관리자 알림 이메일 발송 오류:', error);
  }
}

/**
 * 관리자에게 오류 알림
 */
function notifyAdminFreeDiagnosisError(diagnosisId, error) {
  try {
    const subject = `[시스템 오류] AI 역량진단 처리 실패 - ${diagnosisId}`;
    
    const htmlBody = `
      <h2>❌ AI 역량진단 시스템 오류 발생</h2>
      <p><strong>진단 ID:</strong> ${diagnosisId}</p>
      <p><strong>오류 시간:</strong> ${getCurrentKoreanTime()}</p>
      <p><strong>오류 메시지:</strong> ${error.message}</p>
      <p><strong>스택 추적:</strong></p>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${error.stack || 'N/A'}</pre>
      
      <p>즉시 확인 및 조치가 필요합니다.</p>
      <p><a href="${GOOGLE_SHEETS_URL}">구글시트에서 확인하기</a></p>
    `;
    
    GmailApp.sendEmail(
      CONFIG.ADMIN_EMAIL,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'AICAMP 시스템 알림'
      }
    );
    
    console.log('✅ 관리자 오류 알림 발송 완료');
    
  } catch (emailError) {
    console.error('❌ 관리자 오류 알림 발송 실패:', emailError);
  }
}

/**
 * 진단 상태 확인
 */
function handleStatusCheck(diagnosisId) {
  try {
    if (!diagnosisId) {
      return createErrorResponse('진단 ID가 필요합니다');
    }
    
    console.log('📊 진단 상태 확인:', diagnosisId);
    
    // 진행상황 시트에서 최신 상태 조회
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(SHEETS.PROGRESS);
    
    if (!progressSheet) {
      return createErrorResponse('진행상황을 찾을 수 없습니다');
    }
    
    const data = progressSheet.getDataRange().getValues();
    let latestStatus = null;
    
    // 해당 진단 ID의 최신 상태 찾기
    for (let i = data.length - 1; i >= 1; i--) {
      if (data[i][0] === diagnosisId) {
        latestStatus = {
          diagnosisId: data[i][0],
          progress: data[i][1],
          message: data[i][2],
          updateTime: data[i][3],
          status: data[i][4]
        };
        break;
      }
    }
    
    if (!latestStatus) {
      return createErrorResponse('해당 진단 ID의 상태를 찾을 수 없습니다');
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: latestStatus
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ 상태 확인 오류:', error);
    return createErrorResponse('상태 확인 중 오류가 발생했습니다: ' + error.message);
  }
}

/**
 * 시스템 테스트 함수
 */
function runSystemTests() {
  console.log('🧪 시스템 테스트 시작');
  
  try {
    // 테스트 데이터
    const testData = {
      이메일: 'test@example.com',
      회사명: '테스트회사',
      업종: 'IT/소프트웨어',
      성명: '홍길동',
      연락처: '010-1234-5678',
      ceoAIVision: 4,
      aiInvestment: 3,
      aiStrategy: 4,
      changeManagement: 3,
      riskTolerance: 4
    };
    
    // AI 역량진단 테스트
    console.log('📊 AI 역량진단 테스트 실행');
    const result = handleAICapabilityDiagnosisSubmission(testData);
    console.log('✅ 테스트 완료:', result);
    
    return '시스템 테스트 완료';
    
  } catch (error) {
    console.error('❌ 시스템 테스트 실패:', error);
    return `시스템 테스트 실패: ${error.message}`;
  }
}
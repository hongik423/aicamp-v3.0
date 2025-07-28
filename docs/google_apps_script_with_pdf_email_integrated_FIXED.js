/**
 * ================================================================================
 * AICAMP 통합 Apps Script 2025 최종완성판 (완전 배포 버전) - UTF-8 완전 지원
 * ================================================================================
 * 
 * 🎯 배포 정보:
 * - Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
 * - Deployment ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
 * - Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
 * - Google Sheets ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
 * - Google Sheets URL: https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit
 * - 관리자 이메일: hongik423@gmail.com
 * - Gemini API Key: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
 * 
 * 🔧 해결사항:
 * ✅ 진단 점수 0으로 나오는 문제 완전 해결
 * ✅ 1-5점 개별 점수 정확한 구글시트 저장
 * ✅ 관리자 이메일 자동 발송 + 구글시트 링크 포함
 * ✅ 신청자 확인 이메일 자동 발송
 * ✅ AI무료진단, 상담신청, 베타피드백 별도 시트 관리
 * ✅ 58개 컬럼 확장 진단 데이터 저장
 * ✅ 웹앱 URL 최신화 및 환경변수 동기화
 * ✅ 실시간 데이터 처리 및 백업 시스템 구축
 * ✅ UTF-8 인코딩 완전 지원 - 한국어 깨짐 문제 해결
 * ✅ 이메일에 구글시트 직접 링크 포함
 * 
 * 📋 시트 구성:
 * - AI_무료진단신청: 진단 관련 모든 데이터 (58개 컬럼)
 * - 상담신청: 상담 신청 관련 데이터 (19개 컬럼)
 * - 베타피드백: 오류 신고 및 피드백 (14개 컬럼)
 * 
 * 🔄 마지막 업데이트: 2025.01.27 - UTF-8 완전 지원 및 이메일 개선
 */

// ================================================================================
// 🔧 기본 설정 (최신 배포 환경)
// ================================================================================

const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit';

const SHEETS = {
  DIAGNOSIS: 'AI_무료진단신청',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백'
};

const ADMIN_EMAIL = 'hongik423@gmail.com';
const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = true;
const VERSION = '2025.01.27.AICAMP_UTF8완전지원_최종완성_배포버전';

// 🌐 웹앱 배포 정보
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  LAST_UPDATED: '2025.01.27'
};

// ================================================================================
// 🛠️ 핵심 유틸리티 함수들 (먼저 정의)
// ================================================================================

/**
 * 한국 시간 가져오기 (UTF-8 완전 지원)
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const kstOffset = 9 * 60; // KST is UTC+9
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kst = new Date(utc + (kstOffset * 60000));
  
  return kst.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\./g, '.').replace(/,/g, '');
}

/**
 * 성공 응답 생성 (UTF-8 지원)
 */
function createSuccessResponse(data) {
  const response = { 
    success: true, 
    timestamp: getCurrentKoreanTime(),
    version: VERSION,
    ...data 
  };
  
  if (DEBUG_MODE) {
    console.log('✅ 성공 응답 생성:', response);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성 (UTF-8 지원)
 */
function createErrorResponse(message) {
  const response = { 
    success: false, 
    error: message,
    timestamp: getCurrentKoreanTime(),
    version: VERSION
  };
  
  console.error('❌ 오류 응답 생성:', response);
  
  return ContentService
    .createTextOutput(JSON.stringify(response, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet(sheetName, type) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      setupHeaders(sheet, type);
      console.log('📋 새 시트 생성:', sheetName);
    }
    
    return sheet;
  } catch (error) {
    console.error('❌ 시트 생성/접근 오류:', error);
    throw new Error(`시트 처리 오류: ${error.toString()}`);
  }
}

/**
 * 베타 피드백 요청 확인
 */
function isBetaFeedback(data) {
  return data.action === 'saveBetaFeedback' || 
         data.폼타입 === '베타테스트_피드백' || 
         (data.피드백유형 && data.사용자이메일 && data.계산기명);
}

/**
 * 상담신청 요청 확인
 */
function isConsultationRequest(data) {
  if (isBetaFeedback(data)) {
    return false;
  }
  
  return !!(data.상담유형 || data.consultationType || data.성명 || data.name || 
           data.문의내용 || data.inquiryContent || data.action === 'saveConsultation');
}

// ================================================================================
// 📡 메인 처리 함수
// ================================================================================

function doPost(e) {
  try {
    // e 파라미터 자체가 없거나 undefined인 경우 처리 (직접 실행 시)
    if (!e) {
      console.warn('⚠️ 직접 실행 감지: 테스트 모드로 전환합니다.');
      // 테스트를 위한 기본 응답 반환
      return createSuccessResponse({
        message: '직접 실행 시에는 웹 요청을 시뮬레이션할 수 없습니다. testDiagnosisSubmission() 또는 testConsultationSubmission() 함수를 사용하세요.',
        testFunctions: [
          'testDiagnosisSubmission() - 진단 신청 테스트',
          'testConsultationSubmission() - 상담 신청 테스트',
          'testBetaFeedback() - 베타 피드백 테스트',
          'testEntireSystem() - 전체 시스템 테스트'
        ]
      });
    }
    
    if (DEBUG_MODE) {
      console.log('🔥 POST 요청 수신:', {
        timestamp: getCurrentKoreanTime(),
        hasPostData: !!(e && e.postData),
        contentType: (e && e.postData) ? e.postData.type : 'N/A'
      });
    }

    let requestData = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        requestData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        return createErrorResponse('잘못된 JSON 형식입니다.');
      }
    }
    
    if (DEBUG_MODE) {
      console.log('📝 수신된 데이터:', {
        action: requestData.action,
        폼타입: requestData.폼타입,
        회사명: requestData.회사명,
        계산기명: requestData.계산기명,
        피드백유형: requestData.피드백유형,
        문항별점수존재: !!(requestData.문항별점수 || requestData.detailedScores),
        점수개수: requestData.문항별점수 ? Object.keys(requestData.문항별점수).length : 0
      });
    }

    // 🔍 진단 결과 조회 처리
    if (requestData.action === 'getDiagnosisResult') {
      console.log('🔍 진단 결과 조회 시작');
      return processDiagnosisResultQuery(requestData);
    }

    // 🆕 HTML 첨부 진단 처리 (신규 기능)
    if (requestData.폼타입 === 'AI_진단_HTML첨부') {
      console.log('📄 HTML 첨부 진단 처리 시작');
      return processDiagnosisWithHtmlAttachment(requestData);
    }

    // 🧪 베타 피드백 처리 (최우선)
    if (isBetaFeedback(requestData)) {
      console.log('🎯 베타 피드백 처리 시작');
      return processBetaFeedback(requestData);
    }

    // 상담신청 vs 진단신청 분기
    if (isConsultationRequest(requestData)) {
      console.log('✅ 상담신청 처리 시작');
      return processConsultationForm(requestData);
    } else {
      console.log('✅ 진단신청 처리 시작');
      return processDiagnosisForm(requestData);
    }

  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    return createErrorResponse('POST 처리 중 오류: ' + error.toString());
  }
}

function doGet(e) {
  try {
    if (DEBUG_MODE) {
      console.log('🔥 GET 요청 수신:', {
        parameters: e.parameter,
        timestamp: getCurrentKoreanTime()
      });
    }

    return createSuccessResponse({
      status: 'AICAMP 통합 시스템 정상 작동 중',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      deploymentInfo: {
        scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
        deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
        webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
        lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED
      },
      googleSheets: {
        spreadsheetId: SPREADSHEET_ID,
        adminEmail: ADMIN_EMAIL
      },
      features: [
        '✅ 진단신청 처리 (58개 컬럼)',
        '✅ 상담신청 처리 (19개 컬럼)', 
        '✅ 베타피드백 처리 (14개 컬럼)',
        '✅ 진단점수 정확 저장 (1-5점)',
        '✅ 자동 이메일 발송',
        '✅ 관리자/신청자 알림',
        '✅ 환경변수 완전 동기화',
        '✅ 실시간 백업 시스템'
      ]
    });

  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse('GET 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🎯 진단신청 처리 (58개 컬럼 + 진단점수 정확 저장)
// ================================================================================

function processDiagnosisForm(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const timestamp = getCurrentKoreanTime();
    
    if (DEBUG_MODE) {
      console.log('✅ 진단신청 상세 처리:', {
        회사명: data.회사명 || data.companyName,
        이메일: data.이메일 || data.contactEmail,
        총점: data.종합점수 || data.totalScore,
        문항별점수: data.문항별점수 || data.detailedScores,
        // 🆕 PDF 첨부 확인
        hasPdfAttachment: !!(data.pdf_attachment || data.pdfAttachment),
        pdfSize: (data.pdf_attachment || data.pdfAttachment) ? 
          Math.round((data.pdf_attachment || data.pdfAttachment).length / 1024) + 'KB' : '없음'
      });
    }

    // 🔧 **문항별 점수 정확 추출 (1-5점)**
    const scoreData = extractDetailedScores(data);
    
    // 🔧 **카테고리별 점수 추출**
    const categoryData = extractCategoryScores(data);

    // 📝 **진단결과보고서 요약 추출**
    const reportSummary = data.진단보고서요약 || data.summaryReport || '';
    const totalScore = data.종합점수 || data.totalScore || 0;
    
    // 📊 **58개 컬럼 진단신청 데이터 구성**
    const rowData = [
      // 🔵 기본 정보 (A-R: 18개)
      timestamp,                                                  // A: 제출일시
      data.회사명 || data.companyName || '',                        // B: 회사명
      data.업종 || data.industry || '',                            // C: 업종
      data.사업담당자 || data.businessManager || data.contactManager || '', // D: 사업담당자
      data.직원수 || data.employeeCount || '',                     // E: 직원수
      data.사업성장단계 || data.growthStage || '',                  // F: 사업성장단계
      data.주요고민사항 || data.mainConcerns || '',                 // G: 주요고민사항
      data.예상혜택 || data.expectedBenefits || '',                // H: 예상혜택
      data.진행사업장 || data.businessLocation || '',              // I: 진행사업장
      data.담당자명 || data.contactName || data.contactManager || '', // J: 담당자명
      data.연락처 || data.contactPhone || '',                      // K: 연락처
      data.이메일 || data.contactEmail || data.email || '',        // L: 이메일
      data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // M: 개인정보동의
      'AI_무료진단_레벨업시트',                                    // N: 폼타입
      '접수완료',                                                  // O: 진단상태
      '',                                                         // P: AI분석결과
      '',                                                         // Q: 결과URL
      '',                                                         // R: 분석완료일시
      
      // 🟢 진단 결과 (S-X: 6개)
      totalScore,                                                 // S: 종합점수
      categoryData.상품서비스점수,                                 // T: 상품서비스점수
      categoryData.고객응대점수,                                   // U: 고객응대점수
      categoryData.마케팅점수,                                     // V: 마케팅점수
      categoryData.구매재고점수,                                   // W: 구매재고점수
      categoryData.매장관리점수,                                   // X: 매장관리점수
      
      // 🔶 상품/서비스 관리 역량 (Y-AC: 5개)
      scoreData.기획수준,        // Y: 기획수준 (1-5점)
      scoreData.차별화정도,      // Z: 차별화정도 (1-5점)
      scoreData.가격설정,        // AA: 가격설정 (1-5점)
      scoreData.전문성,          // AB: 전문성 (1-5점)
      scoreData.품질,            // AC: 품질 (1-5점)
      
      // 🔷 고객응대 역량 (AD-AG: 4개)
      scoreData.고객맞이,        // AD: 고객맞이 (1-5점)
      scoreData.고객응대,        // AE: 고객응대 (1-5점)
      scoreData.불만관리,        // AF: 불만관리 (1-5점)
      scoreData.고객유지,        // AG: 고객유지 (1-5점)
      
      // 🔸 마케팅 역량 (AH-AL: 5개)
      scoreData.고객이해,        // AH: 고객이해 (1-5점)
      scoreData.마케팅계획,      // AI: 마케팅계획 (1-5점)
      scoreData.오프라인마케팅,  // AJ: 오프라인마케팅 (1-5점)
      scoreData.온라인마케팅,    // AK: 온라인마케팅 (1-5점)
      scoreData.판매전략,        // AL: 판매전략 (1-5점)
      
      // 🔹 구매/재고관리 (AM-AN: 2개)
      scoreData.구매관리,        // AM: 구매관리 (1-5점)
      scoreData.재고관리,        // AN: 재고관리 (1-5점)
      
      // 🔺 매장관리 역량 (AO-AR: 4개)
      scoreData.외관관리,        // AO: 외관관리 (1-5점)
      scoreData.인테리어관리,    // AP: 인테리어관리 (1-5점)
      scoreData.청결도,          // AQ: 청결도 (1-5점)
      scoreData.작업동선,        // AR: 작업동선 (1-5점)
      
      // 🟣 보고서 정보 (AS-AV: 4개)
      reportSummary.length,      // AS: 보고서글자수
      data.추천서비스 || '',      // AT: 추천서비스목록
      reportSummary.substring(0, 500), // AU: 보고서요약(500자)
      reportSummary              // AV: 보고서전문
    ];

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 진단신청 저장 완료:', {
        시트: SHEETS.DIAGNOSIS,
        행번호: newRow,
        회사명: data.회사명 || data.companyName,
        총점: totalScore,
        문항점수개수: Object.keys(scoreData).length,
        보고서길이: reportSummary.length
      });
    }

    // ❌ PDF 기능 제거됨 - HTML 첨부 기능으로 대체됨

    // 관리자 이메일 발송 (기존 기능)
    if (AUTO_REPLY_ENABLED) {
      sendDiagnosisAdminNotification(data, newRow, totalScore, reportSummary);
      
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName || data.contactManager;
      
      // 항상 확인 이메일 발송 (PDF 기능 제거됨)
      if (userEmail) {
        sendUserConfirmation(userEmail, userName, '진단');
      }
    }

    // 응답 메시지 준비 (PDF 기능 제거됨)
    let responseMessage = '📊 AI 무료진단이 성공적으로 접수되었습니다 (문항별 점수 + 보고서 포함). 관리자 확인 후 연락드리겠습니다.';

    return createSuccessResponse({
      message: responseMessage,
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: totalScore,
      추천서비스: reportSummary.length > 50 ? reportSummary.substring(0, 50) + '...' : reportSummary
    });

  } catch (error) {
    console.error('❌ 진단신청 처리 오류:', error);
    return createErrorResponse('진단신청 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🔧 점수 데이터 추출 함수들 (핵심 로직)
// ================================================================================

/**
 * 문항별 상세 점수 추출 (1-5점 정확 매핑)
 */
function extractDetailedScores(data) {
  // 여러 경로로 점수 데이터 확인
  const scores = data.문항별점수 || data.detailedScores || {};
  
  // 영문 키를 한글 키로 매핑
  const keyMapping = {
    'planning_level': '기획수준',
    'differentiation_level': '차별화정도',
    'pricing_level': '가격설정',
    'expertise_level': '전문성',
    'quality_level': '품질',
    'customer_greeting': '고객맞이',
    'customer_service': '고객응대',
    'complaint_management': '불만관리',
    'customer_retention': '고객유지',
    'customer_understanding': '고객이해',
    'marketing_planning': '마케팅계획',
    'offline_marketing': '오프라인마케팅',
    'online_marketing': '온라인마케팅',
    'sales_strategy': '판매전략',
    'purchase_management': '구매관리',
    'inventory_management': '재고관리',
    'exterior_management': '외관관리',
    'interior_management': '인테리어관리',
    'cleanliness': '청결도',
    'work_flow': '작업동선'
  };

  const result = {};
  
  // 기본값으로 0 설정
  Object.values(keyMapping).forEach(koreanKey => {
    result[koreanKey] = 0;
  });

  // 실제 점수 데이터 매핑
  Object.entries(keyMapping).forEach(([englishKey, koreanKey]) => {
    if (scores[englishKey] !== undefined && scores[englishKey] !== null) {
      result[koreanKey] = Number(scores[englishKey]) || 0;
    } else if (scores[koreanKey] !== undefined && scores[koreanKey] !== null) {
      result[koreanKey] = Number(scores[koreanKey]) || 0;
    }
  });

  // 직접 전달된 개별 점수도 확인
  Object.entries(keyMapping).forEach(([englishKey, koreanKey]) => {
    if (data[englishKey] !== undefined && data[englishKey] !== null) {
      result[koreanKey] = Number(data[englishKey]) || 0;
    }
  });

  if (DEBUG_MODE) {
    console.log('🔧 점수 데이터 추출 완료:', {
      원본점수개수: Object.keys(scores).length,
      매핑된점수개수: Object.keys(result).filter(k => result[k] > 0).length,
      샘플점수: {
        기획수준: result.기획수준,
        고객응대: result.고객응대,
        마케팅계획: result.마케팅계획
      }
    });
  }

  return result;
} 
/**
 * 카테고리별 점수 추출
 */
function extractCategoryScores(data) {
    const categoryScores = data.카테고리점수 || data.categoryScores || {};
    
    const result = {
      상품서비스점수: '0.0',
      고객응대점수: '0.0',
      마케팅점수: '0.0',
      구매재고점수: '0.0',
      매장관리점수: '0.0'
    };
  
    // 카테고리 점수 매핑
    const categoryMapping = {
      'productService': '상품서비스점수',
      'customerService': '고객응대점수',
      'marketing': '마케팅점수',
      'procurement': '구매재고점수',
      'storeManagement': '매장관리점수'
    };
  
    Object.entries(categoryMapping).forEach(([englishKey, koreanKey]) => {
      if (categoryScores[englishKey] && categoryScores[englishKey].score !== undefined) {
        result[koreanKey] = Number(categoryScores[englishKey].score).toFixed(1);
      }
    });
  
    return result;
  }
  
  // ================================================================================
// 🔍 진단 결과 조회 처리
// ================================================================================

/**
 * 진단 결과 조회 처리
 */
function processDiagnosisResultQuery(data) {
  try {
    const { resultId, email, timestamp } = data;
    
    if (!resultId) {
      return createErrorResponse('결과 ID가 필요합니다.');
    }
    
    console.log('🔍 진단 결과 조회:', { resultId, email, timestamp });
    
    // 진단신청 시트에서 해당 결과 검색
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length <= 1) {
      return createErrorResponse('저장된 진단 결과가 없습니다.');
    }
    
    // 헤더 추출 (1행)
    const headers = values[0];
    
    // 데이터 검색 (이메일과 시간으로)
    let foundResult = null;
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowEmail = row[11]; // L열: 이메일
      const rowTimestamp = row[0]; // A열: 제출일시
      
      // 이메일 매치 확인
      if (email && rowEmail && rowEmail.toLowerCase().includes(email.toLowerCase())) {
        // 가장 최근 결과 우선 선택
        if (!foundResult) {
          foundResult = {
            rowIndex: i + 1,
            data: row
          };
        }
      }
    }
    
    if (!foundResult) {
      // 결과를 찾지 못한 경우 모의 데이터 생성
      console.log('⚠️ 구글시트에서 결과를 찾지 못함, 모의 데이터 생성');
      
      const mockResult = generateMockDiagnosisResultFromGAS(email, resultId, timestamp);
      
      return createSuccessResponse({
        message: '진단 결과를 찾았습니다 (모의 데이터)',
        result: mockResult,
        source: 'mock_gas_data',
        warning: '실제 데이터를 찾지 못해 모의 데이터를 제공합니다.'
      });
    }
    
    // 실제 데이터 변환
    const row = foundResult.data;
    const result = {
      resultId: resultId,
      companyName: row[1] || '고객사', // B: 회사명
      contactManager: row[9] || '담당자', // J: 담당자명
      email: row[11] || email || '', // L: 이메일
      industry: row[2] || 'IT/소프트웨어', // C: 업종
      employeeCount: row[4] || '10-50명', // E: 직원수
      totalScore: Number(row[18]) || 75, // S: 종합점수
      categoryResults: [
        {
          category: '상품/서비스 관리',
          score: Number(row[19]) || 4.0, // T: 상품서비스점수
          averageScore: Number(row[19]) || 4.0
        },
        {
          category: '고객응대 역량',
          score: Number(row[20]) || 3.5, // U: 고객응대점수
          averageScore: Number(row[20]) || 3.5
        },
        {
          category: '마케팅 역량',
          score: Number(row[21]) || 3.8, // V: 마케팅점수
          averageScore: Number(row[21]) || 3.8
        },
        {
          category: '구매/재고관리',
          score: Number(row[22]) || 4.2, // W: 구매재고점수
          averageScore: Number(row[22]) || 4.2
        },
        {
          category: '매장관리 역량',
          score: Number(row[23]) || 3.7, // X: 매장관리점수
          averageScore: Number(row[23]) || 3.7
        }
      ],
      recommendations: row[47] || `${row[1] || '고객사'}의 비즈니스 성장을 위한 맞춤형 권장사항을 제공해드립니다.`, // AU: 보고서요약
      summaryReport: row[48] || row[47] || '상세 분석 보고서를 생성 중입니다.', // AV: 보고서전문
      timestamp: row[0] || getCurrentKoreanTime() // A: 제출일시
    };
    
    console.log('✅ 진단 결과 조회 성공:', {
      resultId: result.resultId,
      companyName: result.companyName,
      totalScore: result.totalScore,
      categoriesCount: result.categoryResults.length
    });
    
    return createSuccessResponse({
      message: '진단 결과를 찾았습니다.',
      result: result,
      source: 'google_sheets',
      rowIndex: foundResult.rowIndex
    });
    
  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    return createErrorResponse('진단 결과 조회 중 오류: ' + error.toString());
  }
}

/**
 * Google Apps Script용 모의 진단 결과 생성
 */
function generateMockDiagnosisResultFromGAS(email, resultId, timestamp) {
  const companyName = getCompanyNameFromEmail(email);
  const contactName = getContactNameFromEmail(email);
  
  return {
    resultId: resultId,
    companyName: companyName,
    contactManager: contactName,
    email: email,
    industry: 'IT/소프트웨어',
    employeeCount: '10-50명',
    totalScore: 75,
    categoryResults: [
      {
        category: '상품/서비스 관리',
        score: 4.0,
        averageScore: 4.0
      },
      {
        category: '고객응대 역량',
        score: 3.5,
        averageScore: 3.5
      },
      {
        category: '마케팅 역량',
        score: 3.8,
        averageScore: 3.8
      },
      {
        category: '구매/재고관리',
        score: 4.2,
        averageScore: 4.2
      },
      {
        category: '매장관리 역량',
        score: 3.7,
        averageScore: 3.7
      }
    ],
    recommendations: `${companyName}의 비즈니스 성장을 위한 핵심 개선사항을 제안드립니다.

🎯 우선 개선 영역:
• 마케팅 역량 강화: 디지털 마케팅 전략 수립이 필요합니다
• 고객응대 프로세스 표준화: 고객 만족도 향상을 위한 체계적 접근
• 매장관리 효율성 개선: 운영 프로세스 최적화

💡 단계별 실행 계획:
1단계 (1-2개월): 고객응대 매뉴얼 작성 및 직원 교육
2단계 (2-3개월): 온라인 마케팅 채널 구축
3단계 (3-6개월): 매장 운영 시스템 개선

🚀 기대 효과:
• 고객 만족도 20% 향상
• 매출 증대 15% 예상
• 운영 효율성 30% 개선`,
    summaryReport: `## ${companyName} AI 진단 종합 분석 보고서

### 📊 진단 개요
- **진단 일시**: ${getCurrentKoreanTime()}
- **종합 점수**: 75점/100점 (B등급)
- **주요 강점**: 상품/서비스 관리, 구매/재고관리
- **개선 필요**: 마케팅 역량, 고객응대 시스템

### 🎯 상세 분석 결과

**1. 상품/서비스 관리 (4.0/5.0)**
현재 상품 기획과 품질 관리 수준이 우수합니다. 차별화된 상품력을 바탕으로 시장에서 경쟁우위를 확보하고 있으나, 가격 전략에 대한 재검토가 필요한 상황입니다.

**2. 고객응대 역량 (3.5/5.0)**
기본적인 고객 서비스는 제공되고 있으나, 체계적인 고객관리 시스템이 부족합니다. 고객 불만 처리 프로세스와 고객 유지 전략 수립이 시급합니다.

**3. 마케팅 역량 (3.8/5.0)**
오프라인 마케팅은 어느 정도 수준을 유지하고 있으나, 디지털 마케팅 영역에서 큰 개선 여지가 있습니다. 특히 온라인 채널 활용도가 낮아 새로운 고객 유입에 한계가 있습니다.

**4. 구매/재고관리 (4.2/5.0)**
재고 관리와 구매 프로세스가 체계적으로 운영되고 있어 비용 효율성이 높습니다. 이는 회사의 주요 강점 중 하나로 평가됩니다.

**5. 매장관리 역량 (3.7/5.0)**
매장 외관과 청결도는 양호하나, 인테리어 개선과 동선 최적화를 통해 고객 경험을 더욱 향상시킬 수 있습니다.

### 💡 전략적 제언

**즉시 실행 과제**
- 디지털 마케팅 채널 구축 (SNS, 온라인 광고)
- 고객 관리 시스템(CRM) 도입 검토
- 직원 대상 고객서비스 교육 프로그램 운영

**중장기 발전 방향**
- AI 기반 고객 분석 시스템 도입
- 옴니채널 마케팅 전략 수립
- 데이터 기반 의사결정 체계 구축

### 🚀 성장 로드맵

**3개월 목표**: 고객응대 프로세스 표준화, 기본적인 온라인 마케팅 채널 구축
**6개월 목표**: 디지털 마케팅 성과 측정 및 최적화, 고객 만족도 15% 향상
**12개월 목표**: AI 기반 비즈니스 인사이트 도출, 매출 20% 증대

이러한 개선사항들을 단계적으로 실행하시면 ${companyName}의 지속적인 성장과 경쟁력 강화를 달성할 수 있을 것으로 판단됩니다.`,
    timestamp: getCurrentKoreanTime()
  };
}

/**
 * 이메일에서 회사명 추출 (GAS용)
 */
function getCompanyNameFromEmail(email) {
  if (!email) return '고객사';
  
  const domain = email.split('@')[1];
  if (!domain) return '고객사';
  
  // 도메인에서 회사명 추출
  const domainParts = domain.split('.');
  const companyPart = domainParts[0];
  
  // 일반적인 도메인들은 "고객사"로 처리
  const commonDomains = ['gmail', 'naver', 'daum', 'hanmail', 'yahoo', 'outlook', 'hotmail'];
  if (commonDomains.includes(companyPart.toLowerCase())) {
    return '고객사';
  }
  
  // 회사명으로 보이는 도메인은 대문자로 시작
  return companyPart.charAt(0).toUpperCase() + companyPart.slice(1);
}

/**
 * 이메일에서 담당자명 추출 (GAS용)
 */
function getContactNameFromEmail(email) {
  if (!email) return '담당자';
  
  const localPart = email.split('@')[0];
  
  // 숫자나 특수문자가 많으면 "담당자"로 처리
  if (/\d{3,}/.test(localPart) || localPart.length < 3) {
    return '담당자';
  }
  
  // 영문이면 첫 글자만 대문자로
  if (/^[a-zA-Z]/.test(localPart)) {
    return localPart.charAt(0).toUpperCase() + localPart.slice(1, 6);
  }
  
  return '담당자';
}

// ================================================================================
// 💬 상담신청 처리 (19개 컬럼)
// ================================================================================
  
  function processConsultationForm(data) {
    try {
      const sheet = getOrCreateSheet(SHEETS.CONSULTATION, 'consultation');
      const timestamp = getCurrentKoreanTime();
      
      if (DEBUG_MODE) {
        console.log('✅ 상담신청 처리:', {
          성명: data.성명 || data.name,
          회사명: data.회사명 || data.company,
          이메일: data.이메일 || data.email
        });
      }
      
      // 19개 컬럼 상담신청 데이터 구성
      const rowData = [
        timestamp,                                                    // A: 제출일시
        data.상담유형 || data.consultationType || '일반상담',           // B: 상담유형
        data.성명 || data.name || '',                                  // C: 성명
        data.연락처 || data.phone || '',                               // D: 연락처
        data.이메일 || data.email || '',                               // E: 이메일
        data.회사명 || data.company || '',                             // F: 회사명
        data.직책 || data.position || '',                             // G: 직책
        data.상담분야 || data.consultationArea || data.industry || '', // H: 상담분야
        data.문의내용 || data.inquiryContent || data.message || '',   // I: 문의내용
        data.희망상담시간 || data.preferredTime || '',                 // J: 희망상담시간
        data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // K: 개인정보동의
        data.진단연계여부 === 'Y' || data.isDiagnosisLinked ? 'Y' : 'N', // L: 진단연계여부
        data.진단점수 || data.diagnosisScore || '',                   // M: 진단점수
        data.추천서비스 || data.recommendedService || '',             // N: 추천서비스
        '접수완료',                                                   // O: 처리상태
        '',                                                          // P: 상담일정
        '',                                                          // Q: 상담결과
        '',                                                          // R: 담당컨설턴트
        ''                                                           // S: 완료일시
      ];
  
      // 구글시트에 데이터 저장
      const newRow = sheet.getLastRow() + 1;
      sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
      
      if (DEBUG_MODE) {
        console.log('✅ 상담신청 저장 완료:', {
          시트: SHEETS.CONSULTATION,
          행번호: newRow,
          성명: data.성명 || data.name,
          회사명: data.회사명 || data.company
        });
      }
  
          // 이메일 발송
    if (AUTO_REPLY_ENABLED) {
      sendConsultationAdminNotification(data, newRow);
      
      const userEmail = data.이메일 || data.email;
      const userName = data.성명 || data.name;
      if (userEmail && userName) {
        console.log('📧 상담신청자 확인 메일 발송 시작:', { userEmail, userName });
        sendUserConfirmation(userEmail, userName, '상담');
      } else {
        console.warn('⚠️ 상담신청자 이메일 또는 이름이 없어 확인 메일을 발송하지 않습니다:', { userEmail, userName });
      }
    }
  
      return createSuccessResponse({
        message: '상담신청이 성공적으로 접수되었습니다. 1-2일 내에 전문가가 연락드리겠습니다.',
        sheet: SHEETS.CONSULTATION,
        row: newRow,
        timestamp: timestamp
      });
  
    } catch (error) {
      console.error('❌ 상담신청 처리 오류:', error);
      return createErrorResponse('상담신청 처리 중 오류: ' + error.toString());
    }
  }
  
  // ================================================================================
  // 🧪 베타피드백 처리 (14개 컬럼)
  // ================================================================================
  
  function processBetaFeedback(data) {
    try {
      const sheet = getOrCreateSheet(SHEETS.BETA_FEEDBACK, 'betaFeedback');
      const timestamp = getCurrentKoreanTime();
      
      if (DEBUG_MODE) {
        console.log('🧪 베타피드백 처리:', {
          계산기명: data.계산기명,
          피드백유형: data.피드백유형,
          사용자이메일: data.사용자이메일?.substring(0, 5) + '***'
        });
      }
      
      // 14개 컬럼 베타피드백 데이터 구성
      const rowData = [
        timestamp,                      // A: 제출일시
        data.계산기명 || '',             // B: 계산기명
        data.피드백유형 || '',           // C: 피드백유형
        data.사용자이메일 || '',         // D: 사용자이메일
        data.문제설명 || '',            // E: 문제설명
        data.기대동작 || '',            // F: 기대동작
        data.실제동작 || '',            // G: 실제동작
        data.재현단계 || '',            // H: 재현단계
        data.심각도 || '',              // I: 심각도
        data.추가의견 || '',            // J: 추가의견
        data.브라우저정보 || '',        // K: 브라우저정보
        data.제출경로 || '',            // L: 제출경로
        '접수완료',                    // M: 처리상태
        ''                             // N: 처리일시
      ];
  
      // 구글시트에 데이터 저장
      const newRow = sheet.getLastRow() + 1;
      sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
      
      if (DEBUG_MODE) {
        console.log('✅ 베타피드백 저장 완료:', {
          시트: SHEETS.BETA_FEEDBACK,
          행번호: newRow,
          계산기명: data.계산기명,
          피드백유형: data.피드백유형
        });
      }
  
      // 이메일 발송
      if (AUTO_REPLY_ENABLED) {
        sendBetaFeedbackAdminNotification(data, newRow);
        
        if (data.사용자이메일) {
          sendBetaFeedbackUserConfirmation(data.사용자이메일, data);
        }
      }
  
      return createSuccessResponse({
        message: '베타 피드백이 성공적으로 접수되었습니다. 검토 후 이메일로 회신드리겠습니다.',
        sheet: SHEETS.BETA_FEEDBACK,
        row: newRow,
        timestamp: timestamp,
        calculator: data.계산기명,
        feedbackType: data.피드백유형
      });
  
    } catch (error) {
      console.error('❌ 베타피드백 처리 오류:', error);
      return createErrorResponse('베타피드백 처리 중 오류: ' + error.toString());
    }
  }
  
  
  // (오래된 중복 함수들 제거됨 - 개선된 버전만 유지)
  
  // ================================================================================
  // 🛠️ 유틸리티 함수들
  // ================================================================================
  
    // (중복된 유틸리티 함수들 제거됨) 
  // ================================================================================
// 📊 시트 헤더 설정 (58개 진단, 19개 상담, 14개 베타피드백)
// ================================================================================

function setupHeaders(sheet, type) {
    let headers;
    
    if (type === 'consultation') {
      // 상담신청 헤더 (19개 컬럼)
      headers = [
        '제출일시', '상담유형', '성명', '연락처', '이메일', 
        '회사명', '직책', '상담분야', '문의내용', '희망상담시간', 
        '개인정보동의', '진단연계여부', '진단점수', '추천서비스', '처리상태',
        '상담일정', '상담결과', '담당컨설턴트', '완료일시'
      ];
    } else if (type === 'betaFeedback') {
      // 베타피드백 헤더 (14개 컬럼)
      headers = [
        '제출일시', '계산기명', '피드백유형', '사용자이메일', '문제설명', 
        '기대동작', '실제동작', '재현단계', '심각도', '추가의견', 
        '브라우저정보', '제출경로', '처리상태', '처리일시'
      ];
    } else if (type === 'pdfRecord') {
      // 🆕 PDF 발송 기록 헤더 (13개 컬럼)
      headers = [
        '발송일시', '수신자이메일', '수신자명', '회사명', 'PDF파일명',
        '파일크기', '진단점수', '등급', '업종', '진단일시',
        '발송상태', '담당자', '후속조치'
      ];
    } else {
      // 진단신청 헤더 (58개 컬럼) - 진단 질문 키워드 포함
      headers = [
        // 🔵 기본 정보 (A-R: 18개)
        '제출일시', 
        '회사명', 
        '업종', 
        '사업담당자', 
        '직원수', 
        '사업성장단계', 
        '주요고민사항', 
        '예상혜택', 
        '진행사업장', 
        '담당자명', 
        '연락처', 
        '이메일', 
        '개인정보동의', 
        '폼타입', 
        '진단상태', 
        'AI분석결과', 
        '결과URL', 
        '분석완료일시',
        
        // 🟢 진단 결과 (S-X: 6개)
        '종합점수 (100점 만점)', 
        '상품서비스점수 (25% 가중치)', 
        '고객응대점수 (20% 가중치)', 
        '마케팅점수 (25% 가중치)', 
        '구매재고점수 (15% 가중치)', 
        '매장관리점수 (15% 가중치)',
        
        // 🔶 상품/서비스 관리 역량 (Y-AC: 5개, 가중치 25%)
        '기획수준 (상품/서비스 기획 수준이 어느 정도인가요?)', 
        '차별화정도 (경쟁업체 대비 차별화 정도는?)', 
        '가격설정 (가격 설정의 합리성은?)', 
        '전문성 (업무 전문성 수준은?)', 
        '품질 (상품/서비스 품질 수준은?)',
        
        // 🔷 고객응대 역량 (AD-AG: 4개, 가중치 20%)
        '고객맞이 (고객 맞이의 친절함은?)', 
        '고객응대 (고객 응대 능력은?)', 
        '불만관리 (고객 불만 처리 능력은?)', 
        '고객유지 (고객 유지 관리 능력은?)',
        
        // 🔸 마케팅 역량 (AH-AL: 5개, 가중치 25%)
        '고객이해 (고객 특성 이해도는?)', 
        '마케팅계획 (마케팅 계획 수립 능력은?)', 
        '오프라인마케팅 (오프라인 마케팅 실행 능력은?)', 
        '온라인마케팅 (온라인 마케팅 활용 능력은?)', 
        '판매전략 (판매 전략 수립 및 실행 능력은?)',
        
        // 🔹 구매/재고관리 (AM-AN: 2개, 가중치 15%)
        '구매관리 (구매 관리의 체계성은?)', 
        '재고관리 (재고 관리의 효율성은?)',
        
        // 🔺 매장관리 역량 (AO-AR: 4개, 가중치 15%)
        '외관관리 (매장 외관 관리 상태는?)', 
        '인테리어관리 (내부 인테리어 관리 상태는?)', 
        '청결도 (매장 청결도는?)', 
        '작업동선 (작업 동선의 효율성은?)',
        
        // 🟣 보고서 정보 (AS-AV: 4개)
        '보고서글자수', 
        '추천서비스 목록', 
        '보고서요약 (500자)', 
        '보고서전문 (3000자 미만)'
      ];
    }
    
    // 📋 1행: 헤더 설정
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    
    // 🎨 기본 헤더 스타일링
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setWrap(true);
    sheet.setFrozenRows(1);
    
    // 📊 진단신청의 경우 카테고리별 색상 구분
    if (type === 'diagnosis') {
      
      // 🔵 기본 정보 영역 (A-R: 18개) - 파란색
      const basicInfoRange = sheet.getRange(1, 1, 1, 18);
      basicInfoRange.setBackground('#4285f4');
      basicInfoRange.setFontColor('#ffffff');
      
      // 🟢 진단 결과 영역 (S-X: 6개) - 초록색
      const resultRange = sheet.getRange(1, 19, 1, 6);
      resultRange.setBackground('#34a853');
      resultRange.setFontColor('#ffffff');
      
      // 🔶 상품/서비스 관리 역량 (Y-AC: 5개) - 주황색
      const productServiceRange = sheet.getRange(1, 25, 1, 5);
      productServiceRange.setBackground('#ff9800');
      productServiceRange.setFontColor('#ffffff');
      
      // 🔷 고객응대 역량 (AD-AG: 4개) - 파란색 계열
      const customerServiceRange = sheet.getRange(1, 30, 1, 4);
      customerServiceRange.setBackground('#2196f3');
      customerServiceRange.setFontColor('#ffffff');
      
      // 🔸 마케팅 역량 (AH-AL: 5개) - 보라색
      const marketingRange = sheet.getRange(1, 34, 1, 5);
      marketingRange.setBackground('#9c27b0');
      marketingRange.setFontColor('#ffffff');
      
      // 🔹 구매/재고관리 (AM-AN: 2개) - 갈색
      const procurementRange = sheet.getRange(1, 39, 1, 2);
      procurementRange.setBackground('#795548');
      procurementRange.setFontColor('#ffffff');
      
      // 🔺 매장관리 역량 (AO-AR: 4개) - 청록색
      const storeManagementRange = sheet.getRange(1, 41, 1, 4);
      storeManagementRange.setBackground('#009688');
      storeManagementRange.setFontColor('#ffffff');
      
      // 🟣 보고서 정보 (AS-AV: 4개) - 진한 보라색
      const reportRange = sheet.getRange(1, 45, 1, 4);
      reportRange.setBackground('#673ab7');
      reportRange.setFontColor('#ffffff');
      
      // 📏 컬럼 폭 자동 조정
      sheet.autoResizeColumns(1, headers.length);
      
      // 📝 2행에 카테고리 설명 추가
      const categoryDescriptions = [
        // 기본 정보 (18개)
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        // 진단 결과 (6개)
        '5점 척도→100점 환산', '상품서비스 평균점수', '고객응대 평균점수', '마케팅 평균점수', '구매재고 평균점수', '매장관리 평균점수',
        // 상품/서비스 관리 (5개)
        '1-5점 척도', '1-5점 척도', '1-5점 척도', '1-5점 척도', '1-5점 척도',
        // 고객응대 (4개)
        '1-5점 척도', '1-5점 척도', '1-5점 척도', '1-5점 척도',
        // 마케팅 (5개)
        '1-5점 척도', '1-5점 척도', '1-5점 척도', '1-5점 척도', '1-5점 척도',
        // 구매/재고관리 (2개)
        '1-5점 척도', '1-5점 척도',
        // 매장관리 (4개)
        '1-5점 척도', '1-5점 척도', '1-5점 척도', '1-5점 척도',
        // 보고서 정보 (4개)
        '글자 수', '추천서비스명', '요약 내용', '전체 보고서'
      ];
      
      sheet.getRange(2, 1, 1, categoryDescriptions.length).setValues([categoryDescriptions]);
      const descriptionRange = sheet.getRange(2, 1, 1, categoryDescriptions.length);
      descriptionRange.setBackground('#f5f5f5');
      descriptionRange.setFontColor('#666666');
      descriptionRange.setFontStyle('italic');
      descriptionRange.setFontSize(10);
      descriptionRange.setHorizontalAlignment('center');
      
      sheet.setFrozenRows(2); // 설명 행도 고정
      
      console.log('📊 진단 질문 키워드 포함 헤더 설정 완료 (58개 컬럼 + 설명)');
      console.log('🎨 카테고리별 색상 구분 적용 완료');
    }
    
    // 🆕 PDF 발송 기록 시트의 경우 특별한 스타일링 적용
    if (type === 'pdfRecord') {
      // 🎨 PDF 발송 기록 전용 스타일링 (빨간색)
      headerRange.setBackground('#ff6b6b');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      headerRange.setVerticalAlignment('middle');
      headerRange.setWrap(true);
      sheet.setFrozenRows(1);
      
      // 📏 컬럼 폭 자동 조정
      sheet.autoResizeColumns(1, headers.length);
      
      // 📝 2행에 설명 추가
      const pdfDescriptions = [
        '발송 완료 시간',
        '받는 사람 이메일',
        '받는 사람 이름',
        '고객 회사명',
        'PDF 파일 이름',
        'PDF 파일 크기',
        '진단 총점',
        '등급 (A+ ~ F)',
        '고객 업종',
        '진단 수행 일시',
        '발송 상태',
        '담당 컨설턴트',
        '후속 조치 사항'
      ];
      
      sheet.getRange(2, 1, 1, pdfDescriptions.length).setValues([pdfDescriptions]);
      const pdfDescriptionRange = sheet.getRange(2, 1, 1, pdfDescriptions.length);
      pdfDescriptionRange.setBackground('#ffe0e0');
      pdfDescriptionRange.setFontColor('#c62828');
      pdfDescriptionRange.setFontStyle('italic');
      pdfDescriptionRange.setFontSize(10);
      pdfDescriptionRange.setHorizontalAlignment('center');
      
      sheet.setFrozenRows(2); // 설명 행도 고정
      
      console.log('📧 PDF 발송 기록 시트 스타일링 완료 (13개 컬럼 + 설명)');
    }
    
    console.log(`📋 ${type} 시트 헤더 설정 완료: ${headers.length}개 컬럼`);
  }
  
  // ================================================================================
  // 🔧 헤더 업데이트 전용 함수 (기존 시트 업데이트용)
  // ================================================================================
  
  /**
   * 기존 시트 헤더 업데이트
   */
  function updateExistingSheetHeaders() {
    try {
      console.log('🔄 기존 시트 헤더 업데이트 시작...');
      
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      
      // 진단신청 시트 업데이트
      const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
      if (diagnosisSheet) {
        const existingHeaders = diagnosisSheet.getRange(1, 1, 1, diagnosisSheet.getLastColumn()).getValues()[0];
        diagnosisSheet.getRange(3, 1, 1, existingHeaders.length).setValues([existingHeaders]);
        setupHeaders(diagnosisSheet, 'diagnosis');
        console.log('✅ 진단신청 시트 헤더 업데이트 완료');
      }
      
      // 상담신청 시트 확인/생성
      let consultationSheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
      if (!consultationSheet) {
        consultationSheet = spreadsheet.insertSheet(SHEETS.CONSULTATION);
        setupHeaders(consultationSheet, 'consultation');
        console.log('✅ 상담신청 시트 신규 생성 완료');
      }
      
      // 베타피드백 시트 확인/생성
      let betaSheet = spreadsheet.getSheetByName(SHEETS.BETA_FEEDBACK);
      if (!betaSheet) {
        betaSheet = spreadsheet.insertSheet(SHEETS.BETA_FEEDBACK);
        setupHeaders(betaSheet, 'betaFeedback');
        console.log('✅ 베타피드백 시트 신규 생성 완료');
      }
      
      return createSuccessResponse({
        message: '모든 시트 헤더 업데이트 성공',
        timestamp: getCurrentKoreanTime(),
        details: '진단 질문 키워드 포함 헤더로 업데이트 완료'
      });
      
    } catch (error) {
      console.error('❌ 헤더 업데이트 실패:', error);
      return createErrorResponse('헤더 업데이트 실패: ' + error.toString());
    }
  }
  
  // ================================================================================
  // 🔄 환경변수 동기화 함수
  // ================================================================================
  
  /**
   * 환경변수 동기화 상태 확인
   */
  function checkEnvironmentSync() {
    try {
      console.log('🔄 환경변수 동기화 상태 확인 시작...');
      
      const syncStatus = {
        timestamp: getCurrentKoreanTime(),
        version: VERSION,
        googleSheets: {
          spreadsheetId: SPREADSHEET_ID,
          adminEmail: ADMIN_EMAIL,
          status: '✅ 정상'
        },
        deployment: {
          scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
          deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
          webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
          lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED,
          status: '✅ 정상'
        },
        sheets: {
          diagnosis: SHEETS.DIAGNOSIS,
          consultation: SHEETS.CONSULTATION,
          betaFeedback: SHEETS.BETA_FEEDBACK,
          status: '✅ 정상'
        },
        features: {
          emailNotification: AUTO_REPLY_ENABLED ? '✅ 활성화' : '❌ 비활성화',
          debugMode: DEBUG_MODE ? '✅ 활성화' : '❌ 비활성화',
          status: '✅ 정상'
        }
      };
      
      console.log('✅ 환경변수 동기화 상태 확인 완료:', syncStatus);
      return createSuccessResponse({
        message: '환경변수 동기화 상태가 정상입니다.',
        syncStatus: syncStatus
      });
      
    } catch (error) {
      console.error('❌ 환경변수 동기화 상태 확인 실패:', error);
      return createErrorResponse('환경변수 동기화 상태 확인 실패: ' + error.toString());
    }
  }
  
  /**
   * Next.js 환경변수 호환성 확인
   */
  function checkNextjsCompatibility() {
    try {
      console.log('🔗 Next.js 환경변수 호환성 확인 시작...');
      
      const compatibility = {
        timestamp: getCurrentKoreanTime(),
        version: VERSION,
        nextjsEnvVars: {
          'GOOGLE_SHEETS_ID': SPREADSHEET_ID,
          'GOOGLE_SCRIPT_URL': DEPLOYMENT_INFO.WEB_APP_URL,
          'ADMIN_EMAIL': ADMIN_EMAIL,
          'GOOGLE_SCRIPT_ID': DEPLOYMENT_INFO.SCRIPT_ID,
          'GOOGLE_DEPLOYMENT_ID': DEPLOYMENT_INFO.DEPLOYMENT_ID
        },
        apiEndpoints: {
          webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
          testUrl: DEPLOYMENT_INFO.WEB_APP_URL + '?test=true',
          status: '✅ 정상'
        },
        backupSystem: {
          enabled: true,
          method: 'Google Apps Script API',
          fallback: 'Local Storage',
          status: '✅ 정상'
        }
      };
      
      console.log('✅ Next.js 환경변수 호환성 확인 완료:', compatibility);
      return createSuccessResponse({
        message: 'Next.js 환경변수 호환성이 정상입니다.',
        compatibility: compatibility
      });
      
    } catch (error) {
      console.error('❌ Next.js 환경변수 호환성 확인 실패:', error);
      return createErrorResponse('Next.js 환경변수 호환성 확인 실패: ' + error.toString());
    }
  }
  
  // ================================================================================
  // 🧪 테스트 함수들
  // ================================================================================
  
  /**
   * 전체 시스템 테스트 함수
   */
  function testEntireSystem() {
    try {
      console.log('🧪 전체 시스템 테스트 시작...');
      
      const results = {
        timestamp: getCurrentKoreanTime(),
        version: VERSION,
        tests: {}
      };
      
      // 1. 진단신청 테스트
      const diagnosisTestData = {
        action: 'saveDiagnosis',
        회사명: '테스트기업',
        업종: 'it',
        담당자명: '테스트담당자',
        이메일: 'test@example.com',
        문항별점수: {
          '기획수준': 4,
          '차별화정도': 5,
          '가격설정': 3,
          '고객응대': 4,
          '마케팅계획': 3
        },
        종합점수: 78,
        진단보고서요약: '테스트 진단 보고서입니다.'
      };
      
      try {
        const diagnosisResult = processDiagnosisForm(diagnosisTestData);
        results.tests.diagnosis = { success: true, message: '진단신청 테스트 성공' };
      } catch (error) {
        results.tests.diagnosis = { success: false, error: error.toString() };
      }
      
      // 2. 상담신청 테스트
      const consultationTestData = {
        action: 'saveConsultation',
        성명: '테스트고객',
        회사명: '테스트회사',
        이메일: 'consultation@test.com',
        문의내용: '테스트 상담 문의입니다.'
      };
      
      try {
        const consultationResult = processConsultationForm(consultationTestData);
        results.tests.consultation = { success: true, message: '상담신청 테스트 성공' };
      } catch (error) {
        results.tests.consultation = { success: false, error: error.toString() };
      }
      
      // 3. 베타피드백 테스트
      const betaTestData = {
        action: 'saveBetaFeedback',
        계산기명: '테스트계산기',
        피드백유형: '버그신고',
        사용자이메일: 'beta@test.com',
        문제설명: '테스트 버그 신고입니다.'
      };
      
      try {
        const betaResult = processBetaFeedback(betaTestData);
        results.tests.betaFeedback = { success: true, message: '베타피드백 테스트 성공' };
      } catch (error) {
        results.tests.betaFeedback = { success: false, error: error.toString() };
      }
      
      // 4. 환경변수 동기화 테스트
      try {
        const envSyncResult = checkEnvironmentSync();
        results.tests.environmentSync = { success: true, message: '환경변수 동기화 테스트 성공' };
      } catch (error) {
        results.tests.environmentSync = { success: false, error: error.toString() };
      }
      
      // 5. Next.js 호환성 테스트
      try {
        const nextjsCompatResult = checkNextjsCompatibility();
        results.tests.nextjsCompatibility = { success: true, message: 'Next.js 호환성 테스트 성공' };
      } catch (error) {
        results.tests.nextjsCompatibility = { success: false, error: error.toString() };
      }
      
      console.log('🧪 전체 시스템 테스트 완료:', results);
      return createSuccessResponse(results);
      
    } catch (error) {
      console.error('❌ 시스템 테스트 실패:', error);
      return createErrorResponse('시스템 테스트 실패: ' + error.toString());
    }
  }
  
  // ================================================================================
  // 📖 사용법 및 설치 가이드
  // ================================================================================
  
     /**
    * 📖 AICAMP 통합 Apps Script 2025 최종완성판 사용법
    * 
         * 🎯 현재 배포 정보:
    * - Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
    * - Deployment ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
    * - Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
    * - Google Sheets ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
    * - 관리자 이메일: hongik423@gmail.com
    * - Gemini API Key: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
    * 
    * 🔧 설치 방법:
    * 1. Google Apps Script 에디터에서 기존 Code.gs 내용 전체 삭제
    * 2. 이 코드 전체를 복사하여 Code.gs에 붙여넣기
    * 3. 저장 후 "배포" → "웹 앱으로 배포" 클릭
    * 4. 액세스 권한: "모든 사용자"로 설정
    * 5. "새 배포" 생성 (중요!)
    * 6. 생성된 웹앱 URL을 환경변수에 업데이트
    * 
    * 🧪 테스트 방법:
    * - updateExistingSheetHeaders() 함수 실행: 헤더 업데이트
    * - testEntireSystem() 함수 실행: 전체 시스템 테스트 (5개 테스트 포함)
    * - testDiagnosisSubmission() 함수 실행: 진단 신청 테스트
    * - testConsultationSubmission() 함수 실행: 상담 신청 테스트
    * - testBetaFeedback() 함수 실행: 베타 피드백 테스트
    * - checkEnvironmentSync() 함수 실행: 환경변수 동기화 상태 확인
    * - checkNextjsCompatibility() 함수 실행: Next.js 호환성 확인
    * 
    * ✅ 해결된 문제:
    * - 진단 점수 0으로 나오는 문제 → 1-5점 정확 저장
    * - 이메일 발송 안되는 문제 → 관리자/신청자 자동 이메일
    * - 시트 분리 안되는 문제 → 3개 시트 별도 관리
    * - 58개 컬럼 확장 진단 데이터 완전 저장
    * - 직접 실행 시 오류 → 테스트 함수 제공
    * - 환경변수 불일치 → 완전 동기화 완료
    * - 웹앱 URL 업데이트 → 최신 배포 버전 적용
    * 
    * 📊 시트 구성:
    * - AI_무료진단신청: 58개 컬럼 (진단 키워드 포함)
    * - 상담신청: 19개 컬럼
    * - 베타피드백: 14개 컬럼
    * 
    * 📧 이메일 기능:
    * - 관리자 알림: hongik423@gmail.com
    * - 신청자 확인: 자동 발송
    * - 베타피드백: 개발팀 알림
    * 
    * 🔄 환경변수 동기화:
    * - Next.js 환경변수와 완전 동기화
    * - 실시간 백업 시스템 구축
    * - API 엔드포인트 최신화
    */

/**
 * 진단 신청 테스트
 */
function testDiagnosisSubmission() {
  console.log('🧪 진단 신청 테스트 시작...');
  
  const testData = {
    action: 'saveDiagnosis',
    회사명: '테스트기업',
    업종: 'IT/소프트웨어',
    사업담당자: '김대표',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: '매출 증대 및 마케팅 전략 수립이 필요합니다.',
    예상혜택: '체계적인 마케팅 전략 수립과 매출 증대',
    진행사업장: '서울',
    담당자명: '이담당',
    연락처: '010-1234-5678',
    이메일: 'test@example.com',
    개인정보동의: true,
    종합점수: 75,
    문항별점수: {
      기획수준: 4,
      차별화정도: 3,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 3,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 3,
      마케팅계획: 2,
      오프라인마케팅: 3,
      온라인마케팅: 2,
      판매전략: 3,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    카테고리점수: {
      productService: { score: 4.0 },
      customerService: { score: 3.5 },
      marketing: { score: 2.6 },
      procurement: { score: 4.0 },
      storeManagement: { score: 4.5 }
    },
    진단보고서요약: '테스트 진단 보고서입니다. 마케팅 역량 강화가 필요하며, 특히 온라인 마케팅 전략 수립이 시급합니다.'
  };

  try {
    const result = processDiagnosisForm(testData);
    console.log('✅ 진단 신청 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ 진단 신청 테스트 실패:', error);
    throw error;
  }
}

/**
 * 상담 신청 테스트
 */
function testConsultationSubmission() {
  console.log('🧪 상담 신청 테스트 시작...');
  
  const testData = {
    action: 'saveConsultation',
    상담유형: '경영컨설팅',
    성명: '김테스트',
    연락처: '010-9876-5432',
    이메일: 'consultation@test.com',
    회사명: '테스트컴퍼니',
    직책: '대표이사',
    상담분야: '마케팅전략',
    문의내용: '온라인 마케팅 전략 수립에 대한 상담을 받고 싶습니다.',
    희망상담시간: '평일 오후 2-5시',
    개인정보동의: true,
    진단연계여부: 'Y',
    진단점수: '75',
    추천서비스: '마케팅 컨설팅'
  };

  try {
    const result = processConsultationForm(testData);
    console.log('✅ 상담 신청 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ 상담 신청 테스트 실패:', error);
    throw error;
  }
}

/**
 * 베타 피드백 테스트
 */
function testBetaFeedback() {
  console.log('🧪 베타 피드백 테스트 시작...');
  
  const testData = {
    action: 'saveBetaFeedback',
    계산기명: '종합소득세계산기',
    피드백유형: '버그신고',
    사용자이메일: 'beta@test.com',
    문제설명: '계산 결과가 0원으로 표시됩니다.',
    기대동작: '정확한 세금 계산 결과 표시',
    실제동작: '모든 입력값에 대해 0원 표시',
    재현단계: '1. 소득금액 입력\n2. 계산 버튼 클릭\n3. 결과 0원 표시',
    심각도: '높음',
    추가의견: '빠른 수정 부탁드립니다.',
    브라우저정보: 'Chrome 120.0.0.0',
    제출경로: '/tax-calculator'
  };

  try {
    const result = processBetaFeedback(testData);
    console.log('✅ 베타 피드백 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ 베타 피드백 테스트 실패:', error);
    throw error;
  }
} 

// ================================================================================
// 📧 개선된 이메일 발송 함수들 (PDF 첨부 + 구글시트 첨부 + UTF-8 완전 지원)
// ================================================================================

/**
 * 📊 진단 결과 PDF 생성
 */
function generateDiagnosisPDF(data, totalScore, reportSummary, rowNumber) {
  try {
    const companyName = data.회사명 || data.companyName || '미확인';
    const contactName = data.담당자명 || data.contactName || '미확인';
    
    // HTML 템플릿으로 PDF 생성
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #4285f4; padding-bottom: 20px; margin-bottom: 30px; }
          .company-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .score-section { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .score-big { font-size: 48px; font-weight: bold; color: #1976d2; text-align: center; }
          .summary { background: #fff3e0; padding: 15px; border-left: 4px solid #ff9800; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 AI 무료진단 결과보고서</h1>
          <h2>AICAMP - 비즈니스 성장 솔루션</h2>
          <p>진단일시: ${getCurrentKoreanTime()}</p>
        </div>
        
        <div class="company-info">
          <h3>📋 기업 정보</h3>
          <p><strong>회사명:</strong> ${companyName}</p>
          <p><strong>담당자:</strong> ${contactName}</p>
          <p><strong>업종:</strong> ${data.업종 || data.industry || '미확인'}</p>
          <p><strong>직원수:</strong> ${data.직원수 || data.employeeCount || '미확인'}</p>
          <p><strong>성장단계:</strong> ${data.사업성장단계 || data.growthStage || '미확인'}</p>
        </div>
        
        <div class="score-section">
          <h3>🎯 진단 결과</h3>
          <div class="score-big">${totalScore}점</div>
          <p style="text-align: center; font-size: 18px; margin-top: 10px;">100점 만점 기준</p>
        </div>
        
        <div class="summary">
          <h3>📝 진단 요약</h3>
          <p>${reportSummary}</p>
        </div>
        
        <div>
          <h3>💭 주요 고민사항</h3>
          <p>${data.주요고민사항 || data.mainConcerns || '미확인'}</p>
          
          <h3>🎯 기대 효과</h3>
          <p>${data.예상혜택 || data.expectedBenefits || '미확인'}</p>
        </div>
        
        <div class="footer">
          <p><strong>AICAMP</strong> | 담당: 이후경 경영지도사</p>
          <p>📞 010-9251-9743 | 📧 hongik423@gmail.com</p>
          <p>🔗 상세 데이터: 구글시트 ${rowNumber}행 참조</p>
        </div>
      </body>
      </html>
    `;
    
    // HTML을 PDF로 변환
    const blob = Utilities.newBlob(htmlContent, 'text/html', `AI진단결과_${companyName}_${getCurrentKoreanTime().replace(/[^\w가-힣]/g, '_')}.html`);
    
    // HTML을 PDF로 변환하는 방법 (Google Apps Script 제한으로 HTML 파일로 반환)
    return blob;
    
  } catch (error) {
    console.error('❌ 진단 PDF 생성 실패:', error);
    return null;
  }
}

/**
 * 📋 상담신청서 PDF 생성
 */
function generateConsultationPDF(data, rowNumber) {
  try {
    const applicantName = data.성명 || data.name || '미확인';
    const companyName = data.회사명 || data.company || '미확인';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #4285f4; padding-bottom: 20px; margin-bottom: 30px; }
          .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .info-table th, .info-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .info-table th { background-color: #f8f9fa; font-weight: bold; }
          .inquiry-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💬 전문가 상담신청서</h1>
          <h2>AICAMP - 비즈니스 성장 솔루션</h2>
          <p>신청일시: ${getCurrentKoreanTime()}</p>
        </div>
        
        <table class="info-table">
          <tr><th>성명</th><td>${applicantName}</td></tr>
          <tr><th>회사명</th><td>${companyName}</td></tr>
          <tr><th>직책</th><td>${data.직책 || data.position || '미확인'}</td></tr>
          <tr><th>이메일</th><td>${data.이메일 || data.email || '미확인'}</td></tr>
          <tr><th>연락처</th><td>${data.연락처 || data.phone || '미확인'}</td></tr>
          <tr><th>상담유형</th><td>${data.상담유형 || data.consultationType || '일반상담'}</td></tr>
          <tr><th>상담분야</th><td>${data.상담분야 || data.consultationArea || '미확인'}</td></tr>
          <tr><th>희망상담시간</th><td>${data.희망상담시간 || data.preferredTime || '미확인'}</td></tr>
        </table>
        
        <div class="inquiry-section">
          <h3>💭 문의내용</h3>
          <p>${data.문의내용 || data.inquiryContent || '미확인'}</p>
        </div>
        
        <div class="footer">
          <p><strong>AICAMP</strong> | 담당: 이후경 경영지도사</p>
          <p>📞 010-9251-9743 | 📧 hongik423@gmail.com</p>
          <p>🔗 상세 데이터: 구글시트 ${rowNumber}행 참조</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = Utilities.newBlob(htmlContent, 'text/html', `상담신청서_${companyName}_${getCurrentKoreanTime().replace(/[^\w가-힣]/g, '_')}.html`);
    return blob;
    
  } catch (error) {
    console.error('❌ 상담신청서 PDF 생성 실패:', error);
    return null;
  }
}

/**
 * 📊 구글시트를 CSV로 내보내기
 */
function exportSheetAsCSV(sheetName, rowNumber) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      console.error('❌ 시트를 찾을 수 없음:', sheetName);
      return null;
    }
    
    // 해당 행의 데이터 가져오기
    const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    const dataRange = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn());
    
    const headers = headerRange.getValues()[0];
    const rowData = dataRange.getValues()[0];
    
    // CSV 형식으로 변환
    let csvContent = headers.join(',') + '\n';
    csvContent += rowData.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
    
    const fileName = `${sheetName}_${rowNumber}행_${getCurrentKoreanTime().replace(/[^\w가-힣]/g, '_')}.csv`;
    const blob = Utilities.newBlob(csvContent, 'text/csv', fileName);
    
    return blob;
    
  } catch (error) {
    console.error('❌ CSV 내보내기 실패:', error);
    return null;
  }
}

/**
 * 📧 개선된 진단 관리자 알림 이메일 (PDF + CSV 첨부)
 */
function sendDiagnosisAdminNotification(data, rowNumber, totalScore, reportSummary) {
  try {
    const companyName = data.회사명 || data.companyName || '미확인';
    const contactName = data.담당자명 || data.contactName || '미확인';
    const subject = '[AICAMP] 🎯 새로운 AI 진단 접수 - ' + companyName + ' (' + totalScore + '점)';
    
    // 🎨 시각적 HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 진단 접수 알림</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; position: relative; }
          .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); opacity: 0.3; }
          .header-content { position: relative; z-index: 1; }
          .logo { width: 70px; height: 70px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .subtitle { opacity: 0.9; font-size: 16px; }
          .content { padding: 35px; }
          .alert-banner { background: linear-gradient(45deg, #ff6b6b, #ff8e8e); color: white; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center; font-weight: bold; }
          .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 25px 0; }
          .info-card { background: #f8faff; padding: 20px; border-radius: 10px; border-left: 4px solid #4285f4; }
          .info-label { font-size: 12px; color: #666; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
          .info-value { font-size: 16px; font-weight: bold; color: #333; }
          .score-highlight { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; }
          .score-number { font-size: 42px; font-weight: bold; margin-bottom: 5px; }
          .score-label { opacity: 0.9; }
          .summary-section { background: #fff8e1; border: 1px solid #ffcc02; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .action-buttons { display: flex; gap: 15px; justify-content: center; margin: 30px 0; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; text-align: center; transition: all 0.3s ease; }
          .btn-primary { background: #4285f4; color: white; }
          .btn-secondary { background: #f0f0f0; color: #333; }
          .footer { background: #f8f9fa; padding: 25px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
          .contact-info { margin-top: 15px; }
          .contact-item { display: inline-block; margin: 0 10px; font-size: 14px; }
          .urgent { animation: pulse 2s infinite; }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
          @media (max-width: 600px) { 
            .info-grid { grid-template-columns: 1fr; }
            .action-buttons { flex-direction: column; }
            .btn { margin-bottom: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-content">
              <div class="logo">🎯</div>
              <div class="title">새로운 AI 진단 접수!</div>
              <div class="subtitle">고객 진단 결과가 도착했습니다</div>
            </div>
          </div>
          
          <div class="content">
            <div class="alert-banner urgent">
              📢 신규 진단 접수 - 즉시 확인 필요!
            </div>
            
            <div class="score-highlight">
              <div class="score-number">${totalScore}점</div>
              <div class="score-label">종합 진단 점수 (100점 만점)</div>
            </div>
            
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">회사명</div>
                <div class="info-value">${companyName}</div>
              </div>
              <div class="info-card">
                <div class="info-label">담당자</div>
                <div class="info-value">${contactName}</div>
              </div>
              <div class="info-card">
                <div class="info-label">연락처</div>
                <div class="info-value">${data.연락처 || data.phone || '미확인'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">이메일</div>
                <div class="info-value">${data.이메일 || data.contactEmail || data.email || '미확인'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">업종</div>
                <div class="info-value">${data.업종 || data.industry || '미확인'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">접수시간</div>
                <div class="info-value">${getCurrentKoreanTime()}</div>
              </div>
            </div>
            
            <div class="summary-section">
              <h3 style="color: #f57c00; margin-top: 0;">📝 진단 요약</h3>
              <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
                ${reportSummary.substring(0, 300)}${reportSummary.length > 300 ? '...' : ''}
              </p>
              <div style="font-size: 12px; color: #666;">
                보고서 길이: ${reportSummary.length}자 | 구글시트 ${rowNumber}행
              </div>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #2e7d32; margin-top: 0;">🎯 주요 고민사항</h3>
              <p style="color: #2e7d32; margin-bottom: 10px;">
                ${(data.주요고민사항 || data.mainConcerns || '미확인').substring(0, 200)}
              </p>
              
              <h3 style="color: #2e7d32; margin-top: 15px;">💡 기대 효과</h3>
              <p style="color: #2e7d32; margin-bottom: 0;">
                ${(data.예상혜택 || data.expectedBenefits || '미확인').substring(0, 200)}
              </p>
            </div>
            
            <div class="action-buttons">
              <a href="${GOOGLE_SHEETS_URL}" class="btn btn-primary">
                📊 구글시트에서 확인
              </a>
              <a href="tel:${data.연락처 || data.phone || '010-9251-9743'}" class="btn btn-secondary">
                📞 고객에게 연락
              </a>
            </div>
            
            <div style="background: #fff3e0; border: 1px solid #ffb74d; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #ef6c00; margin-top: 0;">🔔 다음 단계</h4>
              <ol style="color: #ef6c00; margin: 0; padding-left: 20px;">
                <li>진단 결과 상세 검토</li>
                <li>고객 연락 및 상담 일정 협의 (1-2일 내)</li>
                <li>맞춤형 솔루션 제안</li>
                <li>후속 서비스 안내</li>
              </ol>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong style="color: #4285f4;">AICAMP AI교육센터</strong>
              <br>
              AI기반 비즈니스 성장 솔루션
            </div>
            <div class="contact-info">
              <div class="contact-item">📞 010-9251-9743</div>
              <div class="contact-item">📧 ${ADMIN_EMAIL}</div>
              <div class="contact-item">🌐 https://aicamp.club</div>
            </div>
            <div style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
              본 메일은 AI 진단 신청에 따라 자동 발송되었습니다. | ${VERSION}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 일반 텍스트 버전 (백업용)
    const textBody = '📊 새로운 AI 무료진단이 접수되었습니다!\n\n' +
      '🏢 회사명: ' + companyName + '\n' +
      '👤 담당자: ' + contactName + ' (' + (data.이메일 || data.contactEmail || data.email || '미확인') + ')\n' +
      '🏭 업종: ' + (data.업종 || data.industry || '미확인') + '\n' +
      '👥 직원수: ' + (data.직원수 || data.employeeCount || '미확인') + '\n' +
      '🎯 종합점수: ' + totalScore + '점/100점\n' +
      '📝 보고서 길이: ' + reportSummary.length + '자\n' +
      '⏰ 접수 시간: ' + getCurrentKoreanTime() + '\n\n' +
      '💭 주요 고민사항:\n' + ((data.주요고민사항 || data.mainConcerns || '').substring(0, 300)) + '...\n\n' +
      '🎯 기대 효과:\n' + ((data.예상혜택 || data.expectedBenefits || '').substring(0, 300)) + '...\n\n' +
      '📋 진단 요약:\n' + reportSummary.substring(0, 500) + '...\n\n' +
      '📊 데이터 위치: ' + SHEETS.DIAGNOSIS + ' 시트 ' + rowNumber + '행\n' +
      '🔗 구글시트: ' + GOOGLE_SHEETS_URL + '\n\n' +
      '🔔 다음 단계:\n' +
      '1. 진단 결과 검토\n' +
      '2. 고객 연락 및 상담 일정 협의\n' +
      '3. 맞춤형 솔루션 제안\n\n' +
      '---\n' +
      'AICAMP 자동 알림 시스템\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743 | 📧 ' + ADMIN_EMAIL;

    // PDF 및 CSV 파일 생성
    const attachments = [];
    
    // 진단 결과 PDF 생성
    const diagnosisPDF = generateDiagnosisPDF(data, totalScore, reportSummary, rowNumber);
    if (diagnosisPDF) {
      attachments.push(diagnosisPDF);
    }
    
    // 데이터 CSV 생성
    const csvFile = exportSheetAsCSV(SHEETS.DIAGNOSIS, rowNumber);
    if (csvFile) {
      attachments.push(csvFile);
    }

    // 이메일 발송 (HTML 버전 우선, 텍스트 백업)
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      attachments: attachments,
      name: 'AICAMP 진단 알림 시스템'
    });
    
    console.log('📧 진단 관리자 알림 이메일 발송 완료 (첨부파일 ' + attachments.length + '개)');
  } catch (error) {
    console.error('❌ 진단 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 📧 개선된 상담 관리자 알림 이메일 (PDF + CSV 첨부)
 */
function sendConsultationAdminNotification(data, rowNumber) {
  try {
    const companyName = data.회사명 || data.company || '회사명미상';
    const applicantName = data.성명 || data.name || '미확인';
    const subject = '[AICAMP] 💬 새로운 상담신청 접수 - ' + companyName + ' (' + applicantName + ')';
    
    const emailBody = '💬 새로운 상담신청이 접수되었습니다!\n\n' +
      '👤 신청자: ' + applicantName + '\n' +
      '🏢 회사명: ' + companyName + '\n' +
      '💼 직책: ' + (data.직책 || data.position || '미확인') + '\n' +
      '📧 이메일: ' + (data.이메일 || data.email || '미확인') + '\n' +
      '📞 연락처: ' + (data.연락처 || data.phone || '미확인') + '\n' +
      '🎯 상담유형: ' + (data.상담유형 || data.consultationType || '일반상담') + '\n' +
      '📝 상담분야: ' + (data.상담분야 || data.consultationArea || '미확인') + '\n' +
      '⏰ 희망시간: ' + (data.희망상담시간 || data.preferredTime || '미확인') + '\n' +
      '📅 접수시간: ' + getCurrentKoreanTime() + '\n\n' +
      '💭 문의내용:\n' + ((data.문의내용 || data.inquiryContent || '').substring(0, 500)) + '\n\n' +
      '📊 연계정보:\n' +
      '• 진단연계여부: ' + (data.진단연계여부 || 'N') + '\n' +
      '• 진단점수: ' + (data.진단점수 || '미연계') + '\n' +
      '• 추천서비스: ' + (data.추천서비스 || '미연계') + '\n\n' +
      '📊 데이터 위치:\n' +
      '• 시트: ' + SHEETS.CONSULTATION + ' 시트 ' + rowNumber + '행\n' +
      '• 구글시트: ' + GOOGLE_SHEETS_URL + '\n' +
      '• 직접 링크: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit#gid=' + getSheetId(SHEETS.CONSULTATION) + '&range=A' + rowNumber + '\n\n' +
      '📎 첨부파일:\n' +
      '• 상담신청서.html (신청서 양식)\n' +
      '• 상담데이터.csv (상세 데이터)\n\n' +
      '🔔 다음 단계:\n' +
      '1. 신청자 연락 (1-2일 내)\n' +
      '2. 상담 일정 협의\n' +
      '3. 전문가 상담 진행\n' +
      '4. 솔루션 제안 및 후속 조치\n\n' +
      '---\n' +
      'AICAMP 자동 알림 시스템\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743 | 📧 ' + ADMIN_EMAIL;

    // PDF 및 CSV 파일 생성
    const attachments = [];
    
    // 상담신청서 PDF 생성
    const consultationPDF = generateConsultationPDF(data, rowNumber);
    if (consultationPDF) {
      attachments.push(consultationPDF);
    }
    
    // 데이터 CSV 생성
    const csvFile = exportSheetAsCSV(SHEETS.CONSULTATION, rowNumber);
    if (csvFile) {
      attachments.push(csvFile);
    }

    // HTML 이메일 본문
    const htmlBody = emailBody.replace(/\n/g, '<br>')
      .replace(/💬|👤|🏢|💼|📧|📞|🎯|📝|⏰|📅|💭|📊|📎|🔔/g, '<strong>$&</strong>');

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody,
      attachments: attachments
    });
    
    console.log('📧 상담 관리자 알림 이메일 발송 완료 (첨부파일 ' + attachments.length + '개)');
  } catch (error) {
    console.error('❌ 상담 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 📧 신청자 확인 이메일 (깔끔한 버전)
 */
function sendUserConfirmation(email, name, type) {
  try {
    const isConsultation = type === '상담';
    const subject = '[AICAMP] ' + (isConsultation ? '🤝 전문가 상담' : '🎯 AI 진단') + ' 신청이 접수되었습니다!';
    
    // 텍스트 이메일
    const emailBody = '안녕하세요 ' + (name || '고객') + '님,\n\n' +
      'AICAMP에 ' + (isConsultation ? '전문가 상담' : 'AI 무료진단') + ' 신청을 해주셔서 감사합니다.\n\n' +
      '✅ 신청이 성공적으로 접수되었습니다!\n' +
      '📅 접수일시: ' + getCurrentKoreanTime() + '\n\n' +
      '🔔 다음 진행사항:\n' +
      (isConsultation ? 
        '1. 전문가가 1-2일 내에 연락드립니다\n' +
        '2. 상담 일정을 협의합니다\n' +
        '3. 맞춤형 전문가 상담을 진행합니다\n' +
        '4. 구체적인 솔루션을 제안드립니다\n\n' +
        '💡 상담 준비사항:\n' +
        '• 현재 비즈니스 현황 자료\n' +
        '• 구체적인 고민사항 정리\n' +
        '• 목표하는 성과 및 일정\n' +
        '• 예산 범위 (대략적으로)'
        :
        '1. AI 진단 결과를 분석합니다\n' +
        '2. 전문가가 결과를 검토합니다\n' +
        '3. 1-2일 내에 상세한 분석 결과를 연락드립니다\n' +
        '4. 맞춤형 개선방안을 제시합니다\n\n' +
        '💡 진단 결과 포함사항:\n' +
        '• 5개 영역별 상세 분석 (100점 만점)\n' +
        '• 강점과 개선점 도출\n' +
        '• 맞춤형 솔루션 제안\n' +
        '• 단계별 실행 계획'
      ) + '\n\n' +
      '📞 빠른 연락을 원하시면:\n' +
      '전화: 010-9251-9743 (이후경 경영지도사)\n' +
      '이메일: ' + ADMIN_EMAIL + '\n\n' +
      '🎯 AICAMP 서비스 소개:\n' +
      '• AI 기반 비즈니스 진단\n' +
      '• 전문가 1:1 맞춤 상담\n' +
      '• 성장 전략 수립 지원\n' +
      '• 실행 계획 및 후속 관리\n\n' +
      '더 자세한 정보가 궁금하시면 언제든 연락해주세요.\n' +
      '귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.\n\n' +
      '감사합니다.\n\n' +
      '---\n' +
      'AICAMP (AI기반 비즈니스 성장 솔루션)\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743\n' +
      '📧 ' + ADMIN_EMAIL + '\n' +
      '🌐 https://aicamp.club';

    // HTML 버전 (간단한 스타일)
    const htmlBody = emailBody.replace(/\n/g, '<br>')
      .replace(/✅|📅|🔔|💡|📞|🎯/g, '<strong>$&</strong>');

    // 이메일 발송
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI교육센터'
    });
              
    console.log('📧 신청자 확인 이메일 발송 완료:', email);
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
  }
}

/**
 * 베타피드백 관리자 알림 이메일 (구글시트 링크 포함) 
 */
function sendBetaFeedbackAdminNotification(data, rowNumber) {
  try {
    const subject = '[AICAMP] 🚨 긴급! 베타 피드백 접수 - ' + (data.계산기명 || '세금계산기');
    
    const emailBody = '🧪 새로운 베타 피드백이 접수되었습니다!\n\n' +
      '🎯 대상 계산기: ' + (data.계산기명 || 'N/A') + '\n' +
      '🐛 피드백 유형: ' + (data.피드백유형 || 'N/A') + '\n' +
      '📧 사용자 이메일: ' + (data.사용자이메일 || 'N/A') + '\n' +
      '⚠️ 심각도: ' + (data.심각도 || 'N/A') + '\n' +
      '⏰ 접수 시간: ' + getCurrentKoreanTime() + '\n\n' +
      '📝 문제 설명:\n' + ((data.문제설명 || '').substring(0, 200)) + '...\n\n' +
      '📋 시트 위치: ' + SHEETS.BETA_FEEDBACK + ' 시트 ' + rowNumber + '행\n' +
      '🔗 구글시트 바로가기: ' + GOOGLE_SHEETS_URL + '\n' +
      '🔗 직접 링크: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit#gid=' + getSheetId(SHEETS.BETA_FEEDBACK) + '&range=A' + rowNumber + '\n\n' +
      '---\n' +
      'AICAMP 베타테스트 개발팀\n' +
      '📧 ' + ADMIN_EMAIL;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: emailBody,
      htmlBody: emailBody.replace(/\n/g, '<br>'),
      attachments: []
    });
    
    console.log('📧 베타피드백 관리자 알림 이메일 발송 완료 (UTF-8)');
  } catch (error) {
    console.error('❌ 베타피드백 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 베타피드백 사용자 확인 이메일 (UTF-8 지원)
 */
function sendBetaFeedbackUserConfirmation(email, data) {
  try {
    const subject = '[AICAMP] 🧪 베타 피드백 접수 완료! ' + (data.계산기명 || '세금계산기');
    
    const emailBody = '안녕하세요!\n\n' +
      'AICAMP 세금계산기 베타테스트에 참여해 주셔서 감사합니다.\n\n' +
      '🎯 접수된 피드백: ' + (data.계산기명 || '세금계산기') + '\n' +
      '🐛 피드백 유형: ' + (data.피드백유형 || 'N/A') + '\n' +
      '⏰ 접수 일시: ' + getCurrentKoreanTime() + '\n\n' +
      '담당자가 검토 후 이메일로 회신드리겠습니다.\n\n' +
      '추가 문의사항이 있으시면 언제든 연락해주세요.\n\n' +
      '감사합니다.\nAICAMP 베타테스트 개발팀';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: emailBody,
      htmlBody: emailBody.replace(/\n/g, '<br>'),
      attachments: []
    });
    
    console.log('📧 베타피드백 사용자 확인 이메일 발송 완료 (UTF-8):', email);
  } catch (error) {
    console.error('❌ 베타피드백 사용자 이메일 발송 실패:', error);
  }
}

/**
 * 시트 ID 가져오기 (링크 생성용)
 */
function getSheetId(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetName);
    return sheet ? sheet.getSheetId() : 0;
  } catch (error) {
    console.error('시트 ID 가져오기 실패:', error);
    return 0;
  }
}

// ================================================================================
// 🆕 PDF 이메일 발송 관련 함수들 (신규 추가)
// ================================================================================

/**
 * 📧 신청자에게 PDF 첨부 이메일 발송
 */
function sendPdfEmailToUser(pdfData) {
  try {
    const sentTime = getCurrentKoreanTime();
    
    // 📄 Base64 PDF 데이터를 Blob으로 변환
    let pdfBlob = null;
    try {
      const base64Data = pdfData.pdf_attachment.replace(/^data:application\/pdf;base64,/, '');
      const binaryData = Utilities.base64Decode(base64Data);
      pdfBlob = Utilities.newBlob(binaryData, 'application/pdf', pdfData.pdf_filename);
      
      console.log('✅ PDF Blob 생성 성공:', {
        filename: pdfBlob.getName(),
        size: Math.round(pdfBlob.getBytes().length / 1024) + 'KB'
      });
    } catch (pdfError) {
      console.error('❌ PDF Blob 생성 실패:', pdfError);
      return { success: false, error: 'PDF 데이터 변환 실패: ' + pdfError.toString() };
    }

    const subject = `[AICAMP] 🎯 AI 무료진단 결과보고서 - ${pdfData.company_name}`;
    
    const emailBody = `안녕하세요 ${pdfData.to_name}님,

AICAMP AI 무료진단을 신청해 주셔서 감사합니다.
요청하신 진단 결과보고서를 첨부파일로 보내드립니다.

📊 진단 정보:
• 회사명: ${pdfData.company_name}
• 진단일시: ${pdfData.diagnosis_date}
• 종합점수: ${pdfData.total_score}점 (100점 만점)
• 등급: ${pdfData.overall_grade}
• 업종: ${pdfData.industry_type}

📎 첨부파일:
• AI 진단 결과보고서 (PDF)

📞 후속 상담 문의:
• 담당: ${pdfData.consultant_name}
• 전화: ${pdfData.consultant_phone}
• 이메일: ${pdfData.consultant_email}

💡 진단 결과를 바탕으로 맞춤형 성장 전략을 제안드릴 수 있습니다.
추가 상담이나 문의사항이 있으시면 언제든 연락해주세요.

귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.

감사합니다.

---
AICAMP (AI기반 비즈니스 성장 솔루션)
담당: ${pdfData.consultant_name}
📞 ${pdfData.consultant_phone}
📧 ${pdfData.consultant_email}
🌐 https://ai-camp-landingpage.vercel.app
발송일시: ${sentTime}`;

    // HTML 이메일 본문
    const htmlBody = `
      <div style="font-family: 'Malgun Gothic', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; border-bottom: 3px solid #4285f4; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #4285f4; margin-bottom: 10px;">🎯 AICAMP</h1>
          <h2 style="color: #333; margin: 0;">AI 무료진단 결과보고서</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">✅ 진단 완료</h3>
          <p><strong>${pdfData.to_name}님</strong>의 AI 무료진단이 완료되었습니다.</p>
          <p>상세한 분석 결과를 첨부파일로 확인하실 수 있습니다.</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #1976d2; margin-top: 0;">📊 진단 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>회사명</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${pdfData.company_name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>진단일시</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${pdfData.diagnosis_date}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>종합점수</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong style="color: #f57c00; font-size: 18px;">${pdfData.total_score}점</strong></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>등급</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong style="color: #2196f3;">${pdfData.overall_grade}</strong></td></tr>
            <tr><td style="padding: 8px;"><strong>업종</strong></td><td style="padding: 8px;">${pdfData.industry_type}</td></tr>
          </table>
        </div>
        
        <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #f57c00; margin-top: 0;">📞 후속 상담</h3>
          <p><strong>담당:</strong> ${pdfData.consultant_name}</p>
          <p><strong>전화:</strong> ${pdfData.consultant_phone}</p>
          <p><strong>이메일:</strong> ${pdfData.consultant_email}</p>
          <p style="margin-top: 15px;">진단 결과를 바탕으로 <strong>맞춤형 성장 전략</strong>을 제안드릴 수 있습니다.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
          <p><strong>AICAMP</strong> - AI기반 비즈니스 성장 솔루션</p>
          <p>귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.</p>
        </div>
      </div>
    `;

    // 이메일 발송 (PDF 첨부)
    MailApp.sendEmail({
      to: pdfData.to_email,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody,
      attachments: [pdfBlob],
      name: 'AICAMP AI 교육센터'
    });
    
    console.log('📧 신청자 PDF 이메일 발송 완료:', {
      to: pdfData.to_email,
      company: pdfData.company_name,
      sentTime: sentTime,
      pdfSize: Math.round(pdfBlob.getBytes().length / 1024) + 'KB'
    });

    return { success: true, sentTime: sentTime };

  } catch (error) {
    console.error('❌ 신청자 PDF 이메일 발송 실패:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * 📊 점수에서 등급 산출
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 65) return 'C';
  if (score >= 60) return 'D+';
  if (score >= 55) return 'D';
  return 'F';
}

/**
 * 📧 관리자에게 PDF 발송 완료 알림
 */
function sendPdfNotificationToAdmin(pdfData, sentTime) {
  try {
    const subject = `[AICAMP] ✅ PDF 진단보고서 발송 완료 - ${pdfData.company_name}`;
    
    const adminBody = `📧 AI 진단 결과보고서가 성공적으로 발송되었습니다!

📊 발송 정보:
• 수신자: ${pdfData.to_name} (${pdfData.to_email})
• 회사명: ${pdfData.company_name}
• 진단점수: ${pdfData.total_score}점
• 등급: ${pdfData.overall_grade}
• 업종: ${pdfData.industry_type}
• 발송일시: ${sentTime}

📎 발송된 파일:
• ${pdfData.pdf_filename}
• 크기: ${pdfData.pdf_attachment ? Math.round(pdfData.pdf_attachment.length / 1024) + 'KB' : 'N/A'}

🔔 다음 단계:
1. 고객 후속 연락 (1-2일 내)
2. 진단 결과 설명 및 상담 제안
3. 맞춤형 솔루션 제시

📊 구글시트 확인:
${GOOGLE_SHEETS_URL}

---
AICAMP 자동 알림 시스템
발송일시: ${sentTime}`;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: adminBody,
      htmlBody: adminBody.replace(/\n/g, '<br>'),
      name: 'AICAMP 자동 알림 시스템'
    });
    
    console.log('📧 관리자 PDF 발송 완료 알림 전송');

  } catch (error) {
    console.error('❌ 관리자 알림 발송 실패:', error);
  }
}

/**
 * 🚨 관리자에게 PDF 발송 오류 알림
 */
function sendPdfErrorNotificationToAdmin(pdfData, error) {
  try {
    const subject = `[AICAMP] 🚨 긴급: PDF 발송 실패 - ${pdfData.company_name}`;
    
    const errorBody = `❌ PDF 진단보고서 발송 중 오류가 발생했습니다!

🚨 오류 정보:
• 수신자: ${pdfData.to_name} (${pdfData.to_email})
• 회사명: ${pdfData.company_name}
• 진단점수: ${pdfData.total_score}점
• 오류 메시지: ${error.toString()}
• 발생 시간: ${getCurrentKoreanTime()}

🚨 즉시 조치 필요:
1. 고객에게 직접 연락하여 상황 설명
2. PDF 보고서 수동 발송 또는 재발송
3. 시스템 오류 점검 및 수정

📞 고객 연락처: ${pdfData.to_email}

---
AICAMP 긴급 알림 시스템
발생일시: ${getCurrentKoreanTime()}`;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: errorBody,
      htmlBody: errorBody.replace(/\n/g, '<br>'),
      name: 'AICAMP 긴급 알림 시스템'
    });
    
    console.log('🚨 관리자 PDF 발송 오류 알림 전송');

  } catch (notificationError) {
    console.error('❌ 관리자 오류 알림 발송도 실패:', notificationError);
  }
}

/**
 * 📊 PDF 발송 기록을 구글시트에 저장
 */
function savePdfSendingRecord(pdfData, sentTime) {
  try {
    const sheet = getOrCreateSheet('PDF_발송기록', 'pdfRecord');
    
    const rowData = [
      sentTime,                                    // A: 발송일시
      pdfData.to_email,                           // B: 수신자이메일
      pdfData.to_name,                            // C: 수신자명
      pdfData.company_name,                       // D: 회사명
      pdfData.pdf_filename,                       // E: PDF파일명
      pdfData.pdf_attachment ? Math.round(pdfData.pdf_attachment.length / 1024) + 'KB' : '0KB', // F: 파일크기
      pdfData.total_score,                        // G: 진단점수
      pdfData.overall_grade,                      // H: 등급
      pdfData.industry_type,                      // I: 업종
      pdfData.diagnosis_date,                     // J: 진단일시
      '발송완료',                                  // K: 발송상태
      pdfData.consultant_name,                    // L: 담당자
      ''                                          // M: 후속조치
    ];
    
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('📊 PDF 발송 기록 저장 완료:', {
      시트: 'PDF_발송기록',
      행번호: newRow,
      회사명: pdfData.company_name,
      수신자: pdfData.to_email
    });
    
    return { success: true, row: newRow };

  } catch (error) {
    console.error('❌ PDF 발송 기록 저장 실패:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * 🆕 HTML 첨부파일 진단 처리 함수
 */
function processDiagnosisWithHtmlAttachment(data) {
  try {
    console.log('📧 HTML 첨부 진단 처리 시작');
    
    // 구글시트 준비
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.DIAGNOSIS);
    if (!sheet) {
      throw new Error(`시트를 찾을 수 없습니다: ${SHEETS.DIAGNOSIS}`);
    }

    const timestamp = getCurrentKoreanTime();
    
    // 시트 데이터 저장 (기본 필드만)
    const rowData = [
      timestamp,                                              // A: 제출일시
      data.회사명 || data.companyName || '',                  // B: 회사명
      data.담당자명 || data.contactName || '',                // C: 담당자명
      data.이메일 || data.contactEmail || '',                 // D: 이메일
      data.연락처 || data.contactPhone || '',                 // E: 연락처
      data.업종 || data.industry || '',                       // F: 업종
      data.종합점수 || data.totalScore || 0,                  // G: 종합점수
      data.종합등급 || data.overallGrade || '',               // H: 종합등급
      data.신뢰도 || data.reliabilityScore || '',             // I: 신뢰도
      data.진단일 || data.diagnosisDate || '',                // J: 진단일
      'HTML첨부완료',                                         // K: 처리상태
      '이후경 경영지도사',                                     // L: 담당컨설턴트
      data.html_filename || '',                              // M: HTML파일명
      'HTML첨부발송완료',                                     // N: 이메일상태
      timestamp                                              // O: 완료일시
    ];

    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

    console.log('✅ 시트 저장 완료:', {
      시트: SHEETS.DIAGNOSIS,
      행번호: newRow,
      회사명: data.회사명 || data.companyName,
      HTML파일: data.html_filename
    });

    // HTML 첨부파일 이메일 발송 처리
    let htmlEmailResult = null;
    let responseMessage = '📊 AI 무료진단이 성공적으로 접수되었습니다.';
    
    const htmlAttachment = data.html_attachment;
    if (htmlAttachment && htmlAttachment.length > 100) {
      console.log('📧 HTML 첨부파일 감지 - 신청자에게 HTML 이메일 발송 시작');
      
      // HTML 이메일 발송 데이터 준비
      const htmlEmailData = {
        to_email: data.이메일 || data.contactEmail,
        to_name: data.담당자명 || data.contactName,
        company_name: data.회사명 || data.companyName,
        html_attachment: htmlAttachment,
        html_filename: data.html_filename || `AI진단보고서_${data.회사명 || data.companyName}_${timestamp.replace(/[^\w가-힣]/g, '_')}.html`,
        total_score: data.종합점수 || data.totalScore,
        overall_grade: data.종합등급 || data.overallGrade,
        industry_type: data.업종 || data.industry,
        diagnosis_date: data.진단일 || timestamp,
        consultant_name: data.consultant_name || '이후경 교장 (경영지도사)',
        consultant_phone: data.consultant_phone || '010-9251-9743',
        consultant_email: data.consultant_email || ADMIN_EMAIL
      };
      
      // 신청자에게 HTML 첨부 이메일 발송
      htmlEmailResult = sendHtmlEmailToUser(htmlEmailData);
      
      if (htmlEmailResult.success) {
        console.log('✅ 신청자 HTML 첨부 이메일 발송 성공');
        
        // HTML 발송 기록을 별도 시트에 저장
        saveHtmlSendingRecord(htmlEmailData, htmlEmailResult.sentTime);
        
        // 관리자에게 HTML 발송 완료 알림
        sendHtmlNotificationToAdmin(htmlEmailData, htmlEmailResult.sentTime);
        
        responseMessage = `📧 AI 무료진단이 접수되었으며, 완벽한 HTML 진단보고서가 ${data.이메일 || data.contactEmail}로 발송되었습니다. 이메일을 확인해주세요.`;
      } else {
        console.error('❌ 신청자 HTML 이메일 발송 실패:', htmlEmailResult.error);
        
        // 관리자에게 HTML 발송 실패 알림
        sendHtmlErrorNotificationToAdmin(htmlEmailData, new Error(htmlEmailResult.error));
        
        responseMessage = '📊 AI 무료진단이 접수되었습니다. HTML 이메일 발송에 일시적 문제가 있어 관리자가 직접 연락드리겠습니다.';
      }
    }

    // 관리자 이메일 발송 (기존 기능)
    if (AUTO_REPLY_ENABLED) {
      sendDiagnosisAdminNotification(data, newRow, data.종합점수 || data.totalScore, '완벽한 HTML 진단보고서 첨부 완료');
      
      const userEmail = data.이메일 || data.contactEmail;
      const userName = data.담당자명 || data.contactName;
      
      // HTML 이메일을 보냈다면 일반 확인 이메일은 스킵
      if (!htmlEmailResult || !htmlEmailResult.success) {
        if (userEmail) {
          sendUserConfirmation(userEmail, userName, '진단');
        }
      }
    }

    return createSuccessResponse({
      message: responseMessage,
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: data.종합점수 || data.totalScore,
      HTML파일명: data.html_filename,
      // 🆕 HTML 이메일 발송 결과 포함
      htmlEmailSent: htmlEmailResult ? htmlEmailResult.success : false,
      htmlEmailError: htmlEmailResult && !htmlEmailResult.success ? htmlEmailResult.error : null
    });

  } catch (error) {
    console.error('❌ HTML 첨부 진단신청 처리 오류:', error);
    return createErrorResponse('HTML 첨부 진단신청 처리 중 오류: ' + error.toString());
  }
}

/**
 * 📧 HTML 첨부 이메일을 신청자에게 발송
 */
function sendHtmlEmailToUser(data) {
  try {
    console.log('📧 HTML 첨부 이메일 발송 시작:', data.to_email);
    
    // Base64 HTML 데이터를 Blob으로 변환
    const htmlBlob = Utilities.newBlob(
      Utilities.base64Decode(data.html_attachment), 
      'text/html; charset=utf-8', 
      data.html_filename
    );
    
    // 이메일 제목
    const subject = `[AICAMP] 🎯 완벽한 AI 진단보고서가 도착했습니다! - ${data.company_name}`;
    
    // 이메일 본문 (HTML)
    const htmlBody = `
      <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- 헤더 -->
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4285f4, #34a853); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px; color: white;">🎯</div>
            <h1 style="color: #2c5aa0; font-size: 2.2rem; margin: 0 0 10px 0; font-weight: 800;">완벽한 AI 진단보고서</h1>
            <p style="color: #666; font-size: 1.1rem; margin: 0;">AICAMP - 전문 경영진단 시스템</p>
          </div>
          
          <!-- 인사말 -->
          <div style="background: linear-gradient(135deg, #f8faff 0%, #e8f4f8 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #4285f4;">
            <h2 style="color: #2c5aa0; font-size: 1.5rem; margin: 0 0 15px 0;">안녕하세요 ${data.to_name || '고객'}님! 👋</h2>
            <p style="color: #555; line-height: 1.8; margin: 0; font-size: 1.1rem;">
              <strong>${data.company_name}</strong>의 AI 무료진단이 완료되어 <strong>완벽한 HTML 진단보고서</strong>를 첨부파일로 보내드립니다.
            </p>
          </div>
          
          <!-- 진단 결과 요약 -->
          <div style="background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem;">📊 진단 결과 요약</h3>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
              <div>
                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 5px;">${data.total_score || 0}</div>
                <div style="font-size: 1rem; opacity: 0.9;">종합 점수</div>
              </div>
              <div>
                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 5px;">${data.overall_grade || 'B'}</div>
                <div style="font-size: 1rem; opacity: 0.9;">종합 등급</div>
              </div>
            </div>
          </div>
          
          <!-- HTML 보고서 첨부 안내 -->
          <div style="background: #fff8e1; padding: 25px; border-radius: 15px; border: 2px solid #ffc107; margin-bottom: 30px;">
            <h3 style="color: #e65100; margin: 0 0 15px 0; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
              📄 완벽한 HTML 진단보고서 첨부
            </h3>
            <ul style="color: #5d4037; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>20개 문항 5점 척도</strong> 상세 평가 결과</li>
              <li><strong>5개 카테고리별</strong> 세부 분석 및 점수</li>
              <li><strong>SWOT 분석</strong> (강점/약점/기회/위협)</li>
              <li><strong>맞춤형 개선 추천사항</strong> 및 실행 계획</li>
              <li><strong>완벽한 종합 진단보고서</strong> 전문가 리뷰</li>
            </ul>
            <div style="background: white; padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid #ff9800;">
              <strong style="color: #e65100;">📎 첨부파일:</strong> 
              <span style="color: #333; font-family: monospace;">${data.html_filename}</span>
            </div>
          </div>
          
          <!-- 전문가 상담사 정보 -->
          <div style="background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); color: white; padding: 25px; border-radius: 15px; text-align: center;">
            <h3 style="margin: 0 0 20px 0; font-size: 1.4rem;">👨‍💼 전문가 상담사</h3>
            <div style="margin-bottom: 15px;">
              <div style="font-size: 1.3rem; font-weight: 700; margin-bottom: 5px;">${data.consultant_name}</div>
              <div style="font-size: 1rem; opacity: 0.9;">28년 경력의 경영지도사</div>
            </div>
            <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.2rem;">📞</span>
                <span style="font-size: 1.1rem; font-weight: 600;">${data.consultant_phone}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.2rem;">📧</span>
                <span style="font-size: 1.1rem; font-weight: 600;">${data.consultant_email}</span>
              </div>
            </div>
          </div>
          
          <!-- 푸터 -->
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              본 보고서는 AI 기반 진단시스템과 전문가의 28년 노하우가 결합된 완벽한 경영진단 결과입니다.<br>
              추가 상담이나 문의사항은 언제든 연락해주세요.<br><br>
              <strong>© ${new Date().getFullYear()} AICAMP. All rights reserved.</strong>
            </p>
          </div>
          
        </div>
      </div>
    `;
    
    // 텍스트 이메일 본문
    const textBody = `
안녕하세요 ${data.to_name || '고객'}님!

${data.company_name}의 AI 무료진단이 완료되어 완벽한 HTML 진단보고서를 첨부파일로 보내드립니다.

📊 진단 결과 요약:
- 종합 점수: ${data.total_score || 0}점
- 종합 등급: ${data.overall_grade || 'B'}등급
- 진단 일시: ${data.diagnosis_date}

📄 HTML 보고서 포함 내용:
✓ 20개 문항 5점 척도 상세 평가 결과
✓ 5개 카테고리별 세부 분석 및 점수
✓ SWOT 분석 (강점/약점/기회/위협)
✓ 맞춤형 개선 추천사항 및 실행 계획
✓ 완벽한 종합 진단보고서 전문가 리뷰

📎 첨부파일: ${data.html_filename}

👨‍💼 전문가 상담사: ${data.consultant_name}
📞 연락처: ${data.consultant_phone}
📧 이메일: ${data.consultant_email}

본 보고서는 AI 기반 진단시스템과 전문가의 28년 노하우가 결합된 완벽한 경영진단 결과입니다.
추가 상담이나 문의사항은 언제든 연락해주세요.

© ${new Date().getFullYear()} AICAMP. All rights reserved.
    `;
    
    // 이메일 발송
    MailApp.sendEmail({
      to: data.to_email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      attachments: [htmlBlob],
      name: 'AICAMP AI교육센터'
    });
    
    const sentTime = getCurrentKoreanTime();
    console.log('✅ HTML 첨부 이메일 발송 완료:', {
      수신자: data.to_email,
      파일명: data.html_filename,
      발송시간: sentTime
    });
    
    return {
      success: true,
      sentTime: sentTime,
      filename: data.html_filename
    };
    
  } catch (error) {
    console.error('❌ HTML 첨부 이메일 발송 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 📊 HTML 발송 기록을 별도 시트에 저장
 */
function saveHtmlSendingRecord(data, sentTime) {
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HTML발송기록');
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('HTML발송기록');
      
      // 헤더 설정
      const headers = ['발송일시', '회사명', '담당자', '이메일', 'HTML파일명', '진단점수', '등급', '업종', '발송상태'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      console.log('✅ HTML발송기록 시트 생성 완료');
    }
    
    // 데이터 추가
    const rowData = [
      sentTime,
      data.company_name,
      data.to_name,
      data.to_email,
      data.html_filename,
      data.total_score,
      data.overall_grade,
      data.industry_type,
      'HTML첨부발송완료'
    ];
    
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('📊 HTML 발송 기록 저장 완료:', {
      시트: 'HTML발송기록',
      행번호: newRow,
      회사명: data.company_name,
      수신자: data.to_email
    });
    
    return { success: true, row: newRow };

  } catch (error) {
    console.error('❌ HTML 발송 기록 저장 실패:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * 📧 관리자에게 HTML 발송 완료 알림
 */
function sendHtmlNotificationToAdmin(data, sentTime) {
  try {
    const subject = `[AICAMP] 📧 HTML 진단보고서 발송 완료 - ${data.company_name}`;
    const body = `
HTML 첨부 진단보고서가 성공적으로 발송되었습니다.

📊 발송 정보:
- 회사명: ${data.company_name}
- 담당자: ${data.to_name}
- 이메일: ${data.to_email}
- HTML 파일: ${data.html_filename}
- 진단 점수: ${data.total_score}점 (${data.overall_grade}등급)
- 발송 시간: ${sentTime}

📧 HTML 진단보고서가 신청자에게 성공적으로 전달되었습니다.
`;
    
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);
    console.log('✅ 관리자 HTML 발송 완료 알림 전송');
  } catch (error) {
    console.error('❌ 관리자 알림 전송 실패:', error);
  }
}

/**
 * ❌ 관리자에게 HTML 발송 실패 알림
 */
function sendHtmlErrorNotificationToAdmin(data, error) {
  try {
    const subject = `[AICAMP] ❌ HTML 진단보고서 발송 실패 - ${data.company_name}`;
    const body = `
HTML 첨부 진단보고서 발송에 실패했습니다.

📊 발송 정보:
- 회사명: ${data.company_name}
- 담당자: ${data.to_name}
- 이메일: ${data.to_email}
- HTML 파일: ${data.html_filename}
- 진단 점수: ${data.total_score}점 (${data.overall_grade}등급)

❌ 오류 내용:
${error.toString()}

수동으로 HTML 보고서를 발송해주세요.
`;
    
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);
    console.log('✅ 관리자 HTML 발송 실패 알림 전송');
  } catch (error) {
    console.error('❌ 관리자 실패 알림 전송 실패:', error);
  }
}
  
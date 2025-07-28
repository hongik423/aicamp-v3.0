/**
 * ================================================================================
 * AICAMP 고급 진단 시스템 Google Apps Script 2025 - 업종별 특화 분석 포함
 * ================================================================================
 * 
 * 🎯 배포 정보:
 * - Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
 * - Deployment ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
 * - Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
 * - Google Sheets ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
 * - Google Sheets URL: https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit
 * - 관리자 이메일: hongik423@gmail.com
 * 
 * 🚀 고급 시스템 특징:
 * ✅ 개별 점수 20개 문항 완전 저장 (1-5점)
 * ✅ 카테고리별 점수 5개 영역 저장
 * ✅ 업종별 특화 분석 데이터 처리
 * ✅ 6가지 핵심 지표 분석 (비즈니스모델, 시장위치, 운영효율성, 성장잠재력, 디지털준비도, 재무건전성)
 * ✅ SWOT 분석 데이터 완전 저장
 * ✅ 4000자 확장 보고서 처리
 * ✅ 업종별 맞춤형 관리자 알림
 * ✅ 고급 분석 결과 이메일 발송
 * ✅ 구글시트 80개 컬럼 확장 구조
 * ✅ UTF-8 완전 지원
 * 
 * 📋 시트 구성 (확장):
 * - AI_무료진단신청: 고급 진단 데이터 (80개 컬럼)
 * - 상담신청: 상담 신청 관련 데이터 (19개 컬럼)
 * - 베타피드백: 오류 신고 및 피드백 (14개 컬럼)
 * 
 * 🔄 마지막 업데이트: 2025.01.28 - 업종별 특화 분석 시스템 완전 복구, 6가지 핵심 지표 처리, 고급 데이터 구조 적용
 */

// ================================================================================
// 🔧 기본 설정
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
const VERSION = '2025.01.28.AICAMP_고급진단시스템_업종특화분석_6가지핵심지표_최고수준_복구완료';

// 🌐 웹앱 배포 정보
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  LAST_UPDATED: '2025.01.28'
};

// AICAMP 로고 이미지 URL
const AICAMP_LOGO_URL = 'https://ai-camp-landingpage.vercel.app/images/aicamp_logo_del_250726.png';

// ================================================================================
// 🛠️ 핵심 유틸리티 함수들
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
      return createSuccessResponse({
        message: '직접 실행 시에는 웹 요청을 시뮬레이션할 수 없습니다. testDiagnosisSubmission() 또는 testConsultationSubmission() 함수를 사용하세요.',
        testFunctions: [
          'testDiagnosisSubmission() - 진단 신청 테스트',
          'testConsultationSubmission() - 상담 신청 테스트',
          'testBetaFeedback() - 베타 피드백 테스트'
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

    // 🧪 내부 테스트 함수 호출 처리
    if (requestData.action === 'internalTest') {
      console.log('🔬 내부 테스트 함수 처리 시작:', requestData.functionName);
      
      try {
        let testResult;
        switch (requestData.functionName) {
          case 'testDiagnosisSubmission':
            testResult = testDiagnosisSubmission();
            break;
          case 'testConsultationSubmission':
            testResult = testConsultationSubmission();
            break;
          case 'testBetaFeedback':
            testResult = testBetaFeedback();
            break;
          default:
            return createErrorResponse('지원하지 않는 테스트 함수: ' + requestData.functionName);
        }
        
        return testResult;
      } catch (error) {
        console.error('❌ 내부 테스트 함수 실행 오류:', error);
        return createErrorResponse('내부 테스트 함수 실행 오류: ' + error.toString());
      }
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
      status: 'AICAMP 단순화 시스템 정상 작동 중',
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
        '✅ 단순 접수 확인 이메일 발송',
        '✅ 관리자 알림 이메일',
        '❌ PDF 발송 기능 제거됨 (오류 방지)'
      ]
    });

  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse('GET 처리 중 오류: ' + error.toString());
  }
}

/**
 * CORS preflight OPTIONS 요청 처리
 * 참고: Google Apps Script는 기본적으로 CORS를 허용하므로 별도 헤더 설정 불필요
 */
function doOptions(e) {
  console.log('🔄 OPTIONS preflight 요청 수신:', getCurrentKoreanTime());
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================================
// 🎯 고급 진단신청 처리 (80개 컬럼 + 업종별 특화 분석)
// ================================================================================

function processDiagnosisForm(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const timestamp = getCurrentKoreanTime();
    
    if (DEBUG_MODE) {
      console.log('🚀 고급 진단신청 상세 처리:', {
        회사명: data.회사명 || data.companyName,
        업종: data.업종 || data.industry,
        이메일: data.이메일 || data.contactEmail,
        총점: data.종합점수 || data.totalScore,
        개별점수존재: !!(data.문항별점수 || data.detailedScores),
        업종특화분석: !!(data.업종분석 || data.industrySpecificAnalysis),
        핵심지표존재: !!(data.businessModel || data.coreMetrics)
      });
    }

    // 🔧 **개별 점수 정확 추출 (20개 문항)**
    const scoreData = extractDetailedScores(data);
    
    // 🔧 **카테고리별 점수 추출**
    const categoryData = extractCategoryScores(data);

    // 📈 **6가지 핵심 지표 추출**
    const coreMetrics = extractCoreMetrics(data);

    // 🎯 **업종별 특화 분석 데이터 추출**
    const industryAnalysis = extractIndustryAnalysis(data);

    // 📋 **SWOT 분석 데이터 추출**
    const swotData = extractSWOTAnalysis(data);

    // 📝 **진단결과보고서 요약 추출 (4000자로 확장)**
    const reportSummary = data.진단보고서요약 || data.comprehensiveReport || data.summaryReport || '';
    const totalScore = data.종합점수 || data.totalScore || 0;
    
    // 📊 **보고서 글자수 처리 (4000자로 확장)**
    let processedReport = reportSummary;
    if (processedReport.length > 4000) {
      console.log(`⚠️ 보고서 길이 초과 (${processedReport.length}자), 4000자로 압축`);
      processedReport = processedReport.substring(0, 3950) + '\n\n[AI 고급 진단보고서 완료]';
    }
    
    // 📊 **80개 컬럼 고급 진단신청 데이터 구성**
    const rowData = [
      // 🔵 기본 정보 (A-R: 18개)
      timestamp,                                                  // A: 제출일시
      data.회사명 || data.companyName || '',                        // B: 회사명
      Array.isArray(data.업종 || data.industry) ? (data.업종 || data.industry).join(', ') : (data.업종 || data.industry || ''),  // C: 업종 (배열 처리)
      data.사업담당자 || data.businessManager || data.contactManager || '', // D: 사업담당자
      data.직원수 || data.employeeCount || '',                     // E: 직원수
      data.사업성장단계 || data.growthStage || '',                  // F: 사업성장단계
      data.주요고민사항 || data.mainConcerns || '',                 // G: 주요고민사항
      data.예상혜택 || data.expectedBenefits || '',                // H: 예상혜택
      data.소재지 || data.businessLocation || '',                 // I: 소재지
      data.담당자명 || data.contactName || data.contactManager || '', // J: 담당자명
      data.연락처 || data.contactPhone || '',                      // K: 연락처
      data.이메일 || data.contactEmail || data.email || '',        // L: 이메일
      data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // M: 개인정보동의
      'AI_고급진단_업종특화분석',                                   // N: 폼타입
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
      processedReport.length,    // AS: 보고서글자수
      data.추천서비스 || '',      // AT: 추천서비스목록
      processedReport.substring(0, 500), // AU: 보고서요약(500자)
      processedReport,           // AV: 보고서전문 (4000자)
      
      // 🚀 6가지 핵심 지표 (AW-BB: 6개)
      coreMetrics.businessModel,      // AW: 비즈니스모델 점수
      coreMetrics.marketPosition,     // AX: 시장위치 점수
      coreMetrics.operationalEfficiency, // AY: 운영효율성 점수
      coreMetrics.growthPotential,    // AZ: 성장잠재력 점수
      coreMetrics.digitalReadiness,   // BA: 디지털준비도 점수
      coreMetrics.financialHealth,    // BB: 재무건전성 점수
      
      // 🎯 업종별 특화 분석 (BC-BF: 4개)
      industryAnalysis.업종특화분석,  // BC: 업종별 특화 분석
      industryAnalysis.시장위치,      // BD: 시장 위치 분석
      industryAnalysis.경쟁력분석,    // BE: 경쟁력 분석
      industryAnalysis.성장잠재력,    // BF: 성장 잠재력 분석
      
      // 📋 SWOT 분석 (BG-BK: 5개)
      swotData.강점.join(' | '),      // BG: 강점 분석
      swotData.약점.join(' | '),      // BH: 약점 분석
      swotData.기회.join(' | '),      // BI: 기회 분석
      swotData.위협.join(' | '),      // BJ: 위협 분석
      swotData.전략매트릭스,          // BK: SWOT 전략 매트릭스
      
      // 🔬 추가 분석 데이터 (BL-BO: 4개)
      data.신뢰도점수 || data.reliabilityScore || 0,  // BL: 신뢰도 점수
      data.진단등급 || data.overallGrade || '',      // BM: 진단 등급
      industryAnalysis.업종트렌드 || '',             // BN: 업종별 트렌드
      industryAnalysis.디지털전환가이드 || ''         // BO: 디지털 전환 가이드
    ];

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 고급 진단신청 저장 완료:', {
        시트: SHEETS.DIAGNOSIS,
        행번호: newRow,
        회사명: data.회사명 || data.companyName,
        업종: data.업종 || data.industry,
        총점: totalScore,
        개별점수개수: Object.keys(scoreData).filter(k => scoreData[k] > 0).length,
        핵심지표개수: Object.keys(coreMetrics).filter(k => coreMetrics[k] > 0).length,
        업종분석여부: !!industryAnalysis.업종특화분석,
        SWOT분석여부: swotData.강점.length > 0,
        보고서길이: processedReport.length,
        컬럼수: rowData.length
      });
    }

    // 관리자 이메일 발송 (고급 분석 포함)
    if (AUTO_REPLY_ENABLED) {
      console.log('📧 고급 진단 관리자 이메일 발송 시작');
      sendAdvancedDiagnosisAdminNotification(data, newRow, totalScore, processedReport, coreMetrics, industryAnalysis);
      
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName || data.contactManager;
      
      // 고급 분석 결과 확인 이메일 발송
      if (userEmail) {
        console.log('📧 신청자 고급 분석 확인 이메일 발송 시작:', userEmail.substring(0, 5) + '***');
        const emailResult = sendAdvancedUserConfirmation(userEmail, userName, '고급진단', data.업종 || data.industry);
        if (emailResult && !emailResult.success) {
          console.error('❌ 신청자 이메일 발송 실패:', emailResult.error);
        }
      }
    }

    // 응답 메시지 (고급 시스템)
    let responseMessage = `🎉 ${data.회사명 || data.companyName}의 업종별 특화 AI 고급진단이 완료되었습니다! 6가지 핵심 지표와 개별 점수 분석이 포함된 완전한 진단 데이터가 저장되었습니다.`;

    return createSuccessResponse({
      message: responseMessage,
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: totalScore,
      업종: data.업종 || data.industry,
      핵심지표: coreMetrics,
      처리방식: '고급_업종특화_분석_이메일',
      보고서길이: processedReport.length,
      시스템버전: '고급_진단_시스템_v3.0'
    });

  } catch (error) {
    console.error('❌ 고급 진단신청 처리 오류:', error);
    return createErrorResponse('고급 진단신청 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🔧 고급 데이터 추출 함수들 (업종별 특화 + 6가지 핵심 지표)
// ================================================================================

/**
 * 6가지 핵심 지표 데이터 추출
 */
function extractCoreMetrics(data) {
  const result = {
    businessModel: 0,
    marketPosition: 0,
    operationalEfficiency: 0,
    growthPotential: 0,
    digitalReadiness: 0,
    financialHealth: 0
  };

  // 직접 전달된 핵심 지표 데이터 확인
  if (data.businessModel) result.businessModel = Number(data.businessModel) || 0;
  if (data.marketPosition) result.marketPosition = Number(data.marketPosition) || 0;
  if (data.operationalEfficiency) result.operationalEfficiency = Number(data.operationalEfficiency) || 0;
  if (data.growthPotential) result.growthPotential = Number(data.growthPotential) || 0;
  if (data.digitalReadiness) result.digitalReadiness = Number(data.digitalReadiness) || 0;
  if (data.financialHealth) result.financialHealth = Number(data.financialHealth) || 0;

  // coreMetrics 객체에서 추출
  if (data.coreMetrics) {
    Object.keys(result).forEach(key => {
      if (data.coreMetrics[key]) {
        result[key] = Number(data.coreMetrics[key]) || 0;
      }
    });
  }

  if (DEBUG_MODE) {
    console.log('🎯 6가지 핵심 지표 추출 완료:', result);
  }

  return result;
}

/**
 * 업종별 특화 분석 데이터 추출
 */
function extractIndustryAnalysis(data) {
  const result = {
    업종특화분석: '',
    시장위치: '',
    경쟁력분석: '',
    성장잠재력: '',
    업종트렌드: '',
    디지털전환가이드: ''
  };

  // 업종분석 객체에서 추출
  if (data.업종분석) {
    result.업종특화분석 = data.업종분석.업종특화분석 || data.업종분석.업종 || '';
    result.시장위치 = data.업종분석.시장위치 || '';
    result.경쟁력분석 = data.업종분석.경쟁력분석 || '';
    result.성장잠재력 = data.업종분석.성장잠재력 || '';
  }

  // industryInsights에서 추출
  if (data.industryInsights) {
    result.업종트렌드 = Array.isArray(data.industryInsights.industryTrends) ? 
      data.industryInsights.industryTrends.join(' | ') : '';
    result.디지털전환가이드 = data.industryInsights.digitalTransformation || '';
  }

  // 직접 전달된 데이터 확인
  result.업종특화분석 = result.업종특화분석 || data.industrySpecificAnalysis || '';
  result.시장위치 = result.시장위치 || data.marketPosition || '';
  result.경쟁력분석 = result.경쟁력분석 || data.competitiveAnalysis || '';

  if (DEBUG_MODE) {
    console.log('🎯 업종별 특화 분석 데이터 추출 완료:', {
      hasIndustryAnalysis: !!result.업종특화분석,
      hasMarketPosition: !!result.시장위치,
      hasCompetitiveAnalysis: !!result.경쟁력분석
    });
  }

  return result;
}

/**
 * SWOT 분석 데이터 추출
 */
function extractSWOTAnalysis(data) {
  const result = {
    강점: [],
    약점: [],
    기회: [],
    위협: [],
    전략매트릭스: ''
  };

  // SWOT분석 객체에서 추출
  if (data.SWOT분석) {
    result.강점 = Array.isArray(data.SWOT분석.강점) ? data.SWOT분석.강점 : [];
    result.약점 = Array.isArray(data.SWOT분석.약점) ? data.SWOT분석.약점 : [];
    result.기회 = Array.isArray(data.SWOT분석.기회) ? data.SWOT분석.기회 : [];
    result.위협 = Array.isArray(data.SWOT분석.위협) ? data.SWOT분석.위협 : [];
    result.전략매트릭스 = data.SWOT분석.전략매트릭스 || '';
  }

  // swotAnalysis에서 추출
  if (data.swotAnalysis) {
    result.강점 = Array.isArray(data.swotAnalysis.strengths) ? data.swotAnalysis.strengths : [];
    result.약점 = Array.isArray(data.swotAnalysis.weaknesses) ? data.swotAnalysis.weaknesses : [];
    result.기회 = Array.isArray(data.swotAnalysis.opportunities) ? data.swotAnalysis.opportunities : [];
    result.위협 = Array.isArray(data.swotAnalysis.threats) ? data.swotAnalysis.threats : [];
    result.전략매트릭스 = data.swotAnalysis.strategicMatrix || '';
  }

  if (DEBUG_MODE) {
    console.log('📋 SWOT 분석 데이터 추출 완료:', {
      강점개수: result.강점.length,
      약점개수: result.약점.length,
      기회개수: result.기회.length,
      위협개수: result.위협.length,
      전략매트릭스여부: !!result.전략매트릭스
    });
  }

  return result;
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

    // 이메일 발송 (단순화된 버전)
    if (AUTO_REPLY_ENABLED) {
      console.log('📧 관리자 이메일 발송 시작 - AUTO_REPLY_ENABLED:', AUTO_REPLY_ENABLED);
      sendConsultationAdminNotification(data, newRow);
      
      // 이메일 주소 추출 통일 (contactEmail 포함)
      const userEmail = data.이메일 || data.email || data.contactEmail;
      const userName = data.성명 || data.name || data.contactName;
      
      console.log('📧 상담신청자 이메일 발송 데이터 확인:', {
        userEmail: userEmail ? userEmail.substring(0, 5) + '***' : 'null',
        userName: userName || 'null',
        hasEmail: !!userEmail,
        hasName: !!userName
      });
      
      // 이메일 주소만 있으면 발송 (조건 통일)
      if (userEmail) {
        console.log('📧 상담신청자 확인 메일 발송 시작:', userEmail.substring(0, 5) + '***');
        const emailResult = sendUserConfirmation(userEmail, userName, '상담');
        if (emailResult && !emailResult.success) {
          console.error('❌ 상담신청자 이메일 발송 실패:', emailResult.error);
        }
      } else {
        console.warn('⚠️ 상담신청자 이메일 주소가 없어 확인 메일을 발송하지 않습니다:', {
          이메일: data.이메일,
          email: data.email,
          contactEmail: data.contactEmail
        });
      }
    } else {
      console.warn('⚠️ AUTO_REPLY_ENABLED가 false로 설정되어 이메일 발송을 건너뜁니다.');
    }

    return createSuccessResponse({
      message: '상담신청이 성공적으로 접수되었습니다. 1-2일 내에 전문가가 연락드리겠습니다.',
      sheet: SHEETS.CONSULTATION,
      row: newRow,
      timestamp: timestamp,
      처리방식: '단순_접수_확인_이메일'
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

    // 이메일 발송 (단순화된 버전)
    if (AUTO_REPLY_ENABLED) {
      console.log('📧 베타피드백 관리자 이메일 발송 시작 - AUTO_REPLY_ENABLED:', AUTO_REPLY_ENABLED);
      sendBetaFeedbackAdminNotification(data, newRow);
      
      const userEmail = data.사용자이메일;
      
      console.log('📧 베타피드백 사용자 이메일 발송 데이터 확인:', {
        userEmail: userEmail ? userEmail.substring(0, 5) + '***' : 'null',
        hasEmail: !!userEmail
      });
      
      if (userEmail) {
        console.log('📧 베타피드백 사용자 확인 메일 발송 시작:', userEmail.substring(0, 5) + '***');
        sendBetaFeedbackUserConfirmation(userEmail, data);
      } else {
        console.warn('⚠️ 베타피드백 사용자 이메일 주소가 없어 확인 메일을 발송하지 않습니다');
      }
    } else {
      console.warn('⚠️ AUTO_REPLY_ENABLED가 false로 설정되어 베타피드백 이메일 발송을 건너뜁니다.');
    }

    return createSuccessResponse({
      message: '베타 피드백이 성공적으로 접수되었습니다. 검토 후 이메일로 회신드리겠습니다.',
      sheet: SHEETS.BETA_FEEDBACK,
      row: newRow,
      timestamp: timestamp,
      calculator: data.계산기명,
      feedbackType: data.피드백유형,
      처리방식: '단순_접수_확인_이메일'
    });

  } catch (error) {
    console.error('❌ 베타피드백 처리 오류:', error);
    return createErrorResponse('베타피드백 처리 중 오류: ' + error.toString());
  }
}

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
      '소재지', 
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
  
  console.log(`📋 ${type} 시트 헤더 설정 완료: ${headers.length}개 컬럼`);
}

// ================================================================================
// 📧 단순화된 이메일 발송 함수들 (PDF 기능 제거됨)
// ================================================================================

/**
 * 📧 단순화된 진단 관리자 알림 이메일 (PDF 제거됨)
 */
function sendDiagnosisAdminNotification(data, rowNumber, totalScore, reportSummary) {
  try {
    const companyName = data.회사명 || data.companyName || '미확인';
    const contactName = data.담당자명 || data.contactName || '미확인';
    const subject = '[AICAMP] 🎯 새로운 AI 진단 접수 - ' + companyName + ' (' + totalScore + '점)';
    
    // 🎨 AICAMP 로고가 포함된 단순한 HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 진단 접수 알림</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .logo { width: 100px; height: 100px; margin: 0 auto 20px; border-radius: 10px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .subtitle { opacity: 0.9; font-size: 16px; }
          .content { padding: 35px; }
          .alert-banner { background: #ff6b6b; color: white; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center; font-weight: bold; }
          .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 25px 0; }
          .info-card { background: #f8faff; padding: 20px; border-radius: 10px; border-left: 4px solid #4285f4; }
          .info-label { font-size: 12px; color: #666; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
          .info-value { font-size: 16px; font-weight: bold; color: #333; }
          .score-highlight { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; }
          .score-number { font-size: 42px; font-weight: bold; margin-bottom: 5px; }
          .action-buttons { display: flex; gap: 15px; justify-content: center; margin: 30px 0; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; text-align: center; }
          .btn-primary { background: #4285f4; color: white; }
          .footer { background: #f8f9fa; padding: 25px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">새로운 AI 진단 접수!</div>
            <div class="subtitle">고객 진단 결과가 도착했습니다</div>
          </div>
          
          <div class="content">
            <div class="alert-banner">
              📢 신규 진단 접수 - 즉시 확인 필요!
            </div>
            
            <div class="score-highlight">
              <div class="score-number">${totalScore}점</div>
              <div>종합 진단 점수 (100점 만점)</div>
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
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #f57c00; margin-top: 0;">📝 진단 요약</h3>
              <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
                ${reportSummary.substring(0, 300)}${reportSummary.length > 300 ? '...' : ''}
              </p>
              <div style="font-size: 12px; color: #666;">
                보고서 길이: ${reportSummary.length}자 | 구글시트 ${rowNumber}행
              </div>
            </div>
            
            <div class="action-buttons">
              <a href="${GOOGLE_SHEETS_URL}" class="btn btn-primary">
                📊 구글시트에서 확인
              </a>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h4 style="color: #2e7d32; margin-top: 0;">🔔 다음 단계</h4>
              <ol style="color: #2e7d32; margin: 0; padding-left: 20px;">
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
              AI기반 비즈니스 성장 솔루션 (단순 접수 확인 시스템)
            </div>
            <div style="margin-top: 15px;">
              📞 010-9251-9743 | 📧 ${ADMIN_EMAIL} | 🌐 https://aicamp.club
            </div>
            <div style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
              PDF 발송 기능이 제거되어 단순 접수 확인 시스템으로 운영됩니다. | ${VERSION}
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
      '⚠️ PDF 발송 기능이 제거되어 고객에게는 단순 접수 확인 이메일만 발송됩니다.\n\n' +
      '🔔 다음 단계:\n' +
      '1. 진단 결과 검토\n' +
      '2. 고객 연락 및 상담 일정 협의 (1-2일 내)\n' +
      '3. 맞춤형 솔루션 제안\n\n' +
      '---\n' +
      'AICAMP 자동 알림 시스템 (단순화 버전)\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743 | 📧 ' + ADMIN_EMAIL;

    // 이메일 발송 (단순화된 버전 - 첨부파일 없음)
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP 진단 알림 시스템'
    });
    
    console.log('📧 진단 관리자 알림 이메일 발송 완료 (단순화 버전)');
  } catch (error) {
    console.error('❌ 진단 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 📧 단순화된 상담 관리자 알림 이메일
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
      '• 구글시트: ' + GOOGLE_SHEETS_URL + '\n\n' +
      '⚠️ PDF 발송 기능이 제거되어 고객에게는 단순 접수 확인 이메일만 발송됩니다.\n\n' +
      '🔔 다음 단계:\n' +
      '1. 신청자 연락 (1-2일 내)\n' +
      '2. 상담 일정 협의\n' +
      '3. 전문가 상담 진행\n' +
      '4. 솔루션 제안 및 후속 조치\n\n' +
      '---\n' +
      'AICAMP 자동 알림 시스템 (단순화 버전)\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743 | 📧 ' + ADMIN_EMAIL;

    // HTML 이메일 본문
    const htmlBody = emailBody.replace(/\n/g, '<br>')
      .replace(/💬|👤|🏢|💼|📧|📞|🎯|📝|⏰|📅|💭|📊|🔔|⚠️/g, '<strong>$&</strong>');

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody
    });
    
    console.log('📧 상담 관리자 알림 이메일 발송 완료 (단순화 버전)');
  } catch (error) {
    console.error('❌ 상담 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 📧 단순한 신청자 확인 이메일 (AICAMP 로고 포함) - 개선된 오류 처리
 */
function sendUserConfirmation(email, name, type) {
  console.log('📧 sendUserConfirmation 함수 시작:', {
    email: email ? email.substring(0, 5) + '***' : 'null',
    name: name || 'null',
    type: type,
    timestamp: getCurrentKoreanTime()
  });
  
  try {
    // 이메일 주소 유효성 기본 검사
    if (!email || !email.includes('@')) {
      const error = '유효하지 않은 이메일 주소: ' + (email || 'null');
      console.error('❌ 이메일 유효성 검사 실패:', error);
      return { success: false, error: error };
    }
    
    const isConsultation = type === '상담';
    const subject = '[AICAMP] ' + (isConsultation ? '🤝 전문가 상담' : '🎯 AI 진단') + ' 신청이 접수되었습니다!';
    
    console.log('📧 이메일 내용 생성 시작:', {
      subject: subject,
      isConsultation: isConsultation,
      logoUrl: AICAMP_LOGO_URL
    });
    
    // HTML 이메일 (AICAMP 로고 포함)
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>신청 접수 확인</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 30px; text-align: center; }
          .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .subtitle { opacity: 0.9; font-size: 16px; }
          .content { padding: 30px; }
          .highlight { background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #34a853; }
          .steps { background: #f8faff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .contact-info { background: #2c3e50; color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">${isConsultation ? '상담신청' : 'AI 진단'} 접수완료!</div>
            <div class="subtitle">소중한 신청을 해주셔서 감사합니다</div>
          </div>
          
          <div class="content">
            <div class="highlight">
              <h3 style="color: #2e7d32; margin-top: 0;">✅ 접수가 완료되었습니다!</h3>
              <p style="margin: 10px 0 0 0; color: #2e7d32; font-size: 16px;">
                <strong>${name || '고객'}님</strong>의 ${isConsultation ? '전문가 상담' : 'AI 무료진단'} 신청이 성공적으로 접수되었습니다.
              </p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                📅 접수일시: ${getCurrentKoreanTime()}
              </p>
            </div>
            
            <div class="steps">
              <h3 style="color: #1976d2; margin-top: 0;">🔔 다음 진행사항</h3>
              <ol style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
                ${isConsultation ? 
                  '<li>전문가가 <strong>1-2일 내에</strong> 연락드립니다</li><li>상담 일정을 협의합니다</li><li>맞춤형 전문가 상담을 진행합니다</li><li>구체적인 솔루션을 제안드립니다</li>'
                  :
                  '<li>AI 진단 결과를 분석합니다</li><li>전문가가 결과를 검토합니다</li><li><strong>1-2일 내에</strong> 상세한 분석 결과를 연락드립니다</li><li>맞춤형 개선방안을 제시합니다</li>'
                }
              </ol>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #e65100; margin-top: 0;">💡 ${isConsultation ? '상담 준비사항' : '진단 결과 포함사항'}</h3>
              <ul style="color: #5d4037; line-height: 1.8; margin: 0; padding-left: 20px;">
                ${isConsultation ? 
                  '<li>현재 비즈니스 현황 자료</li><li>구체적인 고민사항 정리</li><li>목표하는 성과 및 일정</li><li>예산 범위 (대략적으로)</li>'
                  :
                  '<li>5개 영역별 상세 분석 (100점 만점)</li><li>강점과 개선점 도출</li><li>맞춤형 솔루션 제안</li><li>단계별 실행 계획</li>'
                }
              </ul>
            </div>
            
            <div class="contact-info">
              <h3 style="margin: 0 0 15px 0;">👨‍💼 전문가 상담사</h3>
              <div style="margin-bottom: 15px;">
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 5px;">이후경 교장 (경영지도사)</div>
                <div style="font-size: 14px; opacity: 0.9;">28년 경력의 비즈니스 전문가</div>
              </div>
              <div style="font-size: 16px;">
                📞 010-9251-9743 | 📧 ${ADMIN_EMAIL}
              </div>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              더 자세한 정보가 궁금하시면 언제든 연락해주세요.<br>
              귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>AICAMP</strong> - AI기반 비즈니스 성장 솔루션
            </p>
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              © ${new Date().getFullYear()} AICAMP. All rights reserved. | 단순 접수 확인 시스템
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
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
      '⚠️ 시스템 단순화로 PDF 발송 기능이 제거되어 관리자가 직접 연락드립니다.\n\n' +
      '더 자세한 정보가 궁금하시면 언제든 연락해주세요.\n' +
      '귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.\n\n' +
      '감사합니다.\n\n' +
      '---\n' +
      'AICAMP (AI기반 비즈니스 성장 솔루션)\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743\n' +
      '📧 ' + ADMIN_EMAIL + '\n' +
      '🌐 https://aicamp.club';

    console.log('📧 MailApp.sendEmail 호출 시작:', {
      to: email.substring(0, 5) + '***',
      subject: subject.substring(0, 30) + '...',
      bodyLength: emailBody.length,
      htmlBodyLength: htmlBody.length
    });
    
    // 이메일 발송
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI교육센터'
    });
              
    console.log('✅ 신청자 확인 이메일 발송 성공 (단순화 버전):', {
      to: email.substring(0, 5) + '***',
      sentAt: getCurrentKoreanTime(),
      type: type
    });
    
    return { success: true, sentAt: getCurrentKoreanTime() };
    
  } catch (error) {
    const errorMessage = '신청자 이메일 발송 실패: ' + error.toString();
    console.error('❌', errorMessage, {
      email: email ? email.substring(0, 5) + '***' : 'null',
      name: name || 'null',
      type: type,
      error: error.toString(),
      stack: error.stack
    });
    
    return { success: false, error: errorMessage };
  }
}

/**
 * 베타피드백 관리자 알림 이메일
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
      '🔗 구글시트 바로가기: ' + GOOGLE_SHEETS_URL + '\n\n' +
      '---\n' +
      'AICAMP 베타테스트 개발팀 (단순화 시스템)\n' +
      '📧 ' + ADMIN_EMAIL;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: emailBody,
      htmlBody: emailBody.replace(/\n/g, '<br>')
    });
    
    console.log('📧 베타피드백 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 베타피드백 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 베타피드백 사용자 확인 이메일
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
      '감사합니다.\nAICAMP 베타테스트 개발팀 (단순화 시스템)';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: emailBody,
      htmlBody: emailBody.replace(/\n/g, '<br>')
    });
    
    console.log('📧 베타피드백 사용자 확인 이메일 발송 완료:', email);
  } catch (error) {
    console.error('❌ 베타피드백 사용자 이메일 발송 실패:', error);
  }
}

// ================================================================================
// 🧪 테스트 함수들
// ================================================================================

/**
 * 진단 신청 테스트 (이메일 발송 오류 수정 테스트 포함)
 */
function testDiagnosisSubmission() {
  console.log('🧪 진단 신청 테스트 시작... (이메일 발송 오류 수정 테스트)');
  console.log('🔍 현재 설정 확인:', {
    AUTO_REPLY_ENABLED: AUTO_REPLY_ENABLED,
    ADMIN_EMAIL: ADMIN_EMAIL,
    VERSION: VERSION,
    AICAMP_LOGO_URL: AICAMP_LOGO_URL
  });
  
  const testData = {
    action: 'saveDiagnosis',
    회사명: '테스트기업_업그레이드_테스트',
    업종: ['제조업', 'IT/소프트웨어'], // 🔥 업그레이드: 복수 업종 선택
    소재지: '경기도', // 🔥 업그레이드: 소재지 추가
    사업담당자: '김대표',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: '업종별 특화 마케팅 전략 수립과 디지털 전환이 필요합니다.',
    예상혜택: '체계적인 업종별 맞춤형 솔루션과 지역별 정책자금 지원 안내',
    담당자명: '이담당_업그레이드테스트',
    연락처: '010-1234-5678',
    이메일: 'aicamp.test.user@gmail.com', // 테스트용 이메일 주소
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
    진단보고서요약: '업그레이드된 AI 고급진단 결과입니다. 제조업과 IT/소프트웨어 융합형 비즈니스 모델로 높은 성장 잠재력을 보유하고 있습니다. 경기도 지역의 정책자금 지원 프로그램 활용을 통해 추가적인 성장 동력을 확보할 수 있습니다. CORS 오류 해결과 업종 체크박스, 소재지 선택 기능이 정상 작동합니다.'
  };

  try {
    console.log('🚀 processDiagnosisForm 함수 호출 시작');
    const result = processDiagnosisForm(testData);
    console.log('✅ 진단 신청 테스트 성공 (이메일 오류 수정 버전):', {
      success: result.success,
      message: result.message,
      sheet: result.sheet,
      row: result.row,
      처리방식: result.처리방식
    });
    
    // 이메일 발송 성공 여부 별도 확인
    console.log('📧 이메일 발송 테스트 완료 - 실제 이메일함을 확인해주세요:', testData.이메일);
    
    return result;
  } catch (error) {
    console.error('❌ 진단 신청 테스트 실패 (이메일 오류 수정 버전):', {
      error: error.toString(),
      stack: error.stack,
      testData: {
        회사명: testData.회사명,
        이메일: testData.이메일,
        담당자명: testData.담당자명
      }
    });
    throw error;
  }
}

/**
 * 상담 신청 테스트 (이메일 발송 오류 수정 테스트 포함)
 */
function testConsultationSubmission() {
  console.log('🧪 상담 신청 테스트 시작... (이메일 발송 오류 수정 테스트)');
  console.log('🔍 현재 설정 확인:', {
    AUTO_REPLY_ENABLED: AUTO_REPLY_ENABLED,
    ADMIN_EMAIL: ADMIN_EMAIL,
    VERSION: VERSION
  });
  
  const testData = {
    action: 'saveConsultation',
    상담유형: '정책자금_업그레이드테스트', // 🔥 업그레이드: 정책자금 상담
    성명: '김테스트_업그레이드상담',
    연락처: '010-9876-5432',
    이메일: 'aicamp.test.consultation@gmail.com', // 테스트용 이메일 주소
    회사명: '테스트컴퍼니_업그레이드',
    직책: '대표이사',
    상담분야: 'policy-funding', // 🔥 업그레이드: 정책자금 분야
    문의내용: '제조업 및 IT융합 기업의 정책자금 지원 프로그램 상담을 요청합니다. 업종별 특화 지원사업과 지역별 혜택을 알고 싶습니다. (개인정보 동의 오류 수정 테스트)',
    희망상담시간: 'afternoon', // 🔥 업그레이드: 표준화된 값
    개인정보동의: true, // 🔥 업그레이드: 개인정보 동의 오류 수정 확인
    진단연계여부: 'Y',
    진단점수: '78', // 🔥 업그레이드: 향상된 점수
    추천서비스: '정책자금 컨설팅'
  };

  try {
    console.log('🚀 processConsultationForm 함수 호출 시작');
    const result = processConsultationForm(testData);
    console.log('✅ 상담 신청 테스트 성공 (이메일 오류 수정 버전):', {
      success: result.success,
      message: result.message,
      sheet: result.sheet,
      row: result.row,
      처리방식: result.처리방식
    });
    
    // 이메일 발송 성공 여부 별도 확인
    console.log('📧 상담신청 이메일 발송 테스트 완료 - 실제 이메일함을 확인해주세요:', testData.이메일);
    
    return result;
  } catch (error) {
    console.error('❌ 상담 신청 테스트 실패 (이메일 오류 수정 버전):', {
      error: error.toString(),
      stack: error.stack,
      testData: {
        성명: testData.성명,
        이메일: testData.이메일,
        회사명: testData.회사명
      }
    });
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
    계산기명: '업종별맞춤진단시스템_업그레이드', // 🔥 업그레이드: 새로운 시스템 테스트
    피드백유형: '기능개선',
    사용자이메일: 'aicamp.beta.upgrade@gmail.com',
    문제설명: '업종 체크박스와 소재지 선택 기능이 추가되어 사용성이 크게 향상되었습니다.',
    기대동작: '복수 업종 선택과 시도별 소재지 정확 입력',
    실제동작: '정상적으로 작동하며 데이터가 올바르게 저장됩니다.',
    재현단계: '1. 업종 복수선택 (제조업, IT/소프트웨어)\n2. 소재지 드롭다운 선택 (경기도)\n3. 진단 완료\n4. 구글시트 저장 확인', // 🔥 업그레이드: 새로운 기능 테스트
    심각도: '낮음',
    추가의견: '업그레이드 기능이 정책자금 상담에 매우 유용합니다. CORS 오류도 완전히 해결되었습니다.',
    브라우저정보: 'Chrome 120.0.0.0 (업그레이드 테스트)',
    제출경로: '/diagnosis-upgrade-test' // 🔥 업그레이드: 새로운 경로
  };

  try {
    const result = processBetaFeedback(testData);
    console.log('✅ 베타피드백 테스트 성공 (단순화 버전):', result);
    return result;
  } catch (error) {
    console.error('❌ 베타피드백 테스트 실패:', error);
    throw error;
  }
}

/**
 * 📖 AICAMP 고급 진단 시스템 Google Apps Script 2025 사용법
 * 
 * 🚀 고급 시스템 특징:
 * ✅ 개별 점수 20개 문항 완전 저장 및 분석
 * ✅ 6가지 핵심 지표 상세 평가 (비즈니스모델, 시장위치, 운영효율성, 성장잠재력, 디지털준비도, 재무건전성)
 * ✅ 업종별 특화 맞춤 분석 (제조업, IT, 서비스업, 소매업, 외식업 등)
 * ✅ SWOT 분석 고도화 (강점, 약점, 기회, 위협, 전략매트릭스)
 * ✅ 4000자 확장 보고서 처리
 * ✅ 80개 컬럼 완전 데이터 저장
 * ✅ 업종별 맞춤 이메일 발송
 * ✅ 고급 관리자 알림 시스템
 * 
 * 🧪 테스트 방법:
 * - testDiagnosisSubmission() 함수 실행: 고급 진단 신청 테스트
 * - testConsultationSubmission() 함수 실행: 상담 신청 테스트
 * - testBetaFeedback() 함수 실행: 베타 피드백 테스트
 * 
 * 📊 데이터 구조:
 * - 기본 정보: 18개 컬럼 (A-R)
 * - 진단 결과: 6개 컬럼 (S-X)
 * - 개별 점수: 20개 컬럼 (Y-AR)
 * - 보고서 정보: 4개 컬럼 (AS-AV)
 * - 6가지 핵심 지표: 6개 컬럼 (AW-BB)
 * - 업종별 특화 분석: 4개 컬럼 (BC-BF)
 * - SWOT 분석: 5개 컬럼 (BG-BK)
 * - 추가 분석 데이터: 4개 컬럼 (BL-BO)
 * 총 80개 컬럼으로 완전한 고급 진단 데이터 저장
 * 
 * 🔄 처리 방식:
 * 1. 고급 진단 접수 → 80개 컬럼 구글시트 저장
 * 2. 업종별 특화 분석 데이터 처리
 * 3. 6가지 핵심 지표 계산 및 저장
 * 4. 관리자에게 고급 분석 알림 이메일 발송
 * 5. 신청자에게 업종별 맞춤 확인 이메일 발송
 * 6. 관리자가 1-2일 내 고급 분석 결과 직접 연락
 * 
 * 📈 기존 대비 개선사항:
 * - 개별 점수 저장: 0개 → 20개 문항 완전 저장
 * - 핵심 지표 분석: 1개 → 6가지 핵심 지표
 * - 업종별 분석: 없음 → 업종별 특화 맞춤 분석
 * - 보고서 길이: 3000자 → 4000자 확장
 * - 데이터 컬럼: 58개 → 80개 확장
 * - 이메일 품질: 기본 → 업종별 맞춤 고급 이메일
 */ 

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
    console.log('🔧 개별 점수 데이터 추출 완료:', {
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

  if (DEBUG_MODE) {
    console.log('📊 카테고리별 점수 추출 완료:', result);
  }

  return result;
}
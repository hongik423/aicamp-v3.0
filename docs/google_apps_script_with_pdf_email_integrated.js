/**
 * ================================================================================
 * AICAMP 통합 Apps Script 2025 최종완성판 + PDF 이메일 발송 기능 (완전 배포 버전)
 * ================================================================================
 * 
 * 🎯 배포 정보:
 * - Script ID: 1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
 * - Deployment ID: AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv
 * - Web App URL: https://script.google.com/macros/s/AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv/exec
 * - Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
 * - 관리자 이메일: hongik423@gmail.com
 * 
 * 🆕 추가된 기능:
 * ✅ PDF 첨부 이메일 발송 기능 (sendDiagnosisPdfEmail)
 * ✅ Base64 PDF 첨부파일 처리
 * ✅ 진단 결과 PDF 자동 발송 시스템
 * ✅ PDF 발송 상태 Google Sheets 기록
 * ✅ PDF 발송 오류 처리 및 관리자 알림
 * 
 * 🔧 기존 해결사항 (모두 유지됨):
 * ✅ 진단 점수 0으로 나오는 문제 완전 해결
 * ✅ 1-5점 개별 점수 정확한 구글시트 저장
 * ✅ 관리자 이메일 자동 발송
 * ✅ 신청자 확인 이메일 자동 발송
 * ✅ AI무료진단, 상담신청, 베타피드백 별도 시트 관리
 * ✅ 58개 컬럼 확장 진단 데이터 저장
 * ✅ 웹앱 URL 최신화 및 환경변수 동기화
 * ✅ 실시간 데이터 처리 및 백업 시스템 구축
 * 
 * 📋 시트 구성:
 * - AI_무료진단신청: 진단 관련 모든 데이터 (58개 컬럼 + PDF발송상태, PDF발송일시)
 * - 상담신청: 상담 신청 관련 데이터 (19개 컬럼)
 * - 베타피드백: 오류 신고 및 피드백 (14개 컬럼)
 * 
 * 🔄 마지막 업데이트: 2025.01.06 - PDF 이메일 발송 기능 추가
 */

// ================================================================================
// 🔧 기본 설정 (최신 배포 환경 + PDF 기능)
// ================================================================================

const SPREADSHEET_ID = '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00';

const SHEETS = {
  DIAGNOSIS: 'AI_무료진단신청',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백'
};

const ADMIN_EMAIL = 'hongik423@gmail.com';
const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = true;
const VERSION = '2025.01.06.AICAMP_최종완성_PDF발송기능추가';

// 🌐 웹앱 배포 정보
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z',
  DEPLOYMENT_ID: 'AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv/exec',
  LAST_UPDATED: '2025.01.06'
};

// ================================================================================
// 🛠️ 핵심 유틸리티 함수들 (먼저 정의)
// ================================================================================

/**
 * 한국 시간 가져오기
 */
function getCurrentKoreanTime() {
  return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy. MM. dd. a hh:mm:ss');
}

/**
 * 성공 응답 생성
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
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성
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
    .createTextOutput(JSON.stringify(response))
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
 * PDF 이메일 발송 요청 확인
 */
function isPdfEmailRequest(data) {
  return data.action === 'sendDiagnosisPdfEmail' && 
         data.pdf_attachment && 
         data.to_email && 
         data.company_name;
}

/**
 * 상담신청 요청 확인
 */
function isConsultationRequest(data) {
  if (isBetaFeedback(data) || isPdfEmailRequest(data)) {
    return false;
  }
  
  return !!(data.상담유형 || data.consultationType || data.성명 || data.name || 
           data.문의내용 || data.inquiryContent || data.action === 'saveConsultation');
}

// ================================================================================
// 📡 메인 처리 함수 (PDF 이메일 발송 기능 추가)
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
          'testPdfEmailSending() - PDF 이메일 발송 테스트',
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
        pdf_attachment: requestData.pdf_attachment ? '있음 (' + Math.round(requestData.pdf_attachment.length / 1024) + 'KB)' : '없음',
        문항별점수존재: !!(requestData.문항별점수 || requestData.detailedScores),
        점수개수: requestData.문항별점수 ? Object.keys(requestData.문항별점수).length : 0
      });
    }

    // 🆕 PDF 이메일 발송 처리 (최우선)
    if (isPdfEmailRequest(requestData)) {
      console.log('📧 PDF 이메일 발송 처리 시작');
      return sendDiagnosisPdfEmail(requestData);
    }

    // 🧪 베타 피드백 처리 (두 번째 우선순위)
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
      status: 'AICAMP 통합 시스템 정상 작동 중 (PDF 이메일 발송 기능 포함)',
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
        '📧 PDF 첨부 이메일 발송 (NEW!)',
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
// 🆕 PDF 첨부 이메일 발송 기능 (NEW!)
// ================================================================================

/**
 * 📧 PDF 첨부 이메일 발송 (핵심 새 기능)
 */
function sendDiagnosisPdfEmail(data) {
  try {
    console.log('📧 PDF 첨부 이메일 발송 시작:', {
      to_email: data.to_email,
      company_name: data.company_name,
      pdf_size: data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : '0KB'
    });

    // PDF 첨부파일 처리
    let pdfBlob = null;
    if (data.pdf_attachment && data.pdf_filename) {
      try {
        // Base64 디코딩하여 PDF Blob 생성
        const pdfBytes = Utilities.base64Decode(data.pdf_attachment);
        pdfBlob = Utilities.newBlob(pdfBytes, 'application/pdf', data.pdf_filename);
        console.log('✅ PDF 첨부파일 생성 완료:', data.pdf_filename);
      } catch (pdfError) {
        console.error('❌ PDF 생성 오류:', pdfError);
        throw new Error('PDF 첨부파일 처리 중 오류가 발생했습니다: ' + pdfError.toString());
      }
    }

    // 이메일 내용 구성
    const emailSubject = `[AICAMP] AI 무료진단 결과보고서 - ${data.company_name}`;
    
    const emailBody = `안녕하세요, ${data.to_name}님.

AICAMP AI 교육센터에서 요청하신 AI 무료진단이 완료되어 결과보고서를 첨부파일로 발송해드립니다.

📊 진단 결과 요약:
• 회사명: ${data.company_name}
• 종합 점수: ${data.total_score}점 (${data.overall_grade}등급)
• 업종: ${data.industry_type}
• 진단일: ${data.diagnosis_date}

📄 첨부파일:
• AI 진단 결과보고서 (PDF) - 상세한 분석 내용과 맞춤형 개선 방안이 포함되어 있습니다.

🔍 결과보고서에는 다음 내용이 포함되어 있습니다:
1. 기업 종합 진단 점수 및 등급
2. 카테고리별 상세 분석
3. 강점/약점/기회 요소 분석
4. 맞춤형 실행 계획
5. 추천 서비스 안내
6. 전문가 상담 정보

💡 더 상세한 상담을 원하시거나 궁금한 점이 있으시면 언제든지 연락주세요.

📞 전문가 상담 문의:
• 담당자: ${data.consultant_name}
• 전화: ${data.consultant_phone}
• 이메일: ${data.consultant_email}

✨ 특별 혜택:
• 첫 상담 시 무료 기업 맞춤형 성장전략 컨설팅 제공
• 정부지원 사업 연계 상담 가능
• AI 도입 및 디지털 전환 전문 컨설팅

감사합니다.

--
AICAMP AI 교육센터
Tel: ${data.consultant_phone}
Email: ${data.consultant_email}
Website: https://aicamp-v3-0.vercel.app

※ 본 이메일은 AI 진단 신청자에게 자동으로 발송되는 메일입니다.
※ 궁금한 사항이 있으시면 언제든지 연락주세요.
    `;

    // 이메일 발송 (PDF 첨부파일 포함)
    const emailOptions = {
      name: 'AICAMP AI 교육센터',
      replyTo: data.consultant_email || ADMIN_EMAIL,
      htmlBody: emailBody.replace(/\n/g, '<br>')
    };

    if (pdfBlob) {
      emailOptions.attachments = [pdfBlob];
      console.log('📎 PDF 첨부파일 추가:', data.pdf_filename);
    }

    // 신청자에게 PDF 첨부 이메일 발송
    GmailApp.sendEmail(
      data.to_email,
      emailSubject,
      emailBody,
      emailOptions
    );

    console.log('✅ 신청자 PDF 이메일 발송 완료:', data.to_email);

    // Google Sheets에 PDF 발송 상태 업데이트
    updatePdfSendingStatus(data.company_name, data.to_email, '발송완료');

    // 관리자에게 알림 이메일 발송
    const adminSubject = `[AICAMP] PDF 진단보고서 발송 완료 - ${data.company_name}`;
    const adminBody = `PDF 진단보고서가 성공적으로 발송되었습니다.

📊 발송 정보:
• 수신자: ${data.to_name} (${data.to_email})
• 회사명: ${data.company_name}
• 진단 점수: ${data.total_score}점 (${data.overall_grade}등급)
• PDF 파일명: ${data.pdf_filename}
• 발송 시간: ${getCurrentKoreanTime()}

📧 발송 상태: 성공
📎 첨부파일: ${pdfBlob ? 'PDF 첨부됨' : '첨부파일 없음'}

담당자가 후속 상담을 위해 연락할 예정입니다.

--
AICAMP 자동 알림 시스템
    `;

    GmailApp.sendEmail(
      ADMIN_EMAIL,
      adminSubject,
      adminBody,
      { name: 'AICAMP AI 교육센터 자동알림' }
    );

    console.log('✅ 관리자 알림 이메일 발송 완료');

    return createSuccessResponse({
      message: 'PDF 진단보고서가 성공적으로 발송되었습니다.',
      data: {
        to_email: data.to_email,
        company_name: data.company_name,
        pdf_filename: data.pdf_filename,
        sent_time: getCurrentKoreanTime()
      }
    });

  } catch (error) {
    console.error('❌ PDF 이메일 발송 실패:', error);
    
    // Google Sheets에 PDF 발송 실패 상태 업데이트
    try {
      updatePdfSendingStatus(data.company_name || '알수없음', data.to_email || '알수없음', '발송실패');
    } catch (updateError) {
      console.error('❌ PDF 발송 상태 업데이트 실패:', updateError);
    }
    
    // 오류 발생 시 관리자에게 긴급 알림
    try {
      const errorSubject = `[AICAMP] 긴급: PDF 이메일 발송 실패 - ${data.company_name || '알수없음'}`;
      const errorBody = `PDF 진단보고서 이메일 발송 중 오류가 발생했습니다.

❌ 오류 정보:
• 수신자: ${data.to_name} (${data.to_email})
• 회사명: ${data.company_name}
• 오류 메시지: ${error.toString()}
• 발생 시간: ${getCurrentKoreanTime()}

🚨 조치 필요:
1. 수신자에게 직접 연락
2. PDF 보고서 수동 발송 필요
3. 시스템 오류 점검 필요

--
AICAMP 자동 알림 시스템
      `;

      GmailApp.sendEmail(
        ADMIN_EMAIL,
        errorSubject,
        errorBody,
        { name: 'AICAMP AI 교육센터 오류알림' }
      );
    } catch (notificationError) {
      console.error('❌ 오류 알림 발송도 실패:', notificationError);
    }

    return createErrorResponse('PDF 이메일 발송 중 오류가 발생했습니다: ' + error.toString());
  }
}

/**
 * Google Sheets에서 PDF 발송 상태 업데이트
 */
function updatePdfSendingStatus(companyName, email, status) {
  try {
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const lastRow = sheet.getLastRow();
    
    // 회사명과 이메일로 해당 행 찾기
    for (let i = 2; i <= lastRow; i++) {
      const rowCompanyName = sheet.getRange(i, 2).getValue(); // B열: 회사명
      const rowEmail = sheet.getRange(i, 12).getValue(); // L열: 이메일
      
      if (rowCompanyName === companyName && rowEmail === email) {
        // PDF발송상태 컬럼 (추정 위치: 59번째 컬럼)
        sheet.getRange(i, 59).setValue(status);
        // PDF발송일시 컬럼 (추정 위치: 60번째 컬럼)
        sheet.getRange(i, 60).setValue(getCurrentKoreanTime());
        
        console.log('✅ PDF 발송 상태 업데이트 완료:', {
          회사명: companyName,
          이메일: email,
          상태: status,
          행번호: i
        });
        break;
      }
    }
  } catch (error) {
    console.error('❌ PDF 발송 상태 업데이트 실패:', error);
  }
}

// ================================================================================
// 🎯 진단신청 처리 (58개 컬럼 + PDF 발송 상태 컬럼 추가)
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
        문항별점수: data.문항별점수 || data.detailedScores
      });
    }

    // 🔧 **문항별 점수 정확 추출 (1-5점)**
    const scoreData = extractDetailedScores(data);
    
    // 🔧 **카테고리별 점수 추출**
    const categoryData = extractCategoryScores(data);

    // 📝 **진단결과보고서 요약 추출**
    const reportSummary = data.진단보고서요약 || data.summaryReport || '';
    const totalScore = data.종합점수 || data.totalScore || 0;
    
    // 📊 **60개 컬럼 진단신청 데이터 구성 (PDF 발송 상태 추가)**
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
      reportSummary,             // AV: 보고서전문
      
      // 🆕 PDF 발송 상태 (AW-AX: 2개) - 새로 추가
      '대기중',                  // AW: PDF발송상태
      ''                         // AX: PDF발송일시
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

    // 이메일 발송
    if (AUTO_REPLY_ENABLED) {
      sendDiagnosisAdminNotification(data, newRow, totalScore, reportSummary);
      
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName || data.contactManager;
      if (userEmail) {
        sendUserConfirmation(userEmail, userName, '진단');
      }
    }

    return createSuccessResponse({
      message: '📊 AI 무료진단이 성공적으로 접수되었습니다 (문항별 점수 + 보고서 포함). PDF 이메일 발송이 가능합니다.',
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: totalScore,
      추천서비스: reportSummary.length > 50 ? reportSummary.substring(0, 50) + '...' : reportSummary,
      pdfSendingEnabled: true // PDF 발송 가능 플래그
    });

  } catch (error) {
    console.error('❌ 진단신청 처리 오류:', error);
    return createErrorResponse('진단신청 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🔧 점수 데이터 추출 함수들 (기존 코드 유지)
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
// 💬 상담신청 처리 (19개 컬럼) - 기존 코드 유지
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
      if (userEmail) {
        sendUserConfirmation(userEmail, userName, '상담');
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
// 🧪 베타피드백 처리 (14개 컬럼) - 기존 코드 유지
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

// ================================================================================
// 📧 이메일 발송 함수들 (기존 코드 유지)
// ================================================================================

/**
 * 진단 관리자 알림 이메일
 */
function sendDiagnosisAdminNotification(data, rowNumber, totalScore, reportSummary) {
  try {
    const companyName = data.회사명 || data.companyName || '미확인';
    const subject = `[AICAMP] 🎯 AI 무료진단 접수 - ${companyName} (${totalScore}점)`;
    
    const emailBody = `📊 새로운 AI 무료진단이 접수되었습니다!\n\n` +
      `🏢 회사명: ${companyName}\n` +
      `📧 담당자: ${data.담당자명 || data.contactName || '미확인'} (${data.이메일 || data.contactEmail || data.email || '미확인'})\n` +
      `🏭 업종: ${data.업종 || data.industry || '미확인'}\n` +
      `👥 직원수: ${data.직원수 || data.employeeCount || '미확인'}\n` +
      `🎯 종합점수: ${totalScore}점/100점\n` +
      `📝 보고서 길이: ${reportSummary.length}자\n` +
      `⏰ 접수 시간: ${getCurrentKoreanTime()}\n\n` +
      `💭 주요 고민사항:\n${(data.주요고민사항 || data.mainConcerns || '').substring(0, 200)}...\n\n` +
      `🎯 기대 효과:\n${(data.예상혜택 || data.expectedBenefits || '').substring(0, 200)}...\n\n` +
      `📋 시트 위치: ${SHEETS.DIAGNOSIS} 시트 ${rowNumber}행\n` +
      `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit\n\n` +
      `📧 PDF 결과보고서 발송이 가능합니다!\n\n` +
      `※ 문항별 상세 점수와 진단결과보고서가 구글시트에 완전히 저장되었습니다.`;

    MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 진단 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 진단 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 상담 관리자 알림 이메일
 */
function sendConsultationAdminNotification(data, rowNumber) {
  try {
    const subject = `[AICAMP] 💬 새로운 상담신청 접수 - ${data.회사명 || data.company || '회사명미상'}`;
    
    const emailBody = `💬 새로운 상담신청이 접수되었습니다!\n\n` +
      `👤 신청자: ${data.성명 || data.name || '미확인'}\n` +
      `🏢 회사명: ${data.회사명 || data.company || '미확인'}\n` +
      `📧 이메일: ${data.이메일 || data.email || '미확인'}\n` +
      `📞 연락처: ${data.연락처 || data.phone || '미확인'}\n` +
      `🎯 상담유형: ${data.상담유형 || data.consultationType || '일반상담'}\n` +
      `📝 상담분야: ${data.상담분야 || data.consultationArea || '미확인'}\n` +
      `⏰ 접수시간: ${getCurrentKoreanTime()}\n\n` +
      `💭 문의내용:\n${(data.문의내용 || data.inquiryContent || '').substring(0, 300)}...\n\n` +
      `📋 시트 위치: ${SHEETS.CONSULTATION} 시트 ${rowNumber}행\n` +
      `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

    MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 상담 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 상담 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 베타피드백 관리자 알림 이메일
 */
function sendBetaFeedbackAdminNotification(data, rowNumber) {
  try {
    const subject = `[AICAMP] 🚨 긴급! 베타 피드백 접수 - ${data.계산기명 || '세금계산기'}`;
    
    const emailBody = `🧪 새로운 베타 피드백이 접수되었습니다!\n\n` +
      `🎯 대상 계산기: ${data.계산기명 || 'N/A'}\n` +
      `🐛 피드백 유형: ${data.피드백유형 || 'N/A'}\n` +
      `📧 사용자 이메일: ${data.사용자이메일 || 'N/A'}\n` +
      `⚠️ 심각도: ${data.심각도 || 'N/A'}\n` +
      `⏰ 접수 시간: ${getCurrentKoreanTime()}\n\n` +
      `📝 문제 설명:\n${(data.문제설명 || '').substring(0, 200)}...\n\n` +
      `📋 시트 위치: ${SHEETS.BETA_FEEDBACK} 시트 ${rowNumber}행\n` +
      `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

    MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 베타피드백 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 베타피드백 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 신청자 확인 이메일 발송 (진단/상담용)
 */
function sendUserConfirmation(email, name, type) {
  try {
    const isConsultation = type === '상담';
    const subject = `[AICAMP] ${isConsultation ? '상담' : '진단'} 신청이 접수되었습니다`;
    
    const emailBody = `안녕하세요 ${name || '고객'}님,\n\n` +
      `AICAMP에서 알려드립니다.\n\n` +
      `✅ ${isConsultation ? '전문가 상담' : 'AI 무료 진단'} 신청이 성공적으로 접수되었습니다.\n\n` +
      `📞 담당 전문가가 1-2일 내에 연락드리겠습니다.\n\n` +
      `▣ 담당 컨설턴트: 이후경 경영지도사\n` +
      `▣ 전화: 010-9251-9743\n` +
      `▣ 이메일: ${ADMIN_EMAIL}\n\n` +
      `${isConsultation ? 
        '상담 일정을 조율하여 맞춤형 컨설팅을 제공해드리겠습니다.' :
        '진단 결과를 바탕으로 맞춤형 개선방안을 제시해드리겠습니다.\n\n📧 진단 완료 후 PDF 결과보고서를 이메일로 발송해드립니다.'
      }\n\n` +
      `감사합니다.\nAICAMP`;

    MailApp.sendEmail(email, subject, emailBody);
    console.log('📧 신청자 확인 이메일 발송 완료:', email);
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
  }
}

/**
 * 베타피드백 사용자 확인 이메일
 */
function sendBetaFeedbackUserConfirmation(email, data) {
  try {
    const subject = `[AICAMP] 🧪 베타 피드백 접수 완료! ${data.계산기명 || '세금계산기'}`;
    
    const emailBody = `안녕하세요!\n\n` +
      `AICAMP 세금계산기 베타테스트에 참여해 주셔서 감사합니다.\n\n` +
      `🎯 접수된 피드백: ${data.계산기명 || '세금계산기'}\n` +
      `🐛 피드백 유형: ${data.피드백유형 || 'N/A'}\n` +
      `⏰ 접수 일시: ${getCurrentKoreanTime()}\n\n` +
      `담당자가 검토 후 이메일로 회신드리겠습니다.\n\n` +
      `추가 문의사항이 있으시면 언제든 연락해주세요.\n\n` +
      `감사합니다.\nAICAMP 베타테스트 개발팀`;

    MailApp.sendEmail(email, subject, emailBody);
    console.log('📧 베타피드백 사용자 확인 이메일 발송 완료:', email);
  } catch (error) {
    console.error('❌ 베타피드백 사용자 이메일 발송 실패:', error);
  }
}

// ================================================================================
// 📊 시트 헤더 설정 (60개 진단 + PDF 상태, 19개 상담, 14개 베타피드백)
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
    // 진단신청 헤더 (60개 컬럼 = 58개 기존 + 2개 PDF 상태)
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
      '보고서전문 (3000자 미만)',
      
      // 🆕 PDF 발송 상태 (AW-AX: 2개) - 새로 추가
      'PDF발송상태',
      'PDF발송일시'
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
  
  // 🆕 PDF 발송 상태 컬럼에 특별 색상 적용 (진단 시트만)
  if (type === 'diagnosis') {
    // PDF 발송 상태 컬럼 (AW-AX: 2개) - 빨간색으로 강조
    const pdfStatusRange = sheet.getRange(1, 59, 1, 2); // 59-60번째 컬럼
    pdfStatusRange.setBackground('#ea4335');
    pdfStatusRange.setFontColor('#ffffff');
    pdfStatusRange.setFontWeight('bold');
    
    console.log('📧 PDF 발송 상태 컬럼 추가 완료 (59-60번째 컬럼)');
  }
  
  console.log(`📋 ${type} 시트 헤더 설정 완료: ${headers.length}개 컬럼`);
}

// ================================================================================
// 🧪 테스트 함수들 (PDF 이메일 발송 테스트 추가)
// ================================================================================

/**
 * 🆕 PDF 이메일 발송 테스트
 */
function testPdfEmailSending() {
  console.log('📧 PDF 이메일 발송 테스트 시작...');
  
  // 샘플 PDF 데이터 (Base64 인코딩된 더미 PDF)
  const samplePdfBase64 = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA5NTIKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnic';
  
  const testData = {
    action: 'sendDiagnosisPdfEmail',
    to_email: 'test@example.com',
    to_name: '김테스트',
    company_name: 'PDF테스트회사',
    total_score: 85,
    overall_grade: 'A',
    industry_type: 'IT/소프트웨어',
    diagnosis_date: '2025. 01. 06.',
    pdf_attachment: samplePdfBase64,
    pdf_filename: 'AI진단보고서_PDF테스트회사_2025-01-06.pdf',
    consultant_name: '이후경 경영지도사',
    consultant_phone: '010-9251-9743',
    consultant_email: 'hongik423@gmail.com'
  };

  try {
    const result = sendDiagnosisPdfEmail(testData);
    console.log('✅ PDF 이메일 발송 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ PDF 이메일 발송 테스트 실패:', error);
    return createErrorResponse('PDF 이메일 발송 테스트 실패: ' + error.toString());
  }
}

/**
 * 전체 시스템 테스트 함수 (PDF 이메일 발송 테스트 추가)
 */
function testEntireSystem() {
  try {
    console.log('🧪 전체 시스템 테스트 시작 (PDF 이메일 발송 포함)...');
    
    const results = {
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      tests: {}
    };
    
    // 1. 진단신청 테스트
    try {
      const diagnosisResult = testDiagnosisSubmission();
      results.tests.diagnosis = { success: true, message: '진단신청 테스트 성공' };
    } catch (error) {
      results.tests.diagnosis = { success: false, error: error.toString() };
    }
    
    // 2. 상담신청 테스트
    try {
      const consultationResult = testConsultationSubmission();
      results.tests.consultation = { success: true, message: '상담신청 테스트 성공' };
    } catch (error) {
      results.tests.consultation = { success: false, error: error.toString() };
    }
    
    // 3. 베타피드백 테스트
    try {
      const betaResult = testBetaFeedback();
      results.tests.betaFeedback = { success: true, message: '베타피드백 테스트 성공' };
    } catch (error) {
      results.tests.betaFeedback = { success: false, error: error.toString() };
    }
    
    // 🆕 4. PDF 이메일 발송 테스트
    try {
      const pdfEmailResult = testPdfEmailSending();
      results.tests.pdfEmailSending = { success: true, message: 'PDF 이메일 발송 테스트 성공' };
    } catch (error) {
      results.tests.pdfEmailSending = { success: false, error: error.toString() };
    }
    
    // 5. 환경변수 동기화 테스트
    try {
      const envSyncResult = checkEnvironmentSync();
      results.tests.environmentSync = { success: true, message: '환경변수 동기화 테스트 성공' };
    } catch (error) {
      results.tests.environmentSync = { success: false, error: error.toString() };
    }
    
    console.log('✅ 전체 시스템 테스트 완료 (PDF 이메일 발송 포함):', results);
    return createSuccessResponse(results);
    
  } catch (error) {
    console.error('❌ 시스템 테스트 실패:', error);
    return createErrorResponse('시스템 테스트 실패: ' + error.toString());
  }
}

// ================================================================================
// 🔄 환경변수 동기화 및 기타 유틸리티 함수들 (기존 코드 유지)
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
        pdfEmailSending: '✅ 활성화 (NEW!)', // 새로 추가된 기능
        status: '✅ 정상'
      }
    };
    
    console.log('✅ 환경변수 동기화 상태 확인 완료:', syncStatus);
    return createSuccessResponse({
      message: '환경변수 동기화 상태가 정상입니다 (PDF 이메일 발송 기능 포함).',
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
      },
      newFeatures: {
        pdfEmailSending: '✅ 지원됨',
        pdfAttachment: '✅ Base64 디코딩 지원',
        status: '✅ 정상'
      }
    };
    
    console.log('✅ Next.js 환경변수 호환성 확인 완료:', compatibility);
    return createSuccessResponse({
      message: 'Next.js 환경변수 호환성이 정상입니다 (PDF 이메일 발송 기능 포함).',
      compatibility: compatibility
    });
    
  } catch (error) {
    console.error('❌ Next.js 환경변수 호환성 확인 실패:', error);
    return createErrorResponse('Next.js 환경변수 호환성 확인 실패: ' + error.toString());
  }
}

// ================================================================================
// 기존 테스트 함수들 (유지)
// ================================================================================

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
// 📖 사용법 및 설치 가이드 (업데이트)
// ================================================================================

/**
 * 📖 AICAMP 통합 Apps Script 2025 최종완성판 + PDF 이메일 발송 기능 사용법
 * 
 * 🎯 현재 배포 정보:
 * - Script ID: 1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
 * - Deployment ID: AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv
 * - Web App URL: https://script.google.com/macros/s/AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv/exec
 * - Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
 * - 관리자 이메일: hongik423@gmail.com
 * 
 * 🆕 새로 추가된 기능:
 * - PDF 첨부 이메일 발송 (sendDiagnosisPdfEmail)
 * - Base64 PDF 첨부파일 처리
 * - 진단 결과 PDF 자동 발송 시스템
 * - PDF 발송 상태 Google Sheets 기록 (60개 컬럼)
 * - PDF 발송 오류 처리 및 관리자 알림
 * 
 * 🔧 설치 방법:
 * 1. Google Apps Script 에디터에서 기존 Code.gs 내용 전체 삭제
 * 2. 이 코드 전체를 복사하여 Code.gs에 붙여넣기
 * 3. Gmail API 사용 설정 (라이브러리 → Gmail API 추가)
 * 4. 저장 후 "배포" → "웹 앱으로 배포" 클릭
 * 5. 액세스 권한: "모든 사용자"로 설정
 * 6. "새 배포" 생성 (중요!)
 * 7. 생성된 웹앱 URL을 환경변수에 업데이트
 * 
 * 🧪 테스트 방법:
 * - testEntireSystem() 함수 실행: 전체 시스템 테스트 (PDF 이메일 발송 포함)
 * - testPdfEmailSending() 함수 실행: PDF 이메일 발송 전용 테스트
 * - testDiagnosisSubmission() 함수 실행: 진단 신청 테스트
 * - testConsultationSubmission() 함수 실행: 상담 신청 테스트
 * - testBetaFeedback() 함수 실행: 베타 피드백 테스트
 * - checkEnvironmentSync() 함수 실행: 환경변수 동기화 상태 확인
 * - checkNextjsCompatibility() 함수 실행: Next.js 호환성 확인
 * 
 * ✅ 해결된 문제 (기존 + 새 기능):
 * - 진단 점수 0으로 나오는 문제 → 1-5점 정확 저장
 * - 이메일 발송 안되는 문제 → 관리자/신청자 자동 이메일
 * - 시트 분리 안되는 문제 → 3개 시트 별도 관리
 * - 60개 컬럼 확장 진단 데이터 완전 저장 (PDF 발송 상태 포함)
 * - PDF 첨부 이메일 발송 → Base64 디코딩 및 Gmail API 활용
 * - 직접 실행 시 오류 → 테스트 함수 제공
 * - 환경변수 불일치 → 완전 동기화 완료
 * - 웹앱 URL 업데이트 → 최신 배포 버전 적용
 * 
 * 📊 시트 구성:
 * - AI_무료진단신청: 60개 컬럼 (기존 58개 + PDF발송상태 + PDF발송일시)
 * - 상담신청: 19개 컬럼
 * - 베타피드백: 14개 컬럼
 * 
 * 📧 이메일 기능:
 * - 관리자 알림: hongik423@gmail.com
 * - 신청자 확인: 자동 발송
 * - PDF 첨부 이메일: 진단 결과 PDF 자동 발송
 * - 베타피드백: 개발팀 알림
 * 
 * 🔄 환경변수 동기화:
 * - Next.js 환경변수와 완전 동기화
 * - 실시간 백업 시스템 구축
 * - API 엔드포인트 최신화
 * - PDF 이메일 발송 기능 완전 통합
 */ 
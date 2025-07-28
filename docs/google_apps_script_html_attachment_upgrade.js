/**
 * 📧 HTML 첨부파일 이메일 발송 업그레이드 - Google Apps Script
 * - PDF 대신 완벽한 HTML 보고서 첨부
 * - 기존 기능 + HTML 첨부 기능 추가
 * - 접수 확인 메일에 HTML 보고서 첨부
 */

// 🔧 환경 설정
const ADMIN_EMAIL = 'hongik423@gmail.com';
const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = true;

// 📊 시트 설정
const SHEETS = {
  DIAGNOSIS: '진단신청',
  CONSULTATION: '상담신청',
  BETA_FEEDBACK: '베타피드백'
};

/**
 * 🎯 메인 처리 함수 - POST 요청 처리
 */
function doPost(e) {
  try {
    console.log('📨 POST 요청 수신');
    
    const data = JSON.parse(e.postData.contents);
    console.log('📝 요청 데이터:', data);
    
    // 폼 타입에 따른 처리 분기
    switch (data.폼타입) {
      case 'AI_진단_HTML첨부':
        return processDiagnosisWithHtmlAttachment(data);
      case 'AI_무료진단':
      case 'AI_완벽진단보고서':
        return processDiagnosisForm(data);
      case '전문가상담':
        return processConsultationForm(data);
      case '베타피드백':
        return processBetaFeedback(data);
      default:
        return createErrorResponse('지원하지 않는 폼 타입입니다: ' + data.폼타입);
    }
    
  } catch (error) {
    console.error('❌ doPost 처리 오류:', error);
    return createErrorResponse('요청 처리 중 오류가 발생했습니다: ' + error.toString());
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
    
    // 시트 데이터 저장
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
          
          <!-- 다음 단계 안내 -->
          <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; border-left: 5px solid #17a2b8; margin-bottom: 30px;">
            <h3 style="color: #0c5460; margin: 0 0 15px 0; font-size: 1.3rem;">🔔 다음 진행사항</h3>
            <ol style="color: #495057; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>HTML 보고서 확인</strong> - 첨부파일을 다운로드하여 상세 내용 확인</li>
              <li><strong>전문가 상담 예약</strong> - 결과에 대한 구체적 설명 및 개선방안 논의</li>
              <li><strong>맞춤형 솔루션 제안</strong> - 귀하의 비즈니스에 특화된 성장 전략 수립</li>
              <li><strong>실행 계획 수립</strong> - 단계별 실행 로드맵 및 후속 관리</li>
            </ol>
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

🔔 다음 진행사항:
1. HTML 보고서 확인 - 첨부파일을 다운로드하여 상세 내용 확인
2. 전문가 상담 예약 - 결과에 대한 구체적 설명 및 개선방안 논의
3. 맞춤형 솔루션 제안 - 귀하의 비즈니스에 특화된 성장 전략 수립
4. 실행 계획 수립 - 단계별 실행 로드맵 및 후속 관리

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
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HTML발송기록');
    if (!sheet) {
      // 시트가 없으면 생성
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('HTML발송기록');
      newSheet.getRange(1, 1, 1, 8).setValues([['발송일시', '회사명', '담당자', '이메일', '파일명', '점수', '등급', '상태']]);
    }
    
    const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HTML발송기록');
    const newRow = targetSheet.getLastRow() + 1;
    
    targetSheet.getRange(newRow, 1, 1, 8).setValues([[
      sentTime,
      data.company_name,
      data.to_name,
      data.to_email,
      data.html_filename,
      data.total_score,
      data.overall_grade,
      'HTML첨부발송완료'
    ]]);
    
    console.log('✅ HTML 발송 기록 저장 완료');
  } catch (error) {
    console.error('❌ HTML 발송 기록 저장 실패:', error);
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

// 🔧 기존 유틸리티 함수들 (기존 코드에서 가져오기)
function getCurrentKoreanTime() {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      timestamp: getCurrentKoreanTime(),
      ...data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: message,
      timestamp: getCurrentKoreanTime()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 기존 함수들 (processDiagnosisForm, processConsultationForm, processBetaFeedback 등)은 
// 기존 Google Apps Script 코드에서 그대로 사용 
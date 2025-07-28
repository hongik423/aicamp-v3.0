/**
 * ================================================================================
 * 🚨 AICAMP PDF 이메일 발송 기능 긴급 수정 - 2025.01.27
 * ================================================================================
 * 
 * 📌 문제: AI 무료진단 결과보고서 PDF 이메일 발송 오류
 * 🎯 해결: sendDiagnosisPdfEmail 액션 처리 및 Base64 PDF 이메일 발송 기능 추가
 * 
 * 🔧 설치 방법:
 * 1. Google Apps Script 에디터에서 기존 Code.gs 파일 열기
 * 2. 아래 코드를 기존 코드에 추가 (doPost 함수 수정 + 새 함수들 추가)
 * 3. 저장 후 새 배포 생성
 * 
 * ⚠️ 주의: 기존 코드를 삭제하지 말고 아래 내용을 추가/수정하세요!
 */

// ================================================================================
// 🔧 1. doPost 함수 수정 (PDF 이메일 발송 액션 추가)
// ================================================================================

/**
 * 기존 doPost 함수에서 PDF 이메일 발송 처리 추가
 * ⚠️ 기존 doPost 함수의 다음 부분을 수정하세요:
 */
function doPost(e) {
  try {
    // e 파라미터 자체가 없거나 undefined인 경우 처리 (직접 실행 시)
    if (!e) {
      console.warn('⚠️ 직접 실행 감지: 테스트 모드로 전환합니다.');
      return createSuccessResponse({
        message: '직접 실행 시에는 웹 요청을 시뮬레이션할 수 없습니다.',
        testFunctions: [
          'testDiagnosisSubmission() - 진단 신청 테스트',
          'testConsultationSubmission() - 상담 신청 테스트',
          'testBetaFeedback() - 베타 피드백 테스트',
          'testPdfEmailSending() - PDF 이메일 발송 테스트', // 🆕 추가
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
        점수개수: requestData.문항별점수 ? Object.keys(requestData.문항별점수).length : 0,
        // 🆕 PDF 이메일 관련 로그 추가
        isPdfEmailAction: requestData.action === 'sendDiagnosisPdfEmail',
        hasPdfAttachment: !!(requestData.pdf_attachment),
        pdfSize: requestData.pdf_attachment ? Math.round(requestData.pdf_attachment.length / 1024) + 'KB' : 'N/A'
      });
    }

    // 🆕 PDF 이메일 발송 처리 (최우선 처리)
    if (requestData.action === 'sendDiagnosisPdfEmail') {
      console.log('📧 PDF 이메일 발송 처리 시작');
      return processPdfEmailSending(requestData);
    }

    // 🧪 베타 피드백 처리
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

// ================================================================================
// 🆕 2. PDF 이메일 발송 처리 함수 (신규 추가)
// ================================================================================

/**
 * 📧 PDF 이메일 발송 메인 처리 함수
 */
function processPdfEmailSending(data) {
  try {
    console.log('📧 PDF 이메일 발송 요청 처리 시작:', {
      action: data.action,
      to_email: data.to_email,
      company_name: data.company_name,
      pdf_size: data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : '0KB'
    });

    // 📋 필수 데이터 검증
    if (!data.to_email || !data.to_name || !data.company_name || !data.pdf_attachment) {
      return createErrorResponse('PDF 이메일 발송에 필요한 데이터가 누락되었습니다. (이메일, 이름, 회사명, PDF 데이터 필수)');
    }

    // 📄 Base64 PDF 데이터를 Blob으로 변환
    let pdfBlob = null;
    try {
      const base64Data = data.pdf_attachment.replace(/^data:application\/pdf;base64,/, '');
      const binaryData = Utilities.base64Decode(base64Data);
      pdfBlob = Utilities.newBlob(binaryData, 'application/pdf', data.pdf_filename || `AI진단보고서_${data.company_name}_${getCurrentKoreanTime().replace(/[^\w가-힣]/g, '_')}.pdf`);
      
      console.log('✅ PDF Blob 생성 성공:', {
        filename: pdfBlob.getName(),
        size: Math.round(pdfBlob.getBytes().length / 1024) + 'KB',
        contentType: pdfBlob.getContentType()
      });
    } catch (pdfError) {
      console.error('❌ PDF Blob 생성 실패:', pdfError);
      return createErrorResponse('PDF 데이터 변환 중 오류가 발생했습니다: ' + pdfError.toString());
    }

    // 📧 신청자에게 PDF 첨부 이메일 발송
    const userEmailResult = sendPdfToUser(data, pdfBlob);
    if (!userEmailResult.success) {
      return createErrorResponse('신청자 이메일 발송 실패: ' + userEmailResult.error);
    }

    // 📧 관리자에게 발송 완료 알림
    sendPdfNotificationToAdmin(data, userEmailResult.sentTime);

    // 📊 구글시트에 PDF 발송 기록 저장
    const recordResult = savePdfSendingRecord(data, userEmailResult.sentTime);

    return createSuccessResponse({
      message: `📧 AI 진단 결과보고서가 ${data.to_email}로 성공적으로 발송되었습니다.`,
      data: {
        to_email: data.to_email,
        to_name: data.to_name,
        company_name: data.company_name,
        pdf_filename: pdfBlob.getName(),
        sent_time: userEmailResult.sentTime,
        record_row: recordResult.row || 'N/A'
      },
      timestamp: getCurrentKoreanTime()
    });

  } catch (error) {
    console.error('❌ PDF 이메일 발송 처리 실패:', error);
    
    // 🚨 긴급 오류 알림을 관리자에게 발송
    try {
      sendPdfErrorNotificationToAdmin(data, error);
    } catch (notificationError) {
      console.error('❌ 오류 알림 발송도 실패:', notificationError);
    }
    
    return createErrorResponse('PDF 이메일 발송 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🆕 3. 신청자 PDF 이메일 발송 함수 (신규 추가)
// ================================================================================

/**
 * 📧 신청자에게 PDF 첨부 이메일 발송
 */
function sendPdfToUser(data, pdfBlob) {
  try {
    const sentTime = getCurrentKoreanTime();
    const subject = `[AICAMP] 🎯 AI 무료진단 결과보고서 - ${data.company_name}`;
    
    const emailBody = `안녕하세요 ${data.to_name}님,

AICAMP AI 무료진단을 신청해 주셔서 감사합니다.
요청하신 진단 결과보고서를 첨부파일로 보내드립니다.

📊 진단 정보:
• 회사명: ${data.company_name}
• 진단일시: ${data.diagnosis_date || sentTime}
• 종합점수: ${data.total_score || 'N/A'}점
• 등급: ${data.overall_grade || 'N/A'}
• 업종: ${data.industry_type || 'N/A'}

📎 첨부파일:
• AI 진단 결과보고서 (PDF)

📞 후속 상담 문의:
• 담당: ${data.consultant_name || '이후경 교장 (경영지도사)'}
• 전화: ${data.consultant_phone || '010-9251-9743'}
• 이메일: ${data.consultant_email || ADMIN_EMAIL}

💡 진단 결과를 바탕으로 맞춤형 성장 전략을 제안드릴 수 있습니다.
추가 상담이나 문의사항이 있으시면 언제든 연락해주세요.

귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.

감사합니다.

---
AICAMP (AI기반 비즈니스 성장 솔루션)
담당: 이후경 교장 (경영지도사)
📞 010-9251-9743
📧 ${ADMIN_EMAIL}
🌐 https://ai-camp-landingpage.vercel.app
발송일시: ${sentTime}`;

    // HTML 이메일 본문 (더 예쁘게 formatting)
    const htmlBody = `
      <div style="font-family: 'Malgun Gothic', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; border-bottom: 3px solid #4285f4; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #4285f4; margin-bottom: 10px;">🎯 AICAMP</h1>
          <h2 style="color: #333; margin: 0;">AI 무료진단 결과보고서</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">✅ 진단 완료</h3>
          <p><strong>${data.to_name}님</strong>의 AI 무료진단이 완료되었습니다.</p>
          <p>상세한 분석 결과를 첨부파일로 확인하실 수 있습니다.</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #1976d2; margin-top: 0;">📊 진단 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>회사명</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.company_name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>진단일시</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.diagnosis_date || sentTime}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>종합점수</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.total_score || 'N/A'}점</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>등급</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.overall_grade || 'N/A'}</td></tr>
            <tr><td style="padding: 8px;"><strong>업종</strong></td><td style="padding: 8px;">${data.industry_type || 'N/A'}</td></tr>
          </table>
        </div>
        
        <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #f57c00; margin-top: 0;">📞 후속 상담</h3>
          <p><strong>담당:</strong> ${data.consultant_name || '이후경 교장 (경영지도사)'}</p>
          <p><strong>전화:</strong> ${data.consultant_phone || '010-9251-9743'}</p>
          <p><strong>이메일:</strong> ${data.consultant_email || ADMIN_EMAIL}</p>
          <p style="margin-top: 15px;">진단 결과를 바탕으로 맞춤형 성장 전략을 제안드릴 수 있습니다.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
          <p><strong>AICAMP</strong> - AI기반 비즈니스 성장 솔루션</p>
          <p>귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.</p>
        </div>
      </div>
    `;

    // 이메일 발송 (PDF 첨부)
    MailApp.sendEmail({
      to: data.to_email,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody,
      attachments: [pdfBlob],
      name: 'AICAMP AI 교육센터'
    });
    
    console.log('📧 신청자 PDF 이메일 발송 완료:', {
      to: data.to_email,
      company: data.company_name,
      sentTime: sentTime,
      pdfSize: Math.round(pdfBlob.getBytes().length / 1024) + 'KB'
    });

    return {
      success: true,
      sentTime: sentTime
    };

  } catch (error) {
    console.error('❌ 신청자 PDF 이메일 발송 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ================================================================================
// 🆕 4. 관리자 알림 함수들 (신규 추가)
// ================================================================================

/**
 * 📧 관리자에게 PDF 발송 완료 알림
 */
function sendPdfNotificationToAdmin(data, sentTime) {
  try {
    const subject = `[AICAMP] ✅ PDF 진단보고서 발송 완료 - ${data.company_name}`;
    
    const adminBody = `📧 AI 진단 결과보고서가 성공적으로 발송되었습니다!

📊 발송 정보:
• 수신자: ${data.to_name} (${data.to_email})
• 회사명: ${data.company_name}
• 진단점수: ${data.total_score || 'N/A'}점
• 등급: ${data.overall_grade || 'N/A'}
• 업종: ${data.industry_type || 'N/A'}
• 발송일시: ${sentTime}

📎 발송된 파일:
• ${data.pdf_filename || 'AI진단보고서.pdf'}
• 크기: ${data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : 'N/A'}

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
function sendPdfErrorNotificationToAdmin(data, error) {
  try {
    const subject = `[AICAMP] 🚨 긴급: PDF 발송 실패 - ${data.company_name || '알수없음'}`;
    
    const errorBody = `❌ PDF 진단보고서 발송 중 오류가 발생했습니다!

🚨 오류 정보:
• 수신자: ${data.to_name || 'N/A'} (${data.to_email || 'N/A'})
• 회사명: ${data.company_name || 'N/A'}
• 오류 메시지: ${error.toString()}
• 발생 시간: ${getCurrentKoreanTime()}

📋 요청 데이터:
• PDF 크기: ${data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : '0KB'}
• 액션: ${data.action || 'N/A'}

🚨 즉시 조치 필요:
1. 고객에게 직접 연락하여 상황 설명
2. PDF 보고서 수동 발송 또는 재발송
3. 시스템 오류 점검 및 수정
4. 기술팀에 오류 보고

📞 고객 연락처: ${data.to_email || 'N/A'}

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

// ================================================================================
// 🆕 5. 구글시트 PDF 발송 기록 저장 (신규 추가)
// ================================================================================

/**
 * 📊 PDF 발송 기록을 구글시트에 저장
 */
function savePdfSendingRecord(data, sentTime) {
  try {
    const sheet = getOrCreateSheet('PDF_발송기록', 'pdfRecord');
    
    const rowData = [
      sentTime,                                    // A: 발송일시
      data.to_email,                              // B: 수신자이메일
      data.to_name,                               // C: 수신자명
      data.company_name,                          // D: 회사명
      data.pdf_filename || 'AI진단보고서.pdf',     // E: PDF파일명
      data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : '0KB', // F: 파일크기
      data.total_score || 'N/A',                  // G: 진단점수
      data.overall_grade || 'N/A',                // H: 등급
      data.industry_type || 'N/A',                // I: 업종
      data.diagnosis_date || sentTime,            // J: 진단일시
      '발송완료',                                  // K: 발송상태
      data.consultant_name || '이후경 교장',       // L: 담당자
      ''                                          // M: 후속조치
    ];
    
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('📊 PDF 발송 기록 저장 완료:', {
      시트: 'PDF_발송기록',
      행번호: newRow,
      회사명: data.company_name,
      수신자: data.to_email
    });
    
    return { success: true, row: newRow };

  } catch (error) {
    console.error('❌ PDF 발송 기록 저장 실패:', error);
    return { success: false, error: error.toString() };
  }
}

// ================================================================================
// 🆕 6. PDF 발송 기록 시트 헤더 설정 (신규 추가)
// ================================================================================

/**
 * 기존 setupHeaders 함수에 PDF 발송 기록 시트 타입 추가
 * ⚠️ 기존 setupHeaders 함수의 else 부분에 다음 조건을 추가하세요:
 */
function setupHeadersForPdfRecord(sheet) {
  const headers = [
    '발송일시', '수신자이메일', '수신자명', '회사명', 'PDF파일명',
    '파일크기', '진단점수', '등급', '업종', '진단일시',
    '발송상태', '담당자', '후속조치'
  ];
  
  // 📋 1행: 헤더 설정
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  
  // 🎨 헤더 스타일링
  headerRange.setBackground('#ff6b6b');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  headerRange.setWrap(true);
  sheet.setFrozenRows(1);
  
  // 📏 컬럼 폭 자동 조정
  sheet.autoResizeColumns(1, headers.length);
  
  console.log(`📋 PDF 발송 기록 시트 헤더 설정 완료: ${headers.length}개 컬럼`);
}

// ⚠️ 기존 setupHeaders 함수에 다음 조건 추가:
// } else if (type === 'pdfRecord') {
//   setupHeadersForPdfRecord(sheet);
// } else {

// ================================================================================
// 🆕 7. PDF 이메일 발송 테스트 함수 (신규 추가)
// ================================================================================

/**
 * 📧 PDF 이메일 발송 테스트 함수
 */
function testPdfEmailSending() {
  console.log('🧪 PDF 이메일 발송 테스트 시작...');
  
  // 테스트용 Base64 PDF 데이터 (매우 간단한 PDF)
  const testPdfBase64 = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA0MTEK' +
    'L0ZpbHRlciBbL0ZsYXRlRGVjb2RlXQo+PgpzdHJlYW0KeAFLy08rVVBITEvNQVBITslMT1FIzstMyVZI' +
    'tsoGBAAA///1cwVQCmVuZHN0cmVhbQplbmRvYmoKCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1Bh' +
    'Z2VzIDIgMCBSCj4+CmVuZG9iagoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQov' +
    'Q291bnQgMQo+PgplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVz' +
    'b3VyY2VzIDw8Cj4+Ci9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyA0IDAgUgo+PgplbmRv' +
    'YmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAw' +
    'MjE5IDAwMDAwIG4gCjAwMDAwMDAyNzYgMDAwMDAgbiAKMDAwMDAwMDEwOSAwMDAwMCBuIAp0cmFpbGVy' +
    'Cjw8Ci9TaXplIDUKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjM4MAolJUVPRg==';
  
  const testData = {
    action: 'sendDiagnosisPdfEmail',
    폼타입: 'AI_진단결과_PDF발송_테스트',
    
    // 수신자 정보
    to_email: 'test@example.com',
    to_name: '테스트고객',
    company_name: 'PDF발송테스트기업',
    
    // PDF 첨부파일
    pdf_attachment: 'data:application/pdf;base64,' + testPdfBase64,
    pdf_filename: 'AI진단보고서_PDF발송테스트기업_테스트.pdf',
    
    // 이메일 내용
    diagnosis_date: getCurrentKoreanTime(),
    total_score: 85,
    overall_grade: 'B+',
    industry_type: 'IT/소프트웨어',
    
    // 컨설턴트 정보
    consultant_name: '이후경 교장 (경영지도사)',
    consultant_phone: '010-9251-9743',
    consultant_email: ADMIN_EMAIL,
    
    // 메타데이터
    제출일시: getCurrentKoreanTime(),
    timestamp: Date.now()
  };

  try {
    const result = processPdfEmailSending(testData);
    console.log('✅ PDF 이메일 발송 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ PDF 이메일 발송 테스트 실패:', error);
    throw error;
  }
}

// ================================================================================
// 📚 8. 설치 및 사용 가이드
// ================================================================================

/**
 * 📖 설치 가이드:
 * 
 * 1. Google Apps Script 에디터에서 Code.gs 파일 열기
 * 2. 기존 doPost 함수를 위의 수정된 버전으로 교체
 * 3. 위의 모든 새 함수들을 파일 끝에 추가
 * 4. 기존 setupHeaders 함수에 PDF 발송 기록 시트 처리 추가:
 *    } else if (type === 'pdfRecord') {
 *      setupHeadersForPdfRecord(sheet);
 *    } else {
 * 5. 저장 후 "배포" → "웹 앱으로 배포" → "새 배포" 생성
 * 6. testPdfEmailSending() 함수로 테스트 실행
 * 
 * 🧪 테스트 방법:
 * - Google Apps Script 에디터에서 testPdfEmailSending() 함수 실행
 * - 또는 웹에서 POST 요청으로 테스트
 * 
 * ✅ 해결되는 문제:
 * - sendDiagnosisPdfEmail 액션 처리 누락 → 추가됨
 * - Base64 PDF 데이터 처리 불가 → Base64 → Blob 변환 추가
 * - 신청자 PDF 이메일 발송 안됨 → sendPdfToUser 함수 추가
 * - 관리자 알림 없음 → 완료/오류 알림 추가
 * - 발송 기록 추적 불가 → PDF_발송기록 시트 추가
 * 
 * 🔔 주의사항:
 * - 기존 코드를 삭제하지 말고 추가/수정만 하세요
 * - 새 배포를 생성해야 변경사항이 적용됩니다
 * - PDF 파일 크기는 25MB 이하로 제한됩니다 (Gmail 첨부파일 제한)
 */ 
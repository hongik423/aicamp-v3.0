/**
 * ================================================================================
 * 🚨 AICAMP PDF 이메일 발송 최종 수정 - 2025.01.27
 * ================================================================================
 * 
 * 📌 문제: 프론트엔드에서 PDF 첨부 데이터를 보내지만 Google Apps Script에서 처리하지 않음
 * 🎯 해결: 기존 processDiagnosisForm 함수에 PDF 이메일 발송 기능 통합
 * 
 * 🔧 적용 방법:
 * 1. Google Apps Script 에디터에서 Code.gs 파일 열기
 * 2. 기존 processDiagnosisForm 함수를 아래 수정된 버전으로 교체
 * 3. sendPdfToUser 함수와 관련 함수들을 추가
 * 4. 저장 후 새 배포 생성
 */

// ================================================================================
// 🔧 1. 수정된 processDiagnosisForm 함수 (PDF 이메일 발송 통합)
// ================================================================================

/**
 * 🎯 진단신청 처리 함수 (PDF 이메일 발송 통합)
 * ⚠️ 기존 processDiagnosisForm 함수를 이 버전으로 완전히 교체하세요
 */
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

    // 🆕 PDF 첨부파일이 있는 경우 신청자에게 PDF 이메일 발송
    const pdfAttachment = data.pdf_attachment || data.pdfAttachment;
    let pdfEmailResult = null;
    
    if (pdfAttachment && pdfAttachment.length > 100) {
      console.log('📧 PDF 첨부파일 감지 - 신청자에게 PDF 이메일 발송 시작');
      
      // PDF 이메일 발송 데이터 준비
      const pdfEmailData = {
        to_email: data.이메일 || data.contactEmail || data.email,
        to_name: data.담당자명 || data.contactName || data.contactManager,
        company_name: data.회사명 || data.companyName,
        pdf_attachment: pdfAttachment,
        pdf_filename: `AI진단보고서_${data.회사명 || data.companyName}_${timestamp.replace(/[^\w가-힣]/g, '_')}.pdf`,
        total_score: totalScore,
        overall_grade: getGradeFromScore(totalScore),
        industry_type: data.업종 || data.industry,
        diagnosis_date: timestamp,
        consultant_name: '이후경 교장 (경영지도사)',
        consultant_phone: '010-9251-9743',
        consultant_email: ADMIN_EMAIL
      };
      
      // 신청자에게 PDF 이메일 발송
      pdfEmailResult = sendPdfEmailToUser(pdfEmailData);
      
      if (pdfEmailResult.success) {
        console.log('✅ 신청자 PDF 이메일 발송 성공');
        
        // PDF 발송 기록을 별도 시트에 저장
        savePdfSendingRecord(pdfEmailData, pdfEmailResult.sentTime);
        
        // 관리자에게 PDF 발송 완료 알림
        sendPdfNotificationToAdmin(pdfEmailData, pdfEmailResult.sentTime);
      } else {
        console.error('❌ 신청자 PDF 이메일 발송 실패:', pdfEmailResult.error);
        
        // 관리자에게 PDF 발송 실패 알림
        sendPdfErrorNotificationToAdmin(pdfEmailData, new Error(pdfEmailResult.error));
      }
    }

    // 관리자 이메일 발송 (기존 기능)
    if (AUTO_REPLY_ENABLED) {
      sendDiagnosisAdminNotification(data, newRow, totalScore, reportSummary);
      
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName || data.contactManager;
      
      // PDF 이메일을 보냈다면 일반 확인 이메일은 스킵
      if (!pdfEmailResult || !pdfEmailResult.success) {
        if (userEmail) {
          sendUserConfirmation(userEmail, userName, '진단');
        }
      }
    }

    // 응답 메시지 준비
    let responseMessage = '📊 AI 무료진단이 성공적으로 접수되었습니다 (문항별 점수 + 보고서 포함). 관리자 확인 후 연락드리겠습니다.';
    
    if (pdfEmailResult) {
      if (pdfEmailResult.success) {
        responseMessage = `📧 AI 무료진단이 접수되었으며, PDF 결과보고서가 ${data.이메일 || data.contactEmail}로 발송되었습니다. 이메일을 확인해주세요.`;
      } else {
        responseMessage = '📊 AI 무료진단이 접수되었습니다. PDF 이메일 발송에 일시적 문제가 있어 관리자가 직접 연락드리겠습니다.';
      }
    }

    return createSuccessResponse({
      message: responseMessage,
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: totalScore,
      추천서비스: reportSummary.length > 50 ? reportSummary.substring(0, 50) + '...' : reportSummary,
      // 🆕 PDF 이메일 발송 결과 포함
      pdfEmailSent: pdfEmailResult ? pdfEmailResult.success : false,
      pdfEmailError: pdfEmailResult && !pdfEmailResult.success ? pdfEmailResult.error : null
    });

  } catch (error) {
    console.error('❌ 진단신청 처리 오류:', error);
    return createErrorResponse('진단신청 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🆕 2. PDF 이메일 발송 관련 함수들 (신규 추가)
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

// ================================================================================
// 🔧 3. setupHeaders 함수에 추가할 PDF 발송 기록 시트 처리
// ================================================================================

/**
 * ⚠️ 기존 setupHeaders 함수의 else 조건에 다음을 추가하세요:
 * 
 * } else if (type === 'pdfRecord') {
 *   // PDF 발송 기록 헤더 (13개 컬럼)
 *   headers = [
 *     '발송일시', '수신자이메일', '수신자명', '회사명', 'PDF파일명',
 *     '파일크기', '진단점수', '등급', '업종', '진단일시',
 *     '발송상태', '담당자', '후속조치'
 *   ];
 *   
 *   // 📋 1행: 헤더 설정
 *   sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
 *   const headerRange = sheet.getRange(1, 1, 1, headers.length);
 *   
 *   // 🎨 PDF 발송 기록 전용 스타일링 (빨간색)
 *   headerRange.setBackground('#ff6b6b');
 *   headerRange.setFontColor('#ffffff');
 *   headerRange.setFontWeight('bold');
 *   headerRange.setHorizontalAlignment('center');
 *   headerRange.setVerticalAlignment('middle');
 *   headerRange.setWrap(true);
 *   sheet.setFrozenRows(1);
 *   
 *   // 📏 컬럼 폭 자동 조정
 *   sheet.autoResizeColumns(1, headers.length);
 *   
 * } else {
 */

// ================================================================================
// 📚 4. 설치 및 테스트 가이드
// ================================================================================

/**
 * 📖 설치 가이드:
 * 
 * 1. Google Apps Script 에디터에서 Code.gs 파일 열기
 * 2. 기존 processDiagnosisForm 함수를 위의 수정된 버전으로 완전히 교체
 * 3. sendPdfEmailToUser, getGradeFromScore, sendPdfNotificationToAdmin, 
 *    sendPdfErrorNotificationToAdmin, savePdfSendingRecord 함수들을 추가
 * 4. setupHeaders 함수에 PDF 발송 기록 시트 처리 추가
 * 5. 저장 후 "배포" → "웹 앱으로 배포" → "새 배포" 생성
 * 
 * 🧪 테스트 방법:
 * - 웹사이트에서 실제 진단 완료 후 PDF 이메일 발송 버튼 클릭
 * - 또는 다음 테스트 함수 실행:
 * 
 * function testPdfIntegratedDiagnosis() {
 *   const testData = {
 *     회사명: 'PDF통합테스트기업',
 *     담당자명: 'PDF테스트담당자',
 *     이메일: 'test@example.com',
 *     종합점수: 85,
 *     pdf_attachment: 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA0MTEK'
 *   };
 *   
 *   return processDiagnosisForm(testData);
 * }
 * 
 * ✅ 해결되는 문제:
 * - PDF 첨부 데이터가 무시되는 문제 → 감지하여 PDF 이메일 발송
 * - 신청자에게 PDF가 전송되지 않는 문제 → 자동 PDF 첨부 이메일 발송
 * - PDF 발송 기록이 없는 문제 → 별도 시트에 발송 기록 저장
 * - 관리자가 PDF 발송 여부를 모르는 문제 → 발송 완료/실패 알림
 * 
 * 🔔 주의사항:
 * - 기존 진단신청 처리 기능은 모두 유지됩니다
 * - PDF가 없으면 기존과 동일하게 처리됩니다
 * - PDF가 있으면 추가로 PDF 이메일을 발송합니다
 * - 새 배포를 생성해야 변경사항이 적용됩니다
 */ 
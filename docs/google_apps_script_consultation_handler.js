/**
 * 🏢 상담신청 처리 핸들러 - Google Apps Script
 * 
 * 기능:
 * 1. 상담신청 데이터 구글시트 저장
 * 2. 관리자에게 신청 알림 이메일 발송 (구글시트 링크 포함)
 * 3. 신청자에게 확인 이메일 발송
 * 
 * 사용법: docs/google_apps_script_simplified_NO_PDF.js 파일에 추가
 */

/**
 * 상담신청 처리 메인 함수
 * @param {Object} data - 상담신청 데이터
 * @returns {Object} 처리 결과
 */
function submitConsultation(data) {
  try {
    console.log('🏢 상담신청 처리 시작:', data.성명);
    
    // 1. 상담 ID 생성
    const consultationId = generateConsultationId(data.이메일);
    
    // 2. 구글시트에 데이터 저장
    const sheetsResult = saveConsultationToSheets(consultationId, data);
    
    // 3. 관리자에게 알림 이메일 발송
    if (data.sendEmails) {
      sendConsultationAdminNotification(data, consultationId);
      
      // 4. 신청자에게 확인 이메일 발송
      sendConsultationConfirmationEmail(data, consultationId);
    }
    
    return {
      success: true,
      consultationId: consultationId,
      message: '상담신청이 성공적으로 처리되었습니다',
      timestamp: getCurrentKoreanTime(),
      sheetsRowId: sheetsResult.rowId
    };
    
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    return {
      success: false,
      error: error.message,
      timestamp: getCurrentKoreanTime()
    };
  }
}

/**
 * 상담 ID 생성 (이메일 기반)
 * @param {string} email - 신청자 이메일
 * @returns {string} 상담 ID
 */
function generateConsultationId(email) {
  const emailPrefix = email.split('@')[0].toLowerCase();
  const timestamp = Date.now();
  return `CONS-${emailPrefix}-${timestamp}`;
}

/**
 * 상담신청 데이터를 구글시트에 저장
 * @param {string} consultationId - 상담 ID
 * @param {Object} data - 상담신청 데이터
 * @returns {Object} 저장 결과
 */
function saveConsultationToSheets(consultationId, data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('상담신청');
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet('상담신청');
      
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
      getCurrentKoreanTime(),              // 신청일시
      consultationId,                      // 상담ID
      data.상담유형 || '',                  // 상담유형
      data.성명 || '',                     // 성명
      data.연락처 || '',                   // 연락처
      data.이메일 || '',                   // 이메일
      data.회사명 || '',                   // 회사명
      data.직책 || '',                     // 직책
      data.상담분야 || '',                 // 상담분야
      data.문의내용 || '',                 // 문의내용
      data.희망상담시간 || '',             // 희망상담시간
      data.개인정보동의 || '미동의',       // 개인정보동의
      '신규신청',                          // 처리상태
      '이후경',                           // 담당자
      '',                                 // 상담일정
      '',                                 // 상담결과
      '',                                 // 후속조치
      '',                                 // 완료일시
      `API를 통한 자동 등록`               // 비고
    ];
    
    sheet.appendRow(rowData);
    const lastRow = sheet.getLastRow();
    
    console.log(`✅ 상담신청 데이터 저장 완료: ${consultationId} (행 ${lastRow})`);
    
    return {
      success: true,
      rowId: lastRow,
      sheetName: '상담신청'
    };
    
  } catch (error) {
    console.error('❌ 상담신청 시트 저장 오류:', error);
    throw new Error(`시트 저장 실패: ${error.message}`);
  }
}

/**
 * 관리자에게 상담신청 알림 이메일 발송
 * @param {Object} data - 상담신청 데이터
 * @param {string} consultationId - 상담 ID
 */
function sendConsultationAdminNotification(data, consultationId) {
  try {
    const subject = `[새로운 상담신청] ${data.회사명} - ${data.성명}님 (${data.상담유형})`;
    
    const googleSheetsUrl = data.googleSheetsUrl || 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit';
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">🏢 새로운 상담신청 알림</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">AICAMP 전문가 상담신청이 접수되었습니다</p>
        </div>
        
        <div style="padding: 30px 20px; background-color: #f8fafc;">
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- 긴급 처리 알림 -->
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #92400e; font-weight: bold;">⚡ 신속 처리 요청</p>
              <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">24시간 내 연락 진행 바랍니다</p>
            </div>
            
            <!-- 기본 정보 -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 12px; background: #f1f5f9; font-weight: bold; width: 120px; border: 1px solid #e2e8f0;">상담 ID</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">${consultationId}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f1f5f9; font-weight: bold; border: 1px solid #e2e8f0;">신청일시</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">${getCurrentKoreanTime()}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f1f5f9; font-weight: bold; border: 1px solid #e2e8f0;">상담유형</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;"><span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${data.상담유형}</span></td>
              </tr>
            </table>
            
            <!-- 신청자 정보 -->
            <h3 style="color: #1e293b; margin: 25px 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">👤 신청자 정보</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold; width: 120px;">성명</td>
                <td style="padding: 10px;"><strong>${data.성명}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold;">회사명</td>
                <td style="padding: 10px;">${data.회사명}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold;">직책</td>
                <td style="padding: 10px;">${data.직책 || '미기재'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold;">연락처</td>
                <td style="padding: 10px;"><a href="tel:${data.연락처}" style="color: #2563eb; text-decoration: none;">${data.연락처}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold;">이메일</td>
                <td style="padding: 10px;"><a href="mailto:${data.이메일}" style="color: #2563eb; text-decoration: none;">${data.이메일}</a></td>
              </tr>
            </table>
            
            <!-- 상담 상세 정보 -->
            <h3 style="color: #1e293b; margin: 25px 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">💼 상담 상세 정보</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold; width: 120px;">상담분야</td>
                <td style="padding: 10px;">${data.상담분야 || '미지정'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold;">희망시간</td>
                <td style="padding: 10px;">${data.희망상담시간 || '협의 후 결정'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: bold; vertical-align: top;">문의내용</td>
                <td style="padding: 10px; line-height: 1.6;">${(data.문의내용 || '').replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            
            <!-- 액션 버튼들 -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${googleSheetsUrl}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; font-weight: bold;">
                📊 구글시트에서 관리하기
              </a>
              <a href="tel:${data.연락처}" 
                 style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; font-weight: bold;">
                📞 즉시 전화하기
              </a>
            </div>
            
            <!-- 처리 가이드 -->
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #0c4a6e;">📋 처리 가이드</h4>
              <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; line-height: 1.6;">
                <li>24시간 내 1차 연락 (전화 우선)</li>
                <li>상담 일정 협의 및 확정</li>
                <li>구글시트에서 처리상태 업데이트</li>
                <li>상담 완료 후 후속조치 계획 수립</li>
              </ul>
            </div>
            
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
          <p>본 메일은 AICAMP 상담신청 시스템에서 자동 발송되었습니다.</p>
          <p>문의: hongik423@gmail.com | 전화: 010-9251-9743</p>
        </div>
      </div>
    `;
    
    GmailApp.sendEmail(
      data.adminEmail || ADMIN_EMAIL,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'AICAMP 상담신청 시스템'
      }
    );
    
    console.log('✅ 관리자 알림 이메일 발송 완료:', data.adminEmail || ADMIN_EMAIL);
    
  } catch (error) {
    console.error('❌ 관리자 알림 이메일 발송 오류:', error);
    // 이메일 발송 실패해도 전체 프로세스는 계속 진행
  }
}

/**
 * 신청자에게 상담신청 확인 이메일 발송
 * @param {Object} data - 상담신청 데이터
 * @param {string} consultationId - 상담 ID
 */
function sendConsultationConfirmationEmail(data, consultationId) {
  try {
    const subject = `[AICAMP] ${data.성명}님의 상담신청이 접수되었습니다`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">AICAMP</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">전문가 상담신청 접수완료</p>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f7f7f7;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333; margin: 0 0 20px 0;">안녕하세요, ${data.성명}님</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              AICAMP 전문가 상담신청이 정상적으로 접수되었습니다.<br>
              담당자가 <strong>24시간 내</strong>에 연락드리겠습니다.
            </p>
            
            <!-- 접수 정보 -->
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #0c4a6e;">📋 접수 정보</h3>
              <table style="width: 100%; line-height: 1.8;">
                <tr>
                  <td style="color: #374151; font-weight: bold; width: 100px;">상담 ID</td>
                  <td style="color: #1f2937;">${consultationId}</td>
                </tr>
                <tr>
                  <td style="color: #374151; font-weight: bold;">접수일시</td>
                  <td style="color: #1f2937;">${getCurrentKoreanTime()}</td>
                </tr>
                <tr>
                  <td style="color: #374151; font-weight: bold;">상담유형</td>
                  <td style="color: #1f2937;">${data.상담유형}</td>
                </tr>
                <tr>
                  <td style="color: #374151; font-weight: bold;">상담분야</td>
                  <td style="color: #1f2937;">${data.상담분야 || '협의 후 결정'}</td>
                </tr>
              </table>
            </div>
            
            <!-- 상담 프로세스 -->
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #92400e;">🔄 상담 진행 프로세스</h3>
              <div style="color: #92400e; line-height: 1.8;">
                <div style="margin-bottom: 8px;">1️⃣ <strong>24시간 내</strong> - 담당자 1차 연락</div>
                <div style="margin-bottom: 8px;">2️⃣ <strong>상담 일정 협의</strong> - 편리한 시간 조율</div>
                <div style="margin-bottom: 8px;">3️⃣ <strong>전문가 상담 진행</strong> - 맞춤형 솔루션 제공</div>
                <div>4️⃣ <strong>후속 지원</strong> - 지속적인 성장 파트너십</div>
              </div>
            </div>
            
            <!-- 상담 영역 안내 -->
            <div style="background: #f0fdf4; border: 1px solid #16a34a; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #15803d;">💡 AICAMP 전문 상담 영역</h3>
              <div style="color: #15803d; line-height: 1.6;">
                • <strong>AI 역량진단</strong> - 조직의 AI 준비도 정밀 분석<br>
                • <strong>AI 교육 프로그램</strong> - 실무진부터 경영진까지 맞춤 교육<br>
                • <strong>디지털 전환 컨설팅</strong> - 단계별 디지털화 로드맵<br>
                • <strong>정책자금 활용</strong> - AI/디지털 관련 정부지원 최적화<br>
                • <strong>사업화 지원</strong> - 기술사업화부터 투자유치까지
              </div>
            </div>
            
            <!-- 연락처 정보 -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
              <h3 style="margin: 0 0 15px 0; color: #1e293b;">📞 직접 연락</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>이후경 교장</strong> (AI CAMP 대표)</p>
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
      data.이메일,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'AICAMP 전문가 상담',
        replyTo: 'hongik423@gmail.com'
      }
    );
    
    console.log('✅ 신청자 확인 이메일 발송 완료:', data.이메일);
    
  } catch (error) {
    console.error('❌ 신청자 확인 이메일 발송 오류:', error);
    // 이메일 발송 실패해도 전체 프로세스는 계속 진행
  }
}

/**
 * 현재 한국 시간 반환
 * @returns {string} 한국 시간 문자열
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
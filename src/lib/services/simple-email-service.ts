/**
 * 간소화된 이메일 발송 서비스
 * GAS 지침에 따라 첨부된 결과보고서 확인만 안내
 */

export interface SimpleEmailConfig {
  to: string;
  companyName: string;
  contactName: string;
  reportPassword: string;
  diagnosisId: string;
  totalScore: number;
  grade: string;
  isAdmin?: boolean;
}

/**
 * 신청자용 간단한 확인 이메일 생성
 * "첨부한 결과보고서로 확인하라"는 사실만 통보
 */
export function generateApplicantEmail(config: SimpleEmailConfig): {
  subject: string;
  body: string;
} {
  const { companyName, contactName, reportPassword, diagnosisId, totalScore, grade } = config;
  
  const subject = `[AICAMP] ${companyName} AI 역량진단 결과 안내`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Malgun Gothic', sans-serif; 
      line-height: 1.6; 
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 30px;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .password-box {
      background: #fff;
      border: 2px solid #667eea;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .password {
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
      letter-spacing: 2px;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>AI 역량진단 결과 안내</h1>
    <p style="margin: 0;">AICAMP AI 진단 시스템 V15.0</p>
  </div>
  
  <div class="content">
    <p>안녕하세요, ${contactName}님</p>
    
    <p><strong>${companyName}</strong>의 AI 역량진단이 완료되었습니다.</p>
    
    <div class="password-box">
      <p style="margin: 5px 0;">진단 결과</p>
      <div class="password">${totalScore}점 (${grade}등급)</div>
      <p style="margin: 5px 0; font-size: 12px;">진단번호: ${diagnosisId}</p>
    </div>
    
    <p><strong>📎 첨부된 HTML 보고서 파일을 다운로드하여 상세 내용을 확인하세요.</strong></p>
    
    <p>보고서 열람 비밀번호:</p>
    <div class="password-box">
      <div class="password">${reportPassword}</div>
    </div>
    
    <p style="color: #666; font-size: 14px;">
      ※ 보고서는 HTML 형식으로 제공되며, 웹 브라우저에서 열어보시면 됩니다.<br>
      ※ 추가 문의사항은 아래 연락처로 문의해 주세요.
    </p>
  </div>
  
  <div class="footer">
    <p>
      <strong>AICAMP</strong><br>
      이후경 교장 | 010-9251-9743<br>
      hongik423@gmail.com | aicamp.club<br>
      <br>
      © 2024 AICAMP. All rights reserved.
    </p>
  </div>
</body>
</html>
  `.trim();
  
  return { subject, body };
}

/**
 * 관리자용 간단한 알림 이메일 생성
 */
export function generateAdminEmail(config: SimpleEmailConfig): {
  subject: string;
  body: string;
} {
  const { companyName, contactName, diagnosisId, totalScore, grade } = config;
  
  const subject = `[진단완료] ${companyName} - ${totalScore}점 (${grade}등급)`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Malgun Gothic', sans-serif; 
      line-height: 1.6; 
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #28a745;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .info-table th {
      background: #f8f9fa;
      padding: 10px;
      text-align: left;
      border: 1px solid #dee2e6;
      width: 30%;
    }
    .info-table td {
      padding: 10px;
      border: 1px solid #dee2e6;
    }
    .score-badge {
      display: inline-block;
      padding: 5px 15px;
      background: #007bff;
      color: white;
      border-radius: 20px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">AI 역량진단 완료 알림</h2>
  </div>
  
  <table class="info-table">
    <tr>
      <th>회사명</th>
      <td><strong>${companyName}</strong></td>
    </tr>
    <tr>
      <th>담당자</th>
      <td>${contactName}</td>
    </tr>
    <tr>
      <th>진단번호</th>
      <td>${diagnosisId}</td>
    </tr>
    <tr>
      <th>진단결과</th>
      <td>
        <span class="score-badge">${totalScore}점</span>
        <span class="score-badge" style="background: #28a745;">${grade}등급</span>
      </td>
    </tr>
    <tr>
      <th>진단일시</th>
      <td>${new Date().toLocaleString('ko-KR')}</td>
    </tr>
  </table>
  
  <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
    ✅ 진단 완료 및 보고서 발송 완료<br>
    ✅ Google Drive 저장 완료<br>
    ✅ 신청자 이메일 발송 완료
  </p>
  
  <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
    AICAMP AI 역량진단 시스템 V15.0
  </p>
</body>
</html>
  `.trim();
  
  return { subject, body };
}

/**
 * Google Apps Script용 이메일 발송 함수 템플릿
 * 간소화된 버전 - 확인 메일만 발송
 */
export function generateGASEmailFunction(): string {
  return `
/**
 * 간소화된 이메일 발송 함수
 * 첨부된 보고서 확인 안내만 발송
 */
function sendSimpleDiagnosisEmails(data) {
  try {
    console.log('📧 간소화된 이메일 발송 시작');
    
    // 보고서 비밀번호 생성
    const reportPassword = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // HTML 보고서 생성
    const htmlReport = data.htmlReport || generateHTMLReport(data);
    
    // 보고서를 Blob으로 변환
    const reportBlob = Utilities.newBlob(htmlReport, 'text/html', 
      \`AI역량진단보고서_\${data.companyName}_\${data.diagnosisId}.html\`);
    
    // 1. 신청자 이메일 발송
    const applicantSubject = \`[AICAMP] \${data.companyName} AI 역량진단 결과 안내\`;
    const applicantBody = \`
      <p>안녕하세요, \${data.contactName}님</p>
      <p><strong>\${data.companyName}</strong>의 AI 역량진단이 완료되었습니다.</p>
      <p>진단 결과: <strong>\${data.totalScore}점 (\${data.grade}등급)</strong></p>
      <p>📎 첨부된 HTML 보고서 파일을 확인해 주세요.</p>
      <p>보고서 비밀번호: <strong>\${reportPassword}</strong></p>
      <hr>
      <p>문의: 010-9251-9743 (이후경 교장)</p>
    \`;
    
    MailApp.sendEmail({
      to: data.contactEmail,
      subject: applicantSubject,
      htmlBody: applicantBody,
      attachments: [reportBlob]
    });
    
    console.log('✅ 신청자 이메일 발송 완료:', data.contactEmail);
    
    // 2. 관리자 알림 이메일
    const adminSubject = \`[진단완료] \${data.companyName} - \${data.totalScore}점\`;
    const adminBody = \`
      <p>AI 역량진단 완료</p>
      <ul>
        <li>회사: \${data.companyName}</li>
        <li>담당자: \${data.contactName}</li>
        <li>점수: \${data.totalScore}점 (\${data.grade}등급)</li>
        <li>진단ID: \${data.diagnosisId}</li>
      </ul>
    \`;
    
    MailApp.sendEmail({
      to: 'hongik423@gmail.com',
      subject: adminSubject,
      htmlBody: adminBody
    });
    
    console.log('✅ 관리자 알림 발송 완료');
    
    return {
      success: true,
      reportPassword: reportPassword,
      emailsSent: true,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}
  `.trim();
}

/**
 * 이메일 발송 서비스 메인 함수
 */
export async function sendDiagnosisEmail(config: SimpleEmailConfig): Promise<{
  success: boolean;
  applicantEmail?: any;
  adminEmail?: any;
  error?: string;
}> {
  try {
    // 신청자 이메일 생성
    const applicantEmail = generateApplicantEmail(config);
    
    // 관리자 이메일 생성
    const adminEmail = generateAdminEmail({
      ...config,
      isAdmin: true
    });
    
    // 실제 발송은 Google Apps Script에서 처리
    console.log('📧 이메일 템플릿 생성 완료');
    
    return {
      success: true,
      applicantEmail,
      adminEmail
    };
    
  } catch (error) {
    console.error('❌ 이메일 생성 실패:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

export default {
  generateApplicantEmail,
  generateAdminEmail,
  generateGASEmailFunction,
  sendDiagnosisEmail
};

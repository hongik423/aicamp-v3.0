import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  type: string;
  data: any;
}

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
  },
});

// 이메일 발송
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const { to, subject, type, data } = options;
    
    // 이메일 템플릿 생성
    const htmlContent = generateEmailTemplate(type, data);
    
    const mailOptions = {
      from: `AICAMP <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ 이메일 발송 완료: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    return false;
  }
}

// 이메일 템플릿 생성
function generateEmailTemplate(type: string, data: any): string {
  const baseStyle = `
    <style>
      body { font-family: 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #1e40af; color: white; padding: 30px; text-align: center; }
      .content { background-color: #f9fafb; padding: 30px; margin-top: 20px; }
      .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      .button { background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
      .highlight { background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
      th { background-color: #f3f4f6; font-weight: bold; }
    </style>
  `;

  switch (type) {
    case 'userConfirmation':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>AICAMP AI 경영진단 신청 확인</h1>
          </div>
          <div class="content">
            <h2>안녕하세요, ${data.companyName} ${data.contactManager}님!</h2>
            <p>AICAMP AI 경영진단 신청이 성공적으로 접수되었습니다.</p>
            
            <div class="highlight">
              <strong>진단 ID:</strong> ${data.diagnosisId}<br>
              <strong>예상 소요 시간:</strong> 5-10분
            </div>
            
            <p>AI 분석이 완료되면 이메일로 결과를 안내해드리겠습니다.</p>
            
            <p>문의사항이 있으시면 언제든지 연락주세요.</p>
            <ul>
              <li>📧 이메일: aicamp@aicamp.co.kr</li>
              <li>📞 전화: 02-1234-5678</li>
            </ul>
          </div>
          <div class="footer">
            <p>© 2025 AICAMP. All rights reserved.</p>
          </div>
        </div>
      `;

    case 'diagnosisResult':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>AI 경영진단 결과 안내</h1>
          </div>
          <div class="content">
            <h2>${data.companyName} ${data.contactManager}님의 AI 경영진단 결과</h2>
            
            <div class="highlight">
              <h3>종합 점수: ${data.totalScore}점</h3>
              <p><strong>산업:</strong> ${data.industry}</p>
              <p><strong>전략 방향:</strong> ${data.strategicDirection}</p>
            </div>
            
            <h3>핵심 분석 결과</h3>
            <p>${data.aiReport}</p>
            
            <p>더 자세한 분석과 맞춤형 컨설팅을 원하시면 아래 버튼을 클릭해주세요.</p>
            
            <center>
              <a href="https://aicamp.co.kr/consultation" class="button">무료 상담 신청하기</a>
            </center>
          </div>
          <div class="footer">
            <p>© 2025 AICAMP. All rights reserved.</p>
          </div>
        </div>
      `;

    case 'consultationConfirmation':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>AICAMP 상담 신청 확인</h1>
          </div>
          <div class="content">
            <h2>안녕하세요, ${data.companyName} ${data.contactManager}님!</h2>
            <p>상담 신청이 성공적으로 접수되었습니다.</p>
            
            <table>
              <tr>
                <th>항목</th>
                <th>내용</th>
              </tr>
              <tr>
                <td>상담 분야</td>
                <td>${data.consultingArea}</td>
              </tr>
              <tr>
                <td>희망 일자</td>
                <td>${data.desiredDate}</td>
              </tr>
              <tr>
                <td>희망 시간</td>
                <td>${data.desiredTime}</td>
              </tr>
              <tr>
                <td>상담 방식</td>
                <td>${data.desiredFormat}</td>
              </tr>
            </table>
            
            <p>영업일 기준 1-2일 이내에 담당자가 연락드릴 예정입니다.</p>
          </div>
          <div class="footer">
            <p>© 2025 AICAMP. All rights reserved.</p>
          </div>
        </div>
      `;

    case 'betaFeedbackConfirmation':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>AICAMP 베타 피드백 감사합니다!</h1>
          </div>
          <div class="content">
            <h2>안녕하세요, ${data.name}님!</h2>
            <p>소중한 피드백을 남겨주셔서 진심으로 감사드립니다.</p>
            
            <div class="highlight">
              <p><strong>평점:</strong> ${data.rating}/5</p>
              <p><strong>피드백:</strong> ${data.feedback}</p>
            </div>
            
            <p>고객님의 의견은 AICAMP 서비스 개선에 큰 도움이 됩니다.</p>
            <p>더 나은 서비스로 보답하겠습니다.</p>
          </div>
          <div class="footer">
            <p>© 2025 AICAMP. All rights reserved.</p>
          </div>
        </div>
      `;

    case 'adminNotification':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>새로운 진단 신청 알림</h1>
          </div>
          <div class="content">
            <h2>신규 진단 신청 정보</h2>
            
            <table>
              ${Object.entries(data).map(([key, value]) => `
                <tr>
                  <td><strong>${key}</strong></td>
                  <td>${value}</td>
                </tr>
              `).join('')}
            </table>
            
            <p>관리자 대시보드에서 상세 정보를 확인하세요.</p>
          </div>
        </div>
      `;

    case 'consultationAdminNotification':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>새로운 상담 신청 알림</h1>
          </div>
          <div class="content">
            <h2>상담 신청 정보</h2>
            
            <div class="highlight">
              <p><strong>기업명:</strong> ${data.companyName}</p>
              <p><strong>담당자:</strong> ${data.contactManager}</p>
              <p><strong>상담 분야:</strong> ${data.consultingArea}</p>
              <p><strong>긴급도:</strong> ${data.urgency}</p>
            </div>
            
            <table>
              <tr>
                <td><strong>연락처</strong></td>
                <td>${data.phone}</td>
              </tr>
              <tr>
                <td><strong>이메일</strong></td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td><strong>희망 일시</strong></td>
                <td>${data.desiredDate} ${data.desiredTime}</td>
              </tr>
              <tr>
                <td><strong>현재 이슈</strong></td>
                <td>${data.currentIssues}</td>
              </tr>
            </table>
            
            <p>관리자 대시보드에서 확인 가능합니다.</p>
          </div>
        </div>
      `;

    case 'betaFeedbackAdminNotification':
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>새로운 베타 피드백</h1>
          </div>
          <div class="content">
            <h2>피드백 정보</h2>
            
            <div class="highlight">
              <p><strong>작성자:</strong> ${data.name}</p>
              <p><strong>평점:</strong> ${data.rating}/5 ${'⭐'.repeat(parseInt(data.rating))}</p>
            </div>
            
            <h3>피드백 내용</h3>
            <p>${data.feedback}</p>
            
            ${data.improvements ? `
              <h3>개선 제안</h3>
              <p>${data.improvements}</p>
            ` : ''}
            
            ${data.testimonial ? `
              <h3>추천사</h3>
              <p>${data.testimonial}</p>
            ` : ''}
            
            <p>관리자 대시보드에서 확인 가능합니다.</p>
          </div>
        </div>
      `;

    default:
      return `
        ${baseStyle}
        <div class="container">
          <div class="header">
            <h1>AICAMP 알림</h1>
          </div>
          <div class="content">
            <p>새로운 알림이 있습니다.</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
          <div class="footer">
            <p>© 2025 AICAMP. All rights reserved.</p>
          </div>
        </div>
      `;
  }
}
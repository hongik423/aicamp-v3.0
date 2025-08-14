import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('📧 이메일 시스템 테스트 시작');
    
    const { to, subject, type } = await request.json();
    
    if (!to || !subject) {
      return NextResponse.json({
        success: false,
        error: '이메일 주소와 제목이 필요합니다.'
      }, { status: 400 });
    }

    // 환경변수 확인
    const emailConfig = {
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT || '587',
      smtpUser: process.env.SMTP_USER,
      smtpPass: !!process.env.SMTP_PASS // 비밀번호는 존재 여부만 확인
    };

    if (!emailConfig.smtpHost || !emailConfig.smtpUser || !process.env.SMTP_PASS) {
      return NextResponse.json({
        success: false,
        error: '이메일 SMTP 설정이 완료되지 않았습니다.',
        missing: {
          smtpHost: !emailConfig.smtpHost,
          smtpUser: !emailConfig.smtpUser,
          smtpPass: !process.env.SMTP_PASS
        },
        recommendation: 'SMTP_HOST, SMTP_USER, SMTP_PASS 환경변수를 설정하세요.'
      }, { status: 500 });
    }

    // 실제 이메일 발송은 하지 않고 시뮬레이션
    const emailData = {
      to,
      subject,
      type: type || 'test',
      timestamp: new Date().toISOString(),
      config: {
        host: emailConfig.smtpHost,
        port: emailConfig.smtpPort,
        user: emailConfig.smtpUser,
        secure: emailConfig.smtpPort === '465'
      }
    };

    // 이메일 템플릿별 내용 생성
    let emailContent = '';
    switch (type) {
      case 'diagnosis_confirmation':
        emailContent = generateDiagnosisConfirmationEmail();
        break;
      case 'diagnosis_result':
        emailContent = generateDiagnosisResultEmail();
        break;
      case 'admin_notification':
        emailContent = generateAdminNotificationEmail();
        break;
      default:
        emailContent = generateTestEmail();
    }

    console.log('✅ 이메일 시스템 테스트 완료 (시뮬레이션)');

    return NextResponse.json({
      success: true,
      message: '이메일 시스템 테스트 완료 (실제 발송하지 않음)',
      emailData,
      emailContent: emailContent.substring(0, 200) + '...', // 일부만 표시
      simulation: true,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ 이메일 시스템 테스트 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

function generateDiagnosisConfirmationEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI 역량진단 신청 접수 확인</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <h2 style="color: #3b82f6;">AI 역량진단 신청이 접수되었습니다</h2>
    <p>안녕하세요,</p>
    <p>귀하의 AI 역량진단 신청이 성공적으로 접수되었습니다.</p>
    <p>진단 결과는 처리 완료 후 이메일로 발송될 예정입니다.</p>
    <p>감사합니다.</p>
    <hr>
    <p><strong>AICAMP AI 역량진단 시스템</strong></p>
    <p>문의: support@aicamp.club</p>
  </div>
</body>
</html>`;
}

function generateDiagnosisResultEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI 역량진단 결과</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <h2 style="color: #10b981;">AI 역량진단 결과가 완료되었습니다</h2>
    <p>안녕하세요,</p>
    <p>요청하신 AI 역량진단이 완료되었습니다.</p>
    <p>상세한 진단 결과 보고서를 첨부파일로 확인하시기 바랍니다.</p>
    <p>추가 상담이 필요하시면 언제든 연락주세요.</p>
    <p>감사합니다.</p>
    <hr>
    <p><strong>AICAMP AI 역량진단 시스템</strong></p>
    <p>문의: support@aicamp.club</p>
  </div>
</body>
</html>`;
}

function generateAdminNotificationEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>새로운 AI 역량진단 신청</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <h2 style="color: #f59e0b;">새로운 AI 역량진단 신청</h2>
    <p>관리자님,</p>
    <p>새로운 AI 역량진단 신청이 접수되었습니다.</p>
    <p>관리자 대시보드에서 확인하시기 바랍니다.</p>
    <hr>
    <p><strong>AICAMP AI 역량진단 시스템</strong></p>
  </div>
</body>
</html>`;
}

function generateTestEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>이메일 시스템 테스트</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <h2 style="color: #6366f1;">이메일 시스템 테스트</h2>
    <p>이 이메일은 AICAMP AI 역량진단 시스템의 이메일 기능 테스트입니다.</p>
    <p>시간: ${new Date().toLocaleString('ko-KR')}</p>
    <p>상태: 정상 작동</p>
    <hr>
    <p><strong>AICAMP AI 역량진단 시스템</strong></p>
  </div>
</body>
</html>`;
}

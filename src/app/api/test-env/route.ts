import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 환경변수 상태 확인 (보안상 실제 값은 노출하지 않음)
    const envStatus = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      
      // GEMINI API 설정
      gemini: {
        apiKey: !!process.env.GEMINI_API_KEY,
        keyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
        configured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 20
      },
      
      // Google Apps Script 설정
      googleScript: {
        url: !!process.env.GOOGLE_SCRIPT_URL,
        urlValid: !!process.env.GOOGLE_SCRIPT_URL && process.env.GOOGLE_SCRIPT_URL.includes('script.google.com'),
        configured: !!process.env.GOOGLE_SCRIPT_URL
      },
      
      // Google 서비스 계정 설정
      googleServiceAccount: {
        email: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        privateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        sheetsId: !!process.env.GOOGLE_SHEETS_ID,
        configured: !!(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 
                     process.env.GOOGLE_PRIVATE_KEY && 
                     process.env.GOOGLE_SHEETS_ID)
      },
      
      // 이메일 설정
      email: {
        smtpHost: !!process.env.SMTP_HOST,
        smtpUser: !!process.env.SMTP_USER,
        smtpPass: !!process.env.SMTP_PASS,
        configured: !!(process.env.SMTP_HOST && 
                      process.env.SMTP_USER && 
                      process.env.SMTP_PASS)
      },
      
      // 애플리케이션 설정
      application: {
        appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
        debug: process.env.DEBUG === 'true' || process.env.NEXT_PUBLIC_DEBUG === 'true'
      }
    };

    // 전체 구성 상태 평가
    const overallStatus = {
      geminiReady: envStatus.gemini.configured,
      googleScriptReady: envStatus.googleScript.configured,
      googleSheetsReady: envStatus.googleServiceAccount.configured,
      emailReady: envStatus.email.configured,
      allSystemsReady: envStatus.gemini.configured && 
                      envStatus.googleScript.configured && 
                      envStatus.googleServiceAccount.configured &&
                      envStatus.email.configured
    };

    return NextResponse.json({
      status: overallStatus.allSystemsReady ? 'ready' : 'incomplete',
      ...envStatus,
      overall: overallStatus,
      recommendations: generateRecommendations(envStatus)
    });

  } catch (error: any) {
    console.error('Environment test error:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
}

function generateRecommendations(envStatus: any): string[] {
  const recommendations = [];
  
  if (!envStatus.gemini.configured) {
    recommendations.push('GEMINI_API_KEY를 설정하세요. Google AI Studio에서 API 키를 발급받으세요.');
  }
  
  if (!envStatus.googleScript.configured) {
    recommendations.push('GOOGLE_SCRIPT_URL을 설정하세요. Google Apps Script 웹앱 URL이 필요합니다.');
  }
  
  if (!envStatus.googleServiceAccount.configured) {
    recommendations.push('Google 서비스 계정 설정을 완료하세요. (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEETS_ID)');
  }
  
  if (!envStatus.email.configured) {
    recommendations.push('이메일 SMTP 설정을 완료하세요. (SMTP_HOST, SMTP_USER, SMTP_PASS)');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('모든 환경변수가 올바르게 설정되었습니다! 🎉');
  }
  
  return recommendations;
}
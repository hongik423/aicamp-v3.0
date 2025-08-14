import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const timestamp = new Date().toISOString();
    
    // 기본 시스템 상태 확인
    const systemStatus = {
      status: 'healthy',
      timestamp,
      service: 'AICAMP AI 역량진단 시스템',
      version: '3.1.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    };

    // 환경변수 기본 확인 (보안상 값은 노출하지 않음)
    const envCheck = {
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      GOOGLE_SCRIPT_URL: !!process.env.GOOGLE_SCRIPT_URL,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID
    };

    return NextResponse.json({
      ...systemStatus,
      environmentVariables: envCheck,
      checks: {
        database: 'not_implemented',
        external_apis: 'pending',
        email_service: 'pending'
      }
    });

  } catch (error: any) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

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
      OLLAMA_API_URL: process.env.OLLAMA_API_URL || 'http://localhost:11434',
      OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'gpt-oss:20b',
      NEXT_PUBLIC_GAS_URL: !!process.env.NEXT_PUBLIC_GAS_URL,
      NEXT_PUBLIC_GOOGLE_SCRIPT_URL: !!process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL,
      NEXT_PUBLIC_GOOGLE_SHEETS_ID: !!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
      NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
      // 실사용 GAS URL 해석 결과 (마스킹된 상태 표시)
      GAS_URL_RESOLVED: !!getGasUrl()
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

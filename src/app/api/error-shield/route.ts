import { NextRequest, NextResponse } from 'next/server';

// 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 - 중앙 집중식 오류 모니터링
export async function GET(request: NextRequest) {
  const shieldStatus = {
    name: '🛡️ 이교장의AI역량진단보고서 오류 차단 시스템',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    protections: {
      manifest_401: 'active',
      service_worker_runtime: 'active', 
      message_port_closed: 'active',
      chrome_extension_errors: 'active',
      fetch_failures: 'active'
    },
    endpoints: {
      manifest: '/api/manifest',
      health: '/api/health',
      system_health: '/api/system-health'
    },
    domains: {
      production: 'https://aicamp.club',
      test: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    }
  };

  return NextResponse.json(shieldStatus, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'X-Error-Shield': 'monitoring-active'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const errorReport = await request.json();
    
    // 오류 로그 기록
    console.log('🛡️ 오류 차단 시스템 - 오류 보고 수신:', {
      timestamp: new Date().toISOString(),
      error: errorReport,
      userAgent: request.headers.get('user-agent'),
      url: request.url
    });

    return NextResponse.json({
      received: true,
      timestamp: new Date().toISOString(),
      shield_status: 'processing'
    });

  } catch (error) {
    console.error('🛡️ 오류 차단 시스템 - 보고 처리 실패:', error);
    
    return NextResponse.json({
      received: false,
      error: 'Failed to process error report',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

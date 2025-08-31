import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AICAMP v3.0',
    message: '서버가 정상적으로 실행 중입니다.'
  });
}
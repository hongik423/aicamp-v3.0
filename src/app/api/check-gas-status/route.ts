// src/app/api/check-gas-status/route.ts

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const gasUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!gasUrl) {
    return NextResponse.json({ 
      error: 'Google Apps Script URL이 설정되지 않았습니다.' 
    }, { status: 500 });
  }

  try {
    console.log(`📡 현재 배포된 Google Apps Script 상태 확인: ${gasUrl}`);
    const response = await fetch(gasUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // 캐시를 사용하지 않음
    });
    
    // fetch가 리디렉션을 자동으로 따르므로, 최종 응답을 기다립니다.
    const data = await response.json();

    console.log('🛰️ Google Apps Script 응답:', data);

    return NextResponse.json({
      success: true,
      gasStatus: data,
    });

  } catch (error: any) {
    console.error('❌ Google Apps Script 상태 확인 실패:', error);
    return NextResponse.json({
      success: false,
      error: 'Google Apps Script에 연결할 수 없습니다. 스크립트가 배포되었는지 확인해주세요.',
      details: error.message,
    }, { status: 500 });
  }
} 
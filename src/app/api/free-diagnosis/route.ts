/**
 * AICAMP AI 역량진단 API 엔드포인트
 * Google Apps Script와 연동하여 진단 신청을 처리합니다
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📥 Free diagnosis API route - 요청 수신:', body);

    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL;
    if (!gasUrl) {
      return NextResponse.json(
        { success: false, error: 'Google Apps Script URL이 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    // Google Apps Script로 요청 전달 (개선된 헤더)
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'AICAMP-NextJS-API/1.0'
      },
      body: JSON.stringify({
        action: 'submitFreeDiagnosis',
        data: body
      })
    });

    if (!response.ok) {
      console.error('Google Apps Script 응답 오류:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, error: `GAS 응답 오류: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('✅ Google Apps Script 응답 성공:', result);

    return NextResponse.json(result, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('❌ Free diagnosis API 오류:', error);
    return NextResponse.json(
      { success: false, error: '진단 신청 처리 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}
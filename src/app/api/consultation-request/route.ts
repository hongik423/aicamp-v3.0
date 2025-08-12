import { NextRequest, NextResponse } from 'next/server';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || '';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 데이터 유효성 검사
    if (!data.email || !data.name || !data.company) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      );
    }

    // Google Apps Script로 전송
    const gasPayload = {
      action: 'consultationRequest',
      timestamp: new Date().toISOString(),
      ...data
    };

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasPayload)
    });

    if (!response.ok) {
      throw new Error(`GAS responded with status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        consultationId: result.consultationId,
        message: '상담 신청이 접수되었습니다. 곧 연락드리겠습니다.'
      });
    } else {
      throw new Error(result.error || '상담 신청 처리 중 오류가 발생했습니다');
    }
  } catch (error) {
    console.error('Consultation request error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

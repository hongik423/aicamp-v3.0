import { NextRequest, NextResponse } from 'next/server';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || '';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 데이터 유효성 검사
    if (!data.reporterEmail || !data.errorDescription) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      );
    }

    // Google Apps Script로 전송
    const gasPayload = {
      action: 'errorReport',
      timestamp: new Date().toISOString(),
      reporterEmail: data.reporterEmail,
      reporterName: data.reporterName || '익명',
      errorType: data.errorType || '기타',
      errorDescription: data.errorDescription,
      pageUrl: data.pageUrl || '',
      browserInfo: data.browserInfo || '',
      severityLevel: data.severityLevel || '보통',
      screenshotUrl: data.screenshotUrl || '',
      reproductionSteps: data.reproductionSteps || ''
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
        reportId: result.reportId,
        message: '오류 신고가 접수되었습니다. 빠르게 확인하여 조치하겠습니다.'
      });
    } else {
      throw new Error(result.error || '오류 신고 처리 중 문제가 발생했습니다');
    }
  } catch (error) {
    console.error('Error report submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '오류 신고 중 문제가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET 요청 처리 - 진단 상태 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const diagnosisId = searchParams.get('diagnosisId');

    if (!diagnosisId) {
      return NextResponse.json(
        { 
          success: false, 
          error: '진단 ID가 필요합니다' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('🔍 진단 상태 조회:', diagnosisId);

    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX/exec';

    // Google Apps Script에서 진단 상태 조회
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      const scriptResponse = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getStatus&diagnosisId=${diagnosisId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!scriptResponse.ok) {
        console.warn('❌ Google Apps Script 상태 조회 실패:', scriptResponse.status);
        // 실패 시 기본 상태 반환
        return NextResponse.json(
          {
            success: true,
            status: 'processing',
            progress: 50,
            message: '진단이 진행 중입니다. 잠시만 기다려주세요.',
            currentStep: 'ai_analysis',
            estimatedTimeRemaining: '3-5분'
          },
          { headers: corsHeaders }
        );
      }

      const result = await scriptResponse.json();
      
      if (result.success) {
        console.log('✅ 진단 상태 조회 성공:', result.data);
        
        return NextResponse.json(
          {
            success: true,
            ...result.data
          },
          { headers: corsHeaders }
        );
      } else {
        console.warn('⚠️ Google Apps Script에서 오류 응답:', result.error);
        
        // 오류 시에도 진행 중 상태로 처리 (사용자 경험 향상)
        return NextResponse.json(
          {
            success: true,
            status: 'processing',
            progress: 30,
            message: '진단 분석이 진행 중입니다.',
            currentStep: 'ai_analysis',
            estimatedTimeRemaining: '5-7분'
          },
          { headers: corsHeaders }
        );
      }

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.warn('🔄 Google Apps Script 연결 실패, 기본 상태 반환:', fetchError);
      
      // 연결 실패 시에도 진행 중 상태로 처리
      return NextResponse.json(
        {
          success: true,
          status: 'processing',
          progress: 40,
          message: '진단이 계속 진행 중입니다. 결과는 이메일로 발송됩니다.',
          currentStep: 'ai_analysis',
          estimatedTimeRemaining: '3-5분',
          note: '서버 상태 확인 중 일시적 지연이 있을 수 있습니다.'
        },
        { headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('진단 상태 조회 API 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '서버 오류가 발생했습니다',
        status: 'error'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
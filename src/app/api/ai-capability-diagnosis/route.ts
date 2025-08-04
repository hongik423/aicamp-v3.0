import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbyZQpjTdXQ7hDWFlhMO0XAH_W-Jf-tRgYs8EZnGX9O0HkJdcGGhxGa3BXJSCBJnCUZb/exec';

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST 요청 처리 - 진단 신청
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.companyName || !body.email || !body.applicantName) {
      return NextResponse.json(
        { 
          success: false, 
          error: '필수 정보가 누락되었습니다' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // AI 역량 평가 응답 검증
    if (!body.assessmentResponses || Object.keys(body.assessmentResponses).length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI 역량 평가가 완료되지 않았습니다' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // 진단 ID 생성
    const diagnosisId = `ACD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Google Apps Script로 데이터 전송
    const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        diagnosisId,
        formType: 'ai-capability-diagnosis',
        submittedAt: new Date().toISOString()
      })
    });

    if (!scriptResponse.ok) {
      throw new Error(`Google Apps Script 오류: ${scriptResponse.status}`);
    }

    const scriptResult = await scriptResponse.json();
    
    if (scriptResult.success) {
      return NextResponse.json(
        { 
          success: true, 
          diagnosisId,
          message: 'AI 역량진단이 시작되었습니다'
        },
        { headers: corsHeaders }
      );
    } else {
      throw new Error(scriptResult.error || '진단 처리 중 오류 발생');
    }

  } catch (error) {
    console.error('AI 역량진단 API 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '서버 오류가 발생했습니다' 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET 요청 처리 - 진단 결과 조회
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

    // Google Apps Script에서 결과 조회
    const scriptResponse = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?diagnosisId=${diagnosisId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!scriptResponse.ok) {
      if (scriptResponse.status === 404) {
        return NextResponse.json(
          { 
            success: false, 
            error: '진단 결과를 찾을 수 없습니다' 
          },
          { status: 404, headers: corsHeaders }
        );
      }
      throw new Error(`Google Apps Script 오류: ${scriptResponse.status}`);
    }

    const result = await scriptResponse.json();
    
    return NextResponse.json(
      { 
        success: true, 
        data: result.data 
      },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('진단 결과 조회 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '서버 오류가 발생했습니다' 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
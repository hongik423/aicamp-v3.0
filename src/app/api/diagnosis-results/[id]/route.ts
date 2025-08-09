import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

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

// GET 요청 처리 - 진단 결과 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: diagnosisId } = await params;
    
    if (!diagnosisId) {
      return NextResponse.json(
        { 
          success: false, 
          error: '진단 ID가 필요합니다' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('🔍 진단 결과 조회 요청:', diagnosisId);

    const GOOGLE_SCRIPT_URL = getGasUrl();

    if (!GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Google Apps Script 설정이 필요합니다' 
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Google Apps Script에서 결과 조회
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      console.log('🔗 Google Apps Script 요청 URL:', `${GOOGLE_SCRIPT_URL}?diagnosisId=${encodeURIComponent(diagnosisId)}&action=getResult`);
      
      const scriptResponse = await fetch(`${GOOGLE_SCRIPT_URL}?diagnosisId=${encodeURIComponent(diagnosisId)}&action=getResult`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('📡 Google Apps Script 응답 상태:', scriptResponse.status, scriptResponse.statusText);

      if (!scriptResponse.ok) {
        // 응답 본문 읽기 시도
        let errorBody = '';
        try {
          errorBody = await scriptResponse.text();
          console.log('❌ Google Apps Script 오류 응답:', errorBody);
        } catch (e) {
          console.log('❌ 응답 본문을 읽을 수 없음');
        }

        if (scriptResponse.status === 404) {
          return NextResponse.json(
            { 
              success: false, 
              error: '진단 결과를 찾을 수 없습니다',
              details: `진단 ID: ${diagnosisId}에 해당하는 데이터가 Google Sheets에 없습니다.`,
              diagnosisId: diagnosisId,
              suggestion: '진단을 다시 실행하거나 올바른 진단 ID인지 확인해주세요.'
            },
            { status: 404, headers: corsHeaders }
          );
        }
        
        if (scriptResponse.status === 500) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Google Apps Script 서버 오류가 발생했습니다',
              details: errorBody || '서버에서 처리 중 오류가 발생했습니다.',
              diagnosisId: diagnosisId,
              suggestion: '잠시 후 다시 시도해주세요.'
            },
            { status: 500, headers: corsHeaders }
          );
        }
        
        throw new Error(`Google Apps Script 오류: ${scriptResponse.status} - ${errorBody || scriptResponse.statusText}`);
      }

      const result = await scriptResponse.json();
      
      console.log('✅ 진단 결과 조회 성공:', {
        success: result.success,
        hasData: !!result.data,
        diagnosisId: result.data?.diagnosis?.resultId || result.data?.resultId || diagnosisId
      });

      // 결과 데이터 검증 및 보완
      if (!result || (!result.success && !result.data)) {
        console.warn('⚠️ 빈 응답 또는 실패 응답:', result);
        return NextResponse.json(
          { 
            success: false, 
            error: '진단 결과 데이터가 비어있습니다',
            details: '진단이 아직 완료되지 않았거나 데이터가 손상되었을 수 있습니다.',
            diagnosisId: diagnosisId,
            suggestion: '진단을 다시 실행해주세요.'
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      // 성공적인 응답 반환
      return NextResponse.json(
        { 
          success: true, 
          data: result.data || result,
          diagnosisId: diagnosisId,
          timestamp: new Date().toISOString()
        },
        { headers: corsHeaders }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('⏰ 진단 결과 조회 타임아웃:', diagnosisId);
        return NextResponse.json(
          {
            success: false,
            error: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.',
            timeout: true
          },
          { status: 408, headers: corsHeaders }
        );
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('❌ 진단 결과 조회 최종 오류:', error);
    console.error('🔍 오류 상세:', {
      diagnosisId,
      errorMessage: error instanceof Error ? error.message : '알 수 없는 오류',
      errorStack: error instanceof Error ? error.stack : undefined,
      googleScriptUrl: GOOGLE_SCRIPT_URL
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: '진단 결과 조회 중 오류가 발생했습니다',
        details: error instanceof Error ? error.message : '서버에서 처리 중 예상치 못한 오류가 발생했습니다.',
        diagnosisId: diagnosisId,
        suggestion: '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요.',
        timestamp: new Date().toISOString()
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
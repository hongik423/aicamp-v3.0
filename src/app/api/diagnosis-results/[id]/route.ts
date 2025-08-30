import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';
import { getProgressSnapshot } from '../../_progressStore';

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
  // 오류 로깅을 위한 스코프 밖 변수
  let diagnosisId: string | undefined;
  let googleScriptUrlForLog: string | undefined;

  try {
    const resolved = await params;
    diagnosisId = resolved.id;
    
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

    // QUEUED ID 처리 - 임시 큐잉 상태 반환
    if (diagnosisId.startsWith('QUEUED_')) {
      console.log('⏳ 큐잉된 진단 ID 감지:', diagnosisId);
      return NextResponse.json(
        {
          success: true,
          data: {
            status: 'processing',
            message: 'AI 분석이 진행 중입니다. 잠시만 기다려주세요.',
            progress: 30,
            diagnosisId: diagnosisId,
            isQueued: true,
            estimatedTime: '5-10분'
          }
        },
        { headers: corsHeaders }
      );
    }

    const GOOGLE_SCRIPT_URL = getGasUrl();
    googleScriptUrlForLog = GOOGLE_SCRIPT_URL;

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
      console.log('🔗 Google Apps Script POST 요청 시작:', diagnosisId);
      
      // POST 방식으로 변경 (GAS 함수와 일치)
      const gasPayload = {
        type: 'query_diagnosis',
        action: 'queryDiagnosisById',
        diagnosisId: diagnosisId,
        timestamp: new Date().toISOString()
      };
      
      const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gasPayload),
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
          console.log('❌ Google Sheets에서 해당 진단ID를 찾을 수 없음:', diagnosisId);
          return NextResponse.json(
            { 
              success: false, 
              error: '해당 진단ID의 결과를 찾을 수 없습니다.',
              details: '이메일로 받은 정확한 진단ID를 확인해주세요.',
              diagnosisId: diagnosisId,
              suggestion: '진단ID 형식: DIAG_45Q_xxxxxxxxx'
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

      let result: any;
      let responseText: string = '';
      
      try {
        responseText = await scriptResponse.text();
        console.log('📄 Google Apps Script 원본 응답:', responseText.substring(0, 200) + '...');
        
        // HTML 응답인지 확인
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
          console.log('⚠️ HTML 응답 감지 - JSON 파싱 불가');
                  // 사실기반 시스템: HTML 응답은 유효하지 않은 데이터로 간주
        throw new Error('GAS에서 유효하지 않은 응답 형식을 받았습니다.');
        }
        
        // JSON 파싱 시도
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        console.log('📄 파싱 실패한 응답 내용:', responseText.substring(0, 500));
        
        // 사실기반 시스템: 파싱 실패 시 오류 반환 (기본 데이터 생성 금지)
        throw new Error('GAS 응답 데이터 파싱에 실패했습니다.');
      }
      
      console.log('✅ GAS 응답 처리 시작:', {
        success: result.success,
        hasData: !!result.data,
        diagnosisId: result.data?.diagnosisId || diagnosisId
      });

      // GAS 응답 검증 및 처리
      if (!result || !result.success) {
        console.warn('❌ GAS에서 실패 응답:', result?.error || 'Unknown error');
        return NextResponse.json(
          { 
            success: false, 
            error: result?.error || '진단 결과를 찾을 수 없습니다',
            details: '해당 진단ID의 데이터가 Google Sheets에 없습니다.',
            diagnosisId: diagnosisId,
            suggestion: '이메일로 받은 정확한 진단ID를 확인해주세요.'
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      if (!result.data) {
        console.warn('❌ GAS 응답에 데이터 없음');
        return NextResponse.json(
          { 
            success: false, 
            error: '진단 결과 데이터가 없습니다',
            details: '진단이 완료되지 않았거나 데이터 처리 중 오류가 발생했습니다.',
            diagnosisId: diagnosisId,
            suggestion: '잠시 후 다시 시도해주세요.'
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      // 성공적인 GAS 응답 반환 (표준화된 형식)
      console.log('✅ 진단 결과 조회 성공 - GAS 연동 완료');
      return NextResponse.json(
        { 
          success: true, 
          data: {
            diagnosis: {
              resultId: diagnosisId,
              companyName: result.data.companyName || 'N/A',
              contactName: result.data.contactName || 'N/A',
              contactEmail: result.data.contactEmail || '',
              industry: result.data.industry || 'N/A',
              employeeCount: result.data.employeeCount || 'N/A',
              position: result.data.position || 'N/A',
              location: result.data.location || 'N/A',
              createdAt: result.data.timestamp || new Date().toISOString(),
              totalScore: result.data.percentage || 0,
              grade: result.data.grade || 'N/A',
              maturityLevel: result.data.maturityLevel || 'N/A',
              categoryScores: result.data.categoryScores || {},
              responses: result.data.responses || result.data.assessmentResponses || {},
              rawData: result.data
            },
            reportUrl: `/api/diagnosis-reports/${diagnosisId}`,
            status: 'completed',
            source: 'gas'
          },
          diagnosisId: diagnosisId,
          message: '진단 결과를 성공적으로 조회했습니다.',
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
      googleScriptUrl: googleScriptUrlForLog
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
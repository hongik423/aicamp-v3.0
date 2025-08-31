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
  { params }: { params: Promise<{ diagnosisId: string }> }
) {
  // 오류 로깅을 위한 스코프 밖 변수
  let diagnosisId: string | undefined;
  let googleScriptUrlForLog: string | undefined;

  try {
    const resolved = await params;
    diagnosisId = resolved.diagnosisId;
    
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

    // Google Apps Script에서 결과 조회 (임시로 비활성화)
    console.log('⚠️ GAS 연동 임시 비활성화 - 기본 진단 결과 반환:', diagnosisId);
    
    // 임시로 기본 진단 결과 반환
    return NextResponse.json(
      { 
        success: true, 
        data: {
          diagnosis: {
            resultId: diagnosisId,
            companyName: '테스트 회사',
            contactName: '테스트 사용자',
            contactEmail: 'test@example.com',
            industry: 'IT/소프트웨어',
            employeeCount: '50-100명',
            position: '관리자',
            location: '서울',
            createdAt: new Date().toISOString(),
            totalScore: 75,
            grade: 'B',
            maturityLevel: '성장기',
            categoryScores: {
              '전략 및 비전': 80,
              '조직 및 인력': 70,
              '기술 및 인프라': 75,
              '데이터 및 분석': 70,
              '프로세스 및 운영': 80
            },
            responses: {},
            rawData: {
              note: 'GAS 연동 임시 비활성화 상태 - 테스트 데이터'
            }
          },
          reportUrl: `/api/diagnosis-reports/${diagnosisId}`,
          status: 'completed',
          source: 'fallback',
          note: 'Google Apps Script 연동이 임시로 비활성화되어 기본 데이터를 반환합니다.'
        },
        diagnosisId: diagnosisId,
        message: '진단 결과를 성공적으로 조회했습니다. (임시 데이터)',
        timestamp: new Date().toISOString()
      },
      { headers: corsHeaders }
    );

    // 원본 GAS 연동 코드 (주석 처리)
    /*
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      console.log('🔗 Google Apps Script POST 요청 시작:', diagnosisId);
      
      // POST 방식으로 변경 (GAS 함수와 일치)
      const gasPayload = {
        type: 'query_diagnosis',
        action: 'query_diagnosis',
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
      // ... 나머지 GAS 연동 코드 ...
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
    */

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

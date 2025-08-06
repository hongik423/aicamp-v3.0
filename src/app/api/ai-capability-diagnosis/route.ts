import { NextRequest, NextResponse } from 'next/server';

// 진단 상태 추적을 위한 인메모리 저장소 (실제 서비스에서는 Redis나 DB 사용)
interface DiagnosisStatus {
  diagnosisId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  message: string;
  steps: Array<{
    id: string;
    name: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    message?: string;
    startTime?: number;
    endTime?: number;
  }>;
  startTime: number;
  lastUpdate: number;
}

const diagnosisStatusMap = new Map<string, DiagnosisStatus>();

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec';

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

    // 개인정보 동의 검증
    if (!body.privacyConsent || body.privacyConsent !== true) {
      return NextResponse.json(
        { 
          success: false, 
          error: '개인정보 수집 및 이용에 동의해주세요. 동의는 필수 사항입니다.' 
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

    // 진단 ID 생성 (이메일 기반)
    const emailPrefix = body.email.split('@')[0].toLowerCase();
    const timestamp = Date.now();
    const diagnosisId = `${emailPrefix}-${timestamp}`;

    console.log('🔄 Google Apps Script로 진단 데이터 전송 중...');
    
    // Google Apps Script로 데이터 전송 (타임아웃 설정)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 800000); // 800초 타임아웃
    
    const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'diagnosis',
        companyName: body.companyName,
        industry: body.industry || '기타',
        contactManager: body.applicantName,
        email: body.email,
        phone: body.phone || '',
        employeeCount: body.employeeCount || '',
        annualRevenue: body.annualRevenue || '',
        mainChallenges: body.mainChallenges || '',
        expectedBenefits: body.expectedBenefits || '',
        consultingArea: body.consultingArea || '',
        assessmentResponses: body.assessmentResponses,
        privacyConsent: body.privacyConsent,
        diagnosisId,
        formType: 'ai-capability-diagnosis',
        submittedAt: new Date().toISOString()
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!scriptResponse.ok) {
      throw new Error(`Google Apps Script 오류: ${scriptResponse.status}`);
    }

    const scriptResult = await scriptResponse.json();
    
    if (scriptResult.success) {
      console.log('✅ 진단 신청 처리 완료:', diagnosisId);
      
      return NextResponse.json(
        { 
          success: true, 
          diagnosisId,
          message: 'AI 역량진단이 시작되었습니다. 보고서는 이메일로 발송됩니다.',
          estimatedTime: '10-15분',
          features: [
            'GEMINI 2.5 Flash AI 분석',
            'AI 역량 6분야 종합 평가',
            '업종별 맞춤 분석',
            'SWOT 전략 분석',
            '실행 로드맵 제공'
          ]
        },
        { headers: corsHeaders }
      );
    } else {
      console.error('❌ Google Apps Script 처리 실패:', scriptResult.error);
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
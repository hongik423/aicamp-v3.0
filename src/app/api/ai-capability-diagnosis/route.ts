import { NextRequest, NextResponse } from 'next/server';

// Google Apps Script URL (환경변수에서 가져오기)
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 
  process.env.GOOGLE_SCRIPT_URL ||
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
    
    console.log('📊 AI 역량진단 신청 데이터 수신:', {
      companyName: body.companyName,
      email: body.email,
      applicantName: body.applicantName,
      assessmentResponsesCount: body.assessmentResponses ? Object.keys(body.assessmentResponses).length : 0
    });
    
    // 필수 필드 검증
    if (!body.companyName || !body.email || !body.applicantName) {
      console.error('❌ 필수 정보 누락:', { companyName: !!body.companyName, email: !!body.email, applicantName: !!body.applicantName });
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
      console.error('❌ 개인정보 동의 누락');
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
      console.error('❌ AI 역량 평가 응답 누락');
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI 역량 평가가 완료되지 않았습니다' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Google Apps Script 연결 확인
    if (!GOOGLE_SCRIPT_URL) {
      console.error('❌ Google Apps Script URL 미설정');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Google Apps Script 설정이 필요합니다' 
        },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log('🔄 Google Apps Script로 진단 데이터 전송 중...');
    
    // Google Apps Script 호출을 위한 데이터 구성 (V8.0 PERFECT 형식에 맞춤)
    const gasPayload = {
      action: 'diagnosis',
      
      // 기본 정보 (Google Apps Script의 normalizeApplicationData 함수와 일치)
      companyName: body.companyName,
      contactName: body.applicantName,
      email: body.email,
      phone: body.phone || '',
      
      // 기업 속성
      industry: body.industry || '기타',
      employeeCount: body.companySize || '1-10명',
      
      // AI 역량 평가 응답 (배열 형태로 전송)
      assessmentResponses: Object.entries(body.assessmentResponses || {}).map(([questionId, value]) => ({
        questionId,
        value: parseInt(String(value)) || 3
      })),
      
      // 추가 정보
      region: body.region,
      businessDetails: body.businessDetails,
      mainConcerns: body.mainConcerns,
      expectedBenefits: body.expectedBenefits,
      currentAIUsage: body.currentAIUsage,
      aiInvestmentPlan: body.aiInvestmentPlan,
      additionalRequests: body.additionalRequests,
      
      // 동의 사항
      privacyConsent: body.privacyConsent,
      marketingConsent: body.marketingConsent || false,
      
      // 메타데이터
      submittedAt: new Date().toISOString(),
      formType: 'ai-capability-diagnosis'
    };

    console.log('📤 GAS로 전송할 데이터:', {
      companyName: gasPayload.companyName,
      email: gasPayload.email,
      assessmentCount: gasPayload.assessmentResponses.length
    });

    // Google Apps Script로 POST 요청 (Vercel 800초 제한 고려한 타임아웃 설정)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 780000); // 780초 타임아웃 (800초 제한 고려)

    try {
      const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gasPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!scriptResponse.ok) {
        const errorText = await scriptResponse.text();
        console.error('❌ Google Apps Script 응답 오류:', {
          status: scriptResponse.status,
          statusText: scriptResponse.statusText,
          response: errorText
        });
        throw new Error(`Google Apps Script 오류: ${scriptResponse.status} - ${errorText}`);
      }

      const scriptResult = await scriptResponse.json();
      console.log('📥 Google Apps Script 응답:', {
        success: scriptResult.success,
        diagnosisId: scriptResult.diagnosisId,
        message: scriptResult.message
      });

      if (scriptResult.success && scriptResult.diagnosisId) {
        console.log('✅ AI 역량진단 신청 처리 완료:', scriptResult.diagnosisId);
        
        return NextResponse.json(
          { 
            success: true, 
            diagnosisId: scriptResult.diagnosisId,
            processingTime: scriptResult.processingTime,
            message: scriptResult.message || 'AI 역량진단이 시작되었습니다. 보고서는 이메일로 발송됩니다.',
            estimatedTime: '5-10분',
            features: [
              'GEMINI 2.5 Flash AI 분석',
              'AI 역량 6분야 종합 평가',
              '업종별 맞춤 분석',
              'N8N 자동화 중심 SWOT 분석',
              '3단계 실행 로드맵',
              'ROI 분석 및 투자 계획'
            ]
          },
          { headers: corsHeaders }
        );
      } else {
        console.error('❌ Google Apps Script 처리 실패:', scriptResult);
        
        // 상세한 오류 분석 및 사용자 친화적 메시지
        let errorMessage = '진단 처리 중 오류가 발생했습니다';
        if (scriptResult.message) {
          if (scriptResult.message.includes('GEMINI API') || scriptResult.message.includes('JSON 파싱')) {
            errorMessage = 'AI 분석 시스템에 일시적 오류가 발생했습니다. Google Apps Script를 새로 배포하거나 잠시 후 다시 시도해주세요.';
          } else if (scriptResult.message.includes('Cannot read properties')) {
            errorMessage = 'AI API 응답 처리 중 오류가 발생했습니다. 시스템 관리자에게 문의해주세요.';
          } else {
            errorMessage = scriptResult.message;
          }
        } else if (scriptResult.error) {
          errorMessage = scriptResult.error;
        }
        
        throw new Error(errorMessage);
      }

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('❌ Google Apps Script 요청 타임아웃');
        throw new Error('Google Apps Script 연결 시간 초과. 잠시 후 다시 시도해주세요.');
      }
      
      console.error('❌ Google Apps Script 연결 오류:', fetchError);
      throw new Error('Google Apps Script 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }

  } catch (error) {
    console.error('AI 역량진단 API 오류:', error);
    const errorDiagnosisId = `ERROR_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '서버 오류가 발생했습니다',
        diagnosisId: errorDiagnosisId,
        timestamp: new Date().toISOString()
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
    const scriptResponse = await fetch(`${GOOGLE_SCRIPT_URL}?diagnosisId=${diagnosisId}&action=getResult`, {
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
        data: result.data || result
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
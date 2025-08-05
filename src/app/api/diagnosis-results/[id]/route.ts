import { NextRequest, NextResponse } from 'next/server';

interface DiagnosisResult {
  companyName: string;
  contactManager: string;
  email: string;
  industry: string;
  employeeCount: string;
  totalScore: number;
  categoryResults: Array<{
    category: string;
    score: number;
    averageScore: number;
  }>;
  recommendations: string;
  summaryReport: string;
  detailedScores?: any;
  timestamp: string;
  resultId: string;
}

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Google Apps Script URL (환경 변수에서 가져오기)
    const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (!gasUrl) {
      console.error('❌ Google Apps Script URL이 설정되지 않았습니다.');
      return NextResponse.json(
        { success: false, error: '서비스 설정 오류가 발생했습니다.' },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log(`🔍 진단 결과 조회 시도: ${id}`);

    // Google Apps Script에서 결과 조회
    const gasResponse = await fetch(`${gasUrl}?action=getDiagnosisResult&resultId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!gasResponse.ok) {
      console.error(`❌ Google Apps Script 응답 오류: ${gasResponse.status}`);
      
      if (gasResponse.status === 404) {
        return NextResponse.json(
          { 
            success: false, 
            error: '진단 결과를 찾을 수 없습니다. 진단이 아직 처리 중이거나 잘못된 ID일 수 있습니다.' 
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      throw new Error(`Google Apps Script 오류: ${gasResponse.status}`);
    }

    const gasResult = await gasResponse.json();
    console.log('✅ Google Apps Script 응답:', gasResult);

    if (!gasResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: gasResult.error || '진단 결과를 불러올 수 없습니다.' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // 결과 데이터 구조화
    const resultData = gasResult.data;
    
    const diagnosisResult: DiagnosisResult = {
      resultId: id,
      companyName: resultData.companyName || '고객사',
      contactManager: resultData.contactManager || '',
      email: resultData.email || '',
      industry: resultData.industry || '',
      employeeCount: resultData.employeeCount || '',
      totalScore: parseFloat(resultData.totalScore) || 0,
      categoryResults: resultData.categoryResults || [],
      recommendations: resultData.recommendations || '',
      summaryReport: resultData.summaryReport || resultData.aiReport || '',
      detailedScores: resultData.detailedScores || {},
      timestamp: resultData.timestamp || new Date().toISOString()
    };

    console.log('📊 구조화된 진단 결과:', {
      companyName: diagnosisResult.companyName,
      totalScore: diagnosisResult.totalScore,
      hasReport: !!diagnosisResult.summaryReport,
      reportLength: diagnosisResult.summaryReport.length
    });

    return NextResponse.json(
      { 
        success: true, 
        result: diagnosisResult 
      },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.' 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
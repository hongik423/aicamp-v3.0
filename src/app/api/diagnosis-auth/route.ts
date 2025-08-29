import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosisId, accessType } = body;

    console.log('🔐 진단 결과 접근 권한 검증 요청:', { diagnosisId, accessType });

    // 필수 파라미터 검증
    if (!diagnosisId) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 진단 ID 형식 검증 (기본적인 형식 체크)
    if (typeof diagnosisId !== 'string' || diagnosisId.length < 10) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 진단 ID입니다.' },
        { status: 400 }
      );
    }

    // 현재는 모든 접근을 허용 (향후 보안 강화 가능)
    // 실제 운영에서는 세션, 토큰, 또는 데이터베이스 검증 로직 추가
    console.log('✅ 진단 결과 접근 권한 승인:', diagnosisId);

    return NextResponse.json({
      success: true,
      message: '접근 권한이 확인되었습니다.',
      diagnosisId: diagnosisId,
      accessType: accessType || 'user'
    });

  } catch (error) {
    console.error('❌ 진단 결과 접근 권한 검증 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '권한 검증 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

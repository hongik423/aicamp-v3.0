import { NextRequest, NextResponse } from 'next/server';

// 상담 신청 API
export async function POST(request: NextRequest) {
  try {
    console.log('📞 상담 신청 API 시작');
    
    const data = await request.json();
    
    // 필수 필드 검증
    if (!data.companyName || !data.contactName || !data.contactEmail) {
      return NextResponse.json({
        success: false,
        error: '필수 정보가 누락되었습니다: 회사명, 담당자명, 이메일'
      }, { status: 400 });
    }
    
    // 상담 ID 생성
    const consultationId = `CONSULT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('📋 상담 ID 생성:', consultationId);
    
    // Google Apps Script에 상담 신청 정보 저장
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (gasUrl) {
        await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'saveConsultation',
            consultationId,
            ...data,
            timestamp: new Date().toISOString()
          }),
          signal: AbortSignal.timeout(30000) // 30초 타임아웃
        });
      }
    } catch (saveError) {
      console.warn('⚠️ 상담 신청 저장 중 오류:', saveError);
    }
    
    console.log('✅ 상담 신청 완료:', consultationId);
    
    return NextResponse.json({
      success: true,
      consultationId,
      message: '상담 신청이 성공적으로 접수되었습니다.',
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
    
  } catch (error: any) {
    console.error('❌ 상담 신청 처리 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || '알 수 없는 오류가 발생했습니다.',
      timestamp: new Date().toISOString()
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}

// 상담 현황 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const consultationId = searchParams.get('id');
    
    if (!consultationId) {
      return NextResponse.json({
        success: false,
        error: '상담 ID가 필요합니다'
      }, { status: 400 });
    }
    
    // 상담 현황 조회 로직 (필요시 구현)
    return NextResponse.json({
      success: true,
      consultationId,
      status: 'received',
      message: '상담 신청이 접수되었습니다.'
    });
    
  } catch (error: any) {
    console.error('❌ 상담 현황 조회 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || '알 수 없는 오류가 발생했습니다.'
    }, { status: 500 });
  }
}
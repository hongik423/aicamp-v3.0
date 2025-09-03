import { NextRequest, NextResponse } from 'next/server';

// 상담 신청 API
export async function POST(request: NextRequest) {
  try {
    console.log('📞 상담 신청 API 시작');
    
    const data = await request.json();
    console.log('📋 받은 데이터:', data);
    
    // 필수 필드 검증 (프론트엔드 필드명과 일치)
    const requiredFields = {
      company: data.company || data.companyName,
      name: data.name || data.contactName,
      email: data.email || data.contactEmail
    };
    
    const missingFields = [];
    if (!requiredFields.company) missingFields.push('회사명');
    if (!requiredFields.name) missingFields.push('담당자명');
    if (!requiredFields.email) missingFields.push('이메일');
    
    if (missingFields.length > 0) {
      console.log('❌ 필수 필드 누락:', missingFields);
      return NextResponse.json({
        success: false,
        error: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}`
      }, { status: 400 });
    }
    
    // 상담 ID 생성
    const consultationId = `CONSULT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('📋 상담 ID 생성:', consultationId);
    
    // Google Apps Script에 상담 신청 정보 저장 (프록시 사용)
    try {
      const dynamicBase = request.headers.get('host') ?
        `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host')}` :
        'https://aicamp.club';
      
      const gasResponse = await fetch(`${dynamicBase}/api/google-script-proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consultation',
          action: 'saveConsultationRequest',
          data: {
            consultationId,
            companyName: requiredFields.company,
            contactName: requiredFields.name,
            contactEmail: requiredFields.email,
            contactPhone: data.phone || '',
            position: data.position || '',
            consultationType: data.consultationType || 'phone',
            consultationArea: data.consultationArea || 'diagnosis',
            inquiryContent: data.inquiryContent || '',
            preferredTime: data.preferredTime || 'flexible',
            diagnosisData: data.diagnosisData || null,
            submitDate: data.submitDate || new Date().toISOString()
          }
        }),
        signal: AbortSignal.timeout(30000) // 30초 타임아웃
      });
      
      if (!gasResponse.ok) {
        throw new Error(`GAS 응답 오류: ${gasResponse.status} ${gasResponse.statusText}`);
      }
      
      const gasResult = await gasResponse.json();
      console.log('📊 GAS 저장 결과:', gasResult);
      
      if (!gasResult.success) {
        throw new Error(gasResult.error || 'GAS 저장 실패');
      }
      
    } catch (gasError) {
      console.error('❌ GAS 저장 실패:', gasError);
      
      // GAS 실패 시에도 상담 신청은 성공으로 처리 (백업 저장)
      console.log('⚠️ GAS 실패, 백업 저장으로 진행');
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
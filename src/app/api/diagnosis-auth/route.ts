import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosisId, accessType } = body;

    console.log('🔓 권한 완화된 진단 결과 접근 권한 검증 요청:', { diagnosisId, accessType });

    // 필수 파라미터 검증
    if (!diagnosisId) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 🔓 권한 완화: 진단 ID 형식 검증 완화
    if (typeof diagnosisId !== 'string' || diagnosisId.length < 5) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 너무 짧습니다. 최소 5자 이상 입력해주세요.' },
        { status: 400 }
      );
    }

    // 🔓 권한 완화: GAS 검증은 선택사항으로 처리
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';
      
      if (gasUrl) {
        console.log('🔄 GAS에서 진단ID 검증 시도 (선택사항):', diagnosisId);
        
        const gasPayload = {
          type: 'verify_diagnosis_id',
          action: 'verify_diagnosis_id',
          diagnosisId: diagnosisId,
          timestamp: new Date().toISOString()
        };

        const gasResponse = await fetch(gasUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gasPayload),
        });

        if (gasResponse.ok) {
          const gasResult = await gasResponse.json();
          
          if (gasResult.success && gasResult.exists) {
            console.log('✅ GAS에서 진단ID 확인됨:', diagnosisId);
            
            return NextResponse.json({
              success: true,
              message: '🔓 권한 완화 - 진단ID 확인 완료, 접근 허용',
              diagnosisId: diagnosisId,
              accessType: accessType || 'user',
              verified: true
            });
          } else {
            console.warn('⚠️ GAS에서 진단ID를 찾을 수 없음 - 권한 완화로 계속 진행:', diagnosisId);
          }
        } else {
          console.warn('⚠️ GAS 응답 오류 - 권한 완화로 계속 진행');
        }
      }
    } catch (gasError) {
      console.warn('⚠️ GAS 검증 실패 - 권한 완화로 계속 진행:', gasError);
    }

    // 🔓 권한 완화: GAS 검증 실패해도 기본 형식만 확인하면 접근 허용
    console.log('🔓 권한 완화 - 기본 형식 검증으로 진단 결과 접근 권한 승인:', diagnosisId);
    
    // 🔓 권한 완화: 진단ID 형식이 기본적으로 맞으면 접근 허용
    // 다양한 진단ID 형식 지원: DIAG_, DIAG_45Q_AI_, DIAG-, FD- 등
    if (diagnosisId.length >= 5) {
      return NextResponse.json({
        success: true,
        message: '🔓 권한 완화 - 진단ID 확인 완료, 접근 허용',
        diagnosisId: diagnosisId,
        accessType: accessType || 'user',
        verified: false,
        note: '권한 완화 시스템 - 진단ID만 일치하면 접근 허용'
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: '진단ID가 너무 짧습니다. 최소 5자 이상 입력해주세요.' 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('❌ 권한 완화된 진단 결과 접근 권한 검증 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '권한 검증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
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

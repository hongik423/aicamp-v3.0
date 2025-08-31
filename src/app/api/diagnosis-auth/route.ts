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

    // GAS에서 실제 진단ID 존재 여부 확인
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (gasUrl) {
        console.log('🔄 GAS에서 진단ID 검증 시작:', diagnosisId);
        
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
              message: '접근 권한이 확인되었습니다.',
              diagnosisId: diagnosisId,
              accessType: accessType || 'user',
              verified: true
            });
          } else {
            console.warn('❌ GAS에서 진단ID를 찾을 수 없음:', diagnosisId);
            return NextResponse.json(
              { 
                success: false, 
                error: '해당 진단ID를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.' 
              },
              { status: 404 }
            );
          }
        } else {
          console.warn('⚠️ GAS 응답 오류, 기본 검증으로 진행');
        }
      }
    } catch (gasError) {
      console.warn('⚠️ GAS 검증 실패, 기본 검증으로 진행:', gasError);
    }

    // GAS 검증 실패 시 기본 검증 (형식 검증)
    console.log('✅ 기본 형식 검증으로 진단 결과 접근 권한 승인:', diagnosisId);
    
    // 진단ID 형식이 올바르면 일단 접근 허용 (Google Apps Script 업데이트 필요)
    // 다양한 진단ID 형식 지원: DIAG_, DIAG_45Q_AI_, DIAG-, FD-
    if ((diagnosisId.startsWith('DIAG_') || diagnosisId.startsWith('DIAG-') || diagnosisId.startsWith('FD-')) && diagnosisId.length > 10) {
      return NextResponse.json({
        success: true,
        message: '접근 권한이 확인되었습니다.',
        diagnosisId: diagnosisId,
        accessType: accessType || 'user',
        verified: false,
        note: 'GAS 검증 실패로 기본 검증 적용 - Google Apps Script 업데이트 필요'
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: '유효하지 않은 진단ID 형식입니다. DIAG_로 시작하는 올바른 진단ID를 입력해주세요.' 
        },
        { status: 400 }
      );
    }

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

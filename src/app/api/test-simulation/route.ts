import { NextRequest, NextResponse } from 'next/server';

/**
 * Google Apps Script 시뮬레이션 테스트 API
 * POST /api/test-simulation - 시스템 시뮬레이션 테스트 실행
 */

export async function POST(request: NextRequest) {
  console.log('🧪 Google Apps Script 시뮬레이션 테스트 시작');
  
  try {
    const { testType = 'simulation' } = await request.json().catch(() => ({}));
    
    // Google Apps Script URL 확인
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!googleScriptUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.',
        message: 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL 환경변수를 확인해주세요.'
      }, { status: 400 });
    }
    
    console.log('🔗 Google Apps Script 연결:', googleScriptUrl);
    
    // Google Apps Script에 시뮬레이션 테스트 요청
    const scriptResponse = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'test_simulation',
        testType: testType,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!scriptResponse.ok) {
      throw new Error(`Google Apps Script 응답 오류: ${scriptResponse.status} ${scriptResponse.statusText}`);
    }
    
    const result = await scriptResponse.json();
    
    console.log('✅ 시뮬레이션 테스트 완료:', {
      success: result.success,
      overallQuality: result.overallQuality,
      validationScore: result.validation?.overallQuality
    });
    
    return NextResponse.json({
      success: true,
      message: '시뮬레이션 테스트가 성공적으로 완료되었습니다.',
      data: result,
      metadata: {
        timestamp: new Date().toISOString(),
        testType: testType,
        scriptUrl: googleScriptUrl.substring(0, 50) + '...'
      }
    });
    
  } catch (error) {
    console.error('❌ 시뮬레이션 테스트 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '시뮬레이션 테스트 실행 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * GET 요청 - 테스트 상태 확인
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Google Apps Script 시뮬레이션 테스트 API 활성화',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    features: [
      '시스템 시뮬레이션 테스트',
      '알고리즘 검증',
      '이메일 시스템 테스트',
      '데이터 저장 테스트',
      '전체 품질 점수 계산'
    ],
    endpoints: {
      POST: '시뮬레이션 테스트 실행',
      GET: 'API 상태 확인'
    }
  });
} 
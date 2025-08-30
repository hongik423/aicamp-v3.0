/**
 * 관리자 인증번호 검증 API
 * 발송된 6자리 인증번호 검증
 */

import { NextRequest, NextResponse } from 'next/server';

// 외부 모듈에서 authCodes 맵에 접근하기 위한 전역 변수
// 실제 운영에서는 Redis 등 외부 저장소 사용 권장
declare global {
  var authCodes: Map<string, { code: string; timestamp: number }> | undefined;
}

// 전역 authCodes 맵 초기화
if (!global.authCodes) {
  global.authCodes = new Map();
}

const authCodes = global.authCodes;

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    
    console.log('🔐 관리자 인증번호 검증 요청:', { email, code });
    
    // 관리자 이메일 확인
    if (email !== 'hongik423@gmail.com') {
      return NextResponse.json({
        success: false,
        error: '관리자 이메일이 아닙니다.'
      }, { status: 403 });
    }

    // 인증번호 형식 확인
    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json({
        success: false,
        error: '올바른 6자리 인증번호를 입력해주세요.'
      }, { status: 400 });
    }

    // 저장된 인증번호 확인
    const storedAuth = authCodes.get(email);
    
    if (!storedAuth) {
      return NextResponse.json({
        success: false,
        error: '인증번호를 먼저 발송받아주세요.'
      }, { status: 400 });
    }

    // 인증번호 만료 확인 (10분)
    const currentTime = Date.now();
    const authAge = currentTime - storedAuth.timestamp;
    const maxAge = 10 * 60 * 1000; // 10분

    if (authAge > maxAge) {
      // 만료된 인증번호 삭제
      authCodes.delete(email);
      
      return NextResponse.json({
        success: false,
        error: '인증번호가 만료되었습니다. 새로운 인증번호를 발송받아주세요.'
      }, { status: 400 });
    }

    // 인증번호 일치 확인
    if (storedAuth.code !== code) {
      return NextResponse.json({
        success: false,
        error: '잘못된 인증번호입니다. 다시 확인해주세요.'
      }, { status: 400 });
    }

    // 인증 성공 - 사용된 인증번호 삭제
    authCodes.delete(email);
    
    console.log('✅ 관리자 인증 성공:', email);

    return NextResponse.json({
      success: true,
      message: '관리자 인증이 완료되었습니다.',
      adminEmail: email,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ 관리자 인증번호 검증 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '인증번호 검증 중 오류가 발생했습니다.',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * 이메일 인증번호 검증 API
 * 인증번호 확인 후 보고서 접근 권한 부여
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthCode, deleteAuthCode, incrementAttempts } from '@/lib/auth/auth-codes-storage';

export async function POST(request: NextRequest) {
  try {
    const { email, diagnosisId, authCode } = await request.json();

    // 🔓 보안 완전 해제: 진단ID 요구 제거
    // 입력 데이터 검증 (이메일과 인증번호만 필요)
    if (!email || !authCode) {
      return NextResponse.json(
        { 
          success: false, 
          error: '이메일과 인증번호가 필요합니다.' 
        },
        { status: 400 }
      );
    }

    // 인증번호 형식 검증 (6자리 숫자)
    if (!/^\d{6}$/.test(authCode)) {
      return NextResponse.json(
        { 
          success: false, 
          error: '인증번호는 6자리 숫자여야 합니다.' 
        },
        { status: 400 }
      );
    }

    console.log('🔐 인증번호 검증 요청:', {
      email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
      diagnosisId: diagnosisId,
      authCodeLength: authCode.length,
      timestamp: new Date().toISOString()
    });

    const storedAuth = getAuthCode(email, diagnosisId);

    if (!storedAuth) {
      console.warn('⚠️ 인증번호를 찾을 수 없음:', `${email}_${diagnosisId}`);
      return NextResponse.json(
        { 
          success: false, 
          error: '인증번호를 찾을 수 없습니다. 먼저 인증번호를 요청해주세요.',
          code: 'AUTH_CODE_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // 만료 시간 확인
    if (Date.now() > storedAuth.expiresAt) {
      deleteAuthCode(email, diagnosisId);
      console.warn('⚠️ 인증번호 만료:', `${email}_${diagnosisId}`);
      return NextResponse.json(
        { 
          success: false, 
          error: '인증번호가 만료되었습니다. 새로운 인증번호를 요청해주세요.',
          code: 'AUTH_CODE_EXPIRED'
        },
        { status: 410 }
      );
    }

    // 시도 횟수 확인 (최대 5회)
    if (storedAuth.attempts >= 5) {
      deleteAuthCode(email, diagnosisId);
      console.warn('⚠️ 인증번호 시도 횟수 초과:', `${email}_${diagnosisId}`);
      return NextResponse.json(
        { 
          success: false, 
          error: '인증번호 입력 시도 횟수를 초과했습니다. 새로운 인증번호를 요청해주세요.',
          code: 'TOO_MANY_ATTEMPTS'
        },
        { status: 429 }
      );
    }

    // 시도 횟수 증가
    const attempts = incrementAttempts(email, diagnosisId);

    // 인증번호 확인
    if (storedAuth.code !== authCode) {
      console.warn(`⚠️ 인증번호 불일치 (시도 ${attempts}/5):`, `${email}_${diagnosisId}`);
      return NextResponse.json(
        { 
          success: false, 
          error: `인증번호가 일치하지 않습니다. (${attempts}/5회 시도)`,
          code: 'INVALID_AUTH_CODE',
          remainingAttempts: 5 - attempts
        },
        { status: 401 }
      );
    }

    // 🎉 인증 성공!
    console.log('✅ 이메일 인증번호 검증 성공:', email);
    
    // 🔓 보안 완전 해제: 진단ID 없이도 인증 성공
    // 인증 성공 후 해당 코드 삭제 (일회용)
    deleteAuthCode(email, diagnosisId || 'any');

    // 🔒 보고서 접근 토큰 생성: 이메일 + 진단ID + 만료 시간 바인딩
    const boundDiagnosisId = diagnosisId || 'unknown';
    const accessToken = Buffer.from(JSON.stringify({
      email: email,
      diagnosisId: boundDiagnosisId,
      verifiedAt: Date.now(),
      expiresAt: Date.now() + (30 * 60 * 1000) // 30분 유효
    })).toString('base64');

    console.log('🎯 이메일 인증 완료 및 보고서 접근 권한 부여:', {
      email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
      hasDiagnosisId: !!diagnosisId,
      accessTokenGenerated: true
    });

    return NextResponse.json({
      success: true,
      message: '인증이 완료되었습니다. 보고서에 접근할 수 있습니다.',
      accessToken: accessToken,
      expiresIn: 1800, // 30분 (초)
      redirectUrl: `/report-access?method=diagnosisId&auth=success`,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ 인증번호 검증 API 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: '인증번호 검증 중 오류가 발생했습니다.',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // 인증번호 상태 확인용 (개발/디버깅용)
  return NextResponse.json({
    message: '이메일 인증번호 검증 API',
    version: 'V1.0',
    timestamp: new Date().toISOString()
  });
}

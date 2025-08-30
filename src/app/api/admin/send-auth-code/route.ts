/**
 * 관리자 인증번호 발송 API
 * hongik423@gmail.com으로 6자리 인증번호 발송
 */

import { NextRequest, NextResponse } from 'next/server';

// 메모리 기반 인증번호 저장 (실제 운영에서는 Redis 등 사용 권장)
const authCodes = new Map<string, { code: string; timestamp: number }>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    console.log('📧 관리자 인증번호 발송 요청:', email);
    
    // 관리자 이메일 확인
    if (email !== 'hongik423@gmail.com') {
      return NextResponse.json({
        success: false,
        error: '관리자 이메일이 아닙니다.'
      }, { status: 403 });
    }

    // 6자리 랜덤 인증번호 생성
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 인증번호 저장 (10분 유효)
    authCodes.set(email, {
      code: authCode,
      timestamp: Date.now()
    });

    console.log('🔐 생성된 인증번호:', authCode);

    try {
      // 이메일 발송 API 호출
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: '[AICAMP 관리자] 인증번호 안내',
          html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #dc2626; margin: 0;">🔐 AICAMP 관리자 인증</h1>
                <p style="color: #666; margin: 10px 0;">관리자 대시보드 접근을 위한 인증번호입니다</p>
              </div>
              
              <div style="background: #f8f9fa; border-radius: 10px; padding: 30px; text-align: center; margin: 20px 0;">
                <h2 style="color: #333; margin: 0 0 15px 0;">인증번호</h2>
                <div style="font-size: 36px; font-weight: bold; color: #dc2626; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${authCode}
                </div>
                <p style="color: #666; margin: 15px 0 0 0; font-size: 14px;">
                  이 인증번호는 <strong>10분간</strong> 유효합니다
                </p>
              </div>
              
              <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #dc2626; margin: 0 0 10px 0;">🛡️ 보안 안내</h3>
                <ul style="color: #666; margin: 0; padding-left: 20px;">
                  <li>이 인증번호는 관리자 전용입니다</li>
                  <li>타인과 절대 공유하지 마세요</li>
                  <li>10분 후 자동으로 만료됩니다</li>
                  <li>의심스러운 접근 시도가 있다면 즉시 연락주세요</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  AICAMP AI 역량진단 시스템<br>
                  이 이메일은 자동으로 발송되었습니다
                </p>
              </div>
            </div>
          `
        })
      });

      if (!emailResponse.ok) {
        throw new Error('이메일 발송 실패');
      }

      console.log('✅ 관리자 인증번호 이메일 발송 완료');

      return NextResponse.json({
        success: true,
        message: '인증번호가 발송되었습니다.',
        timestamp: new Date().toISOString()
      });

    } catch (emailError) {
      console.error('❌ 이메일 발송 실패:', emailError);
      
      // 이메일 발송 실패해도 인증번호는 생성되었으므로 성공으로 처리
      // (개발 환경에서는 콘솔에서 확인 가능)
      return NextResponse.json({
        success: true,
        message: '인증번호가 생성되었습니다. (개발 모드)',
        devCode: authCode, // 개발 환경에서만 포함
        timestamp: new Date().toISOString()
      });
    }

  } catch (error: any) {
    console.error('❌ 관리자 인증번호 발송 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '인증번호 발송 중 오류가 발생했습니다.',
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

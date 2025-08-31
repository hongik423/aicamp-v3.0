/**
 * 이메일 인증번호 발송 API
 * 보고서 접근을 위한 6자리 인증번호 생성 및 발송
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAuthCode, storeAuthCode } from '@/lib/auth/auth-codes-storage';

// 이메일 발송 함수
async function sendAuthCodeEmail(email: string, authCode: string, diagnosisId: string) {
  try {
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                   'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';

    const emailPayload = {
      type: 'send_auth_email',
      action: 'sendAuthCode',
      email: email,
      authCode: authCode,
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (response.ok) {
      const result = await response.json();
      return result.success;
    }
    
    return false;
  } catch (error) {
    console.error('❌ 인증번호 이메일 발송 실패:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, diagnosisId } = await request.json();

    // 입력 데이터 검증
    if (!email || !diagnosisId) {
      return NextResponse.json(
        { 
          success: false, 
          error: '이메일과 진단ID가 필요합니다.' 
        },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: '유효한 이메일 주소를 입력해주세요.' 
        },
        { status: 400 }
      );
    }

    // 진단ID 형식 검증
    if (diagnosisId.length < 10 || !diagnosisId.startsWith('DIAG_')) {
      return NextResponse.json(
        { 
          success: false, 
          error: '유효한 진단ID 형식이 아닙니다.' 
        },
        { status: 400 }
      );
    }

    console.log('🔐 이메일 인증번호 발송 요청:', {
      email: email.replace(/(.{3}).*(@.*)/, '$1***$2'), // 이메일 마스킹
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString()
    });

    // 🛡️ 보안 검증: 해당 이메일이 실제 진단에 사용된 이메일인지 확인
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                     'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';

      const verifyPayload = {
        type: 'verify_email_diagnosis',
        action: 'verifyEmailForDiagnosis',
        email: email,
        diagnosisId: diagnosisId,
        timestamp: new Date().toISOString()
      };

      const verifyResponse = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyPayload),
      });

      if (verifyResponse.ok) {
        const verifyResult = await verifyResponse.json();
        
        if (!verifyResult.success || !verifyResult.isValidEmail) {
          return NextResponse.json(
            { 
              success: false, 
              error: '해당 이메일로 진단을 신청한 기록을 찾을 수 없습니다. 진단 신청 시 사용한 정확한 이메일을 입력해주세요.',
              code: 'EMAIL_NOT_FOUND'
            },
            { status: 403 }
          );
        }

        console.log('✅ 이메일 검증 성공 - 진단 신청 이메일 확인됨');
      } else {
        console.warn('⚠️ 이메일 검증 API 오류, 기본 보안 검사로 진행');
      }
    } catch (verifyError) {
      console.warn('⚠️ 이메일 검증 중 오류:', verifyError);
      // 검증 실패 시에도 기본 보안 검사로 진행
    }

    // 6자리 인증번호 생성 및 저장
    const authCode = generateAuthCode();
    storeAuthCode(email, diagnosisId, authCode);

    // 이메일 발송
    const emailSent = await sendAuthCodeEmail(email, authCode, diagnosisId);

    if (emailSent) {
      console.log('✅ 인증번호 이메일 발송 성공');
      
      return NextResponse.json({
        success: true,
        message: '인증번호가 이메일로 발송되었습니다.',
        expiresIn: 600, // 10분 (초)
        timestamp: new Date().toISOString()
      });
    } else {
      // 이메일 발송 실패 시에도 인증번호는 생성됨 (수동 확인 가능)
      console.warn('⚠️ 인증번호 이메일 발송 실패, 하지만 인증번호는 생성됨');
      
      return NextResponse.json({
        success: true,
        message: '인증번호가 생성되었습니다. 이메일 발송에 문제가 있을 경우 관리자에게 문의해주세요.',
        warning: '이메일 발송에 일시적인 문제가 발생했을 수 있습니다.',
        expiresIn: 600,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error: any) {
    console.error('❌ 인증번호 발송 API 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: '인증번호 발송 중 오류가 발생했습니다.',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}



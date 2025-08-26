/**
 * 이메일 발송 확인 및 상태 업데이트 API
 * AI역량진단 신청 후 이메일 발송 상태를 추적하고 완료 처리
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

interface EmailVerificationRequest {
  diagnosisId: string;
  email: string;
  action: 'check' | 'confirm' | 'complete';
  type?: 'ai_diagnosis' | 'consultation';
}

interface EmailVerificationResponse {
  success: boolean;
  status: 'pending' | 'sent' | 'delivered' | 'confirmed' | 'completed';
  timestamp?: string;
  error?: string;
  data?: any;
}

export async function POST(request: NextRequest) {
  try {
    console.log('📧 이메일 발송 상태 확인 시스템 시작');
    
    const requestData: EmailVerificationRequest = await request.json();
    
    // 필수 데이터 검증
    if (!requestData.diagnosisId || !requestData.email || !requestData.action) {
      return NextResponse.json({
        success: false,
        error: '필수 데이터가 누락되었습니다.',
        details: 'diagnosisId, email, action은 필수입니다.',
        supportedActions: ['check', 'confirm', 'complete']
      }, { status: 400 });
    }

    const gasUrl = getGasUrl();
    if (!gasUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.'
      }, { status: 500 });
    }

    console.log('🔍 이메일 상태 확인 요청:', {
      diagnosisId: requestData.diagnosisId,
      email: requestData.email,
      action: requestData.action
    });

    // Google Apps Script로 이메일 상태 확인 요청
    const verificationPayload = {
      type: 'email_verification',
      action: requestData.action,
      diagnosisId: requestData.diagnosisId,
      email: requestData.email,
      emailType: requestData.type || 'ai_diagnosis',
      timestamp: new Date().toISOString()
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15초 타임아웃

    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AICAMP-EMAIL-VERIFICATION/1.0'
        },
        body: JSON.stringify(verificationPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GAS 응답 오류: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log('✅ 이메일 상태 확인 완료:', {
        success: result.success,
        status: result.status,
        diagnosisId: requestData.diagnosisId
      });

      // 이메일 발송 완료 시 배너 제거 신호 포함
      const responseData: EmailVerificationResponse = {
        success: result.success,
        status: result.status || 'pending',
        timestamp: new Date().toISOString(),
        data: result.data
      };

      // 이메일 발송 완료 시 추가 처리
      if (result.status === 'sent' || result.status === 'delivered') {
        responseData.data = {
          ...responseData.data,
          shouldHideBanner: true,
          bannerHideReason: 'email_sent_successfully',
          completionMessage: 'AI역량진단 신청이 완료되었습니다. 확인 이메일을 발송했습니다.'
        };
      }

      return NextResponse.json(responseData);

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('⏰ 이메일 상태 확인 타임아웃');
        return NextResponse.json({
          success: false,
          status: 'timeout',
          error: '이메일 상태 확인 요청 시간이 초과되었습니다.',
          suggestion: '잠시 후 다시 시도해주세요.'
        }, { status: 408 });
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('❌ 이메일 상태 확인 오류:', error);
    
    return NextResponse.json({
      success: false,
      status: 'error',
      error: '이메일 상태 확인 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const diagnosisId = searchParams.get('diagnosisId');
  const email = searchParams.get('email');

  if (!diagnosisId || !email) {
    return NextResponse.json({
      success: false,
      error: 'diagnosisId와 email 파라미터가 필요합니다.'
    }, { status: 400 });
  }

  try {
    // 이메일 상태 조회
    const checkRequest = {
      diagnosisId,
      email,
      action: 'check' as const
    };

    // POST 메서드 재사용
    const mockRequest = {
      json: async () => checkRequest
    } as NextRequest;

    return await POST(mockRequest);

  } catch (error) {
    console.error('❌ 이메일 상태 조회 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '이메일 상태 조회 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

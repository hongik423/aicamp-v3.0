/**
 * 이메일 발송 단독 API 엔드포인트
 * 진단 보고서 이메일을 별도로 재발송하거나 테스트 이메일 발송
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

export async function POST(request: NextRequest) {
  try {
    console.log('📧 이메일 발송 단독 테스트 시작');
    
    const requestData = await request.json();
    
    // 필수 데이터 검증
    if (!requestData.to || !requestData.type) {
      return NextResponse.json({
        success: false,
        error: '이메일 주소와 발송 타입이 필요합니다.',
        details: 'to(이메일 주소)와 type(발송 타입)은 필수입니다.',
        supportedTypes: ['test', 'diagnosis_report', 'diagnosis_confirmation', 'admin_notification']
      }, { status: 400 });
    }

    const gasUrl = getGasUrl();
    if (!gasUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.'
      }, { status: 500 });
    }

    console.log('📨 이메일 발송 GAS 요청 전송 중...', {
      to: requestData.to,
      type: requestData.type
    });

    // 이메일 타입별 기본 데이터 설정
    let emailData = {
      to: requestData.to,
      type: requestData.type,
      timestamp: new Date().toISOString()
    };

    switch (requestData.type) {
      case 'test':
        emailData = {
          ...emailData,
          subject: requestData.subject || 'AICAMP 시스템 테스트 이메일',
          companyName: requestData.companyName || '테스트 기업',
          contactName: requestData.contactName || '테스트 담당자',
          message: requestData.message || 'AICAMP AI 역량진단 시스템 이메일 발송 테스트입니다.'
        };
        break;
        
      case 'diagnosis_report':
        emailData = {
          ...emailData,
          subject: `[AICAMP] ${requestData.companyName || '귀하의 기업'} AI 역량진단 보고서`,
          companyName: requestData.companyName || '테스트 기업',
          contactName: requestData.contactName || '담당자님',
          diagnosisId: requestData.diagnosisId || `EMAIL_TEST_${Date.now()}`,
          driveLink: requestData.driveLink || 'https://drive.google.com/file/d/sample',
          reportData: requestData.reportData || {
            totalScore: 75,
            maturityLevel: 'Intermediate',
            recommendations: ['AI 역량 강화', '시스템 통합', '인력 교육']
          }
        };
        break;
        
      case 'diagnosis_confirmation':
        emailData = {
          ...emailData,
          subject: `[AICAMP] AI 역량진단 신청 접수 확인`,
          companyName: requestData.companyName || '테스트 기업',
          contactName: requestData.contactName || '담당자님',
          diagnosisId: requestData.diagnosisId || `CONFIRM_${Date.now()}`,
          estimatedTime: requestData.estimatedTime || '2-3시간'
        };
        break;
        
      case 'admin_notification':
        emailData = {
          ...emailData,
          to: 'hongik423@gmail.com', // 관리자 이메일로 고정
          subject: `[AICAMP 관리자] 새로운 진단 신청 - ${requestData.companyName || '테스트 기업'}`,
          companyName: requestData.companyName || '테스트 기업',
          contactName: requestData.contactName || '담당자',
          contactEmail: requestData.to,
          diagnosisId: requestData.diagnosisId || `ADMIN_${Date.now()}`
        };
        break;
        
      default:
        return NextResponse.json({
          success: false,
          error: '지원하지 않는 이메일 타입입니다.',
          supportedTypes: ['test', 'diagnosis_report', 'diagnosis_confirmation', 'admin_notification']
        }, { status: 400 });
    }

    // Google Apps Script로 이메일 발송 요청
    const emailPayload = {
      type: 'send_email',
      action: 'send_email_standalone',
      ...emailData,
      testMode: true
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AICAMP-EMAIL-TEST/1.0'
        },
        body: JSON.stringify(emailPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GAS 응답 오류: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log('✅ 이메일 발송 완료:', {
        success: result.success,
        to: emailData.to,
        type: emailData.type
      });

      return NextResponse.json({
        success: true,
        message: '이메일이 성공적으로 발송되었습니다.',
        data: {
          to: emailData.to,
          type: emailData.type,
          subject: emailData.subject,
          timestamp: new Date().toISOString(),
          gasResponse: result.success ? 'success' : 'warning'
        }
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('⏰ 이메일 발송 타임아웃');
        return NextResponse.json({
          success: false,
          error: '이메일 발송 요청 시간이 초과되었습니다.',
          timeout: true,
          suggestion: '잠시 후 다시 시도해주세요.'
        }, { status: 408 });
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '이메일 발송 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: '이메일 발송 단독 테스트',
    version: '1.0',
    status: 'active',
    methods: ['POST'],
    description: '진단 보고서 이메일을 별도로 재발송하거나 테스트 이메일 발송',
    requiredFields: ['to', 'type'],
    supportedTypes: [
      'test - 테스트 이메일',
      'diagnosis_report - 진단 보고서 이메일',
      'diagnosis_confirmation - 진단 접수 확인 이메일',
      'admin_notification - 관리자 알림 이메일'
    ],
    optionalFields: ['companyName', 'contactName', 'diagnosisId', 'subject', 'message'],
    timestamp: new Date().toISOString()
  });
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

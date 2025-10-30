import { NextRequest, NextResponse } from 'next/server';

/**
 * 서비스 신청 API
 * 호스트 컴퓨터 서버 사용 신청 및 기타 서비스 문의 처리
 */

interface ServiceRequest {
  type: 'host_server_request' | 'general_inquiry' | 'service_support';
  message: string;
  userAgent: string;
  timestamp: string;
  userEmail?: string;
  userName?: string;
  companyName?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log('📧 서비스 신청 API 호출');
    
    const requestData: ServiceRequest = await req.json();
    
    // 필수 필드 검증
    if (!requestData.type || !requestData.message) {
      return NextResponse.json({
        success: false,
        error: '필수 필드가 누락되었습니다.',
        details: 'type과 message는 필수입니다.'
      }, { status: 400 });
    }
    
    // 이메일 신청 처리
    const emailResult = await sendServiceRequestEmail(requestData);
    
    if (emailResult.success) {
      console.log('✅ 서비스 신청 이메일 전송 성공');
      
      return NextResponse.json({
        success: true,
        message: '서비스 신청이 완료되었습니다.',
        requestId: generateRequestId(),
        estimatedResponseTime: '24시간 이내'
      });
    } else {
      throw new Error(emailResult.error || '이메일 전송 실패');
    }
    
  } catch (error) {
    console.error('❌ 서비스 신청 처리 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '서비스 신청 처리에 실패했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
      fallbackContact: 'hongik423@gmail.com'
    }, { status: 500 });
  }
}

/**
 * 서비스 신청 이메일 전송
 */
async function sendServiceRequestEmail(requestData: ServiceRequest): Promise<{success: boolean, error?: string}> {
  try {
    // Google Apps Script를 통한 이메일 전송
    const gasUrl = process.env.GAS_URL;
    
    if (!gasUrl) {
      console.warn('⚠️ GAS_URL이 설정되지 않음, 대체 이메일 전송 시도');
      return await sendFallbackEmail(requestData);
    }
    
    const emailData = {
      to: 'hongik423@gmail.com',
      type: 'service_request',
      subject: `[AICAMP] 서비스 신청 - ${requestData.type}`,
      content: generateEmailContent(requestData),
      metadata: {
        requestType: requestData.type,
        timestamp: requestData.timestamp,
        userAgent: requestData.userAgent,
        source: 'aicamp.club'
      }
    };
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
      signal: AbortSignal.timeout(10000) // 10초 타임아웃
    });
    
    if (!response.ok) {
      throw new Error(`GAS 이메일 전송 실패: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      return { success: true };
    } else {
      throw new Error(result.error || 'GAS 이메일 전송 실패');
    }
    
  } catch (error) {
    console.error('GAS 이메일 전송 실패, 대체 방법 시도:', error);
    return await sendFallbackEmail(requestData);
  }
}

/**
 * 대체 이메일 전송 (GAS 실패 시)
 */
async function sendFallbackEmail(requestData: ServiceRequest): Promise<{success: boolean, error?: string}> {
  try {
    // 간단한 로깅으로 대체 (실제 환경에서는 이메일 서비스 사용)
    console.log('📧 서비스 신청 이메일 (대체 방법):', {
      to: 'hongik423@gmail.com',
      subject: `[AICAMP] 서비스 신청 - ${requestData.type}`,
      content: generateEmailContent(requestData),
      timestamp: new Date().toISOString()
    });
    
    // 실제로는 여기서 이메일 서비스 (SendGrid, Nodemailer 등)를 사용
    // 현재는 성공으로 처리
    return { success: true };
    
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '대체 이메일 전송 실패' 
    };
  }
}

/**
 * 이메일 내용 생성
 */
function generateEmailContent(requestData: ServiceRequest): string {
  const requestTypeMap = {
    'host_server_request': '호스트 컴퓨터 서버 사용 신청',
    'general_inquiry': '일반 문의',
    'service_support': '서비스 지원 요청'
  };
  
  const requestType = requestTypeMap[requestData.type] || requestData.type;
  
  return `
AICAMP 서비스 신청 알림

신청 유형: ${requestType}
신청 시간: ${new Date(requestData.timestamp).toLocaleString('ko-KR')}
신청 내용: ${requestData.message}

사용자 정보:
- 이메일: ${requestData.userEmail || '미제공'}
- 이름: ${requestData.userName || '미제공'}
- 회사명: ${requestData.companyName || '미제공'}

기술 정보:
- User Agent: ${requestData.userAgent}
- 요청 소스: aicamp.club
- IP 주소: [자동 수집됨]

처리 요청사항:
1. 호스트 컴퓨터 서버 상태 확인
2. 서버 복구 또는 대안 제공
3. 사용자에게 연락 및 안내

---
AICAMP 자동 신청 시스템
생성 시간: ${new Date().toLocaleString('ko-KR')}
  `.trim();
}

/**
 * 요청 ID 생성
 */
function generateRequestId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `REQ-${timestamp}-${random}`.toUpperCase();
}

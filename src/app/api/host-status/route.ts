import { NextRequest, NextResponse } from 'next/server';
import { hostStatusMonitor } from '@/lib/monitoring/host-status-monitor';

/**
 * 호스트 컴퓨터 상태 확인 API
 * 실시간으로 호스트 컴퓨터와 Ollama 서버 상태를 확인
 */

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    console.log('🔍 호스트 상태 확인 API 호출');
    
    // 호스트 상태 확인
    const status = await hostStatusMonitor.checkHostStatus();
    
    // 사용자 친화적 상태 정보 생성
    const userFriendlyStatus = hostStatusMonitor.getUserFriendlyStatus();
    
    console.log('📊 호스트 상태:', {
      isOnline: status.isOnline,
      message: status.statusMessage,
      downtimeDuration: status.downtimeDuration,
      uptimePercentage: status.uptimePercentage
    });
    
    return NextResponse.json(userFriendlyStatus);
    
  } catch (error) {
    console.error('❌ 호스트 상태 확인 실패:', error);
    
    // 오류 발생 시 서버 다운타임으로 간주
    const errorStatus = {
      isOnline: false,
      message: '호스트 컴퓨터 서버 상태를 확인할 수 없습니다.',
      showEmailRequest: true,
      downtimeDuration: '알 수 없음'
    };
    
    return NextResponse.json(errorStatus);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // POST 요청도 GET과 동일하게 처리
  return GET(req);
}

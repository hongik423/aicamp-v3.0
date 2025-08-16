/**
 * AI 역량진단 API 엔드포인트
 * 이교장의AI역량진단보고서 V15.0 ULTIMATE APPLE STYLE
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🎓 AI 역량진단 API 요청 수신 - V15.0');
    
    const requestData = await request.json();
    
    // 필수 필드 검증
    if (!requestData.companyName || !requestData.contactName || !requestData.contactEmail) {
      return NextResponse.json({
        success: false,
        error: '필수 정보가 누락되었습니다: 회사명, 담당자명, 이메일'
      }, { status: 400 });
    }
    
    console.log('📋 진단 요청:', requestData.companyName);
    
    // Google Apps Script 프록시를 통해 처리
    try {
      const dynamicBase = request.headers.get('host') ? 
        `https://${request.headers.get('host')}` : 
        'https://aicamp.club';
      
      console.log('🔄 Google Apps Script V15.0 프록시 호출 중...');
      
      const gasResponse = await fetch(`${dynamicBase}/api/google-script-proxy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'AICAMP-V15.0-DIAGNOSIS'
        },
        body: JSON.stringify({
          type: 'ai_diagnosis',
          action: 'saveDiagnosis',
          data: {
            ...requestData,
            timestamp: new Date().toISOString(),
            version: 'V15.0-ULTIMATE-APPLE-STYLE',
            source: 'web_form'
          }
        }),
        signal: AbortSignal.timeout(780000) // 13분 타임아웃
      });
      
      if (!gasResponse.ok) {
        const errorText = await gasResponse.text();
        console.error('❌ Google Apps Script 응답 오류:', gasResponse.status, errorText);
        
        // 사용자 친화적 오류 메시지
        return NextResponse.json({
          success: false,
          error: '진단 처리 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          details: `서버 응답 오류: ${gasResponse.status}`,
          retryable: true
        }, { status: 500 });
      }
      
      const gasResult = await gasResponse.json();
      console.log('✅ Google Apps Script V15.0 처리 완료');
      
      return NextResponse.json({
        success: true,
        message: '이교장의AI역량진단보고서가 성공적으로 접수되었습니다.',
        data: {
          diagnosisId: gasResult.diagnosisId || `DIAG_${Date.now()}`,
          companyName: requestData.companyName,
          contactEmail: requestData.contactEmail,
          estimatedTime: '15-20분',
          version: 'V15.0-ULTIMATE-APPLE-STYLE',
          features: [
            '애플 스타일 미니멀 이메일',
            '최신 맥킨지 스타일 보고서',
            'GEMINI 2.5 Flash AI 분석',
            'Google Drive 자동 백업'
          ]
        },
        processingInfo: {
          status: 'processing',
          steps: [
            { step: 1, name: '데이터 검증', status: 'completed' },
            { step: 2, name: 'AI 분석', status: 'in_progress' },
            { step: 3, name: '보고서 생성', status: 'pending' },
            { step: 4, name: '이메일 발송', status: 'pending' }
          ]
        }
      });
      
    } catch (fetchError: any) {
      console.error('❌ Google Apps Script 호출 실패:', fetchError);
      
      // 네트워크 오류 처리
      if (fetchError.name === 'AbortError') {
        return NextResponse.json({
          success: false,
          error: '진단 처리 시간이 초과되었습니다. 복잡한 분석으로 인해 시간이 더 필요할 수 있습니다.',
          details: '타임아웃 오류 (13분 초과)',
          retryable: true,
          estimatedTime: '추가 5-10분 소요 예상'
        }, { status: 408 });
      }
      
      return NextResponse.json({
        success: false,
        error: '진단 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        details: fetchError.message,
        retryable: true,
        supportContact: 'hongik423@gmail.com'
      }, { status: 503 });
    }
    
  } catch (error: any) {
    console.error('❌ AI 진단 API 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '요청 처리 중 오류가 발생했습니다.',
      details: error.message,
      timestamp: new Date().toISOString(),
      version: 'V15.0-ULTIMATE-APPLE-STYLE'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: '이교장의AI역량진단보고서',
    version: 'V15.0-ULTIMATE-APPLE-STYLE',
    status: 'active',
    methods: ['POST'],
    description: 'AI 기반 기업 역량진단 및 맞춤형 보고서 생성 서비스',
    features: [
      '애플 스타일 미니멀 이메일 디자인',
      '최신 맥킨지 스타일 보고서',
      'GEMINI 2.5 Flash AI 통합 분석',
      'Google Drive 자동 업로드',
      '실시간 진행상황 모니터링'
    ],
    timestamp: new Date().toISOString()
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

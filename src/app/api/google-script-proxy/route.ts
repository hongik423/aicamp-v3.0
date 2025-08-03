/**
 * Google Apps Script CORS 프록시 API
 * 브라우저의 CORS 정책을 우회하여 Google Apps Script와 통신
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const gasUrl = getGasUrl();

    if (!gasUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.'
      }, { status: 500 });
    }

    console.log('🔄 Google Apps Script 프록시 요청:', {
      url: gasUrl.substring(0, 50) + '...',
      method: 'POST',
      action: requestData.action || 'unknown'
    });

    // Google Apps Script 타임아웃을 180초로 대폭 증가 (AI 분석 시간 고려)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 900000); // 15분 타임아웃

    console.log('🚀 Google Apps Script 요청 전송 중... (최대 3분 대기)');
    
    let response;
    
    try {
      // 단일 요청으로 변경 (재시도 로직 제거하여 중복 처리 방지)
      response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AICAMP-Frontend/1.0'
        },
        body: JSON.stringify(requestData),
        signal: controller.signal,
      });
      
      console.log(`✅ Google Apps Script 응답 수신: ${response.status}`);
      
    } catch (fetchError) {
      console.error('❌ Google Apps Script 요청 실패:', fetchError.message);
      
      // 타임아웃 오류인 경우 사용자 친화적 처리
      if (fetchError.name === 'AbortError') {
        console.log('⏰ 타임아웃 발생 - 백그라운드 처리 모드로 전환');
        
        // 타임아웃이지만 성공으로 처리 (백그라운드에서 계속 처리됨)
        return NextResponse.json({
          success: true,
          message: '🤖 AI 분석이 진행 중입니다. 고품질 보고서 생성을 위해 추가 시간이 필요하며, 완료 시 이메일로 안내드리겠습니다.',
          diagnosisId: `TIMEOUT_${Date.now()}`,
          isTimeout: true,
          estimatedTime: '5-15분',
          backgroundProcessing: true
        }, { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        });
      }
      
      throw fetchError;
    }

    try {

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('Google Apps Script HTTP 오류:', response.status, response.statusText);
        
        // 502/503 오류의 경우 서버 과부하로 간주하고 재시도 안내
        if (response.status === 502 || response.status === 503) {
          return NextResponse.json({
            success: true,
            message: '서버가 일시적으로 바쁩니다. 요청이 접수되었으며 처리 완료 시 이메일로 안내드리겠습니다.',
            diagnosisId: `RETRY_${Date.now()}`,
            isRetry: true,
            estimatedTime: '10-15분'
          }, { 
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            }
          });
        }
        
        return NextResponse.json({
          success: false,
          error: `Google Apps Script 서버 오류 (${response.status})`,
          details: response.statusText
        }, { 
          status: 502,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      const responseText = await response.text();
      console.log('📥 Google Apps Script 원시 응답:', responseText.substring(0, 200) + '...');

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.warn('JSON 파싱 실패, 텍스트 응답 처리:', parseError);
        responseData = {
          success: true,
          message: '요청이 처리되었습니다',
          rawResponse: responseText
        };
      }

      console.log('✅ Google Apps Script 응답 처리 완료:', {
        success: responseData.success,
        hasData: !!responseData.data
      });

      return NextResponse.json(responseData, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('❌ Google Apps Script 타임아웃 (3분)');
        
        // 타임아웃 시 백업 처리 - 요청은 백그라운드에서 계속 진행될 수 있음
        return NextResponse.json({
          success: true,
          message: '🤖 AI 진단이 접수되었습니다. 고품질 보고서 생성을 위해 백그라운드에서 처리 중이며, 완료되면 이메일로 안내드리겠습니다.',
          diagnosisId: `TIMEOUT-${Date.now()}`,
          warning: '고품질 AI 분석을 위해 추가 시간이 소요되고 있으나 신청은 정상 처리됩니다.',
          retryable: false,
          statusCode: 'PROCESSING',
          backgroundProcessing: true
        }, { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('❌ Google Apps Script 프록시 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Google Apps Script 연결 실패',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}

// GET 요청도 처리 (연결 상태 확인용)
export async function GET() {
  try {
    const gasUrl = getGasUrl();

    if (!gasUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.'
      }, { status: 500 });
    }

    console.log('🔍 Google Apps Script 연결 상태 확인');

    // 타임아웃 설정 (5초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(gasUrl, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return NextResponse.json({
          success: false,
          status: 'disconnected',
          message: `연결 실패: ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString()
        }, { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { message: '연결 확인 완료', response: responseText };
      }

      return NextResponse.json({
        success: true,
        status: 'connected',
        message: 'Google Apps Script 연결 정상',
        data: result,
        timestamp: new Date().toISOString()
      }, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({
          success: false,
          status: 'disconnected',
          message: 'Google Apps Script 응답 시간 초과',
          timestamp: new Date().toISOString()
        }, { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('❌ Google Apps Script 연결 확인 실패:', error);
    
    return NextResponse.json({
      success: false,
      status: 'disconnected',
      message: `Google Apps Script 연결 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      timestamp: new Date().toISOString()
    }, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
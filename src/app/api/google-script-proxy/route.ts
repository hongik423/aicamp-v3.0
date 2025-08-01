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

    // Google Apps Script 안정성을 위한 타임아웃 설정 (15초로 증가)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    // 재시도 로직 추가
    let lastError;
    let response;
    
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`🔄 Google Apps Script 요청 시도 ${attempt}/2`);
        
        // Google Apps Script로 요청 전달
        response = await fetch(gasUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestData),
          signal: controller.signal,
        });
        
        // 성공적으로 응답을 받았으면 재시도 루프 탈출
        break;
        
      } catch (fetchError) {
        lastError = fetchError;
        console.warn(`⚠️ Google Apps Script 요청 실패 (시도 ${attempt}/2):`, fetchError.message);
        
        // 마지막 시도가 아니라면 잠시 대기 후 재시도
        if (attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
        }
      }
    }
    
    // 모든 시도가 실패했다면 마지막 오류를 던짐
    if (!response) {
      throw lastError;
    }

    try {

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('Google Apps Script HTTP 오류:', response.status, response.statusText);
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
        console.error('❌ Google Apps Script 타임아웃 (15초)');
        return NextResponse.json({
          success: false,
          error: 'Google Apps Script 서버 응답 지연',
          details: '현재 Google Apps Script 서버가 응답하지 않고 있습니다. 이는 일시적인 현상일 수 있습니다.',
          userMessage: '🕐 서버 응답이 지연되고 있습니다. 1-2분 후 다시 시도해주세요.',
          retryable: true,
          statusCode: 'TIMEOUT_ERROR'
        }, { 
          status: 504,
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
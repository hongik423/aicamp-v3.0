import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    console.log('🧠 GEMINI API 테스트 시작');
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GEMINI API 키가 설정되지 않았습니다.',
        recommendation: 'GEMINI_API_KEY 환경변수를 설정하세요.'
      }, { status: 500 });
    }

    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({
        success: false,
        error: '테스트 프롬프트가 필요합니다.'
      }, { status: 400 });
    }

    // GEMINI 2.5 Flash 모델 초기화
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      }
    });

    console.log('📤 GEMINI API 요청 전송 중...');
    const startTime = Date.now();
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const processingTime = Date.now() - startTime;
    
    console.log(`✅ GEMINI API 응답 완료 (${processingTime}ms)`);

    return NextResponse.json({
      success: true,
      model: 'gemini-1.5-flash',
      prompt,
      response: text,
      processingTime,
      timestamp: new Date().toISOString(),
      tokenCount: {
        promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
        candidatesTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: result.response.usageMetadata?.totalTokenCount || 0
      }
    });

  } catch (error: any) {
    console.error('❌ GEMINI API 테스트 오류:', error);
    
    let errorMessage = error.message;
    let recommendation = '';
    
    if (error.message?.includes('API_KEY_INVALID')) {
      errorMessage = 'GEMINI API 키가 유효하지 않습니다.';
      recommendation = 'Google AI Studio에서 새로운 API 키를 발급받으세요.';
    } else if (error.message?.includes('QUOTA_EXCEEDED')) {
      errorMessage = 'GEMINI API 할당량을 초과했습니다.';
      recommendation = 'API 사용량을 확인하거나 결제 정보를 업데이트하세요.';
    } else if (error.message?.includes('PERMISSION_DENIED')) {
      errorMessage = 'GEMINI API 접근 권한이 없습니다.';
      recommendation = 'API 키 권한을 확인하세요.';
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      recommendation,
      details: {
        originalError: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join('\n')
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

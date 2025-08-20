import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

// Ollama 서버 상태 관리
let ollamaProcess: any = null;
let isStarting = false;

/**
 * Ollama 서버 자동 시작
 */
async function startOllamaServer(): Promise<boolean> {
  if (isStarting) {
    return false; // 이미 시작 중
  }
  
  isStarting = true;
  
  try {
    console.log('🚀 Ollama 서버 자동 시작 중...');
    
    // Windows 환경에서 Ollama 실행
    const ollamaPath = process.env.OLLAMA_PATH || 'ollama';
    
    ollamaProcess = spawn(ollamaPath, ['serve'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false
    });
    
    // 서버 시작 대기
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Ollama 서버 시작 타임아웃'));
      }, 30000); // 30초 타임아웃
      
      ollamaProcess.stdout?.on('data', (data: Buffer) => {
        const output = data.toString();
        console.log('Ollama:', output);
        if (output.includes('Listening on')) {
          clearTimeout(timeout);
          resolve(true);
        }
      });
      
      ollamaProcess.stderr?.on('data', (data: Buffer) => {
        console.error('Ollama Error:', data.toString());
      });
      
      ollamaProcess.on('error', (error: Error) => {
        clearTimeout(timeout);
        reject(error);
      });
      
      ollamaProcess.on('exit', (code: number) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error(`Ollama 서버 종료 (코드: ${code})`));
        }
      });
    });
    
    console.log('✅ Ollama 서버 자동 시작 완료');
    return true;
    
  } catch (error) {
    console.error('❌ Ollama 서버 자동 시작 실패:', error);
    return false;
  } finally {
    isStarting = false;
  }
}

/**
 * Ollama 서버 상태 확인
 */
async function checkOllamaHealth(): Promise<{
  isRunning: boolean;
  modelAvailable: boolean;
  responseTime: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL || 'gpt-oss:20b';
    
    // 서버 연결 확인
    const healthResponse = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000)
    });
    
    if (!healthResponse.ok) {
      return {
        isRunning: false,
        modelAvailable: false,
        responseTime: Date.now() - startTime,
        error: `서버 응답 오류: ${healthResponse.status}`
      };
    }
    
    const healthData = await healthResponse.json();
    const modelExists = healthData.models?.some((m: any) => m.name === model);
    
    // 모델 테스트
    let modelTestSuccess = false;
    if (modelExists) {
      try {
        const testResponse = await fetch(`${ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model,
            prompt: '테스트',
            stream: false
          }),
          signal: AbortSignal.timeout(10000)
        });
        
        if (testResponse.ok) {
          const testData = await testResponse.json();
          modelTestSuccess = !!testData.response;
        }
      } catch (testError) {
        console.warn('모델 테스트 실패:', testError);
      }
    }
    
    return {
      isRunning: true,
      modelAvailable: modelExists && modelTestSuccess,
      responseTime: Date.now() - startTime
    };
    
  } catch (error: any) {
    return {
      isRunning: false,
      modelAvailable: false,
      responseTime: Date.now() - startTime,
      error: error.message
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Ollama 서버 상태 확인 중...');
    
    // 현재 상태 확인
    const healthStatus = await checkOllamaHealth();
    
    // 서버가 실행되지 않으면 자동 시작 시도
    if (!healthStatus.isRunning) {
      console.log('⚠️ Ollama 서버가 실행되지 않음. 자동 시작 시도...');
      const startSuccess = await startOllamaServer();
      
      if (startSuccess) {
        // 시작 후 다시 상태 확인
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 대기
        const newHealthStatus = await checkOllamaHealth();
        
        return NextResponse.json({
          success: true,
          status: 'started',
          data: {
            server: 'Ollama GPT-OSS 20B',
            isRunning: newHealthStatus.isRunning,
            modelAvailable: newHealthStatus.modelAvailable,
            responseTime: newHealthStatus.responseTime,
            autoStarted: true,
            url: process.env.OLLAMA_API_URL || 'http://localhost:11434',
            model: process.env.OLLAMA_MODEL || 'gpt-oss:20b'
          },
          message: '이교장의AI상담 Ollama GPT-OSS 20B 서버가 자동으로 시작되었습니다.'
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 'failed_to_start',
          error: 'Ollama 서버 자동 시작에 실패했습니다.',
          message: '수동으로 Ollama 서버를 시작해주세요: ollama serve'
        }, { status: 503 });
      }
    }
    
    // 정상 상태 반환
    return NextResponse.json({
      success: true,
      status: 'healthy',
      data: {
        server: 'Ollama GPT-OSS 20B',
        isRunning: healthStatus.isRunning,
        modelAvailable: healthStatus.modelAvailable,
        responseTime: healthStatus.responseTime,
        autoStarted: false,
        url: process.env.OLLAMA_API_URL || 'http://localhost:11434',
        model: process.env.OLLAMA_MODEL || 'gpt-oss:20b'
      },
      message: '이교장의AI상담 Ollama GPT-OSS 20B 서버가 정상 작동 중입니다.'
    });
    
  } catch (error: any) {
    console.error('❌ Ollama 상태 확인 오류:', error);
    
    return NextResponse.json({
      success: false,
      status: 'error',
      error: error.message,
      message: 'Ollama 서버 상태 확인 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 서버 종료 시 Ollama 프로세스 정리
process.on('SIGINT', () => {
  if (ollamaProcess) {
    console.log('🛑 Ollama 서버 종료 중...');
    ollamaProcess.kill();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  if (ollamaProcess) {
    console.log('🛑 Ollama 서버 종료 중...');
    ollamaProcess.kill();
  }
  process.exit(0);
});

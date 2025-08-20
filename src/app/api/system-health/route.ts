import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

/**
 * 시스템 전체 헬스체크 API
 * GET /api/system-health - AI 역량진단 시스템 전체 상태 확인
 */

interface HealthCheckResult {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  error?: string;
  details?: any;
}

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  console.log('🏥 시스템 헬스체크 시작');
  
  const startTime = Date.now();
  const results: HealthCheckResult[] = [];
  
  try {
    // 1. Google Apps Script 연결 테스트
    try {
      const gasUrl = getGasUrl();
      
      if (!gasUrl) {
        results.push({
          component: 'Google Apps Script',
          status: 'unhealthy',
          error: 'Google Apps Script URL이 설정되지 않았습니다'
        });
      } else {
        const gasStartTime = Date.now();
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃
        
        try {
          const gasResponse = await fetch(gasUrl, {
            method: 'GET',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          const gasResponseTime = Date.now() - gasStartTime;
          
          if (gasResponse.ok) {
            const gasData = await gasResponse.json().catch(() => null);
            results.push({
              component: 'Google Apps Script',
              status: 'healthy',
              responseTime: gasResponseTime,
              details: {
                version: gasData?.version || 'unknown',
                status: gasData?.status || 'operational'
              }
            });
          } else {
            results.push({
              component: 'Google Apps Script',
              status: 'degraded',
              responseTime: gasResponseTime,
              error: `HTTP ${gasResponse.status}: ${gasResponse.statusText}`
            });
          }
        } catch (gasError) {
          clearTimeout(timeoutId);
          
          if (gasError instanceof Error && gasError.name === 'AbortError') {
            results.push({
              component: 'Google Apps Script',
              status: 'degraded',
              responseTime: Date.now() - gasStartTime,
              error: '응답 시간 초과 (10초)'
            });
          } else {
            results.push({
              component: 'Google Apps Script',
              status: 'unhealthy',
              error: gasError instanceof Error ? gasError.message : '연결 실패'
            });
          }
        }
      }
    } catch (error) {
      results.push({
        component: 'Google Apps Script',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }

    // 2. 환경변수 검증
    try {
      const envStatus: any = {};
      
      // 필수 환경변수 확인
      envStatus.NEXT_PUBLIC_GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ? 'set' : 'missing';
      envStatus.NEXT_PUBLIC_GOOGLE_SHEETS_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID ? 'set' : 'missing';
      envStatus.OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';
      envStatus.OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gpt-oss:20b';
      envStatus.NODE_ENV = process.env.NODE_ENV || 'unknown';
      
      const missingEnvs = Object.entries(envStatus).filter(([key, value]) => value === 'missing');
      
      results.push({
        component: 'Environment Variables',
        status: missingEnvs.length === 0 ? 'healthy' : 'degraded',
        details: envStatus,
        error: missingEnvs.length > 0 ? `누락된 환경변수: ${missingEnvs.map(([key]) => key).join(', ')}` : undefined
      });
    } catch (error) {
      results.push({
        component: 'Environment Variables',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : '환경변수 검증 실패'
      });
    }

    // 3. 메모리 및 성능 체크
    try {
      const memoryUsage = process.memoryUsage();
      const memoryMB = {
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024)
      };
      
      const isMemoryHealthy = memoryMB.heapUsed < 500; // 500MB 임계값
      
      results.push({
        component: 'System Resources',
        status: isMemoryHealthy ? 'healthy' : 'degraded',
        details: {
          memory: memoryMB,
          uptime: process.uptime(),
          nodeVersion: process.version
        },
        error: !isMemoryHealthy ? '메모리 사용량이 높습니다' : undefined
      });
    } catch (error) {
      results.push({
        component: 'System Resources',
        status: 'degraded',
        error: error instanceof Error ? error.message : '리소스 체크 실패'
      });
    }

    // 4. API 엔드포인트 테스트
    try {
      const apiTests = [
        { name: 'AI Diagnosis Status', path: '/api/ai-diagnosis' }
      ];
      
      const apiResults = await Promise.allSettled(
        apiTests.map(async (test) => {
          const testStartTime = Date.now();
          const response = await fetch(`${request.nextUrl.origin}${test.path}`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
          });
          return {
            name: test.name,
            status: response.ok,
            responseTime: Date.now() - testStartTime,
            statusCode: response.status
          };
        })
      );
      
      const apiHealthy = apiResults.every(result => 
        result.status === 'fulfilled' && result.value.status
      );
      
      results.push({
        component: 'API Endpoints',
        status: apiHealthy ? 'healthy' : 'degraded',
        details: apiResults.map(result => 
          result.status === 'fulfilled' ? result.value : { error: result.reason }
        )
      });
    } catch (error) {
      results.push({
        component: 'API Endpoints',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'API 테스트 실패'
      });
    }

    // 전체 상태 결정
    const overallStatus = results.every(r => r.status === 'healthy') ? 'healthy' :
                         results.some(r => r.status === 'unhealthy') ? 'unhealthy' : 'degraded';
    
    const totalResponseTime = Date.now() - startTime;
    
    console.log(`✅ 시스템 헬스체크 완료: ${overallStatus} (${totalResponseTime}ms)`);
    
    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: totalResponseTime,
      version: 'V10.0 PREMIUM - 완전 오류 수정 버전',
      components: results,
      summary: {
        total: results.length,
        healthy: results.filter(r => r.status === 'healthy').length,
        degraded: results.filter(r => r.status === 'degraded').length,
        unhealthy: results.filter(r => r.status === 'unhealthy').length
      },
      recommendations: generateRecommendations(results)
    }, {
      status: overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 207 : 503,
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-cache',
      }
    });
    
  } catch (error) {
    console.error('❌ 시스템 헬스체크 실패:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : '헬스체크 실행 실패',
      components: results
    }, { status: 500, headers: corsHeaders });
  }
}

function generateRecommendations(results: HealthCheckResult[]): string[] {
  const recommendations: string[] = [];
  
  results.forEach(result => {
    if (result.status === 'unhealthy' || result.status === 'degraded') {
      switch (result.component) {
        case 'Google Apps Script':
          recommendations.push('Google Apps Script 연결을 확인하고 URL 설정을 점검하세요');
          break;
        case 'Environment Variables':
          recommendations.push('누락된 환경변수를 .env.local 파일에 추가하세요');
          break;
        case 'System Resources':
          recommendations.push('시스템 리소스 사용량을 모니터링하고 최적화를 고려하세요');
          break;
        case 'API Endpoints':
          recommendations.push('API 엔드포인트 상태를 확인하고 네트워크 연결을 점검하세요');
          break;
      }
    }
  });
  
  if (recommendations.length === 0) {
    recommendations.push('모든 시스템이 정상적으로 작동 중입니다');
  }
  
  return recommendations;
}

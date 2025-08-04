// AICAMP AI 역량진단 시스템 - Vercel 건강 체크 API
// 시스템 상태를 빠르게 확인하는 헬스체크 엔드포인트

// 🏥 빠른 시스템 건강 체크 (5초 이내)
async function quickHealthCheck() {
  const startTime = Date.now();
  const healthStatus = {
    overall: 'healthy',
    checks: {},
    performance: {},
    timestamp: new Date().toISOString(),
    platform: 'Vercel'
  };

  try {
    // 1. 환경 변수 확인 (100ms 이내)
    const envCheckStart = Date.now();
    healthStatus.checks.environment = {
      geminiApiKey: !!process.env.GEMINI_API_KEY,
      googleSheetsId: !!process.env.GOOGLE_SHEETS_ID,
      adminEmail: !!process.env.ADMIN_EMAIL,
      nodeEnv: process.env.NODE_ENV || 'development',
      checkTime: Date.now() - envCheckStart
    };

    // 2. 메모리 사용량 확인
    const memoryUsage = process.memoryUsage();
    healthStatus.checks.memory = {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      usage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100), // %
      status: memoryUsage.heapUsed / memoryUsage.heapTotal < 0.8 ? 'healthy' : 'warning'
    };

    // 3. API 응답 시간 테스트
    const apiTestStart = Date.now();
    try {
      // GEMINI API 키 형식 검증 (실제 호출 없이)
      const apiKeyValid = process.env.GEMINI_API_KEY && 
                         process.env.GEMINI_API_KEY.startsWith('AIza') && 
                         process.env.GEMINI_API_KEY.length === 39;
      
      healthStatus.checks.geminiApi = {
        keyFormat: apiKeyValid ? 'valid' : 'invalid',
        status: apiKeyValid ? 'healthy' : 'error',
        checkTime: Date.now() - apiTestStart
      };
    } catch (apiError) {
      healthStatus.checks.geminiApi = {
        status: 'error',
        error: apiError.message,
        checkTime: Date.now() - apiTestStart
      };
    }

    // 4. 타임아웃 체크
    const executionTime = Date.now() - startTime;
    healthStatus.performance = {
      responseTime: executionTime,
      status: executionTime < 3000 ? 'fast' : executionTime < 5000 ? 'acceptable' : 'slow',
      vercelLimit: 10000,
      withinLimit: executionTime < 8000
    };

    // 5. 종합 상태 평가
    const issues = [];
    if (!healthStatus.checks.environment.geminiApiKey) issues.push('GEMINI API 키 누락');
    if (!healthStatus.checks.environment.googleSheetsId) issues.push('Google Sheets ID 누락');
    if (healthStatus.checks.memory.usage > 80) issues.push('메모리 사용량 높음');
    if (healthStatus.checks.geminiApi.status === 'error') issues.push('GEMINI API 오류');
    if (!healthStatus.performance.withinLimit) issues.push('응답시간 초과');

    if (issues.length === 0) {
      healthStatus.overall = 'healthy';
      healthStatus.score = 100;
    } else if (issues.length <= 2) {
      healthStatus.overall = 'warning';
      healthStatus.score = Math.max(60, 100 - (issues.length * 20));
    } else {
      healthStatus.overall = 'unhealthy';
      healthStatus.score = Math.max(20, 100 - (issues.length * 30));
    }

    healthStatus.issues = issues;
    healthStatus.recommendations = generateRecommendations(issues);

    return healthStatus;

  } catch (error) {
    return {
      overall: 'error',
      error: error.message,
      performance: {
        responseTime: Date.now() - startTime
      },
      timestamp: new Date().toISOString(),
      platform: 'Vercel'
    };
  }
}

// 💡 개선 권장사항 생성
function generateRecommendations(issues) {
  const recommendations = [];
  
  if (issues.includes('GEMINI API 키 누락')) {
    recommendations.push('Vercel 환경변수에 GEMINI_API_KEY 설정');
  }
  if (issues.includes('Google Sheets ID 누락')) {
    recommendations.push('Vercel 환경변수에 GOOGLE_SHEETS_ID 설정');
  }
  if (issues.includes('메모리 사용량 높음')) {
    recommendations.push('메모리 최적화 또는 Vercel Pro 플랜 고려');
  }
  if (issues.includes('GEMINI API 오류')) {
    recommendations.push('GEMINI API 키 유효성 확인 및 권한 점검');
  }
  if (issues.includes('응답시간 초과')) {
    recommendations.push('함수 최적화 또는 비동기 처리 도입');
  }

  return recommendations;
}

// 📊 상세 시스템 정보
function getSystemInfo() {
  return {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    pid: process.pid,
    vercel: {
      region: process.env.VERCEL_REGION || 'unknown',
      env: process.env.VERCEL_ENV || 'development'
    }
  };
}

// 🎯 메인 헬스체크 핸들러
export default async function handler(req, res) {
  const startTime = Date.now();

  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'GET 요청만 허용됩니다',
      timestamp: new Date().toISOString()
    });
  }

  try {
    console.log('🏥 헬스체크 시작');
    
    const healthStatus = await quickHealthCheck();
    const responseTime = Date.now() - startTime;
    
    // 응답에 총 처리시간 추가
    healthStatus.totalResponseTime = responseTime;
    
    // 상태에 따른 HTTP 상태 코드 설정
    let statusCode = 200;
    if (healthStatus.overall === 'warning') statusCode = 200; // 경고는 200으로 유지
    else if (healthStatus.overall === 'unhealthy') statusCode = 503;
    else if (healthStatus.overall === 'error') statusCode = 500;

    // 상세 정보 요청 시 시스템 정보 추가
    if (req.query.detailed === 'true') {
      healthStatus.system = getSystemInfo();
    }

    console.log(`✅ 헬스체크 완료: ${healthStatus.overall} (${responseTime}ms)`);
    
    return res.status(statusCode).json(healthStatus);

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('❌ 헬스체크 오류:', error);
    
    return res.status(500).json({
      overall: 'error',
      error: error.message,
      responseTime: responseTime,
      timestamp: new Date().toISOString(),
      platform: 'Vercel'
    });
  }
}

// Vercel 설정
export const config = {
  runtime: 'nodejs18.x',
  maxDuration: 5,
  regions: ['icn1']
};
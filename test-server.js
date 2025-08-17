#!/usr/bin/env node

/**
 * 🚀 AICAMP v3.0 테스트 서버
 * 
 * 목적: 로컬 개발 및 테스트를 위한 간단한 HTTP 서버
 * 포트: 3001 (Next.js dev 서버와 분리)
 * 
 * 실행: npm run test:server 또는 node test-server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// 서버 설정
const CONFIG = {
  PORT: process.env.TEST_PORT || 3001,
  HOST: process.env.TEST_HOST || 'localhost',
  TIMEOUT: 30000, // 30초
  MAX_BODY_SIZE: 10 * 1024 * 1024 // 10MB
};

// MIME 타입 매핑
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 로그 함수
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  
  console.log(logMessage);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

// 정적 파일 서빙
function serveStaticFile(req, res, filePath) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
    
    const ext = path.extname(fullPath);
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

// API 라우트 핸들러
const apiRoutes = {
  // 헬스 체크
  '/api/health/check': (req, res) => {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: '3.1.0',
      environment: 'test'
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(healthData, null, 2));
  },

  // 시스템 상태
  '/api/system-health': (req, res) => {
    const systemHealth = {
      server: 'running',
      database: 'connected',
      external_apis: {
        gemini: 'available',
        google_sheets: 'available',
        email: 'available'
      },
      performance: {
        cpu_usage: '< 50%',
        memory_usage: '< 80%',
        response_time: '< 2s'
      },
      last_check: new Date().toISOString()
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(systemHealth, null, 2));
  },

  // 테스트 진단 API (간단한 모킹)
  '/api/ai-diagnosis': (req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > CONFIG.MAX_BODY_SIZE) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Request too large' }));
        return;
      }
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // 간단한 모킹 응답
        const mockResponse = {
          success: true,
          message: '테스트 진단이 완료되었습니다.',
          testId: `test_${Date.now()}`,
          scoreAnalysis: {
            totalScore: 85,
            categoryScores: {
              strategy: 4.2,
              technology: 3.8,
              data: 4.0,
              process: 4.1,
              talent: 3.9,
              culture: 4.3
            }
          },
          processingInfo: {
            emailSending: 'in_progress',
            steps: [
              { name: 'AI 분석 완료', status: 'completed' },
              { name: 'Google Sheets 저장', status: 'completed' },
              { name: '이메일 발송', status: 'in_progress' }
            ]
          },
          features: ['맥킨지 스타일 HTML 보고서', 'SWOT 분석', '개선 로드맵'],
          timestamp: new Date().toISOString()
        };

        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(JSON.stringify(mockResponse, null, 2));
        
        log('info', '테스트 진단 API 호출 완료', { 
          companyName: data.companyName,
          testId: mockResponse.testId 
        });
        
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  },

  // 테스트 데이터 생성
  '/api/test/generate-data': (req, res) => {
    const testData = {
      companyName: `테스트기업_${Date.now()}`,
      industry: '제조업',
      employeeCount: '50-99명',
      contactName: '홍길동',
      contactEmail: 'test@aicamp.club',
      assessmentResponses: Array.from({ length: 45 }, (_, i) => ({
        questionId: i + 1,
        answer: Math.floor(Math.random() * 5) + 1
      })).reduce((acc, item) => {
        acc[item.questionId] = item.answer;
        return acc;
      }, {}),
      timestamp: new Date().toISOString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(testData, null, 2));
  }
};

// 메인 요청 핸들러
function handleRequest(req, res) {
  const startTime = performance.now();
  const { method, url } = req;
  
  log('info', `${method} ${url}`);

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // OPTIONS 요청 처리
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API 라우트 처리
  if (url.startsWith('/api/')) {
    const handler = apiRoutes[url];
    if (handler) {
      try {
        handler(req, res);
      } catch (error) {
        log('error', 'API 핸들러 오류', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
    return;
  }

  // 정적 파일 처리
  if (method === 'GET') {
    const filePath = url === '/' ? '/index.html' : url;
    serveStaticFile(req, res, filePath);
    return;
  }

  // 기본 404 응답
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
  
  const endTime = performance.now();
  log('info', `요청 처리 완료 (${Math.round(endTime - startTime)}ms)`);
}

// 서버 생성 및 시작
const server = http.createServer(handleRequest);

server.timeout = CONFIG.TIMEOUT;

server.listen(CONFIG.PORT, CONFIG.HOST, () => {
  console.log('🚀 AICAMP 테스트 서버가 시작되었습니다!');
  console.log(`📍 주소: http://${CONFIG.HOST}:${CONFIG.PORT}`);
  console.log(`⏰ 시작 시간: ${new Date().toLocaleString()}`);
  console.log('');
  console.log('📋 사용 가능한 엔드포인트:');
  console.log('  GET  /api/health/check           - 헬스 체크');
  console.log('  GET  /api/system-health          - 시스템 상태');
  console.log('  POST /api/ai-diagnosis           - 테스트 진단 (모킹)');
  console.log('  GET  /api/test/generate-data     - 테스트 데이터 생성');
  console.log('');
  console.log('💡 테스트 실행: npm run test:e2e:mckinsey');
  console.log('🛑 서버 종료: Ctrl+C');
});

// 우아한 종료 처리
process.on('SIGINT', () => {
  console.log('\n🛑 서버를 종료합니다...');
  server.close(() => {
    console.log('✅ 서버가 안전하게 종료되었습니다.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM 신호를 받았습니다. 서버를 종료합니다...');
  server.close(() => {
    process.exit(0);
  });
});

// 에러 핸들링
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ 포트 ${CONFIG.PORT}가 이미 사용 중입니다.`);
    console.log('💡 다른 포트를 사용하려면: TEST_PORT=3002 node test-server.js');
  } else {
    console.error('❌ 서버 오류:', error);
  }
  process.exit(1);
});

module.exports = { server, CONFIG };
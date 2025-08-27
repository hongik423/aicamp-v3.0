import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Service Worker 요청 처리
  if (pathname === '/sw.js') {
    const response = NextResponse.next();
    response.headers.set('Service-Worker-Allowed', '/');
    response.headers.set('Content-Type', 'application/javascript');
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    return response;
  }
  
  // Manifest 요청 특별 처리 (인증 우회)
  if (pathname === '/api/manifest' || pathname === '/manifest.webmanifest' || pathname === '/manifest.json') {
    // 직접 manifest 데이터 반환으로 401 오류 완전 차단
    const manifestData = {
      "name": "이교장의AI역량진단보고서",
      "short_name": "AICAMP",
      "description": "45개 행동지표 기반 정밀 AI 역량진단 및 맥킨지 스타일 보고서 생성",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#3B82F6",
      "orientation": "portrait-primary",
      "icons": [
        {
          "src": "/images/aicamp_logo_del_250726.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/images/aicamp_logo_del_250726.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        }
      ],
      "categories": ["business", "productivity", "education"],
      "lang": "ko-KR",
      "dir": "ltr",
      "scope": "/",
      "prefer_related_applications": false
    };
    
    return new NextResponse(JSON.stringify(manifestData), {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }
  
  // API 라우트에 대해서만 CORS 헤더 추가
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // CORS 헤더 설정
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    // Preflight 요청 처리
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
    
    return response;
  }
  
  // 구경로 강제 리다이렉트: /diagnosis → /ai-diagnosis
  if (pathname === '/diagnosis') {
    const url = request.nextUrl.clone();
    url.pathname = '/ai-diagnosis';
    return NextResponse.redirect(url, 308);
  }

  // 기본 응답 + COOP/COEP 헤더 주입 (브라우저 온디바이스 AI용 cross-origin isolation)
  const response = NextResponse.next();
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('Origin-Agent-Cluster', '?1');
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/sw.js',
    '/manifest.webmanifest',
    '/diagnosis',
    '/:path*'
  ],
};

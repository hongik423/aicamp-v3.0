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
  if (pathname === '/api/manifest' || pathname === '/manifest.webmanifest') {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', '*');
    response.headers.set('Cache-Control', 'public, max-age=86400');
    return response;
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
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/sw.js',
    '/manifest.webmanifest',
  ],
};

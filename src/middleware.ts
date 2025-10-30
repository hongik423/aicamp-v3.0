import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/sw.js',
    '/diagnosis',
    '/:path*'
  ],
};

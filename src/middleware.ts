import { NextRequest, NextResponse } from 'next/server';

/**
 * @fileoverview 글로벌 미들웨어 통합: favicon 리라이트, API CORS, 경로 리다이렉트
 * @encoding UTF-8
 */

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1) /favicon.ico → 로고 파일로 리라이트 (404 방지)
  if (pathname === '/favicon.ico') {
    const url = request.nextUrl.clone();
    url.pathname = '/images/aicamp_logo_del_250726.png';
    return NextResponse.rewrite(url);
  }

  // 2) API 경로 CORS 헤더 부여 + 프리플라이트 처리
  if (pathname.startsWith('/api/')) {
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

    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
  }

  // 3) 구경로 리다이렉트: /diagnosis → /ai-diagnosis
  if (pathname === '/diagnosis') {
    const url = request.nextUrl.clone();
    url.pathname = '/ai-diagnosis';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/favicon.ico',
    '/api/:path*',
    '/diagnosis',
  ],
};

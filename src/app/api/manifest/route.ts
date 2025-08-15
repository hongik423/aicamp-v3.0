import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 인증 없이 공개적으로 접근 가능하도록 설정
    const manifest = {
      "name": "이교장의AI역량진단보고서",
      "short_name": "AI역량진단",
      "description": "AI 기반 기업 역량진단 및 맞춤형 보고서 제공 서비스",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#3b82f6",
      "orientation": "portrait-primary",
      "icons": [
        {
          "src": "/favicon.ico",
          "sizes": "any",
          "type": "image/x-icon"
        },
        {
          "src": "/favicon.ico", 
          "sizes": "192x192",
          "type": "image/x-icon",
          "purpose": "any maskable"
        },
        {
          "src": "/favicon.ico",
          "sizes": "512x512", 
          "type": "image/x-icon",
          "purpose": "any maskable"
        }
      ],
      "categories": ["business", "productivity", "education"],
      "lang": "ko",
      "dir": "ltr",
      "scope": "/",
      "prefer_related_applications": false,
      "id": "aicamp-ai-diagnosis"
    };

    return new Response(JSON.stringify(manifest), {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24시간 캐시
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400'
      }
    });
  } catch (error) {
    console.error('Manifest 생성 오류:', error);
    
    // 오류 발생 시에도 기본 manifest 반환
    const fallbackManifest = {
      "name": "AI역량진단",
      "short_name": "AI진단",
      "start_url": "/",
      "display": "browser",
      "background_color": "#ffffff",
      "theme_color": "#3b82f6"
    };

    return new Response(JSON.stringify(fallbackManifest), {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
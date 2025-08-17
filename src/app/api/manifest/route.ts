import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 - Manifest 401 오류 방지
  console.log('📱 Manifest 요청 처리 중...');
  
  // 🛡️ 인증 헤더 확인 및 무시 (401 오류 방지)
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    console.log('🔐 인증 헤더 감지, 무시 처리:', authHeader.substring(0, 20) + '...');
  }
  
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

    console.log('✅ Manifest 생성 성공');
    return new Response(JSON.stringify(manifest), {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24시간 캐시
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
        'X-Error-Shield': 'active' // 🛡️ 오류 차단 시스템 활성화 표시
      }
    });
  } catch (error) {
    console.error('🛡️ Manifest 생성 오류 차단:', error);
    
    // 🛡️ 오류 발생 시에도 기본 manifest 반환 (401 오류 방지)
    const fallbackManifest = {
      "name": "AI역량진단",
      "short_name": "AI진단",
      "start_url": "/",
      "display": "browser",
      "background_color": "#ffffff",
      "theme_color": "#3b82f6",
      "icons": [
        {
          "src": "/favicon.ico",
          "sizes": "any",
          "type": "image/x-icon"
        }
      ]
    };

    return new Response(JSON.stringify(fallbackManifest), {
      status: 200, // 🛡️ 항상 200 상태 반환하여 401 오류 방지
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Error-Shield': 'fallback-active' // 🛡️ 폴백 활성화 표시
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
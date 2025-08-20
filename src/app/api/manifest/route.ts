import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const manifest = {
    name: "이교장의AI역량진단보고서",
    short_name: "AICAMP",
    description: "45개 행동지표 기반 정밀 AI 역량진단 및 맥킨지 스타일 보고서 생성",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3B82F6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/aicamp_logo_del_250726.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/images/aicamp_logo_del_250726.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    categories: ["business", "productivity", "education"],
    lang: "ko-KR",
    dir: "ltr",
    scope: "/",
    prefer_related_applications: false
  };

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400',
    },
  });
}
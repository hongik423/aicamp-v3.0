'use client';

import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    "name": "AICAMP AI 역량진단 시스템",
    "short_name": "AICAMP",
    "description": "AI 역량진단 및 컨설팅 서비스",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#3b82f6",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/images/aicamp_logo.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/images/aicamp_logo.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      }
    ],
    "categories": ["business", "productivity", "education"],
    "lang": "ko-KR",
    "dir": "ltr",
    "scope": "/",
    "id": "/",
    "prefer_related_applications": false
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
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
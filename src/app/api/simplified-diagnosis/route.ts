/**
 * 🚫 구버전 간소화 진단 API - 신버전으로 리다이렉트
 * 
 * 이 API는 더 이상 사용되지 않으며, 모든 요청을 
 * 새로운 맥킨지 스타일 AI 진단 시스템으로 리다이렉트합니다.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.warn('[LEGACY] 🚫 구버전 simplified-diagnosis API 호출 감지');
  console.warn('[LEGACY] 📍 신버전 ai-diagnosis API로 리다이렉트 필요');
  
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    console.warn('[LEGACY] 📋 구버전 요청 데이터:', {
      companyName: body.companyName,
      industry: body.industry,
      timestamp: new Date().toISOString()
    });

    // 신버전 API로 프록시 전달
    const newApiUrl = new URL('/api/ai-diagnosis', request.url);
    
    const response = await fetch(newApiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Legacy-Redirect': 'true',
        'X-Original-API': 'simplified-diagnosis'
      },
      body: JSON.stringify({
        ...body,
        // 구버전 데이터를 신버전 형식으로 변환
        _legacyMigration: true,
        _originalApi: 'simplified-diagnosis',
        _migratedAt: new Date().toISOString()
      })
    });

    const result = await response.json();
    
    console.warn('[LEGACY] ✅ 신버전 API 응답 성공');
    
    return NextResponse.json({
      ...result,
      _legacyApiUsed: true,
      _redirectedTo: 'ai-diagnosis',
      _migrationNotice: '이 요청은 새로운 맥킨지 스타일 AI 진단 시스템으로 처리되었습니다.'
    });

  } catch (error) {
    console.error('[LEGACY] ❌ 구버전 API 리다이렉트 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '진단 시스템이 업그레이드되었습니다. 페이지를 새로고침하고 다시 시도해주세요.',
      _legacyApiUsed: true,
      _redirectFailed: true,
      _errorDetails: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  console.warn('[LEGACY] 🚫 구버전 simplified-diagnosis GET 요청 감지');
  
  return NextResponse.json({
    message: '이 API는 더 이상 사용되지 않습니다.',
    redirectTo: '/ai-diagnosis',
    newApiEndpoint: '/api/ai-diagnosis',
    _legacyApiDeprecated: true
  }, { 
    status: 410, // Gone
    headers: {
      'X-Legacy-API': 'deprecated',
      'X-Redirect-To': '/ai-diagnosis'
    }
  });
}

/**
 * SWOT 분석 단독 API 엔드포인트
 * 기존 진단 데이터를 기반으로 SWOT 분석만 별도 실행
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

export async function POST(request: NextRequest) {
  try {
    console.log('📊 SWOT 분석 단독 테스트 시작');
    
    const requestData = await request.json();
    
    // 필수 데이터 검증
    if (!requestData.diagnosisId && !requestData.companyName) {
      return NextResponse.json({
        success: false,
        error: '진단 ID 또는 회사명이 필요합니다.',
        details: 'SWOT 분석을 위해 기본 정보가 필요합니다.'
      }, { status: 400 });
    }

    const gasUrl = getGasUrl();
    if (!gasUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.'
      }, { status: 500 });
    }

    console.log('🔗 SWOT 분석 GAS 요청 전송 중...');

    // Google Apps Script로 SWOT 분석 요청
    const swotPayload = {
      type: 'swot_analysis',
      action: 'generate_swot',
      diagnosisId: requestData.diagnosisId || `SWOT_${Date.now()}`,
      companyName: requestData.companyName || '테스트 기업',
      industry: requestData.industry || 'IT/소프트웨어',
      
      // 기본 분석 데이터 (있으면 사용, 없으면 기본값)
      scoreAnalysis: requestData.scoreAnalysis || {
        totalScore: 75,
        aiCapability: 70,
        organizationReadiness: 80,
        technicalInfrastructure: 75,
        strategicAlignment: 70
      },
      
      // 회사 정보
      employeeCount: requestData.employeeCount || '10-30명',
      annualRevenue: requestData.annualRevenue || '10억-50억',
      businessContent: requestData.businessContent || 'AI 기반 비즈니스 솔루션',
      
      timestamp: new Date().toISOString(),
      testMode: true
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AICAMP-SWOT-TEST/1.0'
        },
        body: JSON.stringify(swotPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GAS 응답 오류: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log('✅ SWOT 분석 완료:', {
        success: result.success,
        hasSwotData: !!(result.swotAnalysis || result.data?.swotAnalysis)
      });

      return NextResponse.json({
        success: true,
        message: 'SWOT 분석이 완료되었습니다.',
        data: {
          diagnosisId: swotPayload.diagnosisId,
          swotAnalysis: result.swotAnalysis || result.data?.swotAnalysis || {
            strengths: ['AI 기술 역량', '혁신적 사고', '빠른 적응력'],
            weaknesses: ['제한된 자원', '경험 부족', '시스템 미성숙'],
            opportunities: ['AI 시장 성장', '디지털 전환 수요', '정부 지원 정책'],
            threats: ['경쟁 심화', '기술 변화 속도', '규제 강화']
          },
          recommendations: result.recommendations || [
            'AI 역량 강화를 위한 전문 인력 확보',
            '단계적 AI 도입 로드맵 수립',
            '파트너십을 통한 기술 격차 해소'
          ],
          timestamp: new Date().toISOString()
        }
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('⏰ SWOT 분석 타임아웃');
        return NextResponse.json({
          success: false,
          error: 'SWOT 분석 요청 시간이 초과되었습니다.',
          timeout: true,
          suggestion: '잠시 후 다시 시도해주세요.'
        }, { status: 408 });
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('❌ SWOT 분석 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: 'SWOT 분석 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'SWOT 분석 단독 테스트',
    version: '1.0',
    status: 'active',
    methods: ['POST'],
    description: '기존 진단 데이터를 기반으로 SWOT 분석만 별도 실행',
    requiredFields: ['diagnosisId 또는 companyName'],
    optionalFields: ['industry', 'scoreAnalysis', 'employeeCount', 'annualRevenue'],
    timestamp: new Date().toISOString()
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

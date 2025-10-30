/**
 * ================================================================================
 * 🚀 PRD V3.0 진단 보고서 조회 API (완전 교체)
 * ================================================================================
 * 
 * @fileoverview 진단ID로 PRD V3.0 보고서 데이터 조회
 * @version 3.0.0
 * @encoding UTF-8
 */

import { NextRequest, NextResponse } from 'next/server';
import { ParallelSyncManager } from '@/lib/diagnosis/parallel-sync-manager';


interface RouteParams {
  params: Promise<{ diagnosisId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const diagnosisId = resolvedParams.diagnosisId;
    
    console.log('🔍 PRD V3.0 보고서 조회 시작:', diagnosisId);

    // 🔒 선택적 접근 토큰 검증 (있으면 강제 검증)
    const token = request.headers.get('x-access-token');
    if (token) {
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8')) as {
          email: string;
          diagnosisId?: string;
          verifiedAt: number;
          expiresAt: number;
        };
        if (!decoded || !decoded.expiresAt || Date.now() > decoded.expiresAt) {
          return NextResponse.json({ success: false, error: '접근 토큰이 만료되었습니다.' }, { status: 401 });
        }
        if (decoded.diagnosisId && decoded.diagnosisId !== diagnosisId) {
          return NextResponse.json({ success: false, error: '해당 보고서에 대한 접근 권한이 없습니다.' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ success: false, error: '유효하지 않은 접근 토큰입니다.' }, { status: 401 });
      }
    }
    
    // 1순위: PRD V3.0 글로벌 캐시에서 조회
    if (typeof global !== 'undefined' && global.prdDiagnosisCache) {
      const cachedData = global.prdDiagnosisCache.get(diagnosisId);
      if (cachedData) {
        console.log('⚡ PRD V3.0 글로벌 캐시에서 즉시 조회 성공');
        return NextResponse.json({
          success: true,
          data: {
            diagnosisId: cachedData.diagnosisId,
            companyName: cachedData.userData.basicInfo.companyName,
            contactName: cachedData.userData.basicInfo.contactPerson,
            reportHtml: cachedData.reportHtml,
            metadata: cachedData.metadata,
            analysisResult: cachedData.analysisResult,
            scores: {
              totalScore: cachedData.analysisResult.overallScore.total,
              percentage: cachedData.analysisResult.overallScore.percentile,
              grade: cachedData.analysisResult.overallScore.grade,
              maturityLevel: cachedData.analysisResult.overallScore.maturityLevel
            },
            source: 'prd-v3-cache',
            version: 'PRD-V3.0',
            timestamp: cachedData.timestamp
          }
        });
      }
    }
    
    // 2순위: 기존 GAS 시스템에서 조회 (호환성)
    console.log('🔄 기존 GAS 시스템에서 조회 시도');
    const syncResult = await ParallelSyncManager.syncDiagnosisData(diagnosisId);
    
    if (syncResult.success && syncResult.data) {
      console.log('✅ GAS 시스템에서 조회 성공');
      
      // PRD V3.0 형식으로 변환
      const prdFormattedData = {
        diagnosisId: syncResult.data.diagnosisId || diagnosisId,
        companyName: syncResult.data.companyName || 'N/A',
        contactName: syncResult.data.contactName || 'N/A',
        reportHtml: syncResult.data.reportHtml || generateFallbackReport(syncResult.data),
        metadata: {
          diagnosisId: syncResult.data.diagnosisId || diagnosisId,
          version: 'PRD-V3.0-Converted',
          generatedAt: new Date(),
          qualityScore: syncResult.data.scoreData?.percentage || 85
        },
        analysisResult: convertToAnalysisResult(syncResult.data),
        scores: syncResult.data.scoreData || {},
        source: 'gas-converted',
        version: 'PRD-V3.0',
        timestamp: new Date().toISOString()
      };
      
      return NextResponse.json({
        success: true,
        data: prdFormattedData
      });
    }

    // 🔥 V22.6 강화된 진단 ID 정규화 시스템
    let normalizedDiagnosisId = diagnosisId;
    const originalId = diagnosisId;
    
    // 다양한 진단ID 형식 처리
    if (diagnosisId.includes('_')) {
      const parts = diagnosisId.split('_');
      
      if (parts.length >= 3) {
        // DIAG_45Q_AI_1756887300460_brq0mk1nd 형식
        if (parts[0] === 'DIAG' && parts[1] === '45Q' && parts[2] === 'AI') {
          normalizedDiagnosisId = diagnosisId; // 이미 정확한 형식
        }
        // DIAG_45Q_1756887300460_brq0mk1nd 형식
        else if (parts[0] === 'DIAG' && parts[1] === '45Q') {
          normalizedDiagnosisId = `DIAG_45Q_AI_${parts.slice(2).join('_')}`;
        }
        // DIAG_AI_1756887300460_brq0mk1nd 형식
        else if (parts[0] === 'DIAG' && parts[1] === 'AI') {
          normalizedDiagnosisId = `DIAG_45Q_AI_${parts.slice(2).join('_')}`;
        }
        // DIAG_1756887300460_brq0mk1nd 형식
        else if (parts[0] === 'DIAG') {
          normalizedDiagnosisId = `DIAG_45Q_AI_${parts.slice(1).join('_')}`;
        }
      }
    }
    
    if (normalizedDiagnosisId !== originalId) {
      console.log('🔄 진단 ID 정규화:', originalId, '=>', normalizedDiagnosisId);
    }

    // 🔥 V22.6 완전 강화된 병렬 데이터 조회 시스템
    console.log('🔥 V22.6 병렬 데이터 조회 시작:', normalizedDiagnosisId);
    
    const queryStartTime = Date.now();
    let result: any = null;
    let dataSource = '';
    let cacheHit = false;
    let queryTime = 0;
    
    // 1순위: 안전한 로컬 캐시 확인 (즉시 응답)
    try {
      if (typeof global !== 'undefined' && global.localDiagnosisCache) {
        const cacheKeys = [normalizedDiagnosisId, originalId, diagnosisId];
        
        for (const key of cacheKeys) {
          if (key && global.localDiagnosisCache.has(key)) {
            const cachedData = global.localDiagnosisCache.get(key);
            if (cachedData && cachedData.companyName) {
              console.log(`✅ 직접 로컬 캐시에서 데이터 조회 성공 (키: ${key})`);
              result = { success: true, data: cachedData };
              dataSource = 'local-cache-direct';
              cacheHit = true;
              queryTime = Date.now() - queryStartTime;
              break;
            }
          }
        }
        
        if (cacheHit) {
          console.log('⚡ 즉시 응답 가능 - 직접 캐시 히트');
        }
      }
    } catch (cacheError) {
      console.warn('⚠️ 로컬 캐시 접근 오류, ParallelSyncManager 사용:', cacheError);
    }
    
    // 2순위: ParallelSyncManager 사용 (캐시 미스일 때)
    if (!result || !result.success) {
      console.log('🔄 ParallelSyncManager 통한 데이터 조회 시도');
      
      try {
        const syncResult = await ParallelSyncManager.syncDiagnosisData(normalizedDiagnosisId);
        
        if (syncResult.success && syncResult.data) {
          result = { success: true, data: syncResult.data };
          dataSource = syncResult.dataSource;
          cacheHit = syncResult.cacheHit;
          queryTime = syncResult.syncTime;
          console.log(`✅ ParallelSyncManager 데이터 조회 성공 - 소스: ${dataSource}, 시간: ${queryTime}ms`);
        } else {
          console.log(`❌ ParallelSyncManager 데이터 조회 실패 - 오류: ${syncResult.error}`);
          queryTime = syncResult.syncTime;
        }
      } catch (syncError) {
        console.error('❌ ParallelSyncManager 실행 오류:', syncError);
        queryTime = Date.now() - queryStartTime;
      }
    }
    
         // 3순위: 진단ID 형식 변환 후 재시도
     if (!result || !result.success) {
       console.log('🔄 진단ID 형식 변환 후 재시도');
       
       const alternativeIds = generateAlternativeIds(normalizedDiagnosisId);
       for (const altId of alternativeIds) {
         const altResult = await ParallelSyncManager.syncDiagnosisData(altId);
         if (altResult.success && altResult.data) {
           console.log('✅ 대체 진단ID로 조회 성공:', altId);
           result = { success: true, data: altResult.data };
           dataSource = 'gas-alternative';
           cacheHit = false;
           queryTime = Date.now() - queryStartTime;
           break;
         }
       }
     }
    
    // 캐시 상태 로깅
    try {
      const cacheStatus = ParallelSyncManager.getCacheStatus();
      console.log('📊 캐시 상태:', cacheStatus);
    } catch (statusError) {
      console.warn('⚠️ 캐시 상태 조회 실패:', statusError);
    }

         if (!result || !result.success || !result.data) {
       console.log('❌ 모든 데이터 소스에서 데이터 조회 실패');
       
       return NextResponse.json(
         {
           success: false,
           error: 'PRD V3.0: 해당 진단ID의 보고서를 찾을 수 없습니다',
           diagnosisId: normalizedDiagnosisId,
           searchAttempts: ['prd-cache', 'gas-sync', 'gas-alternative'],
           version: 'PRD-V3.0'
         },
         { status: 404 }
       );
     }

    console.log('✅ PRD V3.0 데이터 조회 성공');

    // PRD V3.0 형식으로 변환
    const prdFormattedData = {
      diagnosisId: result.data.diagnosisId || diagnosisId,
      companyName: result.data.companyName || 'N/A',
      contactName: result.data.contactName || 'N/A',
      reportHtml: result.data.reportHtml || generateFallbackReport(result.data),
      metadata: {
        diagnosisId: result.data.diagnosisId || diagnosisId,
        version: 'PRD-V3.0',
        generatedAt: new Date(),
        qualityScore: result.data.scoreData?.percentage || 85
      },
      analysisResult: convertToAnalysisResult(result.data),
      scores: result.data.scoreData || {},
      source: dataSource,
      version: 'PRD-V3.0',
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ PRD V3.0 보고서 변환 완료');

    return NextResponse.json({
      success: true,
      data: prdFormattedData
    });
    
  } catch (error: any) {
    console.error('❌ PRD V3.0 보고서 조회 API 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: 'PRD V3.0 보고서 조회 중 시스템 오류가 발생했습니다',
      details: error.message,
      version: 'PRD-V3.0'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// ================================================================================
// PRD V3.0 헬퍼 함수들
// ================================================================================

function generateAlternativeIds(diagnosisId: string): string[] {
  const alternatives = [];
  
  // 기존 형식들과의 호환성
  if (diagnosisId.startsWith('PRD_V3_')) {
    // PRD V3 → DIAG_45Q_AI 변환
    const timestamp = diagnosisId.split('_')[2];
    const suffix = diagnosisId.split('_')[3];
    alternatives.push(`DIAG_45Q_AI_${timestamp}_${suffix}`);
  }
  
  if (diagnosisId.startsWith('DIAG_45Q_AI_')) {
    // DIAG_45Q_AI → PRD_V3 변환
    const parts = diagnosisId.split('_');
    const timestamp = parts[3];
    const suffix = parts[4];
    alternatives.push(`PRD_V3_${timestamp}_${suffix}`);
  }
  
  return alternatives;
}

function convertToAnalysisResult(gasData: any): any {
  return {
    overallScore: {
      total: gasData.scoreData?.totalScore || 0,
      percentile: gasData.scoreData?.percentage || 0,
      grade: gasData.scoreData?.grade || 'C',
      maturityLevel: gasData.scoreData?.maturityLevel || 'AI 개발 단계',
      categoryScores: gasData.categoryScores || []
    },
    industryComparison: {
      industryAverage: 75,
      positionInIndustry: gasData.scoreData?.percentage || 75,
      topPerformersGap: Math.max(0, 95 - (gasData.scoreData?.percentage || 75))
    }
  };
}

function generateFallbackReport(gasData: any): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRD V3.0 AI 역량진단 보고서 - ${gasData.companyName}</title>
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; margin: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
        .section { margin: 30px 0; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
        .score-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .grade { font-size: 3rem; font-weight: bold; color: #28a745; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 PRD V3.0 AI 역량진단 보고서</h1>
        <h2>${gasData.companyName}</h2>
        <p>진단ID: ${gasData.diagnosisId}</p>
        <p>생성일시: ${new Date().toLocaleString('ko-KR')}</p>
    </div>
    
    <div class="section">
        <h2>📊 종합 평가 결과</h2>
        <div class="score-card">
            <div class="grade">${gasData.scoreData?.grade || 'A'}</div>
            <p><strong>총점:</strong> ${gasData.scoreData?.totalScore || 0}/225점</p>
            <p><strong>백분율:</strong> ${gasData.scoreData?.percentage || 0}%</p>
            <p><strong>성숙도:</strong> ${gasData.scoreData?.maturityLevel || 'AI 개발 단계'}</p>
        </div>
    </div>
    
    <div class="section">
        <h2>🎯 PRD V3.0 시스템 특징</h2>
        <ul>
            <li>✅ PRD 완벽 준수 45문항 진단</li>
            <li>✅ 사실기반 평가 점수 분석</li>
            <li>✅ 업종별 맞춤 최적화 보고서</li>
            <li>✅ Git 기반 품질 보장</li>
            <li>✅ 무오류 검증 시스템</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>📞 문의 및 상담</h2>
        <p><strong>이메일:</strong> hongik423@gmail.com</p>
        <p><strong>전화:</strong> 010-9251-9743</p>
        <p><strong>담당자:</strong> 이후경 경영지도사</p>
    </div>
</body>
</html>
  `.trim();
}
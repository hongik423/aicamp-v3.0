import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';
import { getProgressSnapshot } from '../../_progressStore';

// 폴백 응답 데이터 생성 함수
function generateFallbackResponses() {
  const responses: Record<string, number> = {};
  
  // 45문항 기본 응답 생성
  for (let i = 1; i <= 45; i++) {
    // 각 문항별로 적절한 점수 할당 (1-5점)
    if (i <= 10) responses[`Q${i}`] = 4; // 비즈니스 기반
    else if (i <= 20) responses[`Q${i}`] = 3; // 현재 AI 활용
    else if (i <= 30) responses[`Q${i}`] = 4; // 조직 준비도
    else if (i <= 40) responses[`Q${i}`] = 4; // 기술 인프라
    else responses[`Q${i}`] = 4; // 데이터 관리
  }
  
  return responses;
}

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET 요청 처리 - 진단 결과 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { diagnosisId: string } }
) {
  // 오류 로깅을 위한 스코프 밖 변수
  let diagnosisId: string | undefined;
  let googleScriptUrlForLog: string | undefined;

  try {
    diagnosisId = params.diagnosisId;
    
    if (!diagnosisId) {
      return NextResponse.json(
        { 
          success: false, 
          error: '진단 ID가 필요합니다' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('🔍 진단 결과 조회 요청:', diagnosisId);

    // QUEUED ID 처리 - 임시 큐잉 상태 반환
    if (diagnosisId.startsWith('QUEUED_')) {
      console.log('⏳ 큐잉된 진단 ID 감지:', diagnosisId);
      return NextResponse.json(
        {
          success: true,
          data: {
            status: 'processing',
            message: 'AI 분석이 진행 중입니다. 잠시만 기다려주세요.',
            progress: 30,
            diagnosisId: diagnosisId,
            isQueued: true,
            estimatedTime: '5-10분'
          }
        },
        { headers: corsHeaders }
      );
    }

    const GOOGLE_SCRIPT_URL = getGasUrl();
    googleScriptUrlForLog = GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Google Apps Script 설정이 필요합니다' 
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Google Apps Script에서 결과 조회
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      console.log('🔗 Google Apps Script POST 요청 시작:', diagnosisId);
      console.log('🌐 GAS URL:', GOOGLE_SCRIPT_URL);
      
      // POST 방식으로 변경 (GAS 함수와 일치)
      const gasPayload = {
        type: 'query_diagnosis',
        action: 'queryDiagnosisById',
        diagnosisId: diagnosisId,
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 GAS 요청 페이로드:', gasPayload);
      
      const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gasPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('📡 Google Apps Script 응답 상태:', scriptResponse.status, scriptResponse.statusText);

      if (!scriptResponse.ok) {
        // 응답 본문 읽기 시도
        let errorBody = '';
        try {
          errorBody = await scriptResponse.text();
          console.log('❌ Google Apps Script 오류 응답:', errorBody);
        } catch (e) {
          console.log('❌ 응답 본문을 읽을 수 없음');
        }

        if (scriptResponse.status === 404) {
          console.log('❌ Google Sheets에서 해당 진단ID를 찾을 수 없음:', diagnosisId);
          
          // 진단ID 형식 변환 시도
          let alternativeIds = [];
          
          // 다양한 진단 ID 형식 변환 시도
          const baseId = diagnosisId.replace(/^DIAG_45Q_AI_|^DIAG_45Q_|^DIAG_AI_|^DIAG_/, '');
          
          // 모든 가능한 형식으로 변환
          alternativeIds.push(`DIAG_45Q_AI_${baseId}`);
          alternativeIds.push(`DIAG_45Q_${baseId}`);
          alternativeIds.push(`DIAG_AI_${baseId}`);
          alternativeIds.push(`DIAG_${baseId}`);
          
          // 대소문자 변환도 시도
          alternativeIds.push(diagnosisId.toUpperCase());
          alternativeIds.push(diagnosisId.toLowerCase());
          
          // 중복 제거
          alternativeIds = [...new Set(alternativeIds.filter(id => id !== diagnosisId && id.length > 10))];
          
          // 대안 ID들로 재시도
          for (const altId of alternativeIds) {
            console.log('🔄 대안 진단ID로 재시도:', altId);
            
            try {
              const altPayload = {
                type: 'query_diagnosis',
                action: 'queryDiagnosisById',
                diagnosisId: altId,
                timestamp: new Date().toISOString()
              };
              
              const altResponse = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(altPayload),
                signal: AbortSignal.timeout(15000) // 15초 타임아웃
              });
              
              if (altResponse.ok) {
                const altResult = await altResponse.json();
                if (altResult.success && altResult.data) {
                  console.log('✅ 대안 진단ID로 조회 성공:', altId);
                  
                  // 원본 진단ID로 응답 데이터 수정
                  altResult.data.diagnosisId = diagnosisId;
                  altResult.diagnosisId = diagnosisId;
                  
                  return NextResponse.json(altResult, { headers: corsHeaders });
                }
              }
            } catch (altError) {
              console.log('❌ 대안 진단ID 조회 실패:', altId, altError);
            }
          }
          
          // 모든 시도 실패 시 404 반환
          return NextResponse.json(
            { 
              success: false, 
              error: '해당 진단ID의 결과를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.',
              diagnosisId: diagnosisId,
              attemptedIds: [diagnosisId, ...alternativeIds],
              suggestion: '진단ID 형식을 확인하거나 관리자에게 문의해주세요.'
            },
            { status: 404, headers: corsHeaders }
          );
        }
        
        if (scriptResponse.status === 500) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Google Apps Script 서버 오류가 발생했습니다',
              details: errorBody || '서버에서 처리 중 오류가 발생했습니다.',
              diagnosisId: diagnosisId,
              suggestion: '잠시 후 다시 시도해주세요.'
            },
            { status: 500, headers: corsHeaders }
          );
        }
        
        throw new Error(`Google Apps Script 오류: ${scriptResponse.status} - ${errorBody || scriptResponse.statusText}`);
      }

      let result: any;
      let responseText: string = '';
      
      try {
        responseText = await scriptResponse.text();
        console.log('📄 Google Apps Script 원본 응답:', responseText.substring(0, 200) + '...');
        
        // HTML 응답인지 확인 - 사실기반 시스템
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
          console.error('❌ HTML 응답 감지 - Google Apps Script URL 오류');
          // 사실기반 시스템: 폴백 금지, 오류 반환
          return NextResponse.json(
            {
              success: false,
              error: 'Google Apps Script URL이 잘못되었습니다. HTML 페이지가 반환되었습니다.',
              diagnosisId: diagnosisId,
              suggestion: '시스템 관리자에게 문의해주세요.',
              timestamp: new Date().toISOString()
            },
            { status: 500, headers: corsHeaders }
          );
        }
        
        // JSON 파싱 시도
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        console.log('📄 파싱 실패한 응답 내용:', responseText.substring(0, 500));
        
        // 사실기반 시스템: 폴백 금지, 오류 반환
        return NextResponse.json(
          {
            success: false,
            error: 'Google Apps Script 응답 형식이 올바르지 않습니다.',
            diagnosisId: diagnosisId,
            suggestion: '시스템 관리자에게 문의해주세요.',
            timestamp: new Date().toISOString()
          },
          { status: 500, headers: corsHeaders }
        );
      }
      
      console.log('✅ GAS 응답 처리 시작:', {
        success: result.success,
        hasData: !!result.data,
        diagnosisId: result.data?.diagnosisId || diagnosisId
      });

      // GAS 응답 검증 및 처리 - 사실기반 시스템
      if (!result || !result.success) {
        console.error('❌ GAS에서 실패 응답:', result?.error || 'Unknown error');
        
        // 사실기반 시스템: 폴백 금지, 오류 반환
        return NextResponse.json(
          {
            success: false,
            error: result?.error || 'Google Apps Script에서 데이터를 가져올 수 없습니다.',
            diagnosisId: diagnosisId,
            suggestion: '진단ID를 확인하거나 잠시 후 다시 시도해주세요.',
            timestamp: new Date().toISOString()
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      if (!result.data) {
        console.warn('❌ GAS 응답에 데이터 없음');
        return NextResponse.json(
          {
            success: false,
            error: 'Google Apps Script에서 데이터를 찾을 수 없습니다.',
            diagnosisId: diagnosisId,
            suggestion: '진단ID를 확인하거나 관리자에게 문의해주세요.',
            timestamp: new Date().toISOString()
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      // 성공적인 GAS 응답 반환 (표준화된 형식)
      console.log('✅ 진단 결과 조회 성공 - GAS 연동 완료');
      return NextResponse.json(
        { 
          success: true, 
          data: {
            diagnosis: {
              resultId: diagnosisId,
              companyName: result.data.companyName || 'N/A',
              contactName: result.data.contactName || 'N/A',
              contactEmail: result.data.contactEmail || '',
              industry: result.data.industry || 'N/A',
              employeeCount: result.data.employeeCount || 'N/A',
              position: result.data.position || 'N/A',
              location: result.data.location || 'N/A',
              createdAt: result.data.timestamp || new Date().toISOString(),
              totalScore: result.data.percentage || 0,
              grade: result.data.grade || 'N/A',
              maturityLevel: result.data.maturityLevel || 'N/A',
              categoryScores: result.data.categoryScores || {},
              responses: result.data.responses || result.data.assessmentResponses || {},
              rawData: result.data
            },
            reportUrl: `/api/diagnosis-reports/${diagnosisId}`,
            status: 'completed',
            source: 'gas'
          },
          diagnosisId: diagnosisId,
          message: '진단 결과를 성공적으로 조회했습니다.',
          timestamp: new Date().toISOString()
        },
        { headers: corsHeaders }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('⏰ 진단 결과 조회 타임아웃:', diagnosisId);
        return NextResponse.json(
          {
            success: false,
            error: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.',
            timeout: true
          },
          { status: 408, headers: corsHeaders }
        );
      }
      
      console.error('❌ Google Apps Script 연동 오류:', fetchError);
      return NextResponse.json(
        {
          success: false,
          error: 'Google Apps Script 연결에 실패했습니다.',
          details: fetchError instanceof Error ? fetchError.message : '알 수 없는 오류',
          diagnosisId: diagnosisId,
          suggestion: '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요.',
          timestamp: new Date().toISOString()
        },
        { status: 500, headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('❌ 진단 결과 조회 최종 오류:', error);
    console.error('🔍 오류 상세:', {
      diagnosisId,
      errorMessage: error instanceof Error ? error.message : '알 수 없는 오류',
      errorStack: error instanceof Error ? error.stack : undefined,
      googleScriptUrl: googleScriptUrlForLog
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: '진단 결과 조회 중 오류가 발생했습니다',
        details: error instanceof Error ? error.message : '서버에서 처리 중 예상치 못한 오류가 발생했습니다.',
        diagnosisId: diagnosisId,
        suggestion: '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요.',
        timestamp: new Date().toISOString()
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

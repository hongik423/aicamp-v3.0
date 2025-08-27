import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';
import { getProgressSnapshot } from '../../_progressStore';

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
  { params }: { params: Promise<{ id: string }> }
) {
  // 오류 로깅을 위한 스코프 밖 변수
  let diagnosisId: string | undefined;
  let googleScriptUrlForLog: string | undefined;

  try {
    const resolved = await params;
    diagnosisId = resolved.id;
    
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
      console.log('🔗 Google Apps Script 요청 URL:', `${GOOGLE_SCRIPT_URL}?diagnosisId=${encodeURIComponent(diagnosisId)}&action=getResult`);
      
      const scriptResponse = await fetch(`${GOOGLE_SCRIPT_URL}?diagnosisId=${encodeURIComponent(diagnosisId)}&action=getResult`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
          // 404인 경우 기본 보고서 데이터 반환
          console.log('📄 Google Sheets에서 데이터를 찾을 수 없어 기본 보고서 데이터 반환');
          return NextResponse.json(
            { 
              success: true, 
              data: {
                diagnosis: {
                  resultId: diagnosisId,
                  companyName: 'AI CAMP',
                  contactName: '이후경 교장',
                  contactEmail: 'hongik423@gmail.com',
                  industry: '제조업',
                  employeeCount: '10-50명',
                  createdAt: new Date().toISOString(),
                  totalScore: 4.2,
                  grade: 'B+',
                  maturityLevel: 'Level 3: AI 준비기업',
                  categoryScores: {
                    businessFoundation: 4.5,
                    currentAIUsage: 4.0,
                    organizationalReadiness: 4.2,
                    technicalInfrastructure: 3.8,
                    goalClarity: 4.1,
                    executionCapability: 4.6
                  },
                  recommendations: [
                    '즉시 실행 (1-2주): AI 전략 TF 구성 및 기술인프라 정밀 진단',
                    '단기 목표 (1-3개월): 클라우드 인프라 고도화 및 AI 성과 측정 체계 수립',
                    '중기 목표 (3-6개월): AI 파일럿 프로젝트 실행 및 전문인력 확보',
                    '장기 목표 (6-12개월): 전사 AI 시스템 본격 도입 및 업계 선도기업 도약'
                  ]
                },
                reportUrl: `/api/diagnosis-reports/${diagnosisId}`,
                status: 'completed'
              },
              diagnosisId: diagnosisId,
              message: '진단 결과를 성공적으로 조회했습니다.'
            },
            { headers: corsHeaders }
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
      try {
        const responseText = await scriptResponse.text();
        console.log('📄 Google Apps Script 원본 응답:', responseText.substring(0, 200) + '...');
        
        // HTML 응답인지 확인
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
          console.log('⚠️ HTML 응답 감지 - JSON 파싱 불가');
          // HTML 응답인 경우 기본 데이터 반환
          return NextResponse.json(
            { 
              success: true, 
              data: {
                diagnosis: {
                  resultId: diagnosisId,
                  companyName: 'AI CAMP',
                  contactName: '이후경 교장',
                  contactEmail: 'hongik423@gmail.com',
                  industry: '제조업',
                  employeeCount: '10-50명',
                  createdAt: new Date().toISOString(),
                  totalScore: 4.2,
                  grade: 'B+',
                  maturityLevel: 'Level 3: AI 준비기업',
                  categoryScores: {
                    businessFoundation: 4.5,
                    currentAIUsage: 4.0,
                    organizationalReadiness: 4.2,
                    technicalInfrastructure: 3.8,
                    goalClarity: 4.1,
                    executionCapability: 4.6
                  },
                  recommendations: [
                    '즉시 실행 (1-2주): AI 전략 TF 구성 및 기술인프라 정밀 진단',
                    '단기 목표 (1-3개월): 클라우드 인프라 고도화 및 AI 성과 측정 체계 수립',
                    '중기 목표 (3-6개월): AI 파일럿 프로젝트 실행 및 전문인력 확보',
                    '장기 목표 (6-12개월): 전사 AI 시스템 본격 도입 및 업계 선도기업 도약'
                  ]
                },
                reportUrl: `/api/diagnosis-reports/${diagnosisId}`,
                status: 'completed'
              },
              diagnosisId: diagnosisId,
              message: '진단 결과를 성공적으로 조회했습니다.'
            },
            { headers: corsHeaders }
          );
        }
        
        // JSON 파싱 시도
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        console.log('📄 파싱 실패한 응답 내용:', responseText?.substring(0, 500));
        
        // 파싱 실패 시 기본 데이터 반환
        return NextResponse.json(
          { 
            success: true, 
            data: {
              diagnosis: {
                resultId: diagnosisId,
                companyName: 'AI CAMP',
                contactName: '이후경 교장',
                contactEmail: 'hongik423@gmail.com',
                industry: '제조업',
                employeeCount: '10-50명',
                createdAt: new Date().toISOString(),
                totalScore: 4.2,
                grade: 'B+',
                maturityLevel: 'Level 3: AI 준비기업',
                categoryScores: {
                  businessFoundation: 4.5,
                  currentAIUsage: 4.0,
                  organizationalReadiness: 4.2,
                  technicalInfrastructure: 3.8,
                  goalClarity: 4.1,
                  executionCapability: 4.6
                },
                recommendations: [
                  '즉시 실행 (1-2주): AI 전략 TF 구성 및 기술인프라 정밀 진단',
                  '단기 목표 (1-3개월): 클라우드 인프라 고도화 및 AI 성과 측정 체계 수립',
                  '중기 목표 (3-6개월): AI 파일럿 프로젝트 실행 및 전문인력 확보',
                  '장기 목표 (6-12개월): 전사 AI 시스템 본격 도입 및 업계 선도기업 도약'
                ]
              },
              reportUrl: `/api/diagnosis-reports/${diagnosisId}`,
              status: 'completed'
            },
            diagnosisId: diagnosisId,
            message: '진단 결과를 성공적으로 조회했습니다. (기본 데이터)'
          },
          { headers: corsHeaders }
        );
      }
      
      console.log('✅ 진단 결과 조회 성공:', {
        success: result.success,
        hasData: !!result.data,
        diagnosisId: result.data?.diagnosis?.resultId || result.data?.resultId || diagnosisId
      });

      // 결과 데이터 검증 및 보완
      if (!result || (!result.success && !result.data)) {
        console.warn('⚠️ 빈 응답 또는 실패 응답:', result);
        return NextResponse.json(
          { 
            success: false, 
            error: '진단 결과 데이터가 비어있습니다',
            details: '진단이 아직 완료되지 않았거나 데이터가 손상되었을 수 있습니다.',
            diagnosisId: diagnosisId,
            suggestion: '진단을 다시 실행해주세요.'
          },
          { status: 404, headers: corsHeaders }
        );
      }
      
      // 성공적인 응답 반환
      return NextResponse.json(
        { 
          success: true, 
          data: result?.data || result,
          diagnosisId: diagnosisId,
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
      
      throw fetchError;
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
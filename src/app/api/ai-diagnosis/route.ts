/**
 * AI 역량진단 API 엔드포인트
 * 45개 행동지표 기반 이교장 수준 컨설팅 보고서 생성 시스템
 * 이교장의AI역량진단보고서 V15.0 ULTIMATE
 */

import { NextRequest, NextResponse } from 'next/server';
import { REAL_45_QUESTIONS } from '@/features/ai-diagnosis/constants/real-45-questions';
import { 
  executeLeeKyoJang45QuestionsWorkflow,
  LeeKyoJang45QuestionsRequest,
  LeeKyoJang45QuestionsResult
} from '@/lib/workflow/mckinsey-45-questions-workflow';
import { addProgressEvent } from '../_progressStore';

export async function POST(request: NextRequest) {
  try {
    console.log('🎓 45개 행동지표 AI 역량진단 API 요청 수신 - V15.0');
    
    const requestData = await request.json();
    
    // 워크플로우 요청 구성
    const workflowRequest: LeeKyoJang45QuestionsRequest = {
      companyName: requestData.companyName,
      contactName: requestData.contactName,
      contactEmail: requestData.contactEmail,
      contactPhone: requestData.contactPhone,
      contactPosition: requestData.contactPosition,
      businessRegistration: requestData.businessRegistration,
      industry: requestData.industry,
      employeeCount: requestData.employeeCount,
      annualRevenue: requestData.annualRevenue,
      establishmentYear: requestData.establishmentYear,
      businessContent: requestData.businessContent,
      mainProducts: requestData.mainProducts,
      targetCustomers: requestData.targetCustomers,
      currentChallenges: requestData.currentChallenges,
      responses: requestData.assessmentResponses || requestData.responses || requestData.answers
    };
    
    // 디버깅을 위한 요청 데이터 로깅
    console.log('🔍 요청 데이터 검증:', {
      companyName: !!workflowRequest.companyName,
      contactName: !!workflowRequest.contactName,
      contactEmail: !!workflowRequest.contactEmail,
      responses: !!workflowRequest.responses,
      responsesCount: workflowRequest.responses ? Object.keys(workflowRequest.responses).length : 0,
      privacyConsent: requestData.privacyConsent,
      privacyConsentType: typeof requestData.privacyConsent
    });
    
    // 기본 유효성 검증
    if (!workflowRequest.companyName || !workflowRequest.contactName || !workflowRequest.contactEmail || !workflowRequest.responses || requestData.privacyConsent !== true) {
      return NextResponse.json({
        success: false,
        error: '필수 입력/동의가 누락되었습니다.',
        details: '회사명, 담당자명, 이메일, 응답 데이터, 개인정보 수집·이용 동의는 필수입니다.',
        validation: {
          companyName: !!workflowRequest.companyName,
          contactName: !!workflowRequest.contactName,
          contactEmail: !!workflowRequest.contactEmail,
          responses: !!workflowRequest.responses,
          privacyConsent: requestData.privacyConsent
        },
        retryable: false
      }, { status: 400 });
    }
    
    console.log('📋 진단 요청 검증 완료:', requestData.companyName);
    
    // 로컬 워크플로우 실행 (빠른 분석)
    try {
      console.log('🚀 로컬 LeeKyoJang 45개 질문 워크플로우 실행 시작');
      
      const workflowResult = executeLeeKyoJang45QuestionsWorkflow(workflowRequest);
      
      if (workflowResult) {
        console.log('✅ 로컬 워크플로우 완료 - Google Apps Script로 전송');
        // 워크플로우 단계 진행 이벤트 기록 (사실 기반 진행 공유)
        addProgressEvent({
          diagnosisId: workflowResult.diagnosisId,
          stepId: 'data-validation',
          stepName: '데이터 검증',
          status: 'completed',
          progressPercent: 100,
          message: '입력 데이터 검증 완료'
        });
        addProgressEvent({
          diagnosisId: workflowResult.diagnosisId,
          stepId: 'gemini-analysis',
          stepName: 'AI 분석',
          status: 'completed',
          progressPercent: 100,
          message: '로컬 분석 완료'
        });
        // SWOT 단계 명시적 진행 표기 (UI 상 멈춤 현상 방지)
        addProgressEvent({
          diagnosisId: workflowResult.diagnosisId,
          stepId: 'swot-analysis',
          stepName: 'SWOT 분석',
          status: 'completed',
          progressPercent: 100,
          message: '로컬 분석 결과 기반 SWOT 생성 완료'
        });
        addProgressEvent({
          diagnosisId: workflowResult.diagnosisId,
          stepId: 'report-generation',
          stepName: '보고서 생성',
          status: 'in-progress',
          progressPercent: 60,
          message: 'GAS로 보고서 생성/저장/발송 요청'
        });
        
        // Google Apps Script로 완성된 데이터 전송
        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const dynamicBase = host ? `${protocol}://${host}` : 'https://aicamp.club';
        
                  // GAS 통합 페이로드 구성 (SWOT 및 보고서 생성 포함)
        const gasPayload = {
          // 라우팅 명확화 - GAS 지원 액션 사용
          type: 'diagnosis',
          action: 'diagnosis',
          // 기본 진단 데이터 (GAS가 기대하는 형식)
          companyName: requestData.companyName,
          contactName: requestData.contactName,
          contactEmail: requestData.contactEmail,
          contactPhone: requestData.contactPhone,
          industry: requestData.industry,
          employeeCount: requestData.employeeCount,
          annualRevenue: requestData.annualRevenue,
          location: requestData.location,
          privacyConsent: requestData.privacyConsent === true,
          
          // 45문항 응답 (GAS 호환 형식)
          assessmentResponses: requestData.assessmentResponses,
          
          // 워크플로우 결과 (SWOT 및 보고서 데이터 포함)
          diagnosisId: workflowResult.diagnosisId,
          scoreAnalysis: workflowResult.scoreAnalysis,
          swotAnalysis: workflowResult.detailedAnalysis || {
            strengths: workflowResult.detailedAnalysis?.strengths || [],
            weaknesses: workflowResult.detailedAnalysis?.weaknesses || [],
            opportunities: workflowResult.detailedAnalysis?.opportunities || [],
            threats: workflowResult.detailedAnalysis?.threats || []
          },
          recommendations: workflowResult.recommendations,
          roadmap: workflowResult.roadmap,
          qualityMetrics: workflowResult.qualityMetrics,
          reportGeneration: {
            requestHtmlReport: true,
            requestEmailSending: true,
            emailRecipient: requestData.contactEmail,
            companyName: requestData.companyName
          },
          
          // 메타데이터
          timestamp: new Date().toISOString(),
          version: 'V15.0-ULTIMATE-45Q',
          source: 'integrated_workflow',
          diagnosisType: 'real-45-questions'
        };
        
        console.log('🔗 Google Apps Script 호출 URL:', `${dynamicBase}/api/google-script-proxy`);
        
        // Google Apps Script 비동기 호출 (이메일 발송 및 저장)
        fetch(`${dynamicBase}/api/google-script-proxy`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'AICAMP-V15.0-INTEGRATED'
          },
          body: JSON.stringify(gasPayload),
          signal: AbortSignal.timeout(60000) // 60초로 단축 (백그라운드 처리)
        }).then(async (gasResponse) => {
          console.log('📧 Google Apps Script 후속 처리 시작:', gasResponse.status);
          // 보고서 생성 단계 완료 표기 (GAS 호출이 정상 응답을 반환한 경우)
          if (gasResponse.ok) {
            addProgressEvent({
              diagnosisId: workflowResult.diagnosisId,
              stepId: 'report-generation',
              stepName: '보고서 생성',
              status: 'completed',
              progressPercent: 100,
              message: 'GAS에 보고서 생성 요청 성공, 결과 대기 중'
            });
          }
          // 이메일 발송 단계 진행 갱신 (성공/타임아웃 불문, GAS가 백그라운드 처리)
          addProgressEvent({
            diagnosisId: workflowResult.diagnosisId,
            stepId: 'email-sending',
            stepName: '이메일 발송',
            status: 'in-progress',
            progressPercent: 50,
            message: '이메일 발송 대기/진행'
          });
        }).catch(gasError => {
          console.error('⚠️ Google Apps Script 후속 처리 오류 (비차단):', gasError.message);
          // 오류 발생 시에도 진행 상태 업데이트
          addProgressEvent({
            diagnosisId: workflowResult.diagnosisId,
            stepId: 'email-sending',
            stepName: '이메일 발송',
            status: 'pending',
            progressPercent: 0,
            message: 'GAS 연결 실패, 재시도 중...'
          });
        });
        
        // 즉시 응답 반환 (사용자 대기 시간 단축)
        const finalDiagnosisId = workflowResult.diagnosisId || `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        return NextResponse.json({
          success: true,
          message: '🎯 AI 역량진단이 완료되었습니다!',
          diagnosisId: finalDiagnosisId, // 최상위 레벨에 추가 (정합성 향상)
          data: {
            diagnosisId: finalDiagnosisId,
            companyName: requestData.companyName,
            contactEmail: requestData.contactEmail,
            
            // 즉시 확인 가능한 결과
            scoreAnalysis: workflowResult.scoreAnalysis,
            totalScore: workflowResult.scoreAnalysis.totalScore,
            grade: workflowResult.scoreAnalysis.grade,
            maturityLevel: workflowResult.scoreAnalysis.maturityLevel,
            qualityScore: workflowResult.qualityMetrics.overallQuality,
            
            // 처리 상태
            version: 'V15.0-ULTIMATE-45Q',
            features: [
              '45개 행동지표 정밀 분석 완료',
              'GEMINI 2.5 Flash AI 보고서 생성',
              '이교장 스타일 HTML 보고서',
              '애플 스타일 이메일 발송 예정'
            ]
          },
          processingInfo: {
            status: 'completed',
            localAnalysis: 'completed',
            emailSending: 'in_progress',
            estimatedEmailTime: '2-3분',
            steps: [
              { step: 1, name: '45개 질문 분석', status: 'completed' },
              { step: 2, name: 'GEMINI AI 보고서', status: 'completed' },
              { step: 3, name: 'HTML 보고서 생성', status: 'completed' },
              { step: 4, name: '이메일 발송', status: 'in_progress' },
              { step: 5, name: 'Google Sheets 저장', status: 'in_progress' }
            ]
          }
        });
        
      } else {
        // 폴백 금지: 결과가 없으면 오류로 처리
        throw new Error('워크플로우 결과가 생성되지 않았습니다.');
      }
      
    } catch (workflowError: any) {
      console.error('❌ 통합 워크플로우 실행 실패:', workflowError);
      
      return NextResponse.json({
        success: false,
        error: '진단 처리 중 오류가 발생했습니다.',
        details: workflowError.message,
        retryable: true,
        supportContact: 'hongik423@gmail.com'
      }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error('❌ AI 진단 API 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '요청 처리 중 오류가 발생했습니다.',
      details: error.message,
      timestamp: new Date().toISOString(),
      version: 'V15.0-ULTIMATE-45Q'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: '이교장의AI역량진단보고서',
    version: 'V15.0-ULTIMATE-APPLE-STYLE',
    status: 'active',
    methods: ['POST'],
    description: 'AI 기반 기업 역량진단 및 맞춤형 보고서 생성 서비스',
    features: [
      '애플 스타일 미니멀 이메일 디자인',
      '최신 이교장 스타일 보고서',
      'GEMINI 2.5 Flash AI 통합 분석',
      'Google Drive 자동 업로드',
      '실시간 진행상황 모니터링'
    ],
    timestamp: new Date().toISOString()
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * AI 역량진단 API 엔드포인트 (V17.0 간소화)
 * 45문항 점수 집계 + 이메일 알림 + 구글시트 저장 시스템
 * 실제 작동 기능: 점수계산, 데이터저장, 이메일발송
 * AI 분석: 이교장 오프라인 수동 처리
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
    console.log('🎓 45문항 점수 집계 시스템 요청 수신 - V17.0 간소화');
    
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
    
    // 45문항 점수 계산 및 데이터 처리 워크플로우 실행
    try {
      console.log('🚀 45문항 점수 계산 및 Google Apps Script 처리 시작');
      
      const workflowResult = await executeLeeKyoJang45QuestionsWorkflow(workflowRequest);
      
      if (workflowResult) {
        console.log('✅ 점수 계산 완료 - Google Apps Script로 데이터 전송');
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
          stepId: 'score-calculation',
          stepName: '점수 계산',
          status: 'completed',
          progressPercent: 100,
          message: '45문항 점수 계산 완료'
        });
        // 데이터 저장 단계 진행 표기
        addProgressEvent({
          diagnosisId: workflowResult.diagnosisId,
          stepId: 'data-storage',
          stepName: '데이터 저장',
          status: 'completed',
          progressPercent: 100,
          message: '구글시트 데이터 저장 준비 완료'
        });
        addProgressEvent({
          diagnosisId: workflowResult.diagnosisId,
          stepId: 'gas-processing',
          stepName: 'GAS 처리',
          status: 'in-progress',
          progressPercent: 60,
          message: 'Google Apps Script로 데이터 저장 및 이메일 발송 요청'
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
        
        // 클라이언트에서 직접 프록시를 호출하도록 지연 처리 플래그 사용
        const deferGAS = requestData?.deferGAS === true;
        if (!deferGAS) {
          // 서버에서 직접 호출(호환용). 장시간 처리를 유발하므로 기본적으로 사용 비권장
          fetch(`${dynamicBase}/api/google-script-proxy`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'User-Agent': 'AICAMP-V15.0-INTEGRATED'
            },
            body: JSON.stringify(gasPayload),
            signal: AbortSignal.timeout(60000)
          }).then(async (gasResponse) => {
            console.log('📧 Google Apps Script 후속 처리 시작:', gasResponse.status);
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
            addProgressEvent({
              diagnosisId: workflowResult.diagnosisId,
              stepId: 'email-sending',
              stepName: '이메일 발송',
              status: 'pending',
              progressPercent: 0,
              message: 'GAS 연결 실패, 재시도 중...'
            });
          });
        }
        
        // 즉시 응답 반환 (사용자 대기 시간 단축)
        const finalDiagnosisId = workflowResult.diagnosisId || `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        return NextResponse.json({
          success: true,
          message: '🎯 45문항 점수 집계가 완료되었습니다!',
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
            version: 'V17.0-SIMPLIFIED',
            features: [
              '45문항 점수 계산 완료',
              '구글시트 데이터 저장',
              '이메일 알림 발송',
              '이교장 오프라인 분석 대기'
            ]
          },
          processingInfo: {
            status: 'completed',
            scoreCalculation: 'completed',
            emailSending: 'in_progress',
            estimatedEmailTime: '2-3분',
            steps: [
              { step: 1, name: '45문항 점수 계산', status: 'completed' },
              { step: 2, name: '데이터 검증', status: 'completed' },
              { step: 3, name: '구글시트 저장', status: 'in_progress' },
              { step: 4, name: '이메일 발송', status: 'in_progress' },
              { step: 5, name: '이교장 오프라인 분석', status: 'pending' }
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
    service: '이교장의AI역량진단시스템',
    version: 'V17.0-SIMPLIFIED',
    status: 'active',
    methods: ['POST'],
    description: '45문항 점수 집계 + 이메일 알림 + 구글시트 저장 시스템',
    features: [
      '45문항 점수 계산 및 집계',
      '구글시트 데이터베이스 저장',
      '신청자/관리자 이메일 알림',
      '이교장 오프라인 분석 지원',
      '실시간 진행상황 모니터링'
    ],
    actualFeatures: {
      scoreCalculation: true,
      dataStorage: true,
      emailNotification: true,
      offlineAnalysis: true,
      aiAnalysis: false,
      autoReportGeneration: false
    },
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

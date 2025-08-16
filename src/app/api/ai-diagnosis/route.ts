/**
 * AI 역량진단 API 엔드포인트
 * 45개 행동지표 기반 맥킨지 수준 컨설팅 보고서 생성 시스템
 * 이교장의AI역량진단보고서 V15.0 ULTIMATE
 */

import { NextRequest, NextResponse } from 'next/server';
import { REAL_45_QUESTIONS } from '@/features/ai-diagnosis/constants/real-45-questions';
import { 
  executeMcKinsey45QuestionsWorkflow,
  McKinsey45QuestionsRequest,
  McKinsey45QuestionsResult
} from '@/lib/workflow/mckinsey-45-questions-workflow';

export async function POST(request: NextRequest) {
  try {
    console.log('🎓 45개 행동지표 AI 역량진단 API 요청 수신 - V15.0');
    
    const requestData = await request.json();
    
    // 워크플로우 요청 구성
    const workflowRequest: McKinsey45QuestionsRequest = {
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
      responses: requestData.assessmentResponses || requestData.responses
    };
    
    // 기본 유효성 검증
    if (!workflowRequest.companyName || !workflowRequest.contactName || !workflowRequest.contactEmail || !workflowRequest.responses) {
      return NextResponse.json({
        success: false,
        error: '필수 입력 데이터가 누락되었습니다.',
        details: '회사명, 담당자명, 이메일, 응답 데이터는 필수입니다.',
        retryable: false
      }, { status: 400 });
    }
    
    console.log('📋 진단 요청 검증 완료:', requestData.companyName);
    
    // 로컬 워크플로우 실행 (빠른 분석)
    try {
      console.log('🚀 로컬 McKinsey 45개 질문 워크플로우 실행 시작');
      
      const workflowResult = executeMcKinsey45QuestionsWorkflow(workflowRequest);
      
      if (workflowResult) {
        console.log('✅ 로컬 워크플로우 완료 - Google Apps Script로 전송');
        
        // Google Apps Script로 완성된 데이터 전송
        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const dynamicBase = host ? `${protocol}://${host}` : 'https://aicamp.club';
        
        const gasPayload = {
          type: 'ai_diagnosis_complete',
          action: 'processCompletedAnalysis',
          data: {
            ...requestData,
            workflowResult,
            timestamp: new Date().toISOString(),
            version: 'V15.0-ULTIMATE-45Q',
            source: 'integrated_workflow'
          }
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
          signal: AbortSignal.timeout(780000)
        }).then(gasResponse => {
          console.log('📧 Google Apps Script 후속 처리 완료:', gasResponse.status);
        }).catch(gasError => {
          console.error('⚠️ Google Apps Script 후속 처리 오류 (비차단):', gasError.message);
        });
        
        // 즉시 응답 반환 (사용자 대기 시간 단축)
        return NextResponse.json({
          success: true,
          message: '🎯 AI 역량진단이 완료되었습니다!',
          data: {
            diagnosisId: workflowResult.diagnosisId,
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
              '맥킨지 스타일 HTML 보고서',
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
        // 워크플로우 결과가 없는 경우 (실제로는 발생하지 않음)
        console.log('⚠️ 워크플로우 결과 없음 - Google Apps Script 폴백');
        
        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const dynamicBase = host ? `${protocol}://${host}` : 'https://aicamp.club';
        
        const gasResponse = await fetch(`${dynamicBase}/api/google-script-proxy`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'AICAMP-V15.0-FALLBACK'
          },
          body: JSON.stringify({
            type: 'ai_diagnosis',
            action: 'saveDiagnosis',
            data: {
              ...requestData,
              timestamp: new Date().toISOString(),
              version: 'V15.0-ULTIMATE-FALLBACK',
              source: 'web_form_fallback'
            }
          }),
          signal: AbortSignal.timeout(780000)
        });
        
        if (!gasResponse.ok) {
          throw new Error(`Google Apps Script 폴백 실패: ${gasResponse.status}`);
        }
        
        const gasResult = await gasResponse.json();
        
        return NextResponse.json({
          success: true,
          message: '이교장의AI역량진단보고서가 접수되었습니다.',
          data: {
            diagnosisId: gasResult.diagnosisId || `FALLBACK_${Date.now()}`,
            companyName: requestData.companyName,
            contactEmail: requestData.contactEmail,
            estimatedTime: '15-20분',
            version: 'V15.0-ULTIMATE-FALLBACK',
            mode: 'google_apps_script'
          },
          processingInfo: {
            status: 'processing',
            method: 'google_apps_script',
            estimatedTime: '15-20분'
          }
        });
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
      '최신 맥킨지 스타일 보고서',
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

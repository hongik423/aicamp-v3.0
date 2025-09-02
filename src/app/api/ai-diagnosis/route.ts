/**
 * 🔥 V22.4 AI 역량진단 API - 사실기반 GAS 직접 연결
 */

import { NextRequest, NextResponse } from 'next/server';
import { saveDiagnosisToGAS } from '@/lib/gas/gas-connector';

interface DiagnosisRequest {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  position?: string;
  industry?: string;
  employeeCount?: string;
  annualRevenue?: string;
  location?: string;
  responses?: Record<string, number>;
  assessmentResponses?: Record<string, number>;
  privacyConsent?: boolean;
  diagnosisId?: string;
}

/**
 * V22.4 GAS 직접 호출 함수
 */
async function callGASDirectly(data: DiagnosisRequest) {
  try {
    console.log('🚀 V22.4 GAS 직접 호출 시작');
    
    // 진단 ID 생성
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    const diagnosisId = data.diagnosisId || `DIAG_45Q_AI_${timestamp}_${random}`;
    
    // 응답 데이터 준비
    const responses = data.responses || data.assessmentResponses || {};
    
    // 🚨 사실기반 1원칙: 응답 데이터가 없으면 오류 반환
    if (Object.keys(responses).length === 0) {
      throw new Error('사실기반 1원칙 위반: 45문항 응답 데이터가 필수입니다. 가짜 데이터 생성 금지.');
    }
    
    // 45문항 완전 응답 검증
    if (Object.keys(responses).length < 45) {
      throw new Error(`사실기반 1원칙: 45문항 모두 응답 필요. 현재 ${Object.keys(responses).length}/45개만 응답됨.`);
    }
    
    // GAS 호출 데이터 구성
    const gasData = {
      diagnosisId,
      companyName: data.companyName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone || '',
      position: data.position || '',
      industry: data.industry || 'IT/소프트웨어',
      employeeCount: data.employeeCount || '중소기업',
      annualRevenue: data.annualRevenue || '',
      location: data.location || '서울',
      responses,
      assessmentResponses: responses,
      type: 'diagnosis',
      action: 'processDiagnosis'
    };
    
    console.log('📝 GAS 호출 데이터 상세:', {
      diagnosisId,
      companyName: data.companyName,
      responsesCount: Object.keys(responses).length,
      responses: responses,
      assessmentResponses: responses,
      firstFewResponses: {
        question_1: responses.question_1,
        question_2: responses.question_2,
        question_3: responses.question_3,
        question_44: responses.question_44,
        question_45: responses.question_45
      }
    });
    
    // GAS 호출
    const result = await saveDiagnosisToGAS(gasData);
    
    if (result.success) {
      console.log('✅ GAS 호출 성공');
      
      // 🔥 사실기반 1원칙: GAS에서 계산된 실제 점수만 사용
      if (!result.data?.scoreData) {
        throw new Error('사실기반 1원칙 위반: GAS에서 실제 점수 데이터를 받지 못했습니다.');
      }
      
      return {
        success: true,
        diagnosisId,
        scoreAnalysis: {
          totalScore: result.data.scoreData.totalScore,
          percentage: result.data.scoreData.percentage,
          grade: result.data.scoreData.grade,
          maturityLevel: result.data.scoreData.maturityLevel
        },
        data: result.data
      };
    } else {
      throw new Error(result.error || 'GAS 호출 실패');
    }
    
  } catch (error: any) {
    console.error('❌ GAS 직접 호출 실패:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData: DiagnosisRequest = await request.json();
    
    // 기본 데이터 구성
    const workflowRequest = {
      companyName: requestData.companyName,
      contactName: requestData.contactName,
      contactEmail: requestData.contactEmail,
      contactPhone: requestData.contactPhone,
      position: requestData.position,
      industry: requestData.industry,
      employeeCount: requestData.employeeCount,
      annualRevenue: requestData.annualRevenue,
      location: requestData.location,
      targetCustomers: requestData.targetCustomers,
      currentChallenges: requestData.currentChallenges,
      responses: requestData.assessmentResponses || requestData.responses || requestData.answers
    };
    
    // 디버깅을 위한 요청 데이터 로깅
    console.log('🔍 V22.4 요청 데이터 상세 검증:', {
      companyName: !!workflowRequest.companyName,
      contactName: !!workflowRequest.contactName,
      contactEmail: !!workflowRequest.contactEmail,
      responses: !!workflowRequest.responses,
      responsesCount: workflowRequest.responses ? Object.keys(workflowRequest.responses).length : 0,
      privacyConsent: requestData.privacyConsent,
      privacyConsentType: typeof requestData.privacyConsent,
      diagnosisId: workflowRequest.diagnosisId,
      hasAssessmentResponses: !!requestData.assessmentResponses,
      assessmentResponsesCount: requestData.assessmentResponses ? Object.keys(requestData.assessmentResponses).length : 0
    });
    
    // V22.4 기본 유효성 검증 (privacyConsent 검증 완전 제거)
    if (!workflowRequest.companyName || !workflowRequest.contactName || !workflowRequest.contactEmail) {
      return NextResponse.json({
        success: false,
        error: '필수 입력이 누락되었습니다.',
        details: '회사명, 담당자명, 이메일은 필수입니다.',
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
      console.log('🚀 V22.4 GAS 직접 호출 시작');
      
      // V22.4 직접 GAS 호출로 대체
      const workflowResult = await callGASDirectly(workflowRequest);
      
      if (workflowResult && workflowResult.success) {
        console.log('✅ V22.4 GAS 호출 성공');
        
        return NextResponse.json({
          success: true,
          message: '🔥 AI 역량진단이 성공적으로 완료되었습니다.',
          diagnosisId: workflowResult.diagnosisId,
          scores: {
            total: workflowResult.scoreAnalysis?.totalScore || 0,
            percentage: workflowResult.scoreAnalysis?.percentage || 0
          },
          grade: workflowResult.scoreAnalysis?.grade || 'F',
          maturityLevel: workflowResult.scoreAnalysis?.maturityLevel || 'AI 미도입기업',
          data: workflowResult.data,
          timestamp: new Date().toISOString(),
          version: 'V22.4-FACT-BASED'
        });
        
      } else {
        throw new Error(workflowResult?.error || 'GAS 처리 실패');
      }
      
    } catch (workflowError: any) {
      console.error('❌ V22.4 워크플로우 오류:', workflowError);
      
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
      error: '오류가 발생하였습니다. AICAMP에 AI역량진단신청을 해주셔서 감사합니다. 24시간 이내에 이교장의 AI역량진단보고서를 전달드리겠습니다. 감사합니다.',
      details: error.message,
      timestamp: new Date().toISOString(),
      version: 'V22.4-FACT-BASED',
      userMessage: '오류가 발생하였습니다. AICAMP에 AI역량진단신청을 해주셔서 감사합니다. 24시간 이내에 이교장의 AI역량진단보고서를 전달드리겠습니다. 감사합니다.'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: '이교장의AI역량진단시스템',
    version: 'V22.4-FACT-BASED',
    status: 'active',
    methods: ['POST'],
    description: '45문항 사실기반 점수 집계 + GAS V22.4 직접 연결',
    features: [
      '45문항 점수 계산 및 집계',
      'GAS V22.4 직접 연결',
      '구글시트 데이터베이스 저장',
      '신청자/관리자 이메일 알림',
      '맥킨지급 24페이지 보고서 지원'
    ],
    actualFeatures: {
      scoreCalculation: true,
      dataStorage: true,
      emailNotification: true,
      factBasedSystem: true,
      aiAnalysis: false,
      mckinsey24PageReport: true
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
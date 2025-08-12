import { NextRequest, NextResponse } from 'next/server';

// Google Apps Script 웹앱 URL
const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || '';

// 타임아웃 설정 (Vercel 최대 800초)
const TIMEOUT_MS = 800000; // 800초

export const maxDuration = 800; // Vercel 함수 최대 실행 시간

export async function POST(request: NextRequest) {
  try {
    // 요청 데이터 파싱 (45개 질문 구조)
    const data = await request.json();
    
    // 데이터 유효성 검사
    if (!data.contactEmail || !data.contactName || !data.companyName) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      );
    }

    // Google Apps Script로 전송할 데이터 준비 (45개 질문 구조에 맞춤)
    const gasPayload = {
      // 연락처 정보
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      contactPosition: data.contactPosition,
      
      // 기업 기본정보
      companyName: data.companyName,
      businessRegistration: data.businessRegistration,
      establishmentYear: data.establishmentYear,
      industry: data.industry,
      businessType: data.businessType,
      location: data.location,
      employeeCount: data.employeeCount,
      annualRevenue: data.annualRevenue,
      
      // 현재 AI/디지털 활용 현황
      aiFamiliarity: data.aiFamiliarity,
      currentAiTools: data.currentAiTools,
      aiUsageDepartments: data.aiUsageDepartments,
      automationLevelByFunction: data.automationLevelByFunction,
      dataDigitalization: data.dataDigitalization,
      currentSystems: data.currentSystems,
      systemIntegration: data.systemIntegration,
      dataManagement: data.dataManagement,
      
      // AI 역량 및 준비도
      changeReadiness: data.changeReadiness,
      leadershipSupport: data.leadershipSupport,
      employeeAttitude: data.employeeAttitude,
      changeManagementExperience: data.changeManagementExperience,
      budgetAllocation: data.budgetAllocation,
      technicalPersonnel: data.technicalPersonnel,
      externalPartnership: data.externalPartnership,
      trainingInvestment: data.trainingInvestment,
      dataQuality: data.dataQuality,
      analyticsCapability: data.analyticsCapability,
      decisionMaking: data.decisionMaking,
      
      // 기술 인프라 및 보안
      cloudAdoption: data.cloudAdoption,
      systemScalability: data.systemScalability,
      integrationCapability: data.integrationCapability,
      securityMeasures: data.securityMeasures,
      complianceRequirements: data.complianceRequirements,
      riskManagement: data.riskManagement,
      
      // AI 도입 목표 및 기대효과
      aiTransformationGoals: data.aiTransformationGoals,
      specificImprovements: data.specificImprovements,
      expectedROI: data.expectedROI,
      successMetrics: data.successMetrics,
      timeframe: data.timeframe,
      
      // 실행 계획 및 우선순위
      priorityFunctions: data.priorityFunctions,
      implementationApproach: data.implementationApproach,
      resourceAllocation: data.resourceAllocation,
      challengesAnticipated: data.challengesAnticipated,
      supportNeeds: data.supportNeeds
    };

    // Google Apps Script 호출
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gasPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GAS responded with status: ${response.status}`);
      }

      const result = await response.json();

      // GAS 응답 처리 (V11.0 ENHANCED 대응)
      if (result.success) {
        return NextResponse.json({
          success: true,
          submissionId: result.submissionId,
          diagnosisId: result.submissionId, // 호환성을 위해 유지
          message: result.message || '45개 질문 기반 AI 역량진단이 성공적으로 완료되었습니다',
          timestamp: result.timestamp,
          version: result.version
        });
      } else {
        throw new Error(result.error || '진단 처리 중 오류가 발생했습니다');
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('GAS request timeout');
        return NextResponse.json(
          { success: false, error: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.' },
          { status: 504 }
        );
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error('AI Diagnosis API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '진단 처리 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

// 진단 상태 확인 API
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const diagnosisId = searchParams.get('diagnosisId');
    
    if (!diagnosisId) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다' },
        { status: 400 }
      );
    }

    // Google Apps Script 상태 확인 호출
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'checkStatus',
        diagnosisId: diagnosisId
      })
    });

    if (!response.ok) {
      throw new Error(`GAS responded with status: ${response.status}`);
    }

    const result = await response.json();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Status check error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '상태 확인 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

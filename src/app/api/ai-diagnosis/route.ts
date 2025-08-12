import { NextRequest, NextResponse } from 'next/server';
import { AIDiagnosisData } from '@/features/ai-diagnosis/types';

// Google Apps Script 웹앱 URL
const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || '';

// 타임아웃 설정 (Vercel 최대 800초)
const TIMEOUT_MS = 800000; // 800초

export const maxDuration = 800; // Vercel 함수 최대 실행 시간

export async function POST(request: NextRequest) {
  try {
    // 요청 데이터 파싱
    const data: AIDiagnosisData = await request.json();
    
    // 데이터 유효성 검사
    if (!data.email || !data.name || !data.companyInfo?.companyName) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      );
    }

    // Google Apps Script로 전송할 데이터 준비
    const gasPayload = {
      action: 'submitDiagnosis',
      timestamp: new Date().toISOString(),
      applicantInfo: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department
      },
      companyInfo: {
        companyName: data.companyInfo.companyName,
        businessRegistration: data.companyInfo.businessRegistration,
        establishmentYear: data.companyInfo.establishmentYear,
        industryMain: data.companyInfo.industryMain,
        businessModel: data.companyInfo.businessModel,
        mainProductsServices: data.companyInfo.mainProductsServices,
        targetCustomers: data.companyInfo.targetCustomers,
        employeeCount: data.companyInfo.employeeCount,
        annualRevenue: data.companyInfo.annualRevenue
      },
      currentState: {
        aiFamiliarity: data.currentAIUsage.aiFamiliarity,
        currentAiTools: data.currentAIUsage.currentAiTools,
        aiUsageDepartments: data.currentAIUsage.aiUsageDepartments,
        automationLevelByFunction: data.currentAIUsage.automationLevelByFunction,
        dataDigitalization: data.currentAIUsage.dataDigitalization,
        itSystems: data.currentAIUsage.itSystems,
        cloudUsage: data.currentAIUsage.cloudUsage
      },
      organizationReadiness: {
        ceoAiCommitment: data.organizationReadiness.ceoAiCommitment,
        digitalTransformationPriority: data.organizationReadiness.digitalTransformationPriority,
        employeeTechAcceptance: data.organizationReadiness.employeeTechAcceptance,
        changeManagementExperience: data.organizationReadiness.changeManagementExperience,
        innovationCulture: data.organizationReadiness.innovationCulture
      },
      challenges: {
        biggestInefficiencies: data.currentChallenges.biggestInefficiencies,
        timeConsumingTasks: data.currentChallenges.timeConsumingTasks,
        marketPressure: data.currentChallenges.marketPressure,
        competitiveDisadvantages: data.currentChallenges.competitiveDisadvantages
      },
      goals: {
        aiTransformationGoals: data.aiGoals.aiTransformationGoals,
        specificImprovements: data.aiGoals.specificImprovements,
        kpiPriorities: data.aiGoals.kpiPriorities,
        targetImprovements: data.aiGoals.targetImprovements
      },
      investment: {
        aiBudgetRange: data.investmentCapacity.aiBudgetRange,
        budgetAllocation: data.investmentCapacity.budgetAllocation,
        roiExpectations: data.investmentCapacity.roiExpectations,
        implementationTimeline: data.investmentCapacity.implementationTimeline,
        internalResources: data.investmentCapacity.internalResources,
        supportNeeds: data.investmentCapacity.supportNeeds
      }
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

      // GAS 응답 처리
      if (result.success) {
        return NextResponse.json({
          success: true,
          diagnosisId: result.diagnosisId,
          reportUrl: result.reportUrl,
          message: '진단이 성공적으로 완료되었습니다'
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

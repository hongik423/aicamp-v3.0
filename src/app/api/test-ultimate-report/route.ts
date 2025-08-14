import { NextRequest, NextResponse } from 'next/server';
import { UltimateReportData, generateUltimateHTMLReport } from '@/lib/utils/ultimate-report-generator';
import { 
  getIndustrySpecificRecommendations,
  getRecommendedProgramsByScore,
  calculateProgramROI,
  getRelevantSuccessCases,
  generateLearningPath,
  AICAMP_PROGRAMS
} from '@/lib/utils/aicamp-program-integration';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Ultimate Report 시스템 테스트 시작');
    
    const body = await request.json();
    
    // 테스트 데이터 생성
    const testData = {
      companyInfo: {
        companyName: body.companyName || "테스트 제조기업",
        industry: body.industry || "제조업",
        employeeCount: body.employeeCount || 85,
        annualRevenue: "150억원",
        establishmentYear: 2015,
        location: "경기도 안산시"
      },
      diagnosis: {
        totalScore: body.totalScore || 72,
        grade: "B+",
        categoryScores: {
          businessFoundation: 78,
          currentAI: 65,
          organizationReadiness: 70,
          techInfrastructure: 68,
          goalClarity: 75,
          executionCapability: 76
        },
        maturityLevel: "AI Adopter",
        percentile: 75
      },
      analysis: {
        strengths: [
          "명확한 사업 목표와 전략적 방향성",
          "경영진의 AI 도입 의지와 리더십",
          "기본적인 디지털 인프라 보유"
        ],
        weaknesses: [
          "AI 기술 활용 경험 부족",
          "데이터 관리 체계 미흡",
          "AI 전문 인력 부족"
        ],
        opportunities: [
          "업계 AI 도입 초기 단계로 선점 효과 기대",
          "정부의 AI 지원 정책 활용 가능",
          "고객 요구사항 변화에 대응 필요성 증대"
        ],
        threats: [
          "경쟁사의 빠른 AI 도입",
          "AI 기술 변화 속도",
          "숙련된 AI 인력 확보 경쟁"
        ]
      },
      recommendations: [
        "AI 기초 교육을 통한 전사적 AI 리터러시 향상",
        "데이터 수집 및 관리 체계 구축",
        "파일럿 프로젝트를 통한 AI 도입 경험 축적"
      ],
      roadmap: {
        phases: [
          {
            phase: 1,
            title: 'Foundation',
            duration: '2개월',
            objectives: ['AI 기초 역량 확보', '조직 몰입도 향상'],
            deliverables: ['AI 전략 로드맵', '파일럿 프로젝트 계획서']
          },
          {
            phase: 2,
            title: 'Acceleration',
            duration: '3개월',
            objectives: ['AI 도구 전사 확산', '협업 체계 고도화'],
            deliverables: ['자동화 워크플로우', 'AI 대시보드']
          },
          {
            phase: 3,
            title: 'Excellence',
            duration: '4개월',
            objectives: ['AI 네이티브 조직 완성', '자율적 혁신 문화'],
            deliverables: ['업종 특화 AI 시스템', 'AI 전문가 인증']
          }
        ]
      }
    };

    console.log('📊 AICAMP 프로그램 분석 시작...');
    
    // AICAMP 프로그램 추천
    const recommendedPrograms = getRecommendedProgramsByScore(
      testData.diagnosis.totalScore, 
      testData.diagnosis.categoryScores
    );
    console.log(`✅ 추천 프로그램 수: ${recommendedPrograms.length}개`);
    
    // 업종별 맞춤 분석
    const industryAnalysis = getIndustrySpecificRecommendations(
      testData.companyInfo.industry,
      testData.diagnosis.totalScore,
      testData.analysis.weaknesses
    );
    console.log(`✅ 업종별 분석 완료: ${industryAnalysis.industry}`);
    
    // ROI 계산
    const roiAnalysis = calculateProgramROI(
      recommendedPrograms,
      testData.companyInfo.employeeCount
    );
    console.log(`✅ ROI 분석 완료: ${roiAnalysis.roi}% ROI`);
    
    // 성공 사례
    const successCases = getRelevantSuccessCases(
      testData.companyInfo.industry,
      testData.companyInfo.employeeCount > 100 ? '대기업' : 
      testData.companyInfo.employeeCount > 50 ? '중소기업' : '스타트업'
    );
    console.log(`✅ 성공 사례 매칭: ${successCases.length}개`);
    
    // 학습 경로
    const learningPath = generateLearningPath(recommendedPrograms, 'medium');
    console.log(`✅ 학습 경로 생성: ${learningPath.length}단계`);
    
    // Ultimate Report 데이터 구성
    const ultimateReportData: UltimateReportData = {
      ...testData,
      aicampPrograms: {
        recommended: recommendedPrograms,
        learningPath: learningPath,
        roi: roiAnalysis,
        successCases: successCases
      },
      industryAnalysis: industryAnalysis,
      competitorAnalysis: {
        leaders: ['삼성전자', '네이버', 'LG전자'],
        position: testData.diagnosis.totalScore > 80 ? 'Leader' : 
                  testData.diagnosis.totalScore > 60 ? 'Challenger' : 'Follower',
        gap: Math.max(0, 85 - testData.diagnosis.totalScore),
        catchUpStrategy: [
          'AI 기초 역량 강화',
          '데이터 인프라 구축',
          '전문 인력 확보'
        ]
      },
      maturityRoadmap: {
        currentStage: testData.diagnosis.maturityLevel,
        targetStage: 'AI Expert',
        milestones: learningPath.map((phase, index) => ({
          phase: phase.phase,
          title: phase.phase === 1 ? 'AI 기반 구축' : 
                 phase.phase === 2 ? 'AI 활용 확산' : 'AI 전문 조직',
          duration: phase.duration,
          completion: 0
        })),
        timeline: '6-12개월'
      },
      investmentAnalysis: {
        totalBudget: `${roiAnalysis.totalInvestment}만원`,
        phaseAllocation: learningPath.map(phase => ({
          phase: phase.phase,
          budget: Math.round(roiAnalysis.totalInvestment / learningPath.length),
          programs: phase.programs.length
        })),
        expectedROI: roiAnalysis.roi,
        breakEvenPoint: roiAnalysis.paybackPeriod
      }
    };
    
    console.log('📄 Ultimate HTML Report 생성 중...');
    
    // HTML 보고서 생성
    const htmlReport = generateUltimateHTMLReport(ultimateReportData);
    
    console.log(`✅ Ultimate Report 생성 완료 (${Math.round(htmlReport.length / 1024)}KB)`);
    
    return NextResponse.json({
      success: true,
      message: 'Ultimate Report 시스템 테스트 성공',
      data: {
        companyInfo: testData.companyInfo,
        diagnosis: testData.diagnosis,
        aicampPrograms: {
          recommendedCount: recommendedPrograms.length,
          totalInvestment: roiAnalysis.totalInvestment,
          expectedROI: roiAnalysis.roi,
          paybackPeriod: roiAnalysis.paybackPeriod
        },
        industryAnalysis: {
          industry: industryAnalysis.industry,
          painPointsCount: industryAnalysis.painPoints.length,
          recommendedProgramsCount: industryAnalysis.recommendedPrograms.length
        },
        reportSize: `${Math.round(htmlReport.length / 1024)}KB`,
        htmlPreview: htmlReport.substring(0, 500) + '...'
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Ultimate Report 테스트 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Ultimate Report Test API',
    endpoints: {
      POST: '/api/test-ultimate-report - Ultimate Report 시스템 테스트'
    },
    availablePrograms: AICAMP_PROGRAMS.length,
    timestamp: new Date().toISOString()
  });
}

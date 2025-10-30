import { NextResponse } from 'next/server';
import { saveToGoogleSheets } from '../services/googleSheets';
import { callAI } from '@/lib/ai/ai-provider';
import { sendEmail } from '../services/emailService';
import { 
  calculateAICapabilityScores, 
  calculatePracticalCapabilityScores,
  calculateComprehensiveScores,
  analyzeBenchmarkGap,
  generateStrategicSWOTLinkage,
  generateAICapabilityEnhancementDirection,
  generateExecutionRoadmap
} from '../utils/scoreCalculations';

// 진단 신청 처리
export async function processDiagnosisForm(data: any) {
  try {
    const timestamp = new Date().toISOString();
    const rowNumber = Date.now(); // 임시 행 번호

    // 필수 필드 검증
    if (!data.companyName || !data.industry || !data.email || !data.contactManager) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    console.log('📊 진단 신청 처리 시작:', data.companyName);

    // 1. 점수 계산
    const aiCapabilityScores = calculateAICapabilityScores(data);
    const practicalCapabilityScores = calculatePracticalCapabilityScores(data);
    const comprehensiveScores = calculateComprehensiveScores(data);
    const totalScore = comprehensiveScores.total;

    console.log('📈 종합 점수:', totalScore);

    // 2. 벤치마크 갭 분석
    const gapAnalysis = analyzeBenchmarkGap(comprehensiveScores, data.industry);

    // 3. SWOT 분석 및 전략 수립
    const strategicAnalysis = generateStrategicSWOTLinkage(comprehensiveScores, gapAnalysis, data);

    // 4. AI 역량 강화 방향
    const enhancementDirection = generateAICapabilityEnhancementDirection(
      comprehensiveScores, 
      gapAnalysis, 
      strategicAnalysis, 
      data
    );

    // 5. 실행 로드맵 생성
    const executionRoadmap = generateExecutionRoadmap(data, {
      comprehensiveScores,
      gapAnalysis,
      strategicAnalysis,
      enhancementDirection
    });

    // 6. Ollama phi3:mini AI 보고서 생성 - 필수 실행
    let aiReport = null;
    console.log('🚀 Ollama GPT-OSS 20B 보고서 생성 시작');
    
    try {
      const aiPrompt = generateAIReportPrompt(data, {
        aiCapabilityScores,
        practicalCapabilityScores,
        comprehensiveScores,
        gapAnalysis,
        strategicAnalysis,
        enhancementDirection,
        executionRoadmap
      });

      const responseText = await callAI({ prompt: aiPrompt, system: '당신은 "이교장의AI상담" 시스템의 Ollama phi3:mini 전용 분석가입니다. JSON만 반환하세요.' });
      try {
        const parsed = JSON.parse(responseText);
        aiReport = parsed;
      } catch {
        aiReport = {
          executiveSummary: responseText.substring(0, 500),
          fullReport: responseText,
          success: true
        };
      }
      console.log('✅ Ollama 보고서 생성 성공');
    } catch (aiError) {
      console.error('❌ Ollama 보고서 생성 실패:', aiError);
      // 실패 시에도 기본 보고서는 생성
      aiReport = {
        executiveSummary: `${data.companyName}의 AI 역량진단 결과, 종합점수 ${totalScore.toFixed(1)}점을 획득하셨습니다. 자세한 분석 보고서는 추가 처리 중입니다.`,
        error: aiError.message
      };
    }

    // 7. 진단 데이터 구성
    const diagnosisData = {
      timestamp,
      companyName: data.companyName,
      industry: data.industry,
      contactManager: data.contactManager,
      email: data.email,
      phone: data.phone || '',
      totalScore: totalScore.toFixed(1),
      aiCapabilityScore: aiCapabilityScores.total.toFixed(1),
      practicalCapabilityScore: practicalCapabilityScores.total.toFixed(1),
      gapPercentage: gapAnalysis.overallGapPercentage.toFixed(1),
      competitivePosition: gapAnalysis.competitivePosition,
      priorityAreas: gapAnalysis.priorityAreas.join(', '),
      mainStrengths: strategicAnalysis.swot.strengths.slice(0, 3).join(', '),
      mainWeaknesses: strategicAnalysis.swot.weaknesses.slice(0, 3).join(', '),
      strategicDirection: enhancementDirection.strategicDirection,
      immediateActions: enhancementDirection.implementationRoadmap.immediate.slice(0, 3).join(', '),
      expectedROI: enhancementDirection.expectedOutcomes.expectedROI,
      privacyConsent: data.privacyConsent ? 'Y' : 'N',
      marketingConsent: data.marketingConsent ? 'Y' : 'N',
      status: '완료'
    };

    // 8. Google Sheets에 저장
    await saveToGoogleSheets('AI_무료진단신청', diagnosisData);

    // 9. 이메일 발송
    // 사용자 확인 이메일
    let emailRetries = 3;
    while (emailRetries > 0) {
      try {
        await sendEmail({
          to: data.email,
          subject: `[AICAMP] ${data.companyName}님의 AI 경영진단 결과`,
          type: 'diagnosisResult',
          data: {
            companyName: data.companyName,
            contactManager: data.contactManager,
            totalScore,
            industry: data.industry,
            strategicDirection: enhancementDirection.strategicDirection,
            aiReport: aiReport?.executiveSummary || strategicAnalysis.swot.strengths[0]
          }
        });
        break;
      } catch (error) {
        console.error('User email send failed (retry ' + (4 - emailRetries) + '):', error);
        emailRetries--;
        if (emailRetries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
      }
    }

    // 관리자 알림 이메일
    emailRetries = 3;
    while (emailRetries > 0) {
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'hongik423@gmail.com',
          subject: `[진단 완료] ${data.companyName} - ${data.industry} (${totalScore.toFixed(1)}점)`,
          type: 'diagnosisAdminNotification',
          data: {
            ...diagnosisData,
            rowNumber,
            fullReport: aiReport
          }
        });
        break;
      } catch (error) {
        console.error('Admin email send failed (retry ' + (4 - emailRetries) + '):', error);
        emailRetries--;
        if (emailRetries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('✅ 진단 처리 완료:', data.companyName);

    return NextResponse.json({
      success: true,
      data: {
        message: 'AI 경영진단이 성공적으로 완료되었습니다.',
        diagnosisId: `DG-${Date.now()}`,
        totalScore,
        competitivePosition: gapAnalysis.competitivePosition,
        strategicDirection: enhancementDirection.strategicDirection,
        priorityAreas: gapAnalysis.priorityAreas,
        expectedROI: enhancementDirection.expectedOutcomes.expectedROI
      }
    });

  } catch (error) {
    console.error('❌ 진단 처리 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '진단 처리 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}

// AI 보고서 프롬프트 생성
function generateAIReportPrompt(data: any, analysisData: any): string {
  return `
당신은 AICAMP의 수석 AI 경영 컨설턴트입니다. 다음 기업의 종합적인 AI 경영진단 보고서를 작성해주세요.

[기업 정보]
- 기업명: ${data.companyName}
- 산업: ${data.industry}
- 직원수: ${data.employeeCount}
- 연매출: ${data.annualRevenue}
- 업력: ${data.businessHistory}

[진단 점수]
- 종합 점수: ${analysisData.comprehensiveScores.total}
- AI 역량 점수: ${analysisData.aiCapabilityScores.total}
- 실무 역량 점수: ${analysisData.practicalCapabilityScores.total}

[벤치마크 갭 분석]
- 갭 비율: ${analysisData.gapAnalysis.overallGapPercentage}%
- 경쟁 포지션: ${analysisData.gapAnalysis.competitivePosition}
- 우선 개선 영역: ${analysisData.gapAnalysis.priorityAreas.join(', ')}

[SWOT 분석]
${JSON.stringify(analysisData.strategicAnalysis.swot, null, 2)}

[전략 방향]
${analysisData.enhancementDirection.strategicDirection}

전문적이고 실행 가능한 보고서를 작성해주세요. 다음 형식으로 응답해주세요:

{
  "executiveSummary": "종합 요약 (300자 이내)",
  "detailedAnalysis": {
    "currentState": "현재 상태 분석",
    "industryComparison": "산업 대비 분석",
    "coreStrengths": ["핵심 강점 1", "핵심 강점 2", "핵심 강점 3"],
    "improvementAreas": ["개선 영역 1", "개선 영역 2", "개선 영역 3"]
  },
  "strategicRecommendations": [
    {
      "recommendation": "추천사항",
      "expectedImpact": "기대효과",
      "implementation": "실행방안",
      "timeline": "예상 기간"
    }
  ],
  "investmentPlan": {
    "phase1": { "focus": "1단계 집중사항", "budget": "예산 범위", "duration": "기간" },
    "phase2": { "focus": "2단계 집중사항", "budget": "예산 범위", "duration": "기간" },
    "phase3": { "focus": "3단계 집중사항", "budget": "예산 범위", "duration": "기간" }
  },
  "expectedOutcomes": {
    "efficiency": "효율성 개선률",
    "costReduction": "비용 절감률",
    "revenueGrowth": "매출 성장률",
    "roi": "투자수익률"
  },
  "nextSteps": ["다음 단계 1", "다음 단계 2", "다음 단계 3"]
}
  `;
}
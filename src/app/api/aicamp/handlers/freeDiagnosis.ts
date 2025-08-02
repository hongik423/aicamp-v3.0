import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveToGoogleSheets, updateSheetRow } from '../services/googleSheets';
import { callGeminiAPI } from '../services/geminiApi';
import { sendEmail } from '../services/emailService';
import { calculateAICapabilityScores, calculatePracticalCapabilityScores } from '../utils/scoreCalculations';

// 무료 진단 신청 처리
export async function handleFreeDiagnosisSubmission(data: any) {
  try {
    // 진단 ID 생성
    const diagnosisId = `FD-${Date.now()}-${uuidv4().substring(0, 8)}`;
    const timestamp = new Date().toISOString();

    // 입력 데이터 검증
    if (!data.companyName || !data.industry || !data.email || !data.contactManager) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 이메일 유효성 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Google Sheets에 신청 정보 저장
    const applicationData = {
      diagnosisId,
      timestamp,
      status: 'processing',
      companyName: data.companyName,
      industry: data.industry,
      contactManager: data.contactManager,
      email: data.email,
      phone: data.phone || '',
      employeeCount: data.employeeCount || '',
      annualRevenue: data.annualRevenue || '',
      businessHistory: data.businessHistory || '',
      digitalizationLevel: data.digitalizationLevel || '',
      aiExperience: data.aiExperience || '',
      consultingArea: data.consultingArea || '',
      mainConcerns: data.mainConcerns || '',
      expectedBenefits: data.expectedBenefits || '',
      additionalQuestions: data.additionalQuestions || '',
      privacyConsent: data.privacyConsent ? 'Y' : 'N',
      marketingConsent: data.marketingConsent ? 'Y' : 'N'
    };

    await saveToGoogleSheets('AI_무료진단신청', applicationData);

    // 사용자 확인 이메일 발송
    await sendEmail({
      to: data.email,
      subject: `[AICAMP] ${data.companyName}님의 AI 경영진단 신청이 접수되었습니다`,
      type: 'userConfirmation',
      data: {
        companyName: data.companyName,
        contactManager: data.contactManager,
        diagnosisId
      }
    });

    // 관리자 알림 이메일 발송
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'hongik423@gmail.com',
      subject: `[신규 진단 신청] ${data.companyName} - ${data.industry}`,
      type: 'adminNotification',
      data: applicationData
    });

    // 비동기 AI 분석 시작 (백그라운드 처리)
    performAIAnalysis(diagnosisId, data).catch(error => {
      console.error('AI 분석 중 오류:', error);
    });

    return NextResponse.json({
      success: true,
      data: {
        diagnosisId,
        message: 'AI 경영진단 신청이 성공적으로 접수되었습니다.',
        estimatedTime: '5-10분',
        status: 'processing'
      }
    });

  } catch (error) {
    console.error('진단 신청 처리 오류:', error);
    return NextResponse.json(
      { success: false, error: '진단 신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 진단 결과 조회
export async function handleGetFreeDiagnosisResult(diagnosisId: string) {
  try {
    if (!diagnosisId) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // Google Sheets에서 결과 조회
    const { getSheetData } = await import('../services/googleSheets');
    const results = await getSheetData('AI_무료진단결과');
    
    const result = results.find((row: any) => row.diagnosisId === diagnosisId);

    if (!result) {
      return NextResponse.json({
        success: true,
        data: {
          status: 'processing',
          message: 'AI 분석이 진행 중입니다. 잠시만 기다려주세요.',
          progress: 50
        }
      });
    }

    if (result.status === 'error') {
      return NextResponse.json({
        success: false,
        error: '진단 처리 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    }

    // 상세 결과 파싱
    const detailedResult = {
      diagnosisId,
      status: 'completed',
      companyInfo: {
        companyName: result.companyName,
        industry: result.industry,
        employeeCount: result.employeeCount
      },
      scores: {
        overall: parseFloat(result.overallScore) || 0,
        aiCapability: JSON.parse(result.aiCapabilityScores || '{}'),
        practicalCapability: JSON.parse(result.practicalCapabilityScores || '{}')
      },
      analysis: {
        executiveSummary: result.executiveSummary,
        keyFindings: JSON.parse(result.keyFindings || '[]'),
        swot: JSON.parse(result.swotAnalysis || '{}'),
        recommendations: JSON.parse(result.recommendations || '[]')
      },
      roadmap: JSON.parse(result.roadmap || '[]'),
      curriculum: JSON.parse(result.curriculum || '[]')
    };

    return NextResponse.json({
      success: true,
      data: detailedResult
    });

  } catch (error) {
    console.error('진단 결과 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '진단 결과 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// AI 분석 수행 (비동기)
async function performAIAnalysis(diagnosisId: string, data: any) {
  try {
    console.log(`🤖 AI 분석 시작: ${diagnosisId}`);

    // 점수 계산
    const aiScores = calculateAICapabilityScores(data);
    const practicalScores = calculatePracticalCapabilityScores(data);
    const overallScore = (aiScores.total + practicalScores.total) / 2;

    // GEMINI AI 분석
    const prompt = generateAnalysisPrompt(data, aiScores, practicalScores);
    const aiAnalysis = await callGeminiAPI(prompt);

    // 분석 결과 저장
    const analysisResult = {
      diagnosisId,
      timestamp: new Date().toISOString(),
      status: 'completed',
      companyName: data.companyName,
      industry: data.industry,
      overallScore: overallScore.toFixed(1),
      aiCapabilityScores: JSON.stringify(aiScores),
      practicalCapabilityScores: JSON.stringify(practicalScores),
      executiveSummary: aiAnalysis.executiveSummary || '',
      keyFindings: JSON.stringify(aiAnalysis.keyFindings || []),
      swotAnalysis: JSON.stringify(aiAnalysis.swot || {}),
      recommendations: JSON.stringify(aiAnalysis.recommendations || []),
      roadmap: JSON.stringify(aiAnalysis.roadmap || []),
      curriculum: JSON.stringify(aiAnalysis.curriculum || [])
    };

    await saveToGoogleSheets('AI_무료진단결과', analysisResult);

    // 결과 이메일 발송
    await sendEmail({
      to: data.email,
      subject: `[AICAMP] ${data.companyName}님의 AI 경영진단 결과가 준비되었습니다`,
      type: 'diagnosisResult',
      data: {
        companyName: data.companyName,
        contactManager: data.contactManager,
        diagnosisId,
        overallScore,
        executiveSummary: aiAnalysis.executiveSummary
      }
    });

    console.log(`✅ AI 분석 완료: ${diagnosisId}`);

  } catch (error) {
    console.error(`❌ AI 분석 실패 (${diagnosisId}):`, error);
    
    // 오류 상태 업데이트
    await updateSheetRow('AI_무료진단신청', diagnosisId, {
      status: 'error',
      errorMessage: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
}

// AI 분석 프롬프트 생성
function generateAnalysisPrompt(data: any, aiScores: any, practicalScores: any): string {
  return `
당신은 AICAMP의 수석 AI 경영 컨설턴트입니다. 다음 기업의 AI 경영진단을 수행하고 전문적인 분석 보고서를 작성해주세요.

[기업 정보]
- 기업명: ${data.companyName}
- 산업: ${data.industry}
- 직원수: ${data.employeeCount}
- 연매출: ${data.annualRevenue}
- 업력: ${data.businessHistory}
- 디지털화 수준: ${data.digitalizationLevel}
- AI 경험: ${data.aiExperience}

[AI 역량 점수]
${Object.entries(aiScores).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

[실무 역량 점수]
${Object.entries(practicalScores).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

[주요 관심사]
${data.mainConcerns}

[기대 효과]
${data.expectedBenefits}

다음 형식의 JSON으로 분석 결과를 제공해주세요:

{
  "executiveSummary": "종합 요약 (200자 이내)",
  "keyFindings": ["핵심 발견사항 1", "핵심 발견사항 2", "핵심 발견사항 3"],
  "swot": {
    "strengths": ["강점1", "강점2"],
    "weaknesses": ["약점1", "약점2"],
    "opportunities": ["기회1", "기회2"],
    "threats": ["위협1", "위협2"]
  },
  "recommendations": [
    {
      "title": "추천 사항 제목",
      "description": "상세 설명",
      "priority": "high/medium/low",
      "expectedImpact": "기대 효과"
    }
  ],
  "roadmap": [
    {
      "phase": "1단계: 기반 구축",
      "duration": "3개월",
      "actions": ["액션1", "액션2"]
    }
  ],
  "curriculum": [
    {
      "course": "교육과정명",
      "target": "대상",
      "duration": "기간",
      "description": "설명"
    }
  ]
}
  `;
}
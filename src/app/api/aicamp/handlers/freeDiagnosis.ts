import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveToGoogleSheets, updateSheetRow } from '../services/googleSheets';
import { callAI } from '@/lib/ai/ai-provider';
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

    // Ollama GPT-OSS 20B AI 분석
    const prompt = generateAnalysisPrompt(data, aiScores, practicalScores);
    const responseText = await callAI({ prompt, system: '당신은 "이교장의AI상담" 시스템의 Ollama GPT-OSS 20B 전용 분석가입니다. JSON만 반환하세요.' });
    let aiAnalysis: any = {};
    try {
      aiAnalysis = JSON.parse(responseText);
    } catch {
      aiAnalysis = { executiveSummary: responseText };
    }

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
당신은 이후경 교장(AICAMP 대표)입니다. 20년간 AI/디지털 전환 컨설팅 경험을 바탕으로 다음 기업의 AI 경영진단을 수행하고 전문적인 분석 보고서를 작성해주세요.

🎯 분석 전문성:
- 45개 행동지표 기반 정밀 진단
- 업종별 AI 도입 전략 (1000+ 기업 컨설팅 경험)
- n8n/Make 자동화 솔루션 설계
- ChatGPT/Claude 프롬프트 엔지니어링
- ROI 기반 실행 로드맵 수립

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

🎯 이교장 스타일 분석 요구사항:
1. 격려와 동기부여가 담긴 톤앤매너
2. 구체적 ROI 수치 제시 (업무효율 300% 등)
3. 단계별 실행 방안 (즉시/단기/장기)
4. AICAMP 교육과정과 연계된 솔루션
5. n8n 자동화 시나리오 포함

다음 형식의 JSON으로 분석 결과를 제공해주세요:

{
  "executiveSummary": "이교장 톤으로 격려하는 종합 요약 (300자 이내, '걱정 마세요' 등 포함)",
  "keyFindings": [
    "핵심 발견사항 1 (구체적 수치 포함)",
    "핵심 발견사항 2 (업종별 특성 반영)",
    "핵심 발견사항 3 (개선 잠재력 강조)"
  ],
  "swot": {
    "strengths": ["현재 보유한 구체적 강점 (도구/인력/프로세스)", "강점2"],
    "weaknesses": ["개선 필요한 구체적 약점", "약점2"],
    "opportunities": ["${data.industry} 업종 AI 도입 기회", "기회2"],
    "threats": ["경쟁사 대비 위험 요소", "위협2"]
  },
  "recommendations": [
    {
      "title": "즉시 실행 과제 (1주일 내)",
      "description": "ChatGPT/Claude 활용 업무 효율화",
      "priority": "high",
      "expectedImpact": "업무 시간 30% 단축",
      "tools": ["ChatGPT", "Claude"],
      "estimatedROI": "300%"
    },
    {
      "title": "단기 과제 (1-3개월)",
      "description": "n8n 기반 핵심 업무 자동화",
      "priority": "high",
      "expectedImpact": "반복 업무 90% 자동화",
      "tools": ["n8n", "Make"],
      "estimatedROI": "500%"
    },
    {
      "title": "장기 전략 (3-12개월)",
      "description": "AI 기반 조직 혁신 완성",
      "priority": "medium",
      "expectedImpact": "전사 생산성 혁신",
      "tools": ["종합 AI 플랫폼"],
      "estimatedROI": "800%"
    }
  ],
  "roadmap": [
    {
      "phase": "1단계: AI 기초 역량 구축",
      "duration": "1-2개월",
      "budget": "기본 투자",
      "actions": [
        "AICAMP 'ChatGPT & Claude 업무 활용 마스터' 교육 (8시간)",
        "프롬프트 엔지니어링 실무 적용",
        "업무별 AI 도구 매핑"
      ],
      "expectedROI": "300%",
      "successMetrics": ["업무 효율 30% 향상", "문서 작성 시간 50% 단축"]
    },
    {
      "phase": "2단계: 업무 자동화 고도화",
      "duration": "3-4개월",
      "budget": "중간 투자",
      "actions": [
        "AICAMP 'n8n & Make 업무 자동화 전문가' 교육 (16시간)",
        "${data.industry} 맞춤형 워크플로우 구축",
        "API 연동 및 데이터 통합"
      ],
      "expectedROI": "500%",
      "successMetrics": ["반복 업무 90% 자동화", "데이터 처리 시간 80% 단축"]
    },
    {
      "phase": "3단계: AI 전문 조직 완성",
      "duration": "5-6개월",
      "budget": "고급 투자",
      "actions": [
        "AICAMP 'AI 리더십 & 디지털 전환 전략' 교육 (12시간)",
        "전사 AI 플랫폼 구축",
        "AI CoE(Center of Excellence) 설립"
      ],
      "expectedROI": "800%",
      "successMetrics": ["전사 생산성 50% 향상", "의사결정 속도 70% 개선"]
    }
  ],
  "curriculum": [
    {
      "course": "ChatGPT & Claude 업무 활용 마스터",
      "target": "전 직원 (${data.employeeCount}명)",
      "duration": "8시간 (2일)",
      "price": "정부지원 시 무료",
      "description": "생성형 AI 프롬프트 엔지니어링으로 업무 생산성 300% 향상",
      "expectedOutcome": "문서작성 자동화, 데이터 분석 역량 확보"
    },
    {
      "course": "n8n & Make 업무 자동화 전문가",
      "target": "핵심 인력 (3-5명)",
      "duration": "16시간 (4일)",
      "price": "정부지원 시 할인",
      "description": "No-Code 도구로 ${data.industry} 업무 프로세스 90% 자동화",
      "expectedOutcome": "워크플로우 설계, API 연동, 실시간 모니터링"
    },
    {
      "course": "AI 리더십 & 디지털 전환 전략",
      "target": "경영진 및 팀장급",
      "duration": "12시간 (3일)",
      "price": "1:1 컨설팅 포함",
      "description": "AI 기반 조직 혁신과 전략적 의사결정 체계 구축",
      "expectedOutcome": "AI 전략 수립, 변화 관리, ROI 극대화"
    }
  ],
  "n8nScenarios": [
    "${data.industry} 맞춤 자동화 시나리오 1",
    "${data.industry} 맞춤 자동화 시나리오 2",
    "${data.industry} 맞춤 자동화 시나리오 3"
  ],
  "totalInvestment": {
    "year1": "단계별 투자",
    "expectedSaving": "연간 비용 절감",
    "paybackPeriod": "2-3개월",
    "roi3year": "1000-2000%"
  }
}
  `;
}
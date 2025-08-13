import { NextRequest, NextResponse } from 'next/server';

// GEMINI API 설정
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// 타임아웃 설정 (Vercel 최대 800초)
const TIMEOUT_MS = 800000; // 800초

export const maxDuration = 800; // Vercel 함수 최대 실행 시간

// GEMINI API 직접 호출 함수들
async function calculateDiagnosisScores(data: any) {
  // 5개 영역별 점수 계산 (각 영역 100점 만점)
  const scores = {
    currentAI: Math.min(100, Math.round(
      (data.aiFamiliarity || 0) * 10 + 
      (data.currentAiTools?.length || 0) * 5 + 
      (data.aiUsageDepartments?.length || 0) * 3 +
      (data.dataDigitalization || 0) * 8 +
      (data.systemIntegration || 0) * 7
    )),
    organizationReadiness: Math.min(100, Math.round(
      (data.changeReadiness || 0) * 12 + 
      (data.leadershipSupport || 0) * 15 + 
      (data.employeeAttitude || 0) * 10 +
      (data.changeManagementExperience || 0) * 8 +
      (data.technicalPersonnel || 0) * 10
    )),
    techInfrastructure: Math.min(100, Math.round(
      (data.cloudAdoption || 0) * 15 + 
      (data.systemScalability || 0) * 12 + 
      (data.integrationCapability || 0) * 12 +
      (data.securityMeasures?.length || 0) * 8 +
      (data.riskManagement || 0) * 10
    )),
    goalClarity: Math.min(100, Math.round(
      (data.aiTransformationGoals?.length || 0) * 12 + 
      (data.specificImprovements ? 15 : 0) + 
      (data.successMetrics?.length || 0) * 10 +
      (data.expectedROI ? 15 : 0) +
      (data.decisionMaking || 0) * 8
    )),
    executionCapability: Math.min(100, Math.round(
      (data.budgetAllocation ? 20 : 0) + 
      (data.priorityFunctions?.length || 0) * 8 + 
      (data.implementationApproach ? 15 : 0) +
      (data.trainingInvestment || 0) * 10 +
      (data.externalPartnership || 0) * 7
    ))
  };

  const total = Math.round((scores.currentAI + scores.organizationReadiness + scores.techInfrastructure + scores.goalClarity + scores.executionCapability) / 5);
  
  let level = 'Beginner';
  if (total >= 80) level = 'Advanced';
  else if (total >= 60) level = 'Intermediate';
  else if (total >= 40) level = 'Basic';

  return { ...scores, total, level };
}

async function generateSWOTAnalysis(data: any, scores: any) {
  return {
    strengths: [
      scores.organizationReadiness > 70 ? "경영진의 강력한 AI 도입 의지" : null,
      scores.currentAI > 60 ? "기존 AI 도구 활용 경험" : null,
      scores.techInfrastructure > 60 ? "안정적인 기술 인프라" : null,
      data.budgetAllocation ? "AI 도입을 위한 예산 확보" : null
    ].filter(Boolean),
    weaknesses: [
      scores.executionCapability < 50 ? "AI 전문 인력 부족" : null,
      scores.currentAI < 50 ? "데이터 디지털화 수준 미흡" : null,
      scores.organizationReadiness < 50 ? "조직 변화 준비도 부족" : null,
      scores.techInfrastructure < 50 ? "시스템 통합 역량 부족" : null
    ].filter(Boolean),
    opportunities: [
      "AI 기술 발전으로 인한 새로운 비즈니스 기회",
      "경쟁사 대비 AI 도입을 통한 차별화 가능성",
      "정부의 AI 지원 정책 및 보조금 활용",
      "고객 경험 개선을 통한 시장 점유율 확대"
    ],
    threats: [
      "AI 도입 지연으로 인한 경쟁 열세",
      "급속한 기술 변화에 대한 적응 부족",
      "데이터 보안 및 개인정보 보호 리스크",
      "AI 도입 비용 대비 ROI 불확실성"
    ]
  };
}

async function generateRoadmap(data: any, scores: any) {
  return {
    phase1: {
      title: "기반 구축 (1-3개월)",
      tasks: [
        "AI 전담팀 구성 및 역할 정의",
        "현재 업무 프로세스 분석 및 문서화",
        "기초 AI 교육 프로그램 실시",
        "데이터 수집 및 정리 체계 구축"
      ],
      budget: "1,000만원 - 3,000만원",
      expectedResults: "AI 도입 기반 마련, 직원 인식 개선"
    },
    phase2: {
      title: "핵심 자동화 (4-8개월)",
      tasks: [
        "우선순위 업무 영역 AI 도입",
        "맞춤형 AI 솔루션 개발/도입",
        "직원 대상 실무 AI 교육",
        "성과 측정 시스템 구축"
      ],
      budget: "3,000만원 - 1억원",
      expectedResults: "핵심 업무 효율성 30% 향상"
    },
    phase3: {
      title: "고도화 및 확산 (9-12개월)",
      tasks: [
        "AI 활용 범위 전사 확대",
        "고급 분석 및 예측 시스템 구축",
        "외부 파트너십 및 생태계 구축",
        "지속적 개선 체계 확립"
      ],
      budget: "5,000만원 - 2억원",
      expectedResults: "전사 AI 역량 고도화, 경쟁 우위 확보"
    }
  };
}

async function callGeminiAPI(prompt: string) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI API 키가 설정되지 않았습니다.');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4000,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`GEMINI API 오류: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result.candidates[0]?.content?.parts[0]?.text || '';
}

async function generateAIAnalysisReport(data: any, scores: any, swot: any, roadmap: any) {
  const prompt = `
다음은 기업의 AI 역량 진단 결과입니다. 전문적이고 실용적인 분석 보고서를 작성해주세요.

**기업 정보:**
- 회사명: ${data.companyName}
- 업종: ${data.industry}
- 규모: ${data.employeeCount}
- 매출: ${data.annualRevenue}

**진단 점수 (100점 만점):**
- 현재 AI 활용도: ${scores.currentAI}점
- 조직 준비도: ${scores.organizationReadiness}점
- 기술 인프라: ${scores.techInfrastructure}점
- 목표 명확성: ${scores.goalClarity}점
- 실행 역량: ${scores.executionCapability}점
- **전체 점수: ${scores.total}점 (${scores.level})**

**SWOT 분석:**
- 강점: ${swot.strengths.join(', ')}
- 약점: ${swot.weaknesses.join(', ')}
- 기회: ${swot.opportunities.slice(0, 2).join(', ')}
- 위협: ${swot.threats.slice(0, 2).join(', ')}

다음 구조로 보고서를 작성해주세요:
1. 진단 결과 요약 (3-4문장)
2. 주요 강점 분석 (2-3개)
3. 개선 필요 영역 (2-3개)
4. 우선 추진 과제 (3개)
5. 기대 효과 및 ROI 전망

전문적이고 실용적인 톤으로 작성하되, 구체적인 액션 아이템을 포함해주세요.
`;

  return await callGeminiAPI(prompt);
}

async function generateHTMLReport(data: any, scores: any, swot: any, roadmap: any, aiAnalysis: string) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} AI역량진단 보고서</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; }
        .score-dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .score-card { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .score-value { font-size: 2.5em; font-weight: bold; color: #667eea; margin-bottom: 10px; }
        .score-label { font-size: 0.9em; color: #666; text-transform: uppercase; letter-spacing: 1px; }
        .swot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .swot-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .swot-title { font-size: 1.2em; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid; }
        .strengths .swot-title { color: #4CAF50; border-color: #4CAF50; }
        .weaknesses .swot-title { color: #f44336; border-color: #f44336; }
        .opportunities .swot-title { color: #2196F3; border-color: #2196F3; }
        .threats .swot-title { color: #FF9800; border-color: #FF9800; }
        .roadmap { background: white; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .phase { margin-bottom: 25px; padding: 15px; border-left: 4px solid #667eea; background: #f8f9ff; }
        .phase-title { font-size: 1.3em; font-weight: bold; color: #667eea; margin-bottom: 10px; }
        .ai-analysis { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); white-space: pre-line; }
        .maturity-level { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; color: white; margin-left: 10px; }
        .level-advanced { background: #4CAF50; }
        .level-intermediate { background: #2196F3; }
        .level-basic { background: #FF9800; }
        .level-beginner { background: #f44336; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.companyName} AI역량진단 보고서</h1>
            <p>진단일: ${new Date().toLocaleDateString('ko-KR')}</p>
            <span class="maturity-level level-${scores.level.toLowerCase()}">${scores.level} 수준</span>
        </div>

        <div class="score-dashboard">
            <div class="score-card">
                <div class="score-value">${scores.total}</div>
                <div class="score-label">전체 점수</div>
            </div>
            <div class="score-card">
                <div class="score-value">${scores.currentAI}</div>
                <div class="score-label">현재 AI 활용</div>
            </div>
            <div class="score-card">
                <div class="score-value">${scores.organizationReadiness}</div>
                <div class="score-label">조직 준비도</div>
            </div>
            <div class="score-card">
                <div class="score-value">${scores.techInfrastructure}</div>
                <div class="score-label">기술 인프라</div>
            </div>
            <div class="score-card">
                <div class="score-value">${scores.goalClarity}</div>
                <div class="score-label">목표 명확성</div>
            </div>
            <div class="score-card">
                <div class="score-value">${scores.executionCapability}</div>
                <div class="score-label">실행 역량</div>
            </div>
        </div>

        <div class="swot-grid">
            <div class="swot-card strengths">
                <div class="swot-title">강점 (Strengths)</div>
                <ul>${swot.strengths.map((s: string) => `<li>${s}</li>`).join('')}</ul>
            </div>
            <div class="swot-card weaknesses">
                <div class="swot-title">약점 (Weaknesses)</div>
                <ul>${swot.weaknesses.map((w: string) => `<li>${w}</li>`).join('')}</ul>
            </div>
            <div class="swot-card opportunities">
                <div class="swot-title">기회 (Opportunities)</div>
                <ul>${swot.opportunities.map((o: string) => `<li>${o}</li>`).join('')}</ul>
            </div>
            <div class="swot-card threats">
                <div class="swot-title">위협 (Threats)</div>
                <ul>${swot.threats.map((t: string) => `<li>${t}</li>`).join('')}</ul>
            </div>
        </div>

        <div class="roadmap">
            <h2>추천 로드맵</h2>
            <div class="phase">
                <div class="phase-title">${roadmap.phase1.title}</div>
                <p><strong>주요 과제:</strong> ${roadmap.phase1.tasks.join(', ')}</p>
                <p><strong>예상 투자:</strong> ${roadmap.phase1.budget}</p>
                <p><strong>기대 효과:</strong> ${roadmap.phase1.expectedResults}</p>
            </div>
            <div class="phase">
                <div class="phase-title">${roadmap.phase2.title}</div>
                <p><strong>주요 과제:</strong> ${roadmap.phase2.tasks.join(', ')}</p>
                <p><strong>예상 투자:</strong> ${roadmap.phase2.budget}</p>
                <p><strong>기대 효과:</strong> ${roadmap.phase2.expectedResults}</p>
            </div>
            <div class="phase">
                <div class="phase-title">${roadmap.phase3.title}</div>
                <p><strong>주요 과제:</strong> ${roadmap.phase3.tasks.join(', ')}</p>
                <p><strong>예상 투자:</strong> ${roadmap.phase3.budget}</p>
                <p><strong>기대 효과:</strong> ${roadmap.phase3.expectedResults}</p>
            </div>
        </div>

        <div class="ai-analysis">
            <h2>AI 전문가 분석</h2>
            ${aiAnalysis}
        </div>
    </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🧠 AI역량진단 API 시작 - GEMINI 2.5 Flash 모델');
    
    // 요청 데이터 파싱 (45개 질문 구조)
    const data = await request.json();
    
    // 환경 변수 검증
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'GEMINI API 키가 설정되지 않았습니다. 환경변수를 확인하세요.' },
        { status: 500 }
      );
    }

    // 데이터 유효성 검사
    if (!data.contactEmail || !data.contactName || !data.companyName) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      );
    }

    console.log(`📊 진단 시작: ${data.companyName} (${data.contactName})`);

    // 1단계: 점수 계산
    console.log('🔢 1단계: 점수 계산 중...');
    const scores = await calculateDiagnosisScores(data);
    console.log(`✅ 점수 계산 완료: ${scores.total}점 (${scores.level})`);

    // 2단계: SWOT 분석
    console.log('🎯 2단계: SWOT 분석 중...');
    const swot = await generateSWOTAnalysis(data, scores);
    console.log('✅ SWOT 분석 완료');

    // 3단계: 로드맵 생성
    console.log('🗺️ 3단계: 로드맵 생성 중...');
    const roadmap = await generateRoadmap(data, scores);
    console.log('✅ 로드맵 생성 완료');

    // 4단계: GEMINI AI 분석 보고서 생성
    console.log('🤖 4단계: GEMINI AI 분석 보고서 생성 중...');
    const aiAnalysis = await generateAIAnalysisReport(data, scores, swot, roadmap);
    console.log('✅ AI 분석 보고서 생성 완료');

    // 5단계: HTML 보고서 생성
    console.log('📄 5단계: HTML 보고서 생성 중...');
    const htmlReport = await generateHTMLReport(data, scores, swot, roadmap, aiAnalysis);
    console.log('✅ HTML 보고서 생성 완료');

    // 6단계: 진단 ID 생성
    const diagnosisId = `DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('🎉 AI역량진단 완료!');
    
    // 응답 반환
    return NextResponse.json({
      success: true,
      diagnosisId,
      message: 'AI역량진단이 성공적으로 완료되었습니다.',
      scores,
      level: scores.level,
      swot,
      roadmap,
      aiAnalysis,
      htmlReport,
      htmlReportGenerated: true,
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-GEMINI-2.5-FLASH',
      model: 'gemini-2.5-flash'
    });

  } catch (error: any) {
    console.error('❌ AI역량진단 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || '진단 처리 중 오류가 발생했습니다.',
      timestamp: new Date().toISOString()
    }, { 
      status: 500 
    });
  }
}
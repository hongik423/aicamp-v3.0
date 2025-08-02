// GEMINI API 서비스
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

// API 키 유효성 검사
function isValidApiKey(): boolean {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.length === 0) {
    console.warn('⚠️ GEMINI API 키가 설정되지 않음');
    return false;
  }
  
  // API 키 형식 검증 (AIza로 시작하는 39자)
  if (GEMINI_API_KEY.startsWith('AIza') && GEMINI_API_KEY.length === 39) {
    return true;
  } else {
    console.warn('⚠️ GEMINI API 키 형식이 올바르지 않음');
    return false;
  }
}

// GEMINI API 호출
export async function callGeminiAPI(prompt: string): Promise<any> {
  try {
    // API 키 검증
    if (!isValidApiKey()) {
      console.warn('⚠️ GEMINI API 키가 유효하지 않음, 폴백 사용');
      return generateFallbackResponse(prompt);
    }

    console.log('🤖 GEMINI API 호출 시작');

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
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ GEMINI API 오류:', errorData);
      throw new Error(errorData.error?.message || 'API 호출 실패');
    }

    const data: GeminiResponse = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error('응답에서 텍스트를 찾을 수 없습니다');
    }

    // JSON 응답 파싱 시도
    try {
      // JSON 블록 추출 (```json ... ``` 형식 처리)
      const jsonMatch = textContent.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : textContent;
      
      const parsedResponse = JSON.parse(jsonStr);
      console.log('✅ GEMINI API 응답 파싱 성공');
      return parsedResponse;
    } catch (parseError) {
      console.warn('⚠️ JSON 파싱 실패, 텍스트로 반환');
      return { rawText: textContent };
    }

  } catch (error) {
    console.error('❌ GEMINI API 호출 오류:', error);
    return generateFallbackResponse(prompt);
  }
}

// 폴백 응답 생성
function generateFallbackResponse(prompt: string): any {
  console.log('🔄 폴백 응답 생성 중...');

  // 프롬프트에서 기업 정보 추출
  const companyMatch = prompt.match(/기업명:\s*([^\n]+)/);
  const industryMatch = prompt.match(/산업:\s*([^\n]+)/);
  const scoreMatch = prompt.match(/종합 점수:\s*([0-9.]+)/);

  const companyName = companyMatch ? companyMatch[1].trim() : '귀사';
  const industry = industryMatch ? industryMatch[1].trim() : '해당 산업';
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : 75;

  // 점수에 따른 등급 결정
  const grade = score >= 90 ? 'S' : 
                score >= 80 ? 'A' : 
                score >= 70 ? 'B' : 
                score >= 60 ? 'C' : 'D';

  return {
    executiveSummary: `${companyName}는 ${industry} 분야에서 AI 도입 준비도 ${score}점(${grade}등급)을 기록했습니다. 전략적 AI 도입을 통해 디지털 혁신을 가속화할 수 있는 잠재력을 보유하고 있습니다.`,
    
    detailedAnalysis: {
      currentState: `현재 ${companyName}는 ${industry} 산업 평균 대비 ${score > 75 ? '우수한' : '개선이 필요한'} AI 준비 수준을 보이고 있습니다.`,
      industryComparison: `${industry} 산업 평균 대비 ${Math.abs(score - 75)}% ${score > 75 ? '높은' : '낮은'} 수준입니다.`,
      coreStrengths: [
        "경영진의 AI 도입 의지가 강함",
        "기초적인 디지털 인프라 구축 완료",
        "직원들의 변화 수용 태도가 긍정적"
      ],
      improvementAreas: [
        "AI 전문 인력 확보 및 육성",
        "데이터 거버넌스 체계 구축",
        "AI 활용 업무 프로세스 재설계"
      ]
    },
    
    strategicRecommendations: [
      {
        recommendation: "AI 파일럿 프로젝트 시작",
        expectedImpact: "업무 효율성 20-30% 향상",
        implementation: "핵심 업무 영역 선정 후 3개월 내 POC 진행",
        timeline: "3-6개월"
      },
      {
        recommendation: "AI 역량 교육 프로그램 도입",
        expectedImpact: "전사 AI 활용 역량 향상",
        implementation: "AICAMP 맞춤형 교육 커리큘럼 적용",
        timeline: "1-3개월"
      },
      {
        recommendation: "데이터 인프라 고도화",
        expectedImpact: "AI 모델 성능 및 정확도 향상",
        implementation: "데이터 수집-저장-분석 파이프라인 구축",
        timeline: "6-12개월"
      }
    ],
    
    investmentPlan: {
      phase1: {
        focus: "기반 구축 및 파일럿",
        budget: "5천만원 - 1억원",
        duration: "3개월"
      },
      phase2: {
        focus: "확산 및 고도화",
        budget: "1억원 - 3억원",
        duration: "6개월"
      },
      phase3: {
        focus: "전사 통합 및 최적화",
        budget: "3억원 - 5억원",
        duration: "12개월"
      }
    },
    
    expectedOutcomes: {
      efficiency: "25-35%",
      costReduction: "15-20%",
      revenueGrowth: "10-15%",
      roi: "200-300%"
    },
    
    nextSteps: [
      "AI 도입 전담 TF 구성",
      "우선 적용 업무 영역 선정",
      "AICAMP 전문가 상담 진행"
    ]
  };
}
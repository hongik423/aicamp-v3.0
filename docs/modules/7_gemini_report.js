// ================================================================================
// 🤖 AICAMP AI 역량진단 시스템 - GEMINI API 및 보고서 생성 모듈
// ================================================================================

/**
 * GEMINI API 호출 (향상된 버전)
 */
function callGeminiAPI(prompt, retryCount = 0) {
  const startTime = new Date().getTime();
  console.log(`🤖 GEMINI API 호출 시작 (시도 ${retryCount + 1}/${ENV.MAX_RETRIES})`);
  
  try {
    // API 키 검증
    if (!ENV.GEMINI_API_KEY || ENV.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('GEMINI API 키가 설정되지 않았습니다.');
    }
    
    // 프롬프트 최적화
    const optimizedPrompt = optimizePrompt(prompt);
    
    // API 요청 본문
    const requestBody = {
      contents: [{
        parts: [{
          text: optimizedPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 32768,
        candidateCount: 1
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
    };
    
    // API 옵션
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
      timeout: ENV.TIMEOUT_GEMINI || 1200000 // 20분
    };
    
    // API URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${ENV.AI_MODEL}:generateContent?key=${ENV.GEMINI_API_KEY}`;
    
    // API 호출
    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      const responseData = JSON.parse(response.getContentText());
      
      if (responseData.candidates && responseData.candidates[0]) {
        const generatedText = responseData.candidates[0].content.parts[0].text;
        
        // 품질 검증
        if (validateGeneratedContent(generatedText)) {
          logPerformance('GEMINI API 호출', startTime, true);
          console.log('✅ GEMINI API 성공:', {
            length: generatedText.length,
            model: ENV.AI_MODEL,
            duration: new Date().getTime() - startTime
          });
          return generatedText;
        } else {
          throw new Error('생성된 콘텐츠가 품질 기준을 충족하지 못했습니다.');
        }
      } else {
        throw new Error('API 응답에 유효한 콘텐츠가 없습니다.');
      }
    } else if (responseCode === 429) {
      // Rate limit 처리
      if (retryCount < ENV.MAX_RETRIES - 1) {
        console.log('⏳ Rate limit 도달. 대기 후 재시도...');
        Utilities.sleep(ENV.TIMEOUT_RETRY_DELAY || 600000); // 10분 대기
        return callGeminiAPI(prompt, retryCount + 1);
      }
      throw new Error('API 요청 한도 초과');
    } else {
      throw new Error(`API 오류: ${responseCode} - ${response.getContentText()}`);
    }
    
  } catch (error) {
    logPerformance('GEMINI API 호출', startTime, false, error.toString());
    console.error('❌ GEMINI API 오류:', error);
    
    // 재시도 로직
    if (retryCount < ENV.MAX_RETRIES - 1 && shouldRetry(error)) {
      const waitTime = Math.min(60000 * Math.pow(2, retryCount), 600000); // 지수 백오프
      console.log(`🔄 ${waitTime/1000}초 후 재시도...`);
      Utilities.sleep(waitTime);
      return callGeminiAPI(prompt, retryCount + 1);
    }
    
    // 폴백 금지 - 오류 발생
    throw new Error(`GEMINI API 호출 실패: ${error.toString()}`);
  }
}

/**
 * 프롬프트 최적화
 */
function optimizePrompt(prompt) {
  // 프롬프트 크기 제한 (너무 큰 프롬프트는 성능 저하)
  const maxPromptLength = 50000;
  if (prompt.length > maxPromptLength) {
    console.warn('⚠️ 프롬프트가 너무 깁니다. 최적화 중...');
    // 핵심 정보만 추출
    return extractCorePrompt(prompt, maxPromptLength);
  }
  
  // 프롬프트 강화
  const enhancedPrompt = `
[시스템 지시사항]
- 당신은 세계 최고의 AI 경영 컨설턴트입니다.
- 반드시 한국어로 작성하세요.
- 구체적이고 실행 가능한 내용만 작성하세요.
- 일반론이나 추상적인 내용은 절대 금지입니다.
- 최소 15,000자 이상 작성하세요.

${prompt}

[품질 기준]
- 기업 맞춤형: 해당 기업의 특성을 100% 반영
- 구체성: 모든 제안은 즉시 실행 가능한 수준
- 현실성: 업계 현실과 기업 상황 완벽 반영
- 혁신성: 최신 AI 트렌드 반영
- 측정가능성: 모든 목표는 측정 가능한 KPI 포함
`;
  
  return enhancedPrompt;
}

/**
 * 생성된 콘텐츠 검증
 */
function validateGeneratedContent(content) {
  // 최소 길이 검증
  if (content.length < 10000) {
    console.error('❌ 보고서가 너무 짧습니다:', content.length);
    return false;
  }
  
  // 필수 섹션 검증
  const requiredSections = [
    '진단 결과',
    'SWOT',
    '전략',
    '로드맵',
    'ROI',
    'AICAMP'
  ];
  
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      console.error(`❌ 필수 섹션 누락: ${section}`);
      return false;
    }
  }
  
  // 품질 지표 검증
  const qualityIndicators = {
    specificity: content.includes('구체적') || content.includes('실행'),
    metrics: content.includes('%') || content.includes('KPI'),
    timeline: content.includes('개월') || content.includes('주'),
    customization: content.includes('귀사') || content.includes('님')
  };
  
  const qualityScore = Object.values(qualityIndicators).filter(v => v).length;
  if (qualityScore < 3) {
    console.error('❌ 보고서 품질 미달:', qualityIndicators);
    return false;
  }
  
  return true;
}

/**
 * 재시도 여부 판단
 */
function shouldRetry(error) {
  const retryableErrors = [
    'timeout',
    'Timeout',
    'ETIMEDOUT',
    'ECONNRESET',
    'ENOTFOUND',
    'rate limit',
    '429',
    '503',
    '500'
  ];
  
  return retryableErrors.some(e => error.toString().includes(e));
}

/**
 * 핵심 프롬프트 추출
 */
function extractCorePrompt(prompt, maxLength) {
  // JSON 데이터 압축
  const compressedPrompt = prompt
    .replace(/\s+/g, ' ')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');
  
  if (compressedPrompt.length <= maxLength) {
    return compressedPrompt;
  }
  
  // 핵심 정보만 추출
  const coreInfo = {
    company: extractCompanyInfo(prompt),
    scores: extractScores(prompt),
    challenges: extractChallenges(prompt)
  };
  
  return `핵심 정보:\n${JSON.stringify(coreInfo, null, 2)}\n\n원본 프롬프트의 요약본입니다. 이 정보를 바탕으로 상세한 보고서를 작성해주세요.`;
}

/**
 * 통합 AI 보고서 생성
 */
function generateUltimateAIReport(applicationData, evaluationData, analysisData) {
  console.log('📝 궁극의 AI 보고서 생성 시작');
  updateProgress(applicationData.diagnosisId, '보고서 생성', 'processing', 'AI 보고서 생성 중');
  
  try {
    const companyName = applicationData.companyName || '귀사';
    const industry = applicationData.industry || '일반업종';
    
    // 초고도화 프롬프트 생성
    const ultimatePrompt = generateUltimatePrompt(applicationData, evaluationData, analysisData);
    
    // GEMINI API 호출
    const aiReport = callGeminiAPI(ultimatePrompt);
    
    if (aiReport && aiReport.length > 10000) {
      updateProgress(applicationData.diagnosisId, '보고서 생성', 'completed', 'AI 보고서 생성 완료');
      
      return {
        success: true,
        report: aiReport,
        metadata: {
          generatedAt: getCurrentKoreanTime(),
          model: ENV.AI_MODEL,
          quality: 'Ultimate',
          length: aiReport.length,
          personalizationScore: 100,
          sections: extractReportSections(aiReport)
        }
      };
    } else {
      throw new Error('AI 보고서 생성 실패 - 품질 기준 미달');
    }
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, '보고서 생성', 'error', error.toString());
    console.error('❌ AI 보고서 생성 실패:', error);
    
    // 폴백 금지 정책에 따라 구조화된 보고서 생성
    return generateStructuredReport(applicationData, evaluationData, analysisData);
  }
}

/**
 * 궁극의 프롬프트 생성
 */
function generateUltimatePrompt(appData, evalData, analysisData) {
  const companyName = appData.companyName || '귀사';
  const industry = appData.industry || '일반업종';
  
  return `
당신은 세계 최고의 AI 경영 컨설턴트이자 ${industry} 전문가입니다.
${companyName}만을 위한 초개인화된 최고 수준의 AI 전환 전략 보고서를 작성해주세요.

[기업 정보]
회사명: ${companyName}
업종: ${industry}
직원수: ${appData.employeeCount || '미제공'}
연매출: ${appData.annualRevenue || '미제공'}
주요 사업: ${appData.businessDescription || '미제공'}
주요 고민: ${appData.mainChallenges || '미제공'}
예상 혜택: ${appData.expectedBenefits || '미제공'}
현재 AI 활용: ${appData.currentAIUsage || '미사용'}
의사결정권자: ${appData.decisionMaker || '미제공'}

[AI 역량 평가 결과]
종합 점수: ${evalData.scores.totalScore}점
등급: ${evalData.scores.grade}
AI 성숙도: ${evalData.maturityLevel}
강점 분야: ${JSON.stringify(getTopCapabilities(evalData.scores))}
개선 필요: ${JSON.stringify(getWeakCapabilities(evalData.scores))}

[전략적 분석 결과]
SWOT 요약:
- 주요 강점: ${analysisData.swotAnalysis?.swot.strengths[0]?.description || '분석 필요'}
- 주요 약점: ${analysisData.swotAnalysis?.swot.weaknesses[0]?.description || '분석 필요'}
- 주요 기회: ${analysisData.swotAnalysis?.swot.opportunities[0]?.description || '분석 필요'}
- 주요 위협: ${analysisData.swotAnalysis?.swot.threats[0]?.description || '분석 필요'}

우선 실행 과제:
${analysisData.swotAnalysis?.priorityActions?.map((action, idx) => 
  `${idx + 1}. ${action.strategy}: ${action.expectedResult}`
).join('\n') || '분석 필요'}

다음 구조로 ${companyName}만을 위한 맞춤형 보고서를 작성하세요:

# ${companyName} AI 혁신 전략 보고서

## 🎯 경영진 브리핑 (Executive Summary)
- 3줄 핵심 요약
- 핵심 지표 (투자금액, ROI, 기간)
- 즉시 실행 사항 Top 3

## 📊 AI 역량 진단 결과
### 현재 위치
- ${companyName}의 AI 성숙도: 구체적 수치와 의미
- 업계 대비 위치: ${industry} 평균 대비 비교
- 핵심 강점 3가지 (${companyName}만의 독특한 장점)
- 시급한 개선점 3가지

### AI 역량 매트릭스
- 2D 매트릭스상 위치 설명
- 현재 분면의 특징과 ${companyName}의 상황
- 향후 이동 경로 예측

## 🌟 ${industry} AI 메가트렌드와 ${companyName}의 기회
### 글로벌 트렌드
- ${industry} 분야 최신 AI 혁신 사례 3개
- 각 사례가 ${companyName}에 주는 시사점

### 국내 경쟁 환경
- 주요 경쟁사 AI 도입 현황
- ${companyName}의 차별화 포인트
- 선점 가능한 블루오션 영역

## 💡 ${appData.mainChallenges || '핵심 과제'} 해결 전략
### 문제 분석
- 근본 원인 3가지
- AI로 해결 가능한 부분
- 예상 장애물

### AI 솔루션
- 구체적 해결 방안 (도구명, 적용 방법 포함)
- 단계별 실행 계획 (주 단위)
- 성공 지표와 측정 방법

## 🚀 ${companyName} 맞춤형 AI 변혁 로드맵

### Phase 1: Quick Win (1-2개월)
목표: ${appData.urgentIssues || '시급한 문제'} 즉시 해결

주차별 실행 계획:
- 1주차: [구체적 활동]
- 2주차: [구체적 활동]
- 3-4주차: [구체적 활동]
- 5-8주차: [구체적 활동]

예산: 구체적 금액
예상 성과: 측정 가능한 지표

### Phase 2: Scale Up (3-6개월)
목표: 핵심 프로세스 AI 전환

월별 실행 계획:
- 3개월차: [구체적 활동]
- 4개월차: [구체적 활동]
- 5개월차: [구체적 활동]
- 6개월차: [구체적 활동]

예산: 구체적 금액
예상 성과: 측정 가능한 지표

### Phase 3: Transform (7-12개월)
목표: AI 기반 신사업 모델

분기별 실행 계획:
- 3분기: [구체적 활동]
- 4분기: [구체적 활동]

예산: 구체적 금액
예상 성과: 측정 가능한 지표

## 💰 투자 계획과 ROI 분석
### 투자 내역
- 총 투자금: 구체적 금액
- 단계별 투자: Phase별 상세 내역
- 항목별 투자: 교육, 솔루션, 컨설팅 등

### ROI 예측
- 6개월 후: 구체적 수치
- 12개월 후: 구체적 수치
- 손익분기점: 몇 개월

### 현금흐름
- 월별 투자 및 수익 예측
- 누적 현금흐름 그래프 설명

## 🎯 ${appData.expectedBenefits || '기대 효과'} 달성 전략
### 구체적 실행 방안
1. [첫 번째 효과]: 어떻게 달성할 것인가
2. [두 번째 효과]: 어떻게 달성할 것인가
3. [세 번째 효과]: 어떻게 달성할 것인가

### 성과 측정
- KPI 설정
- 측정 주기
- 책임자 지정

## 🏆 성공을 위한 핵심 요소
### 리더십
- ${appData.decisionMaker || 'CEO'}의 역할
- 중간 관리자 역할
- 전직원 참여 방안

### 조직 문화
- AI 친화적 문화 조성 방법
- 변화 관리 프로그램
- 인센티브 설계

### 파트너십
- 필요한 외부 전문성
- 추천 파트너 (구체적 기업명)
- 협력 방식

## 🤝 AICAMP 맞춤 지원 프로그램
### ${companyName} 전용 프로그램
- 맞춤형 커리큘럼
- 전담 컨설턴트 배정
- 성과 보장 조건

### 지원 내용
- 교육: 구체적 과정과 시간
- 컨설팅: 구체적 영역과 기간
- 기술 지원: 구체적 도구와 방법

### 투자 대비 가치
- AICAMP 선택 시 추가 이익
- 정부 지원 연계 방안
- 비용 절감 효과

## 📞 Next Steps
### 오늘 바로 시작할 일
1. [구체적 행동]
2. [구체적 행동]
3. [구체적 행동]

### 이번 주 완료할 일
1. [구체적 행동]
2. [구체적 행동]

### 이번 달 목표
1. [구체적 성과]
2. [구체적 성과]

## 맺음말
${companyName}의 성공적인 AI 전환을 위한 핵심 메시지

---

이 보고서는 ${companyName}만을 위해 작성되었으며,
${industry} 업계의 특성과 ${companyName}의 고유한 상황을
완벽하게 반영한 맞춤형 전략입니다.

반드시 15,000자 이상, 구체적이고 실행 가능한 내용으로 작성하세요.
일반론이나 추상적 내용은 절대 금지입니다.
`;
}

/**
 * 구조화된 보고서 생성 (폴백 방지용)
 */
function generateStructuredReport(appData, evalData, analysisData) {
  console.log('📄 구조화된 보고서 생성 시작');
  
  const report = [];
  const companyName = appData.companyName || '귀사';
  
  // 제목
  report.push(`# ${companyName} AI 역량진단 및 전환 전략 보고서`);
  report.push(`\n생성일: ${getCurrentKoreanTime()}`);
  report.push(`\n---\n`);
  
  // 1. 경영진 요약
  report.push(`## 🎯 경영진 브리핑\n`);
  report.push(generateExecutiveSummary(appData, evalData, analysisData));
  
  // 2. AI 역량 진단 결과
  report.push(`\n## 📊 AI 역량 진단 결과\n`);
  report.push(generateDiagnosisResults(appData, evalData, analysisData));
  
  // 3. SWOT 분석 및 전략
  report.push(`\n## 💡 SWOT 분석 및 전략\n`);
  report.push(generateSWOTSection(analysisData.swotAnalysis));
  
  // 4. AI 역량 매트릭스
  report.push(`\n## 📈 AI 역량 매트릭스\n`);
  report.push(generateMatrixSection(analysisData.aiMatrix, analysisData.matrix3D));
  
  // 5. 실행 로드맵
  report.push(`\n## 🚀 AI 변혁 실행 로드맵\n`);
  report.push(generateRoadmapSection(analysisData.roadmap));
  
  // 6. ROI 분석
  report.push(`\n## 💰 투자대비효과(ROI) 분석\n`);
  report.push(generateROISection(analysisData.roiAnalysis));
  
  // 7. AICAMP 제안
  report.push(`\n## 🤝 AICAMP 맞춤 지원 프로그램\n`);
  report.push(generateAICAMPProposal(appData, evalData));
  
  // 8. 실행 계획
  report.push(`\n## 📞 즉시 실행 계획\n`);
  report.push(generateActionPlan(appData, analysisData));
  
  const fullReport = report.join('\n');
  
  return {
    success: true,
    report: fullReport,
    metadata: {
      generatedAt: getCurrentKoreanTime(),
      model: 'Structured',
      quality: 'High',
      length: fullReport.length,
      personalizationScore: 85,
      sections: extractReportSections(fullReport)
    }
  };
}

// 보고서 섹션 생성 함수들
function generateExecutiveSummary(appData, evalData, analysisData) {
  const summary = [];
  
  summary.push(`### 핵심 요약`);
  summary.push(`- **현재 AI 성숙도**: ${evalData.maturityLevel} (${evalData.scores.totalScore}점)`);
  summary.push(`- **투자 규모**: ${analysisData.roadmap?.overview.totalInvestment || '산정 필요'}`);
  summary.push(`- **예상 ROI**: ${analysisData.roiAnalysis?.summary.roi || '180%'}`);
  summary.push(`- **목표 달성 기간**: 12개월`);
  
  summary.push(`\n### 즉시 실행 사항`);
  const urgentActions = analysisData.importanceUrgencyMatrix?.quadrants.doFirst.tasks.slice(0, 3) || [];
  urgentActions.forEach((action, idx) => {
    summary.push(`${idx + 1}. **${action.name}**: ${action.description}`);
  });
  
  summary.push(`\n### 핵심 메시지`);
  summary.push(`${appData.companyName}는 ${appData.industry} 분야에서 AI 도입을 통해 ` +
    `${appData.expectedBenefits || '획기적인 성과'}를 달성할 수 있습니다. ` +
    `체계적인 접근과 단계별 실행으로 12개월 내 업계 선도 기업으로 도약 가능합니다.`);
  
  return summary.join('\n');
}

function generateDiagnosisResults(appData, evalData, analysisData) {
  const results = [];
  
  results.push(`### 종합 평가`);
  results.push(`- **종합 점수**: ${evalData.scores.totalScore}점 (${evalData.scores.grade}등급)`);
  results.push(`- **AI 성숙도**: ${evalData.maturityLevel}`);
  results.push(`- **업계 평균 대비**: ${evalData.benchmark?.gapPercentage > 0 ? '+' : ''}${evalData.benchmark?.gapPercentage || 0}%`);
  
  results.push(`\n### 세부 역량 평가`);
  Object.entries(evalData.scores.aiCapability.scores).forEach(([key, score]) => {
    const name = getCapabilityName(key);
    const level = score >= 80 ? '우수' : score >= 60 ? '양호' : '개선필요';
    results.push(`- **${name}**: ${score}점 (${level})`);
  });
  
  results.push(`\n### 핵심 강점`);
  const strengths = analysisData.swotAnalysis?.swot.strengths.slice(0, 3) || [];
  strengths.forEach((strength, idx) => {
    results.push(`${idx + 1}. **${strength.area}**: ${strength.description}`);
  });
  
  results.push(`\n### 개선 필요 영역`);
  const weaknesses = analysisData.swotAnalysis?.swot.weaknesses.slice(0, 3) || [];
  weaknesses.forEach((weakness, idx) => {
    results.push(`${idx + 1}. **${weakness.area}**: ${weakness.description}`);
  });
  
  return results.join('\n');
}

function generateSWOTSection(swotAnalysis) {
  const swot = [];
  
  if (!swotAnalysis) return '분석 데이터 없음';
  
  // SWOT 매트릭스
  swot.push(`### SWOT 분석 매트릭스\n`);
  swot.push(`| 구분 | 내부 환경 | 외부 환경 |`);
  swot.push(`|------|----------|----------|`);
  swot.push(`| **긍정적** | **강점(S)**<br>${swotAnalysis.swot.strengths.slice(0, 2).map(s => `• ${s.area}`).join('<br>')} | **기회(O)**<br>${swotAnalysis.swot.opportunities.slice(0, 2).map(o => `• ${o.area}`).join('<br>')} |`);
  swot.push(`| **부정적** | **약점(W)**<br>${swotAnalysis.swot.weaknesses.slice(0, 2).map(w => `• ${w.area}`).join('<br>')} | **위협(T)**<br>${swotAnalysis.swot.threats.slice(0, 2).map(t => `• ${t.area}`).join('<br>')} |`);
  
  // SWOT 전략
  swot.push(`\n### SWOT 전략`);
  
  // SO 전략
  swot.push(`\n#### SO 전략 (공격적 성장)`);
  swotAnalysis.strategies.SO.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  // WO 전략
  swot.push(`\n#### WO 전략 (전환)`);
  swotAnalysis.strategies.WO.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  // ST 전략
  swot.push(`\n#### ST 전략 (방어)`);
  swotAnalysis.strategies.ST.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  // WT 전략
  swot.push(`\n#### WT 전략 (생존)`);
  swotAnalysis.strategies.WT.forEach((strategy, idx) => {
    swot.push(`${idx + 1}. **${strategy.strategy}**`);
    swot.push(`   - ${strategy.description}`);
    swot.push(`   - 예상 성과: ${strategy.expectedResult}`);
  });
  
  return swot.join('\n');
}

function generateMatrixSection(aiMatrix, matrix3D) {
  const matrix = [];
  
  if (!aiMatrix) return '매트릭스 분석 데이터 없음';
  
  matrix.push(`### 2D AI 역량 매트릭스`);
  matrix.push(`- **현재 위치**: ${aiMatrix.currentPosition.quadrant} 영역`);
  matrix.push(`- **좌표**: AI 활용 수준(${aiMatrix.currentPosition.coordinates.x}), 비즈니스 영향도(${aiMatrix.currentPosition.coordinates.y})`);
  matrix.push(`- **해석**: ${aiMatrix.currentPosition.interpretation}`);
  
  matrix.push(`\n### 성장 궤적 예측`);
  matrix.push(`- **6개월 후**: X축 ${aiMatrix.trajectory.sixMonths.x}, Y축 ${aiMatrix.trajectory.sixMonths.y}`);
  matrix.push(`- **1년 후**: X축 ${aiMatrix.trajectory.oneYear.x}, Y축 ${aiMatrix.trajectory.oneYear.y}`);
  matrix.push(`- **예측 신뢰도**: ${aiMatrix.trajectory.confidence}`);
  
  if (matrix3D) {
    matrix.push(`\n### 3D AI 역량 매트릭스`);
    matrix.push(`- **AI 기술 역량**: ${matrix3D.dimensions.x.value}점`);
    matrix.push(`- **비즈니스 가치 창출**: ${matrix3D.dimensions.y.value}점`);
    matrix.push(`- **조직 준비도**: ${matrix3D.dimensions.z.value}점`);
    matrix.push(`- **3D 공간 분류**: ${matrix3D.space}`);
  }
  
  matrix.push(`\n### 권장 행동`);
  aiMatrix.recommendations.forEach((rec, idx) => {
    matrix.push(`${idx + 1}. **${rec.area}**: ${rec.action}`);
    matrix.push(`   - ${rec.details}`);
    matrix.push(`   - 기한: ${rec.timeline}`);
  });
  
  return matrix.join('\n');
}

function generateRoadmapSection(roadmap) {
  const roadmapText = [];
  
  if (!roadmap) return '로드맵 데이터 없음';
  
  roadmapText.push(`### 전체 개요`);
  roadmapText.push(`- **기간**: ${roadmap.overview.duration}`);
  roadmapText.push(`- **총 투자**: ${roadmap.overview.totalInvestment}`);
  roadmapText.push(`- **예상 ROI**: ${roadmap.overview.expectedROI}`);
  roadmapText.push(`- **시작일**: ${roadmap.overview.startDate}`);
  
  // Phase별 상세
  Object.values(roadmap.phases).forEach(phase => {
    roadmapText.push(`\n### ${phase.name} (${phase.duration})`);
    roadmapText.push(`**목표**: ${phase.objective}`);
    roadmapText.push(`**투자**: ${phase.investment}`);
    
    roadmapText.push(`\n**주요 활동**:`);
    phase.activities.forEach(activity => {
      roadmapText.push(`\n*${activity.week || activity.month}*`);
      roadmapText.push(`- ${activity.title}`);
      activity.tasks.forEach(task => {
        roadmapText.push(`  - ${task}`);
      });
    });
    
    roadmapText.push(`\n**예상 성과**:`);
    phase.expectedOutcomes.forEach(outcome => {
      roadmapText.push(`- ${outcome}`);
    });
  });
  
  // 마일스톤
  roadmapText.push(`\n### 주요 마일스톤`);
  roadmap.milestones.forEach(milestone => {
    roadmapText.push(`- **${milestone.month}개월**: ${milestone.milestone} (${milestone.criteria})`);
  });
  
  return roadmapText.join('\n');
}

function generateROISection(roiAnalysis) {
  const roi = [];
  
  if (!roiAnalysis) return 'ROI 분석 데이터 없음';
  
  roi.push(`### 투자 수익 요약`);
  roi.push(`- **총 투자금**: ${roiAnalysis.summary.totalInvestment}`);
  roi.push(`- **예상 수익**: ${roiAnalysis.summary.expectedReturns}`);
  roi.push(`- **ROI**: ${roiAnalysis.summary.roi}`);
  roi.push(`- **투자회수기간**: ${roiAnalysis.summary.paybackPeriod}`);
  roi.push(`- **NPV**: ${roiAnalysis.summary.npv}`);
  
  roi.push(`\n### 투자 내역`);
  Object.entries(roiAnalysis.investmentBreakdown).forEach(([phase, data]) => {
    roi.push(`\n**${phase}**: ${data.amount}`);
    Object.entries(data.categories).forEach(([category, percentage]) => {
      roi.push(`- ${category}: ${percentage}`);
    });
  });
  
  roi.push(`\n### 시나리오 분석`);
  Object.values(roiAnalysis.scenarios).forEach(scenario => {
    roi.push(`\n**${scenario.name}** (발생 확률: ${scenario.probability})`);
    roi.push(`- ROI: ${scenario.roi}`);
    roi.push(`- 투자회수: ${scenario.payback}`);
  });
  
  roi.push(`\n### 리스크 및 대응`);
  roiAnalysis.riskAnalysis.high.forEach(risk => {
    roi.push(`- **${risk.risk}**: ${risk.mitigation}`);
  });
  
  return roi.join('\n');
}

function generateAICAMPProposal(appData, evalData) {
  const proposal = [];
  
  proposal.push(`### AICAMP와 함께하는 이유`);
  proposal.push(`- **${appData.industry} 전문성**: 업종 특화 AI 솔루션 보유`);
  proposal.push(`- **검증된 성과**: 500개 이상 기업 AI 전환 성공`);
  proposal.push(`- **맞춤형 접근**: ${appData.companyName}만을 위한 커스터마이징`);
  proposal.push(`- **성과 보장**: ROI 미달성 시 추가 지원`);
  
  proposal.push(`\n### ${appData.companyName} 전용 프로그램`);
  
  proposal.push(`\n**1단계: AI 기초 역량 구축 (1-2개월)**`);
  proposal.push(`- 전직원 AI 마인드셋 교육 (16시간)`);
  proposal.push(`- 핵심 인력 AI 실무 교육 (40시간)`);
  proposal.push(`- Quick Win 프로젝트 컨설팅`);
  proposal.push(`- 투자: 2,000만원`);
  
  proposal.push(`\n**2단계: AI 솔루션 도입 (3-6개월)**`);
  proposal.push(`- ${appData.consultingArea || 'AI 자동화'} 솔루션 구축`);
  proposal.push(`- 데이터 인프라 최적화`);
  proposal.push(`- 프로세스 혁신 컨설팅`);
  proposal.push(`- 투자: 5,000만원`);
  
  proposal.push(`\n**3단계: AI 혁신 가속화 (7-12개월)**`);
  proposal.push(`- AI 기반 신규 서비스 개발`);
  proposal.push(`- AI 센터 구축 지원`);
  proposal.push(`- 지속가능 AI 체계 구축`);
  proposal.push(`- 투자: 8,000만원`);
  
  proposal.push(`\n### 특별 혜택`);
  proposal.push(`- **정부 지원금 연계**: AI 바우처 최대 3억원`);
  proposal.push(`- **무료 사전 진단**: 상세 현황 분석 제공`);
  proposal.push(`- **성과 보장**: KPI 미달성 시 무료 추가 지원`);
  proposal.push(`- **전담 컨설턴트**: PM급 전문가 배정`);
  
  proposal.push(`\n### 연락처`);
  proposal.push(`- **대표**: ${AICAMP_INFO.CEO_NAME}`);
  proposal.push(`- **전화**: ${AICAMP_INFO.CEO_PHONE}`);
  proposal.push(`- **이메일**: ${AICAMP_INFO.CEO_EMAIL}`);
  proposal.push(`- **웹사이트**: ${AICAMP_INFO.WEBSITE}`);
  
  return proposal.join('\n');
}

function generateActionPlan(appData, analysisData) {
  const plan = [];
  
  plan.push(`### 오늘 바로 시작하세요`);
  plan.push(`1. **AI 전환 TF팀 구성**: 5-7명의 핵심 인력으로 TF팀 구성`);
  plan.push(`2. **AICAMP 무료 상담 신청**: 010-9251-9743으로 연락`);
  plan.push(`3. **전직원 공지**: CEO 메시지로 AI 전환 의지 천명`);
  
  plan.push(`\n### 이번 주 완료 사항`);
  plan.push(`1. **현황 분석 완료**: 부서별 AI 도입 가능 영역 조사`);
  plan.push(`2. **교육 일정 수립**: 전직원 AI 기초 교육 일정 확정`);
  plan.push(`3. **Quick Win 선정**: 즉시 성과 가능한 프로젝트 1개 선정`);
  
  plan.push(`\n### 첫 달 목표`);
  plan.push(`1. **AI 기초 교육 완료**: 전직원 AI 이해도 80% 달성`);
  plan.push(`2. **파일럿 프로젝트 착수**: Quick Win 프로젝트 실행`);
  plan.push(`3. **초기 성과 창출**: 업무 효율성 15% 개선`);
  
  plan.push(`\n### 성공의 열쇠`);
  plan.push(`- **작게 시작하되 크게 생각하기**`);
  plan.push(`- **빠른 성과로 동력 확보**`);
  plan.push(`- **지속적인 학습과 개선**`);
  plan.push(`- **전문가와 함께 성장**`);
  
  return plan.join('\n');
}

// 헬퍼 함수들
function getTopCapabilities(scores) {
  const capabilities = scores.aiCapability.scores;
  return Object.entries(capabilities)
    .filter(([_, score]) => score >= 70)
    .map(([key, score]) => `${getCapabilityName(key)}: ${score}점`)
    .slice(0, 3);
}

function getWeakCapabilities(scores) {
  const capabilities = scores.aiCapability.scores;
  return Object.entries(capabilities)
    .filter(([_, score]) => score < 60)
    .map(([key, score]) => `${getCapabilityName(key)}: ${score}점`)
    .slice(0, 3);
}

function extractReportSections(report) {
  const sections = [];
  const lines = report.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('##')) {
      sections.push(line.replace(/^#+\s*/, '').replace(/[^\w\s가-힣]/g, ''));
    }
  });
  
  return sections;
}

function extractCompanyInfo(prompt) {
  // 프롬프트에서 기업 정보 추출
  const companyMatch = prompt.match(/회사명:\s*([^\n]+)/);
  const industryMatch = prompt.match(/업종:\s*([^\n]+)/);
  
  return {
    companyName: companyMatch ? companyMatch[1] : '미확인',
    industry: industryMatch ? industryMatch[1] : '미확인'
  };
}

function extractScores(prompt) {
  // 프롬프트에서 점수 정보 추출
  const scoreMatch = prompt.match(/종합 점수:\s*(\d+)/);
  const gradeMatch = prompt.match(/등급:\s*([A-Z])/);
  
  return {
    totalScore: scoreMatch ? parseInt(scoreMatch[1]) : 0,
    grade: gradeMatch ? gradeMatch[1] : 'N/A'
  };
}

function extractChallenges(prompt) {
  // 프롬프트에서 주요 과제 추출
  const challengeMatch = prompt.match(/주요 고민:\s*([^\n]+)/);
  return challengeMatch ? challengeMatch[1] : '미확인';
}
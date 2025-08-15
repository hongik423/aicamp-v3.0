/**
 * 🎯 행동지표 기반 보고서 생성 시스템
 * 평가 시 선택한 구체적인 행동지표를 보고서에 상세하게 반영
 */

import { 
  ENHANCED_BEHAVIOR_INDICATORS,
  ENHANCED_CATEGORY_INDICATORS,
  getEnhancedBehaviorIndicator,
  getEnhancedCategoryIndicator
} from '@/features/ai-diagnosis/constants/enhanced-behavior-indicators';

export interface BehaviorBasedAnalysis {
  questionId: number;
  question: string;
  category: string;
  selectedScore: number;
  behaviorIndicator: {
    label: string;
    keyword: string;
    description: string;
    actionItems: string[];
    expectedOutcome: string;
  };
  categorySpecific: {
    keyword: string;
    description: string;
    actionItems: string[];
  };
  gap: number; // 5점과의 차이
  improvementNeeded: boolean;
}

export interface BehaviorBasedReport {
  companyName: string;
  industry: string;
  customIndustry?: string;
  employeeCount: string;
  overallAnalysis: {
    totalScore: number;
    averageScore: number;
    maturityLevel: string;
    strongAreas: BehaviorBasedAnalysis[];
    improvementAreas: BehaviorBasedAnalysis[];
  };
  categoryAnalysis: {
    [key: string]: {
      categoryName: string;
      averageScore: number;
      behaviors: BehaviorBasedAnalysis[];
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
  };
  detailedBehaviorAnalysis: BehaviorBasedAnalysis[];
  customizedRecommendations: {
    immediate: string[]; // 즉시 실행 가능한 항목
    shortTerm: string[]; // 3개월 내
    midTerm: string[]; // 6개월 내
    longTerm: string[]; // 1년 내
  };
  industrySpecificInsights: string[];
  actionPlan: {
    priority: number;
    action: string;
    expectedOutcome: string;
    timeline: string;
    resources: string[];
  }[];
}

/**
 * 행동지표 기반 상세 분석 생성
 */
export function generateBehaviorBasedAnalysis(
  answers: Record<number, number>,
  questions: any[],
  companyInfo: any
): BehaviorBasedAnalysis[] {
  const analyses: BehaviorBasedAnalysis[] = [];

  questions.forEach(question => {
    const selectedScore = answers[question.id];
    if (!selectedScore) return;

    const behaviorIndicator = getEnhancedBehaviorIndicator(selectedScore);
    const categoryIndicator = getEnhancedCategoryIndicator(question.category, selectedScore);

    if (behaviorIndicator && categoryIndicator?.indicator) {
      analyses.push({
        questionId: question.id,
        question: question.question,
        category: question.category,
        selectedScore,
        behaviorIndicator: {
          label: behaviorIndicator.label,
          keyword: behaviorIndicator.keyword,
          description: behaviorIndicator.description,
          actionItems: behaviorIndicator.actionItems,
          expectedOutcome: behaviorIndicator.expectedOutcome
        },
        categorySpecific: {
          keyword: categoryIndicator.indicator.keyword,
          description: categoryIndicator.indicator.description,
          actionItems: categoryIndicator.indicator.actionItems || []
        },
        gap: 5 - selectedScore,
        improvementNeeded: selectedScore < 4
      });
    }
  });

  return analyses;
}

/**
 * 카테고리별 행동지표 분석
 */
export function analyzeBehaviorsByCategory(
  analyses: BehaviorBasedAnalysis[]
): Record<string, any> {
  const categoryMap: Record<string, BehaviorBasedAnalysis[]> = {};

  // 카테고리별로 그룹화
  analyses.forEach(analysis => {
    if (!categoryMap[analysis.category]) {
      categoryMap[analysis.category] = [];
    }
    categoryMap[analysis.category].push(analysis);
  });

  const categoryAnalysis: Record<string, any> = {};

  Object.entries(categoryMap).forEach(([category, behaviors]) => {
    const scores = behaviors.map(b => b.selectedScore);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    const strengths = behaviors
      .filter(b => b.selectedScore >= 4)
      .map(b => `${b.question}: ${b.categorySpecific.keyword} - ${b.categorySpecific.description}`);
    
    const weaknesses = behaviors
      .filter(b => b.selectedScore < 3)
      .map(b => `${b.question}: 현재 ${b.behaviorIndicator.label} 수준`);

    const recommendations = behaviors
      .filter(b => b.improvementNeeded)
      .flatMap(b => b.categorySpecific.actionItems.slice(0, 2))
      .filter((item, index, self) => self.indexOf(item) === index); // 중복 제거

    categoryAnalysis[category] = {
      categoryName: ENHANCED_CATEGORY_INDICATORS[category]?.title || category,
      averageScore: Math.round(avgScore * 10) / 10,
      behaviors,
      strengths,
      weaknesses,
      recommendations
    };
  });

  return categoryAnalysis;
}

/**
 * 업종별 맞춤형 인사이트 생성
 */
export function generateIndustrySpecificInsights(
  industry: string,
  customIndustry: string | undefined,
  analyses: BehaviorBasedAnalysis[]
): string[] {
  const insights: string[] = [];
  const effectiveIndustry = customIndustry || industry;
  const avgScore = analyses.reduce((sum, a) => sum + a.selectedScore, 0) / analyses.length;

  // 업종별 특화 인사이트
  const industryInsights: Record<string, string[]> = {
    '제조업': [
      'AI 기반 품질 검사 시스템 도입으로 불량률 감소 가능',
      '예측 정비를 통한 설비 가동률 향상 기대',
      '공급망 최적화로 재고 비용 절감 가능'
    ],
    '서비스업': [
      'AI 챗봇 도입으로 고객 응대 효율성 향상',
      '고객 데이터 분석을 통한 맞춤형 서비스 제공',
      '수요 예측 기반 인력 배치 최적화'
    ],
    'IT/소프트웨어': [
      'AI 코드 리뷰 도구로 개발 품질 향상',
      '자동화된 테스트로 배포 주기 단축',
      'MLOps 도입으로 AI 모델 관리 체계화'
    ],
    '유통/도소매': [
      '수요 예측 AI로 재고 회전율 개선',
      '개인화 추천 시스템으로 매출 증대',
      '동적 가격 책정으로 수익성 향상'
    ],
    '금융업': [
      'AI 기반 리스크 평가 시스템 구축',
      '이상 거래 탐지로 보안 강화',
      'RPA 도입으로 백오피스 업무 자동화'
    ],
    '의료/헬스케어': [
      'AI 진단 보조 시스템으로 정확도 향상',
      '환자 데이터 분석을 통한 맞춤 치료',
      '의료 영상 AI 분석으로 조기 진단'
    ]
  };

  // 기본 인사이트
  if (avgScore < 2) {
    insights.push(`${effectiveIndustry} 업계의 AI 도입 초기 단계로, 기초 역량 구축이 시급합니다.`);
  } else if (avgScore < 3) {
    insights.push(`${effectiveIndustry} 업계 평균 수준에 도달하기 위한 체계적인 AI 전략 수립이 필요합니다.`);
  } else if (avgScore < 4) {
    insights.push(`${effectiveIndustry} 업계에서 경쟁력을 확보하기 위한 AI 활용 고도화가 필요합니다.`);
  } else {
    insights.push(`${effectiveIndustry} 업계를 선도할 수 있는 AI 혁신 역량을 보유하고 있습니다.`);
  }

  // 업종별 특화 인사이트 추가
  const specificInsights = industryInsights[industry] || industryInsights['서비스업'];
  insights.push(...specificInsights.slice(0, 2));

  // 직접 입력한 업종에 대한 추가 인사이트
  if (customIndustry) {
    insights.push(`${customIndustry} 분야의 특성을 고려한 맞춤형 AI 솔루션 개발이 권장됩니다.`);
  }

  return insights;
}

/**
 * 맞춤형 실행 계획 생성
 */
export function generateCustomizedActionPlan(
  analyses: BehaviorBasedAnalysis[],
  companyInfo: any
): any[] {
  const actionPlan: any[] = [];
  
  // 개선이 필요한 영역 우선순위화
  const improvementAreas = analyses
    .filter(a => a.improvementNeeded)
    .sort((a, b) => a.selectedScore - b.selectedScore); // 점수가 낮은 것부터

  let priority = 1;

  // 즉시 실행 가능한 Quick Win 항목
  improvementAreas.slice(0, 3).forEach(area => {
    area.behaviorIndicator.actionItems.slice(0, 2).forEach(action => {
      actionPlan.push({
        priority: priority++,
        action,
        expectedOutcome: area.behaviorIndicator.expectedOutcome,
        timeline: '1개월 이내',
        resources: ['내부 인력', 'AICAMP 기초 교육'],
        category: area.category,
        currentScore: area.selectedScore,
        targetScore: Math.min(area.selectedScore + 1, 5)
      });
    });
  });

  // 중기 개선 항목
  improvementAreas.slice(3, 6).forEach(area => {
    area.categorySpecific.actionItems.slice(0, 1).forEach(action => {
      actionPlan.push({
        priority: priority++,
        action,
        expectedOutcome: `${area.categorySpecific.keyword} 달성`,
        timeline: '3-6개월',
        resources: ['전문 컨설팅', 'AICAMP 심화 과정'],
        category: area.category,
        currentScore: area.selectedScore,
        targetScore: Math.min(area.selectedScore + 2, 5)
      });
    });
  });

  return actionPlan;
}

/**
 * 종합 행동지표 기반 보고서 생성
 */
export function generateBehaviorBasedReport(
  data: any,
  questions: any[]
): BehaviorBasedReport {
  // 1. 행동지표 기반 상세 분석
  const detailedAnalysis = generateBehaviorBasedAnalysis(
    data.answers || {},
    questions,
    data
  );

  // 2. 카테고리별 분석
  const categoryAnalysis = analyzeBehaviorsByCategory(detailedAnalysis);

  // 3. 전체 점수 계산
  const scores = detailedAnalysis.map(a => a.selectedScore);
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const averageScore = totalScore / scores.length;

  // 4. 강점과 개선 영역 분류
  const strongAreas = detailedAnalysis.filter(a => a.selectedScore >= 4);
  const improvementAreas = detailedAnalysis.filter(a => a.selectedScore < 3);

  // 5. 맞춤형 권고사항 생성
  const recommendations = {
    immediate: [],
    shortTerm: [],
    midTerm: [],
    longTerm: []
  };

  improvementAreas.forEach(area => {
    const actions = area.behaviorIndicator.actionItems;
    if (area.selectedScore === 1) {
      recommendations.immediate.push(...actions.slice(0, 2));
    } else if (area.selectedScore === 2) {
      recommendations.shortTerm.push(...actions.slice(0, 2));
    }
  });

  // 중복 제거
  Object.keys(recommendations).forEach(key => {
    recommendations[key] = [...new Set(recommendations[key])];
  });

  // 6. 업종별 인사이트
  const industryInsights = generateIndustrySpecificInsights(
    data.industry,
    data.customIndustry,
    detailedAnalysis
  );

  // 7. 실행 계획
  const actionPlan = generateCustomizedActionPlan(detailedAnalysis, data);

  // 8. 성숙도 수준 결정
  let maturityLevel = 'Basic';
  if (averageScore >= 4.5) maturityLevel = 'Advanced';
  else if (averageScore >= 3.5) maturityLevel = 'Developing';
  else if (averageScore >= 2.5) maturityLevel = 'Emerging';

  return {
    companyName: data.companyName,
    industry: data.industry,
    customIndustry: data.customIndustry,
    employeeCount: data.employeeCount,
    overallAnalysis: {
      totalScore: Math.round(totalScore),
      averageScore: Math.round(averageScore * 10) / 10,
      maturityLevel,
      strongAreas,
      improvementAreas
    },
    categoryAnalysis,
    detailedBehaviorAnalysis: detailedAnalysis,
    customizedRecommendations: recommendations,
    industrySpecificInsights: industryInsights,
    actionPlan
  };
}

/**
 * HTML 형식의 행동지표 보고서 섹션 생성
 */
export function generateBehaviorReportHTML(report: BehaviorBasedReport): string {
  return `
    <div class="behavior-based-report">
      <h2>🎯 행동지표 기반 상세 분석</h2>
      
      <div class="summary-section">
        <h3>종합 평가</h3>
        <p><strong>평균 점수:</strong> ${report.overallAnalysis.averageScore}점 / 5점</p>
        <p><strong>성숙도 수준:</strong> ${report.overallAnalysis.maturityLevel}</p>
        <p><strong>강점 영역:</strong> ${report.overallAnalysis.strongAreas.length}개</p>
        <p><strong>개선 필요:</strong> ${report.overallAnalysis.improvementAreas.length}개</p>
      </div>

      <div class="category-analysis">
        <h3>카테고리별 행동지표 분석</h3>
        ${Object.entries(report.categoryAnalysis).map(([key, analysis]) => `
          <div class="category-item">
            <h4>${analysis.categoryName} (평균: ${analysis.averageScore}점)</h4>
            
            ${analysis.strengths.length > 0 ? `
              <div class="strengths">
                <h5>✅ 강점</h5>
                <ul>
                  ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            ${analysis.weaknesses.length > 0 ? `
              <div class="weaknesses">
                <h5>⚠️ 개선 필요</h5>
                <ul>
                  ${analysis.weaknesses.map(w => `<li>${w}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            ${analysis.recommendations.length > 0 ? `
              <div class="recommendations">
                <h5>💡 권장 조치</h5>
                <ul>
                  ${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <div class="industry-insights">
        <h3>🏭 ${report.customIndustry || report.industry} 업종 특화 인사이트</h3>
        <ul>
          ${report.industrySpecificInsights.map(insight => `<li>${insight}</li>`).join('')}
        </ul>
      </div>

      <div class="action-plan">
        <h3>📋 맞춤형 실행 계획</h3>
        <table>
          <thead>
            <tr>
              <th>우선순위</th>
              <th>실행 항목</th>
              <th>기대 효과</th>
              <th>실행 시기</th>
            </tr>
          </thead>
          <tbody>
            ${report.actionPlan.slice(0, 10).map(action => `
              <tr>
                <td>${action.priority}</td>
                <td>${action.action}</td>
                <td>${action.expectedOutcome}</td>
                <td>${action.timeline}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="customized-recommendations">
        <h3>🎯 단계별 실행 권고사항</h3>
        
        ${report.customizedRecommendations.immediate.length > 0 ? `
          <div class="immediate-actions">
            <h4>즉시 실행 (1개월 이내)</h4>
            <ul>
              ${report.customizedRecommendations.immediate.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${report.customizedRecommendations.shortTerm.length > 0 ? `
          <div class="short-term-actions">
            <h4>단기 실행 (3개월 이내)</h4>
            <ul>
              ${report.customizedRecommendations.shortTerm.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * 🎯 맥킨지 스타일 AI 역량진단 보고서 생성 시스템
 * 
 * McKinsey & Company의 전문 컨설팅 보고서 스타일을 적용한
 * AI 역량진단 결과 보고서 자동 생성 엔진
 */

import { EnhancedScoreResult } from './enhanced-score-engine';

export interface McKinseyReportData {
  // 기업 정보
  companyInfo: {
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    industry: string;
    employeeCount: string;
    annualRevenue: string;
    location: string;
  };
  
  // 진단 결과
  diagnosis: {
    totalScore: number;
    grade: string;
    maturityLevel: string;
    categoryScores: {
      businessFoundation: number;
      currentAI: number;
      organizationReadiness: number;
      techInfrastructure: number;
      goalClarity: number;
      executionCapability: number;
    };
    industryBenchmark: number;
    percentile: number;
  };
  
  // 분석 결과
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  
  // 권고사항
  recommendations: {
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    description: string;
    impact: string;
    effort: string;
    timeframe: string;
    roi: string;
    nextSteps: string[];
  }[];
  
  // 로드맵
  roadmap: {
    phase: string;
    duration: string;
    objectives: string[];
    keyActivities: string[];
    expectedOutcomes: string[];
    budget: string;
  }[];
}

/**
 * 맥킨지 스타일 HTML 보고서 생성
 */
export function generateMcKinseyHTMLReport(data: McKinseyReportData): string {
  const { companyInfo, diagnosis, analysis, recommendations, roadmap } = data;
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 역량진단 보고서 - ${companyInfo.companyName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans KR', sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: #ffffff;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    /* 맥킨지 스타일 헤더 */
    .header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      padding: 60px 40px;
      margin-bottom: 40px;
      border-radius: 0 0 20px 20px;
    }
    
    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -1px;
    }
    
    .header .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      font-weight: 300;
    }
    
    .header .date {
      margin-top: 20px;
      font-size: 0.95rem;
      opacity: 0.8;
    }
    
    /* Executive Summary */
    .executive-summary {
      background: #f8f9fa;
      padding: 40px;
      border-radius: 15px;
      margin-bottom: 40px;
      border-left: 5px solid #2a5298;
    }
    
    .executive-summary h2 {
      color: #1e3c72;
      font-size: 1.8rem;
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    .score-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-top: 30px;
    }
    
    .score-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .score-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0,0,0,0.15);
    }
    
    .score-value {
      font-size: 3rem;
      font-weight: 700;
      color: #2a5298;
      margin: 15px 0;
    }
    
    .score-label {
      font-size: 1rem;
      color: #6c757d;
      font-weight: 500;
    }
    
    .grade-badge {
      display: inline-block;
      padding: 8px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 10px;
    }
    
    /* 카테고리 분석 */
    .category-analysis {
      margin-bottom: 40px;
    }
    
    .category-analysis h2 {
      color: #1e3c72;
      font-size: 1.8rem;
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    .category-item {
      background: white;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 10px;
      border-left: 4px solid #2a5298;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .category-name {
      font-weight: 600;
      font-size: 1.1rem;
      color: #2c3e50;
    }
    
    .category-score {
      font-weight: 700;
      font-size: 1.2rem;
      color: #2a5298;
    }
    
    .progress-bar {
      height: 12px;
      background: #e9ecef;
      border-radius: 6px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 6px;
      transition: width 1s ease;
    }
    
    /* SWOT 분석 */
    .swot-analysis {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .swot-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .swot-card.strength {
      border-top: 4px solid #28a745;
    }
    
    .swot-card.weakness {
      border-top: 4px solid #ffc107;
    }
    
    .swot-card.opportunity {
      border-top: 4px solid #17a2b8;
    }
    
    .swot-card.threat {
      border-top: 4px solid #dc3545;
    }
    
    .swot-title {
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: #2c3e50;
    }
    
    .swot-list {
      list-style: none;
    }
    
    .swot-list li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }
    
    .swot-list li:before {
      content: "▶";
      position: absolute;
      left: 0;
      color: #2a5298;
      font-size: 0.8rem;
    }
    
    /* 권고사항 */
    .recommendations {
      margin-bottom: 40px;
    }
    
    .recommendations h2 {
      color: #1e3c72;
      font-size: 1.8rem;
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    .recommendation-card {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      border-left: 5px solid #2a5298;
    }
    
    .recommendation-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 20px;
    }
    
    .recommendation-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .priority-badge {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      color: white;
    }
    
    .priority-critical {
      background: #dc3545;
    }
    
    .priority-high {
      background: #fd7e14;
    }
    
    .priority-medium {
      background: #ffc107;
      color: #333;
    }
    
    .priority-low {
      background: #28a745;
    }
    
    .recommendation-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }
    
    .metric {
      text-align: center;
    }
    
    .metric-label {
      font-size: 0.85rem;
      color: #6c757d;
      margin-bottom: 5px;
    }
    
    .metric-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2a5298;
    }
    
    /* 로드맵 */
    .roadmap {
      margin-bottom: 40px;
    }
    
    .roadmap h2 {
      color: #1e3c72;
      font-size: 1.8rem;
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    .timeline {
      position: relative;
      padding-left: 40px;
    }
    
    .timeline:before {
      content: '';
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #2a5298;
    }
    
    .timeline-item {
      position: relative;
      padding-bottom: 40px;
    }
    
    .timeline-item:before {
      content: '';
      position: absolute;
      left: -28px;
      top: 5px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #2a5298;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .phase-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .phase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .phase-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .phase-duration {
      background: #f8f9fa;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #6c757d;
    }
    
    /* Footer */
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e9ecef;
      text-align: center;
      color: #6c757d;
    }
    
    .footer .company {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2a5298;
      margin-bottom: 10px;
    }
    
    @media print {
      .header {
        border-radius: 0;
      }
      
      .score-card:hover {
        transform: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <h1>AI 역량진단 결과 보고서</h1>
      <div class="subtitle">McKinsey-Style Executive Report</div>
      <div class="date">
        ${companyInfo.companyName} | ${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  </div>
  
  <div class="container">
    <!-- Executive Summary -->
    <div class="executive-summary">
      <h2>Executive Summary</h2>
      <p style="font-size: 1.1rem; line-height: 1.8; color: #495057;">
        ${companyInfo.companyName}의 AI 역량진단 결과, <strong>총점 ${diagnosis.totalScore}점</strong>으로 
        <strong>${diagnosis.maturityLevel}</strong> 수준으로 평가되었습니다. 
        업계 평균(${diagnosis.industryBenchmark}점) 대비 ${diagnosis.totalScore > diagnosis.industryBenchmark ? '우수한' : '개선이 필요한'} 수준이며,
        상위 ${diagnosis.percentile}%에 해당합니다.
      </p>
      
      <div class="score-grid">
        <div class="score-card">
          <div class="score-label">종합 점수</div>
          <div class="score-value">${diagnosis.totalScore}</div>
          <div class="grade-badge">${diagnosis.grade}등급</div>
        </div>
        <div class="score-card">
          <div class="score-label">업계 평균</div>
          <div class="score-value">${diagnosis.industryBenchmark}</div>
          <div class="score-label" style="color: ${diagnosis.totalScore > diagnosis.industryBenchmark ? '#28a745' : '#dc3545'};">
            ${diagnosis.totalScore > diagnosis.industryBenchmark ? '+' : ''}${diagnosis.totalScore - diagnosis.industryBenchmark}점
          </div>
        </div>
        <div class="score-card">
          <div class="score-label">AI 성숙도</div>
          <div class="score-value" style="font-size: 1.8rem;">${diagnosis.maturityLevel}</div>
          <div class="score-label">상위 ${diagnosis.percentile}%</div>
        </div>
      </div>
    </div>
    
    <!-- 카테고리별 분석 -->
    <div class="category-analysis">
      <h2>카테고리별 상세 분석</h2>
      ${Object.entries(diagnosis.categoryScores).map(([key, score]) => `
        <div class="category-item">
          <div class="category-header">
            <span class="category-name">${getCategoryLabel(key)}</span>
            <span class="category-score">${score}점</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${score}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <!-- SWOT 분석 -->
    <div class="swot-analysis">
      <div class="swot-card strength">
        <div class="swot-title">💪 강점 (Strengths)</div>
        <ul class="swot-list">
          ${analysis.strengths.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="swot-card weakness">
        <div class="swot-title">⚠️ 약점 (Weaknesses)</div>
        <ul class="swot-list">
          ${analysis.weaknesses.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="swot-card opportunity">
        <div class="swot-title">🎯 기회 (Opportunities)</div>
        <ul class="swot-list">
          ${analysis.opportunities.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="swot-card threat">
        <div class="swot-title">🚨 위협 (Threats)</div>
        <ul class="swot-list">
          ${analysis.threats.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
    
    <!-- 전략적 권고사항 -->
    <div class="recommendations">
      <h2>전략적 실행 권고사항</h2>
      ${recommendations.map((rec, index) => `
        <div class="recommendation-card">
          <div class="recommendation-header">
            <div class="recommendation-title">${index + 1}. ${rec.title}</div>
            <span class="priority-badge priority-${rec.priority.toLowerCase()}">${getPriorityLabel(rec.priority)}</span>
          </div>
          <p style="color: #495057; line-height: 1.8; margin-bottom: 20px;">${rec.description}</p>
          <div class="recommendation-metrics">
            <div class="metric">
              <div class="metric-label">기대 효과</div>
              <div class="metric-value">${rec.impact}</div>
            </div>
            <div class="metric">
              <div class="metric-label">실행 기간</div>
              <div class="metric-value">${rec.timeframe}</div>
            </div>
            <div class="metric">
              <div class="metric-label">예상 ROI</div>
              <div class="metric-value">${rec.roi}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <!-- 실행 로드맵 -->
    <div class="roadmap">
      <h2>AI 도입 실행 로드맵</h2>
      <div class="timeline">
        ${roadmap.map((phase, index) => `
          <div class="timeline-item">
            <div class="phase-card">
              <div class="phase-header">
                <div class="phase-title">${phase.phase}</div>
                <div class="phase-duration">${phase.duration}</div>
              </div>
              <div style="margin-top: 15px;">
                <strong>주요 목표:</strong>
                <ul style="margin-top: 10px; padding-left: 20px;">
                  ${phase.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
              </div>
              <div style="margin-top: 15px;">
                <strong>예상 성과:</strong>
                <ul style="margin-top: 10px; padding-left: 20px;">
                  ${phase.expectedOutcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                </ul>
              </div>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef;">
                <strong>예상 투자:</strong> ${phase.budget}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="company">AICAMP - AI Transformation Partner</div>
      <div>본 보고서는 AI 역량진단 결과를 바탕으로 자동 생성되었습니다.</div>
      <div style="margin-top: 10px;">문의: support@aicamp.club | 02-1234-5678</div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 카테고리 라벨 변환
 */
function getCategoryLabel(key: string): string {
  const labels: { [key: string]: string } = {
    businessFoundation: '사업 기반',
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfrastructure: '기술 인프라',
    goalClarity: '목표 명확성',
    executionCapability: '실행 역량'
  };
  return labels[key] || key;
}

/**
 * 우선순위 라벨 변환
 */
function getPriorityLabel(priority: string): string {
  const labels: { [key: string]: string } = {
    CRITICAL: '긴급',
    HIGH: '최우선',
    MEDIUM: '중요',
    LOW: '권장'
  };
  return labels[priority] || priority;
}

/**
 * 이메일용 텍스트 보고서 생성
 */
export function generateMcKinseyTextReport(data: McKinseyReportData): string {
  const { companyInfo, diagnosis, analysis, recommendations } = data;
  
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI 역량진단 결과 보고서
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

기업명: ${companyInfo.companyName}
담당자: ${companyInfo.contactName}
진단일: ${new Date().toLocaleDateString('ko-KR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 종합 진단 결과
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

총점: ${diagnosis.totalScore}점 (${diagnosis.grade}등급)
AI 성숙도: ${diagnosis.maturityLevel}
업계 평균: ${diagnosis.industryBenchmark}점
상위 ${diagnosis.percentile}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 카테고리별 점수
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• 사업 기반: ${diagnosis.categoryScores.businessFoundation}점
• 현재 AI 활용: ${diagnosis.categoryScores.currentAI}점
• 조직 준비도: ${diagnosis.categoryScores.organizationReadiness}점
• 기술 인프라: ${diagnosis.categoryScores.techInfrastructure}점
• 목표 명확성: ${diagnosis.categoryScores.goalClarity}점
• 실행 역량: ${diagnosis.categoryScores.executionCapability}점

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💪 핵심 강점
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ 개선 필요 영역
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis.weaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 전략적 권고사항
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${recommendations.slice(0, 3).map((rec, i) => `
[${i + 1}] ${rec.title}
우선순위: ${getPriorityLabel(rec.priority)}
설명: ${rec.description}
기대효과: ${rec.impact}
실행기간: ${rec.timeframe}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 다음 단계
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 첨부된 상세 보고서를 검토해주세요
2. 내부 검토 후 실행 우선순위를 결정해주세요
3. 전문가 상담이 필요하시면 연락 주세요

문의: support@aicamp.club | 02-1234-5678

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AICAMP - Your AI Transformation Partner
  `;
}

/**
 * 🏆 Ultimate AI Transformation Report Generator
 * 
 * 맥킨지를 뛰어넘는 세계 최고 수준의 AI 전환 보고서 생성 시스템
 * AICAMP 프로그램과 완벽하게 통합된 맞춤형 보고서
 */

import { McKinseyReportData } from './mckinsey-report-generator';
import { 
  AICampProgram, 
  IndustrySpecificRecommendation,
  getIndustrySpecificRecommendations,
  getRecommendedProgramsByScore,
  calculateProgramROI,
  getRelevantSuccessCases,
  generateLearningPath
} from './aicamp-program-integration';

export interface UltimateReportData extends McKinseyReportData {
  // AICAMP 프로그램 통합
  aicampPrograms: {
    recommended: AICampProgram[];
    learningPath: any[];
    roi: any;
    successCases: any[];
  };
  
  // 업종별 맞춤 분석
  industryAnalysis: IndustrySpecificRecommendation;
  
  // 경쟁사 벤치마킹
  competitorAnalysis: {
    leaders: any[];
    position: string;
    gap: number;
    catchUpStrategy: string[];
  };
  
  // AI 성숙도 로드맵
  maturityRoadmap: {
    currentStage: string;
    targetStage: string;
    milestones: any[];
    timeline: string;
  };
  
  // 투자 분석
  investmentAnalysis: {
    totalBudget: string;
    phaseAllocation: any[];
    expectedROI: number;
    breakEvenPoint: string;
  };
}

/**
 * 궁극의 HTML 보고서 생성
 */
export function generateUltimateHTMLReport(data: UltimateReportData): string {
  const { 
    companyInfo, 
    diagnosis, 
    analysis, 
    recommendations, 
    roadmap,
    aicampPrograms,
    industryAnalysis,
    competitorAnalysis,
    maturityRoadmap,
    investmentAnalysis
  } = data;

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Transformation Master Plan - ${companyInfo.companyName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans KR', 'Montserrat', sans-serif;
      line-height: 1.6;
      color: #1a1a2e;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    .report-wrapper {
      background: white;
      max-width: 1400px;
      margin: 0 auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    /* 프리미엄 헤더 */
    .premium-header {
      position: relative;
      background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
      color: white;
      padding: 80px 60px;
      overflow: hidden;
    }
    
    .premium-header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .header-content {
      position: relative;
      z-index: 1;
    }
    
    .company-badge {
      display: inline-block;
      background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
      padding: 8px 20px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .report-title {
      font-size: 3.5rem;
      font-weight: 900;
      margin-bottom: 15px;
      background: linear-gradient(45deg, #fff 30%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-transform: uppercase;
      letter-spacing: -2px;
    }
    
    .report-subtitle {
      font-size: 1.4rem;
      font-weight: 300;
      opacity: 0.9;
      margin-bottom: 30px;
    }
    
    .header-metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
      margin-top: 40px;
    }
    
    .metric-card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 20px;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.2);
      text-align: center;
    }
    
    .metric-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #f093fb;
      margin-bottom: 5px;
    }
    
    .metric-label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.8;
    }
    
    /* Executive Dashboard */
    .executive-dashboard {
      padding: 60px;
      background: #f8f9fa;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      position: relative;
    }
    
    .section-number {
      font-size: 5rem;
      font-weight: 900;
      color: rgba(102, 126, 234, 0.1);
      position: absolute;
      left: -20px;
      top: -30px;
      z-index: 0;
    }
    
    .section-title {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2c5364;
      position: relative;
      z-index: 1;
      padding-left: 40px;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 50px;
    }
    
    .insight-card {
      background: white;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .insight-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }
    
    .insight-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    .insight-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
    
    .insight-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c5364;
      margin-bottom: 15px;
    }
    
    .insight-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #667eea;
      margin-bottom: 10px;
    }
    
    .insight-description {
      color: #6c757d;
      line-height: 1.6;
    }
    
    /* AI Maturity Journey */
    .maturity-journey {
      padding: 60px;
      background: white;
    }
    
    .journey-timeline {
      position: relative;
      padding: 40px 0;
    }
    
    .journey-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      z-index: 0;
    }
    
    .journey-stages {
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 1;
    }
    
    .journey-stage {
      text-align: center;
      flex: 1;
    }
    
    .stage-circle {
      width: 80px;
      height: 80px;
      background: white;
      border: 4px solid #667eea;
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
    
    .stage-circle.current {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: scale(1.2);
    }
    
    .stage-title {
      font-weight: 600;
      color: #2c5364;
      margin-bottom: 5px;
    }
    
    .stage-description {
      font-size: 0.9rem;
      color: #6c757d;
    }
    
    /* AICAMP Program Matrix */
    .program-matrix {
      padding: 60px;
      background: #f8f9fa;
    }
    
    .program-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
    
    .program-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    
    .program-card:hover {
      transform: scale(1.02);
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    .program-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 25px;
    }
    
    .program-category {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .program-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .program-duration {
      font-size: 0.95rem;
      opacity: 0.9;
    }
    
    .program-body {
      padding: 25px;
    }
    
    .program-outcomes {
      margin-bottom: 20px;
    }
    
    .outcome-item {
      display: flex;
      align-items: start;
      margin-bottom: 12px;
    }
    
    .outcome-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.8rem;
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .program-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }
    
    .program-metric {
      text-align: center;
    }
    
    .program-metric-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }
    
    .program-metric-label {
      font-size: 0.85rem;
      color: #6c757d;
      text-transform: uppercase;
    }
    
    /* Investment Analysis */
    .investment-analysis {
      padding: 60px;
      background: white;
    }
    
    .investment-chart {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 40px;
      border-radius: 20px;
      margin-bottom: 40px;
    }
    
    .roi-calculator {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .roi-item {
      text-align: center;
      padding: 25px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    
    .roi-label {
      font-size: 0.9rem;
      color: #6c757d;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .roi-value {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Success Stories */
    .success-stories {
      padding: 60px;
      background: #f8f9fa;
    }
    
    .story-carousel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .story-card {
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      position: relative;
    }
    
    .story-quote {
      font-size: 3rem;
      color: #667eea;
      opacity: 0.2;
      position: absolute;
      top: 20px;
      right: 20px;
    }
    
    .story-company {
      font-size: 1.3rem;
      font-weight: 700;
      color: #2c5364;
      margin-bottom: 10px;
    }
    
    .story-industry {
      display: inline-block;
      background: #f8f9fa;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      color: #6c757d;
      margin-bottom: 20px;
    }
    
    .story-result {
      font-size: 1.1rem;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 15px;
    }
    
    .story-testimonial {
      font-style: italic;
      color: #495057;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    
    .story-programs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .story-program-tag {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
    }
    
    /* Action Plan */
    .action-plan {
      padding: 60px;
      background: white;
    }
    
    .action-timeline {
      position: relative;
      padding-left: 50px;
    }
    
    .action-timeline::before {
      content: '';
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    }
    
    .action-phase {
      position: relative;
      margin-bottom: 40px;
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .action-phase::before {
      content: '';
      position: absolute;
      left: -39px;
      top: 35px;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
    }
    
    .phase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .phase-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2c5364;
    }
    
    .phase-duration {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 600;
    }
    
    .phase-objectives {
      margin-bottom: 20px;
    }
    
    .objective-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .objective-item {
      display: flex;
      align-items: center;
    }
    
    .objective-check {
      width: 24px;
      height: 24px;
      background: #e8f5e9;
      border: 2px solid #4caf50;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4caf50;
      margin-right: 12px;
      font-size: 0.9rem;
    }
    
    .phase-programs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }
    
    .phase-program {
      background: #f8f9fa;
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 0.9rem;
      color: #495057;
    }
    
    /* Call to Action */
    .cta-section {
      background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
      color: white;
      padding: 80px 60px;
      text-align: center;
    }
    
    .cta-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 20px;
    }
    
    .cta-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 40px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .cta-button {
      padding: 15px 40px;
      border-radius: 30px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
    }
    
    .cta-button.primary {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    
    .cta-button.secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }
    
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    /* Footer */
    .report-footer {
      background: #1a1a2e;
      color: white;
      padding: 40px 60px;
      text-align: center;
    }
    
    .footer-logo {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 20px;
      background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .footer-contact {
      display: flex;
      gap: 30px;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .footer-copyright {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    
    @media print {
      .cta-section {
        display: none;
      }
      
      .program-card:hover,
      .insight-card:hover {
        transform: none;
      }
    }
  </style>
</head>
<body>
  <div class="report-wrapper">
    <!-- Premium Header -->
    <div class="premium-header">
      <div class="header-content">
        <div class="company-badge">AI Transformation Report</div>
        <h1 class="report-title">AI Excellence Roadmap</h1>
        <p class="report-subtitle">${companyInfo.companyName} - Your Journey to AI Leadership</p>
        
        <div class="header-metrics">
          <div class="metric-card">
            <div class="metric-value">${diagnosis.totalScore}</div>
            <div class="metric-label">AI 성숙도 점수</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${diagnosis.grade}</div>
            <div class="metric-label">현재 등급</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">Top ${diagnosis.percentile}%</div>
            <div class="metric-label">업계 순위</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${investmentAnalysis.expectedROI}%</div>
            <div class="metric-label">예상 ROI</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Executive Dashboard -->
    <div class="executive-dashboard">
      <div class="section-number">01</div>
      <h2 class="section-title">Executive Intelligence Dashboard</h2>
      
      <div class="dashboard-grid">
        <div class="insight-card">
          <div class="insight-icon">📊</div>
          <h3 class="insight-title">핵심 강점</h3>
          <div class="insight-value">${analysis.strengths.length}개</div>
          <p class="insight-description">
            ${analysis.strengths[0]}를 포함한 핵심 경쟁 우위 보유
          </p>
        </div>
        
        <div class="insight-card">
          <div class="insight-icon">🎯</div>
          <h3 class="insight-title">개선 기회</h3>
          <div class="insight-value">${analysis.weaknesses.length}개</div>
          <p class="insight-description">
            ${analysis.weaknesses[0]} 등 전략적 개선 영역 식별
          </p>
        </div>
        
        <div class="insight-card">
          <div class="insight-icon">🚀</div>
          <h3 class="insight-title">성장 잠재력</h3>
          <div class="insight-value">${Math.round((100 - diagnosis.totalScore) * 1.5)}%</div>
          <p class="insight-description">
            AI 도입을 통한 추가 성장 가능 영역
          </p>
        </div>
      </div>
      
      <!-- 카테고리별 상세 분석 -->
      <div style="background: white; padding: 40px; border-radius: 20px; margin-top: 40px;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #2c5364; margin-bottom: 30px;">
          AI Capability Assessment Matrix
        </h3>
        <div style="display: grid; gap: 20px;">
          ${Object.entries(diagnosis.categoryScores).map(([key, score]) => `
            <div style="display: flex; align-items: center; gap: 20px;">
              <div style="flex: 0 0 200px; font-weight: 600; color: #495057;">
                ${getCategoryLabel(key)}
              </div>
              <div style="flex: 1; position: relative;">
                <div style="height: 30px; background: #e9ecef; border-radius: 15px; overflow: hidden;">
                  <div style="width: ${score}%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 15px; transition: width 1s ease;">
                  </div>
                </div>
              </div>
              <div style="flex: 0 0 80px; text-align: right; font-weight: 700; font-size: 1.2rem; color: #667eea;">
                ${score}점
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- AI Maturity Journey -->
    <div class="maturity-journey">
      <div class="section-number">02</div>
      <h2 class="section-title">AI Maturity Evolution Journey</h2>
      
      <div class="journey-timeline">
        <div class="journey-line"></div>
        <div class="journey-stages">
          <div class="journey-stage">
            <div class="stage-circle ${diagnosis.totalScore < 40 ? 'current' : ''}">1</div>
            <div class="stage-title">AI Beginner</div>
            <div class="stage-description">AI 도입 준비</div>
          </div>
          <div class="journey-stage">
            <div class="stage-circle ${diagnosis.totalScore >= 40 && diagnosis.totalScore < 60 ? 'current' : ''}">2</div>
            <div class="stage-title">AI Adopter</div>
            <div class="stage-description">AI 도입 시작</div>
          </div>
          <div class="journey-stage">
            <div class="stage-circle ${diagnosis.totalScore >= 60 && diagnosis.totalScore < 80 ? 'current' : ''}">3</div>
            <div class="stage-title">AI User</div>
            <div class="stage-description">AI 활용 확대</div>
          </div>
          <div class="journey-stage">
            <div class="stage-circle ${diagnosis.totalScore >= 80 && diagnosis.totalScore < 90 ? 'current' : ''}">4</div>
            <div class="stage-title">AI Expert</div>
            <div class="stage-description">AI 전문 활용</div>
          </div>
          <div class="journey-stage">
            <div class="stage-circle ${diagnosis.totalScore >= 90 ? 'current' : ''}">5</div>
            <div class="stage-title">AI Leader</div>
            <div class="stage-description">AI 혁신 선도</div>
          </div>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 20px; margin-top: 40px;">
        <p style="text-align: center; font-size: 1.1rem; color: #495057; line-height: 1.8;">
          ${companyInfo.companyName}은 현재 <strong style="color: #667eea;">${diagnosis.maturityLevel}</strong> 단계에 있으며,<br>
          체계적인 AICAMP 프로그램을 통해 <strong style="color: #764ba2;">6개월 내 다음 단계</strong>로 도약할 수 있습니다.
        </p>
      </div>
    </div>
    
    <!-- AICAMP Program Matrix -->
    <div class="program-matrix">
      <div class="section-number">03</div>
      <h2 class="section-title">Customized AICAMP Program Portfolio</h2>
      
      <div class="program-grid">
        ${aicampPrograms.recommended.slice(0, 4).map(program => `
          <div class="program-card">
            <div class="program-header">
              <div class="program-category">${program.category}</div>
              <h3 class="program-title">${program.title}</h3>
              <div class="program-duration">⏱️ ${program.duration}</div>
            </div>
            <div class="program-body">
              <div class="program-outcomes">
                ${program.learningOutcomes.slice(0, 3).map(outcome => `
                  <div class="outcome-item">
                    <div class="outcome-icon">✓</div>
                    <span>${outcome}</span>
                  </div>
                `).join('')}
              </div>
              <div class="program-metrics">
                <div class="program-metric">
                  <div class="program-metric-value">${program.roi}</div>
                  <div class="program-metric-label">ROI</div>
                </div>
                <div class="program-metric">
                  <div class="program-metric-value">${program.successRate}</div>
                  <div class="program-metric-label">성공률</div>
                </div>
                <div class="program-metric">
                  <div class="program-metric-value">${program.price}</div>
                  <div class="program-metric-label">투자</div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Industry Analysis -->
    <div class="executive-dashboard">
      <div class="section-number">04</div>
      <h2 class="section-title">Industry-Specific AI Strategy</h2>
      
      <div style="background: white; padding: 40px; border-radius: 20px;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #2c5364; margin-bottom: 20px;">
          ${industryAnalysis.industry} 특화 AI 전략
        </h3>
        
        <div style="margin-bottom: 30px;">
          <h4 style="font-size: 1.2rem; font-weight: 600; color: #495057; margin-bottom: 15px;">
            🎯 업계 핵심 과제
          </h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            ${industryAnalysis.painPoints.map(pain => `
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #dc3545;">▶</span>
                <span>${pain}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h4 style="font-size: 1.2rem; font-weight: 600; color: #495057; margin-bottom: 15px;">
            ✅ 맞춤 솔루션
          </h4>
          ${industryAnalysis.recommendedPrograms.slice(0, 2).map(rec => `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin-bottom: 15px;">
              <h5 style="font-weight: 600; color: #2c5364; margin-bottom: 10px;">
                ${rec.program.title}
              </h5>
              <p style="color: #6c757d; margin-bottom: 10px;">${rec.reason}</p>
              <div style="display: flex; gap: 20px; font-size: 0.9rem;">
                <span style="color: #28a745;">📈 ${rec.expectedImpact}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- Investment Analysis -->
    <div class="investment-analysis">
      <div class="section-number">05</div>
      <h2 class="section-title">Investment & ROI Analysis</h2>
      
      <div class="investment-chart">
        <div class="roi-calculator">
          <div class="roi-item">
            <div class="roi-label">총 투자</div>
            <div class="roi-value">${aicampPrograms.roi.totalInvestment}만원</div>
          </div>
          <div class="roi-item">
            <div class="roi-label">예상 수익</div>
            <div class="roi-value">${aicampPrograms.roi.expectedReturn}만원</div>
          </div>
          <div class="roi-item">
            <div class="roi-label">투자 수익률</div>
            <div class="roi-value">${aicampPrograms.roi.roi}%</div>
          </div>
          <div class="roi-item">
            <div class="roi-label">투자 회수</div>
            <div class="roi-value">${aicampPrograms.roi.paybackPeriod}</div>
          </div>
        </div>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 20px;">
        <h3 style="font-size: 1.3rem; font-weight: 600; color: #2c5364; margin-bottom: 20px;">
          단계별 투자 계획
        </h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          ${aicampPrograms.learningPath.map((phase, index) => `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 15px;">
              <div style="font-size: 2rem; font-weight: 700; color: #667eea; margin-bottom: 10px;">
                Phase ${phase.phase}
              </div>
              <div style="font-weight: 600; color: #495057; margin-bottom: 10px;">
                ${phase.duration}
              </div>
              <div style="font-size: 0.9rem; color: #6c757d;">
                ${phase.programs.length}개 프로그램
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- Success Stories -->
    <div class="success-stories">
      <div class="section-number">06</div>
      <h2 class="section-title">Industry Success Stories</h2>
      
      <div class="story-carousel">
        ${aicampPrograms.successCases.map(story => `
          <div class="story-card">
            <div class="story-quote">"</div>
            <div class="story-company">${story.company}</div>
            <div class="story-industry">${story.industry}</div>
            <div class="story-result">${story.result}</div>
            <p class="story-testimonial">"${story.testimonial}"</p>
            <div class="story-programs">
              ${story.programs.map(prog => `
                <span class="story-program-tag">${prog}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Action Plan -->
    <div class="action-plan">
      <div class="section-number">07</div>
      <h2 class="section-title">Your AI Transformation Action Plan</h2>
      
      <div class="action-timeline">
        ${aicampPrograms.learningPath.map((phase, index) => `
          <div class="action-phase">
            <div class="phase-header">
              <div class="phase-title">Phase ${phase.phase}: ${
                phase.phase === 1 ? 'Foundation' :
                phase.phase === 2 ? 'Acceleration' :
                'Excellence'
              }</div>
              <div class="phase-duration">${phase.duration}</div>
            </div>
            <div class="phase-objectives">
              <h4 style="font-weight: 600; color: #495057; margin-bottom: 15px;">주요 목표</h4>
              <div class="objective-list">
                ${phase.objectives.slice(0, 4).map(obj => `
                  <div class="objective-item">
                    <div class="objective-check">✓</div>
                    <span>${obj}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="phase-programs">
              ${phase.programs.map(prog => `
                <span class="phase-program">${prog.title}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Call to Action -->
    <div class="cta-section">
      <h2 class="cta-title">AI 혁신의 여정을 시작하세요</h2>
      <p class="cta-subtitle">
        ${companyInfo.companyName}의 AI 전환을 위한 맞춤형 로드맵이 준비되었습니다.
        지금 바로 AICAMP와 함께 미래를 만들어가세요.
      </p>
      <div class="cta-buttons">
        <a href="tel:02-1234-5678" class="cta-button primary">
          📞 전문가 상담 신청
        </a>
        <a href="mailto:support@aicamp.club" class="cta-button secondary">
          📧 상세 문의하기
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="report-footer">
      <div class="footer-logo">AICAMP</div>
      <div class="footer-contact">
        <div class="contact-item">
          <span>📧</span>
          <span>support@aicamp.club</span>
        </div>
        <div class="contact-item">
          <span>📞</span>
          <span>02-1234-5678</span>
        </div>
        <div class="contact-item">
          <span>🌐</span>
          <span>aicamp.club</span>
        </div>
      </div>
      <div class="footer-copyright">
        © 2024 AICAMP. All rights reserved. | AI Transformation Partner
      </div>
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

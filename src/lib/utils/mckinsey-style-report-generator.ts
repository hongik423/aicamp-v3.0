/**
 * 🎯 맥킨지 스타일 이교장의AI역량진단보고서 생성기
 * - 시각화 우선 구조
 * - 이교장 톤앤매너 적용
 * - n8n 커리큘럼 통합
 * - 행동지표 기반 맞춤형 권고
 */

import { EnhancedScoreResult, BenchmarkGapAnalysis, EnhancedSWOTAnalysis, ThreeDimensionalMatrix } from './enhanced-score-engine';
import { BehaviorBasedReport } from './behavior-based-report-generator';

export interface McKinseyReportData {
  // 기업 정보
  companyName: string;
  industry: string;
  customIndustry?: string;
  employeeCount: string;
  contactName: string;
  contactEmail: string;
  
  // 진단 결과
  scores: EnhancedScoreResult;
  gapAnalysis: BenchmarkGapAnalysis;
  swotAnalysis: EnhancedSWOTAnalysis;
  priorityMatrix: ThreeDimensionalMatrix;
  behaviorReport: BehaviorBasedReport | null;
  
  // AI 분석
  aiAnalysis?: string;
  
  // 메타데이터
  diagnosisId: string;
  timestamp: string;
}

/**
 * 맥킨지 스타일 HTML 보고서 생성
 */
export function generateMcKinseyStyleReport(data: McKinseyReportData): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이교장의AI역량진단보고서 - ${data.companyName}</title>
    <style>
        ${getMcKinseyCSS()}
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="mckinsey-report">
        <!-- 표지 -->
        ${generateCoverPage(data)}
        
        <!-- 요약 페이지 -->
        ${generateExecutiveSummary(data)}
        
        <!-- 기업 정보 -->
        ${generateCompanyInfo(data)}
        
        <!-- 진단 결과 시각화 -->
        ${generateDiagnosisVisualization(data)}
        
        <!-- 행동지표 기반 분석 -->
        ${generateBehaviorAnalysis(data)}
        
        <!-- 벤치마크 분석 -->
        ${generateBenchmarkAnalysis(data)}
        
        <!-- SWOT 분석 -->
        ${generateSWOTAnalysis(data)}
        
        <!-- 우선순위 매트릭스 -->
        ${generatePriorityMatrix(data)}
        
        <!-- n8n 기반 실행방법론 -->
        ${generateN8nMethodology(data)}
        
        <!-- AICAMP 커리큘럼 추천 -->
        ${generateCurriculumRecommendation(data)}
        
        <!-- 3단계 로드맵 -->
        ${generateRoadmap(data)}
        
        <!-- 결론 및 다음 단계 -->
        ${generateConclusion(data)}
    </div>
    
    <script>
        ${getChartScripts(data)}
    </script>
</body>
</html>`;
}

/**
 * 맥킨지 스타일 CSS
 */
function getMcKinseyCSS(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: #fff;
    }
    
    .mckinsey-report {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
    }
    
    /* 페이지 구조 */
    .page {
      min-height: 100vh;
      padding: 60px 40px;
      page-break-after: always;
    }
    
    .page:last-child {
      page-break-after: auto;
    }
    
    /* 헤더 스타일 */
    .page-header {
      border-bottom: 3px solid #1e3a8a;
      padding-bottom: 20px;
      margin-bottom: 40px;
    }
    
    .page-title {
      font-size: 28px;
      font-weight: 300;
      color: #1e3a8a;
      margin-bottom: 8px;
    }
    
    .page-subtitle {
      font-size: 16px;
      color: #64748b;
      font-weight: 400;
    }
    
    /* 표지 스타일 */
    .cover-page {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      color: white;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .cover-title {
      font-size: 48px;
      font-weight: 300;
      margin-bottom: 20px;
      letter-spacing: -1px;
    }
    
    .cover-subtitle {
      font-size: 24px;
      font-weight: 400;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .cover-company {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 20px;
      border: 2px solid white;
      padding: 20px 40px;
      border-radius: 8px;
    }
    
    .cover-meta {
      font-size: 16px;
      opacity: 0.8;
    }
    
    /* 시각화 컨테이너 */
    .viz-container {
      background: #f8fafc;
      border-radius: 12px;
      padding: 30px;
      margin: 30px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .viz-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 20px;
      text-align: center;
    }
    
    /* 차트 그리드 */
    .chart-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin: 30px 0;
    }
    
    .chart-item {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .chart-canvas {
      width: 100% !important;
      height: 250px !important;
    }
    
    /* 스코어 카드 */
    .score-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    
    .score-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 2px solid #e5e7eb;
      transition: all 0.3s ease;
    }
    
    .score-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
    
    .score-value {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .score-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .score-excellent { color: #059669; border-color: #10b981; }
    .score-good { color: #0284c7; border-color: #0ea5e9; }
    .score-average { color: #d97706; border-color: #f59e0b; }
    .score-poor { color: #dc2626; border-color: #ef4444; }
    
    .company-name { font-size: 24px; color: #1f2937; }
    .company-info { font-size: 20px; color: #374151; }
    
    /* 인사이트 박스 */
    .insight-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left: 4px solid #0ea5e9;
      border-radius: 8px;
      padding: 25px;
      margin: 25px 0;
    }
    
    .insight-title {
      font-size: 18px;
      font-weight: 600;
      color: #0c4a6e;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .insight-content {
      font-size: 16px;
      color: #374151;
      line-height: 1.7;
    }
    
    /* 이교장 톤앤매너 스타일 */
    .lee-tone {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      font-style: italic;
    }
    
    .lee-tone::before {
      content: "💡 이교장의 한마디";
      font-weight: 600;
      color: #92400e;
      display: block;
      margin-bottom: 10px;
      font-style: normal;
    }
    
    /* 액션 아이템 */
    .action-list {
      list-style: none;
      padding: 0;
    }
    
    .action-item {
      background: white;
      border-radius: 8px;
      padding: 15px 20px;
      margin: 10px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border-left: 4px solid #3b82f6;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .action-priority {
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }
    
    .action-content {
      flex: 1;
    }
    
    .action-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }
    
    .action-desc {
      font-size: 14px;
      color: #6b7280;
    }
    
    /* 커리큘럼 카드 */
    .curriculum-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }
    
    .curriculum-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }
    
    .curriculum-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
    
    .curriculum-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
    }
    
    .curriculum-icon {
      width: 40px;
      height: 40px;
      background: #3b82f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: white;
    }
    
    .curriculum-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .curriculum-duration {
      font-size: 14px;
      color: #6b7280;
      background: #f3f4f6;
      padding: 4px 8px;
      border-radius: 4px;
      margin-left: auto;
    }
    
    .curriculum-desc {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 15px;
      line-height: 1.6;
    }
    
    .curriculum-outcomes {
      list-style: none;
      padding: 0;
    }
    
    .curriculum-outcomes li {
      font-size: 13px;
      color: #374151;
      padding: 4px 0;
      padding-left: 20px;
      position: relative;
    }
    
    .curriculum-outcomes li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 600;
    }
    
    /* 로드맵 스타일 */
    .roadmap-container {
      margin: 40px 0;
    }
    
    .roadmap-phase {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin: 25px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border-left: 6px solid #3b82f6;
      position: relative;
    }
    
    .roadmap-phase::before {
      content: attr(data-phase);
      position: absolute;
      top: -10px;
      left: 20px;
      background: #3b82f6;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .roadmap-title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    
    .roadmap-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #6b7280;
    }
    
    .roadmap-tasks {
      list-style: none;
      padding: 0;
    }
    
    .roadmap-tasks li {
      background: #f8fafc;
      border-radius: 6px;
      padding: 12px 15px;
      margin: 8px 0;
      border-left: 3px solid #e5e7eb;
      font-size: 14px;
      color: #374151;
    }
    
    /* 반응형 */
    @media (max-width: 768px) {
      .page { padding: 30px 20px; }
      .cover-title { font-size: 36px; }
      .cover-subtitle { font-size: 20px; }
      .cover-company { font-size: 24px; padding: 15px 25px; }
      .chart-grid { grid-template-columns: 1fr; }
      .score-grid { grid-template-columns: repeat(2, 1fr); }
      .curriculum-grid { grid-template-columns: 1fr; }
    }
    
    /* 인쇄 스타일 */
    @media print {
      .page { page-break-after: always; }
      .chart-canvas { height: 200px !important; }
      .score-card:hover { transform: none; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    }
  `;
}

/**
 * 표지 페이지 생성
 */
function generateCoverPage(data: McKinseyReportData): string {
  const currentDate = new Date(data.timestamp).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="page cover-page">
      <div class="cover-title">이교장의AI역량진단보고서</div>
      <div class="cover-subtitle">McKinsey 방법론 기반 정밀 분석</div>
      <div class="cover-company">${data.companyName}</div>
      <div class="cover-meta">
        <div>진단일: ${currentDate}</div>
        <div>진단 ID: ${data.diagnosisId}</div>
        <div>AICAMP AI 역량진단 시스템 V15.0</div>
      </div>
    </div>
  `;
}

/**
 * 요약 페이지 생성
 */
function generateExecutiveSummary(data: McKinseyReportData): string {
  const maturityLevel = data.scores.maturityLevel;
  const totalScore = data.scores.totalScore;
  const percentile = data.scores.percentile;

  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">경영진 요약</div>
        <div class="page-subtitle">Executive Summary</div>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">🎯 핵심 진단 결과</div>
        <div class="insight-content">
          ${data.companyName}의 AI 역량 성숙도는 <strong>${maturityLevel}</strong> 수준으로, 
          전체 ${totalScore}점을 기록하여 상위 <strong>${100-percentile}%</strong>에 해당합니다.
        </div>
      </div>
      
      <div class="lee-tone">
        아직 AI 도입 초기 단계이시군요! 하지만 걱정 마세요. 
        체계적인 3단계 로드맵을 따라가시면 6개월 내에 확실한 변화를 경험하실 수 있습니다. 
        특히 n8n 자동화부터 시작하시면 즉시 효과를 보실 거예요.
      </div>
      
      <div class="viz-container">
        <div class="viz-title">📊 종합 점수 현황</div>
        <canvas id="summaryChart" class="chart-canvas"></canvas>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">⚡ 즉시 실행 권고사항</div>
        <div class="insight-content">
          <ul class="action-list">
            ${generateImmediateActions(data)}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * 기업 정보 페이지 생성
 */
function generateCompanyInfo(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">기업 정보</div>
        <div class="page-subtitle">Company Profile</div>
      </div>
      
      <div class="score-grid">
        <div class="score-card">
          <div class="score-value company-name">${data.companyName}</div>
          <div class="score-label">회사명</div>
        </div>
        <div class="score-card">
          <div class="score-value company-info">${data.industry}</div>
          <div class="score-label">업종</div>
        </div>
        <div class="score-card">
          <div class="score-value company-info">${data.employeeCount}</div>
          <div class="score-label">직원 수</div>
        </div>
        <div class="score-card">
          <div class="score-value company-info">${data.contactName}</div>
          <div class="score-label">담당자</div>
        </div>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">🏢 현재 현황 평가</div>
        <div class="insight-content">
          ${generateCurrentStatusEvaluation(data)}
        </div>
      </div>
    </div>
  `;
}

/**
 * 진단 결과 시각화 페이지
 */
function generateDiagnosisVisualization(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">진단 결과 시각화</div>
        <div class="page-subtitle">Diagnosis Visualization</div>
      </div>
      
      <div class="lee-tone">
        숫자로만 보면 복잡하죠? 시각적으로 보면 한눈에 들어옵니다! 
        어디가 강하고 어디를 개선해야 할지 명확해질 거예요.
      </div>
      
      <div class="score-grid">
        <div class="score-card ${getScoreClass(data.scores.totalScore)}">
          <div class="score-value">${data.scores.totalScore}</div>
          <div class="score-label">종합 점수</div>
        </div>
        <div class="score-card ${getScoreClass(data.scores.categoryScores.currentAI)}">
          <div class="score-value">${data.scores.categoryScores.currentAI}</div>
          <div class="score-label">현재 AI 활용</div>
        </div>
        <div class="score-card ${getScoreClass(data.scores.categoryScores.organizationReadiness)}">
          <div class="score-value">${data.scores.categoryScores.organizationReadiness}</div>
          <div class="score-label">조직 준비도</div>
        </div>
        <div class="score-card ${getScoreClass(data.scores.categoryScores.techInfrastructure)}">
          <div class="score-value">${data.scores.categoryScores.techInfrastructure}</div>
          <div class="score-label">기술 인프라</div>
        </div>
        <div class="score-card ${getScoreClass(data.scores.categoryScores.goalClarity)}">
          <div class="score-value">${data.scores.categoryScores.goalClarity}</div>
          <div class="score-label">목표 명확성</div>
        </div>
        <div class="score-card ${getScoreClass(data.scores.categoryScores.executionCapability)}">
          <div class="score-value">${data.scores.categoryScores.executionCapability}</div>
          <div class="score-label">실행 역량</div>
        </div>
      </div>
      
      <div class="chart-grid">
        <div class="chart-item">
          <canvas id="radarChart" class="chart-canvas"></canvas>
        </div>
        <div class="chart-item">
          <canvas id="benchmarkChart" class="chart-canvas"></canvas>
        </div>
      </div>
    </div>
  `;
}

/**
 * 행동지표 기반 분석 페이지
 */
function generateBehaviorAnalysis(data: McKinseyReportData): string {
  if (!data.behaviorReport) {
    return `
      <div class="page">
        <div class="page-header">
          <div class="page-title">행동지표 기반 분석</div>
          <div class="page-subtitle">Behavioral Analysis</div>
        </div>
        <div class="insight-box">
          <div class="insight-title">⚠️ 분석 제한</div>
          <div class="insight-content">행동지표 데이터가 충분하지 않아 상세 분석이 제한됩니다.</div>
        </div>
      </div>
    `;
  }

  const strongBehaviors = data.behaviorReport.overallAnalysis.strongAreas.slice(0, 5);
  const improvementBehaviors = data.behaviorReport.overallAnalysis.improvementAreas.slice(0, 5);

  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">행동지표 기반 분석</div>
        <div class="page-subtitle">Behavioral Analysis</div>
      </div>
      
      <div class="lee-tone">
        이제 진짜 중요한 부분입니다! 설문에서 선택하신 행동들을 분석해보니, 
        강점과 개선점이 명확하게 드러나네요. 이걸 바탕으로 맞춤형 솔루션을 제안드릴게요.
      </div>
      
      <div class="viz-container">
        <div class="viz-title">💪 상위 5개 강점 행동</div>
        <ul class="action-list">
          ${strongBehaviors.map((behavior, index) => `
            <li class="action-item">
              <div class="action-priority">${index + 1}</div>
              <div class="action-content">
                <div class="action-title">${behavior.behaviorIndicator.keyword}</div>
                <div class="action-desc">${behavior.behaviorIndicator.description}</div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
      
      <div class="viz-container">
        <div class="viz-title">🚀 상위 5개 개선 필요 행동</div>
        <ul class="action-list">
          ${improvementBehaviors.map((behavior, index) => `
            <li class="action-item">
              <div class="action-priority" style="background: #ef4444;">${index + 1}</div>
              <div class="action-content">
                <div class="action-title">${behavior.behaviorIndicator.keyword}</div>
                <div class="action-desc">${behavior.behaviorIndicator.description}</div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">📋 즉시 실행 액션 아이템</div>
        <div class="insight-content">
          <ul>
            ${data.behaviorReport.customizedRecommendations.immediate.slice(0, 3).map(action => 
              `<li>${action}</li>`
            ).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * n8n 기반 실행방법론 페이지
 */
function generateN8nMethodology(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">n8n 기반 실행방법론</div>
        <div class="page-subtitle">n8n-Based Implementation Methodology</div>
      </div>
      
      <div class="lee-tone">
        이론만으로는 안 되죠! n8n이라는 강력한 자동화 도구로 실제 업무를 혁신해보세요. 
        코딩 몰라도 괜찮습니다. 드래그 앤 드롭만으로 마법 같은 자동화가 가능해요!
      </div>
      
      <div class="curriculum-grid">
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🔄</div>
            <div>
              <div class="curriculum-title">n8n 기초 워크플로우</div>
              <div class="curriculum-duration">12시간</div>
            </div>
          </div>
          <div class="curriculum-desc">
            노코드 자동화의 첫 걸음. 기본 워크플로우 구축부터 API 연동까지 마스터합니다.
          </div>
          <ul class="curriculum-outcomes">
            <li>n8n 플랫폼 이해 및 설치</li>
            <li>기본 노드 구조 및 연결 방법</li>
            <li>데이터 변환 및 조건 분기</li>
            <li>API 연동 기초</li>
            <li>실습: 이메일 자동 발송 시스템</li>
          </ul>
        </div>
        
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">📊</div>
            <div>
              <div class="curriculum-title">업무 자동화 실무</div>
              <div class="curriculum-duration">16시간</div>
            </div>
          </div>
          <div class="curriculum-desc">
            실제 업무 프로세스를 자동화로 전환. 반복 업무 90% 감소를 경험합니다.
          </div>
          <ul class="curriculum-outcomes">
            <li>문서 처리 자동화 (PDF, Excel)</li>
            <li>데이터 수집 및 정제 자동화</li>
            <li>보고서 생성 자동화</li>
            <li>슬랙/팀즈 연동</li>
            <li>실습: 월간 보고서 자동 생성</li>
          </ul>
        </div>
        
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🤖</div>
            <div>
              <div class="curriculum-title">AI + n8n 통합</div>
              <div class="curriculum-duration">20시간</div>
            </div>
          </div>
          <div class="curriculum-desc">
            ChatGPT와 n8n을 연결하여 지능형 자동화 시스템을 구축합니다.
          </div>
          <ul class="curriculum-outcomes">
            <li>OpenAI API 연동</li>
            <li>자동 콘텐츠 생성</li>
            <li>감정 분석 및 분류</li>
            <li>고객 응답 자동화</li>
            <li>실습: AI 챗봇 시스템 구축</li>
          </ul>
        </div>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">🎯 ${data.companyName} 맞춤형 n8n 활용 시나리오</div>
        <div class="insight-content">
          ${generateCustomN8nScenarios(data)}
        </div>
      </div>
    </div>
  `;
}

/**
 * 맞춤형 커리큘럼 추천 페이지
 */
function generateCurriculumRecommendation(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">AICAMP 커리큘럼 추천</div>
        <div class="page-subtitle">Customized AICAMP Curriculum</div>
      </div>
      
      <div class="lee-tone">
        진단 결과를 바탕으로 ${data.companyName}에 딱 맞는 교육과정을 추천드려요! 
        단계별로 차근차근 따라가시면 AI 전문가가 될 수 있습니다.
      </div>
      
      ${generateRecommendedCurriculum(data)}
      
      <div class="insight-box">
        <div class="insight-title">💰 투자 대비 효과 (ROI)</div>
        <div class="insight-content">
          추천 커리큘럼 완주 시 예상 효과:
          <ul>
            <li><strong>업무 효율성 300% 향상</strong> - 반복 업무 자동화</li>
            <li><strong>의사결정 속도 50% 개선</strong> - AI 기반 데이터 분석</li>
            <li><strong>인건비 절약 연간 2억원</strong> - 자동화로 인한 인력 재배치</li>
            <li><strong>고객 만족도 40% 증가</strong> - 신속한 서비스 제공</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * 3단계 로드맵 페이지
 */
function generateRoadmap(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">3단계 실행 로드맵</div>
        <div class="page-subtitle">3-Phase Implementation Roadmap</div>
      </div>
      
      <div class="lee-tone">
        로드맵 없이 시작하면 길을 잃기 쉬워요! 3단계로 나누어 체계적으로 접근하시면 
        확실한 성과를 얻으실 수 있습니다. 각 단계마다 명확한 목표와 성과 지표가 있어요.
      </div>
      
      <div class="roadmap-container">
        <div class="roadmap-phase" data-phase="1단계">
          <div class="roadmap-title">🚀 AI 기초 역량 구축 (1-2개월)</div>
          <div class="roadmap-meta">
            <span>💰 투자: TBD (진단 후 맞춤 제안)</span>
            <span>👥 대상: 전 직원</span>
            <span>🎯 목표: AI 리터러시 확보</span>
          </div>
          <ul class="roadmap-tasks">
            <li>ChatGPT/Claude 기본 활용법 교육</li>
            <li>프롬프트 엔지니어링 실습</li>
            <li>부서별 AI 활용 사례 발굴</li>
            <li>n8n 기초 워크플로우 구축</li>
            <li>간단한 업무 자동화 구현</li>
          </ul>
        </div>
        
        <div class="roadmap-phase" data-phase="2단계">
          <div class="roadmap-title">⚡ 업무 자동화 고도화 (3-4개월)</div>
          <div class="roadmap-meta">
            <span>💰 투자: TBD (진단 후 맞춤 제안)</span>
            <span>👥 대상: 핵심 인력</span>
            <span>🎯 목표: 업무 효율성 300% 향상</span>
          </div>
          <ul class="roadmap-tasks">
            <li>n8n 고급 워크플로우 설계</li>
            <li>API 연동 및 데이터 통합</li>
            <li>반복 업무 90% 자동화</li>
            <li>실시간 모니터링 대시보드 구축</li>
            <li>부서간 자동화 시스템 연동</li>
          </ul>
        </div>
        
        <div class="roadmap-phase" data-phase="3단계">
          <div class="roadmap-title">🎯 AI 전문 조직 완성 (5-6개월)</div>
          <div class="roadmap-meta">
            <span>💰 투자: TBD (진단 후 맞춤 제안)</span>
            <span>👥 대상: 경영진 + 리더</span>
            <span>🎯 목표: AI 기반 의사결정 체계 구축</span>
          </div>
          <ul class="roadmap-tasks">
            <li>AI 기반 예측 분석 시스템</li>
            <li>고객 서비스 AI 챗봇 구축</li>
            <li>마케팅 자동화 시스템</li>
            <li>AI 거버넌스 체계 수립</li>
            <li>지속적 개선 프로세스 구축</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * 결론 페이지
 */
function generateConclusion(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">결론 및 다음 단계</div>
        <div class="page-subtitle">Conclusion & Next Steps</div>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">🎯 핵심 메시지</div>
        <div class="insight-content">
          ${data.companyName}은 AI 역량 개발의 황금 시기에 있습니다. 
          지금 시작하시면 경쟁사 대비 압도적 우위를 확보할 수 있습니다.
        </div>
      </div>
      
      <div class="lee-tone">
        분석 결과를 보니 정말 가능성이 보이네요! 특히 ${getTopStrength(data)} 부분은 이미 우수한 수준입니다. 
        여기서 조금만 더 투자하시면 AI 선도 기업으로 도약하실 수 있어요. 
        망설이지 마시고 바로 시작하세요!
      </div>
      
      <div class="viz-container">
        <div class="viz-title">📞 즉시 연락 필요 사항</div>
        <ul class="action-list">
          <li class="action-item">
            <div class="action-priority">1</div>
            <div class="action-content">
              <div class="action-title">무료 전문가 상담 신청</div>
              <div class="action-desc">1:1 맞춤 컨설팅으로 구체적인 실행 계획 수립</div>
            </div>
          </li>
          <li class="action-item">
            <div class="action-priority">2</div>
            <div class="action-content">
              <div class="action-title">파일럿 프로젝트 기획</div>
              <div class="action-desc">소규모 자동화 프로젝트로 즉시 효과 확인</div>
            </div>
          </li>
          <li class="action-item">
            <div class="action-priority">3</div>
            <div class="action-content">
              <div class="action-title">교육 일정 확정</div>
              <div class="action-desc">추천 커리큘럼 기반 맞춤형 교육 계획 수립</div>
            </div>
          </li>
        </ul>
      </div>
      
      <div class="insight-box">
        <div class="insight-title">📧 문의 연락처</div>
        <div class="insight-content">
          <strong>AICAMP AI 역량진단 센터</strong><br>
          📧 이메일: hongik423@gmail.com<br>
          🌐 웹사이트: aicamp.club<br>
          📱 카카오톡: AICAMP 검색<br><br>
          <em>※ 본 보고서는 45문항 정밀 진단과 GEMINI 2.5 Flash AI 엔진 분석을 기반으로 작성되었습니다.</em>
        </div>
      </div>
    </div>
  `;
}

/**
 * 유틸리티 함수들
 */
function getScoreClass(score: number): string {
  if (score >= 80) return 'score-excellent';
  if (score >= 60) return 'score-good';
  if (score >= 40) return 'score-average';
  return 'score-poor';
}

function generateCurrentStatusEvaluation(data: McKinseyReportData): string {
  const { scores, industry, employeeCount } = data;
  const maturity = scores.maturityLevel;
  
  let evaluation = `현재 ${data.companyName}은 ${industry} 업종에서 ${employeeCount} 규모의 기업으로, `;
  
  if (maturity === 'Advanced') {
    evaluation += "AI 역량이 상당히 발달된 선도 기업입니다. 이미 구축된 기반을 활용하여 더욱 고도화된 AI 시스템 구축이 가능합니다.";
  } else if (maturity === 'Developing') {
    evaluation += "AI 도입에 적극적인 중간 단계 기업입니다. 체계적인 접근으로 단기간에 큰 성과를 얻을 수 있는 최적의 시점입니다.";
  } else {
    evaluation += "AI 도입 초기 단계이지만, 이는 오히려 기회입니다. 처음부터 올바른 방향으로 설계하면 더 효과적인 시스템을 구축할 수 있습니다.";
  }
  
  return evaluation;
}

function generateImmediateActions(data: McKinseyReportData): string {
  const actions = [];
  
  if (data.scores.categoryScores.currentAI < 50) {
    actions.push(`
      <li class="action-item">
        <div class="action-priority">1</div>
        <div class="action-content">
          <div class="action-title">ChatGPT 도입 및 교육</div>
          <div class="action-desc">전 직원 대상 기본 활용법 교육으로 즉시 생산성 향상</div>
        </div>
      </li>
    `);
  }
  
  if (data.scores.categoryScores.techInfrastructure < 60) {
    actions.push(`
      <li class="action-item">
        <div class="action-priority">2</div>
        <div class="action-content">
          <div class="action-title">n8n 자동화 도구 도입</div>
          <div class="action-desc">반복 업무 자동화로 월 100시간 이상 업무 시간 절약</div>
        </div>
      </li>
    `);
  }
  
  if (data.scores.categoryScores.organizationReadiness < 70) {
    actions.push(`
      <li class="action-item">
        <div class="action-priority">3</div>
        <div class="action-content">
          <div class="action-title">AI 전담팀 구성</div>
          <div class="action-desc">추진 조직 구성으로 체계적이고 지속적인 AI 도입 추진</div>
        </div>
      </li>
    `);
  }
  
  return actions.join('');
}

function generateCustomN8nScenarios(data: McKinseyReportData): string {
  const industry = data.industry;
  let scenarios = "";
  
  if (industry.includes('제조')) {
    scenarios = `
      <strong>제조업 특화 n8n 시나리오:</strong>
      <ul>
        <li>생산 라인 모니터링 데이터 자동 수집 및 분석</li>
        <li>품질 검사 결과 실시간 알림 시스템</li>
        <li>재고 관리 자동화 및 발주 시스템</li>
        <li>설비 점검 일정 자동 관리</li>
      </ul>
    `;
  } else if (industry.includes('서비스') || industry.includes('유통')) {
    scenarios = `
      <strong>서비스업 특화 n8n 시나리오:</strong>
      <ul>
        <li>고객 문의 자동 분류 및 담당자 배정</li>
        <li>예약 시스템 자동화 및 리마인드</li>
        <li>고객 만족도 조사 자동 발송 및 분석</li>
        <li>마케팅 캠페인 성과 자동 리포팅</li>
      </ul>
    `;
  } else {
    scenarios = `
      <strong>일반 업무 자동화 시나리오:</strong>
      <ul>
        <li>회계 데이터 자동 정리 및 보고서 생성</li>
        <li>인사 관리 업무 자동화 (근태, 휴가 등)</li>
        <li>영업 리드 자동 수집 및 분류</li>
        <li>프로젝트 진행 상황 자동 모니터링</li>
      </ul>
    `;
  }
  
  return scenarios;
}

function generateRecommendedCurriculum(data: McKinseyReportData): string {
  const score = data.scores.totalScore;
  let curriculum = "";
  
  if (score < 40) {
    curriculum = `
      <div class="curriculum-grid">
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🌱</div>
            <div>
              <div class="curriculum-title">AI 기초 과정 (필수)</div>
              <div class="curriculum-duration">8시간</div>
            </div>
          </div>
          <div class="curriculum-desc">AI의 기본 개념부터 ChatGPT 활용까지 체계적으로 학습합니다.</div>
        </div>
        
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🔧</div>
            <div>
              <div class="curriculum-title">n8n 기초 워크플로우</div>
              <div class="curriculum-duration">12시간</div>
            </div>
          </div>
          <div class="curriculum-desc">노코드 자동화 도구의 기본 사용법을 익힙니다.</div>
        </div>
      </div>
    `;
  } else if (score < 70) {
    curriculum = `
      <div class="curriculum-grid">
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">⚡</div>
            <div>
              <div class="curriculum-title">업무 자동화 실무</div>
              <div class="curriculum-duration">16시간</div>
            </div>
          </div>
          <div class="curriculum-desc">실제 업무에 바로 적용 가능한 자동화 기술을 습득합니다.</div>
        </div>
        
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🤖</div>
            <div>
              <div class="curriculum-title">AI + 자동화 통합</div>
              <div class="curriculum-duration">20시간</div>
            </div>
          </div>
          <div class="curriculum-desc">AI와 자동화를 결합한 지능형 시스템을 구축합니다.</div>
        </div>
      </div>
    `;
  } else {
    curriculum = `
      <div class="curriculum-grid">
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🚀</div>
            <div>
              <div class="curriculum-title">AI 리더십 과정</div>
              <div class="curriculum-duration">24시간</div>
            </div>
          </div>
          <div class="curriculum-desc">AI 전략 수립과 조직 혁신을 이끌어갈 리더십을 개발합니다.</div>
        </div>
        
        <div class="curriculum-card">
          <div class="curriculum-header">
            <div class="curriculum-icon">🎯</div>
            <div>
              <div class="curriculum-title">고급 AI 시스템 설계</div>
              <div class="curriculum-duration">32시간</div>
            </div>
          </div>
          <div class="curriculum-desc">기업 전체의 AI 생태계를 설계하고 구축합니다.</div>
        </div>
      </div>
    `;
  }
  
  return curriculum;
}

function getTopStrength(data: McKinseyReportData): string {
  const scores = data.scores.categoryScores;
  const categories = {
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfrastructure: '기술 인프라',
    goalClarity: '목표 명확성',
    executionCapability: '실행 역량'
  };
  
  let maxScore = 0;
  let topCategory = '';
  
  Object.entries(scores).forEach(([key, value]) => {
    if (value > maxScore) {
      maxScore = value;
      topCategory = categories[key as keyof typeof categories];
    }
  });
  
  return topCategory;
}

/**
 * 차트 스크립트 생성
 */
function getChartScripts(data: McKinseyReportData): string {
  return `
    // 요약 차트
    const summaryCtx = document.getElementById('summaryChart');
    if (summaryCtx) {
      new Chart(summaryCtx, {
        type: 'doughnut',
        data: {
          labels: ['현재 점수', '목표까지'],
          datasets: [{
            data: [${data.scores.totalScore}, ${100 - data.scores.totalScore}],
            backgroundColor: ['#3b82f6', '#e5e7eb'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: '종합 점수: ${data.scores.totalScore}점' }
          }
        }
      });
    }
    
    // 레이더 차트
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
      new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: ['현재 AI 활용', '조직 준비도', '기술 인프라', '목표 명확성', '실행 역량'],
          datasets: [{
            label: '현재 수준',
            data: [
              ${data.scores.categoryScores.currentAI},
              ${data.scores.categoryScores.organizationReadiness},
              ${data.scores.categoryScores.techInfrastructure},
              ${data.scores.categoryScores.goalClarity},
              ${data.scores.categoryScores.executionCapability}
            ],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
    
    // 벤치마크 차트
    const benchmarkCtx = document.getElementById('benchmarkChart');
    if (benchmarkCtx) {
      new Chart(benchmarkCtx, {
        type: 'bar',
        data: {
          labels: ['우리 회사', '업종 평균', '규모 평균'],
          datasets: [{
            label: '점수',
            data: [
              ${data.scores.totalScore},
              ${data.scores.totalScore - (data.gapAnalysis.industryGap.total || 0)},
              ${data.scores.totalScore - (data.gapAnalysis.sizeGap.total || 0)}
            ],
            backgroundColor: ['#3b82f6', '#6b7280', '#9ca3af']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: '벤치마크 비교' }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  `;
}

// 나머지 생성 함수들 (SWOT, 우선순위 매트릭스 등)은 기존 함수들을 활용하거나 간소화하여 구현
function generateSWOTAnalysis(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">SWOT 분석</div>
        <div class="page-subtitle">Strengths, Weaknesses, Opportunities, Threats</div>
      </div>
      
      <div class="chart-grid">
        <div class="chart-item" style="background: #dcfce7; border-left: 4px solid #22c55e;">
          <h3 style="color: #16a34a; margin-bottom: 15px;">💪 강점 (Strengths)</h3>
          <ul>
            ${data.swotAnalysis.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        
        <div class="chart-item" style="background: #fef3c7; border-left: 4px solid #f59e0b;">
          <h3 style="color: #d97706; margin-bottom: 15px;">⚠️ 약점 (Weaknesses)</h3>
          <ul>
            ${data.swotAnalysis.weaknesses.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
        
        <div class="chart-item" style="background: #dbeafe; border-left: 4px solid #3b82f6;">
          <h3 style="color: #1d4ed8; margin-bottom: 15px;">🚀 기회 (Opportunities)</h3>
          <ul>
            ${data.swotAnalysis.opportunities.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>
        
        <div class="chart-item" style="background: #fee2e2; border-left: 4px solid #ef4444;">
          <h3 style="color: #dc2626; margin-bottom: 15px;">⚡ 위협 (Threats)</h3>
          <ul>
            ${data.swotAnalysis.threats.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

function generateBenchmarkAnalysis(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">벤치마크 분석</div>
        <div class="page-subtitle">Benchmark Analysis</div>
      </div>
      
      <div class="viz-container">
        <div class="viz-title">📊 경쟁 포지션</div>
        <div style="text-align: center; font-size: 24px; font-weight: 600; color: #3b82f6; margin: 20px 0;">
          ${data.gapAnalysis.competitivePosition}
        </div>
      </div>
      
      <div class="score-grid">
        <div class="score-card">
          <div class="score-value" style="color: ${data.gapAnalysis.industryGap.total >= 0 ? '#16a34a' : '#dc2626'}">
            ${data.gapAnalysis.industryGap.total > 0 ? '+' : ''}${data.gapAnalysis.industryGap.total}
          </div>
          <div class="score-label">업종 평균 대비</div>
        </div>
        
        <div class="score-card">
          <div class="score-value" style="color: ${data.gapAnalysis.sizeGap.total >= 0 ? '#16a34a' : '#dc2626'}">
            ${data.gapAnalysis.sizeGap.total > 0 ? '+' : ''}${data.gapAnalysis.sizeGap.total}
          </div>
          <div class="score-label">규모 평균 대비</div>
        </div>
        
        <div class="score-card">
          <div class="score-value" style="color: #3b82f6;">
            ${data.scores.percentile}%
          </div>
          <div class="score-label">백분위</div>
        </div>
      </div>
    </div>
  `;
}

function generatePriorityMatrix(data: McKinseyReportData): string {
  return `
    <div class="page">
      <div class="page-header">
        <div class="page-title">우선순위 매트릭스</div>
        <div class="page-subtitle">Priority Matrix</div>
      </div>
      
      <div class="lee-tone">
        모든 걸 다 할 수는 없죠! 우선순위를 정해서 단계별로 접근하는 게 핵심입니다. 
        아이젠하워 매트릭스를 활용해 중요도와 긴급도로 분류했어요.
      </div>
      
      <div class="chart-grid">
        <div class="chart-item" style="background: #fee2e2; border: 2px solid #ef4444;">
          <h3 style="color: #dc2626;">🔥 Quick Wins</h3>
          <ul>
            ${data.priorityMatrix.highImpactLowEffort?.map(item => `<li>${item}</li>`).join('') || '<li>해당 없음</li>'}
          </ul>
        </div>
        
        <div class="chart-item" style="background: #fef3c7; border: 2px solid #f59e0b;">
          <h3 style="color: #d97706;">📅 Major Projects</h3>
          <ul>
            ${data.priorityMatrix.highImpactHighEffort?.map(item => `<li>${item}</li>`).join('') || '<li>해당 없음</li>'}
          </ul>
        </div>
        
        <div class="chart-item" style="background: #dbeafe; border: 2px solid #3b82f6;">
          <h3 style="color: #1d4ed8;">👥 Fill-ins</h3>
          <ul>
            ${data.priorityMatrix.lowImpactLowEffort?.map(item => `<li>${item}</li>`).join('') || '<li>해당 없음</li>'}
          </ul>
        </div>
        
        <div class="chart-item" style="background: #f3f4f6; border: 2px solid #6b7280;">
          <h3 style="color: #4b5563;">🗑️ Thankless Tasks</h3>
          <ul>
            ${data.priorityMatrix.lowImpactHighEffort?.map(item => `<li>${item}</li>`).join('') || '<li>해당 없음</li>'}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// 중복 함수 제거 완료

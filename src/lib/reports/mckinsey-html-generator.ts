/**
 * 🎨 세계 최고 수준 McKinsey 스타일 HTML 보고서 생성기
 * Chart.js 기반 동적 시각화 + 인터랙티브 요소 + 애니메이션
 */

import { LeeKyoJang45QuestionsResult } from '@/lib/workflow/mckinsey-45-questions-workflow';
// Ollama 전용 모드: 외부 Gemini 의존성 제거

export interface McKinseyHTMLReportRequest {
  analysisResult: LeeKyoJang45QuestionsResult;
  geminiReport?: { content: Record<string, string> };
  branding?: {
    companyName?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
  };
  options?: {
    includeCharts?: boolean;
    includeAppendix?: boolean;
    language?: 'ko' | 'en';
    format?: 'web' | 'print' | 'pdf';
  };
}

/**
 * McKinsey 스타일 HTML 보고서 생성 메인 함수
 */
export function generateMcKinseyHTMLReport(request: McKinseyHTMLReportRequest): string {
  const { analysisResult, geminiReport, branding } = request;
  
  console.log('🎨 세계 최고 수준 McKinsey HTML 보고서 생성 시작');
  
  const primaryColor = branding?.colors?.primary || '#1f2937';
  const secondaryColor = branding?.colors?.secondary || '#6b7280';
  const accentColor = branding?.colors?.accent || '#3b82f6';
  
  const reportHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이교장의AI역량진단보고서 - ${analysisResult.companyInfo.name}</title>
    
    <!-- Chart.js 및 외부 라이브러리 -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.js"></script>
    
    <!-- 폰트 및 아이콘 -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    ${generateWorldClassCSS(primaryColor, secondaryColor, accentColor)}
</head>
<body>
    <div class="report-container">
        ${generateCoverPage(analysisResult, geminiReport)}
        ${generateTableOfContents()}
        ${generateExecutiveSummary(analysisResult, geminiReport)}
        ${generateCompanyInformation(analysisResult, geminiReport)}
        ${generateDiagnosisVisualization(analysisResult)}
        ${generateBehavioralAnalysis(analysisResult, geminiReport)}
        ${generateBenchmarkAnalysis(analysisResult, geminiReport)}
        ${generateSWOTAnalysis(analysisResult, geminiReport)}
        ${generatePriorityMatrix(analysisResult, geminiReport)}
        ${generateN8nMethodology(analysisResult, geminiReport)}
        ${generateAICampCurriculum(analysisResult, geminiReport)}
        ${generateImplementationRoadmap(analysisResult, geminiReport)}
        ${generateConclusionNextSteps(analysisResult, geminiReport)}
    </div>
    
    ${generateInteractiveJavaScript(analysisResult)}
</body>
</html>`;
  
  console.log('✅ 세계 최고 수준 McKinsey HTML 보고서 생성 완료');
  return reportHTML;
}

/**
 * 세계 최고 수준 CSS 스타일 생성
 */
function generateWorldClassCSS(primaryColor: string, secondaryColor: string, accentColor: string): string {
  return `
<style>
/* ===== 기본 스타일 ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background-color: #f8fafc;
}

.report-container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* ===== 섹션 공통 스타일 ===== */
.section {
    padding: 60px 40px;
    border-bottom: 1px solid #e5e7eb;
}

.section:last-child { border-bottom: none; }

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 3px solid ${accentColor};
}

.section-number {
    background: ${accentColor};
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    margin-right: 20px;
}

.section-title {
    font-size: 32px;
    font-weight: 700;
    color: ${primaryColor};
    margin: 0;
}

/* ===== 표지 페이지 ===== */
.cover-page {
    background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
    color: white;
    text-align: center;
    padding: 100px 40px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.cover-content { position: relative; z-index: 1; }

.main-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    animation: fadeInUp 1s ease-out;
}

.subtitle {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 40px;
    opacity: 0.9;
    animation: fadeInUp 1s ease-out 0.2s both;
}

.company-info-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    margin: 40px auto;
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeInUp 1s ease-out 0.4s both;
}

.score-highlight {
    font-size: 72px;
    font-weight: 700;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.grade-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px 30px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 600;
    margin: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

/* ===== 스코어 카드 ===== */
.score-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.score-card {
    background: white;
    padding: 30px 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-top: 4px solid ${accentColor};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.score-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.score-value {
    font-size: 36px;
    font-weight: 700;
    color: ${accentColor};
    margin-bottom: 10px;
}

.score-label {
    font-size: 14px;
    font-weight: 500;
    color: ${secondaryColor};
    margin-bottom: 15px;
}

.score-status {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.status-excellent { background: #dcfce7; color: #166534; }
.status-good { background: #dbeafe; color: #1e40af; }
.status-average { background: #fef3c7; color: #92400e; }
.status-poor { background: #fee2e2; color: #dc2626; }

/* ===== 차트 컨테이너 ===== */
.chart-container {
    position: relative;
    margin: 30px 0;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chart-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: ${primaryColor};
    text-align: center;
}

.chart-wrapper {
    position: relative;
    height: 400px;
    margin: 20px 0;
}

.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    margin: 40px 0;
}

/* ===== CTA 버튼 ===== */
.cta-section {
    background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
    color: white;
    padding: 60px 40px;
    text-align: center;
    margin: 40px 0;
    border-radius: 16px;
}

.cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
}

.cta-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.cta-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.cta-button.primary {
    background: white;
    color: ${primaryColor};
}

.cta-button.primary:hover { background: #f8fafc; }

/* ===== 애니메이션 ===== */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }

/* ===== 반응형 디자인 ===== */
@media (max-width: 768px) {
    .section { padding: 40px 20px; }
    .main-title { font-size: 32px; }
    .subtitle { font-size: 18px; }
    .company-info-card { padding: 20px; margin: 20px; }
    .score-highlight { font-size: 48px; }
    .charts-grid { grid-template-columns: 1fr; }
    .cta-buttons { flex-direction: column; align-items: center; }
}

/* ===== 인쇄용 스타일 ===== */
@media print {
    body { background: white; }
    .report-container { box-shadow: none; }
    .section { page-break-inside: avoid; }
    .cover-page { page-break-after: always; }
    .cta-button { display: none; }
}
</style>`;
}

/**
 * 1. 표지 페이지 생성
 */
function generateCoverPage(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  const { companyInfo, scoreAnalysis, diagnosisId } = analysisResult;
  
  return `
<div class="cover-page">
    <div class="cover-content">
        <div class="main-title">이교장의AI역량진단보고서</div>
        <div class="subtitle">McKinsey 방법론 기반 정밀 분석</div>
        
        <div class="company-info-card">
            <h2 style="margin-bottom: 30px; font-size: 28px;">${companyInfo.name}</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div>
                    <div style="font-size: 14px; opacity: 0.8; margin-bottom: 5px;">업종</div>
                    <div style="font-size: 18px; font-weight: 600;">${companyInfo.industry}</div>
                </div>
                <div>
                    <div style="font-size: 14px; opacity: 0.8; margin-bottom: 5px;">규모</div>
                    <div style="font-size: 18px; font-weight: 600;">${companyInfo.size}</div>
                </div>
                <div>
                    <div style="font-size: 14px; opacity: 0.8; margin-bottom: 5px;">진단일</div>
                    <div style="font-size: 18px; font-weight: 600;">${new Date().toLocaleDateString('ko-KR')}</div>
                </div>
            </div>
            
            <div class="score-highlight">${scoreAnalysis.totalScore}<span style="font-size: 36px;">점</span></div>
            <div class="grade-badge">${scoreAnalysis.grade}등급</div>
            <div class="grade-badge">${scoreAnalysis.maturityLevel}</div>
            <div class="grade-badge">상위 ${100 - scoreAnalysis.percentile}%</div>
        </div>
        
        <div style="margin-top: 40px; font-size: 18px; opacity: 0.9;">
            <div>진단 ID: ${diagnosisId}</div>
            <div style="margin-top: 10px;">AICAMP AI 역량진단 시스템 V15.0</div>
        </div>
        
        ${(geminiReport?.content?.coverPage || '')}
    </div>
</div>`;
}

/**
 * 2. 목차 생성
 */
function generateTableOfContents(): string {
  const sections = [
    { number: '01', title: '경영진 요약', description: '핵심 진단 결과 및 즉시 실행 권고사항' },
    { number: '02', title: '기업 정보', description: '회사 개요 및 진단 방법론' },
    { number: '03', title: '진단 결과 시각화', description: '6개 영역 스코어 카드 및 차트 분석' },
    { number: '04', title: '행동지표 기반 분석', description: '45개 행동지표 상세 분석' },
    { number: '05', title: '벤치마크 분석', description: '업종별, 규모별 비교 분석' },
    { number: '06', title: 'SWOT 분석', description: '강점, 약점, 기회, 위협 전략 분석' },
    { number: '07', title: '우선순위 매트릭스', description: '중요도-긴급성 기반 실행 우선순위' },
    { number: '08', title: 'n8n 기반 실행방법론', description: '코딩 없는 업무 자동화 가이드' },
    { number: '09', title: 'AICAMP 커리큘럼 추천', description: '맞춤형 교육과정 및 ROI 분석' },
    { number: '10', title: '3단계 실행 로드맵', description: '단계별 AI 역량 구축 계획' },
    { number: '11', title: '결론 및 다음 단계', description: '핵심 메시지 및 액션 아이템' }
  ];
  
  return `
<div class="section">
    <div class="section-header">
        <div class="section-number">📋</div>
        <h1 class="section-title">목차</h1>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 30px;">
        ${sections.map(section => `
            <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer;" onclick="scrollToSection('${section.number}')">
                <div style="color: #3b82f6; font-weight: 700; font-size: 14px;">Section ${section.number}</div>
                <div style="font-weight: 600; margin: 5px 0; color: #1f2937;">${section.title}</div>
                <div style="font-size: 14px; color: #6b7280;">${section.description}</div>
            </div>
        `).join('')}
    </div>
</div>`;
}

/**
 * 나머지 섹션들 생성
 */
function generateExecutiveSummary(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  const { scoreAnalysis } = analysisResult;
  
  return `
<div class="section" id="section-01">
    <div class="section-header">
        <div class="section-number">01</div>
        <h1 class="section-title">경영진 요약</h1>
    </div>
    
    <div class="score-cards">
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.totalScore}</div>
            <div class="score-label">종합 점수</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.totalScore)}">${scoreAnalysis.grade}등급</div>
        </div>
        <div class="score-card">
            <div class="score-value">${100 - scoreAnalysis.percentile}%</div>
            <div class="score-label">상위 백분율</div>
            <div class="score-status status-${getScoreStatus(100 - scoreAnalysis.percentile)}">${scoreAnalysis.maturityLevel}</div>
        </div>
        <div class="score-card">
            <div class="score-value">45</div>
            <div class="score-label">분석 지표</div>
            <div class="score-status status-excellent">행동지표</div>
        </div>
        <div class="score-card">
            <div class="score-value">6</div>
            <div class="score-label">핵심 영역</div>
            <div class="score-status status-excellent">McKinsey</div>
        </div>
    </div>
    
    ${(geminiReport?.content?.executiveSummary || '')}
</div>`;
}

function generateCompanyInformation(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `
<div class="section" id="section-02">
    <div class="section-header">
        <div class="section-number">02</div>
        <h1 class="section-title">기업 정보</h1>
    </div>
    ${(geminiReport?.content?.companyInformation || '')}
</div>`;
}

function generateDiagnosisVisualization(analysisResult: LeeKyoJang45QuestionsResult): string {
  const { scoreAnalysis } = analysisResult;
  
  return `
<div class="section" id="section-03">
    <div class="section-header">
        <div class="section-number">03</div>
        <h1 class="section-title">진단 결과 시각화</h1>
    </div>
    
    <div class="score-cards">
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.categoryScores.businessFoundation}</div>
            <div class="score-label">사업 기반</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.categoryScores.businessFoundation)}">
                ${getScoreLabel(scoreAnalysis.categoryScores.businessFoundation)}
            </div>
        </div>
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.categoryScores.currentAI}</div>
            <div class="score-label">현재 AI 활용</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.categoryScores.currentAI)}">
                ${getScoreLabel(scoreAnalysis.categoryScores.currentAI)}
            </div>
        </div>
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.categoryScores.organizationReadiness}</div>
            <div class="score-label">조직 준비도</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.categoryScores.organizationReadiness)}">
                ${getScoreLabel(scoreAnalysis.categoryScores.organizationReadiness)}
            </div>
        </div>
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.categoryScores.techInfrastructure}</div>
            <div class="score-label">기술 인프라</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.categoryScores.techInfrastructure)}">
                ${getScoreLabel(scoreAnalysis.categoryScores.techInfrastructure)}
            </div>
        </div>
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.categoryScores.goalClarity}</div>
            <div class="score-label">목표 명확성</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.categoryScores.goalClarity)}">
                ${getScoreLabel(scoreAnalysis.categoryScores.goalClarity)}
            </div>
        </div>
        <div class="score-card">
            <div class="score-value">${scoreAnalysis.categoryScores.executionCapability}</div>
            <div class="score-label">실행 역량</div>
            <div class="score-status status-${getScoreStatus(scoreAnalysis.categoryScores.executionCapability)}">
                ${getScoreLabel(scoreAnalysis.categoryScores.executionCapability)}
            </div>
        </div>
    </div>
    
    <div class="charts-grid">
        <div class="chart-container">
            <div class="chart-title">🎯 6개 영역 레이더 차트</div>
            <div class="chart-wrapper">
                <canvas id="radarChart"></canvas>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-title">📊 종합 점수 분포</div>
            <div class="chart-wrapper">
                <canvas id="doughnutChart"></canvas>
            </div>
        </div>
    </div>
    
    <div class="chart-container">
        <div class="chart-title">📈 벤치마크 비교 차트</div>
        <div class="chart-wrapper">
            <canvas id="benchmarkChart"></canvas>
        </div>
    </div>
</div>`;
}

// 나머지 섹션들은 간단하게 구현
function generateBehavioralAnalysis(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-04"><div class="section-header"><div class="section-number">04</div><h1 class="section-title">행동지표 기반 분석</h1></div>${(geminiReport?.content?.behavioralAnalysis || '')}</div>`;
}

function generateBenchmarkAnalysis(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-05"><div class="section-header"><div class="section-number">05</div><h1 class="section-title">벤치마크 분석</h1></div>${(geminiReport?.content?.benchmarkAnalysis || '')}</div>`;
}

function generateSWOTAnalysis(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-06"><div class="section-header"><div class="section-number">06</div><h1 class="section-title">SWOT 분석</h1></div>${(geminiReport?.content?.swotAnalysis || '')}</div>`;
}

function generatePriorityMatrix(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-07"><div class="section-header"><div class="section-number">07</div><h1 class="section-title">우선순위 매트릭스</h1></div>${(geminiReport?.content?.priorityMatrix || '')}</div>`;
}

function generateN8nMethodology(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-08"><div class="section-header"><div class="section-number">08</div><h1 class="section-title">n8n 기반 실행방법론</h1></div>${(geminiReport?.content?.n8nMethodology || '')}</div>`;
}

function generateAICampCurriculum(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-09"><div class="section-header"><div class="section-number">09</div><h1 class="section-title">AICAMP 커리큘럼 추천</h1></div>${(geminiReport?.content?.aicampCurriculum || '')}</div>`;
}

function generateImplementationRoadmap(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `<div class="section" id="section-10"><div class="section-header"><div class="section-number">10</div><h1 class="section-title">3단계 실행 로드맵</h1></div>${(geminiReport?.content?.implementationRoadmap || '')}</div>`;
}

function generateConclusionNextSteps(analysisResult: LeeKyoJang45QuestionsResult, geminiReport?: { content: Record<string, string> }): string {
  return `
<div class="section" id="section-11">
    <div class="section-header">
        <div class="section-number">11</div>
        <h1 class="section-title">결론 및 다음 단계</h1>
    </div>
    
    ${(geminiReport?.content?.conclusionNextSteps || '')}
    
    <div class="cta-section">
        <h2 style="margin-bottom: 20px; font-size: 32px;">🚀 지금 바로 시작하세요!</h2>
        <p style="font-size: 18px; margin-bottom: 30px; opacity: 0.9;">
            걱정 마세요! 이교장과 함께라면 AI 전문가가 될 수 있습니다.
        </p>
        
        <div class="cta-buttons">
            <a href="tel:010-9251-9743" class="cta-button primary">
                📞 무료 상담 신청 (010-9251-9743)
            </a>
            <a href="mailto:hongik423@gmail.com" class="cta-button">
                📧 이메일 문의 (hongik423@gmail.com)
            </a>
            <a href="https://aicamp.club/consultation" class="cta-button">
                💬 온라인 상담 예약
            </a>
        </div>
    </div>
</div>`;
}

/**
 * 인터랙티브 JavaScript 생성
 */
function generateInteractiveJavaScript(analysisResult: LeeKyoJang45QuestionsResult): string {
  const { scoreAnalysis } = analysisResult;
  
  return `
<script>
// Chart.js 기본 설정
Chart.defaults.font.family = 'Inter, sans-serif';
Chart.defaults.color = '#6b7280';

// 레이더 차트 생성
const radarCtx = document.getElementById('radarChart');
if (radarCtx) {
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['사업 기반', '현재 AI 활용', '조직 준비도', '기술 인프라', '목표 명확성', '실행 역량'],
            datasets: [{
                label: '현재 점수',
                data: [
                    ${scoreAnalysis.categoryScores.businessFoundation},
                    ${scoreAnalysis.categoryScores.currentAI},
                    ${scoreAnalysis.categoryScores.organizationReadiness},
                    ${scoreAnalysis.categoryScores.techInfrastructure},
                    ${scoreAnalysis.categoryScores.goalClarity},
                    ${scoreAnalysis.categoryScores.executionCapability}
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: '업계 평균',
                data: [70, 65, 68, 72, 69, 71],
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                borderColor: 'rgba(156, 163, 175, 0.8)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: 'rgba(156, 163, 175, 0.8)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20, font: { size: 12 } },
                    grid: { color: 'rgba(156, 163, 175, 0.3)' },
                    angleLines: { color: 'rgba(156, 163, 175, 0.3)' }
                }
            },
            animation: { duration: 2000, easing: 'easeOutQuart' }
        }
    });
}

// 도넛 차트 생성
const doughnutCtx = document.getElementById('doughnutChart');
if (doughnutCtx) {
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['달성 점수', '개선 여지'],
            datasets: [{
                data: [${scoreAnalysis.totalScore}, ${100 - scoreAnalysis.totalScore}],
                backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(229, 231, 235, 0.8)'],
                borderColor: ['rgba(59, 130, 246, 1)', 'rgba(229, 231, 235, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
            },
            animation: { duration: 2000, easing: 'easeOutQuart' }
        }
    });
}

// 벤치마크 비교 차트
const benchmarkCtx = document.getElementById('benchmarkChart');
if (benchmarkCtx) {
    new Chart(benchmarkCtx, {
        type: 'bar',
        data: {
            labels: ['사업 기반', '현재 AI', '조직 준비', '기술 인프라', '목표 명확', '실행 역량'],
            datasets: [{
                label: '우리 회사',
                data: [
                    ${scoreAnalysis.categoryScores.businessFoundation},
                    ${scoreAnalysis.categoryScores.currentAI},
                    ${scoreAnalysis.categoryScores.organizationReadiness},
                    ${scoreAnalysis.categoryScores.techInfrastructure},
                    ${scoreAnalysis.categoryScores.goalClarity},
                    ${scoreAnalysis.categoryScores.executionCapability}
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                borderRadius: 8
            }, {
                label: '업계 평균',
                data: [70, 65, 68, 72, 69, 71],
                backgroundColor: 'rgba(156, 163, 175, 0.6)',
                borderColor: 'rgba(156, 163, 175, 1)',
                borderWidth: 2,
                borderRadius: 8
            }, {
                label: '상위 10%',
                data: [85, 82, 88, 90, 87, 89],
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
            },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 }, grid: { color: 'rgba(156, 163, 175, 0.3)' } },
                x: { grid: { display: false } }
            },
            animation: { duration: 2000, easing: 'easeOutQuart' }
        }
    });
}

// 스크롤 애니메이션
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// 목차 클릭 시 스크롤
function scrollToSection(sectionNumber) {
    const section = document.getElementById('section-' + sectionNumber);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

console.log('✅ McKinsey 보고서 인터랙티브 요소 로드 완료');
</script>`;
}

/**
 * 유틸리티 함수들
 */
function getScoreStatus(score: number): string {
  if (score >= 80) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 60) return 'average';
  return 'poor';
}

function getScoreLabel(score: number): string {
  if (score >= 80) return '우수';
  if (score >= 70) return '양호';
  if (score >= 60) return '보통';
  return '미흡';
}

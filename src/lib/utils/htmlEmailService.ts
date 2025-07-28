/**
 * 📧 HTML 첨부파일 이메일 발송 서비스
 * - 완벽한 HTML 진단보고서를 첨부파일로 변환
 * - Google Apps Script를 통한 HTML 첨부 이메일 발송
 * - PDF 대신 HTML 파일 첨부 시스템
 */

import { appConfig } from '@/lib/config/env';

// HTML 보고서 데이터 타입
export interface HtmlReportData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  industry?: string;
  totalScore: number;
  overallGrade: string;
  categoryResults: Array<{
    category: string;
    score: number;
    score100: number;
    targetScore: number;
    gapScore: number;
    strengths: string[];
    weaknesses: string[];
    itemResults: Array<{
      item: string;
      score: number;
      targetScore: number;
      gapScore: number;
    }>;
  }>;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    strategicMatrix?: string;
  };
  recommendedActions: Array<{
    category: string;
    action: string;
    priority: string;
    timeframe: string;
    expectedImpact: string;
    implementationCost: string;
  }>;
  comprehensiveReport: string;
  diagnosisDate: string;
  consultant: {
    name: string;
    phone: string;
    email: string;
  };
  reliabilityScore?: number;
  comparisonMetrics?: any;
}

/**
 * 🎨 완벽한 HTML 보고서 생성 (이메일 첨부용)
 */
export function generatePerfectHTMLForEmail(data: HtmlReportData): string {
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: 'S', description: '최우수', color: '#4285f4' };
    if (score >= 80) return { grade: 'A', description: '우수', color: '#34a853' };
    if (score >= 70) return { grade: 'B', description: '양호', color: '#fbbc04' };
    if (score >= 60) return { grade: 'C', description: '보통', color: '#ff9800' };
    return { grade: 'D', description: '개선필요', color: '#ea4335' };
  };

  const gradeInfo = getGradeInfo(data.totalScore);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI CAMP 이후경 교장의 AI 진단결과보고서 - ${data.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', 'Pretendard', sans-serif;
            line-height: 1.8;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 60px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        .header-content { position: relative; z-index: 1; }
        .logo {
            width: 120px;
            height: 120px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            backdrop-filter: blur(15px);
            border: 3px solid rgba(255,255,255,0.3);
        }
        .header h1 {
            font-size: 3.5rem;
            margin: 0 0 20px 0;
            font-weight: 900;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: -1px;
        }
        .header .subtitle {
            font-size: 1.6rem;
            opacity: 0.95;
            font-weight: 300;
        }
        .content { padding: 80px 60px; }
        
        /* 회사 정보 섹션 */
        .company-info {
            background: linear-gradient(135deg, #f8faff 0%, #e8f4f8 100%);
            padding: 60px;
            border-radius: 25px;
            margin-bottom: 60px;
            border: 2px solid #e1e8ed;
            position: relative;
            overflow: hidden;
        }
        .company-info::before {
            content: '🏢';
            position: absolute;
            top: 30px;
            right: 40px;
            font-size: 5rem;
            opacity: 0.1;
        }
        .company-info h2 {
            color: #2c5aa0;
            margin: 0 0 40px 0;
            font-size: 2.5rem;
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 800;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .info-item {
            background: white;
            padding: 30px;
            border-radius: 18px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-left: 6px solid #4285f4;
            transition: all 0.3s ease;
        }
        .info-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .info-label {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            font-weight: 700;
        }
        .info-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: #333;
        }
        
        /* 종합 점수 섹션 */
        .score-hero {
            background: linear-gradient(135deg, ${gradeInfo.color} 0%, #34a853 100%);
            color: white;
            padding: 100px 80px;
            border-radius: 30px;
            text-align: center;
            margin: 60px 0;
            box-shadow: 0 20px 50px rgba(66, 133, 244, 0.4);
            position: relative;
            overflow: hidden;
        }
        .score-hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
            animation: rotate 25s linear infinite;
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .score-content { position: relative; z-index: 1; }
        .score-big {
            font-size: 7rem;
            font-weight: 900;
            margin: 40px 0;
            text-shadow: 4px 4px 8px rgba(0,0,0,0.3);
            line-height: 1;
        }
        .score-label {
            font-size: 1.8rem;
            opacity: 0.95;
            margin-bottom: 30px;
            font-weight: 400;
        }
        .grade-badge {
            display: inline-block;
            background: rgba(255,255,255,0.25);
            padding: 20px 50px;
            border-radius: 50px;
            font-size: 1.6rem;
            font-weight: 800;
            backdrop-filter: blur(20px);
            border: 3px solid rgba(255,255,255,0.3);
            margin-top: 25px;
        }
        .reliability-score {
            margin-top: 25px;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        /* 카테고리 분석 섹션 */
        .categories-section { margin: 80px 0; }
        .categories-section h2 {
            color: #2c5aa0;
            font-size: 2.8rem;
            margin-bottom: 50px;
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 800;
        }
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
        }
        .category-card {
            background: white;
            padding: 50px;
            border-radius: 25px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            border: 2px solid #f5f5f5;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        .category-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .category-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #4285f4, #34a853);
        }
        .category-title {
            font-size: 1.7rem;
            font-weight: 800;
            color: #333;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .category-score {
            font-size: 3.2rem;
            font-weight: 900;
            color: #4285f4;
            margin-bottom: 25px;
            line-height: 1;
        }
        .score-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            font-size: 1rem;
            color: #666;
        }
        .progress-bar {
            width: 100%;
            height: 15px;
            background: #f0f0f0;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4285f4, #34a853);
            border-radius: 8px;
            transition: width 1s ease;
        }
        .category-insights { margin-top: 30px; }
        .insight-section { margin-bottom: 25px; }
        .insight-title {
            font-size: 1.1rem;
            font-weight: 800;
            margin-bottom: 12px;
            color: #2c5aa0;
        }
        .insight-list {
            list-style: none;
            padding: 0;
        }
        .insight-list li {
            padding: 8px 0;
            font-size: 1rem;
            color: #555;
            position: relative;
            padding-left: 25px;
        }
        .insight-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #4285f4;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        /* SWOT 분석 섹션 */
        .swot-section {
            background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
            padding: 80px;
            border-radius: 30px;
            margin: 80px 0;
            border: 3px solid #ffc107;
        }
        .swot-section h2 {
            color: #e65100;
            font-size: 2.8rem;
            margin-bottom: 50px;
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 800;
        }
        .swot-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-bottom: 50px;
        }
        .swot-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .swot-card h3 {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .swot-card.strengths h3 { color: #2e7d32; }
        .swot-card.weaknesses h3 { color: #d32f2f; }
        .swot-card.opportunities h3 { color: #1976d2; }
        .swot-card.threats h3 { color: #f57c00; }
        .swot-list {
            list-style: none;
            padding: 0;
        }
        .swot-list li {
            padding: 10px 0;
            font-size: 1.1rem;
            line-height: 1.6;
            position: relative;
            padding-left: 30px;
        }
        .swot-card.strengths li::before { content: '💪'; position: absolute; left: 0; }
        .swot-card.weaknesses li::before { content: '⚠️'; position: absolute; left: 0; }
        .swot-card.opportunities li::before { content: '🔆'; position: absolute; left: 0; }
        .swot-card.threats li::before { content: '⚡'; position: absolute; left: 0; }
        
        /* 추천사항 섹션 */
        .recommendations-section {
            background: #f8f9fa;
            padding: 80px;
            border-radius: 30px;
            margin: 80px 0;
            border-left: 12px solid #17a2b8;
        }
        .recommendations-section h2 {
            color: #0c5460;
            font-size: 2.8rem;
            margin-bottom: 50px;
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 800;
        }
        .recommendation-grid {
            display: grid;
            gap: 30px;
        }
        .recommendation-card {
            background: white;
            padding: 45px;
            border-radius: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            border-left: 6px solid #17a2b8;
        }
        .rec-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }
        .rec-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #333;
            margin-bottom: 8px;
        }
        .rec-priority {
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 700;
            text-transform: uppercase;
        }
        .priority-high { background: #ffebee; color: #c62828; }
        .priority-medium { background: #fff3e0; color: #ef6c00; }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
        .rec-description {
            color: #555;
            line-height: 1.7;
            margin-bottom: 20px;
            font-size: 1.1rem;
        }
        .rec-details {
            display: flex;
            gap: 25px;
            font-size: 1rem;
            color: #666;
        }
        
        /* 완벽한 보고서 섹션 */
        .report-section {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 80px;
            border-radius: 30px;
            margin: 80px 0;
            border-left: 12px solid #2196f3;
        }
        .report-section h2 {
            color: #0d47a1;
            font-size: 2.8rem;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 800;
        }
        .report-content {
            background: white;
            padding: 50px;
            border-radius: 20px;
            font-size: 1.2rem;
            line-height: 1.9;
            color: #333;
            white-space: pre-line;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        
        /* 푸터 */
        .footer {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 100px 80px;
            text-align: center;
        }
        .footer h3 {
            font-size: 2.5rem;
            margin-bottom: 25px;
            font-weight: 800;
        }
        .footer p {
            font-size: 1.3rem;
            margin-bottom: 50px;
            opacity: 0.95;
        }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 50px;
            flex-wrap: wrap;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.3rem;
            font-weight: 600;
        }
        .footer-note {
            margin-top: 60px;
            font-size: 1.1rem;
            opacity: 0.85;
            line-height: 1.7;
        }
        
        /* 인쇄 및 반응형 */
        @media print {
            body { padding: 0; background: white; }
            .container { box-shadow: none; }
        }
        @media (max-width: 768px) {
            body { padding: 10px; }
            .content, .header { padding: 40px 25px; }
            .header h1 { font-size: 2.8rem; }
            .score-big { font-size: 5rem; }
            .contact-info { flex-direction: column; gap: 25px; }
            .info-grid, .category-grid, .swot-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <div class="header-content">
                <div class="logo">🎯</div>
                <h1>AI CAMP 이후경 교장의 AI 진단결과보고서</h1>
                <p class="subtitle">AICAMP - 전문 경영진단 시스템</p>
            </div>
        </div>
        
        <div class="content">
            <!-- 회사 정보 -->
            <div class="company-info">
                <h2>🏢 회사 정보</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">회사명</div>
                        <div class="info-value">${data.companyName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">담당자</div>
                        <div class="info-value">${data.contactName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">업종</div>
                        <div class="info-value">${data.industry || 'N/A'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">진단일</div>
                        <div class="info-value">${data.diagnosisDate}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">연락처</div>
                        <div class="info-value">${data.contactPhone || 'N/A'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">처리시간</div>
                        <div class="info-value">실시간 즉시 처리</div>
                    </div>
                </div>
            </div>

            <!-- 종합 점수 -->
            <div class="score-hero">
                <div class="score-content">
                    <div class="score-label">종합 진단 점수</div>
                    <div class="score-big">${data.totalScore}</div>
                    <div class="grade-badge">등급: ${gradeInfo.grade} (${gradeInfo.description})</div>
                    ${data.reliabilityScore ? `<div class="reliability-score">신뢰도: ${data.reliabilityScore}%</div>` : ''}
                </div>
            </div>

            <!-- 5개 카테고리별 상세 분석 -->
            <div class="categories-section">
                <h2>📊 5개 카테고리별 상세 분석</h2>
                <div class="category-grid">
                    ${data.categoryResults.map(category => `
                        <div class="category-card">
                            <div class="category-title">📈 ${category.category}</div>
                            <div class="category-score">${category.score100}/100</div>
                            <div class="score-details">
                                <span>현재: ${category.score100}점</span>
                                <span>목표: ${category.targetScore}점</span>
                                <span>격차: ${category.gapScore}점</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${category.score100}%"></div>
                            </div>
                            <div class="category-insights">
                                ${category.strengths.length > 0 ? `
                                    <div class="insight-section">
                                        <div class="insight-title">주요 강점</div>
                                        <ul class="insight-list">
                                            ${category.strengths.map(strength => `<li>${strength}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${category.weaknesses.length > 0 ? `
                                    <div class="insight-section">
                                        <div class="insight-title">개선 필요사항</div>
                                        <ul class="insight-list">
                                            ${category.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SWOT 전략 분석 -->
            <div class="swot-section">
                <h2>⚡ SWOT 전략 분석</h2>
                <div class="swot-grid">
                    <div class="swot-card strengths">
                        <h3>💪 강점 (Strengths)</h3>
                        <ul class="swot-list">
                            ${data.swotAnalysis.strengths.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="swot-card weaknesses">
                        <h3>⚠️ 약점 (Weaknesses)</h3>
                        <ul class="swot-list">
                            ${data.swotAnalysis.weaknesses.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="swot-card opportunities">
                        <h3>🔆 기회 (Opportunities)</h3>
                        <ul class="swot-list">
                            ${data.swotAnalysis.opportunities.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="swot-card threats">
                        <h3>⚡ 위협 (Threats)</h3>
                        <ul class="swot-list">
                            ${data.swotAnalysis.threats.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                ${data.swotAnalysis.strategicMatrix ? `
                    <div class="swot-matrix">
                        <h3>🎯 SWOT 전략 매트릭스</h3>
                        <div class="matrix-content">${data.swotAnalysis.strategicMatrix}</div>
                    </div>
                ` : ''}
            </div>

            <!-- 맞춤형 개선 추천사항 -->
            <div class="recommendations-section">
                <h2>🎯 맞춤형 개선 추천사항</h2>
                <div class="recommendation-grid">
                    ${data.recommendedActions.map(rec => `
                        <div class="recommendation-card">
                            <div class="rec-header">
                                <div>
                                    <div class="rec-title">${rec.action}</div>
                                    <div style="color: #666; font-size: 1rem;">카테고리: ${rec.category}</div>
                                </div>
                                <div class="rec-priority priority-${rec.priority.toLowerCase()}">
                                    ${rec.priority}
                                </div>
                            </div>
                            <div class="rec-description">${rec.action}</div>
                            <div class="rec-details">
                                <span><strong>기간:</strong> ${rec.timeframe}</span>
                                <span><strong>예상효과:</strong> ${rec.expectedImpact}</span>
                                <span><strong>투자비용:</strong> ${rec.implementationCost}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 상세 진단보고서 -->
            <div class="report-section">
                <h2>📊 완벽한 종합 진단보고서</h2>
                <div class="report-content">${data.comprehensiveReport}</div>
            </div>
        </div>
        
        <!-- 푸터 -->
        <div class="footer">
            <h3>AICAMP AI교육센터</h3>
            <p>전문 경영진단 및 AI 기반 비즈니스 성장 솔루션</p>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📞</span> ${data.consultant.phone}
                </div>
                <div class="contact-item">
                    <span>📧</span> ${data.consultant.email}
                </div>
                <div class="contact-item">
                    <span>🌐</span> https://aicamp-v3-0.vercel.app
                </div>
            </div>
            <div class="footer-note">
                본 보고서는 ${data.consultant.name}의 28년 전문 노하우와 AI 기반 진단시스템이 결합된<br>
                완벽한 경영진단 결과입니다. 추가 상담이나 문의사항은 언제든 연락해주세요.<br><br>
                <strong>© ${new Date().getFullYear()} AICAMP. All rights reserved.</strong>
            </div>
        </div>
    </div>
</body>
</html>`;
}

/**
 * 📧 HTML 첨부파일로 이메일 발송 (Google Apps Script)
 */
export async function sendHtmlAttachmentEmail(reportData: HtmlReportData): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    console.log('📧 HTML 첨부파일 이메일 발송 시작');
    
    // HTML 보고서 생성
    const htmlContent = generatePerfectHTMLForEmail(reportData);
    
    // HTML을 Base64로 인코딩
    const htmlBase64 = Buffer.from(htmlContent, 'utf-8').toString('base64');
    
    // 파일명 생성
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '_');
    const filename = `AI진단보고서_${reportData.companyName}_${timestamp}.html`;
    
    // Google Apps Script로 전송할 데이터 준비
    const requestData = {
      폼타입: 'AI_진단_HTML첨부',
      제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      timestamp: Date.now(),
      
      // 기본 정보
      회사명: reportData.companyName,
      담당자명: reportData.contactName,
      이메일: reportData.contactEmail,
      연락처: reportData.contactPhone,
      업종: reportData.industry,
      
      // 진단 결과
      종합점수: reportData.totalScore,
      종합등급: reportData.overallGrade,
      신뢰도: reportData.reliabilityScore,
      진단일: reportData.diagnosisDate,
      
      // 🆕 HTML 첨부파일 데이터
      html_attachment: htmlBase64,
      html_filename: filename,
      
      // 상담사 정보
      consultant_name: reportData.consultant.name,
      consultant_phone: reportData.consultant.phone,
      consultant_email: reportData.consultant.email
    };

    console.log('📄 HTML 첨부 데이터 준비:', {
      filename,
      htmlSize: Math.round(htmlBase64.length / 1024) + 'KB',
      companyName: reportData.companyName,
      contactEmail: reportData.contactEmail
    });

    // Google Apps Script URL 가져오기
    const googleScriptUrl = appConfig.googleScriptUrl;
    
    if (!googleScriptUrl) {
      throw new Error('Google Apps Script URL이 설정되지 않았습니다.');
    }

    console.log('📤 Google Apps Script로 HTML 첨부 이메일 데이터 전송');

    // POST 방식으로 전송
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.text();
    let parsedResult;
    
    try {
      parsedResult = JSON.parse(result);
    } catch (parseError) {
      console.warn('JSON 파싱 실패, 텍스트 응답:', result);
      parsedResult = { success: true, message: result };
    }

    console.log('✅ HTML 첨부 이메일 발송 완료:', parsedResult);

    return {
      success: true,
      message: `📧 완벽한 HTML 진단보고서가 ${reportData.contactEmail}로 발송되었습니다!`,
      ...parsedResult
    };

  } catch (error) {
    console.error('❌ HTML 첨부 이메일 발송 실패:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    };
  }
}

/**
 * 🔄 진단 완료 후 HTML 첨부 이메일 자동 발송
 */
export async function processDiagnosisWithHtmlAttachment(reportData: HtmlReportData): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    console.log('🎯 진단 완료 후 HTML 첨부 이메일 자동 발송 처리');
    
    // HTML 첨부 이메일 발송
    const emailResult = await sendHtmlAttachmentEmail(reportData);
    
    if (emailResult.success) {
      console.log('✅ HTML 첨부 이메일 자동 발송 성공');
      return {
        success: true,
        message: '🎉 완벽한 HTML 진단보고서가 이메일로 자동 발송되었습니다!'
      };
    } else {
      console.error('❌ HTML 첨부 이메일 자동 발송 실패:', emailResult.error);
      return {
        success: false,
        error: emailResult.error || '이메일 발송 중 오류가 발생했습니다.'
      };
    }
    
  } catch (error) {
    console.error('❌ HTML 첨부 이메일 처리 실패:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '시스템 오류가 발생했습니다.'
    };
  }
} 
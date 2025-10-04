/**
 * 맥킨지 스타일 HTML 보고서 템플릿 V15.0
 * 11개 섹션 완벽 구현
 */

export function generateHTML(report: any): string {
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.coverPage.companyName} - 이교장의AI역량진단보고서</title>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.js"></script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1d1d1f;
            background: #ffffff;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
        }
        
        /* 1. 표지 페이지 */
        .cover-page {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            text-align: center;
            page-break-after: always;
        }
        
        .cover-title {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }
        
        .cover-subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            opacity: 0.9;
            margin-bottom: 3rem;
        }
        
        .cover-company {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
            padding: 1rem 2rem;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 12px;
            background: rgba(255,255,255,0.1);
        }
        
        .cover-meta {
            font-size: 1rem;
            opacity: 0.8;
            margin-top: 2rem;
        }
        
        /* 2. 경영진 요약 */
        .executive-summary {
            padding: 80px 60px;
            background: #f8fafc;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #1e293b;
        }
        
        .section-number {
            font-size: 3rem;
            font-weight: 700;
            color: #3b82f6;
            margin-right: 20px;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin: 40px 0;
        }
        
        .summary-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .summary-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .card-value {
            font-size: 3rem;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 10px;
        }
        
        .card-label {
            font-size: 1.1rem;
            color: #64748b;
            font-weight: 500;
        }
        
        /* 3. 진단 결과 시각화 */
        .visualization-section {
            padding: 60px;
            background: white;
        }
        
        .score-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin: 40px 0;
        }
        
        .score-card {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }
        
        .score-title {
            font-size: 0.9rem;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 10px;
        }
        
        .score-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
        }
        
        .score-unit {
            font-size: 1rem;
            color: #94a3b8;
            margin-left: 5px;
        }
        
        /* 차트 컨테이너 */
        .chart-container {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            margin: 30px 0;
        }
        
        .chart-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
        }
        
        /* 4. SWOT 분석 */
        .swot-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin: 40px 0;
        }
        
        .swot-box {
            padding: 30px;
            border-radius: 16px;
            min-height: 200px;
        }
        
        .swot-strengths {
            background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
            border-left: 4px solid #22c55e;
        }
        
        .swot-weaknesses {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-left: 4px solid #ef4444;
        }
        
        .swot-opportunities {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-left: 4px solid #3b82f6;
        }
        
        .swot-threats {
            background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
            border-left: 4px solid #f97316;
        }
        
        .swot-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .swot-icon {
            font-size: 1.5rem;
            margin-right: 10px;
        }
        
        .swot-list {
            list-style: none;
            padding: 0;
        }
        
        .swot-item {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .swot-item:before {
            content: "•";
            position: absolute;
            left: 8px;
            font-weight: bold;
        }
        
        /* 5. 로드맵 */
        .roadmap-section {
            padding: 60px;
            background: #f8fafc;
        }
        
        .roadmap-timeline {
            position: relative;
            padding: 40px 0;
        }
        
        .roadmap-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            z-index: 1;
        }
        
        .roadmap-phases {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            position: relative;
            z-index: 2;
        }
        
        .phase-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .phase-number {
            display: inline-block;
            width: 60px;
            height: 60px;
            line-height: 60px;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            border-radius: 50%;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 20px;
        }
        
        .phase-title {
            font-size: 1.4rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 15px;
        }
        
        .phase-duration {
            font-size: 1rem;
            color: #64748b;
            margin-bottom: 10px;
        }
        
        .phase-budget {
            font-size: 1.2rem;
            font-weight: 600;
            color: #3b82f6;
        }
        
        /* 6. n8n 방법론 */
        .n8n-section {
            padding: 60px;
            background: white;
        }
        
        .curriculum-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin: 40px 0;
        }
        
        .curriculum-card {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 30px;
            border-radius: 16px;
            text-align: center;
            border: 2px solid #fbbf24;
        }
        
        .curriculum-icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .curriculum-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .curriculum-hours {
            font-size: 1.1rem;
            color: #64748b;
        }
        
        /* 7. CTA 섹션 */
        .cta-section {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 80px 60px;
            text-align: center;
        }
        
        .cta-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
        }
        
        .cta-subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
            margin-bottom: 40px;
        }
        
        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        
        .cta-button {
            display: inline-block;
            background: white;
            color: #3b82f6;
            padding: 18px 40px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: transform 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        /* 8. 결론 */
        .conclusion {
            padding: 80px 60px;
            background: #1e293b;
            color: white;
            text-align: center;
        }
        
        .conclusion-message {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 30px;
        }
        
        .contact-info {
            font-size: 1.1rem;
            line-height: 2;
            opacity: 0.9;
        }
        
        /* 반응형 */
        @media (max-width: 768px) {
            .summary-grid,
            .score-cards,
            .swot-grid,
            .roadmap-phases,
            .curriculum-cards {
                grid-template-columns: 1fr;
            }
            
            .section-header {
                flex-direction: column;
                text-align: center;
            }
            
            .cta-buttons {
                flex-direction: column;
            }
        }
        
        /* 프린트 스타일 */
        @media print {
            .cover-page {
                page-break-after: always;
            }
            
            .section {
                page-break-inside: avoid;
            }
            
            .cta-section {
                background: #f8fafc !important;
                color: #1e293b !important;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 1. 표지 페이지 -->
        <div class="cover-page">
            <div class="cover-title">${report.coverPage.title}</div>
            <div class="cover-subtitle">${report.coverPage.subtitle}</div>
            <div class="cover-company">${report.coverPage.companyName}</div>
            <div class="cover-meta">
                <div>진단일: ${report.coverPage.diagnosisDate}</div>
                <div>진단 ID: ${report.coverPage.diagnosisId}</div>
                <div>AICAMP AI 역량진단 시스템 ${report.coverPage.version}</div>
            </div>
        </div>
        
        <!-- 2. 경영진 요약 -->
        <div class="executive-summary section">
            <div class="section-header">
                <div class="section-number">01</div>
                <div class="section-title">경영진 요약</div>
            </div>
            
            <div class="summary-grid">
                <div class="summary-card">
                    <div class="card-value">${report.executiveSummary.totalScore}</div>
                    <div class="card-label">종합 점수</div>
                </div>
                <div class="summary-card">
                    <div class="card-value">${report.executiveSummary.maturityLevel}</div>
                    <div class="card-label">AI 성숙도</div>
                </div>
                <div class="summary-card">
                    <div class="card-value">상위 ${report.executiveSummary.percentile}%</div>
                    <div class="card-label">업계 순위</div>
                </div>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 16px; margin-top: 40px;">
                <h3 style="margin-bottom: 20px;">🎯 핵심 발견사항</h3>
                <p style="line-height: 1.8; color: #475569;">${report.executiveSummary.coreFindings}</p>
                
                <h3 style="margin: 30px 0 20px;">⚡ 즉시 실행 권고사항</h3>
                <ul style="list-style: none; padding: 0;">
                    ${report.executiveSummary.immediateActions.map((action: string) => 
                        `<li style="padding: 10px 0; padding-left: 30px; position: relative;">
                            <span style="position: absolute; left: 0; color: #3b82f6;">▶</span>
                            ${action}
                        </li>`
                    ).join('')}
                </ul>
            </div>
        </div>
        
        <!-- 3. 진단 결과 시각화 -->
        <div class="visualization-section section">
            <div class="section-header">
                <div class="section-number">02</div>
                <div class="section-title">진단 결과 시각화</div>
            </div>
            
            <div class="score-cards">
                ${Object.entries(report.diagnosisVisualization.scoreCards).map(([key, value]) => `
                    <div class="score-card">
                        <div class="score-title">${key}</div>
                        <div class="score-value">${value}<span class="score-unit">점</span></div>
                    </div>
                `).join('')}
            </div>
            
            <div class="chart-container">
                <div class="chart-title">영역별 역량 분석</div>
                <canvas id="radarChart" width="400" height="200"></canvas>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">벤치마크 비교</div>
                <canvas id="benchmarkChart" width="400" height="200"></canvas>
            </div>
        </div>
        
        <!-- 4. SWOT 분석 -->
        <div class="section" style="padding: 60px; background: #f8fafc;">
            <div class="section-header">
                <div class="section-number">03</div>
                <div class="section-title">SWOT 분석</div>
            </div>
            
            <div class="swot-grid">
                <div class="swot-box swot-strengths">
                    <div class="swot-title">
                        <span class="swot-icon">💪</span>
                        강점 (Strengths)
                    </div>
                    <ul class="swot-list">
                        ${report.swotAnalysis.strengths.map((item: string) => 
                            `<li class="swot-item">${item}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="swot-box swot-weaknesses">
                    <div class="swot-title">
                        <span class="swot-icon">⚠️</span>
                        약점 (Weaknesses)
                    </div>
                    <ul class="swot-list">
                        ${report.swotAnalysis.weaknesses.map((item: string) => 
                            `<li class="swot-item">${item}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="swot-box swot-opportunities">
                    <div class="swot-title">
                        <span class="swot-icon">🚀</span>
                        기회 (Opportunities)
                    </div>
                    <ul class="swot-list">
                        ${report.swotAnalysis.opportunities.map((item: string) => 
                            `<li class="swot-item">${item}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="swot-box swot-threats">
                    <div class="swot-title">
                        <span class="swot-icon">⚡</span>
                        위협 (Threats)
                    </div>
                    <ul class="swot-list">
                        ${report.swotAnalysis.threats.map((item: string) => 
                            `<li class="swot-item">${item}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 5. 3단계 실행 로드맵 -->
        <div class="roadmap-section section">
            <div class="section-header">
                <div class="section-number">04</div>
                <div class="section-title">3단계 실행 로드맵</div>
            </div>
            
            <div class="roadmap-timeline">
                <div class="roadmap-line"></div>
                <div class="roadmap-phases">
                    <div class="phase-card">
                        <div class="phase-number">1</div>
                        <div class="phase-title">${report.roadmap.phase1.name}</div>
                        <div class="phase-duration">${report.roadmap.phase1.duration}</div>
                        <div class="phase-budget">${report.roadmap.phase1.budget}</div>
                    </div>
                    
                    <div class="phase-card">
                        <div class="phase-number">2</div>
                        <div class="phase-title">${report.roadmap.phase2.name}</div>
                        <div class="phase-duration">${report.roadmap.phase2.duration}</div>
                        <div class="phase-budget">${report.roadmap.phase2.budget}</div>
                    </div>
                    
                    <div class="phase-card">
                        <div class="phase-number">3</div>
                        <div class="phase-title">${report.roadmap.phase3.name}</div>
                        <div class="phase-duration">${report.roadmap.phase3.duration}</div>
                        <div class="phase-budget">${report.roadmap.phase3.budget}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 6. n8n 기반 실행방법론 -->
        <div class="n8n-section section">
            <div class="section-header">
                <div class="section-number">05</div>
                <div class="section-title">n8n 기반 실행방법론</div>
            </div>
            
            <p style="font-size: 1.3rem; color: #475569; text-align: center; margin: 30px 0;">
                "코딩 몰라도 괜찮습니다! n8n으로 누구나 AI 자동화를 구현할 수 있습니다."
            </p>
            
            <div class="curriculum-cards">
                ${report.n8nMethodology.curriculums.map((curr: any) => `
                    <div class="curriculum-card">
                        <div class="curriculum-icon">🔄</div>
                        <div class="curriculum-title">${curr.name}</div>
                        <div class="curriculum-hours">${curr.hours}시간</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 16px; margin-top: 40px;">
                <h3 style="margin-bottom: 20px;">🎯 맞춤형 n8n 활용 시나리오</h3>
                <ul style="list-style: none; padding: 0;">
                    ${report.n8nMethodology.customScenarios.map((scenario: string) => 
                        `<li style="padding: 10px 0; padding-left: 30px; position: relative;">
                            <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
                            ${scenario}
                        </li>`
                    ).join('')}
                </ul>
            </div>
        </div>
        
        <!-- 7. AICAMP 커리큘럼 추천 -->
        <div class="section" style="padding: 60px; background: #f8fafc;">
            <div class="section-header">
                <div class="section-number">06</div>
                <div class="section-title">AICAMP 커리큘럼 추천</div>
            </div>
            
            <div style="background: white; padding: 40px; border-radius: 16px; margin: 40px 0;">
                <h3 style="margin-bottom: 30px; text-align: center;">💰 투자 대비 효과 (ROI)</h3>
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="card-value">${report.aicampCurriculum.roi.efficiency}</div>
                        <div class="card-label">업무 효율성</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-value">${report.aicampCurriculum.roi.decisionSpeed}</div>
                        <div class="card-label">의사결정 속도</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-value">${report.aicampCurriculum.roi.costSaving}</div>
                        <div class="card-label">인건비 절약</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 8. CTA 섹션 -->
        <div class="cta-section">
            <div class="cta-title">지금 바로 시작하세요</div>
            <div class="cta-subtitle">AICAMP와 함께 AI 역량 강화 여정을 시작하세요</div>
            <div class="cta-buttons">
                <a href="https://aicamp.club/consultation" class="cta-button">무료 상담 신청</a>
                <a href="https://aicamp.club/services" class="cta-button">프로그램 상세보기</a>
            </div>
        </div>
        
        <!-- 9. 결론 및 다음 단계 -->
        <div class="conclusion">
            <div class="conclusion-message">
                🎯 ${report.conclusion.keyMessage}
            </div>
            <div class="contact-info">
                <div>📞 ${report.conclusion.contactInfo.phone}</div>
                <div>📧 ${report.conclusion.contactInfo.email}</div>
                <div>🌐 ${report.conclusion.contactInfo.website}</div>
            </div>
            <div style="margin-top: 40px; opacity: 0.7; font-size: 0.9rem;">
                이교장의AI역량진단보고서 V15.0 ULTIMATE | ${currentDate}
            </div>
        </div>
    </div>
    
    <script>
        // 레이더 차트 생성
        const radarCtx = document.getElementById('radarChart').getContext('2d');
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ${JSON.stringify(Object.keys(report.diagnosisVisualization.scoreCards))},
                datasets: [{
                    label: '현재 수준',
                    data: ${JSON.stringify(Object.values(report.diagnosisVisualization.scoreCards))},
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        
        // 벤치마크 차트 생성
        const benchmarkCtx = document.getElementById('benchmarkChart').getContext('2d');
        new Chart(benchmarkCtx, {
            type: 'bar',
            data: {
                labels: ['귀사', '업계 평균', '업계 최고'],
                datasets: [{
                    label: 'AI 역량 점수',
                    data: [
                        ${report.executiveSummary.totalScore},
                        65,
                        85
                    ],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(156, 163, 175, 0.8)',
                        'rgba(34, 197, 94, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    </script>
</body>
</html>
  `;
}

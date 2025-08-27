/**
 * HTML 보고서 생성기 - 실제 진단 점수 반영
 */

export interface DiagnosisData {
  diagnosisId: string;
  companyInfo: {
    companyName: string;
    contactName: string;
    contactEmail: string;
    industry: string;
    employeeCount: string;
  };
  scores: {
    totalScore: number;
    categoryScores: {
      businessFoundation: number;
      currentAIUsage: number;
      organizationalReadiness: number;
      technicalInfrastructure: number;
      goalClarity: number;
      executionCapability: number;
    };
  };
  recommendations: string[];
  maturityLevel: string;
  grade: string;
  createdAt: string;
}

export class HTMLReportGenerator {
  /**
   * 실제 진단 데이터를 기반으로 HTML 보고서 생성
   */
  static generateReport(data: DiagnosisData): string {
    // 안전한 기본값 설정
    const categoryScores = data.scores?.categoryScores || {
      businessFoundation: 3.0,
      currentAIUsage: 3.0,
      organizationalReadiness: 3.0,
      technicalInfrastructure: 3.0,
      goalClarity: 3.0,
      executionCapability: 3.0
    };
    const totalScore = data.scores?.totalScore || 3.0;
    const grade = this.calculateGrade(totalScore);
    const maturityLevel = this.calculateMaturityLevel(totalScore);
    
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AICAMP AI역량진단보고서 V21.2 - ${data.diagnosisId}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --aicamp-primary-blue: #0066ff;
            --aicamp-primary-green: #00c851;
            --aicamp-primary-gray: #1a1a1a;
            --gradient-primary: linear-gradient(135deg, #0066ff 0%, #00c851 100%);
            --shadow-light: 0 2px 20px rgba(0, 0, 0, 0.04);
            --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
            --shadow-heavy: 0 20px 60px rgba(0, 0, 0, 0.15);
            --transition-normal: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Pretendard', -apple-system, sans-serif;
            line-height: 1.7;
            color: var(--aicamp-primary-gray);
            background: #ffffff;
            padding: 20px;
        }
        
        .report-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: var(--shadow-heavy);
            overflow: hidden;
        }
        
        .report-header {
            background: var(--gradient-primary);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        
        .report-title {
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 20px;
        }
        
        .report-subtitle {
            font-size: 1.5rem;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        
        .company-showcase {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 40px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
            align-items: center;
        }
        
        .company-info h3 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 20px;
        }
        
        .company-details {
            font-size: 1.1rem;
            line-height: 2;
            opacity: 0.95;
        }
        
        .score-display {
            text-align: center;
        }
        
        .main-score {
            font-size: 4rem;
            font-weight: 900;
            margin-bottom: 10px;
        }
        
        .score-label {
            font-size: 1.3rem;
            opacity: 0.9;
        }
        
        .report-body {
            padding: 60px 40px;
        }
        
        .section {
            margin-bottom: 60px;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--gradient-primary);
            border-radius: 2px;
        }
        
        .score-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 40px 0;
        }
        
        .score-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: var(--shadow-light);
            border: 1px solid rgba(0, 0, 0, 0.08);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .score-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--gradient-primary);
        }
        
        .score-value {
            font-size: 3rem;
            font-weight: 900;
            margin: 15px 0;
        }
        
        .score-category {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--aicamp-primary-gray);
            margin-bottom: 10px;
        }
        
        .score-comparison {
            font-size: 0.9rem;
            color: #666;
        }
        
        .recommendations {
            background: #f8fafc;
            border-radius: 20px;
            padding: 40px;
            margin: 40px 0;
            border: 1px solid rgba(0, 102, 255, 0.2);
        }
        
        .recommendations h3 {
            font-size: 2rem;
            font-weight: 800;
            color: var(--aicamp-primary-blue);
            margin-bottom: 25px;
        }
        
        .recommendations ul {
            list-style: none;
            padding: 0;
        }
        
        .recommendations li {
            margin-bottom: 15px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            border-left: 4px solid var(--aicamp-primary-blue);
            position: relative;
            padding-left: 25px;
        }
        
        .recommendations li::before {
            content: '▶';
            position: absolute;
            left: 15px;
            color: var(--aicamp-primary-blue);
            font-size: 0.8rem;
        }
        
        .chart-container {
            background: white;
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
            box-shadow: var(--shadow-light);
            border: 1px solid rgba(0, 0, 0, 0.08);
        }
        
        .chart-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--aicamp-primary-gray);
            margin-bottom: 20px;
            text-align: center;
        }
        
        .chart-wrapper {
            position: relative;
            height: 400px;
            margin: 20px 0;
        }
        
        .download-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: var(--gradient-primary);
            border-radius: 20px;
            color: white;
        }
        
        .download-btn {
            display: inline-block;
            background: white;
            color: var(--aicamp-primary-blue);
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            margin: 10px;
            cursor: pointer;
            border: none;
        }
        
        .contact-section {
            background: #f8fafc;
            border-radius: 20px;
            padding: 40px;
            margin-top: 40px;
            border: 1px solid rgba(0, 102, 255, 0.2);
            text-align: center;
        }
        
        .contact-section h3 {
            font-size: 2rem;
            font-weight: 800;
            color: var(--aicamp-primary-blue);
            margin-bottom: 20px;
        }
        
        .contact-info {
            font-size: 1.2rem;
            line-height: 2;
            color: #4a5568;
        }
        
        @media (max-width: 768px) {
            body { padding: 10px; }
            .report-header { padding: 40px 20px; }
            .report-title { font-size: 2.5rem; }
            .company-showcase { 
                grid-template-columns: 1fr; 
                text-align: center; 
                gap: 20px;
            }
            .report-body { padding: 40px 20px; }
            .section-title { font-size: 2rem; }
            .score-grid { grid-template-columns: 1fr; }
        }
        
        @media print {
            body { padding: 0; }
            .report-container { box-shadow: none; }
            .download-section { display: none; }
            .score-card { break-inside: avoid; }
            .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <h1 class="report-title">AICAMP AI 역량진단 보고서</h1>
            <p class="report-subtitle">제조업 업종 벤치마크 기반 정밀 진단 V21.2</p>
            <div class="company-showcase">
                <div class="company-info">
                    <h3>${data.companyInfo.companyName}</h3>
                    <div class="company-details">
                        <p><strong>진단 ID:</strong> ${data.diagnosisId}</p>
                        <p><strong>담당자:</strong> ${data.companyInfo.contactName}</p>
                        <p><strong>이메일:</strong> ${data.companyInfo.contactEmail}</p>
                        <p><strong>업종:</strong> ${data.companyInfo.industry}</p>
                        <p><strong>직원 수:</strong> ${data.companyInfo.employeeCount}</p>
                        <p><strong>진단일:</strong> ${new Date(data.createdAt).toLocaleDateString('ko-KR')}</p>
                    </div>
                </div>
                <div class="score-display">
                    <div class="main-score">${(totalScore || 0).toFixed(1)}</div>
                    <div class="score-label">종합 점수 / 5.0</div>
                    <div style="margin-top: 20px; font-size: 1.4rem;">
                        등급: <strong>${grade} (${this.getGradeDescription(grade)})</strong>
                    </div>
                </div>
            </div>
        </div>

        <div class="report-body">
            <div class="section">
                <h2 class="section-title">📊 6대 영역 종합 분석</h2>
                <div class="score-grid">
                    <div class="score-card">
                        <div class="score-category">사업기반</div>
                        <div class="score-value" style="color: ${this.getScoreColor(categoryScores.businessFoundation || 0)};">${(categoryScores.businessFoundation || 0).toFixed(1)}</div>
                        <div class="score-comparison">업종 평균: 3.5 (${this.getComparisonText(categoryScores.businessFoundation || 0, 3.5)})</div>
                    </div>
                    <div class="score-card">
                        <div class="score-category">AI활용</div>
                        <div class="score-value" style="color: ${this.getScoreColor(categoryScores.currentAIUsage || 0)};">${(categoryScores.currentAIUsage || 0).toFixed(1)}</div>
                        <div class="score-comparison">업종 평균: 2.8 (${this.getComparisonText(categoryScores.currentAIUsage || 0, 2.8)})</div>
                    </div>
                    <div class="score-card">
                        <div class="score-category">조직준비도</div>
                        <div class="score-value" style="color: ${this.getScoreColor(categoryScores.organizationalReadiness || 0)};">${(categoryScores.organizationalReadiness || 0).toFixed(1)}</div>
                        <div class="score-comparison">업종 평균: 3.2 (${this.getComparisonText(categoryScores.organizationalReadiness, 3.2)})</div>
                    </div>
                    <div class="score-card">
                        <div class="score-category">기술인프라</div>
                        <div class="score-value" style="color: ${this.getScoreColor(categoryScores.technicalInfrastructure || 0)};">${(categoryScores.technicalInfrastructure || 0).toFixed(1)}</div>
                        <div class="score-comparison">업종 평균: 3.0 (${this.getComparisonText(categoryScores.technicalInfrastructure, 3.0)})</div>
                    </div>
                    <div class="score-card">
                        <div class="score-category">목표명확성</div>
                        <div class="score-value" style="color: ${this.getScoreColor(categoryScores.goalClarity || 0)};">${(categoryScores.goalClarity || 0).toFixed(1)}</div>
                        <div class="score-comparison">업종 평균: 3.1 (${this.getComparisonText(categoryScores.goalClarity, 3.1)})</div>
                    </div>
                    <div class="score-card">
                        <div class="score-category">실행역량</div>
                        <div class="score-value" style="color: ${this.getScoreColor(categoryScores.executionCapability || 0)};">${(categoryScores.executionCapability || 0).toFixed(1)}</div>
                        <div class="score-comparison">업종 평균: 3.3 (${this.getComparisonText(categoryScores.executionCapability, 3.3)})</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">🎯 AI 성숙도 레벨</h2>
                <div style="text-align: center; margin: 40px 0;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">${this.getMaturityIcon(maturityLevel)}</div>
                    <h3 style="font-size: 2.5rem; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 15px; font-weight: 900;">
                        ${maturityLevel}
                    </h3>
                    <p style="font-size: 1.5rem; color: #666;">${this.getMaturityDescription(maturityLevel)}</p>
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-title">📈 6대 영역 레이더 차트</div>
                <div class="chart-wrapper">
                    <canvas id="radarChart"></canvas>
                </div>
            </div>

            <div class="recommendations">
                <h3>🎯 맞춤형 개선 권고사항</h3>
                <ul>
                    ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="download-section">
                <h3 style="margin-bottom: 20px;">📥 보고서 다운로드</h3>
                <p style="margin-bottom: 25px;">이 보고서를 HTML 형태로 다운로드하여 보관하세요.</p>
                <button onclick="downloadHTMLReport()" class="download-btn">🌐 HTML 다운로드</button>
                <button onclick="window.print()" class="download-btn">🖨️ 인쇄하기</button>
            </div>

            <div class="contact-section">
                <h3>📞 상담 문의</h3>
                <div class="contact-info">
                    <p><strong>이후경 교장 (AICAMP 대표)</strong></p>
                    <p>📧 hongik423@gmail.com | 🌐 https://aicamp.club</p>
                    <p style="margin-top: 15px; font-size: 1.3rem; color: var(--aicamp-primary-blue);">
                        <strong>30분 무료 AI 전략 상담으로 시작하세요!</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 진단 데이터 저장
        window.diagnosisData = ${JSON.stringify(data)};
        
        // 레이더 차트 초기화
        document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('radarChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['사업기반', 'AI활용', '조직준비도', '기술인프라', '목표명확성', '실행역량'],
                        datasets: [{
                            label: '${data.companyInfo.companyName}',
                            data: [
                                ${categoryScores.businessFoundation},
                                ${categoryScores.currentAIUsage},
                                ${categoryScores.organizationalReadiness},
                                ${categoryScores.technicalInfrastructure},
                                ${categoryScores.goalClarity},
                                ${categoryScores.executionCapability}
                            ],
                            backgroundColor: 'rgba(0, 102, 255, 0.2)',
                            borderColor: 'rgba(0, 102, 255, 1)',
                            borderWidth: 3,
                            pointBackgroundColor: 'rgba(0, 102, 255, 1)',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6
                        }, {
                            label: '업종 평균',
                            data: [3.5, 2.8, 3.2, 3.0, 3.1, 3.3],
                            backgroundColor: 'rgba(200, 200, 200, 0.2)',
                            borderColor: 'rgba(200, 200, 200, 1)',
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(200, 200, 200, 1)',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: { size: 14, weight: 'bold' },
                                    padding: 20
                                }
                            }
                        },
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 5,
                                ticks: {
                                    stepSize: 1,
                                    font: { size: 12 }
                                },
                                pointLabels: {
                                    font: { size: 14, weight: 'bold' }
                                }
                            }
                        }
                    }
                });
            }
        });
        
        // HTML 보고서 다운로드 기능
        function downloadHTMLReport() {
            const htmlContent = document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`AICAMP_AI역량진단보고서_\${window.diagnosisData.companyInfo.companyName}_\${window.diagnosisData.diagnosisId}_\${new Date().toISOString().split('T')[0]}.html\`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // 인쇄 최적화
        window.addEventListener('beforeprint', function() {
            document.querySelector('.download-section').style.display = 'none';
        });
        
        window.addEventListener('afterprint', function() {
            document.querySelector('.download-section').style.display = 'block';
        });
    </script>
</body>
</html>`;
  }

  /**
   * 등급 계산
   */
  private static calculateGrade(score: number): string {
    if (score >= 4.5) return 'S';
    if (score >= 4.0) return 'A';
    if (score >= 3.5) return 'B';
    if (score >= 3.0) return 'C';
    if (score >= 2.0) return 'D';
    return 'F';
  }

  /**
   * 성숙도 레벨 계산
   */
  private static calculateMaturityLevel(score: number): string {
    if (score >= 4.5) return 'Level 5: AI 선도기업';
    if (score >= 4.0) return 'Level 4: AI 활용기업';
    if (score >= 3.0) return 'Level 3: AI 도입기업';
    if (score >= 2.0) return 'Level 2: AI 준비기업';
    return 'Level 1: AI 도입 전';
  }

  /**
   * 등급 설명
   */
  private static getGradeDescription(grade: string): string {
    const descriptions = {
      'S': '최우수',
      'A': '우수',
      'B': '양호',
      'C': '보통',
      'D': '미흡',
      'F': '부족'
    };
    return descriptions[grade as keyof typeof descriptions] || '보통';
  }

  /**
   * 점수 색상
   */
  private static getScoreColor(score: number): string {
    if (score >= 4.0) return '#10b981';
    if (score >= 3.0) return '#3b82f6';
    if (score >= 2.0) return '#f59e0b';
    return '#ef4444';
  }

  /**
   * 비교 텍스트
   */
  private static getComparisonText(score: number, average: number): string {
    const diff = ((score - average) / average * 100);
    if (diff > 0) {
      return `+${diff.toFixed(1)}%`;
    } else {
      return `${diff.toFixed(1)}%`;
    }
  }

  /**
   * 성숙도 아이콘
   */
  private static getMaturityIcon(level: string): string {
    if (level.includes('Level 5')) return '🏆🏆🏆🏆🏆';
    if (level.includes('Level 4')) return '⭐⭐⭐⭐';
    if (level.includes('Level 3')) return '⭐⭐⭐';
    if (level.includes('Level 2')) return '⭐⭐';
    return '⭐';
  }

  /**
   * 성숙도 설명
   */
  private static getMaturityDescription(level: string): string {
    if (level.includes('Level 5')) return 'AI를 전략적으로 활용하는 선도기업';
    if (level.includes('Level 4')) return 'AI를 적극적으로 활용하는 기업';
    if (level.includes('Level 3')) return 'AI를 본격적으로 도입한 기업';
    if (level.includes('Level 2')) return 'AI 도입을 준비하는 기업';
    return 'AI 도입을 검토하는 기업';
  }

  /**
   * 보고서 메타데이터 생성
   */
  static generateReportMetadata(data: DiagnosisData) {
    return {
      diagnosisId: data.diagnosisId,
      companyName: data.companyInfo.companyName,
      fileName: `AICAMP_AI역량진단보고서_${data.companyInfo.companyName}_${data.diagnosisId}_${new Date().toISOString().split('T')[0]}.html`,
      createdAt: data.createdAt,
      version: 'V21.2',
      totalScore: data.scores.totalScore,
      grade: this.calculateGrade(data.scores.totalScore),
      maturityLevel: this.calculateMaturityLevel(data.scores.totalScore),
      fileSize: 0 // 생성 후 계산
    };
  }
}
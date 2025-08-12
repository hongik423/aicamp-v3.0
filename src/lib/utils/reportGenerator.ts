import { DiagnosisReport } from '@/features/ai-diagnosis/types';

interface ReportGeneratorOptions {
  includeCharts: boolean;
  includeDetailedAnalysis: boolean;
  format: 'premium' | 'standard';
}

export class ReportGenerator {
  private result: DiagnosisReport;
  private options: ReportGeneratorOptions;

  constructor(result: DiagnosisReport, options: ReportGeneratorOptions = {
    includeCharts: true,
    includeDetailedAnalysis: true,
    format: 'premium'
  }) {
    this.result = result;
    this.options = options;
  }

  // 카테고리 이름 매핑
  private getCategoryName(category: string): string {
    const categoryNames: Record<string, string> = {
      leadership: '경영진 리더십',
      infrastructure: 'AI 인프라',
      employeeCapability: '직원 역량',
      culture: '조직 문화',
      practicalApplication: '실무 적용',
      dataCapability: '데이터 역량'
    };
    return categoryNames[category] || category;
  }

  // 등급별 색상 및 설명
  private getGradeInfo(grade: string) {
    const gradeInfo: Record<string, { color: string; description: string; bgColor: string }> = {
      'S': { color: '#8b5cf6', description: '최우수 등급', bgColor: '#f3e8ff' },
      'A': { color: '#3b82f6', description: '우수 등급', bgColor: '#dbeafe' },
      'B': { color: '#10b981', description: '양호 등급', bgColor: '#d1fae5' },
      'C': { color: '#f59e0b', description: '보통 등급', bgColor: '#fef3c7' },
      'D': { color: '#f97316', description: '미흡 등급', bgColor: '#fed7aa' },
      'F': { color: '#ef4444', description: '개선 필요', bgColor: '#fecaca' }
    };
    return gradeInfo[grade] || gradeInfo['C'];
  }

  // CSS 스타일 생성
  private generateCSS(): string {
    return `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          margin: 0;
          padding: 20px;
        }
        
        .report-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #1e293b 0%, #475569 50%, #334155 100%);
          color: white;
          padding: 60px 40px;
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
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }
        
        .header-content {
          position: relative;
          z-index: 1;
        }
        
        .company-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .report-title {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-bottom: 20px;
        }
        
        .grade-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          font-size: 4rem;
          font-weight: 900;
          margin: 20px 0;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .report-date {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .content {
          padding: 40px;
        }
        
        .section {
          margin-bottom: 40px;
          padding: 30px;
          border-radius: 15px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid #3b82f6;
        }
        
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .summary-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
        }
        
        .summary-card h3 {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 10px;
        }
        
        .summary-card .value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 5px;
        }
        
        .summary-card .description {
          font-size: 0.9rem;
          color: #9ca3af;
        }
        
        .category-scores {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .category-item {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .category-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .category-name {
          font-weight: 600;
          color: #374151;
        }
        
        .category-score {
          font-size: 1.2rem;
          font-weight: 700;
          color: #3b82f6;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }
        
        .swot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .swot-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .swot-card.strengths {
          border-left: 4px solid #10b981;
        }
        
        .swot-card.weaknesses {
          border-left: 4px solid #f59e0b;
        }
        
        .swot-card.opportunities {
          border-left: 4px solid #3b82f6;
        }
        
        .swot-card.threats {
          border-left: 4px solid #ef4444;
        }
        
        .swot-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .swot-title.strengths { color: #059669; }
        .swot-title.weaknesses { color: #d97706; }
        .swot-title.opportunities { color: #2563eb; }
        .swot-title.threats { color: #dc2626; }
        
        .swot-list {
          list-style: none;
          padding: 0;
        }
        
        .swot-list li {
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
          position: relative;
          padding-left: 20px;
        }
        
        .swot-list li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: #6b7280;
          font-weight: bold;
        }
        
        .recommendations {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          padding: 30px;
          border-radius: 15px;
          margin-top: 20px;
        }
        
        .recommendation-item {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          position: relative;
          padding-left: 60px;
        }
        
        .recommendation-number {
          position: absolute;
          left: 20px;
          top: 20px;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .footer {
          background: #f8fafc;
          padding: 30px 40px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 10px;
        }
        
        .footer-text {
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        @media print {
          body { padding: 0; }
          .report-container { box-shadow: none; }
        }
      </style>
    `;
  }

  // 프리미엄 보고서 HTML 생성
  private generatePremiumHTML(): string {
    const gradeInfo = this.getGradeInfo(this.result.grade);
    
    return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.result.companyName} AI 역량진단 보고서</title>
        ${this.generateCSS()}
      </head>
      <body>
        <div class="report-container">
          <!-- 헤더 -->
          <div class="header">
            <div class="header-content">
              <div class="company-name">${this.result.companyName}</div>
              <div class="report-title">AI 역량진단 보고서</div>
              <div class="grade-circle" style="background: ${gradeInfo.color};">
                ${this.result.grade}
              </div>
              <div class="report-date">
                Generated by AICAMP • ${new Date(this.result.submittedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          <!-- 메인 컨텐츠 -->
          <div class="content">
            <!-- 경영진 요약 -->
            <div class="section">
              <h2 class="section-title">📊 경영진 요약</h2>
              
              <div class="summary-grid">
                <div class="summary-card">
                  <h3>종합 점수</h3>
                  <div class="value">${this.result.totalScore}점</div>
                  <div class="description">${gradeInfo.description}</div>
                </div>
                
                <div class="summary-card">
                  <h3>업계 순위</h3>
                  <div class="value">상위 ${this.result.benchmarkAnalysis.percentile}%</div>
                  <div class="description">${this.result.benchmarkAnalysis.competitivePosition}</div>
                </div>
                
                <div class="summary-card">
                  <h3>개선 여지</h3>
                  <div class="value">${Math.abs(this.result.benchmarkAnalysis.gap)}점</div>
                  <div class="description">업계 평균 대비</div>
                </div>
              </div>

              <!-- 영역별 점수 -->
              <h3 style="margin-top: 30px; margin-bottom: 15px; color: #374151;">영역별 AI 역량 점수</h3>
              <div class="category-scores">
                ${Object.entries(this.result.categoryScores).map(([category, score]) => `
                  <div class="category-item">
                    <div class="category-header">
                      <span class="category-name">${this.getCategoryName(category)}</span>
                      <span class="category-score">${score.toFixed(1)}/5.0</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${(score / 5) * 100}%"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- SWOT 분석 -->
            <div class="section">
              <h2 class="section-title">🎯 SWOT 분석</h2>
              
              <div class="swot-grid">
                <div class="swot-card strengths">
                  <h3 class="swot-title strengths">💪 강점 (Strengths)</h3>
                  <ul class="swot-list">
                    ${this.result.swotAnalysis.strengths.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
                
                <div class="swot-card weaknesses">
                  <h3 class="swot-title weaknesses">⚠️ 약점 (Weaknesses)</h3>
                  <ul class="swot-list">
                    ${this.result.swotAnalysis.weaknesses.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
                
                <div class="swot-card opportunities">
                  <h3 class="swot-title opportunities">🚀 기회 (Opportunities)</h3>
                  <ul class="swot-list">
                    ${this.result.swotAnalysis.opportunities.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
                
                <div class="swot-card threats">
                  <h3 class="swot-title threats">⚡ 위협 (Threats)</h3>
                  <ul class="swot-list">
                    ${this.result.swotAnalysis.threats.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>

            <!-- 전략적 권고사항 -->
            <div class="section">
              <h2 class="section-title">💡 전략적 권고사항</h2>
              
              <div class="recommendations">
                ${this.result.strategies.SO.concat(this.result.strategies.WO).slice(0, 5).map((recommendation, index) => `
                  <div class="recommendation-item">
                    <div class="recommendation-number">${index + 1}</div>
                    <div>${recommendation}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 실행 로드맵 -->
            <div class="section">
              <h2 class="section-title">🗓️ 실행 로드맵</h2>
              
              <div style="margin-top: 20px;">
                <h4 style="color: #dc2626; margin-bottom: 15px;">🔥 즉시 실행 (0-3개월)</h4>
                <ul style="margin-bottom: 25px; padding-left: 20px;">
                  ${this.result.roadmap.immediate.map(item => `<li style="margin-bottom: 8px;"><strong>${item.title}</strong>: ${item.description}</li>`).join('')}
                </ul>
                
                <h4 style="color: #f59e0b; margin-bottom: 15px;">⚡ 단기 목표 (3-6개월)</h4>
                <ul style="margin-bottom: 25px; padding-left: 20px;">
                  ${this.result.roadmap.shortTerm.map(item => `<li style="margin-bottom: 8px;"><strong>${item.title}</strong>: ${item.description}</li>`).join('')}
                </ul>
                
                <h4 style="color: #3b82f6; margin-bottom: 15px;">🎯 장기 비전 (6개월 이상)</h4>
                <ul style="padding-left: 20px;">
                  ${this.result.roadmap.longTerm.map(item => `<li style="margin-bottom: 8px;"><strong>${item.title}</strong>: ${item.description}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- 푸터 -->
          <div class="footer">
            <div class="footer-logo">AICAMP</div>
            <div class="footer-text">
              AI 역량진단 전문 서비스 • https://aicamp.club<br>
              본 보고서는 AICAMP의 독점 AI 분석 엔진을 통해 생성되었습니다.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // HTML 보고서 생성 (메인 메서드)
  public generateHTML(): string {
    if (this.options.format === 'premium') {
      return this.generatePremiumHTML();
    }
    
    // 표준 보고서도 프리미엄과 동일하게 처리
    return this.generatePremiumHTML();
  }

  // 파일명 생성
  public generateFileName(): string {
    const date = new Date().toISOString().split('T')[0];
    const companyName = this.result.companyName.replace(/[^\w\s가-힣]/gi, '');
    return `${companyName}_AI역량진단보고서_${date}.html`;
  }
}
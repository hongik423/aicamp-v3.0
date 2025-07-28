/**
 * 🎨 AI 진단 보고서 생성 및 변환 유틸리티
 * 
 * 📊 기능:
 * - HTML to Image 변환
 * - HTML to PDF 변환  
 * - 시각적 보고서 템플릿 생성
 * - 이메일용 HTML 템플릿 생성
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export interface DiagnosisData {
  companyName: string;
  industry: string;
  contactName: string;
  email: string;
  totalScore: number;
  categoryScores: {
    [key: string]: number;
  };
  recommendations: string;
  timestamp: string;
}

export interface ReportStyle {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  logoUrl?: string;
}

const DEFAULT_STYLE: ReportStyle = {
  primaryColor: '#4285f4',
  secondaryColor: '#34a853', 
  backgroundColor: '#ffffff',
  fontFamily: "'Pretendard', 'Malgun Gothic', sans-serif"
};

/**
 * 🎨 시각적 진단 보고서 생성 클래스
 */
export class VisualReportGenerator {
  private style: ReportStyle;
  
  constructor(customStyle?: Partial<ReportStyle>) {
    this.style = { ...DEFAULT_STYLE, ...customStyle };
  }

  /**
   * 📊 HTML 보고서 템플릿 생성
   */
  generateHTMLReport(data: DiagnosisData): string {
    const gradeInfo = this.getGradeInfo(data.totalScore);
    
    return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 진단 보고서 - ${data.companyName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: ${this.style.fontFamily}; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
          }
          
          .report-container {
            max-width: 800px;
            margin: 0 auto;
            background: ${this.style.backgroundColor};
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, ${this.style.primaryColor} 0%, ${this.style.secondaryColor} 100%);
            color: white;
            padding: 40px 30px;
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          
          .header-content {
            position: relative;
            z-index: 1;
          }
          
          .logo {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          
          .company-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          
          .report-title {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 5px;
          }
          
          .report-date {
            font-size: 14px;
            opacity: 0.8;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .score-section {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #f8faff 0%, #e8f4f8 100%);
            border-radius: 15px;
            position: relative;
          }
          
          .score-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: conic-gradient(${this.style.primaryColor} ${data.totalScore * 3.6}deg, #e5e7eb 0deg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            position: relative;
          }
          
          .score-inner {
            width: 120px;
            height: 120px;
            background: white;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          
          .score-number {
            font-size: 36px;
            font-weight: 700;
            color: ${this.style.primaryColor};
            line-height: 1;
          }
          
          .score-text {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }
          
          .grade-badge {
            display: inline-block;
            padding: 8px 20px;
            background: ${gradeInfo.color};
            color: white;
            border-radius: 25px;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 10px;
          }
          
          .grade-description {
            color: #666;
            font-size: 14px;
          }
          
          .categories-section {
            margin-bottom: 40px;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
          }
          
          .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
          
          .category-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #f0f0f0;
            transition: all 0.3s ease;
          }
          
          .category-card:hover {
            border-color: ${this.style.primaryColor};
            transform: translateY(-2px);
          }
          
          .category-name {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
          }
          
          .category-score {
            font-size: 24px;
            font-weight: 700;
            color: ${this.style.primaryColor};
          }
          
          .category-bar {
            width: 100%;
            height: 6px;
            background: #e5e7eb;
            border-radius: 3px;
            margin-top: 10px;
            overflow: hidden;
          }
          
          .category-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, ${this.style.primaryColor}, ${this.style.secondaryColor});
            transition: width 0.8s ease;
          }
          
          .recommendations-section {
            background: #f8faff;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
          }
          
          .recommendations-text {
            line-height: 1.6;
            color: #444;
            font-size: 14px;
          }
          
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            color: #666;
            font-size: 12px;
          }
          
          .contact-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          
          .contact-item {
            display: inline-block;
            margin: 0 15px;
          }
          
          @media print {
            body { background: white; padding: 0; }
            .report-container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="report-container" id="diagnosis-report">
          <div class="header">
            <div class="header-content">
              <div class="logo">🎯</div>
              <div class="company-name">${data.companyName}</div>
              <div class="report-title">AI 무료진단 결과보고서</div>
              <div class="report-date">${new Date(data.timestamp).toLocaleDateString('ko-KR')} 발행</div>
            </div>
          </div>
          
          <div class="content">
            <div class="score-section">
              <div class="score-circle">
                <div class="score-inner">
                  <div class="score-number">${data.totalScore}</div>
                  <div class="score-text">점 / 100점</div>
                </div>
              </div>
              <div class="grade-badge" style="background: ${gradeInfo.color}">${gradeInfo.grade}등급</div>
              <div class="grade-description">${gradeInfo.description}</div>
            </div>
            
            <div class="categories-section">
              <h3 class="section-title">📊 영역별 진단 결과</h3>
              <div class="category-grid">
                ${Object.entries(data.categoryScores).map(([category, score]) => `
                  <div class="category-card">
                    <div class="category-name">${this.getCategoryName(category)}</div>
                    <div class="category-score">${score.toFixed(1)}점</div>
                    <div class="category-bar">
                      <div class="category-bar-fill" style="width: ${(score / 5) * 100}%"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="recommendations-section">
              <h3 class="section-title">💡 개선 권장사항</h3>
              <div class="recommendations-text">
                ${data.recommendations.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong>AICAMP AI교육센터</strong> | AI기반 비즈니스 성장 솔루션
            </div>
            <div class="contact-info">
              <div class="contact-item">📞 010-9251-9743</div>
              <div class="contact-item">📧 hongik423@gmail.com</div>
              <div class="contact-item">👨‍💼 이후경 경영지도사</div>
            </div>
            <div style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
              본 보고서는 AI 분석을 통해 생성되었으며, 참고용으로 활용해주시기 바랍니다.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * 🏆 점수별 등급 정보 반환
   */
  private getGradeInfo(score: number): { grade: string; color: string; description: string } {
    if (score >= 90) return { grade: 'A+', color: '#10b981', description: '최우수 - 탁월한 경영 역량' };
    if (score >= 85) return { grade: 'A', color: '#059669', description: '우수 - 뛰어난 경영 역량' };
    if (score >= 80) return { grade: 'B+', color: '#0891b2', description: '양호 - 좋은 경영 역량' };
    if (score >= 75) return { grade: 'B', color: '#0284c7', description: '보통 - 평균적 경영 역량' };
    if (score >= 70) return { grade: 'C+', color: '#7c3aed', description: '개선 필요 - 노력이 필요함' };
    if (score >= 65) return { grade: 'C', color: '#a855f7', description: '개선 권장 - 체계적 개선 필요' };
    if (score >= 60) return { grade: 'D+', color: '#ef4444', description: '미흡 - 적극적 개선 필요' };
    if (score >= 55) return { grade: 'D', color: '#dc2626', description: '부족 - 전면적 개선 필요' };
    return { grade: 'F', color: '#991b1b', description: '위험 - 즉시 전문가 상담 필요' };
  }

  /**
   * 📂 카테고리명 한글 변환
   */
  private getCategoryName(category: string): string {
    const categoryNames: { [key: string]: string } = {
      'productService': '상품/서비스',
      'customerService': '고객응대',
      'marketing': '마케팅',
      'procurement': '구매/재고',
      'storeManagement': '매장관리'
    };
    return categoryNames[category] || category;
  }

  /**
   * 🖼️ HTML을 이미지로 변환
   */
  async convertToImage(element: HTMLElement, format: 'png' | 'jpeg' = 'png'): Promise<string> {
    try {
      const dataUrl = format === 'png' 
        ? await toPng(element, {
            quality: 1,
            pixelRatio: 2,
            backgroundColor: '#ffffff'
          })
        : await toJpeg(element, {
            quality: 0.95,
            pixelRatio: 2,
            backgroundColor: '#ffffff'
          });
      
      return dataUrl;
    } catch (error) {
      console.error('이미지 변환 실패:', error);
      throw error;
    }
  }

  /**
   * 📄 HTML을 PDF로 변환
   */
  async convertToPDF(element: HTMLElement, filename: string = 'ai-diagnosis-report.pdf'): Promise<Blob> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // 첫 페이지 추가
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 추가 페이지가 필요한 경우
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      return pdf.output('blob');
    } catch (error) {
      console.error('PDF 변환 실패:', error);
      throw error;
    }
  }

  /**
   * 📧 이메일용 HTML 템플릿 생성
   */
  generateEmailTemplate(data: DiagnosisData): string {
    const gradeInfo = this.getGradeInfo(data.totalScore);
    
    return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 진단 결과</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 30px; text-align: center; }
          .logo { width: 60px; height: 60px; background: white; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
          .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { opacity: 0.9; }
          .content { padding: 30px; }
          .score-box { text-align: center; background: linear-gradient(135deg, #f8faff, #e8f4f8); padding: 25px; border-radius: 10px; margin-bottom: 25px; }
          .score-number { font-size: 48px; font-weight: bold; color: #4285f4; margin-bottom: 10px; }
          .grade-badge { display: inline-block; padding: 8px 16px; background: ${gradeInfo.color}; color: white; border-radius: 20px; font-weight: bold; margin-bottom: 10px; }
          .categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 25px 0; }
          .category { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; border-left: 4px solid #4285f4; }
          .category-name { font-size: 12px; color: #666; margin-bottom: 5px; }
          .category-score { font-size: 18px; font-weight: bold; color: #4285f4; }
          .recommendations { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          .contact { margin-top: 15px; }
          .contact-item { display: inline-block; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎯</div>
            <div class="company-name">${data.companyName}</div>
            <div class="subtitle">AI 무료진단 결과가 도착했습니다!</div>
          </div>
          
          <div class="content">
            <div class="score-box">
              <div class="score-number">${data.totalScore}</div>
              <div style="color: #666; margin-bottom: 15px;">점 / 100점 만점</div>
              <div class="grade-badge" style="background: ${gradeInfo.color}">${gradeInfo.grade}등급</div>
              <div style="color: #666; font-size: 14px;">${gradeInfo.description}</div>
            </div>
            
            <h3 style="color: #333; margin-bottom: 15px;">📊 영역별 진단 결과</h3>
            <div class="categories">
              ${Object.entries(data.categoryScores).map(([category, score]) => `
                <div class="category">
                  <div class="category-name">${this.getCategoryName(category)}</div>
                  <div class="category-score">${score.toFixed(1)}점</div>
                </div>
              `).join('')}
            </div>
            
            <div class="recommendations">
              <h3 style="color: #856404; margin-top: 0;">💡 개선 권장사항</h3>
              <div style="line-height: 1.6; color: #856404;">
                ${data.recommendations.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e8f4f8; border-radius: 8px;">
              <h3 style="color: #4285f4; margin-top: 0;">🤝 전문가 상담 문의</h3>
              <p style="margin: 10px 0; color: #666;">더 자세한 분석과 맞춤형 솔루션이 필요하시다면 전문가 상담을 받아보세요.</p>
              <div style="margin-top: 15px;">
                <strong style="color: #4285f4;">📞 010-9251-9743</strong>
                <br>
                <strong style="color: #4285f4;">👨‍💼 이후경 경영지도사</strong>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div><strong>AICAMP AI교육센터</strong></div>
            <div>AI기반 비즈니스 성장 솔루션</div>
            <div class="contact">
              <div class="contact-item">📧 hongik423@gmail.com</div>
              <div class="contact-item">🌐 https://aicamp.club</div>
            </div>
            <div style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
              본 메일은 AI 진단 신청에 따라 자동 발송되었습니다.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * 📱 모바일 최적화 이메일 템플릿
   */
  generateMobileEmailTemplate(data: DiagnosisData): string {
    const gradeInfo = this.getGradeInfo(data.totalScore);
    
    return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 진단 결과</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 10px; background: #f5f5f5; font-size: 14px; }
          .container { max-width: 100%; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 20px; text-align: center; }
          .logo { width: 50px; height: 50px; background: white; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
          .company-name { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
          .content { padding: 20px; }
          .score-box { text-align: center; background: #f8faff; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .score-number { font-size: 36px; font-weight: bold; color: #4285f4; margin-bottom: 8px; }
          .grade-badge { display: inline-block; padding: 6px 12px; background: ${gradeInfo.color}; color: white; border-radius: 15px; font-weight: bold; font-size: 14px; }
          .categories { margin: 20px 0; }
          .category { background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
          .category-name { font-size: 12px; color: #666; }
          .category-score { font-size: 16px; font-weight: bold; color: #4285f4; }
          .recommendations { background: #fff3cd; padding: 15px; border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; color: #666; font-size: 11px; }
          .contact-button { display: inline-block; background: #4285f4; color: white; padding: 10px 20px; border-radius: 20px; text-decoration: none; margin: 10px 5px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎯</div>
            <div class="company-name">${data.companyName}</div>
            <div style="opacity: 0.9; font-size: 12px;">AI 무료진단 결과</div>
          </div>
          
          <div class="content">
            <div class="score-box">
              <div class="score-number">${data.totalScore}</div>
              <div style="color: #666; margin-bottom: 10px; font-size: 12px;">점 / 100점 만점</div>
              <div class="grade-badge">${gradeInfo.grade}등급</div>
            </div>
            
            <h3 style="color: #333; margin-bottom: 10px; font-size: 16px;">📊 영역별 결과</h3>
            <div class="categories">
              ${Object.entries(data.categoryScores).map(([category, score]) => `
                <div class="category">
                  <div class="category-name">${this.getCategoryName(category)}</div>
                  <div class="category-score">${score.toFixed(1)}점</div>
                </div>
              `).join('')}
            </div>
            
            <div class="recommendations">
              <h4 style="color: #856404; margin-top: 0; font-size: 14px;">💡 개선 권장사항</h4>
              <div style="color: #856404;">
                ${data.recommendations.substring(0, 200)}${data.recommendations.length > 200 ? '...' : ''}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="tel:010-9251-9743" class="contact-button">📞 전화상담</a>
              <a href="mailto:hongik423@gmail.com" class="contact-button">📧 이메일</a>
            </div>
          </div>
          
          <div class="footer">
            <div><strong>AICAMP AI교육센터</strong></div>
            <div>📞 010-9251-9743 | 👨‍💼 이후경 경영지도사</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

/**
 * 📧 이메일 전송 데이터 준비
 */
export function prepareEmailData(data: DiagnosisData): {
  subject: string;
  htmlContent: string;
  mobileHtmlContent: string;
  attachmentData?: string;
} {
  const generator = new VisualReportGenerator();
  
  return {
    subject: `[AICAMP] 🎯 ${data.companyName} AI 진단 결과보고서 (${data.totalScore}점)`,
    htmlContent: generator.generateEmailTemplate(data),
    mobileHtmlContent: generator.generateMobileEmailTemplate(data),
  };
}

/**
 * 🔧 브라우저에서 다운로드 실행
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 📊 진단 데이터 변환 유틸리티
 */
export function transformDiagnosisData(rawData: any): DiagnosisData {
  return {
    companyName: rawData.companyName || rawData.회사명 || '알 수 없음',
    industry: rawData.industry || rawData.업종 || '기타',
    contactName: rawData.contactName || rawData.담당자명 || '담당자',
    email: rawData.email || rawData.이메일 || '',
    totalScore: rawData.totalScore || rawData.종합점수 || 0,
    categoryScores: rawData.categoryScores || rawData.카테고리점수 || {},
    recommendations: rawData.recommendations || rawData.추천사항 || '개선 권장사항이 없습니다.',
    timestamp: rawData.timestamp || new Date().toISOString()
  };
} 
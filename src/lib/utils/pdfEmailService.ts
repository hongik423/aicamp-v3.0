/**
 * 📧 PDF 이메일 발송 서비스
 * AI 무료진단 결과보고서를 PDF로 생성해서 이메일로 발송하는 통합 서비스
 * 
 * ✅ 주요 기능:
 * 1. 진단 결과를 HTML로 변환
 * 2. HTML을 PDF로 생성 (jsPDF + html2canvas)
 * 3. PDF를 base64로 인코딩
 * 4. Google Apps Script를 통해 PDF 첨부 이메일 발송
 */

import { appConfig } from '../config/env';

// 🔧 타입 정의
export interface DiagnosisReportData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  totalScore: number;
  overallGrade: string;
  industryType: string;
  employeeCount: string;
  categoryResults: Array<{
    categoryName: string;
    score100: number;
    currentScore: number;
  }>;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  actionPlan: string[];
  recommendedServices: string[];
  consultant: {
    name: string;
    phone: string;
    email: string;
  };
  summaryReport?: string;
  diagnosisDate: string;
}

export interface PdfEmailResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  pdfBase64?: string; // PDF base64 데이터 추가
}

/**
 * 🎨 PDF 진단보고서 HTML 템플릿 생성
 */
function generateDiagnosisReportHTML(data: DiagnosisReportData): string {
  const currentDate = new Date().toLocaleDateString('ko-KR');
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 무료진단 결과보고서 - ${data.companyName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans KR', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #ffffff;
            font-size: 14px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 30px;
            background: white;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #4285f4;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        
        .header h1 {
            color: #4285f4;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .header .subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .company-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .company-info h2 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .company-info h2::before {
            content: "🏢";
            margin-right: 8px;
            font-size: 20px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
        }
        
        .info-item .label {
            font-weight: 500;
            color: #555;
            min-width: 80px;
            margin-right: 10px;
        }
        
        .info-item .value {
            color: #333;
            font-weight: 400;
        }
        
        .score-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .score-main {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .score-grade {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 15px;
        }
        
        .score-description {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .section {
            margin-bottom: 35px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
            display: flex;
            align-items: center;
        }
        
        .section-title::before {
            margin-right: 10px;
            font-size: 22px;
        }
        
        .category-results {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .category-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4285f4;
        }
        
        .category-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .category-score {
            font-size: 24px;
            font-weight: 700;
            color: #4285f4;
        }
        
        .category-score span {
            font-size: 14px;
            color: #666;
            font-weight: 400;
        }
        
        .analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }
        
        .analysis-card {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
        }
        
        .analysis-card h3 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
            display: flex;
            align-items: center;
        }
        
        .analysis-card h3::before {
            margin-right: 8px;
            font-size: 18px;
        }
        
        .analysis-card.strengths h3::before { content: "💪"; }
        .analysis-card.weaknesses h3::before { content: "⚠️"; }
        .analysis-card.opportunities h3::before { content: "🚀"; }
        
        .analysis-list {
            list-style: none;
        }
        
        .analysis-list li {
            padding: 8px 0;
            border-bottom: 1px solid #f1f3f4;
            color: #555;
            font-size: 13px;
        }
        
        .analysis-list li:last-child {
            border-bottom: none;
        }
        
        .analysis-list li::before {
            content: "•";
            color: #4285f4;
            font-weight: bold;
            margin-right: 8px;
        }
        
        .action-plan {
            background: #e8f5e8;
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }
        
        .action-plan h3 {
            color: #28a745;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .action-plan h3::before {
            content: "📋";
            margin-right: 10px;
            font-size: 20px;
        }
        
        .action-steps {
            list-style: none;
            counter-reset: step-counter;
        }
        
        .action-steps li {
            counter-increment: step-counter;
            margin-bottom: 12px;
            padding-left: 35px;
            position: relative;
            color: #333;
            font-size: 14px;
        }
        
        .action-steps li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            background: #28a745;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 12px;
        }
        
        .services-section {
            background: #fff3cd;
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
            margin-bottom: 30px;
        }
        
        .services-section h3 {
            color: #856404;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .services-section h3::before {
            content: "⭐";
            margin-right: 10px;
            font-size: 20px;
        }
        
        .services-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .service-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #ffeaa7;
            text-align: center;
            font-weight: 500;
            color: #333;
            font-size: 13px;
        }
        
        .consultant-info {
            background: #d1ecf1;
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #17a2b8;
            margin-top: 30px;
        }
        
        .consultant-info h3 {
            color: #0c5460;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .consultant-info h3::before {
            content: "👨‍💼";
            margin-right: 10px;
            font-size: 20px;
        }
        
        .consultant-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .consultant-item {
            display: flex;
            align-items: center;
            color: #0c5460;
            font-weight: 500;
        }
        
        .consultant-item::before {
            margin-right: 10px;
            font-size: 16px;
        }
        
        .consultant-item.name::before { content: "👤"; }
        .consultant-item.phone::before { content: "📞"; }
        .consultant-item.email::before { content: "📧"; }
        
        .footer {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid #e9ecef;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        
        .footer .brand {
            font-weight: 600;
            color: #4285f4;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .footer .disclaimer {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
            font-style: italic;
            color: #666;
        }
        
        @media print {
            body { font-size: 12px; }
            .container { padding: 20px; }
            .header h1 { font-size: 24px; }
            .score-main { font-size: 36px; }
            .section-title { font-size: 18px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 AI 무료진단 결과보고서</h1>
            <div class="subtitle">AICAMP AI 교육센터 - 전문 기업 진단 서비스</div>
            <div style="color: #666; font-size: 14px;">진단일: ${data.diagnosisDate}</div>
        </div>

        <div class="company-info">
            <h2>기업 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">회사명:</span>
                    <span class="value">${data.companyName}</span>
                </div>
                <div class="info-item">
                    <span class="label">담당자:</span>
                    <span class="value">${data.contactName}</span>
                </div>
                <div class="info-item">
                    <span class="label">업종:</span>
                    <span class="value">${data.industryType}</span>
                </div>
                <div class="info-item">
                    <span class="label">직원수:</span>
                    <span class="value">${data.employeeCount}</span>
                </div>
                <div class="info-item">
                    <span class="label">연락처:</span>
                    <span class="value">${data.contactPhone || '-'}</span>
                </div>
                <div class="info-item">
                    <span class="label">이메일:</span>
                    <span class="value">${data.contactEmail}</span>
                </div>
            </div>
        </div>

        <div class="score-section">
            <div class="score-main">${data.totalScore}점</div>
            <div class="score-grade">${data.overallGrade}등급</div>
            <div class="score-description">종합 경영 진단 결과</div>
        </div>

        <div class="section">
            <h2 class="section-title" style="--emoji: '📊';">카테고리별 상세 점수</h2>
            <div class="category-results">
                ${data.categoryResults.map(category => `
                    <div class="category-card">
                        <div class="category-name">${category.categoryName}</div>
                        <div class="category-score">${category.score100}<span>/100</span></div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">🔍 종합 분석 결과</h2>
            <div class="analysis-grid">
                <div class="analysis-card strengths">
                    <h3>강점 영역</h3>
                    <ul class="analysis-list">
                        ${data.strengths.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-card weaknesses">
                    <h3>개선 영역</h3>
                    <ul class="analysis-list">
                        ${data.weaknesses.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-card opportunities">
                    <h3>기회 요소</h3>
                    <ul class="analysis-list">
                        ${data.opportunities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        ${data.actionPlan.length > 0 ? `
        <div class="section">
            <div class="action-plan">
                <h3>맞춤형 실행 계획</h3>
                <ol class="action-steps">
                    ${data.actionPlan.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
        ` : ''}

        ${data.recommendedServices.length > 0 ? `
        <div class="section">
            <div class="services-section">
                <h3>추천 서비스</h3>
                <div class="services-list">
                    ${data.recommendedServices.map(service => `
                        <div class="service-item">${service}</div>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}

        ${data.summaryReport ? `
        <div class="section">
            <h2 class="section-title">📝 상세 분석 리포트</h2>
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; line-height: 1.8; color: #333;">
                ${data.summaryReport.replace(/\n/g, '<br>')}
            </div>
        </div>
        ` : ''}

        <div class="consultant-info">
            <h3>전문가 상담 정보</h3>
            <div class="consultant-details">
                <div class="consultant-item name">${data.consultant.name}</div>
                <div class="consultant-item phone">${data.consultant.phone}</div>
                <div class="consultant-item email">${data.consultant.email}</div>
            </div>
            <div style="margin-top: 15px; color: #0c5460; font-size: 14px;">
                더 상세한 상담을 원하시면 언제든지 연락주세요. 기업 맞춤형 솔루션을 제공해드립니다.
            </div>
        </div>

        <div class="footer">
            <div class="brand">AICAMP AI 교육센터</div>
            <div>Tel: ${data.consultant.phone} | Email: ${data.consultant.email}</div>
            <div style="margin-top: 10px;">© 2025 AICAMP. All rights reserved.</div>
            
            <div class="disclaimer">
                ⚠️ 본 보고서는 AI 기반 분석 결과이며, 참고용으로 활용하시기 바랍니다. 
                더 정확한 진단과 맞춤형 솔루션을 위해서는 전문가 상담을 받으시길 권합니다.
            </div>
        </div>
    </div>
</body>
</html>`;
}

/**
 * 📄 HTML을 PDF로 변환 (jsPDF + html2canvas 사용)
 */
async function convertHtmlToPdf(htmlContent: string, filename: string): Promise<string> {
  try {
    // Dynamic import for client-side only
    const [jsPDF, html2canvas] = await Promise.all([
      import('jspdf').then(module => module.jsPDF),
      import('html2canvas').then(module => module.default)
    ]);

    // 임시 DOM 요소 생성
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.background = 'white';
    document.body.appendChild(tempDiv);

    try {
      // HTML을 캔버스로 변환
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempDiv.scrollHeight
      });

      // PDF 생성
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm
      let heightLeft = imgHeight;
      let position = 0;

      // 첫 페이지 추가
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 여러 페이지 처리
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // PDF를 base64로 변환
      const pdfBase64 = pdf.output('datauristring').split(',')[1];
      
      return pdfBase64;

    } finally {
      // 임시 DOM 요소 제거
      document.body.removeChild(tempDiv);
    }

  } catch (error) {
    console.error('PDF 변환 오류:', error);
    throw new Error(`PDF 생성 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * 🚀 Google Apps Script를 통한 PDF 첨부 이메일 발송
 */
async function sendPdfEmail(pdfBase64: string, reportData: DiagnosisReportData): Promise<PdfEmailResult> {
  try {
    const emailData = {
      action: 'sendDiagnosisPdfEmail',
      폼타입: 'AI_진단결과_PDF발송',
      
      // 수신자 정보
      to_email: reportData.contactEmail,
      to_name: reportData.contactName,
      company_name: reportData.companyName,
      
      // PDF 첨부파일
      pdf_attachment: pdfBase64,
      pdf_filename: `AI진단보고서_${reportData.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
      
      // 이메일 내용
      diagnosis_date: reportData.diagnosisDate,
      total_score: reportData.totalScore,
      overall_grade: reportData.overallGrade,
      industry_type: reportData.industryType,
      
      // 컨설턴트 정보
      consultant_name: reportData.consultant.name,
      consultant_phone: reportData.consultant.phone,
      consultant_email: reportData.consultant.email,
      
      // 메타데이터
      제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      timestamp: Date.now()
    };

    console.log('📧 PDF 첨부 이메일 발송 요청:', {
      action: emailData.action,
      to_email: emailData.to_email,
      company_name: emailData.company_name,
      pdf_size: Math.round(pdfBase64.length / 1024) + 'KB'
    });

    // Google Apps Script 엔드포인트로 전송
    const response = await fetch(appConfig.googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailData),
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script 오류: ${response.status} ${response.statusText}`);
    }

    const result = await response.text();
    console.log('✅ PDF 첨부 이메일 발송 완료:', result);

    return {
      success: true,
      message: `AI 진단 결과보고서가 ${reportData.contactEmail}로 발송되었습니다.`,
      data: { response: result }
    };

  } catch (error) {
    console.error('❌ PDF 이메일 발송 실패:', error);
    return {
      success: false,
      message: 'PDF 이메일 발송 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

/**
 * 🎯 메인 기능: AI 진단 결과를 PDF로 생성해서 이메일 발송
 */
/**
 * 📄 PDF 생성 및 base64 인코딩 (이메일 발송 없이)
 */
export async function generateDiagnosisPdfBase64(reportData: DiagnosisReportData): Promise<PdfEmailResult> {
  try {
    console.log('📄 AI 진단 결과 PDF 생성 시작:', reportData.companyName);

    // 1. HTML 템플릿 생성
    const htmlContent = generateDiagnosisReportHTML(reportData);
    console.log('✅ 1단계: HTML 템플릿 생성 완료');

    // 2. HTML을 PDF로 변환
    const pdfBase64 = await convertHtmlToPdf(htmlContent, `AI진단보고서_${reportData.companyName}`);
    console.log('✅ 2단계: PDF 생성 완료 (크기:', Math.round(pdfBase64.length / 1024), 'KB)');

    return {
      success: true,
      message: 'PDF 생성이 완료되었습니다.',
      pdfBase64: pdfBase64,
      data: {
        filename: `AI진단보고서_${reportData.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
        size: Math.round(pdfBase64.length / 1024) + 'KB'
      }
    };

  } catch (error) {
    console.error('❌ PDF 생성 실패:', error);
    return {
      success: false,
      message: 'PDF 생성 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

/**
 * 📧 PDF 생성 및 이메일 발송 (기존 함수 - 호환성 유지)
 */
export async function sendDiagnosisReportPdf(reportData: DiagnosisReportData): Promise<PdfEmailResult> {
  try {
    console.log('🚀 AI 진단 결과 PDF 이메일 발송 시작:', reportData.companyName);

    // 1. PDF 생성
    const pdfResult = await generateDiagnosisPdfBase64(reportData);
    
    if (!pdfResult.success || !pdfResult.pdfBase64) {
      return pdfResult;
    }

    console.log('✅ PDF 생성 완료, 이메일 발송 건너뛰기 (Google Apps Script 사용)');
    
    // PDF base64 데이터와 함께 반환 (실제 이메일 발송은 Google Apps Script에서 처리)
    return {
      success: true,
      message: 'PDF 생성이 완료되었습니다. Google Apps Script로 이메일을 발송하세요.',
      pdfBase64: pdfResult.pdfBase64,
      data: pdfResult.data
    };

  } catch (error) {
    console.error('❌ PDF 이메일 발송 프로세스 실패:', error);
    return {
      success: false,
      message: 'PDF 생성 및 이메일 발송 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

/**
 * 🔍 브라우저 환경에서 PDF 미리보기 (개발/테스트용)
 */
export function previewDiagnosisReportPdf(reportData: DiagnosisReportData): void {
  const htmlContent = generateDiagnosisReportHTML(reportData);
  
  const previewWindow = window.open('', '_blank');
  if (previewWindow) {
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
  } else {
    alert('팝업이 차단되었습니다. 팝업을 허용해주세요.');
  }
}

/**
 * 📊 서비스 상태 확인
 */
export function getPdfEmailServiceStatus() {
  return {
    service: 'PDF Email Service',
    features: [
      'HTML → PDF 변환 (jsPDF + html2canvas)',
      'Base64 인코딩',
      'Google Apps Script 첨부파일 이메일',
      '한글 폰트 지원',
      '반응형 PDF 레이아웃'
    ],
    requirements: [
      'jsPDF 라이브러리',
      'html2canvas 라이브러리', 
      'Google Apps Script 설정',
      '브라우저 환경 (클라이언트 사이드 실행)'
    ],
    status: {
      hasGoogleScript: !!appConfig.googleScriptUrl,
      isClientSide: typeof window !== 'undefined',
      timestamp: new Date().toISOString()
    }
  };
} 
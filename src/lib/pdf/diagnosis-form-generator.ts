'use client';

import { REAL_45_QUESTIONS } from '@/features/ai-diagnosis/constants/real-45-questions';

export interface DiagnosisFormData {
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
  responses: Record<string, number>;
  diagnosisId: string;
  submitDate: string;
}

/**
 * AI 역량진단 신청서 HTML 생성
 */
export function generateDiagnosisFormHTML(data: DiagnosisFormData): string {
  const currentDate = new Date().toLocaleDateString('ko-KR');
  const submitDate = new Date(data.submitDate).toLocaleDateString('ko-KR');
  
  // 응답 데이터를 배열로 변환
  const responseArray = Object.entries(data.responses)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([questionId, score]) => ({
      questionId: parseInt(questionId),
      question: REAL_45_QUESTIONS[parseInt(questionId) - 1]?.question || `질문 ${questionId}`,
      score: score
    }));

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 역량진단 신청서 - ${data.companyInfo.companyName}</title>
    <style>
        body {
            font-family: 'Malgun Gothic', '맑은 고딕', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1e40af;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            color: #6b7280;
            margin: 10px 0 0 0;
            font-size: 16px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            background: #eff6ff;
            color: #1e40af;
            padding: 12px 20px;
            margin: 0 -20px 20px -20px;
            font-size: 18px;
            font-weight: bold;
            border-left: 4px solid #2563eb;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .info-item {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-label {
            font-weight: bold;
            color: #374151;
            width: 120px;
            flex-shrink: 0;
        }
        .info-value {
            color: #1f2937;
            flex: 1;
        }
        .questions-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .questions-table th,
        .questions-table td {
            border: 1px solid #d1d5db;
            padding: 12px 8px;
            text-align: left;
        }
        .questions-table th {
            background-color: #f3f4f6;
            font-weight: bold;
            color: #374151;
        }
        .questions-table td:first-child {
            text-align: center;
            width: 60px;
            font-weight: bold;
        }
        .questions-table td:last-child {
            text-align: center;
            width: 80px;
            font-weight: bold;
            color: #2563eb;
        }
        .score-summary {
            background: #f0f9ff;
            border: 2px solid #bfdbfe;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .score-summary h3 {
            color: #1e40af;
            margin: 0 0 15px 0;
        }
        .score-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
        }
        .score-item {
            text-align: center;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border: 1px solid #bfdbfe;
        }
        .score-item .label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 5px;
        }
        .score-item .value {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .consent-section {
            background: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .consent-section h4 {
            color: #374151;
            margin: 0 0 10px 0;
        }
        .consent-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .consent-check {
            color: #059669;
            font-weight: bold;
            margin-right: 10px;
        }
        @media print {
            body { background-color: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 AI 역량진단 신청서</h1>
            <p>45개 행동지표 기반 정밀 진단</p>
            <p>신청 ID: ${data.diagnosisId}</p>
        </div>

        <div class="section">
            <div class="section-title">📋 기업 정보</div>
            <div class="info-grid">
                <div>
                    <div class="info-item">
                        <div class="info-label">회사명:</div>
                        <div class="info-value">${data.companyInfo.companyName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">담당자명:</div>
                        <div class="info-value">${data.companyInfo.contactName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">이메일:</div>
                        <div class="info-value">${data.companyInfo.contactEmail}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">전화번호:</div>
                        <div class="info-value">${data.companyInfo.contactPhone}</div>
                    </div>
                </div>
                <div>
                    <div class="info-item">
                        <div class="info-label">업종:</div>
                        <div class="info-value">${data.companyInfo.industry}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">직원수:</div>
                        <div class="info-value">${data.companyInfo.employeeCount}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">연매출:</div>
                        <div class="info-value">${data.companyInfo.annualRevenue}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">소재지:</div>
                        <div class="info-value">${data.companyInfo.location}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📊 응답 요약</div>
            <div class="score-summary">
                <h3>진단 응답 통계</h3>
                <div class="score-grid">
                    <div class="score-item">
                        <div class="label">총 문항수</div>
                        <div class="value">${responseArray.length}개</div>
                    </div>
                    <div class="score-item">
                        <div class="label">총 점수</div>
                        <div class="value">${responseArray.reduce((sum, item) => sum + item.score, 0)}점</div>
                    </div>
                    <div class="score-item">
                        <div class="label">평균 점수</div>
                        <div class="value">${(responseArray.reduce((sum, item) => sum + item.score, 0) / responseArray.length).toFixed(1)}점</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📝 45문항 응답 상세</div>
            <table class="questions-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>질문 내용</th>
                        <th>응답 점수</th>
                    </tr>
                </thead>
                <tbody>
                    ${responseArray.map(item => `
                        <tr>
                            <td>${item.questionId}</td>
                            <td>${item.question}</td>
                            <td>${item.score}점</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <div class="section-title">🛡️ 개인정보 처리 동의</div>
            <div class="consent-section">
                <h4>개인정보 수집·이용 동의 현황</h4>
                <div class="consent-item">
                    <span class="consent-check">✅</span>
                    <span>[필수] 개인정보 수집·이용 동의: 동의 완료</span>
                </div>
                <p style="font-size: 12px; color: #6b7280; margin-top: 15px;">
                    수집 항목: 회사명, 담당자명, 연락처(이메일·전화), 소재지, 45문항 응답<br>
                    수집·이용 목적: AI 역량진단 수행, 결과보고서 발송, 고객 응대<br>
                    보유·이용 기간: 목적 달성 후 즉시 파기 (관련 법령에 따른 의무 보관 기간은 그 기간 동안 보관)<br>
                    제3자 제공/국외이전: 없음<br>
                    처리 위탁: 이메일 발송 및 클라우드 인프라 운영 등 서비스 제공에 필수적인 범위<br>
                    동의 거부 권리 및 불이익: 동의를 거부할 수 있으나 서비스 제공이 불가<br>
                    문의: hongik423@gmail.com
                </p>
            </div>
        </div>

        <div class="footer">
            <p><strong>이교장의AI역량진단시스템 V17.0</strong></p>
            <p>신청일: ${submitDate} | 출력일: ${currentDate}</p>
            <p>📧 hongik423@gmail.com | 🌐 aicamp.club</p>
            <p style="margin-top: 10px; font-size: 12px;">
                본 신청서는 이교장이 오프라인에서 분석하여 24시간 내 이메일로 상세한 진단보고서를 발송합니다.
            </p>
        </div>
    </div>
</body>
</html>`;

  return html;
}

/**
 * AI 역량진단 신청서 PDF 생성 (HTML 기반)
 */
export async function generateDiagnosisFormPDF(data: DiagnosisFormData): Promise<Blob> {
  try {
    console.log('📄 AI 역량진단 신청서 HTML 생성 시작');
    
    // HTML 생성
    const html = generateDiagnosisFormHTML(data);
    
    // HTML을 Blob으로 변환 (PDF 대신 HTML 파일로 제공)
    const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
    
    console.log('✅ AI 역량진단 신청서 HTML 생성 완료');
    return blob;
    
  } catch (error) {
    console.error('❌ AI 역량진단 신청서 생성 오류:', error);
    throw error;
  }
}

/**
 * HTML을 PDF로 변환 (임시 비활성화)
 */
export async function convertHTMLToPDF(htmlElement: HTMLElement): Promise<Blob> {
  // 임시로 빈 Blob 반환
  console.log('HTML to PDF 변환 기능이 임시로 비활성화되었습니다.');
  return new Blob(['PDF 기능 임시 비활성화'], { type: 'application/pdf' });
}

/**
 * 파일 다운로드 함수 (HTML/PDF)
 */
export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // HTML 파일로 다운로드하도록 확장자 변경
  const htmlFilename = filename.replace(/\.pdf$/, '.html');
  link.download = htmlFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * PDF를 Google Drive에 업로드하는 함수
 */
export async function uploadPDFToGoogleDrive(blob: Blob, fileName: string, folderId?: string): Promise<{ success: boolean; fileId?: string; webViewLink?: string; error?: string }> {
  try {
    console.log('📁 Google Drive 업로드 시작:', fileName);
    
    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('fileName', fileName);
    if (folderId) {
      formData.append('folderId', folderId);
    }
    
    const response = await fetch('/api/google-drive/upload', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Google Drive 업로드 성공:', {
        fileId: result.fileId,
        fileName: result.fileName,
        webViewLink: result.webViewLink
      });
      
      return {
        success: true,
        fileId: result.fileId,
        webViewLink: result.webViewLink
      };
    } else {
      console.error('❌ Google Drive 업로드 실패:', result.error);
      return {
        success: false,
        error: result.error || '업로드에 실패했습니다.'
      };
    }
  } catch (error: any) {
    console.error('❌ Google Drive 업로드 오류:', error);
    return {
      success: false,
      error: error.message || '업로드 중 오류가 발생했습니다.'
    };
  }
}

/**
 * PDF 생성 및 Google Drive 업로드 통합 함수
 */
export async function generateAndUploadDiagnosisFormPDF(
  data: DiagnosisFormData, 
  folderId?: string
): Promise<{ success: boolean; blob?: Blob; fileId?: string; webViewLink?: string; error?: string }> {
  try {
    console.log('📄 진단 신청서 PDF 생성 시작');
    
    // PDF 생성
    const blob = await generateDiagnosisFormPDF(data);
    
    // 파일명 생성 (HTML 파일로 변경)
    const fileName = `AI역량진단_신청서_${data.companyInfo.companyName}_${data.diagnosisId}_${new Date().toISOString().split('T')[0]}.html`;
    
    // Google Drive 업로드
    const uploadResult = await uploadPDFToGoogleDrive(blob, fileName, folderId);
    
    if (uploadResult.success) {
      return {
        success: true,
        blob,
        fileId: uploadResult.fileId,
        webViewLink: uploadResult.webViewLink
      };
    } else {
      return {
        success: false,
        blob,
        error: uploadResult.error
      };
    }
  } catch (error: any) {
    console.error('❌ PDF 생성 및 업로드 오류:', error);
    return {
      success: false,
      error: error.message || 'PDF 생성 및 업로드에 실패했습니다.'
    };
  }
}

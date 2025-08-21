'use client';

// 임시로 PDF 기능 비활성화 (빌드 오류 해결)
// import jsPDF from 'jspdf';

export interface ScoreReportData {
  diagnosisId: string;
  companyName: string;
  submitDate: string;
  totalScore: number;
  categoryScores: {
    [category: string]: number;
  };
  recommendations: string[];
  nextSteps: string[];
}

/**
 * AI 역량진단 결과 보고서 PDF 생성 (임시 비활성화)
 */
export async function generateScoreReportPDF(data: ScoreReportData): Promise<Blob> {
  // 임시로 빈 Blob 반환
  console.log('점수 보고서 PDF 생성 기능이 임시로 비활성화되었습니다.');
  return new Blob(['PDF 기능 임시 비활성화'], { type: 'application/pdf' });
}

/**
 * 결과 요약 PDF 생성 (임시 비활성화)
 */
export async function generateSummaryPDF(data: ScoreReportData): Promise<Blob> {
  // 임시로 빈 Blob 반환
  console.log('요약 PDF 생성 기능이 임시로 비활성화되었습니다.');
  return new Blob(['PDF 기능 임시 비활성화'], { type: 'application/pdf' });
}

/**
 * 간단한 점수 요약 PDF 생성
 */
export async function generateSimpleScorePDF(data: ScoreReportData): Promise<Blob> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  
  let yPosition = margin;
  
  // 헤더
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('AI 역량진단 점수 요약', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;
  
  // 기본 정보
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  doc.text(`기업명: ${data.companyName}`, margin, yPosition);
  yPosition += 8;
  doc.text(`진단 ID: ${data.diagnosisId}`, margin, yPosition);
  yPosition += 8;
  doc.text(`생성일: ${new Date(data.submitDate).toLocaleDateString('ko-KR')}`, margin, yPosition);
  yPosition += 20;
  
  // 점수 정보
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text(`총점: ${data.totalScore}점`, margin, yPosition);
  yPosition += 10;
  doc.text(`평균점: ${data.totalScore}점`, margin, yPosition);
  yPosition += 10;
  doc.text(`등급: ${data.totalScore}점`, margin, yPosition);
  yPosition += 10;
  doc.text(`성숙도: ${data.totalScore}점`, margin, yPosition);
  yPosition += 10;
  doc.text(`백분위: 상위 ${data.totalScore}%`, margin, yPosition);
  
  return doc.output('blob');
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
 * 점수 보고서 PDF 생성 및 Google Drive 업로드 통합 함수
 */
export async function generateAndUploadScoreReportPDF(
  data: ScoreReportData, 
  folderId?: string
): Promise<{ success: boolean; blob?: Blob; fileId?: string; webViewLink?: string; error?: string }> {
  try {
    console.log('📄 점수 보고서 PDF 생성 시작');
    
    // PDF 생성
    const blob = await generateScoreReportPDF(data);
    
    // 파일명 생성
    const fileName = `AI역량진단_점수보고서_${data.companyName}_${data.diagnosisId}_${new Date().toISOString().split('T')[0]}.pdf`;
    
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
    console.error('❌ 점수 보고서 PDF 생성 및 업로드 오류:', error);
    return {
      success: false,
      error: error.message || '점수 보고서 PDF 생성 및 업로드에 실패했습니다.'
    };
  }
}

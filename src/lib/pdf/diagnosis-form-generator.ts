'use client';

// 임시로 PDF 기능 비활성화 (빌드 오류 해결)
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

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
 * AI 역량진단 신청서 PDF 생성 (임시 비활성화)
 */
export async function generateDiagnosisFormPDF(data: DiagnosisFormData): Promise<Blob> {
  // 임시로 빈 Blob 반환
  console.log('PDF 생성 기능이 임시로 비활성화되었습니다.');
  return new Blob(['PDF 기능 임시 비활성화'], { type: 'application/pdf' });
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
 * PDF 다운로드 함수
 */
export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
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
    
    // 파일명 생성
    const fileName = `AI역량진단_신청서_${data.companyInfo.companyName}_${data.diagnosisId}_${new Date().toISOString().split('T')[0]}.pdf`;
    
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

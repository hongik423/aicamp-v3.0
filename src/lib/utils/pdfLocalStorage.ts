/**
 * PDF 로컬 스토리지 관리 유틸리티
 * 브라우저 로컬스토리지에서 PDF 보고서 데이터를 관리합니다.
 */

export interface PdfReport {
  id: string;
  fileName: string;
  data: string; // base64 encoded PDF data
  timestamp: string;
  companyName: string;
  applicantName: string;
  totalScore: number;
}

/**
 * PDF 보고서를 로컬스토리지에 저장
 */
export function savePdfToLocalStorage(report: PdfReport): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    const existingReports = getPdfReportsFromLocalStorage();
    const updatedReports = [...existingReports, report];
    
    localStorage.setItem('aicamp_pdf_reports', JSON.stringify(updatedReports));
    
    console.log('✅ PDF 보고서 로컬저장 성공:', report.fileName);
    return true;
  } catch (error) {
    console.error('❌ PDF 로컬저장 실패:', error);
    return false;
  }
}

/**
 * 로컬스토리지에서 모든 PDF 보고서 목록 조회
 */
export function getPdfReportsFromLocalStorage(): PdfReport[] {
  try {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem('aicamp_pdf_reports');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('❌ PDF 목록 조회 실패:', error);
    return [];
  }
}

/**
 * 특정 ID의 PDF 보고서 조회
 */
export function getPdfReportById(id: string): PdfReport | null {
  try {
    const reports = getPdfReportsFromLocalStorage();
    return reports.find(report => report.id === id) || null;
  } catch (error) {
    console.error('❌ PDF 조회 실패:', error);
    return null;
  }
}

/**
 * PDF 보고서 다운로드
 */
export function downloadPdfReport(report: PdfReport): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    // Base64 데이터를 Blob으로 변환
    const pdfData = atob(report.data);
    const bytes = new Uint8Array(pdfData.length);
    
    for (let i = 0; i < pdfData.length; i++) {
      bytes[i] = pdfData.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // 다운로드 링크 생성 및 클릭
    const link = document.createElement('a');
    link.href = url;
    link.download = report.fileName;
    document.body.appendChild(link);
    link.click();
    
    // 정리
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('✅ PDF 다운로드 성공:', report.fileName);
    return true;
  } catch (error) {
    console.error('❌ PDF 다운로드 실패:', error);
    return false;
  }
}

/**
 * 특정 PDF 보고서 삭제
 */
export function deletePdfReport(id: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    const reports = getPdfReportsFromLocalStorage();
    const filteredReports = reports.filter(report => report.id !== id);
    
    localStorage.setItem('aicamp_pdf_reports', JSON.stringify(filteredReports));
    
    console.log('✅ PDF 보고서 삭제 성공:', id);
    return true;
  } catch (error) {
    console.error('❌ PDF 삭제 실패:', error);
    return false;
  }
}

/**
 * 로컬스토리지 전체 정리
 */
export function clearAllPdfReports(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.removeItem('aicamp_pdf_reports');
    
    console.log('✅ 모든 PDF 보고서 정리 완료');
    return true;
  } catch (error) {
    console.error('❌ PDF 정리 실패:', error);
    return false;
  }
}

/**
 * 로컬스토리지 상태 확인
 */
export function getPdfStorageInfo(): {
  totalReports: number;
  totalSize: string;
  oldestReport: string | null;
  newestReport: string | null;
} {
  try {
    const reports = getPdfReportsFromLocalStorage();
    const stored = localStorage.getItem('aicamp_pdf_reports') || '';
    const sizeInBytes = new Blob([stored]).size;
    const sizeInMB = (sizeInBytes / 1024 / 1024).toFixed(2);
    
    return {
      totalReports: reports.length,
      totalSize: `${sizeInMB} MB`,
      oldestReport: reports.length > 0 ? reports[0].timestamp : null,
      newestReport: reports.length > 0 ? reports[reports.length - 1].timestamp : null
    };
  } catch (error) {
    console.error('❌ 스토리지 정보 조회 실패:', error);
    return {
      totalReports: 0,
      totalSize: '0 MB',
      oldestReport: null,
      newestReport: null
    };
  }
} 
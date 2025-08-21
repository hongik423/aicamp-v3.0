'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
 * AI 역량진단 신청서 PDF 생성
 */
export async function generateDiagnosisFormPDF(data: DiagnosisFormData): Promise<Blob> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  
  // 1. 헤더
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175); // blue-800
  doc.text('AI 역량진단 신청서', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128); // gray-500
  doc.text(`진단 ID: ${data.diagnosisId}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  
  doc.text(`제출일: ${new Date(data.submitDate).toLocaleDateString('ko-KR')}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;
  
  // 2. 기업 정보
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39); // gray-900
  doc.text('기업 정보', margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81); // gray-700
  
  const companyInfo = [
    { label: '회사명', value: data.companyInfo.companyName },
    { label: '담당자명', value: data.companyInfo.contactName },
    { label: '이메일', value: data.companyInfo.contactEmail },
    { label: '연락처', value: data.companyInfo.contactPhone },
    { label: '업종', value: data.companyInfo.industry },
    { label: '직원 수', value: data.companyInfo.employeeCount },
    { label: '연매출', value: data.companyInfo.annualRevenue },
    { label: '소재지', value: data.companyInfo.location }
  ];
  
  companyInfo.forEach(info => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.text(`${info.label}: ${info.value}`, margin, yPosition);
    yPosition += 6;
  });
  
  yPosition += 10;
  
  // 3. 45문항 응답
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('45문항 응답', margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  
  const questions = [
    '1. AI 도입 의지', '2. AI 이해도', '3. 데이터 품질', '4. 기술 인프라', '5. 조직 문화',
    '6. 예산 확보', '7. 리더십 지원', '8. 직원 교육', '9. 프로세스 개선', '10. 고객 중심',
    '11. 혁신 추진', '12. 위험 관리', '13. 규정 준수', '14. 보안 체계', '15. 통합 관리',
    '16. 성과 측정', '17. 지속 개선', '18. 협업 체계', '19. 지식 공유', '20. 변화 관리',
    '21. 스킬 개발', '22. 도구 활용', '23. 자동화 수준', '24. 분석 역량', '25. 의사결정',
    '26. 고객 경험', '27. 운영 효율', '28. 비용 절감', '29. 수익 창출', '30. 경쟁 우위',
    '31. 시장 대응', '32. 제품 개발', '33. 서비스 개선', '34. 마케팅 효과', '35. 영업 지원',
    '36. 고객 서비스', '37. 공급망 관리', '38. 품질 관리', '39. 리스크 관리', '40. 규정 준수',
    '41. 지속가능성', '42. 사회적 책임', '43. 환경 보호', '44. 윤리 경영', '45. 미래 준비'
  ];
  
  questions.forEach((question, index) => {
    const questionId = index + 1;
    const score = data.responses[questionId] || 0;
    const scoreText = score > 0 ? `${score}점` : '미응답';
    
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = margin;
    }
    
    const questionText = `${questionId}. ${question}: ${scoreText}`;
    doc.text(questionText, margin, yPosition);
    yPosition += 5;
  });
  
  // 4. 요약 정보
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = margin;
  }
  
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('응답 요약', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  
  const totalResponses = Object.keys(data.responses).length;
  const averageScore = totalResponses > 0 
    ? (Object.values(data.responses).reduce((sum, score) => sum + score, 0) / totalResponses).toFixed(1)
    : '0.0';
  
  doc.text(`총 응답 문항: ${totalResponses}/45`, margin, yPosition);
  yPosition += 5;
  doc.text(`평균 점수: ${averageScore}점`, margin, yPosition);
  yPosition += 5;
  doc.text(`응답률: ${((totalResponses / 45) * 100).toFixed(1)}%`, margin, yPosition);
  
  // 5. 푸터
  doc.addPage();
  yPosition = margin;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('AI 역량진단 신청서', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text('이 문서는 AI 역량진단 시스템에서 자동으로 생성되었습니다.', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('생성일시: ' + new Date().toLocaleString('ko-KR'), pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('문의: hongik423@gmail.com', pageWidth / 2, yPosition, { align: 'center' });
  
  return doc.output('blob');
}

/**
 * HTML 요소를 PDF로 변환
 */
export async function generatePDFFromHTML(element: HTMLElement, filename: string): Promise<Blob> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    return pdf.output('blob');
  } catch (error) {
    console.error('HTML to PDF 변환 오류:', error);
    throw new Error('PDF 생성에 실패했습니다.');
  }
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

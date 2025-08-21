'use client';

import jsPDF from 'jspdf';

export interface ScoreReportData {
  diagnosisId: string;
  companyName: string;
  contactName: string;
  submitDate: string;
  scores: {
    totalScore: number;
    averageScore: number;
    grade: string;
    maturityLevel: string;
    percentile: number;
    categoryScores: {
      businessFoundation: number;
      currentAIUsage: number;
      organizationalReadiness: number;
      technicalInfrastructure: number;
      goalClarity: number;
      executionCapability: number;
    };
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    recommendations: string[];
  };
}

/**
 * 점수체크 기록 PDF 생성
 */
export async function generateScoreReportPDF(data: ScoreReportData): Promise<Blob> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  
  // 1. 표지 페이지
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175); // blue-800
  doc.text('AI 역량진단 점수체크 보고서', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128); // gray-500
  doc.text(`기업명: ${data.companyName}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text(`담당자: ${data.contactName}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text(`진단 ID: ${data.diagnosisId}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text(`생성일: ${new Date(data.submitDate).toLocaleDateString('ko-KR')}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 30;
  
  // 2. 종합 점수
  doc.addPage();
  yPosition = margin;
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39); // gray-900
  doc.text('종합 점수', margin, yPosition);
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81); // gray-700
  
  const totalScore = data.scores.totalScore;
  const averageScore = data.scores.averageScore;
  const grade = data.scores.grade;
  const maturityLevel = data.scores.maturityLevel;
  const percentile = data.scores.percentile;
  
  // 점수 표시
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text(`총점: ${totalScore}점`, margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text(`평균점: ${averageScore.toFixed(1)}점`, margin, yPosition);
  yPosition += 8;
  doc.text(`등급: ${grade}`, margin, yPosition);
  yPosition += 8;
  doc.text(`성숙도: ${maturityLevel}`, margin, yPosition);
  yPosition += 8;
  doc.text(`백분위: 상위 ${percentile}%`, margin, yPosition);
  yPosition += 20;
  
  // 3. 영역별 점수
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('영역별 점수', margin, yPosition);
  yPosition += 12;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  
  const categoryScores = data.scores.categoryScores;
  const categories = [
    { name: '비즈니스 기반', score: categoryScores.businessFoundation },
    { name: '현재 AI 활용도', score: categoryScores.currentAIUsage },
    { name: '조직 준비도', score: categoryScores.organizationalReadiness },
    { name: '기술 인프라', score: categoryScores.technicalInfrastructure },
    { name: '목표 명확성', score: categoryScores.goalClarity },
    { name: '실행 역량', score: categoryScores.executionCapability }
  ];
  
  categories.forEach(category => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.text(`${category.name}: ${category.score}점`, margin, yPosition);
    yPosition += 6;
  });
  
  yPosition += 15;
  
  // 4. 성숙도 분석
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('성숙도 분석', margin, yPosition);
  yPosition += 12;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  
  const maturityDescription = getMaturityDescription(maturityLevel);
  const lines = doc.splitTextToSize(maturityDescription, contentWidth);
  doc.text(lines, margin, yPosition);
  yPosition += lines.length * 5 + 15;
  
  // 5. SWOT 분석
  if (yPosition > pageHeight - 80) {
    doc.addPage();
    yPosition = margin;
  }
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('SWOT 분석', margin, yPosition);
  yPosition += 12;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Strengths
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 197, 94); // green-500
  doc.text('강점 (Strengths):', margin, yPosition);
  yPosition += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  data.analysis.strengths.forEach(strength => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(`• ${strength}`, margin + 5, yPosition);
    yPosition += 5;
  });
  yPosition += 8;
  
  // Weaknesses
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(239, 68, 68); // red-500
  doc.text('약점 (Weaknesses):', margin, yPosition);
  yPosition += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  data.analysis.weaknesses.forEach(weakness => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(`• ${weakness}`, margin + 5, yPosition);
    yPosition += 5;
  });
  yPosition += 8;
  
  // Opportunities
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(59, 130, 246); // blue-500
  doc.text('기회 (Opportunities):', margin, yPosition);
  yPosition += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  data.analysis.opportunities.forEach(opportunity => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(`• ${opportunity}`, margin + 5, yPosition);
    yPosition += 5;
  });
  yPosition += 8;
  
  // Threats
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11); // yellow-500
  doc.text('위협 (Threats):', margin, yPosition);
  yPosition += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  data.analysis.threats.forEach(threat => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(`• ${threat}`, margin + 5, yPosition);
    yPosition += 5;
  });
  yPosition += 15;
  
  // 6. 권고사항
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('권고사항', margin, yPosition);
  yPosition += 12;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  
  data.analysis.recommendations.forEach((recommendation, index) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    const lines = doc.splitTextToSize(`${index + 1}. ${recommendation}`, contentWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 5 + 3;
  });
  
  // 7. 푸터
  doc.addPage();
  yPosition = margin;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('AI 역량진단 점수체크 보고서', pageWidth / 2, yPosition, { align: 'center' });
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
 * 성숙도 레벨에 따른 설명 반환
 */
function getMaturityDescription(level: string): string {
  const descriptions: Record<string, string> = {
    '초기 단계': 'AI 도입을 위한 기본적인 이해와 준비가 필요한 단계입니다. 데이터 관리, 조직 문화, 기술 인프라 등 기반 요소부터 체계적으로 구축해야 합니다.',
    '발전 단계': 'AI 도입을 위한 기본 토대가 마련된 단계입니다. 구체적인 AI 프로젝트를 시작하고, 조직 내 AI 역량을 점진적으로 확대해 나가야 합니다.',
    '성숙 단계': 'AI를 효과적으로 활용하여 비즈니스 가치를 창출하고 있는 단계입니다. 지속적인 혁신과 최적화를 통해 AI 경쟁력을 강화해야 합니다.',
    '최적화 단계': 'AI가 조직의 핵심 경쟁력으로 자리잡은 단계입니다. AI 기반의 비즈니스 모델 혁신과 새로운 가치 창출에 집중해야 합니다.',
    '혁신 단계': 'AI를 통해 산업을 선도하고 새로운 표준을 제시하는 단계입니다. AI 윤리와 사회적 책임을 고려한 지속가능한 혁신을 추구해야 합니다.'
  };
  
  return descriptions[level] || '성숙도 분석 정보가 없습니다.';
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
  doc.text(`총점: ${data.scores.totalScore}점`, margin, yPosition);
  yPosition += 10;
  doc.text(`평균점: ${data.scores.averageScore.toFixed(1)}점`, margin, yPosition);
  yPosition += 10;
  doc.text(`등급: ${data.scores.grade}`, margin, yPosition);
  yPosition += 10;
  doc.text(`성숙도: ${data.scores.maturityLevel}`, margin, yPosition);
  yPosition += 10;
  doc.text(`백분위: 상위 ${data.scores.percentile}%`, margin, yPosition);
  
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

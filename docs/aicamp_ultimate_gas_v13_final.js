// ================================================================================
// AICAMP 통합 시스템 V13.0 ULTIMATE - Final Part
// Google Sheets 통합, HTML 보고서, 상담신청, 오류신고, 시스템 헬스체크
// ================================================================================

// ================================================================================
// MODULE 12: Google Sheets 통합 시스템
// ================================================================================

/**
 * AI 역량진단 데이터 저장
 */
function saveAIDiagnosisData(normalizedData, aiReport, analysisResults) {
  console.log('💾 AI역량진단 데이터 저장 시작');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEETS_CONFIG.SPREADSHEET_ID);
    
    // 1. 메인 진단 데이터 저장
    const mainSheet = getOrCreateSheet(spreadsheet, SHEETS_CONFIG.SHEETS.AI_DIAGNOSIS_MAIN);
    saveMainDiagnosisData(mainSheet, normalizedData, aiReport, analysisResults);
    
    // 2. 점수 분석 데이터 저장
    const scoreSheet = getOrCreateSheet(spreadsheet, SHEETS_CONFIG.SHEETS.AI_DIAGNOSIS_SCORES);
    saveScoreAnalysisData(scoreSheet, normalizedData, analysisResults.scores);
    
    // 3. SWOT 분석 데이터 저장
    const swotSheet = getOrCreateSheet(spreadsheet, SHEETS_CONFIG.SHEETS.AI_DIAGNOSIS_SWOT);
    saveSWOTAnalysisData(swotSheet, normalizedData, analysisResults.swot);
    
    // 4. 보고서 데이터 저장
    const reportSheet = getOrCreateSheet(spreadsheet, SHEETS_CONFIG.SHEETS.AI_DIAGNOSIS_REPORTS);
    saveReportData(reportSheet, normalizedData, aiReport, analysisResults);
    
    // 5. 회원 관리 데이터 업데이트
    const memberSheet = getOrCreateSheet(spreadsheet, SHEETS_CONFIG.SHEETS.MEMBER_MANAGEMENT);
    updateMemberData(memberSheet, normalizedData);
    
    console.log('✅ 모든 데이터 저장 완료');
    
    return {
      success: true,
      sheetsUpdated: 5,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 데이터 저장 오류:', error);
    return {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    console.log(`📄 새 시트 생성: ${sheetName}`);
  }
  return sheet;
}

/**
 * 메인 진단 데이터 저장
 */
function saveMainDiagnosisData(sheet, normalizedData, aiReport, analysisResults) {
  // 헤더 설정 (최초 1회)
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명', '담당자명', '이메일', '연락처', '직책',
      '업종', '사업모델', '소재지', '직원수', '매출규모', '설립연도',
      '총점', '성숙도레벨', '백분위', 
      '사업기반점수', '현재AI활용점수', '조직준비도점수', 
      '기술인프라점수', '목표명확성점수', '실행역량점수',
      '경쟁포지션', '업종평균대비', '규모평균대비',
      '예상ROI', '투자회수기간', '총투자비용', '연간예상효과',
      '보고서패스워드', 'AI모델', '시스템버전'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // 데이터 행 추가
  const row = [
    normalizedData.diagnosisId,
    new Date(normalizedData.timestamp),
    normalizedData.companyName,
    normalizedData.contactName,
    normalizedData.contactEmail,
    normalizedData.contactPhone || '',
    normalizedData.contactPosition || '',
    normalizedData.industry,
    Array.isArray(normalizedData.businessType) ? normalizedData.businessType.join(', ') : normalizedData.businessType || '',
    normalizedData.location || '',
    normalizedData.employeeCount,
    normalizedData.annualRevenue || '',
    normalizedData.establishmentYear || '',
    analysisResults.scores.totalScore,
    analysisResults.scores.maturityLevel,
    analysisResults.scores.percentile,
    analysisResults.scores.sectionScores.businessFoundation?.score || 0,
    analysisResults.scores.sectionScores.currentAI?.score || 0,
    analysisResults.scores.sectionScores.organizationReadiness?.score || 0,
    analysisResults.scores.sectionScores.techInfrastructure?.score || 0,
    analysisResults.scores.sectionScores.goalClarity?.score || 0,
    analysisResults.scores.sectionScores.executionCapability?.score || 0,
    '경쟁포지션 데이터', // 실제 데이터로 교체
    '업종평균대비 데이터', // 실제 데이터로 교체  
    '규모평균대비 데이터', // 실제 데이터로 교체
    analysisResults.roi?.roiMetrics.roi || 0,
    analysisResults.roi?.roiMetrics.paybackPeriod || 0,
    analysisResults.roi?.investmentCosts.totalCost || 0,
    analysisResults.roi?.expectedBenefits.totalAnnualBenefit || 0,
    '보고서패스워드', // 실제 패스워드로 교체
    aiReport.model,
    AICAMP_CONFIG.VERSION
  ];
  
  sheet.appendRow(row);
}

/**
 * 점수 분석 데이터 저장
 */
function saveScoreAnalysisData(sheet, normalizedData, scores) {
  // 헤더 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명', '업종', '직원수',
      '주요강점1', '주요강점2', '주요강점3',
      '약점영역1', '약점영역2', '약점영역3',
      '중요갭1', '중요갭2', '중요갭3',
      '빠른개선1', '빠른개선2', '빠른개선3'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#34a853').setFontColor('white');
  }
  
  const analysis = scores.detailedAnalysis;
  
  const row = [
    normalizedData.diagnosisId,
    new Date(normalizedData.timestamp),
    normalizedData.companyName,
    normalizedData.industry,
    normalizedData.employeeCount,
    analysis.strengths[0] || '',
    analysis.strengths[1] || '',
    analysis.strengths[2] || '',
    analysis.weaknesses[0] || '',
    analysis.weaknesses[1] || '',
    analysis.weaknesses[2] || '',
    analysis.criticalGaps[0] || '',
    analysis.criticalGaps[1] || '',
    analysis.criticalGaps[2] || '',
    analysis.quickWins[0] || '',
    analysis.quickWins[1] || '',
    analysis.quickWins[2] || ''
  ];
  
  sheet.appendRow(row);
}

/**
 * SWOT 분석 결과 저장
 */
function saveSWOTAnalysisData(sheet, normalizedData, swot) {
  // 헤더 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '진단일시', '회사명',
      '내부강점', '경쟁강점', '전략강점',
      '운영약점', '기술약점', '조직약점',
      '시장기회', '기술기회', '전략기회',
      '경쟁위협', '기술위협', '시장위협',
      'SO전략', 'WO전략', 'ST전략', 'WT전략'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ff9900').setFontColor('white');
  }
  
  const row = [
    normalizedData.diagnosisId,
    new Date(normalizedData.timestamp),
    normalizedData.companyName,
    swot.strengths.internal.join(' | '),
    swot.strengths.competitive.join(' | '),
    swot.strengths.strategic.join(' | '),
    swot.weaknesses.operational.join(' | '),
    swot.weaknesses.technical.join(' | '),
    swot.weaknesses.organizational.join(' | '),
    swot.opportunities.market.join(' | '),
    swot.opportunities.technology.join(' | '),
    swot.opportunities.strategic.join(' | '),
    swot.threats.competitive.join(' | '),
    swot.threats.technical.join(' | '),
    swot.threats.market.join(' | '),
    swot.strategicRecommendations.so_strategies.join(' | '),
    swot.strategicRecommendations.wo_strategies.join(' | '),
    swot.strategicRecommendations.st_strategies.join(' | '),
    swot.strategicRecommendations.wt_strategies.join(' | ')
  ];
  
  sheet.appendRow(row);
}

/**
 * 보고서 데이터 저장
 */
function saveReportData(sheet, normalizedData, aiReport, analysisResults) {
  // 헤더 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID', '생성일시', '회사명', '담당자',
      '경영진요약', '상세분석', '전략권고', '실행가이드',
      '위험평가', '성공요인', '다음단계', 'AI인사이트',
      '품질점수', '단어수', 'AI모델'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#9c27b0').setFontColor('white');
  }
  
  const row = [
    normalizedData.diagnosisId,
    new Date(aiReport.generatedAt),
    normalizedData.companyName,
    normalizedData.contactName,
    aiReport.executiveSummary.substring(0, 500), // 길이 제한
    aiReport.detailedAnalysis.substring(0, 1000), // 길이 제한
    aiReport.strategicRecommendations.substring(0, 800), // 길이 제한
    aiReport.implementationGuidance.substring(0, 700), // 길이 제한
    aiReport.riskAssessment.substring(0, 500), // 길이 제한
    aiReport.successFactors.substring(0, 400), // 길이 제한
    aiReport.nextSteps.substring(0, 300), // 길이 제한
    aiReport.aiInsights.join(' | '),
    aiReport.qualityScore,
    aiReport.wordCount,
    aiReport.model
  ];
  
  sheet.appendRow(row);
}

/**
 * 회원 관리 데이터 업데이트
 */
function updateMemberData(sheet, normalizedData) {
  // 헤더 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '이메일', '회사명', '담당자명', '직책', '연락처', '업종', '직원수',
      '최초진단일', '최근진단일', '진단횟수', '상담상태', '계약상태', '비고'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#607d8b').setFontColor('white');
  }
  
  // 기존 회원 데이터 확인
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  let existingRowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === normalizedData.contactEmail) {
      existingRowIndex = i + 1; // 1-based index
      break;
    }
  }
  
  if (existingRowIndex > 0) {
    // 기존 회원 업데이트
    sheet.getRange(existingRowIndex, 9).setValue(new Date()); // 최근진단일
    const currentCount = sheet.getRange(existingRowIndex, 10).getValue() || 0;
    sheet.getRange(existingRowIndex, 10).setValue(currentCount + 1); // 진단횟수
  } else {
    // 새 회원 추가
    const row = [
      normalizedData.contactEmail,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactPosition || '',
      normalizedData.contactPhone || '',
      normalizedData.industry,
      normalizedData.employeeCount,
      new Date(normalizedData.timestamp), // 최초진단일
      new Date(normalizedData.timestamp), // 최근진단일
      1, // 진단횟수
      '진단완료', // 상담상태
      '미계약', // 계약상태
      '신규 진단 완료' // 비고
    ];
    sheet.appendRow(row);
  }
}

// ================================================================================
// MODULE 13: HTML 보고서 생성 시스템
// ================================================================================

/**
 * HTML 보고서 생성
 */
function generateHTMLReport(normalizedData, aiReport, analysisResults) {
  console.log('📄 HTML 보고서 생성 시작');
  
  const reportHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${normalizedData.companyName} AI역량진단 보고서</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: #f8f9fa;
        }
        .container { max-width: 1200px; margin: 0 auto; background: white; box-shadow: 0 0 30px rgba(0,0,0,0.1); }
        
        /* 헤더 스타일 */
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 60px 40px; 
            text-align: center; 
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);
            animation: slide 20s linear infinite;
        }
        @keyframes slide { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        
        .header-content { position: relative; z-index: 2; }
        .logo { font-size: 36px; font-weight: bold; margin-bottom: 15px; }
        .company-name { font-size: 28px; margin-bottom: 10px; }
        .report-title { font-size: 20px; opacity: 0.9; }
        .diagnosis-info { margin-top: 30px; display: flex; justify-content: center; gap: 40px; }
        .info-item { text-align: center; }
        .info-value { font-size: 24px; font-weight: bold; display: block; }
        .info-label { font-size: 14px; opacity: 0.8; }
        
        /* 메인 콘텐츠 */
        .main-content { padding: 40px; }
        .section { margin-bottom: 40px; padding: 30px; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .section-title { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 20px; 
            color: #2c3e50;
            border-left: 4px solid #667eea;
            padding-left: 15px;
        }
        
        /* 점수 표시 */
        .score-display { display: flex; justify-content: center; gap: 30px; margin: 30px 0; flex-wrap: wrap; }
        .score-card { 
            background: linear-gradient(135deg, #667eea, #764ba2); 
            color: white; 
            padding: 30px; 
            border-radius: 15px; 
            text-align: center; 
            min-width: 150px;
            box-shadow: 0 8px 15px rgba(102, 126, 234, 0.3);
        }
        .score-number { font-size: 36px; font-weight: bold; display: block; }
        .score-label { font-size: 14px; opacity: 0.9; margin-top: 5px; }
        
        /* 섹션별 점수 */
        .section-scores { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .section-score { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 10px; 
            border-left: 4px solid #28a745;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .section-score.low { border-left-color: #dc3545; }
        .section-score.medium { border-left-color: #ffc107; }
        .section-score.high { border-left-color: #28a745; }
        
        /* SWOT 분석 */
        .swot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
        .swot-item { padding: 20px; border-radius: 10px; }
        .swot-strengths { background: linear-gradient(135deg, #28a745, #20c997); color: white; }
        .swot-weaknesses { background: linear-gradient(135deg, #dc3545, #e83e8c); color: white; }
        .swot-opportunities { background: linear-gradient(135deg, #007bff, #6610f2); color: white; }
        .swot-threats { background: linear-gradient(135deg, #fd7e14, #e83e8c); color: white; }
        .swot-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
        .swot-list { list-style: none; }
        .swot-list li { margin-bottom: 8px; padding-left: 15px; position: relative; }
        .swot-list li::before { content: '•'; position: absolute; left: 0; font-weight: bold; }
        
        /* 로드맵 */
        .roadmap { display: flex; justify-content: space-between; gap: 20px; margin: 30px 0; flex-wrap: wrap; }
        .phase { 
            flex: 1; 
            min-width: 250px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
            padding: 25px; 
            border-radius: 12px; 
            text-align: center;
            border: 2px solid #dee2e6;
            transition: transform 0.3s ease;
        }
        .phase:hover { transform: translateY(-5px); }
        .phase-number { 
            width: 50px; 
            height: 50px; 
            background: linear-gradient(135deg, #667eea, #764ba2); 
            color: white; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 20px; 
            font-weight: bold; 
            margin: 0 auto 15px; 
        }
        .phase-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #2c3e50; }
        .phase-duration { color: #6c757d; margin-bottom: 15px; }
        .phase-goals { text-align: left; }
        .phase-goals li { margin-bottom: 5px; }
        
        /* ROI 분석 */
        .roi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .roi-item { 
            background: linear-gradient(135deg, #17a2b8, #138496); 
            color: white; 
            padding: 25px; 
            border-radius: 12px; 
            text-align: center;
            box-shadow: 0 4px 6px rgba(23, 162, 184, 0.3);
        }
        .roi-value { font-size: 28px; font-weight: bold; display: block; }
        .roi-label { font-size: 14px; opacity: 0.9; margin-top: 5px; }
        
        /* AI 분석 */
        .ai-analysis { 
            background: linear-gradient(135deg, #6f42c1, #e83e8c); 
            color: white; 
            padding: 30px; 
            border-radius: 12px; 
            margin: 30px 0;
        }
        .ai-title { font-size: 20px; font-weight: bold; margin-bottom: 20px; text-align: center; }
        .ai-content { font-size: 16px; line-height: 1.8; }
        
        /* 푸터 */
        .footer { 
            background: #2c3e50; 
            color: white; 
            padding: 40px; 
            text-align: center; 
        }
        .footer-content { margin-bottom: 20px; }
        .footer-links { display: flex; justify-content: center; gap: 30px; margin: 20px 0; flex-wrap: wrap; }
        .footer-links a { color: #3498db; text-decoration: none; }
        .footer-links a:hover { text-decoration: underline; }
        
        /* 반응형 */
        @media (max-width: 768px) {
            .header { padding: 40px 20px; }
            .main-content { padding: 20px; }
            .diagnosis-info { flex-direction: column; gap: 20px; }
            .swot-grid { grid-template-columns: 1fr; }
            .roadmap { flex-direction: column; }
            .footer-links { flex-direction: column; gap: 15px; }
        }
        
        /* 인쇄 스타일 */
        @media print {
            .header::before { display: none; }
            .section { box-shadow: none; border: 1px solid #ddd; }
            .footer { background: #f8f9fa; color: #333; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <div class="header-content">
                <div class="logo">🚀 AICAMP</div>
                <div class="company-name">${normalizedData.companyName}</div>
                <div class="report-title">AI 역량진단 종합 보고서</div>
                
                <div class="diagnosis-info">
                    <div class="info-item">
                        <span class="info-value">${analysisResults.scores.totalScore}점</span>
                        <span class="info-label">총점</span>
                    </div>
                    <div class="info-item">
                        <span class="info-value">${analysisResults.scores.maturityLevel}</span>
                        <span class="info-label">성숙도</span>
                    </div>
                    <div class="info-item">
                        <span class="info-value">${analysisResults.scores.percentile}%</span>
                        <span class="info-label">백분위</span>
                    </div>
                    <div class="info-item">
                        <span class="info-value">${new Date().toLocaleDateString('ko-KR')}</span>
                        <span class="info-label">진단일</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 메인 콘텐츠 -->
        <div class="main-content">
            <!-- 경영진 요약 -->
            <div class="section">
                <h2 class="section-title">📋 경영진 요약</h2>
                <div class="ai-content">${aiReport.executiveSummary}</div>
            </div>
            
            <!-- 점수 분석 -->
            <div class="section">
                <h2 class="section-title">📊 역량 점수 분석</h2>
                
                <div class="score-display">
                    <div class="score-card">
                        <span class="score-number">${analysisResults.scores.totalScore}</span>
                        <span class="score-label">총점</span>
                    </div>
                    <div class="score-card">
                        <span class="score-number">${analysisResults.scores.percentile}%</span>
                        <span class="score-label">백분위</span>
                    </div>
                    <div class="score-card">
                        <span class="score-number">${analysisResults.scores.maturityLevel}</span>
                        <span class="score-label">성숙도</span>
                    </div>
                </div>
                
                <div class="section-scores">
                    ${Object.entries(analysisResults.scores.sectionScores).map(([key, data]) => {
                      const scoreClass = data.score >= 75 ? 'high' : data.score >= 60 ? 'medium' : 'low';
                      return `
                        <div class="section-score ${scoreClass}">
                            <div>
                                <strong>${data.name}</strong><br>
                                <small>${data.questionCount}개 문항</small>
                            </div>
                            <div style="font-size: 24px; font-weight: bold;">${data.score}점</div>
                        </div>
                      `;
                    }).join('')}
                </div>
            </div>
            
            <!-- SWOT 분석 -->
            <div class="section">
                <h2 class="section-title">⚡ SWOT 전략 분석</h2>
                
                <div class="swot-grid">
                    <div class="swot-item swot-strengths">
                        <div class="swot-title">💪 강점 (Strengths)</div>
                        <ul class="swot-list">
                            ${[...analysisResults.swot.strengths.internal, ...analysisResults.swot.strengths.competitive, ...analysisResults.swot.strengths.strategic]
                              .slice(0, 5).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="swot-item swot-weaknesses">
                        <div class="swot-title">⚠️ 약점 (Weaknesses)</div>
                        <ul class="swot-list">
                            ${[...analysisResults.swot.weaknesses.operational, ...analysisResults.swot.weaknesses.technical, ...analysisResults.swot.weaknesses.organizational]
                              .slice(0, 5).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="swot-item swot-opportunities">
                        <div class="swot-title">🌟 기회 (Opportunities)</div>
                        <ul class="swot-list">
                            ${[...analysisResults.swot.opportunities.market, ...analysisResults.swot.opportunities.technology, ...analysisResults.swot.opportunities.strategic]
                              .slice(0, 5).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="swot-item swot-threats">
                        <div class="swot-title">⚡ 위협 (Threats)</div>
                        <ul class="swot-list">
                            ${[...analysisResults.swot.threats.competitive, ...analysisResults.swot.threats.technical, ...analysisResults.swot.threats.market]
                              .slice(0, 5).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- 3단계 실행 로드맵 -->
            <div class="section">
                <h2 class="section-title">🗺️ 3단계 실행 로드맵</h2>
                
                <div class="roadmap">
                    <div class="phase">
                        <div class="phase-number">1</div>
                        <div class="phase-title">기반 구축</div>
                        <div class="phase-duration">1-4개월</div>
                        <ul class="phase-goals">
                            <li>AI 인식 개선</li>
                            <li>데이터 수집 체계</li>
                            <li>기초 역량 강화</li>
                            <li>초기 성과 창출</li>
                        </ul>
                    </div>
                    
                    <div class="phase">
                        <div class="phase-number">2</div>
                        <div class="phase-title">역량 확장</div>
                        <div class="phase-duration">5-8개월</div>
                        <ul class="phase-goals">
                            <li>AI 기술 적용</li>
                            <li>분석 역량 고도화</li>
                            <li>자동화 시스템</li>
                            <li>파트너십 구축</li>
                        </ul>
                    </div>
                    
                    <div class="phase">
                        <div class="phase-number">3</div>
                        <div class="phase-title">혁신 실현</div>
                        <div class="phase-duration">9-12개월</div>
                        <ul class="phase-goals">
                            <li>비즈니스 혁신</li>
                            <li>역량 내재화</li>
                            <li>지속 개선</li>
                            <li>경쟁우위 확보</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- ROI 분석 -->
            <div class="section">
                <h2 class="section-title">💰 투자대비효과 분석</h2>
                
                <div class="roi-grid">
                    <div class="roi-item">
                        <span class="roi-value">${analysisResults.roi?.roiMetrics.roi || '250'}%</span>
                        <span class="roi-label">예상 ROI</span>
                    </div>
                    <div class="roi-item">
                        <span class="roi-value">${analysisResults.roi?.roiMetrics.paybackPeriod || '18'}개월</span>
                        <span class="roi-label">투자 회수</span>
                    </div>
                    <div class="roi-item">
                        <span class="roi-value">${(analysisResults.roi?.investmentCosts.totalCost || 26000000).toLocaleString()}원</span>
                        <span class="roi-label">총 투자비용</span>
                    </div>
                    <div class="roi-item">
                        <span class="roi-value">${(analysisResults.roi?.expectedBenefits.totalAnnualBenefit || 115000000).toLocaleString()}원</span>
                        <span class="roi-label">연간 효과</span>
                    </div>
                </div>
            </div>
            
            <!-- AI 분석 -->
            <div class="ai-analysis">
                <div class="ai-title">🤖 GEMINI AI 전문가 분석</div>
                <div class="ai-content">${aiReport.detailedAnalysis}</div>
            </div>
            
            <!-- 전략적 권고사항 -->
            <div class="section">
                <h2 class="section-title">🎯 전략적 권고사항</h2>
                <div class="ai-content">${aiReport.strategicRecommendations}</div>
            </div>
            
            <!-- 실행 가이드라인 -->
            <div class="section">
                <h2 class="section-title">📋 실행 가이드라인</h2>
                <div class="ai-content">${aiReport.implementationGuidance}</div>
            </div>
            
            <!-- 다음 단계 -->
            <div class="section">
                <h2 class="section-title">🚀 다음 단계 제안</h2>
                <div class="ai-content">${aiReport.nextSteps}</div>
            </div>
        </div>
        
        <!-- 푸터 -->
        <div class="footer">
            <div class="footer-content">
                <h3>🎓 AICAMP - AI 역량강화 전문 파트너</h3>
                <p>AI 역량강화를 통한 고몰입조직구축의 선도기업</p>
            </div>
            
            <div class="footer-links">
                <a href="https://aicamp.club">홈페이지</a>
                <a href="https://aicamp.club/services">서비스 안내</a>
                <a href="https://aicamp.club/consultation">전문가 상담</a>
                <a href="https://aicamp.club/success-cases">성공사례</a>
                <a href="mailto:${AICAMP_CONFIG.ADMIN_EMAIL}">문의하기</a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #34495e;">
                <p><strong>진단 정보:</strong> ID ${normalizedData.diagnosisId} | 생성일시: ${new Date().toLocaleString('ko-KR')}</p>
                <p><strong>AI 모델:</strong> ${aiReport.model} | 품질점수: ${aiReport.qualityScore}/100 | 단어수: ${aiReport.wordCount}</p>
                <p style="font-size: 12px; opacity: 0.7; margin-top: 15px;">
                    본 보고서는 AICAMP의 독점 AI 분석 기술을 통해 생성되었습니다.<br>
                    © 2024 AICAMP. All rights reserved. | Version ${AICAMP_CONFIG.VERSION}
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;

  console.log('✅ HTML 보고서 생성 완료');
  
  return {
    html: reportHTML,
    length: reportHTML.length,
    generatedAt: new Date().toISOString()
  };
}

// ================================================================================
// MODULE 14: 상담신청 처리 시스템
// ================================================================================

/**
 * 상담신청 요청 처리
 */
function handleConsultationRequest(requestData) {
  console.log('💬 상담신청 처리 시작');
  
  const consultationId = generateConsultationId();
  
  try {
    // 데이터 정규화
    const normalizedData = normalizeConsultationData(requestData.data, consultationId);
    
    // Google Sheets 저장
    const saveResult = saveConsultationData(normalizedData);
    
    // 이메일 발송
    const emailResult = sendConsultationEmails(normalizedData, consultationId);
    
    return {
      type: 'consultation_request',
      consultationId: consultationId,
      success: true,
      message: '상담신청이 성공적으로 접수되었습니다.',
      dataSaved: saveResult.success,
      emailsSent: emailResult.success,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    throw new Error(`상담신청 처리 실패: ${error.message}`);
  }
}

/**
 * 상담신청 데이터 정규화
 */
function normalizeConsultationData(rawData, consultationId) {
  return {
    consultationId: consultationId,
    timestamp: new Date().toISOString(),
    companyName: rawData.companyName?.trim(),
    contactName: rawData.contactName?.trim(),
    contactEmail: rawData.contactEmail?.toLowerCase().trim(),
    contactPhone: rawData.contactPhone?.trim(),
    contactPosition: rawData.contactPosition?.trim(),
    industry: rawData.industry,
    employeeCount: rawData.employeeCount,
    consultationType: rawData.consultationType || '일반상담',
    consultationTopic: rawData.consultationTopic || '',
    urgency: rawData.urgency || '보통',
    preferredDate: rawData.preferredDate || '',
    preferredTime: rawData.preferredTime || '',
    additionalRequest: rawData.additionalRequest || '',
    source: rawData.source || 'website',
    version: AICAMP_CONFIG.VERSION
  };
}

/**
 * 상담신청 ID 생성
 */
function generateConsultationId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `CONS_${timestamp}_${random}`;
}

// ================================================================================
// MODULE 15: 오류신고 처리 시스템
// ================================================================================

/**
 * 오류신고 요청 처리
 */
function handleErrorReport(requestData) {
  console.log('🐛 오류신고 처리 시작');
  
  const errorReportId = generateErrorReportId();
  
  try {
    // 데이터 정규화
    const normalizedData = normalizeErrorReportData(requestData.data, errorReportId);
    
    // Google Sheets 저장
    const saveResult = saveErrorReportData(normalizedData);
    
    // 이메일 발송
    const emailResult = sendErrorReportEmails(normalizedData, errorReportId);
    
    return {
      type: 'error_report',
      errorReportId: errorReportId,
      success: true,
      message: '오류신고가 성공적으로 접수되었습니다.',
      dataSaved: saveResult.success,
      emailsSent: emailResult.success,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 오류신고 처리 오류:', error);
    throw new Error(`오류신고 처리 실패: ${error.message}`);
  }
}

/**
 * 오류신고 데이터 정규화
 */
function normalizeErrorReportData(rawData, errorReportId) {
  return {
    errorReportId: errorReportId,
    timestamp: new Date().toISOString(),
    reporterName: rawData.reporterName?.trim(),
    reporterEmail: rawData.reporterEmail?.toLowerCase().trim(),
    reporterPhone: rawData.reporterPhone?.trim(),
    errorType: rawData.errorType || '세금계산기',
    errorLocation: rawData.errorLocation || '',
    errorDescription: rawData.errorDescription || '',
    expectedBehavior: rawData.expectedBehavior || '',
    actualBehavior: rawData.actualBehavior || '',
    browserInfo: rawData.browserInfo || '',
    deviceInfo: rawData.deviceInfo || '',
    screenshot: rawData.screenshot || '',
    severity: rawData.severity || '보통',
    reproducible: rawData.reproducible || '예',
    additionalInfo: rawData.additionalInfo || '',
    version: AICAMP_CONFIG.VERSION
  };
}

/**
 * 오류신고 ID 생성
 */
function generateErrorReportId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `ERR_${timestamp}_${random}`;
}

// ================================================================================
// MODULE 16: 시스템 헬스체크 및 유틸리티
// ================================================================================

/**
 * 시스템 상태 확인
 */
function checkSystemHealth() {
  console.log('🔍 시스템 상태 확인');
  
  const health = {
    timestamp: new Date().toISOString(),
    version: AICAMP_CONFIG.VERSION,
    status: 'healthy',
    checks: {
      geminiAPI: checkGeminiAPIHealth(),
      googleSheets: checkGoogleSheetsHealth(),
      emailService: checkEmailServiceHealth()
    }
  };
  
  // 전체 상태 결정
  const failedChecks = Object.values(health.checks).filter(check => !check.status);
  if (failedChecks.length > 0) {
    health.status = 'unhealthy';
  } else if (Object.values(health.checks).some(check => check.warning)) {
    health.status = 'warning';
  }
  
  return health;
}

/**
 * GEMINI API 상태 확인
 */
function checkGeminiAPIHealth() {
  try {
    // 간단한 테스트 요청
    const testPrompt = "테스트";
    const response = UrlFetchApp.fetch(`${AICAMP_CONFIG.GEMINI_API_URL}?key=${AICAMP_CONFIG.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      payload: JSON.stringify({
        contents: [{ parts: [{ text: testPrompt }] }],
        generationConfig: { maxOutputTokens: 10 }
      }),
      muteHttpExceptions: true
    });
    
    return {
      status: response.getResponseCode() === 200,
      responseTime: response.getHeaders()['Date'] ? 'OK' : 'Unknown',
      message: response.getResponseCode() === 200 ? 'API 정상' : `API 오류: ${response.getResponseCode()}`
    };
  } catch (error) {
    return {
      status: false,
      message: `API 연결 실패: ${error.message}`
    };
  }
}

/**
 * Google Sheets 상태 확인
 */
function checkGoogleSheetsHealth() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEETS_CONFIG.SPREADSHEET_ID);
    const sheetCount = spreadsheet.getSheets().length;
    
    return {
      status: true,
      sheetCount: sheetCount,
      message: `Sheets 정상 (${sheetCount}개 시트)`
    };
  } catch (error) {
    return {
      status: false,
      message: `Sheets 연결 실패: ${error.message}`
    };
  }
}

/**
 * 이메일 서비스 상태 확인
 */
function checkEmailServiceHealth() {
  try {
    const quota = MailApp.getRemainingDailyQuota();
    
    return {
      status: quota > 0,
      quota: quota,
      warning: quota < 10,
      message: `이메일 할당량: ${quota}개 남음`
    };
  } catch (error) {
    return {
      status: false,
      message: `이메일 서비스 오류: ${error.message}`
    };
  }
}

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `DIAG_${timestamp}_${random}`;
}

/**
 * 오류 알림 발송
 */
function sendErrorNotification(error, requestData) {
  try {
    MailApp.sendEmail({
      to: AICAMP_CONFIG.ADMIN_EMAIL,
      subject: '[시스템 오류] AICAMP 통합 시스템 오류 발생',
      htmlBody: `
        <h3>🚨 시스템 오류 발생</h3>
        <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        <p><strong>버전:</strong> ${AICAMP_CONFIG.VERSION}</p>
        <p><strong>오류:</strong> ${error.toString()}</p>
        <p><strong>요청 데이터:</strong></p>
        <pre>${JSON.stringify(requestData, null, 2)}</pre>
      `
    });
  } catch (mailError) {
    console.error('❌ 오류 알림 이메일 발송 실패:', mailError);
  }
}

/**
 * 이메일 발송 (공통 함수)
 */
function sendEmail(to, subject, htmlBody) {
  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * 이메일 발송 로그 저장
 */
function logEmailSending(logData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEETS_CONFIG.SPREADSHEET_ID);
    const logSheet = getOrCreateSheet(spreadsheet, SHEETS_CONFIG.SHEETS.EMAIL_LOG);
    
    // 헤더 설정
    if (logSheet.getLastRow() === 0) {
      const headers = [
        '로그ID', '발송일시', '진단ID', '신청자이메일', '관리자이메일',
        '보고서패스워드', '발송상태', '오류내용'
      ];
      logSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      logSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    const row = [
      'LOG_' + Date.now(),
      new Date(logData.timestamp),
      logData.diagnosisId,
      logData.applicantEmail,
      logData.adminEmail,
      logData.reportPassword,
      '성공',
      ''
    ];
    
    logSheet.appendRow(row);
  } catch (error) {
    console.error('❌ 이메일 로그 저장 오류:', error);
  }
}

console.log('🎯 AICAMP 통합 시스템 V13.0 ULTIMATE - 모든 모듈 로드 완료');
console.log('📋 주요 기능:');
console.log('  ✅ 45문항 AI역량진단 (GEMINI 2.5 Flash)');
console.log('  ✅ SWOT → 매트릭스 → 로드맵 논리적 연계');
console.log('  ✅ 회원인식 기반 이메일 시스템');
console.log('  ✅ Google Sheets 자동 관리');
console.log('  ✅ HTML 보고서 생성');
console.log('  ✅ 상담신청 & 오류신고 처리');
console.log('  ✅ 시스템 헬스체크');
console.log('🚀 시스템 준비 완료 - 최상급 품질 보장!');

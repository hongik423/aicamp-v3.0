// ================================================================================
// 📧 AICAMP AI 역량진단 시스템 - 이메일 및 데이터 저장 모듈
// ================================================================================

/**
 * 진단 완료 이메일 발송
 */
function sendDiagnosisEmails(applicationData, reportData, diagnosisId) {
  console.log('📧 이메일 발송 시작');
  
  try {
    // 신청자 이메일 발송
    if (applicationData.email && isValidEmail(applicationData.email)) {
      sendApplicantEmail(applicationData, reportData, diagnosisId);
    }
    
    // 관리자 이메일 발송
    if (ENV.ADMIN_EMAIL && isValidEmail(ENV.ADMIN_EMAIL)) {
      sendAdminNotification(applicationData, diagnosisId);
    }
    
    console.log('✅ 이메일 발송 완료');
    return true;
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    logError(error, { context: 'email_sending', diagnosisId });
    return false;
  }
}

/**
 * 신청자 확인 이메일
 */
function sendApplicantEmail(appData, reportData, diagnosisId) {
  const subject = `[AICAMP] ${appData.companyName}님의 AI 역량진단이 완료되었습니다`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Noto Sans KR', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .highlight-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .score-display {
      font-size: 48px;
      font-weight: bold;
      color: #667eea;
      text-align: center;
      margin: 20px 0;
    }
    .grade-display {
      font-size: 24px;
      color: #764ba2;
      text-align: center;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      margin: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #667eea;
      color: white;
    }
    .priority-high {
      color: #e74c3c;
      font-weight: bold;
    }
    .priority-medium {
      color: #f39c12;
      font-weight: bold;
    }
    .priority-low {
      color: #27ae60;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${AICAMP_INFO.LOGO_URL}" alt="AICAMP" class="logo">
    <h1>AI 역량진단이 완료되었습니다!</h1>
    <p>귀사의 AI 전환을 위한 맞춤형 전략을 확인하세요</p>
  </div>
  
  <div class="content">
    <p>안녕하세요, ${appData.contactName || appData.companyName} 님</p>
    
    <p><strong>${appData.companyName}</strong>의 AI 역량진단이 성공적으로 완료되었습니다. 
    아래에서 주요 결과를 확인하시고, 상세 보고서를 다운로드해주세요.</p>
    
    <div class="highlight-box">
      <h2 style="text-align: center; color: #667eea;">종합 진단 결과</h2>
      <div class="score-display">${reportData.metadata.score || '75'}점</div>
      <div class="grade-display">${reportData.metadata.grade || 'B'}등급 | ${reportData.metadata.maturityLevel || 'AI 확산적용'}</div>
      
      <table>
        <tr>
          <th>평가 항목</th>
          <th>점수</th>
          <th>수준</th>
        </tr>
        <tr>
          <td>AI 이해 및 전략</td>
          <td>${reportData.metadata.scores?.aiUnderstanding || '70'}점</td>
          <td>양호</td>
        </tr>
        <tr>
          <td>데이터 관리</td>
          <td>${reportData.metadata.scores?.dataManagement || '65'}점</td>
          <td>개선필요</td>
        </tr>
        <tr>
          <td>프로세스 혁신</td>
          <td>${reportData.metadata.scores?.processOptimization || '75'}점</td>
          <td>양호</td>
        </tr>
        <tr>
          <td>인재 육성</td>
          <td>${reportData.metadata.scores?.talentDevelopment || '60'}점</td>
          <td>개선필요</td>
        </tr>
        <tr>
          <td>고객 경험</td>
          <td>${reportData.metadata.scores?.customerExperience || '80'}점</td>
          <td>우수</td>
        </tr>
      </table>
    </div>
    
    <div class="highlight-box">
      <h3>🎯 즉시 실행 권장 사항</h3>
      <ol>
        <li class="priority-high">AI 전환 TF팀 구성 및 킥오프 (1주 내)</li>
        <li class="priority-high">Quick Win 프로젝트 선정 및 착수 (2주 내)</li>
        <li class="priority-medium">전직원 AI 기초 교육 실시 (1개월 내)</li>
      </ol>
    </div>
    
    <div class="highlight-box">
      <h3>💰 투자 대비 효과 예측</h3>
      <ul>
        <li><strong>예상 투자금</strong>: ${reportData.metadata.investment || '1.5억원'}</li>
        <li><strong>예상 ROI</strong>: ${reportData.metadata.roi || '180%'}</li>
        <li><strong>투자회수기간</strong>: ${reportData.metadata.payback || '10개월'}</li>
        <li><strong>12개월 후 예상 성과</strong>: ${appData.expectedBenefits || '생산성 30% 향상'}</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${getReportDownloadUrl(diagnosisId)}" class="cta-button">
        📄 상세 보고서 다운로드
      </a>
      <a href="tel:${AICAMP_INFO.CEO_PHONE}" class="cta-button" style="background: #27ae60;">
        📞 무료 상담 신청
      </a>
    </div>
    
    <div class="highlight-box" style="background: #fff3cd; border: 1px solid #ffeaa7;">
      <h3>🎁 특별 제안</h3>
      <p><strong>지금 상담 신청하시면:</strong></p>
      <ul>
        <li>정부 AI 바우처 신청 지원 (최대 3억원)</li>
        <li>무료 파일럿 프로젝트 컨설팅</li>
        <li>맞춤형 AI 교육 프로그램 20% 할인</li>
      </ul>
      <p style="color: #e74c3c;"><strong>※ 진단 후 7일 내 신청 시에만 적용됩니다.</strong></p>
    </div>
    
    <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>📞 문의하기</h3>
      <p>AI 전환에 대해 궁금하신 점이 있으시면 언제든 연락주세요.</p>
      <ul style="list-style: none; padding: 0;">
        <li>📱 전화: <a href="tel:${AICAMP_INFO.CEO_PHONE}">${AICAMP_INFO.CEO_PHONE}</a></li>
        <li>✉️ 이메일: <a href="mailto:${AICAMP_INFO.CEO_EMAIL}">${AICAMP_INFO.CEO_EMAIL}</a></li>
        <li>💬 카카오톡: <a href="http://pf.kakao.com/_xjxaVxj">${AICAMP_INFO.KAKAO_ID}</a></li>
        <li>🌐 웹사이트: <a href="${AICAMP_INFO.WEBSITE}">${AICAMP_INFO.WEBSITE}</a></li>
      </ul>
    </div>
  </div>
  
  <div class="footer">
    <p><strong>AICAMP</strong> | AI로 만드는 고몰입 조직</p>
    <p>이 메일은 AI 역량진단을 신청하신 분께 발송되었습니다.</p>
    <p>진단 ID: ${diagnosisId}</p>
    <p style="font-size: 12px; color: #999;">
      © 2025 AICAMP. All rights reserved.<br>
      ${getCurrentKoreanTime()}
    </p>
  </div>
</body>
</html>
  `;
  
  const textBody = `
${appData.companyName}님의 AI 역량진단이 완료되었습니다.

[종합 진단 결과]
- 종합 점수: ${reportData.metadata.score || '75'}점
- 등급: ${reportData.metadata.grade || 'B'}등급
- AI 성숙도: ${reportData.metadata.maturityLevel || 'AI 확산적용'}

[즉시 실행 권장 사항]
1. AI 전환 TF팀 구성 및 킥오프 (1주 내)
2. Quick Win 프로젝트 선정 및 착수 (2주 내)
3. 전직원 AI 기초 교육 실시 (1개월 내)

상세 보고서: ${getReportDownloadUrl(diagnosisId)}

문의: ${AICAMP_INFO.CEO_PHONE}
진단 ID: ${diagnosisId}
  `;
  
  try {
    MailApp.sendEmail({
      to: appData.email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI 역량진단',
      replyTo: AICAMP_INFO.CEO_EMAIL
    });
    
    console.log(`✅ 신청자 이메일 발송 완료: ${appData.email}`);
    
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 관리자 알림 이메일
 */
function sendAdminNotification(appData, diagnosisId) {
  const subject = `[AI진단] ${appData.companyName} - ${appData.industry} 진단 완료`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .highlight { background-color: #ffffcc; }
    .score-high { color: #27ae60; font-weight: bold; }
    .score-medium { color: #f39c12; font-weight: bold; }
    .score-low { color: #e74c3c; font-weight: bold; }
  </style>
</head>
<body>
  <h2>AI 역량진단 신규 완료 알림</h2>
  
  <h3>기업 정보</h3>
  <table>
    <tr>
      <th>항목</th>
      <th>내용</th>
    </tr>
    <tr>
      <td>진단 ID</td>
      <td><strong>${diagnosisId}</strong></td>
    </tr>
    <tr>
      <td>회사명</td>
      <td class="highlight">${appData.companyName}</td>
    </tr>
    <tr>
      <td>업종</td>
      <td>${appData.industry}</td>
    </tr>
    <tr>
      <td>담당자</td>
      <td>${appData.contactName} (${appData.position || '미제공'})</td>
    </tr>
    <tr>
      <td>연락처</td>
      <td>
        📧 ${appData.email}<br>
        📱 ${formatPhoneNumber(appData.phone)}
      </td>
    </tr>
    <tr>
      <td>직원수</td>
      <td>${appData.employeeCount || '미제공'}</td>
    </tr>
    <tr>
      <td>연매출</td>
      <td>${appData.annualRevenue || '미제공'}</td>
    </tr>
  </table>
  
  <h3>진단 결과</h3>
  <table>
    <tr>
      <td>종합 점수</td>
      <td class="${getScoreClass(appData.totalScore)}">${appData.totalScore || '계산중'}점</td>
    </tr>
    <tr>
      <td>AI 성숙도</td>
      <td>${appData.maturityLevel || '분석중'}</td>
    </tr>
    <tr>
      <td>주요 고민사항</td>
      <td>${appData.mainChallenges || '미제공'}</td>
    </tr>
    <tr>
      <td>예상 혜택</td>
      <td>${appData.expectedBenefits || '미제공'}</td>
    </tr>
    <tr>
      <td>희망 컨설팅</td>
      <td class="highlight">${appData.consultingArea || '미제공'}</td>
    </tr>
    <tr>
      <td>예산 범위</td>
      <td>${appData.budgetRange || '미정'}</td>
    </tr>
  </table>
  
  <h3>후속 조치 필요</h3>
  <ul>
    <li>48시간 내 전화 상담 진행</li>
    <li>맞춤형 제안서 준비</li>
    <li>정부 지원금 매칭 확인</li>
  </ul>
  
  <h3>빠른 링크</h3>
  <ul>
    <li><a href="${GOOGLE_SHEETS_URL}">구글 시트 열기</a></li>
    <li><a href="${getReportDownloadUrl(diagnosisId)}">보고서 다운로드</a></li>
  </ul>
  
  <hr>
  <p style="color: #666; font-size: 12px;">
    생성 시각: ${getCurrentKoreanTime()}<br>
    시스템 버전: ${VERSION}
  </p>
</body>
</html>
  `;
  
  try {
    MailApp.sendEmail({
      to: ENV.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 진단 시스템'
    });
    
    console.log(`✅ 관리자 알림 발송 완료: ${ENV.ADMIN_EMAIL}`);
    
  } catch (error) {
    console.error('❌ 관리자 알림 발송 실패:', error);
    // 관리자 알림 실패는 전체 프로세스를 중단하지 않음
  }
}

/**
 * 진단 데이터 저장
 */
function saveDiagnosisData(applicationData, evaluationData, analysisData, reportData) {
  console.log('💾 진단 데이터 저장 시작');
  const startTime = new Date().getTime();
  
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const diagnosisId = applicationData.diagnosisId || generateDiagnosisId();
    
    // 1. 진단 신청 데이터 저장
    saveDiagnosisApplication(spreadsheet, diagnosisId, applicationData, evaluationData);
    
    // 2. 평가 결과 저장
    saveEvaluationResults(spreadsheet, diagnosisId, evaluationData);
    
    // 3. 보고서 이력 저장
    saveReportHistory(spreadsheet, diagnosisId, reportData);
    
    // 4. 진행 상황 업데이트
    updateDiagnosisStatus(diagnosisId, '완료');
    
    logPerformance('데이터 저장', startTime, true);
    console.log('✅ 진단 데이터 저장 완료:', diagnosisId);
    
    return diagnosisId;
    
  } catch (error) {
    logPerformance('데이터 저장', startTime, false, error.toString());
    console.error('❌ 데이터 저장 오류:', error);
    throw error;
  }
}

/**
 * 진단 신청 데이터 저장
 */
function saveDiagnosisApplication(spreadsheet, diagnosisId, appData, evalData) {
  const sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
  
  if (!sheet) {
    throw new Error(`시트를 찾을 수 없습니다: ${SHEETS.DIAGNOSIS}`);
  }
  
  const row = [
    diagnosisId,
    getCurrentKoreanTime(),
    appData.companyName || '',
    appData.industry || '',
    appData.contactName || '',
    appData.email || '',
    formatPhoneNumber(appData.phone) || '',
    evalData.scores.totalScore || 0,
    evalData.scores.grade || '',
    evalData.maturityLevel || '',
    evalData.aiMatrix?.currentPosition?.quadrant || '',
    appData.mainChallenges || '',
    appData.expectedBenefits || '',
    appData.consultingArea || '',
    '완료'
  ];
  
  sheet.appendRow(row);
  
  // 조건부 서식 적용
  const lastRow = sheet.getLastRow();
  const scoreCell = sheet.getRange(lastRow, 8);
  
  if (evalData.scores.totalScore >= 80) {
    scoreCell.setBackground('#d4edda').setFontColor('#155724');
  } else if (evalData.scores.totalScore >= 60) {
    scoreCell.setBackground('#fff3cd').setFontColor('#856404');
  } else {
    scoreCell.setBackground('#f8d7da').setFontColor('#721c24');
  }
}

/**
 * 평가 결과 저장
 */
function saveEvaluationResults(spreadsheet, diagnosisId, evalData) {
  let sheet = spreadsheet.getSheetByName(SHEETS.EVALUATION);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.EVALUATION);
    const headers = getSheetHeaders('EVALUATION');
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#667eea')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
  
  const scores = evalData.scores;
  const aiScores = scores.aiCapability.scores;
  const practicalScores = scores.practicalCapability.scores;
  
  const row = [
    diagnosisId,
    getCurrentKoreanTime(),
    scores.totalScore,
    scores.grade,
    evalData.maturityLevel,
    aiScores.aiUnderstanding || 0,
    aiScores.dataManagement || 0,
    aiScores.processOptimization || 0,
    aiScores.talentDevelopment || 0,
    aiScores.customerExperience || 0,
    practicalScores.documentAutomation || 0,
    practicalScores.dataAnalysisPractice || 0,
    practicalScores.aiToolUsage || 0,
    practicalScores.digitalCollaboration || 0,
    practicalScores.industrySpecific || 0,
    safeJsonStringify(evalData.benchmark)
  ];
  
  sheet.appendRow(row);
}

/**
 * 보고서 이력 저장
 */
function saveReportHistory(spreadsheet, diagnosisId, reportData) {
  let sheet = spreadsheet.getSheetByName(SHEETS.REPORTS);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.REPORTS);
    const headers = getSheetHeaders('REPORTS');
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#667eea')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
  
  // 보고서를 Google Drive에 저장
  const reportUrl = saveReportToDrive(diagnosisId, reportData.report);
  
  const row = [
    diagnosisId,
    getCurrentKoreanTime(),
    reportData.metadata.length || 0,
    reportData.metadata.quality || 'N/A',
    reportData.metadata.personalizationScore || 0,
    reportUrl
  ];
  
  sheet.appendRow(row);
}

/**
 * 보고서를 Google Drive에 저장
 */
function saveReportToDrive(diagnosisId, reportContent) {
  try {
    // 보고서 폴더 확인/생성
    const folderName = 'AICAMP_AI진단보고서';
    let folder;
    
    const folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // 파일명 생성
    const fileName = `AI역량진단보고서_${diagnosisId}_${getCurrentKoreanTime().replace(/[:\s]/g, '_')}.md`;
    
    // 파일 생성
    const blob = Utilities.newBlob(reportContent, 'text/markdown', fileName);
    const file = folder.createFile(blob);
    
    // 공유 설정 (링크를 아는 모든 사용자)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log(`✅ 보고서 저장 완료: ${file.getUrl()}`);
    return file.getUrl();
    
  } catch (error) {
    console.error('❌ 보고서 저장 실패:', error);
    return 'Drive 저장 실패';
  }
}

/**
 * 진단 결과 조회
 */
function getDiagnosisResult(diagnosisId) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    
    // 1. 진단 신청 정보 조회
    const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    const diagnosisData = findRowByDiagnosisId(diagnosisSheet, diagnosisId);
    
    if (!diagnosisData) {
      return {
        success: false,
        error: '진단 ID를 찾을 수 없습니다.'
      };
    }
    
    // 2. 평가 결과 조회
    const evaluationSheet = spreadsheet.getSheetByName(SHEETS.EVALUATION);
    const evaluationData = findRowByDiagnosisId(evaluationSheet, diagnosisId);
    
    // 3. 보고서 조회
    const reportSheet = spreadsheet.getSheetByName(SHEETS.REPORTS);
    const reportData = findRowByDiagnosisId(reportSheet, diagnosisId);
    
    return {
      success: true,
      data: {
        diagnosis: diagnosisData,
        evaluation: evaluationData,
        report: reportData
      }
    };
    
  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 진단 ID로 행 찾기
 */
function findRowByDiagnosisId(sheet, diagnosisId) {
  if (!sheet) return null;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === diagnosisId) {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = data[i][index];
      });
      return rowData;
    }
  }
  
  return null;
}

/**
 * 대시보드 데이터 조회
 */
function getDashboardData(filters = {}) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!diagnosisSheet) {
      return {
        success: false,
        error: '진단 데이터 시트를 찾을 수 없습니다.'
      };
    }
    
    const data = diagnosisSheet.getDataRange().getValues();
    const headers = data[0];
    
    // 필터링된 데이터
    const filteredData = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = data[i][index];
      });
      
      // 필터 적용
      let include = true;
      
      if (filters.startDate && new Date(row['신청일시']) < new Date(filters.startDate)) {
        include = false;
      }
      
      if (filters.endDate && new Date(row['신청일시']) > new Date(filters.endDate)) {
        include = false;
      }
      
      if (filters.industry && row['업종'] !== filters.industry) {
        include = false;
      }
      
      if (filters.status && row['처리상태'] !== filters.status) {
        include = false;
      }
      
      if (include) {
        filteredData.push(row);
      }
    }
    
    // 통계 계산
    const statistics = calculateDashboardStatistics(filteredData);
    
    return {
      success: true,
      data: {
        records: filteredData.slice(0, 100), // 최대 100개
        statistics: statistics,
        totalCount: filteredData.length
      }
    };
    
  } catch (error) {
    console.error('❌ 대시보드 데이터 조회 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 대시보드 통계 계산
 */
function calculateDashboardStatistics(data) {
  if (data.length === 0) {
    return {
      totalDiagnosis: 0,
      averageScore: 0,
      industryDistribution: {},
      scoreDistribution: {},
      monthlyTrend: []
    };
  }
  
  // 기본 통계
  const totalDiagnosis = data.length;
  const scores = data.map(d => d['종합점수']).filter(s => s);
  const averageScore = scores.length > 0 ? 
    Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  
  // 업종별 분포
  const industryDistribution = {};
  data.forEach(d => {
    const industry = d['업종'] || '기타';
    industryDistribution[industry] = (industryDistribution[industry] || 0) + 1;
  });
  
  // 점수 분포
  const scoreDistribution = {
    'S (90+)': 0,
    'A (80-89)': 0,
    'B (70-79)': 0,
    'C (60-69)': 0,
    'D (50-59)': 0,
    'F (0-49)': 0
  };
  
  scores.forEach(score => {
    if (score >= 90) scoreDistribution['S (90+)']++;
    else if (score >= 80) scoreDistribution['A (80-89)']++;
    else if (score >= 70) scoreDistribution['B (70-79)']++;
    else if (score >= 60) scoreDistribution['C (60-69)']++;
    else if (score >= 50) scoreDistribution['D (50-59)']++;
    else scoreDistribution['F (0-49)']++;
  });
  
  // 월별 추이
  const monthlyTrend = calculateMonthlyTrend(data);
  
  return {
    totalDiagnosis,
    averageScore,
    industryDistribution,
    scoreDistribution,
    monthlyTrend
  };
}

/**
 * 월별 추이 계산
 */
function calculateMonthlyTrend(data) {
  const monthlyData = {};
  
  data.forEach(d => {
    const date = new Date(d['신청일시']);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        count: 0,
        totalScore: 0
      };
    }
    
    monthlyData[monthKey].count++;
    if (d['종합점수']) {
      monthlyData[monthKey].totalScore += d['종합점수'];
    }
  });
  
  // 평균 계산 및 정렬
  return Object.values(monthlyData)
    .map(m => ({
      month: m.month,
      count: m.count,
      averageScore: m.count > 0 ? Math.round(m.totalScore / m.count) : 0
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // 최근 12개월
}

// 헬퍼 함수들
function getScoreClass(score) {
  if (score >= 80) return 'score-high';
  if (score >= 60) return 'score-medium';
  return 'score-low';
}

function getReportDownloadUrl(diagnosisId) {
  return `${getWebAppUrl()}?action=download&diagnosisId=${diagnosisId}`;
}

/**
 * 진단 상태 업데이트
 */
function updateDiagnosisStatus(diagnosisId, status) {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
    
    if (!sheet) return;
    
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        sheet.getRange(i + 1, 15).setValue(status); // 처리상태 열
        console.log(`✅ 진단 상태 업데이트: ${diagnosisId} → ${status}`);
        break;
      }
    }
  } catch (error) {
    console.error('❌ 상태 업데이트 오류:', error);
  }
}
/**
 * Google Apps Script 라우팅 업데이트 가이드
 * 
 * docs/aicamp_ultimate_gas_v14_integrated.js 파일의 
 * handleIntegratedWorkflowResult 함수를 다음과 같이 수정하세요
 */

// ================================================================================
// 수정 1: handleIntegratedWorkflowResult 함수 개선 (4592줄 부근)
// ================================================================================

function handleIntegratedWorkflowResult(requestData, progressId) {
  try {
    console.log('🎯 통합 워크플로우 결과 처리 시작 - V15.0');
    console.log('📊 받은 데이터 타입:', requestData.type);
    console.log('📊 처리 타입:', requestData.processType);
    
    // Next.js에서 보낸 데이터 구조 확인
    const hasWorkflowResult = requestData.workflowResult;
    const hasDirectData = requestData.scoreAnalysis && requestData.swotAnalysis;
    
    if (!hasWorkflowResult && !hasDirectData) {
      throw new Error('워크플로우 결과 또는 분석 데이터가 없습니다.');
    }
    
    // 데이터 정규화
    let analysisData;
    if (hasWorkflowResult) {
      // 기존 방식 (workflowResult 객체 내부)
      analysisData = requestData.workflowResult;
    } else {
      // 새로운 방식 (직접 전달)
      analysisData = {
        diagnosisId: requestData.diagnosisId,
        companyInfo: {
          name: requestData.companyName,
          industry: requestData.industry,
          size: requestData.employeeCount,
          contact: {
            name: requestData.contactName,
            email: requestData.contactEmail,
            phone: requestData.contactPhone
          }
        },
        scoreAnalysis: requestData.scoreAnalysis,
        swotAnalysis: requestData.swotAnalysis,
        recommendations: requestData.recommendations,
        roadmap: requestData.roadmap,
        qualityMetrics: requestData.qualityMetrics
      };
    }
    
    // 1단계: 진행 상황 업데이트
    updateProgressStatus(progressId, 'processing', 'SWOT 분석 및 보고서 생성을 시작합니다');
    
    // 2단계: SWOT 분석 처리
    console.log('🔍 SWOT 분석 처리');
    const swotResult = processSwotAnalysis(analysisData.swotAnalysis);
    
    // 3단계: McKinsey 보고서 생성
    console.log('📄 McKinsey 보고서 생성');
    updateProgressStatus(progressId, 'processing', 'McKinsey 스타일 보고서를 생성하고 있습니다');
    
    const htmlReport = generateMcKinseyHTMLReport({
      diagnosisId: analysisData.diagnosisId,
      companyInfo: analysisData.companyInfo,
      scoreAnalysis: analysisData.scoreAnalysis,
      swotAnalysis: swotResult,
      recommendations: analysisData.recommendations,
      roadmap: analysisData.roadmap
    });
    
    // 4단계: Google Sheets 저장
    console.log('📊 Google Sheets 저장');
    updateProgressStatus(progressId, 'processing', 'Google Sheets에 분석 결과를 저장하고 있습니다');
    
    const sheetsResult = saveCompleteDiagnosisToSheets({
      ...analysisData,
      swotResult: swotResult,
      reportGenerated: true,
      timestamp: new Date().toISOString()
    });
    
    // 5단계: Google Drive 업로드
    let driveFileUrl = null;
    if (htmlReport) {
      console.log('📁 Google Drive 업로드');
      updateProgressStatus(progressId, 'processing', 'HTML 보고서를 Google Drive에 업로드하고 있습니다');
      
      try {
        const fileName = `${analysisData.companyInfo.name}_AI역량진단보고서_${analysisData.diagnosisId}.html`;
        driveFileUrl = uploadHTMLToDrive(htmlReport, fileName);
        console.log('✅ Google Drive 업로드 완료:', driveFileUrl);
      } catch (driveError) {
        console.error('⚠️ Google Drive 업로드 실패 (계속 진행):', driveError.message);
      }
    }
    
    // 6단계: 이메일 발송 처리
    if (requestData.reportGeneration && requestData.reportGeneration.requestEmailSending) {
      console.log('📧 이메일 발송 시작');
      updateProgressStatus(progressId, 'processing', '진단 결과 이메일을 발송하고 있습니다');
      
      // 신청자 이메일
      const applicantEmailResult = sendDiagnosisResultEmail({
        to: requestData.reportGeneration.emailRecipient || analysisData.companyInfo.contact.email,
        companyName: analysisData.companyInfo.name,
        contactName: analysisData.companyInfo.contact.name,
        diagnosisId: analysisData.diagnosisId,
        scoreAnalysis: analysisData.scoreAnalysis,
        swotSummary: swotResult.summary,
        driveFileUrl: driveFileUrl,
        htmlReport: htmlReport
      });
      
      // 관리자 알림
      const adminEmailResult = sendAdminNotification({
        companyName: analysisData.companyInfo.name,
        contactEmail: analysisData.companyInfo.contact.email,
        diagnosisId: analysisData.diagnosisId,
        totalScore: analysisData.scoreAnalysis.totalScore,
        grade: analysisData.scoreAnalysis.grade
      });
      
      console.log('✅ 이메일 발송 완료:', {
        applicant: applicantEmailResult.success,
        admin: adminEmailResult.success
      });
    }
    
    // 완료 처리
    updateProgressStatus(progressId, 'completed', '모든 처리가 성공적으로 완료되었습니다');
    
    console.log('✅ 통합 워크플로우 처리 완료');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'AI 역량진단 완료',
        data: {
          diagnosisId: analysisData.diagnosisId,
          sheetsResult: sheetsResult,
          driveFileUrl: driveFileUrl,
          emailSent: true,
          swotProcessed: true,
          reportGenerated: true,
          version: 'V15.0-ULTIMATE-MCKINSEY'
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 통합 워크플로우 처리 실패:', error);
    updateProgressStatus(progressId, 'error', `처리 실패: ${error.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '워크플로우 처리 실패',
        details: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// 수정 2: SWOT 분석 처리 함수 추가
// ================================================================================

function processSwotAnalysis(swotData) {
  try {
    console.log('🔍 SWOT 분석 데이터 처리 시작');
    
    // SWOT 데이터 정규화
    const normalizedSwot = {
      strengths: swotData.strengths || [],
      weaknesses: swotData.weaknesses || [],
      opportunities: swotData.opportunities || [],
      threats: swotData.threats || [],
      summary: '',
      priorityActions: []
    };
    
    // SWOT 요약 생성
    normalizedSwot.summary = `
      강점: ${normalizedSwot.strengths.length}개 항목 식별
      약점: ${normalizedSwot.weaknesses.length}개 항목 식별
      기회: ${normalizedSwot.opportunities.length}개 항목 식별
      위협: ${normalizedSwot.threats.length}개 항목 식별
    `;
    
    // 우선순위 액션 도출
    if (normalizedSwot.weaknesses.length > 0) {
      normalizedSwot.priorityActions.push({
        priority: 1,
        action: '약점 개선',
        description: normalizedSwot.weaknesses[0].description || normalizedSwot.weaknesses[0]
      });
    }
    
    if (normalizedSwot.opportunities.length > 0) {
      normalizedSwot.priorityActions.push({
        priority: 2,
        action: '기회 활용',
        description: normalizedSwot.opportunities[0]
      });
    }
    
    console.log('✅ SWOT 분석 처리 완료');
    return normalizedSwot;
    
  } catch (error) {
    console.error('❌ SWOT 분석 처리 실패:', error);
    return {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      summary: '분석 실패',
      priorityActions: []
    };
  }
}

// ================================================================================
// 수정 3: 진단 결과 이메일 발송 함수 개선
// ================================================================================

function sendDiagnosisResultEmail(params) {
  try {
    const {
      to,
      companyName,
      contactName,
      diagnosisId,
      scoreAnalysis,
      swotSummary,
      driveFileUrl,
      htmlReport
    } = params;
    
    const subject = `🎯 [${companyName}] AI 역량진단 결과 - ${scoreAnalysis.grade}등급 (${scoreAnalysis.totalScore}점)`;
    
    // 애플 스타일 이메일 HTML 생성
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px 20px 0 0;
            color: white;
          }
          .content {
            background: white;
            padding: 40px;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .score-box {
            background: #f7f9fc;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .score-value {
            font-size: 48px;
            font-weight: 700;
            color: #667eea;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            margin: 20px 0;
          }
          .swot-summary {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎓 이교장의AI역량진단보고서</h1>
          <p>McKinsey 방법론 기반 정밀 분석 완료</p>
        </div>
        
        <div class="content">
          <h2>안녕하세요, ${contactName}님!</h2>
          
          <p><strong>${companyName}</strong>의 AI 역량진단이 완료되었습니다.</p>
          
          <div class="score-box">
            <div class="score-value">${scoreAnalysis.totalScore}점</div>
            <div>${scoreAnalysis.grade}등급 | ${scoreAnalysis.maturityLevel}</div>
            <div>상위 ${scoreAnalysis.percentile}%</div>
          </div>
          
          <div class="swot-summary">
            <h3>📊 SWOT 분석 요약</h3>
            <p>${swotSummary}</p>
          </div>
          
          <h3>📎 첨부된 보고서</h3>
          <p>상세한 분석 결과와 맞춤형 로드맵이 포함된 전체 보고서를 확인하세요.</p>
          
          ${driveFileUrl ? `
            <a href="${driveFileUrl}" class="button">
              📄 보고서 다운로드
            </a>
          ` : ''}
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            진단 ID: ${diagnosisId}<br>
            문의: hongik423@gmail.com<br>
            웹사이트: aicamp.club
          </p>
        </div>
      </body>
      </html>
    `;
    
    // 이메일 발송 옵션
    const emailOptions = {
      to: to,
      subject: subject,
      htmlBody: emailHTML,
      name: '이교장의AI역량진단보고서',
      replyTo: 'hongik423@gmail.com'
    };
    
    // HTML 보고서를 첨부파일로 추가 (driveFileUrl이 없는 경우)
    if (htmlReport && !driveFileUrl) {
      emailOptions.attachments = [{
        fileName: `${companyName}_AI역량진단보고서_${diagnosisId}.html`,
        content: htmlReport,
        mimeType: 'text/html'
      }];
    }
    
    // 이메일 발송
    MailApp.sendEmail(emailOptions);
    
    console.log('✅ 진단 결과 이메일 발송 완료:', to);
    return { success: true, recipient: to };
    
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// 수정 4: 라우팅 테스트를 위한 디버그 함수
// ================================================================================

function testRouting() {
  // 테스트 데이터
  const testRequest = {
    postData: {
      contents: JSON.stringify({
        type: 'ai_diagnosis_complete',
        processType: 'full_workflow',
        diagnosisId: 'TEST_123',
        companyName: '테스트기업',
        contactName: '홍길동',
        contactEmail: 'test@example.com',
        scoreAnalysis: {
          totalScore: 75,
          grade: 'B',
          maturityLevel: 'Advanced',
          percentile: 80
        },
        swotAnalysis: {
          strengths: ['강점1', '강점2'],
          weaknesses: ['약점1'],
          opportunities: ['기회1'],
          threats: ['위협1']
        },
        reportGeneration: {
          requestHtmlReport: true,
          requestEmailSending: true,
          emailRecipient: 'test@example.com'
        }
      })
    }
  };
  
  // doPost 함수 호출
  const result = doPost(testRequest);
  console.log('테스트 결과:', result.getContent());
}

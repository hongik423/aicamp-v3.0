'use client';

/**
 * 🎯 2단계 이메일 발송 시스템
 * 1차: 접수확인 이메일 (즉시 발송)
 * 2차: 결과보고서 이메일 (분석 완료 후 발송)
 */

export interface ConfirmationEmailData {
  contactName: string;
  contactEmail: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  diagnosisId: string;
  timestamp: string;
  estimatedTime: string;
}

export interface CompletionEmailData extends ConfirmationEmailData {
  enhancedScores: any;
  gapAnalysis: any;
  swotAnalysis: any;
  aicampRoadmap: any;
  aiAnalysis: any;
  htmlReport: string;
  reportPassword: string;
}

/**
 * 📧 1차 이메일: 접수확인 템플릿 생성
 */
export function generateConfirmationEmailTemplate(data: ConfirmationEmailData): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 역량진단 접수확인</title>
  <style>
    body { 
      font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0; 
      background-color: #f8fafc;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content { 
      padding: 40px 30px; 
    }
    .status-badge {
      display: inline-block;
      background-color: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .info-box {
      background-color: #f0f9ff;
      border: 1px solid #0ea5e9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .info-box h3 {
      margin: 0 0 15px 0;
      color: #0369a1;
      font-size: 18px;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e0f2fe;
    }
    .info-item:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #374151;
    }
    .info-value {
      color: #1f2937;
    }
    .timeline {
      background-color: #fef7ff;
      border: 1px solid #d946ef;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .timeline h3 {
      margin: 0 0 15px 0;
      color: #a21caf;
      font-size: 18px;
    }
    .timeline-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    .timeline-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
    .timeline-icon.completed {
      background-color: #10b981;
      color: white;
    }
    .timeline-icon.processing {
      background-color: #f59e0b;
      color: white;
    }
    .timeline-icon.pending {
      background-color: #e5e7eb;
      color: #6b7280;
    }
    .footer { 
      background-color: #f8fafc;
      text-align: center; 
      padding: 30px; 
      color: #6b7280; 
      font-size: 14px; 
    }
    .contact-info {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .highlight {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .highlight strong {
      color: #92400e;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 AI 역량진단 접수완료</h1>
      <p>고품질 맞춤형 분석을 위해 전문 AI가 작업을 시작했습니다</p>
    </div>
    
    <div class="content">
      <div class="status-badge">✅ 접수 완료</div>
      
      <p>안녕하세요, <strong>${data.contactName}</strong>님!</p>
      <p><strong>${data.companyName}</strong>의 AI 역량진단 신청이 성공적으로 접수되었습니다.</p>
      
      <div class="info-box">
        <h3>📋 접수 정보</h3>
        <div class="info-item">
          <span class="info-label">회사명</span>
          <span class="info-value">${data.companyName}</span>
        </div>
        <div class="info-item">
          <span class="info-label">업종</span>
          <span class="info-value">${data.industry}</span>
        </div>
        <div class="info-item">
          <span class="info-label">직원 수</span>
          <span class="info-value">${data.employeeCount}</span>
        </div>
        <div class="info-item">
          <span class="info-label">진단 ID</span>
          <span class="info-value">${data.diagnosisId}</span>
        </div>
        <div class="info-item">
          <span class="info-label">접수 시간</span>
          <span class="info-value">${new Date(data.timestamp).toLocaleString('ko-KR')}</span>
        </div>
      </div>

      <div class="timeline">
        <h3>🔄 진행 상황</h3>
        <div class="timeline-item">
          <div class="timeline-icon completed">✓</div>
          <span>진단 신청 접수 완료</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon processing">⏳</div>
          <span>GEMINI 2.5 AI 심층 분석 진행 중</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon pending">📊</div>
          <span>맞춤형 보고서 생성 대기 중</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon pending">📧</div>
          <span>완성된 보고서 이메일 발송 예정</span>
        </div>
      </div>

      <div class="highlight">
        <strong>⏰ 예상 완료 시간: ${data.estimatedTime}</strong><br/>
        고품질 맞춤형 분석을 위해 GEMINI 2.5 Flash AI가 귀하의 데이터를 심층 분석하고 있습니다.
        완료되는 즉시 상세한 진단 보고서를 이메일로 보내드리겠습니다.
      </div>

      <p>분석이 완료되면 다음과 같은 내용이 포함된 상세 보고서를 받으실 수 있습니다:</p>
      <ul>
        <li>🎯 <strong>AI 역량 종합 점수</strong> - 6개 핵심 영역별 상세 평가</li>
        <li>📈 <strong>SWOT 분석</strong> - 강점, 약점, 기회, 위협 요소</li>
        <li>🛣️ <strong>AI 도입 로드맵</strong> - 단계별 실행 계획</li>
        <li>💡 <strong>맞춤형 개선 방안</strong> - 업종별 특화 솔루션</li>
        <li>📊 <strong>ROI 예측</strong> - 투자 대비 효과 분석</li>
      </ul>
    </div>
    
    <div class="footer">
      <div class="contact-info">
        <strong>AICAMP 고객지원센터</strong><br/>
        📧 이메일: hongik423@gmail.com<br/>
        🌐 웹사이트: <a href="https://aicamp.club" style="color: #3b82f6;">aicamp.club</a><br/>
        📞 문의사항이 있으시면 언제든지 연락해 주세요.
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
        본 메일은 AI 역량진단 신청자에게만 발송되는 자동 발송 메일입니다.<br/>
        © 2024 AICAMP. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 📧 2차 이메일: 완성 보고서 템플릿 생성
 */
export function generateCompletionEmailTemplate(data: CompletionEmailData): string {
  const totalScore = data.enhancedScores?.totalScore || 0;
  const maturityLevel = data.enhancedScores?.maturityLevel || 'Basic';
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 역량진단 결과보고서</title>
  <style>
    body { 
      font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0; 
      background-color: #f8fafc;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content { 
      padding: 40px 30px; 
    }
    .completion-badge {
      display: inline-block;
      background-color: #059669;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .score-box {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 20px 0;
    }
    .score-value {
      font-size: 48px;
      font-weight: 700;
      margin: 0;
    }
    .score-label {
      font-size: 18px;
      margin: 10px 0 0 0;
      opacity: 0.9;
    }
    .maturity-level {
      background-color: #f0f9ff;
      border: 2px solid #0ea5e9;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
    }
    .maturity-level h3 {
      margin: 0;
      color: #0369a1;
      font-size: 24px;
    }
    .download-section {
      background-color: #fef7ff;
      border: 2px solid #d946ef;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .download-button {
      display: inline-block;
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 10px;
      transition: transform 0.2s;
    }
    .download-button:hover {
      transform: translateY(-2px);
    }
    .password-info {
      background-color: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .password-value {
      font-size: 24px;
      font-weight: 700;
      color: #92400e;
      text-align: center;
      letter-spacing: 2px;
      margin: 10px 0;
    }
    .next-steps {
      background-color: #f0fdf4;
      border: 1px solid #22c55e;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .next-steps h3 {
      margin: 0 0 15px 0;
      color: #15803d;
    }
    .next-steps ul {
      margin: 0;
      padding-left: 20px;
    }
    .footer { 
      background-color: #f8fafc;
      text-align: center; 
      padding: 30px; 
      color: #6b7280; 
      font-size: 14px; 
    }
    .contact-info {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎊 AI 역량진단 완료!</h1>
      <p>맞춤형 분석 결과가 준비되었습니다</p>
    </div>
    
    <div class="content">
      <div class="completion-badge">✅ 분석 완료</div>
      
      <p>축하합니다, <strong>${data.contactName}</strong>님!</p>
      <p><strong>${data.companyName}</strong>의 AI 역량진단이 성공적으로 완료되었습니다.</p>
      
      <div class="score-box">
        <div class="score-value">${totalScore}점</div>
        <div class="score-label">AI 역량 종합 점수</div>
      </div>

      <div class="maturity-level">
        <h3>🏆 AI 성숙도: ${maturityLevel}</h3>
      </div>

      <div class="download-section">
        <h3>📋 상세 보고서 다운로드</h3>
        <p>귀하만을 위한 맞춤형 AI 역량진단 보고서가 준비되었습니다.</p>
        
        <div class="password-info">
          <strong>🔐 보고서 접근 비밀번호</strong>
          <div class="password-value">${data.reportPassword}</div>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #92400e;">
            보안을 위해 위 비밀번호를 입력해야 보고서를 열람할 수 있습니다.
          </p>
        </div>

        <a href="#" class="download-button">📄 PDF 보고서 다운로드</a>
        <a href="#" class="download-button">🌐 온라인 보고서 보기</a>
      </div>

      <div class="next-steps">
        <h3>🚀 다음 단계</h3>
        <ul>
          <li><strong>보고서 검토</strong>: 상세 분석 결과를 확인해보세요</li>
          <li><strong>실행 계획</strong>: 제안된 로드맵을 검토하세요</li>
          <li><strong>전문 상담</strong>: 추가 상담이 필요하시면 연락주세요</li>
          <li><strong>후속 지원</strong>: AICAMP 교육 프로그램을 확인해보세요</li>
        </ul>
      </div>

      <p><strong>보고서에 포함된 내용:</strong></p>
      <ul>
        <li>🎯 6개 핵심 영역별 상세 점수 및 분석</li>
        <li>📈 SWOT 분석 및 경쟁력 평가</li>
        <li>🛣️ 단계별 AI 도입 로드맵</li>
        <li>💡 업종별 맞춤형 개선 방안</li>
        <li>📊 투자 대비 효과(ROI) 예측</li>
        <li>🎓 AICAMP 맞춤형 교육 추천</li>
      </ul>
    </div>
    
    <div class="footer">
      <div class="contact-info">
        <strong>AICAMP 고객지원센터</strong><br/>
        📧 이메일: hongik423@gmail.com<br/>
        🌐 웹사이트: <a href="https://aicamp.club" style="color: #3b82f6;">aicamp.club</a><br/>
        📞 추가 상담이나 문의사항이 있으시면 언제든지 연락해 주세요.
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
        본 메일은 AI 역량진단 완료 알림 메일입니다.<br/>
        © 2024 AICAMP. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 📧 이메일 제목 생성
 */
export function generateEmailSubjects(data: ConfirmationEmailData | CompletionEmailData, type: 'confirmation' | 'completion') {
  if (type === 'confirmation') {
    return `[AICAMP] ${data.companyName}님의 AI 역량진단 접수완료 - 분석 진행 중 (ID: ${data.diagnosisId})`;
  } else {
    const completionData = data as CompletionEmailData;
    return `[AICAMP] ${data.companyName}님의 AI 역량진단 완료 - 보고서 준비됨 (패스워드: ${completionData.reportPassword})`;
  }
}

/**
 * 🔄 Google Apps Script 호출 데이터 생성
 */
export function generateGASEmailData(data: ConfirmationEmailData | CompletionEmailData, type: 'confirmation' | 'completion') {
  const baseData = {
    action: 'send_email',
    emailType: type,
    to: data.contactEmail,
    subject: generateEmailSubjects(data, type),
    companyName: data.companyName,
    contactName: data.contactName,
    diagnosisId: data.diagnosisId,
    timestamp: data.timestamp
  };

  if (type === 'confirmation') {
    return {
      ...baseData,
      htmlContent: generateConfirmationEmailTemplate(data as ConfirmationEmailData),
      estimatedTime: data.estimatedTime,
      industry: data.industry,
      employeeCount: data.employeeCount
    };
  } else {
    const completionData = data as CompletionEmailData;
    return {
      ...baseData,
      htmlContent: generateCompletionEmailTemplate(completionData),
      reportPassword: completionData.reportPassword,
      totalScore: completionData.enhancedScores?.totalScore || 0,
      maturityLevel: completionData.enhancedScores?.maturityLevel || 'Basic',
      attachments: {
        htmlReport: completionData.htmlReport
      }
    };
  }
}

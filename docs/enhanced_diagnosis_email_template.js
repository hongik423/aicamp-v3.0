/**
 * 🎨 세련된 무료진단 확인 이메일 템플릿 
 * 사용자 편의성과 브랜딩 일관성을 고려한 HTML 이메일
 * 
 * 연락처 정보 통일: 이후경 교장, hongik423@gmail.com, 010-9251-9743
 */

/**
 * 📧 개선된 무료진단 신청자 확인 이메일 (세련된 HTML 버전)
 */
function sendEnhancedDiagnosisConfirmationEmail(email, companyName, contactName, diagnosisId) {
  try {
    if (!email || !companyName || !contactName) {
      console.error('❌ 필수 파라미터 누락:', {email, companyName, contactName});
      return;
    }

    const subject = `[AICAMP] 🎉 ${companyName}님의 AI 무료진단 신청이 접수되었습니다!`;
    
    // 🎨 세련된 HTML 이메일 템플릿
    const htmlBody = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AICAMP AI 무료진단 접수 확인</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', '맑은 고딕', sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f8f9fa;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .header p {
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 18px;
                color: #2c3e50;
                margin-bottom: 25px;
                font-weight: 600;
            }
            
            .intro-text {
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.7;
            }
            
            .status-box {
                background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
                border-left: 4px solid #28a745;
                padding: 25px;
                margin: 30px 0;
                border-radius: 8px;
            }
            
            .status-box h3 {
                color: #155724;
                font-size: 18px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
            }
            
            .status-info {
                background: white;
                padding: 20px;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #f1f3f4;
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .info-label {
                font-weight: 600;
                color: #495057;
            }
            
            .info-value {
                color: #007bff;
                font-weight: 500;
            }
            
            .process-section {
                background: #f8f9fa;
                padding: 25px;
                border-radius: 10px;
                margin: 30px 0;
            }
            
            .process-section h3 {
                color: #495057;
                font-size: 18px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
            }
            
            .process-steps {
                list-style: none;
                counter-reset: step-counter;
            }
            
            .process-steps li {
                counter-increment: step-counter;
                margin-bottom: 15px;
                padding-left: 40px;
                position: relative;
                font-size: 15px;
                line-height: 1.6;
            }
            
            .process-steps li::before {
                content: counter(step-counter);
                position: absolute;
                left: 0;
                top: 0;
                background: #007bff;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            
            .benefits-section {
                background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
                padding: 25px;
                border-radius: 10px;
                margin: 30px 0;
                border-left: 4px solid #ffc107;
            }
            
            .benefits-section h3 {
                color: #856404;
                font-size: 18px;
                margin-bottom: 15px;
            }
            
            .benefits-list {
                list-style: none;
            }
            
            .benefits-list li {
                margin-bottom: 8px;
                padding-left: 25px;
                position: relative;
                font-size: 15px;
            }
            
            .benefits-list li::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #28a745;
                font-weight: bold;
                font-size: 16px;
            }
            
            .contact-section {
                background: #fff;
                padding: 30px;
                border-radius: 12px;
                margin: 30px 0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                border: 2px solid #e9ecef;
            }
            
            .contact-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .contact-header h3 {
                color: #2c3e50;
                font-size: 20px;
                margin-bottom: 10px;
            }
            
            .contact-header p {
                color: #6c757d;
                font-size: 14px;
            }
            
            .consultant-card {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 25px;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 20px;
            }
            
            .consultant-name {
                font-size: 22px;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 5px;
            }
            
            .consultant-title {
                font-size: 16px;
                color: #6c757d;
                margin-bottom: 20px;
            }
            
            .contact-methods {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
            }
            
            .contact-method {
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                text-decoration: none;
                color: #495057;
                transition: transform 0.2s ease;
                min-width: 140px;
                text-align: center;
            }
            
            .contact-method:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            }
            
            .contact-method .icon {
                font-size: 20px;
                margin-bottom: 5px;
                display: block;
            }
            
            .contact-method .label {
                font-size: 12px;
                color: #6c757d;
                margin-bottom: 3px;
            }
            
            .contact-method .value {
                font-size: 14px;
                font-weight: 600;
                color: #2c3e50;
            }
            
            .cta-section {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
                transition: all 0.3s ease;
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
            }
            
            .footer {
                background: #2c3e50;
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            .footer-logo {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .footer-tagline {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 20px;
            }
            
            .footer-contact {
                font-size: 13px;
                opacity: 0.7;
                line-height: 1.5;
            }
            
            .footer-contact a {
                color: #74b9ff;
                text-decoration: none;
            }
            
            @media (max-width: 600px) {
                .header, .content, .footer {
                    padding: 20px 15px;
                }
                
                .contact-methods {
                    flex-direction: column;
                    align-items: center;
                }
                
                .contact-method {
                    width: 100%;
                    max-width: 280px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <h1>🎉 AI 무료진단 접수 완료!</h1>
                <p>${companyName}님의 신청이 성공적으로 처리되었습니다</p>
            </div>
            
            <!-- Content -->
            <div class="content">
                <div class="greeting">
                    안녕하세요, ${contactName}님! 👋
                </div>
                
                <div class="intro-text">
                    <strong>AICAMP AI 교육센터</strong>에 <strong>AI 무료진단</strong>을 신청해주셔서 진심으로 감사합니다.<br>
                    귀하의 비즈니스 성장을 돕기 위한 전문적인 분석을 시작하겠습니다.
                </div>
                
                <!-- Status Box -->
                <div class="status-box">
                    <h3>✅ 접수 상태</h3>
                    <div class="status-info">
                        <div class="info-row">
                            <span class="info-label">진단 ID</span>
                            <span class="info-value">${diagnosisId || 'AUTO_GENERATED'}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">접수 일시</span>
                            <span class="info-value">${getCurrentKoreanTime()}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">예상 분석 시간</span>
                            <span class="info-value">5-10분</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">결과 발송 예정</span>
                            <span class="info-value">1-2시간 이내</span>
                        </div>
                    </div>
                </div>
                
                <!-- Process Section -->
                <div class="process-section">
                    <h3>🔄 진행 프로세스</h3>
                    <ol class="process-steps">
                        <li><strong>AI 분석 수행</strong><br>20개 진단항목을 통한 종합적 비즈니스 분석</li>
                        <li><strong>전문가 검토</strong><br>25년 경력의 이후경 교장이 직접 결과 검증</li>
                        <li><strong>맞춤형 보고서 생성</strong><br>업종별 특화 분석과 개선방안 도출</li>
                        <li><strong>상세 결과 발송</strong><br>이메일로 완전한 진단 보고서 전달</li>
                        <li><strong>전문가 상담 연계</strong><br>후속 상담을 통한 구체적 실행방안 제시</li>
                    </ol>
                </div>
                
                <!-- Benefits Section -->
                <div class="benefits-section">
                    <h3>💎 진단 결과에 포함되는 내용</h3>
                    <ul class="benefits-list">
                        <li><strong>5개 핵심영역 상세 분석</strong> (상품서비스, 고객응대, 마케팅, 구매재고, 매장관리)</li>
                        <li><strong>100점 만점 종합점수</strong> 및 등급 평가</li>
                        <li><strong>업종별 벤치마크 비교</strong> 분석</li>
                        <li><strong>SWOT 분석</strong>을 통한 전략적 인사이트</li>
                        <li><strong>AI 기반 맞춤형 개선방안</strong> 제시</li>
                        <li><strong>단계별 실행계획</strong> 및 우선순위 가이드</li>
                        <li><strong>정부지원사업 연계방안</strong> 안내</li>
                    </ul>
                </div>
                
                <!-- Contact Section -->
                <div class="contact-section">
                    <div class="contact-header">
                        <h3>👨‍🏫 전문가 직통 상담</h3>
                        <p>궁금한 점이나 빠른 상담이 필요하시면 언제든 연락주세요</p>
                    </div>
                    
                    <div class="consultant-card">
                        <div class="consultant-name">이후경 교장</div>
                        <div class="consultant-title">25년 경력 AI 프로세스 자동화 전문가</div>
                        
                        <div class="contact-methods">
                            <a href="tel:010-9251-9743" class="contact-method">
                                <span class="icon">📞</span>
                                <div class="label">전화 상담</div>
                                <div class="value">010-9251-9743</div>
                            </a>
                            <a href="mailto:hongik423@gmail.com" class="contact-method">
                                <span class="icon">📧</span>
                                <div class="label">이메일</div>
                                <div class="value">hongik423@gmail.com</div>
                            </a>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                        <strong style="color: #1976d2;">🎁 특별 혜택</strong><br>
                        <span style="font-size: 14px; color: #424242;">무료진단 완료 고객 대상 전문가 상담 30% 할인</span>
                    </div>
                </div>
                
                <!-- CTA Section -->
                <div class="cta-section">
                    <a href="https://aicamp.club" class="cta-button">
                        🌐 AICAMP 홈페이지 방문하기
                    </a>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px; font-size: 14px; color: #6c757d;">
                    결과 분석이 완료되는 대로 즉시 연락드리겠습니다.<br>
                    귀하의 비즈니스 성장을 위해 최선을 다하겠습니다. 🚀
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-logo">AICAMP AI 교육센터</div>
                <div class="footer-tagline">AI와 함께 성장하는 미래를 만들어갑니다</div>
                <div class="footer-contact">
                    담당: 이후경 교장 | 📞 010-9251-9743 | 📧 <a href="mailto:hongik423@gmail.com">hongik423@gmail.com</a><br>
                    🌐 <a href="https://aicamp.club">https://aicamp.club</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    // 텍스트 버전 (HTML을 지원하지 않는 이메일 클라이언트용)
    const textBody = `
안녕하세요, ${contactName}님!

AICAMP AI 교육센터에 AI 무료진단을 신청해주셔서 진심으로 감사합니다.

✅ 접수 완료
• 진단 ID: ${diagnosisId || 'AUTO_GENERATED'}
• 접수 일시: ${getCurrentKoreanTime()}
• 예상 분석 시간: 5-10분
• 결과 발송 예정: 1-2시간 이내

🔄 진행 프로세스
1. AI 분석 수행 (20개 진단항목 종합 분석)
2. 전문가 검토 (25년 경력 이후경 교장 직접 검증)
3. 맞춤형 보고서 생성 (업종별 특화 분석)
4. 상세 결과 발송 (완전한 진단 보고서)
5. 전문가 상담 연계 (구체적 실행방안 제시)

💎 진단 결과 포함 내용
• 5개 핵심영역 상세 분석 (100점 만점)
• 업종별 벤치마크 비교 분석
• SWOT 분석을 통한 전략적 인사이트
• AI 기반 맞춤형 개선방안
• 단계별 실행계획 및 우선순위 가이드
• 정부지원사업 연계방안 안내

👨‍🏫 전문가 직통 상담
담당: 이후경 교장 (25년 경력 AI 프로세스 자동화 전문가)
📞 010-9251-9743
📧 hongik423@gmail.com

🎁 특별 혜택: 무료진단 완료 고객 대상 전문가 상담 30% 할인

결과 분석이 완료되는 대로 즉시 연락드리겠습니다.
귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.

---
AICAMP AI 교육센터
AI와 함께 성장하는 미래를 만들어갑니다
담당: 이후경 교장 | 📞 010-9251-9743 | 📧 hongik423@gmail.com
🌐 https://aicamp.club
    `.trim();

    // 이메일 발송
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI 교육센터',
      replyTo: 'hongik423@gmail.com'
    });
    
    console.log('✅ 개선된 무료진단 확인 이메일 발송 완료:', email);
    return true;
    
  } catch (error) {
    console.error('❌ 무료진단 확인 이메일 발송 실패:', error);
    return false;
  }
}

/**
 * 📧 개선된 전문가 상담 신청자 확인 이메일
 */
function sendEnhancedConsultationConfirmationEmail(email, companyName, contactName) {
  try {
    if (!email || !companyName || !contactName) {
      console.error('❌ 필수 파라미터 누락:', {email, companyName, contactName});
      return;
    }

    const subject = `[AICAMP] 🤝 ${companyName}님의 전문가 상담 신청이 접수되었습니다!`;
    
    const htmlBody = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AICAMP 전문가 상담 접수 확인</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', '맑은 고딕', sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f8f9fa;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 18px;
                color: #2c3e50;
                margin-bottom: 25px;
                font-weight: 600;
            }
            
            .status-box {
                background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
                border-left: 4px solid #28a745;
                padding: 25px;
                margin: 30px 0;
                border-radius: 8px;
            }
            
            .process-section {
                background: #f8f9fa;
                padding: 25px;
                border-radius: 10px;
                margin: 30px 0;
            }
            
            .consultant-card {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 25px;
                border-radius: 10px;
                text-align: center;
                margin: 20px 0;
            }
            
            .contact-methods {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                margin-top: 15px;
            }
            
            .contact-method {
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                text-decoration: none;
                color: #495057;
                min-width: 140px;
                text-align: center;
            }
            
            .footer {
                background: #2c3e50;
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            @media (max-width: 600px) {
                .header, .content, .footer {
                    padding: 20px 15px;
                }
                
                .contact-methods {
                    flex-direction: column;
                    align-items: center;
                }
                
                .contact-method {
                    width: 100%;
                    max-width: 280px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>🤝 전문가 상담 접수 완료!</h1>
                <p>${companyName}님의 상담 신청이 성공적으로 처리되었습니다</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    안녕하세요, ${contactName}님! 👋
                </div>
                
                <div style="font-size: 16px; margin-bottom: 30px; line-height: 1.7;">
                    <strong>AICAMP AI 교육센터</strong>에 <strong>전문가 상담</strong>을 신청해주셔서 진심으로 감사합니다.<br>
                    25년 경력의 전문가가 직접 상담해드리겠습니다.
                </div>
                
                <div class="status-box">
                    <h3 style="color: #155724; margin-bottom: 15px;">✅ 접수 상태</h3>
                    <div style="background: white; padding: 20px; border-radius: 6px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span style="font-weight: 600;">접수 일시</span>
                            <span style="color: #007bff;">${getCurrentKoreanTime()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span style="font-weight: 600;">담당 전문가</span>
                            <span style="color: #007bff;">이후경 교장</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span style="font-weight: 600;">연락 예정시간</span>
                            <span style="color: #007bff;">1-2일 이내</span>
                        </div>
                    </div>
                </div>
                
                <div class="process-section">
                    <h3 style="color: #495057; margin-bottom: 20px;">🔄 상담 진행 프로세스</h3>
                    <ol style="list-style: none; counter-reset: step-counter;">
                        <li style="counter-increment: step-counter; margin-bottom: 15px; padding-left: 40px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; background: #007bff; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;" data-content="counter(step-counter)">1</div>
                            <strong>전문가 연락</strong><br>1-2일 내 이후경 교장이 직접 연락드립니다
                        </li>
                        <li style="counter-increment: step-counter; margin-bottom: 15px; padding-left: 40px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; background: #007bff; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">2</div>
                            <strong>상담 일정 협의</strong><br>귀하의 일정에 맞춰 상담 시간을 조율합니다
                        </li>
                        <li style="counter-increment: step-counter; margin-bottom: 15px; padding-left: 40px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; background: #007bff; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">3</div>
                            <strong>맞춤형 전문가 상담</strong><br>현황 분석과 구체적 해결방안을 제시합니다
                        </li>
                        <li style="counter-increment: step-counter; padding-left: 40px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; background: #007bff; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">4</div>
                            <strong>실행 계획 제공</strong><br>단계별 실행방안과 후속 지원 계획을 안내합니다
                        </li>
                    </ol>
                </div>
                
                <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #ffc107;">
                    <h3 style="color: #856404; margin-bottom: 15px;">💡 상담 준비사항</h3>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 8px; padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0; color: #28a745; font-weight: bold;">✓</span>
                            현재 비즈니스 현황 자료
                        </li>
                        <li style="margin-bottom: 8px; padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0; color: #28a745; font-weight: bold;">✓</span>
                            구체적인 고민사항 정리
                        </li>
                        <li style="margin-bottom: 8px; padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0; color: #28a745; font-weight: bold;">✓</span>
                            목표하는 성과 및 일정
                        </li>
                        <li style="padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0; color: #28a745; font-weight: bold;">✓</span>
                            예산 범위 (대략적으로)
                        </li>
                    </ul>
                </div>
                
                <div class="consultant-card">
                    <div style="font-size: 22px; font-weight: 700; color: #2c3e50; margin-bottom: 5px;">이후경 교장</div>
                    <div style="font-size: 16px; color: #6c757d; margin-bottom: 20px;">25년 경력 AI 프로세스 자동화 전문가</div>
                    
                    <div class="contact-methods">
                        <a href="tel:010-9251-9743" class="contact-method">
                            <span style="font-size: 20px; display: block; margin-bottom: 5px;">📞</span>
                            <div style="font-size: 12px; color: #6c757d; margin-bottom: 3px;">전화 상담</div>
                            <div style="font-size: 14px; font-weight: 600; color: #2c3e50;">010-9251-9743</div>
                        </a>
                        <a href="mailto:hongik423@gmail.com" class="contact-method">
                            <span style="font-size: 20px; display: block; margin-bottom: 5px;">📧</span>
                            <div style="font-size: 12px; color: #6c757d; margin-bottom: 3px;">이메일</div>
                            <div style="font-size: 14px; font-weight: 600; color: #2c3e50;">hongik423@gmail.com</div>
                        </a>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px; font-size: 14px; color: #6c757d;">
                    담당 전문가가 1-2일 내에 직접 연락드리겠습니다.<br>
                    궁금한 점이 있으시면 언제든 연락주세요. 🚀
                </div>
            </div>
            
            <div class="footer">
                <div style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">AICAMP AI 교육센터</div>
                <div style="font-size: 14px; opacity: 0.8; margin-bottom: 20px;">AI와 함께 성장하는 미래를 만들어갑니다</div>
                <div style="font-size: 13px; opacity: 0.7; line-height: 1.5;">
                    담당: 이후경 교장 | 📞 010-9251-9743 | 📧 <a href="mailto:hongik423@gmail.com" style="color: #74b9ff;">hongik423@gmail.com</a><br>
                    🌐 <a href="https://aicamp.club" style="color: #74b9ff;">https://aicamp.club</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const textBody = `
안녕하세요, ${contactName}님!

AICAMP AI 교육센터에 전문가 상담을 신청해주셔서 진심으로 감사합니다.

✅ 접수 완료
• 접수 일시: ${getCurrentKoreanTime()}
• 담당 전문가: 이후경 교장 (25년 경력)
• 연락 예정시간: 1-2일 이내

🔄 상담 진행 프로세스
1. 전문가 연락 (1-2일 내 이후경 교장이 직접 연락)
2. 상담 일정 협의 (귀하의 일정에 맞춰 조율)
3. 맞춤형 전문가 상담 (현황 분석과 구체적 해결방안 제시)
4. 실행 계획 제공 (단계별 실행방안과 후속 지원 계획)

💡 상담 준비사항
• 현재 비즈니스 현황 자료
• 구체적인 고민사항 정리
• 목표하는 성과 및 일정
• 예산 범위 (대략적으로)

👨‍🏫 담당 전문가
이후경 교장 (25년 경력 AI 프로세스 자동화 전문가)
📞 010-9251-9743
📧 hongik423@gmail.com

담당 전문가가 1-2일 내에 직접 연락드리겠습니다.
궁금한 점이 있으시면 언제든 연락주세요.

---
AICAMP AI 교육센터
AI와 함께 성장하는 미래를 만들어갑니다
담당: 이후경 교장 | 📞 010-9251-9743 | 📧 hongik423@gmail.com
🌐 https://aicamp.club
    `.trim();

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI 교육센터',
      replyTo: 'hongik423@gmail.com'
    });
    
    console.log('✅ 개선된 전문가 상담 확인 이메일 발송 완료:', email);
    return true;
    
  } catch (error) {
    console.error('❌ 전문가 상담 확인 이메일 발송 실패:', error);
    return false;
  }
}

/**
 * 🕐 한국 시간 포맷 함수 (공통 사용)
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
  return koreaTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * 🔄 기존 함수들을 개선된 버전으로 대체하는 래퍼 함수들
 */
function sendUserConfirmation(email, name, type) {
  try {
    const isConsultation = type === '상담';
    const companyName = name || '고객';
    const contactName = name || '고객';
    
    if (isConsultation) {
      return sendEnhancedConsultationConfirmationEmail(email, companyName, contactName);
    } else {
      const diagnosisId = `DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      return sendEnhancedDiagnosisConfirmationEmail(email, companyName, contactName, diagnosisId);
    }
  } catch (error) {
    console.error('❌ 사용자 확인 이메일 발송 실패:', error);
    return false;
  }
}

// 🔧 레거시 호환을 위한 별칭 함수들
const sendFreeDiagnosisConfirmationEmail = sendEnhancedDiagnosisConfirmationEmail;
const sendConfirmationEmail = sendEnhancedDiagnosisConfirmationEmail;
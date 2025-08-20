/**
 * 📧 이메일 발송 및 Google Sheets 저장 통합 서비스
 * 45개 행동지표 기반 맥킨지 보고서 결과 처리
 */

import { McKinsey45QuestionsResult } from '@/lib/workflow/mckinsey-45-questions-workflow';
// Ollama 전용 모드: 외부 Gemini 의존성 제거

export interface EmailSheetsRequest {
  // 기본 정보
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  
  // 분석 결과
  analysisResult: McKinsey45QuestionsResult;
  geminiReport?: { content?: Record<string, string>; metadata?: any; success?: boolean };
  htmlReport?: string;
  
  // 옵션
  options?: {
    emailTemplate?: 'standard' | 'premium' | 'executive';
    includeAttachments?: boolean;
    saveToSheets?: boolean;
    notifyAdmin?: boolean;
  };
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
}

export interface SheetsData {
  timestamp: string;
  diagnosisId: string;
  companyInfo: any;
  scoreAnalysis: any;
  qualityMetrics: any;
  processingInfo: any;
}

/**
 * 이메일 템플릿 생성 - 애플 스타일 미니멀 디자인
 */
export function generateAppleStyleEmailTemplate(request: EmailSheetsRequest): EmailTemplate {
  const { companyName, contactName, analysisResult, geminiReport } = request;
  const { scoreAnalysis, diagnosisId } = analysisResult;
  
  const currentDate = new Date().toLocaleDateString('ko-KR');
  const reportUrl = `https://aicamp.club/diagnosis/report/${diagnosisId}`;
  
  // 애플 스타일 CSS
  const appleCSS = `
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #1d1d1f;
        background-color: #f5f5f7;
      }
      
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
      
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 30px;
        text-align: center;
        color: white;
      }
      
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.5px;
      }
      
      .header p {
        margin: 8px 0 0 0;
        font-size: 16px;
        opacity: 0.9;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .greeting {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
        color: #1d1d1f;
      }
      
      .score-card {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 25px;
        margin: 25px 0;
        text-align: center;
        border: 1px solid #e9ecef;
      }
      
      .score-value {
        font-size: 48px;
        font-weight: 700;
        color: #007aff;
        margin-bottom: 8px;
        line-height: 1;
      }
      
      .score-label {
        font-size: 16px;
        color: #6c757d;
        margin-bottom: 15px;
      }
      
      .grade-badge {
        display: inline-block;
        background: #007aff;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
      }
      
      .highlights {
        margin: 30px 0;
      }
      
      .highlight-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f1f3f4;
      }
      
      .highlight-item:last-child {
        border-bottom: none;
      }
      
      .highlight-icon {
        width: 24px;
        height: 24px;
        background: #007aff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-size: 12px;
        color: white;
      }
      
      .highlight-text {
        flex: 1;
        font-size: 15px;
        color: #1d1d1f;
      }
      
      .cta-section {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 25px;
        text-align: center;
        margin: 30px 0;
      }
      
      .cta-button {
        display: inline-block;
        background: #007aff;
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        margin: 10px;
        transition: background-color 0.3s ease;
      }
      
      .cta-button:hover {
        background: #0056cc;
      }
      
      .cta-button.secondary {
        background: #6c757d;
      }
      
      .cta-button.secondary:hover {
        background: #545b62;
      }
      
      .footer {
        background: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e9ecef;
      }
      
      .footer-logo {
        font-size: 20px;
        font-weight: 700;
        color: #007aff;
        margin-bottom: 15px;
      }
      
      .footer-info {
        font-size: 14px;
        color: #6c757d;
        line-height: 1.5;
      }
      
      .footer-contact {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #e9ecef;
        font-size: 13px;
        color: #8e8e93;
      }
      
      @media (max-width: 600px) {
        .email-container {
          margin: 0;
          border-radius: 0;
        }
        
        .header, .content, .footer {
          padding: 25px 20px;
        }
        
        .score-value {
          font-size: 36px;
        }
        
        .cta-button {
          display: block;
          margin: 10px 0;
        }
      }
    </style>
  `;
  
  // HTML 이메일 콘텐츠
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 역량진단 결과 - ${companyName}</title>
        ${appleCSS}
    </head>
    <body>
        <div class="email-container">
            <!-- 헤더 -->
            <div class="header">
                <h1>🎯 AI 역량진단 완료</h1>
                <p>45개 행동지표 기반 맞춤형 분석 결과</p>
            </div>
            
            <!-- 메인 콘텐츠 -->
            <div class="content">
                <div class="greeting">
                    안녕하세요, ${contactName}님! 👋
                </div>
                
                <p>
                    <strong>${companyName}</strong>의 AI 역량진단이 완료되었습니다.<br>
                    45개 행동지표를 바탕으로 한 정밀 분석 결과를 안내드립니다.
                </p>
                
                <!-- 점수 카드 -->
                <div class="score-card">
                    <div class="score-value">${scoreAnalysis.totalScore}</div>
                    <div class="score-label">종합 점수 (100점 만점)</div>
                    <div class="grade-badge">${scoreAnalysis.grade}등급 · ${scoreAnalysis.maturityLevel}</div>
                </div>
                
                <!-- 주요 결과 -->
                <div class="highlights">
                    <div class="highlight-item">
                        <div class="highlight-icon">📊</div>
                        <div class="highlight-text">
                            <strong>업계 백분위:</strong> 상위 ${100 - scoreAnalysis.percentile}%
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">🎯</div>
                        <div class="highlight-text">
                            <strong>최우선 과제:</strong> ${getTopPriority(analysisResult)}
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">⚡</div>
                        <div class="highlight-text">
                            <strong>예상 ROI:</strong> 12개월 내 투자 대비 300% 이상
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">🚀</div>
                        <div class="highlight-text">
                            <strong>실행 기간:</strong> 3단계 12개월 로드맵
                        </div>
                    </div>
                </div>
                
                <!-- CTA 섹션 -->
                <div class="cta-section">
                    <h3 style="margin-top: 0; color: #1d1d1f;">📋 상세 보고서 및 다음 단계</h3>
                    <p style="color: #6c757d; margin-bottom: 20px;">
                        맥킨지 스타일 전문 보고서와 실행 가이드를 확인하세요
                    </p>
                    
                    <a href="${reportUrl}" class="cta-button">
                        📊 상세 보고서 보기
                    </a>
                    
                    <a href="https://aicamp.club/consultation" class="cta-button secondary">
                        💬 전문가 상담 신청
                    </a>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h4 style="margin-top: 0; color: #856404;">🎁 특별 혜택</h4>
                    <p style="margin-bottom: 0; color: #856404;">
                        진단 완료 고객 대상 <strong>무료 AI 전략 컨설팅 (1시간)</strong>을 제공합니다.<br>
                        <strong>010-9251-9743</strong>으로 연락주시면 일정을 조율해드리겠습니다.
                    </p>
                </div>
            </div>
            
            <!-- 푸터 -->
            <div class="footer">
                <div class="footer-logo">AICAMP</div>
                <div class="footer-info">
                    <strong>이교장의AI역량진단보고서 V15.0 ULTIMATE</strong><br>
                    AI 기반 기업 혁신 전문 컨설팅
                </div>
                <div class="footer-contact">
                    📞 010-9251-9743 | 📧 hongik423@gmail.com<br>
                    🌐 <a href="https://aicamp.club" style="color: #007aff;">aicamp.club</a><br>
                    진단 ID: ${diagnosisId} | 생성일: ${currentDate}
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
  
  // 텍스트 이메일 콘텐츠
  const textContent = `
🎯 AI 역량진단 완료 - ${companyName}

안녕하세요, ${contactName}님!

${companyName}의 AI 역량진단이 완료되었습니다.
45개 행동지표를 바탕으로 한 정밀 분석 결과를 안내드립니다.

📊 진단 결과:
- 종합 점수: ${scoreAnalysis.totalScore}점/100점
- 등급: ${scoreAnalysis.grade}등급
- 성숙도: ${scoreAnalysis.maturityLevel}
- 업계 백분위: 상위 ${100 - scoreAnalysis.percentile}%

🎯 주요 결과:
- 최우선 과제: ${getTopPriority(analysisResult)}
- 예상 ROI: 12개월 내 투자 대비 300% 이상
- 실행 기간: 3단계 12개월 로드맵

📋 다음 단계:
1. 상세 보고서 확인: ${reportUrl}
2. 전문가 상담 신청: https://aicamp.club/consultation

🎁 특별 혜택:
진단 완료 고객 대상 무료 AI 전략 컨설팅 (1시간) 제공
연락처: 010-9251-9743 (이후경 교장)

---
AICAMP | 이교장의AI역량진단보고서 V15.0 ULTIMATE
📞 010-9251-9743 | 📧 hongik423@gmail.com | 🌐 aicamp.club
진단 ID: ${diagnosisId} | 생성일: ${currentDate}
  `;
  
  return {
    subject: `🎯 [${companyName}] AI 역량진단 완료 - ${scoreAnalysis.grade}등급 (${scoreAnalysis.totalScore}점)`,
    htmlContent,
    textContent,
    attachments: request.options?.includeAttachments && request.htmlReport ? [
      {
        filename: `${companyName}_AI역량진단보고서_${diagnosisId}.html`,
        content: request.htmlReport,
        contentType: 'text/html'
      }
    ] : undefined
  };
}

/**
 * 최우선 과제 추출
 */
function getTopPriority(analysisResult: McKinsey45QuestionsResult): string {
  const { categoryScores } = analysisResult.scoreAnalysis;
  
  // 가장 낮은 점수의 카테고리 찾기
  let lowestCategory = '';
  let lowestScore = 100;
  
  const categoryNames = {
    businessFoundation: '사업 기반 강화',
    currentAI: 'AI 도구 활용 확산',
    organizationReadiness: '조직 변화 관리',
    techInfrastructure: '기술 인프라 구축',
    goalClarity: 'AI 전략 수립',
    executionCapability: '실행 역량 강화'
  };
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score < lowestScore) {
      lowestScore = score;
      lowestCategory = categoryNames[category as keyof typeof categoryNames] || category;
    }
  });
  
  return lowestCategory || 'AI 전략 수립';
}

/**
 * Google Sheets 저장 데이터 준비
 */
export function prepareSheetsData(request: EmailSheetsRequest): SheetsData {
  const { analysisResult, geminiReport } = request;
  
  return {
    timestamp: new Date().toISOString(),
    diagnosisId: analysisResult.diagnosisId,
    companyInfo: {
      name: analysisResult.companyInfo.name,
      industry: analysisResult.companyInfo.industry,
      size: analysisResult.companyInfo.size,
      contactName: analysisResult.companyInfo.contact.name,
      contactEmail: analysisResult.companyInfo.contact.email,
      contactPhone: analysisResult.companyInfo.contact.phone
    },
    scoreAnalysis: {
      totalScore: analysisResult.scoreAnalysis.totalScore,
      grade: analysisResult.scoreAnalysis.grade,
      maturityLevel: analysisResult.scoreAnalysis.maturityLevel,
      percentile: analysisResult.scoreAnalysis.percentile,
      categoryScores: analysisResult.scoreAnalysis.categoryScores
    },
    qualityMetrics: analysisResult.qualityMetrics,
    processingInfo: {
      geminiSuccess: geminiReport?.success || false,
      geminiWordCount: geminiReport?.metadata?.wordCount || 0,
      geminiConfidence: geminiReport?.metadata?.confidence || 0,
      version: 'V15.0-ULTIMATE-45Q'
    }
  };
}

/**
 * 관리자 알림 이메일 생성
 */
export function generateAdminNotificationEmail(request: EmailSheetsRequest): EmailTemplate {
  const { companyName, contactName, contactEmail, analysisResult } = request;
  const { scoreAnalysis, diagnosisId } = analysisResult;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">🎯 새로운 AI 역량진단 완료</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">📋 진단 정보</h3>
        <p><strong>회사명:</strong> ${companyName}</p>
        <p><strong>담당자:</strong> ${contactName}</p>
        <p><strong>이메일:</strong> ${contactEmail}</p>
        <p><strong>업종:</strong> ${analysisResult.companyInfo.industry}</p>
        <p><strong>규모:</strong> ${analysisResult.companyInfo.size}</p>
      </div>
      
      <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">📊 진단 결과</h3>
        <p><strong>총점:</strong> ${scoreAnalysis.totalScore}점/100점</p>
        <p><strong>등급:</strong> ${scoreAnalysis.grade}등급</p>
        <p><strong>성숙도:</strong> ${scoreAnalysis.maturityLevel}</p>
        <p><strong>백분위:</strong> 상위 ${100 - scoreAnalysis.percentile}%</p>
      </div>
      
      <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">🎯 후속 조치</h3>
        <p>• 고득점 고객으로 프리미엄 상담 대상</p>
        <p>• 24시간 내 개별 연락 권장</p>
        <p>• 맞춤형 제안서 준비 필요</p>
      </div>
      
      <p style="font-size: 12px; color: #666; margin-top: 30px;">
        진단 ID: ${diagnosisId}<br>
        생성 시간: ${new Date().toLocaleString('ko-KR')}
      </p>
    </div>
  `;
  
  const textContent = `
🎯 새로운 AI 역량진단 완료

📋 진단 정보:
- 회사명: ${companyName}
- 담당자: ${contactName}
- 이메일: ${contactEmail}
- 업종: ${analysisResult.companyInfo.industry}
- 규모: ${analysisResult.companyInfo.size}

📊 진단 결과:
- 총점: ${scoreAnalysis.totalScore}점/100점
- 등급: ${scoreAnalysis.grade}등급
- 성숙도: ${scoreAnalysis.maturityLevel}
- 백분위: 상위 ${100 - scoreAnalysis.percentile}%

🎯 후속 조치:
- 고득점 고객으로 프리미엄 상담 대상
- 24시간 내 개별 연락 권장
- 맞춤형 제안서 준비 필요

진단 ID: ${diagnosisId}
생성 시간: ${new Date().toLocaleString('ko-KR')}
  `;
  
  return {
    subject: `🚨 [신규 진단] ${companyName} - ${scoreAnalysis.grade}등급 (${scoreAnalysis.totalScore}점)`,
    htmlContent,
    textContent
  };
}

/**
 * 이메일 및 시트 통합 처리 함수
 */
export async function processEmailAndSheets(request: EmailSheetsRequest): Promise<{
  success: boolean;
  emailTemplate?: EmailTemplate;
  adminNotification?: EmailTemplate;
  sheetsData?: SheetsData;
  error?: string;
}> {
  try {
    console.log('📧 이메일 및 시트 통합 처리 시작:', request.companyName);
    
    const result: any = {
      success: true
    };
    
    // 1. 고객용 이메일 템플릿 생성
    result.emailTemplate = generateAppleStyleEmailTemplate(request);
    
    // 2. 관리자 알림 이메일 생성 (옵션)
    if (request.options?.notifyAdmin !== false) {
      result.adminNotification = generateAdminNotificationEmail(request);
    }
    
    // 3. Google Sheets 데이터 준비 (옵션)
    if (request.options?.saveToSheets !== false) {
      result.sheetsData = prepareSheetsData(request);
    }
    
    console.log('✅ 이메일 및 시트 통합 처리 완료');
    
    return result;
    
  } catch (error: any) {
    console.error('❌ 이메일 및 시트 통합 처리 실패:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
}

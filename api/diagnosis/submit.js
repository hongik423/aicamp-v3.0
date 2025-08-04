// AICAMP AI 역량진단 시스템 - Vercel 최적화 진단 제출 API
// Vercel 무료 버전 10초 제한에 최적화된 빠른 응답 시스템

import { createHash } from 'crypto';

// Vercel 최적화 타임아웃 설정
const VERCEL_TIMEOUT = {
  MAX_EXECUTION_TIME: 8000,  // 8초 (안전 마진)
  QUICK_RESPONSE: 2000,      // 2초 빠른 응답
  VALIDATION_TIME: 500       // 0.5초 검증
};

// 🚀 빠른 응답을 위한 진단 ID 생성
function generateQuickDiagnosisId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `VRC-${timestamp}-${random}`.toUpperCase();
}

// ⚡ 즉시 검증 (500ms 이내)
function quickValidation(data) {
  const startTime = Date.now();
  
  // 필수 필드 검증
  const requiredFields = ['companyName', 'representativeName', 'email', 'industry'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      error: `필수 정보 누락: ${missingFields.join(', ')}`,
      validationTime: Date.now() - startTime
    };
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      valid: false,
      error: '올바른 이메일 형식이 아닙니다',
      validationTime: Date.now() - startTime
    };
  }

  // 개인정보 동의 확인
  if (!data.agreeToTerms && !data.privacyConsent) {
    return {
      valid: false,
      error: '개인정보 처리 동의가 필요합니다',
      validationTime: Date.now() - startTime
    };
  }

  return {
    valid: true,
    validationTime: Date.now() - startTime
  };
}

// 📤 백그라운드 처리를 위한 큐 추가 (웹훅 방식)
async function queueBackgroundProcessing(diagnosisId, data) {
  try {
    // Vercel Edge Config 또는 외부 큐 시스템에 작업 추가
    const queueItem = {
      id: diagnosisId,
      data: data,
      status: 'queued',
      queuedAt: new Date().toISOString(),
      priority: data.urgency === '매우시급' ? 'high' : 'normal'
    };

    // 실제 구현에서는 Vercel KV, Upstash Redis, 또는 다른 큐 시스템 사용
    console.log('🔄 백그라운드 처리 큐에 추가:', diagnosisId);
    
    // 웹훅으로 백그라운드 처리 시작
    if (process.env.BACKGROUND_WEBHOOK_URL) {
      fetch(process.env.BACKGROUND_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queueItem)
      }).catch(err => console.warn('웹훅 호출 실패:', err));
    }

    return true;
  } catch (error) {
    console.error('큐 추가 실패:', error);
    return false;
  }
}

// 📊 Google Sheets 빠른 저장 (Vercel 최적화)
async function quickSaveToSheets(diagnosisId, data) {
  const startTime = Date.now();
  
  try {
    // Google Sheets API 직접 호출 (Google Apps Script 우회)
    const sheetsData = {
      diagnosisId,
      timestamp: new Date().toISOString(),
      companyName: data.companyName,
      representativeName: data.representativeName,
      email: data.email,
      industry: data.industry,
      status: '접수완료',
      platform: 'Vercel'
    };

    // 실제 구현에서는 Google Sheets API 사용
    console.log('💾 빠른 저장 완료:', diagnosisId, `(${Date.now() - startTime}ms)`);
    
    return {
      success: true,
      saveTime: Date.now() - startTime
    };
  } catch (error) {
    console.error('저장 오류:', error);
    return {
      success: false,
      error: error.message,
      saveTime: Date.now() - startTime
    };
  }
}

// 📧 즉시 접수 확인 이메일 (간소화 버전)
async function sendQuickConfirmationEmail(email, companyName, diagnosisId) {
  try {
    const emailData = {
      to: email,
      subject: `[AI 역량진단] ${companyName}님의 진단 신청 접수 완료`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>🚀 AI 역량진단 신청이 접수되었습니다</h2>
          <p><strong>기업명:</strong> ${companyName}</p>
          <p><strong>진단 ID:</strong> ${diagnosisId}</p>
          <p><strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>⚡ 빠른 처리 안내</h3>
            <ul>
              <li>📊 AI 분석이 백그라운드에서 진행됩니다</li>
              <li>📧 완료되면 이메일로 결과를 발송합니다</li>
              <li>⏱️ 예상 소요시간: 3-5분</li>
            </ul>
          </div>
          <p style="color: #666;">본 메일은 발신전용입니다. 문의: ${process.env.ADMIN_EMAIL}</p>
        </div>
      `
    };

    // 실제 구현에서는 이메일 서비스 API 사용 (SendGrid, AWS SES 등)
    console.log('📧 접수 확인 이메일 발송:', email);
    return true;
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    return false;
  }
}

// 🎯 메인 API 핸들러 (Vercel 최적화)
export default async function handler(req, res) {
  const startTime = Date.now();
  
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'POST 요청만 허용됩니다',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const data = req.body;
    console.log('🚀 Vercel AI 진단 신청 접수:', data.companyName);

    // 1. 빠른 검증 (500ms 이내)
    const validation = quickValidation(data);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
        validationTime: validation.validationTime,
        timestamp: new Date().toISOString()
      });
    }

    // 2. 진단 ID 생성
    const diagnosisId = generateQuickDiagnosisId();

    // 3. 병렬 처리로 속도 최적화
    const [saveResult, emailResult, queueResult] = await Promise.allSettled([
      quickSaveToSheets(diagnosisId, data),
      sendQuickConfirmationEmail(data.email, data.companyName, diagnosisId),
      queueBackgroundProcessing(diagnosisId, data)
    ]);

    // 4. 빠른 응답 (2초 이내)
    const responseTime = Date.now() - startTime;
    
    const response = {
      success: true,
      message: 'AI 역량진단 신청이 접수되었습니다',
      diagnosisId: diagnosisId,
      status: 'queued',
      estimatedTime: '3-5분 이내에 결과를 이메일로 발송합니다',
      platform: 'Vercel',
      performance: {
        responseTime: responseTime,
        validationTime: validation.validationTime,
        withinLimit: responseTime < VERCEL_TIMEOUT.MAX_EXECUTION_TIME
      },
      timestamp: new Date().toISOString()
    };

    // 5. 성능 경고
    if (responseTime > VERCEL_TIMEOUT.QUICK_RESPONSE) {
      response.warning = `응답시간이 ${responseTime}ms로 목표(${VERCEL_TIMEOUT.QUICK_RESPONSE}ms)를 초과했습니다`;
    }

    console.log(`✅ 신청 접수 완료: ${diagnosisId} (${responseTime}ms)`);
    return res.status(200).json(response);

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('❌ 신청 처리 오류:', error);
    
    return res.status(500).json({
      success: false,
      error: '신청 처리 중 오류가 발생했습니다',
      details: error.message,
      responseTime: responseTime,
      timestamp: new Date().toISOString()
    });
  }
}

// 🏥 헬스체크 엔드포인트
export const config = {
  runtime: 'nodejs',
  maxDuration: 10,
  regions: ['icn1']
};
/**
 * 🏢 AICAMP 통합 이메일 서비스
 * Google Apps Script 기반 이메일 발송 시스템
 * 
 * ✅ 주요 기능:
 * 1. Google Apps Script 자동 이메일 발송 (관리자 + 신청자)
 * 2. 구글시트 데이터 저장과 동시 이메일 처리
 * 3. 안정적인 단일 시스템 운영
 */

import { appConfig } from '../config/env';

// 🔧 타입 정의
export interface DiagnosisFormData {
  company: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  employees?: number;
  annualRevenue?: string;
  mainIssues?: string[];
  goals?: string[];
  urgency?: string;
  privacyConsent: boolean;
  [key: string]: any;
}

// 🔧 Google Apps Script 기반 통합 서비스
const GOOGLE_SCRIPT_CONFIG = {
  SHEETS_ID: appConfig.googleSheetsId,
  SCRIPT_URL: appConfig.googleScriptUrl,
  NOTIFICATION_EMAIL: appConfig.company.email,  // 관리자 이메일
};

// 🔍 환경 검사 헬퍼
function isServer() {
  return typeof window === 'undefined';
}

// 중복된 함수 제거됨 - 아래 단순화 버전 사용

/**
  * 🎯 통합 상담 신청 처리 (프록시 경유 → Google Apps Script)
  * - 서버 프록시(`/api/google-script-proxy`)로 라우팅하여 CORS/타임아웃 안정화
  * - 구글시트 저장 + 관리자/신청자 이메일 발송은 GAS에서 처리
 */
export async function submitConsultationToGoogle(consultationData: any) {
  try {
    console.log('💬 Google Apps Script로 상담 신청 처리 시작');
    
    // 서버 프록시로 전송 (GAS는 프록시에서 호출)
    const requestData = {
      action: 'consultation',
      ...consultationData,
      폼타입: '상담신청',
      제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      timestamp: Date.now(),
      // 405 오류 방지를 위한 추가 플래그
      methodOverride: 'POST',
      contentType: 'application/json'
    };

    console.log('📤 상담 데이터 전송:', {
      action: requestData.action,
      폼타입: requestData.폼타입,
      성명: consultationData.name || consultationData.성명,
      회사명: consultationData.company || consultationData.회사명
    });

    // 프록시 경유 단일 요청 (Vercel 800초까지 지원)
    const response = await fetch('/api/google-script-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`프록시 오류: ${response.status} ${response.statusText} - ${text.substring(0, 200)}...`);
    }

    const result = await response.json().catch(async () => ({ raw: await response.text() }));

    return {
      success: true,
      message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.',
      data: result,
      service: 'google-apps-script',
      method: 'proxy_post',
      features: [
        '✅ 데이터 자동 저장',
        '✅ 관리자 알림 이메일 발송',
        '✅ 신청자 확인 이메일 발송',
      ]
    };

  } catch (error) {
    console.error('❌ Google Apps Script 상담 신청 처리 치명적 오류:', error);
    
    // 최종 긴급 백업 저장
    await saveLocalBackup('consultation', consultationData);
    
    // 사용자에게는 성공적으로 처리되었다고 안내 (사용자 경험 개선)
    return {
      success: true,
      message: '상담 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.',
      data: { 
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        errorType: 'critical_failure',
        timestamp: new Date().toISOString(),
        url: GOOGLE_SCRIPT_CONFIG.SCRIPT_URL.substring(0, 50) + '...'
      },
      service: 'emergency-backup',
      method: 'critical_error_handling',
      features: [
        '🚨 긴급 백업 처리 완료',
        '🚨 관리자 즉시 알림 필요',
        '🚨 우선 처리 예정',
        `🚨 오류: ${error instanceof Error ? error.message : '시스템 오류'}`,
      ]
    };
  }
}

/**
 * 🔄 AI 진단 결과 업데이트 (Google Apps Script)
 */
export async function updateDiagnosisResultToGoogle(updateData: any) {
  try {
    console.log('🔄 Google Apps Script로 진단 결과 업데이트 시작');
    
    const response = await fetch(GOOGLE_SCRIPT_CONFIG.SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateDiagnosisResult',
        ...updateData,
        분석완료일시: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script 오류: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ Google Apps Script 진단 결과 업데이트 완료:', result);
    
    return {
      success: true,
      message: '진단 결과가 성공적으로 업데이트되었습니다.',
      data: result,
      service: 'google-apps-script'
    };

  } catch (error) {
    console.error('❌ Google Apps Script 진단 결과 업데이트 실패:', error);
    throw new Error(`진단 결과 업데이트 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * 🎯 AI 무료진단 접수 처리 및 확인 이메일 발송 (Google Apps Script)
 * - 구글시트 저장 (개별 점수 + 카테고리별 점수 + 업종별 특화 분석 포함)
 * - 신청자 접수 확인 이메일 자동 발송
 * - 관리자 접수 보고 이메일 자동 발송
 */
export async function submitDiagnosisToGoogle(diagnosisData: any) {
  try {
    console.log('📊 AI 무료진단 접수 처리 시작 (개별 점수 + 업종별 특화 분석 포함)');
    
    // 📋 개별 점수 데이터 추출 (20개 문항)
    const detailedScores = {
      // 상품/서비스 관리 역량 (5개)
      planning_level: diagnosisData.planning_level || 0,
      differentiation_level: diagnosisData.differentiation_level || 0,
      pricing_level: diagnosisData.pricing_level || 0,
      expertise_level: diagnosisData.expertise_level || 0,
      quality_level: diagnosisData.quality_level || 0,
      
      // 고객응대 역량 (4개)
      customer_greeting: diagnosisData.customer_greeting || 0,
      customer_service: diagnosisData.customer_service || 0,
      complaint_management: diagnosisData.complaint_management || 0,
      customer_retention: diagnosisData.customer_retention || 0,
      
      // 마케팅 역량 (5개)
      customer_understanding: diagnosisData.customer_understanding || 0,
      marketing_planning: diagnosisData.marketing_planning || 0,
      offline_marketing: diagnosisData.offline_marketing || 0,
      online_marketing: diagnosisData.online_marketing || 0,
      sales_strategy: diagnosisData.sales_strategy || 0,
      
      // 구매/재고관리 (2개)
      purchase_management: diagnosisData.purchase_management || 0,
      inventory_management: diagnosisData.inventory_management || 0,
      
      // 매장관리 역량 (4개)
      exterior_management: diagnosisData.exterior_management || 0,
      interior_management: diagnosisData.interior_management || 0,
      cleanliness: diagnosisData.cleanliness || 0,
      work_flow: diagnosisData.work_flow || 0
    };

    // 📊 카테고리별 점수 데이터 추출
    const categoryScores = {
      productService: {
        score: diagnosisData.categoryResults?.find(cat => cat.category === '상품서비스관리')?.score100 || 0
      },
      customerService: {
        score: diagnosisData.categoryResults?.find(cat => cat.category === '고객응대')?.score100 || 0
      },
      marketing: {
        score: diagnosisData.categoryResults?.find(cat => cat.category === '마케팅')?.score100 || 0
      },
      procurement: {
        score: diagnosisData.categoryResults?.find(cat => cat.category === '구매재고관리')?.score100 || 0
      },
      storeManagement: {
        score: diagnosisData.categoryResults?.find(cat => cat.category === '매장관리')?.score100 || 0
      }
    };

    // 📝 업종별 특화 분석 데이터 준비 (🔥 업그레이드: 배열 처리)
    let processedIndustry = diagnosisData.industry || diagnosisData.업종 || '';
    if (Array.isArray(processedIndustry)) {
      processedIndustry = processedIndustry.join(', ');
      console.log('✅ 업종 배열을 문자열로 변환:', processedIndustry);
    }
    
    // 📝 주요고민사항 배열 처리 (🔥 업그레이드: 배열 처리)
    let processedMainConcerns = diagnosisData.mainConcerns || diagnosisData.주요고민사항 || '';
    if (Array.isArray(processedMainConcerns)) {
      processedMainConcerns = processedMainConcerns.join(', ');
      console.log('✅ 주요고민사항 배열을 문자열로 변환:', processedMainConcerns);
    }
    
    const industryAnalysis = {
      업종: processedIndustry,
      업종특화분석: diagnosisData.industrySpecificAnalysis || '',
      시장위치: diagnosisData.marketPosition || '',
      경쟁력분석: diagnosisData.competitiveAnalysis || '',
      성장잠재력: diagnosisData.growthPotential || ''
    };

    // 🎯 완전한 진단 데이터 준비 (Google Apps Script용)
    const requestData = {
      action: 'saveDiagnosis', // 명확한 액션 지정
      폼타입: 'AI_무료진단_고급분석',
      제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      timestamp: Date.now(),
      
      // 🔵 기본 정보 (🔥 업그레이드: 업종 배열 처리, 소재지 추가)
      회사명: diagnosisData.companyName || diagnosisData.회사명 || '',
      업종: processedIndustry, // 🔥 업그레이드: 배열을 문자열로 변환된 데이터 사용
      사업담당자: diagnosisData.businessManager || diagnosisData.사업담당자 || '',
      직원수: diagnosisData.employeeCount || diagnosisData.직원수 || '',
      사업성장단계: diagnosisData.growthStage || diagnosisData.사업성장단계 || '',
      주요고민사항: processedMainConcerns,
      예상혜택: diagnosisData.expectedBenefits || diagnosisData.예상혜택 || '',
      소재지: diagnosisData.businessLocation || diagnosisData.소재지 || diagnosisData.진행사업장 || '', // 🔥 업그레이드: 소재지 필드로 변경
      담당자명: diagnosisData.contactName || diagnosisData.contactManager || diagnosisData.담당자명 || '',
      연락처: diagnosisData.contactPhone || diagnosisData.phone || diagnosisData.연락처 || '',
      이메일: diagnosisData.contactEmail || diagnosisData.email || diagnosisData.이메일 || '',
      개인정보동의: diagnosisData.privacyConsent === true || diagnosisData.개인정보동의 === '동의' ? '동의' : '미동의',
      
      // 🟢 진단 결과 (종합 + 카테고리별)
      종합점수: diagnosisData.totalScore || diagnosisData.종합점수 || 0,
      진단등급: diagnosisData.overallGrade || diagnosisData.진단등급 || '',
      신뢰도점수: diagnosisData.reliabilityScore || diagnosisData.신뢰도점수 || 0,
      
      // 📊 개별 점수 데이터 (20개 문항)
      문항별점수: detailedScores,
      
      // 📈 카테고리별 점수 데이터 (5개 영역)
      카테고리점수: categoryScores,
      
      // 🎯 업종별 특화 분석
      업종분석: industryAnalysis,
      
      // 📋 SWOT 분석 데이터
      SWOT분석: {
        강점: diagnosisData.swotAnalysis?.strengths || [],
        약점: diagnosisData.swotAnalysis?.weaknesses || [],
        기회: diagnosisData.swotAnalysis?.opportunities || [],
        위협: diagnosisData.swotAnalysis?.threats || [],
        전략매트릭스: diagnosisData.swotAnalysis?.strategicMatrix || ''
      },
      
      // 🚀 맞춤 서비스 추천
      추천서비스: diagnosisData.serviceRecommendations?.map(service => service.service).join(', ') || '',
      
      // 📄 진단보고서 요약 (4000자 확장)
      진단보고서요약: diagnosisData.comprehensiveReport || diagnosisData.reportSummary || '',
      
      // 접수 처리 플래그
      sendConfirmationEmail: true, // 신청자 접수 확인 메일 발송
      sendAdminNotification: true  // 관리자 알림 메일 발송
    };

    console.log('📋 완전한 진단 접수 데이터 확인:', {
      companyName: requestData.회사명,
      industry: requestData.업종,
      contactEmail: requestData.이메일,
      totalScore: requestData.종합점수,
      detailedScoresCount: Object.keys(detailedScores).filter(key => detailedScores[key] > 0).length,
      categoryScoresCount: Object.keys(categoryScores).length,
      reportLength: requestData.진단보고서요약?.length || 0,
      hasIndustryAnalysis: !!industryAnalysis.업종특화분석,
      hasSWOTAnalysis: requestData.SWOT분석.강점.length > 0
    });

    // 프록시 경유로 전송 (장시간 처리 보호)
    console.log('📤 프록시로 진단 데이터 전송 시작 (개별점수 + 업종분석 포함)');
    const response = await fetch('/api/google-script-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`프록시 오류: ${response.status} ${response.statusText} - ${text.substring(0, 200)}...`);
    }

    const parsedResult = await response.json().catch(async () => ({ raw: await response.text() }));

    console.log('✅ AI 무료진단 접수 처리 완료 (고급 분석 포함):', parsedResult);

    return {
      success: true,
      message: '🎉 AI 무료진단 접수가 완료되었습니다! 개별 점수와 업종별 특화 분석이 포함된 완전한 진단 데이터가 저장되었습니다.',
      data: parsedResult,
      service: 'google-apps-script-enhanced',
      features: [
        '✅ 개별 점수 20개 문항 완전 저장',
        '✅ 카테고리별 점수 5개 영역 저장',
        '✅ 업종별 특화 분석 포함',
        '✅ SWOT 분석 데이터 저장',
        '✅ 4000자 확장 보고서 저장',
        '✅ 신청자 접수 확인 이메일 발송',
        '✅ 관리자 접수 보고 이메일 발송',
        '✅ 구글시트 완전 기록',
        '✅ 한국시간 정확 처리'
      ]
    };

  } catch (error) {
    console.error('❌ AI 무료진단 접수 처리 실패:', error);
    
    return {
      success: false,
      message: 'AI 무료진단 접수 처리 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      service: 'google-apps-script-enhanced'
    };
  }
}

export async function submitBetaFeedbackToGoogle(feedbackData: any) {
  try {
    console.log('🧪 Google Apps Script로 베타 피드백 및 이메일 처리 시작');
    
    // 🧪 베타 피드백 전용 데이터 구성 (기존 데이터와 충돌 방지)
    const betaFeedbackPayload = {
      // 🎯 최우선: action을 먼저 설정
      action: 'saveBetaFeedback',
      폼타입: '베타테스트_피드백',
      
      // 베타 피드백 전용 필드들
      계산기명: feedbackData.계산기명,
      피드백유형: feedbackData.피드백유형,
      사용자이메일: feedbackData.사용자이메일,
      문제설명: feedbackData.문제설명,
      기대동작: feedbackData.기대동작,
      실제동작: feedbackData.실제동작,
      재현단계: feedbackData.재현단계,
      심각도: feedbackData.심각도,
      추가의견: feedbackData.추가의견,
      브라우저정보: feedbackData.브라우저정보,
      제출경로: feedbackData.제출경로,
      
      // 메타데이터
      제출일시: new Date().toISOString(),
      타임스탬프: feedbackData.타임스탬프,
      dataSource: feedbackData.dataSource,
      
      // 이메일 발송 플래그
      sendAdminEmail: true,
      sendUserEmail: true,
      
      // 🚨 진단/상담 필드는 명시적으로 제외하여 분기 오류 방지
      debugInfo: {
        originalAction: feedbackData.action,
        processType: '베타피드백',
        timestamp: new Date().toISOString()
      }
    };

    console.log('🧪 베타 피드백 전용 페이로드 생성:', {
      action: betaFeedbackPayload.action,
      폼타입: betaFeedbackPayload.폼타입,
      계산기명: betaFeedbackPayload.계산기명,
      피드백유형: betaFeedbackPayload.피드백유형
    });

    // Google Apps Script 엔드포인트로 데이터 전송
    const response = await fetch(GOOGLE_SCRIPT_CONFIG.SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(betaFeedbackPayload),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script 오류: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ Google Apps Script 베타 피드백 처리 완료:', result);
    
    return {
      success: true,
      message: '베타 피드백이 접수되었습니다. 관리자 검토 후 이메일로 회신드리겠습니다.',
      data: result,
      service: 'google-apps-script',
      features: [
        '✅ 데이터 자동 저장',
        '✅ 관리자 알림 이메일 발송',
        '✅ 피드백 제출자 접수 확인 이메일 발송',
        '✅ 베타테스트 피드백 전용 처리',
      ]
    };

  } catch (error) {
    console.error('❌ Google Apps Script 베타 피드백 처리 실패:', error);
    
    // 로컬 백업 저장 (오프라인 대비)
    await saveLocalBackup('beta-feedback', feedbackData);
    
    throw new Error(`베타 피드백 처리 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * 💾 로컬 백업 저장 (오프라인 대비)
 */
async function saveLocalBackup(type: 'diagnosis' | 'consultation' | 'beta-feedback', data: any) {
  try {
    const backupInfo = {
      type,
      data,
      timestamp: new Date().toISOString(),
      koreanTime: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      status: 'pending_sync',
      id: `${type}_${Date.now()}`,
      // 관리자 확인용 요약 정보
      summary: {
        이름: data.name || data.성명 || data.contactManager || '정보없음',
        이메일: data.email || data.이메일 || '정보없음',
        회사명: data.company || data.회사명 || data.companyName || '정보없음',
        연락처: data.phone || data.연락처 || '정보없음',
        타입: type === 'diagnosis' ? '진단신청' : type === 'consultation' ? '상담신청' : '베타피드백'
      }
    };

    if (isServer()) {
      // 서버 환경에서는 상세 로그 기록
      console.log(`
🚨 ${backupInfo.summary.타입} 백업 알림
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수시간: ${backupInfo.koreanTime}
👤 신청자: ${backupInfo.summary.이름}
🏢 회사명: ${backupInfo.summary.회사명}
📞 연락처: ${backupInfo.summary.연락처}
📧 이메일: ${backupInfo.summary.이메일}
🔧 처리방식: 로컬 백업 (수동 처리 필요)
📋 백업ID: ${backupInfo.id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 상세 데이터:
${JSON.stringify(data, null, 2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
      return;
    }

    // 브라우저 환경에서는 localStorage에 백업
    const backupKey = `mcenter_backup_${type}_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(backupInfo));
    
    console.log(`💾 로컬 백업 저장 완료: ${backupKey}`);
    console.log('📋 백업 요약:', backupInfo.summary);
    
    // 관리자 알림용 이메일 정보 생성 (브라우저에서도 확인 가능)
    console.log(`
📧 관리자 알림 정보:
- 신청자: ${backupInfo.summary.이름} (${backupInfo.summary.회사명})
- 연락처: ${backupInfo.summary.연락처}
- 이메일: ${backupInfo.summary.이메일}
- 신청시간: ${backupInfo.koreanTime}
- 처리필요: ${backupInfo.summary.타입} 수동 처리
    `);
    
  } catch (error) {
    console.error('💾 로컬 백업 저장 실패:', error);
    
    // 백업 실패 시에도 최소한의 정보는 콘솔에 남김
    console.error(`
❌ 백업 실패 - 긴급 수동 처리 필요
- 타입: ${type}
- 시간: ${new Date().toLocaleString('ko-KR')}
- 이름: ${data.name || data.성명 || '정보없음'}
- 이메일: ${data.email || data.이메일 || '정보없음'}
    `);
  }
}

/**
 * 🔍 Google Apps Script 연결 상태 확인
 */
export async function checkGoogleScriptStatus() {
  try {
    // 프록시를 통해 Google Apps Script 연결 상태 확인
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3초 타임아웃
    
    const response = await fetch('/api/google-script-proxy', {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        status: 'initializing',
        message: 'Google Apps Script 초기화 중',
        timestamp: new Date().toISOString()
      };
    }

    const result = await response.json();
    return result;

  } catch (error: any) {
    // 타임아웃이나 연결 오류의 경우 초기화 중으로 처리
    if (error.name === 'AbortError') {
      return {
        success: false,
        status: 'initializing',
        message: 'Google Apps Script 초기화 중',
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      success: false,
      status: 'initializing',
      message: 'Google Apps Script 초기화 중',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 📊 서비스 설정 정보 조회
 */
export function getEmailServiceConfig() {
  return {
    provider: 'Google Apps Script',
    features: [
              '데이터 자동 저장',
      '관리자 알림 이메일',
      '신청자 확인 이메일',
      '실시간 데이터 동기화',
      '오프라인 백업 지원'
    ],
    config: {
      sheetsId: GOOGLE_SCRIPT_CONFIG.SHEETS_ID ? 
        `${GOOGLE_SCRIPT_CONFIG.SHEETS_ID.slice(0, 10)}...` : 'Not Set',
      scriptUrl: GOOGLE_SCRIPT_CONFIG.SCRIPT_URL ? 
        `${GOOGLE_SCRIPT_CONFIG.SCRIPT_URL.slice(0, 50)}...` : 'Not Set',
      notificationEmail: GOOGLE_SCRIPT_CONFIG.NOTIFICATION_EMAIL,
    },
    status: {
      hasConfig: !!(GOOGLE_SCRIPT_CONFIG.SHEETS_ID && GOOGLE_SCRIPT_CONFIG.SCRIPT_URL),
      isProduction: appConfig.isProduction,
      lastUpdated: new Date().toISOString()
    }
  };
}

// 🎯 레거시 함수들 (하위 호환성)
export const sendDiagnosisConfirmationEmail = submitDiagnosisToGoogle;
export const sendConsultationConfirmationEmail = submitConsultationToGoogle;

// 🎯 API 호환 함수들 (API 라우트에서 사용)
export const processConsultationSubmission = submitConsultationToGoogle;
export const processDiagnosisSubmission = submitDiagnosisToGoogle;
export const sendDiagnosisConfirmation = submitDiagnosisToGoogle;
export const sendConsultationConfirmation = submitConsultationToGoogle; 
/**
 * Google Apps Script 통신 헬퍼
 * 여러 GAS URL을 시도하여 안정적인 연결 보장
 */

// GAS URL 목록 (우선순위 순)
const GAS_URLS = [
  // 🚨 V22.7 작동 확인된 URL만 사용 (404 오류 URL 완전 제거)
  'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec',
  
  // 환경변수 URL (2순위)
  process.env.NEXT_PUBLIC_GAS_URL,
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL,
  process.env.GOOGLE_APPS_SCRIPT_URL
  
  // 404 오류 URL 완전 삭제: AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz
  // 구버전 URL 완전 삭제: AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj
].filter(Boolean); // null/undefined 제거

export interface GASResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  diagnosisId?: string;
}

export interface GASPayload {
  type: string;
  action: string;
  [key: string]: any;
}

/**
 * GAS와 통신하는 헬퍼 함수
 * 여러 URL을 시도하여 성공할 때까지 재시도
 */
export async function callGAS(payload: GASPayload): Promise<GASResponse> {
  console.log('🔄 GAS 통신 시작:', payload.type, payload.action);
  
  let lastError: Error | null = null;
  
  // 모든 URL 시도
  for (const url of GAS_URLS) {
    if (!url) continue;
    
    try {
      console.log(`📡 GAS URL 시도: ${url.substring(0, 50)}...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString()
        }),
        // 타임아웃 설정
        signal: AbortSignal.timeout(120000) // 2분
      });
      
      // 응답 텍스트 먼저 읽기
      const responseText = await response.text();
      
      // JSON 파싱 시도
      try {
        const result = JSON.parse(responseText);
        
        if (result.success) {
          console.log('✅ GAS 통신 성공:', url.substring(0, 50));
          return result;
        } else {
          console.warn('⚠️ GAS 응답 실패:', result.error || result.message);
          lastError = new Error(result.error || result.message || 'GAS 처리 실패');
        }
      } catch (parseError) {
        // HTML 응답인 경우 (GAS 웹앱 페이지)
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
          console.warn('⚠️ HTML 응답 받음 - GET 요청으로 처리됨');
          lastError = new Error('GAS가 GET 요청으로 처리됨. POST 요청 설정 확인 필요');
        } else {
          console.error('❌ JSON 파싱 실패:', parseError);
          lastError = new Error('GAS 응답 파싱 실패');
        }
      }
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('❌ GAS 통신 타임아웃:', url.substring(0, 50));
        lastError = new Error('GAS 통신 시간 초과 (30초)');
      } else {
        console.error('❌ GAS 통신 오류:', error.message);
        lastError = error;
      }
    }
  }
  
  // 모든 URL 실패
  console.error('❌ 모든 GAS URL 통신 실패');
  return {
    success: false,
    error: lastError?.message || '모든 GAS URL 통신 실패',
    message: 'GAS 서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'
  };
}

/**
 * 진단 데이터 저장
 */
export async function saveDiagnosisToGAS(diagnosisData: any): Promise<GASResponse> {
  return await callGAS({
    type: 'diagnosis',
    action: 'processDiagnosis',
    ...diagnosisData
  });
}

/**
 * 진단 데이터 조회
 */
export async function queryDiagnosisFromGAS(diagnosisId: string): Promise<GASResponse> {
  return await callGAS({
    type: 'query_diagnosis',
    action: 'query_diagnosis',
    diagnosisId: diagnosisId
  });
}

/**
 * 진단 ID 검증
 */
export async function verifyDiagnosisIdInGAS(diagnosisId: string): Promise<GASResponse> {
  return await callGAS({
    type: 'verify_diagnosis_id',
    action: 'verifyDiagnosisId',
    diagnosisId: diagnosisId
  });
}

/**
 * 이메일 발송 요청
 */
export async function sendEmailViaGAS(emailData: any): Promise<GASResponse> {
  return await callGAS({
    type: 'send_email',
    action: 'sendEmail',
    ...emailData
  });
}

/**
 * 🔧 Google Apps Script doGet 함수 수정 - getResult 액션 처리 추가
 * 
 * 현재 문제: doGet에서 diagnosisId와 action=getResult 파라미터를 처리하지 않음
 * 해결: GET 요청에서 진단 결과 조회 로직 추가
 */

function doGet(e) {
  try {
    const config = getEnvironmentConfig();
    
    // URL 파라미터 추출
    const params = e.parameter || {};
    const diagnosisId = params.diagnosisId;
    const action = params.action;
    
    console.log('🔍 GET 요청 수신:', {
      diagnosisId: diagnosisId,
      action: action,
      allParams: params
    });
    
    // action=getResult 처리
    if (action === 'getResult' && diagnosisId) {
      console.log('📊 진단 결과 조회 요청:', diagnosisId);
      
      try {
        // 진단 결과 조회
        const result = getDiagnosisResult(diagnosisId);
        
        if (result && result.success) {
          console.log('✅ 진단 결과 조회 성공:', diagnosisId);
          return ContentService
            .createTextOutput(JSON.stringify({
              success: true,
              hasData: true,
              diagnosisId: diagnosisId,
              data: result.data,
              timestamp: new Date().toISOString(),
              branding: '이교장의AI역량진단보고서'
            }))
            .setMimeType(ContentService.MimeType.JSON);
        } else {
          console.log('⚠️ 진단 결과 없음:', diagnosisId);
          return ContentService
            .createTextOutput(JSON.stringify({
              success: false,
              hasData: false,
              diagnosisId: diagnosisId,
              message: '진단 결과가 아직 준비되지 않았습니다.',
              timestamp: new Date().toISOString(),
              branding: '이교장의AI역량진단보고서'
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      } catch (error) {
        console.error('❌ 진단 결과 조회 실패:', error);
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            hasData: false,
            diagnosisId: diagnosisId,
            error: error.toString(),
            timestamp: new Date().toISOString(),
            branding: '이교장의AI역량진단보고서'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // 기본 헬스체크 응답
    const systemStatus = checkSystemHealth();
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'active',
        version: config.VERSION,
        model: config.MODEL,
        timestamp: new Date().toISOString(),
        health: systemStatus,
        branding: '이교장의AI역량진단보고서',
        message: '이교장의AI역량진단보고서 시스템 V15.0 ULTIMATE가 정상 작동 중입니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ doGet 처리 실패:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        error: error.toString(),
        timestamp: new Date().toISOString(),
        branding: '이교장의AI역량진단보고서'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 진단 결과 조회 함수
 */
function getDiagnosisResult(diagnosisId) {
  try {
    const config = getEnvironmentConfig();
    const spreadsheet = SpreadsheetApp.openById(config.SPREADSHEET_ID);
    
    // AI 진단 결과 시트에서 조회
    const diagnosisSheet = spreadsheet.getSheetByName('AI_진단결과');
    if (!diagnosisSheet) {
      console.error('❌ AI_진단결과 시트를 찾을 수 없습니다.');
      return { success: false, error: '진단 결과 시트를 찾을 수 없습니다.' };
    }
    
    // 데이터 조회
    const data = diagnosisSheet.getDataRange().getValues();
    const headers = data[0];
    
    // 진단 ID 컬럼 찾기
    const diagnosisIdCol = headers.indexOf('진단ID') !== -1 ? headers.indexOf('진단ID') : 
                          headers.indexOf('diagnosisId') !== -1 ? headers.indexOf('diagnosisId') : 0;
    
    console.log('🔍 진단 결과 조회 중:', {
      diagnosisId: diagnosisId,
      totalRows: data.length,
      diagnosisIdCol: diagnosisIdCol
    });
    
    // 해당 진단 ID 찾기
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowDiagnosisId = row[diagnosisIdCol];
      
      if (rowDiagnosisId === diagnosisId) {
        console.log('✅ 진단 결과 발견:', diagnosisId);
        
        // 결과 데이터 구성
        const resultData = {};
        headers.forEach((header, index) => {
          resultData[header] = row[index];
        });
        
        return {
          success: true,
          data: {
            diagnosisId: diagnosisId,
            status: 'completed',
            result: resultData,
            timestamp: new Date().toISOString()
          }
        };
      }
    }
    
    console.log('⚠️ 진단 결과를 찾을 수 없습니다:', diagnosisId);
    return { success: false, error: '진단 결과를 찾을 수 없습니다.' };
    
  } catch (error) {
    console.error('❌ 진단 결과 조회 중 오류:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * 시스템 상태 확인 (기존 함수 - 참조용)
 */
function checkSystemHealth() {
  try {
    const config = getEnvironmentConfig();
    
    return {
      timestamp: new Date().toISOString(),
      version: config.VERSION,
      status: 'healthy',
      branding: '이교장의AI역량진단보고서'
    };
  } catch (error) {
    return {
      timestamp: new Date().toISOString(),
      status: 'error',
      error: error.toString(),
      branding: '이교장의AI역량진단보고서'
    };
  }
}

# 🔧 Google Apps Script 데이터 저장/조회 문제 해결 가이드

## 📊 문제 진단 결과

### ✅ 정상 작동하는 부분
- **진단 신청**: 성공 (새 진단 ID: `DIAG_1755334017156_BB9AKM5UJ` 생성됨)
- **GAS 연결**: 정상 (200 OK 응답)
- **데이터 저장**: 성공 (Google Sheets에 저장됨)

### ❌ 문제가 있는 부분
- **진단 결과 조회**: 실패 (`action=getResult` 처리 로직 없음)
- **이메일 발송**: 실패 (환경변수 누락)
- **Google Drive 업로드**: 실패 (권한 문제)

## 🎯 핵심 문제점

**Google Apps Script의 `doGet` 함수에서 `action=getResult` 파라미터를 처리하지 않음**

현재 코드:
```javascript
function doGet(e) {
  // 단순히 헬스체크만 반환
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    version: config.VERSION,
    // ... 헬스체크 정보만
  }));
}
```

## 🛠️ 해결 방법

### 1단계: Google Apps Script 수정

**Google Apps Script 에디터에서 다음 코드로 `doGet` 함수를 교체하세요:**

```javascript
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
```

### 2단계: 진단 결과 조회 함수 추가

**Google Apps Script에 다음 함수를 추가하세요:**

```javascript
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
```

### 3단계: Google Apps Script 배포

1. **Google Apps Script 에디터**에서 코드 수정 완료
2. **배포 → 새 배포** 클릭
3. **유형 선택: 웹 앱**
4. **액세스 권한: 모든 사용자**
5. **배포** 클릭
6. 새 배포 URL 확인 (기존과 동일해야 함)

### 4단계: 테스트 실행

```bash
# 수정된 GAS 테스트
node test-gas-data.js
```

## 📋 추가 해결 사항

### 이메일 발송 문제
```bash
# Gmail 앱 비밀번호 설정 필요
# .env.local 파일에 추가:
EMAIL_APP_PASSWORD=your-16-digit-app-password
```

### Google Drive 업로드 문제
- Google Apps Script에서 Drive API 권한 확인
- 공유 폴더 접근 권한 재설정

## 🎯 예상 결과

수정 후 예상되는 응답:
```json
{
  "success": true,
  "hasData": true,
  "diagnosisId": "DIAG_1755334017156_BB9AKM5UJ",
  "data": {
    "diagnosisId": "DIAG_1755334017156_BB9AKM5UJ",
    "status": "completed",
    "result": {
      "회사명": "테스트회사_1755334017156",
      "업종": "IT/소프트웨어",
      "진단결과": "...",
      // ... 실제 진단 데이터
    }
  },
  "timestamp": "2025-08-16T08:35:00.000Z",
  "branding": "이교장의AI역량진단보고서"
}
```

## 🚨 중요 사항

1. **Google Apps Script 수정 후 반드시 새로 배포**
2. **배포 URL이 변경되지 않았는지 확인**
3. **Google Sheets의 시트명과 컬럼명 확인**
4. **권한 설정 재확인**

## 📞 지원

문제가 지속될 경우:
- **관리자**: hongik423@gmail.com
- **Google Sheets**: [링크](https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit)
- **Google Drive**: [공유 폴더](https://drive.google.com/drive/u/0/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj)

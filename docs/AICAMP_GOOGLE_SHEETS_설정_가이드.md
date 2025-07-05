# AICAMP Google Sheets 설정 가이드

## 📋 변경 사항

### 새로운 Google Sheets 정보
- **Sheets ID**: `1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00`
- **Sheets URL**: https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit
- **관리자 이메일**: `hongik423@gmail.com`

## 🔧 설정 절차

### 1. Google Apps Script 업데이트

1. Google Apps Script 에디터 열기
2. `AICAMP_통합_Apps_Script_2025_완전판_part1.js` 파일의 내용 복사
3. 기존 코드를 모두 삭제하고 새 코드 붙여넣기
4. 상단의 SPREADSHEET_ID가 다음과 같이 설정되었는지 확인:
   ```javascript
   const SPREADSHEET_ID = '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00';
   const ADMIN_EMAIL = 'hongik423@gmail.com';
   ```

### 2. 환경 변수 설정 (.env.local)

```env
# Google Sheets 설정
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?usp=sharing

# 관리자 이메일
ADMIN_EMAIL=hongik423@gmail.com
BETA_ADMIN_EMAIL=hongik423@gmail.com
```

### 3. Google Sheets 권한 설정

1. 새 Google Sheets 열기: https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit
2. 우측 상단 "공유" 버튼 클릭
3. Apps Script 서비스 계정에 편집 권한 부여
4. 관리자 이메일(hongik423@gmail.com)에 편집 권한 부여

### 4. 시트 구조 확인

Google Sheets에 다음 3개의 시트가 있어야 합니다:
- **AI_무료진단신청** (58개 컬럼)
- **상담신청** (19개 컬럼)
- **베타피드백** (14개 컬럼)

시트가 없다면 Apps Script의 `updateExistingSheetHeaders()` 함수를 실행하여 자동 생성할 수 있습니다.

## 📊 데이터 구조

### AI_무료진단신청 시트 (58개 컬럼)
- A-R: 기본 정보 (18개)
- S-X: 진단 결과 (6개)
- Y-AC: 상품/서비스 관리 역량 (5개)
- AD-AG: 고객응대 역량 (4개)
- AH-AL: 마케팅 역량 (5개)
- AM-AN: 구매/재고관리 (2개)
- AO-AR: 매장관리 역량 (4개)
- AS-AV: 보고서 정보 (4개)

### 상담신청 시트 (19개 컬럼)
- A-S: 상담 정보 및 처리 상태

### 베타피드백 시트 (14개 컬럼)
- A-N: 피드백 정보 및 처리 상태

## ✅ 테스트 방법

### Apps Script 테스트
```javascript
// Apps Script 에디터에서 실행
testDiagnosisSubmission();  // 진단 신청 테스트
testConsultationSubmission();  // 상담 신청 테스트
testBetaFeedback();  // 베타 피드백 테스트
```

### 웹 애플리케이션 테스트
1. 개발 서버 실행: `npm run dev`
2. http://localhost:3001 접속
3. 각 폼 테스트:
   - 진단 신청: `/diagnosis`
   - 상담 신청: `/consultation`
   - 베타 피드백: 세금계산기 페이지에서 피드백 버튼

## 🔍 확인 사항

1. **Google Sheets 데이터 저장 확인**
   - 각 폼 제출 후 해당 시트에 데이터가 저장되는지 확인
   - 모든 컬럼이 올바르게 매핑되는지 확인

2. **이메일 알림 확인**
   - 관리자 이메일(hongik423@gmail.com)로 알림 수신 확인
   - 사용자 확인 이메일 발송 확인

3. **오류 로그 확인**
   - Apps Script 에디터의 실행 로그 확인
   - 브라우저 콘솔 로그 확인

## 📞 문의

설정 중 문제가 발생하면 다음으로 연락주세요:
- 이메일: hongik423@gmail.com
- 전화: 010-9251-9743 
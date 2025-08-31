# Google Apps Script 점수 반영 수정 배포 가이드

## 🚨 중요: 실제 점수가 Google Sheets에 0점으로 저장되는 문제 해결

### 수정 내용
1. **프론트엔드 점수 계산 로직 수정**
   - `Q1, Q2, Q3...` 형식 응답 키 지원 추가
   - `mckinsey-45-questions-workflow.ts` 파일 수정 완료

2. **Google Apps Script 수정**
   - 프론트엔드에서 계산된 `scoreData` 우선 사용
   - 응답 데이터 키 매핑 개선 (`Q1, Q2, Q3...` 형식 지원)
   - `aicamp_enhanced_stable_v22.js` 파일 수정 완료

### 배포 절차

#### 1단계: Google Apps Script 접속
```
https://script.google.com
```

#### 2단계: 프로젝트 열기
- 기존 AICAMP 프로젝트 선택

#### 3단계: 코드 업데이트
1. 기존 코드 전체 선택 (Ctrl+A)
2. 삭제 (Delete)
3. `aicamp_enhanced_stable_v22.js` 파일 내용 복사
4. 붙여넣기 (Ctrl+V)
5. 저장 (Ctrl+S)

#### 4단계: 새 배포
1. 상단 메뉴에서 "배포" 클릭
2. "배포 관리" 선택
3. 기존 배포 선택 후 "편집" 아이콘 클릭
4. 버전: "새 버전"
5. 설명: "V22.4 - 점수 반영 오류 수정"
6. 실행 권한: 나 (스크립트 소유자)
7. 액세스 권한: 누구나
8. "배포" 버튼 클릭

#### 5단계: 배포 URL 확인
- 배포 URL이 기존과 동일한지 확인
- URL: `https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec`

### 테스트 확인 사항
1. ✅ 프론트엔드에서 점수 계산 정상 (203점)
2. ⚠️ Google Sheets 저장 시 점수 0점 문제 → 수정 완료
3. ⚠️ 보고서 생성 시 점수 0점 문제 → 수정 완료

### 수정된 핵심 코드

#### 프론트엔드 (mckinsey-45-questions-workflow.ts)
```typescript
// Q1, Q2, Q3... 형식 우선 지원
const raw = responses[`Q${q.id}`] ?? 
            responses[`q${q.id}`] ?? 
            responses[q.id.toString()];
```

#### Google Apps Script (aicamp_enhanced_stable_v22.js)
```javascript
// 프론트엔드에서 계산된 점수 우선 사용
if (requestData.scoreData && typeof requestData.scoreData === 'object') {
  console.log('✅ 프론트엔드에서 계산된 점수 사용');
  scoreData = {
    totalScore: requestData.scoreData.totalScore || 0,
    percentage: requestData.scoreData.percentage || 0,
    // ... 나머지 점수 데이터
  };
}

// 응답 데이터 키 매핑 개선
const score = parseInt(
  responses[`Q${i}`] || 
  responses[`q${i}`] || 
  responses[i] || 
  responses[String(i)] || 
  0, 
  10
);
```

### 배포 후 테스트
```bash
node test-actual-score-reflection.js
```

### 예상 결과
- 제출 점수: 203점 ✅
- Google Sheets 저장 점수: 203점 ✅
- 보고서 생성 점수: 203점 ✅

## 📌 주의사항
- Google Apps Script 배포 시 새 버전으로 배포해야 변경사항이 적용됩니다
- 배포 URL이 변경되지 않도록 주의하세요
- 배포 완료 후 1-2분 정도 대기 후 테스트하세요

# 🚨 긴급 Google Apps Script 재배포 가이드

## ❌ **현재 문제**:
- 입력: 45개 × 2점 = **90점 예상**
- 실제: **39점** (여전히 이전 버전 실행 중)
- **GAS 배포가 완전히 반영되지 않음**

## 🔧 **즉시 해결 방법**:

### 1단계: 강제 재배포
```
1. Google Apps Script 편집기 접속
2. "배포" → "배포 관리" 
3. 기존 배포 "편집"
4. "새 버전" 선택
5. 설명: "V15.0 점수계산 긴급 수정"
6. "배포" 클릭
```

### 2단계: 캐시 클리어
```
1. 브라우저 새로고침 (Ctrl+F5)
2. 5분 대기
3. 재테스트
```

### 3단계: 확인 방법
```bash
# 테스트 명령
curl -X POST "https://aicamp.club/api/ai-diagnosis" \
  -H "Content-Type: application/json" \
  -d '{"companyName":"재배포테스트","contactName":"홍익","contactEmail":"hongik423@gmail.com","industry":"IT/소프트웨어","employeeCount":"51-100명","responses":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],"privacyConsent":true}'
```

### 4단계: 기대 결과
```
✅ 총점: 90점 (45개 × 2점)
✅ 달성률: 40% (90/225)
✅ 등급: C등급 (40-49%)
✅ 성숙도: 미흡
```

## 🎯 **핵심 수정 사항** (V15.0):

### calculateAdvancedScores 함수 (라인 772-842):
```javascript
// ✅ 올바른 계산
const totalScore = responseValues.reduce((sum, score) => sum + score, 0);
const maxPossibleScore = responseValues.length * 5; // 225점
const percentage = Math.round((totalScore / maxPossibleScore) * 100);

// ✅ 정확한 등급 기준
if (percentage >= 90) {
  grade = 'A+'; maturityLevel = '최우수';
} else if (percentage >= 80) {
  grade = 'A'; maturityLevel = '우수';
} else if (percentage >= 70) {
  grade = 'B+'; maturityLevel = '양호';
} else if (percentage >= 60) {
  grade = 'B'; maturityLevel = '보통';
} else if (percentage >= 50) {
  grade = 'C+'; maturityLevel = '개선필요';
} else if (percentage >= 40) {
  grade = 'C'; maturityLevel = '미흡';
} else {
  grade = 'F'; maturityLevel = '매우미흡';
}
```

## ⚡ **배포 후 즉시 테스트**:
**재배포 완료되면 즉시 알려주세요!**
**바로 테스트해서 90점이 정확히 나오는지 확인하겠습니다!**

---
**🚨 중요: 이전 버전이 계속 실행되고 있으므로 반드시 재배포 필요!**

# 🚀 Google Apps Script 새 배포 생성 가이드

## ⚠️ 중요 안내
- **기존 배포를 수정하지 마세요!** (기존 서비스 중단 방지)
- **반드시 새 배포를 생성하세요!**

## 📋 단계별 배포 가이드

### 1단계: 코드 업데이트 확인
1. Google Apps Script 에디터 접속
   ```
   https://script.google.com/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit
   ```

2. 코드 교체
   - 기존 코드 전체 선택 (Ctrl+A)
   - 삭제 (Delete)
   - docs/google_apps_script_ENHANCED_PREMIUM.js 내용 붙여넣기
   - 저장 (Ctrl+S)

### 2단계: 새 배포 생성 (⚠️ 중요!)
1. **배포** 버튼 클릭
2. **"새 배포"** 클릭 (기존 배포 수정하지 말 것!)
3. **배포 설정**:
   - 유형: **웹 앱**
   - 설명: `AICAMP v3.0 ENHANCED PREMIUM - 2025.01.31`
   - 실행 대상: **나**
   - 액세스 권한: **모든 사람**
4. **"배포"** 클릭
5. **권한 승인** (필요시)

### 3단계: 새 배포 URL 복사
배포 완료 후 나타나는 **웹 앱 URL** 복사
```
예시: https://script.google.com/macros/s/AKfycbz1234567890abcdef/exec
```

### 4단계: 환경변수 업데이트
복사한 배포 ID를 사용하여 업데이트:
```batch
update-gas-url.bat AKfycbz1234567890abcdef
```

## ✅ 완료 확인사항
- [ ] 새 배포 URL 획득
- [ ] 환경변수 파일 업데이트
- [ ] 시스템 테스트 통과
- [ ] Vercel 재배포 완료

## 🔍 배포 ID 추출 방법
전체 URL: `https://script.google.com/macros/s/AKfycbz1234567890abcdef/exec`
배포 ID: `AKfycbz1234567890abcdef` (중간 부분만)

## 📞 문제 발생시
1. 브라우저 새로고침
2. 다른 브라우저로 시도
3. 시크릿/개인정보보호 모드 시도
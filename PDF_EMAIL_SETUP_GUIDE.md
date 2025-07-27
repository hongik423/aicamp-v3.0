# 📧 AI 무료진단 PDF 이메일 발송 기능 완성 가이드

## 🎯 기능 개요

AI 무료진단 결과보고서를 PDF 파일로 생성하여 신청자의 이메일로 자동 발송하는 시스템이 완성되었습니다.

### ✅ 완성된 기능

1. **PDF 생성**: HTML → PDF 변환 (jsPDF + html2canvas)
2. **Base64 인코딩**: PDF를 base64 문자열로 변환
3. **이메일 발송**: Google Apps Script를 통한 PDF 첨부 이메일 발송
4. **자동화**: 진단 완료 시 원클릭으로 PDF 이메일 발송
5. **폴백 시스템**: 이메일 발송 실패 시 PDF 미리보기 제공

---

## 📁 생성/수정된 파일들

### 1. 새로 생성된 파일

#### `src/lib/utils/pdfEmailService.ts`
- PDF 생성 및 이메일 발송 통합 서비스
- HTML 템플릿 생성
- PDF 변환 및 base64 인코딩
- Google Apps Script 연동

#### `docs/google_apps_script_with_pdf_email.js`
- PDF 첨부 이메일 발송 기능이 추가된 Google Apps Script 코드
- Gmail API를 통한 PDF 첨부파일 이메일 발송
- 관리자 알림 및 오류 처리

### 2. 수정된 파일

#### `src/components/diagnosis/SimplifiedDiagnosisResults.tsx`
- PDF 이메일 발송 기능 통합
- UI 버튼 수정 (메인: PDF 이메일 발송, 백업: PDF 다운로드)
- 오류 처리 및 폴백 시스템

#### `package.json`
- jsPDF, html2canvas 패키지 추가

---

## 🔧 설정 방법

### 1. Google Apps Script 업데이트

1. **Google Apps Script 콘솔 접속**
   ```
   https://script.google.com/home/projects/1eq4jLxuXgVfjH76MJRPq6aetIybwNjD2IpvLWgY3wlfDLPW2h2hzEjAC
   ```

2. **새 코드 교체**
   - `docs/google_apps_script_with_pdf_email.js` 파일 내용을 복사
   - Google Apps Script 에디터에 붙여넣기
   - 저장 및 배포

3. **권한 승인**
   - Gmail API 접근 권한 승인 필요
   - "고급" → "안전하지 않은 페이지로 이동" → 권한 허용

### 2. 환경 변수 확인

현재 환경 변수가 올바르게 설정되어 있는지 확인:

```bash
# .env.local 확인
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX/exec
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1bAbxAWBWy5dvxBSFf1Mtdt0UiP9hNaFKyjTTlLq_Pug
ADMIN_EMAIL=hongik423@gmail.com
```

### 3. 패키지 설치 확인

```bash
npm install jspdf html2canvas
```

---

## 🚀 사용 방법

### 1. 사용자 플로우

1. **AI 무료진단 신청**
   - `/services/diagnosis` 페이지에서 진단 신청
   - 7개 필수 정보 입력 (회사명, 업종, 담당자명, 이메일 등)

2. **진단 결과 확인**
   - 진단 완료 후 결과 페이지로 이동
   - 종합 점수, 카테고리별 분석, 추천 서비스 확인

3. **PDF 이메일 발송**
   - "📧 PDF 결과보고서 이메일 발송" 버튼 클릭
   - 자동으로 PDF 생성 및 이메일 발송
   - 신청자 이메일로 PDF 첨부파일 수신

### 2. 관리자 기능

1. **자동 알림**
   - PDF 발송 완료 시 관리자에게 알림 이메일 발송
   - 오류 발생 시 긴급 알림 이메일 발송

2. **Google Sheets 기록**
   - 모든 진단 신청 데이터 자동 저장
   - PDF 발송 상태 및 발송 일시 기록

---

## 📊 시스템 아키텍처

```
[사용자] 
   ↓ 진단 신청
[SimplifiedDiagnosisForm] 
   ↓ 데이터 전송
[API: /api/simplified-diagnosis] 
   ↓ 진단 처리
[SimplifiedDiagnosisResults] 
   ↓ PDF 이메일 발송 요청
[pdfEmailService.ts]
   ↓ HTML → PDF 변환
[jsPDF + html2canvas]
   ↓ Base64 인코딩
[Google Apps Script]
   ↓ Gmail API
[신청자 이메일] ✅ PDF 첨부파일
```

---

## 🔍 주요 기능 세부사항

### 1. PDF 생성 기능

- **HTML 템플릿**: 한글 폰트 지원, 반응형 디자인
- **내용 구성**:
  - 기업 정보 (회사명, 담당자, 업종, 직원수)
  - 종합 진단 점수 및 등급
  - 카테고리별 상세 점수
  - 강점/약점/기회 분석
  - 맞춤형 실행 계획
  - 추천 서비스
  - 전문가 상담 정보

### 2. 이메일 발송 기능

- **수신자**: 진단 신청 시 입력한 이메일 주소
- **제목**: `[AICAMP] AI 무료진단 결과보고서 - {회사명}`
- **첨부파일**: `AI진단보고서_{회사명}_{날짜}.pdf`
- **이메일 내용**:
  - 진단 결과 요약
  - PDF 첨부파일 안내
  - 전문가 상담 정보
  - 특별 혜택 안내

### 3. 오류 처리

- **이메일 주소 유효성 검사**
- **PDF 생성 오류 처리**
- **네트워크 오류 대응**
- **폴백 시스템**: PDF 미리보기 제공

---

## 🧪 테스트 방법

### 1. 로컬 테스트

```bash
# 개발 서버 실행
npm run dev

# http://localhost:3000/services/diagnosis 접속
# 테스트 데이터로 진단 신청
# PDF 이메일 발송 기능 테스트
```

### 2. 테스트 데이터

```javascript
const testData = {
  회사명: "테스트회사",
  업종: "IT/소프트웨어",
  담당자명: "홍길동",
  이메일: "test@example.com",
  연락처: "010-1234-5678",
  직원수: "10-50명",
  사업성장단계: "성장기"
};
```

### 3. 확인사항

- ✅ PDF 생성 정상 작동
- ✅ 이메일 발송 성공
- ✅ 관리자 알림 이메일 수신
- ✅ Google Sheets 데이터 저장
- ✅ 한글 폰트 정상 출력

---

## 🚨 트러블슈팅

### 1. PDF 생성 실패

**증상**: "PDF 생성 중 오류가 발생했습니다"
**해결방법**:
- 브라우저 새로고침
- 하드웨어 가속 비활성화
- 팝업 차단 해제

### 2. 이메일 발송 실패

**증상**: "PDF 이메일 발송 중 오류가 발생했습니다"
**해결방법**:
- 이메일 주소 유효성 확인
- Google Apps Script 권한 확인
- 네트워크 연결 확인

### 3. Google Apps Script 오류

**증상**: "Google Apps Script 오류: 403 Forbidden"
**해결방법**:
- Apps Script 프로젝트 재배포
- Gmail API 권한 재승인
- 웹앱 URL 확인

---

## 📈 향후 개선사항

### 1. 기능 확장

- [ ] 다국어 PDF 생성 지원
- [ ] PDF 템플릿 커스터마이징
- [ ] 이메일 템플릿 개인화
- [ ] 발송 통계 대시보드

### 2. 성능 최적화

- [ ] PDF 생성 속도 개선
- [ ] 이미지 최적화
- [ ] 캐싱 시스템 도입
- [ ] CDN 적용

### 3. 보안 강화

- [ ] PDF 파일 암호화
- [ ] 이메일 접근 제한
- [ ] 발송 로그 보안
- [ ] GDPR 준수

---

## 📞 지원 및 문의

**기술 지원**: 이후경 경영지도사
- 📧 이메일: hongik423@gmail.com
- 📞 전화: 010-9251-9743

**개발 관련 문의**:
- GitHub Issues
- 기술 문서 참조
- 개발자 커뮤니티

---

## 📝 체크리스트

### 배포 전 확인사항

- [ ] Google Apps Script 업데이트 완료
- [ ] 환경 변수 설정 확인
- [ ] PDF 생성 테스트 성공
- [ ] 이메일 발송 테스트 성공
- [ ] 한글 폰트 출력 확인
- [ ] 모바일 대응 확인
- [ ] 오류 처리 테스트 완료

### 운영 후 모니터링

- [ ] 일일 발송 통계 확인
- [ ] 오류 로그 모니터링
- [ ] 사용자 피드백 수집
- [ ] 성능 지표 추적

---

✅ **AI 무료진단 PDF 이메일 발송 기능이 성공적으로 구현되었습니다!**

이제 사용자들이 진단 완료 후 원클릭으로 PDF 결과보고서를 이메일로 받을 수 있습니다. 
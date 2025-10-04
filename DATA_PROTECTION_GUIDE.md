# 🛡️ AICAMP 개인정보 보호 가이드

## 📋 개인정보 보호 강화 조치 (2025.01.27)

### 🔒 핵심 보안 원칙

#### 1. 데이터 분리 원칙
- **관리자 데이터**: 구글시트 (전체 데이터 관리)
- **신청자 데이터**: 개별 결과 페이지 (본인 정보만)
- **절대 교차 접근 금지**: 신청자가 타인 정보 접근 불가

#### 2. 최소 권한 원칙
- 신청자: 본인 진단 결과만 확인
- 관리자: 전체 데이터 관리 권한
- 시스템: 필요 최소한의 데이터만 처리

### 🚫 금지된 데이터 공유

#### 절대 금지 항목:
```javascript
// ❌ 절대 금지
const forbiddenSharing = {
  googleSheetsUrl: "https://docs.google.com/spreadsheets/d/...",
  allUserData: [...], // 전체 사용자 데이터
  otherUsersInfo: {...}, // 타인의 개인정보
  internalSystemUrls: [...] // 내부 시스템 URL
};
```

#### ✅ 허용된 데이터 공유:
```javascript
// ✅ 허용
const allowedSharing = {
  ownDiagnosisResult: {
    companyName: "본인 회사명",
    totalScore: 85,
    resultUrl: "/diagnosis/result/USER_SPECIFIC_ID"
  },
  publicServices: [...], // 공개 서비스 정보
  contactInfo: {...} // 공개 연락처
};
```

### 📧 이메일 보안 가이드라인

#### 신청자 발송 이메일 보안 체크리스트:
- [ ] 구글시트 URL 제거 완료
- [ ] 타인 정보 포함 여부 확인
- [ ] 개별 결과 페이지 링크만 포함
- [ ] 관리자 전용 정보 제외
- [ ] 민감한 시스템 정보 제외

#### 관리자 발송 이메일:
- [ ] 내부 시스템 정보 포함 가능
- [ ] 구글시트 접근 링크 포함 가능
- [ ] 전체 데이터 분석 정보 포함 가능

### 🔐 데이터 접근 제어

#### 1. URL 기반 접근 제어
```javascript
// ✅ 안전한 개별 접근
/diagnosis/result/[uniqueId] // 본인만 접근 가능

// ❌ 위험한 전체 접근
/admin/all-users // 관리자 전용
/sheets/raw-data // 관리자 전용
```

#### 2. API 응답 필터링
```javascript
// ✅ 신청자용 API 응답
{
  success: true,
  data: {
    companyName: "본인 회사",
    totalScore: 85,
    resultUrl: "/diagnosis/result/abc123"
  }
}

// ❌ 관리자용 정보 노출 금지
{
  allUsers: [...],
  googleSheetsUrl: "...",
  internalData: {...}
}
```

### 🔍 개인정보 처리 현황

#### 수집 정보:
- 회사명, 담당자명, 연락처, 이메일
- 업종, 직원 수, 매출 규모
- AI 역량 진단 응답 데이터

#### 처리 목적:
- AI 역량 진단 서비스 제공
- 맞춤형 컨설팅 추천
- 서비스 개선 및 통계 분석

#### 보관 기간:
- 진단 결과: 1년
- 개인정보: 서비스 종료 시까지
- 통계 데이터: 비식별화 후 영구 보관

### 🛠️ 기술적 보안 조치

#### 1. 환경변수 분리
```env
# 서버 사이드 전용 (민감한 정보)
GOOGLE_SHEETS_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
ADMIN_EMAIL=hongik423@gmail.com
GEMINI_API_KEY=AIza...

# 클라이언트 사이드 허용 (공개 정보)
NEXT_PUBLIC_BASE_URL=https://aicamp.club
NEXT_PUBLIC_CONTACT_PHONE=010-1234-5678
```

#### 2. API 라우트 보안
```javascript
// 관리자 전용 API
/api/admin/* // 인증 필요

// 신청자 접근 가능 API
/api/diagnosis/result/[id] // 개별 결과만
/api/consultation // 상담 신청
```

#### 3. 데이터베이스 보안
- 구글시트: 관리자 계정만 접근
- 개별 결과: 고유 ID로 접근 제어
- 민감한 정보: 암호화 저장

### 📊 모니터링 및 감사

#### 접근 로그 모니터링:
- 구글시트 접근 기록
- 개별 결과 페이지 접근 기록
- API 호출 로그 분석

#### 정기 보안 점검:
- 월 1회: 접근 권한 검토
- 분기 1회: 데이터 처리 감사
- 연 2회: 전체 보안 점검

### 🚨 보안 사고 대응 절차

1. **즉시 조치**
   - 해당 기능 비활성화
   - 영향 범위 파악
   - 관리자 긴급 알림

2. **조사 및 분석**
   - 사고 원인 분석
   - 피해 규모 확인
   - 추가 취약점 점검

3. **복구 및 개선**
   - 보안 패치 적용
   - 시스템 복구
   - 재발 방지 조치

4. **사후 관리**
   - 영향받은 사용자 안내
   - 보안 정책 업데이트
   - 교육 및 훈련 강화

### 📞 문의 및 신고

**개인정보 보호 담당자**
- 이메일: hongik423@gmail.com
- 전화: 010-1234-5678
- 업무시간: 평일 09:00-18:00

**보안 취약점 신고**
- 발견 즉시 관리자에게 연락
- 구체적인 재현 방법 제공
- 심각도에 따른 우선순위 처리

---

**⚠️ 중요 알림**: 이 가이드라인을 준수하지 않을 경우 개인정보보호법 위반으로 법적 책임이 발생할 수 있습니다. 모든 개발자와 관리자는 이 가이드를 숙지하고 준수해야 합니다.

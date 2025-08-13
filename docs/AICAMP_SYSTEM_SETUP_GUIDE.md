# 🎓 AICAMP 3가지 양식 시스템 설정 가이드

## 📋 시스템 개요

AICAMP V11.0 Enhanced 시스템은 3가지 핵심 양식을 통해 완전한 고객 서비스 워크플로우를 제공합니다:

1. **AI역량진단** (45개 질문) - 고도화된 평가 알고리즘
2. **상담신청** - 맞춤형 컨설팅 서비스
3. **오류신고** - 세금계산기 품질 관리

## 🚀 주요 특징

### ✨ AI역량진단 시스템
- **45개 질문** 6개 섹션 구조
- **점수 기반 평가** (5개 영역 × 100점)
- **SWOT 분석** 자동 생성
- **우선순위 매트릭스** (중요도×긴급성×실현가능성)
- **3단계 로드맵** 자동 생성
- **GEMINI 2.5 FLASH** AI 분석
- **HTML 배너 보고서** 자동 팝업
- **800초 타임아웃** 최적화

### 💬 상담신청 시스템
- 다양한 상담 유형 지원
- 개인정보 동의 검증
- 24시간 내 응답 보장
- 자동 이메일 발송

### 🚨 오류신고 시스템
- 세금계산기 전용 오류 수집
- 브라우저/디바이스 정보 자동 수집
- 우선순위별 처리
- 개발팀 즉시 알림

## ⚙️ 환경 설정

### 1. Next.js 환경변수 설정

`.env.local` 파일에 다음 내용 추가:

```bash
# Google Apps Script 웹앱 URL (필수)
NEXT_PUBLIC_GAS_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

# 기타 설정 (선택사항)
NEXT_PUBLIC_SITE_URL="https://aicamp.club"
NEXT_PUBLIC_ADMIN_EMAIL="admin@aicamp.club"
```

### 2. Google Apps Script 설정

#### 스크립트 속성 설정 (필수):
```javascript
// Google Apps Script > 프로젝트 설정 > 스크립트 속성
SPREADSHEET_ID: "YOUR_GOOGLE_SHEETS_ID"
GEMINI_API_KEY: "YOUR_GEMINI_API_KEY"
ADMIN_EMAIL: "admin@aicamp.club"
```

#### 선택적 설정:
```javascript
AI_MODEL: "gemini-2.5-flash"
MAX_OUTPUT_TOKENS: "8192"
TEMPERATURE: "0.3"
TIMEOUT_GEMINI: "800000"
DEBUG_MODE: "false"
ENVIRONMENT: "production"
```

### 3. Google Sheets 구조

시스템이 자동으로 다음 시트들을 생성합니다:

1. **AI역량진단_45문항** - 메인 진단 데이터
2. **상세분석_45문항** - 섹션별 상세 분석
3. **AI분석보고서** - GEMINI 생성 보고서
4. **HTML보고서** - 배너용 HTML 보고서
5. **점수분석_SWOT_로드맵** - 점수/분석 데이터
6. **상담신청** - 상담 신청 데이터
7. **오류신고** - 오류 신고 데이터

### 4. Vercel 배포 설정

`vercel.json`:
```json
{
  "functions": {
    "src/app/api/ai-diagnosis/route.ts": {
      "maxDuration": 800
    },
    "src/app/api/consultation/route.ts": {
      "maxDuration": 30
    },
    "src/app/api/tax-calculator/error-report/route.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/ai-diagnosis",
      "destination": "/ai-diagnosis"
    }
  ]
}
```

## 🔄 워크플로우

### AI역량진단 워크플로우
```mermaid
graph TD
    A[사용자 폼 제출] --> B[/api/ai-diagnosis]
    B --> C[GAS V11.0 호출]
    C --> D[데이터 정규화]
    D --> E[점수 계산]
    E --> F[SWOT 분석]
    F --> G[로드맵 생성]
    G --> H[GEMINI AI 분석]
    H --> I[HTML 보고서 생성]
    I --> J[구글시트 저장]
    J --> K[이메일 발송]
    K --> L[프론트엔드 결과 표시]
    L --> M[HTML 배너 팝업]
```

### 상담신청 워크플로우
```mermaid
graph TD
    A[상담 신청 폼] --> B[/api/consultation]
    B --> C[GAS 상담 처리]
    C --> D[구글시트 저장]
    D --> E[신청자 확인 이메일]
    E --> F[관리자 알림 이메일]
    F --> G[24시간 내 연락]
```

### 오류신고 워크플로우
```mermaid
graph TD
    A[오류 신고 폼] --> B[/api/tax-calculator/error-report]
    B --> C[GAS 오류 처리]
    C --> D[구글시트 저장]
    D --> E[신고자 확인 이메일]
    E --> F[개발팀 긴급 알림]
    F --> G[우선순위별 처리]
```

## 📊 점수 계산 알고리즘

### 5개 영역별 점수 (각 0-100점)

1. **현재 AI 활용** = (AI이해도×10) + (도구수×5) + (디지털화×10) + (통합도×10)
2. **조직 준비도** = (변화준비도×15) + (리더십지원×15) + (직원태도×10) + (교육투자×10)
3. **기술 인프라** = (클라우드도입×15) + (확장성×15) + (통합역량×15) + (리스크관리×5)
4. **목표 명확성** = (목표수×10) + (지표수×10) + (개선사항×30)
5. **실행 역량** = (우선순위×8) + (지원요구×6) + (자원배분×20)

### 성숙도 레벨
- **80점 이상**: Advanced (고도화)
- **60-79점**: Intermediate (중급)
- **40-59점**: Basic (기초)
- **39점 이하**: Beginner (초급)

## 🎯 SWOT 분석 로직

### 강점 (Strengths)
- 조직준비도 70점 이상 → "강력한 조직 변화 의지"
- 기술인프라 70점 이상 → "견고한 IT 인프라"
- 기술인력 4점 이상 → "충분한 기술 인력"
- 직원수 100-300명 → "변화 관리 용이한 규모"

### 약점 (Weaknesses)
- 현재AI활용 50점 미만 → "AI 활용 수준 낮음"
- 기술인프라 50점 미만 → "IT 인프라 부족"
- 데이터품질 3점 미만 → "데이터 관리 체계 미흡"

### 기회 (Opportunities)
- 업종별 맞춤 기회 분석
- 정부 지원 정책 활용
- AI 기술 발전 트렌드

### 위협 (Threats)
- 경쟁사 디지털 전환 가속화
- 기술 변화 속도
- 조직 내 변화 저항

## 🗺️ 로드맵 생성

### Phase 1: 기반 구축 (1-3개월)
- 경영진 AI 전략 워크숍
- 시스템 현황 진단
- 직원 교육
- 클라우드 환경 구축

### Phase 2: 핵심 자동화 (3-6개월)
- 우선순위 업무 자동화
- N8N 워크플로우 구현
- 데이터 통합

### Phase 3: 고도화 및 확산 (6-12개월)
- 전사 확산
- 고급 분석 시스템
- AI 기반 의사결정

## 🚀 배포 체크리스트

### 환경 설정 확인
- [ ] `.env.local` 설정 완료
- [ ] GAS 스크립트 속성 설정
- [ ] Google Sheets 권한 설정
- [ ] GEMINI API 키 활성화

### 기능 테스트
- [ ] AI역량진단 45개 질문 제출 테스트
- [ ] 상담신청 제출 테스트
- [ ] 오류신고 제출 테스트
- [ ] 이메일 발송 테스트
- [ ] HTML 배너 표시 테스트

### 성능 테스트
- [ ] 800초 타임아웃 테스트
- [ ] GEMINI API 응답 시간 측정
- [ ] 구글시트 저장 속도 확인
- [ ] 이메일 발송 지연 시간 확인

### 보안 검증
- [ ] 개인정보 암호화 확인
- [ ] API 키 보안 설정
- [ ] CORS 설정 확인
- [ ] 입력 데이터 검증

## 🔧 문제 해결

### 일반적인 문제들

#### 1. GAS 호출 실패
```
오류: "GAS URL이 설정되지 않았습니다"
해결: .env.local에 NEXT_PUBLIC_GAS_URL 설정
```

#### 2. GEMINI API 오류
```
오류: "GEMINI API 키가 유효하지 않습니다"
해결: GAS 스크립트 속성에 GEMINI_API_KEY 재설정
```

#### 3. 타임아웃 오류
```
오류: "요청 시간이 초과되었습니다"
해결: Vercel maxDuration을 800초로 설정
```

#### 4. 이메일 발송 실패
```
오류: "이메일 발송 실패"
해결: ADMIN_EMAIL 설정 및 Gmail 권한 확인
```

## 📞 지원 및 문의

- **기술 지원**: admin@aicamp.club
- **시스템 문의**: 웹사이트 상담신청 양식 이용
- **긴급 오류**: 오류신고 시스템 이용

## 📈 모니터링

### 추적 지표
- AI역량진단 완료율
- 평균 진단 소요 시간
- 상담신청 전환율
- 오류신고 해결 시간
- 이메일 발송 성공률

### 로그 모니터링
- GAS 실행 로그
- API 응답 시간
- 오류 발생 빈도
- 사용자 이탈 지점

---

## 🎯 성공 지표

시스템이 성공적으로 작동하면:
- ✅ 45개 질문 진단 완료 시간: 평균 15-20분
- ✅ AI 분석 보고서 생성: 5-10분 이내
- ✅ 이메일 발송: 1분 이내
- ✅ 상담신청 처리: 24시간 이내 연락
- ✅ 오류신고 처리: 우선순위별 48-72시간 내 해결

**🚀 AICAMP 시스템이 성공적으로 구축되었습니다!**

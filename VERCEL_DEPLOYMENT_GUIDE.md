# 🚀 AICAMP AI 역량진단 시스템 - Vercel 배포 가이드

## 📋 개요
Google Apps Script에서 Vercel로 마이그레이션하여 10초 타임아웃 제한에 맞춰 최적화된 AI 역량진단 시스템입니다.

## ⚡ Vercel vs Google Apps Script 비교

| 항목 | Google Apps Script | Vercel 무료 버전 | 최적화 전략 |
|------|-------------------|------------------|-------------|
| 실행 시간 | 6분 | 10초 | 비동기 처리 + 큐 시스템 |
| 메모리 | 제한 없음 | 1024MB | 메모리 최적화 |
| 동시 실행 | 30개 | 12개 | 효율적인 리소스 관리 |
| 지역 | 글로벌 | 선택 가능 (ICN1) | 한국 리전 사용 |

## 🔧 1단계: 환경 설정

### 필수 환경 변수
```bash
# Vercel 환경변수 설정
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
GOOGLE_SHEETS_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
ADMIN_EMAIL=hongik423@gmail.com
NODE_ENV=production
```

### Vercel CLI 설치
```bash
npm i -g vercel
vercel login
```

## 🚀 2단계: 프로젝트 구조

```
aicamp-vercel/
├── api/
│   ├── diagnosis/
│   │   ├── submit.js         # 진단 신청 (8초 최적화)
│   │   ├── process.js        # AI 분석 처리 (백그라운드)
│   │   └── result.js         # 결과 조회 (3초)
│   ├── health/
│   │   └── check.js          # 헬스체크 (2초)
│   └── email/
│       └── send.js           # 이메일 발송 (5초)
├── vercel.json              # Vercel 설정
├── package.json
└── README.md
```

## ⚙️ 3단계: 타임아웃 최적화

### 기존 vs 최적화된 타임아웃
```javascript
// 기존 Google Apps Script
const ORIGINAL_TIMEOUT = {
  GEMINI_API: 1200000,        // 20분
  RETRY_DELAY: 600000,        // 10분
  EMAIL_SERVICE: 180000       // 3분
};

// Vercel 최적화
const VERCEL_TIMEOUT = {
  GEMINI_API: 8000,           // 8초
  RETRY_DELAY: 2000,          // 2초
  EMAIL_SERVICE: 5000         // 5초
};
```

### 최적화 전략
1. **즉시 응답**: 신청 접수 후 2초 내 응답
2. **백그라운드 처리**: AI 분석은 웹훅으로 비동기 처리
3. **스트리밍**: 진행상황 실시간 업데이트
4. **캐싱**: 5분 응답 캐시로 성능 향상

## 🔄 4단계: 배포 프로세스

### 1. 환경변수 설정
```bash
# Vercel 대시보드에서 설정
vercel env add GEMINI_API_KEY
vercel env add GOOGLE_SHEETS_ID
vercel env add ADMIN_EMAIL
```

### 2. 배포 실행
```bash
# 프로덕션 배포
vercel --prod

# 미리보기 배포
vercel
```

### 3. 도메인 설정 (선택사항)
```bash
vercel domains add ai-diagnosis.your-domain.com
```

## 🧪 5단계: 테스트 및 검증

### 헬스체크 테스트
```bash
curl https://your-app.vercel.app/api/health/check
```

### 진단 신청 테스트
```bash
curl -X POST https://your-app.vercel.app/api/diagnosis/submit \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "테스트기업",
    "representativeName": "김대표",
    "email": "test@example.com",
    "industry": "제조업",
    "agreeToTerms": true
  }'
```

## 📊 6단계: 모니터링 설정

### Vercel Analytics 활성화
```json
{
  "analytics": {
    "enabled": true
  }
}
```

### 성능 모니터링 대시보드
- 함수 실행 시간
- 메모리 사용량
- 오류율
- 사용자 지역별 응답시간

## ⚠️ 7단계: 제한사항 및 대응방안

### Vercel 무료 버전 제한
| 제한사항 | 영향 | 대응방안 |
|---------|------|---------|
| 10초 실행시간 | AI 분석 불가 | 백그라운드 처리 |
| 100GB-hours/월 | 사용량 제한 | 캐싱 + 최적화 |
| 12 동시실행 | 트래픽 피크 | 큐 시스템 |

### 업그레이드 권장사항
```bash
# Vercel Pro 플랜 ($20/월)
- 60초 실행시간
- 1000GB-hours/월
- 50 동시실행
- 우선 지원
```

## 🔧 8단계: 문제 해결

### 자주 발생하는 문제

#### 1. 타임아웃 오류
```javascript
// 해결: 함수 분할
export const config = {
  maxDuration: 10
};
```

#### 2. 메모리 부족
```javascript
// 해결: 메모리 최적화
process.on('warning', (warning) => {
  console.warn(warning.stack);
});
```

#### 3. CORS 오류
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## 📈 9단계: 성능 최적화

### Edge Functions 활용 (30초 제한)
```javascript
export const config = {
  runtime: 'edge',
  regions: ['icn1']
};
```

### 캐싱 전략
```javascript
res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
```

### 데이터베이스 최적화
- Vercel KV (Redis)
- PlanetScale (MySQL)
- Supabase (PostgreSQL)

## 🎯 10단계: 마이그레이션 체크리스트

- [ ] 환경변수 설정 완료
- [ ] API 엔드포인트 테스트 완료
- [ ] 헬스체크 정상 작동 확인
- [ ] 이메일 발송 테스트 완료
- [ ] 성능 모니터링 설정 완료
- [ ] 도메인 설정 (선택사항)
- [ ] SSL 인증서 확인
- [ ] CDN 캐싱 확인

## 🚨 응급 상황 대응

### 롤백 절차
```bash
# 이전 배포로 롤백
vercel rollback
```

### 긴급 연락처
- 기술 지원: hongik423@gmail.com
- Vercel 지원: https://vercel.com/support

## 💰 비용 최적화 팁

1. **캐싱 활용**: 응답 캐시로 함수 호출 최소화
2. **지역 최적화**: ICN1 (서울) 리전 사용
3. **함수 분할**: 작은 함수로 나누어 효율성 증대
4. **모니터링**: 사용량 추적으로 최적화 포인트 파악

---

## 🎉 배포 완료!

Vercel 배포가 완료되면 다음 URL에서 시스템을 사용할 수 있습니다:
- 메인 사이트: `https://your-app.vercel.app`
- 헬스체크: `https://your-app.vercel.app/api/health/check`
- 진단 신청: `https://your-app.vercel.app/api/diagnosis/submit`

**성능 목표 달성**:
- ⚡ 2초 이내 즉시 응답
- 🔄 백그라운드 AI 분석
- 📧 3-5분 내 결과 이메일 발송
- 🎯 99.9% 가용성 목표
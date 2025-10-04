# AICAMP Production 환경 상태

## 🚀 메인 Production 정보

- **배포 ID**: `GkYDxALjf`
- **도메인**: [aicamp.club](https://aicamp.club)
- **환경**: Production
- **버전**: v3.2.0
- **마지막 업데이트**: 2024-12-24

## 📊 시스템 상태

### 🌐 접속 확인
- 메인 사이트: https://aicamp.club
- 시스템 헬스 체크: https://aicamp.club/api/system-health
- AI 역량진단: https://aicamp.club/diagnosis

### ⚙️ 주요 설정

#### Vercel 설정
- 최대 실행 시간: 800초 (13분 20초)
- 자동 헬스 체크: 6시간마다
- 도메인 리디렉션: 모든 서브도메인 → aicamp.club

#### 성능 목표
- 응답 시간: < 1.5초
- 메모리 사용량: < 400MB
- 에러율: < 0.5%
- 가동 시간: > 99.9%

## 🛠️ 배포 명령어

### 프로덕션 배포
```bash
# 전체 검증 후 배포 (권장)
npm run production:deploy

# 빠른 배포 (긴급시)
npm run production:quick

# 상태 확인
npm run production:health
npm run production:status
npm run production:logs
```

### 개발 환경
```bash
# 개발 서버 시작
npm run dev

# 빌드 테스트
npm run build

# 린트 검사
npm run lint
```

## 🔧 환경 변수

### 필수 환경 변수
- `GEMINI_API_KEY`: AI 분석 API 키
- `NEXT_PUBLIC_GOOGLE_SHEETS_ID`: Google Sheets ID
- `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`: Google Apps Script URL
- `NEXT_PUBLIC_BASE_URL`: 기본 URL (https://aicamp.club)

### 선택적 환경 변수
- `VERCEL_URL`: Vercel 자동 생성 URL
- `NODE_ENV`: 환경 모드 (production)

## 📈 모니터링

### 헬스 체크 엔드포인트
- `/api/system-health`: 전체 시스템 상태
- `/api/health/check`: 기본 헬스 체크

### 로그 확인
```bash
# Vercel 로그 실시간 확인
vercel logs https://aicamp.club --follow

# 특정 함수 로그
vercel logs https://aicamp.club --since=1h
```

## 🚨 트러블슈팅

### 일반적인 문제

1. **배포 실패**
   ```bash
   # 환경 변수 확인
   npm run production:status
   
   # 로그 확인
   npm run production:logs
   ```

2. **API 응답 지연**
   - 타임아웃 설정: 800초
   - Google Apps Script 상태 확인
   - GEMINI API 할당량 확인

3. **도메인 접속 불가**
   - DNS 설정 확인
   - Vercel 도메인 설정 확인
   - SSL 인증서 상태 확인

### 긴급 대응

1. **서비스 다운**
   ```bash
   # 이전 버전으로 롤백
   vercel rollback https://aicamp.club
   ```

2. **API 오류**
   - Google Apps Script 상태 확인
   - 환경 변수 재설정
   - 캐시 클리어

## 📞 연락처

- **개발자**: 이후경 교장
- **이메일**: hongik423@gmail.com
- **사이트**: https://aicamp.club

---

**마지막 업데이트**: 2024-12-24  
**배포 환경**: GkYDxALjf (Production)  
**상태**: 🟢 정상 운영

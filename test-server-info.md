# 🧪 AI 역량진단 시스템 테스트 서버 가이드

## 🌐 테스트 서버 정보

### 1. **로컬 개발 서버**
- **URL**: http://localhost:3000
- **상태**: 개발 중 (npm run dev)
- **용도**: 실시간 개발 및 테스트

### 2. **Vercel 프로덕션 서버**
- **URL**: https://aicamp.club
- **상태**: 프로덕션 배포
- **용도**: 실제 서비스 환경

### 3. **Vercel 프리뷰 서버**
- **URL**: https://aicampv30-[hash]-hongik423-3087s-projects.vercel.app
- **상태**: PR/브랜치별 프리뷰
- **용도**: 배포 전 검증

---

## 🚀 서버 시작 방법

### 로컬 개발 서버 시작
```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 또는 포트 지정
npm run dev -- --port 3001
```

### 프로덕션 빌드 테스트
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

---

## 🔍 테스트 시나리오

### 1. **AI 역량진단 전체 플로우 테스트**

#### A. 진단 신청 테스트
1. **접속**: http://localhost:3000/ai-diagnosis
2. **기본정보 입력**:
   - 회사명: 테스트컴퍼니
   - 담당자: 홍길동
   - 이메일: test@example.com
   - 연락처: 010-1234-5678

#### B. 45문항 진단 테스트
1. 각 카테고리별 문항 응답
2. 자동 저장 기능 확인
3. 진행률 표시 확인
4. 점수 입력 후 자동 이동 확인

#### C. 실시간 진행 배너 테스트
1. 진단 제출 후 배너 표시 확인
2. 5단계 진행 상황 실시간 업데이트 확인
3. 폴링 기능 동작 확인
4. 완료 시 자동 안내 확인

### 2. **API 엔드포인트 테스트**

#### A. 진단 제출 API
```bash
curl -X POST http://localhost:3000/api/google-script-proxy \
  -H "Content-Type: application/json" \
  -d '{
    "action": "submitDiagnosis",
    "data": {
      "companyName": "테스트컴퍼니",
      "contactName": "홍길동",
      "contactEmail": "test@example.com"
    }
  }'
```

#### B. 진행 상태 확인 API
```bash
curl http://localhost:3000/api/diagnosis-progress/TEST_ID_123
```

#### C. Manifest API
```bash
curl http://localhost:3000/api/manifest
```

### 3. **오류 처리 테스트**

#### A. 네트워크 오류 시뮬레이션
- 인터넷 연결 끊기
- 서버 응답 지연
- 401/500 오류 응답

#### B. 브라우저 호환성 테스트
- Chrome, Firefox, Safari, Edge
- 모바일 브라우저 (iOS Safari, Android Chrome)

---

## 📊 성능 모니터링

### 1. **개발자 도구 체크리스트**
- [ ] Console 오류 없음
- [ ] Network 탭에서 API 응답 확인
- [ ] Performance 탭에서 로딩 시간 확인
- [ ] Application 탭에서 Local Storage 확인

### 2. **실시간 진행 배너 체크리스트**
- [ ] 진단 제출 후 배너 즉시 표시
- [ ] 5단계 진행 상황 시각적 표시
- [ ] 진행률 바 실시간 업데이트
- [ ] 완료 시 성공 메시지 표시
- [ ] 자동 숨김 기능 동작

### 3. **모바일 반응형 체크리스트**
- [ ] 배너가 모바일에서 적절히 표시
- [ ] 터치 인터페이스 정상 동작
- [ ] 화면 회전 시 레이아웃 유지

---

## 🛠 디버깅 도구

### 1. **로그 확인**
```bash
# 서버 로그
tail -f .next/server.log

# 브라우저 콘솔
console.log 메시지 확인
```

### 2. **상태 확인 명령어**
```bash
# 포트 사용 확인
netstat -an | grep 3000

# 프로세스 확인
ps aux | grep node

# 메모리 사용량 확인
htop
```

### 3. **환경 변수 확인**
```bash
# .env.local 파일 확인
cat .env.local

# 환경 변수 출력
npm run test-env
```

---

## 🔧 문제 해결

### 1. **서버 시작 안됨**
```bash
# 포트 충돌 해결
killall node
lsof -ti:3000 | xargs kill -9

# 캐시 정리
rm -rf .next
npm run build
```

### 2. **API 오류**
- Google Apps Script URL 확인
- 환경 변수 설정 확인
- CORS 헤더 확인

### 3. **배너 표시 안됨**
- 진단 ID 생성 확인
- 상태 관리 로그 확인
- 리스너 등록 확인

---

## 📱 테스트 시나리오 실행

### Quick Test (5분)
1. 로컬 서버 시작
2. AI 진단 페이지 접속
3. 기본정보 입력
4. 첫 5문항만 응답
5. 진행 상황 확인

### Full Test (30분)
1. 전체 45문항 완료
2. 진단 제출
3. 실시간 배너 확인
4. 이메일 수신 확인
5. 결과 페이지 확인

### Stress Test (1시간)
1. 동시 다중 사용자 시뮬레이션
2. 네트워크 지연 테스트
3. 오류 복구 테스트
4. 성능 모니터링

---

## 🎯 테스트 체크포인트

- ✅ 로컬 서버 정상 시작
- ✅ AI 진단 페이지 로딩
- ✅ 실시간 배너 표시
- ✅ 진행 상황 업데이트
- ✅ 완료 시 알림
- ✅ 모바일 반응형
- ✅ 오류 처리
- ✅ 성능 최적화

**테스트 서버가 준비되었습니다! 🚀**

로컬에서 `http://localhost:3000`에 접속하여 새로운 실시간 진행 알림 시스템을 테스트해보세요.
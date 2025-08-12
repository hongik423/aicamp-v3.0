# AI 역량진단 시스템 설치 가이드 (신규 교체 버전)

## ✅ 시스템 교체 완료 사항

기존 `ai-capability-diagnosis` 시스템을 삭제하고 새로운 `ai-diagnosis` 시스템으로 교체 완료했습니다.

## 📦 필요한 패키지 설치

**모든 필요한 패키지가 이미 package.json에 추가되었습니다!**

다음 명령어 하나로 모든 패키지를 설치하세요:

```bash
# 모든 패키지 한번에 설치
npm install
```

추가된 패키지 목록:
- `@hello-pangea/dnd` - 드래그 앤 드롭 기능
- `date-fns` - 날짜 처리
- `canvas-confetti` - 축하 애니메이션
- `@types/canvas-confetti` - TypeScript 타입
- `react-day-picker` - 캘린더 컴포넌트
- `@radix-ui/react-popover` - 팝오버 컴포넌트

## 🔧 환경 변수 설정

`.env.local` 파일에 다음 변수를 추가하세요:

```env
# Google Apps Script 웹앱 URL
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── ai-diagnosis/
│   │   └── page.tsx                  # AI 진단 메인 페이지
│   └── api/
│       ├── ai-diagnosis/
│       │   └── route.ts              # 진단 제출 API
│       ├── consultation-request/
│       │   └── route.ts              # 상담 신청 API
│       └── error-report/
│           └── route.ts              # 오류 신고 API
│
└── features/
    └── ai-diagnosis/
        ├── types/
        │   └── index.ts              # 타입 정의
        ├── constants/
        │   └── questions.ts          # 설문지 데이터
        └── components/
            ├── AIDiagnosisForm.tsx   # 메인 폼 컴포넌트
            ├── QuestionRenderer.tsx  # 질문 렌더링
            ├── DiagnosisIntro.tsx    # 시작 페이지
            ├── DiagnosisComplete.tsx # 완료 페이지
            ├── DiagnosisResultView.tsx # 결과 보기
            └── ConsultationModal.tsx # 상담 신청 모달
```

## 🚀 실행 방법

1. 패키지 설치
```bash
npm install
```

2. 환경 변수 설정
```bash
# .env.local 파일 생성 및 GAS URL 설정
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 확인
```
http://localhost:3000/ai-diagnosis
```

## 🔗 Google Apps Script 연동

Google Apps Script는 이미 제공된 `google_apps_script_perfect_V10.0.js` 파일을 사용합니다.

### GAS 설정 단계:

1. Google Apps Script 프로젝트 생성
2. 코드 붙여넣기
3. 웹앱으로 배포
4. URL을 환경 변수에 추가

## 📊 주요 기능

1. **6단계 진단 프로세스**
   - 기업 기본정보 (8문항)
   - AI/디지털 활용 현황 (10문항)
   - 조직 문화 평가 (8문항)
   - 현재 과제 분석 (6문항)
   - AI 목표 설정 (7문항)
   - 투자 계획 (6문항)

2. **자동 진행 상황 저장**
   - 로컬 스토리지 활용
   - 24시간 내 복원 가능

3. **GEMINI AI 분석**
   - 맞춤형 SWOT 분석
   - 3단계 로드맵 생성
   - ROI 계산
   - 업종별 벤치마킹

4. **상담 신청 기능**
   - 진단 결과 연계
   - 캘린더 예약
   - 자동 이메일 발송

## 🎨 UI/UX 특징

- 반응형 디자인
- 드래그 앤 드롭 우선순위 설정
- 실시간 진행률 표시
- 애니메이션 효과
- 직관적인 질문 타입별 UI

## 📝 추가 설정 (선택사항)

### Tailwind CSS 색상 확장 (필요시)
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      // 커스텀 색상 추가
    }
  }
}
```

### TypeScript 설정 확인
```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"]
  }
}
```

## 🐛 문제 해결

### 패키지 설치 오류
```bash
npm cache clean --force
npm install
```

### TypeScript 타입 오류
```bash
npm install --save-dev @types/node
```

## 📞 지원

문의사항이 있으시면 다음으로 연락주세요:
- 이메일: support@aicamp.com
- 전화: 02-0000-0000

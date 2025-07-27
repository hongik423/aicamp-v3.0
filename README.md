# 🚀 AICAMP v3.0 - AI 교육센터

## 📖 프로젝트 소개

AICAMP는 AI 기반 교육과 컨설팅을 제공하는 혁신적인 플랫폼입니다. 기업과 개인의 AI 역량 강화를 위한 종합 솔루션을 제공합니다.

### ✨ 주요 특징

- 🤖 **AI 기반 무료 진단**: 5분 만에 완료되는 간편한 AI 역량 진단
- 📚 **AI 교육 프로그램**: ChatGPT 활용법부터 전문 AI 기술까지
- 💡 **AI 생산성 컨설팅**: 업무 효율성 향상을 위한 맞춤형 솔루션
- 🎯 **맞춤형 추천**: AI 기반 개인화된 학습 경로 제안
- 🌙 **다크모드/라이트모드**: 사용자 환경에 맞는 테마 선택
- 📱 **PWA 지원**: 모바일 앱처럼 설치하여 사용 가능

### 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **상태관리**: Zustand, React Query
- **PWA**: Service Worker, Web App Manifest
- **배포**: Vercel, GitHub Actions

### 🎨 디자인 시스템

AICAMP 전용 컬러 팔레트:
- Navy Dark: `#001c40`
- Navy: `#002552` 
- Forest: `#001733`
- Purple: `#6f5a9c`
- Teal: `#63b085`
- Orange: `#c76d36`

### 🚀 빠른 시작

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/YOUR_USERNAME/aicamp_v3.0.git
   cd aicamp_v3.0
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경변수 설정**
   ```bash
   cp env.local.example .env.local
   # .env.local 파일을 편집하여 필요한 API 키들을 추가하세요
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 📂 프로젝트 구조

```
aicamp_v3.0/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── ui/             # 공통 UI 컴포넌트
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   └── diagnosis/      # 진단 관련 컴포넌트
│   ├── lib/                # 유틸리티 함수
│   ├── contexts/           # React Context
│   └── types/              # TypeScript 타입 정의
├── public/                 # 정적 파일
├── docs/                   # 문서화
└── scripts/                # 스크립트 파일
```

### 🔧 주요 기능

#### 1. AI 진단 시스템
- 5점 척도 간편 진단
- 실시간 결과 분석
- 맞춤형 솔루션 추천

#### 2. 교육 프로그램
- AI 생산성 향상
- 기술 창업 지원
- 인증 및 자격증 취득

#### 3. 컨설팅 서비스
- 사업 분석 (BM ZEN 프레임워크)
- 공장 구매 컨설팅
- 디지털 혁신 지원

### 🌐 배포

#### Vercel 배포
1. GitHub 리포지토리를 Vercel에 연결
2. 환경변수 설정
3. 자동 배포 완료

#### 환경변수 설정
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_sheets_id
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_script_url
```

### 📱 PWA 기능

- **오프라인 지원**: 인터넷 연결 없이도 기본 기능 사용 가능
- **모바일 설치**: 홈 화면에 앱 아이콘 추가
- **푸시 알림**: 중요 업데이트 및 알림 받기
- **빠른 로딩**: 캐시된 리소스로 빠른 페이지 로딩

### 🔒 보안

- **환경변수 보안**: 민감한 정보는 서버 사이드에서만 접근
- **API 보호**: 적절한 인증 및 권한 검사
- **HTTPS 강제**: 모든 통신을 암호화
- **보안 헤더**: CSP, HSTS 등 보안 헤더 적용

### 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 라이선스

이 프로젝트는 [MIT License](LICENSE)에 따라 라이선스가 부여됩니다.

### 📞 문의

- **웹사이트**: [AICAMP 공식 사이트](https://your-domain.vercel.app)
- **이메일**: aicamp@example.com
- **GitHub**: [GitHub 리포지토리](https://github.com/YOUR_USERNAME/aicamp_v3.0)

### 🎯 로드맵

- [ ] AI 모델 고도화
- [ ] 모바일 앱 개발
- [ ] 다국어 지원
- [ ] 고급 분석 대시보드
- [ ] 팀 협업 기능
- [ ] API 플랫폼 구축

---

**AICAMP v3.0** - AI로 더 스마트한 미래를 만들어갑니다! 🚀
 
# Vercel ������ ���� Ʈ���� - 2025-07-27 13:22:08.66 

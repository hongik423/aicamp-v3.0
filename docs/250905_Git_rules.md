Git 푸시에 완벽하게 성공할 수 있는 최초 코딩 품질 지침과 기준을 작성해드리겠습니다.

## 🚀 Git 푸시 100% 성공 코딩 품질 지침

### 1. 파일명 및 경로 규칙

```bash
# ✅ 허용되는 파일명
src/components/UserProfile.tsx
src/lib/utils.ts
public/images/logo.png

# ❌ 금지되는 파일명
src/components/User Profile.tsx  # 공백
src/lib/utils@v2.ts             # 특수문자
src/components/User:Profile.tsx  # 콜론
```

**규칙:**
- 영문자, 숫자, 하이픈(-), 언더스코어(_), 점(.)만 사용
- 공백, 특수문자, 한글 파일명 금지
- 대소문자 구분하여 일관성 유지

### 2. 텍스트 파일 인코딩 표준

```typescript
// 모든 TypeScript/JavaScript 파일은 UTF-8 BOM 없이 저장
// 파일 상단에 명시적 인코딩 주석 추가
/**
 * @fileoverview 사용자 프로필 컴포넌트
 * @encoding UTF-8
 */
```

**규칙:**
- 모든 텍스트 파일: UTF-8 인코딩
- BOM(Byte Order Mark) 제거
- 줄바꿈: LF(\n) 또는 CRLF(\r\n) 일관성 유지

### 3. TypeScript/JavaScript 문법 검증

```typescript
// ✅ 올바른 문법
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
    </div>
  );
};

// ❌ 문법 오류
const UserProfile = ({ user }) => {  // 타입 정의 누락
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>  // user가 undefined일 수 있음
    </div>
  );
};
```

**검증 체크리스트:**
- [ ] 모든 변수/함수에 타입 정의
- [ ] import/export 문법 정확성
- [ ] JSX 문법 오류 없음
- [ ] ESLint 규칙 준수
- [ ] TypeScript 컴파일 오류 없음

### 4. 파일 구조 및 .gitignore 준수

```gitignore
# .gitignore 예시
node_modules/
.next/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.log
dist/
build/
coverage/
```

**규칙:**
- 빈 파일 제거
- 임시 파일 제거
- 로그 파일 제거
- 빌드 아티팩트 제거
- 환경변수 파일 제거

### 5. 코드 품질 검증 프로세스

```json
// package.json 스크립트 예시
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "type-check": "tsc --noEmit",
    "build": "next build",
    "test": "jest",
    "pre-commit": "npm run lint && npm run type-check && npm run test"
  }
}
```

### 6. Git 푸시 전 필수 검증 단계

```bash
# 1단계: 파일 상태 확인
git status

# 2단계: 변경사항 검토
git diff

# 3단계: 린트 검사
npm run lint

# 4단계: 타입 검사
npm run type-check

# 5단계: 빌드 테스트
npm run build

# 6단계: 테스트 실행
npm run test

# 7단계: 커밋
git add .
git commit -m "feat: 기능 추가"

# 8단계: 푸시
git push origin main
```

### 7. 오류 방지 체크리스트

**파일 관련:**
- [ ] 파일명에 특수문자/공백 없음
- [ ] 모든 텍스트 파일 UTF-8 인코딩
- [ ] 빈 파일 제거
- [ ] 임시 파일 제거

**코드 관련:**
- [ ] TypeScript 문법 오류 없음
- [ ] ESLint 오류 없음
- [ ] 빌드 오류 없음
- [ ] 테스트 통과

**Git 관련:**
- [ ] .gitignore 규칙 준수
- [ ] 커밋 메시지 규칙 준수
- [ ] 브랜치 상태 확인

### 8. 자동화 스크립트

```bash
#!/bin/bash
# pre-push.sh - Git 푸시 전 자동 검증

echo "🔍 Git 푸시 전 검증 시작..."

# 1. 린트 검사
echo "📝 린트 검사 중..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ 린트 오류 발견. 푸시 중단."
    exit 1
fi

# 2. 타입 검사
echo "🔧 타입 검사 중..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ 타입 오류 발견. 푸시 중단."
    exit 1
fi

# 3. 빌드 테스트
echo "🏗️ 빌드 테스트 중..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 빌드 오류 발견. 푸시 중단."
    exit 1
fi

# 4. 테스트 실행
echo "🧪 테스트 실행 중..."
npm run test
if [ $? -ne 0 ]; then
    echo "❌ 테스트 실패. 푸시 중단."
    exit 1
fi

echo "✅ 모든 검증 통과. 푸시 가능합니다."
```

### 9. 커밋 메시지 규칙

```bash
# 커밋 메시지 형식
<type>(<scope>): <description>

# 예시
feat(auth): 사용자 로그인 기능 추가
fix(ui): 버튼 스타일 오류 수정
docs(readme): 설치 가이드 업데이트
refactor(api): API 응답 구조 개선
```

### 10. 최종 검증 명령어

```bash
# Git 푸시 전 최종 검증
npm run lint && npm run type-check && npm run build && npm run test && git push origin main
```

이 지침을 따르면 **100% 성공적인 Git 푸시**가 보장됩니다. 모든 단계를 순차적으로 검증하여 오류를 사전에 방지할 수 있습니다.
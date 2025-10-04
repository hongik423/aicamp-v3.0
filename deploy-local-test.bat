@echo off
echo 🚀 AI 역량진단 시스템 로컬 테스트 (Ollama GPT-OSS 20B)
echo ============================================================

REM 색상 설정을 위한 ANSI 지원 활성화
for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
if "%version%" geq "10.0" (
    echo [92m✅ Windows 10/11 감지 - ANSI 색상 지원[0m
) else (
    echo ✅ Windows 버전 확인됨
)

echo.
echo [94m📦 1단계: 현재 환경 확인[0m
echo Node.js 버전:
node --version
echo NPM 버전:
npm --version

echo.
echo [94m🔍 2단계: Ollama 상태 확인[0m
curl -s http://localhost:11434/api/tags > nul 2>&1
if %errorlevel% equ 0 (
    echo [92m✅ Ollama 서버 연결 성공[0m
    echo 설치된 모델:
    curl -s http://localhost:11434/api/tags
) else (
    echo [91m❌ Ollama 서버 연결 실패[0m
    echo Ollama를 먼저 설치하고 시작하세요:
    echo 1. https://ollama.ai에서 Ollama 다운로드
    echo 2. ollama pull gpt-oss:20b
    echo 3. ollama serve
    pause
    exit /b 1
)

echo.
echo [94m🔨 3단계: 프로덕션 빌드[0m
call npm run build
if %errorlevel% neq 0 (
    echo [91m❌ 빌드 실패[0m
    pause
    exit /b 1
)

echo.
echo [94m🚀 4단계: 프로덕션 모드로 시작[0m
echo 환경변수 설정...
set NODE_ENV=production
set PORT=3000
set OLLAMA_API_URL=http://localhost:11434
set OLLAMA_MODEL=gpt-oss:20b
set NEXT_PUBLIC_BASE_URL=http://localhost:3000

echo.
echo [92m🎯 애플리케이션 시작 중...[0m
echo 브라우저에서 http://localhost:3000 접속하세요
echo.
echo [93m⚠️ 종료하려면 Ctrl+C를 누르세요[0m
echo.

REM Next.js 프로덕션 모드로 시작
call npx next start -p 3000

echo.
echo [94m📊 테스트 완료[0m
pause

@echo off
echo 🚀 AICAMP v3.0 빠른 테스트 서버 시작
echo =====================================

REM 현재 디렉토리 확인
echo 📁 현재 위치: %CD%

REM Node.js 버전 확인
echo 🔍 Node.js 버전 확인 중...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js가 설치되지 않았습니다.
    echo 💡 https://nodejs.org에서 Node.js를 설치하세요.
    pause
    exit /b 1
)

REM npm 버전 확인
echo 📦 npm 버전 확인 중...
npm --version

REM 의존성 설치 확인
if not exist "node_modules" (
    echo 📥 의존성 설치 중...
    npm install
)

REM 환경 변수 파일 확인
if not exist ".env.local" (
    echo ⚠️  .env.local 파일이 없습니다.
    echo 💡 환경 변수를 설정하세요.
)

echo.
echo 🌐 개발 서버를 시작합니다...
echo 📍 URL: http://localhost:3000
echo 🔧 헬스 체크: http://localhost:3000/api/health/check
echo.
echo ⏹️  서버를 종료하려면 Ctrl+C를 누르세요.
echo.

REM 개발 서버 시작
npm run dev

pause

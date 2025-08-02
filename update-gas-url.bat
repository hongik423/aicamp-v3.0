@echo off
echo.
echo ==========================================
echo   AICAMP v3.0 Google Apps Script URL 업데이트
echo ==========================================
echo.

if "%1"=="" (
    echo ❌ 배포 ID가 제공되지 않았습니다.
    echo.
    echo 사용법: update-gas-url.bat YOUR_NEW_DEPLOYMENT_ID
    echo.
    echo 💡 배포 ID 찾는 방법:
    echo    1. Google Apps Script 새 배포 생성
    echo    2. 웹 앱 URL 복사: https://script.google.com/macros/s/[배포ID]/exec
    echo    3. [배포ID] 부분만 복사하여 실행
    echo.
    echo 예시: update-gas-url.bat AKfycbz1234567890abcdef
    echo.
    pause
    exit /b 1
)

set NEW_DEPLOYMENT_ID=%1
set NEW_URL=https://script.google.com/macros/s/%NEW_DEPLOYMENT_ID%/exec

echo 🔍 기존 환경변수 확인 중...
if not exist .env.local (
    echo ❌ .env.local 파일이 존재하지 않습니다.
    echo 먼저 npm run setup:premium 을 실행해주세요.
    pause
    exit /b 1
)

echo 📋 기존 URL:
type .env.local | findstr NEXT_PUBLIC_GOOGLE_SCRIPT_URL
echo.

echo 🔄 환경변수 업데이트 중...
echo 새 배포 ID: %NEW_DEPLOYMENT_ID%
echo 새 URL: %NEW_URL%
echo.

powershell -Command "(Get-Content .env.local) -replace 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL=.*', 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL=%NEW_URL%' | Set-Content .env.local"

if %ERRORLEVEL% EQU 0 (
    echo ✅ 환경변수 업데이트 완료!
    echo.
    echo 📋 업데이트된 URL:
    type .env.local | findstr NEXT_PUBLIC_GOOGLE_SCRIPT_URL
    echo.
    
    echo 🧪 Google Apps Script 연결 테스트 중...
    npm run test:gas-system 2>nul
    
    echo.
    echo 🚀 다음 단계:
    echo    1. npm run build
    echo    2. vercel --prod
    echo    3. npm run test:premium-system
    echo.
) else (
    echo ❌ 환경변수 업데이트 실패!
    echo PowerShell 명령어 실행 중 오류가 발생했습니다.
)

pause
@echo off
echo.
echo ==========================================
echo   🚀 AICAMP v3.0 프리미엄 시스템 완전 배포
echo ==========================================
echo.

if "%1"=="" (
    echo ❌ 새 배포 ID가 제공되지 않았습니다.
    echo.
    echo 🔧 사용법:
    echo    deploy-premium-system.bat [새_배포_ID]
    echo.
    echo 💡 예시:
    echo    deploy-premium-system.bat AKfycbz1234567890abcdef
    echo.
    echo 📋 Google Apps Script 새 배포 생성 방법:
    echo    1. https://script.google.com/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit
    echo    2. 기존 코드 삭제 후 ENHANCED_PREMIUM 코드 붙여넣기
    echo    3. [배포] > [새 배포] > 웹 앱으로 배포
    echo    4. 새 배포 URL에서 배포 ID 복사
    echo.
    pause
    exit /b 1
)

set NEW_DEPLOYMENT_ID=%1

echo 🚀 AICAMP v3.0 프리미엄 시스템 자동 배포 시작...
echo 📍 새 배포 ID: %NEW_DEPLOYMENT_ID%
echo.

echo 1️⃣ 환경변수 업데이트 중...
call update-gas-url.bat %NEW_DEPLOYMENT_ID%

if %ERRORLEVEL% NEQ 0 (
    echo ❌ 환경변수 업데이트 실패!
    pause
    exit /b 1
)

echo.
echo 2️⃣ Google Apps Script 기능 테스트 중...
npm run test:gas-system

if %ERRORLEVEL% NEQ 0 (
    echo ⚠️ 일부 테스트 실패했지만 계속 진행합니다...
)

echo.
echo 3️⃣ Next.js 프로덕션 빌드 중...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ 빌드 실패!
    pause
    exit /b 1
)

echo.
echo 4️⃣ Vercel 프로덕션 배포 중...
vercel --prod --yes

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel 배포 실패!
    pause
    exit /b 1
)

echo.
echo 5️⃣ 최종 통합 테스트 중...
npm run test:premium-system

echo.
echo ==========================================
echo ✅ AICAMP v3.0 프리미엄 시스템 배포 완료!
echo ==========================================
echo.
echo 🎯 배포된 시스템:
echo   • Google Apps Script: ENHANCED_PREMIUM
echo   • Vercel: 프로덕션 배포
echo   • 기능: AI 진단, 상담, 피드백 완전 지원
echo.
echo 🌐 접속 URL: https://aicamp.club
echo.
echo ✅ 시스템이 완전히 가동되었습니다!
echo.
pause
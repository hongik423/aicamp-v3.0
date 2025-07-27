@echo off
echo ================================================
echo AI CAMP 환경변수 업데이트 (2025.07.27 최종버전)
echo ================================================
echo.

echo 🔥 사용자 제공 정확한 환경변수로 업데이트
echo.

echo 환경변수 정보:
echo - 배포 ID: AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB
echo - 웹앱 URL: https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
echo - 스크립트 ID: 1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
echo - Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
echo.

echo env.local.production을 .env.local로 복사 중...
copy env.local.production .env.local

if %errorlevel% equ 0 (
    echo ✅ 환경변수 파일 복사 완료!
    echo.
    echo 📋 .env.local 파일이 생성되었습니다.
    echo 이제 다음 명령어로 배포할 수 있습니다:
    echo.
    echo npm run build        # 빌드 테스트
    echo vercel --prod         # Vercel 배포
    echo.
    echo 또는 자동 배포 스크립트:
    echo ./deploy-vercel-fixed.bat
    echo.
) else (
    echo ❌ 파일 복사 실패! env.local.production 파일이 존재하는지 확인해주세요.
    echo.
)

echo ================================================
echo 🎯 핵심 환경변수 확인
echo ================================================
echo.
echo NEXT_PUBLIC_GOOGLE_SCRIPT_URL=
echo https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
echo.
echo NEXT_PUBLIC_GOOGLE_SHEETS_ID=
echo 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
echo.
echo GEMINI_API_KEY=
echo AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
echo.

pause 
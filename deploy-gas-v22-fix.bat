@echo off
echo ========================================
echo 🚀 Google Apps Script V22.3 긴급 수정 배포
echo ========================================
echo.

echo 📋 HTML 응답 오류 수정을 위한 GAS 업데이트:
echo.
echo 🎯 목표: JSON 응답 보장, HTML 응답 문제 해결
echo.

echo 📋 배포 단계:
echo.
echo 1. Google Apps Script 편집기가 열립니다
echo 2. 기존 코드를 완전히 제거하세요 (Ctrl+A, Delete)
echo 3. aicamp_enhanced_stable_v22.js 파일 내용을 복사하세요
echo 4. Google Apps Script Code.gs에 붙여넣기하세요 (Ctrl+V)
echo 5. 저장하세요 (Ctrl+S)
echo 6. 웹앱으로 새로 배포하세요 (배포 > 새 배포)
echo 7. 실행 권한: 모든 사용자로 설정
echo 8. 액세스 권한: 누구나로 설정
echo.

echo 🔧 환경변수 설정 (스크립트 속성):
echo SPREADSHEET_ID = 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
echo ADMIN_EMAIL = hongik423@gmail.com
echo AICAMP_WEBSITE = aicamp.club
echo DEBUG_MODE = false
echo ENVIRONMENT = production
echo SYSTEM_VERSION = V22.3-JSON-FIX
echo.

echo 🚨 중요: 웹앱 배포 시 설정
echo - 실행 권한: 나 (스크립트 소유자)
echo - 액세스 권한: 누구나 (익명 포함)
echo - 새 배포로 설정하여 URL 업데이트
echo.

pause
echo.
echo Google Apps Script 편집기를 여는 중...
start https://script.google.com

echo.
echo 📁 V22.3 코드 파일을 여는 중...
start aicamp_enhanced_stable_v22.js

echo.
echo ✅ 준비 완료! 위 단계를 따라 진행하세요.
echo ⚠️ 배포 완료 후 새로운 웹앱 URL을 env.ts에 업데이트해주세요.
echo.
pause

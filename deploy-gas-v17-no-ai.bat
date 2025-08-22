@echo off
echo ========================================
echo 🚀 Google Apps Script V17.0 NO-AI 배포
echo ========================================
echo.

echo 📋 배포 단계 안내:
echo.
echo 1. Google Apps Script 편집기가 열립니다
echo 2. 기존 코드를 완전히 제거하세요 (Ctrl+A, Delete)
echo 3. docs/250821_aicamp_simplified_v17.js 파일을 열어서 전체 내용을 복사하세요
echo 4. Google Apps Script Code.gs에 붙여넣기하세요 (Ctrl+V)
echo 5. 저장하세요 (Ctrl+S)
echo 6. 환경변수를 설정하세요 (설정 > 스크립트 속성)
echo 7. 웹앱으로 배포하세요 (배포 > 새 배포)
echo.

echo 🔧 환경변수 설정:
echo SPREADSHEET_ID = 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
echo ADMIN_EMAIL = hongik423@gmail.com
echo AICAMP_WEBSITE = aicamp.club
echo DEBUG_MODE = false
echo ENVIRONMENT = production
echo SYSTEM_VERSION = V17.0-SIMPLIFIED-NO-AI
echo.

echo 🎯 목표: AI 분석 완전 제거, 오프라인 처리 방식으로 전환
echo.

pause
echo.
echo Google Apps Script 편집기를 여는 중...
start https://script.google.com

echo.
echo 📁 V17.0 NO-AI 코드 파일을 여는 중...
start docs/250821_aicamp_simplified_v17.js

echo.
echo ✅ 준비 완료! 위 단계를 따라 진행하세요.
echo.
pause

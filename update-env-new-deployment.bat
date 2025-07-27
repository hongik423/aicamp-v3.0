@echo off
echo =============================================
echo AI CAMP v3.0 새 Google Apps Script 생성 적용
echo =============================================
echo.
echo # =========================================== > .env.local
echo # Google Apps Script 설정 (새 Script 생성 완료) >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID=AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0 >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_ID=1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj >> .env.local
echo # =========================================== >> .env.local
echo # Google Sheets 설정 (새 시트 적용) >> .env.local
echo NEXT_PUBLIC_GOOGLE_SHEETS_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0 >> .env.local
echo NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit#gid=0 >> .env.local
echo # =========================================== >> .env.local
echo # AI CAMP 회사 정보 >> .env.local
echo NEXT_PUBLIC_COMPANY_NAME=AI CAMP >> .env.local
echo NEXT_PUBLIC_CONSULTANT_NAME=이후경 교장 >> .env.local
echo NEXT_PUBLIC_COMPANY_EMAIL=hongik423@gmail.com >> .env.local
echo # =========================================== >> .env.local
echo # Gemini API 키 >> .env.local
echo GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM >> .env.local
echo.
echo ✅ .env.local 파일이 새로운 Google Apps Script 배포 정보로 업데이트되었습니다!
echo 🎯 새 배포 ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
echo 🔗 새 Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
echo.
pause 
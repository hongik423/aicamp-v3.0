@echo off
echo 현재 GAS URL 확인:
type .env.local | findstr GOOGLE_SCRIPT_URL
echo.
echo 새 URL을 입력하세요 (예: https://script.google.com/macros/s/XXXXX/exec):
set /p NEW_URL=
echo.
echo .env.local 업데이트 중...
powershell -Command "(Get-Content .env.local) -replace 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL=.*', 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL=%NEW_URL%' | Set-Content .env.local"
echo.
echo 업데이트 완료! 새 URL:
type .env.local | findstr GOOGLE_SCRIPT_URL
echo.
echo Vercel 환경변수도 업데이트하려면 다음 명령을 실행하세요:
echo vercel env rm NEXT_PUBLIC_GOOGLE_SCRIPT_URL production
echo vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL production
pause
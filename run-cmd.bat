@echo off
REM AICAMP 맥킨지 보고서 시스템 - Windows CMD 전용 실행 스크립트
REM 작성일: 2025-08-16

echo.
echo ========================================
echo  AICAMP 맥킨지 보고서 시스템
echo  Windows CMD 최적화 버전
echo ========================================
echo.

:MENU
echo 실행할 작업을 선택하세요:
echo.
echo 1. 개발 서버 시작 (npm run dev)
echo 2. 프로덕션 빌드 (npm run build)
echo 3. 맥킨지 E2E 테스트 실행
echo 4. API 연결 상태 확인
echo 5. 종료
echo.
set /p choice=선택 (1-5): 

if "%choice%"=="1" goto DEV
if "%choice%"=="2" goto BUILD
if "%choice%"=="3" goto TEST
if "%choice%"=="4" goto HEALTH
if "%choice%"=="5" goto EXIT
echo 잘못된 선택입니다. 다시 시도해주세요.
goto MENU

:DEV
echo.
echo [개발 서버 시작 중...]
cmd /c "npm run dev"
goto MENU

:BUILD
echo.
echo [프로덕션 빌드 중...]
cmd /c "npm run build"
goto MENU

:TEST
echo.
echo [맥킨지 E2E 테스트 실행 중...]
cmd /c "node test/mckinsey-report-e2e-simulation.mjs"
echo.
pause
goto MENU

:HEALTH
echo.
echo [API 연결 상태 확인 중...]
cmd /c "curl -X GET https://aicamp.club/api/google-script-proxy"
echo.
pause
goto MENU

:EXIT
echo.
echo 프로그램을 종료합니다.
pause
exit /b 0

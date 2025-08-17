@echo off
REM AICAMP v3.0 테스트 실행 스크립트
REM Windows 환경용 배치 파일

echo ========================================
echo    AICAMP v3.0 테스트 실행 도구
echo ========================================
echo.

if "%1"=="" (
    echo 사용법: run-tests.bat [옵션]
    echo.
    echo 옵션:
    echo   server    - 테스트 서버 시작
    echo   client    - 테스트 클라이언트 실행
    echo   health    - 헬스 체크만 실행
    echo   e2e       - E2E 테스트 실행
    echo   all       - 전체 테스트 실행
    echo   dev       - 개발 서버 시작
    echo.
    goto :end
)

if "%1"=="server" (
    echo 🚀 테스트 서버를 시작합니다...
    node test-server.js
    goto :end
)

if "%1"=="client" (
    echo 🧪 테스트 클라이언트를 실행합니다...
    node test-client.js all test
    goto :end
)

if "%1"=="health" (
    echo 🏥 헬스 체크를 실행합니다...
    node test-client.js health test
    goto :end
)

if "%1"=="e2e" (
    echo 🔄 E2E 테스트를 실행합니다...
    node test/mckinsey-report-e2e-simulation.mjs
    goto :end
)

if "%1"=="all" (
    echo 🚀 전체 테스트를 실행합니다...
    echo.
    echo 1. 헬스 체크...
    node test-client.js health test
    echo.
    echo 2. 시스템 상태 확인...
    node test-client.js system test
    echo.
    echo 3. E2E 테스트...
    node test/mckinsey-report-e2e-simulation.mjs
    goto :end
)

if "%1"=="dev" (
    echo 🔧 개발 서버를 시작합니다...
    npm run dev
    goto :end
)

echo ❌ 알 수 없는 옵션: %1
echo 사용 가능한 옵션: server, client, health, e2e, all, dev

:end
echo.
echo 테스트 완료.
pause

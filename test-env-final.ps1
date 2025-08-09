try {
    Write-Host "=== 환경변수 문제 해결 최종 테스트 ===" -ForegroundColor Green
    
    # 1. 환경변수 확인 API 테스트
    Write-Host "`n1. 환경변수 확인 API 테스트..." -ForegroundColor Yellow
    $envResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/test-env" -Method GET -UseBasicParsing
    Write-Host "Status: $($envResponse.StatusCode)" -ForegroundColor Green
    $envData = $envResponse.Content | ConvertFrom-Json
    Write-Host "Environment Data:" -ForegroundColor Cyan
    Write-Host ($envData | ConvertTo-Json -Depth 3) -ForegroundColor White
    
    # 2. 시스템 헬스체크 API 테스트
    Write-Host "`n2. 시스템 헬스체크 API 테스트..." -ForegroundColor Yellow
    $healthResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/system-health" -Method GET -UseBasicParsing
    Write-Host "Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    $healthData = $healthResponse.Content | ConvertFrom-Json
    
    # 환경변수 상태 확인
    Write-Host "`n환경변수 상태 분석:" -ForegroundColor Cyan
    $envComponent = $healthData.components | Where-Object { $_.component -eq "Environment Variables" }
    if ($envComponent) {
        Write-Host "환경변수 컴포넌트 상태: $($envComponent.status)" -ForegroundColor $(if($envComponent.status -eq "healthy") { "Green" } else { "Yellow" })
        if ($envComponent.details) {
            Write-Host "환경변수 세부사항:" -ForegroundColor White
            Write-Host ($envComponent.details | ConvertTo-Json -Depth 2) -ForegroundColor White
        }
        if ($envComponent.error) {
            Write-Host "오류: $($envComponent.error)" -ForegroundColor Red
        }
    }
    
    Write-Host "`n=== 환경변수 문제 해결 테스트 완료! ===" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

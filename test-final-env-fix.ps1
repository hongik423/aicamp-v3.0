try {
    Write-Host "=== 환경변수 문제 해결 최종 확인 ===" -ForegroundColor Green
    
    # 1. 환경변수 확인 API 테스트 (수정된 로직)
    Write-Host "`n1. 환경변수 확인 API 테스트 (수정된 로직)..." -ForegroundColor Yellow
    $envResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/test-env" -Method GET -UseBasicParsing
    Write-Host "Status: $($envResponse.StatusCode)" -ForegroundColor Green
    $envData = $envResponse.Content | ConvertFrom-Json
    
    Write-Host "환경변수 상태:" -ForegroundColor Cyan
    if ($envData.environment) {
        foreach ($env in $envData.environment.PSObject.Properties) {
            $status = if ($env.Value -eq $true) { "✅ 설정됨" } elseif ($env.Value -eq $false) { "❌ 누락" } else { $env.Value }
            Write-Host "  $($env.Name): $status" -ForegroundColor $(if($env.Value -eq $true) { "Green" } elseif($env.Value -eq $false) { "Red" } else { "White" })
        }
    }
    
    # 2. 시스템 헬스체크 API 테스트
    Write-Host "`n2. 시스템 헬스체크 API 테스트..." -ForegroundColor Yellow
    $healthResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/system-health" -Method GET -UseBasicParsing
    Write-Host "Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    $healthData = $healthResponse.Content | ConvertFrom-Json
    
    # 환경변수 컴포넌트 상태 확인
    $envComponent = $healthData.components | Where-Object { $_.component -eq "Environment Variables" }
    if ($envComponent) {
        Write-Host "`n환경변수 컴포넌트 상태: $($envComponent.status)" -ForegroundColor $(if($envComponent.status -eq "healthy") { "Green" } elseif($envComponent.status -eq "degraded") { "Yellow" } else { "Red" })
        
        if ($envComponent.details) {
            Write-Host "환경변수 세부 상태:" -ForegroundColor Cyan
            foreach ($detail in $envComponent.details.PSObject.Properties) {
                $status = if ($detail.Value -eq "set") { "✅ 설정됨" } elseif ($detail.Value -eq "missing") { "❌ 누락" } else { $detail.Value }
                Write-Host "  $($detail.Name): $status" -ForegroundColor $(if($detail.Value -eq "set") { "Green" } elseif($detail.Value -eq "missing") { "Red" } else { "White" })
            }
        }
        
        if ($envComponent.error) {
            Write-Host "오류: $($envComponent.error)" -ForegroundColor Red
        } else {
            Write-Host "✅ 환경변수 문제 해결 완료!" -ForegroundColor Green
        }
    }
    
    Write-Host "`n=== 환경변수 문제 해결 최종 확인 완료! ===" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

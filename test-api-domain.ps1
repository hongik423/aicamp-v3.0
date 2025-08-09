try {
    Write-Host "=== AICAMP API 테스트 (커스텀 도메인) ===" -ForegroundColor Green
    
    # 커스텀 도메인으로 시스템 헬스체크 테스트
    Write-Host "`n1. 시스템 헬스체크 테스트 (aicamp.club)..." -ForegroundColor Yellow
    $healthResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/system-health" -Method GET -UseBasicParsing
    Write-Host "Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Headers: $($healthResponse.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Cyan
    Write-Host "Response: $($healthResponse.Content.Substring(0, [Math]::Min(300, $healthResponse.Content.Length)))" -ForegroundColor Cyan
    
    Write-Host "`n=== API 테스트 성공! ===" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        Write-Host "Status Description: $($_.Exception.Response.StatusDescription)" -ForegroundColor Red
    }
}

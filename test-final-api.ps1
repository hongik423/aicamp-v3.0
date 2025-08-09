try {
    Write-Host "=== 최종 API 테스트 (새 배포) ===" -ForegroundColor Green
    
    # 새 배포 URL로 진단 결과 API 테스트
    Write-Host "`n1. 진단 결과 API 테스트 (새 배포)..." -ForegroundColor Yellow
    $diagnosisResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/diagnosis-results/AICAMP-ME49KIYK-0OOP5" -Method GET -UseBasicParsing
    Write-Host "Status: $($diagnosisResponse.StatusCode)" -ForegroundColor Green
    Write-Host "CORS Header: $($diagnosisResponse.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Cyan
    Write-Host "Content-Type: $($diagnosisResponse.Headers['Content-Type'])" -ForegroundColor Cyan
    Write-Host "Response (처음 400자):" -ForegroundColor Yellow
    Write-Host $diagnosisResponse.Content.Substring(0, [Math]::Min(400, $diagnosisResponse.Content.Length)) -ForegroundColor White
    
    Write-Host "`n=== 진단 결과 API 테스트 성공! ===" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        Write-Host "Status Description: $($_.Exception.Response.StatusDescription)" -ForegroundColor Red
    }
}

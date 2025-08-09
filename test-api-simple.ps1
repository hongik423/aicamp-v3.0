try {
    Write-Host "=== AICAMP API 테스트 시작 ===" -ForegroundColor Green
    
    # 시스템 헬스체크 테스트
    Write-Host "`n1. 시스템 헬스체크 테스트..." -ForegroundColor Yellow
    $healthResponse = Invoke-WebRequest -Uri "https://aicampv30-b977pl3rq-hongik423-3087s-projects.vercel.app/api/system-health" -Method GET -UseBasicParsing
    Write-Host "Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($healthResponse.Content.Substring(0, [Math]::Min(200, $healthResponse.Content.Length)))" -ForegroundColor Cyan
    
    # 환경변수 확인 테스트
    Write-Host "`n2. 환경변수 확인 테스트..." -ForegroundColor Yellow
    $envResponse = Invoke-WebRequest -Uri "https://aicampv30-b977pl3rq-hongik423-3087s-projects.vercel.app/api/test-env" -Method GET -UseBasicParsing
    Write-Host "Status: $($envResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($envResponse.Content.Substring(0, [Math]::Min(200, $envResponse.Content.Length)))" -ForegroundColor Cyan
    
    # 진단 결과 API 테스트
    Write-Host "`n3. 진단 결과 API 테스트..." -ForegroundColor Yellow
    $diagnosisResponse = Invoke-WebRequest -Uri "https://aicampv30-b977pl3rq-hongik423-3087s-projects.vercel.app/api/diagnosis-results/AICAMP-ME49KIYK-0OOP5" -Method GET -UseBasicParsing
    Write-Host "Status: $($diagnosisResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($diagnosisResponse.Content.Substring(0, [Math]::Min(200, $diagnosisResponse.Content.Length)))" -ForegroundColor Cyan
    
    Write-Host "`n=== 모든 API 테스트 성공! ===" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "상세 정보: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

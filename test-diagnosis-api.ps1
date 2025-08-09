try {
    Write-Host "=== 진단 결과 API 상세 테스트 ===" -ForegroundColor Green
    
    # 진단 결과 API 테스트
    Write-Host "`n진단 결과 API 테스트..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri "https://aicamp.club/api/diagnosis-results/AICAMP-ME49KIYK-0OOP5" -Method GET -UseBasicParsing
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content-Type: $($response.Headers['Content-Type'])" -ForegroundColor Cyan
    Write-Host "CORS Header: $($response.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Cyan
    Write-Host "Response Length: $($response.Content.Length)" -ForegroundColor Yellow
    Write-Host "Response Content (처음 500자):" -ForegroundColor Yellow
    Write-Host $response.Content.Substring(0, [Math]::Min(500, $response.Content.Length)) -ForegroundColor White
    
} catch {
    Write-Host "`n❌ 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        Write-Host "Status Description: $($_.Exception.Response.StatusDescription)" -ForegroundColor Red
        try {
            $errorContent = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorContent)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Error Response (처음 300자):" -ForegroundColor Red
            Write-Host $errorBody.Substring(0, [Math]::Min(300, $errorBody.Length)) -ForegroundColor White
        } catch {
            Write-Host "Error response body를 읽을 수 없음" -ForegroundColor Red
        }
    }
}

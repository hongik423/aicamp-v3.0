#!/bin/bash

echo "🧪 AI 진단 시스템 테스트 시작..."

# 테스트 데이터
TEST_DATA='{
  "type": "diagnosis",
  "action": "diagnosis",
  "processType": "standard",
  "companyName": "테스트기업_AI진단",
  "contactName": "테스트담당자",
  "contactEmail": "test@example.com",
  "contactPhone": "010-1234-5678",
  "industry": "제조업",
  "employeeCount": "1-10명",
  "annualRevenue": "50억~100억원 미만",
  "location": "서울특별시",
  "privacyConsent": true,
  "assessmentResponses": {
    "1": 4, "2": 3, "3": 4, "4": 3, "5": 4,
    "6": 3, "7": 4, "8": 3, "9": 4, "10": 3,
    "11": 4, "12": 3, "13": 4, "14": 3, "15": 4,
    "16": 3, "17": 4, "18": 3, "19": 4, "20": 3,
    "21": 4, "22": 3, "23": 4, "24": 3, "25": 4,
    "26": 3, "27": 4, "28": 3, "29": 4, "30": 3,
    "31": 4, "32": 3, "33": 4, "34": 3, "35": 4,
    "36": 3, "37": 4, "38": 3, "39": 4, "40": 3,
    "41": 4, "42": 3, "43": 4, "44": 3, "45": 4
  },
  "reportGeneration": {
    "requestHtmlReport": true,
    "requestEmailSending": true,
    "emailRecipient": "test@example.com",
    "companyName": "테스트기업_AI진단"
  },
  "timestamp": "2025-01-20T15:30:00.000Z",
  "version": "V16.0-ULTIMATE-45Q",
  "source": "test_system",
  "userAgent": "Test-Agent/1.0"
}'

echo "📊 테스트 데이터 준비 완료"
echo "🚀 AI 진단 요청 전송 중..."

# Google Apps Script URL (실제 URL로 변경 필요)
GAS_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

# curl 요청 실행
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  "$GAS_URL" \
  -w "\nHTTP Status: %{http_code}\nTotal Time: %{time_total}s\n" \
  -o response.json

echo "📋 응답 결과:"
cat response.json | jq '.' 2>/dev/null || cat response.json

echo "✅ 테스트 완료!"

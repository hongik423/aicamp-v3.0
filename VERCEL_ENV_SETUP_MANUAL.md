# 🚀 Vercel 환경변수 수동 설정 가이드

## 📋 설정해야 할 환경변수 (V14.2 ULTIMATE INTEGRATED + Google Drive API)

### 1. Vercel 대시보드 접속
- https://vercel.com/dashboard
- aicamp_v3.0 프로젝트 선택
- Settings → Environment Variables

### 2. 필수 환경변수 설정

```bash
# Google Apps Script 연동 (V14.2 ULTIMATE)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec

# Google Sheets 연동
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# GEMINI AI API (서버 사이드 전용)
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# Google Drive API 연동 (새로 추가)
GOOGLE_SERVICE_ACCOUNT_EMAIL=aicamp-drive-service@m-center-landingpage.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCNNVbxxmA29YFU\nCNzncrlmyBoFVSOa8MWzfJRMJnmYILj+ebkYxO0gDvK9O5wGOHZVvmLst4fZ/3L8\n1IzzoK2ie/i/XFUmyJQdbq7BVJ836tvihIJl1GPqFcuJBc6CyzqLexKALQTDC2Xc\nAzwi4e+m9o/W468tmghp5wUIXcEVSpBJ/Nj6YsecJGOY8OuBNh7ADzTYGvn5hWdW\nVp9QKrvHiQgX26gvrOciKri8XlTQE8vgJaVYgQZnT1XQ8y7cwBdGixoY/ZF/bP0o\n6piXwdHXUsmykHHNakAGhWx6yeGjlfx3+Mf7n6fPuYO5ZYtzjWuWBwOahrgRcYCq\naSQ5jZuBAgMBAAECggEABqEp1jNQ9leXpS8+1s9yMKcFoLk28RnrgEIhsMMQK6Ii\nqVDj7aumMd59y0BakoixVpR4DsLNmiCmAISGoxQIvuOI4cwXE9lwKcMV6Y38ZSrN\nvMBpolgCwl1YV1QqVkXuF1kVfObQLcuR0k7lEoKuxpUWGvnI0lBkY3t1ByfmriYG\njh1ZkozAPIAgZzi0Wh9QRhVht2u7Q1BwssVuLWUOteF4QXYaRAW++2bEYnchL0me\nzTIx/RrVvnDWvjpzwJhwJtifhKwQgtiWHE3zgrje9ENOm031TmjkHZMpu2XBgQG1\ni3HROKcxIvZPyPSuhRQhL8wVX28SLykSHOw40i+tyQKBgQDA37Kzj9paSRGPNcoJ\n75ET0lZnB23rndCxtYu0hpTomU+1AcgCqr5lNX0PRG0YuiYRkF0Q6RqxeZSpfInv\nb11AWaTbfX/7uOY83x0vDI1YgSG5IV5DNHSId40MVwO96S1KmDLXpC9TvKChu5R9\ncrNwvDe0DW6lP6Y/5bAOcFlsqQKBgQC7bMCBV1P/L8lsQ1wqWm/wDYCTlzWDAK1b\nA8Kh6utGOM6DkS9Sw+IEPJfhjDNeBJOaW1lIX+W5vDpZ3yS5AvoBkteiGhsMkC1q\n1tghIkGi5R7CyRTC2jb/Kps0xsQuoGFjvuY9A5bo41q3TsjfLlGnPVZyW+qVcnSL\nfoEh+4pnGQKBgELvXz0ht02N/iINMMix809Ft+aZlXQnmL2Tm6BS9GqkihzvOVJz\nnw/QuE4MGTBzqbJ+v02XGERvRUBskBIgO+SRN71UmI3rZTvK0n35hTQp3GI7SlNY\naPjTRIf7yrilq6ovl7VurV4KIFUAnE/M9qkxKMO7xaJjrHaQZ8EbDG3BAoGARIkv\nF9z0NUOnNzSmlkI93p1BYDcR9VahDcAhQw5hfGs3cTr9ABnrIzt5GpwnCIFJ7E7t\nJh8TJUkkWUrU5ealvz+QJJHBRGXQhdoMbIlXURbRmc7oDZy4MbTFzpXElXxGQLBF\nBxix7XV97bwcjigk6a/vVaAw9vdEkOHwnJmb8bkCgYBtwBy75X9bfAPS+/Q9/2gB\naEBC+shFirqRMk38YS/7iO7uETosvJ+4MWpoFGy0UNlc9sRyhEdyyeFobQWdoDd/\nO+JP8KAr/uPLf9Vq/mPQcO8FyISEIyzDwEPK6elW69Zp9BNn4TFLPxxo3nkDquo1\nKrDCUqk//TMGAH74TFHBrw==\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_ID=113938355983104421340
DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
NEXT_PUBLIC_DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# 도메인 설정
NEXT_PUBLIC_BASE_URL=https://aicamp.club

# 시스템 설정
NODE_ENV=production
```

### 3. 설정 방법

각 환경변수를 다음과 같이 설정:
1. **Name**: 환경변수 이름 입력
2. **Value**: 해당 값 입력  
3. **Environment**: Production 선택
4. **Save** 클릭

### 4. 설정 완료 후

- **Redeploy** 버튼 클릭하여 새로운 환경변수로 재배포
- 약 2-3분 후 https://aicamp.club 에서 확인

## ✅ 설정 확인 방법

배포 완료 후 다음 URL로 확인:
- 메인 사이트: https://aicamp.club
- AI 진단: https://aicamp.club/ai-diagnosis
- 오류 차단 상태: https://aicamp.club/api/error-shield
- Manifest: https://aicamp.club/api/manifest
- Google Drive API: https://aicamp.club/api/google-drive/upload

## 🎯 중요사항

- 모든 환경변수는 **Production** 환경에 설정
- 설정 후 반드시 **Redeploy** 실행
- Google Apps Script V14.2 ULTIMATE와 완전 동기화됨
- Google Drive API 연동으로 PDF 자동 저장 기능 추가됨

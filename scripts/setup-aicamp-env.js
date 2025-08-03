const fs = require('fs');
const path = require('path');

console.log('🚀 AICAMP API 환경 설정 시작...');

// 환경변수 템플릿
const envTemplate = `# AICAMP AI 경영진단 시스템 환경변수
# 이 파일을 .env.local로 복사하고 실제 값으로 채워주세요

# Google Sheets 설정
GOOGLE_SPREADSHEET_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit

# Google Service Account (Google Cloud Console에서 생성 필요)
# 1. https://console.cloud.google.com 접속
# 2. 새 프로젝트 생성 또는 기존 프로젝트 선택
# 3. APIs & Services > Credentials > Create Credentials > Service Account
# 4. JSON 키 다운로드 후 아래 값 입력
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----"

# GEMINI API (https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# Email 설정 (Gmail 앱 비밀번호 필요)
# 1. Google 계정 설정 > 보안 > 2단계 인증 활성화
# 2. 앱 비밀번호 생성 (메일 선택)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password

# 관리자 이메일
ADMIN_EMAIL=hongik423@gmail.com

# 기타 설정
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api/aicamp
`;

// .env.local.example 파일 생성
const envExamplePath = path.join(process.cwd(), '.env.local.example');
fs.writeFileSync(envExamplePath, envTemplate);
console.log('✅ .env.local.example 파일 생성 완료');

// vercel.json 생성
const vercelConfig = {
  "functions": {
    "src/app/api/aicamp/route.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
};

const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
console.log('✅ vercel.json 파일 생성 완료');

// 배포 체크리스트 출력
console.log('\n📋 Vercel 배포 체크리스트:');
console.log('1. ✅ 필요한 패키지 설치 완료');
console.log('2. ⚠️  Google Cloud에서 서비스 계정 생성 필요');
console.log('3. ⚠️  Gmail 앱 비밀번호 생성 필요');
console.log('4. ⚠️  .env.local.example을 .env.local로 복사하고 실제 값 입력');
console.log('5. ⚠️  Vercel 프로젝트에서 환경변수 설정');
console.log('6. 🚀 vercel 또는 git push로 배포');

console.log('\n💡 Vercel 환경변수 설정:');
console.log('   https://vercel.com/[your-team]/[your-project]/settings/environment-variables');

console.log('\n🔗 유용한 링크:');
console.log('   - Google Cloud Console: https://console.cloud.google.com');
console.log('   - Google Sheets API: https://console.cloud.google.com/apis/library/sheets.googleapis.com');
console.log('   - Gmail 앱 비밀번호: https://myaccount.google.com/apppasswords');
console.log('   - GEMINI API: https://makersuite.google.com/app/apikey');

console.log('\n✨ 설정 완료!');
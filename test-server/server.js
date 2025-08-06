const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Google Apps Script URL (환경변수에서 가져오기)
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// 테스트 데이터
const sampleDiagnosisData = {
  action: 'diagnosis',
  companyName: '테스트 기업',
  contactName: '홍길동',
  email: 'test@example.com',
  phone: '010-1234-5678',
  industry: 'IT/소프트웨어',
  employeeCount: '10-50명',
  region: '서울',
  businessDetails: 'AI 기반 서비스 개발 및 운영',
  mainConcerns: ['AI 전문성 부족', '기술 도입 비용'],
  expectedBenefits: ['업무 효율 향상', '경쟁력 강화'],
  assessmentResponses: [
    { questionId: 'leadership_1', value: 4 },
    { questionId: 'leadership_2', value: 3 },
    { questionId: 'leadership_3', value: 4 },
    { questionId: 'leadership_4', value: 3 },
    { questionId: 'infra_1', value: 2 },
    { questionId: 'infra_2', value: 3 },
    { questionId: 'infra_3', value: 2 },
    { questionId: 'infra_4', value: 3 },
    { questionId: 'talent_1', value: 3 },
    { questionId: 'talent_2', value: 2 },
    { questionId: 'talent_3', value: 3 },
    { questionId: 'talent_4', value: 2 },
    { questionId: 'culture_1', value: 4 },
    { questionId: 'culture_2', value: 3 },
    { questionId: 'culture_3', value: 3 },
    { questionId: 'culture_4', value: 3 },
    { questionId: 'app_1', value: 2 },
    { questionId: 'app_2', value: 2 },
    { questionId: 'app_3', value: 3 },
    { questionId: 'app_4', value: 2 },
    { questionId: 'data_1', value: 3 },
    { questionId: 'data_2', value: 2 },
    { questionId: 'data_3', value: 2 },
    { questionId: 'data_4', value: 3 }
  ],
  privacyConsent: true,
  marketingConsent: false,
  submittedAt: new Date().toISOString(),
  formType: 'ai-capability-diagnosis'
};

// 루트 페이지
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>AICAMP 진단 시스템 테스터</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            h1 { color: #333; text-align: center; }
            .test-section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 5px; }
            button:hover { background: #0056b3; }
            .result { margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
            .success { border-left: 4px solid #28a745; }
            .error { border-left: 4px solid #dc3545; }
            pre { background: #f1f1f1; padding: 10px; border-radius: 3px; overflow-x: auto; }
            .status { display: inline-block; padding: 5px 10px; border-radius: 3px; color: white; font-weight: bold; }
            .status.ok { background: #28a745; }
            .status.error { background: #dc3545; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 AICAMP AI 역량진단 시스템 테스터</h1>
            
            <div class="test-section">
                <h3>📊 시스템 상태</h3>
                <p>Google Apps Script URL: <code>${GOOGLE_SCRIPT_URL}</code></p>
                <button onclick="checkStatus()">상태 확인</button>
                <div id="statusResult"></div>
            </div>
            
            <div class="test-section">
                <h3>🧪 진단 테스트</h3>
                <p>샘플 데이터로 AI 역량진단을 테스트합니다.</p>
                <button onclick="testDiagnosis()">진단 테스트 실행</button>
                <div id="diagnosisResult"></div>
            </div>
            
            <div class="test-section">
                <h3>📞 상담신청 테스트</h3>
                <button onclick="testConsultation()">상담신청 테스트</button>
                <div id="consultationResult"></div>
            </div>
            
            <div class="test-section">
                <h3>🔍 환경변수 테스트</h3>
                <button onclick="testEnvironment()">환경변수 확인</button>
                <div id="environmentResult"></div>
            </div>
        </div>

        <script>
            async function checkStatus() {
                const resultDiv = document.getElementById('statusResult');
                resultDiv.innerHTML = '<p>상태 확인 중...</p>';
                
                try {
                    const response = await fetch('/api/status');
                    const data = await response.json();
                    
                    resultDiv.innerHTML = \`
                        <div class="result success">
                            <h4>✅ 시스템 상태: <span class="status ok">정상</span></h4>
                            <pre>\${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    \`;
                } catch (error) {
                    resultDiv.innerHTML = \`
                        <div class="result error">
                            <h4>❌ 상태 확인 실패</h4>
                            <p>\${error.message}</p>
                        </div>
                    \`;
                }
            }
            
            async function testDiagnosis() {
                const resultDiv = document.getElementById('diagnosisResult');
                resultDiv.innerHTML = '<p>진단 테스트 실행 중...</p>';
                
                try {
                    const response = await fetch('/api/test-diagnosis', {
                        method: 'POST'
                    });
                    const data = await response.json();
                    
                    const statusClass = data.success ? 'success' : 'error';
                    const statusIcon = data.success ? '✅' : '❌';
                    
                    resultDiv.innerHTML = \`
                        <div class="result \${statusClass}">
                            <h4>\${statusIcon} 진단 테스트 결과</h4>
                            <pre>\${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    \`;
                } catch (error) {
                    resultDiv.innerHTML = \`
                        <div class="result error">
                            <h4>❌ 진단 테스트 실패</h4>
                            <p>\${error.message}</p>
                        </div>
                    \`;
                }
            }
            
            async function testConsultation() {
                const resultDiv = document.getElementById('consultationResult');
                resultDiv.innerHTML = '<p>상담신청 테스트 실행 중...</p>';
                
                try {
                    const response = await fetch('/api/test-consultation', {
                        method: 'POST'
                    });
                    const data = await response.json();
                    
                    const statusClass = data.success ? 'success' : 'error';
                    const statusIcon = data.success ? '✅' : '❌';
                    
                    resultDiv.innerHTML = \`
                        <div class="result \${statusClass}">
                            <h4>\${statusIcon} 상담신청 테스트 결과</h4>
                            <pre>\${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    \`;
                } catch (error) {
                    resultDiv.innerHTML = \`
                        <div class="result error">
                            <h4>❌ 상담신청 테스트 실패</h4>
                            <p>\${error.message}</p>
                        </div>
                    \`;
                }
            }
            
            async function testEnvironment() {
                const resultDiv = document.getElementById('environmentResult');
                resultDiv.innerHTML = '<p>환경변수 확인 중...</p>';
                
                try {
                    const response = await fetch('/api/test-environment');
                    const data = await response.json();
                    
                    const statusClass = data.success ? 'success' : 'error';
                    const statusIcon = data.success ? '✅' : '❌';
                    
                    resultDiv.innerHTML = \`
                        <div class="result \${statusClass}">
                            <h4>\${statusIcon} 환경변수 테스트 결과</h4>
                            <pre>\${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    \`;
                } catch (error) {
                    resultDiv.innerHTML = \`
                        <div class="result error">
                            <h4>❌ 환경변수 테스트 실패</h4>
                            <p>\${error.message}</p>
                        </div>
                    \`;
                }
            }
        </script>
    </body>
    </html>
  `);
});

// API 엔드포인트들

// 시스템 상태 확인
app.get('/api/status', async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL, {
      timeout: 10000
    });
    
    res.json({
      success: true,
      message: 'Google Apps Script 연결 성공',
      gasResponse: response.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Google Apps Script 연결 실패',
      timestamp: new Date().toISOString()
    });
  }
});

// 진단 테스트
app.post('/api/test-diagnosis', async (req, res) => {
  try {
    console.log('🧪 진단 테스트 시작');
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, sampleDiagnosisData, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ 진단 테스트 성공:', response.data);
    
    res.json({
      success: true,
      message: '진단 테스트 성공',
      gasResponse: response.data,
      testData: {
        companyName: sampleDiagnosisData.companyName,
        email: sampleDiagnosisData.email,
        assessmentCount: sampleDiagnosisData.assessmentResponses.length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ 진단 테스트 실패:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: '진단 테스트 실패',
      gasUrl: GOOGLE_SCRIPT_URL,
      timestamp: new Date().toISOString()
    });
  }
});

// 상담신청 테스트
app.post('/api/test-consultation', async (req, res) => {
  try {
    console.log('📞 상담신청 테스트 시작');
    
    const consultationData = {
      action: 'consultation',
      companyName: '테스트 상담기업',
      contactName: '김상담',
      email: 'consultation@test.com',
      phone: '010-9999-8888',
      content: '테스트 상담신청입니다.'
    };
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, consultationData, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ 상담신청 테스트 성공:', response.data);
    
    res.json({
      success: true,
      message: '상담신청 테스트 성공',
      gasResponse: response.data,
      testData: consultationData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ 상담신청 테스트 실패:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: '상담신청 테스트 실패',
      timestamp: new Date().toISOString()
    });
  }
});

// 환경변수 테스트 (GAS의 testEnvironmentVariables 함수 호출)
app.get('/api/test-environment', async (req, res) => {
  try {
    console.log('🔍 환경변수 테스트 시작');
    
    // Google Apps Script의 testEnvironmentVariables 함수 호출
    const testData = {
      action: 'health',
      test: 'environment'
    };
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, testData, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ 환경변수 테스트 성공:', response.data);
    
    res.json({
      success: true,
      message: '환경변수 테스트 성공',
      gasResponse: response.data,
      serverEnv: {
        GOOGLE_SCRIPT_URL: GOOGLE_SCRIPT_URL ? '설정됨' : '미설정',
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: PORT
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ 환경변수 테스트 실패:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: '환경변수 테스트 실패',
      timestamp: new Date().toISOString()
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log('🚀 AICAMP 테스트 서버 시작됨');
  console.log(`📡 서버 주소: http://localhost:${PORT}`);
  console.log(`🔗 Google Apps Script URL: ${GOOGLE_SCRIPT_URL}`);
  console.log('━'.repeat(50));
  console.log('📋 사용 가능한 엔드포인트:');
  console.log(`   GET  / - 테스트 웹 인터페이스`);
  console.log(`   GET  /api/status - 시스템 상태 확인`);
  console.log(`   POST /api/test-diagnosis - 진단 테스트`);
  console.log(`   POST /api/test-consultation - 상담신청 테스트`);
  console.log(`   GET  /api/test-environment - 환경변수 테스트`);
  console.log('━'.repeat(50));
});

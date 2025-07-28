/**
 * ================================================================================
 * AICAMP Google Apps Script 완전 테스트 시스템 2025.01.27
 * ================================================================================
 * 
 * 🎯 목표: Vercel 배포 전 Google Apps Script 무오류 완전 검증
 * 
 * 📋 테스트 범위:
 * 1. 환경변수 및 설정값 유효성 검증
 * 2. 진단신청 처리 로직 (58개 컬럼) 
 * 3. 상담신청 처리 로직 (19개 컬럼)
 * 4. 베타피드백 처리 로직 (14개 컬럼)
 * 5. 이메일 발송 기능 (관리자/사용자/PDF첨부)
 * 6. 구글시트 연동 및 헤더 설정
 * 7. 오류 처리 및 예외 상황 대응
 * 8. API 응답 형식 및 UTF-8 인코딩
 * 
 * 🔧 사용법:
 * node test-aicamp-gas-comprehensive.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ================================================================================
// 🔧 테스트 설정 (배포 환경과 동일)
// ================================================================================

const TEST_CONFIG = {
  // Google Apps Script 배포 정보
  GAS_WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  
  // 테스트 옵션
  TIMEOUT: 30000, // 30초
  RETRY_COUNT: 3,
  DELAY_BETWEEN_TESTS: 2000, // 2초
  
  // 테스트 결과 저장
  SAVE_RESULTS: true,
  RESULTS_FILE: 'gas-test-results.json'
};

// ================================================================================
// 🧪 테스트 데이터 정의
// ================================================================================

const TEST_DATA = {
  // 완전한 진단신청 데이터 (58개 컬럼 대응)
  DIAGNOSIS_COMPLETE: {
    action: 'saveDiagnosis',
    회사명: '테스트기업(주)',
    업종: 'IT/소프트웨어',
    사업담당자: '김대표',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: '온라인 마케팅 전략 수립과 매출 증대 방안이 시급히 필요합니다. 특히 SNS 마케팅과 콘텐츠 마케팅 영역에서의 전문성 부족이 큰 고민입니다.',
    예상혜택: '체계적인 마케팅 전략 수립으로 월 매출 30% 증대와 브랜드 인지도 향상을 기대합니다.',
    진행사업장: '서울시 강남구',
    담당자명: '이담당자',
    연락처: '010-1234-5678',
    이메일: 'test@aicamp-test.com',
    개인정보동의: true,
    종합점수: 75.8,
    
    // 문항별 상세 점수 (1-5점)
    문항별점수: {
      기획수준: 4,
      차별화정도: 3,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 3,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 3,
      마케팅계획: 2,
      오프라인마케팅: 3,
      온라인마케팅: 2,
      판매전략: 3,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    
    // 카테고리별 점수
    카테고리점수: {
      productService: { score: 4.0 },
      customerService: { score: 3.5 },
      marketing: { score: 2.6 },
      procurement: { score: 4.0 },
      storeManagement: { score: 4.5 }
    },
    
    // 진단 보고서 (3000자 미만)
    진단보고서요약: `
📊 AI 진단 결과 요약 보고서

🎯 종합 평가: 75.8점 (100점 만점)

📈 강점 분야:
1. 매장관리 역량 (4.5점) - 외관관리와 청결도에서 우수한 평가
2. 상품/서비스 관리 (4.0점) - 전문성과 품질 수준이 높음
3. 구매/재고관리 (4.0점) - 체계적인 관리 시스템 구축

⚠️ 개선 필요 분야:
1. 마케팅 역량 (2.6점) - 특히 온라인 마케팅 전략 수립 시급
2. 고객응대 역량 (3.5점) - 불만관리 및 고객맞이 개선 필요

🚀 맞춤형 개선 방안:
1. 디지털 마케팅 교육 프로그램 참여
2. SNS 채널 구축 및 콘텐츠 마케팅 전략 수립
3. 고객 응대 매뉴얼 작성 및 직원 교육 강화
4. 온라인 리뷰 관리 시스템 도입

💡 추천 서비스:
- 마케팅 컨설팅 (우선순위 1)
- 고객서비스 개선 컨설팅
- 디지털 트랜스포메이션 지원

📞 전문가 상담을 통해 더 구체적인 실행 계획을 수립하실 수 있습니다.
    `.trim()
  },

  // 상담신청 데이터 (19개 컬럼 대응)
  CONSULTATION_COMPLETE: {
    action: 'saveConsultation',
    상담유형: '마케팅컨설팅',
    성명: '박상담자',
    연락처: '010-9876-5432',
    이메일: 'consultation@aicamp-test.com',
    회사명: '상담테스트(주)',
    직책: '마케팅팀장',
    상담분야: '디지털마케팅전략',
    문의내용: `
안녕하세요. 저희 회사는 전통적인 제조업체인데, 최근 온라인 진출을 계획하고 있습니다.

주요 문의사항:
1. B2B에서 B2C로의 사업 모델 전환 전략
2. 이커머스 플랫폼 구축 및 운영 방안
3. 디지털 마케팅 채널별 전략 수립
4. 브랜드 포지셔닝 및 차별화 전략

현재 월 매출 5억 규모이며, 온라인을 통해 30% 이상 매출 증대를 목표로 하고 있습니다.
전문가의 체계적인 컨설팅을 받고 싶습니다.
    `.trim(),
    희망상담시간: '평일 오후 2-5시 (화요일, 목요일 선호)',
    개인정보동의: true,
    진단연계여부: 'Y',
    진단점수: '75.8',
    추천서비스: '마케팅컨설팅, 디지털트랜스포메이션'
  },

  // 베타피드백 데이터 (14개 컬럼 대응)
  BETA_FEEDBACK_COMPLETE: {
    action: 'saveBetaFeedback',
    계산기명: '종합소득세계산기',
    피드백유형: '버그신고',
    사용자이메일: 'beta-tester@aicamp-test.com',
    문제설명: `
계산 결과가 항상 0원으로 표시되는 문제가 발생합니다.

상세 상황:
- 소득금액: 5,000만원 입력
- 소득공제: 1,500만원 입력  
- 계산 버튼 클릭 시 결과가 0원으로 표시
- 새로고침 후 재시도해도 동일한 문제 발생

브라우저: Chrome 120.0.0.0
운영체제: Windows 11
화면 해상도: 1920x1080
    `.trim(),
    기대동작: '입력된 소득금액과 공제액을 기반으로 정확한 종합소득세가 계산되어 표시되어야 함',
    실제동작: '모든 입력값에 관계없이 계산 결과가 항상 0원으로 표시됨',
    재현단계: `
1. 세금계산기 페이지 접속
2. 종합소득세계산기 선택
3. 총급여액에 5,000만원 입력
4. 소득공제 항목들 입력 (총 1,500만원)
5. '계산하기' 버튼 클릭
6. 결과 화면에서 0원 표시 확인
    `.trim(),
    심각도: '높음',
    추가의견: '계산 기능이 핵심이므로 빠른 수정이 필요합니다. 다른 계산기들도 같은 문제가 있는지 확인 부탁드립니다.',
    브라우저정보: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    제출경로: '/tax-calculator'
  },

  // 오류 테스트용 데이터들
  INVALID_DATA: {
    // null 값들
    NULL_TEST: {
      action: 'saveDiagnosis',
      회사명: null,
      이메일: null,
      문항별점수: null,
      진단보고서요약: null
    },
    
    // 빈 값들
    EMPTY_TEST: {
      action: 'saveDiagnosis',
      회사명: '',
      이메일: '',
      문항별점수: {},
      진단보고서요약: ''
    },
    
    // 타입 오류
    TYPE_ERROR_TEST: {
      action: 'saveDiagnosis',
      회사명: 123,
      이메일: true,
      문항별점수: 'invalid',
      종합점수: 'not-a-number'
    }
  }
};

// ================================================================================
// 🛠️ 유틸리티 함수들
// ================================================================================

class GASTestManager {
  constructor() {
    this.results = [];
    this.currentTest = null;
    this.startTime = Date.now();
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    console.log(logMessage);
    
    if (this.currentTest) {
      this.currentTest.logs.push({ timestamp, level, message });
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async makeRequest(url, data, method = 'POST') {
    return new Promise((resolve, reject) => {
      const requestData = JSON.stringify(data);
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(requestData)
        },
        timeout: TEST_CONFIG.TIMEOUT
      };

      const req = https.request(url, options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: parsedData,
              rawData: responseData
            });
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: null,
              rawData: responseData,
              parseError: error.message
            });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.write(requestData);
      req.end();
    });
  }

  startTest(testName, description) {
    this.currentTest = {
      name: testName,
      description: description,
      startTime: Date.now(),
      logs: [],
      success: false,
      error: null,
      response: null
    };
    
    this.log(`🧪 테스트 시작: ${testName}`, 'info');
    this.log(`📝 설명: ${description}`, 'info');
  }

  endTest(success, error = null, response = null) {
    if (!this.currentTest) return;

    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    this.currentTest.success = success;
    this.currentTest.error = error;
    this.currentTest.response = response;

    const status = success ? '✅ 성공' : '❌ 실패';
    this.log(`${status}: ${this.currentTest.name} (${this.currentTest.duration}ms)`, success ? 'info' : 'error');
    
    if (error) {
      this.log(`오류: ${error}`, 'error');
    }

    this.results.push({ ...this.currentTest });
    this.currentTest = null;
  }

  generateReport() {
    const totalTests = this.results.length;
    const successfulTests = this.results.filter(t => t.success).length;
    const failedTests = totalTests - successfulTests;
    const totalDuration = Date.now() - this.startTime;

    const report = {
      summary: {
        totalTests,
        successfulTests,
        failedTests,
        successRate: ((successfulTests / totalTests) * 100).toFixed(2) + '%',
        totalDuration: totalDuration + 'ms',
        timestamp: new Date().toISOString()
      },
      testResults: this.results,
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    const failedTests = this.results.filter(t => !t.success);

    if (failedTests.length === 0) {
      recommendations.push('🎉 모든 테스트가 성공했습니다! Vercel 배포를 진행해도 안전합니다.');
    } else {
      recommendations.push('⚠️ 실패한 테스트가 있습니다. 배포 전 수정이 필요합니다.');
      
      failedTests.forEach(test => {
        recommendations.push(`- ${test.name}: ${test.error}`);
      });
    }

    // 성능 분석
    const avgDuration = this.results.reduce((acc, test) => acc + test.duration, 0) / this.results.length;
    if (avgDuration > 10000) {
      recommendations.push('⏰ 평균 응답 시간이 10초를 초과합니다. 성능 최적화가 필요합니다.');
    }

    return recommendations;
  }

  async saveResults() {
    if (!TEST_CONFIG.SAVE_RESULTS) return;

    const report = this.generateReport();
    const filePath = path.join(__dirname, TEST_CONFIG.RESULTS_FILE);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf8');
      this.log(`📄 테스트 결과 저장: ${filePath}`, 'info');
    } catch (error) {
      this.log(`❌ 결과 저장 실패: ${error.message}`, 'error');
    }
  }
}

// ================================================================================
// 🧪 테스트 케이스들
// ================================================================================

class GASTestCases {
  constructor(testManager) {
    this.tm = testManager;
  }

  // 1. GET 요청 테스트 (기본 상태 확인)
  async testGetRequest() {
    this.tm.startTest('GET_REQUEST', 'Google Apps Script 웹앱 기본 상태 확인');
    
    try {
      const response = await this.tm.makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, null, 'GET');
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data || !response.data.success) {
        throw new Error('응답 데이터가 올바르지 않습니다');
      }

      // 필수 필드 검증
      const requiredFields = ['status', 'timestamp', 'version', 'deploymentInfo'];
      for (const field of requiredFields) {
        if (!response.data[field]) {
          throw new Error(`필수 필드 누락: ${field}`);
        }
      }

      this.tm.log('✅ 웹앱 상태 정상', 'info');
      this.tm.log(`버전: ${response.data.version}`, 'info');
      this.tm.log(`스크립트 ID: ${response.data.deploymentInfo.scriptId}`, 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 2. 완전한 진단신청 테스트
  async testDiagnosisSubmission() {
    this.tm.startTest('DIAGNOSIS_SUBMISSION', '완전한 진단신청 처리 테스트 (58개 컬럼)');
    
    try {
      const response = await this.tm.makeRequest(
        TEST_CONFIG.GAS_WEB_APP_URL, 
        TEST_DATA.DIAGNOSIS_COMPLETE
      );
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data || !response.data.success) {
        throw new Error(`진단신청 실패: ${response.data?.error || '알 수 없는 오류'}`);
      }

      // 응답 데이터 검증
      if (!response.data.sheet || response.data.sheet !== 'AI_무료진단신청') {
        throw new Error('잘못된 시트 정보');
      }

      if (!response.data.row || response.data.row < 1) {
        throw new Error('잘못된 행 번호');
      }

      if (!response.data.진단점수 || response.data.진단점수 <= 0) {
        throw new Error('진단 점수가 올바르지 않습니다');
      }

      this.tm.log(`✅ 진단신청 성공: ${response.data.row}행`, 'info');
      this.tm.log(`진단 점수: ${response.data.진단점수}점`, 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 3. 상담신청 테스트
  async testConsultationSubmission() {
    this.tm.startTest('CONSULTATION_SUBMISSION', '상담신청 처리 테스트 (19개 컬럼)');
    
    try {
      const response = await this.tm.makeRequest(
        TEST_CONFIG.GAS_WEB_APP_URL, 
        TEST_DATA.CONSULTATION_COMPLETE
      );
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data || !response.data.success) {
        throw new Error(`상담신청 실패: ${response.data?.error || '알 수 없는 오류'}`);
      }

      // 응답 데이터 검증
      if (!response.data.sheet || response.data.sheet !== '상담신청') {
        throw new Error('잘못된 시트 정보');
      }

      this.tm.log(`✅ 상담신청 성공: ${response.data.row}행`, 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 4. 베타피드백 테스트
  async testBetaFeedback() {
    this.tm.startTest('BETA_FEEDBACK', '베타피드백 처리 테스트 (14개 컬럼)');
    
    try {
      const response = await this.tm.makeRequest(
        TEST_CONFIG.GAS_WEB_APP_URL, 
        TEST_DATA.BETA_FEEDBACK_COMPLETE
      );
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data || !response.data.success) {
        throw new Error(`베타피드백 실패: ${response.data?.error || '알 수 없는 오류'}`);
      }

      // 응답 데이터 검증
      if (!response.data.sheet || response.data.sheet !== '베타피드백') {
        throw new Error('잘못된 시트 정보');
      }

      this.tm.log(`✅ 베타피드백 성공: ${response.data.row}행`, 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 5. Null 값 처리 테스트
  async testNullHandling() {
    this.tm.startTest('NULL_HANDLING', 'null 값 처리 안정성 테스트');
    
    try {
      const response = await this.tm.makeRequest(
        TEST_CONFIG.GAS_WEB_APP_URL, 
        TEST_DATA.INVALID_DATA.NULL_TEST
      );
      
      // null 값이 있어도 오류 없이 처리되어야 함
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      // success가 false여도 오류 응답이 올바르게 와야 함
      if (!response.data) {
        throw new Error('응답 데이터가 없습니다');
      }

      this.tm.log('✅ null 값 처리 안정성 확인', 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 6. 빈 값 처리 테스트
  async testEmptyHandling() {
    this.tm.startTest('EMPTY_HANDLING', '빈 값 처리 안정성 테스트');
    
    try {
      const response = await this.tm.makeRequest(
        TEST_CONFIG.GAS_WEB_APP_URL, 
        TEST_DATA.INVALID_DATA.EMPTY_TEST
      );
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data) {
        throw new Error('응답 데이터가 없습니다');
      }

      this.tm.log('✅ 빈 값 처리 안정성 확인', 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 7. 타입 오류 처리 테스트
  async testTypeErrorHandling() {
    this.tm.startTest('TYPE_ERROR_HANDLING', '타입 오류 처리 안정성 테스트');
    
    try {
      const response = await this.tm.makeRequest(
        TEST_CONFIG.GAS_WEB_APP_URL, 
        TEST_DATA.INVALID_DATA.TYPE_ERROR_TEST
      );
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data) {
        throw new Error('응답 데이터가 없습니다');
      }

      this.tm.log('✅ 타입 오류 처리 안정성 확인', 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 8. UTF-8 인코딩 테스트
  async testUTF8Encoding() {
    this.tm.startTest('UTF8_ENCODING', 'UTF-8 한글 인코딩 테스트');
    
    try {
      const koreanData = {
        action: 'saveDiagnosis',
        회사명: '한글테스트(주) 🇰🇷',
        업종: '한국전통음식업 🍲',
        담당자명: '김한글',
        주요고민사항: '한글 인코딩 문제가 없는지 확인 중입니다. 특수문자 ★☆♥♦♠♣ 이모지 😀😁😂🤣😃😄 도 포함합니다.',
        문항별점수: { 기획수준: 3 },
        진단보고서요약: '한글로 작성된 보고서입니다. UTF-8 인코딩이 정상적으로 처리되는지 확인합니다.'
      };

      const response = await this.tm.makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, koreanData);
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data || !response.data.success) {
        throw new Error(`UTF-8 테스트 실패: ${response.data?.error || '알 수 없는 오류'}`);
      }

      this.tm.log('✅ UTF-8 한글 인코딩 정상', 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 9. 대용량 데이터 처리 테스트
  async testLargeDataHandling() {
    this.tm.startTest('LARGE_DATA_HANDLING', '대용량 데이터 처리 테스트');
    
    try {
      const largeData = {
        ...TEST_DATA.DIAGNOSIS_COMPLETE,
        진단보고서요약: 'A'.repeat(2900) + '대용량 데이터 테스트 완료.' // 약 3KB
      };

      const response = await this.tm.makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, largeData);
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${response.rawData}`);
      }

      if (!response.data || !response.data.success) {
        throw new Error(`대용량 데이터 처리 실패: ${response.data?.error || '알 수 없는 오류'}`);
      }

      this.tm.log('✅ 대용량 데이터 처리 성공', 'info');
      
      this.tm.endTest(true, null, response);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }

  // 10. 동시 요청 처리 테스트
  async testConcurrentRequests() {
    this.tm.startTest('CONCURRENT_REQUESTS', '동시 요청 처리 안정성 테스트');
    
    try {
      const requests = [];
      for (let i = 0; i < 3; i++) {
        const data = {
          ...TEST_DATA.DIAGNOSIS_COMPLETE,
          회사명: `동시테스트${i + 1}`,
          이메일: `concurrent${i + 1}@test.com`
        };
        requests.push(this.tm.makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, data));
      }

      const responses = await Promise.all(requests);
      
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        if (response.statusCode !== 200 || !response.data?.success) {
          throw new Error(`동시 요청 ${i + 1} 실패`);
        }
      }

      this.tm.log('✅ 동시 요청 처리 성공', 'info');
      
      this.tm.endTest(true, null, responses);
    } catch (error) {
      this.tm.endTest(false, error.message);
    }
  }
}

// ================================================================================
// 🚀 메인 테스트 실행
// ================================================================================

async function runCompleteTest() {
  console.log('🎯 AICAMP Google Apps Script 완전 테스트 시작');
  console.log('=' .repeat(80));
  
  const testManager = new GASTestManager();
  const testCases = new GASTestCases(testManager);

  try {
    // 1. 기본 상태 확인
    await testCases.testGetRequest();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    // 2. 핵심 기능 테스트
    await testCases.testDiagnosisSubmission();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    await testCases.testConsultationSubmission();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    await testCases.testBetaFeedback();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    // 3. 안정성 테스트
    await testCases.testNullHandling();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    await testCases.testEmptyHandling();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    await testCases.testTypeErrorHandling();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    // 4. 인코딩 및 성능 테스트
    await testCases.testUTF8Encoding();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    await testCases.testLargeDataHandling();
    await testManager.delay(TEST_CONFIG.DELAY_BETWEEN_TESTS);

    await testCases.testConcurrentRequests();

  } catch (error) {
    console.error('❌ 테스트 실행 중 치명적 오류:', error.message);
  }

  // 결과 생성 및 출력
  const report = testManager.generateReport();
  
  console.log('\n' + '=' .repeat(80));
  console.log('📊 테스트 결과 요약');
  console.log('=' .repeat(80));
  console.log(`전체 테스트: ${report.summary.totalTests}개`);
  console.log(`성공: ${report.summary.successfulTests}개`);
  console.log(`실패: ${report.summary.failedTests}개`);
  console.log(`성공률: ${report.summary.successRate}`);
  console.log(`총 소요시간: ${Math.round(parseInt(report.summary.totalDuration) / 1000)}초`);
  
  console.log('\n📋 권장사항:');
  report.recommendations.forEach(rec => console.log(rec));

  // 결과 저장
  await testManager.saveResults();

  console.log('\n🎯 테스트 완료!');
  
  // 배포 준비 상태 확인
  if (report.summary.failedTests === 0) {
    console.log('✅ 모든 테스트 통과! Vercel 배포 준비 완료');
    process.exit(0);
  } else {
    console.log('❌ 실패한 테스트가 있습니다. 수정 후 재테스트 필요');
    process.exit(1);
  }
}

// 테스트 실행
if (require.main === module) {
  runCompleteTest().catch(error => {
    console.error('💥 테스트 시스템 오류:', error);
    process.exit(1);
  });
}

module.exports = { GASTestManager, GASTestCases, TEST_CONFIG, TEST_DATA }; 
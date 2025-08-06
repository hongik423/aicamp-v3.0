#!/usr/bin/env node

/**
 * 🔍 AICAMP 데이터 유효성 검증 및 엣지 케이스 테스트
 * 다양한 입력 데이터 패턴을 테스트하여 시스템의 견고성을 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 데이터 검증 테스트 설정
const DATA_VALIDATION_CONFIG = {
  // 테스트 카테고리
  testCategories: [
    'required_fields',
    'data_types',
    'field_lengths',
    'special_characters',
    'injection_attacks',
    'encoding_issues',
    'boundary_values',
    'malformed_data'
  ],

  // 필수 필드 테스트
  requiredFieldTests: [
    {
      name: '모든 필수 필드 누락',
      data: {},
      expectedError: 'Missing required fields',
      severity: 'critical'
    },
    {
      name: '회사명 누락',
      data: {
        industry: ['제조업'],
        contactManager: '테스트',
        email: 'test@test.com',
        employeeCount: '10-49명',
        privacyConsent: true
      },
      expectedError: 'companyName is required',
      severity: 'critical'
    },
    {
      name: '이메일 누락',
      data: {
        companyName: '테스트회사',
        industry: ['제조업'],
        contactManager: '테스트',
        employeeCount: '10-49명',
        privacyConsent: true
      },
      expectedError: 'email is required',
      severity: 'critical'
    },
    {
      name: '개인정보 동의 누락',
      data: {
        companyName: '테스트회사',
        industry: ['제조업'],
        contactManager: '테스트',
        email: 'test@test.com',
        employeeCount: '10-49명'
      },
      expectedError: 'privacyConsent is required',
      severity: 'critical'
    }
  ],

  // 데이터 타입 테스트
  dataTypeTests: [
    {
      name: '잘못된 이메일 형식',
      data: {
        companyName: '테스트회사',
        email: 'invalid-email',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'Invalid email format',
      severity: 'high'
    },
    {
      name: '숫자형 회사명',
      data: {
        companyName: 12345,
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'companyName must be string',
      severity: 'medium'
    },
    {
      name: '배열이 아닌 업종',
      data: {
        companyName: '테스트회사',
        industry: '제조업', // 문자열 (배열이어야 함)
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'industry must be array',
      severity: 'medium'
    },
    {
      name: '문자열이 아닌 전화번호',
      data: {
        companyName: '테스트회사',
        email: 'test@test.com',
        phone: 1234567890, // 숫자 (문자열이어야 함)
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'phone must be string',
      severity: 'low'
    }
  ],

  // 필드 길이 테스트
  fieldLengthTests: [
    {
      name: '회사명 너무 길음',
      data: {
        companyName: 'A'.repeat(500), // 500자
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'companyName too long',
      severity: 'medium'
    },
    {
      name: '회사명 너무 짧음',
      data: {
        companyName: 'A', // 1자
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'companyName too short',
      severity: 'low'
    },
    {
      name: '사업 상세 설명 너무 길음',
      data: {
        companyName: '테스트회사',
        businessDetails: 'A'.repeat(10000), // 10,000자
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'businessDetails too long',
      severity: 'medium'
    },
    {
      name: '이메일 주소 너무 길음',
      data: {
        companyName: '테스트회사',
        email: 'A'.repeat(250) + '@test.com', // 매우 긴 이메일
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'email too long',
      severity: 'medium'
    }
  ],

  // 특수 문자 테스트
  specialCharacterTests: [
    {
      name: 'HTML 태그 포함',
      data: {
        companyName: '<script>alert("XSS")</script>테스트회사',
        email: 'test@test.com',
        contactManager: '<b>테스트</b>',
        privacyConsent: true
      },
      expectedError: 'Invalid characters detected',
      severity: 'high'
    },
    {
      name: 'SQL 인젝션 시도',
      data: {
        companyName: "'; DROP TABLE companies; --",
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'Potential SQL injection',
      severity: 'critical'
    },
    {
      name: '특수 유니코드 문자',
      data: {
        companyName: '테스트회사™®©',
        businessDetails: '🚀🔥💯 특수 이모지 포함',
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: null, // 정상 처리되어야 함
      severity: 'low'
    },
    {
      name: '제어 문자 포함',
      data: {
        companyName: '테스트\x00\x01\x02회사',
        email: 'test@test.com',
        contactManager: '테스트',
        privacyConsent: true
      },
      expectedError: 'Control characters not allowed',
      severity: 'high'
    }
  ],

  // 인코딩 이슈 테스트
  encodingTests: [
    {
      name: 'UTF-8 한글 문자',
      data: {
        companyName: '한글테스트회사',
        businessDetails: '한글로 작성된 사업 설명입니다.',
        contactManager: '김한글',
        email: 'test@test.com',
        privacyConsent: true
      },
      expectedError: null, // 정상 처리되어야 함
      severity: 'low'
    },
    {
      name: '일본어 문자',
      data: {
        companyName: 'テスト会社',
        businessDetails: '日本語のビジネス説明です。',
        contactManager: '田中太郎',
        email: 'test@test.com',
        privacyConsent: true
      },
      expectedError: null, // 정상 처리되어야 함
      severity: 'low'
    },
    {
      name: '중국어 문자',
      data: {
        companyName: '测试公司',
        businessDetails: '中文业务说明。',
        contactManager: '张三',
        email: 'test@test.com',
        privacyConsent: true
      },
      expectedError: null, // 정상 처리되어야 함
      severity: 'low'
    }
  ],

  // 경계값 테스트
  boundaryValueTests: [
    {
      name: '평가 점수 최솟값',
      data: {
        companyName: '테스트회사',
        email: 'test@test.com',
        contactManager: '테스트',
        planning_level: 1, // 최솟값
        differentiation_level: 1,
        pricing_level: 1,
        privacyConsent: true
      },
      expectedError: null,
      severity: 'low'
    },
    {
      name: '평가 점수 최댓값',
      data: {
        companyName: '테스트회사',
        email: 'test@test.com',
        contactManager: '테스트',
        planning_level: 5, // 최댓값
        differentiation_level: 5,
        pricing_level: 5,
        privacyConsent: true
      },
      expectedError: null,
      severity: 'low'
    },
    {
      name: '평가 점수 범위 초과 (상한)',
      data: {
        companyName: '테스트회사',
        email: 'test@test.com',
        contactManager: '테스트',
        planning_level: 10, // 범위 초과
        differentiation_level: 5,
        pricing_level: 5,
        privacyConsent: true
      },
      expectedError: 'Score out of range',
      severity: 'medium'
    },
    {
      name: '평가 점수 범위 미만 (하한)',
      data: {
        companyName: '테스트회사',
        email: 'test@test.com',
        contactManager: '테스트',
        planning_level: 0, // 범위 미만
        differentiation_level: 5,
        pricing_level: 5,
        privacyConsent: true
      },
      expectedError: 'Score out of range',
      severity: 'medium'
    }
  ],

  // 형식 오류 테스트
  malformedDataTests: [
    {
      name: 'JSON 형식 오류',
      rawData: '{"companyName": "테스트회사", "email": "test@test.com"', // 닫는 괄호 누락
      expectedError: 'Malformed JSON',
      severity: 'high'
    },
    {
      name: '순환 참조 객체',
      data: (() => {
        const obj = { companyName: '테스트회사', email: 'test@test.com' };
        obj.self = obj; // 순환 참조
        return obj;
      })(),
      expectedError: 'Circular reference',
      severity: 'medium'
    },
    {
      name: '빈 객체',
      data: {},
      expectedError: 'Empty data object',
      severity: 'medium'
    },
    {
      name: 'null 데이터',
      data: null,
      expectedError: 'Null data',
      severity: 'high'
    }
  ]
};

// 데이터 검증 테스터 클래스
class DataValidationTester {
  constructor(config) {
    this.config = config;
    this.results = [];
    this.validationErrors = [];
    this.securityIssues = [];
    this.startTime = Date.now();
  }

  // 메인 테스트 실행
  async runValidationTests() {
    console.log('🔍 AICAMP 데이터 유효성 검증 및 엣지 케이스 테스트 시작\n');
    
    // 1. 필수 필드 테스트
    await this.testRequiredFields();
    
    // 2. 데이터 타입 테스트
    await this.testDataTypes();
    
    // 3. 필드 길이 테스트
    await this.testFieldLengths();
    
    // 4. 특수 문자 테스트
    await this.testSpecialCharacters();
    
    // 5. 인코딩 이슈 테스트
    await this.testEncodingIssues();
    
    // 6. 경계값 테스트
    await this.testBoundaryValues();
    
    // 7. 형식 오류 테스트
    await this.testMalformedData();
    
    // 8. 대용량 데이터 테스트
    await this.testLargeDataSets();
    
    // 9. 동시 요청 테스트
    await this.testConcurrentValidation();
    
    // 10. 결과 분석 및 리포트 생성
    this.generateValidationReport();
    
    return this.getTestSummary();
  }

  // 필수 필드 테스트
  async testRequiredFields() {
    console.log('📋 필수 필드 테스트');
    
    for (const test of this.config.requiredFieldTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        const result = await this.validateData(test.data, test.expectedError);
        this.addResult(`required-${test.name}`, result, test.severity);
        
        if (result.hasError && test.expectedError) {
          console.log(`    ✅ 예상된 오류 정상 감지: ${result.error}`);
        } else if (!result.hasError && !test.expectedError) {
          console.log(`    ✅ 정상 처리`);
        } else {
          console.log(`    ❌ 예상과 다른 결과`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`required-${test.name}`, { hasError: true, error: error.message }, 'critical');
      }
    }
  }

  // 데이터 타입 테스트
  async testDataTypes() {
    console.log('\n🔤 데이터 타입 테스트');
    
    for (const test of this.config.dataTypeTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        const result = await this.validateData(test.data, test.expectedError);
        this.addResult(`datatype-${test.name}`, result, test.severity);
        
        if (result.hasError && test.expectedError) {
          console.log(`    ✅ 타입 오류 정상 감지`);
        } else if (!result.hasError && !test.expectedError) {
          console.log(`    ✅ 타입 검증 통과`);
        } else {
          console.log(`    ⚠️ 예상과 다른 결과`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`datatype-${test.name}`, { hasError: true, error: error.message }, 'high');
      }
    }
  }

  // 필드 길이 테스트
  async testFieldLengths() {
    console.log('\n📏 필드 길이 테스트');
    
    for (const test of this.config.fieldLengthTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        const result = await this.validateData(test.data, test.expectedError);
        this.addResult(`length-${test.name}`, result, test.severity);
        
        if (result.hasError && test.expectedError) {
          console.log(`    ✅ 길이 제한 오류 정상 감지`);
        } else if (!result.hasError && !test.expectedError) {
          console.log(`    ✅ 길이 검증 통과`);
        } else {
          console.log(`    ⚠️ 예상과 다른 결과`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`length-${test.name}`, { hasError: true, error: error.message }, 'medium');
      }
    }
  }

  // 특수 문자 테스트
  async testSpecialCharacters() {
    console.log('\n🔒 특수 문자 및 보안 테스트');
    
    for (const test of this.config.specialCharacterTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        const result = await this.validateData(test.data, test.expectedError);
        this.addResult(`special-${test.name}`, result, test.severity);
        
        // 보안 이슈 검사
        if (this.isSecurityThreat(test.data)) {
          this.securityIssues.push({
            testName: test.name,
            data: test.data,
            severity: test.severity
          });
        }
        
        if (result.hasError && test.expectedError) {
          console.log(`    ✅ 보안 위협 정상 차단`);
        } else if (!result.hasError && !test.expectedError) {
          console.log(`    ✅ 특수 문자 정상 처리`);
        } else {
          console.log(`    ⚠️ 보안 검증 필요`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`special-${test.name}`, { hasError: true, error: error.message }, 'critical');
      }
    }
  }

  // 인코딩 이슈 테스트
  async testEncodingIssues() {
    console.log('\n🌐 인코딩 이슈 테스트');
    
    for (const test of this.config.encodingTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        const result = await this.validateData(test.data, test.expectedError);
        this.addResult(`encoding-${test.name}`, result, test.severity);
        
        // UTF-8 인코딩 검증
        const encodingValid = this.validateEncoding(test.data);
        
        if (encodingValid && !result.hasError) {
          console.log(`    ✅ 인코딩 정상 처리`);
        } else if (!encodingValid) {
          console.log(`    ⚠️ 인코딩 이슈 감지`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`encoding-${test.name}`, { hasError: true, error: error.message }, 'medium');
      }
    }
  }

  // 경계값 테스트
  async testBoundaryValues() {
    console.log('\n🎯 경계값 테스트');
    
    for (const test of this.config.boundaryValueTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        const result = await this.validateData(test.data, test.expectedError);
        this.addResult(`boundary-${test.name}`, result, test.severity);
        
        if (result.hasError && test.expectedError) {
          console.log(`    ✅ 경계값 오류 정상 감지`);
        } else if (!result.hasError && !test.expectedError) {
          console.log(`    ✅ 경계값 정상 처리`);
        } else {
          console.log(`    ⚠️ 경계값 검증 필요`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`boundary-${test.name}`, { hasError: true, error: error.message }, 'medium');
      }
    }
  }

  // 형식 오류 테스트
  async testMalformedData() {
    console.log('\n🚨 형식 오류 테스트');
    
    for (const test of this.config.malformedDataTests) {
      console.log(`  🔍 ${test.name}`);
      
      try {
        let data = test.data;
        
        // 원시 데이터가 있는 경우 파싱 시도
        if (test.rawData) {
          try {
            data = JSON.parse(test.rawData);
          } catch (parseError) {
            data = null;
          }
        }
        
        const result = await this.validateData(data, test.expectedError);
        this.addResult(`malformed-${test.name}`, result, test.severity);
        
        if (result.hasError && test.expectedError) {
          console.log(`    ✅ 형식 오류 정상 감지`);
        } else {
          console.log(`    ⚠️ 형식 오류 처리 검토 필요`);
        }
        
      } catch (error) {
        console.log(`    ❌ 테스트 실행 오류: ${error.message}`);
        this.addResult(`malformed-${test.name}`, { hasError: true, error: error.message }, 'high');
      }
    }
  }

  // 대용량 데이터 테스트
  async testLargeDataSets() {
    console.log('\n📊 대용량 데이터 테스트');
    
    const largeDataTests = [
      {
        name: '매우 긴 텍스트 필드',
        data: {
          companyName: '테스트회사',
          businessDetails: 'A'.repeat(50000), // 50,000자
          email: 'test@test.com',
          contactManager: '테스트',
          privacyConsent: true
        },
        expectedPerformance: 5000 // 5초 이내
      },
      {
        name: '많은 평가 항목',
        data: this.generateLargeEvaluationData(),
        expectedPerformance: 3000 // 3초 이내
      }
    ];
    
    for (const test of largeDataTests) {
      console.log(`  🔍 ${test.name}`);
      
      const startTime = Date.now();
      
      try {
        const result = await this.validateData(test.data);
        const duration = Date.now() - startTime;
        
        if (duration > test.expectedPerformance) {
          console.log(`    ⚠️ 성능 이슈: ${duration}ms (예상: ${test.expectedPerformance}ms)`);
          this.addResult(`large-${test.name}`, { 
            hasError: false, 
            performanceIssue: true, 
            duration 
          }, 'medium');
        } else {
          console.log(`    ✅ 대용량 데이터 정상 처리 (${duration}ms)`);
          this.addResult(`large-${test.name}`, { 
            hasError: false, 
            duration 
          }, 'low');
        }
        
      } catch (error) {
        const duration = Date.now() - startTime;
        console.log(`    ❌ 대용량 데이터 처리 실패: ${error.message} (${duration}ms)`);
        this.addResult(`large-${test.name}`, { 
          hasError: true, 
          error: error.message, 
          duration 
        }, 'high');
      }
    }
  }

  // 동시 요청 테스트
  async testConcurrentValidation() {
    console.log('\n🔀 동시 검증 요청 테스트');
    
    const concurrentRequests = 10;
    const testData = {
      companyName: '동시테스트회사',
      email: 'concurrent@test.com',
      contactManager: '테스트',
      privacyConsent: true
    };
    
    console.log(`  🔍 ${concurrentRequests}개 동시 요청 테스트`);
    
    const startTime = Date.now();
    const promises = Array(concurrentRequests).fill().map((_, index) => 
      this.validateData({
        ...testData,
        companyName: `${testData.companyName}-${index}`
      })
    );
    
    try {
      const results = await Promise.all(promises);
      const duration = Date.now() - startTime;
      const successCount = results.filter(r => !r.hasError).length;
      
      console.log(`    결과: ${successCount}/${concurrentRequests} 성공 (${duration}ms)`);
      
      if (successCount === concurrentRequests && duration < 10000) {
        console.log(`    ✅ 동시 처리 성공`);
        this.addResult('concurrent-validation', { 
          hasError: false, 
          successRate: successCount / concurrentRequests,
          duration 
        }, 'low');
      } else {
        console.log(`    ⚠️ 동시 처리 성능 이슈`);
        this.addResult('concurrent-validation', { 
          hasError: false, 
          performanceIssue: true,
          successRate: successCount / concurrentRequests,
          duration 
        }, 'medium');
      }
      
    } catch (error) {
      console.log(`    ❌ 동시 처리 실패: ${error.message}`);
      this.addResult('concurrent-validation', { 
        hasError: true, 
        error: error.message 
      }, 'high');
    }
  }

  // 데이터 검증 시뮬레이션
  async validateData(data, expectedError = null) {
    // 실제 검증 로직 시뮬레이션
    await this.sleep(Math.random() * 100 + 50); // 50-150ms 랜덤 지연
    
    try {
      // 기본 검증 규칙들
      const validationResult = {
        hasError: false,
        error: null,
        warnings: []
      };
      
      // null 또는 undefined 체크
      if (data === null || data === undefined) {
        validationResult.hasError = true;
        validationResult.error = 'Data is null or undefined';
        return validationResult;
      }
      
      // 순환 참조 체크
      try {
        JSON.stringify(data);
      } catch (error) {
        if (error.message.includes('circular')) {
          validationResult.hasError = true;
          validationResult.error = 'Circular reference detected';
          return validationResult;
        }
      }
      
      // 필수 필드 체크
      if (typeof data === 'object' && data !== null) {
        const requiredFields = ['companyName', 'email', 'privacyConsent'];
        const missingFields = requiredFields.filter(field => !(field in data) || data[field] === null || data[field] === undefined);
        
        if (missingFields.length > 0) {
          validationResult.hasError = true;
          validationResult.error = `Missing required fields: ${missingFields.join(', ')}`;
          return validationResult;
        }
        
        // 이메일 형식 체크
        if (data.email && typeof data.email === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(data.email)) {
            validationResult.hasError = true;
            validationResult.error = 'Invalid email format';
            return validationResult;
          }
        }
        
        // 데이터 타입 체크
        if (data.companyName && typeof data.companyName !== 'string') {
          validationResult.hasError = true;
          validationResult.error = 'companyName must be string';
          return validationResult;
        }
        
        // 필드 길이 체크
        if (data.companyName && data.companyName.length > 200) {
          validationResult.hasError = true;
          validationResult.error = 'companyName too long';
          return validationResult;
        }
        
        if (data.companyName && data.companyName.length < 2) {
          validationResult.hasError = true;
          validationResult.error = 'companyName too short';
          return validationResult;
        }
        
        // 평가 점수 범위 체크
        const scoreFields = ['planning_level', 'differentiation_level', 'pricing_level'];
        for (const field of scoreFields) {
          if (data[field] !== undefined && data[field] !== null) {
            if (data[field] < 1 || data[field] > 5) {
              validationResult.hasError = true;
              validationResult.error = 'Score out of range';
              return validationResult;
            }
          }
        }
        
        // 보안 위협 체크
        if (this.isSecurityThreat(data)) {
          validationResult.hasError = true;
          validationResult.error = 'Security threat detected';
          return validationResult;
        }
      }
      
      return validationResult;
      
    } catch (error) {
      return {
        hasError: true,
        error: error.message,
        warnings: []
      };
    }
  }

  // 보안 위협 감지
  isSecurityThreat(data) {
    if (typeof data !== 'object' || data === null) return false;
    
    const threatPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // XSS
      /('|(\\')|(;|\\x3b)|(--|\\x2d\\x2d))/i, // SQL injection
      /\x00|\x01|\x02|\x03|\x04|\x05|\x06|\x07|\x08|\x0b|\x0c|\x0e|\x0f/g // Control characters
    ];
    
    const dataString = JSON.stringify(data);
    
    return threatPatterns.some(pattern => pattern.test(dataString));
  }

  // UTF-8 인코딩 검증
  validateEncoding(data) {
    try {
      const dataString = JSON.stringify(data);
      const encoded = Buffer.from(dataString, 'utf8');
      const decoded = encoded.toString('utf8');
      return dataString === decoded;
    } catch (error) {
      return false;
    }
  }

  // 대용량 평가 데이터 생성
  generateLargeEvaluationData() {
    const baseData = {
      companyName: '대용량테스트회사',
      email: 'large@test.com',
      contactManager: '테스트',
      privacyConsent: true
    };
    
    // 모든 평가 항목에 점수 추가
    const evaluationFields = [
      'planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level',
      'customer_greeting', 'customer_service', 'complaint_management', 'customer_retention', 'customer_understanding',
      'marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy',
      'purchase_management', 'inventory_management', 'exterior_management', 'interior_management',
      'cleanliness', 'work_flow'
    ];
    
    evaluationFields.forEach(field => {
      baseData[field] = Math.floor(Math.random() * 5) + 1; // 1-5 랜덤 점수
    });
    
    return baseData;
  }

  // 결과 추가
  addResult(testName, result, severity) {
    this.results.push({
      testName,
      success: !result.hasError,
      error: result.error,
      warnings: result.warnings || [],
      severity,
      duration: result.duration,
      performanceIssue: result.performanceIssue,
      timestamp: new Date().toISOString()
    });
  }

  // 테스트 요약 생성
  getTestSummary() {
    const totalTests = this.results.length;
    const successTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - successTests;
    const criticalIssues = this.results.filter(r => r.severity === 'critical').length;
    const highIssues = this.results.filter(r => r.severity === 'high').length;
    const mediumIssues = this.results.filter(r => r.severity === 'medium').length;
    
    return {
      summary: {
        totalTests,
        successTests,
        failedTests,
        successRate: `${((successTests / totalTests) * 100).toFixed(1)}%`,
        duration: `${((Date.now() - this.startTime) / 1000).toFixed(1)}초`,
        criticalIssues,
        highIssues,
        mediumIssues,
        securityIssues: this.securityIssues.length
      },
      results: this.results,
      securityIssues: this.securityIssues,
      validationErrors: this.validationErrors
    };
  }

  // 검증 리포트 생성
  generateValidationReport() {
    const summary = this.getTestSummary();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔍 데이터 유효성 검증 테스트 결과');
    console.log('='.repeat(80));
    
    const { summary: s } = summary;
    console.log(`총 테스트: ${s.totalTests}개`);
    console.log(`성공: ${s.successTests}개`);
    console.log(`실패: ${s.failedTests}개`);
    console.log(`성공률: ${s.successRate}`);
    console.log(`총 소요시간: ${s.duration}`);
    console.log(`심각한 이슈: ${s.criticalIssues}개`);
    console.log(`높은 이슈: ${s.highIssues}개`);
    console.log(`중간 이슈: ${s.mediumIssues}개`);
    console.log(`보안 이슈: ${s.securityIssues}개`);
    
    // 심각도별 결과
    console.log('\n📊 심각도별 결과:');
    ['critical', 'high', 'medium', 'low'].forEach(severity => {
      const count = this.results.filter(r => r.severity === severity).length;
      if (count > 0) {
        console.log(`  ${severity.toUpperCase()}: ${count}개`);
      }
    });
    
    // 보안 이슈 상세
    if (this.securityIssues.length > 0) {
      console.log('\n🚨 보안 이슈 상세:');
      this.securityIssues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.testName} (${issue.severity})`);
      });
    }
    
    // 성능 이슈
    const performanceIssues = this.results.filter(r => r.performanceIssue);
    if (performanceIssues.length > 0) {
      console.log('\n⚡ 성능 이슈:');
      performanceIssues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.testName}: ${issue.duration}ms`);
      });
    }
    
    // 결과 파일 저장
    const outputDir = './test-results';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'data-validation-test-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
    console.log(`\n💾 결과 저장됨: ${outputPath}`);
  }

  // 비동기 sleep 함수
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 메인 실행 함수
async function main() {
  try {
    const tester = new DataValidationTester(DATA_VALIDATION_CONFIG);
    const results = await tester.runValidationTests();
    
    // 종료 코드 설정
    const hasCriticalIssues = results.summary.criticalIssues > 0;
    const hasSecurityIssues = results.summary.securityIssues > 0;
    const hasHighFailureRate = parseFloat(results.summary.successRate) < 80;
    
    process.exit((hasCriticalIssues || hasSecurityIssues || hasHighFailureRate) ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ 데이터 검증 테스트 실행 중 오류:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { DataValidationTester, DATA_VALIDATION_CONFIG };
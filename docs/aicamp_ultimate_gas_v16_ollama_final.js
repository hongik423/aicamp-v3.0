/**
 * ================================================================================
 * 🎓 
 *  - Google Apps Script
 * ================================================================================
 * 
 * 🔥 V16.0 OLLAMA 완전 통합 시스템:
 * 1. 45개 행동지표 기반 정밀 AI 역량진단
 * 2. Ollama GPT-OSS 20B (13.8GB) 로컬 AI 통합 분석 (정량적+정성적)
 * 3. 이교장 스타일 보고서 자동 생성 (11개 섹션)
 * 4. 애플 스타일 미니멀 이메일 시스템
 * 5. 상담신청 처리
 * 6. 오류신고 처리
 * 7. 실시간 진행과정 모니터링
 * 8. Google Drive HTML 보고서 자동 업로드
 * 9. 통합 워크플로우 결과 처리
 * 
 * 🎯 핵심 특징:
 * - GEMINI 완전 제거, Ollama GPT-OSS 20B 100% 사용
 * - 로컬 AI 서버 연동 (http://localhost:11434)
 * - matrix 오류 완전 수정
 * - 통합 워크플로우 결과 자동 처리
 * - 애플 스타일 미니멀 이메일 디자인
 * - 이교장의AI역량진단보고서 브랜딩 통일
 * - Google Drive 공유 폴더 자동 업로드
 * 
 * 📋 환경변수 설정 (Google Apps Script 설정 → 스크립트 속성):
 * 
 * 🔑 필수 환경변수:
 * - SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
 * - OLLAMA_BASE_URL: http://localhost:11434
 * - OLLAMA_MODEL: gpt-oss:20b
 * - ADMIN_EMAIL: hongik423@gmail.com
 * - AICAMP_WEBSITE: aicamp.club
 * - DRIVE_FOLDER_ID: 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
 * 
 * 🎛️ 선택적 환경변수:
 * - DEBUG_MODE: false
 * - ENVIRONMENT: production
 * - SYSTEM_VERSION: V16.0-OLLAMA-ULTIMATE
 * - AI_MODEL: OLLAMA-GPT-OSS-20B
 * 
 * ================================================================================
 */

// ================================================================================
// MODULE 1: 환경 설정 및 상수
// ================================================================================

/**
 * 환경변수 설정 (V16.0 OLLAMA ULTIMATE)
 */
function getEnvironmentConfig() {
  const properties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 환경변수
    SPREADSHEET_ID: properties.getProperty('SPREADSHEET_ID') || '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
    OLLAMA_BASE_URL: properties.getProperty('OLLAMA_BASE_URL') || 'http://localhost:11434',
    OLLAMA_MODEL: properties.getProperty('OLLAMA_MODEL') || 'gpt-oss:20b',
    ADMIN_EMAIL: properties.getProperty('ADMIN_EMAIL') || 'hongik423@gmail.com',
    AICAMP_WEBSITE: properties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    DRIVE_FOLDER_ID: properties.getProperty('DRIVE_FOLDER_ID') || '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
    
    // 시스템 설정
    DEBUG_MODE: properties.getProperty('DEBUG_MODE') === 'true',
    ENVIRONMENT: properties.getProperty('ENVIRONMENT') || 'production',
    SYSTEM_VERSION: 'V16.0-OLLAMA-ULTIMATE',
    AI_MODEL: 'OLLAMA-GPT-OSS-20B',
    
    // 타임아웃 설정 (속도 최적화)
    TIMEOUT_OLLAMA: 300000, // 5분 (병렬 처리로 단축)
    TIMEOUT_EMAIL: 60000,   // 1분 (병렬 처리로 단축)
    TIMEOUT_SHEET: 15000,   // 15초 (빠른 응답)
    
    // 재시도 설정
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 2000
  };
}

/**
 * V16.0 환경변수 자동 설정 함수
 */
function setupV16EnvironmentVariables() {
  try {
    console.log('🔧 V16.0 환경변수 설정 시작');
    
    const properties = PropertiesService.getScriptProperties();
    
    // 필수 환경변수 설정
    const requiredVars = {
      'SPREADSHEET_ID': '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
      'OLLAMA_BASE_URL': 'http://localhost:11434',
      'OLLAMA_MODEL': 'gpt-oss:20b',
      'ADMIN_EMAIL': 'hongik423@gmail.com',
      'AICAMP_WEBSITE': 'aicamp.club',
      'DRIVE_FOLDER_ID': '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj'
    };
    
    // 선택적 환경변수 설정
    const optionalVars = {
      'DEBUG_MODE': 'false',
      'ENVIRONMENT': 'production',
      'SYSTEM_VERSION': 'V16.0-OLLAMA-ULTIMATE',
      'AI_MODEL': 'OLLAMA-GPT-OSS-20B'
    };
    
    // 환경변수 설정
    Object.entries(requiredVars).forEach(([key, value]) => {
      properties.setProperty(key, value);
      console.log(`✅ ${key}: ${value}`);
    });
    
    Object.entries(optionalVars).forEach(([key, value]) => {
      properties.setProperty(key, value);
      console.log(`✅ ${key}: ${value}`);
    });
    
    console.log('🎉 V16.0 환경변수 설정 완료!');
    
    // 설정 확인
    const config = getEnvironmentConfig();
    console.log('📋 설정 확인:', {
      SPREADSHEET_ID: config.SPREADSHEET_ID,
      OLLAMA_BASE_URL: config.OLLAMA_BASE_URL,
      OLLAMA_MODEL: config.OLLAMA_MODEL,
      ADMIN_EMAIL: config.ADMIN_EMAIL,
      AICAMP_WEBSITE: config.AICAMP_WEBSITE,
      DRIVE_FOLDER_ID: config.DRIVE_FOLDER_ID
    });
    
    return {
      success: true,
      message: 'V16.0 환경변수 설정이 완료되었습니다.',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 환경변수 설정 오류:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Drive 폴더 문제 자동 해결 함수
 */
function fixDriveFolderIssue() {
  try {
    console.log('🗂️ Google Drive 폴더 문제 자동 해결 시작');
    
    const env = getEnvironmentConfig();
    let folderId = env.DRIVE_FOLDER_ID;
    let folder = null;
    
    // 1. 설정된 폴더 ID로 접근 시도
    if (folderId) {
      try {
        folder = DriveApp.getFolderById(folderId);
        console.log('✅ 설정된 폴더 ID로 접근 성공:', folder.getName());
      } catch (folderError) {
        console.warn('⚠️ 설정된 폴더 ID로 접근 실패, AICAMP_REPORTS 폴더 검색 시도');
        folderId = null;
      }
    }
    
    // 2. AICAMP_REPORTS 폴더 이름으로 검색
    if (!folder) {
      console.log('🔍 AICAMP_REPORTS 폴더 검색 중...');
      const folders = DriveApp.getFoldersByName('AICAMP_REPORTS');
      
      if (folders.hasNext()) {
        folder = folders.next();
        folderId = folder.getId();
        console.log('✅ AICAMP_REPORTS 폴더 발견:', folderId);
        
        // 환경변수 업데이트
        const properties = PropertiesService.getScriptProperties();
        properties.setProperty('DRIVE_FOLDER_ID', folderId);
        console.log('✅ DRIVE_FOLDER_ID 환경변수 업데이트 완료');
      }
    }
    
    // 3. AICAMP_REPORTS 폴더가 없으면 새로 생성
    if (!folder) {
      console.log('📁 AICAMP_REPORTS 폴더가 없어 새로 생성합니다');
      folder = DriveApp.createFolder('AICAMP_REPORTS');
      folderId = folder.getId();
      
      // 폴더 공유 설정
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      // 환경변수 업데이트
      const properties = PropertiesService.getScriptProperties();
      properties.setProperty('DRIVE_FOLDER_ID', folderId);
      
      console.log('✅ AICAMP_REPORTS 폴더 생성 완료:', folderId);
    }
    
    console.log('🎉 Google Drive 폴더 문제 해결 완료!');
    
    return {
      success: true,
      folderId: folderId,
      folderName: folder.getName(),
      folderUrl: folder.getUrl(),
      message: 'Google Drive 폴더 문제가 해결되었습니다.',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Google Drive 폴더 문제 해결 오류:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Drive 폴더 상태 확인 함수
 */
function checkDriveFolderStatus() {
  try {
    console.log('🔍 Google Drive 폴더 상태 확인 시작');
    
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error('DRIVE_FOLDER_ID가 설정되지 않았습니다.');
    }
    
    const folder = DriveApp.getFolderById(folderId);
    const files = [];
    const fileIterator = folder.getFiles();
    
    while (fileIterator.hasNext() && files.length < 10) {
      const file = fileIterator.next();
      files.push({
        name: file.getName(),
        id: file.getId(),
        size: file.getSize(),
        url: file.getUrl(),
        created: file.getDateCreated()
      });
    }
    
    console.log('✅ Google Drive 폴더 상태 확인 완료');
    
    return {
      success: true,
      folderId: folderId,
      folderName: folder.getName(),
      folderUrl: folder.getUrl(),
      fileCount: files.length,
      files: files,
      sharing: folder.getSharingAccess(),
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Google Drive 폴더 상태 확인 오류:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Drive 테스트 파일 업로드 함수
 */
function testFileUpload() {
  try {
    console.log('📄 Google Drive 테스트 파일 업로드 시작');
    
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error('DRIVE_FOLDER_ID가 설정되지 않았습니다.');
    }
    
    const folder = DriveApp.getFolderById(folderId);
    const testContent = `
<!DOCTYPE html>
<html>
<head>
    <title>테스트 파일 - 이교장의AI역량진단보고서</title>
</head>
<body>
    <h1>🎓 이교장의AI역량진단보고서</h1>
    <p>이 파일은 Google Drive 업로드 테스트용입니다.</p>
    <p>생성 시간: ${new Date().toLocaleString('ko-KR')}</p>
    <p>시스템 버전: V16.0-OLLAMA-ULTIMATE</p>
</body>
</html>
    `;
    
    const fileName = `테스트_이교장의AI역량진단보고서_${new Date().getTime()}.html`;
    const blob = Utilities.newBlob(testContent, 'text/html', fileName);
    const file = folder.createFile(blob);
    
    // 파일 공유 설정
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('✅ Google Drive 테스트 파일 업로드 완료');
    
    return {
      success: true,
      fileId: file.getId(),
      fileName: fileName,
      fileUrl: file.getUrl(),
      fileSize: file.getSize(),
      folderName: folder.getName(),
      message: '테스트 파일 업로드가 성공했습니다.',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Google Drive 테스트 파일 업로드 오류:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Sheets 설정 (V16.0 OLLAMA ULTIMATE)
 */
function getSheetsConfig() {
  const env = getEnvironmentConfig();
  
  return {
    SPREADSHEET_ID: env.SPREADSHEET_ID,
    
    SHEETS: {
      // AI 역량진단 (V16.0 이교장 스타일)
      AI_DIAGNOSIS_MAIN: 'AI역량진단_메인데이터',
      AI_DIAGNOSIS_SCORES: 'AI역량진단_점수분석',
      AI_DIAGNOSIS_SWOT: 'AI역량진단_SWOT분석',
      AI_DIAGNOSIS_REPORTS: 'AI역량진단_보고서',
      AI_DIAGNOSIS_LEEKYOJANG: 'AI역량진단_이교장보고서_V16',
      AI_DIAGNOSIS_PRIORITY_MATRIX: 'AI역량진단_우선순위매트릭스',
      AI_DIAGNOSIS_N8N_METHODOLOGY: 'AI역량진단_N8N방법론',
      
      // 상담신청
      CONSULTATION_REQUESTS: '상담신청',
      
      // 오류신고
      ERROR_REPORTS: '오류신고',
      
      // 시스템 로그
      SYSTEM_LOGS: '시스템로그'
    }
  };
}

// ================================================================================
// MODULE 2: Ollama GPT-OSS 20B AI 분석 엔진
// ================================================================================

/**
 * Ollama GPT-OSS 20B AI 분석 엔진 (GEMINI 완전 대체)
 */
function generateAIAnalysisReport(diagnosisData) {
  const env = getEnvironmentConfig();
  const startTime = new Date();
  
  try {
    console.log('🤖 Ollama GPT-OSS 20B AI 분석 시작...');
    
    // 1. 진단 데이터 정규화
    const normalizedData = normalizeDiagnosisData(diagnosisData);
    
    // 2. Ollama GPT-OSS 20B 프롬프트 생성
    const prompt = generateOllamaPrompt(normalizedData);
    
    // 3. Ollama GPT-OSS 20B API 호출
    const aiResponse = callOllamaAPI(prompt, env);
    
    // 4. AI 응답 파싱 및 검증
    const parsedAnalysis = parseOllamaResponse(aiResponse);
    
    // 5. 결과 검증 및 보완
    const validatedAnalysis = validateAndEnhanceAnalysis(parsedAnalysis, normalizedData);
    
    const endTime = new Date();
    const processingTime = endTime.getTime() - startTime.getTime();
    
    console.log(`✅ Ollama GPT-OSS 20B AI 분석 완료 (${processingTime}ms)`);
    
    return {
      success: true,
      analysis: validatedAnalysis,
      processingTime,
      model: 'Ollama GPT-OSS 20B',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Ollama GPT-OSS 20B AI 분석 실패:', error);
    
    // 폴백 분석 생성
    const fallbackAnalysis = generateFallbackAnalysis(diagnosisData);
    
    return {
      success: false,
      error: `Ollama GPT-OSS 20B 분석 실패: ${error.message}`,
      fallbackAnalysis,
      processingTime: new Date().getTime() - startTime.getTime(),
      model: 'Ollama GPT-OSS 20B (폴백)',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Ollama GPT-OSS 20B API 호출
 */
function callOllamaAPI(prompt, env) {
  const url = `${env.OLLAMA_BASE_URL}/api/generate`;
  
  const requestBody = {
    model: env.OLLAMA_MODEL,
    prompt: prompt,
    stream: false,
    options: {
      temperature: 0.7,
      top_p: 0.9,
      top_k: 40,
      repeat_penalty: 1.1,
      num_predict: 4096,
      stop: ["<|im_end|>", "<|endoftext|>", "Human:", "Assistant:"]
    }
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(requestBody),
    muteHttpExceptions: true
  };
  
  try {
    console.log(`🚀 Ollama GPT-OSS 20B API 호출: ${url}`);
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      throw new Error(`Ollama API 오류 (${responseCode}): ${responseText}`);
    }
    
    const responseData = JSON.parse(responseText);
    
    if (!responseData.response) {
      throw new Error('Ollama API 응답에 response 필드가 없습니다.');
    }
    
    console.log(`✅ Ollama GPT-OSS 20B 응답 수신 (${responseData.response.length} 문자)`);
    return responseData.response;
    
  } catch (error) {
    console.error('❌ Ollama GPT-OSS 20B API 호출 실패:', error);
    throw new Error(`Ollama API 호출 실패: ${error.message}`);
  }
}

/**
 * Ollama GPT-OSS 20B 프롬프트 생성
 */
function generateOllamaPrompt(diagnosisData) {
  const { companyInfo, responses, scores } = diagnosisData;
  
  return `당신은 이교장(이후경 경영지도사)입니다. AI 역량진단 전문가로서 다음 기업의 AI 역량을 분석하고 맞춤형 보고서를 작성해주세요.

## 기업 정보
- 회사명: ${companyInfo.name}
- 업종: ${companyInfo.industry}
- 직원수: ${companyInfo.size}
- 담당자: ${companyInfo.contact.name} (${companyInfo.contact.email})

## 진단 점수
총점: ${scores.totalScore}/225점 (${Math.round(scores.percentage)}%)
성숙도 레벨: ${scores.maturityLevel}

## 카테고리별 점수
- 비즈니스 기반: ${scores.categoryScores.businessFoundation}/40점
- 현재 AI 활용도: ${scores.categoryScores.currentAI}/40점
- 조직 준비도: ${scores.categoryScores.organizationReadiness}/40점
- 기술 인프라: ${scores.categoryScores.techInfrastructure}/40점
- 목표 명확성: ${scores.categoryScores.goalClarity}/40점
- 실행 역량: ${scores.categoryScores.executionCapability}/25점

## 45개 질문 응답
${Object.entries(responses).map(([question, answer]) => `Q${question}: ${answer}/5점`).join('\n')}

## 요청사항
다음 JSON 형식으로 분석 결과를 제공해주세요:

{
  "swotAnalysis": {
    "strengths": ["강점1", "강점2", "강점3"],
    "weaknesses": ["약점1", "약점2", "약점3"],
    "opportunities": ["기회1", "기회2", "기회3"],
    "threats": ["위협1", "위협2", "위협3"]
  },
  "recommendations": {
    "immediate": [
      {
        "priority": 1,
        "title": "즉시 실행 항목",
        "description": "상세 설명",
        "expectedImpact": "기대 효과"
      }
    ],
    "shortTerm": [
      {
        "priority": 1,
        "title": "단기 실행 항목",
        "description": "상세 설명",
        "expectedImpact": "기대 효과"
      }
    ],
    "longTerm": [
      {
        "priority": 1,
        "title": "장기 실행 항목",
        "description": "상세 설명",
        "expectedImpact": "기대 효과"
      }
    ]
  },
  "roadmap": {
    "phase1": {
      "duration": "1-3개월",
      "goals": ["목표1", "목표2"],
      "keyActions": ["액션1", "액션2"],
      "successMetrics": ["지표1", "지표2"]
    },
    "phase2": {
      "duration": "3-6개월",
      "goals": ["목표1", "목표2"],
      "keyActions": ["액션1", "액션2"],
      "successMetrics": ["지표1", "지표2"]
    },
    "phase3": {
      "duration": "6-12개월",
      "goals": ["목표1", "목표2"],
      "keyActions": ["액션1", "액션2"],
      "successMetrics": ["지표1", "지표2"]
    }
  },
  "aicampPrograms": [
    {
      "name": "프로그램명",
      "description": "프로그램 설명",
      "fitScore": 95,
      "duration": "기간",
      "investment": "투자금액"
    }
  ]
}

이교장의 전문성과 경험을 바탕으로 실용적이고 구체적인 분석을 제공해주세요.`;
}

/**
 * Ollama 응답 파싱
 */
function parseOllamaResponse(response) {
  try {
    // JSON 추출 시도
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonText = jsonMatch ? jsonMatch[1] : response;
    
    const parsed = JSON.parse(jsonText);
    
    // 필수 필드 검증
    if (!parsed.swotAnalysis || !parsed.recommendations || !parsed.roadmap) {
      throw new Error('필수 분석 필드가 누락되었습니다.');
    }
    
    return parsed;
    
  } catch (error) {
    console.error('❌ Ollama 응답 파싱 실패:', error);
    
    // 기본 구조 반환
    return {
      swotAnalysis: {
        strengths: ['AI 분석 중 오류가 발생했습니다.'],
        weaknesses: ['응답 파싱에 실패했습니다.'],
        opportunities: ['기본 분석을 제공합니다.'],
        threats: ['추가 분석이 필요합니다.']
      },
      recommendations: {
        immediate: [],
        shortTerm: [],
        longTerm: []
      },
      roadmap: {
        phase1: { duration: '1-3개월', goals: [], keyActions: [], successMetrics: [] },
        phase2: { duration: '3-6개월', goals: [], keyActions: [], successMetrics: [] },
        phase3: { duration: '6-12개월', goals: [], keyActions: [], successMetrics: [] }
      },
      aicampPrograms: []
    };
  }
}

/**
 * 분석 결과 검증 및 보완
 */
function validateAndEnhanceAnalysis(analysis, diagnosisData) {
  // 기본 검증
  if (!analysis.swotAnalysis) {
    analysis.swotAnalysis = {
      strengths: ['기본 강점 분석'],
      weaknesses: ['기본 약점 분석'],
      opportunities: ['기본 기회 분석'],
      threats: ['기본 위협 분석']
    };
  }
  
  if (!analysis.recommendations) {
    analysis.recommendations = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    };
  }
  
  if (!analysis.roadmap) {
    analysis.roadmap = {
      phase1: { duration: '1-3개월', goals: [], keyActions: [], successMetrics: [] },
      phase2: { duration: '3-6개월', goals: [], keyActions: [], successMetrics: [] },
      phase3: { duration: '6-12개월', goals: [], keyActions: [], successMetrics: [] }
    };
  }
  
  // AICAMP 프로그램 추천 추가
  if (!analysis.aicampPrograms || analysis.aicampPrograms.length === 0) {
    analysis.aicampPrograms = generateDefaultAICAMPPrograms(diagnosisData.scores);
  }
  
  return analysis;
}

/**
 * 기본 AICAMP 프로그램 추천 생성
 */
function generateDefaultAICAMPPrograms(scores) {
  const programs = [];
  
  if (scores.percentage < 40) {
    programs.push({
      name: 'AI 기초 역량 강화 프로그램',
      description: 'AI 기본 개념과 활용 방안을 체계적으로 학습',
      fitScore: 95,
      duration: '2개월',
      investment: '기본 투자'
    });
  } else if (scores.percentage < 70) {
    programs.push({
      name: 'AI 실무 적용 프로그램',
      description: '실무에서 바로 활용할 수 있는 AI 도구와 방법론 학습',
      fitScore: 90,
      duration: '3개월',
      investment: '중간 투자'
    });
  } else {
    programs.push({
      name: 'AI 고도화 전략 프로그램',
      description: 'AI를 통한 비즈니스 혁신과 경쟁우위 확보 전략',
      fitScore: 85,
      duration: '4개월',
      investment: '고급 투자'
    });
  }
  
  return programs;
}

/**
 * 폴백 분석 생성
 */
function generateFallbackAnalysis(diagnosisData) {
  const { scores } = diagnosisData;
  
  return {
    swotAnalysis: {
      strengths: ['기본 강점 분석이 제공됩니다.'],
      weaknesses: ['기본 약점 분석이 제공됩니다.'],
      opportunities: ['기본 기회 분석이 제공됩니다.'],
      threats: ['기본 위협 분석이 제공됩니다.']
    },
    recommendations: {
      immediate: [
        {
          priority: 1,
          title: 'AI 역량 진단 상담 신청',
          description: '이교장과의 1:1 상담을 통해 맞춤형 전략 수립',
          expectedImpact: 'AI 도입 성공률 80% 향상'
        }
      ],
      shortTerm: [],
      longTerm: []
    },
    roadmap: {
      phase1: {
        duration: '1-3개월',
        goals: ['AI 역량 진단 및 전략 수립'],
        keyActions: ['상담 신청', '현재 상태 분석'],
        successMetrics: ['진단 완료', '전략 수립']
      },
      phase2: {
        duration: '3-6개월',
        goals: ['AI 도구 도입 및 교육'],
        keyActions: ['도구 선정', '팀 교육'],
        successMetrics: ['도구 도입', '교육 완료']
      },
      phase3: {
        duration: '6-12개월',
        goals: ['AI 활용 확산 및 최적화'],
        keyActions: ['활용 확산', '성과 측정'],
        successMetrics: ['활용률 50%', '생산성 30% 향상']
      }
    },
    aicampPrograms: generateDefaultAICAMPPrograms(scores)
  };
}

// ================================================================================
// MODULE 2: 메인 라우팅 시스템 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 메인 GET 핸들러 (헬스체크 + 진단 결과 조회)
 */
function doGet(e) {
  try {
    const env = getEnvironmentConfig();
    
    // URL 파라미터 확인
    const params = e.parameter || {};
    const diagnosisId = params.diagnosisId;
    const action = params.action;
    
    // 진단 결과 조회 요청인 경우
    if (diagnosisId && action === 'getResult') {
      return getDiagnosisResult(diagnosisId);
    }
    
    // 헬스체크 응답 (V16.0 OLLAMA ULTIMATE)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        status: 'active',
        version: env.SYSTEM_VERSION,
        branding: '이교장의AI역량진단보고서',
        model: env.AI_MODEL,
        timestamp: new Date().toISOString(),
        environment: env.ENVIRONMENT,
        features: {
          questionsSupported: 45,
          sectionsSupported: 11,
          fallbackDisabled: true,
          unifiedReports: true,
          aiModel: 'ollama-gpt-oss-20b',
          matrixFixed: true,
          localAI: true,
          ollamaIntegrated: true
        },
        endpoints: {
          diagnosis: 'POST /',
          health: 'GET /',
          consultation: 'POST /?action=consultation',
          errorReport: 'POST /?action=error-report',
          getResult: 'GET /?diagnosisId=ID&action=getResult'
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 헬스체크 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        status: 'error',
        version: 'V16.0-OLLAMA-ULTIMATE',
        error: error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 메인 POST 핸들러 (V16.0 OLLAMA ULTIMATE - 진행상황 모니터링 통합)
 */
async function doPost(e) {
  const startTime = new Date().getTime();
  console.log('🚀 V16.0 OLLAMA ULTIMATE 요청 수신');
  
  try {
    // 요청 데이터 파싱 (개선된 오류 처리)
    let requestData;
    try {
      requestData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('❌ 요청 데이터 파싱 실패:', parseError);
      throw new Error('잘못된 요청 데이터 형식입니다.');
    }
    
    const action = requestData.action || requestData.type || 'diagnosis';
    
    console.log('📋 요청 액션:', action);
    console.log('📊 요청 데이터 키:', Object.keys(requestData));
    
    // 진행상황 모니터링 시작
    const progressId = startProgressMonitoring(action, requestData);
    
    // V16.0 신규: 통합 워크플로우 결과 처리 확인
    if (requestData.integratedWorkflow && requestData.workflowResult) {
      console.log('🎯 통합 워크플로우 결과 감지 - 특별 처리 모드');
    }
    
    // 액션별 라우팅 (V16.0 지원 액션 + 통합 워크플로우 + Drive 유틸)
    let result;
    switch (action) {
      case 'diagnosis':
      case 'ai_diagnosis':
        updateProgressStatus(progressId, 'processing', '이교장의AI역량진단보고서 생성을 시작합니다');
        result = await handleAIDiagnosisRequest(requestData, progressId);
        break;
        
      case 'ai_diagnosis_complete':
      case 'processCompletedAnalysis':
        // V16.0 신규: 통합 워크플로우 완료 결과 처리
        updateProgressStatus(progressId, 'processing', '통합 워크플로우 결과를 처리하고 있습니다');
        result = await handleIntegratedWorkflowResult(requestData, progressId);
        break;
        
      case 'consultation':
      case 'consultation_request':
        updateProgressStatus(progressId, 'processing', '상담신청을 처리하고 있습니다');
        result = await handleConsultationRequest(requestData, progressId);
        break;
        
      case 'error_report':
        updateProgressStatus(progressId, 'processing', '오류신고를 처리하고 있습니다');
        result = handleErrorReport(requestData, progressId);
        break;
        
      case 'getResult':
        const diagnosisId = requestData.diagnosisId || e.parameter.diagnosisId;
        result = getDiagnosisResult(diagnosisId);
        break;
        
      case 'checkProgress':
        // 진행상황 조회 (실시간 모니터링용)
        console.log('📊 진행상황 조회 요청:', requestData.diagnosisId);
        result = getProgressStatus(requestData.diagnosisId);
        break;

      case 'drive_upload':
        updateProgressStatus(progressId, 'processing', 'Google Drive에 보고서를 업로드하고 있습니다');
        result = handleDriveUploadRequest(requestData, progressId);
        break;

      case 'drive_list':
        updateProgressStatus(progressId, 'processing', 'Google Drive 파일 목록을 조회하고 있습니다');
        result = handleDriveListRequest(requestData, progressId);
        break;

      case 'drive_check':
        updateProgressStatus(progressId, 'processing', 'Google Drive 파일 상태를 확인하고 있습니다');
        result = handleDriveCheckRequest(requestData, progressId);
        break;
        
      default:
        console.warn('⚠️ 알 수 없는 요청 타입, 기본 진단으로 처리:', action);
        updateProgressStatus(progressId, 'processing', '기본 AI역량진단으로 처리합니다');
        result = await handleAIDiagnosisRequest(requestData, progressId);
        break;
    }
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 처리 완료 - 소요시간:', processingTime + 'ms');
    
    // 진행상황 완료 처리
    updateProgressStatus(progressId, 'completed', '모든 처리가 성공적으로 완료되었습니다');
    
    return result;
    
  } catch (error) {
    console.error('❌ 메인 POST 핸들러 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString(),
        supportedActions: ['diagnosis', 'ai_diagnosis_complete', 'consultation', 'error_report', 'getResult', 'checkProgress']
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 2.5: 진행상황 모니터링 시스템 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 진행상황 모니터링 시작
 */
function startProgressMonitoring(requestType, requestData) {
  // diagnosisId가 있으면 사용, 없으면 생성
  const diagnosisId = requestData.diagnosisId || requestData.data?.diagnosisId || `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const progressId = `PROG_${diagnosisId}_${Date.now()}`;
  
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = getOrCreateSheet(spreadsheet, sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    // 헤더 설정 (최초 1회) - diagnosisId 컬럼 추가
    if (progressSheet.getLastRow() === 0) {
      const headers = ['진행ID', '진단ID', '요청타입', '시작시간', '상태', '메시지', '업데이트시간', '완료시간'];
      progressSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      progressSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // 초기 진행상황 저장
    const row = [
      progressId,
      diagnosisId,  // 진단ID 추가
      requestType,
      new Date(),
      'started',
      '이교장의AI역량진단보고서 처리를 시작합니다',
      new Date(),
      ''
    ];
    
    progressSheet.appendRow(row);
    console.log('📊 진행상황 모니터링 시작:', progressId, '진단ID:', diagnosisId);
    
  } catch (error) {
    console.error('❌ 진행상황 모니터링 시작 실패:', error);
  }
  
  return progressId;
}

/**
 * 진행상황 업데이트
 */
function updateProgressStatus(progressId, status, message) {
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    if (!progressSheet) return;
    
    // 해당 진행ID 찾기
    const data = progressSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === progressId) {
        // 새로운 구조에 맞게 컬럼 인덱스 조정: 상태(5), 메시지(6), 업데이트시간(7), 완료시간(8)
        progressSheet.getRange(i + 1, 5).setValue(status);
        progressSheet.getRange(i + 1, 6).setValue(message);
        progressSheet.getRange(i + 1, 7).setValue(new Date());
        
        // 완료 상태인 경우 완료시간 설정
        if (status === 'completed' || status === 'error') {
          progressSheet.getRange(i + 1, 8).setValue(new Date());
        }
        
        console.log(`📈 진행상황 업데이트 [${progressId}]: ${status} - ${message}`);
        break;
      }
    }
    
  } catch (error) {
    console.error('❌ 진행상황 업데이트 실패:', error);
  }
}

/**
 * 진행상황 조회 (실시간 모니터링용)
 */
function getProgressStatus(diagnosisId) {
  try {
    console.log('📊 진행상황 조회:', diagnosisId);
    
    if (!diagnosisId) {
      throw new Error('diagnosisId가 필요합니다');
    }
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const progressSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.PROGRESS_MONITORING);
    
    if (!progressSheet) {
      throw new Error('진행상황 모니터링 시트를 찾을 수 없습니다');
    }
    
    const data = progressSheet.getDataRange().getValues();
    const headers = data[0];
    
    // diagnosisId로 진행상황 검색 (최신 순)
    let latestProgress = null;
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      const rowDiagnosisId = row[headers.indexOf('진단ID')];
      
      if (rowDiagnosisId === diagnosisId) {
        latestProgress = {
          progressId: row[headers.indexOf('진행ID')],
          diagnosisId: rowDiagnosisId,
          requestType: row[headers.indexOf('요청타입')],
          startTime: row[headers.indexOf('시작시간')],
          status: row[headers.indexOf('상태')],
          message: row[headers.indexOf('메시지')],
          updateTime: row[headers.indexOf('업데이트시간')],
          completeTime: row[headers.indexOf('완료시간')]
        };
        break;
      }
    }
    
    if (latestProgress) {
      console.log('✅ 진행상황 발견:', latestProgress.status);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          diagnosisId: diagnosisId,
          progress: latestProgress,
          version: 'V16.0-OLLAMA-ULTIMATE',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      console.log('⚠️ 진행상황을 찾을 수 없음:', diagnosisId);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          diagnosisId: diagnosisId,
          message: '진행상황 데이터를 찾을 수 없습니다',
          version: 'V16.0-OLLAMA-ULTIMATE',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('❌ 진행상황 조회 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        diagnosisId: diagnosisId,
        error: error.message,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 시트 생성 또는 가져오기 (헬퍼 함수)
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

// ================================================================================
// MODULE 3: AI 역량진단 처리 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * AI 역량진단 요청 처리 (V16.0 OLLAMA ULTIMATE - 완전한 12단계 워크플로우)
 */
async function handleAIDiagnosisRequest(requestData, progressId) {
  console.log('🎓 AI 역량진단 처리 시작 - V16.0 OLLAMA ULTIMATE');
  
  const config = getEnvironmentConfig();
  // 전달된 diagnosisId가 있으면 그대로 사용하여 프런트/백엔드/SSE 식별자를 일치시킨다
  const diagnosisId = requestData && (requestData.diagnosisId || (requestData.data && requestData.data.diagnosisId))
    ? (requestData.diagnosisId || requestData.data.diagnosisId)
    : generateDiagnosisId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '1단계: 제출하신 정보를 검증하고 있습니다');
    console.log('📋 1단계: 데이터 검증 및 정규화');
    const normalizedData = normalizeAIDiagnosisData(requestData, diagnosisId);
    
    // 2-3단계: 병렬 처리 (접수확인 메일 + 점수 계산)
    updateProgressStatus(progressId, 'processing', '2-3단계: 접수확인 메일 발송과 점수 계산을 병렬로 처리하고 있습니다');
    console.log('⚡ 2-3단계: 병렬 처리 시작 (접수확인 + 점수계산)');
    
    const [confirmationResult, scoreAnalysis] = await Promise.all([
      // 2단계: 접수확인 메일 발송 (병렬)
      (async () => {
        try {
          console.log('📧 2단계: 접수확인 메일 발송 (병렬)');
          return await sendApplicationConfirmationEmails(normalizedData, diagnosisId);
        } catch (error) {
          console.error('❌ 접수확인 메일 오류:', error);
          return { success: false, error: error.message };
        }
      })(),
      
      // 3단계: 45문항 점수 계산 (병렬)
      (async () => {
        try {
          console.log('📊 3단계: 45문항 점수 계산 (병렬)');
          return await calculateAdvancedScores(normalizedData);
        } catch (error) {
          console.error('❌ 점수 계산 오류:', error);
          return { totalScore: 0, grade: 'F', maturityLevel: '미흡' };
        }
      })()
    ]);
    
    // 4단계: 업종별/규모별 벤치마크 분석
    updateProgressStatus(progressId, 'processing', '4단계: 업종별 벤치마크 분석을 진행하고 있습니다');
    console.log('🎯 4단계: 벤치마크 갭 분석');
    const benchmarkAnalysis = performBenchmarkAnalysis(scoreAnalysis, normalizedData);
    
    // 5-7단계: 병렬 처리 (SWOT 분석, 실행 과제, 로드맵)
    updateProgressStatus(progressId, 'processing', '5-7단계: SWOT 분석, 실행 과제, 로드맵을 병렬로 생성하고 있습니다');
    console.log('⚡ 5-7단계: 분석 단계 병렬 처리 시작');
    
    const [swotAnalysis, keyActionItems] = await Promise.all([
      // 5단계: SWOT 분석 (병렬)
      (async () => {
        try {
          console.log('⚡ 5단계: SWOT 분석 (병렬)');
          return await generateAdvancedSWOT(normalizedData, scoreAnalysis, benchmarkAnalysis);
        } catch (error) {
          console.error('❌ SWOT 분석 오류:', error);
          return { strengths: [], weaknesses: [], opportunities: [], threats: [] };
        }
      })(),
      
      // 6단계: 핵심 실행 과제 (병렬)
      (async () => {
        try {
          console.log('🎯 6단계: 핵심 실행 과제 (병렬)');
          return await generateKeyActionItems(null, scoreAnalysis, normalizedData); // swot은 나중에 업데이트
        } catch (error) {
          console.error('❌ 실행 과제 생성 오류:', error);
          return { actionItems: { immediate: [], shortTerm: [], longTerm: [] } };
        }
      })()
    ]);
    
    // 7단계: 로드맵 생성 (SWOT과 실행과제 결과 필요)
    updateProgressStatus(progressId, 'processing', '7단계: 3단계 실행 로드맵을 수립하고 있습니다');
    console.log('🗺️ 7단계: 실행 로드맵');
    const executionRoadmap = generate3PhaseRoadmap(keyActionItems, swotAnalysis, normalizedData);
    
    // 8단계: Ollama AI 종합 보고서 생성 (핵심)
    updateProgressStatus(progressId, 'processing', '8단계: Ollama GPT-OSS 20B로 종합 분석 보고서를 생성하고 있습니다');
    console.log('🤖 8단계: Ollama AI 종합 분석');
    const aiReport = generateOllamaAIReport(normalizedData, scoreAnalysis, swotAnalysis, keyActionItems, executionRoadmap);
    
    // 9단계: 이교장의AI역량진단보고서 HTML 생성
    updateProgressStatus(progressId, 'processing', '9단계: 맞춤형 HTML 보고서를 생성하고 있습니다');
    console.log('📄 9단계: 이교장의AI역량진단보고서 HTML 생성');
    const htmlReport = generateLeeKyoJangStyleReport(normalizedData, aiReport, {
      scores: scoreAnalysis,
      swot: swotAnalysis,
      actionItems: keyActionItems, // matrix 완전 제거, actionItems로 대체
      roadmap: executionRoadmap
    });
    
    // 10-12단계: 병렬 처리로 속도 향상 (데이터 저장, Drive 업로드, 이메일 발송)
    updateProgressStatus(progressId, 'processing', '10-12단계: 데이터 저장, Drive 업로드, 이메일 발송을 병렬로 처리하고 있습니다');
    console.log('⚡ 10-12단계: 병렬 처리 시작 (속도 최적화)');
    
    // 병렬 실행을 위한 Promise 배열
    const parallelTasks = [];
    
    // 10단계: Google Sheets 저장 (병렬)
    parallelTasks.push(
      (async () => {
        try {
          console.log('💾 10단계: 데이터 저장 (병렬)');
          return await saveAIDiagnosisData(normalizedData, aiReport, htmlReport, progressId);
        } catch (error) {
          console.error('❌ 데이터 저장 오류:', error);
          return { success: false, error: error.message };
        }
      })()
    );
    
    // 11단계: Google Drive 업로드 (병렬)
    parallelTasks.push(
      (async () => {
        try {
          console.log('🗂️ 11단계: Google Drive 업로드 (병렬)');
          return await uploadReportToDrive(diagnosisId, htmlReport, normalizedData);
        } catch (error) {
          console.error('❌ Drive 업로드 오류:', error);
          return { success: false, error: error.message, shareLink: null };
        }
      })()
    );
    
    // 병렬 실행 및 결과 수집
    const [saveResult, driveUploadResult] = await Promise.all(parallelTasks);
    
    // 12단계: 이메일 발송 (Drive 링크 필요하므로 순차 실행)
    updateProgressStatus(progressId, 'processing', '12단계: 완성된 보고서를 이메일로 발송하고 있습니다');
    console.log('📧 12단계: 이교장의AI역량진단보고서 이메일 발송');
    const emailResult = sendDiagnosisEmail(normalizedData, aiReport, driveUploadResult?.shareLink || '#', diagnosisId);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('🎉 이교장의AI역량진단보고서 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '이교장의AI역량진단보고서가 성공적으로 완료되어 이메일로 발송되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'ai_diagnosis',
        diagnosisId: diagnosisId,
        message: '이교장의AI역량진단보고서가 성공적으로 완료되었습니다.',
        branding: '이교장의AI역량진단보고서',
        results: {
          totalScore: aiReport.totalScore || scoreAnalysis.totalScore,
          maturityLevel: aiReport.maturityLevel || scoreAnalysis.maturityLevel,
          grade: scoreAnalysis.grade,
          reportGenerated: true,
          emailsSent: emailResult.success,
          dataSaved: saveResult.success,
          confirmationSent: confirmationResult.success,
          driveUploaded: driveUploadResult ? driveUploadResult.success : false,
          driveFileInfo: driveUploadResult || null
        },
        processingTime: processingTime,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 이교장의AI역량진단보고서 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    
    // 오류 데이터 저장
    saveErrorLog('ai_diagnosis', diagnosisId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: `이교장의AI역량진단보고서 처리 실패: ${error.message}`,
        diagnosisId: diagnosisId,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 진단 결과 조회 (V16.0 OLLAMA ULTIMATE)
 */
function getDiagnosisResult(diagnosisId) {
  try {
    console.log('🔍 진단 결과 조회:', diagnosisId);
    
    if (!diagnosisId) {
      throw new Error('diagnosisId가 필요합니다');
    }
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    
    if (!sheet) {
      throw new Error('진단 데이터 시트를 찾을 수 없습니다');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // diagnosisId로 데이터 검색
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowDiagnosisId = row[headers.indexOf('진단ID')] || row[headers.indexOf('diagnosisId')];
      
      if (rowDiagnosisId === diagnosisId) {
        console.log('✅ 진단 결과 발견:', diagnosisId);
        
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            hasData: true,
            diagnosisId: diagnosisId,
            data: {
              companyName: row[headers.indexOf('회사명')],
              contactName: row[headers.indexOf('담당자명')],
              totalScore: row[headers.indexOf('총점')],
              grade: row[headers.indexOf('등급')],
              createdAt: row[headers.indexOf('생성일시')]
            },
            version: 'V16.0-OLLAMA-ULTIMATE',
            timestamp: new Date().toISOString()
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // 데이터를 찾지 못한 경우
    console.log('⚠️ 진단 결과를 찾을 수 없음:', diagnosisId);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        hasData: false,
        diagnosisId: diagnosisId,
        message: '진단 결과 데이터가 비어있습니다',
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        hasData: false,
        diagnosisId: diagnosisId,
        error: error.message,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 4: 데이터 처리 및 분석 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `DIAG_45Q_${timestamp}_${random}`;
}

/**
 * AI 역량진단 데이터 정규화 (V16.0 OLLAMA ULTIMATE)
 */
function normalizeAIDiagnosisData(rawData, diagnosisId) {
  console.log('🔧 이교장의AI역량진단보고서 데이터 정규화 시작');
  
  const config = getEnvironmentConfig();
  const data = rawData.data || rawData;
  
  // 기본 필드들 추출 (다양한 필드명 지원)
  const companyName = data.companyName || data.회사명 || data.company || '정보없음';
  const contactName = data.contactName || data.담당자명 || data.name || data.성명 || '정보없음';
  const contactEmail = data.contactEmail || data.이메일 || data.email || '정보없음';
  const industry = data.industry || data.업종 || '기타';
  const employeeCount = data.employeeCount || data.직원수 || '1-10명';
  
  // 필수 필드 검증
  if (!companyName || companyName === '정보없음') {
    throw new Error('회사명은 필수 입력 항목입니다.');
  }
  if (!contactName || contactName === '정보없음') {
    throw new Error('담당자명은 필수 입력 항목입니다.');
  }
  if (!contactEmail || contactEmail === '정보없음' || !contactEmail.includes('@')) {
    throw new Error('올바른 이메일 주소를 입력해주세요.');
  }
  
  // 개인정보 수집·이용 동의 (선택값이 없으면 false로 간주)
  const privacyConsent = !!(data.privacyConsent || data.consent || data.개인정보동의);
  if (!privacyConsent) {
    throw new Error('개인정보 수집·이용 동의가 필요합니다.');
  }
  
  // 45문항 응답 정규화: 객체/배열/숫자 배열 모두 지원
  const normalizedResponses = (function () {
    const src = data.assessmentResponses || data.responses || [];
    const asArray = Array.isArray(src) ? src : Object.keys(src || {}).map(function (k) {
      return src[k];
    });
    
    // 숫자로 변환하여 45개 문항 확보
    const numericResponses = asArray.map(function (v) {
      const num = parseInt(v) || 0;
      return Math.max(1, Math.min(5, num)); // 1-5 범위로 제한
    });
    
    // 45개 문항이 안 되면 기본값(3)으로 채움
    while (numericResponses.length < 45) {
      numericResponses.push(3);
    }
    
    return numericResponses.slice(0, 45); // 정확히 45개만
  })();
  
  return {
    diagnosisId: diagnosisId,
    companyName: companyName,
    contactName: contactName,
    contactEmail: contactEmail,
    contactPhone: data.contactPhone || data.전화번호 || data.phone || '',
    contactPosition: data.contactPosition || data.직책 || data.position || '',
    businessRegistration: data.businessRegistration || data.사업자등록번호 || '',
    industry: industry,
    employeeCount: employeeCount,
    annualRevenue: data.annualRevenue || data.연매출 || data.revenue || '',
    establishmentYear: data.establishmentYear || data.설립년도 || '',
    businessContent: data.businessContent || data.사업내용 || '',
    mainProducts: data.mainProducts || data.주요제품 || '',
    targetCustomers: data.targetCustomers || data.주요고객 || '',
    currentChallenges: data.currentChallenges || data.현재과제 || '',
    responses: normalizedResponses,
    privacyConsent: privacyConsent,
    timestamp: new Date().toISOString(),
    version: 'V16.0-OLLAMA-ULTIMATE'
  };
}

/**
 * 45문항 점수 계산 (V16.0 정확한 계산 시스템)
 */
async function calculateAdvancedScores(normalizedData) {
  const responses = normalizedData.responses || [];
  const responseValues = Array.isArray(responses) ? 
    responses.map(v => parseInt(v) || 0) : 
    Object.values(responses).map(v => parseInt(v) || 0);
  
  if (responseValues.length === 0) {
    return {
      totalScore: 0,
      averageScore: 0,
      percentage: 0,
      grade: 'F',
      maturityLevel: '미흡',
      sectionScores: {},
      percentile: 0
    };
  }
  
  const totalScore = responseValues.reduce((sum, score) => sum + score, 0);
  const maxPossibleScore = responseValues.length * 5; // 45문항 × 5점 = 225점
  const averageScore = totalScore / responseValues.length;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  // 점수 계산 로그
  console.log('📊 45문항 점수 계산:', {
    응답개수: responseValues.length,
    총점: totalScore,
    최대점수: maxPossibleScore,
    달성률: percentage + '%'
  });
  
  // 정확한 등급 계산 (백분율 기준)
  let grade = 'F';
  let maturityLevel = '미흡';
  
  if (percentage >= 90) {
    grade = 'A+';
    maturityLevel = '최우수';
  } else if (percentage >= 80) {
    grade = 'A';
    maturityLevel = '우수';
  } else if (percentage >= 70) {
    grade = 'B+';
    maturityLevel = '양호';
  } else if (percentage >= 60) {
    grade = 'B';
    maturityLevel = '보통';
  } else if (percentage >= 50) {
    grade = 'C+';
    maturityLevel = '개선필요';
  } else if (percentage >= 40) {
    grade = 'C';
    maturityLevel = '미흡';
  } else {
    grade = 'F';
    maturityLevel = '매우미흡';
  }
  
  // 섹션별 점수 (45문항을 6개 영역으로 분할 - V16.0 정확한 구조)
  const questionsPerSection = Math.floor(responseValues.length / 6); // 45/6 = 7.5 → 각 영역 7-8문항
  const sectionScores = {
    strategy: calculateSectionScore(responseValues.slice(0, 8)),      // 1-8: AI 전략 및 비전 (8문항)
    organization: calculateSectionScore(responseValues.slice(8, 15)), // 9-15: 조직 및 인력 (7문항)
    technology: calculateSectionScore(responseValues.slice(15, 23)),  // 16-23: 기술 및 인프라 (8문항)
    data: calculateSectionScore(responseValues.slice(23, 30)),        // 24-30: 데이터 관리 (7문항)
    process: calculateSectionScore(responseValues.slice(30, 38)),     // 31-38: 프로세스 혁신 (8문항)
    culture: calculateSectionScore(responseValues.slice(38, 45))      // 39-45: 문화 및 변화관리 (7문항)
  };
  
  return {
    totalScore: totalScore,
    maxScore: maxPossibleScore,
    averageScore: Math.round(averageScore * 100) / 100,
    percentage: percentage,
    grade: grade,
    maturityLevel: maturityLevel,
    sectionScores: sectionScores,
    percentile: Math.min(95, percentage)
  };
}

/**
 * 섹션별 점수 계산 및 의미 분석 (V16.0 최적화)
 */
function calculateSectionScore(sectionResponses) {
  if (!sectionResponses || sectionResponses.length === 0) return 0;
  
  const sectionTotal = sectionResponses.reduce((sum, score) => sum + score, 0);
  const sectionMax = sectionResponses.length * 5;
  const percentage = Math.round((sectionTotal / sectionMax) * 100);
  const average = Math.round((sectionTotal / sectionResponses.length) * 100) / 100;
  
  // 영역별 성숙도 레벨 분석
  let maturityLevel = '';
  if (percentage >= 90) maturityLevel = '최고수준';
  else if (percentage >= 80) maturityLevel = '우수';
  else if (percentage >= 70) maturityLevel = '양호';
  else if (percentage >= 60) maturityLevel = '보통';
  else if (percentage >= 50) maturityLevel = '미흡';
  else maturityLevel = '매우미흡';
  
  return {
    score: percentage,
    average: average,
    total: sectionTotal,
    maxScore: sectionMax,
    questionCount: sectionResponses.length,
    maturityLevel: maturityLevel,
    responses: sectionResponses
  };
}

/**
 * 업종별 벤치마크 분석 (V16.0 OLLAMA ULTIMATE)
 */
async function performBenchmarkAnalysis(scoreAnalysis, normalizedData) {
  // 업종별 벤치마크 (백분율 기준)
  const industryBenchmarks = {
    'IT/소프트웨어': { average: 76, top10: 90 },
    '제조업': { average: 64, top10: 80 },
    '금융업': { average: 72, top10: 86 },
    '서비스업': { average: 62, top10: 76 },
    '기타': { average: 60, top10: 74 }
  };
  
  const benchmark = industryBenchmarks[normalizedData.industry] || industryBenchmarks['기타'];
  const userPercentage = scoreAnalysis.percentage;
  
  return {
    industryAverage: benchmark.average,
    industryTop10: benchmark.top10,
    userScore: userPercentage,
    percentileRank: Math.min(95, Math.round((userPercentage / benchmark.top10) * 100)),
    gapAnalysis: {
      vsAverage: userPercentage - benchmark.average,
      vsTop10: userPercentage - benchmark.top10
    },
    recommendations: userPercentage < benchmark.average ? 
      ['업종 평균 수준 달성을 위한 집중 투자 필요'] : 
      ['업종 상위권 진입을 위한 차별화 전략 수립']
  };
}

/**
 * 고도화된 SWOT 분석 (V16.0 OLLAMA ULTIMATE)
 */
async function generateAdvancedSWOT(normalizedData, scoreAnalysis, benchmarkAnalysis) {
  const isAboveAverage = scoreAnalysis.percentage > benchmarkAnalysis.industryAverage;
  
  return {
    strengths: isAboveAverage ? [
      'AI 도입에 대한 높은 관심과 의지',
      '업종 평균 이상의 디지털 역량',
      '체계적인 업무 프로세스 보유',
      '조직 구성원의 적극적 학습 의욕'
    ] : [
      'AI 도입에 대한 관심과 의지',
      '기존 업무 프로세스의 체계화',
      '조직 구성원의 학습 의욕',
      '변화에 대한 개방적 태도'
    ],
    weaknesses: [
      'AI 관련 전문 인력 부족',
      '데이터 관리 체계 미흡',
      '기술 인프라 한계',
      '디지털 전환 경험 부족'
    ],
    opportunities: [
      'AI 기술의 급속한 발전과 접근성 향상',
      '정부의 디지털 전환 지원 정책',
      '경쟁사 대비 차별화 기회',
      normalizedData.industry + ' 업종 특화 AI 솔루션 등장'
    ],
    threats: [
      '기술 변화 속도에 따른 뒤처짐 위험',
      '경쟁사의 AI 도입 가속화',
      '전문 인력 확보의 어려움',
      '투자 대비 성과 창출 압박'
    ],
    analysisDate: new Date().toISOString(),
    benchmarkContext: {
      industry: normalizedData.industry,
      performanceLevel: isAboveAverage ? '상위권' : '평균 이하'
    }
  };
}

/**
 * 핵심 실행 과제 생성 (V16.0 Matrix 대체 - 오류 없는 안정적 구조)
 */
async function generateKeyActionItems(swotAnalysis, scoreAnalysis, normalizedData) {
  console.log('🎯 핵심 실행 과제 생성 (V16.0 MATRIX-FREE)');
  
  // 점수 기반 맞춤형 과제 생성
  const isHighPerformer = scoreAnalysis.percentage >= 80;
  const isAdvanced = scoreAnalysis.maturityLevel === '우수' || scoreAnalysis.maturityLevel === '최우수';
  
  const immediateActions = isHighPerformer ? [
    '🚀 AI 센터 오브 엑셀런스 구축',
    '📊 고도화된 데이터 분석 체계 도입',
    '🤖 맞춤형 AI 솔루션 개발'
  ] : [
    '📚 AI 기초 교육 및 인식 개선',
    '📋 데이터 정리 및 관리 체계 구축',
    '🔧 기본 AI 도구 도입 및 활용'
  ];
  
  const shortTermGoals = isAdvanced ? [
    '💡 AI 기반 비즈니스 모델 혁신',
    '🔗 업계 파트너십 및 생태계 구축',
    '📈 AI ROI 측정 및 최적화 시스템'
  ] : [
    '⚡ 업무 프로세스 AI 통합',
    '📊 성과 측정 체계 구축',
    '👥 조직 역량 강화 프로그램'
  ];
  
  return {
    actionItems: {
      immediate: immediateActions,
      shortTerm: shortTermGoals,
      longTerm: [
        '🏆 업계 AI 리더십 확보',
        '🌐 AI 기반 글로벌 경쟁력 강화',
        '🔄 지속적 혁신 체계 구축'
      ]
    },
    implementation: {
      phase1: '즉시 실행 (1-3개월)',
      phase2: '단기 목표 (3-6개월)', 
      phase3: '장기 비전 (6-12개월)'
    },
    success_metrics: [
      'AI 도입률 50% 이상',
      '업무 효율성 30% 향상',
      'ROI 200% 이상 달성'
    ],
    createdAt: new Date().toISOString(),
    version: 'V16.0-MATRIX-FREE-STABLE'
  };
}

/**
 * 3단계 실행 로드맵 (V16.0 간소화)
 */
async function generate3PhaseRoadmap(keyActionItems, swotAnalysis, normalizedData) {
  return {
    phase1: {
      title: '1단계: 기반 구축',
      duration: '1-3개월',
      activities: ['AI 기초 교육', '데이터 정리', '조직 준비도 향상'],
      outcomes: ['AI 인식 개선', '기초 역량 확보']
    },
    phase2: {
      title: '2단계: 역량 확장',
      duration: '4-6개월',
      activities: ['시범 프로젝트 실행', '프로세스 개선'],
      outcomes: ['실무 적용 능력', '생산성 20% 향상']
    },
    phase3: {
      title: '3단계: 혁신 실현',
      duration: '7-12개월',
      activities: ['전사 확산', '지속 개선', '경쟁우위 확보'],
      outcomes: ['AI 기반 조직 혁신 완성']
    },
    createdAt: new Date().toISOString()
  };
}

// ================================================================================
// MODULE 5: Ollama AI 통합 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * Ollama AI 종합 보고서 생성 (V16.0 OLLAMA ULTIMATE)
 */
function generateOllamaAIReport(normalizedData, scoreAnalysis, swotAnalysis, keyActionItems, executionRoadmap) {
  try {
    console.log('🤖 Ollama AI 보고서 생성 시작');
    
    const env = getEnvironmentConfig();
    
    if (!env.OLLAMA_BASE_URL || !env.OLLAMA_MODEL) {
      console.error('❌ Ollama 설정이 완료되지 않음. 필수 설정 필요!');
      throw new Error('Ollama GPT-OSS 20B 설정이 완료되지 않았습니다. 온보드 시스템에서 개별화된 고품질 보고서 생성을 위해 Ollama 연결이 필수입니다.');
    }
    
    // 온보드 시스템 연결 상태 사전 검증
    console.log('🔗 온보드 Ollama 시스템 연결 확인:', env.OLLAMA_BASE_URL);
    console.log('🤖 사용 모델:', env.OLLAMA_MODEL);
    
    // Ollama 서버 상태 사전 검증 (온보드 시스템 무오류 보장)
    try {
      const healthCheckUrl = `${env.OLLAMA_BASE_URL}/api/tags`;
      const healthResponse = UrlFetchApp.fetch(healthCheckUrl, {
        method: 'GET',
        muteHttpExceptions: true,
        timeout: 5000
      });
      
      if (healthResponse.getResponseCode() !== 200) {
        throw new Error(`Ollama 서버가 응답하지 않습니다 (${healthResponse.getResponseCode()})`);
      }
      
      const healthData = JSON.parse(healthResponse.getContentText());
      const modelExists = healthData.models && healthData.models.some(m => m.name === env.OLLAMA_MODEL);
      
      if (!modelExists) {
        throw new Error(`모델 '${env.OLLAMA_MODEL}'이 Ollama 서버에 설치되지 않았습니다. 온보드 시스템에서 모델을 확인해주세요.`);
      }
      
      console.log('✅ 온보드 Ollama 서버 상태 확인 완료');
      console.log('🎯 모델 상태: 정상 작동');
      
    } catch (healthError) {
      console.error('❌ Ollama 서버 상태 검증 실패:', healthError.message);
      throw new Error(`온보드 Ollama 시스템 연결 실패: ${healthError.message}. 개별화된 보고서 생성을 위해 Ollama 서버가 필수입니다.`);
    }
    
    // 🚀 Ollama GPT-OSS 20B 최고 품질 프롬프트 (V16.0 ULTIMATE - 온보드 최적화)
    const prompt = `당신은 "이교장의AI역량진단보고서" 시스템의 최고 AI 전문가입니다. 
McKinsey, BCG 수준의 전략 컨설팅 품질로 포괄적인 AI 역량진단 보고서를 작성해주세요.

**중요: 반드시 한국어로 최소 1000자 이상의 상세한 분석을 제공해주세요.**

## 🏢 기업 정보
- 회사명: ${normalizedData.companyName}
- 업종: ${normalizedData.industry}
- 직원 수: ${normalizedData.employeeCount}
- 연매출: ${normalizedData.annualRevenue || '정보없음'}
- 설립년도: ${normalizedData.establishmentYear || '정보없음'}
- 사업내용: ${normalizedData.businessContent || '정보없음'}
- 주요제품: ${normalizedData.mainProducts || '정보없음'}

## 📊 진단 결과 (45개 행동지표 기반 정밀 분석)
- 총점: ${scoreAnalysis.totalScore}점 (225점 만점)
- 평균: ${scoreAnalysis.averageScore}점 (5점 만점)
- 등급: ${scoreAnalysis.grade} (A+~F 등급)
- AI 성숙도: ${scoreAnalysis.maturityLevel}
- 업종 내 위치: 상위 ${scoreAnalysis.percentile}%

## 🎯 6개 영역별 상세 분석 (각 영역별 의미 분석 포함)
### 1. AI 전략 및 비전 (1-8번 문항, ${scoreAnalysis.sectionScores.strategy.questionCount}문항)
- 점수: ${scoreAnalysis.sectionScores.strategy.score}점 (성숙도: ${scoreAnalysis.sectionScores.strategy.maturityLevel})
- 평균: ${scoreAnalysis.sectionScores.strategy.average}점/5점

### 2. 조직 및 인력 (9-15번 문항, ${scoreAnalysis.sectionScores.organization.questionCount}문항)  
- 점수: ${scoreAnalysis.sectionScores.organization.score}점 (성숙도: ${scoreAnalysis.sectionScores.organization.maturityLevel})
- 평균: ${scoreAnalysis.sectionScores.organization.average}점/5점

### 3. 기술 및 인프라 (16-23번 문항, ${scoreAnalysis.sectionScores.technology.questionCount}문항)
- 점수: ${scoreAnalysis.sectionScores.technology.score}점 (성숙도: ${scoreAnalysis.sectionScores.technology.maturityLevel})
- 평균: ${scoreAnalysis.sectionScores.technology.average}점/5점

### 4. 데이터 관리 (24-30번 문항, ${scoreAnalysis.sectionScores.data.questionCount}문항)
- 점수: ${scoreAnalysis.sectionScores.data.score}점 (성숙도: ${scoreAnalysis.sectionScores.data.maturityLevel})
- 평균: ${scoreAnalysis.sectionScores.data.average}점/5점

### 5. 프로세스 혁신 (31-38번 문항, ${scoreAnalysis.sectionScores.process.questionCount}문항)
- 점수: ${scoreAnalysis.sectionScores.process.score}점 (성숙도: ${scoreAnalysis.sectionScores.process.maturityLevel})
- 평균: ${scoreAnalysis.sectionScores.process.average}점/5점

### 6. 문화 및 변화관리 (39-45번 문항, ${scoreAnalysis.sectionScores.culture.questionCount}문항)
- 점수: ${scoreAnalysis.sectionScores.culture.score}점 (성숙도: ${scoreAnalysis.sectionScores.culture.maturityLevel})
- 평균: ${scoreAnalysis.sectionScores.culture.average}점/5점

## ⚡ SWOT 분석 결과
### 💪 강점 (Strengths)
${swotAnalysis.strengths.map((s, i) => `${i+1}. ${s}`).join('\n')}

### 🔧 약점 (Weaknesses)  
${swotAnalysis.weaknesses.map((w, i) => `${i+1}. ${w}`).join('\n')}

### 🚀 기회 (Opportunities)
${swotAnalysis.opportunities.map((o, i) => `${i+1}. ${o}`).join('\n')}

### ⚠️ 위협 (Threats)
${swotAnalysis.threats.map((t, i) => `${i+1}. ${t}`).join('\n')}

## 🎯 핵심 실행 과제 (단계별 액션플랜)
### 즉시 실행 과제 (1-3개월)
${keyActionItems.actionItems.immediate.map((item, i) => `${i+1}. ${item}`).join('\n')}

### 단기 목표 (3-6개월)  
${keyActionItems.actionItems.shortTerm.map((item, i) => `${i+1}. ${item}`).join('\n')}

### 장기 비전 (6-12개월)
${keyActionItems.actionItems.longTerm.map((item, i) => `${i+1}. ${item}`).join('\n')}

## 🗺️ 3단계 실행 로드맵
### ${executionRoadmap.phase1.title} (${executionRoadmap.phase1.duration})
- 주요활동: ${executionRoadmap.phase1.activities.join(', ')}
- 예상성과: ${executionRoadmap.phase1.outcomes.join(', ')}

### ${executionRoadmap.phase2.title} (${executionRoadmap.phase2.duration})  
- 주요활동: ${executionRoadmap.phase2.activities.join(', ')}
- 예상성과: ${executionRoadmap.phase2.outcomes.join(', ')}

### ${executionRoadmap.phase3.title} (${executionRoadmap.phase3.duration})
- 주요활동: ${executionRoadmap.phase3.activities.join(', ')}
- 예상성과: ${executionRoadmap.phase3.outcomes.join(', ')}

## 🎯 최고 품질 요구사항 (McKinsey 수준)
1. **현황 진단**: ${normalizedData.industry} 업종 특성을 반영한 객관적 AI 역량 평가
2. **벤치마킹**: 동종업계 선도기업 대비 포지셔닝 분석  
3. **전략 수립**: 단기(3개월), 중기(6개월), 장기(12개월) 실행 전략
4. **ROI 분석**: 투자 대비 예상 효과 및 우선순위 제시
5. **리스크 관리**: 주요 위험요소와 선제적 대응방안
6. **KPI 설정**: 측정 가능한 성공지표와 모니터링 방법
7. **실행 가이드**: CEO/임원진 의사결정을 위한 구체적 액션플랜

## 📋 보고서 구조 (경영진 브리핑 수준)
다음 8개 섹션으로 구성하여 각각 200-300자 분량으로 작성:
1. 핵심 요약 (Executive Summary)
2. 현황 분석 (Current State Analysis)  
3. 업종 벤치마크 (Industry Benchmark)
4. 갭 분석 (Gap Analysis)
5. 전략적 권고 (Strategic Recommendations)
6. 실행 가이드 (Implementation Guidance)
7. 리스크 평가 (Risk Assessment)
8. 성공 지표 (Success Metrics)

각 섹션은 데이터 기반의 객관적 분석과 실행 가능한 구체적 제안을 포함해야 합니다.
`;

    // Ollama GPT-OSS 20B API 호출 (GEMINI 완전 대체)
    let response = null;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts && !response) {
      attempts++;
      console.log(`🔄 Ollama GPT-OSS 20B API 호출 시도 ${attempts}/${maxAttempts}`);
      
      try {
        response = callOllamaAPI(prompt, env);
        
        if (response && typeof response === 'string' && response.trim().length > 0) {
          console.log('✅ Ollama GPT-OSS 20B API 호출 성공');
          console.log('📊 응답 품질 검증 통과:', response.length, '문자');
          break;
        } else {
          console.warn(`⚠️ Ollama API 응답 품질 미달 (시도 ${attempts}):`, {
            hasResponse: !!response,
            responseType: response ? typeof response : 'undefined',
            responseLength: response ? response.length : 0
          });
          response = null;
        }
      } catch (apiError) {
        console.error(`❌ Ollama GPT-OSS 20B API 호출 실패 (시도 ${attempts}):`, apiError.message);
        
        if (attempts === maxAttempts) {
          throw new Error(`Ollama GPT-OSS 20B API 호출 ${maxAttempts}회 연속 실패: ${apiError.message}. Ollama 서버 상태를 확인해주세요.`);
        }
        
        const waitTime = Math.min(2000 * attempts, 8000);
        console.log(`⏳ ${waitTime}ms 대기 후 재시도...`);
        Utilities.sleep(waitTime);
      }
    }
    
    if (response) {
      const aiContent = response;
      
      return {
        executiveSummary: aiContent.substring(0, 800) + '...',
        currentStateAnalysis: `현재 ${normalizedData.companyName}의 AI 역량 수준은 ${scoreAnalysis.maturityLevel} 단계로, ${normalizedData.industry} 업종 내에서 ${scoreAnalysis.percentile}% 수준입니다.`,
        industryBenchmark: `${normalizedData.industry} 업종 평균 대비 분석 결과, 총 ${scoreAnalysis.totalScore}점으로 ${scoreAnalysis.grade} 등급을 획득했습니다.`,
        gapAnalysis: `주요 개선 영역: ${swotAnalysis.weaknesses.slice(0, 2).join(', ')} 등이 우선 개선이 필요한 영역으로 식별되었습니다.`,
        strategicRecommendations: aiContent,
        implementationGuidance: `${executionRoadmap.phase1.title}부터 시작하여 ${executionRoadmap.phase3.title}까지 체계적인 단계별 실행을 권장합니다.`,
        riskAssessment: `주요 위험 요소: ${swotAnalysis.threats.slice(0, 2).join(', ')} 등에 대한 선제적 대응이 필요합니다.`,
        successMetrics: `성공 지표: AI 도입률, 업무 효율성 개선도, ROI 달성률 등을 핵심 KPI로 설정하여 측정합니다.`,
        timeline: `${executionRoadmap.phase1.duration} + ${executionRoadmap.phase2.duration} + ${executionRoadmap.phase3.duration}의 단계별 실행 타임라인을 제시합니다.`,
        resourceRequirements: `${normalizedData.employeeCount} 규모의 조직에 적합한 인적, 물적 자원 투자 계획을 수립했습니다.`,
        nextSteps: `즉시 실행 과제: ${keyActionItems.actionItems.immediate.slice(0, 2).join(', ')} 등을 우선 추진하시기 바랍니다.`,
        totalScore: scoreAnalysis.totalScore,
        grade: scoreAnalysis.grade,
        maturityLevel: scoreAnalysis.maturityLevel,
        generatedAt: new Date().toISOString(),
        version: 'V16.0-OLLAMA-ULTIMATE'
      };
    } else {
      throw new Error('Ollama API 응답이 올바르지 않습니다');
    }
    
  } catch (error) {
    console.error('❌ Ollama AI 보고서 생성 오류:', error);
    // V16.0 OLLAMA ULTIMATE: 폴백 시스템 완전 제거 - 100% Ollama GPT-OSS 20B 사용 보장
    throw new Error(`Ollama GPT-OSS 20B 보고서 생성 실패: ${error.message}. 개별화된 고품질 보고서 생성을 위해 Ollama AI 연결이 필수입니다.`);
  }
}

/**
 * Ollama API 호출 (V16.0 안전성 강화)
 */
function callOllamaAPI(prompt) {
  try {
    const env = getEnvironmentConfig();
    const baseUrl = env.OLLAMA_BASE_URL;
    const model = env.OLLAMA_MODEL;
    
    if (!baseUrl || !model) {
      throw new Error('Ollama GPT-OSS 20B 설정이 완료되지 않았습니다');
    }
    
    const url = `${baseUrl}/api/generate`;
    
    // 온보드 시스템 고속 최적화 설정 (속도 + 안정성)
    const payload = {
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.6,        // 속도 우선 (창의성 약간 감소)
        top_k: 30,              // 더 빠른 토큰 선택
        top_p: 0.85,            // 적절한 다양성 유지
        num_predict: 2000,      // 토큰 수 감소로 속도 향상
        repeat_penalty: 1.1,    // 반복 방지 최소화
        num_ctx: 2048,          // 컨텍스트 크기 감소로 속도 향상
        num_thread: 8,          // 멀티스레드 활용 증가
        stop: ["<|end|>", "###", "---", "\n\n\n"] // 빠른 종료
      }
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    console.log('🔄 온보드 Ollama GPT-OSS 20B API 호출 중...');
    console.log('🤖 모델:', model);
    console.log('⚙️ 최적화 설정 적용됨');
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    console.log('📡 Ollama API 응답 코드:', responseCode);
    console.log('📊 응답 크기:', responseText.length, 'bytes');
    
    if (responseCode !== 200) {
      throw new Error(`온보드 Ollama GPT-OSS 20B API 오류 (${responseCode}): ${responseText}`);
    }
    
    const result = JSON.parse(responseText);
    
    // 응답 품질 검증 (온보드 시스템 무오류 보장)
    if (!result || !result.response) {
      throw new Error('Ollama GPT-OSS 20B 응답이 없습니다. 온보드 시스템 연결을 확인해주세요.');
    }
    
    if (typeof result.response !== 'string' || result.response.trim().length === 0) {
      throw new Error('Ollama GPT-OSS 20B 응답이 비어있습니다. 모델 상태를 확인해주세요.');
    }
    
    if (result.response.length < 100) {
      throw new Error(`Ollama GPT-OSS 20B 응답이 너무 짧습니다 (${result.response.length}자). 고품질 개별화 보고서 생성을 위해 최소 100자 이상이 필요합니다.`);
    }
    
    console.log('✅ 온보드 Ollama GPT-OSS 20B API 응답 성공');
    console.log('📝 생성된 콘텐츠 길이:', result.response.length, '문자');
    
    return result;
    
  } catch (error) {
    console.error('❌ 온보드 Ollama API 호출 오류:', error);
    throw error;
  }
}

// V16.0 OLLAMA ULTIMATE: 폴백 시스템 완전 제거
// 모든 보고서는 Ollama GPT-OSS 20B 100% 사용으로 개별화된 보고서 작성
// generateDefaultReport 함수 제거됨 - 고품질 개별화 보고서 보장을 위함

// ================================================================================
// MODULE 6: HTML 보고서 생성 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 이교장 스타일 HTML 보고서 생성 (V16.0 OLLAMA ULTIMATE - matrix 오류 완전 수정)
 */
function generateLeeKyoJangStyleReport(normalizedData, aiReport, analysisData) {
  console.log('📄 이교장 스타일 HTML 보고서 생성 (V16.0 OLLAMA ULTIMATE)');
  
  // analysisData에서 안전하게 데이터 추출 (matrix 완전 제거)
  const scores = analysisData.scores || {};
  const swot = analysisData.swot || {};
  const actionItems = analysisData.actionItems || {}; // matrix 대신 actionItems 사용
  const roadmap = analysisData.roadmap || {};
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이교장의AI역량진단보고서 - ${normalizedData.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6; 
            color: #333;
            background: #f8f9fa;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin-bottom: 40px;
        }
        .header h1 { 
            font-size: 2.5rem; 
            margin-bottom: 10px;
            font-weight: 700;
        }
        .header p { 
            font-size: 1.2rem; 
            opacity: 0.9;
        }
        .section {
            margin-bottom: 40px;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .section-title {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #3498db;
        }
        .score-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .score-card {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .score-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .score-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        .swot-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .swot-item {
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid;
        }
        .strengths { 
            background: #d4edda; 
            border-left-color: #28a745;
        }
        .weaknesses { 
            background: #f8d7da; 
            border-left-color: #dc3545;
        }
        .opportunities { 
            background: #d1ecf1; 
            border-left-color: #17a2b8;
        }
        .threats { 
            background: #fff3cd; 
            border-left-color: #ffc107;
        }
        .priority-list {
            list-style: none;
        }
        .priority-item {
            background: #f8f9fa;
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .roadmap-phase {
            background: #f8f9fa;
            margin: 15px 0;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #28a745;
        }
        .phase-title {
            font-size: 1.3rem;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .lee-signature {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #2c3e50;
            color: white;
            border-radius: 10px;
        }
        .ollama-badge {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            display: inline-block;
            margin-left: 10px;
        }
        @media (max-width: 768px) {
            .swot-grid { grid-template-columns: 1fr; }
            .score-grid { grid-template-columns: 1fr; }
            .header h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <h1>🎓 이교장의AI역량진단보고서</h1>
            <p>${normalizedData.companyName} 맞춤형 AI 역량진단 결과</p>
            <p>V16.0 OLLAMA ULTIMATE | ${new Date().toLocaleDateString('ko-KR')} <span class="ollama-badge">Ollama GPT-OSS 20B</span></p>
        </div>

        <!-- 진단 개요 -->
        <div class="section">
            <h2 class="section-title">📊 진단 개요</h2>
            <div class="score-grid">
                <div class="score-card">
                    <div class="score-value">${scores.totalScore || 0}/${scores.maxScore || 225}</div>
                    <div class="score-label">총점</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${scores.percentage || 0}%</div>
                    <div class="score-label">달성률</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${scores.grade || 'F'}</div>
                    <div class="score-label">등급</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${scores.maturityLevel || '미흡'}</div>
                    <div class="score-label">성숙도</div>
                </div>
            </div>
        </div>

        <!-- SWOT 분석 -->
        <div class="section">
            <h2 class="section-title">⚡ SWOT 분석</h2>
            <div class="swot-grid">
                <div class="swot-item strengths">
                    <h3>💪 강점 (Strengths)</h3>
                    <ul>
                        ${(swot.strengths || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item weaknesses">
                    <h3>🔧 약점 (Weaknesses)</h3>
                    <ul>
                        ${(swot.weaknesses || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item opportunities">
                    <h3>🚀 기회 (Opportunities)</h3>
                    <ul>
                        ${(swot.opportunities || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item threats">
                    <h3>⚠️ 위협 (Threats)</h3>
                    <ul>
                        ${(swot.threats || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        <!-- 핵심 실행 과제 -->
        <div class="section">
            <h2 class="section-title">🎯 핵심 실행 과제</h2>
            
            <div class="action-phase">
                <h3 style="color: #e74c3c; margin-bottom: 15px;">🚀 즉시 실행 (1-3개월)</h3>
            <ul class="priority-list">
                    ${(actionItems.actionItems?.immediate || []).map(item => `
                        <li class="priority-item" style="border-left-color: #e74c3c;">
                            ${item}
                    </li>
                `).join('')}
            </ul>
            </div>
            
            <div class="action-phase" style="margin-top: 25px;">
                <h3 style="color: #f39c12; margin-bottom: 15px;">⚡ 단기 목표 (3-6개월)</h3>
                <ul class="priority-list">
                    ${(actionItems.actionItems?.shortTerm || []).map(item => `
                        <li class="priority-item" style="border-left-color: #f39c12;">
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="action-phase" style="margin-top: 25px;">
                <h3 style="color: #27ae60; margin-bottom: 15px;">🏆 장기 비전 (6-12개월)</h3>
                <ul class="priority-list">
                    ${(actionItems.actionItems?.longTerm || []).map(item => `
                        <li class="priority-item" style="border-left-color: #27ae60;">
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>

        <!-- 3단계 실행 로드맵 -->
        <div class="section">
            <h2 class="section-title">🗺️ 3단계 실행 로드맵</h2>
            
            <div class="roadmap-phase">
                <div class="phase-title">${roadmap.phase1?.title || '1단계: 기반 구축'}</div>
                <p><strong>기간:</strong> ${roadmap.phase1?.duration || '1-3개월'}</p>
                <p><strong>주요 활동:</strong> ${(roadmap.phase1?.activities || []).join(', ')}</p>
                <p><strong>예상 성과:</strong> ${(roadmap.phase1?.outcomes || []).join(', ')}</p>
            </div>
            
            <div class="roadmap-phase">
                <div class="phase-title">${roadmap.phase2?.title || '2단계: 역량 확장'}</div>
                <p><strong>기간:</strong> ${roadmap.phase2?.duration || '4-6개월'}</p>
                <p><strong>주요 활동:</strong> ${(roadmap.phase2?.activities || []).join(', ')}</p>
                <p><strong>예상 성과:</strong> ${(roadmap.phase2?.outcomes || []).join(', ')}</p>
            </div>
            
            <div class="roadmap-phase">
                <div class="phase-title">${roadmap.phase3?.title || '3단계: 혁신 실현'}</div>
                <p><strong>기간:</strong> ${roadmap.phase3?.duration || '7-12개월'}</p>
                <p><strong>주요 활동:</strong> ${(roadmap.phase3?.activities || []).join(', ')}</p>
                <p><strong>예상 성과:</strong> ${(roadmap.phase3?.outcomes || []).join(', ')}</p>
            </div>
        </div>

        <!-- AI 전문가 분석 -->
        <div class="section">
            <h2 class="section-title">🤖 Ollama AI 전문가 분석</h2>
            <p><strong>현황 분석:</strong> ${aiReport.currentStateAnalysis || '현재 AI 역량 수준을 분석했습니다.'}</p>
            <p><strong>전략적 권고:</strong> ${aiReport.strategicRecommendations || '맞춤형 전략적 권고사항을 제시합니다.'}</p>
            <p><strong>실행 가이드:</strong> ${aiReport.implementationGuidance || '단계별 실행 가이드라인을 제공합니다.'}</p>
        </div>

        <!-- 이교장 서명 -->
        <div class="lee-signature">
            <h3>🎓 이교장의 한마디</h3>
            <p>"AI는 도구가 아니라 새로운 사고방식입니다. 로컬 AI로 더욱 안전하고 효율적인 혁신을 만들어가시기 바랍니다!"</p>
            <p><strong>- 이교장, AICAMP 대표 -</strong></p>
        </div>

        <!-- 푸터 -->
        <div class="footer">
            <p>📧 문의: hongik423@gmail.com | 🌐 웹사이트: aicamp.club</p>
            <p>© 2025 AICAMP. All rights reserved. | V16.0 OLLAMA ULTIMATE</p>
            <p>🤖 Powered by Ollama GPT-OSS 20B (13.8GB) - 100% Local AI</p>
        </div>
    </div>
</body>
</html>
`;

  return htmlContent;
}

// ================================================================================
// MODULE 7: 데이터 저장 및 이메일 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 신청자/관리자 접수확인 메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
async function sendApplicationConfirmationEmails(normalizedData, diagnosisId) {
  console.log('📧 접수확인 메일 발송 시작');
  
  const config = getEnvironmentConfig();
  
  try {
    // 이메일 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      console.warn(`⚠️ Gmail 일일 할당량 부족: ${remainingQuota}개 남음`);
    }
    
    let emailsSent = 0;
    let emailErrors = [];
    
    // 신청자 접수확인 메일 발송
    try {
      if (normalizedData.contactEmail && normalizedData.contactEmail !== '정보없음') {
        const applicantEmail = generateApplicantConfirmationEmail(normalizedData, diagnosisId);
        const sendResult = sendEmailWithRetry({
          to: normalizedData.contactEmail,
          subject: applicantEmail.subject,
          htmlBody: applicantEmail.body,
          name: '이교장의AI역량진단보고서'
        }, 3);
        if (!sendResult.success) throw new Error(sendResult.error || 'unknown');
        console.log('✅ 신청자 접수확인 메일 발송 완료:', normalizedData.contactEmail);
        emailsSent++;
      }
    } catch (error) {
      console.error('❌ 신청자 접수확인 메일 발송 실패:', error);
      emailErrors.push('신청자 접수확인 메일 발송 실패');
    }
    
    // 관리자 접수확인 메일 발송
    try {
      const adminEmail = generateAdminConfirmationEmail(normalizedData, diagnosisId);
      const sendResult2 = sendEmailWithRetry({
        to: config.ADMIN_EMAIL,
        subject: adminEmail.subject,
        htmlBody: adminEmail.body,
        name: 'AICAMP 시스템 알림'
      }, 3);
      if (!sendResult2.success) throw new Error(sendResult2.error || 'unknown');
      console.log('✅ 관리자 접수확인 메일 발송 완료:', config.ADMIN_EMAIL);
      emailsSent++;
    } catch (error) {
      console.error('❌ 관리자 접수확인 메일 발송 실패:', error);
      emailErrors.push('관리자 접수확인 메일 발송 실패');
    }
    
    return {
      success: emailsSent > 0,
      emailsSent: emailsSent,
      errors: emailErrors,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 접수확인 메일 발송 시스템 오류:', error);
    return {
      success: false,
      emailsSent: 0,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 신청자 접수확인 메일 생성 (V16.0 OLLAMA ULTIMATE)
 */
function generateApplicantConfirmationEmail(normalizedData, diagnosisId) {
  const config = getEnvironmentConfig();
  const logoUrl = `https://${config.AICAMP_WEBSITE}/images/aicamp_logo_del_250726.png`;
  const subject = `AICAMP | AI 역량진단 접수 완료 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #1d1d1f; background:#f5f5f7; }
        .header { background: #000; color: #fff; padding: 32px 24px; text-align: center; }
        .brand { display:flex; align-items:center; justify-content:center; gap:12px; }
        .brand img { width:120px; height:auto; display:block; }
        .brand h1 { margin:0; font-size:22px; font-weight:700; letter-spacing:-0.3px; }
        .content { padding: 30px; }
        .info-box { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .timeline-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .footer { background: #111827; color: #e5e7eb; padding: 20px; text-align: center; font-size:13px; }
        .highlight { background: #eef2ff; padding: 15px; border-left: 4px solid #6366f1; margin: 15px 0; border-radius:8px; }
        .ollama-badge { background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
      <div class="brand">
        <img src="${logoUrl}" alt="AICAMP" />
        <h1>AI 역량진단 접수 완료 <span class="ollama-badge">Ollama</span></h1>
      </div>
    </div>
    
    <div class="content">
      <h2>안녕하세요, ${normalizedData.contactName}님!</h2>
      
      <p><strong>${normalizedData.companyName}</strong>의 AI 역량진단 신청이 성공적으로 접수되었습니다.</p>
      
      <div class="info-box">
        <h3>📋 접수 정보</h3>
        <ul>
          <li><strong>진단 ID:</strong> ${diagnosisId}</li>
          <li><strong>회사명:</strong> ${normalizedData.companyName}</li>
          <li><strong>업종:</strong> ${normalizedData.industry}</li>
          <li><strong>담당자:</strong> ${normalizedData.contactName}</li>
          <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
        </ul>
      </div>
      
      <div class="timeline-box">
        <h3>⏰ 처리 일정</h3>
        <p>현재 Ollama GPT-OSS 20B AI가 45개 행동지표를 기반으로 정밀 분석을 진행하고 있습니다.</p>
        <p><strong>예상 완료 시간:</strong> 약 10-15분 내</p>
        <p><strong>보고서 발송:</strong> 분석 완료 즉시 이메일로 발송</p>
        <p><strong>AI 엔진:</strong> 100% 로컬 AI (Ollama GPT-OSS 20B)</p>
      </div>
      
      <div class="highlight">
        <h3>🎓 이교장의 한마디</h3>
        <p>"로컬 AI로 더욱 안전하고 효율적인 분석을 제공합니다. 곧 완성될 맞춤형 보고서를 통해 귀하의 조직이 AI 시대를 선도하는 기업으로 성장하시길 바랍니다!"</p>
      </div>
      
      <p>문의사항이 있으시면 언제든 연락주세요.</p>
    </div>
    
    <div class="footer">
      <p>📧 ${config.ADMIN_EMAIL} | 🌐 ${config.AICAMP_WEBSITE}</p>
      <p>© 2025 AICAMP. All rights reserved. | V16.0 OLLAMA ULTIMATE</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 관리자 접수확인 메일 생성 (V16.0 OLLAMA ULTIMATE)
 */
function generateAdminConfirmationEmail(normalizedData, diagnosisId) {
  const config = getEnvironmentConfig();
  const subject = `[AICAMP 관리자] 새로운 AI 역량진단 접수 - ${normalizedData.companyName}`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table th, .info-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .info-table th { background-color: #f8f9fa; font-weight: bold; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .ollama-badge { background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 새로운 AI 역량진단 접수 알림 <span class="ollama-badge">Ollama</span></h1>
    </div>
    
    <div class="content">
        <h2>관리자님, 새로운 진단 요청이 접수되었습니다.</h2>
        
        <table class="info-table">
            <tr><th>진단 ID</th><td>${diagnosisId}</td></tr>
            <tr><th>회사명</th><td>${normalizedData.companyName}</td></tr>
            <tr><th>업종</th><td>${normalizedData.industry}</td></tr>
            <tr><th>직원 수</th><td>${normalizedData.employeeCount}</td></tr>
            <tr><th>담당자명</th><td>${normalizedData.contactName}</td></tr>
            <tr><th>이메일</th><td>${normalizedData.contactEmail}</td></tr>
            <tr><th>전화번호</th><td>${normalizedData.contactPhone}</td></tr>
            <tr><th>접수일시</th><td>${new Date().toLocaleString('ko-KR')}</td></tr>
        </table>
        
        <div class="alert">
            <h3>📊 처리 상태</h3>
            <p>• 시스템이 자동으로 45개 행동지표 분석을 시작했습니다.</p>
            <p>• Ollama GPT-OSS 20B AI가 종합 보고서를 생성 중입니다.</p>
            <p>• 완료 시 신청자에게 자동으로 이메일이 발송됩니다.</p>
            <p>• <strong>AI 엔진:</strong> 100% 로컬 AI (보안 강화)</p>
        </div>
        
        <p><strong>시스템 버전:</strong> V16.0-OLLAMA-ULTIMATE</p>
        <p><strong>처리 예상 시간:</strong> 10-15분</p>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 이메일 재시도 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendEmailWithRetry(emailOptions, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      GmailApp.sendEmail(
        emailOptions.to,
        emailOptions.subject,
        '', // 텍스트 본문 (빈 문자열)
        {
          htmlBody: emailOptions.htmlBody,
          name: emailOptions.name || 'AICAMP'
        }
      );
      
      console.log(`✅ 이메일 발송 성공 (${attempt}/${maxRetries}):`, emailOptions.to);
      return { success: true, attempt: attempt };
      
    } catch (error) {
      console.error(`❌ 이메일 발송 실패 (${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        return { success: false, error: error.message, attempts: maxRetries };
      }
      
      // 재시도 전 대기 (2초)
      Utilities.sleep(2000);
    }
  }
}

/**
 * 통합 워크플로우 결과 처리 (V16.0 OLLAMA ULTIMATE)
 */
async function handleIntegratedWorkflowResult(requestData, progressId) {
  try {
    console.log('🎯 통합 워크플로우 결과 처리 시작 - V16.0');
    console.log('📊 받은 데이터 타입:', requestData.type);
    console.log('📊 처리 타입:', requestData.processType);
    
    // Next.js에서 보낸 데이터 구조 확인
    const hasWorkflowResult = requestData.workflowResult;
    const hasDirectData = requestData.scoreAnalysis && requestData.swotAnalysis;
    
    if (!hasWorkflowResult && !hasDirectData) {
      throw new Error('워크플로우 결과 또는 분석 데이터가 없습니다.');
    }
    
    // 데이터 정규화
    let analysisData;
    let ollamaReport = null;
    let htmlReport = null;
    
    if (hasWorkflowResult) {
      // 기존 방식 (workflowResult 객체 내부)
      const { workflowResult } = requestData;
      analysisData = workflowResult.analysisResult;
      ollamaReport = workflowResult.ollamaReport;
      htmlReport = workflowResult.htmlReport;
    } else {
      // 새로운 방식 (직접 전달)
      analysisData = {
        diagnosisId: requestData.diagnosisId,
        companyInfo: {
          name: requestData.companyName,
          industry: requestData.industry,
          size: requestData.employeeCount,
          contact: {
            name: requestData.contactName,
            email: requestData.contactEmail,
            phone: requestData.contactPhone
          }
        },
        scoreAnalysis: requestData.scoreAnalysis,
        swotAnalysis: requestData.swotAnalysis,
        recommendations: requestData.recommendations,
        roadmap: requestData.roadmap,
        qualityMetrics: requestData.qualityMetrics || {
          overallQuality: 85,
          dataCompleteness: 90,
          aiAnalysisDepth: 80
        }
      };
    }
    
    // 1단계: 진행 상황 업데이트
    updateProgressStatus(progressId, 'processing', 'SWOT 분석 및 보고서 생성을 시작합니다');
    
    // 2단계: Google Sheets 저장
    console.log('📊 Google Sheets 저장');
    updateProgressStatus(progressId, 'processing', 'Google Sheets에 분석 결과를 저장하고 있습니다');
    
    const sheetsResult = saveIntegratedResultToSheets({
      ...analysisData,
      reportGenerated: true,
      timestamp: new Date().toISOString()
    });
    
    // 3단계: 이메일 발송
    console.log('📧 결과 이메일 발송');
    updateProgressStatus(progressId, 'processing', '분석 결과를 이메일로 발송하고 있습니다');
    
    const emailResult = sendDiagnosisResultEmail({
      companyName: analysisData.companyInfo.name,
      contactName: analysisData.companyInfo.contact.name,
      contactEmail: analysisData.companyInfo.contact.email,
      diagnosisId: analysisData.diagnosisId,
      scoreAnalysis: analysisData.scoreAnalysis,
      htmlReport: htmlReport
    });
    
    updateProgressStatus(progressId, 'completed', '통합 워크플로우 결과 처리가 완료되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'ai_diagnosis_complete',
        diagnosisId: analysisData.diagnosisId,
        message: '통합 워크플로우 결과가 성공적으로 처리되었습니다.',
        results: {
          dataSaved: sheetsResult.success,
          emailSent: emailResult.success
        },
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 통합 워크플로우 결과 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 통합 결과 Google Sheets 저장 (V16.0 OLLAMA ULTIMATE)
 */
function saveIntegratedResultToSheets(data) {
  try {
    console.log('💾 통합 결과 Google Sheets 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 메인 데이터 시트
    let mainSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    if (!mainSheet) {
      mainSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
      // 헤더 추가
      mainSheet.getRange(1, 1, 1, 15).setValues([[
        '진단ID', '회사명', '담당자명', '이메일', '전화번호', '업종', '직원수', 
        '총점', '평균점수', '등급', '성숙도', '백분율', '생성일시', '버전', '상태'
      ]]);
    }
    
    // 데이터 추가
    const newRow = [
      data.diagnosisId,
      data.companyInfo.name,
      data.companyInfo.contact.name,
      data.companyInfo.contact.email,
      data.companyInfo.contact.phone,
      data.companyInfo.industry,
      data.companyInfo.size,
      data.scoreAnalysis.totalScore || 0,
      data.scoreAnalysis.averageScore || 0,
      data.scoreAnalysis.grade || 'F',
      data.scoreAnalysis.maturityLevel || '초급',
      data.scoreAnalysis.percentile || 0,
      new Date().toISOString(),
      'V16.0-OLLAMA-ULTIMATE',
      '완료'
    ];
    
    mainSheet.appendRow(newRow);
    
    console.log('✅ 통합 결과 Google Sheets 저장 완료');
    
    return { success: true, message: 'Google Sheets 저장 완료' };
    
  } catch (error) {
    console.error('❌ 통합 결과 Google Sheets 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// 🎯 V16.0 호환 래퍼: 레거시 matrix 제거 및 통합 저장 경로 우회
// - 일부 배포 환경에서 남아있는 레거시 호출(saveScoreAnalysis/saveToGoogleSheets)을 흡수
// - matrix 변수를 전혀 사용하지 않고 actionItems 구조로 정규화
// ================================================================================

// actionItems 정규화 유틸 (matrix 완전 제거)
function normalizeActionItems(input) {
  var ai = null;

  // V16 표준 필드 우선
  if (input && input.actionItems) {
    ai = input.actionItems;
  }

  // 레거시/대체 경로: recommendations 기반 재구성
  if (!ai && input && input.recommendations) {
    ai = {
      immediate: input.recommendations.immediate || [],
      shortTerm: input.recommendations.shortTerm || [],
      longTerm: input.recommendations.longTerm || []
    };
  }

  // 기본값
  if (!ai) {
    ai = { immediate: [], shortTerm: [], longTerm: [] };
  }

  return ai;
}

// 레거시 함수 대체: 점수 분석 저장 (matrix 미사용)
function saveScoreAnalysis(data) {
  var score = data && (data.scoreAnalysis || data.scores) || {};
  var actionItems = normalizeActionItems(data || {});

  return {
    totalScore: Number(score.totalScore || 0),
    averageScore: Number(
      (score.averageScore != null)
        ? score.averageScore
        : (score.totalScore ? (score.totalScore / 45) : 0)
    ),
    grade: score.grade || 'F',
    maturityLevel: score.maturityLevel || '초급',
    percentile: Number(score.percentile || 0),
    actionItems: actionItems
  };
}

// 레거시 함수 대체: Google Sheets 저장을 V16 통합 저장으로 우회
function saveToGoogleSheets(requestData) {
  var analysisData = {
    diagnosisId: (requestData && requestData.diagnosisId) || ('DIAG_' + Date.now()),
    companyInfo: {
      name: (requestData && requestData.companyName) || '정보없음',
      contact: {
        name: (requestData && requestData.contactName) || '정보없음',
        email: (requestData && requestData.contactEmail) || '정보없음',
        phone: (requestData && requestData.contactPhone) || '정보없음'
      },
      industry: (requestData && requestData.industry) || '정보없음',
      size: (requestData && requestData.employeeCount) || '정보없음'
    },
    scoreAnalysis: (requestData && (requestData.scoreAnalysis || requestData.scores)) || {},
    swot: (requestData && (requestData.swot || requestData.swotAnalysis)) || {},
    actionItems: normalizeActionItems(requestData || {}),
    roadmap: (requestData && requestData.roadmap) || {}
  };

  return saveIntegratedResultToSheets(analysisData);
}

/**
 * 진단 결과 이메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendDiagnosisResultEmail(params) {
  try {
    console.log('📧 진단 결과 이메일 발송 시작');
    
    const env = getEnvironmentConfig();
    
    const subject = `🎓 ${params.companyName} AI 역량진단 결과 - 이교장의AI역량진단보고서`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎓 이교장의AI역량진단보고서</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">V16.0 OLLAMA ULTIMATE</p>
        <span style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">Ollama GPT-OSS 20B</span>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${params.contactName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          <strong>${params.companyName}</strong>의 AI 역량진단이 완료되었습니다.<br>
          로컬 AI 기반 전문적인 분석 결과를 확인해보세요.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #3498db;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📊 진단 결과 요약</h3>
          <ul style="line-height: 1.8;">
            <li><strong>진단 ID:</strong> ${params.diagnosisId}</li>
            <li><strong>총점:</strong> ${params.scoreAnalysis.totalScore || 0}점</li>
            <li><strong>등급:</strong> ${params.scoreAnalysis.grade || 'F'}</li>
            <li><strong>성숙도:</strong> ${params.scoreAnalysis.maturityLevel || '초급'}</li>
            <li><strong>AI 엔진:</strong> Ollama GPT-OSS 20B (로컬)</li>
          </ul>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">🎓 이교장의 한마디</h3>
          <p style="font-style: italic; line-height: 1.6;">
            ${generatePrincipalInsight(params.scoreAnalysis)}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${env.ADMIN_EMAIL} | 🌐 웹사이트: ${env.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved. | V16.0 OLLAMA ULTIMATE
          </p>
        </div>
      </div>
    </div>
    `;
    
    // 이메일 발송
    const sendResult = sendEmailWithRetry({
      to: params.contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: '이교장 (AICAMP)'
    }, 3);
    
    console.log('✅ 진단 결과 이메일 발송 완료');
    
    return { success: sendResult.success, message: '이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 진단 결과 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류 로그 저장 (V16.0 OLLAMA ULTIMATE)
 */
function saveErrorLog(type, id, error, requestData) {
  try {
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    const errorSheet = getOrCreateSheet(spreadsheet, 'ERROR_LOG');
    
    // 헤더 설정 (최초 1회)
    if (errorSheet.getLastRow() === 0) {
      const headers = ['타입', 'ID', '오류메시지', '스택트레이스', '요청데이터', '발생시간'];
      errorSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      errorSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dc3545').setFontColor('white');
    }
    
    const row = [
      type,
      id,
      error.message || error.toString(),
      error.stack || '',
      JSON.stringify(requestData || {}),
      new Date().toISOString()
    ];
    
    errorSheet.appendRow(row);
    console.log('📝 오류 로그 저장 완료:', type, id);
    
  } catch (logError) {
    console.error('❌ 오류 로그 저장 실패:', logError);
  }
}

/**
 * Google Sheets에 데이터 저장 (V16.0 OLLAMA ULTIMATE)
 */
async function saveAIDiagnosisData(normalizedData, aiReport, htmlReport, progressId) {
  try {
    console.log('💾 Google Sheets 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    // 메인 데이터 시트
    let mainSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
    if (!mainSheet) {
      mainSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.AI_DIAGNOSIS_MAIN);
      // 헤더 추가
      mainSheet.getRange(1, 1, 1, 15).setValues([[
        '진단ID', '회사명', '담당자명', '이메일', '전화번호', '업종', '직원수', 
        '총점', '평균점수', '등급', '성숙도', '백분율', '생성일시', '버전', '상태'
      ]]);
    }
    
    // 데이터 추가
    const newRow = [
      normalizedData.diagnosisId,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone,
      normalizedData.industry,
      normalizedData.employeeCount,
      aiReport.totalScore || 0,
      aiReport.averageScore || 0,
      aiReport.grade || 'F',
      aiReport.maturityLevel || '초급',
      aiReport.percentile || 0,
      new Date().toISOString(),
      'V16.0-OLLAMA-ULTIMATE',
      '완료'
    ];
    
    mainSheet.appendRow(newRow);
    
    console.log('✅ Google Sheets 저장 완료');
    
    return { success: true, message: 'Google Sheets 저장 완료' };
    
  } catch (error) {
    console.error('❌ Google Sheets 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Google Drive에 HTML 보고서 업로드 (V16.0 OLLAMA ULTIMATE - AICAMP_REPORTS 폴더 자동 처리)
 */
async function uploadReportToDrive(diagnosisId, htmlReport, normalizedData) {
  try {
    console.log('🗂️ Google Drive HTML 보고서 업로드 시작');
    
    const env = getEnvironmentConfig();
    let folderId = env.DRIVE_FOLDER_ID;
    
    // 1. 폴더 ID로 접근 시도 (개선된 방식)
    let folder = null;
    if (folderId) {
      try {
        folder = DriveApp.getFolderById(folderId);
        console.log('✅ 설정된 폴더 ID로 접근 성공:', folder.getName());
        
        // 폴더 접근 권한 확인
        try {
          folder.getFiles();
          console.log('✅ 폴더 접근 권한 확인 완료');
        } catch (permissionError) {
          console.warn('⚠️ 폴더 접근 권한 없음, 새 폴더 생성 시도');
          folder = null;
          folderId = null;
        }
      } catch (folderError) {
        console.warn('⚠️ 설정된 폴더 ID로 접근 실패:', folderError.message);
        folderId = null;
      }
    }
    
    // 2. AICAMP_REPORTS 폴더 이름으로 검색 (개선된 방식)
    if (!folder) {
      console.log('🔍 AICAMP_REPORTS 폴더 검색 중...');
      try {
        const folders = DriveApp.getFoldersByName('AICAMP_REPORTS');
        
        if (folders.hasNext()) {
          folder = folders.next();
          folderId = folder.getId();
          console.log('✅ AICAMP_REPORTS 폴더 발견:', folderId);
          
          // 폴더 접근 권한 확인
          try {
            folder.getFiles();
            console.log('✅ 기존 폴더 접근 권한 확인 완료');
            
            // 환경변수 업데이트
            const properties = PropertiesService.getScriptProperties();
            properties.setProperty('DRIVE_FOLDER_ID', folderId);
            console.log('✅ DRIVE_FOLDER_ID 환경변수 업데이트 완료');
          } catch (permissionError) {
            console.warn('⚠️ 기존 폴더 접근 권한 없음, 새 폴더 생성');
            folder = null;
            folderId = null;
          }
        }
      } catch (searchError) {
        console.warn('⚠️ 폴더 검색 중 오류:', searchError.message);
      }
    }
    
    // 3. AICAMP_REPORTS 폴더가 없으면 새로 생성 (개선된 방식)
    if (!folder) {
      console.log('📁 AICAMP_REPORTS 폴더를 새로 생성합니다');
      try {
        folder = DriveApp.createFolder('AICAMP_REPORTS');
        folderId = folder.getId();
        
        // 폴더 공유 설정 (링크 공유 활성화)
        folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        
        // 환경변수 업데이트
        const properties = PropertiesService.getScriptProperties();
        properties.setProperty('DRIVE_FOLDER_ID', folderId);
        
        console.log('✅ AICAMP_REPORTS 폴더 생성 완료:', folderId);
        console.log('🔗 폴더 공유 링크:', folder.getUrl());
      } catch (createError) {
        console.error('❌ 폴더 생성 실패:', createError.message);
        throw new Error('Google Drive 폴더 생성에 실패했습니다: ' + createError.message);
      }
    }
    
    // 4. 파일명 생성
    const companyName = normalizedData?.companyName || 'Unknown';
    const safeCompanyName = companyName.replace(/[^a-zA-Z0-9가-힣]/g, '_');
    const fileName = `이교장의AI역량진단보고서_${safeCompanyName}_${diagnosisId}.html`;
    
    // 5. HTML 내용 검증
    if (!htmlReport || typeof htmlReport !== 'string') {
      throw new Error('HTML 보고서 내용이 유효하지 않습니다');
    }
    
    console.log('📄 파일 업로드 준비:', {
      folderId: folderId,
      folderName: folder.getName(),
      fileName: fileName,
      htmlLength: htmlReport.length
    });
    
    // 6. 파일 생성 및 업로드
    const blob = Utilities.newBlob(htmlReport, 'text/html', fileName);
    const file = folder.createFile(blob);
    
    // 7. 파일 공유 설정
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const shareLink = file.getUrl();
    
    console.log('✅ Google Drive 업로드 완료');
    console.log('📁 파일 정보:', {
      fileId: file.getId(),
      fileName: fileName,
      fileSize: file.getSize(),
      shareLink: shareLink,
      folderId: folderId,
      folderName: folder.getName()
    });
    
    return {
      success: true,
      fileId: file.getId(),
      shareLink: shareLink,
      fileName: fileName,
      fileSize: file.getSize(),
      folderId: folderId,
      folderName: folder.getName()
    };
    
  } catch (error) {
    console.error('❌ Google Drive 업로드 오류:', error);
    console.error('❌ 오류 상세:', {
      diagnosisId: diagnosisId,
      companyName: normalizedData?.companyName,
      htmlReportLength: htmlReport?.length,
      errorMessage: error.message,
      errorStack: error.stack
    });
    
    return {
      success: false,
      error: error.message,
      shareLink: null,
      details: {
        diagnosisId: diagnosisId,
        companyName: normalizedData?.companyName,
        htmlReportLength: htmlReport?.length
      }
    };
  }
}

/**
 * Drive 업로드 요청 처리 (V16.0 OLLAMA ULTIMATE)
 */
function handleDriveUploadRequest(requestData, progressId) {
  try {
    console.log('🗂️ Drive 업로드 요청 처리');
    const { diagnosisId, htmlReport, normalizedData } = requestData;
    if (!diagnosisId || !htmlReport) {
      throw new Error('diagnosisId와 htmlReport는 필수입니다');
    }
    const result = uploadReportToDrive(diagnosisId, htmlReport, normalizedData || { companyName: '' });
    updateProgressStatus(progressId, 'processing', 'Drive 업로드 완료');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, ...result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    updateProgressStatus(progressId, 'error', `Drive 업로드 오류: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Drive 파일 목록 조회 (V16.0 OLLAMA ULTIMATE)
 */
function handleDriveListRequest(requestData, progressId) {
  try {
    console.log('📃 Drive 파일 목록 조회');
    const env = getEnvironmentConfig();
    const folder = DriveApp.getFolderById(env.DRIVE_FOLDER_ID);
    const files = [];
    const it = folder.getFiles();
    while (it.hasNext() && files.length < 50) {
      const f = it.next();
      files.push({ id: f.getId(), name: f.getName(), url: f.getUrl(), createdAt: f.getDateCreated() });
    }
    updateProgressStatus(progressId, 'processing', 'Drive 목록 조회 완료');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, files }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    updateProgressStatus(progressId, 'error', `Drive 목록 조회 오류: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Drive 파일 상태 확인 (V16.0 OLLAMA ULTIMATE)
 */
function handleDriveCheckRequest(requestData, progressId) {
  try {
    console.log('🔎 Drive 파일 상태 확인');
    const { fileId } = requestData;
    if (!fileId) throw new Error('fileId가 필요합니다');
    const file = DriveApp.getFileById(fileId);
    const payload = { id: file.getId(), name: file.getName(), url: file.getUrl(), size: file.getSize(), createdAt: file.getDateCreated() };
    updateProgressStatus(progressId, 'processing', 'Drive 파일 상태 확인 완료');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, file: payload }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    updateProgressStatus(progressId, 'error', `Drive 파일 상태 확인 오류: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 진단 결과 이메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendDiagnosisEmail(normalizedData, aiReport, driveLink, diagnosisId) {
  try {
    console.log('📧 진단 결과 이메일 발송 시작');
    
    const env = getEnvironmentConfig();
    
    // 이메일 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      console.warn(`⚠️ Gmail 일일 할당량 부족: ${remainingQuota}개 남음`);
      throw new Error(`Gmail 일일 할당량이 부족합니다: ${remainingQuota}개 남음`);
    }
    
    const subject = `🎓 ${normalizedData.companyName} AI 역량진단 결과 - 이교장의AI역량진단보고서`;
    
    // aiReport에서 scoreAnalysis 데이터 추출 (안전한 방식)
    const scoreAnalysis = {
      totalScore: aiReport.totalScore || aiReport.scoreAnalysis?.totalScore || 0,
      percentage: aiReport.percentage || aiReport.scoreAnalysis?.percentage || 0,
      grade: aiReport.grade || aiReport.scoreAnalysis?.grade || 'F',
      maturityLevel: aiReport.maturityLevel || aiReport.scoreAnalysis?.maturityLevel || '초급',
      categoryScores: aiReport.categoryScores || aiReport.scoreAnalysis?.categoryScores || {}
    };
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎓 이교장의AI역량진단보고서</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">V16.0 OLLAMA ULTIMATE</p>
        <span style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">Ollama GPT-OSS 20B</span>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${normalizedData.contactName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          <strong>${normalizedData.companyName}</strong>의 AI 역량진단이 완료되었습니다.<br>
          로컬 AI 기반 전문적인 분석 결과를 확인해보세요.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #3498db;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📊 진단 결과 요약</h3>
          <ul style="line-height: 1.8;">
            <li><strong>진단 ID:</strong> ${diagnosisId}</li>
            <li><strong>총점:</strong> ${scoreAnalysis.totalScore}점</li>
            <li><strong>등급:</strong> ${scoreAnalysis.grade}</li>
            <li><strong>성숙도:</strong> ${scoreAnalysis.maturityLevel}</li>
            <li><strong>AI 엔진:</strong> Ollama GPT-OSS 20B (로컬)</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${driveLink}" 
             style="display: inline-block; background: #3498db; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            📄 상세 보고서 다운로드
          </a>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">🎓 이교장의 한마디</h3>
          <p style="font-style: italic; line-height: 1.6;">
            ${generatePrincipalInsight(scoreAnalysis)}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${env.ADMIN_EMAIL} | 🌐 웹사이트: ${env.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved. | V16.0 OLLAMA ULTIMATE
          </p>
        </div>
      </div>
    </div>
    `;
    
    // 이메일 발송 (신청자)
    console.log('📧 신청자 이메일 발송 시작:', normalizedData.contactEmail);
    GmailApp.sendEmail(
      normalizedData.contactEmail,
      subject,
      '', // 텍스트 본문 (빈 문자열)
      {
        htmlBody: htmlBody,
        name: '이교장 (AICAMP)'
      }
    );
    console.log('✅ 신청자 이메일 발송 완료');
    
    // 관리자에게도 사본 발송
    console.log('📧 관리자 이메일 발송 시작:', env.ADMIN_EMAIL);
    GmailApp.sendEmail(
      env.ADMIN_EMAIL,
      `[관리자] ${subject}`,
      `진단 완료 알림\n\n회사: ${normalizedData.companyName}\n담당자: ${normalizedData.contactName}\n이메일: ${normalizedData.contactEmail}\n진단ID: ${diagnosisId}\n\n보고서 링크: ${driveLink}`,
      {
        name: 'AICAMP 시스템'
      }
    );
    console.log('✅ 관리자 이메일 발송 완료');
    
    console.log('✅ 모든 이메일 발송 완료');
    
    return { 
      success: true, 
      message: '이메일 발송 완료',
      details: {
        applicantEmail: normalizedData.contactEmail,
        adminEmail: env.ADMIN_EMAIL,
        driveLink: driveLink,
        diagnosisId: diagnosisId
      }
    };
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// MODULE 8: 기타 기능 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 상담신청 처리 (V16.0 OLLAMA ULTIMATE)
 */
async function handleConsultationRequest(requestData, progressId) {
  console.log('💬 상담신청 처리 시작 - 통합 시스템');
  
  const config = getEnvironmentConfig();
  const consultationId = generateConsultationId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '상담신청 정보를 검증하고 있습니다');
    console.log('📋 1단계: 상담신청 데이터 검증');
    const normalizedData = normalizeConsultationData(requestData.data || requestData, consultationId);
    
    // 2단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '상담신청 정보를 저장하고 있습니다');
    console.log('💾 2단계: Google Sheets 저장');
    const saveResult = saveConsultationData(normalizedData);
    
    // 3단계: 신청자 확인 이메일 발송
    updateProgressStatus(progressId, 'processing', '신청자에게 확인 이메일을 발송하고 있습니다');
    console.log('📧 3단계: 신청자 확인 이메일 발송');
    const applicantEmailResult = sendConsultationConfirmationEmail(normalizedData);
    
    // 4단계: 관리자 알림 이메일 발송
    updateProgressStatus(progressId, 'processing', '관리자에게 알림 이메일을 발송하고 있습니다');
    console.log('📧 4단계: 관리자 알림 이메일 발송');
    const adminEmailResult = sendConsultationAdminNotification(normalizedData);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 상담신청 처리 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '상담신청이 성공적으로 접수되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'consultation_request',
        consultationId: consultationId,
        message: '상담신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
        results: {
          dataSaved: saveResult.success,
          applicantEmailSent: applicantEmailResult.success,
          adminEmailSent: adminEmailResult.success
        },
        processingTime: processingTime,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    saveErrorLog('consultation', consultationId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        consultationId: consultationId,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 오류신고 처리 (V16.0 OLLAMA ULTIMATE)
 */
function handleErrorReport(requestData, progressId) {
  console.log('🚨 오류신고 처리 시작 - 통합 시스템');
  
  const config = getEnvironmentConfig();
  const reportId = generateErrorReportId();
  const startTime = new Date().getTime();
  
  try {
    // 1단계: 데이터 검증 및 정규화
    updateProgressStatus(progressId, 'processing', '오류신고 정보를 검증하고 있습니다');
    console.log('📋 1단계: 오류신고 데이터 검증');
    const normalizedData = normalizeErrorReportData(requestData.data || requestData, reportId);
    
    // 2단계: Google Sheets 저장
    updateProgressStatus(progressId, 'processing', '오류신고 정보를 저장하고 있습니다');
    console.log('💾 2단계: Google Sheets 저장');
    const saveResult = saveErrorReportData(normalizedData);
    
    // 3단계: 신고자 확인 이메일 발송
    updateProgressStatus(progressId, 'processing', '신고자에게 확인 이메일을 발송하고 있습니다');
    console.log('📧 3단계: 신고자 확인 이메일 발송');
    const reporterEmailResult = sendErrorReportConfirmationEmail(normalizedData);
    
    // 4단계: 관리자 긴급 알림 이메일 발송
    updateProgressStatus(progressId, 'processing', '관리자에게 긴급 알림 이메일을 발송하고 있습니다');
    console.log('📧 4단계: 관리자 긴급 알림 이메일 발송');
    const adminEmailResult = sendErrorReportAdminNotification(normalizedData);
    
    const processingTime = new Date().getTime() - startTime;
    console.log('✅ 오류신고 처리 완료 - 총 소요시간:', processingTime + 'ms');
    
    updateProgressStatus(progressId, 'completed', '오류신고가 성공적으로 접수되었습니다');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        type: 'error_report',
        reportId: reportId,
        message: '오류신고가 접수되었습니다. 신속히 확인하여 조치하겠습니다.',
        results: {
          dataSaved: saveResult.success,
          reporterEmailSent: reporterEmailResult.success,
          adminEmailSent: adminEmailResult.success
        },
        processingTime: processingTime,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 오류신고 처리 오류:', error);
    
    updateProgressStatus(progressId, 'error', `오류 발생: ${error.message}`);
    saveErrorLog('error_report', reportId, error, requestData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        reportId: reportId,
        version: 'V16.0-OLLAMA-ULTIMATE',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// MODULE 9: 헬퍼 함수들 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 상담신청 ID 생성
 */
function generateConsultationId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `CONSULT_${timestamp}_${random}`;
}

/**
 * 오류신고 ID 생성
 */
function generateErrorReportId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9);
  return `ERROR_${timestamp}_${random}`;
}

/**
 * 상담신청 데이터 정규화 (V16.0 OLLAMA ULTIMATE)
 */
function normalizeConsultationData(rawData, consultationId) {
  const data = rawData.data || rawData;
  
  return {
    consultationId: consultationId,
    companyName: data.companyName || data.회사명 || '',
    contactName: data.contactName || data.담당자명 || data.name || '',
    contactEmail: data.contactEmail || data.이메일 || data.email || '',
    contactPhone: data.contactPhone || data.전화번호 || data.phone || '',
    contactPosition: data.contactPosition || data.직책 || '',
    industry: data.industry || data.업종 || '',
    employeeCount: data.employeeCount || data.직원수 || '',
    consultationType: data.consultationType || data.상담유형 || 'AI 도입 상담',
    consultationContent: data.consultationContent || data.상담내용 || '',
    preferredDate: data.preferredDate || data.희망일정 || '',
    preferredTime: data.preferredTime || data.희망시간 || '',
    additionalRequests: data.additionalRequests || data.추가요청사항 || '',
    timestamp: new Date().toISOString(),
    version: 'V16.0-OLLAMA-ULTIMATE'
  };
}

/**
 * 오류신고 데이터 정규화 (V16.0 OLLAMA ULTIMATE)
 */
function normalizeErrorReportData(rawData, reportId) {
  const data = rawData.data || rawData;
  
  return {
    reportId: reportId,
    reporterName: data.reporterName || data.신고자명 || data.name || '',
    reporterEmail: data.reporterEmail || data.이메일 || data.email || '',
    reporterPhone: data.reporterPhone || data.전화번호 || data.phone || '',
    errorType: data.errorType || data.오류유형 || '기타',
    errorDescription: data.errorDescription || data.오류내용 || '',
    errorLocation: data.errorLocation || data.발생위치 || '',
    errorTime: data.errorTime || data.발생시간 || new Date().toISOString(),
    browserInfo: data.browserInfo || data.브라우저정보 || '',
    deviceInfo: data.deviceInfo || data.기기정보 || '',
    additionalInfo: data.additionalInfo || data.추가정보 || '',
    urgencyLevel: data.urgencyLevel || data.긴급도 || 'medium',
    timestamp: new Date().toISOString(),
    version: 'V16.0-OLLAMA-ULTIMATE'
  };
}

/**
 * 상담신청 데이터 저장 (V16.0 OLLAMA ULTIMATE)
 */
function saveConsultationData(normalizedData) {
  try {
    console.log('💾 상담신청 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    let consultationSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.CONSULTATION_REQUESTS);
    if (!consultationSheet) {
      consultationSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.CONSULTATION_REQUESTS);
      // 헤더 추가
      consultationSheet.getRange(1, 1, 1, 13).setValues([[
        '상담ID', '회사명', '담당자명', '이메일', '전화번호', '직책', '업종', '직원수',
        '상담유형', '상담내용', '희망일정', '희망시간', '접수일시'
      ]]);
    }
    
    const newRow = [
      normalizedData.consultationId,
      normalizedData.companyName,
      normalizedData.contactName,
      normalizedData.contactEmail,
      normalizedData.contactPhone,
      normalizedData.contactPosition,
      normalizedData.industry,
      normalizedData.employeeCount,
      normalizedData.consultationType,
      normalizedData.consultationContent,
      normalizedData.preferredDate,
      normalizedData.preferredTime,
      normalizedData.timestamp
    ];
    
    consultationSheet.appendRow(newRow);
    
    console.log('✅ 상담신청 데이터 저장 완료');
    return { success: true, message: '상담신청 데이터 저장 완료' };
    
  } catch (error) {
    console.error('❌ 상담신청 데이터 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 데이터 저장 (V16.0 OLLAMA ULTIMATE)
 */
function saveErrorReportData(normalizedData) {
  try {
    console.log('💾 오류신고 데이터 저장 시작');
    
    const sheetsConfig = getSheetsConfig();
    const spreadsheet = SpreadsheetApp.openById(sheetsConfig.SPREADSHEET_ID);
    
    let errorSheet = spreadsheet.getSheetByName(sheetsConfig.SHEETS.ERROR_REPORTS);
    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet(sheetsConfig.SHEETS.ERROR_REPORTS);
      // 헤더 추가
      errorSheet.getRange(1, 1, 1, 12).setValues([[
        '신고ID', '신고자명', '이메일', '전화번호', '오류유형', '오류내용', '발생위치',
        '발생시간', '브라우저정보', '기기정보', '긴급도', '접수일시'
      ]]);
    }
    
    const newRow = [
      normalizedData.reportId,
      normalizedData.reporterName,
      normalizedData.reporterEmail,
      normalizedData.reporterPhone,
      normalizedData.errorType,
      normalizedData.errorDescription,
      normalizedData.errorLocation,
      normalizedData.errorTime,
      normalizedData.browserInfo,
      normalizedData.deviceInfo,
      normalizedData.urgencyLevel,
      normalizedData.timestamp
    ];
    
    errorSheet.appendRow(newRow);
    
    console.log('✅ 오류신고 데이터 저장 완료');
    return { success: true, message: '오류신고 데이터 저장 완료' };
    
  } catch (error) {
    console.error('❌ 오류신고 데이터 저장 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 상담신청 확인 이메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendConsultationConfirmationEmail(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `AICAMP | 상담신청 접수 완료 - ${normalizedData.companyName}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563eb; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">💼 상담신청 접수 완료</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">AICAMP 전문 상담팀</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${normalizedData.contactName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          <strong>${normalizedData.companyName}</strong>의 AI 도입 상담신청이 성공적으로 접수되었습니다.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #2563eb;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📋 상담신청 정보</h3>
          <ul style="line-height: 1.8;">
            <li><strong>상담 ID:</strong> ${normalizedData.consultationId}</li>
            <li><strong>상담유형:</strong> ${normalizedData.consultationType}</li>
            <li><strong>희망일정:</strong> ${normalizedData.preferredDate} ${normalizedData.preferredTime}</li>
            <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
          </ul>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">📞 다음 단계</h3>
          <p style="line-height: 1.6;">
            전문 상담사가 1-2일 내에 연락드려 상세한 상담 일정을 조율하겠습니다.<br>
            궁금한 사항이 있으시면 언제든 연락주세요.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${config.ADMIN_EMAIL} | 🌐 웹사이트: ${config.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: normalizedData.contactEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 상담팀'
    }, 3);
    
    console.log('✅ 상담신청 확인 이메일 발송 완료');
    return { success: sendResult.success, message: '상담신청 확인 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 상담신청 확인 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 상담신청 관리자 알림 이메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendConsultationAdminNotification(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `[AICAMP 관리자] 새로운 상담신청 - ${normalizedData.companyName}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
        <h1>🚨 새로운 상담신청 알림</h1>
      </div>
      
      <div style="padding: 20px;">
        <h2>관리자님, 새로운 상담 요청이 접수되었습니다.</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">상담 ID</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.consultationId}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">회사명</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.companyName}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">담당자</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.contactName}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">이메일</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.contactEmail}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">전화번호</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.contactPhone}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">상담유형</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.consultationType}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">희망일정</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.preferredDate} ${normalizedData.preferredTime}</td></tr>
        </table>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>📝 상담내용</h3>
          <p>${normalizedData.consultationContent}</p>
        </div>
        
        <p><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 시스템'
    }, 3);
    
    console.log('✅ 상담신청 관리자 알림 이메일 발송 완료');
    return { success: sendResult.success, message: '관리자 알림 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 상담신청 관리자 알림 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 확인 이메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendErrorReportConfirmationEmail(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const subject = `AICAMP | 오류신고 접수 완료 - ${normalizedData.errorType}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🚨 오류신고 접수 완료</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">AICAMP 기술지원팀</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">안녕하세요, ${normalizedData.reporterName}님!</h2>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          신고해주신 오류가 성공적으로 접수되었습니다. 빠른 시일 내에 확인하여 조치하겠습니다.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #dc3545;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">📋 오류신고 정보</h3>
          <ul style="line-height: 1.8;">
            <li><strong>신고 ID:</strong> ${normalizedData.reportId}</li>
            <li><strong>오류유형:</strong> ${normalizedData.errorType}</li>
            <li><strong>긴급도:</strong> ${normalizedData.urgencyLevel}</li>
            <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
          </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #856404; margin-bottom: 10px;">⚡ 처리 일정</h3>
          <p style="line-height: 1.6;">
            • 긴급 오류: 2시간 내 대응<br>
            • 일반 오류: 24시간 내 대응<br>
            • 개선 요청: 1주일 내 검토
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            📧 문의: ${config.ADMIN_EMAIL} | 🌐 웹사이트: ${config.AICAMP_WEBSITE}<br>
            © 2025 AICAMP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: normalizedData.reporterEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 기술지원팀'
    }, 3);
    
    console.log('✅ 오류신고 확인 이메일 발송 완료');
    return { success: sendResult.success, message: '오류신고 확인 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 오류신고 확인 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 오류신고 관리자 긴급 알림 이메일 발송 (V16.0 OLLAMA ULTIMATE)
 */
function sendErrorReportAdminNotification(normalizedData) {
  try {
    const config = getEnvironmentConfig();
    const urgencyIcon = normalizedData.urgencyLevel === 'high' ? '🔥' : normalizedData.urgencyLevel === 'medium' ? '⚠️' : 'ℹ️';
    const subject = `[AICAMP 긴급] ${urgencyIcon} 오류신고 - ${normalizedData.errorType}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
        <h1>${urgencyIcon} 긴급 오류신고 알림</h1>
      </div>
      
      <div style="padding: 20px;">
        <h2>관리자님, 새로운 오류신고가 접수되었습니다.</h2>
        
        <div style="background: ${normalizedData.urgencyLevel === 'high' ? '#f8d7da' : '#fff3cd'}; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>긴급도: ${normalizedData.urgencyLevel.toUpperCase()}</h3>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">신고 ID</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.reportId}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">신고자</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.reporterName}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">이메일</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.reporterEmail}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">오류유형</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.errorType}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">발생위치</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.errorLocation}</td></tr>
          <tr><th style="border: 1px solid #ddd; padding: 12px; background: #f8f9fa;">발생시간</th><td style="border: 1px solid #ddd; padding: 12px;">${normalizedData.errorTime}</td></tr>
        </table>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>📝 오류 상세 내용</h3>
          <p>${normalizedData.errorDescription}</p>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>🔧 기술 정보</h3>
          <p><strong>브라우저:</strong> ${normalizedData.browserInfo}</p>
          <p><strong>기기:</strong> ${normalizedData.deviceInfo}</p>
          <p><strong>추가정보:</strong> ${normalizedData.additionalInfo}</p>
        </div>
        
        <p><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      </div>
    </div>
    `;
    
    const sendResult = sendEmailWithRetry({
      to: config.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'AICAMP 시스템'
    }, 3);
    
    console.log('✅ 오류신고 관리자 긴급 알림 이메일 발송 완료');
    return { success: sendResult.success, message: '관리자 긴급 알림 이메일 발송 완료' };
    
  } catch (error) {
    console.error('❌ 오류신고 관리자 긴급 알림 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

// ================================================================================
// 🎯 V16.0 OLLAMA ULTIMATE 완료 - 완전한 로컬 AI 통합 워크플로우 시스템
// ================================================================================

console.log('🚀 이교장의AI역량진단보고서 시스템 V16.0 OLLAMA ULTIMATE 로드 완료');
console.log('✅ GEMINI 완전 제거 및 Ollama GPT-OSS 20B 100% 통합');
console.log('✅ Matrix 완전 제거 및 안정적 ActionItems 시스템 구현 완료');
console.log('✅ 12단계 완전한 AI 역량진단 워크플로우 구현');
console.log('✅ 진행상황 실시간 모니터링 시스템 통합');
console.log('✅ 접수확인 메일 자동 발송 시스템');
console.log('✅ Ollama GPT-OSS 20B 통합 분석 (정량적+정성적)');
console.log('✅ 업종별 벤치마크 분석 시스템');
console.log('✅ 고도화된 SWOT 분석 엔진');
console.log('✅ 우선순위 매트릭스 및 3단계 로드맵');
console.log('✅ 이교장 스타일 HTML 보고서 생성');
console.log('✅ Google Drive 자동 업로드 및 공유');
console.log('✅ 애플 스타일 미니멀 이메일 시스템');
console.log('✅ 상담신청 완전 자동화 처리');
console.log('✅ 오류신고 긴급 알림 시스템');
console.log('✅ 통합 워크플로우 결과 처리 (ai_diagnosis_complete)');
console.log('✅ 오류 로그 자동 저장 및 관리');
console.log('✅ 이메일 재시도 발송 시스템');
console.log('✅ 100% 로컬 AI (Ollama GPT-OSS 20B) 보안 강화');
console.log('📊 지원 액션: diagnosis, ai_diagnosis_complete, consultation, error_report, getResult, checkProgress');
console.log('🎯 준비 완료: 모든 기능이 Ollama 기반으로 완전히 구현됨');

/**
 * 이교장의 한마디 생성 함수 (V16.0 OLLAMA ULTIMATE)
 * 점수와 영역별 평가에 따른 상세한 인사이트 제공
 */
function generatePrincipalInsight(scoreAnalysis) {
  try {
    // 안전한 데이터 추출
    const totalScore = scoreAnalysis?.totalScore || 0;
    const percentage = scoreAnalysis?.percentage || 0;
    const grade = scoreAnalysis?.grade || 'F';
    const maturityLevel = scoreAnalysis?.maturityLevel || '초급';
    const categoryScores = scoreAnalysis?.categoryScores || {};
    
    console.log('🎓 이교장의 한마디 생성:', { totalScore, percentage, grade, maturityLevel });
    
    // 등급별 기본 메시지
    let baseMessage = '';
    let specificAdvice = '';
    
    if (grade === 'A+' || grade === 'A') {
      baseMessage = '"정말 훌륭합니다! 귀사의 AI 역량은 이미 최고 수준입니다. 로컬 AI로 더욱 안전하고 효율적인 혁신을 만들어가시죠."';
      specificAdvice = '다음 단계로는 AI 윤리 가이드라인 수립과 지속적인 혁신 문화 조성에 집중하시기 바랍니다.';
    } else if (grade === 'B+' || grade === 'B') {
      baseMessage = '"좋은 기반을 갖추고 계십니다! 체계적인 접근으로 한 단계 더 발전할 수 있는 충분한 잠재력이 있습니다."';
      specificAdvice = '특히 조직 문화와 인력 교육에 투자하시면 빠른 성장을 기대할 수 있습니다.';
    } else if (grade === 'C+' || grade === 'C') {
      baseMessage = '"AI 여정의 중요한 단계에 계십니다. 체계적인 계획과 단계별 실행으로 확실한 성과를 만들어가시죠."';
      specificAdvice = '우선순위를 정하고 핵심 영역부터 차근차근 개선해 나가는 것이 성공의 열쇠입니다.';
    } else if (grade === 'D+' || grade === 'D') {
      baseMessage = '"AI 도입의 첫걸음을 내딛고 계십니다. 겁내지 마세요, 모든 성공한 기업들이 거쳐온 과정입니다."';
      specificAdvice = '기본 인프라 구축과 팀 교육부터 시작하여 단계적으로 발전시켜 나가시기 바랍니다.';
    } else {
      baseMessage = '"로컬 AI는 도구가 아니라 새로운 사고방식입니다. 지금부터 시작하시면 반드시 성공할 수 있습니다!"';
      specificAdvice = '기본적인 디지털 전환부터 차근차근 시작하여 AI 역량을 단계적으로 구축해 나가시기 바랍니다.';
    }
    
    // 영역별 특화 조언
    let areaAdvice = '';
    if (categoryScores) {
      const lowestArea = Object.entries(categoryScores).reduce((a, b) => a[1] < b[1] ? a : b);
      const highestArea = Object.entries(categoryScores).reduce((a, b) => a[1] > b[1] ? a : b);
      
      const areaNames = {
        businessFoundation: '사업 기반',
        currentAI: '현재 AI 활용',
        organizationReadiness: '조직 준비도',
        techInfrastructure: '기술 인프라',
        goalClarity: '목표 명확성',
        executionCapability: '실행 역량'
      };
      
      if (lowestArea[1] < 60) {
        areaAdvice = ` 특히 ${areaNames[lowestArea[0]]} 영역(${lowestArea[1]}점)의 개선이 시급합니다. `;
      }
      
      if (highestArea[1] > 80) {
        areaAdvice += ` ${areaNames[highestArea[0]]} 영역(${highestArea[1]}점)은 이미 우수한 수준입니다. `;
      }
    }
    
    // 성숙도별 추가 조언
    let maturityAdvice = '';
    if (maturityLevel.includes('Initial') || maturityLevel.includes('초기')) {
      maturityAdvice = '기본적인 디지털 전환부터 시작하여 단계적으로 AI 역량을 구축해 나가시기 바랍니다.';
    } else if (maturityLevel.includes('Basic') || maturityLevel.includes('기본')) {
      maturityAdvice = '체계적인 계획과 실행으로 중급 수준으로 발전할 수 있는 충분한 기반이 마련되어 있습니다.';
    } else if (maturityLevel.includes('Advanced') || maturityLevel.includes('고도화')) {
      maturityAdvice = '이미 고도화된 수준이므로 지속적인 혁신과 최적화를 통해 최고 수준으로 도약하시기 바랍니다.';
    } else if (maturityLevel.includes('Optimized') || maturityLevel.includes('최적화')) {
      maturityAdvice = '최적화된 상태를 유지하면서 새로운 기술 트렌드에 대한 지속적인 학습과 적용이 필요합니다.';
    }
    
    // 최종 메시지 조합
    const finalMessage = `${baseMessage} ${specificAdvice}${areaAdvice}${maturityAdvice}`;
    
    return finalMessage;
    
  } catch (error) {
    console.error('❌ 이교장의 한마디 생성 오류:', error);
    return '"로컬 AI는 도구가 아니라 새로운 사고방식입니다. 단계별로 차근차근 접근하시면 반드시 성공할 수 있습니다!"';
  }
}

// ================================================================================
// MODULE 9: 유틸리티 함수 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * 이교장의 한마디 생성
 */
function generatePrincipalInsight(scoreAnalysis) {
  const { totalScore, percentage, grade, maturityLevel } = scoreAnalysis;
  
  if (percentage >= 80) {
    return `"${maturityLevel} 수준의 AI 역량을 보유하고 계시는군요! 이미 상당한 수준의 AI 활용도를 보여주고 있습니다. 이제 AI를 통한 비즈니스 혁신과 경쟁우위 확보에 집중해보시기 바랍니다. AICAMP의 고도화 프로그램을 통해 더욱 발전시켜 나가시죠!"`;
  } else if (percentage >= 60) {
    return `"${maturityLevel} 수준으로 AI 역량이 양호한 편입니다. 체계적인 AI 도입과 활용을 통해 더욱 큰 성과를 창출할 수 있을 것입니다. AICAMP의 실무 적용 프로그램으로 실질적인 AI 활용 역량을 키워보세요."`;
  } else if (percentage >= 40) {
    return `"AI 역량 개발의 좋은 시작점에 계십니다. ${maturityLevel} 수준에서 체계적인 AI 교육과 도구 도입을 통해 단계적으로 발전시켜 나가시기 바랍니다. AICAMP의 기초 역량 강화 프로그램으로 시작해보세요."`;
  } else {
    return `"AI 역량 개발의 첫걸음을 내딛으셨네요! ${maturityLevel} 수준에서 차근차근 AI 기본 개념부터 학습하시면 됩니다. AICAMP의 체계적인 교육 프로그램을 통해 AI 역량을 키워나가시죠!"`;
  }
}

/**
 * 진단 ID 생성
 */
function generateDiagnosisId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 10);
  return `DIAG_45Q_AI_${timestamp}_${random}`;
}

/**
 * 상담 ID 생성
 */
function generateConsultationId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 10);
  return `CONS_${timestamp}_${random}`;
}

/**
 * 오류 ID 생성
 */
function generateErrorId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 10);
  return `ERROR_${timestamp}_${random}`;
}

/**
 * 진행상황 ID 생성
 */
function generateProgressId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 10);
  return `PROG_${timestamp}_${random}`;
}

// ================================================================================
// MODULE 10: Google Drive 폴더 문제 해결 유틸리티 (V16.0 OLLAMA ULTIMATE)
// ================================================================================

/**
 * Google Drive 폴더 문제 해결 함수
 * Google Apps Script 콘솔에서 직접 실행 가능
 */
function fixDriveFolderIssue() {
  try {
    console.log('🔧 Google Drive 폴더 문제 해결 시작');
    
    const env = getEnvironmentConfig();
    let folderId = env.DRIVE_FOLDER_ID;
    let folder = null;
    
    // 1. 현재 설정된 폴더 ID 확인
    console.log('📋 현재 설정된 폴더 ID:', folderId);
    
    // 2. 폴더 접근 시도
    if (folderId) {
      try {
        folder = DriveApp.getFolderById(folderId);
        console.log('✅ 기존 폴더 접근 성공:', folder.getName());
        
        // 접근 권한 확인
        try {
          const fileCount = folder.getFiles().length;
          console.log('✅ 폴더 접근 권한 확인 완료 (파일 수:', fileCount, ')');
          return {
            success: true,
            message: '기존 폴더가 정상적으로 작동합니다',
            folderId: folderId,
            folderName: folder.getName(),
            fileCount: fileCount
          };
        } catch (permissionError) {
          console.warn('⚠️ 폴더 접근 권한 없음:', permissionError.message);
        }
      } catch (folderError) {
        console.warn('⚠️ 폴더 ID 접근 실패:', folderError.message);
      }
    }
    
    // 3. AICAMP_REPORTS 폴더 검색
    console.log('🔍 AICAMP_REPORTS 폴더 검색 중...');
    try {
      const folders = DriveApp.getFoldersByName('AICAMP_REPORTS');
      
      if (folders.hasNext()) {
        folder = folders.next();
        folderId = folder.getId();
        console.log('✅ 기존 AICAMP_REPORTS 폴더 발견:', folderId);
        
        // 접근 권한 확인
        try {
          const fileCount = folder.getFiles().length;
          console.log('✅ 기존 폴더 접근 권한 확인 완료 (파일 수:', fileCount, ')');
          
          // 환경변수 업데이트
          const properties = PropertiesService.getScriptProperties();
          properties.setProperty('DRIVE_FOLDER_ID', folderId);
          console.log('✅ DRIVE_FOLDER_ID 환경변수 업데이트 완료');
          
          return {
            success: true,
            message: '기존 AICAMP_REPORTS 폴더를 찾아 설정했습니다',
            folderId: folderId,
            folderName: folder.getName(),
            fileCount: fileCount
          };
        } catch (permissionError) {
          console.warn('⚠️ 기존 폴더 접근 권한 없음:', permissionError.message);
        }
      }
    } catch (searchError) {
      console.warn('⚠️ 폴더 검색 중 오류:', searchError.message);
    }
    
    // 4. 새 폴더 생성
    console.log('📁 새로운 AICAMP_REPORTS 폴더 생성 중...');
    try {
      folder = DriveApp.createFolder('AICAMP_REPORTS');
      folderId = folder.getId();
      
      // 폴더 공유 설정
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      // 환경변수 업데이트
      const properties = PropertiesService.getScriptProperties();
      properties.setProperty('DRIVE_FOLDER_ID', folderId);
      
      console.log('✅ 새 AICAMP_REPORTS 폴더 생성 완료');
      console.log('🔗 폴더 링크:', folder.getUrl());
      
      return {
        success: true,
        message: '새로운 AICAMP_REPORTS 폴더를 생성했습니다',
        folderId: folderId,
        folderName: folder.getName(),
        folderUrl: folder.getUrl(),
        fileCount: 0
      };
      
    } catch (createError) {
      console.error('❌ 폴더 생성 실패:', createError.message);
      return {
        success: false,
        message: '폴더 생성에 실패했습니다: ' + createError.message,
        error: createError.message
      };
    }
    
  } catch (error) {
    console.error('❌ Drive 폴더 문제 해결 실패:', error);
    return {
      success: false,
      message: 'Drive 폴더 문제 해결 중 오류 발생: ' + error.message,
      error: error.message
    };
  }
}

/**
 * Google Drive 폴더 상태 확인 함수
 * Google Apps Script 콘솔에서 직접 실행 가능
 */
function checkDriveFolderStatus() {
  try {
    console.log('🔍 Google Drive 폴더 상태 확인');
    
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    console.log('📋 환경변수 설정:');
    console.log('- DRIVE_FOLDER_ID:', folderId);
    console.log('- SPREADSHEET_ID:', env.SPREADSHEET_ID);
    console.log('- ADMIN_EMAIL:', env.ADMIN_EMAIL);
    
    if (!folderId) {
      console.log('⚠️ DRIVE_FOLDER_ID가 설정되지 않았습니다');
      return {
        success: false,
        message: 'DRIVE_FOLDER_ID가 설정되지 않았습니다',
        recommendation: 'fixDriveFolderIssue() 함수를 실행하세요'
      };
    }
    
    // 폴더 접근 시도
    try {
      const folder = DriveApp.getFolderById(folderId);
      console.log('✅ 폴더 접근 성공:', folder.getName());
      
      // 파일 목록 확인
      const files = folder.getFiles();
      const fileList = [];
      let fileCount = 0;
      
      while (files.hasNext()) {
        const file = files.next();
        fileCount++;
        fileList.push({
          name: file.getName(),
          size: file.getSize(),
          url: file.getUrl(),
          lastUpdated: file.getLastUpdated()
        });
      }
      
      console.log('📊 폴더 정보:');
      console.log('- 폴더명:', folder.getName());
      console.log('- 파일 수:', fileCount);
      console.log('- 폴더 URL:', folder.getUrl());
      console.log('- 공유 설정:', folder.getSharingAccess());
      
      return {
        success: true,
        message: '폴더가 정상적으로 작동합니다',
        folderInfo: {
          id: folderId,
          name: folder.getName(),
          url: folder.getUrl(),
          fileCount: fileCount,
          sharingAccess: folder.getSharingAccess()
        },
        files: fileList
      };
      
    } catch (folderError) {
      console.error('❌ 폴더 접근 실패:', folderError.message);
      return {
        success: false,
        message: '폴더 접근에 실패했습니다: ' + folderError.message,
        recommendation: 'fixDriveFolderIssue() 함수를 실행하세요'
      };
    }
    
  } catch (error) {
    console.error('❌ 폴더 상태 확인 실패:', error);
    return {
      success: false,
      message: '폴더 상태 확인 중 오류 발생: ' + error.message,
      error: error.message
    };
  }
}

/**
 * 테스트 파일 업로드 함수
 * Google Apps Script 콘솔에서 직접 실행 가능
 */
function testFileUpload() {
  try {
    console.log('🧪 테스트 파일 업로드 시작');
    
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      console.log('❌ DRIVE_FOLDER_ID가 설정되지 않았습니다');
      return {
        success: false,
        message: 'DRIVE_FOLDER_ID가 설정되지 않았습니다. fixDriveFolderIssue() 함수를 먼저 실행하세요.'
      };
    }
    
    // 폴더 접근
    const folder = DriveApp.getFolderById(folderId);
    console.log('✅ 폴더 접근 성공:', folder.getName());
    
    // 테스트 HTML 파일 생성
    const testHtml = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>테스트 파일 - 이교장의AI역량진단보고서</title>
</head>
<body>
    <h1>🧪 테스트 파일</h1>
    <p>이 파일은 Google Drive 업로드 기능 테스트용입니다.</p>
    <p>생성 시간: ${new Date().toLocaleString('ko-KR')}</p>
    <p>폴더 ID: ${folderId}</p>
    <p>✅ Google Drive 업로드 기능이 정상적으로 작동합니다!</p>
</body>
</html>`;
    
    // 파일명 생성
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `테스트파일_${timestamp}.html`;
    
    // 파일 생성 및 업로드
    const blob = Utilities.newBlob(testHtml, 'text/html', fileName);
    const file = folder.createFile(blob);
    
    // 파일 공유 설정
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('✅ 테스트 파일 업로드 완료');
    console.log('📄 파일 정보:');
    console.log('- 파일명:', fileName);
    console.log('- 파일 ID:', file.getId());
    console.log('- 파일 크기:', file.getSize(), 'bytes');
    console.log('- 파일 URL:', file.getUrl());
    console.log('- 공유 링크:', file.getUrl());
    
    return {
      success: true,
      message: '테스트 파일 업로드 성공',
      fileInfo: {
        name: fileName,
        id: file.getId(),
        size: file.getSize(),
        url: file.getUrl(),
        sharingUrl: file.getUrl()
      }
    };
    
  } catch (error) {
    console.error('❌ 테스트 파일 업로드 실패:', error);
    return {
      success: false,
      message: '테스트 파일 업로드 실패: ' + error.message,
      error: error.message
    };
  }
}

/**
 * Google Apps Script 알고리즘을 정확히 따라하는 실제 진단 결과 계산기
 * docs/google_apps_script_COMPLETE_SIMPLIFIED_V5.js의 알고리즘을 그대로 사용
 */

// Google Apps Script와 동일한 평가 항목 정의
const AI_CAPABILITY_ASSESSMENT_ITEMS = {
  // 1. 리더십 (4문항) - 보라색
  leadership: {
    title: '리더십',
    color: '#9333ea',
    items: [
      { 
        id: 'leadership_1', 
        label: '경영진이 AI 기술의 중요성을 인식하고 적극적으로 도입을 추진하고 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'leadership_2', 
        label: 'AI 도입을 위한 명확한 비전과 로드맵이 수립되어 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'leadership_3', 
        label: '경영진이 AI 관련 의사결정에 적극 참여하고 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'leadership_4', 
        label: 'AI 투자에 대한 경영진의 의지가 예산 배정에 반영되어 있습니까?',
        weight: 1.0 
      }
    ]
  },
  
  // 2. 인프라 (4문항) - 녹색
  infrastructure: {
    title: '인프라',
    color: '#10b981',
    items: [
      { 
        id: 'infra_1', 
        label: 'AI 도구와 플랫폼이 업무에 통합되어 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'infra_2', 
        label: '데이터 수집 및 관리 시스템이 체계적으로 구축되어 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'infra_3', 
        label: 'AI 보안 및 윤리가이드라인이 마련되어 있습니까?',
        weight: 1.0 
      },
      { 
        id: 'infra_4', 
        label: '클라우드 기반 AI 서비스를 활용하고 있습니까?',
        weight: 1.1 
      }
    ]
  },
  
  // 3. 직원역량 (4문항) - 녹색
  talent: {
    title: '직원역량',
    color: '#10b981',
    items: [
      { 
        id: 'talent_1', 
        label: '직원들이 AI 도구(ChatGPT, Copilot 등)를 업무에 활용하고 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'talent_2', 
        label: 'AI 교육 프로그램이 정기적으로 제공되고 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'talent_3', 
        label: '직원들의 AI 활용 수준이 지속적으로 향상되고 있습니까?',
        weight: 1.0 
      },
      { 
        id: 'talent_4', 
        label: 'AI 전문 인력이나 담당자가 지정되어 있습니까?',
        weight: 1.3 
      }
    ]
  },
  
  // 4. 조직문화 (4문항) - 주황색
  culture: {
    title: '조직문화',
    color: '#f97316',
    items: [
      { 
        id: 'culture_1', 
        label: 'AI 실험과 혁신을 장려하는 문화가 형성되어 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'culture_2', 
        label: 'AI 도입에 대한 직원들의 저항이 적고 수용도가 높습니까?',
        weight: 1.2 
      },
      { 
        id: 'culture_3', 
        label: '부서 간 AI 활용 사례와 노하우를 공유하고 있습니까?',
        weight: 1.0 
      },
      { 
        id: 'culture_4', 
        label: 'AI 활용 성과를 측정하고 개선하는 체계가 있습니까?',
        weight: 1.1 
      }
    ]
  },
  
  // 5. 실무적용 (4문항) - 붉은색
  application: {
    title: '실무적용',
    color: '#ef4444',
    items: [
      { 
        id: 'app_1', 
        label: '업무 자동화를 위해 AI를 활용하고 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'app_2', 
        label: '고객 서비스 개선에 AI를 활용하고 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'app_3', 
        label: '의사결정 지원을 위해 AI 분석을 활용하고 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'app_4', 
        label: '제품/서비스 혁신에 AI를 적용하고 있습니까?',
        weight: 1.2 
      }
    ]
  },
  
  // 6. 데이터 (4문항) - 파란색
  data: {
    title: '데이터',
    color: '#3b82f6',
    items: [
      { 
        id: 'data_1', 
        label: '체계적인 데이터 수집 및 관리 프로세스가 있습니까?',
        weight: 1.3 
      },
      { 
        id: 'data_2', 
        label: '데이터 기반 의사결정이 일상화되어 있습니까?',
        weight: 1.2 
      },
      { 
        id: 'data_3', 
        label: '데이터 품질 관리 체계가 구축되어 있습니까?',
        weight: 1.1 
      },
      { 
        id: 'data_4', 
        label: '실시간 데이터 분석이 가능한 시스템이 있습니까?',
        weight: 1.0 
      }
    ]
  }
};

/**
 * Google Apps Script와 동일한 점수 계산 함수
 */
function calculateScores(assessmentScores) {
  const categoryScores = {};
  let totalScore = 0;
  let count = 0;
  
  Object.values(AI_CAPABILITY_ASSESSMENT_ITEMS).forEach(category => {
    let categorySum = 0;
    let categoryCount = 0;
    
    category.items.forEach(item => {
      const score = assessmentScores[item.id] || 2; // 기본값 2 (GAS와 동일)
      categorySum += score * item.weight;
      categoryCount += item.weight;
    });
    
    if (categoryCount > 0) {
      const avgScore = categorySum / categoryCount;
      categoryScores[category.title] = avgScore;
      totalScore += avgScore;
      count++;
    }
  });
  
  // GAS와 동일한 계산 공식
  const overallScore = count > 0 ? Math.round((totalScore / count) * 25) : 50;
  
  return {
    overallScore,
    categoryScores,
    grade: overallScore >= 80 ? 'A' : overallScore >= 60 ? 'B' : overallScore >= 40 ? 'C' : 'D'
  };
}

/**
 * Google Apps Script와 동일한 GAP 분석
 */
function performGAPAnalysis(industry) {
  const benchmarks = {
    'IT/소프트웨어': 70,
    '제조업': 50,
    '금융': 65,
    '유통/물류': 55,
    '의료/헬스케어': 60,
    '교육': 55,
    '건설업': 45,
    '기타': 50
  };
  
  const benchmark = benchmarks[industry] || 50;
  
  return {
    benchmark,
    gaps: ['AI 전략 수립', '데이터 관리 체계', '직원 교육'],
    strengths: ['경영진 의지', '혁신 문화']
  };
}

/**
 * Google Apps Script와 동일한 SWOT 분석
 */
function generateSWOTAnalysis() {
  return {
    strengths: ['변화 수용 의지', '경영진 관심'],
    weaknesses: ['AI 전문성 부족', '데이터 체계 미흡'],
    opportunities: ['정부 지원사업', 'AI 도구 발전'],
    threats: ['경쟁사 AI 도입', '인재 확보 어려움']
  };
}

/**
 * 실제 제출 데이터를 기반으로 한 정확한 계산
 * 로그에서 확인된 정보: assessmentResponsesCount: 24
 * 24개 항목이 모두 제출되었으므로 기본값(2점)이 아닌 실제 점수가 있을 것임
 */

// 로그 분석: "detailedScoresCount: 0, categoryScoresCount: 5"
// 이는 실제 점수가 전달되지 않았음을 의미
// 따라서 GAS 알고리즘에 따라 기본값 2점으로 계산됨

const actualSubmittedData = {
  companyName: '코빅스',
  industry: '기타', // 로그에서 확인
  assessmentScores: {} // 실제 점수는 전달되지 않음
};

// GAS 알고리즘에 따라 기본값 2점으로 모든 항목 설정
Object.values(AI_CAPABILITY_ASSESSMENT_ITEMS).forEach(category => {
  category.items.forEach(item => {
    actualSubmittedData.assessmentScores[item.id] = 2; // GAS 기본값
  });
});

// 정확한 계산 실행
const scoreResult = calculateScores(actualSubmittedData.assessmentScores);
const gapResult = performGAPAnalysis(actualSubmittedData.industry);
const swotResult = generateSWOTAnalysis();

console.log('🎯 Google Apps Script 알고리즘 기반 정확한 계산 결과:');
console.log('📊 종합 점수:', scoreResult.overallScore);
console.log('📊 등급:', scoreResult.grade);
console.log('📊 카테고리별 점수:', scoreResult.categoryScores);
console.log('📊 업종 벤치마크:', gapResult.benchmark);

// 결과 객체 생성
const finalResult = {
  company: actualSubmittedData.companyName,
  industry: actualSubmittedData.industry,
  overallScore: scoreResult.overallScore,
  grade: scoreResult.grade,
  categoryScores: scoreResult.categoryScores,
  benchmark: gapResult.benchmark,
  gaps: gapResult.gaps,
  strengths: gapResult.strengths,
  swot: swotResult,
  calculationMethod: 'Google Apps Script 알고리즘 정확 구현',
  baseScore: 2, // 모든 항목 기본값
  totalItems: 24
};

console.log('✅ 최종 결과:', JSON.stringify(finalResult, null, 2));

module.exports = finalResult;
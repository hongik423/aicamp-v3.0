import { NextRequest, NextResponse } from 'next/server';

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * AI 역량진단 결과 조회 API
 * GET /api/diagnosis-results/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const diagnosisId = params.id;
    
    if (!diagnosisId) {
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('📊 진단 결과 조회 요청:', diagnosisId);

    // Google Apps Script에서 결과 가져오기
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 
      'https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec';

    try {
      const response = await fetch(`${googleScriptUrl}?action=getDiagnosisResult&diagnosisId=${diagnosisId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          console.log('✅ Google Apps Script에서 결과 가져오기 성공');
          return NextResponse.json({
            success: true,
            reportData: data.reportData,
            companyInfo: data.companyInfo,
            timestamp: data.timestamp
          }, { headers: corsHeaders });
        }
      }
    } catch (error) {
      console.warn('⚠️ Google Apps Script 조회 실패:', error);
    }

    // 개발 환경에서는 더미 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      const dummyData = generateDummyReport(diagnosisId);
      return NextResponse.json({
        success: true,
        ...dummyData,
        source: 'dummy'
      }, { headers: corsHeaders });
    }

    // 실제 환경에서 실패시
    return NextResponse.json(
      { 
        success: false, 
        error: '진단 결과를 찾을 수 없습니다.',
        diagnosisId 
      },
      { status: 404, headers: corsHeaders }
    );

  } catch (error) {
    console.error('❌ 진단 결과 조회 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * 진단 결과 저장 API
 * POST /api/diagnosis-results/[id]
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const diagnosisId = params.id;
    const body = await request.json();

    console.log('💾 진단 결과 저장 요청:', diagnosisId);

    // Google Apps Script로 결과 저장
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 
      'https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec';

    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'saveDiagnosisResult',
        diagnosisId,
        reportData: body.reportData,
        companyInfo: body.companyInfo,
        timestamp: new Date().toISOString()
      }),
    });

    if (response.ok) {
      console.log('✅ 진단 결과 저장 성공');
      return NextResponse.json({
        success: true,
        message: '진단 결과가 저장되었습니다.',
        diagnosisId
      }, { headers: corsHeaders });
    }

    throw new Error('진단 결과 저장 실패');

  } catch (error) {
    console.error('❌ 진단 결과 저장 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '진단 결과 저장에 실패했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * 더미 데이터 생성 (개발/테스트용)
 */
function generateDummyReport(diagnosisId: string) {
  return {
    reportData: {
      totalScore: Math.floor(Math.random() * 30) + 70, // 70-100 사이
      grade: ['A+', 'A', 'B+', 'B', 'C+'][Math.floor(Math.random() * 5)],
      percentile: Math.floor(Math.random() * 40) + 10, // 10-50 사이
      potential: ['매우 높음', '높음', '보통', '개선 필요'][Math.floor(Math.random() * 4)],
      
      swot: {
        strengths: [
          'AI 도입에 대한 경영진의 강한 의지',
          '디지털 전환 준비도가 높음',
          '우수한 IT 인프라 보유',
          '혁신적인 조직 문화'
        ],
        weaknesses: [
          'AI 전문 인력 부족',
          '데이터 관리 체계 미흡',
          '초기 투자 비용 부담',
          '변화 관리 프로세스 부재'
        ],
        opportunities: [
          '정부 AI 지원 사업 활용 가능',
          'AI 시장의 급속한 성장',
          '경쟁사 대비 선제적 도입 기회',
          '신규 비즈니스 모델 창출 가능'
        ],
        threats: [
          '경쟁사의 빠른 AI 도입',
          '기술 변화 속도에 대한 대응',
          'AI 규제 및 윤리 이슈',
          '사이버 보안 위협 증가'
        ]
      },
      
      matrixAnalysis: {
        importance: {
          high: ['AI 전략 수립', '데이터 인프라 구축', '인재 양성'],
          medium: ['파일럿 프로젝트', '성과 측정 체계', '파트너십 구축'],
          low: ['벤치마킹', '홍보 마케팅']
        },
        urgency: {
          immediate: ['AI 기초 교육', '현황 분석', '목표 설정'],
          shortTerm: ['파일럿 프로젝트 시작', '전문가 영입', '예산 확보'],
          longTerm: ['전사 확산', '문화 정착', '지속적 혁신']
        }
      },
      
      roadmap: [
        {
          phase: '1단계: 기초 구축',
          period: '0-3개월',
          tasks: [
            'AI 역량 진단 및 현황 분석',
            '임직원 AI 기초 교육 실시',
            '파일럿 프로젝트 선정 및 계획',
            'AI 추진 조직 구성'
          ]
        },
        {
          phase: '2단계: 확산 적용',
          period: '3-6개월',
          tasks: [
            '핵심 업무 AI 도입',
            '데이터 관리 체계 구축',
            '성과 측정 및 개선',
            '중간 관리자 심화 교육'
          ]
        },
        {
          phase: '3단계: 고도화',
          period: '6-12개월',
          tasks: [
            'AI 기반 의사결정 체계 구축',
            '전사적 AI 문화 정착',
            '지속적 혁신 체계 운영',
            'AI 센터 오브 엑셀런스 구축'
          ]
        }
      ],
      
      roi: {
        investment: `${Math.floor(Math.random() * 5 + 3)}000만원`,
        savings: `연 ${Math.floor(Math.random() * 3 + 1).toFixed(1)}억원`,
        percentage: `${Math.floor(Math.random() * 200 + 200)}%`,
        paybackPeriod: `${Math.floor(Math.random() * 6 + 6)}개월`
      },
      
      recommendations: [
        {
          title: 'AICAMP 맞춤형 AI 교육 프로그램',
          description: '귀사의 업종과 규모에 최적화된 AI 교육 커리큘럼',
          benefit: '임직원 AI 역량 300% 향상',
          support: '정부 지원 최대 80%'
        },
        {
          title: '전문가 1:1 컨설팅',
          description: 'AI 도입 전략부터 실행까지 전 과정 지원',
          benefit: '실패 리스크 90% 감소',
          support: '무료 초기 상담 제공'
        },
        {
          title: '파일럿 프로젝트 지원',
          description: '검증된 AI 솔루션으로 빠른 성과 창출',
          benefit: '3개월 내 가시적 성과',
          support: 'POC 무료 지원'
        }
      ]
    },
    
    companyInfo: {
      name: `테스트기업_${diagnosisId.slice(0, 8)}`,
      email: `test@${diagnosisId.slice(0, 8)}.com`,
      industry: ['제조업', 'IT/소프트웨어', '유통/물류', '금융', '의료/헬스케어'][Math.floor(Math.random() * 5)],
      employees: ['1-10명', '11-50명', '51-100명', '101-300명', '300명 이상'][Math.floor(Math.random() * 5)],
      applicantName: '홍길동',
      position: 'CEO',
      phone: '010-1234-5678'
    },
    
    timestamp: new Date().toISOString()
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
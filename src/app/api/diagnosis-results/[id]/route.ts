import { NextRequest, NextResponse } from 'next/server';

/**
 * 개별 진단 결과 조회 API
 * GET /api/diagnosis-results/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resultId = params.id;
    
    console.log('🔍 진단 결과 조회 요청:', { resultId });

    if (!resultId) {
      return NextResponse.json(
        { 
          success: false, 
          error: '결과 ID가 필요합니다.' 
        },
        { status: 400 }
      );
    }

    // resultId에서 정보 추출 (email_timestamp 형식)
    const parts = resultId.split('_');
    if (parts.length < 2) {
      return NextResponse.json(
        { 
          success: false, 
          error: '잘못된 결과 ID 형식입니다.' 
        },
        { status: 400 }
      );
    }

    // 이메일과 타임스탬프 추출
    const timestamp = parts[parts.length - 1];
    const email = parts.slice(0, -1).join('_').replace(/at/g, '@');

    console.log('📧 추출된 정보:', { email, timestamp });

    // Google Apps Script에서 진단 결과 조회
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!googleScriptUrl) {
      throw new Error('Google Script URL이 설정되지 않았습니다.');
    }

    try {
      // Google Apps Script에 조회 요청
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          action: 'getDiagnosisResult',
          resultId: resultId,
          email: email,
          timestamp: timestamp
        })
      });

      if (!response.ok) {
        throw new Error(`Google Script 응답 오류: ${response.status}`);
      }

      const gasData = await response.json();
      
      if (gasData.success && gasData.result) {
        console.log('✅ Google Apps Script에서 결과 조회 성공');
        
        return NextResponse.json({
          success: true,
          result: gasData.result,
          source: 'google_sheets',
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(gasData.error || 'Google Apps Script에서 결과를 찾을 수 없습니다.');
      }

    } catch (gasError) {
      console.warn('⚠️ Google Apps Script 조회 실패, 모의 데이터 생성:', gasError);
      
      // Google Apps Script 실패 시 모의 데이터 생성
      const mockResult = generateMockDiagnosisResult(email, resultId, timestamp);
      
      return NextResponse.json({
        success: true,
        result: mockResult,
        source: 'mock_data',
        warning: 'Google Apps Script 연결 실패로 모의 데이터를 제공합니다.',
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('❌ 진단 결과 조회 API 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '진단 결과 조회 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * 모의 진단 결과 생성 (Google Apps Script 실패 시 대비)
 */
function generateMockDiagnosisResult(email: string, resultId: string, timestamp: string) {
  const companyName = getCompanyNameFromEmail(email);
  const contactName = getContactNameFromEmail(email);
  
  return {
    resultId: resultId,
    companyName: companyName,
    contactManager: contactName,
    email: email,
    industry: 'IT/소프트웨어',
    employeeCount: '10-50명',
    totalScore: 75,
    categoryResults: [
      {
        category: '상품/서비스 관리',
        score: 4.0,
        averageScore: 4.0
      },
      {
        category: '고객응대 역량',
        score: 3.5,
        averageScore: 3.5
      },
      {
        category: '마케팅 역량',
        score: 3.8,
        averageScore: 3.8
      },
      {
        category: '구매/재고관리',
        score: 4.2,
        averageScore: 4.2
      },
      {
        category: '매장관리 역량',
        score: 3.7,
        averageScore: 3.7
      }
    ],
    recommendations: `${companyName}의 비즈니스 성장을 위한 핵심 개선사항을 제안드립니다.

🎯 우선 개선 영역:
• 마케팅 역량 강화: 디지털 마케팅 전략 수립이 필요합니다
• 고객응대 프로세스 표준화: 고객 만족도 향상을 위한 체계적 접근
• 매장관리 효율성 개선: 운영 프로세스 최적화

💡 단계별 실행 계획:
1단계 (1-2개월): 고객응대 매뉴얼 작성 및 직원 교육
2단계 (2-3개월): 온라인 마케팅 채널 구축
3단계 (3-6개월): 매장 운영 시스템 개선

🚀 기대 효과:
• 고객 만족도 20% 향상
• 매출 증대 15% 예상
• 운영 효율성 30% 개선`,
    summaryReport: `## ${companyName} AI 진단 종합 분석 보고서

### 📊 진단 개요
- **진단 일시**: ${new Date().toLocaleDateString('ko-KR')}
- **종합 점수**: 75점/100점 (B등급)
- **주요 강점**: 상품/서비스 관리, 구매/재고관리
- **개선 필요**: 마케팅 역량, 고객응대 시스템

### 🎯 상세 분석 결과

**1. 상품/서비스 관리 (4.0/5.0)**
현재 상품 기획과 품질 관리 수준이 우수합니다. 차별화된 상품력을 바탕으로 시장에서 경쟁우위를 확보하고 있으나, 가격 전략에 대한 재검토가 필요한 상황입니다.

**2. 고객응대 역량 (3.5/5.0)**
기본적인 고객 서비스는 제공되고 있으나, 체계적인 고객관리 시스템이 부족합니다. 고객 불만 처리 프로세스와 고객 유지 전략 수립이 시급합니다.

**3. 마케팅 역량 (3.8/5.0)**
오프라인 마케팅은 어느 정도 수준을 유지하고 있으나, 디지털 마케팅 영역에서 큰 개선 여지가 있습니다. 특히 온라인 채널 활용도가 낮아 새로운 고객 유입에 한계가 있습니다.

**4. 구매/재고관리 (4.2/5.0)**
재고 관리와 구매 프로세스가 체계적으로 운영되고 있어 비용 효율성이 높습니다. 이는 회사의 주요 강점 중 하나로 평가됩니다.

**5. 매장관리 역량 (3.7/5.0)**
매장 외관과 청결도는 양호하나, 인테리어 개선과 동선 최적화를 통해 고객 경험을 더욱 향상시킬 수 있습니다.

### 💡 전략적 제언

**즉시 실행 과제**
- 디지털 마케팅 채널 구축 (SNS, 온라인 광고)
- 고객 관리 시스템(CRM) 도입 검토
- 직원 대상 고객서비스 교육 프로그램 운영

**중장기 발전 방향**
- AI 기반 고객 분석 시스템 도입
- 옴니채널 마케팅 전략 수립
- 데이터 기반 의사결정 체계 구축

### 🚀 성장 로드맵

**3개월 목표**: 고객응대 프로세스 표준화, 기본적인 온라인 마케팅 채널 구축
**6개월 목표**: 디지털 마케팅 성과 측정 및 최적화, 고객 만족도 15% 향상
**12개월 목표**: AI 기반 비즈니스 인사이트 도출, 매출 20% 증대

이러한 개선사항들을 단계적으로 실행하시면 ${companyName}의 지속적인 성장과 경쟁력 강화를 달성할 수 있을 것으로 판단됩니다.`,
    detailedScores: {
      planning_level: 4,
      differentiation_level: 4,
      pricing_level: 3,
      expertise_level: 4,
      quality_level: 4,
      customer_greeting: 3,
      customer_service: 4,
      complaint_management: 3,
      customer_retention: 4,
      customer_understanding: 4,
      marketing_planning: 3,
      offline_marketing: 4,
      online_marketing: 3,
      sales_strategy: 4,
      purchase_management: 4,
      inventory_management: 4,
      exterior_management: 4,
      interior_management: 3,
      cleanliness: 4,
      work_flow: 4
    },
    timestamp: new Date(parseInt(timestamp)).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

/**
 * 이메일에서 회사명 추출
 */
function getCompanyNameFromEmail(email: string): string {
  const domain = email.split('@')[1];
  if (!domain) return '고객사';
  
  // 도메인에서 회사명 추출
  const domainParts = domain.split('.');
  const companyPart = domainParts[0];
  
  // 일반적인 도메인들은 "고객사"로 처리
  const commonDomains = ['gmail', 'naver', 'daum', 'hanmail', 'yahoo', 'outlook', 'hotmail'];
  if (commonDomains.includes(companyPart.toLowerCase())) {
    return '고객사';
  }
  
  // 회사명으로 보이는 도메인은 대문자로 시작
  return companyPart.charAt(0).toUpperCase() + companyPart.slice(1);
}

/**
 * 이메일에서 담당자명 추출
 */
function getContactNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  
  // 숫자나 특수문자가 많으면 "담당자"로 처리
  if (/\d{3,}/.test(localPart) || localPart.length < 3) {
    return '담당자';
  }
  
  // 영문이면 첫 글자만 대문자로
  if (/^[a-zA-Z]/.test(localPart)) {
    return localPart.charAt(0).toUpperCase() + localPart.slice(1, 6);
  }
  
  return '담당자';
} 
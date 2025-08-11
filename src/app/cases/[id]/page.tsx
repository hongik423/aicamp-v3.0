'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  CheckCircle,
  Target,
  BarChart3,
  Quote,
  Calendar,
  Building2,
  Award,
  ChevronRight,
  Factory,
  Package,
  BookOpen,
  Cpu,
  Lightbulb,
  Heart,
  GraduationCap,
  ShoppingCart,
  Scale,
  Calculator,
  CreditCard,
  Wifi,
  Video,
  Tv,
  Zap,
  Sun,
  Leaf,
  TreePine,
  Shield,
  Ruler
} from 'lucide-react';
import CaseVisualization from '@/components/cases/CaseVisualization';
import CaseComparison from '@/components/cases/CaseComparison';
import EnhancedCurriculumDisplay from '@/features/curriculum-integration/components/EnhancedCurriculumDisplay';
import CurriculumRecommendationEngine from '@/features/curriculum-integration/components/CurriculumRecommendationEngine';
import IndustrySpecificCurriculumDisplay from '@/components/curriculum/IndustrySpecificCurriculumDisplay';
import DisclaimerNotice from '@/components/success-cases/DisclaimerNotice';
import LegalFooter from '@/components/success-cases/LegalFooter';
import { INDUSTRY_SPECIFIC_CURRICULUM } from '@/features/curriculum-integration/constants/enhanced-curriculum-database';
import { getIndustryCurriculum, ALL_INDUSTRY_CURRICULUM } from '@/data/comprehensive-industry-curriculum';
import { 
  SuccessCaseDetail, 
  SuccessCaseDetailsCollection, 
  validateSuccessCaseDetail,
  validateCurriculum,
  validateResults 
} from '@/types/success-case.types';
import { caseDetailsData } from './case-details-data';

type ParamsPromise = Promise<{ id: string }>;

// 업종명을 업종 코드로 매핑하는 함수
function getIndustryCode(industryName: string): string {
  const industryMapping: Record<string, string> = {
    '제조업': 'manufacturing',
    'IT서비스': 'itServices',
    '소프트웨어': 'itServices',
    '금융업': 'finance',
    '은행': 'finance',
    '보험': 'insurance',
    '유통업': 'retail',
    '소매업': 'retail',
    '도매업': 'retail',
    '건설업': 'construction',
    '의료업': 'healthcare',
    '병원': 'healthcare',
    '교육업': 'education',
    '농업': 'agriculture',
    '물류업': 'logistics',
    '운송업': 'logistics',
    '호텔업': 'hospitality',
    '숙박업': 'hospitality',
    '법률서비스': 'legal',
    '광고업': 'advertising',
    '마케팅': 'advertising',
    '부동산': 'realEstate',
    '미디어': 'media',
    '콘텐츠': 'media',
    '컨설팅': 'consulting',
    '화학업': 'chemical',
    '통신업': 'telecom',
    '자동차': 'automotive',
    '항공업': 'aviation',
    '에너지': 'energy',
    '바이오': 'biotech',
    '제약': 'biotech',
    '게임': 'gaming',
    '패션': 'fashion',
    // 24개 업종 완전 매핑 추가
    '전문서비스': 'professional',
    '컨설팅업': 'professional',
    '회계법무': 'professional',
    '물류유통': 'logistics',
    '의료헬스케어': 'healthcare',
    '헬스케어': 'healthcare',
    '이커머스': 'ecommerce',
    '전자상거래': 'ecommerce',
    '온라인쇼핑': 'ecommerce',
    '인증관리': 'certification',
    '품질인증': 'certification',
    '투자': 'investment',
    '투자관리': 'investment',
    '자산관리': 'investment',
    '교육에듀테크': 'edutech',
    '에듀테크': 'edutech',
    '온라인교육': 'edutech'
  };

  // 정확한 매칭 시도
  if (industryMapping[industryName]) {
    return industryMapping[industryName];
  }

  // 부분 매칭 시도
  for (const [key, value] of Object.entries(industryMapping)) {
    if (industryName.includes(key) || key.includes(industryName)) {
      return value;
    }
  }

  // 기본값
  return 'manufacturing';
}

// 직원 수를 회사 규모로 매핑하는 함수
function getCompanySize(employees?: string): string {
  if (!employees) return 'medium';
  
  const num = parseInt(employees.replace(/[^0-9]/g, ''));
  
  if (num < 50) return 'small';
  if (num < 300) return 'medium';
  return 'large';
}

export default function CaseDetailPage({ params }: { params: ParamsPromise }) {
  const [caseId, setCaseId] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.resolve(params).then((p) => {
      setCaseId(p.id);
      setLoading(false);
    });
  }, [params]);

  // 24개 성공사례 상세 데이터 - data.ts와 완전 일치
  const caseDetails: SuccessCaseDetailsCollection = caseDetailsData;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">성공사례를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const caseData = caseDetails[caseId];

  // 데이터 검증
  if (!caseData || !validateSuccessCaseDetail(caseData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            성공사례를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 성공사례가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <Link href="/cases">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              성공사례 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = caseData.icon || TrendingUp;

  // 안전한 데이터 접근을 위한 헬퍼 함수들
  const getSafeCurriculum = (curriculum: any) => {
    if (!curriculum || !validateCurriculum(curriculum)) {
      return {
        basic: [],
        advanced: [],
        executive: []
      };
    }
    return {
      basic: Array.isArray(curriculum.basic) ? curriculum.basic : [],
      advanced: Array.isArray(curriculum.advanced) ? curriculum.advanced : [],
      executive: Array.isArray(curriculum.executive) ? curriculum.executive : []
    };
  };

  const getSafeResults = (results: any) => {
    if (!results || !validateResults(results)) {
      return {
        quantitative: [],
        financial: [],
        qualitative: []
      };
    }
    return {
      quantitative: Array.isArray(results.quantitative) ? results.quantitative : [],
      financial: Array.isArray(results.financial) ? results.financial : [],
      qualitative: Array.isArray(results.qualitative) ? results.qualitative : []
    };
  };

  const getSafeArray = (arr: any): any[] => {
    return Array.isArray(arr) ? arr : [];
  };

  const getSafeTags = (tags: any): string[] => {
    return Array.isArray(tags) ? tags.filter(tag => typeof tag === 'string') : [];
  };

  // 안전한 데이터 추출
  const safeCurriculum = getSafeCurriculum(caseData.curriculum);
  const safeResults = getSafeResults(caseData.results);
  const safeProcess = getSafeArray(caseData.process);
  const safeChallenges = getSafeArray(caseData.challenges);
  const safeFollowUpResults = getSafeArray(caseData.followUpResults);
  const safeTags = getSafeTags(caseData.tags);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${caseData.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            {/* 벤치마크 고지사항 */}
            <div className="mb-6">
              <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-200 mb-1">
                      📊 벤치마크 성공계획
                    </h3>
                    <p className="text-sm text-yellow-100">
                      본 내용은 실제 성공사례가 아닌, 해당 업종에서 AI + n8n 도입 시 달성 가능한 
                      <strong className="text-yellow-200"> 목표 성과와 구체적인 구현 계획</strong>을 제시한 벤치마크 시나리오입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <IconComponent className="w-8 h-8 mr-3" />
              <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                {caseData.category}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {caseData.title}
            </h1>
            <p className="text-xl mb-6 text-gray-200">
              {caseData.subtitle}
            </p>
            <p className="text-lg mb-8 text-gray-300 max-w-3xl">
              {caseData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-200">업종</div>
                <div className="font-semibold">{caseData.companyInfo?.industry}</div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-200">규모</div>
                <div className="font-semibold">{caseData.companyInfo?.employees}</div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-200">매출</div>
                <div className="font-semibold">{caseData.companyInfo?.revenue}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/cases">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              성공사례 목록으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* 탭 네비게이션 */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
            <TabsTrigger value="recommendation">맞춤추천</TabsTrigger>
            <TabsTrigger value="process">프로세스</TabsTrigger>
            <TabsTrigger value="results">성과</TabsTrigger>
            <TabsTrigger value="visualization">시각화</TabsTrigger>
            <TabsTrigger value="comparison">비교</TabsTrigger>
            <TabsTrigger value="testimonial">후기</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-600" />
                    주요 도전과제
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {safeChallenges.map((challenge: any, index: number) => (
                      <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                        <h4 className="font-semibold text-red-800 mb-2">{challenge.title}</h4>
                        <p className="text-red-700 mb-2">{challenge.description}</p>
                        <p className="text-sm text-red-600 font-medium">영향: {challenge.impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                    기업 정보
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">회사명</span>
                      <span className="text-blue-700">{caseData.companyName}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">업종</span>
                      <span className="text-blue-700">{caseData.companyInfo?.industry}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">직원 수</span>
                      <span className="text-blue-700">{caseData.companyInfo?.employees}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">매출</span>
                      <span className="text-blue-700">{caseData.companyInfo?.revenue}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">위치</span>
                      <span className="text-blue-700">{caseData.companyInfo?.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 커리큘럼 탭 */}
          <TabsContent value="curriculum" className="space-y-8">
            {caseData && (
              <div className="space-y-8">
                {/* 업종별 포괄적 커리큘럼 표시 */}
                <IndustrySpecificCurriculumDisplay
                  industryCode={getIndustryCode(caseData.industry)}
                  industryName={caseData.industry}
                  companySize={getCompanySize(caseData.companyInfo?.employees)}
                  customizations={[
                    `${caseData.industry} 특화 AI 적용 사례 중심 교육`,
                    `${caseData.companyInfo?.employees} 규모 조직 맞춤형 프로그램`,
                    '실무 적용 가능한 핸즈온 실습 중심',
                    '단계별 성과 측정 및 피드백 시스템',
                    'AI와 n8n을 활용한 업무 자동화 실습',
                    '업종별 성공 사례 기반 실전 프로젝트'
                  ]}
                />
                
                {/* 기존 성공사례 기반 커리큘럼도 함께 표시 */}
                <Card className="border-t-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span>실제 적용된 성공사례 커리큘럼</span>
                    </CardTitle>
                    <p className="text-gray-600">
                      위 업종별 표준 커리큘럼을 바탕으로 실제 {caseData.companyInfo?.name || '해당 기업'}에 적용된 맞춤형 교육과정
                    </p>
                  </CardHeader>
                  <CardContent>
                    <EnhancedCurriculumDisplay
                      caseCurriculum={{
                        caseId: caseData.id,
                        appliedCurriculum: safeCurriculum,
                        customizations: [
                          `${caseData.industry} 특화 AI 적용 사례 중심 교육`,
                          `${caseData.companyInfo?.employees} 규모 조직 맞춤형 프로그램`,
                          '실무 적용 가능한 핸즈온 실습 중심',
                          '단계별 성과 측정 및 피드백 시스템'
                        ],
                        implementationProcess: safeProcess,
                        measuredOutcomes: {
                          quantitative: safeResults.quantitative,
                          qualitative: safeResults.qualitative
                        }
                      }}
                      industryType={caseData.industry}
                      companyInfo={caseData.companyInfo}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* 맞춤추천 탭 */}
          <TabsContent value="recommendation" className="space-y-8">
            {caseData && (
              <CurriculumRecommendationEngine
                industryType={caseData.category}
                companySize={
                  caseData.companyInfo?.employees?.includes('156명') ? 'medium' :
                  caseData.companyInfo?.employees?.includes('89명') ? 'small' :
                  caseData.companyInfo?.employees?.includes('직원') ? 'medium' : 'medium'
                }
                currentAIMaturity={75} // 성공사례 기반 추정값
                specificNeeds={safeTags.slice(0, 4)}
                timeline="3개월"
              />
            )}
          </TabsContent>

          {/* 프로세스 탭 */}
          <TabsContent value="process" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-green-600" />
                  AICAMP 적용 프로세스
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {safeProcess.map((phase: any, index: number) => (
                    <div key={index} className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-green-800">{phase.phase}</h4>
                        <Badge variant="outline" className="border-green-400 text-green-700">
                          {phase.duration}
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <h5 className="font-semibold text-green-700 mb-2">주요 활동:</h5>
                        <ul className="list-disc list-inside space-y-1 text-green-600">
                          {getSafeArray(phase.activities).map((activity: string, idx: number) => (
                            <li key={idx}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-700 mb-2">성과:</h5>
                        <ul className="list-disc list-inside space-y-1 text-green-600">
                          {getSafeArray(phase.results).map((result: string, idx: number) => (
                            <li key={idx}>{result}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성과 탭 */}
          <TabsContent value="results" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    정량적 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {safeResults.quantitative.map((result: any, index: number) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <div className="font-semibold text-blue-900 mb-2">{result.metric}</div>
                        <div className="flex justify-between text-sm text-blue-700">
                          <span>이전: {result.before}</span>
                          <span>이후: {result.after}</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600 mt-2">{result.improvement}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    재무적 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {safeResults.financial.map((result: any, index: number) => (
                      <div key={index} className="bg-green-50 p-4 rounded-lg">
                        <div className="font-semibold text-green-900 mb-2">{result.item}</div>
                        <div className="text-2xl font-bold text-green-600">{result.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-purple-600" />
                  정성적 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {safeResults.qualitative.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 시각화 탭 */}
          <TabsContent value="visualization" className="space-y-8">
            {caseData && <CaseVisualization caseData={caseData} />}
          </TabsContent>

          {/* 비교 탭 */}
          <TabsContent value="comparison" className="space-y-8">
            {caseData && <CaseComparison currentCase={caseData} allCases={Object.values(caseDetails).filter(c => c.id !== caseData.id)} />}
          </TabsContent>

          {/* 후기 탭 */}
          <TabsContent value="testimonial" className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <blockquote className="text-2xl font-medium text-gray-900 mb-6">
                    "{caseData.testimonial?.quote}"
                  </blockquote>
                  <div className="text-lg">
                    <div className="font-semibold text-gray-900">{caseData.testimonial?.author}</div>
                    <div className="text-gray-600">{caseData.testimonial?.position}</div>
                    <div className="text-blue-600">{caseData.testimonial?.company}</div>
                  </div>
                </div>

                {safeFollowUpResults.length > 0 && (
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      6개월 후 추가 성과
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {safeFollowUpResults.map((result: any, index: number) => (
                        <div key={index} className="bg-green-50 p-4 rounded-lg">
                          <div className="font-semibold text-green-900 mb-2">{result.metric}</div>
                          <div className="text-green-700">{result.achievement}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 고지사항 섹션 */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <DisclaimerNotice />
        </div>
      </div>

      {/* 법적 고지사항 Footer */}
      <LegalFooter />
    </div>
  );
}

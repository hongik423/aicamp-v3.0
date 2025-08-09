'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Palette,
  Rocket,
  Shield,
  Globe
} from 'lucide-react';

type ParamsPromise = Promise<{ id: string }>;

export default function CaseDetailPage({ params }: { params: ParamsPromise }) {
  const [caseId, setCaseId] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.resolve(params).then((p) => {
      setCaseId(p.id);
      setLoading(false);
    });
  }, [params]);

  // 성공사례 상세 데이터
  const caseDetails: { [key: string]: any } = {
    'manufacturing-smart-factory': {
      id: 'manufacturing-smart-factory',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트팩토리솔루션',
      title: 'AI 혁신으로 업무 효율성 69% 향상',
      subtitle: '자동차 부품 제조업체의 디지털 트랜스포메이션 성공 스토리',
      description: '직원 67명 규모의 자동차 부품 제조업체가 AI 도입을 통해 제안서 작성 시간 69% 단축, 품질 데이터 분석 85% 효율화를 달성한 혁신 사례',
      icon: Factory,
      color: 'blue',
      
      // 기업 정보
      companyInfo: {
        industry: '자동차 부품 제조 (스탬핑, 용접)',
        employees: '67명',
        revenue: '연매출 145억원',
        location: '경기도 안산시',
        exportRatio: '40%'
      },
      
      // 도입 전 과제
      challenges: [
        {
          title: '제안서 지옥',
          description: '월 15-20건 제안서 작성으로 핵심 인력 소진',
          impact: '핵심 업무 집중도 저하'
        },
        {
          title: '수작업 데이터 분석',
          description: 'Excel 기반 품질 데이터 분석으로 실시간 대응 한계',
          impact: '품질 이슈 사후 대응'
        },
        {
          title: '다국어 소통 장벽',
          description: '해외 거래처와의 소통에서 번역 비용 및 시간 소요',
          impact: '해외 사업 확장 제약'
        },
        {
          title: '반복 업무 과다',
          description: '보고서, 회의록, 매뉴얼 작성 등 창조적 업무 시간 부족',
          impact: '혁신 역량 저하'
        }
      ],
      
      // AI 도입 프로세스
      process: [
        {
          phase: '1단계: AI 역량 진단',
          duration: '2주',
          activities: [
            'AI 활용 현황 진단 (35개 항목)',
            '디지털 성숙도 평가',
            'AI 적용 기회 발굴',
            '우선순위 설정'
          ],
          results: [
            '현재 AI 활용도: 15점/100점',
            '디지털 성숙도: 40점/100점',
            'AI 학습 준비도: 70점/100점',
            '업무 자동화 가능성: 85점/100점'
          ]
        },
        {
          phase: '2단계: AI 맞춤 전략 설계',
          duration: '3주',
          activities: [
            '기업 맞춤형 AI 도구 선정',
            '단계별 도입 로드맵 설계',
            '교육 프로그램 계획',
            '성과 측정 지표 설정'
          ],
          results: [
            'Claude Pro + 맞춤 프롬프트 템플릿',
            'ChatGPT Advanced Data Analysis',
            'DeepL Pro + Grammarly Business',
            'Zapier + Make.com 자동화'
          ]
        },
        {
          phase: '3단계: AI 실무 적용',
          duration: '16주',
          activities: [
            '핵심 업무 AI 도입 (1-4주)',
            '심화 활용 (5-12주)',
            '조직 전체 확산 (13-16주)',
            '성과 측정 및 개선'
          ],
          results: [
            '제안서 작성 시스템 구축',
            '품질 관리 AI 시스템',
            '다국어 소통 자동화',
            'AI 거버넌스 구축'
          ]
        }
      ],
      
      // 주요 성과
      results: {
        quantitative: [
          { metric: '제안서 작성 시간', before: '1건당 8시간', after: '1건당 2.5시간', improvement: '69% 단축' },
          { metric: '품질 데이터 분석', before: '주 20시간', after: '주 3시간', improvement: '85% 단축' },
          { metric: '고객 문의 응답', before: '평균 4시간', after: '평균 30분', improvement: '87% 단축' },
          { metric: '월 보고서 작성', before: '40시간', after: '8시간', improvement: '80% 단축' },
          { metric: '설계 도면 수정', before: '3일', after: '6시간', improvement: '75% 단축' }
        ],
        financial: [
          { category: '인건비 절감', amount: '1억 2,000만원', description: '업무 시간 단축 효과' },
          { category: '번역 비용 절감', amount: '3,000만원', description: '자동 번역 시스템 도입' },
          { category: '품질 개선', amount: '8,000만원', description: '불량률 감소 및 클레임 방지' },
          { category: '매출 증대', amount: '3억 5,000만원', description: '수주율 향상 및 신속 대응' }
        ],
        qualitative: [
          { aspect: '직원 만족도', score: '92%', description: '업무 스트레스 감소' },
          { aspect: '학습 문화', improvement: 'AI 자율 학습 시간 월 10시간 증가', description: '지속적 역량 개발' },
          { aspect: '혁신 마인드', improvement: '신기술 수용성 85% 향상', description: '변화에 대한 긍정적 태도' },
          { aspect: '경쟁 우위', achievement: '동종 업계 대비 기술 선도 지위 확보', description: '시장에서의 차별화' }
        ]
      },
      
      // 고객 인터뷰
      testimonial: {
        name: '김철수 대표이사',
        position: '(주)스마트팩토리솔루션 대표',
        quote: 'AI 도입 전후가 완전히 다른 회사가 되었습니다. 솔직히 처음엔 우리 같은 제조업에 AI가 무슨 소용이냐고 생각했어요. 하지만 Business Model Zen 방식으로 단계적으로 접근하니까 직원들도 자연스럽게 받아들이더라고요. 가장 놀라운 건 제안서 작성이에요. 예전엔 직원들이 밤새워 만들던 것을 이제 2-3시간이면 끝나거든요. 그것도 품질이 훨씬 좋아졌어요.',
        additionalQuote: '무엇보다 직원들이 창조적인 일에 집중할 수 있게 된 게 가장 큰 성과입니다. 반복 업무는 AI가 하고, 사람은 정말 중요한 판단과 혁신에 집중하니까 회사 전체 분위기가 달라졌어요.',
        photo: '/images/testimonial-kim.jpg'
      },
      
      // 6개월 후 추가 성과
      followUpResults: [
        { metric: '신규 AI 도구 도입', achievement: '8개 (처음 5개 → 13개)' },
        { metric: '전 직원 AI 활용률', achievement: '95% (월 20시간 이상 활용)' },
        { metric: 'AI 제안 건수', achievement: '직원 주도 개선 제안 월 15건' },
        { metric: '타 기업 벤치마킹', achievement: '동종 업계 5개사 견학 및 자문' },
        { metric: '신규 거래처', achievement: '7개사 (AI 기반 빠른 대응력 인정)' },
        { metric: '해외 수출 증가', achievement: '40% → 65% (다국어 소통 자동화 효과)' }
      ],
      
      // 적용 가능성
      applicability: {
        similarIndustries: ['정밀 가공업', '플라스틱 제조업', '금속 가공업'],
        successFactors: [
          '경영진의 강력한 의지: CEO 주도의 AI 도입 추진',
          '단계적 접근: 한 번에 모든 것을 바꾸지 않고 점진적 확산',
          '직원 참여: 강요가 아닌 자발적 학습 문화 조성',
          '지속적 지원: 도입 후 6개월간 전문가 사후관리'
        ]
      },
      
      tags: ['제조업', 'AI 도입', '업무 자동화', '품질 관리', '제안서 작성', '다국어 소통']
    },
    
    'creative-marketing': {
      id: 'creative-marketing',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)크리에이티브마케팅',
      title: '창작 업무 AI 혁신으로 생산성 300% 증대',
      subtitle: '디자인 에이전시의 AI 기반 창작 혁신 성공 스토리',
      description: '직원 28명 규모의 종합 광고 대행사가 AI 창작 도구를 활용하여 디자인 시안 생성 83% 시간 단축, 영상 편집 86% 효율화를 통해 매출 61% 성장을 달성한 혁신 사례',
      icon: Palette,
      color: 'purple',
      
      companyInfo: {
        industry: '종합 광고 대행 및 브랜딩',
        employees: '28명',
        revenue: '연매출 42억원 → 68억원',
        specialty: 'B2B 마케팅 전문, 중소기업 고객 80%',
        services: '브랜딩, 디자인, 영상 제작, 웹사이트'
      },
      
      challenges: [
        {
          title: '아이디어 고갈',
          description: '비슷한 컨셉의 반복으로 창의성 한계',
          impact: '클라이언트 만족도 저하'
        },
        {
          title: '시간 부족',
          description: '기획-디자인-제작 과정의 긴 리드타임',
          impact: '프로젝트 처리량 제한'
        },
        {
          title: '인력 의존',
          description: '핵심 디자이너 1-2명에 과도한 업무 집중',
          impact: '병목 현상 및 품질 불안정'
        },
        {
          title: '클라이언트 요구 증가',
          description: '더 빠르고 다양한 시안 요구 증가',
          impact: '업무 과부하 및 스트레스'
        }
      ],
      
      process: [
        {
          phase: '1단계: 창작 역량 AI 진단',
          duration: '2주',
          activities: [
            '창작 업무 AI 적용 가능성 분석',
            '현재 워크플로우 분석',
            'AI 도구 매칭 및 선정',
            '교육 계획 수립'
          ],
          results: [
            'GPT-4 브레인스토밍 활용',
            'Midjourney, DALL-E 시안 생성',
            'Claude 카피라이팅',
            'RunwayML 영상 편집'
          ]
        },
        {
          phase: '2단계: AI 창작 도구 맞춤 설계',
          duration: '3주',
          activities: [
            '창작 프로세스별 AI 도구 매칭',
            '워크플로우 재설계',
            '품질 관리 시스템 구축',
            '팀별 역할 재정의'
          ],
          results: [
            'ChatGPT-4 + Claude 전략 수립',
            'Midjourney + Adobe Firefly 비주얼',
            'Canva AI + Figma AI 실무 제작',
            'Gamma + Beautiful.AI 프레젠테이션'
          ]
        },
        {
          phase: '3단계: AI 창작 워크플로우 구축',
          duration: '12주',
          activities: [
            'AI 기반 캠페인 기획 프로세스',
            '실제 프로젝트 적용',
            '품질 검증 및 개선',
            '팀 역량 강화'
          ],
          results: [
            'B2B SaaS 브랜딩 10일 완성',
            '시안 생성 속도 566% 증가',
            '클라이언트 만족도 96% 달성',
            '전 직원 AI 크리에이터 육성'
          ]
        }
      ],
      
      results: {
        quantitative: [
          { metric: '카피라이팅', before: '1건당 4시간', after: '1건당 45분', improvement: '81% 시간 단축' },
          { metric: '디자인 시안', before: '3일 평균', after: '4시간 평균', improvement: '83% 시간 단축' },
          { metric: '영상 편집', before: '1주일', after: '1일', improvement: '86% 시간 단축' },
          { metric: '마케팅 전략', before: '2주 리서치', after: '3일 분석', improvement: '78% 시간 단축' },
          { metric: '프로젝트 완료', before: '평균 4주', after: '1.5주', improvement: '62% 단축' }
        ],
        financial: [
          { category: '프로젝트 처리량', amount: '월 8건 → 18건', description: '125% 증가' },
          { category: '직원당 생산성', amount: '개인별 150% 향상', description: 'AI 도구 활용 효과' },
          { category: '신규 고객 확보', amount: '30% 증가', description: '빠른 대응력으로 경쟁 우위' },
          { category: '매출 성장', amount: '연 42억 → 68억', description: '61% 성장' }
        ],
        qualitative: [
          { aspect: '창의성 확장', improvement: '아이디어 다양성 300% 증가', description: 'AI 협업으로 새로운 트렌드 창조' },
          { aspect: '글로벌 감각', improvement: '해외 트렌드 실시간 반영', description: '국제적 수준의 크리에이티브' },
          { aspect: '개인화 서비스', improvement: '클라이언트별 맞춤형 제공', description: '차별화된 서비스 품질' },
          { aspect: '하이브리드 창작', achievement: '인간의 감성 + AI의 논리적 분석', description: '새로운 창작 패러다임' }
        ]
      },
      
      testimonial: {
        name: '박지영 크리에이티브 디렉터',
        position: '(주)크리에이티브마케팅 CD',
        quote: 'AI가 제 창작 능력을 10배 증폭시켜줬어요. 처음엔 AI가 내 일자리를 뺏는 건 아닐까 걱정했어요. 하지만 실제로 써보니 완전히 달랐어요. AI는 저를 대체하는 게 아니라 제 창의력을 엄청나게 증폭시켜주는 파트너더라고요.',
        additionalQuote: '예전엔 아이디어 하나 떠올리려고 며칠을 고민했는데, 이제는 AI와 브레인스토밍하면서 한 시간에 20-30개 아이디어를 만들어내요. 그 중에 정말 기가 막힌 아이디어들이 나오거든요. 무엇보다 클라이언트들이 놀라워해요.',
        photo: '/images/testimonial-park.jpg'
      },
      
      followUpResults: [
        { metric: 'Midjourney 활용', achievement: '로고 디자인 3일 → 3시간' },
        { metric: 'ChatGPT 카피라이팅', achievement: '슬로건 개발 2주 → 2시간' },
        { metric: 'RunwayML 영상제작', achievement: '홍보 영상 1주일 → 1일' },
        { metric: '시안 다양성', achievement: '기존 5개 → 현재 50개' },
        { metric: '클라이언트 만족도', achievement: '디자인 수정 요청 70% 감소' },
        { metric: '제작 비용', achievement: '영상 제작비 70% 절감' }
      ],
      
      applicability: {
        similarIndustries: ['광고 대행사', '브랜딩 에이전시', '콘텐츠 제작사', '디자인 스튜디오'],
        successFactors: [
          'AI 크리에이터 양성: 전 직원 AI 도구 전문가로 육성',
          '하이브리드 창작: 인간의 감성 + AI의 논리적 분석',
          '지속 학습: 매주 새로운 AI 도구 테스트 및 도입',
          '창작 자동화: 반복 업무는 AI, 핵심 결정은 인간'
        ]
      },
      
      tags: ['서비스업', 'AI 창작', '디자인', '마케팅', '브랜딩', '콘텐츠 제작']
    }
    
    // 추가 케이스들도 동일한 구조로 정의...
  };

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

  if (!caseData) {
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

  const IconComponent = caseData.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <section className={`bg-gradient-to-r from-${caseData.color}-600 to-${caseData.color}-800 text-white py-16`}>
        <div className="container mx-auto px-4">
          {/* 네비게이션 */}
          <div className="mb-8">
            <Link href="/cases" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              성공사례 목록으로 돌아가기
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl bg-white/20`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-0">
                  {caseData.industry}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {caseData.title}
                </h1>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {caseData.subtitle}
            </p>
            
            <p className="text-lg opacity-80 leading-relaxed">
              {caseData.description}
            </p>
          </div>
        </div>
      </section>

      {/* 기업 정보 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Building2 className="w-6 h-6 mr-3 text-blue-600" />
              기업 개요
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(caseData.companyInfo).map(([key, value], index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2 capitalize">
                    {key === 'industry' && '업종'}
                    {key === 'employees' && '직원 수'}
                    {key === 'revenue' && '매출'}
                    {key === 'location' && '위치'}
                    {key === 'exportRatio' && '수출 비중'}
                    {key === 'specialty' && '전문 분야'}
                    {key === 'services' && '주요 서비스'}
                  </div>
                  <div className="font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 탭 섹션 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="challenges" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="challenges">도입 전 과제</TabsTrigger>
                <TabsTrigger value="process">AI 도입 과정</TabsTrigger>
                <TabsTrigger value="results">주요 성과</TabsTrigger>
                <TabsTrigger value="testimonial">고객 인터뷰</TabsTrigger>
              </TabsList>

              {/* 도입 전 과제 */}
              <TabsContent value="challenges" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {caseData.challenges.map((challenge: any, index: number) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-600 flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          {challenge.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{challenge.description}</p>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-sm text-red-800">
                            <strong>영향:</strong> {challenge.impact}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AI 도입 과정 */}
              <TabsContent value="process" className="mt-8">
                <div className="space-y-8">
                  {caseData.process.map((phase: any, index: number) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-blue-600">
                            {phase.phase}
                          </CardTitle>
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {phase.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 활동</h4>
                            <ul className="space-y-2">
                              {phase.activities.map((activity: string, actIndex: number) => (
                                <li key={actIndex} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                                  <span className="text-gray-600">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 성과</h4>
                            <ul className="space-y-2">
                              {phase.results.map((result: string, resIndex: number) => (
                                <li key={resIndex} className="flex items-start">
                                  <Award className="w-4 h-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 주요 성과 */}
              <TabsContent value="results" className="mt-8">
                <div className="space-y-8">
                  {/* 정량적 성과 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-600 flex items-center">
                        <BarChart3 className="w-6 h-6 mr-2" />
                        정량적 성과
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">지표</th>
                              <th className="text-left py-3 px-4">도입 전</th>
                              <th className="text-left py-3 px-4">도입 후</th>
                              <th className="text-left py-3 px-4">개선 효과</th>
                            </tr>
                          </thead>
                          <tbody>
                            {caseData.results.quantitative.map((result: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4 font-medium">{result.metric}</td>
                                <td className="py-3 px-4 text-gray-600">{result.before}</td>
                                <td className="py-3 px-4 text-gray-600">{result.after}</td>
                                <td className="py-3 px-4">
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {result.improvement}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 경제적 효과 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-600 flex items-center">
                        <DollarSign className="w-6 h-6 mr-2" />
                        경제적 효과 (연간 기준)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {caseData.results.financial.map((item: any, index: number) => (
                          <div key={index} className="bg-blue-50 p-4 rounded-lg">
                            <div className="font-semibold text-blue-900">{item.category}</div>
                            <div className="text-2xl font-bold text-blue-600 my-2">{item.amount}</div>
                            <div className="text-sm text-blue-700">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 정성적 성과 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-600 flex items-center">
                        <Users className="w-6 h-6 mr-2" />
                        정성적 성과
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {caseData.results.qualitative.map((item: any, index: number) => (
                          <div key={index} className="border-l-4 border-purple-400 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{item.aspect}</h4>
                            {item.score && (
                              <div className="text-2xl font-bold text-purple-600 mb-2">{item.score}</div>
                            )}
                            {item.improvement && (
                              <div className="text-lg font-semibold text-purple-600 mb-2">{item.improvement}</div>
                            )}
                            {item.achievement && (
                              <div className="text-lg font-semibold text-purple-600 mb-2">{item.achievement}</div>
                            )}
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 고객 인터뷰 */}
              <TabsContent value="testimonial" className="mt-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{caseData.testimonial.name}</h3>
                          <p className="text-gray-600">{caseData.testimonial.position}</p>
                        </div>
                        
                        <Quote className="w-8 h-8 text-blue-600 mb-4" />
                        
                        <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                          "{caseData.testimonial.quote}"
                        </blockquote>
                        
                        {caseData.testimonial.additionalQuote && (
                          <blockquote className="text-lg text-gray-700 leading-relaxed border-l-4 border-blue-400 pl-4">
                            "{caseData.testimonial.additionalQuote}"
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 6개월 후 추가 성과 */}
                {caseData.followUpResults && (
                  <Card className="border-0 shadow-lg mt-8">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-600 flex items-center">
                        <Calendar className="w-6 h-6 mr-2" />
                        6개월 후 추가 성과
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {caseData.followUpResults.map((result: any, index: number) => (
                          <div key={index} className="bg-green-50 p-4 rounded-lg">
                            <div className="font-semibold text-green-900 mb-2">{result.metric}</div>
                            <div className="text-green-700">{result.achievement}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {caseData.companyName}과 같은 성공을 경험해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문가와 함께 당신의 기업도 AI 혁신 성공사례를 만들어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosis">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Target className="w-5 h-5 mr-2" />
                무료 AI 진단 시작
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                전문가 상담 신청
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

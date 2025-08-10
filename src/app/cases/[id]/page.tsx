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
  Lightbulb
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

  // 26개 성공사례 상세 데이터
  const caseDetails: { [key: string]: any } = {
    'manufacturing-aicamp-digital-transformation': {
      id: 'manufacturing-aicamp-digital-transformation',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트매뉴팩처링',
      title: 'AI 프로세스 자동화로 스마트팩토리 구축 및 고몰입조직 실현',
      subtitle: 'ChatGPT API + n8n 워크플로우로 생산계획 자동화, 품질예측 AI 도입',
      description: 'AICAMP 8주 교육과 부서별 워크숍으로 전직원 AI 역량 강화, n8n 기반 생산라인 자동화로 생산성 245% 향상',
      icon: Factory,
      color: 'blue',
      heroImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '자동차 부품 제조·정밀가공',
        employees: '156명',
        revenue: '연매출 320억원',
        location: '경기도 안산'
      },
      challenges: [
        { title: '생산 효율성 저하', description: '수작업 의존으로 인한 생산성 한계', impact: '목표 대비 78% 달성' },
        { title: '품질 관리 어려움', description: '불량률 증가와 검사 시간 과다', impact: '불량률 5.2%' },
        { title: '직원 AI 역량 부족', description: 'AI 기술 도입에 대한 두려움과 저항', impact: '변화 수용도 낮음' }
      ],
      curriculum: {
        basic: [
          { title: 'AI 기초 이해', duration: '8시간', description: 'AI/ML 개념, 제조업 적용 사례, ChatGPT 활용법' },
          { title: '프롬프트 엔지니어링', duration: '16시간', description: '효과적인 프롬프트 작성, API 활용, 자동화 시나리오' },
          { title: 'n8n 워크플로우 기초', duration: '12시간', description: '노코드 자동화, 워크플로우 설계, API 연동' }
        ],
        advanced: [
          { title: 'Python 데이터분석', duration: '24시간', description: '생산 데이터 분석, 시각화, 예측 모델링' },
          { title: 'Computer Vision 실습', duration: '20시간', description: 'OpenCV, YOLO, 품질검사 AI 구축' },
          { title: 'ML 예측모델 구축', duration: '16시간', description: '수요예측, 재고최적화, 이상감지 모델' }
        ],
        executive: [
          { title: 'AI 전략 수립', duration: '4시간', description: '스마트팩토리 로드맵, 투자 계획, KPI 설정' },
          { title: 'ROI 분석 워크숍', duration: '4시간', description: '투자 효과 분석, 비용-편익 분석, 성과 측정' },
          { title: '변화관리 리더십', duration: '4시간', description: '조직문화 혁신, 저항 관리, 동기부여 전략' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 기초 교육',
          duration: '2주 (36시간)',
          activities: [
            'AI 기초 이론 및 제조업 적용 사례 학습',
            'ChatGPT API 활용 실습',
            'n8n 워크플로우 기초 실습'
          ],
          results: ['AI 이해도 85% 향상', '참여율 94%', '기초 역량 확보']
        },
        {
          phase: '2단계: 심화 실무 적용',
          duration: '4주 (60시간)',
          activities: [
            'Python 기반 생산 데이터 분석',
            'Computer Vision 품질검사 시스템 구축',
            'ML 기반 수요예측 모델 개발'
          ],
          results: ['자동화율 67% 달성', '품질 정확도 95%', '예측 정확도 89%']
        },
        {
          phase: '3단계: 경영진 전략 워크숍',
          duration: '3일 (12시간)',
          activities: [
            'AI 도입 전략 수립',
            'ROI 분석 및 투자 계획',
            '변화관리 전략 수립'
          ],
          results: ['투자 승인', '전사 확산 계획', '리더십 확보']
        }
      ],
      results: {
        quantitative: [
          { metric: '생산성 향상', before: '100%', after: '245%', improvement: '145% 향상' },
          { metric: '작업시간 단축', before: '8시간', after: '3.2시간', improvement: '60% 단축' },
          { metric: '불량률 감소', before: '5.2%', after: '0.8%', improvement: '85% 감소' },
          { metric: '직원몰입도', before: '62%', after: '94%', improvement: '32%p 향상' }
        ],
        financial: [
          { item: '생산성 향상 효과', amount: '연간 45억원' },
          { item: '품질 개선 효과', amount: '연간 12억원' },
          { item: '인력 효율화', amount: '연간 8억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          '전사적 AI 역량 강화로 혁신 마인드셋 구축',
          'n8n 기반 자동화로 업무 만족도 크게 향상',
          '부서 간 협업 증진으로 조직 시너지 창출',
          '지속적 학습 문화 정착으로 변화 적응력 강화'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육을 통해 직원들이 AI를 두려워하지 않고 적극적으로 활용하게 되었습니다. 특히 n8n을 활용한 자동화로 생산성이 크게 향상되었어요.",
        author: "김제조",
        position: "생산관리팀장",
        company: "(주)스마트매뉴팩처링"
      },
      followUpResults: [
        { metric: '스마트팩토리 확장', achievement: '전체 생산라인 70% 자동화 달성' },
        { metric: 'AI 전문인력 양성', achievement: '사내 AI 전문가 15명 육성' },
        { metric: '혁신문화 정착', achievement: '월평균 개선 제안 250% 증가' }
      ],
      tags: ['제조업', 'AICAMP교육', '스마트팩토리', 'n8n자동화', 'ChatGPT']
    }
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

  const IconComponent = caseData.icon || TrendingUp;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={caseData.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop'}
            alt={caseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <Link href="/cases" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              성공사례 목록으로
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <Badge className="bg-white/20 text-white border-white/30 mb-2">
                  {caseData.industry}
                </Badge>
                <div className="text-white/90">{caseData.companyName}</div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {caseData.title}
            </h1>
            <p className="text-xl text-white/90">
              {caseData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
                <TabsTrigger value="process">프로세스</TabsTrigger>
                <TabsTrigger value="results">성과</TabsTrigger>
                <TabsTrigger value="testimonial">후기</TabsTrigger>
              </TabsList>

              {/* 개요 탭 */}
              <TabsContent value="overview" className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center">
                      <Building2 className="w-6 h-6 mr-2" />
                      기업 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">업종:</span>
                          <span>{caseData.companyInfo?.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">직원 수:</span>
                          <span>{caseData.companyInfo?.employees}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">매출:</span>
                          <span>{caseData.companyInfo?.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">위치:</span>
                          <span>{caseData.companyInfo?.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600 flex items-center">
                      <Target className="w-6 h-6 mr-2" />
                      주요 도전과제
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {caseData.challenges?.map((challenge: any, index: number) => (
                        <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-semibold text-red-800 mb-2">{challenge.title}</h4>
                          <p className="text-red-700 mb-2">{challenge.description}</p>
                          <p className="text-sm text-red-600 font-medium">영향: {challenge.impact}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 커리큘럼 탭 */}
              <TabsContent value="curriculum" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* 기초 과정 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-lg text-blue-700 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        기초 과정
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {caseData.curriculum?.basic?.map((course: any, index: number) => (
                          <div key={index} className="border-l-2 border-blue-300 pl-4">
                            <h4 className="font-semibold text-gray-800">{course.title}</h4>
                            <p className="text-sm text-blue-600 mb-1">{course.duration}</p>
                            <p className="text-sm text-gray-600">{course.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 심화 과정 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-lg text-purple-700 flex items-center">
                        <Cpu className="w-5 h-5 mr-2" />
                        심화 과정
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {caseData.curriculum?.advanced?.map((course: any, index: number) => (
                          <div key={index} className="border-l-2 border-purple-300 pl-4">
                            <h4 className="font-semibold text-gray-800">{course.title}</h4>
                            <p className="text-sm text-purple-600 mb-1">{course.duration}</p>
                            <p className="text-sm text-gray-600">{course.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 경영진 과정 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-lg text-green-700 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        경영진 과정
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {caseData.curriculum?.executive?.map((course: any, index: number) => (
                          <div key={index} className="border-l-2 border-green-300 pl-4">
                            <h4 className="font-semibold text-gray-800">{course.title}</h4>
                            <p className="text-sm text-green-600 mb-1">{course.duration}</p>
                            <p className="text-sm text-gray-600">{course.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 프로세스 탭 */}
              <TabsContent value="process" className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      AICAMP 적용 프로세스
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {caseData.process?.map((phase: any, index: number) => (
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
                              {phase.activities?.map((activity: string, idx: number) => (
                                <li key={idx}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-700 mb-2">성과:</h5>
                            <ul className="list-disc list-inside space-y-1 text-green-600">
                              {phase.results?.map((result: string, idx: number) => (
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
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-2" />
                      정량적 성과
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseData.results?.quantitative?.map((result: any, index: number) => (
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

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center">
                      <DollarSign className="w-6 h-6 mr-2" />
                      재무적 성과
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseData.results?.financial?.map((result: any, index: number) => (
                        <div key={index} className="bg-green-50 p-4 rounded-lg">
                          <div className="font-semibold text-green-900 mb-2">{result.item}</div>
                          <div className="text-2xl font-bold text-green-600">{result.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 고객 후기 탭 */}
              <TabsContent value="testimonial">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center">
                      <Quote className="w-6 h-6 mr-2" />
                      고객 후기
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-8 rounded-lg">
                      <Quote className="w-10 h-10 text-blue-600 mb-4" />
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                        "{caseData.testimonial?.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{caseData.testimonial?.author}</div>
                          <div className="text-sm text-gray-600">
                            {caseData.testimonial?.position} | {caseData.testimonial?.company}
                          </div>
                        </div>
                      </div>
                    </div>

                    {caseData.followUpResults && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          6개월 후 추가 성과
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {caseData.followUpResults?.map((result: any, index: number) => (
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
            AICAMP 맞춤형 커리큘럼으로 AI 전문가가 되어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                무료 상담 신청
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                AI역량진단 받기
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-lg opacity-90">
              📞 010-9251-9743 | ✉️ hongik423@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

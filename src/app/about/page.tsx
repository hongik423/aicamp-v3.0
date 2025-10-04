'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Target, 
  Award, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  BookOpen,
  Briefcase,
  GraduationCap,
  Star,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100/30 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-8">
              <Building2 className="w-4 h-4" />
              About AI CAMP
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              AI 혁신을 이끄는
              <br />
              교육 전문 기업
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              기업의 AI 역량 강화와 디지털 전환을 위한
              <br className="hidden sm:block" />
              전문 교육 및 컨설팅 서비스를 제공합니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl" asChild>
                <Link href="/consultation">
                  <Mail className="mr-2 h-5 w-5" />
                  상담 문의하기
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 px-8 py-4 rounded-xl" asChild>
                <Link href="/services">
                  서비스 살펴보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 회사 개요 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                AI CAMP 소개
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                AI CAMP는 기업의 AI 역량 강화와 디지털 전환을 지원하는 전문 교육 기업입니다.
                실무 중심의 체계적인 교육 프로그램을 통해 기업의 생산성 혁신을 이끌어갑니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">미션</h3>
                  <p className="text-gray-600 leading-relaxed">
                    모든 기업이 AI 기술을 활용하여 업무 효율성을 극대화할 수 있도록 지원
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">비전</h3>
                  <p className="text-gray-600 leading-relaxed">
                    AI 교육 분야의 선도 기업으로서 디지털 전환의 파트너가 되는 것
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">가치</h3>
                  <p className="text-gray-600 leading-relaxed">
                    실무 중심의 교육과 지속적인 혁신을 통한 고객 성공 실현
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 리더십 팀 */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                리더십 팀
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                풍부한 경험과 전문성을 바탕으로 AI CAMP를 이끌어가는 리더들을 소개합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* 홍용기 대표 */}
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <CardHeader className="text-center pb-0 pt-8">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                      <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                        <Image
                          src="/images/aicamp_ceo.jpg?v=3"
                          alt="홍용기 대표이사"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">홍용기</CardTitle>
                    <CardDescription className="text-lg font-semibold text-blue-600 mb-4">
                      대표이사 / CEO
                    </CardDescription>
                    <Badge variant="secondary" className="mb-4">
                      경영 전략 · 사업 개발
                    </Badge>
                  </CardHeader>
                </div>
                
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">학력 및 자격</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 컨설팅학 박사</li>
                          <li>• CMC (국제공인컨설턴트)</li>
                          <li>• 빅데이터분석기사</li>
                          <li>• 기업가치평가사</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">현재 주요 직책</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AI CAMP 대표이사</li>
                          <li>• 여주대학교 창업과경영 출강</li>
                          <li>• ISP 컨설팅 전문가</li>
                          <li>• ODA 프로젝트 총괄</li>
                          <li>• AI 데이터구축사업 평가위원</li>
                          <li>• 데이터가치평가 컨설턴트</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">전문 분야</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 기업 AI 전략 수립</li>
                          <li>• 디지털 혁신 리더십</li>
                          <li>• 조직 변화 관리</li>
                          <li>• 데이터 분석 및 AI 컨설팅</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-700 italic leading-relaxed">
                        "AI는 단순한 기술이 아닌 기업 문화의 혁신입니다. 
                        모든 구성원이 AI와 함께 성장할 수 있는 환경을 만들어가겠습니다."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 이후경 교장 */}
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                  <CardHeader className="text-center pb-0 pt-8">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                      <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                        <Image
                          src="/images/aicamp_leader2.jpg?v=3"
                          alt="이후경 교장"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">이후경</CardTitle>
                    <CardDescription className="text-lg font-semibold text-green-600 mb-4">
                      교장 / Chief Education Officer
                    </CardDescription>
                    <Badge variant="secondary" className="mb-4">
                      AI 교육 · 커리큘럼 개발
                    </Badge>
                  </CardHeader>
                </div>
                
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">학력 및 자격</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 대전대학교 기술경영 석사</li>
                          <li>• 경영지도사 (인적자원)</li>
                          <li>• 온실가스관리기사</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">현재 주요 직책</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AI CAMP 교장 겸 CTO</li>
                          <li>• 아이엔제이컨설팅 책임컨설턴트</li>
                          <li>• 월드클래스코리아 HRD실장</li>
                          <li>• ESG인증원 책임컨설턴트</li>
                          <li>• 한국능률협회컨설팅 EXPERT</li>
                          <li>• IBK미래성장성 심의회 전문가</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">주요 경력 (28년)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 2014년~현재: 경영지도사/전문 컨설턴트</li>
                          <li>• 2010년~2014년: 엠오티랩 대표 컨설턴트</li>
                          <li>• 2000년~2010년: 영업조직 관리 (지점장 역임)</li>
                          <li>• 1993년~2000년: 현대그룹 고려산업개발</li>
                          <li>• 200개사 이상 조직/인사 컨설팅 수행</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">전문 분야</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AI 역량 진단 및 평가</li>
                          <li>• 맞춤형 교육 프로그램 설계</li>
                          <li>• 조직 학습 문화 구축</li>
                          <li>• 인사노무 및 조직관리</li>
                          <li>• 고용노동부 일터혁신 컨설팅</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-700 italic leading-relaxed">
                        "진정한 AI 교육은 기술 습득을 넘어 사고방식의 변화입니다. 
                        실무에 바로 적용할 수 있는 살아있는 교육을 제공하겠습니다."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 정보 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                연락처
              </h2>
              <p className="text-lg text-gray-600">
                AI CAMP와 함께 기업의 AI 혁신을 시작하세요
      </p>
    </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">전화 문의</h3>
                  <p className="text-gray-600">010-9251-9743</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">이메일</h3>
                  <p className="text-gray-600">hongik423@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">웹사이트</h3>
                  <p className="text-gray-600">aicamp.club</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl" asChild>
                <Link href="/consultation">
                  지금 상담 신청하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
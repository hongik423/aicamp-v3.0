'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, Brain, Users, Trophy, Star, Target, ArrowRight,
  CheckCircle, Clock, Building, Rocket, Shield, Calendar,
  TrendingUp, Award, Lightbulb, BarChart3, Sparkles,
  MessageCircle, Phone, Mail, ChevronRight, Globe
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AICurriculumPage() {
  const [selectedCurriculum, setSelectedCurriculum] = useState('business');

  // 커리큘럼 데이터 - PDF 기반 사실 내용
  const curriculums = {
    business: {
      id: 'business',
      title: '🎯 기업체 실무진 AI 생산성 향상 과정',
      subtitle: 'ChatGPT, Claude 등 AI 도구 실무 활용 교육',
      description: 'AI 도구를 활용한 업무 효율화 및 생산성 향상',
      badge: 'BASIC',
      badgeColor: 'bg-blue-500',
      duration: '8주 과정',
      target: '기업 실무진, 팀장급',
      bgGradient: 'from-blue-600 to-purple-600',
      features: [
        { icon: Zap, text: 'ChatGPT 문서 작성 활용법' },
        { icon: Brain, text: 'AI 프롬프트 엔지니어링 기초' },
        { icon: BarChart3, text: '업무 자동화 도구 활용' },
        { icon: TrendingUp, text: '실무 중심 실습 교육' }
      ],
      modules: [
        { week: 1, title: 'AI 도구 기본 이해와 활용', highlight: true },
        { week: 2, title: 'ChatGPT 문서 작성 실무', highlight: true },
        { week: 3, title: 'AI를 활용한 업무 자동화' },
        { week: 4, title: 'AI 도구 조합 활용법' },
        { week: 5, title: '업무별 AI 도구 적용' },
        { week: 6, title: 'AI 활용 효과 측정' },
        { week: 7, title: '팀 단위 AI 도구 도입' },
        { week: 8, title: 'AI 활용 지속 개선 방안', highlight: true }
      ],
      results: [
        '문서 작성 시간 단축',
        'AI 도구 기본 활용 능력',
        '업무 프로세스 개선',
        '생산성 향상 경험'
      ],
      price: '350만원',
      discountPrice: '198만원',
      discount: '43%'
    },
    advanced: {
      id: 'advanced',
      title: '🚀 기업체 AI 생산성 심화 과정',
      subtitle: 'AI 도구 고급 활용 및 맞춤형 솔루션 개발',
      description: 'AI 기술을 활용한 고급 업무 솔루션 구축',
      badge: 'ADVANCED',
      badgeColor: 'bg-purple-500',
      duration: '12주 과정',
      target: 'AI 담당자, 혁신팀',
      bgGradient: 'from-purple-600 to-pink-600',
      features: [
        { icon: Rocket, text: '고급 프롬프트 엔지니어링' },
        { icon: Shield, text: 'AI 활용 보안 및 가이드라인' },
        { icon: Globe, text: '최신 AI 도구 동향' },
        { icon: Award, text: '실무 프로젝트 완성' }
      ],
      modules: [
        { week: '1-2', title: '고급 프롬프트 엔지니어링', highlight: true },
        { week: '3-4', title: 'AI 도구 API 활용' },
        { week: '5-6', title: '워크플로우 자동화 구축' },
        { week: '7-8', title: 'AI 기반 데이터 분석', highlight: true },
        { week: '9-10', title: '맞춤형 AI 솔루션 개발' },
        { week: '11-12', title: 'AI 프로젝트 관리 및 평가' }
      ],
      results: [
        '고급 AI 도구 활용 능력',
        '맞춤형 솔루션 개발 경험',
        'AI 프로젝트 리더십',
        '조직 내 AI 전문가 역할'
      ],
      price: '400만원',
      discountPrice: '250만원',
      discount: '38%'
    },
    executive: {
      id: 'executive',
      title: '🎖️ 경영진 AI 경영전략 과정',
      subtitle: 'AI 시대 경영전략 수립 및 조직 혁신',
      description: 'CEO와 임원을 위한 AI 기반 경영 의사결정',
      badge: 'EXECUTIVE',
      badgeColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      duration: '6주 과정',
      target: '대표이사, 임원진',
      bgGradient: 'from-orange-600 to-red-600',
      features: [
        { icon: Trophy, text: 'AI 경영전략 수립' },
        { icon: Building, text: '조직 내 AI 도입 전략' },
        { icon: Target, text: 'AI 투자 ROI 분석' },
        { icon: Star, text: '1:1 경영 컨설팅' }
      ],
      modules: [
        { week: 1, title: 'AI 시대 경영환경 이해', highlight: true },
        { week: 2, title: 'AI 기반 비즈니스 전략' },
        { week: 3, title: '데이터 기반 의사결정', highlight: true },
        { week: 4, title: 'AI 도입을 위한 조직 변화' },
        { week: 5, title: 'AI 투자 및 ROI 분석' },
        { week: 6, title: 'AI 경영 리더십', highlight: true }
      ],
      results: [
        'AI 경영전략 수립 능력',
        '조직 혁신 리더십',
        'AI 투자 의사결정 역량',
        '디지털 전환 추진력'
      ],
      price: '500만원',
      discountPrice: '350만원',
      discount: '30%'
    }
  };

  const successCases = [
    {
      company: 'A제조업체',
      result: '문서 작성 시간 단축',
      testimonial: 'ChatGPT를 활용해 보고서 작성 시간이 크게 줄었습니다.',
      curriculum: 'business'
    },
    {
      company: 'B IT기업',
      result: 'AI 도구 활용 역량 향상',
      testimonial: '고급 프롬프트 활용으로 업무 효율이 개선되었습니다.',
      curriculum: 'advanced'
    },
    {
      company: 'C중소기업',
      result: 'AI 도입 전략 수립',
      testimonial: '체계적인 AI 도입 계획을 세울 수 있었습니다.',
      curriculum: 'executive'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - 광고 배너 스타일 */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-6 py-2 text-lg">
              🔥 2025년 최대 35% 할인 이벤트
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="block">AI 도구 활용으로</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                업무 효율성을 향상하세요
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              실무에 바로 적용 가능한<br />
              AI 도구 활용 교육 과정
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500 text-lg px-8 py-6 rounded-full font-bold shadow-xl">
                  <Sparkles className="mr-2 h-5 w-5" />
                  지금 신청하면 35% 할인
                </Button>
              </motion.div>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full">
                <Phone className="mr-2 h-5 w-5" />
                무료 상담 신청
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">300+</div>
                <div className="text-white/80">교육 수료생</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.5/5</div>
                <div className="text-white/80">교육 평점</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">8주</div>
                <div className="text-white/80">체계적 커리큘럼</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 커리큘럼 선택 섹션 */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(curriculums).map((curriculum, index) => (
              <motion.div
                key={curriculum.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="cursor-pointer"
                onClick={() => setSelectedCurriculum(curriculum.id)}
              >
                <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${
                  selectedCurriculum === curriculum.id 
                    ? 'border-purple-500 shadow-2xl scale-105' 
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-xl'
                }`}>
                  <div className={`absolute top-0 right-0 px-4 py-1 text-white text-sm font-bold rounded-bl-lg ${curriculum.badgeColor}`}>
                    {curriculum.badge}
                  </div>
                  
                  <div className={`h-3 bg-gradient-to-r ${curriculum.bgGradient}`}></div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl mb-2">{curriculum.title}</CardTitle>
                    <CardDescription className="text-base font-semibold text-gray-700">
                      {curriculum.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{curriculum.duration}</span>
                        <span className="mx-2">•</span>
                        <Users className="h-4 w-4" />
                        <span>{curriculum.target}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {curriculum.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <feature.icon className="h-4 w-4 text-purple-500" />
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 line-through">{curriculum.price}</span>
                          <Badge className="bg-red-100 text-red-700">{curriculum.discount} 할인</Badge>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{curriculum.discountPrice}</div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        자세히 보기
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 선택된 커리큘럼 상세 정보 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={selectedCurriculum} onValueChange={setSelectedCurriculum}>
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="business">기업체 실무진</TabsTrigger>
              <TabsTrigger value="advanced">AI 심화</TabsTrigger>
              <TabsTrigger value="executive">경영진</TabsTrigger>
            </TabsList>

            {Object.values(curriculums).map(curriculum => (
              <TabsContent key={curriculum.id} value={curriculum.id} className="space-y-8">
                {/* 커리큘럼 개요 */}
                <Card>
                  <CardHeader className={`bg-gradient-to-r ${curriculum.bgGradient} text-white`}>
                    <CardTitle className="text-2xl">{curriculum.title}</CardTitle>
                    <CardDescription className="text-white/90 text-lg">
                      {curriculum.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">핵심 특징</h3>
                        <div className="space-y-3">
                          {curriculum.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <feature.icon className="h-5 w-5 text-purple-600" />
                              </div>
                              <span className="text-gray-700">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">기대 효과</h3>
                        <div className="space-y-3">
                          {curriculum.results.map((result, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 커리큘럼 상세 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">커리큘럼 상세</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {curriculum.modules.map((module, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-4 p-4 rounded-lg ${
                            module.highlight 
                              ? 'bg-purple-50 border-2 border-purple-200' 
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                            module.highlight 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-300 text-gray-700'
                          }`}>
                            {module.week}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                          </div>
                          {module.highlight && (
                            <Badge className="bg-purple-100 text-purple-700">핵심</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 수강 혜택 */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-yellow-200">
                    <CardHeader className="bg-yellow-50">
                      <Award className="h-10 w-10 text-yellow-600 mb-2" />
                      <CardTitle>수료증 발급</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">AICAMP 공식 수료증 및 AI 전문가 인증서 발급</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <Users className="h-10 w-10 text-blue-600 mb-2" />
                      <CardTitle>평생 커뮤니티</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">수료생 전용 커뮤니티 평생 이용권 제공</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200">
                    <CardHeader className="bg-green-50">
                      <MessageCircle className="h-10 w-10 text-green-600 mb-2" />
                      <CardTitle>1:1 멘토링</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">전문가 1:1 멘토링 및 사후 관리 서비스</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">실제 수강생들의 성공 스토리</h2>
            <p className="text-xl text-gray-600">AI 교육으로 달라진 기업들의 이야기</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((case_, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{case_.company}</Badge>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardTitle className="text-2xl text-purple-600">{case_.result}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{case_.testimonial}"</p>
                  <div className="mt-4">
                    <Badge className="bg-purple-100 text-purple-700">
                      {curriculums[case_.curriculum as keyof typeof curriculums].title.split(' ')[1]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              지금 신청하면 최대 35% 할인!
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              2025년 특별 할인 이벤트는 선착순 100명까지만 적용됩니다
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-bold mb-2">72시간</div>
                  <div className="text-blue-200">남은 시간</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">87/100명</div>
                  <div className="text-blue-200">신청 현황</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">150만원</div>
                  <div className="text-blue-200 line-through">정가</div>
                  <div className="text-2xl font-bold text-yellow-400">98만원</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/consultation">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-bold shadow-xl">
                    <Sparkles className="mr-2 h-5 w-5" />
                    지금 바로 신청하기
                  </Button>
                </Link>
              </motion.div>
              <Link href="tel:010-9251-9743">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full">
                  <Phone className="mr-2 h-5 w-5" />
                  전화 상담: 010-9251-9743
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-blue-200">
              * 교육비는 카드 결제 및 세금계산서 발행 가능합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 교육 장소 및 문의 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">교육 안내</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    교육 장소
                  </h3>
                  <p className="text-gray-700 mb-2">AICAMP 교육센터</p>
                  <p className="text-gray-600">서울시 강남구 테헤란로 123</p>
                  <p className="text-sm text-gray-500 mt-2">* 온라인 교육도 동시 진행</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    문의하기
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>010-9251-9743</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>hongik423@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>평일 09:00 - 18:00</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 
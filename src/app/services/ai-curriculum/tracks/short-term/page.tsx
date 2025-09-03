'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Users, Award, BookOpen, ChevronRight, Zap, Target, Calendar, DollarSign } from 'lucide-react';

const shortTermCourses = [
  {
    id: 'ai-basics-1day',
    title: 'AI 기초 완성 1일 과정',
    duration: '8시간 (1일)',
    price: '150,000원',
    target: 'AI 입문자, 임원진',
    description: 'AI의 기본 개념부터 비즈니스 활용까지 하루만에 완성',
    highlights: [
      'AI 기본 개념 이해',
      'ChatGPT 실무 활용법',
      '업무 자동화 기초',
      '비즈니스 적용 사례'
    ],
    schedule: [
      '09:00-10:30 | AI 개념과 트렌드',
      '10:45-12:00 | ChatGPT 기초 실습',
      '13:00-14:30 | 업무 자동화 도구',
      '14:45-16:00 | 비즈니스 적용',
      '16:15-17:30 | 실습 및 Q&A'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'automation-2day',
    title: '업무 자동화 마스터 2일 과정',
    duration: '16시간 (2일)',
    price: '280,000원',
    target: '실무진, 팀장급',
    description: '반복 업무를 AI로 자동화하는 실무 중심 집중 교육',
    highlights: [
      'Excel/Google Sheets 자동화',
      '이메일 자동 응답 시스템',
      '문서 자동 생성',
      '데이터 분석 자동화'
    ],
    schedule: [
      '1일차: 자동화 도구 마스터',
      '2일차: 실무 프로젝트 완성'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'chatbot-3day',
    title: 'AI 챗봇 구축 3일 과정',
    duration: '24시간 (3일)',
    price: '420,000원',
    target: '개발자, 기획자',
    description: '코딩 없이 AI 챗봇을 구축하고 배포하는 실무 과정',
    highlights: [
      '챗봇 설계 및 기획',
      'No-Code 챗봇 구축',
      '고객 서비스 자동화',
      '성과 측정 및 개선'
    ],
    schedule: [
      '1일차: 챗봇 기획 및 설계',
      '2일차: 챗봇 구축 실습',
      '3일차: 배포 및 운영'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'data-analysis-2day',
    title: 'AI 데이터 분석 2일 과정',
    duration: '16시간 (2일)',
    price: '320,000원',
    target: '분석가, 마케터',
    description: 'AI를 활용한 데이터 분석과 인사이트 도출 집중 교육',
    highlights: [
      'AI 기반 데이터 분석',
      '자동 리포트 생성',
      '예측 분석 모델링',
      '시각화 자동화'
    ],
    schedule: [
      '1일차: AI 분석 도구 활용',
      '2일차: 실전 분석 프로젝트'
    ],
    color: 'from-orange-500 to-red-500'
  }
];

const benefits = [
  {
    icon: Clock,
    title: '빠른 학습',
    description: '단기간에 핵심 역량 습득'
  },
  {
    icon: Target,
    title: '실무 중심',
    description: '즉시 적용 가능한 실무 스킬'
  },
  {
    icon: Users,
    title: '소규모 클래스',
    description: '개인별 맞춤 지도'
  },
  {
    icon: Award,
    title: '수료증 발급',
    description: '공식 수료증 및 포트폴리오'
  }
];

export default function ShortTermCoursePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 섹션 */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
              🚀 단기 집중과정
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI 역량을
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
                빠르게 습득하세요
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              1-3일 단기 집중 교육으로
              <br className="hidden sm:block" />
              즉시 업무에 적용 가능한 AI 스킬을 완성하세요
            </p>
            
            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/consultation">
                  <BookOpen className="mr-2 h-5 w-5" />
                  단기과정 상담하기
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                asChild
              >
                <Link href="#courses">
                  과정 둘러보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            단기 집중과정의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 과정 목록 */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">단기 집중과정</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              목표와 일정에 맞는 최적의 단기 과정을 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shortTermCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="mb-2">
                      {course.duration}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{course.price}</div>
                      <div className="text-sm text-gray-500">1인 기준</div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-base">
                    <span className="font-medium text-gray-700">대상:</span> {course.target}
                  </CardDescription>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900">핵심 학습 내용</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900">일정</h4>
                    <div className="space-y-1">
                      {course.schedule.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" asChild>
                      <Link href="/consultation">
                        <BookOpen className="mr-2 h-4 w-4" />
                        상담 신청
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/services/ai-curriculum/tracks/${course.id}`}>
                        자세히 보기
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 특별 혜택 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">특별 혜택</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-xl">
                <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">조기 등록 할인</h3>
                <p className="text-gray-600">2주 전 등록 시 10% 할인</p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">단체 할인</h3>
                <p className="text-gray-600">3명 이상 등록 시 15% 할인</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">수료 혜택</h3>
                <p className="text-gray-600">수료증 + 1:1 멘토링 1회 제공</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 시작하세요
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            단기간에 AI 역량을 완성하고
            업무 생산성을 혁신적으로 향상시키세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/consultation">
                무료 상담 신청
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/services/ai-curriculum">
                <Zap className="mr-2 h-5 w-5" />
                전체 과정 보기
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>맞춤형 일정 조율</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>수료증 발급</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>소규모 클래스</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

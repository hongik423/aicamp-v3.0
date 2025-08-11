'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Sparkles,
  Play,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
  Building2,
  Globe,
  ArrowUp,
  Star,
  Trophy,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function SuccessCaseHeroSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 실시간 성과 지표
  const stats = [
    { label: '누적 성공사례벤치마크', value: 2487, suffix: '개', icon: Trophy },
    { label: '평균 생산성 향상', value: 47, suffix: '%', icon: TrendingUp },
    { label: '평균 비용 절감', value: 38, suffix: '%', icon: DollarSign },
    { label: '고객 만족도', value: 96, suffix: '%', icon: Star }
  ];

  // CEO 추천사 로테이션
  const testimonials = [
    {
      quote: "AI CAMP 덕분에 우리 회사가 완전히 달라졌습니다. 직원들이 AI를 자유자재로 활용하니 업무 효율이 3배는 올라간 것 같아요!",
      name: "김철수 대표",
      company: "스마트제조(주)",
      industry: "제조업",
      image: "🏭"
    },
    {
      quote: "n8n 자동화로 반복 업무가 사라지니 직원들이 창의적인 일에 집중할 수 있게 되었습니다. 정말 혁신적이에요!",
      name: "이영희 대표",
      company: "디지털금융",
      industry: "금융업",
      image: "💰"
    },
    {
      quote: "맞춤형 커리큘럼이 정말 인상적이었습니다. 우리 업종 특성을 완벽하게 이해하고 교육해주셔서 바로 적용 가능했어요.",
      name: "박민수 원장",
      company: "미래교육원",
      industry: "교육업",
      image: "🎓"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-20">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* 메인 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              대한민국 No.1 AI 교육
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                24개 업종별 AI 성공사례벤치마크
              </span>
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              당신의 업종에 최적화된 AI & n8n 커리큘럼으로<br />
              <span className="font-bold text-yellow-300">평균 3개월</span> 만에 달성한 놀라운 성과들
            </p>
          </motion.div>

          {/* 실시간 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <stat.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <div className="text-3xl font-bold text-gray-900">
                    <CountUp end={stat.value} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* CEO 추천사 캐러셀 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Card className="bg-gradient-to-r from-white to-blue-50 p-8 shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="text-4xl mr-4">{testimonials[activeTestimonial].image}</div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    {testimonials[activeTestimonial].industry}
                  </Badge>
                  <h3 className="font-bold text-lg">{testimonials[activeTestimonial].company}</h3>
                </div>
              </div>
              
              <blockquote className="text-lg text-gray-800 italic mb-4 min-h-[80px]">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              <div className="text-right text-gray-700">
                - {testimonials[activeTestimonial].name}
              </div>

              {/* 인디케이터 */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    title={`추천사 ${index + 1}번 보기`}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA 버튼 그룹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl">
              <Play className="w-5 h-5 mr-2" />
              성공사례벤치마크 영상 보기
            </Button>
            
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              <BarChart3 className="w-5 h-5 mr-2" />
              우리 회사 ROI 계산하기
            </Button>
            
            <Button size="lg" variant="ghost" className="px-8 py-6 text-lg text-white hover:bg-white/10 hover:text-white">
              <Target className="w-5 h-5 mr-2" />
              업종별 커리큘럼 보기
            </Button>
          </motion.div>

          {/* 추가 정보 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white"
          >
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              <span>대기업부터 스타트업까지</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <span>전국 2,487개 기업 참여</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>15,000명+ 수료생</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>정부 인증 교육기관</span>
            </div>
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </motion.div>
      </div>
    </section>
  );
}

// Tailwind 애니메이션 클래스 추가 (tailwind.config.js에 추가 필요)
const animationStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;



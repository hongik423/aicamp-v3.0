'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Star, 
  Target, 
  Zap, 
  BookOpen, 
  Download, 
  Award, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight,
  Cpu,
  Building2,
  Rocket,
  Crown,
  Coffee,
  MessageSquare
} from 'lucide-react';

const BookPromotionModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 애니메이션 단계
  const steps = [
    'intro',      // 초기 진입
    'highlight',  // 핵심 강조
    'benefits',   // 혜택 소개
    'cta'        // 행동 유도
  ];

  // 컴포넌트 마운트 후 2초 뒤 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 자동 진행 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 4000); // 4초마다 변경

    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        {/* 배경 오버레이 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />

        {/* 메인 모달 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            duration: 0.6 
          }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg"
            title="닫기"
            aria-label="모달 닫기"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* 좌측: 책 이미지 및 기본 정보 */}
            <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8 flex items-center justify-center overflow-hidden">
              {/* 배경 효과 */}
              <div className="absolute inset-0">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* 책 커버 시뮬레이션 */}
                <motion.div
                  initial={{ rotateY: -15, scale: 0.9 }}
                  animate={{ rotateY: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="w-80 h-96 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl relative overflow-hidden transform perspective-1000"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                  }}
                >
                  {/* 책 표지 내용 */}
                  <div className="p-6 h-full flex flex-col relative">
                    {/* 상단 제목 */}
                    <div className="text-center mb-6">
                      <div className="text-yellow-300 text-2xl font-bold mb-2">AI 자동화의 끝판왕!</div>
                      <div className="text-white text-xl font-semibold">n8n을 활용한 업무혁신</div>
                    </div>

                    {/* 중앙 워크플로우 다이어그램 */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-white text-sm mb-4 text-center">
                        Flexible AI workflow automation<br />
                        for technical teams
                      </div>
                      
                      {/* 워크플로우 노드들 */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-purple-600 rounded p-2 text-xs text-white text-center">IT Ops</div>
                        <div className="bg-purple-600 rounded p-2 text-xs text-white text-center">Sec Ops</div>
                        <div className="bg-purple-600 rounded p-2 text-xs text-white text-center">Dev Ops</div>
                        <div className="bg-purple-600 rounded p-2 text-xs text-white text-center">Sales</div>
                      </div>
                      
                      {/* 중앙 플로우 */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">1</div>
                        <ArrowRight className="w-3 h-3 text-white" />
                        <div className="w-16 h-6 bg-gray-700 rounded flex items-center justify-center text-white text-xs">AI Agent</div>
                        <ArrowRight className="w-3 h-3 text-white" />
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">+</div>
                      </div>
                    </div>

                    {/* 하단 저자 정보 */}
                    <div className="text-center">
                      <div className="text-white text-sm font-bold mb-2">부크크 📚 공동저자</div>
                      <div className="text-yellow-300 text-xs">홍용기 · 이후경 · 홍정민</div>
                    </div>
                  </div>

                  {/* 국내최초 뱃지 */}
                  <div className="absolute top-4 right-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-900">국내최초</div>
                        <div className="text-xs font-bold text-gray-900">한국어판</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 기본 정보 */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <div className="flex justify-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      🔥 신간출간
                    </div>
                    <div className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      🏆 국내최초
                    </div>
                    <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      ⚡ 실무직결
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 우측: 동적 컨텐츠 영역 */}
            <div className="p-8 bg-white flex flex-col justify-center relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {/* Step 1: 소개 */}
                {currentStep === 0 && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-600 font-semibold">AI CAMP 신간 출간</div>
                        <div className="text-2xl font-bold text-gray-900">업무혁신의 게임체인저</div>
                      </div>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AI 자동화로<br />
                        일하는 방식을 혁신하세요
                      </span>
                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed">
                      <strong className="text-blue-600">AI CAMP 전문가들이 직접 집필한</strong> 국내 최초 n8n 한글 가이드북으로 
                      <strong className="text-purple-600"> 반복 업무에서 해방</strong>되어 창조적인 일에 집중하세요.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>3인 전문가 공저</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>국내최초 한글판</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>실무 즉시 적용</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: 핵심 강조 */}
                {currentStep === 1 && (
                  <motion.div
                    key="highlight"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="text-lg text-purple-600 font-semibold mb-2">왜 n8n인가?</div>
                      <h2 className="text-3xl font-bold text-gray-900">AI CAMP가 선택한 이유</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: Zap, title: "업무 효율성 300% 향상", desc: "반복 작업 완전 자동화", color: "text-yellow-600 bg-yellow-50" },
                        { icon: Cpu, title: "AI Agent 구축", desc: "ChatGPT 연동 지능형 봇", color: "text-blue-600 bg-blue-50" },
                        { icon: Building2, title: "정부지원사업 연계", desc: "AI 도입 지원금 활용", color: "text-green-600 bg-green-50" },
                        { icon: Clock, title: "시간 절약 혁신", desc: "일일 2-3시간 업무 단축", color: "text-purple-600 bg-purple-50" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-xl ${item.color.split(' ')[1]} border border-gray-100`}
                        >
                          <item.icon className={`w-6 h-6 ${item.color.split(' ')[0]} mb-3`} />
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: 혜택 소개 */}
                {currentStep === 2 && (
                  <motion.div
                    key="benefits"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="text-lg text-green-600 font-semibold mb-2">특별 혜택</div>
                      <h2 className="text-3xl font-bold text-gray-900">AI CAMP + n8n 시너지</h2>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          icon: BookOpen, 
                          title: "📖 책 구매 시 AI CAMP 특별 혜택",
                          desc: "• 무료 AI 진단 + 전문가 상담 (30만원 상당)\n• n8n 구축 컨설팅 20% 할인\n• AI 자동화 워크샵 우선 참여"
                        },
                        { 
                          icon: Rocket, 
                          title: "🚀 AI CAMP 서비스 연계 패키지",
                          desc: "• 정책자금 + AI 도입 통합 컨설팅\n• 사업분석 + 업무자동화 설계\n• 기술창업 + n8n 시스템 구축"
                        },
                        { 
                          icon: Crown, 
                          title: "👑 VIP 고객 전용 혜택",
                          desc: "• 이후경 경영지도사 직접 멘토링\n• AI CAMP 모든 서비스 20% 할인\n• 월 1회 무료 기술 상담"
                        }
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-gray-100"
                        >
                          <benefit.icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{benefit.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: 행동 유도 */}
                {currentStep === 3 && (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="text-center space-y-6"
                  >
                    <div className="mb-6">
                      <div className="text-lg text-orange-600 font-semibold mb-2">지금 바로 시작하세요!</div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          한정 특가 + 특별 혜택
                        </span>
                      </h2>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
                        <Clock className="w-4 h-4" />
                        <span>출간 기념 할인 - 30일 한정</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-bold text-blue-900 mb-2">책 단독 구매</h3>
                        <div className="text-2xl font-bold text-blue-600 mb-2">29,000원</div>
                        <div className="text-sm text-blue-700">• 국내최초 n8n 한글 가이드<br />• 실무 적용 템플릿 제공</div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            추천!
                          </div>
                        </div>
                        <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-bold text-purple-900 mb-2">AI CAMP 패키지</h3>
                        <div className="text-2xl font-bold text-purple-600 mb-2">99,000원</div>
                        <div className="text-sm text-purple-700">• 책 + AI 진단 + 전문가 상담<br />• 총 50만원 상당 혜택</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href="https://bookk.co.kr/book/view/112574"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>책 바로 구매하기</span>
                      </a>
                      
                      <Link href="/services/ai-productivity" className="flex-1">
                        <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          <span>AI CAMP 상담하기</span>
                        </button>
                      </Link>
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>무료 배송</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>즉시 다운로드</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>평생 업데이트</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 진행 상태 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'bg-blue-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookPromotionModal; 
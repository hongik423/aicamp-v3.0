'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ArrowRight, CheckCircle, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const BookPromotionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => setIsVisible(false);
  const handleMinimize = () => setIsMinimized(true);
  const handleRestore = () => {
    setIsMinimized(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isMinimized) {
          handleMinimize();
        }
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, isMinimized]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isMinimized ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md pointer-events-auto"
            onClick={handleMinimize}
          />
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full pointer-events-auto"
          >
            <Card className="w-full max-w-6xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden border">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative p-6 sm:p-8 flex items-center justify-center bg-gray-50">
                  <Link href="/n8n_1-20.pdf" passHref target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="relative w-full max-w-[280px] sm:max-w-xs h-96 sm:h-[26rem] mx-auto rounded-lg shadow-xl overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src="/images/book_1_cover.JPG"
                        alt="AI 자동화 n8n 워크플로우 북커버"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white">
                        <BookOpen className="w-10 h-10 mr-3" /> PDF 맛보기
                      </div>
                    </motion.div>
                  </Link>
                </div>
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-4 md:mb-6">
                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
                      <span className="block text-blue-600">Step 1: n8n으로 자동화 마스터</span>
                      <span className="block text-green-600 mt-2">Step 2: AI Camp에서 전문가 되기</span>
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg text-gray-600 mt-4">
                      책으로 실무 자동화 기술을 익히는 것은 시작일 뿐입니다. AI Camp의 전문 교육을 통해 기술을 비즈니스 성과로 연결하는 기획력과 문제 해결 능력을 갖춘 전문가로 성장하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg border">
                      <h3 className="font-semibold text-lg md:text-xl mb-2 text-blue-700">AI Camp 교육이 필요한 이유!</h3>
                      <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                        <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>단순 업무 자동화를 넘어, AI 전문가로 커리어를 전환하고 싶으신 분</span></li>
                        <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>AI 기술을 활용해 비즈니스의 핵심 문제를 해결하고 싶으신 분</span></li>
                        <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>체계적인 프로젝트 경험과 전문가의 멘토링이 필요하신 분</span></li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                      <Link href="/consultation" passHref>
                        <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg py-4 sm:py-6">
                          <Rocket className="w-5 h-5 mr-2" />
                          AI Camp 전문가 상담
                        </Button>
                      </Link>
                      <Link href="/diagnosis" passHref>
                        <Button size="lg" variant="outline" className="w-full font-bold text-base sm:text-lg py-4 sm:py-6">
                          내게 맞는 AI 진단받기
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </div>
              <button onClick={handleClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-800 transition-colors" aria-label="닫기">
                <X size={28} />
              </button>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <button
            onClick={handleRestore}
            className="w-20 h-28 sm:w-24 sm:h-32 bg-transparent rounded-lg shadow-lg group"
            aria-label="책자 배너 다시 열기"
          >
            <Image
              src="/images/book_1_cover.JPG"
              alt="책 표지"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
               <BookOpen size={32} className="text-white"/>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookPromotionBanner;
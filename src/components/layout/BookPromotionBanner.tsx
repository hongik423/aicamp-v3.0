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
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);
  const handleMinimize = () => setIsMinimized(true);
  const handleRestore = () => setIsMinimized(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isVisible && !isMinimized) {
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
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={handleClose}
          />
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="pointer-events-auto"
          >
            <Card className="w-full max-w-4xl bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden m-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative p-6 flex items-center justify-center bg-gray-100/50">
                  <Link href="/n8n_1-20.pdf" passHref target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="relative w-64 h-96 mx-auto rounded-lg shadow-xl overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src="/images/book_1_cover.JPG"
                        alt="AI 자동화 n8n 워크플로우 북커버"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white">
                        <BookOpen className="w-8 h-8 mr-2" /> PDF 보기
                      </div>
                    </motion.div>
                  </Link>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-3xl font-extrabold text-gray-800 leading-tight">
                      <span className="text-blue-600">n8n 자동화</span>로 실무를 혁신하고, <br />
                      <span className="text-green-600">AI Camp</span>에서 전문가로 거듭나세요!
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-3">
                      단순 반복 업무는 이제 그만! 코딩 없이 가능한 n8n 워크플로우 자동화 기술을 배우고, AI Camp의 체계적인 교육을 통해 비즈니스 가치를 창출하는 핵심 인재가 될 수 있습니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span><strong>'n8n 워크플로우' 책:</strong> 지금 바로 적용 가능한 실무 자동화 스킬을 습득합니다.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span><strong>'AI Camp' 교육:</strong> 자동화 기술을 넘어, AI 비즈니스 전략과 기획 역량을 완성합니다.</span>
                      </li>
                    </ul>
                    <div className="space-y-4 pt-4">
                      <Link href="/consultation" passHref>
                        <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg">
                          <Rocket className="w-5 h-5 mr-2" />
                          책 + AI CAMP 패키지 상담신청
                        </Button>
                      </Link>
                      <Link href="/diagnosis" passHref>
                        <Button size="lg" variant="outline" className="w-full font-bold text-lg">
                          무료 AI 진단 먼저 받기
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </div>
              <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors" aria-label="닫기">
                <X size={24} />
              </button>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={handleRestore}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg z-[99999] flex items-center justify-center pointer-events-auto hover:bg-blue-700 transition-transform hover:scale-110"
          aria-label="책자 배너 다시 열기"
        >
          <BookOpen size={32} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BookPromotionBanner;
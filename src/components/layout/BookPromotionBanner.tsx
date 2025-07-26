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
                      AI 자동화, n8n으로 시작하세요!
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-2">
                      AI CAMP의 교육과정과 n8n 자동화 워크플로우를 결합하여 비즈니스 효율을 극대화하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>코딩 없이 만드는 강력한 자동화 워크플로우</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>AI CAMP 전문가의 체계적인 교육 지원</span>
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
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

const BookPromotionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    if (isVisible) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || isMinimized) return;
    const autoMinimizeTimer = setTimeout(() => setIsMinimized(true), 10000);
    return () => clearTimeout(autoMinimizeTimer);
  }, [isVisible, isMinimized]);


  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && !isMinimized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md pointer-events-auto"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto m-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative p-6 flex items-center justify-center bg-gray-100">
                <a href="/n8n_1-20.pdf" target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-64 h-80 mx-auto rounded-lg shadow-lg overflow-hidden"
                  >
                    <img src="/images/book_1_cover.JPG" alt="책표지" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 text-white">
                      <BookOpen className="w-8 h-8 mr-2" /> PDF 보기
                    </div>
                  </motion.div>
                </a>
              </div>
              <div className="p-8 flex flex-col justify-center space-y-6">
                <h2 className="text-2xl font-bold">AI 자동화, 이제는 선택이 아닌 필수!</h2>
                <p className="text-gray-600">
                  AI CAMP의 전문 지식과 n8n의 강력한 자동화 기능을 결합하여 여러분의 비즈니스를 혁신하세요.
                </p>
                <div className="space-y-4">
                  <Link href="/consultation" passHref>
                    <a className="block w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                      책 + AI CAMP 패키지 상담신청
                    </a>
                  </Link>
                  <Link href="/diagnosis" passHref>
                    <a className="block w-full text-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                      무료 AI 진단 먼저 받기
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" aria-label="닫기">
              <X size={24} />
            </button>
            <button onClick={() => setIsMinimized(true)} className="absolute top-4 right-14 text-gray-500 hover:text-gray-800" aria-label="최소화">
              <div className="w-6 h-1 bg-current rounded-full" />
            </button>
          </motion.div>
        </motion.div>
      )}
      {isMinimized && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg z-[99999] flex items-center justify-center pointer-events-auto"
          aria-label="책자 배너 다시 열기"
        >
          <BookOpen size={32} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BookPromotionBanner;
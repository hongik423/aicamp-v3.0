'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Youtube, Instagram, Sparkles } from 'lucide-react';
import { getImagePath, getLogoPath } from '@/lib/utils';

export default function Footer() {
  // 안전한 스크롤 핸들러
  const handleScrollToDiagnosis = () => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        const diagnosisSection = document.getElementById('ai-diagnosis');
        diagnosisSection?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#ai-diagnosis';
      }
    }
  };

  return (
    <footer className="bg-aicamp-navy dark:bg-aicamp-navy-dark text-white py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 회사 정보 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src={getImagePath('/images/aicamp_logo_del_250726.png')}
                  alt="AICAMP" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">AI CAMP</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              AI 기반 비즈니스 혁신을 위한 <br />
              전문 컨설팅 서비스
            </p>
            <div className="text-white text-xs leading-relaxed mt-3">
              <p className="font-medium text-white mb-1">본사 주소</p>
              <p className="text-white">서울 금천구 서부샛길 606</p>
              <p className="text-white">대성디폴리스 지식산업센터</p>
              <p className="text-white">A동 14층 1408-3호</p>
            </div>
                         <div className="flex space-x-4">
               <button 
                 className="text-gray-300 hover:text-white transition-colors"
                 aria-label="이메일 문의"
               >
                 <Mail className="w-5 h-5" />
               </button>
               <button 
                 className="text-gray-300 hover:text-white transition-colors"
                 aria-label="전화 문의"
               >
                 <Phone className="w-5 h-5" />
               </button>
             </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">회사 소개</a></li>
              <li><a href="/services" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">서비스</a></li>
              <li><a href="/cases" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">성공 사례</a></li>
              <li><a href="/consultation" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">상담 신청</a></li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">고객 지원</h3>
            <ul className="space-y-2">
              <li><a href="/support/faq" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="/support/contact" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">문의하기</a></li>
              <li><a href="/support/notices" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">공지사항</a></li>
              <li><a href="/support/downloads" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">자료실</a></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">연락처</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300 dark:text-gray-400">
                이메일: hongik423@gmail.com
              </p>
              <p className="text-gray-300 dark:text-gray-400">
                전화: 010-9251-9743
              </p>
              <p className="text-gray-300 dark:text-gray-400">
                운영시간: 평일 09:00 - 18:00
              </p>
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 저작권 */}
        <div className="border-t border-gray-600 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              © 2024 AI CAMP. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors">
                개인정보처리방침
              </a>
              <a href="/terms" className="text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
'use client';

import React from 'react';
import Image from 'next/image';

export const ValueProposition: React.FC = () => {
  const values = [
    {
      title: 'AI 기반 정밀 분석',
      description: '최신 AI 기술로 8개 섹션 종합 진단',
      icon: '🤖'
    },
    {
      title: '맞춤형 전략 수립', 
      description: 'SWOT 분석 기반 실행 가능한 전략',
      icon: '🎯'
    },
    {
      title: '즉시 결과 제공',
      description: '5-10분 내 전문가 수준 보고서',
      icon: '⚡'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
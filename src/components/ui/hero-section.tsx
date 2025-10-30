'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getBenchmarkImage } from '@/lib/benchmark-images';

interface StatCard {
  value?: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: string;
}

interface HeroSectionProps {
  badge?: {
    icon: React.ComponentType<any>;
    text: string;
  };
  title: string;
  subtitle?: string;
  description: string;
  stats: StatCard[];
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundPattern?: boolean;
  backgroundImageUrl?: string; // 없으면 자동 seed 기반 picsum 사용
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  description,
  stats,
  primaryCTA,
  secondaryCTA,
  backgroundPattern = true,
  backgroundImageUrl
}) => {
  const router = useRouter();
  // 네비게이션 항목별 히어로: benchmark 폴더 이미지를 우선 사용
  const bgUrl = backgroundImageUrl || getBenchmarkImage(subtitle || title);

  // 이모지 제거 유틸리티 (모든 페이지의 히어로 텍스트에서 이모지 제거)
  const sanitize = (v?: string) => {
    if (!v) return '';
    // 광범위한 이모지 유니코드 블록 제거
    return v.replace(/[\u{1F300}-\u{1FAFF}\u{1F900}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
            .replace(/\s{2,}/g, ' ') // 연속 공백 정리
            .trim();
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
      {/* 배경 이미지 + 오버레이 (언제나 표시) */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgUrl}
          alt="배경"
          className="w-full h-full object-cover scale-105"
        />
        {/* 컬러 그라디언트 오버랩 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 mix-blend-multiply"></div>
        {/* 상단 글로우 + 비네트 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40"></div>
        {/* 노이즈 텍스처 */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{backgroundImage:"url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 40 40%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.05%27%3E%3Ccircle cx=%272%27 cy=%272%27 r=%271%27/%3E%3Ccircle cx=%2720%27 cy=%2715%27 r=%271%27/%3E%3Ccircle cx=%2732%27 cy=%2728%27 r=%271%27/%3E%3C/g%3E%3C/svg%3E')", backgroundSize:'160px 160px'}}></div>
      </div>
      {backgroundPattern && (
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl text-center px-4 md:px-8 py-10"
          >
            {badge && (
              <div className="mb-6 flex justify-center">
                <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20">
                  <badge.icon className="w-4 h-4 mr-2" />
                  {sanitize(badge.text)}
                </Badge>
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>
              {sanitize(title)}
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-blue-100 mb-2">{sanitize(subtitle)}</p>
            )}

            <p className="text-base md:text-lg text-blue-100/90 mb-8 max-w-3xl mx-auto leading-relaxed"
               style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
              {sanitize(description)}
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => router.push(primaryCTA.href)}
                className="bg-white text-slate-900 hover:bg-slate-100 text-base md:text-lg px-8 py-4 rounded-full shadow-2xl"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {secondaryCTA && (
                <Button 
                  variant="outline"
                  onClick={() => router.push(secondaryCTA.href)}
                  className="border-white/30 text-white hover:bg-white/10 text-base md:text-lg px-8 py-4 rounded-full"
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>

            {/* 하단 특징(간단형 표시) */}
            {stats?.length > 0 && (
              <div className="grid grid-cols-3 gap-4 md:gap-8 text-blue-200">
                {stats.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex items-center justify-center gap-2">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <span className="text-sm md:text-base">{sanitize(s.label)}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
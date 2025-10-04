'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StatCard {
  value: string;
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
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  description,
  stats,
  primaryCTA,
  secondaryCTA,
  backgroundPattern = true
}) => {
  const router = useRouter();

  return (
    <section className="relative pt-20 pb-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {backgroundPattern && (
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {badge && (
              <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 mb-6">
                <badge.icon className="w-4 h-4 mr-2" />
                {badge.text}
              </Badge>
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {subtitle && (
                <>
                  {subtitle}
                  <br />
                </>
              )}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* 성과 지표 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className="absolute top-3 right-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200 font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-300 mb-3">
                  {stat.description}
                </div>
                {stat.trend && (
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400 font-semibold">
                      {stat.trend}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={() => router.push(primaryCTA.href)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg px-8 py-4 rounded-full shadow-2xl"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            {secondaryCTA && (
              <Button 
                variant="outline"
                onClick={() => router.push(secondaryCTA.href)}
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full"
              >
                {secondaryCTA.text}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Target, CheckCircle, Clock, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ScoreGuideModalProps {
  isVisible: boolean;
  onClose: () => void;
  onStart: () => void;
}

const ScoreGuideModal: React.FC<ScoreGuideModalProps> = ({
  isVisible,
  onClose,
  onStart
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAutoClosing, setIsAutoClosing] = useState(false);

  // 30초 카운트다운
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsAutoClosing(true);
          setTimeout(() => {
            onClose();
            onStart();
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, onClose, onStart]);

  // 수동 시작 핸들러
  const handleManualStart = () => {
    setIsAutoClosing(true);
    setTimeout(() => {
      onClose();
      onStart();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">🎯 AI 역량진단 점수체계 안내</h2>
                  <p className="text-blue-100">정확한 평가를 위한 행동지표 가이드</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-bold">{timeLeft}초</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleManualStart}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="px-6 py-3 bg-gray-50 border-b">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>자동 시작까지</span>
              <span>{Math.round(((30 - timeLeft) / 30) * 100)}%</span>
            </div>
            <Progress value={((30 - timeLeft) / 30) * 100} className="h-2" />
          </div>

          {/* 메인 콘텐츠 */}
          <div className="p-6 space-y-6">
            {/* 점수체계 설명 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  5점 척도 평가 체계
                </h3>
                <div className="space-y-3">
                  {[
                    { score: 5, label: "매우 그렇다", color: "bg-green-100 border-green-300", icon: Star },
                    { score: 4, label: "그렇다", color: "bg-blue-100 border-blue-300", icon: TrendingUp },
                    { score: 3, label: "보통이다", color: "bg-yellow-100 border-yellow-300", icon: CheckCircle },
                    { score: 2, label: "그렇지 않다", color: "bg-orange-100 border-orange-300", icon: Users },
                    { score: 1, label: "전혀 그렇지 않다", color: "bg-red-100 border-red-300", icon: Zap }
                  ].map((item) => (
                    <div key={item.score} className={`flex items-center gap-3 p-3 rounded-lg border ${item.color}`}>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-700">
                        {item.score}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">현재 상황에 가장 적합한 수준</div>
                      </div>
                      <item.icon className="w-5 h-5 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  행동지표 평가 가이드
                </h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">📋 평가 방법</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• 각 질문을 신중히 읽고 현재 상황을 정확히 파악하세요</li>
                      <li>• 객관적이고 솔직한 답변이 정확한 진단의 핵심입니다</li>
                      <li>• 점수 선택 시 자동으로 다음 질문으로 이동됩니다</li>
                      <li>• 모든 문항 완료 후 맥킨지 스타일 보고서가 생성됩니다</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🎯 평가 기준</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>5점:</strong> 업계 최고 수준, 혁신적 선도</li>
                      <li>• <strong>4점:</strong> 체계적 도입, 전략적 실행</li>
                      <li>• <strong>3점:</strong> 부분적 활용, 기초 운영</li>
                      <li>• <strong>2점:</strong> 계획 단계, 준비 중</li>
                      <li>• <strong>1점:</strong> 미실행 상태, 인식 부족</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">✅ 평가 완료 후</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• 45문항 종합 분석 및 점수 산출</li>
                      <li>• 업종별 벤치마크 비교 분석</li>
                      <li>• 맞춤형 AI 프로그램 추천</li>
                      <li>• 실무 적용 가능한 개선 로드맵</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 주의사항 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                ⚠️ 중요 안내사항
              </h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <p>• <strong>정확한 진단</strong>을 위해 모든 문항에 솔직한 답변이 필요합니다</p>
                <p>• 진행 상황은 자동으로 저장되므로 중간에 중단해도 안전합니다</p>
                <p>• 진단 완료 후 이메일로 상세한 분석 보고서가 발송됩니다</p>
                <p>• 평가 시간은 약 10-15분 정도 소요됩니다</p>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">이교장의AI역량진단보고서 V15.0</span>
              <span className="mx-2">•</span>
              <span>맥킨지 스타일 종합 분석</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleManualStart}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                지금 시작하기
              </Button>
              <Button
                onClick={handleManualStart}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                AI 역량진단 시작
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScoreGuideModal;

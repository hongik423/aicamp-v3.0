'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

interface DiagnosisReportBannerProps {
  reportData: {
    submissionId: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    timestamp: string;
    scores?: {
      total: number;
      level: string;
      currentAI: number;
      readiness: number;
      infrastructure: number;
      goals: number;
      implementation: number;
    };
    htmlReport?: string;
  };
  onConsultationRequest?: () => void;
  onDownloadReport?: () => void;
}

export default function DiagnosisReportBanner({ 
  reportData, 
  onConsultationRequest, 
  onDownloadReport 
}: DiagnosisReportBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getLevelBadgeColor = (level: string) => {
    if (level.includes('고도화')) return 'bg-green-500';
    if (level.includes('중급')) return 'bg-blue-500';
    if (level.includes('기초')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 shadow-2xl">
            <CardContent className="p-0">
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Brain className="w-12 h-12" />
                    <h1 className="text-4xl font-bold">AI 역량진단 완료!</h1>
                  </div>
                  <p className="text-xl opacity-90 mb-2">
                    {reportData.companyName}의 맞춤형 분석 보고서가 준비되었습니다
                  </p>
                  <p className="text-sm opacity-75">
                    진단 ID: {reportData.submissionId} | {new Date(reportData.timestamp).toLocaleDateString('ko-KR')}
                  </p>
                </div>

                {/* 닫기 버튼 */}
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                  title="보고서 닫기"
                  aria-label="보고서 닫기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 점수 대시보드 */}
              {reportData.scores && (
                <div className="p-6 bg-white">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    📊 AI 역량 진단 점수
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {/* 전체 점수 */}
                    <div className="md:col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl text-center">
                      <h3 className="text-lg font-semibold mb-2">전체 점수</h3>
                      <div className="text-4xl font-bold mb-2">{reportData.scores.total}</div>
                      <div className="text-sm opacity-90">/ 100점</div>
                      <Badge className={`mt-2 ${getLevelBadgeColor(reportData.scores.level)} text-white`}>
                        {reportData.scores.level}
                      </Badge>
                    </div>

                    {/* 세부 점수들 */}
                    {[
                      { label: '현재 AI 활용', score: reportData.scores.currentAI, icon: <Zap className="w-5 h-5" /> },
                      { label: '조직 준비도', score: reportData.scores.readiness, icon: <Target className="w-5 h-5" /> },
                      { label: '기술 인프라', score: reportData.scores.infrastructure, icon: <CheckCircle className="w-5 h-5" /> },
                      { label: '목표 명확성', score: reportData.scores.goals, icon: <Star className="w-5 h-5" /> },
                      { label: '실행 역량', score: reportData.scores.implementation, icon: <TrendingUp className="w-5 h-5" /> }
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg border-2 text-center ${getScoreColor(item.score)}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {item.icon}
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <div className="text-2xl font-bold">{item.score}</div>
                        <div className="text-xs opacity-70">/ 100</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 액션 버튼들 */}
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={onConsultationRequest}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    무료 전략 상담 신청
                  </Button>
                  
                  <Button
                    onClick={onDownloadReport}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    HTML 보고서 다운로드
                  </Button>
                  
                  <Button
                    onClick={() => setShowFullReport(!showFullReport)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className={`w-5 h-5 transition-transform ${showFullReport ? 'rotate-90' : ''}`} />
                    {showFullReport ? '보고서 접기' : '상세 보고서 보기'}
                  </Button>
                </div>
              </div>

              {/* HTML 보고서 전체 내용 */}
              <AnimatePresence>
                {showFullReport && reportData.htmlReport && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t">
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: reportData.htmlReport }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 푸터 */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
                <h3 className="text-lg font-semibold mb-2">🎓 AICAMP - AI 전문 교육 및 컨설팅</h3>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{reportData.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>문의: admin@aicamp.club</span>
                  </div>
                </div>
                <p className="text-xs mt-2 opacity-75">
                  본 보고서는 GEMINI 2.5 FLASH AI 분석 엔진을 통해 생성되었습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

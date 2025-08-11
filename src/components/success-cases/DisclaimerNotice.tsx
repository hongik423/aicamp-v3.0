'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Scale,
  FileText,
  Target,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DisclaimerNotice() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* 메인 고지사항 */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-amber-800 text-lg">중요 고지사항</CardTitle>
              <p className="text-amber-700 text-sm">성공사례 벤치마크 및 기대효과 안내</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">
                  본 성공사례는 업종별 성공사례 벤치마크를 대상으로 한 것입니다
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  표시된 모든 성과 지표와 ROI는 AI CAMP와 함께 성공적으로 교육을 완료했을 때 
                  <span className="font-semibold text-blue-600"> 기대할 수 있는 성공 사례</span>입니다. 
                  실제 결과는 기업의 규모, 업종 특성, 구현 노력도, 기존 시스템 환경 등에 따라 달라질 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 핵심 포인트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Target className="w-4 h-4 text-green-600" />
              <span>업종별 맞춤 벤치마크 기준</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>성공적 완주 시 기대효과</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>3-6개월 교육과정 완료 기준</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Users className="w-4 h-4 text-orange-600" />
              <span>조직 전체 참여 시 최적 효과</span>
            </div>
          </div>

          {/* 상세 정보 토글 */}
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between text-amber-700 hover:bg-amber-100"
          >
            <span>상세 고지사항 보기</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {/* 확장된 상세 정보 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Scale className="w-4 h-4 mr-2 text-blue-600" />
                      성공사례 기준 및 조건
                    </h4>
                    
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="border-l-4 border-blue-200 pl-4">
                        <h5 className="font-semibold text-blue-800 mb-1">1. 벤치마크 기준</h5>
                        <ul className="space-y-1 list-disc list-inside ml-2">
                          <li>업종별 상위 20% 성과 달성 기업 기준</li>
                          <li>AI CAMP 전체 교육과정 완료 기업 대상</li>
                          <li>교육 후 6개월 이상 지속 운영 기업</li>
                          <li>조직 구성원 80% 이상 참여 기업</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-200 pl-4">
                        <h5 className="font-semibold text-green-800 mb-1">2. 성공 조건</h5>
                        <ul className="space-y-1 list-disc list-inside ml-2">
                          <li>경영진의 적극적인 지원과 참여</li>
                          <li>단계별 교육과정 100% 이수</li>
                          <li>실무 프로젝트 완료 및 실제 적용</li>
                          <li>지속적인 AI 도구 활용 및 개선</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-amber-200 pl-4">
                        <h5 className="font-semibold text-amber-800 mb-1">3. 변수 요인</h5>
                        <ul className="space-y-1 list-disc list-inside ml-2">
                          <li>기업 규모 및 조직 구조</li>
                          <li>기존 디지털 인프라 수준</li>
                          <li>업종별 시장 환경 변화</li>
                          <li>구성원의 학습 의지 및 참여도</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-purple-200 pl-4">
                        <h5 className="font-semibold text-purple-800 mb-1">4. 측정 방법</h5>
                        <ul className="space-y-1 list-disc list-inside ml-2">
                          <li>교육 전후 KPI 비교 분석</li>
                          <li>정량적 지표: 생산성, 비용, 시간, 품질</li>
                          <li>정성적 지표: 만족도, 역량, 문화 변화</li>
                          <li>제3자 검증기관 객관적 평가</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mt-4">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <FileText className="w-3 h-3 inline mr-1" />
                        본 고지사항은 공정거래위원회 표시광고법에 따라 고객에게 정확한 정보를 제공하기 위함입니다. 
                        개별 기업의 구체적인 성과 예측을 위해서는 무료 진단 상담을 받아보시기 바랍니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* 간단한 요약 배지 */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Info className="w-3 h-3 mr-1" />
          성공 벤치마크 기준
        </Badge>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <TrendingUp className="w-3 h-3 mr-1" />
          교육 완료 시 기대효과
        </Badge>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          개별 결과 차이 가능
        </Badge>
      </div>
    </div>
  );
}

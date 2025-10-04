'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Percent, 
  Activity,
  Target,
  Award,
  AlertCircle,
  BarChart3,
  TrendingDown
} from 'lucide-react';
import { InvestmentResult, InvestmentGrade } from '@/types/investment.types';
import { getInvestmentScaleInfo, getDynamicGradingCriteria } from '@/lib/utils/investment-grade';

interface InvestmentScoreBreakdownProps {
  result: InvestmentResult;
  grade: InvestmentGrade;
  initialInvestment: number;
}

export default function InvestmentScoreBreakdown({ 
  result, 
  grade, 
  initialInvestment 
}: InvestmentScoreBreakdownProps) {
  const scaleInfo = getInvestmentScaleInfo(initialInvestment);
  const criteria = getDynamicGradingCriteria(scaleInfo.scale);
  
  const formatCurrency = (value: number): string => {
    const billion = Math.abs(value) / 100000000;
    if (billion >= 1) {
      return `${value < 0 ? '-' : ''}${billion.toFixed(1)}억원`;
    }
    const million = Math.abs(value) / 10000000;
    return `${value < 0 ? '-' : ''}${million.toFixed(0)}천만원`;
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const formatYears = (value: number): string => {
    return `${value.toFixed(1)}년`;
  };

  // 실제 값들 계산
  const npvInBillion = result.npv / 100000000;
  const avgDSCR = result.dscrData ? 
    (result.dscrData.reduce((sum, d) => sum + d.dscr, 0) / result.dscrData.length) : 0;

  // 지표별 분석 데이터
  const metricAnalysis = [
    {
      name: 'NPV (순현재가치)',
      icon: DollarSign,
      actualValue: formatCurrency(result.npv),
      actualScore: grade.details.npvScore,
      weight: criteria.npv.weight,
      ranges: criteria.npv.ranges,
      currentValue: npvInBillion,
      unit: '억원',
      color: grade.details.npvScore >= 60 ? 'text-green-600' : 'text-red-600',
      bgColor: grade.details.npvScore >= 60 ? 'bg-green-50' : 'bg-red-50',
      description: '투자로 인한 순가치 증가분'
    },
    {
      name: 'IRR (내부수익률)',
      icon: Percent,
      actualValue: formatPercent(result.irr),
      actualScore: grade.details.irrScore,
      weight: criteria.irr.weight,
      ranges: criteria.irr.ranges,
      currentValue: result.irr,
      unit: '%',
      color: grade.details.irrScore >= 60 ? 'text-green-600' : 'text-red-600',
      bgColor: grade.details.irrScore >= 60 ? 'bg-green-50' : 'bg-red-50',
      description: '연간 수익률 (할인율 대비)'
    },
    {
      name: 'DSCR (부채상환능력)',
      icon: Activity,
      actualValue: avgDSCR.toFixed(2),
      actualScore: grade.details.dscrScore,
      weight: criteria.dscr.weight,
      ranges: criteria.dscr.ranges,
      currentValue: avgDSCR,
      unit: '배',
      color: grade.details.dscrScore >= 60 ? 'text-green-600' : 'text-red-600',
      bgColor: grade.details.dscrScore >= 60 ? 'bg-green-50' : 'bg-red-50',
      description: '부채상환 안정성 지표'
    },
    {
      name: '투자회수기간',
      icon: Calendar,
      actualValue: formatYears(result.paybackPeriod),
      actualScore: grade.details.paybackScore,
      weight: criteria.payback.weight,
      ranges: criteria.payback.ranges,
      currentValue: result.paybackPeriod,
      unit: '년',
      color: grade.details.paybackScore >= 60 ? 'text-green-600' : 'text-red-600',
      bgColor: grade.details.paybackScore >= 60 ? 'bg-green-50' : 'bg-red-50',
      description: '투자금 회수 소요 기간'
    }
  ];

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return '탁월';
    if (score >= 70) return '우수';
    if (score >= 50) return '양호';
    if (score >= 30) return '보통';
    return '미흡';
  };

  return (
    <div className="space-y-6">
      {/* 5구간 투자규모별 평가 기준 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {scaleInfo.description} 평가 기준
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 투자규모 정보 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">투자규모별 특성</span>
                <Badge variant="outline">
                  리스크 프리미엄: {(scaleInfo.riskPremium * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-gray-600">최소 IRR</div>
                  <div className="font-semibold">{scaleInfo.minIRR}%</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-gray-600">최소 DSCR</div>
                  <div className="font-semibold">{scaleInfo.minDSCR}</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-gray-600">최대 회수기간</div>
                  <div className="font-semibold">{scaleInfo.maxPayback}년</div>
                </div>
              </div>
            </div>

            {/* 점수 산정 가중치 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div className="font-medium mb-3">평가 가중치</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white rounded p-2">
                  <div className="flex justify-between items-center">
                    <span>NPV</span>
                    <span className="font-semibold">{criteria.npv.weight}%</span>
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="flex justify-between items-center">
                    <span>IRR</span>
                    <span className="font-semibold">{criteria.irr.weight}%</span>
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="flex justify-between items-center">
                    <span>DSCR</span>
                    <span className="font-semibold">{criteria.dscr.weight}%</span>
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="flex justify-between items-center">
                    <span>회수기간</span>
                    <span className="font-semibold">{criteria.payback.weight}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 지표별 상세 점수 분석 */}
      <div className="space-y-4">
        {metricAnalysis.map((metric, index) => (
          <Card key={index} className={`border-l-4 ${metric.bgColor}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span>{metric.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">가중치: {metric.weight}%</Badge>
                  <Badge className={`${getScoreColor(metric.actualScore)} text-white`}>
                    {metric.name === 'NPV (순현재가치)' ? metric.actualScore.toFixed(1) : metric.actualScore}점
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 현재 값 표시 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">현재 값</span>
                  <span className={`text-lg font-bold ${metric.color}`}>
                    {metric.actualValue}
                  </span>
                </div>

                {/* 점수 구간 시각화 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">점수 구간</span>
                    <span className="font-medium">{getScoreLabel(metric.actualScore)}</span>
                  </div>
                  
                  <div className="relative">
                    <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                      {/* 점수 구간별 색상 바 */}
                      <div className="h-full flex">
                        <div className="w-[20%] bg-red-400 flex items-center justify-center text-xs text-white font-medium">
                          미흡
                        </div>
                        <div className="w-[20%] bg-orange-400 flex items-center justify-center text-xs text-white font-medium">
                          보통
                        </div>
                        <div className="w-[20%] bg-yellow-400 flex items-center justify-center text-xs text-white font-medium">
                          양호
                        </div>
                        <div className="w-[20%] bg-blue-400 flex items-center justify-center text-xs text-white font-medium">
                          우수
                        </div>
                        <div className="w-[20%] bg-green-400 flex items-center justify-center text-xs text-white font-medium">
                          탁월
                        </div>
                      </div>
                    </div>
                    
                    {/* 현재 점수 위치 표시 */}
                    <div 
                      className="absolute top-0 h-8 w-1 bg-black"
                      style={{ 
                        left: `${(() => {
                          // 점수를 5구간에 맞게 위치 계산 (각 구간 20%, 구간 중앙에 위치)
                          if (metric.actualScore >= 90) return 90; // 탁월 구간 중앙 (80-100% 구간의 90%)
                          if (metric.actualScore >= 70) return 70; // 우수 구간 중앙 (60-80% 구간의 70%)
                          if (metric.actualScore >= 50) return 50; // 양호 구간 중앙 (40-60% 구간의 50%)
                          if (metric.actualScore >= 30) return 30; // 보통 구간 중앙 (20-40% 구간의 30%)
                          return 10; // 미흡 구간 중앙 (0-20% 구간의 10%)
                        })()}%` 
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-1 rounded">
                        {metric.name === 'NPV (순현재가치)' ? metric.actualScore.toFixed(1) : metric.actualScore}점
                      </div>
                    </div>
                  </div>
                </div>

                {/* 구간별 기준값 표시 */}
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {metric.ranges.slice().reverse().map((range, rangeIndex) => (
                    <div key={rangeIndex} className="text-center p-1 bg-gray-50 rounded">
                      <div className="font-medium">{range.label}</div>
                      <div className="text-gray-600">
                        {range.max === Infinity ? `${range.min}+` : 
                         range.min === -Infinity ? `~${range.max}` : 
                         `${range.min}-${range.max}`}
                        {metric.unit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-500 italic">
                  {metric.description}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 리스크 프리미엄 적용 과정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            리스크 프리미엄 적용 과정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 기본 점수 */}
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">기본 점수</div>
                <div className="text-2xl font-bold text-blue-600">
                  {grade.score.toFixed(1)}점
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  가중평균 점수
                </div>
              </div>

              {/* 리스크 프리미엄 */}
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">리스크 프리미엄</div>
                <div className="text-2xl font-bold text-orange-600">
                  -{(scaleInfo.riskPremium * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {scaleInfo.description}
                </div>
              </div>

              {/* 최종 점수 */}
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">최종 점수</div>
                <div className="text-2xl font-bold text-green-600">
                  {grade.adjustedScore.toFixed(1)}점
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  리스크 조정 후
                </div>
              </div>
            </div>

            {/* 계산 공식 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">계산 공식</div>
              <div className="text-sm text-gray-700">
                최종 점수 = 기본 점수 × (1 - 리스크 프리미엄)
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {grade.adjustedScore.toFixed(1)} = {grade.score.toFixed(1)} × (1 - {(scaleInfo.riskPremium * 100).toFixed(0)}%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5구간 투자규모 비교 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            5구간 투자규모별 비교
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { scale: 'micro', name: '마이크로 투자', range: '25억원 미만', risk: 5 },
              { scale: 'small', name: '소규모 투자', range: '25억~50억원', risk: 8 },
              { scale: 'medium', name: '중규모 투자', range: '50억~75억원', risk: 12 },
              { scale: 'large', name: '대규모 투자', range: '75억~100억원', risk: 15 },
              { scale: 'mega', name: '메가 투자', range: '100억원 이상', risk: 18 }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border-2 ${
                  item.scale === scaleInfo.scale ? 
                  'border-blue-500 bg-blue-50' : 
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.scale === scaleInfo.scale ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.range}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">리스크 프리미엄</div>
                    <div className="text-sm text-gray-600">{item.risk}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
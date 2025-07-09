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
  Info
} from 'lucide-react';
import { InvestmentResult, InvestmentGrade } from '@/types/investment.types';
import { getInvestmentScaleInfo } from '@/lib/utils/investment-grade';

interface InvestmentResultDisplayProps {
  result: InvestmentResult;
  grade: InvestmentGrade;
  initialInvestment: number;
}

export default function InvestmentResultDisplay({ 
  result, 
  grade, 
  initialInvestment 
}: InvestmentResultDisplayProps) {
  const scaleInfo = getInvestmentScaleInfo(initialInvestment);
  
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

  const getMetricColor = (metric: string, value: number): string => {
    switch (metric) {
      case 'npv':
        return value > 0 ? 'text-green-600' : 'text-red-600';
      case 'irr':
        return value > scaleInfo.minIRR ? 'text-green-600' : 'text-red-600';
      case 'dscr':
        return value > 1.2 ? 'text-green-600' : 'text-red-600';
      case 'payback':
        return value < scaleInfo.maxPayback ? 'text-green-600' : 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getScoreGrade = (score: number): { label: string; color: string; bgColor: string } => {
    if (score >= 90) return { label: '탁월', color: 'text-green-700', bgColor: 'bg-green-100' };
    if (score >= 70) return { label: '우수', color: 'text-blue-700', bgColor: 'bg-blue-100' };
    if (score >= 50) return { label: '양호', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
    if (score >= 30) return { label: '보통', color: 'text-orange-700', bgColor: 'bg-orange-100' };
    return { label: '미흡', color: 'text-red-700', bgColor: 'bg-red-100' };
  };

  const metrics = [
    {
      title: 'NPV (순현재가치)',
      value: formatCurrency(result.npv),
      icon: DollarSign,
      color: getMetricColor('npv', result.npv),
      description: '투자의 순가치',
      score: grade.details.npvScore,
      benchmark: '양수 권장'
    },
    {
      title: 'IRR (내부수익률)',
      value: formatPercent(result.irr),
      icon: Percent,
      color: getMetricColor('irr', result.irr),
      description: '연간 수익률',
      score: grade.details.irrScore,
      benchmark: `${scaleInfo.minIRR}% 이상`
    },
    {
      title: '평균 DSCR',
      value: result.dscrData ? 
        (result.dscrData.reduce((sum, d) => sum + d.dscr, 0) / result.dscrData.length).toFixed(2) : 
        '0.00',
      icon: Activity,
      color: getMetricColor('dscr', result.dscrData?.[0]?.dscr || 0),
      description: '부채상환능력',
      score: grade.details.dscrScore,
      benchmark: `${scaleInfo.minDSCR} 이상`
    },
    {
      title: '투자회수기간',
      value: formatYears(result.paybackPeriod),
      icon: Calendar,
      color: getMetricColor('payback', result.paybackPeriod),
      description: '원금 회수 기간',
      score: grade.details.paybackScore,
      benchmark: `${scaleInfo.maxPayback}년 이하`
    }
  ];

  const additionalMetrics = [
    {
      label: 'ROI (투자수익률)',
      value: formatPercent(result.roi)
    },
    {
      label: '수익성 지수',
      value: result.profitabilityIndex.toFixed(2)
    },
    {
      label: '평균 ROI',
      value: formatPercent(result.averageROI)
    },
    {
      label: '손익분기점',
      value: `${result.breakEvenPoint}년차`
    }
  ];

  return (
    <div className="space-y-6">
      {/* 종합 투자 등급 카드 */}
      <Card className={`${grade.bgColor} ${grade.borderColor} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              종합 투자 등급 평가
            </span>
            <Badge className={`text-2xl px-4 py-2 ${grade.color}`}>
              {grade.grade}등급
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 점수 표시 */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{grade.gradeDesc}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{grade.score.toFixed(1)}점</span>
                <span className="text-sm text-gray-500">
                  (조정 후: {grade.adjustedScore.toFixed(1)}점)
                </span>
              </div>
            </div>
            
            <Progress value={grade.adjustedScore} className="h-3" />
            
            {/* 지표별 점수 상세 표시 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'NPV', score: grade.details.npvScore },
                { name: 'IRR', score: grade.details.irrScore },
                { name: 'DSCR', score: grade.details.dscrScore },
                { name: ' 회수기간', score: grade.details.paybackScore }
              ].map((metric, index) => {
                const scoreGrade = getScoreGrade(metric.score);
                return (
                  <div key={index} className={`${scoreGrade.bgColor} rounded-lg p-3 text-center`}>
                    <div className="text-sm font-medium">{metric.name}</div>
                    <div className={`text-lg font-bold ${scoreGrade.color}`}>
                      {metric.score}점
                    </div>
                    <div className="text-xs text-gray-600">{scoreGrade.label}</div>
                  </div>
                );
              })}
            </div>
            
            {/* 리스크 프리미엄 정보 */}
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">리스크 프리미엄 적용</span>
              </div>
              <div className="text-sm text-gray-700">
                {scaleInfo.description}으로 {(scaleInfo.riskPremium * 100).toFixed(0)}% 리스크 프리미엄이 적용되었습니다.
              </div>
            </div>
            
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium mb-1">평가 결과</div>
                  <div className="text-sm">{grade.recommendation}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 핵심 지표 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
                <div className="text-right">
                  <div className={`text-sm font-medium px-2 py-1 rounded ${getScoreGrade(metric.score).bgColor} ${getScoreGrade(metric.score).color}`}>
                    {metric.score}점
                  </div>
                </div>
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{metric.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{metric.description}</div>
              <div className="text-xs text-blue-600 mt-1 font-medium">
                기준: {metric.benchmark}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 추가 지표 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            추가 분석 지표
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">{metric.label}</div>
                <div className="text-lg font-semibold text-gray-900 mt-1">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 투자 규모 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            투자 규모 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-medium">{scaleInfo.description}</span>
              <Badge variant="outline">
                리스크 프리미엄: {(scaleInfo.riskPremium * 100).toFixed(0)}%
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
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
        </CardContent>
      </Card>

      {/* 점수 분석 안내 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 mb-1">
                더 상세한 점수 분석이 필요하신가요?
              </div>
              <div className="text-sm text-blue-700">
                '점수분석' 탭에서 지표별 구간 분석, 리스크 프리미엄 적용 과정, 5구간 투자규모별 비교 등 상세한 점수 분석을 확인하실 수 있습니다.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
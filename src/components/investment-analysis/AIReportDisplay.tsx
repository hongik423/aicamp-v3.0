'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Shield,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import { AIEvaluation, MetricAnalysis } from '@/types/investment.types';

interface AIReportDisplayProps {
  aiEvaluation: AIEvaluation;
}

export default function AIReportDisplay({ aiEvaluation }: AIReportDisplayProps) {
  const getMetricIcon = (metric: string) => {
    const icons: Record<string, any> = {
      npv: TrendingUp,
      irr: Zap,
      dscr: Shield,
      payback: Target,
      profitability: BarChart3,
      stability: Shield,
      growth: TrendingUp,
      risk: AlertTriangle
    };
    return icons[metric] || CheckCircle;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-blue-50';
    if (score >= 40) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const metricLabels: Record<string, string> = {
    npv: 'NPV (순현재가치)',
    irr: 'IRR (내부수익률)',
    dscr: 'DSCR (부채상환능력)',
    payback: '투자회수기간',
    profitability: '수익성',
    stability: '안정성',
    growth: '성장성',
    risk: '위험도'
  };

  return (
    <div className="space-y-6">
      {/* AI 종합 평가 헤더 */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              AI 종합 투자 평가
            </span>
            <div className="flex items-center gap-3">
              <Badge className="text-lg px-3 py-1">
                신뢰도: {aiEvaluation.confidence.toFixed(0)}%
              </Badge>
              <Badge className={`text-xl px-4 py-2 ${aiEvaluation.overallGrade.color}`}>
                {aiEvaluation.overallGrade.grade}등급
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 투자 규모 정보 */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{aiEvaluation.scaleAnalysis.description}</span>
                <Badge variant="outline">
                  리스크 프리미엄: {(aiEvaluation.scaleAnalysis.riskPremium * 100).toFixed(0)}%
                </Badge>
              </div>
              <Progress value={aiEvaluation.confidence} className="h-2" />
            </div>

            {/* AI 추천사항 */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                AI 종합 추천
              </h4>
              <div className="whitespace-pre-line text-sm text-gray-700">
                {aiEvaluation.recommendation}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8개 핵심 지표 분석 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(aiEvaluation.metrics).map(([key, metric]) => {
          const Icon = getMetricIcon(key);
          const metricAnalysis = metric as MetricAnalysis;
          
          return (
            <Card key={key} className={getScoreBgColor(metricAnalysis.score)}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${getScoreColor(metricAnalysis.score)}`} />
                    {metricLabels[key]}
                  </span>
                  <Badge className={getScoreColor(metricAnalysis.score)}>
                    {metricAnalysis.score}점
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress 
                    value={metricAnalysis.score} 
                    className="h-2"
                  />
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">분석:</span>
                      <p className="text-gray-700 mt-1">{metricAnalysis.analysis}</p>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">권장사항:</span>
                      <p className="text-gray-700 mt-1">{metricAnalysis.recommendation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 종합 점수 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            지표별 점수 요약
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(aiEvaluation.metrics).map(([key, metric]) => {
              const metricAnalysis = metric as MetricAnalysis;
              return (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-32 text-sm font-medium">{metricLabels[key]}</div>
                  <div className="flex-1">
                    <Progress value={metricAnalysis.score} className="h-6" />
                  </div>
                  <div className={`w-16 text-right font-bold ${getScoreColor(metricAnalysis.score)}`}>
                    {metricAnalysis.score}점
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 평균 점수 */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="font-medium">종합 평균 점수</span>
              <span className="text-xl font-bold">
                {Object.values(aiEvaluation.metrics)
                  .reduce((sum, m) => sum + (m as MetricAnalysis).score, 0) / 8}점
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 타임스탬프 */}
      <div className="text-center text-sm text-gray-500">
        분석 시각: {new Date(aiEvaluation.timestamp).toLocaleString('ko-KR')}
      </div>
    </div>
  );
} 
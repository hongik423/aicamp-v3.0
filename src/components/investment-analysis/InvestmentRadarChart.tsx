'use client';

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Award, TrendingUp } from 'lucide-react';
import { InvestmentResult, InvestmentGrade } from '@/types/investment.types';

interface InvestmentRadarChartProps {
  result: InvestmentResult;
  grade: InvestmentGrade;
}

export default function InvestmentRadarChart({ result, grade }: InvestmentRadarChartProps) {
  // 평균 DSCR 계산
  const avgDSCR = result.dscr && result.dscr.length > 0
    ? result.dscr.reduce((a, b) => a + b, 0) / result.dscr.length
    : 0;

  // 레이더 차트 데이터 준비
  const radarData = [
    {
      metric: 'NPV',
      score: grade.details.npvScore,
      fullMark: 100
    },
    {
      metric: 'IRR',
      score: grade.details.irrScore,
      fullMark: 100
    },
    {
      metric: 'DSCR',
      score: grade.details.dscrScore,
      fullMark: 100
    },
    {
      metric: '회수기간',
      score: grade.details.paybackScore,
      fullMark: 100
    },
    {
      metric: '수익성지수',
      score: result.profitabilityIndex >= 1.5 ? 90 : 
             result.profitabilityIndex >= 1.2 ? 70 :
             result.profitabilityIndex >= 1.0 ? 50 : 30,
      fullMark: 100
    },
    {
      metric: 'ROI',
      score: result.roi >= 30 ? 90 :
             result.roi >= 20 ? 70 :
             result.roi >= 10 ? 50 : 30,
      fullMark: 100
    },
    {
      metric: '손익분기',
      score: result.breakEvenPoint <= 2 ? 90 :
             result.breakEvenPoint <= 3 ? 70 :
             result.breakEvenPoint <= 5 ? 50 : 30,
      fullMark: 100
    },
    {
      metric: '종합점수',
      score: grade.score,
      fullMark: 100
    }
  ];

  // 등급별 점수 파이 차트 데이터
  const gradeData = [
    { name: 'NPV', value: grade.details.npvScore, color: '#3b82f6' },
    { name: 'IRR', value: grade.details.irrScore, color: '#10b981' },
    { name: 'DSCR', value: grade.details.dscrScore, color: '#f59e0b' },
    { name: '회수기간', value: grade.details.paybackScore, color: '#ef4444' }
  ];

  // 지표별 상세 점수 바차트 데이터
  const detailScoreData = [
    { name: 'NPV', score: grade.details.npvScore, value: `${(result.npv / 100000000).toFixed(1)}억원` },
    { name: 'IRR', score: grade.details.irrScore, value: `${result.irr.toFixed(2)}%` },
    { name: 'DSCR', score: grade.details.dscrScore, value: avgDSCR.toFixed(2) },
    { name: '회수기간', score: grade.details.paybackScore, value: `${result.paybackPeriod.toFixed(1)}년` },
    { name: '수익성지수', score: radarData[4].score, value: result.profitabilityIndex.toFixed(2) },
    { name: 'ROI', score: radarData[5].score, value: `${result.roi.toFixed(1)}%` },
    { name: '손익분기', score: radarData[6].score, value: `${result.breakEvenPoint}년` }
  ].map(item => ({
    ...item,
    color: item.score >= 80 ? '#10b981' : 
           item.score >= 60 ? '#3b82f6' : 
           item.score >= 40 ? '#f59e0b' : '#ef4444'
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* 투자 지표 레이더 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            투자 지표 종합 분석 (8개 지표)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" className="text-sm" />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={false}
                axisLine={false}
              />
              <Radar
                name="투자지표 점수"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ r: 6, fill: '#8b5cf6' }}
              />
              <Legend />
              <Tooltip 
                formatter={(value) => [`${value}점`, '점수']}
                labelStyle={{ color: '#374151' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 핵심 4대 지표 파이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            핵심 4대 지표 구성
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}점`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <h4 className="font-medium text-lg">등급 상세 점수</h4>
              {gradeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold">
                    {item.name === 'NPV' ? item.value.toFixed(1) : item.value}점
                  </span>
                </div>
              ))}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">종합 점수</p>
                <p className="text-2xl font-bold text-blue-700">{grade.score.toFixed(1)}점</p>
                <p className="text-xs text-gray-500 mt-1">
                  리스크 조정: {grade.adjustedScore.toFixed(1)}점 (프리미엄 {(grade.riskPremium * 100).toFixed(0)}%)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 지표별 상세 점수 바차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            지표별 상세 점수 및 실제값
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={detailScoreData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip 
                formatter={(value, name) => {
                  const item = detailScoreData.find(d => d.score === value);
                  return [`${value}점 (${item?.value || ''})`, '점수'];
                }}
                labelStyle={{ color: '#374151' }}
              />
              <Bar 
                dataKey="score" 
                fill="#8b5cf6"
                radius={[0, 4, 4, 0]}
              >
                {detailScoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* 점수 기준 안내 */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span>80점 이상: 우수</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span>60-79점: 양호</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded" />
              <span>40-59점: 보통</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span>40점 미만: 미흡</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
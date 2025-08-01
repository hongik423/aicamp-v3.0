'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle } from 'lucide-react';
import { DSCRDetailedData } from '@/types/investment.types';

interface DSCRChartProps {
  dscrData: DSCRDetailedData[];
}

export default function DSCRChart({ dscrData }: DSCRChartProps) {
  // 차트 데이터 준비
  const chartData = dscrData.map(data => ({
    year: `${data.year}년`,
    dscr: Number(data.dscr.toFixed(2)),
    totalDebtService: Math.round(data.totalDebtService / 100000000 * 10) / 10, // 억원
    operatingProfit: Math.round(data.operatingProfit / 100000000 * 10) / 10, // 억원
    policyLoanPayment: Math.round((data.policyLoanPrincipal + data.policyLoanInterest) / 100000000 * 10) / 10,
    otherDebtPayment: Math.round((data.otherDebtPrincipal + data.otherDebtInterest) / 100000000 * 10) / 10,
    isGracePeriod: data.isGracePeriod,
    isRepaymentPeriod: data.isRepaymentPeriod,
    status: data.dscr >= 2.0 ? '매우안정' : data.dscr >= 1.5 ? '안정' : data.dscr >= 1.2 ? '양호' : data.dscr >= 1.0 ? '주의' : '위험'
  }));

  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'DSCR') {
      return [value.toFixed(2), name];
    }
    return [`${value.toFixed(1)}억원`, name];
  };

  const formatDSCRValue = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* DSCR 추이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            DSCR 연도별 추이 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                label={{ value: 'DSCR', angle: -90, position: 'insideLeft' }}
                domain={[0, 'dataMax + 0.5']}
              />
              <Tooltip 
                formatter={(value, name) => {
                  const numValue = Number(value);
                  if (name === 'DSCR') return [numValue.toFixed(2), name];
                  return [`${numValue.toFixed(1)}억원`, name];
                }}
              />
              <Legend />
              
              {/* 기준선들 */}
              <ReferenceLine y={2.0} stroke="#10b981" strokeDasharray="5 5" label="매우안정 (2.0)" />
              <ReferenceLine y={1.5} stroke="#3b82f6" strokeDasharray="5 5" label="안정 (1.5)" />
              <ReferenceLine y={1.2} stroke="#f59e0b" strokeDasharray="5 5" label="양호 (1.2)" />
              <ReferenceLine y={1.0} stroke="#ef4444" strokeDasharray="5 5" label="최소기준 (1.0)" />
              
              <Line 
                type="monotone" 
                dataKey="dscr" 
                stroke="#8b5cf6" 
                strokeWidth={4}
                name="DSCR"
                dot={{ r: 6, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 부채상환액 구성 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            연도별 부채상환 구조
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: '금액 (억원)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              
              <Bar 
                dataKey="operatingProfit" 
                fill="#10b981" 
                name="영업이익"
                opacity={0.8}
              />
              <Bar 
                dataKey="policyLoanPayment" 
                fill="#3b82f6" 
                name="정책자금 상환"
                opacity={0.7}
              />
              <Bar 
                dataKey="otherDebtPayment" 
                fill="#f59e0b" 
                name="기타채무 상환"
                opacity={0.7}
              />
              <Line 
                type="monotone" 
                dataKey="totalDebtService" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="총 부채상환액"
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* DSCR 안전도 구간 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            DSCR 안전도 구간 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                label={{ value: 'DSCR', angle: -90, position: 'insideLeft' }}
                domain={[0, 'dataMax + 0.3']}
              />
              <Tooltip formatter={(value) => [Number(value).toFixed(2), 'DSCR']} />
              <Legend />
              
              {/* 안전도 구간별 배경 영역 */}
              <defs>
                <linearGradient id="dscrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  <stop offset="75%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              
              <Area 
                type="monotone" 
                dataKey="dscr" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fill="url(#dscrGradient)"
                name="DSCR 추이"
              />
              
              {/* 기준선들 */}
              <ReferenceLine y={2.0} stroke="#10b981" strokeDasharray="8 8" />
              <ReferenceLine y={1.5} stroke="#3b82f6" strokeDasharray="8 8" />
              <ReferenceLine y={1.2} stroke="#f59e0b" strokeDasharray="8 8" />
              <ReferenceLine y={1.0} stroke="#ef4444" strokeDasharray="8 8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
} 
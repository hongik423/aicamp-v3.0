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
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { CashFlow } from '@/types/investment.types';

interface CashFlowChartProps {
  cashFlows: CashFlow[];
}

export default function CashFlowChart({ cashFlows }: CashFlowChartProps) {
  // 차트 데이터 준비
  const chartData = cashFlows.map(cf => ({
    year: `${cf.year}년`,
    netCashFlow: Math.round(cf.netCashFlow / 100000000 * 10) / 10, // 억원 단위
    cumulativeCashFlow: Math.round(cf.cumulativeCashFlow / 100000000 * 10) / 10,
    presentValue: Math.round(cf.presentValue / 100000000 * 10) / 10,
    cumulativePV: Math.round(cf.cumulativePV / 100000000 * 10) / 10,
    revenue: Math.round(cf.revenue / 100000000 * 10) / 10,
    operatingProfit: Math.round((cf.revenue * cf.operatingProfitRate / 100) / 100000000 * 10) / 10
  }));

  const formatTooltipValue = (value: number, name: string) => {
    return [`${value.toFixed(1)}억원`, name];
  };

  return (
    <div className="space-y-6">
      {/* 현금흐름 및 누적 현금흐름 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            연도별 현금흐름 분석
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
                dataKey="netCashFlow" 
                fill="#3b82f6" 
                name="순현금흐름"
                opacity={0.7}
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeCashFlow" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="누적현금흐름"
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NPV 분석 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            NPV 현재가치 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: '현재가치 (억원)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="presentValue" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="연도별 현재가치"
              />
              <Line 
                type="monotone" 
                dataKey="cumulativePV" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="누적 NPV"
                dot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 매출 및 영업이익 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            매출 및 영업이익 추이
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: '금액 (억원)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar 
                dataKey="revenue" 
                fill="#8b5cf6" 
                name="연간 매출"
                opacity={0.7}
              />
              <Bar 
                dataKey="operatingProfit" 
                fill="#10b981" 
                name="영업이익"
                opacity={0.8}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
} 
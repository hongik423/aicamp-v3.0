'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { DSCRDetailedData } from '@/types/investment.types';

interface DSCRDetailedAnalysisProps {
  dscrData: DSCRDetailedData[];
}

export default function DSCRDetailedAnalysis({ dscrData }: DSCRDetailedAnalysisProps) {
  const formatCurrency = (value: number): string => {
    const billion = Math.abs(value) / 100000000;
    if (billion >= 1) {
      return `${value < 0 ? '-' : ''}${billion.toFixed(1)}억`;
    }
    const million = Math.abs(value) / 10000000;
    return `${value < 0 ? '-' : ''}${million.toFixed(0)}천만`;
  };

  const getDSCRStatus = (dscr: number) => {
    if (dscr >= 2.0) {
      return { label: '매우 안정', color: 'bg-green-100 text-green-800', icon: TrendingUp };
    } else if (dscr >= 1.5) {
      return { label: '안정', color: 'bg-blue-100 text-blue-800', icon: TrendingUp };
    } else if (dscr >= 1.2) {
      return { label: '양호', color: 'bg-yellow-100 text-yellow-800', icon: Activity };
    } else if (dscr >= 1.0) {
      return { label: '주의', color: 'bg-orange-100 text-orange-800', icon: AlertCircle };
    } else {
      return { label: '위험', color: 'bg-red-100 text-red-800', icon: TrendingDown };
    }
  };

  const averageDSCR = dscrData.reduce((sum, d) => sum + d.dscr, 0) / dscrData.length;
  const minDSCR = Math.min(...dscrData.map(d => d.dscr));
  const maxDSCR = Math.max(...dscrData.map(d => d.dscr));

  return (
    <div className="space-y-6">
      {/* DSCR 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-500">평균</span>
            </div>
            <div className="text-2xl font-bold">{averageDSCR.toFixed(2)}</div>
            <div className="text-sm text-gray-600 mt-1">평균 DSCR</div>
            <Badge className={`mt-2 ${getDSCRStatus(averageDSCR).color}`}>
              {getDSCRStatus(averageDSCR).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-500">최저</span>
            </div>
            <div className="text-2xl font-bold">{minDSCR.toFixed(2)}</div>
            <div className="text-sm text-gray-600 mt-1">최저 DSCR</div>
            <Badge className={`mt-2 ${getDSCRStatus(minDSCR).color}`}>
              {getDSCRStatus(minDSCR).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-500">최고</span>
            </div>
            <div className="text-2xl font-bold">{maxDSCR.toFixed(2)}</div>
            <div className="text-sm text-gray-600 mt-1">최고 DSCR</div>
            <Badge className={`mt-2 ${getDSCRStatus(maxDSCR).color}`}>
              {getDSCRStatus(maxDSCR).label}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* DSCR 상세 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            연도별 DSCR 상세 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">연도</TableHead>
                  <TableHead className="text-right">매출</TableHead>
                  <TableHead className="text-right">영업이익</TableHead>
                  <TableHead className="text-right">정책자금 상환</TableHead>
                  <TableHead className="text-right">기타채무 상환</TableHead>
                  <TableHead className="text-right">총 부채상환</TableHead>
                  <TableHead className="text-center">DSCR</TableHead>
                  <TableHead className="text-center">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dscrData.map((data, index) => {
                  const status = getDSCRStatus(data.dscr);
                  const StatusIcon = status.icon;
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="text-center font-medium">
                        {data.year}년
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(data.revenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(data.operatingProfit)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-1">
                          <div className="text-sm">
                            원금: {formatCurrency(data.policyLoanPrincipal)}
                          </div>
                          <div className="text-xs text-gray-500">
                            이자: {formatCurrency(data.policyLoanInterest)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-1">
                          <div className="text-sm">
                            원금: {formatCurrency(data.otherDebtPrincipal)}
                          </div>
                          <div className="text-xs text-gray-500">
                            이자: {formatCurrency(data.otherDebtInterest)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(data.totalDebtService)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-bold text-lg">
                          {data.dscr.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={status.color}>
                            {status.label}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* 기간별 상태 표시 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-sm font-medium">거치기간</span>
                </div>
                <div className="text-xs text-gray-600">
                  {dscrData.filter(d => d.isGracePeriod).length}년 동안 원금 상환 유예
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span className="text-sm font-medium">상환기간</span>
                </div>
                <div className="text-xs text-gray-600">
                  {dscrData.filter(d => d.isRepaymentPeriod).length}년 동안 원금 + 이자 상환
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-sm font-medium">상환완료</span>
                </div>
                <div className="text-xs text-gray-600">
                  {dscrData.filter(d => d.isPostRepayment).length}년 동안 부채 상환 완료
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DSCR 기준 안내 */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              DSCR 평가 기준
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span>2.0 이상: 매우 안정</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span>1.5~2.0: 안정</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded" />
                <span>1.2~1.5: 양호</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded" />
                <span>1.0~1.2: 주의</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span>1.0 미만: 위험</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
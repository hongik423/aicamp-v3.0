'use client';

import React from 'react';
import { InvestmentResult, DSCRDetailedData } from '@/types/investment.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

interface ComprehensiveFinancialTableProps {
  result: InvestmentResult;
  dscrData: DSCRDetailedData[];
}

export default function ComprehensiveFinancialTable({ result, dscrData }: ComprehensiveFinancialTableProps) {
  // 연도별 종합 재무데이터 생성
  const comprehensiveData = result.cashFlows.map((cf, index) => {
    const dscr = dscrData[index - 1]; // cashFlows는 0년부터, dscrData는 1년부터
    
    if (index === 0) {
      return {
        year: 0,
        revenue: 0,
        operatingProfit: 0,
        policyLoanPrincipal: 0,
        policyLoanInterest: 0,
        otherDebtPrincipal: 0,
        otherDebtInterest: 0,
        totalDebtService: 0,
        netCashFlow: cf.netCashFlow,
        cumulativeCashFlow: cf.cumulativeCashFlow,
        fcf: cf.fcf || cf.netCashFlow,
        dscr: '-',
        npv: cf.presentValue
      };
    }
    
    return {
      year: cf.year,
      revenue: dscr?.revenue || cf.revenue,
      operatingProfit: dscr?.operatingProfit || (cf.revenue * (cf.operatingProfitRate / 100)),
      policyLoanPrincipal: dscr?.policyLoanPrincipal || 0,
      policyLoanInterest: dscr?.policyLoanInterest || 0,
      otherDebtPrincipal: dscr?.otherDebtPrincipal || 0,
      otherDebtInterest: dscr?.otherDebtInterest || 0,
      totalDebtService: dscr?.totalDebtService || (cf.loanPrincipal + cf.loanInterest),
      netCashFlow: cf.netCashFlow,
      cumulativeCashFlow: cf.cumulativeCashFlow,
      fcf: cf.fcf || cf.netCashFlow,
      dscr: dscr?.dscr.toFixed(2) || '-',
      npv: cf.presentValue
    };
  });

  // 합계 계산
  const totals = comprehensiveData.reduce((acc, data) => ({
    revenue: acc.revenue + data.revenue,
    operatingProfit: acc.operatingProfit + data.operatingProfit,
    policyLoanPrincipal: acc.policyLoanPrincipal + data.policyLoanPrincipal,
    policyLoanInterest: acc.policyLoanInterest + data.policyLoanInterest,
    otherDebtPrincipal: acc.otherDebtPrincipal + data.otherDebtPrincipal,
    otherDebtInterest: acc.otherDebtInterest + data.otherDebtInterest,
    totalDebtService: acc.totalDebtService + data.totalDebtService,
    netCashFlow: acc.netCashFlow + data.netCashFlow,
    fcf: acc.fcf + data.fcf,
    npv: acc.npv + data.npv
  }), {
    revenue: 0,
    operatingProfit: 0,
    policyLoanPrincipal: 0,
    policyLoanInterest: 0,
    otherDebtPrincipal: 0,
    otherDebtInterest: 0,
    totalDebtService: 0,
    netCashFlow: 0,
    fcf: 0,
    npv: 0
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">포괄적 재무데이터 분석표</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center font-bold">연도</TableHead>
                <TableHead className="text-right font-bold">매출액</TableHead>
                <TableHead className="text-right font-bold">영업이익</TableHead>
                <TableHead className="text-right font-bold text-blue-600">정책자금<br/>원금</TableHead>
                <TableHead className="text-right font-bold text-blue-600">정책자금<br/>이자</TableHead>
                <TableHead className="text-right font-bold text-orange-600">기타채무<br/>원금</TableHead>
                <TableHead className="text-right font-bold text-orange-600">기타채무<br/>이자</TableHead>
                <TableHead className="text-right font-bold">총 상환액</TableHead>
                <TableHead className="text-right font-bold text-purple-600">순현금흐름</TableHead>
                <TableHead className="text-right font-bold text-purple-600">누적현금흐름</TableHead>
                <TableHead className="text-right font-bold text-green-600">잉여현금흐름<br/>(FCF)</TableHead>
                <TableHead className="text-center font-bold">DSCR</TableHead>
                <TableHead className="text-right font-bold">현재가치</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comprehensiveData.map((data, index) => (
                <TableRow key={data.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="text-center font-medium">{data.year}</TableCell>
                  <TableCell className="text-right">{formatCurrency(data.revenue)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(data.operatingProfit)}</TableCell>
                  <TableCell className="text-right text-blue-600">{formatCurrency(data.policyLoanPrincipal)}</TableCell>
                  <TableCell className="text-right text-blue-600">{formatCurrency(data.policyLoanInterest)}</TableCell>
                  <TableCell className="text-right text-orange-600">{formatCurrency(data.otherDebtPrincipal)}</TableCell>
                  <TableCell className="text-right text-orange-600">{formatCurrency(data.otherDebtInterest)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(data.totalDebtService)}</TableCell>
                  <TableCell className={`text-right font-medium ${data.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(data.netCashFlow)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${data.cumulativeCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(data.cumulativeCashFlow)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${data.fcf >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(data.fcf)}
                  </TableCell>
                  <TableCell className={`text-center font-medium ${
                    typeof data.dscr === 'string' ? '' : 
                    parseFloat(data.dscr) >= 1.5 ? 'text-green-600' : 
                    parseFloat(data.dscr) >= 1.25 ? 'text-blue-600' :
                    parseFloat(data.dscr) >= 1.0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {data.dscr}
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(data.npv)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 font-bold">
                <TableCell className="text-center">합계</TableCell>
                <TableCell className="text-right">{formatCurrency(totals.revenue)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totals.operatingProfit)}</TableCell>
                <TableCell className="text-right text-blue-600">{formatCurrency(totals.policyLoanPrincipal)}</TableCell>
                <TableCell className="text-right text-blue-600">{formatCurrency(totals.policyLoanInterest)}</TableCell>
                <TableCell className="text-right text-orange-600">{formatCurrency(totals.otherDebtPrincipal)}</TableCell>
                <TableCell className="text-right text-orange-600">{formatCurrency(totals.otherDebtInterest)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totals.totalDebtService)}</TableCell>
                <TableCell className={`text-right ${totals.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totals.netCashFlow)}
                </TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className={`text-right ${totals.fcf >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totals.fcf)}
                </TableCell>
                <TableCell className="text-center">평균: {result.dscr ? (result.dscr.reduce((a, b) => a + b, 0) / result.dscr.length).toFixed(2) : '-'}</TableCell>
                <TableCell className={`text-right ${totals.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totals.npv)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* 주요 지표 요약 */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">총 정책자금 상환액</p>
            <p className="text-lg font-bold text-blue-700">
              {formatCurrency(totals.policyLoanPrincipal + totals.policyLoanInterest)}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">총 기타채무 상환액</p>
            <p className="text-lg font-bold text-orange-700">
              {formatCurrency(totals.otherDebtPrincipal + totals.otherDebtInterest)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">영업이익 대비 상환비율</p>
            <p className="text-lg font-bold text-green-700">
              {totals.operatingProfit > 0 ? ((totals.totalDebtService / totals.operatingProfit) * 100).toFixed(1) : '0'}%
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">누적 순현금흐름</p>
            <p className={`text-lg font-bold ${totals.netCashFlow >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(totals.netCashFlow)}
            </p>
          </div>
        </div>
        
        {/* 현금흐름 요약 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">현금흐름 분석 요약</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">총 잉여현금흐름(FCF):</span>
              <span className={`ml-2 font-bold ${totals.fcf >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totals.fcf)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">최종 누적현금흐름:</span>
              <span className={`ml-2 font-bold ${
                comprehensiveData[comprehensiveData.length - 1]?.cumulativeCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(comprehensiveData[comprehensiveData.length - 1]?.cumulativeCashFlow || 0)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">현금흐름 전환 시점:</span>
              <span className="ml-2 font-bold">
                {comprehensiveData.find(d => d.year > 0 && d.cumulativeCashFlow >= 0)?.year || '미도달'}년
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
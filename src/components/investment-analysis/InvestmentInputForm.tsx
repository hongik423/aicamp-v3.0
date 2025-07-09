'use client';

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InvestmentInput } from '@/types/investment.types';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InvestmentInputFormProps {
  value: InvestmentInput;
  onChange: (input: InvestmentInput) => void;
}

export default function InvestmentInputForm({ value, onChange }: InvestmentInputFormProps) {
  // 입력 중인 상태를 추적하는 state (간소화)
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof InvestmentInput, newValue: string | number) => {
    onChange({
      ...value,
      [field]: typeof value[field] === 'number' ? Number(newValue) : newValue
    });
  };

  // 더 자연스러운 숫자 포맷팅 (값 유지 개선)
  const formatNumber = (num: number, field: string): string => {
    // 포커스된 필드는 원본 값 유지
    if (focusedField === field) {
      if (num === 0) return '';
      return (num / 100000000).toString();
    }
    
    // 포커스되지 않은 필드는 포맷된 값 표시
    if (num === 0) return '';
    
    const billion = num / 100000000;
    
    // 정수인 경우 소수점 표시 안함
    if (billion % 1 === 0) {
      return billion.toLocaleString('ko-KR');
    }
    
    // 소수점이 있는 경우 적절히 표시
    return parseFloat(billion.toFixed(2)).toLocaleString('ko-KR');
  };

  // 더 유연한 숫자 파싱
  const parseNumber = (str: string): number => {
    if (str.trim() === '') return 0;
    
    // 숫자만 추출 (소수점 포함)
    const cleanStr = str.replace(/[^\d.-]/g, '');
    const billion = Number(cleanStr) || 0;
    
    return billion * 100000000;
  };

  // 퍼센트 포맷팅 개선 (값 유지)
  const formatPercentage = (num: number, field: string): string => {
    if (focusedField === field) {
      if (num === 0) return '';
      return num.toString();
    }
    
    if (num === 0) return '';
    return num.toLocaleString('ko-KR');
  };

  // 정수 포맷팅 개선 (값 유지)
  const formatInteger = (num: number, field: string): string => {
    if (focusedField === field) {
      if (num === 0) return '';
      return num.toString();
    }
    
    if (num === 0) return '';
    return num.toLocaleString('ko-KR');
  };

  // 입력 포커스 핸들러 (간소화)
  const handleFocus = useCallback((field: string) => {
    setFocusedField(field);
  }, []);

  // 입력 블러 핸들러 (간소화)
  const handleBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

  // 실시간 입력 핸들러 (억원 단위 필드용)
  const handleInputChange = useCallback((field: keyof InvestmentInput, inputValue: string) => {
    // 실시간으로 값 업데이트
    handleChange(field, parseNumber(inputValue));
  }, []);

  // 일반 숫자 입력 핸들러 (퍼센트, 정수 필드용)
  const handleNumberChange = useCallback((field: keyof InvestmentInput, inputValue: string) => {
    const numValue = inputValue === '' ? 0 : Number(inputValue.replace(/[^\d.-]/g, '')) || 0;
    handleChange(field, numValue);
  }, []);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* 기본 투자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💰 기본 투자 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment" className="flex items-center gap-2">
                초기 투자금 (억원)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>설비, 시설, 초기 운영자금 등 총 투자금액</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="initialInvestment"
                type="text"
                value={formatNumber(value.initialInvestment, 'initialInvestment')}
                onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                onFocus={() => handleFocus('initialInvestment')}
                onBlur={handleBlur}
                placeholder="투자금을 입력하세요 (예: 50 또는 50.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policyFundAmount" className="flex items-center gap-2">
                정책자금 규모 (억원)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>신청하려는 정책자금의 총 규모</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="policyFundAmount"
                type="text"
                value={formatNumber(value.policyFundAmount, 'policyFundAmount')}
                onChange={(e) => handleInputChange('policyFundAmount', e.target.value)}
                onFocus={() => handleFocus('policyFundAmount')}
                onBlur={handleBlur}
                placeholder="정책자금 규모를 입력하세요 (예: 30 또는 30.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRevenue" className="flex items-center gap-2">
                연간 예상 매출 (억원)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>사업 시작 후 첫 해 예상 매출액</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="annualRevenue"
                type="text"
                value={formatNumber(value.annualRevenue, 'annualRevenue')}
                onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                onFocus={() => handleFocus('annualRevenue')}
                onBlur={handleBlur}
                placeholder="연간 예상 매출을 입력하세요 (예: 100 또는 100.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingProfitRate" className="flex items-center gap-2">
                영업이익률 (%)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>매출 대비 영업이익 비율</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="operatingProfitRate"
                type="text"
                value={formatPercentage(value.operatingProfitRate, 'operatingProfitRate')}
                onChange={(e) => handleNumberChange('operatingProfitRate', e.target.value)}
                onFocus={() => handleFocus('operatingProfitRate')}
                onBlur={handleBlur}
                placeholder="영업이익률을 입력하세요 (예: 15 또는 15.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountRate" className="flex items-center gap-2">
                할인율 (%)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>미래 현금흐름의 현재가치 계산에 사용되는 이율</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="discountRate"
                type="text"
                value={formatPercentage(value.discountRate, 'discountRate')}
                onChange={(e) => handleNumberChange('discountRate', e.target.value)}
                onFocus={() => handleFocus('discountRate')}
                onBlur={handleBlur}
                placeholder="할인율을 입력하세요 (예: 10 또는 10.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysisYears" className="flex items-center gap-2">
                분석 기간 (년)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>투자 타당성을 분석할 기간</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="analysisYears"
                type="text"
                value={formatInteger(value.analysisYears, 'analysisYears')}
                onChange={(e) => handleNumberChange('analysisYears', e.target.value)}
                onFocus={() => handleFocus('analysisYears')}
                onBlur={handleBlur}
                placeholder="분석 기간을 입력하세요 (예: 10)"
              />
            </div>
          </CardContent>
        </Card>

        {/* 정책자금 대출 조건 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏦 정책자금 대출 조건
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="policyLoanAmount">정책자금 대출액 (억원)</Label>
              <Input
                id="policyLoanAmount"
                type="text"
                value={formatNumber(value.policyLoanAmount, 'policyLoanAmount')}
                onChange={(e) => handleInputChange('policyLoanAmount', e.target.value)}
                onFocus={() => handleFocus('policyLoanAmount')}
                onBlur={handleBlur}
                placeholder="대출액을 입력하세요 (예: 20 또는 20.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policyLoanRate">정책자금 이자율 (%)</Label>
              <Input
                id="policyLoanRate"
                type="text"
                value={formatPercentage(value.policyLoanRate, 'policyLoanRate')}
                onChange={(e) => handleNumberChange('policyLoanRate', e.target.value)}
                onFocus={() => handleFocus('policyLoanRate')}
                onBlur={handleBlur}
                placeholder="이자율을 입력하세요 (예: 2.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gracePeriod">거치기간 (년)</Label>
              <Input
                id="gracePeriod"
                type="text"
                value={formatInteger(value.gracePeriod, 'gracePeriod')}
                onChange={(e) => handleNumberChange('gracePeriod', e.target.value)}
                onFocus={() => handleFocus('gracePeriod')}
                onBlur={handleBlur}
                placeholder="거치기간을 입력하세요 (예: 2)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repaymentPeriod">원금상환기간 (년)</Label>
              <Input
                id="repaymentPeriod"
                type="text"
                value={formatInteger(value.repaymentPeriod, 'repaymentPeriod')}
                onChange={(e) => handleNumberChange('repaymentPeriod', e.target.value)}
                onFocus={() => handleFocus('repaymentPeriod')}
                onBlur={handleBlur}
                placeholder="상환기간을 입력하세요 (예: 5)"
              />
            </div>
          </CardContent>
        </Card>

        {/* 기타 채무 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 기타 채무
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="otherDebtAmount">기타채무액 (억원)</Label>
              <Input
                id="otherDebtAmount"
                type="text"
                value={formatNumber(value.otherDebtAmount, 'otherDebtAmount')}
                onChange={(e) => handleInputChange('otherDebtAmount', e.target.value)}
                onFocus={() => handleFocus('otherDebtAmount')}
                onBlur={handleBlur}
                placeholder="기타채무액을 입력하세요 (예: 10 또는 10.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebtRate">기타채무 이자율 (%)</Label>
              <Input
                id="otherDebtRate"
                type="text"
                value={formatPercentage(value.otherDebtRate, 'otherDebtRate')}
                onChange={(e) => handleNumberChange('otherDebtRate', e.target.value)}
                onFocus={() => handleFocus('otherDebtRate')}
                onBlur={handleBlur}
                placeholder="이자율을 입력하세요 (예: 5.0)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebtGracePeriod">기타채무 거치기간 (년)</Label>
              <Input
                id="otherDebtGracePeriod"
                type="text"
                value={formatInteger(value.otherDebtGracePeriod, 'otherDebtGracePeriod')}
                onChange={(e) => handleNumberChange('otherDebtGracePeriod', e.target.value)}
                onFocus={() => handleFocus('otherDebtGracePeriod')}
                onBlur={handleBlur}
                placeholder="거치기간을 입력하세요 (예: 1)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebtRepaymentPeriod">기타채무 상환기간 (년)</Label>
              <Input
                id="otherDebtRepaymentPeriod"
                type="text"
                value={formatInteger(value.otherDebtRepaymentPeriod, 'otherDebtRepaymentPeriod')}
                onChange={(e) => handleNumberChange('otherDebtRepaymentPeriod', e.target.value)}
                onFocus={() => handleFocus('otherDebtRepaymentPeriod')}
                onBlur={handleBlur}
                placeholder="상환기간을 입력하세요 (예: 3)"
              />
            </div>
          </CardContent>
        </Card>

        {/* 고급 설정 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ 고급 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="revenueGrowthRate">매출성장률 (%)</Label>
              <Input
                id="revenueGrowthRate"
                type="text"
                value={formatPercentage(value.revenueGrowthRate, 'revenueGrowthRate')}
                onChange={(e) => handleNumberChange('revenueGrowthRate', e.target.value)}
                onFocus={() => handleFocus('revenueGrowthRate')}
                onBlur={handleBlur}
                placeholder="매출성장률을 입력하세요 (예: 10 또는 10.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costInflationRate">비용상승률 (%)</Label>
              <Input
                id="costInflationRate"
                type="text"
                value={formatPercentage(value.costInflationRate, 'costInflationRate')}
                onChange={(e) => handleNumberChange('costInflationRate', e.target.value)}
                onFocus={() => handleFocus('costInflationRate')}
                onBlur={handleBlur}
                placeholder="비용상승률을 입력하세요 (예: 3 또는 3.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">법인세율 (%)</Label>
              <Input
                id="taxRate"
                type="text"
                value={formatPercentage(value.taxRate, 'taxRate')}
                onChange={(e) => handleNumberChange('taxRate', e.target.value)}
                onFocus={() => handleFocus('taxRate')}
                onBlur={handleBlur}
                placeholder="법인세율을 입력하세요 (예: 22 또는 22.5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenarioType">시나리오 타입</Label>
              <Select
                value={value.scenarioType}
                onValueChange={(newValue) => handleChange('scenarioType', newValue)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="시나리오 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pessimistic">비관적</SelectItem>
                  <SelectItem value="neutral">중립적</SelectItem>
                  <SelectItem value="optimistic">낙관적</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
} 
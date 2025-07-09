'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InvestmentInput } from '@/types/investment.types';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EnhancedNumberInput } from '@/components/ui/enhanced-number-input';

interface InvestmentInputFormProps {
  value: InvestmentInput;
  onChange: (input: InvestmentInput) => void;
}

export default function InvestmentInputForm({ value, onChange }: InvestmentInputFormProps) {
  const handleFieldChange = (field: keyof InvestmentInput, newValue: number | string) => {
    onChange({
      ...value,
      [field]: newValue
    });
  };

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
              <EnhancedNumberInput
                id="initialInvestment"
                value={value.initialInvestment}
                onChange={(val) => handleFieldChange('initialInvestment', val)}
                format="billion"
                placeholder="투자금을 입력하세요 (예: 50 또는 50.5)"
                min={0}
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
              <EnhancedNumberInput
                id="policyFundAmount"
                value={value.policyFundAmount}
                onChange={(val) => handleFieldChange('policyFundAmount', val)}
                format="billion"
                placeholder="정책자금 규모를 입력하세요 (예: 30 또는 30.5)"
                min={0}
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
              <EnhancedNumberInput
                id="annualRevenue"
                value={value.annualRevenue}
                onChange={(val) => handleFieldChange('annualRevenue', val)}
                format="billion"
                placeholder="연간 예상 매출을 입력하세요 (예: 100 또는 100.5)"
                min={0}
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
              <EnhancedNumberInput
                id="operatingProfitRate"
                value={value.operatingProfitRate}
                onChange={(val) => handleFieldChange('operatingProfitRate', val)}
                format="percentage"
                placeholder="영업이익률을 입력하세요 (예: 15 또는 15.5)"
                min={0}
                max={100}
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
              <EnhancedNumberInput
                id="discountRate"
                value={value.discountRate}
                onChange={(val) => handleFieldChange('discountRate', val)}
                format="percentage"
                placeholder="할인율을 입력하세요 (예: 10 또는 10.5)"
                min={0}
                max={100}
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
              <EnhancedNumberInput
                id="analysisYears"
                value={value.analysisYears}
                onChange={(val) => handleFieldChange('analysisYears', val)}
                format="integer"
                placeholder="분석 기간을 입력하세요 (예: 10)"
                min={1}
                max={30}
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
              <EnhancedNumberInput
                id="policyLoanAmount"
                value={value.policyLoanAmount}
                onChange={(val) => handleFieldChange('policyLoanAmount', val)}
                format="billion"
                placeholder="대출액을 입력하세요 (예: 20 또는 20.5)"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policyLoanRate">정책자금 이자율 (%)</Label>
              <EnhancedNumberInput
                id="policyLoanRate"
                value={value.policyLoanRate}
                onChange={(val) => handleFieldChange('policyLoanRate', val)}
                format="percentage"
                placeholder="이자율을 입력하세요 (예: 2.5)"
                min={0}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gracePeriod">거치기간 (년)</Label>
              <EnhancedNumberInput
                id="gracePeriod"
                value={value.gracePeriod}
                onChange={(val) => handleFieldChange('gracePeriod', val)}
                format="integer"
                placeholder="거치기간을 입력하세요 (예: 2)"
                min={0}
                max={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repaymentPeriod">원금상환기간 (년)</Label>
              <EnhancedNumberInput
                id="repaymentPeriod"
                value={value.repaymentPeriod}
                onChange={(val) => handleFieldChange('repaymentPeriod', val)}
                format="integer"
                placeholder="상환기간을 입력하세요 (예: 5)"
                min={1}
                max={20}
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
              <EnhancedNumberInput
                id="otherDebtAmount"
                value={value.otherDebtAmount}
                onChange={(val) => handleFieldChange('otherDebtAmount', val)}
                format="billion"
                placeholder="기타채무액을 입력하세요 (예: 10 또는 10.5)"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebtRate">기타채무 이자율 (%)</Label>
              <EnhancedNumberInput
                id="otherDebtRate"
                value={value.otherDebtRate}
                onChange={(val) => handleFieldChange('otherDebtRate', val)}
                format="percentage"
                placeholder="이자율을 입력하세요 (예: 5.0)"
                min={0}
                max={30}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebtGracePeriod">기타채무 거치기간 (년)</Label>
              <EnhancedNumberInput
                id="otherDebtGracePeriod"
                value={value.otherDebtGracePeriod}
                onChange={(val) => handleFieldChange('otherDebtGracePeriod', val)}
                format="integer"
                placeholder="거치기간을 입력하세요 (예: 1)"
                min={0}
                max={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebtRepaymentPeriod">기타채무 상환기간 (년)</Label>
              <EnhancedNumberInput
                id="otherDebtRepaymentPeriod"
                value={value.otherDebtRepaymentPeriod}
                onChange={(val) => handleFieldChange('otherDebtRepaymentPeriod', val)}
                format="integer"
                placeholder="상환기간을 입력하세요 (예: 3)"
                min={1}
                max={20}
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
              <EnhancedNumberInput
                id="revenueGrowthRate"
                value={value.revenueGrowthRate}
                onChange={(val) => handleFieldChange('revenueGrowthRate', val)}
                format="percentage"
                placeholder="매출성장률을 입력하세요 (예: 10 또는 10.5)"
                min={-50}
                max={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costInflationRate">비용상승률 (%)</Label>
              <EnhancedNumberInput
                id="costInflationRate"
                value={value.costInflationRate}
                onChange={(val) => handleFieldChange('costInflationRate', val)}
                format="percentage"
                placeholder="비용상승률을 입력하세요 (예: 3 또는 3.5)"
                min={0}
                max={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">법인세율 (%)</Label>
              <EnhancedNumberInput
                id="taxRate"
                value={value.taxRate}
                onChange={(val) => handleFieldChange('taxRate', val)}
                format="percentage"
                placeholder="법인세율을 입력하세요 (예: 22 또는 22.5)"
                min={0}
                max={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenarioType">시나리오 타입</Label>
              <Select
                value={value.scenarioType}
                onValueChange={(newValue) => handleFieldChange('scenarioType', newValue)}
              >
                <SelectTrigger id="scenarioType">
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
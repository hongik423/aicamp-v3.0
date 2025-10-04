'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { InvestmentInput } from '@/types/investment.types';
import { Info, TrendingUp, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EnhancedNumberInput } from '@/components/ui/enhanced-number-input';

interface InvestmentInputFormProps {
  value: InvestmentInput;
  /**
   * 변경된 필드만 포함하는 부분 업데이트 콜백
   * 전체 객체를 다시 전달하면 동시 입력 시 다른 필드 값이 덮어써지는 문제가 발생하므로
   * Partial 타입으로 변경하여 병합 업데이트를 수행하도록 처리합니다.
   */
  onChange: (partial: Partial<InvestmentInput>) => void;
  onAnalyze?: () => void;
  isAnalyzing?: boolean;
}

export default function InvestmentInputForm({ value, onChange, onAnalyze, isAnalyzing = false }: InvestmentInputFormProps) {
  const handleFieldChange = (field: keyof InvestmentInput, newValue: number | string) => {
    // 변경된 필드만 전달하여 상위 컴포넌트에서 병합하도록 함
    onChange({ [field]: newValue });
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

        {/* 투자분석시작 버튼 - 입력 폼 하단 */}
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5 mr-2" />
                🚀 투자분석 시작
              </>
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
} 
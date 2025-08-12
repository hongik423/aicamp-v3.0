'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Zap,
  BarChart3,
  Download,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface ROICalculatorProps {
  onConsultationRequest?: (calculationData: any) => void;
}

interface CalculationResult {
  annualSavings: number;
  roi: number;
  paybackMonths: number;
  threeYearValue: number;
  monthlySavings: number;
}

// 업종별 자동화 승수
const industryMultipliers: { [key: string]: number } = {
  manufacturing: 1.2,
  service: 1.0,
  finance: 1.1,
  healthcare: 0.9,
  logistics: 1.3,
  education: 0.8,
  retail: 1.1,
  construction: 0.9
};

// 회사 규모별 효율성 계수
const companySizeMultipliers: { [key: string]: number } = {
  startup: 0.8,
  small: 1.0,
  medium: 1.2,
  large: 1.4
};

export default function ROICalculator({ onConsultationRequest }: ROICalculatorProps) {
  const [formData, setFormData] = useState({
    industry: '',
    companySize: '',
    currentManualHours: 40,
    hourlyRate: 30000,
    automationInvestment: 50000000,
    automationPercentage: 80,
    employeeCount: 50
  });

  const [showResults, setShowResults] = useState(false);

  // ROI 계산 로직
  const calculation = useMemo((): CalculationResult => {
    const industryMultiplier = industryMultipliers[formData.industry] || 1.0;
    const sizeMultiplier = companySizeMultipliers[formData.companySize] || 1.0;
    
    // 주간 절약 시간
    const weeklyTimeSaved = formData.currentManualHours * (formData.automationPercentage / 100);
    
    // 연간 절약 비용 (52주 기준)
    const annualSavings = weeklyTimeSaved * formData.hourlyRate * 52 * industryMultiplier * sizeMultiplier;
    
    // ROI 계산
    const roi = ((annualSavings - formData.automationInvestment) / formData.automationInvestment) * 100;
    
    // 회수 기간 (개월)
    const paybackMonths = Math.ceil(formData.automationInvestment / (annualSavings / 12));
    
    // 3년 총 가치
    const threeYearValue = annualSavings * 3 - formData.automationInvestment;
    
    // 월간 절약
    const monthlySavings = annualSavings / 12;

    return {
      annualSavings,
      roi: Math.round(roi),
      paybackMonths: Math.max(1, paybackMonths),
      threeYearValue,
      monthlySavings
    };
  }, [formData]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleConsultationClick = () => {
    if (onConsultationRequest) {
      onConsultationRequest({
        ...formData,
        calculation,
        timestamp: new Date().toISOString()
      });
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`;
    } else {
      return `${amount.toLocaleString()}원`;
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">AI 자동화 ROI 계산기</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          우리 회사에 AI 자동화를 도입했을 때의 예상 효과를 미리 계산해보세요
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 입력 폼 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              기본 정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 업종 선택 */}
            <div className="space-y-2">
              <Label htmlFor="industry">업종</Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="업종을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">제조업</SelectItem>
                  <SelectItem value="service">서비스업</SelectItem>
                  <SelectItem value="finance">금융업</SelectItem>
                  <SelectItem value="healthcare">의료/헬스케어</SelectItem>
                  <SelectItem value="logistics">물류/유통</SelectItem>
                  <SelectItem value="education">교육/연구</SelectItem>
                  <SelectItem value="retail">소매/유통</SelectItem>
                  <SelectItem value="construction">건설/부동산</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 회사 규모 */}
            <div className="space-y-2">
              <Label htmlFor="companySize">회사 규모</Label>
              <Select value={formData.companySize} onValueChange={(value) => setFormData({...formData, companySize: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="회사 규모를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">스타트업 (1-10명)</SelectItem>
                  <SelectItem value="small">소기업 (11-50명)</SelectItem>
                  <SelectItem value="medium">중기업 (51-300명)</SelectItem>
                  <SelectItem value="large">대기업 (300명 이상)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 현재 수작업 시간 */}
            <div className="space-y-3">
              <Label>주간 수작업 시간</Label>
              <div className="space-y-2">
                <Slider
                  value={[formData.currentManualHours]}
                  onValueChange={(value) => setFormData({...formData, currentManualHours: value[0]})}
                  max={80}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>5시간</span>
                  <span className="font-medium">{formData.currentManualHours}시간/주</span>
                  <span>80시간</span>
                </div>
              </div>
            </div>

            {/* 시간당 비용 */}
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">시간당 인건비 (원)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({...formData, hourlyRate: parseInt(e.target.value) || 0})}
                placeholder="30000"
              />
              <p className="text-sm text-gray-500">
                평균 시급: 일반직 25,000원, 관리직 40,000원, 전문직 60,000원
              </p>
            </div>

            {/* 자동화 투자 비용 */}
            <div className="space-y-2">
              <Label htmlFor="investment">자동화 투자 비용 (원)</Label>
              <Input
                id="investment"
                type="number"
                value={formData.automationInvestment}
                onChange={(e) => setFormData({...formData, automationInvestment: parseInt(e.target.value) || 0})}
                placeholder="50000000"
              />
              <p className="text-sm text-gray-500">
                일반적 범위: 기본형 3천만원, 고급형 1억원, 전사 확산 3억원
              </p>
            </div>

            {/* 자동화 비율 */}
            <div className="space-y-3">
              <Label>예상 자동화 비율</Label>
              <div className="space-y-2">
                <Slider
                  value={[formData.automationPercentage]}
                  onValueChange={(value) => setFormData({...formData, automationPercentage: value[0]})}
                  max={95}
                  min={30}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>30%</span>
                  <span className="font-medium">{formData.automationPercentage}%</span>
                  <span>95%</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCalculate} 
              className="w-full" 
              size="lg"
              disabled={!formData.industry || !formData.companySize}
            >
              <Calculator className="w-5 h-5 mr-2" />
              ROI 계산하기
            </Button>
          </CardContent>
        </Card>

        {/* 계산 결과 */}
        <Card className={showResults ? 'border-green-200 bg-green-50/30' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              계산 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>좌측 정보를 입력하고 계산해보세요</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 핵심 지표 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{calculation.roi}%</div>
                    <div className="text-sm text-gray-600">연간 ROI</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{calculation.paybackMonths}개월</div>
                    <div className="text-sm text-gray-600">투자 회수 기간</div>
                  </div>
                </div>

                {/* 상세 수치 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">월간 절약</span>
                    </div>
                    <span className="font-bold text-yellow-600">
                      {formatCurrency(calculation.monthlySavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">연간 절약</span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(calculation.annualSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">3년 총 가치</span>
                    </div>
                    <span className="font-bold text-purple-600">
                      {formatCurrency(calculation.threeYearValue)}
                    </span>
                  </div>
                </div>

                {/* ROI 등급 */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">투자 등급</span>
                    {calculation.roi > 300 ? (
                      <Badge className="bg-green-500">매우 우수</Badge>
                    ) : calculation.roi > 200 ? (
                      <Badge className="bg-blue-500">우수</Badge>
                    ) : calculation.roi > 100 ? (
                      <Badge className="bg-yellow-500">양호</Badge>
                    ) : (
                      <Badge variant="secondary">검토 필요</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {calculation.roi > 300 && "투자 대비 매우 높은 수익이 예상됩니다. 즉시 도입을 권장합니다."}
                    {calculation.roi > 200 && calculation.roi <= 300 && "투자 대비 높은 수익이 예상됩니다. 도입을 적극 권장합니다."}
                    {calculation.roi > 100 && calculation.roi <= 200 && "투자 대비 양호한 수익이 예상됩니다. 단계적 도입을 고려하세요."}
                    {calculation.roi <= 100 && "추가 분석이 필요합니다. 전문가와 상담해보세요."}
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    결과 저장
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    결과 공유
                  </Button>
                </div>

                <Button 
                  onClick={handleConsultationClick}
                  className="w-full" 
                  size="lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  전문가 상담 신청
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 참고 정보 */}
      {showResults && (
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-3">💡 계산 참고사항</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• 업종별 자동화 효율성이 반영되었습니다 (제조업 +20%, 물류 +30% 등)</p>
              <p>• 회사 규모에 따른 효율성 계수가 적용되었습니다</p>
              <p>• 실제 결과는 구현 방식, 직원 적응도 등에 따라 달라질 수 있습니다</p>
              <p>• 정확한 분석을 위해서는 전문가와의 상담을 권장합니다</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

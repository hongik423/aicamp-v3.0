'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PremiumDiagnosisReportComponent from '@/components/diagnosis/PremiumDiagnosisReport';
import { PremiumDiagnosisRequest } from '@/lib/utils/premiumDiagnosisEngine';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react';

const INDUSTRY_OPTIONS = [
  { value: 'manufacturing', label: '제조업' },
  { value: 'it', label: 'IT/소프트웨어' },
  { value: 'service', label: '서비스업' },
  { value: 'retail', label: '유통/소매업' },
  { value: 'food', label: '외식업' },
  { value: 'healthcare', label: '의료/헬스케어' },
  { value: 'education', label: '교육업' },
  { value: 'finance', label: '금융업' },
  { value: 'construction', label: '건설업' },
  { value: 'other', label: '기타' }
];

const EMPLOYEE_COUNT_OPTIONS = [
  { value: '1-5명', label: '1-5명 (스타트업)' },
  { value: '6-20명', label: '6-20명 (소기업)' },
  { value: '21-50명', label: '21-50명 (중소기업)' },
  { value: '51-100명', label: '51-100명 (중견기업)' },
  { value: '101명 이상', label: '101명 이상 (대기업)' }
];

const CONSULTING_AREAS = [
  { id: 'digital-transformation', label: '디지털 전환' },
  { id: 'marketing-strategy', label: '마케팅 전략' },
  { id: 'operational-efficiency', label: '운영 효율화' },
  { id: 'business-model', label: '비즈니스 모델 혁신' },
  { id: 'customer-service', label: '고객 서비스 개선' },
  { id: 'financial-management', label: '재무 관리' },
  { id: 'hr-management', label: '인사 관리' },
  { id: 'market-expansion', label: '시장 확대' }
];

export default function PremiumDiagnosisTestPage() {
  const [step, setStep] = useState<'form' | 'report'>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [diagnosisRequest, setDiagnosisRequest] = useState<PremiumDiagnosisRequest | null>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    businessDescription: '',
    consultingAreas: [] as string[],
    expectations: '',
    specificRequests: '',
    businessChallenges: ''
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConsultingAreaChange = (areaId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consultingAreas: checked 
        ? [...prev.consultingAreas, areaId]
        : prev.consultingAreas.filter(id => id !== areaId)
    }));
  };

  const generateMockScores = () => {
    // 업종별 특성을 반영한 모의 점수 생성
    const baseScores = {
      businessModel: 60 + Math.random() * 30,
      marketPosition: 55 + Math.random() * 35,
      operationalEfficiency: 65 + Math.random() * 25,
      growthPotential: 50 + Math.random() * 40,
      digitalReadiness: 45 + Math.random() * 35,
      financialHealth: 60 + Math.random() * 30
    };

    // 업종별 조정
    if (formData.industry === 'it') {
      baseScores.digitalReadiness += 20;
      baseScores.growthPotential += 15;
    } else if (formData.industry === 'manufacturing') {
      baseScores.operationalEfficiency += 15;
      baseScores.financialHealth += 10;
    }

    // 0-100 범위로 정규화
    Object.keys(baseScores).forEach(key => {
      baseScores[key as keyof typeof baseScores] = Math.min(100, Math.max(0, baseScores[key as keyof typeof baseScores]));
    });

    return baseScores;
  };

  const generateDetailedScores = () => {
    const detailedScores: Record<string, number> = {};
    
    // 20개 문항의 상세 점수 생성
    for (let i = 1; i <= 20; i++) {
      detailedScores[`question_${i}`] = Math.floor(Math.random() * 5) + 1; // 1-5점
    }
    
    return detailedScores;
  };

  const handleGenerateReport = async () => {
    if (!formData.companyName || !formData.industry || !formData.businessDescription) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    setIsGenerating(true);

    try {
      const categoryScores = generateMockScores();
      const totalScore = Math.round(Object.values(categoryScores).reduce((a, b) => a + b, 0) / Object.keys(categoryScores).length);
      
      const request: PremiumDiagnosisRequest = {
        companyName: formData.companyName,
        industry: formData.industry,
        employeeCount: formData.employeeCount,
        businessDescription: formData.businessDescription,
        consultingAreas: formData.consultingAreas,
        expectations: formData.expectations,
        specificRequests: formData.specificRequests,
        businessChallenges: formData.businessChallenges,
        totalScore,
        categoryScores,
        detailedScores: generateDetailedScores()
      };

      setDiagnosisRequest(request);
      
      // 2초 딜레이 후 보고서 표시 (실제 생성 시간 시뮬레이션)
      setTimeout(() => {
        setStep('report');
        setIsGenerating(false);
      }, 2000);
      
    } catch (error) {
      console.error('보고서 생성 오류:', error);
      setIsGenerating(false);
      alert('보고서 생성 중 오류가 발생했습니다.');
    }
  };

  const handleRequestConsultation = () => {
    // 상담 신청 로직
    alert('전문가 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
  };

  const handleDownloadReport = (reportData: any) => {
    // 보고서 다운로드 로직
    console.log('보고서 다운로드:', reportData);
    alert('보고서 다운로드 기능은 개발 중입니다.');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <h3 className="text-xl font-bold">🎯 최고수준 진단 보고서 생성 중...</h3>
            <div className="space-y-2">
              <p className="text-gray-600">업종별 산업분석 데이터 수집</p>
              <p className="text-gray-600">SWOT 전략 매트릭스 생성</p>
              <p className="text-gray-600">실행 로드맵 수립</p>
              <p className="text-gray-600">AICAMP 서비스 연계</p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>AI 기반 맞춤형 분석 진행 중</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'report' && diagnosisRequest) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              onClick={() => setStep('form')} 
              variant="outline"
              className="mb-4"
            >
              ← 입력 폼으로 돌아가기
            </Button>
          </div>
          
          <PremiumDiagnosisReportComponent
            diagnosisRequest={diagnosisRequest}
            onRequestConsultation={handleRequestConsultation}
            onDownloadReport={handleDownloadReport}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AICAMP 최고수준 경영진단 시스템
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            업종별 산업분석 · SWOT 전략 매트릭스 · 실행 로드맵이 포함된 프리미엄 보고서
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-1" />
              맞춤형 SWOT 분석
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              실시간 산업 데이터
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-1" />
              전문가 컨설팅 연계
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-1" />
              AI 기반 실행전략
            </Badge>
          </div>
        </div>

        {/* 입력 폼 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span>기업 정보 입력</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">회사명 *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="예: AICAMP 교육센터"
                />
              </div>
              
              <div>
                <Label htmlFor="industry">업종 *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="업종을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeCount">직원 수</Label>
                <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange('employeeCount', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="직원 수를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEE_COUNT_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 사업 설명 */}
            <div>
              <Label htmlFor="businessDescription">사업 설명 *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="주요 사업 내용, 제품/서비스, 고객층 등을 자세히 설명해주세요."
                rows={4}
              />
            </div>

            {/* 컨설팅 분야 */}
            <div>
              <Label>희망 컨설팅 분야 (복수 선택 가능)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {CONSULTING_AREAS.map(area => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={area.id}
                      checked={formData.consultingAreas.includes(area.id)}
                      onCheckedChange={(checked) => handleConsultingAreaChange(area.id, !!checked)}
                    />
                    <Label htmlFor={area.id} className="text-sm">
                      {area.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* 기대사항 및 요청사항 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectations">기대사항</Label>
                <Textarea
                  id="expectations"
                  value={formData.expectations}
                  onChange={(e) => handleInputChange('expectations', e.target.value)}
                  placeholder="진단을 통해 얻고자 하는 것들을 구체적으로 적어주세요."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="specificRequests">특별 요청사항</Label>
                <Textarea
                  id="specificRequests"
                  value={formData.specificRequests}
                  onChange={(e) => handleInputChange('specificRequests', e.target.value)}
                  placeholder="특별히 중점적으로 분석하고 싶은 부분이 있다면 적어주세요."
                  rows={3}
                />
              </div>
            </div>

            {/* 비즈니스 과제 */}
            <div>
              <Label htmlFor="businessChallenges">현재 직면한 비즈니스 과제</Label>
              <Textarea
                id="businessChallenges"
                value={formData.businessChallenges}
                onChange={(e) => handleInputChange('businessChallenges', e.target.value)}
                placeholder="현재 겪고 있는 어려움이나 해결하고 싶은 문제들을 자세히 설명해주세요."
                rows={4}
              />
            </div>

            {/* 제출 버튼 */}
            <div className="text-center pt-6">
              <Button
                onClick={handleGenerateReport}
                disabled={!formData.companyName || !formData.industry || !formData.businessDescription}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                최고수준 진단 보고서 생성하기
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                * 표시된 항목은 필수 입력 사항입니다
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 기능 소개 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">맞춤형 SWOT 분석</h3>
            <p className="text-sm text-gray-600">
              업종별 특성과 신청자 요청사항을 반영한 SO/WO/ST/WT 전략 매트릭스
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">실시간 산업 분석</h3>
            <p className="text-sm text-gray-600">
              최신 산업 트렌드와 경쟁사 분석을 통한 시장 위치 진단
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">실행 로드맵</h3>
            <p className="text-sm text-gray-600">
              단계별 실행 계획과 AICAMP 서비스 연계 맞춤형 추천
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 
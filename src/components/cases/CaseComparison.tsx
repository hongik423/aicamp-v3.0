'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  BarChart3,
  Target,
  Award,
  ArrowRight,
  X
} from 'lucide-react';

interface CaseComparisonProps {
  currentCase: any;
  allCases: any[];
}

export default function CaseComparison({ currentCase, allCases }: CaseComparisonProps) {
  const [selectedCases, setSelectedCases] = useState<string[]>([currentCase.id]);
  const [showComparison, setShowComparison] = useState(false);

  // 안전한 배열 접근
  const safeAllCases = Array.isArray(allCases) ? allCases : [];

  const handleCaseSelect = (caseId: string) => {
    if (selectedCases.includes(caseId)) {
      setSelectedCases(selectedCases.filter(id => id !== caseId));
    } else {
      setSelectedCases([...selectedCases, caseId]);
    }
  };

  const getComparisonCases = () => {
    return safeAllCases.filter(caseItem => selectedCases.includes(caseItem.id));
  };

  const getMetricValue = (caseData: any, metric: string) => {
    const result = caseData.results?.quantitative?.find((r: any) => 
      r.metric.includes(metric)
    );
    return result ? result.after : 'N/A';
  };

  const getFinancialValue = (caseData: any, item: string) => {
    const result = caseData.results?.financial?.find((r: any) => 
      r.item.includes(item)
    );
    return result ? result.amount : 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* 사례 선택 */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            성공사례 비교
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              비교하고 싶은 성공사례를 선택하세요 (최대 3개)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {safeAllCases.slice(0, 6).map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCases.includes(caseItem.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleCaseSelect(caseItem.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {caseItem.companyName}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {caseItem.industry}
                      </p>
                    </div>
                    {selectedCases.includes(caseItem.id) && (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setShowComparison(true)}
              disabled={selectedCases.length < 2}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              비교 분석 시작
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCases([currentCase.id]);
                setShowComparison(false);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 비교 결과 */}
      {showComparison && (
        <div className="space-y-6">
          {/* 핵심 지표 비교 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-green-600 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                핵심 성과 지표 비교
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">지표</th>
                      {getComparisonCases().map((caseItem) => (
                        <th key={caseItem.id} className="text-center p-3 font-semibold">
                          {caseItem.companyName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">업무 효율성</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {getMetricValue(caseItem, '효율성')}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">시간 단축</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {getMetricValue(caseItem, '시간')}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">매출 증가</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {getMetricValue(caseItem, '매출')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">고객 만족도</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {getMetricValue(caseItem, '만족도')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 재무 성과 비교 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-purple-600 flex items-center">
                <DollarSign className="w-6 h-6 mr-2" />
                재무 성과 비교
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">항목</th>
                      {getComparisonCases().map((caseItem) => (
                        <th key={caseItem.id} className="text-center p-3 font-semibold">
                          {caseItem.companyName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">연간 절감/증대</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {getFinancialValue(caseItem, '절감')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">ROI</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {getFinancialValue(caseItem, 'ROI')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 업종별 분포 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-600 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                업종별 분포
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getComparisonCases().map((caseItem) => (
                  <div key={caseItem.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border">
                    <div className="flex items-center mb-3">
                      <Award className="w-5 h-5 text-indigo-600 mr-2" />
                      <h4 className="font-semibold text-indigo-800">{caseItem.industry}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">기업:</span>
                        <span className="font-medium ml-2">{caseItem.companyName}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">직원 수:</span>
                        <span className="font-medium ml-2">{caseItem.companyInfo?.employees}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">매출:</span>
                        <span className="font-medium ml-2">{caseItem.companyInfo?.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 교육 과정 비교 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-600 flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                교육 과정 비교
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">과정</th>
                      {getComparisonCases().map((caseItem) => (
                        <th key={caseItem.id} className="text-center p-3 font-semibold">
                          {caseItem.companyName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">기초 과정</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {caseItem.curriculum?.basic?.length || 0}개 과정
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">심화 과정</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {caseItem.curriculum?.advanced?.length || 0}개 과정
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">경영진 과정</td>
                      {getComparisonCases().map((caseItem) => (
                        <td key={caseItem.id} className="text-center p-3">
                          {caseItem.curriculum?.executive?.length || 0}개 과정
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

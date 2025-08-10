'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface CaseVisualizationProps {
  caseData: any;
}

export default function CaseVisualization({ caseData }: CaseVisualizationProps) {
  // 성과 지표 계산
  const calculateImprovement = (before: string, after: string) => {
    const beforeNum = parseFloat(before.replace(/[^\d.-]/g, ''));
    const afterNum = parseFloat(after.replace(/[^\d.-]/g, ''));
    const improvement = ((afterNum - beforeNum) / beforeNum) * 100;
    return improvement;
  };

  // 진행률 계산 (예시)
  const getProgressPercentage = (phase: string) => {
    const phaseMap: { [key: string]: number } = {
      '1단계': 25,
      '2단계': 50,
      '3단계': 75,
      '4단계': 100
    };
    return phaseMap[phase] || 0;
  };

  return (
    <div className="space-y-6">
      {/* 핵심 성과 지표 */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            핵심 성과 지표
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseData.results?.quantitative?.map((metric: any, index: number) => {
              const improvement = calculateImprovement(metric.before, metric.after);
              const isPositive = improvement > 0;
              
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{metric.metric}</span>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">이전</span>
                      <span className="font-medium">{metric.before}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">이후</span>
                      <span className="font-medium text-blue-600">{metric.after}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">개선</span>
                      <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{improvement.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 프로세스 타임라인 */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-purple-600 flex items-center">
            <Activity className="w-6 h-6 mr-2" />
            프로세스 타임라인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* 타임라인 라인 */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {caseData.process?.map((phase: any, index: number) => (
                <div key={index} className="relative flex items-start">
                  {/* 타임라인 포인트 */}
                  <div className="absolute left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2"></div>
                  
                  <div className="ml-16 flex-1">
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                        <Badge variant="outline" className="text-purple-600 border-purple-600">
                          {phase.duration}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">주요 활동:</h5>
                        <ul className="space-y-1">
                          {phase.activities?.map((activity: string, actIndex: number) => (
                            <li key={actIndex} className="text-sm text-gray-600 flex items-start">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">성과:</h5>
                        <div className="flex flex-wrap gap-2">
                          {phase.results?.map((result: string, resIndex: number) => (
                            <Badge key={resIndex} variant="secondary" className="text-xs">
                              {result}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 재무 성과 시각화 */}
      {caseData.results?.financial && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-green-600 flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              재무 성과 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseData.results.financial.map((result: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {index === caseData.results.financial.length - 1 ? 'ROI' : '절감/증대'}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {result.amount}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.item}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SWOT 분석 시각화 */}
      {caseData.results?.qualitative && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-indigo-600 flex items-center">
              <PieChart className="w-6 h-6 mr-2" />
              SWOT 분석 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Strengths */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-800">강점 (S)</h4>
                </div>
                <ul className="space-y-2">
                  {caseData.results.qualitative.slice(0, 2).map((item: string, index: number) => (
                    <li key={index} className="text-sm text-green-700 flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-lg border">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-800">약점 (W)</h4>
                </div>
                <ul className="space-y-2">
                  {caseData.results.qualitative.slice(2, 4).map((item: string, index: number) => (
                    <li key={index} className="text-sm text-red-700 flex items-start">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">기회 (O)</h4>
                </div>
                <ul className="space-y-2">
                  {caseData.results.qualitative.slice(4, 6).map((item: string, index: number) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                  <h4 className="font-semibold text-orange-800">위협 (T)</h4>
                </div>
                <ul className="space-y-2">
                  {caseData.results.qualitative.slice(6, 8).map((item: string, index: number) => (
                    <li key={index} className="text-sm text-orange-700 flex items-start">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

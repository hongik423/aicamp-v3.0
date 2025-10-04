'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AlertCircle, TrendingUp, Award, Target } from 'lucide-react';

interface DiagnosisData {
  companyName: string;
  totalScore: number;
  grade: string;
  percentile: number;
  categoryScores: {
    currentAI: number;
    organizationReadiness: number;
    techInfra: number;
    dataManagement: number;
    strategicPlanning: number;
  };
  assessmentResponses?: Record<string, number>;
}

interface DataConnectedVisualizationProps {
  diagnosisData: DiagnosisData;
  industryBenchmark?: Record<string, number>;
}

/**
 * 실제 데이터와 연계된 진단 결과 시각화 컴포넌트
 * 신청서 평가 점수를 정확히 반영
 */
export default function DataConnectedVisualization({ 
  diagnosisData, 
  industryBenchmark 
}: DataConnectedVisualizationProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div>Loading visualization...</div>;
  }
  
  // 카테고리명 한글 변환
  const categoryNames: Record<string, string> = {
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfra: '기술 인프라',
    dataManagement: '데이터 관리',
    strategicPlanning: '전략 계획'
  };
  
  // 레이더 차트용 데이터 준비
  const radarData = Object.entries(diagnosisData.categoryScores).map(([key, value]) => ({
    category: categoryNames[key] || key,
    score: value,
    benchmark: industryBenchmark?.[key] || 3.0,
    fullMark: 5
  }));
  
  // 막대 차트용 데이터 준비
  const barData = Object.entries(diagnosisData.categoryScores).map(([key, value]) => ({
    name: categoryNames[key] || key,
    '우리 회사': value,
    '업계 평균': industryBenchmark?.[key] || 3.0
  }));
  
  // 백분위 텍스트 생성 (논리적 오류 수정)
  const getPercentileText = () => {
    if (diagnosisData.totalScore === 0) {
      return '하위 5%';
    }
    if (diagnosisData.percentile >= 50) {
      return `상위 ${100 - diagnosisData.percentile}%`;
    }
    return `하위 ${diagnosisData.percentile}%`;
  };
  
  // 점수에 따른 색상 클래스 결정
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // 등급별 배지 색상
  const getGradeBadgeColor = (grade: string) => {
    switch(grade) {
      case 'S': return 'bg-purple-500';
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* 경고 메시지 - 데이터 연계 확인 */}
      {diagnosisData.totalScore === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-yellow-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-yellow-800">초기 진단 단계</p>
            <p className="text-yellow-700 text-sm mt-1">
              귀사는 AI 도입 초기 단계입니다. 체계적인 접근을 통해 빠른 성장이 가능합니다.
            </p>
          </div>
        </div>
      )}
      
      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">종합 점수</p>
              <p className={`text-3xl font-bold mt-2 ${getScoreColorClass(diagnosisData.totalScore)}`}>
                {diagnosisData.totalScore}점
              </p>
              <p className="text-xs text-gray-500 mt-1">100점 만점</p>
            </div>
            <Award className="text-gray-400" size={32} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AI 성숙도</p>
              <div className={`inline-block px-3 py-1 rounded-full text-white font-bold mt-2 ${getGradeBadgeColor(diagnosisData.grade)}`}>
                {diagnosisData.grade}등급
              </div>
              <p className="text-xs text-gray-500 mt-1">{getMaturityLevelName(diagnosisData.totalScore)}</p>
            </div>
            <Target className="text-gray-400" size={32} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">업계 순위</p>
              <p className="text-2xl font-bold mt-2">{getPercentileText()}</p>
              <p className="text-xs text-gray-500 mt-1">동종업계 기준</p>
            </div>
            <TrendingUp className="text-gray-400" size={32} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">개선 잠재력</p>
              <p className="text-2xl font-bold mt-2 text-green-600">
                {Math.max(0, 100 - diagnosisData.totalScore)}점
              </p>
              <p className="text-xs text-gray-500 mt-1">성장 가능 점수</p>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </Card>
      </div>
      
      {/* 레이더 차트 - 영역별 점수 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">영역별 역량 분석</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />
            <Radar 
              name="현재 수준" 
              dataKey="score" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6} 
            />
            <Radar 
              name="업계 평균" 
              dataKey="benchmark" 
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.3} 
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
      
      {/* 막대 차트 - 벤치마크 비교 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">벤치마크 비교 분석</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
            <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="우리 회사" fill="#3b82f6" />
            <Bar dataKey="업계 평균" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      {/* 상세 점수 테이블 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">영역별 상세 점수</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">평가 영역</th>
                <th className="text-center py-2">현재 점수</th>
                <th className="text-center py-2">업계 평균</th>
                <th className="text-center py-2">GAP</th>
                <th className="text-center py-2">상태</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(diagnosisData.categoryScores).map(([key, score]) => {
                const benchmark = industryBenchmark?.[key] || 3.0;
                const gap = score - benchmark;
                return (
                  <tr key={key} className="border-b">
                    <td className="py-3">{categoryNames[key]}</td>
                    <td className="text-center font-semibold">{score.toFixed(1)}</td>
                    <td className="text-center">{benchmark.toFixed(1)}</td>
                    <td className={`text-center font-semibold ${gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {gap >= 0 ? '+' : ''}{gap.toFixed(1)}
                    </td>
                    <td className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        gap >= 0.5 ? 'bg-green-100 text-green-800' :
                        gap >= 0 ? 'bg-blue-100 text-blue-800' :
                        gap >= -0.5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {gap >= 0.5 ? '우수' : gap >= 0 ? '양호' : gap >= -0.5 ? '보통' : '미흡'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* 데이터 신뢰도 표시 */}
      <div className="text-center text-sm text-gray-500">
        <p>* 본 진단 결과는 {diagnosisData.companyName}에서 제출한 실제 평가 데이터를 기반으로 생성되었습니다.</p>
        <p>* 진단 ID: {new Date().toISOString().split('T')[0]}-{Math.random().toString(36).substr(2, 9)}</p>
      </div>
    </div>
  );
}

// 헬퍼 함수: 성숙도 레벨 이름
function getMaturityLevelName(score: number): string {
  if (score >= 80) return 'Expert (전문가)';
  if (score >= 60) return 'Advanced (고급)';
  if (score >= 40) return 'Intermediate (중급)';
  if (score >= 20) return 'Beginner (초급)';
  return 'Initial (초기)';
}

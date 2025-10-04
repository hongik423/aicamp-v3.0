'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';

interface DataVisualizationProps {
  data: {
    categoryScores: Record<string, number>;
    benchmarkData: {
      industry: number;
      topPerformers: number;
      current: number;
    };
    trendData: Array<{
      category: string;
      current: number;
      potential: number;
      gap: number;
    }>;
  };
}

export const AdvancedDataVisualization: React.FC<DataVisualizationProps> = ({ data }) => {
  
  // 레이더 차트 SVG 생성
  const RadarChart = ({ scores }: { scores: Record<string, number> }) => {
    const categories = Object.keys(scores);
    const values = Object.values(scores);
    const maxValue = 5;
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    
    // 각 축의 좌표 계산
    const getPoint = (index: number, value: number) => {
      const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
      const r = (value / maxValue) * radius;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle)
      };
    };

    // 배경 그리드 생성
    const gridLevels = [1, 2, 3, 4, 5];
    const axisPoints = categories.map((_, index) => {
      const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    // 데이터 포인트들
    const dataPoints = values.map((value, index) => getPoint(index, value));
    const pathData = dataPoints.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    return (
      <div className="relative">
        <svg width="400" height="400" className="mx-auto">
          {/* 배경 그리드 */}
          {gridLevels.map((level) => (
            <polygon
              key={level}
              points={axisPoints.map(axis => {
                const r = (level / maxValue) * radius;
                const angle = Math.atan2(axis.y - centerY, axis.x - centerX);
                return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
              }).join(' ')}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}
          
          {/* 축 선 */}
          {axisPoints.map((point, index) => (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="#cbd5e1"
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          {/* 데이터 영역 */}
          <path
            d={pathData}
            fill="url(#radarGradient)"
            stroke="#3b82f6"
            strokeWidth="3"
            opacity={0.8}
          />

          {/* 데이터 포인트 */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth="3"
              className="drop-shadow-sm"
            />
          ))}

          {/* 그라데이션 정의 */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>

        {/* 범례 */}
        <div className="absolute inset-0 pointer-events-none">
          {categories.map((category, index) => {
            const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
            const labelRadius = radius + 30;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);
            
            const categoryNames: Record<string, string> = {
              leadership: '경영진\n리더십',
              infrastructure: 'AI\n인프라',
              employeeCapability: '직원\n역량',
              culture: '조직\n문화',
              practicalApplication: '실무\n적용',
              dataCapability: '데이터\n역량'
            };

            return (
              <div
                key={category}
                className="absolute text-xs font-medium text-slate-700 text-center whitespace-pre-line"
                style={{
                  left: `${(x / 400) * 100}%`,
                  top: `${(y / 400) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {categoryNames[category] || category}
                <div className="text-blue-600 font-bold text-sm">
                  {scores[category].toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 벤치마크 바 차트
  const BenchmarkChart = ({ benchmark }: { benchmark: typeof data.benchmarkData }) => {
    const maxScore = Math.max(benchmark.industry, benchmark.topPerformers, benchmark.current);
    const scale = 100 / maxScore;

    return (
      <div className="space-y-6">
        {/* 현재 점수 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">귀사 점수</span>
            <span className="text-lg font-bold text-blue-600">{benchmark.current}점</span>
          </div>
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${benchmark.current * scale}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* 업계 평균 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">업계 평균</span>
            <span className="text-lg font-bold text-slate-500">{benchmark.industry}점</span>
          </div>
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${benchmark.industry * scale}%` }}
            />
          </div>
        </div>

        {/* 상위 10% */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">상위 10%</span>
            <span className="text-lg font-bold text-emerald-600">{benchmark.topPerformers}점</span>
          </div>
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${benchmark.topPerformers * scale}%` }}
            />
          </div>
        </div>

        {/* GAP 분석 */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">업계 평균 대비</p>
              <div className="flex items-center space-x-2 mt-1">
                {benchmark.current > benchmark.industry ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">
                      +{(benchmark.current - benchmark.industry).toFixed(1)}점
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-lg font-bold text-red-600">
                      {(benchmark.current - benchmark.industry).toFixed(1)}점
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">상위 10%까지</p>
              <div className="flex items-center space-x-2 mt-1">
                <Target className="w-4 h-4 text-amber-500" />
                <span className="text-lg font-bold text-amber-600">
                  {(benchmark.topPerformers - benchmark.current).toFixed(1)}점
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 개선 잠재력 차트
  const PotentialChart = ({ trends }: { trends: typeof data.trendData }) => {
    return (
      <div className="space-y-6">
        {trends.map((trend, index) => (
          <div key={trend.category} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-800">{trend.category}</h4>
              <Badge 
                className={`${
                  trend.gap > 1.5 ? 'bg-red-100 text-red-700' :
                  trend.gap > 1.0 ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}
              >
                GAP: {trend.gap.toFixed(1)}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {/* 현재 수준 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-600">현재 수준</span>
                  <span className="text-sm font-bold text-slate-800">{trend.current.toFixed(1)}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full">
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full transition-all duration-1000"
                    style={{ width: `${(trend.current / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* 잠재력 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-600">개선 잠재력</span>
                  <span className="text-sm font-bold text-blue-600">{trend.potential.toFixed(1)}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full">
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                    style={{ width: `${(trend.potential / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* 개선 여지 */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">개선 여지</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  <span className="text-sm font-bold text-amber-600">
                    +{(trend.potential - trend.current).toFixed(1)}점
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* 종합 성과 레이더 차트 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">종합 성과 분석</h3>
          </div>
          <p className="text-slate-600">6개 핵심 영역별 AI 역량 수준</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
            <RadarChart scores={data.categoryScores} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 벤치마크 비교 */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">벤치마크 비교</h3>
                <p className="text-sm text-slate-600">업계 대비 경쟁력 분석</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BenchmarkChart benchmark={data.benchmarkData} />
          </CardContent>
        </Card>

        {/* 개선 잠재력 분석 */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">개선 잠재력</h3>
                <p className="text-sm text-slate-600">영역별 성장 가능성</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PotentialChart trends={data.trendData} />
          </CardContent>
        </Card>
      </div>

      {/* 성과 요약 대시보드 */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">{data.benchmarkData.current}</p>
              <p className="text-slate-300 text-sm">종합 점수</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {Math.max(...Object.values(data.categoryScores)).toFixed(1)}
              </p>
              <p className="text-slate-300 text-sm">최고 영역</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {(data.benchmarkData.topPerformers - data.benchmarkData.current).toFixed(1)}
              </p>
              <p className="text-slate-300 text-sm">개선 여지</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {Object.keys(data.categoryScores).length}
              </p>
              <p className="text-slate-300 text-sm">분석 영역</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Building, 
  Calendar,
  TrendingUp,
  Target,
  Brain,
  BarChart3,
  Award,
  FileText,
  Cpu,
  Gauge
} from 'lucide-react';
import Link from 'next/link';

interface DiagnosisResultViewProps {
  data: any;
}

export const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handlePDFDownload = () => {
    // PDF 다운로드 로직
    if (data?.diagnosisId) {
      window.open(`/api/diagnosis/download/${data.diagnosisId}`, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 결과 헤더 */}
      <div className="bg-gray-900 text-white rounded-lg p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">경영진단 결과 보고서</h1>
            <div className="flex flex-col sm:flex-row gap-4 text-gray-200">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                기업명: {data?.companyName || '정보 없음'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                진단일: {data?.diagnosisDate ? new Date(data.diagnosisDate).toLocaleDateString('ko-KR') : '정보 없음'}
              </span>
              <span>진단 ID: {data?.diagnosisId || '정보 없음'}</span>
            </div>
          </div>
          <Button
            onClick={handlePDFDownload}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF 다운로드
          </Button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            진단 개요
          </TabsTrigger>
          <TabsTrigger value="swot">
            <Brain className="w-4 h-4 mr-2" />
            SWOT 분석
          </TabsTrigger>
          <TabsTrigger value="ai-capability">
            <Cpu className="w-4 h-4 mr-2" />
            AI 역량
          </TabsTrigger>
          <TabsTrigger value="strategy">
            <Target className="w-4 h-4 mr-2" />
            전략 매트릭스
          </TabsTrigger>
          <TabsTrigger value="roadmap">
            <TrendingUp className="w-4 h-4 mr-2" />
            실행 로드맵
          </TabsTrigger>
          <TabsTrigger value="benchmark">
            <Award className="w-4 h-4 mr-2" />
            벤치마크 비교
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <FileText className="w-4 h-4 mr-2" />
            AICAMP 서비스
          </TabsTrigger>
        </TabsList>

        {/* 진단 개요 탭 */}
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>종합 진단 개요</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">핵심 요약</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data?.executiveSummary || '귀사는 현재 성장 잠재력이 높은 단계에 있으며, 디지털 전환과 프로세스 개선을 통해 경쟁력을 크게 향상시킬 수 있습니다.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {data?.overallScore || 75}점
                  </div>
                  <div className="text-sm text-gray-600">종합 점수</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {data?.overallGrade || 'A'}
                  </div>
                  <div className="text-sm text-gray-600">등급</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {data?.reliabilityScore || 92}%
                  </div>
                  <div className="text-sm text-gray-600">신뢰도</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">주요 발견사항</h3>
                <ul className="space-y-2">
                  {(data?.keyFindings || [
                    '디지털 전환 준비도가 업계 평균 대비 높음',
                    '고객 만족도 향상을 위한 체계적인 프로세스 필요',
                    '신규 시장 진출 가능성이 매우 높음'
                  ]).map((finding: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SWOT 분석 탭 */}
        <TabsContent value="swot" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SWOT 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 강점 */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    강점 (Strengths)
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    {(data.swot?.strengths || [
                      '20년 이상의 업계 경험과 노하우',
                      '우수한 기술력과 품질 관리 시스템',
                      '안정적인 고객 기반 확보'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* 약점 */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    약점 (Weaknesses)
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    {(data.swot?.weaknesses || [
                      '디지털 마케팅 역량 부족',
                      '젊은 인재 확보의 어려움',
                      '해외 시장 진출 경험 부족'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* 기회 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    기회 (Opportunities)
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    {(data.swot?.opportunities || [
                      '정부의 디지털 전환 지원 정책',
                      '신규 시장 수요 증가',
                      '친환경 제품에 대한 관심 증대'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* 위협 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    위협 (Threats)
                  </h3>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    {(data.swot?.threats || [
                      '글로벌 경쟁 심화',
                      '원자재 가격 상승',
                      '규제 강화 가능성'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI 역량 분석 탭 */}
        <TabsContent value="ai-capability" className="mt-6">
          {data.aiCapabilityAnalysis ? (
            <div className="space-y-6">
              {/* AI 역량 종합 점수 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="w-5 h-5" />
                    AI 역량 성숙도 평가
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {data.aiCapabilityAnalysis.overallScore?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">귀사 AI 역량 점수</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-500">
                        {data.aiCapabilityAnalysis.overallBenchmark?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">업계 평균 점수</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${
                        (data.aiCapabilityAnalysis.overallGap || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(data.aiCapabilityAnalysis.overallGap || 0) >= 0 ? '+' : ''}
                        {data.aiCapabilityAnalysis.overallGap?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">GAP 분석</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="text-lg px-4 py-2" variant="outline">
                      성숙도 수준: {data.aiCapabilityAnalysis.maturityLevel || '평가 중'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 영역별 AI 역량 점수 */}
              <Card>
                <CardHeader>
                  <CardTitle>영역별 AI 역량 평가</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.aiCapabilityAnalysis.categoryScores && Object.entries({
                      leadership: '경영진 리더십',
                      infrastructure: '인프라/시스템',
                      employeeCapability: '직원 역량',
                      culture: '조직 문화',
                      implementation: '실행/적용'
                    }).map(([key, label]) => {
                      const score = data.aiCapabilityAnalysis.categoryScores[key] || 0;
                      const gap = data.aiCapabilityAnalysis.categoryGaps?.[key] || 0;
                      return (
                        <div key={key} className="flex items-center gap-4">
                          <div className="w-32 font-medium">{label}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                            <div 
                              className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                              style={{ width: `${(score / 5) * 100}%` }}
                            >
                              {score.toFixed(1)}
                            </div>
                          </div>
                          <div className={`text-sm font-medium ${gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gap >= 0 ? '+' : ''}{gap.toFixed(1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* AI 역량 강점과 약점 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">AI 역량 강점</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(data.aiCapabilityAnalysis.strengths || []).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">AI 역량 개선점</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(data.aiCapabilityAnalysis.weaknesses || []).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">!</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* AI 고몰입 조직 구축 전략 */}
              <Card>
                <CardHeader>
                  <CardTitle>AI 고몰입 조직 구축 전략</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(data.aiCapabilityAnalysis.highEngagementStrategies || []).map((strategy: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI 역량 개선 권고사항 */}
              <Card>
                <CardHeader>
                  <CardTitle>AI 역량 향상 권고사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(data.aiCapabilityAnalysis.recommendations || []).map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">→</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Cpu className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>AI 역량 진단 데이터가 없습니다.</p>
                <p className="text-sm mt-2">AI 역량 진단은 선택사항입니다.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 전략 매트릭스 탭 */}
        <TabsContent value="strategy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>전략 매트릭스</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">SO 전략 (강점-기회)</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(data.strategy?.so || [
                      '기술력을 활용한 신시장 진출',
                      '정부 지원사업과 연계한 R&D 확대'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">WO 전략 (약점-기회)</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(data.strategy?.wo || [
                      '디지털 마케팅 교육을 통한 역량 강화',
                      '산학협력을 통한 인재 확보'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">ST 전략 (강점-위협)</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(data.strategy?.st || [
                      '품질 차별화를 통한 경쟁 우위 확보',
                      '장기 계약을 통한 원가 안정화'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">WT 전략 (약점-위협)</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(data.strategy?.wt || [
                      '전략적 제휴를 통한 약점 보완',
                      '핵심 역량에 집중하여 효율성 제고'
                    ]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 실행 로드맵 탭 */}
        <TabsContent value="roadmap" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>3단계 실행 로드맵</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1단계 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold mb-2">1단계 (1-3개월): 기반 구축</h3>
                <ul className="space-y-2 text-gray-700">
                  {(data.roadmap?.phase1 || [
                    '현재 프로세스 분석 및 문서화',
                    '핵심 인력 교육 계획 수립',
                    '디지털 전환 로드맵 작성'
                  ]).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2단계 */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold mb-2">2단계 (4-9개월): 실행 및 개선</h3>
                <ul className="space-y-2 text-gray-700">
                  {(data.roadmap?.phase2 || [
                    '시범 프로젝트 실행',
                    '성과 측정 및 피드백 수집',
                    '프로세스 최적화'
                  ]).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3단계 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold mb-2">3단계 (10-12개월): 확산 및 정착</h3>
                <ul className="space-y-2 text-gray-700">
                  {(data.roadmap?.phase3 || [
                    '전사 확대 적용',
                    '성과 평가 및 보상 체계 연계',
                    '지속적 개선 체계 구축'
                  ]).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 벤치마크 비교 탭 */}
        <TabsContent value="benchmark" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>업계 벤치마크 비교</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">업계 평균 대비 비교</h3>
                  <div className="space-y-4">
                    {[
                      { category: '디지털 전환 수준', yourScore: 75, avgScore: 60 },
                      { category: '프로세스 효율성', yourScore: 82, avgScore: 70 },
                      { category: '고객 만족도', yourScore: 88, avgScore: 75 },
                      { category: '재무 건전성', yourScore: 79, avgScore: 72 },
                      { category: '혁신 역량', yourScore: 71, avgScore: 65 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-gray-600">
                            귀사: {item.yourScore}점 / 평균: {item.avgScore}점
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="relative h-2">
                            <div 
                              className="absolute bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, Math.max(0, item.yourScore))}%` }}
                            />
                            <div 
                              className="absolute bg-gray-400 h-2 rounded-full opacity-50 transition-all duration-300"
                              style={{ width: `${Math.min(100, Math.max(0, item.avgScore))}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">경쟁 우위 요소</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(data.competitiveAdvantages || [
                      { title: '기술력', description: '업계 평균 대비 15% 높은 수준' },
                      { title: '고객 충성도', description: '재구매율 85% 달성' },
                      { title: '브랜드 인지도', description: '지역 시장 점유율 1위' },
                      { title: '운영 효율성', description: '원가율 업계 최저 수준' }
                    ]).map((advantage: any, index: number) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-1">{advantage.title}</h4>
                        <p className="text-sm text-blue-700">{advantage.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AICAMP 서비스 추천 탭 */}
        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>맞춤형 AICAMP 서비스 추천</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  귀사에 최적화된 서비스
                </h3>
                <p className="text-blue-700">
                  진단 결과를 바탕으로 귀사의 성장을 가속화할 수 있는 AICAMP 서비스를 추천해드립니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 교육 프로그램 */}
                <div className="border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    추천 교육 프로그램
                  </h4>
                  <ul className="space-y-3">
                    {(data.recommendedPrograms || [
                      { name: '디지털 리더십 과정', duration: '8주', benefit: '디지털 전환 역량 강화' },
                      { name: '데이터 기반 의사결정', duration: '4주', benefit: '데이터 활용 능력 향상' },
                      { name: 'AI 비즈니스 활용', duration: '6주', benefit: 'AI 도입 전략 수립' }
                    ]).map((program: any, index: number) => (
                      <li key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-800">{program.name}</div>
                        <div className="text-sm text-gray-600">
                          기간: {program.duration} | 효과: {program.benefit}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 컨설팅 서비스 */}
                <div className="border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    추천 컨설팅 서비스
                  </h4>
                  <ul className="space-y-3">
                    {(data.recommendedConsulting || [
                      { name: '디지털 전환 컨설팅', focus: '프로세스 디지털화' },
                      { name: '성장 전략 컨설팅', focus: '신시장 진출 전략' },
                      { name: '조직 혁신 컨설팅', focus: '조직 문화 개선' }
                    ]).map((service: any, index: number) => (
                      <li key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-800">{service.name}</div>
                        <div className="text-sm text-gray-600">
                          핵심 영역: {service.focus}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4">
                  특별 혜택
                </h4>
                <ul className="space-y-2 text-green-700">
                  <li>• 진단 신청자 전용 20% 할인 혜택</li>
                  <li>• 무료 사후 관리 컨설팅 (3개월)</li>
                  <li>• AICAMP 커뮤니티 1년 무료 이용권</li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <Link href="/consultation">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    전문가 상담 신청하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 하단 액션 섹션 */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-6 lg:p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            다음 단계를 시작하세요
          </h2>
          <p className="text-gray-600 mb-6">
            진단 결과를 바탕으로 구체적인 실행 계획을 수립하고 싶으신가요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/diagnosis'}
            >
              새로운 진단 신청
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              asChild
            >
              <Link href="/consultation">
                전문가 상담 신청
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
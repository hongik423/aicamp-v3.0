'use client';

import React, { useState } from 'react';
import {
  Shield, Zap, AlertTriangle, Target, TrendingUp, TrendingDown,
  ChevronRight, Plus, Minus, Info, CheckCircle, XCircle,
  Lightbulb, Activity, BarChart3, Users, Brain, Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SWOTItem {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  actionItems?: string[];
}

interface SWOTCategory {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  items: SWOTItem[];
}

interface StrategyRecommendation {
  id: string;
  type: 'SO' | 'WO' | 'ST' | 'WT';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  expectedImpact: string;
  timeline: string;
  resources: string[];
}

export default function SWOTAnalysisVisualization() {
  const [selectedView, setSelectedView] = useState<'matrix' | 'list' | 'strategy'>('matrix');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const swotData: SWOTCategory[] = [
    {
      type: 'strength',
      title: '강점 (Strengths)',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          id: 's1',
          title: '높은 AI 교육 완료율',
          description: '전 직원의 87%가 AI 기초 교육을 이수하여 조직 전체의 AI 리터러시 향상',
          impact: 'high',
          category: '인적 자원',
          score: 92,
          trend: 'up',
          actionItems: [
            '심화 교육 프로그램 확대',
            '내부 AI 전문가 양성',
            '지식 공유 플랫폼 구축'
          ]
        },
        {
          id: 's2',
          title: 'n8n 자동화 인프라 구축',
          description: '156개 프로세스 자동화 완료로 강력한 자동화 기반 확보',
          impact: 'high',
          category: '기술 인프라',
          score: 88,
          trend: 'up',
          actionItems: [
            '자동화 범위 확대',
            '성능 최적화',
            '모니터링 체계 강화'
          ]
        },
        {
          id: 's3',
          title: '경영진의 강력한 지원',
          description: 'CEO 직속 AI 혁신 TF 운영으로 빠른 의사결정 및 자원 배분',
          impact: 'high',
          category: '조직 문화',
          score: 95,
          trend: 'stable',
          actionItems: [
            '정기 성과 보고 체계화',
            '경영진 AI 이해도 제고',
            '장기 비전 수립'
          ]
        },
        {
          id: 's4',
          title: '데이터 기반 의사결정 문화',
          description: '모든 부서에서 데이터 분석을 통한 의사결정 프로세스 정착',
          impact: 'medium',
          category: '조직 문화',
          score: 78,
          trend: 'up'
        }
      ]
    },
    {
      type: 'weakness',
      title: '약점 (Weaknesses)',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      items: [
        {
          id: 'w1',
          title: 'AI 전문 인력 부족',
          description: '고급 AI 모델 개발 및 운영이 가능한 전문 인력 부족',
          impact: 'high',
          category: '인적 자원',
          score: 35,
          trend: 'stable',
          actionItems: [
            '외부 전문가 영입',
            '산학 협력 강화',
            '내부 인재 육성 프로그램'
          ]
        },
        {
          id: 'w2',
          title: '레거시 시스템 의존도',
          description: '일부 핵심 업무가 여전히 구형 시스템에 의존하여 통합 어려움',
          impact: 'medium',
          category: '기술 인프라',
          score: 42,
          trend: 'down',
          actionItems: [
            '단계적 시스템 전환',
            'API 연동 확대',
            '클라우드 마이그레이션'
          ]
        },
        {
          id: 'w3',
          title: '데이터 품질 관리 미흡',
          description: '데이터 표준화 및 품질 관리 체계 부재로 AI 성능 저하',
          impact: 'high',
          category: '데이터 관리',
          score: 38,
          trend: 'stable',
          actionItems: [
            '데이터 거버넌스 구축',
            '품질 관리 도구 도입',
            '데이터 정제 자동화'
          ]
        },
        {
          id: 'w4',
          title: '변화 저항 존재',
          description: '일부 부서에서 새로운 업무 방식에 대한 저항 존재',
          impact: 'medium',
          category: '조직 문화',
          score: 45,
          trend: 'down'
        }
      ]
    },
    {
      type: 'opportunity',
      title: '기회 (Opportunities)',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        {
          id: 'o1',
          title: 'AI 시장 급성장',
          description: '글로벌 AI 시장 연평균 38% 성장으로 비즈니스 기회 확대',
          impact: 'high',
          category: '시장 환경',
          score: 90,
          trend: 'up',
          actionItems: [
            '신규 AI 서비스 개발',
            '파트너십 확대',
            '시장 선점 전략 수립'
          ]
        },
        {
          id: 'o2',
          title: '정부 지원 정책 확대',
          description: 'AI 바우처, R&D 지원 등 정부 지원 프로그램 활용 가능',
          impact: 'medium',
          category: '정책 환경',
          score: 75,
          trend: 'up',
          actionItems: [
            '지원 사업 적극 활용',
            '정책 동향 모니터링',
            '산학연 협력 강화'
          ]
        },
        {
          id: 'o3',
          title: '고객 AI 수용도 증가',
          description: '고객의 AI 기반 서비스 선호도 증가로 새로운 가치 창출 가능',
          impact: 'high',
          category: '고객 환경',
          score: 82,
          trend: 'up',
          actionItems: [
            'AI 기반 고객 서비스 확대',
            '개인화 서비스 강화',
            '고객 피드백 시스템 구축'
          ]
        },
        {
          id: 'o4',
          title: '생성 AI 기술 발전',
          description: 'GPT, DALL-E 등 생성 AI 기술 활용한 혁신 기회',
          impact: 'high',
          category: '기술 트렌드',
          score: 88,
          trend: 'up'
        }
      ]
    },
    {
      type: 'threat',
      title: '위협 (Threats)',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      items: [
        {
          id: 't1',
          title: '경쟁사 AI 투자 확대',
          description: '주요 경쟁사들의 공격적인 AI 투자로 경쟁 심화',
          impact: 'high',
          category: '경쟁 환경',
          score: 72,
          trend: 'up',
          actionItems: [
            '차별화 전략 수립',
            '핵심 역량 강화',
            '전략적 제휴 추진'
          ]
        },
        {
          id: 't2',
          title: 'AI 규제 강화',
          description: 'AI 윤리, 개인정보보호 등 규제 강화로 비용 증가 우려',
          impact: 'medium',
          category: '규제 환경',
          score: 65,
          trend: 'up',
          actionItems: [
            '컴플라이언스 체계 구축',
            '윤리 가이드라인 수립',
            '규제 대응 TF 운영'
          ]
        },
        {
          id: 't3',
          title: '사이버 보안 위협',
          description: 'AI 시스템 대상 해킹 및 데이터 유출 위험 증가',
          impact: 'high',
          category: '보안',
          score: 68,
          trend: 'up',
          actionItems: [
            '보안 시스템 강화',
            '정기 보안 감사',
            '직원 보안 교육'
          ]
        },
        {
          id: 't4',
          title: '기술 인재 확보 경쟁',
          description: 'AI 전문 인력 수요 급증으로 인재 확보 어려움',
          impact: 'medium',
          category: '인적 자원',
          score: 70,
          trend: 'up'
        }
      ]
    }
  ];

  // 전략 권고사항
  const strategies: StrategyRecommendation[] = [
    {
      id: 'so1',
      type: 'SO',
      title: 'AI 서비스 사업화 (강점-기회 활용)',
      description: '구축된 AI 인프라와 시장 성장을 활용한 신규 비즈니스 창출',
      priority: 'high',
      expectedImpact: '연 매출 30% 증대',
      timeline: '6개월',
      resources: ['AI 개발팀', '사업개발팀', '마케팅팀']
    },
    {
      id: 'wo1',
      type: 'WO',
      title: '전문 인력 확보 (약점 보완-기회 활용)',
      description: '정부 지원 프로그램 활용한 AI 전문 인력 양성 및 채용',
      priority: 'high',
      expectedImpact: 'AI 역량 200% 향상',
      timeline: '3개월',
      resources: ['HR팀', '교육팀', '외부 파트너']
    },
    {
      id: 'st1',
      type: 'ST',
      title: '차별화된 AI 솔루션 개발 (강점 활용-위협 대응)',
      description: '자체 AI 역량을 활용한 독자적 솔루션으로 경쟁 우위 확보',
      priority: 'medium',
      expectedImpact: '시장 점유율 15% 확대',
      timeline: '9개월',
      resources: ['R&D팀', '제품개발팀']
    },
    {
      id: 'wt1',
      type: 'WT',
      title: '리스크 관리 체계 구축 (약점 보완-위협 최소화)',
      description: '데이터 품질 및 보안 체계 강화로 리스크 사전 예방',
      priority: 'high',
      expectedImpact: '리스크 70% 감소',
      timeline: '4개월',
      resources: ['IT보안팀', '품질관리팀', '컴플라이언스팀']
    }
  ];

  const toggleItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">SWOT 분석</h2>
        <p className="text-lg text-gray-600">
          AI & n8n 도입 후 조직의 전략적 포지션 분석
        </p>
      </div>

      {/* 뷰 선택 */}
      <div className="flex justify-center">
        <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)}>
          <TabsList>
            <TabsTrigger value="matrix">매트릭스 뷰</TabsTrigger>
            <TabsTrigger value="list">리스트 뷰</TabsTrigger>
            <TabsTrigger value="strategy">전략 권고</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {selectedView === 'matrix' && (
        /* SWOT 매트릭스 뷰 */
        <div className="grid grid-cols-2 gap-6">
          {swotData.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.type} className={`${category.bgColor} border-2`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white ${category.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={category.color}>{category.title}</span>
                    <Badge variant="outline" className="ml-auto">
                      {category.items.length}개 항목
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => toggleItemExpansion(item.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{item.title}</h4>
                            {getTrendIcon(item.trend)}
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getImpactColor(item.impact)}>
                            {item.impact === 'high' ? '높음' : item.impact === 'medium' ? '중간' : '낮음'}
                          </Badge>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{item.score}</p>
                            <p className="text-xs text-gray-500">점수</p>
                          </div>
                        </div>
                      </div>
                      
                      {expandedItems.has(item.id) && item.actionItems && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-semibold mb-2">실행 계획:</p>
                          <ul className="space-y-1">
                            {item.actionItems.map((action, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedView === 'list' && (
        /* 리스트 뷰 */
        <div className="space-y-6">
          {swotData.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.type}>
                <CardHeader className={category.bgColor}>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4">항목</th>
                        <th className="text-center p-4">카테고리</th>
                        <th className="text-center p-4">영향도</th>
                        <th className="text-center p-4">점수</th>
                        <th className="text-center p-4">추세</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                          </td>
                          <td className="text-center p-4">
                            <Badge variant="outline">{item.category}</Badge>
                          </td>
                          <td className="text-center p-4">
                            <Badge className={getImpactColor(item.impact)}>
                              {item.impact === 'high' ? '높음' : item.impact === 'medium' ? '중간' : '낮음'}
                            </Badge>
                          </td>
                          <td className="text-center p-4">
                            <span className="text-lg font-bold">{item.score}</span>
                          </td>
                          <td className="text-center p-4">
                            {getTrendIcon(item.trend)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedView === 'strategy' && (
        /* 전략 권고 뷰 */
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">SWOT 기반 전략 권고사항</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">SO 전략</Badge>
                    <span className="text-sm">강점-기회 활용</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">WO 전략</Badge>
                    <span className="text-sm">약점 보완-기회 활용</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-500 text-white">ST 전략</Badge>
                    <span className="text-sm">강점 활용-위협 대응</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500 text-white">WT 전략</Badge>
                    <span className="text-sm">약점 보완-위협 최소화</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Badge className={
                        strategy.type === 'SO' ? 'bg-blue-500 text-white' :
                        strategy.type === 'WO' ? 'bg-green-500 text-white' :
                        strategy.type === 'ST' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }>
                        {strategy.type}
                      </Badge>
                      <div>
                        <h3 className="text-xl font-bold">{strategy.title}</h3>
                        <p className="text-gray-600 mt-2">{strategy.description}</p>
                      </div>
                    </div>
                    <Badge variant={
                      strategy.priority === 'high' ? 'destructive' :
                      strategy.priority === 'medium' ? 'secondary' :
                      'outline'
                    }>
                      {strategy.priority === 'high' ? '높은 우선순위' :
                       strategy.priority === 'medium' ? '중간 우선순위' :
                       '낮은 우선순위'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">기대 효과</p>
                      <p className="font-semibold">{strategy.expectedImpact}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">실행 기간</p>
                      <p className="font-semibold">{strategy.timeline}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">필요 자원</p>
                      <div className="flex flex-wrap gap-1">
                        {strategy.resources.map((resource, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full">
                      상세 실행 계획 보기
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  CheckCircle, Circle, Clock, Calendar, Users, Target,
  Briefcase, BookOpen, Rocket, TrendingUp, Award, ChevronRight,
  FileText, Video, MessageSquare, BarChart3, Zap, Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProcessPhase {
  id: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  activities: Activity[];
  deliverables: string[];
  keyMetrics: Metric[];
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  startDate?: string;
  endDate?: string;
}

interface Activity {
  name: string;
  description: string;
  responsible: string;
  icon: React.ElementType;
  completed: boolean;
}

interface Metric {
  name: string;
  target: string;
  current: string;
  unit: string;
}

export default function AICampProcessTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase1');
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban'>('timeline');

  const processPhases: ProcessPhase[] = [
    {
      id: 'phase1',
      phase: 'Phase 1',
      title: '현황 진단 및 목표 설정',
      description: 'AI 역량 진단 및 자동화 기회 발굴',
      duration: '2주',
      activities: [
        {
          name: 'AI 역량 진단',
          description: '조직의 현재 AI 활용 수준 평가',
          responsible: 'AICAMP 컨설턴트',
          icon: BarChart3,
          completed: true
        },
        {
          name: '프로세스 분석',
          description: '자동화 가능한 업무 프로세스 식별',
          responsible: 'AICAMP 컨설턴트 + 고객사 팀',
          icon: Settings,
          completed: true
        },
        {
          name: '목표 설정',
          description: 'KPI 및 성과 목표 수립',
          responsible: '경영진 + AICAMP',
          icon: Target,
          completed: false
        }
      ],
      deliverables: [
        'AI 역량 진단 보고서',
        '프로세스 자동화 기회 맵',
        '프로젝트 로드맵'
      ],
      keyMetrics: [
        { name: '진단 완료율', target: '100', current: '85', unit: '%' },
        { name: '식별된 자동화 기회', target: '20', current: '18', unit: '개' },
        { name: '예상 ROI', target: '300', current: '350', unit: '%' }
      ],
      status: 'in-progress',
      progress: 85,
      startDate: '2024-01-01',
      endDate: '2024-01-14'
    },
    {
      id: 'phase2',
      phase: 'Phase 2',
      title: '교육 프로그램 설계',
      description: '맞춤형 커리큘럼 개발 및 교육 준비',
      duration: '1주',
      activities: [
        {
          name: '커리큘럼 설계',
          description: '조직 특성에 맞는 교육 과정 개발',
          responsible: 'AICAMP 교육팀',
          icon: BookOpen,
          completed: false
        },
        {
          name: '교육 자료 준비',
          description: '실습 자료 및 케이스 스터디 개발',
          responsible: 'AICAMP 교육팀',
          icon: FileText,
          completed: false
        },
        {
          name: '교육 일정 수립',
          description: '참가자 일정 조율 및 확정',
          responsible: 'HR팀 + AICAMP',
          icon: Calendar,
          completed: false
        }
      ],
      deliverables: [
        '맞춤형 교육 커리큘럼',
        '교육 자료 패키지',
        '교육 일정표'
      ],
      keyMetrics: [
        { name: '커리큘럼 완성도', target: '100', current: '0', unit: '%' },
        { name: '교육 자료 준비율', target: '100', current: '0', unit: '%' },
        { name: '참가자 확정', target: '50', current: '0', unit: '명' }
      ],
      status: 'upcoming',
      progress: 0,
      startDate: '2024-01-15',
      endDate: '2024-01-21'
    },
    {
      id: 'phase3',
      phase: 'Phase 3',
      title: '교육 실행 및 실습',
      description: 'AI 및 n8n 활용 교육 진행',
      duration: '4주',
      activities: [
        {
          name: '기초 교육',
          description: 'AI 기초 이론 및 n8n 플랫폼 교육',
          responsible: 'AICAMP 강사진',
          icon: BookOpen,
          completed: false
        },
        {
          name: '실습 프로젝트',
          description: '실제 업무 기반 자동화 프로젝트 진행',
          responsible: '참가자 + 멘토',
          icon: Rocket,
          completed: false
        },
        {
          name: '멘토링',
          description: '1:1 맞춤형 코칭 및 피드백',
          responsible: 'AICAMP 멘토',
          icon: MessageSquare,
          completed: false
        }
      ],
      deliverables: [
        '교육 수료증',
        '실습 프로젝트 결과물',
        '개인별 역량 평가서'
      ],
      keyMetrics: [
        { name: '교육 출석률', target: '95', current: '0', unit: '%' },
        { name: '실습 완료율', target: '100', current: '0', unit: '%' },
        { name: '만족도', target: '4.5', current: '0', unit: '점' }
      ],
      status: 'upcoming',
      progress: 0,
      startDate: '2024-01-22',
      endDate: '2024-02-18'
    },
    {
      id: 'phase4',
      phase: 'Phase 4',
      title: '파일럿 프로젝트',
      description: '선정된 프로세스 자동화 구현',
      duration: '3주',
      activities: [
        {
          name: '프로젝트 킥오프',
          description: '파일럿 프로젝트 범위 및 목표 확정',
          responsible: '프로젝트팀',
          icon: Briefcase,
          completed: false
        },
        {
          name: '자동화 구현',
          description: 'n8n 워크플로우 개발 및 테스트',
          responsible: '개발팀 + AICAMP',
          icon: Zap,
          completed: false
        },
        {
          name: '성과 측정',
          description: '자동화 효과 및 ROI 측정',
          responsible: '성과관리팀',
          icon: BarChart3,
          completed: false
        }
      ],
      deliverables: [
        '자동화 워크플로우',
        '운영 매뉴얼',
        '성과 측정 보고서'
      ],
      keyMetrics: [
        { name: '자동화율', target: '80', current: '0', unit: '%' },
        { name: '처리 시간 단축', target: '60', current: '0', unit: '%' },
        { name: '오류율 감소', target: '70', current: '0', unit: '%' }
      ],
      status: 'upcoming',
      progress: 0,
      startDate: '2024-02-19',
      endDate: '2024-03-10'
    },
    {
      id: 'phase5',
      phase: 'Phase 5',
      title: '확산 및 정착',
      description: '전사 확산 및 지속 가능한 운영 체계 구축',
      duration: '4주',
      activities: [
        {
          name: '확산 계획 수립',
          description: '전사 롤아웃 전략 및 일정 계획',
          responsible: '경영진 + PMO',
          icon: TrendingUp,
          completed: false
        },
        {
          name: '변화 관리',
          description: '조직 문화 및 업무 방식 혁신',
          responsible: 'HR팀 + AICAMP',
          icon: Users,
          completed: false
        },
        {
          name: '지속 개선',
          description: 'CoE 구축 및 지속적 혁신 체계',
          responsible: '혁신팀',
          icon: Award,
          completed: false
        }
      ],
      deliverables: [
        '전사 확산 로드맵',
        'AI CoE 운영 가이드',
        '지속 개선 프레임워크'
      ],
      keyMetrics: [
        { name: '적용 부서', target: '10', current: '0', unit: '개' },
        { name: '자동화 프로세스', target: '50', current: '0', unit: '개' },
        { name: '전체 ROI', target: '500', current: '0', unit: '%' }
      ],
      status: 'upcoming',
      progress: 0,
      startDate: '2024-03-11',
      endDate: '2024-04-07'
    }
  ];

  const selectedPhaseData = processPhases.find(p => p.id === selectedPhase);
  const overallProgress = Math.round(
    processPhases.reduce((acc, phase) => acc + phase.progress, 0) / processPhases.length
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">AICAMP 적용 프로세스</h2>
        <p className="text-lg text-gray-600">
          체계적인 5단계 프로세스를 통한 AI 혁신 여정
        </p>
      </div>

      {/* 전체 진행률 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">전체 프로젝트 진행률</h3>
                <p className="text-gray-600">예상 완료일: 2024년 4월 7일</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
                <p className="text-sm text-gray-500">완료</p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* 뷰 모드 선택 */}
      <div className="flex justify-center">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'timeline' | 'kanban')}>
          <TabsList>
            <TabsTrigger value="timeline">타임라인 뷰</TabsTrigger>
            <TabsTrigger value="kanban">칸반 뷰</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === 'timeline' ? (
        /* 타임라인 뷰 */
        <div className="relative">
          {/* 타임라인 라인 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          <div className="space-y-8">
            {processPhases.map((phase, index) => (
              <div key={phase.id} className="relative flex gap-8">
                {/* 타임라인 노드 */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    phase.status === 'completed' ? 'bg-green-500 text-white' :
                    phase.status === 'in-progress' ? 'bg-blue-500 text-white animate-pulse' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {phase.status === 'completed' ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : phase.status === 'in-progress' ? (
                      <Clock className="w-8 h-8" />
                    ) : (
                      <Circle className="w-8 h-8" />
                    )}
                  </div>
                </div>

                {/* 페이즈 카드 */}
                <Card 
                  className={`flex-1 cursor-pointer transition-all ${
                    selectedPhase === phase.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedPhase(phase.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge 
                          variant={
                            phase.status === 'completed' ? 'default' :
                            phase.status === 'in-progress' ? 'secondary' :
                            'outline'
                          }
                        >
                          {phase.phase}
                        </Badge>
                        <h3 className="text-xl font-bold mt-2">{phase.title}</h3>
                        <p className="text-gray-600 mt-1">{phase.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">기간</p>
                        <p className="font-semibold">{phase.duration}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">진행률</span>
                        <span className="text-sm font-semibold">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                      
                      {phase.startDate && phase.endDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{phase.startDate} ~ {phase.endDate}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 칸반 뷰 */
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              완료
            </h3>
            {processPhases.filter(p => p.status === 'completed').map(phase => (
              <Card 
                key={phase.id}
                className="cursor-pointer"
                onClick={() => setSelectedPhase(phase.id)}
              >
                <CardHeader className="pb-3">
                  <Badge variant="default">{phase.phase}</Badge>
                  <h4 className="font-semibold mt-2">{phase.title}</h4>
                </CardHeader>
                <CardContent>
                  <Progress value={100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              진행 중
            </h3>
            {processPhases.filter(p => p.status === 'in-progress').map(phase => (
              <Card 
                key={phase.id}
                className="cursor-pointer border-blue-200"
                onClick={() => setSelectedPhase(phase.id)}
              >
                <CardHeader className="pb-3">
                  <Badge variant="secondary">{phase.phase}</Badge>
                  <h4 className="font-semibold mt-2">{phase.title}</h4>
                </CardHeader>
                <CardContent>
                  <Progress value={phase.progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">{phase.progress}% 완료</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Circle className="w-5 h-5 text-gray-400" />
              예정
            </h3>
            {processPhases.filter(p => p.status === 'upcoming').map(phase => (
              <Card 
                key={phase.id}
                className="cursor-pointer opacity-75"
                onClick={() => setSelectedPhase(phase.id)}
              >
                <CardHeader className="pb-3">
                  <Badge variant="outline">{phase.phase}</Badge>
                  <h4 className="font-semibold mt-2">{phase.title}</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    시작 예정: {phase.startDate}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 선택된 페이즈 상세 정보 */}
      {selectedPhaseData && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <Badge 
                  variant={
                    selectedPhaseData.status === 'completed' ? 'default' :
                    selectedPhaseData.status === 'in-progress' ? 'secondary' :
                    'outline'
                  }
                  className="mb-2"
                >
                  {selectedPhaseData.phase}
                </Badge>
                <CardTitle className="text-2xl">{selectedPhaseData.title}</CardTitle>
                <p className="text-gray-600 mt-2">{selectedPhaseData.description}</p>
              </div>
              <Button>
                상세 보고서
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activities">주요 활동</TabsTrigger>
                <TabsTrigger value="deliverables">산출물</TabsTrigger>
                <TabsTrigger value="metrics">성과 지표</TabsTrigger>
              </TabsList>

              <TabsContent value="activities" className="space-y-4">
                {selectedPhaseData.activities.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${
                        activity.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{activity.name}</h4>
                          {activity.completed && (
                            <Badge variant="outline" className="text-green-600">완료</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          담당: {activity.responsible}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="deliverables" className="space-y-3">
                {selectedPhaseData.deliverables.map((deliverable, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{deliverable}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                {selectedPhaseData.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-gray-500">
                        {metric.current} / {metric.target} {metric.unit}
                      </span>
                    </div>
                    <Progress 
                      value={(parseFloat(metric.current) / parseFloat(metric.target)) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

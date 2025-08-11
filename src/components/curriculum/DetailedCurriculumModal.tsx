'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Eye,
  Clock, 
  Target, 
  CheckCircle, 
  BookOpen, 
  Users, 
  Award,
  TrendingUp,
  Lightbulb,
  Zap,
  BarChart3,
  ChevronRight,
  Star,
  ArrowRight,
  Calendar,
  GraduationCap,
  Play,
  Download,
  Share,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  Cpu,
  Database,
  Globe,
  Settings,
  Code,
  Brain,
  Rocket,
  Shield
} from 'lucide-react';

interface CurriculumModule {
  title: string;
  duration: string;
  description: string;
  objectives: string[];
  practicalExercises: string[];
  expectedOutcomes: string[];
  tools: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'executive';
  category?: 'basic' | 'advanced' | 'executive';
}

interface DetailedCurriculumModalProps {
  courseLevel: 'basic' | 'advanced' | 'executive';
  industryName: string;
  modules: CurriculumModule[];
  totalDuration: string;
  expectedROI: {
    productivity: string;
    costSaving: string;
    timeReduction: string;
  };
  children: React.ReactNode;
}

export default function DetailedCurriculumModal({
  courseLevel,
  industryName,
  modules,
  totalDuration,
  expectedROI,
  children
}: DetailedCurriculumModalProps) {
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'basic':
        return {
          title: '기초과정',
          subtitle: 'AI 기본기 다지기',
          color: 'bg-green-500',
          icon: <BookOpen className="w-6 h-6" />,
          description: 'AI와 자동화의 기본 개념을 이해하고 실무에 바로 적용할 수 있는 기초 역량을 습득합니다.'
        };
      case 'advanced':
        return {
          title: '심화과정',
          subtitle: '실무 전문가 되기',
          color: 'bg-orange-500',
          icon: <Zap className="w-6 h-6" />,
          description: '고급 AI 기술과 복잡한 자동화 시스템을 구축하고 운영할 수 있는 전문 역량을 개발합니다.'
        };
      case 'executive':
        return {
          title: '경영진과정',
          subtitle: '전략적 AI 리더십',
          color: 'bg-purple-500',
          icon: <Award className="w-6 h-6" />,
          description: 'AI 전략 수립과 조직 전반의 디지털 전환을 주도할 수 있는 리더십 역량을 함양합니다.'
        };
      default:
        return {
          title: '커리큘럼',
          subtitle: '',
          color: 'bg-gray-500',
          icon: <GraduationCap className="w-6 h-6" />,
          description: ''
        };
    }
  };

  const levelInfo = getLevelInfo(courseLevel);

  const calculateTotalHours = () => {
    return modules.reduce((total, module) => {
      const hours = parseInt(module.duration.replace(/[^0-9]/g, '')) || 0;
      return total + hours;
    }, 0);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'executive': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getToolIcon = (tool: string) => {
    const toolName = tool.toLowerCase();
    if (toolName.includes('chatgpt') || toolName.includes('gpt')) return <Brain className="w-4 h-4" />;
    if (toolName.includes('n8n')) return <Settings className="w-4 h-4" />;
    if (toolName.includes('code') || toolName.includes('python')) return <Code className="w-4 h-4" />;
    if (toolName.includes('database') || toolName.includes('sql')) return <Database className="w-4 h-4" />;
    if (toolName.includes('api') || toolName.includes('web')) return <Globe className="w-4 h-4" />;
    return <Cpu className="w-4 h-4" />;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto z-[1100]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${levelInfo.color} rounded-2xl flex items-center justify-center text-white`}>
              {levelInfo.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
                {industryName} {levelInfo.title}
              </DialogTitle>
              <p className="text-lg text-gray-600 mb-2">{levelInfo.subtitle}</p>
              <p className="text-sm text-gray-500">{levelInfo.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{calculateTotalHours()}시간</div>
              <div className="text-sm text-gray-500">{modules.length}개 모듈</div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>개요</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>모듈상세</span>
            </TabsTrigger>
            <TabsTrigger value="outcomes" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>성과</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>도구</span>
            </TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-blue-700">
                    <Clock className="w-5 h-5" />
                    <span>교육 기간</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{calculateTotalHours()}시간</div>
                  <div className="text-sm text-gray-600">{modules.length}개 모듈 구성</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-green-700">
                    <TrendingUp className="w-5 h-5" />
                    <span>생산성 향상</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">{expectedROI.productivity}</div>
                  <div className="text-sm text-gray-600">교육 완료 후 기대효과</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-purple-700">
                    <Rocket className="w-5 h-5" />
                    <span>업무 자동화</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900">{expectedROI.timeReduction}</div>
                  <div className="text-sm text-gray-600">반복 업무 절약</div>
                </CardContent>
              </Card>
            </div>

            {/* 모듈 개요 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span>커리큘럼 구성</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.map((module, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                       onClick={() => setSelectedModule(module)}>
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty || 'standard'}
                      </Badge>
                      <div className="text-sm text-gray-500 mt-1">{module.duration}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 모듈 상세 탭 */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 모듈 목록 */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>모듈 선택</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {modules.map((module, index) => (
                    <Button
                      key={index}
                      variant={selectedModule === module ? "default" : "ghost"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setSelectedModule(module)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{module.title}</div>
                          <div className="text-xs text-gray-500">{module.duration}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* 선택된 모듈 상세 */}
              <Card className="lg:col-span-2">
                {selectedModule ? (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{selectedModule.title}</span>
                        <Badge className={getDifficultyColor(selectedModule.difficulty)}>
                          {selectedModule.difficulty || 'standard'}
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-600">{selectedModule.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* 학습 목표 */}
                      <div>
                        <h4 className="font-semibold flex items-center space-x-2 mb-3">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span>학습 목표</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedModule.objectives.map((objective, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 실습 내용 */}
                      <div>
                        <h4 className="font-semibold flex items-center space-x-2 mb-3">
                          <Play className="w-4 h-4 text-orange-600" />
                          <span>실습 내용</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedModule.practicalExercises.map((exercise, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{exercise}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 기대 성과 */}
                      <div>
                        <h4 className="font-semibold flex items-center space-x-2 mb-3">
                          <Star className="w-4 h-4 text-purple-600" />
                          <span>기대 성과</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedModule.expectedOutcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <TrendingUp className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>모듈을 선택하여 상세 내용을 확인하세요</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* 성과 탭 */}
          <TabsContent value="outcomes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-700">
                    <TrendingUp className="w-6 h-6" />
                    <span>생산성 향상</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900 mb-2">{expectedROI.productivity}</div>
                  <p className="text-gray-600 text-sm">AI 도구 활용을 통한 업무 효율성 개선</p>
                  <Progress value={85} className="mt-4" />
                  <div className="text-xs text-gray-500 mt-2">교육 완료자 평균 달성률: 85%</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-700">
                    <Clock className="w-6 h-6" />
                    <span>시간 절약</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900 mb-2">{expectedROI.timeReduction}</div>
                  <p className="text-gray-600 text-sm">반복 업무 자동화를 통한 시간 단축</p>
                  <Progress value={78} className="mt-4" />
                  <div className="text-xs text-gray-500 mt-2">교육 완료자 평균 달성률: 78%</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-700">
                    <Award className="w-6 h-6" />
                    <span>비용 절감</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900 mb-2">{expectedROI.costSaving}</div>
                  <p className="text-gray-600 text-sm">인력 및 운영비 최적화</p>
                  <Progress value={72} className="mt-4" />
                  <div className="text-xs text-gray-500 mt-2">교육 완료자 평균 달성률: 72%</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-700">
                    <Users className="w-6 h-6" />
                    <span>만족도</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-900 mb-2">4.8/5.0</div>
                  <p className="text-gray-600 text-sm">교육 참가자 평균 만족도</p>
                  <Progress value={96} className="mt-4" />
                  <div className="text-xs text-gray-500 mt-2">1,247명 참가자 평균 점수</div>
                </CardContent>
              </Card>
            </div>

            {/* 성공 사례 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <span>실제 성공 사례</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">A사 제조업체</h4>
                    <p className="text-sm text-green-800 mb-3">생산성 40% 향상, 불량률 60% 감소</p>
                    <div className="text-xs text-green-700">
                      "AI 기반 품질관리 시스템 도입으로 월 3,000만원 비용 절감"
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">B사 유통업체</h4>
                    <p className="text-sm text-blue-800 mb-3">재고관리 효율 50% 증대</p>
                    <div className="text-xs text-blue-700">
                      "자동화된 발주 시스템으로 재고 부족률 90% 감소"
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 도구 탭 */}
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-gray-700" />
                  <span>사용 도구 및 기술</span>
                </CardTitle>
                <p className="text-gray-600">교육 과정에서 활용하는 주요 AI 도구와 기술들입니다.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...new Set(modules.flatMap(module => module.tools))].map((tool, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white">
                          {getToolIcon(tool)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{tool}</div>
                          <div className="text-xs text-gray-500">AI 도구</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 추가 리소스 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-6 h-6 text-blue-600" />
                  <span>학습 자료</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    커리큘럼 상세 가이드 (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    샘플 강의 영상 보기
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    교육 상담 신청하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 액션 버튼 */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              북마크
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              공유
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              추천
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              상담 신청
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Rocket className="w-4 h-4 mr-2" />
              교육 신청하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
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
  DollarSign,
  Timer,
  Wrench,
  Brain
} from 'lucide-react';
import { 
  getIndustryCurriculum, 
  CurriculumModule, 
  IndustryCurriculum 
} from '@/data/comprehensive-industry-curriculum';

interface IndustrySpecificCurriculumDisplayProps {
  industryCode: string;
  industryName: string;
  companySize?: string;
  customizations?: string[];
}

export default function IndustrySpecificCurriculumDisplay({ 
  industryCode, 
  industryName,
  companySize = 'medium',
  customizations = []
}: IndustrySpecificCurriculumDisplayProps) {
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModuleDetail, setShowModuleDetail] = useState(false);

  const curriculum = getIndustryCurriculum(industryCode);

  if (!curriculum) {
    return (
      <div className="text-center py-12">
        <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          커리큘럼 준비 중
        </h3>
        <p className="text-gray-500">
          {industryName} 업종의 맞춤형 커리큘럼이 곧 준비됩니다.
        </p>
      </div>
    );
  }

  const handleModuleClick = (module: CurriculumModule) => {
    setSelectedModule(module);
    setShowModuleDetail(true);
  };

  const getTotalModules = () => {
    return curriculum.basic.length + curriculum.advanced.length + curriculum.executive.length;
  };

  return (
    <div className="space-y-8">
      {/* 커리큘럼 개요 헤더 */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-blue-900 mb-2">
                  {curriculum.industryName} AI & n8n 커리큘럼
                </CardTitle>
                <p className="text-blue-700 font-medium text-lg">
                  업종 특성을 반영한 체계적인 AI 교육 프로그램
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                    총 {getTotalModules()}개 모듈
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    기초 → 심화 → 경영진 과정
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {curriculum.totalDuration.basic.split('시간')[0] + 
                   parseInt(curriculum.totalDuration.advanced.split('시간')[0]) + 
                   parseInt(curriculum.totalDuration.executive.split('시간')[0])}시간
                </div>
                <div className="text-sm text-blue-700">총 교육 시간</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 과정별 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <BookOpen className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-800 text-lg">기초 과정</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">
                {curriculum.totalDuration.basic}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {curriculum.basic.length}개 모듈
              </div>
              <p className="text-sm text-gray-700">
                AI 기초 이해부터 n8n 자동화까지 업종별 기본기 확립
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-200">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="w-6 h-6 text-orange-600" />
                <span className="font-bold text-orange-800 text-lg">심화 과정</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {curriculum.totalDuration.advanced}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {curriculum.advanced.length}개 모듈
              </div>
              <p className="text-sm text-gray-700">
                고급 AI 기술과 복합 워크플로우 실무 적용
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-6 h-6 text-purple-600" />
                <span className="font-bold text-purple-800 text-lg">경영진 과정</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {curriculum.totalDuration.executive}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {curriculum.executive.length}개 모듈
              </div>
              <p className="text-sm text-gray-700">
                AI 전략 수립과 디지털 전환 리더십
              </p>
            </div>
          </div>

          {/* ROI 정보 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>기대 효과 (ROI)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {curriculum.roi.productivity}
                </div>
                <div className="text-sm text-gray-600">생산성 향상</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {curriculum.roi.costSaving}
                </div>
                <div className="text-sm text-gray-600">비용 절감</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {curriculum.roi.timeReduction}
                </div>
                <div className="text-sm text-gray-600">시간 단축</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 상세 커리큘럼 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-14">
          <TabsTrigger value="overview" className="flex items-center space-x-2 text-sm">
            <Target className="w-4 h-4" />
            <span>전체 개요</span>
          </TabsTrigger>
          <TabsTrigger value="basic" className="flex items-center space-x-2 text-sm">
            <BookOpen className="w-4 h-4" />
            <span>기초과정</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2 text-sm">
            <Zap className="w-4 h-4" />
            <span>심화과정</span>
          </TabsTrigger>
          <TabsTrigger value="executive" className="flex items-center space-x-2 text-sm">
            <Award className="w-4 h-4" />
            <span>경영진과정</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 교육 로드맵 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>교육 로드맵</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-green-800 mb-1">기초과정</h4>
                        <p className="text-sm text-gray-600 mb-2">{curriculum.totalDuration.basic}</p>
                        <p className="text-sm text-gray-700">
                          AI 기본 개념부터 n8n 자동화까지 업종별 기초 역량 구축
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-orange-800 mb-1">심화과정</h4>
                        <p className="text-sm text-gray-600 mb-2">{curriculum.totalDuration.advanced}</p>
                        <p className="text-sm text-gray-700">
                          고급 AI 기술과 복합 워크플로우를 활용한 실무 프로젝트 수행
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-purple-800 mb-1">경영진과정</h4>
                        <p className="text-sm text-gray-600 mb-2">{curriculum.totalDuration.executive}</p>
                        <p className="text-sm text-gray-700">
                          AI 전략 수립과 디지털 전환을 위한 리더십 역량 강화
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 핵심 도구 및 기술 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  <span>핵심 도구 & 기술</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">AI 도구</h4>
                    <div className="flex flex-wrap gap-2">
                      {['ChatGPT', 'Claude', 'Gemini', 'GitHub Copilot'].map((tool) => (
                        <Badge key={tool} className="bg-blue-100 text-blue-800">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">자동화 도구</h4>
                    <div className="flex flex-wrap gap-2">
                      {['n8n', 'Zapier', 'Make', 'API 연동'].map((tool) => (
                        <Badge key={tool} className="bg-green-100 text-green-800">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">분석 도구</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Power BI', 'Tableau', 'Google Analytics', 'Excel'].map((tool) => (
                        <Badge key={tool} className="bg-purple-100 text-purple-800">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="basic" className="mt-8">
          <CurriculumModuleGrid 
            modules={curriculum.basic}
            category="기초과정"
            color="green"
            onModuleClick={handleModuleClick}
          />
        </TabsContent>

        <TabsContent value="advanced" className="mt-8">
          <CurriculumModuleGrid 
            modules={curriculum.advanced}
            category="심화과정"
            color="orange"
            onModuleClick={handleModuleClick}
          />
        </TabsContent>

        <TabsContent value="executive" className="mt-8">
          <CurriculumModuleGrid 
            modules={curriculum.executive}
            category="경영진과정"
            color="purple"
            onModuleClick={handleModuleClick}
          />
        </TabsContent>
      </Tabs>

      {/* 업종별 커스터마이징 정보 */}
      {customizations.length > 0 && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Lightbulb className="w-5 h-5" />
              <span>{industryName} 업종별 특화 내용</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customizations.map((customization, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{customization}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 모듈 상세 정보 다이얼로그 */}
      <Dialog open={showModuleDetail} onOpenChange={setShowModuleDetail}>
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl max-h-[80vh] overflow-y-auto z-[1100]">
          {selectedModule && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedModule.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-base">
                  {selectedModule.description}
                </DialogDescription>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedModule.duration}
                  </Badge>
                  {selectedModule.tools && (
                    <div className="flex flex-wrap gap-1">
                      {selectedModule.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                {/* 학습 목표 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>학습 목표</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedModule.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 실습 내용 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>실습 내용</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedModule.practicalExercises.map((exercise, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Wrench className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{exercise}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 기대 효과 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>기대 효과</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedModule.expectedOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 모듈 그리드 컴포넌트
interface CurriculumModuleGridProps {
  modules: CurriculumModule[];
  category: string;
  color: string;
  onModuleClick: (module: CurriculumModule) => void;
}

function CurriculumModuleGrid({ modules, category, color, onModuleClick }: CurriculumModuleGridProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        button: 'bg-green-600 hover:bg-green-700',
        icon: 'text-green-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700',
        icon: 'text-orange-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700',
        icon: 'text-purple-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
          {category} 상세 내용
        </h2>
        <p className="text-gray-600">
          {category}의 모든 모듈을 확인하고 상세 내용을 살펴보세요
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <Card 
            key={index} 
            className={`${colorClasses.bg} ${colorClasses.border} border-2 hover:shadow-lg transition-shadow cursor-pointer`}
            onClick={() => onModuleClick(module)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <CardTitle className={`text-lg ${colorClasses.text} mb-2`}>
                    {module.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{module.duration}</span>
                    </div>
                  </div>
                </div>
                <div className={`w-8 h-8 ${colorClasses.bg} border-2 ${colorClasses.border} rounded-full flex items-center justify-center font-bold text-sm ${colorClasses.text}`}>
                  {index + 1}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 mb-4 line-clamp-2">{module.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>주요 학습목표</span>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {module.objectives.slice(0, 2).map((objective, objIndex) => (
                      <li key={objIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span className="line-clamp-1">{objective}</span>
                      </li>
                    ))}
                    {module.objectives.length > 2 && (
                      <li className="text-xs text-gray-500 ml-5">
                        +{module.objectives.length - 2}개 더...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <Button 
                className={`w-full mt-4 ${colorClasses.button} text-white`}
                onClick={(e) => {
                  e.stopPropagation();
                  onModuleClick(module);
                }}
              >
                상세 내용 보기
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

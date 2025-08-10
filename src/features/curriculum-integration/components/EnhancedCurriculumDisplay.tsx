'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  GraduationCap
} from 'lucide-react';
import { CurriculumModule, SuccessCaseCurriculum } from '../types';

interface EnhancedCurriculumDisplayProps {
  caseCurriculum: SuccessCaseCurriculum;
  industryType: string;
  companyInfo: {
    industry: string;
    employees: string;
    revenue: string;
    location: string;
  };
}

export default function EnhancedCurriculumDisplay({ 
  caseCurriculum, 
  industryType, 
  companyInfo 
}: EnhancedCurriculumDisplayProps) {
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const calculateTotalDuration = (modules: CurriculumModule[]) => {
    return modules.reduce((total, module) => {
      const hours = parseInt(module.duration.replace('시간', ''));
      return total + hours;
    }, 0);
  };

  const getTotalDuration = () => {
    const basic = calculateTotalDuration(caseCurriculum.appliedCurriculum.basic);
    const advanced = calculateTotalDuration(caseCurriculum.appliedCurriculum.advanced);
    const executive = calculateTotalDuration(caseCurriculum.appliedCurriculum.executive);
    return basic + advanced + executive;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'executive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return <BookOpen className="w-5 h-5" />;
      case 'advanced': return <Zap className="w-5 h-5" />;
      case 'executive': return <Award className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 커리큘럼 개요 */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">
                  {industryType} 특화 AI CAMP 커리큘럼
                </CardTitle>
                <p className="text-blue-700 font-medium">
                  기초 → 심화 → 경영진 과정 통합 교육 프로그램
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{getTotalDuration()}시간</div>
              <div className="text-sm text-blue-700">총 교육 시간</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">기초 과정</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {calculateTotalDuration(caseCurriculum.appliedCurriculum.basic)}시간
              </div>
              <div className="text-sm text-gray-600">
                {caseCurriculum.appliedCurriculum.basic.length}개 모듈
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">심화 과정</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {calculateTotalDuration(caseCurriculum.appliedCurriculum.advanced)}시간
              </div>
              <div className="text-sm text-gray-600">
                {caseCurriculum.appliedCurriculum.advanced.length}개 모듈
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">경영진 과정</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {calculateTotalDuration(caseCurriculum.appliedCurriculum.executive)}시간
              </div>
              <div className="text-sm text-gray-600">
                {caseCurriculum.appliedCurriculum.executive.length}개 모듈
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 상세 커리큘럼 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>개요</span>
          </TabsTrigger>
          <TabsTrigger value="basic" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>기초과정</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>심화과정</span>
          </TabsTrigger>
          <TabsTrigger value="executive" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>경영진과정</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 교육 프로세스 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>교육 프로세스</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseCurriculum.implementationProcess.map((process, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900 mb-1">{process.phase}</h4>
                          <p className="text-sm text-blue-600 mb-2">{process.duration}</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {process.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {index < caseCurriculum.implementationProcess.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 측정된 성과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span>측정된 교육 성과</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseCurriculum.measuredOutcomes.quantitative.map((outcome, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{outcome.metric}</span>
                        <Badge className="bg-green-100 text-green-800">{outcome.improvement}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">이전: {outcome.before}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-green-600 font-semibold">이후: {outcome.after}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">정성적 성과</h4>
                    <ul className="space-y-2">
                      {caseCurriculum.measuredOutcomes.qualitative.map((outcome, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="basic" className="mt-6">
          <CurriculumModuleList 
            modules={caseCurriculum.appliedCurriculum.basic}
            category="기초과정"
            color="green"
            onSelectModule={setSelectedModule}
          />
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <CurriculumModuleList 
            modules={caseCurriculum.appliedCurriculum.advanced}
            category="심화과정"
            color="orange"
            onSelectModule={setSelectedModule}
          />
        </TabsContent>

        <TabsContent value="executive" className="mt-6">
          <CurriculumModuleList 
            modules={caseCurriculum.appliedCurriculum.executive}
            category="경영진과정"
            color="purple"
            onSelectModule={setSelectedModule}
          />
        </TabsContent>
      </Tabs>

      {/* 커스터마이징 정보 */}
      {caseCurriculum.customizations && caseCurriculum.customizations.length > 0 && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Lightbulb className="w-5 h-5" />
              <span>업종별 커스터마이징</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseCurriculum.customizations.map((customization, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white rounded-lg p-3 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{customization}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// 모듈 리스트 컴포넌트
interface CurriculumModuleListProps {
  modules: CurriculumModule[];
  category: string;
  color: string;
  onSelectModule: (module: CurriculumModule) => void;
}

function CurriculumModuleList({ modules, category, color, onSelectModule }: CurriculumModuleListProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        button: 'bg-green-600 hover:bg-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {modules.map((module, index) => (
        <Card key={module.id} className={`${colorClasses.bg} ${colorClasses.border} border-2`}>
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
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </Badge>
                </div>
              </div>
              <div className={`w-8 h-8 ${colorClasses.text} rounded-full flex items-center justify-center font-bold text-sm`}>
                {index + 1}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-700 mb-4">{module.description}</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>학습목표</span>
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {module.objectives.slice(0, 2).map((objective, objIndex) => (
                    <li key={objIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>기대효과</span>
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {module.expectedOutcomes.slice(0, 2).map((outcome, outIndex) => (
                    <li key={outIndex} className="flex items-start space-x-2">
                      <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button 
              onClick={() => onSelectModule(module)}
              className={`w-full mt-4 ${colorClasses.button} text-white`}
            >
              상세 내용 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-orange-100 text-orange-800';
    case 'executive': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Users, 
  Target, 
  TrendingUp, 
  Settings, 
  Award,
  Lightbulb,
  Shield,
  Rocket,
  Heart,
  Star,
  ChevronRight,
  Clock,
  BarChart3,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { HIGH_ENGAGEMENT_AI_PROGRAM } from '@/data/enhanced-ai-n8n-program';

interface EnhancedAIProgramShowcaseProps {
  onConsultationRequest?: () => void;
}

export default function EnhancedAIProgramShowcase({ 
  onConsultationRequest 
}: EnhancedAIProgramShowcaseProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState<'shortTerm' | 'mediumTerm' | 'longTerm'>('shortTerm');

  const program = HIGH_ENGAGEMENT_AI_PROGRAM;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation': return 'bg-blue-500';
      case 'technical': return 'bg-purple-500';
      case 'leadership': return 'bg-green-500';
      case 'culture': return 'bg-red-500';
      case 'innovation': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 히어로 섹션 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Star className="w-4 h-4 mr-1" />
                최상의 고몰입 조직구축 프로그램
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {program.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                {program.subtitle}
              </p>
              <p className="text-lg text-gray-500 mb-8 max-w-4xl mx-auto">
                {program.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{program.totalDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="font-medium">최대 {program.participantCapacity}명</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">{program.modules.length}개 전문 모듈</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={onConsultationRequest}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  프로그램 상담 신청
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  상세 자료 다운로드
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 비전 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">프로그램 비전</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    "{program.vision}"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 모듈 상세 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">핵심 교육 모듈</h2>
            <p className="text-lg text-gray-600">
              체계적이고 실무 중심의 8개 전문 모듈로 구성된 혁신적인 교육과정
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 모듈 목록 */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                {program.modules.map((module, index) => {
                  const IconComponent = module.icon;
                  return (
                    <motion.div
                      key={module.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        activeModule === index 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'bg-white border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveModule(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(module.category)}`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">
                            {module.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge size="sm" className={getDifficultyColor(module.difficulty)}>
                              {module.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">{module.duration}</span>
                          </div>
                        </div>
                        {activeModule === index && (
                          <ChevronRight className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 선택된 모듈 상세 */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900 mb-2">
                            {program.modules[activeModule].title}
                          </CardTitle>
                          <p className="text-gray-600">
                            {program.modules[activeModule].subtitle}
                          </p>
                        </div>
                        <Badge className={getDifficultyColor(program.modules[activeModule].difficulty)}>
                          {program.modules[activeModule].difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6">
                        {program.modules[activeModule].description}
                      </p>

                      <Tabs defaultValue="objectives" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="objectives">목표</TabsTrigger>
                          <TabsTrigger value="features">특징</TabsTrigger>
                          <TabsTrigger value="projects">프로젝트</TabsTrigger>
                          <TabsTrigger value="outcomes">성과</TabsTrigger>
                        </TabsList>

                        <TabsContent value="objectives" className="mt-4">
                          <div className="space-y-3">
                            {program.modules[activeModule].objectives.map((objective, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Target className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{objective}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="features" className="mt-4">
                          <div className="space-y-3">
                            {program.modules[activeModule].keyFeatures.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="projects" className="mt-4">
                          <div className="space-y-3">
                            {program.modules[activeModule].practicalProjects.map((project, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Rocket className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{project}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="outcomes" className="mt-4">
                          <div className="space-y-3">
                            {program.modules[activeModule].expectedOutcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* ROI 지표 */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">예상 ROI 지표</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">생산성 향상</div>
                            <div className="font-semibold text-blue-600">
                              {program.modules[activeModule].roi.productivity}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">직원 몰입도</div>
                            <div className="font-semibold text-green-600">
                              {program.modules[activeModule].roi.engagement}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">인재 유지</div>
                            <div className="font-semibold text-purple-600">
                              {program.modules[activeModule].roi.retention}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">혁신 지수</div>
                            <div className="font-semibold text-orange-600">
                              {program.modules[activeModule].roi.innovation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 조직적 혜택 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">조직 변화 로드맵</h2>
            <p className="text-lg text-gray-600">
              단계별 조직 혜택과 문화적 변화를 확인하세요
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              {(['shortTerm', 'mediumTerm', 'longTerm'] as const).map((phase) => (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`px-6 py-2 rounded-md transition-all ${
                    selectedPhase === phase
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {phase === 'shortTerm' && '단기 (1-3개월)'}
                  {phase === 'mediumTerm' && '중기 (3-6개월)'}
                  {phase === 'longTerm' && '장기 (6-12개월)'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {program.organizationalBenefits[selectedPhase].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 성공 지표 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">성공 측정 지표</h2>
            <p className="text-lg text-gray-600">
              프로그램의 성과를 정량적으로 측정하고 관리합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(program.successMetrics).map(([category, metrics], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {category === 'engagement' && <Heart className="w-5 h-5 text-red-500" />}
                      {category === 'productivity' && <TrendingUp className="w-5 h-5 text-green-500" />}
                      {category === 'innovation' && <Lightbulb className="w-5 h-5 text-yellow-500" />}
                      {category === 'retention' && <Users className="w-5 h-5 text-blue-500" />}
                      
                      {category === 'engagement' && '몰입도'}
                      {category === 'productivity' && '생산성'}
                      {category === 'innovation' && '혁신'}
                      {category === 'retention' && '인재 유지'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <BarChart3 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            최상의 고몰입 조직으로의 여정을 함께 시작해보세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onConsultationRequest}
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              무료 상담 신청
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              프로그램 가이드북 다운로드
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

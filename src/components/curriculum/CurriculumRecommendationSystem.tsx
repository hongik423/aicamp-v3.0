'use client';

import React, { useState, useMemo } from 'react';
import {
  Brain, Target, Users, Zap, ChevronRight, CheckCircle,
  BookOpen, Clock, TrendingUp, Award, Filter, Search,
  Sparkles, Lightbulb, GraduationCap, BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CurriculumRecommendation {
  id: string;
  title: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'executive';
  duration: string;
  modules: string[];
  skills: string[];
  matchScore: number;
  price: string;
  roi: string;
  targetAudience: string[];
  prerequisites: string[];
  outcomes: string[];
}

interface UserProfile {
  industry: string;
  companySize: string;
  role: string;
  experience: string;
  goals: string[];
  challenges: string[];
  budget: string;
  timeCommitment: string;
  teamSize: number;
  currentSkillLevel: number;
}

export default function CurriculumRecommendationSystem() {
  const [activeStep, setActiveStep] = useState(1);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({
    currentSkillLevel: 30,
    teamSize: 10
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  // 샘플 커리큘럼 데이터
  const curriculums: CurriculumRecommendation[] = [
    {
      id: 'basic-ai-automation',
      title: 'AI 자동화 기초 과정',
      description: 'n8n과 AI를 활용한 업무 자동화 입문 과정',
      level: 'basic',
      duration: '4주 (주 2회, 총 32시간)',
      modules: [
        'AI 기초 이해',
        'n8n 플랫폼 소개',
        '기본 워크플로우 구축',
        '데이터 연동 기초'
      ],
      skills: ['n8n 기초', 'API 연동', '워크플로우 설계', '자동화 기초'],
      matchScore: 95,
      price: '200만원',
      roi: '6개월 내 300% ROI',
      targetAudience: ['실무자', '팀장', '초급 관리자'],
      prerequisites: ['컴퓨터 기초 지식', '업무 프로세스 이해'],
      outcomes: [
        '일 2시간 업무 시간 단축',
        '반복 업무 80% 자동화',
        '오류율 50% 감소'
      ]
    },
    {
      id: 'intermediate-process',
      title: 'AI 프로세스 혁신 심화 과정',
      description: '복잡한 업무 프로세스 자동화 및 최적화',
      level: 'intermediate',
      duration: '8주 (주 2회, 총 64시간)',
      modules: [
        '고급 워크플로우 설계',
        'AI 모델 통합',
        '데이터 파이프라인 구축',
        '성과 측정 및 최적화'
      ],
      skills: ['복잡한 워크플로우', 'AI 통합', '데이터 분석', 'KPI 설정'],
      matchScore: 88,
      price: '400만원',
      roi: '4개월 내 500% ROI',
      targetAudience: ['팀장', '중간 관리자', '프로젝트 매니저'],
      prerequisites: ['기초 과정 수료', '프로그래밍 기초'],
      outcomes: [
        '일 4시간 업무 시간 단축',
        '프로세스 효율 200% 향상',
        '의사결정 속도 3배 향상'
      ]
    },
    {
      id: 'executive-transformation',
      title: '경영진 AI 전략 과정',
      description: 'AI 기반 조직 혁신 및 전략 수립',
      level: 'executive',
      duration: '4주 (주 1회, 총 16시간)',
      modules: [
        'AI 비즈니스 전략',
        '디지털 트랜스포메이션',
        'ROI 측정 및 관리',
        '조직 문화 혁신'
      ],
      skills: ['전략 수립', '변화 관리', 'ROI 분석', '리더십'],
      matchScore: 92,
      price: '600만원',
      roi: '3개월 내 1000% ROI',
      targetAudience: ['경영진', '임원', '사업부장'],
      prerequisites: ['경영 경험 5년 이상'],
      outcomes: [
        '조직 생산성 50% 향상',
        '혁신 문화 정착',
        '시장 경쟁력 강화'
      ]
    }
  ];

  // 추천 점수 계산
  const calculateMatchScore = (curriculum: CurriculumRecommendation): number => {
    let score = 50; // 기본 점수

    // 산업 매칭
    if (userProfile.industry) score += 10;
    
    // 역할 매칭
    if (userProfile.role) score += 10;
    
    // 경험 수준 매칭
    if (userProfile.experience) {
      if (userProfile.experience === 'beginner' && curriculum.level === 'basic') score += 15;
      if (userProfile.experience === 'intermediate' && curriculum.level === 'intermediate') score += 15;
      if (userProfile.experience === 'expert' && curriculum.level === 'advanced') score += 15;
    }
    
    // 목표 매칭
    if (userProfile.goals && userProfile.goals.length > 0) score += 10;
    
    // 예산 매칭
    if (userProfile.budget) score += 5;

    return Math.min(100, score);
  };

  // 추천 커리큘럼 필터링 및 정렬
  const recommendedCurriculums = useMemo(() => {
    return curriculums
      .map(curriculum => ({
        ...curriculum,
        matchScore: calculateMatchScore(curriculum)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [userProfile]);

  const handleProfileSubmit = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
            <GraduationCap className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-4xl font-bold">AI 교육 커리큘럼 추천 시스템</h2>
        <p className="text-xl text-gray-600">
          귀사에 최적화된 맞춤형 AI 교육 프로그램을 추천해드립니다
        </p>
      </div>

      {!showRecommendations ? (
        /* 프로필 입력 폼 */
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              맞춤형 커리큘럼 추천을 위한 정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: 기본 정보 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                기본 정보
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>업종</Label>
                  <Select onValueChange={(value) => setUserProfile({...userProfile, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="업종 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">제조업</SelectItem>
                      <SelectItem value="retail">유통/서비스</SelectItem>
                      <SelectItem value="finance">금융/보험</SelectItem>
                      <SelectItem value="healthcare">의료/헬스케어</SelectItem>
                      <SelectItem value="it">IT/기술</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>기업 규모</Label>
                  <Select onValueChange={(value) => setUserProfile({...userProfile, companySize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="기업 규모 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">스타트업 (10명 이하)</SelectItem>
                      <SelectItem value="small">중소기업 (10-100명)</SelectItem>
                      <SelectItem value="medium">중견기업 (100-500명)</SelectItem>
                      <SelectItem value="large">대기업 (500명 이상)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>직급/역할</Label>
                  <Select onValueChange={(value) => setUserProfile({...userProfile, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="직급 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive">경영진/임원</SelectItem>
                      <SelectItem value="manager">팀장/매니저</SelectItem>
                      <SelectItem value="staff">실무자</SelectItem>
                      <SelectItem value="it">IT/개발자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>AI 경험 수준</Label>
                  <Select onValueChange={(value) => setUserProfile({...userProfile, experience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="경험 수준 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">입문 (경험 없음)</SelectItem>
                      <SelectItem value="intermediate">중급 (기초 지식 보유)</SelectItem>
                      <SelectItem value="advanced">고급 (실무 경험 보유)</SelectItem>
                      <SelectItem value="expert">전문가 (전문 지식 보유)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Step 2: 목표 및 도전과제 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                교육 목표
              </h3>
              
              <div className="space-y-3">
                <Label>주요 목표 (복수 선택 가능)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    '업무 자동화',
                    '생산성 향상',
                    'AI 역량 강화',
                    '디지털 전환',
                    '데이터 분석',
                    '의사결정 개선'
                  ].map((goal) => (
                    <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded"
                        onChange={(e) => {
                          const goals = userProfile.goals || [];
                          if (e.target.checked) {
                            setUserProfile({...userProfile, goals: [...goals, goal]});
                          } else {
                            setUserProfile({...userProfile, goals: goals.filter(g => g !== goal)});
                          }
                        }}
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: 리소스 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                  3
                </span>
                교육 리소스
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>교육 예산</Label>
                  <Select onValueChange={(value) => setUserProfile({...userProfile, budget: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="예산 범위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">200만원 이하</SelectItem>
                      <SelectItem value="medium">200-500만원</SelectItem>
                      <SelectItem value="high">500-1000만원</SelectItem>
                      <SelectItem value="premium">1000만원 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>교육 기간</Label>
                  <Select onValueChange={(value) => setUserProfile({...userProfile, timeCommitment: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="희망 교육 기간" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">4주 이내</SelectItem>
                      <SelectItem value="medium">4-8주</SelectItem>
                      <SelectItem value="long">8-12주</SelectItem>
                      <SelectItem value="extended">12주 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>교육 대상 인원: {userProfile.teamSize}명</Label>
                <Slider
                  value={[userProfile.teamSize || 10]}
                  onValueChange={([value]) => setUserProfile({...userProfile, teamSize: value})}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>현재 AI 활용도: {userProfile.currentSkillLevel}%</Label>
                <Slider
                  value={[userProfile.currentSkillLevel || 30]}
                  onValueChange={([value]) => setUserProfile({...userProfile, currentSkillLevel: value})}
                  max={100}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleProfileSubmit}
            >
              맞춤형 커리큘럼 추천받기
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* 추천 결과 */
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">맞춤형 커리큘럼 추천 완료!</h3>
                  <p className="text-gray-600">
                    입력하신 정보를 바탕으로 최적의 교육 프로그램을 추천해드립니다.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setShowRecommendations(false)}>
                  다시 분석하기
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {recommendedCurriculums.map((curriculum, index) => (
              <Card 
                key={curriculum.id} 
                className={`border-2 ${index === 0 ? 'border-blue-500 shadow-lg' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold">{curriculum.title}</h3>
                        {index === 0 && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Award className="w-3 h-3 mr-1" />
                            최고 추천
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{curriculum.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {curriculum.matchScore}%
                      </div>
                      <p className="text-sm text-gray-500">매칭률</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">난이도</p>
                      <Badge variant="outline">
                        {curriculum.level === 'basic' && '기초'}
                        {curriculum.level === 'intermediate' && '중급'}
                        {curriculum.level === 'advanced' && '고급'}
                        {curriculum.level === 'executive' && '경영진'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">교육 기간</p>
                      <p className="font-semibold">{curriculum.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">투자 비용</p>
                      <p className="font-semibold">{curriculum.price}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">예상 ROI</p>
                      <p className="font-semibold text-green-600">{curriculum.roi}</p>
                    </div>
                  </div>

                  <Tabs defaultValue="modules" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="modules">교육 모듈</TabsTrigger>
                      <TabsTrigger value="skills">습득 스킬</TabsTrigger>
                      <TabsTrigger value="outcomes">기대 성과</TabsTrigger>
                      <TabsTrigger value="target">대상</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="modules" className="space-y-2">
                      {curriculum.modules.map((module, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{module}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="skills" className="flex flex-wrap gap-2">
                      {curriculum.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="outcomes" className="space-y-2">
                      {curriculum.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="target" className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold mb-2">교육 대상</p>
                        <div className="flex flex-wrap gap-2">
                          {curriculum.targetAudience.map((audience) => (
                            <Badge key={audience} variant="outline">{audience}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-2">선수 지식</p>
                        <div className="space-y-1">
                          {curriculum.prerequisites.map((prereq, idx) => (
                            <p key={idx} className="text-sm text-gray-600">• {prereq}</p>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      상세 커리큘럼 보기
                    </Button>
                    <Button variant="outline" className="flex-1">
                      상담 신청하기
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

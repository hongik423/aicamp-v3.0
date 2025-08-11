'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DetailedCurriculumModal from '@/components/curriculum/DetailedCurriculumModal';
import { getIndustryCurriculum } from '@/data/comprehensive-industry-curriculum';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Award,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  Zap,
  Trophy,
  Star,
  CheckCircle,
  Play,
  Building2,
  Calendar,
  DollarSign,
  BookOpen,
  Brain,
  Rocket,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessCaseProps {
  id: string;
  company: string;
  industry: string;
  category: string;
  title: string;
  description: string;
  results: {
    productivity?: string;
    cost?: string;
    time?: string;
    quality?: string;
  };
  tags: string[];
  duration: string;
  employees: string;
  featured?: boolean;
  logo?: string;
  beforeAfter?: {
    before: number;
    after: number;
    metric: string;
  };
  testimonial?: string;
  ceoName?: string;
  implementationStage?: 'planning' | 'inProgress' | 'completed';
  aiTools?: string[];
  certificateLevel?: 'basic' | 'advanced' | 'expert';
}

export default function EnhancedSuccessCaseCard({ 
  id,
  company,
  industry,
  category,
  title,
  description,
  results,
  tags,
  duration,
  employees,
  featured = false,
  logo,
  beforeAfter,
  testimonial,
  ceoName,
  implementationStage = 'completed',
  aiTools = [],
  certificateLevel
}: SuccessCaseProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // 업종별 색상 테마
  const getIndustryTheme = (industry: string) => {
    const themes: Record<string, { bg: string; border: string; text: string; accent: string; icon: any }> = {
      '제조업': { 
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50', 
        border: 'border-blue-300',
        text: 'text-blue-800',
        accent: 'bg-blue-600',
        icon: '🏭'
      },
      'IT서비스': { 
        bg: 'bg-gradient-to-br from-purple-50 to-pink-50', 
        border: 'border-purple-300',
        text: 'text-purple-800',
        accent: 'bg-purple-600',
        icon: '💻'
      },
      '금융업': { 
        bg: 'bg-gradient-to-br from-green-50 to-emerald-50', 
        border: 'border-green-300',
        text: 'text-green-800',
        accent: 'bg-green-600',
        icon: '💰'
      },
      '유통업': { 
        bg: 'bg-gradient-to-br from-orange-50 to-amber-50', 
        border: 'border-orange-300',
        text: 'text-orange-800',
        accent: 'bg-orange-600',
        icon: '🛒'
      },
      '의료업': { 
        bg: 'bg-gradient-to-br from-red-50 to-pink-50', 
        border: 'border-red-300',
        text: 'text-red-800',
        accent: 'bg-red-600',
        icon: '🏥'
      },
      '교육업': { 
        bg: 'bg-gradient-to-br from-cyan-50 to-blue-50', 
        border: 'border-cyan-300',
        text: 'text-cyan-800',
        accent: 'bg-cyan-600',
        icon: '🎓'
      },
      '건설업': { 
        bg: 'bg-gradient-to-br from-yellow-50 to-orange-50', 
        border: 'border-yellow-300',
        text: 'text-yellow-800',
        accent: 'bg-yellow-600',
        icon: '🏗️'
      },
      '농업': { 
        bg: 'bg-gradient-to-br from-green-50 to-lime-50', 
        border: 'border-green-300',
        text: 'text-green-800',
        accent: 'bg-green-600',
        icon: '🌾'
      }
    };
    return themes[industry] || themes['제조업'];
  };

  const theme = getIndustryTheme(industry);

  // 성과 지표 계산
  const calculateImpactScore = () => {
    let score = 0;
    if (results.productivity) score += parseInt(results.productivity) || 0;
    if (results.cost) score += 30;
    if (results.time) score += parseInt(results.time) || 0;
    if (results.quality) score += 20;
    return Math.min(score, 100);
  };

  const impactScore = calculateImpactScore();

  // 구현 단계별 색상
  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'inProgress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 인증 레벨별 배지
  const getCertificateBadge = (level?: string) => {
    switch(level) {
      case 'basic': return { color: 'bg-bronze', label: '기초 인증', icon: '🥉' };
      case 'advanced': return { color: 'bg-silver', label: '심화 인증', icon: '🥈' };
      case 'expert': return { color: 'bg-gold', label: '전문가 인증', icon: '🥇' };
      default: return null;
    }
  };

  const certificate = getCertificateBadge(certificateLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`
        relative overflow-hidden h-full 
        ${theme.bg} ${theme.border} border-2
        transition-all duration-300 
        hover:shadow-2xl hover:border-opacity-80
        ${featured ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
      `}>
        {/* 특별 추천 배지 */}
        {featured && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-lg shadow-lg">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-bold">BEST CASE</span>
              </div>
            </div>
          </div>
        )}

        {/* 비디오 플레이 버튼 (호버시) */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 z-20 flex items-center justify-center">
            <Button
              onClick={() => setShowVideo(true)}
              className="bg-white text-black hover:bg-gray-100 rounded-full p-4"
            >
              <Play className="w-8 h-8" />
            </Button>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {/* 업종 아이콘 */}
              <div className={`w-12 h-12 ${theme.accent} rounded-lg flex items-center justify-center text-2xl shadow-lg`}>
                {theme.icon}
              </div>
              
              {/* 회사 정보 */}
              <div>
                <h3 className={`font-bold text-lg ${theme.text}`}>{company}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge variant="outline" className="text-xs">
                    {industry}
                  </Badge>
                  <span>•</span>
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {employees}
                  </span>
                </div>
              </div>
            </div>

            {/* 인증 배지 */}
            {certificate && (
              <div className="flex flex-col items-end">
                <Badge className={`${certificate.color} text-white px-2 py-1`}>
                  <span className="mr-1">{certificate.icon}</span>
                  {certificate.label}
                </Badge>
              </div>
            )}
          </div>

          {/* 제목 */}
          <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">
            {title}
          </h4>

          {/* 구현 단계 */}
          <div className="flex items-center justify-between mb-3">
            <Badge className={getStageColor(implementationStage)}>
              {implementationStage === 'planning' && '도입 준비중'}
              {implementationStage === 'inProgress' && '구현 진행중'}
              {implementationStage === 'completed' && '구현 완료'}
            </Badge>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
          </div>

          {/* AI 도구 태그 */}
          {aiTools.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {aiTools.slice(0, 3).map((tool, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {tool}
                </Badge>
              ))}
              {aiTools.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{aiTools.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 설명 */}
          <p className="text-sm text-gray-700 line-clamp-2">
            {description}
          </p>

          {/* Before/After 비교 */}
          {beforeAfter && (
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-600 mb-2">{beforeAfter.metric}</div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Before</div>
                  <div className="text-lg font-bold text-gray-400">{beforeAfter.before}%</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="text-xs text-gray-500">After</div>
                  <div className="text-lg font-bold text-green-600">{beforeAfter.after}%</div>
                </div>
              </div>
              <Progress value={beforeAfter.after} className="h-2" />
            </div>
          )}

          {/* 성과 지표 */}
          <div className="grid grid-cols-2 gap-2">
            {results.productivity && (
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <TrendingUp className={`w-4 h-4 ${theme.text} mx-auto mb-1`} />
                <div className="text-xs text-gray-600">생산성</div>
                <div className={`text-sm font-bold ${theme.text}`}>{results.productivity}</div>
              </div>
            )}
            {results.cost && (
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <DollarSign className={`w-4 h-4 ${theme.text} mx-auto mb-1`} />
                <div className="text-xs text-gray-600">비용절감</div>
                <div className={`text-sm font-bold ${theme.text}`}>{results.cost}</div>
              </div>
            )}
            {results.time && (
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <Clock className={`w-4 h-4 ${theme.text} mx-auto mb-1`} />
                <div className="text-xs text-gray-600">시간단축</div>
                <div className={`text-sm font-bold ${theme.text}`}>{results.time}</div>
              </div>
            )}
            {results.quality && (
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <Award className={`w-4 h-4 ${theme.text} mx-auto mb-1`} />
                <div className="text-xs text-gray-600">품질향상</div>
                <div className={`text-sm font-bold ${theme.text}`}>{results.quality}</div>
              </div>
            )}
          </div>

          {/* 임팩트 스코어 */}
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">AI 도입 임팩트 지수</span>
              <span className={`text-sm font-bold ${theme.text}`}>{impactScore}점</span>
            </div>
            <Progress value={impactScore} className="h-2" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(impactScore / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <Badge variant="outline" className="text-xs">
                {impactScore >= 80 ? '매우 우수' : impactScore >= 60 ? '우수' : '양호'}
              </Badge>
            </div>
          </div>

          {/* CEO 추천사 */}
          {testimonial && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 relative">
              <div className="text-xs text-gray-600 mb-1">CEO 추천사</div>
              <p className="text-xs text-gray-700 italic line-clamp-2">
                "{testimonial}"
              </p>
              {ceoName && (
                <p className="text-xs text-gray-500 text-right mt-1">- {ceoName}</p>
              )}
            </div>
          )}

          {/* 태그 */}
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="flex space-x-2 pt-2">
            <Link href={`/cases/${id}`} className="flex-1">
              <Button className={`w-full ${theme.accent} hover:opacity-90 text-white`}>
                <BookOpen className="w-4 h-4 mr-2" />
                상세보기
              </Button>
            </Link>
            <DetailedCurriculumModal
              courseLevel="basic"
              industryName={industry}
              modules={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.basic || [
                  {
                    title: `${industry} AI 기초과정`,
                    duration: '12시간',
                    description: `${industry}에 특화된 AI 기초 교육과정`,
                    objectives: ['AI 기본 개념 이해', '업무 적용 방법 습득', '실무 사례 분석', '성과 측정 방법 학습'],
                    practicalExercises: ['ChatGPT 활용 실습', '업무 자동화 실습', '데이터 분석 실습', '성과 측정 실습'],
                    expectedOutcomes: ['생산성 30% 향상', '업무 시간 40% 단축', 'AI 활용 능력 향상', '비용 절감 효과'],
                    tools: ['ChatGPT', 'Claude', 'n8n', 'Google Sheets'],
                    difficulty: 'beginner' as const,
                    category: 'basic' as const
                  }
                ];
              })()}
              totalDuration={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.totalDuration?.basic || '36시간';
              })()}
              expectedROI={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.roi || {
                  productivity: '30% 향상',
                  costSaving: '월 500만원 절감',
                  timeReduction: '업무시간 40% 단축'
                };
              })()}
            >
              <Button variant="outline" className="flex-1">
                <Brain className="w-4 h-4 mr-2" />
                커리큘럼
              </Button>
            </DetailedCurriculumModal>
          </div>

          {/* 추가 커리큘럼 레벨 */}
          <div className="flex space-x-1 mt-2">
            <DetailedCurriculumModal
              courseLevel="advanced"
              industryName={industry}
              modules={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.advanced || [];
              })()}
              totalDuration={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.totalDuration?.advanced || '48시간';
              })()}
              expectedROI={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.roi || {
                  productivity: '50% 향상',
                  costSaving: '월 1000만원 절감',
                  timeReduction: '업무시간 60% 단축'
                };
              })()}
            >
              <Button variant="ghost" size="sm" className="flex-1 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                심화과정
              </Button>
            </DetailedCurriculumModal>

            <DetailedCurriculumModal
              courseLevel="executive"
              industryName={industry}
              modules={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.executive || [];
              })()}
              totalDuration={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.totalDuration?.executive || '12시간';
              })()}
              expectedROI={(() => {
                const industryMapping: Record<string, string> = {
                  '제조업': 'manufacturing',
                  '영업': 'sales',
                  '마케팅': 'marketing',
                  '기획/전략': 'planning',
                  '인사/총무': 'hr',
                  '재무/회계': 'finance',
                  '고객지원': 'customer_service',
                  '생산/물류': 'logistics',
                  '교육/에듀테크': 'education'
                };
                const industryCode = industryMapping[industry] || 'manufacturing';
                const curriculumData = getIndustryCurriculum(industryCode);
                return curriculumData?.roi || {
                  productivity: '70% 향상',
                  costSaving: '연간 2억원 절감',
                  timeReduction: '전략적 의사결정 80% 개선'
                };
              })()}
            >
              <Button variant="ghost" size="sm" className="flex-1 text-xs">
                <Award className="w-3 h-3 mr-1" />
                경영진과정
              </Button>
            </DetailedCurriculumModal>
          </div>

          {/* 빠른 문의 버튼 */}
          <Button 
            variant="ghost" 
            className="w-full text-xs text-gray-600 hover:text-gray-900 mt-2"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            우리 회사도 이렇게 하고 싶어요!
          </Button>

          {/* 고지사항 */}
          <div className="text-xs text-gray-500 text-center mt-2 p-2 bg-gray-50 rounded border-l-2 border-amber-300">
            <div className="flex items-center justify-center space-x-1">
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              <span>성공 벤치마크 기준 - 교육 완료 시 기대효과</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

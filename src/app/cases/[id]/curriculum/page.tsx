'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Users, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CurriculumCard } from '@/components/curriculum/CurriculumCard';
import { CurriculumDetailModal } from '@/components/curriculum/CurriculumDetailModal';
import { curriculumData } from '@/data/curriculums';
import { successCases } from '@/app/cases/data';
import { CurriculumLevel } from '@/types/curriculum.types';

export default function CurriculumPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 성공사례 데이터에서 해당 케이스 찾기
  const caseData = successCases.find(c => c.id === params.id);
  if (!caseData) {
    return <div>사례를 찾을 수 없습니다.</div>;
  }

  // 해당 업종의 커리큘럼 데이터 가져오기
  const curriculum = curriculumData[caseData.category];
  if (!curriculum) {
    return <div>커리큘럼 정보를 찾을 수 없습니다.</div>;
  }

  const handleSelectLevel = (level: CurriculumLevel) => {
    setSelectedLevel(level);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                뒤로 가기
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold">{caseData.companyName}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-8">
        {/* 타이틀 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI CAMP 커리큘럼</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {curriculum.industry} 맞춤형 AI 교육
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {curriculum.description}
          </p>
        </div>

        {/* 특징 카드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">맞춤형 교육</h3>
            <p className="text-sm text-muted-foreground">
              {curriculum.industry} 특성에 최적화된 AI & n8n 자동화 교육
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">실무 중심</h3>
            <p className="text-sm text-muted-foreground">
              현장에서 바로 적용 가능한 실습 위주의 커리큘럼
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">성과 보장</h3>
            <p className="text-sm text-muted-foreground">
              검증된 커리큘럼으로 즉각적인 업무 효율 향상
            </p>
          </div>
        </div>

        {/* 커리큘럼 레벨 카드 */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            교육 과정 선택
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {curriculum.levels.map((level) => (
              <CurriculumCard
                key={level.id}
                level={level}
                industryKey={curriculum.industryKey}
                onSelect={() => handleSelectLevel(level)}
              />
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            지금 바로 AI 자동화 혁신을 시작하세요
          </h3>
          <p className="mb-6 text-white/90">
            {curriculum.industry} 맞춤형 AI Camp 교육으로 업무 효율을 극대화하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              교육 문의하기
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              자료 다운로드
            </Button>
          </div>
        </div>
      </div>

      {/* 상세 모달 */}
      <CurriculumDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        level={selectedLevel}
        industryName={curriculum.industry}
      />
    </div>
  );
}

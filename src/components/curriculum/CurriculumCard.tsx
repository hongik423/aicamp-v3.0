'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target } from 'lucide-react';
import { CurriculumLevel } from '@/types/curriculum.types';

interface CurriculumCardProps {
  level: CurriculumLevel;
  industryKey: string;
  onSelect: () => void;
}

export function CurriculumCard({ level, industryKey, onSelect }: CurriculumCardProps) {
  const getLevelColor = (levelType: string) => {
    switch (levelType) {
      case '기초':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '심화':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '경영진':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer h-full"
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getLevelColor(level.level)}>
            {level.level} 과정
          </Badge>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {level.duration}
          </Badge>
        </div>
        <CardTitle className="text-xl">{level.level} 과정</CardTitle>
        <CardDescription className="mt-2">
          <div className="flex items-center gap-1 text-sm">
            <Users className="w-4 h-4" />
            {level.targetAudience}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <Target className="w-4 h-4" />
              교육 목표
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {level.objectives.slice(0, 3).map((objective, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="line-clamp-2">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-2">주요 학습 내용</h4>
            <div className="flex flex-wrap gap-1">
              {level.sessions.slice(0, 4).map((session, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {session.topic}
                </Badge>
              ))}
              {level.sessions.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{level.sessions.length - 4}개
                </Badge>
              )}
            </div>
          </div>

          <div className="pt-2 border-t">
            <h4 className="font-semibold text-sm mb-2">기대 효과</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {level.outcomes.slice(0, 2).map((outcome, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="line-clamp-1">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Users, Target, BookOpen, Award } from 'lucide-react';
import { CurriculumLevel } from '@/types/curriculum.types';
import { Button } from '@/components/ui/button';

interface CurriculumDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: CurriculumLevel | null;
  industryName: string;
}

export function CurriculumDetailModal({ 
  isOpen, 
  onClose, 
  level, 
  industryName 
}: CurriculumDetailModalProps) {
  if (!level) return null;

  const getLevelColor = (levelType: string) => {
    switch (levelType) {
      case '기초':
        return 'bg-blue-100 text-blue-800';
      case '심화':
        return 'bg-purple-100 text-purple-800';
      case '경영진':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge className={getLevelColor(level.level)}>
                {level.level} 과정
              </Badge>
              <Badge variant="outline">
                {industryName}
              </Badge>
            </div>
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              {level.duration}
            </Badge>
          </div>
          <DialogTitle className="text-2xl">
            {industryName} {level.level} 과정 커리큘럼
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6">
            {/* 대상 */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                교육 대상
              </h3>
              <p className="text-sm">{level.targetAudience}</p>
            </div>

            {/* 교육 목표 */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                교육 목표
              </h3>
              <ul className="space-y-2">
                {level.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-primary mr-2 mt-0.5">•</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 커리큘럼 상세 */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                상세 커리큘럼
              </h3>
              <div className="space-y-2">
                {level.sessions.map((session, idx) => (
                  <div 
                    key={idx} 
                    className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {session.time}
                          </Badge>
                          <h4 className="font-medium">{session.topic}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-12">
                          {session.description}
                        </p>
                        {session.tools && session.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 ml-12">
                            {session.tools.map((tool, toolIdx) => (
                              <Badge key={toolIdx} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 기대 효과 */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                기대 효과
              </h3>
              <ul className="space-y-2">
                {level.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 문의 버튼 */}
            <div className="flex justify-center pt-4">
              <Button size="lg" className="px-8">
                교육 문의하기
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

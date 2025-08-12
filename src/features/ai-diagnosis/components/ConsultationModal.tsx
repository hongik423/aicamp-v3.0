'use client'

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, Loader2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsultationModalProps {
  diagnosisId?: string;
  companyName?: string;
  trigger?: React.ReactNode;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  diagnosisId,
  companyName,
  trigger
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: companyName || '',
    consultationType: '',
    preferredTime: '',
    specificNeeds: '',
    budgetInfo: '',
    decisionTimeline: ''
  });

  const consultationTypes = [
    'AI 전략 수립 컨설팅',
    'AI 교육 프로그램 문의',
    'POC 프로젝트 상담',
    '전사 AI 도입 컨설팅',
    '맞춤형 솔루션 개발',
    '기타'
  ];

  const timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      toast({
        title: "입력 확인",
        description: "필수 항목을 모두 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          preferredDate: date ? format(date, 'yyyy-MM-dd') : '',
          assessmentReference: diagnosisId || ''
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "상담 신청 완료",
          description: "곧 담당자가 연락드리겠습니다",
        });
        setOpen(false);
        // 폼 초기화
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: companyName || '',
          consultationType: '',
          preferredTime: '',
          specificNeeds: '',
          budgetInfo: '',
          decisionTimeline: ''
        });
        setDate(undefined);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Consultation request error:', error);
      toast({
        title: "신청 실패",
        description: error instanceof Error ? error.message : "상담 신청 중 오류가 발생했습니다",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            무료 상담 신청
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI 도입 컨설팅 상담 신청</DialogTitle>
          <DialogDescription>
            전문가와 1:1 맞춤 상담을 통해 구체적인 실행 방안을 수립하세요
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@company.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-0000-0000"
                required
              />
            </div>
            <div>
              <Label htmlFor="company">회사명 *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="회사명"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="consultationType">상담 유형</Label>
            <Select 
              value={formData.consultationType} 
              onValueChange={(value) => setFormData({ ...formData, consultationType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="상담 유형을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {consultationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>희망 상담일</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ko }) : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="preferredTime">희망 시간대</Label>
              <Select 
                value={formData.preferredTime} 
                onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="시간대 선택" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="specificNeeds">구체적인 상담 내용</Label>
            <Textarea
              id="specificNeeds"
              value={formData.specificNeeds}
              onChange={(e) => setFormData({ ...formData, specificNeeds: e.target.value })}
              placeholder="어떤 부분에 대해 상담받고 싶으신지 구체적으로 알려주세요"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetInfo">예산 규모</Label>
              <Select 
                value={formData.budgetInfo} 
                onValueChange={(value) => setFormData({ ...formData, budgetInfo: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="예산 규모 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000만원 미만">1,000만원 미만</SelectItem>
                  <SelectItem value="1000-3000만원">1,000-3,000만원</SelectItem>
                  <SelectItem value="3000-5000만원">3,000-5,000만원</SelectItem>
                  <SelectItem value="5000만원-1억원">5,000만원-1억원</SelectItem>
                  <SelectItem value="1억원 이상">1억원 이상</SelectItem>
                  <SelectItem value="미정">미정</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="decisionTimeline">의사결정 시기</Label>
              <Select 
                value={formData.decisionTimeline} 
                onValueChange={(value) => setFormData({ ...formData, decisionTimeline: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="의사결정 시기" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1개월 내">1개월 내</SelectItem>
                  <SelectItem value="3개월 내">3개월 내</SelectItem>
                  <SelectItem value="6개월 내">6개월 내</SelectItem>
                  <SelectItem value="1년 내">1년 내</SelectItem>
                  <SelectItem value="미정">미정</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {diagnosisId && (
            <Alert>
              <AlertDescription>
                진단번호 {diagnosisId}의 결과를 바탕으로 상담이 진행됩니다
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  제출 중...
                </>
              ) : (
                '상담 신청'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;

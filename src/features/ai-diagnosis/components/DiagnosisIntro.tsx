'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Target, TrendingUp, Award, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisIntroProps {
  onStart: (data: any) => void;
}

const DiagnosisIntro: React.FC<DiagnosisIntroProps> = ({ onStart }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const benefits = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "맞춤형 AI 전략",
      description: "귀사의 업종과 규모에 최적화된 AI 도입 전략을 제시합니다"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "ROI 분석",
      description: "투자 대비 효과를 정량적으로 분석하여 의사결정을 지원합니다"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      title: "단계별 로드맵",
      description: "3단계 실행 로드맵으로 체계적인 AI 도입을 안내합니다"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "벤치마크 비교",
      description: "동종업계 대비 AI 성숙도를 객관적으로 평가합니다"
    }
  ];

  const process = [
    { step: 1, title: "기본정보 입력", time: "5분" },
    { step: 2, title: "현황 평가", time: "10분" },
    { step: 3, title: "목표 설정", time: "5분" },
    { step: 4, title: "AI 분석", time: "즉시" },
    { step: 5, title: "보고서 생성", time: "자동" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = '부서/직책을 입력해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onStart(formData);
      toast({
        title: "진단을 시작합니다",
        description: "AI 역량진단을 진행해주세요",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 히어로 섹션 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
        <div className="container max-w-6xl mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-4 h-4 mr-1" />
              GEMINI 2.5 FLASH 기반 AI 분석
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI 역량진단 시스템
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              귀사의 AI 도입 준비도를 종합적으로 진단하고,
              <br />
              맞춤형 고몰입조직구축 전략을 제시합니다
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="outline" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                약 20분 소요
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                100% 무료
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                맞춤형 보고서
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 왼쪽: 혜택 및 프로세스 */}
          <div className="space-y-8">
            {/* 주요 혜택 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                진단을 통해 얻을 수 있는 가치
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">{benefit.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* 진단 프로세스 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                진단 프로세스
              </h2>
              <div className="relative">
                {process.map((item, index) => (
                  <div key={item.step} className="flex items-center mb-4 last:mb-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.time}
                        </Badge>
                      </div>
                    </div>
                    {index < process.length - 1 && (
                      <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 오른쪽: 시작 폼 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>진단 시작하기</CardTitle>
                <CardDescription>
                  기본 정보를 입력하고 AI 역량진단을 시작하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="홍길동"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="example@company.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="010-0000-0000"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="department">부서/직책 *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      placeholder="경영기획팀 / 팀장"
                      className={errors.department ? 'border-red-500' : ''}
                    />
                    {errors.department && (
                      <p className="text-sm text-red-500 mt-1">{errors.department}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" size="lg">
                      진단 시작하기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    제출하신 정보는 진단 목적으로만 사용되며, 안전하게 보호됩니다.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisIntro;

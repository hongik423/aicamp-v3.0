'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Loader2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { diagnosisSections } from '../constants/questions';
import { AIDiagnosisData, DiagnosisSection, Question } from '../types';
import QuestionRenderer from './QuestionRenderer';
import DiagnosisIntro from './DiagnosisIntro';
import DiagnosisComplete from './DiagnosisComplete';

const AIDiagnosisForm: React.FC = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(-1); // -1 for intro
  const [formData, setFormData] = useState<Partial<AIDiagnosisData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  // 전체 진행률 계산
  const progress = currentSection === -1 ? 0 : 
    ((currentSection + 1) / diagnosisSections.length) * 100;

  // 현재 섹션 데이터
  const currentSectionData = currentSection >= 0 ? diagnosisSections[currentSection] : null;

  // 로컬 스토리지에 진행 상황 저장
  useEffect(() => {
    if (currentSection >= 0) {
      localStorage.setItem('ai-diagnosis-progress', JSON.stringify({
        currentSection,
        formData,
        completedSections,
        timestamp: new Date().toISOString()
      }));
    }
  }, [currentSection, formData, completedSections]);

  // 이전 진행 상황 복원
  useEffect(() => {
    const savedProgress = localStorage.getItem('ai-diagnosis-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 1);
        
        if (new Date(parsed.timestamp) > dayAgo) {
          setFormData(parsed.formData);
          setCompletedSections(parsed.completedSections);
          toast({
            title: "이전 진행 상황을 복원했습니다",
            description: "이어서 진단을 진행해주세요",
          });
        }
      } catch (error) {
        console.error('Failed to restore progress:', error);
      }
    }
  }, []);

  // 필드 값 업데이트
  const updateFieldValue = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // 에러 클리어
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  // 섹션 유효성 검사
  const validateSection = (): boolean => {
    if (!currentSectionData) return true;
    
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentSectionData.questionGroups.forEach(group => {
      group.questions.forEach(question => {
        if (question.required) {
          const value = formData[question.id];
          
          if (!value || (Array.isArray(value) && value.length === 0)) {
            newErrors[question.id] = '필수 항목입니다';
            isValid = false;
          } else if (question.minLength && typeof value === 'string' && value.length < question.minLength) {
            newErrors[question.id] = `최소 ${question.minLength}자 이상 입력해주세요`;
            isValid = false;
          }
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  // 다음 섹션으로 이동
  const handleNext = () => {
    if (currentSection >= 0 && !validateSection()) {
      toast({
        title: "입력 확인 필요",
        description: "필수 항목을 모두 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    if (currentSection >= 0 && !completedSections.includes(currentSection)) {
      setCompletedSections(prev => [...prev, currentSection]);
    }

    if (currentSection < diagnosisSections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  // 이전 섹션으로 이동
  const handlePrevious = () => {
    if (currentSection > -1) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // 특정 섹션으로 이동
  const goToSection = (index: number) => {
    if (index <= completedSections.length) {
      setCurrentSection(index);
      window.scrollTo(0, 0);
    }
  };

  // 폼 제출
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // 전체 데이터 구성
      const submissionData: AIDiagnosisData = {
        // 기본 정보 (intro에서 수집)
        email: formData.email || '',
        name: formData.name || '',
        phone: formData.phone || '',
        department: formData.department || '',
        
        // 섹션별 데이터 구성
        companyInfo: {
          companyName: formData.companyName || '',
          businessRegistration: formData.businessRegistration,
          establishmentYear: formData.establishmentYear || '',
          industryMain: formData.industryMain || '',
          businessModel: formData.businessModel || [],
          mainProductsServices: formData.mainProductsServices || '',
          targetCustomers: formData.targetCustomers || '',
          employeeCount: formData.employeeCount || '',
          annualRevenue: formData.annualRevenue
        },
        currentAIUsage: {
          aiFamiliarity: formData.aiFamiliarity || 1,
          currentAiTools: formData.currentAiTools || [],
          aiUsageDepartments: formData.aiUsageDepartments || [],
          automationLevelByFunction: formData.automationLevelByFunction || {},
          dataDigitalization: formData.dataDigitalization || 1,
          itSystems: formData.itSystems || [],
          cloudUsage: formData.cloudUsage || ''
        },
        organizationReadiness: {
          ceoAiCommitment: formData.ceoAiCommitment || 1,
          digitalTransformationPriority: formData.digitalTransformationPriority || 1,
          employeeTechAcceptance: formData.employeeTechAcceptance || 1,
          changeManagementExperience: formData.changeManagementExperience || [],
          innovationCulture: formData.innovationCulture || 1
        },
        currentChallenges: {
          biggestInefficiencies: formData.biggestInefficiencies || [],
          timeConsumingTasks: formData.timeConsumingTasks || '',
          marketPressure: formData.marketPressure || [],
          competitiveDisadvantages: formData.competitiveDisadvantages
        },
        aiGoals: {
          aiTransformationGoals: formData.aiTransformationGoals || [],
          specificImprovements: formData.specificImprovements || '',
          kpiPriorities: formData.kpiPriorities || [],
          targetImprovements: formData.targetImprovements || {}
        },
        investmentCapacity: {
          aiBudgetRange: formData.aiBudgetRange || '',
          budgetAllocation: formData.budgetAllocation || {},
          roiExpectations: formData.roiExpectations || '',
          implementationTimeline: formData.implementationTimeline || '',
          internalResources: formData.internalResources || [],
          supportNeeds: formData.supportNeeds || []
        },
        timestamp: new Date().toISOString()
      };

      // API 호출
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setDiagnosisResult(result);
        localStorage.removeItem('ai-diagnosis-progress');
        toast({
          title: "진단이 완료되었습니다!",
          description: "곧 결과 보고서를 확인하실 수 있습니다",
        });
      } else {
        throw new Error(result.error || '진단 처리 중 오류가 발생했습니다');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "제출 실패",
        description: error instanceof Error ? error.message : "진단 제출 중 오류가 발생했습니다",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 진단 시작
  const handleStart = (introData: any) => {
    setFormData(prev => ({
      ...prev,
      ...introData
    }));
    setCurrentSection(0);
  };

  // 완료 화면
  if (diagnosisResult) {
    return <DiagnosisComplete result={diagnosisResult} />;
  }

  // 인트로 화면
  if (currentSection === -1) {
    return <DiagnosisIntro onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI 역량진단 시스템
          </h1>
          <p className="text-gray-600">
            귀사의 AI 도입 준비도를 종합적으로 진단합니다
          </p>
        </div>

        {/* 진행률 표시 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                전체 진행률
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            
            {/* 섹션 인디케이터 */}
            <div className="flex justify-between">
              {diagnosisSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToSection(index)}
                  disabled={index > completedSections.length}
                  className={`flex flex-col items-center gap-1 cursor-pointer disabled:cursor-not-allowed`}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm
                    ${completedSections.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : index === currentSection 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-500'}
                  `}>
                    {completedSections.includes(index) ? <Check size={16} /> : section.icon}
                  </div>
                  <span className="text-xs text-gray-600 text-center max-w-[80px]">
                    {section.title.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 현재 섹션 콘텐츠 */}
        <AnimatePresence mode="wait">
          {currentSectionData && (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{currentSectionData.icon}</span>
                    <span>{currentSectionData.title}</span>
                  </CardTitle>
                  <CardDescription>
                    {currentSectionData.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {currentSectionData.questionGroups.map((group) => (
                    <div key={group.id} className="space-y-6">
                      {group.title && (
                        <h3 className="text-lg font-semibold text-gray-800">
                          {group.title}
                        </h3>
                      )}
                      {group.description && (
                        <p className="text-sm text-gray-600">
                          {group.description}
                        </p>
                      )}
                      <div className="space-y-6">
                        {group.questions.map((question) => (
                          <QuestionRenderer
                            key={question.id}
                            question={question}
                            value={formData[question.id]}
                            onChange={(value) => updateFieldValue(question.id, value)}
                            error={errors[question.id]}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 에러 메시지 */}
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              필수 항목을 모두 입력해주세요
            </AlertDescription>
          </Alert>
        )}

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0 || isSubmitting}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            이전
          </Button>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                처리 중...
              </>
            ) : currentSection === diagnosisSections.length - 1 ? (
              <>
                제출하기
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                다음
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIDiagnosisForm;

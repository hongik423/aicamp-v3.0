'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PrivacyConsent from '@/components/ui/privacy-consent';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  Calendar, 
  User, 
  Building,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  AlertCircle,
  Loader2,
  WifiOff,
  Sparkles,
  Star,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react';

export default function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const { toast } = useToast();
  const [persistentNoticeOpen, setPersistentNoticeOpen] = useState(false);

  const [formData, setFormData] = useState({
    consultationType: '',
    name: '',
    phone: '',
    email: '',
    company: '',
    position: '',
    consultationArea: '',
    inquiryContent: '',
    preferredTime: '',
    privacyConsent: false
  });

  const isFormValid = useMemo(() => {
    return Boolean(
      formData.consultationType?.trim() && 
      formData.name?.trim() && 
      formData.phone?.trim() && 
      formData.email?.trim() && 
      formData.company?.trim() && 
      formData.inquiryContent?.trim() && 
      formData.inquiryContent?.trim().length >= 10 &&
      formData.privacyConsent
    );
  }, [formData]);

  const handleInputChange = useCallback((field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      consultationType: '',
      name: '',
      phone: '',
      email: '',
      company: '',
      position: '',
      consultationArea: '',
      inquiryContent: '',
      preferredTime: '',
      privacyConsent: false
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitAttempts(prev => prev + 1);
    setPersistentNoticeOpen(true);

    toast({
      title: "상담 신청 처리 중...",
      description: "완료 및 이메일 발송까지 안내를 유지합니다.",
      duration: 4000,
    });

    try {
      if (!isFormValid) {
        console.log('폼 검증 실패:', {
          consultationType: formData.consultationType,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          privacyConsent: formData.privacyConsent
        });
        throw new Error('VALIDATION_ERROR');
      }

      // 개인정보 동의 재확인 (더 명확한 검증)
      console.log('개인정보 동의 상태 상세 확인:', {
        privacyConsent: formData.privacyConsent,
        type: typeof formData.privacyConsent,
        strictCheck: formData.privacyConsent === true
      });
      
      if (!formData.privacyConsent || formData.privacyConsent !== true) {
        console.error('개인정보 동의 상태 확인 실패:', formData.privacyConsent);
        toast({
          variant: "destructive",
          title: "개인정보 동의 필요",
          description: "개인정보 수집 및 이용에 동의해주세요. 이는 필수 사항입니다.",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }
      
      console.log('✅ 개인정보 동의 검증 통과:', formData.privacyConsent);

      const consultationData = {
        ...formData,
        submitDate: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      };

      // 메일 발송 시도 1: Google Apps Script (프록시 사용)
      const proxyUrl = '/api/google-script-proxy';
      
      const postData = {
        제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        폼타입: '상담신청',
        상담유형: consultationData.consultationType,
        성명: consultationData.name,
        연락처: consultationData.phone,
        이메일: consultationData.email,
        회사명: consultationData.company,
        직책: consultationData.position || '',
        상담분야: consultationData.consultationArea || '',
        문의내용: consultationData.inquiryContent || '',
        희망상담시간: consultationData.preferredTime || '',
        개인정보동의: consultationData.privacyConsent === true ? '동의' : '미동의',
        action: 'consultation',
        dataSource: '웹사이트_상담신청',
        timestamp: Date.now()
      };

      console.log('📤 Google Apps Script 데이터 전송:', postData);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 600000); // 10분까지 대기 (프록시가 13.3분 처리)

        const response = await fetch(proxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(postData),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const responseText = await response.text();
          console.log('Google Apps Script 응답:', responseText);
          let parsed: any = null;
          try { parsed = JSON.parse(responseText); } catch {}

          toast({
            title: "🎉 상담 신청 완료!",
            description: parsed?.backgroundProcessing ? "백그라운드에서 처리 중이며 완료 시 이메일이 발송됩니다." : "빠른 시일 내에 연락드리겠습니다. 감사합니다.",
            duration: 6000,
          });

          resetForm();
          setSubmitAttempts(0);
          
          // 완료 후에도 안내 유지 (사용자 지침 반영)
          return;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('aborted')) {
          console.warn('Google Apps Script 타임아웃, 백업 시스템 시도');
        } else if (errorMessage.includes('CORS')) {
          console.warn('Google Apps Script CORS 오류, 백업 시스템 시도');
        } else {
          console.warn('Google Apps Script 실패, 백업 시스템 시도:', errorMessage);
        }
      }

      // 메일 발송 시도 2: API Route 백업
      try {
        const apiController = new AbortController();
        const apiTimeoutId = setTimeout(() => apiController.abort(), 15000); // 15초 타임아웃

        const apiResponse = await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(consultationData),
          signal: apiController.signal
        });

        clearTimeout(apiTimeoutId);

        if (apiResponse.ok) {
          toast({
            title: "🎉 상담 신청 완료!",
            description: "투자재무타당성분석기로 이동합니다...",
            duration: 3000,
          });

          resetForm();
          setSubmitAttempts(0);
          
          // 투자재무타당성분석기로 즉시 이동
          setTimeout(() => {
            window.location.href = '/services/policy-funding/investment-analysis';
          }, 1500);
          return;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('aborted')) {
          console.warn('⚠️ API 백업 타임아웃:', errorMessage);
        } else {
          console.warn('⚠️ API 백업도 실패:', errorMessage);
        }
      }

      // 모든 방법 실패 시
      throw new Error('ALL_METHODS_FAILED');

    } catch (error) {
      console.error('❌ 상담 신청 오류:', error);
      
      let errorTitle = "상담 신청 처리 중 오류가 발생했습니다";
      let errorDescription = "잠시 후 다시 시도해 주세요";

      if (error instanceof Error) {
        if (error.message === 'VALIDATION_ERROR') {
          errorTitle = "📝 필수 정보를 입력해 주세요";
          
          // 누락된 필수 항목을 구체적으로 안내
          const missingFields = [];
          if (!formData.consultationType?.trim()) missingFields.push("상담 유형");
          if (!formData.name?.trim()) missingFields.push("성명");
          if (!formData.phone?.trim()) missingFields.push("연락처");
          if (!formData.email?.trim()) missingFields.push("이메일");
          if (!formData.company?.trim()) missingFields.push("회사명");
          if (!formData.inquiryContent?.trim()) missingFields.push("문의내용");
          if (formData.inquiryContent?.trim() && formData.inquiryContent.trim().length < 10) {
            missingFields.push("문의내용 10자 이상");
          }
          if (!formData.privacyConsent) missingFields.push("개인정보 동의");
          
          if (missingFields.length > 0) {
            errorDescription = `다음 항목을 입력해 주세요: ${missingFields.join(", ")}`;
          } else {
            errorDescription = "모든 필수 항목을 정확히 입력해 주세요";
          }
        } else if (error.message === 'ALL_METHODS_FAILED') {
          errorTitle = "🔄 시스템 연결 문제";
          errorDescription = "일시적인 네트워크 문제입니다. 잠시 후 다시 시도하거나 직접 연락해 주세요";
        } else if (error.message.includes('CORS')) {
          errorTitle = "🌐 연결 설정 문제";
          errorDescription = "시스템 설정을 확인 중입니다. 직접 연락해 주세요";
        } else if (error.message.includes('timeout') || error.message.includes('aborted')) {
          errorTitle = "⏱️ 응답 시간 초과";
          errorDescription = "서버 응답이 지연되고 있습니다. 다시 시도하거나 직접 연락해 주세요";
        }
      }

      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorDescription,
        duration: 7000,
      });

      if (submitAttempts >= 2) {
        setTimeout(() => {
          toast({
            title: "📞 직접 연락",
            description: "전화 010-9251-9743 또는 이메일 hongik423@gmail.com",
            duration: 10000,
          });
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, formData, isFormValid, toast, submitAttempts, resetForm]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      {/* 🎯 간단한 타이틀 섹션 - 모바일 최적화 */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-6 sm:pb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              전문가 상담
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              전문가 상담 신청
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              25년 경험의 전문가가 <span className="font-semibold text-blue-600">24시간 내</span>에 연락드립니다
            </p>
            
            {/* 네트워크 상태 */}
            {!isOnline && (
              <div className="mt-6 mx-auto max-w-md">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
                  <WifiOff className="w-5 h-5 text-orange-600" />
                  <div className="text-left">
                    <p className="text-orange-800 font-medium text-sm">연결을 확인해주세요</p>
                    <p className="text-orange-600 text-xs">인터넷 연결 상태를 점검해주세요</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 🎯 메인 콘텐츠 - 폼 중심, 모바일 최적화 */}
      <main className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 🎯 상담신청 폼 (메인) */}
            <div className="lg:col-span-2 order-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                
                {/* 폼 헤더 - 모바일 최적화 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">상담 신청서</h2>
                      <p className="text-sm sm:text-base text-gray-600">정확한 정보를 입력해주세요</p>
                    </div>
                  </div>
                </div>
                
                {/* 폼 영역 - 모바일 최적화 */}
                <div className="p-4 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    
                    {/* 상담 유형 */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-base font-semibold text-gray-900">
                        상담 방식 <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={formData.consultationType}
                        onValueChange={(value) => handleInputChange('consultationType', value)}
                      >
                        <SelectTrigger className="h-12 sm:h-14 border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all text-[16px] sm:text-base touch-manipulation">
                          <SelectValue placeholder="상담 방식을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-200 shadow-xl max-h-[60vh] overflow-y-auto">
                          <SelectItem value="phone" className="h-12 sm:h-14 rounded-lg m-1 cursor-pointer touch-manipulation">
                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-green-600" />
                              <span>전화 상담 (즉시 연결)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="online" className="h-12 sm:h-14 rounded-lg m-1 cursor-pointer touch-manipulation">
                            <div className="flex items-center gap-3">
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                              <span>화상 상담 (온라인)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="visit" className="h-12 sm:h-14 rounded-lg m-1 cursor-pointer touch-manipulation">
                            <div className="flex items-center gap-3">
                              <Building className="w-4 h-4 text-purple-600" />
                              <span>방문 상담 (직접 방문)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="email" className="h-12 sm:h-14 rounded-lg m-1 cursor-pointer touch-manipulation">
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-orange-600" />
                              <span>이메일 상담 (서면)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 개인정보 그리드 - 모바일 최적화 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 sm:space-y-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                          성명 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="홍길동"
                          className="border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <PhoneInput
                          label="연락처"
                          value={formData.phone}
                          onChange={(value) => handleInputChange('phone', value)}
                          placeholder="010-1234-5678"
                          required
                          className="border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@company.com"
                        className="border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 sm:space-y-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                          <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                          회사명 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="(주)AICAMP"
                          className="border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" />
                          직책/부서
                        </label>
                        <Input
                          type="text"
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          placeholder="대표이사, 마케팅팀장 등"
                          className="border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* 상담 분야 - 모바일 최적화 */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
                        관심 서비스
                      </label>
                      <Select 
                        value={formData.consultationArea}
                        onValueChange={(value) => handleInputChange('consultationArea', value)}
                      >
                        <SelectTrigger className="h-12 sm:h-14 border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all text-[16px] sm:text-base touch-manipulation">
                          <SelectValue placeholder="관심 있는 서비스를 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-200 shadow-xl max-h-[60vh] overflow-y-auto">
                          <SelectItem value="business-analysis" className="h-12 sm:h-14 cursor-pointer touch-manipulation">📊 BM ZEN 사업분석</SelectItem>
                          <SelectItem value="ai-productivity" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🤖 AI실무활용 생산성향상</SelectItem>
                          <SelectItem value="factory-auction" className="h-12 sm:h-14 cursor-pointer touch-manipulation">💰 정책자금 확보</SelectItem>
                          <SelectItem value="tech-startup" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🚀 기술사업화/기술창업</SelectItem>
                          <SelectItem value="certification" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🏆 인증지원</SelectItem>
                          <SelectItem value="website" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🌐 웹사이트 구축</SelectItem>
                          <SelectItem value="comprehensive" className="h-12 sm:h-14 cursor-pointer touch-manipulation">📋 종합 컨설팅</SelectItem>
                          <SelectItem value="diagnosis" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🔍 진단 결과 상담</SelectItem>
                          <SelectItem value="other" className="h-12 sm:h-14 cursor-pointer touch-manipulation">💬 기타 문의</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 문의 내용 - 모바일 최적화 */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                        <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                        문의 내용 <span className="text-red-500">*</span>
                        <span className="text-xs sm:text-sm text-gray-500 font-normal">(10자 이상)</span>
                      </label>
                      <Textarea
                        value={formData.inquiryContent}
                        onChange={(e) => handleInputChange('inquiryContent', e.target.value)}
                        placeholder="상세한 문의 내용을 입력해주세요 (10자 이상 필수)&#10;&#10;예시:&#10;• 현재 비즈니스 상황과 주요 고민사항&#10;• 달성하고자 하는 구체적인 목표&#10;• AI 도입 관련 궁금한 점&#10;• 정부지원사업 활용 계획&#10;• 예산 규모 및 일정&#10;&#10;구체적으로 작성하실수록 더 정확한 상담이 가능합니다."
                        className="border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all"
                        required
                        minLength={10}
                      />
                      {formData.inquiryContent && formData.inquiryContent.length < 10 && (
                        <p className="text-red-500 text-sm mt-1">
                          문의내용은 10자 이상 입력해주세요. (현재 {formData.inquiryContent.length}자)
                        </p>
                      )}
                    </div>

                    {/* 희망 상담 시간 - 모바일 최적화 */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
                        희망 상담 시간
                      </label>
                      <Select 
                        value={formData.preferredTime}
                        onValueChange={(value) => handleInputChange('preferredTime', value)}
                      >
                        <SelectTrigger className="h-12 sm:h-14 border-2 border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all text-[16px] sm:text-base touch-manipulation">
                          <SelectValue placeholder="편리한 시간대를 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-200 shadow-xl max-h-[60vh] overflow-y-auto">
                          <SelectItem value="morning" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🌅 오전 (09:00-12:00)</SelectItem>
                          <SelectItem value="afternoon" className="h-12 sm:h-14 cursor-pointer touch-manipulation">☀️ 오후 (13:00-18:00)</SelectItem>
                          <SelectItem value="evening" className="h-12 sm:h-14 cursor-pointer touch-manipulation">🌆 저녁 (18:00-21:00)</SelectItem>
                          <SelectItem value="flexible" className="h-12 sm:h-14 cursor-pointer touch-manipulation">⏰ 시간 협의</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 개인정보 동의 - 모바일 최적화 */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4 sm:p-6">
                      <PrivacyConsent
                        checked={formData.privacyConsent}
                        onCheckedChange={(checked) => handleInputChange('privacyConsent', checked)}
                        required={true}
                      />
                    </div>

                    {/* 제출 버튼 - 모바일 최적화 */}
                    <div className="pt-2 sm:pt-4">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting || !isOnline}
                        className={`
                          w-full h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 touch-manipulation
                          ${isFormValid && !isSubmitting && isOnline
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-[0.98]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            상담 신청 처리 중...
                          </div>
                        ) : !isOnline ? (
                          <div className="flex items-center justify-center gap-3">
                            <WifiOff className="w-5 h-5" />
                            네트워크 연결을 확인해주세요
                          </div>
                        ) : !isFormValid ? (
                          <div className="flex items-center justify-center gap-3">
                            <AlertCircle className="w-5 h-5" />
                            필수 정보를 입력해주세요
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="w-5 h-5" />
                            상담 신청하기
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                      </button>

                      {/* 재시도 안내 */}
                      {submitAttempts > 0 && !isSubmitting && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4">
                          <div className="text-center">
                            <AlertCircle className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                            <p className="text-orange-800 font-medium mb-1">
                              {submitAttempts === 1 ? '문제가 발생했습니다' : '계속해서 문제가 발생합니다'}
                            </p>
                            <p className="text-orange-600 text-sm">
                              {submitAttempts >= 2 
                                ? '직접 연락을 권장드립니다: 010-9251-9743'
                                : '다시 시도하거나 직접 연락해 주세요'
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                  </form>
                </div>
              </div>
            </div>

            {/* 🎯 사이드바 (간소화) - 모바일 최적화 */}
            <div className="lg:col-span-1 order-2 space-y-4 sm:space-y-6">
              
              {/* 빠른 연락 - 모바일 최적화 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">빠른 연락</h3>
                  <p className="text-sm sm:text-base text-gray-600">즉시 상담이 필요하시면</p>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <a href="tel:010-9251-9743">
                    <button className="w-full bg-green-600 text-white hover:bg-green-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]">
                      <Phone className="w-4 h-4" />
                      010-9251-9743
                    </button>
                  </a>
                  
                  <a href="mailto:hongik423@gmail.com">
                    <button className="w-full bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      이메일 문의
                    </button>
                  </a>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mt-4">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900 text-sm">상담 시간</p>
                    <p className="text-xs text-gray-600">평일 09:00 ~ 18:00</p>
                    <p className="text-xs text-gray-500">주말/공휴일 상담 가능</p>
                  </div>
                </div>
              </div>

              {/* 전문가 프로필 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">이후경 교장</h3>
                  <p className="text-gray-600 text-sm">25년 경험 전문가</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>중소벤처기업부 경영지도사</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>500+ 기업 성장 지원</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>95% 고객 만족도</span>
                  </div>
                </div>
              </div>

              {/* 핵심 서비스 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">핵심 서비스</h3>
                <div className="space-y-3">
                  {[
                    { title: 'BM ZEN 사업분석', desc: '혁신 프레임워크', color: 'text-blue-600', link: '/services/business-analysis' },
                    { title: 'AI 생산성 향상', desc: '정부 100% 지원', color: 'text-purple-600', link: '/services/ai-productivity' },
                    { title: '정책자금 확보', desc: '5억원 지원', color: 'text-orange-600', link: '/services/factory-auction' },
                    { title: '기술창업 지원', desc: '5억원 자금확보', color: 'text-green-600', link: '/services/tech-startup' }
                  ].map((service, index) => (
                    <a 
                      key={index} 
                      href={service.link}
                      className="block group cursor-pointer"
                    >
                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${service.color.replace('text-', 'bg-')}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700">{service.title}</p>
                            <p className="text-xs text-gray-600 group-hover:text-blue-600">{service.desc}</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 간단한 CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            성장의 기회를 놓치지 마세요
          </h2>
          <p className="text-gray-600 mb-6">
            지금 상담 신청하시면 24시간 내에 전문가가 직접 연락드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/ai-diagnosis">
              <button className="flex-1 bg-green-600 text-white hover:bg-green-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                무료진단
              </button>
            </Link>
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ArrowRight className="w-4 h-4" />
              상담신청하기
            </button>
          </div>
        </div>
      </section>
      {/* 진행 고정 오버레이 (이메일 발송까지 유지) */}
      {persistentNoticeOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-semibold">상담 신청 접수 및 알림 이메일 대기</span>
              </div>
              <p className="text-white/80 text-sm mt-1">완료 안내 메일이 발송될 때까지 이 안내가 유지됩니다.</p>
            </div>
            <div className="p-4 space-y-3 text-sm text-gray-700">
              <div className="rounded-lg border bg-blue-50 border-blue-200 p-3">
                <p className="text-blue-900 font-medium">예상 소요 시간: 1~5분</p>
                <p className="text-blue-800/80 mt-1">신청 정보 저장 및 확인 메일 발송 중입니다.</p>
              </div>
              <p className="text-xs text-gray-500">창을 닫아도 메일은 발송됩니다. 문의: 010-9251-9743</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
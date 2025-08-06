'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ErrorReportFormData {
  name: string;
  email: string;
  phone: string;
  calculatorType: string;
  errorDescription: string;
  expectedBehavior: string;
  actualBehavior: string;
  stepsToReproduce: string;
  browserInfo: string;
  deviceInfo: string;
  additionalInfo: string;
}

export default function TaxCalculatorErrorReportPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<ErrorReportFormData>({
    name: '',
    email: '',
    phone: '',
    calculatorType: '',
    errorDescription: '',
    expectedBehavior: '',
    actualBehavior: '',
    stepsToReproduce: '',
    browserInfo: '',
    deviceInfo: '',
    additionalInfo: ''
  });

  const calculatorTypes = [
    { value: 'vat', label: '부가가치세 계산기' },
    { value: 'income', label: '소득세 계산기' },
    { value: 'corporate', label: '법인세 계산기' },
    { value: 'withholding', label: '원천징수 계산기' },
    { value: 'property', label: '재산세 계산기' },
    { value: 'gift', label: '증여세 계산기' },
    { value: 'other', label: '기타' }
  ];

  const handleInputChange = (field: keyof ErrorReportFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Unknown';
    
    return `${browser} - ${userAgent}`;
  };

  const getDeviceInfo = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    return `${isMobile ? 'Mobile' : 'Desktop'} - ${screenSize}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.calculatorType || !formData.errorDescription) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "이름, 이메일, 계산기 유형, 오류 설명은 필수입니다.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 브라우저 및 디바이스 정보 자동 설정
      const finalData = {
        ...formData,
        browserInfo: formData.browserInfo || getBrowserInfo(),
        deviceInfo: formData.deviceInfo || getDeviceInfo(),
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/tax-calculator/error-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error('오류 신고 처리에 실패했습니다.');
      }

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "오류 신고가 접수되었습니다",
          description: "빠른 시일 내에 검토하여 수정하겠습니다.",
          duration: 5000,
        });
      } else {
        throw new Error(result.error || '오류 신고 처리에 실패했습니다.');
      }

    } catch (error) {
      console.error('오류 신고 처리 오류:', error);
      toast({
        title: "오류 신고 처리 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">오류 신고 접수 완료</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  소중한 피드백을 보내주셔서 감사합니다.<br />
                  빠른 시일 내에 검토하여 수정하겠습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => router.push('/tax-calculator')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    세금계산기로 돌아가기
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/')}
                  >
                    홈으로 가기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              세금계산기 오류 신고
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              세금계산기 사용 중 발견하신 오류나 개선사항을 알려주세요.<br />
              더 나은 서비스를 만들기 위해 소중한 의견을 기다립니다.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                오류 신고 양식
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="010-1234-5678"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="calculatorType">계산기 유형 *</Label>
                    <select
                      id="calculatorType"
                      value={formData.calculatorType}
                      onChange={(e) => handleInputChange('calculatorType', e.target.value)}
                      className="flex w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                      aria-label="계산기 유형 선택"
                    >
                      <option value="">계산기를 선택하세요</option>
                      {calculatorTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 오류 정보 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="errorDescription">오류 설명 *</Label>
                    <Textarea
                      id="errorDescription"
                      value={formData.errorDescription}
                      onChange={(e) => handleInputChange('errorDescription', e.target.value)}
                      placeholder="발견하신 오류에 대해 자세히 설명해주세요."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expectedBehavior">예상 동작</Label>
                      <Textarea
                        id="expectedBehavior"
                        value={formData.expectedBehavior}
                        onChange={(e) => handleInputChange('expectedBehavior', e.target.value)}
                        placeholder="정상적으로 작동했을 때의 결과"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="actualBehavior">실제 동작</Label>
                      <Textarea
                        id="actualBehavior"
                        value={formData.actualBehavior}
                        onChange={(e) => handleInputChange('actualBehavior', e.target.value)}
                        placeholder="실제로 발생한 오류나 문제점"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stepsToReproduce">재현 단계</Label>
                    <Textarea
                      id="stepsToReproduce"
                      value={formData.stepsToReproduce}
                      onChange={(e) => handleInputChange('stepsToReproduce', e.target.value)}
                      placeholder="1. 첫 번째 단계&#10;2. 두 번째 단계&#10;3. 세 번째 단계"
                      rows={4}
                    />
                  </div>
                </div>

                {/* 시스템 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="browserInfo">브라우저 정보</Label>
                    <Input
                      id="browserInfo"
                      value={formData.browserInfo}
                      onChange={(e) => handleInputChange('browserInfo', e.target.value)}
                      placeholder="자동으로 입력됩니다"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deviceInfo">디바이스 정보</Label>
                    <Input
                      id="deviceInfo"
                      value={formData.deviceInfo}
                      onChange={(e) => handleInputChange('deviceInfo', e.target.value)}
                      placeholder="자동으로 입력됩니다"
                    />
                  </div>
                </div>

                {/* 추가 정보 */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">추가 정보</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="기타 개선사항이나 제안사항이 있으시면 자유롭게 작성해주세요."
                    rows={3}
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-red-700"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        처리 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        오류 신고 제출
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    size="lg"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    뒤로 가기
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
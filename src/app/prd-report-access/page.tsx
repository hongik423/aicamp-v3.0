/**
 * ================================================================================
 * 🚀 PRD 기반 진단결과보고서 조회 시스템
 * ================================================================================
 * 
 * @fileoverview 신청자가 이메일로 받은 진단ID로 24페이지 보고서를 바로 확인
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  FileText, 
  Mail, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Eye,
  Download,
  Clock,
  Info,
  ArrowRight,
  Key,
  Building2,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisAccessState {
  diagnosisId: string;
  email: string;
  isLoading: boolean;
  isVerifying: boolean;
  error: string;
  step: 'input' | 'verifying' | 'success' | 'report';
  reportData?: any;
}

export default function PRDReportAccessPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [accessState, setAccessState] = useState<DiagnosisAccessState>({
    diagnosisId: '',
    email: '',
    isLoading: false,
    isVerifying: false,
    error: '',
    step: 'input'
  });
  
  const [recentDiagnoses, setRecentDiagnoses] = useState<Array<{
    diagnosisId: string;
    companyName: string;
    date: string;
  }>>([]);
  
  // 진단ID 검증 및 보고서 조회
  const handleDiagnosisIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedId = accessState.diagnosisId.trim();
    
    if (!trimmedId) {
      setAccessState(prev => ({ 
        ...prev, 
        error: '진단ID를 입력해주세요.' 
      }));
      return;
    }
    
    setAccessState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: '', 
      step: 'verifying' 
    }));
    
    try {
      console.log('🔍 PRD 기반 진단ID 검증 시작:', trimmedId);
      
      // 기존 검증된 API 사용 (오류 해결)
      const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(trimmedId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.htmlReport) {
          console.log('✅ 기존 API 보고서 조회 성공 - PRD 페이지로 리다이렉트');
          
          // 성공 시 기존 보고서 페이지로 리다이렉트
          router.push(`/diagnosis-results/${trimmedId}`);
        } else {
          throw new Error(result.error || '보고서를 찾을 수 없습니다');
        }
      } else if (response.status === 404) {
        throw new Error('해당 진단ID의 보고서를 찾을 수 없습니다. 정확한 진단ID를 확인해주세요.');
      } else {
        // HTML 응답인 경우 (JSON 파싱 오류 방지)
        const responseText = await response.text();
        if (responseText.includes('<!DOCTYPE')) {
          throw new Error('서버에서 HTML 응답을 받았습니다. 진단ID를 다시 확인해주세요.');
        } else {
          throw new Error(`서버 오류: ${response.status}`);
        }
      }
      
    } catch (error: any) {
      console.error('❌ PRD 기반 진단ID 검증 실패:', error);
      
      setAccessState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false,
        step: 'input'
      }));
      
      toast({
        title: "조회 실패",
        description: error.message,
        variant: "destructive",
        duration: 5000
      });
    }
  };
  
  // 이메일 인증 방식
  const handleEmailVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessState.email.trim()) {
      setAccessState(prev => ({ 
        ...prev, 
        error: '이메일을 입력해주세요.' 
      }));
      return;
    }
    
    setAccessState(prev => ({ 
      ...prev, 
      isVerifying: true, 
      error: '' 
    }));
    
    try {
      console.log('📧 이메일 기반 진단ID 조회 시작');
      
      const response = await fetch('/api/find-diagnosis-by-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: accessState.email.trim() })
      });
      
      const result = await response.json();
      
      if (result.success && result.data?.diagnosisId) {
        console.log('✅ 이메일 기반 진단ID 조회 성공');
        
        // 자동으로 보고서 페이지로 이동
        router.push(`/diagnosis-results/${result.data.diagnosisId}`);
        
      } else {
        throw new Error(result.error?.message || '해당 이메일로 진단한 기록을 찾을 수 없습니다');
      }
      
    } catch (error: any) {
      console.error('❌ 이메일 기반 조회 실패:', error);
      
      setAccessState(prev => ({
        ...prev,
        error: error.message,
        isVerifying: false
      }));
    }
  };
  
  // URL 파라미터에서 diagnosisId 자동 로드 및 즉시 보고서 조회
  useEffect(() => {
    try {
      // URL 파라미터에서 diagnosisId 확인
      const urlParams = new URLSearchParams(window.location.search);
      const urlDiagnosisId = urlParams.get('diagnosisId');
      
      if (urlDiagnosisId) {
        console.log('📋 URL에서 진단ID 자동 로드 및 즉시 조회:', urlDiagnosisId);
        setAccessState(prev => ({ 
          ...prev, 
          diagnosisId: urlDiagnosisId 
        }));
        
        // 즉시 보고서 조회 실행
        setTimeout(() => {
          router.push(`/diagnosis-results/${urlDiagnosisId}`);
        }, 100);
      }
      
      // 최근 조회 목록 로드
      const saved = localStorage.getItem('recentDiagnoses');
      if (saved) {
        setRecentDiagnoses(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('초기화 실패:', error);
    }
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI 역량진단 보고서 조회
            </h1>
            <p className="text-lg text-gray-600">
              이메일로 받으신 진단ID를 입력하여 24페이지 보고서를 확인하세요
            </p>
          </div>
          
          {/* 진단ID 직접 입력 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-blue-600" />
                <span>진단ID로 조회</span>
              </CardTitle>
              <CardDescription>
                이메일로 받으신 진단ID를 입력하세요 (예: DIAG_45Q_AI_1234567890_abcdef)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDiagnosisIdSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosisId">진단ID</Label>
                  <Input
                    id="diagnosisId"
                    placeholder="DIAG_45Q_AI_1234567890_abcdef"
                    value={accessState.diagnosisId}
                    onChange={(e) => setAccessState(prev => ({ 
                      ...prev, 
                      diagnosisId: e.target.value,
                      error: '' 
                    }))}
                    className="font-mono"
                    disabled={accessState.isLoading}
                  />
                </div>
                
                {accessState.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{accessState.error}</AlertDescription>
                  </Alert>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={accessState.isLoading}
                >
                  {accessState.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      보고서 조회 중...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      보고서 조회
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Separator className="my-8" />
          
          {/* 이메일 인증 방식 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-600" />
                <span>이메일로 찾기</span>
              </CardTitle>
              <CardDescription>
                진단ID를 잊으셨나요? 진단 신청 시 사용한 이메일로 찾아보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 주소</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@company.com"
                    value={accessState.email}
                    onChange={(e) => setAccessState(prev => ({ 
                      ...prev, 
                      email: e.target.value,
                      error: '' 
                    }))}
                    disabled={accessState.isVerifying}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="outline" 
                  className="w-full"
                  disabled={accessState.isVerifying}
                >
                  {accessState.isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      진단ID 찾는 중...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      진단ID 찾기
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* 최근 조회 목록 */}
          {recentDiagnoses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>최근 조회한 보고서</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDiagnoses.map((diagnosis) => (
                    <div 
                      key={diagnosis.diagnosisId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setAccessState(prev => ({ 
                          ...prev, 
                          diagnosisId: diagnosis.diagnosisId 
                        }));
                      }}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{diagnosis.companyName}</p>
                        <p className="text-xs text-gray-500">
                          {diagnosis.diagnosisId} • {diagnosis.date}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* 도움말 */}
          <Card className="mt-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">도움말</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 진단ID는 이메일로 발송된 고유 식별번호입니다</li>
                    <li>• 형식: DIAG_45Q_AI_[타임스탬프]_[랜덤코드]</li>
                    <li>• 대소문자를 구분하니 정확히 입력해주세요</li>
                    <li>• 문제 발생 시 고객센터(hongik423@gmail.com)로 문의하세요</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
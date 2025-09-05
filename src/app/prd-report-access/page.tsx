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
  
  // ================================================================================
  // 📋 상태 관리
  // ================================================================================
  
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
  
  // ================================================================================
  // 📋 이벤트 핸들러
  // ================================================================================
  
  /**
   * 진단ID 검증 및 보고서 조회
   */
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
      
      // 1단계: 진단ID 형식 검증
      const formatValidation = validateDiagnosisIdFormat(trimmedId);
      if (!formatValidation.isValid) {
        throw new Error(formatValidation.errorMessage);
      }
      
      // 2단계: 서버에서 보고서 조회
      const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(trimmedId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.success && result.htmlReport) {
        console.log('✅ PRD 기반 보고서 조회 성공');
        
        // 최근 조회 목록에 추가
        addToRecentDiagnoses({
          diagnosisId: trimmedId,
          companyName: result.reportInfo?.companyName || '회사명',
          date: new Date().toLocaleDateString('ko-KR')
        });
        
        // 보고서 데이터 설정
        setAccessState(prev => ({
          ...prev,
          step: 'report',
          reportData: result,
          isLoading: false
        }));
        
        toast({
          title: "보고서 조회 성공",
          description: "24페이지 AI 역량진단 보고서를 확인하세요",
          duration: 3000
        });
        
      } else {
        throw new Error(result.error || '보고서를 찾을 수 없습니다');
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
  
  /**
   * 이메일 인증 방식
   */
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
      
      // 이메일로 진단ID 찾기 API 호출
      const response = await fetch('/api/find-diagnosis-by-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: accessState.email.trim() })
      });
      
      const result = await response.json();
      
      if (result.success && result.diagnosisId) {
        console.log('✅ 이메일 기반 진단ID 조회 성공');
        
        // 자동으로 진단ID 설정하고 보고서 조회
        setAccessState(prev => ({
          ...prev,
          diagnosisId: result.diagnosisId,
          isVerifying: false
        }));
        
        // 자동으로 보고서 조회 실행
        setTimeout(() => {
          const event = new Event('submit') as any;
          handleDiagnosisIdSubmit(event);
        }, 500);
        
      } else {
        throw new Error(result.error || '해당 이메일로 진단한 기록을 찾을 수 없습니다');
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
  
  /**
   * 보고서 다운로드
   */
  const handleDownloadReport = () => {
    if (!accessState.reportData?.htmlReport) return;
    
    try {
      const blob = new Blob([accessState.reportData.htmlReport], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI역량진단보고서_${accessState.diagnosisId}_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "다운로드 완료",
        description: "보고서가 성공적으로 다운로드되었습니다",
        duration: 3000
      });
      
    } catch (error) {
      console.error('❌ 보고서 다운로드 실패:', error);
      toast({
        title: "다운로드 실패",
        description: "보고서 다운로드 중 오류가 발생했습니다",
        variant: "destructive"
      });
    }
  };
  
  /**
   * 새 창에서 보고서 열기
   */
  const handleOpenInNewWindow = () => {
    if (!accessState.reportData?.htmlReport) return;
    
    try {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(accessState.reportData.htmlReport);
        newWindow.document.close();
        
        toast({
          title: "새 창 열기 완료",
          description: "새 창에서 보고서를 확인하세요",
          duration: 3000
        });
      }
    } catch (error) {
      console.error('❌ 새 창 열기 실패:', error);
    }
  };
  
  /**
   * 최근 조회 목록에 추가
   */
  const addToRecentDiagnoses = (diagnosis: { diagnosisId: string; companyName: string; date: string }) => {
    const updated = [diagnosis, ...recentDiagnoses.filter(d => d.diagnosisId !== diagnosis.diagnosisId)].slice(0, 5);
    setRecentDiagnoses(updated);
    localStorage.setItem('recentDiagnoses', JSON.stringify(updated));
  };
  
  /**
   * 최근 조회 목록 로드
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentDiagnoses');
      if (saved) {
        setRecentDiagnoses(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('최근 조회 목록 로드 실패:', error);
    }
  }, []);
  
  // ================================================================================
  // 📋 렌더링 함수들
  // ================================================================================
  
  /**
   * 진단ID 입력 화면
   */
  const renderInputScreen = () => (
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
                  {recentDiagnoses.map((diagnosis, index) => (
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
  
  /**
   * 검증 중 화면
   */
  const renderVerifyingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-4">보고서 조회 중</h2>
          <p className="text-gray-600 mb-6">
            진단ID를 검증하고 24페이지 보고서를 생성하고 있습니다
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✓ 진단ID 형식 검증 완료</p>
            <p>✓ 데이터베이스 조회 중...</p>
            <p>⏳ 보고서 생성 중...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  /**
   * 24페이지 보고서 화면
   */
  const renderReportScreen = () => {
    if (!accessState.reportData) return null;
    
    const reportInfo = accessState.reportData.reportInfo || {};
    
    return (
      <div className="min-h-screen bg-white">
        {/* 보고서 헤더 */}
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAccessState(prev => ({ ...prev, step: 'input' }))}
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  뒤로
                </Button>
                
                <div>
                  <h1 className="text-xl font-semibold">AI 역량진단 보고서</h1>
                  <p className="text-sm text-gray-600">
                    {reportInfo.companyName || '회사명'} • 진단ID: {accessState.diagnosisId}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenInNewWindow}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  새 창
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadReport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  인쇄
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 보고서 정보 패널 */}
        <div className="bg-blue-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">회사명</p>
                  <p className="text-sm font-medium">{reportInfo.companyName || '회사명'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">총점</p>
                  <p className="text-sm font-medium">
                    {reportInfo.totalScore || 0}점 ({reportInfo.percentage || 0}%)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">등급</p>
                  <p className="text-sm font-medium">{reportInfo.grade || 'F'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">생성일</p>
                  <p className="text-sm font-medium">
                    {new Date().toLocaleDateString('ko-KR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 24페이지 보고서 내용 */}
        <div className="container mx-auto px-4 py-8">
          <div 
            className="report-content bg-white"
            dangerouslySetInnerHTML={{ __html: accessState.reportData.htmlReport }}
          />
        </div>
        
        {/* 하단 액션 버튼 */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handleDownloadReport}
              >
                <Download className="w-4 h-4 mr-2" />
                PDF 다운로드
              </Button>
              
              <Button
                onClick={() => window.location.href = '/consultation'}
              >
                <Mail className="w-4 h-4 mr-2" />
                전문가 상담 신청
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // ================================================================================
  // 📋 메인 렌더링
  // ================================================================================
  
  // 단계별 조건부 렌더링
  switch (accessState.step) {
    case 'verifying':
      return renderVerifyingScreen();
    case 'report':
      return renderReportScreen();
    default:
      return renderInputScreen();
  }
}

// ================================================================================
// 🎯 유틸리티 함수들
// ================================================================================

/**
 * 진단ID 형식 검증
 */
function validateDiagnosisIdFormat(diagnosisId: string): { isValid: boolean; errorMessage?: string } {
  if (!diagnosisId || diagnosisId.length < 10) {
    return { isValid: false, errorMessage: '진단ID가 너무 짧습니다. 최소 10자 이상 입력해주세요.' };
  }
  
  // 기본적인 형식 검증
  const validPrefixes = ['DIAG_', 'DIAG-', 'TEST_'];
  const hasValidPrefix = validPrefixes.some(prefix => diagnosisId.startsWith(prefix));
  
  if (!hasValidPrefix) {
    return { 
      isValid: false, 
      errorMessage: '진단ID 형식이 올바르지 않습니다. DIAG_ 또는 TEST_로 시작해야 합니다.' 
    };
  }
  
  return { isValid: true };
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Eye,
  Download,
  Shield,
  ArrowRight,
  BarChart3,
  Award,
  Calendar,
  Building,
  Star,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle,
  Lock,
  Mail,
  Key,
  LogOut,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisReport {
  diagnosisId: string;
  companyName: string;
  contactName: string;
  industry: string;
  totalScore: number;
  grade: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  fileName?: string;
  reportUrl?: string;
}

export default function DiagnosisReportsPage() {
  const { toast } = useToast();
  
  // 진단ID 직접 조회 관련 상태
  const [directSearchId, setDirectSearchId] = useState('');
  const [directSearchLoading, setDirectSearchLoading] = useState(false);
  const [directSearchError, setDirectSearchError] = useState('');
  
  // 관리자 인증 관련 상태
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminEmail, setAdminEmail] = useState('hongik423@gmail.com');
  const [authCode, setAuthCode] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 관리자 전용 보고서 목록
  const [reports, setReports] = useState<DiagnosisReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');

  // 컴포넌트 마운트 시 관리자 인증 상태 확인
  useEffect(() => {
    checkAdminAuth();
  }, []);

  // 관리자 인증 상태 확인
  const checkAdminAuth = () => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('admin_authenticated');
      const authTime = sessionStorage.getItem('admin_auth_time');
      
      if (isAuth === 'true' && authTime) {
        const timeDiff = Date.now() - parseInt(authTime);
        const maxAge = 60 * 60 * 1000; // 1시간
        
        if (timeDiff < maxAge) {
          setIsAuthenticated(true);
          setIsAdminMode(true);
          loadReports(); // 관리자 인증된 경우에만 전체 목록 로드
        } else {
          // 세션 만료
          sessionStorage.removeItem('admin_authenticated');
          sessionStorage.removeItem('admin_auth_time');
        }
      }
    }
  };

  // 진단ID 직접 조회 함수 (보안 강화)
  const handleDirectSearch = async () => {
    if (!directSearchId.trim()) {
      setDirectSearchError('진단ID를 입력해주세요.');
      return;
    }

    setDirectSearchLoading(true);
    setDirectSearchError('');

    try {
      console.log('🔍 보안 강화된 진단ID 조회 시작:', directSearchId);
      
      // 진단ID 유효성 검사
      const cleanId = directSearchId.trim();
      if (cleanId.length < 10) {
        throw new Error('유효하지 않은 진단ID입니다. 이메일로 받으신 정확한 진단ID를 입력해주세요.');
      }

      // API로 해당 진단ID 존재 여부 확인 (개별 조회)
      const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(cleanId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000)
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          console.log('✅ 보안 검증 완료, 개별 보고서 조회 성공');
          
          toast({
            title: "✅ 진단보고서 조회 성공",
            description: "본인의 보고서 페이지로 이동합니다.",
            variant: "default"
          });
          
          // 개별 결과 페이지로 직접 이동 (보안 강화)
          window.open(`/diagnosis-results/${cleanId}`, '_blank');
          
          // 검색 필드 초기화
          setDirectSearchId('');
          
        } else {
          throw new Error(result.error || '해당 진단ID의 보고서를 찾을 수 없습니다.');
        }
      } else if (response.status === 404) {
        throw new Error('해당 진단ID의 보고서를 찾을 수 없습니다. 이메일로 받으신 정확한 진단ID를 확인해주세요.');
      } else {
        throw new Error(`조회 실패: ${response.status} ${response.statusText}`);
      }

    } catch (error: any) {
      console.error('❌ 보안 강화된 진단ID 조회 실패:', error);
      
      let errorMessage = '보고서 조회 중 오류가 발생했습니다.';
      
      if (error.name === 'AbortError') {
        errorMessage = '조회 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setDirectSearchError(errorMessage);
      
      toast({
        title: "❌ 조회 실패",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setDirectSearchLoading(false);
    }
  };

  // 관리자 인증번호 발송
  const sendAuthCode = async () => {
    if (adminEmail !== 'hongik423@gmail.com') {
      setAuthError('관리자 이메일이 아닙니다.');
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError('');
      
      console.log('📧 관리자 인증번호 발송 요청');
      
      const response = await fetch('/api/admin/send-auth-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: adminEmail })
      });

      if (!response.ok) {
        throw new Error('인증번호 발송에 실패했습니다.');
      }

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "인증번호 발송 완료",
          description: "이메일로 6자리 인증번호가 발송되었습니다.",
        });
      } else {
        throw new Error(result.error || '인증번호 발송에 실패했습니다.');
      }
      
    } catch (error: any) {
      console.error('❌ 인증번호 발송 실패:', error);
      setAuthError(error.message);
      toast({
        title: "발송 실패",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  // 관리자 인증번호 검증
  const verifyAuthCode = async () => {
    if (!authCode.trim() || authCode.length !== 6) {
      setAuthError('6자리 인증번호를 입력해주세요.');
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError('');
      
      console.log('🔐 관리자 인증번호 검증');
      
      const response = await fetch('/api/admin/verify-auth-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          code: authCode.trim()
        })
      });

      if (!response.ok) {
        throw new Error('인증번호 검증에 실패했습니다.');
      }

      const result = await response.json();
      
      if (result.success) {
        // 인증 성공 - 세션 스토리지에 저장
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_auth_time', Date.now().toString());
        
        setIsAuthenticated(true);
        setAuthCode('');
        
        toast({
          title: "관리자 인증 성공",
          description: "전체 보고서 목록을 조회합니다.",
        });

        // 전체 보고서 로드
        loadReports();
        
      } else {
        throw new Error(result.error || '잘못된 인증번호입니다.');
      }
      
    } catch (error: any) {
      console.error('❌ 인증번호 검증 실패:', error);
      setAuthError(error.message);
      toast({
        title: "인증 실패",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  // 관리자 로그아웃
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_auth_time');
    setIsAuthenticated(false);
    setIsAdminMode(false);
    setAuthCode('');
    setAuthError('');
    setAdminEmail('hongik423@gmail.com');
    setReports([]);
    
    toast({
      title: "로그아웃 완료",
      description: "관리자 세션이 종료되었습니다.",
    });
  };

  // 관리자 전용 보고서 로드 함수
  const loadReports = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    
    try {
      console.log('🔄 관리자 전용 진단 보고서 데이터 로드 시작');
      
      const response = await fetch('/api/admin/diagnosis-reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': 'authenticated',
          'x-admin-email': adminEmail,
          'x-admin-timestamp': Date.now().toString()
        },
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data && Array.isArray(result.data)) {
          console.log('✅ 관리자 전용 데이터 로드 성공:', result.data.length);
          
          const actualReports: DiagnosisReport[] = result.data.map((item: any) => ({
            diagnosisId: item.diagnosisId || '',
            companyName: item.companyName || '정보 없음',
            contactName: item.contactName || '정보 없음',
            industry: item.industry || '정보통신업',
            totalScore: parseFloat(item.totalScore) || 0,
            grade: item.grade || 'F',
            createdAt: item.createdAt || new Date().toISOString(),
            status: 'completed' as const,
            reportUrl: `/diagnosis-results/${item.diagnosisId}`
          }));
          
          setReports(actualReports);
          
        } else {
          console.log('⚠️ 관리자 데이터 없음');
          setReports([]);
        }
      } else {
        throw new Error(`관리자 API 오류: ${response.status}`);
      }
      
    } catch (error: any) {
      console.error('❌ 관리자 데이터 로드 실패:', error);
      toast({
        title: "데이터 로드 실패",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 24페이지 완성본 HTML 보고서 다운로드 함수
  const handleDownloadReport = async (report: DiagnosisReport) => {
    try {
      console.log('📥 24페이지 완성본 다운로드 시작:', report.diagnosisId);
      
      const response = await fetch(`/api/diagnosis-reports/${report.diagnosisId}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.htmlContent) {
          const blob = new Blob([data.htmlContent], { type: 'text/html;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `AI역량진단보고서_${report.companyName}_${report.diagnosisId}.html`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          toast({
            title: "✅ 다운로드 완료",
            description: "24페이지 완성본 보고서가 다운로드되었습니다.",
          });
        } else {
          throw new Error('보고서 데이터를 찾을 수 없습니다.');
        }
      } else {
        throw new Error(`다운로드 실패: ${response.status}`);
      }
      
    } catch (error: any) {
      console.error('❌ 보고서 다운로드 실패:', error);
      toast({
        title: "❌ 다운로드 실패",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // 필터링된 보고서 목록 (관리자 전용)
  const filteredReports = reports.filter(report => {
    const companyName = String(report.companyName || '');
    const contactName = String(report.contactName || '');
    const diagnosisId = String(report.diagnosisId || '');
    const searchTermLower = String(searchTerm || '').toLowerCase();
    
    const matchesSearch = companyName.toLowerCase().includes(searchTermLower) ||
                         contactName.toLowerCase().includes(searchTermLower) ||
                         diagnosisId.toLowerCase().includes(searchTermLower);
    
    const matchesGrade = filterGrade === 'all' || report.grade === filterGrade;
    
    return matchesSearch && matchesGrade;
  });

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'S': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B': return 'bg-green-100 text-green-800 border-green-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'F': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 역량진단 결과보고서 조회
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            완료된 AI 역량진단 보고서를 조회하고 다운로드할 수 있습니다.
          </p>
        </motion.div>

        {/* 보안 강화 알림 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Alert className="border-amber-200 bg-amber-50">
            <Shield className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>보안 강화 안내:</strong> 개인정보 보호를 위해 본인의 진단ID로만 보고서 조회가 가능합니다. 
              관리자는 별도 인증 후 전체 목록에 접근할 수 있습니다.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* 진단ID 직접 조회 (일반 사용자) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Search className="h-5 w-5" />
                진단ID로 바로 조회하기
              </CardTitle>
              <CardDescription>
                이메일로 받으신 진단ID를 입력하면 바로 결과보고서를 확인할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="DIAG_45Q_AI_1756007646381_cezr4cnfx"
                  value={directSearchId}
                  onChange={(e) => {
                    // 사용자가 입력한 값을 그대로 유지 (대소문자 구분)
                    const value = e.target.value;
                    setDirectSearchId(value);
                    setDirectSearchError('');
                  }}
                  className="flex-1 font-mono"
                  disabled={directSearchLoading}
                />
                <Button 
                  onClick={handleDirectSearch}
                  disabled={directSearchLoading || !directSearchId.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {directSearchLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  조회하기
                </Button>
              </div>
              
              {directSearchError && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {directSearchError}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span>진단ID를 입력해주세요.</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 관리자 인증 섹션 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Shield className="h-5 w-5" />
                관리자 전체 목록 조회
              </CardTitle>
              <CardDescription>
                관리자 인증 후 전체 진단 보고서 목록을 확인할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="관리자 이메일"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="flex-1"
                      disabled={authLoading}
                    />
                    <Button 
                      onClick={sendAuthCode}
                      disabled={authLoading || adminEmail !== 'hongik423@gmail.com'}
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      {authLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Mail className="h-4 w-4 mr-2" />
                      )}
                      인증번호 발송
                    </Button>
                  </div>
                  
                  <div className="flex gap-3">
                    <Input
                      placeholder="6자리 인증번호"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="flex-1"
                      disabled={authLoading}
                      maxLength={6}
                    />
                    <Button 
                      onClick={verifyAuthCode}
                      disabled={authLoading || authCode.length !== 6}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {authLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Key className="h-4 w-4 mr-2" />
                      )}
                      인증하기
                    </Button>
                  </div>
                  
                  {authError && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {authError}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">관리자 인증 완료</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {adminEmail}
                    </Badge>
                  </div>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 관리자 전용 보고서 목록 */}
        {isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* 검색 및 필터 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="회사명, 담당자명, 진단ID로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="등급별 필터링"
                    aria-label="등급별 필터링"
                  >
                    <option value="all">전체 등급</option>
                    <option value="S">S등급</option>
                    <option value="A">A등급</option>
                    <option value="B">B등급</option>
                    <option value="C">C등급</option>
                    <option value="D">D등급</option>
                    <option value="F">F등급</option>
                  </select>
                  <Button 
                    onClick={loadReports}
                    disabled={isLoading}
                    variant="outline"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    새로고침
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">총 보고서</p>
                      <p className="text-2xl font-bold text-blue-800">{filteredReports.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">완료된 진단</p>
                      <p className="text-2xl font-bold text-green-800">
                        {filteredReports.filter(r => r.status === 'completed').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">평균 점수</p>
                      <p className="text-2xl font-bold text-purple-800">
                        {filteredReports.length > 0 
                          ? (filteredReports.reduce((sum, r) => sum + r.totalScore, 0) / filteredReports.length).toFixed(1)
                          : '0'
                        }
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">처리중</p>
                      <p className="text-2xl font-bold text-orange-800">0</p>
                    </div>
                    <Loader2 className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 보고서 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  진단 보고서 목록 ({filteredReports.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">데이터를 불러오는 중...</span>
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">조회된 보고서가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredReports.map((report, index) => (
                      <motion.div
                        key={report.diagnosisId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getGradeColor(report.grade)}>
                                {report.grade}등급
                              </Badge>
                              <span className="font-medium text-gray-900">{report.companyName}</span>
                              <span className="text-sm text-gray-500">담당자: {report.contactName}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {report.industry}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(report.createdAt).toLocaleDateString('ko-KR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4" />
                                점수: {report.totalScore.toFixed(1)}
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 font-mono">
                              진단ID: {report.diagnosisId}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => window.open(report.reportUrl, '_blank')}
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              24페이지 보기
                            </Button>
                            <Button
                              onClick={() => handleDownloadReport(report)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              V23.1 다운로드
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
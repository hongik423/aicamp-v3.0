'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Calendar, 
  Building, 
  Star, 
  Download,
  Eye,
  Clock,
  TrendingUp,
  Award,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [reports, setReports] = useState<DiagnosisReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userDiagnosisId, setUserDiagnosisId] = useState('');

  // 샘플 데이터 (실제로는 API에서 가져옴)
  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      
      // 로컬 스토리지에서 사용자의 진단 결과 확인
      const completedDiagnosisId = localStorage.getItem('completedDiagnosisId');
      const diagnosisReportInfo = localStorage.getItem('diagnosisReportInfo');
      
      const sampleReports: DiagnosisReport[] = [];
      
      // 사용자의 실제 진단 결과가 있으면 추가
      if (completedDiagnosisId && diagnosisReportInfo) {
        try {
          const reportInfo = JSON.parse(diagnosisReportInfo);
          sampleReports.push({
            diagnosisId: completedDiagnosisId,
            companyName: reportInfo.companyName || '내 회사',
            contactName: '본인',
            industry: '정보통신업',
            totalScore: reportInfo.totalScore || 85.2,
            grade: reportInfo.grade || 'A',
            createdAt: reportInfo.createdAt || new Date().toISOString(),
            status: 'completed',
            fileName: reportInfo.fileName,
            reportUrl: `/diagnosis-results/${completedDiagnosisId}`
          });
        } catch (error) {
          console.error('진단 정보 파싱 오류:', error);
        }
      }
      
      // 샘플 데이터 추가
      sampleReports.push(
        {
          diagnosisId: 'DIAG_SAMPLE_001',
          companyName: '테크스타트업(주)',
          contactName: '김대표',
          industry: '소프트웨어개발업',
          totalScore: 92.5,
          grade: 'S',
          createdAt: '2025-01-15T10:30:00Z',
          status: 'completed',
          reportUrl: '/diagnosis-results/DIAG_SAMPLE_001'
        },
        {
          diagnosisId: 'DIAG_SAMPLE_002',
          companyName: '제조혁신(주)',
          contactName: '박이사',
          industry: '제조업',
          totalScore: 78.3,
          grade: 'B',
          createdAt: '2025-01-14T14:20:00Z',
          status: 'completed',
          reportUrl: '/diagnosis-results/DIAG_SAMPLE_002'
        },
        {
          diagnosisId: 'DIAG_SAMPLE_003',
          companyName: '글로벌무역(주)',
          contactName: '이부장',
          industry: '도소매업',
          totalScore: 65.8,
          grade: 'C',
          createdAt: '2025-01-13T09:15:00Z',
          status: 'completed',
          reportUrl: '/diagnosis-results/DIAG_SAMPLE_003'
        },
        {
          diagnosisId: 'DIAG_PROCESSING_001',
          companyName: '신규기업(주)',
          contactName: '최대표',
          industry: '서비스업',
          totalScore: 0,
          grade: '-',
          createdAt: '2025-01-16T16:45:00Z',
          status: 'processing'
        }
      );
      
      setReports(sampleReports);
      setIsLoading(false);
    };

    loadReports();
  }, []);

  // 필터링된 보고서 목록
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.diagnosisId.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'processing': return '처리중';
      case 'failed': return '실패';
      default: return '대기';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎯 AI 역량진단 결과보고서 조회
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                완료된 AI 역량진단 보고서를 조회하고 다운로드할 수 있습니다.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="회사명, 담당자명, 진단ID로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 등급</option>
                <option value="S">S등급</option>
                <option value="A">A등급</option>
                <option value="B">B등급</option>
                <option value="C">C등급</option>
                <option value="D">D등급</option>
                <option value="F">F등급</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 보고서</p>
                  <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">완료된 진단</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reports.filter(r => r.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">평균 점수</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {reports.filter(r => r.status === 'completed').length > 0 
                      ? (reports.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.totalScore, 0) / reports.filter(r => r.status === 'completed').length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">처리중</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {reports.filter(r => r.status === 'processing').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 보고서 목록 */}
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">보고서를 불러오는 중...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">보고서가 없습니다</h3>
            <p className="text-gray-600 mb-6">검색 조건을 변경하거나 새로운 진단을 시작해보세요.</p>
            <Link href="/ai-diagnosis">
              <Button>
                <TrendingUp className="h-4 w-4 mr-2" />
                AI 역량진단 시작하기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.diagnosisId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(report.status)}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {report.companyName}
                          </h3>
                          <Badge className={`${getGradeColor(report.grade)} border`}>
                            {report.grade}등급
                          </Badge>
                          <Badge variant="outline">
                            {getStatusText(report.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>{report.industry}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(report.createdAt).toLocaleDateString('ko-KR')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <span>점수: {report.totalScore.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>ID: {report.diagnosisId}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {report.status === 'completed' && report.reportUrl && (
                          <>
                            <Link href={report.reportUrl}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                보기
                              </Button>
                            </Link>
                            <Button variant="default" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              다운로드
                            </Button>
                          </>
                        )}
                        {report.status === 'processing' && (
                          <Button variant="outline" size="sm" disabled>
                            <Clock className="h-4 w-4 mr-2" />
                            처리중
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* 새 진단 시작 CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                새로운 AI 역량진단을 시작해보세요
              </h3>
              <p className="text-gray-600 mb-6">
                45개 행동지표 기반 정밀 진단으로 맞춤형 AI 전략을 수립하세요
              </p>
              <Link href="/ai-diagnosis">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  AI 역량진단 시작하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

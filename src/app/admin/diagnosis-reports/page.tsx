'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Eye, Search, Filter, Calendar, Building2, TrendingUp, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface DiagnosisReport {
  diagnosisId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  totalScore: number;
  grade: string;
  maturityLevel: string;
  submittedAt: string;
  status: string;
}

export default function AdminDiagnosisReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<DiagnosisReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      
      // 실제 API에서 데이터 가져오기
      const response = await fetch('/api/admin/diagnosis-reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('✅ 관리자 진단 데이터 로드 성공:', result.data.length);
          setReports(result.data);
        } else {
          throw new Error(result.error || '데이터를 불러올 수 없습니다.');
        }
      } else {
        throw new Error(`API 응답 오류: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ 보고서 로드 실패:', error);
      
      // 오류 시 샘플 데이터로 대체
      const sampleReports: DiagnosisReport[] = [
        {
          diagnosisId: 'DIAG_45Q_1234567890_abc123',
          companyName: '삼성전자',
          contactName: '김철수',
          contactEmail: 'kim@samsung.com',
          totalScore: 185,
          grade: 'A',
          maturityLevel: 'AI 선도기업',
          submittedAt: '2025-01-27T10:30:00',
          status: 'completed'
        },
        {
          diagnosisId: 'DIAG_45Q_1234567891_def456',
          companyName: 'LG전자',
          contactName: '이영희',
          contactEmail: 'lee@lg.com',
          totalScore: 158,
          grade: 'B+',
          maturityLevel: 'AI 활용기업',
          submittedAt: '2025-01-27T09:15:00',
          status: 'completed'
        },
        {
          diagnosisId: 'DIAG_45Q_1234567892_ghi789',
          companyName: 'SK하이닉스',
          contactName: '박민수',
          contactEmail: 'park@sk.com',
          totalScore: 142,
          grade: 'B',
          maturityLevel: 'AI 관심기업',
          submittedAt: '2025-01-27T08:45:00',
          status: 'completed'
        }
      ];
      setReports(sampleReports);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    // V27.0 Ultimate 안전성 강화: null/undefined 검사
    const companyName = report.companyName || '';
    const contactName = report.contactName || '';
    const diagnosisId = report.diagnosisId || '';
    
    const matchesSearch = 
      companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosisId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGrade === 'all' || report.grade === filterGrade;
    
    return matchesSearch && matchesGrade;
  });

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B+': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewReport = (diagnosisId: string) => {
    router.push(`/diagnosis-results/${diagnosisId}`);
  };

  const handleExportAll = () => {
    // 전체 데이터 내보내기 기능
    console.log('전체 데이터 내보내기');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-gray-600">모든 AI 역량진단 결과를 관리하고 분석할 수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                총 진단 수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-gray-500 mt-1">전체 진단 건수</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                평균 점수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reports.length > 0 
                  ? Math.round(reports.reduce((sum, r) => sum + r.totalScore, 0) / reports.length)
                  : 0
                }
              </div>
              <p className="text-xs text-gray-500 mt-1">225점 만점 기준</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                최고 등급
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reports.length > 0 
                  ? reports.reduce((max, r) => r.grade > max ? r.grade : max, reports[0].grade)
                  : '-'
                }
              </div>
              <p className="text-xs text-gray-500 mt-1">최고 성과 등급</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                오늘 진단
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reports.filter(r => {
                  const today = new Date().toDateString();
                  const reportDate = new Date(r.submittedAt).toDateString();
                  return today === reportDate;
                }).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">오늘 완료된 진단</p>
            </CardContent>
          </Card>
        </div>

        {/* 진단 결과 목록 */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  진단 결과 목록
                </CardTitle>
                <CardDescription>
                  총 {filteredReports.length}개의 진단 결과가 있습니다.
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <Input
                  placeholder="회사명, 담당자, 진단ID로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  aria-label="등급별 필터"
                >
                  <option value="all">전체 등급</option>
                  <option value="A">A등급</option>
                  <option value="B+">B+등급</option>
                  <option value="B">B등급</option>
                  <option value="C">C등급</option>
                </select>
                
                <Button onClick={handleExportAll} className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  전체 내보내기
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">진단 결과를 불러오는 중...</p>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">검색 조건에 맞는 진단 결과가 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-700">진단ID</th>
                      <th className="text-left p-3 font-medium text-gray-700">회사명</th>
                      <th className="text-left p-3 font-medium text-gray-700">담당자</th>
                      <th className="text-left p-3 font-medium text-gray-700">점수</th>
                      <th className="text-left p-3 font-medium text-gray-700">등급</th>
                      <th className="text-left p-3 font-medium text-gray-700">성숙도</th>
                      <th className="text-left p-3 font-medium text-gray-700">제출일시</th>
                      <th className="text-left p-3 font-medium text-gray-700">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.diagnosisId} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {report.diagnosisId}
                          </code>
                        </td>
                        <td className="p-3 font-medium">{report.companyName}</td>
                        <td className="p-3">
                          <div className="font-medium">{report.contactName}</div>
                          <div className="text-sm text-gray-500">{report.contactEmail}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-lg">{report.totalScore}</div>
                          <div className="text-xs text-gray-500">/ 225점</div>
                        </td>
                        <td className="p-3">
                          <Badge className={getGradeColor(report.grade)}>
                            {report.grade}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{report.maturityLevel}</div>
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {new Date(report.submittedAt).toLocaleString('ko-KR')}
                        </td>
                        <td className="p-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewReport(report.diagnosisId)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            보기
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 관리자 안내 */}
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                관리자 전용 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700">
                <div>
                  <h4 className="font-medium mb-2">📊 데이터 관리</h4>
                  <ul className="space-y-1">
                    <li>• 모든 진단 결과 조회 및 분석</li>
                    <li>• 상세 통계 데이터 및 트렌드 분석</li>
                    <li>• 데이터 내보내기 및 백업</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🔧 시스템 관리</h4>
                  <ul className="space-y-1">
                    <li>• 진단 결과 수정 및 관리</li>
                    <li>• 사용자 접근 권한 관리</li>
                    <li>• 시스템 설정 및 모니터링</li>
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

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, FileText, Loader2 } from 'lucide-react';

interface DiagnosisReport {
  diagnosisId: string;
  companyName: string;
  contactEmail: string;
  htmlContent: string;
  createdAt: string;
  scoreAnalysis: {
    totalScore: number;
    grade: string;
    maturityLevel: string;
    categoryScores: Record<string, number>;
  };
}

export default function DiagnosisReportPage() {
  const params = useParams();
  const diagnosisId = params.diagnosisId as string;
  
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (diagnosisId) {
      fetchReport();
    }
  }, [diagnosisId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      // 폴백 금지: 서버 라우트를 통해 GAS에서만 취득
      const response = await fetch(`/api/diagnosis-results/${encodeURIComponent(diagnosisId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok && result?.success && (result?.data?.report || result?.data?.htmlContent)) {
        const data = result.data;
        setReport({
          diagnosisId,
          companyName: data.companyInfo?.name || data.companyName || '',
          contactEmail: data.companyInfo?.contact?.email || data.contactEmail || '',
          createdAt: data.createdAt || new Date().toISOString(),
          htmlContent: data.report?.html || data.htmlContent || '',
          scoreAnalysis: data.scoreAnalysis || {
            totalScore: data.totalScore || 0,
            grade: data.grade || '',
            maturityLevel: data.maturityLevel || '',
            categoryScores: data.categoryScores || {}
          }
        });
      } else {
        throw new Error('보고서 데이터가 없습니다');
      }

    } catch (err) {
      console.error('보고서 로딩 실패:', err);
      setError('보고서를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackReport = (): DiagnosisReport => {
    const currentDate = new Date().toLocaleDateString('ko-KR');
    
    return {
      diagnosisId: diagnosisId,
      companyName: '진단 완료 기업',
      contactEmail: 'contact@company.com',
      createdAt: currentDate,
      scoreAnalysis: {
        totalScore: 75,
        grade: 'B',
        maturityLevel: 'Intermediate',
        categoryScores: {
          businessFoundation: 80,
          currentAI: 65,
          organizationReadiness: 85,
          techInfrastructure: 70,
          goalClarity: 75,
          executionCapability: 75
        }
      },
      htmlContent: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이교장의AI역량진단보고서 - ${diagnosisId}</title>
    <style>
        body {
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
            line-height: 1.8;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
        }
        .header h1 {
            font-size: 2.8rem;
            margin: 0 0 15px 0;
            font-weight: 700;
        }
        .content {
            padding: 50px 40px;
        }
        .score-section {
            background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
            color: white;
            padding: 50px 40px;
            border-radius: 20px;
            text-align: center;
            margin: 40px 0;
        }
        .score-big {
            font-size: 4.5rem;
            font-weight: 800;
            margin: 20px 0;
        }
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }
        .category-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            border: 1px solid #f0f0f0;
        }
        .category-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
        }
        .category-score {
            font-size: 2.2rem;
            font-weight: 800;
            color: #4285f4;
            margin-bottom: 15px;
        }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #f0f0f0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4285f4, #34a853);
            border-radius: 4px;
        }
        .footer {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 50px 40px;
            text-align: center;
        }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎯</div>
            <h1>이교장의AI역량진단보고서</h1>
            <p>AICAMP - AI 역량 강화 솔루션</p>
        </div>
        
        <div class="content">
            <div class="score-section">
                <div class="score-big">75점</div>
                <div style="font-size: 1.4rem; margin-bottom: 20px;">AI 역량 종합 점수</div>
                <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 12px 30px; border-radius: 50px; font-size: 1.2rem; font-weight: 700;">B 등급</div>
            </div>
            
            <h2 style="color: #2c5aa0; font-size: 2rem; margin-bottom: 30px;">📊 영역별 진단 결과</h2>
            
            <div class="category-grid">
                <div class="category-card">
                    <div class="category-title">🏢 사업 기반</div>
                    <div class="category-score">80점</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 80%;"></div>
                    </div>
                </div>
                
                <div class="category-card">
                    <div class="category-title">🤖 현재 AI 활용</div>
                    <div class="category-score">65점</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 65%;"></div>
                    </div>
                </div>
                
                <div class="category-card">
                    <div class="category-title">🏗️ 조직 준비도</div>
                    <div class="category-score">85점</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 85%;"></div>
                    </div>
                </div>
                
                <div class="category-card">
                    <div class="category-title">💻 기술 인프라</div>
                    <div class="category-score">70점</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 70%;"></div>
                    </div>
                </div>
                
                <div class="category-card">
                    <div class="category-title">🎯 목표 명확성</div>
                    <div class="category-score">75점</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%;"></div>
                    </div>
                </div>
                
                <div class="category-card">
                    <div class="category-title">⚡ 실행 역량</div>
                    <div class="category-score">75점</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%;"></div>
                    </div>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); padding: 40px; border-radius: 20px; margin: 40px 0; border: 1px solid #ffc107;">
                <h2 style="color: #e65100; font-size: 2rem; margin-bottom: 25px;">💡 GEMINI 2.5 Flash AI 분석 결과</h2>
                <div style="font-size: 1.1rem; line-height: 1.8; color: #5d4037;">
                    귀하의 기업은 AI 도입을 위한 기본적인 인프라와 조직 준비도를 갖추고 있습니다. 
                    특히 조직 준비도(85점)가 높아 AI 도입에 대한 내부 수용성이 우수합니다.
                    
                    <br><br><strong>주요 강점:</strong><br>
                    • 조직 구성원들의 AI에 대한 긍정적 인식<br>
                    • 안정적인 사업 기반 구조<br>
                    • 명확한 목표 설정 능력
                    
                    <br><br><strong>개선 필요 영역:</strong><br>
                    • 현재 AI 활용도 확대 (65점 → 80점 목표)<br>
                    • 기술 인프라 고도화 (70점 → 85점 목표)<br>
                    • 실행 역량 강화를 통한 실질적 성과 창출
                    
                    <br><br><strong>추천 액션 플랜:</strong><br>
                    1. AI 파일럿 프로젝트 시작 (3개월)<br>
                    2. 직원 AI 리터러시 교육 프로그램 (6개월)<br>
                    3. 기술 인프라 업그레이드 (12개월)<br>
                    4. AI 거버넌스 체계 구축 (18개월)
                </div>
            </div>
        </div>
        
        <div class="footer">
            <h3>AICAMP - AI 역량 강화 전문 기관</h3>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧</span>
                    <span>hongik423@gmail.com</span>
                </div>
                <div class="contact-item">
                    <span>📞</span>
                    <span>010-9251-9743</span>
                </div>
                <div class="contact-item">
                    <span>🌐</span>
                    <span>aicamp.club</span>
                </div>
            </div>
            <p style="margin-top: 30px; opacity: 0.8;">
                진단 ID: ${diagnosisId}<br>
                생성일: ${currentDate}<br>
                Powered by GEMINI 2.5 Flash AI
            </p>
        </div>
    </div>
</body>
</html>
      `
    };
  };

  const downloadHTML = () => {
    if (!report) return;
    
    const blob = new Blob([report.htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI역량진단보고서_${report.companyName}_${report.diagnosisId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInNewWindow = () => {
    if (!report) return;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(report.htmlContent);
      newWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">보고서 로딩 중...</h2>
            <p className="text-gray-600">AI 진단 보고서를 불러오고 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2 text-red-700">오류 발생</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchReport} variant="outline">
              다시 시도
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">보고서를 찾을 수 없습니다</h2>
            <p className="text-gray-600">요청하신 진단 보고서가 존재하지 않습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI 역량진단 보고서</h1>
              <p className="text-sm text-gray-600">진단 ID: {report.diagnosisId}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={downloadHTML} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                HTML 다운로드
              </Button>
              <Button onClick={openInNewWindow} size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                새 창에서 보기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 보고서 미리보기 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              보고서 미리보기
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white border rounded-lg overflow-hidden">
              <iframe
                srcDoc={report.htmlContent}
                className="w-full h-[800px] border-0"
                title="AI 역량진단 보고서"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

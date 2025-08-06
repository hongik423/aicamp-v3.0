'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  TrendingUp, 
  Star, 
  Award, 
  Target,
  FileText,
  Download,
  Mail,
  Phone,
  Loader2,
  ExternalLink,
  Eye,
  BarChart3,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface CompleteDiagnosisResultsProps {
  data: {
    success: boolean;
    message: string;
    data: {
      diagnosis: {
        resultId: string;
        companyName: string;
        contactManager: string;
        email: string;
        phone: string;
        industry: string;
        employeeCount: string;
        businessLocation: string;
        
        // 🎯 완벽한 점수 체계
        totalScore: number;
        overallGrade: string;
        reliabilityScore: number;
        
        // 📊 5개 카테고리별 상세 점수
        categoryResults: Array<{
          category: string;
          score: number;
          score100: number;
          targetScore: number;
          benchmarkScore: number;
          weight: number;
          gapScore: number;
          strengths: string[];
          weaknesses: string[];
          itemResults: Array<{
            itemId: string;
            itemName: string;
            currentScore: number | null;
            targetScore: number;
            gap: number;
            priority: 'HIGH' | 'MEDIUM' | 'LOW';
            recommendation: string;
          }>;
        }>;
        
        // 🎯 SWOT 분석 완전판
        swotAnalysis: {
          strengths: string[];
          weaknesses: string[];
          opportunities: string[];
          threats: string[];
          strategicMatrix: string;
          strategies?: { // Added for new strategy display
            SO: string[];
            WO: string[];
            ST: string[];
            WT: string[];
          };
          aiAnalysis?: { // Added for AI analysis
            currentAITrends: string[];
            futureChanges: string[];
            adaptationStrategies: string[];
            competitiveAdvantages: string[];
          };
        };
        
        // 💡 맞춤형 추천사항
        recommendedActions: Array<{
          title: string;
          description: string;
          category: string;
          priority: 'HIGH' | 'MEDIUM' | 'LOW';
          timeframe: string;
          expectedImpact: string;
          implementationCost: 'LOW' | 'MEDIUM' | 'HIGH';
        }>;
        
        // 📈 비교 지표
        comparisonMetrics: {
          industryPercentile: number;
          competitivePosition: string;
          growthPotential: number;
        };
        
        comprehensiveReport: string;
        submitDate: string;
        processingTime: string;
        emailSent: boolean;
        emailError?: string;
        
        // 🆕 접수 확인 메일 상태
        confirmationEmailSent?: boolean;
        confirmationEmailError?: string;
      };
      
      summaryReport: string;
      reportLength: number;
      resultId: string;
      resultUrl: string;
      submitDate: string;
      processingTime: string;
      emailSent: boolean;
      emailError?: string;
    };
  };
}

export default function SimpleDiagnosisResults({ data }: CompleteDiagnosisResultsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const { toast } = useToast();

  // 타임아웃/백그라운드 처리 상황 체크
  if (data?.isTimeout || data?.data?.diagnosis?.backgroundProcessing) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-orange-600 animate-pulse" />
      </div>
            <CardTitle className="text-2xl text-orange-900">
              🤖 AI 분석이 진행 중입니다
            </CardTitle>
            <p className="text-orange-700 text-lg mt-2">
              {data.data?.diagnosis?.companyName || '귀하의 기업'}에 대한 고품질 분석을 위해<br />
              백그라운드에서 처리 중입니다
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3">📊 AI 분석 진행 상황</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-green-700">✅ 데이터 검증 완료</span>
                    <p className="text-green-600 text-xs mt-1">제출된 정보의 완성도와 유효성 검증 완료</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-blue-700">🤖 GEMINI 2.5 Flash AI 분석 중...</span>
                    <p className="text-blue-600 text-xs mt-1">AI 역량 6분야 종합 평가 및 업종별 벤치마크 비교 (2-3분 소요)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-yellow-700">🎯 SWOT 전략 분석 대기 중</span>
                    <p className="text-yellow-600 text-xs mt-1">강점/약점/기회/위협 요인 분석 및 전략 도출 (1-2분 소요)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-600">📄 맞춤형 보고서 생성 대기 중</span>
                    <p className="text-gray-500 text-xs mt-1">실행 로드맵 및 개선방안 포함 종합 보고서 작성 (2-3분 소요)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-600">📧 이메일 전송 대기 중</span>
                    <p className="text-gray-500 text-xs mt-1">PDF 형태의 최종 진단보고서 이메일 발송 (30-60초 소요)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📧 이메일 확인</h4>
              <p className="text-blue-700 text-sm">
                분석이 완료되면 <strong>{data.data?.diagnosis?.email || '등록하신 이메일'}</strong>로<br />
                상세한 진단 보고서가 자동 발송됩니다.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                결과 다시 확인
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/diagnosis'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                새로운 진단 시작
              </Button>
                            </div>
          </CardContent>
        </Card>
                            </div>
    );
  }

  // 오류 상황 체크
  if (data?.error || !data?.data?.diagnosis) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-red-200 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
                                    </div>
            <CardTitle className="text-2xl text-red-900">
              ❌ 진단 처리 중 오류가 발생했습니다
            </CardTitle>
            <p className="text-red-700 text-lg mt-2">
              잠시 후 다시 시도해주시거나<br />
              전문가 상담을 신청해주세요
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">🔧 문제 해결 방법</h4>
              <div className="space-y-2 text-sm text-red-700">
                <div>• 브라우저를 새로고침하고 다시 시도</div>
                <div>• 다른 브라우저로 접속 시도</div>
                <div>• 인터넷 연결 상태 확인</div>
                <div>• 전문가 상담 신청</div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/consultation'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                전문가 상담 신청
              </Button>
                    </div>
          </CardContent>
        </Card>
                    </div>
    );
  }

  const diagnosis = data.data.diagnosis;
  const totalScore = diagnosis.totalScore || 0;
  const grade = diagnosis.overallGrade || 'C';
  const percentile = diagnosis.comparisonMetrics?.industryPercentile || 50;

        return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 성공 메시지 */}
      <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
          <CardTitle className="text-2xl text-green-900">
            🎉 AI 역량진단이 완료되었습니다!
          </CardTitle>
          <p className="text-green-700 text-lg mt-2">
            {diagnosis.companyName || '귀하의 기업'}에 대한<br />
            전문가 수준의 AI 역량 분석이 완료되었습니다
          </p>
        </CardHeader>
            </Card>

      {/* 주요 결과 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-xl">📊 AI 역량 진단 결과</CardTitle>
              </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalScore}점</div>
              <div className="text-sm text-blue-700">종합 점수</div>
                    </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{grade}등급</div>
              <div className="text-sm text-purple-700">AI 성숙도</div>
                  </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">상위 {percentile}%</div>
              <div className="text-sm text-green-700">업계 순위</div>
                  </div>
                </div>
              </CardContent>
            </Card>

      {/* 상세 분석 */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">🔍 상세 분석 결과</CardTitle>
                  </CardHeader>
        <CardContent className="space-y-4">
          {diagnosis.categoryResults?.map((category: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{category.category}</h4>
                <span className="text-lg font-bold text-blue-600">{category.score.toFixed(1)}점</span>
                      </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(category.score / 5) * 100}%` }}
                ></div>
                      </div>
              <p className="text-sm text-gray-600 mt-2">
                현재 점수: {category.score.toFixed(1)}점 (5점 만점)
                <br />100점 환산: {category.score100}점
                <br />목표: {category.targetScore}점
                <br />격차: {category.gapScore}점
                <br />가중치: {Math.round(category.weight * 100)}%
              </p>
              
                      {category.strengths.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            주요 강점
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                    {category.strengths.slice(0, 2).map((strength: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {category.weaknesses.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            개선 필요사항
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                    {category.weaknesses.slice(0, 2).map((weakness: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
          ))}
                  </CardContent>
                </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setShowFullReport(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          상세 보고서 보기
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/consultation'}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          전문가 상담 신청
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/diagnosis'}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          새로운 진단 시작
        </Button>
            </div>

      {/* 상세 보고서 모달 */}
      {showFullReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📋 AI 역량진단 상세 보고서</h2>
                <Button 
                  variant="outline"
                  onClick={() => setShowFullReport(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
          </div>

          <div className="space-y-6">
                {/* 기업 정보 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">🏢 기업 정보</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><strong>기업명:</strong> {diagnosis.companyName}</div>
                    <div><strong>업종:</strong> {diagnosis.industry}</div>
                    <div><strong>직원수:</strong> {diagnosis.employeeCount}</div>
                    <div><strong>담당자:</strong> {diagnosis.contactManager}</div>
                    <div><strong>사업장 위치:</strong> {diagnosis.businessLocation}</div>
                    <div><strong>진단일시:</strong> {diagnosis.submitDate}</div>
                    <div><strong>처리시간:</strong> {diagnosis.processingTime}</div>
                    <div><strong>결과 ID:</strong> {diagnosis.resultId}</div>
                  </div>
                </div>

                {/* SWOT 분석 */}
                {diagnosis.swotAnalysis && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">📈 SWOT 분석</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">강점 (Strengths)</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          {diagnosis.swotAnalysis.strengths?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">약점 (Weaknesses)</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {diagnosis.swotAnalysis.weaknesses?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">기회 (Opportunities)</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {diagnosis.swotAnalysis.opportunities?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">위협 (Threats)</h4>
                        <ul className="text-sm text-orange-700 space-y-1">
                          {diagnosis.swotAnalysis.threats?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
            </div>
                    </div>
                  </div>
                )}

            {/* SWOT 전략 매트릭스 */}
                {diagnosis.swotAnalysis?.strategies && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">🔍 SWOT 전략 매트릭스</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-green-600">SO 전략:</strong> 강점을 활용하여 기회를 극대화
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-blue-600">WO 전략:</strong> 약점을 보완하여 기회를 선점
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-purple-600">ST 전략:</strong> 강점으로 위협을 방어
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-orange-600">WT 전략:</strong> 약점 개선으로 위협을 최소화
                  </div>
                </div>
          </div>
                )}

                {/* AI 트렌드 분석 */}
                {diagnosis.swotAnalysis?.aiAnalysis && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">🤖 AI 트렌드 분석</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">현재 주목받는 AI 기술</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.currentAITrends?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">AI로 인한 미래 변화</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.futureChanges?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                    </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">AI 적응 전략</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.adaptationStrategies?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">AI 도입시 경쟁 우위</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.competitiveAdvantages?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      </div>
                    </div>
                )}

                {/* 개선 방안 */}
                {diagnosis.recommendedActions && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">💡 개선 방안</h3>
                    <ul className="text-sm text-blue-700 space-y-2">
                      {diagnosis.recommendedActions.map((action: any, index: number) => (
                        <li key={index}>
                          <strong>{action.title}:</strong> {action.description}
                          <br />
                          우선순위: {action.priority}, 기간: {action.timeframe}, 예상효과: {action.expectedImpact}, 투자비용: {action.implementationCost}
                        </li>
                      ))}
                    </ul>
            </div>
                )}

                {/* 종합 경영진단보고서 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">📋 종합 경영진단보고서</h3>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <div className="whitespace-pre-line text-base">
                    {diagnosis.comprehensiveReport}
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-500 text-right">
                    보고서 길이: {diagnosis.comprehensiveReport?.length || 0}자
                </div>
          </div>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
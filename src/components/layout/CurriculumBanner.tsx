'use client';

import React, { useState, useEffect } from 'react';
import { Download, BookOpen, Sparkles, X, Eye, ChevronDown, ChevronUp, Play } from 'lucide-react';
import SimplePDFPreviewModal from './SimplePDFPreviewModal';

export default function CurriculumBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  // 로컬 스토리지에서 배너 닫기 상태 확인 (자동 닫기 제거)
  useEffect(() => {
    // 자동 닫기 기능 완전 제거 - 사용자가 직접 닫기 전까지는 계속 표시
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/images/n8n_Curriculum.pdf';
      link.download = 'AICAMP_n8n_커리큘럼.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 다운로드 후에도 배너는 계속 유지 (사용자가 직접 닫을 때까지)
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('curriculum-banner-closed', 'true');
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 전체화면 오버레이 - 애플 스타일 미니멀 디자인 */}
      <div className="fixed inset-0 z-[2147483648] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        {/* 메인 컨테이너 - 깔끔한 흰색 디자인 */}
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl mx-auto overflow-hidden border border-gray-100 my-8">
          {/* 헤더 - 미니멀한 디자인 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                    <h2 className="text-4xl font-bold text-gray-900">
                      n8n 커리큘럼
                    </h2>
                  </div>
                  <p className="text-xl text-gray-600 font-medium">
                    업무 자동화의 핵심! AI 워크플로우 구축 가이드
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="배너 닫기"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* 메인 콘텐츠 - PDF 미리보기와 정보를 나란히 배치 */}
          <div className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* 왼쪽: PDF 미리보기 섹션 */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    📖 커리큘럼 미리보기
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    전체 커리큘럼을 미리 확인하고 다운로드하세요
                  </p>
                </div>

                                 {/* PDF 미리보기 카드 */}
                 <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 cursor-pointer group" onClick={handlePreview}>
                   <div className="text-center space-y-4">
                     <div className="w-48 h-64 bg-white rounded-2xl shadow-lg mx-auto flex items-center justify-center border-2 border-gray-200 group-hover:border-blue-300 transition-colors overflow-hidden">
                       <img 
                         src="/images/book_1_cover.JPG" 
                         alt="AICAMP n8n 커리큘럼" 
                         className="w-full h-full object-cover rounded-xl"
                       />
                     </div>
                     <div>
                       <h4 className="text-xl font-bold text-gray-900 mb-2">
                         AICAMP n8n 커리큘럼
                       </h4>
                       <p className="text-gray-600 mb-4">
                         업무 자동화 전문가 양성 프로그램
                       </p>
                       <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                         <Eye className="w-5 h-5" />
                         미리보기
                       </button>
                     </div>
                   </div>
                 </div>

                {/* 다운로드 버튼 */}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold px-8 py-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>다운로드 중...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      <span>📥 전체 PDF 다운로드</span>
                    </>
                  )}
                </button>
              </div>

              {/* 오른쪽: 상세 정보 */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    🎯 학습 목표
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    n8n을 활용하여 업무 자동화 시스템을 구축하고, AI 기술과 결합하여 
                    혁신적인 워크플로우를 설계할 수 있는 전문가로 성장합니다.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">커리큘럼 특징</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg">실무 중심의 n8n 워크플로우 설계</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg">AI 통합 및 자동화 구현</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg">기업 맞춤형 솔루션 개발</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg">실전 프로젝트 기반 학습</span>
                    </li>
                  </ul>
                </div>

                {/* 확장 가능한 상세 내용 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
                  <button
                    onClick={toggleFullContent}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-xl font-bold text-gray-900">📋 상세 커리큘럼</h3>
                    {showFullContent ? (
                      <ChevronUp className="w-6 h-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                  
                  {showFullContent && (
                    <div className="mt-6 space-y-4">
                      {/* 1페이지: 커리큘럼 개요 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">📋 1페이지: 커리큘럼 개요</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• 기업체 AI & n8n 자동화 교육 개요</li>
                          <li>• 부서별 세그먼트 및 강의 트랙 요약표</li>
                          <li>• 기획/전략, 영업, 마케팅 트랙별 학습 목표</li>
                          <li>• AI + n8n 강의 포인트 및 주요 주제</li>
                        </ul>
                      </div>

                      {/* 2페이지: 기획/전략 트랙 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">🎯 2페이지: 기획/전략 트랙</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• 대상: 기획팀, 전략기획팀, 사업기획팀</li>
                          <li>• 시장 동향 분석 자동화</li>
                          <li>• 보고서 생성 자동화</li>
                          <li>• KPI 요약 자동화</li>
                          <li>• 회의록 요약 공유</li>
                        </ul>
                      </div>

                      {/* 3페이지: 영업 트랙 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">💼 3페이지: 영업 트랙</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• 대상: B2B/B2C 영업팀, 기술영업팀</li>
                          <li>• 영업활동 리포트 자동화</li>
                          <li>• 고객사별 맞춤 제안서 작성</li>
                          <li>• 방문 일정 리마인드 자동화</li>
                          <li>• 고객 데이터 분석 및 인사이트 도출</li>
                        </ul>
                      </div>

                      {/* 4페이지: 마케팅 트랙 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">📢 4페이지: 마케팅 트랙</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• 대상: 디지털/퍼포먼스 마케팅, 콘텐츠 마케팅팀</li>
                          <li>• 광고 성과 분석 자동화</li>
                          <li>• 캠페인 리포트 요약</li>
                          <li>• SNS 댓글 분석 및 대응 자동화</li>
                          <li>• 마케팅 ROI 분석 및 최적화</li>
                        </ul>
                      </div>

                      {/* 5페이지: n8n 기초 실습 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">🔧 5페이지: n8n 기초 실습</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• n8n 설치 및 환경 설정</li>
                          <li>• 워크플로우 기본 개념 이해</li>
                          <li>• 노드와 연결 방식 학습</li>
                          <li>• 기본 워크플로우 생성 실습</li>
                          <li>• 데이터 변환 및 처리 방법</li>
                        </ul>
                      </div>

                      {/* 6페이지: AI 통합 워크플로우 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">🤖 6페이지: AI 통합 워크플로우</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• OpenAI, Claude API 연동</li>
                          <li>• 자연어 처리 자동화 구현</li>
                          <li>• 지능형 워크플로우 설계</li>
                          <li>• AI 응답 처리 및 후처리</li>
                          <li>• 멀티 AI 서비스 통합</li>
                        </ul>
                      </div>

                      {/* 7페이지: 고급 활용 및 최적화 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">⚡ 7페이지: 고급 활용 및 최적화</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• 기업 맞춤형 솔루션 개발</li>
                          <li>• 성능 최적화 및 모니터링</li>
                          <li>• 보안 및 권한 관리</li>
                          <li>• 대용량 데이터 처리 최적화</li>
                          <li>• 워크플로우 버전 관리</li>
                        </ul>
                      </div>

                      {/* 8페이지: 실전 프로젝트 및 평가 */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">🏆 8페이지: 실전 프로젝트 및 평가</h4>
                        <ul className="space-y-2 text-gray-700 text-base">
                          <li>• 부서별 맞춤 실전 프로젝트</li>
                          <li>• 워크플로우 설계 및 구현</li>
                          <li>• 성과 측정 및 분석</li>
                          <li>• 최종 평가 및 인증</li>
                          <li>• 지속적인 학습 및 발전 방향</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="text-center text-base text-gray-600">
              <p className="font-bold text-lg mb-2">🚀 AICAMP와 함께 AI 자동화의 미래를 경험하세요</p>
              <p>언제든지 X 버튼을 눌러 닫을 수 있습니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* PDF 미리보기 모달 */}
      <SimplePDFPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        pdfUrl="/images/n8n_Curriculum.pdf"
        fileName="AICAMP_n8n_커리큘럼.pdf"
      />
    </>
  );
}

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, DollarSign, Calendar, FileText, Phone, Globe, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function OperatingFundingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">운전자금</h1>
            <Badge variant="outline" className="ml-2">정책자금</Badge>
          </div>
          <p className="text-xl text-gray-600">중소기업의 원활한 사업 운영을 위한 운전자금 지원</p>
        </div>

        {/* 개요 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              운전자금 개요
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 운전자금이란?</h3>
                <p className="text-gray-700">
                  중소기업이 사업 운영에 필요한 원재료 구입, 인건비, 임차료, 마케팅비 등 일상적인 경영활동을 위한 단기자금을 지원하는 정책자금입니다.
                  기업의 유동성 확보와 안정적인 사업 운영을 목적으로 합니다.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">🎯 지원 목적</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>중소기업의 유동성 확보 및 경영안정</li>
                  <li>원재료 구입 및 제품 생산 지원</li>
                  <li>신시장 진출 및 마케팅 활동 지원</li>
                  <li>경영 위기 극복 및 회생 지원</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 정책자금 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 긴급경영안정자금 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">긴급경영안정자금</CardTitle>
              <CardDescription>경영애로 중소기업 집중 지원</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원한도</span>
                  <Badge variant="secondary">최대 10억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원기간</span>
                  <Badge variant="secondary">3년간 15억원 이내</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">금리</span>
                  <Badge variant="secondary">기준금리 + 0.5%p</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">상환기간</span>
                  <Badge variant="secondary">최대 5년</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">지원 대상</p>
                  <ul className="text-sm space-y-1">
                    <li>• 대내외 불확실성에 따른 경영애로 기업</li>
                    <li>• 자연재해 피해 중소기업</li>
                    <li>• 매출 감소 등으로 어려움을 겪는 기업</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 통상리스크대응 긴급자금 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">통상리스크대응 긴급자금</CardTitle>
              <CardDescription>미국 관세조치 등 통상리스크 대응</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원한도</span>
                  <Badge variant="secondary">별도 한도</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">상환기간</span>
                  <Badge variant="secondary">6년 (타 자금 대비 +1년)</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">금리</span>
                  <Badge variant="secondary">기준금리 - 0.3%p</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">만기연장</span>
                  <Badge variant="secondary">1년 추가 연장 가능</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">지원 대상</p>
                  <ul className="text-sm space-y-1">
                    <li>• 미국 품목관세 관련 업종 기업</li>
                    <li>• 미국 수출 비중이 높은 기업</li>
                    <li>• 통상환경 변화로 경영애로 기업</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 신시장진출지원자금 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              신시장진출지원자금
            </CardTitle>
            <CardDescription>신시장 개척 및 수출 다변화 지원</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">운전자금 지원 내용</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">최대 10억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">최대 5년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">정책자금 기준금리</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">신청방식</span>
                    <Badge variant="outline">상시 접수</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">주요 활용 분야</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">해외 마케팅 및 홍보비</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">수출용 제품 생산자금</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">해외 전시회 참가비</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">해외 바이어 발굴 비용</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 소상공인 운전자금 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              소상공인 운전자금
            </CardTitle>
            <CardDescription>소상공인 특화 운전자금 지원</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">일반경영안정자금</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">최대 7천만원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">5년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">기준금리 + 0.6%p</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">대출방식</span>
                    <Badge variant="outline">대리대출</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    업력 제한 없이 모든 소상공인 신청 가능
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">신용취약자금</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">최대 3천만원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">5년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">기준금리 + 1.6%p</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">대출방식</span>
                    <Badge variant="outline">직접대출</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    NCB 신용점수 839점 이하 중·저신용자 대상
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">혁신성장촉진자금</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">일반형</span>
                    <Badge variant="outline">최대 1억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">혁신형</span>
                    <Badge variant="outline">최대 2억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">5년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">기준금리 + 0.4%p</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    성장 가능성이 높은 소상공인 대상
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 보증기관 지원 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 기술보증기금 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">기술보증기금</CardTitle>
              <CardDescription>기술기업 운전자금 보증</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원한도</span>
                  <Badge variant="secondary">최대 30억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증비율</span>
                  <Badge variant="secondary">최대 95%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증기간</span>
                  <Badge variant="secondary">최대 5년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증료율</span>
                  <Badge variant="secondary">연 0.5%~2.0%</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 특징</p>
                  <ul className="text-sm space-y-1">
                    <li>• 기술력 평가 기반 보증</li>
                    <li>• 특례보증 프로그램 운영</li>
                    <li>• 녹색기술 우대 지원</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.kibo.or.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    1544-1120
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 지역신용보증재단 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">지역신용보증재단</CardTitle>
              <CardDescription>소상공인 보증 전담기관</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">2024년 공급</span>
                  <Badge variant="secondary">14.2조원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">추경 증액</span>
                  <Badge variant="secondary">2.0조원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원방식</span>
                  <Badge variant="secondary">신규 보증</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">대상</span>
                  <Badge variant="secondary">소상공인 전용</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 특징</p>
                  <ul className="text-sm space-y-1">
                    <li>• 소상공인 민생회복 지원</li>
                    <li>• 경영애로 해소 중점</li>
                    <li>• 자연재해 피해 지원</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.sbcgf.or.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    지역별 재단
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 신청 절차 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              신청 절차
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-1">자금 소요 파악</h4>
                <p className="text-sm text-gray-600">운전자금 필요 규모 및 용도 확인</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-1">상품 선택</h4>
                <p className="text-sm text-gray-600">기업 상황에 맞는 자금 상품 선택</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-1">서류 준비</h4>
                <p className="text-sm text-gray-600">사업계획서 및 재무서류 준비</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h4 className="font-medium mb-1">신청 접수</h4>
                <p className="text-sm text-gray-600">금융기관 또는 보증기관 방문</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">5</span>
                </div>
                <h4 className="font-medium mb-1">자금 지원</h4>
                <p className="text-sm text-gray-600">심사 완료 후 자금 지원</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 필요서류 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>필요서류</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">기본 서류</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">사업자등록증 사본</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">법인등기부등본 (최근 3개월 이내)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">재무제표 (최근 3년)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">부가세 과세표준증명원</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">사업계획서</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">추가 서류 (해당시)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">수출실적증명서 (수출기업)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">원재료 구매계약서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">매출채권 현황서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">임대차계약서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-sm">보험증권 사본</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주의사항 */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              주의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-orange-600">•</span>
                <span className="text-sm text-orange-700">운전자금은 시설투자에 사용할 수 없습니다</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600">•</span>
                <span className="text-sm text-orange-700">대출 실행 후 사용처 모니터링이 있을 수 있습니다</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600">•</span>
                <span className="text-sm text-orange-700">기존 대출 상환용으로 사용할 수 없습니다</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600">•</span>
                <span className="text-sm text-orange-700">자금 사용 계획서를 정확히 작성해야 합니다</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 관련 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>관련 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.kosmes.or.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>중소벤처기업진흥공단</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.semas.or.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>소상공인시장진흥공단</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.bizinfo.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>기업마당</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.k-startup.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>K-Startup</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 뒤로가기 */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/services/policy-funding">
              ← 정책자금 메인으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 
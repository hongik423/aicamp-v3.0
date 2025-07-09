'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Building, DollarSign, Calendar, FileText, Phone, Globe } from 'lucide-react';
import Link from 'next/link';

export default function FacilityFundingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">시설자금</h1>
            <Badge variant="outline" className="ml-2">정책자금</Badge>
          </div>
          <p className="text-xl text-gray-600">중소기업의 시설 확충 및 현대화를 위한 정책자금 지원</p>
        </div>

        {/* 개요 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              시설자금 개요
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 시설자금이란?</h3>
                <p className="text-gray-700">
                  중소기업이 생산설비, 공장건설, 토지구입, 기계장비 도입 등 고정자산 취득을 위해 필요한 자금을 지원하는 정책자금입니다.
                  기업의 생산능력 확대, 기술혁신, 현대화 등을 통해 경쟁력 강화를 목적으로 합니다.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">🎯 지원 목적</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>중소기업의 생산시설 확충 및 현대화</li>
                  <li>기술혁신을 통한 경쟁력 강화</li>
                  <li>고용창출 및 지역경제 활성화</li>
                  <li>ESG 경영 및 친환경 시설 전환</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 지원기관 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 기술보증기금 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">기술보증기금</CardTitle>
              <CardDescription>기술력 평가 기반 보증지원</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원한도</span>
                  <Badge variant="secondary">최대 100억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증비율</span>
                  <Badge variant="secondary">최대 95%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증기간</span>
                  <Badge variant="secondary">최대 8년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증료율</span>
                  <Badge variant="secondary">연 0.5%~2.0%</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 프로그램</p>
                  <ul className="text-sm space-y-1">
                    <li>• 택소노미평가보증 (녹색기술·환경산업)</li>
                    <li>• 일반기술보증</li>
                    <li>• 특례보증 (R&D, 통상환경변화 대응)</li>
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

          {/* 신용보증기금 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">신용보증기금</CardTitle>
              <CardDescription>신용도 기반 보증지원</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원한도</span>
                  <Badge variant="secondary">최대 30억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증비율</span>
                  <Badge variant="secondary">최대 90%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증기간</span>
                  <Badge variant="secondary">최대 8년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">보증료율</span>
                  <Badge variant="secondary">연 0.5%~2.5%</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 프로그램</p>
                  <ul className="text-sm space-y-1">
                    <li>• 일반보증</li>
                    <li>• 특별보증 (정책자금 연계)</li>
                    <li>• 지역경제 활성화 보증</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.kodit.co.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    1588-6565
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 중소벤처기업진흥공단 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              중소벤처기업진흥공단 (중진공)
            </CardTitle>
            <CardDescription>중소기업 정책자금 직접 지원</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">신시장진출지원자금</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">최대 30억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">최대 8년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">정책자금 기준금리</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    신시장 개척, 수출국 다변화를 위한 생산시설 확충 지원
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">혁신성장촉진자금</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">일반형</span>
                    <Badge variant="outline">최대 5억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">혁신형</span>
                    <Badge variant="outline">최대 10억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">최대 8년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">기준금리 + 0.4%p</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    소상공인의 혁신성장을 위한 시설투자 지원
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://www.kosmes.or.kr" target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-1" />
                    홈페이지
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  1357 (중소기업 통합콜센터)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 신청 절차 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              신청 절차
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-1">사업계획서 작성</h4>
                <p className="text-sm text-gray-600">시설투자 계획 및 사업성 검토</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-1">금융기관 방문</h4>
                <p className="text-sm text-gray-600">취급 금융기관 방문 및 상담</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-1">보증기관 심사</h4>
                <p className="text-sm text-gray-600">기술력 및 신용도 평가</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <h4 className="font-medium mb-1">자금 지원</h4>
                <p className="text-sm text-gray-600">보증서 발급 및 대출 실행</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 필요서류 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle>필요서류</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">공통 서류</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">사업계획서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">법인등기부등본 (개인사업자등록증)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">재무제표 (최근 3년)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">부가세 과세표준증명원</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">중소기업확인서</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">시설자금 관련 서류</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">시설투자 계획서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">견적서 (장비, 공사비 등)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">토지매매계약서 (해당시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">건축허가증 (해당시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-sm">환경영향평가서 (해당시)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 관련 정보 */}
        <Card className="mb-8 rounded-2xl">
          <CardHeader>
            <CardTitle>관련 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.mss.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>중소벤처기업부</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.bizinfo.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>기업마당</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://smtech.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>중소기업 기술개발 종합관리시스템</span>
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
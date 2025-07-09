'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, DollarSign, Calendar, FileText, Phone, Globe, Users, Target, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';

export default function RDFundingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">R&D자금</h1>
            <Badge variant="outline" className="ml-2">정책자금</Badge>
          </div>
          <p className="text-xl text-gray-600">기술혁신과 연구개발을 위한 R&D 전용 자금 지원</p>
        </div>

        {/* 개요 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              R&D자금 개요
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 R&D자금이란?</h3>
                <p className="text-gray-700">
                  중소기업이 기술혁신, 제품개발, 연구개발 활동을 위해 필요한 자금을 지원하는 정책자금입니다.
                  기업의 기술경쟁력 강화와 혁신 성장을 통해 국가 경제발전에 기여하는 것을 목적으로 합니다.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">🎯 지원 목적</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>중소기업의 기술혁신 능력 강화</li>
                  <li>신기술 개발 및 상용화 촉진</li>
                  <li>연구개발 인력 양성 및 인프라 구축</li>
                  <li>기술 기반 경쟁력 확보</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 R&D 지원사업 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 산업기술혁신사업 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">산업기술혁신사업</CardTitle>
              <CardDescription>산업통상자원부 주관 기술개발사업</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">주관기관</span>
                  <Badge variant="secondary">산업통상자원부</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원규모</span>
                  <Badge variant="secondary">과제당 1~50억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원기간</span>
                  <Badge variant="secondary">2~6년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원비율</span>
                  <Badge variant="secondary">최대 100%</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 분야</p>
                  <ul className="text-sm space-y-1">
                    <li>• 신산업 창출 기술개발</li>
                    <li>• 산업기반 핵심기술개발</li>
                    <li>• 소재부품장비 기술개발</li>
                    <li>• 탄소중립 기술개발</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 중소기업 기술개발지원사업 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">중소기업 기술개발지원사업</CardTitle>
              <CardDescription>중소벤처기업부 기술개발 지원</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">주관기관</span>
                  <Badge variant="secondary">중소벤처기업부</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원규모</span>
                  <Badge variant="secondary">과제당 1~20억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원기간</span>
                  <Badge variant="secondary">2~3년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원비율</span>
                  <Badge variant="secondary">최대 80%</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 사업</p>
                  <ul className="text-sm space-y-1">
                    <li>• 기술혁신개발사업</li>
                    <li>• 창업성장기술개발사업</li>
                    <li>• 지역특화산업육성(R&D)</li>
                    <li>• 중소기업 R&D 바우처</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 기술개발자금 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              기술개발자금
            </CardTitle>
            <CardDescription>기술보증기금 기술개발자금 보증</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">지원 내용</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">최대 20억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">보증비율</span>
                    <Badge variant="outline">최대 95%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">보증기간</span>
                    <Badge variant="outline">최대 8년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">보증료율</span>
                    <Badge variant="outline">연 0.5%~2.0%</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">지원 용도</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">신제품 개발 및 개선</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">기술도입 및 이전</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발 인력 확보</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발 장비 구입</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 R&D 지원기관 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 중소기업기술정보진흥원 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">중소기업기술정보진흥원 (TIPA)</CardTitle>
              <CardDescription>중소기업 기술개발 전담기관</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">2024년 예산</span>
                  <Badge variant="secondary">4,000억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원과제</span>
                  <Badge variant="secondary">연간 7,000건</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">성공률</span>
                  <Badge variant="secondary">65%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">상용화율</span>
                  <Badge variant="secondary">75%</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 사업</p>
                  <ul className="text-sm space-y-1">
                    <li>• 기술혁신개발사업</li>
                    <li>• 중소기업 R&D 바우처</li>
                    <li>• 기술컨설팅 지원</li>
                    <li>• 기술사업화 지원</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.tipa.or.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    1661-3035
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 한국산업기술진흥원 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">한국산업기술진흥원 (KIAT)</CardTitle>
              <CardDescription>산업기술혁신 전담기관</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">설립년도</span>
                  <Badge variant="secondary">2009년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">주요사업</span>
                  <Badge variant="secondary">산업기술혁신</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원분야</span>
                  <Badge variant="secondary">산업기술 전반</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">협력기관</span>
                  <Badge variant="secondary">1,000개 이상</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 사업</p>
                  <ul className="text-sm space-y-1">
                    <li>• 산업기술혁신사업</li>
                    <li>• 지역산업육성사업</li>
                    <li>• 국제기술협력</li>
                    <li>• 기술사업화 지원</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.kiat.or.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    02-6009-3000
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* R&D 분야별 지원 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              R&D 분야별 지원
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">신기술 개발</h3>
                <ul className="text-sm space-y-1">
                  <li>• 인공지능 (AI)</li>
                  <li>• 사물인터넷 (IoT)</li>
                  <li>• 빅데이터 분석</li>
                  <li>• 블록체인</li>
                  <li>• 5G/6G 통신</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">친환경 기술</h3>
                <ul className="text-sm space-y-1">
                  <li>• 탄소중립 기술</li>
                  <li>• 신재생에너지</li>
                  <li>• 환경오염방지</li>
                  <li>• 에너지 효율화</li>
                  <li>• 친환경 소재</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">바이오·의료</h3>
                <ul className="text-sm space-y-1">
                  <li>• 바이오의약품</li>
                  <li>• 의료기기</li>
                  <li>• 디지털헬스케어</li>
                  <li>• 정밀의료</li>
                  <li>• 바이오소재</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 신청 자격 및 요건 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              신청 자격 및 요건
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">기본 자격</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">중소기업 또는 중견기업</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발 능력 보유</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">기술개발 의지 및 계획</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발비 자기부담 능력</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">사업화 의지 및 계획</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">우대 조건</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">기술혁신형 중소기업 (INNO-BIZ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발전담부서 보유</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">지식재산권 보유</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">산학연 협력 경험</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">수출기업 또는 수출계획</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-1">공고 확인</h4>
                <p className="text-sm text-gray-600">사업 공고 및 신청 자격 확인</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-1">제안서 작성</h4>
                <p className="text-sm text-gray-600">기술개발 제안서 작성</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-1">온라인 신청</h4>
                <p className="text-sm text-gray-600">통합관리시스템 신청</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h4 className="font-medium mb-1">평가 심사</h4>
                <p className="text-sm text-gray-600">기술성, 사업성 평가</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">5</span>
                </div>
                <h4 className="font-medium mb-1">협약 체결</h4>
                <p className="text-sm text-gray-600">과제 선정 및 협약</p>
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
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">기술개발 제안서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">사업자등록증</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">법인등기부등본</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">재무제표 (최근 3년)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발 계획서</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">추가 서류</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">기술개발 능력 증명서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">연구개발비 사용 계획서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">지식재산권 증명서 (해당시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">산학연 협력 계획서 (해당시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">사업화 계획서</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* R&D 지원 혜택 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>R&D 지원 혜택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">세제 혜택</h3>
                <ul className="text-sm space-y-1">
                  <li>• 연구개발비 세액공제</li>
                  <li>• 기술도입비 세액공제</li>
                  <li>• 연구개발 준비금 손금인정</li>
                  <li>• 연구개발 장비 즉시상각</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">인력 지원</h3>
                <ul className="text-sm space-y-1">
                  <li>• 연구개발 인력 파견</li>
                  <li>• 기술지도 및 컨설팅</li>
                  <li>• 연구개발 전문가 멘토링</li>
                  <li>• 교육 및 훈련 프로그램</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">사업화 지원</h3>
                <ul className="text-sm space-y-1">
                  <li>• 기술이전 및 사업화 자금</li>
                  <li>• 지식재산권 출원 지원</li>
                  <li>• 기술사업화 컨설팅</li>
                  <li>• 해외 진출 지원</li>
                </ul>
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
                <Link href="https://www.tipa.or.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>중소기업기술정보진흥원</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.kiat.or.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>한국산업기술진흥원</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.motie.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>산업통상자원부</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.mss.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>중소벤처기업부</span>
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
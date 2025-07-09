'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Rocket, DollarSign, Calendar, FileText, Phone, Globe, Users, Target, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function StartupFundingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">창업자금</h1>
            <Badge variant="outline" className="ml-2">정책자금</Badge>
          </div>
          <p className="text-xl text-gray-600">혁신적인 창업 아이디어 실현을 위한 창업자금 지원</p>
        </div>

        {/* 개요 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              창업자금 개요
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 창업자금이란?</h3>
                <p className="text-gray-700">
                  창업을 준비하거나 창업 후 7년 이내의 기업이 필요한 자금을 지원하는 정책자금입니다.
                  창업에 필요한 시설자금, 운전자금, 기술개발자금 등을 종합적으로 지원하여 혁신적인 창업 생태계 조성을 목적으로 합니다.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">🎯 지원 목적</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>혁신적인 창업 아이디어의 사업화 촉진</li>
                  <li>기술 기반 창업기업 육성</li>
                  <li>청년 창업 활성화 및 일자리 창출</li>
                  <li>스타트업 생태계 조성 및 성장 지원</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 지원 프로그램 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 창업성공패키지 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">창업성공패키지</CardTitle>
              <CardDescription>창업진흥원 대표 창업 지원사업</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">예비창업자</span>
                  <Badge variant="secondary">최대 1억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">초기창업자</span>
                  <Badge variant="secondary">최대 2억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">재도전기업</span>
                  <Badge variant="secondary">최대 1억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원기간</span>
                  <Badge variant="secondary">최대 3년</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 지원내용</p>
                  <ul className="text-sm space-y-1">
                    <li>• 사업화 자금 지원</li>
                    <li>• 멘토링 및 교육</li>
                    <li>• 창업 공간 제공</li>
                    <li>• 네트워킹 지원</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 창업도약패키지 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">창업도약패키지</CardTitle>
              <CardDescription>스케일업 단계 창업기업 지원</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원규모</span>
                  <Badge variant="secondary">최대 10억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">지원기간</span>
                  <Badge variant="secondary">최대 2년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">대상</span>
                  <Badge variant="secondary">창업 후 3~7년</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">투자연계</span>
                  <Badge variant="secondary">필수</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 특징</p>
                  <ul className="text-sm space-y-1">
                    <li>• 글로벌 진출 지원</li>
                    <li>• 투자 연계 필수</li>
                    <li>• 기업 성장 집중 지원</li>
                    <li>• 해외 진출 프로그램</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 금융 지원 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              창업자금 금융 지원
            </CardTitle>
            <CardDescription>보증기관 및 정책자금 지원</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">기술보증기금 창업보증</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">5천만원~3억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">보증비율</span>
                    <Badge variant="outline">100%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">보증기간</span>
                    <Badge variant="outline">최대 5년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">보증료율</span>
                    <Badge variant="outline">연 0.5%</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    기술력 우수 창업기업 대상, 무담보 100% 보증 지원
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">청년창업자금</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">지원한도</span>
                    <Badge variant="outline">최대 5억원</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">지원기간</span>
                    <Badge variant="outline">최대 8년</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">금리</span>
                    <Badge variant="outline">기준금리 - 0.5%p</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">대상</span>
                    <Badge variant="outline">만 39세 이하</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    청년 창업자 특별 금리 우대, 창업 후 7년 이내 기업
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 창업 단계별 지원 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              창업 단계별 지원체계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">예비창업 단계</h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="block mx-auto">창업성공패키지</Badge>
                  <Badge variant="outline" className="block mx-auto">최대 1억원</Badge>
                  <p className="text-sm text-gray-600">사업 아이디어 구체화 및 창업 준비</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">초기창업 단계</h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="block mx-auto">창업성공패키지</Badge>
                  <Badge variant="outline" className="block mx-auto">최대 2억원</Badge>
                  <p className="text-sm text-gray-600">사업 개시 및 초기 운영 자금</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">성장 단계</h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="block mx-auto">창업도약패키지</Badge>
                  <Badge variant="outline" className="block mx-auto">최대 10억원</Badge>
                  <p className="text-sm text-gray-600">스케일업 및 글로벌 진출</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 지원기관 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 창업진흥원 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">창업진흥원 (KISED)</CardTitle>
              <CardDescription>창업 지원 전담기관</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">운영사업</span>
                  <Badge variant="secondary">창업성공패키지</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">스케일업</span>
                  <Badge variant="secondary">창업도약패키지</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">글로벌</span>
                  <Badge variant="secondary">K-Global</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">창업교육</span>
                  <Badge variant="secondary">창업아카데미</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 사업</p>
                  <ul className="text-sm space-y-1">
                    <li>• 창업 단계별 맞춤 지원</li>
                    <li>• 글로벌 진출 지원</li>
                    <li>• 액셀러레이터 지원</li>
                    <li>• 창업 인프라 구축</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.kised.or.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    02-2156-4000
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 중소벤처기업부 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">중소벤처기업부</CardTitle>
              <CardDescription>창업 정책 총괄 부처</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">2024년 예산</span>
                  <Badge variant="secondary">8,000억원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">창업지원</span>
                  <Badge variant="secondary">전 단계 지원</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">K-Startup</span>
                  <Badge variant="secondary">통합 플랫폼</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">규제샌드박스</span>
                  <Badge variant="secondary">규제 완화</Badge>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">주요 정책</p>
                  <ul className="text-sm space-y-1">
                    <li>• 창업 규제 완화</li>
                    <li>• 창업 세제 혜택</li>
                    <li>• 창업 인프라 구축</li>
                    <li>• 창업 문화 조성</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.mss.go.kr" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      홈페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    044-204-7000
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 신청 자격 및 조건 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              신청 자격 및 조건
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">일반 자격 요건</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">사업 개시일로부터 7년 이내</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">중소기업 또는 중견기업</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">업력 제한 없음 (예비창업자 포함)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">기술성·혁신성 보유</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">성장 가능성 우수</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">우대 조건</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">청년 창업자 (만 39세 이하)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">여성 창업자</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">고령자 창업자 (만 50세 이상)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">장애인 창업자</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">재도전 창업자</span>
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
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-1">사업계획서 작성</h4>
                <p className="text-sm text-gray-600">아이디어 구체화 및 사업성 분석</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-1">온라인 신청</h4>
                <p className="text-sm text-gray-600">K-Startup 통합 플랫폼 신청</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-1">서류 심사</h4>
                <p className="text-sm text-gray-600">사업성 및 기술성 평가</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h4 className="font-medium mb-1">발표 심사</h4>
                <p className="text-sm text-gray-600">PT 발표 및 최종 선정</p>
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
                <h3 className="font-semibold mb-3">예비창업자</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">사업계획서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">개인정보 활용 동의서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">주민등록초본</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">최종학력 증명서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">경력증명서 (해당시)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">창업기업</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">사업계획서</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">사업자등록증</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">법인등기부등본</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">재무제표 (해당시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-sm">지식재산권 증빙서류</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 창업 지원 혜택 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>창업 지원 혜택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">세제 혜택</h3>
                <ul className="text-sm space-y-1">
                  <li>• 창업중소기업 세액감면</li>
                  <li>• 엔젤투자 소득공제</li>
                  <li>• 연구개발비 세액공제</li>
                  <li>• 고용증대 세액공제</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">인프라 지원</h3>
                <ul className="text-sm space-y-1">
                  <li>• 창업 공간 제공</li>
                  <li>• 멘토링 및 컨설팅</li>
                  <li>• 네트워킹 기회</li>
                  <li>• 교육 프로그램</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">글로벌 진출</h3>
                <ul className="text-sm space-y-1">
                  <li>• 해외 진출 지원</li>
                  <li>• 글로벌 액셀러레이터</li>
                  <li>• 해외 투자 연계</li>
                  <li>• 글로벌 네트워킹</li>
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
                <Link href="https://www.k-startup.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>K-Startup</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.kised.or.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>창업진흥원</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="https://www.bizinfo.go.kr" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-6 w-6" />
                  <span>기업마당</span>
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
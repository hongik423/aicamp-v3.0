'use client';

import { Header } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Gavel, 
  TrendingUp, 
  Shield, 
  Calendar, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function FactoryAuctionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Factory className="w-12 h-12 text-orange-600 mr-3" />
              <Gavel className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              공장경매 전문 컨설팅
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              공장 경매 투자부터 운영까지, 전문가가 함께합니다
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                경매 분석
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                투자 컨설팅
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                운영 지원
              </Badge>
            </div>
          </div>

          {/* 서비스 소개 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gavel className="w-6 h-6 text-orange-600 mr-2" />
                  경매 분석 서비스
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    물건 실사 및 가치 평가
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    권리분석 및 리스크 검토
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    입찰 전략 수립
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    경매 참여 대행
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                  투자 컨설팅
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    투자 수익률 분석
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    자금 조달 방안
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    세무 전략 수립
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    리스크 관리
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-6 h-6 text-green-600 mr-2" />
                  운영 지원
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    공장 운영 계획 수립
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    임대 관리 서비스
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    정부지원사업 연계
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    매각 전략 지원
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 프로세스 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              공장경매 컨설팅 프로세스
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: '상담 신청', desc: '전문가 상담 예약', icon: Phone },
                { step: '2', title: '물건 분석', desc: '경매 물건 실사 및 분석', icon: FileText },
                { step: '3', title: '전략 수립', desc: '입찰 및 투자 전략 수립', icon: TrendingUp },
                { step: '4', title: '실행 지원', desc: '경매 참여 및 사후 관리', icon: Zap }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      STEP {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 주의사항 */}
          <div className="mb-16">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  공장경매 투자 주의사항
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-800">
                  <ul className="space-y-2">
                    <li>• 권리관계 철저한 조사 필요</li>
                    <li>• 용도지역 및 건축법 확인</li>
                    <li>• 환경오염 여부 점검</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• 임차인 권리 확인</li>
                    <li>• 세금 및 관리비 체납 조사</li>
                    <li>• 전문가 동반 필수</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA 섹션 */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-orange-600 to-blue-600 text-white">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold mb-4">
                  공장경매 투자, 혼자 하지 마세요
                </h3>
                <p className="text-lg mb-8 opacity-90">
                  전문가와 함께 안전하고 수익성 높은 투자를 시작하세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/consultation">
                      <Phone className="w-5 h-5 mr-2" />
                      무료 상담 신청
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                    asChild
                  >
                    <Link href="/ai-diagnosis">
                      <FileText className="w-5 h-5 mr-2" />
                      투자 역량 진단
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}